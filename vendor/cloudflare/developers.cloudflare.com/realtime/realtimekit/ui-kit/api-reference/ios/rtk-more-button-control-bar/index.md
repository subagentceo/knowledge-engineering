---
title: RtkMoreButtonControlBar
description: API reference for RtkMoreButtonControlBar component (iOS Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkMoreButtonControlBar

A control bar button that opens a bottom sheet menu with meeting actions such as chat, polls, and participant list.

## Initializer parameters

| Parameter                       | Type              | Required | Default | Description                                                |
| ------------------------------- | ----------------- | -------- | ------- | ---------------------------------------------------------- |
| meeting                         | RealtimeKitClient | ✅        | \-      | The RealtimeKit client instance                            |
| presentingViewController        | UIViewController  | ✅        | \-      | View controller used to present the bottom sheet           |
| settingViewControllerCompletion | (() -> Void)?     | ❌        | nil     | Closure called when the settings view controller dismisses |

## Methods

| Method            | Return Type | Description                                      |
| ----------------- | ----------- | ------------------------------------------------ |
| hideBottomSheet() | Void        | Programmatically dismisses the bottom sheet menu |

## Usage Examples

### Basic Usage

Swift

```

import RealtimeKitUI


let moreButton = RtkMoreButtonControlBar(

    meeting: rtkClient,

    presentingViewController: self

)

view.addSubview(moreButton)


```

### With settings completion

Swift

```

import RealtimeKitUI


let moreButton = RtkMoreButtonControlBar(

    meeting: rtkClient,

    presentingViewController: self,

    settingViewControllerCompletion: {

        print("Settings dismissed")

    }

)

view.addSubview(moreButton)


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-more-button-control-bar/#page","headline":"RtkMoreButtonControlBar · Cloudflare Realtime docs","description":"API reference for RtkMoreButtonControlBar component (iOS Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-more-button-control-bar/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/","name":"iOS"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/rtk-more-button-control-bar/","name":"RtkMoreButtonControlBar"}}]}
```
