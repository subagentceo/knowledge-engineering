---
title: Features
description: Explore AI Gateway features including caching, rate limiting, guardrails, dynamic routing, and data loss prevention.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-gateway/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Features

AI Gateway provides a comprehensive set of features to help you build, deploy, and manage AI applications with confidence. From performance optimization to security and observability, these features work together to create a robust AI infrastructure.

## Core Features

### Performance & Cost Optimization

###  Caching 

Serve identical requests directly from Cloudflare's global cache, reducing latency by up to 90% and significantly cutting costs by avoiding repeated API calls to AI providers.

**Key benefits:**

* Reduced response times for repeated queries
* Lower API costs through cache hits
* Configurable TTL and per-request cache control
* Works across all supported AI providers

[ Use Caching ](https://developers.cloudflare.com/ai-gateway/features/caching/) 

###  Spend Limits 

Set cost-based budgets that track cumulative dollar spend across requests. Scope limits by model, provider, or custom metadata dimensions like user, team, or application.

**Key benefits:**

* Per-provider or per-model budgets
* Per-user or per-team budgets using [custom metadata](https://developers.cloudflare.com/ai-gateway/observability/custom-metadata/)
* Configurable time windows (daily, weekly, monthly)
* Automatic request blocking when budget is exceeded

[ Use Spend Limits ](https://developers.cloudflare.com/ai-gateway/features/spend-limits/) 

###  Rate Limiting 

Control application scaling and protect against abuse with flexible rate limiting options. Set limits based on requests per time window with sliding or fixed window techniques.

**Key benefits:**

* Prevent API quota exhaustion
* Control costs and usage patterns
* Configurable per gateway or per request
* Multiple rate limiting techniques available

[ Use Rate Limiting ](https://developers.cloudflare.com/ai-gateway/features/rate-limiting/) 

###  Dynamic Routing 

Create sophisticated request routing flows without code changes. Route requests based on user segments, geography, content analysis, or A/B testing requirements through a visual interface.

**Key benefits:**

* Visual flow-based configuration
* User-based and geographic routing
* A/B testing and fractional traffic splitting
* Context-aware routing based on request content
* Dynamic rate limiting with automatic fallbacks

[ Use Dynamic Routing ](https://developers.cloudflare.com/ai-gateway/features/dynamic-routing/) 

### Security & Safety

###  Guardrails 

Deploy AI applications safely with real-time content moderation. Automatically detect and block harmful content in both user prompts and model responses across all providers.

**Key benefits:**

* Consistent moderation across all AI providers
* Real-time prompt and response evaluation
* Configurable content categories and actions
* Compliance and audit capabilities
* Enhanced user safety and trust

[ Use Guardrails ](https://developers.cloudflare.com/ai-gateway/features/guardrails/) 

###  Data Loss Prevention (DLP) 

Protect your organization from inadvertent exposure of sensitive data through AI interactions. Scan prompts and responses for PII, financial data, and other sensitive information.

**Key benefits:**

* Real-time scanning of AI prompts and responses
* Detection of PII, financial, healthcare, and custom data patterns
* Configurable actions: flag or block sensitive content
* Integration with Cloudflare's enterprise DLP solution
* Compliance support for GDPR, HIPAA, and PCI DSS

[ Use Data Loss Prevention (DLP) ](https://developers.cloudflare.com/ai-gateway/features/dlp/) 

###  Authentication 

Secure your AI Gateway with token-based authentication. Control access to your gateways and protect against unauthorized usage.

**Key benefits:**

* Token-based access control
* Configurable per gateway
* Integration with Cloudflare's security infrastructure
* Audit trail for access attempts

[ Use Authentication ](https://developers.cloudflare.com/ai-gateway/configuration/authentication/) 

###  Bring Your Own Keys (BYOK) 

Securely store and manage AI provider API keys in Cloudflare's encrypted infrastructure. Remove hardcoded keys from your applications while maintaining full control.

**Key benefits:**

* Encrypted key storage at rest and in transit
* Centralized key management across providers
* Easy key rotation without code changes
* Support for 20+ AI providers
* Enhanced security and compliance

[ Use Bring Your Own Keys (BYOK) ](https://developers.cloudflare.com/ai-gateway/configuration/bring-your-own-keys/) 

### Observability & Analytics

###  Analytics 

Gain deep insights into your AI application usage with comprehensive analytics. Track requests, tokens, costs, errors, and performance across all providers.

**Key benefits:**

* Real-time usage metrics and trends
* Cost tracking and estimation across providers
* Error monitoring and troubleshooting
* Cache hit rates and performance insights
* GraphQL API for custom dashboards

[ Use Analytics ](https://developers.cloudflare.com/ai-gateway/observability/analytics/) 

###  Logging 

Capture detailed logs of all AI requests and responses for debugging, compliance, and analysis. Configure log retention and export options.

**Key benefits:**

* Complete request/response logging
* Configurable log retention policies
* Export capabilities via Logpush
* Custom metadata support
* Compliance and audit support

[ Use Logging ](https://developers.cloudflare.com/ai-gateway/observability/logging/) 

###  Custom Metadata 

Enrich your logs and analytics with custom metadata. Tag requests with user IDs, team information, or any custom data for enhanced filtering and analysis.

**Key benefits:**

* Enhanced request tracking and filtering
* User and team-based analytics
* Custom business logic integration
* Improved debugging and troubleshooting

[ Use Custom Metadata ](https://developers.cloudflare.com/ai-gateway/observability/custom-metadata/) 

### Advanced Configuration

###  Custom Costs 

Override default pricing with your negotiated rates or custom cost models. Apply custom costs at the request level for accurate cost tracking.

**Key benefits:**

* Accurate cost tracking with negotiated rates
* Per-request cost customization
* Better budget planning and forecasting
* Support for enterprise pricing agreements

[ Use Custom Costs ](https://developers.cloudflare.com/ai-gateway/configuration/custom-costs/) 

## Feature Comparison by Use Case

| Use Case                   | Recommended Features                               |
| -------------------------- | -------------------------------------------------- |
| **Cost Optimization**      | Caching, Spend Limits, Rate Limiting, Custom Costs |
| **High Availability**      | Fallbacks using Dynamic Routing                    |
| **Security & Compliance**  | Guardrails, DLP, Authentication, BYOK, Logging     |
| **Performance Monitoring** | Analytics, Logging, Custom Metadata                |
| **A/B Testing**            | Dynamic Routing, Custom Metadata, Analytics        |

## Getting Started with Features

1. **Start with the basics**: Enable [Caching](https://developers.cloudflare.com/ai-gateway/features/caching/) and [Analytics](https://developers.cloudflare.com/ai-gateway/observability/analytics/) for immediate benefits
2. **Add reliability**: Configure Fallbacks and Rate Limiting using [Dynamic routing](https://developers.cloudflare.com/ai-gateway/features/dynamic-routing/)
3. **Enhance security**: Implement [Guardrails](https://developers.cloudflare.com/ai-gateway/features/guardrails/), [DLP](https://developers.cloudflare.com/ai-gateway/features/dlp/), and [Authentication](https://developers.cloudflare.com/ai-gateway/configuration/authentication/)

---

_All features work seamlessly together and across all 20+ supported AI providers. Get started with [AI Gateway](https://developers.cloudflare.com/ai-gateway/get-started/) to begin using these features in your applications._

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/ai-gateway/features/#page","headline":"Features · Cloudflare AI Gateway docs","description":"Explore AI Gateway features including caching, rate limiting, guardrails, dynamic routing, and data loss prevention.","url":"https://developers.cloudflare.com/ai-gateway/features/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-gateway/","name":"AI Gateway"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-gateway/features/","name":"Features"}}]}
```
