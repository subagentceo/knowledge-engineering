> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# React SDK

For an overview of Scribe and its capabilities, see the [Speech to Text
overview](/docs/capabilities/speech-to-text). For step-by-step usage guides, see [Client-side
streaming](/docs/eleven-api/guides/how-to/speech-to-text/realtime/client-side-streaming).

## Installation

```shell
npm install @elevenlabs/react
# or
yarn add @elevenlabs/react
# or
pnpm install @elevenlabs/react
```

Use the [ElevenLabs speech-to-text skill](https://github.com/elevenlabs/skills/tree/main/speech-to-text) to transcribe audio from your AI coding assistant:

```bash
npx skills add elevenlabs/skills --skill speech-to-text
```

`@elevenlabs/react` re-exports everything from `@elevenlabs/client`, so you don't need to install
both packages.

## Usage

Here is a minimal working example that connects to Scribe and displays real-time transcription:

```tsx
import { useScribe } from "@elevenlabs/react";
import { useEffect } from "react";

function MyComponent() {
  const scribe = useScribe({
    modelId: "scribe_v2_realtime",
    onPartialTranscript: (data) => {
      console.log("Partial:", data.text);
    },
    onCommittedTranscript: (data) => {
      console.log("Committed:", data.text);
    },
  });

  // Start recording
  const handleStart = async () => {
    try {
      const token = await fetchTokenFromServer();
      await scribe.connect({
        token,
        microphone: {
          echoCancellation: true,
          noiseSuppression: true,
        },
      });
    } catch (err) {
      console.error("Failed to start recording:", err);
    }
  };

  // Stop recording
  const handleDisconnect = () => {
    scribe.disconnect();
  };

  // Disconnect on unmount
  useEffect(() => {
    return () => {
      if (scribe.isConnected) {
        scribe.disconnect();
      }
    };
  }, [scribe]);

  return (
    <div>
      <button onClick={handleStart} disabled={scribe.isConnected}>
        Start Recording
      </button>
      <button onClick={handleDisconnect} disabled={!scribe.isConnected}>
        Stop
      </button>

      {scribe.partialTranscript && <p>Live: {scribe.partialTranscript}</p>}

      <div>
        {scribe.committedTranscripts.map((t) => (
          <p key={t.id}>{t.text}</p>
        ))}
      </div>
    </div>
  );
}
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

```tsx
// Client
const fetchToken = async () => {
  const response = await fetch("/scribe-token");
  const { token } = await response.json();
  return token;
};
```

## Hook options

Configure the hook with default options and callbacks:

```tsx
const scribe = useScribe({
  // Connection options (can be overridden in connect())
  token: "optional-default-token",
  modelId: "scribe_v2_realtime",
  baseUri: "wss://api.elevenlabs.io",

  // VAD options
  commitStrategy: CommitStrategy.VAD,
  vadSilenceThresholdSecs: 0.5,
  vadThreshold: 0.5,
  minSpeechDurationMs: 100,
  minSilenceDurationMs: 500,
  languageCode: "en",

  // Microphone options (for automatic mode)
  microphone: {
    deviceId: "optional-device-id",
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true,
  },

  // Manual audio options (for file transcription)
  audioFormat: AudioFormat.PCM_16000,
  sampleRate: 16000,

  // Auto-connect on mount
  autoConnect: false,

  // Event callbacks
  onSessionStarted: () => console.log("Session started"),
  onPartialTranscript: (data) => console.log("Partial:", data.text),
  onCommittedTranscript: (data) => console.log("Committed:", data.text),
  onCommittedTranscriptWithTimestamps: (data) => console.log("With timestamps:", data),
  onError: (error) => console.error("Error:", error),
  onAuthError: (data) => console.error("Auth error:", data.error),
  onQuotaExceededError: (data) => console.error("Quota exceeded:", data.error),
  onConnect: () => console.log("Connected"),
  onDisconnect: () => console.log("Disconnected"),
});
```

### Connection options

| Property    | Type     | Description                                                       |
| ----------- | -------- | ----------------------------------------------------------------- |
| **token**   | `string` | Single-use token for WebSocket authentication.                    |
| **modelId** | `string` | Model ID (e.g., `"scribe_v2_realtime"`).                          |
| **baseUri** | `string` | Custom WebSocket base URI. Defaults to `wss://api.elevenlabs.io`. |

### VAD options

These options control when transcripts are automatically committed when using the `VAD` commit strategy.

| Property                    | Type             | Default    | Description                                         |
| --------------------------- | ---------------- | ---------- | --------------------------------------------------- |
| **commitStrategy**          | `CommitStrategy` | `"manual"` | `"manual"` or `"vad"`.                              |
| **vadSilenceThresholdSecs** | `number`         | `1.5`      | Seconds of silence before VAD commits (0.3-3.0).    |
| **vadThreshold**            | `number`         | `0.4`      | VAD sensitivity (0.1-0.9, lower is more sensitive). |
| **minSpeechDurationMs**     | `number`         | `100`      | Minimum speech duration in ms (50-2000).            |
| **minSilenceDurationMs**    | `number`         | `100`      | Minimum silence duration in ms (50-2000).           |

### Audio options

| Property         | Type          | Description                                                            |
| ---------------- | ------------- | ---------------------------------------------------------------------- |
| **languageCode** | `string`      | ISO-639-1 or ISO-639-3 language code. Leave empty for auto-detection.  |
| **microphone**   | `object`      | Microphone settings for microphone mode. See below.                    |
| **audioFormat**  | `AudioFormat` | Audio encoding format for manual mode (e.g., `AudioFormat.PCM_16000`). |
| **sampleRate**   | `number`      | Sample rate for manual mode. Must match `audioFormat`.                 |

The `microphone` object accepts:

| Property             | Type      | Description                    |
| -------------------- | --------- | ------------------------------ |
| **deviceId**         | `string`  | Specific microphone device ID. |
| **echoCancellation** | `boolean` | Enable echo cancellation.      |
| **noiseSuppression** | `boolean` | Enable noise suppression.      |
| **autoGainControl**  | `boolean` | Enable automatic gain control. |

### Behavior options

| Property              | Type      | Default | Description                                                                                         |
| --------------------- | --------- | ------- | --------------------------------------------------------------------------------------------------- |
| **autoConnect**       | `boolean` | `false` | Automatically connect on component mount.                                                           |
| **includeTimestamps** | `boolean` | `false` | Receive word-level timestamps. Auto-enabled when `onCommittedTranscriptWithTimestamps` is provided. |

### Callbacks

All event callbacks are optional and can be provided as hook options:

* **onConnect** - handler called when the WebSocket connection is established.
* **onDisconnect** - handler called when the WebSocket connection is closed.
* **onSessionStarted** - handler called when the Scribe session starts.
* **onPartialTranscript** - handler called with interim transcription results. Receives `{ text: string }`.
* **onCommittedTranscript** - handler called with finalized transcription results. Receives `{ text: string }`.
* **onCommittedTranscriptWithTimestamps** - handler called with finalized transcription results including word-level timing. Receives `{ text: string; words?: { start: number; end: number }[] }`.
* **onError** - generic error handler for all errors. Receives `Error | Event`.
* **onAuthError** - handler called on authentication errors. Receives `{ error: string }`.

#### Error callbacks

The generic `onError` callback fires for all errors. Specific error callbacks are also available for granular handling. All specific error callbacks receive `{ error: string }`.

| Callback                             | Description                                           |
| ------------------------------------ | ----------------------------------------------------- |
| **onError**                          | Generic error handler for all errors.                 |
| **onAuthError**                      | Authentication error.                                 |
| **onQuotaExceededError**             | Usage quota exceeded.                                 |
| **onCommitThrottledError**           | Commit request throttled.                             |
| **onTranscriberError**               | Transcription engine error.                           |
| **onUnacceptedTermsError**           | Terms of service not accepted.                        |
| **onRateLimitedError**               | Rate limited.                                         |
| **onInputError**                     | Invalid input format.                                 |
| **onQueueOverflowError**             | Processing queue full.                                |
| **onResourceExhaustedError**         | Server resources at capacity.                         |
| **onSessionTimeLimitExceededError**  | Maximum session time reached.                         |
| **onChunkSizeExceededError**         | Audio chunk too large.                                |
| **onInsufficientAudioActivityError** | Not enough audio activity to maintain the connection. |

## Microphone mode

Stream audio directly from the user's microphone:

```tsx
function MicrophoneTranscription() {
  const scribe = useScribe({
    modelId: "scribe_v2_realtime",
  });

  const startRecording = async () => {
    const token = await fetchToken();
    await scribe.connect({
      token,
      microphone: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      },
    });
  };

  return (
    <div>
      <button onClick={startRecording} disabled={scribe.isConnected}>
        {scribe.status === "connecting" ? "Connecting..." : "Start"}
      </button>
      <button onClick={scribe.disconnect} disabled={!scribe.isConnected}>
        Stop
      </button>

      {scribe.partialTranscript && (
        <div>
          <strong>Speaking:</strong> {scribe.partialTranscript}
        </div>
      )}

      {scribe.committedTranscripts.map((transcript) => (
        <div key={transcript.id}>{transcript.text}</div>
      ))}
    </div>
  );
}
```

## Manual audio mode (file transcription)

Transcribe pre-recorded audio files:

```tsx
import { useScribe, AudioFormat } from "@elevenlabs/react";
import { useState } from "react";

function FileTranscription() {
  const [file, setFile] = useState<File | null>(null);
  const scribe = useScribe({
    modelId: "scribe_v2_realtime",
    audioFormat: AudioFormat.PCM_16000,
    sampleRate: 16000,
  });

  const transcribeFile = async () => {
    if (!file) return;

    const token = await fetchToken();
    await scribe.connect({ token });

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

      scribe.sendAudio(base64);
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    // Commit transcription
    scribe.commit();
  };

  return (
    <div>
      <input type="file" accept="audio/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button onClick={transcribeFile} disabled={!file || scribe.isConnected}>
        Transcribe
      </button>

      {scribe.committedTranscripts.map((transcript) => (
        <div key={transcript.id}>{transcript.text}</div>
      ))}
    </div>
  );
}
```

## Return values

### State

* **status** - current connection status: `"disconnected"`, `"connecting"`, `"connected"`, `"transcribing"`, or `"error"`.
* **isConnected** - boolean indicating if connected.
* **isTranscribing** - boolean indicating if actively transcribing.
* **partialTranscript** - current partial (interim) transcript string.
* **committedTranscripts** - array of `TranscriptSegment` objects (see below).
* **error** - current error message, or `null`.

```tsx
const scribe = useScribe(/* options */);

console.log(scribe.status); // "connected"
console.log(scribe.isConnected); // true
console.log(scribe.partialTranscript); // "hello world"
console.log(scribe.committedTranscripts); // [{ id: "...", text: "...", words: ..., isFinal: true }]
console.log(scribe.error); // null or error string
```

Each committed transcript segment has the following structure:

```typescript
interface TranscriptSegment {
  id: string; // Unique identifier
  text: string; // Transcript text
  timestamp: number; // Unix timestamp
  isFinal: boolean; // Always true for committed transcripts
}
```

### Methods

#### connect(options?)

Connect to Scribe. Options provided here override hook defaults:

```tsx
await scribe.connect({
  token: "your-token", // Required
  microphone: {
    /* ... */
  }, // For microphone mode
  // OR
  audioFormat: AudioFormat.PCM_16000, // For manual mode
  sampleRate: 16000,
});
```

#### disconnect()

Disconnect and clean up resources:

```tsx
scribe.disconnect();
```

#### sendAudio(audioBase64, options?)

Send audio data (manual mode only):

```tsx
scribe.sendAudio(base64AudioChunk, {
  commit: false, // Optional: commit immediately
  sampleRate: 16000, // Optional: override sample rate
  previousText: "Previous transcription text", // Optional: context from a previous transcription. Can only be sent in the first audio chunk.
});
```

The `previousText` field can only be sent in the first audio chunk of a session. Sending it in
subsequent chunks results in an error.

#### commit()

Manually commit the current transcription:

```tsx
scribe.commit();
```

#### clearTranscripts()

Clear all transcripts from state:

```tsx
scribe.clearTranscripts();
```

#### getConnection()

Get the underlying connection instance:

```tsx
const connection = scribe.getConnection();
// Returns RealtimeConnection | null
```

## Commit strategies

Control when transcriptions are committed:

```tsx
import { CommitStrategy } from '@elevenlabs/react';

// Manual (default) - you control when to commit
const scribe = useScribe({
  commitStrategy: CommitStrategy.MANUAL,
});

// Later...
scribe.commit(); // Commit transcription

// Voice Activity Detection - model detects silences and automatically commits
const scribe = useScribe({
  commitStrategy: CommitStrategy.VAD,
});
```

For more details, see [Transcripts and commit strategies](/docs/eleven-api/guides/how-to/speech-to-text/realtime/transcripts-and-commit-strategies).

## Complete example

Here is a complete example of a React component using the `useScribe` hook with VAD-based commit strategy:

```tsx
import { useScribe, CommitStrategy } from "@elevenlabs/react";
import { useEffect } from "react";

function ScribeDemo() {
  const scribe = useScribe({
    modelId: "scribe_v2_realtime",
    commitStrategy: CommitStrategy.VAD,
    onSessionStarted: () => console.log("Started"),
    onCommittedTranscript: (data) => console.log("Committed:", data.text),
    onError: (error) => console.error("Error:", error),
  });

  const startMicrophone = async () => {
    const token = await fetchToken();
    await scribe.connect({
      token,
      microphone: {
        echoCancellation: true,
        noiseSuppression: true,
      },
    });
  };

  const handleDisconnect = () => scribe.disconnect();

  const handleClearTranscripts = () => scribe.clearTranscripts();

  useEffect(() => {
    return () => {
      handleDisconnect();
    };
  }, []);

  return (
    <div>
      <h1>Scribe Demo</h1>

      {/* Status */}
      <div>
        Status: {scribe.status}
        {scribe.error && <span>Error: {scribe.error}</span>}
      </div>

      {/* Controls */}
      <div>
        {!scribe.isConnected ? (
          <button onClick={startMicrophone}>Start Recording</button>
        ) : (
          <button onClick={handleDisconnect}>Stop</button>
        )}
        <button onClick={handleClearTranscripts}>Clear</button>
      </div>

      {/* Live Transcript */}
      {scribe.partialTranscript && (
        <div>
          <strong>Live:</strong> {scribe.partialTranscript}
        </div>
      )}

      {/* Committed Transcripts */}
      <div>
        <h2>Transcripts ({scribe.committedTranscripts.length})</h2>
        {scribe.committedTranscripts.map((t) => (
          <div key={t.id}>
            <span>{new Date(t.timestamp).toLocaleTimeString()}</span>
            <p>{t.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```