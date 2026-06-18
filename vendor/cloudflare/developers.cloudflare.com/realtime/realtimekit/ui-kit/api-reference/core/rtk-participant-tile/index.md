---
title: rtk-participant-tile
description: API reference for rtk-participant-tile component (Web Components (HTML) Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# rtk-participant-tile

A component which plays a participants video and allows for placement of components like `rtk-name-tag`, `rtk-audio-visualizer` or any other component.

## Properties

| Property        | Type                  | Required       | Default               | Description                      |             |              |   |    |                      |
| --------------- | --------------------- | -------------- | --------------------- | -------------------------------- | ----------- | ------------ | - | -- | -------------------- |
| config          | UIConfig              | ❌              | createDefaultConfig() | Config object                    |             |              |   |    |                      |
| iconPack        | IconPack              | ❌              | defaultIconPack       | Icon pack                        |             |              |   |    |                      |
| isPreview       | boolean               | ✅              | \-                    | Whether tile is used for preview |             |              |   |    |                      |
| meeting         | Meeting               | ✅              | \-                    | Meeting object                   |             |              |   |    |                      |
| nameTagPosition | \| 'bottom-left'      | 'bottom-right' | 'bottom-center'       | 'top-left'                       | 'top-right' | 'top-center' | ✅ | \- | Position of name tag |
| participant     | Peer                  | ✅              | \-                    | Participant object               |             |              |   |    |                      |
| size            | Size                  | ✅              | \-                    | Size                             |             |              |   |    |                      |
| states          | States                | ✅              | \-                    | States object                    |             |              |   |    |                      |
| t               | RtkI18n               | ❌              | useLanguage()         | Language                         |             |              |   |    |                      |
| variant         | 'solid' \| 'gradient' | ✅              | \-                    | Variant                          |             |              |   |    |                      |

## Usage Examples

### Basic Usage

```

<rtk-participant-tile></rtk-participant-tile>


```

### With Properties

```

<rtk-participant-tile>

</rtk-participant-tile>


```

```

<script>

  const el = document.querySelector("rtk-participant-tile");


  el.isPreview= true;

  el.meeting= meeting

</script>


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-participant-tile/#page","headline":"rtk-participant-tile · Cloudflare Realtime docs","description":"API reference for rtk-participant-tile component (Web Components (HTML) Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-participant-tile/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/","name":"Web Components (HTML)"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/rtk-participant-tile/","name":"rtk-participant-tile"}}]}
```
