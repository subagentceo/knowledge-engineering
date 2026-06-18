---
title: Limits &amp; pricing
description: Limits &amp; pricing for Workers Builds
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Limits & pricing

Workers Builds has the following limits.

| Metric                            | Free plan                              | Paid plans                                 |
| --------------------------------- | -------------------------------------- | ------------------------------------------ |
| **Build minutes**                 | 3,000 per month                        | 6,000 per month (then, +$0.005 per minute) |
| **Concurrent builds**             | 1                                      | 6                                          |
| **Build timeout**                 | 20 minutes                             | 20 minutes                                 |
| **Deploy Hooks**                  | 10/min per Worker, 100/min per account | 10/min per Worker, 100/min per account     |
| **CPU**                           | 2 vCPU                                 | 4 vCPU                                     |
| **Memory**                        | 8 GB                                   | 8 GB                                       |
| **Disk space**                    | 20 GB                                  | 20 GB                                      |
| **Environment variables**         | 64                                     | 64                                         |
| **Size per environment variable** | 5 KB                                   | 5 KB                                       |

## Definitions

* **Build minutes**: The number of minutes that it takes to build a project.
* **Concurrent builds**: The number of builds that can run in parallel across an account.
* **Build timeout**: The amount of time that a build can be run before it is terminated.
* **Deploy Hooks**: The rate limit for builds triggered by [Deploy Hooks](https://developers.cloudflare.com/workers/ci-cd/builds/deploy-hooks/).
* **vCPU**: The number of CPU cores available to your build.
* **Memory**: The amount of memory available to your build.
* **Disk space**: The amount of disk space available to your build.
* **Environment variables**: The number of custom environment variables you can configure per Worker.
* **Size per environment variable**: The maximum size for each individual environment variable.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/ci-cd/builds/limits-and-pricing/#page","headline":"Limits & pricing · Cloudflare Workers docs","description":"Limits & pricing for Workers Builds","url":"https://developers.cloudflare.com/workers/ci-cd/builds/limits-and-pricing/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-05-29","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/ci-cd/","name":"CI/CD"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/ci-cd/builds/","name":"Builds"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers/ci-cd/builds/limits-and-pricing/","name":"Limits & pricing"}}]}
```
