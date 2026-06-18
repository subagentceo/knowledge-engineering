---
title: Test a Remote MCP Server
description: Test your remote MCP server using the MCP Inspector and compatible MCP clients.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Test a Remote MCP Server

Remote, authorized connections are an evolving part of the [Model Context Protocol (MCP) specification ↗](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization). Not all MCP clients support remote connections yet.

This guide will show you options for how to start using your remote MCP server with MCP clients that support remote connections. If you haven't yet created and deployed a remote MCP server, you should follow the [Build a Remote MCP Server](https://developers.cloudflare.com/agents/model-context-protocol/guides/remote-mcp-server/) guide first.

## The Model Context Protocol (MCP) inspector

The [@modelcontextprotocol/inspector package ↗](https://github.com/modelcontextprotocol/inspector) is a visual testing tool for MCP servers.

1. Open a terminal and run the following command:  
Terminal window  
```  
npx @modelcontextprotocol/inspector  
```  
```  
🚀 MCP Inspector is up and running at:  
  http://localhost:5173/?MCP_PROXY_AUTH_TOKEN=46ab..cd3  
🌐 Opening browser...  
```  
The MCP Inspector will launch in your web browser. You can also launch it manually by opening a browser and going to `http://localhost:<PORT>`. Check the command output for the local port where MCP Inspector is running. In this example, MCP Inspector is served on port `5173`.
2. In the MCP inspector, enter the URL of your MCP server (for example, `http://localhost:8788/mcp`). Select **Connect**.  
You can connect to an MCP server running on your local machine or a remote MCP server running on Cloudflare.
3. If your server requires authentication, the connection will fail. To authenticate:  
   1. In MCP Inspector, select **Open Auth settings**.  
   2. Select **Quick OAuth Flow**.  
   3. Once you have authenticated with the OAuth provider, you will be redirected back to MCP Inspector. Select **Connect**.

You should see the **List tools** button, which will list the tools that your MCP server exposes.

## Connect your remote MCP server to Cloudflare Workers AI Playground

Visit the [Workers AI Playground ↗](https://playground.ai.cloudflare.com/), enter your MCP server URL, and click "Connect". Once authenticated (if required), you should see your tools listed and they will be available to the AI model in the chat.

## Connect your remote MCP server to Claude Desktop via a local proxy

You can use the [mcp-remote local proxy ↗](https://www.npmjs.com/package/mcp-remote) to connect Claude Desktop to your remote MCP server. This lets you test what an interaction with your remote MCP server will be like with a real-world MCP client.

1. Open Claude Desktop and navigate to Settings -> Developer -> Edit Config. This opens the configuration file that controls which MCP servers Claude can access.
2. Replace the content with a configuration like this:

```

{

  "mcpServers": {

    "my-server": {

      "command": "npx",

      "args": ["mcp-remote", "http://my-mcp-server.my-account.workers.dev/mcp"]

    }

  }

}


```

1. Save the file and restart Claude Desktop (command/ctrl + R). When Claude restarts, a browser window will open showing your OAuth login page. Complete the authorization flow to grant Claude access to your MCP server.

Once authenticated, you'll be able to see your tools by clicking the tools icon in the bottom right corner of Claude's interface.

## Connect your remote MCP server to Cursor

Connect [Cursor ↗](https://cursor.com/docs/context/mcp) to your remote MCP server by editing the project's `.cursor/mcp.json` file or a global `~/.cursor/mcp.json` file and adding the following configuration:

```

{

  "mcpServers": {

    "my-server": {

      "url": "http://my-mcp-server.my-account.workers.dev/mcp"

    }

  }

}


```

## Connect your remote MCP server to Windsurf

You can connect your remote MCP server to [Windsurf ↗](https://docs.windsurf.com) by editing the [mcp\_config.json file ↗](https://docs.windsurf.com/windsurf/cascade/mcp), and adding the following configuration:

```

{

  "mcpServers": {

    "my-server": {

      "serverUrl": "http://my-mcp-server.my-account.workers.dev/mcp"

    }

  }

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/model-context-protocol/guides/test-remote-mcp-server/#page","headline":"Test a Remote MCP Server · Cloudflare Agents docs","description":"Test your remote MCP server using the MCP Inspector and compatible MCP clients.","url":"https://developers.cloudflare.com/agents/model-context-protocol/guides/test-remote-mcp-server/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["MCP"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/model-context-protocol/","name":"Model Context Protocol (MCP)"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/model-context-protocol/guides/","name":"Guides"}},{"@type":"ListItem","position":5,"item":{"@id":"/agents/model-context-protocol/guides/test-remote-mcp-server/","name":"Test a Remote MCP Server"}}]}
```
