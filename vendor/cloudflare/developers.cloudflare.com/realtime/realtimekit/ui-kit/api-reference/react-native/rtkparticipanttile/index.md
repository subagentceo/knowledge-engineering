---
title: RtkParticipantTile
description: API reference for RtkParticipantTile component (React Native Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkParticipantTile

A video tile for a single participant showing their video feed, name tag with audio indicator, avatar (when video is off), and pin indicator.

## Properties

| Property        | Type                             | Required       | Default         | Description                                            |             |              |   |               |                                  |
| --------------- | -------------------------------- | -------------- | --------------- | ------------------------------------------------------ | ----------- | ------------ | - | ------------- | -------------------------------- |
| meeting         | RealtimeKitClient                | ✅              | \-              | The RealtimeKit meeting instance                       |             |              |   |               |                                  |
| participant     | RTKParticipant \| RTKSelf        | ✅              | \-              | The participant to render                              |             |              |   |               |                                  |
| config          | UIConfig                         | ❌              | defaultConfig   | UI configuration object                                |             |              |   |               |                                  |
| style           | StyleProp<any>                   | ❌              | \-              | Custom styles (typically width/height for grid sizing) |             |              |   |               |                                  |
| nameTagPosition | 'bottom-center' \| 'bottom-left' | 'bottom-right' | 'top-center'    | 'top-left'                                             | 'top-right' | 'none'       | ❌ | 'bottom-left' | Position of the name tag overlay |
| isPreview       | boolean                          | ❌              | false           | Whether this is a preview tile (setup screen)          |             |              |   |               |                                  |
| iconPack        | IconPack                         | ❌              | defaultIconPack | Custom icon pack                                       |             |              |   |               |                                  |
| size            | 'lg' \| 'md'                     | 'sm'           | 'xl'            | ❌                                                      | 'sm'        | Size variant |   |               |                                  |
| states          | States                           | ❌              | \-              | UI state object                                        |             |              |   |               |                                  |
| t               | RtkI18n                          | ❌              | \-              | i18n translation function                              |             |              |   |               |                                  |
| children        | ReactNode                        | ❌              | \-              | Additional content to overlay on the tile              |             |              |   |               |                                  |

## Usage Examples

### Basic Usage

```

import { RtkParticipantTile } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return <RtkParticipantTile meeting={meeting} participant={participant} />;

}


```

### With Properties

```

import { RtkParticipantTile } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return (

    <RtkParticipantTile

      meeting={meeting}

      participant={participant}

      nameTagPosition="bottom-left"

      isPreview={false}

      size="md"

    />

  );

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkparticipanttile/#page","headline":"RtkParticipantTile · Cloudflare Realtime docs","description":"API reference for RtkParticipantTile component (React Native Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkparticipanttile/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/","name":"React Native"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/rtkparticipanttile/","name":"RtkParticipantTile"}}]}
```
