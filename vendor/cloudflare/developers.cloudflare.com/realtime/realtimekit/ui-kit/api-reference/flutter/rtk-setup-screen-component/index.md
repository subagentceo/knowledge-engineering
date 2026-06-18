---
title: RtkSetupScreen
description: API reference for RtkSetupScreen component (Flutter Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkSetupScreen

A pre-built setup screen shown before joining a meeting. Allows users to edit their display name and configure media settings.

Note

[RtkProvider](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-provider/) must be an ancestor of this widget in the widget tree.

## Properties

| Property            | Type         | Required | Default | Description                                            |
| ------------------- | ------------ | -------- | ------- | ------------------------------------------------------ |
| selectedAudioDevice | AudioDevice? | ✅        | \-      | Currently selected audio device (positional parameter) |
| selectedVideoDevice | VideoDevice? | ✅        | \-      | Currently selected video device (positional parameter) |

Note

Both parameters are positional. Pass them without named arguments.

## Usage Examples

### Basic Usage

Dart

```

import 'package:realtimekit_ui/realtimekit_ui.dart';


RtkSetupScreen(

  selectedAudioDevice,

  selectedVideoDevice,

)


```

### With Properties

Dart

```

import 'package:realtimekit_ui/realtimekit_ui.dart';


final selectedAudioDevice = meeting.getSelectedAudioDevice();

final selectedVideoDevice = meeting.getSelectedVideoDevice();


RtkSetupScreen(

  selectedAudioDevice,

  selectedVideoDevice,

)


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-setup-screen-component/#page","headline":"RtkSetupScreen · Cloudflare Realtime docs","description":"API reference for RtkSetupScreen component (Flutter Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-setup-screen-component/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/flutter/","name":"Flutter"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-setup-screen-component/","name":"RtkSetupScreen"}}]}
```
