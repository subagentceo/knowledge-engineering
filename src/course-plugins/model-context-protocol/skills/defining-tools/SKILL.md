---
name: defining-tools
description: Author MCP server tools with the Python SDK's @mcp.tool decorator, typed parameters, and pydantic Field descriptions, so schemas are auto-generated. Trigger when adding or editing a tool on an MCP server, or when asked how the server exposes capabilities to Claude.
---

# Defining Tools

> Distilled from the *Introduction to MCP* and *MCP Advanced Topics* courses.

Tools are **model-controlled** — Claude decides when to invoke them. The Python MCP SDK auto-generates the JSON schema from a decorated, type-annotated function, so you never hand-write schemas.

Runnable server: [`scripts/server_tool.py`](scripts/server_tool.py).

## Pattern
decorator → function definition → parameter typing → validation → core logic.

```python
from pydantic import Field

@mcp.tool()
def read_doc_contents(
    doc_id: str = Field(description="The id of the document to read"),
) -> str:
    if doc_id not in docs:
        raise ValueError(f"Doc with id {doc_id} not found")
    return docs[doc_id]

@mcp.tool()
def edit_document(
    doc_id: str = Field(description="The id of the document to edit"),
    old_string: str = Field(description="Text to replace"),
    new_string: str = Field(description="Replacement text"),
) -> str:
    if doc_id not in docs:
        raise ValueError(f"Doc with id {doc_id} not found")
    docs[doc_id] = docs[doc_id].replace(old_string, new_string)
```

## Key points
- `@mcp.tool` + typed params + `Field(description=...)` (import `Field` from pydantic) is all the SDK needs — it produces the JSON schema and the function wiring in effectively one line of server setup.
- Documents live in an in-memory dict keyed by `doc_id`.
- Validate existence first; raise `ValueError` for a missing document.

## Source
Course note: "Defining Tools with MCP" — projects/courses/mcp_intro file
