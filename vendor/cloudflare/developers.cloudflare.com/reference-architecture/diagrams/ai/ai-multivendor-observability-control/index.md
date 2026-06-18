---
title: Multi-vendor AI observability and control
description: By shifting features such as rate limiting, caching, and error handling to the proxy layer, organizations can apply unified configurations across services and inference service providers.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/reference-architecture/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Multi-vendor AI observability and control

**Last reviewed:**  about 2 years ago 

## Introduction

The AI landscape is rapidly evolving with new models, services, and applications emerging daily. Many developers and organizations seek to enhance agility by opting for inference-as-a-service solutions like [Workers AI](https://developers.cloudflare.com/workers-ai/), rather than developing or managing models themselves.

Inference-as-a-Service is a cloud-based model that allows users to deploy and execute AI without managing underlying infrastructure. The platform handles all aspects of model serving, including scaling resources based on demand, often-times supporting both real-time and batch inference. Users can send input data to the model via API calls, with the service provider managing servers, scaling, and maintenance tasks. Typically operating on a pay-as-you-go model, inference services simplify model deployment and scaling, enabling organizations to leverage AI capabilities without infrastructure complexities.

As this field evolves rapidly, developers and organizations face several challenges:

* Fragmentation: Many inference service providers offer only a limited range of models and features. Different use cases may require multiple vendors, leading to fragmentation.
* Availability: With increasing demand and fast-paced technological advancements, inference service providers struggle to maintain high API availability.
* Lack of observability: Providers often offer limited analytics and logging capabilities, which vary across vendors. Gaining a unified view of AI usage proves challenging.
* Lack of security control: Organizations encounter difficulties in maintaining adequate security measures.
* Lack of cost control: Understanding usage insights can be challenging, and the absence of custom rate limits poses risks in public-facing AI use cases.

Using a forward proxy can mitigate these challenges. Positioned between the service making inference requests and the inference service platform, it serves as a single point for observability and control. By shifting features such as rate limiting, caching, and error handling to the proxy layer, organizations can apply unified configurations across services and inference service providers.

## AI forward proxy setup

The following architecture illustrates the setup of [AI Gateway](https://developers.cloudflare.com/ai-gateway/) as a forward proxy between a service and one or multiple AI inference providers, such as [Workers AI](https://developers.cloudflare.com/workers-ai/)

![Figure 1: Multi-vendor AI architecture](https://developers.cloudflare.com/_astro/ai-multi-vendor-observability-control.DprqSV76_MTyHF.svg "Multi-vendor AI architecture")

Multi-vendor AI architecture

1. **Inference request**: Send POST request to your AI gateway.
2. **Request proxying**: Forward `POST` request to AI Inference provider or serve response from [cache, if enabled and available](https://developers.cloudflare.com/ai-gateway/features/caching). During this process, both [analytics](https://developers.cloudflare.com/ai-gateway/observability/analytics/) and [logs](https://developers.cloudflare.com/ai-gateway/observability/logging/) are collected. Additionally, controls such as Rate Limiting are enforced.
3. **Error handling**: In case of errors, retry request or fallback to other inference provider, depending on configuration.

## Related resources

* [AI Gateway: Get started](https://developers.cloudflare.com/ai-gateway/get-started/)
* [AI Gateway: Supported Providers](https://developers.cloudflare.com/ai-gateway/usage/providers/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/reference-architecture/diagrams/ai/ai-multivendor-observability-control/#page","headline":"Multi-vendor AI observability and control · Cloudflare Reference Architecture docs","description":"By shifting features such as rate limiting, caching, and error handling to the proxy layer, organizations can apply unified configurations across services and inference service providers.","url":"https://developers.cloudflare.com/reference-architecture/diagrams/ai/ai-multivendor-observability-control/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/reference-architecture/","name":"Reference Architecture"}},{"@type":"ListItem","position":3,"item":{"@id":"/reference-architecture/diagrams/","name":"Reference Architecture Diagrams"}},{"@type":"ListItem","position":4,"item":{"@id":"/reference-architecture/diagrams/ai/","name":"Artificial Intelligence (AI)"}},{"@type":"ListItem","position":5,"item":{"@id":"/reference-architecture/diagrams/ai/ai-multivendor-observability-control/","name":"Multi-vendor AI observability and control"}}]}
```
