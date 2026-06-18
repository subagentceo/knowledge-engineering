---
title: Legacy pipelines
description: Migration guide for pipelines created before September 2025 to the new Pipelines architecture.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/pipelines/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Legacy pipelines

Legacy pipelines, those created before September 25, 2025 via the legacy API, are on a deprecation path.

To check if your pipelines are legacy pipelines, view them in the dashboard under **Pipelines** \> **Pipelines** or run the [pipelines list](https://developers.cloudflare.com/workers/wrangler/commands/pipelines/#pipelines-list) command in [Wrangler](https://developers.cloudflare.com/workers/wrangler/). Legacy pipelines are labeled "legacy" in both locations.

New pipelines offer SQL transformations, multiple output formats, and improved architecture.

## Notable changes

* New pipelines support SQL transformations for data processing.
* New pipelines write to JSON, Parquet, and Apache Iceberg formats instead of JSON only.
* New pipelines separate streams, pipelines, and sinks into distinct resources.
* New pipelines support optional structured schemas with validation.
* New pipelines offer configurable rolling policies and customizable partitioning.

## Moving to new pipelines

Legacy pipelines will continue to work until Pipelines is Generally Available, but new features and improvements are only available in the new pipeline architecture. To migrate:

1. Create a new pipeline using the interactive setup:  
Terminal window  
```  
npx wrangler pipelines setup  
```
2. Configure your new pipeline with the desired streams, SQL transformations, and sinks.
3. Update your applications to send data to the new stream endpoints.
4. Once verified, delete your legacy pipeline.

For detailed guidance, refer to the [getting started guide](https://developers.cloudflare.com/pipelines/getting-started/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/pipelines/reference/legacy-pipelines/#page","headline":"Legacy pipelines · Cloudflare Pipelines Docs","description":"Migration guide for pipelines created before September 2025 to the new Pipelines architecture.","url":"https://developers.cloudflare.com/pipelines/reference/legacy-pipelines/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/pipelines/","name":"Pipelines"}},{"@type":"ListItem","position":3,"item":{"@id":"/pipelines/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/pipelines/reference/legacy-pipelines/","name":"Legacy pipelines"}}]}
```
