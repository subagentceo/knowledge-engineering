---
title: RtkMeetingControlBar
description: API reference for RtkMeetingControlBar component (iOS Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkMeetingControlBar

Control bar for group calls that extends `RtkControlBar` with microphone and video toggle buttons.

## Initializer parameters

| Parameter                       | Type                    | Required | Default                        | Description                                                |
| ------------------------------- | ----------------------- | -------- | ------------------------------ | ---------------------------------------------------------- |
| meeting                         | RealtimeKitClient       | ✅        | \-                             | The RealtimeKit client instance                            |
| delegate                        | RtkTabBarDelegate?      | ✅        | \-                             | Delegate for handling tab bar interactions                 |
| presentingViewController        | UIViewController        | ✅        | \-                             | View controller used for presenting modal screens          |
| appearance                      | RtkControlBarAppearance | ❌        | RtkControlBarAppearanceModel() | Appearance configuration for the control bar               |
| settingViewControllerCompletion | (() -> Void)?           | ❌        | nil                            | Closure called when the settings view controller dismisses |
| onLeaveMeetingCompletion        | (() -> Void)?           | ❌        | nil                            | Closure called when the participant leaves the meeting     |

## Properties

| Property   | Type                            | Required | Default | Description                                     |
| ---------- | ------------------------------- | -------- | ------- | ----------------------------------------------- |
| dataSource | RtkMeetingControlBarDataSource? | ❌        | nil     | Data source for customizing control bar buttons |

## Usage Examples

### Basic Usage

Swift

```

import RealtimeKitUI


let controlBar = RtkMeetingControlBar(

    meeting: rtkClient,

    delegate: self,

    presentingViewController: self

)

view.addSubview(controlBar)


```

### With leave meeting handler

Swift

```

import RealtimeKitUI


let controlBar = RtkMeetingControlBar(

    meeting: rtkClient,

    delegate: self,

    presentingViewController: self,

    onLeaveMeetingCompletion: {

        self.navigationController?.popViewController(animated: true)

    }

)

view.addSubview(controlBar)


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-meeting-control-bar/#page","headline":"RtkMeetingControlBar · Cloudflare Realtime docs","description":"API reference for RtkMeetingControlBar component (iOS Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-meeting-control-bar/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/","name":"iOS"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/rtk-meeting-control-bar/","name":"RtkMeetingControlBar"}}]}
```
