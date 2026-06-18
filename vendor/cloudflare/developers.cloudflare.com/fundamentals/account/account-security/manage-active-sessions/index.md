---
title: Manage active sessions
description: View and revoke active login sessions associated with your Cloudflare account to maintain account security.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Manage active sessions

In the Cloudflare dashboard, you can view a list of active sessions associated with your email address.

Each time your email is used to log in to your Cloudflare account, a session begins. The Cloudflare dashboard provides session information including if the device is currently viewing the dashboard, the IP address, location, device type, browser type, and last active login.

If you notice any suspicious activity, you can also revoke any active sessions.

Note

By default, the session timeout for the Cloudflare dashboard is 72 hours without any activity.

Some customers can also enforce single-sign on (SSO) by [adding a Dashboard SSO application](https://developers.cloudflare.com/fundamentals/manage-members/dashboard-sso/).

## View active sessions

To view the active sessions associated with your email address:

1. In the Cloudflare dashboard, go to the **Account home** page.  
[ Go to **Account home** ](https://dash.cloudflare.com/?to=/:account/home)
2. Go to **My Profile** \> **Sessions**.

## Revoke active sessions

When there is more than one active session associated with your email account, you can revoke any session that is not the current session.

To revoke a session:

1. Log in to the Cloudflare dashboard.  
[ Go to **Account home** ](https://dash.cloudflare.com/?to=/:account/home)
2. Go to **My Profile** \> **Sessions**.
3. On a specific section, click **Revoke**.
4. You will be prompted to enter your password before revoking the session.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/account/account-security/manage-active-sessions/#page","headline":"Manage active sessions · Cloudflare Fundamentals docs","description":"View and revoke active login sessions associated with your Cloudflare account to maintain account security.","url":"https://developers.cloudflare.com/fundamentals/account/account-security/manage-active-sessions/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/account/","name":"Accounts"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/account/account-security/","name":"Account security"}},{"@type":"ListItem","position":5,"item":{"@id":"/fundamentals/account/account-security/manage-active-sessions/","name":"Manage active sessions"}}]}
```
