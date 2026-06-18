---
title: Voice agent
description: Build a real-time voice agent with speech-to-text, LLM processing, and text-to-speech on Cloudflare Workers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/agents/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Voice agent

Build a voice agent that listens to users, thinks with an LLM, and speaks back — all in real-time over WebSocket. Beta

By the end of this guide you will have:

* A server-side voice agent with speech-to-text and text-to-speech
* An LLM-powered `onTurn` handler that streams responses
* Tools that the agent can call during conversation
* A React client with a push-to-talk style UI

## Prerequisites

* A Cloudflare account with [Workers AI](https://developers.cloudflare.com/workers-ai/) access
* Node.js 18+

## 1\. Create the project

Scaffold a new Workers project with Vite and React, then add the voice dependencies:

Terminal window

```

npm create cloudflare@latest voice-agent -- --template cloudflare/agents-starter

cd voice-agent

npm install @cloudflare/voice


```

The starter gives you a working Vite + React + Cloudflare Workers setup. You will replace the server and client code in the following steps.

## 2\. Configure wrangler

Update `wrangler.jsonc` to include a Workers AI binding and a Durable Object for your voice agent:

* [  wrangler.jsonc ](#tab-panel-5489)
* [  wrangler.toml ](#tab-panel-5490)

JSONC

```

{

  "name": "voice-agent",

  // Set this to today's date

  "compatibility_date": "2026-06-18",

  "compatibility_flags": ["nodejs_compat"],

  "main": "src/server.ts",

  "ai": {

    "binding": "AI"

  },

  "durable_objects": {

    "bindings": [

      {

        "name": "MyVoiceAgent",

        "class_name": "MyVoiceAgent"

      }

    ]

  },

  "migrations": [

    {

      "tag": "v1",

      "new_sqlite_classes": ["MyVoiceAgent"]

    }

  ]

}


```

TOML

```

name = "voice-agent"

# Set this to today's date

compatibility_date = "2026-06-18"

compatibility_flags = [ "nodejs_compat" ]

main = "src/server.ts"


[ai]

binding = "AI"


[[durable_objects.bindings]]

name = "MyVoiceAgent"

class_name = "MyVoiceAgent"


[[migrations]]

tag = "v1"

new_sqlite_classes = [ "MyVoiceAgent" ]


```

## 3\. Build the server

Replace `src/server.ts` with the following. The `withVoice` mixin adds the full voice pipeline — STT, sentence chunking, TTS, and conversation persistence — to a standard `Agent` class.

* [  JavaScript ](#tab-panel-5495)
* [  TypeScript ](#tab-panel-5496)

JavaScript

```

import { Agent, routeAgentRequest } from "agents";

import { withVoice, WorkersAIFluxSTT, WorkersAITTS } from "@cloudflare/voice";

import { streamText, tool, stepCountIs } from "ai";

import { createWorkersAI } from "workers-ai-provider";

import { z } from "zod";


const VoiceAgent = withVoice(Agent);


export class MyVoiceAgent extends VoiceAgent {

  transcriber = new WorkersAIFluxSTT(this.env.AI);

  tts = new WorkersAITTS(this.env.AI);


  async onTurn(transcript, context) {

    const workersAi = createWorkersAI({ binding: this.env.AI });


    const result = streamText({

      model: workersAi("@cf/moonshotai/kimi-k2.6"),

      system:

        "You are a helpful voice assistant. Keep responses concise — you are being spoken aloud.",

      messages: [

        ...context.messages.map((m) => ({

          role: m.role,

          content: m.content,

        })),

        { role: "user", content: transcript },

      ],

      tools: {

        get_current_time: tool({

          description: "Get the current date and time.",

          inputSchema: z.object({}),

          execute: async () => ({

            time: new Date().toLocaleTimeString("en-US", {

              hour: "2-digit",

              minute: "2-digit",

            }),

          }),

        }),

      },

      stopWhen: stepCountIs(3),

      abortSignal: context.signal,

    });


    return result.textStream;

  }


  async onCallStart(connection) {

    await this.speak(connection, "Hi there! How can I help you today?");

  }

}


export default {

  async fetch(request, env) {

    return (

      (await routeAgentRequest(request, env)) ??

      new Response("Not found", { status: 404 })

    );

  },

};


```

TypeScript

```

import { Agent, routeAgentRequest, type Connection } from "agents";

import {

  withVoice,

  WorkersAIFluxSTT,

  WorkersAITTS,

  type VoiceTurnContext,

} from "@cloudflare/voice";

import { streamText, tool, stepCountIs } from "ai";

import { createWorkersAI } from "workers-ai-provider";

import { z } from "zod";


const VoiceAgent = withVoice(Agent);


export class MyVoiceAgent extends VoiceAgent<Env> {

  transcriber = new WorkersAIFluxSTT(this.env.AI);

  tts = new WorkersAITTS(this.env.AI);


  async onTurn(transcript: string, context: VoiceTurnContext) {

    const workersAi = createWorkersAI({ binding: this.env.AI });


    const result = streamText({

      model: workersAi("@cf/moonshotai/kimi-k2.6"),

      system:

        "You are a helpful voice assistant. Keep responses concise — you are being spoken aloud.",

      messages: [

        ...context.messages.map((m) => ({

          role: m.role as "user" | "assistant",

          content: m.content,

        })),

        { role: "user" as const, content: transcript },

      ],

      tools: {

        get_current_time: tool({

          description: "Get the current date and time.",

          inputSchema: z.object({}),

          execute: async () => ({

            time: new Date().toLocaleTimeString("en-US", {

              hour: "2-digit",

              minute: "2-digit",

            }),

          }),

        }),

      },

      stopWhen: stepCountIs(3),

      abortSignal: context.signal,

    });


    return result.textStream;

  }


  async onCallStart(connection: Connection) {

    await this.speak(connection, "Hi there! How can I help you today?");

  }

}


export default {

  async fetch(request: Request, env: Env) {

    return (

      (await routeAgentRequest(request, env)) ??

      new Response("Not found", { status: 404 })

    );

  },

} satisfies ExportedHandler<Env>;


```

Key points:

* `WorkersAIFluxSTT` handles continuous speech-to-text — the model detects when the user finishes speaking.
* `WorkersAITTS` converts the LLM response to audio, sentence by sentence.
* `onTurn` receives the transcript and returns a stream. The mixin handles chunking the stream into sentences and synthesizing each one.
* `onCallStart` sends a greeting when the user connects.
* `context.messages` contains the full conversation history from SQLite.
* `context.signal` is aborted if the user interrupts or disconnects.

## 4\. Build the client

Replace `src/client.tsx` with a React component using the `useVoiceAgent` hook. The hook manages the WebSocket connection, mic capture, audio playback, and interrupt detection.

```

import { useVoiceAgent } from "@cloudflare/voice/react";


function App() {

  const {

    status,

    transcript,

    interimTranscript,

    metrics,

    audioLevel,

    isMuted,

    startCall,

    endCall,

    toggleMute,

  } = useVoiceAgent({ agent: "MyVoiceAgent" });


  return (

    <div>

      <h1>Voice Agent</h1>

      <p>Status: {status}</p>


      <div>

        <button onClick={status === "idle" ? startCall : endCall}>

          {status === "idle" ? "Start Call" : "End Call"}

        </button>

        {status !== "idle" && (

          <button onClick={toggleMute}>{isMuted ? "Unmute" : "Mute"}</button>

        )}

      </div>


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


      {metrics && (

        <p>

          LLM: {metrics.llm_ms}ms | TTS: {metrics.tts_ms}ms | First audio:{" "}

          {metrics.first_audio_ms}ms

        </p>

      )}

    </div>

  );

}


```

The `status` field cycles through `"idle"` → `"listening"` → `"thinking"` → `"speaking"` → `"listening"`, giving you everything you need to build a responsive UI.

## 5\. Run it

Terminal window

```

npm run dev


```

Open the app in your browser, select **Start Call**, and speak. You will see the transcript appear in real time, and the agent's response will play through your speakers.

## Adding pipeline hooks

You can intercept and transform data at each stage of the pipeline. For example, filter out short transcripts (noise) and adjust pronunciation before TTS:

* [  JavaScript ](#tab-panel-5491)
* [  TypeScript ](#tab-panel-5492)

JavaScript

```

export class MyVoiceAgent extends VoiceAgent {

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

    return "You said: " + transcript;

  }

}


```

TypeScript

```

export class MyVoiceAgent extends VoiceAgent<Env> {

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

    return "You said: " + transcript;

  }

}


```

Returning `null` from `afterTranscribe` drops the utterance entirely — useful for filtering noise or very short transcripts.

## Using third-party providers

Swap in third-party STT or TTS providers without changing your agent logic:

* [  JavaScript ](#tab-panel-5493)
* [  TypeScript ](#tab-panel-5494)

JavaScript

```

import { ElevenLabsTTS } from "@cloudflare/voice-elevenlabs";

import { DeepgramSTT } from "@cloudflare/voice-deepgram";


export class MyVoiceAgent extends VoiceAgent {

  transcriber = new DeepgramSTT({

    apiKey: this.env.DEEPGRAM_API_KEY,

  });


  tts = new ElevenLabsTTS({

    apiKey: this.env.ELEVENLABS_API_KEY,

    voiceId: "21m00Tcm4TlvDq8ikWAM",

  });


  async onTurn(transcript, context) {

    return "You said: " + transcript;

  }

}


```

TypeScript

```

import { ElevenLabsTTS } from "@cloudflare/voice-elevenlabs";

import { DeepgramSTT } from "@cloudflare/voice-deepgram";


export class MyVoiceAgent extends VoiceAgent<Env> {

  transcriber = new DeepgramSTT({

    apiKey: this.env.DEEPGRAM_API_KEY,

  });


  tts = new ElevenLabsTTS({

    apiKey: this.env.ELEVENLABS_API_KEY,

    voiceId: "21m00Tcm4TlvDq8ikWAM",

  });


  async onTurn(transcript: string, context: VoiceTurnContext) {

    return "You said: " + transcript;

  }

}


```

## Next steps

[ Voice agents API reference ](https://developers.cloudflare.com/agents/communication-channels/voice/) Full reference for withVoice, withVoiceInput, React hooks, VoiceClient, and all providers. 

[ Chat agents ](https://developers.cloudflare.com/agents/communication-channels/chat/chat-agents/) Build text-based AI chat with AIChatAgent and useAgentChat. 

[ Using AI models ](https://developers.cloudflare.com/agents/runtime/operations/using-ai-models/) Use Workers AI, OpenAI, Anthropic, Gemini, or any provider with your agents. 

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/agents/examples/voice-agent/#page","headline":"Voice agent · Cloudflare Agents docs","description":"Build a real-time voice agent with speech-to-text, LLM processing, and text-to-speech on Cloudflare Workers.","url":"https://developers.cloudflare.com/agents/examples/voice-agent/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-06-03","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/agents/","name":"Agents"}},{"@type":"ListItem","position":3,"item":{"@id":"/agents/examples/","name":"Examples"}},{"@type":"ListItem","position":4,"item":{"@id":"/agents/examples/voice-agent/","name":"Voice agent"}}]}
```
