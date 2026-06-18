# TwiML™ Voice: \<Pause>

The `<Pause>` verb waits silently for a specific number of seconds.
If `<Pause>` is the first verb in a TwiML document, Twilio will wait
the specified number of seconds before picking up the call.

## Verb Attributes \[#attributes]

The `<Pause>` verb supports the following attributes that modify its behavior:

| Attribute Name               | Allowed Values | Default Value |
| :--------------------------- | :------------- | :------------ |
| [length](#attributes-length) | integer > 0    | 1 second      |

### length \[#attributes-length]

The 'length' attribute specifies how many seconds Twilio will wait silently before continuing on.

## Nesting Rules \[#nesting-rules]

* You can't nest any verbs within `<Pause>`.
* You can nest the `<Pause>` verb within [`<Gather>`](/docs/voice/twiml/gather).

## Examples \[#examples]

### Example 1: Pause \[#examples-1]

This example demonstrates how to use `<Pause>` to wait between two `<Say>` verbs.

Pause example

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
response.say('I will pause 10 seconds starting now!');
response.pause({
  length: 10,
});
response.say('I just paused 10 seconds');

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Pause, VoiceResponse, Say

response = VoiceResponse()
response.say('I will pause 10 seconds starting now!')
response.pause(length=10)
response.say('I just paused 10 seconds')

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
        response.Say("I will pause 10 seconds starting now!");
        response.Pause(length: 10);
        response.Say("I just paused 10 seconds");

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.voice.Pause;
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.voice.Say;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Say say = new Say.Builder("I will pause 10 seconds starting now!")
            .build();
        Pause pause = new Pause.Builder().length(10).build();
        Say say2 = new Say.Builder("I just paused 10 seconds").build();
        VoiceResponse response = new VoiceResponse.Builder().say(say)
            .pause(pause).say(say2).build();

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
			Message: "I will pause 10 seconds starting now!",
		},
		&twiml.VoicePause{
			Length: "10",
		},
		&twiml.VoiceSay{
			Message: "I just paused 10 seconds",
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
$response->say('I will pause 10 seconds starting now!');
$response->pause(['length' => 10]);
$response->say('I just paused 10 seconds');

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.say(message: 'I will pause 10 seconds starting now!')
response.pause(length: 10)
response.say(message: 'I just paused 10 seconds')

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say>I will pause 10 seconds starting now!</Say>
    <Pause length="10"/>
    <Say>I just paused 10 seconds</Say>
</Response>
```

### Example 2: Delayed pickup \[#examples-2]

This example demonstrates using `<Pause>` to delay Twilio for five seconds before accepting a call.

Delayed pickup

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
response.pause({
  length: 5,
});
response.say('Hi there.');

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Pause, VoiceResponse, Say

response = VoiceResponse()
response.pause(length=5)
response.say('Hi there.')

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
        response.Pause(length: 5);
        response.Say("Hi there.");

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.voice.Pause;
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.voice.Say;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Pause pause = new Pause.Builder().length(5).build();
        Say say = new Say.Builder("Hi there.").build();
        VoiceResponse response = new VoiceResponse.Builder().pause(pause)
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
		&twiml.VoicePause{
			Length: "5",
		},
		&twiml.VoiceSay{
			Message: "Hi there.",
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
$response->pause(['length' => 5]);
$response->say('Hi there.');

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.pause(length: 5)
response.say(message: 'Hi there.')

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Pause length="5"/>
    <Say>Hi there.</Say>
</Response>
```
