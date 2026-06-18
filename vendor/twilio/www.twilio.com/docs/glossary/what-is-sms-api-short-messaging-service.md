# What is an SMS API?

A *SMS API* is well-defined software interface which enables code to send short messages via a SMS Gateway.

As the infrastructures for SMS communications and the internet are mostly divided, SMS APIs are often used to 'bridge the gap' between telecommunications carrier networks and the wider web. SMS APIs are used to allow web applications to send and receive text messages through logic written for standard web frameworks.

## Quickly integrate an SMS API with your business

As the number of developers with web experience outnumbers developers with a telecommunications focus, there is a huge demand for SMS APIs and Communications APIs that allow productivity from both worlds. Twilio's [Programmable Messaging](https://www.twilio.com/en-us/messaging/channels/sms) product offers a stable [RESTful API](/docs/iam/api) and powerful features that bring telecommunications programming to the web domain.

Twilio offers both API endpoints which you can hit with any language, as well as a selection of [SDKs](/docs/libraries) which help to build complex communications services into products in little time. Here are some code snippets that demonstrate SMS sending with Twilio:

Send an SMS using the Programmable Messaging API

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
    body: "This is the ship that made the Kessel Run in fourteen parsecs?",
    from: "+15017122661",
    to: "+15558675310",
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
    body="This is the ship that made the Kessel Run in fourteen parsecs?",
    from_="+15017122661",
    to="+15558675310",
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
            body: "This is the ship that made the Kessel Run in fourteen parsecs?",
            from: new Twilio.Types.PhoneNumber("+15017122661"),
            to: new Twilio.Types.PhoneNumber("+15558675310"));

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
                              .creator(new com.twilio.type.PhoneNumber("+15558675310"),
                                  new com.twilio.type.PhoneNumber("+15017122661"),
                                  "This is the ship that made the Kessel Run in fourteen parsecs?")
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
	params.SetBody("This is the ship that made the Kessel Run in fourteen parsecs?")
	params.SetFrom("+15017122661")
	params.SetTo("+15558675310")

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
    "+15558675310", // To
    [
        "body" =>
            "This is the ship that made the Kessel Run in fourteen parsecs?",
        "from" => "+15017122661",
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
            body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
            from: '+15017122661',
            to: '+15558675310'
          )

puts message.body
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:create \
   --body "This is the ship that made the Kessel Run in fourteen parsecs?" \
   --from +15017122661 \
   --to +15558675310
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json" \
--data-urlencode "Body=This is the ship that made the Kessel Run in fourteen parsecs?" \
--data-urlencode "From=+15017122661" \
--data-urlencode "To=+15558675310" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "body": "This is the ship that made the Kessel Run in fourteen parsecs?",
  "date_created": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_sent": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_updated": "Thu, 24 Aug 2023 05:01:45 +0000",
  "direction": "outbound-api",
  "error_code": null,
  "error_message": null,
  "from": "+15017122661",
  "num_media": "0",
  "num_segments": "1",
  "price": null,
  "price_unit": null,
  "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "queued",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media.json"
  },
  "to": "+15558675310",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

Our goal, once you are signed up ([Twilio offers a free trial](https://www.twilio.com/try-twilio)), is to have you sending SMS messages in minutes - not weeks.

## A reliable SMS API to empower quick development

For every step on your communications journey, Twilio is here to help.

Once you have the base 'sending SMS' case working, we've got a wide variety of sample applications, quickstarts, guides and tutorials on [our Documentation site](/docs). We have snippets and samples for all of our core supported web languages (and sometimes other languages), example Curl commands, and a variety of best practices and troubleshooting tips for basic and advanced applications.

Twilio also offers a best in class SMS API, with low latency, high delivery, a very large number inventory, and downtime measured in just *minutes* annually. [Twilio Sales](https://www.twilio.com/en-us/help/sales) is eager to talk through your business's unique challenges and requirements, and our [Support team](https://help.twilio.com) is ready to help you through any roadblocks.

Get started with [Twilio's Programmable Messaging API](https://www.twilio.com/en-us/messaging/channels/sms) today. Let's build something amazing.

## Related links

* [Twilio Programmable Messaging](https://www.twilio.com/en-us/messaging/channels/sms)
* [Twilio Sales](https://www.twilio.com/en-us/help/sales)
* [Build Server Notifications with Twilio Programmable Messaging](/docs/messaging/tutorials/server-notifications)
* [Twilio Tutorials](/docs)
* [Latency](/docs/glossary/what-is-latency)
