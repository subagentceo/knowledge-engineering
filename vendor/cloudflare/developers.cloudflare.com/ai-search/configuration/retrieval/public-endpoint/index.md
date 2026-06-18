---
title: Public endpoint settings
description: Expose AI Search instances through public MCP, chat, and search endpoints without authentication.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Public endpoint settings

Configure public endpoints to expose your AI Search instance directly to users without requiring authentication. This enables you to share your AI Search functionality with external users, or to integrate it into public-facing applications.

## Available endpoints

Each AI Search instance can expose three public endpoints:

| Endpoint          | Description                                   |
| ----------------- | --------------------------------------------- |
| /mcp              | Model Context Protocol endpoint for AI agents |
| /chat/completions | OpenAI-compatible chat completion endpoint    |
| /search           | Search endpoint that returns relevant chunks  |

For details on how to use these endpoints, refer to [Public endpoint usage](https://developers.cloudflare.com/ai-search/api/search/public-endpoint/).

## Public URL format

When enabled, public endpoints are accessible at:

```

https://<hash>.search.ai.cloudflare.com/<endpoint>


```

The `<hash>` is your instance's unique public endpoint identifier.

For example:

* `https://abc123.search.ai.cloudflare.com/mcp`
* `https://abc123.search.ai.cloudflare.com/chat/completions`
* `https://abc123.search.ai.cloudflare.com/search`

## Enabling and disabling public endpoints

You can enable or disable each public endpoint independently:

1. Log in to your Cloudflare account, and go to **AI Search**.[ Go to **AI Search** ](https://dash.cloudflare.com/?to=/:account/ai/ai-search)
2. Select your AI Search instance.
3. Go to **Settings** \> **Public Endpoints**.
4. Toggle on **Public Endpoints** to enable the feature, then toggle each individual endpoint on or off as needed.

Each endpoint has its own configuration panel for granular control.

## Rate limiting

Configure rate limits to control usage across all public endpoints:

| Setting             | Description                               | Default  |
| ------------------- | ----------------------------------------- | -------- |
| Requests per period | Maximum number of requests allowed        | 120      |
| Time period         | Time window for the rate limit            | 1 minute |
| Period type         | Rate limiting technique: fixed or sliding | fixed    |

Rate limits apply across all enabled public endpoints for the AI Search instance.

## CORS configuration

Cross-Origin Resource Sharing (CORS) is enabled by default to support browser-based applications.

The default allowed origins depend on your data source type:

* **Website data sources**: The source domain is automatically added as an allowed origin.
* **Other data sources**: All origins (`*`) are allowed by default.

You can customize allowed origins in the **Public Endpoints** settings by adding specific hostnames to the CORS rules.

## Tool description

The **Tool Description** field allows you to customize how your AI Search instance is described to MCP clients. The default description is `Finds exactly what you're looking for`. This description helps AI agents understand what content is available, and when to use your search tool. A good tool description should explain what type of content is indexed, and what kinds of questions it can answer.

For example:

```

Search the Acme product documentation for information about

installation, configuration, API references, and troubleshooting

guides. Use this tool when users ask questions about how to set up

or use Acme products.


```

## Security considerations

* Public endpoints do not require authentication.
* Consider enabling rate limiting to prevent abuse.
* Use CORS rules to restrict access to specific domains.
* Monitor usage through your dashboard analytics.

## Related

* [UI snippets](https://developers.cloudflare.com/ai-search/configuration/retrieval/embed-search-snippets/) \- Add pre-built search and chat components to your website using your public endpoints.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/#page","headline":"Public endpoint settings · Cloudflare AI Search docs","description":"Expose AI Search instances through public MCP, chat, and search endpoints without authentication.","url":"https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-search/configuration/retrieval/","name":"Retrieval"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-search/configuration/retrieval/public-endpoint/","name":"Public endpoint settings"}}]}
```
