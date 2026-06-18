---
title: RtkLeaveMeetingDialog
description: API reference for RtkLeaveMeetingDialog component (Flutter Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkLeaveMeetingDialog

A dialog widget for confirming the action of leaving a RealtimeKit meeting. Provides a prompt with cancel and leave options, and displays an additional end-meeting option for hosts.

## Properties

| Property    | Type              | Required | Default              | Description                     |
| ----------- | ----------------- | -------- | -------------------- | ------------------------------- |
| meeting     | RealtimekitClient | ✅        | \-                   | Meeting client instance         |
| designToken | RtkDesignTokens?  | ❌        | Global design tokens | Design tokens for customization |

## Usage Examples

### Basic Usage

Dart

```

import 'package:realtimekit_ui/realtimekit_ui.dart';


RtkLeaveMeetingDialog(

  meeting: yourMeetingInstance,

)


```

### With Properties

Dart

```

import 'package:realtimekit_ui/realtimekit_ui.dart';


RtkLeaveMeetingDialog(

  meeting: yourMeetingInstance,

  designToken: yourDesignToken,

)


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-leave-meeting-dialog/#page","headline":"RtkLeaveMeetingDialog · Cloudflare Realtime docs","description":"API reference for RtkLeaveMeetingDialog component (Flutter Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-leave-meeting-dialog/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/flutter/","name":"Flutter"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-leave-meeting-dialog/","name":"RtkLeaveMeetingDialog"}}]}
```
