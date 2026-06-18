---
title: About
description: How Authenticated Origin Pulls use mTLS to verify Cloudflare connections.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# About

## Simple explanation

When visitors request content from your domain, Cloudflare first attempts to serve content from the cache. If this attempt fails, Cloudflare sends a request — or an `origin pull` — back to your origin web server to get the content.

Authenticated Origin Pulls makes sure that all of these `origin pulls` come from Cloudflare. Put another way, Authenticated Origin Pulls ensures that any HTTPS requests outside of Cloudflare will not receive a response from your origin.

This block also applies for requests to [unproxied DNS records](https://developers.cloudflare.com/dns/proxy-status/#dns-only-records) in Cloudflare.

Warning

The Cloudflare-provided certificate used by [global AOP](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/global/) is not exclusive to your account. It only guarantees that a request is coming from the Cloudflare network.

For stricter security, set up [zone-level](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/zone-level/) or [per-hostname](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/set-up/per-hostname/) AOP with your own certificate and consider [other security measures for your origin](https://developers.cloudflare.com/fundamentals/security/protect-your-origin-server/).

## Detailed explanation

Cloudflare enforces authenticated origin pulls by adding an extra layer of TLS client certificate authentication when establishing a connection between Cloudflare and the origin web server.

For more details, refer to the [introductory blog post ↗](https://blog.cloudflare.com/protecting-the-origin-with-tls-authenticated-origin-pulls/).

---

### Types of handshakes

For more details, refer to [What is a TLS handshake? ↗](https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/).

**Standard TLS handshake**

![Diagram showing the Standard TLS handshake](https://developers.cloudflare.com/_astro/client-auth-tls-standard.DZBqll1L_xiYbX.webp) 

**Client authenticated TLS handshake**

![Diagram showing the client authenticated TLS handshake](https://developers.cloudflare.com/_astro/client-auth-tls-handshake.B9OeA94c_Z2s8D3v.webp) 

### Comparison diagrams

Without Authenticated Origin Pulls, Cloudflare performs standard TLS handshakes between a client device and Cloudflare and Cloudflare and your origin. This is true even if you have [**Full**](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full/) or [**Full (strict)**](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full-strict/) encryption modes enabled.

    flowchart TD
      accTitle: Connection diagram without Authenticated Origin Pulls
      A[End user query for <code>example.com</code>] --Standard TLS Handshake--> B[Cloudflare network]
      B --Standard TLS Handshake--> C[Origin server]
      D[External device] --Standard TLS Handshake ----> C

  
This lack of authentication means that - even if your origin is [protected behind Cloudflare](https://developers.cloudflare.com/fundamentals/concepts/how-cloudflare-works/) \- attackers with your origin's IP address will still receive a response from your origin for HTTPS requests.

With Authenticated Origin Pulls, Cloudflare performs standard TLS handshakes between a client device and Cloudflare, but a client-authenticated TLS handshake between Cloudflare and your origin.

    flowchart TD
      accTitle: Connection diagram with Authenticated Origin Pulls
      A[End user query for <code>example.com</code>] --Standard TLS Handshake--> B[Cloudflare network]
      B --Client authenticated TLS Handshake--> C[Origin server]
      D[External device] --Standard TLS Handshake -----x C

  
This additional layer of authentication ensures that any HTTPS requests outside of Cloudflare will not receive a response from your origin.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/explanation/#page","headline":"How Authenticated Origin Pulls works · Cloudflare SSL/TLS docs","description":"How Authenticated Origin Pulls use mTLS to verify Cloudflare connections.","url":"https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/explanation/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["mTLS"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/origin-configuration/","name":"Origin server"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/origin-configuration/authenticated-origin-pull/","name":"Authenticated Origin Pulls (mTLS)"}},{"@type":"ListItem","position":5,"item":{"@id":"/ssl/origin-configuration/authenticated-origin-pull/explanation/","name":"About"}}]}
```
