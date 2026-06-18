---
title: Authentication
description: Authenticate requests to the GraphQL Analytics API.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/analytics/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Authentication

Cloudflare separates service configuration by zone. When there are multiple accounts, each with many zones, it is important to restrict GraphQL Analytics API access to only those account and zone resources that are relevant for the task at hand.

To secure access to your GraphQL Analytics data, use a Cloudflare API key or token to authenticate an API request.

This table outlines the differences between Cloudflare API keys and tokens:

| Authentication Method                                                                      | Description                                                                                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [API Tokens](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) | Cloudflare recommends API Tokens as the preferred way to interact with Cloudflare APIs. You can configure the scope of tokens to limit access to account and zone resources, and you can define the Cloudflare APIs to which the token authorizes access. |
| [API Keys](https://developers.cloudflare.com/fundamentals/api/get-started/keys/)           | Unique to each Cloudflare user and used only for authentication. API keys do not authorize access to accounts or zones. Use the Global API Key for authentication.                                                                                        |

To create and configure GraphQL Analytics API tokens, refer to [Configure an Analytics API token](https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/api-token-auth/).

To find and retrieve API keys, as well as edit HTTP headers for authentication in GraphiQL, refer to [Authenticate with a Cloudflare API key](https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/api-key-auth/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/#page","headline":"Authentication · Cloudflare Analytics docs","description":"Authenticate requests to the GraphQL Analytics API.","url":"https://developers.cloudflare.com/analytics/graphql-api/getting-started/authentication/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/analytics/","name":"Analytics"}},{"@type":"ListItem","position":3,"item":{"@id":"/analytics/graphql-api/","name":"GraphQL Analytics API"}},{"@type":"ListItem","position":4,"item":{"@id":"/analytics/graphql-api/getting-started/","name":"Get started"}},{"@type":"ListItem","position":5,"item":{"@id":"/analytics/graphql-api/getting-started/authentication/","name":"Authentication"}}]}
```
