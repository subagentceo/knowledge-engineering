> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# JavaScript SDK reference

This page documents the public API for the Speech Engine JavaScript SDK (`@elevenlabs/elevenlabs-js`).

## Getting a Speech Engine resource

Retrieve a `SpeechEngineResource` by its engine ID. The returned object provides methods to attach to an existing HTTP server, start a standalone server, or create individual sessions.

```typescript
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

const elevenlabs = new ElevenLabsClient();
const engine = await elevenlabs.speechEngine.get("seng_8k3m9xr4hjnfg983brhmhkd98n6");
```

## SpeechEngineResource

### Properties

| Property   | Type     | Description                  |
| ---------- | -------- | ---------------------------- |
| `engineId` | `string` | The ID of the speech engine. |

### attach

Attach to an existing Node.js HTTP server and begin accepting Speech Engine connections at the given path. Use this when you already have an HTTP server (e.g. Express, Fastify, or a plain `http.createServer()`) and want to add Speech Engine alongside your existing routes.

Handles WebSocket upgrades, path routing, and request verification automatically. Returns a `SpeechEngineAttachment` whose `close()` method stops accepting connections without affecting the HTTP server.

```typescript
const attachment = engine.attach(httpServer, "/ws", {
  debug: true,
  onTranscript(transcript, signal, session) {
    session.sendResponse(stream);
  },
});
```

| Parameter    | Type                    | Description                                    |
| ------------ | ----------------------- | ---------------------------------------------- |
| `httpServer` | `http.Server`           | The Node.js HTTP server to attach to.          |
| `path`       | `string`                | URL path to handle WebSocket upgrades on.      |
| `handler`    | `SpeechEngineCallbacks` | Callback object (see [Callbacks](#callbacks)). |

A shortcut is available directly on the client, combining `get()` and `attach()` into a single call:

```typescript
await elevenlabs.speechEngine.attach("seng_8k3m9xr4hjnfg983brhmhkd98n6", httpServer, "/ws", {
  onTranscript(transcript, signal, session) {
    session.sendResponse(stream);
  },
});
```

### verifyRequest

Verify that an incoming request originates from the ElevenLabs Speech Engine API. Checks the `X-Elevenlabs-Speech-Engine-Authorization` header for a valid JWT signed with the SHA-256 hash of your API key.

Only needed when managing the WebSocket upgrade yourself. When using `attach()` or `SpeechEngineServer`, verification is handled automatically.

```typescript
const isValid = await engine.verifyRequest(req);
```

| Parameter | Type                                                           | Description                   |
| --------- | -------------------------------------------------------------- | ----------------------------- |
| `req`     | `{ headers: Record<string, string \| string[] \| undefined> }` | Incoming HTTP request object. |

**Returns:** `Promise<boolean>` — `true` if the request is valid.

### createSession

Wrap an accepted WebSocket in a `SpeechEngineSession`. Use this for custom server integration or manual WebSocket handling.

```typescript
const session = engine.createSession(ws, { debug: true });
session.on("user_transcript", (transcript, signal) => {
  /* ... */
});
```

| Parameter       | Type      | Default | Description                       |
| --------------- | --------- | ------- | --------------------------------- |
| `ws`            | WebSocket |         | An accepted WebSocket connection. |
| `options.debug` | `boolean` | `false` | Enable debug logging.             |

**Returns:** `SpeechEngineSession`

## SpeechEngineServer

A standalone WebSocket server that accepts Speech Engine connections without requiring an existing HTTP server. Use this when your server's only purpose is handling Speech Engine connections.

For integration with an existing HTTP server (e.g. Express, Fastify), use [`engine.attach()`](#attach) instead.

```typescript
import { SpeechEngine } from "@elevenlabs/elevenlabs-js";

const server = new SpeechEngine.Server({
  port: 3001,
  debug: true,
  onTranscript(transcript, signal, session) {
    session.sendResponse(stream);
  },
});

server.start();
```

### Constructor options

| Parameter  | Type                    | Default | Description                                                                                                                  |
| ---------- | ----------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `port`     | `number`                | `3001`  | Port to listen on.                                                                                                           |
| `apiKey`   | `string`                |         | ElevenLabs API key for verifying connections. Falls back to the `ELEVENLABS_API_KEY` environment variable.                   |
| `engineId` | `string`                |         | The speech engine ID. Populated automatically when created via the resource.                                                 |
| ...        | `SpeechEngineCallbacks` |         | All callback options (`onInit`, `onTranscript`, `onClose`, `onDisconnect`, `onError`, `debug`). See [Callbacks](#callbacks). |

### start

Start the standalone WebSocket server on the configured port. Verifies each incoming connection against the ElevenLabs API using the configured API key.

```typescript
server.start();
```

### stop

Stop the WebSocket server and close all active connections.

```typescript
await server.stop();
```

### handleConnection

Wrap an existing WebSocket in a `SpeechEngineSession` with the server's callbacks wired up. Use this when you manage your own WebSocket server and want to wrap individual connections.

```typescript
const session = server.handleConnection(ws);
```

| Parameter | Type        | Description                       |
| --------- | ----------- | --------------------------------- |
| `ws`      | `WebSocket` | An accepted WebSocket connection. |

**Returns:** `SpeechEngineSession`

## SpeechEngineSession

Wraps a single WebSocket connection. Each connection represents one conversation. The session emits events for transcripts and lifecycle changes, and provides methods to send LLM responses back.

When a new transcript arrives, the previous transcript handler's abort signal is fired, interrupting any in-flight LLM call.

### Properties

| Property         | Type      | Description                                                      |
| ---------------- | --------- | ---------------------------------------------------------------- |
| `conversationId` | `string`  | The conversation ID assigned by the API. Available after `init`. |
| `isOpen`         | `boolean` | Whether the session is still open.                               |

### on

Register a handler for an event. Returns the session for chaining.

```typescript
session.on("user_transcript", (transcript, signal) => {
  /* ... */
});
```

### off

Remove a previously registered handler.

```typescript
session.off("user_transcript", listener);
```

### once

Register a handler that fires once then removes itself.

```typescript
session.once("init", (conversationId) => {
  /* ... */
});
```

### sendResponse

Send an LLM response back to the Speech Engine API for text-to-speech synthesis. Must be called inside an `onTranscript` handler. Calling it outside of a handler emits a warning and returns without sending.

```typescript
// String response
session.sendResponse("Hello, how can I help?");

// Streamed response (OpenAI, Anthropic, or Gemini)
const stream = await openai.responses.create(
  { model: "gpt-4o", input: messages, stream: true },
  { signal }
);
session.sendResponse(stream);
```

| Parameter  | Type                                 | Description                                                                |
| ---------- | ------------------------------------ | -------------------------------------------------------------------------- |
| `response` | `string` \| `AsyncIterable<unknown>` | A complete string or an async iterable of text chunks / LLM stream events. |

The SDK auto-detects and extracts text from the following LLM stream formats:

| Provider                | Event format                                                                   |
| ----------------------- | ------------------------------------------------------------------------------ |
| OpenAI Responses API    | `{ type: "response.output_text.delta", delta: "text" }`                        |
| OpenAI Chat Completions | `{ choices: [{ delta: { content: "text" } }] }`                                |
| Anthropic Messages API  | `{ type: "content_block_delta", delta: { type: "text_delta", text: "text" } }` |
| Google Gemini API       | `{ candidates: [{ content: { parts: [{ text: "text" }] } }] }`                 |

### close

Close the session and the underlying WebSocket connection.

```typescript
session.close();
```

## SpeechEngineAttachment

Returned by `engine.attach()`. Controls the lifecycle of the WebSocket server without affecting the HTTP server it was attached to.

### close

Stop accepting new connections, remove the upgrade listener from the HTTP server, and close the underlying WebSocket server.

```typescript
await attachment.close();
```

## Callbacks

The callback object passed to `attach()` or `SpeechEngineServer`. All callbacks are optional.

| Callback       | Signature                                                                          | Description                                 |
| -------------- | ---------------------------------------------------------------------------------- | ------------------------------------------- |
| `onInit`       | `(conversationId: string, session: Session) => void`                               | Session initialized with a conversation ID. |
| `onTranscript` | `(transcript: TranscriptMessage[], signal: AbortSignal, session: Session) => void` | User speech transcribed.                    |
| `onClose`      | `(session: Session) => void`                                                       | Clean disconnect from ElevenLabs.           |
| `onDisconnect` | `(session: Session) => void`                                                       | WebSocket dropped unexpectedly.             |
| `onError`      | `(error: Error, session: Session) => void`                                         | Protocol or WebSocket error.                |
| `debug`        | `boolean`                                                                          | Enable debug logging.                       |

The `onTranscript` handler receives an `AbortSignal` that fires when the user interrupts mid-response.

## Events

When using `session.on()` directly instead of callbacks, these are the event names and their handler signatures.

| Event             | Handler signature                                        |
| ----------------- | -------------------------------------------------------- |
| `user_transcript` | `(transcript: TranscriptMessage[], signal: AbortSignal)` |
| `init`            | `(conversationId: string)`                               |
| `close`           | `()`                                                     |
| `disconnected`    | `()`                                                     |
| `error`           | `(error: Error)`                                         |

Event name constants are available for type-safe usage:

```typescript
import { SpeechEngine } from "@elevenlabs/elevenlabs-js";

session.on(SpeechEngine.USER_TRANSCRIPT, (transcript, signal) => {
  /* ... */
});
```

## TranscriptMessage

A single message in the conversation history. The full transcript is passed to `onTranscript` on every turn.

| Property  | Type                  | Description                      |
| --------- | --------------------- | -------------------------------- |
| `role`    | `"user"` \| `"agent"` | Who sent the message.            |
| `content` | `string`              | The text content of the message. |

## Wire protocol

For reference, these are the JSON messages exchanged over the WebSocket connection. The SDK handles serialization and deserialization automatically.

### Incoming (ElevenLabs API to developer server)

| Message type      | Fields                                                     | Description                         |
| ----------------- | ---------------------------------------------------------- | ----------------------------------- |
| `init`            | `conversation_id: string`                                  | Session initialized.                |
| `user_transcript` | `user_transcript: TranscriptMessage[]`, `event_id: number` | User speech transcribed.            |
| `ping`            |                                                            | Keep-alive. SDK responds with pong. |
| `close`           |                                                            | Clean disconnect.                   |
| `error`           | `message: string`                                          | Error from the API.                 |

### Outgoing (developer server to ElevenLabs API)

| Message type     | Fields                                                     | Description                           |
| ---------------- | ---------------------------------------------------------- | ------------------------------------- |
| `agent_response` | `content: string`, `event_id: number`, `is_final: boolean` | LLM response chunk for TTS synthesis. |
| `pong`           |                                                            | Response to ping.                     |