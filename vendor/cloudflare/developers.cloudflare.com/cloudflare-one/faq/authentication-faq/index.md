---
title: Identity FAQ
description: Review frequently asked questions about identity and identity providers in Cloudflare Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Identity FAQ

[❮ Back to FAQ](https://developers.cloudflare.com/cloudflare-one/faq/)

## Can Access work with multiple identity providers at the same time?

Yes. Your team can simultaneously use multiple providers, reducing friction when working with partners or contractors. Get started by adding your preferred identity providers as login methods in Zero Trust. Then, when securing a new application behind Access, you'll be able to choose which providers you want your users to log in with to reach that application.

## What if the identity provider my team uses is not listed?

You can add your preferred identity providers to Cloudflare Access even if you do not see them listed in Zero Trust, as long as these providers support SAML 2.0 or [OpenID Connect (OIDC)](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/generic-oidc/).

## How do end users log out of an application protected by Access?

Access provides a URL that will end a user's current session.

To force log out of an Access application, go to:

`<your-application-domain>/cdn-cgi/access/logout`

To log out of an App Launcher session, go to:

`<your-team-name>.cloudflareaccess.com/cdn-cgi/access/logout`

For more information, refer to our [session management page](https://developers.cloudflare.com/cloudflare-one/access-controls/access-settings/session-management/#log-out-as-a-user).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/faq/authentication-faq/#page","headline":"Identity FAQ · Cloudflare One docs","description":"Review frequently asked questions about identity and identity providers in Cloudflare Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/faq/authentication-faq/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SAML","SSO"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/faq/","name":"FAQ"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/faq/authentication-faq/","name":"Identity FAQ"}}]}
```
