# Step

A **Step** is the runtime processing of a Widget, starting when that Widget is entered. Variables get set at the end of a Step.

If you're prompting a user for a text input, when they receive the inbound SMS prompt, they are actively in a Step until they exit the Widget (send a response or timeout). If the prompt is intended to set a variable, this happens at the end.

## Subscribe to Real-time Studio Events

[Try Studio Events](https://www.twilio.com/docs/studio/user-guide#subscribing-to-flow-events-with-event-streams)

You can now subscribe to Studio Events for Executions and Steps instead of polling via the REST API. Simplify your data ingestion with [Event Streams for Studio](/docs/studio/user-guide#subscribing-to-flow-events-with-event-streams).

## Step Properties

<OperationTable type="properties" data={{"type":"object","refName":"studio.v2.flow.execution.execution_step","modelName":"studio_v2_flow_execution_execution_step","properties":{"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^FT[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that we created to identify the ExecutionStep resource."},"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the ExecutionStep resource."},"flow_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^FW[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the Flow."},"execution_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^FN[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the Step's Execution resource."},"parent_step_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^FT[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the parent Step."},"name":{"type":"string","nullable":true,"description":"The event that caused the Flow to transition to the Step."},"context":{"nullable":true,"description":"The current state of the Flow's Execution. As a flow executes, we save its state in this context. We save data that your widgets can access as variables in configuration fields or in text areas as variable substitution.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"transitioned_from":{"type":"string","nullable":true,"description":"The Widget that preceded the Widget for the Step."},"transitioned_to":{"type":"string","nullable":true,"description":"The Widget that will follow the Widget for the Step."},"type":{"type":"string","nullable":true,"description":"The type of the widget that was executed."},"date_created":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was created specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"date_updated":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was last updated specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the resource."},"links":{"type":"object","format":"uri-map","nullable":true,"description":"The URLs of related resources."}}}} />

## Fetch a step resource

`GET https://studio.twilio.com/v2/Flows/{FlowSid}/Executions/{ExecutionSid}/Steps/{Sid}`

### Path parameters

```json
[{"name":"FlowSid","in":"path","description":"The SID of the Flow with the Step to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^FW[0-9a-fA-F]{32}$"},"required":true},{"name":"ExecutionSid","in":"path","description":"The SID of the Execution resource with the Step to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^FN[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The SID of the ExecutionStep resource to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^FT[0-9a-fA-F]{32}$"},"required":true}]
```

Fetch Execution Step

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchExecutionStep() {
  const step = await client.studio.v2
    .flows("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .executions("FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .steps("FTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .fetch();

  console.log(step.sid);
}

fetchExecutionStep();
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

step = (
    client.studio.v2.flows("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .executions("FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .steps("FTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .fetch()
)

print(step.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Studio.V2.Flow.Execution;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var executionStep = await ExecutionStepResource.FetchAsync(
            pathFlowSid: "FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            pathExecutionSid: "FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            pathSid: "FTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(executionStep.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.studio.v2.flow.execution.ExecutionStep;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ExecutionStep executionStep = ExecutionStep
                                          .fetcher("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                                              "FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                                              "FTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                                          .fetch();

        System.out.println(executionStep.getSid());
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

	resp, err := client.StudioV2.FetchExecutionStep("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		"FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		"FTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
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

$step = $twilio->studio->v2
    ->flows("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->executions("FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->steps("FTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->fetch();

print $step->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

step = @client
       .studio
       .v2
       .flows('FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
       .executions('FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
       .steps('FTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
       .fetch

puts step.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:studio:v2:flows:executions:steps:fetch \
   --flow-sid FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --execution-sid FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --sid FTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X GET "https://studio.twilio.com/v2/Flows/FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Executions/FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Steps/FTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "FTXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "flow_sid": "FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "execution_sid": "FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "name": "incomingRequest",
  "context": {},
  "parent_step_sid": "FTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "transitioned_from": "Trigger",
  "transitioned_to": "Ended",
  "type": "trigger",
  "date_created": "2017-11-06T12:00:00Z",
  "date_updated": null,
  "url": "https://studio.twilio.com/v2/Flows/FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Executions/FNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Steps/FTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "step_context": "https://studio.twilio.com/v2/Flows/FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Executions/FNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Steps/FTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Context"
  }
}
```

## Read a list of step resources

`GET https://studio.twilio.com/v2/Flows/{FlowSid}/Executions/{ExecutionSid}/Steps`

Step resources are listed in reverse chronological order (most recent is first).

### Path parameters

```json
[{"name":"FlowSid","in":"path","description":"The SID of the Flow with the Steps to read.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^FW[0-9a-fA-F]{32}$"},"required":true},{"name":"ExecutionSid","in":"path","description":"The SID of the Execution with the Steps to read.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^FN[0-9a-fA-F]{32}$"},"required":true}]
```

### Query parameters

```json
[{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

Read Execution Step

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listExecutionStep() {
  const steps = await client.studio.v2
    .flows("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .executions("FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .steps.list({ limit: 20 });

  steps.forEach((s) => console.log(s.sid));
}

listExecutionStep();
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

steps = (
    client.studio.v2.flows("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .executions("FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .steps.list(limit=20)
)

for record in steps:
    print(record.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Studio.V2.Flow.Execution;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var executionSteps = await ExecutionStepResource.ReadAsync(
            pathFlowSid: "FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            pathExecutionSid: "FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            limit: 20);

        foreach (var record in executionSteps) {
            Console.WriteLine(record.Sid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.studio.v2.flow.execution.ExecutionStep;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<ExecutionStep> executionSteps =
            ExecutionStep.reader("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                .limit(20)
                .read();

        for (ExecutionStep record : executionSteps) {
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
	studio "github.com/twilio/twilio-go/rest/studio/v2"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &studio.ListExecutionStepParams{}
	params.SetLimit(20)

	resp, err := client.StudioV2.ListExecutionStep("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		"FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

$steps = $twilio->studio->v2
    ->flows("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->executions("FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->steps->read(20);

foreach ($steps as $record) {
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

steps = @client
        .studio
        .v2
        .flows('FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
        .executions('FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
        .steps
        .list(limit: 20)

steps.each do |record|
   puts record.sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:studio:v2:flows:executions:steps:list \
   --flow-sid FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --execution-sid FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X GET "https://studio.twilio.com/v2/Flows/FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Executions/FNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Steps?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "meta": {
    "previous_page_url": null,
    "next_page_url": null,
    "url": "https://studio.twilio.com/v2/Flows/FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Executions/FNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Steps?PageSize=50&Page=0",
    "page": 0,
    "first_page_url": "https://studio.twilio.com/v2/Flows/FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Executions/FNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Steps?PageSize=50&Page=0",
    "page_size": 50,
    "key": "steps"
  },
  "steps": []
}
```

## Data retention and delivery

For information on data retention in Studio, please reference the [Studio User Guide](/docs/studio/user-guide). Keep in mind the following:

> \[!WARNING]
>
> Step logs are best-effort delivery. This means that the network does *not* guarantee that this data will be delivered.
