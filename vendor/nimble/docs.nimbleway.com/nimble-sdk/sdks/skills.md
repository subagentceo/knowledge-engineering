> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Agent Skills

> Turn your AI coding assistant into a web data expert — extract structured knowledge from any website

Install the Nimble plugin and your AI coding assistant can create Web Search Agents for any website, extract structured data at scale, and search the live web — all from natural language prompts.

## Prerequisites

**1. Nimble CLI** — Required by the `nimble-web-tools` skill:

```bash theme={"system"}
npm install -g @nimble-way/nimble-cli
```

**2. Nimble API Key** — Get yours from [Account Settings](https://online.nimbleway.com/account-settings/api-keys) and set it as an environment variable:

```bash theme={"system"}
export NIMBLE_API_KEY="your-api-key"
```

Or persist it in `~/.claude/settings.json` for Claude Code:

```json theme={"system"}
{
  "env": {
    "NIMBLE_API_KEY": "your-api-key"
  }
}
```

## Installation

<Tabs>
  <Tab title="Claude Code">
    Install from the Nimble Marketplace — this adds both skills and configures the MCP server automatically:

    ```bash theme={"system"}
    claude plugin marketplace add Nimbleway/agent-skills &&
    claude plugin install nimble@nimble-plugin-marketplace
    ```

    Or load directly from a local clone:

    ```bash theme={"system"}
    git clone https://github.com/Nimbleway/agent-skills.git &&
    claude --plugin-dir /path/to/agent-skills
    ```
  </Tab>

  <Tab title="Cursor">
    **Step 1:** Add the Nimble MCP server to Cursor:

    <a href="cursor://anysphere.cursor-deeplink/mcp/install?name=nimble-mcp-server&config=eyJ0eXBlIjoiaHR0cCIsInVybCI6Imh0dHBzOi8vbWNwLm5pbWJsZXdheS5jb20vbWNwIiwiaGVhZGVycyI6eyJBdXRob3JpemF0aW9uIjoiQmVhcmVyIE5JTUJMRV9BUElfS0VZIn19">
      <img src="https://cursor.com/deeplink/mcp-install-dark.svg" alt="Add to Cursor" noZoom style={{height: "32px"}} />
    </a>

    Replace `NIMBLE_API_KEY` in **Cursor Settings > MCP Servers** with your actual key.

    **Step 2:** Install skills and rules:

    ```bash theme={"system"}
    npx skills add Nimbleway/agent-skills -a cursor
    ```
  </Tab>

  <Tab title="Codex">
    **Step 1:** Add the Nimble MCP server to Codex.

    Codex stores MCP configuration in `~/.codex/config.toml` (or a project-scoped `.codex/config.toml`). Open the file and add:

    ```toml theme={"system"}
    [mcp_servers.nimble-mcp-server]
    url = "https://mcp.nimbleway.com/mcp"
    bearer_token_env_var = "NIMBLE_API_KEY"
    ```

    <Tip>
      `bearer_token_env_var` tells Codex to read your API key from the `NIMBLE_API_KEY` environment variable at runtime and send it as a bearer token — never hardcode the key in `config.toml`.
    </Tip>

    Verify the server is registered from the Codex TUI:

    ```
    /mcp
    ```

    **Step 2:** Install the Nimble skills:

    ```bash theme={"system"}
    npx skills add Nimbleway/agent-skills -a codex
    ```

    This installs the `nimble-web-tools` and `nimble-agents` skills into Codex's skill discovery paths (`~/.agents/skills/`). Codex picks them up automatically; if they don't appear, restart Codex.

    **Step 3:** Verify the skills loaded by running `/skills` inside Codex, or by typing `$` to see the skill mention menu — you should see `nimble-web-tools` and `nimble-agents` listed.
  </Tab>

  <Tab title="Cortex Code">
    **Step 1:** Add the Nimble MCP server to Cortex Code CLI:

    ```bash theme={"system"}
    cortex mcp add nimble-mcp-server https://mcp.nimbleway.com/mcp \
      --transport http \
      --header "Authorization: Bearer ${NIMBLE_API_KEY}"
    ```

    Verify the server is reachable:

    ```bash theme={"system"}
    cortex mcp start nimble-mcp-server
    ```

    <Tip>
      Cortex Code stores MCP configuration in `~/.snowflake/cortex/mcp.json`. You can edit it directly instead of using the CLI — just use `${NIMBLE_API_KEY}` syntax for environment variables, never hardcode the key.
    </Tip>

    **Step 2:** Install the skills from the Nimble repository:

    ```bash theme={"system"}
    cortex skill add https://github.com/Nimbleway/agent-skills.git
    ```

    Or install from inside a Cortex Code CLI session:

    ```
    /skill add https://github.com/Nimbleway/agent-skills.git
    ```

    **Step 3:** Verify the skills loaded:

    ```
    /skill list
    ```

    You should see `nimble-web-tools` and `nimble-agents` in the listing. Use `/skill sync` to pull updates from the remote repo later.
  </Tab>

  <Tab title="Vercel CLI">
    ```bash theme={"system"}
    npx skills add Nimbleway/agent-skills
    ```

    <Note>
      The `nimble-agents` skill requires the MCP server. Connect it manually after installing:

      ```bash theme={"system"}
      claude mcp add --transport http nimble-mcp-server https://mcp.nimbleway.com/mcp \
        --header "Authorization: Bearer ${NIMBLE_API_KEY}"
      ```
    </Note>
  </Tab>
</Tabs>

***

## What's Included

Agent Skills are plug-and-play extensions that give AI coding assistants direct access to Nimble's web data tools. Install once and your AI can search the live web, extract pages, map sites, and run structured data agents — automatically, from natural language.

| Skill                | Description                                                                     |
| -------------------- | ------------------------------------------------------------------------------- |
| **nimble-web-tools** | Real-time web intelligence — search, extract, map, and crawl via the Nimble CLI |
| **nimble-agents**    | Find, generate, and run agents to extract structured data from any website      |
| **MCP Server**       | Pre-configured Nimble MCP server connection for agent-to-API access             |

## nimble-web-tools Skill

The `nimble-web-tools` skill activates automatically when you ask your AI assistant to search the web, extract a page, map a site, or crawl for content.

### What it can do

| Tool        | What it does                                                                                              |
| ----------- | --------------------------------------------------------------------------------------------------------- |
| **Search**  | Real-time web search with 8 focus modes: general, coding, news, academic, shopping, social, geo, location |
| **Extract** | Get clean HTML or markdown from any URL — supports JS rendering and stealth unblocking                    |
| **Map**     | Discover all URLs in a domain or sitemap — useful for planning extraction workflows                       |
| **Crawl**   | Extract content from an entire website in one request                                                     |

### Example prompts

```
"Search for recent AI developments"
  → nimble search --query "recent AI developments" --search-depth lite

"Extract the content from this URL"
  → nimble extract --url "https://example.com" --parse --format markdown

"Map all pages on this docs site"
  → nimble map --url "https://docs.example.com" --limit 100

"Crawl the API reference section"
  → nimble crawl run --url "https://docs.example.com/api" --limit 50
```

### Search

```bash theme={"system"}
# Lite search (default — fast, token-efficient)
nimble search --query "React hooks tutorial" --topic coding --search-depth lite

# Search with AI-generated answer
nimble search --query "what is WebAssembly" --include-answer --search-depth lite

# News with time filter
nimble search --query "AI developments" --topic news --time-range week --search-depth lite

# Filter to specific domains
nimble search --query "auth best practices" \
  --include-domain github.com \
  --include-domain stackoverflow.com \
  --search-depth lite
```

<Tip>
  Use `--search-depth lite` (default) for fast responses (1–3s). Use
  `--search-depth deep` when you need full page content for archiving or
  full-text analysis.
</Tip>

### Extract

```bash theme={"system"}
# Standard extraction — always pass --parse --format markdown for LLM-readable output
nimble extract --url "https://example.com/article" --parse --format markdown

# With JavaScript rendering (for SPAs and dynamic pages)
nimble extract --url "https://example.com/app" --render --parse --format markdown

# With geo-targeting
nimble extract --url "https://example.com" --country US --city "New York" --parse --format markdown
```

### Map

```bash theme={"system"}
# Discover all URLs on a site
nimble map --url "https://docs.example.com" --limit 100

# Include subdomains
nimble map --url "https://example.com" --domain-filter subdomains
```

### Crawl

```bash theme={"system"}
# Crawl a site (always set --limit)
nimble crawl run --url "https://docs.example.com" --limit 50

# Filter to specific paths
nimble crawl run --url "https://example.com" \
  --include-path "/docs" \
  --include-path "/api" \
  --limit 100

# Check crawl status
nimble crawl status --id "crawl-id"
```

<Tip>
  For LLM-friendly output, prefer `map` + `extract --parse --format markdown` on
  individual pages rather than crawl — crawl returns raw HTML which can be very
  large.
</Tip>

***

## nimble-agents Skill

The `nimble-agents` skill gives your AI assistant the power to extract structured data from **any website**. It uses a find-or-generate workflow: search for an existing agent, run it, and get structured data. If no agent exists for a site, it generates a custom one automatically.

### How it works

<Steps>
  <Step title="Search">
    Find an existing agent matching your target website using
    `nimble_agents_list`
  </Step>

  <Step title="Inspect">
    Review the agent's input/output schema with `nimble_agents_get`
  </Step>

  <Step title="Run">
    Execute the agent and get clean, structured results via `nimble_agents_run`
  </Step>

  <Step title="Generate">
    If no existing agent fits, create a custom one with `nimble_agents_generate`
  </Step>

  <Step title="Publish">
    Save generated agents for future reuse with `nimble_agents_publish`
  </Step>
</Steps>

### Usage

<Tabs>
  <Tab title="Claude Code">
    Use the slash command:

    ```
    /nimble:nimble-agents extract product details from this Amazon page: https://www.amazon.com/dp/B0DGHRT7PS
    ```

    Or just describe what you need in plain language — the skill activates automatically when relevant.
  </Tab>

  <Tab title="Cursor">
    Reference the skill in Cursor Agent chat:

    ```
    /nimble-agents extract product details from this Amazon page: https://www.amazon.com/dp/B0DGHRT7PS
    ```
  </Tab>

  <Tab title="Cortex Code">
    Invoke the skill explicitly from a Cortex Code CLI session:

    ```
    $nimble-agents extract product details from this Amazon page: https://www.amazon.com/dp/B0DGHRT7PS
    ```

    Or describe the task in natural language — Cortex Code automatically loads the skill when your prompt matches its trigger keywords (web extraction, scraping, structured data from a URL, etc.).
  </Tab>

  <Tab title="Codex">
    Invoke the skill explicitly from a Codex CLI, IDE, or app session by mentioning it with `$`:

    ```
    $nimble-agents extract product details from this Amazon page: https://www.amazon.com/dp/B0DGHRT7PS
    ```

    Or describe the task in natural language — Codex will implicitly invoke the skill when your prompt matches its description (web extraction, scraping, structured data from a URL, etc.).
  </Tab>
</Tabs>

### MCP Tools

| Tool                     | Purpose                                     |
| ------------------------ | ------------------------------------------- |
| `nimble_agents_list`     | Browse agents by keyword                    |
| `nimble_agents_get`      | Get agent details and input/output schema   |
| `nimble_agents_generate` | Create a custom agent via natural language  |
| `nimble_agents_run`      | Execute an agent and get structured results |
| `nimble_agents_publish`  | Save a generated agent for reuse            |

***

## Source Code

<CardGroup cols={2}>
  <Card title="agent-skills on GitHub" icon="github" href="https://github.com/Nimbleway/agent-skills">
    Plugin source, skill definitions, and SKILL.md references
  </Card>

  <Card title="Plugin Installation" icon="puzzle-piece" href="/integrations/agent-skills/plugin-installation">
    Detailed platform-specific installation guide
  </Card>

  <Card title="Web Tools Skill" icon="globe" href="/integrations/agent-skills/web-tools-skills/nimble-web-expert">
    Full command reference for nimble-web-tools
  </Card>

  <Card title="Agents Skill" icon="bullseye-pointer" href="/integrations/agent-skills/web-tools-skills/nimble-agent-builder">
    Full guide for the nimble-agents skill
  </Card>
</CardGroup>
