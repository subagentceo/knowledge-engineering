---
title: Custom rules
description: Create custom rules for load balancer routing.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Custom rules

Custom rules allow you to control incoming traffic by filtering requests to a zone. They work as customized web application firewall (WAF) rules that you can use to perform actions like _Block_ or _Managed Challenge_ on incoming requests. You can also use the _Skip_ action in a custom rule to [skip one or more Cloudflare security features](https://developers.cloudflare.com/waf/custom-rules/skip/).

In the [new security dashboard](https://developers.cloudflare.com/security/), custom rules are one of the available types of [security rules](https://developers.cloudflare.com/security/rules/). Security rules perform security-related actions on incoming requests that match specified filters.

Like other rules evaluated by Cloudflare's [Ruleset Engine](https://developers.cloudflare.com/ruleset-engine/), custom rules have the following basic parameters:

* An [expression](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/) that specifies the criteria you are matching traffic on using the [Rules language](https://developers.cloudflare.com/ruleset-engine/rules-language/).
* An [action](https://developers.cloudflare.com/ruleset-engine/rules-language/actions/) that specifies what to perform when there is a match for the rule.

The [custom rules documentation](https://developers.cloudflare.com/waf/custom-rules/) includes examples for common use cases.

## Skip rules

You can skip one or more Cloudflare security features using a custom rule [configured with the _Skip_ action](https://developers.cloudflare.com/waf/custom-rules/skip/). These rules are also known as skip rules. Refer to [Skip options](https://developers.cloudflare.com/waf/custom-rules/skip/options/) for more information on the features you can skip.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/application-security/firewall/custom-rules/#page","headline":"Custom rules · Cloudflare Learning Paths","description":"Create custom rules for load balancer routing.","url":"https://developers.cloudflare.com/learning-paths/application-security/firewall/custom-rules/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/application-security/firewall/","name":"Web Application Firewall"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/application-security/firewall/custom-rules/","name":"Custom rules"}}]}
```
