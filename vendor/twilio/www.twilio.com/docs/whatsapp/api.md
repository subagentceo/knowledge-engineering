# Overview of the WhatsApp Business Platform with Twilio

> \[!WARNING]
>
> Twilio is launching a new Console. Some screenshots on this page may show the Legacy Console and therefore may no longer be accurate. We are working to update all screenshots to reflect the new Console experience. [Learn more about the new Console](https://www.twilio.com/blog/new-and-improved-console-now-in-general-availability).

WhatsApp is the most popular messaging app in many parts of the world. With the [WhatsApp Business Platform with Twilio](https://www.twilio.com/en-us/messaging/channels/whatsapp), you can [send notifications](/docs/whatsapp/api#sending-notifications-with-whatsapp), have [two-way conversations](/docs/whatsapp/api#conversational-messaging-on-whatsapp), and build chatbots. If you're trying to reach and better converse with users in LATAM, EMEA, and APAC, then you need to consider using WhatsApp.

## What is the WhatsApp Business Platform?

WhatsApp has three messaging products:

* WhatsApp Consumer app, with users around the globe
* WhatsApp Business app, generally used by small businesses and micro businesses
* WhatsApp Business Platform, previously known as the WhatsApp Business API

Twilio offers access to the WhatsApp Business Platform. Developers can use WhatsApp with all of Twilio's products, including the Programmable Messaging API, Conversations API, Twilio Flex and Studio. For more information, see [WhatsApp Business Accounts with Twilio](/docs/whatsapp/tutorial/whatsapp-business-account).

## WhatsApp opt-in requirements

WhatsApp requires that your application implement [explicit user opt-ins](https://developers.facebook.com/docs/whatsapp/guides/opt-in/) to deliver messages over WhatsApp. You may gather this opt-in information either via a web page or a mobile app, such as during your application's sign-up flow, in your application's account settings, via SMS, etc. WhatsApp also requires businesses to respect opt-out requests from end users to maintain high number quality.

> \[!WARNING]
>
> Sending messages to end users without an opt-in may result in users blocking your business and may ultimately lead to the suspension of your WhatsApp Business account.

## Using Twilio Phone Numbers with WhatsApp

On WhatsApp, users message each other using their phone numbers as identifiers. To send and receive WhatsApp messages using the Twilio Programmable Messaging API, you'll need a phone number as well. The Twilio API addresses WhatsApp users and your numbers, using the following prefixed address format:

`whatsapp:<E.164 formatted phone number>`

([E.164 is an international telephone number format](/docs/glossary/what-e164); you will see it often in the strings that represent Twilio phone numbers.)

### Enabling WhatsApp with a Twilio Number

To use WhatsApp messaging in production apps, you must enable WhatsApp on your Twilio number. For a step-by-step walkthrough of the process, visit our [Self-Signup Guide for WhatsApp](/docs/whatsapp/self-sign-up). If you're registering for WhatsApp on behalf of a third party, such as one of your clients, then you may be an Independent Software Vendor (ISV) and should follow the [WhatsApp Tech Provider Program guide](/docs/whatsapp/isv/tech-provider-program).

For information about using a non-Twilio number with WhatsApp, check out our Support guide *[Can I activate my own phone number for WhatsApp on Twilio?](https://help.twilio.com/hc/en-us/articles/360052171393-Can-I-activate-my-own-phone-number-for-WhatsApp-on-Twilio-)*

### Connect your Meta Business Manager Account

WhatsApp uses your Meta Business Manager account to identify your business and associate your WhatsApp Business Account (WABA) with it. To scale with WhatsApp, you will also need to verify your Meta Business Manager account. You can create or connect your Meta Business Manager account through Twilio's Self-Signup process in the Console.

If you are an ISV, you will need to provide Twilio with your Meta Business Manager ID before you or your end clients begin onboarding. If you do not already have a Meta Business Manager account, [follow Facebook's instructions to create one](https://www.facebook.com/business/help/1710077379203657). Your Meta Business Manager ID can be found in the ["Business Info" section](https://business.facebook.com/settings/info) under *Business Settings*.

![Twilio business manager info with verification status and contact details.](https://docs-resources.prod.twilio.com/23b6e0d70824fa66d0fb92d94398e1d7e35cadb7b23929773c4d1e44c8322103.png)

### Manage and configure your WhatsApp-enabled Twilio numbers

You can register new numbers for WhatsApp directly in the Twilio Console by following our [Self-Signup Guide for WhatsApp](/docs/whatsapp/self-sign-up). If you are an ISV following the [WhatsApp Tech Provider Program](/docs/whatsapp/isv/tech-provider-program), you'll need to request to have WhatsApp numbers registered by Twilio's Operations team. As part of the onboarding process, either you or Twilio's Operations team will create a WhatsApp Business Account (WABA) and associate it with your Twilio Account SID. Only one WABA is allowed per Twilio Account at this time.

As of January 2023, WhatsApp has imposed new limitations on phone numbers and WABAs:

* Phone Number limits applied across all WABAs per single Meta Business Manager
  * Businesses that don't have a verified Meta Business Manager are allowed a max of 2 phone numbers per Meta Business Manager across all WABAs.
  * Businesses with a verified Meta Business Manager account can have up to 20 phone numbers. An exception for up to 50 phone numbers can be requested by opening a support ticket. Higher limits may be made available with a second appeal and a valid use case justification, at WhatsApp's discretion.
* WABA limits:

  * Businesses with a verified Meta Business Manager can have a max of 20 WABAs across their Meta Business Manager.
  * Businesses that have an Official Business Account (OBA) are allowed up to 1000 WABAs.

Most businesses that onboarded prior to January 2023, and those with higher limits previously, are exempt from these limitations. WhatsApp reserves the right to restrict the numbers and WABAs for any reasons and if they see any evidence of scams or severe spam on an account, at their discretion.

![WhatsApp enabled senders list with status approved by WhatsApp.](https://docs-resources.prod.twilio.com/8b7e31bd016651a43e3f3842c375e649d0a118f3f0d4be537e79ec449b982238.png)

Once your number has been enabled for WhatsApp, it can be used as a WhatsApp Sender. Clicking on a specific Sender takes you to its specific Configuration page. This includes the *Endpoint configuration* section, where you can specify what action Twilio should take when it receives a WhatsApp message at this number. You can configure this sender as part of a [Messaging Service](/docs/messaging/services) or with an individual [webhook](/docs/glossary/what-is-a-webhook) URL.

You can also update all your profile details here.

![WhatsApp sender configuration with webhook URLs and HTTP Post methods.](https://docs-resources.prod.twilio.com/9b2972faac3abb51f737bcc4df2657d061558c6e27d47ffe4f639cd157e2ee53.png)

## Sending notifications with WhatsApp

WhatsApp requires that business-initiated notifications sent by your application be templated and pre-registered, with the exception of messages sent as a reply to a user-initiated message. (See [Conversational Messaging on WhatsApp](#conversational-messaging-on-whatsapp) for more details).

To manage your own WhatsApp profile, go to [Messaging > Senders > WhatsApp Senders in the Console](/console/sms/whatsapp/senders). There, you can see the list of your WhatsApp-enabled Twilio phone numbers (senders).

To see and manage [templates](/docs/whatsapp/tutorial/send-whatsapp-notification-messages-templates) and their approvals, go to [Messaging > Content Template Builder](console/sms/content-template-builder).

To learn more, consult our [Guide to Sending WhatsApp Notifications Using Message Templates](/docs/whatsapp/tutorial/send-whatsapp-notification-messages-templates).

## Conversational Messaging on WhatsApp

To have 2-way conversations with end users, you need to be able to receive messages from them. Users can send your business messages either directly or in response to a templated notification.

### How to initiate a customer service window

A customer service window begins when a user sends a message to your app. Customer service windows are valid for 24 hours after the most recently received message, during which you can communicate with customers using free-form messages. To send a message outside the customer service window, you must use a pre-approved message template. (See our [Guide to WhatsApp Message Templates](/docs/whatsapp/tutorial/send-whatsapp-notification-messages-templates)).

### Configuring inbound message webhooks

When customers send you a WhatsApp message, Twilio sends a [webhook](/docs/glossary/what-is-a-webhook) (a request to a URL that you specify) to your application. You can configure the URL to which Twilio sends a webhook when it receives inbound messages in the Twilio Console:

* on [the Sandbox page](/console/messaging/whatsapp/sandbox)
* on the page for [WhatsApp-enabled numbers](/console/messaging/whatsapp/numbers)
* under the "**Integration**" section of your settings for a specific Messaging Service (Under the [Messaging Services section of the Console](/console/sms/services/))

### Configuring Fallback URLs for your WhatsApp-enabled Senders

Optionally, you can configure a Fallback URL in the same place that you set your default webhook URL. If a fatal error occurs while making a request to your primary webhook URL, Twilio "falls back" to this secondary *fallback* URL.

When making the request to your fallback URL, Twilio also submits the `ErrorCode` and `ErrorUrl` parameters, indicating the error code of the failure and the URL for which the failure occurred.

| ![WhatsApp sandbox setup with number, phrase, and callback URL fields.](https://docs-resources.prod.twilio.com/76f97e8017941fd6b591d1e4642574e7a09a2985a2cd71a70251f6dc7d3dfcb5.png) | ![Configure WhatsApp Sender.](https://docs-resources.prod.twilio.com/b9c03bdfe6c307fc59d233dbeeb02ff55ed32894a95f39c454a85930871d48b4.png) |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Configuring Inbound Message Webhooks for Twilio Sandbox for WhatsApp                                                                                                                 | Configuring Inbound Message webhooks for your WhatsApp enabled Twilio number                                                               |

For details on the data provided in the request that Twilio makes to your application (via the webhook URL), read more about [Twilio's requests to your application](/docs/messaging/twiml#twilios-request-to-your-application).

### Receiving a WhatsApp message

The webhook for inbound messages uses the same format as [incoming SMS and MMS messages](/docs/messaging/tutorials/how-to-receive-and-reply), with the exception that `To` and `From` addresses will be set to WhatsApp addresses (`whatsapp:<your E.164 number>` and `whatsapp:<User's E.164 phone number>`), respectively.

Incoming messages may include text or media. The `Body` field contains the message text, and the `MediaUrl0` field contains a link to the media file. You can learn how to download incoming media included in a message in the [Receive and Download Images on Incoming MMS Messages tutorial](/docs/messaging/tutorials/how-to-receive-and-download-images-incoming-mms). Supported media include images (JPG, JPEG, PNG), audio files, and PDF files, with a size limit of 16MB per message.

### Responding to Incoming Messages with TwiML

WhatsApp incoming messages are fully supported by TwiML, allowing you to seamlessly use your existing SMS app with WhatsApp. For more information, check out [Documentation on How to Use TwiML](/docs/messaging/twiml).

### Sending a freeform WhatsApp message using the API

Within a WhatsApp session, you can send freeform messages using the Programmable Messaging API. Freeform messages may include text, media and certain rich messages created with [Content Templates](/docs/content).

### Web links in freeform WhatsApp messages

Freeform WhatsApp messages that include web links will display a web page snippet preview when received on the WhatsApp client.

Send an outbound freeform WhatsApp Message

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
    body: "Hello, there!",
    from: "whatsapp:+14155238886",
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
    from_="whatsapp:+14155238886",
    body="Hello, there!",
    to="whatsapp:+15005550006",
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
            from: new Twilio.Types.PhoneNumber("whatsapp:+14155238886"),
            body: "Hello, there!",
            to: new Twilio.Types.PhoneNumber("whatsapp:+15005550006"));

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
                                  new com.twilio.type.PhoneNumber("whatsapp:+14155238886"),
                                  "Hello, there!")
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
	params.SetFrom("whatsapp:+14155238886")
	params.SetBody("Hello, there!")
	params.SetTo("whatsapp:+15005550006")

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
        "from" => "whatsapp:+14155238886",
        "body" => "Hello, there!",
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
            from: 'whatsapp:+14155238886',
            body: 'Hello, there!',
            to: 'whatsapp:+15005550006'
          )

puts message.body
```

```bash
EXCLAMATION_MARK='!'
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:create \
   --from whatsapp:+14155238886 \
   --body "Hello, there$EXCLAMATION_MARK" \
   --to whatsapp:+15005550006
```

```bash
EXCLAMATION_MARK='!'
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json" \
--data-urlencode "From=whatsapp:+14155238886" \
--data-urlencode "Body=Hello, there$EXCLAMATION_MARK" \
--data-urlencode "To=whatsapp:+15005550006" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "api_version": "2010-04-01",
  "body": "Hello, there!",
  "date_created": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_sent": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_updated": "Thu, 24 Aug 2023 05:01:45 +0000",
  "direction": "outbound-api",
  "error_code": null,
  "error_message": null,
  "from": "whatsapp:+14155238886",
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
  "to": "whatsapp:+15005550006",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

Send a  freeform WhatsApp message with media

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
    body: "Here's that picture of an owl you requested.",
    from: "whatsapp:+14155238886",
    mediaUrl: ["https://demo.twilio.com/owl.png"],
    to: "whatsapp:+15017122661",
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
    body="Here's that picture of an owl you requested.",
    media_url=["https://demo.twilio.com/owl.png"],
    to="whatsapp:+15017122661",
    from_="whatsapp:+14155238886",
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
            body: "Here's that picture of an owl you requested.",
            mediaUrl: new List<Uri> { new Uri("https://demo.twilio.com/owl.png") },
            to: new Twilio.Types.PhoneNumber("whatsapp:+15017122661"),
            from: new Twilio.Types.PhoneNumber("whatsapp:+14155238886"));

        Console.WriteLine(message.Body);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.net.URI;
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
                              .creator(new com.twilio.type.PhoneNumber("whatsapp:+15017122661"),
                                  new com.twilio.type.PhoneNumber("whatsapp:+14155238886"),
                                  "Here's that picture of an owl you requested.")
                              .setMediaUrl(Arrays.asList(URI.create("https://demo.twilio.com/owl.png")))
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
	params.SetBody("Here's that picture of an owl you requested.")
	params.SetMediaUrl([]string{
		"https://demo.twilio.com/owl.png",
	})
	params.SetTo("whatsapp:+15017122661")
	params.SetFrom("whatsapp:+14155238886")

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
    "whatsapp:+15017122661", // To
    [
        "body" => "Here's that picture of an owl you requested.",
        "mediaUrl" => ["https://demo.twilio.com/owl.png"],
        "from" => "whatsapp:+14155238886",
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
            body: 'Here\'s that picture of an owl you requested.',
            media_url: [
              'https://demo.twilio.com/owl.png'
            ],
            to: 'whatsapp:+15017122661',
            from: 'whatsapp:+14155238886'
          )

puts message.body
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:create \
   --body "Here's that picture of an owl you requested." \
   --media-url https://demo.twilio.com/owl.png \
   --to whatsapp:+15017122661 \
   --from whatsapp:+14155238886
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json" \
--data-urlencode "Body=Here's that picture of an owl you requested." \
--data-urlencode "MediaUrl=https://demo.twilio.com/owl.png" \
--data-urlencode "To=whatsapp:+15017122661" \
--data-urlencode "From=whatsapp:+14155238886" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "api_version": "2010-04-01",
  "body": "Here's that picture of an owl you requested.",
  "date_created": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_sent": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_updated": "Thu, 24 Aug 2023 05:01:45 +0000",
  "direction": "outbound-api",
  "error_code": null,
  "error_message": null,
  "from": "whatsapp:+14155238886",
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
  "to": "whatsapp:+15017122661",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

## Monitor the status of your WhatsApp outbound message

To receive real-time status updates for outbound messages, you can choose to **set a Status Callback URL**. Twilio sends a request to this URL each time your message status changes to one of the transition values in the [Message Status Callback Event Flow diagram](/docs/messaging/guides/outbound-message-status-in-status-callbacks#message-status-changes-triggering-status-callback-requests).

You can set the Status Callback URL in the Console, or when you send an individual outbound message, by including the StatusCallback parameter. You can set the status callback URL in different parts of the Twilio Console depending on your messaging setup:

* For the [WhatsApp Sandbox](https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn?frameUrl=%2Fconsole%2Fsms%2Fwhatsapp%2Flearn%3Fx-target-region%3Dus1) or an [individual WhatsApp Sender](https://www.twilio.com/console/sms/whatsapp/senders) -read [WhatsApp and other messaging channels](/docs/messaging/guides/track-outbound-message-status#whatsapp-and-other-messaging-channels) for additional properties that Twilio sends to your callback URL
* For a [Messaging Service](https://www.twilio.com/console/sms/services) (under the **Integration** settings for a specific Messaging Service) - read the [status callback with a Messaging service guide](/docs/messaging/guides/track-outbound-message-status#scenario-2-messaging-service-used) for configuration options

When you set the Status Callback URL, Twilio sends a `POST` request to that URL, including the message `sid` (the Message's Unique identifier) and other standard request parameters as well as a `status` and an associated `error_code` if any. Refer to the [API Reference for the Message Resource](/docs/messaging/api/message-resource) for a list of parameters that Twilio sends to your callback URL.

Send a WhatsApp Message and specify a StatusCallback URL

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
    body: "Hey, I just met you, and this is crazy...",
    from: "whatsapp:+14155238886",
    statusCallback: "http://postb.in/1234abcd",
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
    from_="whatsapp:+14155238886",
    body="Hey, I just met you, and this is crazy...",
    status_callback="http://postb.in/1234abcd",
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
            from: new Twilio.Types.PhoneNumber("whatsapp:+14155238886"),
            body: "Hey, I just met you, and this is crazy...",
            statusCallback: new Uri("http://postb.in/1234abcd"));

        Console.WriteLine(message.Body);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.type.PhoneNumber;
import java.net.URI;
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
                                  new com.twilio.type.PhoneNumber("whatsapp:+14155238886"),
                                  "Hey, I just met you, and this is crazy...")
                              .setStatusCallback(URI.create("http://postb.in/1234abcd"))
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
	params.SetFrom("whatsapp:+14155238886")
	params.SetBody("Hey, I just met you, and this is crazy...")
	params.SetStatusCallback("http://postb.in/1234abcd")

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
        "from" => "whatsapp:+14155238886",
        "body" => "Hey, I just met you, and this is crazy...",
        "statusCallback" => "http://postb.in/1234abcd",
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
            from: 'whatsapp:+14155238886',
            body: 'Hey, I just met you, and this is crazy...',
            status_callback: 'http://postb.in/1234abcd'
          )

puts message.body
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:create \
   --to whatsapp:+15005550006 \
   --from whatsapp:+14155238886 \
   --body "Hey, I just met you, and this is crazy..." \
   --status-callback http://postb.in/1234abcd
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json" \
--data-urlencode "To=whatsapp:+15005550006" \
--data-urlencode "From=whatsapp:+14155238886" \
--data-urlencode "Body=Hey, I just met you, and this is crazy..." \
--data-urlencode "StatusCallback=http://postb.in/1234abcd" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "api_version": "2010-04-01",
  "body": "Hey, I just met you, and this is crazy...",
  "date_created": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_sent": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_updated": "Thu, 24 Aug 2023 05:01:45 +0000",
  "direction": "outbound-api",
  "error_code": null,
  "error_message": null,
  "from": "whatsapp:+14155238886",
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
  "to": "whatsapp:+15005550006",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```
