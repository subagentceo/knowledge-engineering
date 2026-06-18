---
title: rtk-icon
description: API reference for rtk-icon component (Web Components (HTML) Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# rtk-icon

An icon component which accepts an svg string and renders it.

## Properties

| Property | Type        | Required | Default | Description  |
| -------- | ----------- | -------- | ------- | ------------ |
| icon     | string      | ✅        | \-      | Icon         |
| size     | Size1       | ✅        | \-      | Size         |
| variant  | IconVariant | ✅        | \-      | Icon variant |

## Usage Examples

### Basic Usage

```

<rtk-icon></rtk-icon>


```

### With Properties

```

<rtk-icon

 icon="example"

 size="md"

 variant="primary">

</rtk-icon>


```

```

<script>

  const el = document.querySelector("rtk-icon");


</script>


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-icon/#page","headline":"rtk-icon · Cloudflare Realtime docs","description":"API reference for rtk-icon component (Web Components (HTML) Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-icon/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/","name":"Web Components (HTML)"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/rtk-icon/","name":"rtk-icon"}}]}
```
