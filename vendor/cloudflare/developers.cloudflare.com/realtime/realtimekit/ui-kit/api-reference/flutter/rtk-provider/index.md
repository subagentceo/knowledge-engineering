---
title: RtkProvider
description: API reference for RtkProvider component (Flutter Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkProvider

A foundational widget that initializes and provides the RealtimeKit environment for a Flutter application. `RtkProvider` acts as a context wrapper that sets up design tokens, client configurations, and UI Kit information required by RealtimeKit components.

## Properties

| Property  | Type                    | Required | Default | Description                                                       |
| --------- | ----------------------- | -------- | ------- | ----------------------------------------------------------------- |
| child     | Widget                  | ✅        | \-      | The widget below this widget in the tree                          |
| meeting   | RealtimekitClient       | ✅        | \-      | Meeting client instance                                           |
| uiKitInfo | RealtimeKitUIInfo       | ✅        | \-      | UI Kit configuration info including design tokens and UI settings |
| observers | List<ProviderObserver>? | ❌        | null    | Riverpod provider observers for debugging                         |

## Usage Examples

### Basic Usage

Dart

```

import 'package:realtimekit_ui/realtimekit_ui.dart';


RtkProvider(

  meeting: yourMeetingInstance,

  uiKitInfo: yourUiKitInfo,

  child: MaterialApp(

    home: YourAppHome(),

  ),

)


```

### With Properties

Dart

```

import 'package:realtimekit_ui/realtimekit_ui.dart';


class MyApp extends StatelessWidget {

  @override

  Widget build(BuildContext context) {

    return RtkProvider(

      meeting: RealtimekitClient(

        // Client configuration

      ),

      uiKitInfo: RealtimeKitUIInfo(

        // UI Kit information and design tokens

      ),

      observers: [MyProviderObserver()],

      child: MaterialApp(

        home: HomeScreen(),

      ),

    );

  }

}


```

Note

You do not need to wrap the root of your application inside `RtkProvider`. You can wrap a specific subtree where you use RealtimeKit components. A `MaterialApp` widget must exist below `RtkProvider` in the widget tree.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-provider/#page","headline":"RtkProvider · Cloudflare Realtime docs","description":"API reference for RtkProvider component (Flutter Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-provider/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/flutter/","name":"Flutter"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/flutter/rtk-provider/","name":"RtkProvider"}}]}
```
