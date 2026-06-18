---
title: Voice
description: Build real-time voice agents with speech-to-text, text-to-speech, and conversation persistence over WebSocket.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Voice

Build real-time voice agents with speech-to-text, text-to-speech, and conversation persistence. Audio streams over WebSocket — no SFU or meeting infrastructure required. Beta

## Overview

`@cloudflare/voice` provides two server-side mixins and matching client libraries:

| Export         | Import                   | Purpose                                      |
| -------------- | ------------------------ | -------------------------------------------- |
| withVoice      | @cloudflare/voice        | Full voice agent: STT, LLM, TTS, persistence |
| withVoiceInput | @cloudflare/voice        | STT-only: transcription without response     |
| useVoiceAgent  | @cloudflare/voice/react  | React hook for withVoice agents              |
| useVoiceInput  | @cloudflare/voice/react  | React hook for withVoiceInput agents         |
| VoiceClient    | @cloudflare/voice/client | Framework-agnostic client                    |

Built on Cloudflare Durable Objects, you get:

* **Real-time audio** — mic audio streams as binary WebSocket frames, TTS audio streams back
* **Automatic conversation persistence** — messages stored in SQLite, survive restarts
* **Streaming TTS** — LLM tokens are sentence-chunked and synthesized concurrently
* **Interruption handling** — user speech during playback cancels the current response
* **Continuous STT** — per-call transcriber session, model handles turn detection
* **Pipeline hooks** — intercept and transform text at every stage

## Quick start

### Install

Terminal window

```

npm install @cloudflare/voice agents


```

### Server

* [  JavaScript ](#tab-panel-5295)
* [  TypeScript ](#tab-panel-5296)

JavaScript

```

import { Agent } from "agents";

import { withVoice, WorkersAIFluxSTT, WorkersAITTS } from "@cloudflare/voice";


const VoiceAgent = withVoice(Agent);


export class MyAgent extends VoiceAgent {

  transcriber = new WorkersAIFluxSTT(this.env.AI);

  tts = new WorkersAITTS(this.env.AI);


  async onTurn(transcript, context) {

    return "Hello! I heard you say: " + transcript;

  }

}


```

TypeScript

```

import { Agent } from "agents";

import {

  withVoice,

  WorkersAIFluxSTT,

  WorkersAITTS,

  type VoiceTurnContext,

} from "@cloudflare/voice";


const VoiceAgent = withVoice(Agent);


export class MyAgent extends VoiceAgent<Env> {

  transcriber = new WorkersAIFluxSTT(this.env.AI);

  tts = new WorkersAITTS(this.env.AI);


  async onTurn(transcript: string, context: VoiceTurnContext) {

    return "Hello! I heard you say: " + transcript;

  }

}


```

### Client (React)

```

import { useVoiceAgent } from "@cloudflare/voice/react";


function VoiceUI() {

  const {

    status,

    transcript,

    interimTranscript,

    audioLevel,

    isMuted,

    startCall,

    endCall,

    toggleMute,

  } = useVoiceAgent({ agent: "MyAgent" });


  return (

    <div>

      <p>Status: {status}</p>


      <button onClick={status === "idle" ? startCall : endCall}>

        {status === "idle" ? "Start Call" : "End Call"}

      </button>


      <button onClick={toggleMute}>{isMuted ? "Unmute" : "Mute"}</button>


      {interimTranscript && (

        <p>

          <em>{interimTranscript}</em>

        </p>

      )}


      {transcript.map((msg, i) => (

        <p key={i}>

          <strong>{msg.role}:</strong> {msg.text}

        </p>

      ))}

    </div>

  );

}


```

### Wrangler configuration

* [  wrangler.jsonc ](#tab-panel-5285)
* [  wrangler.toml ](#tab-panel-5286)

JSONC

```

{

  "ai": {

    "binding": "AI"

  },

  "durable_objects": {

    "bindings": [

      {

        "name": "MyAgent",

        "class_name": "MyAgent"

      }

    ]

  },

  "migrations": [

    {

      "tag": "v1",

      "new_sqlite_classes": ["MyAgent"]

    }

  ]

}


```

TOML

```

[ai]

binding = "AI"


[[durable_objects.bindings]]

name = "MyAgent"

class_name = "MyAgent"


[[migrations]]

tag = "v1"

new_sqlite_classes = [ "MyAgent" ]


```

## How it works

```

Browser                              Durable Object (withVoice)

┌──────────┐                         ┌──────────────────────────┐

│ Mic      │   binary PCM (16kHz)    │ Transcriber session      │

│          │ ──────────────────────► │ (per-call, continuous)   │

│          │                         │   ↓ model detects turn   │

│          │   JSON: transcript      │ onTurn() → your LLM code │

│          │ ◄────────────────────── │   ↓ (sentence chunking)  │

│          │   binary: audio         │ TTS                      │

│ Speaker  │ ◄────────────────────── │                          │

└──────────┘                         └──────────────────────────┘


```

1. The client captures mic audio and sends it as binary WebSocket frames (16kHz mono 16-bit PCM).
2. Audio streams continuously to the transcriber session (created at `start_call`, lives for the entire call).
3. The STT model detects when the user finishes an utterance and fires `onUtterance`. All providers use **model-driven turn detection** — the client does not need to signal end-of-speech for STT.
4. Your `onTurn()` method runs — typically an LLM call.
5. The response is sentence-chunked and synthesized via TTS.
6. Audio streams back to the client for playback.

The client receives `transcript_interim` messages with partial results as the user speaks, so you can show real-time feedback in the UI.

## Server API: `withVoice`

`withVoice(Agent)` adds the full voice pipeline to an Agent class.

### Providers

Set providers as class properties. Class field initializers run after `super()`, so `this.env` is available.

| Property    | Type        | Required | Description                      |
| ----------- | ----------- | -------- | -------------------------------- |
| transcriber | Transcriber | Yes      | Continuous per-call STT provider |
| tts         | TTSProvider | Yes      | Text-to-speech                   |

* [  JavaScript ](#tab-panel-5287)
* [  TypeScript ](#tab-panel-5288)

JavaScript

```

import { withVoice, WorkersAIFluxSTT, WorkersAITTS } from "@cloudflare/voice";


const VoiceAgent = withVoice(Agent);


export class MyAgent extends VoiceAgent {

  transcriber = new WorkersAIFluxSTT(this.env.AI);

  tts = new WorkersAITTS(this.env.AI);

}


```

TypeScript

```

import { withVoice, WorkersAIFluxSTT, WorkersAITTS } from "@cloudflare/voice";


const VoiceAgent = withVoice(Agent);


export class MyAgent extends VoiceAgent<Env> {

  transcriber = new WorkersAIFluxSTT(this.env.AI);

  tts = new WorkersAITTS(this.env.AI);

}


```

For runtime model switching (for example, a Flux vs Nova 3 dropdown), override `createTranscriber`:

* [  JavaScript ](#tab-panel-5289)
* [  TypeScript ](#tab-panel-5290)

JavaScript

```

export class MyAgent extends VoiceAgent {

  tts = new WorkersAITTS(this.env.AI);


  createTranscriber(connection) {

    return new WorkersAIFluxSTT(this.env.AI);

  }

}


```

TypeScript

```

export class MyAgent extends VoiceAgent<Env> {

  tts = new WorkersAITTS(this.env.AI);


  createTranscriber(connection: Connection): Transcriber {

    return new WorkersAIFluxSTT(this.env.AI);

  }

}


```

### `onTurn(transcript, context)`

**Required.** Called when the user finishes speaking and the transcript is ready.

Return a `string`, `AsyncIterable<string>`, or `ReadableStream` for streaming responses.

**Simple response:**

* [  JavaScript ](#tab-panel-5291)
* [  TypeScript ](#tab-panel-5292)

JavaScript

```

export class MyAgent extends VoiceAgent {

  transcriber = new WorkersAIFluxSTT(this.env.AI);

  tts = new WorkersAITTS(this.env.AI);


  async onTurn(transcript, context) {

    return "You said: " + transcript;

  }

}


```

TypeScript

```

export class MyAgent extends VoiceAgent<Env> {

  transcriber = new WorkersAIFluxSTT(this.env.AI);

  tts = new WorkersAITTS(this.env.AI);


  async onTurn(transcript: string, context: VoiceTurnContext) {

    return "You said: " + transcript;

  }

}


```

**Streaming response (recommended for LLM):**

* [  JavaScript ](#tab-panel-5309)
* [  TypeScript ](#tab-panel-5310)

JavaScript

```

import { streamText } from "ai";

import { createWorkersAI } from "workers-ai-provider";


export class MyAgent extends VoiceAgent {

  transcriber = new WorkersAIFluxSTT(this.env.AI);

  tts = new WorkersAITTS(this.env.AI);


  async onTurn(transcript, context) {

    const workersai = createWorkersAI({ binding: this.env.AI });


    const result = streamText({

      model: workersai("@cf/moonshotai/kimi-k2.6"),

      system: "You are a helpful voice assistant. Keep responses concise.",

      messages: [

        ...context.messages.map((m) => ({

          role: m.role,

          content: m.content,

        })),

        { role: "user", content: transcript },

      ],

      abortSignal: context.signal,

    });


    return result.textStream;

  }

}


```

TypeScript

```

import { streamText } from "ai";

import { createWorkersAI } from "workers-ai-provider";


export class MyAgent extends VoiceAgent<Env> {

  transcriber = new WorkersAIFluxSTT(this.env.AI);

  tts = new WorkersAITTS(this.env.AI);


  async onTurn(transcript: string, context: VoiceTurnContext) {

    const workersai = createWorkersAI({ binding: this.env.AI });


    const result = streamText({

      model: workersai("@cf/moonshotai/kimi-k2.6"),

      system: "You are a helpful voice assistant. Keep responses concise.",

      messages: [

        ...context.messages.map((m) => ({

          role: m.role as "user" | "assistant",

          content: m.content,

        })),

        { role: "user", content: transcript },

      ],

      abortSignal: context.signal,

    });


    return result.textStream;

  }

}


```

The `context` object provides:

| Field      | Type                                     | Description                        |
| ---------- | ---------------------------------------- | ---------------------------------- |
| connection | Connection                               | The WebSocket connection           |
| messages   | Array<{ role: string; content: string }> | Conversation history from SQLite   |
| signal     | AbortSignal                              | Aborted on interrupt or disconnect |

### Lifecycle hooks

| Method                      | Description                                 |
| --------------------------- | ------------------------------------------- |
| beforeCallStart(connection) | Return false to reject the call             |
| onCallStart(connection)     | Called after a call is accepted             |
| onCallEnd(connection)       | Called when a call ends                     |
| onInterrupt(connection)     | Called when user interrupts during playback |

### Pipeline hooks

Intercept and transform data at each pipeline stage. Return `null` to skip the current utterance.

| Method                                   | Receives        | Can skip? |
| ---------------------------------------- | --------------- | --------- |
| afterTranscribe(transcript, connection)  | STT text        | Yes       |
| beforeSynthesize(text, connection)       | Text before TTS | Yes       |
| afterSynthesize(audio, text, connection) | Audio after TTS | Yes       |

* [  JavaScript ](#tab-panel-5301)
* [  TypeScript ](#tab-panel-5302)

JavaScript

```

import {} from "agents";


export class MyAgent extends VoiceAgent {

  transcriber = new WorkersAIFluxSTT(this.env.AI);

  tts = new WorkersAITTS(this.env.AI);


  afterTranscribe(transcript, connection) {

    if (transcript.length < 3) return null;

    return transcript;

  }


  beforeSynthesize(text, connection) {

    return text.replace(/\bAI\b/g, "A.I.");

  }


  async onTurn(transcript, context) {

    return transcript;

  }

}


```

TypeScript

```

import { type Connection } from "agents";


export class MyAgent extends VoiceAgent<Env> {

  transcriber = new WorkersAIFluxSTT(this.env.AI);

  tts = new WorkersAITTS(this.env.AI);


  afterTranscribe(transcript: string, connection: Connection) {

    if (transcript.length < 3) return null;

    return transcript;

  }


  beforeSynthesize(text: string, connection: Connection) {

    return text.replace(/\bAI\b/g, "A.I.");

  }


  async onTurn(transcript: string, context: VoiceTurnContext) {

    return transcript;

  }

}


```

### Convenience methods

| Method                   | Description                                  |
| ------------------------ | -------------------------------------------- |
| speak(connection, text)  | Synthesize and send audio to one connection  |
| speakAll(text)           | Synthesize and send audio to all connections |
| forceEndCall(connection) | Programmatically end a call                  |
| saveMessage(role, text)  | Persist a message to conversation history    |
| getConversationHistory() | Retrieve conversation history from SQLite    |

### Configuration options

Pass options to `withVoice()` as the second argument:

* [  JavaScript ](#tab-panel-5293)
* [  TypeScript ](#tab-panel-5294)

JavaScript

```

const VoiceAgent = withVoice(Agent, {

  historyLimit: 20,

  audioFormat: "mp3",

  maxMessageCount: 1000,

});


```

TypeScript

```

const VoiceAgent = withVoice(Agent, {

  historyLimit: 20,

  audioFormat: "mp3",

  maxMessageCount: 1000,

});


```

| Option          | Type   | Default | Description                     |
| --------------- | ------ | ------- | ------------------------------- |
| historyLimit    | number | 20      | Max messages loaded for context |
| audioFormat     | string | "mp3"   | Audio format sent to client     |
| maxMessageCount | number | 1000    | Max messages stored in SQLite   |

## Server API: `withVoiceInput`

`withVoiceInput(Agent)` adds STT-only voice input — no TTS, no LLM, no response generation. Use this for dictation, search-by-voice, or any UI where you need speech-to-text without a conversational agent.

* [  JavaScript ](#tab-panel-5299)
* [  TypeScript ](#tab-panel-5300)

JavaScript

```

import { Agent } from "agents";

import { withVoiceInput, WorkersAINova3STT } from "@cloudflare/voice";


const InputAgent = withVoiceInput(Agent);


export class DictationAgent extends InputAgent {

  transcriber = new WorkersAINova3STT(this.env.AI);


  onTranscript(text, connection) {

    console.log("User said:", text);

  }

}


```

TypeScript

```

import { Agent } from "agents";

import { withVoiceInput, WorkersAINova3STT } from "@cloudflare/voice";


const InputAgent = withVoiceInput(Agent);


export class DictationAgent extends InputAgent<Env> {

  transcriber = new WorkersAINova3STT(this.env.AI);


  onTranscript(text: string, connection: Connection) {

    console.log("User said:", text);

  }

}


```

### `onTranscript(text, connection)`

Called after each utterance is transcribed. Override this to process the transcript.

### Hooks

`withVoiceInput` supports the same lifecycle hooks as `withVoice`:

* `beforeCallStart(connection)` — return `false` to reject
* `onCallStart(connection)`, `onCallEnd(connection)`, `onInterrupt(connection)`
* `createTranscriber(connection)` — override for runtime model switching
* `afterTranscribe(transcript, connection)` — filter or transform transcripts

It does **not** have TTS hooks (`beforeSynthesize`, `afterSynthesize`) or `onTurn`.

## Client API: React hooks

### `useVoiceAgent`

Wraps `VoiceClient` for `withVoice` agents. Manages connection, mic capture, playback, silence detection, and interrupt detection.

```

import { useVoiceAgent } from "@cloudflare/voice/react";


const selectedSpeakerId = "default";


const {

  status, // "idle" | "listening" | "thinking" | "speaking"

  transcript, // TranscriptMessage[] — conversation history

  interimTranscript, // string | null — real-time partial transcript

  metrics, // VoicePipelineMetrics | null

  audioLevel, // number (0–1) — current mic RMS level

  isMuted, // boolean

  connected, // boolean — WebSocket connected

  error, // string | null

  outputDeviceError, // string | null — non-fatal speaker routing issue

  startCall, // () => Promise<void>

  endCall, // () => void

  toggleMute, // () => void

  sendText, // (text: string) => void — bypass STT

  sendJSON, // (data: Record<string, unknown>) => void

  lastCustomMessage, // unknown — last non-voice message from server

} = useVoiceAgent({

  agent: "MyAgent",

  name: "default",

  host: window.location.host,

  outputDeviceId: selectedSpeakerId, // Optional audiooutput device ID

  enabled: true,

});


```

Use `enabled: false` when the app must wait for async connection prerequisites, such as a user-scoped capability token. While disabled, the hook does not create or connect a `VoiceClient`, returns the idle disconnected state, and action callbacks such as `startCall()`, `sendText()`, and `sendJSON()` are safe no-ops.

When `enabled` changes to `true`, the hook connects with the current options. The first enable is treated as an initial connection, so `onReconnect` only fires for later connection identity changes while the hook remains enabled.

#### Output device selection

Pass `outputDeviceId` to route assistant playback to a selected speaker when the browser supports `HTMLMediaElement.setSinkId()`:

* [  JavaScript ](#tab-panel-5297)
* [  TypeScript ](#tab-panel-5298)

JavaScript

```

const [outputDeviceId, setOutputDeviceId] = useState("default");


const voice = useVoiceAgent({

  agent: "MyAgent",

  outputDeviceId,

});


```

TypeScript

```

const [outputDeviceId, setOutputDeviceId] = useState("default");


const voice = useVoiceAgent({

  agent: "MyAgent",

  outputDeviceId,

});


```

Use a `MediaDeviceInfo.deviceId` from `navigator.mediaDevices.enumerateDevices()` where `kind === "audiooutput"`. `"default"` and `undefined` use the system default output. Browsers without sink selection support continue playing through the default output and set `outputDeviceError` when a non-default output is requested. Device labels may be blank until the user grants microphone permission, so refresh device lists after `startCall()` if you show a speaker picker.

#### Tuning options

| Option             | Type    | Default | Description                                      |
| ------------------ | ------- | ------- | ------------------------------------------------ |
| enabled            | boolean | true    | Delay client creation and connection when false  |
| silenceThreshold   | number  | 0.04    | RMS below this is silence                        |
| silenceDurationMs  | number  | 500     | Silence duration before end\_of\_speech (ms)     |
| interruptThreshold | number  | 0.05    | RMS to detect speech during playback             |
| interruptChunks    | number  | 2       | Consecutive high-RMS chunks to trigger interrupt |

Changing tuning options triggers a client reconnect (the connection key includes them).

### `useVoiceInput`

Lightweight hook for dictation and voice-to-text. Accumulates user transcripts into a single string.

```

import { useVoiceInput } from "@cloudflare/voice/react";


function Dictation() {

  const {

    transcript, // string — accumulated text from all utterances

    interimTranscript, // string | null — current partial transcript

    isListening, // boolean

    audioLevel, // number (0–1)

    isMuted, // boolean

    error, // string | null

    start, // () => Promise<void>

    stop, // () => void

    toggleMute, // () => void

    clear, // () => void — clear accumulated transcript

  } = useVoiceInput({ agent: "DictationAgent" });


  return (

    <div>

      <textarea

        value={transcript + (interimTranscript ? " " + interimTranscript : "")}

        readOnly

      />

      <button onClick={isListening ? stop : start}>

        {isListening ? "Stop" : "Dictate"}

      </button>

    </div>

  );

}


```

## Client API: `VoiceClient`

Framework-agnostic client for environments without React.

* [  JavaScript ](#tab-panel-5313)
* [  TypeScript ](#tab-panel-5314)

JavaScript

```

import { VoiceClient } from "@cloudflare/voice/client";


const client = new VoiceClient({ agent: "MyAgent" });


client.addEventListener("statuschange", (status) => {

  console.log("Status:", status);

});


client.addEventListener("transcriptchange", (messages) => {

  console.log("Transcript:", messages);

});


client.addEventListener("error", (err) => {

  console.error("Error:", err);

});


client.connect();

await client.startCall();


// Switch assistant playback without reconnecting the call.

await client.setOutputDevice(selectedSpeakerId);


// Later:

client.endCall();

client.disconnect();


```

TypeScript

```

import { VoiceClient } from "@cloudflare/voice/client";


const client = new VoiceClient({ agent: "MyAgent" });


client.addEventListener("statuschange", (status) => {

  console.log("Status:", status);

});


client.addEventListener("transcriptchange", (messages) => {

  console.log("Transcript:", messages);

});


client.addEventListener("error", (err) => {

  console.error("Error:", err);

});


client.connect();

await client.startCall();


// Switch assistant playback without reconnecting the call.

await client.setOutputDevice(selectedSpeakerId);


// Later:

client.endCall();

client.disconnect();


```

### Events

| Event             | Data type             | Description                           |
| ----------------- | --------------------- | ------------------------------------- |
| statuschange      | VoiceStatus           | Pipeline state changed                |
| transcriptchange  | TranscriptMessage\[\] | Transcript updated                    |
| interimtranscript | string \| null        | Interim transcript from streaming STT |
| metricschange     | VoicePipelineMetrics  | Pipeline timing metrics               |
| audiolevelchange  | number                | Mic audio level (0–1)                 |
| connectionchange  | boolean               | WebSocket connected/disconnected      |
| mutechange        | boolean               | Mute state changed                    |
| error             | string \| null        | Error occurred                        |
| outputdeviceerror | string \| null        | Non-fatal speaker routing issue       |
| custommessage     | unknown               | Non-voice message from server         |

### Advanced options

| Option          | Type             | Description                                           |
| --------------- | ---------------- | ----------------------------------------------------- |
| transport       | VoiceTransport   | Custom transport (default: WebSocket via PartySocket) |
| audioInput      | VoiceAudioInput  | Custom mic capture (default: built-in AudioWorklet)   |
| preferredFormat | VoiceAudioFormat | Hint for server audio format (advisory only)          |
| outputDeviceId  | string           | Preferred audiooutput device for assistant playback   |

## Providers

### Built-in (Workers AI)

No API keys required — use your Workers AI binding:

| Class             | Type           | Default model       | Recommended for |
| ----------------- | -------------- | ------------------- | --------------- |
| WorkersAIFluxSTT  | Continuous STT | @cf/deepgram/flux   | withVoice       |
| WorkersAINova3STT | Continuous STT | @cf/deepgram/nova-3 | withVoiceInput  |
| WorkersAITTS      | TTS            | @cf/deepgram/aura-1 | Both            |

* [  JavaScript ](#tab-panel-5315)
* [  TypeScript ](#tab-panel-5316)

JavaScript

```

import { Agent } from "agents";

import {

  withVoice,

  WorkersAIFluxSTT,

  WorkersAINova3STT,

  WorkersAITTS,

} from "@cloudflare/voice";


const VoiceAgent = withVoice(Agent);


// Default usage

export class MyAgent extends VoiceAgent {

  transcriber = new WorkersAIFluxSTT(this.env.AI);

  tts = new WorkersAITTS(this.env.AI);

}


// Custom options

export class CustomAgent extends VoiceAgent {

  transcriber = new WorkersAIFluxSTT(this.env.AI, {

    eotThreshold: 0.8,

    keyterms: ["Cloudflare", "Workers"],

  });

  tts = new WorkersAITTS(this.env.AI, {

    model: "@cf/deepgram/aura-1",

    speaker: "asteria",

  });

}


```

TypeScript

```

import { Agent } from "agents";

import {

  withVoice,

  WorkersAIFluxSTT,

  WorkersAINova3STT,

  WorkersAITTS,

} from "@cloudflare/voice";


const VoiceAgent = withVoice(Agent);


// Default usage

export class MyAgent extends VoiceAgent<Env> {

  transcriber = new WorkersAIFluxSTT(this.env.AI);

  tts = new WorkersAITTS(this.env.AI);

}


// Custom options

export class CustomAgent extends VoiceAgent<Env> {

  transcriber = new WorkersAIFluxSTT(this.env.AI, {

    eotThreshold: 0.8,

    keyterms: ["Cloudflare", "Workers"],

  });

  tts = new WorkersAITTS(this.env.AI, {

    model: "@cf/deepgram/aura-1",

    speaker: "asteria",

  });

}


```

### Third-party providers

| Package                      | Class         | Description             |
| ---------------------------- | ------------- | ----------------------- |
| @cloudflare/voice-deepgram   | DeepgramSTT   | Continuous STT          |
| @cloudflare/voice-elevenlabs | ElevenLabsTTS | High-quality TTS        |
| @cloudflare/voice-twilio     | TwilioAdapter | Telephony (phone calls) |

**ElevenLabs TTS:**

* [  JavaScript ](#tab-panel-5303)
* [  TypeScript ](#tab-panel-5304)

JavaScript

```

import { ElevenLabsTTS } from "@cloudflare/voice-elevenlabs";


export class MyAgent extends VoiceAgent {

  transcriber = new WorkersAIFluxSTT(this.env.AI);

  tts = new ElevenLabsTTS({

    apiKey: this.env.ELEVENLABS_API_KEY,

    voiceId: "21m00Tcm4TlvDq8ikWAM",

  });

}


```

TypeScript

```

import { ElevenLabsTTS } from "@cloudflare/voice-elevenlabs";


export class MyAgent extends VoiceAgent<Env> {

  transcriber = new WorkersAIFluxSTT(this.env.AI);

  tts = new ElevenLabsTTS({

    apiKey: this.env.ELEVENLABS_API_KEY,

    voiceId: "21m00Tcm4TlvDq8ikWAM",

  });

}


```

**Deepgram STT:**

* [  JavaScript ](#tab-panel-5305)
* [  TypeScript ](#tab-panel-5306)

JavaScript

```

import { DeepgramSTT } from "@cloudflare/voice-deepgram";


export class MyAgent extends VoiceAgent {

  transcriber = new DeepgramSTT({

    apiKey: this.env.DEEPGRAM_API_KEY,

  });

  tts = new WorkersAITTS(this.env.AI);

}


```

TypeScript

```

import { DeepgramSTT } from "@cloudflare/voice-deepgram";


export class MyAgent extends VoiceAgent<Env> {

  transcriber = new DeepgramSTT({

    apiKey: this.env.DEEPGRAM_API_KEY,

  });

  tts = new WorkersAITTS(this.env.AI);

}


```

## Telephony (Twilio)

Connect phone calls to your voice agent using the Twilio adapter:

Terminal window

```

npm install @cloudflare/voice-twilio


```

The adapter bridges Twilio Media Streams to your VoiceAgent:

```

Phone → Twilio → WebSocket → TwilioAdapter → WebSocket → VoiceAgent


```

`WorkersAITTS` returns MP3, which cannot be decoded to PCM in the Workers runtime. When using the Twilio adapter, use a TTS provider that outputs raw PCM (for example, ElevenLabs with `outputFormat: "pcm_16000"`).

## Text messages

`withVoice` agents can also receive text messages, bypassing STT entirely. This is useful for chat-style input alongside voice.

```

const { sendText } = useVoiceAgent({ agent: "MyAgent" });


// Send text — goes straight to onTurn() without STT

sendText("What is the weather like today?");


```

Text messages work both during and outside of active calls. During a call, the response is spoken aloud via TTS. Outside a call, the response is sent as text-only transcript messages.

## Custom messages

Send and receive application-level JSON messages alongside voice protocol messages. Non-voice messages pass through to your `onMessage` handler on the server and emit `custommessage` events on the client.

**Server:**

* [  JavaScript ](#tab-panel-5311)
* [  TypeScript ](#tab-panel-5312)

JavaScript

```

export class MyAgent extends VoiceAgent {

  onMessage(connection, message) {

    const data = JSON.parse(message);

    if (data.type === "kick_speaker") {

      this.forceEndCall(connection);

    }

  }

}


```

TypeScript

```

export class MyAgent extends VoiceAgent<Env> {

  onMessage(connection: Connection, message: WSMessage) {

    const data = JSON.parse(message as string);

    if (data.type === "kick_speaker") {

      this.forceEndCall(connection);

    }

  }

}


```

**Client:**

```

const { sendJSON, lastCustomMessage } = useVoiceAgent({ agent: "MyAgent" });


sendJSON({ type: "kick_speaker" });


useEffect(() => {

  if (lastCustomMessage) {

    console.log("Custom message:", lastCustomMessage);

  }

}, [lastCustomMessage]);


```

## Single-speaker enforcement

Use `beforeCallStart` to restrict who can start a call. This example enforces single-speaker — only one connection can be the active speaker at a time:

* [  JavaScript ](#tab-panel-5317)
* [  TypeScript ](#tab-panel-5318)

JavaScript

```

import {} from "agents";


export class MyAgent extends VoiceAgent {

  #speakerId = null;


  beforeCallStart(connection) {

    if (this.#speakerId !== null) {

      return false;

    }

    this.#speakerId = connection.id;

    return true;

  }


  onCallEnd(connection) {

    if (this.#speakerId === connection.id) {

      this.#speakerId = null;

    }

  }

}


```

TypeScript

```

import { type Connection } from "agents";


export class MyAgent extends VoiceAgent<Env> {

  #speakerId: string | null = null;


  beforeCallStart(connection: Connection) {

    if (this.#speakerId !== null) {

      return false;

    }

    this.#speakerId = connection.id;

    return true;

  }


  onCallEnd(connection: Connection) {

    if (this.#speakerId === connection.id) {

      this.#speakerId = null;

    }

  }

}


```

## Pipeline metrics

`withVoice` agents emit timing metrics after each turn:

```

const { metrics } = useVoiceAgent({ agent: "MyAgent" });


// metrics: {

//   llm_ms: 850,

//   tts_ms: 200,

//   first_audio_ms: 950,

//   total_ms: 1200,

// }


```

## Conversation history

`withVoice` automatically persists conversation messages to SQLite. Access history in your `onTurn` via `context.messages`, or directly:

* [  JavaScript ](#tab-panel-5307)
* [  TypeScript ](#tab-panel-5308)

JavaScript

```

const history = this.getConversationHistory(20);


this.saveMessage("assistant", "Welcome! How can I help?");


```

TypeScript

```

const history = this.getConversationHistory(20);


this.saveMessage("assistant", "Welcome! How can I help?");


```

History survives Durable Object restarts and client reconnections. Voice agents use `keepAlive` to prevent eviction during active calls.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/communication-channels/voice/#page","headline":"Voice · Cloudflare Agents docs","description":"Build real-time voice agents with speech-to-text, text-to-speech, and conversation persistence over WebSocket.","url":"https://developers.cloudflare.com/agents/communication-channels/voice/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/communication-channels/","name":"Communication channels"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/communication-channels/voice/","name":"Voice"}}]}
```
