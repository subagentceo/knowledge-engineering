---
title: RtkPollForm
description: API reference for RtkPollForm component (React Native Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkPollForm

Form for creating a new poll with question, dynamic options, anonymous voting, and hide results toggles.

## Properties

| Property        | Type     | Required | Default         | Description                                                                      |
| --------------- | -------- | -------- | --------------- | -------------------------------------------------------------------------------- |
| iconPack        | IconPack | ❌        | defaultIconPack | Custom icon pack                                                                 |
| t               | RtkI18n  | ❌        | \-              | i18n translation function                                                        |
| onRtkCreatePoll | any      | ❌        | \-              | Callback when poll is created (receives question, options, anonymous, hideVotes) |

## Usage Examples

### Basic Usage

```

import { RtkPollForm } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return <RtkPollForm onRtkCreatePoll={(data) => handleCreatePoll(data)} />;

}


```

### With Properties

```

import { RtkPollForm } from "@cloudflare/realtimekit-react-native-ui";


function MyComponent() {

  return (

    <RtkPollForm

      onRtkCreatePoll={(data) => handleCreatePoll(data)}

      iconPack={customIconPack}

    />

  );

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkpollform/#page","headline":"RtkPollForm · Cloudflare Realtime docs","description":"API reference for RtkPollForm component (React Native Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react-native/rtkpollform/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/","name":"React Native"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react-native/rtkpollform/","name":"RtkPollForm"}}]}
```
