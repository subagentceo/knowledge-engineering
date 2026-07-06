# How AI works in VS Code

Visual Studio Code's built-in AI features are powered by GitHub Copilot and large language models (LLMs). This article explains the concepts behind those features, the building blocks that power them, and how they fit together. Use it to understand _how_ AI works in VS Code, so you can make better decisions as you use it.

To learn what you can build with agents, see Build with agents in VS Code. To start interacting, see Use chat in VS Code.

## Where AI shows up in VS Code

AI assists you across a spectrum of interaction surfaces that trade off autonomy for control, from autonomous agents that complete whole tasks to suggestions as you type. The same underlying concepts apply across all of them.

*   **Agents**: autonomous sessions that follow the agent loop to read files, make coordinated changes across your project, run commands, and iterate until a task is complete.
*   **Chat**: the conversational interface for interacting with agents, asking questions, and assigning tasks.
*   **Inline chat**: a lightweight chat interface in the editor for quick, focused edits.
*   **Inline suggestions**: code suggestions that appear as ghost text while you type, using specialized completion models without an agent loop.
*   **Smart actions**: one-click AI actions in your workflow, like generating commit messages or fixing diagnostics.

## Core concepts

The following articles explain the architecture and building blocks that power these features:

*   Language models: the AI models that power all features, including how to choose and configure them.
*   Context: how VS Code assembles information for the model, from your files to conversation history.
*   Tools: mechanisms that let agents act on your development environment and connect to external services.
*   Agents: the agent loop, agent types, subagents, memory, and planning.
*   Customization: how to tailor AI behavior with instructions, prompt files, custom agents, skills, hooks, and plugins.
*   Trust and safety: control mechanisms, AI limitations, and security considerations.

## How the concepts fit together

These building blocks combine each time you send a request. A **language model** does the reasoning. To respond usefully, it needs **context**: VS Code assembles the relevant files, conversation history, and other information and sends it to the model. To act on your environment instead of only answering, the model calls **tools** to read and edit files, run commands, or reach external services. An **agent** ties these together in the agent loop, calling tools and feeding the results back to the model until the task is complete. **Customization** shapes how the agent behaves, and **trust and safety** controls keep you in command of what it can do.

To put these concepts into practice, see Configure your agent session.

## Related resources

*   Quickstart: Get started with AI in VS Code
*   Best practices for using AI in VS Code
*   Configure your agent session

7/1/2026