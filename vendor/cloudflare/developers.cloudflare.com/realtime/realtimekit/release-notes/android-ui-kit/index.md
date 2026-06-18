---
title: Android UI Kit SDK
description: Release notes and changelog for the RealtimeKit Android UI Kit SDK.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Android UI Kit SDK

[ Subscribe to RSS ](https://developers.cloudflare.com/realtime/realtimekit/release-notes/android-ui-kit/index.xml)

## 2026-05-11

**RealtimeKit Android UI Kit 1.1.0**

**Features**

* Added chat message pin/unpin support: long-press any message to open an actions sheet with Pin and Unpin options, with an expandable banner showing pinned messages
* Added a "Deny All" button to the waiting room participant list and webinar stage access requests so hosts can reject all pending requests at once
* Upgraded to [RealtimeKit Core v2.1.0](https://developers.cloudflare.com/realtime/realtimekit/release-notes/android-core/#2026-05-08)

## 2026-04-20

**RealtimeKit Android UI Kit 1.0.0**

**Breaking changes**

* Upgraded to [RealtimeKit Core v2.0.0](https://developers.cloudflare.com/realtime/realtimekit/release-notes/android-core/#2026-04-20) which removes support for Dyte APIs and SFU.

## 2026-02-06

**RealtimeKit Android UI Kit 0.3.4**

**Enhancements**

* Upgraded to [RealtimeKit Core v1.6.1](https://developers.cloudflare.com/realtime/realtimekit/release-notes/android-core/#2026-02-06)

## 2026-01-14

**RealtimeKit Android UI Kit 0.3.3**

**Enhancements**

* Upgraded to [RealtimeKit Core v1.6.0](https://developers.cloudflare.com/realtime/realtimekit/release-notes/android-core/#2026-01-14)

## 2025-12-16

**RealtimeKit Android UI Kit 0.3.2**

**Enhancements**

* Upgraded to [RealtimeKit Core v1.5.7](https://developers.cloudflare.com/realtime/realtimekit/release-notes/android-core/#2025-12-16)

## 2025-12-12

**RealtimeKit Android UI Kit 0.3.1**

**Enhancements**

* Upgraded to [RealtimeKit Core v1.5.6](https://developers.cloudflare.com/realtime/realtimekit/release-notes/android-core/#2025-12-12)

**Fixes**

* Fixed crash when screenshare is disabled for a participant
* Fixed screenshare disappearing when video is disabled for a screensharing participant

## 2025-12-04

**RealtimeKit Android UI Kit 0.3.0**

**Enhancements**

* Upgraded to [RealtimeKit Core v1.5.5](https://developers.cloudflare.com/realtime/realtimekit/release-notes/android-core/#2025-12-04)

## 2025-11-06

**RealtimeKit Android UI Kit 0.2.12**

**Enhancements**

* Upgraded to [RealtimeKit Core v1.5.4](https://developers.cloudflare.com/realtime/realtimekit/release-notes/android-core/#2025-11-06)

**Fixes**

* Fixed an issue with camera video not rendering in the settings UI

## 2025-10-23

**RealtimeKit Android UI Kit 0.2.11**

**Enhancements**

* Upgraded to [RealtimeKit Core v1.5.3](https://developers.cloudflare.com/realtime/realtimekit/release-notes/android-core/#2025-10-23)

**Fixes**

* Fixed a regression that caused self video to not render if meeting was joined with camera disabled

## 2025-10-23

**RealtimeKit Android UI Kit 0.2.10**

**Enhancements**

* Upgraded to [RealtimeKit Core v1.5.2](https://developers.cloudflare.com/realtime/realtimekit/release-notes/android-core/#2025-10-23)

**Fixes**

* Fixed an issue where pinning yourself in the participant view didn't update correctly

## 2025-10-08

**RealtimeKit Android UI Kit 0.2.9**

**Fixes**

* Fixed an issue where the last video frame remained stuck on participant tile

## 2025-10-06

**RealtimeKit Android UI Kit 0.2.8**

**Enhancements**

* Upgraded to [RealtimeKit Core v1.5.1](https://developers.cloudflare.com/realtime/realtimekit/release-notes/android-core/#2025-10-06)

## 2025-09-23

**RealtimeKit Android UI Kit 0.2.7**

**Enhancements**

* Upgraded to [RealtimeKit Core v1.5.0](https://developers.cloudflare.com/realtime/realtimekit/release-notes/android-core/#2025-09-23)

## 2025-09-18

**RealtimeKit Android UI Kit 0.2.6**

**Enhancements**

* Upgraded to [RealtimeKit Core v1.4.1](https://developers.cloudflare.com/realtime/realtimekit/release-notes/android-core/#2025-09-18)

**Fixes**

* Audio device selector now dynamically updates the options list when devices are removed or added
* Fixed crash when a host turns off video for an active screenshare user

## 2025-09-12

**RealtimeKit Android UI Kit 0.2.5**

**Fixes**

* Fixed pinned peers not being removed from the stage when kicked
* Media consumers are now created in parallel, which significantly improved the speed of when users start seeing other people's audio/video after joining a meeting
* Fixed "Ghost"/Invalid peers that would sometimes show up in long-running meetings
* Fixed an issue in webinar meetings where the SDK would fail to produce media after being removed from the stage once
* Fixed a rare crash during meeting joins in poor network scenarios

## 2025-08-13

**RealtimeKit Android UI Kit 0.2.4**

**Enhancements**

* Upgraded to [RealtimeKit Core v1.3.2](https://developers.cloudflare.com/realtime/realtimekit/release-notes/android-core/#2025-08-13)

## 2025-08-13

**RealtimeKit Android UI Kit 0.2.3**

**Enhancements**

* Upgraded to [RealtimeKit Core v1.3.1](https://developers.cloudflare.com/realtime/realtimekit/release-notes/android-core/#2025-08-13)

## 2025-08-12

**RealtimeKit Android UI Kit 0.2.2**

**Breaking changes**

* `RtkParticipantTileView#activateForSelfPreview` was removed, you can now call `RtkParticipantTileView#activate` for all participants and we take care of the self preview case internally

**Features**

* Upgraded to [RealtimeKit Core v1.3.0](https://developers.cloudflare.com/realtime/realtimekit/release-notes/android-core/#2025-08-12)

## 2025-08-05

**RealtimeKit Android UI Kit 0.2.1**

**Features**

* Upgraded to [RealtimeKit Core v1.2.0](https://developers.cloudflare.com/realtime/realtimekit/release-notes/android-core/#2025-08-05)

## 2025-07-02

**RealtimeKit Android UI Kit 0.2.0**

**Features**

* Upgraded to [RealtimeKit Core v1.1.0](https://developers.cloudflare.com/realtime/realtimekit/release-notes/android-core/#2025-07-02)

```json
{"@context":"https://schema.org","@type":"BlogPosting","@id":"https://developers.cloudflare.com/realtime/realtimekit/release-notes/android-ui-kit/#page","headline":"Android UI Kit SDK · Cloudflare Realtime docs","description":"Release notes and changelog for the RealtimeKit Android UI Kit SDK.","url":"https://developers.cloudflare.com/realtime/realtimekit/release-notes/android-ui-kit/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/release-notes/","name":"Release Notes"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/release-notes/android-ui-kit/","name":"Android UI Kit SDK"}}]}
```
