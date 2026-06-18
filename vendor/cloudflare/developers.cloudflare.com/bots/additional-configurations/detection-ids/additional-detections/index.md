---
title: Additional detections
description: Detection IDs for residential proxy traffic and other automated signals.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/bots/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Additional detections

Cloudflare bot detection includes additional signals to catch different kinds of automated traffic.

Bot management customers automatically benefit from the residential proxy detection improvement below, which lowers the [bot score](https://developers.cloudflare.com/bots/concepts/bot-score/) for matched requests. Using the detection ID in [custom rules](https://developers.cloudflare.com/waf/custom-rules/) provides even more visibility and control over mitigating residential proxy traffic.

| Detection ID | Description                                                                                                                                                                                                                                                                                                    |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 50331651     | Observes traffic from residential proxy networks and similar commercial proxies. When the ID matches a request, Bot Management sets the bot score to 29 and uses [anomaly detection](https://developers.cloudflare.com/bots/concepts/bot-detection-engines/#anomaly-detection-enterprise) as its score source. |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/bots/additional-configurations/detection-ids/additional-detections/#page","headline":"Additional detections · Cloudflare bot solutions docs","description":"Detection IDs for residential proxy traffic and other automated signals.","url":"https://developers.cloudflare.com/bots/additional-configurations/detection-ids/additional-detections/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/bots/","name":"Bots"}},{"@type":"ListItem","position":3,"item":{"@id":"/bots/additional-configurations/","name":"Additional configurations"}},{"@type":"ListItem","position":4,"item":{"@id":"/bots/additional-configurations/detection-ids/","name":"Detection IDs"}},{"@type":"ListItem","position":5,"item":{"@id":"/bots/additional-configurations/detection-ids/additional-detections/","name":"Additional detections"}}]}
```
