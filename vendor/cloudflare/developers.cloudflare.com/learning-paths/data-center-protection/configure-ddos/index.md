---
title: Configure DDoS protection
description: Learn about configure ddos protection in this guide.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Configure DDoS protection

Cloudflare DDoS protection automatically detects and mitigates Distributed Denial of Service (DDoS) attacks using its Autonomous Edge. Magic Transit customers have access to additional features, such as:

* [Advanced TCP protection](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/advanced-tcp-protection/) (disabled by default)
* [Advanced DNS protection (beta)](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/advanced-dns-protection/)

## Create a DDoS override

1. In the Cloudflare dashboard, go to the **L3/4 DDoS protection** page.  
[ Go to **DDoS Managed Rules** ](https://dash.cloudflare.com/?to=/:account/network-security/ddos)
2. Go to **Network-layer DDoS Protection**.
3. Select **Deploy a DDoS override**.
4. In **Set scope**, specify if you wish to apply the override to all incoming packets or to a subset of the packets.
5. If you are creating an override for a subset of the incoming packets, define the [custom expression](https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/network-overrides/override-expressions/) that matches the incoming packets you wish to target in the override, using either the Rule Builder or the Expression Editor.
6. Select **Next**.
7. Depending on what you wish to override, refer to the following sections (you can perform both configurations on the same override):  
Configure all the rules in the ruleset (ruleset override)  
   1. Select **Next**.  
   2. Enter a name for your override in **Execution name**.  
   3. To always apply a given action for all the rules in the ruleset, select an action in **Ruleset action**.  
   4. To set the sensitivity level for all the rules in the ruleset, select a value in **Ruleset sensitivity**.  
Configure one or more rules  
   1. Search for the rules you wish to override using the available filters. You can search for tags.  
   2. To override a single rule, select the desired value for a field in the displayed dropdowns next to the rule.  
To configure more than one rule, select the rules using the row checkboxes and update the fields for the selected rules using the dropdowns displayed before the table. You can also configure all the rules with a given tag. For more information, refer to [Configure a managed ruleset](https://developers.cloudflare.com/waf/managed-rules/deploy-zone-dashboard/#configure-a-managed-ruleset). 14\. Select **Next**. 15\. Enter a name for your override in **Execution name**.  
Notes  
   * Tag and rule overrides have priority over ruleset overrides.  
   * The managed ruleset includes some read-only rules that you cannot override.
8. To save and deploy the override, select **Deploy**. If you are not ready to deploy your override, select **Save as Draft**.

## DDoS advanced protection

### Advanced TCP Protection

Cloudflare's Advanced TCP Protection, powered by [flowtrackd ↗](https://blog.cloudflare.com/announcing-flowtrackd/), is a stateful TCP inspection engine used to detect and mitigate sophisticated out-of-state TCP attacks such as randomized and spoofed ACK floods or SYN and SYN-ACK floods.

Note

Advanced TCP and DNS Protection systems are automatically enabled in `Monitor` mode with the default thresholds for new Magic Transit customers and their [authorized prefixes](https://developers.cloudflare.com/magic-transit/how-to/advertise-prefixes/).

Magic Transit customers can also enable the Advanced DDoS systems when the prefixes are ready, change the sensitivity level, or adjust the thresholds by contacting their account team.

#### Setup

[Create a global configuration](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/#rules) to set up SYN Flood and Out-of-state TCP rules and filters for Advanced TCP Protection.

### Advanced DNS Protection

Cloudflare's Advanced DNS Protection, powered by [flowtrackd ↗](https://blog.cloudflare.com/announcing-flowtrackd/), provides stateful protection against DNS-based DDoS attacks, specifically sophisticated and fully randomized DNS attacks such as [random prefix attacks](https://developers.cloudflare.com/dns/dns-firewall/random-prefix-attacks/about/).

Note

Advanced TCP and DNS Protection systems are automatically enabled in `Monitor` mode with the default thresholds for new Magic Transit customers and their [authorized prefixes](https://developers.cloudflare.com/magic-transit/how-to/advertise-prefixes/).

Magic Transit customers can also enable the Advanced DDoS systems when the prefixes are ready, change the sensitivity level, or adjust the thresholds by contacting their account team.

#### Setup

[Create a rule](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/how-to/create-rule/#create-an-advanced-dns-protection-rule) to enable Advanced DNS Protection.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/data-center-protection/configure-ddos/#page","headline":"Configure DDoS protection · Cloudflare Learning Paths","description":"Learn about configure ddos protection in this guide.","url":"https://developers.cloudflare.com/learning-paths/data-center-protection/configure-ddos/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/data-center-protection/configure-ddos/","name":"Configure DDoS protection"}}]}
```
