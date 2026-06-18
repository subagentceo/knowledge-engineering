> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Stitching multiple requests

**How-to guide** · Assumes you have completed the [ElevenAPI
quickstart](/docs/eleven-api/quickstart).

When converting a large body of text into audio, you may encounter abrupt changes in prosody from one chunk to another. This can be particularly noticeable when converting text that spans multiple paragraphs or sections. In order to maintain voice prosody over multiple chunks, you can use the Request Stitching feature.

This feature allows you to provide context on what has already been generated and what will be generated in the future, helping to maintain a consistent voice and prosody throughout the entire text.

Request stitching is not available for the `eleven_v3` model.

Here's an example without Request Stitching:

<video controls src="https://eleven-public-cdn.elevenlabs.io/audio/docs/without_request_stitching.mp3" />

And the same example with Request Stitching:

<video controls src="https://eleven-public-cdn.elevenlabs.io/audio/docs/with_request_stitching.mp3" />

## How to use Request Stitching

Request Stitching is easiest when using the ElevenLabs SDKs.

This guide assumes you have [set up your API key and SDK](/docs/eleven-api/quickstart). Complete
the quickstart first if you haven't.

Create a new file named `example.py` or `example.mts`, depending on your language of choice and add the following code:

```python
import os
from io import BytesIO
from elevenlabs.client import ElevenLabs
from elevenlabs.play import play
from dotenv import load_dotenv

load_dotenv()

ELEVENLABS_API_KEY = os.getenv("ELEVENLABS_API_KEY")

elevenlabs = ElevenLabs(
    api_key=ELEVENLABS_API_KEY,
)

paragraphs = [
    "The advent of technology has transformed countless sectors, with education ",
    "standing out as one of the most significantly impacted fields.",
    "In recent years, educational technology, or EdTech, has revolutionized the way ",
    "teachers deliver instruction and students absorb information.",
    "From interactive whiteboards to individual tablets loaded with educational software, ",
    "technology has opened up new avenues for learning that were previously unimaginable.",
    "One of the primary benefits of technology in education is the accessibility it provides.",
]

request_ids = []
audio_buffers = []

for paragraph in paragraphs:
    # Usually we get back a stream from the convert function, but with_raw_response is
    # used to get the headers from the response
    with elevenlabs.text_to_speech.with_raw_response.convert(
        text=paragraph,
        voice_id="T7QGPtToiqH4S8VlIkMJ",
        model_id="eleven_multilingual_v2",
        previous_request_ids=request_ids
    ) as response:
        request_ids.append(response._response.headers.get("request-id"))

        # response._response.headers also contains useful information like 'character-cost',
        # which shows the cost of the generation in characters.

        audio_data = b''.join(chunk for chunk in response.data)
        audio_buffers.append(BytesIO(audio_data))

combined_stream = BytesIO(b''.join(buffer.getvalue() for buffer in audio_buffers))

play(combined_stream)
```

```typescript
import "dotenv/config";
import { ElevenLabsClient, play } from "@elevenlabs/elevenlabs-js";
import { Readable } from "node:stream";

const elevenlabs = new ElevenLabsClient({
    apiKey: process.env.ELEVENLABS_API_KEY,
});

const paragraphs = [
    "The advent of technology has transformed countless sectors, with education ",
    "standing out as one of the most significantly impacted fields.",
    "In recent years, educational technology, or EdTech, has revolutionized the way ",
    "teachers deliver instruction and students absorb information.",
    "From interactive whiteboards to individual tablets loaded with educational software, ",
    "technology has opened up new avenues for learning that were previously unimaginable.",
    "One of the primary benefits of technology in education is the accessibility it provides.",
];

const requestIds: string[] = [];
const audioBuffers: Buffer[] = [];

for (const paragraph of paragraphs) {
    // Usually we get back a stream from the convert function, but withRawResponse() is
    // used to get the headers from the response
    const response = await elevenlabs.textToSpeech
        .convert("T7QGPtToiqH4S8VlIkMJ", {
            text: paragraph,
            modelId: "eleven_multilingual_v2",
            previousRequestIds: requestIds,
        })
        .withRawResponse();

    // response.rawResponse.headers also contains useful information like 'character-cost',
    // which shows the cost of the generation in characters.

    requestIds.push(response.rawResponse.headers.get("request-id") ?? "");

    // Convert stream to buffer
    const chunks: Buffer[] = [];
    for await (const chunk of response.data) {
        chunks.push(Buffer.from(chunk));
    }
    audioBuffers.push(Buffer.concat(chunks));
}

// Create a single readable stream from all buffers
const combinedStream = Readable.from(Buffer.concat(audioBuffers));

play(combinedStream);
```

```python
python example.py
```

```typescript
npx tsx example.mts
```

You should hear the combined stitched audio play.

## FAQ

In order to use the request IDs of a previous request for conditioning it needs to have processed completely. In case of streaming this means the audio has to be read completely from the response body.

The difference depends on the model, voice and voice settings used.

The request IDs should be no older than two hours.

Yes, unless you are an enterprise user with increased privacy requirements.

## Next steps

Stream audio progressively as it is generated for lower latency playback.

Complete request stitching parameter reference.