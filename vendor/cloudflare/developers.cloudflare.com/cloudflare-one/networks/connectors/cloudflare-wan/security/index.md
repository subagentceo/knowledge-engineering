---
title: Security filters
description: How Security filters works in Zero Trust networking.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Security filters

Once your traffic flows through Cloudflare's network, you can apply security policies to it without deploying additional hardware. Cloudflare WAN (formerly Magic WAN) integrates with two primary security services, each operating at different layers of the network stack.

**[Cloudflare Network Firewall](https://developers.cloudflare.com/cloudflare-network-firewall/)** filters traffic at layers 3 and 4 of the [OSI model ↗](https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/) — the network and transport layers. You can allow or block traffic based on packet characteristics such as source and destination IP addresses, ports, protocols, and packet length. All Cloudflare WAN customers have [automatic access to Cloudflare Network Firewall](https://developers.cloudflare.com/cloudflare-network-firewall/plans/).

**[Cloudflare Gateway](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/security/%7Bprops.gatewayURL%7D)** inspects traffic at higher layers, including DNS queries, network sessions, and HTTP requests. Use Gateway to set up policies that control Internet-bound traffic and access to your private network infrastructure. Refer to [Connect to Cloudflare Gateway with Cloudflare WAN](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/zero-trust/cloudflare-gateway/) to learn how to filter Cloudflare WAN traffic with Gateway policies.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/security/#page","headline":"Enable security filters · Cloudflare One docs","description":"How Security filters works in Zero Trust networking.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/security/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/","name":"Cloudflare WAN"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/security/","name":"Security filters"}}]}
```
