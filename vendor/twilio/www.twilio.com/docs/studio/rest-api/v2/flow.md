# Flow

**Flows** are individual workflows that you create. [Flow definitions](/docs/studio/rest-api/v2/flow-definition) are expressed as instances of a [JSON schema](/docs/studio/rest-api/v2/schemas).

> \[!NOTE]
>
> Flow definitions are `null` in the Flows List Resource. To retrieve the Flow definition, use the Fetch method.

## Flow Properties

<OperationTable type="properties" data={{"type":"object","refName":"studio.v2.flow","modelName":"studio_v2_flow","properties":{"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^FW[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that we created to identify the Flow resource."},"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Flow resource."},"author_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^US[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the User that created or last updated the Flow."},"friendly_name":{"type":"string","nullable":true,"description":"The string that you assigned to describe the Flow."},"definition":{"nullable":true,"description":"JSON representation of flow definition."},"status":{"type":"string","enum":["draft","published"],"description":"The status of the Flow. Can be: `draft` or `published`.","refName":"flow_enum_status","modelName":"flow_enum_status"},"revision":{"type":"integer","default":0,"description":"The latest revision number of the Flow's definition."},"commit_message":{"type":"string","nullable":true,"description":"Description of change made in the revision."},"valid":{"type":"boolean","nullable":true,"description":"Boolean if the flow definition is valid."},"errors":{"type":"array","nullable":true,"description":"List of error in the flow definition."},"warnings":{"type":"array","nullable":true,"description":"List of warnings in the flow definition."},"date_created":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was created specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"date_updated":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was last updated specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"webhook_url":{"type":"string","format":"uri","nullable":true},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the resource."},"links":{"type":"object","format":"uri-map","nullable":true,"description":"The URLs of the Flow's nested resources."}}}} />

## Create a Flow resource

`POST https://studio.twilio.com/v2/Flows`

### Request body parameters

```json
{"schema":{"type":"object","title":"CreateFlowRequest","required":["FriendlyName","Status","Definition"],"properties":{"FriendlyName":{"type":"string","description":"The string that you assigned to describe the Flow."},"Status":{"type":"string","enum":["draft","published"],"description":"The status of the Flow. Can be: `draft` or `published`.","refName":"flow_enum_status","modelName":"flow_enum_status"},"Definition":{"description":"JSON representation of flow definition."},"CommitMessage":{"type":"string","description":"Description of change made in the revision."},"AuthorSid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^US[0-9a-fA-F]{32}$","description":"The SID of the User that created the Flow."}}},"examples":{"create":{"value":{"lang":"json","value":"{\n  \"FriendlyName\": \"Test Flow\",\n  \"Status\": \"published\",\n  \"Definition\": \"{\\\"initial_state\\\": \\\"Trigger\\\"}\"\n}","meta":"","code":"{\n  \"FriendlyName\": \"Test Flow\",\n  \"Status\": \"published\",\n  \"Definition\": \"{\\\"initial_state\\\": \\\"Trigger\\\"}\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"Test Flow\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Status\"","#7EE787"],[":","#C9D1D9"]," ",["\"published\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Definition\"","#7EE787"],[":","#C9D1D9"]," ",["\"{","#A5D6FF"],["\\\"","#79C0FF"],["initial_state","#A5D6FF"],["\\\"","#79C0FF"],[":","#A5D6FF"]," ",["\\\"","#79C0FF"],["Trigger","#A5D6FF"],["\\\"","#79C0FF"],["}\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Create Flow

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createFlow() {
  const flow = await client.studio.v2.flows.create({
    commitMessage: "First draft",
    definition: {
      description: "A New Flow",
      states: [
        {
          name: "Trigger",
          type: "trigger",
          transitions: [],
          properties: {
            offset: {
              x: 0,
              y: 0,
            },
          },
        },
      ],
      initial_state: "Trigger",
      flags: {
        allow_concurrent_calls: true,
      },
    },
    friendlyName: "Main IVR",
    status: "draft",
  });

  console.log(flow.sid);
}

createFlow();
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

flow = client.studio.v2.flows.create(
    friendly_name="Main IVR",
    status="draft",
    commit_message="First draft",
    definition={
        "description": "A New Flow",
        "states": [
            {
                "name": "Trigger",
                "type": "trigger",
                "transitions": [],
                "properties": {"offset": {"x": 0, "y": 0}},
            }
        ],
        "initial_state": "Trigger",
        "flags": {"allow_concurrent_calls": True},
    },
)

print(flow.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Studio.V2;
using System.Threading.Tasks;
using System.Collections.Generic;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var flow = await FlowResource.CreateAsync(
            friendlyName: "Main IVR",
            status: FlowResource.StatusEnum.Draft,
            commitMessage: "First draft",
            definition: new Dictionary<string, Object>() {
                { "description", "A New Flow" },
                { "states",
                  new List<Object> { new Dictionary<string, Object>() {
                      { "name", "Trigger" },
                      { "type", "trigger" },
                      { "transitions",
                        new List<Object> {

                        } },
                      { "properties",
                        new Dictionary<string, Object>() {
                            { "offset",
                              new Dictionary<string, Object>() { { "x", 0 }, { "y", 0 } } }
                        } }
                  } } },
                { "initial_state", "Trigger" },
                { "flags", new Dictionary<string, Object>() { { "allow_concurrent_calls", true } } }
            });

        Console.WriteLine(flow.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.util.Arrays;
import java.util.HashMap;
import com.twilio.Twilio;
import com.twilio.rest.studio.v2.Flow;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Flow flow = Flow.creator("Main IVR", Flow.Status.DRAFT, new HashMap<String, Object>() {
                            {
                                put("description", "A New Flow");
                                put("states", Arrays.asList(new HashMap<String, Object>() {
                                    {
                                        put("name", "Trigger");
                                        put("type", "trigger");
                                        put("transitions",
                                            Arrays.asList(

                                                ));
                                        put("properties", new HashMap<String, Object>() {
                                            {
                                                put("offset", new HashMap<String, Object>() {
                                                    {
                                                        put("x", 0);
                                                        put("y", 0);
                                                    }
                                                });
                                            }
                                        });
                                    }
                                }));
                                put("initial_state", "Trigger");
                                put("flags", new HashMap<String, Object>() {
                                    {
                                        put("allow_concurrent_calls", true);
                                    }
                                });
                            }
                        }).setCommitMessage("First draft").create();

        System.out.println(flow.getSid());
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

	params := &studio.CreateFlowParams{}
	params.SetFriendlyName("Main IVR")
	params.SetStatus("draft")
	params.SetCommitMessage("First draft")
	params.SetDefinition(map[string]interface{}{
		"description": "A New Flow",
		"states": []interface{}{
			map[string]interface{}{
				"name":        "Trigger",
				"type":        "trigger",
				"transitions": []interface{}{},
				"properties": map[string]interface{}{
					"offset": map[string]interface{}{
						"x": 0,
						"y": 0,
					},
				},
			},
		},
		"initial_state": "Trigger",
		"flags": map[string]interface{}{
			"allow_concurrent_calls": true,
		},
	})

	resp, err := client.StudioV2.CreateFlow(params)
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

$flow = $twilio->studio->v2->flows->create(
    "Main IVR", // FriendlyName
    "draft", // Status
    [
        "description" => "A New Flow",
        "states" => [
            [
                "name" => "Trigger",
                "type" => "trigger",
                "transitions" => [],
                "properties" => [
                    "offset" => [
                        "x" => 0,
                        "y" => 0,
                    ],
                ],
            ],
        ],
        "initial_state" => "Trigger",
        "flags" => [
            "allow_concurrent_calls" => true,
        ],
    ], // Definition
    ["commitMessage" => "First draft"]
);

print $flow->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

flow = @client
       .studio
       .v2
       .flows
       .create(
         friendly_name: 'Main IVR',
         status: 'draft',
         commit_message: 'First draft',
         definition: {
           'description' => 'A New Flow',
           'states' => [
             {
               'name' => 'Trigger',
               'type' => 'trigger',
               'transitions' => [

               ],
               'properties' => {
                 'offset' => {
                   'x' => 0,
                   'y' => 0
                 }
               }
             }
           ],
           'initial_state' => 'Trigger',
           'flags' => {
             'allow_concurrent_calls' => true
           }
         }
       )

puts flow.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:studio:v2:flows:create \
   --friendly-name "Main IVR" \
   --status draft \
   --commit-message "First draft" \
   --definition "{\"description\":\"A New Flow\",\"states\":[{\"name\":\"Trigger\",\"type\":\"trigger\",\"transitions\":[],\"properties\":{\"offset\":{\"x\":0,\"y\":0}}}],\"initial_state\":\"Trigger\",\"flags\":{\"allow_concurrent_calls\":true}}"
```

```bash
DEFINITION_OBJ=$(cat << EOF
{
  "description": "A New Flow",
  "states": [
    {
      "name": "Trigger",
      "type": "trigger",
      "transitions": [],
      "properties": {
        "offset": {
          "x": 0,
          "y": 0
        }
      }
    }
  ],
  "initial_state": "Trigger",
  "flags": {
    "allow_concurrent_calls": true
  }
}
EOF
)
curl -X POST "https://studio.twilio.com/v2/Flows" \
--data-urlencode "FriendlyName=Main IVR" \
--data-urlencode "Status=draft" \
--data-urlencode "CommitMessage=First draft" \
--data-urlencode "Definition=$DEFINITION_OBJ" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "author_sid": "USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "definition": {
    "description": "A New Flow",
    "states": [
      {
        "name": "Trigger",
        "type": "trigger",
        "transitions": [],
        "properties": {
          "offset": {
            "x": 0,
            "y": 0
          }
        }
      }
    ],
    "initial_state": "Trigger",
    "flags": {
      "allow_concurrent_calls": true
    }
  },
  "friendly_name": "Main IVR",
  "status": "draft",
  "revision": 1,
  "commit_message": "First draft",
  "valid": true,
  "errors": [],
  "warnings": [],
  "webhook_url": "http://webhooks.twilio.com/v1/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Flows/FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2017-11-06T12:00:00Z",
  "date_updated": null,
  "url": "https://studio.twilio.com/v2/Flows/FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "test_users": "https://studio.twilio.com/v2/Flows/FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TestUsers",
    "revisions": "https://studio.twilio.com/v2/Flows/FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Revisions",
    "executions": "https://studio.twilio.com/v2/Flows/FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Executions"
  }
}
```

## Fetch a Flow resource

`GET https://studio.twilio.com/v2/Flows/{Sid}`

### Path parameters

```json
[{"name":"Sid","in":"path","description":"The SID of the Flow resource to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^FW[0-9a-fA-F]{32}$"},"required":true}]
```

Fetch Flow

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchFlow() {
  const flow = await client.studio.v2
    .flows("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .fetch();

  console.log(flow.sid);
}

fetchFlow();
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

flow = client.studio.v2.flows("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").fetch()

print(flow.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Studio.V2;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var flow = await FlowResource.FetchAsync(pathSid: "FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(flow.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.studio.v2.Flow;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Flow flow = Flow.fetcher("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").fetch();

        System.out.println(flow.getSid());
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

	resp, err := client.StudioV2.FetchFlow("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
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

$flow = $twilio->studio->v2
    ->flows("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->fetch();

print $flow->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

flow = @client
       .studio
       .v2
       .flows('FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
       .fetch

puts flow.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:studio:v2:flows:fetch \
   --sid FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X GET "https://studio.twilio.com/v2/Flows/FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "author_sid": "USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "Test Flow",
  "definition": {
    "initial_state": "Trigger"
  },
  "status": "published",
  "revision": 1,
  "commit_message": "commit",
  "valid": true,
  "errors": [],
  "warnings": [],
  "webhook_url": "http://webhooks.twilio.com/v1/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Flows/FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2017-11-06T12:00:00Z",
  "date_updated": null,
  "url": "https://studio.twilio.com/v2/Flows/FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "test_users": "https://studio.twilio.com/v2/Flows/FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TestUsers",
    "revisions": "https://studio.twilio.com/v2/Flows/FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Revisions",
    "executions": "https://studio.twilio.com/v2/Flows/FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Executions"
  }
}
```

## Read multiple Flow resources

`GET https://studio.twilio.com/v2/Flows`

> \[!NOTE]
>
> Flow definitions are `null` in the Flows List Resource. To retrieve the Flow definition, use the Fetch method.

### Query parameters

```json
[{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

Read Flows

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listFlow() {
  const flows = await client.studio.v2.flows.list({ limit: 20 });

  flows.forEach((f) => console.log(f.sid));
}

listFlow();
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

flows = client.studio.v2.flows.list(limit=20)

for record in flows:
    print(record.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Studio.V2;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var flows = await FlowResource.ReadAsync(limit: 20);

        foreach (var record in flows) {
            Console.WriteLine(record.Sid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.studio.v2.Flow;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Flow> flows = Flow.reader().limit(20).read();

        for (Flow record : flows) {
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

	params := &studio.ListFlowParams{}
	params.SetLimit(20)

	resp, err := client.StudioV2.ListFlow(params)
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

$flows = $twilio->studio->v2->flows->read(20);

foreach ($flows as $record) {
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

flows = @client
        .studio
        .v2
        .flows
        .list(limit: 20)

flows.each do |record|
   puts record.sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:studio:v2:flows:list
```

```bash
curl -X GET "https://studio.twilio.com/v2/Flows?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "meta": {
    "previous_page_url": null,
    "next_page_url": null,
    "url": "https://studio.twilio.com/v2/Flows?PageSize=50&Page=0",
    "page": 0,
    "first_page_url": "https://studio.twilio.com/v2/Flows?PageSize=50&Page=0",
    "page_size": 50,
    "key": "flows"
  },
  "flows": [
    {
      "sid": "FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "author_sid": "USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "friendly_name": "Test Flow",
      "status": "published",
      "revision": 1,
      "definition": null,
      "commit_message": null,
      "valid": null,
      "errors": null,
      "warnings": null,
      "webhook_url": "http://webhooks.twilio.com/v1/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Flows/FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "date_created": "2017-11-06T12:00:00Z",
      "date_updated": "2017-11-06T12:00:00Z",
      "url": "https://studio.twilio.com/v2/Flows/FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "links": {
        "test_users": "https://studio.twilio.com/v2/Flows/FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TestUsers",
        "revisions": "https://studio.twilio.com/v2/Flows/FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Revisions",
        "executions": "https://studio.twilio.com/v2/Flows/FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Executions"
      }
    }
  ]
}
```

## Update a Flow resource

`POST https://studio.twilio.com/v2/Flows/{Sid}`

### Path parameters

```json
[{"name":"Sid","in":"path","description":"The SID of the Flow resource to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^FW[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"UpdateFlowRequest","required":["Status"],"properties":{"Status":{"type":"string","enum":["draft","published"],"description":"The status of the Flow. Can be: `draft` or `published`.","refName":"flow_enum_status","modelName":"flow_enum_status"},"FriendlyName":{"type":"string","description":"The string that you assigned to describe the Flow."},"Definition":{"description":"JSON representation of flow definition."},"CommitMessage":{"type":"string","description":"Description of change made in the revision."},"AuthorSid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^US[0-9a-fA-F]{32}$","description":"The SID of the User that created or last updated the Flow."}}},"examples":{"update":{"value":{"lang":"json","value":"{\n  \"FriendlyName\": \"Test Flow\",\n  \"Status\": \"published\",\n  \"Definition\": \"{\\\"initial_state\\\": \\\"Trigger\\\"}\"\n}","meta":"","code":"{\n  \"FriendlyName\": \"Test Flow\",\n  \"Status\": \"published\",\n  \"Definition\": \"{\\\"initial_state\\\": \\\"Trigger\\\"}\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"Test Flow\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Status\"","#7EE787"],[":","#C9D1D9"]," ",["\"published\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Definition\"","#7EE787"],[":","#C9D1D9"]," ",["\"{","#A5D6FF"],["\\\"","#79C0FF"],["initial_state","#A5D6FF"],["\\\"","#79C0FF"],[":","#A5D6FF"]," ",["\\\"","#79C0FF"],["Trigger","#A5D6FF"],["\\\"","#79C0FF"],["}\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Update Flow

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateFlow() {
  const flow = await client.studio.v2
    .flows("FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update({
      commitMessage: "Prod release v2",
      definition: {
        description: "A New Flow",
        states: [
          {
            name: "Trigger",
            type: "trigger",
            transitions: [
              {
                event: "incomingMessage",
              },
              {
                next: "say_play_1",
                event: "incomingCall",
              },
              {
                event: "incomingRequest",
              },
            ],
            properties: {
              offset: {
                x: 0,
                y: 0,
              },
            },
          },
          {
            name: "say_play_1",
            type: "say-play",
            transitions: [
              {
                event: "audioComplete",
              },
            ],
            properties: {
              offset: {
                x: 173,
                y: 212,
              },
              loop: 1,
              say: "Hello world",
            },
          },
        ],
        initial_state: "Trigger",
        flags: {
          allow_concurrent_calls: true,
        },
      },
      status: "published",
    });

  console.log(flow.sid);
}

updateFlow();
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

flow = client.studio.v2.flows("FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").update(
    status="published",
    commit_message="Prod release v2",
    definition={
        "description": "A New Flow",
        "states": [
            {
                "name": "Trigger",
                "type": "trigger",
                "transitions": [
                    {"event": "incomingMessage"},
                    {"next": "say_play_1", "event": "incomingCall"},
                    {"event": "incomingRequest"},
                ],
                "properties": {"offset": {"x": 0, "y": 0}},
            },
            {
                "name": "say_play_1",
                "type": "say-play",
                "transitions": [{"event": "audioComplete"}],
                "properties": {
                    "offset": {"x": 173, "y": 212},
                    "loop": 1,
                    "say": "Hello world",
                },
            },
        ],
        "initial_state": "Trigger",
        "flags": {"allow_concurrent_calls": True},
    },
)

print(flow.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Studio.V2;
using System.Threading.Tasks;
using System.Collections.Generic;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var flow =
            await FlowResource.UpdateAsync(
                status: FlowResource.StatusEnum.Published,
                commitMessage: "Prod release v2",
                definition: new Dictionary<
                    string,
                    Object>() { { "description", "A New Flow" }, { "states", new List<Object> { new Dictionary<string, Object>() { { "name", "Trigger" }, { "type", "trigger" }, { "transitions", new List<Object> { new Dictionary<string, Object>() { { "event", "incomingMessage" } }, new Dictionary<string, Object>() { { "next", "say_play_1" }, { "event", "incomingCall" } }, new Dictionary<string, Object>() { { "event", "incomingRequest" } } } }, { "properties", new Dictionary<string, Object>() { { "offset", new Dictionary<string, Object>() { { "x", 0 }, { "y", 0 } } } } } }, new Dictionary<string, Object>() { { "name", "say_play_1" }, { "type", "say-play" }, { "transitions", new List<Object> { new Dictionary<string, Object>() { { "event", "audioComplete" } } } }, { "properties", new Dictionary<string, Object>() { { "offset", new Dictionary<string, Object>() { { "x", 173 }, { "y", 212 } } }, { "loop", 1 }, { "say", "Hello world" } } } } } }, { "initial_state", "Trigger" }, { "flags", new Dictionary<string, Object>() { { "allow_concurrent_calls", true } } } },
                pathSid: "FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(flow.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.util.Arrays;
import java.util.HashMap;
import com.twilio.Twilio;
import com.twilio.rest.studio.v2.Flow;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Flow flow = Flow.updater("FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", Flow.Status.PUBLISHED)
                        .setCommitMessage("Prod release v2")
                        .setDefinition(new HashMap<String, Object>() {
                            {
                                put("description", "A New Flow");
                                put("states",
                                    Arrays.asList(
                                        new HashMap<String, Object>() {
                                            {
                                                put("name", "Trigger");
                                                put("type", "trigger");
                                                put("transitions",
                                                    Arrays.asList(
                                                        new HashMap<String, Object>() {
                                                            {
                                                                put("event", "incomingMessage");
                                                            }
                                                        },
                                                        new HashMap<String, Object>() {
                                                            {
                                                                put("next", "say_play_1");
                                                                put("event", "incomingCall");
                                                            }
                                                        },
                                                        new HashMap<String, Object>() {
                                                            {
                                                                put("event", "incomingRequest");
                                                            }
                                                        }));
                                                put("properties", new HashMap<String, Object>() {
                                                    {
                                                        put("offset", new HashMap<String, Object>() {
                                                            {
                                                                put("x", 0);
                                                                put("y", 0);
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        },
                                        new HashMap<String, Object>() {
                                            {
                                                put("name", "say_play_1");
                                                put("type", "say-play");
                                                put("transitions", Arrays.asList(new HashMap<String, Object>() {
                                                    {
                                                        put("event", "audioComplete");
                                                    }
                                                }));
                                                put("properties", new HashMap<String, Object>() {
                                                    {
                                                        put("offset", new HashMap<String, Object>() {
                                                            {
                                                                put("x", 173);
                                                                put("y", 212);
                                                            }
                                                        });
                                                        put("loop", 1);
                                                        put("say", "Hello world");
                                                    }
                                                });
                                            }
                                        }));
                                put("initial_state", "Trigger");
                                put("flags", new HashMap<String, Object>() {
                                    {
                                        put("allow_concurrent_calls", true);
                                    }
                                });
                            }
                        })
                        .update();

        System.out.println(flow.getSid());
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

	params := &studio.UpdateFlowParams{}
	params.SetStatus("published")
	params.SetCommitMessage("Prod release v2")
	params.SetDefinition(map[string]interface{}{
		"description": "A New Flow",
		"states": []interface{}{
			map[string]interface{}{
				"name": "Trigger",
				"type": "trigger",
				"transitions": []interface{}{
					map[string]interface{}{
						"event": "incomingMessage",
					},
					map[string]interface{}{
						"next":  "say_play_1",
						"event": "incomingCall",
					},
					map[string]interface{}{
						"event": "incomingRequest",
					},
				},
				"properties": map[string]interface{}{
					"offset": map[string]interface{}{
						"x": 0,
						"y": 0,
					},
				},
			},
			map[string]interface{}{
				"name": "say_play_1",
				"type": "say-play",
				"transitions": []interface{}{
					map[string]interface{}{
						"event": "audioComplete",
					},
				},
				"properties": map[string]interface{}{
					"offset": map[string]interface{}{
						"x": 173,
						"y": 212,
					},
					"loop": 1,
					"say":  "Hello world",
				},
			},
		},
		"initial_state": "Trigger",
		"flags": map[string]interface{}{
			"allow_concurrent_calls": true,
		},
	})

	resp, err := client.StudioV2.UpdateFlow("FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$flow = $twilio->studio->v2
    ->flows("FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->update(
        "published", // Status
        [
            "commitMessage" => "Prod release v2",
            "definition" => [
                "description" => "A New Flow",
                "states" => [
                    [
                        "name" => "Trigger",
                        "type" => "trigger",
                        "transitions" => [
                            [
                                "event" => "incomingMessage",
                            ],
                            [
                                "next" => "say_play_1",
                                "event" => "incomingCall",
                            ],
                            [
                                "event" => "incomingRequest",
                            ],
                        ],
                        "properties" => [
                            "offset" => [
                                "x" => 0,
                                "y" => 0,
                            ],
                        ],
                    ],
                    [
                        "name" => "say_play_1",
                        "type" => "say-play",
                        "transitions" => [
                            [
                                "event" => "audioComplete",
                            ],
                        ],
                        "properties" => [
                            "offset" => [
                                "x" => 173,
                                "y" => 212,
                            ],
                            "loop" => 1,
                            "say" => "Hello world",
                        ],
                    ],
                ],
                "initial_state" => "Trigger",
                "flags" => [
                    "allow_concurrent_calls" => true,
                ],
            ],
        ]
    );

print $flow->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

flow = @client
       .studio
       .v2
       .flows('FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
       .update(
         status: 'published',
         commit_message: 'Prod release v2',
         definition: {
           'description' => 'A New Flow',
           'states' => [
             {
               'name' => 'Trigger',
               'type' => 'trigger',
               'transitions' => [
                 {
                   'event' => 'incomingMessage'
                 },
                 {
                   'next' => 'say_play_1',
                   'event' => 'incomingCall'
                 },
                 {
                   'event' => 'incomingRequest'
                 }
               ],
               'properties' => {
                 'offset' => {
                   'x' => 0,
                   'y' => 0
                 }
               }
             },
             {
               'name' => 'say_play_1',
               'type' => 'say-play',
               'transitions' => [
                 {
                   'event' => 'audioComplete'
                 }
               ],
               'properties' => {
                 'offset' => {
                   'x' => 173,
                   'y' => 212
                 },
                 'loop' => 1,
                 'say' => 'Hello world'
               }
             }
           ],
           'initial_state' => 'Trigger',
           'flags' => {
             'allow_concurrent_calls' => true
           }
         }
       )

puts flow.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:studio:v2:flows:update \
   --sid FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --status published \
   --commit-message "Prod release v2" \
   --definition "{\"description\":\"A New Flow\",\"states\":[{\"name\":\"Trigger\",\"type\":\"trigger\",\"transitions\":[{\"event\":\"incomingMessage\"},{\"next\":\"say_play_1\",\"event\":\"incomingCall\"},{\"event\":\"incomingRequest\"}],\"properties\":{\"offset\":{\"x\":0,\"y\":0}}},{\"name\":\"say_play_1\",\"type\":\"say-play\",\"transitions\":[{\"event\":\"audioComplete\"}],\"properties\":{\"offset\":{\"x\":173,\"y\":212},\"loop\":1,\"say\":\"Hello world\"}}],\"initial_state\":\"Trigger\",\"flags\":{\"allow_concurrent_calls\":true}}"
```

```bash
DEFINITION_OBJ=$(cat << EOF
{
  "description": "A New Flow",
  "states": [
    {
      "name": "Trigger",
      "type": "trigger",
      "transitions": [
        {
          "event": "incomingMessage"
        },
        {
          "next": "say_play_1",
          "event": "incomingCall"
        },
        {
          "event": "incomingRequest"
        }
      ],
      "properties": {
        "offset": {
          "x": 0,
          "y": 0
        }
      }
    },
    {
      "name": "say_play_1",
      "type": "say-play",
      "transitions": [
        {
          "event": "audioComplete"
        }
      ],
      "properties": {
        "offset": {
          "x": 173,
          "y": 212
        },
        "loop": 1,
        "say": "Hello world"
      }
    }
  ],
  "initial_state": "Trigger",
  "flags": {
    "allow_concurrent_calls": true
  }
}
EOF
)
curl -X POST "https://studio.twilio.com/v2/Flows/FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
--data-urlencode "Status=published" \
--data-urlencode "CommitMessage=Prod release v2" \
--data-urlencode "Definition=$DEFINITION_OBJ" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "author_sid": "USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "definition": {
    "description": "A New Flow",
    "states": [
      {
        "name": "Trigger",
        "type": "trigger",
        "transitions": [
          {
            "event": "incomingMessage"
          },
          {
            "next": "say_play_1",
            "event": "incomingCall"
          },
          {
            "event": "incomingRequest"
          }
        ],
        "properties": {
          "offset": {
            "x": 0,
            "y": 0
          }
        }
      },
      {
        "name": "say_play_1",
        "type": "say-play",
        "transitions": [
          {
            "event": "audioComplete"
          }
        ],
        "properties": {
          "offset": {
            "x": 173,
            "y": 212
          },
          "loop": 1,
          "say": "Hello world"
        }
      }
    ],
    "initial_state": "Trigger",
    "flags": {
      "allow_concurrent_calls": true
    }
  },
  "friendly_name": "Test Flow",
  "status": "published",
  "revision": 1,
  "commit_message": "Prod release v2",
  "valid": true,
  "errors": [],
  "warnings": [],
  "webhook_url": "http://webhooks.twilio.com/v1/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Flows/FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2017-11-06T12:00:00Z",
  "date_updated": "2017-11-06T12:00:00Z",
  "url": "https://studio.twilio.com/v2/Flows/FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "test_users": "https://studio.twilio.com/v2/Flows/FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TestUsers",
    "revisions": "https://studio.twilio.com/v2/Flows/FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Revisions",
    "executions": "https://studio.twilio.com/v2/Flows/FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Executions"
  }
}
```

## Delete a Flow resource

`DELETE https://studio.twilio.com/v2/Flows/{Sid}`

### Path parameters

```json
[{"name":"Sid","in":"path","description":"The SID of the Flow resource to delete.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^FW[0-9a-fA-F]{32}$"},"required":true}]
```

Delete Flow

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function deleteFlow() {
  await client.studio.v2.flows("FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").remove();
}

deleteFlow();
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

client.studio.v2.flows("FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete()
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Studio.V2;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        await FlowResource.DeleteAsync(pathSid: "FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.studio.v2.Flow;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Flow.deleter("FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete();
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

	err := client.StudioV2.DeleteFlow("FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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

$twilio->studio->v2->flows("FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")->delete();
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
  .v2
  .flows('FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  .delete
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:studio:v2:flows:remove \
   --sid FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X DELETE "https://studio.twilio.com/v2/Flows/FWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```
