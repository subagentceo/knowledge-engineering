---
title: RtkNotificationConfig
description: API reference for RtkNotificationConfig component (iOS Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkNotificationConfig

Configuration class for controlling notification behavior in meetings. Manages sound and toast notifications for participant join/leave events, chat messages, and polls.

## Properties

| Property          | Type            | Required | Default           | Description                                        |
| ----------------- | --------------- | -------- | ----------------- | -------------------------------------------------- |
| participantJoined | RtkNotification | ❌        | RtkNotification() | Notification settings for participant join events  |
| participantLeft   | RtkNotification | ❌        | RtkNotification() | Notification settings for participant leave events |
| newChatArrived    | RtkNotification | ❌        | RtkNotification() | Notification settings for new chat messages        |
| newPollArrived    | RtkNotification | ❌        | RtkNotification() | Notification settings for new poll events          |

## RtkNotification properties

Each `RtkNotification` instance contains the following properties:

| Property  | Type | Required | Default | Description                          |
| --------- | ---- | -------- | ------- | ------------------------------------ |
| playSound | Bool | ❌        | true    | Whether to play a notification sound |
| showToast | Bool | ❌        | true    | Whether to show a toast notification |

## Usage Examples

### Basic Usage

Swift

```

import RealtimeKitUI


let rtkUI = RealtimeKitUI(meetingInfo: meetingInfo)

// Access the default notification config

let notificationConfig = rtkUI.notification


```

### Customize notifications

Swift

```

import RealtimeKitUI


let rtkUI = RealtimeKitUI(meetingInfo: meetingInfo)


// Disable sound for participant join events

rtkUI.notification.participantJoined.playSound = false


// Disable toast for chat messages

rtkUI.notification.newChatArrived.showToast = false


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-notification-config/#page","headline":"RtkNotificationConfig · Cloudflare Realtime docs","description":"API reference for RtkNotificationConfig component (iOS Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-notification-config/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/","name":"iOS"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/rtk-notification-config/","name":"RtkNotificationConfig"}}]}
```
