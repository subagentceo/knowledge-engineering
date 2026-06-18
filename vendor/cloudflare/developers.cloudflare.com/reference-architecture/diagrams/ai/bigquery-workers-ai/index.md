---
title: Ingesting BigQuery Data into Workers AI
description: You can connect a Cloudflare Worker to get data from Google BigQuery and pass it to Workers AI, to run AI Models, powered by serverless GPUs.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/reference-architecture/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Ingesting BigQuery Data into Workers AI

**Last reviewed:**  over 1 year ago 

You can connect a Cloudflare Worker to get data from Google BigQuery and pass it to Workers AI, to run AI Models, powered by serverless GPUs. This will allow you to enhance data with AI-generated responses, such as detecting the sentiment score of some text or generating tags for an article. This document describes a simple way to get started if you are looking to give Workers AI a try and see how the [new and different AI models](https://developers.cloudflare.com/workers-ai/models/) would perform with your data hosted in BigQuery.

## User-based approach

This version of the integration is aimed at workflows that require interaction with users to fetch data or generate ad-hoc reports.

![Figure 1: Ingesting Google BigQuery Data into Workers AI \(user-based\)](https://developers.cloudflare.com/_astro/user-based-architecture.C4nsq5nK_ZsDllv.svg "Figure 1: Ingesting Google BigQuery Data into Workers AI (user-based)")

Figure 1: Ingesting Google BigQuery Data into Workers AI (user-based)

1. A user makes a request to a [Worker ↗](https://workers.cloudflare.com/) endpoint. (Which can optionally incorporate [Access](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) in front of it to authenticate users).
2. Worker fetches [securely stored](https://developers.cloudflare.com/workers/configuration/secrets/) Google Cloud Platform service account information such as service key and generates a JSON Web Token to issue an authenticated API request to BigQuery.
3. Worker receives the data from BigQuery and [transforms it into a format](https://developers.cloudflare.com/workers-ai/guides/tutorials/using-bigquery-with-workers-ai/#6-format-results-from-the-query) that will make it easier to iterate when interacting with Workers AI.
4. Using its [native integration](https://developers.cloudflare.com/workers-ai/configuration/bindings/) with Workers AI, the Worker forwards the data from BigQuery which is then run against one of Cloudflare's hosted AI models.
5. The original data retrieved from BigQuery alongside the AI-generated information is returned to the user as a response to the request initiated in step 1.

## Cron-triggered approach

For periodic or longer workflows, you may opt for a batch approach. This diagram also explores more products where you can use the data ingested from BigQuery. It relies on [Cron Triggers](https://developers.cloudflare.com/workers/configuration/cron-triggers/), which are built into the Developer Platform and available for free when using Workers to schedule initialization of workloads.

![Figure 2: Ingesting Google BigQuery Data into Workers AI \(cron-triggered\)](https://developers.cloudflare.com/_astro/scheduled-based-architecture.DkGnVQUK_RrEDE.svg "Figure 2: Ingesting Google BigQuery Data into Workers AI (cron-triggered)")

Figure 2: Ingesting Google BigQuery Data into Workers AI (cron-triggered)

1. [A Cron Trigger](https://developers.cloudflare.com/workers/configuration/cron-triggers/) invokes the Worker without any user interaction.
2. Worker fetches [securely stored](https://developers.cloudflare.com/workers/configuration/secrets/) Google Cloud Platform service account information such as service key and generates a JSON Web Token to issue an authenticated API request to BigQuery.
3. Worker receives the data from BigQuery and [transforms it into a format](https://developers.cloudflare.com/workers-ai/guides/tutorials/using-bigquery-with-workers-ai/#6-format-results-from-the-query) that will make it easier to iterate when interacting with Workers AI.
4. Using its [native integration](https://developers.cloudflare.com/workers-ai/configuration/bindings/) with Workers AI, the Worker forwards the data from BigQuery to generate some content related to it.
5. Optionally, you can store the BigQuery data and the AI-generated data in a variety of different Cloudflare services.  
   * Into [D1](https://developers.cloudflare.com/d1/), a SQL database.  
   * If in step four you used Workers AI to generate embeddings, you can store them in [Vectorize](https://developers.cloudflare.com/vectorize/). To learn more about this type of solution, please consider reviewing the reference architecture diagram on [Retrieval Augmented Generation](https://developers.cloudflare.com/reference-architecture/diagrams/ai/ai-rag/).  
   * To [Workers KV](https://developers.cloudflare.com/kv/) if the output of your data will be stored and consumed in a key/value fashion.  
   * If you prefer to save the data fetched from BigQuery and Workers AI into objects (such as images, files, JSONs), you can use [R2](https://developers.cloudflare.com/r2/), our egress-free object storage to do so.
6. You can set up an integration so a system or a user gets notified whenever a new result is available or if an error occurs. It's also worth mentioning that Workers by themselves can already provide additional [observability](https://developers.cloudflare.com/workers/observability/).  
   * Sending an email with all the data retrieved and generated in the previous step is possible using [Email Routing](https://developers.cloudflare.com/email-service/api/send-emails/workers-api/).  
   * Since Workers allows you to issue HTTP requests, you can notify a webhook or API endpoint once the process finishes or if there's an error.

## Related resources

* [Tutorial: Using BigQuery with Workers AI](https://developers.cloudflare.com/workers-ai/guides/tutorials/using-bigquery-with-workers-ai/)
* [Workers AI: Get Started](https://developers.cloudflare.com/workers-ai/get-started/workers-wrangler/)
* [Workers: Secrets](https://developers.cloudflare.com/workers/configuration/secrets/)
* [Workers: Cron Triggers](https://developers.cloudflare.com/workers/runtime-apis/handlers/scheduled/)
* [Email Routing](https://developers.cloudflare.com/email-service/api/send-emails/workers-api/)
* [Create a GCP service account ↗](https://cloud.google.com/iam/docs/service-accounts-create#iam-service-accounts-create-console)
* [Create a GCP service account key ↗](https://cloud.google.com/iam/docs/keys-create-delete#iam-service-account-keys-create-console)
* [Retrieval Augmented Generation (RAG) Reference Architecture](https://developers.cloudflare.com/reference-architecture/diagrams/ai/ai-rag/)
* [Vectorize](https://developers.cloudflare.com/vectorize/)
* [Workers KV](https://developers.cloudflare.com/kv/)
* [R2](https://developers.cloudflare.com/r2/)
* [D1](https://developers.cloudflare.com/d1/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/reference-architecture/diagrams/ai/bigquery-workers-ai/#page","headline":"Ingesting BigQuery Data into Workers AI · Cloudflare Reference Architecture docs","description":"You can connect a Cloudflare Worker to get data from Google BigQuery and pass it to Workers AI, to run AI Models, powered by serverless GPUs.","url":"https://developers.cloudflare.com/reference-architecture/diagrams/ai/bigquery-workers-ai/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-06-09","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/reference-architecture/","name":"Reference Architecture"}},{"@type":"ListItem","position":3,"item":{"@id":"/reference-architecture/diagrams/","name":"Reference Architecture Diagrams"}},{"@type":"ListItem","position":4,"item":{"@id":"/reference-architecture/diagrams/ai/","name":"Artificial Intelligence (AI)"}},{"@type":"ListItem","position":5,"item":{"@id":"/reference-architecture/diagrams/ai/bigquery-workers-ai/","name":"Ingesting BigQuery Data into Workers AI"}}]}
```
