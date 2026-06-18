---
title: RtkMeetingTitleLabel
description: API reference for RtkMeetingTitleLabel component (iOS Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkMeetingTitleLabel

A label that displays the meeting title from the meeting metadata.

## Initializer parameters

| Parameter  | Type              | Required | Default                                | Description                                            |
| ---------- | ----------------- | -------- | -------------------------------------- | ------------------------------------------------------ |
| meeting    | RealtimeKitClient | ✅        | \-                                     | The RealtimeKit client instance for the active meeting |
| appearance | RtkTextAppearance | ❌        | AppTheme.shared.meetingTitleAppearance | Text appearance configuration for font and color       |

## Usage Examples

### Basic Usage

Swift

```

import RealtimeKitUI


let titleLabel = RtkMeetingTitleLabel(meeting: rtkClient)

view.addSubview(titleLabel)


```

### With custom appearance

Swift

```

import RealtimeKitUI


let appearance = RtkTextAppearance(

    font: UIFont.systemFont(ofSize: 18, weight: .bold),

    textColor: .white

)

let titleLabel = RtkMeetingTitleLabel(

    meeting: rtkClient,

    appearance: appearance

)

view.addSubview(titleLabel)


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-meeting-title-label/#page","headline":"RtkMeetingTitleLabel · Cloudflare Realtime docs","description":"API reference for RtkMeetingTitleLabel component (iOS Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-meeting-title-label/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/","name":"iOS"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/rtk-meeting-title-label/","name":"RtkMeetingTitleLabel"}}]}
```
