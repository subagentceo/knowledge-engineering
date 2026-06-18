---
title: Ruleset logic
description: How Ruleset logic works in Gateway.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Ruleset logic

Cloudflare Network Firewall rules are performed after Cloudflare's DDoS mitigations have been applied. The two systems are independent, and therefore, permitting traffic inside Cloudflare Network Firewall does not allow it within our DDoS mitigations. Traffic can still be blocked by DDoS mitigations that are applied first in the flow through Cloudflare's systems.

By default, Cloudflare Network Firewall policies allow all traffic until explicitly blocked by a rule. If no policy is configured, all traffic is permitted after DDoS mitigations have been applied.

## Security policy

You have two options for configuring a security policy:

* Enforce a positive security model, which blocks everything and creates allow rules for specific required traffic.
* Begin with a minimal ruleset to block specific traffic and, by default, everything else is permitted.

Traffic is matched in order of the configured rules. As soon as traffic is matched by an enabled rule, it is no longer validated against the later rules. Disabled rules are skipped entirely — traffic is not evaluated against them. In the dashboard under **Traffic policies** \> **Firewall policies**, rule order begins from the top and flows down your list of rules.

For example, permitting all TCP traffic in a rule #4 would mean all TCP traffic is permitted. A rule #5 to block traffic for IP address `x.x.x.x` would not be checked.

For best practices when configuring your security policy, refer to [Best practices](https://developers.cloudflare.com/cloudflare-network-firewall/best-practices/).

## Packet filtering policies and Magic Transit endpoint health checks

Cloudflare-sourced traffic is also subject to the Cloudflare Network Firewall rules you configure. If you block all ICMP traffic, you will also block Cloudflare's [endpoint health checks](https://developers.cloudflare.com/magic-transit/reference/tunnel-health-checks/#endpoint-health-checks). When blocking ICMP traffic, ensure your rules first allow ICMP sourced from Cloudflare public IPs to your prefix endpoint IPs before applying a block ICMP rule.

For a list of Cloudflare's public IPs, refer to [IP Ranges ↗](https://www.cloudflare.com/ips/).

## Cloudflare Network Firewall phases

Traffic is processed in two phases: first against your Custom rules, then against Cloudflare's Managed rules.

### Custom phase ruleset

The Custom phase is a set of rules you define and control. You can customize the expression, order, and actions of these rules.

Cloudflare Network Firewall evaluates custom policies before managed policies in the order of precedence. Therefore, if traffic meets the conditions from a custom policy first, that is the action Cloudflare Network Firewall will take.

The actions available for a custom rule are **Block** or **Skip** (allow).

### Managed phase ruleset

Managed phase rulesets are maintained by Cloudflare and contain rules based on best practices, known malicious patterns, and other threat intelligence.

Cloudflare maintains the expressions and order of execution for rules in the Managed phase. You can enable, disable, or set individual rules to log matching packets.

Refer to [Enable managed rulesets](https://developers.cloudflare.com/cloudflare-one/traffic-policies/packet-filtering/enable-managed-rulesets/) for more information.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/packet-filtering/ruleset-logic/#page","headline":"Ruleset logic · Cloudflare One docs","description":"How Ruleset logic works in Gateway.","url":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/packet-filtering/ruleset-logic/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["ICMP"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/traffic-policies/","name":"Traffic policies"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/traffic-policies/packet-filtering/","name":"Packet filtering"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/traffic-policies/packet-filtering/ruleset-logic/","name":"Ruleset logic"}}]}
```
