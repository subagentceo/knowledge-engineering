---
title: RtkMeetingOptionBottomSheet
description: API reference for RtkMeetingOptionBottomSheet component (Android Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkMeetingOptionBottomSheet

A bottom sheet shown when tapping the more button. Contains options for participants, chat, polls, plugins, recording, screen share, mute all, and settings.

## Methods

| Method | Parameters                                     | Description                              |
| ------ | ---------------------------------------------- | ---------------------------------------- |
| show   | fragmentManager: FragmentManager, tag: String? | Display the meeting options bottom sheet |

## Usage Examples

### Basic Usage

Kotlin

```

val meetingOptions = RtkMeetingOptionBottomSheet()

meetingOptions.show(fragmentManager, "MEETING_OPTIONS_TAG")


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/meeting-option-bottomsheet/#page","headline":"RtkMeetingOptionBottomSheet · Cloudflare Realtime docs","description":"API reference for RtkMeetingOptionBottomSheet component (Android Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/android/meeting-option-bottomsheet/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/","name":"Android"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/android/meeting-option-bottomsheet/","name":"RtkMeetingOptionBottomSheet"}}]}
```
