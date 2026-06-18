---
title: Meeting Metadata
description: Access meeting state, type, and connection metadata in the RealtimeKit Core SDK.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Meeting Metadata

All metadata pertaining to a meeting is stored in `meeting.meta`. This includes important information about the meeting state, type, and connections.

WebMobile

ReactWeb ComponentsAngular

## Available metadata

Select a framework based on the platform you are building for.

The `meeting.meta` object contains the following properties:

* **`viewType`** \- Indicates the type of the meeting. Possible values are `WEBINAR`, `GROUP_CALL`
* **`roomType`** \- Indicates whether the meeting is a group-call or a webinar
* **`meetingTitle`** \- The title of the meeting
* **`meetingStartedTimestamp`** \- The timestamp when the meeting started
* **`mediaState`** \- Media connection state
* **`socketState`** \- Socket connection state

The `meeting.meta` object contains the following properties:

* **`viewType`** \- Indicates the type of the meeting. Possible values are `WEBINAR`, `GROUP_CALL`
* **`roomType`** \- Indicates whether the meeting is a group-call or a webinar
* **`meetingTitle`** \- The title of the meeting
* **`meetingStartedTimestamp`** \- The timestamp when the meeting started
* **`mediaState`** \- Media connection state
* **`socketState`** \- Socket connection state

The `meeting.meta` object contains the following properties:

* **`meetingId`** \- The unique identifier of the meeting
* **`meetingTitle`** \- The title of the meeting
* **`meetingStartedTimestamp`** \- The timestamp when the meeting started
* **`meetingType`** \- Indicates the meeting type, which can be one of `GROUP_CALL`, `WEBINAR`, `AUDIO_ROOM`, or `LIVESTREAM` from the `RtkMeetingType` enum
* **`meetingConfig`** \- The configuration of the meeting containing audio and video settings
* **`meetingState`** \- The state of the meeting of type `RtkMeetingState`
* **`authToken`** \- User's authentication token for the meeting
* **`selfActiveTab`** \- Information about the currently active tab for the local participant
* **`mediaConnectionState`** \- The current state of the media connection
* **`socketConnectionState`** \- The current state of the socket connection

The `meeting.meta` object contains the following properties:

* **`meetingId`** \- The unique identifier of the meeting
* **`meetingTitle`** \- The title of the meeting
* **`meetingStartedTimestamp`** \- The timestamp when the meeting started
* **`meetingType`** \- Indicates the meeting type, which can be one of `.groupCall`, `.webinar`, `.audioRoom`, or `.livestream` from the `RtkMeetingType` enum
* **`meetingConfig`** \- The configuration of the meeting containing audio and video settings
* **`meetingState`** \- The state of the meeting of type `RtkMeetingState`
* **`authToken`** \- User's authentication token for the meeting
* **`selfActiveTab`** \- Information about the currently active tab for the local participant
* **`mediaConnectionState`** \- The current state of the media connection
* **`socketConnectionState`** \- The current state of the socket connection

The `meeting.meta` object contains the following properties:

* **`meetingId`** \- The unique identifier of the meeting
* **`meetingTitle`** \- The title of the meeting
* **`meetingStartedTimestamp`** \- The timestamp when the meeting started
* **`meetingType`** \- Indicates the meeting type, which can be one of `groupCall`, `webinar`, or `livestream` from the `RtkMeetingType` enum
* **`activeTab`** \- Information about the currently active tab for the local participant

The `meeting.meta` object contains the following properties:

* **`viewType`** \- Indicates the type of the meeting. Possible values are `WEBINAR`, `GROUP_CALL`
* **`roomType`** \- Indicates whether the meeting is a group-call or a webinar
* **`meetingTitle`** \- The title of the meeting
* **`meetingStartedTimestamp`** \- The timestamp when the meeting started
* **`mediaState`** \- Media connection state
* **`socketState`** \- Socket connection state

## Access meeting metadata

To access meeting metadata, use the `meeting.meta` object.

JavaScript

```

// Destructure the metadata to get meetingTitle

const { meetingTitle } = meeting.meta;


if (meeting.self.roomJoined) {

  console.log(

    `The local user has joined a meeting with title ${meetingTitle}.`,

  );

}


```

```

import { useRealtimeKitSelector } from "@cloudflare/realtimekit-react";

import { useEffect } from "react";


function MeetingInfo() {

  const [meetingTitle, roomJoined] = useRealtimeKitSelector((m) => [

    m.meta.meetingTitle,

    m.self.roomJoined,

  ]);


  useEffect(() => {

    if (roomJoined) {

      console.log(

        `The local user has joined a meeting with title ${meetingTitle}.`,

      );

    }

  }, [roomJoined, meetingTitle]);


  return null;

}


```

Kotlin

```

val meetingTitle = meeting.meta.meetingTitle


```

Swift

```

let meetingTitle = meeting.meta.meetingTitle


```

Dart

```

final meetingTitle = meeting.meta.meetingTitle;

print("The local user has joined ${meetingTitle}.");


```

```

import { useRealtimeKitSelector } from "@cloudflare/realtimekit-react-native";

import { useEffect } from "react";


const [meetingTitle, roomJoined] = useRealtimeKitSelector((m) => [

  m.meta.meetingTitle,

  m.self.roomJoined,

]);


useEffect(() => {

  if (roomJoined) {

    console.log(

      `The local user has joined a meeting with title ${meetingTitle}.`,

    );

  }

}, [roomJoined, meetingTitle]);


```

## Connection events

The `meta` object also emits events for indicating changes in the connection state of the meeting.

### Media connection updates

Updates to the media connection (WebRTC connection used for the transfer of actual media) are sent via the `mediaConnectionUpdate` event.

JavaScript

```

meeting.meta.on("mediaConnectionUpdate", ({ transport, state }) => {

  // transport - 'consuming' | 'producing'

  // state - 'new' | 'connecting' | 'connected' | 'disconnected' | 'reconnecting' | 'failed'


  console.log(`Media connection ${transport} is now ${state}`);

});


```

The `mediaConnectionUpdate` event provides:

* **`transport`** \- Either `'consuming'` (receiving media) or `'producing'` (sending media)
* **`state`** \- Connection state: `'new'`, `'connecting'`, `'connected'`, `'disconnected'`, `'reconnecting'`, or `'failed'`

Updates to the media connection (WebRTC connection used for the transfer of actual media) are sent via the `mediaConnectionUpdate` event.

```

import { useRealtimeKitClient } from "@cloudflare/realtimekit-react";

import { useEffect } from "react";


function MediaConnectionMonitor() {

  const [meeting] = useRealtimeKitClient();


  useEffect(() => {

    if (meeting) {

      const handleMediaConnection = ({ transport, state }) => {

        // transport - 'consuming' | 'producing'

        // state - 'new' | 'connecting' | 'connected' | 'disconnected' | 'reconnecting' | 'failed'


        console.log(`Media connection ${transport} is now ${state}`);

      };


      meeting.meta.on("mediaConnectionUpdate", handleMediaConnection);


      return () => {

        meeting.meta.off("mediaConnectionUpdate", handleMediaConnection);

      };

    }

  }, [meeting]);


  return null;

}


```

The `mediaConnectionUpdate` event provides:

* **`transport`** \- Either `'consuming'` (receiving media) or `'producing'` (sending media)
* **`state`** \- Connection state: `'new'`, `'connecting'`, `'connected'`, `'disconnected'`, `'reconnecting'`, or `'failed'`

You can access the current media connection state directly from the metadata.

Kotlin

```

val mediaConnectionState = meeting.meta.mediaConnectionState


```

You can access the current media connection state directly from the metadata.

Swift

```

let mediaConnectionState = meeting.meta.mediaConnectionState


```

Media connection events are not available in Flutter. Monitor the connection state through the meeting state changes.

Updates to the media connection (WebRTC connection used for the transfer of actual media) are sent via the `mediaConnectionUpdate` event.

```

meeting.meta.on("mediaConnectionUpdate", ({ transport, state }) => {

  // transport - 'consuming' | 'producing'

  // state - 'new' | 'connecting' | 'connected' | 'disconnected' | 'reconnecting' | 'failed'


  console.log(`Media connection ${transport} is now ${state}`);

});


```

The `mediaConnectionUpdate` event provides:

* **`transport`** \- Either `'consuming'` (receiving media) or `'producing'` (sending media)
* **`state`** \- Connection state: `'new'`, `'connecting'`, `'connected'`, `'disconnected'`, `'reconnecting'`, or `'failed'`

### Socket connection updates

Updates to the WebSocket connection (used for chat, polls, and other basic signaling) are sent via the `socketConnectionUpdate` event.

JavaScript

```

meeting.meta.on(

  "socketConnectionUpdate",

  ({ state, reconnectionAttempt, reconnected }) => {

    // state - 'connected' | 'disconnected' | 'reconnecting' | 'failed'


    console.log(`Socket connection is now ${state}`);


    if (reconnectionAttempt) {

      console.log(`Reconnection attempt: ${reconnectionAttempt}`);

    }


    if (reconnected) {

      console.log("Successfully reconnected");

    }

  },

);


```

The `socketConnectionUpdate` event provides:

* **`state`** \- Connection state: `'connected'`, `'disconnected'`, `'reconnecting'`, or `'failed'`
* **`reconnectionAttempt`** \- The number of reconnection attempts made (if reconnecting)
* **`reconnected`** \- Boolean indicating if the connection was successfully reestablished

Updates to the WebSocket connection (used for chat, polls, and other basic signaling) are sent via the `socketConnectionUpdate` event.

```

import { useRealtimeKitClient } from "@cloudflare/realtimekit-react";

import { useEffect } from "react";


function SocketConnectionMonitor() {

  const [meeting] = useRealtimeKitClient();


  useEffect(() => {

    if (meeting) {

      const handleSocketConnection = ({

        state,

        reconnectionAttempt,

        reconnected,

      }) => {

        // state - 'connected' | 'disconnected' | 'reconnecting' | 'failed'


        console.log(`Socket connection is now ${state}`);


        if (reconnectionAttempt) {

          console.log(`Reconnection attempt: ${reconnectionAttempt}`);

        }


        if (reconnected) {

          console.log("Successfully reconnected");

        }

      };


      meeting.meta.on("socketConnectionUpdate", handleSocketConnection);


      return () => {

        meeting.meta.off("socketConnectionUpdate", handleSocketConnection);

      };

    }

  }, [meeting]);


  return null;

}


```

The `socketConnectionUpdate` event provides:

* **`state`** \- Connection state: `'connected'`, `'disconnected'`, `'reconnecting'`, or `'failed'`
* **`reconnectionAttempt`** \- The number of reconnection attempts made (if reconnecting)
* **`reconnected`** \- Boolean indicating if the connection was successfully reestablished

You can access the current socket connection state directly from the metadata.

Kotlin

```

val socketConnectionState = meeting.meta.socketConnectionState


```

You can access the current socket connection state directly from the metadata.

Swift

```

let socketConnectionState = meeting.meta.socketConnectionState


```

Socket connection events are not available in Flutter. Monitor the connection state through the meeting state changes.

Updates to the WebSocket connection (used for chat, polls, and other basic signaling) are sent via the `socketConnectionUpdate` event.

```

meeting.meta.on(

  "socketConnectionUpdate",

  ({ state, reconnectionAttempt, reconnected }) => {

    // state - 'connected' | 'disconnected' | 'reconnecting' | 'failed'


    console.log(`Socket connection is now ${state}`);


    if (reconnectionAttempt) {

      console.log(`Reconnection attempt: ${reconnectionAttempt}`);

    }


    if (reconnected) {

      console.log("Successfully reconnected");

    }

  },

);


```

The `socketConnectionUpdate` event provides:

* **`state`** \- Connection state: `'connected'`, `'disconnected'`, `'reconnecting'`, or `'failed'`
* **`reconnectionAttempt`** \- The number of reconnection attempts made (if reconnecting)
* **`reconnected`** \- Boolean indicating if the connection was successfully reestablished

## Next steps

Explore related topics:

* [Meeting Object Explained](https://developers.cloudflare.com/realtime/realtimekit/core/meeting-object-explained/) \- Comprehensive meeting object reference
* [Session Lifecycle](https://developers.cloudflare.com/realtime/realtimekit/concepts/session-lifecycle/) \- Understanding meeting states and transitions

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/core/meeting-metadata/#page","headline":"Meeting Metadata · Cloudflare Realtime docs","description":"Access meeting state, type, and connection metadata in the RealtimeKit Core SDK.","url":"https://developers.cloudflare.com/realtime/realtimekit/core/meeting-metadata/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/core/","name":"Build using Core SDK"}},{"@type":"ListItem","position":5,"item":{"@id":"/realtime/realtimekit/core/meeting-metadata/","name":"Meeting Metadata"}}]}
```
