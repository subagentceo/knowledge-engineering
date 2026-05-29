# /// script
# requires-python = ">=3.10"
# dependencies = []
# ///
# Batch tool: force parallel tool calls in one request-response cycle.
# Source: "The Batch Tool" — projects/courses/building-with-the-claude-api__1p.txt
#
# Claude calls the batch tool once with an `invocations` array; run_batch iterates them,
# JSON-parses each one's args, calls run_tool per item, returns a batch_output list.

import json

batch_tool_schema = {
    "name": "batch_tool",
    "description": (
        "Invoke multiple other tools simultaneously. Use this whenever you need to call more "
        "than one tool at once so they run in parallel. Returns a list of each tool's output."
    ),
    "input_schema": {
        "type": "object",
        "properties": {
            "invocations": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "name": {"type": "string"},
                        "arguments": {"type": "string", "description": "JSON-encoded arguments."},
                    },
                    "required": ["name", "arguments"],
                },
            }
        },
        "required": ["invocations"],
    },
}


def run_batch(invocations, run_tool):
    # run_tool(name, input_dict) is the dispatcher from the tool-use skill.
    batch_output = []
    for inv in invocations:
        args = json.loads(inv["arguments"])  # JSON-parse each one's args
        batch_output.append(run_tool(inv["name"], args))
    return batch_output
