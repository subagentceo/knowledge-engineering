---
title: Get started
description: Set up and fine-tune DDoS protection for your zones, Spectrum apps, and Magic Transit prefixes.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Get started

## Free, Pro, and Business plans

The DDoS Attack Protection managed rulesets provided by Cloudflare are enabled by default on zones onboarded to Cloudflare, IP applications onboarded to Spectrum, and IP Prefixes onboarded to Magic Transit.

In some situations, the default protection offered by DDoS rules may need to be fine-tuned to your specific situation. You may also want to configure additional protection using other Cloudflare products.

### Adjust the provided DDoS rules

If one or more DDoS rules provided by Cloudflare affects legitimate traffic, you can adjust them so that they do not perform any mitigation action against this kind of traffic. Follow the steps in [handling a false positive](https://developers.cloudflare.com/ddos-protection/managed-rulesets/http/http-overrides/override-examples/#legitimate-traffic-is-incorrectly-identified-as-an-attack-and-causes-a-false-positive) to reduce the sensitivity level of one or more DDoS rules and allow incoming legitimate traffic.

### Configure additional protection

To configure additional protection against DDoS attacks, refer to the related Cloudflare products listed in [Network-layer DDoS Attack Protection](https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/#related-cloudflare-products) and [HTTP DDoS Attack Protection](https://developers.cloudflare.com/ddos-protection/managed-rulesets/http/#related-cloudflare-products).

## Enterprise plan

Cloudflare's DDoS protection systems automatically detect and mitigate DDoS attacks. Additionally, the systems may flag suspiciously-looking incoming traffic from legacy applications, Internet services, or faulty client applications as malicious and apply mitigation actions. If the traffic is in fact legitimate, the mitigation actions can cause service disruptions and outages in your Internet properties.

To prevent this situation, Cloudflare recommends that you perform these steps to get started:

1. Set the ruleset actions for all the [DDoS Attack Protection managed rulesets](https://developers.cloudflare.com/ddos-protection/managed-rulesets/) to _Log_.
2. Analyze the flagged traffic.
3. Adjust the sensitivity or action of individual managed ruleset rules, if required.
4. Switch ruleset actions from _Log_ back to the default.

### Prerequisites

You must have one of the following:

* [A zone onboarded to Cloudflare](https://developers.cloudflare.com/dns/zone-setups/full-setup/) but without updated DNS records.
* [An IP application onboarded to Spectrum](https://developers.cloudflare.com/spectrum/get-started/).
* [An IP Prefix onboarded to Magic Transit](https://developers.cloudflare.com/magic-transit/get-started/).

### 1\. Configure ruleset actions to Log

Note

The _Log_ action is only available to Enterprise customers.

1. [Configure all the rules in the HTTP DDoS Attack Protection managed ruleset](https://developers.cloudflare.com/ddos-protection/managed-rulesets/http/http-overrides/configure-dashboard/#access), setting their action to _Log_.
2. [Configure all the rules in the Network-layer DDoS Attack Protection managed ruleset](https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/network-overrides/configure-dashboard/#create-a-ddos-override), setting the action to _Log_.

Alternatively, if you are using the API, define an override at the ruleset level to set the action of all managed ruleset rules to `log` by following these instructions:

* [Configure an override for the HTTP DDoS Attack Protection managed ruleset](https://developers.cloudflare.com/ddos-protection/managed-rulesets/http/http-overrides/configure-api/#configure-an-override-for-the-http-ddos-attack-protection-managed-ruleset)
* [Configure an override for the Network-layer DDoS Attack Protection managed ruleset](https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/network-overrides/configure-api/#configure-an-override-for-the-network-layer-ddos-attack-protection-managed-ruleset)

### 2\. Review flagged traffic

1. Go to your [analytics dashboard](https://developers.cloudflare.com/ddos-protection/reference/analytics/) (the exact dashboard depends on your Cloudflare services).
2. Apply one or more filters, if required, and identify any rules that would have blocked legitimate traffic if _Log_ mode were disabled. Take note of the rule IDs.

### 3\. Customize managed ruleset rules

Customize the specific managed ruleset rules you identified, changing their sensitivity or their action, using the Cloudflare dashboard or using the API.

If you are using the Cloudflare dashboard, refer to:

* [Configure HTTP DDoS Attack Protection in the dashboard](https://developers.cloudflare.com/ddos-protection/managed-rulesets/http/http-overrides/configure-dashboard/)
* [Configure Network-layer DDoS Attack Protection in the dashboard](https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/network-overrides/configure-dashboard/)

If you are using the API, refer to:

* [Configure HTTP DDoS Attack Protection via API](https://developers.cloudflare.com/ddos-protection/managed-rulesets/http/http-overrides/configure-api/)
* [Configure Network-layer DDoS Attack Protection via API](https://developers.cloudflare.com/ddos-protection/managed-rulesets/network/network-overrides/configure-api/)

When using the API, ensure that you add any required rule overrides without removing the ruleset override you configured in [Step 1](#1-configure-ruleset-actions-to-log).

### 4\. Switch ruleset actions back to the default

Revert the change you did in [Step 1](#1-configure-ruleset-actions-to-log), changing the action of each managed ruleset rule back to _Default_ in **Ruleset action**.

Alternatively, if you are using the API, [remove the override](https://developers.cloudflare.com/ddos-protection/managed-rulesets/http/http-overrides/configure-api/#configure-an-override-for-the-http-ddos-attack-protection-managed-ruleset) you previously configured at the ruleset level for each managed ruleset. Ensure that you only remove the ruleset override and not any of the rule overrides you may have configured in [Step 3](#3-customize-managed-ruleset-rules).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/get-started/#page","headline":"Get started · Cloudflare DDoS Protection docs","description":"Set up and fine-tune DDoS protection for your zones, Spectrum apps, and Magic Transit prefixes.","url":"https://developers.cloudflare.com/ddos-protection/get-started/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ddos-protection/","name":"DDoS Protection"}},{"@type":"ListItem","position":3,"item":{"@id":"/ddos-protection/get-started/","name":"Get started"}}]}
```
