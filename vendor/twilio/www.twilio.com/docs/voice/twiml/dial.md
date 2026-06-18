# TwiML™ Voice: \<Dial>

During an active call, you can use TwiML's `<Dial>` [verb](/docs/voice/twiml#twiml-verbs-for-programmable-voice) to connect the current caller to another party.

The following example shows the most basic use of `<Dial>`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial>415-123-4567</Dial>
</Response>
```

If the party at `415-123-4567` answers the call, the two parties can communicate until one hangs up.

The `<Dial>` verb will end the new call if:

* The called party does not pick up.
* Twilio receives a busy signal.
* The number does not exist.

> \[!WARNING]
>
> `<Dial>` cannot initiate a call directly from Twilio — it will only dial a new party from an active, ongoing call. To start a new outbound call from Twilio, you must make an [API request to the Call endpoint](/docs/voice/api/call-resource#create-a-call-resource).
>
> For a step-by-step guide on making your first outbound call with Twilio, try one of our quickstarts that show [how to make a call using the Twilio SDKs](/docs/voice/quickstart).

Twilio will make a `GET` or `POST` request to [the `action` URL](/docs/voice/twiml/dial#action) (if provided) when the `<Dial>` call ends. Call flow will then continue, using the TwiML you send in response to that request.

If you do not provide an `action` URL in your `<Dial>` and the original caller is still on the line, Twilio will continue to render the original TwiML document.

Dial example

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
response.dial('415-123-4567');
response.say('Goodbye');

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Dial, VoiceResponse, Say

response = VoiceResponse()
response.dial('415-123-4567')
response.say('Goodbye')

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
        response.Dial("415-123-4567");
        response.Say("Goodbye");

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.voice.Dial;
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.voice.Say;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Dial dial = new Dial.Builder("415-123-4567").build();
        Say say = new Say.Builder("Goodbye").build();
        VoiceResponse response = new VoiceResponse.Builder().dial(dial)
            .say(say).build();

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
				&twiml.VoiceDial{
					Number: "415-123-4567",
				},
				twiml.VoiceSay{
					Message: "Goodbye",
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
$response->dial('415-123-4567');
$response->say('Goodbye');

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.dial(number: '415-123-4567')
response.say(message: 'Goodbye')

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial>415-123-4567</Dial>
    <Say>Goodbye</Say>
</Response>
```

With this code, Twilio will connect the original call with a new party by dialing `415-123-4567`. Several things might happen next:

* If someone answers, Twilio connects the caller with the *called party*.
* If the *initial caller* hangs up, the Twilio session ends and the `<Say>` does not execute.
* If the line is busy, if there is no answer, or if the *called party* hangs up, `<Dial>` exits and the *initial caller* hears the `<Say>` text ("Goodbye") before the call flow ends.

## `<Dial>` attributes

`<Dial>` supports the following attributes that change its behavior:

| Attribute                                                     | Allowed Values                                                                                                                                                                                                                            | Default Value                                                                                                   |
| :------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------- |
| [action](#action)                                             | Relative or absolute URL                                                                                                                                                                                                                  | None                                                                                                            |
| [answerOnBridge](#answeronbridge)                             | `true`, `false`                                                                                                                                                                                                                           | `false`                                                                                                         |
| [callerId](#callerid)                                         | A valid phone number, or client identifier if you are dialing a [`<Client>`](/docs/voice/twiml/client).                                                                                                                                   | Caller's callerId                                                                                               |
| [callReason](#callreason)                                     | String (Maximum 50 characters)                                                                                                                                                                                                            | None                                                                                                            |
| [hangupOnStar](#hanguponstar)                                 | `true`, `false`                                                                                                                                                                                                                           | `false`                                                                                                         |
| [method](#method)                                             | `GET`, `POST`                                                                                                                                                                                                                             | `POST`                                                                                                          |
| [record](#record)                                             | `do-not-record`, `record-from-answer`, `record-from-ringing`, `record-from-answer-dual`, `record-from-ringing-dual`. For backward compatibility, `true` is an alias for `record-from-answer` and `false` is an alias for `do-not-record`. | `do-not-record`                                                                                                 |
| [recordingStatusCallback](#recordingstatuscallback)           | Relative or absolute URL                                                                                                                                                                                                                  | None                                                                                                            |
| recordingStatusCallbackMethod                                 | `GET`, `POST`                                                                                                                                                                                                                             | `POST`. This attribute indicates which HTTP method Twilio should use when requesting 'recordingStatusCallback'. |
| [recordingStatusCallbackEvent](#recordingstatuscallbackevent) | `in-progress`, `completed`, `absent`                                                                                                                                                                                                      | `completed`                                                                                                     |
| [recordingTrack](#recordingtrack)                             | `inbound`, `outbound`, `both`                                                                                                                                                                                                             | `both`                                                                                                          |
| [referUrl](#referurl)                                         | Relative or absolute URL                                                                                                                                                                                                                  | None                                                                                                            |
| [referMethod](#refermethod)                                   | `GET`, `POST`                                                                                                                                                                                                                             | `POST`                                                                                                          |
| [ringTone](#ringtone)                                         | [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)                                                                                                                                                       | Defaults to the carrier's ringtone                                                                              |
| [timeLimit](#timelimit)                                       | Positive integer (seconds)                                                                                                                                                                                                                | 14400 seconds (4 hours)                                                                                         |
| [timeout](#timeout)                                           | Positive integer (seconds)                                                                                                                                                                                                                | 30 seconds                                                                                                      |
| [trim](#trim)                                                 | `trim-silence`, `do-not-trim`                                                                                                                                                                                                             | None                                                                                                            |
| [sequential](#sequential)                                     | `true`, `false`                                                                                                                                                                                                                           |                                                                                                                 |
| [recordingConfigurationId](#recordingconfigurationid)         | A string                                                                                                                                                                                                                                  | None                                                                                                            |

Use one or more of these attributes in a `<Dial>` verb like so:

```bash
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial timeout="10" record="true">415-123-4567</Dial>
</Response>
```

### action

The `action` attribute accepts a URL as its argument. This URL tells Twilio where to make a `POST` or `GET` request after the dialed call ends.

Twilio's request to this URL will include the following parameters:

| Parameter                         | Description                                                                                                                                                                                                                                                                                                                                                          |
| :-------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [DialCallStatus](#dialcallstatus) | The outcome of the `<Dial>` attempt. See the [`DialCallStatus` section below](#dialcallstatus) for details.                                                                                                                                                                                                                                                          |
| DialCallSid                       | The call sid of the new call leg. This parameter is not sent after dialing a conference.                                                                                                                                                                                                                                                                             |
| DialCallDuration                  | The duration in seconds of the dialed call. This parameter is not sent after dialing a conference, or if a Child call is redirected to a new TwiML URL before being disconnected.                                                                                                                                                                                    |
| DialBridged                       | Boolean indicator of whether or not the dialing call has been connected to the dialed destination.                                                                                                                                                                                                                                                                   |
| RecordingUrl                      | The URL of the recorded audio. This parameter is included only if record is set on `<Dial>` and does not include recordings initiated in other ways. The recording file may not yet be accessible when the action callback is sent. Use [recordingStatusCallback](#recordingstatuscallback) for reliable notification on when the recording is available for access. |

If you `<Dial>` a `<Queue>`, Twilio will pass [additional parameters](/docs/voice/twiml/queue#attributes-url-parameters) to your `action` URL. Read the in-depth [\<Queue> documentation](/docs/voice/twiml/queue) for more details.

If you need to pass custom information, include it in the `action` URL:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial action="https://example.com/twiml.php?customParameter1=xxxxxx&amp;customParameter2=yyyyy&amp;customValue=true">
        415-123-4567
    </Dial>
</Response>
```

> \[!WARNING]
>
> If you specify an `action` URL for `<Dial>`, Twilio will continue the initial call after the dialed party hangs up.
>
> Any TwiML verbs included after this `<Dial>` will be unreachable, as your response to Twilio takes full control of the initial call. If you want to take more actions on that initial call, you *must* respond to Twilio's request with TwiML instructions on how to handle the call.

If you do not provide an `action` URL, `<Dial>` will finish and Twilio will move on to the next TwiML verb in the document. If there is no further verb, Twilio will end the phone call. Note that this is different from the behavior of `<Record>` and `<Gather>`.

[Back to attributes list](/docs/voice/twiml/dial#dial-attributes)

#### DialCallStatus

If you specify an `action` URL, Twilio will always pass along the status of the `<Dial>` attempt.

Possible `DialCallStatus` values are:

| Value     | Description                                                                                                                                    |
| :-------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| completed | The called party answered the call and was connected to the caller.                                                                            |
| answered  | When calling a conference, the called party answered the call and was connected to the caller.                                                 |
| busy      | Twilio received a busy signal when trying to connect to the called party.                                                                      |
| no-answer | The called party did not pick up before the timeout period passed.                                                                             |
| failed    | Twilio was unable to route to the given phone number. This is frequently caused by dialing a properly formatted but non-existent phone number. |
| canceled  | The call was canceled via the REST API before it was answered.                                                                                 |

[Back to attributes list](/docs/voice/twiml/dial#dial-attributes)

### answerOnBridge

If `<Dial>` is the first TwiML verb in your TwiML document, `answerOnBridge="true"` will cause the inbound call to ring until the dialed number answers.

If your inbound call is a SIP call, Twilio will send a 180 or 183 to your SIP server once it connects to Twilio. It will wait until the `<Dial>` call connects to return a 200.

[Back to attributes list](/docs/voice/twiml/dial#dial-attributes)

### callerId

When you use `<Dial>` in your response to Twilio's inbound call request, the dialed party sees the inbound caller's number as the caller ID.

For example:

1. Someone with a caller ID of `1-415-123-4567` calls your Twilio number.
2. You tell Twilio to execute a `<Dial>` verb to `1-858-987-6543` to handle the inbound call.
3. The called party (`1-858-987-6543`) will see `1-415-123-4567` as the caller ID on the incoming call.

When using the `<Number>` noun, and specifying a `callerId` on your `<Dial>`, you can set a different caller ID than the default. You may change the phone number that the called party sees to one of the following:

* Either the `To` or `From` number provided in [Twilio's TwiML request](/docs/voice/twiml#twilios-request-to-your-application) to your app.
* Any incoming phone number you have purchased from Twilio.
* Any phone number you have [verified with Twilio](https://help.twilio.com/hc/en-us/articles/223180048-Adding-a-Verified-Phone-Number-or-Caller-ID-with-Twilio).

> \[!WARNING]
>
> In the case of an inbound SIP call, `callerId` cannot be the `To` or `From` number, as there is a risk of caller ID spoofing. It can only be either a Twilio number or a phone number verified with Twilio.

If you are dialing a `<Client>`, you can also set a valid client identifier as the `callerId` attribute. For instance, if you've set up a client for incoming calls and you are dialing that client, you could set the `callerId` attribute to `client:joey`.

If you are dialing a `<Sip>` endpoint, enter any alphanumeric string as the `callerId`. Optionally include the following characters: `+`, `-`, `_`, and `.`, but no whitespace.

In the following example, we use `<Dial>` to call a phone number from a Voice SDK Device instance:

Dial a phone number from a Twilio Voice SDK Device

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const dial = response.dial({
  callerId: '+15551112222',
});
dial.number('+15558675310');

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Dial, Number, VoiceResponse

response = VoiceResponse()
dial = Dial(caller_id='+15551112222')
dial.number('+15558675310')
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
        var dial = new Dial(callerId: "+15551112222");
        dial.Number("+15558675310");
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
        Number number = new Number.Builder("+15558675310").build();
        Dial dial = new Dial.Builder().callerId("+15551112222").number(number)
            .build();
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
			CallerId: "+15551112222",
			InnerElements: []twiml.Element{
				&twiml.VoiceNumber{
					PhoneNumber: "+15558675310",
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
$dial = $response->dial('', ['callerId' => '+15551112222']);
$dial->number('+15558675310');

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.dial(caller_id: '+15551112222') do |dial|
  dial.number('+15558675310')
end

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial callerId="+15551112222">
        <Number>+15558675310</Number>
    </Dial>
</Response>
```

[Back to attributes list](/docs/voice/twiml/dial#dial-attributes)

### hangupOnStar

The `hangupOnStar` attribute lets the *initial caller* hang up on the *called party* by pressing the '**`*`**' key on their phone.

When two parties are connected using `<Dial>`, Twilio blocks execution of further verbs until the caller or called party hangs up. The `hangupOnStar` feature allows the initial caller to hang up on the party they called without having to hang up the phone (which would end the TwiML processing session).

When the caller presses '`*`', Twilio will hang up on the called party. If an `action` URL was provided, Twilio submits a [DialCallStatus](/docs/voice/twiml/dial#dialcallstatus) to that URL and processes the response. When calling a conference, the `DialCallStatus` will be `answered`. All other call types will have a `completed` `DialCallStatus`.

If no `action` was provided, Twilio continues on to the next verb in the current TwiML document.

[Back to attributes list](/docs/voice/twiml/dial#dial-attributes)

### method

The `method` attribute accepts either `GET` or `POST`. This tells Twilio whether to request the `action` URL via HTTP `GET` or `POST`, with `POST` as its default value.

In the following example, we've provided an `action` URL and specified `GET` as the `method`:

Specify an action URL and method

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
response.dial(
  {
    action: '/handleDialCallStatus',
    method: 'GET',
  },
  '415-123-4567'
);
response.say('I am unreachable');

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Dial, VoiceResponse, Say

response = VoiceResponse()
response.dial('415-123-4567', action='/handleDialCallStatus', method='GET')
response.say('I am unreachable')

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
        response.Dial("415-123-4567", action: new Uri("/handleDialCallStatus"),
            method: Twilio.Http.HttpMethod.Get);
        response.Say("I am unreachable");

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.voice.Dial;
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.voice.Say;
import com.twilio.twiml.TwiMLException;
import com.twilio.http.HttpMethod;

public class Example {
    public static void main(String[] args) {
        Dial dial = new Dial.Builder("415-123-4567")
            .action("/handleDialCallStatus").method(HttpMethod.GET).build();
        Say say = new Say.Builder("I am unreachable").build();
        VoiceResponse response = new VoiceResponse.Builder().dial(dial)
            .say(say).build();

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
			Action: "/handleDialCallStatus",
			Method: "GET",
			Number: "415-123-4567",
		},
		&twiml.VoiceSay{
			Message: "I am unreachable",
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
$response->dial('415-123-4567', ['action' => '/handleDialCallStatus',
    'method' => 'GET']);
$response->say('I am unreachable');

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.dial(action: '/handleDialCallStatus', method: 'GET',
              number: '415-123-4567')
response.say(message: 'I am unreachable')

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!-- page located at http://example.com/dial_callstatus.xml -->
<Response>
    <Dial action="/handleDialCallStatus" method="GET">
        415-123-4567
    </Dial>
    <Say>I am unreachable</Say>
</Response>
```

This code will `<Dial>` to connect the initial caller to the phone number `415-123-4567`.

When the`<Dial>` call ends, Twilio will send a `GET` request to our `action` URL. This request will include the `DialCallStatus` parameter that tells us the status of that `<Dial>` call.

Our web application hosted at this `action` URL can now look at the `DialCallStatus` and send a response to Twilio telling it what to do next.

> \[!WARNING]
>
> In this example, the `<Say>` verb will never execute, as the code at `/handleDialCallStatus` takes full control of the call.

[Back to attributes list](/docs/voice/twiml/dial#dial-attributes)

### record

The `record` attribute lets you record both legs of a call within the associated `<Dial>` verb. Recordings are available in two options: **mono-channel** or **dual-channel**.

In **mono-channel** recordings, both legs of the call are mixed down into a single channel within one recording file.

For mono-channel `record` options, you can choose either:

* `record-from-answer`, which will start the recording as soon as the call is answered.
* `record-from-ringing`, which will start the recording when the ringing begins (before the recipient answers the call).

With **dual-channel** recordings, both legs use separate channels within a single recording file.

For dual-channel `record` options, you can choose either:

* `record-from-answer-dual`, which will start the recording as soon as the call is answered.
* `record-from-ringing-dual`, which will start the recording when the ringing begins (before the recipient answers the call).

The parent call will always be in the first channel and the child call will always be in the second channel of a dual-channel recording.

If a dual-channel recording option is used for a `<Dial>` with a nested `<Conference>`, the resulting recording file will have two channels. The parent leg (inbound caller) is represented in the first channel. The second channel includes the audio coming downstream from the conference.

> \[!WARNING]
>
> The use of the record attribute is subject to the same obligations and requirements as the [Recordings resource](/docs/voice/api/recording) and the [`<Record>` TwiML verb](/docs/voice/twiml/record). For workflows subject to [PCI](/docs/voice/pci-workflows) or the Health Insurance Portability and the Accountability Act (HIPAA), see the applicable documentation.

[Back to attributes list](/docs/voice/twiml/dial#dial-attributes)

### recordingStatusCallback

The `recordingStatusCallback` attribute takes a relative or absolute URL as an argument. If you've requested recording for this `<Dial>`, this URL tells Twilio where to make its `GET` or `POST` request when the recording is available to access.

Twilio will pass the following parameters with its request to your `recordingStatusCallback` URL:

| Parameter          | Description                                                                                                                           |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| AccountSid         | The unique identifier of the Account responsible for this recording.                                                                  |
| CallSid            | A unique identifier for the call associated with the recording. This will always refer to the parent leg of a two-leg call.           |
| RecordingSid       | The unique identifier for the recording.                                                                                              |
| RecordingUrl       | The URL of the recorded audio.                                                                                                        |
| RecordingStatus    | The status of the recording. Possible values are: `in-progress`, `completed`, `absent`.                                               |
| RecordingDuration  | The length of the recording, in seconds.                                                                                              |
| RecordingChannels  | The number of channels in the final recording file as an integer. Possible values are `1`, `2`.                                       |
| RecordingStartTime | The timestamp of when the recording started.                                                                                          |
| RecordingSource    | The initiation method used to create this recording. For recordings initiated when record is set on `<Dial>`, `DialVerb` is returned. |

[Back to attributes list](/docs/voice/twiml/dial#dial-attributes)

### recordingStatusCallbackEvent

The `recordingStatusCallbackEvent` allows you to specify which recording status changes should generate a webhook to the URL specified in the `recordingStatusCallback` attribute. The available values are:

* `in-progress`: the recording has started.
* `completed`: the recording is complete and available.
* `absent:` the recording is absent and inaccessible.

To specify more than one value, separate each with a space. The default value is: `completed`.

> \[!NOTE]
>
> To pause, resume, or stop recordings, see the [Recording API docs](/docs/voice/api/recording#update-a-recording-resource).

The following example specifies that we want each participant on the `<Dial>` call to be represented in their own channel of the final recording, and that recording should begin when the call begins to ring.

Set Dual-Channel Recording on \`\<Dial>\`

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const dial = response.dial({
  record: 'record-from-ringing-dual',
  recordingStatusCallback: 'www.myexample.com',
});
dial.number('+15558675310');

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Dial, Number, VoiceResponse

response = VoiceResponse()
dial = Dial(
    record='record-from-ringing-dual',
    recording_status_callback='www.myexample.com'
)
dial.number('+15558675310')
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
        var dial = new Dial(record: Dial.RecordEnum.RecordFromRingingDual,
            recordingStatusCallback: new Uri("www.myexample.com", UriKind
            .Relative));
        dial.Number("+15558675310");
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
        Number number = new Number.Builder("+15558675310").build();
        Dial dial = new Dial.Builder().record(Dial.Record
            .RECORD_FROM_RINGING_DUAL)
            .recordingStatusCallback("www.myexample.com").number(number)
            .build();
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
			Record:                  "record-from-ringing-dual",
			RecordingStatusCallback: "www.myexample.com",
			InnerElements: []twiml.Element{
				&twiml.VoiceNumber{
					PhoneNumber: "+15558675310",
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
$dial = $response->dial('', ['record' => 'record-from-ringing-dual',
    'recordingStatusCallback' => 'www.myexample.com']);
$dial->number('+15558675310');

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.dial(record: 'record-from-ringing-dual',
              recording_status_callback: 'www.myexample.com') do |dial|
  dial.number('+15558675310')
end

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial record="record-from-ringing-dual"
          recordingStatusCallback="www.myexample.com">
        <Number>+15558675310</Number>
    </Dial>
</Response>
```

[Back to attributes list](/docs/voice/twiml/dial#dial-attributes)

### recordingTrack

The `recordingTrack` attribute lets you select whether the `inbound`, `outbound` or `both` audio tracks of the call should be recorded. Inbound track represents the audio received by Twilio, and the outbound track represents the audio that Twilio generates on the call. The default value is `both` and it will record the audio that is received and generated by Twilio.

> \[!NOTE]
>
> When the `inbound` or `outbound` audio track is recorded, the resulting recording file will be always mono-channel. When audio is recorded using `both`,the resulting file can be in either separate channels (dual) or mixed (mono).

[Back to attributes list](/docs/voice/twiml/dial#dial-attributes)

### referUrl

If the called party sends a SIP `REFER` request, a request from Twilio will be sent to your `referUrl`. Your application must respond with how to handle the transfer. Learn more about [Inbound SIP REFER to Twilio](/docs/voice/api/refer-to-twilio).

The following parameters are added to the standard [Twilio Voice Webhook Request](/docs/voice/twiml#request-parameters):

| Parameter           | Description                                         |
| :------------------ | :-------------------------------------------------- |
| ReferTransferTarget | The phone number or SIP Endpoint where to transfer. |

SIP REFER Inbound to Twilio using referUrl

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const dial = response.dial({
  referUrl: 'https://example.com/handler',
});
dial.sip(
  'sip:AgentA@xyz.sip.us1.twilio.com?User-to-User=123456789%3Bencoding%3Dhex&X-Name=Agent%2C+A'
);

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Dial, VoiceResponse, Sip

response = VoiceResponse()
dial = Dial(refer_url='https://example.com/handler')
dial.sip(
    'sip:AgentA@xyz.sip.us1.twilio.com?User-to-User=123456789%3Bencoding%3Dhex&X-Name=Agent%2C+A'
)
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
        var dial = new Dial(referUrl: new Uri("https://example.com/handler"));
        dial.Sip(new Uri("sip:AgentA@xyz.sip.us1.twilio.com?User-to-User=123456789%3Bencoding%3Dhex&X-Name=Agent%2C+A"));
        response.Append(dial);

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.voice.Dial;
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.voice.Sip;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Sip sip = new Sip
            .Builder("sip:AgentA@xyz.sip.us1.twilio.com?User-to-User=123456789%3Bencoding%3Dhex&X-Name=Agent%2C+A").build();
        Dial dial = new Dial.Builder().referUrl("https://example.com/handler")
            .sip(sip).build();
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
			ReferUrl: "https://example.com/handler",
			InnerElements: []twiml.Element{
				&twiml.VoiceSip{
					SipUrl: "sip:AgentA@xyz.sip.us1.twilio.com?User-to-User=123456789%3Bencoding%3Dhex&amp;X-Name=Agent%2C+A",
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
$dial = $response->dial('', ['referUrl' => 'https://example.com/handler']);
$dial->sip('sip:AgentA@xyz.sip.us1.twilio.com?User-to-User=123456789%3Bencoding%3Dhex&X-Name=Agent%2C+A');

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.dial(refer_url: 'https://example.com/handler') do |dial|
    dial.sip('sip:AgentA@xyz.sip.us1.twilio.com?User-to-User=123456789%3Bencoding%3Dhex&X-Name=Agent%2C+A')
end

puts response
```

```xml
<Response>
    <Dial referUrl="https://example.com/handler">
        <Sip>sip:AgentA@xyz.sip.us1.twilio.com?User-to-User=123456789%3Bencoding%3Dhex&amp;X-Name=Agent%2C+A</Sip>
    </Dial>
</Response>
```

[Back to attributes list](/docs/voice/twiml/dial#dial-attributes)

### referMethod

The `referMethod` attribute accepts either `GET` or `POST`. This tells Twilio whether to request the `action` URL via HTTP `GET` or `POST`, with `POST` as its default value.

[Back to attributes list](/docs/voice/twiml/dial#dial-attributes)

### ringTone

Ringtone allows you to override the ringback tone that Twilio will play back to the caller while executing a `<Dial>`.

If not specified, Twilio will play ringback or pass ringback from the carrier (if provided). This works automatically but there may be cases where an override is desired.

Accepted values are: `at`, `au`, `bg`, `br`, `be`, `ch`, `cl`, `cn`, `cz`, `de`, `dk`, `ee`, `es`, `fi`, `fr`, `gr`, `hu`, `il`, `in`, `it`, `lt`, `jp`, `mx`, `my`, `nl`, `no`, `nz`, `ph`, `pl`, `pt`, `ru`, `se`, `sg`, `th`, `uk`, `us`, `us-old`, `tw`, `ve`, `za`.

[Back to attributes list](/docs/voice/twiml/dial#dial-attributes)

### timeLimit

The `timeLimit` attribute sets the maximum duration of the `<Dial>` in seconds.

For example, by setting a time limit of 120 seconds, `<Dial>` will automatically hang up on the called party two minutes into the phone call.

The default time limit on calls is 4 hours — this is also the maximum duration of a call, unless you enable the "24-Hour Maximum Call Duration" feature in your Programmable Voice General Settings, in which case the maximum duration will be 24 hours.

[Back to attributes list](/docs/voice/twiml/dial#dial-attributes)

### timeout

Specifying a `timeout` will set the limit in seconds that `<Dial>` will wait for the dialed party to answer the call. This tells Twilio how long to let the call ring before giving up and setting `no-answer` as the `DialCallStatus`.

`timeout`'s default value is 30 seconds, the minimum allowed value is five seconds, and the maximum value is 600 seconds.

> \[!WARNING]
>
> Twilio always adds a five-second timeout buffer to your `<Dial>`, so if you enter a timeout value of 10 seconds, you will see an actual timeout closer to 15 seconds.

[Back to attributes list](/docs/voice/twiml/dial#dial-attributes)

### trim

Setting the `trim` attribute to `trim-silence` will trim leading and trailing silence from your audio files.

Trimming a file may cause the duration of the recording to be slightly less than the duration of the call. The `trim` attribute defaults to `do-not-trim`.

[Back to attributes list](/docs/voice/twiml/dial#dial-attributes)

### sequential

Setting the `sequential` attribute to `true` allows you to call up to ten agents one after the other. Calls are prioritized based on the sequence specified in the verb.

### callReason

The Reason for the outgoing call. Use it to specify the purpose of the call that is presented on the called party's phone. (Branded Calls Private Beta)

For more information, visit the [Branded Calls](/docs/voice/branded-calling) page.

[Back to attributes list](/docs/voice/twiml/dial#dial-attributes)

### recordingConfigurationId

The `recordingConfigurationId` attribute specifies the identifier of a [Recording Configuration](/docs/configurations/recording-configuration-resource) to use when creating and processing the recording.

## \<Dial> nouns

You may always choose to nest **plain text** (a string representing a valid phone number) in `<Dial>` to tell Twilio a phone number to call:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial>415-123-4567</Dial>
</Response>
```

You may also choose to nest **[nouns](/docs/voice/twiml#twiml-nouns)** within your `<Dial>` to create connections to other types of devices, conference calls, and call queues.

The *noun* of a TwiML verb describes the phone numbers, endpoints, and API resources you want to take action on. TwiML nouns are whatever the verb (`<Dial>`, in this case) acts upon.

The following are the nouns that you can use with `<Dial>`. Each is a nested XML element:

| Noun                                                 | Description                                                                                                                                                                                                                                                                                                               |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [\<Client>](/docs/voice/twiml/client)                | Describes a [Twilio Voice SDK](/docs/voice/sdks) connection. Simultaneous dialing is also possible using multiple `<Client>` nouns. Read the [detailed \<Client> documentation](/docs/voice/twiml/client) for detailed information and usage.                                                                             |
| [\<Conference>](/docs/voice/twiml/conference)        | Describes a conference allowing two or more parties to talk. Connects the active party to a conference call. See the [detailed \<Conference> documentation](/docs/voice/twiml/conference) for a walkthrough showing how to use Twilio's conferencing functionality.                                                       |
| [\<Number>](/docs/voice/twiml/number)                | Describes a phone number with more complex attributes. This noun allows you to `<Dial>` another number while specifying additional behavior. Simultaneous dialing is also possible using multiple `<Number>` nouns. Read the [detailed \<Number> documentation](/docs/voice/twiml/number) for more information and usage. |
| [\<Sip>](/docs/voice/twiml/sip)                      | Describes a [SIP connection](/docs/voice/api/sip-interface). See the detailed [\<Sip>](/docs/voice/twiml/sip) documentation for more information.                                                                                                                                                                         |
| [\<Application>](/docs/voice/twiml/dial/application) | Describes an [Application](/docs/voice/twiml/dial/application) connection which allows you to connect a call to another Twilio account without losing the original call leg's context. Read the [detailed \<Application> documentation](/docs/voice/twiml/dial/application) for more information and usage.               |
| [\<WhatsApp>](/docs/voice/twiml/whatsapp)            | Describes a [WhatsApp](/docs/voice/twiml/whatsapp) connection which allows you to connect a call to a WhatsApp client. Read the [detailed \<WhatsApp> documentation](/docs/voice/twiml/whatsapp) for more information and usage.                                                                                          |
| [\<Queue>](/docs/voice/twiml/queue)                  | Identifies a queue that this call should connect to. Allows you to connect the current call to the call waiting at the front of a particular queue. Read [the \<Queue> documentation](/docs/voice/twiml/queue) for a detailed walkthrough of how to use Twilio's queueing functionality.                                  |

Nest one of these nouns inside a `<Dial>` verb like so:

Use a nested \`\<Number>\` with Dial

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const dial = response.dial();
dial.number('415-123-4567');

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Dial, Number, VoiceResponse

response = VoiceResponse()
dial = Dial()
dial.number('415-123-4567')
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
        dial.Number("415-123-4567");
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
        Number number = new Number.Builder("415-123-4567").build();
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
$dial->number('415-123-4567');

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.dial do |dial|
  dial.number('415-123-4567')
end

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial>
        <Number>415-123-4567</Number>
    </Dial>
</Response>
```

Functionally, the example above behaves exactly like our basic example where we nest a plain-text phone number in our `<Dial>`. Let's take this TwiML noun nesting one step further.

In the following example, we'll specify that we want a dual-channel recording for a `<Dial>` with a nested `<Conference>`.

This code will forward the active caller into a conference called `myteamroom`. A dual-channel recording of the call will begin when the ringing begins. After the call ends and the recording is ready, Twilio will send recording information back to example.com:

Set Dual-Channel Recording on \`\<Dial>\` with nested \`\<Conference>\`

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const dial = response.dial({
  record: 'record-from-ringing-dual',
  recordingStatusCallback: 'www.myexample.com',
});
dial.conference('myteamroom');

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Conference, Dial, VoiceResponse

response = VoiceResponse()
dial = Dial(
    record='record-from-ringing-dual',
    recording_status_callback='www.myexample.com'
)
dial.conference('myteamroom')
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
        var dial = new Dial(record: Dial.RecordEnum.RecordFromRingingDual,
            recordingStatusCallback: new Uri("www.myexample.com", UriKind
            .Relative));
        dial.Conference("myteamroom");
        response.Append(dial);

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.voice.Conference;
import com.twilio.twiml.voice.Dial;
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Conference conference = new Conference.Builder("myteamroom").build();
        Dial dial = new Dial.Builder().record(Dial.Record
            .RECORD_FROM_RINGING_DUAL)
            .recordingStatusCallback("www.myexample.com")
            .conference(conference).build();
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
$dial = $response->dial('', ['record' => 'record-from-ringing-dual',
    'recordingStatusCallback' => 'www.myexample.com']);
$dial->conference('myteamroom');

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.dial(record: 'record-from-ringing-dual',
              recording_status_callback: 'www.myexample.com') do |dial|
  dial.conference('myteamroom')
end

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial record="record-from-ringing-dual" 
          recordingStatusCallback="www.myexample.com">
        <Conference>myteamroom</Conference>
    </Dial>
</Response>
```

### Using Twimlets

[Twimlets](/labs/twimlets) are URLs hosted by Twilio that provide small bits of commonly-used functionality.

* The [Forward](/labs/twimlets/forward) twimlet will forward all calls to a Twilio number on to another number of your choosing.
* The [Simulring](/labs/twimlets/simulring) twimlet will ring multiple numbers at the same time, and connect the caller to the first person that picks up.
* To dial numbers in turn until one picks up, use the [Find Me](/labs/twimlets/findme) twimlet.
