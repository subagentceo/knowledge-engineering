---
title: Integrations
description: Integrate with third-party services and products.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Integrations

One of the key features of Cloudflare Workers is the ability to integrate with other services and products. In this document, we will explain the types of integrations available with Cloudflare Workers and provide step-by-step instructions for using them.

## Types of integrations

Cloudflare Workers offers several types of integrations, including:

* [Databases](https://developers.cloudflare.com/workers/databases/): Cloudflare Workers can be integrated with a variety of databases, including SQL and NoSQL databases. This allows you to store and retrieve data from your databases directly from your Cloudflare Workers code.
* [APIs](https://developers.cloudflare.com/workers/configuration/integrations/apis/): Cloudflare Workers can be used to integrate with external APIs, allowing you to access and use the data and functionality exposed by those APIs in your own code.
* [Third-party services](https://developers.cloudflare.com/workers/configuration/integrations/external-services/): Cloudflare Workers can be used to integrate with a wide range of third-party services, such as payment gateways, authentication providers, and more. This makes it possible to use these services in your Cloudflare Workers code.

## How to use integrations

To use any of the available integrations:

* Determine which integration you want to use and make sure you have the necessary accounts and credentials for it.
* In your Cloudflare Workers code, import the necessary libraries or modules for the integration.
* Use the provided APIs and functions to connect to the integration and access its data or functionality.
* Store necessary secrets and keys using secrets via [wrangler secret put <KEY>](https://developers.cloudflare.com/workers/wrangler/commands/general/#secret).

## Tips and best practices

To help you get the most out of using integrations with Cloudflare Workers:

* Secure your integrations and protect sensitive data. Ensure you use secure authentication and authorization where possible, and ensure the validity of libraries you import.
* Use [caching](https://developers.cloudflare.com/workers/reference/how-the-cache-works) to improve performance and reduce the load on an external service.
* Split your Workers into service-oriented architecture using [Service bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/) to make your application more modular, easier to maintain, and more performant.
* Use [Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/) when communicating with external APIs and services, which create a DNS record on your behalf and treat your Worker as an application instead of a proxy.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/configuration/integrations/#page","headline":"Integrations · Cloudflare Workers docs","description":"Integrate with third-party services and products.","url":"https://developers.cloudflare.com/workers/configuration/integrations/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/configuration/","name":"Configuration"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/configuration/integrations/","name":"Integrations"}}]}
```
