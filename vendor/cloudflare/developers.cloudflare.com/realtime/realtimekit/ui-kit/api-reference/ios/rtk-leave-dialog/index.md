---
title: RtkLeaveDialog
description: API reference for RtkLeaveDialog component (iOS Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkLeaveDialog

A dialog that presents leave and end meeting options. Displays different options based on host permissions.

## Initializer parameters

| Parameter | Type                                       | Required | Default | Description                                          |
| --------- | ------------------------------------------ | -------- | ------- | ---------------------------------------------------- |
| meeting   | RealtimeKitClient                          | ✅        | \-      | The RealtimeKit client instance                      |
| onClick   | ((RtkLeaveDialogAlertButtonType) -> Void)? | ❌        | nil     | Closure called when the user selects a dialog option |

## Methods

| Method    | Return Type | Description                                                |
| --------- | ----------- | ---------------------------------------------------------- |
| show(on:) | Void        | Presents the leave dialog on the specified view controller |

## Usage Examples

### Basic Usage

Swift

```

import RealtimeKitUI


let leaveDialog = RtkLeaveDialog(meeting: rtkClient)

leaveDialog.show(on: self)


```

### With selection handler

Swift

```

import RealtimeKitUI


let leaveDialog = RtkLeaveDialog(

    meeting: rtkClient,

    onClick: { buttonType in

        switch buttonType {

        case .leaveMeeting:

            print("Leaving meeting")

        case .endMeeting:

            print("Ending meeting for all")

        default:

            break

        }

    }

)

leaveDialog.show(on: self)


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-leave-dialog/#page","headline":"RtkLeaveDialog · Cloudflare Realtime docs","description":"API reference for RtkLeaveDialog component (iOS Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-leave-dialog/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/","name":"iOS"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/rtk-leave-dialog/","name":"RtkLeaveDialog"}}]}
```
