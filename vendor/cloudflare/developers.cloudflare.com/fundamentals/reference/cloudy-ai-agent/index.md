---
title: Cloudy AI agent (beta)
description: Cloudy is Cloudflare's AI agent that helps you understand and optimize your Cloudflare configurations across multiple products.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cloudy AI agent (beta)

Cloudy is Cloudflare's first version of an AI agent, with assistant-like functionality designed to help users understand and improve their Cloudflare configurations in multiple areas of the product suite.

Cloudy is powered by [Workers AI](https://developers.cloudflare.com/workers-ai/) and helps identify and solve issues such as identifying redundant rules, optimizing execution order, analyzing conflicting rules, and identifying disabled rules. Cloudy can also help investigate threat events and provide actionable recommendations.

## Availability

Cloudy, currently in beta, is available in several Cloudflare products such as WAF, Zero Trust, and Analytics. Throughout the rest of 2025, Cloudflare plans to roll out additional AI agent capabilities across other areas of Cloudflare.

Send us your feedback

We want to hear your thoughts as you get to meet Cloudy and try out these new AI features. You can send feedback to us at [cloudyfeedback@cloudflare.com](mailto:cloudyfeedback@cloudflare.com). Your feedback will help shape our roadmap for AI enhancement, and bring our users smarter, more efficient tooling that helps everyone get more secure.

## What data does Cloudy have access to?

Cloudy has access to your Cloudflare configuration. It combines this data with a purpose-built LLM prompt.

Additionally, Cloudy takes Role-Based Access Control (RBAC) restrictions into account: it can only access the same Cloudflare configuration settings as the currently logged in user, based on their [roles and permissions](https://developers.cloudflare.com/fundamentals/manage-members/roles/).

All your configuration information is only included in the purpose-built prompt — it is not used to train Cloudy or the LLM model(s) powering it.

## Is Cloudy trained on user or customer data?

No. Your Cloudflare configuration is used in the purpose-built prompt that enables Cloudy to turn raw configuration data into consistent, clear summaries and actionable recommendations.

Cloudy does not share your Cloudflare configuration with other customers. Your configuration is also not used for LLM model training.

Cloudy brings the same enterprise-grade security as the rest of Cloudflare's offerings. You can learn more about Cloudflare's approach to responsible AI in the [Trust Hub ↗](https://www.cloudflare.com/trust-hub/responsible-ai/).

## Can I opt out of Cloudy?

Currently, Cloudflare does not provide an opt out mechanism that completely disables all possible use of Cloudy. You can only opt out of the chat interface available in the Cloudflare dashboard.

However, Cloudy is an entirely optional tool that you can choose not to use. By not using Cloudy, you will not get summaries based on your current configuration or any actionable recommendations.

To opt out of the chat interface, do the following:

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/) and select your account.
2. Go to **Manage Account** \> **Configurations**.
3. Turn off the **Cloudy features** setting.

As noted above, Cloudy is not trained on user or customer data and does not share your Cloudflare setup with other customers.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/reference/cloudy-ai-agent/#page","headline":"Cloudy AI agent (beta) · Cloudflare Fundamentals docs","description":"Cloudy is Cloudflare's AI agent that helps you understand and optimize your Cloudflare configurations across multiple products.","url":"https://developers.cloudflare.com/fundamentals/reference/cloudy-ai-agent/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/reference/cloudy-ai-agent/","name":"Cloudy AI agent (beta)"}}]}
```
