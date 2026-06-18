---
title: React Native UI Kit SDK
description: Release notes and changelog for the RealtimeKit React Native UI Kit SDK.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# React Native UI Kit SDK

[ Subscribe to RSS ](https://developers.cloudflare.com/realtime/realtimekit/release-notes/react-native-ui-kit/index.xml)

## 2026-05-05

**RealtimeKit React Native UI Kit 1.0.0**

**Breaking changes**

* Removed support for `@cloudflare/realtimekit-react-native` version less than v1.0.0
* The Join Stage Confirmation dialog (i.e `RtkJoinStage`) now opens with Mic/Camera disabled by default.

**Features**

* Added unread counts for chat and polls in `RtkPollsToggle`, `RtkChatToggle`, and `RtkMoreToggle`

**Fixes**

* Fixed an issue where when a meeting host leaves the stage, all plugins and host controls disappear.

## 2026-03-30

**RealtimeKit React Native UI Kit 0.2.1**

**Fixes**

* Fixed an issue where self video is not visible on Setup Screen on initial load (i.e happens with @cloudflare/realtimekit-react-native version v0.3.2)

## 2025-11-20

**RealtimeKit React Native UI Kit 0.2.0**

**Features**

* Added edit, pin, and delete controls to Chat messages in RtkChat
* Added optional background support for audio/video in Android. Refer to the [documentation](https://docs.realtime.cloudflare.com/react-native/quickstart#additional-steps-for-background-audiovideo-support) for implementation details.

**Fixes**

* Fixed image button in RtkChat opening File Manager instead of Gallery
* Fixed app crash on RtkChat auto-scroll when new messages arrive
* Fixed chat message display issues

## 2025-09-14

**RealtimeKit React Native UI Kit 0.1.3**

**Fixes**

* Fixed duplicate stage toggle pop-ups
* Fixed audio switch to earpiece when leaving stage in Webinar

## 2025-07-08

**RealtimeKit React Native UI Kit 0.1.2**

**Fixes**

* Fixed android build failing for New Architecture
* Added delete option feature in Polls
* Fixed screen being blank when kicked from meeting
* Fixed the fullscreen button not clickable in screenshare
* Fixed audio selector not visible for webinar viewer
* Fixed video incorrectly labeled as being off

## 2025-06-05

**RealtimeKit React Native UI Kit 0.1.1**

**Fixes**

* Documentation improvements

## 2025-06-04

**RealtimeKit React Native UI Kit 0.1.0**

**Features**

* Initial release

```json
{"@context":"https://schema.org","@type":"BlogPosting","@id":"https://developers.cloudflare.com/realtime/realtimekit/release-notes/react-native-ui-kit/#page","headline":"React Native UI Kit SDK · Cloudflare Realtime docs","description":"Release notes and changelog for the RealtimeKit React Native UI Kit SDK.","url":"https://developers.cloudflare.com/realtime/realtimekit/release-notes/react-native-ui-kit/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/release-notes/","name":"Release Notes"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/release-notes/react-native-ui-kit/","name":"React Native UI Kit SDK"}}]}
```
