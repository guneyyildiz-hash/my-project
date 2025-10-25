"""Utilities for extracting citations, references, and quotations from text."""

from .models import Citation, Quotation, Prompt
from .analyzer import analyze_text, extract_citations, extract_quotations, generate_prompts

__all__ = [
    "Citation",
    "Quotation",
    "Prompt",
    "analyze_text",
    "extract_citations",
    "extract_quotations",
    "generate_prompts",
]
