---
title: RTKStage
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RTKStage

The RTKStage module represents a class to mange the RTKStage of the meeting RTKStage refers to a virtual area, where participants stream are visible to other participants. When a participant is off stage, they are not producing media but only consuming media from participants who are on RTKStage

* [RTKStage](#module%5FRTKStage)  
   * [module.exports](#exp%5Fmodule%5FRTKStage--module.exports) ⏏  
         * [new module.exports(context, self, participants, stageSocketHandler, roomSocketHandler)](#new%5Fmodule%5FRTKStage--module.exports%5Fnew)  
         * [.telemetry](#module%5FRTKStage--module.exports+telemetry)  
         * [.peerId](#module%5FRTKStage--module.exports+peerId)  
         * [.getAccessRequests()](#module%5FRTKStage--module.exports+getAccessRequests)  
         * [.requestAccess()](#module%5FRTKStage--module.exports+requestAccess)  
         * [.cancelRequestAccess()](#module%5FRTKStage--module.exports+cancelRequestAccess)  
         * [.grantAccess()](#module%5FRTKStage--module.exports+grantAccess)  
         * [.denyAccess()](#module%5FRTKStage--module.exports+denyAccess)  
         * [.join()](#module%5FRTKStage--module.exports+join)  
         * [.leave()](#module%5FRTKStage--module.exports+leave)  
         * [.kick(userIds)](#module%5FRTKStage--module.exports+kick)

### module.exports ⏏

**Kind**: Exported class  

#### new module.exports(context, self, participants, stageSocketHandler, roomSocketHandler)

| Param              | Type                  |
| ------------------ | --------------------- |
| context            | Context               |
| self               | Self                  |
| participants       | Participants          |
| stageSocketHandler | RTKStageSocketHandler |
| roomSocketHandler  | RoomSocketHandler     |

#### module.exports.telemetry

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKStage--module.exports)  

#### module.exports.peerId

Returns the peerId of the current user

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKStage--module.exports)  

#### module.exports.getAccessRequests()

Method to fetch all RTKStage access requests from viewers

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKStage--module.exports)  

#### module.exports.requestAccess()

Method to send a request to privileged users to join the stage

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKStage--module.exports)  

#### module.exports.cancelRequestAccess()

Method to cancel a previous RTKStage join request

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKStage--module.exports)  

#### module.exports.grantAccess()

Method to grant access to RTKStage. This can be in response to a RTKStage Join request but it can be called on other users as well

`permissions.acceptRTKStageRequests` privilege required

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKStage--module.exports)  

#### module.exports.denyAccess()

Method to deny access to RTKStage. This should be called in response to a RTKStage Join request

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKStage--module.exports)  

#### module.exports.join()

Method to join the stage Users either need to have the permission in the preset or must be accepted by a privileged user to call this method

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKStage--module.exports)  

#### module.exports.leave()

Method to leave the stage Users must either be on the stage already or be accepted to join the stage to call this method

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKStage--module.exports)  

#### module.exports.kick(userIds)

Method to kick a user off the stage

`permissions.acceptRTKStageRequests` privilege required

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKStage--module.exports)

| Param   | Type           |
| ------- | -------------- |
| userIds | Array.<string> |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkstage/#page","headline":"RTKStage · Cloudflare Realtime docs","url":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkstage/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/core/","name":"Build using Core SDK"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/core/api-reference/","name":"API Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/core/api-reference/rtkstage/","name":"RTKStage"}}]}
```
