---
title: RtkSpinner
description: API reference for RtkSpinner component (React Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkSpinner

A component which shows an animating spinner.

## Properties

| Property | Type     | Required | Default         | Description |
| -------- | -------- | -------- | --------------- | ----------- |
| iconPack | IconPack | ❌        | defaultIconPack | Icon pack   |
| size     | Size1    | ✅        | \-              | Size        |

## Usage Examples

### Basic Usage

```

import { RtkSpinner } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return <RtkSpinner />;

}


```

### With Properties

```

import { RtkSpinner } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return (

    <RtkSpinner

      size="md"

    />

  );

}


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkspinner/#page","headline":"RtkSpinner · Cloudflare Realtime docs","description":"API reference for RtkSpinner component (React Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkspinner/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/","name":"React"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/rtkspinner/","name":"RtkSpinner"}}]}
```
