---
title: Stage Management
description: Manage webinar stage access and publish permissions in RealtimeKit meetings.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Stage Management

This guide explains how to use stage management APIs for Webinar (WebRTC) use cases in Cloudflare RealtimeKit.

WebMobile

ReactWeb ComponentsAngular

Instead of a traditional publish-subscribe model, where a user can publish their media and others can choose to subscribe, RealtimeKit comes with an optional managed configuration. In this managed configuration, a less privileged user can be configured with a default behavior to not publish media. The user can then request permission to be allowed to publish their media, where a privileged user can choose to grant or deny access.

Using RealtimeKit's stage management APIs, a user can perform actions such as:

* Leave and join stage
* Manage stage requests and permissions
* Kick participants

## Access the Stage APIs

The stage module can be accessed under the `meeting.stage` namespace.

```

console.log("Stage object:", meeting.stage);


```

TypeScript

```

console.log("Stage object:", meeting.stage);


```

JavaScript

```

console.log("Stage object:", meeting.stage);


```

Kotlin

```

Log.d("Stage", "Stage object: ${meeting.stage}")


```

Swift

```

print("Stage object: \(meeting.stage)")


```

Dart

```

print("Stage object: ${meeting.stage}");


```

```

console.log("Stage object:", meeting.stage);


```

## Properties

### Status

The `meeting.stage.status` property returns the current stage status of the local user.

```

console.log("Stage status:", meeting.stage.status);


```

TypeScript

```

console.log("Stage status:", meeting.stage.status);


```

JavaScript

```

console.log("Stage status:", meeting.stage.status);


```

Kotlin

```

Log.d("Stage", "Stage status: ${meeting.stage.stageStatus}")


```

Swift

```

print("Stage status: \(meeting.stage.stageStatus)")


```

Dart

```

print("Stage status: ${meeting.stage.status}");


```

```

console.log("Stage status:", meeting.stage.status);


```

**Possible status values:**

* **`ON_STAGE`** \- The user is currently on the stage and sharing audio and video.
* **`OFF_STAGE`** \- The user is viewing the session but is not on the stage and is not sharing audio or video.
* **`REQUESTED_TO_JOIN_STAGE`** \- The user has a pending request to join the stage and share audio and video. This status remains until the host accepts or rejects the request.
* **`ACCEPTED_TO_JOIN_STAGE`** \- The host has accepted the user's request to join the stage.

Note

A user with permission to join stage directly can only assume `ON_STAGE` and `ACCEPTED_TO_JOIN_STAGE` status values.

## Host Controls

RealtimeKit's stage management APIs allow hosts to receive and manage stage requests as well as leave and join the stage.

### Join Stage

This method connects the user to the media room, enabling them to interact with other peers in the meeting.

```

await meeting.stage.join();


```

TypeScript

```

await meeting.stage.join();


```

JavaScript

```

await meeting.stage.join();


```

Kotlin

```

meeting.stage.join()


```

Swift

```

meeting.stage.join()


```

Dart

```

meeting.stage.join();


```

```

await meeting.stage.join();


```

### Leave Stage

By employing this method, the user will be disconnected from the media room and subsequently unable to communicate with their peers. Additionally, their audio and video will no longer be visible to others in the room.

```

await meeting.stage.leave();


```

TypeScript

```

await meeting.stage.leave();


```

JavaScript

```

await meeting.stage.leave();


```

Kotlin

```

meeting.stage.leave()


```

Swift

```

meeting.stage.leave()


```

Dart

```

meeting.stage.leave();


```

```

await meeting.stage.leave();


```

### Grant Access

A privileged user can grant access to stage for a set of users with the `grantAccess` method.

```

await meeting.stage.grantAccess(userIds);


```

TypeScript

```

await meeting.stage.grantAccess(userIds);


```

JavaScript

```

await meeting.stage.grantAccess(userIds);


```

Kotlin

```

meeting.stage.grantAccess(userIds)


```

Swift

```

meeting.stage.grantAccess(userIds: userIds)


```

Dart

```

meeting.stage.grantAccess(userIds);


```

```

await meeting.stage.grantAccess(userIds);


```

**Parameters:**

* `userIds` (`string[]`) - Array of user IDs to grant stage access. You can retrieve user IDs using `meeting.participants.toArray().map(p => p.userId)`

* `userIds` (`string[]`) - Array of user IDs to grant stage access. You can retrieve user IDs using `meeting.participants.toArray().map(p => p.userId)`

* `userIds` (`string[]`) - Array of user IDs to grant stage access. You can retrieve user IDs using `meeting.participants.toArray().map(p => p.userId)`

* `userIds` (`List<String>`) - List of user IDs to grant stage access. You can retrieve user IDs using `meeting.participants.map { it.userId }`

* `userIds` (`[String]`) - Array of user IDs to grant stage access. You can retrieve user IDs using `meeting.participants.map { $0.userId }`

* `userIds` (`List<String>`) - List of user IDs to grant stage access. You can retrieve user IDs using `meeting.participants.map((p) => p.userId).toList()`

* `userIds` (`string[]`) - Array of user IDs to grant stage access. You can retrieve user IDs using `meeting.participants.toArray().map(p => p.userId)`

### Deny Access

A privileged user can deny access to stage for a set of users with the `denyAccess` method.

```

await meeting.stage.denyAccess(userIds);


```

TypeScript

```

await meeting.stage.denyAccess(userIds);


```

JavaScript

```

await meeting.stage.denyAccess(userIds);


```

Kotlin

```

meeting.stage.denyAccess(userIds)


```

Swift

```

meeting.stage.denyAccess(userIds: userIds)


```

Dart

```

meeting.stage.denyAccess(userIds);


```

```

await meeting.stage.denyAccess(userIds);


```

**Parameters:**

* `userIds` (`string[]`) - Array of user IDs to deny stage access. You can retrieve user IDs using `meeting.participants.toArray().map(p => p.userId)`

* `userIds` (`string[]`) - Array of user IDs to deny stage access. You can retrieve user IDs using `meeting.participants.toArray().map(p => p.userId)`

* `userIds` (`string[]`) - Array of user IDs to deny stage access. You can retrieve user IDs using `meeting.participants.toArray().map(p => p.userId)`

* `userIds` (`List<String>`) - List of user IDs to deny stage access. You can retrieve user IDs using `meeting.participants.map { it.userId }`

* `userIds` (`[String]`) - Array of user IDs to deny stage access. You can retrieve user IDs using `meeting.participants.map { $0.userId }`

* `userIds` (`List<String>`) - List of user IDs to deny stage access. You can retrieve user IDs using `meeting.participants.map((p) => p.userId).toList()`

* `userIds` (`string[]`) - Array of user IDs to deny stage access. You can retrieve user IDs using `meeting.participants.toArray().map(p => p.userId)`

### Kick Users

A privileged user can remove a set of users from stage using the `kick` method.

```

await meeting.stage.kick(userIds);


```

TypeScript

```

await meeting.stage.kick(userIds);


```

JavaScript

```

await meeting.stage.kick(userIds);


```

Kotlin

```

meeting.stage.kick(userIds)


```

Swift

```

meeting.stage.kick(userIds: userIds)


```

Dart

```

meeting.stage.kick(userIds);


```

```

await meeting.stage.kick(userIds);


```

**Parameters:**

* `userIds` (`string[]`) - Array of user IDs to remove from stage. You can retrieve user IDs using `meeting.participants.toArray().map(p => p.userId)`

* `userIds` (`string[]`) - Array of user IDs to remove from stage. You can retrieve user IDs using `meeting.participants.toArray().map(p => p.userId)`

* `userIds` (`string[]`) - Array of user IDs to remove from stage. You can retrieve user IDs using `meeting.participants.toArray().map(p => p.userId)`

* `userIds` (`List<String>`) - List of user IDs to remove from stage. You can retrieve user IDs using `meeting.participants.map { it.userId }`

* `userIds` (`[String]`) - Array of user IDs to remove from stage. You can retrieve user IDs using `meeting.participants.map { $0.userId }`

* `userIds` (`List<String>`) - List of user IDs to remove from stage. You can retrieve user IDs using `meeting.participants.map((p) => p.userId).toList()`

* `userIds` (`string[]`) - Array of user IDs to remove from stage. You can retrieve user IDs using `meeting.participants.toArray().map(p => p.userId)`

## Participant Controls

RealtimeKit's stage management APIs allow participants to request and manage stage access.

### Request Access

This method is used to create a new stage request which can be approved by the host. Each user (viewer or host) must call this method in order to join the stage.

When the host calls this method, their status will be updated to `ACCEPTED_TO_JOIN_STAGE`.

```

await meeting.stage.requestAccess();


```

TypeScript

```

await meeting.stage.requestAccess();


```

JavaScript

```

await meeting.stage.requestAccess();


```

Kotlin

```

meeting.stage.requestAccess()


```

Swift

```

meeting.stage.requestAccess()


```

Dart

```

meeting.stage.requestAccess();


```

```

await meeting.stage.requestAccess();


```

### Cancel Access Request

You can call this method to cancel your stage request.

```

await meeting.stage.cancelRequestAccess();


```

TypeScript

```

await meeting.stage.cancelRequestAccess();


```

JavaScript

```

await meeting.stage.cancelRequestAccess();


```

Kotlin

```

meeting.stage.cancelRequestAccess()


```

Swift

```

meeting.stage.cancelRequestAccess()


```

Dart

```

meeting.stage.cancelRequestAccess();


```

```

await meeting.stage.cancelRequestAccess();


```

## Events

The `meeting.stage` module emits the following events:

### Stage Access Requests Updated

Emitted when there is an update to stage access requests.

```

meeting.stage.on("stageAccessRequestUpdate", (data) => {

  console.log("Stage access request updated:", data);

});


```

Alternatively, you can use React hooks to listen for stage updates:

```

import { useRealtimeKitSelector } from "@cloudflare/realtimekit-react";


// useRealtimeKitSelector hook only works when `RealtimeKitProvider` is used.

const stageStatus = useRealtimeKitSelector((m) => m.stage.status);


```

TypeScript

```

meeting.stage.on("stageAccessRequestUpdate", (data) => {

  console.log("Stage access request updated:", data);

});


```

JavaScript

```

meeting.stage.on("stageAccessRequestUpdate", (data) => {

  console.log("Stage access request updated:", data);

});


```

Kotlin

```

meeting.addStageEventListener(object : RtkStageEventListener {

  override fun onStageAccessRequestsUpdated(accessRequests: List<RtkRemoteParticipant>) {

    // Stage access requests list updated

    Log.d("Stage", "Access requests updated: ${accessRequests.size}")

  }

})


```

Swift

```

extension WebinarViewModel: RtkStageEventListener {

  func onStageAccessRequestsUpdated(accessRequests: [RtkRemoteParticipant]) {

    // Stage access requests list updated

    print("Access requests updated: \(accessRequests.count)")

  }

}


```

Dart

```

class StageEventListener extends RtkStageEventListener {

  @override

  void onStageAccessRequestsUpdated(List<RtkRemoteParticipant> accessRequests) {

    // Stage access requests list updated

    print("Access requests updated: ${accessRequests.length}");

  }

}


meeting.addStageEventListener(StageEventListener());


```

```

meeting.stage.on("stageAccessRequestUpdate", (data) => {

  console.log("Stage access request updated:", data);

});


```

Alternatively, you can use React hooks to listen for stage updates:

```

import { useRealtimeKitSelector } from "@cloudflare/realtimekit-react-native";


// useRealtimeKitSelector hook only works when `RealtimeKitProvider` is used.

const stageStatus = useRealtimeKitSelector((m) => m.stage.status);


```

### Stage Access Request Accepted

Emitted when the host accepts the join stage request or invites a user directly to stage.

```

meeting.stage.on("acceptPresentRequests", (data) => {

  console.log("Present requests accepted:", data);

});


```

TypeScript

```

meeting.stage.on("acceptPresentRequests", (data) => {

  console.log("Present requests accepted:", data);

});


```

JavaScript

```

meeting.stage.on("acceptPresentRequests", (data) => {

  console.log("Present requests accepted:", data);

});


```

Kotlin

```

meeting.addStageEventListener(object : RtkStageEventListener {

  override fun onStageAccessRequestAccepted() {

    // Host accepted the join stage request or invited user directly to stage

    Log.d("Stage", "Access request accepted")

  }

})


```

Swift

```

extension WebinarViewModel: RtkStageEventListener {

  func onStageAccessRequestAccepted() {

    // Host accepted the join stage request or invited user directly to stage

    print("Access request accepted")

  }

}


```

Dart

```

class StageEventListener extends RtkStageEventListener {

  @override

  void onStageAccessRequestAccepted() {

    // Host accepted the join stage request or invited user directly to stage

    print("Access request accepted");

  }

}


meeting.addStageEventListener(StageEventListener());


```

```

meeting.stage.on("acceptPresentRequests", (data) => {

  console.log("Present requests accepted:", data);

});


```

### Stage Status Updated

Emitted when the local user's stage status changes.

```

meeting.stage.on("stageStatusUpdate", (status) => {

  console.log("Stage status updated:", status);

});


```

TypeScript

```

meeting.stage.on("stageStatusUpdate", (status) => {

  console.log("Stage status updated:", status);

});


```

JavaScript

```

meeting.stage.on("stageStatusUpdate", (status) => {

  console.log("Stage status updated:", status);

});


```

Kotlin

```

meeting.addStageEventListener(object : RtkStageEventListener {

  override fun onStageStatusUpdated(oldStatus: StageStatus, newStatus: StageStatus) {

    // Local user's stage status changed

    Log.d("Stage", "Status updated from $oldStatus to $newStatus")

  }

})


```

Swift

```

extension WebinarViewModel: RtkStageEventListener {

  func onStageStatusUpdated(oldStatus: StageStatus, newStatus: StageStatus) {

    // Local user's stage status changed

    print("Status updated from \(oldStatus) to \(newStatus)")

  }

}


```

Dart

```

class StageEventListener extends RtkStageEventListener {

  @override

  void onStageStatusUpdated(StageStatus oldStatus, StageStatus newStatus) {

    // Local user's stage status changed

    print("Status updated from $oldStatus to $newStatus");

  }

}


meeting.addStageEventListener(StageEventListener());


```

```

meeting.stage.on("stageStatusUpdate", (status) => {

  console.log("Stage status updated:", status);

});


```

### New Stage Request

Emitted when a new participant requests to join the stage.

```

meeting.stage.on("newStageRequest", (request) => {

  console.log("New stage request:", request);

});


```

TypeScript

```

meeting.stage.on("newStageRequest", (request) => {

  console.log("New stage request:", request);

});


```

JavaScript

```

meeting.stage.on("newStageRequest", (request) => {

  console.log("New stage request:", request);

});


```

Kotlin

```

meeting.addStageEventListener(object : RtkStageEventListener {

  override fun onNewStageAccessRequest(participant: RtkRemoteParticipant) {

    // New participant requested to join the stage

    Log.d("Stage", "New stage request from: ${participant.name}")

  }

})


```

Swift

```

extension WebinarViewModel: RtkStageEventListener {

  func onNewStageAccessRequest(participant: RtkRemoteParticipant) {

    // New participant requested to join the stage

    print("New stage request from: \(participant.name)")

  }

}


```

Dart

```

class StageEventListener extends RtkStageEventListener {

  @override

  void onNewStageAccessRequest(RtkRemoteParticipant participant) {

    // New participant requested to join the stage

    print("New stage request from: ${participant.name}");

  }

}


meeting.addStageEventListener(StageEventListener());


```

```

meeting.stage.on("newStageRequest", (request) => {

  console.log("New stage request:", request);

});


```

### Stage Request Approved

Emitted when a stage request is approved by the host.

```

meeting.stage.on("stageRequestApproved", (data) => {

  console.log("Stage request approved:", data);

});


```

TypeScript

```

meeting.stage.on("stageRequestApproved", (data) => {

  console.log("Stage request approved:", data);

});


```

JavaScript

```

meeting.stage.on("stageRequestApproved", (data) => {

  console.log("Stage request approved:", data);

});


```

Kotlin

```

meeting.addStageEventListener(object : RtkStageEventListener {

  override fun onStageAccessRequestAccepted() {

    // Host accepted the join stage request or invited user directly to stage

    Log.d("Stage", "Stage request approved")

  }

})


```

Swift

```

extension WebinarViewModel: RtkStageEventListener {

  func onStageAccessRequestAccepted() {

    // Host accepted the join stage request or invited user directly to stage

    print("Stage request approved")

  }

}


```

Dart

```

class StageEventListener extends RtkStageEventListener {

  @override

  void onStageAccessRequestAccepted() {

    // Host accepted the join stage request or invited user directly to stage

    print("Stage request approved");

  }

}


meeting.addStageEventListener(StageEventListener());


```

```

meeting.stage.on("stageRequestApproved", (data) => {

  console.log("Stage request approved:", data);

});


```

### Stage Request Rejected

Emitted when the host rejects a stage request.

```

meeting.stage.on("stageRequestRejected", (data) => {

  console.log("Stage request rejected:", data);

});


```

TypeScript

```

meeting.stage.on("stageRequestRejected", (data) => {

  console.log("Stage request rejected:", data);

});


```

JavaScript

```

meeting.stage.on("stageRequestRejected", (data) => {

  console.log("Stage request rejected:", data);

});


```

Kotlin

```

meeting.addStageEventListener(object : RtkStageEventListener {

  override fun onStageAccessRequestRejected() {

    // Host rejected the join stage request

    Log.d("Stage", "Stage request rejected")

  }

})


```

Swift

```

extension WebinarViewModel: RtkStageEventListener {

  func onStageAccessRequestRejected() {

    // Host rejected the join stage request

    print("Stage request rejected")

  }

}


```

Dart

```

class StageEventListener extends RtkStageEventListener {

  @override

  void onStageAccessRequestRejected() {

    // Host rejected the join stage request

    print("Stage request rejected");

  }

}


meeting.addStageEventListener(StageEventListener());


```

```

meeting.stage.on("stageRequestRejected", (data) => {

  console.log("Stage request rejected:", data);

});


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/stage-management/#page","headline":"Stage Management · Cloudflare Realtime docs","description":"Manage webinar stage access and publish permissions in RealtimeKit meetings.","url":"https://developers.cloudflare.com/realtime/realtimekit/core/stage-management/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/core/","name":"Build using Core SDK"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/core/stage-management/","name":"Stage Management"}}]}
```
