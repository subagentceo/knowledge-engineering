# Getting started with GitHub Copilot CLI

Quickly learn how to use GitHub Copilot CLI.

## Introduction

GitHub Copilot CLI is a powerful terminal-native AI coding assistant that brings agentic capabilities directly to your command line. The Copilot CLI offers deep flexibility, GitHub workflow integration, and the ability to work autonomously on complex tasks while maintaining full user control.

This guide will help you start using the CLI.

## Installation

Use one of these commands:

* **Cross-platform (npm)**

  Prerequisite: Node.js 22 or later.

  ```bash copy
  npm install -g @github/copilot
  ```

* **Windows (WinGet)**

  ```bash copy
  winget install GitHub.Copilot
  ```

* **macOS/Linux (Homebrew)**

  ```bash copy
  brew install copilot-cli
  ```

## Starting the CLI for the first time

1. In the terminal, navigate to the project directory where you want to use Copilot CLI.

2. Start an interactive CLI session:

   ```bash
   copilot
   ```

3. In the CLI interface, enter `/login` and follow the on-screen prompts to authenticate with your GitHub account.

   You'll only have to do this the first time you use the CLI.

4. When prompted, confirm that you trust that the files in the current directory are suitable for use with an AI tool.

   > \[!NOTE]
   > Copilot won't make changes to your files without your explicit approval.

5. Try asking Copilot a question, for example:

   ```copilot copy
   Give me an overview of this project.
   ```

## Core shortcuts to master

| Shortcut                      | Action                                   |
| ----------------------------- | ---------------------------------------- |
| <kbd>Esc</kbd>                | Cancel the current operation             |
| <kbd>Ctrl</kbd>+<kbd>C</kbd>  | Cancel if thinking, clear input, or exit |
| <kbd>Ctrl</kbd>+<kbd>L</kbd>  | Clear the screen                         |
| `@`                           | Mention files to include in context      |
| `/`                           | Show slash commands                      |
| `?`                           | Show tabbed help                         |
| <kbd>↑</kbd> and <kbd>↓</kbd> | Navigate the command history             |

For a full list of shortcuts and available commands, enter:

```bash
/help
```

## Using GitHub Copilot CLI non-interactively

You can also enter a command and get a response from Copilot directly in your terminal, without starting an interactive session.

To do this, pass a prompt to the CLI with the `-p` flag. For example:

```bash
copilot -p "In Git, how can I apply a commit from another branch"
```

The `-p` flag allows you to use GitHub Copilot CLI programmatically within scripts, for example to automate tasks using AI.

You can add the `-s` flag to tell the CLI to output only Copilot's response, omitting the additional usage information.

```bash
copilot -sp "YOUR PROMPT HERE"
```

For details of other flags you can use programmatically, and for more information, enter:

```bash
copilot help
```

or:

```bash
copilot help TOPIC
```

where TOPIC is one of the topics listed in the help output.

## Next steps

Find out more about Copilot CLI:

* [About GitHub Copilot CLI](/en/copilot/concepts/agents/about-copilot-cli)
* [Using GitHub Copilot CLI](/en/copilot/how-tos/use-copilot-agents/use-copilot-cli)
* [Best practices for GitHub Copilot CLI](/en/copilot/how-tos/copilot-cli/cli-best-practices)
* [Get started with GitHub Copilot CLI: A free hands-on course](https://developer.microsoft.com/blog/get-started-with-github-copilot-cli-a-free-hands-on-course)