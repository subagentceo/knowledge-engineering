---
title: rtk-ui-provider
description: API reference for rtk-ui-provider component (Web Components (HTML) Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# rtk-ui-provider

## Properties

| Property        | Type            | Required | Default          | Description                         |
| --------------- | --------------- | -------- | ---------------- | ----------------------------------- |
| config          | UIConfig1       | ✅        | \-               | Config                              |
| iconPack        | IconPack1       | ❌        | defaultIconPack  | Icon pack                           |
| meeting         | Meeting \| null | ❌        | null             | Meeting                             |
| mode            | MeetingMode1    | ✅        | \-               | Fill type                           |
| overrides       | Overrides1      | ❌        | defaultOverrides | UI Kit Overrides                    |
| showSetupScreen | boolean         | ✅        | \-               | Whether to show setup screen or not |
| t               | RtkI18n1        | ❌        | useLanguage()    | Language utility                    |

## Usage Examples

### Basic Usage

```

<rtk-ui-provider></rtk-ui-provider>


```

### With Properties

```

<rtk-ui-provider>

</rtk-ui-provider>


```

```

<script>

  const el = document.querySelector("rtk-ui-provider");


  el.config= defaultUiConfig

  el.mode= meeting

  el.showSetupScreen= true;

</script>


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-ui-provider/#page","headline":"rtk-ui-provider · Cloudflare Realtime docs","description":"API reference for rtk-ui-provider component (Web Components (HTML) Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/core/rtk-ui-provider/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/","name":"Web Components (HTML)"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/core/rtk-ui-provider/","name":"rtk-ui-provider"}}]}
```
