---
title: Create an IP access rule
description: Create IP Access rules to allow, block, or challenge by IP.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Create an IP access rule

Recommendation: Use custom rules instead

Cloudflare recommends that you create [custom rules](https://developers.cloudflare.com/waf/custom-rules/) instead of IP Access rules to perform IP-based or geography-based blocking (geoblocking).

Warning

For [Spectrum](https://developers.cloudflare.com/spectrum/) applications configured with the non-HTTP/HTTPS application type, IP Access rules are the only supported mechanism for filtering traffic by IP address, IP range, country, or ASN. To use them, enable IP Access rules in your [Spectrum app configuration](https://developers.cloudflare.com/spectrum/reference/configuration-options/#ip-access-rules).

* [  New dashboard ](#tab-panel-11264)
* [ Old dashboard ](#tab-panel-11265)
* [ API ](#tab-panel-11266)

Note

IP Access Rules are only available in the new security dashboard if you have configured at least one IP access rule.

1. In the Cloudflare dashboard, go to the **Security rules** page.  
[ Go to **Security rules** ](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. Select **Create rule** \> **IP access rules**.
3. Enter the following rule details:  
   1. For **IP, IP range, country name, or ASN**, enter an IP address, IP range, country code/name, or Autonomous System Number (ASN). For details, refer to [IP Access rules parameters](https://developers.cloudflare.com/waf/tools/ip-access-rules/parameters/).  
   2. For **Action**, select an [action](https://developers.cloudflare.com/waf/tools/ip-access-rules/actions/).  
   3. For **Zone**, select whether the rule applies to the current website only or to all websites in the account.  
   4. (Optional) Enter a note for the rule (for example, `Payment Gateway`).
4. Select **Create**.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com), and select your account and domain.
2. Go to **Security** \> **WAF** \> **Tools**.
3. Under **IP Access Rules**, enter the following details:  
   1. For **Value**, enter an IP address, IP range, country code/name, or Autonomous System Number (ASN). For details, refer to [IP Access rules parameters](https://developers.cloudflare.com/waf/tools/ip-access-rules/parameters/).  
   2. Select an [action](https://developers.cloudflare.com/waf/tools/ip-access-rules/actions/).  
   3. For **Zone**, select whether the rule applies to the current website only or to all websites in the account.  
   4. (Optional) Enter a note for the rule (for example, `Payment Gateway`).
4. Select **Add**.

Use the Cloudflare API to programmatically create IP access rules. For more information, refer to [Create an IP Access Rule](https://developers.cloudflare.com/api/resources/firewall/subresources/access%5Frules/methods/create/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/tools/ip-access-rules/create/#page","headline":"Create an IP access rule · Cloudflare Web Application Firewall (WAF) docs","description":"Create IP Access rules to allow, block, or challenge by IP.","url":"https://developers.cloudflare.com/waf/tools/ip-access-rules/create/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/tools/","name":"Additional tools"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/tools/ip-access-rules/","name":"IP Access rules"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/tools/ip-access-rules/create/","name":"Create an IP access rule"}}]}
```
