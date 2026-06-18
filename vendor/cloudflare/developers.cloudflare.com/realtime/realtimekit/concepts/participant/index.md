---
title: Participant
description: Add and manage participants in RealtimeKit meetings with tokens and presets.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Participant

Before a user can join a meeting through the RealtimeKit SDK, your backend must add that user as a participant to that meeting using the [Add Participant API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/meetings/methods/add%5Fparticipant/). In RealtimeKit, a **participant** represents a user who is allowed to join a specific meeting.

You can think of this as enrolling a student into a classroom. The meeting is the classroom, and adding a participant is how you register a user so that they are allowed to attend.

When you add a participant, you also choose which [preset](https://developers.cloudflare.com/realtime/realtimekit/concepts/preset/) to apply. The preset defines the role, permissions, and meeting experience of that participant.

### Participant tokens

When you add a participant to a meeting using the [Add Participant](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/meetings/methods/add%5Fparticipant/) API endpoint, it returns:

* A participant `id` that identifies this participant within the meeting.
* An authentication `token` for that participant.

Your backend should make it available to your frontend application. When the user chooses to join the meeting, the frontend passes the token to the RealtimeKit SDK.

RealtimeKit uses the token to authenticate the participant and determine which meeting and which participant is joining. Without a valid authentication token, the SDK cannot join the meeting on behalf of that participant. As long as a participant has a valid authentication token, that participant can join multiple live sessions of the same meeting over time.

### Token validity and refresh

Participant authentication tokens are time bound and eventually expire. When a token expires, you do not need to create a new participant for the same user in the meeting.

Instead, your backend can call the [Refresh Participant Token](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/meetings/methods/refresh%5Fparticipant%5Ftoken/) API endpoint. This endpoint issues a new authentication token for the existing participant record, keeping details such as the participant `id` and preset the same.

### Custom participant identifier

When adding the participant, you can optionally provide a custom participant identifier, referred to as `custom_participant_id`. This value is purely for your use. RealtimeKit stores it and returns it in APIs, but does not use it to control access. It allows you to map your application's user to RealtimeKit participant and to correlate RealtimeKit session data, events or analytics with user information in your system.

Note

**Do not** use personal data such as email address, phone number, or any other personally identifiable information as `custom_participant_id`. Use a stable internal identifier from your own system, such as a numeric user id or UUID.

### Where to Go Next

After understanding participants, you can explore the following topics:

* Learn how [Presets](https://developers.cloudflare.com/realtime/realtimekit/concepts/preset) define roles and permissions for participants
* [Get started with RealtimeKit SDKs](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/)

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/concepts/participant/#page","headline":"Participant · Cloudflare Realtime docs","description":"Add and manage participants in RealtimeKit meetings with tokens and presets.","url":"https://developers.cloudflare.com/realtime/realtimekit/concepts/participant/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/concepts/","name":"Concepts"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/concepts/participant/","name":"Participant"}}]}
```
