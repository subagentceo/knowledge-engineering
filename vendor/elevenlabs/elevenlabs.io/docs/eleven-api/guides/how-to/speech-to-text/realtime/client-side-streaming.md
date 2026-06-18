> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Client-side streaming

**How-to guide** · Assumes you have completed the [Speech to Text
quickstart](/docs/eleven-api/guides/cookbooks/speech-to-text).

## Overview

The ElevenLabs Realtime Speech to Text API enables you to transcribe audio streams in real-time with ultra-low latency using the Scribe Realtime v2 model. Whether you're building voice assistants, transcription services, or any application requiring live speech recognition, this WebSocket-based API delivers partial transcripts as you speak and committed transcripts when speech segments are complete.

Scribe v2 Realtime can be implemented on the client side to transcribe audio in realtime, either via the microphone or manually chunking the audio.

The client side implementation differs from server side in a few ways:

* Requires a single use token - this is a temporary token that can be used to connect to the API without exposing your API key.
* Audio from the microphone can be piped directly to the API to transcribe, without the need to manually chunk the audio.

For streaming audio from a URL, see the [Server-side streaming](/docs/eleven-api/guides/how-to/speech-to-text/realtime/server-side-streaming) guide.

## Quickstart

This guide assumes you have [set up your API key](/docs/eleven-api/quickstart). Complete the
quickstart first if you haven't.

```bash title="React"
npm install @elevenlabs/react @elevenlabs/elevenlabs-js
```

```bash title="JavaScript"
npm install @elevenlabs/client @elevenlabs/elevenlabs-js
```

To use the client side SDK, you need to create a single use token. This is a temporary token that can be used to connect to the API without exposing your API key. This can be done via the ElevenLabs API on the server side.

Never expose your API key to the client.

```typescript
// Node.js server
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

app.get("/scribe-token", yourAuthMiddleware, async (req, res) => {
  const token = await elevenlabs.tokens.singleUse.create("realtime_scribe");

  res.json(token);
});
```

A single use token automatically expires after 15 minutes.

Transcription can be done either via the microphone or manually chunking your own audio. Your own audio can be a file or a stream.

For a full list of parameters and options the API supports, please refer to the [API reference](/docs/api-reference/speech-to-text/v-1-speech-to-text-realtime).

```typescript title="React"
import { useScribe } from "@elevenlabs/react";

function MyComponent() {
  const scribe = useScribe({
    modelId: "scribe_v2_realtime",
    onPartialTranscript: (data) => {
      console.log("Partial:", data.text);
    },
    onCommittedTranscript: (data) => {
      console.log("Committed:", data.text);
    },
    onCommittedTranscriptWithTimestamps: (data) => {
      console.log("Committed with timestamps:", data.text);
      console.log("Timestamps:", data.words);
    },
  });

  const handleStart = async () => {
    // Fetch a single use token from the server
    const token = await fetchTokenFromServer();

    await scribe.connect({
      token,
      microphone: {
        echoCancellation: true,
        noiseSuppression: true,
      },
    });
  };

  return (
    <div>
      <button onClick={handleStart} disabled={scribe.isConnected}>
        Start Recording
      </button>
      <button onClick={scribe.disconnect} disabled={!scribe.isConnected}>
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

```typescript title="JavaScript"
// Client side
import { Scribe, RealtimeEvents } from "@elevenlabs/client";

// Ensure you have authentication headers set up
const response = await fetch("/scribe-token", yourAuthHeaders);
const { token } = await response.json();

const connection = Scribe.connect({
  token,
  modelId: "scribe_v2_realtime",
  includeTimestamps: true,
  microphone: {
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true,
  },
});

// Set up event handlers

// Session started
connection.on(RealtimeEvents.SESSION_STARTED, () => {
  console.log("Session started");
});

// Partial transcripts (interim results), use this in your UI to show the live transcript
connection.on(RealtimeEvents.PARTIAL_TRANSCRIPT, (data) => {
  console.log("Partial:", data.text);
});

// Committed transcripts
connection.on(RealtimeEvents.COMMITTED_TRANSCRIPT, (data) => {
  console.log("Committed:", data.text);
});

// Committed transcripts with word-level timestamps. Only received when includeTimestamps is set to true.
connection.on(RealtimeEvents.COMMITTED_TRANSCRIPT_WITH_TIMESTAMPS, (data) => {
  console.log("Committed:", data.text);
  console.log("Timestamps:", data.words);
});

// Errors - will catch all errors, both server and websocket specific errors
connection.on(RealtimeEvents.ERROR, (error) => {
  console.error("Error:", error);
});

// Connection opened
connection.on(RealtimeEvents.OPEN, () => {
  console.log("Connection opened");
});

// Connection closed
connection.on(RealtimeEvents.CLOSE, () => {
  console.log("Connection closed");
});

// When you are done, close the connection
connection.close();
```

```typescript title="React"
import { useScribe, AudioFormat } from "@elevenlabs/react";

function FileTranscription() {
  const [file, setFile] = useState<File | null>(null);
  const scribe = useScribe({
    modelId: "scribe_v2_realtime",
    audioFormat: AudioFormat.PCM_16000,
    sampleRate: 16000,
  });

  const transcribeFile = async () => {
    if (!file) return;

    // Fetch a single use token from the server
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
      <input
        type="file"
        accept="audio/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
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

```typescript title="JavaScript"
import { Scribe, AudioFormat, RealtimeEvents, CommitStrategy } from "@elevenlabs/client";

// Ensure you have authentication headers set up
const response = await fetch("/scribe-token", yourAuthHeaders);
const { token } = await response.json();

const connection = Scribe.connect({
  token,
  modelId: "scribe_v2_realtime",
  includeTimestamps: true,
  audioFormat: AudioFormat.PCM_16000,
  sampleRate: 16000,
  commitStrategy: CommitStrategy.MANUAL,
});

// Set up event handlers
connection.on(RealtimeEvents.SESSION_STARTED, () => {
  console.log("Session started");
  sendAudio();
});

connection.on(RealtimeEvents.PARTIAL_TRANSCRIPT, (data) => {
  console.log("Partial:", data.text);
});

connection.on(RealtimeEvents.COMMITTED_TRANSCRIPT, (data) => {
  console.log("Committed:", data.text);
});

connection.on(RealtimeEvents.ERROR, (error) => {
  console.error("Error:", error);
});

// Committed transcripts with word-level timestamps. Only received when includeTimestamps is set to true.
connection.on(RealtimeEvents.COMMITTED_TRANSCRIPT_WITH_TIMESTAMPS, (data) => {
  console.log("Committed:", data.text);
  console.log("Timestamps:", data.words);

  // Committed transcript received, close the connection
  connection.close();
});

async function sendAudio() {
  // Get file from input element
  const fileInput = document.querySelector('input[type="file"]');
  const audioFile = fileInput.files[0];

  // Read file as ArrayBuffer
  const arrayBuffer = await audioFile.arrayBuffer();
  const audioData = new Uint8Array(arrayBuffer);

  // Convert to base64 and send in chunks
  const chunkSize = 8192; // 8KB chunks
  for (let i = 0; i < audioData.length; i += chunkSize) {
    const chunk = audioData.slice(i, i + chunkSize);
    const base64 = btoa(String.fromCharCode(...chunk));

    // Send audio chunk
    connection.send({ audioBase64: base64 });

    // Optional: Add delay to simulate real-time streaming
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  // Signal end of audio segment
  connection.commit();
}
```

## Next steps

Transcribe audio streams on the server side with the same WebSocket API.

Control when transcripts are committed and how to handle partial results.