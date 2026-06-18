---
title: RtkButton
description: API reference for RtkButton component (iOS Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkButton

A versatile button that follows the RTK Design System. Supports multiple styles, states, and sizes.

## Initializer parameters

| Parameter      | Type                | Required | Default | Description                                           |
| -------------- | ------------------- | -------- | ------- | ----------------------------------------------------- |
| style          | Style               | ❌        | .solid  | The button style (solid, line, icon-left, and others) |
| rtkButtonState | States              | ❌        | .active | The initial state of the button                       |
| size           | Size                | ❌        | .large  | The size of the button                                |
| appearance     | RtkButtonAppearance | ❌        | \-      | Appearance configuration for colors and fonts         |

## Usage Examples

### Basic Usage

Swift

```

import RealtimeKitUI


let button = RtkButton()

button.setTitle("Join", for: .normal)

view.addSubview(button)


```

### With custom style

Swift

```

import RealtimeKitUI


let button = RtkButton(

    style: .line,

    rtkButtonState: .active,

    size: .large

)

button.setTitle("Cancel", for: .normal)

view.addSubview(button)


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-button/#page","headline":"RtkButton · Cloudflare Realtime docs","description":"API reference for RtkButton component (iOS Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-button/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/","name":"iOS"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/rtk-button/","name":"RtkButton"}}]}
```
