---
title: Enable Magic user roles
description: You can determine which users have, or do not have, configuration edit access for Magic products.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Enable Magic user roles

You can determine which users have, or do not have, configuration edit access for Magic products, including Magic Transit, Cloudflare WAN (formerly Magic WAN), and Cloudflare Network Firewall.

For example, if multiple teams manage different Cloudflare products on the same account, you can provide select users with edit access and other users with read-only access.

## Assign permissions

1. Go to the **Members** page.  
[ Go to **Members** ](https://dash.cloudflare.com/?to=/:account/members)
2. Under **Members**, enter an existing user's name and select **Search**.
3. Expand the menu at the end of the user row.
4. From the list, locate **Network Services (Magic)**.
5. Select one of two options:  
   * **Network Services (Magic)** \- Enables users to view and edit Magic configurations.  
   * **Network Services (Magic, Read-Only)** \- Enables users to view but not modify Magic configurations.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/common-settings/enable-roles/#page","headline":"Enable Magic user roles · Cloudflare One docs","description":"You can determine which users have, or do not have, configuration edit access for Magic products.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/common-settings/enable-roles/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/","name":"Cloudflare WAN"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/","name":"Configuration"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/common-settings/","name":"Common settings"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/common-settings/enable-roles/","name":"Enable Magic user roles"}}]}
```
