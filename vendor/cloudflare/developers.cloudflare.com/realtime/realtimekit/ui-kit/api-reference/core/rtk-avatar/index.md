---
title: rtk-avatar
description: API reference for rtk-avatar component (Web Components (HTML) Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# rtk-avatar

Avatar component which renders a participant's image or their initials.

## Properties

| Property    | Type                          | Required                          | Default         | Description |                    |
| ----------- | ----------------------------- | --------------------------------- | --------------- | ----------- | ------------------ |
| iconPack    | IconPack                      | ❌                                 | defaultIconPack | Icon pack   |                    |
| participant | Peer \| WaitlistedParticipant | { name: string; picture: string } | ✅               | \-          | Participant object |
| size        | Size                          | ✅                                 | \-              | Size        |                    |
| t           | RtkI18n                       | ❌                                 | useLanguage()   | Language    |                    |
| variant     | AvatarVariant                 | ✅                                 | \-              | Avatar type |                    |

## Usage Examples

### Basic Usage

```

<rtk-avatar></rtk-avatar>


```

### With Properties

```

<rtk-avatar

 participant="example"

 size="md"

 variant="circular">

</rtk-avatar>


```

```

<script>

  const el = document.querySelector("rtk-avatar");


  el.participant= {};

</script>


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-avatar/#page","headline":"rtk-avatar · Cloudflare Realtime docs","description":"API reference for rtk-avatar component (Web Components (HTML) Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-avatar/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/","name":"Web Components (HTML)"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/rtk-avatar/","name":"rtk-avatar"}}]}
```
