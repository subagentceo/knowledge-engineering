---
title: Network-layer DDoS Attack Protection
description: Pre-configured rules that detect and mitigate DDoS attacks at layers 3 and 4.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Network-layer DDoS Attack Protection

The Cloudflare Network-layer [DDoS Attack ↗](https://www.cloudflare.com/en-gb/learning/ddos/what-is-a-ddos-attack/) Protection managed ruleset is a set of pre-configured rules used to match [known DDoS attack vectors](https://developers.cloudflare.com/ddos-protection/about/attack-coverage/) at levels 3 and 4 of the OSI model.

Cloudflare updates the list of rules in the managed ruleset on a regular basis. Refer to the [changelog](https://developers.cloudflare.com/ddos-protection/change-log/network/) for more information on recent and upcoming changes.

The Network-layer DDoS Attack Protection managed ruleset is always enabled — you can only customize its behavior.

## Ruleset configuration

You may need to adjust the behavior of specific rules in case of false positives or due to specific traffic patterns.

Adjust the behavior of the rules in the managed ruleset by modifying the following parameters:

* The performed **action** when an attack is detected
* The **sensitivity level** of attack detection mechanisms

To adjust rule behavior, use one of the following methods:

* [Configure the managed ruleset in the Cloudflare dashboard](https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/network-overrides/configure-dashboard/).
* [Configure the managed ruleset via Cloudflare API](https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/network-overrides/configure-api/).
* [Configure the managed ruleset using Terraform](https://developers.cloudflare.com/terraform/additional-configurations/ddos-managed-rulesets/#example-configure-network-layer-ddos-attack-protection).

You can only configure the behavior of the managed ruleset to set a stronger or weaker mitigation action (depending on the default action of a specific rule, you can change it to `Block` if the default action is `DDoS Dynamic` or `Log`.), or a lower default sensitivity for all rules. Refer to [Managed ruleset parameters](https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/override-parameters/) for more information.

Overrides can apply to all packets or to a subset of incoming packets, depending on the override expression. Refer to [Override expressions](https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/network-overrides/override-expressions/) for more information.

### Network Analytics rule display

Cloudflare regularly deploys new detection rules to the Network-layer DDoS managed ruleset. To ensure high accuracy and minimize false positives, these rules undergo a testing phase before they are fully promoted.

When a rule is in its testing phase, you may notice specific behaviors in the Cloudflare dashboard.

New rules often default to `Log` (visible in **DDoS Managed Rules** \> **Browse Rules**). This allows Cloudflare to evaluate the rule's performance against real-world traffic without impacting legitimate packets.

In the [Network Analytics](https://developers.cloudflare.com/analytics/network-analytics/) dashboard, traffic matched by these testing-phase rules is labeled as `Log (rule disabled)`. This is a reporting convention indicating the rule is in a pre-production monitoring state.

While you can manually override a rule from `Log` to `Block`, consider the following before doing so:

* Rules in the testing phase have not yet been fully tuned for broad deployment. Overriding them to a mitigation action (like `Block`) may increase the risk of dropping legitimate traffic.
* The default action of a rule is decided during the testing period. Cloudflare may set its default action to **DDoS Dynamic**, which may use rate-limiting or a multi-step mitigation combination based on traffic factors. By applying a manual `Block` override, you prevent your configuration from automatically inheriting the more nuanced DDoS Dynamic action once it is released.

If you choose to override a testing rule to mitigate an active attack, Cloudflare recommends reviewing that override periodically to see if the rule has been promoted to a permanent default action.

## Availability

The Network-layer DDoS Attack Protection managed ruleset is available in all Cloudflare plans for:

* Zones [onboarded to Cloudflare](https://developers.cloudflare.com/dns/zone-setups/full-setup/) (zones with their traffic routed through the Cloudflare network)
* IP applications onboarded to [Spectrum](https://developers.cloudflare.com/spectrum/)
* IP prefixes onboarded to [Magic Transit](https://developers.cloudflare.com/magic-transit/)

However, only Magic Transit and Spectrum customers on an Enterprise plan can customize the managed ruleset.

## Related Cloudflare products

Magic Transit customers can configure the following additional products:

* Enable [Advanced TCP Protection](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/advanced-tcp-protection/) to detect and mitigate sophisticated out-of-state TCP attacks such as randomized and spoofed ACK floods or SYN and SYN-ACK floods.
* Create custom [Network Firewall](https://developers.cloudflare.com/cloudflare-network-firewall/) rules to block additional network-layer attacks.

Spectrum customers can use [IP Access](https://developers.cloudflare.com/waf/tools/ip-access-rules/) rules to block additional network-layer attacks.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/#page","headline":"Network-layer DDoS Attack Protection managed ruleset · Cloudflare DDoS Protection docs","description":"Pre-configured rules that detect and mitigate DDoS attacks at layers 3 and 4.","url":"https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ddos-protection/","name":"DDoS Protection"}},{"@type":"ListItem","position":3,"item":{"@id":"/ddos-protection/managed-rulesets/","name":"Managed rulesets"}},{"@type":"ListItem","position":4,"item":{"@id":"/ddos-protection/managed-rulesets/network/","name":"Network-layer DDoS Attack Protection"}}]}
```
