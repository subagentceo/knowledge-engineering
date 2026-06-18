---
title: rtk-audio-visualizer
description: API reference for rtk-audio-visualizer component (Web Components (HTML) Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# rtk-audio-visualizer

An audio visualizer component which visualizes a participants audio. Commonly used inside `rtk-name-tag`.

## Properties

| Property      | Type                   | Required | Default         | Description                                                                                   |
| ------------- | ---------------------- | -------- | --------------- | --------------------------------------------------------------------------------------------- |
| hideMuted     | boolean                | ✅        | \-              | Hide the visualizer if audio is muted                                                         |
| iconPack      | IconPack               | ❌        | defaultIconPack | Icon pack                                                                                     |
| isScreenShare | boolean                | ✅        | \-              | Audio visualizer for screensharing, it will use screenShareTracks.audio instead of audioTrack |
| participant   | Peer                   | ✅        | \-              | Participant object                                                                            |
| size          | Size                   | ✅        | \-              | Size                                                                                          |
| t             | RtkI18n                | ❌        | useLanguage()   | Language                                                                                      |
| variant       | AudioVisualizerVariant | ✅        | \-              | Variant                                                                                       |

## Usage Examples

### Basic Usage

```

<rtk-audio-visualizer></rtk-audio-visualizer>


```

### With Properties

```

<rtk-audio-visualizer>

</rtk-audio-visualizer>


```

```

<script>

  const el = document.querySelector("rtk-audio-visualizer");


  el.hideMuted= true;

  el.isScreenShare= true;

  el.participant= participant

</script>


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-audio-visualizer/#page","headline":"rtk-audio-visualizer · Cloudflare Realtime docs","description":"API reference for rtk-audio-visualizer component (Web Components (HTML) Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-audio-visualizer/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/","name":"Web Components (HTML)"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/rtk-audio-visualizer/","name":"rtk-audio-visualizer"}}]}
```
