---
title: rtk-screenshare-view
description: API reference for rtk-screenshare-view component (Angular Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# rtk-screenshare-view

A component which plays a participant's screenshared video. It also allows for placement of other components similar to `rtk-participant-tile`. This component will not render anything if the participant hasn't start screensharing.

## Properties

| Property             | Type                  | Required       | Default         | Description             |             |              |   |    |                      |
| -------------------- | --------------------- | -------------- | --------------- | ----------------------- | ----------- | ------------ | - | -- | -------------------- |
| hideFullScreenButton | boolean               | ✅              | \-              | Hide full screen button |             |              |   |    |                      |
| iconPack             | IconPack              | ❌              | defaultIconPack | Icon pack               |             |              |   |    |                      |
| meeting              | Meeting               | ✅              | \-              | Meeting object          |             |              |   |    |                      |
| nameTagPosition      | \| 'bottom-left'      | 'bottom-right' | 'bottom-center' | 'top-left'              | 'top-right' | 'top-center' | ✅ | \- | Position of name tag |
| participant          | Peer                  | ✅              | \-              | Participant object      |             |              |   |    |                      |
| size                 | Size                  | ✅              | \-              | Size                    |             |              |   |    |                      |
| t                    | RtkI18n               | ❌              | useLanguage()   | Language                |             |              |   |    |                      |
| variant              | 'solid' \| 'gradient' | ✅              | \-              | Variant                 |             |              |   |    |                      |

## Usage Examples

### Basic Usage

```

<!-- component.html -->

<rtk-screenshare-view></rtk-screenshare-view>


```

### With Properties

```

<!-- component.html -->

<rtk-screenshare-view

 [hideFullScreenButton]="true"

 [meeting]="meeting"

 [nameTagPosition]="| 'bottom-left'

    | 'bottom-right'

    | 'bottom-center'

    | 'top-left'

    | 'top-right'

    | 'top-center'">

</rtk-screenshare-view>


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-screenshare-view/#page","headline":"rtk-screenshare-view · Cloudflare Realtime docs","description":"API reference for rtk-screenshare-view component (Angular Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-screenshare-view/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/","name":"Angular"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/rtk-screenshare-view/","name":"rtk-screenshare-view"}}]}
```
