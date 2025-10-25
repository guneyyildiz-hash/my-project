# Citation Extraction Tool

This project provides a lightweight Python utility that can scan arbitrary text for
citations, references, and quotations. For each artefact it captures the
surrounding context and generates ready-to-use prompts that can be fed to an AI
model to recover complete bibliographic information.

## Features

- Detects parenthetical citations such as `(Doe, 2020)` and numeric references
  like `[1, 2]`.
- Extracts quotations and preserves the sentence where they appear.
- Generates structured prompts tailored for AI models to retrieve authoritative
  references or identify quote sources.
- Includes a simple command-line interface and composable Python API.

## Installation

The package follows a standard `src` layout. You can install it in editable mode
within a virtual environment:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -e .
```

## Usage

### Python API

```python
from citation_tool import analyze_text

text = "According to recent studies (Doe, 2021), innovation is accelerating."
result = analyze_text(text)

for citation in result["citations"]:
    print(citation.text, citation.context)

for prompt in result["prompts"]:
    print(prompt.prompt)
```

### Command Line Interface

Analyse a text file and return a JSON payload with citations, quotations, and
prompts:

```bash
python -m citation_tool.cli path/to/document.txt
```

Alternatively, read from standard input and emit a human-friendly summary:

```bash
echo "According to (Doe, 2020) ..." | python -m citation_tool.cli --format text
```

## Testing

Run the unit tests with:

```bash
pytest
```
