---
title: Pricing
description: Review AI Gateway pricing, including free core features, persistent log storage limits, and premium add-ons.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Pricing

AI Gateway is available to use on all plans.

AI Gateway's core features available today are offered for free, and all it takes is a Cloudflare account and one line of code to [get started](https://developers.cloudflare.com/ai-gateway/get-started/). Core features include: dashboard analytics, caching, and rate limiting.

We will continue to build and expand AI Gateway. Some new features may be additional core features that will be free while others may be part of a premium plan. We will announce these as they become available.

You can monitor your usage in the AI Gateway dashboard.

## Persistent logs

Persistent logs are available on all plans. Log storage limits vary by plan.

### Log storage limits

| Plan         | Log storage limit                      |
| ------------ | -------------------------------------- |
| Workers Free | 100,000 logs total across all gateways |
| Workers Paid | 10,000,000 logs per gateway            |

For more details on log storage behavior and automatic log deletion, refer to [Limits](https://developers.cloudflare.com/ai-gateway/reference/limits/) and [Logging](https://developers.cloudflare.com/ai-gateway/observability/logging/#automatic-log-deletion).

## Data Loss Prevention (DLP)

DLP scanning in AI Gateway is free on all plans. Accounts without a Zero Trust subscription have access to two predefined [DLP profiles](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/dlp-profiles/): Financial Information and Social / Insurance / National Identifier Numbers.

DLP profiles are shared at the account level with [Cloudflare One](https://developers.cloudflare.com/cloudflare-one/data-loss-prevention/). If your account has a Zero Trust subscription that includes DLP, the full set of profiles — including all predefined profiles, custom profiles, integration profiles, DLP datasets, and OCR — is automatically available in AI Gateway.

## Guardrails

[Guardrails](https://developers.cloudflare.com/ai-gateway/features/guardrails/) evaluates prompts and responses using [@cf/meta/llama-guard-3-8b](https://developers.cloudflare.com/workers-ai/models/llama-guard-3-8b/) on Workers AI. Usage is billed as [Workers AI](https://developers.cloudflare.com/workers-ai/platform/pricing/) token-based inference — cost scales with the length of the prompts and responses being evaluated.

## Unified Billing

A 5% fee is applied to all credits purchased through [Unified Billing](https://developers.cloudflare.com/ai-gateway/features/unified-billing/). For example, a $100 credit purchase will result in a $105 charge. Inference pricing from providers is passed through with no markup — you pay the same per-token rates as you would directly with the provider.

## Logpush

Logpush is only available on the Workers Paid plan.

| Paid plan |                                    |
| --------- | ---------------------------------- |
| Requests  | 10 million / month, +$0.05/million |

## Pricing notes

Prices subject to change. If you are an Enterprise customer, reach out to your account team to confirm pricing details.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-gateway/reference/pricing/#page","headline":"Pricing · Cloudflare AI Gateway docs","description":"Review AI Gateway pricing, including free core features, persistent log storage limits, and premium add-ons.","url":"https://developers.cloudflare.com/ai-gateway/reference/pricing/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-19","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/reference/","name":"Platform"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-gateway/reference/pricing/","name":"Pricing"}}]}
```
