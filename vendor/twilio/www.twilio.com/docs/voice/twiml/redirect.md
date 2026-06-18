# TwiML™ Voice: \<Redirect>

The `<Redirect>` verb transfers control of a call to the TwiML at a different URL. All verbs after `<Redirect>` are unreachable and ignored.

## Verb Attributes \[#attributes]

The `<Redirect>` verb supports the following attributes that modify its behavior:

| Attribute Name               | Allowed Values | Default Value |
| :--------------------------- | :------------- | :------------ |
| [method](#attributes-method) | `GET`, `POST`  | `POST`        |

### method \[#attributes-method]

The 'method' attribute takes the value `GET` or `POST`. This tells Twilio
whether to request the `<Redirect>` URL via `HTTP GET` or `POST`. `POST` is the default.

Use it in a `<Redirect>` verb like so:

Using method attribute in a Redirect verb

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
response.redirect(
  {
    method: 'POST',
  },
  'http://pigeons.com/twiml.xml'
);

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Redirect, VoiceResponse

response = VoiceResponse()
response.redirect('http://pigeons.com/twiml.xml', method='POST')

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
        response.Redirect(method: Twilio.Http.HttpMethod.Post,
            url: new Uri("http://pigeons.com/twiml.xml"));

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.voice.Redirect;
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.TwiMLException;
import com.twilio.http.HttpMethod;

public class Example {
    public static void main(String[] args) {
        Redirect redirect = new Redirect
            .Builder("http://pigeons.com/twiml.xml").method(HttpMethod.POST)
            .build();
        VoiceResponse response = new VoiceResponse.Builder().redirect(redirect)
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
		&twiml.VoiceRedirect{
			Method: "POST",
			Url:    "http://pigeons.com/twiml.xml",
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
$response->redirect('http://pigeons.com/twiml.xml', ['method' => 'POST']);

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.redirect('http://pigeons.com/twiml.xml', method: 'POST')

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Redirect method="POST">http://pigeons.com/twiml.xml</Redirect>
</Response>
```

## Nouns \[#nouns]

The "noun" of a TwiML verb is the stuff nested within the verb that's not a verb itself; it's the stuff the verb acts upon. These are the [nouns](https://vimeo.com/2335546) for `<Redirect>`:

| Noun       | TwiML Interpretation                                        |
| ---------- | ----------------------------------------------------------- |
| plain text | An absolute or relative URL for a different TwiML document. |

## Nesting Rules \[#nesting-rules]

No verbs can be nested within `<Redirect>` and `<Redirect>` can't be nested in any other verbs.

## Examples \[#examples]

### Example 1: Absolute URL Redirect \[#examples-1]

In this example, we have a `<Redirect>` verb after a [`<Dial>`](/docs/voice/twiml/dial)
verb with no URL. When the [`<Dial>`](/docs/voice/twiml/dial) verb finishes, the
`<Redirect>` executes. `<Redirect>` makes a request to `http://www.foo.com/nextInstructions` and
transfers the call flow to the TwiML received in response to that request.

Absolute URL Redirect

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
response.dial('415-123-4567');
response.redirect('http://www.foo.com/nextInstructions');

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Dial, Redirect, VoiceResponse

response = VoiceResponse()
response.dial('415-123-4567')
response.redirect('http://www.foo.com/nextInstructions')

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
        response.Redirect(url: new Uri("http://www.foo.com/nextInstructions"));

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.voice.Dial;
import com.twilio.twiml.voice.Redirect;
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Dial dial = new Dial.Builder("415-123-4567").build();
        Redirect redirect = new Redirect
            .Builder("http://www.foo.com/nextInstructions").build();
        VoiceResponse response = new VoiceResponse.Builder().dial(dial)
            .redirect(redirect).build();

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
			Number: "415-123-4567",
		},
		&twiml.VoiceRedirect{
			Url: "http://www.foo.com/nextInstructions",
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
$response->redirect('http://www.foo.com/nextInstructions');

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.dial(number: '415-123-4567')
response.redirect('http://www.foo.com/nextInstructions')

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial>415-123-4567</Dial>
    <Redirect>http://www.foo.com/nextInstructions</Redirect>
</Response>
```

### Example 2: Relative URL Redirect \[#examples-2]

Redirects call flow control to the TwiML at a URL relative to the current URL.

Relative URL Redirect

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
response.redirect('../nextInstructions');

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Redirect, VoiceResponse

response = VoiceResponse()
response.redirect('../nextInstructions')

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
        response.Redirect(url: new Uri("../nextInstructions", UriKind
            .Relative));

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.voice.Redirect;
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Redirect redirect = new Redirect.Builder("../nextInstructions").build();
        VoiceResponse response = new VoiceResponse.Builder().redirect(redirect)
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
		&twiml.VoiceRedirect{
			Url: "../nextInstructions",
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
$response->redirect('../nextInstructions');

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.redirect('../nextInstructions')

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Redirect>../nextInstructions</Redirect>
</Response>
```
