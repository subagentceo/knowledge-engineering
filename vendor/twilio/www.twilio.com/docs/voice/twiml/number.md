# TwiML™ Voice: \<Number>

`<Number>` is a noun for the TwiML verb [`<Dial>`](/docs/voice/twiml/dial) and it specifies a phone number to dial. Using the noun's attributes you can specify particular behaviors that Twilio should apply when dialing the number.

You can use up to ten `<Number>` nouns within a `<Dial>` verb to simultaneously call all of them at once. The first call to pick up is connected to the current call and the rest are hung up. For each `<Number>` noun you can specify what call progress events you want to receive webhooks for.

## Noun Attributes \[#attributes]

The `<Number>` noun supports the following attributes that modify its behavior:

| Attribute Name                                                                           | Allowed Values                                          | Default Value |
| :--------------------------------------------------------------------------------------- | :------------------------------------------------------ | :------------ |
| [sendDigits](#attributes-senddigits)                                                     | digit (`0`-`9`), `A`, `B`, `C`, `D`, `W`, `w`, `#`, `*` | None          |
| [url](#attributes-url)                                                                   | Relative or absolute URL                                | None          |
| [method](#attributes-method)                                                             | `GET`, `POST`                                           | `POST`        |
| [byoc](#attributes-byoc)                                                                 | BYOC Trunk SID                                          | None          |
| [statusCallbackEvent](#attributes-status-callback-event)                                 | `initiated`, `ringing`, `answered`, `completed`         | `completed`   |
| [statusCallback](#attributes-status-callback)                                            | Any URL                                                 | None          |
| [statusCallbackMethod](#attributes-status-callback-method)                               | `GET`, `POST`                                           | `POST`        |
| [machineDetection](#attributes-machine-detection)                                        | `Enable`, `DetectMessageEnd`                            | None          |
| [machineDetectionTimeout](#attributes-machine-detection-timeout)                         | `3`-`60`                                                | `30`          |
| [machineDetectionSpeechThreshold](#attributes-machine-detection-speech-threshold)        | `1000`-`6000`                                           | `2400`        |
| [machineDetectionSpeechEndThreshold](#attributes-machine-detection-speech-end-threshold) | `500`-`5000`                                            | `1200`        |
| [machineDetectionSilenceTimeout](#attributes-machine-detection-silence-timeout)          | `2000`-`10000`                                          | `5000`        |
| [amdStatusCallback](#attributes-amd-status-callback)                                     | Any URL                                                 | None          |
| [amdStatusCallbackMethod](#attributes-amd-status-callback-method)                        | `GET`, `POST`                                           | `POST`        |

Phone numbers should be formatted in [E.164 format](/docs/glossary/what-e164) with a `+` and country code, for example: `+16175551212`. Twilio will also accept unformatted US numbers, e.g., (415) 555-1212 or 415-555-1212.

### sendDigits \[#attributes-senddigits]

The `sendDigits` attribute tells Twilio to play DTMF tones when the call is answered. This is useful when dialing a phone number and an extension. Twilio will dial the number, and when the automated system picks up, send the DTMF tones to connect to the extension.

Include lowercase `w` to introduce a `0.5s` pause between DTMF tones and uppercase `W` to introduce a `1s` pause between DTMF tones. For example, `1w2` will tell Twilio to pause `0.5s` before playing DTMF tone `2`.

### url \[#attributes-url]

The `url` attribute allows you to specify a URL that will return a TwiML response to be run on the called party's end, after they answer, but before the parties are connected.

You can use this TwiML to privately `<Play>` or `<Say>` information to the called party. You could also provide a chance to decline the phone call using `<Gather>` and `<Hangup>`. The `url` attribute does not support any other TwiML verbs.

If the [`answerOnBridge`](/docs/voice/twiml/dial#answeronbridge) attribute is used on `<Dial>`, the current caller will continue to hear ringing while the TwiML document executes on the other end. TwiML documents executed in this manner are not allowed to contain the `<Dial>` verb.

### method \[#attributes-method]

The `method` attribute allows you to specify which HTTP method Twilio should use when requesting the URL in the `url` attribute. The default is `POST`.

### byoc \[#attributes-byoc]

The `byoc` attribute allows you to specify which configured customer [BYOC Trunk](/docs/voice/bring-your-own-carrier-byoc) Twilio should use to route the call to the PSTN. The default is none, in which case the call will be routed via the Twilio Super Network.

### statusCallbackEvent \[#attributes-status-callback-event]

When dialing out to a number using `<Dial>`, an outbound call is initiated. The call transitions from the `initiated` state to the `ringing` state when the phone starts ringing. It transitions to the `answered` state when the call is picked up, and finally to the `completed` state when the call is over.

With `statusCallbackEvent`, you can subscribe to receive webhooks for the different call progress events for a given call: `initiated`, `ringing`, `answered`, or `completed`. Non-relative URLs must contain a valid hostname (underscores are not permitted).

The `statusCallbackEvent` attribute allows you to specify which events Twilio should trigger a webhook on. To specify multiple events separate them with a space: `initiated ringing answered completed`. If a `statusCallback` is provided and no status callback events are specified, the `completed` event will be sent by default.

As opposed to creating an outbound call via the API, outbound calls created using `<Dial>` are initiated right away and never queued. The following shows a timeline of possible call events that can be returned and the different call statuses that a `<Dial>` leg may experience:

![Timeline of an outbound Dial call showing events: initiated, ringing, answered, completed.](https://docs-resources.prod.twilio.com/8fbb66cf4210d21b105f64f4ba77ab24a09cec1acdd4e6e56f889e3ecf9e2388.png)

| Event     | Description                                                                                                                                                                                                                                 |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| initiated | The `initiated` event is fired when Twilio starts dialing the call.                                                                                                                                                                         |
| ringing   | The `ringing` event is fired when the call starts ringing.                                                                                                                                                                                  |
| answered  | The `answered` event is fired when the call is answered.                                                                                                                                                                                    |
| completed | The `completed` event is fired when the call is completed, regardless of the termination status: `busy`, `canceled`, `completed`, `failed`, or `no-answer`. If no `StatusCallbackEvent` is specified, `completed` will be fired by default. |

### statusCallback \[#attributes-status-callback]

The `statusCallback` attribute allows you to specify a URL for Twilio to send webhook requests to on each event specified in the `statusCallbackEvent` attribute.

### statusCallbackMethod \[#attributes-status-callback-method]

The `statusCallbackMethod` attribute allows you to specify which HTTP method Twilio should use when requesting the URL in the `statusCallback` attribute. The default is `POST`.

### Status Callback HTTP Parameters

The parameters Twilio passes to your application in its asynchronous request to the `StatusCallback` URL include all parameters passed in a synchronous request to retrieve TwiML when Twilio receives a call to one of your Twilio numbers. The full list of parameters and descriptions of each are in the [TwiML Voice Request](/docs/voice/twiml#twilios-request-to-your-application) documentation.

When the call progress events are fired, the Status Callback request also passes these additional parameters:

| Parameter         | Description                                                                                                                                                                                                                                                                             |
| :---------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CallSid           | Unique identifier for this call that Twilio generates. To modify the child call, [make a `POST` request to Calls/\{CallSid} with a new TwiML URL](/docs/voice/api/call-resource#update-a-call-resource).                                                                                |
| ParentCallSid     | A unique identifier for the parent call.                                                                                                                                                                                                                                                |
| CallStatus        | A descriptive status for the call. The value is one of `queued`, `initiated`, `ringing`, `in-progress`, `busy`, `failed`, or `no-answer`. See the [CallStatus section](/docs/voice/api/call-resource#call-status-values) for more details.                                              |
| CallDuration      | The duration in seconds of the just-completed call. Only present in the `completed` event.                                                                                                                                                                                              |
| RecordingUrl      | The URL of the phone call's recorded audio. This parameter is included only if record is set on the `<Dial>` and does not include recordings initiated in other ways. `RecordingUrl` is only present in the `completed` event.                                                          |
| RecordingSid      | The unique ID of the [Recording](/docs/voice/api/recording) from this call. `RecordingSid` is only present in the `completed` event.                                                                                                                                                    |
| RecordingDuration | The duration of the recorded audio (in seconds). `RecordingDuration` is only present in the `completed` event. To get a final accurate recording duration after any trimming of silence, use [recordingStatusCallback](/docs/usage/webhooks/voice-webhooks#recording-status-callbacks). |
| Timestamp         | The timestamp when the event was fired, given as UTC in [RFC 2822](https://datatracker.ietf.org/doc/html/rfc2822) format.                                                                                                                                                               |
| CallbackSource    | A string that describes the source of the webhook. This is provided to help disambiguate why the webhook was made. On Status Callbacks, this value is always `call-progress-events`.                                                                                                    |
| SequenceNumber    | The order in which the events were fired, starting from `0`. Although events are fired in order, they are made as separate HTTP requests and there is no guarantee they will arrive in the same order.                                                                                  |

### machineDetection \[#attributes-machine-detection]

Whether to detect if a human, answering machine, or fax has picked up the call. Can be: `Enable` or `DetectMessageEnd`. Use `Enable` if you would like us to return `AnsweredBy` as soon as the called party is identified. Use `DetectMessageEnd` if you would like to leave a message on an answering machine. .

### machineDetectionTimeout \[#attributes-machine-detection-timeout]

The number of seconds that we should attempt to detect an answering machine before timing out and sending a voice request with `AnsweredBy` of `unknown`.

### machineDetectionSpeechThreshold \[#attributes-machine-detection-speech-threshold]

The number of milliseconds that is used as the measuring stick for the length of the speech activity, where durations lower than this value will be interpreted as a human and longer than this value as a machine.

### machineDetectionSpeechEndThreshold \[#attributes-machine-detection-speech-end-threshold]

The number of milliseconds of silence after speech activity at which point the speech activity is considered complete.

### machineDetectionSilenceTimeout \[#attributes-machine-detection-silence-timeout]

The number of milliseconds of initial silence after which an unknown `AnsweredBy` result will be returned.

### amdStatusCallback \[#attributes-amd-status-callback]

The URL that we should call to notify your application whether the call was answered by human, machine, or fax.

### amdStatusCallbackMethod \[#attributes-amd-status-callback-method]

The HTTP method we should use when calling the amdStatusCallback URL.

## Examples \[#examples]

### Example 1: Using sendDigits \[#examples-1]

In this case, we want to dial the 1928 extension at 415-123-4567. We use a `<Number>` noun to describe the phone number and give it the attribute
`sendDigits`. We want to wait before sending the extension, so we add a few leading `w` characters. Each `w` tells Twilio to wait half a second instead of playing a digit. This lets you adjust the timing of when the digits begin playing to suit the phone system you are dialing.

Using sendDigits

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const dial = response.dial();
dial.number(
  {
    sendDigits: 'wwww1928',
  },
  '415-123-4567'
);

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Dial, Number, VoiceResponse

response = VoiceResponse()
dial = Dial()
dial.number('415-123-4567', send_digits='wwww1928')
response.append(dial)

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
        var dial = new Dial();
        dial.Number("415-123-4567", sendDigits: "wwww1928");
        response.Append(dial);

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.voice.Dial;
import com.twilio.twiml.voice.Number;
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Number number = new Number.Builder("415-123-4567")
            .sendDigits("wwww1928").build();
        Dial dial = new Dial.Builder().number(number).build();
        VoiceResponse response = new VoiceResponse.Builder().dial(dial).build();

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
		&twiml.VoiceDial{
			InnerElements: []twiml.Element{
				&twiml.VoiceNumber{
					PhoneNumber: "415-123-4567",
					SendDigits:  "www1928",
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
$dial = $response->dial('');
$dial->number('415-123-4567', ['sendDigits' => 'wwww1928']);

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.dial do |dial|
  dial.number('415-123-4567', send_digits: 'wwww1928')
end

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial>
        <Number sendDigits="wwww1928">
            415-123-4567
        </Number>
    </Dial>
</Response>
```

### Example 2: Simultaneous Dialing \[#examples-2]

In this case, we use several `<Number>` tags to dial three phone numbers at the same time. The first of these calls to answer will be connected to the current caller, while the rest of the connection attempts are canceled.

Simultaneous Dialing

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const dial = response.dial();
dial.number('858-987-6543');
dial.number('415-123-4567');
dial.number('619-765-4321');

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Dial, Number, VoiceResponse

response = VoiceResponse()
dial = Dial()
dial.number('858-987-6543')
dial.number('415-123-4567')
dial.number('619-765-4321')
response.append(dial)

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
        var dial = new Dial();
        dial.Number("858-987-6543");
        dial.Number("415-123-4567");
        dial.Number("619-765-4321");
        response.Append(dial);

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.voice.Dial;
import com.twilio.twiml.voice.Number;
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Number number = new Number.Builder("858-987-6543").build();
        Number number2 = new Number.Builder("415-123-4567").build();
        Number number3 = new Number.Builder("619-765-4321").build();
        Dial dial = new Dial.Builder().number(number).number(number2)
            .number(number3).build();
        VoiceResponse response = new VoiceResponse.Builder().dial(dial).build();

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
		&twiml.VoiceDial{
			InnerElements: []twiml.Element{
				&twiml.VoiceNumber{
					PhoneNumber: "858-987-6543",
				},
				&twiml.VoiceNumber{
					PhoneNumber: "415-123-4567",
				},
				&twiml.VoiceNumber{
					PhoneNumber: "619-765-4321",
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
$dial = $response->dial('');
$dial->number('858-987-6543');
$dial->number('415-123-4567');
$dial->number('619-765-4321');

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.dial do |dial|
  dial.number('858-987-6543')
  dial.number('415-123-4567')
  dial.number('619-765-4321')
end

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial>
        <Number>
            858-987-6543
        </Number>
        <Number>
            415-123-4567
        </Number>
        <Number>
            619-765-4321
        </Number>
    </Dial>
</Response>
```

### Example 3: Call Progress Events \[#examples-3]

In this case, we want to receive a webhook for each call progress event when dialing a number using `<Dial>`.

Call Progress Events

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const dial = response.dial();
dial.number(
  {
    statusCallbackEvent: 'initiated ringing answered completed',
    statusCallback: 'https://myapp.com/calls/events',
    statusCallbackMethod: 'POST',
  },
  '+12349013030'
);

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Dial, Number, VoiceResponse

response = VoiceResponse()
dial = Dial()
dial.number(
    '+12349013030',
    status_callback_event='initiated ringing answered completed',
    status_callback='https://myapp.com/calls/events',
    status_callback_method='POST'
)
response.append(dial)

print(response)
```

```cs
using System;
using Twilio.TwiML;
using Twilio.TwiML.Voice;
using System.Linq;

class Example
{
    static void Main()
    {
        var response = new VoiceResponse();
        var dial = new Dial();
        dial.Number("+12349013030", statusCallbackEvent: new []{Number
            .EventEnum.Initiated, Number.EventEnum.Ringing, Number.EventEnum
            .Answered, Number.EventEnum.Completed}.ToList(),
            statusCallback: new Uri("https://myapp.com/calls/events"),
            statusCallbackMethod: Twilio.Http.HttpMethod.Post);
        response.Append(dial);

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.voice.Dial;
import com.twilio.twiml.voice.Number;
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.TwiMLException;
import java.util.Arrays;
import com.twilio.http.HttpMethod;

public class Example {
    public static void main(String[] args) {
        Number number = new Number.Builder("+12349013030")
            .statusCallback("https://myapp.com/calls/events")
            .statusCallbackMethod(HttpMethod.POST).statusCallbackEvents(Arrays
            .asList(Number.Event.INITIATED, Number.Event.RINGING, Number.Event
            .ANSWERED, Number.Event.COMPLETED)).build();
        Dial dial = new Dial.Builder().number(number).build();
        VoiceResponse response = new VoiceResponse.Builder().dial(dial).build();

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
		&twiml.VoiceDial{
			InnerElements: []twiml.Element{
				&twiml.VoiceNumber{
					PhoneNumber:          "+12349013030",
					StatusCallbackEvent:  "initiated ringing answered completed",
					StatusCallback:       "https://myapp.com/calls/events",
					StatusCallbackMethod: "POST",
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
$dial = $response->dial('');
$dial->number('+12349013030',
    ['statusCallbackEvent' => 'initiated ringing answered completed',
    'statusCallback' => 'https://myapp.com/calls/events',
    'statusCallbackMethod' => 'POST']);

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.dial do |dial|
  dial.number('+12349013030',
              status_callback_event: 'initiated ringing answered completed',
              status_callback: 'https://myapp.com/calls/events',
              status_callback_method: 'POST')
end

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial>
        <Number
         statusCallbackEvent="initiated ringing answered completed"
         statusCallback="https://myapp.com/calls/events"
         statusCallbackMethod="POST">
            +12349013030
        </Number>
    </Dial>
</Response>
```

### Example 4: Multi Dial with Call Progress Events

In this case, we want to receive a webhook for each call progress event for each number when dialing multiple numbers using `<Dial>`.

Multi Dial with Call Progress Events

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const dial = response.dial();
dial.number(
  {
    statusCallbackEvent: 'initiated ringing answered completed',
    statusCallback: 'https://myapp.com/calls/events',
    statusCallbackMethod: 'POST',
  },
  '+14155555555'
);
dial.number(
  {
    statusCallbackEvent: 'initiated ringing answered completed',
    statusCallback: 'https://example.com/events',
    statusCallbackMethod: 'POST',
  },
  '+14153333333'
);

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Dial, Number, VoiceResponse

response = VoiceResponse()
dial = Dial()
dial.number(
    '+14155555555',
    status_callback_event='initiated ringing answered completed',
    status_callback='https://myapp.com/calls/events',
    status_callback_method='POST'
)
dial.number(
    '+14153333333',
    status_callback_event='initiated ringing answered completed',
    status_callback='https://example.com/events',
    status_callback_method='POST'
)
response.append(dial)

print(response)
```

```cs
using System;
using Twilio.TwiML;
using Twilio.TwiML.Voice;
using System.Linq;

class Example
{
    static void Main()
    {
        var response = new VoiceResponse();
        var dial = new Dial();
        dial.Number("+14155555555", statusCallbackEvent: new []{Number
            .EventEnum.Initiated, Number.EventEnum.Ringing, Number.EventEnum
            .Answered, Number.EventEnum.Completed}.ToList(),
            statusCallback: new Uri("https://myapp.com/calls/events"),
            statusCallbackMethod: Twilio.Http.HttpMethod.Post);
        dial.Number("+14153333333", statusCallbackEvent: new []{Number
            .EventEnum.Initiated, Number.EventEnum.Ringing, Number.EventEnum
            .Answered, Number.EventEnum.Completed}.ToList(),
            statusCallback: new Uri("https://example.com/events"),
            statusCallbackMethod: Twilio.Http.HttpMethod.Post);
        response.Append(dial);

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.voice.Dial;
import com.twilio.twiml.voice.Number;
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.TwiMLException;
import java.util.Arrays;
import com.twilio.http.HttpMethod;

public class Example {
    public static void main(String[] args) {
        Number number = new Number.Builder("+14155555555")
            .statusCallback("https://myapp.com/calls/events")
            .statusCallbackMethod(HttpMethod.POST).statusCallbackEvents(Arrays
            .asList(Number.Event.INITIATED, Number.Event.RINGING, Number.Event
            .ANSWERED, Number.Event.COMPLETED)).build();
        Number number2 = new Number.Builder("+14153333333")
            .statusCallback("https://example.com/events")
            .statusCallbackMethod(HttpMethod.POST).statusCallbackEvents(Arrays
            .asList(Number.Event.INITIATED, Number.Event.RINGING, Number.Event
            .ANSWERED, Number.Event.COMPLETED)).build();
        Dial dial = new Dial.Builder().number(number).number(number2).build();
        VoiceResponse response = new VoiceResponse.Builder().dial(dial).build();

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
		&twiml.VoiceDial{
			InnerElements: []twiml.Element{
				&twiml.VoiceNumber{
					PhoneNumber:          "+14155555555",
					StatusCallback:       "https://myapp.com/calls/events",
					StatusCallbackEvent:  "initiated ringing answered completed",
					StatusCallbackMethod: "POST",
				},
				&twiml.VoiceNumber{
					PhoneNumber:          "+14153333333",
					StatusCallback:       "https://example.com/calls/events",
					StatusCallbackEvent:  "initiated ringing answered completed",
					StatusCallbackMethod: "POST",
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
$dial = $response->dial('');
$dial->number('+14155555555',
    ['statusCallbackEvent' => 'initiated ringing answered completed',
    'statusCallback' => 'https://myapp.com/calls/events',
    'statusCallbackMethod' => 'POST']);
$dial->number('+14153333333',
    ['statusCallbackEvent' => 'initiated ringing answered completed',
    'statusCallback' => 'https://example.com/events',
    'statusCallbackMethod' => 'POST']);

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.dial do |dial|
  dial.number('+14155555555',
              status_callback_event: 'initiated ringing answered completed',
              status_callback: 'https://myapp.com/calls/events',
              status_callback_method: 'POST')
  dial.number('+14153333333',
              status_callback_event: 'initiated ringing answered completed',
              status_callback: 'https://example.com/events',
              status_callback_method: 'POST')
end

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial>
        <Number
         statusCallbackEvent='initiated ringing answered completed'
         statusCallback='https://myapp.com/calls/events'
         statusCallbackMethod='POST'>
            +14155555555
        </Number>
        <Number
         statusCallbackEvent='initiated ringing answered completed'
         statusCallback='https://example.com/events'
         statusCallbackMethod='POST'>
            +14153333333
        </Number>
    </Dial>
</Response>
```

### Example 5: Running TwiML Before Parties Are Connected

In this case, we want to connect two parties using `<Dial>`, but we also want TwiML instructions to be sent to the party we are calling before they are connected to the call. By setting the `url` attribute, we can specify a URL that will return a TwiML response to be run on the called party's end. This TwiML will run after they answer, but before the parties are connected.

Running TwiML before parties are connected

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const dial = response.dial();
dial.number(
  {
    url: 'http://example.com/agent_screen_call',
  },
  '415-123-4567'
);

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Dial, Number, VoiceResponse

response = VoiceResponse()
dial = Dial()
dial.number('415-123-4567', url='http://example.com/agent_screen_call')
response.append(dial)

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
        var dial = new Dial();
        dial.Number("415-123-4567", url: new Uri("http://example.com/agent_screen_call"));
        response.Append(dial);

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.voice.Dial;
import com.twilio.twiml.voice.Number;
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Number number = new Number.Builder("415-123-4567")
            .url("http://example.com/agent_screen_call").build();
        Dial dial = new Dial.Builder().number(number).build();
        VoiceResponse response = new VoiceResponse.Builder().dial(dial).build();

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
		&twiml.VoiceDial{
			InnerElements: []twiml.Element{
				&twiml.VoiceNumber{
					PhoneNumber: "415-123-4567",
					Url:         "http://example.com/agent_screen_call",
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
$dial = $response->dial('');
$dial->number('415-123-4567', ['url' => 'http://example.com/agent_screen_call']);

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.dial do |dial|
    dial.number('415-123-4567', url: 'http://example.com/agent_screen_call')
end

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial>
        <Number url="http://example.com/agent_screen_call">415-123-4567</Number>
    </Dial>
</Response>
```

## Hints and Advanced Uses \[#hints]

* You can specify up to ten numbers within a `<Dial>` verb to dial simultaneously.
* Simultaneous dialing is useful when you have several phones (or several people) that you want to ring when you receive an incoming call. Keep in mind that the first call that connects will cancel all the other attempts. If you dial an office phone system or a cellphone in airplane mode, it may pick up after a single ring, preventing the other phone numbers from ringing long enough for a human ever to answer. So you should take care to use simultaneous dialing only in situations where you know the behavior of the called parties.
