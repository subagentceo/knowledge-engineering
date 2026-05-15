> ## Documentation Index
> Fetch the complete documentation index at: https://docs.nimbleway.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Nimble MCP Docs 

> Connect your AI tools to the Nimble documentation knowledge base via MCP

The Nimble Docs MCP server gives AI agents instant access to the full Nimble documentation including API references, guides, code examples, and feature explanations, all searchable in real time.

Connect it to Claude, Cursor, VS Code, or any MCP-compatible tool to ask questions about Nimble and get accurate, sourced answers without leaving your workflow.

**Server URL:** `https://docs.nimbleway.com/mcp`

## Available tools

<AccordionGroup>
  <Accordion icon="magnifying-glass" title="search_nimble_docs">
    Search across the Nimble Docs knowledge base to find relevant information, code examples, API references, and guides.

    Use this tool when you need to answer questions about Nimble Docs, find specific documentation, understand how features work, or locate implementation details. The search returns contextual content with titles and direct links to the documentation pages.

    **No API key required** — the Docs MCP is publicly accessible.
  </Accordion>
</AccordionGroup>

## Setup

No authentication required. Add the server URL to your preferred AI tool.

<Tabs>
  <Tab title="Claude">
    1. Open **Claude Settings** and navigate to the **Connectors** page.
    2. Select **Add custom connector**.
    3. Enter a name (e.g. `nimble-docs`) and the server URL:
       ```
       https://docs.nimbleway.com/mcp
       ```
    4. Select **Add**.
    5. When chatting in Claude, select the attachments button (the **+** icon) and select your MCP server to activate it.
  </Tab>

  <Tab title="Claude Code">
    Run this command in your terminal:

    ```bash theme={"system"}
    claude mcp add --transport http nimble-docs https://docs.nimbleway.com/mcp
    ```

    The server is available in all Claude Code sessions immediately.
  </Tab>

  <Tab title="Cursor">
    1. Open the command palette with `Command` + `Shift` + `P` (or `Ctrl` + `Shift` + `P` on Windows).
    2. Search for **Open MCP settings**.
    3. Select **Add custom MCP** — this opens `mcp.json`.
    4. Add the following configuration:

    ```json theme={"system"}
    {
      "mcpServers": {
        "nimble-docs": {
          "url": "https://docs.nimbleway.com/mcp"
        }
      }
    }
    ```

    Restart Cursor for changes to take effect.
  </Tab>

  <Tab title="VS Code">
    1. Create or open `.vscode/mcp.json` in your project.
    2. Add the following configuration:

    ```json theme={"system"}
    {
      "servers": {
        "nimble-docs": {
          "type": "http",
          "url": "https://docs.nimbleway.com/mcp"
        }
      }
    }
    ```
  </Tab>
</Tabs>

## Example prompts

Once connected, ask your AI tool questions like:

* *"How do I extract a webpage with JavaScript rendering?"*
* *"What's the difference between async and batch extraction?"*
* *"Show me how to configure cloud storage delivery for extracted results."*
* *"What parameters does the Search API support?"*
* *"How do I set up a Nimble agent for Amazon product pages?"*

## Next steps

<CardGroup cols={2}>
  <Card icon="server" href="/integrations/mcp-server/mcp-server" title="Nimble MCP Server">
    Connect AI agents to Nimble's web data platform for live extraction and
    search
  </Card>

  <Card icon="rectangle-terminal" href="/integrations/agent-skills/web-tools-skills/nimble-web-expert" title="Agent Skills">
    Token-efficient CLI skill for web retrieval in Claude Code and Cursor
  </Card>
</CardGroup>
