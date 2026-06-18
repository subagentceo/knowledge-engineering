---
title: Introduction to Cloudflare
description: Learn about Cloudflare's network and products.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Introduction to Cloudflare

[Cloudflare ↗](https://www.cloudflare.com/learning/what-is-cloudflare/) is a global network of [servers ↗](https://www.cloudflare.com/learning/cdn/glossary/edge-server/). It is one of the largest [networks ↗](https://www.cloudflare.com/network/) on the Internet.

Cloudflare's product offering is composed of [SASE and SSE services ↗](https://www.cloudflare.com/zero-trust/), [application ↗](https://www.cloudflare.com/application-services/) and [infrastructure services ↗](https://www.cloudflare.com/network-services/), and [Developer Platform ↗](https://www.cloudflare.com/developer-platform/solutions/).

Cloudflare's products offer something to developers, private and public organizations, businesses, governments, and individual consumers.

## Cloudflare Developer Platform

The [Cloudflare Developer Platform ↗](https://www.cloudflare.com/developer-platform/products/) includes [Cloudflare Workers](https://developers.cloudflare.com/workers/), which allows you to deploy serverless code instantly across the globe. You will learn more about [the Developer Platform in this module](https://developers.cloudflare.com/learning-paths/workers/devplat/).

## Built on Cloudflare

If your application is built on Cloudflare, then Cloudflare would act as the origin server of your application.

An example tech stack for an application built on Cloudflare would look like:

* [Domain Registrar](https://developers.cloudflare.com/registrar/) to buy a new your domain.
* [Cloudflare Pages](https://developers.cloudflare.com/pages/) to configure and deploy a front-end site.
* [Cloudflare Workers](https://developers.cloudflare.com/workers/) or [Pages Functions](https://developers.cloudflare.com/pages/functions/) (which are Workers under the hood) to add dynamic functionality to your site.
* [Storage resources](https://developers.cloudflare.com/workers/platform/storage-options/) to persist different types of data.
* [Application security (DDoS protection, WAF, and more) ↗](https://www.cloudflare.com/application-services/products/#security-services) to secure your site.
* [Application performance (CDN, Load Balancing, and more) ↗](https://www.cloudflare.com/application-services/products/#performance-services) to customize and enhance your site's performance.
* [AI](https://developers.cloudflare.com/use-cases/ai/) to run machine learning models.

And more depending on your use case.

## Built with Cloudflare

When you add your application to Cloudflare, Cloudflare's global network of servers will sit in between requests to your application and your application's [origin server ↗](https://www.cloudflare.com/learning/cdn/glossary/origin-server/).

![Cloudflare sits in between requests and your origin server.](https://developers.cloudflare.com/_astro/website-with-cloudflare.D3VGvGsa_Z19Ojss.svg) 

After you add your application to [Cloudflare](https://developers.cloudflare.com/fundamentals/concepts/how-cloudflare-works/), you can:

* Use Workers to augment the application by deploying code.
* Add storage resources available on the Developer Platform.
* Enhance your application's performance by speeding up content delivery and user experience ([CDN ↗](https://www.cloudflare.com/learning/cdn/what-is-a-cdn/)).
* Protect your website from malicious activity ([DDoS ↗](https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/) by configuring the [Web Application Firewall ↗](https://www.cloudflare.com/learning/ddos/glossary/web-application-firewall-waf/)).
* Route traffic ([Load balancing](https://developers.cloudflare.com/load-balancing/), [Waiting Room](https://developers.cloudflare.com/waiting-room/)).

And more depending on your use case.

## Summary

By reading this page, you have:

* Learned the scale of Cloudflare's global network.
* Explored the product offering to know what Cloudflare can offer for users like you.
* Reviewed how you can build your applications with Cloudflare and Cloudflare Workers.

In the next section, you will be introduced to the fundamentals of serverless computing, the concept behind Cloudflare Workers.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/workers/concepts/cloudflare-intro/#page","headline":"Introduction to Cloudflare · Cloudflare Learning Paths","description":"Learn about Cloudflare's network and products.","url":"https://developers.cloudflare.com/learning-paths/workers/concepts/cloudflare-intro/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/workers/concepts/","name":"Concepts"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/workers/concepts/cloudflare-intro/","name":"Introduction to Cloudflare"}}]}
```
