---
title: rtk-tooltip
description: API reference for rtk-tooltip component (Web Components (HTML) Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# rtk-tooltip

Tooltip component which follows RTK Design System.

## Properties

| Property  | Type           | Required | Default | Description                      |
| --------- | -------------- | -------- | ------- | -------------------------------- |
| delay     | number         | ✅        | \-      | Delay before showing the tooltip |
| disabled  | boolean        | ✅        | \-      | Disabled                         |
| kind      | TooltipKind    | ✅        | \-      | Tooltip kind                     |
| label     | string         | ✅        | \-      | Tooltip label                    |
| open      | boolean        | ✅        | \-      | Open                             |
| placement | Placement      | ✅        | \-      | Placement of menu                |
| size      | Size           | ✅        | \-      | Size                             |
| variant   | TooltipVariant | ✅        | \-      | Tooltip variant                  |

## Usage Examples

### Basic Usage

```

<rtk-tooltip></rtk-tooltip>


```

### With Properties

```

<rtk-tooltip>

</rtk-tooltip>


```

```

<script>

  const el = document.querySelector("rtk-tooltip");


  el.delay= 42;

  el.disabled= true;

</script>


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-tooltip/#page","headline":"rtk-tooltip · Cloudflare Realtime docs","description":"API reference for rtk-tooltip component (Web Components (HTML) Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-tooltip/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/","name":"Web Components (HTML)"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/rtk-tooltip/","name":"rtk-tooltip"}}]}
```
