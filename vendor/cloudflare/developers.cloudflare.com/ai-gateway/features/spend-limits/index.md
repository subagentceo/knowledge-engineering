---
title: Spend limits
description: Set cost-based budgets on your AI Gateway to control spending by model, provider, or custom metadata dimensions like user or team.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Spend limits

Spend limits let you set cost-based budgets on your AI Gateway. When cumulative spend reaches the limit within a time window, AI Gateway blocks further requests with a `429` response until the window resets.

Unlike [rate limiting](https://developers.cloudflare.com/ai-gateway/features/rate-limiting/), which caps the number of requests, spend limits track actual dollar cost per request based on model pricing. You can scope limits to any combination of model, provider, or [custom metadata](https://developers.cloudflare.com/ai-gateway/observability/custom-metadata/) dimensions like user ID, team, or application.

Spend limits apply to both [Unified Billing](https://developers.cloudflare.com/ai-gateway/features/unified-billing/) requests and [BYOK](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/) requests for models with known pricing.

Note

Unified Billing also has an account-level [spend limit](https://developers.cloudflare.com/ai-gateway/features/unified-billing/#spend-limits) on your loaded credits that applies across all gateways, but only to Unified Billing requests. Both limits are enforced independently — whichever one is reached first will block requests.

![Spend limits rules configured on a gateway](https://developers.cloudflare.com/_astro/spend-limits-rules.p6zy0Vea_1SihhE.webp) 

## How it works

Each spend limit rule defines a budget (in dollars) over a rolling or fixed time window. AI Gateway calculates the cost of each request based on token usage and model pricing, then tracks cumulative spend against the limit in real time.

Before sending a request to the provider, AI Gateway evaluates all applicable spend limit rules at once. If any individual rule is over budget, the request is blocked with a `429` response.

Spend limits are eventually consistent. The current request's cost is recorded after completion, so a burst of concurrent requests can briefly exceed the limit before enforcement catches up.

## Scoping with dimensions

Each rule can be scoped by model, provider, or custom metadata dimensions. Each dimension can be configured in one of two modes:

| Mode                | Behavior                                                          | Example                                                                                |
| ------------------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| **Split by value**  | Each distinct value gets its own independent budget bucket.       | Splitting by metadata.user\_id gives every user their own budget.                      |
| **Filter by value** | The rule applies only when the dimension equals a specific value. | Filtering metadata.team to engineering limits only requests from the engineering team. |

If a dimension is not configured on a rule, all values share one budget bucket. For example, a rule without a `provider` dimension tracks spend across all providers together.

### Dimension examples

Given a request with `model=openai/gpt-5.5` and `metadata.user_id=u_42`:

| Scenario                   | Dimensions                                                  | Budget bucket                                 |
| -------------------------- | ----------------------------------------------------------- | --------------------------------------------- |
| Global budget for everyone | None                                                        | One shared bucket                             |
| Per-user budget            | metadata.user\_id: split by value                           | Separate bucket per user                      |
| Per-provider, per-user     | metadata.user\_id: split by value, provider: split by value | Separate bucket per user+provider combination |
| Specific model only        | model: filter by value openai/gpt-5.5                       | Only applies to openai/gpt-5.5 requests       |
| Per-user, per-model        | metadata.user\_id: split by value, model: split by value    | Separate bucket per user+model combination    |

## Configure spend limits

Spend limits are configured on the gateway via the dashboard or the API. You can define up to 20 rules per gateway.

![Add spend limit rule form](https://developers.cloudflare.com/_astro/spend-limits-add-rule.BnBR5VIn_Z2oJ2T3.webp) 

To scope spend limits by custom dimensions like user ID or team, attach [custom metadata](https://developers.cloudflare.com/ai-gateway/observability/custom-metadata/) to your requests.

## Behavior when a limit is reached

When a spend limit is exceeded, AI Gateway returns a `429 Too Many Requests` response. You have two options:

* **Block requests** (default) - The request is rejected until the budget window resets.
* **Fall back to a cheaper model** \- Create a [Dynamic Route](https://developers.cloudflare.com/ai-gateway/features/dynamic-routing/) with a primary model and a fallback (for example, `anthropic/claude-opus-4.7` with a fallback to `@cf/moonshotai/kimi-k2.6`). Then set a spend limit on the primary model using this feature. When the primary model's budget is exceeded, AI Gateway automatically routes requests to the fallback model instead of blocking them.

## Monitoring spend

You can track your spend per model, provider, or any custom metadata attribute on the [Analytics dashboard](https://developers.cloudflare.com/ai-gateway/observability/analytics/). Use this to understand usage patterns and set informed budgets.

## Limitations

* Cost tracking is a best-effort estimation based on token counts and model pricing. Refer to your provider's dashboard for exact billing amounts.
* A maximum of 20 spend limit rules can be configured per gateway.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/features/spend-limits/#page","headline":"Spend limits · Cloudflare AI Gateway docs","description":"Set cost-based budgets on your AI Gateway to control spending by model, provider, or custom metadata dimensions like user or team.","url":"https://developers.cloudflare.com/ai-gateway/features/spend-limits/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/features/","name":"Features"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/features/spend-limits/","name":"Spend limits"}}]}
```
