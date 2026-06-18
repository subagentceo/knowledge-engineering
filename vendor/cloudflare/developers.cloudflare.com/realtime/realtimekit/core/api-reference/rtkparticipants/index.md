---
title: RTKParticipants
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RTKParticipants

This module represents all the participants in the meeting (except the local user). It consists of 4 maps:

* `joined`: A map of all participants that have joined the meeting.
* `waitlisted`: A map of all participants that have been added to the waitlist.
* `active`: A map of active participants who should be displayed in the meeting grid.
* `pinned`: A map of pinned participants.
* [RTKParticipants](#module%5FRTKParticipants)  
   * [module.exports](#exp%5Fmodule%5FRTKParticipants--module.exports) ⏏  
         * [new module.exports(context, self, roomSocketHandler)](#new%5Fmodule%5FRTKParticipants--module.exports%5Fnew)  
         * [.waitlisted](#module%5FRTKParticipants--module.exports+waitlisted)  
         * [.joined](#module%5FRTKParticipants--module.exports+joined)  
         * ~~[.active](#module%5FRTKParticipants--module.exports+active)~~  
         * [.videoSubscribed](#module%5FRTKParticipants--module.exports+videoSubscribed)  
         * [.audioSubscribed](#module%5FRTKParticipants--module.exports+audioSubscribed)  
         * [.pinned](#module%5FRTKParticipants--module.exports+pinned)  
         * [.all](#module%5FRTKParticipants--module.exports+all)  
         * [.pip](#module%5FRTKParticipants--module.exports+pip)  
         * [.telemetry](#module%5FRTKParticipants--module.exports+telemetry)  
         * [.viewMode](#module%5FRTKParticipants--module.exports+viewMode)  
         * [.currentPage](#module%5FRTKParticipants--module.exports+currentPage)  
         * [.lastActiveSpeaker](#module%5FRTKParticipants--module.exports+lastActiveSpeaker)  
         * [.selectedPeers](#module%5FRTKParticipants--module.exports+selectedPeers)  
         * [.count](#module%5FRTKParticipants--module.exports+count)  
         * [.maxActiveRTKParticipantsCount](#module%5FRTKParticipants--module.exports+maxActiveRTKParticipantsCount)  
         * [.pageCount](#module%5FRTKParticipants--module.exports+pageCount)  
         * [.setMaxActiveRTKParticipantsCount(limit)](#module%5FRTKParticipants--module.exports+setMaxActiveRTKParticipantsCount)  
         * [.acceptWaitingRoomRequest(id)](#module%5FRTKParticipants--module.exports+acceptWaitingRoomRequest)  
         * [.acceptAllWaitingRoomRequest(userIds)](#module%5FRTKParticipants--module.exports+acceptAllWaitingRoomRequest)  
         * [.rejectWaitingRoomRequest(id)](#module%5FRTKParticipants--module.exports+rejectWaitingRoomRequest)  
         * [.setViewMode(viewMode)](#module%5FRTKParticipants--module.exports+setViewMode)  
         * [.subscribe(peerIds, \[kinds\])](#module%5FRTKParticipants--module.exports+subscribe)  
         * [.unsubscribe(peerIds, \[kinds\])](#module%5FRTKParticipants--module.exports+unsubscribe)  
         * [.setPage(page)](#module%5FRTKParticipants--module.exports+setPage)  
         * [.disableAllAudio(allowUnmute)](#module%5FRTKParticipants--module.exports+disableAllAudio)  
         * [.disableAllVideo()](#module%5FRTKParticipants--module.exports+disableAllVideo)  
         * ~~[.disableAudio(participantId)](#module%5FRTKParticipants--module.exports+disableAudio)~~  
         * ~~[.disableVideo(participantId)](#module%5FRTKParticipants--module.exports+disableVideo)~~  
         * ~~[.kick(participantId)](#module%5FRTKParticipants--module.exports+kick)~~  
         * [.kickAll()](#module%5FRTKParticipants--module.exports+kickAll)  
         * [.broadcastMessage(type, payload, target)](#module%5FRTKParticipants--module.exports+broadcastMessage)  
         * [.getAllJoinedPeers(searchQuery, limit, offset)](#module%5FRTKParticipants--module.exports+getAllJoinedPeers)  
         * [.getRTKParticipantsInMeetingPreJoin()](#module%5FRTKParticipants--module.exports+getRTKParticipantsInMeetingPreJoin)

### module.exports ⏏

**Kind**: Exported class  

#### new module.exports(context, self, roomSocketHandler)

This constructs a new Participant object and maintains the maps of active/joined/waitlisted/pinned/selectedPeers maps. self : Self

| Param             | Type              |
| ----------------- | ----------------- |
| context           | Context           |
| self              | Self              |
| roomSocketHandler | RoomSocketHandler |

#### module.exports.waitlisted

Returns a list of participants waiting to join the meeting.

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKParticipants--module.exports)  

#### module.exports.joined

Returns a list of all participants in the meeting.

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKParticipants--module.exports)  

#### ~~module.exports.active~~

_**Deprecated**_

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKParticipants--module.exports)  

#### module.exports.videoSubscribed

Returns a list of participants whose video streams are currently consumed.

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKParticipants--module.exports)  

#### module.exports.audioSubscribed

Returns a list of participants whose audio streams are currently consumed.

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKParticipants--module.exports)  

#### module.exports.pinned

Returns a list of participants who have been pinned.

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKParticipants--module.exports)  

#### module.exports.all

Returns all added participants irrespective of whether they are currently in the meeting or not

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKParticipants--module.exports)  

#### module.exports.pip

Return the controls for Picture-in-Picture

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKParticipants--module.exports)  

#### module.exports.telemetry

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKParticipants--module.exports)  

#### module.exports.viewMode

Indicates whether the meeting is in 'ACTIVE\_GRID' mode or 'PAGINATED' mode.

In 'ACTIVE\_GRID' mode, participants are populated in the participants.active map dynamically. The participants present in the map will keep changing when other participants unmute their audio or turn on their videos.

In 'PAGINATED' mode, participants are populated in the participants.active map just once, and the participants in the map will only change if the page number is changed by the user using setPage(page).

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKParticipants--module.exports)  

#### module.exports.currentPage

This indicates the current page that has been set by the user in PAGINATED mode. If the meeting is in ACTIVE\_GRID mode, this value will be 0.

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKParticipants--module.exports)  

#### module.exports.lastActiveSpeaker

This stores the `participantId` of the last participant who spoke in the meeting.

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKParticipants--module.exports)  

#### module.exports.selectedPeers

Keeps a list of all participants who have been present in the selected peers list.

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKParticipants--module.exports)  

#### module.exports.count

Returns the number of participants who are joined in the meeting.

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKParticipants--module.exports)  

#### module.exports.maxActiveRTKParticipantsCount

Returns the maximum number of participants that can be present in the active map.

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKParticipants--module.exports)  

#### module.exports.pageCount

Returns the number of pages that are available in the meeting in PAGINATED mode. If the meeting is in ACTIVE\_GRID mode, this value will be 0.

**Kind**: instance property of [module.exports](#exp%5Fmodule%5FRTKParticipants--module.exports)  

#### module.exports.setMaxActiveRTKParticipantsCount(limit)

Updates the maximum number of participants that are populated in the active map.

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKParticipants--module.exports)

| Param | Type   | Description       |
| ----- | ------ | ----------------- |
| limit | number | Updated max limit |

#### module.exports.acceptWaitingRoomRequest(id)

Accepts requests from waitlisted participants if user has appropriate permissions.

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKParticipants--module.exports)

| Param | Type   | Description                                     |
| ----- | ------ | ----------------------------------------------- |
| id    | string | peerId or userId of the waitlisted participant. |

#### module.exports.acceptAllWaitingRoomRequest(userIds)

We need a new event for socket service events since if we send them all together, sequence of events can be unreliable

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKParticipants--module.exports)

| Param   | Type           |
| ------- | -------------- |
| userIds | Array.<string> |

#### module.exports.rejectWaitingRoomRequest(id)

Rejects requests from waitlisted participants if user has appropriate permissions.

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKParticipants--module.exports)

| Param | Type   | Description                                  |
| ----- | ------ | -------------------------------------------- |
| id    | string | participantId of the waitlisted participant. |

#### module.exports.setViewMode(viewMode)

Sets the view mode of the meeting to either ACTIVE\_GRID or PAGINATED.

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKParticipants--module.exports)

| Param    | Type     | Description                                          |
| -------- | -------- | ---------------------------------------------------- |
| viewMode | ViewMode | The mode in which the active map should be populated |

#### module.exports.subscribe(peerIds, \[kinds\])

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKParticipants--module.exports)

| Param     | Type                                                             |
| --------- | ---------------------------------------------------------------- |
| peerIds   | Array.<string>                                                   |
| \[kinds\] | Array.<('audio'\|'video'|'screenshareAudio'|'screenshareVideo')> |

#### module.exports.unsubscribe(peerIds, \[kinds\])

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKParticipants--module.exports)

| Param     | Type                                                             |
| --------- | ---------------------------------------------------------------- |
| peerIds   | Array.<string>                                                   |
| \[kinds\] | Array.<('audio'\|'video'|'screenshareAudio'|'screenshareVideo')> |

#### module.exports.setPage(page)

Populates the active map with participants present in the page number indicated by the parameter `page` in PAGINATED mode. Does not do anything in ACTIVE\_GRID mode.

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKParticipants--module.exports)

| Param | Type   | Description                |
| ----- | ------ | -------------------------- |
| page  | number | The page number to be set. |

#### module.exports.disableAllAudio(allowUnmute)

Disables audio for all participants in the meeting.

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKParticipants--module.exports)

| Param       | Type    | Description                                        |
| ----------- | ------- | -------------------------------------------------- |
| allowUnmute | boolean | Allow participants to unmute after they are muted. |

#### module.exports.disableAllVideo()

Disables video for all participants in the meeting.

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKParticipants--module.exports)  

#### ~~module.exports.disableAudio(participantId)~~

_**Deprecated**_

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKParticipants--module.exports)

| Param         | Type   | Description                    |
| ------------- | ------ | ------------------------------ |
| participantId | string | ID of participant to be muted. |

#### ~~module.exports.disableVideo(participantId)~~

_**Deprecated**_

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKParticipants--module.exports)

| Param         | Type   | Description                    |
| ------------- | ------ | ------------------------------ |
| participantId | string | ID of participant to be muted. |

#### ~~module.exports.kick(participantId)~~

_**Deprecated**_

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKParticipants--module.exports)

| Param         | Type   | Description                     |
| ------------- | ------ | ------------------------------- |
| participantId | string | ID of participant to be kicked. |

#### module.exports.kickAll()

Kicks all participants from the meeting.

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKParticipants--module.exports)  

#### module.exports.broadcastMessage(type, payload, target)

Broadcasts the message to participants

If no `target` is specified it is sent to all participants including `self`.

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKParticipants--module.exports)

| Param   | Type                    | Description                                                                                                                        |
| ------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| type    | string                  |                                                                                                                                    |
| payload | BroadcastMessagePayload |                                                                                                                                    |
| target  | BroadcastMessageTarget  | object containing a list of participantIds or object containing presetName \- every user with that preset will be sent the message |

#### module.exports.getAllJoinedPeers(searchQuery, limit, offset)

Returns all peers currently present in the room If you are in a group call, use `meeting.participants.joined`instead

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKParticipants--module.exports)

| Param       | Type   |
| ----------- | ------ |
| searchQuery | string |
| limit       | number |
| offset      | number |

#### module.exports.getRTKParticipantsInMeetingPreJoin()

Returns all peers currently in the room, is a non paginated call and should only be used if you are in a non room joined state, if in a joined group call, use `meeting.participants.joined`

**Kind**: instance method of [module.exports](#exp%5Fmodule%5FRTKParticipants--module.exports)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkparticipants/#page","headline":"RTKParticipants · Cloudflare Realtime docs","url":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkparticipants/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-02-10","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/core/","name":"Build using Core SDK"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/core/api-reference/","name":"API Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/core/api-reference/rtkparticipants/","name":"RTKParticipants"}}]}
```
