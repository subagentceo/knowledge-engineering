# Interactions API

## Base URL

```bash
https://flex-api.twilio.com/v1
```

## Authentication

The Flex API uses the same [HTTP Basic Authentication](/docs/usage/requests-to-twilio) as other Twilio APIs. Use your Twilio account SID as your username and your Auth Token as your password.

## Resources

* [Interactions Resource](/docs/flex/developer/conversations/interactions-api/interactions)
* [Interaction Channel Participants](/docs/flex/developer/conversations/interactions-api/interaction-channel-participants)
* [Channels Subresource](/docs/flex/developer/conversations/interactions-api/channels-subresource)
* [Invites Subresource](/docs/flex/developer/conversations/interactions-api/invites-subresource)

## Example request and response

The following is an example of an agent-initiated interaction.

### Request

Agent-initiated outbound SMS

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
      participants: [
        {
          address: "+12345678910",
          proxy_address: "+192555512345",
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
          customerName: "first last",
          customerAddress: "+15551234567",
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
        "participants": [
            {"address": "+12345678910", "proxy_address": "+192555512345"}
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
                "customerName": "first last",
                "customerAddress": "+15551234567",
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

        var interaction = await InteractionResource.CreateAsync(
            channel: new Dictionary<
                string,
                Object>() { { "type", "sms" }, { "initiated_by", "agent" }, { "participants", new List<Object> { new Dictionary<string, Object>() { { "address", "+12345678910" }, { "proxy_address", "+192555512345" } } } } },
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
                            { "customerName", "first last" }, { "customerAddress", "+15551234567" }
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
                                              put("participants", Arrays.asList(new HashMap<String, Object>() {
                                                  {
                                                      put("address", "+12345678910");
                                                      put("proxy_address", "+192555512345");
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
                                                              put("customerName", "first last");
                                                              put("customerAddress", "+15551234567");
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
		"participants": []interface{}{
			map[string]interface{}{
				"address":       "+12345678910",
				"proxy_address": "+192555512345",
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
				"customerName":    "first last",
				"customerAddress": "+15551234567",
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
        "participants" => [
            [
                "address" => "+12345678910",
                "proxy_address" => "+192555512345",
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
                    "customerName" => "first last",
                    "customerAddress" => "+15551234567",
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
                  'participants' => [
                    {
                      'address' => '+12345678910',
                      'proxy_address' => '+192555512345'
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
                      'customerName' => 'first last',
                      'customerAddress' => '+15551234567'
                    }
                  }
                }
              )

puts interaction.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:flex:v1:interactions:create \
   --channel "{\"type\":\"sms\",\"initiated_by\":\"agent\",\"participants\":[{\"address\":\"+12345678910\",\"proxy_address\":\"+192555512345\"}]}" \
   --routing "{\"properties\":{\"workspace_sid\":\"WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\",\"workflow_sid\":\"WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\",\"queue_sid\":\"WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\",\"worker_sid\":\"WKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\",\"task_channel_unique_name\":\"sms\",\"attributes\":{\"customerName\":\"first last\",\"customerAddress\":\"+15551234567\"}}}"
```

```bash
CHANNEL_OBJ=$(cat << EOF
{
  "type": "sms",
  "initiated_by": "agent",
  "participants": [
    {
      "address": "+12345678910",
      "proxy_address": "+192555512345"
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
      "customerName": "first last",
      "customerAddress": "+15551234567"
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
    "participants": [
      {
        "address": "+12345678910",
        "proxy_address": "+192555512345"
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
        "customerName": "first last",
        "customerAddress": "+15551234567"
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

### Response

```json
{
   "url": "//https://flex-api.twilio.com//v1/Interactions/KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
   "routing": {
       "reservation": null,
       "properties": {
           "date_updated": 1637013849,
           "task_queue_entered_date": 1637013849,
           "workflow_name": "Assign to Anyone",
           "age_in_queue": 0,
           "task_channel_unique_name": "sms",
           "assignment_status": "pending",
           "queue_name": "Everyone",
           "assignmentCounter": 0,
           "priority": 0,
           "sid": "WTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
           "workflow_sid": "WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
           "routing_target": "WKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
           "reason": null,
           "attributes": "{\"customerAddress\":\"+1234-567-8910\",\"flexChannelInviteSid\":\"KGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\",\"conversationSid\":\"CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\",\"channelType\":\"sms\",\"conversations\":{\"initiated_by\":\"Agent\",\"communication_channel\":\"Sms\",\"media\":[{\"conversation_sid\":\"CHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\"}],\"direction\":\"Outbound\"},\"customerName\":\"silly name\",\"flexInteractionChannelSid\":\"UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\",\"initiatedBy\":\"agent\",\"direction\":\"outbound\"}",
           "task_channel_sid": "TCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
           "age": 0,
           "workspace_sid": "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
           "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
           "timeout": 86400,
           "date_created": 1637013849,
           "addons": "{}",
           "queue_sid": "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
       }
   },
   "channel": {
       "type": "sms",
       "sid": "UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
   },
   "sid": "KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
   "links": {
       "channels": "//https://flex-api.twilio.com/v1/Interactions/KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Channels"
   }
}
```

## Task attributes

The following is a list of common attributes that are consumed by the [Flex UI](/docs/flex/developer/ui/migration-guide) and/or [Flex Insights](/docs/flex/end-user-guide/insights).

| Attribute                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Example                                                                                                                             |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `customerName`              | For Insights, this attribute is used to populate **conversations.customers.name**.<br /><br />In the Flex UI, this attribute is rendered as the main customer's name for an email task.                                                                                                                                                                                                                                                                                                                                                                               | `First Last`                                                                                                                        |
| `customerAddress`           | For Insights, this attribute is used to populate **conversations.customers.email** or **conversations.customers.phone**.<br /><br />In the Flex UI, this attribute is rendered as the main customer's **email** address for an email task.                                                                                                                                                                                                                                                                                                                            | +12345678910 or <br /><br />[example@example.com](mailto:alfresco@example.com)                                                      |
| `from`                      | This is the Flex UI's preferred attribute for identifying the customer on non-email tasks. For email tasks, it uses `customerName`.                                                                                                                                                                                                                                                                                                                                                                                                                                   | First Last, +1234567890                                                                                                             |
| `subject`                   | In the Flex UI, this is the initial subject of an email thread task.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Issue with shoes                                                                                                                    |
| `flexInteractionChannelSid` | Used in the Flex UI to identify whether a task is interaction-based or not and therefore whether there is a need for Flex UI orchestration or not.                                                                                                                                                                                                                                                                                                                                                                                                                    | UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX                                                                                                  |
| `flexInteractionSid`        | The interaction SID.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX                                                                                                  |
| `flexChannelInviteSid`      | The invite SID.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | KGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX                                                                                                  |
| `followed_by`               | Used for external warm transfers.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |                                                                                                                                     |
| `outcome`                   | Used for external warm transfers.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |                                                                                                                                     |
| `customers`                 | This object is automatically added if `customerAddress` and `customerName` are provided.<br /><br />This object contains the name, phone, and email of a single customer.<br /><br />**name** \[required]: The display name of the customer. If name is not available, it must be set to null<br /><br />phone \[required]: The phone number or WhatsApp number of the customer. If number is not available, it should be set to null<br /><br />**email** \[required]: The email address of the customer. If no email address is available, it should be set to null | "customers": \{<br /><br />   "name": "Al Fresco", <br /><br />   "Phone": "+12345678910",<br /><br />   "email": null<br /><br />} |

The following attributes are added when the channel is created (asynchronously):

| Attribute                                                                                                                                                                                        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Example                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- |
| `conversations.external_contact`<br /><br />(This is the [Conversation projected address](/docs/conversations-classic/api/conversation-participant-resource#add-a-conversation-participant-sms)) | For Insights, this is the contact address the customer used to reach you or the contact address from which you have reached them. This may be an inbound support phone number, your support email, or a phone number that appears on the customer's phone when you call them.<br /><br />The contact information (email or phone number) that the customer uses or sees when communicating with the contact center can be used for traffic [segmentation](/docs/flex/end-user-guide/insights/segments). | [help@example.com](mailto:help@example.com) |

## Task attributes mapped from channel attributes

Some interaction request channel attributes are also used to create other task attributes. The following table lists those task attributes that are created from the given channel attributes:

| Interaction Channel attribute  | Task attribute(s)                                                                                                                                                                               | Values                                          |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `type`                         | **conversations.media.type** (Insights)<br /><br />For all conversation media types                                                                                                             | ChatTranscript                                  |
|                                | **conversations.communication\_channel** (Insights)                                                                                                                                             | Email, SMS, Whatsapp, Web, Chat                 |
|                                | **channelType** (FlexUI)<br /><br />The Flex UI uses this to identify tasks that have the same "uniqueTaskChannelName" as chat, but have to be treated differently (for example, email or sms). | email, sms, whatsapp, web, chat, messenger, gbm |
| `initiated_by`                 | **direction** (Flex UI)<br /><br />When **initiated\_by** is set to **agent**, this value is outbound, otherwise it's inbound.                                                                  | customer \| api \| agent                        |
| `properties.media_channel_sid` | **conversations.conversation\_id** (Insights)                                                                                                                                                   | KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX              |
|                                | **conversations.media.sid** (Insights)                                                                                                                                                          |                                                 |
|                                | **conversationSid (Flex UI)**                                                                                                                                                                   |                                                 |

The following table captures the reason for requiring these attributes:

| Flex Insights attributes                                             | How/why is it used?                                                                                                                                                                                                                                                                                                                                     |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `conversations.media.type`                                           | Example of the entire media object with [attached chat transcript](/docs/flex/developer/insights/custom-media-attached-conversations#chat-transcript-media-link).                                                                                                                                                                                       |
| `conversations.initiated_by`                                         | Flex Insights: Used to identify how the conversation was initiated. This helps to identify funnels leading towards a conversation.                                                                                                                                                                                                                      |
| `conversations.external_contact`                                     | Flex Insights: The contact address the customer used to reach you or the contact address from which you have reached them. This may be an inbound support phone number, your support email, or a phone number that appears on the customer's phone when you call them.<br /><br />Useful for segmenting traffic by contact information (email or phone) |
| `conversations.conversation_id`<br /><br />`conversations.media.sid` | The ID of the conversation used for Historical insights. The Media SID is used to get access to the transcripts.                                                                                                                                                                                                                                        |

## Errors

Some common errors you may encounter include [Error 20003](/docs/api/errors/20003) and [Error 11200](/docs/api/errors/11200). See the [Twilio Error and Warning Dictionary](/docs/api/errors) for a list of potential errors.
