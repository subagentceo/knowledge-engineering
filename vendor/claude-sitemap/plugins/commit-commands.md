# Commit Commands

Streamline your git workflow with intelligent commands for committing, pushing, and creating pull requests. This plugin automates common git operations with AI-powered commit message generation that matches your repository's existing style conventions.

Key features include automatic analysis of staged and unstaged changes, smart commit message generation based on recent commit history, comprehensive PR descriptions with summaries and test plan checklists, and protection against accidentally committing sensitive files like `.env`.

**How to use:** Type `/commit` to automatically stage changes and create a commit with an AI-generated message. Use `/commit-push-pr` for a complete workflow that commits, pushes to a feature branch, and creates a pull request in one step. Run `/clean_gone` to remove local branches that have been deleted from the remote repository.

**Requirements:** Git must be installed and configured. For PR creation, the GitHub CLI (`gh`) must be authenticated. Your repository needs a remote origin configured.
