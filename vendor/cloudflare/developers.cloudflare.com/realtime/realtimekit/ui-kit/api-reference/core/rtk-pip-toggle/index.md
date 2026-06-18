---
title: rtk-pip-toggle
description: API reference for rtk-pip-toggle component (Web Components (HTML) Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# rtk-pip-toggle

## Properties

| Property | Type              | Required | Default               | Description    |
| -------- | ----------------- | -------- | --------------------- | -------------- |
| config   | UIConfig1         | ❌        | createDefaultConfig() | Config         |
| iconPack | IconPack1         | ❌        | defaultIconPack       | Icon pack      |
| meeting  | Meeting           | ✅        | \-                    | Meeting object |
| size     | Size1             | ✅        | \-                    | Size           |
| states   | States1           | ✅        | \-                    | States object  |
| t        | RtkI18n           | ❌        | useLanguage()         | Language       |
| variant  | ControlBarVariant | ✅        | \-                    | Variant        |

## Usage Examples

### Basic Usage

```

<rtk-pip-toggle></rtk-pip-toggle>


```

### With Properties

```

<rtk-pip-toggle

 size="md"

 variant"button">

</rtk-pip-toggle>


```

```

<script>

  const el = document.querySelector("rtk-pip-toggle");


  el.meeting= meeting

</script>


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-pip-toggle/#page","headline":"rtk-pip-toggle · Cloudflare Realtime docs","description":"API reference for rtk-pip-toggle component (Web Components (HTML) Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-pip-toggle/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/","name":"Web Components (HTML)"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/rtk-pip-toggle/","name":"rtk-pip-toggle"}}]}
```
