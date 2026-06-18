---
title: RtkChatSelector
description: API reference for RtkChatSelector component (React Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkChatSelector

## Properties

| Property  | Type       | Required | Default               | Description    |
| --------- | ---------- | -------- | --------------------- | -------------- |
| config    | UIConfig1  | ❌        | createDefaultConfig() | Config         |
| iconPack  | IconPack   | ❌        | defaultIconPack       | Icon pack      |
| meeting   | Meeting    | ✅        | \-                    | Meeting object |
| overrides | Overrides1 | ❌        | defaultOverrides      | UI Overrides   |
| size      | Size       | ✅        | \-                    | Size           |
| states    | States1    | ✅        | \-                    | States object  |
| t         | RtkI18n    | ❌        | useLanguage()         | Language       |

## Usage Examples

### Basic Usage

```

import { RtkChatSelector } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return <RtkChatSelector />;

}


```

### With Properties

```

import { RtkChatSelector } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return (

    <RtkChatSelector

      meeting={meeting}

      size="md"

    />

  );

}


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkchatselector/#page","headline":"RtkChatSelector · Cloudflare Realtime docs","description":"API reference for RtkChatSelector component (React Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkchatselector/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/","name":"React"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/rtkchatselector/","name":"RtkChatSelector"}}]}
```
