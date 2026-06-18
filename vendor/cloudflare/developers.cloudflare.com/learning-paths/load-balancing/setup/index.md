---
title: Setup
description: Distribute traffic across servers with load balancing.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Setup

Create a load balancer that monitors endpoint health and intelligently routes traffic.

## Objectives

By the end of this module, you will be able to:

* Configure a monitor and health checks.
* Create a pool.
* Create a load balancer.
* Analyze traffic patterns.

## Prerequisites

* Multiple endpoints, either physical or cloud-based.
* Access to Load Balancing, available as an [add-on](https://developers.cloudflare.com/load-balancing/get-started/enable-load-balancing/) for any type of account.
* Two hostnames, one for test traffic and the other for production traffic.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/load-balancing/setup/#page","headline":"Setup · Cloudflare Learning Paths","description":"Distribute traffic across servers with load balancing.","url":"https://developers.cloudflare.com/learning-paths/load-balancing/setup/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/load-balancing/setup/","name":"Setup"}}]}
```
