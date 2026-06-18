# How to route calls to your SIP network with an outbound call

> \[!NOTE]
>
> If you are looking to explore SIP functionality, we recommend following the [SIP Quickstart](/docs/voice/sip/quickstart) to get you up and running in a few clicks!

Are you interested in learning how to make calls using SIP with Twilio programmability? This guide will show you how to use [Programmable Voice](https://www.twilio.com/en-us/voice) to make SIP outbound phone calls from Twilio to your Twilio Registered SIP Endpoints.

It's possible to connect an existing Twilio Voice Application directly to your SIP network. You can do this by requesting Twilio make a SIP call from either an existing incoming call, or from an outbound API request. Not only does this give you access to all the powerful Programmable Voice solutions, but it also allows you to lean on the savings by not routing your call through normal PSTN.

## Steps to route calls to your SIP Network

1. Buy a Twilio Number
2. Configure SIP Registration
3. Configure your SIP Endpoint
4. Make an outbound SIP call

Let's get started!

## Buy a Twilio Number

[In the Twilio console](https://1console.twilio.com/go?to=/account/__account__/us1/senders-onboarding?setupGuide=true), search for and purchase an available phone number capable of making outbound calls. You'll use this phone number as the "From" phone number when you initiate an outbound call.

![Search results for voice-capable local numbers in area code 651 with pricing and buy options.](https://docs-resources.prod.twilio.com/ad25acb3103992f4429db457a224efe4f9183b2cd318feb7be00964de2f9e2dd.png)

## Configure SIP Registration

*Note: If you are **not** using Twilio Registered Endpoint then this step is **not applicable** to you.*

In order to make and receive phone calls to a SIP phone, like Zoiper, [SIP Registration](/docs/voice/api/sip-registration) is required. This enables routing the calls to SIP phone/Endpoint. In this tutorial, we are using a Twilio Registered Endpoint to receive the call. This guide will show how to enable registration and setup credentials.

1. Configure a Credential List.

   ## Twilio Console

   1. Open [Twilio Console](https://1console.twilio.com/) and go to [**Voice** > **SIP Domains** > **Credential Lists**](https://1console.twilio.com/go?to=/account/__account__/us1/voice/sip-domains/credential-lists).
   2. Select **Create Credential List**.
   3. Enter a **Credential list friendly name** of `Endpoint`.
   4. In the **Add credentials** section, enter a **Username** (this can be an E.164 number, extension number, or name) of `UserA` and a **Password** of `yourpassword`.
   5. Select **Save**.

   These credentials are used by your SIP Endpoints to authenticate with Twilio.

   ## Legacy Console

   1. Open the [legacy Console](https://www.twilio.com/console/voice/sip/cls) and go to **Programmable Voice** > **Credential Lists**.
   2. Select the **+** icon to create a Credential List.
   3. Add a **Friendly Name** of `Endpoint`, a **Username** (this can be an E.164 number, extension number, or name) of `UserA`, and a **Password** of `yourpassword`, then select **Create**.

   These credentials are used by your SIP Endpoints to authenticate with Twilio.
2. Configure a SIP Domain.

   ## Twilio Console

   1. Open [Twilio Console](https://1console.twilio.com/) and go to [**Voice** > **SIP Domains**](https://1console.twilio.com/go?to=/account/__account__/us1/voice/sip-domains/sip-domains).
   2. Select **Create SIP Domain**.
   3. In the **Properties** section, enter a **SIP domain friendly name** of `T1` and a **SIP URI** of `Trunk1`. SIP URIs must be unique across Twilio — if `Trunk1` is taken, choose another name.
   4. In the **Voice authentication** section, select the `Endpoint` credential list from **Credential lists**.
   5. Select **Create**.
   6. On the SIP Domain details page, find the **SIP registration** section and select **Edit SIP registration**.
   7. Set **Enable SIP registration** to **Enabled**.
   8. Select the `Endpoint` credential list from **Credential lists**.
   9. Select **Save**.

   ## Legacy Console

   1. Open the [legacy Console](https://www.twilio.com/console/voice/sip/endpoints) and go to **Programmable Voice** > **Domains**.
   2. Select the **+** icon to create a SIP Domain.
   3. Add a **Friendly Name** of `T1` and a unique **SIP URI** of `Trunk1`. SIP URI names must be unique, so you might have to find a name that is available.
   4. Scroll down to **Voice Authentication** and associate the `Endpoint` Credential List that you created.
   5. Scroll down to **SIP Registration** and select **Enabled**.
   6. In the **SIP Registration Authentication** section, associate the Credential List that you created, then select **Save**.

## Configure SIP Endpoint

*Note: If you are **not** using Twilio Registered Endpoint then this step is **not applicable** to you.*

A SIP Endpoint can be desk phone or soft phone. In this guide, we will use the soft phone and will configure the phone to successfully register to SIP Registrar.

1. Download and install SIP Endpoint. [Zoiper](https://www.zoiper.com/en/voip-softphone/download/current) is used for example
2. Provide login name - `UserA@Trunk1.sip.us1.twilio.com` (do add **us1** region parameter to your sip domain) and password

   * Username and password from your Credential List in [Twilio Console](https://1console.twilio.com/go?to=/account/__account__/us1/voice/sip-domains/credential-lists) or the [legacy Console](https://www.twilio.com/console/voice/sip/cls).
   * Yourdomain from your SIP Domain in [Twilio Console](https://1console.twilio.com/go?to=/account/__account__/us1/voice/sip-domains/sip-domains) or the [legacy Console](https://www.twilio.com/console/voice/sip/endpoints). For example, `Trunk1.sip.us1.twilio.com` (do add **us1** region parameter to your sip domain while configuring zoiper).
3. Click "Next/continue" to confirm the Domain.
4. Optional settings can be skipped
5. Done! You see in Zoiper that it is "Registered" and has "Tick" next to your login name.
6. You can also verify the successfully registered endpoints in the Registered SIP Endpoints section of your SIP Domain page in Twilio Console.

## Make an outbound SIP call

There are a couple of ways that you can make an outbound SIP call from Twilio. Remember this outbound call that Twilio makes is what will connect with your SIP Network.

### Make an outbound SIP call using an inbound call handler

It's possible to have Twilio run code when a call is received. For our example, we will have that code make an outbound SIP call to our network.

We will now write the TwiML for our application. Because this is a static application, we will use a TwiML Bin. Visit the [TwiML Bin](https://www.twilio.com/console/twiml-bins) page and click the `+` icon to add a new bin.

Set the **Friendly Name** as `SIP Outbound call` and copy and paste the TwiML below

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>Welcome to xyz.com. Your call will be routed to an agent now</Say>
  <Dial>
    <Sip>sip:UserA@Trunk1.sip.us1.twilio.com</Sip>
  </Dial>
</Response>

```

> \[!NOTE]
>
> Make sure to add **us1** region parameter as part of your SIP domain

With our TwiML Bin created, now we need to wire it up to our number.

1. Go to your [Twilio Number](https://www.twilio.com/console/phone-numbers) page
2. Click the Number you have purchased
3. Scroll down to "Voice" under "A Call Comes in" select your configured TwiML Bin as `SIP Outbound call` from the dropdown menu and click "Save"

![Twilio Voice settings with options for configuring webhooks and TwiML Bins.](https://docs-resources.prod.twilio.com/044011ab7bbcac78f4f1639b68ffdc50825a3af73ce3f830ec170bf54d0fd28e.png)

Take your cellphone and dial the [Twilio Number](https://www.twilio.com/console/phone-numbers) you purchased. You should hear a notification that you are being transferred and then an outbound SIP call will be made. Congratulations!

### Make an outbound SIP call using API

Another way to make an outbound call is by using the REST API. Here we will create a `Call` resource and point it directly to our SIP client.

### Retrieve your Twilio account credentials

First, you'll need to get your Twilio account credentials. They consist of your AccountSid and your Auth Token. [They can be found on the home page of the console](https://www.twilio.com/console).

![Twilio Console Dashboard showing account SID and auth token.](https://docs-resources.prod.twilio.com/5eaf0a1ced8599db36b5ae02d252ce2b8161aa2d1192b59f822a97df77bbcf43.png)

There are a few key parameters to drill into when making the outbound call.

* "From" - the username or number you are calling from
* "To" - login name of your SIP Endpoint (Zoiper). For example, `sip:UserA@Trunk1.sip.us1.twilio.com` (do add **us1** as a region parameter to your SIP Domain)
* "TwiML" - The [TwiML](/docs/voice/twiml) instructions on what should happen when the other party picks up the phone.

Visit the [TwiML Bin](https://www.twilio.com/console/twiml-bins) page and click the `+` icon to add a new bin.

Set the **Friendly Name** as `Notification` and copy and paste the TwiML below

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>Well done you have successfully made an outbound SIP call from Twilio using an API</Say>
</Response>
```

Make an outbound SIP call using API

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
    from: "+15017122661",
    to: "sip:UserA@Trunk1.sip.us1.twilio.com",
    twiml:
      "<Response><Say>Hello and thanks for connecting to your SIP network!</Say></Response>",
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
    to="sip:UserA@Trunk1.sip.us1.twilio.com",
    from_="+15017122661",
    twiml="<Response><Say>Hello and thanks for connecting to your SIP network!</Say></Response>",
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
            to: new Twilio.Types.PhoneNumber("sip:UserA@Trunk1.sip.us1.twilio.com"),
            from: new Twilio.Types.PhoneNumber("+15017122661"),
            twiml: new Twilio.Types.Twiml(
                "<Response><Say>Hello and thanks for connecting to your SIP network!</Say></Response>"));

        Console.WriteLine(call.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.type.Twiml;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Call;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Call call = Call.creator(new com.twilio.type.PhoneNumber("sip:UserA@Trunk1.sip.us1.twilio.com"),
                            new com.twilio.type.PhoneNumber("+15017122661"),
                            new com.twilio.type.Twiml(
                                "<Response><Say>Hello and thanks for connecting to your SIP network!</Say></Response>"))
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
	params.SetTo("sip:UserA@Trunk1.sip.us1.twilio.com")
	params.SetFrom("+15017122661")
	params.SetTwiml("<Response><Say>Hello and thanks for connecting to your SIP network!</Say></Response>")

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
    "sip:UserA@Trunk1.sip.us1.twilio.com", // To
    "+15017122661", // From
    [
        "twiml" =>
            "<Response><Say>Hello and thanks for connecting to your SIP network!</Say></Response>",
    ]
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
         to: 'sip:UserA@Trunk1.sip.us1.twilio.com',
         from: '+15017122661',
         twiml: '<Response><Say>Hello and thanks for connecting to your SIP network!</Say></Response>'
       )

puts call.sid
```

```bash
EXCLAMATION_MARK='!'
# Install the twilio-cli from https://twil.io/cli

twilio api:core:calls:create \
   --to sip:UserA@Trunk1.sip.us1.twilio.com \
   --from +15017122661 \
   --twiml "<Response><Say>Hello and thanks for connecting to your SIP network$EXCLAMATION_MARK</Say></Response>"
```

```bash
EXCLAMATION_MARK='!'
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Calls.json" \
--data-urlencode "To=sip:UserA@Trunk1.sip.us1.twilio.com" \
--data-urlencode "From=+15017122661" \
--data-urlencode "Twiml=<Response><Say>Hello and thanks for connecting to your SIP network$EXCLAMATION_MARK</Say></Response>" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "answered_by": null,
  "api_version": "2010-04-01",
  "caller_name": null,
  "date_created": "Tue, 31 Aug 2010 20:36:28 +0000",
  "date_updated": "Tue, 31 Aug 2010 20:36:44 +0000",
  "direction": "inbound",
  "duration": "15",
  "end_time": "Tue, 31 Aug 2010 20:36:44 +0000",
  "forwarded_from": "+141586753093",
  "from": "+15017122661",
  "from_formatted": "(415) 867-5308",
  "group_sid": null,
  "parent_call_sid": null,
  "phone_number_sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "price": "-0.03000",
  "price_unit": "USD",
  "sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "start_time": "Tue, 31 Aug 2010 20:36:29 +0000",
  "status": "completed",
  "subresource_uris": {
    "notifications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Notifications.json",
    "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json",
    "payments": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Payments.json",
    "events": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Events.json",
    "siprec": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Siprec.json",
    "streams": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Streams.json",
    "transcriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions.json",
    "user_defined_message_subscriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UserDefinedMessageSubscriptions.json",
    "user_defined_messages": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UserDefinedMessages.json"
  },
  "to": "sip:UserA@Trunk1.sip.us1.twilio.com",
  "to_formatted": "(415) 867-5309",
  "trunk_sid": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "queue_time": "1000"
}
```

Run the code. You should hear a notification that you have successfully made an outbound SIP call. Congratulations!

## Where to next?

Great work!

* [Make an inbound SIP phone call with Python](/docs/voice/tutorials/how-to-add-programmability-to-your-existing-sip-network)
* [More about Programmable SIP Trunk and its feature](/docs/voice/sip)
* [Pricing](https://www.twilio.com/en-us/voice/sip-interface)

Happy hacking!
