---
title: Message Broadcast APIs
description: Send custom broadcast messages to all participants in a RealtimeKit meeting.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/realtime/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Message Broadcast APIs

The broadcast APIs allow a user to send custom messages to all other users in a meeting.

WebMobile

ReactWeb ComponentsAngular

### Broadcasting a Message

The Participants module on the meeting object allows you to broadcast messages to all other users in a meeting (or to other meetings in case of connected meetings) over the signaling channel.

| Param   | Type                         | Description                                                                          | Required |
| ------- | ---------------------------- | ------------------------------------------------------------------------------------ | -------- |
| type    | Exclude<string, 'spotlight'> | Message type identifier used to distinguish different kinds of broadcasts.           | Yes      |
| payload | BroadcastMessagePayload      | Data sent with the message. Keys map to boolean, number, string, Date, or ActiveTab. | Yes      |
| target  | BroadcastMessageTarget       | Optional target filter for which participants or meetings receive the message.       | No       |

* If target is omitted, the message is broadcast to all participants in the current meeting, including the local participant.
* If `target.participantIds` is provided, the message is sent only to those participants in the current meeting.
* If `target.presetNames` is provided, the message is sent to all participants whose preset name is in the list.
* If `target.meetingIds` is provided, the message is broadcast to all specified meetings (multi‑meeting broadcast).

TypeScript

```

const participants = useRealtimeKitSelector((m) => m.participants);

participants.broadcastMessage(

  type: Exclude<string, 'spotlight'>,

  payload: BroadcastMessagePayload,

  target?: BroadcastMessageTarget,

): Promise<void>


```

TypeScript

```

type BroadcastMessagePayload = {

  [key: string]: boolean | number | string | Date | ActiveTab;

};


type BroadcastMessageTarget =

  | { participantIds: string[] }

  | { presetNames: string[] }

  | { meetingIds: string[] };


```

| Param   | Type                         | Description                                                                          | Required |
| ------- | ---------------------------- | ------------------------------------------------------------------------------------ | -------- |
| type    | Exclude<string, 'spotlight'> | Message type identifier used to distinguish different kinds of broadcasts.           | Yes      |
| payload | BroadcastMessagePayload      | Data sent with the message. Keys map to boolean, number, string, Date, or ActiveTab. | Yes      |
| target  | BroadcastMessageTarget       | Optional target filter for which participants or meetings receive the message.       | No       |

* If target is omitted, the message is broadcast to all participants in the current meeting, including the local participant.
* If `target.participantIds` is provided, the message is sent only to those participants in the current meeting.
* If `target.presetNames` is provided, the message is sent to all participants whose preset name is in the list.
* If `target.meetingIds` is provided, the message is broadcast to all specified meetings (multi‑meeting broadcast).

TypeScript

```

meeting.participants.broadcastMessage(

  type: Exclude<string, 'spotlight'>,

  payload: BroadcastMessagePayload,

  target?: BroadcastMessageTarget,

): Promise<void>


```

TypeScript

```

type BroadcastMessagePayload = {

  [key: string]: boolean | number | string | Date | ActiveTab;

};


type BroadcastMessageTarget =

  | { participantIds: string[] }

  | { presetNames: string[] }

  | { meetingIds: string[] };


```

| Param   | Type                         | Description                                                                          | Required |
| ------- | ---------------------------- | ------------------------------------------------------------------------------------ | -------- |
| type    | Exclude<string, 'spotlight'> | Message type identifier used to distinguish different kinds of broadcasts.           | Yes      |
| payload | BroadcastMessagePayload      | Data sent with the message. Keys map to boolean, number, string, Date, or ActiveTab. | Yes      |
| target  | BroadcastMessageTarget       | Optional target filter for which participants or meetings receive the message.       | No       |

* If target is omitted, the message is broadcast to all participants in the current meeting, including the local participant.
* If `target.participantIds` is provided, the message is sent only to those participants in the current meeting.
* If `target.presetNames` is provided, the message is sent to all participants whose preset name is in the list.
* If `target.meetingIds` is provided, the message is broadcast to all specified meetings (multi‑meeting broadcast).

TypeScript

```

meeting.participants.broadcastMessage(

  type: Exclude<string, 'spotlight'>,

  payload: BroadcastMessagePayload,

  target?: BroadcastMessageTarget,

): Promise<void>


```

TypeScript

```

type BroadcastMessagePayload = {

  [key: string]: boolean | number | string | Date | ActiveTab;

};


type BroadcastMessageTarget =

  | { participantIds: string[] }

  | { presetNames: string[] }

  | { meetingIds: string[] };


```

### Subscribe to Messages

Use the `broadcastedMessage` event to listen for messages sent via `broadcastMessage` and handle them in your application.

TypeScript

```

const participants = useRealtimeKitSelector((m) => m.participants);

participants.on("broadcastedMessage", ({ type, payload, timestamp }) => {

  // handle message

});


```

TypeScript

```

meeting.participants.on(

  "broadcastedMessage",

  ({ type, payload, timestamp }) => {

    // handle message

  },

);


```

TypeScript

```

meeting.participants.on(

  "broadcastedMessage",

  ({ type, payload, timestamp }) => {

    // handle message

  },

);


```

### Rate Limiting & Constraints

* The method is rate‑limited (server‑side + client‑side) to prevent abuse.
* Default client‑side config in the deprecated module: maxInvocations = 5 per period = 1s.
* The Participants module exposes a `rateLimitConfig` and `updateRateLimits(maxInvocations, period)` for tuning on the client, but server‑side limits may still apply.
* The event type cannot be `spotlight`. This is reserved for internal use by the SDK.

### Examples

#### Broadcast to everyone in the meeting

TypeScript

```

const participants = useRealtimeKitSelector((m) => m.participants);

await participants.broadcastMessage("HAND_RAISE", {

  raised: true,

  userId: meeting.self.userId,

  sentAt: new Date(),

});


participants.on(

"broadcastedMessage",

({ type, payload, timestamp }) => {

if (type === "HAND_RAISE") {

// payload.raised, payload.userId, payload.sentAt

}

},

);


```

TypeScript

```

await meeting.participants.broadcastMessage("HAND_RAISE", {

  raised: true,

  userId: meeting.self.userId,

  sentAt: new Date(),

});


meeting.participants.on(

"broadcastedMessage",

({ type, payload, timestamp }) => {

if (type === "HAND_RAISE") {

// payload.raised, payload.userId, payload.sentAt

}

},

);


```

TypeScript

```

await meeting.participants.broadcastMessage("HAND_RAISE", {

  raised: true,

  userId: meeting.self.userId,

  sentAt: new Date(),

});


meeting.participants.on(

"broadcastedMessage",

({ type, payload, timestamp }) => {

if (type === "HAND_RAISE") {

// payload.raised, payload.userId, payload.sentAt

}

},

);


```

#### Broadcast to a specific set of participants.

Only the participants with those participantIds receive the message.

TypeScript

```

const participants = useRealtimeKitSelector((m) => m.participants);

await participants.broadcastMessage(

  "PRIVATE_NOTE",

  { message: "You are on stage in 30 seconds" },

  {

    participantIds: ["peer-id-1", "peer-id-2"],

  },

);


```

TypeScript

```

await meeting.participants.broadcastMessage(

  "PRIVATE_NOTE",

  { message: "You are on stage in 30 seconds" },

  {

    participantIds: ["peer-id-1", "peer-id-2"],

  },

);


```

TypeScript

```

await meeting.participants.broadcastMessage(

  "PRIVATE_NOTE",

  { message: "You are on stage in 30 seconds" },

  {

    participantIds: ["peer-id-1", "peer-id-2"],

  },

);


```

#### Broadcast to a preset

All participants whose preset name is `speaker` receive the message.

TypeScript

```

const participants = useRealtimeKitSelector((m) => m.participants);

await participants.broadcastMessage(

  "STAGE_INSTRUCTION",

  { text: "Prepare for Q&A" },

  {

    presetNames: ["speaker"],

  },

);


```

TypeScript

```

await meeting.participants.broadcastMessage(

  "STAGE_INSTRUCTION",

  { text: "Prepare for Q&A" },

  {

    presetNames: ["speaker"],

  },

);


```

TypeScript

```

await meeting.participants.broadcastMessage(

  "STAGE_INSTRUCTION",

  { text: "Prepare for Q&A" },

  {

    presetNames: ["speaker"],

  },

);


```

#### Broadcast across multiple meetings

All participants in the specified meetings receive the message.

TypeScript

```

const participants = useRealtimeKitSelector((m) => m.participants);

await participants.broadcastMessage(

  "GLOBAL_ANNOUNCEMENT",

  { text: "The event will end in 5 minutes." },

  {

    meetingIds: ["meeting-1", "meeting-2"],

  },

);


```

TypeScript

```

await meeting.participants.broadcastMessage(

  "GLOBAL_ANNOUNCEMENT",

  { text: "The event will end in 5 minutes." },

  {

    meetingIds: ["meeting-1", "meeting-2"],

  },

);


```

TypeScript

```

await meeting.participants.broadcastMessage(

  "GLOBAL_ANNOUNCEMENT",

  { text: "The event will end in 5 minutes." },

  {

    meetingIds: ["meeting-1", "meeting-2"],

  },

);


```

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/realtime/realtimekit/broadcast-apis/#page","headline":"Message Broadcast APIs · Cloudflare Realtime docs","description":"Send custom broadcast messages to all participants in a RealtimeKit meeting.","url":"https://developers.cloudflare.com/realtime/realtimekit/broadcast-apis/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/realtime/","name":"Realtime"}},{"@type":"ListItem","position":3,"item":{"@id":"/realtime/realtimekit/","name":"RealtimeKit"}},{"@type":"ListItem","position":4,"item":{"@id":"/realtime/realtimekit/broadcast-apis/","name":"Message Broadcast APIs"}}]}
```
