> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Instant Voice Cloning quickstart

This guide will show you how to create an Instant Voice Clone using the Clone Voice API. To create an Instant Voice Clone via the dashboard, refer to the [Instant Voice Clone](/docs/eleven-creative/voices/voice-cloning/instant-voice-cloning) product guide.

For an in-depth explanation of how IVC and PVC work under the hood and when to choose each, see [Voice cloning: how it works](/docs/eleven-api/concepts/voice-cloning).

## Using the Instant Voice Clone API

This guide assumes you have [set up your API key and SDK](/docs/eleven-api/quickstart). Complete
the quickstart first if you haven't.

Create a new file named `example.py` or `example.mts`, depending on your language of choice and add the following code:

```python maxLines=0
# example.py
import os
from dotenv import load_dotenv
from elevenlabs.client import ElevenLabs
from io import BytesIO

load_dotenv()

elevenlabs = ElevenLabs(
  api_key=os.getenv("ELEVENLABS_API_KEY"),
)

voice = elevenlabs.voices.ivc.create(
    name="My Voice Clone",
    # Replace with the paths to your audio files.
    # The more files you add, the better the clone will be.
    files=[BytesIO(open("/path/to/your/audio/file.mp3", "rb").read())]
)

print(voice.voice_id)
```

```typescript maxLines=0
// example.mts
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import "dotenv/config";
import fs from "node:fs";

const elevenlabs = new ElevenLabsClient();

const voice = await elevenlabs.voices.ivc.create({
    name: "My Voice Clone",
    // Replace with the paths to your audio files.
    // The more files you add, the better the clone will be.
    files: [
        fs.createReadStream(
            "/path/to/your/audio/file.mp3",
        ),
    ],
});

console.log(voice.voiceId);
```

```python
python example.py
```

```typescript
npx tsx example.mts
```

You should see the voice ID printed to the console.

## Next steps

Create a higher-quality clone by fine-tuning a model on your voice samples.

Understand the technical differences between IVC and PVC and when to choose each.