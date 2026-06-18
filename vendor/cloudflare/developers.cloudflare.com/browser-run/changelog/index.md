---
title: Changelog
description: Review recent changes to Browser Run.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/browser-run/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Changelog

This is a detailed changelog of every update to Browser Run (formerly Browser Rendering). For a higher-level summary of major updates to every Cloudflare product, including Browser Run, visit [developers.cloudflare.com/changelog](https://developers.cloudflare.com/changelog/).

[ Subscribe to RSS ](https://developers.cloudflare.com/browser-run/changelog/index.xml)

## 2026-06-12

**New tutorial: Pre-render pages for crawlers**
* Added a new tutorial on how to [pre-render JavaScript-heavy pages](https://developers.cloudflare.com/browser-run/how-to/pre-render-pages/) using Browser Run and a Worker. The tutorial covers building a pre-rendering endpoint that calls the [/content Quick Action](https://developers.cloudflare.com/browser-run/quick-actions/content-endpoint/) to render pages in managed headless Chrome and return crawler-ready HTML for search crawlers, social preview bots, AI indexing jobs, or partner integrations.

## 2026-06-11

**New formats parameter for /snapshot**
* The [/snapshot endpoint](https://developers.cloudflare.com/browser-run/quick-actions/snapshot/) now supports a `formats` parameter that lets you return multiple page formats in a single API call. Previously, `/snapshot` returned only HTML content and a screenshot. You can now also include Markdown and the accessibility tree in the same response. Refer to the [/snapshot documentation](https://developers.cloudflare.com/browser-run/quick-actions/snapshot/) for usage examples and accepted values.

## 2026-05-28

**Use Quick Actions directly from Workers**
* You can now call [Quick Actions](https://developers.cloudflare.com/browser-run/quick-actions/) directly from a [Worker](https://developers.cloudflare.com/workers/) using the `quickAction()` method on the [browser binding](https://developers.cloudflare.com/browser-run/reference/wrangler/#bindings). This removes the need for API tokens or external HTTP requests when using Quick Actions within Workers. Supported actions include [screenshot](https://developers.cloudflare.com/browser-run/quick-actions/screenshot-endpoint/), [PDF](https://developers.cloudflare.com/browser-run/quick-actions/pdf-endpoint/), [content](https://developers.cloudflare.com/browser-run/quick-actions/content-endpoint/), [markdown](https://developers.cloudflare.com/browser-run/quick-actions/markdown-endpoint/), [JSON](https://developers.cloudflare.com/browser-run/quick-actions/json-endpoint/), [scrape](https://developers.cloudflare.com/browser-run/quick-actions/scrape-endpoint/), [links](https://developers.cloudflare.com/browser-run/quick-actions/links-endpoint/), and [snapshot](https://developers.cloudflare.com/browser-run/quick-actions/snapshot/). The `quickAction()` method requires a compatibility date of `2026-03-24` or later.

## 2026-04-15

**@cloudflare/playwright v1.3.0 released**
* Released version 1.3.0 of [@cloudflare/playwright](https://github.com/cloudflare/playwright/releases/tag/v1.3.0). Starting with this version, the library uses the standard CDP (Chrome DevTools Protocol) internally to communicate with Browser Run, replacing the previous chunked protocol. This aligns with Browser Run's [full CDP support](https://developers.cloudflare.com/changelog/post/2026-04-10-browser-rendering-cdp-endpoint/) and prevents compatibility issues when using the latest compatibility dates. If you encounter any issues, you can downgrade by setting a `compatibility_date` prior to `2026-03-17` or by adding the `no_websocket_standard_binary_type` flag. Refer to the [@cloudflare/playwright README](https://github.com/cloudflare/playwright?tab=readme-ov-file#cdp-protocol-support) for details.

## 2026-04-15

**Higher concurrency limits**
* Increased the default [concurrent browser limit](https://developers.cloudflare.com/browser-run/limits/#workers-paid) for Workers Paid plans from 30 to **120 per account**.
* Increased new browser instance rate for Workers Paid plans from 30 per minute to **1 per second**.
* Rate limits across the [limits page](https://developers.cloudflare.com/browser-run/limits/) are now expressed in per-second terms, matching how they are enforced.

## 2026-04-15

**Live View**
* [Live View](https://developers.cloudflare.com/browser-run/features/live-view/) lets you see and interact with a remote browser session in real time. Use it to debug automation scripts, monitor what a browser is doing, or manually step in when a task requires human intervention. Access Live View from the Cloudflare dashboard, via the hosted UI at `live.browser.run`, or using native Chrome DevTools.

## 2026-04-15

**Human in the Loop**
* [Human in the Loop](https://developers.cloudflare.com/browser-run/features/human-in-the-loop/) lets a human step into a live browser session to handle what automation cannot, such as login pages, CAPTCHAs, or sensitive data entry, then hand control back to the script. Access any active session through [Live View](https://developers.cloudflare.com/browser-run/features/live-view/).

## 2026-04-15

**Session Recordings**
* [Session Recordings](https://developers.cloudflare.com/browser-run/features/session-recording/) captures DOM changes, mouse and keyboard events, and page navigation as structured data so you can replay any browser session after it ends. Enable recordings by passing `recording: true` when launching a browser. After the session closes, access recordings from the **Runs** tab in the Cloudflare dashboard or retrieve them via API.

## 2026-04-15

**WebMCP support**
* Browser Run now supports [WebMCP](https://developers.cloudflare.com/browser-run/features/webmcp/) (Web Model Context Protocol), which allows websites to declare structured tools that AI agents can discover and execute. WebMCP-enabled browsers are available through the experimental lab browser pool.

## 2026-04-14

**Wrangler CLI commands for Browser Rendering**
* Added `wrangler browser` commands to create, manage, and view browser sessions directly from the terminal. Available commands: `create`, `close`, `list`, and `view`. For full usage details, refer to [Wrangler commands](https://developers.cloudflare.com/browser-run/reference/wrangler-commands/).

## 2026-04-13

**@cloudflare/puppeteer v1.1.0 released**
* Released version 1.1.0 of [@cloudflare/puppeteer](https://github.com/cloudflare/puppeteer/releases/tag/v1.1.0), which replaces the internal chunked protocol with plain CDP. This fixes a compatibility issue when using the latest compatibility dates.

## 2026-04-10

**Chrome DevTools Protocol (CDP) and MCP client support**
* Browser Rendering now exposes the [Chrome DevTools Protocol (CDP)](https://developers.cloudflare.com/browser-run/cdp/) as an endpoint. Any CDP-compatible client, including [Puppeteer](https://developers.cloudflare.com/browser-run/cdp/puppeteer/) and [Playwright](https://developers.cloudflare.com/browser-run/cdp/playwright/), can connect from any environment, whether that is [Cloudflare Workers](https://developers.cloudflare.com/workers/), your local machine, or a cloud environment. [MCP clients](https://developers.cloudflare.com/browser-run/cdp/mcp-clients/) like Claude Desktop, Claude Code, Cursor, and OpenCode can also use Browser Rendering as their remote browser.

## 2026-04-06

**Local development: headful mode (experimental)**
* You can now run Chrome in visible (headful) mode during local development by setting `X_BROWSER_HEADFUL=true` before running `wrangler dev` or `vite dev`. This makes it easier to visually debug your browser automation scripts. This feature is experimental and may change without notice.

## 2026-03-23

**@cloudflare/playwright v1.2.0 released**
* Released version 1.2.0 of [@cloudflare/playwright](https://github.com/cloudflare/playwright/releases/tag/v1.2.0), now upgraded to [Playwright v1.58.2](https://playwright.dev/docs/release-notes#version-158).

## 2026-03-17

**Separate bot detection IDs for Browser Rendering methods**
* Browser Rendering now uses separate bot detection IDs for the [REST API](https://developers.cloudflare.com/browser-run/quick-actions/) and [Browser Sessions](https://developers.cloudflare.com/browser-run/#integration-methods) versus the [crawl endpoint](https://developers.cloudflare.com/browser-run/quick-actions/crawl-endpoint/), allowing you to identify and control each method independently. For the full list of IDs, refer to [Automatic request headers](https://developers.cloudflare.com/browser-run/reference/automatic-request-headers/#bot-detection).

## 2026-03-10

**New REST API endpoint: /crawl (Beta)**
* Added the [/crawl endpoint](https://developers.cloudflare.com/browser-run/quick-actions/crawl-endpoint/) (beta) to the REST API. The `/crawl` endpoint scrapes content from a starting URL and follows links across the site, up to a configurable depth or page limit. Responses can be returned as HTML, Markdown, or structured JSON (powered by [Workers AI](https://developers.cloudflare.com/workers-ai/)).

## 2026-03-04

**Increased REST API rate limits**
* Increased [REST API rate limits](https://developers.cloudflare.com/browser-run/limits/#workers-paid) for Workers Paid plans from 180 requests per minute (3 per second) to 600 requests per minute (10 per second). No action is needed to benefit from the higher limits.

## 2026-02-26

**New tutorial: Generate OG images for Astro sites**
* Added a new tutorial on how to [generate OG images for Astro sites](https://developers.cloudflare.com/browser-run/how-to/og-images-astro/) using Browser Rendering. The tutorial walks through creating an Astro template, using Browser Rendering to screenshot it as a PNG, and serving the generated images.

## 2026-02-24

**Documentation updates for robots.txt and sitemaps**
* Added [robots.txt and sitemaps reference page](https://developers.cloudflare.com/browser-run/reference/robots-txt/) with guidance on configuring robots.txt and sitemaps for sites accessed by Browser Rendering, including sitemap index files and caching headers.

## 2026-02-18

**@cloudflare/playwright v1.1.1 released**
* Released version 1.1.1 of [@cloudflare/playwright](https://github.com/cloudflare/playwright/releases/tag/v1.1.1), which includes a bug fix that resolves a chunking issue that could occur when generating large PDFs. Upgrade to this version to avoid this issue.

## 2026-02-03

**@cloudflare/puppeteer v1.0.6 released**
* Released version 1.0.6 of [@cloudflare/puppeteer](https://github.com/cloudflare/puppeteer/releases/tag/v1.0.6), which includes a fix for rendering large text PDFs.

## 2026-01-21

**@cloudflare/puppeteer v1.0.5 released**
* Released version 1.0.5 of [@cloudflare/puppeteer](https://www.npmjs.com/package/@cloudflare/puppeteer/v/1.0.5), which includes a performance optimization for base64 decoding.

## 2026-01-08

**@cloudflare/playwright v1.1.0 released**
* Released version 1.1.0 of [@cloudflare/playwright](https://github.com/cloudflare/playwright), now upgraded to [Playwright v1.57.0](https://playwright.dev/docs/release-notes#version-157).

## 2026-01-07

**Bug fixes for JSON endpoint, waitForSelector timeout, and WebSocket rendering**
* Updated the [/json endpoint](https://developers.cloudflare.com/browser-run/quick-actions/json-endpoint/) fallback model and improved error handling for when plan limits of Workers Free plan users are reached.
* REST API requests using `waitForSelector` will now correctly fail if the specified selector is not found within the time limit.
* Fixed an issue where pages using WebSockets were not rendering correctly.

## 2025-12-04

**Added guidance on allowlisting Browser Rendering in Bot Management**
* Added [FAQ guidance](https://developers.cloudflare.com/browser-run/faq/#can-i-allowlist-browser-run-on-my-own-website) on how to create a WAF skip rule to allowlist Browser Rendering requests when using Bot Management on your zone.

## 2025-12-03

**Improved AI JSON response parsing and debugging**
* Added `rawAiResponse` field to [/json endpoint](https://developers.cloudflare.com/browser-run/quick-actions/json-endpoint/) error responses, allowing you to inspect the unparsed AI output when JSON parsing fails for easier debugging.
* Improved AI response handling to better distinguish between valid JSON objects, arrays, and invalid payloads, increasing type safety and reliability.

## 2025-10-21

**Added guidance on REST API timeouts and custom fonts**
* Added [REST API timeouts](https://developers.cloudflare.com/browser-run/reference/timeouts/) page explaining how Browser Rendering uses independent timers (for page load, selectors, and actions) and how to configure them.
* Updated [Supported fonts](https://developers.cloudflare.com/browser-run/reference/supported-fonts/) guide with instructions on using your own custom fonts via `addStyleTag()` in [Playwright](https://developers.cloudflare.com/browser-run/playwright/) or [Puppeteer](https://developers.cloudflare.com/browser-run/puppeteer/).

## 2025-09-25

**Updates to Playwright, new support for Stagehand, and increased limits**
* [Playwright](https://developers.cloudflare.com/browser-run/playwright/) support in Browser Rendering is now GA. We've upgraded to [Playwright v1.55](https://playwright.dev/docs/release-notes#version-155).
* Added support for [Stagehand](https://developers.cloudflare.com/browser-run/stagehand/), an open source browser automation framework, powered by [Workers AI](https://developers.cloudflare.com/workers-ai). Stagehand enables developers to build more reliably and flexibly by combining code with natural-language instructions.
* Increased [limits](https://developers.cloudflare.com/browser-run/limits/#workers-paid) for paid plans on both the [REST API](https://developers.cloudflare.com/browser-run/quick-actions/) and [Browser Sessions](https://developers.cloudflare.com/browser-run/#integration-methods).

## 2025-09-22

**Added \`excludeExternalLinks\` parameter to \`/links\` REST endpoint**
* Added `excludeExternalLinks` parameter when using the [/links endpoint](https://developers.cloudflare.com/browser-run/quick-actions/links-endpoint/). When set to `true`, links pointing to outside the domain of the requested URL are excluded.

## 2025-09-02

**Added \`X-Browser-Ms-Used\` response header**
* Each REST API response now includes the `X-Browser-Ms-Used` response header, which reports the browser time (in milliseconds) used by the request.

## 2025-08-20

**Browser Rendering billing goes live**
* Billing for Browser Rendering begins today, August 20th, 2025\. See [pricing page](https://developers.cloudflare.com/browser-run/pricing/) for full details. You can monitor usage via the [Cloudflare dashboard](https://dash.cloudflare.com/?to=/:account/workers/browser-run).

## 2025-08-18

**Wrangler updates to local dev**
* Improved the local development experience by updating the method for downloading the dev mode browser and added support for [/v1/sessions endpoint](https://developers.cloudflare.com/platform/puppeteer/#list-open-sessions), allowing you to list open browser rendering sessions. Upgrade to `wrangler@4.31.0` to get started.

## 2025-07-29

**Updates to Playwright, local dev support, and REST API**
* [Playwright](https://developers.cloudflare.com/browser-run/playwright/) upgraded to [Playwright v1.54.1](https://github.com/microsoft/playwright/releases/tag/v1.54.1) and [Playwright MCP](https://developers.cloudflare.com/browser-run/playwright/playwright-mcp/) upgraded to be in sync with upstream Playwright MCP v0.0.30.
* Local development with `npx wrangler dev` now supports [Playwright](https://developers.cloudflare.com/browser-run/playwright/) when using Browser Rendering. Upgrade to the latest version of wrangler to get started.
* The [/content endpoint](https://developers.cloudflare.com/browser-run/quick-actions/content-endpoint/) now returns the page's title, making it easier to identify pages.
* The [/json endpoint](https://developers.cloudflare.com/browser-run/quick-actions/json-endpoint/) now allows you to specify your own AI model for the extraction, using the `custom_ai` parameter.
* The default viewport size on the [/screenshot endpoint](https://developers.cloudflare.com/browser-run/quick-actions/screenshot-endpoint/) has been increased from 800x600 to 1920x1080\. You can still override the viewport via request options.

## 2025-07-25

**@cloudflare/puppeteer 1.0.4 released**
* We have released version 1.0.4 of [@cloudflare/puppeteer](https://github.com/cloudflare/puppeteer), now in sync with Puppeteer v22.13.1.

## 2025-07-24

**Playwright now supported in local development**
* You can now use Playwright with local development. Upgrade to [wrangler@4.26.0](mailto:wrangler@4.26.0) to get started.

## 2025-07-16

**Pricing update to Browser Rendering**
* Billing for Browser Rendering starts on August 20, 2025, with usage beyond the included [limits](https://developers.cloudflare.com/browser-run/limits/) charged according to the new [pricing rates](https://developers.cloudflare.com/browser-run/pricing/).

## 2025-07-03

**Local development support**
* We added local development support to Browser Rendering, making it simpler than ever to test and iterate before deploying.

## 2025-06-30

**New Web Bot Auth headers**
* Browser Rendering now supports [Web Bot Auth](https://developers.cloudflare.com/bots/reference/bot-verification/web-bot-auth/) by automatically attaching `Signature-agent`, `Signature`, and `Signature-input ` headers to verify that a request originates from Cloudflare Browser Rendering.

## 2025-06-27

**Bug fix to debug log noise in Workers**
* Fixed an issue where all debug logging was on by default and would flood logs. Debug logs is now off by default but can be re-enabled by setting [process.env.DEBUG](https://pptr.dev/guides/debugging#log-devtools-protocol-traffic) when needed.

## 2025-05-26

**Playwright MCP**
* You can now deploy [Playwright MCP](https://developers.cloudflare.com/browser-run/playwright/playwright-mcp/) and use any MCP client to get AI models to interact with Browser Rendering.

## 2025-04-30

**Automatic Request Headers**
* [Clarified Automatic Request headers](https://developers.cloudflare.com/browser-run/reference/automatic-request-headers/) in Browser Rendering. These headers are unique to Browser Rendering, and are automatically included and cannot be removed or overridden.

## 2025-04-07

**New free tier and REST API GA with additional endpoints**
* Browser Rendering now has a new free tier.
* The [REST API](https://developers.cloudflare.com/browser-run/quick-actions/) is Generally Available.
* Released new endpoints [/json](https://developers.cloudflare.com/browser-run/quick-actions/json-endpoint/), [/links](https://developers.cloudflare.com/browser-run/quick-actions/links-endpoint/), and [/markdown](https://developers.cloudflare.com/browser-run/quick-actions/markdown-endpoint/).

## 2025-04-04

**Playwright support**
* You can now use [Playwright's](https://developers.cloudflare.com/browser-run/playwright/) browser automation capabilities from Cloudflare Workers.

## 2025-02-27

**New Browser Rendering REST API**
* Released a new [REST API](https://developers.cloudflare.com/browser-run/quick-actions/) in open beta. Available to all customers with a Workers Paid Plan.

## 2025-01-31

**Increased limits**
* Increased the limits on the number of concurrent browsers, and browsers per minute from 2 to 10.

## 2024-08-08

**Update puppeteer to 21.1.0**
* Rebased the fork on the original implementation up till version 21.1.0

## 2024-04-02

**Browser Rendering Available for everyone**
* Browser Rendering is now out of beta and available to all customers with Workers Paid Plan. Analytics and logs are available in Cloudflare's dashboard, under "Worker & Pages".

## 2023-05-19

**Browser Rendering Beta**
* Beta Launch

```json
{"@context":"https://schema.org","@type":"BlogPosting","@id":"https://developers.cloudflare.com/browser-run/changelog/#page","headline":"Changelog · Cloudflare Browser Run docs","description":"Review recent changes to Browser Run.","url":"https://developers.cloudflare.com/browser-run/changelog/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/browser-run/","name":"Browser Run"}},{"@type":"ListItem","position":3,"item":{"@id":"/browser-run/changelog/","name":"Changelog"}}]}
```
