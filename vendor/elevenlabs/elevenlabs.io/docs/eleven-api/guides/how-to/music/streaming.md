> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Music streaming

**How-to guide** · Assumes you have completed the [Music
quickstart](/docs/eleven-api/guides/cookbooks/music).

This guide will show you how to stream music with Eleven Music.

The Eleven Music API is only available to paid users.

## Using the Eleven Music API

This guide assumes you have [set up your API key and SDK](/docs/eleven-api/quickstart). Complete
the quickstart first if you haven't.

Create a new file named `example.py` or `example.mts`, depending on your language of choice and add the following code:

```python
# example.py
from elevenlabs.client import ElevenLabs
from elevenlabs.play import play
import os
from io import BytesIO
from dotenv import load_dotenv
load_dotenv()

elevenlabs = ElevenLabs(
    api_key=os.getenv("ELEVENLABS_API_KEY"),
)

stream = elevenlabs.music.stream(
    prompt="Create an intense, fast-paced electronic track for a high-adrenaline video game scene. Use driving synth arpeggios, punchy drums, distorted bass, glitch effects, and aggressive rhythmic textures. The tempo should be fast, 130–150 bpm, with rising tension, quick transitions, and dynamic energy bursts.",
    music_length_ms=10000,
)

# Create a BytesIO object to hold the audio data in memory
audio_stream = BytesIO()

# Write each chunk of audio data to the stream
for chunk in stream:
    if chunk:
        audio_stream.write(chunk)

# Reset stream position to the beginning
audio_stream.seek(0)

play(audio_stream)
```

```typescript
// example.mts
import { ElevenLabsClient, play } from "@elevenlabs/elevenlabs-js";
import "dotenv/config";

const elevenlabs = new ElevenLabsClient();

const stream = await elevenlabs.music.stream({
  prompt: "Create an intense, fast-paced electronic track for a high-adrenaline video game scene. Use driving synth arpeggios, punchy drums, distorted bass, glitch effects, and aggressive rhythmic textures. The tempo should be fast, 130–150 bpm, with rising tension, quick transitions, and dynamic energy bursts.",
  musicLengthMs: 10000,
});

const chunks: Buffer[] = [];

for await (const chunk of stream) {
    chunks.push(chunk);
}

const audioStream = Buffer.concat(chunks);

await play(audioStream);
```

```python
python example.py
```

```typescript
npx tsx example.mts
```

You should hear the generated music playing.

## Next steps

Use composition plans to structure and control how music is generated.

Edit and blend sections of existing tracks with new generations.