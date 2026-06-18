---
title: AI
description: Add AI-powered transcription and summarization to RealtimeKit meetings.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# AI

RealtimeKit provides AI-powered features using Cloudflare's AI infrastructure to enhance your meetings with transcription and summarization capabilities.

* [ Transcription ](https://developers.cloudflare.com/realtime/realtimekit/ai/transcription/)
* [ Summary ](https://developers.cloudflare.com/realtime/realtimekit/ai/summary/)

## Available features

| Feature                                                                                   | Description                               |
| ----------------------------------------------------------------------------------------- | ----------------------------------------- |
| [Transcription](https://developers.cloudflare.com/realtime/realtimekit/ai/transcription/) | Real-time and post-meeting speech-to-text |
| [Summary](https://developers.cloudflare.com/realtime/realtimekit/ai/summary/)             | AI-generated meeting summaries            |

## Quick start

Turn on post-meeting transcription and automatic summaries when creating a meeting:

```

{

  "title": "Team Standup",

  "transcribe_on_end": true,

  "summarize_on_end": true,

  "ai_config": {

    "transcription": {

      "language": "en"

    },

    "summarization": {

      "word_limit": 500,

      "text_format": "markdown",

      "summary_type": "team_meeting"

    }

  }

}


```

Use `transcribe_on_end` for post-meeting transcripts. Use `summarize_on_end` for AI-generated summaries. For real-time transcription, make sure participants have `transcription_enabled: true` in their [preset](https://developers.cloudflare.com/realtime/realtimekit/concepts/preset/).

## Storage and retention

* Transcripts and summaries are stored for **7 days** after the meeting ends
* Files are stored in R2 with presigned URLs for secure access
* Delivered via [webhooks](https://developers.cloudflare.com/realtime/realtimekit/webhooks/) or REST API

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ai/#page","headline":"AI · Cloudflare Realtime docs","description":"Add AI-powered transcription and summarization to RealtimeKit meetings.","url":"https://developers.cloudflare.com/realtime/realtimekit/ai/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-08","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ai/","name":"AI"}}]}
```
