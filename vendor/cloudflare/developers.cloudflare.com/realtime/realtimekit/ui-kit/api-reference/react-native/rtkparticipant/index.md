---
title: RtkParticipant
description: API reference for RtkParticipant component (React Native Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkParticipant

A participant list item card showing avatar, name, audio/video status icons, and host control options (pin, kick, mute, stage management).

## Properties

| Property    | Type              | Required | Default         | Description                      |
| ----------- | ----------------- | -------- | --------------- | -------------------------------- |
| participant | Peer              | ✅        | \-              | The participant to display       |
| meeting     | RealtimeKitClient | ❌        | \-              | The RealtimeKit meeting instance |
| iconPack    | IconPack          | ❌        | defaultIconPack | Custom icon pack                 |
| t           | RtkI18n           | ❌        | \-              | i18n translation function        |

## Usage Examples

### Basic Usage

```

import { RtkParticipant } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return <RtkParticipant participant={participant} />;

}


```

### With Properties

```

import { RtkParticipant } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return (

    <RtkParticipant

      participant={participant}

      meeting={meeting}

      iconPack={customIconPack}

    />

  );

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkparticipant/#page","headline":"RtkParticipant · Cloudflare Realtime docs","description":"API reference for RtkParticipant component (React Native Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkparticipant/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/","name":"React Native"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/rtkparticipant/","name":"RtkParticipant"}}]}
```
