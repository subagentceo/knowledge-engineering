---
title: Overrides
description: Customize Network-layer DDoS Attack Protection rule actions and sensitivity levels.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Overrides

When Cloudflare's DDoS Protection systems detect an attack, an ephemeral mitigation rule is created and installed in-line to mitigate the attack. A mitigation rule is generated based on the logic of the DDoS Protection managed ruleset. Each mitigation rule is generated from a single managed rule.

All mitigations and its associated managed rules are evaluated in order by the DDoS systems one by one. Cloudflare will go through all of the rule overrides defined in the ruleset overrides until one matches the managed rule, and apply the action and stop at that point. Otherwise, the evaluation will continue in order until a rule matches.

You can create only one ruleset override that can contain one or multiple rule overrides.

Note

Enterprise customers with the [Advanced DDoS Protection](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/) add-on can create up to 10 ruleset overrides.

A rule override instructs the DDoS system on the action it should take against the attack according to its matching managed rule.

However, within a rule override, specificity matters and the DDoS system will choose the more specific configuration. A rule override takes precedence over the ruleset override.

## Example

A DDoS managed ruleset contains the following managed rules:

* **Managed rule 1**
* **Managed rule 2**
* **Managed rule 3**

The following ruleset overrides have been configured:

* **Ruleset override A**  
   * **Managed rule 1** is set to `block`
* **Ruleset override B**  
   * The action of the entire ruleset (or _all managed rules_) is set to `Managed Challenge`  
   * **Managed rule 1** is set to `log`  
   * **Managed rule 2** is set to `log`
* **Ruleset override C**  
   * **Managed rule 3** is set to `log`

### Use case

A DDoS attack was detected on **managed rules 1**, **2**, and **3**, and has generated a mitigation rule.

* Since **managed rule 1** matches **ruleset override A**, Cloudflare will `block` the attacks and not proceed with the rest of the rules.
* **Managed rule 2** does not match **ruleset override A**, so Cloudflare proceeds to **ruleset override B**.  
**Ruleset override B** matches both all managed rules and **managed rule 2**, but specificity takes precedence. It does not `challenge` and instead proceeds with `log` since it matches the most specific managed rule.
* **Managed rule 3** does not match **ruleset override A**, so Cloudflare proceeds to **rule override B**. Since **ruleset override B** sets _all managed rules_ to `challenge`, then Cloudflare does not proceed to **ruleset override C**.

An additional dimension to take into account is Cloudflare’s DDoS systems will apply a given rule override only if its conditions are met — which includes the Sensitivity level. So, while it needs to match and modify the correct managed rule (or everything in the case of all managed rules above), it also has to meet the specified Sensitivity level of the rule.

* **Rule override A**  
   * _All managed rules_ are set to `challenge` at low sensitivity
* **Rule override B**  
   * **Managed rule 1** is set to `log` at default sensitivity

You receive a small attack below the threshold for low sensitivity, but above the threshold for high sensitivity on **managed rule 1**.

* **Rule override A** does not meet the low sensitivity threshold. Therefore, we do not match the override and do not mitigate the attack, but proceed to evaluate the next managed rule in case the rule override instructs DoS to mitigate.
* **Rule override B** sets `log` at default visibility, which matches the condition. So, the defined action is applied and attack traffic is logged.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/network-overrides/#page","headline":"Network DDoS Attack Protection override rules · Cloudflare DDoS Protection docs","description":"Customize Network-layer DDoS Attack Protection rule actions and sensitivity levels.","url":"https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/network-overrides/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ddos-protection/","name":"DDoS Protection"}},{"@type":"ListItem","position":3,"item":{"@id":"/ddos-protection/managed-rulesets/","name":"Managed rulesets"}},{"@type":"ListItem","position":4,"item":{"@id":"/ddos-protection/managed-rulesets/network/","name":"Network-layer DDoS Attack Protection"}},{"@type":"ListItem","position":5,"item":{"@id":"/ddos-protection/managed-rulesets/network/network-overrides/","name":"Overrides"}}]}
```
