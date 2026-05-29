# /// script
# requires-python = ">=3.10"
# dependencies = []
# ///
"""Roots — scoped filesystem access for an MCP server.

Roots are a codified way for a user to grant a server access to specific
files/folders ahead of time (passed as command-line args when the server
starts). The MCP SDK does NOT automatically enforce root restrictions: the
server developer must check that any accessed path is contained within a
granted root, and every tool that touches the filesystem must call this
check before acting.

Three tools give Claude autonomous discovery without the user supplying a
full path: ConvertVideo (the original capability), ReadDirectory (lists
files/folders in a directory), and ListRoots (returns the available roots).
ListRoots is optional — you can instead include the root list directly in
the prompt; the tool form lets Claude check available roots dynamically.
"""

import os


def is_path_allowed(path, roots) -> bool:
    return any(os.path.commonpath([root, path]) == root for root in roots)
