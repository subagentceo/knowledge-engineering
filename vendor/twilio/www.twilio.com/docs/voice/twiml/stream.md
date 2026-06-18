# TwiML™️ Voice: \<Stream>

The `<Stream>` TwiML noun is used in conjunction with either `<Start>` or `<Connect>`. When Twilio executes the `<Start><Stream>` or `<Connect><Stream>` instruction during a Call, Twilio forks the raw audio stream of the Call and streams it to your [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) server in near real-time.

This page covers supported attributes for `<Stream>` and provides sample code for generating `<Stream>` TwiML instructions with an SDK.

`<Stream>` is part of the Media Streams product. To learn more about Media Streams and how to integrate it with your Voice application, see [Media Streams](/docs/voice/media-streams).

`<Start><Stream>` creates a [unidirectional Stream](/docs/voice/media-streams#unidirectional-media-streams). `<Connect><Stream>` creates a [bidirectional Stream](/docs/voice/media-streams#bidirectional-media-streams).

The following is an example of `<Start><Stream>`:

Start a MediaStream

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const start = response.start();
start.stream({
  name: 'Example Audio Stream',
  url: 'wss://example.com/audiostream',
});
response.say('The stream has started.');

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import VoiceResponse, Say, Start, Stream

response = VoiceResponse()
start = Start()
start.stream(name='Example Audio Stream', url='wss://example.com/audiostream')
response.append(start)
response.say('The stream has started.')

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
        start.Stream(name: "Example Audio Stream", url: "wss://example.com/audiostream");
        response.Append(start);
        response.Say("The stream has started.");

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.voice.Say;
import com.twilio.twiml.voice.Start;
import com.twilio.twiml.voice.Stream;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Stream stream = new Stream.Builder().name("Example Audio Stream").url("wss://example.com/audiostream").build();
        Start start = new Start.Builder().stream(stream).build();
        Say say = new Say.Builder("The stream has started.").build();
        VoiceResponse response = new VoiceResponse.Builder().start(start).say(say).build();

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
				&twiml.VoiceStream{
					Name: "My SIPREC Stream",
					Url:  "wss://example.com/audiostream",
				},
			},
		},
		&twiml.VoiceSay{
			Message: "The stream has started.",
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
$start->stream(['name' => 'Example Audio Stream', 'url' => 'wss://example.com/audiostream']);
$response->say('The stream has started.');

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.start do |start|
    start.stream(name: 'Example Audio Stream', url: 'wss://example.com/audiostream')
end
response.say(message: 'The stream has started.')

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Start>
        <Stream name="Example Audio Stream" url="wss://example.com/audiostream" />
    </Start>
    <Say>The stream has started.</Say>
</Response>
```

When Twilio executes this instruction, it forks the audio stream of the Call. Twilio sends the audio in real-time over a WebSocket connection to the URL specified in the `url` attribute.

While Twilio is setting up the Media Stream, it immediately continues with the next TwiML instruction. If no instruction follows, the Call disconnects. Include a TwiML instruction after `<Start><Stream>` as shown in the example above.

The following is an example of `<Connect><Stream>`:

Connect call to a bidirectional MediaStream

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const connect = response.connect();
connect.stream({ url: 'wss://example.com/audiostream' });
response.say(
  'This TwiML instruction is unreachable unless the Stream is ended by your WebSocket server.'
);

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Connect, VoiceResponse, Say, Stream

response = VoiceResponse()
connect = Connect()
connect.stream(url='wss://example.com/audiostream')
response.append(connect)
response.say(
    'This TwiML instruction is unreachable unless the Stream is ended by your WebSocket server.'
)

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
        var connect = new Connect();
        connect.Stream(url: "wss://example.com/audiostream");
        response.Append(connect);
        response.Say("This TwiML instruction is unreachable unless the Stream is ended by your WebSocket server.");

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.voice.Connect;
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.voice.Stream;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Stream stream = new Stream.Builder()
            .url("wss://mystream.ngrok.io/audiostream").build();
        Connect connect = new Connect.Builder().stream(stream).build();
        VoiceResponse response = new VoiceResponse.Builder().connect(connect)
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
		&twiml.VoiceConnect{
			InnerElements: []twiml.Element{
				&twiml.VoiceStream{
					Url: "wss://example.com/audiostream",
				},
			},
		},
		&twiml.VoiceSay{
			Message: "This TwiML instruction is unreachable unless the Stream is ended by your WebSocket server.",
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
$connect = $response->connect();
$connect->stream(['url' => 'wss://example.com/audiostream']);
$response->say('This TwiML instruction is unreachable unless the Stream is ended by your WebSocket server.');

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.connect do |connect|
    connect.stream(url: 'wss://example.com/audiostream')
end
response.say(message: 'This TwiML instruction is unreachable unless the Stream is ended by your WebSocket server.')

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
   <Connect>
       <Stream url="wss://example.com/audiostream" />
   </Connect>
   <Say>This TwiML instruction is unreachable unless the Stream is ended by your WebSocket server.</Say>
</Response>
```

When you use `<Connect><Stream>`, Twilio doesn't execute subsequent TwiML instructions. Twilio executes the remaining TwiML instructions only after your server closes the WebSocket connection.

## Attributes

`<Stream>` supports the following attributes:

| Attribute Name                                | Allowed Values                                             | Default Value   |
| :-------------------------------------------- | :--------------------------------------------------------- | :-------------- |
| [url](#url)                                   | A relative or absolute URL.                                | none            |
| [name](#name)                                 | Optional. Unique name for the Stream.                      | none            |
| [track](#track)                               | Optional. `inbound_track`, `outbound_track`, `both_tracks` | `inbound_track` |
| [statusCallback](#statuscallback)             | Optional. An absolute URL.                                 | none            |
| [statusCallbackMethod](#statuscallbackmethod) | Optional. `GET` or `POST`                                  | `POST`          |

### url

The `url` attribute accepts either a relative or an absolute URL. On successful execution, Twilio establishes a `wss` WebSocket connection to the URL and begins streaming audio. `wss` is the only supported protocol.

The `url` *does not* support query string parameters. To pass custom key value pairs to the WebSocket, make use of [Custom Parameters](#custom-parameters) instead.

### name

Providing a `name` allows you to reference the Stream directly. This name must be unique per Call. This allows you to [stop a Stream by name](#stop-a-stream).

### track

For unidirectional Streams (`<Start><Stream>`), the `track` attribute allows you to specify which tracks of a Call to receive: `inbound_track`, `outbound_track`, or `both_tracks`. The default value is `inbound_track`.

On any given active Call, there are two tracks: an inbound track and an outbound track. The naming of these tracks is from the Twilio platform perspective.

"Inbound" represents the audio Twilio receives from the other party on the Call. For example, this is the audio of a caller speaking into their cell phone. If you use `inbound_track` (or omit the `track` attribute), your WebSocket endpoint receives [inbound media events](/docs/voice/media-streams/websocket-messages#send-a-media-message).

"Outbound" represents the audio generated by Twilio to the Call. This could be audio generated by `<Say>`, `<Play>` hold music, or audio from a child Call. If you use `outbound_track`, your WebSocket endpoint receives [outbound media events](/docs/voice/media-streams/websocket-messages#send-a-media-message).

If `both_tracks` is used, you will receive both the [inbound media event](/docs/voice/media-streams/websocket-messages#media-message) and [outbound media event](/docs/voice/media-streams/websocket-messages#send-a-media-message).

For bidirectional Streams (`<Connect><Stream>`), you can only receive the `inbound_track`.

### statusCallback

The `statusCallback` attribute takes an absolute URL as a value. Whenever a Stream is started or stopped, Twilio sends an HTTP request to this URL with the following parameters:

| Parameter     | Description                                                                                     |
| :------------ | :---------------------------------------------------------------------------------------------- |
| `AccountSid`  | The unique identifier of the Account responsible for this Stream.                               |
| `CallSid`     | The unique identifier of the Call.                                                              |
| `StreamSid`   | The unique identifier for this Stream.                                                          |
| `StreamName`  | If defined, this is the unique name of the Stream. Defaults to the StreamSid.                   |
| `StreamEvent` | One of `stream-started`, `stream-stopped`, or `stream-error` (see StreamError for the message). |
| `StreamError` | If an error has occurred, this will contain a detailed error message.                           |
| `Timestamp`   | The time of the event in [ISO 8601 format](https://en.wikipedia.org/wiki/ISO_8601#UTC).         |

### statusCallbackMethod

Specifies the HTTP method Twilio uses to request the `statusCallback` URL. Default: `POST`.

## Custom parameters

You can include additional key value pairs that Twilio passes to your WebSocket server. Use the nested `<Parameter>` TwiML noun to add custom parameters.

**Note**: The combined length of each `<Parameter>` `name` and `value` attributes must be under 500 characters.

Provide Custom Parameters to a MediaStream on creation

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const start = response.start();
const stream = start.stream({
  url: 'wss://mystream.ngrok.io/example',
});
stream.parameter({
  name: 'FirstName',
  value: 'Jane',
});
stream.parameter({
  name: 'LastName',
  value: 'Doe',
});

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Parameter, VoiceResponse, Start, Stream

response = VoiceResponse()
start = Start()
stream = Stream(url='wss://mystream.ngrok.io/example')
stream.parameter(name='FirstName', value='Jane')
stream.parameter(name='LastName', value='Doe')
start.append(stream)
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
        var stream = new Stream(url: "wss://mystream.ngrok.io/example");
        stream.Parameter(name: "FirstName", value: "Jane");
        stream.Parameter(name: "LastName", value: "Doe");
        start.Append(stream);
        response.Append(start);

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.voice.Parameter;
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.voice.Start;
import com.twilio.twiml.voice.Stream;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Parameter parameter = new Parameter.Builder().name("FirstName")
            .value("Jane").build();
        Parameter parameter2 = new Parameter.Builder().name("LastName")
            .value("Doe").build();
        Stream stream = new Stream.Builder()
            .url("wss://mystream.ngrok.io/example").parameter(parameter)
            .parameter(parameter2).build();
        Start start = new Start.Builder().stream(stream).build();
        VoiceResponse response = new VoiceResponse.Builder().start(start)
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
		&twiml.VoiceStart{
			InnerElements: []twiml.Element{
				&twiml.VoiceStream{
					Url: "wss://mystream.ngrok.io/example",
					InnerElements: []twiml.Element{
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
$start = $response->start();
$stream = $start->stream(['url' => 'wss://mystream.ngrok.io/example']);
$stream->parameter(['name' => 'FirstName', 'value' => 'Jane']);
$stream->parameter(['name' => 'LastName', 'value' => 'Doe']);

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.start do |start|
    start.stream(url: 'wss://mystream.ngrok.io/example') do |stream|
        stream.parameter(name: 'FirstName', value: 'Jane')
        stream.parameter(name: 'LastName', value: 'Doe')
end
end

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<Response>
    <Start>
        <Stream url="wss://mystream.ngrok.io/example">
            <Parameter name="FirstName" value="Jane" />
            <Parameter name="LastName" value="Doe" />
        </Stream>
    </Start>
</Response>
```

Twilio sends these values to your WebSocket server in the [Start message](/docs/voice/media-streams/websocket-messages#start-message).

## Stop a Stream

If you started a Stream with `<Start>` and the `name` attribute, you can use the `<Stop>` TwiML verb to stop the Stream by `name`.

**Note**: The only way you can stop a bidirectional Stream (one started with `<Connect><Stream>`) is to end the call. You can also update the call with TwiML instructions using the [Update a Call resource](/docs/voice/api/call-resource#update-a-call-resource).

The following sample TwiML instructions start the stream using `<Start>` and the `name` attribute. The `name` is `my_first_stream`:

```xml
<Start>
    <Stream name="my_first_stream" url="wss://mystream.ngrok.io/audiostream" />
</Start>
```

You can later use the unique `name` of `my_first_stream` to stop the Stream, as shown by the following sample TwiML instructions:

```xml
<Stop>
   <Stream name="my_first_stream" />
</Stop>
```

You can also stop a [unidirectional Stream](/docs/voice/media-streams#unidirectional-media-streams) via API. Visit the [Stream resource API reference page](/docs/voice/api/stream-resource) for more information.
