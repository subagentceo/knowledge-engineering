---
title: RtkEndMeetingControlBarButton
description: API reference for RtkEndMeetingControlBarButton component (iOS Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkEndMeetingControlBarButton

A control bar button that ends or leaves the meeting. Optionally displays a confirmation dialog before ending the meeting.

## Initializer parameters

| Parameter           | Type                                                                                     | Required | Default | Description                                                                                                             |
| ------------------- | ---------------------------------------------------------------------------------------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------- |
| meeting             | RealtimeKitClient                                                                        | ✅        | \-      | The RealtimeKit client instance                                                                                         |
| alertViewController | UIViewController                                                                         | ✅        | \-      | View controller used to present the confirmation alert                                                                  |
| onClick             | ((RtkEndMeetingControlBarButton, RtkLeaveDialog.RtkLeaveDialogAlertButtonType) -> Void)? | ❌        | nil     | Closure called after the user confirms leaving or ending the meeting, receiving the button and the selected action type |
| appearance          | RtkControlBarButtonAppearance                                                            | ❌        | \-      | Appearance configuration for the button                                                                                 |

## Properties

| Property               | Type | Required | Default | Description                                                    |
| ---------------------- | ---- | -------- | ------- | -------------------------------------------------------------- |
| shouldShowAlertOnClick | Bool | ❌        | true    | Whether to show a confirmation alert before ending the meeting |

## Usage Examples

### Basic Usage

Swift

```

import RealtimeKitUI


let endButton = RtkEndMeetingControlBarButton(

    meeting: rtkClient,

    alertViewController: self

)

view.addSubview(endButton)


```

### Without confirmation dialog

Swift

```

import RealtimeKitUI


let endButton = RtkEndMeetingControlBarButton(

    meeting: rtkClient,

    alertViewController: self,

    onClick: { button, actionType in

        print("Action: \(actionType)")

    }

)

endButton.shouldShowAlertOnClick = false

view.addSubview(endButton)


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-end-meeting-control-bar-button/#page","headline":"RtkEndMeetingControlBarButton · Cloudflare Realtime docs","description":"API reference for RtkEndMeetingControlBarButton component (iOS Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-end-meeting-control-bar-button/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/","name":"iOS"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/rtk-end-meeting-control-bar-button/","name":"RtkEndMeetingControlBarButton"}}]}
```
