---
title: Manage domains
description: Add, edit, and manage domains protected by Email Security.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Manage domains

Once you have deployed your domain, Email security allows you to add, filter and edit domains. You can also choose to stop a domain from being scanned.

## Add domains

To protect a new domain:

1. Log in to [Cloudflare One ↗](https://one.dash.cloudflare.com) \> Email security.
2. Select **Settings**, go to **Domains** and select **View**.
3. Select **Add a domain**.

## Filter domains

To filter your domains:

1. Log in to [Cloudflare One ↗](https://one.dash.cloudflare.com/) \> **Email security**.
2. Go to **Settings** \> **Domain management** \> **Domains**, then select **View**.
3. Select **Show filters** \> **Configured method**. Choose among the following filters: - **MS Graph API**: To view domains connected via MS Graph API. - **BCC/Journaling**: To view domains connected via BCC/Journaling. - **MX/Inline**: To view domains connected via MX/Inline. - **Retro Scan**: To view domains scanned by Retro Scan.
4. Select **Apply filters**.

## Edit domains

To edit your domains:

1. Log in to [Cloudflare One ↗](https://one.dash.cloudflare.com/) \> **Email security**.
2. Go to **Settings** \> **Domain management** \> **Domains**, then select **View**.
3. On the **Domains** page, locate your domain, select the three dots > **Edit**.
4. If you did not manually add your domain, you will only be able to edit **Hops**. If you manually added your domain, you will be able to edit **Domain name** and **Hops**.
5. Select **Save**.

## Prevent Cloudflare from scanning a domain

To stop scanning domains:

1. Log in to [Cloudflare One ↗](https://one.dash.cloudflare.com/) \> **Email security**.
2. Go to **Settings** \> **Domain management** \> **Domains**, then select **View**.
3. On the **Domains** page, locate your domain, select the three dots > **Stop scanning**.
4. Select **Stop scanning** again to stop Cloudflare from scanning your domain.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/email-security/setup/manage-domains/#page","headline":"Manage domains · Cloudflare One docs","description":"Add, edit, and manage domains protected by Email Security.","url":"https://developers.cloudflare.com/cloudflare-one/email-security/setup/manage-domains/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/email-security/","name":"Email security"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/email-security/setup/","name":"Before you begin"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/email-security/setup/manage-domains/","name":"Manage domains"}}]}
```
