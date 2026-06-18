---
title: RtkChatMessagesUi
description: API reference for RtkChatMessagesUi component (React Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkChatMessagesUi

@deprecated Use `rtk-chat-messages-ui-paginated` instead.

## Properties

| Property       | Type      | Required | Default         | Description                         |
| -------------- | --------- | -------- | --------------- | ----------------------------------- |
| canPinMessages | boolean   | ✅        | \-              | Can current user pin/unpin messages |
| iconPack       | IconPack1 | ❌        | defaultIconPack | Icon pack                           |
| messages       | Chat\[\]  | ✅        | \-              | Chat Messages                       |
| selectedGroup  | string    | ✅        | \-              | Selected group key                  |
| selfUserId     | string    | ✅        | \-              | User ID of self user                |
| size           | Size1     | ✅        | \-              | Size                                |
| t              | RtkI18n   | ❌        | useLanguage()   | Language                            |

## Usage Examples

### Basic Usage

```

import { RtkChatMessagesUi } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return <RtkChatMessagesUi />;

}


```

### With Properties

```

import { RtkChatMessagesUi } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return (

    <RtkChatMessagesUi

      canPinMessages={true}

      messages={[]}

      selectedGroup="example"

    />

  );

}


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkchatmessagesui/#page","headline":"RtkChatMessagesUi · Cloudflare Realtime docs","description":"API reference for RtkChatMessagesUi component (React Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkchatmessagesui/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/","name":"React"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/rtkchatmessagesui/","name":"RtkChatMessagesUi"}}]}
```
