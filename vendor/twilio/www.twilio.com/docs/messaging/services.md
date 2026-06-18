# Messaging Services

Sending messages at scale quickly becomes complex. As the complexity of your messaging application grows, it's helpful to organize your account and message logs into separate Messaging Services using Twilio Programmable Messaging. Messaging Services are designed to help you scale your application's messaging from your first message to millions of messages sent globally, in multiple languages, across multiple messaging channels.

Think of a Messaging Service as a higher-level bundling of messaging functionality around a common set of senders, features, and configuration. The same settings and feature configuration apply to all of the senders — [Alphanumeric Sender IDs](/docs/glossary/what-alphanumeric-sender-id), [short codes](/docs/glossary/what-is-a-short-code), [long code](/docs/glossary/what-long-code-phone-number) phone numbers, toll-free phone numbers, [RCS senders](/docs/rcs), and [WhatsApp senders](/docs/whatsapp) — in the Messaging Service's sender pool.

You can manage and configure a Messaging Service's features through the [Console](https://console.twilio.com/us1/develop/sms/services) or the [REST API](/docs/messaging/api/service-resource).

## Create and configure a Messaging Service

To create a Messaging Service, go to **Messaging > Services** in the [Twilio Console](https://console.twilio.com) and then **Create Messaging Service**. You will then:

1. Name the Messaging Service and select a use case
2. Add senders to the Messaging Service's sender pool
3. Set up the integration with your system
4. Add compliance info

To add senders to a Messaging Service that already exists, go to **Messaging > Services** in the [Twilio Console](https://console.twilio.com/us1/develop/sms/services), select a Messaging Service, and use **Add Senders** in the **Sender Pool** section.

In the **Integration** section of your Messaging Service, you can update how your Messaging Service handles incoming messages, set a status callback URL, or set a custom validity period.

### Incoming message handling

By default, Twilio sets your Messaging Service to "Defer to sender's webhook," meaning inbound messages to any sender within the Messaging Service's sender pool will hit the webhook configured on each sender. However, you can instead configure the Messaging Service to use a common webhook set on the Messaging Service or have Twilio automatically create a new [Conversation](/docs/conversations-classic). Using the **Autocreate a Conversation** option requires additional configuration changes in the **Conversations** section of the Twilio Console.

### Status callback URL

The delivery status of your message, including any delivery errors, is sent asynchronously to your status callback URL. This URL can be specified in your Twilio Console for your Messaging Service in the **Integration > Delivery Status Callback** section. Alternatively, you can specify your status callback URL [using the API](/docs/messaging/api/service-resource).

### Validity period

You can customize the validity period for outbound messages — the number of seconds they remain in Twilio's platform before failing — between 1 and 36,000 seconds (default: 36,000).

> \[!NOTE]
>
> The validity period applies *only* while messages travel through the Twilio platform. After Twilio sends messages to the carrier network, carriers may still queue them, resulting in delivery times that exceed the validity period.

## Send a message with a Messaging Service

If you use a Messaging Service to send a message, your request to Twilio is similar to [sending an SMS with the REST API](/docs/messaging/api/message-resource#send-an-sms-message). However, instead of including a `From` phone number, include a `MessagingServiceSid`. When you send a message with a Messaging Service, Twilio immediately sets the message's status to `accepted`. The Messaging Service then automatically selects a `From` sender — see [Sender selection](#sender-selection) for details.

The following example shows how to send a message with a Messaging Service:

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
    body: "Revenge of the Sith was the best of the prequel trilogy.",
    messagingServiceSid: "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    to: "+18005550100",
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
    body="Revenge of the Sith was the best of the prequel trilogy.",
    messaging_service_sid="MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    to="+18005550100",
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
            body: "Revenge of the Sith was the best of the prequel trilogy.",
            messagingServiceSid: "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            to: new Twilio.Types.PhoneNumber("+18005550100"));

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
                              .creator(new com.twilio.type.PhoneNumber("+18005550100"),
                                  "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                                  "Revenge of the Sith was the best of the prequel trilogy.")
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
	params.SetBody("Revenge of the Sith was the best of the prequel trilogy.")
	params.SetMessagingServiceSid("MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
	params.SetTo("+18005550100")

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
    "+18005550100", // To
    [
        "body" => "Revenge of the Sith was the best of the prequel trilogy.",
        "messagingServiceSid" => "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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
            body: 'Revenge of the Sith was the best of the prequel trilogy.',
            messaging_service_sid: 'MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            to: '+18005550100'
          )

puts message.body
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:create \
   --body "Revenge of the Sith was the best of the prequel trilogy." \
   --messaging-service-sid MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --to +18005550100
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json" \
--data-urlencode "Body=Revenge of the Sith was the best of the prequel trilogy." \
--data-urlencode "MessagingServiceSid=MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
--data-urlencode "To=+18005550100" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "body": "Revenge of the Sith was the best of the prequel trilogy.",
  "date_created": "Thu, 30 Jul 2015 20:12:31 +0000",
  "date_sent": "Thu, 30 Jul 2015 20:12:33 +0000",
  "date_updated": "Thu, 30 Jul 2015 20:12:33 +0000",
  "direction": "outbound-api",
  "error_code": null,
  "error_message": null,
  "from": null,
  "messaging_service_sid": "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "num_media": "0",
  "num_segments": "1",
  "price": null,
  "price_unit": null,
  "sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "queued",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media.json"
  },
  "to": "+18005550100",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

## Sender selection

When sending a message, the Messaging Service selects a `From` sender from the pool by sender type, in this priority order:

1. **RCS sender**: See [RCS Regional Availability](/docs/rcs/regional) to learn where RCS is supported.
2. **Short code**: See [What carriers are supported on Twilio short codes](https://help.twilio.com/hc/en-us/articles/223182088-What-carriers-are-supported-on-Twilio-short-codes-).
3. **Alphanumeric Sender ID**: See [International support for Alphanumeric Sender ID](https://help.twilio.com/hc/en-us/articles/223133767-International-support-for-Alphanumeric-Sender-ID) and [Alphanumeric Sender IDs in Messaging Services](/docs/messaging/services/alphanumeric-sender-ids-in-messaging-services).
4. **Long code and toll-free phone numbers**: In Canada, toll-free numbers are prioritized over long codes.

Within a sender type, the Messaging Service distributes traffic evenly by selecting a sender that isn't in use. [Country Code Geomatch](#country-code-geomatch), [Area Code Geomatch](#area-code-geomatch), and [Sticky Sender](#sticky-sender) can each further influence which specific sender is selected.

> \[!WARNING]
>
> Don't include more than one toll-free number in the same Messaging Service's sender pool. This can result in the toll-free number being blocked.

> \[!NOTE]
>
> WhatsApp senders are selected only when the `To` phone number is prefixed with `whatsapp:`.

If you want to turn off automatic sender selection and still use other Messaging Service features (such as [Advanced Opt-Out](#advanced-opt-out)), specify both a `MessagingServiceSid` and `From` sender.

Send a Message with a Messaging Service (Specifying Sender)

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
    body: "Revenge of the Sith was the best of the prequel trilogy.",
    from: "+18005550199",
    messagingServiceSid: "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    to: "+18005550100",
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
    body="Revenge of the Sith was the best of the prequel trilogy.",
    messaging_service_sid="MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    from_="+18005550199",
    to="+18005550100",
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
            body: "Revenge of the Sith was the best of the prequel trilogy.",
            messagingServiceSid: "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            from: new Twilio.Types.PhoneNumber("+18005550199"),
            to: new Twilio.Types.PhoneNumber("+18005550100"));

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
                              .creator(new com.twilio.type.PhoneNumber("+18005550100"),
                                  new com.twilio.type.PhoneNumber("+18005550199"),
                                  "Revenge of the Sith was the best of the prequel trilogy.")
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
	params.SetBody("Revenge of the Sith was the best of the prequel trilogy.")
	params.SetMessagingServiceSid("MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
	params.SetFrom("+18005550199")
	params.SetTo("+18005550100")

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
    "+18005550100", // To
    [
        "body" => "Revenge of the Sith was the best of the prequel trilogy.",
        "messagingServiceSid" => "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "from" => "+18005550199",
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
            body: 'Revenge of the Sith was the best of the prequel trilogy.',
            messaging_service_sid: 'MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            from: '+18005550199',
            to: '+18005550100'
          )

puts message.body
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:create \
   --body "Revenge of the Sith was the best of the prequel trilogy." \
   --messaging-service-sid MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --from +18005550199 \
   --to +18005550100
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json" \
--data-urlencode "Body=Revenge of the Sith was the best of the prequel trilogy." \
--data-urlencode "MessagingServiceSid=MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
--data-urlencode "From=+18005550199" \
--data-urlencode "To=+18005550100" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "body": "Revenge of the Sith was the best of the prequel trilogy.",
  "date_created": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_sent": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_updated": "Thu, 24 Aug 2023 05:01:45 +0000",
  "direction": "outbound-api",
  "error_code": null,
  "error_message": null,
  "from": "+18005550199",
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
  "to": "+18005550100",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

### Country Code Geomatch

| Supported for SMS? | Supported for RCS? | Supported for WhatsApp? |
| ------------------ | ------------------ | ----------------------- |
| Yes                | Yes (Beta)         | Yes                     |

Country Code Geomatch is always active — it uses the country code of the recipient's phone number to select the best, most relevant sender. The fallback behavior when no matching sender is available differs by channel:

* **SMS:** If no matching number is available, Twilio first attempts to select a US number — since US SMS senders typically have higher international delivery rates — then falls back to any available number in the pool. The message fails if no numbers are available.
* **RCS:** If no matching RCS sender is available, Twilio selects any available RCS sender in the pool regardless of the sender's approved region(s), since RCS messages route over the internet.
* **WhatsApp:** If no matching WhatsApp sender is available, Twilio selects any available WhatsApp sender in the pool regardless of the sender's country, since WhatsApp messages also route over the internet.

You can use Country Code Geomatch by adding senders to your Messaging Service that match the countries of your recipients. For RCS senders, supported countries are determined by where the sender has been approved — you can view a sender's approved regions in **RCS > Senders** in the Twilio Console.

When an SMS- or MMS-capable sender supporting a new country code is added to your Messaging Service, Twilio automatically selects and remaps any existing [Sticky Sender](#sticky-sender) mappings so that the `From` number matches the same country as your recipient's phone number.

> \[!WARNING]
>
> If you add an RCS sender to a Messaging Service sender pool and a carrier later approves it for an additional country, you must remove and re-add the sender to update the country mappings.

### Sticky Sender

| Supported for SMS? | Supported for RCS? | Supported for WhatsApp? |
| ------------------ | ------------------ | ----------------------- |
| Yes                | No                 | Yes                     |

**Sticky Sender** ensures the same `From` phone number is selected every time your application sends a message to a particular end-user. This allows your application to consistently send messages to your user from a single, recognizable phone number.

With Sticky Sender enabled, Twilio maintains a mapping of all `To` and `From` phone numbers that your Messaging Service has used and interacted with. Twilio creates a new mapping after it sends the first message from your Messaging Service to a particular end-user. All subsequent messages sent to that recipient from the Service also use the same `From` number.

Twilio treats SMS phone numbers and WhatsApp senders as separate entities, so Sticky Sender maintains independent mappings for each channel—even when the underlying phone number is the same.

If Sticky Sender is turned off, your Messaging Service ignores all previously established mappings. However, if you re-enable Sticky Sender, your Messaging Service retains and references the previously existing mappings.

> \[!NOTE]
>
> When a Twilio phone number is removed from your Messaging Service, Twilio deletes all Sticky Sender mappings associated with the removed Twilio number.

In some cases, Twilio invalidates an existing mapping and re-runs sender selection. This happens when the stored sender fails routing validation — for example, if a short code or alphanumeric sender is no longer eligible for the recipient's region, or if a long code mapped to a US recipient fails A2P registration checks. When a mapping is invalidated, Twilio removes it and selects a new sender as if no mapping existed.

To turn on or turn off Sticky Sender, go to **Sender Pool > Sender Selection Settings** in your Messaging Service.

When Sticky Sender is enabled, the Messaging Service uses the following logic to determine the `From` number:

![Flowchart for selecting phone numbers in Twilio Messaging Service based on recipient's country and message history.](https://docs-resources.prod.twilio.com/8c3329ef8d49342a7c892397e7401260dcb34f31a51705db442a81b2b22e2918.png)

### Area Code Geomatch (SMS Only) \[#area-code-geomatch]

> \[!NOTE]
>
> This feature is only available in the US and Canada.

**Area Code Geomatch** selects a local phone number with an area code that matches or overlaps your end-user's number.

If no matching or overlay area code is available, the Messaging Service selects another US or Canadian number. Twilio doesn't consider geographic proximity in this case.

To turn on or turn off Area Code Geomatch, go to **Sender Pool > Sender Selection Settings** in your Messaging Service.

### Specify a fallback SMS or MMS sender

When sending RCS messages with native fallback enabled in a Messaging Service, you can specify which SMS or MMS sender to use during fallback in two ways:

1. **Single sender in the pool**: Add exactly one SMS- or MMS-capable sender to your Messaging Service's sender pool. That sender is automatically used for fallback.
2. **`FallbackFrom` parameter**: Specify the fallback sender in the `FallbackFrom` parameter when sending your message. This lets you use any SMS- or MMS-capable number for fallback — even one that isn't in the Messaging Service's sender pool — as long as it belongs to the same Account SID.

> \[!NOTE]
>
> The `FallbackFrom` parameter only works in conjunction with a Messaging Service (`MessagingServiceSid`).

## Content settings

### Smart Encoding (SMS Only) \[#smart-encoding]

**Smart Encoding** detects hidden Unicode characters and replaces them with a similar GSM-encoded character. This helps ensure that your message stays within the GSM-7 160-character-per-segment limit and prevents it from being split into two message segments, which increases your costs.

For example, sometimes a Unicode character such as a smart quote ( 〞), a long dash (—), or a Unicode whitespace accidentally slips into your carefully crafted 125-character message. Your message is segmented and priced at two messages instead of one.

This is because when Unicode characters are used in an SMS message, they must be encoded as [UCS-2](/docs/glossary/what-is-ucs-2-character-encoding). However, UCS-2 characters take 16 bits to encode, so when a message includes a Unicode character, it is split or segmented between the 70th and 71st characters. This means that the character limit for UCS-2-encoded messages is shorter than the 160-character per message segment limit that you get with [GSM-7](/docs/glossary/what-is-gsm-7-character-encoding) character encoding.

> \[!NOTE]
>
> Smart Encoding does *not* transliterate messages that contain emoji (😱) or character-based languages such as Korean hangul (안녕하세요). For the full list of Unicode characters that Smart Encoding replaces, see [Unicode characters replaced by Smart Encoding](/docs/messaging/services/smart-encoding-char-list).

To turn on or turn off Smart Encoding, go to **Content Settings** in your Messaging Service.

### MMS Converter (SMS Only) \[#mms-converter]

**MMS Converter** automatically delivers [MMS](/docs/glossary/what-is-mms) messages as [SMS](/docs/glossary/what-is-an-sms-short-message-service) text messages when [the carrier doesn't support receiving Twilio MMS Messages](https://help.twilio.com/hc/en-us/articles/223133707-Is-MMS-supported-for-all-carriers-in-US-and-Canada-).

The MMS Converter transforms the MMS to an SMS message that contains a shortened URL linking to the media. The MMS Converter appends the shortened URL link (`https://p.twil.io/` followed by seven unique characters) to the end of the message body; this link remains active for 365 days (one year). The Messaging Service selects the most appropriate SMS-capable sender based on the recipient's location to improve message deliverability and compliance with local regulations.

> \[!WARNING]
>
> Twilio bills the converted messages as SMS messages. The appended URL may cause the message body to exceed the character-per-segment limit for the encoding used. For more information, see [GSM-7 character encoding](/docs/glossary/what-is-gsm-7-character-encoding) and [UCS-2 character encoding](/docs/glossary/what-is-ucs-2-character-encoding). In this case, Twilio segments the message and bills accordingly.

> \[!WARNING]
>
> MMS Converter sends links to media files through SMS where the receiving carrier doesn't support MMS. It does *not* allow you to send media if your `From` phone number lacks MMS capabilities.
>
> You can [view the capabilities](https://console.twilio.com/us1/develop/phone-numbers/manage/search) of numbers in the console or query the [Available Phone Numbers](/docs/phone-numbers/api/availablephonenumber-resource) resource to search for Twilio numbers that are MMS enabled.

To turn on or turn off MMS Converter, go to **Content Settings** in your Messaging Service.

## Opt-out management

### Advanced Opt-Out

| Supported for SMS? | Supported for RCS? | Supported for WhatsApp? |
| ------------------ | ------------------ | ----------------------- |
| Yes                | Yes                | Yes                     |

**Advanced Opt-Out** lets you deliver a customized, end-to-end compliance experience for your users. You can set the opt-in, opt-out, and help keywords and confirmation messages globally, as well as add per-language and per-country overrides. For example, you can customize the message that your end-users receive if they reply with "STOP" in English or with "AYUDA" in Spanish.

In addition, Advanced Opt-Out gives you deeper insight into your campaign performance and user engagement with your Messaging Service. When a user triggers one of your opt-in, opt-out, or help keywords, Twilio includes the `OptOutType` in its request to your configured webhook URL so that you can keep track of the status of your campaigns.

#### How to enable Advanced Opt-Out

Advanced Opt-Out is not enabled by default. In the **Opt-Out Management** section of your Messaging Service, you can select **Enable Advanced Opt-Out** as well as customize all of the keyword and confirmation messages for opt-out, opt-in, and help interactions with your end users.

For more information, see [Customize users' opt-in and opt-out experience with Advanced Opt-Out](/docs/messaging/tutorials/advanced-opt-out).

## Deleting a Messaging Service

If you no longer need a Messaging Service, you can delete it through the Twilio Console.

In the Console, go to **Messaging Services**, open the service you want to delete, then click **Delete Messaging Service** and confirm.

> \[!WARNING]
>
> Deleting a Messaging Service cannot be undone. Make sure you no longer need the service before you proceed with deletion.
