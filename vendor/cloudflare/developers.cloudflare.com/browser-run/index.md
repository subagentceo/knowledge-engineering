---
title: Browser Run
description: Control headless browsers with Cloudflare's Workers Browser Run API. Automate tasks, take screenshots, convert pages to PDFs, and test web apps.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/browser-run/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Browser Run

Run headless Chrome on [Cloudflare's global network](https://developers.cloudflare.com/workers/) for browser automation, web scraping, testing, and content generation.

 Available on Free and Paid plans 

Browser Run, formerly known as Browser Rendering, enables developers to programmatically control and interact with headless browser instances running on Cloudflare’s global network.

## Use cases

Programmatically load and fully render dynamic webpages or raw HTML and capture specific outputs such as:

* [Markdown](https://developers.cloudflare.com/browser-run/quick-actions/markdown-endpoint/)
* [Screenshots](https://developers.cloudflare.com/browser-run/quick-actions/screenshot-endpoint/)
* [PDFs](https://developers.cloudflare.com/browser-run/quick-actions/pdf-endpoint/)
* [Snapshots](https://developers.cloudflare.com/browser-run/quick-actions/snapshot/)
* [Links](https://developers.cloudflare.com/browser-run/quick-actions/links-endpoint/)
* [HTML elements](https://developers.cloudflare.com/browser-run/quick-actions/scrape-endpoint/)
* [Structured data](https://developers.cloudflare.com/browser-run/quick-actions/json-endpoint/)
* [Crawled web content](https://developers.cloudflare.com/browser-run/quick-actions/crawl-endpoint/)

## Integration methods

Browser Run offers two categories of integration methods:

* **[Quick Actions](https://developers.cloudflare.com/browser-run/quick-actions/)**: Simple, stateless browser tasks like screenshots, PDFs, and scraping. No code deployment needed.
* **Browser Sessions**: Direct browser control via [Puppeteer](https://developers.cloudflare.com/browser-run/puppeteer/), [Playwright](https://developers.cloudflare.com/browser-run/playwright/), [CDP](https://developers.cloudflare.com/browser-run/cdp/), or [Stagehand](https://developers.cloudflare.com/browser-run/stagehand/). Deploy within Cloudflare Workers or connect from any environment via CDP.

| Use case                                    | Recommended                                                                                                                                                                                                  | Why                                                              |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| Simple screenshot, PDF, or scrape           | [Quick Actions](https://developers.cloudflare.com/browser-run/quick-actions/)                                                                                                                                | No code deployment; single HTTP request                          |
| Browser automation                          | [Playwright](https://developers.cloudflare.com/browser-run/playwright/), [Puppeteer](https://developers.cloudflare.com/browser-run/puppeteer/), or [CDP](https://developers.cloudflare.com/browser-run/cdp/) | Full browser control with scripting                              |
| Porting existing scripts                    | [Puppeteer](https://developers.cloudflare.com/browser-run/puppeteer/), [Playwright](https://developers.cloudflare.com/browser-run/playwright/), or [CDP](https://developers.cloudflare.com/browser-run/cdp/) | Minimal code changes from standard libraries                     |
| AI-powered data extraction                  | [JSON endpoint](https://developers.cloudflare.com/browser-run/quick-actions/json-endpoint/)                                                                                                                  | Structured data via natural language prompts                     |
| Site-wide crawling                          | [Crawl endpoint](https://developers.cloudflare.com/browser-run/quick-actions/crawl-endpoint/)                                                                                                                | Multi-page content extraction with async results                 |
| AI agent browsing                           | [Playwright MCP](https://developers.cloudflare.com/browser-run/playwright/playwright-mcp/) or [CDP with MCP clients](https://developers.cloudflare.com/browser-run/cdp/mcp-clients/)                         | LLMs control browsers via MCP                                    |
| Resilient scraping                          | [Stagehand](https://developers.cloudflare.com/browser-run/stagehand/)                                                                                                                                        | AI finds elements by intent, not selectors                       |
| Direct browser control from any environment | [CDP](https://developers.cloudflare.com/browser-run/cdp/)                                                                                                                                                    | WebSocket access from local machines, CI/CD, or external servers |

## Key features

* **Scale to thousands of browsers**: Instant access to a global pool of browsers with low cold-start time, ideal for high-volume screenshot generation, data extraction, or automation at scale
* **Global by default**: Browser sessions run on Cloudflare's edge network, opening close to your users for better speed and availability worldwide
* **Easy to integrate**: [Quick Actions](https://developers.cloudflare.com/browser-run/quick-actions/) for common tasks, [Puppeteer](https://developers.cloudflare.com/browser-run/puppeteer/) and [Playwright](https://developers.cloudflare.com/browser-run/playwright/) for complex workflows, and [CDP](https://developers.cloudflare.com/browser-run/cdp/) for direct browser control from any environment
* **Session management**: [Reuse browser sessions](https://developers.cloudflare.com/browser-run/features/reuse-sessions/) across requests to improve performance and reduce cold-start overhead
* **Flexible pricing**: Pay only for browser time used with generous free tier ([view pricing](https://developers.cloudflare.com/browser-run/pricing/))

## Related products

**[Workers](https://developers.cloudflare.com/workers/)** 

Build serverless applications and deploy instantly across the globe for exceptional performance, reliability, and scale.

**[Durable Objects](https://developers.cloudflare.com/durable-objects/)** 

A globally distributed coordination API with strongly consistent storage. Using Durable Objects to [persist browser sessions](https://developers.cloudflare.com/browser-run/how-to/browser-run-with-do/) improves performance by eliminating the time that it takes to spin up a new browser session.

**[Agents](https://developers.cloudflare.com/agents/)** 

Build AI-powered agents that autonomously navigate websites and perform tasks using [Playwright MCP](https://developers.cloudflare.com/browser-run/playwright/playwright-mcp/) or [Stagehand](https://developers.cloudflare.com/browser-run/stagehand/).

## More resources

[Get started](https://developers.cloudflare.com/browser-run/get-started/) 

Choose an integration method and deploy your first project.

[Limits](https://developers.cloudflare.com/browser-run/limits/) 

Learn about Browser Run limits.

[Pricing](https://developers.cloudflare.com/browser-run/pricing/) 

Learn about Browser Run pricing.

[Playwright API](https://developers.cloudflare.com/browser-run/playwright/) 

Use Cloudflare's fork of Playwright for testing and automation.

[Developer Discord](https://discord.cloudflare.com) 

Connect with the Workers community on Discord to ask questions, show what you are building, and discuss the platform with other developers.

[@CloudflareDev](https://x.com/cloudflaredev) 

Follow @CloudflareDev on Twitter to learn about product announcements, and what is new in Cloudflare Workers.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/browser-run/#page","headline":"Browser Run · Cloudflare Browser Run docs","description":"Control headless browsers with Cloudflare's Workers Browser Run API. Automate tasks, take screenshots, convert pages to PDFs, and test web apps.","url":"https://developers.cloudflare.com/browser-run/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/browser-run/","name":"Browser Run"}}]}
```
