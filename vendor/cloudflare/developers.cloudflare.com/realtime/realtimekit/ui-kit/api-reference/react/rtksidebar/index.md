---
title: RtkSidebar
description: API reference for RtkSidebar component (React Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkSidebar

A component which handles the sidebar and you can customize which sections you want, and which section you want as the default.

## Properties

| Property        | Type              | Required | Default               | Description                 |
| --------------- | ----------------- | -------- | --------------------- | --------------------------- |
| config          | UIConfig          | ❌        | createDefaultConfig() | Config                      |
| defaultSection  | RtkSidebarSection | ✅        | \-                    | Default section             |
| enabledSections | RtkSidebarTab\[\] | ✅        | \-                    | Enabled sections in sidebar |
| iconPack        | IconPack          | ❌        | defaultIconPack       | Icon pack                   |
| meeting         | Meeting           | ✅        | \-                    | Meeting object              |
| size            | Size              | ✅        | \-                    | Size                        |
| states          | States            | ✅        | \-                    | States object               |
| t               | RtkI18n           | ❌        | useLanguage()         | Language                    |
| view            | RtkSidebarView    | ✅        | \-                    | View type                   |

## Usage Examples

### Basic Usage

```

import { RtkSidebar } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return <RtkSidebar />;

}


```

### With Properties

```

import { RtkSidebar } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return (

    <RtkSidebar

      defaultSection={rtksidebarsection}

      enabledSections={[]}

      meeting={meeting}

    />

  );

}


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtksidebar/#page","headline":"RtkSidebar · Cloudflare Realtime docs","description":"API reference for RtkSidebar component (React Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtksidebar/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/","name":"React"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/rtksidebar/","name":"RtkSidebar"}}]}
```
