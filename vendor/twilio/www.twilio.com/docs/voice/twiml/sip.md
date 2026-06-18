# TwiML™ Voice: \<Sip>

The [`<Dial>`](/docs/voice/twiml/dial) verb's `<Sip>` noun lets you set up VoIP sessions by using SIP — Session Initiation Protocol. With this feature, you can send a call to any SIP endpoint. Set up your TwiML to use the `<Sip>` noun within the `<Dial>` verb whenever any of your Twilio phone numbers are called. If you are unfamiliar with SIP, or want more information on how Twilio works with your SIP endpoint, see the [SIP overview](/docs/voice/api/sip-interface).

## The SIP session

The SIP INVITE message includes the API version, the `AccountSid`, and `CallSid` for the call. Optionally, you can also provide a set of parameters to manage signaling transport and authentication, or configure Twilio to pass custom SIP headers in the INVITE message: this method includes headers such as UUI (User-to-user Information).

Once the SIP session completes, Twilio requests the `<Dial>` action URL, passing along the SIP CallID header, the response code of the invite attempt, any X-headers passed back on the final SIP response, as well as the standard Twilio `<Dial>` parameters.

### The `region` parameter \[#Sip-URI-region]

To specify the geographic region from which Twilio will send SIP-out traffic towards your communication infrastructure, you must include the `region` parameter in your SIP URI. For example, if the `region=ie1` parameter is included in your SIP URI, Twilio will send the SIP traffic from the Europe Ireland region:

```bash
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial>
        <Sip>sip:alice@example.com;region=ie1</Sip>
    </Dial>
</Response>
```

| Region | Location                |
| :----- | :---------------------- |
| us1    | North America Virginia  |
| us2    | North America Oregon    |
| ie1    | Europe Ireland          |
| de1    | Europe Frankfurt        |
| sg1    | Asia Pacific Singapore  |
| jp1    | Asia Pacific Tokyo      |
| br1    | South America São Paulo |
| au1    | Asia Pacific Sydney     |

If the `region` parameter is not specified, Twilio will send SIP-out traffic from the North America Virginia region.

### Use the Sip noun \[#sip-noun]

All of the existing [`<Dial>`](/docs/voice/twiml/dial) parameters work with the `<Sip>` noun (record, timeout, hangupOnStar, etc). For SIP calls, the callerId attribute does not need to be a validated phone number. Enter any alphanumeric string. Optionally include the following chars: `+-_.`, but no whitespace.

Within the `<Sip>` noun, you must specify a URI for Twilio to connect to. The URI should be a valid SIP URI under 255 characters. For example:

Use the \<Sip> noun

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const dial = response.dial();
dial.sip('sip:jack@example.com');

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Dial, VoiceResponse, Sip

response = VoiceResponse()
dial = Dial()
dial.sip('sip:jack@example.com')
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
        dial.Sip(new Uri("sip:jack@example.com"));
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
        Sip sip = new Sip.Builder("sip:jack@example.com").build();
        Dial dial = new Dial.Builder().sip(sip).build();
        VoiceResponse response = new VoiceResponse.Builder().dial(dial).build();

        try {
            System.out.println(response.toXml());
        } catch (TwiMLException e) {
            e.printStackTrace();
        }
    }
}
```

```php
<?php
require_once './vendor/autoload.php';
use Twilio\TwiML\VoiceResponse;

$response = new VoiceResponse();
$dial = $response->dial('');
$dial->sip('sip:jack@example.com');

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.dial do |dial|
  dial.sip('sip:jack@example.com')
end

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
<Dial>
    <Sip>
        sip:jack@example.com
    </Sip>
</Dial>
</Response>
```

#### Authentication \[#authentication]

Send username and password attributes for authentication to your SIP infrastructure as attributes on the `<Sip>` noun.

| Attribute Name | Values                          |
| :------------- | :------------------------------ |
| username       | Username for SIP authentication |
| password       | Password for SIP authentication |

For example:

Authentication with your \<Sip>

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const dial = response.dial();
dial.sip(
  {
    username: 'admin',
    password: '1234',
  },
  'sip:kate@example.com'
);

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Dial, VoiceResponse, Sip

response = VoiceResponse()
dial = Dial()
dial.sip('sip:kate@example.com', username='admin', password='1234')
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
        dial.Sip(new Uri("sip:kate@example.com"), username: "admin",
            password: "1234");
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
        Sip sip = new Sip.Builder("sip:kate@example.com").username("admin")
            .password("1234").build();
        Dial dial = new Dial.Builder().sip(sip).build();
        VoiceResponse response = new VoiceResponse.Builder().dial(dial).build();

        try {
            System.out.println(response.toXml());
        } catch (TwiMLException e) {
            e.printStackTrace();
        }
    }
}
```

```php
<?php
require_once './vendor/autoload.php';
use Twilio\TwiML\VoiceResponse;

$response = new VoiceResponse();
$dial = $response->dial('');
$dial->sip('sip:kate@example.com', ['username' => 'admin',
    'password' => '1234']);

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.dial do |dial|
  dial.sip('sip:kate@example.com', username: 'admin', password: '1234')
end

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
<Dial>
    <Sip username="admin" password="1234">sip:kate@example.com</Sip>
</Dial>
</Response>
```

#### Custom headers \[#custom-headers]

Send custom headers by appending them to the SIP URI — just as you'd pass headers in a URI over HTTP. For example:

Custom headers with \<Sip>

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const dial = response.dial();
dial.sip('sip:jack@example.com?x-mycustomheader=foo&x-myotherheader=bar');

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Dial, VoiceResponse, Sip

response = VoiceResponse()
dial = Dial()
dial.sip('sip:jack@example.com?x-mycustomheader=foo&x-myotherheader=bar')
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
        dial
            .Sip(new Uri("sip:jack@example.com?x-mycustomheader=foo&x-myotherheader=bar"));
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
            .Builder("sip:jack@example.com?x-mycustomheader=foo&x-myotherheader=bar").build();
        Dial dial = new Dial.Builder().sip(sip).build();
        VoiceResponse response = new VoiceResponse.Builder().dial(dial).build();

        try {
            System.out.println(response.toXml());
        } catch (TwiMLException e) {
            e.printStackTrace();
        }
    }
}
```

```php
<?php
require_once './vendor/autoload.php';
use Twilio\TwiML\VoiceResponse;

$response = new VoiceResponse();
$dial = $response->dial('');
$dial->sip('sip:jack@example.com?x-mycustomheader=foo&x-myotherheader=bar');

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.dial do |dial|
  dial.sip('sip:jack@example.com?x-mycustomheader=foo&x-myotherheader=bar')
end

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial>
        <Sip>
            sip:jack@example.com?x-mycustomheader=foo&amp;x-myotherheader=bar
        </Sip>
    </Dial>
</Response>
```

While the SIP URI itself must be under 255 chars, the headers must be under 1024 characters. Any headers starting with the `x-` prefix can be sent this way.

You can also send multiple parameters and values as part of the `x-` header

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial>
        <Sip>sip:jack@example.com?x-customname=Madhu%2CMathiyalagan%3BTitle%3DManager&amp;x-myotherheader=bar</Sip>
    </Dial>
</Response>
```

UUI (User-to-User Information) header can be sent without prepending `x-`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial>
        <Sip>sip:jack@example.com?User-to-User=123456789%3Bencoding%3Dhex&amp;x-myotherheader=bar</Sip>
    </Dial>
</Response>
```

The following standard SIP headers can also be sent without prepending `x-`

* `Remote-Party-ID`
* `P-Preferred-Identity`
* `P-Called-Party-ID`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial>
        <Sip>sip:bob@example.com?x-foo%3Dbar&amp;User-To-User=foobar&amp;Remote-Party-ID=%3Csip%3Afoo%40example.com%3E%3Bparty%3Dcalling&amp;P-Preferred-Identity=%3Csip%3Afoo%40example.com%3E&amp;P-Called-Party-ID=%3Csip%3Afoo%40example.com%3E</Sip>
    </Dial>
</Response>
```

#### Transport \[#transport]

Set a parameter on your SIP URI to specify what transport protocol you want to use. Currently, this is limited to `UDP`, `TCP` and `TLS`. By default, Twilio sends your SIP INVITE over `UDP`. Change this by using the transport parameter:

Transport with \<Sip>

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const dial = response.dial();
dial.sip('sip:jack@example.com;transport=tcp');

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Dial, VoiceResponse, Sip

response = VoiceResponse()
dial = Dial()
dial.sip('sip:jack@example.com;transport=tcp')
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
        dial.Sip(new Uri("sip:jack@example.com;transport=tcp"));
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
        Sip sip = new Sip.Builder("sip:jack@example.com;transport=tcp").build();
        Dial dial = new Dial.Builder().sip(sip).build();
        VoiceResponse response = new VoiceResponse.Builder().dial(dial).build();

        try {
            System.out.println(response.toXml());
        } catch (TwiMLException e) {
            e.printStackTrace();
        }
    }
}
```

```php
<?php
require_once './vendor/autoload.php';
use Twilio\TwiML\VoiceResponse;

$response = new VoiceResponse();
$dial = $response->dial('');
$dial->sip('sip:jack@example.com;transport=tcp');

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.dial do |dial|
  dial.sip('sip:jack@example.com;transport=tcp')
end

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial>
        <Sip>
            sip:jack@example.com;transport=tcp
        </Sip>
    </Dial>
</Response>
```

Alternatively, you may customize it to use TLS for SIP signaling. When using TLS, the default port will be 5061 however, a different port may be specified.

TLS Transport with \<Sip>

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const dial = response.dial();
dial.sip('sip:jack@example.com;transport=tls');

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Dial, VoiceResponse, Sip

response = VoiceResponse()
dial = Dial()
dial.sip('sip:jack@example.com;transport=tls')
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
        dial.Sip(new Uri("sip:jack@example.com;transport=tls"));
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
        Sip sip = new Sip.Builder("sip:jack@example.com;transport=tls").build();
        Dial dial = new Dial.Builder().sip(sip).build();
        VoiceResponse response = new VoiceResponse.Builder().dial(dial).build();

        try {
            System.out.println(response.toXml());
        } catch (TwiMLException e) {
            e.printStackTrace();
        }
    }
}
```

```php
<?php
require_once './vendor/autoload.php';
use Twilio\TwiML\VoiceResponse;

$response = new VoiceResponse();
$dial = $response->dial('');
$dial->sip('sip:jack@example.com;transport=tls');

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.dial do |dial|
  dial.sip('sip:jack@example.com;transport=tls')
end

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial>
        <Sip>
            sip:jack@example.com;transport=tls
        </Sip>
    </Dial>
</Response>
```

### `<Sip>` Call parameters \[#sip-call-parameter]

When a SIP call is answered, Twilio passes the following parameters with its request in addition to the standard TwiML \[Voice request parameters]\[request parameters]:

| Parameter    | Values                                                                                                                                                                   |
| :----------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Called       | To header of the SIP Invite message. The SIP identifier of the called party.                                                                                             |
| Caller       | From header of the SIP Invite message. The SIP identifier of the party that initiated the call.                                                                          |
| SipCallId    | The SIP call ID header of the request made to the remote SIP infrastructure.                                                                                             |
| SipDomain    | The host part of the SIP request.                                                                                                                                        |
| SipDomainSid | Your SIP Domain ID. It is 34 characters long, and always starts with the letters `SD`.                                                                                   |
| SipHeader\_  | The name/value of any X-headers returned in the 200 response to the SIP INVITE request. This is applicable only if you are using SIP \[custom headers]\[custom-headers]. |
| SipSourceIp  | Source IP address for SIP signaling.                                                                                                                                     |

### Additional parameters \[#sip-action]

When you invoke \[dial action]\[dial-action] attribute and `<Sip>`, Twilio passes the following parameters with its request in addition to the standard \[dial action]\[dial-action] parameters. Use the action callback parameters to modify your application based on the results of the SIP dial attempt:

| Parameter           | Values                                                                                    |
| :------------------ | :---------------------------------------------------------------------------------------- |
| DialSipCallId       | The SIP call ID header of the request made to the remote SIP infrastructure.              |
| DialSipResponseCode | The SIP response code as a result of the INVITE attempt.                                  |
| DialSipHeader\_     | The name/value of any X-headers returned in the final response to the SIP INVITE request. |

### `<Sip>` Attributes \[#attributes]

The `<Sip>` noun supports the following attributes that modify its behavior:

| Attribute Name                                                                           | Allowed Values                                  | Default Value |
| ---------------------------------------------------------------------------------------- | ----------------------------------------------- | ------------- |
| [method](#attributes-method)                                                             | `GET`, `POST`                                   | `POST`        |
| \[password]\[authentication]                                                             | Password for SIP authentication                 |               |
| [statusCallbackEvent](#attributes-status-callback-event)                                 | `initiated`, `ringing`, `answered`, `completed` | none          |
| [statusCallback](#attributes-status-callback)                                            | any URL                                         | none          |
| [statusCallbackMethod](#attributes-status-callback-method)                               | `GET`, `POST`                                   | `POST`        |
| [url](#attributes-url)                                                                   | call screening URL                              | none          |
| \[username]\[authentication]                                                             | Username for SIP authentication                 |               |
| [machineDetection](#attributes-machine-detection)                                        | `Enable`, `DetectMessageEnd`                    | None          |
| [machineDetectionTimeout](#attributes-machine-detection-timeout)                         | `3`-`60`                                        | `30`          |
| [machineDetectionSpeechThreshold](#attributes-machine-detection-speech-threshold)        | `1000`-`6000`                                   | `2400`        |
| [machineDetectionSpeechEndThreshold](#attributes-machine-detection-speech-end-threshold) | `500`-`5000`                                    | `1200`        |
| [machineDetectionSilenceTimeout](#attributes-machine-detection-silence-timeout)          | `2000`-`10000`                                  | `5000`        |
| [amdStatusCallback](#attributes-amd-status-callback)                                     | Any URL                                         | None          |
| [amdStatusCallbackMethod](#attributes-amd-status-callback-method)                        | `GET`, `POST`                                   | `POST`        |

#### url \[#attributes-url]

The `url` attribute allows you to specify a URL for a TwiML document that
runs on the called party's end, after they answer, but before the two parties are
connected. You can use this TwiML to privately `<Play>` or `<Say>` information to the
called party, or provide a chance to decline the phone call using `<Gather>`
and `<Hangup>`. If \[answerOnBridge]\[dial-answer-on-bridge] attribute is used on `<Dial`>,
the current caller will continue to hear ringing while the TwiML document executes on the other end.
TwiML documents executed in this manner are not allowed to contain the `<Dial>` verb.

#### method \[#attributes-method]

The `method` attribute allows you to specify which HTTP method Twilio should
use when requesting the URL specified in the `url` attribute. The default is `POST`.

#### statusCallbackEvent \[#attributes-status-callback-event]

When dialing out to a number using `<Dial>`, an outbound call is initiated. The
call transitions from the `initiated` state to the `ringing` state when the
phone starts ringing. It transitions to the `answered` state when the call is
picked up, and finally to the `completed` state when the call is over. With
`statusCallbackEvent`, you can subscribe to receive webhooks for the different
call progress events: `initiated`, `ringing`, `answered`, or `completed` for a
given call.

The `statusCallbackEvent` attribute allows you to specify which events Twilio
should webhook on. To specify multiple events separate them with a space:
`initiated ringing answered completed`. If a `statusCallback` is provided and no
status callback events are specified the `completed` event will be sent by default.

As opposed to creating an outbound call via the API, outbound calls created
using `<Dial>` are initiated right away and never queued. The following shows a
timeline of possible call events that can be returned and the different call
statuses that a `<Dial>` leg may experience:

![Timeline of an outbound Dial call showing events: initiated, ringing, answered, completed.](https://docs-resources.prod.twilio.com/8fbb66cf4210d21b105f64f4ba77ab24a09cec1acdd4e6e56f889e3ecf9e2388.png)

| Event     | Description                                                                                                                                                                                                                                 |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| initiated | The `initiated` event is fired when Twilio starts dialing the call.                                                                                                                                                                         |
| ringing   | The `ringing` event is fired when the call starts ringing.                                                                                                                                                                                  |
| answered  | The `answered` event is fired when the call is answered.                                                                                                                                                                                    |
| completed | The `completed` event is fired when the call is completed, regardless of the termination status: `busy`, `canceled`, `completed`, `failed`, or `no-answer`. If no `StatusCallbackEvent` is specified, `completed` will be fired by default. |

#### statusCallback \[#attributes-status-callback]

The `statusCallback` attribute allows you to specify a URL for Twilio to send
webhook requests to on each event specified in the `statusCallbackEvent`
attribute. Non-relative URLs must contain a valid hostname (underscores are not permitted).

The parameters Twilio passes to your application in its asynchronous request to
the `StatusCallback` URL include all parameters passed in a synchronous request
to retrieve TwiML when Twilio receives a call to one of your Twilio numbers.
The full list of parameters and descriptions of each are in the \[TwiML Voice
Request]\[voice-request] documentation.

When the call progress events are fired, the Status Callback request also passes these additional parameters:

| Parameter         | Description                                                                                                                                                                                                                                          |
| :---------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CallSid           | A unique identifier for this call, generated by Twilio. You can use the `CallSid` to modify the child call by \[POSTing to Calls/\{CallSid} with a new TwiML URL]\[update-call].                                                                     |
| ParentCallSid     | A unique identifier for the parent call.                                                                                                                                                                                                             |
| CallStatus        | A descriptive status for the call. The value is one of `queued`, `initiated`, `ringing`, `in-progress`, `busy`, `failed`, or `no-answer`. See the \[CallStatus section]\[call-status] for more details.                                              |
| CallDuration      | The duration in seconds of the just-completed call. Only present in the `completed` event.                                                                                                                                                           |
| RecordingUrl      | The URL of the phone call's recorded audio. This parameter is included only if record is set on the `<Dial>` and does not include recordings initiated in other ways. `RecordingUrl` is only present in the `completed` event.                       |
| RecordingSid      | The unique ID of the \[Recording]\[recordings] from this call. `RecordingSid` is only present in the `completed` event.                                                                                                                              |
| RecordingDuration | The duration of the recorded audio (in seconds). `RecordingDuration` is only present in the `completed` event. To get a final accurate recording duration after any trimming of silence, use \[recordingStatusCallback]\[recording-status-callback]. |
| Timestamp         | The timestamp when the event was fired, given as UTC in \[RFC 2822]\[rfc-2822] format.                                                                                                                                                               |
| CallbackSource    | A string that describes the source of the webhook. This is provided to help disambiguate why the webhook was made. On Status Callbacks, this value is always `call-progress-events`.                                                                 |
| SequenceNumber    | The order in which the events were fired, starting from `0`. Although events are fired in order, they are made as separate HTTP requests and there is no guarantee they will arrive in the same order.                                               |

#### statusCallbackMethod \[#attributes-status-callback-method]

The `statusCallbackMethod` attribute allows you to specify which HTTP method
Twilio should use when requesting the URL in the `statusCallback` attribute.
The default is `POST`.

#### machineDetection \[#attributes-machine-detection]

Whether to detect if a human, answering machine, or fax has picked up the call. Can be: `Enable` or `DetectMessageEnd`. Use `Enable` if you would like us to return `AnsweredBy` as soon as the called party is identified. Use `DetectMessageEnd` if you would like to leave a message on an answering machine.

#### machineDetectionTimeout \[#attributes-machine-detection-timeout]

The number of seconds that we should attempt to detect an answering machine before timing out and sending a voice request with `AnsweredBy` of `unknown`.

#### machineDetectionSpeechThreshold \[#attributes-machine-detection-speech-threshold]

The number of milliseconds that is used as the measuring stick for the length of the speech activity, where durations lower than this value will be interpreted as a human and longer than this value as a machine.

#### machineDetectionSpeechEndThreshold \[#attributes-machine-detection-speech-end-threshold]

The number of milliseconds of silence after speech activity at which point the speech activity is considered complete.

#### machineDetectionSilenceTimeout \[#attributes-machine-detection-silence-timeout]

The number of milliseconds of initial silence after which an unknown `AnsweredBy` result will be returned.

#### amdStatusCallback \[#attributes-amd-status-callback]

The URL that we should call to notify your application whether the call was answered by human, machine, or fax.

#### amdStatusCallbackMethod \[#attributes-amd-status-callback-method]

The HTTP method we should use when calling the amdStatusCallback URL.

### Examples \[#examples]

#### Example 1: Dialing to a SIP endpoint \[#examples-1]

In this example, we want to connect to `kate@example.com`. To connect the call to Kate, use a [`<Dial>`](/docs/voice/twiml/dial) verb with a `<Sip>` noun nested inside.

Dialing to a SIP endpoint

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const dial = response.dial();
dial.sip('kate@example.com');

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Dial, VoiceResponse, Sip

response = VoiceResponse()
dial = Dial()
dial.sip('kate@example.com')
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
        dial.Sip(new Uri("kate@example.com", UriKind.Relative));
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
        Sip sip = new Sip.Builder("kate@example.com").build();
        Dial dial = new Dial.Builder().sip(sip).build();
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
				&twiml.VoiceSip{
					SipUrl: "kate@example.com",
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
$dial->sip('kate@example.com');

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.dial do |dial|
  dial.sip('kate@example.com')
end

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial>
        <Sip>kate@example.com</Sip>
    </Dial>
</Response>
```

#### Example 2: Dial a SIP endpoint, protected by authentication \[#examples-2]

In this example, you are still dialing Kate, but you need to pass authentication credentials to reach her.

Dial a SIP endpoint, protected by authentication

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const dial = response.dial();
dial.sip(
  {
    username: 'admin',
    password: '1234',
  },
  'kate@example.com'
);

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Dial, VoiceResponse, Sip

response = VoiceResponse()
dial = Dial()
dial.sip('kate@example.com', username='admin', password='1234')
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
        dial.Sip(new Uri("kate@example.com", UriKind.Relative),
            username: "admin", password: "1234");
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
        Sip sip = new Sip.Builder("kate@example.com").username("admin")
            .password("1234").build();
        Dial dial = new Dial.Builder().sip(sip).build();
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
				&twiml.VoiceSip{
					Password: "1234",
					SipUrl:   "kate@example.com",
					Username: "admin",
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
$dial->sip('kate@example.com', ['username' => 'admin', 'password' => '1234']);

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.dial do |dial|
  dial.sip('kate@example.com', username: 'admin', password: '1234')
end

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial>
        <Sip username="admin" password="1234">kate@example.com</Sip>
    </Dial>
</Response>
```

#### Example 3: Passing headers \[#examples-3]

In this example, pass custom headers along with the SIP address.

Passing headers

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const dial = response.dial();
dial.sip('sip:kate@example.com?x-mycustomheader=foo&x-myotherheader=bar');

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Dial, VoiceResponse, Sip

response = VoiceResponse()
dial = Dial()
dial.sip('sip:kate@example.com?x-mycustomheader=foo&x-myotherheader=bar')
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
        dial
            .Sip(new Uri("sip:kate@example.com?x-mycustomheader=foo&x-myotherheader=bar"));
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
            .Builder("sip:kate@example.com?x-mycustomheader=foo&x-myotherheader=bar").build();
        Dial dial = new Dial.Builder().sip(sip).build();
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
				&twiml.VoiceSip{
					SipUrl: "sip:kate@example.com?x-mycustomheader=foo&amp;x-myotherheader=bar",
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
$dial->sip('sip:kate@example.com?x-mycustomheader=foo&x-myotherheader=bar');

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.dial do |dial|
  dial.sip('sip:kate@example.com?x-mycustomheader=foo&x-myotherheader=bar')
end

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial>
        <Sip>sip:kate@example.com?x-mycustomheader=foo&amp;x-myotherheader=bar</Sip>
    </Dial>
</Response>
```

#### Example 4: Dial with several attributes \[#examples-4]

A more complex Dial, specifying custom settings as attributes on `<Dial>`, including call screening.

Dial with several attributes

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const dial = response.dial({
  record: 'record-from-answer',
  timeout: 10,
  hangupOnStar: true,
  callerId: 'bob',
  method: 'POST',
  action: '/handle_post_dial',
});
dial.sip(
  {
    method: 'POST',
    url: '/handle_screening_on_answer',
  },
  'sip:kate@example.com?x-customheader=foo'
);

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Dial, VoiceResponse, Sip

response = VoiceResponse()
dial = Dial(
    record='record-from-answer',
    timeout=10,
    hangup_on_star=True,
    caller_id='bob',
    method='POST',
    action='/handle_post_dial'
)
dial.sip(
    'sip:kate@example.com?x-customheader=foo',
    method='POST',
    url='/handle_screening_on_answer'
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
        var dial = new Dial(record: Dial.RecordEnum.RecordFromAnswer,
            timeout: 10, hangupOnStar: true, callerId: "bob", method: Twilio
            .Http.HttpMethod.Post, action: new Uri("/handle_post_dial"));
        dial.Sip(new Uri("sip:kate@example.com?x-customheader=foo"),
            method: Twilio.Http.HttpMethod.Post,
            url: new Uri("/handle_screening_on_answer"));
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
import com.twilio.http.HttpMethod;

public class Example {
    public static void main(String[] args) {
        Sip sip = new Sip.Builder("sip:kate@example.com?x-customheader=foo")
            .method(HttpMethod.POST).url("/handle_screening_on_answer").build();
        Dial dial = new Dial.Builder().record(Dial.Record.RECORD_FROM_ANSWER)
            .timeout(10).hangupOnStar(true).callerId("bob").method(HttpMethod
            .POST).action("/handle_post_dial").sip(sip).build();
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
			Action:       "/handle_post_dial",
			CallerId:     "bob",
			HangupOnStar: "true",
			Method:       "POST",
			Record:       "record-from-answer",
			Timeout:      "10",
			InnerElements: []twiml.Element{
				&twiml.VoiceSip{
					Method: "POST",
					SipUrl: "sip:kate@example.com?x-customheader=foo",
					Url:    "/handle_screening_on_answer",
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
$dial = $response->dial('', ['record' => 'record-from-answer', 'timeout' => 10,
    'hangupOnStar' => 'true', 'callerId' => 'bob', 'method' => 'POST',
    'action' => '/handle_post_dial']);
$dial->sip('sip:kate@example.com?x-customheader=foo', ['method' => 'POST',
    'url' => '/handle_screening_on_answer']);

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.dial(record: 'record-from-answer', timeout: 10, hangup_on_star: true,
              caller_id: 'bob', method: 'POST', action: '/handle_post_dial') do |dial|
  dial.sip('sip:kate@example.com?x-customheader=foo', method: 'POST',
                                                    url: '/handle_screening_on_answer')
end

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Dial
     record="record-from-answer"
     timeout="10"
     hangupOnStar="true"
     callerId="bob"
     method="POST"
     action="/handle_post_dial">

        <Sip
         method="POST"
         url="/handle_screening_on_answer">
            sip:kate@example.com?x-customheader=foo
        </Sip>
    </Dial>
</Response>
```

#### Example 5: Call Progress Events \[#examples-5]

In this example, we want to receive a webhook for each call progress event when
dialing a SIP endpoint using `<Dial>`.

Call Progress Events

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const dial = response.dial();
dial.sip(
  {
    statusCallbackEvent: 'initiated ringing answered completed',
    statusCallback: 'https://myapp.com/calls/events',
    statusCallbackMethod: 'POST',
  },
  'sip:kate@example.com'
);

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Dial, VoiceResponse, Sip

response = VoiceResponse()
dial = Dial()
dial.sip(
    'sip:kate@example.com',
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
        dial.Sip(new Uri("sip:kate@example.com"),
            statusCallbackEvent: new []{Sip.EventEnum.Initiated, Sip.EventEnum
            .Ringing, Sip.EventEnum.Answered, Sip.EventEnum.Completed}.ToList(),
            statusCallback: new Uri("https://myapp.com/calls/events"),
            statusCallbackMethod: Twilio.Http.HttpMethod.Post);
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
import java.util.Arrays;
import com.twilio.http.HttpMethod;

public class Example {
    public static void main(String[] args) {
        Sip sip = new Sip.Builder("sip:kate@example.com")
            .statusCallback("https://myapp.com/calls/events")
            .statusCallbackMethod(HttpMethod.POST).statusCallbackEvents(Arrays
            .asList(Sip.Event.INITIATED, Sip.Event.RINGING, Sip.Event.ANSWERED,
            Sip.Event.COMPLETED)).build();
        Dial dial = new Dial.Builder().sip(sip).build();
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
				&twiml.VoiceSip{
					SipUrl:               "sip:kate@example.com",
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
$dial->sip('sip:kate@example.com',
    ['statusCallbackEvent' => 'initiated ringing answered completed',
    'statusCallback' => 'https://myapp.com/calls/events',
    'statusCallbackMethod' => 'POST']);

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.dial do |dial|
  dial.sip('sip:kate@example.com',
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
        <Sip
         statusCallbackEvent='initiated ringing answered completed'
         statusCallback='https://myapp.com/calls/events'
         statusCallbackMethod='POST'>
            sip:kate@example.com
        </Sip>
    </Dial>
</Response>
```

#### Example 6: Parallel Calling or Simultaneous Dialing \[#examples-6]

Parallel calling, also known as simultaneous dialing, is useful when you have several phones (or several people) that you want to ring when you receive an incoming call. Say you have multiple different endpoints where you can take a call, such as a mobile phone, home phone, office phone, and/or PC soft phone. This feature allows you to call up to ten endpoints at the same time by specifying a `<Dial>` verb with multiple destinations. Additionally, for each endpoint, you can specify which Status Callback events for which you want to receive Webhook requests.

In addition to phone numbers and/or Voice SDK identities, you can now specify SIP URIs for parallel calling using the `<Dial>` verb's `<Sip>` noun.

You can mix up to ten different `<Sip>`, `<Number>`, or `<Client>` nouns within a Dial verb to call simultaneously.

Keep in mind that the first call that connects will cancel all the other attempts. If you dial an office phone system or a mobile phone in airplane mode, etc., that endpoint may pick up after a single ring, preventing the other endpoints from ringing long enough for a human to ever answer. Hence you should take care to use simultaneous dialing in situations where you know the behavior of the called parties.

For the example, Alice has three different ways to contact her using SIP. She wants you to ring her on her SIP soft phone, SIP desk phone and SIP mobile client at the same time, and she will pick up one depending on where she is at the time of the call.

Parallel calling

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const dial = response.dial();
dial.number('+12143211432');
dial.sip('sip:alice-soft-phone@example.com');
dial.sip('sip:alice-desk-phone@example.com');
dial.sip('sip:alice-mobile-client@example.com');

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Dial, Number, VoiceResponse, Sip

response = VoiceResponse()
dial = Dial()
dial.number('+12143211432')
dial.sip('sip:alice-soft-phone@example.com')
dial.sip('sip:alice-desk-phone@example.com')
dial.sip('sip:alice-mobile-client@example.com')
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
        dial.Number("+12143211432");
        dial.Sip(new Uri("sip:alice-soft-phone@example.com"));
        dial.Sip(new Uri("sip:alice-desk-phone@example.com"));
        dial.Sip(new Uri("sip:alice-mobile-client@example.com"));
        response.Append(dial);

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.voice.Dial;
import com.twilio.twiml.voice.Number;
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.voice.Sip;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Number number = new Number.Builder("+12143211432").build();
        Sip sip = new Sip.Builder("sip:alice-mobile-client@example.com")
            .build();
        Sip sip2 = new Sip.Builder("sip:alice-desk-phone@example.com").build();
        Sip sip3 = new Sip.Builder("sip:alice-soft-phone@example.com").build();
        Dial dial = new Dial.Builder().number(number).sip(sip3).sip(sip2)
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
			InnerElements: []twiml.Element{
				&twiml.VoiceNumber{
					PhoneNumber: "+12143211432",
				},
				&twiml.VoiceSip{
					SipUrl: "sip:alice-soft-phone@example.com",
				},
				&twiml.VoiceSip{
					SipUrl: "sip:alice-desk-phone@example.com",
				},
				&twiml.VoiceSip{
					SipUrl: "sip:alice-mobile-client@example.com",
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
$dial->number('+12143211432');
$dial->sip('sip:alice-soft-phone@example.com');
$dial->sip('sip:alice-desk-phone@example.com');
$dial->sip('sip:alice-mobile-client@example.com');

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.dial do |dial|
    dial.number('+12143211432')
    dial.sip('sip:alice-soft-phone@example.com')
    dial.sip('sip:alice-desk-phone@example.com')
    dial.sip('sip:alice-mobile-client@example.com')
end

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial>
    <Number>+12143211432</Number>
    <Sip>sip:alice-soft-phone@example.com</Sip>
    <Sip>sip:alice-desk-phone@example.com</Sip>
    <Sip>sip:alice-mobile-client@example.com</Sip>
  </Dial>
</Response>
```

#### Example 7: Serial Calling or Sequential Dialing \[#examples-7]

Serial calling, also known as sequential dialing, is useful when you have several phones (or several people) that you want to ring in a specific order when you receive an incoming call. Say you have a group of agents in a call center, and you want to try each of them in order until one of them picks up. This feature allows you to call up to ten agents sequentially by specifying a `<Dial>` verb with multiple destinations, and setting the `sequential` attribute to `true`. The priority of the calls is based on the order within the `<Dial>` verb. Additionally, for each endpoint, you can specify which Status Callback events you want to receive via Webhooks.

You can mix up to ten different `<Sip>`, `<Number>`, or `<Client>` nouns within a `<Dial>` verb to call sequentially.

Keep in mind that the first call that connects will cancel all the remaining attempts in the sequence. If you dial an office phone system or a mobile phone in airplane mode, etc., that endpoint may pick up after a single ring, preventing the remaining endpoints from being called. Hence you should take care to use sequential dialing in situations where you know the behavior of the called parties.

For the example below, if Alice rejects or does not answer then the call will go to Bob. Similarly if Bob rejects or does not answer then the call will go to Charlie. If Charlie does not answer, the call will fail.

Serial calling

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const dial = response.dial({
  sequential: true,
});
dial.sip('sip:alice@example.com');
dial.sip('sip:bob@example.com');
dial.sip('sip:charlie@example.com');

console.log(response.toString());
```

```java
import com.twilio.twiml.voice.Dial;
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.voice.Sip;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        Sip sip = new Sip.Builder("sip:alice@example.com").build();
        Sip sip2 = new Sip.Builder("sip:charlie@example.com").build();
        Sip sip3 = new Sip.Builder("sip:bob@example.com").build();
        Dial dial = new Dial.Builder().sequential(true).sip(sip).sip(sip3)
            .sip(sip2).build();
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
			Sequential: "true",
			InnerElements: []twiml.Element{
				&twiml.VoiceSip{
					SipUrl: "sip:alice@example.com",
				},
				&twiml.VoiceSip{
					SipUrl: "sip:bob@example.com",
				},
				&twiml.VoiceSip{
					SipUrl: "sip:charlie@example.com",
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
$dial = $response->dial('', ['sequential' => 'true']);
$dial->sip('sip:alice@example.com');
$dial->sip('sip:bob@example.com');
$dial->sip('sip:charlie@example.com');

echo $response;
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial sequential="true">
    <Sip>sip:alice@example.com</Sip>
    <Sip>sip:bob@example.com</Sip>
    <Sip>sip:charlie@example.com</Sip>
</Dial>
</Response>
```
