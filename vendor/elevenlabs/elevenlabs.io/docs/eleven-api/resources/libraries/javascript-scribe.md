> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# JavaScript SDK

For an overview of Scribe and its capabilities, see the [Speech to Text
overview](/docs/capabilities/speech-to-text). For step-by-step usage guides, see [Client-side
streaming](/docs/eleven-api/guides/how-to/speech-to-text/realtime/client-side-streaming).

## Installation

```shell
npm install @elevenlabs/client
# or
yarn add @elevenlabs/client
# or
pnpm install @elevenlabs/client
```

Use the [ElevenLabs speech-to-text skill](https://github.com/elevenlabs/skills/tree/main/speech-to-text) to transcribe audio from your AI coding assistant:

```bash
npx skills add elevenlabs/skills --skill speech-to-text
```

This library can be used in any JavaScript-based project. If you are using React, consider the
[`useScribe` hook](/docs/eleven-api/resources/libraries/react-scribe) which provides built-in
state management and lifecycle handling.

## Usage

Here is a minimal working example that connects to Scribe and logs transcription results:

```js
import { Scribe, RealtimeEvents } from "@elevenlabs/client";

const token = await fetchTokenFromServer();

const connection = Scribe.connect({
  token,
  modelId: "scribe_v2_realtime",
  microphone: {
    echoCancellation: true,
    noiseSuppression: true,
  },
});

connection.on(RealtimeEvents.PARTIAL_TRANSCRIPT, (data) => {
  console.log("Partial:", data.text);
});

connection.on(RealtimeEvents.COMMITTED_TRANSCRIPT, (data) => {
  console.log("Committed:", data.text);
});

// Later, close the connection
connection.close();
```

## Getting a token

Scribe requires a single-use token for authentication. Create an API endpoint on your server:

```js
// Node.js server
app.get("/scribe-token", yourAuthMiddleware, async (req, res) => {
  const response = await fetch("https://api.elevenlabs.io/v1/single-use-token/realtime_scribe", {
    method: "POST",
    headers: {
      "xi-api-key": process.env.ELEVENLABS_API_KEY,
    },
  });

  const data = await response.json();
  res.json({ token: data.token });
});
```

Your ElevenLabs API key is sensitive. Never expose it to the client. Always generate the token on
the server.

```js
// Client
const fetchToken = async () => {
  const response = await fetch("/scribe-token");
  const { token } = await response.json();
  return token;
};
```

## Connection options

`Scribe.connect()` accepts either microphone options or manual audio options. Both share a common set of base options.

### Base options

| Property                    | Type             | Default                     | Description                                                                         |
| --------------------------- | ---------------- | --------------------------- | ----------------------------------------------------------------------------------- |
| **token**                   | `string`         |                             | Single-use token for WebSocket authentication.                                      |
| **modelId**                 | `string`         |                             | Model ID (e.g., `"scribe_v2_realtime"`).                                            |
| **baseUri**                 | `string`         | `"wss://api.elevenlabs.io"` | Custom WebSocket base URI.                                                          |
| **commitStrategy**          | `CommitStrategy` | `"manual"`                  | `"manual"` or `"vad"`.                                                              |
| **vadSilenceThresholdSecs** | `number`         | `1.5`                       | Seconds of silence before VAD commits (0.3-3.0).                                    |
| **vadThreshold**            | `number`         | `0.4`                       | VAD sensitivity (0.1-0.9, lower is more sensitive).                                 |
| **minSpeechDurationMs**     | `number`         | `100`                       | Minimum speech duration in ms (50-2000).                                            |
| **minSilenceDurationMs**    | `number`         | `100`                       | Minimum silence duration in ms (50-2000).                                           |
| **languageCode**            | `string`         |                             | ISO-639-1 or ISO-639-3 language code. Leave empty for auto-detection.               |
| **includeTimestamps**       | `boolean`        | `false`                     | Receive word-level timestamps via the `COMMITTED_TRANSCRIPT_WITH_TIMESTAMPS` event. |

### Microphone options

Pass a `microphone` object to stream audio directly from the user's microphone. The connection handles `getUserMedia` and audio encoding automatically.

```js
const connection = Scribe.connect({
  token,
  modelId: "scribe_v2_realtime",
  microphone: {
    deviceId: "optional-device-id",
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true,
  },
});
```

| Property             | Type      | Description                    |
| -------------------- | --------- | ------------------------------ |
| **deviceId**         | `string`  | Specific microphone device ID. |
| **echoCancellation** | `boolean` | Enable echo cancellation.      |
| **noiseSuppression** | `boolean` | Enable noise suppression.      |
| **autoGainControl**  | `boolean` | Enable automatic gain control. |

### Manual audio options

Pass `audioFormat` and `sampleRate` to send audio data manually via `connection.send()`.

```js
import { AudioFormat } from "@elevenlabs/client";

const connection = Scribe.connect({
  token,
  modelId: "scribe_v2_realtime",
  audioFormat: AudioFormat.PCM_16000,
  sampleRate: 16000,
});
```

| Property        | Type          | Description                                            |
| --------------- | ------------- | ------------------------------------------------------ |
| **audioFormat** | `AudioFormat` | Audio encoding format (e.g., `AudioFormat.PCM_16000`). |
| **sampleRate**  | `number`      | Sample rate in Hz. Must match `audioFormat`.           |

#### AudioFormat enum

```typescript
enum AudioFormat {
  PCM_8000 = "pcm_8000",
  PCM_16000 = "pcm_16000",
  PCM_22050 = "pcm_22050",
  PCM_24000 = "pcm_24000",
  PCM_44100 = "pcm_44100",
  PCM_48000 = "pcm_48000",
  ULAW_8000 = "ulaw_8000",
}
```

## Microphone mode

Stream audio directly from the user's microphone:

```js
import { Scribe, RealtimeEvents } from "@elevenlabs/client";

async function transcribeFromMicrophone() {
  const token = await fetchToken();

  const connection = Scribe.connect({
    token,
    modelId: "scribe_v2_realtime",
    microphone: {
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true,
    },
  });

  connection.on(RealtimeEvents.PARTIAL_TRANSCRIPT, (data) => {
    document.getElementById("live").textContent = data.text;
  });

  connection.on(RealtimeEvents.COMMITTED_TRANSCRIPT, (data) => {
    const el = document.createElement("p");
    el.textContent = data.text;
    document.getElementById("transcripts").appendChild(el);
    document.getElementById("live").textContent = "";
  });

  document.getElementById("stop").addEventListener("click", () => {
    connection.close();
  });
}
```

## Manual audio mode (file transcription)

Transcribe pre-recorded audio files by sending audio data manually:

```js
import { Scribe, RealtimeEvents, AudioFormat } from "@elevenlabs/client";

async function transcribeFile(file) {
  const token = await fetchToken();

  const connection = Scribe.connect({
    token,
    modelId: "scribe_v2_realtime",
    audioFormat: AudioFormat.PCM_16000,
    sampleRate: 16000,
  });

  connection.on(RealtimeEvents.COMMITTED_TRANSCRIPT, (data) => {
    console.log("Transcript:", data.text);
  });

  // Decode audio file
  const arrayBuffer = await file.arrayBuffer();
  const audioContext = new AudioContext({ sampleRate: 16000 });
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

  // Convert to PCM16
  const channelData = audioBuffer.getChannelData(0);
  const pcmData = new Int16Array(channelData.length);

  for (let i = 0; i < channelData.length; i++) {
    const sample = Math.max(-1, Math.min(1, channelData[i]));
    pcmData[i] = sample < 0 ? sample * 32768 : sample * 32767;
  }

  // Send in chunks
  const chunkSize = 4096;
  for (let offset = 0; offset < pcmData.length; offset += chunkSize) {
    const chunk = pcmData.slice(offset, offset + chunkSize);
    const bytes = new Uint8Array(chunk.buffer);
    const base64 = btoa(String.fromCharCode(...bytes));

    connection.send({ audioBase64: base64 });
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  // Commit and close
  connection.commit();
}
```

## RealtimeConnection

`Scribe.connect()` returns a `RealtimeConnection` instance with the following methods.

### on(event, listener)

Register an event listener. See [Events](#events) for available event types.

```js
connection.on(RealtimeEvents.COMMITTED_TRANSCRIPT, (data) => {
  console.log("Committed:", data.text);
});
```

### off(event, listener)

Remove a previously registered event listener.

```js
const handler = (data) => console.log(data.text);
connection.on(RealtimeEvents.COMMITTED_TRANSCRIPT, handler);

// Later
connection.off(RealtimeEvents.COMMITTED_TRANSCRIPT, handler);
```

### send(data)

Send audio data to Scribe (manual audio mode only).

```js
connection.send({
  audioBase64: base64AudioChunk,
  commit: false, // Optional: commit immediately
  sampleRate: 16000, // Optional: override sample rate
  previousText: "Previous transcription text", // Optional: context from a previous transcription
});
```

The `previousText` field can only be sent in the first audio chunk of a session. Sending it in
subsequent chunks results in an error.

### commit()

Manually commit the current transcription. Only needed when using `CommitStrategy.MANUAL`.

```js
connection.commit();
```

### close()

Close the WebSocket connection and clean up resources (microphone stream, audio context).

```js
connection.close();
```

## Events

Register event listeners using `connection.on(event, listener)`. All events are available as constants on the `RealtimeEvents` enum.

### Transcription events

| Event                                       | Data                                                            | Description                              |
| ------------------------------------------- | --------------------------------------------------------------- | ---------------------------------------- |
| **SESSION\_STARTED**                        | `{ session_id: string }`                                        | Scribe session started.                  |
| **PARTIAL\_TRANSCRIPT**                     | `{ text: string }`                                              | Interim transcription result.            |
| **COMMITTED\_TRANSCRIPT**                   | `{ text: string }`                                              | Finalized transcription result.          |
| **COMMITTED\_TRANSCRIPT\_WITH\_TIMESTAMPS** | `{ text: string; language_code?: string; words?: WordsItem[] }` | Finalized result with word-level timing. |

The `WordsItem` type contains word-level timing information:

```typescript
interface WordsItem {
  text?: string; // Word text
  start?: number; // Start time in seconds
  end?: number; // End time in seconds
  type?: "word" | "spacing"; // Token type
  speaker_id?: string; // Speaker identifier
}
```

### Connection events

| Event     | Data             | Description                  |
| --------- | ---------------- | ---------------------------- |
| **OPEN**  | `Event`          | WebSocket connection opened. |
| **CLOSE** | `Event`          | WebSocket connection closed. |
| **ERROR** | `Error \| Event` | Generic error.               |

### Error events

All error events receive `{ error: string }`.

| Event                              | Description                                           |
| ---------------------------------- | ----------------------------------------------------- |
| **AUTH\_ERROR**                    | Authentication error.                                 |
| **QUOTA\_EXCEEDED**                | Usage quota exceeded.                                 |
| **COMMIT\_THROTTLED**              | Commit request throttled.                             |
| **TRANSCRIBER\_ERROR**             | Transcription engine error.                           |
| **UNACCEPTED\_TERMS**              | Terms of service not accepted.                        |
| **RATE\_LIMITED**                  | Rate limited.                                         |
| **INPUT\_ERROR**                   | Invalid input format.                                 |
| **QUEUE\_OVERFLOW**                | Processing queue full.                                |
| **RESOURCE\_EXHAUSTED**            | Server resources at capacity.                         |
| **SESSION\_TIME\_LIMIT\_EXCEEDED** | Maximum session time reached.                         |
| **CHUNK\_SIZE\_EXCEEDED**          | Audio chunk too large.                                |
| **INSUFFICIENT\_AUDIO\_ACTIVITY**  | Not enough audio activity to maintain the connection. |

## Commit strategies

Control when transcriptions are committed:

```js
import { Scribe, CommitStrategy } from '@elevenlabs/client';

// Manual (default): you control when to commit
const connection = Scribe.connect({
  token,
  modelId: 'scribe_v2_realtime',
  audioFormat: AudioFormat.PCM_16000,
  sampleRate: 16000,
  commitStrategy: CommitStrategy.MANUAL,
});

// Send audio, then commit when ready
connection.send({ audioBase64: chunk });
connection.commit();

// Voice Activity Detection: Scribe detects silences and commits automatically
const connection = Scribe.connect({
  token,
  modelId: 'scribe_v2_realtime',
  microphone: { echoCancellation: true },
  commitStrategy: CommitStrategy.VAD,
});
```

For more details, see [Transcripts and commit strategies](/docs/eleven-api/guides/how-to/speech-to-text/realtime/transcripts-and-commit-strategies).

## Complete example

Here is a complete example that transcribes microphone audio with VAD-based commit strategy:

```js
import { Scribe, RealtimeEvents, CommitStrategy } from "@elevenlabs/client";

async function startTranscription() {
  const token = await fetchToken();

  const connection = Scribe.connect({
    token,
    modelId: "scribe_v2_realtime",
    commitStrategy: CommitStrategy.VAD,
    microphone: {
      echoCancellation: true,
      noiseSuppression: true,
    },
  });

  connection.on(RealtimeEvents.SESSION_STARTED, (data) => {
    console.log("Session started:", data.session_id);
  });

  connection.on(RealtimeEvents.PARTIAL_TRANSCRIPT, (data) => {
    document.getElementById("live").textContent = data.text;
  });

  connection.on(RealtimeEvents.COMMITTED_TRANSCRIPT, (data) => {
    const el = document.createElement("p");
    el.textContent = data.text;
    document.getElementById("transcripts").appendChild(el);
    document.getElementById("live").textContent = "";
  });

  connection.on(RealtimeEvents.ERROR, (error) => {
    console.error("Scribe error:", error);
  });

  // Stop button
  document.getElementById("stop").addEventListener("click", () => {
    connection.close();
  });
}

document.getElementById("start").addEventListener("click", startTranscription);
```