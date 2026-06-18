---
title: Applications with integrated SSO
description: Manage applications with existing SSO integrations.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Applications with integrated SSO

Many organizations in the past few years have recognized the importance of source-of-truth identity and have directly integrated their SSO provider with their internal applications. The SSO provider is only aware of the internal domain on which the application exists (via the configured ACS URL), which means the user must be connected to the local network in order to access the application. This security architecture makes sense for a traditional network perimeter, but it presents challenges for Zero Trust adoption. In the clientless access model, the user's device has no concept of an internal corporate network, only the specific, scoped applications to which they have access. The problem is summarized in the following diagram:

flowchart LR
accTitle: Authorization flow with integrated SSO
A("User goes to
app.public.com")-->B("Cloudflare Tunnel
routes public hostname (app.public.com)
to internal domain (app.internal.com)")-->C("app.internal.com redirects
to integrated SSO")-->D("SSO ACS URL returns
app.internal.com")-->E("404 error
Device cannot resolve
app.internal.com")

## Potential solutions

If your applications use integrated SSO, there are a number of different paths you can take to onboard your applications to Cloudflare Access.

| Solution                                                                                                                                                    | Steps required                                                                                                                                       | Pros                                                                                                                                         | Cons                                                                                                |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| [Present applications exclusively on Cloudflare domains](#recommended-solution)                                                                             | Change SSO ACS URL to the Cloudflare Tunnel public hostname                                                                                          | Increased security posture  No changes to application code  No changes to internal DNS design                                                | Hard cutover event when ACS URL changes from internal to external domain                            |
| Present applications on existing internal domains with identical external domains delegated to Cloudflare                                                   | Add domains to Cloudflare that match internal domains                                                                                                | No changes to SSO ACS URL  No change for end users                                                                                           | Requires careful management of internal and external domains  Requires changing internal DNS design |
| [Consume the Cloudflare JWT in internal applications](https://developers.cloudflare.com/learning-paths/clientless-access/migrate-applications/consume-jwt/) | Remove integrated SSO  Update application to accept the Cloudflare JWT for user authorization                                                        | Reduced authentication burden for end users  No changes to internal DNS design  Instantly secure applications without direct SSO integration | Requires changing application code  Hard cutover event when application updates                     |
| Use Cloudflare as the direct SSO integration, which then calls your IdP of choice (Okta, OneLogin, etc.)                                                    | Swap existing SSO provider for [Access for SaaS](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/saas-apps/) | Increased flexibility for changing IdPs  Ability to use multiple IdPs simultaneously                                                         | Hard cutover event for IdP changes  No SCIM provisioning for application                            |

## Recommended solution

If you are able to configure your SSO provider, we recommend presenting all internal web services exclusively on Cloudflare domains. This is the model that Cloudflare takes for web application access internally and the most common method of resolution for customers in this scenario.

With this approach, you do not need to make any changes to your existing DNS infrastructure. Cloudflare Tunnel in your network will manage the translation from external (Cloudflare public) DNS to internal DNS, which is how the system is designed to function. After you update the ACS URL in your SSO provider to the Cloudflare public hostname, the outcome will look like this:

flowchart LR
accTitle: Authorization flow with updated SSO ACS URL
A("User goes to
app.public.com")-->B("Cloudflare Tunnel
routes public hostname (app.public.com)
to internal domain (app.internal.com)")-->C("app.internal.com redirects
to integrated SSO")-->D("SSO ACS URL returns
app.public.com")-->E("Browser displays app.public.com")

All users - whether in the office, remote, using or not using the VPN client - will always route through the Cloudflare Access authentication flow at `app.public.com` to access a private application. This provides a single control plane for policy application and security audits, and no additional user training is necessary.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/clientless-access/migrate-applications/integrated-sso/#page","headline":"Applications with integrated SSO · Cloudflare Learning Paths","description":"Manage applications with existing SSO integrations.","url":"https://developers.cloudflare.com/learning-paths/clientless-access/migrate-applications/integrated-sso/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["SSO"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/clientless-access/migrate-applications/","name":"Migrate applications"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/clientless-access/migrate-applications/integrated-sso/","name":"Applications with integrated SSO"}}]}
```
