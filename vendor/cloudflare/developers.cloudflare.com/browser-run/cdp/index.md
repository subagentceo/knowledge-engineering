---
title: Chrome DevTools Protocol (CDP)
description: Create persistent browser sessions, manage tabs, and interact with browsers using Chrome DevTools Protocol (CDP) commands via the /devtools endpoints.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/browser-run/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Chrome DevTools Protocol (CDP)

The `/devtools` endpoints provide session management capabilities that follow the [Chrome DevTools Protocol (CDP) ↗](https://chromedevtools.github.io/devtools-protocol/). These endpoints allow you to create persistent browser sessions, manage multiple tabs, and interact with browsers using CDP commands. This is useful for advanced automation, debugging, and remote browser control.

CDP endpoints can be accessed from any environment that supports WebSocket connections, including local development machines, external servers, and CI/CD pipelines. This means you can connect to Browser Run from Node.js scripts, Puppeteer, Playwright, or any CDP-compatible client.

Before you begin, [create a custom API Token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/) with `Browser Rendering - Edit` permission.

## What is CDP?

The Chrome DevTools Protocol (CDP) is a remote debugging protocol that allows you to instrument, inspect, debug, and profile Chromium-based browsers. It is the same protocol used by Chrome DevTools to control and monitor the browser. Popular browser automation libraries like Puppeteer and Playwright provide high-level APIs over the Chrome DevTools Protocol, making it easier to automate common tasks.

## Use cases

The browser sessions endpoints enable you to:

* **Create and manage persistent browser sessions** — Launch browser instances that remain active for extended periods
* **Open, close, and list browser tabs (targets)** — Manage multiple debuggable targets (pages, iframes, etc.) within a single browser instance
* **Connect via WebSocket to send CDP commands** — Automate browser actions programmatically
* **View live browser sessions using Chrome DevTools UI** — Debug and inspect remote browser sessions visually
* **Integrate with existing CDP clients** — Use standard CDP clients like Puppeteer or custom WebSocket implementations

## How it works

Once you acquire a browser session, you can interact with it in two ways:

### CDP over WebSocket

Connect to the WebSocket endpoint `/devtools/browser` to acquire a session and send [CDP commands ↗](https://chromedevtools.github.io/devtools-protocol/) directly over the connection. This is the standard way to use CDP and works with any CDP client, including [Puppeteer](https://developers.cloudflare.com/browser-run/cdp/puppeteer/), [Playwright](https://developers.cloudflare.com/browser-run/cdp/playwright/), and [MCP clients](https://developers.cloudflare.com/browser-run/cdp/mcp-clients/).

### HTTP API

HTTP endpoints are also available to manage the browser lifecycle without using WebSockets. These follow the standard [CDP HTTP endpoints ↗](https://chromedevtools.github.io/devtools-protocol/#endpoints):

1. **Create session** — `POST /devtools/browser`
2. **List tabs** — `GET /devtools/browser/{session_id}/json/list`
3. **Create tab** — `PUT /devtools/browser/{session_id}/json/new`
4. **Close tab** — `DELETE /devtools/browser/{session_id}/json/close/{target_id}`
5. **Close session** — `DELETE /devtools/browser/{session_id}`

Check the [API reference](https://developers.cloudflare.com/api/resources/browser%5Frendering/) for the full list of endpoints.

## Troubleshooting

If you have questions or encounter an error, see the [Browser Run FAQ and troubleshooting guide](https://developers.cloudflare.com/browser-run/faq/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/browser-run/cdp/#page","headline":"Chrome DevTools Protocol (CDP) · Cloudflare Browser Run docs","description":"Create persistent browser sessions, manage tabs, and interact with browsers using Chrome DevTools Protocol (CDP) commands via the /devtools endpoints.","url":"https://developers.cloudflare.com/browser-run/cdp/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-28","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/browser-run/","name":"Browser Run"}},{"@type":"ListItem","position":3,"item":{"@id":"/browser-run/cdp/","name":"Chrome DevTools Protocol (CDP)"}}]}
```
