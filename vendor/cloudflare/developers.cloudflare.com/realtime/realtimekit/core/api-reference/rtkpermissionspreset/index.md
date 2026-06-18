---
title: RTKPermissionsPreset
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RTKPermissionsPreset

The PermissionPreset class represents the meeting permissions for the current participant

* [PermissionPreset](#module%5FPermissionPreset)  
   * _instance_  
         * [.stageEnabled](#module%5FPermissionPreset+stageEnabled)  
         * [.stageAccess](#module%5FPermissionPreset+stageAccess)  
         * [.acceptWaitingRequests](#module%5FPermissionPreset+acceptWaitingRequests)  
         * [.requestProduceVideo](#module%5FPermissionPreset+requestProduceVideo)  
         * [.requestProduceAudio](#module%5FPermissionPreset+requestProduceAudio)  
         * [.requestProduceScreenshare](#module%5FPermissionPreset+requestProduceScreenshare)  
         * [.canAllowParticipantAudio](#module%5FPermissionPreset+canAllowParticipantAudio)  
         * [.canAllowParticipantScreensharing](#module%5FPermissionPreset+canAllowParticipantScreensharing)  
         * [.canAllowParticipantVideo](#module%5FPermissionPreset+canAllowParticipantVideo)  
         * [.canDisableParticipantAudio](#module%5FPermissionPreset+canDisableParticipantAudio)  
         * [.canDisableParticipantVideo](#module%5FPermissionPreset+canDisableParticipantVideo)  
         * [.kickParticipant](#module%5FPermissionPreset+kickParticipant)  
         * [.pinParticipant](#module%5FPermissionPreset+pinParticipant)  
         * [.canRecord](#module%5FPermissionPreset+canRecord)  
         * ~~[.waitingRoomType](#module%5FPermissionPreset+waitingRoomType)~~  
         * [.waitingRoomBehaviour](#module%5FPermissionPreset+waitingRoomBehaviour)  
         * [.plugins](#module%5FPermissionPreset+plugins)  
         * [.polls](#module%5FPermissionPreset+polls)  
         * ~~[.produceVideo](#module%5FPermissionPreset+produceVideo)~~  
         * ~~[.requestProduce](#module%5FPermissionPreset+requestProduce)~~  
         * [.canProduceVideo](#module%5FPermissionPreset+canProduceVideo)  
         * ~~[.produceScreenshare](#module%5FPermissionPreset+produceScreenshare)~~  
         * [.canProduceScreenshare](#module%5FPermissionPreset+canProduceScreenshare)  
         * ~~[.produceAudio](#module%5FPermissionPreset+produceAudio)~~  
         * [.canProduceAudio](#module%5FPermissionPreset+canProduceAudio)  
         * [.chatPublic](#module%5FPermissionPreset+chatPublic)  
         * [.chatPrivate](#module%5FPermissionPreset+chatPrivate)  
         * [.hiddenParticipant](#module%5FPermissionPreset+hiddenParticipant)  
         * [.showParticipantList](#module%5FPermissionPreset+showParticipantList)  
         * ~~[.canChangeParticipantRole](#module%5FPermissionPreset+canChangeParticipantRole)~~  
         * [.canChangeParticipantPermissions](#module%5FPermissionPreset+canChangeParticipantPermissions)  
         * ~~[.canChangeTheme](#module%5FPermissionPreset+canChangeTheme)~~  
         * ~~[.canPresent](#module%5FPermissionPreset+canPresent)~~  
         * ~~[.acceptPresentRequests](#module%5FPermissionPreset+acceptPresentRequests)~~  
         * ~~[.maxScreenShareCount](#module%5FPermissionPreset+maxScreenShareCount)~~  
         * [.canLivestream](#module%5FPermissionPreset+canLivestream)  
   * _static_  
         * [.fromResponse()](#module%5FPermissionPreset.fromResponse)  
         * [.default()](#module%5FPermissionPreset.default)

### meeting.self.permissions.stageEnabled

The `stageEnabled` property returns a boolean value. If `true`, stage management is available for the participant.

**Kind**: instance property of [PermissionPreset](#module%5FPermissionPreset)  

### meeting.self.permissions.stageAccess

The `stageAccess` property dictates how a user interacts with the stage. There possible values are `ALLOWED`, `NOT_ALLOWED`, `CAN_REQUEST`;

**Kind**: instance property of [PermissionPreset](#module%5FPermissionPreset)  

### meeting.self.permissions.acceptWaitingRequests

The `acceptWaitingRequests` returns boolean value. If `true`, participant can accept the request of waiting participant.

**Kind**: instance property of [PermissionPreset](#module%5FPermissionPreset)  

### meeting.self.permissions.requestProduceVideo

The `requestProduceVideo` returns boolean value. If `true`, participant can send request to participants about producing video.

**Kind**: instance property of [PermissionPreset](#module%5FPermissionPreset)  

### meeting.self.permissions.requestProduceAudio

The `requestProduceAudio` returns boolean value. If `true`, participant can send request to participants about producing audio.

**Kind**: instance property of [PermissionPreset](#module%5FPermissionPreset)  

### meeting.self.permissions.requestProduceScreenshare

The `requestProduceScreenshare` returns boolean value. If `true`, participant can send request to participants about sharing screen.

**Kind**: instance property of [PermissionPreset](#module%5FPermissionPreset)  

### meeting.self.permissions.canAllowParticipantAudio

The `canAllowParticipantAudio` returns boolean value. If `true`, participant can enable other participants\` audio.

**Kind**: instance property of [PermissionPreset](#module%5FPermissionPreset)  

### meeting.self.permissions.canAllowParticipantScreensharing

The `canAllowParticipantScreensharing` returns boolean value. If `true`, participant can enable other participants\` screen share.

**Kind**: instance property of [PermissionPreset](#module%5FPermissionPreset)  

### meeting.self.permissions.canAllowParticipantVideo

The `canAllowParticipantVideo` returns boolean value. If `true`, participant can enable other participants\` video.

**Kind**: instance property of [PermissionPreset](#module%5FPermissionPreset)  

### meeting.self.permissions.canDisableParticipantAudio

If `true`, a participant can disable other participants\` audio.

**Kind**: instance property of [PermissionPreset](#module%5FPermissionPreset)  

### meeting.self.permissions.canDisableParticipantVideo

If `true`, a participant can disable other participants\` video.

**Kind**: instance property of [PermissionPreset](#module%5FPermissionPreset)  

### meeting.self.permissions.kickParticipant

The `kickParticipant` returns boolean value. If `true`, participant can remove other participants from the meeting.

**Kind**: instance property of [PermissionPreset](#module%5FPermissionPreset)  

### meeting.self.permissions.pinParticipant

The `pinParticipant` returns boolean value. If `true`, participant can pin a participant in the meeting.

**Kind**: instance property of [PermissionPreset](#module%5FPermissionPreset)  

### meeting.self.permissions.canRecord

The `canRecord` returns boolean value. If `true`, participant can record the meeting.

**Kind**: instance property of [PermissionPreset](#module%5FPermissionPreset)  

### ~~meeting.self.permissions.waitingRoomType~~

_**Deprecated**_

**Kind**: instance property of [PermissionPreset](#module%5FPermissionPreset)  

### meeting.self.permissions.waitingRoomBehaviour

The `waitingRoomType` returns string value. type of waiting room behavior possible values are `SKIP`, `ON_PRIVILEGED_USER_ENTRY`, `SKIP_ON_ACCEPT`

**Kind**: instance property of [PermissionPreset](#module%5FPermissionPreset)  

### meeting.self.permissions.plugins

The `plugins` tells if the participant can act on plugins there are 2 permissions with boolean values, `canStart` and `canClose`.

**Kind**: instance property of [PermissionPreset](#module%5FPermissionPreset)  

### meeting.self.permissions.polls

The `polls` tells if the participant can use polls. There are 3 permissions with boolean values, `canCreate`, `canVote`, `canViewResults`

**Kind**: instance property of [PermissionPreset](#module%5FPermissionPreset)  

### ~~meeting.self.permissions.produceVideo~~

_**Deprecated**_

**Kind**: instance property of [PermissionPreset](#module%5FPermissionPreset)  

### ~~meeting.self.permissions.requestProduce~~

_**Deprecated**_

**Kind**: instance property of [PermissionPreset](#module%5FPermissionPreset)  

### meeting.self.permissions.canProduceVideo

The `canProduceVideo` shows permissions for enabling video. There possible values are `ALLOWED`, `NOT_ALLOWED`, `CAN_REQUEST`

**Kind**: instance property of [PermissionPreset](#module%5FPermissionPreset)  

### ~~meeting.self.permissions.produceScreenshare~~

_**Deprecated**_

**Kind**: instance property of [PermissionPreset](#module%5FPermissionPreset)  

### meeting.self.permissions.canProduceScreenshare

The `canProduceScreenshare` shows permissions for sharing screen. There possible values are `ALLOWED`, `NOT_ALLOWED`, `CAN_REQUEST`

**Kind**: instance property of [PermissionPreset](#module%5FPermissionPreset)  

### ~~meeting.self.permissions.produceAudio~~

_**Deprecated**_

**Kind**: instance property of [PermissionPreset](#module%5FPermissionPreset)  

### meeting.self.permissions.canProduceAudio

The `canProduceAudio` shows permissions for enabling audio. There possible values are `ALLOWED`, `NOT_ALLOWED`, `CAN_REQUEST`

**Kind**: instance property of [PermissionPreset](#module%5FPermissionPreset)  

### meeting.self.permissions.chatPublic

The `chatPublic` shows permissions for public chat there are 4 permissions`canSend` \- if true, the participant can send chat`text` \- if true, the participant can send text`files` \- if true, the participant can send files

**Kind**: instance property of [PermissionPreset](#module%5FPermissionPreset)  

### meeting.self.permissions.chatPrivate

The `chatPrivate` shows permissions for public chat there are 4 permissions`canSend` \- if true, the participant can send private chat`text` \- if true, the participant can send text as private chat`files` \- if true, the participant can send files as private chat`canReceive` \- (optional) if true, the participant can receive private chat

**Kind**: instance property of [PermissionPreset](#module%5FPermissionPreset)  

### meeting.self.permissions.hiddenParticipant

The `hiddenParticipant` returns boolean value. If `true`, participant is hidden.

**Kind**: instance property of [PermissionPreset](#module%5FPermissionPreset)  

### meeting.self.permissions.showParticipantList

The `showParticipantList` returns boolean value. If `true`, participant list can be shown to the participant.

**Kind**: instance property of [PermissionPreset](#module%5FPermissionPreset)  

### ~~meeting.self.permissions.canChangeParticipantRole~~

_**Deprecated**_

**Kind**: instance property of [PermissionPreset](#module%5FPermissionPreset)  

### meeting.self.permissions.canChangeParticipantPermissions

The `canChangeParticipantPermissions` returns boolean value. If `true`, allow changing the participants' permissions.

**Kind**: instance property of [PermissionPreset](#module%5FPermissionPreset)  

### ~~meeting.self.permissions.canChangeTheme~~

_**Deprecated**_

**Kind**: instance property of [PermissionPreset](#module%5FPermissionPreset)  

### ~~meeting.self.permissions.canPresent~~

_**Deprecated**_

**Kind**: instance property of [PermissionPreset](#module%5FPermissionPreset)  

### ~~meeting.self.permissions.acceptPresentRequests~~

_**Deprecated**_

**Kind**: instance property of [PermissionPreset](#module%5FPermissionPreset)  

### ~~meeting.self.permissions.maxScreenShareCount~~

_**Deprecated**_

**Kind**: instance property of [PermissionPreset](#module%5FPermissionPreset)  

### meeting.self.permissions.canLivestream

Livestream

**Kind**: instance property of [PermissionPreset](#module%5FPermissionPreset)  

### meeting.self.permissions.fromResponse()

**Kind**: static method of [PermissionPreset](#module%5FPermissionPreset)  
**Deprecated.**: Use init()  

### meeting.self.permissions.default()

**Kind**: static method of [PermissionPreset](#module%5FPermissionPreset)  
**Deprecated.**: Use init()

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkpermissionspreset/#page","headline":"RTKPermissionsPreset · Cloudflare Realtime docs","url":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkpermissionspreset/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/core/","name":"Build using Core SDK"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/core/api-reference/","name":"API Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/core/api-reference/rtkpermissionspreset/","name":"RTKPermissionsPreset"}}]}
```
