# Using Proxy with Flex A2P SMS

> \[!IMPORTANT]
>
> Twilio's Proxy API is currently available as a Public Beta product. Some features are not yet implemented and others may be changed before the product is declared as Generally Available.
>
> Public Beta products are [not covered by a Twilio SLA](https://help.twilio.com/hc/en-us/articles/115002413087-Twilio-Beta-product-support).

> \[!NOTE]
>
> This guide is for Flex UI 1.x and channels that use Programmable Chat and Proxy. If you are using [Flex UI 2.x](/docs/flex/developer/ui-and-plugins) or you are starting out, we recommend that you build with [Flex Conversations](/docs/flex/conversations).

If your contact center is sending SMS traffic in the United States, you're likely sending [Application-to-Person SMS](/docs/glossary/what-a2p-sms-application-person-messaging). As your contact center goes into production and scales its outbound traffic, you might notice that carriers are filtering some of your messages as potential spam. When your contact center gets to this point—or if you plan to send a high volume of outbound messages—it means that you'll need to:

1. Register your SMS traffic with US carriers and
2. Configure your contact center's messaging orchestration to use that registration.

This helps show that your messaging traffic is relevant to your customers and prevents it from being filtered by the US carrier network.

> \[!NOTE]
>
> Carrier filtering is more of an art than a science. Work with your Twilio team to discuss your traffic and come up with a strategy for scaling your traffic. If you're just testing your contact center, however, you shouldn't have any issues. Feel free to return to this document when you're in production!

## Key Concepts for A2P-10DLC in Flex

**Phone Numbers/10DLC:** A phone number in the US is also sometimes called a 10-digit long code (10DLC). If you plan to send traffic to your customers in the US, you'll need to register that Application-to-Person (A2P) traffic with the US Carriers.

**Messaging Services:** A [messaging service](/docs/messaging/services) is a software layer for Programmable SMS that contains a link to your A2P registration. It contains a pool of phone numbers that will all behave according to the messaging service's configuration.

**Twilio Proxy:** [Twilio Proxy](/docs/proxy) is another software product that your Flex Contact Center uses to orchestrate inbound messages and connect them to unique chat channels.

## Register for an Application-to-Person use case

Your first step will be to register for an A2P use case. You can learn more about how to register and what you'll need for registration in the [Direct Brand Onboarding documentation](/docs/messaging/compliance/a2p-10dlc/direct-standard-onboarding).

## Associate your Phone Numbers with your A2P Registration

Typically, Flex messaging orchestration sends inbound messages directly to a software layer called Proxy, as described in the [Flex Messaging overview](/docs/flex/developer/messaging). With A2P-10DLC, however, you first need to associate your phone numbers with your registration from the first step. You can do this using another handy piece of messaging software called a [Messaging Service](/docs/messaging/services). The messaging service will associate your number with your A2P registration before sending traffic to your normal Flex messaging orchestration.

### Create a Messaging Service via the Twilio Console

You'll need to navigate to the [Messaging Services](https://console.twilio.com/us1/develop/sms/services?frameUrl=/console/sms/services) section of the Twilio Console to create a new messaging service. This will take you through four main steps:

1. In Step 1, choose a Friendly Name and use case that feels appropriate for you.
2. Add in any phone numbers that you want to use for messaging. This could be one phone number or many.

![Messaging Service setup showing integration options for handling incoming messages, including 'Defer to sender's webhook'.](https://docs-resources.prod.twilio.com/bbc88dde7ccbb8aca48cdb4e428f17a09009ea78039bb4254506992c19b89f62.png)

3. Set your integration to `Defer to Sender Webhook` - this means that your phone number will keep using Flex messaging orchestration configuration, instead of using any of the messaging service logic. This step is the most important!
4. Click **Complete Messaging Service Setup** to finish setting up your new Messaging Service.
5. Optionally try the [Send an SMS with a Messaging Service](https://console.twilio.com/us1/develop/sms/try-it-out/send-an-sms) option to confirm your newly created Messaging Service is working. For more guidance, see the [Messaging Service docs](/docs/messaging/services).

### Create a Messaging Service via API

You can also [create and update a Messaging Service via the API](/docs/messaging/api/service-resource). In this method, make sure that you have the `useInboundWebhookOnNumber` property set to `True`.

Set useInboundWebhookOnNumber to True

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateService() {
  const service = await client.messaging.v1
    .services("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update({ useInboundWebhookOnNumber: true });

  console.log(service.sid);
}

updateService();
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

service = client.messaging.v1.services(
    "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).update(use_inbound_webhook_on_number=True)

print(service.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Messaging.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var service = await ServiceResource.UpdateAsync(
            useInboundWebhookOnNumber: true, pathSid: "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(service.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.messaging.v1.Service;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Service service =
            Service.updater("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").setUseInboundWebhookOnNumber(true).update();

        System.out.println(service.getSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	messaging "github.com/twilio/twilio-go/rest/messaging/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &messaging.UpdateServiceParams{}
	params.SetUseInboundWebhookOnNumber(true)

	resp, err := client.MessagingV1.UpdateService("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		params)
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

$service = $twilio->messaging->v1
    ->services("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->update(["useInboundWebhookOnNumber" => true]);

print $service->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

service = @client
          .messaging
          .v1
          .services('MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
          .update(use_inbound_webhook_on_number: true)

puts service.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:messaging:v1:services:update \
   --sid MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --use-inbound-webhook-on-number
```

```bash
curl -X POST "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
--data-urlencode "UseInboundWebhookOnNumber=true" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "My Service!",
  "sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2015-07-30T20:12:31Z",
  "date_updated": "2015-07-30T20:12:33Z",
  "sticky_sender": false,
  "mms_converter": true,
  "smart_encoding": false,
  "fallback_to_long_code": true,
  "scan_message_content": "inherit",
  "synchronous_validation": true,
  "area_code_geomatch": true,
  "validity_period": 600,
  "inbound_request_url": "https://www.example.com",
  "inbound_method": "POST",
  "fallback_url": null,
  "fallback_method": "POST",
  "status_callback": "https://www.example.com",
  "usecase": "marketing",
  "us_app_to_person_registered": false,
  "use_inbound_webhook_on_number": true,
  "links": {
    "phone_numbers": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers",
    "short_codes": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ShortCodes",
    "alpha_senders": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AlphaSenders",
    "messages": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages",
    "us_app_to_person": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Compliance/Usa2p",
    "us_app_to_person_usecases": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Compliance/Usa2p/Usecases",
    "channel_senders": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelSenders",
    "destination_alpha_senders": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/DestinationAlphaSenders"
  },
  "url": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

## Next Steps

* Check out the [A2P-10DLC support article](https://help.twilio.com/hc/en-us/articles/1260800720410-What-is-A2P-10DLC-) for further information about A2P 10DLC, Application-to-Person messaging, and additional steps you may need to take to allow your SMS traffic in the US
* Are you looking to register your customers' numbers for A2P traffic? Learn [more about A2P 10DLC for ISVs](/docs/messaging/compliance/a2p-10dlc/onboarding-isv)
* If you're looking to run Flex UI 2.x with Flex Conversations, please refer to the [Conversations A2P Guide](/docs/flex/admin-guide/setup/conversations/a2p-10dlc)
