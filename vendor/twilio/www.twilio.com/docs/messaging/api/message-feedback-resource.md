# Feedback subresource

Feedback is a subresource of [Messages](/docs/messaging/api/message-resource) and represents the reported outcome of tracking the performance of a user action taken by the recipient of the message.

You can [create Feedback](#create-feedback) to confirm that the recipient of the associated Message performed a tracked user action.

> \[!NOTE]
>
> For more information on why, when and how to send Feedback, see our guide [How to Optimize Message Deliverability with Message Feedback](/docs/messaging/guides/send-message-feedback-to-twilio). It explains what suitable tracked user actions of message recipients are and how they relate to the [Message Insights One-time Password (OTP) Conversion Report](/docs/messaging/features/messaging-insights/dashboards#otp-conversion-dashboard).

> \[!NOTE]
>
> Looking for step-by-step instructions on tracking the delivery of your sent messages based on Twilio- and carrier-captured status data? Follow our guide to [Tracking the Message Status of Outbound Messages](/docs/messaging/guides/track-outbound-message-status) in the programming language of your choice.

## Feedback Properties

<OperationTable type="properties" data={{"type":"object","refName":"api.v2010.account.message.message_feedback","modelName":"api_v2010_account_message_message_feedback","properties":{"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) associated with this MessageFeedback resource."},"message_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^(SM|MM)[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the Message resource associated with this MessageFeedback resource."},"outcome":{"type":"string","enum":["confirmed","unconfirmed"],"description":"Reported outcome indicating whether there is confirmation that the Message recipient performed a tracked user action. Can be: `unconfirmed` or `confirmed`. For more details see [How to Optimize Message Deliverability with Message Feedback](https://www.twilio.com/docs/messaging/guides/send-message-feedback-to-twilio).","refName":"message_feedback_enum_outcome","modelName":"message_feedback_enum_outcome"},"date_created":{"type":"string","format":"date-time-rfc-2822","nullable":true,"description":"The date and time in GMT when this MessageFeedback resource was created, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format."},"date_updated":{"type":"string","format":"date-time-rfc-2822","nullable":true,"description":"The date and time in GMT when this MessageFeedback resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format."},"uri":{"type":"string","nullable":true,"description":"The URI of the resource, relative to `https://api.twilio.com`."}}}} />

## Outcome Values

The following are the possible values for the `Outcome` parameter:

|               | ENUM:OUTCOME possible values in REST API format                                                                                                                                                                                                   |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `confirmed`   | The recipient of a Message performed a tracked user action and confirmation was reported by creating a Feedback subresource with the outcome set to confirmed. For more details see How to Optimize Message Deliverability with Message Feedback. |
| `unconfirmed` | The initial value for a Message created with ProvideFeedback=True. The reported outcome is unconfirmed until a Feedback subresource is created with an outcome property of confirmed.                                                             |

## Create Feedback

`POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Messages/{MessageSid}/Feedback.json`

> \[!WARNING]
>
> To track and provide Message Feedback for a Message, you must set the `ProvideFeedback` parameter to `true` when you first [create the Message](/docs/messaging/api/message-resource#create-a-message-resource). Upon Message creation, the `outcome` of the Message Feedback will then initially be treated as `unconfirmed`.
>
> For more information on why, when and how to send Message Feedback, see our guide [How to Optimize Message Deliverability with Message Feedback](/docs/messaging/guides/send-message-feedback-to-twilio).

You can use this action to create Message Feedback confirming the performance of a tracked user action.

Pass the `Outcome` parameter with value `confirmed` to update the Message Feedback once the associated Message was received and the message recipient performed the tracked user action based on the received message.

> \[!NOTE]
>
> Update the Message Feedback even if the Message is received with a delay once the conditions for confirmation are met. This ensures the Messaging Insights are current and message delivery optimizations are based on complete information.

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) associated with the Message resource for which to create MessageFeedback.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true},{"name":"MessageSid","in":"path","description":"The SID of the Message resource for which to create MessageFeedback.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^(SM|MM)[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"CreateMessageFeedbackRequest","properties":{"Outcome":{"type":"string","enum":["confirmed","unconfirmed"],"description":"Reported outcome indicating whether there is confirmation that the Message recipient performed a tracked user action. Can be: `unconfirmed` or `confirmed`. For more details see [How to Optimize Message Deliverability with Message Feedback](https://www.twilio.com/docs/messaging/guides/send-message-feedback-to-twilio).","refName":"message_feedback_enum_outcome","modelName":"message_feedback_enum_outcome"}}},"examples":{"create":{"value":{"lang":"json","value":"{\n  \"Outcome\": \"confirmed\"\n}","meta":"","code":"{\n  \"Outcome\": \"confirmed\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Outcome\"","#7EE787"],[":","#C9D1D9"]," ",["\"confirmed\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Create Feedback to confirm the performance of the tracked user action

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createMessageFeedback() {
  const feedback = await client
    .messages("SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .feedback.create({ outcome: "confirmed" });

  console.log(feedback.accountSid);
}

createMessageFeedback();
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

feedback = client.messages(
    "SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).feedback.create(outcome="confirmed")

print(feedback.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account.Message;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var feedback = await FeedbackResource.CreateAsync(
            outcome: FeedbackResource.OutcomeEnum.Confirmed,
            pathMessageSid: "SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(feedback.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.message.Feedback;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Feedback feedback =
            Feedback.creator("SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").setOutcome(Feedback.Outcome.CONFIRMED).create();

        System.out.println(feedback.getAccountSid());
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

	params := &api.CreateMessageFeedbackParams{}
	params.SetOutcome("confirmed")

	resp, err := client.Api.CreateMessageFeedback("SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.AccountSid != nil {
			fmt.Println(*resp.AccountSid)
		} else {
			fmt.Println(resp.AccountSid)
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

$feedback = $twilio
    ->messages("SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->feedback->create(["outcome" => "confirmed"]);

print $feedback->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

feedback = @client
           .api
           .v2010
           .messages('SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
           .feedback
           .create(outcome: 'confirmed')

puts feedback.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:feedback:create \
   --message-sid SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --outcome confirmed
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages/SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Feedback.json" \
--data-urlencode "Outcome=confirmed" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "date_created": "Thu, 30 Jul 2015 20:00:00 +0000",
  "date_updated": "Thu, 30 Jul 2015 20:00:00 +0000",
  "message_sid": "SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "outcome": "confirmed",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/MMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Feedback.json"
}
```

## What's next?

Now that you know how to work with the Feedback subresource, you should check out the following:

* View your reported Message Feedback information in the [Console](https://www.twilio.com/console/sms/insights/feedback) to help you monitor and understand your message deliverability.
