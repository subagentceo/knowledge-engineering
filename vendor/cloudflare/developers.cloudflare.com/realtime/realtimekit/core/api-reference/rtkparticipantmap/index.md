---
title: RTKParticipantMap
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RTKParticipantMap

This is a map of participants, indexed by `participant.id` (a participant's peer ID). This map emits an event whenever a participant present in the map emits an event. For example, when a participant is added to this map, a `participantJoined` event is emitted from the map. When a participant object emits an event `videoUpdate`, the map re-emits that event (provided the participant is present in the map).

* [RTKParticipantMap](#module%5FRTKParticipantMap)  
   * [module.exports](#exp%5Fmodule%5FRTKParticipantMap--module.exports) ⏏  
         * [new module.exports(logger, \[options\])](#new%5Fmodule%5FRTKParticipantMap--module.exports%5Fnew)  
         * [.add(participant, \[emitEvent\])](#module%5FRTKParticipantMap--module.exports+add)  
         * [.clear(\[emitEvent\], \[removeListeners\])](#module%5FRTKParticipantMap--module.exports+clear)  
         * [.delete(participantId, \[emitEvent\], \[removeListeners\])](#module%5FRTKParticipantMap--module.exports+delete)

### module.exports ⏏

**Kind**: Exported class  

#### new module.exports(logger, \[options\])

| Param       | Type      |
| ----------- | --------- |
| logger      | Logger    |
| \[options\] | MapEvents |

#### module.exports.add(participant, \[emitEvent\])

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKParticipantMap--module.exports)

| Param         | Type    | Default |
| ------------- | ------- | ------- |
| participant   | T       |         |
| \[emitEvent\] | boolean | true    |

#### module.exports.clear(\[emitEvent\], \[removeListeners\])

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKParticipantMap--module.exports)

| Param               | Type    | Default |
| ------------------- | ------- | ------- |
| \[emitEvent\]       | boolean | true    |
| \[removeListeners\] | boolean | false   |

#### module.exports.delete(participantId, \[emitEvent\], \[removeListeners\])

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKParticipantMap--module.exports)

| Param               | Type    | Default |
| ------------------- | ------- | ------- |
| participantId       | string  |         |
| \[emitEvent\]       | boolean | true    |
| \[removeListeners\] | boolean | false   |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkparticipantmap/#page","headline":"RTKParticipantMap · Cloudflare Realtime docs","url":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkparticipantmap/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-02-10","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/core/","name":"Build using Core SDK"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/core/api-reference/","name":"API Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/core/api-reference/rtkparticipantmap/","name":"RTKParticipantMap"}}]}
```
