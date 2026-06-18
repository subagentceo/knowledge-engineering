# Send templates created with the Content Template Builder

This guide explains how to send messages using templates created with the Content Template Builder. Learn how to configure the required fields in your API request and use Messaging Services to send content templates.

To send messages with a template you created in the Content Template Builder, include two fields in your API request. First, configure a [Messaging Service](/docs/messaging/services) and [create the content template](/docs/content/create-templates-with-the-content-template-builder).

## Content fields used to send messages

Use the existing messaging endpoint with an additional `ContentSid` parameter. You can also include the `ContentVariables` field to substitute any placeholder values in your templates.

```bash
POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Messages
```

The following table describes the fields used to send content templates:

| Field              | Required | Description                                                                                                                                                                                              |
| ------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ContentSid`       | Yes      | String that identifies the preconfigured content. Required to send templates created using the Content Template Builder.                                                                                 |
| `ContentVariables` | No       | JSON string that defines values for placeholder variables in the template. Key-value pairs of placeholder variable names and substitution values. You can include up to 100 key-value pairs per request. |

> \[!NOTE]
>
> If you send a WhatsApp message outside the 24-hour free-form session, you must use a WhatsApp-approved template. To learn more, see [Content API quick start](/docs/content/create-and-send-your-first-content-api-template).

## Send content templates

The following example shows how to send a message with a content template:

> \[!WARNING]
>
> Exclude `Body` and `MediaUrl`. `ContentSid` replaces both parameters. You might need to update your library to support `ContentSid`.

Send messages with a content template

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
    from: "whatsapp:+15551234567",
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
    from_="whatsapp:+15551234567",
    content_variables=json.dumps({"1": "Name"}),
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
            from: new Twilio.Types.PhoneNumber("whatsapp:+15551234567"),
            contentVariables: JsonConvert.SerializeObject(
                new Dictionary<string, Object>() { { "1", "Name" } }, Formatting.Indented));

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
                                  new com.twilio.type.PhoneNumber("whatsapp:+15551234567"),
                                  "HXXXXXXXXX")
                              .setContentVariables(new JSONObject(new HashMap<String, Object>() {
                                  {
                                      put("1", "Name");
                                  }
                              }).toString())
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
	params.SetFrom("whatsapp:+15551234567")
	params.SetContentVariables(string(ContentVariables))

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
        "from" => "whatsapp:+15551234567",
        "contentVariables" => json_encode([
            "1" => "Name",
        ]),
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
            from: 'whatsapp:+15551234567',
            content_variables: {
                '1' => 'Name'
              }.to_json
          )

puts message.body
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:create \
   --content-sid HXXXXXXXXX \
   --to whatsapp:+18551234567 \
   --from whatsapp:+15551234567 \
   --content-variables {\"1\":\"Name\"}
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
--data-urlencode "From=whatsapp:+15551234567" \
--data-urlencode "ContentVariables=$CONTENT_VARIABLES_OBJ" \
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
  "from": "whatsapp:+15551234567",
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
  "to": "whatsapp:+18551234567",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

To send a content template, replace the `Body` field with `ContentSid` and, optionally, `ContentVariables`. The following table describes the required fields for this method:

| Field              | Required | Description                                                                                                                                                                                                                                                  |
| ------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `From`             | Yes      | The sender initiating the message. Use the following format: <ul><li>Phone numbers: [E.164 format](/docs/glossary/what-e164)</li><li>WhatsApp: `whatsapp:E.164`</li><li>Facebook Messenger: `messenger:{messenger_id}`</li></ul>                             |
| `To`               | Yes      | The identifier of the recipient you're sending the message to. Use the following format: <ul><li>Phone numbers: [E.164 format](/docs/glossary/what-e164)</li><li>WhatsApp: `whatsapp:E.164`</li><li>Facebook Messenger: `messenger:{messenger_id}`</li></ul> |
| `ContentSid`       | Yes      | String field used to identify the preconfigured content. Required to send templates created using the Content Template Builder.                                                                                                                              |
| `ContentVariables` | No       | JSON string used to define the values of any placeholder variables found in the preconfigured content. Key-value pairs of placeholder variable names and substitution values.                                                                                |

## Use Messaging Services to send content templates

You can also use a Messaging Service to send content templates. Using Messaging Services can help you organize your account and manage complexity as your messaging application grows. To learn more about Messaging Services features, see [Messaging Services](/docs/messaging/services).

## Twilio Console

To create a Messaging Service:

1. Go to the **Products & Services > Messaging > Services**.
2. Click **Create a Messaging Service**, enter a name, select what you want to use the service for and click **Create**.
3. The service's overview page appears. From there, copy the Messaging Service SID, which starts with `MGXXXXXXXX`.

## Legacy Twilio Console

If you're using the *legacy* Twilio Console, to create a Messaging Service:

1. Go to the **Messaging > Services** section of the Twilio Console.
2. Copy your Messaging Service SID from **Twilio Console > Services**.

You can send a template created with the Content Template Builder using two methods:

* Use the `From` field to specify the Messaging Service SID
* Include a `MessagingServiceSid` field

## Send messages with a Messaging Service in the `From` field

The following example shows how to send a message using a Messaging Service in the `From` field:

> \[!WARNING]
>
> Exclude `Body` and `MediaUrl`; `ContentSid` replaces both parameters.
>
> The body in the response is empty because the body resides in the template. To view the delivered body, open the Twilio logs in the Console.

Send messages with a Messaging Service in the From field

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
    from: "MGXXXXXXXX",
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
    from_="MGXXXXXXXX",
    content_variables=json.dumps({"1": "Name"}),
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
            from: new Twilio.Types.PhoneNumber("MGXXXXXXXX"),
            contentVariables: JsonConvert.SerializeObject(
                new Dictionary<string, Object>() { { "1", "Name" } }, Formatting.Indented));

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
                                  new com.twilio.type.PhoneNumber("MGXXXXXXXX"),
                                  "HXXXXXXXXX")
                              .setContentVariables(new JSONObject(new HashMap<String, Object>() {
                                  {
                                      put("1", "Name");
                                  }
                              }).toString())
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
	params.SetFrom("MGXXXXXXXX")
	params.SetContentVariables(string(ContentVariables))

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
        "from" => "MGXXXXXXXX",
        "contentVariables" => json_encode([
            "1" => "Name",
        ]),
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
            from: 'MGXXXXXXXX',
            content_variables: {
                '1' => 'Name'
              }.to_json
          )

puts message.body
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:create \
   --content-sid HXXXXXXXXX \
   --to whatsapp:+18551234567 \
   --from MGXXXXXXXX \
   --content-variables {\"1\":\"Name\"}
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
--data-urlencode "From=MGXXXXXXXX" \
--data-urlencode "ContentVariables=$CONTENT_VARIABLES_OBJ" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXX",
  "api_version": "2010-04-01",
  "body": "Hello! 👍",
  "date_created": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_sent": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_updated": "Thu, 24 Aug 2023 05:01:45 +0000",
  "direction": "outbound-api",
  "error_code": null,
  "error_message": null,
  "from": "MGXXXXXXXX",
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
  "to": "whatsapp:+18551234567",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

This method requires adding a sender to a Messaging Service. Use this approach if you plan to scale your traffic with multiple senders.

## How to add senders to the sender pool

Each Messaging Service has a sender pool that contains all the senders associated with the service. You can view your senders in the **Senders** tab of your Messaging Service.

> \[!NOTE]
>
> 1. Go to the Messaging Service.
> 2. In the **Develop** tab, click on **Sender Pool**.
> 3. Click **Add Senders**.

Messaging Services support the following sender types:

* Phone numbers
* Short codes
* Alphanumeric senders
* WhatsApp senders
* Facebook Messenger senders

> \[!NOTE]
>
> If you don't see an option for Facebook Messenger, file a support ticket to activate the "Facebook Messenger with Messaging Services feature." For more information, see our [Facebook Messenger with Twilio](/docs/messaging/channels/facebook-messenger) documentation.

The following table summarizes all the fields used in the API request:

| Field              | Required | Description                                                                                                                                                                                                                                                  |
| ------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `From`             | Yes      | The Messaging Service SID, `MGXXXXXXXX`.                                                                                                                                                                                                                     |
| `To`               | Yes      | The identifier of the recipient you're sending the message to. Use the following format: <ul><li>Phone numbers: [E.164 format](/docs/glossary/what-e164)</li><li>WhatsApp: `whatsapp:E.164`</li><li>Facebook Messenger: `messenger:{messenger_id}`</li></ul> |
| `ContentSid`       | Yes      | String field used to identify the preconfigured content. Required to send templates created using Content Template Builder.                                                                                                                                  |
| `ContentVariables` | No       | JSON string used to define the values of any placeholder variables found in the preconfigured content. Key-value pairs of placeholder variable names and substitution values.                                                                                |

## Send messages with `MessagingServiceSid` and `From` fields

The following example shows how to send a message using both `MessagingServiceSid` and `From` fields:

Send messages with a MessagingServiceSid field

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
    from: "whatsapp:+15551234567",
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
    from_="whatsapp:+15551234567",
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
            from: new Twilio.Types.PhoneNumber("whatsapp:+15551234567"),
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
                                  new com.twilio.type.PhoneNumber("whatsapp:+15551234567"),
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
	params.SetFrom("whatsapp:+15551234567")
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
        "from" => "whatsapp:+15551234567",
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
            from: 'whatsapp:+15551234567',
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
   --from whatsapp:+15551234567 \
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
--data-urlencode "From=whatsapp:+15551234567" \
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
  "from": "whatsapp:+15551234567",
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

This method lets you keep using the `From` field to specify the sender ID. You need to reference a Messaging Service by including a new `MessagingServiceSid` field. Note that while a Messaging Service is required, you don't have to add the sender to its sender pool. This method may be simpler if you're getting started with Messaging Services.

The following table describes all the fields used in the API request:

| Field                 | Required | Description                                                                                                                                                                                                                                                  |
| --------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `From`                | Yes      | The sender that's initiating the message. Use the following format: <ul><li>Phone numbers: [E.164 format](/docs/glossary/what-e164)</li><li>WhatsApp: `whatsapp:E.164`</li><li>Facebook Messenger: `messenger:{messenger_id}`</li></ul>                      |
| `To`                  | Yes      | The identifier of the recipient you're sending the message to. Use the following format: <ul><li>Phone numbers: [E.164 format](/docs/glossary/what-e164)</li><li>WhatsApp: `whatsapp:E.164`</li><li>Facebook Messenger: `messenger:{messenger_id}`</li></ul> |
| `MessagingServiceSid` | Yes      | The Messaging Service SID, `MGXXXXXXXX`.                                                                                                                                                                                                                     |
| `ContentSid`          | Yes      | String field used to identify the preconfigured content. Required to send templates created using the Content Template Builder.                                                                                                                              |
| `ContentVariables`    | No       | JSON string used to define the values of any placeholder variables found in the preconfigured content. Key-value pairs of placeholder variable names and substitution values.                                                                                |
