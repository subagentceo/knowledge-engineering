# API

An Application Programming Interface (API) is provided by a service owner so that others may use the features and functions enabled by the service. APIs describe how a consumer will make requests of the service, and what they will receive in return.

An API defines the means by which the consumer or user of a service invokes service functions and receives data in return from the provider of the API. There are many different kinds of APIs, from the [Swift](https://developer.apple.com/swift/) APIs provided by iOS to provide mobile apps with access to the many facilities provided by the operating system, to [REST APIs](/docs/glossary/what-is-a-rest-api) provided by Twilio that allow developers to send SMS and do tons of other things.

![Flow of inbound and outbound SMS with HTTP requests and responses between a phone and an app.](https://docs-resources.prod.twilio.com/c15f2bf86138c03fe2b76b46fa25e1dba9bef1bd079c95b3b0cb8bb6ebfb847c.png)

Twilio, as an API company, provides many different APIs to our customers to help them build applications that communicate. Check out the [API reference](/docs) for a full listing of the APIs Twilio provides for developers to use. Primarily, Twilio provides REST APIs and software APIs for developers to use in order to do fun things like answer phone calls, make video calls, or instantly synchronize data between two clients.

## REST APIs

A [REST API](/docs/glossary/what-is-a-rest-api) allows systems to communicate with one another and invoke functions over the Internet.

## Software APIs

In a typical software program, you will use a combination of a programming language's built-in features, its syntax, and APIs provided either by the language's standard library or libraries created and published by third-parties. Twilio provides [libraries for many popular programming languages](/docs/libraries) that allow developers on those platforms to consume our services.

Here's an example of using Twilio's SDKs to send an SMS message using different languages.

Sending an SMS in different languages

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

Don't know an API from an [IPA](https://en.wikipedia.org/wiki/India_pale_ale)? [Talk to an expert](https://www.twilio.com/en-us/help/sales), or get some help from our [support team](https://help.twilio.com).
