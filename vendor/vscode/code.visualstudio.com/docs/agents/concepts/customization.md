# Agent customization

AI models contain broad general knowledge but don't know your specific codebase or team practices. Agent customization is how you share that context to make responses match your coding standards, project structure, and workflows.

This article is the decision matrix for customization: it explains the different options and helps you choose which one fits your goal. To learn what each option is and how to get started, see Customize agent behavior in Visual Studio Code and the individual guides linked from each option.

## Customization options at a glance

Each option shapes a different part of how the agent works. Find the goal that matches your need, then follow the link to set it up.

Goal

Use

Example

When it activates

Apply the same coding standards to all code

Always-on instructions

Enforce ESLint rules, require JSDoc comments

Automatically included in every request

Apply different rules to different file types

File-based instructions

React patterns for `.tsx` files

When files match a pattern or description

Automate a multi-step workflow that needs scripts

Agent skills

Scaffold a service from bundled template files and a setup script

When the task matches the skill description

Give the AI a focused role with limited tools

Custom agents

Security reviewer, database admin

When you select it or another agent delegates to it

Connect the AI to external APIs or databases

MCP

Query a PostgreSQL database

When the task matches a tool description

Run a command automatically during the agent's work

Hooks

Run a formatter after every file edit

When the agent reaches a matching lifecycle event

Run a repeatable task on demand

Prompt files

Scaffold a React component

When you invoke a slash command

Start with custom instructions for project-wide standards. Add agent skills to automate repeatable, multi-step tasks. Use MCP when you need external data. Create custom agents for specialized roles. You can combine multiple customization types as your needs grow.

Agent plugins bundle several of these options into a single installable package, letting you adopt a ready-made workflow without building it yourself.

## How customizations combine

The customization options are designed to layer:

*   **Instructions** shape _how_ the AI writes code (conventions, style, libraries).
*   **Prompt files** and **agent skills** encapsulate _what_ the AI does for recurring tasks, from a single prompt up to a multi-step workflow with scripts.
*   **Custom agents** define _who_ the AI acts as (persona, tools, model), and can delegate to other agents for multi-step workflows.
*   **MCP servers** extend _what the AI can reach_ by adding tools that connect to external systems.
*   **Hooks** enforce _deterministic actions_ at specific lifecycle points in the agent loop, regardless of what the model decides to do.
*   **Agent plugins** are pre-packaged bundles of the above, distributed through plugin marketplaces.

For configuration steps and examples, see Customize agent behavior in VS Code and the individual articles linked from the table above.

## Related resources

*   Customize agent behavior in VS Code
*   Agents
*   Tools

7/1/2026