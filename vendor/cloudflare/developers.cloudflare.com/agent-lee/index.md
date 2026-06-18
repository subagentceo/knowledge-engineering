---
title: Agent Lee
description: Ask questions, run diagnostics, and take actions across your Cloudflare account using an AI-powered dashboard assistant.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agent-lee/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Agent Lee

An AI co-pilot built into the Cloudflare dashboard. Ask questions about your account, take actions, and run diagnostics, all in plain language.

Beta

Agent Lee is currently in beta and only available to accounts on a Free plan. Features and behaviors may change.

With Agent Lee, you can:

* Ask questions about your account configuration and get answers based on your actual data.
* Make changes to DNS records, zone settings, and security rules, with your approval required before anything executes.
* Run network diagnostics like DNS lookups and certificate checks.
* Generate inline charts and visualizations from your account analytics.

To get started, log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com) and select **Ask AI** in the upper-right corner of any dashboard page.

---

## Capabilities

### Account-aware answers

Agent Lee answers based on your actual account data, not just documentation. When you ask a question, it fetches your zone configuration, DNS records, and security settings before responding.

### Write operations

You can ask Agent Lee to create, update, or delete resources across your account using natural language. Every write operation requires your explicit approval before it executes, Agent Lee shows you exactly what it plans to do and waits for confirmation.

Example requests:

* "Add an A record for blog.example.com pointing to 192.0.2.10."
* "Enable Always Use HTTPS on my zone."
* "Set the SSL mode for example.com to Full (strict)."

### Network diagnostics

Run diagnostic commands to troubleshoot connectivity and configuration issues:

* **DNS lookups**: Query DNS records for any domain
* **Certificate checks**: Inspect TLS/SSL certificates
* **Domain information**: Look up WHOIS and RDAP registration data

### Generative UI

Agent Lee renders inline charts and data visualizations directly in the chat panel based on your account analytics. Example requests:

* "Show me a chart of my traffic over the last 7 days."
* "What does my error rate look like for the past 24 hours?"

---

## Data access and privacy

### What Agent Lee can access

* Zone settings, DNS records, firewall and WAF rules
* Workers scripts, routes, and bindings
* R2 bucket names, Cloudflare Tunnel configuration, cache rules
* Registrar domain data, account plan and usage metadata

Agent Lee fetches this data on demand when your question requires it.

### What Agent Lee cannot access

* Payment methods, billing history, or invoice details
* Account passwords, login credentials, or API tokens
* Raw log data or Logpush datasets
* Data from other Cloudflare accounts

### Conversation storage

Conversations are stored per user using [Durable Objects](https://developers.cloudflare.com/durable-objects/), isolated to your account. Conversation data is retained for one year in accordance with Cloudflare's data retention policy. Agent Lee does not currently reference previous conversation context when responding.

### Data usage

Agent Lee does not currently use your conversations, prompts, or account data to train AI models, nor do we share your data with other Cloudflare customers. Should these practices change in the future, we will provide advance notice to keep you informed. For Cloudflare's authoritative data handling commitments, refer to the [Cloudflare Privacy Policy ↗](https://www.cloudflare.com/privacypolicy/).

---

## Limitations

Agent Lee cannot:

* Write Workers scripts or generate application code
* Replace [Cloudflare Support ↗](https://support.cloudflare.com) for billing issues, account recovery, or outages
* Access payment methods, billing history, or API tokens
* Operate across multiple accounts: sessions are scoped to your authenticated account
* Remember previous conversations: each session starts fresh
* Query raw log data or Logpush datasets
* Execute write operations without your explicit approval

Agent Lee is entirely optional. If you do not open the Ask AI panel, none of your data is sent to or processed by it.

---

## Built on Cloudflare

Agent Lee is built on Cloudflare's own developer platform using the same primitives available to any Cloudflare developer.

| Component                                                                                                | Role                                                  |
| -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| [Agents SDK](https://developers.cloudflare.com/agents/)                                                  | Agent lifecycle, state management, and scheduling     |
| [Durable Objects](https://developers.cloudflare.com/durable-objects/)                                    | Per-user conversation storage and write approval gate |
| [Workers AI](https://developers.cloudflare.com/workers-ai/)                                              | LLM inference                                         |
| [Cloudflare MCP server](https://developers.cloudflare.com/agents/model-context-protocol/apis/agent-api/) | Tool definitions for Cloudflare API operations        |

---

## Related resources

* [Agents SDK](https://developers.cloudflare.com/agents/)
* [Human in the Loop](https://developers.cloudflare.com/agents/concepts/agentic-patterns/human-in-the-loop/)
* [Workers AI](https://developers.cloudflare.com/workers-ai/)
* [Blog post: Introducing Agent Lee ↗](https://blog.cloudflare.com/introducing-agent-lee)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/agent-lee/#page","headline":"Overview · Agent Lee docs","description":"Ask questions, run diagnostics, and take actions across your Cloudflare account using an AI-powered dashboard assistant.","url":"https://developers.cloudflare.com/agent-lee/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agent-lee/","name":"Agent Lee"}}]}
```
