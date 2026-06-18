---
title: rtk-chat-composer-view
description: API reference for rtk-chat-composer-view component (Angular Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# rtk-chat-composer-view

A component which renders a chat composer

## Properties

| Property             | Type                                        | Required | Default         | Description                             |
| -------------------- | ------------------------------------------- | -------- | --------------- | --------------------------------------- |
| canSendFiles         | boolean                                     | ✅        | \-              | Whether user can send file messages     |
| canSendTextMessage   | boolean                                     | ✅        | \-              | Whether user can send text messages     |
| iconPack             | IconPack1                                   | ❌        | defaultIconPack | Icon pack                               |
| inputTextPlaceholder | string                                      | ✅        | \-              | Placeholder for text input              |
| isEditing            | boolean                                     | ✅        | \-              | Sets composer to edit mode              |
| maxLength            | number                                      | ✅        | \-              | Max length for text input               |
| message              | string                                      | ✅        | \-              | Message to be pre-populated             |
| quotedMessage        | string                                      | ✅        | \-              | Quote message to be displayed           |
| rateLimits           | { period: number; maxInvocations: number; } | ✅        | \-              | Rate limits                             |
| storageKey           | string                                      | ✅        | \-              | Key for storing message in localStorage |
| t                    | RtkI18n1                                    | ❌        | useLanguage()   | Language                                |

## Usage Examples

### Basic Usage

```

<!-- component.html -->

<rtk-chat-composer-view></rtk-chat-composer-view>


```

### With Properties

```

<!-- component.html -->

<rtk-chat-composer-view

 [canSendFiles]="true"

 [canSendTextMessage]="true"

 inputTextPlaceholder="example">

</rtk-chat-composer-view>


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-chat-composer-view/#page","headline":"rtk-chat-composer-view · Cloudflare Realtime docs","description":"API reference for rtk-chat-composer-view component (Angular Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-chat-composer-view/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/","name":"Angular"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/rtk-chat-composer-view/","name":"rtk-chat-composer-view"}}]}
```
