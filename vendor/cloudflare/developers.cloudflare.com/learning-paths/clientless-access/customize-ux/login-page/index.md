---
title: Login page
description: Customize the Access login page branding.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Login page

The Access login page is where users select their identity provider (IdP) or One-Time PIN prior to accessing the application. Customers who only use one IdP usually enable **Apply instant authentication** for their applications, which redirects end users directly to the SSO login page. If you are using multiple IdPs, we recommend customizing the Access login page to match your branding and minimize user confusion.

## Customize the login page

To change the appearance of your login page:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Reusable components** \> **Custom pages**.
2. Find the **Access login page** setting and select **Manage**.
3. Give the login page the look and feel of your organization by adding:  
   * Your organization's name  
   * A logo  
   * A custom header and footer  
   * A preferred background color  
Any changes you make will be reflected in real time in the **Preview** card.
4. Once you are satisfied with your customization, select **Save**.

The login page is now updated for all of your Access applications.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/clientless-access/customize-ux/login-page/#page","headline":"Login page · Cloudflare Learning Paths","description":"Customize the Access login page branding.","url":"https://developers.cloudflare.com/learning-paths/clientless-access/customize-ux/login-page/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-05-06","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/clientless-access/customize-ux/","name":"Customize the end user experience"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/clientless-access/customize-ux/login-page/","name":"Login page"}}]}
```
