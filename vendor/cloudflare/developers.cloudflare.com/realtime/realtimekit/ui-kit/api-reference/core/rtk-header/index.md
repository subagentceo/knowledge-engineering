---
title: rtk-header
description: API reference for rtk-header component (Web Components (HTML) Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# rtk-header

A component that houses all the header components.

## Properties

| Property      | Type               | Required | Default               | Description                      |
| ------------- | ------------------ | -------- | --------------------- | -------------------------------- |
| config        | UIConfig1          | ❌        | createDefaultConfig() | Config                           |
| disableRender | boolean            | ✅        | \-                    | Whether to render the default UI |
| iconPack      | IconPack1          | ❌        | defaultIconPack       | Icon Pack                        |
| meeting       | Meeting            | ✅        | \-                    | Meeting                          |
| size          | Size               | ✅        | \-                    | Size                             |
| states        | States             | ✅        | \-                    | States                           |
| t             | RtkI18n            | ❌        | useLanguage()         | Language                         |
| variant       | 'solid' \| 'boxed' | ✅        | \-                    | Variant                          |

## Usage Examples

### Basic Usage

```

<rtk-header></rtk-header>


```

### With Properties

```

<rtk-header

 size="md">

</rtk-header>


```

```

<script>

  const el = document.querySelector("rtk-header");


  el.disableRender= true;

  el.meeting= meeting

</script>


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-header/#page","headline":"rtk-header · Cloudflare Realtime docs","description":"API reference for rtk-header component (Web Components (HTML) Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-header/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/","name":"Web Components (HTML)"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/rtk-header/","name":"rtk-header"}}]}
```
