# TwiML™ Voice: \<Client>

The [`<Dial>`](/docs/voice/twiml/dial) verb's `<Client>` noun specifies a client identifier to dial. The client identifier may be up to 256 characters.

You can use up to ten `<Client>` nouns within a `<Dial>` verb to simultaneously attempt a connection with many clients at once. The first client to accept the incoming connection is connected to the call and the other connection attempts are canceled. If you want to connect with multiple other clients simultaneously, read about the [`<Conference>`](/docs/voice/twiml/conference) noun.

> \[!WARNING]
>
> The client identifier should not contain control, space, delimiters, or [unwise](https://datatracker.ietf.org/doc/html/rfc2396#section-2.4.3) characters. Mobile SDKs cannot include any special characters and must only use alphanumeric characters and underscore.

## Noun Attributes \[#attributes]

The `<Client>` noun supports the following attributes that modify its behavior:

| Attribute Name                                                 | Allowed Values                                  | Default Value |
| :------------------------------------------------------------- | :---------------------------------------------- | :------------ |
| [`url`](#attributes-url)                                       | Any URL                                         | none          |
| [`method`](#attributes-method)                                 | `GET`, `POST`                                   | `POST`        |
| [`statusCallbackEvent`](#attributes-status-callback-event)     | `initiated`, `ringing`, `answered`, `completed` | none          |
| [`statusCallback`](#attributes-status-callback)                | Any URL                                         | none          |
| [`statusCallbackMethod`](#attributes-status-callback-method)   | `GET`, `POST`                                   | `POST`        |
| [`clientNotificationUrl`](#attributes-client-notification-url) | Any URL                                         | none          |

### url \[#attributes-url]

The `url` attribute allows you to specify a URL for a TwiML document that will
run on the called party's end, after she answers, but before the parties are
connected. You can use this TwiML to privately play or say information to the
called party, or provide a chance to decline the phone call using `<Gather>`
and `<Hangup>`. If [answerOnBridge][dial-answer-on-bridge] attribute is used on `<Dial`>,
the current caller will continue to hear ringing while the TwiML document executes on the other end.
TwiML documents executed in this manner are not allowed to contain the `<Dial>` verb.

### method \[#attributes-method]

The `method` attribute allows you to specify which HTTP method Twilio should
use when requesting the URL in the `url` attribute. The default is `POST`.

### statusCallbackEvent \[#attributes-status-callback-event]

When dialing out to a Client using `<Dial>`, an outbound call is initiated. The
call transitions from the `initiated` state to the `ringing` state when the
phone starts ringing. It transitions to the `answered` state when the call is
picked up, and finally to the `completed` state when the call is over. With
`statusCallbackEvent`, you can subscribe to receive webhooks for the different
call progress events: `initiated`, `ringing`, `answered`, or `completed` for a
given call.

The `statusCallbackEvent` attribute allows you to specify which events Twilio
should call a webhook on. To specify multiple events separate them with a space:
`initiated ringing answered completed`. If a `statusCallback` is provided and no
status callback events are specified the `completed` event will be sent by default.

As opposed to creating an outbound call via the API, outbound calls created
using `<Dial>` are initiated right away and never queued. The following shows a
timeline of possible call events that can be returned and the different call
statuses that a `<Dial>` leg may experience:

![Timeline of an outbound Dial call showing events: initiated, ringing, answered, completed.](https://docs-resources.prod.twilio.com/8fbb66cf4210d21b105f64f4ba77ab24a09cec1acdd4e6e56f889e3ecf9e2388.png)

| Event       | Description                                                                                                                                                                                                                      |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `initiated` | This event is fired when Twilio starts dialing the call.                                                                                                                                                                         |
| `ringing`   | This event is fired when the call starts ringing.                                                                                                                                                                                |
| `answered`  | This event is fired when the call is answered.                                                                                                                                                                                   |
| `completed` | This event is fired when the call is completed, regardless of the termination status: `busy`, `canceled`, `completed`, `failed`, or `no-answer`. If no `StatusCallbackEvent` is specified, `completed` will be fired by default. |

### statusCallback \[#attributes-status-callback]

The `statusCallback` attribute allows you to specify a URL for Twilio to send
webhook requests to on each event specified in the `statusCallbackEvent`
attribute. Non-relative URLs must contain a valid hostname (underscores are not permitted).

### statusCallbackMethod \[#attributes-status-callback-method]

The `statusCallbackMethod` attribute allows you to specify which HTTP method
Twilio should use when requesting the URL in the `statusCallback` attribute.
The default is `POST`.

### Status Callback HTTP Parameters

The parameters Twilio passes to your application in its asynchronous request to
the `StatusCallback` URL include all parameters passed in a synchronous request
to retrieve TwiML when Twilio receives a call to one of your Twilio numbers.
The full list of parameters and descriptions of each are in the [TwiML Voice
Request][voice-request] documentation.

When the call progress events are fired, the Status Callback request also passes these additional parameters:

| Parameter           | Description                                                                                                                                                                                                                                        |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CallSid             | Unique identifier for this call that Twilio generates. To modify the child call, [make a `POST` request to Calls/\{CallSid} with a new TwiML URL](/docs/voice/api/call-resource#update-a-call-resource).                                           |
| `ParentCallSid`     | A unique identifier for the parent call.                                                                                                                                                                                                           |
| `CallStatus`        | A descriptive status for the call. The value is one of `queued`, `initiated`, `ringing`, `in-progress`, `busy`, `failed`, or `no-answer`. See the [CallStatus section][call-status] for more details.                                              |
| `CallDuration`      | The duration in seconds of the just-completed call. Only present in the `completed` event.                                                                                                                                                         |
| `RecordingUrl`      | The URL of the phone call's recorded audio. This parameter is included only if record is set on the `<Dial>` and does not include recordings initiated in other ways. `RecordingUrl` is only present in the `completed` event.                     |
| `RecordingSid`      | The unique ID of the [Recording][recordings] from this call. `RecordingSid` is only present in the `completed` event.                                                                                                                              |
| `RecordingDuration` | The duration of the recorded audio (in seconds). `RecordingDuration` is only present in the `completed` event. To get a final accurate recording duration after any trimming of silence, use [recordingStatusCallback][recording-status-callback]. |
| `Timestamp`         | The timestamp when the event was fired, given as UTC in [RFC 2822][rfc-2822] format.                                                                                                                                                               |
| `CallbackSource`    | A string that describes the source of the webhook. This is provided to help disambiguate why the webhook was made. On Status Callbacks, this value is always `call-progress-events`.                                                               |
| `SequenceNumber`    | The order in which the events were fired, starting from `0`. Although events are fired in order, they are made as separate HTTP requests and there is no guarantee they will arrive in the same order.                                             |

### clientNotificationUrl \[#attributes-client-notification-url]

To notify your application of a call routing to a client user of the Voice SDK, call this URL. When [handling your own push notifications](/docs/voice/sdks/client-call-notification-webhook) to mobile client users, use this parameter. URLs must contain a valid hostname. This value can't include underscores. Parameter defaults to and only accepts `POST`.

## Custom Parameters \[#custom-parameters]

It is possible to include additional key value pairs that will be passed to the Voice SDK device instance (Web or Mobile). You can do this by using the nested `<Parameter>` TwiML noun.

[voice-request]: /docs/voice/twiml#request-parameters

[update-call]: /docs/voice/api/call-resource#update-a-call-resource

[call-status]: /docs/voice/twiml#callstatus-values

[recordings]: /docs/voice/api/recording

[rfc-2822]: https://php.net/manual/en/class.datetime.php#datetime.constants.rfc2822

[recording-status-callback]: /docs/voice/twiml/dial#recordingstatuscallbackevent

[dial-answer-on-bridge]: /docs/voice/twiml/dial#answeronbridge

Send custom parameters to the Voice SDK

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const dial = response.dial();
const client = dial.client();
client.identity('user_jane');
client.parameter({
  name: 'FirstName',
  value: 'Jane',
});
client.parameter({
  name: 'LastName',
  value: 'Doe',
});

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Client, Dial, Identity, Parameter, VoiceResponse

response = VoiceResponse()
dial = Dial()
client = Client()
client.identity('user_jane')
client.parameter(name='FirstName', value='Jane')
client.parameter(name='LastName', value='Doe')
dial.append(client)
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
        var client = new Client();
        client.Identity("user_jane");
        client.Parameter(name: "FirstName", value: "Jane");
        client.Parameter(name: "LastName", value: "Doe");
        dial.Append(client);
        response.Append(dial);

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.voice.Client;
import com.twilio.twiml.voice.Dial;
import com.twilio.twiml.voice.Identity;
import com.twilio.twiml.voice.Parameter;
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Identity identity = new Identity.Builder("user_jane").build();
        Parameter parameter = new Parameter.Builder().name("FirstName")
            .value("Jane").build();
        Parameter parameter2 = new Parameter.Builder().name("LastName")
            .value("Doe").build();
        Client client = new Client.Builder().identity(identity)
            .parameter(parameter).parameter(parameter2).build();
        Dial dial = new Dial.Builder().client(client).build();
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
				&twiml.VoiceClient{
					InnerElements: []twiml.Element{
						&twiml.VoiceIdentity{
							ClientIdentity: "user_jane",
						},
						&twiml.VoiceParameter{
							Name:  "FirstName",
							Value: "Jane",
						},
						&twiml.VoiceParameter{
							Name:  "LastName",
							Value: "Doe",
						},
					},
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
$client = $dial->client();
$client->identity('user_jane');
$client->parameter(['name' => 'FirstName', 'value' => 'Jane']);
$client->parameter(['name' => 'LastName', 'value' => 'Doe']);

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.dial do |dial|
    dial.client do |client|
        client.identity('user_jane')
        client.parameter(name: 'FirstName', value: 'Jane')
        client.parameter(name: 'LastName', value: 'Doe')
end
end

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
   <Dial>
     <Client>
        <Identity>user_jane</Identity>
        <Parameter name="FirstName" value ="Jane"/>
        <Parameter name="LastName" value ="Doe" />
      </Client>
    </Dial>
</Response>
```

These custom parameters can retrieved using the SDKs. For the Voice JavaScript SDK, refer to [`Connection.customParameters`](/docs/voice/sdks/javascript/twiliodevice#deviceconnectconnectoptions), for iOS, refer to [`TVOConnectOption.params`](https://twilio.github.io/twilio-voice-ios/docs/latest/Classes/TVOConnectOptions.html#//api/name/params), and for Android, refer to [`ConnectOptions.getParams()`](https://sdk.twilio.com/android/voice/latest/docs/com/twilio/voice/ConnectOptions.html#getParams\(\))

## Examples \[#examples]

### Example 1: Dialing a Voice SDK device \[#examples-1]

In this example, we want to connect the current call to a client named `joey`.
To connect the call to `joey`, use a [`<Dial>`](/docs/voice/twiml/dial) verb
with a `<Client>` noun nested inside.

Dialing a Voice SDK device

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const dial = response.dial();
dial.client('joey');

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Client, Dial, VoiceResponse

response = VoiceResponse()
dial = Dial()
dial.client('joey')
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
        dial.Client("joey");
        response.Append(dial);

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.voice.Client;
import com.twilio.twiml.voice.Dial;
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Client client = new Client.Builder("joey").build();
        Dial dial = new Dial.Builder().client(client).build();
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
				&twiml.VoiceClient{
					Identity: "joey",
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
$dial->client('joey');

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.dial do |dial|
  dial.client(identity: 'joey')
end

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial>
        <Client>joey</Client>
    </Dial>
</Response>
```

### Example 2: Simultaneous dialing \[#examples-2]

You can use up to ten total `<Number>` and `<Client>` nouns
within a [`<Dial>`](/docs/voice/twiml/dial) verb to dial multiple `<Number>`s and `<Client>`s at the same time. The first person to answer the call will
be connected to the caller, while the rest of the call attempts are hung up.

Simultaneous Dialing

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const dial = response.dial({
  callerId: '+1888XXXXXXX',
});
dial.number('858-987-6543');
dial.client('joey');
dial.client('charlie');

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Client, Dial, Number, VoiceResponse

response = VoiceResponse()
dial = Dial(caller_id='+1888XXXXXXX')
dial.number('858-987-6543')
dial.client('joey')
dial.client('charlie')
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
        var dial = new Dial(callerId: "+1888XXXXXXX");
        dial.Number("858-987-6543");
        dial.Client("joey");
        dial.Client("charlie");
        response.Append(dial);

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.voice.Client;
import com.twilio.twiml.voice.Dial;
import com.twilio.twiml.voice.Number;
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Number number = new Number.Builder("858-987-6543").build();
        Client client = new Client.Builder("charlie").build();
        Client client2 = new Client.Builder("joey").build();
        Dial dial = new Dial.Builder().callerId("+1888XXXXXXX").number(number)
            .client(client2).client(client).build();
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
			CallerId: "+1888XXXXXXX",
			InnerElements: []twiml.Element{
				&twiml.VoiceNumber{
					PhoneNumber: "858-987-6543",
				},
				&twiml.VoiceClient{
					Identity: "joey",
				},
				&twiml.VoiceClient{
					Identity: "charlie",
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
$dial = $response->dial('', ['callerId' => '+1888XXXXXXX']);
$dial->number('858-987-6543');
$dial->client('joey');
$dial->client('charlie');

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.dial(caller_id: '+1888XXXXXXX') do |dial|
  dial.number('858-987-6543')
  dial.client(identity: 'joey')
  dial.client(identity: 'charlie')
end

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial callerId="+1888XXXXXXX">
        <Number>858-987-6543</Number>
        <Client>joey</Client>
        <Client>charlie</Client>
    </Dial>
</Response>
```

### Example 3: Call-progress events \[#examples-3]

In this case, we want to receive a webhook for each call-progress event when
dialing a Voice SDK device using `<Dial>`.

Call Progress Events

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const dial = response.dial();
dial.client(
  {
    statusCallbackEvent: 'initiated ringing answered completed',
    statusCallback: 'https://myapp.com/calls/events',
    statusCallbackMethod: 'POST',
  },
  'joey'
);

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Client, Dial, VoiceResponse

response = VoiceResponse()
dial = Dial()
dial.client(
    'joey',
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
        dial.Client("joey", statusCallbackEvent: new []{Client.EventEnum
            .Initiated, Client.EventEnum.Ringing, Client.EventEnum.Answered,
            Client.EventEnum.Completed}.ToList(),
            statusCallback: new Uri("https://myapp.com/calls/events"),
            statusCallbackMethod: Twilio.Http.HttpMethod.Post);
        response.Append(dial);

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.voice.Client;
import com.twilio.twiml.voice.Dial;
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.TwiMLException;
import java.util.Arrays;
import com.twilio.http.HttpMethod;

public class Example {
    public static void main(String[] args) {
        Client client = new Client.Builder("joey")
            .statusCallback("https://myapp.com/calls/events")
            .statusCallbackMethod(HttpMethod.POST).statusCallbackEvents(Arrays
            .asList(Client.Event.INITIATED, Client.Event.RINGING, Client.Event
            .ANSWERED, Client.Event.COMPLETED)).build();
        Dial dial = new Dial.Builder().client(client).build();
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
				&twiml.VoiceClient{
					Identity:             "joey",
					StatusCallback:       "https://myapp.com/calls/events",
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
$dial->client('joey',
    ['statusCallbackEvent' => 'initiated ringing answered completed',
    'statusCallback' => 'https://myapp.com/calls/events',
    'statusCallbackMethod' => 'POST']);

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.dial do |dial|
  dial.client(status_callback_event: 'initiated ringing answered completed',
              status_callback: 'https://myapp.com/calls/events',
              status_callback_method: 'POST', identity: 'joey')
end

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial>
        <Client
         statusCallbackEvent='initiated ringing answered completed'
         statusCallback='https://myapp.com/calls/events'
         statusCallbackMethod='POST'>
             joey
        </Client>
    </Dial>
</Response>
```
