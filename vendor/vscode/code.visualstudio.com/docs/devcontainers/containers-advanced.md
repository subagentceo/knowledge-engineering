# Advanced container configuration

The articles in this section cover advanced container configuration when working with the Visual Studio Code Dev Containers extension.

## Working with containers

The **Visual Studio Code Dev Containers** extension lets you use a Docker container as a full-featured development environment. It allows you to open any folder inside (or mounted into) a container and take advantage of Visual Studio Code's full feature set. A devcontainer.json file in your project tells VS Code how to access (or create) a **development container** with a well-defined tool and runtime stack. This container can be used to run an application or to separate tools, libraries, or runtimes needed for working with a codebase.

Workspace files are mounted from the local file system or copied or cloned into the container. Extensions are installed and run inside the container, where they have full access to the tools, platform, and file system. This means that you can seamlessly switch your entire development environment just by connecting to a different container.

This lets VS Code provide a **local-quality development experience** — including full IntelliSense (completions), code navigation, and debugging — **regardless of where your tools (or code) are located**.

## Getting Started

If you are new to Docker containers and using the VS Code Dev Containers extension, we recommend starting with the introductory Containers article. There you will find:

*   System requirements - What's needed to run on Windows, macOS, and Linux.
*   Installation - How to install Docker, VS Code, and the Remote Development Extension Pack.
*   Quick starts - Step-by-step instructions for common container scenarios.

Once you have your machine configured, try the Containers tutorial for an in-depth tour of working with containers.

## Advanced Containers topics

The articles listed in the table of contents below, describe advanced container usage and cover specific configurations in detail. You may not need to apply these for your development workflow but it is good to quickly review the articles, in case you might need them in the future.

You can learn how to:

*   Set environment variables
*   Mount local disk drives
*   Add a non-root user
*   Work with multiple containers
*   And more...

## Feedback and questions

You can also provide feedback on the Remote Development experience or reach out with questions.

7/1/2026