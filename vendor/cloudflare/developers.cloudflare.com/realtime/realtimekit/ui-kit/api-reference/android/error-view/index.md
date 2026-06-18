---
title: RtkErrorView
description: API reference for RtkErrorView component (Android Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkErrorView

A full-screen error view that displays an error message and a retry button.

## Methods

| Method  | Parameters                                       | Description                                     |
| ------- | ------------------------------------------------ | ----------------------------------------------- |
| refresh | errorMessage: String, onRetryClicked: () -> Unit | Set the error message and retry button callback |

## Usage Examples

### Basic Usage

```

<com.cloudflare.realtimekit.ui.view.RtkErrorView

    android:id="@+id/rtk_error_view"

    android:layout_width="match_parent"

    android:layout_height="match_parent" />


```

### With Methods

Kotlin

```

val errorView = findViewById<RtkErrorView>(R.id.rtk_error_view)

errorView.refresh("Failed to connect") {

    // Retry connection

}


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/error-view/#page","headline":"RtkErrorView · Cloudflare Realtime docs","description":"API reference for RtkErrorView component (Android Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/error-view/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/","name":"Android"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/error-view/","name":"RtkErrorView"}}]}
```
