---
title: Override expressions
description: Expression fields and operators for scoping HTTP DDoS Attack Protection overrides.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Override expressions

Note

Only available to Enterprise customers with the Advanced DDoS Protection subscription.

Set an override expression for the HTTP DDoS Attack Protection managed ruleset to define a specific scope for [sensitivity level](https://developers.cloudflare.com/ddos-protection/managed-rulesets/http/override-parameters/#sensitivity-level) or [action](https://developers.cloudflare.com/ddos-protection/managed-rulesets/http/override-parameters/#action) adjustments.

For example, you can set different sensitivity levels for different request URI paths: a medium sensitivity level for URI path `A` and a low sensitivity level for URI path `B`.

## Available expression fields

You can use the following fields in override expressions:

* `cf.bot_management.ja3_hash`
* `cf.bot_management.ja4`
* `cf.client.bot`
* `cf.tls_cipher`
* `cf.tls_client_auth.cert_verified`
* `cf.tls_version`
* `cf.verified_bot_category`
* `http.cookie`
* `http.host`
* `http.referer`
* `http.request.headers`
* `http.request.headers.names`
* `http.request.headers.truncated`
* `http.request.headers.values`
* `http.request.uri`
* `http.request.uri.path`
* `http.request.uri.path.extension`
* `http.request.uri.query`
* `http.request.full_uri`
* `http.request.method`
* `http.request.version`
* `http.request.cookies`
* `http.user_agent`
* `http.x_forwarded_for`
* `ip.src`
* `ip.src.asnum`
* `ip.src.continent`
* `ip.src.country`
* `ip.src.is_in_european_union`
* `ssl`

Refer to the [Fields reference](https://developers.cloudflare.com/ruleset-engine/rules-language/fields/reference/) in the Rules language documentation for more information.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/managed-rulesets/http/http-overrides/override-expressions/#page","headline":"Override expressions for HTTP DDoS Attack Protection · Cloudflare DDoS Protection docs","description":"Expression fields and operators for scoping HTTP DDoS Attack Protection overrides.","url":"https://developers.cloudflare.com/ddos-protection/managed-rulesets/http/http-overrides/override-expressions/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-07","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Headers"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ddos-protection/","name":"DDoS Protection"}},{"@type":"ListItem","position":3,"item":{"@id":"/ddos-protection/managed-rulesets/","name":"Managed rulesets"}},{"@type":"ListItem","position":4,"item":{"@id":"/ddos-protection/managed-rulesets/http/","name":"HTTP DDoS Attack Protection"}},{"@type":"ListItem","position":5,"item":{"@id":"/ddos-protection/managed-rulesets/http/http-overrides/","name":"Overrides"}},{"@type":"ListItem","position":6,"item":{"@id":"/ddos-protection/managed-rulesets/http/http-overrides/override-expressions/","name":"Override expressions"}}]}
```
