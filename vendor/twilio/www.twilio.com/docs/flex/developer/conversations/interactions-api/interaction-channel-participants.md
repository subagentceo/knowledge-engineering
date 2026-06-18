# Interaction Channel Participants

> \[!NOTE]
>
> Flex Conversations requires Flex UI 2.0.x. If you are on Flex UI 1.x.x, refer to the [Messaging in Flex](/docs/flex/developer/messaging) pages.

The **Interaction Channel Participant** subresource represents the actors communicating in an interaction channel. Typically, a channel will include people like agents, customers, and supervisors.

## Participant Properties

<OperationTable type="properties" data={{"type":"object","refName":"flex.v1.interaction.interaction_channel.interaction_channel_participant","modelName":"flex_v1_interaction_interaction_channel_interaction_channel_participant","properties":{"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^UT[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string created by Twilio to identify an Interaction Channel Participant resource."},"type":{"type":"string","enum":["supervisor","customer","external","agent","unknown"],"description":"Participant type. Can be: `agent`, `customer`, `supervisor`, `external`, `unknown`","refName":"interaction_channel_participant_enum_type","modelName":"interaction_channel_participant_enum_type"},"interaction_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KD[0-9a-fA-F]{32}$","nullable":true,"description":"The Interaction Sid for this channel."},"channel_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^UO[0-9a-fA-F]{32}$","nullable":true,"description":"The Channel Sid for this Participant."},"url":{"type":"string","format":"uri","nullable":true},"routing_properties":{"nullable":true,"description":"The Participant's routing properties."}}}} />

## Fetch Channel Participants

`GET https://flex-api.twilio.com/v1/Interactions/{InteractionSid}/Channels/{ChannelSid}/Participants`

### Path parameters

```json
[{"name":"InteractionSid","in":"path","description":"The Interaction Sid for this channel.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KD[0-9a-fA-F]{32}$"},"required":true},{"name":"ChannelSid","in":"path","description":"The Channel Sid for this Participant.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^UO[0-9a-fA-F]{32}$"},"required":true}]
```

### Query parameters

```json
[{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

Fetch Channel Participants

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listInteractionChannelParticipant() {
  const participants = await client.flexApi.v1
    .interaction("KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .channels("UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .participants.list({ limit: 20 });

  participants.forEach((p) => console.log(p.sid));
}

listInteractionChannelParticipant();
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

participants = (
    client.flex_api.v1.interaction("KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .channels("UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .participants.list(limit=20)
)

for record in participants:
    print(record.sid)
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

        var interactionChannelParticipants = await InteractionChannelParticipantResource.ReadAsync(
            pathInteractionSid: "KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            pathChannelSid: "UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            limit: 20);

        foreach (var record in interactionChannelParticipants) {
            Console.WriteLine(record.Sid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.flexapi.v1.interaction.interactionchannel.InteractionChannelParticipant;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<InteractionChannelParticipant> interactionChannelParticipants =
            InteractionChannelParticipant
                .reader("KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                .limit(20)
                .read();

        for (InteractionChannelParticipant record : interactionChannelParticipants) {
            System.out.println(record.getSid());
        }
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

	params := &flex.ListInteractionChannelParticipantParams{}
	params.SetLimit(20)

	resp, err := client.FlexV1.ListInteractionChannelParticipant("KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		"UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].Sid != nil {
				fmt.Println(*resp[record].Sid)
			} else {
				fmt.Println(resp[record].Sid)
			}
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

$participants = $twilio->flexApi->v1
    ->interaction("KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->channels("UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->participants->read(20);

foreach ($participants as $record) {
    print $record->sid;
}
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

participants = @client
               .flex_api
               .v1
               .interaction('KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
               .channels('UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
               .participants
               .list(limit: 20)

participants.each do |record|
   puts record.sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:flex:v1:interactions:channels:participants:list \
   --interaction-sid KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --channel-sid UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X GET "https://flex-api.twilio.com/v1/Interactions/KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Channels/UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Participants?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "participants": [
    {
      "sid": "UTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1",
      "channel_sid": "UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1",
      "interaction_sid": "KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "type": "customer",
      "routing_properties": null,
      "url": "https://flex-api.twilio.com/v1/Interactions/KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels/UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1/Participants/UTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1"
    },
    {
      "sid": "UTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa2",
      "channel_sid": "UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1",
      "interaction_sid": "KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "type": "agent",
      "routing_properties": {
        "task_sid": "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "worker_sid": "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "reservation_sid": "WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
      },
      "url": "https://flex-api.twilio.com/v1/Interactions/KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels/UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1/Participants/UTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa2"
    }
  ],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://flex-api.twilio.com/v1/Interactions/KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels/UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1/Participants?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://flex-api.twilio.com/v1/Interactions/KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels/UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1/Participants?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "participants"
  }
}
```

## Modify a Channel Participant

`POST https://flex-api.twilio.com/v1/Interactions/{InteractionSid}/Channels/{ChannelSid}/Participants/{Sid}`

### Path parameters

```json
[{"name":"InteractionSid","in":"path","description":"The Interaction Sid for this channel.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KD[0-9a-fA-F]{32}$"},"required":true},{"name":"ChannelSid","in":"path","description":"The Channel Sid for this Participant.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^UO[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The unique string created by Twilio to identify an Interaction Channel resource.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^UT[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"UpdateInteractionChannelParticipantRequest","required":["Status"],"properties":{"Status":{"type":"string","enum":["closed","wrapup"],"refName":"interaction_channel_participant_enum_status","modelName":"interaction_channel_participant_enum_status"}}},"examples":{"update":{"value":{"lang":"json","value":"{\n  \"Status\": \"closed\"\n}","meta":"","code":"{\n  \"Status\": \"closed\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Status\"","#7EE787"],[":","#C9D1D9"]," ",["\"closed\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"updateStatusClosed":{"value":{"lang":"json","value":"{\n  \"Status\": \"closed\"\n}","meta":"","code":"{\n  \"Status\": \"closed\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Status\"","#7EE787"],[":","#C9D1D9"]," ",["\"closed\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Wrap up agent reservation

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
    .interaction("KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .channels("UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .participants("UTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .update({ status: "wrapup" });

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
    client.flex_api.v1.interaction("KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .channels("UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .participants("UTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .update(status="wrapup")
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
            status: InteractionChannelParticipantResource.StatusEnum.Wrapup,
            pathInteractionSid: "KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            pathChannelSid: "UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            pathSid: "UTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

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
                .updater("KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                    "UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                    "UTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                    InteractionChannelParticipant.Status.WRAPUP)
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
	params.SetStatus("wrapup")

	resp, err := client.FlexV1.UpdateInteractionChannelParticipant("KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		"UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		"UTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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
    ->interaction("KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->channels("UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->participants("UTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->update(
        "wrapup" // Status
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
              .interaction('KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
              .channels('UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
              .participants('UTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
              .update(status: 'wrapup')

puts participant.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:flex:v1:interactions:channels:participants:update \
   --interaction-sid KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --channel-sid UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --sid UTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --status wrapup
```

```bash
curl -X POST "https://flex-api.twilio.com/v1/Interactions/KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Channels/UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Participants/UTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
--data-urlencode "Status=wrapup" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "UTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "channel_sid": "UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "interaction_sid": "KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "type": "agent",
  "routing_properties": {
    "task_sid": "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "worker_sid": "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "reservation_sid": "WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  },
  "url": "https://flex-api.twilio.com/v1/Interactions/KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels/UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1/Participants/UTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1"
}
```

Complete a single agent reservation

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
    .interaction("KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .channels("UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .participants("UTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
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
    client.flex_api.v1.interaction("KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .channels("UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .participants("UTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
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
            pathInteractionSid: "KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            pathChannelSid: "UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            pathSid: "UTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

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
                .updater("KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                    "UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                    "UTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

	resp, err := client.FlexV1.UpdateInteractionChannelParticipant("KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		"UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		"UTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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
    ->interaction("KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->channels("UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->participants("UTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
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
              .interaction('KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
              .channels('UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
              .participants('UTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
              .update(status: 'closed')

puts participant.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:flex:v1:interactions:channels:participants:update \
   --interaction-sid KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --channel-sid UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --sid UTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --status closed
```

```bash
curl -X POST "https://flex-api.twilio.com/v1/Interactions/KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Channels/UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Participants/UTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
--data-urlencode "Status=closed" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "UTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "channel_sid": "UOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "interaction_sid": "KDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "type": "agent",
  "routing_properties": {
    "task_sid": "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "worker_sid": "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "reservation_sid": "WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  },
  "url": "https://flex-api.twilio.com/v1/Interactions/KDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels/UOaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1/Participants/UTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1"
}
```
