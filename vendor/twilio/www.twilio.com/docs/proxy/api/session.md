# Session Resource

> \[!IMPORTANT]
>
> Twilio's Proxy API is currently available as a Public Beta product. Some features are not yet implemented and others may be changed before the product is declared as Generally Available.
>
> Public Beta products are [not covered by a Twilio SLA](https://help.twilio.com/hc/en-us/articles/115002413087-Twilio-Beta-product-support).

A **Session** is a single instance of two individuals communicating. It belongs to a [Service](/docs/proxy/api/service) and maps two [Participants](/docs/proxy/api/participant) for a Proxy application. **Sessions** allow you to:

* Specify a unique identifier relevant to your use case, such as a job ID
* See whether a given **Session** is closed or not and the reason it has been closed
* Control the length of time the **Session** should be active

## Session Properties

<OperationTable type="properties" data={{"type":"object","refName":"proxy.v1.service.session","modelName":"proxy_v1_service_session","properties":{"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KC[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that we created to identify the Session resource."},"service_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KS[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Service](https://www.twilio.com/docs/proxy/api/service) the session is associated with."},"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Session resource."},"date_started":{"type":"string","format":"date-time","nullable":true,"description":"The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date when the Session started."},"date_ended":{"type":"string","format":"date-time","nullable":true,"description":"The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date when the Session ended."},"date_last_interaction":{"type":"string","format":"date-time","nullable":true,"description":"The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date when the Session last had an interaction."},"date_expiry":{"type":"string","format":"date-time","nullable":true,"description":"The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date when the Session should expire. If this is value is present, it overrides the `ttl` value."},"unique_name":{"type":"string","nullable":true,"description":"An application-defined string that uniquely identifies the resource. This value must be 191 characters or fewer in length and be unique. Supports UTF-8 characters. **This value should not have PII.**"},"status":{"type":"string","enum":["open","in-progress","closed","failed","unknown"],"description":"The status of the Session. Can be: `open`, `in-progress`, `closed`, `failed`, or `unknown`.","refName":"session_enum_status","modelName":"session_enum_status"},"closed_reason":{"type":"string","nullable":true,"description":"The reason the Session ended."},"ttl":{"type":"integer","default":0,"description":"The time, in seconds, when the session will expire. The time is measured from the last Session create or the Session's last Interaction."},"mode":{"type":"string","enum":["message-only","voice-only","voice-and-message"],"description":"The Mode of the Session. Can be: `message-only`, `voice-only`, or `voice-and-message`.","refName":"session_enum_mode","modelName":"session_enum_mode"},"date_created":{"type":"string","format":"date-time","nullable":true,"description":"The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date and time in GMT when the resource was created."},"date_updated":{"type":"string","format":"date-time","nullable":true,"description":"The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date and time in GMT when the resource was last updated."},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the Session resource."},"links":{"type":"object","format":"uri-map","nullable":true,"description":"The URLs of resources related to the Session."}}}} />

## Create a Session resource

`POST https://proxy.twilio.com/v1/Services/{ServiceSid}/Sessions`

Create a new **Session**.

### Path parameters

```json
[{"name":"ServiceSid","in":"path","description":"The SID of the parent [Service](https://www.twilio.com/docs/proxy/api/service) resource.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KS[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"CreateSessionRequest","properties":{"UniqueName":{"type":"string","description":"An application-defined string that uniquely identifies the resource. This value must be 191 characters or fewer in length and be unique. **This value should not have PII.**"},"DateExpiry":{"type":"string","format":"date-time","description":"The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date when the Session should expire. If this is value is present, it overrides the `ttl` value."},"Ttl":{"type":"integer","description":"The time, in seconds, when the session will expire. The time is measured from the last Session create or the Session's last Interaction."},"Mode":{"type":"string","enum":["message-only","voice-only","voice-and-message"],"description":"The Mode of the Session. Can be: `message-only`, `voice-only`, or `voice-and-message`.","refName":"session_enum_mode","modelName":"session_enum_mode"},"Status":{"type":"string","enum":["open","in-progress","closed","failed","unknown"],"description":"The status of the Session. Can be: `open`, `in-progress`, `closed`, `failed`, or `unknown`.","refName":"session_enum_status","modelName":"session_enum_status"},"Participants":{"type":"array","description":"The Participant objects to include in the new session."}}},"examples":{"create":{"value":{"lang":"json","value":"{\n  \"Ttl\": 3600,\n  \"UniqueName\": \"Order #1234\"\n}","meta":"","code":"{\n  \"Ttl\": 3600,\n  \"UniqueName\": \"Order #1234\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Ttl\"","#7EE787"],[":","#C9D1D9"]," ",["3600","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"UniqueName\"","#7EE787"],[":","#C9D1D9"]," ",["\"Order #1234\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Create a new Session

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createSession() {
  const session = await client.proxy.v1
    .services("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .sessions.create();

  console.log(session.sid);
}

createSession();
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

session = client.proxy.v1.services(
    "KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).sessions.create()

print(session.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Proxy.V1.Service;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var session =
            await SessionResource.CreateAsync(pathServiceSid: "KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(session.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.proxy.v1.service.Session;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Session session = Session.creator("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").create();

        System.out.println(session.getSid());
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

	params := &proxy.CreateSessionParams{}

	resp, err := client.ProxyV1.CreateSession("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$session = $twilio->proxy->v1
    ->services("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->sessions->create();

print $session->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

session = @client
          .proxy
          .v1
          .services('KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
          .sessions
          .create

puts session.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:proxy:v1:services:sessions:create \
   --service-sid KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X POST "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "service_sid": "KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "open",
  "unique_name": "Order #1234",
  "date_started": "2015-07-30T20:00:00Z",
  "date_ended": "2015-07-30T20:00:00Z",
  "date_last_interaction": "2015-07-30T20:00:00Z",
  "date_expiry": "2015-07-30T20:00:00Z",
  "ttl": 3600,
  "mode": "voice-and-message",
  "closed_reason": "",
  "sid": "KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_updated": "2015-07-30T20:00:00Z",
  "date_created": "2015-07-30T20:00:00Z",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions/KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "interactions": "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions/KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Interactions",
    "participants": "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions/KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants"
  }
}
```

## Fetch a Session resource

`GET https://proxy.twilio.com/v1/Services/{ServiceSid}/Sessions/{Sid}`

Retrieve a single **Session**.

### Path parameters

```json
[{"name":"ServiceSid","in":"path","description":"The SID of the parent [Service](https://www.twilio.com/docs/proxy/api/service) of the resource to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KS[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The Twilio-provided string that uniquely identifies the Session resource to fetch.","schema":{"type":"string"},"required":true}]
```

Fetch a specific Session

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchSession() {
  const session = await client.proxy.v1
    .services("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .sessions("Sid")
    .fetch();

  console.log(session.sid);
}

fetchSession();
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

session = (
    client.proxy.v1.services("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .sessions("Sid")
    .fetch()
)

print(session.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Proxy.V1.Service;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var session = await SessionResource.FetchAsync(
            pathServiceSid: "KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", pathSid: "Sid");

        Console.WriteLine(session.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.proxy.v1.service.Session;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Session session = Session.fetcher("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "Sid").fetch();

        System.out.println(session.getSid());
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

	resp, err := client.ProxyV1.FetchSession("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"Sid")
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

$session = $twilio->proxy->v1
    ->services("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->sessions("Sid")
    ->fetch();

print $session->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

session = @client
          .proxy
          .v1
          .services('KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
          .sessions('Sid')
          .fetch

puts session.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:proxy:v1:services:sessions:fetch \
   --service-sid KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid Sid
```

```bash
curl -X GET "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions/Sid" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "service_sid": "KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "open",
  "unique_name": "Order #1234",
  "date_started": "2015-07-30T20:00:00Z",
  "date_ended": "2015-07-30T20:00:00Z",
  "date_last_interaction": "2015-07-30T20:00:00Z",
  "date_expiry": "2015-07-30T20:00:00Z",
  "ttl": 3600,
  "mode": "voice-and-message",
  "closed_reason": "",
  "sid": "Sid",
  "date_updated": "2015-07-30T20:00:00Z",
  "date_created": "2015-07-30T20:00:00Z",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions/KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "interactions": "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions/KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Interactions",
    "participants": "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions/KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants"
  }
}
```

## Read multiple Session resources

`GET https://proxy.twilio.com/v1/Services/{ServiceSid}/Sessions`

Retrieve a list of all **Sessions** for a given Service.

### Path parameters

```json
[{"name":"ServiceSid","in":"path","description":"The SID of the parent [Service](https://www.twilio.com/docs/proxy/api/service) of the resource to read.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KS[0-9a-fA-F]{32}$"},"required":true}]
```

### Query parameters

```json
[{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

Retrieve a list of all Sessions for the Service. A maximum of 100 records will be returned per page

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listSession() {
  const sessions = await client.proxy.v1
    .services("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .sessions.list({ limit: 20 });

  sessions.forEach((s) => console.log(s.sid));
}

listSession();
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

sessions = client.proxy.v1.services(
    "KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).sessions.list(limit=20)

for record in sessions:
    print(record.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Proxy.V1.Service;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var sessions = await SessionResource.ReadAsync(
            pathServiceSid: "KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", limit: 20);

        foreach (var record in sessions) {
            Console.WriteLine(record.Sid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.proxy.v1.service.Session;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Session> sessions = Session.reader("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").limit(20).read();

        for (Session record : sessions) {
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

	params := &proxy.ListSessionParams{}
	params.SetLimit(20)

	resp, err := client.ProxyV1.ListSession("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$sessions = $twilio->proxy->v1
    ->services("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->sessions->read(20);

foreach ($sessions as $record) {
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

sessions = @client
           .proxy
           .v1
           .services('KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
           .sessions
           .list(limit: 20)

sessions.each do |record|
   puts record.sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:proxy:v1:services:sessions:list \
   --service-sid KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sessions": [],
  "meta": {
    "previous_page_url": null,
    "next_page_url": null,
    "url": "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions?PageSize=50&Page=0",
    "page": 0,
    "first_page_url": "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions?PageSize=50&Page=0",
    "page_size": 50,
    "key": "sessions"
  }
}
```

## Update a Session resource

`POST https://proxy.twilio.com/v1/Services/{ServiceSid}/Sessions/{Sid}`

Post updates to a given **Session**.

### Path parameters

```json
[{"name":"ServiceSid","in":"path","description":"The SID of the parent [Service](https://www.twilio.com/docs/proxy/api/service) of the resource to update.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KS[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The Twilio-provided string that uniquely identifies the Session resource to update.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KC[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"UpdateSessionRequest","properties":{"DateExpiry":{"type":"string","format":"date-time","description":"The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date when the Session should expire. If this is value is present, it overrides the `ttl` value."},"Ttl":{"type":"integer","description":"The time, in seconds, when the session will expire. The time is measured from the last Session create or the Session's last Interaction."},"Status":{"type":"string","enum":["open","in-progress","closed","failed","unknown"],"description":"The status of the Session. Can be: `open`, `in-progress`, `closed`, `failed`, or `unknown`.","refName":"session_enum_status","modelName":"session_enum_status"}}},"examples":{"update":{"value":{"lang":"json","value":"{\n  \"Ttl\": 3600,\n  \"Status\": \"in-progress\"\n}","meta":"","code":"{\n  \"Ttl\": 3600,\n  \"Status\": \"in-progress\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Ttl\"","#7EE787"],[":","#C9D1D9"]," ",["3600","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"Status\"","#7EE787"],[":","#C9D1D9"]," ",["\"in-progress\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Update a Session

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateSession() {
  const session = await client.proxy.v1
    .services("KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .sessions("KCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .update({
      dateExpiry: new Date("2009-07-06 20:30:00"),
      status: "in-progress",
    });

  console.log(session.sid);
}

updateSession();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client
from datetime import datetime

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

session = (
    client.proxy.v1.services("KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .sessions("KCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .update(date_expiry=datetime(2009, 7, 6, 20, 30, 0), status="in-progress")
)

print(session.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Proxy.V1.Service;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var session = await SessionResource.UpdateAsync(
            dateExpiry: new DateTime(2009, 7, 6, 20, 30, 0, DateTimeKind.Utc),
            status: SessionResource.StatusEnum.InProgress,
            pathServiceSid: "KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            pathSid: "KCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(session.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.time.ZoneId;
import java.time.ZonedDateTime;
import com.twilio.Twilio;
import com.twilio.rest.proxy.v1.service.Session;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Session session = Session.updater("KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "KCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                              .setDateExpiry(ZonedDateTime.of(2009, 7, 6, 20, 30, 0, 0, ZoneId.of("UTC")))
                              .setStatus(Session.Status.IN_PROGRESS)
                              .update();

        System.out.println(session.getSid());
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
	"time"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &proxy.UpdateSessionParams{}
	params.SetDateExpiry(time.Date(2009, 7, 6, 20, 30, 0, 0, time.UTC))
	params.SetStatus("in-progress")

	resp, err := client.ProxyV1.UpdateSession("KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		"KCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

$session = $twilio->proxy->v1
    ->services("KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->sessions("KCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->update([
        "dateExpiry" => new \DateTime("2009-07-06T20:30:00Z"),
        "status" => "in-progress",
    ]);

print $session->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

session = @client
          .proxy
          .v1
          .services('KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
          .sessions('KCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
          .update(
            date_expiry: Time.new(2009, 7, 6, 20, 30, 0),
            status: 'in-progress'
          )

puts session.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:proxy:v1:services:sessions:update \
   --service-sid KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --sid KCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --date-expiry 2016-07-31 \
   --status in-progress
```

```bash
curl -X POST "https://proxy.twilio.com/v1/Services/KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Sessions/KCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
--data-urlencode "DateExpiry=2016-07-31" \
--data-urlencode "Status=in-progress" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "service_sid": "KSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "status": "in-progress",
  "unique_name": "Order #1234",
  "date_started": "2015-07-30T20:00:00Z",
  "date_ended": "2015-07-30T20:00:00Z",
  "date_last_interaction": "2015-07-30T20:00:00Z",
  "date_expiry": "2009-07-06T20:30:00Z",
  "ttl": 3600,
  "mode": "voice-and-message",
  "closed_reason": "",
  "sid": "KCXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "date_updated": "2015-07-30T20:00:00Z",
  "date_created": "2015-07-30T20:00:00Z",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions/KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "interactions": "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions/KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Interactions",
    "participants": "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions/KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants"
  }
}
```

## Delete a Session resource

`DELETE https://proxy.twilio.com/v1/Services/{ServiceSid}/Sessions/{Sid}`

Deleting a **Session** removes it permanently. Related Participants and Interactions will also be deleted.

> \[!CAUTION]
>
> Any Message or Call logs created during interactions for this **Session** will be deleted automatically after 90 days of the Session being closed, as per our [Session retention policy](/docs/proxy/proxy-changelog#20191118). If you want to delete these resources before then, you must issue `DELETE` requests for the inbound and outbound resources of all child [Interactions](/docs/proxy/api/interaction) directly. Once you have deleted a Session, those resource SIDs will not be discoverable via Proxy.

### Path parameters

```json
[{"name":"ServiceSid","in":"path","description":"The SID of the parent [Service](https://www.twilio.com/docs/proxy/api/service) of the resource to delete.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KS[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The Twilio-provided string that uniquely identifies the Session resource to delete.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KC[0-9a-fA-F]{32}$"},"required":true}]
```

Delete a specific Session

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function deleteSession() {
  await client.proxy.v1
    .services("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .sessions("KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .remove();
}

deleteSession();
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
).delete()
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Proxy.V1.Service;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        await SessionResource.DeleteAsync(
            pathServiceSid: "KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.proxy.v1.service.Session;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Session.deleter("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete();
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

	err := client.ProxyV1.DeleteSession("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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
  .delete
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:proxy:v1:services:sessions:remove \
   --service-sid KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X DELETE "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions/KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```
