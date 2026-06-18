---
title: Parameters
description: Configurable parameters for Network-layer DDoS Attack Protection rule overrides.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Parameters

Define overrides for the Network-layer DDoS Attack Protection managed ruleset to change the action applied to a given attack or modify the sensitivity level of the detection mechanism. You can [define overrides in the Cloudflare dashboard](https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/network-overrides/configure-dashboard/) or [define overrides via Rulesets API](https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/network-overrides/configure-api/).

The available parameters are the following:

* Action
* Sensitivity Level

## Action

API property name: `"action"`.

The action performed for packets that match specific rules of Cloudflare's DDoS mitigation services. The available actions are:

* **Log**  
   * API value: `"log"`.  
   * Only available on Enterprise plans. Logs requests that match the expression of a rule detecting network layer DDoS attacks. Recommended for validating a rule before committing to a more severe action.  
   Refer to the [Analytics documentation](https://developers.cloudflare.com/analytics/network-analytics/configure/displayed-data/#view-logged-or-monitored-traffic) for more information on how to view logged or monitored traffic.
* **Block**  
   * API value: `"block"`.  
   * Blocks IP packets that match the rule expression given the sensitivity levels.
* **DDoS Dynamic**  
   * API value: _N/A_ (internal rule action that you cannot use in overrides).  
   * Performs a specific action according to a set of internal guidelines defined by Cloudflare. The executed action can be _Block_ or an undisclosed mitigation action.

## Sensitivity Level

API property name: `"sensitivity_level"`.

Defines how sensitive a rule is. Affects the thresholds used to determine if an attack should be mitigated. A higher sensitivity level means having a lower threshold, while a lower sensitivity level means having a higher threshold.

The available sensitivity levels are:

| UI value          | API value |
| ----------------- | --------- |
| _High_            | "default" |
| _Medium_          | "medium"  |
| _Low_             | "low"     |
| _Essentially Off_ | "eoff"    |

The default sensitivity level is _High_.

In most cases, when you select the _Essentially Off_ sensitivity level the rule will not trigger for any of the selected actions, including _Log_. However, if the attack is extremely large, Cloudflare's protection systems will still trigger the rule's mitigation action to protect Cloudflare's network.

_Essentially Off_ means that we have set an exceptionally low sensitivity level so in most cases traffic will not be mitigated for you. However, attack traffic will be mitigated at exceptional levels to ensure the safety and stability of the Cloudflare network.

**Log** means that requests will not be mitigated but only logged and shown on the dashboard. However, attack traffic will be mitigated at exceptional levels to ensure the safety and stability of the Cloudflare network.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/override-parameters/#page","headline":"Network-layer DDoS Attack Protection parameters · Cloudflare DDoS Protection docs","description":"Configurable parameters for Network-layer DDoS Attack Protection rule overrides.","url":"https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/override-parameters/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ddos-protection/","name":"DDoS Protection"}},{"@type":"ListItem","position":3,"item":{"@id":"/ddos-protection/managed-rulesets/","name":"Managed rulesets"}},{"@type":"ListItem","position":4,"item":{"@id":"/ddos-protection/managed-rulesets/network/","name":"Network-layer DDoS Attack Protection"}},{"@type":"ListItem","position":5,"item":{"@id":"/ddos-protection/managed-rulesets/network/override-parameters/","name":"Parameters"}}]}
```
