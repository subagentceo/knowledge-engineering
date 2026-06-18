---
title: Authenticate without integrated SSO
description: Use Cloudflare JWT for application authentication.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Authenticate without integrated SSO

A common goal for many security organizations is to implement continuous authentication and authorization. With Cloudflare Access JWT validation, you can achieve this goal without introducing significant user interruption or requiring behavioral changes for your end users.

As discussed on the [previous page](https://developers.cloudflare.com/learning-paths/clientless-access/migrate-applications/integrated-sso/), some of your applications may currently rely on a direct SSO integration to authenticate requests. However, if you were to put this type of application behind Cloudflare to enable remote access, your user would need to authenticate twice. First, they must authenticate to your identity provider via Cloudflare Access. Once they have authenticated to Access, your user will reach the front door of your internal application, where they must complete a second authentication event via the direct SSO integration.

Instead of [managing a direct SSO integration](https://developers.cloudflare.com/learning-paths/clientless-access/migrate-applications/integrated-sso/) in your application, we recommend using the JSON Web Token (JWT) issued by Cloudflare Access to authenticate requests. Cloudflare becomes the primary responsible party for validating the token returned from your SSO provider. By allowing your applications to consume the Cloudflare JWT, users will only have a single authentication event required to access the application, and you can better manage authorization to your internal services with lower overhead.

## Consume the Cloudflare JWT

When Cloudflare sends a request to your application, the request will include a JWT signed with a key pair unique to your account. You can build a workflow in your application to [validate the Cloudflare Access JWT](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/validating-json/). This will give you stronger-than-HTML security for users who have authenticated to Cloudflare and will make your user login experience seamless.

The authorization flow is illustrated in the following diagram:

![ZTWA authorization flow with JWT validation](https://developers.cloudflare.com/_astro/access-jwt-flow.D4gusMDK_2dFSMh.webp) 

## Send authorization headers with Workers

When applications do not have integrated SSO, or any other method to deliver just-in-time (JIT) user provisioning or management, it is common to look for a way within Cloudflare to automatically pass user information into the private application. To best accomplish this, we recommend using Cloudflare Workers to send custom HTTP headers. As requests route through Cloudflare's network to your application, the Worker can insert headers into the request which contain the user's identity, device posture attributes, and other custom SAML/OIDC claims from the [Cloudflare Access JWT](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/application-token/).

Refer to [this tutorial](https://developers.cloudflare.com/cloudflare-one/tutorials/access-workers/) for setup details.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/clientless-access/migrate-applications/consume-jwt/#page","headline":"Authenticate without integrated SSO · Cloudflare Learning Paths","description":"Use Cloudflare JWT for application authentication.","url":"https://developers.cloudflare.com/learning-paths/clientless-access/migrate-applications/consume-jwt/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/clientless-access/migrate-applications/","name":"Migrate applications"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/clientless-access/migrate-applications/consume-jwt/","name":"Authenticate without integrated SSO"}}]}
```
