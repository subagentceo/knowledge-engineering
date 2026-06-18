---
title: Release note
description: Review recent changes to Cloudflare AI Search.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Release note

This release notes section covers regular updates and minor fixes. For major feature releases or significant updates, see the [changelog](https://developers.cloudflare.com/changelog).

## 2026-06-10

**Manage AI Search namespaces with Wrangler CLI**

AI Search now supports namespace-level Wrangler commands to create, list, update, and delete [namespaces](https://developers.cloudflare.com/ai-search/concepts/namespaces/) from the command line. Instance-level commands also accept a `--namespace` flag to target instances within a specific namespace, and `--json` output is available for automation and agent workflows. Refer to [Wrangler commands](https://developers.cloudflare.com/ai-search/wrangler-commands/) for full usage details.

## 2026-05-12

**Automatic migration to managed infrastructure on June 3, 2026**

Instances created before April 16, 2026 will be automatically migrated to managed infrastructure on **June 3, 2026**. The migration may take up to three days with no service downtime expected. No action is required. After migration, instances will include built-in storage, a built-in vector index, and built-in web crawling, and [new limits](https://developers.cloudflare.com/ai-search/platform/limits-pricing/#new-instances) will apply. For full migration details, refer to [Limits & pricing](https://developers.cloudflare.com/ai-search/platform/limits-pricing/#previous-instances).

## 2026-04-16

**Hybrid search**

AI Search now supports [hybrid search](https://developers.cloudflare.com/ai-search/configuration/indexing/hybrid-search/), combining vector and BM25 keyword search in a single query. Configure the tokenizer, keyword match mode, and fusion method per instance. Refer to [Search modes](https://developers.cloudflare.com/ai-search/concepts/search-modes/) for an overview.

## 2026-04-16

**Relevance boosting**

Boost search results by metadata fields like timestamp or priority using [relevance boosting](https://developers.cloudflare.com/ai-search/configuration/retrieval/boosting/). Configure up to 3 boost fields per instance or per request.

## 2026-04-16

**Cross-instance search**

Search across multiple AI Search instances in a single call using [namespace-level search](https://developers.cloudflare.com/ai-search/api/search/workers-binding/#namespace-level). Results are merged and ranked, with each chunk identifying which instance it came from.

## 2026-04-16

**Built-in storage and vector index**

New AI Search instances come with [built-in storage](https://developers.cloudflare.com/ai-search/configuration/data-source/built-in-storage/) and a [built-in vector index](https://developers.cloudflare.com/ai-search/configuration/indexing/vector-search/#built-in-vector-index). Upload files directly to an instance using the Items API or the dashboard without setting up external infrastructure.

## 2026-04-16

**New AI Search Workers bindings**

Two new [Workers bindings](https://developers.cloudflare.com/ai-search/api/search/workers-binding/) for AI Search. The `ai_search_namespaces` binding gives access to all instances within a [namespace](https://developers.cloudflare.com/ai-search/concepts/namespaces/) and supports dynamic instance management at runtime. The `ai_search` binding binds directly to a single instance for simpler use cases.

## 2026-04-01

**Wrangler CLI support for AI Search**

Manage AI Search instances from the command line with the `wrangler ai-search` command namespace. Create, list, update, delete, search, and get usage statistics for instances without leaving your terminal. All commands support `--json` for structured output that scripts and AI agents can parse directly. Refer to [Wrangler commands](https://developers.cloudflare.com/ai-search/wrangler-commands/) for full usage details.

## 2026-03-23

**Custom metadata filtering**

Define up to 5 custom metadata fields per AI Search instance and filter search results by category, version, or any custom attribute. Attach metadata via R2 custom headers or HTML meta tags.

## 2026-03-23

**Public endpoint, UI snippets, and MCP support**

AI Search now supports [public endpoints](https://developers.cloudflare.com/ai-search/configuration/retrieval/public-endpoint/), [UI snippets](https://developers.cloudflare.com/ai-search/configuration/retrieval/embed-search-snippets/), and [MCP](https://developers.cloudflare.com/ai-search/api/search/mcp/), making it easy to add search to your website or connect AI agents.

## 2026-03-23

**New REST API endpoints**

AI Search introduces new [REST API](https://developers.cloudflare.com/ai-search/api/search/rest-api/) endpoints for search that use an OpenAI-compatible format. You can use the familiar `messages` array structure that works with existing OpenAI SDKs and tools. The previous AutoRAG API endpoints will continue working as expected. New features will only be added to the new API. See the [migration guide](https://developers.cloudflare.com/ai-search/api/migration/rest-api/) for instructions.

## 2026-02-09

**Crawler user agent renamed**

The AI Search crawler user agent has been renamed from `Cloudflare-AutoRAG` to `Cloudflare-AI-Search`. You can continue using the previous user agent name, `Cloudflare-AutoRAG`, in your `robots.txt`. The Bot Detection ID, `122933950` for WAF rules remains unchanged.

## 2026-02-09

**Specify a single sitemap for website crawling**

You can now specify a single sitemap URL in **Parser options** to limit which pages are crawled. By default, AI Search crawls all sitemaps listed in your `robots.txt` from top to bottom.

## 2026-02-09

**Sync individual files**

You can now trigger a sync for a specific file from the dashboard. Go to **Overview** \> **Indexed Items** and select the sync icon next to the file you want to reindex.

## 2026-01-22

**New file type support**

AI Search now supports EMACS Lisp (`.el`) files and the `.htm` extension for HTML documents.

## 2026-01-19

**Path filtering for website and R2 data sources**

You can now filter which paths to include or exclude from indexing for both website and R2 data sources.

## 2026-01-19

**Simplified API instance creation**

API instance creation is now simpler with optional token\_id and model fields.

## 2026-01-16

**Website crawler improvements**

Website instances now respect sitemap `<priority>` for indexing order and `<changefreq>` for re-crawl frequency. Added support for `.gz` compressed sitemaps and partial URLs in robots.txt and sitemaps.

## 2026-01-16

**Improved indexing performance**

We have improved indexing performance for all AI Search instances. Support for more and larger files is coming.

## 2025-12-10

**Query rewrite visibility in AI Gateway logs**

Fixed a bug where query rewrites were not visible in the AI Gateway logs.

## 2025-11-19

**Custom HTTP headers for website crawling**

AI Search now supports custom HTTP headers for website crawling, allowing you to index content behind authentication or access controls.

## 2025-10-28

**Reranking and API-based system prompts**

You can now enable reranking to reorder retrieved documents by semantic relevance and set system prompts directly in API requests for per-query control.

## 2025-09-25

**AI Search (formerly AutoRAG) now supports more models**

Connect your provider keys through AI Gateway to use models from OpenAI, Anthropic, and other providers for both embeddings and inference.

## 2025-09-23

**Support document file types in AutoRAG**

Our [conversion utility](https://developers.cloudflare.com/workers-ai/features/markdown-conversion/) can now convert `.docx` and `.odt` files to Markdown, making these files available to index inside your AutoRAG instance.

## 2025-09-19

**Metrics view for AI Search**

AI Search now includes a Metrics tab to track file indexing, search activity, and top retrievals.

## 2025-08-28

**Website data source and NLWeb integration**

AI Search now supports websites as a data source. Connect your domain to automatically crawl and index your site content with continuous re-crawling. Also includes NLWeb integration for conversational search with `/ask` and `/mcp` endpoints.

## 2025-08-20

**Increased maximum query results to 50**

The maximum number of results returned from a query has been increased from **20** to **50**. This allows you to surface more relevant matches in a single request.

## 2025-07-16

**Deleted files now removed from index on next sync**

When a file is deleted from your R2 bucket, its corresponding chunks are now automatically removed from the Vectorize index linked to your AI Search instance during the next sync.

## 2025-07-08

**Faster indexing and new Jobs view**

Indexing is now 3-5x faster. A new Jobs view lets you monitor indexing progress, view job status, and inspect real-time logs.

## 2025-07-08

**Reduced cooldown between syncs**

The cooldown period between sync jobs has been reduced to 3 minutes, allowing you to trigger syncs more frequently.

## 2025-06-19

**Filter search by file name**

You can now filter AI Search queries by file name using the `filename` attribute for more control over which files are searched.

## 2025-06-19

**Custom metadata in search responses**

AI Search now returns custom metadata in search responses. You can also add a `context` field to guide AI-generated answers.

## 2025-06-16

**Rich format file size limit increased to 4 MB**

You can now index rich format files (e.g., PDF) up to 4 MB in size, up from the previous 1 MB limit.

## 2025-06-12

**Index processing status displayed on dashboard**

The dashboard now includes a new “Processing” step for the indexing pipeline that displays the files currently being processed.

## 2025-06-12

**Sync AI Search REST API published**

You can now trigger a sync job for an AI Search using the [Sync REST API](https://developers.cloudflare.com/api/resources/ai-search/subresources/rags/methods/sync/). This scans your data source for changes and queues updated or previously errored files for indexing.

## 2025-06-10

**Files modified in the data source will now be updated**

Files modified in your source R2 bucket will now be updated in the AI Search index during the next sync. For example, if you upload a new version of an existing file, the changes will be reflected in the index after the subsequent sync job. Please note that deleted files are not yet removed from the index. We are actively working on this functionality.

## 2025-05-31

**Errored files will now be retried in next sync**

Files that failed to index will now be automatically retried in the next indexing job. For instance, if a file initially failed because it was oversized but was then corrected (e.g. replaced with a file of the same name/key within the size limit), it will be re-attempted during the next scheduled sync.

## 2025-05-31

**Fixed character cutoff in recursive chunking**

Resolved an issue where certain characters (e.g. '#') were being cut off during the recursive chunking and embedding process. This fix ensures complete character processing in the indexing process.

## 2025-05-25

**EU jurisdiction R2 buckets now supported**

AI Search now supports R2 buckets configured with European Union (EU) jurisdiction restrictions. Previously, files in EU-restricted R2 buckets would not index when linked. This issue has been resolved, and all EU-restricted R2 buckets should now function as expected.

## 2025-04-23

**Metadata filtering and multitenancy support**

Filter search results by `folder` and `timestamp` to enable multitenancy and control the scope of retrieved results.

## 2025-04-23

**Response streaming in AI Search binding added**

AI Search now supports response streaming in the `AI Search` method of the [Workers binding](https://developers.cloudflare.com/ai-search/api/search/workers-binding/), allowing you to stream results as they're retrieved by setting `stream: true`.

## 2025-04-07

**AI Search is now in open beta!**

AI Search allows developers to create fully-managed retrieval-augmented generation (RAG) pipelines powered by Cloudflare allowing developers to integrate context-aware AI into their applications without managing infrastructure. Get started today on the [Cloudflare Dashboard](https://dash.cloudflare.com/?to=/:account/ai/autorag).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/platform/release-note/#page","headline":"Release note · Cloudflare AI Search docs","description":"Review recent changes to Cloudflare AI Search.","url":"https://developers.cloudflare.com/ai-search/platform/release-note/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/platform/","name":"Platform"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-search/platform/release-note/","name":"Release note"}}]}
```
