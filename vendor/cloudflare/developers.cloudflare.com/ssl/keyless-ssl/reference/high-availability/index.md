---
title: High availability
description: Deploy Keyless SSL key servers with high availability.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# High availability

The Cloudflare Keyless SSL server runs as a single binary with minimal dependencies and is designed to be robust and reliable. However, the network between your key server and Cloudflare may not be, which could prevent new TLS connections.

For this reason, we strongly recommend that you run at least two key servers in a high availability configuration behind a load balancer. Set up health checks for each key server on the configured TCP port—2407 by default and failover as necessary or round-robin between active (healthy) key servers.

From a network availability and performance perspective, advertise the IP address of your key server from multiple data centers (an anycast setup) so the Cloudflare global network can route to the closest key server via BGP. When you use anycast routing, you can also safely take a data center offline to perform maintenance.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/keyless-ssl/reference/high-availability/#page","headline":"High availability · Cloudflare SSL/TLS docs","description":"Deploy Keyless SSL key servers with high availability.","url":"https://developers.cloudflare.com/ssl/keyless-ssl/reference/high-availability/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/keyless-ssl/","name":"Keyless SSL"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/keyless-ssl/reference/","name":"Reference"}},{"@type":"ListItem","position":5,"item":{"@id":"/ssl/keyless-ssl/reference/high-availability/","name":"High availability"}}]}
```
