> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Introduction

## Installation

You can interact with the API through HTTP or Websocket requests from any language, via our official Python bindings or our official Node.js libraries.

To install the official Python bindings, run the following command:

```bash
pip install elevenlabs
```

To install the official Node.js library, run the following command in your Node.js project directory:

```bash
npm install @elevenlabs/elevenlabs-js
```

## Tracking generation costs

Access response headers to retrieve generation metadata including character costs.

```python
from elevenlabs.client import ElevenLabs

client = ElevenLabs(api_key="your_api_key")

# Get raw response with headers
response = client.text_to_speech.with_raw_response.convert(
    text="Hello, world!",
    voice_id="voice_id"
)

# Access character cost from headers
char_cost = response.headers.get("character-cost")

# Optionally store these for debugging
request_id = response.headers.get("request-id")
trace_id = response.headers.get("x-trace-id")

audio_data = response.data
```

```typescript
import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';

const client = new ElevenLabsClient({ apiKey: 'your_api_key' });

// Get raw response with headers
const { data, rawResponse } = await client.textToSpeech
  .convert('voice_id', {
    text: 'Hello, world!',
    modelId: 'eleven_v3',
  })
  .withRawResponse();

// Access character cost from headers
const charCost = rawResponse.headers.get('character-cost');

// Optionally store these for debugging
const requestId = rawResponse.headers.get('request-id');
const traceId = rawResponse.headers.get('x-trace-id');

const audioData = data;
```

The raw response provides access to:

* Response data - The actual API response content
* HTTP headers - Metadata including character costs and request IDs