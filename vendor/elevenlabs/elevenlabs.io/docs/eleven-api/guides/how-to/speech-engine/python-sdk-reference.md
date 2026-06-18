> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Python SDK reference

This page documents the public API for the Speech Engine Python SDK (`elevenlabs`).

## Getting a Speech Engine resource

Retrieve a `SpeechEngineResource` by its engine ID. The returned object provides methods to start a server, verify requests, or create individual sessions.

```python
from elevenlabs import AsyncElevenLabs

elevenlabs = AsyncElevenLabs()
engine = await elevenlabs.speech_engine.get("seng_8k3m9xr4hjnfg983brhmhkd98n6")
```

## SpeechEngineResource

### Properties

| Property    | Type  | Description                  |
| ----------- | ----- | ---------------------------- |
| `engine_id` | `str` | The ID of the speech engine. |

### serve

Start a standalone WebSocket server. Blocks until stopped.

```python
await engine.serve(
    port=3001,
    path="/ws",
    debug=True,
    on_transcript=handle_transcript,
)
```

| Parameter       | Type       | Default | Description                                            |
| --------------- | ---------- | ------- | ------------------------------------------------------ |
| `port`          | `int`      | `3001`  | Port to listen on.                                     |
| `path`          | `str`      | `None`  | Restrict connections to this path. `None` accepts all. |
| `debug`         | `bool`     | `False` | Enable debug logging to stdout.                        |
| `on_init`       | `callable` |         | Called when a session is initialized.                  |
| `on_transcript` | `callable` |         | Called when a user transcript arrives.                 |
| `on_close`      | `callable` |         | Called on clean disconnect.                            |
| `on_disconnect` | `callable` |         | Called when the WebSocket drops unexpectedly.          |
| `on_error`      | `callable` |         | Called on protocol or WebSocket errors.                |

### verify\_request

Verify that an incoming request originates from the ElevenLabs Speech Engine API. Checks the `X-Elevenlabs-Speech-Engine-Authorization` header for a valid JWT signed with the SHA-256 hash of your API key.

Only needed when managing the WebSocket upgrade yourself. When using `serve()`, verification is handled automatically.

```python
is_valid = engine.verify_request(headers)
```

| Parameter | Type   | Description                 |
| --------- | ------ | --------------------------- |
| `headers` | `dict` | Request headers dictionary. |

**Returns:** `bool` — `True` if the request is valid.

### create\_session

Wrap an accepted WebSocket in a `SpeechEngineSession`. Use this for custom server integration (e.g. FastAPI, Starlette, or manual WebSocket handling).

```python
session = engine.create_session(websocket, debug=True)
session.on("user_transcript", handle_transcript)
await session.run()
```

| Parameter | Type      | Default | Description                       |
| --------- | --------- | ------- | --------------------------------- |
| `ws`      | WebSocket |         | An accepted WebSocket connection. |
| `debug`   | `bool`    | `False` | Enable debug logging.             |

**Returns:** `SpeechEngineSession`

## SpeechEngineSession

Wraps a single WebSocket connection. Each connection represents one conversation. The session emits events for transcripts and lifecycle changes, and provides methods to send LLM responses back.

When a new transcript arrives, the previous transcript handler is cancelled automatically, interrupting any in-flight LLM call.

### Properties

| Property          | Type            | Description                                                      |
| ----------------- | --------------- | ---------------------------------------------------------------- |
| `conversation_id` | `Optional[str]` | The conversation ID assigned by the API. Available after `init`. |
| `is_open`         | `bool`          | Whether the session is still open.                               |

### on

Register a handler for an event. Returns the session for chaining.

```python
session.on("user_transcript", handler)
```

### off

Remove a previously registered handler.

```python
session.off("user_transcript", handler)
```

### once

Register a handler that fires once then removes itself.

```python
session.once("init", handler)
```

### send\_response

Send an LLM response back to the Speech Engine API for text-to-speech synthesis. Must be called inside an `on_transcript` handler. Calling it outside of a handler emits a warning and returns without sending.

```python
# String response
await session.send_response("Hello, how can I help?")

# Streamed response (OpenAI, Anthropic, or Gemini)
stream = await openai_client.responses.create(model="gpt-4o", input=messages, stream=True)
await session.send_response(stream)
```

| Parameter  | Type                    | Description                                                                |
| ---------- | ----------------------- | -------------------------------------------------------------------------- |
| `response` | `str` \| async iterable | A complete string or an async iterable of text chunks / LLM stream events. |

The SDK auto-detects and extracts text from the following LLM stream formats:

| Provider                | Event format                                                                   |
| ----------------------- | ------------------------------------------------------------------------------ |
| OpenAI Responses API    | `{ type: "response.output_text.delta", delta: "text" }`                        |
| OpenAI Chat Completions | `{ choices: [{ delta: { content: "text" } }] }`                                |
| Anthropic Messages API  | `{ type: "content_block_delta", delta: { type: "text_delta", text: "text" } }` |
| Google Gemini API       | `{ candidates: [{ content: { parts: [{ text: "text" }] } }] }`                 |

### run

Run the receive loop until the WebSocket closes. This is the main entry point after constructing a session manually via `create_session()`.

```python
session = engine.create_session(websocket)
session.on("user_transcript", handle_transcript)
await session.run()
```

### close

Close the session and the underlying WebSocket connection.

```python
session.close()
```

## Callbacks

The keyword arguments passed to `serve()`. All callbacks are optional. Handlers can be synchronous or asynchronous (coroutine) functions.

| Callback        | Signature                                 | Description                                 |
| --------------- | ----------------------------------------- | ------------------------------------------- |
| `on_init`       | `(conversation_id: str, session) -> None` | Session initialized with a conversation ID. |
| `on_transcript` | `(transcript: list, session) -> None`     | User speech transcribed.                    |
| `on_close`      | `(session) -> None`                       | Clean disconnect from ElevenLabs.           |
| `on_disconnect` | `(session) -> None`                       | WebSocket dropped unexpectedly.             |
| `on_error`      | `(error: Exception, session) -> None`     | Protocol or WebSocket error.                |

## Events

When using `session.on()` directly instead of callbacks, these are the event names and their handler signatures.

| Event             | Handler signature                         |
| ----------------- | ----------------------------------------- |
| `user_transcript` | `(transcript: list[ConversationMessage])` |
| `init`            | `(conversation_id: str)`                  |
| `close`           | `()`                                      |
| `disconnected`    | `()`                                      |
| `error`           | `(error: Exception)`                      |

Event name constants are available for type-safe usage:

```python
from elevenlabs.speech_engine import USER_TRANSCRIPT, INIT, CLOSE, DISCONNECTED, ERROR

session.on(USER_TRANSCRIPT, handle_transcript)
```

## ConversationMessage

A single message in the conversation history. The full transcript is passed to `on_transcript` on every turn.

| Property  | Type                  | Description                      |
| --------- | --------------------- | -------------------------------- |
| `role`    | `"user"` \| `"agent"` | Who sent the message.            |
| `content` | `str`                 | The text content of the message. |

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