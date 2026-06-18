# Media Streams - WebSocket Messages

> \[!NOTE]
>
> You can use [Media Streams][regional-availability] in the Ireland (`IE1`) and Australia (`AU1`) [Regions][twilio-regions]. To set up Media Streams with these regions, follow the guides for non-US [outbound][non-us-outgoing] and [inbound][non-us-incoming] calls. The [default region][default-region] remains `US1`.

[non-us-outgoing]: /docs/global-infrastructure/create-an-outbound-call-via-rest-api-in-a-non-us-twilio-region

[non-us-incoming]: /docs/global-infrastructure/inbound-call-processing

[twilio-regions]: /docs/global-infrastructure/understanding-twilio-regions

[default-region]: /docs/global-infrastructure/understanding-twilio-regions#use-the-default-twilio-region

[regional-availability]: /docs/global-infrastructure/regional-product-and-feature-availability

During a [Media Stream](/docs/voice/media-streams), Twilio sends messages to your WebSocket server that provide information about the Stream. For [bidirectional Media Streams](/docs/voice/media-streams#bidirectional-media-streams), your server can also send messages back to Twilio.

This page covers each type of message that your WebSocket server can send and receive when using Media Streams.

## WebSocket messages from Twilio

Twilio sends the following message types to your WebSocket server during a Stream:

* [Connected](#connected-message)
* [Start](#start-message)
* [Media](#media-message)
* [DTMF](#dtmf-message)
* [Stop](#stop-message)
* [Mark](#mark-message) ([bidirectional Streams](/docs/voice/media-streams#bidirectional-media-streams) only)

### Connected message

Twilio sends the `connected` event once a WebSocket connection is established. This is the first message your WebSocket server receives, and this message describes the protocol to expect in the following messages.

| Property   | Description                                                         |
| :--------- | :------------------------------------------------------------------ |
| `event`    | Describes the type of WebSocket message. In this case, `connected`. |
| `protocol` | Defines the protocol for the WebSocket connection's lifetime.       |
| `version`  | Semantic version of the protocol.                                   |

An example `connected` message is shown below.

```json
{ 
 "event": "connected",
 "protocol": "Call", 
 "version": "1.0.0"
}
```

### Start message

The `start` message contains metadata about the Stream and is sent immediately after the `connected` message. It is only sent once at the start of the Stream.

| Property                       | Description                                                                                                                                    |
| :----------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| `event`                        | Describes the type of WebSocket message. In this case, `start`.                                                                                |
| `sequenceNumber`               | Number used to keep track of message sending order. The first message has a value of  `1` and then is incremented for each subsequent message. |
| `start`                        | An object containing Stream metadata                                                                                                           |
| `start.streamSid`              | The unique identifier of the Stream                                                                                                            |
| `start.accountSid`             | The SID of the Account that created the Stream                                                                                                 |
| `start.callSid`                | The SID of the Call that started the Stream                                                                                                    |
| `start.tracks`                 | An array of strings that indicate which media flows are expected in subsequent messages. Values include `inbound`, `outbound`.                 |
| `start.customParameters`       | An object containing the custom parameters that were set when defining the Stream                                                              |
| `start.mediaFormat`            | An object containing the format of the payload in the `media` messages.                                                                        |
| `start.mediaFormat.encoding`   | The encoding of the data in the upcoming payload. Value is always `audio/x-mulaw`.                                                             |
| `start.mediaFormat.sampleRate` | The sample rate in hertz of the upcoming audio data. Value is always `8000`                                                                    |
| `start.mediaFormat.channels`   | The number of channels in the input audio data. Value is always `1`                                                                            |
| `streamSid`                    | The unique identifier of the Stream                                                                                                            |

The `start.customParameters` object is populated with the values you provided when starting the stream. See the [\<Stream> TwiML doc](/docs/voice/twiml/stream#custom-parameters) or the [Stream resource API reference doc](/docs/voice/api/stream-resource#custom-parameters) for more info.

An example `start` message is shown below.

```json
{
  "event": "start",
  "sequenceNumber": "1",
  "start": {
    "accountSid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "streamSid": "MZXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "callSid": "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "tracks": [ "inbound" ],
    "mediaFormat": { 
        "encoding": "audio/x-mulaw", 
        "sampleRate": 8000, 
        "channels": 1 },
    "customParameters": {
     "FirstName": "Jane",
     "LastName": "Doe",
     "RemoteParty": "Bob"
   }
  },
  "streamSid": "MZXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
}
```

### Media message

This message type encapsulates the raw audio data.

| Property          | Description                                                                                                                                    |
| :---------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| `event`           | Describes the type of WebSocket message. In this case, `"media"`.                                                                              |
| `sequenceNumber`  | Number used to keep track of message sending order. The first message has a value of  `1` and then is incremented for each subsequent message. |
| `media`           | An object containing media metadata and payload                                                                                                |
| `media.track`     | One of `inbound` or `outbound`                                                                                                                 |
| `media.chunk`     | The chunk for the message. The first message will begin with `1` and increment with each subsequent message.                                   |
| `media.timestamp` | Presentation Timestamp in Milliseconds from the start of the stream.                                                                           |
| `media.payload`   | Raw audio encoded in base64                                                                                                                    |
| `streamSid`       | The unique identifier of the Stream                                                                                                            |

An example `outbound` media message is shown below. The `payload` value is abbreviated.

```json
{ 
 "event": "media",
 "sequenceNumber": "3", 
 "media": { 
   "track": "outbound", 
   "chunk": "1", 
   "timestamp": "5",
   "payload": "no+JhoaJjpz..."
 } ,
 "streamSid": "MZXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
}
```

An example `inbound` media message is shown below. The `payload` value is abbreviated.

```json

{ 
 "event": "media",
 "sequenceNumber": "4",
 "media": { 
   "track": "inbound", 
   "chunk": "2", 
   "timestamp": "5",
   "payload": "no+JhoaJjpzS..."
 },
"streamSid": "MZXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" 
}
```

### Stop message

Twilio sends a `stop` message when the Stream has stopped or the call has ended.

For [unidirectional Streams](/docs/voice/media-streams#unidirectional-media-streams), a Stream can be stopped with the `<Stop>` TwiML instruction or by [updating the Stream resource's `status` to `stopped`](/docs/voice/api/stream-resource#update-a-stream-resource).

For [bidirectional Streams](/docs/voice/media-streams#bidirectional-media-streams), the only way to stop a Stream is to end the call.

| Property          | Description                                                                                                                                    |
| :---------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| `event`           | Describes the type of WebSocket message. In this case, `stop`.                                                                                 |
| `sequenceNumber`  | Number used to keep track of message sending order. The first message has a value of  `1` and then is incremented for each subsequent message. |
| `stop`            | An object containing Stream metadata                                                                                                           |
| `stop.accountSid` | The Account identifier that created the Stream                                                                                                 |
| `stop.callSid`    | The Call identifier that started the Stream                                                                                                    |
| `streamSid`       | The unique identifier of the Stream                                                                                                            |

An example `stop` message is shown below.

```json
{ 
 "event": "stop",
 "sequenceNumber": "5",
 "stop": {
    "accountSid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "callSid": "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
  },
  "streamSid": "MZXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" 
}
```

### DTMF message

The `dtmf` message is currently only supported in [bidirectional Streams](/docs/voice/media-streams#bidirectional-media-streams).

A `dtmf` message is sent when someone presses a touch-tone number key in the inbound stream, typically in response to a prompt in the outbound stream.

| Property         | Description                                                                                                                                    |
| :--------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| `event`          | Describes the type of WebSocket message. In this case, `dtmf`.                                                                                 |
| `streamSid`      | The unique identifier of the Stream                                                                                                            |
| `sequenceNumber` | Number used to keep track of message sending order. The first message has a value of  `1` and then is incremented for each subsequent message. |
| `dtmf.track`     | The track on which the DTMF key was pressed. Value is always `inbound_track`                                                                   |
| `dtmf.digit`     | The number-key tone detected.                                                                                                                  |

An example `dtmf` message is shown below. The `dtmf.digit` value is `1`, indicating that someone pressed the `1` key on their handset.

```json

{ 
  "event": "dtmf", 
  "streamSid":"MZXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", 
  "sequenceNumber":"5", 
  "dtmf": { 
      "track":"inbound_track", 
      "digit": "1"
  }
}
```

### Mark message

Twilio sends the `mark` event only during [bidirectional Streams](/docs/voice/media-streams#bidirectional-media-streams).

When your server [sends a media message](#send-a-media-message), it should then [send a mark message](#send-a-mark-message) to Twilio. When that `media` message's playback is complete, Twilio sends a `mark` message to your server using the same `mark.name` as the one your server sent. Your application can use this information to keep track of which media has played on the Call.

If your server sends a [clear message](#send-a-clear-message), Twilio empties the audio buffer and sends back `mark` messages matching any remaining `mark` messages from your server. Your application can use this information to keep track of which `media` messages have been cleared and will not be played.

| Property       | Description                                                                                                                                    |
| :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| event          | Describes the type of WebSocket message. In this case, `"mark"`.                                                                               |
| streamSid      | The unique identifier of the Stream                                                                                                            |
| sequenceNumber | Number used to keep track of message sending order. The first message has a value of  `1` and then is incremented for each subsequent message. |
| mark           | An object containing the mark metadata                                                                                                         |
| mark.name      | A custom value. Twilio sends back the `mark.name` you specify when it receives a `mark` message                                                |

An example `mark` message is shown below.

```json
{ 
 "event": "mark",
 "sequenceNumber": "4",
 "streamSid": "MZXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
 "mark": {
   "name": "my label"
 }
}
```

## Send WebSocket messages to Twilio

If you initiated a Stream using `<Connect><Stream>`, your Stream is [bidirectional](/docs/voice/media-streams#bidirectional-media-streams). This means you can send WebSocket messages back to Twilio, allowing you to pipe audio back into the Call and control the flow of the Stream.

The messages that your WebSocket server can send back to Twilio are:

* [Media](#send-a-media-message)
* [Mark](#send-a-mark-message)
* [Clear](#send-a-clear-message)

### Send a media message

To send media back to Twilio, you must provide a properly formatted `media` message.

The payload must be encoded `audio/x-mulaw` with a sample rate of `8000` and must be base64 encoded. The audio can be of any size.

The media messages are buffered and played in the order received. If you need to interrupt the buffered audio, [send a clear message](#send-a-clear-message).

> \[!WARNING]
>
> The `media.payload` should not contain audio file type header bytes. Providing header bytes causes the media to be streamed incorrectly.

| Property        | Description                                                       |
| :-------------- | :---------------------------------------------------------------- |
| `event`         | Describes the type of WebSocket message. In this case, `"media"`. |
| `streamSid`     | The SID of the Stream that should play the audio                  |
| `media`         | An object containing the media payload                            |
| `media.payload` | Raw `mulaw/8000` audio in encoded in base64                       |

Below is an example `media` message that your WebSocket server sends back to Twilio. The `media.payload` is abbreviated.

```json
{
  "event": "media",
  "streamSid": "MZXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "media": {
    "payload": "a3242sa..."
  }
}
```

### Send a mark message

Send a `mark` event message after sending a [`media` event message](#send-a-media-message) to be notified when the audio that you have sent has been completed. Twilio sends back a `mark` event with a matching `name` when the audio ends (or if there is no audio buffered).

Your application also receives an incoming [`mark` event message](#mark-message) if the buffer was cleared using the [`clear` event message](#send-a-clear-message).

| Property    | Description                                                                                |
| :---------- | :----------------------------------------------------------------------------------------- |
| `event`     | Describes the type of WebSocket message. In this case `"mark"`.                            |
| `streamSid` | The SID of the Stream that should receive the mark                                         |
| `mark`      | An object containing mark metadata and payload                                             |
| `mark.name` | A name specific to your needs that will assist in recognizing future received `mark` event |

Below is an example `mark` message that your WebSocket server sends to Twilio.

```json
{ 
 "event": "mark",
 "streamSid": "MZXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
 "mark": {
   "name": "my label"
 }
}
```

### Send a clear message

Send a `clear` message if you want to interrupt the audio that has been sent in various `media` messages. This empties all buffered audio and causes any `mark` messages to be sent back to your WebSocket server.

| Property    | Description                                                       |
| :---------- | :---------------------------------------------------------------- |
| `event`     | Describes the type of WebSocket message. In this case, `"clear"`. |
| `streamSid` | The SID of the Stream in which you want to interrupt the audio.   |

Below is an example `clear` message that your WebSocket server sends to Twilio.

```json
{ 
 "event": "clear",
 "streamSid": "MZXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
}
```
