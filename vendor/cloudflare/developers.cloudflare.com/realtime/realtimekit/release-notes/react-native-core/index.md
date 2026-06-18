---
title: React Native Core SDK
description: Release notes and changelog for the RealtimeKit React Native Core SDK.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# React Native Core SDK

[ Subscribe to RSS ](https://developers.cloudflare.com/realtime/realtimekit/release-notes/react-native-core/index.xml)

## 2026-05-05

**RealtimeKit React Native Core 1.0.0**

**Breaking changes**

* Removed Hive SFU support. Only the Cloudflare SFU is supported going forward.
* The default base URI is now `realtime.cloudflare.com`. Calling `initMeeting()` with baseURI parameter set to a `dyte.io` base domain now throws an Error.
* `RealtimeKitClientOptions` is renamed to `RTKClientOptions`.

**Fixes**

* Fixed an issue where sometimes after rejoining a meeting & upon stopping iOS screenshare, the app freezes.

## 2026-03-30

**RealtimeKit React Native Core 0.3.2**

**Fixes**

* Fixed the issue when leaving & rejoining a meeting causes the local media to stop working
* Fixed iOS screenshare stops broadcasting on Web when calling `meeting.self.disableScreenShare()` but not clicking on 'Stop' on iOS Picker View.

## 2025-11-20

**RealtimeKit React Native Core 0.3.1**

**Fixes**

* Fixed bluetooth not showing in list/dropdown after rejoining meeting
* Fixed mobile active speaker not working after rejoining meeting

## 2025-11-02

**RealtimeKit React Native Core 0.3.0**

**Breaking changes**

* Starting from version v0.3.0, SDK now supports only React Native 0.77 and above.

**Fixes**

* Fixed 16KB page support in Android >=15
* Fixed foreground service failed to stop errors in Android
* Fixed bluetooth issues in iOS Devices
* Fixed android build issues due to deprecated jCenter in React Native 0.80 or higher

## 2025-10-06

**RealtimeKit React Native Core 0.2.1**

**Fixes**

* Fixed can't install multiple apps with expo sdk
* Fixed screenshare for Android in Expo with New Architecture enabled
* Fixed remote audio/video not working in group calls

## 2025-09-14

**RealtimeKit React Native Core 0.2.0**

**Breaking changes**

* Adding a `blob_provider_authority` string resource is now mandatory. Refer to the installation instructions for more details.

**Fixes**

* Fixed audio switch to earpiece when leaving stage in Webinar
* Fixed types for useRealtimeKitClient options
* Fixed screenshare for Android in Expo

## 2025-08-05

**RealtimeKit React Native Core 0.1.3**

**Fixes**

* Fixed active speaker not working

## 2025-07-08

**RealtimeKit React Native Core 0.1.2**

**Fixes**

* Fixed screenshare not working for Android 13 and later
* Fixed audio device switching not working
* Minor performance improvements

## 2025-06-05

**RealtimeKit React Native Core 0.1.1**

**Fixes**

* Documentation improvements

## 2025-05-29

**RealtimeKit React Native Core 0.1.0**

**Features**

* Initial release

```json
{"@context":"https://schema.org","@type":"BlogPosting","@id":"https://developers.cloudflare.com/realtime/realtimekit/release-notes/react-native-core/#page","headline":"React Native Core SDK · Cloudflare Realtime docs","description":"Release notes and changelog for the RealtimeKit React Native Core SDK.","url":"https://developers.cloudflare.com/realtime/realtimekit/release-notes/react-native-core/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/release-notes/","name":"Release Notes"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/release-notes/react-native-core/","name":"React Native Core SDK"}}]}
```
