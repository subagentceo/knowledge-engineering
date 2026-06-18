---
title: rtk-notification
description: API reference for rtk-notification component (Angular Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# rtk-notification

A component which shows a notification. You need to remove the element after you receive the`rtkNotificationDismiss` event.

## Properties

| Property     | Type         | Required | Default         | Description             |
| ------------ | ------------ | -------- | --------------- | ----------------------- |
| iconPack     | IconPack     | ❌        | defaultIconPack | Icon pack               |
| notification | Notification | ✅        | \-              | Message                 |
| paused       | boolean      | ✅        | \-              | Stops timeout when true |
| size         | Size         | ✅        | \-              | Size                    |
| t            | RtkI18n      | ❌        | useLanguage()   | Language                |

## Usage Examples

### Basic Usage

```

<!-- component.html -->

<rtk-notification></rtk-notification>


```

### With Properties

```

<!-- component.html -->

<rtk-notification

 [notification]="notification"

 [paused]="true"

 size="md">

</rtk-notification>


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-notification/#page","headline":"rtk-notification · Cloudflare Realtime docs","description":"API reference for rtk-notification component (Angular Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-notification/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/","name":"Angular"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/rtk-notification/","name":"rtk-notification"}}]}
```
