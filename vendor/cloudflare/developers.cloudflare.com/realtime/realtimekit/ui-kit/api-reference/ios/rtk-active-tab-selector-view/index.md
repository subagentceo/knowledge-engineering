---
title: RtkActiveTabSelectorView
description: API reference for RtkActiveTabSelectorView component (iOS Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkActiveTabSelectorView

A horizontally scrollable tab selector for switching between plugins and screen shares.

## Properties

| Property | Type                              | Required | Default | Description                              |
| -------- | --------------------------------- | -------- | ------- | ---------------------------------------- |
| buttons  | \[RtkPluginScreenShareTabButton\] | \-       | \-      | The array of tab buttons in the selector |

## Methods

| Method                    | Return Type | Description                                                   |
| ------------------------- | ----------- | ------------------------------------------------------------- |
| scrollToVisible(button:)  | Void        | Scrolls the tab selector to make the specified button visible |
| setAndDisplayButtons(\_:) | Void        | Sets and displays the provided array of tab buttons           |

## Usage Examples

### Basic Usage

Swift

```

import RealtimeKitUI


let tabSelector = RtkActiveTabSelectorView()

let buttons = [

    RtkPluginScreenShareTabButton(image: nil, title: "Screen Share"),

    RtkPluginScreenShareTabButton(image: nil, title: "Whiteboard")

]

tabSelector.setAndDisplayButtons(buttons)

view.addSubview(tabSelector)


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-active-tab-selector-view/#page","headline":"RtkActiveTabSelectorView · Cloudflare Realtime docs","description":"API reference for RtkActiveTabSelectorView component (iOS Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-active-tab-selector-view/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/","name":"iOS"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/rtk-active-tab-selector-view/","name":"RtkActiveTabSelectorView"}}]}
```
