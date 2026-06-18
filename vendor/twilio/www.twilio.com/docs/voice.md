# Programmable Voice

## Programmable Voice

With Twilio, you can quickly make and receive voice calls in your application. We provide the docs, code samples, SDKs, and developer tools you need on your journey. You bring your imagination. Let's build something amazing together.

[Make your first voice call](/docs/voice/quickstart/server)

## Tutorial

```python !sample
from flask import Flask
from twilio.twiml.voice_response import VoiceResponse
app = Flask(__name__)

@app.route("/answer", methods=['GET', 'POST'])
def answer_call():
    resp = VoiceResponse()
    resp.say("Twilio's always there when you call!")
    return str(resp)

if __name__ == "__main__":
    app.run()
```

1. When your phone number receives an incoming call, Twilio will send an HTTP request to your server at /answer.
2. Your app tells Twilio how to respond with a text to speech response.
3. Twilio gets the instructions from your app and sends the voice response.

Tutorial code output: "Twilio's always there when you call!"

[Find more examples](/docs/voice/tutorials)

::TutorialResult\[Twilio's always there when you call!]

## Get Started

With just a few lines of code, you'll make your first outgoing phone call with the Voice API. Add a few more and your app can respond to incoming callers. Choose your programming language to get started.

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createCall() {
  const call = await client.calls.create({
    from: "+15558675310",
    to: "+15017122661",
    url: "http://demo.twilio.com/docs/voice.xml",
  });

  console.log(call.sid);
}

createCall();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

call = client.calls.create(
    from_="+15558675310",
    to="+15017122661",
    url="http://demo.twilio.com/docs/voice.xml",
)

print(call.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var call = await CallResource.CreateAsync(
            from: new Twilio.Types.PhoneNumber("+15558675310"),
            to: new Twilio.Types.PhoneNumber("+15017122661"),
            url: new Uri("http://demo.twilio.com/docs/voice.xml"));

        Console.WriteLine(call.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.net.URI;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Call;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Call call = Call.creator(new com.twilio.type.PhoneNumber("+15017122661"),
                            new com.twilio.type.PhoneNumber("+15558675310"),
                            URI.create("http://demo.twilio.com/docs/voice.xml"))
                        .create();

        System.out.println(call.getSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	api "github.com/twilio/twilio-go/rest/api/v2010"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.CreateCallParams{}
	params.SetFrom("+15558675310")
	params.SetTo("+15017122661")
	params.SetUrl("http://demo.twilio.com/docs/voice.xml")

	resp, err := client.Api.CreateCall(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Sid != nil {
			fmt.Println(*resp.Sid)
		} else {
			fmt.Println(resp.Sid)
		}
	}
}
```

```php
<?php

// Update the path below to your autoload.php,
// see https://getcomposer.org/doc/01-basic-usage.md
require_once "/path/to/vendor/autoload.php";

use Twilio\Rest\Client;

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
$sid = getenv("TWILIO_ACCOUNT_SID");
$token = getenv("TWILIO_AUTH_TOKEN");
$twilio = new Client($sid, $token);

$call = $twilio->calls->create(
    "+15017122661", // To
    "+15558675310", // From
    ["url" => "http://demo.twilio.com/docs/voice.xml"]
);

print $call->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

call = @client
       .api
       .v2010
       .calls
       .create(
         from: '+15558675310',
         to: '+15017122661',
         url: 'http://demo.twilio.com/docs/voice.xml'
       )

puts call.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:calls:create \
   --from +15558675310 \
   --to +15017122661 \
   --url http://demo.twilio.com/docs/voice.xml
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Calls.json" \
--data-urlencode "From=+15558675310" \
--data-urlencode "To=+15017122661" \
--data-urlencode "Url=http://demo.twilio.com/docs/voice.xml" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

### Ahoy, World

Make your first call. Jump to a quickstart for the technology stack of your choice:

* [PHP](/docs/voice/quickstart/server)
* [Node.js](/docs/voice/quickstart/server)
* [Python](/docs/voice/quickstart/server)
* [Ruby](/docs/voice/quickstart/server)
* [Java](/docs/voice/quickstart/server)
* [C#](/docs/voice/quickstart/server)
* [Go](/docs/voice/quickstart/server)

## Build your App

You've got an idea in mind. Let's get it to production.

Pick the docs that are right for you. These short tutorials, sample apps, and API reference docs will get you from *dream* to *HTTP `200 OK`*.

https://www.youtube.com/watch?v=7Rqi0iiEFCg

### Voice Tutorials

* [Make outgoing voice calls](/docs/voice/tutorials/how-to-make-outbound-phone-calls)
* [Respond to incoming calls](/docs/voice/tutorials/how-to-respond-to-incoming-phone-calls)
* [Browse our other Voice short tutorials](/docs/voice/tutorials#basic-tutorials)

### Sample Apps

* [Build an Interactive Voice Response system](/docs/voice/tutorials/build-interactive-voice-response-ivr-phone-tree)
* [Add warm transfer for support agents](https://www.twilio.com/blog/warm-transfer-nodejs-express)
* [View our other Voice sample applications](/docs/voice/tutorials)

### Voice API Reference

* [Dive into the Twilio Voice API](/docs/voice/api)
* [Voice API Call resource reference documentation](/docs/voice/api/call-resource)

## Advanced Features

Your application is unique, but you're not alone - we've got the building blocks you need to grow and scale. Use Twilio with your current VoIP system, debug call issues, find the right data, and queue and modify calls. Deploy your app with confidence.

Twilio's [Voice Insights](/docs/voice/voice-insights) takes your apps to the next level and helps you target the right improvements. Surface [jitter](/docs/glossary/what-is-jitter), [mean opinion score](/docs/glossary/what-is-mean-opinion-score-mos), and [latency](/docs/glossary/what-is-latency) issues while monitoring the carrier and hang-up data you need to improve your service.

Build a [Conversational IVR](/docs/voice/virtual-agent) using machine learning and natural language understanding with [Conversation Intelligence (classic)](/docs/conversation-intelligence-classic) and [Virtual Agent](/docs/voice/virtual-agent).

> \[!NOTE]
>
> If you are an Australian Consumer customer, Twilio's Critical Information Summary (CIS) can be found [here](https://docs-resources.prod.twilio.com/documents/CriticalInformationSummaryofProgrammableVoice.docx).

### Advanced Voice

* [Set up SIP for outgoing and incoming calls with Twilio Voice](/docs/voice/api/sip-interface)
* [Forward incoming calls using your logic](https://www.twilio.com/blog/call-forwarding-nodejs-express)

### Insights and Reporting

* [Retrieve call logs](/docs/voice/tutorials/how-to-retrieve-call-logs)
* [Use Twilio Voice Insights to view advanced call metrics like carrier, hang-ups, jitter and latency](/docs/voice/voice-insights)

### Useful Features

* [Modify in-progress calls using the Voice API](/docs/voice/api/call-resource#update-a-call-resource)
* [Build in application features to detect answering machines](/docs/voice/answering-machine-detection)
* Manage Voice in [Twilio Console](https://1console.twilio.com/go?to=/account/__account__/us1/voice/overview/v2) or the [legacy Console](https://console.twilio.com/us1/develop/voice)

## Related Products

Solve problems before they crop up. Protect your users' and employees' privacy in multi-way conversations and quickly match jobs to worker skills and qualifications.

### TaskRouter

Match workers with tasks across voice and other channels

[Product Docs](/docs/taskrouter)

### Twilio Studio

Don't want to code? Create your Voice app with our visual builder

[Product Docs](/docs/studio)
