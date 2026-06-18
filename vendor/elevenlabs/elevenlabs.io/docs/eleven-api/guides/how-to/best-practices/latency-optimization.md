> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Latency optimization

This guide covers the core principles for improving text-to-speech latency. For a conceptual explanation of what latency is and what contributes to it, see [Understanding latency](/docs/eleven-api/concepts/latency).

While there are many individual techniques, we'll group them into **four principles**.

<h4>
  Four principles
</h4>

1. [Use Flash models](#use-flash-models)
2. [Leverage streaming](#leverage-streaming)
3. [Consider geographic proximity](#consider-geographic-proximity)
4. [Choose appropriate voices](#choose-appropriate-voices)

Enterprise customers benefit from increased concurrency limits and priority access to our rendering queue. [Contact sales](https://elevenlabs.io/contact-sales) to learn more about our enterprise
plans.

## Use Flash models

[Flash models](/docs/overview/models#flash-v25) deliver \~75ms inference speeds, making them ideal for real-time applications. The trade-off is a slight reduction in audio quality compared to [Multilingual v2](/docs/overview/models#multilingual-v2).

75ms refers to model inference time only. Actual end-to-end latency will vary with factors such as
your location & endpoint type used.

## Leverage streaming

There are three types of text-to-speech endpoints available in our [API Reference](/docs/api-reference/introduction):

* **Regular endpoint**: Returns a complete audio file in a single response.
* **Streaming endpoint**: Returns audio chunks progressively using [Server-sent events](https://html.spec.whatwg.org/multipage/server-sent-events.html#server-sent-events).
* **Websockets endpoint**: Enables bidirectional streaming for real-time audio generation.

### Streaming

Streaming endpoints progressively return audio as it is being generated in real-time, reducing the time-to-first-byte. This endpoint is recommended for cases where the input text is available up-front.

Streaming is supported for the [Text to Speech](/docs/api-reference/text-to-speech/stream) API,
[Voice Changer](/docs/api-reference/speech-to-speech/stream) API & [Audio
Isolation](/docs/api-reference/audio-isolation/stream) API.

### Websockets

The [text-to-speech websocket endpoint](/docs/api-reference#text-to-speech-websocket) supports bidirectional streaming making it perfect for applications with real-time text input (e.g. LLM outputs).

Setting `auto_mode` to true automatically handles generation triggers, removing the need to
manually manage chunk strategies.

If `auto_mode` is disabled, the model will wait for enough text to match the chunk schedule before starting to generate audio.

For instance, if you set a chunk schedule of 125 characters but only 50 arrive, the model stalls until additional characters come in—potentially increasing latency.

For implementation details, see the [text-to-speech websocket guide](/docs/api-reference#text-to-speech-websocket).

## Choose appropriate voices

We have observed that in some cases, voice selection can impact latency. Here's the order from fastest to slowest:

1. Default voices (formerly premade), Synthetic voices, and Instant Voice Clones (IVC)
2. Professional Voice Clones (PVC)

Higher audio quality output formats can increase latency. Be sure to balance your latency requirements with audio fidelity needs.

We are actively working on optimizing PVC latency for Flash v2.5.

## Consider geographic proximity

We serve our models from multiple regions to optimize latency based on your geographic location.

For example, using Flash models with Websockets, you can expect the following TTFB latencies depending on your location:

| Region          | TTFB      |
| --------------- | --------- |
| North America   | 100-150ms |
| Europe          | 100-150ms |
| South East Asia | 100-150ms |
| South Asia      | 150-200ms |
| North East Asia | 150-200ms |

You can check which backend region is serving your request by inspecting the `x-region` header in the API response.
Currently used regions include: USA, Netherlands and Singapore.

Enterprise customers can use our dedicated EU and India data residency environments for guarantees
about the server location as well as low latency. Contact your sales representative to get
onboarded to our data residency infrastructure.

To opt-out of the global routing and always use USA servers, use the `api.us.elevenlabs.io` base URL for your API requests:

```python
import os
from elevenlabs.client import ElevenLabs

elevenlabs = ElevenLabs(
    api_key=os.getenv("ELEVENLABS_API_KEY"),
    base_url="https://api.us.elevenlabs.io"
)

```

```typescript
import { ElevenLabs } from "@elevenlabs/elevenlabs-js";
import "dotenv/config";

const elevenlabs = new ElevenLabs({
  apiKey: process.env.ELEVENLABS_API_KEY,
  baseUrl: "https://api.us.elevenlabs.io",
});
```

```bash cURL
curl -X POST -v "https://api.us.elevenlabs.io/v1/text-to-speech/{voice_id}" \
  -H "Accept: audio/mpeg" \
  -H "Content-Type: application/json" \
  -H "xi-api-key: YOUR_API_KEY" \
  -d '{
    "text": "Hello World!",
    "model_id": "eleven_flash_v2_5"
  }'
```

The global servers were previously opt-in using the `api-global-preview.elevenlabs.io` base URL.
This is no longer necessary as it is now the default behavior. Please update your applications to
simply use `api.elevenlabs.io` instead.