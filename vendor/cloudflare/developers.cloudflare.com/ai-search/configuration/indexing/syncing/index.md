---
title: Syncing
description: Understand how AI Search automatically syncs and indexes content from connected data sources.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Syncing

AI Search automatically indexes your content for search. How indexing works depends on your data source.

## External data sources

For instances connected to a [website](https://developers.cloudflare.com/ai-search/configuration/data-source/website/) or [R2 bucket](https://developers.cloudflare.com/ai-search/configuration/data-source/r2/), AI Search creates jobs to sync your data source. Jobs run automatically every 6 hours and process new, modified, or deleted files to keep your search index up to date.

You can view job status and history in the **Jobs** tab in the dashboard or using the [Instances API](https://developers.cloudflare.com/ai-search/api/instances/rest-api/).

## Built-in storage

Files uploaded to [built-in storage](https://developers.cloudflare.com/ai-search/configuration/data-source/built-in-storage/) are indexed immediately. There are no sync jobs. Each file is processed individually as it is uploaded.

## Controls

| Action               | Description                                                                                                 |
| -------------------- | ----------------------------------------------------------------------------------------------------------- |
| Trigger sync         | Manually start a sync job to scan your external data source for changes. Can be triggered every 30 seconds. |
| Cancel job           | Cancel a running sync job.                                                                                  |
| Pause indexing       | Temporarily stop all scheduled sync jobs.                                                                   |
| Resume indexing      | Resume scheduled sync jobs, including jobs paused automatically after inactivity.                           |
| Sync individual file | Re-index a specific file.                                                                                   |

You can perform these actions from the dashboard, the [REST API](https://developers.cloudflare.com/ai-search/api/instances/rest-api/), or the [Workers binding](https://developers.cloudflare.com/ai-search/api/instances/workers-binding/).

## Performance

The total time to index depends on the number and type of files. Factors that affect performance include:

* Total number of files and their sizes
* File formats (for example, images take longer than plain text)
* Latency of Workers AI models used for embedding and image processing

## Automatic pausing for inactive instances

If an instance receives no search request for 31 days, AI Search automatically pauses its scheduled sync jobs. This applies only to [external data sources](#external-data-sources) (website or R2), since [built-in storage](#built-in-storage) has no sync jobs. This avoids unnecessary requests to your data source to rescan and sync your instance when it is not being used.

A paused instance stays fully searchable, but source changes are not picked up until you resume. To resume monitoring, use the **Resume indexing** control (see [Controls](#controls)). Searching alone does not resume syncing.

## Best practices

To ensure smooth and reliable indexing:

* Make sure your files are within the [size limit](https://developers.cloudflare.com/ai-search/configuration/data-source/#file-limits) and in a [supported format](https://developers.cloudflare.com/ai-search/configuration/data-source/#supported-file-types) to avoid being skipped.
* For R2-backed instances, keep your [service API token](https://developers.cloudflare.com/ai-search/configuration/indexing/service-api-token/) valid to prevent indexing failures.
* Regularly clean up outdated or unnecessary content to stay within [instance limits](https://developers.cloudflare.com/ai-search/platform/limits-pricing/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/configuration/indexing/syncing/#page","headline":"Syncing · Cloudflare AI Search docs","description":"Understand how AI Search automatically syncs and indexes content from connected data sources.","url":"https://developers.cloudflare.com/ai-search/configuration/indexing/syncing/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-search/configuration/indexing/","name":"Indexing"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-search/configuration/indexing/syncing/","name":"Syncing"}}]}
```
