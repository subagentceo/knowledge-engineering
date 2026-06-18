---
title: rtk-grid
description: API reference for rtk-grid component (Web Components (HTML) Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# rtk-grid

The main grid component which abstracts all the grid handling logic and renders it for you.

## Properties

| Property    | Type       | Required | Default               | Description                          |
| ----------- | ---------- | -------- | --------------------- | ------------------------------------ |
| aspectRatio | string     | ✅        | \-                    | The aspect ratio of each participant |
| config      | UIConfig   | ❌        | createDefaultConfig() | Config object                        |
| gap         | number     | ✅        | \-                    | Gap between participants             |
| gridSize    | GridSize   | ✅        | \-                    | Grid size                            |
| iconPack    | IconPack   | ❌        | defaultIconPack       | Icon pack                            |
| layout      | GridLayout | ✅        | \-                    | Grid Layout                          |
| meeting     | Meeting    | ✅        | \-                    | Meeting object                       |
| overrides   | any        | ✅        | \-                    | @deprecated                          |
| size        | Size       | ✅        | \-                    | Size                                 |
| states      | States     | ✅        | \-                    | States                               |
| t           | RtkI18n    | ❌        | useLanguage()         | Language                             |

## Usage Examples

### Basic Usage

```

<rtk-grid></rtk-grid>


```

### With Properties

```

<rtk-grid

 aspectRatio="example"

 gridSize="md">

</rtk-grid>


```

```

<script>

  const el = document.querySelector("rtk-grid");


  el.gap= 42;

</script>


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-grid/#page","headline":"rtk-grid · Cloudflare Realtime docs","description":"API reference for rtk-grid component (Web Components (HTML) Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-grid/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/","name":"Web Components (HTML)"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/rtk-grid/","name":"rtk-grid"}}]}
```
