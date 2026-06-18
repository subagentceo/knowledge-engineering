---
title: rtk-text-message-view
description: API reference for rtk-text-message-view component (Angular Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# rtk-text-message-view

A component which renders a text message from chat.

## Properties

| Property   | Type    | Required | Default | Description                               |
| ---------- | ------- | -------- | ------- | ----------------------------------------- |
| isMarkdown | boolean | ✅        | \-      | Renders text as markdown (default = true) |
| text       | string  | ✅        | \-      | Text message                              |

## Usage Examples

### Basic Usage

```

<!-- component.html -->

<rtk-text-message-view></rtk-text-message-view>


```

### With Properties

```

<!-- component.html -->

<rtk-text-message-view

 [isMarkdown]="true"

 text="example">

</rtk-text-message-view>


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-text-message-view/#page","headline":"rtk-text-message-view · Cloudflare Realtime docs","description":"API reference for rtk-text-message-view component (Angular Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-text-message-view/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/","name":"Angular"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/rtk-text-message-view/","name":"rtk-text-message-view"}}]}
```
