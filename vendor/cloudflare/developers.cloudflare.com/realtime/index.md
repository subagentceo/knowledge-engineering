---
title: Cloudflare Realtime
description: Build scalable real-time applications with Cloudflare Realtime products including RealtimeKit, SFU, and TURN.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cloudflare Realtime

Cloudflare Realtime is a comprehensive suite of products designed to help you build powerful, scalable real-time applications.

### RealtimeKit

[RealtimeKit](https://developers.cloudflare.com/realtime/realtimekit/) is a set of SDKs and APIs that lets you add customizable live video and voice to web or mobile applications. It is fully customisable and lets you set up in just a few lines of code.

It sits on top of the Realtime SFU, abstracting away the heavy lifting of media routing, peer management, and other complex WebRTC operations.

### Realtime SFU

The [Realtime SFU (Selective Forwarding Unit)](https://developers.cloudflare.com/realtime/sfu/) is a powerful media server that efficiently routes video and audio. The Realtime SFU runs on [Cloudflare's global cloud network ↗](https://www.cloudflare.com/network/) in hundreds of cities worldwide.

For developers with WebRTC expertise, the SFU can be used independently to build highly custom applications that require full control over media streams. This is recommended only for those who want to leverage Cloudflare's network with their own WebRTC logic.

### TURN Service

The [TURN service](https://developers.cloudflare.com/realtime/turn/) is a managed service that acts as a relay for WebRTC traffic. It ensures connectivity for users behind restrictive firewalls or NATs by providing a public relay point for media streams.

## Choose the right Realtime product

Use this comparison table to quickly find the right Realtime product for your needs:

| **RealtimeKit**               | **Realtime SFU**                                                                                                                | **TURN Service**                                                                                                                                             |                                                                                                                         |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| **What is it**                | High-level SDKs and APIs with pre-built UI components for video/voice integration. Built on top of Realtime SFU.                | Low-level WebRTC media server (Selective Forwarding Unit) that routes audio/video/data streams between participants.                                         | Managed relay service for WebRTC traffic that ensures connectivity through restrictive firewalls and NATs.              |
| **Who is it for**             | Developers who want to quickly add video/voice features without handling WebRTC complexities.                                   | Developers with WebRTC expertise who need full control over media streams and want to build highly custom applications.                                      | Any WebRTC application needing reliable connectivity in restrictive network environments.                               |
| **Effort to get started**     | Low - Just a few lines of code with UI Kit and Core SDK.                                                                        | High - Requires deep WebRTC knowledge. No SDK provided (unopinionated). You manage sessions, tracks, and presence protocol. Works with every WebRTC library. | Low - Automatically used by WebRTC libraries (browser WebRTC, Pion, libwebrtc). No additional code needed.              |
| **WebRTC expertise required** | None - Abstracts away WebRTC complexities.                                                                                      | Expert - You handle all WebRTC logic yourself.                                                                                                               | None - Used transparently by WebRTC libraries.                                                                          |
| **Primitives**                | Meetings, Sessions, Participants, Presets (roles), Stage, Waiting Room                                                          | Sessions (PeerConnections), Tracks (MediaStreamTracks), pub/sub model - no rooms concept                                                                     | TURN allocations, relayed transport addresses, protocols (UDP/TCP/TLS)                                                  |
| **Key use cases**             | Team meetings, virtual classrooms, webinars, live streaming with interactive features, social video chat                        | Highly custom real-time apps, unique WebRTC architectures that don't fit standard patterns, leveraging Cloudflare's network with custom logic                | Ensuring connectivity for all users regardless of firewall/NAT configuration, used alongside SFU or peer-to-peer WebRTC |
| **Key features**              | Pre-built UI components, automatic track management, recording, chat, polls, breakout rooms, virtual backgrounds, transcription | Unopinionated architecture, no lock-in, globally scalable, full control over media routing, programmable "switchboard"                                       | Anycast routing to nearest location, multiple protocol options                                                          |
| **Pricing**                   | Pricing by minute [view details ↗](https://workers.cloudflare.com/pricing#media)                                                | $0.05/GB egress                                                                                                                                              | Free when used with Realtime SFU, otherwise $0.05/GB egress                                                             |
| **Free tier**                 | None                                                                                                                            | First 1,000 GB free each month                                                                                                                               | First 1,000 GB free each month                                                                                          |

## Related products

**[Workers AI](https://developers.cloudflare.com/workers-ai/)** 

Run machine learning models, powered by serverless GPUs, on Cloudflare’s global network.

**[Stream](https://developers.cloudflare.com/stream/)** 

Cloudflare Stream lets you or your end users upload, store, encode, and deliver live and on-demand video with one API, without configuring or maintaining infrastructure.

## More resources

[Developer Discord](https://discord.cloudflare.com) 

Connect with the Realtime community on Discord to ask questions, show what you are building, and discuss the platform with other developers.

[Use cases](https://developers.cloudflare.com/realtime/realtimekit/introduction#use-cases) 

Learn how you can build and deploy ambitious Realtime applications to Cloudflare's global network.

[@CloudflareDev](https://x.com/cloudflaredev) 

Follow @CloudflareDev on Twitter to learn about product announcements, and what is new in Cloudflare Realtime.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/#page","headline":"Overview · Cloudflare Realtime docs","description":"Build scalable real-time applications with Cloudflare Realtime products including RealtimeKit, SFU, and TURN.","url":"https://developers.cloudflare.com/realtime/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}}]}
```
