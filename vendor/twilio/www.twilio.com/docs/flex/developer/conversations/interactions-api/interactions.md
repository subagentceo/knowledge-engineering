# Interactions resource

> \[!NOTE]
>
> Flex Conversations requires Flex UI 2.0.x. If you are on Flex UI 1.x.x, refer to the [Messaging in Flex](/docs/flex/developer/messaging) pages.

## Interactions resource

The Interactions resource lets you create inbound and outbound interactions for different channel types. To create an interaction, you must supply Channel and Routing attributes. The Channel attributes are used to either create or to bind to an underlying media channel such as a [conversation](/docs/conversations-classic/api/conversation-resource#create-a-conversation-resource). The Routing attributes are used to [create a task](/docs/flex/developer/conversations/interactions-api#task-attributes) which is then routed according to your specified workspace and workflow. A successful interaction results in a task reservation being offered to an agent which references the associated media channel.

> \[!NOTE]
>
> Creating an interaction is an asynchronous request for which a `200` response only indicates that the server has accepted the request. You need to use the getter methods to check if the interaction channel was set up successfully. Additionally, the example JSON responses on this page are not representative of the actual API response. See [example response](/docs/flex/developer/conversations/interactions-api#response) on the API overview page.

In this release, an interaction supports a single channel. Refer to the [Invites subresource](/docs/flex/developer/conversations/interactions-api/invites-subresource) to see how you can create multiple tasks for the same interaction channel to include multiple agents.

```bash
POST /Interactions
```

> \[!WARNING]
>
> Remember to handle certain terminal TaskRouter events according to your application's needs, as conversations may stay orphaned with an `open` state.
>
> See [Conversations Best Practices](/docs/flex/developer/conversations/best-practices) for details.

## Interaction Properties

<OperationTable type="properties" data={{"type":"object","refName":"flex.v1.interaction","modelName":"flex_v1_interaction","properties":{"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KD[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string created by Twilio to identify an Interaction resource, prefixed with KD."},"channel":{"nullable":true,"description":"A JSON object that defines the Interaction’s communication channel and includes details about the channel. See the [Outbound SMS](https://www.twilio.com/docs/flex/developer/conversations/interactions-api/interactions#agent-initiated-outbound-interactions) and [inbound (API-initiated)](https://www.twilio.com/docs/flex/developer/conversations/interactions-api/interactions#api-initiated-contact) Channel object examples."},"routing":{"nullable":true,"description":"A JSON Object representing the routing rules for the Interaction Channel. See [Outbound SMS Example](https://www.twilio.com/docs/flex/developer/conversations/interactions-api/interactions#agent-initiated-outbound-interactions) for an example Routing object. The Interactions resource uses TaskRouter for all routing functionality. \n All attributes in the Routing object on your Interaction request body are added “as is” to the task. For a list of known attributes consumed by the Flex UI and/or Flex Insights, see [Known Task Attributes](https://www.twilio.com/docs/flex/developer/conversations/interactions-api#task-attributes)."},"url":{"type":"string","format":"uri","nullable":true},"links":{"type":"object","format":"uri-map","nullable":true},"interaction_context_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^HQ[0-9a-fA-F]{32}$","nullable":true},"webhook_ttid":{"type":"string","nullable":true}}}} />

## Request parameters

| **Parameter**       | **Sub-fields**                | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Channel \[required] |                               | A JSON object that defines the interaction's communication channel and includes details about the channel. See the Outbound Email, Outbound SMS, and inbound (customer-initiated) Channel object examples.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
|                     | sid \[optional]               | The SID of the Interaction Channel if already generated. This is a unique identifier for the channel.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
|                     | type \[required]              | The media channel type.<br /><br />Allowed values: `sms`, `whatsapp`, `web`, `chat`, `email`, `messenger`, and `gbm`<br /><br />Note: These can be different from the task channel type specified in the Routing attributes. Task channel type corresponds to channel capacity while this channel type is the actual media type.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
|                     | initiated\_by \[required]     | The actor that created this Interaction. <br /><br />Allowed values: `customer`, `agent`, or `api`<br /><br />**customer**: Indicates that this interaction was initiated by a customer and will always trigger an inbound task. The `media_channel_sid`*,* defined in the properties object, is required and the customer participant must already be in that given `media_channel_sid`.<br /><br />**agent**: initiated by an agent's click. Will always trigger an outbound Task for the same agent. This will also create a new Conversation and add the agent to that Conversation.<br /><br />**api**: Triggered or initiated by a secondary type of interaction e.g. webform, automation, etc. This will create an inbound Task. If a `media_channel_sid` is not given, a new one will be created and the given *participants* in the participants object will be added.                                                                                                                                                                                                                                                                                                                                                                    |
|                     | properties \[optional]        | The media channel properties. It is optional if `sid` is passed. In this release only Twilio Conversations is supported as a media channel.<br /><br />Depending on the value used in `initiated_by` and `Channel type`, there are required values in some cases as follows:<br /><br />**media\_channel\_sid** is required for all channels, when `initiated_by` is set to the value customer. Note, this must be set to a Twilio Conversation SID which is prefixed by CH. See the SID property on the [Conversation Resource](/docs/conversations-classic/api/conversation-resource#conversation-properties).<br /><br />For email channel with `initiated_by` set to agent or api, the following are required:<br /><br />**from**: email address of contact center team (e.g. [support@example.com](mailto:support@example.com)). This is set as the `projected_address` parameter on the [Conversation Participant resource](/docs/conversations-classic/api/conversation-participant-resource).<br /><br />**from\_name**: name of contact center team (e.g. Twilio Support).                                                                                                                                                               |
|                     | participants \[ ] \[optional] | An array of participants. Required for outbound interactions where initiated\_by is set to agent. Otherwise, it's optional. The specified participants will be added to the media channel and to the interaction channel.<br /><br />The attributes required to specify the participant address depends on the type of address, as follows:<br /><br />**SMS & Whatsapp**:<br /><br />**proxy\_address**: This is the business number which must be a Twilio-verified number e.g +192555512345, whatsapp:+19251235555<br /><br />**address**: Actual phone number of the customer<br /><br />**Chat & Web**:<br /><br />**identity**: The chat identity of the user in Twilio conversations. *We recommend following the standard URI specification and avoid the following reserved characters ! \* ' ( ) ; : @ & = + $ , / ? % # \[ ] for values such as identity and friendly name.*<br /><br />**Email: level:** the recipient field. Could be to, cc, or bcc<br /><br />**name:** customer display name in your Flex application<br /><br />**address:** customer email address<br /><br />For more information, refer to the [Twilio Conversations Participant resource](/docs/conversations-classic/api/conversation-participant-resource). |
| Routing \[optional] |                               | A JSON Object representing the routing rules for the Interaction Channel. See [Outbound SMS Example](#agent-initiated-outbound-interactions) for an example Routing object. The Interactions resource uses TaskRouter for all routing functionality. Routing is optional if `sid` is provided in `Channel` object, else **Routing is required**.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
|                     | properties \[required]        | Fields needed to create a task:<br /><br />**workspace\_sid** \[required] The TaskRouter Workspace SID which starts with WS.<br /><br />**workflow\_sid** \[optional] The Workflow SID prefixed by WW. Optional if there's only one workflow defined otherwise it's mandatory<br /><br />**queue\_sid** \[required for agent-initiated], the Task router Queue SID prefixed by WQ.<br /><br />**worker\_sid** \[required for agent-initiated]<br /><br />**task\_channel\_sid** \[optional]<br /><br />**task\_channel\_unique\_name** \[optional]<br /><br />**attributes** \[optional] : The task attributes. <br /><br />**priority** \[optional]: The priority of the task in the queue.<br /><br />**timeout** \[optional]: The task/reservation timeout interval in seconds.<br /><br />All attributes in the Routing object on your Interaction request body are added "as is" to the task. For a list of known attributes consumed by the Flex UI and/or Flex Insights, see Known Task Attributes.                                                                                                                                                                                                                                         |

## Create an Interaction resource

`POST https://flex-api.twilio.com/v1/Interactions`

### Request body parameters

```json
{"schema":{"type":"object","title":"CreateInteractionRequest","required":["Channel"],"properties":{"Channel":{"description":"The Interaction's channel."},"Routing":{"description":"The Interaction's routing logic."},"InteractionContextSid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^HQ[0-9a-fA-F]{32}$","description":"The Interaction context sid is used for adding a context lookup sid"},"WebhookTtid":{"type":"string","description":"The unique identifier for Interaction level webhook"}}},"examples":{"create":{"value":{"lang":"json","value":"{\n  \"Channel\": \"{\\\"type\\\":\\\"sms\\\",\\\"initiated_by\\\":\\\"customer\\\"}\",\n  \"Routing\": \"{}\",\n  \"InteractionContextSid\": \"interaction_context_sid\",\n  \"WebhookTtid\": \"flex_interactionwebhook_00000000000000000000000000\"\n}","meta":"","code":"{\n  \"Channel\": \"{\\\"type\\\":\\\"sms\\\",\\\"initiated_by\\\":\\\"customer\\\"}\",\n  \"Routing\": \"{}\",\n  \"InteractionContextSid\": \"interaction_context_sid\",\n  \"WebhookTtid\": \"flex_interactionwebhook_00000000000000000000000000\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Channel\"","#7EE787"],[":","#C9D1D9"]," ",["\"{","#A5D6FF"],["\\\"","#79C0FF"],["type","#A5D6FF"],["\\\"","#79C0FF"],[":","#A5D6FF"],["\\\"","#79C0FF"],["sms","#A5D6FF"],["\\\"","#79C0FF"],[",","#A5D6FF"],["\\\"","#79C0FF"],["initiated_by","#A5D6FF"],["\\\"","#79C0FF"],[":","#A5D6FF"],["\\\"","#79C0FF"],["customer","#A5D6FF"],["\\\"","#79C0FF"],["}\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Routing\"","#7EE787"],[":","#C9D1D9"]," ",["\"{}\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"InteractionContextSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"interaction_context_sid\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"WebhookTtid\"","#7EE787"],[":","#C9D1D9"]," ",["\"flex_interactionwebhook_00000000000000000000000000\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

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
    channel: {},
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

interaction = client.flex_api.v1.interaction.create(channel={})

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
            channel: new Dictionary<string, Object>() {

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
	params.SetChannel(map[string]interface{}{})

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
    (object) [] // Channel
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
              .create(channel: {

                })

puts interaction.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:flex:v1:interactions:create \
   --channel "{}"
```

```bash
CHANNEL_OBJ=$(cat << EOF
{

}
EOF
)
curl -X POST "https://flex-api.twilio.com/v1/Interactions" \
--data-urlencode "Channel=$CHANNEL_OBJ" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "channel": {},
  "routing": {
    "reservation": null,
    "properties": {
      "date_updated": 1634845217,
      "task_queue_entered_date": 1634845217,
      "workflow_name": "Default Fifo Workflow",
      "age_in_queue": 0,
      "task_channel_unique_name": "default",
      "assignment_status": "pending",
      "queue_name": "Sample Queue",
      "assignmentCounter": 0,
      "priority": 0,
      "sid": "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "workflow_sid": "WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "routing_target": "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "reason": "",
      "attributes": "{\"customerAddress\":\"customer phone address\",\"flexChannelInviteSid\":\"KGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\"conversationSid\":\"CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\"channelType\":\"sms\",\"customers\":{\"phone\":\"customer phone address\",\"name\":\"customer name\"},\"conversations\":{\"initiated_by\":\"customer\",\"conversation_id\":\"KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\"media\":[{\"type\":\"ChatTranscript\",\"sid\":\"CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"}]},\"customerName\":\"customer name\",\"flexInteractionChannelSid\":\"UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\"initiatedBy\":\"customer\",\"flexInteractionSid\":\"KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\"direction\":\"inbound\"}",
      "task_channel_sid": "TCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "age": 0,
      "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "timeout": 86400,
      "date_created": 1634845217,
      "addons": "{}",
      "queue_sid": "WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
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

## Customer-initiated SMS contact

> \[!NOTE]
>
> For customer-initiated contacts, you must have an existing Conversation SID for the required `media_channel_sid`.

In this example, we have configured the SMS address in the Console with a `webhook` integration. As a result, our endpoint will be called when a new conversation is created and a new message (SMS) is added. At this time, we would create the Interaction and the Channel and have it routed to an agent. The diagram illustrates the flow.

![SMS contact flow from customer to agent via app and webhook interactions.](https://docs-resources.prod.twilio.com/8b384ec3795927bf2067d865182f88f1d8b53f6fe68816d70788cbd21599daf2.png)

Customer-initiated SMS contact

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
    channel={"type": "sms", "initiated_by": "customer"}
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
            channel: new Dictionary<string, Object>() {
                { "type", "sms" }, { "initiated_by", "customer" }
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
    ] // Channel
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
                  'initiated_by' => 'customer'
                }
              )

puts interaction.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:flex:v1:interactions:create \
   --channel "{\"type\":\"sms\",\"initiated_by\":\"customer\"}"
```

```bash
CHANNEL_OBJ=$(cat << EOF
{
  "type": "sms",
  "initiated_by": "customer"
}
EOF
)
curl -X POST "https://flex-api.twilio.com/v1/Interactions" \
--data-urlencode "Channel=$CHANNEL_OBJ" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "channel": {
    "type": "sms",
    "initiated_by": "customer"
  },
  "routing": {
    "reservation": null,
    "properties": {
      "date_updated": 1634845217,
      "task_queue_entered_date": 1634845217,
      "workflow_name": "Default Fifo Workflow",
      "age_in_queue": 0,
      "task_channel_unique_name": "default",
      "assignment_status": "pending",
      "queue_name": "Sample Queue",
      "assignmentCounter": 0,
      "priority": 0,
      "sid": "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "workflow_sid": "WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "routing_target": "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "reason": "",
      "attributes": "{\"customerAddress\":\"customer phone address\",\"flexChannelInviteSid\":\"KGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\"conversationSid\":\"CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\"channelType\":\"sms\",\"customers\":{\"phone\":\"customer phone address\",\"name\":\"customer name\"},\"conversations\":{\"initiated_by\":\"customer\",\"conversation_id\":\"KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\"media\":[{\"type\":\"ChatTranscript\",\"sid\":\"CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"}]},\"customerName\":\"customer name\",\"flexInteractionChannelSid\":\"UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\"initiatedBy\":\"customer\",\"flexInteractionSid\":\"KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\"direction\":\"inbound\"}",
      "task_channel_sid": "TCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "age": 0,
      "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "timeout": 86400,
      "date_created": 1634845217,
      "addons": "{}",
      "queue_sid": "WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
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

## Agent-initiated outbound Interactions

This example shows how to create an outbound Flex interaction from your backend application. Use the **/Interactions** endpoint to implement additional opportunities for agents to send an outbound SMS, WhatsApp, Chat, Email (private beta), and Facebook Messenger (public beta).

Some practical examples include a "click-to-sms" or "click-to-email" functionality in your CRM integration.

![Outbound agent-initiated interaction with steps from app to Flex and customer communication.](https://docs-resources.prod.twilio.com/588e5cde440167e8cc66efbfd4d0354c03858da8680dfa66444a7fa4ea51ecca.png)

The API response will contain a newly created task SID, which you can use to update the task attributes, retrieve the conversation SID, or do some additional programming as needed. The agent initiating the interaction must be available in the Flex application to start the conversation in the Flex UI.

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
      participants: [
        {
          address: "+13115552368",
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
          customerName: "silly name",
          customerAddress: "+13115552368",
        },
      },
    },
  });

  console.log(interaction.routing);
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
            {"address": "+13115552368", "proxy_address": "+192555512345"}
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
                "customerAddress": "+13115552368",
            },
        }
    },
)

print(interaction.routing)
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
                Object>() { { "type", "sms" }, { "initiated_by", "agent" }, { "participants", new List<Object> { new Dictionary<string, Object>() { { "address", "+13115552368" }, { "proxy_address", "+192555512345" } } } } },
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
                            { "customerName", "silly name" }, { "customerAddress", "+13115552368" }
                        } }
                  } }
            });

        Console.WriteLine(interaction.Routing);
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
                                                      put("address", "+13115552368");
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
                                                              put("customerName", "silly name");
                                                              put("customerAddress", "+13115552368");
                                                          }
                                                      });
                                                  }
                                              });
                                          }
                                      })
                                      .create();

        System.out.println(interaction.getRouting());
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
				"address":       "+13115552368",
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
				"customerName":    "silly name",
				"customerAddress": "+13115552368",
			},
		},
	})

	resp, err := client.FlexV1.CreateInteraction(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Routing != nil {
			fmt.Println(*resp.Routing)
		} else {
			fmt.Println(resp.Routing)
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
                "address" => "+13115552368",
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
                    "customerName" => "silly name",
                    "customerAddress" => "+13115552368",
                ],
            ],
        ],
    ]
);

print $interaction->routing;
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
                      'address' => '+13115552368',
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
                      'customerName' => 'silly name',
                      'customerAddress' => '+13115552368'
                    }
                  }
                }
              )

puts interaction.routing
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:flex:v1:interactions:create \
   --channel "{\"type\":\"sms\",\"initiated_by\":\"agent\",\"participants\":[{\"address\":\"+13115552368\",\"proxy_address\":\"+192555512345\"}]}" \
   --routing "{\"properties\":{\"workspace_sid\":\"WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\",\"workflow_sid\":\"WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\",\"queue_sid\":\"WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\",\"worker_sid\":\"WKXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\",\"task_channel_unique_name\":\"sms\",\"attributes\":{\"customerName\":\"silly name\",\"customerAddress\":\"+13115552368\"}}}"
```

```bash
CHANNEL_OBJ=$(cat << EOF
{
  "type": "sms",
  "initiated_by": "agent",
  "participants": [
    {
      "address": "+13115552368",
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
      "customerName": "silly name",
      "customerAddress": "+13115552368"
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
        "address": "+13115552368",
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
        "customerName": "silly name",
        "customerAddress": "+13115552368"
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

## API-initiated contact

You can use the API to prompt an agent through a workflow to message your customer.

These tasks can be prompted by a customer requesting assistance (for example, an "ask for help" form) or through automation (for example, analysis of reviews). Accordingly, you must indicate that the interaction was ***initiated by the API***. An example flow can go like this:

![Diagram showing customer form submission to agent email interaction via web server and task router.](https://docs-resources.prod.twilio.com/d25f956f9fba62f839cec9bcf3fbb05a297c40c227d08f8eccfe933982e5f327.png)

1. Your customer fills out a web form on your site or application.
2. Your application logic creates an interaction. The content from the form is used to populate the task attributes, and the Interactions resource creates an inbound task.
3. The Interactions endpoint will take care of creating the conversation and adding the participant
4. An agent is assigned the task, accepts the reservation, and writes to the customer to solve their issue.

In the diagram above, step 2 might look something like this:

API-initiated contact

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
      initiated_by: "api",
      participants: [
        {
          address: "+13115552368",
          proxy_address: "+192555512345",
        },
      ],
    },
    routing: {
      properties: {
        workspace_sid: "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        workflow_sid: "WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        task_channel_unique_name: "sms",
        attributes: {
          from: "testname",
          customerName: "testcustomer",
          customerAddress: "+13115552368",
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
        "initiated_by": "api",
        "participants": [
            {"address": "+13115552368", "proxy_address": "+192555512345"}
        ],
    },
    routing={
        "properties": {
            "workspace_sid": "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "workflow_sid": "WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            "task_channel_unique_name": "sms",
            "attributes": {
                "from": "testname",
                "customerName": "testcustomer",
                "customerAddress": "+13115552368",
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
                Object>() { { "type", "sms" }, { "initiated_by", "api" }, { "participants", new List<Object> { new Dictionary<string, Object>() { { "address", "+13115552368" }, { "proxy_address", "+192555512345" } } } } },
            routing: new Dictionary<string, Object>() {
                { "properties",
                  new Dictionary<string, Object>() {
                      { "workspace_sid", "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" },
                      { "workflow_sid", "WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" },
                      { "task_channel_unique_name", "sms" },
                      { "attributes",
                        new Dictionary<string, Object>() {
                            { "from", "testname" },
                            { "customerName", "testcustomer" },
                            { "customerAddress", "+13115552368" }
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
                                              put("initiated_by", "api");
                                              put("participants", Arrays.asList(new HashMap<String, Object>() {
                                                  {
                                                      put("address", "+13115552368");
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
                                                      put("task_channel_unique_name", "sms");
                                                      put("attributes", new HashMap<String, Object>() {
                                                          {
                                                              put("from", "testname");
                                                              put("customerName", "testcustomer");
                                                              put("customerAddress", "+13115552368");
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
		"initiated_by": "api",
		"participants": []interface{}{
			map[string]interface{}{
				"address":       "+13115552368",
				"proxy_address": "+192555512345",
			},
		},
	})
	params.SetRouting(map[string]interface{}{
		"properties": map[string]interface{}{
			"workspace_sid":            "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
			"workflow_sid":             "WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
			"task_channel_unique_name": "sms",
			"attributes": map[string]interface{}{
				"from":            "testname",
				"customerName":    "testcustomer",
				"customerAddress": "+13115552368",
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
        "initiated_by" => "api",
        "participants" => [
            [
                "address" => "+13115552368",
                "proxy_address" => "+192555512345",
            ],
        ],
    ], // Channel
    [
        "routing" => [
            "properties" => [
                "workspace_sid" => "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                "workflow_sid" => "WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                "task_channel_unique_name" => "sms",
                "attributes" => [
                    "from" => "testname",
                    "customerName" => "testcustomer",
                    "customerAddress" => "+13115552368",
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
                  'initiated_by' => 'api',
                  'participants' => [
                    {
                      'address' => '+13115552368',
                      'proxy_address' => '+192555512345'
                    }
                  ]
                },
                routing: {
                  'properties' => {
                    'workspace_sid' => 'WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                    'workflow_sid' => 'WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                    'task_channel_unique_name' => 'sms',
                    'attributes' => {
                      'from' => 'testname',
                      'customerName' => 'testcustomer',
                      'customerAddress' => '+13115552368'
                    }
                  }
                }
              )

puts interaction.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:flex:v1:interactions:create \
   --channel "{\"type\":\"sms\",\"initiated_by\":\"api\",\"participants\":[{\"address\":\"+13115552368\",\"proxy_address\":\"+192555512345\"}]}" \
   --routing "{\"properties\":{\"workspace_sid\":\"WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\",\"workflow_sid\":\"WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\",\"task_channel_unique_name\":\"sms\",\"attributes\":{\"from\":\"testname\",\"customerName\":\"testcustomer\",\"customerAddress\":\"+13115552368\"}}}"
```

```bash
CHANNEL_OBJ=$(cat << EOF
{
  "type": "sms",
  "initiated_by": "api",
  "participants": [
    {
      "address": "+13115552368",
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
    "task_channel_unique_name": "sms",
    "attributes": {
      "from": "testname",
      "customerName": "testcustomer",
      "customerAddress": "+13115552368"
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
    "initiated_by": "api",
    "participants": [
      {
        "address": "+13115552368",
        "proxy_address": "+192555512345"
      }
    ]
  },
  "routing": {
    "properties": {
      "workspace_sid": "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "workflow_sid": "WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "task_channel_unique_name": "sms",
      "attributes": {
        "from": "testname",
        "customerName": "testcustomer",
        "customerAddress": "+13115552368"
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

## Associate an Interaction with an event webhook

You can associate an Interaction with an event webhook to get notifications when events or state changes that you subscribe to occur for that Interaction. You can then use the notification to trigger a custom process or workflow when a certain event takes place.

To associate an Interaction with an event webhook:

1. Create an Interaction-specific webhook:
   1. Call the `POST /v1/Instances/{instanceSid}/InteractionWebhooks` API with the `Type` parameter set to `interaction`. To see an example of this API call and read more about how it works, go to [Register an Interaction-specific webhook](/docs/flex/developer/conversations/register-interactions-webhooks#register-an-interaction-webhook-for-a-specific-interaction).
   2. Get the `ttid` value from the API response.
2. Associate the webhook to a specific Interaction. You can either create a new Interaction or updating an existing one:
   1. Call the appropriate API:
      * To associate the webhook with a new Interaction, use the `POST v1/Interactions` API. See the [Create the Interaction resource](/docs/flex/developer/conversations/interactions-api/interactions#create-an-interaction-resource) section of this page for more information about this request.
      * To associate the webhook with an existing interaction, use the `POST v1/Interactions/{interactionSid}` API.
   2. In the body of the request, include the `webhook_ttid` parameter, and set it to the `ttid` value from step 1b.

The examples below show how to send the `webhook_ttid` parameter when creating or updating an Interaction.

Create an Interaction associated with an event webhook

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
    channel: {},
    webhookTtid: "flex_interactionwebhook_0000000000000000000",
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
    webhook_ttid="flex_interactionwebhook_0000000000000000000", channel={}
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
            webhookTtid: "flex_interactionwebhook_0000000000000000000",
            channel: new Dictionary<string, Object>() {

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
                                          }
                                      })
                                      .setWebhookTtid("flex_interactionwebhook_0000000000000000000")
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
	params.SetWebhookTtid("flex_interactionwebhook_0000000000000000000")
	params.SetChannel(map[string]interface{}{})

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
    (object) [], // Channel
    ["webhookTtid" => "flex_interactionwebhook_0000000000000000000"]
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
                webhook_ttid: 'flex_interactionwebhook_0000000000000000000',
                channel: {

                }
              )

puts interaction.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:flex:v1:interactions:create \
   --webhook-ttid flex_interactionwebhook_0000000000000000000 \
   --channel "{}"
```

```bash
CHANNEL_OBJ=$(cat << EOF
{

}
EOF
)
curl -X POST "https://flex-api.twilio.com/v1/Interactions" \
--data-urlencode "WebhookTtid=flex_interactionwebhook_0000000000000000000" \
--data-urlencode "Channel=$CHANNEL_OBJ" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "channel": {},
  "routing": {
    "reservation": null,
    "properties": {
      "date_updated": 1634845217,
      "task_queue_entered_date": 1634845217,
      "workflow_name": "Default Fifo Workflow",
      "age_in_queue": 0,
      "task_channel_unique_name": "default",
      "assignment_status": "pending",
      "queue_name": "Sample Queue",
      "assignmentCounter": 0,
      "priority": 0,
      "sid": "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "workflow_sid": "WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "routing_target": "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "reason": "",
      "attributes": "{\"customerAddress\":\"customer phone address\",\"flexChannelInviteSid\":\"KGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\"conversationSid\":\"CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\"channelType\":\"sms\",\"customers\":{\"phone\":\"customer phone address\",\"name\":\"customer name\"},\"conversations\":{\"initiated_by\":\"customer\",\"conversation_id\":\"KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\"media\":[{\"type\":\"ChatTranscript\",\"sid\":\"CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"}]},\"customerName\":\"customer name\",\"flexInteractionChannelSid\":\"UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\"initiatedBy\":\"customer\",\"flexInteractionSid\":\"KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\"direction\":\"inbound\"}",
      "task_channel_sid": "TCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "age": 0,
      "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "timeout": 86400,
      "date_created": 1634845217,
      "addons": "{}",
      "queue_sid": "WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  },
  "interaction_context_sid": null,
  "webhook_ttid": "flex_interactionwebhook_0000000000000000000",
  "url": "https://flex-api.twilio.com/v1/Interactions/KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "channels": "https://flex-api.twilio.com/v1/Interactions/KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels"
  }
}
```

Update an Interaction to associate it with an event webhook

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateInteraction() {
  const interaction = await client.flexApi.v1
    .interaction("KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update({ webhookTtid: "flex_interactionwebhook_0000000000000000000" });

  console.log(interaction.sid);
}

updateInteraction();
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

interaction = client.flex_api.v1.interaction(
    "KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).update(webhook_ttid="flex_interactionwebhook_0000000000000000000")

print(interaction.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.FlexApi.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var interaction = await InteractionResource.UpdateAsync(
            webhookTtid: "flex_interactionwebhook_0000000000000000000",
            pathSid: "KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(interaction.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.flexapi.v1.Interaction;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Interaction interaction = Interaction.updater("KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                                      .setWebhookTtid("flex_interactionwebhook_0000000000000000000")
                                      .update();

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

	params := &flex.UpdateInteractionParams{}
	params.SetWebhookTtid("flex_interactionwebhook_0000000000000000000")

	resp, err := client.FlexV1.UpdateInteraction("KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		params)
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

$interaction = $twilio->flexApi->v1
    ->interaction("KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->update(["webhookTtid" => "flex_interactionwebhook_0000000000000000000"]);

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
              .interaction('KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              .update(webhook_ttid: 'flex_interactionwebhook_0000000000000000000')

puts interaction.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:flex:v1:interactions:update \
   --sid KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --webhook-ttid flex_interactionwebhook_0000000000000000000
```

```bash
curl -X POST "https://flex-api.twilio.com/v1/Interactions/KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
--data-urlencode "WebhookTtid=flex_interactionwebhook_0000000000000000000" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "channel": {
    "type": "sms",
    "sid": "UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  },
  "url": "https://flex-api.twilio.com/v1/Interactions/KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "channels": "https://flex-api.twilio.com/v1/Interactions/KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels"
  },
  "interaction_context_sid": null,
  "routing": null,
  "webhook_ttid": "flex_interactionwebhook_0000000000000000000"
}
```
