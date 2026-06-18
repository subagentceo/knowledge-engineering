---
title: General FAQ
description: Review frequently asked questions about Cloudflare Logs.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/logs/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# General FAQ

[❮ Back to FAQ](https://developers.cloudflare.com/logs/faq/)

### Once a request has passed through the Cloudflare network, how soon are the logs available?

When using **Logpush**, logs are pushed in batches as soon as possible. For example, if you receive a file at 10:10, the file consists of logs that were processed before 10:10.

When using **Logpull**, logs become available in approximately one to five minutes. Cloudflare requires that calls to the **Logpull API** to be for time periods of at least one minute in the past. For example, if it is 9:43 now, you can ask for logs processed between 9:41 and 9:42\. The response will include logs for requests that passed through our network between 9:41 and 9:42 and potentially earlier. Usually Cloudflare's processing takes between three and four minutes, so when you ask for that same time period, you may also see logs of requests that passed through our network at 9:39 or earlier.

These timings are only a guideline, not a guarantee, and may depend on network conditions, the request volume for your domain, and other factors. Although we try to get the logs to you as fast as possible, we prioritize not losing log data over speed. On rare occasions, you may experience a longer delay. In this case, you do not need to take any action. The logs will be available as soon as they are processed.

### Are logs available for customers who are not on an Enterprise plan?

Not yet, but we are planning to make them available to other customer plans in the future.

### When pulling or pushing logs, I occasionally come across a time period with no data, even though I am sure my domain received requests at that time. Is this an expected behavior?

Yes. The time period for which you pull or receive logs is based on our processing time, not the time the requests passed through our network. Empty responses do not mean there were no requests during that time period, just that we did not process any logs for your domain during that time.

### Can I receive logs in a format other than JSON?

Not at this time. Talk to your Cloudflare account team or [Cloudflare Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/) if you are interested in other formats and we will consider them for the future.

### Is it possible to track cache purge requests in the logs?

Yes, since Nov 25, 2025 [Audit Log v2](https://developers.cloudflare.com/fundamentals/account/account-security/audit-logs/).

### At which stage are HTTP requests logged?

Requests are logged only after they successfully reach our proxy. It means that requests failing during the TCP or TLS handshake between the client and the Cloudflare proxy will not be available in the logs.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/logs/faq/general-faq/#page","headline":"General FAQ · Cloudflare Logs docs","description":"Review frequently asked questions about Cloudflare Logs.","url":"https://developers.cloudflare.com/logs/faq/general-faq/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/logs/","name":"Logs"}},{"@type":"ListItem","position":3,"item":{"@id":"/logs/faq/","name":"FAQ"}},{"@type":"ListItem","position":4,"item":{"@id":"/logs/faq/general-faq/","name":"General FAQ"}}]}
```
