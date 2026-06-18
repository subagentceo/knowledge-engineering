---
title: RtkTabBar
description: API reference for RtkTabBar component (React Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkTabBar

## Properties

| Property  | Type        | Required | Default               | Description    |
| --------- | ----------- | -------- | --------------------- | -------------- |
| activeTab | Tab         | ✅        | \-                    | Active tab     |
| config    | UIConfig    | ❌        | createDefaultConfig() | UI Config      |
| iconPack  | IconPack    | ❌        | defaultIconPack       | Icon Pack      |
| layout    | GridLayout1 | ✅        | \-                    | Grid Layout    |
| meeting   | Meeting     | ✅        | \-                    | Meeting object |
| size      | Size        | ✅        | \-                    | Size           |
| states    | States      | ✅        | \-                    | States object  |
| t         | RtkI18n     | ❌        | useLanguage()         | Language       |
| tabs      | Tab\[\]     | ✅        | \-                    | Tabs           |

## Usage Examples

### Basic Usage

```

import { RtkTabBar } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return <RtkTabBar />;

}


```

### With Properties

```

import { RtkTabBar } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return (

    <RtkTabBar

      activeTab={tab}

      layout={gridlayout1}

      meeting={meeting}

    />

  );

}


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtktabbar/#page","headline":"RtkTabBar · Cloudflare Realtime docs","description":"API reference for RtkTabBar component (React Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtktabbar/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/","name":"React"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/rtktabbar/","name":"RtkTabBar"}}]}
```
