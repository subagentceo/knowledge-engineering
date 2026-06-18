> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Voice Isolator quickstart

This guide will show you how to remove background noise from an audio file using the Voice Isolator API.

Use the [ElevenLabs voice-isolator skill](https://github.com/elevenlabs/skills/tree/main/voice-isolator) to remove background noise from audio files from your AI coding assistant:

```bash
npx skills add elevenlabs/skills --skill voice-isolator
```

## Using the Voice Isolator API

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

audio_url = "https://storage.googleapis.com/eleven-public-cdn/documentation_assets/audio/voice_with_background.mp3"
response = requests.get(audio_url)
audio_data = BytesIO(response.content)

audio_stream = elevenlabs.audio_isolation.convert(audio=audio_data)

play(audio_stream)
```

```typescript maxLines=0
// example.mts
import { ElevenLabsClient, play } from "@elevenlabs/elevenlabs-js";
import "dotenv/config";

const elevenlabs = new ElevenLabsClient();

const audioUrl =
  "https://storage.googleapis.com/eleven-public-cdn/documentation_assets/audio/voice_with_background.mp3";
const response = await fetch(audioUrl);
const audioBlob = new Blob([await response.arrayBuffer()], {
  type: "audio/mp3",
});

const audioStream = await elevenlabs.audioIsolation.convert({
  audio: audioBlob,
});

await play(audioStream);
```

```python
python example.py
```

```typescript
npx tsx example.mts
```

You should hear the isolated voice playing through your speakers.

## Next steps

Transform the voice in an audio file to a different voice

Transcribe the isolated voice to text with the Speech to Text API

Explore all Voice Isolator parameters and response formats