---
title: Key considerations and best practices summary
description: Review DNS migration best practices summary.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Key considerations and best practices summary

* Plan meticulously: Do not rush the planning and preparation phases.
* Communicate clearly: Keep stakeholders informed.
* Lower TTLs in advance: This is crucial for a faster cutover.
* Disable DNSSEC before NS change (safest): Remove DS records at the registrar well before changing nameservers, then re-enable DNSSEC via Cloudflare.
* Verify, verify, verify: Double-check record imports and functionality at each stage.
* Test thoroughly: From multiple locations and for all critical services.
* Have a rollback plan: Know how to revert if necessary.
* Migrate during low traffic: Minimize potential user impact.
* Address BIND Views/ACLs: Understand how Cloudflare will handle or replace this functionality.
* Take advantage of Cloudflare features: Once stable, explore and implement Cloudflare's security and performance enhancements.

By following these best practices, you can significantly increase the likelihood of a smooth and successful migration from your on-prem BIND DNS to Cloudflare.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/dns-best-practices/concepts/summary-considerations/#page","headline":"Key considerations and best practices summary · Cloudflare Learning Paths","description":"Review DNS migration best practices summary.","url":"https://developers.cloudflare.com/learning-paths/dns-best-practices/concepts/summary-considerations/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/dns-best-practices/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/dns-best-practices/concepts/summary-considerations/","name":"Key considerations and best practices summary"}}]}
```
