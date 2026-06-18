> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Dubbing quickstart

This guide will show you how to dub an audio file across languages. In this example we'll dub an audio file from English to Spanish.

## Using the Dubbing API

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
import time

load_dotenv()

elevenlabs = ElevenLabs(
  api_key=os.getenv("ELEVENLABS_API_KEY"),
)

target_lang = "es"  # Spanish

audio_url = (
    "https://storage.googleapis.com/eleven-public-cdn/audio/marketing/nicole.mp3"
)
response = requests.get(audio_url)

audio_data = BytesIO(response.content)
audio_data.name = "audio.mp3"

# Start dubbing
dubbed = elevenlabs.dubbing.create(
    file=audio_data, target_lang=target_lang
)

while True:
    status = elevenlabs.dubbing.get(dubbed.dubbing_id).status
    if status == "dubbed":
        dubbed_file = elevenlabs.dubbing.audio.get(dubbed.dubbing_id, target_lang)
        play(dubbed_file)
        break
    else:
        print("Audio is still being dubbed...")
        time.sleep(5)
```

```typescript maxLines=0
// example.mts
import { ElevenLabsClient, play } from "@elevenlabs/elevenlabs-js";
import "dotenv/config";

const elevenlabs = new ElevenLabsClient();

const targetLang = "es"; // spanish
const sourceAudio = await fetch(
  "https://storage.googleapis.com/eleven-public-cdn/audio/marketing/nicole.mp3"
);
const audioBlob = new Blob([await sourceAudio.arrayBuffer()], {
  type: "audio/mp3",
});

// Start dubbing
const dubbed = await elevenlabs.dubbing.create({
  file: audioBlob,
  targetLang: targetLang,
});

while (true) {
  const { status } = await elevenlabs.dubbing.get(
    dubbed.dubbingId
  );
  if (status === "dubbed") {
    const dubbedFile = await elevenlabs.dubbing.audio.get(
      dubbed.dubbingId,
      targetLang
    );
    await play(dubbedFile);
    break;
  } else {
    console.log("Audio is still being dubbed...");
  }

  // Wait 5 seconds between checks
  await new Promise((resolve) => setTimeout(resolve, 5000));
}
```

```python
python example.py
```

```typescript
npx tsx example.mts
```

You should hear the dubbed audio file playing through your speakers.

## Next steps

Learn about supported languages, formats, and dubbing capabilities

Explore voices available for use in dubbed content

Explore all Dubbing API parameters and response formats