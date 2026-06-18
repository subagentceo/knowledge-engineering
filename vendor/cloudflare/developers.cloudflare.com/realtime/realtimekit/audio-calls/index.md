---
title: Audio Only Calls
description: Build audio-only experiences like voice rooms and support lines with RealtimeKit.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Audio Only Calls

RealtimeKit supports voice calls, allowing you to build audio-only experiences such as audio rooms, support lines, or community hangouts. In these meetings, participants use their microphones and hear others, but cannot use their camera. Voice meetings reduce bandwidth requirements and focus on audio communication.

## How Audio Calls Work

A participant’s meeting experience is determined by the **Preset** applied to that participant. To run a voice meeting, ensure all participants join with a Preset that has meeting type set to `Voice`.

For details on Presets and how to configure them, refer to [Preset](https://developers.cloudflare.com/realtime/realtimekit/concepts/preset/).

## Pricing

When a participant joins with a `Voice` meeting type Preset, they are considered an **Audio-Only Participant** for billing. This is different from the billing for Audio/Video Participants.

For detailed pricing information, refer to [Pricing](https://developers.cloudflare.com/realtime/realtimekit/pricing/).

## Building Audio Experiences

You can build voice meeting experiences using either the UI Kit or the Core SDK.

### UI Kit

UI Kit provides a pre-built meeting experience with customization options.

When participants join with a `Voice` meeting type Preset, UI Kit automatically renders a voice-only interface. You can use the default meeting UI or build your own UI using UI Kit components.

To get started, refer to [Build using UI Kit](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/).

### Core SDK

Core SDK provides full control to build custom audio-only interfaces. Video-related APIs are non-functional for participants with `Voice` type Presets.

To get started, refer to [Build using Core SDK](https://developers.cloudflare.com/realtime/realtimekit/core/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/audio-calls/#page","headline":"Audio Only Calls · Cloudflare Realtime docs","description":"Build audio-only experiences like voice rooms and support lines with RealtimeKit.","url":"https://developers.cloudflare.com/realtime/realtimekit/audio-calls/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/audio-calls/","name":"Audio Only Calls"}}]}
```
