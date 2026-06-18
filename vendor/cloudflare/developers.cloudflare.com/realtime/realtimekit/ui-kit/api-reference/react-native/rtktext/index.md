---
title: RtkText
description: API reference for RtkText component (React Native Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkText

Themed text component that applies the design system's colors, font family, and font size.

## Properties

| Property   | Type                 | Required | Default | Description                                        |       |                                        |       |       |       |       |   |          |             |
| ---------- | -------------------- | -------- | ------- | -------------------------------------------------- | ----- | -------------------------------------- | ----- | ----- | ----- | ----- | - | -------- | ----------- |
| children   | ReactNode            | ✅        | \-      | Text content                                       |       |                                        |       |       |       |       |   |          |             |
| size       | 'sm' \| 'md'         | 'lg'     | 'xl'    | ❌                                                  | 'md'  | Font size (sm=14, md=16, lg=18, xl=20) |       |       |       |       |   |          |             |
| fontWeight | 'normal' \| 'bold'   | '100'    | '200'   | '300'                                              | '400' | '500'                                  | '600' | '700' | '800' | '900' | ❌ | 'normal' | Font weight |
| style      | StyleProp<TextStyle> | ❌        | \\{\\}  | Custom text styles                                 |       |                                        |       |       |       |       |   |          |             |
| onBrand    | boolean              | ❌        | false   | Use brand text color instead of default text color |       |                                        |       |       |       |       |   |          |             |

## Usage Examples

### Basic Usage

```

import { RtkText } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return <RtkText>Hello World</RtkText>;

}


```

### With Properties

```

import { RtkText } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return (

    <RtkText size="lg" fontWeight="bold" onBrand={true}>

      Meeting Title

    </RtkText>

  );

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtktext/#page","headline":"RtkText · Cloudflare Realtime docs","description":"API reference for RtkText component (React Native Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtktext/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/","name":"React Native"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/rtktext/","name":"RtkText"}}]}
```
