---
title: GridView
description: API reference for GridView component (iOS Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# GridView

A generic grid layout view that arranges child views in a responsive grid. Supports both portrait and landscape orientations with configurable maximum item count.

## Initializer parameters

| Parameter        | Type                              | Required | Default | Description                                                      |
| ---------------- | --------------------------------- | -------- | ------- | ---------------------------------------------------------------- |
| maxItems         | UInt                              | ❌        | 9       | Maximum number of items the grid can display                     |
| showingCurrently | UInt                              | ✅        | \-      | Number of items currently visible in the grid                    |
| getChildView     | @escaping () -> CellContainerView | ✅        | \-      | Factory closure that creates a new child view for each grid cell |

## Methods

| Method                                                            | Return Type        | Description                                                           |
| ----------------------------------------------------------------- | ------------------ | --------------------------------------------------------------------- |
| settingFrames(visibleItemCount:animation:completion:)             | Void               | Lays out child views in portrait orientation with optional animation  |
| settingFramesForLandScape(visibleItemCount:animation:completion:) | Void               | Lays out child views in landscape orientation with optional animation |
| childView(index:)                                                 | CellContainerView? | Returns the child view at the specified index                         |
| prepareForReuse(childView:)                                       | Void               | Prepares a child view for reuse                                       |

## Usage Examples

### Basic Usage

Swift

```

import RealtimeKitUI


let gridView = GridView(

    maxItems: 6,

    showingCurrently: 4,

    getChildView: {

        return CellContainerView()

    }

)

view.addSubview(gridView)


```

### Update layout

Swift

```

import RealtimeKitUI


let gridView = GridView(

    maxItems: 9,

    showingCurrently: 3,

    getChildView: {

        return CellContainerView()

    }

)

view.addSubview(gridView)


// Update layout with animation

gridView.settingFrames(

    visibleItemCount: 4,

    animation: true,

    completion: {

        print("Layout updated")

    }

)


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/grid-view/#page","headline":"GridView · Cloudflare Realtime docs","description":"API reference for GridView component (iOS Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/grid-view/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/","name":"iOS"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/grid-view/","name":"GridView"}}]}
```
