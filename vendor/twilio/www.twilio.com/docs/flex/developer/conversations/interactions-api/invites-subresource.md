# Invites Subresource

> \[!NOTE]
>
> Flex Conversations requires Flex UI 2.0.x. If you are on Flex UI 1.x.x, refer to the [Messaging in Flex](/docs/flex/developer/messaging) pages.

The **Interaction Channel Invite** subresource allows you to add an agent as a new participant to an existing interaction channel.

```bash
/Interactions/<interaction_sid>/Channels/<channel_sid>/Invites

```

Use this endpoint to:

* add an agent to an ongoing interaction,
* to find an agent that should be added by [evaluating a TaskRouter workflow](/docs/taskrouter/workflow-configuration), or
* to send an interaction to a [queue](/docs/flex/admin-guide/core-concepts/routing#task-queues).

The invite creates a new task for the existing interaction which will result in reservations offered to the agent(s). Note the example JSON response on this page is not representative of the actual API response. See [example response](/docs/flex/developer/conversations/park-an-interaction#example-response) on "Park an Interaction".

> \[!WARNING]
>
> Remember to handle certain terminal TaskRouter events according to your application's needs, as conversations may stay orphaned with an `open` state.
>
> See [Conversations Best Practices](/docs/flex/developer/conversations/best-practices) for details.

## Interaction Channel Invite properties

| **Parameter**       | **Sub-field**          | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Routing \[required] |                        | A JSON Object representing the routing rules for the Interaction Channel. See [Outbound SMS Example](/docs/flex/developer/conversations/interactions-api/interactions) for an example Routing object. The Interactions resource uses TaskRouter for all routing functionality.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
|                     | properties \[required] | Fields needed to create a task:<br /><br />**workspace\_sid** \[required] The TaskRouter Workspace SID which starts with WS.<br /><br />**workflow\_sid** \[optional] The Workflow SID prefixed by WW. Optional if there's only one workflow defined otherwise it's mandatory<br /><br />**queue\_sid** \[required for agent-initiated], the Task router Queue SID prefixed by WQ.<br /><br />**worker\_sid** \[required for agent-initiated]<br /><br />**task\_channel\_sid** \[optional]<br /><br />**task\_channel\_unique\_name** \[optional]<br /><br />**attributes** \[optional] : The task attributes. <br /><br />**priority** \[optional]: The priority of the task in the queue.<br /><br />**timeout** \[optional]: The task/reservation timeout interval in seconds.<br /><br />All attributes in the Routing object on your Interaction request body are added "as is" to the task. For a list of known attributes consumed by the Flex UI and/or Flex Insights, see Known Task Attributes. |

<OperationTable type="properties" data={{"type":"object","refName":"flex.v1.interaction.interaction_channel.interaction_channel_invite","modelName":"flex_v1_interaction_interaction_channel_interaction_channel_invite","properties":{"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KG[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string created by Twilio to identify an Interaction Channel Invite resource."},"interaction_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KD[0-9a-fA-F]{32}$","nullable":true,"description":"The Interaction SID for this Channel."},"channel_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^UO[0-9a-fA-F]{32}$","nullable":true,"description":"The Channel SID for this Invite."},"routing":{"nullable":true,"description":"A JSON object representing the routing rules for the Interaction Channel. See [Outbound SMS Example](https://www.twilio.com/docs/flex/developer/conversations/interactions-api/interactions#agent-initiated-outbound-interactions) for an example Routing object. The Interactions resource uses TaskRouter for all routing functionality. \n All attributes in the Routing object on your Interaction request body are added “as is” to the task. For a list of known attributes consumed by the Flex UI and/or Flex Insights, see [Known Task Attributes](https://www.twilio.com/docs/flex/developer/conversations/interactions-api#task-attributes)."},"url":{"type":"string","format":"uri","nullable":true}}}} />

## Create an Interaction Channel Invite

`POST https://flex-api.twilio.com/v1/Interactions/{InteractionSid}/Channels/{ChannelSid}/Invites`

### Path parameters

```json
[{"name":"InteractionSid","in":"path","description":"The Interaction SID for this Channel.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KD[0-9a-fA-F]{32}$"},"required":true},{"name":"ChannelSid","in":"path","description":"The Channel SID for this Invite.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^UO[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"CreateInteractionChannelInviteRequest","required":["Routing"],"properties":{"Routing":{"description":"The Interaction's routing logic."}}},"examples":{"create":{"value":{"lang":"json","value":"{\n  \"Routing\": \"{\\\"properties\\\":{\\\"workspace_sid\\\":\\\"WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\\\",\\\"workflow_sid\\\":\\\"WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\\\",\\\"worker_sid\\\":\\\"WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\\\",\\\"queue_sid\\\":\\\"WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\\\",\\\"attributes\\\":{\\\"customerName\\\":\\\"customer name\\\",\\\"customerAddress\\\":\\\"customer email address\\\"}}}\"\n}","meta":"","code":"{\n  \"Routing\": \"{\\\"properties\\\":{\\\"workspace_sid\\\":\\\"WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\\\",\\\"workflow_sid\\\":\\\"WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\\\",\\\"worker_sid\\\":\\\"WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\\\",\\\"queue_sid\\\":\\\"WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\\\",\\\"attributes\\\":{\\\"customerName\\\":\\\"customer name\\\",\\\"customerAddress\\\":\\\"customer email address\\\"}}}\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Routing\"","#7EE787"],[":","#C9D1D9"]," ",["\"{","#A5D6FF"],["\\\"","#79C0FF"],["properties","#A5D6FF"],["\\\"","#79C0FF"],[":{","#A5D6FF"],["\\\"","#79C0FF"],["workspace_sid","#A5D6FF"],["\\\"","#79C0FF"],[":","#A5D6FF"],["\\\"","#79C0FF"],["WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","#A5D6FF"],["\\\"","#79C0FF"],[",","#A5D6FF"],["\\\"","#79C0FF"],["workflow_sid","#A5D6FF"],["\\\"","#79C0FF"],[":","#A5D6FF"],["\\\"","#79C0FF"],["WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","#A5D6FF"],["\\\"","#79C0FF"],[",","#A5D6FF"],["\\\"","#79C0FF"],["worker_sid","#A5D6FF"],["\\\"","#79C0FF"],[":","#A5D6FF"],["\\\"","#79C0FF"],["WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","#A5D6FF"],["\\\"","#79C0FF"],[",","#A5D6FF"],["\\\"","#79C0FF"],["queue_sid","#A5D6FF"],["\\\"","#79C0FF"],[":","#A5D6FF"],["\\\"","#79C0FF"],["WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","#A5D6FF"],["\\\"","#79C0FF"],[",","#A5D6FF"],["\\\"","#79C0FF"],["attributes","#A5D6FF"],["\\\"","#79C0FF"],[":{","#A5D6FF"],["\\\"","#79C0FF"],["customerName","#A5D6FF"],["\\\"","#79C0FF"],[":","#A5D6FF"],["\\\"","#79C0FF"],["customer name","#A5D6FF"],["\\\"","#79C0FF"],[",","#A5D6FF"],["\\\"","#79C0FF"],["customerAddress","#A5D6FF"],["\\\"","#79C0FF"],[":","#A5D6FF"],["\\\"","#79C0FF"],["customer email address","#A5D6FF"],["\\\"","#79C0FF"],["}}}\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Invite an Agent

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createInteractionChannelInvite() {
  const invite = await client.flexApi.v1
    .interaction("KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .channels("UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .invites.create({
      routing: {
        properties: {
          workspace_sid: "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
          workflow_sid: "WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        },
      },
    });

  console.log(invite.sid);
}

createInteractionChannelInvite();
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

invite = (
    client.flex_api.v1.interaction("KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .channels("UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .invites.create(
        routing={
            "properties": {
                "workspace_sid": "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                "workflow_sid": "WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            }
        }
    )
)

print(invite.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.FlexApi.V1.Interaction.InteractionChannel;
using System.Threading.Tasks;
using System.Collections.Generic;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var interactionChannelInvite = await InteractionChannelInviteResource.CreateAsync(
            routing: new Dictionary<
                string,
                Object>() { { "properties", new Dictionary<string, Object>() { { "workspace_sid", "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" }, { "workflow_sid", "WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" } } } },
            pathInteractionSid: "KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            pathChannelSid: "UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(interactionChannelInvite.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.util.HashMap;
import com.twilio.Twilio;
import com.twilio.rest.flexapi.v1.interaction.interactionchannel.InteractionChannelInvite;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        InteractionChannelInvite interactionChannelInvite =
            InteractionChannelInvite
                .creator("KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                    "UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                    new HashMap<String, Object>() {
                        {
                            put("properties", new HashMap<String, Object>() {
                                {
                                    put("workspace_sid", "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
                                    put("workflow_sid", "WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
                                }
                            });
                        }
                    })
                .create();

        System.out.println(interactionChannelInvite.getSid());
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

	params := &flex.CreateInteractionChannelInviteParams{}
	params.SetRouting(map[string]interface{}{
		"properties": map[string]interface{}{
			"workspace_sid": "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
			"workflow_sid":  "WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		},
	})

	resp, err := client.FlexV1.CreateInteractionChannelInvite("KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		"UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

$invite = $twilio->flexApi->v1
    ->interaction("KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->channels("UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->invites->create(
        [
            "properties" => [
                "workspace_sid" => "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                "workflow_sid" => "WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            ],
        ] // Routing
    );

print $invite->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

invite = @client
         .flex_api
         .v1
         .interaction('KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
         .channels('UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
         .invites
         .create(
           routing: {
             'properties' => {
               'workspace_sid' => 'WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
               'workflow_sid' => 'WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
             }
           }
         )

puts invite.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:flex:v1:interactions:channels:invites:create \
   --interaction-sid KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --channel-sid UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --routing "{\"properties\":{\"workspace_sid\":\"WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\",\"workflow_sid\":\"WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\"}}"
```

```bash
ROUTING_OBJ=$(cat << EOF
{
  "properties": {
    "workspace_sid": "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "workflow_sid": "WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
  }
}
EOF
)
curl -X POST "https://flex-api.twilio.com/v1/Interactions/KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Channels/UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Invites" \
--data-urlencode "Routing=$ROUTING_OBJ" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "KGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "channel_sid": "UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "interaction_sid": "KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "routing": {
    "properties": {
      "workspace_sid": "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "workflow_sid": "WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    }
  },
  "url": "https://flex-api.twilio.com/v1/Interactions/KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels/UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Invites/KGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```
