---
title: Session Lifecycle
description: Understand the lifecycle of a peer in a RealtimeKit session from setup to disconnect.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Session Lifecycle

The [Session Guide](https://developers.cloudflare.com/realtime/realtimekit/concepts/meeting/#session) explains what a session is and how to initialize one. In this guide we will talk about what happens to a peer as they move through a session, when do they go to the setup screen, waitlist screen, ended screen or any other screen, and how you can hook into these events to perform custom actions.

### Lifecycle of a Peer in a Session

![Peer Lifecycle In a Session](https://developers.cloudflare.com/_astro/peer-lifecycle.ChUtQdVP_ZyBseL.svg) 

Here’s how the peer lifecycle works:

1. **Initialization state**: When the SDK is initialized, the peer first sees a Setup Screen, where they can preview their audio and video before joining.
2. **Join intent**: When the peer decides to join, one of two things happens:  
   * If waitlisting is enabled, they are moved to a Waitlist and see a Waitlist screen.  
   * If not waitlisted, they join the session and see the main Meeting screen (Stage), where they can interact with others.
3. **During the session**: The peer can see and interact with others in the main Meeting screen (Stage).
4. **Session transitions**:  
   * If the peer is rejected from the waitlist, they see a dedicated Rejected screen.  
   * If the peer is kicked out, they see an Ended screen and the session ends for them.  
   * If the peer leaves voluntarily, or if the meeting ends, they see an Ended screen, and the session ends for them.

Each of these screens is built with UI Kit components, which you can fully customize to match your app’s design and requirements.

The UI Kit SDKs automatically handle which notifications or screens to show at each state, so you don’t have to manage these transitions manually.

In upcoming pages, we will see how to hook into these events to perform custom actions and to build your own custom meeting experience.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/concepts/session-lifecycle/#page","headline":"Session Lifecycle · Cloudflare Realtime docs","description":"Understand the lifecycle of a peer in a RealtimeKit session from setup to disconnect.","url":"https://developers.cloudflare.com/realtime/realtimekit/concepts/session-lifecycle/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/concepts/","name":"Concepts"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/concepts/session-lifecycle/","name":"Session Lifecycle"}}]}
```
