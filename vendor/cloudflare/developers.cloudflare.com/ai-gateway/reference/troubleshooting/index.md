---
title: Troubleshooting
description: Resolve common AI Gateway issues including authentication errors, missing logs, and provider connectivity problems.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Troubleshooting

This page covers common issues when using AI Gateway. For provider-specific troubleshooting, refer to the relevant provider documentation.

## Authentication errors

### 401 or unauthenticated errors

If you receive authentication errors from your AI provider, AI Gateway did not pass valid credentials upstream. Check the following:

1. **Verify header placement**: Make sure your Cloudflare token is in `cf-aig-authorization`, not `Authorization`. The `Authorization` header is reserved for provider credentials.
2. **Check your configuration based on endpoint type**:  
   * **Provider-specific endpoints**: Confirm your request URL includes the provider path (for example, `/google-vertex-ai/` or `/openai/`). AI Gateway uses this to identify the provider and apply the correct stored credentials.  
   * **Unified `/compat/chat/completions` endpoint**: Confirm your `model` name starts with the provider prefix (for example, `google-vertex-ai/google/gemini-2.5-flash` or `openai/gpt-4o`). AI Gateway uses this prefix to route the request and select the correct stored credentials.
3. **Verify BYOK key selection**: If you have multiple keys configured for a provider, ensure either:  
   * You are using the key with alias `default`, or  
   * You include the `cf-aig-byok-alias` header with the correct alias name
4. **Verify BYOK configuration**: If using BYOK, confirm in the dashboard that your credentials were saved correctly.

For provider-specific authentication issues:

* [Google Vertex AI troubleshooting](https://developers.cloudflare.com/ai-gateway/usage/providers/vertex/#troubleshooting)

## DLP issues

For troubleshooting Data Loss Prevention issues such as DLP not triggering or unexpected blocking, refer to [DLP troubleshooting](https://developers.cloudflare.com/ai-gateway/features/dlp/set-up-dlp/#troubleshooting).

## Request failures

### Requests timing out

* Check if the upstream provider is experiencing issues
* Consider implementing [dynamic routing](https://developers.cloudflare.com/ai-gateway/features/dynamic-routing/) with fallbacks for transient failures
* Review your [rate limiting](https://developers.cloudflare.com/ai-gateway/features/rate-limiting/) configuration

### Requests returning errors from the provider

* Verify your API key or credentials are valid with the provider directly
* Check the provider's status page for outages
* Review [AI Gateway logs](https://developers.cloudflare.com/ai-gateway/observability/logging/) for detailed error information

## Caching issues

### Requests not being cached

* Verify [caching is enabled](https://developers.cloudflare.com/ai-gateway/features/caching/) for your gateway
* Check that the request method and content type are cacheable
* Streaming responses are not cached by default

### Unexpected cache hits or misses

* Review your cache TTL settings
* Check if you have request headers that are [bypassing the cache](https://developers.cloudflare.com/ai-gateway/features/caching/#skip-cache-cf-aig-skip-cache) or setting a [custom cache key](https://developers.cloudflare.com/ai-gateway/features/caching/#custom-cache-key-cf-aig-cache-key).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/reference/troubleshooting/#page","headline":"Troubleshooting · Cloudflare AI Gateway docs","description":"Resolve common AI Gateway issues including authentication errors, missing logs, and provider connectivity problems.","url":"https://developers.cloudflare.com/ai-gateway/reference/troubleshooting/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/reference/","name":"Platform"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/reference/troubleshooting/","name":"Troubleshooting"}}]}
```
