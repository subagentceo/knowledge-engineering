# Real-time Transcriptions for Video

> \[!WARNING]
>
> Real-time Transcriptions uses artificial intelligence or machine learning technologies. If you enable or use any of the features or functionalities within Twilio Video that Twilio identifies as using artificial intelligence or machine learning technology, you acknowledge and agree that your use of these features or functionalities is subject to the terms of the [Predictive and Generative AI/ML Features Addendum][].

Real-time Transcriptions converts speech from any participant in a Video Room into text and sends that text to the Video Client SDKs (JavaScript, iOS, and Android). Your application can render the text in any style and format. Twilio supports multiple speech models from which you can choose the model that best fits your use case.

Your app can implement transcriptions in two ways:

* Start when your app creates a Video Room.
* Start, stop, or restart on demand while the Room is active.

You turn on Real-time Transcriptions at the Video Room level, so every participant's speech gets transcribed. You configure the spoken language and speech model, and the settings remain in effect until the Room ends.

While active, Twilio delivers the transcribed text, along with the Participant `SID`, to every participant in the Room.

If you turn on partial results, the transcription engine delivers interim results so that your app can refresh its interface in near real-time.

You can also set a default configuration in the Twilio Console.

## REST APIs

### Transcriptions subresource

Transcriptions exists as a subresource of the Room resource that represents a Room's transcript.

```text {title="Transcriptions resource URI"}
/v1/Rooms/{RoomNameOrSid}/Transcriptions/{TranscriptionTtid}
```

| Property        | Type                 | Description                                                                                                                                                                                                                 |
| --------------- | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ttid`          | `ttid`               | The Twilio Type ID of the Transcriptions resource. It is assigned at creation time using the following format: `video_transcriptions_{uuidv7-special-encoded}`.                                                             |
| `room_sid`      | `SID<RM>`            | The ID of the room instance parent to the Transcriptions resource.                                                                                                                                                          |
| `account_sid`   | `SID<AC>`            | The account ID that owns the Transcriptions resource.                                                                                                                                                                       |
| `status`        | `enum<string>`       | The status of the Transcriptions resource. It can be: `started`, `stopped` or `failed`. The resource is created with status `started` by default.                                                                           |
| `configuration` | `object<string-map>` | Key-value map with configuration parameters applied to audio tracks transcriptions. To review the list of properties, see the [Parameters for the configuration object][config-params] section.                             |
| `date_created`  | `string<date-time>`  | The date and time in UTC when the resource was created, specified in ISO 8601 format.                                                                                                                                       |
| `date_updated`  | `string<date-time>`  | The date and time in UTC when the resource was last updated, specified in ISO 8601 format. Null if the resource hasn't been updated since creation.                                                                         |
| `start_time`    | `string<date-time>`  | The date and time in UTC when the resource was in state `started` and the first participant joined the Room, specified in ISO 8601 format.                                                                                  |
| `end_time`      | `string<date-time>`  | The date and time in UTC when transcription processing has paused in the Room, specified in ISO 8601 format. This happens when the resource is set to `stopped` or the last participant has left the Room.                  |
| `duration`      | `integer`            | The cumulative time in seconds that the transcripion resource has been in state `started` and at least one participant is in the Room. This is independent of whether audio tracks are published or audio tracks are muted. |
| `url`           | `string<uri>`        | The absolute URL of the resource.                                                                                                                                                                                           |

If Twilio detects an internal error that prevents generation of transcriptions, the Transcriptions resource changes its status to `failed`. The Twilio Console receives a debug event with the details of the failure. Once it detects a failure, you can't restart that resource.

### Properties for the configuration object

| Name                         | Type    | Necessity | Default       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ---------------------------- | ------- | --------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `transcriptionEngine`        | string  | Optional  | `"google"`    | The supported transcription engine Twilio uses. To learn about the possible values, see the [transcription engine table][transcript-speech].                                                                                                                                                                                                                                                                                                                    |
| `speechModel`                | string  | Optional  | `"telephony"` | The provider-supported recognition model that the transcription engine uses. To learn about the possible values, see the [speech model table][transcript-speech].                                                                                                                                                                                                                                                                                               |
| `languageCode`               | string  | Optional  | `"en-US"`     | The language code that the transcription engine uses, specified in BCP-47 format. This attribute ensures that the transcription engine understands and processes the spoken language.                                                                                                                                                                                                                                                                           |
| `partialResults`             | Boolean | Optional  | `false`       | Indicates whether to send partial results. When `true`, the transcription engine sends interim results as the transcription progresses, providing more immediate feedback before the final result could display.                                                                                                                                                                                                                                                |
| `profanityFilter`            | Boolean | Optional  | `true`        | Indicates if the server tries to filter profanities. This replaces all but the initial character in each filtered word with asterisks. Google provides this [feature][].                                                                                                                                                                                                                                                                                        |
| `hints`                      | string  | Optional  | None          | A list of words or phrases that the transcription provider can expect to encounter during a transcription. Using the `hints` attribute can improve the transcription provider's recognition of words or phrases that are expected during the video call. Up to 500 words or phrases can be provided in the list of hints, each entry separated with a comma. Each word or phrase may be up to 100 characters each. Separate each word in a phrase with a space. |
| `enableAutomaticPunctuation` | Boolean | Optional  | `true`        | The provider adds punctuation to the transcribed text. Default is `true`. When enabled, the transcription engine inserts punctuation marks such as periods, commas, and question marks, improving the readability of the transcribed text.                                                                                                                                                                                                                      |

### Transcription engines and speech models

The following table lists the possible values for the `transcriptionEngine` and the associated `speechModel` properties.

| Transcription engine | Speech model               | Use case                                                                                                                                 | Example                                                     |
| -------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `deepgram`           | [`nova-3`][]               | Recommended for meetings, captioning, noisy, or far-field audio.                                                                         |                                                             |
| `deepgram`           | [`nova-3-medical`][]       | Recommended for healthcare conversations.                                                                                                |                                                             |
| `deepgram`           | [`nova-2`][]               | Recommended with languages that `nova-3` doesn't support.                                                                                |                                                             |
| `google`             | [`telephony`][]            | Use this model for telephone call audio.                                                                                                 |                                                             |
| `google`             | [`medical_conversation`][] | Use this model for conversations between a medical provider and a patient.                                                               |                                                             |
| `google`             | [`long`][]                 | Use this model for any type of long-form content.                                                                                        | Media, spontaneous speech, and conversations                |
| `google`             | [`short`][]                | Use this model for short utterances that are a few seconds in length. Consider using this model instead of the command and search model. | Commands or other single, short, directed speech            |
| `google`             | [`telephony_short`][]      | Use this model for short or even single-word utterances for audio that originated from a phone call.                                     | Customer service, teleconferencing, and kiosk applications. |
| `google`             | [`medical_dictation`][]    | Use this model to transcribe notes dictated by a medical professional.                                                                   |                                                             |
| `google`             | [`chirp_telephony`][]      | Use this model for telephone call audio with multiple languages. It uses the Google Universal large Speech Model (USM).                  |                                                             |
| `google`             | [`chirp`][]                | Use this model for content for audio in multiple languages. It uses the Google Universal large Speech Model (USM).                       |                                                             |

> \[!NOTE]
>
> * The `google` transcription engine corresponds to the Google Speech-to-Text V2 API.
> * Speech models support a limited range of languages. For valid combinations, see the following provider documentation:
>   * [Google Speech-to-Text V2 supported languages][]
>   * [Deepgram supported languages][]

### Create a Room with transcriptions enabled

To create a Video Room with Real-time Transcriptions enabled, add the following two parameters to the [Room `POST`][] request:

| Parameter                         | Type    | Description                                                                                                                   |
| --------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `TranscribeParticipantsOnConnect` | Boolean | Whether to start real-time transcriptions when `Participants` connect. Default is `false`.                                    |
| `TranscriptionsConfiguration`     | object  | Key-value configuration settings for the transcription engine. To learn more, see [Transcription configuration properties][]. |

To turn on transcriptions for the Video Room, set the `TranscribeParticipantsOnConnect` parameter to `true`.

```bash {title="Create a Room with transcriptions enabled example request"}
curl -X POST "https://video.twilio.com/v1/Rooms" \
     -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN \
     --data-urlencode 'TranscriptionsConfiguration={"languageCode": "EN-us", "partialResults": true}' \
     --data-urlencode "TranscribeParticipantsOnConnect=true" \
```

```json {title="Create a Room with transcriptions enabled example response"}
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "audio_only": false,
  "date_created": "2025-06-12T15:42:32Z",
  "date_updated": "2025-06-12T15:42:32Z",
  "duration": null,
  "empty_room_timeout": 5,
  "enable_turn": true,
  "end_time": null,
  "large_room": false,
  "links": {
    "participants": "https://video.twilio.com/v1/Rooms/RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Participants",
    "recording_rules": "https://video.twilio.com/v1/Rooms/RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/RecordingRules",
    "recordings": "https://video.twilio.com/v1/Rooms/RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Recordings",
    "transcriptions": "https://video.twilio.com/v1/Rooms/RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Transcriptions"
  },
  "max_concurrent_published_tracks": 170,
  "max_participant_duration": 14400,
  "max_participants": 50,
  "media_region": "us1",
  "record_participants_on_connect": false,
  "sid": "RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "status": "in-progress",
  "status_callback": null,
  "status_callback_method": "POST",
  "type": "group",
  "unique_name": "test",
  "unused_room_timeout": 5,
  "url": "https://video.twilio.com/v1/Rooms/RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "video_codecs": [
    "VP8",
    "H264"
  ]
}
```

### Start transcriptions on an existing Room

To create a Transcription, send a `POST` request to the following URI:

```text {title="Create Transcriptions resource URI"}
/v1/Rooms/{RoomNameOrSid}/Transcriptions
```

#### Path parameters

| Parameter | Type      | Description                                                              |
| --------- | --------- | ------------------------------------------------------------------------ |
| `RoomSid` | `SID<RM>` | The ID of the parent room where you created the Transcriptions resource. |

#### Request body parameters

| Parameter       | Type                 | Description                                            |
| --------------- | -------------------- | ------------------------------------------------------ |
| `Configuration` | `object<string-map>` | Object with key-value [configurations][config-params]. |

```bash {title="Start a Transcriptions for an existing Room example request"}
curl -X POST "https://video.twilio.com/v1/Rooms/RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Transcriptions" \
     -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN \
     --data-urlencode 'Configuration={"languageCode": "EN-us", "partialResults": true, "profanityFilter": true, "speechModel": "long"}'
```

```json {title="Start a Transcriptions for an existing Room example response"}
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "configuration": {
    "languageCode": "EN-us",
    "partialResults": "true",
    "profanityFilter": "true",
    "speechModel": "long"
  },
  "date_created": "2025-07-22T14:14:35Z",
  "date_updated": null,
  "duration": null,
  "end_time": null,
  "room_sid": "RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "start_time": null,
  "status": "started",
  "ttid": "video_extension_XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
  "url": "https://video.twilio.com/v1/Rooms/RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Transcriptions/video_extension_XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
}
```

### Update transcription configuration

To update the configuration of an existing Transcriptions resource, send a `POST` request to the following resource instance URI:

```text {title="Update Transcriptions resource URI"}
/v1/Rooms/{RoomSid}/Transcriptions/{ttid}
```

#### Path parameters

| Parameter | Type      | Description                                                             |
| --------- | --------- | ----------------------------------------------------------------------- |
| `ttid`    | `ttid`    | The TTID of the Transcriptions resource being updated.                  |
| `RoomSid` | `SID<RM>` | The ID of the parent room where you update the Transcriptions resource. |

#### Request body parameters

| Parameter       | Type                 | Description                                            |
| --------------- | -------------------- | ------------------------------------------------------ |
| `Configuration` | `object<string-map>` | Object with key-value [configurations][config-params]. |

```bash {title="Update transcription configuration example request"}
curl -X POST "https://video.twilio.com/v1/Rooms/RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Transcriptions/video_extension_XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX" \
     -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN \
     -d 'Configuration={"languageCode": "nl-BE"}'
```

```json {title="Update transcription configuration example response"}
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "configuration": {
    "languageCode": "nl-BE",
    "partialResults": "true"
  },
  "date_created": "2025-07-22T14:14:35Z",
  "date_updated": "2025-07-22T14:20:10Z",
  "duration": null,
  "end_time": null,
  "room_sid": "RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "start_time": null,
  "status": "started",
  "ttid": "video_extension_XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
  "url": "https://video.twilio.com/v1/Rooms/RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Transcriptions/video_extension_XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
}
```

Changing the configuration of the Transcriptions resource doesn't cause a state transition. The `status` property remains unchanged, and the transcription engine applies the new configuration settings over the existing configuration.

### Handle multiple languages in a Video Room

By default, the transcription engine processes audio in a single language, which is the language you select when you start transcriptions in the Video Room. To handle multiple languages in a single Room, use one of the following approaches:

1. Send a `POST` request to the Transcriptions subresource to change the `languageCode` configuration when you expect participants to speak a different language. This approach lets you change the transcription language dynamically, but requires you to predict when participants will speak a different language and make the API call at that moment.
2. Use the Deepgram `nova-3` transcription engine, which supports automatic language detection. Specify `multi` as the `languageCode`, and the engine detects the spoken language automatically. For a list of detectable languages, see the [Deepgram supported languages][] documentation.

### Stop transcription on a Room

To stop a Transcriptions resource, send a `POST` request to the following resource instance URI:

```text {title="Stop Transcriptions resource URI"}
/v1/Rooms/{RoomSid}/Transcriptions/{ttid}
```

To stop transcriptions on a Room, set the `Status` parameter to `stopped`.

#### Path parameters

| Parameter | Type      | Description                                                              |
| --------- | --------- | ------------------------------------------------------------------------ |
| `ttid`    | `ttid`    | A single TTID of the Transcriptions resource being updated.              |
| `RoomSid` | `SID<RM>` | The ID of the parent room where you updated the Transcriptions resource. |

#### Request body parameters

| Parameter | Type           | Description                                                                                                                                                                                      |
| --------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Status`  | `enum<string>` | New status of the Transcriptions resource. Can be: `started`, `stopped`. There is no state transition if the resource property status already has the same value or if the parameter is missing. |

```bash {title="Stop a Transcription in an existing Room example request"}
curl -X POST "https://video.twilio.com/v1/Rooms/RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Transcriptions/video_extension_XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX" \
     -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN \
     --data-urlencode "Status=stopped"
```

```json {title="Stop a Transcription in an existing Room example response"}
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "configuration": {
    "languageCode": "EN-us",
    "partialResults": "true"
  },
  "date_created": "2025-07-22T12:55:30Z",
  "date_updated": "2025-07-22T12:56:02Z",
  "duration": null,
  "end_time": null,
  "room_sid": "RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "start_time": null,
  "status": "stopped",
  "ttid": "video_extension_XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
  "url": "https://video.twilio.com/v1/Rooms/RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Transcriptions/video_extension_XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
}
```

### Restart Transcriptions on a Room

To restart a `stopped` Transcriptions resource in a Room, send a `POST` request to the following resource instance URI:

```text {title="Restart Transcriptions resource URI"}
/v1/Rooms/{RoomSid}/Transcriptions/{ttid}
```

To restart transcription, set the `Status` to `started`.

#### Path parameters

| Parameter | Type      | Description                                                                                                                                                               |
| --------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ttid`    | `ttid`    | The TTID of the Transcriptions resource being updated. Current implementation supports a single Transcriptions resource, but this might change in future implementations. |
| `RoomSid` | `SID<RM>` | The ID of the parent room where the Transcriptions resource is updated.                                                                                                   |

#### Request body parameters

| Parameter | Type           | Description                                                                                                                                                        |
| --------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Status`  | `enum<string>` | The status of the Transcriptions resource. To restart transcriptions, set to `started`. If this parameter has the same or no value, the state makes no transition. |

```bash {title="Restart transcription example request"}
curl -X POST "https://video.twilio.com/v1/Rooms/RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Transcriptions/video_extension_XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX" \
     -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN \
     --data-urlencode "Status=started"
```

```json {title="Restart transcription example response"}
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "configuration": {
    "languageCode": "EN-us",
    "partialResults": "true"
  },
  "date_created": "2025-07-22T12:57:24Z",
  "date_updated": null,
  "duration": null,
  "end_time": null,
  "room_sid": "RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "start_time": null,
  "status": "started",
  "ttid": "video_extension_XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
  "url": "https://video.twilio.com/v1/Rooms/RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Transcriptions/video_extension_XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
}
```

### Fetch a list of the Transcriptions resources for a Room

To fetch a list of Transcriptions resources in a Room, send a `GET` request to the following resource instance URI:

```text {title="Fetch a list of Transcriptions resource URI"}
/v1/Rooms/{RoomSid}/Transcriptions
```

Real-time Transcriptions supports only a single instance of the Transcriptions resource per Room, so the list only has a single item.

#### Path parameters

| Parameter | Type      | Description                                                      |
| --------- | --------- | ---------------------------------------------------------------- |
| `RoomSid` | `SID<RM>` | The ID of the parent room that has the Transcriptions resources. |

```bash {title="Retrieve a transcription example request"}
curl -X GET "https://video.twilio.com/v1/Rooms/RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Transcriptions" \
     -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json {title="Retrieve a transcription example response"}
{
  "meta": {
    "first_page_url": "https://video.twilio.com/v1/Rooms/RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Transcriptions?PageSize=50&Page=0",
    "key": "transcriptions",
    "next_page_url": null,
    "page": 0,
    "page_size": 50,
    "previous_page_url": null,
    "url": "https://video.twilio.com/v1/Rooms/RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Transcriptions?PageSize=50&Page=0"
  },
  "transcriptions": [
    {
      "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "configuration": {},
      "date_created": "2025-07-22T11:05:41Z",
      "date_updated": null,
      "duration": null,
      "end_time": null,
      "room_sid": "RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "start_time": null,
      "status": "started",
      "ttid": "video_extension_XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
      "url": "https://video.twilio.com/v1/Rooms/RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Transcriptions/video_extension_XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
    }
  ]
}
```

### Fetch a single Transcriptions resource

To fetch a Transcriptions resource in a Room, send a `GET` request to the following resource instance URI:

```text {title="Fetch one specific Transcriptions resource URI"}
/v1/Rooms/{RoomSid}/Transcriptions/{ttid}
```

#### Path parameters

| Parameter | Type      | Description                                                            |
| --------- | --------- | ---------------------------------------------------------------------- |
| `ttid`    | `ttid`    | The TTID of the Transcriptions resource being requested.               |
| `RoomSid` | `SID<RM>` | The ID of the parent room where you fetch the Transcriptions resource. |

```bash {title="Fetch one transcription example request"}
curl -X https://video.twilio.com/v1/Rooms/{room_sid}/Transcriptions/video_extension_XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX \
     -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json {title="Fetch one transcription example response"}
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "configuration": {
    "LanguageCode": "EN-us",
    "ProfanityFilter": "true"
  },
  "date_created": null,
  "date_updated": null,
  "duration": null,
  "end_time": null,
  "links": {
    "transcriptions": "https://video.twilio.com/v1/Rooms/RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Transcriptions/video_extension_XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
  },
  "room_sid": "RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "start_time": null,
  "status": "created",
  "ttid": "video_extension_XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
}
```

## Transcribed text delivery

Twilio delivers transcribed text to the client SDKs through callback events.

### JSON schema

The schema of the JSON delivery format contains a version number. Each event contains the transcription of a single utterance and details of the participant who generated the audio.

```json
properties:
  type:
    const: extension_transcriptions

  version:
    description: |
      Version of the transcriptions protocol used by this message. It is semver compliant

  track:
    $ref: /Server/State/RemoteTrack
    description: |
      Audio track from where the transcription has been generated.

  participant:
    $ref: /Server/State/Participant
    description: |
      The participant who published the audio track from where the
      transcription has been generated.

  sequence_number:
    type: integer
    description: |
      Sequence number. Starts with one and increments monotonically. A sequence
      counter is defined for each track to allow the receiver to identify
      missing messages.

  timestamp:
    type: string
    description: |
      Absolute time from the real-time-transcription. It is
      conformant with UTC ISO 8601.

  partial_results:
    type: boolean
    description: |
      Whether the transcription is a final or a partial result.

  stability:
    type: double
    description: |
       Indicates how likely it is that this partial result transcript won't be updated again. The range is from `0.0` (unstable) to `1.0` (stable). This field is only provided when `partialResults` is `true`.

  language_code:
    type: string
    description: |
      Language code of the transcribed text. It is conformant with BCP-47.

  transcription:
    type: string
    description: |
      Utterance transcription
```

```json {title="Transcription example response"}
{
  "version": "1.0",
  "language_code": "en-US",
  "partial_results": false,
  "participant": "PA00000000000000000000000000000000",
  "sequence_number": 3,
  "timestamp": "2025-01-01T12:00:00.000000000Z",
  "track": "MT00000000000000000000000000000000",
  "transcription": "This is a test",
  "type": "extension_transcriptions"
}
```

### Partial results and stability

When you set `partialResults` parameter to `true`, the transcription engine provides a series of partial results as it determines the text corresponding to the spoken utterance.

The `stability` property indicates the probability that the partial result provided changes before the delivery of the final result. This value ranges from `0.0` (unstable) to `1.0` (stable). In general, consider partial results with `stability` less than `0.9` as preliminary and temporary. When building an app element to display the transcribed text as captions or subtitles, filter out partial results with a `stability` value less than `0.9`. This avoids text flickering as the app receives partial results.

### JavaScript SDK

#### Start and stop transcript events with the JavaScript SDK

To turn on the flow of transcript events, set the `receiveTranscriptions` parameter in `connectOptions` to `true`. This parameter defaults to `false`. With Real-time Transcriptions enabled for the Room and `receiveTranscriptions` set to `true`, callback events containing the transcribed text start to flow.

```javascript {title="JavaScript transcription event example"}
import { connect } from 'twilio-video';

const room = await connect(token, {
  name: 'my-room',
  receiveTranscriptions: true
});

room.on('transcription', (transcriptionEvent) => {
  console.log(`${transcriptionEvent.participant}: ${transcriptionEvent.transcription}`);
});
```

### iOS SDK

#### Start and stop transcript events with the iOS SDK

To receive transcription events, set the `receiveTranscriptions` parameter in `TVIConnectOptions` to `true`. This parameter defaults to `false`. To fetch this value, use the `isReceiveTranscriptionsEnabled` getter.

With Real-time Transcriptions enabled for the Room and `receiveTranscriptions` set to `true`, the `transcriptionReceived(room:transcription:)` method in the RoomDelegate protocol delivers callback events containing the transcribed text.

```swift {title="Swift transcription event example"}
let options = ConnectOptions(token: accessToken, block: { (builder) in
    builder.roomName = "test"
    builder.isReceiveTranscriptionsEnabled = true
})
```

### Android SDK

#### Start and stop transcript events with the Android SDK

To receive transcription events, set the `receiveTranscriptions` parameter in `ConnectOptions` to `true`. This parameter defaults to `false`. To check the setting, call `isReceiveTranscriptionsEnabled()`.

With Real-time Transcriptions enabled for the Room and `ConnectOptions` set to `true`, the `onTranscription(@NonNull Room room, @NonNull JSONObject json)` method of the `Room.Listener` interface delivers callback events containing the transcribed text.

```java {title="Java transcription event example"}
ConnectOptions connectOptions = new ConnectOptions.Builder(accessToken)
        .receiveTranscriptions(true)
        .build();

Video.connect(context, connectOptions, roomListener);
```

## Twilio Console configuration

To enable and configure Real-time Transcriptions in the Twilio Console, complete the following steps.

1. Log in to the Twilio Console.
2. Go to **Video** > **Manage** > [**Room Settings**][room-page].
3. Scroll to **Realtime Transcriptions**.
4. Click **Accept** for the [Predictive and Generative AI/ML Features Addendum][].
5. Click **Enabled** for the **Automatically turn on Realtime Transcriptions by default in Rooms**.
6. Click **Save**.

## AI nutrition facts

> \[!NOTE]
>
> Real-time Transcriptions for Video uses third-party artificial technology and machine learning technologies.
>
> To improve your understanding how AI handles your data, [Twilio's AI Nutrition Facts][twilio-ai-facts] provide an overview of the AI feature you're using. The following **Speech to Text Transcriptions—Nutrition Facts** label outlines the AI qualities of Real-time Transcriptions for Video.

```json
{"name":"Speech to Text Transcriptions - Programmable Voice, Twilio Video, and Conversation Intelligence (classic)","description":"Generate speech to text voice transcriptions (real-time and post-call) in Programmable Voice, Twilio Video, and Conversation Intelligence (classic).","modelType":"Generative and Predictive - Automatic Speech Recognition","optional":true,"baseModel":"Deepgram Speech-to-Text, Google Speech-to-Text, Amazon Transcribe","aiPrivacyLevel":null,"trustLayer":{"baseModelCustomerData":{"value":false,"comments":["Conversation Intelligence (classic), Programmable Voice, and Twilio Video only use the default Base Model provided by the Model Vendor. The Base Model is not trained using customer data."]},"vendorModelCustomerData":{"value":false,"comments":["Conversation Intelligence (classic), Programmable Voice, and Twilio Video only use the default Base Model provided by the Model Vendor. The Base Model is not trained using customer data."]},"trainingDataAnonymized":{"value":null,"comments":["Base Model is not trained using any customer data."]},"dataDeletion":{"value":true,"comments":["Transcriptions are deleted by the customer using the Conversation Intelligence (classic) API or when a customer account is deprovisioned."]},"auditing":{"value":true,"comments":["The customer views output in the Conversation Intelligence (classic) API or Transcript Viewer."]},"dataStorage":"Until the customer deletes","compliance":{"loggingAndAuditTrails":{"value":true,"comments":["The customer can listen to the input (recording) and view the output (transcript)."]},"guardrails":{"value":true,"comments":["The customer can listen to the input (recording) and view the output (transcript). "]}},"inputOutputConsistency":{"value":true,"comments":["The customer is responsible for human review."]}},"linksAndResources":"https://www.twilio.com/docs/conversation-intelligence-classic"}
```

## Known issues

* To use the Google `medical_conversation` model, set `enableAutomaticPunctuation` to `true`.

[`chirp_telephony`]: https://cloud.google.com/speech-to-text/v2/docs/transcription-model

[`chirp`]: https://cloud.google.com/speech-to-text/v2/docs/transcription-model

[`long`]: https://cloud.google.com/speech-to-text/v2/docs/transcription-model

[`medical_conversation`]: https://cloud.google.com/speech-to-text/v2/docs/transcription-model

[`medical_dictation`]: https://cloud.google.com/speech-to-text/v2/docs/transcription-model

[`nova-2`]: https://developers.deepgram.com/docs/models-languages-overview

[`nova-3`]: https://developers.deepgram.com/docs/models-languages-overview

[`nova-3-medical`]: https://developers.deepgram.com/docs/models-languages-overview

[`short`]: https://cloud.google.com/speech-to-text/v2/docs/transcription-model

[`telephony_short`]: https://cloud.google.com/speech-to-text/v2/docs/transcription-model

[`telephony`]: https://cloud.google.com/speech-to-text/v2/docs/transcription-model

[Deepgram supported languages]: https://developers.deepgram.com/docs/models-languages-overview

[feature]: https://cloud.google.com/speech-to-text/v2/docs/profanity-filter

[Google Speech-to-Text V2 supported languages]: https://cloud.google.com/speech-to-text/v2/docs/speech-to-text-supported-languages

[Predictive and Generative AI/ML Features Addendum]: https://www.twilio.com/en-us/legal/ai-terms/predictive-generative-ai-features

[Room `POST`]: https://www.twilio.com/docs/video/api/rooms-resource#post-parameters

[room-page]: https://console.twilio.com/us1/develop/video/manage/room-settings

[Transcription configuration properties]: #transcription-configuration-properties

[twilio-ai-facts]: https://nutrition-facts.ai/

[config-params]: #parameters-for-the-configuration-object

[transcript-speech]: #transcription-engines-and-speech-models
