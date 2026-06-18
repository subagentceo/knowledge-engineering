---
title: RtkMeetingTitleView
description: API reference for RtkMeetingTitleView component (Android Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkMeetingTitleView

A text view that displays the meeting title. It automatically updates when the meeting title changes.

## Methods

| Method            | Parameters                    | Description                            |
| ----------------- | ----------------------------- | -------------------------------------- |
| activate          | meeting: RealtimeKitClient    | Bind the view to the meeting state     |
| applyDesignTokens | designTokens: RtkDesignTokens | Apply custom design tokens for theming |

## Usage Examples

### Basic Usage

```

<com.cloudflare.realtimekit.ui.view.RtkMeetingTitleView

    android:id="@+id/rtk_meeting_title"

    android:layout_width="wrap_content"

    android:layout_height="wrap_content" />


```

### With Methods

Kotlin

```

val titleView = findViewById<RtkMeetingTitleView>(R.id.rtk_meeting_title)

titleView.activate(meeting)


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/meeting-title-view/#page","headline":"RtkMeetingTitleView · Cloudflare Realtime docs","description":"API reference for RtkMeetingTitleView component (Android Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/meeting-title-view/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/","name":"Android"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/meeting-title-view/","name":"RtkMeetingTitleView"}}]}
```
