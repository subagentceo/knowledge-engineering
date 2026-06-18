> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Voice Changer quickstart

This guide will show you how to transform the voice of an audio file using the Voice Changer API.

Use the [ElevenLabs voice-changer skill](https://github.com/elevenlabs/skills/tree/main/voice-changer) to transform voices in audio files from your AI coding assistant:

```bash
npx skills add elevenlabs/skills --skill voice-changer
```

## Using the Voice Changer API

[Create an API key in the dashboard here](https://elevenlabs.io/app/settings/api-keys), which you’ll use to securely [access the API](/docs/api-reference/authentication).

Store the key as a managed secret and pass it to the SDKs either as a environment variable via an `.env` file, or directly in your app’s configuration depending on your preference.

```js title=".env"
ELEVENLABS_API_KEY=<your_api_key_here>
```

We'll also use the `dotenv` library to load our API key from an environment variable.

```python
pip install elevenlabs
pip install python-dotenv
```

```typescript
npm install @elevenlabs/elevenlabs-js
npm install dotenv
```

To play the audio through your speakers, you may be prompted to install [MPV](https://mpv.io/)
and/or [ffmpeg](https://ffmpeg.org/).

Create a new file named `example.py` or `example.mts`, depending on your language of choice and add the following code:

```python maxLines=0
# example.py
import os
from dotenv import load_dotenv
from elevenlabs.client import ElevenLabs
from elevenlabs.play import play
import requests
from io import BytesIO

load_dotenv()

elevenlabs = ElevenLabs(
  api_key=os.getenv("ELEVENLABS_API_KEY"),
)
voice_id = "JBFqnCBsd6RMkjVDRZzb"

audio_url = (
    "https://storage.googleapis.com/eleven-public-cdn/audio/marketing/nicole.mp3"
)
response = requests.get(audio_url)
audio_data = BytesIO(response.content)

audio_stream = elevenlabs.speech_to_speech.convert(
    voice_id=voice_id,
    audio=audio_data,
    model_id="eleven_multilingual_sts_v2",
    output_format="mp3_44100_128",
)

play(audio_stream)
```

```typescript maxLines=0
// example.mts
import { ElevenLabsClient, play } from "@elevenlabs/elevenlabs-js";
import "dotenv/config";

const elevenlabs = new ElevenLabsClient();
const voiceId = "JBFqnCBsd6RMkjVDRZzb";

const response = await fetch(
  "https://storage.googleapis.com/eleven-public-cdn/audio/marketing/nicole.mp3"
);
const audioBlob = new Blob([await response.arrayBuffer()], { type: "audio/mp3" });

const audioStream = await elevenlabs.speechToSpeech.convert(voiceId, {
  audio: audioBlob,
  modelId: "eleven_multilingual_sts_v2",
  outputFormat: "mp3_44100_128",
});

await play(audioStream);
```

```python
python example.py
```

```typescript
npx tsx example.mts
```

You should hear the transformed voice playing through your speakers.

## Next steps

Explore 10,000+ voices to use as the target voice for transformation

Create a custom voice from a short audio recording to use as the target

Explore all Voice Changer parameters and response formats