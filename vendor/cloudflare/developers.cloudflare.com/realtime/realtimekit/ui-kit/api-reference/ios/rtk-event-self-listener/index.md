---
title: RtkEventSelfListener
description: API reference for RtkEventSelfListener component (iOS Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkEventSelfListener

A helper class that wraps self-participant and meeting event listeners with closure-based callbacks. Provides methods for toggling audio and video, observing state changes, and checking device permissions.

## Initializer parameters

| Parameter  | Type              | Required | Default   | Description                                    |
| ---------- | ----------------- | -------- | --------- | ---------------------------------------------- |
| rtkClient  | RealtimeKitClient | ✅        | \-        | The RealtimeKit client instance                |
| identifier | String            | ❌        | "Default" | A unique identifier for this listener instance |

## Methods

| Method                                   | Return Type | Description                                                          |
| ---------------------------------------- | ----------- | -------------------------------------------------------------------- |
| toggleLocalAudio(completion:)            | Void        | Toggles the local microphone on or off                               |
| toggleLocalVideo(completion:)            | Void        | Toggles the local camera on or off                                   |
| observeSelfVideo(update:)                | Void        | Registers a callback for local video state changes                   |
| observeSelfAudio(update:)                | Void        | Registers a callback for local audio state changes                   |
| observeSelfRemoved(update:)              | Void        | Registers a callback for when the local participant is removed       |
| observeSelfMeetingEndForAll(update:)     | Void        | Registers a callback for when the meeting ends for all participants  |
| observeWebinarStageStatus(update:)       | Void        | Registers a callback for webinar stage status changes                |
| observeRequestToJoinStage(update:)       | Void        | Registers a callback for stage join request events                   |
| observeSelfPermissionChanged(update:)    | Void        | Registers a callback for permission changes on the local participant |
| observeMeetingReconnectionState(update:) | Void        | Registers a callback for meeting reconnection state changes          |
| isCameraPermissionGranted()              | Bool        | Returns whether camera permission is granted                         |
| isMicrophonePermissionGranted()          | Bool        | Returns whether microphone permission is granted                     |
| clean()                                  | Void        | Removes all registered listeners and cleans up resources             |

## Usage Examples

### Basic Usage

Swift

```

import RealtimeKitUI


let listener = RtkEventSelfListener(rtkClient: rtkClient)


listener.observeSelfAudio { isEnabled in

    print("Audio enabled: \(isEnabled)")

}


listener.observeSelfVideo { isEnabled in

    print("Video enabled: \(isEnabled)")

}


```

### Toggle audio and video

Swift

```

import RealtimeKitUI


let listener = RtkEventSelfListener(rtkClient: rtkClient)


listener.toggleLocalAudio { success in

    print("Audio toggled: \(success)")

}


listener.toggleLocalVideo { success in

    print("Video toggled: \(success)")

}


```

### Observe meeting end

Swift

```

import RealtimeKitUI


let listener = RtkEventSelfListener(

    rtkClient: rtkClient,

    identifier: "MeetingObserver"

)


listener.observeSelfRemoved {

    print("Removed from meeting")

}


listener.observeSelfMeetingEndForAll {

    print("Meeting ended for all")

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-event-self-listener/#page","headline":"RtkEventSelfListener · Cloudflare Realtime docs","description":"API reference for RtkEventSelfListener component (iOS Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-event-self-listener/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/","name":"iOS"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/rtk-event-self-listener/","name":"RtkEventSelfListener"}}]}
```
