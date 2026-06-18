> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Server-side streaming

**How-to guide** · Assumes you have completed the [Speech to Text
quickstart](/docs/eleven-api/guides/cookbooks/speech-to-text).

## Overview

The ElevenLabs Realtime Speech to Text API enables you to transcribe audio streams in real-time with ultra-low latency using the Scribe Realtime v2 model. Whether you're building voice assistants, transcription services, or any application requiring live speech recognition, this WebSocket-based API delivers partial transcripts as you speak and committed transcripts when speech segments are complete.

Scribe v2 Realtime can be implemented on the server side to transcribe audio in realtime, either via a URL, file or your own audio stream.

The server side implementation differs from client side in a few ways:

* Uses an ElevenLabs API key instead of a single use token.
* Supports streaming from a URL directly, without the need to manually chunk the audio.

For streaming audio directly from the microphone, see the [Client-side streaming](/docs/eleven-api/guides/how-to/speech-to-text/realtime/client-side-streaming) guide.

## Quickstart

This guide assumes you have [set up your API key and SDK](/docs/eleven-api/quickstart). Complete
the quickstart first if you haven't.

The SDK provides two ways to transcribe audio in realtime: streaming from a URL or manually chunking the audio from either a file or your own audio stream.

For a full list of parameters and options the API supports, please refer to the [API reference](/docs/api-reference/speech-to-text/v-1-speech-to-text-realtime).

This example shows how to stream an audio file from a URL using the official SDK.

The `ffmpeg` tool is required when streaming from an URL. Visit [their website](https://ffmpeg.org/download.html) for installation instructions.

Create a new file named `example.py` or `example.mts`, depending on your language of choice and add the following code:

```python
from dotenv import load_dotenv
import os
import asyncio
from elevenlabs import ElevenLabs, RealtimeEvents, RealtimeUrlOptions

load_dotenv()

async def main():
    elevenlabs = ElevenLabs(api_key=os.getenv("ELEVENLABS_API_KEY"))

    # Create an event to signal when to stop
    stop_event = asyncio.Event()

    # Connect to a streaming audio URL
    connection = await elevenlabs.speech_to_text.realtime.connect(RealtimeUrlOptions(
        model_id="scribe_v2_realtime",
        url="https://npr-ice.streamguys1.com/live.mp3",
        include_timestamps=True,
    ))

    # Set up event handlers
    def on_session_started(data):
        print(f"Session started: {data}")

    def on_partial_transcript(data):
        print(f"Partial: {data.get('text', '')}")

    def on_committed_transcript(data):
        print(f"Committed: {data.get('text', '')}")

    # Committed transcripts with word-level timestamps. Only received when include_timestamps is set to True.
    def on_committed_transcript_with_timestamps(data):
        print(f"Committed with timestamps: {data.get('words', '')}")

    # Errors - will catch all errors, both server and websocket specific errors
    def on_error(error):
        print(f"Error: {error}")
        # Signal to stop on error
        stop_event.set()

    def on_close():
        print("Connection closed")

    # Register event handlers
    connection.on(RealtimeEvents.SESSION_STARTED, on_session_started)
    connection.on(RealtimeEvents.PARTIAL_TRANSCRIPT, on_partial_transcript)
    connection.on(RealtimeEvents.COMMITTED_TRANSCRIPT, on_committed_transcript)
    connection.on(RealtimeEvents.COMMITTED_TRANSCRIPT_WITH_TIMESTAMPS, on_committed_transcript_with_timestamps)
    connection.on(RealtimeEvents.ERROR, on_error)
    connection.on(RealtimeEvents.CLOSE, on_close)

    print("Transcribing audio stream... (Press Ctrl+C to stop)")

    try:
        # Wait until error occurs or connection closes
        await stop_event.wait()
    except KeyboardInterrupt:
        print("\nStopping transcription...")
    finally:
        await connection.close()

if __name__ == "__main__":
    asyncio.run(main())
```

```typescript
import "dotenv/config";
import { ElevenLabsClient, RealtimeEvents } from "@elevenlabs/elevenlabs-js";

const elevenlabs = new ElevenLabsClient();

const connection = await elevenlabs.speechToText.realtime.connect({
  modelId: "scribe_v2_realtime",
  url: "https://npr-ice.streamguys1.com/live.mp3",
  includeTimestamps: true,
});

connection.on(RealtimeEvents.SESSION_STARTED, (data) => {
  console.log("Session started", data);
});

connection.on(RealtimeEvents.PARTIAL_TRANSCRIPT, (transcript) => {
  console.log("Partial transcript", transcript);
});

connection.on(RealtimeEvents.COMMITTED_TRANSCRIPT, (transcript) => {
  console.log("Committed transcript", transcript);
});

connection.on(RealtimeEvents.COMMITTED_TRANSCRIPT_WITH_TIMESTAMPS, (transcript) => {
  console.log("Committed with timestamps", transcript);
});

connection.on(RealtimeEvents.ERROR, (error) => {
  console.log("Error", error);
});

connection.on(RealtimeEvents.CLOSE, () => {
  console.log("Connection closed");
});

```

The easiest way to transcribe audio using Scribe is to use the official SDK. In case you aren't able to use the SDK, you can use the WebSocket API directly. See the WebSocket example below on how to use the WebSocket API.

This example simulates a realtime transcription of an audio file.

```python
import asyncio
import base64
import os
from dotenv import load_dotenv
from pathlib import Path
from elevenlabs import AudioFormat, CommitStrategy, ElevenLabs, RealtimeEvents, RealtimeAudioOptions
from pydub import AudioSegment
import sys

load_dotenv()

async def main():
    # Initialize the ElevenLabs client
    elevenlabs = ElevenLabs(api_key=os.getenv("ELEVENLABS_API_KEY"))

    # Create an event to signal when transcription is complete
    transcription_complete = asyncio.Event()

    # Connect with manual audio chunk mode
    connection = await elevenlabs.speech_to_text.realtime.connect(RealtimeAudioOptions(
        model_id="scribe_v2_realtime",
        audio_format=AudioFormat.PCM_16000,
        sample_rate=16000,
        commit_strategy=CommitStrategy.MANUAL,
        include_timestamps=True,
    ))

    # Set up event handlers
    def on_session_started(data):
        print(f"Session started: {data}")
        # Start sending audio once session is ready
        asyncio.create_task(send_audio())

    def on_partial_transcript(data):
        transcript = data.get('text', '')
        if transcript:
            print(f"Partial: {transcript}")

    def on_committed_transcript(data):
        transcript = data.get('text', '')
        print(f"\nCommitted transcript: {transcript}")

    def on_committed_transcript_with_timestamps(data):
        print(f"Timestamps: {data.get('words', '')}")
        print("-" * 50)
        # Signal that transcription is complete
        transcription_complete.set()

    def on_error(error):
        print(f"Error: {error}")
        transcription_complete.set()

    def on_close():
        print("Connection closed")
        transcription_complete.set()

    # Register event handlers
    connection.on(RealtimeEvents.SESSION_STARTED, on_session_started)
    connection.on(RealtimeEvents.PARTIAL_TRANSCRIPT, on_partial_transcript)
    connection.on(RealtimeEvents.COMMITTED_TRANSCRIPT, on_committed_transcript)
    connection.on(RealtimeEvents.COMMITTED_TRANSCRIPT_WITH_TIMESTAMPS, on_committed_transcript_with_timestamps)
    connection.on(RealtimeEvents.ERROR, on_error)
    connection.on(RealtimeEvents.CLOSE, on_close)

    # Convert audio file to PCM format if necessary
    def load_and_convert_audio(audio_path: str | Path, target_sample_rate: int = 16000) -> bytes:
        try:
            if str(audio_path).lower().endswith('.pcm'):
                with open(audio_path, 'rb') as f:
                    return f.read()

            audio = AudioSegment.from_file(audio_path)
            if audio.channels > 1:
                audio = audio.set_channels(1)
            if audio.frame_rate != target_sample_rate:
                audio = audio.set_frame_rate(target_sample_rate)
            audio = audio.set_sample_width(2)
            return audio.raw_data
        except Exception as e:
            print(f"Error loading audio: {e}")
            sys.exit(1)

    async def send_audio():
        """Send audio chunks from an audio file"""
        audio_file_path = Path("/path/to/audio.mp3")

        try:
            # Read the audio file
            audio_data = load_and_convert_audio(audio_file_path)

            # Split into chunks (1 second of audio = 32000 bytes at 16kHz, 16-bit)
            chunk_size = 32000
            chunks = [audio_data[i:i + chunk_size] for i in range(0, len(audio_data), chunk_size)]

            # Send each chunk
            for i, chunk in enumerate(chunks):
                chunk_base64 = base64.b64encode(chunk).decode('utf-8')
                await connection.send({"audio_base_64": chunk_base64, "sample_rate": 16000})

                # Wait 1 second between chunks (simulating real-time)
                if i < len(chunks) - 1:
                    await asyncio.sleep(1)

            # Small delay before committing to let last chunk process
            await asyncio.sleep(0.5)

            # Commit to finalize segment and get committed transcript
            await connection.commit()

        except Exception as e:
            print(f"Error sending audio: {e}")
            transcription_complete.set()

    try:
        # Wait for transcription to complete
        await transcription_complete.wait()
    except KeyboardInterrupt:
        print("\nStopping...")
    finally:
        await connection.close()

if __name__ == "__main__":
    asyncio.run(main())

```

```typescript
import "dotenv/config";
import * as fs from "node:fs";
import { ElevenLabsClient, RealtimeEvents, AudioFormat } from "@elevenlabs/elevenlabs-js";

const elevenlabs = new ElevenLabsClient();

const connection = await elevenlabs.speechToText.realtime.connect({
  modelId: "scribe_v2_realtime",
  audioFormat: AudioFormat.PCM_16000,
  sampleRate: 16000,
  includeTimestamps: true,
});

connection.on(RealtimeEvents.SESSION_STARTED, (data) => {
  console.log("Session started", data);
  sendAudio();
});

connection.on(RealtimeEvents.PARTIAL_TRANSCRIPT, (transcript) => {
  console.log("Partial transcript", transcript);
});

connection.on(RealtimeEvents.COMMITTED_TRANSCRIPT, (transcript) => {
  console.log("Committed transcript", transcript);
});

connection.on(RealtimeEvents.COMMITTED_TRANSCRIPT_WITH_TIMESTAMPS, (transcript) => {
  console.log("Committed with timestamps", transcript);
});

connection.on(RealtimeEvents.ERROR, (error) => {
  console.log("Error", error);
});

connection.on(RealtimeEvents.CLOSE, () => {
  console.log("Connection closed");
});

async function sendAudio() {
  const pcmFilePath = "/path/to/audio.pcm";

  const chunkSize = 32000; // 1 second of 16kHz audio (16000 samples * 2 bytes per sample)

  // Read the entire file into a buffer
  const audioBuffer = fs.readFileSync(pcmFilePath);

  // Split the buffer into chunks of exactly chunkSize bytes
  const chunks: Buffer[] = [];
  for (let i = 0; i < audioBuffer.length; i += chunkSize) {
    const chunk = audioBuffer.subarray(i, i + chunkSize);
    chunks.push(chunk);
  }

  // Send each chunk via websocket payload
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const chunkBase64 = chunk.toString("base64");

    connection.send({
      audioBase64: chunkBase64,
      sampleRate: 16000,
    });

    // Wait 1 second between chunks to simulate real-time streaming
    // (each chunk contains 1 second of audio at 16kHz)
    if (i < chunks.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  // Small delay before final commit to let the last chunk process
  await new Promise(resolve => setTimeout(resolve, 500));

  // send final commit
  connection.commit();
}
```

```python title="Python WebSocket example"
# Use this example if you are unable to use the SDK
import asyncio
import base64
import json
import websockets
from dotenv import load_dotenv
import os

load_dotenv()

async def send_audio(ws, audio_data):
    """Send audio chunks to the websocket"""
    chunk_size = 32000  # 1 second of 16kHz audio

    for i in range(0, len(audio_data), chunk_size):
        chunk = audio_data[i : i + chunk_size]
        await ws.send(
            json.dumps(
                {
                    "message_type": "input_audio_chunk",
                    "audio_base_64": base64.b64encode(chunk).decode(),
                    "commit": False,
                    "sample_rate": 16000,
                }
            )
        )
        # Wait 1 second between chunks to simulate real-time streaming
        await asyncio.sleep(1)

    # Small delay before final commit
    await asyncio.sleep(0.5)

    # Send final commit
    await ws.send(
        json.dumps(
            {
                "message_type": "input_audio_chunk",
                "audio_base_64": "",
                "commit": True,
                "sample_rate": 16000,
            }
        )
    )

async def receive_transcripts(ws):
    """Receive and process transcripts from the websocket"""
    while True:
        try:
            # Wait for 10 seconds for a message
            # Adjust the timeout in cases where audio files have more than 10 seconds before speech starts, or if the audio is longer than 10 seconds.
            message = await asyncio.wait_for(ws.recv(), timeout=10.0)
            data = json.loads(message)

            if data["message_type"] == "partial_transcript":
                print(f"Partial: {data['text']}")
            elif data["message_type"] == "committed_transcript":
                print(f"Committed: {data['text']}")
            elif data["message_type"] == "committed_transcript_with_timestamps":
                print(f"Committed with timestamps: {data['words']}")
                break
            elif data["message_type"] == "input_error":
                print(f"Error: {data}")
        except asyncio.TimeoutError:
            print("Timeout waiting for transcript")


async def transcribe():
    url = "wss://api.elevenlabs.io/v1/speech-to-text/realtime?model_id=scribe_v2_realtime"
    headers = {"xi-api-key": os.getenv("ELEVENLABS_API_KEY")}

    async with websockets.connect(url, additional_headers=headers) as ws:
        # Connection established, wait for session_started
        session_msg = await ws.recv()
        print(f"Session started: {session_msg}")

        # Read audio file (16 kHz, mono, 16-bit PCM, little-endian)
        with open("/path/to/audio.pcm", "rb") as f:
            audio_data = f.read()

        # Run sending and receiving concurrently
        await asyncio.gather(
            send_audio(ws, audio_data),
            receive_transcripts(ws)
        )


asyncio.run(transcribe())
```

```typescript title="TypeScript WebSocket example"
    // Use this example if you are unable to use the SDK
    import "dotenv/config";
    import * as fs from "node:fs";
    // Make sure to install the "ws" library beforehand
    import WebSocket from "ws";

    const uri = "wss://api.elevenlabs.io/v1/speech-to-text/realtime?model_id=scribe_v2_realtime";
    const websocket = new WebSocket(uri, {
      headers: {
        "xi-api-key": process.env.ELEVENLABS_API_KEY,
      },
    });

    websocket.on("open", async () => {
      console.log("WebSocket opened");
    });

    // Listen to the incoming message from the websocket connection
    websocket.on("message", function incoming(event) {
      const data = JSON.parse(event.toString());

      switch (data.message_type) {
        case "session_started":
          console.log("Session started", data);
          sendAudio();
          break;
        case "partial_transcript":
          console.log("Partial:", data);
          break;
        case "committed_transcript":
          console.log("Committed:", data);
          break;
        // Committed transcripts with word-level timestamps. Only received when "include_timestamps=true" is included in the query parameters
        case "committed_transcript_with_timestamps":
          console.log("Committed with timestamps:", data);
          websocket.close();
          break;
        default:
          console.log(data);
          break;
      }

    });

    async function sendAudio() {
      // 16 kHz, mono, 16-bit PCM, little-endian
      const pcmFilePath = "/path/to/audio.pcm";

      const chunkSize = 32000; // 1 second of 16kHz audio (16000 samples * 2 bytes per sample)

      // Read the entire file into a buffer
      const audioBuffer = fs.readFileSync(pcmFilePath);

      // Split the buffer into chunks of exactly chunkSize bytes
      const chunks: Buffer[] = [];
      for (let i = 0; i < audioBuffer.length; i += chunkSize) {
        const chunk = audioBuffer.subarray(i, i + chunkSize);
        chunks.push(chunk);
      }

      // Send each chunk via websocket payload
      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        const chunkBase64 = chunk.toString("base64");

        websocket.send(JSON.stringify({
          message_type: "input_audio_chunk",
          audio_base_64: chunkBase64,
          commit: false,
          sample_rate: 16000,
        }));

        // Wait 1 second between chunks to simulate real-time streaming
        // (each chunk contains 1 second of audio at 16kHz)
        if (i < chunks.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      // Small delay before final commit to let the last chunk process
      await new Promise(resolve => setTimeout(resolve, 500));

      // send final commit
      websocket.send(JSON.stringify({
        message_type: "input_audio_chunk",
        audio_base_64: "",
        commit: true,
        sample_rate: 16000,
      }));
    }
```

```python
python example.py
```

```typescript
npx tsx example.mts
```

You will see the transcription of the audio file printed to the console in partial and committed transcripts.

## Next steps

Control when transcripts are committed and how to handle partial results.

Full list of events and error types from the realtime STT API.