---
title: Claude Code + Cloudflare
description: Terminal-based coding agent that understands your codebase, runs commands, edits files, and manages git. Made by Anthropic.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agent-setup/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

[ All agents](https://developers.cloudflare.com/agent-setup/) 

![Claude Code icon](https://developers.cloudflare.com/icons/agents/claude/light.svg) ![Claude Code icon](https://developers.cloudflare.com/icons/agents/claude/dark.svg) 

#  Claude Code + Cloudflare

 Anthropic 

 Terminal-based coding agent that understands your codebase, runs commands, edits files, and manages git. Made by Anthropic. 

TerminalStandaloneCloudExtension

[ Cloudflare Skills ↗](https://github.com/cloudflare/skills)[ Cloudflare Code Mode API MCP ↗](https://github.com/cloudflare/mcp)[ Cloudflare Domain Specific MCPs ↗](https://github.com/cloudflare/mcp-server-cloudflare)[ Claude Code Docs ↗](https://docs.anthropic.com/en/docs/claude-code) 

## Quick start

1. **Install Claude Code**  
Install the Claude Code CLI. For Windows, Homebrew, WinGet, or npm, see the [Claude Code setup guide ↗](https://docs.anthropic.com/en/docs/claude-code/setup).  
Terminal window  
```  
curl -fsSL https://claude.ai/install.sh | bash  
```
2. **Launch Claude Code in your project**  
Start Claude Code from the root of your project, where `wrangler.jsonc` lives (if it already exists).  
Terminal window  
```  
claude  
```
3. **Install the Cloudflare plugin**  
In Claude Code, run these two slash commands. This installs Cloudflare Skills and registers the Cloudflare MCP servers.  
```  
/plugin marketplace add cloudflare/skills  
/plugin install cloudflare@cloudflare  
```
4. **Try a prompt**  
For example:  
```  
Create a RAG pipeline using Vectorize and Workers AI to answer questions over my documentation.  
```

## Cloudflare platform access

Expand any section to learn more.

Cloudflare Skills 

Persistent platform context that teaches the agent how Cloudflare works.

Skills are instructions the agent loads on demand. The [cloudflare/skills](https://github.com/cloudflare/skills)bundle covers every layer of the platform — so the agent knows your conventions without you re-explaining them.

* agents-sdk Build AI agents on Cloudflare Workers using the Agents SDK. Load when creating stateful agents, durable workflows, real-time WebSocket apps, scheduled tasks, MCP servers, chat applications, voice agents, or browser automation. Covers Agent class, state management, callable RPC, Workflows, durable execution, queues, retries, observability, and React hooks. Biases towards retrieval from Cloudflare docs over pre-trained knowledge.
* cloudflare Comprehensive Cloudflare platform skill covering Workers, Pages, storage (KV, D1, R2), AI (Workers AI, Vectorize, Agents SDK), feature flags (Flagship), networking (Tunnel, Spectrum), security (WAF, DDoS), and infrastructure-as-code (Terraform, Pulumi). Use for any Cloudflare development task. Biases towards retrieval from Cloudflare docs over pre-trained knowledge.
* cloudflare-email-service Send and receive transactional emails with Cloudflare Email Service (Email Sending + Email Routing). Use when building email sending (Workers binding or REST API), email routing, Agents SDK email handling, or integrating email into any app — Workers, Node.js, Python, Go, etc. Also use for email deliverability, SPF/DKIM/DMARC, wrangler email setup, MCP email tools, or when a coding agent needs to send emails. Even for simple requests like "add email to my Worker" — this skill has critical config details.
* cloudflare-one "Guides Cloudflare One Zero Trust and SASE work across Access, Gateway, WARP, Tunnel, Cloudflare WAN, DLP, CASB, device posture, and identity. Use when designing, configuring, troubleshooting, or reviewing Cloudflare One deployments. Retrieval-first: use current Cloudflare docs/API schemas instead of embedded product docs."
* cloudflare-one-migrations Plans migrations from Zscaler ZIA/ZPA, Palo Alto, legacy VPN, SWG, or SASE stacks to Cloudflare One. Use for migration assessments, policy mapping, rollout plans, and parity/gap analysis.
* durable-objects Create and review Cloudflare Durable Objects. Use when building stateful coordination (chat rooms, multiplayer games, booking systems), implementing RPC methods, SQLite storage, alarms, WebSockets, or reviewing DO code for best practices. Covers Workers integration, wrangler config, and testing with Vitest. Biases towards retrieval from Cloudflare docs over pre-trained knowledge.
* sandbox-sdk Build sandboxed applications for secure code execution. Load when building AI code execution, code interpreters, CI/CD systems, interactive dev environments, or executing untrusted code. Covers Sandbox SDK lifecycle, commands, files, code interpreter, and preview URLs. Biases towards retrieval from Cloudflare docs over pre-trained knowledge.
* turnstile-spin Set up Cloudflare Turnstile end-to-end in a project — scan the codebase, create the widget via the Cloudflare API, deploy the managed siteverify Worker, write the frontend snippets, validate, and persist the skill. Load this when a user asks to add Turnstile, set up CAPTCHA, protect a form from bots, or fix a Turnstile integration. Mirrors developers.cloudflare.com/turnstile/spin.
* web-perf Analyzes web performance using Chrome DevTools MCP. Measures Core Web Vitals (LCP, INP, CLS) and supplementary metrics (FCP, TBT, Speed Index), identifies render-blocking resources, network dependency chains, layout shifts, caching issues, and accessibility gaps. Use when asked to audit, profile, debug, or optimize page load performance, Lighthouse scores, or site speed. Biases towards retrieval from current documentation over pre-trained knowledge.
* workers-best-practices Reviews and authors Cloudflare Workers code against production best practices. Load when writing new Workers, reviewing Worker code, configuring wrangler.jsonc, or checking for common Workers anti-patterns (streaming, floating promises, global state, secrets, bindings, observability). Biases towards retrieval from Cloudflare docs over pre-trained knowledge.
* wrangler Cloudflare Workers CLI for deploying, developing, and managing Workers, KV, R2, D1, Vectorize, Hyperdrive, Workers AI, Containers, Queues, Workflows, Pipelines, and Secrets Store. Load before running wrangler commands to ensure correct syntax and best practices. Biases towards retrieval from Cloudflare docs over pre-trained knowledge.

MCP servers 

Live access to the Cloudflare API, docs, and observability.

MCP servers provide typed tools to call into Cloudflare at runtime. There are two options: [Code Mode](https://blog.cloudflare.com/code-mode-mcp/) — a single server that covers the entire Cloudflare API (2,500+ endpoints in \~1,000 tokens) — or a set of focused, domain-specific servers hosted in the [cloudflare/mcp-server-cloudflare](https://github.com/cloudflare/mcp-server-cloudflare)repo. The full catalog is also in the [MCP servers for Cloudflare](https://developers.cloudflare.com/agents/model-context-protocol/cloudflare/servers-for-cloudflare/)docs.

* Code mode API code mode Broad access to the full Cloudflare API via code execution, with minimal token overhead https://mcp.cloudflare.com/mcp
* AI Gateway server Search your logs, get details about the prompts and responses https://ai-gateway.mcp.cloudflare.com/mcp
* Audit Logs server Query audit logs and generate reports for review https://auditlogs.mcp.cloudflare.com/mcp
* Workers Bindings server Build Workers applications with storage, AI, and compute primitives https://bindings.mcp.cloudflare.com/mcp
* Browser rendering server Fetch web pages, convert them to markdown and take screenshots https://browser.mcp.cloudflare.com/mcp
* Workers Builds server Get insights and manage your Cloudflare Workers Builds https://builds.mcp.cloudflare.com/mcp
* Cloudflare One CASB server Quickly identify any security misconfigurations for SaaS applications to safeguard users & data https://casb.mcp.cloudflare.com/mcp
* Container server Spin up a sandbox development environment https://containers.mcp.cloudflare.com/mcp
* Digital Experience Monitoring server Get quick insight on critical applications for your organization https://dex.mcp.cloudflare.com/mcp
* DNS Analytics server Optimize DNS performance and debug issues based on current set up https://dns-analytics.mcp.cloudflare.com/mcp
* Documentation server Get up to date reference information on Cloudflare https://docs.mcp.cloudflare.com/mcp
* GraphQL server Get analytics data using Cloudflare’s GraphQL API https://graphql.mcp.cloudflare.com/mcp
* Logpush server Get quick summaries for Logpush job health https://logs.mcp.cloudflare.com/mcp
* Observability server Debug and get insight into your application's logs and analytics https://observability.mcp.cloudflare.com/mcp

Wrangler CLI 

Local dev, deploys, and Workers-specific commands.

Use [Wrangler](https://developers.cloudflare.com/workers/wrangler/) for local development, deploys, and product-specific commands like `wrangler d1 migrations apply` or `wrangler tail`. The bundled **wrangler** Skill teaches the agent when to reach for it.

What’s next

The unified `cf` CLI is in technical preview — a next-generation CLI that covers every Cloudflare product with consistent verbs and ergonomic output for agents. Try it with `npx cf`. [Read the announcement →](https://blog.cloudflare.com/cf-cli-local-explorer/) 

Agent-friendly docs 

Token-efficient references optimized for agents.

Append `/index.md` to any Cloudflare docs URL for a clean markdown version. Every top-level product section also has its own `llms.txt` — a page index sized for a single context window. A few useful ones:

* [developers.cloudflare.com/llms.txt](https://developers.cloudflare.com/llms.txt) — directory of every Cloudflare product.
* [developers.cloudflare.com/workers/llms.txt](https://developers.cloudflare.com/workers/llms.txt)
* [developers.cloudflare.com/agents/llms.txt](https://developers.cloudflare.com/agents/llms.txt)
* [developers.cloudflare.com/r2/llms.txt](https://developers.cloudflare.com/r2/llms.txt)
* [developers.cloudflare.com/d1/llms.txt](https://developers.cloudflare.com/d1/llms.txt)

For a full overview of how these docs are structured for agents, refer to the [Docs for Agents guide](https://developers.cloudflare.com/docs-for-agents/).

## Example prompts

“Build an AI chat agent using the Cloudflare Agents SDK with persistent conversation history stored in D1.” “Create a RAG pipeline using Vectorize and Workers AI to answer questions over my documentation.” “Set up AI Gateway to route requests across OpenAI and Workers AI with automatic fallback and cost tracking.” “Build a serverless AI inference endpoint on Workers AI with streaming responses.” “Deploy a full-stack React app to Cloudflare Pages with a Workers API backend and D1 database.” “Add a D1 database to my Worker and create a users table with full CRUD endpoints.” “Build an image upload and transformation service using R2 and Cloudflare Images.” “Add real-time collaboration to my app using Durable Objects with WebSocket hibernation.” “Set up a KV namespace for edge-cached session storage in my Worker.” “Add a cron trigger to my Worker that processes a job queue every hour.” “Deploy a globally distributed REST API on Workers with automatic scaling and zero cold starts.” “Connect my Worker to an existing Postgres database using Hyperdrive for connection pooling.” “Add mTLS authentication and schema validation to protect my API endpoints.” “Set up rate limiting and WAF rules to block abuse on my public API.” “Build a multi-tenant SaaS backend where each customer gets an isolated D1 database.” “Set up custom domains with automatic SSL for my SaaS customers using SSL for SaaS.” “Use Workers for Platforms to let my customers deploy their own code in isolated environments.” “Add bot protection and rate limiting to my login and checkout endpoints.” “Set up WAF rules to block SQL injection and XSS attacks on my application.” “Configure Zero Trust access policies to protect my internal staging environment.” “Configure caching rules and cache TTLs to reduce origin load for my e-commerce store.” “Set up a Waiting Room to handle flash sale traffic spikes without dropping requests.” “Optimize my Worker to serve WebP images with responsive resizing using Cloudflare Images.” “Check my Workers deployment logs for errors and suggest fixes.” “Set up GitHub Actions to deploy this Worker to staging and production on Cloudflare.” “Create a Logpush job to stream Workers analytics to my data warehouse.” 

## Tips

* The Skills plugin includes a wrangler Skill — Claude knows when to reach for `npx wrangler deploy`, `wrangler d1 migrations apply`, and other CLI commands automatically.
* Try the `/cloudflare:build-agent` slash command to scaffold a complete Agents SDK project, or `/cloudflare:build-mcp` for a remote MCP server.
* The Cloudflare API MCP server uses Code Mode — Claude writes JavaScript against a TypeScript API to hit any of 2,500+ endpoints in \~1,000 tokens.
* Claude Code works best from the root of your Workers project where `wrangler.jsonc` lives — this is what the agent uses to understand your bindings.
* Use `claude mcp list` to verify Cloudflare servers are connected. For CI/CD, skip OAuth by passing a Cloudflare API token as a bearer token instead.
* For more information on installing additional MCP servers, or when to use Code Mode versus traditional MCP servers, refer to the [Cloudflare MCP server repository ↗](https://github.com/cloudflare/mcp-server-cloudflare).

## FAQ

Should I use Skills, the MCP server, Wrangler CLI, or all of them? 

All three — and the Skills plugin configures them together. Skills give Claude persistent Cloudflare knowledge (when to use Durable Objects vs KV, what a good Workers project layout looks like). The Cloudflare API MCP server handles platform operations (DNS, WAF, R2 buckets, Zero Trust). Wrangler runs local dev and Workers-specific commands. The `wrangler` Skill teaches Claude when to reach for which.

How do I give Claude Code access to my Cloudflare account? 

The first time Claude calls a Cloudflare tool, you will be redirected to authorize via OAuth and choose what permissions to grant.

Can Claude Code deploy to existing Workers projects? 

Yes. Run Claude Code from your existing project directory where`wrangler.jsonc` is located, and it will understand your project configuration and deploy accordingly.

What does Code Mode mean for MCP? 

Code Mode is how the Cloudflare API MCP server fits all 2,500+ API endpoints into \~1,000 tokens. Instead of exposing every endpoint as a separate tool, it exposes two — `search()` and `execute()` — and Claude writes JavaScript to call them. [Learn more about Code Mode ↗](https://blog.cloudflare.com/code-mode-mcp/).

## Troubleshooting

MCP server connection fails or times out 

Run `claude mcp list` to verify the server is registered. Try removing and re-adding: `claude mcp remove cloudflare` then re-add it. Ensure you have`npx` and `mcp-remote` available.

Claude cannot authenticate with Cloudflare 

The MCP server uses OAuth. When prompted, complete the authorization flow in your browser. For CI/CD, create a Cloudflare API token and pass it as a bearer token instead.

Getting outdated information about Cloudflare products 

Enable the [Cloudflare docs MCP server](https://github.com/cloudflare/mcp-server-cloudflare) so the agent can fetch current documentation at runtime. If you prefer not to use the MCP server, point the agent directly at [developers.cloudflare.com/llms.txt](https://developers.cloudflare.com/llms.txt) for a directory of every product, or `developers.cloudflare.com/<product>/llms.txt`for a product-specific index.

## Build agents on Cloudflare

Also worth knowing 

Cloudflare is not just a deploy target for agents, it is a full stack for building your own.

[ Agents SDK Stateful AI agents with state, scheduling, RPC, email, streaming chat — and the Code Mode SDK for token-efficient tool use. Learn more → ](https://developers.cloudflare.com/agents/) [ Build an MCP server Ship a remote MCP server on Workers with OAuth, durable state, and streamable HTTP transport. Learn more → ](https://developers.cloudflare.com/agents/model-context-protocol/) [ Workers AI Run open-source LLMs, embedding models, and image models at the edge. Use it as your agent's model provider. Learn more → ](https://developers.cloudflare.com/workers-ai/) [ Worker Loader Load user-generated code into isolated Workers on demand. The secure sandbox behind Code Mode. Learn more → ](https://developers.cloudflare.com/workers/runtime-apis/bindings/worker-loader/) 

## Other agents

[ ![Codex icon](https://developers.cloudflare.com/icons/agents/codex/light.svg) ![Codex icon](https://developers.cloudflare.com/icons/agents/codex/dark.svg) Codex OpenAI Lightweight open-source terminal agent that reads and writes files, runs commands, and browses the web in a sandbox. Made by OpenAI. ](https://developers.cloudflare.com/agent-setup/codex/)[ ![Cursor icon](https://developers.cloudflare.com/icons/agents/cursor/light.svg) ![Cursor icon](https://developers.cloudflare.com/icons/agents/cursor/dark.svg) Cursor Cursor AI-first IDE built on VS Code with multi-file Composer edits and background agents. Made by Cursor. ](https://developers.cloudflare.com/agent-setup/cursor/)[ ![GitHub Copilot icon](https://developers.cloudflare.com/icons/agents/copilot/light.svg) ![GitHub Copilot icon](https://developers.cloudflare.com/icons/agents/copilot/dark.svg) GitHub Copilot GitHub Editor extension and CLI with agent mode, workspace context, and native PR integration. Made by GitHub. ](https://developers.cloudflare.com/agent-setup/github-copilot/)[ ![OpenCode icon](https://developers.cloudflare.com/icons/agents/opencode/light.svg) ![OpenCode icon](https://developers.cloudflare.com/icons/agents/opencode/dark.svg) OpenCode Anomaly Open-source terminal agent with a rich TUI that works with 75+ LLMs. Made by Anomaly. ](https://developers.cloudflare.com/agent-setup/opencode/)[ ![Windsurf icon](https://developers.cloudflare.com/icons/agents/windsurf/light.svg) ![Windsurf icon](https://developers.cloudflare.com/icons/agents/windsurf/dark.svg) Windsurf Cognition Agentic IDE with Cascade context and Flows for multi-step tasks. Made by Cognition. ](https://developers.cloudflare.com/agent-setup/windsurf/) 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agent-setup/claude-code/#page","headline":"Claude Code + Cloudflare · Agent setup docs","description":"Terminal-based coding agent that understands your codebase, runs commands, edits files, and manages git. Made by Anthropic.","url":"https://developers.cloudflare.com/agent-setup/claude-code/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-27","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
```
