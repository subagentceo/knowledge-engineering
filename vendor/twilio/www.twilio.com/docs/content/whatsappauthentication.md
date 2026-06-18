# whatsapp/authentication

The `whatsapp/authentication` content type allows companies to deliver a WhatsApp-approved one-time password button. Unlike other templates, the body is preset by WhatsApp. Some modifications can be made by specifying certain parameters. However, custom authentication templates aren't allowed.

> \[!NOTE]
>
> * When sending `whatsapp/authentication` content templates, a single variable must be defined at send time and set to the one-time passcode.
> * `whatsapp/authentication` content templates must be approved by WhatsApp before they can be sent to customers.

## Supported channels

WhatsApp

## Message preview

![WhatsApp message with verification code 1234, expires in 40 minutes.](https://docs-resources.prod.twilio.com/9ca107489fbc8a29573225860a3fe247624ef13f4127f400bd6ab5b9e9b46d28.png)

## Data parameters

| Parameter                     | Type    | Required | [Variable support](/docs/content/using-variables-with-content-api) | Description                                                                                                                                                                                                                                          |
| ----------------------------- | ------- | -------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `add_security_recommendation` | Boolean | No       | No                                                                 | Optional field to add the message "For your security, do not share this code" or the translated language's equivalent. This field defaults to `TRUE`.                                                                                                |
| `code_expiration_minutes`     | integer | No       | No                                                                 | The amount of time you want to inform the customer that the one-time passcode is available for.<br />Adds a footer message stating "This code expires in x minutes," where x is the number specified.<br />Only whole numbers from 1–90 are allowed. |
| `actions`                     | array   | Yes      | No                                                                 | Buttons that recipients can tap on to act on the message.                                                                                                                                                                                            |

### `actions` properties

To learn more about the `actions` parameter, see [common components](/docs/content/content-types-overview#common-components).

| Property    | Parameters                                                                                                                            |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `COPY_CODE` | <ul><li>**`type`**: `COPY_CODE`.</li><li>**`copy_code_text`**: Must be specified. Meta will use approved localized wording.</li></ul> |

## Code examples and responses

Create a WhatsApp OTP button template

```cs
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Content.V1;

     TwilioClient.Init(accountSid, authToken);

    // define the whatsapp/authentication type
    var whatsappAuthentication = new WhatsappAuthentication.Builder();
    var auth1 = new WhatsappAuthAction.Builder()
        .WithType(WhatsappAuthActionType.CopyCode)
        .WithCopyCodeText("Check Flight Status")
        .Build();
    whatsappAuthentication.WithActions(new List<WhatsappAuthAction>() { auth1 });

    // define all the content types to be part of the template
    var types = new Types.Builder();
    types.WithWhatsappAuthentication(whatsappAuthentication.Build());

    // build the create request object
    var contentCreateRequest = new ContentCreateRequest.Builder();
    contentCreateRequest.WithTypes(types.Build());
    contentCreateRequest.WithLanguage("en");
    contentCreateRequest.WithFriendlyName("whatsapp_otp");
    
    // create the twilio template
    var contentTemplate = await CreateAsync(contentCreateRequest.Build());

    Console.WriteLine($"Created Twilio Content Template SID: {contentTemplate.Sid}");
```

```java
package Examples;

import com.twilio.rest.content.v1.Content;
import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Map;

public class WhatsAppAuthentication {
    public static String CreateTemplate() {
        var waAuth = new Content.WhatsappAuthentication();

        var action1 = new Content.AuthenticationAction();
        action1.setType(Content.AuthenticationActionType.COPY_CODE);
        action1.setCopyCodeText("Copy Code");

        waAuth.setActions(Arrays.asList(action1));
        waAuth.setAddSecurityRecommendation(true);
        waAuth.setCodeExpirationMinutes(new BigDecimal(10));

        var types = new Content.Types();
        types.setWhatsappAuthentication(waAuth);

        var createRequest = new Content.ContentCreateRequest("en", types);
        createRequest.setFriendlyName("whatsapp_otp");

        var content = Content.creator(createRequest).create();

        return content.getSid();
    }
}
```

```bash
curl -X POST 'https://content.twilio.com/v1/Content' \
-H 'Content-Type: application/json' \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN \
-d '{
    "friendly_name": "whatsapp_otp",
    "language": "en",
    "types": {
      "whatsapp/authentication":{
        "add_security_recommendation": true,
        "code_expiration_minutes": "30",
        "actions": [{
            "type": "COPY_CODE",
            "copy_code_text": "Copy verification code"
        }]
      }
    }
  }'
```

```json
{
    "account_sid": "$TWILIO_ACCOUNT_SID",
    "date_created": "2023-06-02T14:34:25Z",
    "date_updated": "2023-06-02T14:34:25Z",
    "friendly_name": "whatsapp_otp",
    "language": "en",
    "links": {
        "approval_create": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests/whatsapp",
        "approval_fetch": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/ApprovalRequests"
    },
    "sid": "HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "types": {
        "whatsapp/authentication": {
            "actions": [
                {
                    "copy_code_text": "Copy verification code",
                    "type": "COPY_CODE"
                }
            ],
            "add_security_recommendation": true,
            "body": "{{1}}",
            "code_expiration_minutes": 30
        }
    },
    "url": "https://content.twilio.com/v1/Content/HXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "variables": {}
}
```

## How to send different types of WhatsApp Authentication Templates

## Copy code

Copy code is the default authentication template. Copy code templates include a button that copies an OTP code to the user's clipboard.

1. Create the `whatsapp/authentication` template.
2. Follow the steps to [send the template](/docs/content/send-templates-created-with-the-content-template-builder).

## One-tap autofill

One-tap autofill lets your customers authenticate by clicking a button in WhatsApp that triggers an activity that opens your app and delivers the password or code to it.

1. Ensure you have the proper [configuration](https://developers.facebook.com/docs/whatsapp/business-management-api/authentication-templates/autofill-button-authentication-templates#app-signing-key-hash) with a functioning handshake and app key signing hash.
2. Create the `whatsapp/authentication` template.
3. Go to the WhatsApp Manager. You can do this from the WhatsApp Senders page in the Twilio Console or by following the steps to [open WhatsApp Manager here](https://developers.facebook.com/docs/whatsapp/overview/business-accounts/#access-your-waba-whatsapp-manager).
4. Click **Manage Templates**. Find the `whatsapp/authentication` template that you created. The format is **name\_of\_template\_content\_sid**.
5. Edit the template to include the one-tap fields.
6. Follow the steps to [send the template](/docs/content/send-templates-created-with-the-content-template-builder).

## Zero-tap

Zero-tap authentication templates allow your users to receive one-time passwords or codes through WhatsApp without having to leave your app. If the zero-tap process fails, the code is still delivered in the WhatsApp chat.

1. Ensure you have the proper [configuration](https://developers.facebook.com/docs/whatsapp/business-management-api/authentication-templates/zero-tap-authentication-templates#app-signing-key-hash) with a functioning handshake and app key signing hash.
2. Create the `whatsapp/authentication` template.
3. Go to the WhatsApp Manager. You can do this from the WhatsApp Senders page in the Twilio Console or by following the steps to [open WhatsApp Manager here](https://developers.facebook.com/docs/whatsapp/overview/business-accounts/#access-your-waba-whatsapp-manager).
4. Click **Manage Templates**. Find the `whatsapp/authentication` template you created. The format is **name\_of\_template\_content\_sid**.
5. Edit the template to include the zero-tap fields.
6. Follow the steps to [send the template](/docs/content/send-templates-created-with-the-content-template-builder).

## Send WhatsApp authentication templates created with content templates

Authentication templates are slightly different from other content types in that the body field is preset and there is a pre-existing content variable.

To send these templates, you will need to send them as usual, but include a content variable containing the one-time password (OTP) you would like to send.

The OTP that you send must be fewer than 15 characters long.

```bash
--data-urlencode "ContentVariables={"1": "12345"}" \
```

Sending WhatsApp authentication templates

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
    contentSid: "HXXXXXXXXXX",
    contentVariables: JSON.stringify({ 1: "123456" }),
    from: "whatsapp:+18551234568",
    messagingServiceSid: "MGXXXXXXXXXXX",
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
    content_sid="HXXXXXXXXXX",
    content_variables=json.dumps({"1": "123456"}),
    messaging_service_sid="MGXXXXXXXXXXX",
    from_="whatsapp:+18551234568",
    to="whatsapp:+18551234567",
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
            contentSid: "HXXXXXXXXXX",
            contentVariables: JsonConvert.SerializeObject(
                new Dictionary<string, Object>() { { "1", "123456" } }, Formatting.Indented),
            messagingServiceSid: "MGXXXXXXXXXXX",
            from: new Twilio.Types.PhoneNumber("whatsapp:+18551234568"),
            to: new Twilio.Types.PhoneNumber("whatsapp:+18551234567"));

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
                                  new com.twilio.type.PhoneNumber("whatsapp:+18551234568"),
                                  "HXXXXXXXXXX")
                              .setContentVariables(new JSONObject(new HashMap<String, Object>() {
                                  {
                                      put("1", "123456");
                                  }
                              }).toString())
                              .setMessagingServiceSid("MGXXXXXXXXXXX")
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
		"1": "123456",
	})

	if ContentVariablesError != nil {
		fmt.Println(ContentVariablesError)
		os.Exit(1)
	}

	params := &api.CreateMessageParams{}
	params.SetContentSid("HXXXXXXXXXX")
	params.SetContentVariables(string(ContentVariables))
	params.SetMessagingServiceSid("MGXXXXXXXXXXX")
	params.SetFrom("whatsapp:+18551234568")
	params.SetTo("whatsapp:+18551234567")

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
        "contentSid" => "HXXXXXXXXXX",
        "contentVariables" => json_encode([
            "1" => "123456",
        ]),
        "messagingServiceSid" => "MGXXXXXXXXXXX",
        "from" => "whatsapp:+18551234568",
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
            content_sid: 'HXXXXXXXXXX',
            content_variables: {
                '1' => '123456'
              }.to_json,
            messaging_service_sid: 'MGXXXXXXXXXXX',
            from: 'whatsapp:+18551234568',
            to: 'whatsapp:+18551234567'
          )

puts message.body
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:create \
   --content-sid HXXXXXXXXXX \
   --content-variables "{\"1\" : \"123456\"}" \
   --messaging-service-sid MGXXXXXXXXXXX \
   --from whatsapp:+18551234568 \
   --to whatsapp:+18551234567
```

```bash
CONTENT_VARIABLES_OBJ=$(cat << EOF
{
  "1": "123456"
}
EOF
)
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json" \
--data-urlencode "ContentSid=HXXXXXXXXXX" \
--data-urlencode "ContentVariables=$CONTENT_VARIABLES_OBJ" \
--data-urlencode "MessagingServiceSid=MGXXXXXXXXXXX" \
--data-urlencode "From=whatsapp:+18551234568" \
--data-urlencode "To=whatsapp:+18551234567" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "api_version": "2010-04-01",
  "body": "Hello! 👍",
  "date_created": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_sent": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_updated": "Thu, 24 Aug 2023 05:01:45 +0000",
  "direction": "outbound-api",
  "error_code": null,
  "error_message": null,
  "from": "whatsapp:+18551234568",
  "num_media": "0",
  "num_segments": "1",
  "price": null,
  "price_unit": null,
  "messaging_service_sid": "MGXXXXXXXXXXX",
  "sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "queued",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media.json"
  },
  "to": "whatsapp:+18551234567",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```
