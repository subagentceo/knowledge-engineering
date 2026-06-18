---
title: Costs
description: Track and estimate token-based costs across AI providers using AI Gateway cost metrics.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Costs

Cost metrics are only available for endpoints where the models return token data and the model name in their responses.

## Track costs across AI providers

AI Gateway makes it easier to monitor and estimate token based costs across all your AI providers. This can help you:

* Understand and compare usage costs between providers.
* Monitor trends and estimate spend using consistent metrics.
* Apply custom pricing logic to match negotiated rates.

Note

The cost metric is an **estimation** based on the number of tokens sent and received in requests. While this metric can help you monitor and predict cost trends, refer to your provider's dashboard for the most **accurate** cost details.

Caution

Providers may introduce new models or change their pricing. If you notice outdated cost data or are using a model not yet supported by our cost tracking, please [submit a request ↗](https://forms.gle/8kRa73wRnvq7bxL48)

## Custom costs

AI Gateway allows users to set custom costs when operating under special pricing agreements or negotiated rates. Custom costs can be applied at the request level, and when applied, they will override the default or public model costs. For more information on configuration of custom costs, please visit the [Custom Costs](https://developers.cloudflare.com/ai-gateway/configuration/custom-costs/) configuration page.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/observability/costs/#page","headline":"Costs · Cloudflare AI Gateway docs","description":"Track and estimate token-based costs across AI providers using AI Gateway cost metrics.","url":"https://developers.cloudflare.com/ai-gateway/observability/costs/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/observability/","name":"Observability"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/observability/costs/","name":"Costs"}}]}
```
