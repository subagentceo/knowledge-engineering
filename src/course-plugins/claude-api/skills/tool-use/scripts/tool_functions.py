# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "anthropic>=0.40",
# ]
# ///
# Tool functions and their JSON schemas.
# Source: "Tool Functions", "Tool Schemas" — projects/courses/building-with-the-claude-api__1p.txt
#
# Tool functions are plain Python functions. Use descriptive names, validate inputs, and raise
# meaningful errors — error text is visible to Claude so it can retry with corrected parameters.

from datetime import datetime
from anthropic.types import ToolParam


def get_current_datetime(date_format="%Y%m%d %H:%M:%S"):
    if not date_format:
        raise ValueError("date format cannot be empty")
    return datetime.now().strftime(date_format)


# A schema tells Claude what the tool does and its arguments.
# Name schemas [function_name]_schema and wrap in ToolParam(...) to avoid type errors.
get_current_datetime_schema = ToolParam(
    {
        "name": "get_current_datetime",
        # description: 3-4 sentences — what it does, when to use it, what it returns.
        "description": (
            "Returns the current date and time formatted with the given strftime format string. "
            "Use this whenever you need the current date or time. "
            "Returns a string."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "date_format": {
                    "type": "string",
                    "description": "A Python strftime format string, e.g. '%Y%m%d %H:%M:%S'.",
                }
            },
        },
    }
)
