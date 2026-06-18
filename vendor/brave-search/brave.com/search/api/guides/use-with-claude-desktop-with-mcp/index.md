# How to add Brave Search to Claude Desktop with MCP

Search API Guides > Cookbooks

# How to add Brave Search to Claude Desktop with MCP

Published May 6, 2025

Share on X (formerly Twitter) Share on Reddit Share on Telegram Share on LinkedIn

_This guide covers the steps required to enable Brave Search as a tool to be used in the Claude desktop app using the Model Context Protocol (MCP). Since both Brave’s and Anthropic’s products are evolving quickly, it’s best to always check official documentation for the most up-to-date information and instructions. In order to use MCP, you will need to have **Node.js** installed on your computer. Please note that some Windows users have encountered issues with MCP when using a node installer, rather than node version manager. **More information**._

## Sign-up and create a key for Brave Search API

Register or login to a Brave Search API account.

For use with Open WebUI, you must ensure you are subscribed to one of the “Data for AI” plans, which are found under the “Subscriptions” tab in the left hand menu of the dashboard.

On the same menu, visit **API keys** and click **Add API Key** to generate a new key. A dialogue box will appear asking you to name the key and select which of your subscribed plans to use.

_Note: free plans are usually more than enough for personal use (2,000 free queries)_

 ![](/static-assets/images/optimized/search/api/guides/use-with-claude-desktop-with-mcp/images/image-1.png)

## Add the Brave Search MCP server

First, visit **Settings** in the Claude app. Then navigate to the **Developer** tab and click the “**Edit Config**” button.

 ![](/static-assets/images/optimized/search/api/guides/use-with-claude-desktop-with-mcp/images/image-2.png)

This will create and display a configuration file at:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

Next, edit the configuration file in your text editor of choice and replace the contents with the following code, taking care to replace **YOUR_API_KEY_HERE** (between the quotation marks) with the API key you created during step one. You can find additional instructions in Anthropic’s reference servers repo.

```bash
{
  "mcpServers": {
    "brave-search": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-brave-search"
      ],
      "env": {
        "BRAVE_API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```

To enable the Brave Search MCP tool, you’ll need to restart the Claude desktop app. Once restarted, you’ll see a small hammer icon indicating that MCP tools are now available for use with Claude.

 ![](/static-assets/images/optimized/search/api/guides/use-with-claude-desktop-with-mcp/images/image-3.png)

## Ask a question that requires Web search

By asking a question that Claude recognizes could be supported with a Web search, you’ll be prompted to allow the use of an external tool and be able to watch in real time as Claude makes a request to the Brave Search API.

 ![](/static-assets/images/optimized/search/api/guides/use-with-claude-desktop-with-mcp/images/image-4.png)

Share on X (formerly Twitter) Share on Reddit Share on Telegram Share on LinkedIn

Previous: How to use Brave Search with Dify

Next: How to use the Brave Search API…

## Related articles

### How to use Brave Search with Dify

May 6, 2025

This guide will help you get set up with the Brave Search API in Dify, an open-source platform designed to simplify AI application development, and offer real-time, accurate search results as part of AI agent orchestration. Dify offers an intuitive interface that brings together AI workflows, RAG pipelines, and agent capabilities, empowering developers to rapidly move from initial concept to production-ready applications. Sign-up and create a key for Brave Search API Register or login to a Brave Search API account.

Read this article

### How to use Brave Search with n8n (local)

May 6, 2025

This guide covers the steps to enable Brave Search via the official Brave Search community node in n8n.io, a flexible and community-driven automation platform. Please note, this covers the local version of n8n. Sign-up and create a key for Brave Search API Register or login to a Brave Search API account. For use with n8n, you must ensure you are subscribed to one of the Data for AI plans, which are found under the Subscriptions tab in the left hand menu of the dashboard.

Read this article

### How to use Brave Search with Open WebUI

May 2, 2024

This guide covers the steps required to enable Brave Search as the default search engine in Open WebUI, a free and extensible self-hosted AI interface. Since both Brave Search API and any Open WebUI frameworks or libraries can evolve quickly, it’s best to always check the official documentation for the most up-to-date details. 1. Install Open WebUI using Docker Follow the official documentation to install Open WebUI on your choice Linux, Mac, or Windows: https://docs.

Read this article