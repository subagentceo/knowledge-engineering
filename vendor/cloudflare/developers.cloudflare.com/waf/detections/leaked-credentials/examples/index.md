---
title: Example mitigation rules
description: Examples of rules for mitigating requests containing leaked credentials.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Example mitigation rules

## Rate limit suspicious logins with leaked credentials

Note

Access to the `cf.waf.credential_check.username_and_password_leaked` field requires a Pro plan or above.

[Create a rate limiting rule](https://developers.cloudflare.com/waf/rate-limiting-rules/create-zone-dashboard/) using [account takeover (ATO) detection](https://developers.cloudflare.com/bots/additional-configurations/detection-ids/account-takeover-detections/) and leaked credentials fields to limit volumetric attacks from particular IP addresses, JA4 Fingerprints, or countries.

The following example rule applies rate limiting to requests with a specific [ATO detection ID](https://developers.cloudflare.com/bots/additional-configurations/detection-ids/account-takeover-detections/) (corresponding to `Observes all login traffic to the zone`) that contain a previously leaked username and password:

**When incoming requests match**:  
`(any(cf.bot_management.detection_ids[*] eq 201326593) and cf.waf.credential_check.username_and_password_leaked)`

**With the same characteristics**: _IP_

When rate exceeds:

* **Requests**: `5`
* **Period**: _1 minute_

## Challenge requests containing leaked credentials

Note

Access to the _User and Password Leaked_ (`cf.waf.credential_check.username_and_password_leaked`) field requires a Pro plan or above.

[Create a custom rule](https://developers.cloudflare.com/waf/custom-rules/create-dashboard/) that challenges requests containing a previously leaked set of credentials (username and password).

* **Expression**: If you use the Expression Builder, configure the following expression:  
| Field                    | Operator | Value |  
| ------------------------ | -------- | ----- |  
| User and Password Leaked | equals   | True  |  
If you use the Expression Editor, enter the following expression:  
```  
(cf.waf.credential_check.username_and_password_leaked)  
```
* **Action**: _Managed Challenge_

---

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/detections/leaked-credentials/examples/#page","headline":"Leaked credentials example mitigation rules · Cloudflare Web Application Firewall (WAF) docs","description":"Examples of rules for mitigating requests containing leaked credentials.","url":"https://developers.cloudflare.com/waf/detections/leaked-credentials/examples/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Account takeover"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/detections/","name":"Traffic detections"}},{"@type":"ListItem","position":4,"item":{"@id":"/waf/detections/leaked-credentials/","name":"Leaked credentials detection"}},{"@type":"ListItem","position":5,"item":{"@id":"/waf/detections/leaked-credentials/examples/","name":"Example mitigation rules"}}]}
```
