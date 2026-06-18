---
title: RtkPluginScreenShareTabButton
description: API reference for RtkPluginScreenShareTabButton component (iOS Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkPluginScreenShareTabButton

A tab button used in the plugin and screen share tab selector. Represents a single tab in the `RtkActiveTabSelectorView`.

## Initializer parameters

| Parameter  | Type                                    | Required | Default | Description                                 |
| ---------- | --------------------------------------- | -------- | ------- | ------------------------------------------- |
| image      | RtkImage?                               | ✅        | \-      | The icon image for the tab button           |
| title      | String                                  | ❌        | ""      | The title text for the tab button           |
| id         | String                                  | ❌        | ""      | A unique identifier for the tab button      |
| appearance | RtkPluginScreenShareTabButtonAppearance | ❌        | \-      | Appearance configuration for the tab button |

## Usage Examples

### Basic Usage

Swift

```

import RealtimeKitUI


let tabButton = RtkPluginScreenShareTabButton(

    image: RtkImage(image: UIImage(systemName: "square.and.arrow.up")),

    title: "Screen Share"

)


```

### With identifier

Swift

```

import RealtimeKitUI


let tabButton = RtkPluginScreenShareTabButton(

    image: RtkImage(image: UIImage(systemName: "pencil.tip")),

    title: "Whiteboard",

    id: "whiteboard-plugin"

)


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-plugin-screen-share-tab-button/#page","headline":"RtkPluginScreenShareTabButton · Cloudflare Realtime docs","description":"API reference for RtkPluginScreenShareTabButton component (iOS Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-plugin-screen-share-tab-button/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/","name":"iOS"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/rtk-plugin-screen-share-tab-button/","name":"RtkPluginScreenShareTabButton"}}]}
```
