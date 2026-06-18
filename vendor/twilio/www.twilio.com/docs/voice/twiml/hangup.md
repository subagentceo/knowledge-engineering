# TwiML™ Voice: \<Hangup>

The `<Hangup>` verb ends a call. If used as the first verb in a TwiML response
it **does not** prevent Twilio from answering the call and billing your
account. The only way to not answer a call and prevent billing is to use the
[`<Reject>` verb](/docs/voice/twiml/reject).

## Verb Attributes \[#attributes]

The `<Hangup>` verb has no attributes.

## Nesting Rules \[#nesting-rules]

You can't nest any verbs within `<Hangup>` and you can't nest `<Hangup>` within any other verbs.

## Examples \[#examples]

### Example 1 \[#examples-1]

The following code tells Twilio to answer the call and hang up immediately.

Hangup a Call

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
response.hangup();

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Hangup, VoiceResponse

response = VoiceResponse()
response.hangup()

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
        response.Hangup();

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.voice.Hangup;
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Hangup hangup = new Hangup.Builder().build();
        VoiceResponse response = new VoiceResponse.Builder().hangup(hangup)
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
		&twiml.VoiceHangup{},
	})

	fmt.Print(twiml)
}
```

```php
<?php
require_once './vendor/autoload.php';
use Twilio\TwiML\VoiceResponse;

$response = new VoiceResponse();
$response->hangup();

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.hangup

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Hangup/>
</Response>
```

## Hints and Advanced Uses \[#hints]

* When receiving a Twilio request to an 'action' URL within `<Gather>`, `<Record>`, `<Dial>` or `<Sms>`, you can return a response containing the `<Hangup>` verb to end the current call.
