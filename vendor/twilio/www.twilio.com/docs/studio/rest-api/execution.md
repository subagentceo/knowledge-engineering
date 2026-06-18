# Execution Resource

An **Execution** represents a specific person's run through a Flow. An execution is *active* while the user is in the Flow, and it is considered *ended* when they stop or are kicked out of the Flow.

To authenticate requests to the Twilio APIs, Twilio supports [HTTP Basic authentication](https://en.wikipedia.org/wiki/Basic_access_authentication). Use your *API key* as the username and your *API key secret* as the password. You can create an API key either [in the Twilio Console](/docs/iam/api-keys/keys-in-console) or [using the API](/docs/iam/api-keys/key-resource-v1).

**Note**: Twilio recommends using API keys for authentication in production apps. For local testing, you can use your Account SID as the username and your Auth token as the password. You can find your Account SID and Auth Token in the [Twilio Console](https://www.twilio.com/console).

Learn more about [Twilio API authentication](/docs/usage/requests-to-twilio).

> \[!WARNING]
>
> When triggering flows with the API, don't forget to also configure your Twilio Phone Number with your Studio Flow. If you don't configure the phone number, users won't be able to reply to your messages or call back to your IVR.

> \[!CAUTION]
>
> The `contact_sid` property has been deprecated and will be replaced with a static placeholder value in the v1 API. Use `contact_channel_address` instead to uniquely track contacts. For the best experience and latest features, [upgrade to the v2 API](/docs/studio/rest-api/v2).

## Subscribe to Real-time Studio Events

[Try Studio Events](https://www.twilio.com/docs/studio/user-guide#subscribing-to-flow-events-with-event-streams)

You can now subscribe to Studio Events for Executions and Steps instead of polling via the REST API. Simplify your data ingestion with [Event Streams for Studio](/docs/studio/user-guide#subscribing-to-flow-events-with-event-streams).

## Execution Properties

<OperationTable type="properties" data={{"type":"object","refName":"studio.v1.flow.execution","modelName":"studio_v1_flow_execution","properties":{"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^FN[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that we created to identify the Execution resource."},"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Execution resource."},"flow_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^FW[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the Flow."},"contact_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^FC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the Contact."},"contact_channel_address":{"type":"string","nullable":true,"description":"The phone number, SIP address or Client identifier that triggered the Execution. Phone numbers are in E.164 format (e.g. +16175551212). SIP addresses are formatted as `name@company.com`. Client identifiers are formatted `client:name`.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"context":{"nullable":true,"description":"The current state of the Flow's Execution. As a flow executes, we save its state in this context. We save data that your widgets can access as variables in configuration fields or in text areas as variable substitution.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"status":{"type":"string","enum":["active","ended"],"description":"The status of the Execution. Can be: `active` or `ended`.","refName":"execution_enum_status","modelName":"execution_enum_status"},"date_created":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was created specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"date_updated":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was last updated specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the resource."},"links":{"type":"object","format":"uri-map","nullable":true,"description":"The URLs of nested resources."}}}} />

## Create a new execution

`POST https://studio.twilio.com/v1/Flows/{FlowSid}/Executions`

> \[!WARNING]
>
> **Studio Rate Limits**\
> Be sure to review [Studio's rate limits](/docs/studio/user-guide/studio-faq#rate-limits) when building your application.

### Path parameters

```json
[{"name":"FlowSid","in":"path","description":"The SID of the Excecution's Flow.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^FW[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"CreateExecutionRequest","required":["To","From"],"properties":{"To":{"type":"string","format":"phone-number","description":"The Contact phone number to start a Studio Flow Execution, available as variable `{{contact.channel.address}}`."},"From":{"type":"string","format":"phone-number","description":"The Twilio phone number to send messages or initiate calls from during the Flow's Execution. Available as variable `{{flow.channel.address}}`. For SMS, this can also be a Messaging Service SID."},"Parameters":{"description":"JSON data that will be added to the Flow's context and that can be accessed as variables inside your Flow. For example, if you pass in `Parameters={\"name\":\"Zeke\"}`, a widget in your Flow can reference the variable `{{flow.data.name}}`, which returns \"Zeke\". Note: the JSON value must explicitly be passed as a string, not as a hash object. Depending on your particular HTTP library, you may need to add quotes or URL encode the JSON string."}}},"examples":{"create":{"value":{"lang":"json","value":"{\n  \"To\": \"+18001234567\",\n  \"From\": \"+18007654321\",\n  \"Parameters\": \"{\\\"first_name\\\":\\\"Foo\\\"}\"\n}","meta":"","code":"{\n  \"To\": \"+18001234567\",\n  \"From\": \"+18007654321\",\n  \"Parameters\": \"{\\\"first_name\\\":\\\"Foo\\\"}\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"To\"","#7EE787"],[":","#C9D1D9"]," ",["\"+18001234567\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"From\"","#7EE787"],[":","#C9D1D9"]," ",["\"+18007654321\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Parameters\"","#7EE787"],[":","#C9D1D9"]," ",["\"{","#A5D6FF"],["\\\"","#79C0FF"],["first_name","#A5D6FF"],["\\\"","#79C0FF"],[":","#A5D6FF"],["\\\"","#79C0FF"],["Foo","#A5D6FF"],["\\\"","#79C0FF"],["}\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Create Execution

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createExecution() {
  const execution = await client.studio.v1
    .flows("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .executions.create({
      from: "+15017122661",
      to: "+15558675310",
    });

  console.log(execution.sid);
}

createExecution();
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

execution = client.studio.v1.flows(
    "FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).executions.create(to="+15558675310", from_="+15017122661")

print(execution.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Studio.V1.Flow;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var execution = await ExecutionResource.CreateAsync(
            to: new Twilio.Types.PhoneNumber("+15558675310"),
            from: new Twilio.Types.PhoneNumber("+15017122661"),
            pathFlowSid: "FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(execution.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.type.PhoneNumber;
import com.twilio.Twilio;
import com.twilio.rest.studio.v1.flow.Execution;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Execution execution = Execution
                                  .creator("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                                      new com.twilio.type.PhoneNumber("+15558675310"),
                                      new com.twilio.type.PhoneNumber("+15017122661"))
                                  .create();

        System.out.println(execution.getSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	studio "github.com/twilio/twilio-go/rest/studio/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &studio.CreateExecutionParams{}
	params.SetTo("+15558675310")
	params.SetFrom("+15017122661")

	resp, err := client.StudioV1.CreateExecution("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

$execution = $twilio->studio->v1
    ->flows("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->executions->create(
        "+15558675310", // To
        "+15017122661" // From
    );

print $execution->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

execution = @client
            .studio
            .v1
            .flows('FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
            .executions
            .create(
              to: '+15558675310',
              from: '+15017122661'
            )

puts execution.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:studio:v1:flows:executions:create \
   --flow-sid FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --to +15558675310 \
   --from +15017122661
```

```bash
curl -X POST "https://studio.twilio.com/v1/Flows/FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Executions" \
--data-urlencode "To=+15558675310" \
--data-urlencode "From=+15017122661" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "url": "https://studio.twilio.com/v1/Flows/FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Executions/FNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "FNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "flow_sid": "FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "context": {},
  "contact_sid": "FCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "contact_channel_address": "+18001234567",
  "status": "active",
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "links": {
    "steps": "https://studio.twilio.com/v1/Flows/FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Executions/FNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Steps",
    "execution_context": "https://studio.twilio.com/v1/Flows/FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Executions/FNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Context"
  }
}
```

Create an Execution with custom parameters

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createExecution() {
  const execution = await client.studio.v1
    .flows("FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .executions.create({
      from: "+14155552344",
      parameters: {
        foo: "bar",
      },
      to: "+14155552345",
    });

  console.log(execution.sid);
}

createExecution();
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

execution = client.studio.v1.flows(
    "FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).executions.create(
    parameters={"foo": "bar"}, to="+14155552345", from_="+14155552344"
)

print(execution.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Studio.V1.Flow;
using System.Threading.Tasks;
using System.Collections.Generic;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var execution = await ExecutionResource.CreateAsync(
            parameters: new Dictionary<string, Object>() { { "foo", "bar" } },
            to: new Twilio.Types.PhoneNumber("+14155552345"),
            from: new Twilio.Types.PhoneNumber("+14155552344"),
            pathFlowSid: "FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(execution.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.type.PhoneNumber;
import java.util.HashMap;
import com.twilio.Twilio;
import com.twilio.rest.studio.v1.flow.Execution;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Execution execution = Execution
                                  .creator("FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                                      new com.twilio.type.PhoneNumber("+14155552345"),
                                      new com.twilio.type.PhoneNumber("+14155552344"))
                                  .setParameters(new HashMap<String, Object>() {
                                      {
                                          put("foo", "bar");
                                      }
                                  })
                                  .create();

        System.out.println(execution.getSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	studio "github.com/twilio/twilio-go/rest/studio/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &studio.CreateExecutionParams{}
	params.SetParameters(map[string]interface{}{
		"foo": "bar",
	})
	params.SetTo("+14155552345")
	params.SetFrom("+14155552344")

	resp, err := client.StudioV1.CreateExecution("FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$execution = $twilio->studio->v1
    ->flows("FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->executions->create(
        "+14155552345", // To
        "+14155552344", // From
        [
            "parameters" => [
                "foo" => "bar",
            ],
        ]
    );

print $execution->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

execution = @client
            .studio
            .v1
            .flows('FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
            .executions
            .create(
              parameters: {
                'foo' => 'bar'
              },
              to: '+14155552345',
              from: '+14155552344'
            )

puts execution.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:studio:v1:flows:executions:create \
   --flow-sid FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --parameters "{\"foo\":\"bar\"}" \
   --to +14155552345 \
   --from +14155552344
```

```bash
PARAMETERS_OBJ=$(cat << EOF
{
  "foo": "bar"
}
EOF
)
curl -X POST "https://studio.twilio.com/v1/Flows/FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Executions" \
--data-urlencode "Parameters=$PARAMETERS_OBJ" \
--data-urlencode "To=+14155552345" \
--data-urlencode "From=+14155552344" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "url": "https://studio.twilio.com/v1/Flows/FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Executions/FNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "FNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "flow_sid": "FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "context": {},
  "contact_sid": "FCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "contact_channel_address": "+18001234567",
  "status": "active",
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "links": {
    "steps": "https://studio.twilio.com/v1/Flows/FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Executions/FNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Steps",
    "execution_context": "https://studio.twilio.com/v1/Flows/FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Executions/FNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Context"
  }
}
```

## Fetch a single execution

`GET https://studio.twilio.com/v1/Flows/{FlowSid}/Executions/{Sid}`

### Path parameters

```json
[{"name":"FlowSid","in":"path","description":"The SID of the Flow with the Execution resource to fetch","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^FW[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The SID of the Execution resource to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^FN[0-9a-fA-F]{32}$"},"required":true}]
```

Fetch Execution

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchExecution() {
  const execution = await client.studio.v1
    .flows("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .executions("FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .fetch();

  console.log(execution.sid);
}

fetchExecution();
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

execution = (
    client.studio.v1.flows("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .executions("FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .fetch()
)

print(execution.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Studio.V1.Flow;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var execution = await ExecutionResource.FetchAsync(
            pathFlowSid: "FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            pathSid: "FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(execution.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.studio.v1.flow.Execution;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Execution execution =
            Execution.fetcher("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").fetch();

        System.out.println(execution.getSid());
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

	resp, err := client.StudioV1.FetchExecution("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		"FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
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

$execution = $twilio->studio->v1
    ->flows("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->executions("FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->fetch();

print $execution->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

execution = @client
            .studio
            .v1
            .flows('FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
            .executions('FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
            .fetch

puts execution.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:studio:v1:flows:executions:fetch \
   --flow-sid FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --sid FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X GET "https://studio.twilio.com/v1/Flows/FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Executions/FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "flow_sid": "FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "contact_sid": "FCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "contact_channel_address": "+14155555555",
  "status": "ended",
  "context": {},
  "date_created": "2017-11-06T12:00:00Z",
  "date_updated": null,
  "url": "https://studio.twilio.com/v1/Flows/FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Executions/FNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "steps": "https://studio.twilio.com/v1/Flows/FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Executions/FNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Steps",
    "execution_context": "https://studio.twilio.com/v1/Flows/FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Executions/FNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Context"
  }
}
```

## Read a list of executions

`GET https://studio.twilio.com/v1/Flows/{FlowSid}/Executions`

Execution resources are listed in reverse chronological order (most recent is first).

### Path parameters

```json
[{"name":"FlowSid","in":"path","description":"The SID of the Flow with the Execution resources to read.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^FW[0-9a-fA-F]{32}$"},"required":true}]
```

### Query parameters

```json
[{"name":"DateCreatedFrom","in":"query","description":"Only show Execution resources starting on or after this [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date-time, given as `YYYY-MM-DDThh:mm:ss-hh:mm`.","schema":{"type":"string","format":"date-time"}},{"name":"DateCreatedTo","in":"query","description":"Only show Execution resources starting before this [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date-time, given as `YYYY-MM-DDThh:mm:ss-hh:mm`.","schema":{"type":"string","format":"date-time"}},{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

Read Execution

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listExecution() {
  const executions = await client.studio.v1
    .flows("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .executions.list({ limit: 20 });

  executions.forEach((e) => console.log(e.sid));
}

listExecution();
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

executions = client.studio.v1.flows(
    "FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).executions.list(limit=20)

for record in executions:
    print(record.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Studio.V1.Flow;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var executions = await ExecutionResource.ReadAsync(
            pathFlowSid: "FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", limit: 20);

        foreach (var record in executions) {
            Console.WriteLine(record.Sid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.studio.v1.flow.Execution;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Execution> executions = Execution.reader("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").limit(20).read();

        for (Execution record : executions) {
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
	studio "github.com/twilio/twilio-go/rest/studio/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &studio.ListExecutionParams{}
	params.SetLimit(20)

	resp, err := client.StudioV1.ListExecution("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

$executions = $twilio->studio->v1
    ->flows("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->executions->read([], 20);

foreach ($executions as $record) {
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

executions = @client
             .studio
             .v1
             .flows('FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
             .executions
             .list(limit: 20)

executions.each do |record|
   puts record.sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:studio:v1:flows:executions:list \
   --flow-sid FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X GET "https://studio.twilio.com/v1/Flows/FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Executions?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "meta": {
    "previous_page_url": null,
    "next_page_url": null,
    "url": "https://studio.twilio.com/v1/Flows/FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Executions?PageSize=50&Page=0",
    "page": 0,
    "first_page_url": "https://studio.twilio.com/v1/Flows/FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Executions?PageSize=50&Page=0",
    "page_size": 50,
    "key": "executions"
  },
  "executions": []
}
```

Read Executions Filtered by Date

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listExecution() {
  const executions = await client.studio.v1
    .flows("FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .executions.list({
      dateCreatedFrom: new Date("2019-02-17 00:00:00"),
      dateCreatedTo: new Date("2019-02-18 00:00:00"),
      limit: 20,
    });

  executions.forEach((e) => console.log(e.sid));
}

listExecution();
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

executions = client.studio.v1.flows(
    "FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).executions.list(
    date_created_from=datetime(2019, 2, 17, 0, 0, 0),
    date_created_to=datetime(2019, 2, 18, 0, 0, 0),
    limit=20,
)

for record in executions:
    print(record.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Studio.V1.Flow;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var executions = await ExecutionResource.ReadAsync(
            pathFlowSid: "FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            dateCreatedFrom: new DateTime(2019, 2, 17, 0, 0, 0, DateTimeKind.Utc),
            dateCreatedTo: new DateTime(2019, 2, 18, 0, 0, 0, DateTimeKind.Utc),
            limit: 20);

        foreach (var record in executions) {
            Console.WriteLine(record.Sid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.time.ZoneId;
import java.time.ZonedDateTime;
import com.twilio.Twilio;
import com.twilio.rest.studio.v1.flow.Execution;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Execution> executions =
            Execution.reader("FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                .setDateCreatedFrom(ZonedDateTime.of(2019, 2, 17, 0, 0, 0, 0, ZoneId.of("UTC")))
                .setDateCreatedTo(ZonedDateTime.of(2019, 2, 18, 0, 0, 0, 0, ZoneId.of("UTC")))
                .limit(20)
                .read();

        for (Execution record : executions) {
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
	studio "github.com/twilio/twilio-go/rest/studio/v1"
	"os"
	"time"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &studio.ListExecutionParams{}
	params.SetDateCreatedFrom(time.Date(2019, 2, 17, 0, 0, 0, 0, time.UTC))
	params.SetDateCreatedTo(time.Date(2019, 2, 18, 0, 0, 0, 0, time.UTC))
	params.SetLimit(20)

	resp, err := client.StudioV1.ListExecution("FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$executions = $twilio->studio->v1
    ->flows("FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->executions->read(
        [
            "dateCreatedFrom" => new \DateTime("2019-02-17T00:00:00Z"),
            "dateCreatedTo" => new \DateTime("2019-02-18T00:00:00Z"),
        ],
        20
    );

foreach ($executions as $record) {
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

executions = @client
             .studio
             .v1
             .flows('FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
             .executions
             .list(
               date_created_from: Time.new(2019, 2, 17, 0, 0, 0),
               date_created_to: Time.new(2019, 2, 18, 0, 0, 0),
               limit: 20
             )

executions.each do |record|
   puts record.sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:studio:v1:flows:executions:list \
   --flow-sid FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --date-created-from 2016-07-31 \
   --date-created-to 2016-07-31
```

```bash
curl -X GET "https://studio.twilio.com/v1/Flows/FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Executions?DateCreatedFrom=2016-07-31&DateCreatedTo=2016-07-31&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "meta": {
    "previous_page_url": null,
    "next_page_url": null,
    "url": "https://studio.twilio.com/v1/Flows/FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Executions?PageSize=50&Page=0",
    "page": 0,
    "first_page_url": "https://studio.twilio.com/v1/Flows/FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Executions?PageSize=50&Page=0",
    "page_size": 50,
    "key": "executions"
  },
  "executions": []
}
```

## Update an Execution

`POST https://studio.twilio.com/v1/Flows/{FlowSid}/Executions/{Sid}`

An active Execution can be updated to "ended" using the REST API. Once ended, subsequent widgets in the Flow are not processed, and any new events that Studio receives for that Execution are rejected.

### Path parameters

```json
[{"name":"FlowSid","in":"path","description":"The SID of the Flow with the Execution resources to update.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^FW[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The SID of the Execution resource to update.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^FN[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"UpdateExecutionRequest","required":["Status"],"properties":{"Status":{"type":"string","enum":["active","ended"],"description":"The status of the Execution. Can be: `active` or `ended`.","refName":"execution_enum_status","modelName":"execution_enum_status"}}},"examples":{"update":{"value":{"lang":"json","value":"{\n  \"Status\": \"ended\"\n}","meta":"","code":"{\n  \"Status\": \"ended\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Status\"","#7EE787"],[":","#C9D1D9"]," ",["\"ended\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

End an Active Execution

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateExecution() {
  const execution = await client.studio.v1
    .flows("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .executions("FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .update({ status: "ended" });

  console.log(execution.sid);
}

updateExecution();
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

execution = (
    client.studio.v1.flows("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .executions("FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .update(status="ended")
)

print(execution.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Studio.V1.Flow;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var execution = await ExecutionResource.UpdateAsync(
            status: ExecutionResource.StatusEnum.Ended,
            pathFlowSid: "FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            pathSid: "FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(execution.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.studio.v1.flow.Execution;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Execution execution =
            Execution
                .updater(
                    "FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", Execution.Status.ENDED)
                .update();

        System.out.println(execution.getSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	studio "github.com/twilio/twilio-go/rest/studio/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &studio.UpdateExecutionParams{}
	params.SetStatus("ended")

	resp, err := client.StudioV1.UpdateExecution("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		"FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

$execution = $twilio->studio->v1
    ->flows("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->executions("FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->update(
        "ended" // Status
    );

print $execution->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

execution = @client
            .studio
            .v1
            .flows('FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
            .executions('FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
            .update(status: 'ended')

puts execution.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:studio:v1:flows:executions:update \
   --flow-sid FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --sid FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --status ended
```

```bash
curl -X POST "https://studio.twilio.com/v1/Flows/FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Executions/FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
--data-urlencode "Status=ended" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "url": "https://studio.twilio.com/v1/Flows/FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Executions/FNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "flow_sid": "FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "context": {},
  "contact_sid": "FCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "contact_channel_address": "+14155555555",
  "status": "ended",
  "date_created": "2017-11-06T12:00:00Z",
  "date_updated": "2017-11-06T12:00:00Z",
  "links": {
    "steps": "https://studio.twilio.com/v1/Flows/FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Executions/FNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Steps",
    "execution_context": "https://studio.twilio.com/v1/Flows/FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Executions/FNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Context"
  }
}
```

## Delete an execution

`DELETE https://studio.twilio.com/v1/Flows/{FlowSid}/Executions/{Sid}`

### Path parameters

```json
[{"name":"FlowSid","in":"path","description":"The SID of the Flow with the Execution resources to delete.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^FW[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The SID of the Execution resource to delete.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^FN[0-9a-fA-F]{32}$"},"required":true}]
```

Delete Execution

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function deleteExecution() {
  await client.studio.v1
    .flows("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .executions("FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .remove();
}

deleteExecution();
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

client.studio.v1.flows("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").executions(
    "FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).delete()
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Studio.V1.Flow;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        await ExecutionResource.DeleteAsync(
            pathFlowSid: "FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            pathSid: "FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.studio.v1.flow.Execution;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Execution.deleter("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").delete();
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

	err := client.StudioV1.DeleteExecution("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		"FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
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

$twilio->studio->v1
    ->flows("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->executions("FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
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
  .studio
  .v1
  .flows('FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  .executions('FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  .delete
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:studio:v1:flows:executions:remove \
   --flow-sid FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --sid FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X DELETE "https://studio.twilio.com/v1/Flows/FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Executions/FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```
