> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Nimble MCP Server

> Connect AI agents to Nimble's web data platform via the Model Context Protocol

The Nimble MCP Server gives AI agents the ability to search, extract, map, crawl, and structure data from any website in real time. It exposes Nimble's full web data platform as MCP tools that any compatible AI client can use.

[MCP (Model Context Protocol)](https://modelcontextprotocol.io/) is an open standard by [Anthropic](https://www.anthropic.com/) that gives AI agents a standardized way to connect to external tools and data sources.

<Tip>
  MCP routes results through the LLM context window and can consume tokens
  quickly. For typical web retrieval, the [Nimble CLI
  skill](/integrations/agent-skills/web-tools-skills/nimble-web-expert) is more token-efficient.
</Tip>

## Prerequisites

**Nimble API Key** — [Sign up](https://online.nimbleway.com/signup) and generate a key from your [Account Settings > API Keys](/nimble-sdk/admin/account-management#api-keys).

## Setup

The Nimble MCP Server uses **Streamable HTTP** transport. Connect from any MCP-compatible client using the server URL and your API key.

**Server URL:** `https://mcp.nimbleway.com/mcp`

<Tabs>
  <Tab title="Cursor">
    ### One-Click Install

    Click the button below to add the Nimble MCP server to Cursor instantly:

    <a href="cursor://anysphere.cursor-deeplink/mcp/install?name=nimble-mcp-server&config=eyJ0eXBlIjoiaHR0cCIsInVybCI6Imh0dHBzOi8vbWNwLm5pbWJsZXdheS5jb20vbWNwIiwiaGVhZGVycyI6eyJBdXRob3JpemF0aW9uIjoiQmVhcmVyIE5JTUJMRV9BUElfS0VZIn19">
      <img src="https://cursor.com/deeplink/mcp-install-dark.svg" alt="Add to Cursor" noZoom style={{height: "32px"}} />
    </a>

    After installing, replace `NIMBLE_API_KEY` in Cursor Settings > MCP Servers > `nimble-mcp-server` with your actual [Nimble API key](https://online.nimbleway.com/account-settings/api-keys).

    <Accordion title="Manual configuration">
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
  </Tab>

  <Tab title="Claude Code">
    ### Plugin Install (recommended)

    Installs both guided skills and the MCP server:

    ```bash theme={"system"}
    claude plugin marketplace add Nimbleway/agent-skills
    claude plugin install nimble@nimble-plugin-marketplace
    ```

    See [Plugin Installation](/integrations/agent-skills/plugin-installation) for all options.

    ### MCP-Only

    If you only need the MCP tools:

    ```bash theme={"system"}
    export NIMBLE_API_KEY="Bearer your-nimble-api-key"
    claude mcp add --transport http nimble-mcp-server https://mcp.nimbleway.com/mcp \
      --header "Authorization: ${NIMBLE_API_KEY}"
    ```
  </Tab>

  <Tab title="Claude Desktop">
    Add this to your `claude_desktop_config.json`:

    ```json theme={"system"}
    {
      "mcpServers": {
        "nimble-mcp-server": {
          "command": "npx",
          "args": [
            "-y", "mcp-remote@latest", "https://mcp.nimbleway.com/mcp",
            "--header", "Authorization:${NIMBLE_API_KEY}"
          ],
          "env": {
            "NIMBLE_API_KEY": "Bearer XXX"
          }
        }
      }
    }
    ```

    <Note>
      * Replace `Bearer XXX` with your actual Nimble API key.
      * **After modifying the config file, you must restart Claude Desktop for changes to take effect.**
        * **macOS**: Quit Claude Desktop completely (Cmd+Q) and relaunch.
        * **Windows**: Close the window, then open Task Manager (Ctrl+Shift+Esc), end any "Claude" processes, and relaunch.

      For detailed setup instructions and troubleshooting, see the [official MCP quickstart guide](https://modelcontextprotocol.io/quickstart/user).
    </Note>
  </Tab>

  <Tab title="Other MCP Clients">
    Any MCP-compatible client can connect using Streamable HTTP transport.

    **Prerequisites:** [Node.js and npm](https://nodejs.org/) installed (for the `mcp-remote` bridge)

    ```json theme={"system"}
    {
      "mcpServers": {
        "nimble-mcp-server": {
          "command": "npx",
          "args": [
            "-y", "mcp-remote@latest", "https://mcp.nimbleway.com/mcp",
            "--header", "Authorization:${NIMBLE_API_KEY}"
          ],
          "env": {
            "NIMBLE_API_KEY": "Bearer your-nimble-api-key"
          }
        }
      }
    }
    ```

    Replace `your-nimble-api-key` with your actual Nimble API key.
  </Tab>
</Tabs>

## Tools

The MCP server exposes 18 tools covering Nimble's core APIs. Tools are auto-discovered by your AI client — no additional configuration needed.

<CardGroup cols={2}>
  <Card title="Search" icon="magnifying-glass" href="/nimble-sdk/web-tools/search">
    Web search across multiple engines with configurable depth and focus modes.
  </Card>

  <Card title="Extract" icon="file-lines" href="/nimble-sdk/web-tools/extract/quickstart">
    Extract content from any URL. Supports sync and async extraction with task
    polling.
  </Card>

  <Card title="Map" icon="sitemap" href="/nimble-sdk/web-tools/map">
    Discover all URLs on a website via link-following and sitemaps.
  </Card>

  <Card title="Crawl" icon="spider" href="/nimble-sdk/web-tools/crawl">
    Crawl multiple pages with path filtering, subdomain control, and progress
    tracking.
  </Card>

  <Card title="Agents" icon="robot" href="/nimble-sdk/agentic/agents">
    Browse, create, run, and publish custom extraction agents for any website.
  </Card>
</CardGroup>

## Plugin Installation

For a richer experience with guided skills and workflows, install the Nimble plugin for Claude Code, Cursor, or Vercel Agent Skills CLI.

<Card title="Plugin Installation" icon="puzzle-piece" href="/integrations/agent-skills/plugin-installation">
  Install the unified Nimble plugin for Claude Code, Cursor, or Agent Skills CLI
</Card>

<CardGroup cols={2}>
  <Card icon="wand-magic-sparkles" href="https://online.nimbleway.com/workflow-builder" title="Try Nimble Studio">
    Create a Web Search Agent for any website — no coding required
  </Card>

  <Card icon="phone" href="https://nimbleway.com/contact-general/" title="Talk to Sales">
    Need enterprise scale or managed delivery?
  </Card>
</CardGroup>
