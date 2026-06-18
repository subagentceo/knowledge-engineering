---
title: Manage your active directory
description: Sync and manage email directory users.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Manage your active directory

Directories are folders to store user data. Email security allows you to manage directories from the Cloudflare dashboard.

### Manage your Microsoft 365 directory

To manage your Microsoft 365 directory:

1. Log in to [Zero Trust  ↗](https://one.dash.cloudflare.com/).
2. Select **Email security**.
3. Select **Directories**.
4. Under **Directory name**, select **MS directory**.
5. From here, you can manage **Groups** or **Users** directories.

### Manage your Google Workspace directory

To manage your Google Workspace Directory:

1. Log in to [Zero Trust  ↗](https://one.dash.cloudflare.com/).
2. Select **Email security**.
3. Select **Directories**.
4. Under **Directory name**, select **Google Workspace Directory**.
5. From here, you can manage **Groups** or **Users** directories.

Email security allows you to view and manage your groups directory and their [impersonation registry](https://developers.cloudflare.com/cloudflare-one/email-security/settings/detection-settings/impersonation-registry/). When a group is added to the registry, all members are registered by default.

To manage your group directory, select your directory, then select the **Groups** tab.

To add a single group to the registry:

1. Select the group name you want to add.
2. Select the three dots > **Add to registry**.

To add multiple groups to the registry at once:

1. Select the group names you want to add to the registry.
2. Select the **Action** dropdown list.
3. Select **Add to registry**.

In addition, Email security allows you to:

* [Remove groups from the registry](https://developers.cloudflare.com/cloudflare-one/email-security/directories/manage-integrated-directories/manage-groups-directory/#remove-groups-from-registry).
* [Filter the impersonation registry](https://developers.cloudflare.com/cloudflare-one/email-security/directories/manage-integrated-directories/manage-groups-directory/#filter-impersonation-registry).
* [Manage users in your directory](https://developers.cloudflare.com/cloudflare-one/email-security/directories/manage-integrated-directories/manage-users-directory/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/secure-your-email/configure-email-security/active-directory-sync/#page","headline":"Manage your active directory · Cloudflare Learning Paths","description":"Sync and manage email directory users.","url":"https://developers.cloudflare.com/learning-paths/secure-your-email/configure-email-security/active-directory-sync/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/secure-your-email/configure-email-security/","name":"Configure Email security"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/secure-your-email/configure-email-security/active-directory-sync/","name":"Manage your active directory"}}]}
```
