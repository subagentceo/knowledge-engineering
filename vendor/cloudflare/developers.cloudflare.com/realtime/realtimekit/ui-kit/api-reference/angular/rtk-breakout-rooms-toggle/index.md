---
title: rtk-breakout-rooms-toggle
description: API reference for rtk-breakout-rooms-toggle component (Angular Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# rtk-breakout-rooms-toggle

A button which toggles visibility of breakout rooms. You need to pass the `meeting` object to it.

## Properties

| Property | Type              | Required | Default | Description    |
| -------- | ----------------- | -------- | ------- | -------------- |
| iconPack | IconPack          | ✅        | \-      | Icon pack      |
| meeting  | Meeting           | ✅        | \-      | Meeting object |
| size     | Size              | ✅        | \-      | Size           |
| states   | States            | ✅        | \-      | States object  |
| t        | RtkI18n           | ✅        | \-      | Language       |
| variant  | ControlBarVariant | ✅        | \-      | Variant        |

## Usage Examples

### Basic Usage

```

<!-- component.html -->

<rtk-breakout-rooms-toggle></rtk-breakout-rooms-toggle>


```

### With Properties

```

<!-- component.html -->

<rtk-breakout-rooms-toggle

 [iconPack]="defaultIconPack"

 [meeting]="meeting"

 size="md">

</rtk-breakout-rooms-toggle>


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-breakout-rooms-toggle/#page","headline":"rtk-breakout-rooms-toggle · Cloudflare Realtime docs","description":"API reference for rtk-breakout-rooms-toggle component (Angular Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-breakout-rooms-toggle/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/","name":"Angular"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/rtk-breakout-rooms-toggle/","name":"rtk-breakout-rooms-toggle"}}]}
```
