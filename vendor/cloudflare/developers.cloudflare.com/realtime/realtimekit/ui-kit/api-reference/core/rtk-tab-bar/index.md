---
title: rtk-tab-bar
description: API reference for rtk-tab-bar component (Web Components (HTML) Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# rtk-tab-bar

## Properties

| Property  | Type        | Required | Default               | Description    |
| --------- | ----------- | -------- | --------------------- | -------------- |
| activeTab | Tab         | ✅        | \-                    | Active tab     |
| config    | UIConfig    | ❌        | createDefaultConfig() | UI Config      |
| iconPack  | IconPack    | ❌        | defaultIconPack       | Icon Pack      |
| layout    | GridLayout1 | ✅        | \-                    | Grid Layout    |
| meeting   | Meeting     | ✅        | \-                    | Meeting object |
| size      | Size        | ✅        | \-                    | Size           |
| states    | States      | ✅        | \-                    | States object  |
| t         | RtkI18n     | ❌        | useLanguage()         | Language       |
| tabs      | Tab\[\]     | ✅        | \-                    | Tabs           |

## Usage Examples

### Basic Usage

```

<rtk-tab-bar></rtk-tab-bar>


```

### With Properties

```

<rtk-tab-bar>

</rtk-tab-bar>


```

```

<script>

  const el = document.querySelector("rtk-tab-bar");


  el.meeting= meeting

</script>


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-tab-bar/#page","headline":"rtk-tab-bar · Cloudflare Realtime docs","description":"API reference for rtk-tab-bar component (Web Components (HTML) Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-tab-bar/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/","name":"Web Components (HTML)"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/rtk-tab-bar/","name":"rtk-tab-bar"}}]}
```
