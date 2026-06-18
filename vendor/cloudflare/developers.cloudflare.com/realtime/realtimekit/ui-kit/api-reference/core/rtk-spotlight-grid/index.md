---
title: rtk-spotlight-grid
description: API reference for rtk-spotlight-grid component (Web Components (HTML) Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# rtk-spotlight-grid

A grid component that renders two lists of participants: `pinnedParticipants` and `participants`. You can customize the layout to a `column` view, by default is is `row`.

* Participants from `pinnedParticipants[]` are rendered inside a larger grid.
* Participants from `participants[]` array are rendered in a smaller grid.

## Properties

| Property           | Type        | Required | Default               | Description                                           |
| ------------------ | ----------- | -------- | --------------------- | ----------------------------------------------------- |
| aspectRatio        | string      | ✅        | \-                    | Aspect Ratio of participant tile Format: width:height |
| config             | UIConfig    | ❌        | createDefaultConfig() | UI Config                                             |
| gap                | number      | ✅        | \-                    | Gap between participant tiles                         |
| gridSize           | GridSize1   | ✅        | \-                    | Grid size                                             |
| iconPack           | IconPack    | ❌        | defaultIconPack       | Icon Pack                                             |
| layout             | GridLayout1 | ✅        | \-                    | Grid Layout                                           |
| meeting            | Meeting     | ✅        | \-                    | Meeting object                                        |
| participants       | Peer\[\]    | ✅        | \-                    | Participants                                          |
| pinnedParticipants | Peer\[\]    | ✅        | \-                    | Pinned Participants                                   |
| size               | Size        | ✅        | \-                    | Size                                                  |
| states             | States      | ✅        | \-                    | States object                                         |
| t                  | RtkI18n     | ❌        | useLanguage()         | Language                                              |

## Usage Examples

### Basic Usage

```

<rtk-spotlight-grid></rtk-spotlight-grid>


```

### With Properties

```

<rtk-spotlight-grid

 aspectRatio="example"

 gridSize="md">

</rtk-spotlight-grid>


```

```

<script>

  const el = document.querySelector("rtk-spotlight-grid");


  el.gap= 42;

</script>


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-spotlight-grid/#page","headline":"rtk-spotlight-grid · Cloudflare Realtime docs","description":"API reference for rtk-spotlight-grid component (Web Components (HTML) Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-spotlight-grid/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/","name":"Web Components (HTML)"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/rtk-spotlight-grid/","name":"rtk-spotlight-grid"}}]}
```
