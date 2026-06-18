---
title: RtkAudioDeviceSelector
description: API reference for RtkAudioDeviceSelector component (Android Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkAudioDeviceSelector

An audio device selector component which can be used to select audio devices.

## Properties

| Property       | Type   | Required | Default | Description       |
| -------------- | ------ | -------- | ------- | ----------------- |
| rtk\_ds\_label | string | ❌        | Audio   | Custom label text |

## Methods

| Method            | Parameters                    | Description                               |
| ----------------- | ----------------------------- | ----------------------------------------- |
| activate          | meeting: RealtimeKitClient    | Bind the selector to the meeting state    |
| disableLabel      | \-                            | Disable the label text above the dropdown |
| applyDesignTokens | designTokens: RtkDesignTokens | Apply custom design tokens for theming    |

## Usage Examples

### Basic Usage

```

<com.cloudflare.realtimekit.ui.view.RtkAudioDeviceSelector

    android:id="@+id/audioSelector"

    app:rtk_ds_label="Audio"

    android:layout_width="0dp"

    android:layout_height="wrap_content" />


```

### With Methods

Kotlin

```

val audioSelector = findViewById<RtkAudioDeviceSelector>(R.id.audioSelector)

audioSelector.activate(meeting)


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/audio-device-selector/#page","headline":"RtkAudioDeviceSelector · Cloudflare Realtime docs","description":"API reference for RtkAudioDeviceSelector component (Android Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/audio-device-selector/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/","name":"Android"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/audio-device-selector/","name":"RtkAudioDeviceSelector"}}]}
```
