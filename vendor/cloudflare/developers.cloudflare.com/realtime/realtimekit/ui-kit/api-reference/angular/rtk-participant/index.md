---
title: rtk-participant
description: API reference for rtk-participant component (Angular Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# rtk-participant

A participant entry component used inside `rtk-participants` which shows data like: name, picture and media device status. You can perform privileged actions on the participant too.

## Properties

| Property    | Type                | Required | Default               | Description              |
| ----------- | ------------------- | -------- | --------------------- | ------------------------ |
| config      | UIConfig1           | ❌        | createDefaultConfig() | Config object            |
| iconPack    | IconPack            | ❌        | defaultIconPack       | Icon pack                |
| meeting     | Meeting             | ✅        | \-                    | Meeting object           |
| participant | Peer                | ✅        | \-                    | Participant object       |
| states      | States1             | ✅        | \-                    | States                   |
| t           | RtkI18n             | ❌        | useLanguage()         | Language                 |
| view        | ParticipantViewMode | ✅        | \-                    | Show participant summary |

## Usage Examples

### Basic Usage

```

<!-- component.html -->

<rtk-participant></rtk-participant>


```

### With Properties

```

<!-- component.html -->

<rtk-participant

 [meeting]="meeting"

 [participant]="participant"

 [view]="participantviewmode">

</rtk-participant>


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-participant/#page","headline":"rtk-participant · Cloudflare Realtime docs","description":"API reference for rtk-participant component (Angular Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-participant/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/","name":"Angular"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/rtk-participant/","name":"rtk-participant"}}]}
```
