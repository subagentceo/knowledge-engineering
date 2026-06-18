---
title: Manage Recording Config Precedence Order
description: Learn how to manage recording configuration hierarchy with RealtimeKit's capabilities. Follow our guide for effective hierarchy management.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Manage Recording Config Precedence Order

This document provides an overview of the precedence structure for managing recording configurations within our system. It explains how various configuration levels interact and prioritize settings. The recording configuration can be defined at three different levels:

* [Start recording a meeting API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/recordings/methods/start%5Frecordings/)
* [Create a meeting API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/meetings/methods/create/)
* Specified via [Cloudflare RealtimeKit Dashboard ↗](https://dash.cloudflare.com/?to=/:account/realtime/kit)

## Understand Recording Configuration Precedence

To comprehend the precedence of recording configurations, it is important to delve into the following details. This understanding becomes crucial when dealing with multiple configurations set through APIs and the developer portal.

| Precedence | Config                                                                                                                                            | Description                                                                                                                                           |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1          | [Start recording API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/recordings/methods/start%5Frecordings/) configs | Highest priority in the system. Any settings defined here will take precedence over other configurations.                                             |
| 2          | [Create a meeting API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/meetings/methods/create/) configs              | Second level of priority in the system. Settings here will supersede Org level config but not Start recording a meeting API configs.                  |
| 3          | Specified via Dashboard                                                                                                                           | Lowest priority in the system. Settings defined here will be overridden by both Start recording a meeting API config and Create a meeting API config. |

## Example Scenario

To illustrate the precedence order in action, consider the following scenario for the same meeting:

1. Org Level Config specifies that recordings to be stored in the Cloudflare R2 bucket.
2. Create a Meeting API sets recordings to be stored in the AWS S3 storage bucket using the H264 codec.
3. Start recording a meeting API is configured to store recordings in the GCS bucket using the VP8 codec.

In this scenario, the Start recording a meeting API takes precedence over the Create a Meeting API Config and Org Level Config. As a result, the meeting's recording will be stored in the GCS bucket using VP8 codec, regardless of the defaults set at other levels.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/recording-guide/manage-recording-config-hierarchy/#page","headline":"Manage Recording Config Precedence Order · Cloudflare Realtime docs","description":"Learn how to manage recording configuration hierarchy with RealtimeKit's capabilities. Follow our guide for effective hierarchy management.","url":"https://developers.cloudflare.com/realtime/realtimekit/recording-guide/manage-recording-config-hierarchy/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/recording-guide/","name":"Recording"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/recording-guide/manage-recording-config-hierarchy/","name":"Manage Recording Config Precedence Order"}}]}
```
