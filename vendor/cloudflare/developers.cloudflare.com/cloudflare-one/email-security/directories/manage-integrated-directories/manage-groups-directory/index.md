---
title: Manage groups in your directory
description: Manage groups in your directory in Email Security.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Manage groups in your directory

Email security allows you to view and manage your groups directory and their [impersonation registry](https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/impersonation-registry/). When a group is added to the registry, all members are registered by default.

To manage a group directory:

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Email security** \> **Directories**.
2. Locate your directory, select the three dots > **View details**.
3. Select **Groups**.

## Add groups to registry

Email security allows you to add group names to the registry.

To add a single group to the registry:

1. Select the group name you want to add.
2. Select the three dots > **Add to registry**.

To add multiple groups to the registry at once:

1. Select the group names you want to add to the registry.
2. Select the **Action** dropdown list.
3. Select **Add to registry**.

## Remove groups from registry

Email security allows you to remove group names from the registry.

To remove a single group from the registry:

1. Select the group name you want to remove.
2. Select the three dots > **Remove from registry**.

To remove multiple groups from the registry at once:

1. Select the group names you want to remove from registry.
2. Select the **Action** dropdown list.
3. Select **Remove from registry**.

## Filter impersonation registry

You can filter the list of group names by registered and unregistered.

A group name is registered when it is part of the [impersonation registry](https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/impersonation-registry/). A group name is unregistered when they are not part of the impersonation registry.

To filter the list:

1. Select **Show filters** \> **Impersonation registry**.
2. Select one of the following:  
   * **All**: To view registered and unregistered groups.  
   * **Registered**: To view registered groups.  
   * **Unregistered**: To view unregistered groups.
3. Select **Apply filters**.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/email-security/directories/manage-integrated-directories/manage-groups-directory/#page","headline":"Manage groups in your directory · Cloudflare One docs","description":"Manage groups in your directory in Email Security.","url":"https://developers.cloudflare.com/cloudflare-one/email-security/directories/manage-integrated-directories/manage-groups-directory/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/email-security/","name":"Email security"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/email-security/directories/","name":"Directories"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/email-security/directories/manage-integrated-directories/","name":"Manage integrated directories"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/email-security/directories/manage-integrated-directories/manage-groups-directory/","name":"Manage groups in your directory"}}]}
```
