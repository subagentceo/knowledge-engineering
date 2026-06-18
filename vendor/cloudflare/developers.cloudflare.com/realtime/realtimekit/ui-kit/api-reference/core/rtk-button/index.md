---
title: rtk-button
description: API reference for rtk-button component (Web Components (HTML) Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# rtk-button

A button that follows RTK Design System.

## Properties

| Property | Type                        | Required | Default | Description                          |
| -------- | --------------------------- | -------- | ------- | ------------------------------------ |
| disabled | boolean                     | ✅        | \-      | Where the button is disabled or not  |
| kind     | ButtonKind                  | ✅        | \-      | Button type                          |
| reverse  | boolean                     | ✅        | \-      | Whether to reverse order of children |
| size     | Size                        | ✅        | \-      | Size                                 |
| type     | HTMLButtonElement\['type'\] | ✅        | \-      | Button type                          |
| variant  | ButtonVariant               | ✅        | \-      | Button variant                       |

## Usage Examples

### Basic Usage

```

<rtk-button></rtk-button>


```

### With Properties

```

<rtk-button>

</rtk-button>


```

```

<script>

  const el = document.querySelector("rtk-button");


  el.disabled= true;

  el.reverse= true;

</script>


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-button/#page","headline":"rtk-button · Cloudflare Realtime docs","description":"API reference for rtk-button component (Web Components (HTML) Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-button/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/","name":"Web Components (HTML)"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/rtk-button/","name":"rtk-button"}}]}
```
