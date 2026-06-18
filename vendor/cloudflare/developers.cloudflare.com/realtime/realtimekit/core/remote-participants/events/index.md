---
title: Events
description: Events emitted by RealtimeKit participants for join, leave, pin, and grid changes.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Events

This page provides an overview of the events emitted by `meeting.participants` and related participant maps, which you can use to keep your UI in sync with changes such as participants joining or leaving, pinning updates, active speaker changes, and grid view mode or page changes.

Prerequisites

This page assumes you have already initialized the SDK and understand the meeting object structure. Refer to [Initialize SDK](https://developers.cloudflare.com/realtime/realtimekit/core/) and [Meeting Object Explained](https://developers.cloudflare.com/realtime/realtimekit/core/meeting-object-explained/) if needed.

WebMobile

ReactWeb ComponentsAngular

## Grid events

These events allow you to monitor changes to the grid.

### View mode change

Triggered when the view mode changes between `ACTIVE_GRID` and `PAGINATED`.

JavaScript

```

meeting.participants.on(

  "viewModeChanged",

  ({ viewMode, currentPage, pageCount }) => {

    console.log("view mode changed", viewMode);

  },

);


```

Triggered when the view mode changes between `ACTIVE_GRID` and `PAGINATED`.

```

const viewMode = useRealtimeKitSelector((m) => m.participants.viewMode);


```

Or use event listener:

```

meeting.participants.on(

  "viewModeChanged",

  ({ viewMode, currentPage, pageCount }) => {

    console.log("view mode changed", viewMode);

  },

);


```

This event is not available on this platform.

Triggered when the view mode changes between `ACTIVE_GRID` and `PAGINATED`.

```

const viewMode = useRealtimeKitSelector((m) => m.participants.viewMode);


```

Or use event listener:

```

meeting.participants.on(

  "viewModeChanged",

  ({ viewMode, currentPage, pageCount }) => {

    console.log("view mode changed", viewMode);

  },

);


```

### Page change

Triggered when the page changes in paginated mode.

JavaScript

```

meeting.participants.on(

  "pageChanged",

  ({ viewMode, currentPage, pageCount }) => {

    console.log("page changed", currentPage);

  },

);


```

Triggered when the page changes in paginated mode.

```

const currentPage = useRealtimeKitSelector((m) => m.participants.currentPage);

const pageCount = useRealtimeKitSelector((m) => m.participants.pageCount);


```

This event is not available on this platform.

Triggered when the page changes in paginated mode.

```

const currentPage = useRealtimeKitSelector((m) => m.participants.currentPage);

const pageCount = useRealtimeKitSelector((m) => m.participants.pageCount);


```

### Active speaker

Triggered when a participant starts speaking.

JavaScript

```

meeting.participants.on("activeSpeaker", (participant) => {

  console.log(`${participant.id} is currently speaking`);

});


```

```

const activeSpeaker = useRealtimeKitSelector(

  (m) => m.participants.lastActiveSpeaker,

);


```

Or use event listener:

```

meeting.participants.on("activeSpeaker", (participant) => {

  console.log(`${participant.id} is currently speaking`);

});


```

Kotlin

```

meeting.addParticipantsEventListener(object : RtkParticipantsEventListener {

  override fun onActiveSpeakerChanged(participant: RtkRemoteParticipant?) {

    participant?.let {

      println("${it.id} is currently speaking")

    }

  }

})


```

Swift

```

extension MeetingViewModel: RtkParticipantsEventListener {

  func onActiveSpeakerChanged(participant: RtkRemoteParticipant?) {

    if let participant = participant {

      print("\(participant.id) is currently speaking")

    }

  }

}


meeting.addParticipantsEventListener(self)


```

Dart

```

class ParticipantsNotifier extends RtkParticipantsEventListener {

  @override

  void onActiveSpeakerChanged(RtkRemoteParticipant? participant) {

    if (participant != null) {

      print('${participant.id} is currently speaking');

    }

  }

}


meeting.addParticipantsEventListener(ParticipantsNotifier());


```

```

const activeSpeaker = useRealtimeKitSelector(

  (m) => m.participants.lastActiveSpeaker,

);


```

Or use event listener:

```

meeting.participants.on("activeSpeaker", (participant) => {

  console.log(`${participant.id} is currently speaking`);

});


```

## Participant map events

These events allow you to monitor changes to remote participant maps. Use them to get notified when a participant joins or leaves the meeting, is pinned, or moves out of the grid.

### Participant joined

Triggered when any participant joins the meeting.

JavaScript

```

meeting.participants.joined.on("participantJoined", (participant) => {

  console.log(`A participant with id "${participant.id}" has joined`);

});


```

```

const joinedParticipants = useRealtimeKitSelector((m) => m.participants.joined);


```

Or use event listener:

```

meeting.participants.joined.on("participantJoined", (participant) => {

  console.log(`A participant with id "${participant.id}" has joined`);

});


```

Kotlin

```

meeting.addParticipantsEventListener(object : RtkParticipantsEventListener {

  override fun onParticipantJoin(participant: RtkRemoteParticipant) {

    println("A participant with id ${participant.id} has joined")

  }

})


```

Swift

```

extension MeetingViewModel: RtkParticipantsEventListener {

  func onParticipantJoin(participant: RtkRemoteParticipant) {

    print("A participant with id \(participant.id) has joined")

  }

}


meeting.addParticipantsEventListener(self)


```

Dart

```

class ParticipantsNotifier extends RtkParticipantsEventListener {

  @override

  void onParticipantJoin(RtkRemoteParticipant participant) {

    print('A participant with id ${participant.id} has joined');

  }

}


meeting.addParticipantsEventListener(ParticipantsNotifier());


```

```

const joinedParticipants = useRealtimeKitSelector((m) => m.participants.joined);


```

Or use event listener:

```

meeting.participants.joined.on("participantJoined", (participant) => {

  console.log(`A participant with id "${participant.id}" has joined`);

});


```

### Participant left

Triggered when any participant leaves the meeting.

JavaScript

```

meeting.participants.joined.on("participantLeft", (participant) => {

  console.log(`A participant with id "${participant.id}" has left the meeting`);

});


```

```

const joinedParticipants = useRealtimeKitSelector((m) => m.participants.joined);


```

Or use event listener:

```

meeting.participants.joined.on("participantLeft", (participant) => {

  console.log(`A participant with id "${participant.id}" has left the meeting`);

});


```

Kotlin

```

meeting.addParticipantsEventListener(object : RtkParticipantsEventListener {

  override fun onParticipantLeave(participant: RtkRemoteParticipant) {

    println("A participant with id ${participant.id} has left the meeting")

  }

})


```

Swift

```

extension MeetingViewModel: RtkParticipantsEventListener {

  func onParticipantLeave(participant: RtkRemoteParticipant) {

    print("A participant with id \(participant.id) has left the meeting")

  }

}


meeting.addParticipantsEventListener(self)


```

Dart

```

class ParticipantsNotifier extends RtkParticipantsEventListener {

  @override

  void onParticipantLeave(RtkRemoteParticipant participant) {

    print('A participant with id ${participant.id} has left the meeting');

  }

}


meeting.addParticipantsEventListener(ParticipantsNotifier());


```

```

const joinedParticipants = useRealtimeKitSelector((m) => m.participants.joined);


```

Or use event listener:

```

meeting.participants.joined.on("participantLeft", (participant) => {

  console.log(`A participant with id "${participant.id}" has left the meeting`);

});


```

### Active participants changed

Each participant map emits `participantJoined` and `participantLeft` events:

JavaScript

```

// Listen for when a participant gets pinned

meeting.participants.pinned.on("participantJoined", (participant) => {

  console.log(`Participant ${participant.name} got pinned`);

});


// Listen for when a participant gets unpinned

meeting.participants.pinned.on("participantLeft", (participant) => {

  console.log(`Participant ${participant.name} got unpinned`);

});


```

Kotlin

```

meeting.addParticipantsEventListener(object : RtkParticipantsEventListener {

  override fun onActiveParticipantsChanged(active: List<RtkRemoteParticipant>) {

    // Called when active participants change

  }

})


```

Swift

```

extension MeetingViewModel: RtkParticipantsEventListener {

  func onActiveParticipantsChanged(active: [RtkRemoteParticipant]) {

    // Called when active participants change

  }

}


meeting.addParticipantsEventListener(self)


```

Dart

```

class ParticipantsNotifier extends RtkParticipantsEventListener {

  @override

  void onActiveParticipantsChanged(List<RtkRemoteParticipant> active) {

    // Called when active participants change

  }

}


meeting.addParticipantsEventListener(ParticipantsNotifier());


```

### Participant pinned

Triggered when a participant is pinned.

JavaScript

```

meeting.participants.joined.on("pinned", (participant) => {

  console.log(`Participant with id "${participant.id}" was pinned`);

});


```

```

const pinnedParticipants = useRealtimeKitSelector((m) => m.participants.pinned);


```

Or use event listener:

```

meeting.participants.joined.on("pinned", (participant) => {

  console.log(`Participant with id "${participant.id}" was pinned`);

});


```

Kotlin

```

meeting.addParticipantsEventListener(object : RtkParticipantsEventListener {

  override fun onParticipantPinned(participant: RtkRemoteParticipant) {

    println("Participant with id ${participant.id} was pinned")

  }

})


```

Swift

```

extension MeetingViewModel: RtkParticipantsEventListener {

  func onParticipantPinned(participant: RtkRemoteParticipant) {

    print("Participant with id \(participant.id) was pinned")

  }

}


meeting.addParticipantsEventListener(self)


```

Dart

```

class ParticipantsNotifier extends RtkParticipantsEventListener {

  @override

  void onParticipantPinned(RtkRemoteParticipant participant) {

    print('Participant with id ${participant.id} was pinned');

  }

}


meeting.addParticipantsEventListener(ParticipantsNotifier());


```

```

const pinnedParticipants = useRealtimeKitSelector((m) => m.participants.pinned);


```

Or use event listener:

```

meeting.participants.joined.on("pinned", (participant) => {

  console.log(`Participant with id "${participant.id}" was pinned`);

});


```

### Participant unpinned

Triggered when a participant is unpinned.

JavaScript

```

meeting.participants.joined.on("unpinned", (participant) => {

  console.log(`Participant with id "${participant.id}" was unpinned`);

});


```

```

const pinnedParticipants = useRealtimeKitSelector((m) => m.participants.pinned);


```

Or use event listener:

```

meeting.participants.joined.on("unpinned", (participant) => {

  console.log(`Participant with id "${participant.id}" was unpinned`);

});


```

Kotlin

```

meeting.addParticipantsEventListener(object : RtkParticipantsEventListener {

  override fun onParticipantUnpinned(participant: RtkRemoteParticipant) {

    println("Participant with id ${participant.id} was unpinned")

  }

})


```

Swift

```

extension MeetingViewModel: RtkParticipantsEventListener {

  func onParticipantUnpinned(participant: RtkRemoteParticipant) {

    print("Participant with id \(participant.id) was unpinned")

  }

}


meeting.addParticipantsEventListener(self)


```

Dart

```

class ParticipantsNotifier extends RtkParticipantsEventListener {

  @override

  void onParticipantUnpinned(RtkRemoteParticipant participant) {

    print('Participant with id ${participant.id} was unpinned');

  }

}


meeting.addParticipantsEventListener(ParticipantsNotifier());


```

```

const pinnedParticipants = useRealtimeKitSelector((m) => m.participants.pinned);


```

Or use event listener:

```

meeting.participants.joined.on("unpinned", (participant) => {

  console.log(`Participant with id "${participant.id}" was unpinned`);

});


```

## Participant events

You can monitor changes to a specific participant using the following events.

### Video update

Triggered when any participant starts or stops video.

JavaScript

```

meeting.participants.joined.on("videoUpdate", (participant) => {

  console.log(

    `A participant with id "${participant.id}" updated their video track`,

  );


  if (participant.videoEnabled) {

    // Use participant.videoTrack

  } else {

    // Handle stop video

  }

});


```

```

// Check for one participant

const videoEnabled = useRealtimeKitSelector(

  (m) => m.participants.joined.get(participantId)?.videoEnabled,

);


// All video enabled participants

const videoEnabledParticipants = useRealtimeKitSelector((m) =>

  m.participants.joined.toArray().filter((p) => p.videoEnabled),

);


```

Kotlin

```

meeting.addParticipantEventListener(object : RtkParticipantEventListener {

  override fun onVideoUpdate(participant: RtkRemoteParticipant, isEnabled: Boolean) {

    println("Participant ${participant.id} video is now ${if (isEnabled) "enabled" else "disabled"}")

  }

})


```

Swift

```

extension MeetingViewModel: RtkParticipantEventListener {

  func onVideoUpdate(participant: RtkRemoteParticipant, isEnabled: Bool) {

    print("Participant \(participant.id) video is now \(isEnabled ? "enabled" : "disabled")")

  }

}


meeting.addParticipantEventListener(self)


```

Dart

```

class ParticipantUpdateHandler extends RtkParticipantUpdateListener {

  @override

  void onVideoUpdate(RtkRemoteParticipant participant, bool isEnabled) {

    print('Participant ${participant.id} video is now ${isEnabled ? "enabled" : "disabled"}');

  }

}


participant.addParticipantUpdateListener(ParticipantUpdateHandler());


```

```

// Check for one participant

const videoEnabled = useRealtimeKitSelector(

  (m) => m.participants.joined.get(participantId)?.videoEnabled,

);


// All video enabled participants

const videoEnabledParticipants = useRealtimeKitSelector((m) =>

  m.participants.joined.toArray().filter((p) => p.videoEnabled),

);


```

### Audio update

Triggered when any participant starts or stops audio.

JavaScript

```

meeting.participants.joined.on("audioUpdate", (participant) => {

  console.log(

    `A participant with id "${participant.id}" updated their audio track`,

  );


  if (participant.audioEnabled) {

    // Use participant.audioTrack

  } else {

    // Handle stop audio

  }

});


```

```

// Check for one participant

const audioEnabled = useRealtimeKitSelector(

  (m) => m.participants.joined.get(participantId)?.audioEnabled,

);


// All audio enabled participants

const audioEnabledParticipants = useRealtimeKitSelector((m) =>

  m.participants.joined.toArray().filter((p) => p.audioEnabled),

);


```

Kotlin

```

meeting.addParticipantEventListener(object : RtkParticipantEventListener {

  override fun onAudioUpdate(participant: RtkRemoteParticipant, isEnabled: Boolean) {

    println("Participant ${participant.id} audio is now ${if (isEnabled) "enabled" else "disabled"}")

  }

})


```

Swift

```

extension MeetingViewModel: RtkParticipantEventListener {

  func onAudioUpdate(participant: RtkRemoteParticipant, isEnabled: Bool) {

    print("Participant \(participant.id) audio is now \(isEnabled ? "enabled" : "disabled")")

  }

}


meeting.addParticipantEventListener(self)


```

Dart

```

class ParticipantUpdateHandler extends RtkParticipantUpdateListener {

  @override

  void onAudioUpdate(RtkRemoteParticipant participant, bool isEnabled) {

    print('Participant ${participant.id} audio is now ${isEnabled ? "enabled" : "disabled"}');

  }

}


participant.addParticipantUpdateListener(ParticipantUpdateHandler());


```

```

// Check for one participant

const audioEnabled = useRealtimeKitSelector(

  (m) => m.participants.joined.get(participantId)?.audioEnabled,

);


// All audio enabled participants

const audioEnabledParticipants = useRealtimeKitSelector((m) =>

  m.participants.joined.toArray().filter((p) => p.audioEnabled),

);


```

### Screen share update

Triggered when any participant starts or stops screen share.

JavaScript

```

meeting.participants.joined.on("screenShareUpdate", (participant) => {

  console.log(

    `A participant with id "${participant.id}" updated their screen share`,

  );


  if (participant.screenShareEnabled) {

    // Use participant.screenShareTracks

  } else {

    // Handle stop screen share

  }

});


```

```

// Check for one participant

const screensharingParticipant = useRealtimeKitSelector((m) =>

  m.participants.joined.toArray().find((p) => p.screenShareEnabled),

);


// All screen sharing participants

const screenSharingParticipants = useRealtimeKitSelector((m) =>

  m.participants.joined.toArray().filter((p) => p.screenShareEnabled),

);


```

Kotlin

```

meeting.addParticipantEventListener(object : RtkParticipantEventListener {

  override fun onScreenShareUpdate(participant: RtkRemoteParticipant, isEnabled: Boolean) {

    println("Participant ${participant.id} screen share is now ${if (isEnabled) "enabled" else "disabled"}")

  }

})


```

Swift

```

extension MeetingViewModel: RtkParticipantEventListener {

  func onScreenShareUpdate(participant: RtkRemoteParticipant, isEnabled: Bool) {

    print("Participant \(participant.id) screen share is now \(isEnabled ? "enabled" : "disabled")")

  }

}


meeting.addParticipantEventListener(self)


```

Dart

```

class ParticipantUpdateHandler extends RtkParticipantUpdateListener {

  @override

  void onScreenShareUpdate(RtkRemoteParticipant participant, bool isEnabled) {

    print('Participant ${participant.id} screen share is now ${isEnabled ? "enabled" : "disabled"}');

  }

}


participant.addParticipantUpdateListener(ParticipantUpdateHandler());


```

```

// Check for one participant

const screensharingParticipant = useRealtimeKitSelector((m) =>

  m.participants.joined.toArray().find((p) => p.screenShareEnabled),

);


// All screen sharing participants

const screenSharingParticipants = useRealtimeKitSelector((m) =>

  m.participants.joined.toArray().filter((p) => p.screenShareEnabled),

);


```

### Network quality score

Monitor participant network quality using the `mediaScoreUpdate` event.

JavaScript

```

meeting.participants.joined.on(

  "mediaScoreUpdate",

  ({ participantId, kind, isScreenshare, score, scoreStats }) => {

    if (kind === "video") {

      console.log(

        `Participant ${participantId}'s ${isScreenshare ? "screenshare" : "video"} quality score is`,

        score,

      );

    }


    if (kind === "audio") {

      console.log(

        `Participant ${participantId}'s audio quality score is`,

        score,

      );

    }


    if (score < 5) {

      console.log(`Participant ${participantId}'s media quality is poor`);

    }

  },

);


```

Monitor participant network quality using the `mediaScoreUpdate` event.

```

import { useEffect } from "react";


// Use event listener for media score updates

useEffect(() => {

  if (!meeting) return;


  const handleMediaScoreUpdate = ({

    participantId,

    kind,

    isScreenshare,

    score,

    scoreStats,

  }) => {

    if (kind === "video") {

      console.log(

        `Participant ${participantId}'s ${isScreenshare ? "screenshare" : "video"} quality score is`,

        score,

      );

    }


    if (score < 5) {

      console.log(`Participant ${participantId}'s media quality is poor`);

    }

  };


  meeting.participants.joined.on("mediaScoreUpdate", handleMediaScoreUpdate);


  return () => {

    meeting.participants.joined.off("mediaScoreUpdate", handleMediaScoreUpdate);

  };

}, [meeting]);


```

This event is not available on this platform.

Monitor participant network quality using the `mediaScoreUpdate` event.

```

import { useEffect } from "react";


// Use event listener for media score updates

useEffect(() => {

  if (!meeting) return;


  const handleMediaScoreUpdate = ({

    participantId,

    kind,

    isScreenshare,

    score,

    scoreStats,

  }) => {

    if (kind === "video") {

      console.log(

        `Participant ${participantId}'s ${isScreenshare ? "screenshare" : "video"} quality score is`,

        score,

      );

    }


    if (score < 5) {

      console.log(`Participant ${participantId}'s media quality is poor`);

    }

  };


  meeting.participants.joined.on("mediaScoreUpdate", handleMediaScoreUpdate);


  return () => {

    meeting.participants.joined.off("mediaScoreUpdate", handleMediaScoreUpdate);

  };

}, [meeting]);


```

## Listen to participant events

Each participant object is an event emitter:

JavaScript

```

meeting.participants.joined

  .get(participantId)

  .on("audioUpdate", ({ audioEnabled, audioTrack }) => {

    console.log(

      "The participant with id",

      participantId,

      "has toggled their mic to",

      audioEnabled,

    );

  });


```

Alternatively, listen on the participant map for all participants:

JavaScript

```

meeting.participants.joined.on(

  "audioUpdate",

  (participant, { audioEnabled, audioTrack }) => {

    console.log(

      "The participant with id",

      participant.id,

      "has toggled their mic to",

      audioEnabled,

    );

  },

);


```

```

import { useRealtimeKitClient } from "@cloudflare/realtimekit-react";

import { useEffect } from "react";


function ParticipantAudioListener({ participantId }) {

  const [meeting] = useRealtimeKitClient();


  useEffect(() => {

    if (!meeting) return;


    const handleAudioUpdate = ({ audioEnabled, audioTrack }) => {

      console.log(

        "The participant with id",

        participantId,

        "has toggled their mic to",

        audioEnabled,

      );

    };


    const participant = meeting.participants.joined.get(participantId);

    participant.on("audioUpdate", handleAudioUpdate);


    return () => {

      participant.off("audioUpdate", handleAudioUpdate);

    };

  }, [meeting, participantId]);

}


```

Or use the selector for specific properties:

```

const audioEnabled = useRealtimeKitSelector(

  (m) => m.participants.joined.get(participantId)?.audioEnabled,

);


```

Implement the `RtkParticipantEventListener` interface to receive participant event updates:

Kotlin

```

meeting.addParticipantEventListener(object : RtkParticipantEventListener {

  override fun onVideoUpdate(participant: RtkRemoteParticipant, isEnabled: Boolean) {

    // Called when participant's video state changes

  }


  override fun onAudioUpdate(participant: RtkRemoteParticipant, isEnabled: Boolean) {

    // Called when participant's audio state changes

  }


  override fun onScreenShareUpdate(participant: RtkRemoteParticipant, isEnabled: Boolean) {

    // Called when participant's screen share state changes

  }

})


```

Implement the `RtkParticipantEventListener` protocol to receive participant event updates:

Swift

```

extension MeetingViewModel: RtkParticipantEventListener {

  func onVideoUpdate(participant: RtkRemoteParticipant, isEnabled: Bool) {

    // Called when participant's video state changes

  }


  func onAudioUpdate(participant: RtkRemoteParticipant, isEnabled: Bool) {

    // Called when participant's audio state changes

  }


  func onScreenShareUpdate(participant: RtkRemoteParticipant, isEnabled: Bool) {

    // Called when participant's screen share state changes

  }

}


meeting.addParticipantEventListener(self)


```

Implement the `RtkParticipantUpdateListener` interface and add the listener on a participant:

Dart

```

class ParticipantUpdateHandler extends RtkParticipantUpdateListener {

  @override

  void onVideoUpdate(RtkRemoteParticipant participant, bool isEnabled) {

    print("${participant.name}'s video is now ${isEnabled ? 'on' : 'off'}");

  }


  @override

  void onAudioUpdate(RtkRemoteParticipant participant, bool isEnabled) {

    print("${participant.name}'s audio is now ${isEnabled ? 'on' : 'off'}");

  }


  @override

  void onPinned(RtkRemoteParticipant participant) {

    print("${participant.name} was pinned");

  }


  @override

  void onUnpinned(RtkRemoteParticipant participant) {

    print("${participant.name} was unpinned");

  }


  @override

  void onScreenShareUpdate(RtkRemoteParticipant participant, bool isEnabled) {

    print("${participant.name}'s screen-share is now ${isEnabled ? 'on' : 'off'}");

  }


  @override

  void onUpdate(RtkRemoteParticipant participant) {

    print("${participant.name} was updated");

  }

}


// Register the listener with a specific participant

final listener = ParticipantUpdateHandler();

participant.addParticipantUpdateListener(listener);


// When done listening, remove the listener

participant.removeParticipantUpdateListener(listener);


```

```

import { useRealtimeKitClient } from "@cloudflare/realtimekit-react-native";

import { useEffect } from "react";


function ParticipantAudioListener({ participantId }) {

  const [meeting] = useRealtimeKitClient();


  useEffect(() => {

    if (!meeting) return;


    const handleAudioUpdate = ({ audioEnabled, audioTrack }) => {

      console.log(

        "The participant with id",

        participantId,

        "has toggled their mic to",

        audioEnabled,

      );

    };


    const participant = meeting.participants.joined.get(participantId);

    participant.on("audioUpdate", handleAudioUpdate);


    return () => {

      participant.off("audioUpdate", handleAudioUpdate);

    };

  }, [meeting, participantId]);

}


```

Or use the selector for specific properties:

```

const audioEnabled = useRealtimeKitSelector(

  (m) => m.participants.joined.get(participantId)?.audioEnabled,

);


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/remote-participants/events/#page","headline":"Events · Cloudflare Realtime docs","description":"Events emitted by RealtimeKit participants for join, leave, pin, and grid changes.","url":"https://developers.cloudflare.com/realtime/realtimekit/core/remote-participants/events/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/core/","name":"Build using Core SDK"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/core/remote-participants/","name":"Remote Participants"}},{"@type":"ListItem","position":6,"item":{"@id":"/realtime/realtimekit/core/remote-participants/events/","name":"Events"}}]}
```
