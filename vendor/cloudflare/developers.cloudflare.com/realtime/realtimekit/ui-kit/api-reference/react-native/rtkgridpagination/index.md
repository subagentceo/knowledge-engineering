---
title: RtkGridPagination
description: API reference for RtkGridPagination component (React Native Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkGridPagination

Pagination controls for navigating between pages of participants in the grid. Shows page numbers and navigation arrows.

## Properties

| Property | Type              | Required | Default         | Description                      |
| -------- | ----------------- | -------- | --------------- | -------------------------------- |
| meeting  | RealtimeKitClient | ✅        | \-              | The RealtimeKit meeting instance |
| iconPack | IconPack          | ❌        | defaultIconPack | Custom icon pack                 |
| states   | States            | ❌        | \-              | UI state object                  |
| t        | RtkI18n           | ❌        | \-              | i18n translation function        |

## Usage Examples

### Basic Usage

```

import { RtkGridPagination } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return <RtkGridPagination meeting={meeting} />;

}


```

### With Properties

```

import { RtkGridPagination } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return (

    <RtkGridPagination

      meeting={meeting}

      iconPack={customIconPack}

      states={states}

    />

  );

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkgridpagination/#page","headline":"RtkGridPagination · Cloudflare Realtime docs","description":"API reference for RtkGridPagination component (React Native Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkgridpagination/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/","name":"React Native"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/rtkgridpagination/","name":"RtkGridPagination"}}]}
```
