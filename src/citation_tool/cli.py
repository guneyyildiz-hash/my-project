"""Command line entry point for the citation extraction tool."""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

from .analyzer import analyze_text


def _read_input(path: str | None) -> str:
    if path is None or path == "-":
        return sys.stdin.read()
    return Path(path).read_text(encoding="utf-8")


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="Extract citations, quotations, and generate AI prompts."
    )
    parser.add_argument(
        "source",
        nargs="?",
        default="-",
        help="Path to the text file to analyse. Reads from stdin when omitted or '-'.",
    )
    parser.add_argument(
        "--format",
        choices={"json", "text"},
        default="json",
        help="Output format (default: json).",
    )

    args = parser.parse_args(argv)
    text = _read_input(args.source)
    analysis = analyze_text(text)

    if args.format == "json":
        print(
            json.dumps(
                {
                    "citations": [citation.__dict__ for citation in analysis["citations"]],
                    "quotations": [
                        quotation.__dict__ for quotation in analysis["quotations"]
                    ],
                    "prompts": [prompt.__dict__ for prompt in analysis["prompts"]],
                },
                ensure_ascii=False,
                indent=2,
            )
        )
    else:
        for citation in analysis["citations"]:
            print(f"Citation: {citation.text}\n  Context: {citation.context}\n")
        for quotation in analysis["quotations"]:
            print(f"Quotation: \"{quotation.text}\"\n  Context: {quotation.context}\n")
        print("Prompts:\n")
        for prompt in analysis["prompts"]:
            print(f"[{prompt.target}] {prompt.prompt}\n")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
