---
title: rtk-poll
description: API reference for rtk-poll component (Web Components (HTML) Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# rtk-poll

A poll component. Shows a poll where a user can vote.

## Properties

| Property    | Type                 | Required | Default         | Description        |
| ----------- | -------------------- | -------- | --------------- | ------------------ |
| iconPack    | IconPack             | ❌        | defaultIconPack | Icon pack          |
| permissions | RTKPermissionsPreset | ✅        | \-              | Permissions Object |
| poll        | Poll                 | ✅        | \-              | Poll               |
| self        | string               | ✅        | \-              | Self ID            |
| t           | RtkI18n              | ❌        | useLanguage()   | Language           |

## Usage Examples

### Basic Usage

```

<rtk-poll></rtk-poll>


```

### With Properties

```

<rtk-poll

 self="example">

</rtk-poll>


```

```

<script>

  const el = document.querySelector("rtk-poll");


</script>


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-poll/#page","headline":"rtk-poll · Cloudflare Realtime docs","description":"API reference for rtk-poll component (Web Components (HTML) Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-poll/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/","name":"Web Components (HTML)"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/rtk-poll/","name":"rtk-poll"}}]}
```
