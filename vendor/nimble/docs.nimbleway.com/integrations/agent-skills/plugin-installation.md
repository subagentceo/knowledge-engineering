> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Plugin Installation

> Install the Nimble plugin and turn your AI coding assistant into a web data expert

Install the Nimble plugin and turn Claude Code or Cursor into a web data powerhouse. Search, extract, scrape, and build reusable extraction agents, all from your AI coding assistant.

The plugin bundles two skills and an MCP server connection into a single package.

## What's Included

| Component                      | Description                                                                 |
| ------------------------------ | --------------------------------------------------------------------------- |
| **nimble-web-expert** skill    | Get live web data instantly. Search, extract, map, and crawl via Nimble CLI |
| **nimble-agent-builder** skill | Create, test, refine, and publish reusable extraction workflows             |
| **MCP server config**          | Pre-configured connection to the Nimble MCP server                          |

## Skills Overview

<AccordionGroup>
  <Accordion title="nimble-agent-builder" icon="hammer">
    **Build durable, reusable extraction workflows.** Create, test, validate, refine, and publish an agent for a specific domain (e.g., "build an agent for extracting Amazon product data"). Multi-step process, not for getting data right now.

    **Triggers:** "set up extraction for X site", "build an agent for...", "create a reusable scraper"
  </Accordion>

  <Accordion title="nimble-web-expert" icon="globe">
    **Get web data immediately.** Fast, one-off extractions. Scrape pages, fetch URLs, search the web, crawl site sections. This is the only way your AI coding assistant can access live websites.

    **Triggers:** Fetching any URL, scraping data, web search, bulk crawling, running pre-built agents
  </Accordion>
</AccordionGroup>

|              | **agent-builder**                | **web-expert**         |
| ------------ | -------------------------------- | ---------------------- |
| **Goal**     | Reusable workflow                | Immediate data         |
| **Speed**    | Slower (build/test/refine cycle) | Fast, direct           |
| **Output**   | Published agent                  | Extracted data         |
| **Use when** | "I'll need this repeatedly"      | "Get me this data now" |

## Prerequisites

1. **Nimble CLI**: Install globally:

```bash theme={"system"}
npm i -g @nimble-way/nimble-cli
```

2. **Nimble API Key**: [Sign up](https://online.nimbleway.com/signup) and generate a key from your [Account Settings > API Keys](/nimble-sdk/admin/account-management#api-keys)

3. Set the environment variable:

```bash theme={"system"}
export NIMBLE_API_KEY="your-api-key-here"
```

Or add to `~/.claude/settings.json` (Claude Code):

```json theme={"system"}
{
  "env": {
    "NIMBLE_API_KEY": "your-api-key-here"
  }
}
```

## Install by Platform

<Tabs>
  <Tab title="Claude Code">
    ### Nimble Marketplace (recommended)

    ```bash theme={"system"}
    claude plugin marketplace add Nimbleway/agent-skills && \
    claude plugin install nimble@nimble-plugin-marketplace
    ```

    This installs both skills and configures the MCP server automatically.

    ### Local Plugin Directory

    Clone the repo and load it as a local plugin:

    ```bash theme={"system"}
    git clone https://github.com/Nimbleway/agent-skills.git
    claude --plugin-dir /path/to/agent-skills
    ```
  </Tab>

  <Tab title="Cursor">
    ### Step 1: Add the MCP Server

    Click the button below to add the Nimble MCP server to Cursor instantly:

    <a href="cursor://anysphere.cursor-deeplink/mcp/install?name=nimble-mcp-server&config=eyJ0eXBlIjoiaHR0cCIsInVybCI6Imh0dHBzOi8vbWNwLm5pbWJsZXdheS5jb20vbWNwIiwiaGVhZGVycyI6eyJBdXRob3JpemF0aW9uIjoiQmVhcmVyIE5JTUJMRV9BUElfS0VZIn19">
      <img src="https://cursor.com/deeplink/mcp-install-dark.svg" alt="Add to Cursor" noZoom style={{height: "32px"}} />
    </a>

    After installing, replace `NIMBLE_API_KEY` in **Cursor Settings > MCP Servers > nimble-mcp-server** with your actual [Nimble API key](https://online.nimbleway.com/account-settings/api-keys).

    <Accordion title="Manual MCP configuration">
      Add to `.cursor/mcp.json` (project) or `~/.cursor/mcp.json` (global):

      ```json theme={"system"}
      {
        "mcpServers": {
          "nimble-mcp-server": {
            "url": "https://mcp.nimbleway.com/mcp",
            "headers": {
              "Authorization": "Bearer NIMBLE_API_KEY"
            }
          }
        }
      }
      ```

      Restart Cursor for changes to take effect.
    </Accordion>

    ### Step 2: Add Skills and Rules

    Install the skills using the Vercel Agent Skills CLI:

    ```bash theme={"system"}
    npx skills add Nimbleway/agent-skills -a cursor
    ```

    This copies both skills (`nimble-web-expert` and `nimble-agent-builder`) and Cursor rules into your project.

    <Accordion title="Alternative: Clone the repo">
      Clone the repo and open the `agent-skills` folder in Cursor:

      ```bash theme={"system"}
      git clone https://github.com/Nimbleway/agent-skills.git
      ```

      Cursor auto-discovers:

      * `skills/` both skills
      * `rules/` Cursor rules (auto-loaded)
      * `mcp.json` MCP server connection
    </Accordion>
  </Tab>

  <Tab title="Vercel Agent Skills CLI">
    ```bash theme={"system"}
    npx skills add Nimbleway/agent-skills
    ```

    This installs both skills into your project. To verify:

    ```bash theme={"system"}
    npx skills add Nimbleway/agent-skills --list
    ```

    <Note>
      The agents skill requires the MCP server. After installing via `npx skills`, connect the server manually:

      ```bash theme={"system"}
      claude mcp add --transport http nimble-mcp-server https://mcp.nimbleway.com/mcp \
        --header "Authorization: Bearer ${NIMBLE_API_KEY}"
      ```
    </Note>
  </Tab>
</Tabs>

## What's Next

<CardGroup cols={2}>
  <Card title="Build Your First Agent" icon="bullseye-pointer" href="/guides/build-first-agent-tutorial">
    End-to-end tutorial: competitive price analysis across Amazon, Walmart, and
    Nike, from a single prompt
  </Card>

  <Card title="Try Nimble Studio" icon="wand-magic-sparkles" href="https://online.nimbleway.com/workflow-builder">
    Prefer a visual interface? Create agents in the browser
  </Card>

  <Card title="Talk to Sales" icon="phone" href="https://nimbleway.com/contact-general/">
    Need enterprise scale or managed delivery?
  </Card>

  <Card title="Source Code" icon="github" href="https://github.com/Nimbleway/agent-skills">
    View the full plugin source on GitHub
  </Card>
</CardGroup>
