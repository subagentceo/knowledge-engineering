---
title: Customize Cloudflare security
description: Learn about customize cloudflare security in this guide.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Customize Cloudflare security

Another way of reducing origin traffic is customizing the Cloudflare WAF and other security features. The fewer malicious requests that reach your application, the fewer that could reach (and overwhelm) your origin.

To reduce incoming malicious requests, you could:

* Create [WAF custom rules](https://developers.cloudflare.com/waf/custom-rules/) for protection based on specific aspects of incoming requests.
* Adjust DDoS rules to handle [false negatives and false positives](https://developers.cloudflare.com/ddos-protection/managed-rulesets/http/http-overrides/override-examples/).
* Build [rate limiting rules](https://developers.cloudflare.com/waf/rate-limiting-rules/) to protect against specific patterns of requests.
* Enable [bot protection](https://developers.cloudflare.com/bots/get-started/) or set up [Bot Management for Enterprise](https://developers.cloudflare.com/bots/get-started/bot-management/) to protect against automated abuse.
* Explore [network-layer DDoS attack protection](https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/).
* Review the rest of Cloudflare's [security options](https://developers.cloudflare.com/learning-paths/application-security/account-security/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/prevent-ddos-attacks/advanced/customize-security/#page","headline":"Customize Cloudflare security · Cloudflare Learning Paths","description":"Learn about customize cloudflare security in this guide.","url":"https://developers.cloudflare.com/learning-paths/prevent-ddos-attacks/advanced/customize-security/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/prevent-ddos-attacks/advanced/","name":"Advanced DDoS protection"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/prevent-ddos-attacks/advanced/customize-security/","name":"Customize Cloudflare security"}}]}
```
