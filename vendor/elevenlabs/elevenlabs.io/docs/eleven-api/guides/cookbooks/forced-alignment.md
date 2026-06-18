> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Forced Alignment quickstart

This guide will show you how to use the Forced Alignment API to align text to audio.

## Using the Forced Alignment API

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

Create a new file named `example.py` or `example.mts`, depending on your language of choice and add the following code:

```python maxLines=0
# example.py
import os
from io import BytesIO
from elevenlabs.client import ElevenLabs
import requests
from dotenv import load_dotenv

load_dotenv()

elevenlabs = ElevenLabs(
    api_key=os.getenv("ELEVENLABS_API_KEY"),
)

audio_url = (
    "https://storage.googleapis.com/eleven-public-cdn/audio/marketing/nicole.mp3"
)
response = requests.get(audio_url)
audio_data = BytesIO(response.content)

# Perform the text-to-speech conversion
transcription = elevenlabs.forced_alignment.create(
    file=audio_data,
    text="With a soft and whispery American accent, I'm the ideal choice for creating ASMR content, meditative guides, or adding an intimate feel to your narrative projects."
)

print(transcription)
```

```typescript maxLines=0
// example.ts
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import "dotenv/config";
const elevenlabs = new ElevenLabsClient();

const response = await fetch(
    "https://storage.googleapis.com/eleven-public-cdn/audio/marketing/nicole.mp3"
);
const audioBlob = new Blob([await response.arrayBuffer()], { type: "audio/mp3" });

const transcript = await elevenlabs.forcedAlignment.create({
    file: audioBlob,
    text: "With a soft and whispery American accent, I'm the ideal choice for creating ASMR content, meditative guides, or adding an intimate feel to your narrative projects."
})

console.log(transcript);
```

```python
python example.py
```

```typescript
npx tsx example.mts
```

You should see the transcript of the audio file with exact timestamps printed to the console.

## Next steps

Transcribe audio to text without requiring an existing transcript

Generate the audio from text to use with forced alignment

Explore all Forced Alignment parameters and response formats