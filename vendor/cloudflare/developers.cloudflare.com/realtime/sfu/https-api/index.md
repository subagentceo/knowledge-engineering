---
title: Connection API
description: Manage Realtime SFU sessions and media tracks using the HTTPS connection API.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Connection API

Cloudflare Realtime simplifies the management of peer connections and media tracks through HTTPS API endpoints. These endpoints allow developers to efficiently manage sessions, add or remove tracks, and gather session information.

## API Endpoints

* **Create a New Session**: Initiates a new session on Cloudflare Realtime, which can be modified with other endpoints below.  
   * `POST /apps/{appId}/sessions/new`
* **Add a New Track**: Adds a media track (audio or video) to an existing session.  
   * `POST /apps/{appId}/sessions/{sessionId}/tracks/new`
* **Renegotiate a Session**: Updates the session's negotiation state to accommodate new tracks or changes in the existing ones.  
   * `PUT /apps/{appId}/sessions/{sessionId}/renegotiate`
* **Close a Track**: Removes a specified track from the session.  
   * `PUT /apps/{appId}/sessions/{sessionId}/tracks/close`
* **Retrieve Session Information**: Fetches detailed information about a specific session.  
   * `GET /apps/{appId}/sessions/{sessionId}`

[View full API and schema (OpenAPI format)](https://developers.cloudflare.com/realtime/static/realtime-api-2024-05-21.yaml)

## Handling Secrets

It is vital to manage App ID and its secret securely. While track and session IDs can be public, they should be protected to prevent misuse. An attacker could exploit these IDs to disrupt service if your backend server does not authenticate request origins properly, for example by sending requests to close tracks on sessions other than their own. Ensuring the security and authenticity of requests to your backend server is crucial for maintaining the integrity of your application.

## Using STUN and TURN Servers

Cloudflare Realtime is designed to operate efficiently without the need for TURN servers in most scenarios, as Cloudflare exposes a publicly routable IP address for Realtime. However, integrating a STUN server can be necessary for facilitating peer discovery and connectivity.

* **Cloudflare STUN Server**: `stun.cloudflare.com:3478`

Utilizing Cloudflare's STUN server can help the connection process for Realtime applications.

## Lifecycle of a Simple Session

This section provides an overview of the typical lifecycle of a simple session, focusing on audio-only applications. It illustrates how clients are notified by the backend server as new remote clients join or leave, incorporating video would introduce additional tracks and considerations into the session.

sequenceDiagram
    participant WA as WebRTC Agent
    participant BS as Backend Server
    participant CA as Realtime API

    Note over BS: Client Joins

    WA->>BS: Request
    BS->>CA: POST /sessions/new
    CA->>BS: newSessionResponse
    BS->>WA: Response

    WA->>BS: Request
    BS->>CA: POST /sessions/<ID>/tracks/new (Offer)
    CA->>BS: newTracksResponse (Answer)
    BS->>WA: Response

    WA-->>CA: ICE Connectivity Check
    Note over WA: iceconnectionstatechange (connected)
    WA-->>CA: DTLS Handshake
    Note over WA: connectionstatechange (connected)

    WA<<->>CA: *Media Flow*

    Note over BS: Remote Client Joins

    WA->>BS: Request
    BS->>CA: POST /sessions/<ID>/tracks/new
    CA->>BS: newTracksResponse (Offer)
    BS->>WA: Response

    WA->>BS: Request
    BS->>CA: PUT /sessions/<ID>/renegotiate (Answer)
    CA->>BS: OK
    BS->>WA: Response

    Note over BS: Remote Client Leaves

    WA->>BS: Request
    BS->>CA: PUT /sessions/<ID>/tracks/close
    CA->>BS: closeTracksResponse
    BS->>WA: Response

    Note over BS: Client Leaves

    WA->>BS: Request
    BS->>CA: PUT /sessions/<ID>/tracks/close
    CA->>BS: closeTracksResponse
    BS->>WA: Response

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/sfu/https-api/#page","headline":"Connection API · Cloudflare Realtime docs","description":"Manage Realtime SFU sessions and media tracks using the HTTPS connection API.","url":"https://developers.cloudflare.com/realtime/sfu/https-api/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/sfu/","name":"Realtime SFU"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/sfu/https-api/","name":"Connection API"}}]}
```
