---
title: Directories
description: Directories in Email Security.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Directories

Directories are folders to store user data. Email security allows you to manage directories from the Cloudflare dashboard.

To add a directory:

1. Log in to [Cloudflare One ↗](https://one.dash.cloudflare.com/) \> **Email security**.
2. Select **Directories**.
3. Select **Add a directory** \> **Connect an integration**.
4. Select either **Google Workspace CASB + EMAIL** or **Microsoft CASB+EMAIL**.
5. Refer to [Enable Gmail BCC integration](https://developers.cloudflare.com/cloudflare-one/email-security/setup/post-delivery-deployment/bcc-journaling/bcc-setup/gmail-bcc-setup/enable-gmail-integration/#enable-gmail-bcc-integration) if you choose Google Workspace. Refer to [Enable Microsoft integration](https://developers.cloudflare.com/cloudflare-one/email-security/setup/post-delivery-deployment/api/m365-api/#enable-microsoft-integration) if you choose Microsoft 365.

To sync a directory:

1. Locate the directory you want to sync.
2. Select the three dots, then select **Sync now**.

Note

The **Auto sync** option is on by default. It is recommended to keep this option on at all times to ensure directories are always synchronized.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/email-security/directories/#page","headline":"Directories · Cloudflare One docs","description":"Directories in Email Security.","url":"https://developers.cloudflare.com/cloudflare-one/email-security/directories/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/email-security/","name":"Email security"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/email-security/directories/","name":"Directories"}}]}
```
