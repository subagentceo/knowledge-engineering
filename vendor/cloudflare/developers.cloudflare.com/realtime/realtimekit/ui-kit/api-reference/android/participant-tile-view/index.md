---
title: RtkParticipantTileView
description: API reference for RtkParticipantTileView component (Android Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkParticipantTileView

A component which plays a participant's video and allows for placement of components like name tag and avatar.

## Properties

| Property                  | Type                        | Required | Default      | Description                  |
| ------------------------- | --------------------------- | -------- | ------------ | ---------------------------- |
| rtk\_ptv\_nameTagPosition | BOTTOM\_LEFT \| TOP\_CENTER | ❌        | BOTTOM\_LEFT | Position of the name tag     |
| cardBackgroundColor       | color                       | ❌        | \-           | Background color of the tile |
| cardCornerRadius          | dimension                   | ❌        | \-           | Corner radius of the tile    |

## Methods

| Method                  | Parameters                         | Description                             |
| ----------------------- | ---------------------------------- | --------------------------------------- |
| activate                | participant: RtkMeetingParticipant | Bind the tile to a specific participant |
| refreshParticipantName  | \-                                 | Refresh the name tag and avatar         |
| refreshParticipantVideo | \-                                 | Refresh the video view state            |
| applyDesignTokens       | designTokens: RtkDesignTokens      | Apply custom design tokens for theming  |

## Usage Examples

### Basic Usage

```

<com.cloudflare.realtimekit.ui.view.participanttile.RtkParticipantTileView

    android:id="@+id/rtk_participant_tile"

    android:layout_width="match_parent"

    android:layout_height="200dp"

    app:rtk_ptv_nameTagPosition="BOTTOM_LEFT" />


```

### With Methods

Kotlin

```

val tile = findViewById<RtkParticipantTileView>(R.id.rtk_participant_tile)

tile.activate(participant)


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/participant-tile-view/#page","headline":"RtkParticipantTileView · Cloudflare Realtime docs","description":"API reference for RtkParticipantTileView component (Android Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/participant-tile-view/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/","name":"Android"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/participant-tile-view/","name":"RtkParticipantTileView"}}]}
```
