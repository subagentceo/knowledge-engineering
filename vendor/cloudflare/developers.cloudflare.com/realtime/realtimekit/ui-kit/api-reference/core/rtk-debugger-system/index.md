---
title: rtk-debugger-system
description: API reference for rtk-debugger-system component (Web Components (HTML) Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# rtk-debugger-system

## Properties

| Property | Type      | Required | Default         | Description    |
| -------- | --------- | -------- | --------------- | -------------- |
| iconPack | IconPack1 | ❌        | defaultIconPack | Icon pack      |
| meeting  | Meeting   | ✅        | \-              | Meeting object |
| size     | Size1     | ✅        | \-              | Size           |
| states   | States1   | ✅        | \-              | States object  |
| t        | RtkI18n1  | ❌        | useLanguage()   | Language       |

## Usage Examples

### Basic Usage

```

<rtk-debugger-system></rtk-debugger-system>


```

### With Properties

```

<rtk-debugger-system

 size="md">

</rtk-debugger-system>


```

```

<script>

  const el = document.querySelector("rtk-debugger-system");


  el.meeting= meeting

</script>


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-debugger-system/#page","headline":"rtk-debugger-system · Cloudflare Realtime docs","description":"API reference for rtk-debugger-system component (Web Components (HTML) Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-debugger-system/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/","name":"Web Components (HTML)"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/rtk-debugger-system/","name":"rtk-debugger-system"}}]}
```
