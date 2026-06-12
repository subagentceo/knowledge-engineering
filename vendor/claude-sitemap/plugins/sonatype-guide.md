# Sonatype Guide

Sonatype Guide connects Claude Code to Sonatype's software supply chain intelligence platform via MCP. It lets you scan your project's dependencies for known vulnerabilities, get secure version recommendations, and evaluate open-source components based on security, licensing, and quality metrics — all without leaving your editor.

The plugin connects to Sonatype's hosted MCP server, providing access to their comprehensive component database. It authenticates using an API token from guide.sonatype.com, set via the `SONATYPE_GUIDE_TOKEN` environment variable.

**How to use:** After installing and setting your API token, try prompts like: "What vulnerabilities exist in log4j 2.14.0?", "Scan my package.json for vulnerable dependencies", "What's the most secure version of lodash?", or "Evaluate the quality and licensing of this npm package".