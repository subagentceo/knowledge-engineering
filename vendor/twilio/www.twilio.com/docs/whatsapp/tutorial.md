# Twilio API for WhatsApp Tutorials

[The Twilio API for WhatsApp](/docs/whatsapp) is the quickest way to add two-way messaging on WhatsApp into your web application. With the same Twilio API you use for SMS, you can add WhatsApp capabilities to your application by changing just two lines of code.

If you're feeling overwhelmed by the possibilities now that WhatsApp is finally programmable, worry no more! To get you started, we've created these tutorials for common use cases that are well-suited for WhatsApp.

## Twilio API for WhatsApp tutorials and guides

Our Twilio API for WhatsApp Tutorials and Guides show you how to use WhatsApp to power common messaging use cases. Tutorials have code samples in six languages to help you get building faster, with the tools you already use.

* [Get started with WhatsApp and onboard your first sender](/docs/whatsapp#whatsapp-sender-registration)
* [Send and receive media messages in WhatsApp](/docs/whatsapp/tutorial/send-and-receive-media-messages-twilio-api-whatsapp)
* [Send WhatsApp Notification Messages with Templates](/docs/whatsapp/tutorial/send-whatsapp-notification-messages-templates)
* [Use WhatsApp Business Accounts with Twilio](/docs/whatsapp/tutorial/whatsapp-business-account)
* [Using WhatsApp with Twilio Conversations](/docs/conversations-classic/using-whatsapp-conversations)
* [Formatting, location, and other rich messaging features in WhatsApp messaging](/docs/whatsapp/message-features)

## Sending a Message with the Twilio API for WhatsApp

Once you're set up, here's how you'll send messages for 6 web languages and cURL. If you're looking for an even quicker way to send your first WhatsApp message, check out [our quickstarts](/docs/whatsapp/quickstart)!

Sending a Message with the Twilio API for WhatsApp

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
    body: "Your appointment is coming up on July 21 at 3PM",
    from: "whatsapp:+552120420682",
    to: "whatsapp:+13233633791",
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
    from_="whatsapp:+552120420682",
    to="whatsapp:+13233633791",
    body="Your appointment is coming up on July 21 at 3PM",
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
            from: new Twilio.Types.PhoneNumber("whatsapp:+552120420682"),
            to: new Twilio.Types.PhoneNumber("whatsapp:+13233633791"),
            body: "Your appointment is coming up on July 21 at 3PM");

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
                              .creator(new com.twilio.type.PhoneNumber("whatsapp:+13233633791"),
                                  new com.twilio.type.PhoneNumber("whatsapp:+552120420682"),
                                  "Your appointment is coming up on July 21 at 3PM")
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
	params.SetFrom("whatsapp:+552120420682")
	params.SetTo("whatsapp:+13233633791")
	params.SetBody("Your appointment is coming up on July 21 at 3PM")

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
    "whatsapp:+13233633791", // To
    [
        "from" => "whatsapp:+552120420682",
        "body" => "Your appointment is coming up on July 21 at 3PM",
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
            from: 'whatsapp:+552120420682',
            to: 'whatsapp:+13233633791',
            body: 'Your appointment is coming up on July 21 at 3PM'
          )

puts message.body
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:create \
   --from whatsapp:+552120420682 \
   --to whatsapp:+13233633791 \
   --body "Your appointment is coming up on July 21 at 3PM"
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json" \
--data-urlencode "From=whatsapp:+552120420682" \
--data-urlencode "To=whatsapp:+13233633791" \
--data-urlencode "Body=Your appointment is coming up on July 21 at 3PM" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "api_version": "2010-04-01",
  "body": "Your appointment is coming up on July 21 at 3PM",
  "date_created": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_sent": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_updated": "Thu, 24 Aug 2023 05:01:45 +0000",
  "direction": "outbound-api",
  "error_code": null,
  "error_message": null,
  "from": "whatsapp:+552120420682",
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
  "to": "whatsapp:+13233633791",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```
