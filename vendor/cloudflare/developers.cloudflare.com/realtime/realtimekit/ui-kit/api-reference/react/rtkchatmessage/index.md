---
title: RtkChatMessage
description: API reference for RtkChatMessage component (React Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkChatMessage

@deprecated `rtk-chat-message` is deprecated and will be removed soon. Use `rtk-message-view` instead.

## Properties

| Property             | Type        | Required | Default         | Description                            |
| -------------------- | ----------- | -------- | --------------- | -------------------------------------- |
| alignRight           | boolean     | ✅        | \-              | aligns message to right                |
| canDelete            | boolean     | ✅        | \-              | can delete message                     |
| canEdit              | boolean     | ✅        | \-              | can edit message                       |
| canPin               | boolean     | ✅        | \-              | can pin this message                   |
| canReply             | boolean     | ✅        | \-              | can quote reply this message           |
| child                | HTMLElement | ✅        | \-              | Child                                  |
| disableControls      | boolean     | ✅        | \-              | disables controls                      |
| hideAvatar           | boolean     | ✅        | \-              | hides avatar                           |
| iconPack             | IconPack1   | ❌        | defaultIconPack | Icon pack                              |
| isContinued          | boolean     | ✅        | \-              | is continued                           |
| isSelf               | boolean     | ✅        | \-              | if sender is self                      |
| isUnread             | boolean     | ✅        | \-              | is unread                              |
| leftAlign            | boolean     | ✅        | \-              | Whether to left align the chat bubbles |
| message              | Message     | ✅        | \-              | message item                           |
| senderDisplayPicture | string      | ✅        | \-              | sender display picture url             |
| size                 | Size        | ✅        | \-              | Size                                   |
| t                    | RtkI18n1    | ❌        | useLanguage()   | Language                               |

## Usage Examples

### Basic Usage

```

import { RtkChatMessage } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return <RtkChatMessage />;

}


```

### With Properties

```

import { RtkChatMessage } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return (

    <RtkChatMessage

      alignRight={true}

      canDelete={true}

      canEdit={true}

    />

  );

}


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkchatmessage/#page","headline":"RtkChatMessage · Cloudflare Realtime docs","description":"API reference for RtkChatMessage component (React Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkchatmessage/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/","name":"React"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/rtkchatmessage/","name":"RtkChatMessage"}}]}
```
