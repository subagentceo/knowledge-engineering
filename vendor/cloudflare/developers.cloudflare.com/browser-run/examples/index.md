---
title: Examples
description: Explore Browser Run code examples for Quick Actions, Puppeteer, Playwright, and CDP integrations.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/browser-run/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Examples

## Quick Actions examples

Use these [Quick Actions](https://developers.cloudflare.com/browser-run/quick-actions/) examples to perform common tasks with a single HTTP request.

[ Fetch rendered HTML from a URL ](https://developers.cloudflare.com/browser-run/quick-actions/content-endpoint/#fetch-rendered-html-from-a-url) Capture fully rendered HTML from a webpage after JavaScript execution. 

[ Take a screenshot of the visible viewport ](https://developers.cloudflare.com/browser-run/quick-actions/screenshot-endpoint/#basic-usage) Capture a screenshot of a fully rendered webpage from a URL or custom HTML. 

[ Take a screenshot of the full page ](https://developers.cloudflare.com/browser-run/quick-actions/screenshot-endpoint/#navigate-and-capture-a-full-page-screenshot) Capture a screenshot of an entire scrollable webpage, not just the visible viewport. 

[ Take a screenshot of an authenticated page ](https://developers.cloudflare.com/browser-run/quick-actions/screenshot-endpoint/#capture-a-screenshot-of-an-authenticated-page) Capture a screenshot of a webpage that requires login using cookies, HTTP Basic Auth, or custom headers. 

[ Generate a PDF ](https://developers.cloudflare.com/browser-run/quick-actions/pdf-endpoint/#basic-usage) Generate a PDF from a URL or custom HTML and CSS. 

[ Extract Markdown from a URL ](https://developers.cloudflare.com/browser-run/quick-actions/markdown-endpoint/#convert-a-url-to-markdown) Convert a webpage's content into Markdown format. 

[ Capture a snapshot from a URL ](https://developers.cloudflare.com/browser-run/quick-actions/snapshot/#capture-a-snapshot-from-a-url) Capture both the rendered HTML and a screenshot from a webpage in a single request. 

[ Scrape headings and links from a URL ](https://developers.cloudflare.com/browser-run/quick-actions/scrape-endpoint/#extract-headings-and-links-from-a-url) Extract structured data from specific elements on a webpage using CSS selectors. 

[ Capture structured data with an AI prompt and JSON schema ](https://developers.cloudflare.com/browser-run/quick-actions/json-endpoint/#with-a-prompt-and-json-schema) Extract structured data from a webpage using AI using a prompt or JSON schema. 

[ Retrieve links from a URL ](https://developers.cloudflare.com/browser-run/quick-actions/links-endpoint/#get-all-links-on-a-page) Retrieve all links from a webpage, including hidden ones. 

[ Crawl a documentation site ](https://developers.cloudflare.com/browser-run/quick-actions/crawl-endpoint/#documentation-site-crawl) Crawl documentation pages with include/exclude patterns to build a knowledge base. 

[ Extract structured product data with AI ](https://developers.cloudflare.com/browser-run/quick-actions/crawl-endpoint/#product-catalog-extraction-with-ai) Crawl a product catalog and extract structured JSON data using AI. 

[ Fast static content fetch ](https://developers.cloudflare.com/browser-run/quick-actions/crawl-endpoint/#fast-static-content-fetch) Crawl static sites without JavaScript rendering for faster results. 

## Browser automation examples

Use [Puppeteer](https://developers.cloudflare.com/browser-run/puppeteer/), [Playwright](https://developers.cloudflare.com/browser-run/playwright/), or [Stagehand](https://developers.cloudflare.com/browser-run/stagehand/) for dynamic, multi-step browser automation within Cloudflare Workers.

[ Get page metrics with Puppeteer ](https://developers.cloudflare.com/browser-run/puppeteer/#use-puppeteer-in-a-worker) Use Puppeteer to navigate to a page and retrieve performance metrics in a Worker. 

[ Take a screenshot with Playwright ](https://developers.cloudflare.com/browser-run/playwright/#take-a-screenshot) Use Playwright to navigate to a page, interact with elements, and capture a screenshot. 

[ Run test assertions with Playwright ](https://developers.cloudflare.com/browser-run/playwright/#assertions) Use Playwright assertions to test web applications in a Worker. 

[ Generate a trace with Playwright ](https://developers.cloudflare.com/browser-run/playwright/#trace) Capture detailed execution logs for debugging with Playwright tracing. 

[ Reuse browser sessions ](https://developers.cloudflare.com/browser-run/features/reuse-sessions/) Improve performance by reusing browser sessions across requests. 

[ Persist sessions with Durable Objects ](https://developers.cloudflare.com/browser-run/how-to/browser-run-with-do/) Use Durable Objects to maintain long-running browser sessions. 

[ AI-powered browser automation with Stagehand ](https://developers.cloudflare.com/browser-run/stagehand/#use-stagehand-in-a-worker-with-workers-ai) Use natural language instructions to automate browser tasks with AI. 

## CDP examples

Use [CDP](https://developers.cloudflare.com/browser-run/cdp/) to connect to Browser Run from any environment using the Chrome DevTools Protocol.

[ Connect Puppeteer from your local machine ](https://developers.cloudflare.com/browser-run/cdp/puppeteer/) Run Puppeteer scripts against Browser Run from Node.js on your local machine, CI/CD, or any external server. 

[ Configure AI agents with MCP ](https://developers.cloudflare.com/browser-run/cdp/mcp-clients/) Set up Claude Desktop, Claude Code, Cursor, or other MCP clients to control browsers via Browser Run. 

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/browser-run/examples/#page","headline":"Examples · Cloudflare Browser Run docs","description":"Explore Browser Run code examples for Quick Actions, Puppeteer, Playwright, and CDP integrations.","url":"https://developers.cloudflare.com/browser-run/examples/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/browser-run/","name":"Browser Run"}},{"@type":"ListItem","position":3,"item":{"@id":"/browser-run/examples/","name":"Examples"}}]}
```
