# TwiML™ Voice: \<Play>

The `<Play>` verb plays an audio file back to the caller. Twilio retrieves
the file from a URL that you provide.

The media URL is provided between `<Play>`'s opening and closing tags, as shown in the example below.

Play example

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
response.play('https://api.twilio.com/cowbell.mp3');

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Play, VoiceResponse

response = VoiceResponse()
response.play('https://api.twilio.com/cowbell.mp3')

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
        response.Play(new Uri("https://api.twilio.com/cowbell.mp3"));

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.voice.Play;
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Play play = new Play.Builder("https://api.twilio.com/cowbell.mp3")
            .build();
        VoiceResponse response = new VoiceResponse.Builder().play(play).build();

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
		&twiml.VoicePlay{
			Url: "https://api.twilio.com/cowbell.mp3",
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
$response->play('https://api.twilio.com/cowbell.mp3');

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.play(url: 'https://api.twilio.com/cowbell.mp3')

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Play>https://api.twilio.com/cowbell.mp3</Play>
</Response>
```

## Verb Attributes \[#attributes]

The `<Play>` verb supports the following attributes that modify its behavior:

| Attribute Name               | Allowed Values                                          | Default Value              |
| :--------------------------- | :------------------------------------------------------ | :------------------------- |
| [loop](#attributes-loop)     | digit (`0`-`9`)                                         | `1`                        |
| [digits](#attributes-digits) | digit (`0`-`9`), `A`, `B`, `C`, `D`, `W`, `w`, `#`, `*` | no default digits for Play |

### loop \[#attributes-loop]

The `loop` attribute specifies how many times the audio file is played.
The default behavior is to play the audio once. Specifying `0` will cause
the `<Play>` verb to loop until either the call is hung up or 1000 iterations are performed.

The example below causes Twilio to play the audio from `https://api.twilio.com/cowbell.mp3` 10 times.

Using Play with loop

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
response.play(
  {
    loop: 10,
  },
  'https://api.twilio.com/cowbell.mp3'
);

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Play, VoiceResponse

response = VoiceResponse()
response.play('https://api.twilio.com/cowbell.mp3', loop=10)

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
        response.Play(new Uri("https://api.twilio.com/cowbell.mp3"), loop: 10);

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.voice.Play;
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Play play = new Play.Builder("https://api.twilio.com/cowbell.mp3")
            .loop(10).build();
        VoiceResponse response = new VoiceResponse.Builder().play(play).build();

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
		&twiml.VoicePlay{
			Loop: "10",
			Url:  "https://api.twilio.com/cowbell.mp3",
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
$response->play('https://api.twilio.com/cowbell.mp3', ['loop' => 10]);

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.play(loop: 10, url: 'https://api.twilio.com/cowbell.mp3')

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Play loop="10">https://api.twilio.com/cowbell.mp3</Play>
</Response>
```

### digits \[#attributes-digits]

The `digits` attribute lets you play DTMF tones during a call.

For example, if you need to test an IVR system, you can use this feature to
simulate digits being pressed to navigate through the menu options.

Include lowercase `w` to introduce a `0.5s` pause between DTMF tones and uppercase `W` to introduce a `1s` pause between DTMF tones. For example, `1w2` will tell Twilio to pause `0.5s` before playing DTMF tone `2`.

If you are dialing a phone number and need to play DTMF tones to enter the
extension, you should use [\<Number>'s sendDigits attribute](/docs/voice/twiml/number#attributes-sendDigits).

> \[!NOTE]
>
> Twilio does not send its [standard HTTP parameters](/docs/voice/twiml#request-parameters) when making requests to `<Play>` URLs.

The TwiML example below shows the use of `<Play>` and its `digits` attribute. The value of the `digits` attribute is `www3`, which causes Twilio to pause for 1.5 seconds before playing the DTMF tone for `3`.

Using digits

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
response.play({
  digits: 'wwww3',
});

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Play, VoiceResponse

response = VoiceResponse()
response.play('', digits='wwww3')

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
        response.Play(digits: "wwww3");

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.voice.Play;
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Play play = new Play.Builder("").digits("wwww3").build();
        VoiceResponse response = new VoiceResponse.Builder().play(play).build();

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
		&twiml.VoicePlay{
			Digits: "www3",
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
$response->play('', ['digits' => 'wwww3']);

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.play(digits: 'wwww3')

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Play digits="wwww3"></Play>
</Response>
```

### Supported audio file types

Twilio supports the following audio MIME types for audio files retrieved
by the `<Play>` verb:

| MIME type    | Description                   |
| :----------- | :---------------------------- |
| audio/mpeg   | mpeg layer 3 audio            |
| audio/wav    | wav format audio              |
| audio/wave   | wav format audio              |
| audio/x-wav  | wav format audio              |
| audio/aiff   | audio interchange file format |
| audio/x-aifc | audio interchange file format |
| audio/x-aiff | audio interchange file format |
| audio/x-gsm  | GSM audio format              |
| audio/gsm    | GSM audio format              |
| audio/ulaw   | μ-law audio format            |

## Nesting Rules \[#nesting-rules]

You can't nest any verbs within `<Play>`. You can nest `<Play>` within a [\<Gather>](/docs/voice/twiml/gather) verb, with one major exception - you can't play "digits" within a `<Gather>`.

## Examples \[#examples]

### Example 1: Play \[#examples-1]

This TwiML document tells Twilio to download the `cowbell.mp3` file and
play the audio to the caller.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Play>https://api.twilio.com/cowbell.mp3</Play>
</Response>
```

### Example 2: Using digits \[#examples-2]

We are going to test our IVR menu to make sure users can navigate properly.
We know that the length of the initial greeting and the menu number we need
to enter. We can add a few leading `w` characters to add a pause. Each `w`
character tells Twilio to wait 0.5 seconds instead of playing a digit. This
lets you adjust the timing of when the digits begin playing to suit the phone
system you are dialing.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Play digits="www3"></Play>
</Response>
```

## Hints and Advanced Uses \[#hints]

* Twilio will attempt to cache the audio file the first time it is played. This means the first attempt may be slow to play due to the time spent downloading the file from your remote server. Twilio may play a processing sound while the file is being downloaded.
* Twilio will cache files when HTTP headers allow it (via ETag and Last-Modified headers). Responding with `Cache-Control: no-cache` will ensure Twilio always checks if the file has changed, allowing your web server to respond with a new version or with a 304 Not Modified to instruct Twilio to use its cached version.
* We recommend hosting your media in AWS S3 in us-east-1, eu-west-1, or ap-southeast-2 depending on which Twilio Region you are using. No matter where you host your media files, always ensure that you're setting appropriate Cache Control headers. Twilio uses a caching proxy in its webhook pipeline and will cache media files that have cache headers. Serving media out of Twilio's cache can take 10ms or less. Keep in mind that we run a fleet of caching proxies so it may take multiple requests before all of the proxies have a copy of your file in cache.
* Audio played over the telephone network is transcoded to a format the telephone network understands. Regardless of the quality of the file you provide us, we will transcode so it plays correctly. This may result in lower quality because the telephone number does not support high bitrate audio.
* High bitrate, lossy encoded files, such as 128kbps mp3 files, will take longer to transcode and potentially sound worse than files that are in lossless 8kbps formats. This is due to the inevitable degradation that occurs when converting from lossy compressed formats and the processing involved in converting from higher bit rates to low bit rates.
* `<Play>`ing a file that is longer than 40 minutes can result in a dropped call. If you need to `<Play>` a file longer than 40 minutes, consider splitting it up into smaller chunks.
