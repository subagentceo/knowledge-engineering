---
title: Email
description: Connect agents to email so they can send outbound messages, process inbound mail, and handle follow-up replies.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Email

Email is a communication channel for agents that need to interact with users or systems through inboxes instead of chat UIs. Agents can send outbound email, receive inbound email, route replies back to an existing session, and use email content as part of an agent workflow.

Use email when you want an agent to:

* Send notifications, summaries, receipts, or follow-up messages.
* Process inbound messages through [Cloudflare Email Service](https://developers.cloudflare.com/email-service/).
* Continue a conversation from a reply.
* Route support, sales, or operational workflows through an agent.

## How it works

Outbound email uses a `send_email` binding in your Worker. Inbound email uses an Email Service routing rule that sends messages to your Worker, where the agent can parse the sender, recipients, headers, and body before deciding how to respond.

For reply handling, include a stable identifier in the reply address, message metadata, or headers so the Worker can route follow-up messages to the right agent instance.

## Basic pattern

Implement `onEmail()` to handle inbound email, and use `sendEmail()` or `replyToEmail()` when the agent needs to send a response.

* [  JavaScript ](#tab-panel-5283)
* [  TypeScript ](#tab-panel-5284)

JavaScript

```

import { Agent, callable, routeAgentEmail } from "agents";

import { createAddressBasedEmailResolver } from "agents/email";


export class EmailAgent extends Agent {

  @callable()

  async sendWelcomeEmail(to) {

    await this.sendEmail({

      binding: this.env.EMAIL,

      to,

      from: "support@yourdomain.com",

      replyTo: "support@yourdomain.com",

      subject: "Welcome",

      text: "Thanks for signing up. Reply to this email if you need help.",

    });

  }


  async onEmail(email) {

    await this.replyToEmail(email, {

      fromName: "Support Agent",

      body: "Thanks for your email. We received it.",

    });

  }

}


export default {

  async email(message, env) {

    await routeAgentEmail(message, env, {

      resolver: createAddressBasedEmailResolver("EmailAgent"),

    });

  },

};


```

TypeScript

```

import { Agent, callable, routeAgentEmail } from "agents";

import { createAddressBasedEmailResolver, type AgentEmail } from "agents/email";


export class EmailAgent extends Agent {

  @callable()

  async sendWelcomeEmail(to: string) {

    await this.sendEmail({

      binding: this.env.EMAIL,

      to,

      from: "support@yourdomain.com",

      replyTo: "support@yourdomain.com",

      subject: "Welcome",

      text: "Thanks for signing up. Reply to this email if you need help.",

    });

  }


  async onEmail(email: AgentEmail) {

    await this.replyToEmail(email, {

      fromName: "Support Agent",

      body: "Thanks for your email. We received it.",

    });

  }

}


export default {

  async email(message, env) {

    await routeAgentEmail(message, env, {

      resolver: createAddressBasedEmailResolver("EmailAgent"),

    });

  },

} satisfies ExportedHandler<Env>;


```

## Configuration

Add a `send_email` binding for outbound email, then configure an Email Service routing rule to send inbound mail to your Worker.

* [  wrangler.jsonc ](#tab-panel-5281)
* [  wrangler.toml ](#tab-panel-5282)

JSONC

```

{

  "$schema": "./node_modules/wrangler/config-schema.json",

  "send_email": [

    {

      "name": "EMAIL",

      "remote": true

    }

  ]

}


```

TOML

```

[[send_email]]

name = "EMAIL"

remote = true


```

The `remote = true` option lets you call the real Email Service API during local development with `wrangler dev`.

## Build an email agent

For a complete walkthrough, including domain setup, bindings, inbound routing, and secure replies, use the email agent example.

[ Email agent ](https://developers.cloudflare.com/agents/examples/email-agent/) Build an agent that sends, receives, routes, and replies to email using Cloudflare Email Service and the Agents SDK. 

## Related resources

[ Email Service ](https://developers.cloudflare.com/email-service/) Route, receive, and send email with Cloudflare Email Service. 

[ Send email from Workers ](https://developers.cloudflare.com/email-service/api/send-emails/workers-api/) Use the Workers API to send outbound email. 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/communication-channels/email/#page","headline":"Email · Cloudflare Agents docs","description":"Connect agents to email so they can send outbound messages, process inbound mail, and handle follow-up replies.","url":"https://developers.cloudflare.com/agents/communication-channels/email/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-09","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/communication-channels/","name":"Communication channels"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/communication-channels/email/","name":"Email"}}]}
```
