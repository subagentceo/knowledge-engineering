---
title: RtkMixedGrid
description: API reference for RtkMixedGrid component (React Native Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkMixedGrid

A grid layout that handles mixed content: participants, screenshares, plugins, and pinned participants. Automatically switches between simple, spotlight, and highlighted grid layouts.

## Properties

| Property                | Type               | Required | Default         | Description                                |      |              |
| ----------------------- | ------------------ | -------- | --------------- | ------------------------------------------ | ---- | ------------ |
| meeting                 | RealtimeKitClient  | ✅        | \-              | The RealtimeKit meeting instance           |      |              |
| participants            | Peer\[\]           | ✅        | \[\]            | Array of active participants               |      |              |
| pinnedParticipants      | Peer\[\]           | ✅        | \[\]            | Array of pinned participants               |      |              |
| screenShareParticipants | Peer\[\]           | ✅        | \[\]            | Array of participants sharing their screen |      |              |
| plugins                 | RTKPlugin\[\]      | ✅        | \[\]            | Array of active plugins                    |      |              |
| aspectRatio             | string             | ❌        | '16:9'          | Aspect ratio for grid tiles                |      |              |
| config                  | UIConfig           | ❌        | defaultConfig   | UI configuration object                    |      |              |
| gap                     | number             | ❌        | 8               | Gap between grid tiles in pixels           |      |              |
| size                    | 'lg' \| 'md'       | 'sm'     | 'xl'            | ❌                                          | 'sm' | Size variant |
| variant                 | 'boxed' \| 'solid' | ❌        | 'solid'         | Visual style variant                       |      |              |
| iconPack                | IconPack           | ❌        | defaultIconPack | Custom icon pack                           |      |              |
| states                  | States             | ❌        | \-              | UI state object                            |      |              |
| t                       | RtkI18n            | ❌        | \-              | i18n translation function                  |      |              |

## Usage Examples

### Basic Usage

```

import { RtkMixedGrid } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return (

    <RtkMixedGrid

      meeting={meeting}

      participants={participants}

      pinnedParticipants={[]}

      screenShareParticipants={[]}

      plugins={[]}

    />

  );

}


```

### With Properties

```

import { RtkMixedGrid } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return (

    <RtkMixedGrid

      meeting={meeting}

      participants={participants}

      pinnedParticipants={pinned}

      screenShareParticipants={screenshares}

      plugins={activePlugins}

      aspectRatio="16:9"

      gap={12}

      size="md"

    />

  );

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkmixedgrid/#page","headline":"RtkMixedGrid · Cloudflare Realtime docs","description":"API reference for RtkMixedGrid component (React Native Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkmixedgrid/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/","name":"React Native"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/rtkmixedgrid/","name":"RtkMixedGrid"}}]}
```
