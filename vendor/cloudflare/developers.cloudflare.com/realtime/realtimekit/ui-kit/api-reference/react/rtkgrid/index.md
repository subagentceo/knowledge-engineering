---
title: RtkGrid
description: API reference for RtkGrid component (React Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkGrid

The main grid component which abstracts all the grid handling logic and renders it for you.

## Properties

| Property    | Type       | Required | Default               | Description                          |
| ----------- | ---------- | -------- | --------------------- | ------------------------------------ |
| aspectRatio | string     | ✅        | \-                    | The aspect ratio of each participant |
| config      | UIConfig   | ❌        | createDefaultConfig() | Config object                        |
| gap         | number     | ✅        | \-                    | Gap between participants             |
| gridSize    | GridSize   | ✅        | \-                    | Grid size                            |
| iconPack    | IconPack   | ❌        | defaultIconPack       | Icon pack                            |
| layout      | GridLayout | ✅        | \-                    | Grid Layout                          |
| meeting     | Meeting    | ✅        | \-                    | Meeting object                       |
| overrides   | any        | ✅        | \-                    | @deprecated                          |
| size        | Size       | ✅        | \-                    | Size                                 |
| states      | States     | ✅        | \-                    | States                               |
| t           | RtkI18n    | ❌        | useLanguage()         | Language                             |

## Usage Examples

### Basic Usage

```

import { RtkGrid } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return <RtkGrid />;

}


```

### With Properties

```

import { RtkGrid } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return (

    <RtkGrid

      aspectRatio="example"

      gap={42}

      gridSize="md"

    />

  );

}


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkgrid/#page","headline":"RtkGrid · Cloudflare Realtime docs","description":"API reference for RtkGrid component (React Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkgrid/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/","name":"React"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/rtkgrid/","name":"RtkGrid"}}]}
```
