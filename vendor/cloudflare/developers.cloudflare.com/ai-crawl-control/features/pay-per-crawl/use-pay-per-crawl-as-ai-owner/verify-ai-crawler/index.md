---
title: Verify your AI crawler
description: Verify your AI crawler identity for Pay Per Crawl.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ai-crawl-control/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Verify your AI crawler

graph LR
A[Set up your<br>Cloudflare Account] --> B[Verify your<br>AI crawler]:::highlight
B --> C[Discover<br>payable content]
C --> D[Connect to<br>Stripe]
D --> E[Crawl pages]
classDef highlight fill:#F6821F,color:white

Once you have connected your Stripe account, set up your AI crawler as a [verified bot](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/).

## Content access restriction

When an AI crawler tries to access content protected by pay per crawl, it receives a HTTP status code 402\. This indicates payment is required. The HTTP header of the response includes the cost of the content.

For example, the response header may look like below:

```

HTTP/2 402

date: Fri, 06 Jun 2025 08:42:38 GMT

content-type: text/plain; charset=utf-8

crawler-price: USD 0.01

server: cloudflare


```

To access this content, you must verify your AI crawler.

## 1\. Follow Web Bot Auth protocol

Ensure your AI crawler identifies itself with the required headers for Web Bot Auth.

Follow the steps found in [Web Both Auth](https://developers.cloudflare.com/bots/reference/bot-verification/web-bot-auth/).

## 2\. Follow verified bot policy

Ensure your AI crawler follows Cloudflare's [verified bots policy](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/policy/).

## 3\. Submit verification request

Submit a form to add your AI crawler to Cloudflare's list of verified bots.

1. In the Cloudflare dashboard, go to **Manage Account** \> **Settings**.  
[ Go to **Configurations** ](https://dash.cloudflare.com/?to=/:account/configurations)
2. Go to the **Bot Submission Form** tab.
3. Fill out the form with the following required information:  
   * **Select bot type**: Choose either **Verified Bot** or **Signed Agent**.  
   * **Verification Method**: Select **Request Signature**.  
   * **User-Agents header values**: Provide the User-Agent string(s) your bot uses.  
   * **User-Agents Match Pattern**: Provide substring patterns that match your User-Agent (for example, `GoogleBot | GoogleScraper`).
4. Select **Submit**.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-ai-owner/verify-ai-crawler/#page","headline":"Verify your AI crawler · Cloudflare AI Crawl Control docs","description":"Verify your AI crawler identity for Pay Per Crawl.","url":"https://developers.cloudflare.com/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-ai-owner/verify-ai-crawler/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ai-crawl-control/","name":"AI Crawl Control"}},{"@type":"ListItem","position":3,"item":{"@id":"/ai-crawl-control/features/","name":"Features"}},{"@type":"ListItem","position":4,"item":{"@id":"/ai-crawl-control/features/pay-per-crawl/","name":"Pay Per Crawl"}},{"@type":"ListItem","position":5,"item":{"@id":"/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-ai-owner/","name":"Use pay per crawl as an AI owner"}},{"@type":"ListItem","position":6,"item":{"@id":"/ai-crawl-control/features/pay-per-crawl/use-pay-per-crawl-as-ai-owner/verify-ai-crawler/","name":"Verify your AI crawler"}}]}
```
