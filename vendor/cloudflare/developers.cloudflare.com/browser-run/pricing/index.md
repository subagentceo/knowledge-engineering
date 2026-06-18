---
title: Pricing
description: Understand Browser Run pricing for Quick Actions and Browser Sessions, including browser hours and concurrent browser costs.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/browser-run/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Pricing

 Available on Free and Paid plans 

Billing depends on how you use Browser Run:

* [**Quick Actions**](https://developers.cloudflare.com/browser-run/quick-actions/): Charged for browser hours only.
* **Browser Sessions** ([Puppeteer](https://developers.cloudflare.com/browser-run/puppeteer/), [Playwright](https://developers.cloudflare.com/browser-run/playwright/), [CDP](https://developers.cloudflare.com/browser-run/cdp/)): Direct browser control, charged for both browser hours and concurrent browsers.

Browser hours are shared across all methods.

| Workers Free                                | Workers Paid       |                                                                                                                           |
| ------------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| Browser hours                               | 10 minutes per day | 10 hours per month, then $0.09 per additional hour                                                                        |
| Concurrent browsers (Browser Sessions only) | 3 browsers         | 10 browsers ([averaged monthly](#how-is-the-number-of-concurrent-browsers-calculated)), then $2.00 per additional browser |

To view or change your plan, go to the **Workers plans** page in the Cloudflare dashboard:

[ Go to **Workers plans** ](https://dash.cloudflare.com/?to=/:account/workers/plans) 

## Examples of Workers Paid pricing

#### Example: Quick Actions pricing

If a Workers Paid user uses Quick Actions for 50 hours during the month, the estimated cost for the month is as follows.

For browser hours:

  
50 hours - 10 hours (included in plan) = 40 hours

  
40 hours × $0.09 per hour = $3.60

#### Example: Browser Sessions pricing

If a Workers Paid plan user uses Browser Sessions (Puppeteer, Playwright, or CDP) for 50 hours during the month, and uses 10 concurrent browsers for the first 15 days and 20 concurrent browsers the last 15 days, the estimated cost for the month is as follows.

For browser hours:

  
50 hours - 10 hours (included in plan) = 40 hours

  
40 hours × $0.09 per hour = $3.60

For concurrent browsers:

  
((10 browsers × 15 days) + (20 browsers × 15 days)) = 450 total browsers used in month

  
450 browsers used in month ÷ 30 days in month = 15 browsers (averaged monthly)

  
15 browsers (averaged monthly) − 10 (included in plan) = 5 browsers  
5 browsers × $2.00 per browser = $10.00

For browser hours and concurrent browsers:

  
$3.60 + $10.00 = $13.60

## Pricing FAQ

### How do I estimate my Browser Run costs?

You can monitor Browser Run usage in two ways:

* To monitor your Browser Run usage in the Cloudflare dashboard, go to the **Browser Run** page.  
[ Go to **Browser Run** ](https://dash.cloudflare.com/?to=/:account/workers/browser-run)
* The `X-Browser-Ms-Used` header, which is returned in every Quick Actions response, reports browser time used for the request (in milliseconds). You can also access this header using the Typescript SDK with the .asResponse() method:  
TypeScript  
```  
const contentRes = await client.browserRendering.content  
  .create({  
    account_id: "account_id",  
  })  
  .asResponse();  
const browserMsUsed = parseInt(  
  contentRes.headers.get("X-Browser-Ms-Used") || "",  
);  
```

You can then use the tables above to estimate your costs based on your usage.

### Do failed API calls, such as those that time out, add to billable browser hours?

No. If a Quick Actions request fails with a `waitForTimeout` error, the browser session is not charged.

### How is the number of concurrent browsers calculated?

Cloudflare calculates concurrent browsers as the monthly average of your daily peak usage. In other words, we record the peak number of concurrent browsers each day and then average those values over the month. This approach reflects your typical traffic and ensures you are not disproportionately charged for brief spikes in browser concurrency.

### How is billing time calculated?

At the end of each day, Cloudflare totals all of your browser usage for that day in seconds. At the end of each billing cycle, we add up all of the daily totals to find the monthly total of browser hours, rounded to the nearest whole hour. In other words, 1,800 seconds (30 minutes) or more is rounded up to the nearest hour, and 1,799 seconds or less is rounded down to the nearest whole hour.

For example, if you only use one minute of browser time in a day, that day counts as one minute. If you do that every day for a 30-day month, your total would be 30 minutes. For billing, we round that up to one browser hour.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/browser-run/pricing/#page","headline":"Pricing · Cloudflare Browser Run docs","description":"Understand Browser Run pricing for Quick Actions and Browser Sessions, including browser hours and concurrent browser costs.","url":"https://developers.cloudflare.com/browser-run/pricing/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/browser-run/","name":"Browser Run"}},{"@type":"ListItem","position":3,"item":{"@id":"/browser-run/pricing/","name":"Pricing"}}]}
```
