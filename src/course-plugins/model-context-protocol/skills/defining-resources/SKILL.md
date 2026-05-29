---
name: defining-resources
description: Expose server data to clients via @mcp.resource, using static URIs or templated URIs whose parameters become function arguments, with MIME types as deserialization hints. Trigger when adding read-only data endpoints to an MCP server or choosing between direct and templated resources.
---

# Defining Resources

> Distilled from the *Introduction to MCP* and *MCP Advanced Topics* courses.

Resources are **app-controlled** — your application code decides when to fetch them (not the model). They expose data for read operations: UI display, autocomplete, prompt augmentation.

Runnable server: [`scripts/server_resource.py`](scripts/server_resource.py).

## Two resource types
- **Direct / static** — a fixed URI, e.g. `docs://documents` (list everything).
- **Templated** — a parameterized URI with wildcards, e.g. `docs://documents/{doc_id}`. The URI parameters become the function's keyword arguments.

## Pattern
```python
@mcp.resource("docs://documents", mime_type="application/json")
def list_docs() -> list[str]:
    return list(docs.keys())

@mcp.resource("docs://documents/{doc_id}", mime_type="text/plain")
def fetch_doc(doc_id: str) -> str:
    return docs[doc_id]
```

## Key points
- Use `@mcp.resource` with a URI (a route-like address) and a **MIME type** (`application/json`, `text/plain`, …). The MIME type is a hint to the client about how to deserialize.
- The Python SDK auto-serializes return values to strings.
- Common pattern: one resource per distinct read operation — list items vs. fetch a single item.

## Flow
Client sends a read-resource request with a URI → server matches the URI to a resource function → executes it → returns the result → client receives it via a read-resource result message.

## Grounded in src/
- `src/tools/ReadMcpResourceTool/ReadMcpResourceTool.ts` — Claude Code reading a resource from a server: input is `{ server, uri }`, result parsed via `ReadResourceResultSchema` from the MCP SDK.
- `src/tools/ListMcpResourcesTool/ListMcpResourcesTool.ts` — listing resources a server exposes (`fetchResourcesForClient`), optionally filtered by server name.

## Source
Course note: "Defining Resources" — projects/courses/mcp_intro file
