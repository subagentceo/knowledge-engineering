---
title: RtkSelfAudioToggleButton
description: API reference for RtkSelfAudioToggleButton component (Flutter Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkSelfAudioToggleButton

A toggle button widget for controlling microphone audio state during a meeting. Allows users to mute or unmute their microphone.

Note

[RtkProvider](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-provider/) must be an ancestor of this widget in the widget tree.

## Properties

| Property              | Type              | Required | Default              | Description                            |
| --------------------- | ----------------- | -------- | -------------------- | -------------------------------------- |
| meeting               | RealtimekitClient | ✅        | \-                   | Meeting client instance                |
| individualDesignToken | RtkDesignTokens?  | ❌        | Global design tokens | Design tokens for customization        |
| onAudioToggle         | VoidCallback?     | ❌        | \-                   | Callback invoked when audio is toggled |
| iconSize              | double?           | ❌        | \-                   | Size of the icon                       |
| iconColor             | Color?            | ❌        | \-                   | Color of the icon                      |
| showLabel             | bool              | ❌        | false                | Whether to show label text             |

## Usage Examples

### Basic Usage

Dart

```

import 'package:realtimekit_ui/realtimekit_ui.dart';


RtkSelfAudioToggleButton(

  meeting: yourMeetingInstance,

)


```

### With Properties

Dart

```

import 'package:realtimekit_ui/realtimekit_ui.dart';


RtkSelfAudioToggleButton(

  meeting: yourMeetingInstance,

  onAudioToggle: () {

    // Handle audio toggle

  },

  iconSize: 24.0,

  iconColor: Colors.blue,

  showLabel: true,

)


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-self-audio-toggle/#page","headline":"RtkSelfAudioToggleButton · Cloudflare Realtime docs","description":"API reference for RtkSelfAudioToggleButton component (Flutter Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-self-audio-toggle/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/flutter/","name":"Flutter"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-self-audio-toggle/","name":"RtkSelfAudioToggleButton"}}]}
```
