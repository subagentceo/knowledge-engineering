---
title: RtkVirtualizedParticipantList
description: API reference for RtkVirtualizedParticipantList component (React Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkVirtualizedParticipantList

## Properties

| Property           | Type                         | Required | Default | Description                                              |
| ------------------ | ---------------------------- | -------- | ------- | -------------------------------------------------------- |
| bufferedItemsCount | number                       | ✅        | \-      | Buffer items to render before and after the visible area |
| emptyListElement   | HTMLElement                  | ✅        | \-      | Element to render if list is empty                       |
| itemHeight         | number                       | ✅        | \-      | Height of each item in pixels (assumed fixed)            |
| items              | Peer1\[\]                    | ✅        | \-      | Items to be virtualized                                  |
| renderItem         | (item: Peer1, index: number) | ✅        | \-      | Function to render each item                             |

## Usage Examples

### Basic Usage

```

import { RtkVirtualizedParticipantList } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return <RtkVirtualizedParticipantList />;

}


```

### With Properties

```

import { RtkVirtualizedParticipantList } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return (

    <RtkVirtualizedParticipantList

      bufferedItemsCount={42}

      emptyListElement={htmlelement}

      itemHeight={42}

    />

  );

}


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkvirtualizedparticipantlist/#page","headline":"RtkVirtualizedParticipantList · Cloudflare Realtime docs","description":"API reference for RtkVirtualizedParticipantList component (React Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkvirtualizedparticipantlist/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/","name":"React"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/rtkvirtualizedparticipantlist/","name":"RtkVirtualizedParticipantList"}}]}
```
