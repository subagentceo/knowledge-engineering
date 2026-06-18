---
title: RTKParticipant
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RTKParticipant

This module represents a single participant in the meeting. The participant object can be accessed from one of the participant lists present in the `meeting.participants` object. For example,

TypeScript

```

const participant1 = meeting.participants.active.get(participantId);

const participant2 = meeting.participants.joined.get(participantId);

const participant3 = meeting.participants.active.toArray()[0];

const participant4 = meeting.participants.active.toArray().filter((p) => p.name === 'John');


```

* [RTKParticipant](#module%5FRTKParticipant)  
   * [module.exports](#exp%5Fmodule%5FRTKParticipant--module.exports) ⏏  
         * [new module.exports(context, participant, self, roomSocket)](#new%5Fmodule%5FRTKParticipant--module.exports%5Fnew)  
         * [.id](#module%5FRTKParticipant--module.exports+id)  
         * [.userId](#module%5FRTKParticipant--module.exports+userId)  
         * [.name](#module%5FRTKParticipant--module.exports+name)  
         * [.picture](#module%5FRTKParticipant--module.exports+picture)  
         * [.customRTKParticipantId](#module%5FRTKParticipant--module.exports+customRTKParticipantId)  
         * ~~[.clientSpecificId](#module%5FRTKParticipant--module.exports+clientSpecificId)~~  
         * [.device](#module%5FRTKParticipant--module.exports+device)  
         * [.videoTrack](#module%5FRTKParticipant--module.exports+videoTrack)  
         * [.audioTrack](#module%5FRTKParticipant--module.exports+audioTrack)  
         * [.screenShareTracks](#module%5FRTKParticipant--module.exports+screenShareTracks)  
         * [.videoEnabled](#module%5FRTKParticipant--module.exports+videoEnabled)  
         * [.audioEnabled](#module%5FRTKParticipant--module.exports+audioEnabled)  
         * [.screenShareEnabled](#module%5FRTKParticipant--module.exports+screenShareEnabled)  
         * [.producers](#module%5FRTKParticipant--module.exports+producers)  
         * [.manualProducerConfig](#module%5FRTKParticipant--module.exports+manualProducerConfig)  
         * [.supportsRemoteControl](#module%5FRTKParticipant--module.exports+supportsRemoteControl)  
         * [.presetName](#module%5FRTKParticipant--module.exports+presetName)  
         * [.stageStatus](#module%5FRTKParticipant--module.exports+stageStatus)  
         * [.telemetry](#module%5FRTKParticipant--module.exports+telemetry)  
         * [.isPinned](#module%5FRTKParticipant--module.exports+isPinned)  
         * [.setVideoEnabled(videoEnabled, \[emitEvent\])](#module%5FRTKParticipant--module.exports+setVideoEnabled)  
         * [.setAudioEnabled(audioEnabled, \[emitEvent\])](#module%5FRTKParticipant--module.exports+setAudioEnabled)  
         * [.setScreenShareEnabled(screenShareEnabled, \[emitEvent\])](#module%5FRTKParticipant--module.exports+setScreenShareEnabled)  
         * [.pin()](#module%5FRTKParticipant--module.exports+pin)  
         * [.unpin()](#module%5FRTKParticipant--module.exports+unpin)  
         * [.setIsPinned(isPinned, \[emitEvent\])](#module%5FRTKParticipant--module.exports+setIsPinned)  
         * [.disableAudio()](#module%5FRTKParticipant--module.exports+disableAudio)  
         * [.kick()](#module%5FRTKParticipant--module.exports+kick)  
         * [.disableVideo()](#module%5FRTKParticipant--module.exports+disableVideo)  
         * [.registerVideoElement(videoElem)](#module%5FRTKParticipant--module.exports+registerVideoElement)  
         * [.deregisterVideoElement(\[videoElem\])](#module%5FRTKParticipant--module.exports+deregisterVideoElement)  
         * [.updateVideo(e)](#module%5FRTKParticipant--module.exports+updateVideo)

### module.exports ⏏

**Kind**: Exported class  

#### new module.exports(context, participant, self, roomSocket)

| Param       | Type              |
| ----------- | ----------------- |
| context     | Context           |
| participant | IRTKParticipant   |
| self        | Self              |
| roomSocket  | RoomSocketHandler |

#### module.exports.id

The peer ID of the participant. The participants are indexed by this ID in the participant map.

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKParticipant--module.exports)  

#### module.exports.userId

The user ID of the participant.

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKParticipant--module.exports)  

#### module.exports.name

The name of the participant.

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKParticipant--module.exports)  

#### module.exports.picture

The picture of the participant.

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKParticipant--module.exports)  

#### module.exports.customRTKParticipantId

The custom id of the participant set during Add RTKParticipant REST API

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKParticipant--module.exports)  

#### ~~module.exports.clientSpecificId~~

_**Deprecated**_

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKParticipant--module.exports)  

#### module.exports.device

The device configuration of the participant.

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKParticipant--module.exports)  

#### module.exports.videoTrack

The participant's video track.

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKParticipant--module.exports)  

#### module.exports.audioTrack

The participant's audio track.

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKParticipant--module.exports)  

#### module.exports.screenShareTracks

The participant's screenshare video and audio track.

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKParticipant--module.exports)  

#### module.exports.videoEnabled

This is true if the participant's video is enabled.

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKParticipant--module.exports)  

#### module.exports.audioEnabled

This is true if the participant's audio is enabled.

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKParticipant--module.exports)  

#### module.exports.screenShareEnabled

This is true if the participant is screensharing.

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKParticipant--module.exports)  

#### module.exports.producers

producers created by participant

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKParticipant--module.exports)  

#### module.exports.manualProducerConfig

producer config passed during manual subscription

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKParticipant--module.exports)  

#### module.exports.supportsRemoteControl

This is true if the participant supports remote control.

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKParticipant--module.exports)  

#### module.exports.presetName

The preset of the participant.

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKParticipant--module.exports)  

#### module.exports.stageStatus

Denotes the participants's current stage status.

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKParticipant--module.exports)  

#### module.exports.telemetry

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKParticipant--module.exports)  

#### module.exports.isPinned

Returns true if the participant is pinned.

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKParticipant--module.exports)  

#### module.exports.setVideoEnabled(videoEnabled, \[emitEvent\])

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKParticipant--module.exports)

| Param         | Type    | Default |
| ------------- | ------- | ------- |
| videoEnabled  | boolean |         |
| \[emitEvent\] | boolean | true    |

#### module.exports.setAudioEnabled(audioEnabled, \[emitEvent\])

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKParticipant--module.exports)

| Param         | Type    | Default |
| ------------- | ------- | ------- |
| audioEnabled  | boolean |         |
| \[emitEvent\] | boolean | true    |

#### module.exports.setScreenShareEnabled(screenShareEnabled, \[emitEvent\])

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKParticipant--module.exports)

| Param              | Type    | Default |
| ------------------ | ------- | ------- |
| screenShareEnabled | boolean |         |
| \[emitEvent\]      | boolean | true    |

#### module.exports.pin()

Returns `participant.id` if user has permission to pin participants.

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKParticipant--module.exports)  

#### module.exports.unpin()

Returns `participant.id` if user has permission to unpin participants.

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKParticipant--module.exports)  

#### module.exports.setIsPinned(isPinned, \[emitEvent\])

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKParticipant--module.exports)

| Param         | Type    | Default |
| ------------- | ------- | ------- |
| isPinned      | boolean |         |
| \[emitEvent\] | boolean | true    |

#### module.exports.disableAudio()

Disables audio for this participant. Requires the permission to disable participant audio.

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKParticipant--module.exports)  

#### module.exports.kick()

Kicks this participant from the meeting. Requires the permission to kick a participant.

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKParticipant--module.exports)  

#### module.exports.disableVideo()

Disables video for this participant. Requires the permission to disable video for a participant.

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKParticipant--module.exports)  

#### module.exports.registerVideoElement(videoElem)

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKParticipant--module.exports)

| Param     | Type             |
| --------- | ---------------- |
| videoElem | HTMLVideoElement |

#### module.exports.deregisterVideoElement(\[videoElem\])

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKParticipant--module.exports)

| Param         | Type             |
| ------------- | ---------------- |
| \[videoElem\] | HTMLVideoElement |

#### module.exports.updateVideo(e)

Internal method, do not use

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKParticipant--module.exports)

| Param | Type             |
| ----- | ---------------- |
| e     | HTMLVideoElement |

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkparticipant/#page","headline":"RTKParticipant · Cloudflare Realtime docs","url":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkparticipant/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-02-10","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/core/","name":"Build using Core SDK"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/core/api-reference/","name":"API Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/core/api-reference/rtkparticipant/","name":"RTKParticipant"}}]}
```
