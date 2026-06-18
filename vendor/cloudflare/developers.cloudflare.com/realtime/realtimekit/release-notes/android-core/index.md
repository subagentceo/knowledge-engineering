---
title: Android Core SDK
description: Release notes and changelog for the RealtimeKit Android Core SDK.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Android Core SDK

[ Subscribe to RSS ](https://developers.cloudflare.com/realtime/realtimekit/release-notes/android-core/index.xml)

## 2026-05-08

**RealtimeKit Android Core 2.1.0**

**Breaking changes**

* `RtkParticipants.activeSpeaker` → `RtkParticipants.lastActiveSpeaker`. The old `activeSpeaker` property is deprecated and will be removed in a future release.
* `RtkSelfParticipant.enableScreenShare()` → `enableScreenShare(onResult:)`. The old no-callback version is deprecated and will be removed in a future release.
* `RtkSelfParticipant.disableScreenShare()` → `disableScreenShare(onResult:)`. The old no-callback version is deprecated and will be removed in a future release.
* `RtkStore.subscribe(key, (key, value) → Unit)` → `subscribe(key, (value) → Unit)`. The old two-argument callback signature is deprecated but remains functional via a backward-compatible shim.
* `RtkStore.unsubscribe(key, (key, value) → Unit)` → `unsubscribe(key, (value) → Unit)`. The old two-argument callback signature is deprecated but remains functional via a backward-compatible shim.

**Features**

* Added `RtkChat.pin()` and `RtkChat.unpin()` methods to pin and unpin chat messages
* Added `RtkChat.getMessagesByUser()` to filter messages by sender and `RtkChat.getMessagesByType()` to filter messages by type
* Added `SelfPermissions.canPinMessage()` to check whether the local participant has permission to pin messages

**Fixes**

* Fixed a memory leak in video rendering caused by `SurfaceViewRenderer` instances not being released
* Fixed recording state getting stuck as "recording" when stopping a recording that was started by another participant
* Fixed "ghost" participants appearing on the grid when a user was on the setup screen but had not yet joined the socket room
* Fixed webinar host being invisible to other participants when joining late
* Fixed recording bots and other hidden participants incorrectly appearing on the participant grid
* Fixed waitlisted participants appearing in the participant list before being admitted to the meeting

## 2026-04-20

**RealtimeKit Android Core 2.0.0**

**Breaking changes**

* Removed Hive SFU support. Only the Cloudflare SFU is supported going forward.
* The default base URI is now `realtime.cloudflare.com`. Calling `init()` with a `dyte.io` base domain now fails immediately with `MeetingError.InvalidBaseUrl`

**Fixes**

* Added compatibility with new backend plugins API field naming
* Fixed a crash that could occur when accessing the socket controller before `init()` was called
* Fixed auth token not being sent to the callstats collector endpoint
* Removed custom ping-pong keepalive logic that was only required for the previous infrastructure

## 2026-03-06

**RealtimeKit Android Core 1.6.2**

**Fixes**

* Avoid crash when using Ktor versions 3.4.0 and above

## 2026-02-06

**RealtimeKit Android Core 1.6.1**

**Fixes**

* Fixed media issues when connection took longer to establish

## 2026-01-14

**RealtimeKit Android Core 1.6.0**

**Fixes**

* Improved grid transitions by activating consumers in batches for better performance
* Moved consumer toggle requests off main thread to prevent UI blocking
* Improved video rendering stability with better lifecycle management
* Prevented race conditions by canceling reconnection attempts during initialization

## 2025-12-16

**RealtimeKit Android Core 1.5.7**

**Fixes**

* Fixed rare crash when toggling audio mute
* Off-stage webinar hosts no longer show up on the grid

## 2025-12-12

**RealtimeKit Android Core 1.5.6**

**Fixes**

* Fixed deadlocks in webinar join and screenshare enable flows
* Fixed an issue with camera not working when moving to settings screen and back
* Fixed a rare crash in voice activity detection

## 2025-12-04

**RealtimeKit Android Core 1.5.5**

**Fixes**

* Fixed participant tiles not being removed properly when peers left the meeting

## 2025-11-06

**RealtimeKit Android Core 1.5.4**

**Fixes**

* Internal fixes to reduce telemetry verbosity

## 2025-10-23

**RealtimeKit Android Core 1.5.3**

**Fixes**

* Fixed a regression that caused self video to not render if meeting was joined with camera disabled

## 2025-10-23

**RealtimeKit Android Core 1.5.2**

**Fixes**

* Fixed unreliable grid behavior with improved refresh logic

## 2025-10-06

**RealtimeKit Android Core 1.5.1**

**Fixes**

* Internal fixes to resolve issues for Flutter platform

## 2025-09-23

**RealtimeKit Android Core 1.5.0**

**Features**

* Added `RtkSelfEventListener#onAudioDeviceChanged` method that is invoked when the current audio route is updated

## 2025-09-18

**RealtimeKit Android Core 1.4.1**

**Fixes**

* Speakerphone is now preferred over earpiece as the default audio output

## 2025-09-18

**RealtimeKit Android Core 1.4.0**

**Breaking changes**

* Updated `RtkSelfEventListener#onAudioDevicesUpdated` method to provide the list of available devices

**Fixes**

* Fixed not being able to route audio to Bluetooth devices

## 2025-09-12

**RealtimeKit Android Core 1.3.4**

**Fixes**

* Fixed a rare crash during meeting joins in poor network scenarios

## 2025-09-12

**RealtimeKit Android Core 1.3.3**

**Fixes**

* Fixed pinned peers not being removed from the stage when kicked
* Media consumers are now created in parallel, which significantly improved the speed of when users start seeing other people's audio/video after joining a meeting
* Native libraries are now 16KB aligned to comply with [Google Play requirements](https://android-developers.googleblog.com/2025/05/prepare-play-apps-for-devices-with-16kb-page-size.html)
* Fixed "Ghost"/Invalid peers that would sometimes show up in long-running meetings
* Fixed an issue in webinar meetings where the SDK would fail to produce media after being removed from the stage once

## 2025-08-13

**RealtimeKit Android Core 1.3.2**

**Enhancements**

* Fixed microphone not working when joining the stage in a webinar

## 2025-08-13

**RealtimeKit Android Core 1.3.1**

**Enhancements**

* Fixed a potential crash in poor network scenarios

## 2025-08-12

**RealtimeKit Android Core 1.3.0**

**Features**

* Added `RtkSelfParticipant#canJoinStage` and `RtkSelfParticipant#canRequestToJoinStage` APIs

**Fixes**

* Fixed viewer unable to join stage in a Livestream
* Fixed user unable to see existing pinned participant after joining meeting

## 2025-08-05

**RealtimeKit Android Core 1.2.0**

**Breaking changes**

* Renamed `RtkLivestreamData.roomName` to `RtkLivestreamData.meetingId` to match existing API convention
* Removed obsolete `WaitingRoomPermissions` abstraction — all the relevant functionality here is available through `HostPermissions`
* VideoDevice gained a `cameraType: CameraType` parameter
* `VideoDeviceType#displayName` is now deprecated, and it's recommended to call `VideoDevice#toString` instead to get user-facing names for individual `VideoDevice` instances
* Existing APIs related to middlewares were removed and replaced with equivalent counterparts from WebRTC: `RtkSelfParticipant#addVideoMiddleware`, `RtkSelfParticipant#getVideoMiddlewares` and `RtkSelfParticipant#removeVideoMiddleware` were replaced with `RealtimeKitMeetingBuilder#setVideoProcessor`
* `RtkVideoFrame` was removed in favor of WebRTC's own `VideoFrame` class, available as `realtimekit.org.webrtc.VideoFrame`

**Features**

* Reimplemented middlewares using WebRTC-native primitives to resolve intermittent crashes and other issues, check out the new [Video Processing](https://docs.realtime.cloudflare.com/android-core/video-processing/introduction) docs section to learn more
* `VideoDevice` now properly labels multiple cameras based on their camera characteristics such as wide-angle and telephoto

**Fixes**

* Fixed screen share failing to stop
* Silenced log spam from our callstats library

## 2025-07-02

**RealtimeKit Android Core 1.1.0**

**Enhancements**

* Meeting initialization (`meeting.init()`) is now \~60% faster
* Switched to an updated and **RTK** namespaced WebRTC
* Improved Active speaker detection with the updated WebRTC

## 2025-06-20

**RealtimeKit Android Core 1.0.1**

**Breaking changes**

* Renamed RtkMessageType to ChatMessageType

**Fixes**

* Silenced logspam from audio activity reporter
* Improved speed of joining calls
* Auth tokens now automatically trim invalid spaces and newlines

## 2025-05-26

**RealtimeKit Android Core 1.0.0**

**Breaking changes**

* Removed deprecated `channelId` field from `TextMessage`
* Moved listener types to their respective feature package
* Moved public listeners to their respective feature packages
* Renamed plugin add-remove listener methods for RtkPluginsEventListener
* Moved chat extensions to the `chat` package
* Moved `RtkParticipant` to the root package
* Moved `RtkMeetingParticipant` to the root package
* Moved `RtkPluginFile` to the plugins package
* Moved middlewares to their own package
* Moved `VideoScaleType` to top level `media` package
* Dropped `Rtk` prefix from audio and video device types
* Moved device types to the top level `media` package
* Dropped `Rtk` prefix from polls types
* Replaced all LiveStream references with Livestream
* Moved `RtkMeetingParticipant` to root package
* Stripped `Rtk` prefix from `RtkRecordingState`
* Stripped `Rtk` prefix from chat message types
* Removed deprecated RtkLivestream#roomName field
* Moved `RtkMediaPermission` to media package and renamed to `MediaPermission`
* Redistributed `feat` package members
* Moved `StageStatus` class to stage package
* Renamed all event listeners to be of the singular `*EventListener` form

## 2025-05-16

**RealtimeKit Android Core 0.2.1**

**Fixes**

* Internal fixes to release pipeline

## 2025-05-16

**RealtimeKit Android Core 0.2.0**

**Fixes**

* Added audio activity detection for active speaker signaling

## 2025-05-14

**RealtimeKit Android Core 0.1.0**

**New APIs**

* Initial alpha release

```json
{"@context":"https://schema.org","@type":"BlogPosting","@id":"https://developers.cloudflare.com/realtime/realtimekit/release-notes/android-core/#page","headline":"Android Core SDK · Cloudflare Realtime docs","description":"Release notes and changelog for the RealtimeKit Android Core SDK.","url":"https://developers.cloudflare.com/realtime/realtimekit/release-notes/android-core/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/release-notes/","name":"Release Notes"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/release-notes/android-core/","name":"Android Core SDK"}}]}
```
