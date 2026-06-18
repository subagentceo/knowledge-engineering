---
title: RtkMenu
description: API reference for RtkMenu component (React Native Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkMenu

A menu container component with placement options.

## Properties

| Property  | Type                     | Required       | Default | Description  |              |              |             |               |       |           |             |   |    |                                    |
| --------- | ------------------------ | -------------- | ------- | ------------ | ------------ | ------------ | ----------- | ------------- | ----- | --------- | ----------- | - | -- | ---------------------------------- |
| children  | ReactNode                | ✅              | \-      | Menu content |              |              |             |               |       |           |             |   |    |                                    |
| size      | 'lg' \| 'md'             | 'sm'           | 'xl'    | ✅            | \-           | Size variant |             |               |       |           |             |   |    |                                    |
| placement | 'bottom' \| 'bottom-end' | 'bottom-start' | 'left'  | 'left-end'   | 'left-start' | 'right'      | 'right-end' | 'right-start' | 'top' | 'top-end' | 'top-start' | ✅ | \- | Menu placement relative to trigger |

## Usage Examples

### Basic Usage

```

import { RtkMenu } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return (

    <RtkMenu size="md" placement="bottom">

      <Text>Menu content</Text>

    </RtkMenu>

  );

}


```

### With Properties

```

import { RtkMenu } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return (

    <RtkMenu size="lg" placement="bottom-start">

      <Text>Menu content</Text>

    </RtkMenu>

  );

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkmenu/#page","headline":"RtkMenu · Cloudflare Realtime docs","description":"API reference for RtkMenu component (React Native Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkmenu/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/","name":"React Native"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/rtkmenu/","name":"RtkMenu"}}]}
```
