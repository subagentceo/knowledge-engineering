---
title: Cloudflare and Google Analytics
description: Understand how Cloudflare's proxy interacts with Google Analytics tracking and how to use GA with Zaraz.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cloudflare and Google Analytics

Using Cloudflare does not affect Google Analytics (GA) tracking if it is added to the website [in one of ways recommended by Google ↗](https://support.google.com/analytics/answer/9304153#add-tag).

## Standard GA setup

Cloudflare proxies traffic to your origin web server, but the GA JavaScript code never actually sends traffic to your server. Instead, it executes directly in a user's browser and does not interact with Cloudflare.

Cloudflare only affects analytics tools that read logs directly from your web server (like awstats).

Note

To troubleshoot potential issues with Google Analytics, refer to [Common GA setup mistakes ↗](https://support.google.com/analytics/answer/1009683).

## Zaraz

As an alternative to the standard setup of Google Analytics with tag/snippet, Cloudflare offers a way to use Google Analytics with [Zaraz](https://developers.cloudflare.com/zaraz/). Zaraz is a solution that allows Google Analytics to collect data without its script loaded on the website. If GA is set up this way, then not all features may be available.

Note

Details about features of Google Analytics that are unavailable with Zaraz can be found in [Zaraz FAQ](https://developers.cloudflare.com/zaraz/faq/#tools)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/reference/google-analytics/#page","headline":"Using Google Analytics with Cloudflare · Cloudflare Fundamentals docs","description":"Understand how Cloudflare's proxy interacts with Google Analytics tracking and how to use GA with Zaraz.","url":"https://developers.cloudflare.com/fundamentals/reference/google-analytics/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/reference/google-analytics/","name":"Cloudflare and Google Analytics"}}]}
```
