---
title: RtkImageMessageView
description: API reference for RtkImageMessageView component (React Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkImageMessageView

A component which renders an image message.

## Properties

| Property | Type      | Required | Default         | Description      |
| -------- | --------- | -------- | --------------- | ---------------- |
| iconPack | IconPack1 | ❌        | defaultIconPack | Icon pack        |
| t        | RtkI18n1  | ❌        | useLanguage()   | Language         |
| url      | string    | ✅        | \-              | Url of the image |

## Usage Examples

### Basic Usage

```

import { RtkImageMessageView } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return <RtkImageMessageView />;

}


```

### With Properties

```

import { RtkImageMessageView } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return (

    <RtkImageMessageView

      url="example"

    />

  );

}


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkimagemessageview/#page","headline":"RtkImageMessageView · Cloudflare Realtime docs","description":"API reference for RtkImageMessageView component (React Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkimagemessageview/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/","name":"React"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/rtkimagemessageview/","name":"RtkImageMessageView"}}]}
```
