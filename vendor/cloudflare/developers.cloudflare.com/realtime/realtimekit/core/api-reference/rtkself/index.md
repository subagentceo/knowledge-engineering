---
title: RTKSelf
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RTKSelf

The RTKSelf module represents the current user, and allows to modify the state of the user in the meeting. The audio and video streams of the user can be retrieved from this module.

* [RTKSelf](#module%5FRTKSelf)  
   * [.telemetry](#module%5FRTKSelf+telemetry)  
   * [.peerId](#module%5FRTKSelf+peerId)  
   * [.roomState](#module%5FRTKSelf+roomState)  
   * [.permissions](#module%5FRTKSelf+permissions)  
   * [.config](#module%5FRTKSelf+config)  
   * [.roomJoined](#module%5FRTKSelf+roomJoined)  
   * [.isPinned](#module%5FRTKSelf+isPinned)  
   * [.cleanupEvents()](#module%5FRTKSelf+cleanupEvents)  
   * [.setName(name)](#module%5FRTKSelf+setName)  
   * [.setupTracks(options)](#module%5FRTKSelf+setupTracks)  
   * [.enableAudio()](#module%5FRTKSelf+enableAudio)  
   * [.enableVideo()](#module%5FRTKSelf+enableVideo)  
   * [.updateVideoConstraints()](#module%5FRTKSelf+updateVideoConstraints)  
   * [.enableScreenShare()](#module%5FRTKSelf+enableScreenShare)  
   * [.updateScreenshareConstraints()](#module%5FRTKSelf+updateScreenshareConstraints)  
   * [.disableAudio()](#module%5FRTKSelf+disableAudio)  
   * [.disableVideo()](#module%5FRTKSelf+disableVideo)  
   * [.disableScreenShare()](#module%5FRTKSelf+disableScreenShare)  
   * [.getAllDevices()](#module%5FRTKSelf+getAllDevices)  
   * [.setIsPinned()](#module%5FRTKSelf+setIsPinned)  
   * [.pin()](#module%5FRTKSelf+pin)  
   * [.unpin()](#module%5FRTKSelf+unpin)  
   * [.hide()](#module%5FRTKSelf+hide)  
   * [.show()](#module%5FRTKSelf+show)  
   * [.setDevice(device)](#module%5FRTKSelf+setDevice)  
   * [.updateVideo()](#module%5FRTKSelf+updateVideo)

### meeting.self.telemetry

**Kind**: instance property of [RTKSelf](#module%5FRTKSelf)  

### meeting.self.peerId

NOTE(ishita1805): Discussed with Ravindra, added a duplicate for consistency when using identifiers in Locker. We might want to look at deprecating the `id` sometime later.

**Kind**: instance property of [RTKSelf](#module%5FRTKSelf)  

### meeting.self.roomState

Returns the current state of room init - Initial State joined - User is in the meeting waitlisted - User is in the waitlist state rejected - User's was in the waiting room, but the entry was rejected kicked - A privileged user removed the user from the meeting left - User left the meeting ended - The meeting was ended

**Kind**: instance property of [RTKSelf](#module%5FRTKSelf)  

### meeting.self.permissions

Returns the current permission given to the user for the meeting.

**Kind**: instance property of [RTKSelf](#module%5FRTKSelf)  

### meeting.self.config

Returns configuration for the meeting.

**Kind**: instance property of [RTKSelf](#module%5FRTKSelf)  

### meeting.self.roomJoined

Returns true if the local participant has joined the meeting.

**Kind**: instance property of [RTKSelf](#module%5FRTKSelf)  

### meeting.self.isPinned

Returns true if the current user is pinned.

**Kind**: instance property of [RTKSelf](#module%5FRTKSelf)  

### meeting.self.cleanupEvents()

**Kind**: instance method of [RTKSelf](#module%5FRTKSelf)  

### meeting.self.setName(name)

The name of the user can be set by calling this method. This will get reflected to other participants ONLY if this method is called before the room is joined.

**Kind**: instance method of [RTKSelf](#module%5FRTKSelf)

| Param | Type   | Description       |
| ----- | ------ | ----------------- |
| name  | string | Name of the user. |

### meeting.self.setupTracks(options)

Sets up the local media tracks.

**Kind**: instance method of [RTKSelf](#module%5FRTKSelf)

| Param                  | Type    | Description                                       |
| ---------------------- | ------- | ------------------------------------------------- |
| options                | Object  | The audio and video options.                      |
| \[options.video\]      | boolean | If true, the video stream is fetched.             |
| \[options.audio\]      | boolean | If true, the audio stream is fetched.             |
| \[options.forceReset\] | boolean | If true, force resets tracks before re-acquiring. |

### meeting.self.enableAudio()

This method is used to unmute the local participant's audio.

**Kind**: instance method of [RTKSelf](#module%5FRTKSelf)  

### meeting.self.enableVideo()

This method is used to start streaming the local participant's video to the meeting.

**Kind**: instance method of [RTKSelf](#module%5FRTKSelf)  

### meeting.self.updateVideoConstraints()

This method is used to apply constraints to the current video stream.

**Kind**: instance method of [RTKSelf](#module%5FRTKSelf)  

### meeting.self.enableScreenShare()

This method is used to start sharing the local participant's screen to the meeting.

**Kind**: instance method of [RTKSelf](#module%5FRTKSelf)  

### meeting.self.updateScreenshareConstraints()

This method is used to apply constraints to the current screenshare stream.

**Kind**: instance method of [RTKSelf](#module%5FRTKSelf)  

### meeting.self.disableAudio()

This method is used to mute the local participant's audio.

**Kind**: instance method of [RTKSelf](#module%5FRTKSelf)  

### meeting.self.disableVideo()

This participant is used to disable the local participant's video.

**Kind**: instance method of [RTKSelf](#module%5FRTKSelf)  

### meeting.self.disableScreenShare()

This method is used to stop sharing the local participant's screen.

**Kind**: instance method of [RTKSelf](#module%5FRTKSelf)  

### meeting.self.getAllDevices()

Returns all media devices accessible by the local participant.

**Kind**: instance method of [RTKSelf](#module%5FRTKSelf)  

### meeting.self.setIsPinned()

**Kind**: instance method of [RTKSelf](#module%5FRTKSelf)  

### meeting.self.pin()

Returns `self.id` if user has permission to pin participants.

**Kind**: instance method of [RTKSelf](#module%5FRTKSelf)  

### meeting.self.unpin()

Returns `self.id` if user has permission to unpin participants.

**Kind**: instance method of [RTKSelf](#module%5FRTKSelf)  

### meeting.self.hide()

Hide's user's tile in the UI (locally)

**Kind**: instance method of [RTKSelf](#module%5FRTKSelf)  

### meeting.self.show()

Show's user's tile in the UI if hidden (locally)

**Kind**: instance method of [RTKSelf](#module%5FRTKSelf)  

### meeting.self.setDevice(device)

Change the current media device that is being used by the local participant.

**Kind**: instance method of [RTKSelf](#module%5FRTKSelf)

| Param  | Type            | Description                                                                                    |
| ------ | --------------- | ---------------------------------------------------------------------------------------------- |
| device | MediaDeviceInfo | The device that is to be used. A device of the same kind will be replaced. the primary stream. |

### meeting.self.updateVideo()

Internal method, do not use

**Kind**: instance method of [RTKSelf](#module%5FRTKSelf)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkself/#page","headline":"RTKSelf · Cloudflare Realtime docs","url":"https://developers.cloudflare.com/realtime/realtimekit/core/api-reference/rtkself/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/core/","name":"Build using Core SDK"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/core/api-reference/","name":"API Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/core/api-reference/rtkself/","name":"RTKSelf"}}]}
```
