from citation_tool.analyzer import analyze_text, extract_citations, extract_quotations


SAMPLE_TEXT = (
    "According to later studies (Smith and Wesson, 2019), the results were inconclusive. "
    "However, subsequent work [4, 5] argued otherwise. As the report stated, "
    '\"Innovation distinguishes between a leader and a follower,\" Apple\'s founder once said.'
)


def test_extract_citations_parenthetical():
    citations = extract_citations(SAMPLE_TEXT)
    assert any(c.text == "Smith and Wesson, 2019" for c in citations)


def test_extract_citations_numeric():
    citations = extract_citations(SAMPLE_TEXT)
    assert any(c.text == "4, 5" for c in citations)


def test_extract_quotations():
    quotations = extract_quotations(SAMPLE_TEXT)
    assert any(
        "Innovation distinguishes between a leader and a follower" in q.text
        for q in quotations
    )


def test_analyze_text_structure():
    result = analyze_text(SAMPLE_TEXT)
    assert {"citations", "quotations", "prompts"} <= set(result)
    assert len(result["prompts"]) == len(result["citations"]) + len(result["quotations"])
