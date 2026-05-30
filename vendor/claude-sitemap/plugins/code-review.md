# Code Review

Automates pull request code review using multiple specialized agents working in parallel. Five independent reviewers analyze your changes from different angles: CLAUDE.md compliance checking, bug detection, git history context analysis, previous PR comment review, and code comment verification. Each finding is scored on a 0-100 confidence scale, and only high-confidence issues (default threshold: 80) are posted as comments, dramatically reducing false positives and review noise.

The plugin intelligently filters out PRs that don't need review—closed, draft, automated, or already-reviewed pull requests are automatically skipped. Comments include direct GitHub links with full SHA hashes and line number ranges for easy navigation to the exact code in question.

**How to use:** Run `/code-review` on any PR branch to launch the full automated review. The system will analyze your changes, score potential issues, and post actionable feedback directly to GitHub. You can customize the confidence threshold or focus areas (security, performance, accessibility) by editing the command configuration.
