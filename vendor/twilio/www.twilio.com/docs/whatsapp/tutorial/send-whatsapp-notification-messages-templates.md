# Send WhatsApp notification messages with templates

In this guide, you'll learn how to create message templates, submit them for approval, and send WhatsApp messages using approved templates.

For information on when message templates are required and whether they need WhatsApp approval, see [Message templates](/docs/whatsapp/key-concepts#message-templates).

## Prerequisites

Before you begin, ensure you have the following:

* An active Twilio account with WhatsApp access
* A WhatsApp Business Account (WABA) set up
* Access to Twilio Console messaging services
* Understanding of WhatsApp customer service window concept

## Create message templates and submit them for approval

Creating custom message templates allows you to send notifications outside the 24-hour customer service window.

Content Templates are omnichannel templates and offer access to WhatsApp templates. Content Templates are message templates that you can use on any channel, including WhatsApp. They offer flexibility and help ensure your implementation remains compatible with future updates at Twilio. For more detailed information about [Content Templates and how to use them with WhatsApp, refer to this page](/docs/content).

| Feature                     | What is supported in content templates                                                                     |
| --------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **Supported channels**      | WhatsApp, SMS, MMS, Facebook Messenger                                                                     |
| **Sending messages**        | Send messages with a ContentSid field                                                                      |
| **Messaging Service**       | Required                                                                                                   |
| **Rich feature support**    | Latest rich features supported by Twilio, such as catalog, carousels, media templates, and dynamic buttons |
| **API to manage templates** | Content API                                                                                                |
| **UI to manage templates**  | Content Editor in the Twilio Console, go to Messaging > Content Editor                                     |

### Set up WhatsApp message templates in your Twilio account

To create a WhatsApp template in your Twilio account, follow these steps:

1. Go to **[Twilio Console > Messaging > Content Template Builder](https://console.twilio.com/us1/develop/sms/content-template-builder)**.
2. Click **Create new**.

   ![Content Template Builder with highlighted Messaging menu and 'Create your first content template' button.](https://docs-resources.prod.twilio.com/78188c0bd82b7063c2348ae8cc79e538d688459937727d383052a788e9685e5f.png)

   > \[!NOTE]
   >
   > If you are creating a template for the first time, you will see the **Create your first content template** button. Click it to create templates.
3. On the next screen, fill out the information to submit to WhatsApp. WhatsApp's team uses the information you submit to approve or reject your template submission.

   For more information, refer to [this page on creating Content Templates](/docs/content/create-templates-with-the-content-template-builder).

   * **Template name**: The name can only contain lowercase alphanumeric characters and underscores. **Tip**: Use a name that helps WhatsApp reviewer understand the purpose of your message, for example, `"order_delivery"` rather than `"template_1"`.
   * **Template category**: You must select the category that matches WhatsApp definition. See [Meta's docs](https://developers.facebook.com/docs/whatsapp/updates-to-pricing/new-template-guidelines) for definitions and examples. Authentication templates have special constraints. See [Authentication template requirements](#authentication-template-requirements) for more information.
   * **Message language**: Select from the languages provided by WhatsApp.
   * **Message body**: The text of the message that you want to send. WhatsApp doesn't allow multiple sequential line breaks.
   * **Buttons and other rich features**: You can add a variety of button types and other rich features into a content template. To see a full list of supported template types, see our [content type overview here](/docs/content/content-types-overview).
4. After you fill out the message template, click **Save and submit for WhatsApp approval**.

![Configure WhatsApp template with call to action for website visit, including body text and URL fields.](https://docs-resources.prod.twilio.com/7d6b5d25509fd6092a56438084b1f62f91a246751b82c8a32347c4af50ea3646.png)

If your template includes placeholders (like `"Hello {{1}}! We've received your request regarding {{2}}."`), a modal will appear for you to add sample content for each placeholder. Enter sample text for each placeholder and then click **Save and submit** to submit your template to WhatsApp.

![Form to add sample data for message templates and button URLs with input fields and save option.](https://docs-resources.prod.twilio.com/2628bb52d2731c5209cc5c23e9f800d92fa0b657b2ff10ce7d676d1c7e40602f.png)

**Note**: Once you submit a template, it cannot be edited.

Refer to the WhatsApp documentation to learn more about [message template formatting and supported languages](https://developers.facebook.com/docs/whatsapp/message-templates/creation/).

### Authentication template requirements

Authentication templates have specific restrictions and pre-defined formatting set by WhatsApp for security compliance. When creating a template with the category of Authentication (i.e., Authentication Templates) using WhatsApp Templates, certain restrictions apply to comply with WhatsApp policies:

1. WhatsApp sets the body text of the template for every language and you cannot edit it.
2. You must include a **Copy Code** button, which users can use to copy the one-time passcode. You can edit the button label per language.

To learn more about the WhatsApp authentication content type, see [WhatsApp authentication](/docs/content/whatsappauthentication).

### Template translations

WhatsApp evaluates each template language translation on an individual basis. Content Templates offer searching and filtering tools to help manage your templates.

### Remove WhatsApp message templates

To delete a message template:

* Click on the template name on the WhatsApp Message Templates page.
* Click **Delete** at the bottom of the page.
* Alternatively, click on the 3-dot menu on the right-hand side of the template and select **Delete**.

Per WhatsApp guidelines, you may not reuse the name of a deleted template for 30 days after deletion.

> \[!NOTE]
>
> WhatsApp supports up to 6,000 template translations in total, across all templates, per account. Previous limits of 250 and 1,500 templates no longer apply.

### Submit templates for approval

WhatsApp reviews most templates submitted for approval within minutes. For detailed information about the approval process, [refer to this article](/docs/whatsapp/tutorial/message-template-approvals-statuses).

## Send WhatsApp messages with approved templates

Sending templated WhatsApp messages requires using the ContentSid parameter along with any necessary ContentVariables for dynamic content. To send a templated message, include the `ContentSid` parameter in the call with the `HX` content SID of the template you would like to send. If your template includes variables, set them using the `ContentVariables` parameter. For more information, see [Send templates created with the Content Template Builder](/docs/content/send-templates-created-with-the-content-template-builder).

The following example demonstrates how to structure template variables for a order confirmation message:

```bash
Hi {{1}}! Thanks for placing an order with us. We'll let you know once we process and deliver your order. Your order number is {{2}}. Thanks
```

In the `ContentVariables` parameter of the message resource, provide the end user's information as follows:

```bash
ContentVariables={ "1": "Joe", "2": "O12235234" }
```

Send a WhatsApp message using a message template

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
    contentSid: "HXXXXXXXXX",
    contentVariables: JSON.stringify({ 1: "Name" }),
    from: "whatsapp:+15005550006",
    messagingServiceSid: "MGXXXXXXXX",
    to: "whatsapp:+18551234567",
  });

  console.log(message.body);
}

createMessage();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client
import json

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

message = client.messages.create(
    content_sid="HXXXXXXXXX",
    to="whatsapp:+18551234567",
    from_="whatsapp:+15005550006",
    content_variables=json.dumps({"1": "Name"}),
    messaging_service_sid="MGXXXXXXXX",
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
using Newtonsoft.Json;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var message = await MessageResource.CreateAsync(
            contentSid: "HXXXXXXXXX",
            to: new Twilio.Types.PhoneNumber("whatsapp:+18551234567"),
            from: new Twilio.Types.PhoneNumber("whatsapp:+15005550006"),
            contentVariables: JsonConvert.SerializeObject(
                new Dictionary<string, Object>() { { "1", "Name" } }, Formatting.Indented),
            messagingServiceSid: "MGXXXXXXXX");

        Console.WriteLine(message.Body);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.type.PhoneNumber;
import java.util.HashMap;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import org.json.JSONObject;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Message message = Message
                              .creator(new com.twilio.type.PhoneNumber("whatsapp:+18551234567"),
                                  new com.twilio.type.PhoneNumber("whatsapp:+15005550006"),
                                  "HXXXXXXXXX")
                              .setContentVariables(new JSONObject(new HashMap<String, Object>() {
                                  {
                                      put("1", "Name");
                                  }
                              }).toString())
                              .setMessagingServiceSid("MGXXXXXXXX")
                              .create();

        System.out.println(message.getBody());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"encoding/json"
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

	ContentVariables, ContentVariablesError := json.Marshal(map[string]interface{}{
		"1": "Name",
	})

	if ContentVariablesError != nil {
		fmt.Println(ContentVariablesError)
		os.Exit(1)
	}

	params := &api.CreateMessageParams{}
	params.SetContentSid("HXXXXXXXXX")
	params.SetTo("whatsapp:+18551234567")
	params.SetFrom("whatsapp:+15005550006")
	params.SetContentVariables(string(ContentVariables))
	params.SetMessagingServiceSid("MGXXXXXXXX")

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
    "whatsapp:+18551234567", // To
    [
        "contentSid" => "HXXXXXXXXX",
        "from" => "whatsapp:+15005550006",
        "contentVariables" => json_encode([
            "1" => "Name",
        ]),
        "messagingServiceSid" => "MGXXXXXXXX",
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
            content_sid: 'HXXXXXXXXX',
            to: 'whatsapp:+18551234567',
            from: 'whatsapp:+15005550006',
            content_variables: {
                '1' => 'Name'
              }.to_json,
            messaging_service_sid: 'MGXXXXXXXX'
          )

puts message.body
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:create \
   --content-sid HXXXXXXXXX \
   --to whatsapp:+18551234567 \
   --from whatsapp:+15005550006 \
   --content-variables {\"1\":\"Name\"} \
   --messaging-service-sid MGXXXXXXXX
```

```bash
CONTENT_VARIABLES_OBJ=$(cat << EOF
{
  "1": "Name"
}
EOF
)
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json" \
--data-urlencode "ContentSid=HXXXXXXXXX" \
--data-urlencode "To=whatsapp:+18551234567" \
--data-urlencode "From=whatsapp:+15005550006" \
--data-urlencode "ContentVariables=$CONTENT_VARIABLES_OBJ" \
--data-urlencode "MessagingServiceSid=MGXXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXX",
  "api_version": "2010-04-01",
  "body": "Hello! 👍",
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
  "messaging_service_sid": "MGXXXXXXXX",
  "sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "queued",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media.json"
  },
  "to": "whatsapp:+18551234567",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

### Include line breaks and escape characters in templates

If you are rendering line breaks or other escaped characters, encode the line breaks properly based on the language you are using. The Twilio Console may show line breaks and other escaped characters in their raw form, such as `\n`.

## Initiate the customer service window with a generic template

You may want to send different types of notifications and messages to your users. However, it is difficult and inefficient to go through the template approval process for every type of message you want to send to your end users.

For example, you might want to send a time-sensitive message such as "We are having a company-wide announcement at 11 AM." WhatsApp is unlikely to approve this template, making it challenging to build a real notification flow.

To work around this, you can create a generic template that asks your end users to respond. An example of a generic notification template you can submit for approval is:

`"Hello {{1}}, we have a new update regarding your account. Respond to this message to receive it. Have a nice day!"`

Once an end user replies to this templated message, it initiates the 24-hour customer service window, during which your business can send free-form messages.

## Monitor live templates

Once you start using your templates, monitor them for excessive negative user feedback.

### Paused and deactivated templates

WhatsApp may pause templates that receive excessive negative feedback to protect sender quality ratings. If end users repeatedly block or report spam in association with a message template, WhatsApp will pause the template for a period of time. Pausing durations are as follows:

* First instance: **Paused** for 3 hours
* Second instance: **Paused** for 6 hours
* Third instance: **Deactivated**

When WhatsApp pauses a template a third time, WhatsApp will permanently deactivate it. Messages using paused or deactivated templates will fail. Paused and deactivated message templates that you attempt to send do not count against the daily messaging limit.

### Get alerts for paused, deactivated, and rejected templates

Twilio can send a notification using [Twilio Alerts](/docs/messaging/guides/debugging-tools#custom-alerts) when a template status changes to `paused`, `disabled`, or `rejected`. To get notified, create an alert for error 63041 (`paused`), 63042 (`disabled`), or 63040 (`rejected`). We also offer alarms for approved templates with code 63046.

## Include links in your templates

You may send URLs in a template. For example: "Thanks for registering with Example Business. To continue, click on https://app.example.com."

WhatsApp does not support URL previews in templated messages. In-session messages support URL previews.

## Frequently Asked Questions

### How long does template approval take?

WhatsApp reviews and approves most templates within minutes, though complex templates may take longer.

### Can you edit a template after submission?

No, submitted templates cannot be edited. You must create another template with the desired changes.

### How many templates can you create?

WhatsApp supports up to 6,000 template translations total across all templates per account.

### What happens if users report your template as spam?

WhatsApp may pause your template for 3-6 hours, and permanently deactivate it after the third pause.

## Next steps

After understanding WhatsApp message templates, explore these related resources:

* [Set up WhatsApp Sandbox](/docs/whatsapp/sandbox) to test templates in your development environment.
* Create templates with the [Content Template Builder](/docs/content/create-templates-with-the-content-template-builder) using Twilio Console.
* Explore the [WhatsApp API documentation](/docs/whatsapp/api).
* Learn about [Message template approval process](/docs/whatsapp/tutorial/message-template-approvals-statuses).
* Learn about [WhatsApp pricing](https://www.twilio.com/en-us/whatsapp/pricing).
