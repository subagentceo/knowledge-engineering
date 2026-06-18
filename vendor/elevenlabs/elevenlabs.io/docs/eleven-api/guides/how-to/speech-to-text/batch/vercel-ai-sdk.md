> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Vercel AI SDK

**How-to guide** · Assumes you have completed the [Speech to Text
quickstart](/docs/eleven-api/guides/cookbooks/speech-to-text) and have a Vercel project set up.

# ElevenLabs Provider

The [ElevenLabs provider](https://ai-sdk.dev/providers/ai-sdk-providers/elevenlabs) provides support for the [ElevenLabs transcription API](https://elevenlabs.io/speech-to-text).

## Setup

The ElevenLabs provider is available in the `@ai-sdk/elevenlabs` module. You can install it with npm:

```npm
npm install @ai-sdk/elevenlabs
```

## Provider Instance

You can import the default provider instance `elevenlabs` from `@ai-sdk/elevenlabs`:

```ts
import { elevenlabs } from "@ai-sdk/elevenlabs";
```

If you need a customized setup, you can import `createElevenLabs` from `@ai-sdk/elevenlabs` and create a provider instance with your settings:

```ts
import { createElevenLabs } from "@ai-sdk/elevenlabs";

const elevenlabs = createElevenLabs({
  // custom settings, e.g.
  fetch: customFetch,
});
```

You can use the following optional settings to customize the ElevenLabs provider instance:

* **apiKey** *string*

  API key that is being sent using the `Authorization` header.
  It defaults to the `ELEVENLABS_API_KEY` environment variable.

* **headers** *Record\<string,string>*

  Custom headers to include in the requests.

* **fetch** *(input: RequestInfo, init?: RequestInit) => Promise\<Response>*

  Custom [fetch](https://developer.mozilla.org/en-US/docs/Web/API/fetch) implementation.
  Defaults to the global `fetch` function.
  You can use it as a middleware to intercept requests,
  or to provide a custom fetch implementation for e.g. testing.

## Transcription Models

You can create models that call the [ElevenLabs transcription API](https://elevenlabs.io/speech-to-text)
using the `.transcription()` factory method.

The first argument is the model id e.g. `scribe_v2`.

```ts
const model = elevenlabs.transcription("scribe_v2");
```

You can also pass additional provider-specific options using the `providerOptions` argument. For example, supplying the input language in ISO-639-1 (e.g. `en`) format can sometimes improve transcription performance if known beforehand.

```ts {7}
import { elevenlabs } from "@ai-sdk/elevenlabs";
import { experimental_transcribe as transcribe } from "ai";

const result = await transcribe({
  model: elevenlabs.transcription("scribe_v2"),
  audio: new Uint8Array([1, 2, 3, 4]),
  providerOptions: { elevenlabs: { languageCode: "en" } },
});
```

The following provider options are available:

* **languageCode** *string*

  An ISO-639-1 or ISO-639-3 language code corresponding to the language of the audio file.
  Can sometimes improve transcription performance if known beforehand.
  Defaults to `null`, in which case the language is predicted automatically.

* **tagAudioEvents** *boolean*

  Whether to tag audio events like (laughter), (footsteps), etc. in the transcription.
  Defaults to `true`.

* **numSpeakers** *integer*

  The maximum amount of speakers talking in the uploaded file.
  Can help with predicting who speaks when.
  The maximum amount of speakers that can be predicted is 32.
  Defaults to `null`, in which case the amount of speakers is set to the maximum value the model supports.

* **timestampsGranularity** *enum*

  The granularity of the timestamps in the transcription.
  Defaults to `'word'`.
  Allowed values: `'none'`, `'word'`, `'character'`.

* **diarize** *boolean*

  Whether to annotate which speaker is currently talking in the uploaded file.
  Defaults to `true`.

* **fileFormat** *enum*

  The format of input audio.
  Defaults to `'other'`.
  Allowed values: `'pcm_s16le_16'`, `'other'`.
  For `'pcm_s16le_16'`, the input audio must be 16-bit PCM at a 16kHz sample rate, single channel (mono), and little-endian byte order.
  Latency will be lower than with passing an encoded waveform.

## Next steps

Transcribe audio in real time using the WebSocket-based streaming API.

Full Speech to Text API reference and parameters.