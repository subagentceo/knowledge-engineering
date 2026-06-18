---
title: RtkJoinButton
description: API reference for RtkJoinButton component (iOS Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkJoinButton

A pre-configured button that joins the meeting. Validates the participant name before joining.

## Initializer parameters

| Parameter  | Type                             | Required | Default | Description                                                                                             |
| ---------- | -------------------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------- |
| meeting    | RealtimeKitClient                | ✅        | \-      | The RealtimeKit client instance                                                                         |
| onClick    | ((RtkJoinButton, Bool) -> Void)? | ❌        | nil     | Closure called when the button is tapped. The Bool parameter indicates whether the join was successful. |
| appearance | RtkButtonAppearance              | ❌        | \-      | Appearance configuration for the button                                                                 |

## Usage Examples

### Basic Usage

Swift

```

import RealtimeKitUI


let joinButton = RtkJoinButton(meeting: rtkClient)

view.addSubview(joinButton)


```

### With tap handler

Swift

```

import RealtimeKitUI


let joinButton = RtkJoinButton(

    meeting: rtkClient,

    onClick: { button, success in

        if success {

            print("Joined meeting")

        } else {

            print("Join failed")

        }

    }

)

view.addSubview(joinButton)


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-join-button/#page","headline":"RtkJoinButton · Cloudflare Realtime docs","description":"API reference for RtkJoinButton component (iOS Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-join-button/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/","name":"iOS"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/rtk-join-button/","name":"RtkJoinButton"}}]}
```
