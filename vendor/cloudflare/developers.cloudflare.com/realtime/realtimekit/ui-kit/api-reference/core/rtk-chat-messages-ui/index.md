---
title: rtk-chat-messages-ui
description: API reference for rtk-chat-messages-ui component (Web Components (HTML) Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# rtk-chat-messages-ui

@deprecated Use `rtk-chat-messages-ui-paginated` instead.

## Properties

| Property       | Type      | Required | Default         | Description                         |
| -------------- | --------- | -------- | --------------- | ----------------------------------- |
| canPinMessages | boolean   | ✅        | \-              | Can current user pin/unpin messages |
| iconPack       | IconPack1 | ❌        | defaultIconPack | Icon pack                           |
| messages       | Chat\[\]  | ✅        | \-              | Chat Messages                       |
| selectedGroup  | string    | ✅        | \-              | Selected group key                  |
| selfUserId     | string    | ✅        | \-              | User ID of self user                |
| size           | Size1     | ✅        | \-              | Size                                |
| t              | RtkI18n   | ❌        | useLanguage()   | Language                            |

## Usage Examples

### Basic Usage

```

<rtk-chat-messages-ui></rtk-chat-messages-ui>


```

### With Properties

```

<rtk-chat-messages-ui

 selectedGroup="example">

</rtk-chat-messages-ui>


```

```

<script>

  const el = document.querySelector("rtk-chat-messages-ui");


  el.canPinMessages= true;

  el.messages= [];

</script>


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-chat-messages-ui/#page","headline":"rtk-chat-messages-ui · Cloudflare Realtime docs","description":"API reference for rtk-chat-messages-ui component (Web Components (HTML) Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-chat-messages-ui/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/","name":"Web Components (HTML)"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/rtk-chat-messages-ui/","name":"rtk-chat-messages-ui"}}]}
```
