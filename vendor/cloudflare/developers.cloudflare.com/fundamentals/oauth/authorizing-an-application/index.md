---
title: Authorizing an application
description: Learn more about what it means to authorize a third-party application on Cloudflare
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Authorizing an application

## Overview

When you authorize a third-party OAuth application, you grant it permission to access specific Cloudflare resources on your behalf. Cloudflare provides tools to view, manage, and revoke these authorizations at any time.

## Authorize a third-party application

When a third-party application requests access to your Cloudflare account, you will see a consent screen that displays:

* **Application name and logo**: The name and branding of the requesting application
* **Publisher domain**: The verified domain of the application publisher
* **Account selection**: Choose which Cloudflare account(s) the application can access
* **Requested permissions**: After selecting the account(s) the application may access, the specific scopes the application is requesting will be displayed before consent is complete. To finish the authorization process, review the permissions the application is requesting and click “**Authorize**”

## View and revoke authorized applications

Application authorizations may be viewed and revoked at any time from the profile page on the Cloudflare dashboard.

1. Log in to the Cloudflare dashboard.
2. [ Go to **Manage OAuth authorizations** ](https://dash.cloudflare.com/?to=/profile/access-management/authorization)
3. View the list of applications you have authorized.  
   * If you wish to revoke access to an application, click the “Revoke” button for that row

## Account administrator controls

If an account is not available for selection during the consent flow, it may be due to an administrator of that account disabling access to account resources via OAuth.

Account administrators can restrict OAuth applications from accessing account resources via **Manage Account** \> **Members > Settings > Public OAuth App access**.

Warning

This will not prevent existing authorizations account members may already have in place, and will only prevent new authorizations from accessing account resources.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/oauth/authorizing-an-application/#page","headline":"Authorizing an application · Cloudflare Fundamentals docs","description":"Learn more about what it means to authorize a third-party application on Cloudflare","url":"https://developers.cloudflare.com/fundamentals/oauth/authorizing-an-application/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/oauth/","name":"OAuth Applications on Cloudflare"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/oauth/authorizing-an-application/","name":"Authorizing an application"}}]}
```
