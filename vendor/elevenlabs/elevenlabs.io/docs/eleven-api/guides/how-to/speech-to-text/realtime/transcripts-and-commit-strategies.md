> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Transcripts and commit strategies

**How-to guide** · Assumes you have completed the
[client-side](/docs/eleven-api/guides/how-to/speech-to-text/realtime/client-side-streaming) or
[server-side
streaming](/docs/eleven-api/guides/how-to/speech-to-text/realtime/server-side-streaming) guide.

## Overview

When transcribing audio, you will receive partial and committed transcripts.

* **Partial transcripts** - the interim results of the transcription
* **Committed transcripts** - the final results of the transcription segment that are sent when a "commit" message is received. A session can have multiple committed transcripts.

The commit transcript can optionally contain word-level timestamps. This is only received when the "include timestamps" option is set to `true`.

```python
# Initialize the connection
connection = await elevenlabs.speech_to_text.realtime.connect(RealtimeUrlOptions(
  model_id="scribe_v2_realtime",
  include_timestamps=True, # Include this to receive the RealtimeEvents.COMMITTED_TRANSCRIPT_WITH_TIMESTAMPS event with word-level timestamps
))
```

```typescript
// Initialize the connection
const connection = await elevenlabs.speechToText.realtime.connect({
  modelId: "scribe_v2_realtime",
  includeTimestamps: true, // Include this to receive the RealtimeEvents.COMMITTED_TRANSCRIPT_WITH_TIMESTAMPS event with word-level timestamps
});
```

```typescript title="React"
const connection = useScribe({
  modelId: "scribe_v2_realtime",
  // Configuring this callback will automatically set the `includeTimestamps` option to `true`
  onCommittedTranscriptWithTimestamps: (data) => {
    console.log("Committed with timestamps:", data.text);
    console.log("Timestamps:", data.words);
  },
});
```

```typescript title="JavaScript"
const connection = Scribe.connect({
  modelId: "scribe_v2_realtime",
  includeTimestamps: true, // Include this to receive the RealtimeEvents.COMMITTED_TRANSCRIPT_WITH_TIMESTAMPS event with word-level timestamps
});
```

## Commit strategies

When sending audio chunks via the WebSocket, transcript segments can be committed in two ways: Manual Commit or Voice Activity Detection (VAD).

### Manual commit

With the manual commit strategy, you control when to commit transcript segments. This is the strategy that is used by default. Committing a segment will clear the processed accumulated transcript and start a new segment without losing context. Committing every 20-30 seconds is good practice to improve latency. By default the stream will be automatically committed every 90 seconds.

For best results, commit during silence periods or another logical point like a turn model.

Transcript processing starts after the first 2 seconds of audio are sent.

```python
await connection.send({
  "audio_base_64": audio_base_64,
  "sample_rate": 16000,
})

# When ready to finalize the segment
await connection.commit()
```

```typescript
connection.send({
  audioBase64: audioBase64,
  sampleRate: 16000,
});

// When ready to finalize the segment
connection.commit();
```

Committing manually several times in a short sequence can degrade model performance.

#### Sending previous text context

When sending audio for transcription, you can send previous text context alongside the first audio chunk to help the model understand the context of the speech. This is useful in a few scenarios:

* Agent text for conversational AI use cases - Allows the model to more easily understand the context of the conversation and produce better transcriptions.
* Reconnection after a network error - This allows the model to continue transcribing, using the previous text as guidance.
* General contextual information - A short description of what the transcription will be about helps the model understand the context.

Sending `previous_text` context is only possible when sending the first audio chunk via
`connection.send()`. Sending it in subsequent chunks will result in an error. Previous text works
best when it's under *50* characters long.

```python
await connection.send({
  "audio_base_64": audio_base_64,
  "previous_text": "The previous text context",
})
```

```typescript
connection.send({
  audioBase64: audioBase64,
  previousText: "The previous text context",
});
```

### Voice Activity Detection (VAD)

With the VAD strategy, the transcription engine automatically detects speech and silence segments. When a silence threshold is reached, the transcription engine will commit the transcript segment automatically.

When transcribing audio from the microphone in the [client-side integration](/docs/eleven-api/guides/how-to/speech-to-text/realtime/client-side-streaming), it is recommended to use the VAD strategy.

```typescript title="Client"
import { Scribe, AudioFormat, CommitStrategy } from "@elevenlabs/client";

const connection = Scribe.connect({
  token: "sutkn_1234567890",
  modelId: "scribe_v2_realtime",
  audioFormat: AudioFormat.PCM_16000,
  commitStrategy: CommitStrategy.VAD,
  vadSilenceThresholdSecs: 1.5,
  vadThreshold: 0.4,
  minSpeechDurationMs: 100,
  minSilenceDurationMs: 100,
});
```

```python
from dotenv import load_dotenv
from elevenlabs import AudioFormat, CommitStrategy, ElevenLabs, RealtimeAudioOptions

load_dotenv()

elevenlabs = ElevenLabs(api_key=os.getenv("ELEVENLABS_API_KEY"))

connection = await elevenlabs.speech_to_text.realtime.connect(
    RealtimeAudioOptions(
        model_id="scribe_v2_realtime",
        audio_format=AudioFormat.PCM_16000,
        commit_strategy=CommitStrategy.VAD,
        vad_silence_threshold_secs=1.5,
        vad_threshold=0.4,
        min_speech_duration_ms=100,
        min_silence_duration_ms=100,
    )
)
```

```typescript title="TypeScript"
import { ElevenLabsClient, AudioFormat, CommitStrategy } from '@elevenlabs/elevenlabs-js';

const elevenlabs = new ElevenLabsClient();

const connection = await elevenlabs.speechToText.realtime.connect({
  modelId: "scribe_v2_realtime",
  audioFormat: AudioFormat.PCM_16000,
  commitStrategy: CommitStrategy.VAD,
  vadSilenceThresholdSecs: 1.5,
  vadThreshold: 0.4,
  minSpeechDurationMs: 100,
  minSilenceDurationMs: 100,
});
```

## Supported audio formats

| Format     | Sample Rate | Description                             |
| ---------- | ----------- | --------------------------------------- |
| pcm\_8000  | 8 kHz       | 16-bit PCM, little-endian               |
| pcm\_16000 | 16 kHz      | 16-bit PCM, little-endian (recommended) |
| pcm\_22050 | 22.05 kHz   | 16-bit PCM, little-endian               |
| pcm\_24000 | 24 kHz      | 16-bit PCM, little-endian               |
| pcm\_44100 | 44.1 kHz    | 16-bit PCM, little-endian               |
| pcm\_48000 | 48 kHz      | 16-bit PCM, little-endian               |
| ulaw\_8000 | 8 kHz       | 8-bit μ-law encoding                    |

## Best practices

### Audio quality

* For best results, use a 16kHz sample rate for an optimum balance of quality and bandwidth.
* Ensure clean audio input with minimal background noise.
* Use an appropriate microphone gain to avoid clipping.
* Only mono audio is supported at this time.

### Chunk size

* Send audio chunks of 0.1 - 1 second in length for smooth streaming.
* Smaller chunks result in lower latency but more overhead.
* Larger chunks are more efficient but can introduce latency.

## Next steps

Set up server-side audio transcription using the WebSocket API.

Full list of events and error types from the realtime STT API.