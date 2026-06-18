# Interaction

> \[!IMPORTANT]
>
> Twilio's Proxy API is currently available as a Public Beta product. Some features are not yet implemented and others may be changed before the product is declared as Generally Available.
>
> Public Beta products are [not covered by a Twilio SLA](https://help.twilio.com/hc/en-us/articles/115002413087-Twilio-Beta-product-support).

**Interactions** are read-only communications logs of a given [Session](/docs/proxy/api/session). Each Interaction represents a single communication.

Interactions are composed of an inbound (to Twilio) and an outbound (from Twilio) leg. Interactions can have both inbound and outbound legs or be "one-sided" (like when creating a [Message Interaction](/docs/proxy/api/sending-messages) resource).

If a user sends an SMS to a proxy number, and Twilio Proxy handles the proxying to the other [Participant](/docs/proxy/api/participant), you'll have an Interaction with both an inbound SMS and an outbound SMS.

## Interaction Properties

<OperationTable type="properties" data={{"type":"object","refName":"proxy.v1.service.session.interaction","modelName":"proxy_v1_service_session_interaction","properties":{"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KI[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that we created to identify the Interaction resource."},"session_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the parent [Session](https://www.twilio.com/docs/proxy/api/session) resource."},"service_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KS[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the parent [Service](https://www.twilio.com/docs/proxy/api/service) resource."},"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Interaction resource."},"data":{"type":"string","nullable":true,"description":"A JSON string that includes the message body of message interactions (e.g. `{\"body\": \"hello\"}`) or the call duration (when available) of a call (e.g. `{\"duration\": \"5\"}`).","x-twilio":{"pii":{"handling":"sensitive","deleteSla":30}}},"type":{"type":"string","enum":["message","voice","unknown"],"description":"The Type of the Interaction. Can be: `message`, `voice` or `unknown`.","refName":"interaction_enum_type","modelName":"interaction_enum_type"},"inbound_participant_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KP[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the inbound [Participant](https://www.twilio.com/docs/proxy/api/participant) resource."},"inbound_resource_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^[a-zA-Z]{2}[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the inbound resource; either the [Call](https://www.twilio.com/docs/voice/api/call-resource) or [Message](https://www.twilio.com/docs/sms/api/message-resource)."},"inbound_resource_status":{"type":"string","enum":["accepted","answered","busy","canceled","completed","deleted","delivered","delivery-unknown","failed","in-progress","initiated","no-answer","queued","received","receiving","ringing","scheduled","sending","sent","undelivered","unknown"],"description":"The inbound resource status of the Interaction. Will always be `delivered` for messages and `in-progress` for calls.","refName":"interaction_enum_resource_status","modelName":"interaction_enum_resource_status"},"inbound_resource_type":{"type":"string","nullable":true,"description":"The inbound resource type. Can be [Call](https://www.twilio.com/docs/voice/api/call-resource) or [Message](https://www.twilio.com/docs/sms/api/message-resource)."},"inbound_resource_url":{"type":"string","format":"uri","nullable":true,"description":"The URL of the Twilio inbound resource"},"outbound_participant_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KP[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the outbound [Participant](https://www.twilio.com/docs/proxy/api/participant))."},"outbound_resource_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^[a-zA-Z]{2}[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the outbound resource; either the [Call](https://www.twilio.com/docs/voice/api/call-resource) or [Message](https://www.twilio.com/docs/sms/api/message-resource)."},"outbound_resource_status":{"type":"string","enum":["accepted","answered","busy","canceled","completed","deleted","delivered","delivery-unknown","failed","in-progress","initiated","no-answer","queued","received","receiving","ringing","scheduled","sending","sent","undelivered","unknown"],"description":"The inbound resource status of the Interaction. Will always be `delivered` for messages and `in-progress` for calls.","refName":"interaction_enum_resource_status","modelName":"interaction_enum_resource_status"},"outbound_resource_type":{"type":"string","nullable":true,"description":"The outbound resource type. Can be: [Call](https://www.twilio.com/docs/voice/api/call-resource) or [Message](https://www.twilio.com/docs/sms/api/message-resource)."},"outbound_resource_url":{"type":"string","format":"uri","nullable":true,"description":"The URL of the Twilio outbound resource."},"date_created":{"type":"string","format":"date-time","nullable":true,"description":"The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date and time in GMT when the Interaction was created."},"date_updated":{"type":"string","format":"date-time","nullable":true,"description":"The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date and time in GMT when the resource was last updated."},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the Interaction resource."}}}} />

## Create an Interaction resource

You cannot `POST` to the Interactions resource. Instead, you can generate Interactions via the appropriate Participant's [MessageInteraction](/docs/proxy/api/sending-messages) resource. For details, see [Sending Messages](/docs/proxy/api/sending-messages). Otherwise, Interactions are created automatically when Participants text or call each other.

## Fetch an Interaction resource

`GET https://proxy.twilio.com/v1/Services/{ServiceSid}/Sessions/{SessionSid}/Interactions/{Sid}`

### Path parameters

```json
[{"name":"ServiceSid","in":"path","description":"The SID of the parent [Service](https://www.twilio.com/docs/proxy/api/service) of the resource to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KS[0-9a-fA-F]{32}$"},"required":true},{"name":"SessionSid","in":"path","description":"The SID of the parent [Session](https://www.twilio.com/docs/proxy/api/session) of the resource to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KC[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The Twilio-provided string that uniquely identifies the Interaction resource to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KI[0-9a-fA-F]{32}$"},"required":true}]
```

Retrieve a list of Interactions for a given [Session](https://www.twilio.com/docs/proxy/api/session)

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchInteraction() {
  const interaction = await client.proxy.v1
    .services("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .sessions("KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .interactions("KIaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch();

  console.log(interaction.sid);
}

fetchInteraction();
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

interaction = (
    client.proxy.v1.services("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .sessions("KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .interactions("KIaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch()
)

print(interaction.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Proxy.V1.Service.Session;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var interaction = await InteractionResource.FetchAsync(
            pathServiceSid: "KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSessionSid: "KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "KIaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(interaction.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.proxy.v1.service.session.Interaction;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Interaction interaction = Interaction
                                      .fetcher("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                                          "KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                                          "KIaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                                      .fetch();

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
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	resp, err := client.ProxyV1.FetchInteraction("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"KIaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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

$interaction = $twilio->proxy->v1
    ->services("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->sessions("KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->interactions("KIaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->fetch();

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
              .proxy
              .v1
              .services('KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              .sessions('KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              .interactions('KIaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              .fetch

puts interaction.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:proxy:v1:services:sessions:interactions:fetch \
   --service-sid KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --session-sid KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid KIaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions/KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Interactions/KIaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "service_sid": "KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "data": "{\"body\":\"some message\"}",
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "inbound_participant_sid": "KPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "inbound_resource_sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "inbound_resource_status": "sent",
  "inbound_resource_type": "Message",
  "inbound_resource_url": null,
  "outbound_participant_sid": "KPbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
  "outbound_resource_sid": "SMbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
  "outbound_resource_status": "sent",
  "outbound_resource_type": "Message",
  "outbound_resource_url": null,
  "sid": "KIaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "type": "message",
  "url": "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions/KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Interactions/KIaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "session_sid": "KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

## Read multiple Interaction resources

`GET https://proxy.twilio.com/v1/Services/{ServiceSid}/Sessions/{SessionSid}/Interactions`

Retrieve a list of **Interactions** for a given [Session](/docs/proxy/api/session).

### Path parameters

```json
[{"name":"ServiceSid","in":"path","description":"The SID of the parent [Service](https://www.twilio.com/docs/proxy/api/service) to read the resources from.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KS[0-9a-fA-F]{32}$"},"required":true},{"name":"SessionSid","in":"path","description":"The SID of the parent [Session](https://www.twilio.com/docs/proxy/api/session) to read the resources from.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KC[0-9a-fA-F]{32}$"},"required":true}]
```

### Query parameters

```json
[{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

Retrieve a list of all Interactions for a Session. A maximum of 100 records will be returned per page

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listInteraction() {
  const interactions = await client.proxy.v1
    .services("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .sessions("KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .interactions.list({ limit: 20 });

  interactions.forEach((i) => console.log(i.sid));
}

listInteraction();
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

interactions = (
    client.proxy.v1.services("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .sessions("KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .interactions.list(limit=20)
)

for record in interactions:
    print(record.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Proxy.V1.Service.Session;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var interactions = await InteractionResource.ReadAsync(
            pathServiceSid: "KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSessionSid: "KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            limit: 20);

        foreach (var record in interactions) {
            Console.WriteLine(record.Sid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.proxy.v1.service.session.Interaction;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Interaction> interactions =
            Interaction.reader("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                .limit(20)
                .read();

        for (Interaction record : interactions) {
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
	proxy "github.com/twilio/twilio-go/rest/proxy/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &proxy.ListInteractionParams{}
	params.SetLimit(20)

	resp, err := client.ProxyV1.ListInteraction("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$interactions = $twilio->proxy->v1
    ->services("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->sessions("KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->interactions->read(20);

foreach ($interactions as $record) {
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

interactions = @client
               .proxy
               .v1
               .services('KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
               .sessions('KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
               .interactions
               .list(limit: 20)

interactions.each do |record|
   puts record.sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:proxy:v1:services:sessions:interactions:list \
   --service-sid KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --session-sid KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions/KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Interactions?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "interactions": [],
  "meta": {
    "previous_page_url": null,
    "next_page_url": null,
    "url": "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions/KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Interactions?PageSize=50&Page=0",
    "page": 0,
    "first_page_url": "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions/KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Interactions?PageSize=50&Page=0",
    "page_size": 50,
    "key": "interactions"
  }
}
```

## Delete an Interaction resource

`DELETE https://proxy.twilio.com/v1/Services/{ServiceSid}/Sessions/{SessionSid}/Interactions/{Sid}`

Deleting an Interaction removes it permanently.

> \[!CAUTION]
>
> Any Message or Call records created during this interaction will NOT be deleted automatically. If you want to delete all related [Message](/docs/messaging/api/message-resource)/[Call](/docs/voice/api/call-resource) resources, you must issue direct `DELETE` requests for the inbound and outbound resources directly. Once you have deleted an interaction, those resource SIDs will not be discoverable via Proxy.

### Path parameters

```json
[{"name":"ServiceSid","in":"path","description":"The SID of the parent [Service](https://www.twilio.com/docs/proxy/api/service) of the resource to delete.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KS[0-9a-fA-F]{32}$"},"required":true},{"name":"SessionSid","in":"path","description":"The SID of the parent [Session](https://www.twilio.com/docs/proxy/api/session) of the resource to delete.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KC[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The Twilio-provided string that uniquely identifies the Interaction resource to delete.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KI[0-9a-fA-F]{32}$"},"required":true}]
```

Delete a specific Interaction

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function deleteInteraction() {
  await client.proxy.v1
    .services("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .sessions("KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .interactions("KIaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .remove();
}

deleteInteraction();
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

client.proxy.v1.services("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").sessions(
    "KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).interactions("KIaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete()
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Proxy.V1.Service.Session;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        await InteractionResource.DeleteAsync(
            pathServiceSid: "KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSessionSid: "KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "KIaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.proxy.v1.service.session.Interaction;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Interaction
            .deleter("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                "KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                "KIaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
            .delete();
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

	err := client.ProxyV1.DeleteInteraction("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"KIaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
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

$twilio->proxy->v1
    ->services("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->sessions("KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->interactions("KIaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->delete();
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

@client
  .proxy
  .v1
  .services('KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  .sessions('KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  .interactions('KIaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  .delete
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:proxy:v1:services:sessions:interactions:remove \
   --service-sid KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --session-sid KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid KIaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X DELETE "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions/KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Interactions/KIaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```
