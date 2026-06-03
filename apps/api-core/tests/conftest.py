"""pytest conftest — add src/ to sys.path so ke_api_core is importable."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent / "src"))
