---
title: Similarity cache
description: Speed up AI Search responses by caching and reusing answers for semantically similar queries.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-search/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Similarity cache

Similarity-based caching in AI Search lets you serve responses from Cloudflare's cache for queries that are similar to previous requests, rather than creating new, unique responses for every request. This speeds up response times and cuts costs by reusing answers for questions that are close in meaning.

## How it works

Unlike with basic caching, which creates a new response with every request, this is what happens when a request is received using similarity-based caching:

1. AI Search checks if a _similar_ prompt (based on your chosen threshold) has been answered before.
2. If a match is found, it returns the cached response instantly.
3. If no match is found, it generates a new response and caches it.

To see if a response came from the cache, check the `cf-aig-cache-status` header: `HIT` for cached and `MISS` for new.

## What to consider when using similarity cache

Consider these behaviors when using similarity caching:

* **Volatile Cache**: If two similar requests hit at the same time, the first might not cache in time for the second to use it, resulting in a `MISS`.
* **30-Day Cache**: Cached responses last 30 days, then expire automatically. No custom durations for now.
* **Data Dependency**: Cached responses are tied to specific document chunks. If those chunks change or get deleted, the cache clears to keep answers fresh.

## How similarity matching works

AI Search's similarity cache uses **MinHash and Locality-Sensitive Hashing (LSH)** to find and reuse responses for prompts that are worded similarly.

Here's how it works when a new prompt comes in:

1. The prompt is split into small overlapping chunks of words (called shingles), like "what's the" or "the weather."
2. These shingles are turned into a "fingerprint" using MinHash. The more overlap two prompts have, the more similar their fingerprints will be.
3. Fingerprints are placed into LSH buckets, which help AI Search quickly find similar prompts without comparing every single one.
4. If a past prompt in the same bucket is similar enough (based on your configured threshold), AI Search reuses its cached response.

## Choose a threshold

The similarity threshold decides how close two prompts need to be to reuse a cached response. You can set the threshold at the instance level or override it per request.

| Threshold | API value               | Description                 | Example match                                                                   |
| --------- | ----------------------- | --------------------------- | ------------------------------------------------------------------------------- |
| Exact     | super\_strict\_match    | Near-identical matches only | "What's the weather like today?" matches with "What is the weather like today?" |
| Strong    | close\_enough (default) | High semantic similarity    | "What's the weather like today?" matches with "How's the weather today?"        |
| Broad     | flexible\_friend        | Moderate match, more hits   | "What's the weather like today?" matches with "Tell me today's weather"         |
| Loose     | anything\_goes          | Low similarity, max reuse   | "What's the weather like today?" matches with "Give me the forecast"            |

## Per-request cache override

You can override the instance-level cache setting on a per-request basis using the `cache` parameter in `ai_search_options`:

TypeScript

```

const instance = env.AI_SEARCH.get("my-instance");


const results = await instance.search({

  messages: [{ role: "user", content: "What is Cloudflare?" }],

  ai_search_options: {

    cache: {

      enabled: true,

      cache_threshold: "flexible_friend",

    },

  },

});


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-search/configuration/retrieval/cache/#page","headline":"Similarity cache · Cloudflare AI Search docs","description":"Speed up AI Search responses by caching and reusing answers for semantically similar queries.","url":"https://developers.cloudflare.com/ai-search/configuration/retrieval/cache/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-search/","name":"AI Search"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-search/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-search/configuration/retrieval/","name":"Retrieval"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-search/configuration/retrieval/cache/","name":"Similarity cache"}}]}
```
