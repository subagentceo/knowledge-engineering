---
title: Cloudflare Flagship
description: Ship features safely with Flagship, Cloudflare's feature flag service for controlling feature visibility without redeploying code.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/flagship/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cloudflare Flagship

Ship features safely with feature flags.

Flagship is Cloudflare's feature flag service. It lets you control feature visibility in your applications without redeploying code. Define flags with targeting rules and percentage-based rollouts, then evaluate them directly inside your Workers through a [native binding](https://developers.cloudflare.com/flagship/binding/).

[OpenFeature ↗](https://openfeature.dev/) is the CNCF open standard for feature flag management. Flagship is compatible with OpenFeature, so you can use the [@cloudflare/flagship ↗](https://www.npmjs.com/package/@cloudflare/flagship) SDK from any JavaScript runtime — Workers, Node.js, or the browser — and swap providers without changing evaluation code.

Check out the [Get started guide](https://developers.cloudflare.com/flagship/get-started/) to create your first feature flag.

## Features

###  Worker binding 

Evaluate flags with a native Workers binding. Type-safe methods with automatic fallback to defaults.

[ Binding reference ](https://developers.cloudflare.com/flagship/binding/) 

###  OpenFeature SDK 

Use the [@cloudflare/flagship ↗](https://www.npmjs.com/package/@cloudflare/flagship) OpenFeature provider to evaluate flags from Workers, Node.js, or browsers. Switch from another flag provider by changing one line of configuration.

[ View SDK docs ](https://developers.cloudflare.com/flagship/sdk/) 

###  Targeting rules 

Serve different flag values based on user attributes. Rules support 11 comparison operators, logical AND/OR grouping, and sequential evaluation.

[ Learn about targeting ](https://developers.cloudflare.com/flagship/targeting/) 

###  Percentage rollouts 

Gradually release features to a percentage of users. Consistent hashing ensures the same user always receives the same flag value.

[ Learn about rollouts ](https://developers.cloudflare.com/flagship/targeting/percentage-rollouts/) 

###  Multi-type variations 

Flag variations can be booleans, strings, numbers, or structured JSON objects. Use object variations to deliver entire configuration blocks as a single flag.

[ Use Multi-type variations ](https://developers.cloudflare.com/flagship/concepts/) 

###  Flag management 

Create, update, and delete flags through the Cloudflare dashboard. Organize flags into apps that map to your projects or services.

[ Use Flag management ](https://developers.cloudflare.com/flagship/get-started/) 

---

## Related products

**[Workers](https://developers.cloudflare.com/workers/)** 

Build serverless applications on Cloudflare's global network. Flagship integrates natively with Workers through a binding.

**[KV](https://developers.cloudflare.com/kv/)** 

Store key-value data across Cloudflare's global network. Flagship uses this infrastructure to deliver flag configurations.

## More resources

[Developer Discord](https://discord.cloudflare.com) 

Connect with the Workers community on Discord to ask questions, show what you are building, and discuss the platform with other developers.

[@CloudflareDev](https://x.com/cloudflaredev) 

Follow @CloudflareDev on Twitter to learn about product announcements and what is new in Cloudflare Workers.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/flagship/#page","headline":"Overview · Cloudflare Flagship docs","description":"Ship features safely with Flagship, Cloudflare's feature flag service for controlling feature visibility without redeploying code.","url":"https://developers.cloudflare.com/flagship/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/flagship/","name":"Flagship"}}]}
```
