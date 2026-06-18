---
title: rtk-grid-pagination
description: API reference for rtk-grid-pagination component (Angular Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# rtk-grid-pagination

A component which allows you to change current page and view mode of active participants list. This is reflected in the `rtk-grid` component.

## Properties

| Property | Type                   | Required | Default         | Description    |
| -------- | ---------------------- | -------- | --------------- | -------------- |
| iconPack | IconPack               | ❌        | defaultIconPack | Icon Pack      |
| meeting  | Meeting                | ✅        | \-              | Meeting object |
| size     | Size                   | ✅        | \-              | Size Prop      |
| states   | States                 | ✅        | \-              | States         |
| t        | RtkI18n                | ❌        | useLanguage()   | Language       |
| variant  | GridPaginationVariants | ✅        | \-              | Variant        |

## Usage Examples

### Basic Usage

```

<!-- component.html -->

<rtk-grid-pagination></rtk-grid-pagination>


```

### With Properties

```

<!-- component.html -->

<rtk-grid-pagination

 [meeting]="meeting"

 size="md"

 [variant]="gridpaginationvariants">

</rtk-grid-pagination>


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-grid-pagination/#page","headline":"rtk-grid-pagination · Cloudflare Realtime docs","description":"API reference for rtk-grid-pagination component (Angular Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-grid-pagination/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/","name":"Angular"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/rtk-grid-pagination/","name":"rtk-grid-pagination"}}]}
```
