"""Core logic for extracting citations, quotations and prompts."""

from __future__ import annotations

import re
from typing import Iterable, List

from .models import Citation, Prompt, Quotation

_SENTENCE_END_RE = re.compile(r"(?<=[.!?])\s+(?=[A-Z0-9\"])")
_PARENTHEICAL_CITATION_RE = re.compile(r"\((?P<citation>[^()]*?\d{4}[^()]*)\)")
_NUMERIC_CITATION_RE = re.compile(r"\[(?P<citation>\d+(?:\s*,\s*\d+)*)\]")
_QUOTE_RE = re.compile(r'"(?P<quote>[^"]{3,})"')


def _split_sentences(text: str) -> List[str]:
    """A very small sentence tokenizer."""

    cleaned = " ".join(text.split())
    if not cleaned:
        return []
    sentences = _SENTENCE_END_RE.split(cleaned)
    return [sentence.strip() for sentence in sentences if sentence.strip()]


def _sentence_lookup(sentences: Iterable[str]) -> List[str]:
    return list(sentences)


def _find_sentence(context_sentences: List[str], match_span: tuple[int, int], text: str) -> str:
    start, end = match_span
    for sentence in context_sentences:
        idx = text.find(sentence)
        if idx == -1:
            continue
        if idx <= start < idx + len(sentence):
            return sentence
    snippet = text[max(0, start - 75) : min(len(text), end + 75)]
    return " ".join(snippet.split())


def extract_citations(text: str) -> List[Citation]:
    """Extract in-text citations together with their surrounding context."""

    sentences = _sentence_lookup(_split_sentences(text))
    citations: List[Citation] = []

    for match in _PARENTHEICAL_CITATION_RE.finditer(text):
        citation_text = match.group("citation").strip()
        context = _find_sentence(sentences, match.span(), text)
        citations.append(
            Citation(text=citation_text, context=context, style="parenthetical")
        )

    for match in _NUMERIC_CITATION_RE.finditer(text):
        citation_text = match.group("citation").strip()
        context = _find_sentence(sentences, match.span(), text)
        citations.append(Citation(text=citation_text, context=context, style="numeric"))

    seen = set()
    unique_citations: List[Citation] = []
    for citation in citations:
        key = (citation.text, citation.context)
        if key in seen:
            continue
        seen.add(key)
        unique_citations.append(citation)

    return unique_citations


def extract_quotations(text: str) -> List[Quotation]:
    """Extract quotations with their surrounding context."""

    sentences = _sentence_lookup(_split_sentences(text))
    quotations: List[Quotation] = []

    for match in _QUOTE_RE.finditer(text):
        quote_text = match.group("quote").strip()
        if not quote_text:
            continue
        context = _find_sentence(sentences, match.span(), text)
        quotations.append(Quotation(text=quote_text, context=context))

    return quotations


def generate_prompts(
    citations: Iterable[Citation], quotations: Iterable[Quotation]
) -> List[Prompt]:
    """Builds prompts to help an AI model recover bibliographic information."""

    prompts: List[Prompt] = []

    for citation in citations:
        prompt_text = (
            "You are a research assistant. Given the following in-text citation, "
            "identify the most likely bibliographic reference with complete "
            "details (authors, title, venue, year, publisher as applicable). If "
            "multiple works are implied, list each separately.\n"
            f"Citation: {citation.text}\n"
            f"Context: {citation.context}\n"
            "Respond with a structured JSON array where each entry contains "
            "`title`, `authors`, `venue`, `year`, and `additional_info`."
        )
        prompts.append(
            Prompt(
                target="citation",
                subject=citation.text,
                context=citation.context,
                prompt=prompt_text,
            )
        )

    for quotation in quotations:
        prompt_text = (
            "You are a literature analyst. Determine the original source of the "
            "following quotation and provide bibliographic details if possible.\n"
            f"Quotation: \"{quotation.text}\"\n"
            f"Context: {quotation.context}\n"
            "Respond in JSON with fields `suspected_source`, `supporting_evidence`, "
            "and `confidence` (0-1)."
        )
        prompts.append(
            Prompt(
                target="quotation",
                subject=quotation.text,
                context=quotation.context,
                prompt=prompt_text,
            )
        )

    return prompts


def analyze_text(text: str) -> dict[str, List[Prompt] | List[Citation] | List[Quotation]]:
    """Convenience helper that extracts all artefacts and prompts."""

    citations = extract_citations(text)
    quotations = extract_quotations(text)
    prompts = generate_prompts(citations, quotations)
    return {
        "citations": citations,
        "quotations": quotations,
        "prompts": prompts,
    }
