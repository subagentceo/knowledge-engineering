---
title: Pricing
description: RealtimeKit pricing for audio, video, recording, and transcription features.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Pricing

Cloudflare RealtimeKit is currently in Beta and is available at no cost during this period.

When RealtimeKit reaches general availability (GA), usage will be charged according to the pricing model below:

| Feature                                               | Price                                 |
| ----------------------------------------------------- | ------------------------------------- |
| Audio/Video Participant                               | $0.002 / minute                       |
| Audio-Only Participant                                | $0.0005 / minute                      |
| Export (recording, RTMP or HLS streaming)             | $0.010 / minute                       |
| Export (recording, RTMP or HLS streaming, audio only) | $0.003 / minute                       |
| Export (Raw RTP) into R2                              | $0.0005 / minute                      |
| Transcription (Real-time)                             | Standard model pricing via Workers AI |

Whether a participant is an audio-only participant or an audio/video participant is determined by the `Meeting Type` of their [preset](https://developers.cloudflare.com/realtime/realtimekit/concepts/preset/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/pricing/#page","headline":"Pricing · Cloudflare Realtime docs","description":"RealtimeKit pricing for audio, video, recording, and transcription features.","url":"https://developers.cloudflare.com/realtime/realtimekit/pricing/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-12","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/pricing/","name":"Pricing"}}]}
```
