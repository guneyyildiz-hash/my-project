"""Data models used by the citation extraction utilities."""

from __future__ import annotations

from dataclasses import dataclass
from typing import Literal


@dataclass(slots=True)
class Citation:
    """Represents an in-text citation."""

    text: str
    context: str
    style: Literal["parenthetical", "numeric", "unknown"] = "unknown"


@dataclass(slots=True)
class Quotation:
    """Represents a quoted passage."""

    text: str
    context: str


@dataclass(slots=True)
class Prompt:
    """A prompt targeted at an AI model to help recover bibliographic metadata."""

    target: Literal["citation", "quotation"]
    subject: str
    context: str
    prompt: str
