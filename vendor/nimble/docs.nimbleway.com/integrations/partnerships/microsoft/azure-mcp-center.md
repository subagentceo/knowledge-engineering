> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Azure MCP Center

> Install Nimble MCP from Azure MCP Center and use it in VS Code with GitHub Copilot Agent Mode

Nimble MCP is an officially onboarded partner on [Azure MCP Center](https://mcp.azure.com/detail/nimble-mcp) — Microsoft's curated registry of enterprise-ready MCP servers, powered by Azure API Center. Install with one click into VS Code, sign in with OAuth, and use Nimble's full web data toolkit in GitHub Copilot Agent Mode. No API key to paste.

<Frame caption="Nimble MCP on Azure MCP Center — install in VS Code in seconds">
  <video autoPlay muted loop playsInline className="w-full aspect-video" src="https://mintcdn.com/nimble-f5a8283f/jqr2xPMGinxdsVQo/images/partnerships/azure-mcp-center-hero.mp4?fit=max&auto=format&n=jqr2xPMGinxdsVQo&q=85&s=b10fbb479835f195a034072d38878a7e" data-path="images/partnerships/azure-mcp-center-hero.mp4" />
</Frame>

## What you get

* **Nimble's web data toolkit** in VS Code Copilot Agent Mode — search, extract, map, crawl, and Web Search Agents
* **One-click install** — no JSON config to paste
* **OAuth 2.1 sign-in** with PKCE — no API key to manage or rotate
* **Streamable HTTP transport** at `https://mcp.nimbleway.com/mcp`

## Prerequisites

* [VS Code](https://code.visualstudio.com/) **1.99 or later** with the [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) extension
* Copilot Agent Mode enabled (`chat.agent.enabled` in settings)
* A Nimble account — [sign up free](https://online.nimbleway.com/signup)

## Install from Azure MCP Center

<Steps>
  <Step title="Open the Nimble MCP listing">
    Visit [mcp.azure.com/detail/nimble-mcp](https://mcp.azure.com/detail/nimble-mcp).
  </Step>

  <Step title="Click Install in VS Code">
    The button launches VS Code and prompts to add Nimble MCP to your settings.

    <Frame caption="Install Nimble MCP into VS Code">
      <img src="https://mintcdn.com/nimble-f5a8283f/jqr2xPMGinxdsVQo/images/partnerships/azure-mcp-center-install.png?fit=max&auto=format&n=jqr2xPMGinxdsVQo&q=85&s=15352d7be89d420f64481048203d335c" alt="Install Nimble MCP from Azure MCP Center into VS Code" width="2000" height="901" data-path="images/partnerships/azure-mcp-center-install.png" />
    </Frame>
  </Step>

  <Step title="Sign in with OAuth">
    On first tool call, VS Code prompts to authenticate. Click **Allow**, then approve the requested scopes in the browser — VS Code stores the tokens and refreshes them automatically.

    <Frame caption="VS Code asks permission to authenticate with Nimble">
      <img src="https://mintcdn.com/nimble-f5a8283f/jqr2xPMGinxdsVQo/images/partnerships/azure-mcp-center-auth-prompt.png?fit=max&auto=format&n=jqr2xPMGinxdsVQo&q=85&s=4b92af3273d83b013679426bff1c84c1" alt="VS Code dialog requesting permission to authenticate to Nimble MCP Server" width="622" height="370" data-path="images/partnerships/azure-mcp-center-auth-prompt.png" />
    </Frame>

    <Frame caption="OAuth consent screen with the scopes Nimble requests">
      <img src="https://mintcdn.com/nimble-f5a8283f/jqr2xPMGinxdsVQo/images/partnerships/azure-mcp-center-oauth-consent.png?fit=max&auto=format&n=jqr2xPMGinxdsVQo&q=85&s=7545e85990dcfe50721a746e4d02b2c9" alt="Nimble OAuth consent page showing Visual Studio Code is requesting access with permissions to verify identity, search the web, extract data, and manage Web Search Agents" width="1284" height="1286" data-path="images/partnerships/azure-mcp-center-oauth-consent.png" />
    </Frame>
  </Step>

  <Step title="Use Nimble in Copilot Chat">
    Open **Copilot Chat → Agent Mode**, click the tools icon, and confirm the Nimble tools appear in the list. Ask Copilot to search the web, extract a page, or map a site — Copilot picks the right Nimble tool and runs it.

    <Frame caption="Copilot Agent Mode running Nimble Search inside VS Code">
      <img src="https://mintcdn.com/nimble-f5a8283f/jqr2xPMGinxdsVQo/images/partnerships/azure-mcp-center-copilot-running.png?fit=max&auto=format&n=jqr2xPMGinxdsVQo&q=85&s=f1530e905b1db9f5706ed0e2cdf43027" alt="VS Code Copilot Chat running Nimble Search via the nimble-mcp MCP Server" width="644" height="634" data-path="images/partnerships/azure-mcp-center-copilot-running.png" />
    </Frame>
  </Step>
</Steps>

## Why web tools belong in your IDE

Copilot is great at writing code — but its training cuts off, it doesn't know your dependencies' breaking changes, and it can't see the third-party docs and live data your code actually has to work with. Web search and extraction close that gap across every stage of the dev loop:

* **Research before you build.** Scope new features by searching real usage, competitor implementations, and current benchmarks — not stale snippets.
* **Ground technical planning in current docs.** Pull the latest API surface for the libraries you depend on, not the version Copilot was trained on.
* **Pull real data into your tests.** Extract live pages as clean JSON for fixtures, seed data, or generated types — no copy-paste, no mocks.
* **Build agents that need the web.** Test the same Nimble MCP your shipped agent will use, directly in Copilot, before you commit it.

## Try these prompts

Paste any of these into Copilot Chat in Agent Mode — Copilot picks the right Nimble tool automatically. The flow follows a normal dev loop: research, plan, test, ship.

<CardGroup cols={2}>
  <Card title="1. Research before you build" icon="magnifying-glass-chart">
    "I'm scoping a checkout flow. Search recent articles and extract the top 5 — summarize patterns, edge cases, and pitfalls before I write the spec."
  </Card>

  <Card title="2. Plan with current docs" icon="book-open">
    "Search for the latest LangGraph streaming API and breaking changes since v0.2, then update `graph.ts` to match."
  </Card>

  <Card title="3. Test with real data" icon="flask">
    "Extract these 10 product URLs as clean JSON and save them to `fixtures/products.json` for my integration tests."
  </Card>

  <Card title="4. Build agents that need the web" icon="robot">
    "I'm building a research agent in `src/agent.ts`. Use Nimble search and extract live so I can debug real responses, then wire the same MCP into the agent's tool list."
  </Card>
</CardGroup>

## Use Nimble in your own Azure API Center

Enterprises with their own [Azure API Center](https://learn.microsoft.com/azure/api-center/set-up-api-center) registry get Nimble MCP automatically — every new API Center surfaces the same official partner servers as `mcp.azure.com`. Expose Nimble to your developers alongside your internal MCP servers, optionally proxied through [Azure API Management (AI Gateway)](https://learn.microsoft.com/azure/api-management/genai-gateway-capabilities) for centralized auth, rate limiting, and audit logging.

## Resources

<CardGroup cols={2}>
  <Card title="Nimble on Azure MCP Center" icon="store" href="https://mcp.azure.com/detail/nimble-mcp">
    Install Nimble MCP directly into VS Code from the Azure MCP Center listing
  </Card>

  <Card title="Nimble MCP Server Docs" icon="server" href="/integrations/mcp-server/mcp-server">
    Full MCP Server setup for Cursor, Claude, and other clients
  </Card>

  <Card title="Azure API Center" icon="book-open" href="https://learn.microsoft.com/azure/api-center/set-up-api-center">
    Build your own private MCP registry on Azure
  </Card>

  <Card title="VS Code MCP Support" icon="code" href="https://code.visualstudio.com/docs/copilot/chat/mcp-servers">
    Microsoft's docs for installing and using MCP servers in VS Code
  </Card>
</CardGroup>
