# Overview

Please reach out to your accounts team to discuss access.

API version
The Fin Agent API is available on API version **2.14 and above**. The new orchestration endpoints — Discover capabilities, Ask Fin, and Run a procedure — are currently available in the **Preview** API version only. See the [Preview changelog](/docs/references/preview/changelog).

## Overview

Fin can be accessed programmatically via an API. You can orchestrate Fin from your own agent — discover what Fin can do, ask a one-shot question, run a specific procedure, and reply — and Fin notifies the client of its status and responses through a set of events. Events can be delivered via [webhooks](#webhooks) or [Server-Sent Events (SSE)](#sse-server-sent-events).

Once Fin is initialized, it works through a series of [statuses](#fins-statuses) — *thinking* as it works on a request and *replying* as it sends each part of an answer. Fin hands control back to the orchestrating agent when it reaches *awaiting_user_reply* (it needs the user's next message to continue) or *complete* (it has finished). Allow Fin to continue uninterrupted until it returns control with one of these statuses.

## Orchestrating Fin

If you are driving Fin from your own agent, the orchestration endpoints let your agent decide *what* Fin should do and *when*:

| ENDPOINT  | WHEN TO USE |
|  --- | --- |
| `POST /fin/capabilities` | Discover, per user, which procedures and actions are available — call this first to decide what to do. |
| `POST /fin/ask` | Get a single, self-contained answer to one question. Fin will not ask follow-ups, escalate, or run procedures. |
| `POST /fin/procedures/{procedure_id}/run` | Deterministically run a specific procedure. |
| `POST /fin/reply` | Send a follow-up message to an existing conversation — typically when Fin needs more information to complete an action. |


Preview API version required
Discover capabilities, Ask Fin, and Run a procedure are currently available in the **Preview** API version only — set `Intercom-Version: Preview` on those requests. Reply to Fin is available on version 2.14 and above. See the [Preview changelog](/docs/references/preview/changelog).

### Discover capabilities

`POST /fin/capabilities` returns a per-user list of what Fin can do, so your agent can decide which endpoint to call. The list is audience-matched to the user you pass.

#### Request Payload

| KEY  | TYPE  | Required  | DESCRIPTION |
|  --- | --- | --- | --- |
| `user` | `object` | `true` | The user to list capabilities for. If no user exists for the id, one is created from the supplied details. |
| `user.id` | `string` | `true` | The external reference for the user (maps to `user_id` on the Intercom User object). |
| `user.name` | `string` | `false` | The user's name. Applied when the user is created. |
| `user.email` | `string` | `false` | The user's email. Applied when the user is created, and updates the existing user's email if it differs. See [User Handling](#user-handling). |
| `user.attributes` | `object` | `false` | Up to 10 custom attributes. Merged into the user whether it is created or already exists. See [User Handling](#user-handling). |


#### Example request

```bash
curl -X POST https://api.intercom.io/fin/capabilities \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -H "Intercom-Version: Preview" \
  -H "Content-Type: application/json" \
  -d '{ "user": { "id": "123456" } }'
```

#### Example response

```json
{
  "version": "Preview",
  "capabilities": [
    { "type": "procedure", "id": "12345", "name": "Reset password",
      "description": "Walk the user through resetting their password.",
      "endpoint": "/fin/procedures/12345/run", "method": "POST" },
    { "type": "reply", "description": "Reply to an in-progress Fin conversation.",
      "endpoint": "/fin/reply", "method": "POST" },
    { "type": "ask", "description": "Ask Fin a single, self-contained question.",
      "endpoint": "/fin/ask", "method": "POST" }
  ]
}
```

### Ask Fin

`POST /fin/ask` gets a single, self-contained answer to one question. It is non-conversational: Fin will not ask follow-up questions, run procedures, or escalate.

#### Request Payload

| KEY  | TYPE  | Required  | DESCRIPTION |
|  --- | --- | --- | --- |
| `conversation_id` | `string` | `true` | Your external conversation ID. Fin creates a conversation for this ID. If a conversation already exists for it, use [`/fin/reply`](#reply-to-fin) instead. |
| `message` | `object` | `true` | The user's question. |
| `message.author` | `string` | `true` | Who sent the message. One of `user`, `agent`, or `fin`. |
| `message.body` | `string` | `true` | The text of the message. |
| `message.timestamp` | `string` | `false` | When the message was sent. Optional, but recommended: it is used to deduplicate messages sent within a 5-minute window. |
| `user` | `User` | `true` | The user asking the question. Requires `id`. |
| `conversation_metadata` | `object` | `false` | Optional `history` (up to 10 prior messages) and `attributes` to give Fin context. |
| `attachments` | `array` | `false` | Up to 10 attachments to include with the message. |


#### Example request

```bash
curl -X POST https://api.intercom.io/fin/ask \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -H "Intercom-Version: Preview" \
  -H "Content-Type: application/json" \
  -d '{
    "conversation_id": "ext-123",
    "message": { "author": "user", "body": "How do I reset my password?", "timestamp": "2025-01-24T10:01:20.000Z" },
    "user": { "id": "123456", "name": "John Doe", "email": "john.doe@example.com" }
  }'
```

#### Response

| KEY  | TYPE  | DESCRIPTION |
|  --- | --- | --- |
| `conversation_id` | `String` | The external ID of the conversation. |
| `user_id` | `String` | The ID of the user. |
| `status` | `Enum<String>` | Fin's current status. **Values:** `thinking` `replying` `resolved` `complete` |
| `created_at_ms` | `String` | The timestamp the response was created at, with millisecond precision. |
| `sse_subscription_url` | `String` | Optional. A URL to subscribe to [SSE events](#sse-server-sent-events) for this conversation, returned when SSE is enabled. |
| `errors` | `object` | Optional. Per-field errors for non-fatal issues, such as user attributes that could not be applied. |


#### Example response

```json
{
  "conversation_id": "ext-123",
  "user_id": "user-456",
  "status": "thinking",
  "created_at_ms": "2025-01-24T10:00:00.123Z",
  "sse_subscription_url": "https://primary-realtime.intercom-messenger.com/event-stream?channels=fin_agent_api:app123:ext-123&accessToken=eyJhbG...&rewind=2m"
}
```

Fin's answer arrives asynchronously via the `fin_replied` event. The conversation ends with a `complete` status — there is no `awaiting_user_reply` cycle.

### Reply to Fin

Endpoint: `/fin/reply`

Use `/fin/reply` to send a follow-up message in an existing conversation. When Fin needs more information to complete an action, it sets the conversation to `awaiting_user_reply` — send the user's response so Fin can continue.

This endpoint requires `user.id`, the same as the other orchestration endpoints.

#### **Request & Response**

##### Request Payload

| KEY  | TYPE  | Required  | DESCRIPTION |
|  --- | --- | --- | --- |
| `message` | `Message` | `true` | The user's message. |
| `conversation_id` | `String` | `true` | The ID of the conversation. |
| `user` | `Object<User>` | `true` | A user object that identifies the user replying to Fin. |
| `attachments` | `Array<Attachment>` | `false` | An array of attachments to include with the message. **Note:** Maximum of 10 attachments. |


**Request Payload Example**

```json
{
  "message": {
    "author": "user",
    "body": "Here's the information you requested.",
    "timestamp": "2025-01-24T09:01:00.000Z"
  },
  "conversation_id": "ext-123",
  "user": {
    "id": "123456",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "attributes": {
      "plan_type": "Pro",
      "subscription_status": "active"
    }
  },
  "attachments": [
    {
      "type": "url",
      "url": "https://example.com/invoice.pdf"
    }
  ]
}
```

##### Response

| KEY  | TYPE  | DESCRIPTION |
|  --- | --- | --- |
| `conversation_id` | `String` | The ID of the conversation. |
| `user_id` | `String` | The ID of the user. |
| `status` | `Enum<String>` | Fin's status. |
| `created_at_ms` | `String` | The timestamp the response was created at, with millisecond precision. **Example:** `2025-01-24T10:00:00.123Z` |
| `sse_subscription_url` | `String` | Optional. A URL to subscribe to [SSE events](#sse-server-sent-events) for this conversation, if SSE is enabled. The JWT token expires after 3 minutes and is revoked when Fin sets the conversation to `awaiting_user_reply` or `complete`. |
| `errors` | `Object` | Optional. Contains error details if any user attribute updates failed. |
| `errors.user.attributes` | `Hash<String,String>` | Optional. Map of user attribute names to error messages. |


**Response Example**

```json
{
  "conversation_id": "ext-123",
  "user_id": "user-456",
  "status": "thinking",
  "created_at_ms": "2025-01-24T10:00:00.123Z",
  "sse_subscription_url": "https://primary-realtime.intercom-messenger.com/event-stream?channels=fin_agent_api:app123:ext-123&accessToken=eyJhbG...",
  "errors": {
    "user": {
      "attributes": {
        "invalid_attr": "User attribute 'invalid_attr' does not exist"
      }
    }
  }
}
```

### Run a procedure

`POST /fin/procedures/{procedure_id}/run` deterministically runs a specific procedure on a new conversation. Calling it guarantees that procedure runs.

#### Request Payload

| KEY  | TYPE  | Required  | DESCRIPTION |
|  --- | --- | --- | --- |
| `procedure_id` (path) | `string` | `true` | The ID of the procedure to run. |
| `conversation_id` | `string` | `true` | Your external conversation ID. Fin creates a conversation for this ID. If a conversation already exists for it, use [`/fin/reply`](#reply-to-fin) instead. |
| `user` | `User` | `true` | The user the procedure runs for. Requires `id`. |
| `message` | `object` | `false` | An optional trigger message. If provided, `author` and `body` are required. |
| `conversation_metadata` | `object` | `false` | Optional conversation `attributes` (no history). |
| `settings` | `object` | `false` | Optional `email` (boolean) to format replies as email-style. |


#### Example request

```bash
curl -X POST https://api.intercom.io/fin/procedures/12345/run \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -H "Intercom-Version: Preview" \
  -H "Content-Type: application/json" \
  -d '{
    "conversation_id": "ext-123",
    "user": { "id": "123456", "name": "John Doe", "email": "john.doe@example.com" }
  }'
```

#### Response

| KEY  | TYPE  | DESCRIPTION |
|  --- | --- | --- |
| `conversation_id` | `String` | The external ID of the conversation. |
| `user_id` | `String` | The ID of the user. |
| `procedure_id` | `String` | The ID of the procedure that was run. |
| `status` | `Enum<String>` | Fin's current status. **Values:** `thinking` `replying` `awaiting_user_reply` `resolved` `complete` |
| `created_at_ms` | `String` | The timestamp the response was created at, with millisecond precision. |
| `sse_subscription_url` | `String` | Optional. A URL to subscribe to [SSE events](#sse-server-sent-events) for this conversation, returned when SSE is enabled. |
| `errors` | `object` | Optional. Per-field errors for non-fatal issues, such as user attributes that could not be applied. |


#### Example response

```json
{
  "conversation_id": "ext-123",
  "user_id": "user-456",
  "procedure_id": "12345",
  "status": "thinking",
  "created_at_ms": "2025-01-24T10:00:00.123Z",
  "sse_subscription_url": "https://primary-realtime.intercom-messenger.com/event-stream?channels=fin_agent_api:app123:ext-123&accessToken=eyJhbG...&rewind=2m"
}
```

If the procedure pauses for input, the conversation status becomes `awaiting_user_reply` — send the user's response with [Reply to Fin](#reply-to-fin).

## Pricing

Preview pricing
Pricing for the Fin Agent API is being finalised and is subject to change while the orchestration endpoints are in Preview.

Conversations you drive through the Fin Agent API are billed the same way as any other Fin conversation — on **outcomes**. You're charged at most once per conversation, and only when Fin reaches a billable outcome.

A conversation that Fin answers through the API is counted as a resolution, which is a billable outcome. Conversations that don't reach a billable outcome aren't charged — for example, discovering what Fin can do with [`/fin/capabilities`](#discover-capabilities), which doesn't create a conversation.

For how outcomes are calculated and billed, see [Understanding Fin outcomes](https://www.intercom.com/help/en/articles/13513868-understanding-fin-outcomes).

## Start a conversation with Fin (legacy)

Legacy — conversational mode
`/fin/start` powers the conversational model, where your own UI drives a back-and-forth with Fin. This endpoint is no longer actively developed and is maintained only for existing integrations — new functionality lands on the orchestration endpoints above.

Endpoint: `/fin/start`

Initialise Fin by passing it the user's message along with some conversation history and user details. These additional pieces of context will be used by Fin to provide a better and more contextual answer to the user.

### **Request & Response**

#### Request Payload

| KEY  | TYPE  | Required  | DESCRIPTION |
|  --- | --- | --- | --- |
| `message` | `Message` | `true` | The message that the user is sending to Fin. |
| `conversation_id` | `String` | `true` | The ID of the conversation that is calling Fin via this API. |
| `user` | `Object<User>` | `true` | A user object that identifies the user making the query. |
| `attachments` | `Array<Attachment>` | `false` | An array of attachments to include with the message. **Note:** Maximum of 10 attachments. |
| `conversation_metadata` | `Object` | `false` | Metadata about the conversation, including history and attributes. |
| `conversation_metadata.history` | `Array<Message>` | `false` | An array of previous messages of the conversation before Fin is initialised. This data provides context to Fin on the history of the conversation and helps generate a better answer. **Note:** Limit to the last 10 messages. |
| `conversation_metadata.attributes` | `Hash<String,Object>` | `false` | A Hash of attributes associated with the conversation. These attributes can be used by Fin to provide more contextual responses. **Note:** Limit to 10 attributes. |


**Request Payload Example**

```json
{
  "conversation_id": "ext-123",
  "message": {
    "author": "user",
    "body": "How can I see my account details?",
    "timestamp": "2025-01-24T10:01:20.000Z"
  },
  "user": {
    "id": "123456",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "attributes": {
      "plan_type": "Pro",
      "subscription_status": "active"
    }
  },
  "attachments": [
    {
      "type": "url",
      "url": "https://example.com/document.pdf"
    },
    {
      "type": "file",
      "name": "screenshot.png",
      "content_type": "image/png",
      "data": "<base64 encoded file data>"
    }
  ],
  "conversation_metadata": {
    "history": [
      {
        "author": "user",
        "body": "I need help",
        "timestamp": "2025-01-24T10:00:01Z"
      },
      {
        "author": "agent",
        "body": "What do you need help with?",
        "timestamp": "2025-01-24T10:01:00Z"
      }
    ],
    "attributes": {
      "priority_level": "high",
      "department": "sales"
    }
  }
}
```

#### Response

| KEY  | TYPE  | DESCRIPTION |
|  --- | --- | --- |
| `conversation_id` | `String` | The ID of the conversation. |
| `user_id` | `String` | The ID of the user. |
| `status` | `Enum<String>` | Fin's status. |
| `created_at_ms` | `String` | The timestamp the response was created at, with millisecond precision. **Example:** `2025-01-24T10:00:00.123Z` |
| `sse_subscription_url` | `String` | Optional. A URL to subscribe to [SSE events](#sse-server-sent-events) for this conversation, if SSE is enabled. Includes `rewind=2m` to replay recent events. The JWT token expires after 3 minutes and is revoked when Fin sets the conversation to `awaiting_user_reply` or `complete`. |
| `errors` | `Object` | Optional. Contains error details if any user or conversation attribute updates failed. |
| `errors.user.attributes` | `Hash<String,String>` | Optional. Map of user attribute names to error messages. |
| `errors.conversation.attributes` | `Hash<String,String>` | Optional. Map of conversation attribute names to error messages. |


**Response Example**

```json
{
  "conversation_id": "ext-123",
  "user_id": "user-456",
  "status": "thinking",
  "created_at_ms": "2025-01-24T10:00:00.123Z",
  "sse_subscription_url": "https://primary-realtime.intercom-messenger.com/event-stream?channels=fin_agent_api:app123:ext-123&accessToken=eyJhbG...&rewind=2m",
  "errors": {
    "user": {
      "attributes": {
        "invalid_attr": "User attribute 'invalid_attr' does not exist"
      }
    },
    "conversation": {
      "attributes": {
        "bad_attr": "Conversation attribute 'bad_attr' does not exist",
        "priority_level": "'1234' is not a valid value for attribute 'priority_level' of type 'string'"
      }
    }
  }
}
```

## Listening to Events

Fin fires events during its workflow to convey its [status](#fins-statuses) and deliver replies to the user. These events can be received via **[Webhooks](#webhooks)**, **[SSE](#sse-server-sent-events)**, or both — for example, using SSE for low-latency UI rendering with webhooks as a reliable fallback.

Both delivery mechanisms provide the same event types with identical schemas.

### Webhooks

A webhook endpoint can be configured in the Fin Agent API settings. The client can then listen for Fin events sent to this webhook and handle them accordingly.

All webhook requests will include an `X-Fin-Agent-API-Webhook-Signature` header containing an HMAC-SHA256 signature of the request body. Validation can be done by generating a signature using the request body and the signing secret from the settings, and comparing it with the aforementioned header value.

### SSE (Server-Sent Events)

You can receive events via Server-Sent Events (SSE) using the `sse_subscription_url` returned by any endpoint that starts or continues a Fin response cycle — [Ask Fin](#ask-fin), [Reply to Fin](#reply-to-fin), and [Run a procedure](#run-a-procedure) (as well as the legacy `/fin/start`).

#### How it works

1. Call any of these endpoints as normal.
2. The response includes an `sse_subscription_url` field.
3. Open an SSE connection to this URL using `EventSource` or any HTTP client that supports SSE.
4. Receive `fin_replied` and `fin_status_updated` events in real time over the SSE stream.


#### URL parameters

The `sse_subscription_url` follows this format:

```
https://primary-realtime.intercom-messenger.com/event-stream?channels={channel}&accessToken={token}&rewind={duration}
```

| PARAMETER  | DESCRIPTION |
|  --- | --- |
| `channels` | The SSE channel to subscribe to, in the format `fin_agent_api:{app_id}:{conversation_id}`. |
| `accessToken` | A JWT (JSON Web Token) that authenticates the SSE connection. Expires after **3 minutes** and is revoked when Fin sets the conversation to `awaiting_user_reply` or `complete`. |
| `rewind` | Present on responses that begin a new Fin response cycle (Ask Fin, Run a procedure, and the legacy `/fin/start`). Replays events from the specified duration (e.g., `2m` for 2 minutes) to prevent missed events during initial connection. Not present on `/fin/reply`. |


#### The `rewind` parameter

Endpoints that begin a new Fin response cycle — Ask Fin, Run a procedure, and the legacy `/fin/start` — return an `sse_subscription_url` with a `rewind=2m` query parameter. This instructs the SSE provider to replay any events from the last 2 minutes when the client connects, preventing missed events between receiving the HTTP response and establishing the SSE connection.

The `/fin/reply` endpoint does **not** include the `rewind` parameter, since the client is expected to already have an active SSE connection at that point.

Why reply has no rewind
When a response cycle is first started, there is a gap between receiving the HTTP response and opening the SSE connection, so `rewind` ensures no events are lost during this window. For a `/fin/reply` continuation, the SSE connection should already be open.

#### Token expiration and revocation

- SSE access tokens expire after **3 minutes**.
- The token is **revoked immediately** when Fin sets the conversation to `awaiting_user_reply` or `complete`. The `awaiting_user_reply` revocation occurs when Fin finishes replying; the `complete` revocation covers flows where the conversation ends without a reply cycle (e.g., immediate escalation).
- After receiving `awaiting_user_reply`, the SSE connection will close. If the user replies, call `/fin/reply` to obtain a new `sse_subscription_url` with a fresh token.


Token lifetime
Do not cache or reuse `sse_subscription_url` values across multiple interactions. Each URL contains a short-lived token scoped to a single Fin response cycle.

#### Example: Connecting to SSE

```javascript
// After calling an endpoint that returns an sse_subscription_url (e.g. /fin/ask)
const response = await fetch('https://api.intercom.io/fin/ask', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer <YOUR_ACCESS_TOKEN>',
    'Content-Type': 'application/json',
    'Intercom-Version': 'Preview'
  },
  body: JSON.stringify({ /* request payload */ })
});

const data = await response.json();

// Connect to SSE using the subscription URL
const eventSource = new EventSource(data.sse_subscription_url);

eventSource.onmessage = (event) => {
  const eventData = JSON.parse(event.data);

  if (eventData.event_name === 'fin_replied') {
    // Handle Fin's reply
    console.log('Fin replied:', eventData.message.body);
  }

  if (eventData.event_name === 'fin_status_updated') {
    console.log('Status updated:', eventData.status);

    if (eventData.status === 'awaiting_user_reply' || eventData.status === 'complete') {
      // Fin is done with this cycle — close the SSE connection
      eventSource.close();
    }
  }
};

eventSource.onerror = (error) => {
  console.error('SSE connection error:', error);
  eventSource.close();
};
```

### Event Types

#### Status Update

Fin will report its status to the client via this event.

| KEY  | TYPE  | DESCRIPTION |
|  --- | --- | --- |
| `event_name` | `String` | The name of the event. **Value:** `fin_status_updated` |
| `conversation_id` | `String` | The ID of the conversation. |
| `user_id` | `String` | The ID of the user. |
| `status` | `Enum<String>` | Fin's current status. **Supported values:** `escalated resolved complete awaiting_user_reply` |
| `reason` | `String` | Optional. A human-readable explanation of why the conversation was escalated. Only present when `status` is `escalated`. See [Escalation Reasons](#escalation-reasons) for possible values. |
| `created_at_ms` | `String` | The timestamp the event was created at, with millisecond precision. **Example:** `2025-01-24T10:00:00.123Z` |


**Status Update Example (Escalated)**

```json
{
  "event_name": "fin_status_updated",
  "conversation_id": "ext-123",
  "user_id": "7891",
  "status": "escalated",
  "reason": "Escalation requested by user",
  "created_at_ms": "2025-01-24T10:00:00.123Z"
}
```

**Status Update Example (Resolved)**

```json
{
  "event_name": "fin_status_updated",
  "conversation_id": "ext-123",
  "user_id": "7891",
  "status": "resolved",
  "created_at_ms": "2025-01-24T10:00:00.123Z"
}
```

**Status Update Example (Awaiting User Reply)**

```json
{
  "event_name": "fin_status_updated",
  "conversation_id": "ext-123",
  "user_id": "7891",
  "status": "awaiting_user_reply",
  "created_at_ms": "2025-01-24T10:00:00.123Z"
}
```

Done signal
The `awaiting_user_reply` status on the `fin_status_updated` event serves as a "done" signal indicating that Fin has finished sending all reply parts. Use this event to know when Fin's response is complete and the user can reply.

#### Fin Reply

Fin will reply to a user via this event. The content of the response will be contained in the Message object. Intermediate reply events have a status of `replying`, indicating that more reply parts may follow. When Fin has finished replying, a separate `fin_status_updated` event with status `awaiting_user_reply` is fired as a done signal.

Preview API version required
The `replying` status for intermediate `fin_replied` events is currently only available in the **Preview** API version. In stable versions, all `fin_replied` events use `awaiting_user_reply` as the status. See the [Preview changelog](/docs/references/preview/changelog) for details.

| KEY  | TYPE  | DESCRIPTION |
|  --- | --- | --- |
| `event_name` | `String` | The name of the event. **Value:** `fin_replied` |
| `conversation_id` | `String` | The ID of the conversation. |
| `user_id` | `String` | The ID of the user. |
| `message` | `Message` | Fin's answer to the user's query. Includes `timestamp_ms` for millisecond precision timing. |
| `status` | `Enum<String>` | Fin's current status. **Values:** `replying` (intermediate reply) `awaiting_user_reply` (legacy; see done signal above) |
| `stream_id` | `String` | Optional. Present when the reply was generated via streaming. Correlates this event with the `fin_reply_chunk` events that preceded it — use it to know when to replace streamed text with the final HTML body. |
| `message.id` | `String` | A unique identifier for this message. Use this to deduplicate the same reply received via both SSE and webhooks. |
| `created_at_ms` | `String` | The timestamp the event was created at, with millisecond precision. **Example:** `2025-01-24T10:00:00.123Z` |


**Fin Reply Example (Intermediate)**

```json
{
  "event_name": "fin_replied",
  "conversation_id": "ext-123",
  "user_id": "7891",
  "message": {
    "id": "98765",
    "author": "fin",
    "body": "<p>You can see your account details by clicking on the <em>Account</em> tab in the top right corner of the screen.</p>",
    "timestamp_ms": "2025-01-24T09:01:00.456Z"
  },
  "status": "replying",
  "created_at_ms": "2025-01-24T10:00:00.123Z"
}
```

Listening for the done signal
After receiving one or more `fin_replied` events with `status: replying`, wait for a `fin_status_updated` event with `status: awaiting_user_reply` before prompting the user to reply. This ensures all of Fin's reply parts have been delivered.

#### Fin Reply Chunk

When SSE is enabled with streaming, Fin will emit `fin_reply_chunk` events during reply generation. Each chunk contains the **full accumulated answer text so far** — not a delta. This allows progressive rendering as Fin types.

SSE with streaming only
`fin_reply_chunk` events are only delivered over SSE when streaming is enabled. They are not available via webhooks.

| KEY  | TYPE  | DESCRIPTION |
|  --- | --- | --- |
| `event_name` | `String` | The name of the event. **Value:** `fin_reply_chunk` |
| `conversation_id` | `String` | The ID of the conversation. |
| `stream_id` | `String` | A unique identifier for this streaming response. Correlates chunks with each other and with the eventual `fin_replied` event. |
| `chunk_index` | `Integer` | 0-based counter for this chunk within the stream. Contiguous — no gaps even if tokens are sampled or duplicates skipped. |
| `chunk_text` | `String` | The full accumulated plain text of Fin's answer so far. Each chunk supersedes the previous — replace rather than append. |
| `status` | `Enum<String>` | Fin's current status. **Value:** `replying` (always `replying` for this event) |
| `created_at_ms` | `String` | The timestamp the event was created at, with millisecond precision. **Example:** `2025-01-24T10:00:00.123Z` |


**Fin Reply Chunk Example**

```json
{
  "event_name": "fin_reply_chunk",
  "conversation_id": "ext-123",
  "stream_id": "a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4",
  "chunk_index": 3,
  "chunk_text": "You can see your account details by clicking",
  "status": "replying",
  "created_at_ms": "2025-01-24T10:00:00.123Z"
}
```

Streaming flow
Accumulate `fin_reply_chunk` events keyed by `stream_id` for progressive rendering. When the `fin_replied` event arrives with the same `stream_id`, replace your streamed text with the final HTML in `message.body`. Discard any late-arriving chunks for that `stream_id`.

## Fin's Statuses

As Fin works through a request it reports a series of statuses. Listen for these via [Webhooks](#webhooks) or [SSE](#sse-server-sent-events) and react accordingly.

Which statuses you see depends on the endpoint. Every request reports `thinking` while Fin works and ends with `complete` when control returns to you. `replying` accompanies each reply part. `awaiting_user_reply` only appears when Fin needs more information to continue (for example, a procedure that pauses for input) — a one-shot [Ask Fin](#ask-fin) call never enters it. `escalated` is covered below.

![Statuses](/assets/fin_agent_api_statuses.9af1f4487c248e11ef2ce146d73ad7a67ba1d7a7f573b19408a673bf46027c21.71a4f21c.jpg)

| STATUS  | DESCRIPTION |
|  --- | --- |
| `thinking` | Fin is currently thinking about a response. When Fin is thinking, the client should consider indicating to the user that Fin is working on an answer. |
| `replying` | Fin is sending reply parts. Each `fin_replied` event with this status contains a part of Fin's answer. Wait for the `fin_status_updated` event with `awaiting_user_reply` before prompting the user to reply. |
| `awaiting_user_reply` | Fin has finished replying and is waiting for the user to respond. This status is delivered via the `fin_status_updated` event as a done signal after all `fin_replied` events. |
| `escalated` | The conversation has been handed off to a human. This happens automatically in conversational mode — [`/fin/start`](#start-a-conversation-with-fin-legacy), and [`/fin/reply`](#reply-to-fin) on a conversation that was started conversationally, let Fin decide to escalate. A one-shot [`/fin/ask`](#ask-fin) never escalates. |
| `resolved` | The user's query has been resolved. The user has indicated to Fin that it has successfully answered their query. |
| `complete` | Fin has completed its workflow and the conversation is over. Control of the conversation is now back with the client. |


## Escalation Reasons

When a conversation is escalated, the `escalated` `fin_status_updated` event carries a `reason` field.

Fin escalates of its own accord in conversational mode — [`/fin/start`](#start-a-conversation-with-fin-legacy), and [`/fin/reply`](#reply-to-fin) on a conversation that was started conversationally, let Fin decide to escalate. The following reasons may be provided:

| REASON  | DESCRIPTION |
|  --- | --- |
| `Escalation requested by user` | The user explicitly requested to speak with a human agent during the conversation. |
| `Escalation rule: {rule_name}` | An escalation rule was triggered based on conversation attributes or conditions. The `{rule_name}` will be replaced with the actual name of the matched rule. |
| `Escalation rule matched` | A generic escalation rule was triggered, but no specific rule name is available. |
| `Routed to team` | The conversation was routed to a specific team based on your routing configuration. |
| `Conversation finished without resolution` | The conversation ended without being resolved or explicitly escalated through one of the above paths. |


**Note:** The `reason` field is optional and may not be present in all escalated status update events. Legacy implementations or certain edge cases may not include this field.

## Authentication

All requests to this API require an API key in the HTTP header. You can obtain an API key after completing the [Fin Agent API setup](/docs/guides/fin-agent-api/setup).

For general authentication guidelines, see [Intercom authentication](https://developers.intercom.com/docs/build-an-integration/learn-more/authentication).

Keep your API key secure
Your API key grants access to the Fin Agent API on behalf of your workspace. Do not share it publicly or expose it in client-side code.

### OAuth Scopes

The Fin Agent API access token is created with the `write_conversations` OAuth scope, which provides the minimum permissions needed for Fin Agent API operations. This follows security best practices by limiting what an access token can do if compromised.

For more information about OAuth scopes and token security, see the [OAuth Scopes & Permissions](/docs/guides/fin-agent-api/setup#oauth-scopes-permissions) section in the setup guide.

## User Handling

When you provide a User object to the Fin Agent API, the following behavior applies:

- **User role only:** The Fin Agent API only supports the User role. Leads and Visitors are not supported.
- **User lookup:** The `id` field is used to look up existing users in Intercom. This value maps to the `user_id` field on the Intercom User object.
- **User creation:** If no user is found with the provided `id`, a new user will be created with the given parameters.
- **Email updates:** If an `email` is provided and differs from the existing user's email, the user's email will be updated.
- **Attribute updates:** If `attributes` are provided, they will be merged with the user's existing attributes. New attributes are added and existing attributes with the same key are overwritten.
If your users interact with Intercom across multiple channels (e.g., Messenger and the Fin Agent API), updating the email or attributes via this API will affect the user record across all channels. Ensure that the data you provide is authoritative and consistent with your other integrations to avoid unintended changes to user data.


## When to use SSE?

SSE and webhooks serve different purposes and can be used independently or together. Choose based on your integration's needs:

| USE CASE  | RECOMMENDED DELIVERY | WHY  |
|  --- | --- | --- |
| Frontend chat UI with real-time typing | **SSE** | Reduces time-to-first-token (TTFT) by streaming chunks progressively as Fin generates its reply. Users see text appear immediately rather than waiting for the full response. |
| Backend processing and persistence | **Webhooks** | Webhooks guarantee delivery of all events including those that occur when no SSE connection is active (e.g., inactivity messages). They are the reliable choice for persisting conversation state to your database. |
| Production frontend + backend | **SSE & Webhooks** | Use SSE for real-time rendering on the frontend and webhooks for durable backend processing. This gives you the best of both worlds. |
| Server-to-server integration (no UI) | **Webhooks** | If there is no frontend to render streaming text, webhooks provide complete event delivery without the overhead of maintaining an SSE connection. |


SSE + Webhooks together
You can enable both SSE and webhooks simultaneously. This is the recommended setup for production integrations — stream to the frontend for a responsive user experience while relying on webhooks to capture every event on the backend.

## Best practices

### Streaming content model

- **Chunks are cumulative plain text** — Each `fin_reply_chunk` contains the full accumulated answer text so far, not a delta. You can render the latest chunk directly — no need to concatenate fragments. If you miss a chunk, the next one contains everything. Note that `fin_reply_chunk` events contain plain text only — rich content such as images is not included in chunks and will only appear in the final `fin_replied` event.
- **Swap to rich text on completion** — When Fin completes its reply, the `fin_replied` event delivers the final answer as rich text (HTML with formatting, sources, etc.). The recommended strategy: stream `fin_reply_chunk` events for real-time display, then replace the streamed text with the `fin_replied` rich text for the final rendered view.
- **Use `stream_id` to correlate chunks and replies** — Each reply stream has a unique `stream_id`. Use it to match `fin_reply_chunk` events to the corresponding `fin_replied` event, especially when handling multiple reply parts.


### Token lifecycle

- **Tokens are short-lived** — SSE access tokens expire after 3 minutes and are revoked when Fin finishes replying (`awaiting_user_reply` or `complete` status).
- **Use `/fin/reply` for fresh tokens** — After a token is revoked, call the `/fin/reply` endpoint when the user responds. Each response includes a new `sse_subscription_url` with a fresh token — do not cache or reuse old URLs.


### Webhooks and persistence

- **Persist conversations for page refreshes** — SSE is ephemeral. Clients must persist conversation state locally or via their backend and rely on webhooks for updates that arrive while no SSE connection is active (e.g., after a page refresh or reconnection).
- **Inactivity messages arrive via webhook only** — If Fin times out waiting for a user reply, the inactivity message will not arrive over SSE (the connection will likely have closed by then). Rely on webhooks to capture it.


### Deduplication

- **Use `message.id` to deduplicate across SSE and webhooks** — When using both SSE and webhooks, the same `fin_replied` event is delivered on both channels. Each `fin_replied` event includes a `message.id` that uniquely identifies the message. Use it to detect and discard duplicates.
- **`stream_id` links chunks to the final reply** — For streamed replies, use `stream_id` to correlate `fin_reply_chunk` events with the final `fin_replied` event. Non-streamed replies (e.g., follow-ups) will not have a `stream_id` but will always have a `message.id`.


### Handling Fin's replies

- **`fin_reply_chunk`** — Use for progressive rendering. Each chunk contains the cumulative plain-text answer so far with a `replying` status.
- **`fin_replied`** — Replace the streamed text with the `fin_replied` event's rich-text body for the final rendered view. Use `stream_id` to match it to the preceding chunks.
- **`fin_status_updated`** — A follow-up `fin_status_updated` event is fired after Fin's replies to indicate the conversation has moved to `awaiting_user_reply`, `resolved`, or `complete` status. Use this as the "done" signal.


### API version

Use a stable API version (e.g., 2.14, 2.15) for production integrations. The `Preview` version may include experimental changes that are modified or removed before reaching a stable release. See [Update your API version](https://developers.intercom.com/docs/build-an-integration/learn-more/rest-apis/update-your-api-version) for guidance on choosing and upgrading versions.

## HTML in Fin replies

The `message.body` field in `fin_replied` events contains server-rendered HTML. The specific elements that appear depend on the knowledge ingested into Fin — for example, if your help center articles contain tables or code blocks, Fin may include those elements in its responses.

The following HTML elements may appear in `message.body`:

| Tag | What it does | Details |
|  --- | --- | --- |
| `<p>` | Paragraph | Primary text container. |
| `<h1>` `<h2>` `<h3>` `<h4>` | Headings |  |
| `<b>` `<strong>` `<i>` `<em>` | Text formatting | Bold and italic. |
| `<a>` | Link | Attributes: `href`, `target`. Also used for inline citations (see below). |
| `<ol>` `<ul>` `<li>` | Lists | Ordered and unordered. Can be nested. |
| `<pre>` `<code>` | Code | `<pre>` wraps `<code>` for code blocks. Inline `<code>` for inline snippets. |
| `<img>` | Image | Attributes: `src`, `alt`, `width`, `height`. Wrapped in a `<div>` container. |
| `<table>` `<tbody>` `<tr>` `<td>` `<th>` | Table | Wrapped in a `<div>`. Cells may have `colspan`, `rowspan`. |
| `<div>` | Container | Wraps images, tables, and callout blocks. |
| `<br>` | Line break |  |
| `<hr>` | Horizontal rule |  |


Forward compatibility
Over time we may add support for new HTML elements in `message.body`. This will not constitute a breaking change. We advise client code to gracefully handle unknown HTML elements when rendering Fin's responses.