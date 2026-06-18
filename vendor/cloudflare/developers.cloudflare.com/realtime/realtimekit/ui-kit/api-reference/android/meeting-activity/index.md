---
title: RtkMeetingActivity
description: API reference for RtkMeetingActivity component (Android Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkMeetingActivity

The main meeting activity that manages the full meeting lifecycle. Handles transitions between loading, setup, waiting room, group call, webinar, and error states. This is the activity launched by `RealtimeKitUI.startMeeting()`.

## Usage Examples

### Basic Usage

Kotlin

```

val meetingInfo = RtkMeetingInfo(authToken = authToken, baseUrl = baseUrl)

val realtimeKitUIInfo = RealtimeKitUIInfo(activity = this, rtkMeetingInfo = meetingInfo)

val realtimeKitUI = RealtimeKitUIBuilder.build(realtimeKitUIInfo)

realtimeKitUI.startMeeting()


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/meeting-activity/#page","headline":"RtkMeetingActivity · Cloudflare Realtime docs","description":"API reference for RtkMeetingActivity component (Android Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/meeting-activity/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/","name":"Android"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/meeting-activity/","name":"RtkMeetingActivity"}}]}
```
