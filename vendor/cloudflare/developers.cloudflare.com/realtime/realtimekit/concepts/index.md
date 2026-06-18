---
title: Concepts
description: Core concepts and terminology for RealtimeKit including apps, meetings, participants, and presets.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Concepts

This page outlines the core concepts and key terminology used throughout RealtimeKit.

### App

An App represents a **workspace** within RealtimeKit. It groups together your meetings, participants, presets, recordings, and other configuration under an isolated namespace.

Treat each App like an environment-specific container—most teams create one App for staging and another for production to avoid mixing data.

### Meeting

A Meeting is a **re-usable virtual room** that you can join anytime. Every time participants join a meeting, a new [session](https://developers.cloudflare.com/realtime/realtimekit/concepts#session) is created.

A session is marked `ENDED` shortly after the last participant leaves. A meeting can have only **one active session** at any given time.

For more information about meetings, refer to [Meetings](https://developers.cloudflare.com/realtime/realtimekit/concepts#meeting).

### Session

A Session is the **live instance of a meeting**. It is created when the first participant joins a meeting and ends shortly after the last participant leaves.

Each session is independent, with its own participants, chat, and recordings. It also inherits the configurations set while creating the meeting - `record on start`, `persist_chat`, and more.

Example - A recurring “Weekly Standup” **meeting will generate a new session** every time participants join.

### Participant

A **Participant** is created when you add a user to a meeting via the [Add participant API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/meetings/methods/add%5Fparticipant/). This API call returns a unique `authToken` that the client-side SDK uses to join the session and authenticate the user.

> **Note:** Please do not re-use auth tokens for participants.

For more information about participants, refer to [Participants](https://developers.cloudflare.com/realtime/realtimekit/concepts/participant/).

### Preset

A Preset is a reusable set of permissions that defines the experience and the UI’s look and feel for a participant.

Created at the App level, it can be applied to any participant across any meeting in that App.

It also defines the meeting type a user joins—video call, audio call, or webinar. Participants in the same meeting can use different presets to create flexible roles. Example: In a large ed-tech class:

* **Teacher** will join with a `webinar-host` preset, allowing them to share their media and providing host controls.
* **Students** will join with a `webinar-participant` preset, which restricts them from sharing media but allows them to use features like chat.
* **Teaching assistant** will join with a `group-call-host` preset, enabling them to share their media but not have full control.

It also lets you customize the UI’s look and feel, including colors and themes, so the experience matches your application's branding.

For more information about presets, refer to [Presets](https://developers.cloudflare.com/realtime/realtimekit/concepts/preset/).

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/concepts/#page","headline":"Concepts · Cloudflare Realtime docs","description":"Core concepts and terminology for RealtimeKit including apps, meetings, participants, and presets.","url":"https://developers.cloudflare.com/realtime/realtimekit/concepts/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/concepts/","name":"Concepts"}}]}
```
