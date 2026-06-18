# Details: Conversation Relay Insights Events

This page is a reference for all event types emitted by Conversation Relay and available via the [Call Insights Events resource](/docs/voice/voice-insights/api/call/call-events-resource).

All Conversation Relay events include the following base properties:

| **Property**      | **Type** | **Description**                               |
| ----------------- | -------- | --------------------------------------------- |
| `session_id`      | string   | Session ID of the Conversation Relay session. |
| `sequence_number` | integer  | Sequence number of the event.                 |

Events with additional payload properties are documented below. Events not listed in the payload sections are timeline markers only and carry no additional properties beyond the base fields.

## Speech events

| **Event**                  | **Description**                                                            |
| -------------------------- | -------------------------------------------------------------------------- |
| `start_of_customer_speech` | Customer audio detected — beginning of an utterance.                       |
| `end_of_customer_speech`   | Customer stopped speaking; transcription will be sent to your application. |
| `start_of_agent_speech`    | Virtual agent began playing audio to the customer.                         |
| `end_of_agent_speech`      | Virtual agent finished its current response.                               |

## Token events

| **Event**              | **Description**                                                                                |
| ---------------------- | ---------------------------------------------------------------------------------------------- |
| `first_token_received` | First token received from the application via WebSocket. Marks the end of application latency. |
| `final_token_received` | Full text response received from the application.                                              |

### final\_token\_received properties

| **Property**   | **Type** | **Description**                  |
| -------------- | -------- | -------------------------------- |
| `total_tokens` | integer  | Total number of tokens received. |
| `total_words`  | integer  | Total number of words received.  |

## Latency events

| **Event**     | **Description**                                                  |
| ------------- | ---------------------------------------------------------------- |
| `stt_latency` | Time from end of customer utterance to full transcription ready. |
| `tts_latency` | Time from receiving a text sentence to start of audio synthesis. |

Both latency events share the same payload:

| **Property** | **Type** | **Description**          |
| ------------ | -------- | ------------------------ |
| `latency_ms` | integer  | Latency in milliseconds. |

## Interaction events

| **Event**     | **Description**                                                                |
| ------------- | ------------------------------------------------------------------------------ |
| `prompt_sent` | Transcription sent to your WebSocket server.                                   |
| `interrupt`   | One party began speaking while the other was active.                           |
| `preempted`   | New agent response tokens arrived, interrupting current agent speech playback. |
| `dtmf`        | Customer pressed a key on their phone's keypad.                                |
| `digit`       | Application sent digits to navigate an IVR.                                    |

### interrupt properties

| **Property** | **Type** | **Description**                                  |
| ------------ | -------- | ------------------------------------------------ |
| `type`       | string   | Type of interruption. One of `DTMF` or `SPEECH`. |

## Session events

| **Event**          | **Description**                                           |
| ------------------ | --------------------------------------------------------- |
| `configurations`   | Session configuration active at the start of the session. |
| `language_changed` | Active language configuration changed during the session. |
| `call_wrap_up`     | Session has ended and the summary is being finalized.     |

### configurations properties

| **Property**     | **Type** | **Description**                                                                                                                    |
| ---------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `configurations` | object   | Key-value pairs of active configuration settings.                                                                                  |
| `languages`      | object   | Key-value pairs of language configurations, each containing `tts_provider`, `voice`, `transcription_provider`, and `speech_model`. |

### language\_changed properties

| **Property**                  | **Type** | **Description**                   |
| ----------------------------- | -------- | --------------------------------- |
| `tts_language_code`           | string   | Language code for text-to-speech. |
| `transcription_language_code` | string   | Language code for speech-to-text. |

### call\_wrap\_up properties

| **Property**          | **Type** | **Description**                                                                 |
| --------------------- | -------- | ------------------------------------------------------------------------------- |
| `duration_in_seconds` | integer  | Session duration in seconds.                                                    |
| `end_status`          | string   | Final state of the session. One of `unknown`, `failure`, `ended`, or `hung_up`. |

## Media events

| **Event**    | **Description**                                                                 |
| ------------ | ------------------------------------------------------------------------------- |
| `play_media` | Application requested an audio file to be played instead of synthesized speech. |

## Error events

| **Event**     | **Description**                                   |
| ------------- | ------------------------------------------------- |
| `error_event` | Technical failure encountered during the session. |

### error\_event properties

| **Property** | **Type** | **Description** |
| ------------ | -------- | --------------- |
| `error_code` | integer  | Error code.     |
| `message`    | string   | Error message.  |
