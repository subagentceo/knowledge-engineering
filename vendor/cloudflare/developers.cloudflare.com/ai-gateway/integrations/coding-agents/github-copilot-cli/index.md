---
title: GitHub Copilot CLI
description: Route GitHub Copilot CLI through AI Gateway using the REST API and Unified Billing.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# GitHub Copilot CLI

[GitHub Copilot CLI ↗](https://docs.github.com/en/copilot/concepts/agents/about-copilot-cli) supports bring-your-own-key (BYOK) model providers configured through environment variables. Route it through AI Gateway's [REST API](https://developers.cloudflare.com/ai-gateway/usage/rest-api/), an OpenAI-compatible `/chat/completions` endpoint authenticated with a Cloudflare API token. Third-party models are billed through [Unified Billing](https://developers.cloudflare.com/ai-gateway/features/unified-billing/), so no provider API keys are needed in your environment. Alternatively, you can store your own provider API keys in AI Gateway with [BYOK (Store Keys)](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/) and use the same Cloudflare API token to authenticate — AI Gateway resolves the stored key on each request.

Unlike [Claude Code](https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/claude-code/), GitHub Copilot CLI authenticates the model provider with a single `Authorization` header and cannot send custom request headers. This is why the configuration uses the REST API — it accepts a Cloudflare API token in the standard `Authorization` header — rather than the gateway token and `cf-aig-authorization` header flow used for Claude Code. Because Copilot CLI cannot set the `cf-aig-gateway-id` header either, requests route through your account's [default gateway](https://developers.cloudflare.com/ai-gateway/usage/rest-api/#specify-a-gateway).

## Prerequisites

Before you start, you need:

* GitHub Copilot CLI installed. To install it, refer to [Installing GitHub Copilot CLI ↗](https://docs.github.com/en/copilot/how-tos/set-up/install-copilot-cli).
* A [Cloudflare API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with `AI Gateway` permission.
* [Credits loaded](https://developers.cloudflare.com/ai-gateway/features/unified-billing/#load-credits) on your account for third-party models.
* A model that supports tool calling and streaming. For best results, use a model with a context window of at least 128k tokens.
1. Set the provider environment variables. GitHub Copilot CLI reads these on startup and appends `/chat/completions` to the base URL. The commands set these variables for the current session. To persist them, add them to your shell profile (for example, `~/.zshrc` or `~/.bashrc`).  
Replace `<ACCOUNT_ID>` with your Cloudflare account ID and `<CF_API_TOKEN>` with your Cloudflare API token. Set `COPILOT_MODEL` to any supported model in `provider/model` format.  
   * [ macOS / Linux ](#tab-panel-6554)  
   * [ Windows (PowerShell) ](#tab-panel-6555)  
Terminal window  
```  
export COPILOT_PROVIDER_TYPE="openai"  
export COPILOT_PROVIDER_BASE_URL="https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai/v1"  
export COPILOT_PROVIDER_API_KEY="<CF_API_TOKEN>"  
export COPILOT_MODEL="openai/gpt-4.1"  
```  
PowerShell  
```  
$env:COPILOT_PROVIDER_TYPE = "openai"  
$env:COPILOT_PROVIDER_BASE_URL = "https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/ai/v1"  
$env:COPILOT_PROVIDER_API_KEY = "<CF_API_TOKEN>"  
$env:COPILOT_MODEL = "openai/gpt-4.1"  
```
2. Start GitHub Copilot CLI and send a prompt. Requests now route through AI Gateway.  
Terminal window  
```  
copilot  
```

Note

GitHub Copilot CLI keeps a built-in catalog of known models and their token limits. If your selected model is not in the catalog, Copilot CLI prints a warning and falls back to default token limits. You can ignore the warning, or set the limits explicitly to match your model:

Terminal window

```

export COPILOT_PROVIDER_MAX_PROMPT_TOKENS="200000"

export COPILOT_PROVIDER_MAX_OUTPUT_TOKENS="32000"


```

To confirm traffic reaches AI Gateway, refer to [Verify it works](https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/#verify-it-works).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/github-copilot-cli/#page","headline":"GitHub Copilot CLI · Cloudflare AI Gateway docs","description":"Route GitHub Copilot CLI through AI Gateway using the REST API and Unified Billing.","url":"https://developers.cloudflare.com/ai-gateway/integrations/coding-agents/github-copilot-cli/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-18","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/integrations/","name":"Integrations"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/integrations/coding-agents/","name":"Coding agents"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-gateway/integrations/coding-agents/github-copilot-cli/","name":"GitHub Copilot CLI"}}]}
```
