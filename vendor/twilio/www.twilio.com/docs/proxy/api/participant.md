# Participant

> \[!IMPORTANT]
>
> Twilio's Proxy API is currently available as a Public Beta product. Some features are not yet implemented and others may be changed before the product is declared as Generally Available.
>
> Public Beta products are [not covered by a Twilio SLA](https://help.twilio.com/hc/en-us/articles/115002413087-Twilio-Beta-product-support).

A **Participant** is a single individual communicating in a [Session](/docs/proxy/api/session). There is a limit of two Participants per Session.

You can create a Proxy Participant in two ways:

1. By specifying the private Phone Number of the Participant (Identifier) and relying on Proxy to select an appropriate Phone Number from the Proxy Number pool. The Proxy Number returned (Proxy Identifier) is the Phone Number that the Participant should call to reach the other party.
2. By specifying both the Identifier and the Proxy Identifier. In this case, Proxy will attempt to use the Twilio Phone Number provided. **Note:** The Twilio Phone Number specified must already be added to the Proxy Number pool in order to be accepted.

## Participant Properties

<OperationTable type="properties" data={{"type":"object","refName":"proxy.v1.service.session.participant","modelName":"proxy_v1_service_session_participant","properties":{"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KP[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that we created to identify the Participant resource."},"session_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the parent [Session](https://www.twilio.com/docs/proxy/api/session) resource."},"service_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KS[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the resource's parent [Service](https://www.twilio.com/docs/proxy/api/service) resource."},"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Participant resource."},"friendly_name":{"type":"string","nullable":true,"description":"The string that you assigned to describe the participant. This value must be 255 characters or fewer. Supports UTF-8 characters. **This value should not have PII.**"},"identifier":{"type":"string","nullable":true,"description":"The phone number or channel identifier of the Participant. This value must be 191 characters or fewer. Supports UTF-8 characters.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"proxy_identifier":{"type":"string","nullable":true,"description":"The phone number or short code (masked number) of the participant's partner. The participant will call or message the partner participant at this number."},"proxy_identifier_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^PN[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the Proxy Identifier assigned to the Participant."},"date_deleted":{"type":"string","format":"date-time","nullable":true,"description":"The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date when the Participant was removed from the session."},"date_created":{"type":"string","format":"date-time","nullable":true,"description":"The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date and time in GMT when the resource was created."},"date_updated":{"type":"string","format":"date-time","nullable":true,"description":"The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date and time in GMT when the resource was last updated."},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the Participant resource."},"links":{"type":"object","format":"uri-map","nullable":true,"description":"The URLs to resources related the participant."}}}} />

## Create a Participant resource

`POST https://proxy.twilio.com/v1/Services/{ServiceSid}/Sessions/{SessionSid}/Participants`

### Path parameters

```json
[{"name":"ServiceSid","in":"path","description":"The SID of the parent [Service](https://www.twilio.com/docs/proxy/api/service) resource.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KS[0-9a-fA-F]{32}$"},"required":true},{"name":"SessionSid","in":"path","description":"The SID of the parent [Session](https://www.twilio.com/docs/proxy/api/session) resource.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KC[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"CreateParticipantRequest","required":["Identifier"],"properties":{"Identifier":{"type":"string","description":"The phone number of the Participant.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"FriendlyName":{"type":"string","description":"The string that you assigned to describe the participant. This value must be 255 characters or fewer. **This value should not have PII.**"},"ProxyIdentifier":{"type":"string","description":"The proxy phone number to use for the Participant. If not specified, Proxy will select a number from the pool."},"ProxyIdentifierSid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^PN[0-9a-fA-F]{32}$","description":"The SID of the Proxy Identifier to assign to the Participant."}}},"examples":{"create":{"value":{"lang":"json","value":"{\n  \"FriendlyName\": \"friendly_name\",\n  \"Identifier\": \"+14155551212\"\n}","meta":"","code":"{\n  \"FriendlyName\": \"friendly_name\",\n  \"Identifier\": \"+14155551212\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"friendly_name\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Identifier\"","#7EE787"],[":","#C9D1D9"]," ",["\"+14155551212\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"createChannel":{"value":{"lang":"json","value":"{\n  \"FriendlyName\": \"a facebook user\",\n  \"Identifier\": \"messenger:123456\",\n  \"ProxyIdentifier\": \"messenger:987654532\"\n}","meta":"","code":"{\n  \"FriendlyName\": \"a facebook user\",\n  \"Identifier\": \"messenger:123456\",\n  \"ProxyIdentifier\": \"messenger:987654532\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"a facebook user\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Identifier\"","#7EE787"],[":","#C9D1D9"]," ",["\"messenger:123456\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"ProxyIdentifier\"","#7EE787"],[":","#C9D1D9"]," ",["\"messenger:987654532\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Create a Participant

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createParticipant() {
  const participant = await client.proxy.v1
    .services("KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .sessions("KCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .participants.create({
      friendlyName: "Alice",
      identifier: "+15558675310",
    });

  console.log(participant.proxyIdentifier);
}

createParticipant();
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

participant = (
    client.proxy.v1.services("KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .sessions("KCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .participants.create(friendly_name="Alice", identifier="+15558675310")
)

print(participant.proxy_identifier)
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

        var participant = await ParticipantResource.CreateAsync(
            friendlyName: "Alice",
            identifier: "+15558675310",
            pathServiceSid: "KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            pathSessionSid: "KCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(participant.ProxyIdentifier);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.proxy.v1.service.session.Participant;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Participant participant =
            Participant
                .creator("KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "KCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "+15558675310")
                .setFriendlyName("Alice")
                .create();

        System.out.println(participant.getProxyIdentifier());
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

	params := &proxy.CreateParticipantParams{}
	params.SetFriendlyName("Alice")
	params.SetIdentifier("+15558675310")

	resp, err := client.ProxyV1.CreateParticipant("KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		"KCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.ProxyIdentifier != nil {
			fmt.Println(*resp.ProxyIdentifier)
		} else {
			fmt.Println(resp.ProxyIdentifier)
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

$participant = $twilio->proxy->v1
    ->services("KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->sessions("KCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->participants->create(
        "+15558675310", // Identifier
        ["friendlyName" => "Alice"]
    );

print $participant->proxyIdentifier;
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
              .proxy
              .v1
              .services('KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
              .sessions('KCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
              .participants
              .create(
                friendly_name: 'Alice',
                identifier: '+15558675310'
              )

puts participant.proxy_identifier
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:proxy:v1:services:sessions:participants:create \
   --service-sid KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --session-sid KCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --friendly-name Alice \
   --identifier +15558675310
```

```bash
curl -X POST "https://proxy.twilio.com/v1/Services/KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Sessions/KCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Participants" \
--data-urlencode "FriendlyName=Alice" \
--data-urlencode "Identifier=+15558675310" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "KPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "session_sid": "KCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "service_sid": "KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "identifier": "+15558675310",
  "proxy_identifier": "+14155559999",
  "proxy_identifier_sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "Alice",
  "date_deleted": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "date_created": "2015-07-30T20:00:00Z",
  "url": "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions/KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/KPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "message_interactions": "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions/KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/KPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/MessageInteractions"
  }
}
```

## Fetch a Participant resource

`GET https://proxy.twilio.com/v1/Services/{ServiceSid}/Sessions/{SessionSid}/Participants/{Sid}`

### Path parameters

```json
[{"name":"ServiceSid","in":"path","description":"The SID of the parent [Service](https://www.twilio.com/docs/proxy/api/service) of the resource to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KS[0-9a-fA-F]{32}$"},"required":true},{"name":"SessionSid","in":"path","description":"The SID of the parent [Session](https://www.twilio.com/docs/proxy/api/session) of the resource to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KC[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The Twilio-provided string that uniquely identifies the Participant resource to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KP[0-9a-fA-F]{32}$"},"required":true}]
```

Fetch a specific Participant

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchParticipant() {
  const participant = await client.proxy.v1
    .services("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .sessions("KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .participants("KPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch();

  console.log(participant.sid);
}

fetchParticipant();
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

participant = (
    client.proxy.v1.services("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .sessions("KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .participants("KPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch()
)

print(participant.sid)
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

        var participant = await ParticipantResource.FetchAsync(
            pathServiceSid: "KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSessionSid: "KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "KPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(participant.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.proxy.v1.service.session.Participant;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Participant participant = Participant
                                      .fetcher("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                                          "KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                                          "KPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                                      .fetch();

        System.out.println(participant.getSid());
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

	resp, err := client.ProxyV1.FetchParticipant("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"KPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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

$participant = $twilio->proxy->v1
    ->services("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->sessions("KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->participants("KPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->fetch();

print $participant->sid;
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
              .proxy
              .v1
              .services('KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              .sessions('KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              .participants('KPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              .fetch

puts participant.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:proxy:v1:services:sessions:participants:fetch \
   --service-sid KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --session-sid KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid KPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions/KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/KPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "KPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "session_sid": "KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "service_sid": "KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "identifier": "+14155551212",
  "proxy_identifier": "+14155559999",
  "proxy_identifier_sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "friendly_name",
  "date_deleted": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "date_created": "2015-07-30T20:00:00Z",
  "url": "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions/KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/KPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "message_interactions": "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions/KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/KPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/MessageInteractions"
  }
}
```

## Read multiple Participant resources

`GET https://proxy.twilio.com/v1/Services/{ServiceSid}/Sessions/{SessionSid}/Participants`

### Path parameters

```json
[{"name":"ServiceSid","in":"path","description":"The SID of the parent [Service](https://www.twilio.com/docs/proxy/api/service) of the resources to read.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KS[0-9a-fA-F]{32}$"},"required":true},{"name":"SessionSid","in":"path","description":"The SID of the parent [Session](https://www.twilio.com/docs/proxy/api/session) of the resources to read.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KC[0-9a-fA-F]{32}$"},"required":true}]
```

### Query parameters

```json
[{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

## Update a Participant

In order to add a new Participant in a Session, you can `DELETE` an existing Participant and then add a new one.

> \[!CAUTION]
>
> Adding a participant that was removed is not possible.
>
> Proxy will return with [error 80103](/docs/api/errors/80103) if the new participant's identifier matches the deleted participant's identifier.

Retrieve a list of all Participants in a Session

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listParticipant() {
  const participants = await client.proxy.v1
    .services("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .sessions("KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .participants.list({ limit: 20 });

  participants.forEach((p) => console.log(p.sid));
}

listParticipant();
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
    client.proxy.v1.services("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .sessions("KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .participants.list(limit=20)
)

for record in participants:
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

        var participants = await ParticipantResource.ReadAsync(
            pathServiceSid: "KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSessionSid: "KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            limit: 20);

        foreach (var record in participants) {
            Console.WriteLine(record.Sid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.proxy.v1.service.session.Participant;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Participant> participants =
            Participant.reader("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                .limit(20)
                .read();

        for (Participant record : participants) {
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

	params := &proxy.ListParticipantParams{}
	params.SetLimit(20)

	resp, err := client.ProxyV1.ListParticipant("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$participants = $twilio->proxy->v1
    ->services("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->sessions("KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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
               .proxy
               .v1
               .services('KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
               .sessions('KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
               .participants
               .list(limit: 20)

participants.each do |record|
   puts record.sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:proxy:v1:services:sessions:participants:list \
   --service-sid KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --session-sid KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions/KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "meta": {
    "previous_page_url": null,
    "next_page_url": null,
    "url": "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions/KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants?PageSize=50&Page=0",
    "page": 0,
    "first_page_url": "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions/KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants?PageSize=50&Page=0",
    "page_size": 50,
    "key": "participants"
  },
  "participants": []
}
```

## Delete a Participant resource

`DELETE https://proxy.twilio.com/v1/Services/{ServiceSid}/Sessions/{SessionSid}/Participants/{Sid}`

### Path parameters

```json
[{"name":"ServiceSid","in":"path","description":"The SID of the parent [Service](https://www.twilio.com/docs/proxy/api/service) of the resource to delete.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KS[0-9a-fA-F]{32}$"},"required":true},{"name":"SessionSid","in":"path","description":"The SID of the parent [Session](https://www.twilio.com/docs/proxy/api/session) of the resource to delete.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KC[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The Twilio-provided string that uniquely identifies the Participant resource to delete.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KP[0-9a-fA-F]{32}$"},"required":true}]
```

Delete a specific Participant. This is a soft-delete. The participant remains associated with the session and cannot be re-added. Participants are only permanently deleted when the [Session](https://www.twilio.com/docs/proxy/api/session) is deleted

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function deleteParticipant() {
  await client.proxy.v1
    .services("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .sessions("KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .participants("KPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .remove();
}

deleteParticipant();
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
).participants("KPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete()
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

        await ParticipantResource.DeleteAsync(
            pathServiceSid: "KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSessionSid: "KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "KPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.proxy.v1.service.session.Participant;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Participant
            .deleter("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                "KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                "KPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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

	err := client.ProxyV1.DeleteParticipant("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"KPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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
    ->participants("KPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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
  .participants('KPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  .delete
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:proxy:v1:services:sessions:participants:remove \
   --service-sid KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --session-sid KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid KPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X DELETE "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions/KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/KPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```
