---
title: Programmable Platforms
description: Workers for Platforms provide secure, scalable, cost-effective infrastructure for programmable platforms with global reach.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/reference-architecture/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Programmable Platforms

**Last reviewed:**  over 1 year ago 

## Introduction

A programmable platform allows customers to customize a product by writing code. Unlike traditional SaaS with fixed features, it enables users to extend functionality, deploy backend logic, and build full-stack experiences—all within the platform’s infrastructure.

Hosting the infrastructure for these platforms presents several challenges, including security, scalability, cost efficiency, and performance isolation. Allowing customers to run custom code introduces risks such as untrusted execution, potential abuse, and resource contention, all of which must be managed without compromising platform reliability. Running millions of single-tenant applications is inherently costly, making efficient resource utilization critical. The ability to scale workloads to zero when idle is key to ensuring economic viability while maintaining rapid startup times when demand spikes. Additionally, ensuring seamless global execution with low-latency performance requires a resilient, distributed architecture. Robust monitoring, debugging, and governance capabilities are also essential to provide visibility and control over customer-deployed code without restricting innovation.

[Workers for Platforms](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/) provides the ideal infrastructure for building programmable platforms by offering secure, isolated environments where customers can safely execute custom code at scale, with automatic scaling to zero and a globally distributed runtime that optimizes performance and cost.

## Core Architecture Components

The Workers for Platforms architecture consists of several key components that work together to provide a secure, scalable, and efficient solution for multi-tenant applications. In the following core concepts are outlined.

1. **Main Request Flow**: An overview over the a request flow in a programmable platform.
2. **Invocation & Metadata Flow**: commonly, incoming requests and enriched with metadata to provide the function invocation with relevant context or perform routing logic.
3. **Egress Control**: controlling outbound connections to ensure compliant behaviour.
4. **Utilizing Storage & Data Resources**: leveraging databases & storage to build even richer end-user experiences at scale.
5. **Observability Tools**: Logging and metrics collection services to monitor platform performance and troubleshoot issues.

## Main Request Flow

![Figure 1: Workers for Platforms: Main Flow](https://developers.cloudflare.com/_astro/programmable-platforms-1.BCCEhzLr_2d88FE.svg "Figure 1: Workers for Platforms: Main Flow")

Figure 1: Workers for Platforms: Main Flow

1. **Client Request**: Send request from a client application to the platform's [Dynamic Dispatch Worker](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/how-workers-for-platforms-works/#dynamic-dispatch-worker).
2. **Routing**: Identify the correct workload to execute and route the request to the respective [User Worker](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/how-workers-for-platforms-works/#user-workers) in the [Dispatch Namespace](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/how-workers-for-platforms-works/#dispatch-namespace). Each customer's workload runs in an isolated User Worker with its own resources and security boundaries.

## Invocation & Metadata Flow

![Figure 2: Workers for Platforms: Main Flow](https://developers.cloudflare.com/_astro/programmable-platforms-2.DGAT6ZDR_Z19nioR.svg "Figure 2: Workers for Platforms: Main Flow")

Figure 2: Workers for Platforms: Main Flow

For many use cases, it makes sense to retrieve additional metadata, user data, or configuration to process incoming requests and provide the User Worker invocation with additional context.

1. **Incoming Request**: Send requests to custom hostnames or a Worker using a Workers wildcard route.
2. **Metadata Lookup**: Retrieve customer-specific configuration data from [KV](https://developers.cloudflare.com/kv/) storage. These lookups are typically based on the hostname of the incoming request or custom metadata in the case of custom hostnames.
3. **Worker Invocation**: Route requests to the appropriate User Worker in the Dispatch Namespace based on metadata. Optionally, provide additional context during function invocation.

## Egress Control Pattern

![Figure 3: Workers for Platforms: Egress Control](https://developers.cloudflare.com/_astro/programmable-platforms-3.C-LkeZtS_Z19nioR.svg "Figure 3: Workers for Platforms: Egress Control")

Figure 3: Workers for Platforms: Egress Control

Data observability and control is crucial for security. [Outbound Workers](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/outbound-workers/) allow for interception of all outgoing requests in User Worker scripts.

1. **Worker Invocation**: Route requests to the appropriate User Worker in the Dispatch Namespace. Optionally pass additional parameters to the Outbound Worker during User Worker invocation.
2. **External requests**: Send requests via `fetch()` calls to external services through a controlled Outbound Worker.
3. **Request interception**: Evaluate outgoing requests and perform core functions like centralized policy enforcement and audit logging.

## Metrics & Logging Architecture

![Figure 4: Workers for Platforms: Metrics & Logging](https://developers.cloudflare.com/_astro/programmable-platforms-4.BoFSkvXQ_2iLi3x.svg "Figure 4: Workers for Platforms: Metrics & Logging")

Figure 4: Workers for Platforms: Metrics & Logging

1. **Logging**: Collect logs throughout all Workers in the request flow via [Tail Worker](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/observability/#tail-workers) and [Workers Trace Events Logpush](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/observability/#workers-trace-events-logpush) services.
2. **Metrics**: Collect custom metrics via [Workers Analytics Engine](https://developers.cloudflare.com/analytics/analytics-engine/) and out-of-the-box [Analytics](https://developers.cloudflare.com/analytics/graphql-api/) that can readily be queried via GraphQL API.
3. **Third-party Integration**: Export logs and metrics to various external monitoring and analytics platforms like Datadog, Splunk, Grafana, and others via [Analytics integrations](https://developers.cloudflare.com/analytics/analytics-integrations/).

## Resource Isolation Model

![Figure 5: Workers for Platforms: Resources](https://developers.cloudflare.com/_astro/programmable-platforms-5.B2yd7IjV_Z1IMWex.svg "Figure 5: Workers for Platforms: Resources")

Figure 5: Workers for Platforms: Resources

1. **Incoming Request**: Send requests to custom hostnames or a Worker using a Workers wildcard route.
2. **Worker Invocation**: Route requests to the appropriate User Worker in the Dispatch Namespace.
3. **Resource Access**: Interact with per-script-specific resources:  
   * D1 for relational database storage  
   * Durable Objects for strongly consistent data  
   * KV for high-read, eventually consistent key-value storage  
   * R2 for object storage

## Deployment & Management Flow

![Figure 6: Workers for Platforms: Deployment & Management Flow](https://developers.cloudflare.com/_astro/programmable-platforms-6.BfYznbr5_2d88FE.svg "Figure 6: Workers for Platforms: Deployment & Management Flow")

Figure 6: Workers for Platforms: Deployment & Management Flow

1. **Management Interface**: Interact with the platform through GUI, API, or CLI interfaces.
2. **Platform Processing**: Process these interactions to:  
   * Transform and bundle code  
   * Perform security checks  
   * Apply configuration
3. **Change Management**: Deploy changes to Cloudflare using the Cloudflare REST API.

## Conclusion

Cloudflare Workers for Platforms provides a robust foundation for building multi-tenant SaaS applications with strong isolation, global distribution, and scalable performance. By leveraging this architecture, platform providers can focus on delivering value to their customers while Cloudflare handles the underlying infrastructure complexity.

## Related resources

* [Workers for Platforms: Get started](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/get-started/)
* [Workers for Platforms: Outbound Workers](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/outbound-workers/)
* [Workers for Platforms: Observability](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/configuration/observability/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/reference-architecture/diagrams/serverless/programmable-platforms/#page","headline":"Programmable Platforms · Cloudflare Reference Architecture docs","description":"Workers for Platforms provide secure, scalable, cost-effective infrastructure for programmable platforms with global reach.","url":"https://developers.cloudflare.com/reference-architecture/diagrams/serverless/programmable-platforms/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/reference-architecture/","name":"Reference Architecture"}},{"@type":"ListItem","position":3,"item":{"@id":"/reference-architecture/diagrams/","name":"Reference Architecture Diagrams"}},{"@type":"ListItem","position":4,"item":{"@id":"/reference-architecture/diagrams/serverless/","name":"Serverless"}},{"@type":"ListItem","position":5,"item":{"@id":"/reference-architecture/diagrams/serverless/programmable-platforms/","name":"Programmable Platforms"}}]}
```
