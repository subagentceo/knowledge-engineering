> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Voice Design quickstart

This guide will show you how to design a voice via a prompt using the Voice Design API.

## Using the Voice Design API

This guide assumes you have [set up your API key and SDK](/docs/eleven-api/quickstart). Complete
the quickstart first if you haven't. To play audio through your speakers, you may also need
[MPV](https://mpv.io/) and/or [ffmpeg](https://ffmpeg.org/).

Designing a voice via a prompt has two steps:

1. Generate previews based on a prompt.
2. Select the best preview and use it to create a new voice.

We'll start by generating previews based on a prompt.

Create a new file named `example.py` or `example.mts`, depending on your language of choice and add the following code:

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

voices = elevenlabs.text_to_voice.design(
    model_id="eleven_multilingual_ttv_v2",
    voice_description="A massive evil ogre speaking at a quick pace. He has a silly and resonant tone.",
    text="Your weapons are but toothpicks to me. Surrender now and I may grant you a swift end. I've toppled kingdoms and devoured armies. What hope do you have against me?",
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

const { previews } = await elevenlabs.textToVoice.design({
    modelId: "eleven_multilingual_ttv_v2",
    voiceDescription: "A massive evil ogre speaking at a quick pace. He has a silly and resonant tone.",
    text: "Your weapons are but toothpicks to me. Surrender now and I may grant you a swift end. I've toppled kingdoms and devoured armies. What hope do you have against me?",
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
    voice_name="Jolly giant",
    voice_description="A huge giant, at least as tall as a building. A deep booming voice, loud and jolly.",
    # The generated voice ID of the preview you want to use,
    # using the first in the list for this example
    generated_voice_id=voices.previews[0].generated_voice_id
)

print(voice.voice_id)
```

```typescript
const voice = await elevenlabs.textToVoice.create({
    voiceName: "Jolly giant",
    voiceDescription: "A huge giant, at least as tall as a building. A deep booming voice, loud and jolly.",
    // The generated voice ID of the preview you want to use,
    // using the first in the list for this example
    generatedVoiceId: previews[0].generatedVoiceId
});

// The ID of the newly created voice, use this to reference the voice in other APIs
console.log(voice.voiceId);
```

## Next steps

Clone a voice from existing audio instead of generating one from a description.

Full Voice Design API reference and parameters.