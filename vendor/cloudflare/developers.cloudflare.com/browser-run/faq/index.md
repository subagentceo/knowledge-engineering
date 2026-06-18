---
title: FAQ
description: Find answers to frequently asked questions about Browser Run, including errors, troubleshooting, and session management.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/browser-run/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# FAQ

Below you will find answers to our most commonly asked questions about Browser Run (formerly Browser Rendering).

For pricing questions, visit the [pricing FAQ](https://developers.cloudflare.com/browser-run/pricing/#pricing-faq). For usage limits questions, visit the [limits FAQ](https://developers.cloudflare.com/browser-run/limits/#faq). If you cannot find the answer you are looking for, join us on [Discord ↗](https://discord.cloudflare.com).

---

## Errors & Troubleshooting

### Error: Cannot read properties of undefined (reading 'fetch')

This error typically occurs because your Puppeteer launch is not receiving the browser binding. To resolve this error, pass your browser binding into `puppeteer.launch`.

### Error: 429 browser time limit exceeded

This error (`Unable to create new browser: code: 429: message: Browser time limit exceeded for today`) indicates you have hit the daily browser-instance limit on the Workers Free plan. [Workers Free plan accounts are capped at 10 minutes of browser use a day](https://developers.cloudflare.com/browser-run/limits/#workers-free). Once you exceed that limit, further creation attempts return a 429 error until the next UTC day.

To resolve this error, [upgrade to a Workers Paid plan](https://developers.cloudflare.com/workers/platform/pricing/) which allows for more than 10 minutes of usage a day and has higher [limits](https://developers.cloudflare.com/browser-run/limits/#workers-paid). If you recently upgraded but still see this error, try redeploying your Worker to ensure your usage is correctly associated with your new plan.

### Error: 422 unprocessable entity

A `422 Unprocessable Entity` error usually means that Browser Run was not able to complete an action because of an issue with the site.

This can happen if:

* The website consumes too much memory during rendering.
* The page itself crashed or returned an error before the action completed.
* The request exceeded one of the [timeout limits](https://developers.cloudflare.com/browser-run/reference/timeouts/) for page load, element load, or an action.

Most often, this error is caused by a timeout. You can review the different timers and their limits in the [Quick Actions timeouts reference](https://developers.cloudflare.com/browser-run/reference/timeouts/).

### Why is my page content missing or incomplete?

If your screenshots, PDFs, or scraped content are missing elements that appear when viewing the page in a browser, the page likely has not finished loading before Browser Run captures the output.

JavaScript-heavy pages and Single Page Applications (SPAs) often load content dynamically after the initial HTML is parsed. By default, Browser Run waits for `domcontentloaded`, which fires before JavaScript has finished rendering the page.

To fix this, use the `goToOptions.waitUntil` parameter with one of these values:

| Value        | Use when                                                                                                         |
| ------------ | ---------------------------------------------------------------------------------------------------------------- |
| networkidle0 | The page must be completely idle (no network requests for 500 ms). Best for pages that load all content upfront. |
| networkidle2 | The page can have up to 2 ongoing connections (like analytics or websockets). Best for most dynamic pages.       |

Quick Actions example:

```

{

  "url": "https://example.com",

  "goToOptions": {

    "waitUntil": "networkidle2"

  }

}


```

If content is still missing:

* Use `waitForSelector` to wait for a specific element to appear before capturing.
* Increase `goToOptions.timeout` (up to 60 seconds) for slow-loading pages.
* Check if the page requires authentication or returns different content to bots.

For a complete reference, see [Quick Actions timeouts](https://developers.cloudflare.com/browser-run/reference/timeouts/).

---

## Getting started & Development

### Why run browsers in the cloud instead of locally?

Running a browser locally works for development and small-scale tasks, but has practical limits for production workloads.

With Browser Run, browser sessions run on Cloudflare's infrastructure, so your automation runs without a local machine. There is no Chrome installation to maintain, no VM to keep running, and sessions launch on demand and shut down when done.

You can also use [Cloudflare Queues](https://developers.cloudflare.com/queues/tutorials/web-crawler-with-browser-run/) to process batches of URLs asynchronously, allowing you to crawl at scale without managing queue infrastructure yourself.

Browser sessions open on Cloudflare's global network, close to the incoming request. Browser Run is a [Workers binding](https://developers.cloudflare.com/browser-run/reference/wrangler/#bindings), so it integrates directly with [Durable Objects](https://developers.cloudflare.com/browser-run/how-to/browser-run-with-do/), Queues, and the rest of the Cloudflare developer platform.

### Does local development support all Browser Run features?

Not yet. Local development currently has the following limitation(s):

* Requests larger than 1 MB are not supported.

You can also run Chrome in visible (headful) mode during local development to visually debug your automation scripts (experimental). Set the `X_BROWSER_HEADFUL` environment variable before starting your dev server:

Terminal window

```

X_BROWSER_HEADFUL=true npx wrangler dev


```

Use real headless browser during local development

To interact with a real headless browser during local development, set `"remote" : true` in the Browser binding configuration. Learn more in our [remote bindings documentation](https://developers.cloudflare.com/workers/development-testing/#remote-bindings).

### How do I render authenticated pages using Quick Actions?

If the page you are rendering requires authentication, you can pass credentials using one of the following methods. These parameters work with all [Quick Actions](https://developers.cloudflare.com/browser-run/quick-actions/) endpoints.

HTTP Basic Auth:

```

{

  "authenticate": {

    "username": "user",

    "password": "pass"

  }

}


```

Cookie-based authentication:

```

{

  "cookies": [

    {

      "name": "session_id",

      "value": "abc123",

      "domain": "example.com",

      "path": "/",

      "secure": true,

      "httpOnly": true

    }

  ]

}


```

Token-based authentication:

```

{

  "setExtraHTTPHeaders": {

    "Authorization": "Bearer your-token"

  }

}


```

For complete working examples of all three methods, refer to [Capture a screenshot of an authenticated page](https://developers.cloudflare.com/browser-run/quick-actions/screenshot-endpoint/#capture-a-screenshot-of-an-authenticated-page).

### Will Browser Run be detected by Bot Management?

Yes, Browser Run requests are always identified as bot traffic by Cloudflare. Cloudflare does not enforce bot protection by default — that is the customer's choice.

If you are attempting to scan your own zone and want Browser Run to access your website freely without your bot protection configuration interfering, you can create a WAF skip rule to [allowlist Browser Run](https://developers.cloudflare.com/browser-run/faq/#can-i-allowlist-browser-run-on-my-own-website).

### Can I allowlist Browser Run on my own website?

You must be on an Enterprise plan to allowlist Browser Run on your own website because WAF custom rules require access to [Bot Management](https://developers.cloudflare.com/bots/get-started/bot-management/) fields.

Browser Run uses different [bot detection IDs](https://developers.cloudflare.com/browser-run/reference/automatic-request-headers/#bot-detection) depending on the method. Use the ID that matches the method you want to allowlist.

1. In the Cloudflare dashboard, go to the **Security rules** page of your account and domain.  
[ Go to **Security rules** ](https://dash.cloudflare.com/?to=/:account/:zone/security/security-rules)
2. To create a new empty rule, select **Create rule** \> **Custom rules**.
3. Enter a descriptive name for the rule in **Rule name**, such as `Allow Browser Run`.
4. Under **When incoming requests match**, use the **Field** dropdown to choose _Bot Detection ID_. For **Operator**, select _equals_. For **Value**, enter the [bot detection ID](https://developers.cloudflare.com/browser-run/reference/automatic-request-headers/#bot-detection) for the method you want to allowlist.
5. Under **Then take action**, in the **Choose action** dropdown, select **Skip**.
6. Under **Place at**, select the order of the rule in the **Select order** dropdown to be **First**. Setting the order as **First** allows this rule to be applied before subsequent rules.
7. To save and deploy your rule, select **Deploy**.

### Does Browser Run rotate IP addresses for outbound requests?

No. Browser Run requests originate from Cloudflare's global network and you cannot configure per-request IP rotation. All rendering traffic comes from Cloudflare IP ranges and requests include [automatic headers](https://developers.cloudflare.com/browser-run/reference/automatic-request-headers/), such as `cf-biso-request-id` and `cf-biso-devtools` so origin servers can identify them.

### Is there a limit to how many requests a single browser session can handle?

There is no fixed limit on the number of requests per browser session. A single browser can handle multiple requests as long as it stays within available compute and memory limits.

### Can I use custom fonts in Browser Run?

Yes. If your webpage or PDF requires a font that is not pre-installed, you can load custom fonts at render time using `addStyleTag`. This works with [Quick Actions](https://developers.cloudflare.com/browser-run/quick-actions/), [Puppeteer](https://developers.cloudflare.com/browser-run/puppeteer/), and [Playwright](https://developers.cloudflare.com/browser-run/playwright/). For instructions and examples, refer to [Custom fonts](https://developers.cloudflare.com/browser-run/features/custom-fonts/).

### How can I manage concurrency and session isolation with Browser Run?

If you are hitting concurrency [limits](https://developers.cloudflare.com/browser-run/limits/#workers-paid), or want to optimize concurrent browser usage, here are a few tips:

* Optimize with tabs or shared browsers: Instead of launching a new browser for each task, consider opening multiple tabs or running multiple actions within the same browser instance.
* [Reuse sessions](https://developers.cloudflare.com/browser-run/features/reuse-sessions/): You can optimize your setup and decrease startup time by reusing sessions instead of launching a new browser every time. If you are concerned about maintaining test isolation (for example, for tests that depend on a clean environment), we recommend using [incognito browser contexts ↗](https://pptr.dev/api/puppeteer.browser.createbrowsercontext), which isolate cookies and cache with other sessions.

If you are still running into concurrency limits you can [request a higher limit ↗](https://forms.gle/CdueDKvb26mTaepa9).

---

## Security & Data Handling

### Does Cloudflare store or retain the HTML content I submit for rendering?

For [Quick Actions](https://developers.cloudflare.com/browser-run/quick-actions/) (except the [/crawl endpoint](https://developers.cloudflare.com/browser-run/quick-actions/crawl-endpoint/)), [Puppeteer](https://developers.cloudflare.com/browser-run/puppeteer/), [Playwright](https://developers.cloudflare.com/browser-run/playwright/), and [CDP](https://developers.cloudflare.com/browser-run/cdp/), Cloudflare processes content ephemerally and does not retain customer-submitted HTML or generated output (such as PDFs or screenshots) beyond what is required to perform the rendering operation. Once the response is returned, the content is immediately discarded from the rendering environment.

There are two exceptions where data is retained beyond the session:

* **Crawl endpoint**: The [/crawl Quick Actions endpoint](https://developers.cloudflare.com/browser-run/quick-actions/crawl-endpoint/) runs jobs asynchronously, so job results (including crawled page content in HTML, Markdown, or JSON format) are stored for 14 days after the job completes, after which the data is deleted. Crawl jobs have a maximum run time of seven days.
* **Session recording**: Puppeteer, Playwright, and CDP sessions support an opt-in [session recording](https://developers.cloudflare.com/browser-run/features/session-recording/) feature. When enabled, DOM changes, mouse and keyboard events, and page navigation are captured as structured JSON events and retained for 30 days. Input field content is masked by default. Recordings are accessible through the [dashboard](https://developers.cloudflare.com/browser-run/features/session-recording/#view-recordings) and [API](https://developers.cloudflare.com/browser-run/features/session-recording/#retrieve-a-recording-via-api), and are automatically deleted after the retention period.

### Is there any temporary caching of submitted content?

For [Quick Actions](https://developers.cloudflare.com/browser-run/quick-actions/) (except the [/crawl endpoint](https://developers.cloudflare.com/browser-run/quick-actions/crawl-endpoint/)), generated content is cached by default for five seconds (configurable up to one day via the `cacheTTL` parameter, or set to `0` to disable caching). This cache protects against repeated requests for the same URL by the same account. Customer-submitted HTML content itself is not cached.

For [Puppeteer](https://developers.cloudflare.com/browser-run/puppeteer/), [Playwright](https://developers.cloudflare.com/browser-run/playwright/), and [CDP](https://developers.cloudflare.com/browser-run/cdp/), no caching is used. Content exists only in memory for the duration of the rendering operation and is discarded immediately after the response is returned.

For the [/crawl endpoint](https://developers.cloudflare.com/browser-run/quick-actions/crawl-endpoint/), all crawl job results are stored in R2 for 14 days after completion.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/browser-run/faq/#page","headline":"Frequently asked questions about Cloudflare Browser Run · Cloudflare Browser Run docs","description":"Find answers to frequently asked questions about Browser Run, including errors, troubleshooting, and session management.","url":"https://developers.cloudflare.com/browser-run/faq/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/browser-run/","name":"Browser Run"}},{"@type":"ListItem","position":3,"item":{"@id":"/browser-run/faq/","name":"FAQ"}}]}
```
