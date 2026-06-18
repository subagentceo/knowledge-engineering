---
title: Validation checks
description: Automatic request validation for malformed packets and attack vectors.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Validation checks

Cloudflare performs a validation check for every request. The Validation component executes prior to all other security features like custom rules or Managed Rules. The validation check blocks malformed requests like Shellshock attacks and requests with certain attack patterns in their HTTP headers before any allowlist logic occurs.

Note

Currently, you cannot disable validation checks. They run early in Cloudflare's infrastructure before the configuration for domains has been loaded.

## Event logs for validation checks

Actions performed by the Validation component appear in [Sampled logs](https://developers.cloudflare.com/waf/analytics/security-events/#sampled-logs) in Security Events, associated with the `Validation` service and without a rule ID. Event logs downloaded from the API show source as `Validation` and action as `drop` when this behavior occurs.

The following example shows a request blocked by the Validation component due to a malformed `User-Agent` HTTP request header:

![Sampled logs displaying an example of a validation check event](https://developers.cloudflare.com/_astro/validation-service.CC6rqWo__16GwHa.webp) 

In the downloaded JSON file for the event, the `ruleId` value indicates the detected issue — in this case, it was a Shellshock attack.

```

{

  "action": "drop",

  "ruleId": "sanity-shellshock",

  "source": "sanitycheck",

  "userAgent": "() { :;}; printf \\\\\"detection[%s]string\\\\\" \\\\\"TjcLLwVzBtLzvbN\\\\"

  //...

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/tools/validation-checks/#page","headline":"Validation checks · Cloudflare Web Application Firewall (WAF) docs","description":"Automatic request validation for malformed packets and attack vectors.","url":"https://developers.cloudflare.com/waf/tools/validation-checks/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/tools/","name":"Additional tools"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/tools/validation-checks/","name":"Validation checks"}}]}
```
