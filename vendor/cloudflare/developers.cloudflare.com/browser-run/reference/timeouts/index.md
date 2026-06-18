---
title: Quick Actions timeouts
description: Configure Browser Run Quick Actions timeout settings for page load, selector wait, and action execution.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/browser-run/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Quick Actions timeouts

Browser Run uses several independent timers to manage how long different parts of a request can take. If any of these timers exceed their limit, the request returns a timeout error.

Each timer controls a specific part of the rendering lifecycle — from page load, to selector load, to action.

| Timer                 | Scope                                                                                                                                      | Default          | Max   |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- | ----- |
| goToOptions.timeout   | Time to wait for the page to load before timeout.                                                                                          | 30 s             | 60 s  |
| goToOptions.waitUntil | Determines when page load is considered complete. Refer to [waitUntil options](#waituntil-options) for details.                            | domcontentloaded | —     |
| waitForSelector       | Time to wait for a specific element (any CSS selector) to appear on the page.                                                              | null             | 60 s  |
| waitForTimeout        | Additional amount of time to wait after the page has loaded to proceed with actions.                                                       | null             | 60 s  |
| actionTimeout         | Time to wait for the action itself (for example: a screenshot, PDF, or scrape) to complete after the page has loaded.                      | null             | 5 min |
| PDFOptions.timeout    | Same as actionTimeout, but only applies to the [/pdf endpoint](https://developers.cloudflare.com/browser-run/quick-actions/pdf-endpoint/). | 30 s             | 5 min |

### `waitUntil` options

The `goToOptions.waitUntil` parameter controls when the browser considers page navigation complete. This is important for JavaScript-heavy pages where content is rendered dynamically after the initial page load.

| Value            | Behavior                                                                                       |
| ---------------- | ---------------------------------------------------------------------------------------------- |
| load             | Waits for the load event, including all resources like images and stylesheets                  |
| domcontentloaded | Waits until the DOM content has been fully loaded, which fires before the load event (default) |
| networkidle0     | Waits until there are no network connections for at least 500 ms                               |
| networkidle2     | Waits until there are no more than two network connections for at least 500 ms                 |

For pages that rely on JavaScript to render content, use `networkidle0` or `networkidle2` to ensure the page is fully rendered before extraction.

## Notes and recommendations

You can set multiple timers — as long as one is complete, the request will fire.

If you are not getting the expected output:

* Try increasing `goToOptions.timeout` (up to 60 s).
* If waiting for a specific element, use `waitForSelector`. Otherwise, use `goToOptions.waitUntil` set to `networkidle2` to ensure the page has finished loading dynamic content.
* If you are getting a `422`, it may be the action itself (ex: taking a screenshot, extracting the html content) that takes a long time. Try increasing the `actionTimeout` instead.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/browser-run/reference/timeouts/#page","headline":"Quick Actions timeouts · Cloudflare Browser Run docs","description":"Configure Browser Run Quick Actions timeout settings for page load, selector wait, and action execution.","url":"https://developers.cloudflare.com/browser-run/reference/timeouts/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/browser-run/","name":"Browser Run"}},{"@type":"ListItem","position":3,"item":{"@id":"/browser-run/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/browser-run/reference/timeouts/","name":"Quick Actions timeouts"}}]}
```
