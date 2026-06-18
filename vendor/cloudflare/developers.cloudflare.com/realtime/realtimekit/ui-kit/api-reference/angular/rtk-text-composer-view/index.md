---
title: rtk-text-composer-view
description: API reference for rtk-text-composer-view component (Angular Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# rtk-text-composer-view

A component which renders a text composer

## Properties

| Property          | Type                            | Required | Default         | Description                                   |
| ----------------- | ------------------------------- | -------- | --------------- | --------------------------------------------- |
| disabled          | boolean                         | ✅        | \-              | Disable the text input (default = false)      |
| iconPack          | IconPack1                       | ❌        | defaultIconPack | Icon pack                                     |
| keyDownHandler    | (e: KeyboardEvent)              | ✅        | \-              | Keydown event handler function                |
| maxLength         | number                          | ✅        | \-              | Max length for text input                     |
| placeholder       | string                          | ✅        | \-              | Placeholder text                              |
| rateLimitBreached | boolean                         | ✅        | \-              | Boolean to indicate if rate limit is breached |
| setText           | (text: string, focus?: boolean) | ❌        | \-              | Sets value of the text input                  |
| t                 | RtkI18n1                        | ❌        | useLanguage()   | Language                                      |
| value             | string                          | ✅        | \-              | Default value for text input                  |

## Usage Examples

### Basic Usage

```

<!-- component.html -->

<rtk-text-composer-view></rtk-text-composer-view>


```

### With Properties

```

<!-- component.html -->

<rtk-text-composer-view

 [disabled]="true"

 [keyDownHandler]="(e: keyboardevent)"

 maxLength="42">

</rtk-text-composer-view>


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-text-composer-view/#page","headline":"rtk-text-composer-view · Cloudflare Realtime docs","description":"API reference for rtk-text-composer-view component (Angular Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/angular/rtk-text-composer-view/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/","name":"Angular"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/angular/rtk-text-composer-view/","name":"rtk-text-composer-view"}}]}
```
