---
title: Automatic request headers
description: Review the headers Cloudflare automatically attaches to every Browser Run request, including User-Agent and bot detection identifiers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/browser-run/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Automatic request headers

Cloudflare automatically attaches headers to every request made through Browser Run. These headers make it easy for destination servers to identify that these requests came from Cloudflare.

## User-Agent

The default User-Agent depends on how you access Browser Run:

| Method                                                                                                                                                                                                     | Default User-Agent                                                                                              | Customizable                                |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| [Quick Actions](https://developers.cloudflare.com/browser-run/quick-actions/)                                                                                                                              | Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 | Yes, using the userAgent parameter          |
| [Crawl endpoint](https://developers.cloudflare.com/browser-run/quick-actions/crawl-endpoint/)                                                                                                              | CloudflareBrowserRenderingCrawler/1.0                                                                           | No                                          |
| [CDP](https://developers.cloudflare.com/browser-run/cdp/) ([Puppeteer](https://developers.cloudflare.com/browser-run/puppeteer/), [Playwright](https://developers.cloudflare.com/browser-run/playwright/)) | The default User-Agent of the underlying Chrome version                                                         | Yes, via Puppeteer/Playwright configuration |

Note

The User-Agent header is not a reliable way to identify Browser Run requests. It is configurable for most Browser Run methods, changes when the underlying Chrome version updates, and any HTTP client can send any User-Agent string. Destination servers should use the [non-configurable headers](#non-configurable-headers) and [Web Bot Auth](#about-web-bot-auth) signatures below, which provide cryptographic proof that a request originated from Cloudflare Browser Run.

## Non-configurable headers

Note

The following headers are meant to ensure transparency and cannot be removed or overridden (with `setExtraHTTPHeaders`, for example).

| Header                        | Description                                                                                                                                                                                                                                                             |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| cf-brapi-request-id           | A unique identifier for the Browser Run request when using [Quick Actions](https://developers.cloudflare.com/browser-run/quick-actions/)                                                                                                                                |
| cf-brapi-devtools             | A unique identifier for the Browser Run request when using [Puppeteer](https://developers.cloudflare.com/browser-run/puppeteer/), [Playwright](https://developers.cloudflare.com/browser-run/playwright/), or [CDP](https://developers.cloudflare.com/browser-run/cdp/) |
| cf-biso-devtools              | A flag indicating the request originated from Cloudflare's rendering infrastructure                                                                                                                                                                                     |
| Signature-agent               | [The location of the bot public keys ↗](https://web-bot-auth.cloudflare-browser-rendering-085.workers.dev), used to sign the request and verify it came from Cloudflare                                                                                                 |
| Signature and Signature-input | A digital signature, used to validate requests, as shown in [this architecture document ↗](https://datatracker.ietf.org/doc/html/draft-meunier-web-bot-auth-architecture)                                                                                               |

### About Web Bot Auth

The `Signature` headers use an authentication method called [Web Bot Auth](https://developers.cloudflare.com/bots/reference/bot-verification/web-bot-auth/). Web Bot Auth leverages cryptographic signatures in HTTP messages to verify that a request comes from an automated bot. To verify a request originated from Cloudflare Browser Run, use the keys found on [this directory ↗](https://web-bot-auth.cloudflare-browser-rendering-085.workers.dev/.well-known/http-message-signatures-directory) to verify the `Signature` and `Signature-Input` found in the headers from the incoming request. A successful verification proves that the request originated from Cloudflare Browser Run and has not been tampered with in transit.

### Bot detection

Browser Run uses different bot detection IDs depending on the method. [Quick Actions](https://developers.cloudflare.com/browser-run/quick-actions/) (excluding the [crawl endpoint](https://developers.cloudflare.com/browser-run/quick-actions/crawl-endpoint/)), [Puppeteer](https://developers.cloudflare.com/browser-run/puppeteer/), [Playwright](https://developers.cloudflare.com/browser-run/playwright/), and [CDP](https://developers.cloudflare.com/browser-run/cdp/) share one ID, while the crawl endpoint has its own.

| Method                                                                                                                                                                                                                                                                                   | Bot detection ID |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| [Quick Actions](https://developers.cloudflare.com/browser-run/quick-actions/), [Puppeteer](https://developers.cloudflare.com/browser-run/puppeteer/), [Playwright](https://developers.cloudflare.com/browser-run/playwright/), [CDP](https://developers.cloudflare.com/browser-run/cdp/) | 119853733        |
| [Crawl endpoint](https://developers.cloudflare.com/browser-run/quick-actions/crawl-endpoint/)                                                                                                                                                                                            | 128292352        |

If you are attempting to scan your own zone and want Browser Run to access your website freely without your bot protection configuration interfering, you can create a WAF skip rule to [allowlist Browser Run](https://developers.cloudflare.com/browser-run/faq/#can-i-allowlist-browser-run-on-my-own-website).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/browser-run/reference/automatic-request-headers/#page","headline":"Automatic request headers · Cloudflare Browser Run docs","description":"Review the headers Cloudflare automatically attaches to every Browser Run request, including User-Agent and bot detection identifiers.","url":"https://developers.cloudflare.com/browser-run/reference/automatic-request-headers/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/browser-run/","name":"Browser Run"}},{"@type":"ListItem","position":3,"item":{"@id":"/browser-run/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/browser-run/reference/automatic-request-headers/","name":"Automatic request headers"}}]}
```
