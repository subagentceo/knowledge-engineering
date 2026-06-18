---
title: rtk-breakout-room-participants
description: API reference for rtk-breakout-room-participants component (Angular Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# rtk-breakout-room-participants

A component which lists all participants, with ability to run privileged actions on each participant according to your permissions.

## Properties

| Property               | Type       | Required | Default         | Description           |
| ---------------------- | ---------- | -------- | --------------- | --------------------- |
| iconPack               | IconPack   | ❌        | defaultIconPack | Icon pack             |
| meeting                | Meeting    | ✅        | \-              | Meeting object        |
| participantIds         | string\[\] | ✅        | \-              | Participant ids       |
| selectedParticipantIds | string\[\] | ✅        | \-              | selected participants |
| t                      | RtkI18n    | ❌        | useLanguage()   | Language              |

## Usage Examples

### Basic Usage

```

<!-- component.html -->

<rtk-breakout-room-participants></rtk-breakout-room-participants>


```

### With Properties

```

<!-- component.html -->

<rtk-breakout-room-participants

 [meeting]="meeting"

 participantIds="example"

 selectedParticipantIds="example">

</rtk-breakout-room-participants>


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-breakout-room-participants/#page","headline":"rtk-breakout-room-participants · Cloudflare Realtime docs","description":"API reference for rtk-breakout-room-participants component (Angular Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-breakout-room-participants/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/","name":"Angular"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/rtk-breakout-room-participants/","name":"rtk-breakout-room-participants"}}]}
```
