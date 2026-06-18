---
title: RtkSetupViewController
description: API reference for RtkSetupViewController component (iOS Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkSetupViewController

Pre-meeting setup screen view controller. Provides video preview, audio and video toggles, and name entry before joining a meeting.

## Initializer parameters

| Parameter   | Type                 | Required | Default | Description                                              |
| ----------- | -------------------- | -------- | ------- | -------------------------------------------------------- |
| meetingInfo | RtkMeetingInfo       | ✅        | \-      | Meeting configuration with auth token and media settings |
| meeting     | RealtimeKitClient    | ✅        | \-      | The RealtimeKit client instance                          |
| completion  | @escaping () -> Void | ✅        | \-      | Closure called when setup completes                      |

## Properties

| Property | Type                         | Required | Default | Description                                              |
| -------- | ---------------------------- | -------- | ------- | -------------------------------------------------------- |
| delegate | SetupViewControllerDelegate? | ❌        | nil     | Delegate notified when the participant joins the meeting |

## Usage Examples

### Basic Usage

Swift

```

import RealtimeKitUI


let setupVC = RtkSetupViewController(

    meetingInfo: meetingInfo,

    meeting: rtkClient,

    completion: {

        print("Setup complete")

    }

)

self.present(setupVC, animated: true)


```

### With delegate

Swift

```

import RealtimeKitUI


class ViewController: UIViewController, SetupViewControllerDelegate {

    func showSetupScreen() {

        let setupVC = RtkSetupViewController(

            meetingInfo: meetingInfo,

            meeting: rtkClient,

            completion: {

                self.dismiss(animated: true)

            }

        )

        setupVC.delegate = self

        self.present(setupVC, animated: true)

    }

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-setup-view-controller/#page","headline":"RtkSetupViewController · Cloudflare Realtime docs","description":"API reference for RtkSetupViewController component (iOS Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-setup-view-controller/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/","name":"iOS"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/rtk-setup-view-controller/","name":"RtkSetupViewController"}}]}
```
