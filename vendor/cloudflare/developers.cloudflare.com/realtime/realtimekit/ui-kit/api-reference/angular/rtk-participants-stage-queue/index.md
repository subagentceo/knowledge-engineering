---
title: rtk-participants-stage-queue
description: API reference for rtk-participants-stage-queue component (Angular Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# rtk-participants-stage-queue

## Properties

| Property | Type                 | Required | Default               | Description                     |
| -------- | -------------------- | -------- | --------------------- | ------------------------------- |
| config   | UIConfig1            | ❌        | createDefaultConfig() | Config                          |
| iconPack | IconPack1            | ❌        | defaultIconPack       | Icon pack                       |
| meeting  | Meeting              | ✅        | \-                    | Meeting object                  |
| size     | Size1                | ✅        | \-                    | Size                            |
| t        | RtkI18n1             | ❌        | useLanguage()         | Language                        |
| view     | ParticipantsViewMode | ✅        | \-                    | View mode for participants list |

## Usage Examples

### Basic Usage

```

<!-- component.html -->

<rtk-participants-stage-queue></rtk-participants-stage-queue>


```

### With Properties

```

<!-- component.html -->

<rtk-participants-stage-queue

 [meeting]="meeting"

 size="md"

 [view]="participantsviewmode">

</rtk-participants-stage-queue>


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-participants-stage-queue/#page","headline":"rtk-participants-stage-queue · Cloudflare Realtime docs","description":"API reference for rtk-participants-stage-queue component (Angular Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-participants-stage-queue/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/","name":"Angular"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/rtk-participants-stage-queue/","name":"rtk-participants-stage-queue"}}]}
```
