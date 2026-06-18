---
title: RtkNavigationBar
description: API reference for RtkNavigationBar component (iOS Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkNavigationBar

A navigation bar with a title label and a close or back button. Used for modal screens such as chat, polls, and participant lists.

## Initializer parameters

| Parameter | Type   | Required | Default | Description                                    |
| --------- | ------ | -------- | ------- | ---------------------------------------------- |
| title     | String | ✅        | \-      | The title text displayed in the navigation bar |

## Properties

| Property   | Type                | Required | Default | Description                                               |
| ---------- | ------------------- | -------- | ------- | --------------------------------------------------------- |
| titleLabel | RtkLabel            | \-       | \-      | The label displaying the navigation bar title (read-only) |
| leftButton | RtkControlBarButton | \-       | \-      | The close or back button on the left side (read-only)     |

## Methods

| Method                        | Return Type | Description                                       |
| ----------------------------- | ----------- | ------------------------------------------------- |
| setBackButtonClick(callBack:) | Void        | Sets the tap handler for the back or close button |

## Usage Examples

### Basic Usage

Swift

```

import RealtimeKitUI


let navBar = RtkNavigationBar(title: "Participants")

view.addSubview(navBar)


```

### With back button handler

Swift

```

import RealtimeKitUI


let navBar = RtkNavigationBar(title: "Chat")

navBar.setBackButtonClick {

    self.dismiss(animated: true)

}

view.addSubview(navBar)


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-navigation-bar/#page","headline":"RtkNavigationBar · Cloudflare Realtime docs","description":"API reference for RtkNavigationBar component (iOS Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-navigation-bar/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/","name":"iOS"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/rtk-navigation-bar/","name":"RtkNavigationBar"}}]}
```
