---
title: MeetingViewController
description: API reference for MeetingViewController component (iOS Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# MeetingViewController

The main meeting screen view controller. Displays the participant grid, plugins, screen share, header, and control bar.

## Initializer parameters

| Parameter  | Type                 | Required | Default | Description                                            |
| ---------- | -------------------- | -------- | ------- | ------------------------------------------------------ |
| meeting    | RealtimeKitClient    | ✅        | \-      | The RealtimeKit client instance for the active meeting |
| completion | @escaping () -> Void | ✅        | \-      | Closure called when the meeting ends                   |

## Properties

| Property   | Type                             | Required | Default | Description                                                          |
| ---------- | -------------------------------- | -------- | ------- | -------------------------------------------------------------------- |
| dataSource | MeetingViewControllerDataSource? | ❌        | nil     | Data source for providing custom topbar, middle view, and bottom bar |

## MeetingViewControllerDataSource protocol

Implement this protocol to provide custom UI sections within the meeting screen.

| Method                           | Return Type           | Description                                                     |
| -------------------------------- | --------------------- | --------------------------------------------------------------- |
| getTopbar(viewController:)       | RtkMeetingHeaderView? | Returns a custom header view for the meeting screen             |
| getMiddleView(viewController:)   | UIView?               | Returns a custom middle view between the header and control bar |
| getBottomTabbar(viewController:) | RtkMeetingControlBar? | Returns a custom control bar for the meeting screen             |

## Usage Examples

### Basic Usage

Swift

```

import RealtimeKitUI


let meetingVC = MeetingViewController(

    meeting: rtkClient,

    completion: {

        self.dismiss(animated: true)

    }

)

meetingVC.modalPresentationStyle = .fullScreen

self.present(meetingVC, animated: true)


```

### With custom data source

Swift

```

import RealtimeKitUI


class CustomDataSource: MeetingViewControllerDataSource {

    func getTopbar(viewController: MeetingViewController) -> RtkMeetingHeaderView? {

        return RtkMeetingHeaderView(meeting: rtkClient)

    }


    func getMiddleView(viewController: MeetingViewController) -> UIView? {

        return nil

    }


    func getBottomTabbar(viewController: MeetingViewController) -> RtkMeetingControlBar? {

        return nil

    }

}


let meetingVC = MeetingViewController(

    meeting: rtkClient,

    completion: {

        self.dismiss(animated: true)

    }

)

meetingVC.dataSource = CustomDataSource()

self.present(meetingVC, animated: true)


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/meeting-view-controller/#page","headline":"MeetingViewController · Cloudflare Realtime docs","description":"API reference for MeetingViewController component (iOS Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/meeting-view-controller/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/","name":"iOS"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/meeting-view-controller/","name":"MeetingViewController"}}]}
```
