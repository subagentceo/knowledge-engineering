---
name: project-setup
description: How to stand up and run an MCP learning project that implements both a client and a server in one codebase. Trigger when setting up a new MCP project, configuring its env/dependencies, or running it for the first time.
---

# Project Setup

> Distilled from the *Introduction to MCP* and *MCP Advanced Topics* courses.

The reference project is a **CLI chatbot** that implements *both* a custom MCP client and a custom MCP server in the same codebase. Real projects normally implement client **or** server, not both — doing both here is purely for learning.

## What the project contains
- A custom MCP client that connects to the custom MCP server.
- A server with an in-memory **fake document system** (no persistence).
- Two server tools: read document contents, update document contents.

## Setup steps
1. Download and extract the project archive (`CLI_project.zip`).
2. Configure `.env` with your Anthropic API key.
3. Install dependencies.

## Running
- With uv: `uv run main.py`
- Without uv: `python main.py`

## Verify
A chat prompt should appear and answer a basic query like "what's one plus one". That confirms the client connected, the server started, and Claude is reachable before you layer on tools, resources, and prompts.

## Source
Course note: "Project Setup" — projects/courses/mcp_intro file
