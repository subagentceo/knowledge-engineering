---
title: RtkRecordingView
description: API reference for RtkRecordingView component (iOS Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkRecordingView

A blinking recording indicator displayed when the meeting is being recorded. Shows a red dot with configurable text and image.

## Initializer parameters

| Parameter  | Type                       | Required | Default | Description                                            |
| ---------- | -------------------------- | -------- | ------- | ------------------------------------------------------ |
| meeting    | RealtimeKitClient          | ✅        | \-      | The RealtimeKit client instance for the active meeting |
| title      | String                     | ❌        | "Rec"   | Text label displayed next to the recording indicator   |
| image      | RtkImage?                  | ❌        | nil     | Custom image for the recording indicator               |
| appearance | RtkRecordingViewAppearance | ❌        | \-      | Appearance configuration for the recording indicator   |

## Methods

| Method                | Return Type | Description                                                       |
| --------------------- | ----------- | ----------------------------------------------------------------- |
| blinking(start: Bool) | Void        | Starts or stops the blinking animation on the recording indicator |

## Usage Examples

### Basic Usage

Swift

```

import RealtimeKitUI


let recordingView = RtkRecordingView(meeting: rtkClient)

view.addSubview(recordingView)


```

### With custom title

Swift

```

import RealtimeKitUI


let recordingView = RtkRecordingView(

    meeting: rtkClient,

    title: "Recording"

)

view.addSubview(recordingView)


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-recording-view/#page","headline":"RtkRecordingView · Cloudflare Realtime docs","description":"API reference for RtkRecordingView component (iOS Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-recording-view/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/","name":"iOS"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/rtk-recording-view/","name":"RtkRecordingView"}}]}
```
