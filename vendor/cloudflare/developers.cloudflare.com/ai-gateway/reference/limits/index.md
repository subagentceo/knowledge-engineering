---
title: Limits
description: Review AI Gateway limits for gateways, log storage, cache size, metadata entries, and Logpush jobs.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Limits

The following limits apply to gateway configurations, logs, and related features in Cloudflare's platform.

## Gateway and log limits

| Feature                                                                                                | Limit                                     |
| ------------------------------------------------------------------------------------------------------ | ----------------------------------------- |
| [Cacheable request size](https://developers.cloudflare.com/ai-gateway/features/caching/)               | 25 MB per request                         |
| [Cache TTL](https://developers.cloudflare.com/ai-gateway/features/caching/#cache-ttl-cf-aig-cache-ttl) | 1 month                                   |
| [Custom metadata](https://developers.cloudflare.com/ai-gateway/observability/custom-metadata/)         | 5 entries per request                     |
| [Datasets](https://developers.cloudflare.com/ai-gateway/evaluations/set-up-evaluations/)               | 10 per gateway                            |
| Gateways free plan                                                                                     | 10 per account                            |
| Gateways paid plan                                                                                     | 20 per account                            |
| Gateway name length                                                                                    | 64 characters                             |
| Log storage rate limit                                                                                 | 500 logs per second per gateway           |
| [Unified Billing](https://developers.cloudflare.com/ai-gateway/features/unified-billing/) request rate | 200 requests per 60 seconds per gateway 4 |
| Logs stored [paid plan](https://developers.cloudflare.com/ai-gateway/reference/pricing/)               | 10 million per gateway 1                  |
| Logs stored [free plan](https://developers.cloudflare.com/ai-gateway/reference/pricing/)               | 100,000 per account 2                     |
| [Log size stored](https://developers.cloudflare.com/ai-gateway/observability/logging/)                 | 10 MB per log 3                           |
| [Logpush jobs](https://developers.cloudflare.com/ai-gateway/observability/logging/logpush/)            | 4 per account                             |
| [Logpush size limit](https://developers.cloudflare.com/ai-gateway/observability/logging/logpush/)      | 1MB per log                               |

1 When you reach the log storage limit for a gateway, you can configure your gateway to either automatically delete the oldest logs to make room for new ones, or stop saving new logs. You can also use[Logpush](https://developers.cloudflare.com/ai-gateway/observability/logging/logpush/) to export logs to external storage. Refer to [Automatic log deletion](https://developers.cloudflare.com/ai-gateway/observability/logging/#automatic-log-deletion)for more details.

2 On the free plan, the log storage limit applies to total logs across all gateways in your account. Same auto-delete or stop-saving behavior as 1.

3 Logs larger than 10 MB will not be stored.

4 This rate limit applies to requests that use Cloudflare-managed credentials through [Unified Billing](https://developers.cloudflare.com/ai-gateway/features/unified-billing/). When the limit is exceeded, AI Gateway returns a `429` error. This limit does not apply to requests that use your own provider keys through [bring your own keys (BYOK)](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/).

## DLP limits

[DLP](https://developers.cloudflare.com/ai-gateway/features/dlp/) for AI Gateway uses shared [Cloudflare One DLP profiles](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/). The following limits apply to DLP profiles and detection entries at the account level:

| Feature                                  | Limit     |
| ---------------------------------------- | --------- |
| Custom entries                           | 25        |
| Exact Data Match cells per spreadsheet   | 100,000   |
| Custom Wordlist keywords per spreadsheet | 200       |
| Custom Wordlist keywords per account     | 1,000     |
| Dataset cells per account                | 1,000,000 |

DLP profiles are shared with Cloudflare One and are not coupled to individual gateways. You can apply the same DLP profiles across multiple gateways without additional profile limits. There is no separate limit on the number of DLP policies per gateway.

Need a higher limit?

To request an increase to a limit, complete the [Limit Increase Request Form ↗](https://forms.gle/cuXu1QnQCrSNkkaS8). If the limit can be increased, Cloudflare will contact you with next steps.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/reference/limits/#page","headline":"Limits · Cloudflare AI Gateway docs","description":"Review AI Gateway limits for gateways, log storage, cache size, metadata entries, and Logpush jobs.","url":"https://developers.cloudflare.com/ai-gateway/reference/limits/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-27","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/reference/","name":"Platform"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/reference/limits/","name":"Limits"}}]}
```
