# Channels Subresource

> \[!NOTE]
>
> Flex Conversations requires Flex UI 2.0.x. If you are on Flex UI 1.x.x, refer to the [Messaging in Flex](/docs/flex/developer/messaging) pages.

The **Interactions Channels** subresource represents the communication channel associated with the interaction. An interaction channel may have multiple tasks associated with it but can only have one Twilio Conversation associated.

This subresource allows you to update the status of a channel but does not support creating a channel directly. Use the Interactions resource to [create a channel](/docs/flex/developer/conversations/interactions-api/interactions).

When a channel is created through the Interactions resource, a task is created and is immediately routed to Flex using the supplied TaskRouter workspace.

## Channel Properties

<OperationTable type="properties" data={{"type":"object","refName":"flex.v1.interaction.interaction_channel","modelName":"flex_v1_interaction_interaction_channel","properties":{"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^UO[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string created by Twilio to identify an Interaction Channel resource, prefixed with UO."},"interaction_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KD[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string created by Twilio to identify an Interaction resource, prefixed with KD."},"type":{"type":"string","enum":["voice","sms","email","web","whatsapp","chat","messenger","gbm"],"description":"The Interaction Channel's type. Can be: `sms`, `email`, `chat`, `whatsapp`, `web`, `messenger`, or `gbm`. \n **Note:** These can be different from the task channel type specified in the Routing attributes. Task channel type corresponds to channel capacity while this channel type is the actual media type","refName":"interaction_channel_enum_type","modelName":"interaction_channel_enum_type"},"status":{"type":"string","enum":["setup","active","failed","closed","inactive","pause","transfer"],"description":"The status of this channel.","refName":"interaction_channel_enum_channel_status","modelName":"interaction_channel_enum_channel_status"},"error_code":{"type":"integer","nullable":true,"description":"The Twilio error code for a failed channel."},"error_message":{"type":"string","nullable":true,"description":"The error message for a failed channel."},"url":{"type":"string","format":"uri","nullable":true},"links":{"type":"object","format":"uri-map","nullable":true}}}} />

| **Parameter**       | **Sub-fields** | **Description**                                                                                                                                                                                                                                 |
| ------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Status \[required]  |                | Indicates the interaction channel status. When a channel is set to closed, all tasks are put in "wrapping" state by default unless the Routing status is set to "closed" in which case the tasks will be "completed".<br /><br /> Value: closed |
| Routing \[optional] |                | The state of associated tasks. If not specified, all tasks will be set to "wrapping".                                                                                                                                                           |
|                     | status         | Value: closed<br /><br /> If closed is specified, all associated tasks will be set to "completed".                                                                                                                                              |

## Fetch a Channel

`GET https://flex-api.twilio.com/v1/Interactions/{InteractionSid}/Channels/{Sid}`

This lets you retrieve a single Channel instance.

### Path parameters

```json
[{"name":"InteractionSid","in":"path","description":"The unique string created by Twilio to identify an Interaction resource, prefixed with KD.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KD[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The unique string created by Twilio to identify an Interaction Channel resource, prefixed with UO.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^UO[0-9a-fA-F]{32}$"},"required":true}]
```

Fetch a Channel

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchInteractionChannel() {
  const channel = await client.flexApi.v1
    .interaction("KDXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .channels("UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .fetch();

  console.log(channel.sid);
}

fetchInteractionChannel();
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

channel = (
    client.flex_api.v1.interaction("KDXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .channels("UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .fetch()
)

print(channel.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.FlexApi.V1.Interaction;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var interactionChannel = await InteractionChannelResource.FetchAsync(
            pathInteractionSid: "KDXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            pathSid: "UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(interactionChannel.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.flexapi.v1.interaction.InteractionChannel;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        InteractionChannel interactionChannel =
            InteractionChannel.fetcher("KDXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").fetch();

        System.out.println(interactionChannel.getSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	resp, err := client.FlexV1.FetchInteractionChannel("KDXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		"UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
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

$channel = $twilio->flexApi->v1
    ->interaction("KDXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->channels("UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->fetch();

print $channel->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

channel = @client
          .flex_api
          .v1
          .interaction('KDXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
          .channels('UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
          .fetch

puts channel.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:flex:v1:interactions:channels:fetch \
   --interaction-sid KDXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --sid UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X GET "https://flex-api.twilio.com/v1/Interactions/KDXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Channels/UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "type": "chat",
  "interaction_sid": "KDXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "status": "closed",
  "error_code": 19025,
  "error_message": "Channel validation error",
  "url": "https://flex-api.twilio.com/v1/Interactions/KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels/UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1",
  "links": {
    "participants": "https://flex-api.twilio.com/v1/Interactions/KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels/UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1/Participants",
    "invites": "https://flex-api.twilio.com/v1/Interactions/KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels/UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1/Invites",
    "transfers": "https://flex-api.twilio.com/v1/Interactions/KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels/UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1/Transfers"
  }
}
```

## List Channels

```bash
GET /Interactions/<interaction_sid>/Channels
```

Since only one Channel is supported in the private beta release, only one Channel will be returned.

### Response Object

| **Parameter**    | **Description**                                                                                                                                                                                                                                           |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| sid              | Unique identifier for the interaction channel                                                                                                                                                                                                             |
| interaction\_sid | Unique identifier for the interaction                                                                                                                                                                                                                     |
|                  | The channel type specified when the interaction was created. Please refer to the [Interactions Properties table](/docs/flex/developer/conversations/interactions-api/interactions) for possible values.                                                   |
| links            | A JSON object linking to the interaction channel's associated [participants](/docs/flex/developer/conversations/interactions-api/interaction-channel-participants) and [invites](/docs/flex/developer/conversations/interactions-api/invites-subresource) |

List Channels

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchInteractionChannel() {
  const channel = await client.flexApi.v1
    .interaction("KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .channels("UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .fetch();

  console.log(channel.sid);
}

fetchInteractionChannel();
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

channel = (
    client.flex_api.v1.interaction("KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .channels("UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .fetch()
)

print(channel.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.FlexApi.V1.Interaction;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var interactionChannel = await InteractionChannelResource.FetchAsync(
            pathInteractionSid: "KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            pathSid: "UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(interactionChannel.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.flexapi.v1.interaction.InteractionChannel;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        InteractionChannel interactionChannel =
            InteractionChannel.fetcher("KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                .fetch();

        System.out.println(interactionChannel.getSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	resp, err := client.FlexV1.FetchInteractionChannel("KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		"UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
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

$channel = $twilio->flexApi->v1
    ->interaction("KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->channels("UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->fetch();

print $channel->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

channel = @client
          .flex_api
          .v1
          .interaction('KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
          .channels('UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
          .fetch

puts channel.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:flex:v1:interactions:channels:fetch \
   --interaction-sid KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --sid UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X GET "https://flex-api.twilio.com/v1/Interactions/KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Channels/UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "type": "chat",
  "interaction_sid": "KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "status": "closed",
  "error_code": 19025,
  "error_message": "Channel validation error",
  "url": "https://flex-api.twilio.com/v1/Interactions/KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels/UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1",
  "links": {
    "participants": "https://flex-api.twilio.com/v1/Interactions/KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels/UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1/Participants",
    "invites": "https://flex-api.twilio.com/v1/Interactions/KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels/UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1/Invites",
    "transfers": "https://flex-api.twilio.com/v1/Interactions/KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels/UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1/Transfers"
  }
}
```

> \[!NOTE]
>
> An [interaction channel](/docs/flex/admin-guide/core-concepts/conversations) (UOXXXXXX) is deleted after 180 days of inactivity, regardless of its state. Retrieving the channel after 180 days from deletion returns a `404 Not Found`. Note that the initial TTL (Time to Live) period resets every time there is an update to the interaction channel, such as if an agent accepts the new task through Flex UI. Changes to the Conversations channel, such as updating conversation status or adding or removing a participant, do not reset the interaction channel's inactivity period.

## Update an InteractionChannel resource

`POST https://flex-api.twilio.com/v1/Interactions/{InteractionSid}/Channels/{Sid}`

This subresource lets a developer close a channel in an interaction. When you close a channel, all tasks and reservations for all agents on the channel will be set to wrapup state. If you wish to complete the tasks, you can supply the optional routing status parameter with the value closed.

Furthermore, when you set the channel status to closed, the underlying media channel will also be closed. This changes the channel to "read-only" regardless of the routing status.

The following table illustrates the media channel and task states for a given Channel and Routing status.

| **Channel status** | **Routing status** | **Resulting task state** | **Resulting conversation state** |
| ------------------ | ------------------ | ------------------------ | -------------------------------- |
| closed             | Not specified      | wrapping                 | closed                           |
| closed             | closed             | completed                | closed                           |

In some cases, it is desired to keep the channel open but have the agents complete their tasks. To achieve this, use the Channel Participants subresource to modify the status of the participants rather than the channel. Note however that you will need to add more logic to ensure the next incoming message.

### Path parameters

```json
[{"name":"InteractionSid","in":"path","description":"The unique string created by Twilio to identify an Interaction resource, prefixed with KD.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KD[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The unique string created by Twilio to identify an Interaction Channel resource, prefixed with UO.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^UO[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"UpdateInteractionChannelRequest","required":["Status"],"properties":{"Status":{"type":"string","enum":["closed","inactive"],"refName":"interaction_channel_enum_update_channel_status","modelName":"interaction_channel_enum_update_channel_status"},"Routing":{"description":"It changes the state of associated tasks. Routing status is required, When the channel status is set to `inactive`. Allowed Value for routing status is `closed`. Otherwise Optional, if not specified, all tasks will be set to `wrapping`."}}},"examples":{"update":{"value":{"lang":"json","value":"{\n  \"Status\": \"closed\"\n}","meta":"","code":"{\n  \"Status\": \"closed\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Status\"","#7EE787"],[":","#C9D1D9"]," ",["\"closed\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"updateStatusClosed":{"value":{"lang":"json","value":"{\n  \"Status\": \"closed\"\n}","meta":"","code":"{\n  \"Status\": \"closed\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Status\"","#7EE787"],[":","#C9D1D9"]," ",["\"closed\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"updateStatusInactive":{"value":{"lang":"json","value":"{\n  \"Status\": \"inactive\",\n  \"Routing\": \"{\\\"status\\\":\\\"closed\\\"}\"\n}","meta":"","code":"{\n  \"Status\": \"inactive\",\n  \"Routing\": \"{\\\"status\\\":\\\"closed\\\"}\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Status\"","#7EE787"],[":","#C9D1D9"]," ",["\"inactive\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Routing\"","#7EE787"],[":","#C9D1D9"]," ",["\"{","#A5D6FF"],["\\\"","#79C0FF"],["status","#A5D6FF"],["\\\"","#79C0FF"],[":","#A5D6FF"],["\\\"","#79C0FF"],["closed","#A5D6FF"],["\\\"","#79C0FF"],["}\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Close an interaction channel and wrap agent participants

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateInteractionChannelParticipant() {
  const participant = await client.flexApi.v1
    .interaction("KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .channels("UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .participants("UTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update({ status: "closed" });

  console.log(participant.sid);
}

updateInteractionChannelParticipant();
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

interaction_channel_participant = (
    client.flex_api.v1.interaction("KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .channels("UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .participants("UTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update(status="closed")
)

print(interaction_channel_participant.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.FlexApi.V1.Interaction.InteractionChannel;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var interactionChannelParticipant = await InteractionChannelParticipantResource.UpdateAsync(
            status: InteractionChannelParticipantResource.StatusEnum.Closed,
            pathInteractionSid: "KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathChannelSid: "UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "UTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(interactionChannelParticipant.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.flexapi.v1.interaction.interactionchannel.InteractionChannelParticipant;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        InteractionChannelParticipant interactionChannelParticipant =
            InteractionChannelParticipant
                .updater("KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                    "UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                    "UTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                    InteractionChannelParticipant.Status.CLOSED)
                .update();

        System.out.println(interactionChannelParticipant.getSid());
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

	params := &flex.UpdateInteractionChannelParticipantParams{}
	params.SetStatus("closed")

	resp, err := client.FlexV1.UpdateInteractionChannelParticipant("KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"UTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$interaction_channel_participant = $twilio->flexApi->v1
    ->interaction("KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->channels("UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->participants("UTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->update(
        "closed" // Status
    );

print $interaction_channel_participant->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

participant = @client
              .flex_api
              .v1
              .interaction('KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              .channels('UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              .participants('UTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              .update(status: 'closed')

puts participant.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:flex:v1:interactions:channels:participants:update \
   --interaction-sid KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --channel-sid UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid UTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --status closed
```

```bash
curl -X POST "https://flex-api.twilio.com/v1/Interactions/KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels/UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/UTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
--data-urlencode "Status=closed" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "UTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "channel_sid": "UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "interaction_sid": "KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "type": "agent",
  "routing_properties": {
    "task_sid": "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "worker_sid": "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "reservation_sid": "WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  },
  "url": "https://flex-api.twilio.com/v1/Interactions/KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels/UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1/Participants/UTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1"
}
```

## Close an Interaction Channel

`POST https://flex-api.twilio.com/v1/Interactions/{InteractionSid}/Channels/{Sid}`

This subresource lets a developer close a channel in an interaction. When you close a channel, all tasks and reservations for all agents on the channel will be set to wrapup state. If you wish to complete the tasks, you can supply the optional routing status parameter with the value closed.

Furthermore, when you set the channel status to closed, the underlying media channel will also be closed. This changes the channel to "read-only" regardless of the routing status.

The following table illustrates the media channel and task states for a given Channel and Routing status.

| **Channel status** | **Routing status** | **Resulting task state** | **Resulting conversation state** |
| ------------------ | ------------------ | ------------------------ | -------------------------------- |
| closed             | Not specified      | wrapping                 | closed                           |
| closed             | closed             | completed                | closed                           |

In some cases, it is desired to keep the channel open but have the agents complete their tasks. To achieve this, use the [Channel Participant](/docs/flex/developer/conversations/interactions-api/interaction-channel-participants) subresource to modify the status of the participants rather than the channel. Note however that you will need to add more logic to ensure you invite the same or a new agent on the next incoming message.

### Path parameters

```json
[{"name":"InteractionSid","in":"path","description":"The unique string created by Twilio to identify an Interaction resource, prefixed with KD.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KD[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The unique string created by Twilio to identify an Interaction Channel resource, prefixed with UO.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^UO[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"UpdateInteractionChannelRequest","required":["Status"],"properties":{"Status":{"type":"string","enum":["closed","inactive"],"refName":"interaction_channel_enum_update_channel_status","modelName":"interaction_channel_enum_update_channel_status"},"Routing":{"description":"It changes the state of associated tasks. Routing status is required, When the channel status is set to `inactive`. Allowed Value for routing status is `closed`. Otherwise Optional, if not specified, all tasks will be set to `wrapping`."}}},"examples":{"update":{"value":{"lang":"json","value":"{\n  \"Status\": \"closed\"\n}","meta":"","code":"{\n  \"Status\": \"closed\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Status\"","#7EE787"],[":","#C9D1D9"]," ",["\"closed\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"updateStatusClosed":{"value":{"lang":"json","value":"{\n  \"Status\": \"closed\"\n}","meta":"","code":"{\n  \"Status\": \"closed\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Status\"","#7EE787"],[":","#C9D1D9"]," ",["\"closed\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"updateStatusInactive":{"value":{"lang":"json","value":"{\n  \"Status\": \"inactive\",\n  \"Routing\": \"{\\\"status\\\":\\\"closed\\\"}\"\n}","meta":"","code":"{\n  \"Status\": \"inactive\",\n  \"Routing\": \"{\\\"status\\\":\\\"closed\\\"}\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Status\"","#7EE787"],[":","#C9D1D9"]," ",["\"inactive\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Routing\"","#7EE787"],[":","#C9D1D9"]," ",["\"{","#A5D6FF"],["\\\"","#79C0FF"],["status","#A5D6FF"],["\\\"","#79C0FF"],[":","#A5D6FF"],["\\\"","#79C0FF"],["closed","#A5D6FF"],["\\\"","#79C0FF"],["}\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Close an interaction channel and wrap agent participants

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateInteractionChannel() {
  const channel = await client.flexApi.v1
    .interaction("KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .channels("UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update({ status: "closed" });

  console.log(channel.sid);
}

updateInteractionChannel();
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

interaction_channel = (
    client.flex_api.v1.interaction("KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .channels("UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update(status="closed")
)

print(interaction_channel.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.FlexApi.V1.Interaction;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var interactionChannel = await InteractionChannelResource.UpdateAsync(
            status: InteractionChannelResource.UpdateChannelStatusEnum.Closed,
            pathInteractionSid: "KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(interactionChannel.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.flexapi.v1.interaction.InteractionChannel;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        InteractionChannel interactionChannel = InteractionChannel
                                                    .updater("KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                                                        "UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                                                        InteractionChannel.UpdateChannelStatus.CLOSED)
                                                    .update();

        System.out.println(interactionChannel.getSid());
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

	params := &flex.UpdateInteractionChannelParams{}
	params.SetStatus("closed")

	resp, err := client.FlexV1.UpdateInteractionChannel("KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$interaction_channel = $twilio->flexApi->v1
    ->interaction("KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->channels("UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->update(
        "closed" // Status
    );

print $interaction_channel->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

channel = @client
          .flex_api
          .v1
          .interaction('KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
          .channels('UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
          .update(status: 'closed')

puts channel.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:flex:v1:interactions:channels:update \
   --interaction-sid KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --status closed
```

```bash
curl -X POST "https://flex-api.twilio.com/v1/Interactions/KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels/UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
--data-urlencode "Status=closed" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "interaction_sid": "KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "type": "chat",
  "status": "closed",
  "error_code": 19025,
  "error_message": "Channel validation error",
  "url": "https://flex-api.twilio.com/v1/Interactions/KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels/UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1",
  "links": {
    "participants": "https://flex-api.twilio.com/v1/Interactions/KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels/UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1/Participants",
    "invites": "https://flex-api.twilio.com/v1/Interactions/KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels/UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1/Invites",
    "transfers": "https://flex-api.twilio.com/v1/Interactions/KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels/UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1/Transfers"
  }
}
```

Close an interaction channel and complete all tasks

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateInteractionChannel() {
  const channel = await client.flexApi.v1
    .interaction("KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .channels("UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update({
      routing: {
        status: "closed",
      },
      status: "closed",
    });

  console.log(channel.sid);
}

updateInteractionChannel();
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

interaction_channel = (
    client.flex_api.v1.interaction("KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .channels("UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update(status="closed", routing={"status": "closed"})
)

print(interaction_channel.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.FlexApi.V1.Interaction;
using System.Threading.Tasks;
using System.Collections.Generic;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var interactionChannel = await InteractionChannelResource.UpdateAsync(
            status: InteractionChannelResource.UpdateChannelStatusEnum.Closed,
            routing: new Dictionary<string, Object>() { { "status", "closed" } },
            pathInteractionSid: "KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(interactionChannel.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.util.HashMap;
import com.twilio.Twilio;
import com.twilio.rest.flexapi.v1.interaction.InteractionChannel;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        InteractionChannel interactionChannel = InteractionChannel
                                                    .updater("KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                                                        "UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                                                        InteractionChannel.UpdateChannelStatus.CLOSED)
                                                    .setRouting(new HashMap<String, Object>() {
                                                        {
                                                            put("status", "closed");
                                                        }
                                                    })
                                                    .update();

        System.out.println(interactionChannel.getSid());
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

	params := &flex.UpdateInteractionChannelParams{}
	params.SetStatus("closed")
	params.SetRouting(map[string]interface{}{
		"status": "closed",
	})

	resp, err := client.FlexV1.UpdateInteractionChannel("KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$interaction_channel = $twilio->flexApi->v1
    ->interaction("KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->channels("UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->update(
        "closed", // Status
        [
            "routing" => [
                "status" => "closed",
            ],
        ]
    );

print $interaction_channel->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

channel = @client
          .flex_api
          .v1
          .interaction('KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
          .channels('UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
          .update(
            status: 'closed',
            routing: {
              'status' => 'closed'
            }
          )

puts channel.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:flex:v1:interactions:channels:update \
   --interaction-sid KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --status closed \
   --routing "{\"status\":\"closed\"}"
```

```bash
ROUTING_OBJ=$(cat << EOF
{
  "status": "closed"
}
EOF
)
curl -X POST "https://flex-api.twilio.com/v1/Interactions/KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels/UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
--data-urlencode "Status=closed" \
--data-urlencode "Routing=$ROUTING_OBJ" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "interaction_sid": "KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "type": "chat",
  "status": "closed",
  "error_code": 19025,
  "error_message": "Channel validation error",
  "url": "https://flex-api.twilio.com/v1/Interactions/KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels/UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1",
  "links": {
    "participants": "https://flex-api.twilio.com/v1/Interactions/KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels/UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1/Participants",
    "invites": "https://flex-api.twilio.com/v1/Interactions/KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels/UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1/Invites",
    "transfers": "https://flex-api.twilio.com/v1/Interactions/KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels/UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1/Transfers"
  }
}
```
