---
title: Require purpose justification
description: Require purpose justification in Access.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Require purpose justification

Cloudflare Access allows security and IT teams to present users with a purpose justification screen directly after they log in to an Access application. This allows organizations to audit not only for who is accessing their resources, but also for why they are requesting access.

The purpose justification screen will show for any new sessions of an application. For example, if an Access application has a session time of eight hours, a user will see the purpose justification screen once every eight hours.

Configuring a purpose justification screen is done as part of configuring an Access policy.

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications**.
2. Choose an application and select **Configure**.
3. Go to **Policies**.
4. Choose an **Allow** policy and select **Configure**.
5. Under **Additional settings**, turn on **Purpose justification**.
6. (Optional) Set a custom purpose justification message. This will appear on the purpose justification screen and will be visible to the user.
7. Save the policy.

Users who match this policy will see the following screen:

![Finalized purpose justification screen displaying custom message.](https://developers.cloudflare.com/_astro/purpose-justification.Bgv25E7i_nwUeM.webp) 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/policies/require-purpose-justification/#page","headline":"Require purpose justification after login · Cloudflare One docs","description":"Require purpose justification in Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/policies/require-purpose-justification/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-30","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/policies/","name":"Policies"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/policies/require-purpose-justification/","name":"Require purpose justification"}}]}
```
