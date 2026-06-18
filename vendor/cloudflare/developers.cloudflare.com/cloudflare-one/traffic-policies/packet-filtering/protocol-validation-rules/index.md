---
title: Protocol validation rules
description: How Protocol validation rules works in Gateway.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Protocol validation rules

Cloudflare Network Firewall can validate [Session Initiation Protocol (SIP) ↗](https://datatracker.ietf.org/doc/html/rfc2543) traffic — the protocol used to set up voice and video calls over IP networks (VoIP). This lets you inspect whether SIP packets are properly formatted and enforce a positive security model (only allow well-formed SIP traffic, block everything else).

You can use the `sip` field when creating a rule to check whether packets contain valid SIP data, a Layer 7 (L7) protocol. The `sip` field evaluates to `true` for well-formed SIP packets. Refer to [Cloudflare Network Firewall fields](https://developers.cloudflare.com/cloudflare-network-firewall/reference/network-firewall-fields/), specifically the `sip` field, for more information on this topic.

Currently, SIP is the only protocol supported for deep validation. Contact your account manager if you need Cloudflare Network Firewall to support additional protocols.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/packet-filtering/protocol-validation-rules/#page","headline":"Protocol validation rules · Cloudflare One docs","description":"How Protocol validation rules works in Gateway.","url":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/packet-filtering/protocol-validation-rules/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/traffic-policies/","name":"Traffic policies"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/traffic-policies/packet-filtering/","name":"Packet filtering"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/traffic-policies/packet-filtering/protocol-validation-rules/","name":"Protocol validation rules"}}]}
```
