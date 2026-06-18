# Message Scheduling

> \[!NOTE]
>
> The Message Scheduling feature comes with the Twilio [Engagement Suite](https://www.twilio.com/en-us/blog/engagement-suite). To learn more about Engagement Suite pricing, see [RCS, SMS, MMS](https://www.twilio.com/en-us/sms/pricing/us), or [WhatsApp](https://www.twilio.com/en-us/whatsapp/pricing) pricing.

The Programmable Messaging API lets you schedule Rich Communication Services (RCS), Short Messaging Services (SMS), Multimedia Messaging Services (MMS), and WhatsApp messages. Scheduled messages can be sent at a fixed time in the future.

The Engagement Suite includes Message Scheduling. Message scheduling comes at no cost and Twilio only charges for messages sent.

#### Prefer to watch a video?

The following video explains how to schedule messages using SMS and WhatsApp.

https://www.youtube.com/watch?v=bcGwZHmjiyU

## Prerequisites

Understand [how to send outgoing, non-scheduled messages with Messaging Services][sms-with-msg-svc].

For WhatsApp messaging, create, configure, and get approved:

* A WhatsApp sender in your Messaging Service's Sender Pool
* A [WhatsApp templates][]

[WhatsApp templates]: /docs/whatsapp/key-concepts#message-templates

[sms-with-msg-svc]: /docs/messaging/tutorials/send-messages-with-messaging-services

## Schedule an outgoing message

Twilio defines a *scheduled message* as a `Message` resource where set `Status` to `scheduled`.

To send a scheduled message using the Programmable Messaging API, [create a Message resource][] with two parameters set: `ScheduleType` and `SendAt`.

[create a Message resource]: /docs/messaging/api/message-resource#create-a-message-resource

### Parameters

A scheduled message requires all of the following parameters.

| Parameter             | Type   | Description                                                                                                                                                                                                         | Accepted value                                                                                                | Example                                        |
| --------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| `ScheduleType`        | String | The indicator that the message scheduled or not.                                                                                                                                                                    | `fixed`                                                                                                       | `fixed`                                        |
| `SendAt`              | String | The date and time when the message gets sent.<br />Messages must be scheduled between **15 minutes** and **35 days** before this value.<br />Twilio must receive the `POST` request for this message in that range. | Timestamp expressed in ISO-8601 format.                                                                       | `2021-11-30T20:36:27Z`                         |
| `MessagingServiceSid` | String | The Messaging Service SID that sends the message.<br />Without this parameter, Twilio treats the message<br />as a non-scheduled and sends it.                                                                      | A 32-hexadecimal-digit ID that starts with `MG`.                                                              | `MGX{32}`                                      |
| `Body`                | String | The content of the scheduled message as text.<br />Use this parameter, `MediaUrl`, or `ContentSid`, *but not all at once*.                                                                                          | The text body of the message up to 1600 characters long.                                                      | `"This is a scheduled message."`               |
| `MediaUrl`            | String | The content of the scheduled message as a URL.<br />Use this parameter, `Body`, or `ContentSid`, *but not all at once*.                                                                                             | A URL referencing the content of the media received in the Message.                                           |                                                |
| `ContentSid`          | String | The content of the scheduled message as an Content SID.<br />Use this parameter, `MediaUrl`, or `Body`, *but not all at once*.<br />Required to send templates created using the Content Template Builder.          | A 32-hexadecimal-digit ID that starts with `HX`<br />String field used to identify the preconfigured content. | `HXX{32}`                                      |
| `To`                  | String | The intended recipient's phone number or channel address.                                                                                                                                                           | Number expressed in the E.164 format.<br />Preface with `whatsapp:` for WhatsApp recipients.                  | `+15558885333` or<br />`whatsapp:+15558675310` |

Create a scheduled message

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
    body: "This is a scheduled message",
    messagingServiceSid: "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    scheduleType: "fixed",
    sendAt: new Date("2021-11-30 20:36:27"),
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
from datetime import datetime

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

message = client.messages.create(
    body="This is a scheduled message",
    messaging_service_sid="MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    to="+15558675310",
    send_at=datetime(2021, 11, 30, 20, 36, 27),
    schedule_type="fixed",
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
            body: "This is a scheduled message",
            messagingServiceSid: "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            to: new Twilio.Types.PhoneNumber("+15558675310"),
            sendAt: new DateTime(2021, 11, 30, 20, 36, 27, DateTimeKind.Utc),
            scheduleType: MessageResource.ScheduleTypeEnum.Fixed);

        Console.WriteLine(message.Body);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.type.PhoneNumber;
import java.time.ZoneId;
import java.time.ZonedDateTime;
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
                                  "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                                  "This is a scheduled message")
                              .setSendAt(ZonedDateTime.of(2021, 11, 30, 20, 36, 27, 0, ZoneId.of("UTC")))
                              .setScheduleType(Message.ScheduleType.FIXED)
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
	"time"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.CreateMessageParams{}
	params.SetBody("This is a scheduled message")
	params.SetMessagingServiceSid("MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
	params.SetTo("+15558675310")
	params.SetSendAt(time.Date(2021, 11, 30, 20, 36, 27, 0, time.UTC))
	params.SetScheduleType("fixed")

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
        "body" => "This is a scheduled message",
        "messagingServiceSid" => "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "sendAt" => new \DateTime("2021-11-30T20:36:27Z"),
        "scheduleType" => "fixed",
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
            body: 'This is a scheduled message',
            messaging_service_sid: 'MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            to: '+15558675310',
            send_at: Time.new(2021, 11, 30, 20, 36, 27),
            schedule_type: 'fixed'
          )

puts message.body
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:create \
   --body "This is a scheduled message" \
   --messaging-service-sid MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --to +15558675310 \
   --send-at 2016-07-31 \
   --schedule-type fixed
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json" \
--data-urlencode "Body=This is a scheduled message" \
--data-urlencode "MessagingServiceSid=MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
--data-urlencode "To=+15558675310" \
--data-urlencode "SendAt=2016-07-31" \
--data-urlencode "ScheduleType=fixed" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "body": "This is a scheduled message",
  "date_created": "Mon, 29 Nov 2021 22:40:10 +0000",
  "date_sent": null,
  "date_updated": "Mon, 29 Nov 2021 22:40:10 +0000",
  "direction": "outbound-api",
  "error_code": null,
  "error_message": null,
  "from": null,
  "messaging_service_sid": "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "num_media": "0",
  "num_segments": "0",
  "price": null,
  "price_unit": null,
  "sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "queued",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media.json"
  },
  "to": "+15558675310",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

### Response

Your `POST` request response indicates whether or not your message scheduled successfully.

* A valid `POST` request returns a `201 (scheduled)` HTTP status code.
* An invalid `POST` request returns a `400` HTTP status code.

A scheduled `Message` resource returns a `"status": "scheduled"`. To check the message status, review the response body of the response from the `POST` request or [fetch the `Message` resource][msg-fetch].

[msg-fetch]: /docs/messaging/api/message-resource#fetch-a-message-resource

Scheduled messages don't return a status callback event.

In case you need to [cancel the message][msg-cancel], save the `sid` property from the scheduled `Message` resource response.

```jsonc {title="Example of the Message response with status and sid"}
// !focus(17,18)
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "body": "This is a scheduled message",
  "date_created": "Mon, 29 Nov 2021 22:40:10 +0000",
  "date_sent": null,
  "date_updated": "Mon, 29 Nov 2021 22:40:10 +0000",
  "direction": "outbound-api",
  "error_code": null,
  "error_message": null,
  "from": null,
  "messaging_service_sid": "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "num_media": "0",
  "num_segments": "0",
  "price": null,
  "price_unit": null,
  "sid": "SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "status": "scheduled",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Media.json"
  },
  "to": "+15558675310",
  "uri": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json"
}
```

## Send-time failures

A scheduled message can succeed at creation, but the message fails at the `SendAt` time. The following sections cover two of these cases.

### User-opt outs

User opt-outs don't cancel scheduled messages. Scheduled messages to users who have opted out fail at the `SendAt` time. If a user opts out of receiving messages, you can [cancel the remaining scheduled messages][msg-cancel] to that user.

### WhatsApp template validation failures

WhatsApp requires apps use pre-registered templates for their business-initiated notifications, except in reply to a user-initiated message. Pre-registered templates get validated at the `SendAt` time, not when you create the `Message` resource. Messages that don't use a pre-approved WhatsApp template fail at send time.

To learn more, see [Twilio WhatsApp API](/docs/whatsapp/api#sending-notifications-with-whatsapp).

## Cancel a scheduled message

To cancel a scheduled message, [update the Message resource](/docs/messaging/api/message-resource#update-a-message-resource) and set the `Status` to `canceled`.

A `canceled` status callback event returns when a Message resource's status transitions to canceled.

Cancel a scheduled message

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateMessage() {
  const message = await client
    .messages("SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update({ status: "canceled" });

  console.log(message.body);
}

updateMessage();
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

message = client.messages("SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").update(
    status="canceled"
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

        var message = await MessageResource.UpdateAsync(
            status: MessageResource.UpdateStatusEnum.Canceled,
            pathSid: "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(message.Body);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Message message =
            Message.updater("SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").setStatus(Message.UpdateStatus.CANCELED).update();

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

	params := &api.UpdateMessageParams{}
	params.SetStatus("canceled")

	resp, err := client.Api.UpdateMessage("SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		params)
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

$message = $twilio
    ->messages("SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->update(["status" => "canceled"]);

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
          .messages('SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
          .update(status: 'canceled')

puts message.body
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:update \
   --sid SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --status canceled
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json" \
--data-urlencode "Status=canceled" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "body": "Hello World!",
  "date_created": "Fri, 24 May 2019 17:18:27 +0000",
  "date_sent": null,
  "date_updated": "Fri, 24 May 2019 18:18:28 +0000",
  "direction": "outbound-api",
  "error_code": null,
  "error_message": null,
  "from": null,
  "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "num_media": "0",
  "num_segments": "1",
  "price": null,
  "price_unit": "USD",
  "sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "canceled",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMb7c0a2ce80504485a6f653a7110836f5/Media.json",
    "feedback": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMb7c0a2ce80504485a6f653a7110836f5/Feedback.json"
  },
  "to": "+18182008801",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMb7c0a2ce80504485a6f653a7110836f5.json"
}
```

## Maximum number of scheduled messages

Each Account and Subaccount can schedule up to 1,000,000 messages at any given time. Subaccount limits don't consume the parent Account's allocation.

## Additional resources

* ["Message Scheduling FAQs" Help Center article](https://help.twilio.com/hc/en-us/articles/4412165297947-Message-Scheduling-FAQs-and-Limitations)
* [How to Send SMS Messages with Messaging Services](/docs/messaging/tutorials/send-messages-with-messaging-services)
* [Message Resource API Documentation](/docs/messaging/api/message-resource)

[msg-cancel]: #cancel-a-scheduled-message
