> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Keyterm prompting

**How-to guide** · Assumes you have completed the [Speech to Text
quickstart](/docs/eleven-api/guides/cookbooks/speech-to-text).

## Overview

Keyterm prompting is available with the Scribe v2 model (batch and realtime) and comes at an
additional cost. See the [API pricing
page](https://elevenlabs.io/pricing?price.section=speech_to_text\&price.sections=speech_to_text,speech_to_text#pricing-table)
for detailed pricing information.

Keyterm prompting is a feature that allows you to highlight words or phrases to bias the model towards transcribing them. This is useful for transcribing specific words or sentences that are not common in the audio, such as product names, names, or other specific terms. Keyterms are more powerful than biased keywords or customer vocabularies offered by other models, because it relies on the context to decide whether to transcribe that term or not.

|                            | Batch (Scribe v2) | Realtime (Scribe v2 Realtime) |
| -------------------------- | ----------------- | ----------------------------- |
| Max keyterms               | 1000              | 50                            |
| Max characters per keyterm | 50                | 20                            |

For example, if your company name is not a common phrase or has a unique spelling or pronunciation you can use keyterms to ensure the model transcribes correctly. Take the following audio:

<elevenlabs-audio-player audio-title="Company name example" audio-src="https://storage.googleapis.com/eleven-public-cdn/documentation_assets/audio/stt-keyterm-prompting.mp3" />

Without keyterm prompting, the model might transcribe the above as:

```
I work at eleven labs.
```

Which uses the wrong style for the company name. With keyterm prompting, you can ensure the model transcribes the above with the correct spelling and style:

```
I work at ElevenLabs.
```

### Context

The model is able to use context to determine whether a term should be transcribed or not. When providing the keyterm "ElevenLabs", the above audio transcribes as expected, yet the model will still be able to transcribe the following correctly based on the context:

<elevenlabs-audio-player audio-title="Context example" audio-src="https://storage.googleapis.com/eleven-public-cdn/documentation_assets/audio/stt-keyterm-prompting-context.mp3" />

Which outputs the following transcription:

```
I've worked at many labs. In fact I've worked at eleven labs.
```

## Batch transcription

Keyterm prompting is integrated into the batch Speech to Text API by passing the `keyterms` parameter to the `convert` method.

```python maxLines=0 {22-24}
import os
from dotenv import load_dotenv
from io import BytesIO
import requests
from elevenlabs.client import ElevenLabs

load_dotenv()

elevenlabs = ElevenLabs(
    api_key=os.getenv("ELEVENLABS_API_KEY"),
)

audio_url = (
    "https://storage.googleapis.com/eleven-public-cdn/documentation_assets/audio/stt-keyterm-prompting.mp3"
)
response = requests.get(audio_url)
audio_data = BytesIO(response.content)

transcription = elevenlabs.speech_to_text.convert(
    file=audio_data,
    model_id="scribe_v2", # Model to use
    # Keyterms to prompt the model with.
    # Up to 1000 keyterms can be provided, with a maximum length of 50 characters each
    keyterms=["ElevenLabs"],
)

print(transcription)
```

```typescript maxLines=0 {16-18}
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import "dotenv/config";

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVENLABS_API_KEY,
});

const response = await fetch(
  "https://storage.googleapis.com/eleven-public-cdn/documentation_assets/audio/stt-keyterm-prompting.mp3"
);
const audioBlob = new Blob([await response.arrayBuffer()], { type: "audio/mp3" });

const transcription = await elevenlabs.speechToText.convert({
  file: audioBlob,
  modelId: "scribe_v2", // Model to use
  // Keyterms to prompt the model with.
  // Up to 1000 keyterms can be provided, with a maximum length of 50 characters each
  keyterms: ["ElevenLabs"],
});

console.log(transcription);
```

## Realtime streaming

Keyterm prompting is also available for the [realtime Speech to Text WebSocket API](/docs/eleven-api/guides/how-to/speech-to-text/realtime/client-side-streaming). Pass the `keyterms` parameter when connecting.

```python
connection = await elevenlabs.speech_to_text.realtime.connect(RealtimeUrlOptions(
    model_id="scribe_v2_realtime",
    keyterms=["ElevenLabs"],
))
```

```typescript
const connection = await elevenlabs.speechToText.realtime.connect({
  modelId: "scribe_v2_realtime",
  keyterms: ["ElevenLabs"],
});
```

When using the WebSocket API directly, pass keyterms as query parameters:

```
wss://api.elevenlabs.io/v1/speech-to-text/realtime?model_id=scribe_v2_realtime&keyterms=ElevenLabs&keyterms=AnotherTerm
```

## Next steps

Full Speech to Text API reference and parameters.

Automatically detect and label entities like names, dates, and locations in transcripts.