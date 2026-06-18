---
title: rtk-image-viewer
description: API reference for rtk-image-viewer component (Web Components (HTML) Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# rtk-image-viewer

A component which shows an image sent via chat.

## Properties

| Property | Type         | Required | Default         | Description   |
| -------- | ------------ | -------- | --------------- | ------------- |
| iconPack | IconPack     | ❌        | defaultIconPack | Icon pack     |
| image    | ImageMessage | ✅        | \-              | Image message |
| size     | Size         | ✅        | \-              | Size          |
| t        | RtkI18n      | ❌        | useLanguage()   | Language      |

## Usage Examples

### Basic Usage

```

<rtk-image-viewer></rtk-image-viewer>


```

### With Properties

```

<rtk-image-viewer

 size="md">

</rtk-image-viewer>


```

```

<script>

  const el = document.querySelector("rtk-image-viewer");


</script>


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-image-viewer/#page","headline":"rtk-image-viewer · Cloudflare Realtime docs","description":"API reference for rtk-image-viewer component (Web Components (HTML) Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-image-viewer/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/","name":"Web Components (HTML)"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/rtk-image-viewer/","name":"rtk-image-viewer"}}]}
```
