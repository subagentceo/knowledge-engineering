---
title: Preset
description: Configure participant roles, permissions, and meeting experience with RealtimeKit presets.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Preset

A Preset is a **re-usable configuration** that defines a participant’s experience in a Meeting. It determines:

* The meeting type they join (Video, Audio, or Webinar)
* Actions they can perform (permissions and controls)
* The UI’s look and feel, including colors and themes, so the experience matches your application's branding.

Presets belong to an App, and they are applied to participants — not to meetings.

You can assign the same Preset to multiple participants when creating them through the Add Participant API. Participants in the same Meeting can have different Presets, allowing each user to have a distinct role and experience.

Example: Large Ed-Tech Classroom

* **Teacher** uses the `webinar-host` preset — they can share media and access host controls.
* **Students** use the `webinar-participant` preset — they cannot share media but can use features like chat.
* **Teaching** assistant uses the `group-call-host` preset — they can share media but don’t have full host privileges.

### Create a Preset

A set of default presets are created for you, when you create an app via the [Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/realtime/kit).

You can also create a preset using the [dashboard ↗](https://dash.cloudflare.com/?to=/:account/realtime/kit) or the [Create Preset API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/presets/methods/create/).

Terminal window

```

curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/presets \

    -H 'Content-Type: application/json' \

    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

    -d '{

          "config": {

            ...<preset-configuration-json>

        }'


```

### Preset Editor

We provide a UI-based editor to create and manage the presets in the [Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/realtime/kit).

![Preset Editor](https://developers.cloudflare.com/_astro/preset-editor.CoEtzs7E_2guRTO.webp) 

The permissions are divided into the following categories:

* **Host Controls:** These permissions allow the user to control the meeting, manage participants, and perform administrative actions like kicking users, muting video/audio for others and more.
* **Stage Management:** Large meetings can be configured with a virtual stage. Participants on the stage can share their audio and video, while participants off the stage can view this media and still use features like chat, polls, and plugins.  
Users can request to join the stage, host can add/remove users from the stage at any point. Read more about stage management in [Meetings](https://developers.cloudflare.com/realtime/realtimekit/concepts/meeting#stage).
* **Chat:** RealtimeKit allows users to send and receive messages in real time. You can also send private messages (visible only to a specific user). You can configure who has access to send & messages and receive various kinds of messages.
* **Polls:** Allows user to configure who can create, view and interact with polls in the meeting.
* **Plugins:** Plugins are interactive real-time applications that run inside the meeting to make collaboration easier. RealtimeKit lets you build your own plugins and also offers built-in options like Whiteboard and Document Sharing.  
You can control which plugins a participant is allowed to view, open, or close.
* **Waiting Room:** A waiting room allows participants to join a meeting before they’re admitted, giving hosts control over who enters and when. It helps manage access, reduce interruptions, and ensure the meeting starts smoothly.  
Hosts can admit or remove participants at any time, and you can configure who should bypass the waiting room automatically. Read more about waiting rooms in [Meetings](https://developers.cloudflare.com/realtime/realtimekit/concepts/meeting#waiting-room).
* **Connected Meetings:**  Beta  Connected Meetings let you meeting spaces linked to a main meeting, enabling smaller group discussions or parallel sessions. Participants can be given permission to move between meetings or return to the parent meeting. Hosts can create, update, or delete these connected spaces.  
Read more about connected meetings in [Meetings](https://developers.cloudflare.com/realtime/realtimekit/concepts/meeting#connected-meetings).
* **Miscellaneous:** Miscellaneous permissions let you fine-tune additional aspects of the participant experience that don’t fall under specific categories.  
These options control capabilities like - editing names, viewing the participant list, syncing tab views, enabling transcriptions, and other supplementary features that enhance how users interact within the meeting.

### Where to Go Next

After learning about Meetings and Sessions, you can explore the following next steps:

* Add [Participants](https://developers.cloudflare.com/realtime/realtimekit/concepts/participant) to a Meeting – Manage who can join, their roles, and the access controls they inherit.
* Get started with [RealtimeKit SDKs](https://developers.cloudflare.com/realtime/realtimekit/quickstart/) – Integrate RealtimeKit into your web or mobile app with just a few lines of code.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/concepts/preset/#page","headline":"Preset · Cloudflare Realtime docs","description":"Configure participant roles, permissions, and meeting experience with RealtimeKit presets.","url":"https://developers.cloudflare.com/realtime/realtimekit/concepts/preset/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/concepts/","name":"Concepts"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/concepts/preset/","name":"Preset"}}]}
```
