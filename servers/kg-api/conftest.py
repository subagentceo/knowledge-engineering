"""Pytest bootstrap — adds the src/ layout to sys.path for editable testing."""

from __future__ import annotations

import sys
from pathlib import Path

SRC = Path(__file__).parent / "src"
if str(SRC) not in sys.path:
    sys.path.insert(0, str(SRC))
