---
title: RtkNotificationBadgeView
description: API reference for RtkNotificationBadgeView component (iOS Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkNotificationBadgeView

A small circular badge view that displays a notification count. Hides automatically when the count is zero and shows "99+" for counts over 99.

## Methods

| Method             | Return Type | Description                                                                          |
| ------------------ | ----------- | ------------------------------------------------------------------------------------ |
| setBadgeCount(\_:) | Void        | Sets the badge count. Hides the badge at zero and displays "99+" for values over 99. |

## Usage Examples

### Basic Usage

Swift

```

import RealtimeKitUI


let badge = RtkNotificationBadgeView()

badge.setBadgeCount(5)

view.addSubview(badge)


```

### Reset badge

Swift

```

import RealtimeKitUI


let badge = RtkNotificationBadgeView()

badge.setBadgeCount(3)

view.addSubview(badge)


// Hide the badge by setting count to zero

badge.setBadgeCount(0)


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-notification-badge-view/#page","headline":"RtkNotificationBadgeView · Cloudflare Realtime docs","description":"API reference for RtkNotificationBadgeView component (iOS Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-notification-badge-view/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/","name":"iOS"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/rtk-notification-badge-view/","name":"RtkNotificationBadgeView"}}]}
```
