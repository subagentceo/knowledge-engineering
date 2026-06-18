---
title: 2023-04-17
description: HTTP DDoS managed ruleset rule changes for this release.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# 2023-04-17

Previously, only a subset of rules were exposed publicly. In rare situations, these rules can cause false positives. When this happens, you can customize their behavior using overrides.

Besides these rules, the DDoS managed rules contain other rules that do not cause issues. Until now, these rules were not shown in the dashboard or referenced in the documentation.

Cloudflare now shows all rules in the dashboard, including these high-confidence rules. This means that requests matching these rules will now have the correct rule identifier. The newly published rules are read-only and you cannot disable them.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/change-log/http/2023-04-17/#page","headline":"2023-04-17 · Cloudflare DDoS Protection docs","description":"HTTP DDoS managed ruleset rule changes for this release.","url":"https://developers.cloudflare.com/ddos-protection/change-log/http/2023-04-17/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ddos-protection/","name":"DDoS Protection"}},{"@type":"ListItem","position":3,"item":{"@id":"/ddos-protection/change-log/","name":"Changelog"}},{"@type":"ListItem","position":4,"item":{"@id":"/ddos-protection/change-log/http/","name":"HTTP DDoS managed ruleset"}},{"@type":"ListItem","position":5,"item":{"@id":"/ddos-protection/change-log/http/2023-04-17/","name":"2023-04-17"}}]}
```
