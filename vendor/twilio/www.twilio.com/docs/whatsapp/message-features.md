# Rich Messaging Features in the Twilio API for WhatsApp

Twilio supports the latest WhatsApp-specific features to make it easier for your customers to engage with you.

## Rich outbound messages with Content Template Builder

WhatsApp's latest rich features are supported using Twilio's [Content Template Builder](/docs/content/overview).

These features include:

* Formatting message text
* Messages including location information
* Card messages with images, text, and/or buttons
* List messages
* Call-to-action messages
* Messages with quick reply buttons
* Product Catalogs
* Carousels
* Flows

## Rich Inbound Features in Webhooks

Twilio supports the latest inbound metadata made available by WhatsApp. This includes the end user's profile name, click to WhatsApp ad parameters, and much more.

See [our request to your webhook URL](/docs/messaging/guides/webhook-request#whatsapp-specific-parameters) for all of the supported inbound parameters for rich messages.

## Formatting in WhatsApp Messages

WhatsApp allows text, emojis, and some formatting in messages. To format all or part of a message, use these formatting symbols:

| Formatting           | Symbol                   | Example                  |
| -------------------- | ------------------------ | ------------------------ |
| Bold                 | Asterisk (\*\*)          | Your total is *$10.50*.  |
| Italic               | Underscore (\_)          | Welcome to *WhatsApp*!   |
| Strike-through       | Tilde (\~)               | This is ~~better~~ best! |
| Code / Pre-formatted | Three backticks (\`\`\`) | `print 'Hello World';`   |

Send a formatted WhatsApp message

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
    body: "🎶I am _not_ ~pushing~ throwing away my *shot*!",
    from: "whatsapp:+15005550006",
    messagingServiceSid: "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    to: "whatsapp:+14155552345",
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
    from_="whatsapp:+15005550006",
    messaging_service_sid="MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    body="🎶I am _not_ ~pushing~ throwing away my *shot*!",
    to="whatsapp:+14155552345",
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
            from: new Twilio.Types.PhoneNumber("whatsapp:+15005550006"),
            messagingServiceSid: "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            body: "🎶I am _not_ ~pushing~ throwing away my *shot*!",
            to: new Twilio.Types.PhoneNumber("whatsapp:+14155552345"));

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
                              .creator(new com.twilio.type.PhoneNumber("whatsapp:+14155552345"),
                                  new com.twilio.type.PhoneNumber("whatsapp:+15005550006"),
                                  "🎶I am _not_ ~pushing~ throwing away my *shot*!")
                              .setMessagingServiceSid("MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
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
	params.SetFrom("whatsapp:+15005550006")
	params.SetMessagingServiceSid("MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
	params.SetBody("🎶I am _not_ ~pushing~ throwing away my *shot*!")
	params.SetTo("whatsapp:+14155552345")

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
    "whatsapp:+14155552345", // To
    [
        "from" => "whatsapp:+15005550006",
        "messagingServiceSid" => "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "body" => "🎶I am _not_ ~pushing~ throwing away my *shot*!",
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
            from: 'whatsapp:+15005550006',
            messaging_service_sid: 'MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            body: '🎶I am _not_ ~pushing~ throwing away my *shot*!',
            to: 'whatsapp:+14155552345'
          )

puts message.body
```

```bash
EXCLAMATION_MARK='!'
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:create \
   --from whatsapp:+15005550006 \
   --messaging-service-sid MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --body "🎶I am _not_ ~pushing~ throwing away my *shot*$EXCLAMATION_MARK" \
   --to whatsapp:+14155552345
```

```bash
EXCLAMATION_MARK='!'
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json" \
--data-urlencode "From=whatsapp:+15005550006" \
--data-urlencode "MessagingServiceSid=MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
--data-urlencode "Body=🎶I am _not_ ~pushing~ throwing away my *shot*$EXCLAMATION_MARK" \
--data-urlencode "To=whatsapp:+14155552345" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "api_version": "2010-04-01",
  "body": "🎶I am _not_ ~pushing~ throwing away my *shot*!",
  "date_created": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_sent": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_updated": "Thu, 24 Aug 2023 05:01:45 +0000",
  "direction": "outbound-api",
  "error_code": null,
  "error_message": null,
  "from": "whatsapp:+15005550006",
  "num_media": "0",
  "num_segments": "1",
  "price": null,
  "price_unit": null,
  "messaging_service_sid": "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "queued",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media.json"
  },
  "to": "whatsapp:+14155552345",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

![WhatsApp message with music note emoji, text 'I am not pushing throwing away my shot!' showing italics, strikethrough, and bold.](https://docs-resources.prod.twilio.com/a41e3fcfad1b954f49bf44c313f9a9cdaa3e01182cd77d23f29701fcbe0ab392.jpg)

## Location Messages with WhatsApp

The Twilio API for WhatsApp supports sending and receiving GPS location data in messages to and from WhatsApp users.

> \[!WARNING]
>
> Facebook does not support location messaging in [WhatsApp message
> templates](/docs/whatsapp/key-concepts#message-templates)
> at this time. Twilio Conversations also does not support location messaging
> functionality at this time. To send and receive location messages with
> WhatsApp, you'll need to use session messages leveraging the API or Twilio's
> SDKs.

### Send outbound location messages

Sending outbound location messages over WhatsApp is similar to sending a text-based message, with the addition of the `PersistentAction` parameter in your Twilio API requests. Outbound location messages must include the following information:

* `Body={name}`
* `PersistentAction=geo:{latitude},{longitude}` OR
* `PersistentAction=geo:{latitude},{longitude}|{label}`

| Name      | Type   | Required                    | Description                                                                                                                       |
| --------- | ------ | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| name      | String | Yes (for outbound messages) | The name of the location being sent.(Location must exist in Google maps for the hyperlink to work on Mac/Windows WhatsApp client) |
| latitude  | Number | Yes                         | Latitude of the location being sent                                                                                               |
| longitude | Number | Yes                         | Longitude of the location being sent                                                                                              |
| label     | String | No                          | Optional free-form text to display under the location `name`                                                                      |

Send a WhatsApp message with location information

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
    body: "This is one of the Twilio office locations",
    messagingServiceSid: "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    persistentAction: ["geo:37.787890,-122.391664|375 Beale St"],
    to: "whatsapp:+15005550006",
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
    to="whatsapp:+15005550006",
    messaging_service_sid="MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    body="This is one of the Twilio office locations",
    persistent_action=["geo:37.787890,-122.391664|375 Beale St"],
)

print(message.body)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using System.Threading.Tasks;
using System.Collections.Generic;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var message = await MessageResource.CreateAsync(
            to: new Twilio.Types.PhoneNumber("whatsapp:+15005550006"),
            messagingServiceSid: "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            body: "This is one of the Twilio office locations",
            persistentAction: new List<string> { "geo:37.787890,-122.391664|375 Beale St" });

        Console.WriteLine(message.Body);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.type.PhoneNumber;
import java.util.Arrays;
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
                              .creator(new com.twilio.type.PhoneNumber("whatsapp:+15005550006"),
                                  "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                                  "This is one of the Twilio office locations")
                              .setPersistentAction(Arrays.asList("geo:37.787890,-122.391664|375 Beale St"))
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
	params.SetTo("whatsapp:+15005550006")
	params.SetMessagingServiceSid("MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
	params.SetBody("This is one of the Twilio office locations")
	params.SetPersistentAction([]string{
		"geo:37.787890,-122.391664|375 Beale St",
	})

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
    "whatsapp:+15005550006", // To
    [
        "messagingServiceSid" => "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "body" => "This is one of the Twilio office locations",
        "persistentAction" => ["geo:37.787890,-122.391664|375 Beale St"],
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
            to: 'whatsapp:+15005550006',
            messaging_service_sid: 'MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            body: 'This is one of the Twilio office locations',
            persistent_action: [
              'geo:37.787890,-122.391664|375 Beale St'
            ]
          )

puts message.body
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:create \
   --to whatsapp:+15005550006 \
   --messaging-service-sid MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --body "This is one of the Twilio office locations" \
   --persistent-action "geo:37.787890,-122.391664|375 Beale St"
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json" \
--data-urlencode "To=whatsapp:+15005550006" \
--data-urlencode "MessagingServiceSid=MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
--data-urlencode "Body=This is one of the Twilio office locations" \
--data-urlencode "PersistentAction=geo:37.787890,-122.391664|375 Beale St" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "api_version": "2010-04-01",
  "body": "This is one of the Twilio office locations",
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
  "messaging_service_sid": "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "queued",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media.json"
  },
  "to": "whatsapp:+15005550006",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

Your user should receive a message that looks like this:

![WhatsApp message showing Twilio API link preview with logo and description.](https://docs-resources.prod.twilio.com/5c511cb07a9daf7e05522cea3a89a949abf573f2c17a9637afab7b3139a789d8.jpg)

### Receive inbound location messages

You can also receive inbound location messages with the Twilio API for WhatsApp.

Locations do not appear in [the Twilio Console](https://www.twilio.com/console) at this time. However, your web application will receive the location data in the `POST` request that Twilio sends. This data will be included in the HTTP `POST` request for the incoming message that we send to your webhook.

You will be able to access the following parameters in the `POST` request values Twilio sends to your application when you receive a WhatsApp location message:

* `Latitude`
* `Longitude`
* `Address`
* `Label`

#### Location Message Types

There are two types of location that users can send with WhatsApp: **Current Location** and Live Location. *Live Location is not currently supported by the WhatsApp Business API.*

*Current Location* is a static type of content, similar to a timestamp. This means the location information you receive from a user indicates where the user was in that particular moment in time when they triggered the "send location" action.

Below is a sample payload containing location information. The `Body={name}` parameter is not required for inbound messages.

```bash
Latitude=37.7879277&Longitude=-122.3937508&Address=375+Beale+St%2C+San+Francisco%2C+CA+94105&SmsMessageSid=SMxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx&NumMedia=0&SmsSid=SMxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx&Label=Twilio+Inc&Body=&To=whatsapp%3A%2B14155238886&NumSegments=1&MessageSid=SMxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx&AccountSid=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx&From=whatsapp%3A%2B12345678900&ApiVersion=2010-04-01
```

## Preview weblinks in freeform WhatsApp messages

When you are within the [24-hour session](/docs/whatsapp/api#conversational-messaging-on-whatsapp) (initiated by a customer sending your business a message), you can send freeform, non-templated messages with a customer. During this 24-hour window, WhatsApp messages that contain web links display a web page snippet preview on the WhatsApp client. WhatsApp does not currently support URL previews in templated messages.

![WhatsApp message with link that also displays a preview of the link.](https://docs-resources.prod.twilio.com/f21fa04e389d17d098b0582a3e6a71ffb03df0c6da7444090e8103310c86385d.jpg)

## Start conversations with deep links

Customers can initiate a conversation with you on WhatsApp through URL deep links, such as on your website. If end users have WhatsApp installed on their devices, clicking the deep link opens a conversation with your business inside of WhatsApp.

**Deep link format** : `https://wa.me/<e164 number>&text=Hello!`

Deep links can be embedded in web or mobile apps, advertised on the web, or placed in other visible locations. They are an effective way to start conversations without using [WhatsApp message templates](/docs/whatsapp/key-concepts#message-templates).

Send a message containing a link

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
    body: "Let's build something amazing with WhatsApp: https://www.twilio.com/docs/whatsapp",
    messagingServiceSid: "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    to: "whatsapp:+15005550006",
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
    to="whatsapp:+15005550006",
    messaging_service_sid="MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    body="Let's build something amazing with WhatsApp: https://www.twilio.com/docs/whatsapp",
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
            to: new Twilio.Types.PhoneNumber("whatsapp:+15005550006"),
            messagingServiceSid: "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            body: "Let's build something amazing with WhatsApp: https://www.twilio.com/docs/whatsapp");

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
                              .creator(new com.twilio.type.PhoneNumber("whatsapp:+15005550006"),
                                  "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                                  "Let's build something amazing with WhatsApp: https://www.twilio.com/docs/whatsapp")
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
	params.SetTo("whatsapp:+15005550006")
	params.SetMessagingServiceSid("MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
	params.SetBody("Let's build something amazing with WhatsApp: https://www.twilio.com/docs/whatsapp")

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
    "whatsapp:+15005550006", // To
    [
        "messagingServiceSid" => "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "body" =>
            "Let's build something amazing with WhatsApp: https://www.twilio.com/docs/whatsapp",
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
            to: 'whatsapp:+15005550006',
            messaging_service_sid: 'MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            body: 'Let\'s build something amazing with WhatsApp: https://www.twilio.com/docs/whatsapp'
          )

puts message.body
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:create \
   --to whatsapp:+15005550006 \
   --messaging-service-sid MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --body "Let's build something amazing with WhatsApp: https://www.twilio.com/docs/whatsapp"
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json" \
--data-urlencode "To=whatsapp:+15005550006" \
--data-urlencode "MessagingServiceSid=MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
--data-urlencode "Body=Let's build something amazing with WhatsApp: https://www.twilio.com/docs/whatsapp" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "api_version": "2010-04-01",
  "body": "Let's build something amazing with WhatsApp: https://www.twilio.com/docs/whatsapp",
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
  "messaging_service_sid": "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "queued",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media.json"
  },
  "to": "whatsapp:+15005550006",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

## QR Codes and Short Links

QR codes and short links enable consumers to initiate a conversation with a business without adding a new contact in their phone!

### What are QR codes?

A QR ("Quick Response") code is a type of barcode that you can use to open up a new WhatsApp conversation. Your end uses can scan your business' [QR code](https://developers.facebook.com/docs/whatsapp/business-management-api/qr-codes), and the WhatsApp business profile will automatically load, with a pre-filled message that your business can define.

Here's an example of a QR Code:

![QR code with WhatsApp logo for scanning.](https://docs-resources.prod.twilio.com/7b2254b05dce2de30691fab3eea5e8f3a9ab05f422657d6c07ae810ca2b36300.png)

### What are Short links?

Businesses can generate short links that, when clicked, load pre-filled messages. You can edit or delete these links at any time. Short links mask phone numbers so that only a random code appears in the URL.

### How can businesses use QR codes and short links?

* **Get in touch with more users.** Businesses can place QR codes on product packaging, receipts/invoices, at your storefront and other physical or digital surfaces. These can be used to respond to customer-initiated questions, such as pre-sales inquiries or post-purchase support.
* **Collect opt-in**. Businesses can collect opt-in for notifications via QR codes and/or short links.

### How can I get a QR code or short link?

To get a WhatsApp QR code or short link, open a support ticket and provide the WhatsApp Sender (Phone Number) and the message you would like to have embedded in the QR code or short link.

## What's Next?

Ready to send feature-rich messages to your end users over WhatsApp? Check out some of these resources to get started (or keep) building:

* [The WhatsApp API Overview](/docs/whatsapp/api)
* [Learn key concepts and terms for building with WhatsApp and Twilio](/docs/whatsapp/key-concepts)
* [Register a WhatsApp sender](/docs/whatsapp#whatsapp-sender-registration)
