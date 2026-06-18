---
title: RtkVideoPeer
description: API reference for RtkVideoPeer component (Android Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkVideoPeer

A view that renders a participant's video stream with an avatar fallback when video is disabled.

## Methods

| Method  | Parameters                                                 | Description                               |
| ------- | ---------------------------------------------------------- | ----------------------------------------- |
| refresh | participant: RtkMeetingParticipant, isScreenShare: Boolean | Update the view with the participant data |

## Usage Examples

### Basic Usage

```

<com.cloudflare.realtimekit.ui.view.RtkVideoPeer

    android:id="@+id/rtk_video_peer"

    android:layout_width="match_parent"

    android:layout_height="200dp" />


```

### With Methods

Kotlin

```

val videoPeer = findViewById<RtkVideoPeer>(R.id.rtk_video_peer)

videoPeer.refresh(participant, isScreenShare = false)


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/video-peer/#page","headline":"RtkVideoPeer · Cloudflare Realtime docs","description":"API reference for RtkVideoPeer component (Android Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/video-peer/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/","name":"Android"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/video-peer/","name":"RtkVideoPeer"}}]}
```
