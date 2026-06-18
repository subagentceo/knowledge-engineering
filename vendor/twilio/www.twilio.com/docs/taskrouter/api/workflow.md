# Workflow Resource

Workflows control how tasks will be prioritized and routed into Queues, and how Tasks should escalate in priority or move across queues over time. Workflows are described in a simple JSON format and can be modified through the REST API or through the account portal. You can [learn more about Workflows here.](/docs/taskrouter/workflow-configuration)

You specify which Workflow should control a Task when you add the Task to the Workspace. The Workflow will manage the Task's queue and priority until it is either assigned to a Worker, removed from the queue, or modified.

When a Task is assigned to a Worker, your application will receive a callback to the Workflow's `AssignmentCallbackUrl`, and your application can then do whatever is required to deliver the Task to the worker (for example, instructing Twilio to dial the phone number of the Worker selected to receive the call). [Read more about Task assignment here.](/docs/taskrouter/handle-assignment-callbacks)

## Multiple Workflows

A Workspace can contain multiple Workflows. This allows you to have different sets of routing rules for different types of applications or situations.

For example, a call center has one group of Workers that handles both phone and chat tasks. These two Task types have different service-level targets and agent requirements. They will also originate from separate external applications. To separate application concerns, the call center creates a single Workspace with two separate Workflows, one for phone calls and the other for chat requests.

## Creating and Distributing Tasks

Whenever you add a Task to a Workspace you indicate which Workflow should route the Task. The Workflow will prioritize the task and place it into a queue, where it will be distributed to the first available Worker that has the necessary capabilities. See the Task Resource for more information.

## Handling Task Assignments with the AssignmentCallbackUrl

Every Workflow has an `AssignmentCallbackURL` property, as well as a `FallbackAssignmentCallbackUrl` in case requests to the first URL fail. When a Worker is assigned a Task, TaskRouter will make an HTTP request to this URL. Your application must handle this request to then do whatever is required to connect the Task to the Worker in your application. For example, this might mean pushing a case to an instance of an agent's web application, or dialing an agent's phone number using Twilio. See this section for [more information on handling Task Assignment callbacks.](/docs/taskrouter/handle-assignment-callbacks)

> \[!NOTE]
>
> The AssignmentCallbackUrl is not required if you are planning on using just the [JS SDK](/docs/taskrouter/js-sdk-v1). In that case, simply leave the value blank.

If we cannot hit your `AssignmentCallbackUrl` or `FallbackAssignmentCallbackUrl`, TaskRouter will automatically change your Reservation status to `canceled`. To get a better sense of how assignment callbacks work, use a tool like [Beeceptor](https://beeceptor.com) to ensure that the assignment callback is firing correctly and to examine the contents of the post.

## Workflow Properties

> \[!WARNING]
>
> Don't use the `page` query parameter with this resource. Pagination isn't supported.

<OperationTable type="properties" data={{"type":"object","refName":"taskrouter.v1.workspace.workflow","modelName":"taskrouter_v1_workspace_workflow","properties":{"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Workflow resource."},"assignment_callback_url":{"type":"string","format":"uri","nullable":true,"description":"The URL that we call when a task managed by the Workflow is assigned to a Worker. See Assignment Callback URL for more information."},"configuration":{"type":"string","nullable":true,"description":"A JSON string that contains the Workflow's configuration. See [Configuring Workflows](https://www.twilio.com/docs/taskrouter/workflow-configuration) for more information."},"date_created":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format."},"date_updated":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format."},"document_content_type":{"type":"string","nullable":true,"description":"The MIME type of the document."},"fallback_assignment_callback_url":{"type":"string","format":"uri","nullable":true,"description":"The URL that we call when a call to the `assignment_callback_url` fails."},"friendly_name":{"type":"string","nullable":true,"description":"The string that you assigned to describe the Workflow resource. For example, `Customer Support` or `2014 Election Campaign`.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WW[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that we created to identify the Workflow resource."},"task_reservation_timeout":{"type":"integer","default":0,"description":"How long TaskRouter will wait for a confirmation response from your application after it assigns a Task to a Worker. Can be up to `86,400` (24 hours) and the default is `120`."},"workspace_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the Workspace that contains the Workflow."},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the Workflow resource."},"links":{"type":"object","format":"uri-map","nullable":true,"description":"The URLs of related resources."}}}} />

## Create a Workflow resource

`POST https://taskrouter.twilio.com/v1/Workspaces/{WorkspaceSid}/Workflows`

### Path parameters

```json
[{"name":"WorkspaceSid","in":"path","description":"The SID of the Workspace that the new Workflow to create belongs to.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"CreateWorkflowRequest","required":["FriendlyName","Configuration"],"properties":{"FriendlyName":{"type":"string","description":"A descriptive string that you create to describe the Workflow resource. For example, `Inbound Call Workflow` or `2014 Outbound Campaign`.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"Configuration":{"type":"string","description":"A JSON string that contains the rules to apply to the Workflow. See [Configuring Workflows](https://www.twilio.com/docs/taskrouter/workflow-configuration) for more information."},"AssignmentCallbackUrl":{"type":"string","format":"uri","description":"The URL from your application that will process task assignment events. See [Handling Task Assignment Callback](https://www.twilio.com/docs/taskrouter/handle-assignment-callbacks) for more details."},"FallbackAssignmentCallbackUrl":{"type":"string","format":"uri","description":"The URL that we should call when a call to the `assignment_callback_url` fails."},"TaskReservationTimeout":{"type":"integer","description":"How long TaskRouter will wait for a confirmation response from your application after it assigns a Task to a Worker. Can be up to `86,400` (24 hours) and the default is `120`."}}},"examples":{"create":{"value":{"lang":"json","value":"{\n  \"AssignmentCallbackUrl\": \"http://example.com\",\n  \"Configuration\": \"configuration\",\n  \"FallbackAssignmentCallbackUrl\": \"http://example.com\",\n  \"FriendlyName\": \"friendly_name\",\n  \"TaskReservationTimeout\": 1\n}","meta":"","code":"{\n  \"AssignmentCallbackUrl\": \"http://example.com\",\n  \"Configuration\": \"configuration\",\n  \"FallbackAssignmentCallbackUrl\": \"http://example.com\",\n  \"FriendlyName\": \"friendly_name\",\n  \"TaskReservationTimeout\": 1\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"AssignmentCallbackUrl\"","#7EE787"],[":","#C9D1D9"]," ",["\"http://example.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Configuration\"","#7EE787"],[":","#C9D1D9"]," ",["\"configuration\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"FallbackAssignmentCallbackUrl\"","#7EE787"],[":","#C9D1D9"]," ",["\"http://example.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"friendly_name\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"TaskReservationTimeout\"","#7EE787"],[":","#C9D1D9"]," ",["1","#79C0FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Create a Workflow

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createWorkflow() {
  const workflow = await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .workflows.create({
      assignmentCallbackUrl: "https://example.com/",
      configuration: JSON.stringify({
        task_routing: {
          filters: [
            {
              expression: "type=='sales'",
              targets: [{ queue: "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" }],
            },
            {
              expression: "type=='marketing'",
              targets: [{ queue: "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" }],
            },
            {
              expression: "type=='support'",
              targets: [{ queue: "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" }],
            },
          ],
          default_filter: { queue: "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" },
        },
      }),
      fallbackAssignmentCallbackUrl: "https://example2.com/",
      friendlyName: "Sales, Marketing, Support Workflow",
    });

  console.log(workflow.accountSid);
}

createWorkflow();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client
import json

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

workflow = client.taskrouter.v1.workspaces(
    "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).workflows.create(
    assignment_callback_url="https://example.com/",
    fallback_assignment_callback_url="https://example2.com/",
    configuration=json.dumps(
        {
            "task_routing": {
                "filters": [
                    {
                        "expression": "type=='sales'",
                        "targets": [
                            {"queue": "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"}
                        ],
                    },
                    {
                        "expression": "type=='marketing'",
                        "targets": [
                            {"queue": "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"}
                        ],
                    },
                    {
                        "expression": "type=='support'",
                        "targets": [
                            {"queue": "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"}
                        ],
                    },
                ],
                "default_filter": {
                    "queue": "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
                },
            }
        }
    ),
    friendly_name="Sales, Marketing, Support Workflow",
)

print(workflow.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Taskrouter.V1.Workspace;
using System.Threading.Tasks;
using System.Collections.Generic;
using Newtonsoft.Json;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var workflow = await WorkflowResource.CreateAsync(
            assignmentCallbackUrl: new Uri("https://example.com/"),
            fallbackAssignmentCallbackUrl: new Uri("https://example2.com/"),
            configuration: JsonConvert.SerializeObject(
                new Dictionary<string, Object>() {
                    { "task_routing",
                      new Dictionary<string, Object>() {
                          { "filters",
                            new List<Object> {
                                new Dictionary<string, Object>() {
                                    { "expression", "type=='sales'" },
                                    { "targets",
                                      new List<Object> { new Dictionary<string, Object>() {
                                          { "queue", "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" }
                                      } } }
                                },
                                new Dictionary<string, Object>() {
                                    { "expression", "type=='marketing'" },
                                    { "targets",
                                      new List<Object> { new Dictionary<string, Object>() {
                                          { "queue", "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" }
                                      } } }
                                },
                                new Dictionary<string, Object>() {
                                    { "expression", "type=='support'" },
                                    { "targets",
                                      new List<Object> { new Dictionary<string, Object>() {
                                          { "queue", "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" }
                                      } } }
                                }
                            } },
                          { "default_filter",
                            new Dictionary<string, Object>() {
                                { "queue", "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" }
                            } }
                      } }
                },
                Formatting.Indented),
            friendlyName: "Sales, Marketing, Support Workflow",
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(workflow.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.net.URI;
import java.util.Arrays;
import java.util.HashMap;
import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.Workflow;
import org.json.JSONObject;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Workflow workflow =
            Workflow
                .creator("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                    "Sales, Marketing, Support Workflow",
                    new JSONObject(new HashMap<String, Object>() {
                        {
                            put("task_routing", new HashMap<String, Object>() {
                                {
                                    put("filters",
                                        Arrays.asList(
                                            new HashMap<String, Object>() {
                                                {
                                                    put("expression", "type=='sales'");
                                                    put("targets", Arrays.asList(new HashMap<String, Object>() {
                                                        {
                                                            put("queue", "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
                                                        }
                                                    }));
                                                }
                                            },
                                            new HashMap<String, Object>() {
                                                {
                                                    put("expression", "type=='marketing'");
                                                    put("targets", Arrays.asList(new HashMap<String, Object>() {
                                                        {
                                                            put("queue", "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
                                                        }
                                                    }));
                                                }
                                            },
                                            new HashMap<String, Object>() {
                                                {
                                                    put("expression", "type=='support'");
                                                    put("targets", Arrays.asList(new HashMap<String, Object>() {
                                                        {
                                                            put("queue", "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
                                                        }
                                                    }));
                                                }
                                            }));
                                    put("default_filter", new HashMap<String, Object>() {
                                        {
                                            put("queue", "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
                                        }
                                    });
                                }
                            });
                        }
                    }).toString())
                .setAssignmentCallbackUrl(URI.create("https://example.com/"))
                .setFallbackAssignmentCallbackUrl(URI.create("https://example2.com/"))
                .create();

        System.out.println(workflow.getAccountSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"encoding/json"
	"fmt"
	"github.com/twilio/twilio-go"
	taskrouter "github.com/twilio/twilio-go/rest/taskrouter/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	Configuration, ConfigurationError := json.Marshal(map[string]interface{}{
		"task_routing": map[string]interface{}{
			"filters": []interface{}{
				map[string]interface{}{
					"expression": "type=='sales'",
					"targets": []interface{}{
						map[string]interface{}{
							"queue": "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
						},
					},
				},
				map[string]interface{}{
					"expression": "type=='marketing'",
					"targets": []interface{}{
						map[string]interface{}{
							"queue": "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
						},
					},
				},
				map[string]interface{}{
					"expression": "type=='support'",
					"targets": []interface{}{
						map[string]interface{}{
							"queue": "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
						},
					},
				},
			},
			"default_filter": map[string]interface{}{
				"queue": "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
			},
		},
	})

	if ConfigurationError != nil {
		fmt.Println(ConfigurationError)
		os.Exit(1)
	}

	params := &taskrouter.CreateWorkflowParams{}
	params.SetAssignmentCallbackUrl("https://example.com/")
	params.SetFallbackAssignmentCallbackUrl("https://example2.com/")
	params.SetConfiguration(string(Configuration))
	params.SetFriendlyName("Sales, Marketing, Support Workflow")

	resp, err := client.TaskrouterV1.CreateWorkflow("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.AccountSid != nil {
			fmt.Println(*resp.AccountSid)
		} else {
			fmt.Println(resp.AccountSid)
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

$workflow = $twilio->taskrouter->v1
    ->workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->workflows->create(
        "Sales, Marketing, Support Workflow", // FriendlyName
        json_encode([
            "task_routing" => [
                "filters" => [
                    [
                        "expression" => "type=='sales'",
                        "targets" => [
                            [
                                "queue" => "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                            ],
                        ],
                    ],
                    [
                        "expression" => "type=='marketing'",
                        "targets" => [
                            [
                                "queue" => "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                            ],
                        ],
                    ],
                    [
                        "expression" => "type=='support'",
                        "targets" => [
                            [
                                "queue" => "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                            ],
                        ],
                    ],
                ],
                "default_filter" => [
                    "queue" => "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                ],
            ],
        ]), // Configuration
        [
            "assignmentCallbackUrl" => "https://example.com/",
            "fallbackAssignmentCallbackUrl" => "https://example2.com/",
        ]
    );

print $workflow->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

workflow = @client
           .taskrouter
           .v1
           .workspaces('WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
           .workflows
           .create(
             assignment_callback_url: 'https://example.com/',
             fallback_assignment_callback_url: 'https://example2.com/',
             configuration: {
                 'task_routing' => {
                   'filters' => [
                     {
                       'expression' => 'type==\'sales\'',
                       'targets' => [
                         {
                           'queue' => 'WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
                         }
                       ]
                     },
                     {
                       'expression' => 'type==\'marketing\'',
                       'targets' => [
                         {
                           'queue' => 'WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
                         }
                       ]
                     },
                     {
                       'expression' => 'type==\'support\'',
                       'targets' => [
                         {
                           'queue' => 'WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
                         }
                       ]
                     }
                   ],
                   'default_filter' => {
                     'queue' => 'WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
                   }
                 }
               }.to_json,
             friendly_name: 'Sales, Marketing, Support Workflow'
           )

puts workflow.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:workflows:create \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --assignment-callback-url https://example.com/ \
   --fallback-assignment-callback-url https://example2.com/ \
   --configuration "{\"task_routing\": {\"filters\": [{\"expression\": \"type=='sales'\", \"targets\": [{\"queue\": \"WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\"}]}, {\"expression\": \"type=='marketing'\", \"targets\": [{\"queue\": \"WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\"}]}, {\"expression\": \"type=='support'\", \"targets\": [{\"queue\": \"WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\"}]}], \"default_filter\": {\"queue\": \"WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\"}}}" \
   --friendly-name "Sales, Marketing, Support Workflow"
```

```bash
CONFIGURATION_OBJ=$(cat << EOF
{
  "task_routing": {
    "filters": [
      {
        "expression": "type=='sales'",
        "targets": [
          {
            "queue": "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
          }
        ]
      },
      {
        "expression": "type=='marketing'",
        "targets": [
          {
            "queue": "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
          }
        ]
      },
      {
        "expression": "type=='support'",
        "targets": [
          {
            "queue": "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
          }
        ]
      }
    ],
    "default_filter": {
      "queue": "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    }
  }
}
EOF
)
curl -X POST "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workflows" \
--data-urlencode "AssignmentCallbackUrl=https://example.com/" \
--data-urlencode "FallbackAssignmentCallbackUrl=https://example2.com/" \
--data-urlencode "Configuration=$CONFIGURATION_OBJ" \
--data-urlencode "FriendlyName=Sales, Marketing, Support Workflow" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "assignment_callback_url": "https://example.com/",
  "configuration": "{\"task_routing\": {\"filters\": [{\"expression\": \"type=='sales'\", \"targets\": [{\"queue\": \"WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\"}]}, {\"expression\": \"type=='marketing'\", \"targets\": [{\"queue\": \"WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\"}]}, {\"expression\": \"type=='support'\", \"targets\": [{\"queue\": \"WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\"}]}], \"default_filter\": {\"queue\": \"WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\"}}}",
  "date_created": "2014-05-14T10:50:02Z",
  "date_updated": "2014-05-14T23:26:06Z",
  "document_content_type": "application/json",
  "fallback_assignment_callback_url": "https://example2.com/",
  "friendly_name": "Sales, Marketing, Support Workflow",
  "sid": "WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "task_reservation_timeout": 120,
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workflows/WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workflows/WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Statistics",
    "real_time_statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workflows/WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RealTimeStatistics",
    "cumulative_statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workflows/WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/CumulativeStatistics"
  }
}
```

## Fetch a Workflow resource

`GET https://taskrouter.twilio.com/v1/Workspaces/{WorkspaceSid}/Workflows/{Sid}`

### Path parameters

```json
[{"name":"WorkspaceSid","in":"path","description":"The SID of the Workspace with the Workflow to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The SID of the Workflow resource to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WW[0-9a-fA-F]{32}$"},"required":true}]
```

Fetch a Workflow

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchWorkflow() {
  const workflow = await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .workflows("WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch();

  console.log(workflow.accountSid);
}

fetchWorkflow();
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

workflow = (
    client.taskrouter.v1.workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .workflows("WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch()
)

print(workflow.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Taskrouter.V1.Workspace;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var workflow = await WorkflowResource.FetchAsync(
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(workflow.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.Workflow;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Workflow workflow =
            Workflow.fetcher("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").fetch();

        System.out.println(workflow.getAccountSid());
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

	resp, err := client.TaskrouterV1.FetchWorkflow("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.AccountSid != nil {
			fmt.Println(*resp.AccountSid)
		} else {
			fmt.Println(resp.AccountSid)
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

$workflow = $twilio->taskrouter->v1
    ->workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->workflows("WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->fetch();

print $workflow->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

workflow = @client
           .taskrouter
           .v1
           .workspaces('WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
           .workflows('WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
           .fetch

puts workflow.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:workflows:fetch \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workflows/WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "assignment_callback_url": "http://example.com",
  "configuration": "task-routing:\\n  - filter: \\n      - 1 == 1\\n    target:\\n      - queue: WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\\n        set-priority: 0\\n",
  "date_created": "2014-05-14T10:50:02Z",
  "date_updated": "2014-05-14T23:26:06Z",
  "document_content_type": "application/json",
  "fallback_assignment_callback_url": null,
  "friendly_name": "Default Fifo Workflow",
  "sid": "WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "task_reservation_timeout": 120,
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workflows/WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workflows/WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Statistics",
    "real_time_statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workflows/WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RealTimeStatistics",
    "cumulative_statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workflows/WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/CumulativeStatistics"
  }
}
```

## Read multiple Workflow resources

`GET https://taskrouter.twilio.com/v1/Workspaces/{WorkspaceSid}/Workflows`

### Path parameters

```json
[{"name":"WorkspaceSid","in":"path","description":"The SID of the Workspace with the Workflow to read.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$"},"required":true}]
```

### Query parameters

```json
[{"name":"FriendlyName","in":"query","description":"The `friendly_name` of the Workflow resources to read.","schema":{"type":"string"},"x-twilio":{"pii":{"handling":"standard","deleteSla":30}},"examples":{"readFull":{"value":"friendly_name"},"readEmpty":{"value":"friendly_name"}}},{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

List multiple Workflows

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listWorkflow() {
  const workflows = await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .workflows.list({ limit: 20 });

  workflows.forEach((w) => console.log(w.accountSid));
}

listWorkflow();
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

workflows = client.taskrouter.v1.workspaces(
    "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).workflows.list(limit=20)

for record in workflows:
    print(record.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Taskrouter.V1.Workspace;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var workflows = await WorkflowResource.ReadAsync(
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", limit: 20);

        foreach (var record in workflows) {
            Console.WriteLine(record.AccountSid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.Workflow;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Workflow> workflows = Workflow.reader("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").limit(20).read();

        for (Workflow record : workflows) {
            System.out.println(record.getAccountSid());
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
	taskrouter "github.com/twilio/twilio-go/rest/taskrouter/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &taskrouter.ListWorkflowParams{}
	params.SetLimit(20)

	resp, err := client.TaskrouterV1.ListWorkflow("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].AccountSid != nil {
				fmt.Println(*resp[record].AccountSid)
			} else {
				fmt.Println(resp[record].AccountSid)
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

$workflows = $twilio->taskrouter->v1
    ->workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->workflows->read([], 20);

foreach ($workflows as $record) {
    print $record->accountSid;
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

workflows = @client
            .taskrouter
            .v1
            .workspaces('WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
            .workflows
            .list(limit: 20)

workflows.each do |record|
   puts record.account_sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:workflows:list \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workflows?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "meta": {
    "first_page_url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workflows?FriendlyName=friendly_name&PageSize=50&Page=0",
    "key": "workflows",
    "next_page_url": null,
    "page": 0,
    "page_size": 50,
    "previous_page_url": null,
    "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workflows?FriendlyName=friendly_name&PageSize=50&Page=0"
  },
  "workflows": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "assignment_callback_url": "http://example.com",
      "configuration": "task-routing:\\n  - filter: \\n      - 1 == 1\\n    target:\\n      - queue: WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\\n        set-priority: 0\\n",
      "date_created": "2014-05-14T10:50:02Z",
      "date_updated": "2014-05-15T16:47:51Z",
      "document_content_type": "application/json",
      "fallback_assignment_callback_url": null,
      "friendly_name": "Default Fifo Workflow",
      "sid": "WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "task_reservation_timeout": 120,
      "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workflows/WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "links": {
        "statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workflows/WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Statistics",
        "real_time_statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workflows/WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RealTimeStatistics",
        "cumulative_statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workflows/WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/CumulativeStatistics"
      },
      "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ]
}
```

## Update a Workflow resource

`POST https://taskrouter.twilio.com/v1/Workspaces/{WorkspaceSid}/Workflows/{Sid}`

Modifies a Workflow. Whenever you modify a workflow, the following will take place:

* TaskRouter validates your Workflow configuration to ensure it is syntactically correct and that all queues referenced in the document exist. If any problems are found, the update will fail, and the active Workflow will remain in place.
* Assuming there are no problems with the configuration provided, TaskRouter will use the previous Workflow to route any Tasks that were pending prior to the change. New Tasks will begin using the updated Workflow immediately.

### Path parameters

```json
[{"name":"WorkspaceSid","in":"path","description":"The SID of the Workspace with the Workflow to update.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The SID of the Workflow resource to update.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WW[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"UpdateWorkflowRequest","properties":{"FriendlyName":{"type":"string","description":"A descriptive string that you create to describe the Workflow resource. For example, `Inbound Call Workflow` or `2014 Outbound Campaign`.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"AssignmentCallbackUrl":{"type":"string","format":"uri","description":"The URL from your application that will process task assignment events. See [Handling Task Assignment Callback](https://www.twilio.com/docs/taskrouter/handle-assignment-callbacks) for more details."},"FallbackAssignmentCallbackUrl":{"type":"string","format":"uri","description":"The URL that we should call when a call to the `assignment_callback_url` fails."},"Configuration":{"type":"string","description":"A JSON string that contains the rules to apply to the Workflow. See [Configuring Workflows](https://www.twilio.com/docs/taskrouter/workflow-configuration) for more information."},"TaskReservationTimeout":{"type":"integer","description":"How long TaskRouter will wait for a confirmation response from your application after it assigns a Task to a Worker. Can be up to `86,400` (24 hours) and the default is `120`."},"ReEvaluateTasks":{"type":"string","description":"Whether or not to re-evaluate Tasks. The default is `false`, which means Tasks in the Workflow will not be processed through the assignment loop again."}}},"examples":{"update":{"value":{"lang":"json","value":"{\n  \"AssignmentCallbackUrl\": \"http://example.com\",\n  \"Configuration\": \"configuration\",\n  \"FallbackAssignmentCallbackUrl\": \"http://example.com\",\n  \"FriendlyName\": \"friendly_name\",\n  \"TaskReservationTimeout\": 1,\n  \"ReEvaluateTasks\": \"false\"\n}","meta":"","code":"{\n  \"AssignmentCallbackUrl\": \"http://example.com\",\n  \"Configuration\": \"configuration\",\n  \"FallbackAssignmentCallbackUrl\": \"http://example.com\",\n  \"FriendlyName\": \"friendly_name\",\n  \"TaskReservationTimeout\": 1,\n  \"ReEvaluateTasks\": \"false\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"AssignmentCallbackUrl\"","#7EE787"],[":","#C9D1D9"]," ",["\"http://example.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Configuration\"","#7EE787"],[":","#C9D1D9"]," ",["\"configuration\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"FallbackAssignmentCallbackUrl\"","#7EE787"],[":","#C9D1D9"]," ",["\"http://example.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"friendly_name\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"TaskReservationTimeout\"","#7EE787"],[":","#C9D1D9"]," ",["1","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"ReEvaluateTasks\"","#7EE787"],[":","#C9D1D9"]," ",["\"false\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Update a Workflow

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateWorkflow() {
  const workflow = await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .workflows("WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update({ friendlyName: "FriendlyName" });

  console.log(workflow.accountSid);
}

updateWorkflow();
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

workflow = (
    client.taskrouter.v1.workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .workflows("WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update(friendly_name="FriendlyName")
)

print(workflow.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Taskrouter.V1.Workspace;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var workflow = await WorkflowResource.UpdateAsync(
            friendlyName: "FriendlyName",
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(workflow.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.Workflow;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Workflow workflow = Workflow.updater("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                                .setFriendlyName("FriendlyName")
                                .update();

        System.out.println(workflow.getAccountSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	taskrouter "github.com/twilio/twilio-go/rest/taskrouter/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &taskrouter.UpdateWorkflowParams{}
	params.SetFriendlyName("FriendlyName")

	resp, err := client.TaskrouterV1.UpdateWorkflow("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.AccountSid != nil {
			fmt.Println(*resp.AccountSid)
		} else {
			fmt.Println(resp.AccountSid)
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

$workflow = $twilio->taskrouter->v1
    ->workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->workflows("WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->update(["friendlyName" => "FriendlyName"]);

print $workflow->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

workflow = @client
           .taskrouter
           .v1
           .workspaces('WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
           .workflows('WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
           .update(friendly_name: 'FriendlyName')

puts workflow.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:workflows:update \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --friendly-name FriendlyName
```

```bash
curl -X POST "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workflows/WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
--data-urlencode "FriendlyName=FriendlyName" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "assignment_callback_url": "http://example.com",
  "configuration": "task-routing:\\n  - filter: \\n      - 1 == 1\\n    target:\\n      - queue: WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\\n        set-priority: 0\\n",
  "date_created": "2014-05-14T10:50:02Z",
  "date_updated": "2014-05-14T23:26:06Z",
  "document_content_type": "application/json",
  "fallback_assignment_callback_url": null,
  "friendly_name": "FriendlyName",
  "sid": "WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "task_reservation_timeout": 120,
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workflows/WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workflows/WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Statistics",
    "real_time_statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workflows/WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RealTimeStatistics",
    "cumulative_statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workflows/WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/CumulativeStatistics"
  },
  "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

## Delete a Workflow resource

`DELETE https://taskrouter.twilio.com/v1/Workspaces/{WorkspaceSid}/Workflows/{Sid}`

Deletes a Workflow. Will return an error if there are any pending or reserved Tasks still being controlled by this Workflow.

### Path parameters

```json
[{"name":"WorkspaceSid","in":"path","description":"The SID of the Workspace with the Workflow to delete.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The SID of the Workflow resource to delete.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WW[0-9a-fA-F]{32}$"},"required":true}]
```

Delete a Workflow

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function deleteWorkflow() {
  await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .workflows("WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .remove();
}

deleteWorkflow();
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

client.taskrouter.v1.workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").workflows(
    "WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).delete()
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Taskrouter.V1.Workspace;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        await WorkflowResource.DeleteAsync(
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.Workflow;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Workflow.deleter("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete();
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

	err := client.TaskrouterV1.DeleteWorkflow("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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

$twilio->taskrouter->v1
    ->workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->workflows("WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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
  .taskrouter
  .v1
  .workspaces('WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  .workflows('WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  .delete
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:workflows:remove \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X DELETE "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workflows/WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```
