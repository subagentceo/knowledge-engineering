# TwiML™ Voice: \<Record>

The `<Record>` verb records the caller's voice and returns to you the URL of a file containing the audio recording. You can optionally generate text transcriptions of recorded calls by setting the `transcribe` attribute of the `<Record>` verb to `true`.

> \[!WARNING]
>
> If you choose to record voice or video calls, you need to comply with certain laws and regulations, including those regarding obtaining consent to record (such as California's Invasion of Privacy Act and similar laws in other jurisdictions). Additional information on the legal implications of call recording can be found [in the "Legal Considerations with Recording Voice and Video Communications" Help Center article](https://help.twilio.com/hc/en-us/articles/360011522553-Legal-Considerations-with-Recording-Voice-and-Video-Communications).
>
> *Notice*: Twilio recommends that you consult with your legal counsel to make sure that you are complying with all applicable laws in connection with communications you record or store using Twilio.

> \[!NOTE]
>
> Call recordings aren't Payment Card Industry (PCI) compliant by default. To use Voice Recordings in a [PCI workflow](/docs/voice/pci-workflows), [enable PCI Mode in the Twilio Console](https://www.twilio.com/console/voice/settings).
>
> To transcribe voice recordings, use the \<Transcription> TwiML noun. Native and Marketplace transcriptions aren't available when PCI Mode is enabled.

## Verb Attributes \[#attributes]

The `<Record>` verb supports the following attributes that modify its behavior:

| Attribute Name                                                                | Allowed Values                                                                                                                                                                                                      | Default Value        |
| :---------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------- |
| [action](#attributes-action)                                                  | Relative or absolute URL                                                                                                                                                                                            | current document URL |
| [method](#attributes-method)                                                  | `GET`, `POST`                                                                                                                                                                                                       | `POST`               |
| [timeout](#attributes-timeout)                                                | Positive integer                                                                                                                                                                                                    | `5`                  |
| [finishOnKey](#attributes-finishonkey)                                        | Any digit, `#`, `*`                                                                                                                                                                                                 | `1234567890*#`       |
| [maxLength](#attributes-maxlength)                                            | Integer greater than 1 and less than or equal to 14400 (4 hours) or 86400 (24 hours). The maximum depends on your account's maximum call duration settings. [See below for more information](#attributes-maxlength) | `3600` (1 hour)      |
| [playBeep](#attributes-playBeep)                                              | `true`, `false`                                                                                                                                                                                                     | `true`               |
| [trim](#attributes-trim)                                                      | `trim-silence`, `do-not-trim`                                                                                                                                                                                       | `trim-silence`       |
| [recordingStatusCallback](#attributes-recording-status-callback)              | relative or absolute URL                                                                                                                                                                                            | None                 |
| [recordingStatusCallbackMethod](#attributes-recording-status-callback-method) | `GET`, `POST`                                                                                                                                                                                                       | `POST`               |
| [recordingStatusCallbackEvent](#attributes-recording-status-callback-event)   | `in-progress`, `completed`, `absent`                                                                                                                                                                                | `completed`          |
| [transcribe](#transcribe)                                                     | `true`, `false`                                                                                                                                                                                                     | `false`              |
| [transcribeCallback](#attributes-transcribe-callback)                         | Relative or absolute URL                                                                                                                                                                                            | None                 |
| [recordingConfigurationId](#attributes-recording-configuration-id)            | A string                                                                                                                                                                                                            | None                 |

Use one or more of these attributes in a `<Record>` verb like so:

Using attributes in a Record verb

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
response.record({
  timeout: 10,
  transcribe: true,
});

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Record, VoiceResponse

response = VoiceResponse()
response.record(timeout=10, transcribe=True)

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
        response.Record(timeout: 10, transcribe: true);

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.voice.Record;
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Record record = new Record.Builder().timeout(10).transcribe(true)
            .build();
        VoiceResponse response = new VoiceResponse.Builder().record(record)
            .build();

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
		&twiml.VoiceRecord{
			Timeout:    "10",
			Transcribe: "true",
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
$response->record(['timeout' => 10, 'transcribe' => 'true']);

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.record(timeout: 10, transcribe: true)

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Record timeout="10" transcribe="true" />
</Response>
```

### action \[#attributes-action]

The `action` attribute takes a relative or absolute URL as a value. When recording is finished, Twilio will make a `GET` or `POST` request to this URL including the parameters below. If no `action` is provided, `<Record>` will request the current document's URL.

After making this request, **Twilio will continue the current call using the TwiML received in your response**. Keep in mind that by default Twilio will re-request the current document's URL. This can lead to unwanted looping behavior if you're not careful. Any TwiML verbs occurring after a `<Record>` are unreachable.

> \[!NOTE]
>
> By default, silent recordings are saved by Twilio. If you do not need to retain silent recordings, reach out to [Twilio Support](https://help.twilio.com).

> \[!WARNING]
>
> When [modifying a live call](/docs/voice/tutorials/how-to-modify-calls-in-progress) to redirect to a \<Record> verb an action URL must be provided. Failure to provide an action URL will result in an [11100 error](/docs/api/errors/11100).

> \[!WARNING]
>
> If you **started or updated** a `<Call>` that included a `twiml` parameter, the `action` URLs for `<Record>`, `<Gather>`, and `<Pay>` must be **absolute**.
>
> The [Call Resource API Docs](/docs/voice/api/call-resource) have language-specific examples of creating and updating Calls with TwiML:
>
> * To learn how to create a call with a `twiml` parameter, consult [Create a Call Resource](/docs/voice/api/call-resource#create-a-call-resource).
> * To learn how to update a call with a `twiml` parameter, consult [Update a Call Resource](/docs/voice/api/call-resource#update-a-call-resource).

#### Request Parameters \[#attributes-action-parameters]

Twilio will pass the following parameters in addition to the [standard TwiML Voice request parameters](/docs/voice/twiml#request-parameters) with
its request to the `action` URL:

| Parameter         | Description                                                                                                                                                                                                                                                   |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| RecordingUrl      | The URL of the recorded audio. The recording file may not yet be accessible when the `action` callback is sent. Use [recordingStatusCallback](#attributes-recording-status-callback) for reliable notification on when the recording is available for access. |
| RecordingDuration | The duration of the recorded audio (in seconds). To get a final accurate recording duration after any trimming of silence, use [recordingStatusCallback](#attributes-recording-status-callback).                                                              |
| Digits            | The key (if any) pressed to end the recording, or `hangup` if the caller hung up.                                                                                                                                                                             |

A request to the `RecordingUrl` will return a recording in binary WAV audio format by default. To request the recording in MP3 format, append `".mp3"` to the `RecordingUrl` value.

### method \[#attributes-method]

The `method` attribute takes the value `GET` or `POST`. This tells Twilio whether to request the `action` URL via `HTTP GET` or `POST`. This attribute is modeled after the HTML form `method` attribute. `POST` is the default value.

### timeout \[#attributes-timeout]

The `timeout` attribute tells Twilio to end the recording after a number of seconds of silence has passed. To disable this feature, set `timeout` to 0. The default is 5 seconds.

> \[!WARNING]
>
> The `timeout` value applies for a period in which audio is received, but it is silent. For a period in which no RTP audio data are received at all, the recording is essentially unaware of silent periods and proceeds to record just as usual.

### finishOnKey \[#attributes-finishonkey]

The `finishOnKey` attribute lets you choose a set of digits that, when entered, end the recording. For example, if you set `finishOnKey` to `#` and the caller presses the **#** key, Twilio will immediately stop recording and submit `RecordingUrl`, `RecordingDuration`, and `#` as parameters in a request to the `action` URL. The allowed values are the digits 0-9, # and \*. The default is `1234567890*#` — ie. any key will end the recording. Unlike `<Gather>`, you may specify more than one character as a `finishOnKey` value.

> \[!WARNING]
>
> In some instances, when using the `finishOnKey` attribute, the last part of the audio (approximately the one second before the key is pressed) may not be recorded.

### maxLength \[#attributes-maxlength]

The `maxLength` attribute lets you set the maximum length for the recording in seconds. If you set `maxLength` to 30, the recording will automatically end after 30 seconds of recorded time has elapsed. The defaults are 3600 seconds (one hour) for a normal recording, and 120 seconds (two minutes) for a transcribed recording. Twilio Voice SDK calls using `<Record>` are limited to 600 seconds (ten minutes).

The maximum value of the `maxLength` attribute is limited by the maximum length set for your Voice Calls. The default maximum Call length is 4 hours (14400 seconds), and the maximum possible length is 24 hours (86400 seconds). You can update the maximum Call length to 24 hours in the [Twilio Console in the Voice Settings page](https://www.twilio.com/console/voice/settings) under "24-Hour Maximum Call Duration".

### playBeep \[#attributes-playBeep]

The `playBeep` attribute allows you to toggle between playing a sound before the start of a recording. If you set the value to `false`, no beep sound will be played.

### trim \[#attributes-trim]

The `trim` attribute lets you specify whether to trim leading and trailing silence from your audio files. The default is `trim-silence`, which removes any silence at the beginning and end of your recording. This may cause the duration of the recording to be slightly less than the duration of the call.

### recordingStatusCallback \[#attributes-recording-status-callback]

The `recordingStatusCallback` attribute takes a relative or absolute URL as an argument. If a `recordingStatusCallback` URL is given, Twilio will make a `GET` or `POST` request to the specified URL when the recording is available to access.

#### Request Parameters \[#attributes-recording-status-callback-parameters]

Twilio will pass the following parameters with its request to the `recordingStatusCallback` URL:

| Parameter         | Description                                                                                                                     |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| AccountSid        | The unique identifier of the Account responsible for this recording.                                                            |
| CallSid           | A unique identifier for the call associated with the recording.                                                                 |
| RecordingSid      | The unique identifier for the recording.                                                                                        |
| RecordingUrl      | The URL of the recorded audio.                                                                                                  |
| RecordingStatus   | The status of the recording. Possible values are: `completed`, `failed`.                                                        |
| RecordingDuration | The length of the recording, in seconds.                                                                                        |
| RecordingChannels | The number of channels in the final recording file as an integer. Only one channel is supported for the `<Record>` verb.        |
| RecordingSource   | The initiation method used to create this recording. `RecordVerb` is returned for recordings initiated via the `<Record>` verb. |

### recordingStatusCallbackMethod \[#attributes-recording-status-callback-method]

This attribute indicates which HTTP method to use when requesting `recordingStatusCallback`. It defaults to `POST`.

### recordingStatusCallbackEvent \[#attributes-recording-status-callback-event]

The `recordingStatusCallbackEvent` allows you to specify which recording status changes should generate a webhook to the URL specified in the `recordingStatusCallback` attribute. The available values are:

* `in-progress`: the recording has started.
* `completed`: the recording is complete and available.
* `absent`: the recording is absent and inaccessible.

To specify more than one value, separate each with a space. The default value is `completed`.

### transcribe \[#transcribe]

The `transcribe` attribute tells Twilio that you would like a text representation of the audio of the recording. Twilio will pass this recording to our speech-to-text engine and attempt to convert the audio to human readable text. The `transcribe` option is not enabled by default. If you do not wish to perform transcription, do not include the `transcribe` attribute.

[callstatus]: /docs/voice/twiml#request-parameters

> \[!WARNING]
>
> 1. Transcription is a paid feature. If you include a `transcribe` or `transcribeCallback` attribute on your `Record` verb, your account will be charged. See the [pricing](https://www.twilio.com/en-us/voice/pricing/us) page for our transcription prices.
> 2. Transcription is only supported in American English.
>
> Additionally, transcription is currently limited to recordings initiated via the TwiML `<Record>` verb with a duration greater than two seconds and less than 120 seconds. If you request a transcription for a recording outside these duration limits, Twilio will write a warning to your debug log rather than transcribe the recording.

### transcribeCallback \[#attributes-transcribe-callback]

The `transcribeCallback` attribute is used in conjunction with the `transcribe` attribute. It allows you to specify a URL to which Twilio will make an asynchronous `POST` request when the transcription is complete. This is not a request for TwiML and the response will not change call flow, but the request will contain the standard TwiML request parameters as well as transcription specific ones.

If `transcribeCallback` is specified, then you will also need to specify `transcribe=true`; it is no longer implicit. If you specify `transcribe=true` *without* a `transcribeCallback`, the completed transcription will be stored for you to retrieve later (see the REST API [**Transcriptions**](/docs/voice/api/recording-transcription) section), but Twilio will not asynchronously notify your application.

Twilio will not make a request to the provided `transcribeCallback` URL if the voice recording is [missing or absent](https://help.twilio.com/hc/en-us/articles/360014252253-Missing-Programmable-Voice-Recordings).

> \[!WARNING]
>
> The `transcribeCallback` URL attribute is considered [Not PII](/docs/glossary/what-is-personally-identifiable-information-pii#fields-marked-not-pii).

#### Request Parameters \[#attributes-transcribecallback-parameters]

Twilio will pass the following parameters with its request to the `transcribeCallback` URL:

| Parameter           | Description                                                                                                                                                                                                                                                                                                                                 |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| TranscriptionSid    | The unique 34-character ID of the transcription.                                                                                                                                                                                                                                                                                            |
| TranscriptionText   | The text of the transcription.                                                                                                                                                                                                                                                                                                              |
| TranscriptionStatus | The status of the transcription attempt: either `completed` or `failed`.                                                                                                                                                                                                                                                                    |
| TranscriptionUrl    | The URL for the transcription's REST API resource.                                                                                                                                                                                                                                                                                          |
| RecordingSid        | The unique 34-character ID of the recording from which the transcription was generated.                                                                                                                                                                                                                                                     |
| RecordingUrl        | The URL for the transcription's source recording resource.                                                                                                                                                                                                                                                                                  |
| CallSid             | A unique identifier for this call, generated by Twilio.                                                                                                                                                                                                                                                                                     |
| AccountSid          | Your Twilio account ID. It is 34 characters long, and always starts with the letters `AC`.                                                                                                                                                                                                                                                  |
| From                | The phone number or client identifier of the party that initiated the call. Phone numbers are formatted with a `+` and country code, eg. `+16175551212` (\[E.164]\[e164] format). Client identifiers begin with the `client:` URI scheme; for example, for a call from a client named `tommy`, the `From` parameter will be `client:tommy`. |
| To                  | The phone number or client identifier of the called party. Phone numbers are formatted with a `+` and country code, eg. `+16175551212` (\[E.164]\[e164] format). Client identifiers begin with the `client:` URI scheme; for example, for a call to a client named `joey`, the `To` parameter will be `client:joey`.                        |
| CallStatus          | A descriptive status for the call. The value is one of `queued`, `ringing`, `in-progress`, `completed`, `busy`, `failed`, or `no-answer`. See the [**CallStatus**][callstatus] section for more details.                                                                                                                                    |
| ApiVersion          | The version of the Twilio API used to handle this call. For incoming calls, this is determined by the API version set on the called number. For outgoing calls, this is the API version used by the outgoing call's REST API request.                                                                                                       |
| Direction           | A string describing the direction of the call: `inbound` for inbound calls, `outbound-api` for calls initiated via the REST API, or `outbound-dial` for calls initiated by a `<Dial>` verb.                                                                                                                                                 |
| ForwardedFrom       | This parameter is set only when Twilio receives a forwarded call, but its value depends on the caller's carrier including information when forwarding. Not all carriers support passing this information.                                                                                                                                   |

### recordingConfigurationId \[#attributes-recording-configuration-id]

The `recordingConfigurationId` attribute specifies the identifier of a [Recording Configuration](/docs/configurations/recording-configuration-resource) to use when creating and processing the recording.

## Nesting Rules \[#nesting-rules]

You can't nest any verbs within `<Record>` and you can't nest `<Record>` within any other verbs.

## See Also \[#see-also]

* [Twilio REST API Recording resource](/docs/voice/api/recording)
* [Twilio REST API Transcription resource](/docs/voice/api/recording-transcription)

## Examples \[#examples]

### Example 1: Record \[#examples-1]

Twilio will execute the `<Record>` verb causing the caller to hear a beep and the recording to start. If the caller is silent for more than five seconds, hits the **#** key, or the recording `maxlength` time is hit, Twilio will make an `HTTP POST` request to the default `action` URL (ie. the current document URL) with the parameters `RecordingUrl` and `RecordingDuration`.

Record example

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
response.record();

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Record, VoiceResponse

response = VoiceResponse()
response.record()

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
        response.Record();

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.voice.Record;
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Record record = new Record.Builder().build();
        VoiceResponse response = new VoiceResponse.Builder().record(record)
            .build();

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
		&twiml.VoiceRecord{},
	})

	fmt.Print(twiml)
}
```

```php
<?php
require_once './vendor/autoload.php';
use Twilio\TwiML\VoiceResponse;

$response = new VoiceResponse();
$response->record();

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.record

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- page located at http://example.com/simple_record.xml -->
<Response>  
    <Record/>  
</Response>
```

### Example 2: Record a voicemail \[#examples-2]

This example shows a voicemail prompt. The caller is asked to leave a message at the beep. The `<Record>` verb beeps and begins recording up to 20 seconds of audio.

Record a voicemail

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
response.say(
  'Please leave a message at the beep.\nPress the star key when finished.'
);
response.record({
  action: 'http://foo.edu/handleRecording.php',
  method: 'GET',
  maxLength: 20,
  finishOnKey: '*',
});
response.say('I did not receive a recording');

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Record, VoiceResponse, Say

response = VoiceResponse()
response.say(
    'Please leave a message at the beep.\nPress the star key when finished.'
)
response.record(
    action='http://foo.edu/handleRecording.php',
    method='GET',
    max_length=20,
    finish_on_key='*'
)
response.say('I did not receive a recording')

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
        response
            .Say("Please leave a message at the beep.\nPress the star key when finished.");
        response.Record(action: new Uri("http://foo.edu/handleRecording.php"),
            method: Twilio.Http.HttpMethod.Get, maxLength: 20,
            finishOnKey: "*");
        response.Say("I did not receive a recording");

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.voice.Record;
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.voice.Say;
import com.twilio.twiml.TwiMLException;
import com.twilio.http.HttpMethod;

public class Example {
    public static void main(String[] args) {
        Say say = new Say
            .Builder("Please leave a message at the beep.\nPress the star key when finished.").build();
        Record record = new Record.Builder()
            .action("http://foo.edu/handleRecording.php").method(HttpMethod
            .GET).maxLength(20).finishOnKey("*").build();
        Say say2 = new Say.Builder("I did not receive a recording").build();
        VoiceResponse response = new VoiceResponse.Builder().say(say)
            .record(record).say(say2).build();

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
		&twiml.VoiceSay{
			Message: `
	Please leave a message at the beep. 
	Press the star key when finished.
`,
		},
		&twiml.VoiceRecord{
			Action:      "http://foo.edu/handleRecording.php",
			FinishOnKey: "*",
			MaxLength:   "20",
			Method:      "GET",
		},
		&twiml.VoiceSay{
			Message: "I did not receive a recording",
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
$response->say('Please leave a message at the beep.\nPress the star key when finished.');
$response->record(['action' => 'http://foo.edu/handleRecording.php',
    'method' => 'GET', 'maxLength' => 20, 'finishOnKey' => '*']);
$response->say('I did not receive a recording');

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response
  .say(message: 'Please leave a message at the beep.\nPress the star key when finished.')
response.record(action: 'http://foo.edu/handleRecording.php', method: 'GET',
                max_length: 20, finish_on_key: '*')
response.say(message: 'I did not receive a recording')

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- page located at http://example.com/voicemail_record.xml -->
<Response>
    <Say>
        Please leave a message at the beep. 
        Press the star key when finished. 
    </Say>
    <Record 
        action="http://foo.edu/handleRecording.php"
        method="GET" 
        maxLength="20"
        finishOnKey="*"
        />
    <Say>I did not receive a recording</Say>
</Response>
```

* If the caller speaks for less than 20 seconds and is then silent for five seconds, Twilio makes a `GET` request to the `action` URL. The `<Say>` verb is never reached.
* If the caller speaks for the full 20 seconds, Twilio makes a `GET` request to the `action` URL. The `<Say>` verb is never reached.

### Example 3: Transcribe a recording \[#examples-3]

Twilio will record the caller. When the recording is complete, Twilio will transcribe the recording and make an `HTTP POST` request to the `transcribeCallback` URL with a parameter containing a transcription of the recording.

Transcribe a recording

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
response.record({
  transcribe: true,
  transcribeCallback: '/handle_transcribe.php',
});

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Record, VoiceResponse

response = VoiceResponse()
response.record(transcribe=True, transcribe_callback='/handle_transcribe.php')

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
        response.Record(transcribe: true,
            transcribeCallback: new Uri("/handle_transcribe.php"));

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.voice.Record;
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Record record = new Record.Builder().transcribe(true)
            .transcribeCallback("/handle_transcribe.php").build();
        VoiceResponse response = new VoiceResponse.Builder().record(record)
            .build();

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
		&twiml.VoiceRecord{
			Transcribe:         "true",
			TranscribeCallback: "/handle_transcribe.php",
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
$response->record(['transcribe' => 'true',
    'transcribeCallback' => '/handle_transcribe.php']);

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.record(transcribe: true, transcribe_callback: '/handle_transcribe.php')

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- page located at http://example.com/record_and_transcribe.xml -->
<Response>
    <Record transcribe="true" transcribeCallback="/handle_transcribe.php"/>
</Response>
```

## Hints and advanced uses \[#hints]

The recording duration may be shorter than the time a caller spends recording. The duration difference can be due to:

* Twilio trimming leading and trailing silence from your audio files
* No RTP (Real-time Transport Protocol) audio data being received during recording
