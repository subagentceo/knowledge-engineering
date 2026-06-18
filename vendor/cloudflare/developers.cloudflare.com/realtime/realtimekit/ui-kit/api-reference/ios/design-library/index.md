---
title: DesignLibrary
description: API reference for DesignLibrary component (iOS Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# DesignLibrary

The central design token library providing color, spacing, border width, and border radius tokens. Access through the `DesignLibrary.shared` singleton.

## Access

Swift

```

let designLibrary = DesignLibrary.shared


```

## Properties

| Property     | Type              | Required | Default | Description                                          |
| ------------ | ----------------- | -------- | ------- | ---------------------------------------------------- |
| color        | ColorTokens       | \-       | \-      | Color tokens for backgrounds, text, and brand colors |
| space        | SpaceToken        | \-       | \-      | Spacing tokens for margins and padding               |
| borderSize   | BorderWidthToken  | \-       | \-      | Border width tokens                                  |
| borderRadius | BorderRadiusToken | \-       | \-      | Border radius tokens for corner rounding             |

## Usage Examples

### Access design tokens

Swift

```

import RealtimeKitUI


let designLibrary = DesignLibrary.shared


// Access color tokens

let backgroundColor = designLibrary.color.background

let textColor = designLibrary.color.text


// Access spacing tokens

let padding = designLibrary.space.space4


// Access border tokens

let borderWidth = designLibrary.borderSize.thin

let cornerRadius = designLibrary.borderRadius.rounded


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/design-library/#page","headline":"DesignLibrary · Cloudflare Realtime docs","description":"API reference for DesignLibrary component (iOS Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/design-library/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/","name":"iOS"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/design-library/","name":"DesignLibrary"}}]}
```
