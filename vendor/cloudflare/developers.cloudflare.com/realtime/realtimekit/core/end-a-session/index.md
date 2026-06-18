---
title: End a session
description: End a RealtimeKit session for all participants and stop active recordings.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# End a session

Prerequisites

Ensure your participant's preset has the **Kick Participants** (`kick_participant`) host permission enabled.

To end the current [session](https://developers.cloudflare.com/realtime/realtimekit/concepts/meeting/#session/) for all participants, remove all participants using `kickAll()`. This stops any ongoing recording for that session and sets the session status to `ENDED`.

Ending a session is different from leaving a meeting. Leaving disconnects only the current participant. The session remains active if other participants are still present.

## Steps

WebMobile

ReactWeb ComponentsAngular

1. Check that the local participant has permission to remove participants.  
TypeScript  
```  
const canEndSession = meeting.self.permissions.kickParticipant === true;  
if (!canEndSession) {  
  // Disable the "End meeting/session" control in your UI.  
  // You can also show a message to explain why the action is not available.  
}  
```  
TypeScript  
```  
const canEndSession = meeting.self.permissions.kickParticipant === true;  
if (!canEndSession) {  
  // Disable the "End meeting/session" control in your UI.  
  // You can also show a message to explain why the action is not available.  
}  
```  
TypeScript  
```  
const canEndSession = meeting.self.permissions.kickParticipant === true;  
if (!canEndSession) {  
  // Disable the "End meeting/session" control in your UI.  
  // You can also show a message to explain why the action is not available.  
}  
```  
Kotlin  
```  
val canEndSession = meeting.localUser.permissions.host.canKickParticipant  
if (!canEndSession) {  
    // Disable the "End meeting/session" control in your UI.  
    // You can also show a message to explain why the action is not available.  
}  
```  
Swift  
```  
let canEndSession = meeting.localUser.permissions.host.canKickParticipant  
if !canEndSession {  
    // Disable the "End meeting/session" control in your UI.  
    // You can also show a message to explain why the action is not available.  
}  
```  
Dart  
```  
final canEndSession = meeting.localUser.permissions.host.canKickParticipant;  
if (!canEndSession) {  
  // Disable the "End meeting/session" control in your UI.  
  // You can also show a message to explain why the action is not available.  
}  
```  
JavaScript  
```  
const canEndSession = meeting.self.permissions.kickParticipant === true;  
if (!canEndSession) {  
  // Disable the "End meeting/session" control in your UI.  
  // You can also show a message to explain why the action is not available.  
}  
```
2. End the session by removing all participants.  
If the participant does not have the required permission, `kickAll()` throws a ClientError with error code `1201`.  
TypeScript  
```  
try {  
  await meeting.participants.kickAll();  
} catch (err) {  
  if (err?.code === 1201) {  
    // The participant does not have permission to end the session.  
    // Update your UI to indicate that the action is not allowed.  
    return;  
  }  
  throw err;  
}  
```  
If the participant does not have the required permission, `kickAll()` throws a ClientError with error code `1201`.  
TypeScript  
```  
try {  
  await meeting.participants.kickAll();  
} catch (err) {  
  if (err?.code === 1201) {  
    // The participant does not have permission to end the session.  
    // Update your UI to indicate that the action is not allowed.  
    return;  
  }  
  throw err;  
}  
```  
If the participant does not have the required permission, `kickAll()` throws a ClientError with error code `1201`.  
TypeScript  
```  
try {  
  await meeting.participants.kickAll();  
} catch (err) {  
  if (err?.code === 1201) {  
    // The participant does not have permission to end the session.  
    // Update your UI to indicate that the action is not allowed.  
    return;  
  }  
  throw err;  
}  
```  
If the participant does not have the required permission, `kickAll()` returns a `HostError`.  
Kotlin  
```  
val error: HostError? = meeting.participants.kickAll()  
if (error != null) {  
    when (error) {  
        is HostError.KickPermissionDenied -> {  
            // The participant does not have permission to end the session.  
            // Update your UI to indicate that the action is not allowed.  
        }  
    }  
} else {  
    // Successfully initiated session end  
}  
```  
If the participant does not have the required permission, `kickAll()` returns a `HostError`.  
Swift  
```  
let error: HostError? = meeting.participants.kickAll()  
if let error = error {  
    switch error {  
    case .kickPermissionDenied:  
        // The participant does not have permission to end the session.  
        // Update your UI to indicate that the action is not allowed.  
        break  
    default:  
        break  
    }  
} else {  
    // Successfully initiated session end  
}  
```  
Dart  
```  
meeting.participants.kickAll(onResult: (error) {  
  if (error != null) {  
    // The participant does not have permission to end the session.  
    // Update your UI to indicate that the action is not allowed.  
  } else {  
    // Successfully initiated session end  
  }  
});  
```  
If the participant does not have the required permission, `kickAll()` throws a ClientError with error code `1201`.  
JavaScript  
```  
try {  
  await meeting.participants.kickAll();  
} catch (err) {  
  if (err?.code === 1201) {  
    // The participant does not have permission to end the session.  
    // Update your UI to indicate that the action is not allowed.  
    return;  
  }  
  throw err;  
}  
```
3. Listen for the session end event.  
When the session ends, all participants leave the session. The SDK emits a `roomLeft` event with `state` set to `ended`.  
TypeScript  
```  
meeting.self.on("roomLeft", ({ state }) => {  
  if (state === "ended") {  
    // Update your UI to show that the meeting session has ended.  
  }  
});  
```  
When the session ends, all participants leave the session. The SDK emits a `roomLeft` event with `state` set to `ended`.  
TypeScript  
```  
meeting.self.on("roomLeft", ({ state }) => {  
  if (state === "ended") {  
    // Update your UI to show that the meeting session has ended.  
  }  
});  
```  
When the session ends, all participants leave the session. The SDK emits a `roomLeft` event with `state` set to `ended`.  
TypeScript  
```  
meeting.self.on("roomLeft", ({ state }) => {  
  if (state === "ended") {  
    // Update your UI to show that the meeting session has ended.  
  }  
});  
```  
When the session ends, all participants leave the session. You can subscribe to the event listeners to handle the session end.  
Kotlin  
```  
meeting.addMeetingRoomEventListener(object : RtkMeetingRoomEventListener {  
    override fun onMeetingEnded() {  
        // Update your UI to show that the meeting session has ended.  
    }  
})  
```  
When the session ends, all participants leave the session. You can subscribe to the event listeners to handle the session end.  
Swift  
```  
// Implement the delegate method  
extension MeetingViewModel: RtkMeetingRoomEventListener {  
  func onMeetingEnded() {  
      // Update your UI to show that the meeting session has ended.  
  }  
}  
meeting.addMeetingRoomEventListener(self)  
```  
When the session ends, all participants leave the session. You can subscribe to the event listeners to handle the session end.  
Dart  
```  
class MeetingRoomListener extends RtkMeetingRoomEventListener {  
  @override  
  void onMeetingEnded() {  
    // Update your UI to show that the meeting session has ended.  
  }  
}  
// Add the listener  
meeting.addMeetingRoomEventListener(MeetingRoomListener());  
```  
When the session ends, all participants leave the session. The SDK emits a `roomLeft` event with `state` set to `ended`.  
JavaScript  
```  
meeting.self.on("roomLeft", ({ state }) => {  
  if (state === "ended") {  
    // Update your UI to show that the meeting session has ended.  
  }  
});  
```

You can also end a session from your backend by removing all participants using the [Kick all participants](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/active-session/methods/kick%5Fall%5Fparticipants/) API.

## End a session from your backend

### Remove all participants with the API

Use the [Kick all participants](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/active-session/methods/kick%5Fall%5Fparticipants/) API method to remove all participants from an active session for a meeting.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Realtime Admin`
* `Realtime`

Kick all participants

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/meetings/$MEETING_ID/active-session/kick-all" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

### Listen for session end events with webhooks

Register a webhook that subscribes to `meeting.ended`. RealtimeKit sends this event when the session ends. You can use it to trigger backend workflows, such as sending a notification, generating a report, or updating session records in your database.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Realtime Admin`
* `Realtime`

Add a webhook

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/webhooks" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "name": "Session ended webhook",

    "url": "<YOUR_WEBHOOK_URL>",

    "events": [

        "meeting.ended"

    ]

  }'


```

## Disable a meeting

Ending a session does not disable the meeting. Participants can join the meeting again and start a new session. To prevent participants from joining again and starting a new session, set the meeting status to `INACTIVE` using the [Update a meeting](https://developers.cloudflare.com/api/resources/realtime%5Fkit/subresources/meetings/methods/update%5Fmeeting%5Fby%5Fid/) API.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Realtime Admin`
* `Realtime`

Update a meeting

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/meetings/$MEETING_ID" \

  --request PATCH \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "status": "INACTIVE"

  }'


```

## Next steps

* Review how presets control permissions in [Preset](https://developers.cloudflare.com/realtime/realtimekit/concepts/preset/).
* Review the possible values of the local participant room state in [Local Participant](https://developers.cloudflare.com/realtime/realtimekit/core/local-participant/#state-properties/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/end-a-session/#page","headline":"End a session · Cloudflare Realtime docs","description":"End a RealtimeKit session for all participants and stop active recordings.","url":"https://developers.cloudflare.com/realtime/realtimekit/core/end-a-session/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/core/","name":"Build using Core SDK"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/core/end-a-session/","name":"End a session"}}]}
```
