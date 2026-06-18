---
title: Control domain access
description: Manage domain access with IP rules.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Control domain access

[IP Access Rules](https://developers.cloudflare.com/waf/tools/ip-access-rules/) specify an action based on the origin of your user across a single domain or all of the domains in your account.

IP Access Rules can be applied based on:

* IPv4 address or range: Specified in CIDR notation as `/16` or `/24`
* IPv6 address or range: Specified in CIDR notation as `/32`, `/48`, `/64`
* ASN
* Country or the Tor network

Note

We recommend locking down your origin with an Access Control List (ACL) which only allows [Cloudflare IPs ↗](http://www.cloudflare.com/ips).

Actions:

* Block: Ensures that an IP address will never be allowed to access your site.
* Non-Interactive Challenge: Visitors will be shown a non-interactive challenge before allowed access.
* Interactive Challenge: Visitors will be shown an interactive challenge before allowed access.
* Allowlist: Ensures that an IP address will never be blocked from accessing your site. This supersedes any Cloudflare security profile.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/surge-readiness/security/control-domain-access/#page","headline":"Control domain access · Cloudflare Learning Paths","description":"Manage domain access with IP rules.","url":"https://developers.cloudflare.com/learning-paths/surge-readiness/security/control-domain-access/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/surge-readiness/security/","name":"Security"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/surge-readiness/security/control-domain-access/","name":"Control domain access"}}]}
```
