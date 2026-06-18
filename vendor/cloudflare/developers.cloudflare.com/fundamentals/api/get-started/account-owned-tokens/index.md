---
title: Account API tokens
description: Learn what account API tokens are, when to use them, and what they currently work with
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Account API tokens

While user tokens act on behalf of a particular user and inherit a subset of that user's permissions, account API tokens allow you to set up durable integrations that can act as service principals with their own specific set of permissions. This approach is ideal for scenarios like CI/CD, or building integrations with external services like SIEMs where it is important that the integration continues working, even long after the user who configured the integration may have left your organization altogether. User tokens are better for ad hoc tasks like scripting, where acting as the user is ideal and durability is less of a concern.

New account API tokens use the `cfat_` prefixed [scannable format](https://developers.cloudflare.com/fundamentals/api/get-started/token-formats/), which allows credential scanning tools to detect leaked tokens.

## Create an account owned token

Note

Creating an account owned token requires Super Administrator permission on the account

1. Log into the [Cloudflare dashboard ↗](https://dash.cloudflare.com).
2. Go to **Manage Account** \> **Account API Tokens**.
3. Select **Create Token** and fill in the token name, permissions, and the optional expiration date for the token.
4. Select **Continue to summary** and review the details.
5. Select **Create Token**.

Alternatively, you can create a token using the [account API token creation API](https://developers.cloudflare.com/api/resources/accounts/subresources/tokens/methods/create/).

Refer to the [blog post ↗](https://blog.cloudflare.com/account-owned-tokens-automated-actions-zaraz/) for more information.

## Compatibility matrix

Account API tokens are generally available for all accounts. Some services may not support account API tokens yet. Refer to the compatibility matrix below for the latest status.

| Product                                     | Compatibility |
| ------------------------------------------- | ------------- |
| Access                                      | ✅             |
| Account Analytics                           | ✅             |
| Account Management                          | ✅             |
| AI Gateway                                  | ✅             |
| API Shield                                  | ✅             |
| Argo                                        | ✅             |
| Billing                                     | ✅             |
| Browser Run                                 | ✅             |
| Bulk Redirects                              | ✅             |
| Cache                                       | ✅             |
| Tiered Cache                                | ✅             |
| Client-side security (formerly Page Shield) | ✅             |
| Cloud Connector                             | ✅             |
| Configuration Rules                         | ✅             |
| Custom Lists                                | ✅             |
| Custom Pages                                | ✅             |
| D1                                          | ✅             |
| Data Loss Prevention                        | ✅             |
| Digital Experience Monitoring               | ✅             |
| Distributed Web                             | ✅             |
| DNS                                         | ✅             |
| Durable Objects                             | ✅             |
| Email Relay                                 | ✅             |
| Secure Web Gateway                          | ✅             |
| Healthchecks                                | ✅             |
| Hyperdrive                                  | ✅             |
| Images                                      | ✅             |
| Intel Data Platform                         | ❌             |
| Load Balancing                              | ✅             |
| Log Explorer                                | ✅             |
| Network Flow                                | ✅             |
| Magic Transit                               | ✅             |
| Cloudflare WAN                              | ✅             |
| Managed Rules                               | ✅             |
| Network Error Logging                       | ✅             |
| Page Rules                                  | ❌             |
| Pages                                       | ✅             |
| R2                                          | ✅             |
| Radar                                       | ✅             |
| Registrar                                   | ❌             |
| Rulesets                                    | ✅             |
| Spectrum                                    | ✅             |
| Speed                                       | ✅             |
| SSL/TLS                                     | ✅             |
| Stream                                      | ✅             |
| Super Bot Fight Mode                        | ❌             |
| Trace                                       | ✅             |
| Tunnels                                     | ✅             |
| Turnstile                                   | ❌             |
| Vectorize                                   | ✅             |
| Waiting Room                                | ✅             |
| Workers                                     | ✅             |
| Workers AI                                  | ✅             |
| Workers KV                                  | ✅             |
| Workers Observability                       | ✅             |
| Workers Queues                              | ✅             |
| Workflows                                   | ✅             |
| Zaraz                                       | ✅             |
| Zero Trust Client Platform                  | ❌             |
| Zero Trust Devices and Services             | ✅             |
| Zone/Domain Management                      | ✅             |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/api/get-started/account-owned-tokens/#page","headline":"Account API tokens · Cloudflare Fundamentals docs","description":"Learn what account API tokens are, when to use them, and what they currently work with","url":"https://developers.cloudflare.com/fundamentals/api/get-started/account-owned-tokens/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/api/","name":"Cloudflare's API"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/api/get-started/","name":"Get started"}},{"@type":"ListItem","position":5,"item":{"@id":"/fundamentals/api/get-started/account-owned-tokens/","name":"Account API tokens"}}]}
```
