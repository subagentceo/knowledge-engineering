> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Nimble Agent Builder

> Turn your AI coding assistant into a web data agent factory

The Nimble Agent Builder skill lets you create, test, refine, and publish reusable extraction workflows from your AI coding assistant. Describe the data you need from any website, and it finds an existing agent or creates a new one, then lets you iterate until the output is exactly right.

Built on the [Nimble MCP Server](/integrations/mcp-server/mcp-server) and the open-source [Agent Skills](https://agentskills.io) standard for cross-platform agent compatibility.

<Card icon="github" href="https://github.com/Nimbleway/agent-skills/tree/main/skills/web-search-tools/nimble-agent-builder" title="View on GitHub">
  Source code for this skill
</Card>

## Tools Overview

| Tool                     | Description                                             |
| ------------------------ | ------------------------------------------------------- |
| `nimble_agents_list`     | Browse available agents by keyword                      |
| `nimble_agents_get`      | Get agent details and input/output schema               |
| `nimble_agents_generate` | Create custom agents using natural language             |
| `nimble_agents_update`   | Refine agent fields, parsing rules, or extraction logic |
| `nimble_agents_run`      | Execute agents and validate structured results          |
| `nimble_agents_publish`  | Save finalized agents for repeated use                  |

## Quick Install

<Tabs>
  <Tab title="Claude Code">
    ```bash theme={"system"}
    claude plugin marketplace add Nimbleway/agent-skills && \
    claude plugin install nimble@nimble-plugin-marketplace
    ```
  </Tab>

  <Tab title="Cursor">
    ```bash theme={"system"}
    npx skills add Nimbleway/agent-skills -a cursor
    ```
  </Tab>

  <Tab title="Vercel Agent Skills CLI">
    ```bash theme={"system"}
    npx skills add Nimbleway/agent-skills
    ```
  </Tab>
</Tabs>

<Note>
  The agent builder requires the MCP server. See [Prerequisites > MCP Server Connection](#2-mcp-server-connection) below.
</Note>

## Prerequisites

### 1. Nimble API Key

[Sign up](https://online.nimbleway.com/signup) and generate a key from your [Account Settings > API Keys](/nimble-sdk/admin/account-management#api-keys).

Set the `NIMBLE_API_KEY` environment variable using your platform's method:

<Tabs>
  <Tab title="Claude Code">
    Add to `~/.claude/settings.json`:

    ```json theme={"system"}
    {
      "env": {
        "NIMBLE_API_KEY": "your-api-key-here"
      }
    }
    ```
  </Tab>

  <Tab title="Shell / Terminal">
    ```bash theme={"system"}
    export NIMBLE_API_KEY="your-api-key-here"
    ```

    Or add to your shell profile (`~/.bashrc`, `~/.zshrc`):

    ```bash theme={"system"}
    echo 'export NIMBLE_API_KEY="your-api-key-here"' >> ~/.zshrc
    ```
  </Tab>

  <Tab title="VS Code / GitHub Copilot">
    * Add skills to `.github/skills/` in your repository
    * Configure API key using GitHub Actions secrets in the copilot environment
    * Or set as environment variable in your shell
  </Tab>
</Tabs>

### 2. MCP Server Connection

The skill requires a connection to the Nimble MCP server. After installing the skill, connect the server:

```bash theme={"system"}
claude mcp add --transport http nimble-mcp-server https://mcp.nimbleway.com/mcp \
  --header "Authorization: Bearer ${NIMBLE_API_KEY}"
```

See the [Plugin Installation](/integrations/agent-skills/plugin-installation) page for platform-specific setup options.

## Quick Start

The skill activates automatically when you describe a recurring extraction need:

```
"set up extraction for Amazon product pages"
  -> searches for existing agents, finds amazon_pdp, runs it, shows results

"create a reusable scraper for job listings on LinkedIn"
  -> generates a custom agent, lets you refine fields, publishes when ready

"build an agent for extracting hotel prices from Booking.com"
  -> creates agent from natural language, validates output, saves for reuse
```

<Tip>
  Use this skill when you need a reusable workflow. For immediate, one-off data
  extraction, use the [Nimble Web Expert](/integrations/agent-skills/web-tools-skills/nimble-web-expert) instead.
</Tip>

## How It Works

The skill follows a build-test-refine lifecycle:

1. **Search** existing agents that match your target website
2. **Inspect** the agent's input/output schema
3. **Run** the agent and validate structured results
4. **Generate** a custom agent using natural language if no existing one fits
5. **Refine** fields, extraction rules, or parsing until the output matches expectations
6. **Publish** the final agent for repeated use across projects

Results are presented in clean markdown tables with numbered follow-up options. Each step is interactive. Refine until the output matches your requirements before publishing.

## Usage Examples

### Find and run an existing agent

```
"extract product details from this Amazon page: amazon.com/dp/B0DGHRT7PS"
```

The skill searches for a matching agent (`amazon_pdp`), shows you the schema, runs it, and returns structured product data.

### Generate a custom agent

```
"build an agent that extracts job title, company, salary, and location from Indeed job listings"
```

The skill generates a new agent definition, runs it against a sample URL, and lets you refine the fields before publishing.

### Refine and publish

```
"add a 'remote' field to the agent"
"the salary field is empty, try a different selector"
"looks good, publish it as indeed_jobs_v2"
```

## Agent Builder vs Web Expert

|              | **agent-builder**                | **web-expert**         |
| ------------ | -------------------------------- | ---------------------- |
| **Goal**     | Reusable workflow                | Immediate data         |
| **Speed**    | Slower (build/test/refine cycle) | Fast, direct           |
| **Output**   | Published agent                  | Extracted data         |
| **Use when** | "I'll need this repeatedly"      | "Get me this data now" |

## About Agent Skills

This skill follows the [Agent Skills](https://agentskills.io) open-source standard, making it compatible with multiple AI agent platforms. Install using the [Skills CLI](https://www.npmjs.com/package/skills), the standard package manager for the Agent Skills ecosystem.

## Full Reference

For the complete skill documentation, examples, and API reference, see the [SKILL.md on GitHub](https://github.com/Nimbleway/agent-skills/blob/main/skills/nimble-agent-builder/SKILL.md).
