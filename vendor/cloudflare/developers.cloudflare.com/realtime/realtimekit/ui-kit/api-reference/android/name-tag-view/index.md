---
title: RtkNameTagView
description: API reference for RtkNameTagView component (Android Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkNameTagView

Displays a participant's name and an audio indicator.

## Methods

| Method            | Parameters                                                 | Description                                   |
| ----------------- | ---------------------------------------------------------- | --------------------------------------------- |
| activate          | participant: RtkMeetingParticipant, isScreenShare: Boolean | Bind the name tag to a participant            |
| setMaxLength      | length: Int                                                | Set the maximum length for the displayed name |
| refresh           | \-                                                         | Refresh the name and audio indicator          |
| applyDesignTokens | designTokens: RtkDesignTokens                              | Apply custom design tokens for theming        |

## Usage Examples

### Basic Usage

```

<com.cloudflare.realtimekit.ui.view.nametagview.RtkNameTagView

    android:id="@+id/rtk_name_tag"

    android:layout_width="wrap_content"

    android:layout_height="wrap_content" />


```

### With Methods

Kotlin

```

val nameTag = findViewById<RtkNameTagView>(R.id.rtk_name_tag)

nameTag.activate(participant)


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/name-tag-view/#page","headline":"RtkNameTagView · Cloudflare Realtime docs","description":"API reference for RtkNameTagView component (Android Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/name-tag-view/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/","name":"Android"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/name-tag-view/","name":"RtkNameTagView"}}]}
```
