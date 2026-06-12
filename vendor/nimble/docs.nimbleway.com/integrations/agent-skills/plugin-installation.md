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

  <Tab title="Claude Cowork">
    Install the Nimble plugin from the Anthropic & Partners directory inside Claude. Authentication is handled via OAuth — no API key required.

    ### One-click install

    <a href="https://claude.ai/directory/plugins/nimble%40knowledge-work-plugins" target="_blank" rel="noopener noreferrer">
      <img src="https://img.shields.io/badge/Install%20in%20Claude%20Cowork-edc602?style=for-the-badge&logo=anthropic&logoColor=black" alt="Install in Claude Cowork" noZoom style={{height: "40px"}} />
    </a>

    ### Step-by-step

    <Steps>
      <Step title="Open the plugin directory">
        In a new Cowork task, click the **+** button, hover **Plugins**, then click **Manage plugins**.

        <Frame>
          <img src="https://mintcdn.com/nimble-f5a8283f/qIF2LyWE-cP0M-Us/images/plugin-install/cowork-plus-menu.png?fit=max&auto=format&n=qIF2LyWE-cP0M-Us&q=85&s=5d2f000ecbbc20d8c433a6c038a62d33" alt="Cowork new-task input with the + menu open showing Plugins > Manage plugins" data-og-width="1664" width="1664" data-og-height="850" height="850" data-path="images/plugin-install/cowork-plus-menu.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/nimble-f5a8283f/qIF2LyWE-cP0M-Us/images/plugin-install/cowork-plus-menu.png?w=280&fit=max&auto=format&n=qIF2LyWE-cP0M-Us&q=85&s=8a594ed6b83f2971f02546c93d78b672 280w, https://mintcdn.com/nimble-f5a8283f/qIF2LyWE-cP0M-Us/images/plugin-install/cowork-plus-menu.png?w=560&fit=max&auto=format&n=qIF2LyWE-cP0M-Us&q=85&s=71f1a300e74e72dfed106ab6c42f6971 560w, https://mintcdn.com/nimble-f5a8283f/qIF2LyWE-cP0M-Us/images/plugin-install/cowork-plus-menu.png?w=840&fit=max&auto=format&n=qIF2LyWE-cP0M-Us&q=85&s=a242c8c3fee09f73e0f1437441340a7c 840w, https://mintcdn.com/nimble-f5a8283f/qIF2LyWE-cP0M-Us/images/plugin-install/cowork-plus-menu.png?w=1100&fit=max&auto=format&n=qIF2LyWE-cP0M-Us&q=85&s=c3b06674a3c3f1e7c81aa2e8008f7a36 1100w, https://mintcdn.com/nimble-f5a8283f/qIF2LyWE-cP0M-Us/images/plugin-install/cowork-plus-menu.png?w=1650&fit=max&auto=format&n=qIF2LyWE-cP0M-Us&q=85&s=e31ca4878938da03cf8fac89e329c2c7 1650w, https://mintcdn.com/nimble-f5a8283f/qIF2LyWE-cP0M-Us/images/plugin-install/cowork-plus-menu.png?w=2500&fit=max&auto=format&n=qIF2LyWE-cP0M-Us&q=85&s=fc73dfd540acf58044aa1a414bb59422 2500w" />
        </Frame>

        Alternatively, from the **Customize** screen, click **+** next to **Personal plugins** and choose **Browse plugins**.

        <Frame>
          <img src="https://mintcdn.com/nimble-f5a8283f/qIF2LyWE-cP0M-Us/images/plugin-install/cowork-browse-plugins.png?fit=max&auto=format&n=qIF2LyWE-cP0M-Us&q=85&s=c11bfa2570b8b5fac0d3c4195e6b6530" alt="Customize > Personal plugins with the Browse plugins / Create plugin menu open" data-og-width="996" width="996" data-og-height="878" height="878" data-path="images/plugin-install/cowork-browse-plugins.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/nimble-f5a8283f/qIF2LyWE-cP0M-Us/images/plugin-install/cowork-browse-plugins.png?w=280&fit=max&auto=format&n=qIF2LyWE-cP0M-Us&q=85&s=d79881c8b353056c6f8deb00e037aec8 280w, https://mintcdn.com/nimble-f5a8283f/qIF2LyWE-cP0M-Us/images/plugin-install/cowork-browse-plugins.png?w=560&fit=max&auto=format&n=qIF2LyWE-cP0M-Us&q=85&s=bd43996c2cce75e03f26eb7f7fd46d1e 560w, https://mintcdn.com/nimble-f5a8283f/qIF2LyWE-cP0M-Us/images/plugin-install/cowork-browse-plugins.png?w=840&fit=max&auto=format&n=qIF2LyWE-cP0M-Us&q=85&s=910ce49d8c711c897360e762bd704eed 840w, https://mintcdn.com/nimble-f5a8283f/qIF2LyWE-cP0M-Us/images/plugin-install/cowork-browse-plugins.png?w=1100&fit=max&auto=format&n=qIF2LyWE-cP0M-Us&q=85&s=7f415f689617b8520b99aa2bce67dee8 1100w, https://mintcdn.com/nimble-f5a8283f/qIF2LyWE-cP0M-Us/images/plugin-install/cowork-browse-plugins.png?w=1650&fit=max&auto=format&n=qIF2LyWE-cP0M-Us&q=85&s=64db91ab7c6480bad6970320d2730341 1650w, https://mintcdn.com/nimble-f5a8283f/qIF2LyWE-cP0M-Us/images/plugin-install/cowork-browse-plugins.png?w=2500&fit=max&auto=format&n=qIF2LyWE-cP0M-Us&q=85&s=c3e85f7215e5cdba4ef320a00e8b086c 2500w" />
        </Frame>
      </Step>

      <Step title="Find Nimble">
        Switch to the **Plugins** tab, select **Anthropic & Partners**, and search for `Nimble`.

        <Frame>
          <img src="https://mintcdn.com/nimble-f5a8283f/qIF2LyWE-cP0M-Us/images/plugin-install/directory-search-nimble.png?fit=max&auto=format&n=qIF2LyWE-cP0M-Us&q=85&s=ee8308cf479c453603559929354ad886" alt="Directory with Plugins tab and Anthropic & Partners filter, search 'Nimble' showing the Nimble plugin card" width="2000" height="893" data-path="images/plugin-install/directory-search-nimble.png" />
        </Frame>
      </Step>

      <Step title="Install">
        Open the Nimble plugin and click **Install**. The plugin's skills, agents, and MCP connector register automatically.

        <Frame>
          <img src="https://mintcdn.com/nimble-f5a8283f/qIF2LyWE-cP0M-Us/images/plugin-install/nimble-plugin-detail.png?fit=max&auto=format&n=qIF2LyWE-cP0M-Us&q=85&s=8efe881767f65e1bd3857567c9b58372" alt="Nimble plugin detail page showing 14 skills, 2 agents, and 1 MCP connector" width="2000" height="1124" data-path="images/plugin-install/nimble-plugin-detail.png" />
        </Frame>
      </Step>

      <Step title="Connect the MCP server">
        Nimble now appears under **Personal plugins** in Customize, with **Skills**, **Connectors**, and **Agents** sub-sections.

        <Frame>
          <img src="https://mintcdn.com/nimble-f5a8283f/qIF2LyWE-cP0M-Us/images/plugin-install/nimble-installed-sidebar.png?fit=max&auto=format&n=qIF2LyWE-cP0M-Us&q=85&s=d8316cb8c0b0664098269bfa7d705b76" alt="Customize sidebar showing the installed Nimble plugin with Skills, Connectors, and Agents sub-items" width="594" height="504" data-path="images/plugin-install/nimble-installed-sidebar.png" />
        </Frame>

        Open **Connectors**, then click **Connect** to start OAuth.

        <Frame>
          <img src="https://mintcdn.com/nimble-f5a8283f/qIF2LyWE-cP0M-Us/images/plugin-install/cowork-connect-mcp.png?fit=max&auto=format&n=qIF2LyWE-cP0M-Us&q=85&s=aca133789fb574f12f0a5f86aa762d14" alt="Nimble plugin Connectors page with the nimble (CUSTOM) connector and a Connect button" width="2000" height="888" data-path="images/plugin-install/cowork-connect-mcp.png" />
        </Frame>
      </Step>

      <Step title="Approve OAuth">
        Review the permissions Claude is requesting and click **Approve** to authenticate with your Nimble workspace.

        <Frame>
          <img src="https://mintcdn.com/nimble-f5a8283f/X7lm_l_CY6UUR5ie/images/claude-connectors/oauth-approve.png?fit=max&auto=format&n=X7lm_l_CY6UUR5ie&q=85&s=3fb816aefa48a387cf104e997ccbf32d" alt="OAuth approval dialog: Claude is requesting access to Nimble with permissions to verify identity, search the web, extract data, manage Web Search Agents, and maintain access offline" width="1288" height="1308" data-path="images/claude-connectors/oauth-approve.png" />
        </Frame>

        Once approved, the Nimble skills, agents, and MCP tools are live across your Cowork conversations.
      </Step>
    </Steps>

    For more on connecting Nimble to other Claude surfaces, see the [Claude AI Connectors guide](/integrations/connectors/anthropic/claude-connectors).
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

  <Tab title="Codex">
    ### Step 1: Add the MCP Server

    Codex stores MCP configuration in `~/.codex/config.toml` (or a project-scoped `.codex/config.toml`). Add:

    ```toml theme={"system"}
    [mcp_servers.nimble-mcp-server]
    url = "https://mcp.nimbleway.com/mcp"
    bearer_token_env_var = "NIMBLE_API_KEY"
    ```

    Codex reads `NIMBLE_API_KEY` from your environment at runtime — never hardcode the key. Verify the server is registered with `/mcp` inside the Codex TUI.

    ### Step 2: Add Skills

    ```bash theme={"system"}
    npx skills add Nimbleway/agent-skills -a codex
    ```

    Installs both skills into Codex's skill discovery paths (`~/.agents/skills/`). Restart Codex if `/skills` doesn't show `nimble-web-expert` and `nimble-agent-builder`.
  </Tab>

  <Tab title="Cortex Code">
    [Cortex Code](https://docs.snowflake.com/en/user-guide/cortex-code/cortex-code), Snowflake's native AI coding agent for the terminal, installs the Nimble MCP server with a single command. OAuth handles authentication — no API key required.

    ### Add Nimble as an MCP server

    ```bash theme={"system"}
    cortex mcp add nimble https://mcp.nimbleway.com/mcp --transport http
    ```

    Cortex Code writes the server to `~/.snowflake/cortex/mcp.json`. On first connection, your system browser opens for OAuth sign-in; tokens are stored in your OS keychain and refreshed automatically.

    ### Verify the connection

    ```bash theme={"system"}
    cortex mcp list
    cortex mcp start
    ```

    Once `nimble` shows as connected, its tools are namespaced as `mcp__nimble__search`, `mcp__nimble__extract`, `mcp__nimble__map`, and `mcp__nimble__crawl`.

    For organization-wide rollout via managed settings, see the [full Cortex Code integration guide](/integrations/partnerships/snowflake/cortex-code).
  </Tab>

  <Tab title="Vercel CLI">
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
