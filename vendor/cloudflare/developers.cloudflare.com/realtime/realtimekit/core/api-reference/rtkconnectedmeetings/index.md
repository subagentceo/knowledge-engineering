---
title: RTKConnectedMeetings
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RTKConnectedMeetings

This consists of the methods to facilitate connected meetings

* [RTKConnectedMeetings](#module%5FRTKConnectedMeetings)  
   * [module.exports](#exp%5Fmodule%5FRTKConnectedMeetings--module.exports) ⏏  
         * [new module.exports(context)](#new%5Fmodule%5FRTKConnectedMeetings--module.exports%5Fnew)  
         * [.getRTKConnectedMeetings()](#module%5FRTKConnectedMeetings--module.exports+getRTKConnectedMeetings)  
         * [.createMeetings(request)](#module%5FRTKConnectedMeetings--module.exports+createMeetings)  
         * [.updateMeetings(request)](#module%5FRTKConnectedMeetings--module.exports+updateMeetings)  
         * [.deleteMeetings(meetingIds)](#module%5FRTKConnectedMeetings--module.exports+deleteMeetings)  
         * [.moveParticipants(sourceMeetingId, destinationMeetingId, participantIds)](#module%5FRTKConnectedMeetings--module.exports+moveParticipants)  
         * [.moveParticipantsWithCustomPreset(sourceMeetingId, destinationMeetingId, participants)](#module%5FRTKConnectedMeetings--module.exports+moveParticipantsWithCustomPreset)

### module.exports ⏏

**Kind**: Exported class  

#### new module.exports(context)

| Param   | Type    |
| ------- | ------- |
| context | Context |

#### module.exports.getRTKConnectedMeetings()

get connected meeting state

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKConnectedMeetings--module.exports)  

#### module.exports.createMeetings(request)

create connected meetings

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKConnectedMeetings--module.exports)

| Param   | Type                    |
| ------- | ----------------------- |
| request | Array.<{title: string}> |

#### module.exports.updateMeetings(request)

update meeting title

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKConnectedMeetings--module.exports)

| Param   | Type                                |
| ------- | ----------------------------------- |
| request | Array.<{id: string, title: string}> |

#### module.exports.deleteMeetings(meetingIds)

delete connected meetings

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKConnectedMeetings--module.exports)

| Param      | Type           |
| ---------- | -------------- |
| meetingIds | Array.<string> |

#### module.exports.moveParticipants(sourceMeetingId, destinationMeetingId, participantIds)

Trigger event to move participants

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKConnectedMeetings--module.exports)

| Param                | Type           | Description                    |
| -------------------- | -------------- | ------------------------------ |
| sourceMeetingId      | string         | id of source meeting           |
| destinationMeetingId | string         | id of destination meeting      |
| participantIds       | Array.<string> | list of id of the participants |

#### module.exports.moveParticipantsWithCustomPreset(sourceMeetingId, destinationMeetingId, participants)

Trigger event to move participants with custom preset

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKConnectedMeetings--module.exports)

| Param                | Type                                   | Description               |
| -------------------- | -------------------------------------- | ------------------------- |
| sourceMeetingId      | string                                 | id of source meeting      |
| destinationMeetingId | string                                 | id of destination meeting |
| participants         | Array.<{id: string, presetId: string}> |                           |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkconnectedmeetings/#page","headline":"RTKConnectedMeetings · Cloudflare Realtime docs","url":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkconnectedmeetings/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/core/","name":"Build using Core SDK"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/core/api-reference/","name":"API Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/core/api-reference/rtkconnectedmeetings/","name":"RTKConnectedMeetings"}}]}
```
