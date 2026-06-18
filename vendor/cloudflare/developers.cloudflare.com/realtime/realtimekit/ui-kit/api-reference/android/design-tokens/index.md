---
title: RtkDesignTokens
description: API reference for RtkDesignTokens component (Android Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkDesignTokens

The top-level design token container for customizing the look and feel of all UI Kit components.

## Properties

| Property     | Type                 | Required | Default | Description         |
| ------------ | -------------------- | -------- | ------- | ------------------- |
| colors       | RtkColorTokens       | ❌        | \-      | Color theme tokens  |
| borderWidth  | RtkBorderWidthToken  | ❌        | \-      | Border width token  |
| borderRadius | RtkBorderRadiusToken | ❌        | \-      | Border radius token |

## Usage Examples

### Basic Usage

Kotlin

```

val designTokens = RtkDesignTokens(

    colors = RtkColorTokens(

        brand = BrandColor(

            shade300 = Color.parseColor("#497CFD"),

            shade400 = Color.parseColor("#356EFD"),

            shade500 = Color.parseColor("#2160FD"),

            shade600 = Color.parseColor("#0D52FD"),

            shade700 = Color.parseColor("#0046E5")

        ),

        background = BackgroundColor(

            shade600 = Color.parseColor("#2C2C2C"),

            shade700 = Color.parseColor("#242424"),

            shade800 = Color.parseColor("#1C1C1C"),

            shade900 = Color.parseColor("#141414"),

            shade1000 = Color.parseColor("#0C0C0C")

        )

    ),

    borderRadius = RtkBorderRadiusToken.Rounded,

    borderWidth = RtkBorderWidthToken.Thin

)


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/design-tokens/#page","headline":"RtkDesignTokens · Cloudflare Realtime docs","description":"API reference for RtkDesignTokens component (Android Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/design-tokens/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/","name":"Android"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/design-tokens/","name":"RtkDesignTokens"}}]}
```
