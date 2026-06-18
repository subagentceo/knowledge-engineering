---
title: rtk-participants-viewer-list
description: API reference for rtk-participants-viewer-list component (Angular Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# rtk-participants-viewer-list

## Properties

| Property   | Type                 | Required | Default               | Description                     |
| ---------- | -------------------- | -------- | --------------------- | ------------------------------- |
| config     | UIConfig1            | ❌        | createDefaultConfig() | Config                          |
| hideHeader | boolean              | ✅        | \-                    | Hide Viewer Count Header        |
| iconPack   | IconPack1            | ❌        | defaultIconPack       | Icon pack                       |
| meeting    | Meeting              | ✅        | \-                    | Meeting object                  |
| search     | string               | ✅        | \-                    | Search                          |
| size       | Size1                | ✅        | \-                    | Size                            |
| t          | RtkI18n1             | ❌        | useLanguage()         | Language                        |
| view       | ParticipantsViewMode | ✅        | \-                    | View mode for participants list |

## Usage Examples

### Basic Usage

```

<!-- component.html -->

<rtk-participants-viewer-list></rtk-participants-viewer-list>


```

### With Properties

```

<!-- component.html -->

<rtk-participants-viewer-list

 [hideHeader]="true"

 [meeting]="meeting"

 search="example">

</rtk-participants-viewer-list>


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-participants-viewer-list/#page","headline":"rtk-participants-viewer-list · Cloudflare Realtime docs","description":"API reference for rtk-participants-viewer-list component (Angular Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-participants-viewer-list/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/","name":"Angular"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/rtk-participants-viewer-list/","name":"rtk-participants-viewer-list"}}]}
```
