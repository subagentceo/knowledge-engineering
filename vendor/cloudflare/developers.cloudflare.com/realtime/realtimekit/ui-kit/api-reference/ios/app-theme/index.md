---
title: AppTheme
description: API reference for AppTheme component (iOS Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# AppTheme

The application theme singleton that provides pre-configured appearance objects for UI components. Use `AppTheme.shared` to access default appearances or call `setUp(theme:)` to apply a custom theme.

## Access

Swift

```

let theme = AppTheme.shared


```

## Methods

| Method                         | Return Type | Description                                           |
| ------------------------------ | ----------- | ----------------------------------------------------- |
| setUp(theme: AppThemeProtocol) | Void        | Applies a custom theme conforming to AppThemeProtocol |

## Usage Examples

### Access default theme

Swift

```

import RealtimeKitUI


let theme = AppTheme.shared

let titleAppearance = theme.meetingTitleAppearance

let clockAppearance = theme.clockViewAppearance


```

### Apply a custom theme

Swift

```

import RealtimeKitUI


class CustomTheme: AppThemeProtocol {

    // Implement required appearance properties

}


let customTheme = CustomTheme()

AppTheme.shared.setUp(theme: customTheme)


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/app-theme/#page","headline":"AppTheme · Cloudflare Realtime docs","description":"API reference for AppTheme component (iOS Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/app-theme/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/","name":"iOS"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/app-theme/","name":"AppTheme"}}]}
```
