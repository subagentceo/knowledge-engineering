---
title: Whisper-large-v3-turbo with Cloudflare Workers AI
description: Learn how to transcribe large audio files using Workers AI.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers-ai/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Whisper-large-v3-turbo with Cloudflare Workers AI

**Last reviewed:**  about 1 year ago 

In this tutorial you will learn how to:

* **Transcribe large audio files:** Use the [Whisper-large-v3-turbo](https://developers.cloudflare.com/workers-ai/models/whisper-large-v3-turbo/) model from Cloudflare Workers AI to perform automatic speech recognition (ASR) or translation.
* **Handle large files:** Split large audio files into smaller chunks for processing, which helps overcome memory and execution time limitations.
* **Deploy using Cloudflare Workers:** Create a scalable, low‑latency transcription pipeline in a serverless environment.

## 1: Create a new Cloudflare Worker project

1. Sign up for a [Cloudflare account ↗](https://dash.cloudflare.com/sign-up/workers-and-pages).
2. Install [Node.js ↗](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

Node.js version manager

Use a Node version manager like [Volta ↗](https://volta.sh/) or [nvm ↗](https://github.com/nvm-sh/nvm) to avoid permission issues and change Node.js versions. [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/), discussed later in this guide, requires a Node version of `16.17.0` or later.

You will create a new Worker project using the `create-cloudflare` CLI (C3). [C3 ↗](https://github.com/cloudflare/workers-sdk/tree/main/packages/create-cloudflare) is a command-line tool designed to help you set up and deploy new applications to Cloudflare.

Create a new project named `whisper-tutorial` by running:

 npm  yarn  pnpm 

```
npm create cloudflare@latest -- whisper-tutorial
```

```
yarn create cloudflare whisper-tutorial
```

```
pnpm create cloudflare@latest whisper-tutorial
```

Running `npm create cloudflare@latest` will prompt you to install the [create-cloudflare package ↗](https://www.npmjs.com/package/create-cloudflare), and lead you through setup. C3 will also install [Wrangler](https://developers.cloudflare.com/workers/wrangler/), the Cloudflare Developer Platform CLI.

For setup, select the following options:

* For _What would you like to start with?_, choose `Hello World example`.
* For _Which template would you like to use?_, choose `Worker only`.
* For _Which language do you want to use?_, choose `TypeScript`.
* For _Do you want to use git for version control?_, choose `Yes`.
* For _Do you want to deploy your application?_, choose `No` (we will be making some changes before deploying).

This will create a new `whisper-tutorial` directory. Your new `whisper-tutorial` directory will include:

* A `"Hello World"` [Worker](https://developers.cloudflare.com/workers/get-started/guide/#3-write-code) at `src/index.ts`.
* A [wrangler.jsonc](https://developers.cloudflare.com/workers/wrangler/configuration/) configuration file.

Go to your application directory:

Terminal window

```

cd whisper-tutorial


```

## 2\. Connect your Worker to Workers AI

You must create an AI binding for your Worker to connect to Workers AI. [Bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/) allow your Workers to interact with resources, like Workers AI, on the Cloudflare Developer Platform.

To bind Workers AI to your Worker, add the following to the end of your Wrangler configuration file:

* [  wrangler.jsonc ](#tab-panel-11325)
* [  wrangler.toml ](#tab-panel-11326)

JSONC

```

{

  "ai": {

    "binding": "AI"

  }

}


```

TOML

```

[ai]

binding = "AI"


```

Your binding is [available in your Worker code](https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/#bindings-in-es-modules-format) on [env.AI](https://developers.cloudflare.com/workers/runtime-apis/handlers/fetch/).

## 3\. Configure Wrangler

In your wrangler file, add or update the following settings to enable Node.js APIs and polyfills (with a compatibility date of 2024‑09‑23 or later):

* [  wrangler.jsonc ](#tab-panel-11327)
* [  wrangler.toml ](#tab-panel-11328)

JSONC

```

{

  "compatibility_flags": [

    "nodejs_compat"

  ],

  // Set this to today's date

  "compatibility_date": "2026-06-18"

}


```

TOML

```

compatibility_flags = [ "nodejs_compat" ]

# Set this to today's date

compatibility_date = "2026-06-18"


```

## 4\. Handle large audio files with chunking

Replace the contents of your `src/index.ts` file with the following integrated code. This sample demonstrates how to:

(1) Extract an audio file URL from the query parameters.

(2) Fetch the audio file while explicitly following redirects.

(3) Split the audio file into smaller chunks (such as, 1 MB chunks).

(4) Transcribe each chunk using the Whisper-large-v3-turbo model via the Cloudflare AI binding.

(5) Return the aggregated transcription as plain text.

TypeScript

```

import { Buffer } from "node:buffer";

import type { Ai } from "workers-ai";


export interface Env {

  AI: Ai;

  // If needed, add your KV namespace for storing transcripts.

  // MY_KV_NAMESPACE: KVNamespace;

}


/**

 * Fetches the audio file from the provided URL and splits it into chunks.

 * This function explicitly follows redirects.

 *

 * @param audioUrl - The URL of the audio file.

 * @returns An array of ArrayBuffers, each representing a chunk of the audio.

 */

async function getAudioChunks(audioUrl: string): Promise<ArrayBuffer[]> {

  const response = await fetch(audioUrl, { redirect: "follow" });

  if (!response.ok) {

    throw new Error(`Failed to fetch audio: ${response.status}`);

  }

  const arrayBuffer = await response.arrayBuffer();


  // Example: Split the audio into 1MB chunks.

  const chunkSize = 1024 * 1024; // 1MB

  const chunks: ArrayBuffer[] = [];

  for (let i = 0; i < arrayBuffer.byteLength; i += chunkSize) {

    const chunk = arrayBuffer.slice(i, i + chunkSize);

    chunks.push(chunk);

  }

  return chunks;

}


/**

 * Transcribes a single audio chunk using the Whisper‑large‑v3‑turbo model.

 * The function converts the audio chunk to a Base64-encoded string and

 * sends it to the model via the AI binding.

 *

 * @param chunkBuffer - The audio chunk as an ArrayBuffer.

 * @param env - The Cloudflare Worker environment, including the AI binding.

 * @returns The transcription text from the model.

 */

async function transcribeChunk(

  chunkBuffer: ArrayBuffer,

  env: Env,

): Promise<string> {

  const base64 = Buffer.from(chunkBuffer, "binary").toString("base64");

  const res = await env.AI.run("@cf/openai/whisper-large-v3-turbo", {

    audio: base64,

    // Optional parameters (uncomment and set if needed):

    // task: "transcribe",   // or "translate"

    // language: "en",

    // vad_filter: "false",

    // initial_prompt: "Provide context if needed.",

    // prefix: "Transcription:",

  });

  return res.text; // Assumes the transcription result includes a "text" property.

}


/**

 * The main fetch handler. It extracts the 'url' query parameter, fetches the audio,

 * processes it in chunks, and returns the full transcription.

 */

export default {

  async fetch(

    request: Request,

    env: Env,

    ctx: ExecutionContext,

  ): Promise<Response> {

    // Extract the audio URL from the query parameters.

    const { searchParams } = new URL(request.url);

    const audioUrl = searchParams.get("url");


    if (!audioUrl) {

      return new Response("Missing 'url' query parameter", { status: 400 });

    }


    // Get the audio chunks.

    const audioChunks: ArrayBuffer[] = await getAudioChunks(audioUrl);

    let fullTranscript = "";


    // Process each chunk and build the full transcript.

    for (const chunk of audioChunks) {

      try {

        const transcript = await transcribeChunk(chunk, env);

        fullTranscript += transcript + "\n";

      } catch (error) {

        fullTranscript += "[Error transcribing chunk]\n";

      }

    }


    return new Response(fullTranscript, {

      headers: { "Content-Type": "text/plain" },

    });

  },

} satisfies ExportedHandler<Env>;


```

## 5\. Deploy your Worker

1. **Run the Worker locally:**  
Use wrangler's development mode to test your Worker locally:

Terminal window

```

npx wrangler dev


```

Open your browser and go to [http://localhost:8787 ↗](http://localhost:8787), or use curl:

Terminal window

```

curl "http://localhost:8787?url=https://raw.githubusercontent.com/your-username/your-repo/main/your-audio-file.mp3"


```

Replace the URL query parameter with the direct link to your audio file. (For GitHub-hosted files, ensure you use the raw file URL.)

1. **Deploy the Worker:**  
Once testing is complete, deploy your Worker with:

Terminal window

```

npx wrangler deploy


```

1. **Test the deployed Worker:**  
After deployment, test your Worker by passing the audio URL as a query parameter:

Terminal window

```

curl "https://<your-worker-subdomain>.workers.dev?url=https://raw.githubusercontent.com/your-username/your-repo/main/your-audio-file.mp3"


```

Make sure to replace `<your-worker-subdomain>`, `your-username`, `your-repo`, and `your-audio-file.mp3` with your actual details.

If successful, the Worker will return a transcript of the audio file:

Terminal window

```

This is the transcript of the audio...


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers-ai/guides/tutorials/build-a-workers-ai-whisper-with-chunking/#page","headline":"Whisper-large-v3-turbo with Cloudflare Workers AI · Cloudflare Workers AI docs","description":"Learn how to transcribe large audio files using Workers AI.","url":"https://developers.cloudflare.com/workers-ai/guides/tutorials/build-a-workers-ai-whisper-with-chunking/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["AI"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers-ai/","name":"Workers AI"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers-ai/guides/","name":"Guides"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers-ai/guides/tutorials/","name":"Tutorials"}},{"@type":"ListItem","position":5,"item":{"@id":"/workers-ai/guides/tutorials/build-a-workers-ai-whisper-with-chunking/","name":"Whisper-large-v3-turbo with Cloudflare Workers AI"}}]}
```
