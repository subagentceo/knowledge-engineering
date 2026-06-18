---
title: Errors
description: Reference table of Workers AI error codes, HTTP statuses, and descriptions.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Errors

Below is a list of Workers AI errors.

| **Name**                              | **Internal Code** | **HTTP Code** | **Description**                                                                                                                                      |
| ------------------------------------- | ----------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| No such model                         | 5007              | 400           | No such model ${model} or task                                                                                                                       |
| Invalid data                          | 5004              | 400           | Invalid data type for base64 input: ${type}                                                                                                          |
| Finetune missing required files       | 3039              | 400           | Finetune is missing required files (model.safetensors and config.json)                                                                               |
| Incomplete request                    | 3003              | 400           | Request is missing headers or body: {what}                                                                                                           |
| Account not allowed for private model | 5018              | 403           | The account is not allowed to access this model                                                                                                      |
| Model agreement                       | 5016              | 403           | User has not agreed to Llama3.2 model terms                                                                                                          |
| Account blocked                       | 3023              | 403           | Service unavailable for account                                                                                                                      |
| Account not allowed for private model | 3041              | 403           | The account is not allowed to access this model                                                                                                      |
| Deprecated SDK version                | 5019              | 405           | Request trying to use deprecated SDK version                                                                                                         |
| LoRa unsupported                      | 5005              | 405           | The model ${this.model} does not support LoRa inference                                                                                              |
| Invalid model ID                      | 3042              | 404           | The model name is invalid                                                                                                                            |
| Request too large                     | 3006              | 413           | Request is too large                                                                                                                                 |
| Timeout                               | 3007              | 408           | Request timeout                                                                                                                                      |
| Aborted                               | 3008              | 408           | Request was aborted                                                                                                                                  |
| Account limited                       | 3036              | 429           | You have used up your daily free allocation of 10,000 neurons. Please upgrade to Cloudflare's Workers Paid plan if you would like to continue usage. |
| Out of capacity                       | 3040              | 429           | No more data centers to forward the request to                                                                                                       |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/platform/errors/#page","headline":"Errors · Cloudflare Workers AI docs","description":"Reference table of Workers AI error codes, HTTP statuses, and descriptions.","url":"https://developers.cloudflare.com/workers-ai/platform/errors/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/platform/","name":"Platform"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers-ai/platform/errors/","name":"Errors"}}]}
```
