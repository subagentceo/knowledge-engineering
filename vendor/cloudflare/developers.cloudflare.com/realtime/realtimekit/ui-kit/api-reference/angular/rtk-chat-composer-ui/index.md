---
title: rtk-chat-composer-ui
description: API reference for rtk-chat-composer-ui component (Angular Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# rtk-chat-composer-ui

@deprecated . This component is deprecated, please use rtk-chat-composer-view instead.

## Properties

| Property           | Type                                                                                      | Required | Default         | Description                         |
| ------------------ | ----------------------------------------------------------------------------------------- | -------- | --------------- | ----------------------------------- |
| canSendFiles       | boolean                                                                                   | ✅        | \-              | Whether user can send file messages |
| canSendTextMessage | boolean                                                                                   | ✅        | \-              | Whether user can send text messages |
| iconPack           | IconPack1                                                                                 | ❌        | defaultIconPack | Icon pack                           |
| prefill            | { suggestedReplies?: string\[\]; editMessage?: TextMessage; replyMessage?: TextMessage; } | ❌        | \-              | prefill the composer                |
| size               | Size1                                                                                     | ✅        | \-              | Size                                |
| t                  | RtkI18n                                                                                   | ❌        | useLanguage()   | Language                            |

## Usage Examples

### Basic Usage

```

<!-- component.html -->

<rtk-chat-composer-ui></rtk-chat-composer-ui>


```

### With Properties

```

<!-- component.html -->

<rtk-chat-composer-ui

 [canSendFiles]="true"

 [canSendTextMessage]="true"

 size="md">

</rtk-chat-composer-ui>


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-chat-composer-ui/#page","headline":"rtk-chat-composer-ui · Cloudflare Realtime docs","description":"API reference for rtk-chat-composer-ui component (Angular Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-chat-composer-ui/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/","name":"Angular"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/rtk-chat-composer-ui/","name":"rtk-chat-composer-ui"}}]}
```
