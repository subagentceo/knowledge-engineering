---
title: rtk-virtualized-participant-list
description: API reference for rtk-virtualized-participant-list component (Web Components (HTML) Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# rtk-virtualized-participant-list

## Properties

| Property           | Type                         | Required | Default | Description                                              |
| ------------------ | ---------------------------- | -------- | ------- | -------------------------------------------------------- |
| bufferedItemsCount | number                       | ✅        | \-      | Buffer items to render before and after the visible area |
| emptyListElement   | HTMLElement                  | ✅        | \-      | Element to render if list is empty                       |
| itemHeight         | number                       | ✅        | \-      | Height of each item in pixels (assumed fixed)            |
| items              | Peer1\[\]                    | ✅        | \-      | Items to be virtualized                                  |
| renderItem         | (item: Peer1, index: number) | ✅        | \-      | Function to render each item                             |

## Usage Examples

### Basic Usage

```

<rtk-virtualized-participant-list></rtk-virtualized-participant-list>


```

### With Properties

```

<rtk-virtualized-participant-list>

</rtk-virtualized-participant-list>


```

```

<script>

  const el = document.querySelector("rtk-virtualized-participant-list");


  el.bufferedItemsCount= 42;

  el.itemHeight= 42;

</script>


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-virtualized-participant-list/#page","headline":"rtk-virtualized-participant-list · Cloudflare Realtime docs","description":"API reference for rtk-virtualized-participant-list component (Web Components (HTML) Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-virtualized-participant-list/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/","name":"Web Components (HTML)"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/rtk-virtualized-participant-list/","name":"rtk-virtualized-participant-list"}}]}
```
