# Receive Inbound Messages with Flex Conversations Channels

> \[!NOTE]
>
> Flex Conversations requires Flex UI 2.0.x. If you are on Flex UI 1.x.x, refer to the [Messaging in Flex](/docs/flex/developer/messaging) pages.

> \[!NOTE]
>
> Flex Conversations currently does not support displaying the customer's WhatsApp Profile Name.

With Flex, your customers can reach you via messaging channels, such as SMS, WhatsApp. The [Flex Messaging page](https://console.twilio.com/us1/develop/flex/channels/messaging/conversations) in the Console allows you to register Conversations addresses for your channels, so you can process inbound messages using Flex Conversations.

Please refer to the [Conversations Webhooks page](/docs/conversations-classic/conversations-webhooks) for more information on event payloads. In the event payload, you can retrieve the `ConversationSid`.

Now you can create an interaction and pass the `ConversationSid` as the `media_channel_sid`:

Create an Interaction

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createInteraction() {
  const interaction = await client.flexApi.v1.interaction.create({
    channel: {
      type: "sms",
      initiated_by: "customer",
      properties: {
        media_channel_sid: "CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      },
    },
    routing: {
      properties: {
        workspace_sid: "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        workflow_sid: "WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        task_channel_unique_name: "sms",
        attributes: {
          from: "+1311-555-2368",
        },
      },
    },
  });

  console.log(interaction.sid);
}

createInteraction();
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

interaction = client.flex_api.v1.interaction.create(
    channel={
        "type": "sms",
        "initiated_by": "customer",
        "properties": {
            "media_channel_sid": "CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
        },
    },
    routing={
        "properties": {
            "workspace_sid": "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "workflow_sid": "WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "task_channel_unique_name": "sms",
            "attributes": {"from": "+1311-555-2368"},
        }
    },
)

print(interaction.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.FlexApi.V1;
using System.Threading.Tasks;
using System.Collections.Generic;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var interaction = await InteractionResource.CreateAsync(
            channel: new Dictionary<
                string,
                Object>() { { "type", "sms" }, { "initiated_by", "customer" }, { "properties", new Dictionary<string, Object>() { { "media_channel_sid", "CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" } } } },
            routing: new Dictionary<string, Object>() {
                { "properties",
                  new Dictionary<string, Object>() {
                      { "workspace_sid", "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" },
                      { "workflow_sid", "WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" },
                      { "task_channel_unique_name", "sms" },
                      { "attributes",
                        new Dictionary<string, Object>() { { "from", "+1311-555-2368" } } }
                  } }
            });

        Console.WriteLine(interaction.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.util.HashMap;
import com.twilio.Twilio;
import com.twilio.rest.flexapi.v1.Interaction;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Interaction interaction = Interaction
                                      .creator(new HashMap<String, Object>() {
                                          {
                                              put("type", "sms");
                                              put("initiated_by", "customer");
                                              put("properties", new HashMap<String, Object>() {
                                                  {
                                                      put("media_channel_sid", "CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
                                                  }
                                              });
                                          }
                                      })
                                      .setRouting(new HashMap<String, Object>() {
                                          {
                                              put("properties", new HashMap<String, Object>() {
                                                  {
                                                      put("workspace_sid", "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
                                                      put("workflow_sid", "WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
                                                      put("task_channel_unique_name", "sms");
                                                      put("attributes", new HashMap<String, Object>() {
                                                          {
                                                              put("from", "+1311-555-2368");
                                                          }
                                                      });
                                                  }
                                              });
                                          }
                                      })
                                      .create();

        System.out.println(interaction.getSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	flex "github.com/twilio/twilio-go/rest/flex/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &flex.CreateInteractionParams{}
	params.SetChannel(map[string]interface{}{
		"type":         "sms",
		"initiated_by": "customer",
		"properties": map[string]interface{}{
			"media_channel_sid": "CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		},
	})
	params.SetRouting(map[string]interface{}{
		"properties": map[string]interface{}{
			"workspace_sid":            "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
			"workflow_sid":             "WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
			"task_channel_unique_name": "sms",
			"attributes": map[string]interface{}{
				"from": "+1311-555-2368",
			},
		},
	})

	resp, err := client.FlexV1.CreateInteraction(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Sid != nil {
			fmt.Println(*resp.Sid)
		} else {
			fmt.Println(resp.Sid)
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

$interaction = $twilio->flexApi->v1->interaction->create(
    [
        "type" => "sms",
        "initiated_by" => "customer",
        "properties" => [
            "media_channel_sid" => "CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        ],
    ], // Channel
    [
        "routing" => [
            "properties" => [
                "workspace_sid" => "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                "workflow_sid" => "WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                "task_channel_unique_name" => "sms",
                "attributes" => [
                    "from" => "+1311-555-2368",
                ],
            ],
        ],
    ]
);

print $interaction->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

interaction = @client
              .flex_api
              .v1
              .interaction
              .create(
                channel: {
                  'type' => 'sms',
                  'initiated_by' => 'customer',
                  'properties' => {
                    'media_channel_sid' => 'CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
                  }
                },
                routing: {
                  'properties' => {
                    'workspace_sid' => 'WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                    'workflow_sid' => 'WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                    'task_channel_unique_name' => 'sms',
                    'attributes' => {
                      'from' => '+1311-555-2368'
                    }
                  }
                }
              )

puts interaction.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:flex:v1:interactions:create \
   --channel "{\"type\":\"sms\",\"initiated_by\":\"customer\",\"properties\":{\"media_channel_sid\":\"CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\"}}" \
   --routing "{\"properties\":{\"workspace_sid\":\"WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\",\"workflow_sid\":\"WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\",\"task_channel_unique_name\":\"sms\",\"attributes\":{\"from\":\"+1311-555-2368\"}}}"
```

```bash
CHANNEL_OBJ=$(cat << EOF
{
  "type": "sms",
  "initiated_by": "customer",
  "properties": {
    "media_channel_sid": "CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
  }
}
EOF
)
ROUTING_OBJ=$(cat << EOF
{
  "properties": {
    "workspace_sid": "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "workflow_sid": "WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "task_channel_unique_name": "sms",
    "attributes": {
      "from": "+1311-555-2368"
    }
  }
}
EOF
)
curl -X POST "https://flex-api.twilio.com/v1/Interactions" \
--data-urlencode "Channel=$CHANNEL_OBJ" \
--data-urlencode "Routing=$ROUTING_OBJ" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "channel": {
    "type": "sms",
    "initiated_by": "customer",
    "properties": {
      "media_channel_sid": "CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    }
  },
  "routing": {
    "properties": {
      "workspace_sid": "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "workflow_sid": "WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "task_channel_unique_name": "sms",
      "attributes": {
        "from": "+1311-555-2368"
      }
    }
  },
  "interaction_context_sid": null,
  "webhook_ttid": "flex_interactionwebhook_00000000000000000000000000",
  "url": "https://flex-api.twilio.com/v1/Interactions/KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "channels": "https://flex-api.twilio.com/v1/Interactions/KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels"
  }
}
```

To configure and respond to Flex Conversations messaging tasks, see:

* [Manage Conversations SMS Addresses](/docs/flex/admin-guide/setup/conversations/manage-conversations-sms-addresses)
* [Manage Conversations WhatsApp Addresses](/docs/flex/admin-guide/setup/conversations/manage-conversations-whatsapp-addresses)
* [Manage Conversations Facebook Messenger Addresses](/docs/flex/admin-guide/setup/conversations/manage-conversations-fbmessenger-addresses)
