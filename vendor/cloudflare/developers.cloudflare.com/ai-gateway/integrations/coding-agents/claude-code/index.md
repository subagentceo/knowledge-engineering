---
title: Claude Code
description: Route Claude Code through AI Gateway using your own Anthropic API key.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Claude Code

[Claude Code ↗](https://docs.anthropic.com/en/docs/claude-code/overview) reads its endpoint and credentials from environment variables. This configuration sends requests to AI Gateway's [Anthropic endpoint](https://developers.cloudflare.com/ai-gateway/usage/providers/anthropic/) using your own Anthropic API key, passed directly in the `ANTHROPIC_API_KEY` environment variable. The Anthropic endpoint exposes the same `/v1/messages` API that Claude Code expects.

## Prerequisites

Before you start, you need:

* An [authenticated gateway](https://developers.cloudflare.com/ai-gateway/configuration/authentication/) and its [gateway token](https://developers.cloudflare.com/ai-gateway/configuration/authentication/#setting-up-authenticated-gateway-using-the-dashboard). The gateway token must have `Run` permissions.
* Your Cloudflare account ID. To find it, refer to [Find your account and zone IDs](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids/).
* An Anthropic API key. To create one, go to [Account Settings ↗](https://platform.claude.com/settings/keys) in the Claude Console. For more information, refer to [Anthropic's API overview ↗](https://docs.anthropic.com/en/api/overview).
* [Claude Code ↗](https://docs.anthropic.com/en/docs/claude-code/setup) installed and updated to the latest version.

Note

This configuration does not use [BYOK (Store Keys)](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/). The Anthropic API key comes from the `ANTHROPIC_API_KEY` environment variable, not from a key stored in AI Gateway. Anthropic bills you for model usage, and AI Gateway provides observability, caching, and rate limiting for the traffic. For details on where Claude Code reads credentials from, refer to [Anthropic's authentication documentation ↗](https://docs.anthropic.com/en/docs/claude-code/iam#credential-management).

1. Set the base URL to your gateway's Anthropic endpoint, pass your Anthropic API key, and send your gateway token in the `cf-aig-authorization` header. The following commands set these as shell environment variables for the current session. To persist them, add them to your shell profile (for example, `~/.zshrc` or `~/.bashrc`) or to Claude Code's [settings.json ↗](https://docs.anthropic.com/en/docs/claude-code/settings#settings-files) under the `env` key.  
Replace `<ACCOUNT_ID>`, `<GATEWAY_ID>`, `<ANTHROPIC_API_KEY>`, and `<CF_AIG_TOKEN>` with your values.  
   * [ macOS / Linux ](#tab-panel-6552)  
   * [ Windows (PowerShell) ](#tab-panel-6553)  
Terminal window  
```  
export ANTHROPIC_BASE_URL="https://gateway.ai.cloudflare.com/v1/<ACCOUNT_ID>/<GATEWAY_ID>/anthropic"  
export ANTHROPIC_API_KEY="<ANTHROPIC_API_KEY>"  
export ANTHROPIC_CUSTOM_HEADERS="cf-aig-authorization: Bearer <CF_AIG_TOKEN>"  
```  
PowerShell  
```  
$env:ANTHROPIC_BASE_URL = "https://gateway.ai.cloudflare.com/v1/<ACCOUNT_ID>/<GATEWAY_ID>/anthropic"  
$env:ANTHROPIC_API_KEY = "<ANTHROPIC_API_KEY>"  
$env:ANTHROPIC_CUSTOM_HEADERS = "cf-aig-authorization: Bearer <CF_AIG_TOKEN>"  
```
2. Start Claude Code and send a prompt. Requests now route through AI Gateway.  
Terminal window  
```  
claude  
```

To confirm traffic reaches AI Gateway, refer to [Verify it works](https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/#verify-it-works).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/claude-code/#page","headline":"Claude Code · Cloudflare AI Gateway docs","description":"Route Claude Code through AI Gateway using your own Anthropic API key.","url":"https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/claude-code/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-18","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/integrations/coding-agents/","name":"Coding agents"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-gateway/integrations/coding-agents/claude-code/","name":"Claude Code"}}]}
```
