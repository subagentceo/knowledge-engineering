---
title: RtkJoinButton
description: API reference for RtkJoinButton component (Android Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkJoinButton

A button that performs the room join operation. Displays "Join" by default and changes to "Joining..." during the join process. Automatically disables after a successful join.

## Methods

| Method   | Parameters                                                | Description                                                                                                                                                                                                                                                     |
| -------- | --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| activate | meeting: RealtimeKitClient, localUserNameField: EditText? | Bind the button to the meeting state. Pass an optional EditText reference to validate the display name before joining — if the user has canEditDisplayName permission and the field is blank, the button shows a "Please enter name" toast and blocks the join. |

## Usage Examples

### Basic Usage

```

<com.cloudflare.realtimekit.ui.view.RtkJoinButton

    android:id="@+id/rtk_join_button"

    android:layout_width="wrap_content"

    android:layout_height="48dp"

    app:rtk_btn_variant="primary" />


```

### With Methods

Kotlin

```

val joinButton = findViewById<RtkJoinButton>(R.id.rtk_join_button)

val nameField = findViewById<EditText>(R.id.name_field)

joinButton.activate(meeting, nameField)


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/join-button/#page","headline":"RtkJoinButton · Cloudflare Realtime docs","description":"API reference for RtkJoinButton component (Android Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/join-button/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/","name":"Android"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/join-button/","name":"RtkJoinButton"}}]}
```
