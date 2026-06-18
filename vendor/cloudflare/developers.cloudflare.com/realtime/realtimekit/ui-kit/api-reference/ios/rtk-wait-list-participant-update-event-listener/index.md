---
title: RtkWaitListParticipantUpdateEventListener
description: API reference for RtkWaitListParticipantUpdateEventListener component (iOS Library)
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# RtkWaitListParticipantUpdateEventListener

A helper class for listening to waitlist participant events. Provides callbacks for join, remove, accept, and reject events, and methods for managing waitlist requests.

## Initializer parameters

| Parameter | Type              | Required | Default | Description                     |
| --------- | ----------------- | -------- | ------- | ------------------------------- |
| rtkClient | RealtimeKitClient | ✅        | \-      | The RealtimeKit client instance |

## Callback properties

| Property                             | Type          | Required | Default | Description                                            |
| ------------------------------------ | ------------- | -------- | ------- | ------------------------------------------------------ |
| participantJoinedCompletion          | (() -> Void)? | ❌        | nil     | Called when a participant joins the waitlist           |
| participantRemovedCompletion         | (() -> Void)? | ❌        | nil     | Called when a participant is removed from the waitlist |
| participantRequestAcceptedCompletion | (() -> Void)? | ❌        | nil     | Called when a waitlist request is accepted             |
| participantRequestRejectCompletion   | (() -> Void)? | ❌        | nil     | Called when a waitlist request is rejected             |

## Methods

| Method                             | Return Type | Description                                              |
| ---------------------------------- | ----------- | -------------------------------------------------------- |
| acceptWaitingRequest(participant:) | Void        | Accepts a participant's waitlist request                 |
| rejectWaitingRequest(participant:) | Void        | Rejects a participant's waitlist request                 |
| clean()                            | Void        | Removes all registered listeners and cleans up resources |

## Usage Examples

### Basic Usage

Swift

```

import RealtimeKitUI


let waitlistListener = RtkWaitListParticipantUpdateEventListener(

    rtkClient: rtkClient

)


waitlistListener.participantJoinedCompletion = {

    print("New participant in waitlist")

}


waitlistListener.participantRemovedCompletion = {

    print("Participant removed from waitlist")

}


```

### Accept or reject requests

Swift

```

import RealtimeKitUI


let waitlistListener = RtkWaitListParticipantUpdateEventListener(

    rtkClient: rtkClient

)


// Accept a waiting participant

waitlistListener.acceptWaitingRequest(participant: waitingParticipant)


// Reject a waiting participant

waitlistListener.rejectWaitingRequest(participant: waitingParticipant)


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-wait-list-participant-update-event-listener/#page","headline":"RtkWaitListParticipantUpdateEventListener · Cloudflare Realtime docs","description":"API reference for RtkWaitListParticipantUpdateEventListener component (iOS Library)","url":"https://developers.cloudflare.com/realtime/realtimekit/ui-kit/api-reference/ios/rtk-wait-list-participant-update-event-listener/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/ui-kit/","name":"Build using UI Kit"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/","name":"Component Reference"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/","name":"iOS"}},{"@type":"ListItem","position":7,"item":{"@id":"/realtime/realtimekit/ui-kit/api-reference/ios/rtk-wait-list-participant-update-event-listener/","name":"RtkWaitListParticipantUpdateEventListener"}}]}
```
