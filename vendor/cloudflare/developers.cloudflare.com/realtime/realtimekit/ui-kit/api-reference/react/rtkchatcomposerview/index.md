---
title: RtkChatComposerView
description: API reference for RtkChatComposerView component (React Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkChatComposerView

A component which renders a chat composer

## Properties

| Property             | Type                                        | Required | Default         | Description                             |
| -------------------- | ------------------------------------------- | -------- | --------------- | --------------------------------------- |
| canSendFiles         | boolean                                     | ✅        | \-              | Whether user can send file messages     |
| canSendTextMessage   | boolean                                     | ✅        | \-              | Whether user can send text messages     |
| iconPack             | IconPack1                                   | ❌        | defaultIconPack | Icon pack                               |
| inputTextPlaceholder | string                                      | ✅        | \-              | Placeholder for text input              |
| isEditing            | boolean                                     | ✅        | \-              | Sets composer to edit mode              |
| maxLength            | number                                      | ✅        | \-              | Max length for text input               |
| message              | string                                      | ✅        | \-              | Message to be pre-populated             |
| quotedMessage        | string                                      | ✅        | \-              | Quote message to be displayed           |
| rateLimits           | { period: number; maxInvocations: number; } | ✅        | \-              | Rate limits                             |
| storageKey           | string                                      | ✅        | \-              | Key for storing message in localStorage |
| t                    | RtkI18n1                                    | ❌        | useLanguage()   | Language                                |

## Usage Examples

### Basic Usage

```

import { RtkChatComposerView } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return <RtkChatComposerView />;

}


```

### With Properties

```

import { RtkChatComposerView } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return (

    <RtkChatComposerView

      canSendFiles={true}

      canSendTextMessage={true}

      inputTextPlaceholder="example"

    />

  );

}


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkchatcomposerview/#page","headline":"RtkChatComposerView · Cloudflare Realtime docs","description":"API reference for RtkChatComposerView component (React Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkchatcomposerview/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/","name":"React"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/rtkchatcomposerview/","name":"RtkChatComposerView"}}]}
```
