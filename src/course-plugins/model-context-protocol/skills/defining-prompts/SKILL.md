---
name: defining-prompts
description: Author server-side prompt templates with the @prompt decorator that return a list of messages, exposed to users as slash commands so server authors own prompt quality. Trigger when building a server-defined workflow like /format or asked how prompts differ from tools and resources.
---

# Defining Prompts

> Distilled from the *Introduction to MCP* and *MCP Advanced Topics* courses.

Prompts are **user-controlled** — invoked by a user action (a button or a slash command like `/format`). They let the **server author** ship pre-written, tested, domain-tuned instructions instead of leaving prompt quality to end users.

Runnable server: [`scripts/server_prompt.py`](scripts/server_prompt.py).

## Pattern
```python
from mcp.server.fastmcp.prompts import base

@mcp.prompt(name="format", description="Rewrites a document in markdown")
def format_document(doc_id: str) -> list[base.Message]:
    prompt_text = f"Reformat the document with id '{doc_id}' into clean markdown."
    return [base.UserMessage(prompt_text)]
```

## Key points
- Use the `@prompt` decorator with a `name` and `description`.
- The function receives arguments (e.g. a document id) and returns a **list of messages** (user/assistant format) that are sent directly to Claude.
- Arguments are interpolated into the prompt template — the dynamic content is inserted server-side.

## Workflow
User types `/format` → selects a document → server returns the specialized prompt with the doc id interpolated → client sends the messages to Claude → Claude uses tools to read, reformat, and save the document.

The point is to **encapsulate prompt-engineering expertise inside the server**.

## Source
Course note: "Defining Prompts" — projects/courses/mcp_intro file
