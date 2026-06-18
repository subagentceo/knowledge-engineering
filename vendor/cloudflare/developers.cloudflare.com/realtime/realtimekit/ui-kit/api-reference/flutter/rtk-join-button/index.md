---
title: RtkJoinButton
description: API reference for RtkJoinButton component (Flutter Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkJoinButton

A button widget for joining a RealtimeKit meeting room. Provides visual feedback during the joining process.

## Properties

| Property        | Type              | Required | Default              | Description                                 |
| --------------- | ----------------- | -------- | -------------------- | ------------------------------------------- |
| meeting         | RealtimekitClient | ✅        | \-                   | Meeting client instance                     |
| onMeetingJoined | VoidCallback?     | ❌        | \-                   | Callback invoked when the meeting is joined |
| rtkDesignToken  | RtkDesignTokens?  | ❌        | Global design tokens | Design tokens for customization             |
| height          | double?           | ❌        | \-                   | Height of the button                        |
| width           | double?           | ❌        | \-                   | Width of the button                         |
| isDisabled      | bool              | ❌        | false                | Whether the button is disabled              |

## Usage Examples

### Basic Usage

Dart

```

import 'package:realtimekit_ui/realtimekit_ui.dart';


RtkJoinButton(

  meeting: yourMeetingInstance,

)


```

### With Properties

Dart

```

import 'package:realtimekit_ui/realtimekit_ui.dart';


RtkJoinButton(

  meeting: yourMeetingInstance,

  onMeetingJoined: () {

    // Handle successful join

  },

  height: 50.0,

  width: 200.0,

  isDisabled: false,

)


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-join-button/#page","headline":"RtkJoinButton · Cloudflare Realtime docs","description":"API reference for RtkJoinButton component (Flutter Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-join-button/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/flutter/","name":"Flutter"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-join-button/","name":"RtkJoinButton"}}]}
```
