---
name: roots
description: Grant an MCP server scoped access to specific files/folders (roots) and enforce it manually with is_path_allowed checks, plus ReadDirectory/ListRoots tools for autonomous file discovery. Trigger when a server needs filesystem access without users supplying full paths, or when adding permission boundaries to a server.
---

# Roots

> Distilled from the *Introduction to MCP* and *MCP Advanced Topics* courses.

**Roots** are a codified way for a user to grant a server access to specific files/folders ahead of time (passed as command-line args when the server starts). A root is a file or folder the user has authorized.

Runnable enforcement helper: [`scripts/roots.py`](scripts/roots.py).

## Problem
A user says "convert bikin.mp4" but Claude can't find the file in a complex filesystem without a full path, and demanding full paths is inconvenient.

## Solution: three tools
- `ConvertVideo` — the original capability.
- `ReadDirectory` — lists files/folders in a directory.
- `ListRoots` — returns the available roots.

This gives Claude **autonomous discovery**: it can list roots, walk directories, and locate the file itself — no full path needed from the user.

## Enforcement (do this yourself)
The MCP SDK does **not** automatically enforce root restrictions. The server developer must check that any accessed path is contained within a granted root:

```python
def is_path_allowed(path, roots) -> bool:
    return any(os.path.commonpath([root, path]) == root for root in roots)
```

Every tool that touches the filesystem must call this before acting.

## Two benefits
1. **Permission control** — limits the server to authorized areas only.
2. **Autonomous discovery** — Claude finds files without the user providing paths.

`ListRoots` is optional — you can instead include the root list directly in the prompt. The tool form lets Claude check available roots dynamically when it needs them.

## Source
Course note: "Roots" — projects/courses/mcp_advanced file
