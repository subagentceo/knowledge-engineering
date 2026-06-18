---
title: Prepare for surges and mitigate DDoS attacks
description: Reduce server strain during traffic surges.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Prepare for surges and mitigate DDoS attacks

## Reduce server strain

Utilize Cloudflare's [caching](https://developers.cloudflare.com/cache/) to enhance load times and reduce server strain. Also, features like the [Waiting Room](https://developers.cloudflare.com/waiting-room) and [Rate Limiting](https://developers.cloudflare.com/waf/rate-limiting-rules/) can be used to effectively manage excess demand and ensure a stable user experience.

## Unlimited DDoS Protection

Cloudflare's Advanced [DDoS protection](https://developers.cloudflare.com/ddos-protection/) is always on for Enterprise customers and is used to mitigate DDoS attacks of all forms and sizes including those that target UDP and ICMP protocols, as well as SYN/ACK, DNS amplification, SMURF, and Layer 7 attacks.

## Browser Integrity Check

[Browser Integrity Check](https://developers.cloudflare.com/waf/tools/browser-integrity-check/) looks for requests with HTTP headers commonly used by spammers, bots, and crawlers such as requests with a missing or non-standard user agent. If a threat is found, Cloudflare will present a challenge page before allowing access. This may affect your API and can be selectively disabled using [Page Rules](https://developers.cloudflare.com/rules/page-rules/).

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/surge-readiness/security/prepare-for-surges/#page","headline":"Prepare for surges and mitigate DDoS attacks · Cloudflare Learning Paths","description":"Reduce server strain during traffic surges.","url":"https://developers.cloudflare.com/learning-paths/surge-readiness/security/prepare-for-surges/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/surge-readiness/security/","name":"Security"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/surge-readiness/security/prepare-for-surges/","name":"Prepare for surges and mitigate DDoS attacks"}}]}
```
