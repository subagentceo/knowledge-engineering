---
title: Flutter Core SDK
description: Release notes and changelog for the RealtimeKit Flutter Core SDK.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Flutter Core SDK

[ Subscribe to RSS ](https://developers.cloudflare.com/realtime/realtimekit/release-notes/flutter-core/index.xml)

## 2026-01-17

**RealtimeKit Flutter Core 0.1.5+1**

**Features**

* Updated internal version and dependencies

## 2025-12-18

**RealtimeKit Flutter Core 0.1.4+1**

**Features**

* Added `maxParticipantsPerPage` getter in client

**Fixes**

* Fixed hot-restart causing infinite loading screen
* Fixed video view flickering by using stable keys
* Fixed error code handling for iOS
* Fixed `rtkClient` not being reset after leaving a meeting
* Fixed a crash caused due to color parsing failure

## 2025-11-24

**RealtimeKit Flutter Core 0.1.4**

**Fixes**

* Fixed video views failing to be created for some participants
* Fixed participant pinning not working correctly

## 2025-11-03

**RealtimeKit Flutter Core 0.1.3**

**Features**

* Added `onAudioDeviceChanged(AudioDevice)` callback that is invoked when the current audio route changes
* Updated `onAudioDevicesUpdated(List<AudioDevice>)` callback to provide the list of available audio devices
* Added camera type to video device and a human-friendly label to show in UI

**Fixes**

* Updated iPhone deployment target to 18.0

## 2025-10-09

**RealtimeKit Flutter Core 0.1.2+1**

**Fixes**

* Reverted camera type changes that were causing a crash

## 2025-10-09

**RealtimeKit Flutter Core 0.1.2**

**Fixes**

* Screen now stays awake while participant is in a meeting
* Fixed stage status not being parsed correctly
* Fixed screen share view not displaying for local user
* Added camera type to video device and a human-friendly label to show in UI

## 2025-09-12

**RealtimeKit Flutter Core 0.1.1**

**Features**

* Added `onPollUpdate(List<Poll>)` callback in `RtkPollsEventListener` that is invoked when a poll is updated
* Added `acceptAllWaitingRoomRequests()` method to admit all waiting room participants at once

**Breaking changes**

* Moved `meeting.broadcastMessage` to `meeting.participants.broadcastMessage(...)`
* Renamed `disableAllAudios` and `disableAllVideos` to `disableAllAudio`/`disableAllVideo`
* Removed `RTK` prefix from `RtkVideoPermissions`

**Fixes**

* Fixed sending images and files in chat causing a crash

## 2025-08-26

**RealtimeKit Flutter Core 0.1.0+1**

**Fixes**

* Fixed event listener method names for self, plugin, polls, and recording events

## 2025-08-25

**RealtimeKit Flutter Core 0.1.0**

**New APIs**

* Initial release of RealtimeKit Flutter Core

```json
{"@context":"https://schema.org","@type":"BlogPosting","@id":"https://developers.cloudflare.com/realtime/realtimekit/release-notes/flutter-core/#page","headline":"Flutter Core SDK · Cloudflare Realtime docs","description":"Release notes and changelog for the RealtimeKit Flutter Core SDK.","url":"https://developers.cloudflare.com/realtime/realtimekit/release-notes/flutter-core/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/release-notes/","name":"Release Notes"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/release-notes/flutter-core/","name":"Flutter Core SDK"}}]}
```
