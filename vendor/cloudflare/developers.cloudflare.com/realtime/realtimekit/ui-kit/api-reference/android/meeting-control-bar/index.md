---
title: RtkMeetingControlBarView
description: API reference for RtkMeetingControlBarView component (Android Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkMeetingControlBarView

A pre-built control bar for group call meetings. Contains mic toggle, camera toggle, more toggle, and leave button.

## Methods

| Method   | Parameters                 | Description                               |
| -------- | -------------------------- | ----------------------------------------- |
| activate | meeting: RealtimeKitClient | Bind the control bar to the meeting state |

## Usage Examples

### Basic Usage

```

<com.cloudflare.realtimekit.ui.view.controlbars.RtkMeetingControlBarView

    android:id="@+id/rtk_meeting_control_bar"

    android:layout_width="match_parent"

    android:layout_height="wrap_content" />


```

### With Methods

Kotlin

```

val controlBar = findViewById<RtkMeetingControlBarView>(R.id.rtk_meeting_control_bar)

controlBar.activate(meeting)


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/meeting-control-bar/#page","headline":"RtkMeetingControlBarView · Cloudflare Realtime docs","description":"API reference for RtkMeetingControlBarView component (Android Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/meeting-control-bar/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/","name":"Android"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/meeting-control-bar/","name":"RtkMeetingControlBarView"}}]}
```
