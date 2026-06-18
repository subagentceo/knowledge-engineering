---
title: Analytics
description: View DDoS attack analytics in Security Analytics, Network Analytics, or the GraphQL API.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Analytics

You can view DDoS analytics in different dashboards, depending on your service and plan:

* The [Security Events dashboard](https://developers.cloudflare.com/waf/analytics/security-events/) provides you with visibility into L7 security events that target your zone, including HTTP DDoS attacks and TCP attacks. The dashboard displays mitigations of HTTP DDoS attacks as HTTP DDoS events. These events are also available via [Cloudflare Logs](https://developers.cloudflare.com/logs/).
* The [Network Analytics dashboard](https://developers.cloudflare.com/analytics/network-analytics/) provides you with visibility into L3/4 traffic and DDoS attacks that target your IP ranges or Spectrum applications.

## Availability

| Service        | Free              | Pro             | Business        | Enterprise        |
| -------------- | ----------------- | --------------- | --------------- | ----------------- |
| WAF/CDN        | Sampled logs only | Security Events | Security Events | Security Events   |
| Spectrum/BYOIP | –                 | –               | –               | Network Analytics |
| Magic Transit  | –                 | –               | –               | Network Analytics |

## Remarks

In some situations, the analytics dashboards will not show you the ID of the DDoS managed rule that handled a packet/request. This means that an internal DDoS rule, which Cloudflare does not currently expose publicly, applied an action to the packet/request. These internal DDoS rules have a very low false positive rate and should always be enabled to protect your properties against DDoS attacks. For the same reason, DDoS rule IDs may also be unavailable in Cloudflare logs and API responses.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/reference/analytics/#page","headline":"DDoS analytics · Cloudflare DDoS Protection docs","description":"View DDoS attack analytics in Security Analytics, Network Analytics, or the GraphQL API.","url":"https://developers.cloudflare.com/ddos-protection/reference/analytics/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Analytics"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ddos-protection/","name":"DDoS Protection"}},{"@type":"ListItem","position":3,"item":{"@id":"/ddos-protection/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/ddos-protection/reference/analytics/","name":"Analytics"}}]}
```
