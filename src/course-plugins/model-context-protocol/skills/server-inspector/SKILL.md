---
name: server-inspector
description: Use the MCP Inspector (mcp dev) to test a server's tools, resources, and prompts in the browser without wiring it into a real application. Trigger when debugging an MCP server, verifying a tool works, or manually invoking server primitives before integration.
---

# The Server Inspector

> Distilled from the *Introduction to MCP* and *MCP Advanced Topics* courses.

The **MCP Inspector** is an in-browser debugger for an MCP server. It lets you exercise the server's primitives without connecting it to a real client application — essential before production deployment.

## Launch
With your Python environment activated:

```bash
mcp dev server_file.py
```

It serves on a port and prints a localhost address — open it in the browser.

## Interface
- Left sidebar has a **Connect** button.
- Top navigation has **Resources / Prompts / Tools** sections.
- The Tools section lists available tools; clicking one opens a right-hand panel for manual testing.

## Testing a tool
Select a tool → fill in the required parameters (e.g. a document id) → click **Run Tool** → verify the output / success message.

It gives live development testing, tool-invocation simulation, parameter input fields, and success/failure feedback. The Inspector is under active development, so the UI may shift, but the workflow stays the same.

## Source
Course note: "The Server Inspector" — projects/courses/mcp_intro file
