---
title: rtk-file-message-view
description: API reference for rtk-file-message-view component (Angular Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# rtk-file-message-view

A component which renders a file message.

## Properties

| Property | Type      | Required | Default         | Description      |
| -------- | --------- | -------- | --------------- | ---------------- |
| iconPack | IconPack1 | ❌        | defaultIconPack | Icon pack        |
| name     | string    | ✅        | \-              | Name of the file |
| size     | number    | ✅        | \-              | Size of the file |
| url      | string    | ✅        | \-              | Url of the file  |

## Usage Examples

### Basic Usage

```

<!-- component.html -->

<rtk-file-message-view></rtk-file-message-view>


```

### With Properties

```

<!-- component.html -->

<rtk-file-message-view

 name="example"

 size="42"

 url="example">

</rtk-file-message-view>


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-file-message-view/#page","headline":"rtk-file-message-view · Cloudflare Realtime docs","description":"API reference for rtk-file-message-view component (Angular Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-file-message-view/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/","name":"Angular"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/rtk-file-message-view/","name":"rtk-file-message-view"}}]}
```
