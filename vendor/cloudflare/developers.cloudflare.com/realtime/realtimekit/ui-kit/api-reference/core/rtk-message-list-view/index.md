---
title: rtk-message-list-view
description: API reference for rtk-message-list-view component (Web Components (HTML) Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# rtk-message-list-view

A component which renders list of messages.

## Properties

| Property          | Type                              | Required | Default         | Description                                                                   |
| ----------------- | --------------------------------- | -------- | --------------- | ----------------------------------------------------------------------------- |
| estimateItemSize  | number                            | ✅        | \-              | Estimated height of an item                                                   |
| iconPack          | IconPack1                         | ❌        | defaultIconPack | Icon pack                                                                     |
| loadMore          | (lastMessage: Message)            | ✅        | \-              | Function to load more messages. Messages returned from this will be prepended |
| messages          | Message\[\]                       | ✅        | \-              | Messages to render                                                            |
| renderer          | (message: Message, index: number) | ✅        | \-              | Render function of the message                                                |
| visibleItemsCount | number                            | ✅        | \-              | Maximum visible messages                                                      |

## Usage Examples

### Basic Usage

```

<rtk-message-list-view></rtk-message-list-view>


```

### With Properties

```

<rtk-message-list-view>

</rtk-message-list-view>


```

```

<script>

  const el = document.querySelector("rtk-message-list-view");


  el.estimateItemSize= 42;

  el.messages= [];

</script>


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-message-list-view/#page","headline":"rtk-message-list-view · Cloudflare Realtime docs","description":"API reference for rtk-message-list-view component (Web Components (HTML) Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-message-list-view/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/","name":"Web Components (HTML)"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/rtk-message-list-view/","name":"rtk-message-list-view"}}]}
```
