> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Voice Remixing quickstart

This guide will show you how to create an entirely new voice by remixing an existing one.

## Using the Voice Design API

This guide assumes you have [set up your API key and SDK](/docs/eleven-api/quickstart). Complete
the quickstart first if you haven't. To play audio through your speakers, you may also need
[MPV](https://mpv.io/) and/or [ffmpeg](https://ffmpeg.org/).

Remixing a voice is a two step process:

1. Generate a preview of the new voice by providing a voice ID and a prompt.
2. Create the new voice from the preview.

We'll start by generating a preview of the new voice.

Create a new file named `example.py` or `example.mts`, depending on your language of choice and add the following code:

You can only remix previously designed voices, IVC or PVC voices, and any voices from the Voice Library that have infinite notice periods.

```python maxLines=0
# example.py
from dotenv import load_dotenv
from elevenlabs.client import ElevenLabs
from elevenlabs.play import play
import base64

load_dotenv()

elevenlabs = ElevenLabs(
    api_key=os.getenv("ELEVENLABS_API_KEY"),
)

voices = elevenlabs.text_to_voice.remix(
    voice_id="JBFqnCBsd6RMkjVDRZzb"
    voice_description="Use a higher pitch and change to a Boston accent.",
    text="Of course I'm a Bostonian, I've lived here all my life!",
)

for preview in voices.previews:
    # Convert base64 to audio buffer
    audio_buffer = base64.b64decode(preview.audio_base_64)

    print(f"Playing preview: {preview.generated_voice_id}")

    play(audio_buffer)
```

```typescript maxLines=0
// example.ts
import { ElevenLabsClient, play } from "@elevenlabs/elevenlabs-js";
import "dotenv/config";
import { Readable } from 'node:stream';
import { Buffer } from 'node:buffer';

const elevenlabs = new ElevenLabsClient();

const { previews } = await elevenlabs.textToVoice.remix("JBFqnCBsd6RMkjVDRZzb", {
    voiceDescription: "Use a higher pitch and change to a Boston accent.",
    text: "Of course I'm a Bostonian, I've lived here all my life!",
});

for (const preview of previews) {
    // Convert base64 to buffer and create a Readable stream
    const audioStream = Readable.from(Buffer.from(preview.audioBase64, 'base64'));

    console.log(`Playing preview: ${preview.generatedVoiceId}`);

    // Play the audio using the stream
    await play(audioStream);
}
```

```python
python example.py
```

```typescript
npx tsx example.mts
```

You should hear the generated voice previews playing through your speakers, one at a time.

Once you've generated the previews and picked your favorite, you can add it to your voice library via the generated voice ID so it can be used with other APIs.

```python
voice = elevenlabs.text_to_voice.create(
    voice_name="Bostonian",
    voice_description="A high pitched Bostonian accent.",
    # The generated voice ID of the preview you want to use,
    # using the first in the list for this example
    generated_voice_id=voices.previews[0].generated_voice_id
)

print(voice.voice_id)
```

```typescript
const voice = await elevenlabs.textToVoice.create({
    voiceName: "Bostonian",
    voiceDescription: "A high pitched Bostonian accent.",
    // The generated voice ID of the preview you want to use,
    // using the first in the list for this example
    generatedVoiceId: previews[0].generatedVoiceId
});

// The ID of the newly created voice, use this to reference the voice in other APIs
console.log(voice.voiceId);
```

## Next steps

Generate a new voice from a text description rather than remixing an existing one.

Full Voice Remix API reference and parameters.