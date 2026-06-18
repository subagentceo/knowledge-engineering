---
title: rtk-paginated-list
description: API reference for rtk-paginated-list component (Web Components (HTML) Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# rtk-paginated-list

## Properties

| Property       | Type                                                 | Required | Default         | Description                                    |
| -------------- | ---------------------------------------------------- | -------- | --------------- | ---------------------------------------------- |
| autoScroll     | boolean                                              | ✅        | \-              | auto scroll list to bottom                     |
| createNodes    | (data: unknown\[\])                                  | ✅        | \-              | Create nodes                                   |
| emptyListLabel | string                                               | ✅        | \-              | label to show when empty                       |
| fetchData      | (timestamp: number, size: number, reversed: boolean) | ✅        | \-              | Fetch the data                                 |
| iconPack       | IconPack                                             | ❌        | defaultIconPack | Icon pack                                      |
| pageSize       | number                                               | ✅        | \-              | Page Size                                      |
| pagesAllowed   | number                                               | ✅        | \-              | Number of pages allowed to be shown            |
| rerenderList   | ()                                                   | ✅        | \-              | Rerender paginated list                        |
| reset          | (timestamp?: number)                                 | ❌        | \-              | Resets the paginated list to a given timestamp |
| t              | RtkI18n                                              | ❌        | useLanguage()   | Language                                       |

## Usage Examples

### Basic Usage

```

<rtk-paginated-list></rtk-paginated-list>


```

### With Properties

```

<rtk-paginated-list

 emptyListLabel="example">

</rtk-paginated-list>


```

```

<script>

  const el = document.querySelector("rtk-paginated-list");


  el.autoScroll= true;

  el.createNodes= [];

</script>


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-paginated-list/#page","headline":"rtk-paginated-list · Cloudflare Realtime docs","description":"API reference for rtk-paginated-list component (Web Components (HTML) Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-paginated-list/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/","name":"Web Components (HTML)"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/rtk-paginated-list/","name":"rtk-paginated-list"}}]}
```
