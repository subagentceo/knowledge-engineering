---
title: Media Transport Adapters
description: Bridge WebRTC and other transport protocols using Realtime SFU media adapters.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Media Transport Adapters

Media Transport Adapters bridge WebRTC and other transport protocols. Adapters handle protocol conversion, codec transcoding, and bidirectional media flow between WebRTC sessions and external endpoints.

## What adapters do

Adapters extend Realtime beyond WebRTC-to-WebRTC communication:

* Ingest audio/video from external sources into WebRTC sessions
* Stream WebRTC media to external systems for processing or storage
* Integrate with AI services for transcription, translation, or generation
* Bridge WebRTC applications with legacy communication systems

## Available adapters

### WebSocket adapter (beta)

Stream audio and video between WebRTC tracks and WebSocket endpoints. Video is egress-only and is converted to JPEG. Currently in beta; the API may change.

[Learn more](https://developers.cloudflare.com/realtime/sfu/media-transport-adapters/websocket-adapter/)

## Architecture

Media Transport Adapters operate as intermediaries between Cloudflare Realtime SFU sessions and external endpoints:

graph LR
    A[WebRTC Client] <--> B[Realtime SFU Session]
    B <--> C[Media Transport Adapter]
    C <--> D[External Endpoint]

### Key concepts

**Adapter instance**: Each connection creates a unique instance with an `adapterId` to manage its lifecycle.

**Location types**:

* `local` (Ingest): Receives media from external endpoints to create new WebRTC tracks
* `remote` (Stream): Sends media from existing WebRTC tracks to external endpoints

**Codec support**: Adapters convert between WebRTC and external system formats.

## Common use cases

### AI processing

* Speech-to-text transcription
* Text-to-speech generation
* Real-time translation
* Audio enhancement

### Media recording

* Cloud recording
* Content delivery networks
* Media processing pipelines

### Legacy integration

* Traditional telephony
* Broadcasting infrastructure
* Custom media servers

## API overview

Media Transport Adapters are managed through the Realtime SFU API:

```

POST /v1/apps/{appId}/adapters/{adapterType}/new

POST /v1/apps/{appId}/adapters/{adapterType}/close


```

Each adapter type has specific configuration requirements and capabilities. Refer to individual adapter documentation for detailed API specifications.

## Best practices

* Close adapter instances when no longer needed
* Implement reconnection logic for network failures
* Choose codecs based on bandwidth and quality requirements
* Secure endpoints with authentication for sensitive media

## Limitations

* Each adapter type has specific codec and format support
* Network latency between Cloudflare edge and external endpoints affects real-time performance
* Maximum message size and streaming modes vary by adapter type

## Get started

[WebSocket adapter (beta)](https://developers.cloudflare.com/realtime/sfu/media-transport-adapters/websocket-adapter/) \- Stream audio and video between WebRTC and WebSocket endpoints (video egress to JPEG)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/sfu/media-transport-adapters/#page","headline":"Media Transport Adapters · Cloudflare Realtime docs","description":"Bridge WebRTC and other transport protocols using Realtime SFU media adapters.","url":"https://developers.cloudflare.com/realtime/sfu/media-transport-adapters/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/sfu/","name":"Realtime SFU"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/sfu/media-transport-adapters/","name":"Media Transport Adapters"}}]}
```
