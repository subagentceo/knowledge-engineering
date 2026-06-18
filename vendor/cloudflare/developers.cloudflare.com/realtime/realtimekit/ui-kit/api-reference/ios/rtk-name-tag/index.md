---
title: RtkNameTag
description: API reference for RtkNameTag component (iOS Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkNameTag

Base name tag view with an icon, title, and optional subtitle. Serves as the foundation for `RtkMeetingNameTag`.

## Initializer parameters

| Parameter  | Type                 | Required | Default | Description                                       |
| ---------- | -------------------- | -------- | ------- | ------------------------------------------------- |
| image      | RtkImage             | ✅        | \-      | The icon image displayed in the name tag          |
| appearance | RtkNameTagAppearance | ❌        | \-      | Appearance configuration for the name tag         |
| title      | String               | ✅        | \-      | The primary text displayed in the name tag        |
| subtitle   | String               | ❌        | ""      | Optional secondary text displayed below the title |

## Usage Examples

### Basic Usage

Swift

```

import RealtimeKitUI


let nameTag = RtkNameTag(

    image: RtkImage(image: UIImage(systemName: "mic")),

    title: "John Doe"

)

view.addSubview(nameTag)


```

### With subtitle

Swift

```

import RealtimeKitUI


let nameTag = RtkNameTag(

    image: RtkImage(image: UIImage(systemName: "mic")),

    title: "John Doe",

    subtitle: "Host"

)

view.addSubview(nameTag)


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-name-tag/#page","headline":"RtkNameTag · Cloudflare Realtime docs","description":"API reference for RtkNameTag component (iOS Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-name-tag/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/","name":"iOS"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/rtk-name-tag/","name":"RtkNameTag"}}]}
```
