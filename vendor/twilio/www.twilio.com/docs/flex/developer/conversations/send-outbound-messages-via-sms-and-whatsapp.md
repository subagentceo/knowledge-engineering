# Send Outbound Messages with Flex Conversations Channels

> \[!NOTE]
>
> Flex Conversations requires Flex UI 2.0.x. If you are on Flex UI 1.x.x, refer to the [Messaging in Flex](/docs/flex/developer/messaging) pages.

> \[!NOTE]
>
> Flex Conversations currently does not support displaying the customer's
> WhatsApp Profile Name.

You can use the [`/Interactions` endpoint](/docs/flex/developer/conversations/interactions-api/interactions) to implement additional opportunities for agents to send an outbound message with SMS, WhatsApp, Chat, Email, or Facebook Messenger (public beta).

Some practical examples include a "click-to-sms" or "click-to-email" functionality in your CRM integration.

### Request body parameters

```json
{"schema":{"type":"object","title":"CreateInteractionRequest","required":["Channel"],"properties":{"Channel":{"description":"The Interaction's channel."},"Routing":{"description":"The Interaction's routing logic."},"InteractionContextSid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^HQ[0-9a-fA-F]{32}$","description":"The Interaction context sid is used for adding a context lookup sid"},"WebhookTtid":{"type":"string","description":"The unique identifier for Interaction level webhook"}}},"examples":{"create":{"value":{"lang":"json","value":"{\n  \"Channel\": \"{\\\"type\\\":\\\"sms\\\",\\\"initiated_by\\\":\\\"customer\\\"}\",\n  \"Routing\": \"{}\",\n  \"InteractionContextSid\": \"interaction_context_sid\",\n  \"WebhookTtid\": \"flex_interactionwebhook_00000000000000000000000000\"\n}","meta":"","code":"{\n  \"Channel\": \"{\\\"type\\\":\\\"sms\\\",\\\"initiated_by\\\":\\\"customer\\\"}\",\n  \"Routing\": \"{}\",\n  \"InteractionContextSid\": \"interaction_context_sid\",\n  \"WebhookTtid\": \"flex_interactionwebhook_00000000000000000000000000\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Channel\"","#7EE787"],[":","#C9D1D9"]," ",["\"{","#A5D6FF"],["\\\"","#79C0FF"],["type","#A5D6FF"],["\\\"","#79C0FF"],[":","#A5D6FF"],["\\\"","#79C0FF"],["sms","#A5D6FF"],["\\\"","#79C0FF"],[",","#A5D6FF"],["\\\"","#79C0FF"],["initiated_by","#A5D6FF"],["\\\"","#79C0FF"],[":","#A5D6FF"],["\\\"","#79C0FF"],["customer","#A5D6FF"],["\\\"","#79C0FF"],["}\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Routing\"","#7EE787"],[":","#C9D1D9"]," ",["\"{}\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"InteractionContextSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"interaction_context_sid\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"WebhookTtid\"","#7EE787"],[":","#C9D1D9"]," ",["\"flex_interactionwebhook_00000000000000000000000000\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

On your outbound request, you must set the `initiated_by` property to "agent". Also, there are specific field requirements depending on your channel type. See [Interactions resource request parameters](/docs/flex/developer/conversations/interactions-api/interactions#request-parameters) for the different properties you can set.

Outbound SMS

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
      initiated_by: "agent",
      properties: {
        type: "sms",
      },
      participants: [
        {
          address: "+13115552368",
          proxy_address: "+192555512345",
          type: "sms",
        },
      ],
    },
    routing: {
      properties: {
        workspace_sid: "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        workflow_sid: "WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        queue_sid: "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        worker_sid: "WKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        task_channel_unique_name: "sms",
        attributes: {
          customerName: "silly name",
          customerAddress: "+1311-555-2368",
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
        "initiated_by": "agent",
        "properties": {"type": "sms"},
        "participants": [
            {
                "address": "+13115552368",
                "proxy_address": "+192555512345",
                "type": "sms",
            }
        ],
    },
    routing={
        "properties": {
            "workspace_sid": "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "workflow_sid": "WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "queue_sid": "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "worker_sid": "WKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "task_channel_unique_name": "sms",
            "attributes": {
                "customerName": "silly name",
                "customerAddress": "+1311-555-2368",
            },
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

        var
            interaction =
                await InteractionResource
                    .CreateAsync(
                        channel: new Dictionary<
                            string,
                            Object>() { { "type", "sms" }, { "initiated_by", "agent" }, { "properties", new Dictionary<string, Object>() { { "type", "sms" } } }, { "participants", new List<Object> { new Dictionary<string, Object>() { { "address", "+13115552368" }, { "proxy_address", "+192555512345" }, { "type", "sms" } } } } },
                        routing: new Dictionary<string, Object>() {
                            { "properties",
                              new Dictionary<string, Object>() {
                                  { "workspace_sid", "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" },
                                  { "workflow_sid", "WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" },
                                  { "queue_sid", "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" },
                                  { "worker_sid", "WKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" },
                                  { "task_channel_unique_name", "sms" },
                                  { "attributes",
                                    new Dictionary<string, Object>() {
                                        { "customerName", "silly name" },
                                        { "customerAddress", "+1311-555-2368" }
                                    } }
                              } }
                        });

        Console.WriteLine(interaction.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.util.Arrays;
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
                                              put("initiated_by", "agent");
                                              put("properties", new HashMap<String, Object>() {
                                                  {
                                                      put("type", "sms");
                                                  }
                                              });
                                              put("participants", Arrays.asList(new HashMap<String, Object>() {
                                                  {
                                                      put("address", "+13115552368");
                                                      put("proxy_address", "+192555512345");
                                                      put("type", "sms");
                                                  }
                                              }));
                                          }
                                      })
                                      .setRouting(new HashMap<String, Object>() {
                                          {
                                              put("properties", new HashMap<String, Object>() {
                                                  {
                                                      put("workspace_sid", "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
                                                      put("workflow_sid", "WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
                                                      put("queue_sid", "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
                                                      put("worker_sid", "WKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
                                                      put("task_channel_unique_name", "sms");
                                                      put("attributes", new HashMap<String, Object>() {
                                                          {
                                                              put("customerName", "silly name");
                                                              put("customerAddress", "+1311-555-2368");
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
		"initiated_by": "agent",
		"properties": map[string]interface{}{
			"type": "sms",
		},
		"participants": []interface{}{
			map[string]interface{}{
				"address":       "+13115552368",
				"proxy_address": "+192555512345",
				"type":          "sms",
			},
		},
	})
	params.SetRouting(map[string]interface{}{
		"properties": map[string]interface{}{
			"workspace_sid":            "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
			"workflow_sid":             "WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
			"queue_sid":                "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
			"worker_sid":               "WKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
			"task_channel_unique_name": "sms",
			"attributes": map[string]interface{}{
				"customerName":    "silly name",
				"customerAddress": "+1311-555-2368",
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
        "initiated_by" => "agent",
        "properties" => [
            "type" => "sms",
        ],
        "participants" => [
            [
                "address" => "+13115552368",
                "proxy_address" => "+192555512345",
                "type" => "sms",
            ],
        ],
    ], // Channel
    [
        "routing" => [
            "properties" => [
                "workspace_sid" => "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                "workflow_sid" => "WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                "queue_sid" => "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                "worker_sid" => "WKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                "task_channel_unique_name" => "sms",
                "attributes" => [
                    "customerName" => "silly name",
                    "customerAddress" => "+1311-555-2368",
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
                  'initiated_by' => 'agent',
                  'properties' => {
                    'type' => 'sms'
                  },
                  'participants' => [
                    {
                      'address' => '+13115552368',
                      'proxy_address' => '+192555512345',
                      'type' => 'sms'
                    }
                  ]
                },
                routing: {
                  'properties' => {
                    'workspace_sid' => 'WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                    'workflow_sid' => 'WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                    'queue_sid' => 'WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                    'worker_sid' => 'WKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                    'task_channel_unique_name' => 'sms',
                    'attributes' => {
                      'customerName' => 'silly name',
                      'customerAddress' => '+1311-555-2368'
                    }
                  }
                }
              )

puts interaction.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:flex:v1:interactions:create \
   --channel "{\"type\":\"sms\",\"initiated_by\":\"agent\",\"properties\":{\"type\":\"sms\"},\"participants\":[{\"address\":\"+13115552368\",\"proxy_address\":\"+192555512345\",\"type\":\"sms\"}]}" \
   --routing "{\"properties\":{\"workspace_sid\":\"WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\",\"workflow_sid\":\"WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\",\"queue_sid\":\"WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\",\"worker_sid\":\"WKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\",\"task_channel_unique_name\":\"sms\",\"attributes\":{\"customerName\":\"silly name\",\"customerAddress\":\"+1311-555-2368\"}}}"
```

```bash
CHANNEL_OBJ=$(cat << EOF
{
  "type": "sms",
  "initiated_by": "agent",
  "properties": {
    "type": "sms"
  },
  "participants": [
    {
      "address": "+13115552368",
      "proxy_address": "+192555512345",
      "type": "sms"
    }
  ]
}
EOF
)
ROUTING_OBJ=$(cat << EOF
{
  "properties": {
    "workspace_sid": "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "workflow_sid": "WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "queue_sid": "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "worker_sid": "WKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "task_channel_unique_name": "sms",
    "attributes": {
      "customerName": "silly name",
      "customerAddress": "+1311-555-2368"
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
    "initiated_by": "agent",
    "properties": {
      "type": "sms"
    },
    "participants": [
      {
        "address": "+13115552368",
        "proxy_address": "+192555512345",
        "type": "sms"
      }
    ]
  },
  "routing": {
    "properties": {
      "workspace_sid": "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "workflow_sid": "WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "queue_sid": "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "worker_sid": "WKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "task_channel_unique_name": "sms",
      "attributes": {
        "customerName": "silly name",
        "customerAddress": "+1311-555-2368"
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

## Outbound WhatsApp

Creating outbound WhatsApp interactions is very similar to outbound SMS. However, you will need to create [outbound templates](/docs/whatsapp/tutorial/send-whatsapp-notification-messages-templates) in order for an agent to initiate contact.

Outbound WhatsApp

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
      type: "whatsapp",
      initiated_by: "agent",
      properties: {
        type: "whatsapp",
      },
      participants: [
        {
          address: "whatsapp:+1311-555-2368",
          proxy_address: "whatsapp:+19251235555",
          type: "whatsapp",
        },
      ],
    },
    routing: {
      properties: {
        workspace_sid: "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        workflow_sid: "WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        queue_sid: "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        worker_sid: "WKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        attributes: {
          customerName: "Test Customer",
          customerAddress: "whatsapp:+1311-555-2368",
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
        "type": "whatsapp",
        "initiated_by": "agent",
        "properties": {"type": "whatsapp"},
        "participants": [
            {
                "address": "whatsapp:+1311-555-2368",
                "proxy_address": "whatsapp:+19251235555",
                "type": "whatsapp",
            }
        ],
    },
    routing={
        "properties": {
            "workspace_sid": "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "workflow_sid": "WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "queue_sid": "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "worker_sid": "WKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "attributes": {
                "customerName": "Test Customer",
                "customerAddress": "whatsapp:+1311-555-2368",
            },
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

        var
            interaction =
                await InteractionResource
                    .CreateAsync(
                        channel: new Dictionary<string, Object>() { { "type", "whatsapp" }, { "initiated_by", "agent" }, { "properties", new Dictionary<string, Object>() { { "type", "whatsapp" } } }, { "participants", new List<Object> { new Dictionary<string, Object>() { { "address", "whatsapp:+1311-555-2368" }, { "proxy_address", "whatsapp:+19251235555" }, { "type", "whatsapp" } } } } },
                        routing: new Dictionary<string, Object>() {
                            { "properties",
                              new Dictionary<string, Object>() {
                                  { "workspace_sid", "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" },
                                  { "workflow_sid", "WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" },
                                  { "queue_sid", "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" },
                                  { "worker_sid", "WKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" },
                                  { "attributes",
                                    new Dictionary<string, Object>() {
                                        { "customerName", "Test Customer" },
                                        { "customerAddress", "whatsapp:+1311-555-2368" }
                                    } }
                              } }
                        });

        Console.WriteLine(interaction.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.util.Arrays;
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
                                              put("type", "whatsapp");
                                              put("initiated_by", "agent");
                                              put("properties", new HashMap<String, Object>() {
                                                  {
                                                      put("type", "whatsapp");
                                                  }
                                              });
                                              put("participants", Arrays.asList(new HashMap<String, Object>() {
                                                  {
                                                      put("address", "whatsapp:+1311-555-2368");
                                                      put("proxy_address", "whatsapp:+19251235555");
                                                      put("type", "whatsapp");
                                                  }
                                              }));
                                          }
                                      })
                                      .setRouting(new HashMap<String, Object>() {
                                          {
                                              put("properties", new HashMap<String, Object>() {
                                                  {
                                                      put("workspace_sid", "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
                                                      put("workflow_sid", "WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
                                                      put("queue_sid", "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
                                                      put("worker_sid", "WKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
                                                      put("attributes", new HashMap<String, Object>() {
                                                          {
                                                              put("customerName", "Test Customer");
                                                              put("customerAddress", "whatsapp:+1311-555-2368");
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
		"type":         "whatsapp",
		"initiated_by": "agent",
		"properties": map[string]interface{}{
			"type": "whatsapp",
		},
		"participants": []interface{}{
			map[string]interface{}{
				"address":       "whatsapp:+1311-555-2368",
				"proxy_address": "whatsapp:+19251235555",
				"type":          "whatsapp",
			},
		},
	})
	params.SetRouting(map[string]interface{}{
		"properties": map[string]interface{}{
			"workspace_sid": "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
			"workflow_sid":  "WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
			"queue_sid":     "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
			"worker_sid":    "WKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
			"attributes": map[string]interface{}{
				"customerName":    "Test Customer",
				"customerAddress": "whatsapp:+1311-555-2368",
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
        "type" => "whatsapp",
        "initiated_by" => "agent",
        "properties" => [
            "type" => "whatsapp",
        ],
        "participants" => [
            [
                "address" => "whatsapp:+1311-555-2368",
                "proxy_address" => "whatsapp:+19251235555",
                "type" => "whatsapp",
            ],
        ],
    ], // Channel
    [
        "routing" => [
            "properties" => [
                "workspace_sid" => "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                "workflow_sid" => "WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                "queue_sid" => "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                "worker_sid" => "WKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                "attributes" => [
                    "customerName" => "Test Customer",
                    "customerAddress" => "whatsapp:+1311-555-2368",
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
                  'type' => 'whatsapp',
                  'initiated_by' => 'agent',
                  'properties' => {
                    'type' => 'whatsapp'
                  },
                  'participants' => [
                    {
                      'address' => 'whatsapp:+1311-555-2368',
                      'proxy_address' => 'whatsapp:+19251235555',
                      'type' => 'whatsapp'
                    }
                  ]
                },
                routing: {
                  'properties' => {
                    'workspace_sid' => 'WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                    'workflow_sid' => 'WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                    'queue_sid' => 'WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                    'worker_sid' => 'WKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                    'attributes' => {
                      'customerName' => 'Test Customer',
                      'customerAddress' => 'whatsapp:+1311-555-2368'
                    }
                  }
                }
              )

puts interaction.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:flex:v1:interactions:create \
   --channel "{\"type\":\"whatsapp\",\"initiated_by\":\"agent\",\"properties\":{\"type\":\"whatsapp\"},\"participants\":[{\"address\":\"whatsapp:+1311-555-2368\",\"proxy_address\":\"whatsapp:+19251235555\",\"type\":\"whatsapp\"}]}" \
   --routing "{\"properties\":{\"workspace_sid\":\"WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\",\"workflow_sid\":\"WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\",\"queue_sid\":\"WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\",\"worker_sid\":\"WKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\",\"attributes\":{\"customerName\":\"Test Customer\",\"customerAddress\":\"whatsapp:+1311-555-2368\"}}}"
```

```bash
CHANNEL_OBJ=$(cat << EOF
{
  "type": "whatsapp",
  "initiated_by": "agent",
  "properties": {
    "type": "whatsapp"
  },
  "participants": [
    {
      "address": "whatsapp:+1311-555-2368",
      "proxy_address": "whatsapp:+19251235555",
      "type": "whatsapp"
    }
  ]
}
EOF
)
ROUTING_OBJ=$(cat << EOF
{
  "properties": {
    "workspace_sid": "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "workflow_sid": "WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "queue_sid": "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "worker_sid": "WKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "attributes": {
      "customerName": "Test Customer",
      "customerAddress": "whatsapp:+1311-555-2368"
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
    "type": "whatsapp",
    "initiated_by": "agent",
    "properties": {
      "type": "whatsapp"
    },
    "participants": [
      {
        "address": "whatsapp:+1311-555-2368",
        "proxy_address": "whatsapp:+19251235555",
        "type": "whatsapp"
      }
    ]
  },
  "routing": {
    "properties": {
      "workspace_sid": "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "workflow_sid": "WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "queue_sid": "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "worker_sid": "WKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "attributes": {
        "customerName": "Test Customer",
        "customerAddress": "whatsapp:+1311-555-2368"
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

Once your interaction is created, grab the conversation SID (prefixed by CH) and pass it as a parameter when you [create a conversation message](/docs/conversations-classic/api/conversation-message-resource).

```bash
curl -X POST https://conversations.twilio.com/v1/Conversations/CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages \
--data-urlencode "Author=agentname" \
--data-urlencode "Body=Hello world" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```
