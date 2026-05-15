> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Claude AI Connectors

> Add Nimble to Claude.ai as a custom connector for real-time web search, extraction, and crawling.

Add Nimble to Claude.ai as a custom connector and Claude can search, extract, map, and crawl the web on its own — no code required.

<Frame>
  <img src="https://mintcdn.com/nimble-f5a8283f/X7lm_l_CY6UUR5ie/images/claude-connectors/connector-in-cowork.png?fit=max&auto=format&n=X7lm_l_CY6UUR5ie&q=85&s=c895129bec80c4196806c5042959aac1" alt="Cowork new-task input with the + menu open: Connectors submenu shows Nimble MCP toggled on alongside Excalidraw, Google Drive, Linear, Notion, Slack, and Claude in Chrome" width="1740" height="820" data-path="images/claude-connectors/connector-in-cowork.png" />
</Frame>

## Supported Surfaces

Custom connectors work across Anthropic's products:

* **Claude.ai** (web)
* **Claude Desktop** (macOS, Windows)
* **Claude Code**
* **Claude Cowork**

## Prerequisites

* A [Claude.ai](https://claude.ai) account on a plan that supports connectors (Pro, Max, Team, or Enterprise).
* A [Nimble account](https://online.nimbleway.com/signup) — sign in via OAuth during setup. No API key needed.

## Installation

<Steps>
  <Step title="Open Connectors settings">
    In Claude.ai, navigate to **Customize > Connectors**.
  </Step>

  <Step title="Add a custom connector">
    Click the **+** button, then choose **Add custom connector**.

    <Frame>
      <img src="https://mintcdn.com/nimble-f5a8283f/X7lm_l_CY6UUR5ie/images/claude-connectors/add-custom-connector.png?fit=max&auto=format&n=X7lm_l_CY6UUR5ie&q=85&s=b0da5e811f198deda9f892140fd629e8" alt="Customize > Connectors page with the + menu open, showing the Add custom connector option" data-og-width="1362" width="1362" data-og-height="548" height="548" data-path="images/claude-connectors/add-custom-connector.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/nimble-f5a8283f/X7lm_l_CY6UUR5ie/images/claude-connectors/add-custom-connector.png?w=280&fit=max&auto=format&n=X7lm_l_CY6UUR5ie&q=85&s=b0b32e06179c255d3d8a72910c8607e9 280w, https://mintcdn.com/nimble-f5a8283f/X7lm_l_CY6UUR5ie/images/claude-connectors/add-custom-connector.png?w=560&fit=max&auto=format&n=X7lm_l_CY6UUR5ie&q=85&s=3c4c775dd970838d16230c037b38104c 560w, https://mintcdn.com/nimble-f5a8283f/X7lm_l_CY6UUR5ie/images/claude-connectors/add-custom-connector.png?w=840&fit=max&auto=format&n=X7lm_l_CY6UUR5ie&q=85&s=0f7c9fc075bf168060f8041a2f165b40 840w, https://mintcdn.com/nimble-f5a8283f/X7lm_l_CY6UUR5ie/images/claude-connectors/add-custom-connector.png?w=1100&fit=max&auto=format&n=X7lm_l_CY6UUR5ie&q=85&s=5200dbb20460b66a9f218aadcf09a4c7 1100w, https://mintcdn.com/nimble-f5a8283f/X7lm_l_CY6UUR5ie/images/claude-connectors/add-custom-connector.png?w=1650&fit=max&auto=format&n=X7lm_l_CY6UUR5ie&q=85&s=11befb52300ebf3c058bef72c0ff8321 1650w, https://mintcdn.com/nimble-f5a8283f/X7lm_l_CY6UUR5ie/images/claude-connectors/add-custom-connector.png?w=2500&fit=max&auto=format&n=X7lm_l_CY6UUR5ie&q=85&s=f6c2a1c654516c19f49c5db9a3e45ec2 2500w" />
    </Frame>
  </Step>

  <Step title="Enter the Nimble MCP details">
    Give the connector a name (e.g. `Nimble MCP`) and set the remote MCP server URL to:

    ```
    https://mcp.nimbleway.com/mcp
    ```

    <Frame>
      <img src="https://mintcdn.com/nimble-f5a8283f/X7lm_l_CY6UUR5ie/images/claude-connectors/connector-url.png?fit=max&auto=format&n=X7lm_l_CY6UUR5ie&q=85&s=3d47ddc03006f4c83d6c569d4ba05e2e" alt="Add custom connector dialog with name 'Nimble MCP' and URL https://mcp.nimbleway.com/mcp" width="1114" height="882" data-path="images/claude-connectors/connector-url.png" />
    </Frame>
  </Step>

  <Step title="Finish adding the connector">
    Click **Add**. The Nimble connector now appears in your connectors list with a `CUSTOM` badge.

    <Frame>
      <img src="https://mintcdn.com/nimble-f5a8283f/X7lm_l_CY6UUR5ie/images/claude-connectors/connector-added.png?fit=max&auto=format&n=X7lm_l_CY6UUR5ie&q=85&s=6811bf551322f4af82959df2e6af505c" alt="Connectors list showing Nimble MCP with a CUSTOM badge" width="720" height="778" data-path="images/claude-connectors/connector-added.png" />
    </Frame>
  </Step>

  <Step title="Connect with OAuth">
    Open the new **Nimble MCP** connector and click **Connect**.

    <Frame>
      <img src="https://mintcdn.com/nimble-f5a8283f/X7lm_l_CY6UUR5ie/images/claude-connectors/oauth-connect.png?fit=max&auto=format&n=X7lm_l_CY6UUR5ie&q=85&s=8960b385a182f5833f5eee5a9df73048" alt="Nimble MCP connector page showing 'You are not connected to Nimble MCP yet.' with a Connect button" width="1026" height="590" data-path="images/claude-connectors/oauth-connect.png" />
    </Frame>

    Review the permissions Claude is requesting and click **Approve** to authenticate with your Nimble workspace. Once approved, the connector is live inside Claude conversations.

    <Frame>
      <img src="https://mintcdn.com/nimble-f5a8283f/X7lm_l_CY6UUR5ie/images/claude-connectors/oauth-approve.png?fit=max&auto=format&n=X7lm_l_CY6UUR5ie&q=85&s=3fb816aefa48a387cf104e997ccbf32d" alt="OAuth approval dialog: Claude is requesting access to Nimble with permissions to verify identity, search the web, extract data, manage Web Search Agents, and maintain access offline" width="1288" height="1308" data-path="images/claude-connectors/oauth-approve.png" />
    </Frame>
  </Step>
</Steps>

For Anthropic's full reference on custom connectors, see the [Claude support article](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp).

## Tools

Once connected, Claude calls any of the Nimble MCP server's tools automatically, based on the user's prompt.

| Tool                | Use Case                                                   |
| ------------------- | ---------------------------------------------------------- |
| `nimble_search`     | Web search across multiple engines with configurable depth |
| `nimble_extract`    | Pull clean content from any URL                            |
| `nimble_map`        | Discover all URLs on a domain                              |
| `nimble_crawl`      | Crawl an entire site with path filtering                   |
| `nimble_agents_run` | Run a custom Web Search Agent                              |

<Tip>
  For the full list of MCP tools and parameters, see the [Nimble MCP Server reference](/integrations/mcp-server/mcp-server).
</Tip>

## Power Your Flow with Nimble Agent Skills

Nimble is an **official Anthropic plugin partner**. The Nimble plugin ships in Claude's **Anthropic & Partners** directory and bundles the MCP server with a curated set of agent skills — opinionated workflows that guide Claude through the most common web data jobs (research, scraping, mapping, and crawling) so you get the best of Nimble's Web Tools without writing a prompt from scratch.

Once installed, just type `/` in any new task to invoke a skill directly:

<Frame>
  <img src="https://mintcdn.com/nimble-f5a8283f/X7lm_l_CY6UUR5ie/images/claude-connectors/skills-in-action.png?fit=max&auto=format&n=X7lm_l_CY6UUR5ie&q=85&s=92fc96cb70ef7d0134dae7c6ce90f25f" alt="Cowork new-task input with /nimble-web-expert prepended to a prompt: 'Find the top 5 AI agent platforms launched this year and summarize their pricing pages.'" width="1564" height="674" data-path="images/claude-connectors/skills-in-action.png" />
</Frame>

### Install the Nimble plugin

<Steps>
  <Step title="Open the plugin directory">
    From either the **Cowork** or **Claude Code** tab in Claude Desktop, click **Customize** in the left sidebar, then click **Browse plugins** to open the Directory.
  </Step>

  <Step title="Find Nimble">
    Switch to the **Plugins** tab, select **Anthropic & Partners**, and search for `Nimble`.

    <Frame>
      <img src="https://mintcdn.com/nimble-f5a8283f/X7lm_l_CY6UUR5ie/images/claude-connectors/plugin-directory.png?fit=max&auto=format&n=X7lm_l_CY6UUR5ie&q=85&s=ccca8ee7f6f72b38df32e35c72e8de92" alt="Directory with the Plugins tab and Anthropic & Partners filter selected, showing the Nimble plugin card" width="2000" height="611" data-path="images/claude-connectors/plugin-directory.png" />
    </Frame>
  </Step>

  <Step title="Install">
    Click the Nimble card to open its details, then click **Install**. The plugin saves locally on your machine and the bundled MCP server, agent skills, and sub-agents register automatically.

    <Frame>
      <img src="https://mintcdn.com/nimble-f5a8283f/X7lm_l_CY6UUR5ie/images/claude-connectors/plugin-install.png?fit=max&auto=format&n=X7lm_l_CY6UUR5ie&q=85&s=75dec2d71a8f0a6a833bc9af037ac081" alt="Nimble plugin detail page showing 20 skills, 2 agents, and the nimble-mcp-server connector, with an Install button" width="2000" height="1221" data-path="images/claude-connectors/plugin-install.png" />
    </Frame>
  </Step>

  <Step title="Use the bundled skills">
    Once installed, Nimble's agent skills are available across your conversations. Type `/` in chat to browse them, or let Claude invoke them automatically based on your prompt.

    <Frame>
      <img src="https://mintcdn.com/nimble-f5a8283f/X7lm_l_CY6UUR5ie/images/claude-connectors/plugin-installed.png?fit=max&auto=format&n=X7lm_l_CY6UUR5ie&q=85&s=36acf070306bd31979c188b3627ec00b" alt="Installed Nimble plugin page listing skills like /nimble-web-expert, /company-deep-dive, /competitor-intel, /local-places, /meeting-prep, and /nimble-agent-builder" width="2000" height="977" data-path="images/claude-connectors/plugin-installed.png" />
    </Frame>
  </Step>
</Steps>

For Anthropic's full reference, see [Use plugins in Claude Cowork](https://support.claude.com/en/articles/13837440-use-plugins-in-claude-cowork).

## How It Works

<Steps>
  <Step title="You ask Claude something">
    Type a prompt that needs live web data. Claude detects when the Nimble connector can help.
  </Step>

  <Step title="Claude calls Nimble">
    Claude routes the request to the Nimble MCP server, which runs the search, extraction, or crawl in real time.
  </Step>

  <Step title="Claude answers">
    Results return to the conversation as structured data Claude can quote, cite, or summarize.
  </Step>
</Steps>

## Example Prompts

<AccordionGroup>
  <Accordion title="Live competitor research">
    > *"Find the top 5 AI agent platforms launched this year and summarize their pricing pages."*

    Claude calls `nimble_search` for the list, then `nimble_extract` on each pricing page, then summarizes.
  </Accordion>

  <Accordion title="Site-wide content audit">
    > *"Crawl docs.example.com and list every page that mentions 'rate limits.'"*

    Claude calls `nimble_crawl` with a path filter, then surfaces matches with URLs.
  </Accordion>

  <Accordion title="One-shot extraction">
    > *"Pull the headline, author, and publish date from this article: `https://example.com/article`"*

    Claude calls `nimble_extract` and returns the structured fields.
  </Accordion>

  <Accordion title="Domain mapping">
    > *"Show me every page on nimbleway.com under /blog."*

    Claude calls `nimble_map` and lists the discovered URLs.
  </Accordion>
</AccordionGroup>

## Next Steps

<CardGroup cols={2}>
  <Card title="Nimble MCP Server" icon="server" href="/integrations/mcp-server/mcp-server">
    Full MCP server reference — Cursor, Claude Code, and Claude Desktop setup
  </Card>

  <Card title="Anthropic SDK" icon="code" href="/integrations/connectors/anthropic/sdk">
    Use Nimble as a tool inside the Anthropic SDK in Python or Node
  </Card>

  <Card title="Search" icon="magnifying-glass" href="/nimble-sdk/web-tools/search">
    Web search with depth levels, filtering, and AI answers
  </Card>

  <Card title="Extract" icon="arrows-to-circle" href="/nimble-sdk/web-tools/extract/quickstart">
    Extract clean content from any URL
  </Card>
</CardGroup>
