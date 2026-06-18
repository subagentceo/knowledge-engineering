# TwiML™ Voice: \<Transcription>

> \[!IMPORTANT]
>
> Real-Time Transcriptions, including the `<Transcriptions>` TwiML noun and API, use artificial intelligence or machine learning technologies. By enabling or using any of the features or functionalities within Programmable Voice that are identified as using artificial intelligence or machine learning technology, you acknowledge and agree that your use of these features or functionalities is subject to the terms of the [Predictive and Generative AI/ML Features Addendum](https://www.twilio.com/en-us/legal/ai-terms/predictive-generative-ai-features).

The `<Transcription>` TwiML noun allows you to transcribe live calls in near real-time. It is used in conjunction with `<Start>`. When Twilio executes the `<Start><Transcription>` instruction during a call, it forks the raw audio stream to a speech-to-text transcription engine that can provide streaming responses almost instantly.

This page covers `<Transcription>`'s supported attributes and provides sample code.

> \[!NOTE]
>
> The `<Transcription>` TwiML noun is associated with Twilio's Real-Time Transcriptions product. It is not to be confused with [Recording Transcriptions](/docs/voice/api/recording-transcription).
>
> Consumers of `<Transcription>` should leverage the [`statusCallbackUrl`](#statuscallbackurl) webhook for **live processing** of conversation utterances in your application.
>
> Real-Time Transcription **persistence** and **post-call language intelligence** support comes from integration with [Conversation Intelligence (classic)](/docs/conversation-intelligence-classic). To store your transcripts with Twilio or run Language Operators after the call, add the [`intelligenceService`](#intelligenceservice) attribute when starting a Real-Time Transcription session. Note: When using either Deepgram or Google as the `transcriptionEngine` value, Twilio supports persisted transcripts.

Below is a basic example of `<Start><Transcription>`:

```xml
<Start>
  <Transcription statusCallbackUrl="https://example.com/your-callback-url"/> 
</Start>
```

## Noun attributes

The table below lists `<Transcription>`'s supported attributes, which modify the `<Transcription>` behavior. All attributes are optional.

| Attribute Name                                            | Allowed Values                                                                                                                                                                                                                                  | Default Value |
| :-------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| [name](#name)                                             | Unique name for the Real-Time Transcription                                                                                                                                                                                                     | None          |
| [statusCallbackUrl](#statuscallbackurl)                   | An absolute URL                                                                                                                                                                                                                                 | None          |
| [languageCode](#languagecode)                             | A [standard code that identifies human languages](https://cloud.google.com/speech-to-text/v2/docs/speech-to-text-supported-languages).                                                                                                          | `en-US`       |
| [track](#track)                                           | `inbound_track`, `outbound_track`, `both_tracks`                                                                                                                                                                                                | `both_tracks` |
| [inboundTrackLabel](#inboundtracklabel)                   | An alphanumeric label to associate to the inbound track being transcribed                                                                                                                                                                       | None          |
| [outboundTrackLabel](#outboundtracklabel)                 | An alphanumeric label to associate to the outbound track being transcribed                                                                                                                                                                      | None          |
| [transcriptionEngine](#transcriptionengine)               | Name of the speech-to-text transcription provider. e.g. `google` or `deepgram`                                                                                                                                                                  | `google`      |
| [speechModel](#speechmodel)                               | Any speechModel value at the [list of Twilio supported Google STTv2 speech models](/docs/voice/twiml/gather#specific-speech-to-text-models) (except Chirp2 models and languages supported only by Chirp2; or `nova-2` or 'nova-3' for Deepgram) | `telephony`   |
| [enableProviderData](#enableproviderdata)                 | ` true` or ` false`                                                                                                                                                                                                                             | `false`       |
| [profanityFilter](#profanityfilter)                       | ` true` or `false`                                                                                                                                                                                                                              | `true`        |
| [partialResults](#partialresults)                         | ` true` or `false`                                                                                                                                                                                                                              | `false`       |
| [hints](#hints)                                           | Comma-separated list of expected phrases or keywords for recognition                                                                                                                                                                            | None          |
| [enableAutomaticPunctuation](#enableautomaticpunctuation) | ` true` or `false`                                                                                                                                                                                                                              | `true`        |
| [intelligenceService](#intelligenceservice)               | The [Intelligence Service](/docs/conversation-intelligence-classic/api/service-resource) SID or unique name for persisting transcripts and running Language Operators                                                                           | None          |
| [conversationConfiguration](#conversationconfiguration)   | A [Conversation Orchestrator](/docs/conversations/orchestrator) configuration ID                                                                                                                                                                | None          |
| [conversationId](#conversationid)                         | A [Conversation Orchestrator](/docs/conversations/orchestrator) conversation ID                                                                                                                                                                 | None          |

### name

The user-specified name of this Real-Time Transcription. This name can be used to stop the Real-Time Transcription.

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const start = response.start();
start.transcription({
  statusCallbackUrl: 'https://example.com/your-callback-url',
  name: 'Contact center transcription',
});

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import VoiceResponse, Start, Transcription

response = VoiceResponse()
start = Start()
start.transcription(
    status_callback_url='https://example.com/your-callback-url',
    name='Contact center transcription')
response.append(start)

print(response)
```

```cs
using System;
using Twilio.TwiML;
using Twilio.TwiML.Voice;


class Example
{
    static void Main()
    {
        var response = new VoiceResponse();
        var start = new Start();
        start.Transcription(statusCallbackUrl: "https://example.com/your-callback-url", name: "Contact center transcription");
        response.Append(start);

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.voice.Start;
import com.twilio.twiml.voice.Transcription;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Transcription transcription = new Transcription.Builder().statusCallbackUrl("https://example.com/your-callback-url").name("Contact center transcription").build();
        Start start = new Start.Builder().transcription(transcription).build();
        VoiceResponse response = new VoiceResponse.Builder().start(start).build();

        try {
            System.out.println(response.toXml());
        } catch (TwiMLException e) {
            e.printStackTrace();
        }
    }
}
```

```go
package main

import (
	"fmt"

	"github.com/twilio/twilio-go/twiml"
)

func main() {
	twiml, _ := twiml.Voice([]twiml.Element{
		&twiml.VoiceStart{
			InnerElements: []twiml.Element{
				&twiml.VoiceTranscription{
					Name:              "Contact center transcription",
					StatusCallbackUrl: "https://example.com/your-callback-url",
				},
			},
		},
	})

	fmt.Print(twiml)
}
```

```php
<?php
require_once './vendor/autoload.php';
use Twilio\TwiML\VoiceResponse;

$response = new VoiceResponse();
$start = $response->start();
$start->transcription(['statusCallbackUrl' => 'https://example.com/your-callback-url', 'name' => 'Contact center transcription']);

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.start do |start|
    start.transcription(status_callback_url: 'https://example.com/your-callback-url', name: 'Contact center transcription')
end

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Start>
        <Transcription statusCallbackUrl="https://example.com/your-callback-url" name="Contact center transcription" />
    </Start>
</Response>
```

### statusCallbackUrl

The `statusCallbackUrl` attribute is the absolute URL of an endpoint. Twilio sends Real-Time Transcription status updates and the call's transcript data to this URL.

Twilio sends a `POST` request to this URL whenever one of the following occurs:

* A Real-Time Transcription session starts. This is called the `transcription-started` event.
* Utterances (partial or final) of transcribed audio is available. This is called the `transcription-content` event.
* A Real-Time Transcription session stops. This is called the `transcription-stopped` event. This event occurs when a Real-Time Transcription session is stopped via API or TwiML, or when the call ends.
* An error occurs. This is called the `transcription-error` event.

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const start = response.start();
start.transcription({
  statusCallbackUrl: 'https://example.com/your-callback-url',
});

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import VoiceResponse, Start, Transcription

response = VoiceResponse()
start = Start()
start.transcription(
    status_callback_url='https://example.com/your-callback-url')
response.append(start)

print(response)
```

```cs
using System;
using Twilio.TwiML;
using Twilio.TwiML.Voice;


class Example
{
    static void Main()
    {
        var response = new VoiceResponse();
        var start = new Start();
        start.Transcription(statusCallbackUrl: "https://example.com/your-callback-url");
        response.Append(start);

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.voice.Start;
import com.twilio.twiml.voice.Transcription;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Transcription transcription = new Transcription.Builder().statusCallbackUrl("https://example.com/your-callback-url").build();
        Start start = new Start.Builder().transcription(transcription).build();
        VoiceResponse response = new VoiceResponse.Builder().start(start).build();

        try {
            System.out.println(response.toXml());
        } catch (TwiMLException e) {
            e.printStackTrace();
        }
    }
}
```

```go
package main

import (
	"fmt"

	"github.com/twilio/twilio-go/twiml"
)

func main() {
	twiml, _ := twiml.Voice([]twiml.Element{
		&twiml.VoiceStart{
			InnerElements: []twiml.Element{
				&twiml.VoiceTranscription{
					StatusCallbackUrl: "https://example.com/your-callback-url",
				},
			},
		},
	})

	fmt.Print(twiml)
}
```

```php
<?php
require_once './vendor/autoload.php';
use Twilio\TwiML\VoiceResponse;

$response = new VoiceResponse();
$start = $response->start();
$start->transcription(['statusCallbackUrl' => 'https://example.com/your-callback-url']);

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.start do |start|
    start.transcription(status_callback_url: 'https://example.com/your-callback-url')
end

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Start>
        <Transcription statusCallbackUrl="https://example.com/your-callback-url"/> 
    </Start>      
</Response>
```

#### The transcription-started event

When a Real-Time Transcription is started and a session is created, Twilio sends an HTTP `POST` request to your `statusCallbackUrl` for the `transcription-started` event. This event provides initial details about the transcription session.

These HTTP requests contain the properties listed below.

| Property              | Description                                                                      | Example                                                                                                                                                                                                                    |
| --------------------- | -------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AccountSid            | Twilio Account SID                                                               | `AC11b76cdc7d217e72a72be6422d46a7ca`                                                                                                                                                                                       |
| CallSid               | Twilio Call SID                                                                  | `CA57af2620f427810cb4e430371e8d6e0f`                                                                                                                                                                                       |
| TranscriptionSid      | Unique identifier for this Real-Time Transcription session                       | `GT20dfa03c8cf8aa8d0c4aeccde5558b66`                                                                                                                                                                                       |
| Timestamp             | Time of the event in UTC ISO 8601 timestamp                                      | `2023-10-19T22:33:22.611Z`                                                                                                                                                                                                 |
| SequenceId            | Integer sequence number of the event                                             | `1`                                                                                                                                                                                                                        |
| TranscriptionEvent    | The event type                                                                   | `transcription-started`                                                                                                                                                                                                    |
| ProviderConfiguration | JSON string of the transcription provider                                        | `{\"profanityFilter\":\"true\",\"speechModel\":\"telephony\",\"enableAutomaticPunctuation\":\"true\",\"hints\":\"Alice Johnson, Bob Martin, ACME Corp, XYZ Enterprises, product demo, sales inquiry, customer feedback\"}` |
| TranscriptionEngine   | The name of the transcription engine                                             | `google`                                                                                                                                                                                                                   |
| Name                  | Friendly name of the Real-Time Transcription session                             | `session1`                                                                                                                                                                                                                 |
| Track                 | The track being transcribed: `inbound_track`, `outbound_track`, or `both_tracks` | `inbound_track`                                                                                                                                                                                                            |
| InboundTrackLabel     | Label associated with the inbound track                                          | `customer`                                                                                                                                                                                                                 |
| OutboundTrackLabel    | Label associated with the outbound track                                         | `agent`                                                                                                                                                                                                                    |
| PartialResults        | Whether partial results are enabled (`true` or `false`)                          | `true`                                                                                                                                                                                                                     |
| LanguageCode          | The language code for the transcription                                          | `en-US`                                                                                                                                                                                                                    |

Example of a `transcription-started` event payload:

```json
{
  "TranscriptionSid": "GT8fbf72a043b98407a3ce68331cd0030a",
  "Timestamp": "2024-06-25T18:45:12.135751Z",
  "AccountSid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "ProviderConfiguration": "{\"profanityFilter\":\"true\",\"speechModel\":\"telephony\",\"enableAutomaticPunctuation\":\"true\",\"hints\":\"Alice Johnson, Bob Martin, ACME Corp, XYZ Enterprises, product demo, sales inquiry, customer feedback\"}",
  "Name": "Chris Transcription",
  "OutboundTrackLabel": "agent",
  "LanguageCode": "en-US",
  "PartialResults": "false",
  "InboundTrackLabel": "customer",
  "TranscriptionEvent": "transcription-started",
  "CallSid": "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "TranscriptionEngine": "google",
  "Track": "both_tracks",
  "SequenceId": "1"
}
```

#### The transcription-content event

When an individual utterance (partial or final) of audio is transcribed, Twilio sends an HTTP `POST` request to your `statusCallbackUrl` for the `transcription-content` event. This event provides `TranscriptionData` results for the transcribed audio.

> \[!NOTE]
>
> [Stability](https://cloud.google.com/speech-to-text/v2/docs/reference/rpc/google.cloud.speech.v2#streamingrecognitionresult) and [Confidence](https://cloud.google.com/speech-to-text/v2/docs/reference/rpc/google.cloud.speech.v2#wordinfo) depend on `partialResults`. For example, if `partialResults` is `true`, then the `stability` property will be included in the event payload, and `confidence` will not. However, if `partialResults` is `false`, the opposite will be true. Always refer to Google's specific documentation ([examples](https://cloud.google.com/speech-to-text/v2/docs/reference/rpc/google.cloud.speech.v2#streamingrecognizeresponse)) for more details on each of these properties.

These HTTP requests contain the properties listed below.

| Property                  | Description                                                                                                                                                                                                                                                                                           | Example                                                                                  |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| AccountSid                | Twilio Account SID.                                                                                                                                                                                                                                                                                   | `AC11b76cdc7d217e72a72be6422d46a7ca`                                                     |
| CallSid                   | Twilio Call SID.                                                                                                                                                                                                                                                                                      | `CA57af2620f427810cb4e430371e8d6e0f`                                                     |
| TranscriptionSid          | Unique identifier for this Real-Time Transcription session.                                                                                                                                                                                                                                           | `GT20dfa03c8cf8aa8d0c4aeccde5558b66`                                                     |
| Timestamp                 | Time of the event in UTC ISO 8601 timestamp.                                                                                                                                                                                                                                                          | `2023-10-19T22:33:22.611Z`                                                               |
| SequenceId                | Integer sequence number of the event. **Note**: Sequence numbers increase sequentially within each `<Start><Transcription>` session. Ordering is guaranteed per track in `transcription-content`, but not across tracks, because each track is processed independently by the transcription provider. | `2`                                                                                      |
| TranscriptionEvent        | The event type.                                                                                                                                                                                                                                                                                       | `transcription-content`                                                                  |
| LanguageCode              | A BCP-47 standard language code (e.g. "en-US").                                                                                                                                                                                                                                                       | `en-US`                                                                                  |
| Track                     | The track being transcribed: `inbound_track` or `outbound_track`.                                                                                                                                                                                                                                     | `inbound_track`                                                                          |
| TranscriptionData         | JSON string containing transcription content. Note that `TranscriptionData.confidence` is a decimal number.                                                                                                                                                                                           | `{\"transcript\":\"to be or not to be\",\"confidence\":0.96823084}`                      |
| TranscriptionProviderData | JSON string containing additional transcription provider content, such as individual word timings and confidence (a decimal number).                                                                                                                                                                  | `{"ProviderData":{"type_field":"Results","start":0.0,"duration" 3.25,"is_final":true...` |
| Stability                 | String representing estimate of the likelihood the transcription provider will not change the guess it made about this partial result transcript. This property is only provided when `partialResults` is `true`.                                                                                     | Range between 0.0 (unstable) and 1.0 (stable). Example: 0.8                              |
| Final                     | Boolean value indicating whether this event contains the final utterance (or partial utterance).                                                                                                                                                                                                      | `false`                                                                                  |

Example of a `transcription-content` event payload when `partialResults` is equal to `false`:

```json
{
  "LanguageCode": "en-US",
  "TranscriptionSid": "GT8fbf72a043b98407a3ce68331cd0030a",
  "TranscriptionEvent": "transcription-content",
  "CallSid": "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "TranscriptionData": "{\"transcript\":\"Hello, this is Sam from Horizon Financial Services. Just letting you know this call may be recorded for quality purposes. How can I assist you today?\",\"confidence\":0.9956335}",
  "Timestamp": "2024-06-25T18:45:21.454203Z",
  "Final": "true",
  "AccountSid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "Track": "outbound_track",
  "SequenceId": "2"
}
```

Example of a `transcription-content` event payload when `partialResults` is equal to `true`:

```json
{
  "LanguageCode": "en-US",
  "TranscriptionSid": "GT6ebb54a123f0c86b70605a4925836f69",
  "Stability": "0.9",
  "TranscriptionEvent": "transcription-content",
  "CallSid": "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "TranscriptionData": "{\"transcript\":\"Hello, this is Sam from Horizon Financial Services. Just letting you know this call may be recorded for\"}",
  "Timestamp": "2024-06-25T16:30:21.600697Z",
  "Final": "false",
  "AccountSid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "Track": "outbound_track",
  "SequenceId": "70"
}
```

Example of a `transcription-content` event payload when `enableProviderData` is set to `true`:

```json
{
  "LanguageCode": "en-US",
  "TranscriptionSid": "GT3239729303cf3f98ab7f05b4ff1e49d0",
  "TranscriptionEvent": "transcription-content",
  "CallSid": "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "TranscriptionData": "{\"transcript\":\"Hello?","confidence":0.9746094}",
  "Timestamp": "2026-01-23T21:47:44.614701800Z",
  "Final": "true",
  "AccountSid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "Track": "inbound_track",
  "TranscriptionProviderData": "{"ProviderData":{"type_field":"Results","start":3.25,"duration":2.4099998,"is_final":true,"from_finalize":false,"channel":{"alternatives":[{"transcript":"Hello?","words":[{"word":"hello","start":4.77,"end":5.17,"confidence":0.9746094,"languages":[]}]},"metadata":{"request_id":"1dcde0b3-1bef-451f-b409-333133f4e27d","model_info":["name":"general-nova-3","version":"25-04-17.21547","arch":"nova-3"},"model_uuid":"40bd3654-e622-47c4-a111_63a61b23bfe8"},"channel_index":[0,1]},"ProviderConnectTime":"2026-0123T31:47:38.941663342Z","Provider":"deepgram"},
  "SequenceId": "3"
}
```

#### The transcription-stopped event

When a Real-Time Transcription session is stopped or ends, Twilio sends an HTTP `POST` request to your `statusCallbackUrl` for the `transcription-stopped` event. This event provides final details about the transcription session.

These HTTP requests contain the properties listed below.

| Property           | Description                                                | Example                            |
| ------------------ | ---------------------------------------------------------- | ---------------------------------- |
| AccountSid         | Twilio Account SID                                         | AC11b76cdc7d217e72a72be6422d46a7ca |
| CallSid            | Twilio Call SID                                            | CA57af2620f427810cb4e430371e8d6e0f |
| TranscriptionSid   | Unique identifier for this Real-Time Transcription session | GT20dfa03c8cf8aa8d0c4aeccde5558b66 |
| Timestamp          | Time of the event, in UTC ISO 8601 format                  | 2023-10-19T22:33:22.611Z           |
| SequenceId         | Integer sequence number of the event                       | 3                                  |
| TranscriptionEvent | The event type                                             | transcription-stopped              |

An example of the `transcription-stopped` event payload:

```json
{
  "TranscriptionSid": "GT8fbf72a043b98407a3ce68331cd0030a",
  "TranscriptionEvent": "transcription-stopped",
  "CallSid": "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "Timestamp": "2024-06-25T18:45:23.839266Z",
  "AccountSid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "SequenceId": "3"
}
```

#### The transcription-error event

When an error occurs during a Real-Time Transcription session, Twilio sends an HTTP `POST` request to your `statusCallbackUrl` for the `transcription-error` event.

> \[!NOTE]
>
> Documentation on Real-Time Transcription errors is in the [Error and Warning Dictionary](/docs/api/errors). Error codes range from 32650 to 32655. To view errors in Twilio Console, go to **Monitor** > **Logs** > **Debugger** > **[Errors](https://1console.twilio.com/go?to=/account/__account__/us1/logs/debugger/errors)**. You can also view errors in the [legacy Console](https://console.twilio.com/monitor/logs/debugger/errors).

These HTTP requests contain the properties listed below.

| Property               | Description                                                | Example                              |
| ---------------------- | ---------------------------------------------------------- | ------------------------------------ |
| AccountSid             | Twilio Account SID                                         | `ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` |
| CallSid                | Twilio Call SID                                            | `CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` |
| TranscriptionSid       | Unique identifier for this Real-Time Transcription session | `GT20dfa03c8cf8aa8d0c4aeccde5558b66` |
| Timestamp              | Time of the event in UTC ISO 8601 timestamp                | `2023-10-19T22:33:22.611Z`           |
| SequenceId             | Integer sequence number of the event                       | `3`                                  |
| TranscriptionEvent     | The event type                                             | `transcription-error`                |
| TranscriptionErrorCode | Error code                                                 | `32655`                              |
| TranscriptionError     | Error description                                          | `Provider Unavailable`               |

Example of a `transcription-error` event payload:

```json
{
  "TranscriptionSid": "GT20dfa03c8cf8aa8d0c4aeccde5558b66",
  "Timestamp": "2023-10-19T22:33:22.611Z",
  "AccountSid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "SequenceId": "3",
  "TranscriptionEvent": "transcription-error",
  "CallSid": "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "TranscriptionErrorCode": "32655",
  "TranscriptionError": "Provider Unavailable"
}
```

### languageCode

The `languageCode` attribute specifies the language in which the transcription should be performed. It accepts a [BCP-47 standard language code](https://cloud.google.com/speech-to-text/v2/docs/speech-to-text-supported-languages), such as `en-US` for American English. This attribute is useful for ensuring that the transcription engine correctly understands and processes the spoken language.

Languages supported by each transcription provider (`transcriptionEngine`) for transcriptions vary, and, furthermore, vary by the individual `speechModel` used; see [speechModel section](#speechmodel) for links to lists of languages supported by transcriptions providers with their various speech models.

The following TwiML example demonstrates how to specify the `languageCode` attribute for a transcription for Mexican Spanish. This ensures that the transcription is performed in the specified language and variant or dialect, which is particularly useful for calls in languages other than English.

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const start = response.start();
start.transcription({
  statusCallbackUrl: 'https://example.com/your-callback-url',
  languageCode: 'es-MX',
});

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import VoiceResponse, Start, Transcription

response = VoiceResponse()
start = Start()
start.transcription(
    status_callback_url='https://example.com/your-callback-url',
    language_code='es-MX')
response.append(start)

print(response)
```

```cs
using System;
using Twilio.TwiML;
using Twilio.TwiML.Voice;


class Example
{
    static void Main()
    {
        var response = new VoiceResponse();
        var start = new Start();
        start.Transcription(statusCallbackUrl: "https://example.com/your-callback-url", languageCode: "es-MX");
        response.Append(start);

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.voice.Start;
import com.twilio.twiml.voice.Transcription;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Transcription transcription = new Transcription.Builder().statusCallbackUrl("https://example.com/your-callback-url").languageCode("es-MX").build();
        Start start = new Start.Builder().transcription(transcription).build();
        VoiceResponse response = new VoiceResponse.Builder().start(start).build();

        try {
            System.out.println(response.toXml());
        } catch (TwiMLException e) {
            e.printStackTrace();
        }
    }
}
```

```go
package main

import (
	"fmt"

	"github.com/twilio/twilio-go/twiml"
)

func main() {
	twiml, _ := twiml.Voice([]twiml.Element{
		&twiml.VoiceStart{
			InnerElements: []twiml.Element{
				&twiml.VoiceTranscription{
					LanguageCode:      "es-MX",
					StatusCallbackUrl: "https://example.com/your-callback-url",
				},
			},
		},
	})

	fmt.Print(twiml)
}
```

```php
<?php
require_once './vendor/autoload.php';
use Twilio\TwiML\VoiceResponse;

$response = new VoiceResponse();
$start = $response->start();
$start->transcription(['statusCallbackUrl' => 'https://example.com/your-callback-url', 'languageCode' => 'es-MX']);

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.start do |start|
    start.transcription(status_callback_url: 'https://example.com/your-callback-url', language_code: 'es-MX')
end

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Start>
        <Transcription statusCallbackUrl="https://example.com/your-callback-url" languageCode="es-MX" /> 
    </Start>      
</Response>
```

### track

The `track` attribute specifies which audio track should be transcribed. It can take one of the following values: `inbound_track`, `outbound_track`, or `both_tracks`. This attribute is useful for determining whether to transcribe the audio coming from the caller, the callee, or both.

The following TwiML example demonstrates how to specify the `track` attribute for a transcription.

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const start = response.start();
start.transcription({
  statusCallbackUrl: 'https://example.com/your-callback-url',
  track: 'inbound_track',
});

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import VoiceResponse, Start, Transcription

response = VoiceResponse()
start = Start()
start.transcription(
    status_callback_url='https://example.com/your-callback-url',
    track='inbound_track')
response.append(start)

print(response)
```

```cs
using System;
using Twilio.TwiML;
using Twilio.TwiML.Voice;


class Example
{
    static void Main()
    {
        var response = new VoiceResponse();
        var start = new Start();
        start.Transcription(statusCallbackUrl: "https://example.com/your-callback-url", track: "inbound_track");
        response.Append(start);

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.voice.Start;
import com.twilio.twiml.voice.Transcription;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Transcription transcription = new Transcription.Builder().statusCallbackUrl("https://example.com/your-callback-url").track(Transcription.Track.INBOUND_TRACK).build();
        Start start = new Start.Builder().transcription(transcription).build();
        VoiceResponse response = new VoiceResponse.Builder().start(start).build();

        try {
            System.out.println(response.toXml());
        } catch (TwiMLException e) {
            e.printStackTrace();
        }
    }
}
```

```go
package main

import (
	"fmt"

	"github.com/twilio/twilio-go/twiml"
)

func main() {
	twiml, _ := twiml.Voice([]twiml.Element{
		&twiml.VoiceStart{
			InnerElements: []twiml.Element{
				&twiml.VoiceTranscription{
					StatusCallbackUrl: "https://example.com/your-callback-url",
					Track:             "inbound_track",
				},
			},
		},
	})

	fmt.Print(twiml)
}
```

```php
<?php
require_once './vendor/autoload.php';
use Twilio\TwiML\VoiceResponse;

$response = new VoiceResponse();
$start = $response->start();
$start->transcription(['statusCallbackUrl' => 'https://example.com/your-callback-url', 'track' => 'inbound_track']);

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.start do |start|
    start.transcription(status_callback_url: 'https://example.com/your-callback-url', track: 'inbound_track')
end

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Start>
        <Transcription statusCallbackUrl="https://example.com/your-callback-url" track="inbound_track" /> 
    </Start>      
</Response>
```

### inboundTrackLabel

The `inboundTrackLabel` attribute allows you to associate an alphanumeric label with the inbound track being transcribed. This can be useful for identifying and differentiating the inbound audio stream in the transcription results. Using labels helps to clearly identify who is speaking, especially in multi-party conversations or call center scenarios.

Refer to the [Track labels section below](#track-labels) to understand the importance of using labels.

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const start = response.start();
start.transcription({
  statusCallbackUrl: 'https://example.com/your-callback-url',
  inboundTrackLabel: 'agent',
  outboundTrackLabel: 'customer',
});

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import VoiceResponse, Start, Transcription

response = VoiceResponse()
start = Start()
start.transcription(
    status_callback_url='https://example.com/your-callback-url',
    inbound_track_label='agent',
    outbound_track_label='customer')
response.append(start)

print(response)
```

```cs
using System;
using Twilio.TwiML;
using Twilio.TwiML.Voice;


class Example
{
    static void Main()
    {
        var response = new VoiceResponse();
        var start = new Start();
        start.Transcription(statusCallbackUrl: "https://example.com/your-callback-url", inboundTrackLabel: "agent", outboundTrackLabel: "customer");
        response.Append(start);

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.voice.Start;
import com.twilio.twiml.voice.Transcription;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Transcription transcription = new Transcription.Builder().statusCallbackUrl("https://example.com/your-callback-url").inboundTrackLabel("agent").outboundTrackLabel("customer").build();
        Start start = new Start.Builder().transcription(transcription).build();
        VoiceResponse response = new VoiceResponse.Builder().start(start).build();

        try {
            System.out.println(response.toXml());
        } catch (TwiMLException e) {
            e.printStackTrace();
        }
    }
}
```

```go
package main

import (
	"fmt"

	"github.com/twilio/twilio-go/twiml"
)

func main() {
	twiml, _ := twiml.Voice([]twiml.Element{
		&twiml.VoiceStart{
			InnerElements: []twiml.Element{
				&twiml.VoiceTranscription{
					InboundTrackLabel:  "agent",
					OutboundTrackLabel: "customer",
					StatusCallbackUrl:  "https://example.com/your-callback-url",
				},
			},
		},
	})

	fmt.Print(twiml)
}
```

```php
<?php
require_once './vendor/autoload.php';
use Twilio\TwiML\VoiceResponse;

$response = new VoiceResponse();
$start = $response->start();
$start->transcription(['statusCallbackUrl' => 'https://example.com/your-callback-url', 'inboundTrackLabel' => 'agent', 'outboundTrackLabel' => 'customer']);

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.start do |start|
    start.transcription(status_callback_url: 'https://example.com/your-callback-url', inbound_track_label: 'agent', outbound_track_label: 'customer')
end

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Start>
        <Transcription statusCallbackUrl="https://example.com/your-callback-url" inboundTrackLabel="agent" outboundTrackLabel="customer" /> 
    </Start>      
</Response>
```

#### Example 1: Inbound Call

In an inbound call scenario, the call is initiated by the customer and received by the agent or business person. Here, the inbound audio track (agent's speech) is labeled for clarity in the transcription results.

```xml
<Response>
  <Start>
    <Transcription track="inbound_track" inboundTrackLabel="agent" />
  </Start>
</Response>
```

In this example, the inbound audio track is labeled as "agent". This is useful for scenarios like customer support calls, where distinguishing the agent's responses from the customer's speech is crucial for understanding the interaction.

#### Example 2: Outbound Call

In an outbound call scenario, the call is initiated by the agent or business person and received by the customer. Here, the inbound audio track (customer's speech) is labeled for clarity in the transcription results.

```xml
<Response>
  <Start>
    <Transcription track="inbound_track" inboundTrackLabel="customer" />
  </Start>
</Response>
```

In this example, the inbound audio track is labeled as "customer". This is useful for scenarios like sales calls, where distinguishing the customer's speech in the transcription can help in analyzing customer feedback and engagement.

### outboundTrackLabel \[#outboundtracklabel]

The `outboundTrackLabel` attribute allows you to associate an alphanumeric label with the outbound track being transcribed. This can be useful for identifying and differentiating the outbound audio stream in the transcription results. Using labels helps to clearly identify who is speaking, especially in multi-party conversations or call center scenarios.

Refer to the [Track labels section below](#track-labels) to understand the importance of using labels.

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const start = response.start();
start.transcription({
  statusCallbackUrl: 'https://example.com/your-callback-url',
  inboundTrackLabel: 'agent',
  outboundTrackLabel: 'customer',
});

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import VoiceResponse, Start, Transcription

response = VoiceResponse()
start = Start()
start.transcription(
    status_callback_url='https://example.com/your-callback-url',
    inbound_track_label='agent',
    outbound_track_label='customer')
response.append(start)

print(response)
```

```cs
using System;
using Twilio.TwiML;
using Twilio.TwiML.Voice;


class Example
{
    static void Main()
    {
        var response = new VoiceResponse();
        var start = new Start();
        start.Transcription(statusCallbackUrl: "https://example.com/your-callback-url", inboundTrackLabel: "agent", outboundTrackLabel: "customer");
        response.Append(start);

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.voice.Start;
import com.twilio.twiml.voice.Transcription;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Transcription transcription = new Transcription.Builder().statusCallbackUrl("https://example.com/your-callback-url").inboundTrackLabel("agent").outboundTrackLabel("customer").build();
        Start start = new Start.Builder().transcription(transcription).build();
        VoiceResponse response = new VoiceResponse.Builder().start(start).build();

        try {
            System.out.println(response.toXml());
        } catch (TwiMLException e) {
            e.printStackTrace();
        }
    }
}
```

```go
package main

import (
	"fmt"

	"github.com/twilio/twilio-go/twiml"
)

func main() {
	twiml, _ := twiml.Voice([]twiml.Element{
		&twiml.VoiceStart{
			InnerElements: []twiml.Element{
				&twiml.VoiceTranscription{
					InboundTrackLabel:  "agent",
					OutboundTrackLabel: "customer",
					StatusCallbackUrl:  "https://example.com/your-callback-url",
				},
			},
		},
	})

	fmt.Print(twiml)
}
```

```php
<?php
require_once './vendor/autoload.php';
use Twilio\TwiML\VoiceResponse;

$response = new VoiceResponse();
$start = $response->start();
$start->transcription(['statusCallbackUrl' => 'https://example.com/your-callback-url', 'inboundTrackLabel' => 'agent', 'outboundTrackLabel' => 'customer']);

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.start do |start|
    start.transcription(status_callback_url: 'https://example.com/your-callback-url', inbound_track_label: 'agent', outbound_track_label: 'customer')
end

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Start>
        <Transcription statusCallbackUrl="https://example.com/your-callback-url" inboundTrackLabel="agent" outboundTrackLabel="customer" /> 
    </Start>      
</Response>
```

#### Example 1: Inbound Call

In an inbound call scenario, the call is initiated by the customer and received by the agent or business person. Here, the outbound audio track (customer's speech) is labeled for clarity in the transcription results.

```xml
<Response>
  <Start>
    <Transcription track="outbound_track" outboundTrackLabel="customer" />
  </Start>
</Response>
```

In this example, the outbound audio track is labeled as "customer". This is useful for scenarios like customer support calls, where distinguishing the customer's speech from the agent's responses is crucial for understanding the interaction.

#### Example 2: Outbound Call

In an outbound call scenario, the call is initiated by the agent or business person and received by the customer. Here, the outbound audio track (agent's speech) is labeled for clarity in the transcription results.

```xml
<Response>
  <Start>
    <Transcription track="outbound_track" outboundTrackLabel="agent" />
  </Start>
</Response>
```

In this example, the outbound audio track is labeled as "agent". This is useful for scenarios like sales calls, where distinguishing the agent's speech in the transcription can help in analyzing the effectiveness of the sales pitch.

### transcriptionEngine

To leverage specific features or optimizations that different transcription engines offer, set the `transcriptionEngine` attribute. For details about each provider's speech models, see `speechModel` in the following section. Both `transcriptionEngine: google` 'transcriptionEngine: deepgram' support persisted transcript resources.

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const start = response.start();
start.transcription({
  statusCallbackUrl: 'https://example.com/your-callback-url',
  transcriptionEngine: 'google',
});

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import VoiceResponse, Start, Transcription

response = VoiceResponse()
start = Start()
start.transcription(
    status_callback_url='https://example.com/your-callback-url',
    transcription_engine='google')
response.append(start)

print(response)
```

```cs
using System;
using Twilio.TwiML;
using Twilio.TwiML.Voice;


class Example
{
    static void Main()
    {
        var response = new VoiceResponse();
        var start = new Start();
        start.Transcription(statusCallbackUrl: "https://example.com/your-callback-url", transcriptionEngine: "google");
        response.Append(start);

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.voice.Start;
import com.twilio.twiml.voice.Transcription;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Transcription transcription = new Transcription.Builder().statusCallbackUrl("https://example.com/your-callback-url").transcriptionEngine("google").build();
        Start start = new Start.Builder().transcription(transcription).build();
        VoiceResponse response = new VoiceResponse.Builder().start(start).build();

        try {
            System.out.println(response.toXml());
        } catch (TwiMLException e) {
            e.printStackTrace();
        }
    }
}
```

```go
package main

import (
	"fmt"

	"github.com/twilio/twilio-go/twiml"
)

func main() {
	twiml, _ := twiml.Voice([]twiml.Element{
		&twiml.VoiceStart{
			InnerElements: []twiml.Element{
				&twiml.VoiceTranscription{
					StatusCallbackUrl:   "https://example.com/your-callback-url",
					TranscriptionEngine: "google",
				},
			},
		},
	})

	fmt.Print(twiml)
}
```

```php
<?php
require_once './vendor/autoload.php';
use Twilio\TwiML\VoiceResponse;

$response = new VoiceResponse();
$start = $response->start();
$start->transcription(['statusCallbackUrl' => 'https://example.com/your-callback-url', 'transcriptionEngine' => 'google']);

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.start do |start|
    start.transcription(status_callback_url: 'https://example.com/your-callback-url', transcription_engine: 'google')
end

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Start>
        <Transcription statusCallbackUrl="https://example.com/your-callback-url" transcriptionEngine="google" /> 
    </Start>      
</Response>
```

### speechModel

The `speechModel` attribute allows you to specify which speech model to use for the transcription.

Different speech models can optimize for different use cases, such as phone calls, video, or enhanced models for higher accuracy.

If Google is used as the `transcriptionEngine`, this maps to [Transcription Model](https://cloud.google.com/speech-to-text/v2/docs/transcription-model) in Google terminology. Refer to the Google documentation to understand each speech model's specific capabilities and configurations.

The `telephony` speech model is optimized for phone call audio and can provide better accuracy for this type of audio.

The `long` speech model is optimized for long-form audio, such as lectures or extended conversations, and can provide better accuracy for lengthy audio.

When you set `transcriptionEngine` to `google`, Twilio only supports speech models and languages available on Google's global STT API endpoints. For the list of supported languages, see the [Google STT v2 API Language List](https://cloud.google.com/speech-to-text/v2/docs/speech-to-text-supported-languages). This list excludes Chirp2 models or languages that only those models support.

If you use Deepgram as the `transcriptionEngine`, Real-Time Transcriptions rely on the [`nova-2` speech models](https://developers.deepgram.com/docs/models-languages-overview#nova-2) by default. [`nova-3` monolingual speech models](https://developers.deepgram.com/docs/models-languages-overview#nova-3) can alternatively also be specified, optionally, when using one of Deepgram's supported languages. Nova-3's language-detecting multilingual model (`language`=`multi`) is also supported as a speech model and language option in Real-Time Transcriptions.

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const start = response.start();
start.transcription({
  statusCallbackUrl: 'https://example.com/your-callback-url',
  speechModel: 'telephony',
  transcriptionEngine: 'google',
});

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import VoiceResponse, Start, Transcription

response = VoiceResponse()
start = Start()
start.transcription(
    status_callback_url='https://example.com/your-callback-url',
    speech_model='telephony',
    transcription_engine='google')
response.append(start)

print(response)
```

```cs
using System;
using Twilio.TwiML;
using Twilio.TwiML.Voice;


class Example
{
    static void Main()
    {
        var response = new VoiceResponse();
        var start = new Start();
        start.Transcription(statusCallbackUrl: "https://example.com/your-callback-url", speechModel: "telephony", transcriptionEngine: "google");
        response.Append(start);

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.voice.Start;
import com.twilio.twiml.voice.Transcription;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Transcription transcription = new Transcription.Builder().statusCallbackUrl("https://example.com/your-callback-url").speechModel("telephony").transcriptionEngine("google").build();
        Start start = new Start.Builder().transcription(transcription).build();
        VoiceResponse response = new VoiceResponse.Builder().start(start).build();

        try {
            System.out.println(response.toXml());
        } catch (TwiMLException e) {
            e.printStackTrace();
        }
    }
}
```

```go
package main

import (
	"fmt"

	"github.com/twilio/twilio-go/twiml"
)

func main() {
	twiml, _ := twiml.Voice([]twiml.Element{
		&twiml.VoiceStart{
			InnerElements: []twiml.Element{
				&twiml.VoiceTranscription{
					SpeechModel:         "telephony",
					StatusCallbackUrl:   "https://example.com/your-callback-url",
					TranscriptionEngine: "google",
				},
			},
		},
	})

	fmt.Print(twiml)
}
```

```php
<?php
require_once './vendor/autoload.php';
use Twilio\TwiML\VoiceResponse;

$response = new VoiceResponse();
$start = $response->start();
$start->transcription(['statusCallbackUrl' => 'https://example.com/your-callback-url', 'speechModel' => 'telephony', 'transcriptionEngine' => 'google']);

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.start do |start|
    start.transcription(status_callback_url: 'https://example.com/your-callback-url', speech_model: 'telephony', transcription_engine: 'google')
end

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Start>
        <Transcription statusCallbackUrl="https://example.com/your-callback-url" speechModel="telephony" transcriptionEngine="google" /> 
    </Start>      
</Response>
```

### enableProviderData

The `enableProviderData` attribute controls whether Twilio includes additional data from the transcription provider in `transcription-content` events. When set to `true`, the response includes information such as individual word timing (as an offset in seconds from `ProviderConnectTime`) and per-word confidence scores.

For an example of this additional data, see [the transcription-content event](#the-transcription-content-event) example with `enableProviderData` set to `true`.

The format of the provider data varies by provider. If you change your `transcriptionEngine` provider, your application must handle the different data formats. The same applies if Twilio fails over to a different provider during an outage.

You can use provider data such as word timing and `ProviderConnectTime` timestamps to get more granular ordering of transcribed utterances. Twilio passes this data through as-is from the provider. Because each track is transcribed independently and timing can vary, Twilio doesn't guarantee precise timing and sequencing across the `inbound` and `outbound` tracks.

### profanityFilter

The `profanityFilter` attribute allows you to enable or disable the filtering of profane words in the transcription. When enabled, the transcription engine attempts to mask or omit any detected profanities in the transcription results.

> \[!WARNING]
>
> By default, the Google Transcription Engine enables the `profanityFilter` for all calls. The `medical_conversation` speechModel doesn't support `profanityFilter`. When using the `medical_conversation` speechModel, set the `profanityFilter` attribute to `false`. Deepgram's profanity filter [only works for some languages](https://developers.deepgram.com/docs/profanity-filter).

The example below demonstrates how to enable the profanity filter for the transcription. This is useful for ensuring that any profane language is masked or omitted in the transcription output.

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const start = response.start();
start.transcription({
  statusCallbackUrl: 'https://example.com/your-callback-url',
  profanityFilter: false,
  transcriptionEngine: 'google',
});

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import VoiceResponse, Start, Transcription

response = VoiceResponse()
start = Start()
start.transcription(
    status_callback_url='https://example.com/your-callback-url',
    profanity_filter=False,
    transcription_engine='google')
response.append(start)

print(response)
```

```cs
using System;
using Twilio.TwiML;
using Twilio.TwiML.Voice;


class Example
{
    static void Main()
    {
        var response = new VoiceResponse();
        var start = new Start();
        start.Transcription(statusCallbackUrl: "https://example.com/your-callback-url", profanityFilter: false, transcriptionEngine: "google");
        response.Append(start);

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.voice.Start;
import com.twilio.twiml.voice.Transcription;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Transcription transcription = new Transcription.Builder().statusCallbackUrl("https://example.com/your-callback-url").profanityFilter(false).transcriptionEngine("google").build();
        Start start = new Start.Builder().transcription(transcription).build();
        VoiceResponse response = new VoiceResponse.Builder().start(start).build();

        try {
            System.out.println(response.toXml());
        } catch (TwiMLException e) {
            e.printStackTrace();
        }
    }
}
```

```go
package main

import (
	"fmt"

	"github.com/twilio/twilio-go/twiml"
)

func main() {
	twiml, _ := twiml.Voice([]twiml.Element{
		&twiml.VoiceStart{
			InnerElements: []twiml.Element{
				&twiml.VoiceTranscription{
					ProfanityFilter:     "false",
					StatusCallbackUrl:   "https://example.com/your-callback-url",
					TranscriptionEngine: "google",
				},
			},
		},
	})

	fmt.Print(twiml)
}
```

```php
<?php
require_once './vendor/autoload.php';
use Twilio\TwiML\VoiceResponse;

$response = new VoiceResponse();
$start = $response->start();
$start->transcription(['statusCallbackUrl' => 'https://example.com/your-callback-url', 'profanityFilter' => 'false', 'transcriptionEngine' => 'google']);

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.start do |start|
    start.transcription(status_callback_url: 'https://example.com/your-callback-url', profanity_filter: false, transcription_engine: 'google')
end

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Start>
        <Transcription statusCallbackUrl="https://example.com/your-callback-url" profanityFilter="false" transcriptionEngine="google" /> 
    </Start>      
</Response>
```

### partialResults

Maps to [StreamingRecognitionResult](https://cloud.google.com/speech-to-text/v2/docs/reference/rpc/google.cloud.speech.v2#streamingrecognitionresult) specifically when (`"is_final"=false`) in Google Terminology. The `partialResults` attribute allows you to enable or disable the delivery of interim transcription results. When enabled, the transcription engine will send partial [(interim)](https://cloud.google.com/speech-to-text/v2/docs/reference/rpc/google.cloud.speech.v2#streamingrecognitionfeatures) results as the transcription progresses, providing more immediate feedback before the final result is available.

The example below demonstrates how to enable partial results for the transcription.

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const start = response.start();
start.transcription({
  statusCallbackUrl: 'https://example.com/your-callback-url',
  partialResults: true,
  transcriptionEngine: 'google',
});

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import VoiceResponse, Start, Transcription

response = VoiceResponse()
start = Start()
start.transcription(
    status_callback_url='https://example.com/your-callback-url',
    partial_results=True,
    transcription_engine='google')
response.append(start)

print(response)
```

```cs
using System;
using Twilio.TwiML;
using Twilio.TwiML.Voice;


class Example
{
    static void Main()
    {
        var response = new VoiceResponse();
        var start = new Start();
        start.Transcription(statusCallbackUrl: "https://example.com/your-callback-url", partialResults: true, transcriptionEngine: "google");
        response.Append(start);

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.voice.Start;
import com.twilio.twiml.voice.Transcription;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Transcription transcription = new Transcription.Builder().statusCallbackUrl("https://example.com/your-callback-url").partialResults(true).transcriptionEngine("google").build();
        Start start = new Start.Builder().transcription(transcription).build();
        VoiceResponse response = new VoiceResponse.Builder().start(start).build();

        try {
            System.out.println(response.toXml());
        } catch (TwiMLException e) {
            e.printStackTrace();
        }
    }
}
```

```go
package main

import (
	"fmt"

	"github.com/twilio/twilio-go/twiml"
)

func main() {
	twiml, _ := twiml.Voice([]twiml.Element{
		&twiml.VoiceStart{
			InnerElements: []twiml.Element{
				&twiml.VoiceTranscription{
					PartialResults:      "true",
					StatusCallbackUrl:   "https://example.com/your-callback-url",
					TranscriptionEngine: "google",
				},
			},
		},
	})

	fmt.Print(twiml)
}
```

```php
<?php
require_once './vendor/autoload.php';
use Twilio\TwiML\VoiceResponse;

$response = new VoiceResponse();
$start = $response->start();
$start->transcription(['statusCallbackUrl' => 'https://example.com/your-callback-url', 'partialResults' => 'true', 'transcriptionEngine' => 'google']);

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.start do |start|
    start.transcription(status_callback_url: 'https://example.com/your-callback-url', partial_results: true, transcription_engine: 'google')
end

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Start>
        <Transcription statusCallbackUrl="https://example.com/your-callback-url" partialResults="true" transcriptionEngine="google" /> 
    </Start>      
</Response>
```

### hints

The `hints` attribute contains a list of words or phrases that the transcription provider can expect to encounter during a Real-Time Transcription. Using the `hints` attribute can improve the transcription provider's recognition of words or phrases you expect from your callers.

You may provide up to 500 words or phrases in the list of hints, separating each entry with a comma. Your hints may be up to 100 characters each and separate each word in a phrase with a space. For example:

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const start = response.start();
start.transcription({
  statusCallbackUrl: 'https://example.com/your-callback-url',
  hints:
    'Alice Johnson, Bob Martin, ACME Corp, XYZ Enterprises, product demo, sales inquiry, customer feedback',
});

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import VoiceResponse, Start, Transcription

response = VoiceResponse()
start = Start()
start.transcription(
    status_callback_url='https://example.com/your-callback-url',
    hints=
    'Alice Johnson, Bob Martin, ACME Corp, XYZ Enterprises, product demo, sales inquiry, customer feedback'
)
response.append(start)

print(response)
```

```cs
using System;
using Twilio.TwiML;
using Twilio.TwiML.Voice;


class Example
{
    static void Main()
    {
        var response = new VoiceResponse();
        var start = new Start();
        start.Transcription(statusCallbackUrl: "https://example.com/your-callback-url", hints: "Alice Johnson, Bob Martin, ACME Corp, XYZ Enterprises, product demo, sales inquiry, customer feedback");
        response.Append(start);

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.voice.Start;
import com.twilio.twiml.voice.Transcription;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Transcription transcription = new Transcription.Builder().statusCallbackUrl("https://example.com/your-callback-url").hints("Alice Johnson, Bob Martin, ACME Corp, XYZ Enterprises, product demo, sales inquiry, customer feedback").build();
        Start start = new Start.Builder().transcription(transcription).build();
        VoiceResponse response = new VoiceResponse.Builder().start(start).build();

        try {
            System.out.println(response.toXml());
        } catch (TwiMLException e) {
            e.printStackTrace();
        }
    }
}
```

```go
package main

import (
	"fmt"

	"github.com/twilio/twilio-go/twiml"
)

func main() {
	twiml, _ := twiml.Voice([]twiml.Element{
		&twiml.VoiceStart{
			InnerElements: []twiml.Element{
				&twiml.VoiceTranscription{
					Hints:             "Alice Johnson, Bob Martin, ACME Corp, XYZ Enterprises, product demo, sales inquiry, customer feedback",
					StatusCallbackUrl: "https://example.com/your-callback-url",
				},
			},
		},
	})

	fmt.Print(twiml)
}
```

```php
<?php
require_once './vendor/autoload.php';
use Twilio\TwiML\VoiceResponse;

$response = new VoiceResponse();
$start = $response->start();
$start->transcription(['statusCallbackUrl' => 'https://example.com/your-callback-url', 'hints' => 'Alice Johnson, Bob Martin, ACME Corp, XYZ Enterprises, product demo, sales inquiry, customer feedback']);

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.start do |start|
    start.transcription(status_callback_url: 'https://example.com/your-callback-url', hints: 'Alice Johnson, Bob Martin, ACME Corp, XYZ Enterprises, product demo, sales inquiry, customer feedback')
end

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Start>
        <Transcription statusCallbackUrl="https://example.com/your-callback-url" hints="Alice Johnson, Bob Martin, ACME Corp, XYZ Enterprises, product demo, sales inquiry, customer feedback" /> 
    </Start>      
</Response>
```

The `hints` attribute also supports Google's [class token](https://cloud.google.com/speech-to-text/docs/class-tokens) list to [improve recognition](https://cloud.google.com/speech-to-text/docs/adaptation-model#classes). You can pass a class token directly in the `hints` attribute, as shown in the example below.

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const start = response.start();
start.transcription({
  statusCallbackUrl: 'https://example.com/your-callback-url',
  hints: '$OOV_CLASS_ALPHANUMERIC_SEQUENCE',
});

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import VoiceResponse, Start, Transcription

response = VoiceResponse()
start = Start()
start.transcription(
    status_callback_url='https://example.com/your-callback-url',
    hints='$OOV_CLASS_ALPHANUMERIC_SEQUENCE')
response.append(start)

print(response)
```

```cs
using System;
using Twilio.TwiML;
using Twilio.TwiML.Voice;


class Example
{
    static void Main()
    {
        var response = new VoiceResponse();
        var start = new Start();
        start.Transcription(statusCallbackUrl: "https://example.com/your-callback-url", hints: "$OOV_CLASS_ALPHANUMERIC_SEQUENCE");
        response.Append(start);

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.voice.Start;
import com.twilio.twiml.voice.Transcription;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Transcription transcription = new Transcription.Builder().statusCallbackUrl("https://example.com/your-callback-url").hints("$OOV_CLASS_ALPHANUMERIC_SEQUENCE").build();
        Start start = new Start.Builder().transcription(transcription).build();
        VoiceResponse response = new VoiceResponse.Builder().start(start).build();

        try {
            System.out.println(response.toXml());
        } catch (TwiMLException e) {
            e.printStackTrace();
        }
    }
}
```

```go
package main

import (
	"fmt"

	"github.com/twilio/twilio-go/twiml"
)

func main() {
	twiml, _ := twiml.Voice([]twiml.Element{
		&twiml.VoiceStart{
			InnerElements: []twiml.Element{
				&twiml.VoiceTranscription{
					Hints:             "$OOV_CLASS_ALPHANUMERIC_SEQUENCE",
					StatusCallbackUrl: "https://example.com/your-callback-url",
				},
			},
		},
	})

	fmt.Print(twiml)
}
```

```php
<?php
require_once './vendor/autoload.php';
use Twilio\TwiML\VoiceResponse;

$response = new VoiceResponse();
$start = $response->start();
$start->transcription(['statusCallbackUrl' => 'https://example.com/your-callback-url', 'hints' => '$OOV_CLASS_ALPHANUMERIC_SEQUENCE']);

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.start do |start|
    start.transcription(status_callback_url: 'https://example.com/your-callback-url', hints: '$OOV_CLASS_ALPHANUMERIC_SEQUENCE')
end

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Start>
        <Transcription statusCallbackUrl="https://example.com/your-callback-url" hints="$OOV_CLASS_ALPHANUMERIC_SEQUENCE" /> 
    </Start>      
</Response>
```

### enableAutomaticPunctuation

Maps to [Automatic Punctuation](https://cloud.google.com/speech-to-text/docs/automatic-punctuation) in Google Terminology. The `enableAutomaticPunctuation` attribute allows you to enable or disable automatic punctuation in the transcription. When enabled, the transcription engine will automatically insert punctuation marks such as periods, commas, and question marks, improving the readability of the transcribed text.

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const start = response.start();
start.transcription({
  statusCallbackUrl: 'https://example.com/your-callback-url',
  enableAutomaticPunctuation: true,
  transcriptionEngine: 'google',
});

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import VoiceResponse, Start, Transcription

response = VoiceResponse()
start = Start()
start.transcription(
    status_callback_url='https://example.com/your-callback-url',
    enable_automatic_punctuation=True,
    transcription_engine='google')
response.append(start)

print(response)
```

```cs
using System;
using Twilio.TwiML;
using Twilio.TwiML.Voice;


class Example
{
    static void Main()
    {
        var response = new VoiceResponse();
        var start = new Start();
        start.Transcription(statusCallbackUrl: "https://example.com/your-callback-url", enableAutomaticPunctuation: true, transcriptionEngine: "google");
        response.Append(start);

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.voice.Start;
import com.twilio.twiml.voice.Transcription;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Transcription transcription = new Transcription.Builder().statusCallbackUrl("https://example.com/your-callback-url").enableAutomaticPunctuation(true).transcriptionEngine("google").build();
        Start start = new Start.Builder().transcription(transcription).build();
        VoiceResponse response = new VoiceResponse.Builder().start(start).build();

        try {
            System.out.println(response.toXml());
        } catch (TwiMLException e) {
            e.printStackTrace();
        }
    }
}
```

```go
package main

import (
	"fmt"

	"github.com/twilio/twilio-go/twiml"
)

func main() {
	twiml, _ := twiml.Voice([]twiml.Element{
		&twiml.VoiceStart{
			InnerElements: []twiml.Element{
				&twiml.VoiceTranscription{
					EnableAutomaticPunctuation: "true",
					StatusCallbackUrl:          "https://example.com/your-callback-url",
					TranscriptionEngine:        "google",
				},
			},
		},
	})

	fmt.Print(twiml)
}
```

```php
<?php
require_once './vendor/autoload.php';
use Twilio\TwiML\VoiceResponse;

$response = new VoiceResponse();
$start = $response->start();
$start->transcription(['statusCallbackUrl' => 'https://example.com/your-callback-url', 'enableAutomaticPunctuation' => 'true', 'transcriptionEngine' => 'google']);

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.start do |start|
    start.transcription(status_callback_url: 'https://example.com/your-callback-url', enable_automatic_punctuation: true, transcription_engine: 'google')
end

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Start>
        <Transcription statusCallbackUrl="https://example.com/your-callback-url" enableAutomaticPunctuation="true" transcriptionEngine="google" /> 
    </Start>      
</Response>
```

### intelligenceService

The `intelligenceService` attribute allows you to opt-in to sending your Real-Time Transcript to [Twilio Conversation Intelligence (classic)](/docs/conversation-intelligence-classic) for integrated post-processing. By enabling storage and analysis of calls transcribed in real-time, this feature helps you extract actionable insights from transcripts. This runs in parallel to [`statusCallbackUrl`](#statuscallbackurl) which streams utterance-level data and other session lifecycle events to your app during the call.

When enabled, this feature performs the following functions:

1. **Persists Live Transcripts**: Stores real-time transcriptions in Conversation Intelligence (classic)'s historical log for future reference and analysis.
2. **Runs Post-Call Language Operators**: Triggers [Language Operators](/docs/conversation-intelligence-classic/language-operators) configured in the referenced Intelligence Service. After the call ends, the Intelligence Service generates AI-powered insights and performs actions.

To use this feature, you need to meet the following conditions.

* Have or [create](https://console.twilio.com/us1/develop/conversational-intelligence/services) an Intelligence Service.
* Set the `intelligenceService` parameter to the Intelligence Service SID or unique name.

Important Notes:

* To transcribe a call without recording it, pass an `intelligenceService` parameter without passing a `statusCallbackUrl` parameter.
* Language Operators are executed after the Real-Time Transcription session concludes, either automatically through the call ending or manually by [stopping the live transcription](#stop-a-real-time-transcription).

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const start = response.start();
start.transcription({
  statusCallbackUrl: 'https://example.com/your-callback-url',
  intelligenceService: 'GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
});

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import VoiceResponse, Start, Transcription

response = VoiceResponse()
start = Start()
start.transcription(
    statusCallbackUrl='https://example.com/your-callback-url',
    intelligenceService='GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
response.append(start)

print(response)
```

```cs
using System;
using Twilio.TwiML;
using Twilio.TwiML.Voice;


class Example
{
    static void Main()
    {
        var response = new VoiceResponse();
        var start = new Start();
        start.Transcription(statusCallbackUrl: "https://example.com/your-callback-url", intelligenceService: "GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        response.Append(start);

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.voice.Start;
import com.twilio.twiml.voice.Transcription;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Transcription transcription = new Transcription.Builder().statusCallbackUrl("https://example.com/your-callback-url").intelligenceService("GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").build();
        Start start = new Start.Builder().transcription(transcription).build();
        VoiceResponse response = new VoiceResponse.Builder().start(start).build();

        try {
            System.out.println(response.toXml());
        } catch (TwiMLException e) {
            e.printStackTrace();
        }
    }
}
```

```go
package main

import (
	"fmt"

	"github.com/twilio/twilio-go/twiml"
)

func main() {
	twiml, _ := twiml.Voice([]twiml.Element{
		&twiml.VoiceStart{
			InnerElements: []twiml.Element{
				&twiml.VoiceTranscription{
					IntelligenceService: "GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
					StatusCallbackUrl:   "https://example.com/your-callback-url",
				},
			},
		},
	})

	fmt.Print(twiml)
}
```

```php
<?php
require_once './vendor/autoload.php';
use Twilio\TwiML\VoiceResponse;

$response = new VoiceResponse();
$start = $response->start();
$start->transcription(['statusCallbackUrl' => 'https://example.com/your-callback-url', 'intelligenceService' => 'GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa']);

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.start do |start|
    start.transcription(status_callback_url: 'https://example.com/your-callback-url', intelligence_service: 'GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
end

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Start>
        <Transcription statusCallbackUrl="https://example.com/your-callback-url" intelligenceService="GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" /> 
    </Start>      
</Response>
```

### conversationConfiguration

The `conversationConfiguration` attribute routes the call into [Conversation Orchestrator](/docs/conversations/orchestrator) using the specified configuration's grouping rules to find or create a conversation. This enables active ingestion of voice calls into Conversation Orchestrator through TwiML.

For usage examples and parameter precedence rules, see [Active TwiML for voice](/docs/conversations/orchestrator/concepts/ingestion#active-twiml-for-voice).

### conversationId

The `conversationId` attribute routes the call directly to an existing [Conversation Orchestrator](/docs/conversations/orchestrator) conversation, bypassing grouping rules. Use this attribute when you want to add a call to a conversation that already exists.

If both `conversationConfiguration` and `conversationId` are present, `conversationId` takes precedence and the configuration is ignored for routing.

For usage examples and parameter precedence rules, see [Active TwiML for voice](/docs/conversations/orchestrator/concepts/ingestion#active-twiml-for-voice).

### Supported language and model combinations

Twilio's transcription service supports a variety of languages and models. The following examples are specific to Google Speech-to-Text. Depending on the language, certain attributes like `speechModel`, `profanityFilter`, and `enableAutomaticPunctuation` may have different levels of support.

To verify support for languages and speech models, see the following resources:

* [Google speech-to-text supported languages](https://cloud.google.com/speech-to-text/v2/docs/speech-to-text-supported-languages)
* [Deepgram Nova-2 supported languages](https://developers.deepgram.com/docs/models-languages-overview#nova-2)
* [Deepgram Nova-3 supported (monolingual) language variants](https://developers.deepgram.com/docs/models-languages-overview#nova-3) documentation.

> \[!WARNING]
>
> These examples are subject to changes. To verify support for languages and speech models, customers should always refer back to the [Google Speech-to-Text Supported Languages](https://cloud.google.com/speech-to-text/v2/docs/speech-to-text-supported-languages), the [Deepgram `nova-2` Supported Languages](https://developers.deepgram.com/docs/models-languages-overview#nova-2). or the [`nova-3` Supported (monolingual) Language variants](https://developers.deepgram.com/docs/models-languages-overview#nova-3) documents, as appropriate.

#### Example 1: Chinese (Simplified, China) with Chirp Model

This example demonstrates how to configure transcription for Chinese (Simplified, China) using the Chirp Model with support for automatic punctuation.

```xml
<Response>
  <Start>
    <Transcription 
      transcriptionEngine="google" 
      languageCode="cmn-Hans-CN" 
      speechModel="chirp" 
      enableAutomaticPunctuation="true" />
  </Start>
</Response>
```

In this example, the `profanityFilter` attribute, `hints` attribute, and other advanced features are not supported for this configuration.

#### Example 2: Spanish (Spain) with Telephony Model

This example demonstrates how to configure transcription for Spanish (Spain) using the telephony model with full support for all attributes.

```xml
<Response>
  <Start>
    <Transcription 
      transcriptionEngine="google" 
      languageCode="es-ES" 
      speechModel="telephony" 
      profanityFilter="true" 
      enableAutomaticPunctuation="true" />
  </Start>
</Response>
```

In this example, the telephony model supports automatic punctuation and profanity filter, but not model adaptation (e.g., `hints`).

#### Example 3: Hindi (India) with Short Model

This example demonstrates how to configure transcription for Hindi (India) using the short model with support for specific attributes.

```xml
<Response>
  <Start>
    <Transcription 
      transcriptionEngine="google" 
      languageCode="hi-IN" 
      speechModel="short" 
      enableAutomaticPunctuation="true" 
      profanityFilter="true" 
      hints="संपर्क, सेवा, समर्थन, ग्राहक" 
      modelAdaptation="true" />
  </Start>
</Response>
```

In this example, the short model supports automatic punctuation, profanity filter, model adaptation, and hints.

#### Example 4: French (Canada) with Long Model

This example demonstrates how to configure transcription for French (Canada) using the long model with support for specific attributes.

```xml
<Response>
  <Start>
    <Transcription 
      transcriptionEngine="google" 
      languageCode="fr-CA" 
      speechModel="long" 
      hints="service à la clientèle, rendez-vous, commande" />
  </Start>
</Response>
```

In this example, the long model supports model adaptation through hints, but does not support automatic punctuation, profanity filter, or spoken punctuation.

## Track labels

If specifying `inboundTrackLabel` or `outboundTrackLabel`, the call direction mapping table below can be used as a guide.

| Track          | Call Direction | [Call Resource](/docs/voice/api/call-resource) Mapping | TrackLabel                                                                                              |
| -------------- | -------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| Inbound-track  | Outbound       | TO #                                                   | Label for "who is being called" in an outbound call from Twilio (e.g., `inboundTrackLabel`="customer"). |
| Outbound-track | Outbound       | FROM #                                                 | Label for "who is calling" in an outbound call from Twilio (e.g., `outboundTrackLabel`="agent").        |
| Inbound-track  | Inbound        | FROM #                                                 | Label for "who is being called" in an inbound call to Twilio (e.g., `inboundTrackLabel`="agent").       |
| Outbound-track | Inbound        | TO #                                                   | Label for "who is calling" in an inbound call to Twilio (e.g., `outboundTrackLabel`="customer").        |

Note: A call that has an "outbound" direction is a call that is outbound from Twilio, i.e., from Twilio to a customer.

## Stop a Real-Time Transcription

If you provided a `name` attribute when starting a Real-Time Transcription session, you can stop a Real-Time Transcription using TwiML or via API.

Given a Real-Time Transcription that was started with the following TwiML instructions:

```xml
<Response>
  <Start>
    <Transcription name="Contact center transcription" />
  </Start>
</Response>
```

You can stop the Real-Time Transcription with the following TwiML instructions:

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const stop = response.stop();
stop.transcription({ name: 'Contact center transcription' });

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import VoiceResponse, Stop, Transcription

response = VoiceResponse()
stop = Stop()
stop.transcription(name='Contact center transcription')
response.append(stop)

print(response)
```

```cs
using System;
using Twilio.TwiML;
using Twilio.TwiML.Voice;


class Example
{
    static void Main()
    {
        var response = new VoiceResponse();
        var stop = new Stop();
        stop.Transcription(name: "Contact center transcription");
        response.Append(stop);

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.voice.Stop;
import com.twilio.twiml.voice.Transcription;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Transcription transcription = new Transcription.Builder().name("Contact center transcription").build();
        Stop stop = new Stop.Builder().transcription(transcription).build();
        VoiceResponse response = new VoiceResponse.Builder().stop(stop).build();

        try {
            System.out.println(response.toXml());
        } catch (TwiMLException e) {
            e.printStackTrace();
        }
    }
}
```

```go
package main

import (
	"fmt"

	"github.com/twilio/twilio-go/twiml"
)

func main() {
	twiml, _ := twiml.Voice([]twiml.Element{
		&twiml.VoiceStop{
			InnerElements: []twiml.Element{
				&twiml.VoiceTranscription{
					Name: "Contact center transcription",
				},
			},
		},
	})

	fmt.Print(twiml)
}
```

```php
<?php
require_once './vendor/autoload.php';
use Twilio\TwiML\VoiceResponse;

$response = new VoiceResponse();
$stop = $response->stop();
$stop->transcription(['name' => 'Contact center transcription']);

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.stop do |stop|
    stop.transcription(name: 'Contact center transcription')
end

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Stop>
        <Transcription name="Contact center transcription" />
    </Stop>
</Response>
```

If a `name` was not provided, you can stop an in-progress real-time Transcription via API using the `SID` of the Transcription. Learn more about the [Transcriptions subresource](/docs/voice/api/realtime-transcription-resource#stop-a-real-time-transcription).

## HIPAA eligibility and PCI compliance

HIPAA eligibility and PCI compliance varies depending on your selected speech model and whether you use webhooks or persisted transcripts. To determine whether your implementation may be HIPAA eligible or PCI compliant, see the following table.

| Transcription engine | Speech model                              | Transcript destination           | HIPAA eligibility | PCI-compliant |
| :------------------- | :---------------------------------------- | :------------------------------- | :---------------- | :------------ |
| Google               | Any supported model                       | Webhooks                         | Yes               | Yes           |
| Google               | Any supported model                       | Persisted Transcript             | Yes               | No            |
| Deepgram             | `nova-2` or `nova-3` monolingual variants | Webhooks                         | Yes               | Yes           |
| Deepgram             | `nova-2` or `nova-3` monolingual variants | Persisted Transcript             | Yes               | No            |
| Deepgram             | `nova-3` multilingual                     | Webhooks or Persisted Transcript | No                | No            |

## AI nutrition facts

> \[!NOTE]
>
> Real-Time Transcription, including `<Transcriptions>` TwiML noun and API, uses third-party artificial technology and machine learning technologies.
>
> [Twilio's AI Nutrition Facts](https://nutrition-facts.ai/) provide an overview of the AI feature you're using, so you can better understand how the AI is working with your data. Real-Time Transcriptions AI qualities are outlined in the following **Speech to Text Transcriptions - Programmable Voice Nutrition Facts** label. For more information and the glossary regarding the AI Nutrition Facts Label, please refer to [Twilio's AI Nutrition Facts page](https://nutrition-facts.ai/).

```json
{"name":"Speech to Text Transcriptions - Programmable Voice, Twilio Video, and Conversation Intelligence (classic)","description":"Generate speech to text voice transcriptions (real-time and post-call) in Programmable Voice, Twilio Video, and Conversation Intelligence (classic).","modelType":"Generative and Predictive - Automatic Speech Recognition","optional":true,"baseModel":"Deepgram Speech-to-Text, Google Speech-to-Text, Amazon Transcribe","aiPrivacyLevel":null,"trustLayer":{"baseModelCustomerData":{"value":false,"comments":["Conversation Intelligence (classic), Programmable Voice, and Twilio Video only use the default Base Model provided by the Model Vendor. The Base Model is not trained using customer data."]},"vendorModelCustomerData":{"value":false,"comments":["Conversation Intelligence (classic), Programmable Voice, and Twilio Video only use the default Base Model provided by the Model Vendor. The Base Model is not trained using customer data."]},"trainingDataAnonymized":{"value":null,"comments":["Base Model is not trained using any customer data."]},"dataDeletion":{"value":true,"comments":["Transcriptions are deleted by the customer using the Conversation Intelligence (classic) API or when a customer account is deprovisioned."]},"auditing":{"value":true,"comments":["The customer views output in the Conversation Intelligence (classic) API or Transcript Viewer."]},"dataStorage":"Until the customer deletes","compliance":{"loggingAndAuditTrails":{"value":true,"comments":["The customer can listen to the input (recording) and view the output (transcript)."]},"guardrails":{"value":true,"comments":["The customer can listen to the input (recording) and view the output (transcript). "]}},"inputOutputConsistency":{"value":true,"comments":["The customer is responsible for human review."]}},"linksAndResources":"https://www.twilio.com/docs/conversation-intelligence-classic"}
```
