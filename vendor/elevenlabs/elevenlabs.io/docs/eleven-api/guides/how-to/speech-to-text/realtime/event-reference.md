> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Realtime event reference

**Reference** · Lists all events sent to and received from the Realtime Speech to Text WebSocket
API.

Review the API reference for the [Realtime Speech to Text API](/docs/api-reference/speech-to-text/v-1-speech-to-text-realtime) for more information on the API and its options.

## Sent events

| Event               | Description                       | When to use                        |
| ------------------- | --------------------------------- | ---------------------------------- |
| `input_audio_chunk` | Send audio data for transcription | Continuously while streaming audio |

## Received events

| Event                                  | Description                                                                              | When received                                                                                                                              |
| -------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `session_started`                      | Confirms connection and returns session configuration                                    | Immediately after WebSocket connection is established                                                                                      |
| `partial_transcript`                   | Live transcript update                                                                   | During audio processing, before a commit is made                                                                                           |
| `committed_transcript`                 | Transcript of the audio segment                                                          | After a commit (either manual or VAD triggered)                                                                                            |
| `committed_transcript_with_timestamps` | Sent after the committed transcript of the audio segment. Contains word-level timestamps | Sent after the committed transcript of the audio segment. Only received when `include_timestamps=true` is included in the query parameters |

## Error handling

If an error occurs, an error message will be returned before the WebSocket connection is closed.

| Error Type                    | Description                                                                                                                          |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `auth_error`                  | An error occurred while authenticating the request. Double check your API key                                                        |
| `quota_exceeded`              | You have exceeded your usage quota                                                                                                   |
| `transcriber_error`           | An error occurred while transcribing the audio.                                                                                      |
| `input_error`                 | An error occurred while processing the audio chunk. Likely due to invalid input format or parameters                                 |
| `error`                       | A generic server error                                                                                                               |
| `commit_throttled`            | The commit was throttled due to too many commit requests made in a short period of time                                              |
| `transcriber_error`           | An error occurred while transcribing the audio.                                                                                      |
| `unaccepted_terms`            | You haven't accepted the terms of service to use Scribe. Please review and accept the terms & conditions in the ElevenLabs dashboard |
| `rate_limited`                | You are rate limited. Please reduce the amount of requests made in a short period of time                                            |
| `queue_overflow`              | The processing queue is full. Please send fewer requests made in a short period of time                                              |
| `resource_exhausted`          | Server resources are at capacity. Please try again later                                                                             |
| `session_time_limit_exceeded` | Maximum session time has been reached. Please start a new session or upgrade your subscription                                       |
| `chunk_size_exceeded`         | The audio chunk size is too large. Please reduce the chunk size                                                                      |
| `insufficient_audio_activity` | You haven't sent enough audio activity to maintain the connection                                                                    |