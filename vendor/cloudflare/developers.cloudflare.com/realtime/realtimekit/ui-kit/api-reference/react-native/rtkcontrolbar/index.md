---
title: RtkControlbar
description: API reference for RtkControlbar component (React Native Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkControlbar

The main control bar container that renders meeting controls (mic, camera, leave, and more) using the declarative UI config system.

## Properties

| Property | Type               | Required | Default       | Description                      |      |              |
| -------- | ------------------ | -------- | ------------- | -------------------------------- | ---- | ------------ |
| meeting  | RealtimeKitClient  | ✅        | \-            | The RealtimeKit meeting instance |      |              |
| config   | UIConfig           | ❌        | defaultConfig | UI configuration object          |      |              |
| size     | 'lg' \| 'md'       | 'sm'     | 'xl'          | ❌                                | 'sm' | Size variant |
| variant  | 'boxed' \| 'solid' | ❌        | 'solid'       | Visual style variant             |      |              |
| iconPack | IconPack           | ❌        | \-            | Custom icon pack                 |      |              |
| states   | States             | ❌        | \-            | UI state object                  |      |              |
| t        | RtkI18n            | ❌        | \-            | i18n translation function        |      |              |

## Usage Examples

### Basic Usage

```

import { RtkControlbar } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return <RtkControlbar meeting={meeting} />;

}


```

### With Properties

```

import { RtkControlbar } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return (

    <RtkControlbar

      meeting={meeting}

      variant="solid"

      size="md"

      config={customConfig}

    />

  );

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkcontrolbar/#page","headline":"RtkControlbar · Cloudflare Realtime docs","description":"API reference for RtkControlbar component (React Native Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkcontrolbar/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/","name":"React Native"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/rtkcontrolbar/","name":"RtkControlbar"}}]}
```
