---
title: RtkControlBarButton
description: API reference for RtkControlBarButton component (iOS Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkControlBarButton

Base button class for control bar items. Supports normal and selected states, notification badges, and theming through appearance configuration.

## Initializer parameters

| Parameter  | Type                          | Required | Default | Description                                     |
| ---------- | ----------------------------- | -------- | ------- | ----------------------------------------------- |
| image      | RtkImage                      | ✅        | \-      | The icon image for the button                   |
| title      | String                        | ❌        | ""      | The title text displayed below the icon         |
| appearance | RtkControlBarButtonAppearance | ❌        | \-      | Appearance configuration for colors and styling |

## Properties

| Property               | Type                     | Required | Default | Description                                                 |
| ---------------------- | ------------------------ | -------- | ------- | ----------------------------------------------------------- |
| selectedStateTintColor | UIColor                  | ❌        | \-      | Tint color applied when the button is in the selected state |
| normalStateTintColor   | UIColor                  | ❌        | \-      | Tint color applied when the button is in the normal state   |
| notificationBadge      | RtkNotificationBadgeView | \-       | \-      | Badge view for displaying notification counts               |

## Methods

| Method                    | Return Type | Description                                                         |
| ------------------------- | ----------- | ------------------------------------------------------------------- |
| setSelected(image:title:) | Void        | Sets the button to the selected state with a custom image and title |
| setDefault(image:title:)  | Void        | Sets the button to the default state with a custom image and title  |

## Usage Examples

### Basic Usage

Swift

```

import RealtimeKitUI


let button = RtkControlBarButton(

    image: RtkImage(image: UIImage(systemName: "mic")),

    title: "Mute"

)

view.addSubview(button)


```

### With state changes

Swift

```

import RealtimeKitUI


let button = RtkControlBarButton(

    image: RtkImage(image: UIImage(systemName: "mic")),

    title: "Mute"

)


// Switch to selected state

button.setSelected(

    image: RtkImage(image: UIImage(systemName: "mic.slash")),

    title: "Unmute"

)


// Switch back to default state

button.setDefault(

    image: RtkImage(image: UIImage(systemName: "mic")),

    title: "Mute"

)

view.addSubview(button)


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-control-bar-button/#page","headline":"RtkControlBarButton · Cloudflare Realtime docs","description":"API reference for RtkControlBarButton component (iOS Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-control-bar-button/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/","name":"iOS"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/rtk-control-bar-button/","name":"RtkControlBarButton"}}]}
```
