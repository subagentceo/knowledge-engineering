# Get started with Messaging Services

Messaging Services bundle messaging features and configuration for a defined pool of senders. These senders include long codes, short codes, toll-free numbers, and other sender types. Use Messaging Services to group and manage your messaging use cases at scale. Create a Messaging Service in the Twilio Console ([Console](https://1console.twilio.com) | [Legacy Console](https://console.twilio.com)) or by using the Messaging Services API.

For more information, see [Messaging Services overview](/docs/messaging/services).

## Prerequisites

You can run the following code samples in your [local development environment](/docs/usage/local-environment) (recommended), with the [Twilio CLI](/docs/twilio-cli/getting-started/install), or using `curl` commands in your terminal.

Before you begin, make sure you have the following:

* A local development environment for [your preferred programming language](/docs/usage/local-environment)
* A [Twilio account](https://www.twilio.com/try-twilio)
* A Twilio phone number

### Get a Twilio phone number

If you don't have a Twilio phone number with SMS functionality, purchase one. In the Twilio Console, go to the Buy a Number page ([Console](https://1console.twilio.com/us1/develop/phone-numbers/manage/search) | [Legacy Console](https://www.twilio.com/console/phone-numbers/search)). Check the **SMS** box, enter your search criteria, and click **Search**.

From the list of available phone numbers, choose a number. Click **Buy** to add it to your account.

> \[!WARNING]
>
> Sending messages to the United States with a Twilio trial account requires a toll-free number. To use a toll-free number to message recipients in the US or Canada, you must complete [toll-free verification](/docs/messaging/compliance/toll-free/console-onboarding).
>
> To use a 10-digit long code (10DLC) number to message recipients in the US, you must upgrade your account and complete A2P 10DLC registration. Learn more about [A2P 10DLC registration](/docs/messaging/compliance/a2p-10dlc).
>
> A2P 10DLC registration isn't required to send messages outside of the United States.

## Create a Messaging Service with the Messaging Services API

After you create the Messaging Service, copy its SID (starts with `MGXX`). You'll use it in the next step.

Create a Messaging Service

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createService() {
  const service = await client.messaging.v1.services.create({
    friendlyName: "My First Messaging Service",
  });

  console.log(service.sid);
}

createService();
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

service = client.messaging.v1.services.create(
    friendly_name="My First Messaging Service"
)

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

        var service = await ServiceResource.CreateAsync(friendlyName: "My First Messaging Service");

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
        Service service = Service.creator("My First Messaging Service").create();

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

	params := &messaging.CreateServiceParams{}
	params.SetFriendlyName("My First Messaging Service")

	resp, err := client.MessagingV1.CreateService(params)
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

$service = $twilio->messaging->v1->services->create(
    "My First Messaging Service" // FriendlyName
);

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
          .services
          .create(friendly_name: 'My First Messaging Service')

puts service.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:messaging:v1:services:create \
   --friendly-name "My First Messaging Service"
```

```bash
curl -X POST "https://messaging.twilio.com/v1/Services" \
--data-urlencode "FriendlyName=My First Messaging Service" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2015-07-30T20:12:31Z",
  "date_updated": "2015-07-30T20:12:33Z",
  "friendly_name": "My First Messaging Service",
  "inbound_request_url": "https://www.example.com/",
  "inbound_method": "POST",
  "fallback_url": "https://www.example.com",
  "fallback_method": "GET",
  "status_callback": "https://www.example.com",
  "sticky_sender": true,
  "smart_encoding": false,
  "mms_converter": true,
  "fallback_to_long_code": true,
  "scan_message_content": "inherit",
  "area_code_geomatch": true,
  "validity_period": 600,
  "synchronous_validation": true,
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

### Add a number to the Messaging Service sender pool

You can use the [Messaging Services API](/docs/messaging/api/service-resource) to add a phone number to your sender pool. Get the unique phone number SID (starts with `PNXXX`) from [Numbers and Senders](https://1console.twilio.com/us1/develop/phone-numbers/manage/incoming) ([Phone Numbers](https://www.twilio.com/console/phone-numbers/) in Legacy Console).

Use the phone number SID and your Messaging Service SID to attach your Twilio number to the Messaging Service that you created:

Add a phone number to the Sender Pool

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createPhoneNumber() {
  const phoneNumber = await client.messaging.v1
    .services("MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .phoneNumbers.create({
      phoneNumberSid: "PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    });

  console.log(phoneNumber.sid);
}

createPhoneNumber();
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

phone_number = client.messaging.v1.services(
    "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).phone_numbers.create(phone_number_sid="PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")

print(phone_number.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Messaging.V1.Service;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var phoneNumber = await PhoneNumberResource.CreateAsync(
            phoneNumberSid: "PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            pathServiceSid: "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(phoneNumber.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.messaging.v1.service.PhoneNumber;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        PhoneNumber phoneNumber =
            PhoneNumber.creator("MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").create();

        System.out.println(phoneNumber.getSid());
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

	params := &messaging.CreatePhoneNumberParams{}
	params.SetPhoneNumberSid("PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")

	resp, err := client.MessagingV1.CreatePhoneNumber("MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

$phone_number = $twilio->messaging->v1
    ->services("MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->phoneNumbers->create(
        "PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" // PhoneNumberSid
    );

print $phone_number->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

phone_number = @client
               .messaging
               .v1
               .services('MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
               .phone_numbers
               .create(phone_number_sid: 'PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')

puts phone_number.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:messaging:v1:services:phone-numbers:create \
   --service-sid MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --phone-number-sid PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X POST "https://messaging.twilio.com/v1/Services/MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/PhoneNumbers" \
--data-urlencode "PhoneNumberSid=PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "service_sid": "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "date_created": "2015-07-30T20:12:31Z",
  "date_updated": "2015-07-30T20:12:33Z",
  "phone_number": "+987654321",
  "country_code": "US",
  "capabilities": [
    "MMS",
    "SMS",
    "Voice"
  ],
  "url": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

> \[!WARNING]
>
> You must add at least one phone number or channel address to the Sender Pool for your Messaging Service before it can send messages.

### Send a message using the Messaging Services API

Sending a message with a Messaging Service works like [sending a message from a Twilio number](/docs/messaging/tutorials/how-to-send-sms-messages), with one key difference. Instead of specifying a `From` phone number in your API request, specify a Messaging Service SID, which is its unique identifier.

This example uses the Messaging Service SID (it starts with `MGXX`) of the Messaging Service created in the previous step. To run the code sample, replace the Messaging Service SID with your own. Replace the `To` number with your own mobile phone number. In a few seconds, you'll receive an SMS message.

Send a Message with a Messaging Service

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createMessage() {
  const message = await client.messages.create({
    body: "Hello from your Messaging Service!",
    messagingServiceSid: "MG9752274e9e519418a7406176694466fa",
    to: "+15553332222",
  });

  console.log(message.body);
}

createMessage();
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

message = client.messages.create(
    body="Hello from your Messaging Service!",
    messaging_service_sid="MG9752274e9e519418a7406176694466fa",
    to="+15553332222",
)

print(message.body)
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

        var message = await MessageResource.CreateAsync(
            body: "Hello from your Messaging Service!",
            messagingServiceSid: "MG9752274e9e519418a7406176694466fa",
            to: new Twilio.Types.PhoneNumber("+15553332222"));

        Console.WriteLine(message.Body);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.type.PhoneNumber;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Message message = Message
                              .creator(new com.twilio.type.PhoneNumber("+15553332222"),
                                  "MG9752274e9e519418a7406176694466fa",
                                  "Hello from your Messaging Service!")
                              .create();

        System.out.println(message.getBody());
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

	params := &api.CreateMessageParams{}
	params.SetBody("Hello from your Messaging Service!")
	params.SetMessagingServiceSid("MG9752274e9e519418a7406176694466fa")
	params.SetTo("+15553332222")

	resp, err := client.Api.CreateMessage(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Body != nil {
			fmt.Println(*resp.Body)
		} else {
			fmt.Println(resp.Body)
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

$message = $twilio->messages->create(
    "+15553332222", // To
    [
        "body" => "Hello from your Messaging Service!",
        "messagingServiceSid" => "MG9752274e9e519418a7406176694466fa",
    ]
);

print $message->body;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

message = @client
          .api
          .v2010
          .messages
          .create(
            body: 'Hello from your Messaging Service!',
            messaging_service_sid: 'MG9752274e9e519418a7406176694466fa',
            to: '+15553332222'
          )

puts message.body
```

```bash
EXCLAMATION_MARK='!'
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:create \
   --body "Hello from your Messaging Service$EXCLAMATION_MARK" \
   --messaging-service-sid MG9752274e9e519418a7406176694466fa \
   --to +15553332222
```

```bash
EXCLAMATION_MARK='!'
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json" \
--data-urlencode "Body=Hello from your Messaging Service$EXCLAMATION_MARK" \
--data-urlencode "MessagingServiceSid=MG9752274e9e519418a7406176694466fa" \
--data-urlencode "To=+15553332222" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "body": "Hello from your Messaging Service!",
  "date_created": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_sent": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_updated": "Thu, 24 Aug 2023 05:01:45 +0000",
  "direction": "outbound-api",
  "error_code": null,
  "error_message": null,
  "from": "+14155552345",
  "num_media": "0",
  "num_segments": "1",
  "price": null,
  "price_unit": null,
  "messaging_service_sid": "MG9752274e9e519418a7406176694466fa",
  "sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "queued",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media.json"
  },
  "to": "+15553332222",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

## Create a Messaging Service with the Twilio Console

In the Twilio Console, go to **Products & Services** > **Messaging** > [**Services**](https://1console.twilio.com/us1/develop/sms/services) ([Messaging > Services](https://www.twilio.com/console/sms/services) in Legacy Console) and click **Create a Messaging Service**.

The Console guides you through adding a number to the Sender Pool, integration with your application, and A2P 10DLC compliance if applicable.

## Insights and troubleshooting

To check the health of your Messaging Service, review [Messaging Insights](/docs/messaging/features/messaging-insights) and [Messaging logs](/docs/messaging/features/messaging-logs).

When you use a Messaging Service, API requests that result in a `400 Bad Request` might not include the error in the initial response. Twilio performs preliminary validation on the request before accepting it. Twilio then attempts to send the message. If the message can't be sent, Twilio marks the message as `Failed` and logs an error. You can find the error in Messaging logs and Insights.

For outbound messages, Messaging logs and Insights record the Messaging Service only if you specify the `MessagingServiceSid` in your request. If you don't include the `MessagingServiceSid`, the Service isn't included in the message record. This applies even if the `From` number belongs to a Messaging Service.

For inbound messages, if your Twilio number is assigned to a Messaging Service, that Service appears in Messaging logs and Insights.

## Default sender ID considerations

Messaging Services support a [Default Sender ID](https://help.twilio.com/articles/26939388970779-Default-Sender-ID) feature. This feature allows you to configure an alphanumeric sender ID as a fallback when sending messages to countries that support it.

> \[!WARNING]
>
> When using Default Sender ID, domestic numbers take precedence over the configured sender ID. If you're sending messages using a phone number from the same country as the recipient, the Default Sender ID won't overwrite the domestic number. The message will be sent from your domestic number. It won't use the alphanumeric sender ID.

For optimal Default Sender ID functionality, avoid using phone numbers from the same country as your alphanumeric sender ID registration.

For example, if you're setting up an Alphanumeric Sender ID for Australia, you must not use an Australian mobile number in this integration. We recommend selecting a US mobile number. If you don't intend to send to the US via this number, you don't need to complete [A2P 10DLC registration](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc).

## Next steps

After you've created your first Messaging Service, explore these resources to enhance your implementation:

* [Messaging Services overview](/docs/messaging/services)
* [The Service resource in the Messaging Services API](/docs/messaging/api/service-resource)
* [Default Sender ID configuration](https://help.twilio.com/articles/26939388970779-Default-Sender-ID)
* [How to Configure Advanced Opt-Out keywords for your Messaging Service](/docs/messaging/tutorials/advanced-opt-out)
