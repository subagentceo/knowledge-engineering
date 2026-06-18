---
title: rtk-participants-stage-list
description: API reference for rtk-participants-stage-list component (Web Components (HTML) Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# rtk-participants-stage-list

A component which lists all participants, with ability to run privileged actions on each participant according to your permissions.

## Properties

| Property   | Type                 | Required | Default               | Description                          |
| ---------- | -------------------- | -------- | --------------------- | ------------------------------------ |
| config     | UIConfig             | ❌        | createDefaultConfig() | Config                               |
| hideHeader | boolean              | ✅        | \-                    | Hide Stage Participants Count Header |
| iconPack   | IconPack             | ❌        | defaultIconPack       | Icon pack                            |
| meeting    | Meeting              | ✅        | \-                    | Meeting object                       |
| search     | string               | ✅        | \-                    | Search                               |
| size       | Size                 | ✅        | \-                    | Size                                 |
| states     | States1              | ✅        | \-                    | Meeting object                       |
| t          | RtkI18n              | ❌        | useLanguage()         | Language                             |
| view       | ParticipantsViewMode | ✅        | \-                    | View mode for participants list      |

## Usage Examples

### Basic Usage

```

<rtk-participants-stage-list></rtk-participants-stage-list>


```

### With Properties

```

<rtk-participants-stage-list

 search="example">

</rtk-participants-stage-list>


```

```

<script>

  const el = document.querySelector("rtk-participants-stage-list");


  el.hideHeader= true;

  el.meeting= meeting

</script>


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-participants-stage-list/#page","headline":"rtk-participants-stage-list · Cloudflare Realtime docs","description":"API reference for rtk-participants-stage-list component (Web Components (HTML) Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-participants-stage-list/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/","name":"Web Components (HTML)"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/rtk-participants-stage-list/","name":"rtk-participants-stage-list"}}]}
```
