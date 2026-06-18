---
title: Advanced TCP Protection
description: Protect against sophisticated TCP-based DDoS attacks with traffic profiling and adaptive mitigation.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Advanced TCP Protection

Cloudflare's Advanced TCP Protection, powered by [flowtrackd ↗](https://blog.cloudflare.com/announcing-flowtrackd/), is a stateful TCP inspection engine used to detect and mitigate sophisticated out-of-state TCP attacks such as randomized and spoofed ACK floods or SYN and SYN-ACK floods.

Note

Advanced TCP and DNS Protection systems are automatically enabled in `Monitor` mode with the default thresholds for new Magic Transit customers and their [authorized prefixes](https://developers.cloudflare.com/magic-transit/how-to/advertise-prefixes/).

Magic Transit customers can also enable the Advanced DDoS systems when the prefixes are ready, change the sensitivity level, or adjust the thresholds by contacting their account team.

## How it works

Advanced TCP Protection can simultaneously protect against different kinds of attacks:

* Pinpointed attacks targeting a specific destination IP/port combination.
* Broad attacks targeting multiple IP addresses of an IP prefix at the same time.

Advanced TCP Protection can track TCP connections even when they move between Cloudflare data centers.

The feature offers two types of protection:

* [SYN Flood Protection](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/advanced-tcp-protection/#syn-flood-protection): Protects against attacks such as fully randomized SYN and SYN-ACK floods.
* [Out-of-state TCP Protection](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/advanced-tcp-protection/#out-of-state-tcp-protection): Protects against out-of-state TCP DDoS attacks such as fully randomized ACK floods and RST floods.

Each protection type is configured independently using rules and (optionally) filters. You should configure at least one rule for each type of protection before enabling Advanced TCP Protection.

### SYN Flood Protection

This system protects against attacks such as fully randomized SYN and SYN-ACK floods. You should configure at least one SYN flood rule before enabling Advanced TCP Protection.

In mitigation mode, SYN flood rules will challenge new connection initiation requests (SYN, SYN-ACK) if they exceed the configured packet-per-second thresholds. The threshold should be higher than the normal rate of legitimate SYN and SYN-ACK packets that your network receives. Packets below the threshold will not be challenged. Using the [rate sensitivity](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/concepts/#rate-sensitivity) and [burst sensitivity](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/concepts/#burst-sensitivity) settings you can increase or decrease the tolerance of SYN and SYN-ACK packets.

For more information on the configuration settings of SYN flood rules, refer to [Rule settings](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/concepts/#rule-settings).

### Out-of-state TCP Protection

This system protects against out-of-state TCP DDoS attacks such as fully randomized ACK floods and RST floods. You should configure one out-of-state TCP rule before enabling Advanced TCP Protection.

In mitigation mode, out-of-state TCP rules will drop out-of-state packets that do not belong to existing (and tracked) TCP connections if their rates exceed the configured thresholds. The threshold should be higher than the normal rate of non SYN or SYN-ACK TCP packets that your network receives. Packets below the threshold will not be evaluated. Using the [rate sensitivity](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/concepts/#rate-sensitivity) and [burst sensitivity](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/concepts/#burst-sensitivity) settings you can increase or decrease the tolerance of out-of-state TCP packets.

For more information on the configuration settings of out-of-state TCP rules, refer to [Rule settings](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/concepts/#rule-settings).

---

## Setup

[Create a global configuration](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/#rules) to set up SYN Flood and Out-of-state TCP rules and filters for Advanced TCP Protection.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/advanced-tcp-protection/#page","headline":"Cloudflare Advanced TCP Protection · Cloudflare DDoS Protection docs","description":"Protect against sophisticated TCP-based DDoS attacks with traffic profiling and adaptive mitigation.","url":"https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/advanced-tcp-protection/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["TCP"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ddos-protection/","name":"DDoS Protection"}},{"@type":"ListItem","position":3,"item":{"@id":"/ddos-protection/advanced-ddos-systems/","name":"Advanced DDoS systems"}},{"@type":"ListItem","position":4,"item":{"@id":"/ddos-protection/advanced-ddos-systems/overview/","name":"General settings"}},{"@type":"ListItem","position":5,"item":{"@id":"/ddos-protection/advanced-ddos-systems/overview/advanced-tcp-protection/","name":"Advanced TCP Protection"}}]}
```
