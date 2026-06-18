---
title: Create a filter
description: Create a filter to define traffic characteristics for Advanced TCP Protection rules.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ddos-protection/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Create a filter

A filter modifies Advanced TCP Protection's [execution mode](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/concepts/#mode) — monitoring, mitigation (enabled), or disabled — for all incoming packets matching an expression.

Each protection system component (SYN flood protection or out-of-state TCP protection) should have at least one [rule](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/concepts/#rule), but filters are optional.

Note

Filters only apply to Advanced TCP Protection.

## Procedure

To create a [filter](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/concepts/#filter) for one of the system components:

1. In the Cloudflare dashboard, go to the **L3/4 DDoS protection** page.  
[ Go to **DDoS Managed Rules** ](https://dash.cloudflare.com/?to=/:account/network-security/ddos)
2. Go to **Advanced Protection** \> **Advanced TCP Protection**.
3. Under the system component for which you are creating the filter (**SYN Flood Protection** or **Out-of-state TCP Protection**), select **Create** next to the type of filter you want to create:  
   * **Mitigation Filter**: The protection system will drop packets matching the filter expression. - **Monitoring Filter**: The protection system will log packets matching the filter expression.  
   * **Off Filter**: The protection system will ignore packets matching the filter expression.
4. Under **When incoming packets match**, define a filter expression using the Expression Builder (specifying one or more values for **Field**, **Operator**, and **Value**), or manually enter an expression using the Expression Editor. For more information, refer to [Edit rule expressions](https://developers.cloudflare.com/ruleset-engine/rules-language/expressions/edit-expressions/).
5. Select **Save**.

Note

Filters take precedence over rules. For details on how the execution mode is determined, refer to [Determining the execution mode](https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/concepts/#determining-the-execution-mode).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/how-to/create-filter/#page","headline":"Create a filter for Advanced TCP Protection · Cloudflare DDoS Protection docs","description":"Create a filter to define traffic characteristics for Advanced TCP Protection rules.","url":"https://developers.cloudflare.com/ddos-protection/advanced-ddos-systems/how-to/create-filter/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ddos-protection/","name":"DDoS Protection"}},{"@type":"ListItem","position":3,"item":{"@id":"/ddos-protection/advanced-ddos-systems/","name":"Advanced DDoS systems"}},{"@type":"ListItem","position":4,"item":{"@id":"/ddos-protection/advanced-ddos-systems/how-to/","name":"How to"}},{"@type":"ListItem","position":5,"item":{"@id":"/ddos-protection/advanced-ddos-systems/how-to/create-filter/","name":"Create a filter"}}]}
```
