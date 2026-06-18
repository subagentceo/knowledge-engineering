---
title: Private network applications (legacy)
description: Private network applications (legacy) in Access.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Private network applications (legacy)

Warning

The Private Network application type can no longer be created from the dashboard. If you do not already have a legacy private network application, use a [self-hosted application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/self-hosted-private-app/) to secure a private IP address instead.

Existing **Private Network** applications continue to function and can still be managed. These applications were originally configured with the following steps:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Access controls** \> **Applications** \> **Add an application**.
2. Select **Private Network**.
3. Name your application.
4. For **Application type**, select _Destination IP_.
5. For **Value**, enter the IP address for your application (for example, `10.128.0.7`).  
Note  
If you would like to create a policy for an IP/CIDR range instead of a specific IP address, you can build a [Gateway Network policy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/) using the **Destination IP** selector.
6. Configure your [App Launcher](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/app-launcher/) visibility and logo.
7. Select **Next**. You will see two auto-generated Gateway Network policies: one that allows access to the destination IP and another that blocks access.
8. Modify the policies to include additional identity-based conditions. For example:  
   * **Policy 1**  
   | Selector       | Operator      | Value           | Logic | Action |  
   | -------------- | ------------- | --------------- | ----- | ------ |  
   | Destination IP | in            | 10.128.0.7      | And   | Allow  |  
   | User Email     | matches regex | .\*@example.com |       |        |  
   * **Policy 2**  
   | Selector       | Operator | Value      | Action |  
   | -------------- | -------- | ---------- | ------ |  
   | Destination IP | in       | 10.128.0.7 | Block  |  
Policies are evaluated in [numerical order](https://developers.cloudflare.com/cloudflare-one/traffic-policies/order-of-enforcement/#order-of-precedence), so a user with an email ending in @example.com will be able to access `10.128.0.7` while all others will be blocked. For more information on building network policies, refer to our [dedicated documentation](https://developers.cloudflare.com/cloudflare-one/traffic-policies/network-policies/).
9. Select **Add application**.

Your application will appear on the **Applications** page.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/legacy-private-network-app/#page","headline":"Private network applications (legacy) · Cloudflare One docs","description":"Private network applications (legacy) in Access.","url":"https://developers.cloudflare.com/cloudflare-one/access-controls/applications/non-http/legacy-private-network-app/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Private networks"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/access-controls/","name":"Access controls"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/access-controls/applications/","name":"Applications"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/access-controls/applications/non-http/","name":"Non-HTTP applications"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/access-controls/applications/non-http/legacy-private-network-app/","name":"Private network applications (legacy)"}}]}
```
