---
title: Get Origin CA keys
description: Retrieve or change your Cloudflare Origin CA key used to authenticate Origin CA certificate API requests.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Get Origin CA keys

Deprecated

Origin CA keys (Service Keys) are deprecated and will be removed on September 30, 2026\. Use an [API Token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with `Zone`\-`SSL and Certificates`\-`Edit` permissions instead. For more information, refer to [API deprecations](https://developers.cloudflare.com/fundamentals/api/reference/deprecations/).

Origin CA keys are often used as the value of header `X-AUTH-USER-SERVICE-KEY` when interacting with [Origin CA certificates](https://developers.cloudflare.com/ssl/origin-configuration/origin-ca/) API. It is also used by [Keyless SSL](https://developers.cloudflare.com/ssl/keyless-ssl/) key server.

The key value always starts with `v1.0-`.

## Limitations

* Changing the Origin CA key is not recorded by [Audit Logs](https://developers.cloudflare.com/fundamentals/account/account-security/review-audit-logs/).
* Each time you view the Origin CA key, it will be presented as a different value. All these different values are **simultaneously valid** until you click the `Change` button, which immediately invalidates all previously generated values.
* Origin CA keys have access to every account the user has access to.

## View/Change your Origin CA keys

To retrieve your Origin CA keys:

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com).  
[ Go to **Account home** ](https://dash.cloudflare.com/?to=/:account/home)
2. Go to **User Profile** \> **API Tokens**.
3. In the **API Keys** section, select `Origin CA Key`.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/api/get-started/ca-keys/#page","headline":"Get Origin CA keys · Cloudflare Fundamentals docs","description":"Retrieve or change your Cloudflare Origin CA key used to authenticate Origin CA certificate API requests.","url":"https://developers.cloudflare.com/fundamentals/api/get-started/ca-keys/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/api/","name":"Cloudflare's API"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/api/get-started/","name":"Get started"}},{"@type":"ListItem","position":5,"item":{"@id":"/fundamentals/api/get-started/ca-keys/","name":"Get Origin CA keys"}}]}
```
