---
title: RtkParticipantTile
description: API reference for RtkParticipantTile component (Flutter Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkParticipantTile

A widget that displays a participant's video or avatar within a meeting environment. Automatically shows the video feed when available and falls back to the participant's avatar.

Note

[RtkProvider](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-provider/) must be an ancestor of this widget in the widget tree.

## Properties

| Property    | Type                  | Required | Default              | Description                                       |
| ----------- | --------------------- | -------- | -------------------- | ------------------------------------------------- |
| participant | RtkMeetingParticipant | ✅        | \-                   | The participant to display (positional parameter) |
| designToken | RtkDesignTokens?      | ❌        | Global design tokens | Design tokens for customization                   |
| height      | double                | ❌        | 240                  | Height of the tile                                |
| width       | double                | ❌        | 180                  | Width of the tile                                 |

Note

The `participant` parameter is positional. Pass it without a named argument: `RtkParticipantTile(participant)`.

## Usage Examples

### Basic Usage

Dart

```

import 'package:realtimekit_ui/realtimekit_ui.dart';


RtkParticipantTile(

  participant,

)


```

### With Properties

Dart

```

import 'package:realtimekit_ui/realtimekit_ui.dart';


RtkParticipantTile(

  participant,

  designToken: yourDesignToken,

  height: 300,

  width: 200,

)


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-participant-tile/#page","headline":"RtkParticipantTile · Cloudflare Realtime docs","description":"API reference for RtkParticipantTile component (Flutter Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-participant-tile/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/flutter/","name":"Flutter"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-participant-tile/","name":"RtkParticipantTile"}}]}
```
