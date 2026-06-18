---
title: Manage Participants in a Session
description: Use RealtimeKit host controls to mute, pin, or remove participants in a live session.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Manage Participants in a Session

Prerequisites

The local participant (for example, a host or moderator) must have the required **Host Controls** permissions enabled in their preset. For details, refer to [Preset](https://developers.cloudflare.com/realtime/realtimekit/concepts/preset/).

Use RealtimeKit host controls to manage other participants in a live session. You can mute audio or video, pin a participant, or remove participants from the session. These actions require specific host control permissions enabled in the local participant's [Preset](https://developers.cloudflare.com/realtime/realtimekit/concepts/preset/). Before you show UI controls or call these methods, verify that the local participant has the necessary permissions. In this guide, the **local participant** refers to the user performing the actions.

WebMobile

ReactWeb ComponentsAngular

### Select a remote participant

To perform actions on a specific participant, you first need to retrieve their participant object. Remote participants (other participants) are available in `meeting.participants`. The local participant is available in `meeting.self`. Refer to [Meeting Object Explained](https://developers.cloudflare.com/realtime/realtimekit/core/meeting-object-explained/) for details.

TypeScript

```

const joinedParticipants = meeting.participants.joined.toArray();

const participant = joinedParticipants[0];

if (!participant) {

  // No remote participants are currently joined.

}


```

To perform actions on a specific participant, you first need to retrieve their participant object. Remote participants (other participants) are available in `meeting.participants`. The local participant is available in `meeting.self`. Refer to [Meeting Object Explained](https://developers.cloudflare.com/realtime/realtimekit/core/meeting-object-explained/) for details.

TypeScript

```

const joinedParticipants = meeting.participants.joined.toArray();

const participant = joinedParticipants[0];

if (!participant) {

  // No remote participants are currently joined.

}


```

To perform actions on a specific participant, you first need to retrieve their participant object. Remote participants (other participants) are available in `meeting.participants`. The local participant is available in `meeting.self`. Refer to [Meeting Object Explained](https://developers.cloudflare.com/realtime/realtimekit/core/meeting-object-explained/) for details.

TypeScript

```

const joinedParticipants = meeting.participants.joined.toArray();

const participant = joinedParticipants[0];

if (!participant) {

  // No remote participants are currently joined.

}


```

To perform actions on a specific participant, retrieve their participant object from the `participants` property. Remote participants are available in `meeting.participants.joined`. The local participant is available in `meeting.localUser`.

Kotlin

```

val joinedParticipants = meeting.participants.joined

val participant = joinedParticipants.firstOrNull()

if (participant == null) {

  // No remote participants are currently joined.

}


```

To perform actions on a specific participant, retrieve their participant object from the `participants` property. Remote participants are available in `meeting.participants.joined`. The local participant is available in `meeting.localUser`.

Swift

```

let joinedParticipants = meeting.participants.joined

guard let participant = joinedParticipants.first else {

  // No remote participants are currently joined.

  return

}


```

To perform actions on a specific participant, retrieve their participant object from the `participants` property. Remote participants are available in `meeting.participants.joined`. The local participant is available in `meeting.localUser`.

Dart

```

final joinedParticipants = meeting.participants.joined;

final participant = joinedParticipants.firstOrNull;

if (participant == null) {

  // No remote participants are currently joined.

}


```

To perform actions on a specific participant, retrieve their participant object from the `participants` property. Remote participants are available in `meeting.participants.joined`. The local participant is available in `meeting.self`.

```

const joinedParticipants = meeting.participants.joined;

const participant = joinedParticipants.toArray()[0];

if (!participant) {

  // No remote participants are currently joined.

}


```

Or use the `useRealtimeKitSelector` hook:

```

import { useRealtimeKitSelector } from '@cloudflare/realtimekit-react-native';


const joinedParticipants = useRealtimeKitSelector((m) => m.participants.joined);


```

## Mute audio

Mute audio of participants when you need to manage background noise, moderate a classroom or webinar, or prevent interruptions during a session. This action requires the **Mute Audio** (`disable_participant_audio`) host control permission enabled in the local participant's preset.

### Mute a participant

To mute a specific participant's audio:

1. Check that the local participant has permission to mute other participants' audio.  
TypeScript  
```  
const canMuteAudio =  
  meeting.self.permissions.canDisableParticipantAudio === true;  
if (!canMuteAudio) {  
  // Disable the control in your UI.  
}  
```
2. Call `disableAudio()` on the target participant.  
If the local participant does not have the required permission, `disableAudio()` throws a `ClientError` with code `1201`.  
TypeScript  
```  
try {  
  await participant.disableAudio();  
} catch (err: any) {  
  if (err?.code === 1201) {  
    // The local participant does not have permission to mute other participants’ audio.  
    return;  
  }  
  throw err;  
}  
```
3. Handle the result by listening for updates.  
After the call succeeds, the target participant's `audioEnabled` becomes `false`, and the SDK emits an `audioUpdate` event.  
**Option A**: Listen on the participant object  
TypeScript  
```  
participant.on("audioUpdate", ({ audioEnabled, audioTrack }) => {  
  // audioEnabled is false  
  // Update UI for the participant  
});  
```  
**Option B**: Listen on the `joined` map  
TypeScript  
```  
meeting.participants.joined.on(  
  "audioUpdate",  
  (participant, { audioEnabled, audioTrack }) => {  
    if (participant.id === targetParticipantId) {  
      // audioEnabled is false  
      // Update UI for the participant  
    }  
  },  
);  
```

1. Check that the local participant has permission to mute other participants' audio.  
TypeScript  
```  
const canMuteAudio =  
  meeting.self.permissions.canDisableParticipantAudio === true;  
if (!canMuteAudio) {  
  // Disable the control in your UI.  
}  
```
2. Call `disableAudio()` on the target participant.  
If the local participant does not have the required permission, `disableAudio()` throws a `ClientError` with code `1201`.  
TypeScript  
```  
try {  
  await participant.disableAudio();  
} catch (err: any) {  
  if (err?.code === 1201) {  
    // The local participant does not have permission to mute other participants’ audio.  
    return;  
  }  
  throw err;  
}  
```
3. Handle the result by listening for updates.  
After the call succeeds, the target participant's `audioEnabled` becomes `false`, and the SDK emits an `audioUpdate` event.  
**Option A**: Listen on the participant object  
TypeScript  
```  
participant.on("audioUpdate", ({ audioEnabled, audioTrack }) => {  
  // audioEnabled is false  
  // Update UI for the participant  
});  
```  
**Option B**: Listen on the `joined` map  
TypeScript  
```  
meeting.participants.joined.on(  
  "audioUpdate",  
  (participant, { audioEnabled, audioTrack }) => {  
    if (participant.id === targetParticipantId) {  
      // audioEnabled is false  
      // Update UI for the participant  
    }  
  },  
);  
```

1. Check that the local participant has permission to mute other participants' audio.  
TypeScript  
```  
const canMuteAudio =  
  meeting.self.permissions.canDisableParticipantAudio === true;  
if (!canMuteAudio) {  
  // Disable the control in your UI.  
}  
```
2. Call `disableAudio()` on the target participant.  
If the local participant does not have the required permission, `disableAudio()` throws a `ClientError` with code `1201`.  
TypeScript  
```  
try {  
  await participant.disableAudio();  
} catch (err: any) {  
  if (err?.code === 1201) {  
    // The local participant does not have permission to mute other participants’ audio.  
    return;  
  }  
  throw err;  
}  
```
3. Handle the result by listening for updates.  
After the call succeeds, the target participant's `audioEnabled` becomes `false`, and the SDK emits an `audioUpdate` event.  
**Option A**: Listen on the participant object  
TypeScript  
```  
participant.on("audioUpdate", ({ audioEnabled, audioTrack }) => {  
  // audioEnabled is false  
  // Update UI for the participant  
});  
```  
**Option B**: Listen on the `joined` map  
TypeScript  
```  
meeting.participants.joined.on(  
  "audioUpdate",  
  (participant, { audioEnabled, audioTrack }) => {  
    if (participant.id === targetParticipantId) {  
      // audioEnabled is false  
      // Update UI for the participant  
    }  
  },  
);  
```

1. Check that the local participant has permission to mute other participants' audio.

Kotlin

```

val canMuteAudio = meeting.localUser.permissions.host.canMuteAudio

if (!canMuteAudio) {

  // Disable the control in your UI.

}


```

1. Call `disableAudio()` on the target participant. If the local participant does not have the required permission, `disableAudio()` returns a `HostError`.

Kotlin

```

val error = participant.disableAudio()

if (error != null) {

  // Handle error - permission denied.

}


```

1. Handle the result by listening for updates. After the call succeeds, the target participant's `audioEnabled` becomes `false`.

Kotlin

```

meeting.addParticipantsEventListener(object : RtkParticipantsEventListener {

  override fun onAudioUpdate(participant: RtkRemoteParticipant, isEnabled: Boolean) {

    // audioEnabled is false

    // Update UI for the participant

  }

})


```

1. Check that the local participant has permission to mute other participants' audio.

Swift

```

let canMuteAudio = meeting.localUser.permissions.host.canMuteAudio

if !canMuteAudio {

  // Disable the control in your UI.

}


```

1. Call `disableAudio()` on the target participant. If the local participant does not have the required permission, `disableAudio()` returns a `HostError`.

Swift

```

if let error = participant.disableAudio() {

  // Handle error - permission denied.

}


```

1. Handle the result by listening for updates. After the call succeeds, the target participant's `audioEnabled` becomes `false`.

Swift

```

extension MeetingViewModel: RtkParticipantsEventListener {

  func onAudioUpdate(participant: RtkRemoteParticipant, isEnabled: Bool) {

    // audioEnabled is false

    // Update UI for the participant

  }

}


// Register the listener

meeting.addParticipantsEventListener(participantsEventListener: self)


```

1. Check that the local participant has permission to mute other participants' audio.

Dart

```

final canMuteAudio = meeting.localUser.permissions.host.canMuteAudio;

if (!canMuteAudio) {

  // Disable the control in your UI.

}


```

1. Call `disableAudio()` on the target participant.

Dart

```

participant.disableAudio(

  onResult: (error) {

    if (error != null) {

      // Handle error - permission denied or other issue.

      return;

    }

    // Audio disabled successfully.

  },

);


```

1. Handle the result by listening for updates. After the call succeeds, the target participant's `audioEnabled` becomes `false`.

Dart

```

class ParticipantsEventsListener extends RtkParticipantsEventListener {

  @override

  void onAudioUpdate(RtkRemoteParticipant participant, bool isEnabled) {

    // audioEnabled is false

    // Update UI for the participant

  }

}


// Register the listener

meeting.addParticipantsEventListener(ParticipantsEventsListener());


```

1. Check that the local participant has permission to mute other participants' audio.

```

const canDisableParticipantAudio = meeting.self.permissions.canDisableParticipantAudio;

if (!canDisableParticipantAudio) {

  // Disable the control in your UI.

}


```

1. Call `disableAudio()` on the target participant.

```

participant

  .disableAudio()

  .catch((err) => {

    // Handle error - permission denied or other issue.

    console.log(err);

  });


```

1. Handle the result by listening for updates. After the call succeeds, the target participant's `audioEnabled` becomes `false`.

```

meeting.participants.joined.on('audioUpdate', (participant) => {

  // participant.audioEnabled is false

  // Update UI for the participant

});


```

### Mute all participants

This affects all participants, including the local participant. To mute audio for all participants in the session:

1. Check that the local participant has permission to mute other participants' audio.  
TypeScript  
```  
const canMuteAudio =  
  meeting.self.permissions.canDisableParticipantAudio === true;  
if (!canMuteAudio) {  
  // Disable the control in your UI.  
}  
```
2. Call `disableAllAudio()`.  
If the local participant does not have the required permission, `disableAllAudio()` throws a `ClientError` with code `1201`.  
TypeScript  
```  
try {  
  await meeting.participants.disableAllAudio();  
} catch (err: any) {  
  if (err?.code === 1201) {  
    // The local participant does not have permission to mute other participants’ audio.  
    return;  
  }  
  throw err;  
}  
```
3. Handle the result by listening for updates.  
After the call succeeds, each participant’s `audioEnabled` becomes `false`, and the SDK emits an `audioUpdate` event. The local participant also receives `audioUpdate` on `meeting.self`.  
Listen to remote participant updates on the `joined` map:  
TypeScript  
```  
meeting.participants.joined.on(  
  "audioUpdate",  
  (participant, { audioEnabled, audioTrack }) => {  
    // audioEnabled is false  
    // Update UI for the participant  
  },  
);  
```  
Listen to the local participant update on `meeting.self`:  
TypeScript  
```  
meeting.self.on("audioUpdate", ({ audioEnabled, audioTrack }) => {  
  // audioEnabled is false  
  // Update UI for the local participant  
});  
```

1. Check that the local participant has permission to mute other participants' audio.  
TypeScript  
```  
const canMuteAudio =  
  meeting.self.permissions.canDisableParticipantAudio === true;  
if (!canMuteAudio) {  
  // Disable the control in your UI.  
}  
```
2. Call `disableAllAudio()`.  
If the local participant does not have the required permission, `disableAllAudio()` throws a `ClientError` with code `1201`.  
TypeScript  
```  
try {  
  await meeting.participants.disableAllAudio();  
} catch (err: any) {  
  if (err?.code === 1201) {  
    // The local participant does not have permission to mute other participants’ audio.  
    return;  
  }  
  throw err;  
}  
```
3. Handle the result by listening for updates.  
After the call succeeds, each participant’s `audioEnabled` becomes `false`, and the SDK emits an `audioUpdate` event. The local participant also receives `audioUpdate` on `meeting.self`.  
Listen to remote participant updates on the `joined` map:  
TypeScript  
```  
meeting.participants.joined.on(  
  "audioUpdate",  
  (participant, { audioEnabled, audioTrack }) => {  
    // audioEnabled is false  
    // Update UI for the participant  
  },  
);  
```  
Listen to the local participant update on `meeting.self`:  
TypeScript  
```  
meeting.self.on("audioUpdate", ({ audioEnabled, audioTrack }) => {  
  // audioEnabled is false  
  // Update UI for the local participant  
});  
```

1. Check that the local participant has permission to mute other participants' audio.  
TypeScript  
```  
const canMuteAudio =  
  meeting.self.permissions.canDisableParticipantAudio === true;  
if (!canMuteAudio) {  
  // Disable the control in your UI.  
}  
```
2. Call `disableAllAudio()`.  
If the local participant does not have the required permission, `disableAllAudio()` throws a `ClientError` with code `1201`.  
TypeScript  
```  
try {  
  await meeting.participants.disableAllAudio();  
} catch (err: any) {  
  if (err?.code === 1201) {  
    // The local participant does not have permission to mute other participants’ audio.  
    return;  
  }  
  throw err;  
}  
```
3. Handle the result by listening for updates.  
After the call succeeds, each participant’s `audioEnabled` becomes `false`, and the SDK emits an `audioUpdate` event. The local participant also receives `audioUpdate` on `meeting.self`.  
Listen to remote participant updates on the `joined` map:  
TypeScript  
```  
meeting.participants.joined.on(  
  "audioUpdate",  
  (participant, { audioEnabled, audioTrack }) => {  
    // audioEnabled is false  
    // Update UI for the participant  
  },  
);  
```  
Listen to the local participant update on `meeting.self`:  
TypeScript  
```  
meeting.self.on("audioUpdate", ({ audioEnabled, audioTrack }) => {  
  // audioEnabled is false  
  // Update UI for the local participant  
});  
```

1. Check that the local participant has permission to mute other participants' audio.

Kotlin

```

val canMuteAudio = meeting.localUser.permissions.host.canMuteAudio

if (!canMuteAudio) {

  // Disable the control in your UI.

}


```

1. Call `disableAllAudio()` on the participants object. If the local participant does not have the required permission, `disableAllAudio()` returns a `HostError`.

Kotlin

```

val error = meeting.participants.disableAllAudio()

if (error != null) {

  // Handle error - permission denied.

}


```

1. Handle the result by listening for updates. After the call succeeds, each participant's `audioEnabled` becomes `false`.

Kotlin

```

meeting.addParticipantsEventListener(object : RtkParticipantsEventListener {

  override fun onAudioUpdate(participant: RtkRemoteParticipant, isEnabled: Boolean) {

    // audioEnabled is false

    // Update UI for the participant

  }

})


```

1. Check that the local participant has permission to mute other participants' audio.

Swift

```

let canMuteAudio = meeting.localUser.permissions.host.canMuteAudio

if !canMuteAudio {

  // Disable the control in your UI.

}


```

1. Call `disableAllAudio()` on the participants object. If the local participant does not have the required permission, `disableAllAudio()` returns a `HostError`.

Swift

```

if let error = meeting.participants.disableAllAudio() {

  // Handle error - permission denied.

}


```

1. Handle the result by listening for updates. After the call succeeds, each participant's `audioEnabled` becomes `false`.

Swift

```

extension MeetingViewModel: RtkParticipantsEventListener {

  func onAudioUpdate(participant: RtkRemoteParticipant, isEnabled: Bool) {

    // audioEnabled is false

    // Update UI for the participant

  }

}


// Register the listener

meeting.addParticipantsEventListener(participantsEventListener: self)


```

1. Check that the local participant has permission to mute other participants' audio.

Dart

```

final canMuteAudio = meeting.localUser.permissions.host.canMuteAudio;

if (!canMuteAudio) {

  // Disable the control in your UI.

}


```

1. Call `disableAllAudio()` on the participants object.

Dart

```

meeting.participants.disableAllAudio(

  onResult: (error) {

    if (error != null) {

      // Handle error - permission denied or other issue.

      return;

    }

    // All audio disabled successfully.

  },

);


```

1. Handle the result by listening for updates. After the call succeeds, each participant's `audioEnabled` becomes `false`.

Dart

```

class ParticipantsEventsListener extends RtkParticipantsEventListener {

  @override

  void onAudioUpdate(RtkRemoteParticipant participant, bool isEnabled) {

    // audioEnabled is false

    // Update UI for the participant

  }

}


// Register the listener

meeting.addParticipantsEventListener(ParticipantsEventsListener());


```

1. Check that the local participant has permission to mute other participants' audio.

```

const canDisableParticipantAudio = meeting.self.permissions.canDisableParticipantAudio;

if (!canDisableParticipantAudio) {

  // Disable the control in your UI.

}


```

1. Call `disableAllAudio()` on the participants object.

```

meeting.participants

  .disableAllAudio(true)

  .catch((err) => {

    // Handle error - permission denied or other issue.

    console.log(err);

  });


```

1. Handle the result by listening for updates. After the call succeeds, each participant's `audioEnabled` becomes `false`.

```

meeting.participants.joined.on('audioUpdate', (participant) => {

  // participant.audioEnabled is false

  // Update UI for the participant

});


```

## Disable video

Disable video of participants when you need to moderate a session, enforce privacy, or prevent unwanted video during a classroom or webinar. This action requires the **Mute Video** (`disable_participant_video`) host control permission enabled in the local participant's preset.

### Disable video for a participant

To disable a specific participant's video:

1. Check that the local participant has permission to disable other participants' video.  
TypeScript  
```  
const canDisableVideo =  
  meeting.self.permissions.canDisableParticipantVideo === true;  
if (!canDisableVideo) {  
  // Disable the control in your UI.  
}  
```
2. Call `disableVideo()` on the target participant.  
If the local participant does not have the required permission, `disableVideo()` throws a `ClientError` with code `1201`.  
TypeScript  
```  
try {  
  await participant.disableVideo();  
} catch (err: any) {  
  if (err?.code === 1201) {  
    // The local participant does not have permission to disable other participants’ video.  
    return;  
  }  
  throw err;  
}  
```
3. Handle the result by listening for updates.  
After the call succeeds, the target participant's `videoEnabled` becomes `false`, and the SDK emits a `videoUpdate` event.  
**Option A**: Listen on the participant object  
TypeScript  
```  
participant.on("videoUpdate", ({ videoEnabled, videoTrack }) => {  
  // videoEnabled is false  
  // Update UI for the participant  
});  
```  
**Option B**: Listen on the `joined` map  
TypeScript  
```  
meeting.participants.joined.on(  
  "videoUpdate",  
  (participant, { videoEnabled, videoTrack }) => {  
    // videoEnabled is false  
    // Update UI for the participant  
  },  
);  
```

1. Check that the local participant has permission to disable other participants' video.  
TypeScript  
```  
const canDisableVideo =  
  meeting.self.permissions.canDisableParticipantVideo === true;  
if (!canDisableVideo) {  
  // Disable the control in your UI.  
}  
```
2. Call `disableVideo()` on the target participant.  
If the local participant does not have the required permission, `disableVideo()` throws a `ClientError` with code `1201`.  
TypeScript  
```  
try {  
  await participant.disableVideo();  
} catch (err: any) {  
  if (err?.code === 1201) {  
    // The local participant does not have permission to disable other participants’ video.  
    return;  
  }  
  throw err;  
}  
```
3. Handle the result by listening for updates.  
After the call succeeds, the target participant's `videoEnabled` becomes `false`, and the SDK emits a `videoUpdate` event.  
**Option A**: Listen on the participant object  
TypeScript  
```  
participant.on("videoUpdate", ({ videoEnabled, videoTrack }) => {  
  // videoEnabled is false  
  // Update UI for the participant  
});  
```  
**Option B**: Listen on the `joined` map  
TypeScript  
```  
meeting.participants.joined.on(  
  "videoUpdate",  
  (participant, { videoEnabled, videoTrack }) => {  
    // videoEnabled is false  
    // Update UI for the participant  
  },  
);  
```

1. Check that the local participant has permission to disable other participants' video.  
TypeScript  
```  
const canDisableVideo =  
  meeting.self.permissions.canDisableParticipantVideo === true;  
if (!canDisableVideo) {  
  // Disable the control in your UI.  
}  
```
2. Call `disableVideo()` on the target participant.  
If the local participant does not have the required permission, `disableVideo()` throws a `ClientError` with code `1201`.  
TypeScript  
```  
try {  
  await participant.disableVideo();  
} catch (err: any) {  
  if (err?.code === 1201) {  
    // The local participant does not have permission to disable other participants’ video.  
    return;  
  }  
  throw err;  
}  
```
3. Handle the result by listening for updates.  
After the call succeeds, the target participant's `videoEnabled` becomes `false`, and the SDK emits a `videoUpdate` event.  
**Option A**: Listen on the participant object  
TypeScript  
```  
participant.on("videoUpdate", ({ videoEnabled, videoTrack }) => {  
  // videoEnabled is false  
  // Update UI for the participant  
});  
```  
**Option B**: Listen on the `joined` map  
TypeScript  
```  
meeting.participants.joined.on(  
  "videoUpdate",  
  (participant, { videoEnabled, videoTrack }) => {  
    // videoEnabled is false  
    // Update UI for the participant  
  },  
);  
```

1. Check that the local participant has permission to disable other participants' video.

Kotlin

```

val canMuteVideo = meeting.localUser.permissions.host.canMuteVideo

if (!canMuteVideo) {

  // Disable the control in your UI.

}


```

1. Call `disableVideo()` on the target participant. If the local participant does not have the required permission, `disableVideo()` returns a `HostError`.

Kotlin

```

val error = participant.disableVideo()

if (error != null) {

  // Handle error - permission denied.

}


```

1. Handle the result by listening for updates. After the call succeeds, the target participant's `videoEnabled` becomes `false`.

Kotlin

```

meeting.addParticipantsEventListener(object : RtkParticipantsEventListener {

  override fun onVideoUpdate(participant: RtkRemoteParticipant, isEnabled: Boolean) {

    // videoEnabled is false

    // Update UI for the participant

  }

})


```

1. Check that the local participant has permission to disable other participants' video.

Swift

```

let canMuteVideo = meeting.localUser.permissions.host.canMuteVideo

if !canMuteVideo {

  // Disable the control in your UI.

}


```

1. Call `disableVideo()` on the target participant. If the local participant does not have the required permission, `disableVideo()` returns a `HostError`.

Swift

```

if let error = participant.disableVideo() {

  // Handle error - permission denied.

}


```

1. Handle the result by listening for updates. After the call succeeds, the target participant's `videoEnabled` becomes `false`.

Swift

```

extension MeetingViewModel: RtkParticipantsEventListener {

  func onVideoUpdate(participant: RtkRemoteParticipant, isEnabled: Bool) {

    // videoEnabled is false

    // Update UI for the participant

  }

}


// Register the listener

meeting.addParticipantsEventListener(participantsEventListener: self)


```

1. Check that the local participant has permission to disable other participants' video.

Dart

```

final canMuteVideo = meeting.localUser.permissions.host.canMuteVideo;

if (!canMuteVideo) {

  // Disable the control in your UI.

}


```

1. Call `disableVideo()` on the target participant.

Dart

```

participant.disableVideo(

  onResult: (error) {

    if (error != null) {

      // Handle error - permission denied or other issue.

      return;

    }

    // Video disabled successfully.

  },

);


```

1. Handle the result by listening for updates. After the call succeeds, the target participant's `videoEnabled` becomes `false`.

Dart

```

class ParticipantsEventsListener extends RtkParticipantsEventListener {

  @override

  void onVideoUpdate(RtkRemoteParticipant participant, bool isEnabled) {

    // videoEnabled is false

    // Update UI for the participant

  }

}


// Register the listener

meeting.addParticipantsEventListener(ParticipantsEventsListener());


```

1. Check that the local participant has permission to disable other participants' video.

```

const canDisableParticipantVideo = meeting.self.permissions.canDisableParticipantVideo;

if (!canDisableParticipantVideo) {

  // Disable the control in your UI.

}


```

1. Call `disableVideo()` on the target participant.

```

participant

  .disableVideo()

  .catch((err) => {

    // Handle error - permission denied or other issue.

    console.log(err);

  });


```

1. Handle the result by listening for updates. After the call succeeds, the target participant's `videoEnabled` becomes `false`.

```

meeting.participants.joined.on('videoUpdate', (participant) => {

  // participant.videoEnabled is false

  // Update UI for the participant

});


```

### Disable video for all participants

This affects all participants, including the local participant. To disable video for all participants in the session:

1. Check that the local participant has permission to disable other participants' video.  
TypeScript  
```  
const canDisableVideo =  
  meeting.self.permissions.canDisableParticipantVideo === true;  
if (!canDisableVideo) {  
  // Disable the control in your UI.  
}  
```
2. Call `disableAllVideo()`.  
If the local participant does not have the required permission, `disableAllVideo()` throws a `ClientError` with code `1201`.  
TypeScript  
```  
try {  
  await meeting.participants.disableAllVideo();  
} catch (err: any) {  
  if (err?.code === 1201) {  
    // The local participant does not have permission to disable other participants’ video.  
    return;  
  }  
  throw err;  
}  
```
3. Handle the result by listening for updates.  
After the call succeeds, each participant’s `videoEnabled` becomes `false`, and the SDK emits a `videoUpdate` event. The local participant also receives `videoUpdate` on `meeting.self`.  
Listen to remote participant updates on the `joined` map:  
TypeScript  
```  
meeting.participants.joined.on(  
  "videoUpdate",  
  (participant, { videoEnabled, videoTrack }) => {  
    // videoEnabled is false  
    // Update UI for the participant  
  },  
);  
```  
Listen to local participant update on `meeting.self`:  
TypeScript  
```  
meeting.self.on("videoUpdate", ({ videoEnabled, videoTrack }) => {  
  // videoEnabled is false  
  // Update UI for the local participant  
});  
```

1. Check that the local participant has permission to disable other participants' video.  
TypeScript  
```  
const canDisableVideo =  
  meeting.self.permissions.canDisableParticipantVideo === true;  
if (!canDisableVideo) {  
  // Disable the control in your UI.  
}  
```
2. Call `disableAllVideo()`.  
If the local participant does not have the required permission, `disableAllVideo()` throws a `ClientError` with code `1201`.  
TypeScript  
```  
try {  
  await meeting.participants.disableAllVideo();  
} catch (err: any) {  
  if (err?.code === 1201) {  
    // The local participant does not have permission to disable other participants’ video.  
    return;  
  }  
  throw err;  
}  
```
3. Handle the result by listening for updates.  
After the call succeeds, each participant’s `videoEnabled` becomes `false`, and the SDK emits a `videoUpdate` event. The local participant also receives `videoUpdate` on `meeting.self`.  
Listen to remote participant updates on the `joined` map:  
TypeScript  
```  
meeting.participants.joined.on(  
  "videoUpdate",  
  (participant, { videoEnabled, videoTrack }) => {  
    // videoEnabled is false  
    // Update UI for the participant  
  },  
);  
```  
Listen to local participant update on `meeting.self`:  
TypeScript  
```  
meeting.self.on("videoUpdate", ({ videoEnabled, videoTrack }) => {  
  // videoEnabled is false  
  // Update UI for the local participant  
});  
```

1. Check that the local participant has permission to disable other participants' video.  
TypeScript  
```  
const canDisableVideo =  
  meeting.self.permissions.canDisableParticipantVideo === true;  
if (!canDisableVideo) {  
  // Disable the control in your UI.  
}  
```
2. Call `disableAllVideo()`.  
If the local participant does not have the required permission, `disableAllVideo()` throws a `ClientError` with code `1201`.  
TypeScript  
```  
try {  
  await meeting.participants.disableAllVideo();  
} catch (err: any) {  
  if (err?.code === 1201) {  
    // The local participant does not have permission to disable other participants’ video.  
    return;  
  }  
  throw err;  
}  
```
3. Handle the result by listening for updates.  
After the call succeeds, each participant’s `videoEnabled` becomes `false`, and the SDK emits a `videoUpdate` event. The local participant also receives `videoUpdate` on `meeting.self`.  
Listen to remote participant updates on the `joined` map:  
TypeScript  
```  
meeting.participants.joined.on(  
  "videoUpdate",  
  (participant, { videoEnabled, videoTrack }) => {  
    // videoEnabled is false  
    // Update UI for the participant  
  },  
);  
```  
Listen to local participant update on `meeting.self`:  
TypeScript  
```  
meeting.self.on("videoUpdate", ({ videoEnabled, videoTrack }) => {  
  // videoEnabled is false  
  // Update UI for the local participant  
});  
```

1. Check that the local participant has permission to disable other participants' video.

Kotlin

```

val canMuteVideo = meeting.localUser.permissions.host.canMuteVideo

if (!canMuteVideo) {

  // Disable the control in your UI.

}


```

1. Call `disableAllVideo()` on the participants object. If the local participant does not have the required permission, `disableAllVideo()` returns a `HostError`.

Kotlin

```

val error = meeting.participants.disableAllVideo()

if (error != null) {

  // Handle error - permission denied.

}


```

1. Handle the result by listening for updates. After the call succeeds, each participant's `videoEnabled` becomes `false`.

Kotlin

```

meeting.addParticipantsEventListener(object : RtkParticipantsEventListener {

  override fun onVideoUpdate(participant: RtkRemoteParticipant, isEnabled: Boolean) {

    // videoEnabled is false

    // Update UI for the participant

  }

})


```

1. Check that the local participant has permission to disable other participants' video.

Swift

```

let canMuteVideo = meeting.localUser.permissions.host.canMuteVideo

if !canMuteVideo {

  // Disable the control in your UI.

}


```

1. Call `disableAllVideo()` on the participants object. If the local participant does not have the required permission, `disableAllVideo()` returns a `HostError`.

Swift

```

if let error = meeting.participants.disableAllVideo() {

  // Handle error - permission denied.

}


```

1. Handle the result by listening for updates. After the call succeeds, each participant's `videoEnabled` becomes `false`.

Swift

```

extension MeetingViewModel: RtkParticipantsEventListener {

  func onVideoUpdate(participant: RtkRemoteParticipant, isEnabled: Bool) {

    // videoEnabled is false

    // Update UI for the participant

  }

}


// Register the listener

meeting.addParticipantsEventListener(participantsEventListener: self)


```

1. Check that the local participant has permission to disable other participants' video.

Dart

```

final canMuteVideo = meeting.localUser.permissions.host.canMuteVideo;

if (!canMuteVideo) {

  // Disable the control in your UI.

}


```

1. Call `disableAllVideo()` on the participants object.

Dart

```

meeting.participants.disableAllVideo(

  onResult: (error) {

    if (error != null) {

      // Handle error - permission denied or other issue.

      return;

    }

    // All video disabled successfully.

  },

);


```

1. Handle the result by listening for updates. After the call succeeds, each participant's `videoEnabled` becomes `false`.

Dart

```

class ParticipantsEventsListener extends RtkParticipantsEventListener {

  @override

  void onVideoUpdate(RtkRemoteParticipant participant, bool isEnabled) {

    // videoEnabled is false

    // Update UI for the participant

  }

}


// Register the listener

meeting.addParticipantsEventListener(ParticipantsEventsListener());


```

1. Check that the local participant has permission to disable other participants' video.

```

const canDisableParticipantVideo = meeting.self.permissions.canDisableParticipantVideo;

if (!canDisableParticipantVideo) {

  // Disable the control in your UI.

}


```

1. Call `disableAllVideo()` on the participants object.

```

meeting.participants

  .disableAllVideo(true)

  .catch((err) => {

    // Handle error - permission denied or other issue.

    console.log(err);

  });


```

1. Handle the result by listening for updates. After the call succeeds, each participant's `videoEnabled` becomes `false`.

```

meeting.participants.joined.on('videoUpdate', (participant) => {

  // participant.videoEnabled is false

  // Update UI for the participant

});


```

## Pin participants

Pin a participant to highlight them, such as a webinar presenter or classroom teacher. This is a session-wide action. All participants will see the pinned participant as the focus. This action requires the **Pin Participant** (`pin_participant`) host control permission enabled in the local participant's preset.

Note

Only one participant can be pinned at a time. Pinning a new participant automatically unpins the previous one.

### Pin a participant

To pin a participant in a session:

1. Check that the local participant has permission to pin participants.  
TypeScript  
```  
const canPinParticipant = meeting.self.permissions.pinParticipant === true;  
if (!canPinParticipant) {  
  // Disable the control in your UI.  
}  
```
2. Call `pin()` on the target participant.  
If the local participant does not have the required permission, `pin()` throws a `ClientError` with code `1201`.  
TypeScript  
```  
try {  
  await participant.pin();  
} catch (err: any) {  
  if (err?.code === 1201) {  
    // The local participant does not have permission to pin participants.  
    return;  
  }  
  throw err;  
}  
```
3. Handle the result by listening for updates.  
After the call succeeds:  
   * The target participant's `isPinned` becomes true.  
   * The participant is added to `meeting.participants.pinned`.  
   * The SDK emits a `pinned` event.  
**Option A**: Listen on the participant object  
TypeScript  
```  
participant.on("pinned", (updatedParticipant) => {  
  // updatedParticipant.isPinned is true  
  // Update your UI.  
});  
```  
**Option B**: Listen on the `joined` map  
TypeScript  
```  
meeting.participants.joined.on("pinned", (updatedParticipant) => {  
  // updatedParticipant.isPinned is true  
  // Update your UI.  
});  
```  
If there was an existing pinned participant before, then the SDK emits an `unpinned` event for that participant.
4. On the target pinned participant's side, `meeting.self.isPinned` becomes `true` and `meeting.self` emits `pinned`:  
TypeScript  
```  
meeting.self.on("pinned", (selfParticipant) => {  
  // Update the local UI to indicate the participant is pinned.  
});  
```

1. Check that the local participant has permission to pin participants.  
TypeScript  
```  
const canPinParticipant = meeting.self.permissions.pinParticipant === true;  
if (!canPinParticipant) {  
  // Disable the control in your UI.  
}  
```
2. Call `pin()` on the target participant.  
If the local participant does not have the required permission, `pin()` throws a `ClientError` with code `1201`.  
TypeScript  
```  
try {  
  await participant.pin();  
} catch (err: any) {  
  if (err?.code === 1201) {  
    // The local participant does not have permission to pin participants.  
    return;  
  }  
  throw err;  
}  
```
3. Handle the result by listening for updates.  
After the call succeeds:  
   * The target participant's `isPinned` becomes true.  
   * The participant is added to `meeting.participants.pinned`.  
   * The SDK emits a `pinned` event.  
**Option A**: Listen on the participant object  
TypeScript  
```  
participant.on("pinned", (updatedParticipant) => {  
  // updatedParticipant.isPinned is true  
  // Update your UI.  
});  
```  
**Option B**: Listen on the `joined` map  
TypeScript  
```  
meeting.participants.joined.on("pinned", (updatedParticipant) => {  
  // updatedParticipant.isPinned is true  
  // Update your UI.  
});  
```  
If there was an existing pinned participant before, then the SDK emits an `unpinned` event for that participant.
4. On the target pinned participant's side, `meeting.self.isPinned` becomes `true` and `meeting.self` emits `pinned`:  
TypeScript  
```  
meeting.self.on("pinned", (selfParticipant) => {  
  // Update the local UI to indicate the participant is pinned.  
});  
```

1. Check that the local participant has permission to pin participants.  
TypeScript  
```  
const canPinParticipant = meeting.self.permissions.pinParticipant === true;  
if (!canPinParticipant) {  
  // Disable the control in your UI.  
}  
```
2. Call `pin()` on the target participant.  
If the local participant does not have the required permission, `pin()` throws a `ClientError` with code `1201`.  
TypeScript  
```  
try {  
  await participant.pin();  
} catch (err: any) {  
  if (err?.code === 1201) {  
    // The local participant does not have permission to pin participants.  
    return;  
  }  
  throw err;  
}  
```
3. Handle the result by listening for updates.  
After the call succeeds:  
   * The target participant's `isPinned` becomes true.  
   * The participant is added to `meeting.participants.pinned`.  
   * The SDK emits a `pinned` event.  
**Option A**: Listen on the participant object  
TypeScript  
```  
participant.on("pinned", (updatedParticipant) => {  
  // updatedParticipant.isPinned is true  
  // Update your UI.  
});  
```  
**Option B**: Listen on the `joined` map  
TypeScript  
```  
meeting.participants.joined.on("pinned", (updatedParticipant) => {  
  // updatedParticipant.isPinned is true  
  // Update your UI.  
});  
```  
If there was an existing pinned participant before, then the SDK emits an `unpinned` event for that participant.
4. On the target pinned participant's side, `meeting.self.isPinned` becomes `true` and `meeting.self` emits `pinned`:  
TypeScript  
```  
meeting.self.on("pinned", (selfParticipant) => {  
  // Update the local UI to indicate the participant is pinned.  
});  
```

1. Check that the local participant has permission to pin participants.

Kotlin

```

val canPinParticipant = meeting.localUser.permissions.host.canPinParticipant

if (!canPinParticipant) {

  // Disable the control in your UI.

}


```

1. Call `pin()` on the target participant. If the local participant does not have the required permission, `pin()` returns a `HostError`.

Kotlin

```

val error = participant.pin()

if (error != null) {

  // Handle error - permission denied.

}


```

1. Handle the result by listening for updates. After the call succeeds, the target participant's `isPinned` becomes `true` and the participant is available in `meeting.participants.pinned`.

Kotlin

```

meeting.addParticipantsEventListener(object : RtkParticipantsEventListener {

  override fun onParticipantPinned(participant: RtkRemoteParticipant) {

    // participant.isPinned is true

    // Update your UI.

  }

})


```

1. Check that the local participant has permission to pin participants.

Swift

```

let canPinParticipant = meeting.localUser.permissions.host.canPinParticipant

if !canPinParticipant {

  // Disable the control in your UI.

}


```

1. Call `pin()` on the target participant. If the local participant does not have the required permission, `pin()` returns a `HostError`.

Swift

```

if let error = participant.pin() {

  // Handle error - permission denied.

}


```

1. Handle the result by listening for updates. After the call succeeds, the target participant's `isPinned` becomes `true` and the participant is available in `meeting.participants.pinned`.

Swift

```

extension MeetingViewModel: RtkParticipantsEventListener {

  func onParticipantPinned(participant: RtkRemoteParticipant) {

    // participant.isPinned is true

    // Update your UI.

  }

}


// Register the listener

meeting.addParticipantsEventListener(participantsEventListener: self)


```

1. Check that the local participant has permission to pin participants.

Dart

```

final canPinParticipant = meeting.localUser.permissions.host.canPinParticipant;

if (!canPinParticipant) {

  // Disable the control in your UI.

}


```

1. Call `pin()` on the target participant.

Dart

```

participant.pin();


```

1. Handle the result by listening for updates. After the call succeeds, the target participant's `isPinned` becomes `true` and the participant is available in `meeting.participants.pinned`.

Dart

```

class ParticipantsEventsListener extends RtkParticipantsEventListener {

  @override

  void onParticipantPinned(RtkRemoteParticipant participant) {

    // participant.isPinned is true

    // Update your UI.

  }

}


// Register the listener

meeting.addParticipantsEventListener(ParticipantsEventsListener());


```

1. Check that the local participant has permission to pin participants.

```

const canPinParticipant = meeting.self.permissions.pinParticipant;

if (!canPinParticipant) {

  // Disable the control in your UI.

}


```

1. Call `pin()` on the target participant.

```

participant.pin();


```

1. Handle the result by listening for updates. After the call succeeds, the target participant's `isPinned` becomes `true` and the participant is available in `meeting.participants.pinned`.

```

meeting.participants.pinned.on('participantPinned', (participant) => {

  // participant.isPinned is true

  // Update your UI.

});


```

### Unpin a participant

Unpin a participant when you need to undo the highlight and return the session to a standard grid or active speaker view. To unpin a pinned participant in a session:

1. Check that the local participant has permission to unpin participants.  
TypeScript  
```  
const canUnpinParticipant = meeting.self.permissions.pinParticipant === true;  
if (!canUnpinParticipant) {  
  // Disable the control in your UI.  
}  
```
2. Call `unpin()` on the target participant.  
If the local participant does not have the required permission, `unpin()` throws a `ClientError` with code `1201`.  
TypeScript  
```  
try {  
  await participant.unpin();  
} catch (err: any) {  
  if (err?.code === 1201) {  
    // The local participant does not have permission to unpin participants.  
    return;  
  }  
  throw err;  
}  
```
3. Handle the result by listening for updates.  
After the call succeeds:  
   * The target participant's `isPinned` becomes `false`.  
   * The participant is removed from `meeting.participants.pinned`.  
   * The SDK emits an `unpinned` event.  
**Option A**: Listen on the participant object  
TypeScript  
```  
participant.on("unpinned", (updatedParticipant) => {  
  // updatedParticipant.isPinned is false  
  // Update your UI.  
});  
```  
**Option B**: Listen on the `joined` map  
TypeScript  
```  
meeting.participants.joined.on("unpinned", (updatedParticipant) => {  
  // updatedParticipant.isPinned is false  
  // Update your UI.  
});  
```
4. On the target unpinned participant's side, `meeting.self.isPinned` becomes `false` and `meeting.self` emits `unpinned`:  
TypeScript  
```  
meeting.self.on("unpinned", (selfParticipant) => {  
  // Update the local UI to indicate the participant is no longer pinned.  
});  
```

1. Check that the local participant has permission to unpin participants.  
TypeScript  
```  
const canUnpinParticipant = meeting.self.permissions.pinParticipant === true;  
if (!canUnpinParticipant) {  
  // Disable the control in your UI.  
}  
```
2. Call `unpin()` on the target participant.  
If the local participant does not have the required permission, `unpin()` throws a `ClientError` with code `1201`.  
TypeScript  
```  
try {  
  await participant.unpin();  
} catch (err: any) {  
  if (err?.code === 1201) {  
    // The local participant does not have permission to unpin participants.  
    return;  
  }  
  throw err;  
}  
```
3. Handle the result by listening for updates.  
After the call succeeds:  
   * The target participant's `isPinned` becomes `false`.  
   * The participant is removed from `meeting.participants.pinned`.  
   * The SDK emits an `unpinned` event.  
**Option A**: Listen on the participant object  
TypeScript  
```  
participant.on("unpinned", (updatedParticipant) => {  
  // updatedParticipant.isPinned is false  
  // Update your UI.  
});  
```  
**Option B**: Listen on the `joined` map  
TypeScript  
```  
meeting.participants.joined.on("unpinned", (updatedParticipant) => {  
  // updatedParticipant.isPinned is false  
  // Update your UI.  
});  
```
4. On the target unpinned participant's side, `meeting.self.isPinned` becomes `false` and `meeting.self` emits `unpinned`:  
TypeScript  
```  
meeting.self.on("unpinned", (selfParticipant) => {  
  // Update the local UI to indicate the participant is no longer pinned.  
});  
```

1. Check that the local participant has permission to unpin participants.  
TypeScript  
```  
const canUnpinParticipant = meeting.self.permissions.pinParticipant === true;  
if (!canUnpinParticipant) {  
  // Disable the control in your UI.  
}  
```
2. Call `unpin()` on the target participant.  
If the local participant does not have the required permission, `unpin()` throws a `ClientError` with code `1201`.  
TypeScript  
```  
try {  
  await participant.unpin();  
} catch (err: any) {  
  if (err?.code === 1201) {  
    // The local participant does not have permission to unpin participants.  
    return;  
  }  
  throw err;  
}  
```
3. Handle the result by listening for updates.  
After the call succeeds:  
   * The target participant's `isPinned` becomes `false`.  
   * The participant is removed from `meeting.participants.pinned`.  
   * The SDK emits an `unpinned` event.  
**Option A**: Listen on the participant object  
TypeScript  
```  
participant.on("unpinned", (updatedParticipant) => {  
  // updatedParticipant.isPinned is false  
  // Update your UI.  
});  
```  
**Option B**: Listen on the `joined` map  
TypeScript  
```  
meeting.participants.joined.on("unpinned", (updatedParticipant) => {  
  // updatedParticipant.isPinned is false  
  // Update your UI.  
});  
```
4. On the target unpinned participant's side, `meeting.self.isPinned` becomes `false` and `meeting.self` emits `unpinned`:  
TypeScript  
```  
meeting.self.on("unpinned", (selfParticipant) => {  
  // Update the local UI to indicate the participant is no longer pinned.  
});  
```

1. Check that the local participant has permission to unpin participants.

Kotlin

```

val canPinParticipant = meeting.localUser.permissions.host.canPinParticipant

if (!canPinParticipant) {

  // Disable the control in your UI.

}


```

1. Call `unpin()` on the target participant. If the local participant does not have the required permission, `unpin()` returns a `HostError`.

Kotlin

```

val error = participant.unpin()

if (error != null) {

  // Handle error - permission denied.

}


```

1. Handle the result by listening for updates. After the call succeeds, the target participant's `isPinned` becomes `false`.

Kotlin

```

meeting.addParticipantsEventListener(object : RtkParticipantsEventListener {

  override fun onParticipantUnpinned(participant: RtkRemoteParticipant) {

    // participant.isPinned is false

    // Update your UI.

  }

})


```

1. Check that the local participant has permission to unpin participants.

Swift

```

let canPinParticipant = meeting.localUser.permissions.host.canPinParticipant

if !canPinParticipant {

  // Disable the control in your UI.

}


```

1. Call `unpin()` on the target participant. If the local participant does not have the required permission, `unpin()` returns a `HostError`.

Swift

```

if let error = participant.unpin() {

  // Handle error - permission denied.

}


```

1. Handle the result by listening for updates. After the call succeeds, the target participant's `isPinned` becomes `false`.

Swift

```

extension MeetingViewModel: RtkParticipantsEventListener {

  func onParticipantUnpinned(participant: RtkRemoteParticipant) {

    // participant.isPinned is false

    // Update your UI.

  }

}


// Register the listener

meeting.addParticipantsEventListener(participantsEventListener: self)


```

1. Check that the local participant has permission to unpin participants.

Dart

```

final canPinParticipant = meeting.localUser.permissions.host.canPinParticipant;

if (!canPinParticipant) {

  // Disable the control in your UI.

}


```

1. Call `unpin()` on the target participant.

Dart

```

participant.unpin();


```

1. Handle the result by listening for updates. After the call succeeds, the target participant's `isPinned` becomes `false`.

Dart

```

class ParticipantsEventsListener extends RtkParticipantsEventListener {

  @override

  void onParticipantUnpinned(RtkRemoteParticipant participant) {

    // participant.isPinned is false

    // Update your UI.

  }

}


// Register the listener

meeting.addParticipantsEventListener(ParticipantsEventsListener());


```

1. Check that the local participant has permission to unpin participants.

```

const canPinParticipant = meeting.self.permissions.pinParticipant;

if (!canPinParticipant) {

  // Disable the control in your UI.

}


```

1. Call `unpin()` on the target participant.

```

participant.unpin();


```

1. Handle the result by listening for updates. After the call succeeds, the target participant's `isPinned` becomes `false`.

```

meeting.participants.pinned.on('unpinned', (participant) => {

  // participant.isPinned is false

  // Update your UI.

});


```

## Remove participants

Remove participants from the session when you need to moderate disruptive behavior or enforce session rules. This action requires the **Kick Participants** (`kick_participant`) host control permission enabled in the local participant's preset.

### Remove a participant

To remove a specific participant from the session:

1. Check that the local participant has permission to remove participants.  
TypeScript  
```  
const canKickParticipant = meeting.self.permissions.kickParticipant === true;  
if (!canKickParticipant) {  
  // Disable the control in your UI.  
}  
```
2. Call `kick()` on the target participant.  
If the local participant does not have the required permission, `kick()` throws a `ClientError` with code `1201`.  
TypeScript  
```  
try {  
  await participant.kick();  
} catch (err: any) {  
  if (err?.code === 1201) {  
    // The local participant does not have permission to remove participants.  
    return;  
  }  
  throw err;  
}  
```
3. Handle the result by listening for updates.  
After the call succeeds:  
   * The kicked participant is removed from `meeting.participants.joined`.  
   * The participant is removed from other participant maps they were in (for example, `meeting.participants.pinned`).  
   * The SDK emits `participantLeft` on `meeting.participants.joined`.  
TypeScript  
```  
meeting.participants.joined.on("participantLeft", (participant) => {  
  // Remove the participant tile from the UI.  
});  
```  
Other participants in the session also observe the participant leaving through `participantLeft`.
4. On the removed participant's side, the session disconnects and `meeting.self` emits `roomLeft` event with state set to `kicked`.  
TypeScript  
```  
meeting.self.on("roomLeft", ({ state }) => {  
  if (state === "kicked") {  
    // Show a message and navigate the user out of the meeting UI.  
  }  
});  
```

1. Check that the local participant has permission to remove participants.  
TypeScript  
```  
const canKickParticipant = meeting.self.permissions.kickParticipant === true;  
if (!canKickParticipant) {  
  // Disable the control in your UI.  
}  
```
2. Call `kick()` on the target participant.  
If the local participant does not have the required permission, `kick()` throws a `ClientError` with code `1201`.  
TypeScript  
```  
try {  
  await participant.kick();  
} catch (err: any) {  
  if (err?.code === 1201) {  
    // The local participant does not have permission to remove participants.  
    return;  
  }  
  throw err;  
}  
```
3. Handle the result by listening for updates.  
After the call succeeds:  
   * The kicked participant is removed from `meeting.participants.joined`.  
   * The participant is removed from other participant maps they were in (for example, `meeting.participants.pinned`).  
   * The SDK emits `participantLeft` on `meeting.participants.joined`.  
TypeScript  
```  
meeting.participants.joined.on("participantLeft", (participant) => {  
  // Remove the participant tile from the UI.  
});  
```  
Other participants in the session also observe the participant leaving through `participantLeft`.
4. On the removed participant's side, the session disconnects and `meeting.self` emits `roomLeft` event with state set to `kicked`.  
TypeScript  
```  
meeting.self.on("roomLeft", ({ state }) => {  
  if (state === "kicked") {  
    // Show a message and navigate the user out of the meeting UI.  
  }  
});  
```

1. Check that the local participant has permission to remove participants.  
TypeScript  
```  
const canKickParticipant = meeting.self.permissions.kickParticipant === true;  
if (!canKickParticipant) {  
  // Disable the control in your UI.  
}  
```
2. Call `kick()` on the target participant.  
If the local participant does not have the required permission, `kick()` throws a `ClientError` with code `1201`.  
TypeScript  
```  
try {  
  await participant.kick();  
} catch (err: any) {  
  if (err?.code === 1201) {  
    // The local participant does not have permission to remove participants.  
    return;  
  }  
  throw err;  
}  
```
3. Handle the result by listening for updates.  
After the call succeeds:  
   * The kicked participant is removed from `meeting.participants.joined`.  
   * The participant is removed from other participant maps they were in (for example, `meeting.participants.pinned`).  
   * The SDK emits `participantLeft` on `meeting.participants.joined`.  
TypeScript  
```  
meeting.participants.joined.on("participantLeft", (participant) => {  
  // Remove the participant tile from the UI.  
});  
```  
Other participants in the session also observe the participant leaving through `participantLeft`.
4. On the removed participant's side, the session disconnects and `meeting.self` emits `roomLeft` event with state set to `kicked`.  
TypeScript  
```  
meeting.self.on("roomLeft", ({ state }) => {  
  if (state === "kicked") {  
    // Show a message and navigate the user out of the meeting UI.  
  }  
});  
```

1. Check that the local participant has permission to remove participants.

Kotlin

```

val canKickParticipant = meeting.localUser.permissions.host.canKickParticipant

if (!canKickParticipant) {

  // Disable the control in your UI.

}


```

1. Call `kick()` on the target participant. If the local participant does not have the required permission, `kick()` returns a `HostError`.

Kotlin

```

val error = participant.kick()

if (error != null) {

  // Handle error - permission denied.

}


```

1. Handle the result by listening for updates. After the call succeeds, the kicked participant is removed from `meeting.participants.joined`.

Kotlin

```

meeting.addParticipantsEventListener(object : RtkParticipantsEventListener {

  override fun onParticipantLeave(participant: RtkRemoteParticipant) {

    // Remove the participant tile from the UI.

  }

})


```

1. Check that the local participant has permission to remove participants.

Swift

```

let canKickParticipant = meeting.localUser.permissions.host.canKickParticipant

if !canKickParticipant {

  // Disable the control in your UI.

}


```

1. Call `kick()` on the target participant. If the local participant does not have the required permission, `kick()` returns a `HostError`.

Swift

```

if let error = participant.kick() {

  // Handle error - permission denied.

}


```

1. Handle the result by listening for updates. After the call succeeds, the kicked participant is removed from `meeting.participants.joined`.

Swift

```

extension MeetingViewModel: RtkParticipantsEventListener {

  func onParticipantLeave(participant: RtkRemoteParticipant) {

    // Remove the participant tile from the UI.

  }

}


// Register the listener

meeting.addParticipantsEventListener(participantsEventListener: self)


```

1. Check that the local participant has permission to remove participants.

Dart

```

final canKickParticipant = meeting.localUser.permissions.host.canKickParticipant;

if (!canKickParticipant) {

  // Disable the control in your UI.

}


```

1. Call `kick()` on the target participant.

Dart

```

participant.kick(

  onResult: (error) {

    if (error != null) {

      // Handle error - permission denied or other issue.

      return;

    }

    // Participant removed successfully.

  },

);


```

1. Handle the result by listening for updates. After the call succeeds, the kicked participant is removed from `meeting.participants.joined`.

Dart

```

class ParticipantsEventsListener extends RtkParticipantsEventListener {

  @override

  void onParticipantLeave(RtkRemoteParticipant participant) {

    // Remove the participant tile from the UI.

  }

}


// Register the listener

meeting.addParticipantsEventListener(ParticipantsEventsListener());


```

1. Check that the local participant has permission to remove participants.

```

const canKickParticipant = meeting.self.permissions.kickParticipant;

if (!canKickParticipant) {

  // Disable the control in your UI.

}


```

1. Call `kick()` on the target participant.

```

participant

  .kick()

  .catch((err) => {

    // Handle error - permission denied or other issue.

    console.log(err);

  });


```

1. Handle the result by listening for updates. After the call succeeds, the kicked participant is removed from `meeting.participants.joined`.

```

meeting.participants.joined.on('participantLeft', (participant) => {

  // Remove the participant tile from the UI.

});


```

### Remove all participants

This removes everyone from the session, including the local participant. This ends the session for everyone.

For a complete end-a-session flow, refer to [End a session](https://developers.cloudflare.com/realtime/realtimekit/core/end-a-session/).

To remove all participants from the session:

1. Check that the local participant has permission to remove participants.  
TypeScript  
```  
const canKickParticipant = meeting.self.permissions.kickParticipant === true;  
if (!canKickParticipant) {  
  // Disable the control in your UI.  
}  
```
2. Call `kickAll()`.  
If the local participant does not have the required permission, `kickAll()` throws a `ClientError` with code `1201`.  
TypeScript  
```  
try {  
  await meeting.participants.kickAll();  
} catch (err: any) {  
  if (err?.code === 1201) {  
    // The local participant does not have permission to remove participants.  
    return;  
  }  
  throw err;  
}  
```
3. Handle the result by listening for updates.  
After the call succeeds, all participants exit the session. On each client, `meeting.self` emits `roomLeft` with state set to `ended`.  
TypeScript  
```  
meeting.self.on("roomLeft", ({ state }) => {  
  if (state === "ended") {  
    // Show a message and navigate the user out of the meeting UI.  
  }  
});  
```

1. Check that the local participant has permission to remove participants.  
TypeScript  
```  
const canKickParticipant = meeting.self.permissions.kickParticipant === true;  
if (!canKickParticipant) {  
  // Disable the control in your UI.  
}  
```
2. Call `kickAll()`.  
If the local participant does not have the required permission, `kickAll()` throws a `ClientError` with code `1201`.  
TypeScript  
```  
try {  
  await meeting.participants.kickAll();  
} catch (err: any) {  
  if (err?.code === 1201) {  
    // The local participant does not have permission to remove participants.  
    return;  
  }  
  throw err;  
}  
```
3. Handle the result by listening for updates.  
After the call succeeds, all participants exit the session. On each client, `meeting.self` emits `roomLeft` with state set to `ended`.  
TypeScript  
```  
meeting.self.on("roomLeft", ({ state }) => {  
  if (state === "ended") {  
    // Show a message and navigate the user out of the meeting UI.  
  }  
});  
```

1. Check that the local participant has permission to remove participants.  
TypeScript  
```  
const canKickParticipant = meeting.self.permissions.kickParticipant === true;  
if (!canKickParticipant) {  
  // Disable the control in your UI.  
}  
```
2. Call `kickAll()`.  
If the local participant does not have the required permission, `kickAll()` throws a `ClientError` with code `1201`.  
TypeScript  
```  
try {  
  await meeting.participants.kickAll();  
} catch (err: any) {  
  if (err?.code === 1201) {  
    // The local participant does not have permission to remove participants.  
    return;  
  }  
  throw err;  
}  
```
3. Handle the result by listening for updates.  
After the call succeeds, all participants exit the session. On each client, `meeting.self` emits `roomLeft` with state set to `ended`.  
TypeScript  
```  
meeting.self.on("roomLeft", ({ state }) => {  
  if (state === "ended") {  
    // Show a message and navigate the user out of the meeting UI.  
  }  
});  
```

1. Check that the local participant has permission to remove participants.

Kotlin

```

val canKickParticipant = meeting.localUser.permissions.host.canKickParticipant

if (!canKickParticipant) {

  // Disable the control in your UI.

}


```

1. Call `kickAll()` on the participants object. If the local participant does not have the required permission, `kickAll()` returns a `HostError`.

Kotlin

```

val error = meeting.participants.kickAll()

if (error != null) {

  // Handle error - permission denied.

}


```

1. Handle the result by listening for updates. After the call succeeds, all participants exit the session.

Kotlin

```

meeting.addMeetingRoomEventListener(object : RtkMeetingRoomEventListener {

  override fun onMeetingEnded() {

    // Show a message and navigate the user out of the meeting UI.

  }

})


```

1. Check that the local participant has permission to remove participants.

Swift

```

let canKickParticipant = meeting.localUser.permissions.host.canKickParticipant

if !canKickParticipant {

  // Disable the control in your UI.

}


```

1. Call `kickAll()` on the participants object. If the local participant does not have the required permission, `kickAll()` returns a `HostError`.

Swift

```

if let error = meeting.participants.kickAll() {

  // Handle error - permission denied.

}


```

1. Handle the result by listening for updates. After the call succeeds, all participants exit the session.

Swift

```

extension MeetingViewModel: RtkMeetingRoomEventListener {

  func onMeetingEnded() {

    // Show a message and navigate the user out of the meeting UI.

  }

}


// Register the listener

meeting.addMeetingRoomEventListener(meetingRoomEventListener: self)


```

1. Check that the local participant has permission to remove participants.

Dart

```

final canKickParticipant = meeting.localUser.permissions.host.canKickParticipant;

if (!canKickParticipant) {

  // Disable the control in your UI.

}


```

1. Call `kickAll()` on the participants object.

Dart

```

meeting.participants.kickAll(

  onResult: (error) {

    if (error != null) {

      // Handle error - permission denied or other issue.

      return;

    }

    // All participants removed successfully.

  },

);


```

1. Handle the result by listening for updates. After the call succeeds, all participants exit the session.

Dart

```

class MeetingRoomEventsListener extends RtkMeetingRoomEventListener {

  @override

  void onMeetingEnded() {

    // Show a message and navigate the user out of the meeting UI.

  }

}


// Register the listener

meeting.addMeetingRoomEventListener(MeetingRoomEventsListener());


```

1. Check that the local participant has permission to remove participants.

```

const canKickParticipant = meeting.self.permissions.kickParticipant;

if (!canKickParticipant) {

  // Disable the control in your UI.

}


```

1. Call `kickAll()` on the participants object.

```

meeting.participants

  .kickAll()

  .catch((err) => {

    // Handle error - permission denied or other issue.

    console.log(err);

  });


```

1. Handle the result by listening for updates. After the call succeeds, all participants exit the session.

```

meeting.self.on('roomLeft', ({ state }) => {

  if (state === 'kicked') {

    // Show a message and navigate the user out of the meeting UI.

  }

});


```

## Next steps

* Review how presets control permissions in [Preset](https://developers.cloudflare.com/realtime/realtimekit/concepts/preset/).
* Review error handling details in [Error Codes](https://developers.cloudflare.com/realtime/realtimekit/core/error-codes/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/manage-participants-in-a-session/#page","headline":"Manage Participants in a Session · Cloudflare Realtime docs","description":"Use RealtimeKit host controls to mute, pin, or remove participants in a live session.","url":"https://developers.cloudflare.com/realtime/realtimekit/core/manage-participants-in-a-session/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/core/","name":"Build using Core SDK"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/core/manage-participants-in-a-session/","name":"Manage Participants in a Session"}}]}
```
