---
title: RtkPluginsView
description: API reference for RtkPluginsView component (iOS Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkPluginsView

A composite view for displaying plugins and screen share content. Includes a tab selector, plugin content area, and a floating active speaker view.

## Initializer parameters

| Parameter          | Type               | Required | Default | Description                                 |
| ------------------ | ------------------ | -------- | ------- | ------------------------------------------- |
| videoPeerViewModel | VideoPeerViewModel | ✅        | \-      | The view model for the active speaker video |

## Properties

| Property        | Type                     | Required | Default | Description                                                      |
| --------------- | ------------------------ | -------- | ------- | ---------------------------------------------------------------- |
| activeListView  | RtkActiveTabSelectorView | \-       | \-      | The tab selector for switching between plugins and screen shares |
| pluginVideoView | UIView                   | \-       | \-      | The container view for plugin content                            |
| syncButton      | UIButton                 | \-       | \-      | Button to sync the plugin view with the presenter                |

## Methods

| Method                                         | Return Type | Description                                                  |
| ---------------------------------------------- | ----------- | ------------------------------------------------------------ |
| setButtons(buttons:selectedIndex:clickAction:) | Void        | Configures the tab selector buttons with a selection handler |
| show(pluginView:)                              | Void        | Displays a plugin view in the content area                   |
| showVideoView(participant:)                    | Void        | Displays a participant's video in the content area           |
| showPinnedView(participant:)                   | Void        | Displays a pinned participant's video                        |
| showActiveSpeakerView(participant:)            | Void        | Shows the floating active speaker overlay                    |
| hideActiveSpeaker()                            | Void        | Hides the floating active speaker overlay                    |

## Usage Examples

### Basic Usage

Swift

```

import RealtimeKitUI


let viewModel = VideoPeerViewModel(

    meeting: rtkClient,

    participant: participant,

    showSelfPreviewVideo: false

)

let pluginsView = RtkPluginsView(videoPeerViewModel: viewModel)

view.addSubview(pluginsView)


```

### With tab buttons

Swift

```

import RealtimeKitUI


let viewModel = VideoPeerViewModel(

    meeting: rtkClient,

    participant: participant,

    showSelfPreviewVideo: false

)

let pluginsView = RtkPluginsView(videoPeerViewModel: viewModel)


let buttons = [

    RtkPluginScreenShareTabButton(image: nil, title: "Screen Share"),

    RtkPluginScreenShareTabButton(image: nil, title: "Whiteboard")

]

pluginsView.setButtons(

    buttons: buttons,

    selectedIndex: 0,

    clickAction: { index in

        print("Selected tab: \(index)")

    }

)

view.addSubview(pluginsView)


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-plugins-view/#page","headline":"RtkPluginsView · Cloudflare Realtime docs","description":"API reference for RtkPluginsView component (iOS Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-plugins-view/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/","name":"iOS"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/rtk-plugins-view/","name":"RtkPluginsView"}}]}
```
