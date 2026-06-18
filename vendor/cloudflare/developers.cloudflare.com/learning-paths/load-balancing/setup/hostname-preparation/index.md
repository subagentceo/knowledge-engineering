---
title: Hostname preparation
description: Prepare hostnames for load balancer setup.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Hostname preparation

Before setting up anything related to your load balancer, make sure you test that production hostnames meet the following criteria:

* Based on the [priority order](https://developers.cloudflare.com/load-balancing/load-balancers/dns-records/#priority-order) of DNS records, they will receive the intended amount of traffic.
* Each hostname is covered by an [SSL/TLS certificate](https://developers.cloudflare.com/load-balancing/load-balancers/dns-records/#ssltls-coverage).

After confirming each of these conditions are met, you can proceed with setting up your load balancer.

## Routing strategy

Depending on your preferences and infrastructure, you might route traffic to your load balancer in different ways:

* For most customers, it's simpler to create the load balancer on the hostname directly (`www.example.com`).
* However, you could also create the load balancer on another hostname (`lb.example.com`) and then route traffic using a `CNAME` record on `test.example.com` that points to `lb.example.com`.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/load-balancing/setup/hostname-preparation/#page","headline":"Hostname preparation · Cloudflare Learning Paths","description":"Prepare hostnames for load balancer setup.","url":"https://developers.cloudflare.com/learning-paths/load-balancing/setup/hostname-preparation/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/load-balancing/setup/","name":"Setup"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/load-balancing/setup/hostname-preparation/","name":"Hostname preparation"}}]}
```
