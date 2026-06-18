# TwiML™ Voice: \<Application>

The [`<Dial>`](/docs/voice/twiml/dial) verb's `<Application>` noun lets you connect a call to another Twilio account without losing the original call leg's context (for example, the original `From` number). Rather than dialing a phone number or SIP endpoint, you can `<Dial>` a TwiML App directly with `<Dial><Application>`. `<Dial><Application>` also supports sending custom parameters using `<Parameter>`.

You can manage TwiML Apps through the REST API using the [Application Resource](/docs/usage/api/applications), in the [Twilio Console](https://1console.twilio.com/go?to=/account/__account__/us1/voice/twiml-apps/), or in the [legacy Console](https://console.twilio.com/?frameUrl=/console/voice/twiml/apps).

You can also direct a call to a TwiML App within your TwiML account using `<Dial><Application>`.

**Note:** Simultaneous dialing is NOT supported when performing `<Dial><Application>`.

> \[!NOTE]
>
> This page covers `<Application>`'s attributes, supported TwiML nouns, and supported [`<Dial>`](/docs/voice/twiml/dial)'s attributes.
>
> To learn more about how use `<Dial><Application>`, how Twilio handles `<Dial><Application>` instructions, and an example scenario, see [`<Dial><Application>` usage](/docs/voice/twiml/dial/application/usage).

## Table of Contents

* [Basic usage](#basic-usage)
* [\<Application> attributes](#application-attributes)

  * [customerId](#customerid)
  * [copyParentTo](#copyparentto)
* [Supported TwiML nouns](#application-nouns)

  * [\<ApplicationSid>](#applicationsid)
  * [\<Parameter>](#parameter)
* [Supported \<Dial> attributes](#supported-dial-attributes)

## Basic usage

The TwiML example below shows the most basic use of `<Dial><Application>`.

Basic \<Dial>\<Application>

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const dial = response.dial();
const application = dial.application();
application.applicationSid('AP1234567890abcdef1234567890abcd');

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Application, ApplicationSid, Dial, VoiceResponse

response = VoiceResponse()
dial = Dial()
application = Application()
application.application_sid('AP1234567890abcdef1234567890abcd')
dial.append(application)
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
        var application = new Application();
        application.ApplicationSid("AP1234567890abcdef1234567890abcd");
        dial.Append(application);
        response.Append(dial);

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.voice.Application;
import com.twilio.twiml.voice.ApplicationSid;
import com.twilio.twiml.voice.Dial;
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        ApplicationSid applicationsid = new ApplicationSid.Builder("AP1234567890abcdef1234567890abcd").build();
        Application application = new Application.Builder().applicationSid(applicationsid).build();
        Dial dial = new Dial.Builder().application(application).build();
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
				&twiml.VoiceApplication{
					InnerElements: []twiml.Element{
						&twiml.VoiceApplicationSid{
							Sid: "AP1234567890abcdef1234567890abcd",
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
$application = $dial->application();
$application->applicationsid('AP1234567890abcdef1234567890abcd');

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.dial do |dial|
    dial.application do |application|
        application.application_sid('AP1234567890abcdef1234567890abcd')
end
end

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial>
    <Application>
      <ApplicationSid>AP1234567890abcdef1234567890abcd</ApplicationSid>
    </Application>
  </Dial>
</Response>
```

## `<Application>` attributes

`<Application>` supports the following attributes:

| Attribute                 | Allowed Values                          | Default Value                                                                         |
| ------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------- |
| `customerId` *optional*   | a string up to 256 characters in length | The Twilio Account SID that is providing the `<Dial><Application>` TwiML instructions |
| `copyParentTo` *optional* | `true`, `false`                         | `false`                                                                               |

### customerId

`<Application>`'s `customerId` attribute lets you to set an identifier for the "sender" of the `<Dial><Application>`. The `customerId` is sent as a parameter in the request to the TwiML App's Voice Request URL.

The `customerId` attribute can be any string up to 256 characters.

The default value of the `customerId` attribute is the Account SID associated with the `<Dial><Application>` TwiML.

The `customerId` attribute is optional.

\<Dial>\<Application> with customerId attribute

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const dial = response.dial();
const application = dial.application({
  customerId: 'CustomerFriendlyName',
});
application.applicationSid('AP1234567890abcdef1234567890abcd');

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Application, ApplicationSid, Dial, VoiceResponse

response = VoiceResponse()
dial = Dial()
application = Application(customer_id='CustomerFriendlyName')
application.application_sid('AP1234567890abcdef1234567890abcd')
dial.append(application)
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
        var application = new Application(customerId: "CustomerFriendlyName");
        application.ApplicationSid("AP1234567890abcdef1234567890abcd");
        dial.Append(application);
        response.Append(dial);

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.voice.Application;
import com.twilio.twiml.voice.ApplicationSid;
import com.twilio.twiml.voice.Dial;
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        ApplicationSid applicationsid = new ApplicationSid.Builder("AP1234567890abcdef1234567890abcd").build();
        Application application = new Application.Builder().customerId("CustomerFriendlyName").applicationSid(applicationsid).build();
        Dial dial = new Dial.Builder().application(application).build();
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
$application = $dial->application();
$application->applicationsid('AP1234567890abcdef1234567890abcd');
$application->setCustomerId('CustomerFriendlyName');

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.dial do |dial|
    dial.application(customer_id: 'CustomerFriendlyName') do |application|
        application.application_sid('AP1234567890abcdef1234567890abcd')
end
end

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial>
    <Application customerId="CustomerFriendlyName">
      <ApplicationSid>AP1234567890abcdef1234567890abcd</ApplicationSid>
    </Application>
  </Dial>
</Response>
```

### copyParentTo

`<Application>`'s `copyParentTo` attribute, when set to `true`, uses the parent call's `To` parameter as the `To` parameter in the request to the TwiML App's Voice URL.

When the `copyParentTo` value is `false`, the `To` field is the dialed TwiML App's SID.

The default value of the `copyParentTo` attribute is `false`.

The `copyParentTo` attribute is optional.

\<Dial>\<Application> with copyParentTo attribute

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const dial = response.dial();
const application = dial.application({
  copyParentTo: true,
});
application.applicationSid('AP1234567890abcdef1234567890abcd');

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Application, ApplicationSid, Dial, VoiceResponse

response = VoiceResponse()
dial = Dial()
application = Application(copy_parent_to=True)
application.application_sid('AP1234567890abcdef1234567890abcd')
dial.append(application)
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
        var application = new Application(copyParentTo: true);
        application.ApplicationSid("AP1234567890abcdef1234567890abcd");
        dial.Append(application);
        response.Append(dial);

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.voice.Application;
import com.twilio.twiml.voice.ApplicationSid;
import com.twilio.twiml.voice.Dial;
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        ApplicationSid applicationsid = new ApplicationSid.Builder("AP1234567890abcdef1234567890abcd").build();
        Application application = new Application.Builder().copyParentTo(true).applicationSid(applicationsid).build();
        Dial dial = new Dial.Builder().application(application).build();
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
				&twiml.VoiceApplication{
					CopyParentTo: "true",
					InnerElements: []twiml.Element{
						&twiml.VoiceApplicationSid{
							Sid: "AP1234567890abcdef1234567890abcd",
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
$application = $dial->application();
$application->applicationsid('AP1234567890abcdef1234567890abcd');
$application->setCopyParentTo('true');

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.dial do |dial|
    dial.application(copy_parent_to: true) do |application|
        application.application_sid('AP1234567890abcdef1234567890abcd')
end
end

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial>
    <Application copyParentTo="true">
      <ApplicationSid>AP1234567890abcdef1234567890abcd</ApplicationSid>
    </Application>
  </Dial>
</Response>
```

## `<Application>` Nouns

`<Application>` accepts nested `<ApplicationSid>` and `<Parameter>` nouns.

`<Application>` is required, while `<Parameter>` is optional.

### `<ApplicationSid>`

In order to use `<Dial><Application>`, an `<ApplicationSid>` noun must be nested within `<Application>`'s opening and closing tags.

Between `<ApplicationSid>`'s opening and closing tags, specify the SID of the TwiML App that you want to dial.

Basic \<Dial>\<Application>

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const dial = response.dial();
const application = dial.application();
application.applicationSid('AP1234567890abcdef1234567890abcd');

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Application, ApplicationSid, Dial, VoiceResponse

response = VoiceResponse()
dial = Dial()
application = Application()
application.application_sid('AP1234567890abcdef1234567890abcd')
dial.append(application)
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
        var application = new Application();
        application.ApplicationSid("AP1234567890abcdef1234567890abcd");
        dial.Append(application);
        response.Append(dial);

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.voice.Application;
import com.twilio.twiml.voice.ApplicationSid;
import com.twilio.twiml.voice.Dial;
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        ApplicationSid applicationsid = new ApplicationSid.Builder("AP1234567890abcdef1234567890abcd").build();
        Application application = new Application.Builder().applicationSid(applicationsid).build();
        Dial dial = new Dial.Builder().application(application).build();
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
				&twiml.VoiceApplication{
					InnerElements: []twiml.Element{
						&twiml.VoiceApplicationSid{
							Sid: "AP1234567890abcdef1234567890abcd",
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
$application = $dial->application();
$application->applicationsid('AP1234567890abcdef1234567890abcd');

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.dial do |dial|
    dial.application do |application|
        application.application_sid('AP1234567890abcdef1234567890abcd')
end
end

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial>
    <Application>
      <ApplicationSid>AP1234567890abcdef1234567890abcd</ApplicationSid>
    </Application>
  </Dial>
</Response>
```

### `<Parameter>`

`<Dial><Application>` supports `<Parameter>` nouns, which allows you to pass custom parameters in [Twilio's request to the receiving TwiML App's Voice URL](/docs/voice/twiml#request-parameters).

You may nest one or more `<Parameter>` nouns within `<Application>`.

Each `<Parameter>` noun nested inside `<Application>` represents a key-value pair of information you send in Twilio's request to the TwiML App's Voice URL.

The `<Parameter>` noun has two attributes:

* `name` - the name of your custom parameter
* `value` - the value of your custom parameter

Each custom parameter is passed as a request parameter in Twilio's request to the TwiML App's Voice URL. In the request, each custom parameter's `name` is prefixed with `Param_`.

The TwiML example below shows how to use `<Dial><Application>` with nested `<Parameter>` nouns.

\<Dial> \<Application> with \<Parameter>

```js
const VoiceResponse = require('twilio').twiml.VoiceResponse;

const response = new VoiceResponse();
const dial = response.dial();
const application = dial.application();
application.applicationSid('AP1234567890abcdef1234567890abcd');
application.parameter({
  name: 'AccountNumber',
  value: '12345',
});
application.parameter({
  name: 'TicketNumber',
  value: '9876',
});

console.log(response.toString());
```

```py
from twilio.twiml.voice_response import Application, ApplicationSid, Dial, Parameter, VoiceResponse

response = VoiceResponse()
dial = Dial()
application = Application()
application.application_sid('AP1234567890abcdef1234567890abcd')
application.parameter(name='AccountNumber', value='12345')
application.parameter(name='TicketNumber', value='9876')
dial.append(application)
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
        var application = new Application();
        application.ApplicationSid("AP1234567890abcdef1234567890abcd");
        application.Parameter(name: "AccountNumber", value: "12345");
        application.Parameter(name: "TicketNumber", value: "9876");
        dial.Append(application);
        response.Append(dial);

        Console.WriteLine(response.ToString());
    }
}
```

```java
import com.twilio.twiml.voice.Application;
import com.twilio.twiml.voice.ApplicationSid;
import com.twilio.twiml.voice.Dial;
import com.twilio.twiml.voice.Parameter;
import com.twilio.twiml.VoiceResponse;
import com.twilio.twiml.TwiMLException;


public class Example {
    public static void main(String[] args) {
        ApplicationSid applicationsid = new ApplicationSid.Builder("AP1234567890abcdef1234567890abcd").build();
        Parameter parameter = new Parameter.Builder().name("TicketNumber").value("9876").build();
        Parameter parameter2 = new Parameter.Builder().name("AccountNumber").value("12345").build();
        Application application = new Application.Builder().applicationSid(applicationsid).parameter(parameter2).parameter(parameter).build();
        Dial dial = new Dial.Builder().application(application).build();
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
				&twiml.VoiceApplication{
					InnerElements: []twiml.Element{
						&twiml.VoiceApplicationSid{
							Sid: "AP1234567890abcdef1234567890abcd",
						},
						&twiml.VoiceParameter{
							Name:  "AccountNumber",
							Value: "12345",
						},
						&twiml.VoiceParameter{
							Name:  "TicketNumber",
							Value: "9876",
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
$application = $dial->application();
$application->applicationsid('AP1234567890abcdef1234567890abcd');
$application->parameter(['name' => 'AccountNumber', 'value' => '12345']);
$application->parameter(['name' => 'TicketNumber', 'value' => '9876']);

echo $response;
```

```rb
require 'twilio-ruby'

response = Twilio::TwiML::VoiceResponse.new
response.dial do |dial|
    dial.application do |application|
        application.application_sid('AP1234567890abcdef1234567890abcd')
        application.parameter(name: 'AccountNumber', value: '12345')
        application.parameter(name: 'TicketNumber', value: '9876')
end
end

puts response
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial>
    <Application>
      <ApplicationSid>AP1234567890abcdef1234567890abcd</ApplicationSid>
      <Parameter name="AccountNumber" value="12345"/>
      <Parameter name="TicketNumber" value="9876"/>
    </Application>
  </Dial>
</Response>
```

For the preceding example, the body of Twilio's request to the TwiML App's Voice URL contains `Param_AccountNumber: "12345"` and `Param_TicketNumber: "9876"`.

## Supported `<Dial>` attributes

`<Application>` supports the following `<Dial>` attributes:

* [action](/docs/voice/twiml/dial#action)
* [callerId](/docs/voice/twiml/dial#callerid)
* [answerOnBridge](/docs/voice/twiml/dial#answeronbridge)
* [callReason](/docs/voice/twiml/dial#callreason)
* [timeLimit](/docs/voice/twiml/dial#timelimit)
* [timeout](/docs/voice/twiml/dial#timeout)
* [method](/docs/voice/twiml/dial#method)
* [hangupOnStar](/docs/voice/twiml/dial#hanguponstar)
* [record](/docs/voice/twiml/dial#record)
* [recordingStatusCallback](/docs/voice/twiml/dial#recordingstatuscallback)
* recordingStatusCallbackMethod
* [recordingStatusCallbackEvent](/docs/voice/twiml/dial#recordingstatuscallbackevent)
* [recordingTrack](/docs/voice/twiml/dial#recordingtrack)
* [ringTone](/docs/voice/twiml/dial#ringtone)

`<Dial><Application>` supports sending custom parameters from the dialed party back to the originating `<Dial>`'s `action` URL. Learn more on the [`<Dial><Application>` Usage page](/docs/voice/twiml/dial/application/usage).

**Note:** REFER support via `referUrl` is NOT supported when using `<Dial><Application>`.
