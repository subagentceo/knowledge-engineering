# Optibot Code Review

Optibot brings AI-powered code review directly into Claude Code, catching production-breaking bugs, business logic issues, and security vulnerabilities before they ship. It analyzes your local changes, compares branches, and reviews patch files — delivering line-specific feedback with file paths and actionable fix suggestions.

The plugin supports three review modes: reviewing uncommitted local changes, comparing your working branch against a base branch (like main), and analyzing standalone diff or patch files. Each review produces a summary of changes, file-level inline comments, and tracks your daily usage quota.

Optibot also includes authentication management and CI/CD integration. You can log in interactively with OAuth or use API keys for headless environments like GitHub Actions, making it easy to add automated code review to your deployment pipeline.

**How to use:** Ask Claude to review your code naturally — try prompts like `review my changes with optibot`, `use optibot to compare my branch against main`, or `run optibot review on this diff file`. For setup, say `log in to optibot` or `create an optibot API key for CI`.