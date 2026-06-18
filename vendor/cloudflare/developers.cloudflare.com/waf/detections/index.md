---
title: Traffic detections
description: Traffic detection signals including attack scores, bot scores, and leaked credentials.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/waf/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Traffic detections

Traffic detections check incoming requests for malicious or potentially malicious activity. Each enabled detection scores or classifies requests by populating one or more fields. These fields appear as filters in the [Security Analytics](https://developers.cloudflare.com/waf/analytics/security-analytics/) dashboard, and you can use them in rule expressions.

Detections are always on once enabled, even if you have not configured any security rules that use them. You can review detection results in [Security Analytics](https://developers.cloudflare.com/waf/analytics/security-analytics/) to identify traffic patterns and spot potentially malicious traffic. For example, you can analyze traffic based on [attack score](https://developers.cloudflare.com/waf/detections/attack-score/), [bot score](https://developers.cloudflare.com/bots/concepts/bot-score/), [content scan results](https://developers.cloudflare.com/waf/detections/malicious-uploads/), or the [presence of personally identifiable information (PII)](https://developers.cloudflare.com/waf/detections/ai-security-for-apps/) in large language model (LLM) prompts.

Cloudflare provides the following detections:

* [ WAF attack score ](https://developers.cloudflare.com/waf/detections/attack-score/)
* [ Leaked credentials detection ](https://developers.cloudflare.com/waf/detections/leaked-credentials/)
* [ Malicious uploads detection ](https://developers.cloudflare.com/waf/detections/malicious-uploads/)
* [ AI Security for Apps ](https://developers.cloudflare.com/waf/detections/ai-security-for-apps/)
* [ Bot score ](https://developers.cloudflare.com/bots/concepts/bot-score/)
* [ Threat intelligence ](https://developers.cloudflare.com/waf/detections/threat-intelligence/)

## Availability

| Free                                 | Pro             | Business                                  | Enterprise                                |                               |
| ------------------------------------ | --------------- | ----------------------------------------- | ----------------------------------------- | ----------------------------- |
| Availability                         | Yes             | Yes                                       | Yes                                       | Yes                           |
| Malicious uploads detection          | No              | No                                        | No                                        | Paid add-on                   |
| Leaked credentials detection         | Yes             | Yes                                       | Yes                                       | Yes                           |
| Leaked credentials fields            | Password Leaked | Password Leaked, User and Password Leaked | Password Leaked, User and Password Leaked | All leaked credentials fields |
| Number of custom detection locations | 0               | 0                                         | 0                                         | 10                            |
| Attack score                         | No              | No                                        | One field only                            | Yes                           |
| AI Security for Apps                 | No              | No                                        | No                                        | Yes                           |

For more information on bot score, refer to [Bot scores](https://developers.cloudflare.com/bots/concepts/bot-score/).

## Turn on a detection

To turn on a traffic detection:

* [  New dashboard ](#tab-panel-11162)
* [ Old dashboard ](#tab-panel-11163)

1. In the Cloudflare dashboard, go to the Security **Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/security/settings)
2. Filter by **Detection tools**.
3. Turn on the desired detections.

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Security** \> **Settings**.
3. Under **Incoming traffic detections**, turn on the desired detections.

Enabled detections will run for all incoming traffic.

Notes

* On Free plans, the leaked credentials detection is enabled by default, and no action is required.
* Currently, you cannot manage the [bot score](https://developers.cloudflare.com/bots/concepts/bot-score/) and [attack score](https://developers.cloudflare.com/waf/detections/attack-score/) detections from the **Settings** page. Refer to the documentation of each feature for availability details.

## More resources

For more information on detection versus mitigation, refer to [Concepts](https://developers.cloudflare.com/waf/concepts/#detection-versus-mitigation).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/waf/detections/#page","headline":"Traffic detections · Cloudflare Web Application Firewall (WAF) docs","description":"Traffic detection signals including attack scores, bot scores, and leaked credentials.","url":"https://developers.cloudflare.com/waf/detections/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/waf/","name":"WAF"}},{"@type":"ListItem","position":3,"item":{"@id":"/waf/detections/","name":"Traffic detections"}}]}
```
