---
title: rtk-message-view
description: API reference for rtk-message-view component (Angular Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# rtk-message-view

## Properties

| Property       | Type                     | Required | Default         | Description                             |
| -------------- | ------------------------ | -------- | --------------- | --------------------------------------- |
| actions        | MessageAction\[\]        | ✅        | \-              | List of actions to show in menu         |
| authorName     | string                   | ✅        | \-              | Author display label                    |
| avatarUrl      | string                   | ✅        | \-              | Avatar image url                        |
| hideAuthorName | boolean                  | ✅        | \-              | Hides author display label              |
| hideAvatar     | boolean                  | ✅        | \-              | Hides avatar                            |
| hideMetadata   | boolean                  | ✅        | \-              | Hides metadata (time)                   |
| iconPack       | IconPack1                | ❌        | defaultIconPack | Icon pack                               |
| isEdited       | boolean                  | ✅        | \-              | Has the message been edited             |
| isSelf         | boolean                  | ✅        | \-              | Is the message sent by the current user |
| messageType    | Message\['type'\]        | ✅        | \-              | Type of message                         |
| pinned         | boolean                  | ✅        | \-              | Is message pinned                       |
| time           | Date                     | ✅        | \-              | Time when message was sent              |
| variant        | 'plain' \| 'bubble'      | ✅        | \-              | Appearance                              |
| viewType       | 'incoming' \| 'outgoing' | ✅        | \-              | Render                                  |

## Usage Examples

### Basic Usage

```

<!-- component.html -->

<rtk-message-view></rtk-message-view>


```

### With Properties

```

<!-- component.html -->

<rtk-message-view

 [actions]="[]"

 authorName="example"

 avatarUrl="example">

</rtk-message-view>


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-message-view/#page","headline":"rtk-message-view · Cloudflare Realtime docs","description":"API reference for rtk-message-view component (Angular Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-message-view/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/","name":"Angular"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/rtk-message-view/","name":"rtk-message-view"}}]}
```
