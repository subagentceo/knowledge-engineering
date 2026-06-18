---
title: Release Notes
description: Release notes and changelog for the RealtimeKit Web Core SDK.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Release Notes

[ Subscribe to RSS ](https://developers.cloudflare.com/realtime/realtimekit/release-notes/index.xml)

## 2026-05-28

**RealtimeKit Web Core 1.5.1**

**Compatibility:** Works best with RealtimeKit Web UI Kit 1.2.0 or later.

**Features**

* Added a dedicated error code `0014` for media (WebRTC) connection failures during room join, making it easier to distinguish media failures from socket and signaling failures.

**Enhancements**

* Init and join failures from `Client.init()` and `meeting.join()` now surface specific error codes and descriptive messages instead of generic or stacked errors.
* Telemetry logs are now compressed using gzip when the browser supports the `CompressionStream` API, achieving approximately a 10:1 compression ratio. Older browsers and React Native fall back to uncompressed JSON with smaller batch sizes.

**Fixes**

* Fixed a regex-based issue where the Safari video middleware flag was incorrectly removed, potentially breaking video processing on Safari.
* Fixed an issue where `ClientError` objects were wrapped inside each other when the SDK retried failed API requests. This caused nested error messages, duplicate `onError` callbacks, and redundant `window` error events.

**Removed APIs**

* Removed the third-party flag service. `meeting.__internals__.features` is now deprecated and will be removed in a future release.

## 2026-04-20

**RealtimeKit Web Core 1.4.0**

**Compatibility:** Works best with RealtimeKit Android Core 2.0.0+ and RealtimeKit iOS Core 2.0.0+.

**Features**

* Added `meeting.__internals__.authToken` to expose authentication token, enabling better integration between Web Core and UI Kit for future features and enhancements.

**Fixes**

* Proactively fixed an issue where participants with simulcast turned on would not be able to turn on their camera or microphone due to SDP failures in Chrome version 148+.

**Enhancements**

* SDK now uses `*.realtime.cloudflare.com` base URI internally instead of the legacy `dyte.io` base URI.
* Refactored error handling to properly catch and display error codes for SDK initialization failures, room join failures, and other errors.

## 2026-03-31

**RealtimeKit Web Core 1.3.0**

**Features**

* Simulcast support is now available to all RealtimeKit clients. Configure it per participant in Preset via the [RealtimeKit dashboard](https://dash.cloudflare.com/?to=/:account/realtime/kit), [Preset API](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/presets/methods/create) using the `config.media.video.simulcast` field, or while [initializing the SDK](https://developers.cloudflare.com/realtime/realtimekit/core/).
* Added 4K UHD video support in media production (configurable in Preset and API). Falls back to the maximum supported resolution if the camera does not support 4K.

## 2026-03-10

**RealtimeKit Web Core 1.2.5**

**Compatibility:** Works best with RealtimeKit Web UI Kit 1.1.1 or later.

**Enhancements**

* Implemented retry limits for ICE connection failures to prevent indefinite connection attempts and improve reliability.
* Improved error handling for room join operations to provide more descriptive and actionable error messages.
* Room join errors are now thrown consistently when network connectivity is blocked by firewalls or when TURN servers are unreachable.

**Fixes**

* Fixed an issue in Connected Meetings where peer IDs were not regenerated when switching between rooms. Peer IDs are now correctly assigned per room session.

## 2026-01-30

**RealtimeKit Web Core 1.2.4**

**Compatibility:** Works best with RealtimeKit Web UI Kit 1.1.0 or later.

**New APIs**

Added chat pagination support with the following methods:

* `meeting.chat.fetchPinnedMessages` \- Fetch pinned messages from server.
* `meeting.chat.fetchPublicMessages` \- Fetch public messages from server.
* `meeting.chat.fetchPrivateMessages` \- Fetch private messages from server.

**Enhancements**

* Added JSDoc comments to all public-facing methods and classes for improved developer suggestions.
* Chat message operations (edit, delete, pin) are now available to all RealtimeKit clients without additional configuration.
* `pinMessage` and `unpinMessage` events on `meeting.chat` now emit reliably.
* Message pinning (`meeting.chat.pin` and `meeting.chat.unpin`) is now available to all participants.

**Removed APIs**

Removed non-operational chat channel APIs to streamline the RealtimeKit SDK. Meeting chat (`meeting.chat`) remains fully operational.

* Removed `meeting.self.permissions.chatChannel`.
* Removed `meeting.self.permissions.chatMessage`. Use `meeting.self.permissions.chatPublic` and `meeting.self.permissions.chatPrivate` instead.
* Removed `meeting.chat.channels`.
* Removed `meeting.chat.sendMessageToChannel`.
* Removed `meeting.chat.markLastReadMessage`.
* Removed events: `channelMessageUpdate`, `channelCreate`, and `channelUpdate` from `meeting.chat`.

**API changes**

* The following methods no longer accept a third optional `channelId` parameter:  
   * `meeting.chat.editTextMessage(messageId, message)`  
   * `meeting.chat.editImageMessage(messageId, imageFile)`  
   * `meeting.chat.editFileMessage(messageId, file)`  
   * `meeting.chat.editMessage(messageId, messagePayload)`  
   * `meeting.chat.deleteMessage(messageId)`

**Deprecations**

The following methods are deprecated due to scalability limitations (limited to 1,000 recent messages):

* `meeting.chat.messages` \- Only fetches recent messages and new messages after joining.
* `meeting.chat.getMessagesByUser` \- Use new fetch methods for scalable message retrieval.
* `meeting.chat.getMessagesByType` \- Use new fetch methods for scalable message retrieval.
* `meeting.chat.getMessages` \- Use `meeting.chat.fetchPublicMessages` or `meeting.chat.fetchPrivateMessages` instead.
* `meeting.chat.pinned` \- Use `meeting.chat.fetchPinnedMessages` instead.
* `meeting.chat.searchMessages` \- Use `meeting.chat.fetchPublicMessages` or `meeting.chat.fetchPrivateMessages` instead.

**Known limitations**

* Pinned messages are not supported for private chats.

## 2026-01-05

**RealtimeKit Web Core 1.2.3**

**Fixes**

* Fixed an issue where users who joined a meeting with audio and video disabled and then initiated tab screen sharing would experience SDP corruption upon stopping the screen share, preventing subsequent actions such as enabling audio or video.  
Error thrown:  
```text  
InvalidAccessError: Failed to execute 'setRemoteDescription' on 'RTCPeerConnection': Failed to set remote answer sdp: Failed to set remote audio description send parameters for m-section with mid='<N>'  
```
* Fixed an issue where awaiting `RealtimeKitClient.initMedia` did not return media tracks  
Example usage:  
```ts  
const media = await RealtimeKitClient.initMedia({  
  video : true,  
  audio: true,  
});  
const { videoTrack, audioTrack } = media;  
```
* Fixed an issue where an undefined variable caused `TypeError: Cannot read properties of undefined (reading 'getValue')` in media retrieval due to a race condition.

## 2025-12-17

**RealtimeKit Web Core 1.2.2**

**Fixes**

* Fixed an issue where camera switching between front and rear cameras was not working on Android devices
* Fixed device selection logic to prioritize media devices more effectively
* Added PIP support for [Reactions](https://developers.cloudflare.com/realtime/realtimekit/ui-kit/addons/#reactions-1)

## 2025-11-18

**RealtimeKit Web Core 1.2.1**

**Fixes**

* Resolved an issue preventing default media device selection.
* Fixed SDK bundle to include `browser.js` instead of incorrectly shipping `index.iife.js` in 1.2.0.

**Enhancements**

* External media devices are now prioritized over internal devices when no preferred device is set.

## 2025-10-30

**RealtimeKit Web Core 1.2.0**

**Features**

* Added support for configuring simulcast via `initMeeting`:  
```ts  
initMeeting({  
  overrides: {  
    simulcastConfig: {  
      disable: false,  
      encodings: [{ scaleResolutionDownBy: 2 }],  
    },  
  },  
});  
```

**Fixes**

* Resolved an issue where remote participants' video feeds were not visible during grid pagination in certain edge cases.
* Fixed a bug preventing participants from switching microphones if the first listed microphone was non-functional.

**Breaking changes**

* Legacy media engine support has been removed. If your organization was created before March 1, 2025 and you are upgrading to this SDK version or later, you may experience recording issues. Contact support to migrate to the new Cloudflare SFU media engine to ensure continued recording functionality.

## 2025-08-26

**RealtimeKit Web Core 1.1.7**

**Fixes**

* Prevented speaker change events from being emitted when the active speaker does not change.
* Addressed a behavioral change in microphone switching on recent versions of Google Chrome.
* Added `deviceInfo` logs to improve debugging capabilities for React Native.
* Fixed an issue that queued multiple media consumers for the same peer, optimizing resource usage.

## 2025-08-14

**RealtimeKit Web Core 1.1.6**

**Enhancements**

* Internal changes to make debugging of media consumption issues easier and faster.

## 2025-08-04

**RealtimeKit Web Core 1.1.5**

**Fixes**

* Improved React Native support for `AudioActivityReporter` with proper audio sampling.
* Resolved issue preventing users from creating polls.
* Fixed issue where leaving a meeting took more than 20 seconds.

## 2025-07-17

**RealtimeKit Web Core 1.1.4**

**Fixes**

* Livestream feature is now available to all beta users.
* Fixed Livestream stage functionality where hosts were not consuming peer videos upon participants' stage join.
* Resolved issues with viewer joins and leaves in Livestream stage.

## 2025-07-08

**RealtimeKit Web Core 1.1.3**

**Fixes**

* Fixed issue where users could not enable video mid-meeting if they joined without video initially.

## 2025-07-02

**RealtimeKit Web Core 1.1.2**

**Fixes**

* Fixed edge case in large meetings where existing participants could not hear or see newly joined users.

## 2025-06-30

**RealtimeKit Web Core 1.1.0–1.1.1**

**Features**

* Added methods to toggle self tile visibility.
* Introduced broadcast functionality across connected meetings (breakout rooms).

**New API**

* Broadcast messages across meetings:  
```ts  
meeting.participants.broadcastMessage("<message_type>", { message: "Hi" }, {  
  meetingIds: ["<connected_meeting_id>"],  
});  
```

**Enhancements**

* Reduced time to display videos of newly joined participants when joining in bulk.
* Added support for multiple meetings on the same page in RealtimeKit Core SDK.

## 2025-06-17

**RealtimeKit Web Core 1.0.2**

**Fixes**

* Enhanced error handling for media operations.
* Fixed issue where active participants with audio or video were not appearing in the active participant list.

## 2025-05-29

**RealtimeKit Web Core 1.0.1**

**Fixes**

* Resolved initial setup issues with Cloudflare RealtimeKit integration.
* Fixed meeting join and media connectivity issues.
* Enhanced media track handling.

## 2025-05-29

**RealtimeKit Web Core 1.0.0**

**Features**

* Initial release of Cloudflare RealtimeKit with support for group calls, webinars, livestreaming, polls, and chat.

```json
{"@context":"https://schema.org","@type":"BlogPosting","@id":"https://developers.cloudflare.com/realtime/realtimekit/release-notes/#page","headline":"Release Notes · Cloudflare Realtime docs","description":"Release notes and changelog for the RealtimeKit Web Core SDK.","url":"https://developers.cloudflare.com/realtime/realtimekit/release-notes/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-12","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/release-notes/","name":"Release Notes"}}]}
```
