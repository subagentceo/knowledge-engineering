---
title: External Evaluation rules
description: Learn about external evaluation rules in this guide.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# External Evaluation rules

With Cloudflare Access, you can build infinitely customizable policies using External Evaluation rules. External Evaluation rules allow you to call any API during the evaluation of an Access policy and authenticate users based on custom business logic. Example use cases include:

* Customize policies based on time of day.
* Check IP addresses against external threat feeds.
* Call industry-specific user registries.

The External Evaluation rule requires two values: an API endpoint to call and a key to verify that any request response is coming from a trusted source. After the user authenticates with your identity provider, all information about the user, device and location is passed to your external API. The API returns a pass or fail response to Access which will then either allow or deny access to the user.

## Set up External Evaluation rule

For detailed setup instructions, refer to [External Evaluation rules](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/external-evaluation/).

Example code for the API is available in our [open-source repository ↗](https://github.com/cloudflare/workers-access-external-auth-example).

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/clientless-access/advanced-workflows/external-evaluation/#page","headline":"External Evaluation rules · Cloudflare Learning Paths","description":"Learn about external evaluation rules in this guide.","url":"https://developers.cloudflare.com/learning-paths/clientless-access/advanced-workflows/external-evaluation/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/clientless-access/advanced-workflows/","name":"Advanced workflows"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/clientless-access/advanced-workflows/external-evaluation/","name":"External Evaluation rules"}}]}
```
