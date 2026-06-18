---
title: Pay from Agents SDK
description: Use withX402Client to pay for resources from a Cloudflare Agent.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Pay from Agents SDK

The Agents SDK includes an MCP client that can pay for x402-protected tools. Use it from your Agents or any MCP client connection.

TypeScript

```

import { Agent } from "agents";

import { withX402Client } from "agents/x402";

import { privateKeyToAccount } from "viem/accounts";


export class MyAgent extends Agent {

  // Your Agent definitions...


  async onStart() {

    const { id } = await this.mcp.connect(`${this.env.WORKER_URL}/mcp`);

    const account = privateKeyToAccount(this.env.MY_PRIVATE_KEY);


    this.x402Client = withX402Client(this.mcp.mcpConnections[id].client, {

      network: "base-sepolia",

      account,

    });

  }


  onPaymentRequired(paymentRequirements): Promise<boolean> {

    // Your human-in-the-loop confirmation flow...

  }


  async onToolCall(toolName: string, toolArgs: unknown) {

    // The first parameter is the confirmation callback.

    // Set to `null` for the agent to pay automatically.

    return await this.x402Client.callTool(this.onPaymentRequired, {

      name: toolName,

      arguments: toolArgs,

    });

  }

}


```

For a complete working example, see [x402-mcp on GitHub ↗](https://github.com/cloudflare/agents/tree/main/examples/x402-mcp).

## Environment setup

Store your private key securely:

Terminal window

```

# Local development (.dev.vars)

MY_PRIVATE_KEY="0x..."


# Production

npx wrangler secret put MY_PRIVATE_KEY


```

Use `base-sepolia` for testing. Get test USDC from the [Circle faucet ↗](https://faucet.circle.com/).

## Related

* [Charge for MCP tools](https://developers.cloudflare.com/agents/tools/payments/x402/charge-for-mcp-tools/) — Build servers that charge for tools
* [Pay from coding tools](https://developers.cloudflare.com/agents/tools/payments/x402/pay-with-tool-plugins/) — Add payments to OpenCode or Claude Code
* [Human-in-the-loop guide](https://developers.cloudflare.com/agents/concepts/agentic-patterns/human-in-the-loop/) — Implement approval workflows

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/tools/payments/x402/pay-from-agents-sdk/#page","headline":"Pay from Agents SDK · Cloudflare Agents docs","description":"Use withX402Client to pay for resources from a Cloudflare Agent.","url":"https://developers.cloudflare.com/agents/tools/payments/x402/pay-from-agents-sdk/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/tools/","name":"Tools"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/tools/payments/","name":"Agentic Payments"}},{"@type":"ListItem","position":5,"item":{"@id":"/agents/tools/payments/x402/","name":"x402"}},{"@type":"ListItem","position":6,"item":{"@id":"/agents/tools/payments/x402/pay-from-agents-sdk/","name":"Pay from Agents SDK"}}]}
```
