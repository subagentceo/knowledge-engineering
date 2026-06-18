---
title: RtkControlbarButton
description: API reference for RtkControlbarButton component (React Native Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkControlbarButton

A reusable button for the control bar with icon, label, loading state, and warning indicator support.

## Properties

| Property    | Type                     | Required | Default         | Description                          |      |           |
| ----------- | ------------------------ | -------- | --------------- | ------------------------------------ | ---- | --------- |
| label       | string                   | ✅        | ' '             | Button label text                    |      |           |
| icon        | string                   | ✅        | \-              | SVG icon string                      |      |           |
| iconPack    | IconPack                 | ❌        | defaultIconPack | Custom icon pack                     |      |           |
| isLoading   | boolean                  | ❌        | false           | Show loading spinner instead of icon |      |           |
| disabled    | boolean                  | ❌        | false           | Whether the button is disabled       |      |           |
| onClick     | () => void               | ❌        | \-              | Press handler callback               |      |           |
| showWarning | boolean                  | ❌        | false           | Show warning indicator               |      |           |
| variant     | 'button' \| 'horizontal' | ❌        | 'button'        | Layout variant                       |      |           |
| size        | 'lg' \| 'md'             | 'sm'     | 'xl'            | ❌                                    | 'sm' | Icon size |

## Usage Examples

### Basic Usage

```

import { RtkControlbarButton } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return <RtkControlbarButton label="Mute" icon={muteIcon} />;

}


```

### With Properties

```

import { RtkControlbarButton } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return (

    <RtkControlbarButton

      label="Mute"

      icon={muteIcon}

      variant="horizontal"

      size="md"

      onClick={() => console.log("pressed")}

    />

  );

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkcontrolbarbutton/#page","headline":"RtkControlbarButton · Cloudflare Realtime docs","description":"API reference for RtkControlbarButton component (React Native Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkcontrolbarbutton/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/","name":"React Native"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/rtkcontrolbarbutton/","name":"RtkControlbarButton"}}]}
```
