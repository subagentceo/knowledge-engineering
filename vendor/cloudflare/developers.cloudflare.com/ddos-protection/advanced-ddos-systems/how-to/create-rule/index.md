---
title: Create a rule
description: Create an Advanced DDoS Protection rule for TCP, DNS, or flow-based mitigation.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Create a rule

## Create an Advanced DNS Protection rule

1. In the Cloudflare dashboard, go to the **L3/4 DDoS protection** page.  
[ Go to **DDoS Managed Rules** ](https://dash.cloudflare.com/?to=/:account/network-security/ddos)
2. Go to **Advanced Protection** \> **Advanced DNS Protection**.
3. Select **Create Advanced DNS Protection rule**.
4. In **Mode**, select a [mode](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/concepts/#mode) for the rule.
5. Under **Set scope**, select a [scope](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/concepts/#scope) to determine the range of packets that will be affected by the rule.
6. Under **Sensitivity**, define the [burst sensitivity](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/concepts/#burst-sensitivity), [rate sensitivity](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/concepts/#rate-sensitivity), and [profile sensitivity](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/concepts/#profile-sensitivity) to determine when to initiate mitigation. 9\. Select **Deploy**.

---

## Create an Advanced TCP Protection rule

To create a [SYN flood rule](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/advanced-tcp-protection/#syn-flood-protection) or an [out-of-state TCP](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/advanced-tcp-protection/#out-of-state-tcp-protection) rule:

1. In the Cloudflare dashboard, go to the **L3/4 DDoS protection** page.  
[ Go to **DDoS Managed Rules** ](https://dash.cloudflare.com/?to=/:account/network-security/ddos)
2. Go to **Advanced Protection** \> **Advanced TCP Protection**.
3. Depending on the rule you are creating, do one of the following:  
   * Under **SYN Flood Protection**, select **Create SYN flood rule**.  
   * Under **Out-of-state TCP Protection**, select **Create out-of-state TCP rule**.
4. In **Mode**, select a [mode](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/concepts/#mode) for the rule.
5. Under **Set scope**, select a [scope](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/concepts/#scope) for the rule. If you choose to apply the rule to a subset of incoming packets, select a region or a data center.
6. Under **Sensitivity**, define the [burst sensitivity](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/concepts/#burst-sensitivity) and [rate sensitivity](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/concepts/#rate-sensitivity) of the rule (by default, _Medium_). The sensitivity levels are based on the initially configured thresholds for your specific case.
7. Select **Deploy**.

Note

Filters take precedence over rules. For details on how the execution mode is determined, refer to [Determining the execution mode](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/concepts/#determining-the-execution-mode).

---

## Create a Programmable Flow Protection rule

To create a [Programmable Flow Protection rule](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/overview/programmable-flow-protection):

1. In the Cloudflare dashboard, go to the **L3/4 DDoS protection** page.  
[ Go to **DDoS Managed Rules** ](https://dash.cloudflare.com/?to=/:account/network-security/ddos)
2. Go to **Advanced Protection** \> **Programmable Flow Protection**.
3. In **General Settings**, select a program. The chosen program must have a status of `success`, indicating it has successfully compiled and passed verification. This field is required.
4. In **General Settings**, select a [mode](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/concepts/#mode) for the rule. This field is required.
5. Under **Set scope**, optionally select a [scope](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/concepts/#scope) for the rule. If you choose to apply the rule to a subset of incoming packets, select a region or a data center. The default scope setting is global.
6. Under **Set scope**, optionally select a packet filter expression. If you choose to apply a rule to a subset of incoming packets, select the IP and UDP characteristics to filter on. The default setting applies a rule to all UDP packets.
7. Select **Deploy**.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/how-to/create-rule/#page","headline":"Create an Advanced DDoS Protection rule · Cloudflare DDoS Protection docs","description":"Create an Advanced DDoS Protection rule for TCP, DNS, or flow-based mitigation.","url":"https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/how-to/create-rule/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ddos-protection/","name":"DDoS Protection"}},{"@type":"ListItem","position":3,"item":{"@id":"/ddos-protection/advanced-ddos-systems/","name":"Advanced DDoS systems"}},{"@type":"ListItem","position":4,"item":{"@id":"/ddos-protection/advanced-ddos-systems/how-to/","name":"How to"}},{"@type":"ListItem","position":5,"item":{"@id":"/ddos-protection/advanced-ddos-systems/how-to/create-rule/","name":"Create a rule"}}]}
```
