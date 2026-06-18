---
title: Override examples
description: Example override configurations for Network-layer DDoS Attack Protection rules.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Override examples

## Use cases

The following scenarios detail how you can make use of override rules as a solution to common Network DDoS Protection issues.

### VPN traffic is blocked by a UDP rule

If you have VPN traffic concentrated to a single or a few single destination IP addresses and the traffic is being blocked by a UDP rule, you can create an override rule for the UDP rule to the destination IPs or ranges.

Note

The override only applies to the detection and not the fingerprint generated and used for mitigation. Refer to [Important remarks](https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/network-overrides/override-expressions/#important-remarks) for more information.

### Attack traffic is flagged by the adaptive rule based on UDP and destination port

If you recognize that the traffic flagged by the adaptive rule based on UDP and destination port is an attack, you create an override rule to enable the adaptive rule in mitigation mode, setting the action to block the traffic.

### Minimize the risk of false positives impacting production traffic

To avoid disruptions during initial deployment, you can create a _Log_ only – _Essentially Off_ ruleset override that allows all traffic while logging detection results. This lets you safely observe and analyze DDoS activity before enabling enforcement.

1. In the Cloudflare dashboard, go to the **Security rules** page.  
[ Go to **Security rules** ](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. Go to the **DDoS protection** tab.
3. On **HTTP DDoS attack protection**, select **Create override**.
4. Set the **Scope** to _Apply to all incoming requests_.
5. Under **Ruleset configuration**:  
   * Set the **Ruleset action** to _Log_.  
   * Set the **Ruleset sensitivity** to _Essentially Off_.
6. Select **Save**.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/network-overrides/override-examples/#page","headline":"Override examples for Network-layer DDoS Attack Protection · Cloudflare DDoS Protection docs","description":"Example override configurations for Network-layer DDoS Attack Protection rules.","url":"https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/network-overrides/override-examples/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ddos-protection/","name":"DDoS Protection"}},{"@type":"ListItem","position":3,"item":{"@id":"/ddos-protection/managed-rulesets/","name":"Managed rulesets"}},{"@type":"ListItem","position":4,"item":{"@id":"/ddos-protection/managed-rulesets/network/","name":"Network-layer DDoS Attack Protection"}},{"@type":"ListItem","position":5,"item":{"@id":"/ddos-protection/managed-rulesets/network/network-overrides/","name":"Overrides"}},{"@type":"ListItem","position":6,"item":{"@id":"/ddos-protection/managed-rulesets/network/network-overrides/override-examples/","name":"Override examples"}}]}
```
