---
title: RtkAvatarView
description: API reference for RtkAvatarView component (Android Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkAvatarView

Avatar component which renders a participant's profile picture or their initials.

## Methods

| Method            | Parameters                         | Description                                        |
| ----------------- | ---------------------------------- | -------------------------------------------------- |
| activate          | participant: RtkMeetingParticipant | Bind the avatar to a participant                   |
| refresh           | \-                                 | Refresh the avatar based on the participant's name |
| applyDesignTokens | designTokens: RtkDesignTokens      | Apply custom design tokens for theming             |

## Usage Examples

### Basic Usage

```

<com.cloudflare.realtimekit.ui.view.avatarview.RtkAvatarView

    android:id="@+id/rtk_avatar"

    android:layout_width="48dp"

    android:layout_height="48dp" />


```

### With Methods

Kotlin

```

val avatar = findViewById<RtkAvatarView>(R.id.rtk_avatar)

avatar.activate(participant)


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/avatar-view/#page","headline":"RtkAvatarView · Cloudflare Realtime docs","description":"API reference for RtkAvatarView component (Android Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/avatar-view/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/","name":"Android"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/avatar-view/","name":"RtkAvatarView"}}]}
```
