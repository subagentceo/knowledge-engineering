# TwiML™ Voice: \<Queue>

The [`<Dial>`](/docs/voice/twiml/dial) verb's `<Queue>` noun specifies a queue to dial. When dialing a queue, the caller will be connected with the first enqueued call in the specified queue. If the queue is empty, Dial will wait until the next person joins the queue or until the [\<Dial> timeout](/docs/voice/twiml/dial#timeout) duration is reached. If the queue does not exist, Dial will post an error status to its action URL.

## Noun Attributes \[#attributes]

The `<Queue>` noun supports the following attributes that modify its behavior:

| Attribute Name                                         | Allowed Values           | Default Value |
| :----------------------------------------------------- | :----------------------- | :------------ |
| [url](#attributes-url)                                 | relative or absolute URL | none          |
| [method](#attributes-method)                           | `GET`, `POST`            | `POST`        |
| [reservationSid](#attributes-reservationSid)           | Reservation Sid          | none          |
| [postWorkActivitySid](#attributes-postWorkActivitySid) | Activity Sid             | none          |

### url \[#attributes-url]

The `url` attribute takes an absolute or relative URL as a value. The URL points to a TwiML document that
will be executed on the queued caller's end before the two parties are connected. This is typically used
to be able to notify the queued caller that they are about to be connected to an agent or that the call may be recorded.
The allowed verbs in this TwiML document are Play, Say, Pause, and Redirect.

#### Request Parameters \[#attributes-url-parameters]

Twilio will pass the following parameters in addition to the [standard TwiML Voice request parameters](/docs/voice/twiml#request-parameters) with its request to the value of the `url` attribute:

| Parameter       | Description                                      |
| :-------------- | :----------------------------------------------- |
| QueueSid        | The SID of the queue.                            |
| CallSid         | The CallSid of the dequeued call.                |
| QueueTime       | The time the call spent in the queue in seconds. |
| DequeingCallSid | The CallSid of the call dequeuing the caller.    |

### method \[#attributes-method]

The `method` attribute takes the value `GET` or `POST`. This tells Twilio
whether to request the `url` above via `HTTP GET` or `POST`. This attribute
is modeled after the HTML form `method` attribute. `POST` is the default value.

### reservationSid \[#attributes-reservationSid]

If a call was enqueued with a TaskRouter Workflow Sid, you may specify a Reservation Sid in order to bridge this call to the enqueued caller. Once the call has been successfully bridged the pending Reservation will be marked as 'accepted'.

### postWorkActivitySid \[#attributes-postWorkActivitySid]

If a call is bridged using the 'reservationSid' attribute, you may specify an optional `postWorkActivitySid` value to indicate the activity state that the Worker should be moved to after the call completes.

## Examples \[#examples]

### Example 1: Dialing a queue \[#examples-1]

In this example, the caller wants to dequeue a call from the 'support' queue. Before connecting, the following TwiML might be executed:

Dialing a queue

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const dial = response.dial();
dial.queue(
  {
    url: 'about_to_connect.xml',
  },
  'support'
);

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Dial, Queue, VoiceResponse

response = VoiceResponse()
dial = Dial()
dial.queue('support', url='about_to_connect.xml')
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
        dial.Queue("support", url: new Uri("about_to_connect.xml", UriKind
            .Relative));
        response.Append(dial);

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.voice.Dial;
import com.twilio.twiml.voice.Queue;
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Queue queue = new Queue.Builder("support").url("about_to_connect.xml")
            .build();
        Dial dial = new Dial.Builder().queue(queue).build();
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
				&twiml.VoiceQueue{
					Url:  "about_to_connect.xml",
					Name: "support",
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
$dial->queue('support', ['url' => 'about_to_connect.xml']);

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.dial do |dial|
  dial.queue('support', url: 'about_to_connect.xml')
end

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial>
        <Queue url="about_to_connect.xml">support</Queue>
    </Dial>
</Response>
```

And the 'about\_to\_connect.xml" TwiML document which will be played to the caller waiting in the queue before connecting might look something like this:

About to connect

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
response.say('You will now be connected to an agent.');

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import VoiceResponse, Say

response = VoiceResponse()
response.say('You will now be connected to an agent.')

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
        response.Say("You will now be connected to an agent.");

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.voice.Say;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Say say = new Say.Builder("You will now be connected to an agent.")
            .build();
        VoiceResponse response = new VoiceResponse.Builder().say(say).build();

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
				&twiml.VoiceSay{
					Message: "You will now be connected to an agent.",
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
$response->say('You will now be connected to an agent.');

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.say(message: 'You will now be connected to an agent.')

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say>You will now be connected to an agent.</Say>
</Response>
```
