---
title: RtkBreakoutRoomManager
description: API reference for RtkBreakoutRoomManager component (React Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkBreakoutRoomManager

## Properties

| Property              | Type               | Required | Default         | Description                      |
| --------------------- | ------------------ | -------- | --------------- | -------------------------------- |
| allowDelete           | boolean            | ✅        | \-              | allow room delete                |
| assigningParticipants | boolean            | ✅        | \-              | Enable updating participants     |
| defaultExpanded       | boolean            | ✅        | \-              | display expanded card by default |
| iconPack              | IconPack           | ❌        | defaultIconPack | Icon pack                        |
| isDragMode            | boolean            | ✅        | \-              | Drag mode                        |
| meeting               | Meeting            | ✅        | \-              | Meeting object                   |
| mode                  | 'edit' \| 'create' | ✅        | \-              | Mode in which selector is used   |
| room                  | DraftMeeting       | ✅        | \-              | Connected Room Config Object     |
| states                | States             | ✅        | \-              | States object                    |
| t                     | RtkI18n            | ❌        | useLanguage()   | Language                         |

## Usage Examples

### Basic Usage

```

import { RtkBreakoutRoomManager } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return <RtkBreakoutRoomManager />;

}


```

### With Properties

```

import { RtkBreakoutRoomManager } from '@cloudflare/realtimekit-react-ui';


function MyComponent() {

  return (

    <RtkBreakoutRoomManager

      allowDelete={true}

      assigningParticipants={true}

      defaultExpanded={true}

    />

  );

}


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkbreakoutroommanager/#page","headline":"RtkBreakoutRoomManager · Cloudflare Realtime docs","description":"API reference for RtkBreakoutRoomManager component (React Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/react/rtkbreakoutroommanager/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/","name":"React"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/react/rtkbreakoutroommanager/","name":"RtkBreakoutRoomManager"}}]}
```
