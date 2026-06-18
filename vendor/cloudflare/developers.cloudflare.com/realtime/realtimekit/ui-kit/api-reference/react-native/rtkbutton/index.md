---
title: RtkButton
description: API reference for RtkButton component (React Native Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkButton

A general-purpose button component with multiple variants and sizes.

## Properties

| Property | Type                | Required  | Default     | Description                      |             |                      |
| -------- | ------------------- | --------- | ----------- | -------------------------------- | ----------- | -------------------- |
| children | ReactNode           | ❌         | \-          | Button content/label             |             |                      |
| onClick  | any                 | ✅         | \-          | Press handler callback           |             |                      |
| kind     | 'button' \| 'icon'  | 'wide'    | ❌           | 'button'                         | Button kind |                      |
| variant  | 'danger' \| 'ghost' | 'primary' | 'secondary' | ❌                                | \-          | Visual style variant |
| size     | 'lg' \| 'md'        | 'sm'      | 'xl'        | ❌                                | \-          | Button size          |
| reverse  | boolean             | ❌         | false       | Reverse the button content order |             |                      |
| disabled | boolean             | ❌         | \-          | Whether the button is disabled   |             |                      |
| style    | StyleProp<any>      | ❌         | \-          | Custom React Native styles       |             |                      |

## Usage Examples

### Basic Usage

```

import { RtkButton } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return <RtkButton onClick={() => console.log("pressed")}>Press Me</RtkButton>;

}


```

### With Properties

```

import { RtkButton } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return (

    <RtkButton

      onClick={() => console.log("pressed")}

      variant="primary"

      size="md"

      kind="wide"

    >

      Join Meeting

    </RtkButton>

  );

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkbutton/#page","headline":"RtkButton · Cloudflare Realtime docs","description":"API reference for RtkButton component (React Native Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkbutton/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/","name":"React Native"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/rtkbutton/","name":"RtkButton"}}]}
```
