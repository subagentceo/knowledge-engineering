---
title: Fullstack applications
description: A practical example of how these services come together in a real fullstack application architecture.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/reference-architecture/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Fullstack applications

**Last reviewed:**  9 months ago 

Fullstack web applications combine frontend and backend technologies to deliver complete, dynamic user experiences. These applications rely on a broad technology stack covering user interfaces, backend services, databases, integrations, and increasingly, AI-driven features to function seamlessly and scale reliably.

On the frontend, developers typically use HTML, CSS, and JavaScript, often alongside frameworks like React, Next.js, or Angular. These tools provide the structure and interactivity needed for modern user interfaces, helping manage state, render dynamic content, personalize experiences, and optimize performance across devices.

On the backend, server-side code handles tasks like processing requests, running business logic, authenticating users, integrating AI models, and interacting with databases. Developers build these services using languages like JavaScript, Python, or Java, supported by frameworks that simplify routing, middleware, and API creation.

Databases are critical in the stack, storing and retrieving application data. Relational databases like MySQL, PostgreSQL, and SQLite manage structured data and enforce data integrity, while NoSQL options like MongoDB or Cassandra offer flexibility for handling unstructured or large-scale datasets.

Modern fullstack development increasingly incorporates external services, APIs, pre-built components, and AI capabilities. This approach reduces the need to create complex features from scratch, such as content moderation, personalized recommendations, and semantic search. As a result, development teams can build applications more quickly and efficiently.

Cloudflare’s Developer Platform combines all these capabilities into a unified, globally distributed environment, offering developers everything they need to build, deploy, and scale modern fullstack applications with minimal operational overhead.

![Figure 1: Cloudflare Developer Platform](https://developers.cloudflare.com/_astro/developer-platform.g69XQgmR_2k3mC0.svg "Figure 1: Cloudflare Developer Platform")

Figure 1: Cloudflare Developer Platform

Cloudflare’s platform doesn’t just offer individual services. Rather, it offers a **composable ecosystem**, enabling teams to build powerful applications quickly, scale seamlessly, and innovate faster without the overhead of managing infrastructure.

## Fullstack application diagram

In this section, we’ll present a practical example of how these services come together in a real fullstack application architecture.

![Figure 2: Fullstack application](https://developers.cloudflare.com/_astro/fullstack-app-base.CZswu8qh_2IOYQ.svg "Figure 2: Fullstack application")

Figure 2: Fullstack application

### 1\. Client

Sends requests to the server. This could be through a desktop or mobile browser, or native or mobile app.

### 2\. Security

Process incoming requests to ensure the security of an application. This includes encryption of traffic using [SSL/TLS](https://developers.cloudflare.com/ssl/), offering [DDOS protection](https://developers.cloudflare.com/ddos-protection/), filtering malicious traffic through a [web application firewall (WAF)](https://developers.cloudflare.com/waf/), [mitigations against automated bots](https://developers.cloudflare.com/bots/), and [API Shield](https://developers.cloudflare.com/api-shield/) to identify and address your API vulnerabilities. Depending on the configuration, requests can be blocked, logged, or allowed based on a diverse set of parameters. Sensible fully managed and default configurations can be used to reduce attack surfaces with little to no overhead.

### 3\. Performance

Serve static requests from [global cache (CDN)](https://developers.cloudflare.com/cache/). This reduces latency and lowers resource utilization, as the requests are being served from cache instead of requiring a request to storage & media services or compute services. Take advantage of [Argo Smart Routing](https://developers.cloudflare.com/argo-smart-routing/) to route requests across the most efficient network path, avoiding congestion.

### 4\. Compute

Process dynamic requests using serverless compute with [Workers](https://developers.cloudflare.com/workers/). This could include authentication, routing, middleware, database interactions, and serving APIs. Moreover, [Workers Assets](https://developers.cloudflare.com/workers/static-assets/) can be used to serve client-side or server-side rendering web frameworks such as React, Next.js, or Angular. Utilize [Workers for Platforms](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/) to allow users to deploy custom code on your platform or enable them to deploy their own code directly. For stateful workloads, [Durable Objects](https://developers.cloudflare.com/durable-objects/) provide low-latency, stateful compute by running logic close to where the object's data is stored, enabling coordination, persistence, and real-time communication at the edge.

For workloads that require the flexibility of traditional containerization, [Containers](https://developers.cloudflare.com/containers/) allows you to run existing Docker-compatible applications on Cloudflare’s global network. Containers is designed for applications needing more resources than a standard Worker.

### 5\. Data & Storage

Introduce state to applications by persisting and retrieving data. This includes [R2](https://developers.cloudflare.com/r2/) for object storage, [D1](https://developers.cloudflare.com/d1/) for relational data, [KV](https://developers.cloudflare.com/kv/) for data with high read requirements and [Durable Objects](https://developers.cloudflare.com/durable-objects/) for strongly consistent data storage. The [storage options guide](https://developers.cloudflare.com/workers/platform/storage-options/) can help to assess which storage option is the most suitable for a given use case.

### 6\. Realtime content & Media

Build real-time serverless video, audio, and data applications with [Realtime](https://developers.cloudflare.com/realtime/). Serve optimized images from [Images](https://developers.cloudflare.com/images/) and on-demand videos as well as live streams from [Stream](https://developers.cloudflare.com/stream/).

### 7\. AI

With [Workers AI](https://developers.cloudflare.com/workers-ai/), developers can run popular open-source models for tasks like text generation, image analysis, and content moderation powered by serverless GPUs. [Vectorize](https://developers.cloudflare.com/vectorize/) is a globally distributed vector database for similarity search, personalization, and recommendation features. [Agents](https://developers.cloudflare.com/agents/) further extend AI capabilities - Cloudflare provides the Agents SDK that lets you build and deploy AI-powered agents that can perform tasks, interact in real time, call models, manage state, run workflows, query data, and integrate human-in-the-loop actions.

### 8\. Orchestration & Abstraction

[Queues](https://developers.cloudflare.com/queues/) enable durable, asynchronous messaging to decouple services and handle traffic spikes. [Workflows](https://developers.cloudflare.com/workflows/) orchestrate complex processes across APIs, services, and human approvals, abstracting away infrastructure and state management. [Pipelines](https://developers.cloudflare.com/pipelines/) let you ingest high volumes of real time data, without managing any infrastructure.

### 9\. Cloudflare Observability

Send logs from all services with [Logpush](https://developers.cloudflare.com/logs/logpush/), gather insights with [Workers Logs](https://developers.cloudflare.com/workers/observability/logs/) directly in the Cloudflare dashboard, collect custom metrics from Workers using [Workers Analytics Engine](https://developers.cloudflare.com/analytics/analytics-engine/), or observe and control AI applications with [AI Gateway](https://developers.cloudflare.com/ai-gateway/).

### 10\. External Logs & Analytics

Integrate Cloudflare's observability solutions with your existing third-party solutions. Logpush supports many [destinations](https://developers.cloudflare.com/logs/logpush/logpush-job/enable-destinations/) to push logs to for storage and further analysis. Also, Cloudflare analytics can be [integrated with analytics solutions](https://developers.cloudflare.com/analytics/analytics-integrations/). The [GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/) allows for flexible queries and integrations.

### 11\. Tooling & Provisioning

Define and manage resources and configuration using third-party tools and frameworks such as [Terraform](https://developers.cloudflare.com/terraform/) and [Pulumi](https://developers.cloudflare.com/pulumi/), Cloudflare's Developer Platform command-line interface (CLI) [Wrangler](https://developers.cloudflare.com/workers/wrangler/), or the [Cloudflare API](https://developers.cloudflare.com/api/). All of these tools can be used either for manual provisioning, or automated as part of CI/CD pipelines.

### 12\. External Service Integrations

Cloudflare’s Developer Platform is built for seamless [integration with external services](https://developers.cloudflare.com/workers/configuration/integrations/). Whether connecting to third-party APIs, databases, SaaS platforms, or cloud providers, developers can easily make outbound requests from Workers, trigger workflows based on external events, and securely exchange data across systems.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/reference-architecture/diagrams/serverless/fullstack-application/#page","headline":"Fullstack applications · Cloudflare Reference Architecture docs","description":"A practical example of how these services come together in a real fullstack application architecture.","url":"https://developers.cloudflare.com/reference-architecture/diagrams/serverless/fullstack-application/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2025-10-13","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/reference-architecture/","name":"Reference Architecture"}},{"@type":"ListItem","position":3,"item":{"@id":"/reference-architecture/diagrams/","name":"Reference Architecture Diagrams"}},{"@type":"ListItem","position":4,"item":{"@id":"/reference-architecture/diagrams/serverless/","name":"Serverless"}},{"@type":"ListItem","position":5,"item":{"@id":"/reference-architecture/diagrams/serverless/fullstack-application/","name":"Fullstack applications"}}]}
```
