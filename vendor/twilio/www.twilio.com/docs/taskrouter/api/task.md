# Task Resource

A Task represents a single item of work waiting to be processed. Tasks can represent whatever type of work is important for your team. Twilio applications can create tasks from phone calls or SMS messages. Your CRM or ticketing system can generate tasks from emails or chat messages sent in by your customers. Your own applications can create custom tasks representing whatever unique work your users handle.

## Task Properties

> \[!WARNING]
>
> Don't use the `page` query parameter with this resource. Pagination isn't supported.

### Task Attributes

Every Task has attributes, allowing you to pass along whatever data is required for your application to route the task and take the appropriate action on assignment. Attributes are expressed in JSON data, for example:

```json
{
    "type": "call",
    "contact": "+15558675309",
    "customer-value": "gold",
    "task-reason": "support",
    "callSid": "CA42ed11..."
}
```

### Task Version

Tasks have a version, represented in the `ETag` header when you `POST` or `GET` the Task Resource. `ETags` are a method of showing whether a resource has changed; if the `ETag` is the same, then the resource is the same.

Tasks can also use the `If-Match` header when updating or deleting a Task Resource. If the `ETag` does not match the provided version, the operation will fail with a `412` response. You can then `GET` the latest version of the Task and try updating it again. When the `If-Match` is not provided, the Task will update without a check.

You can [read about Task Mutation and Conflict Resolution](/docs/usage/mutation-and-conflict-resolution) to learn about working with Task versions.

### Task Lifecycle

A Task does not have an explicit Lifecycle property, but it's an important concept for understanding how Tasks work. A Task's lifecycle is controlled by a Workflow, which will manage the Task's priority and find matching [Workers](/docs/taskrouter/api/worker) to handle the Task. The [Task State page](/docs/taskrouter/lifecycle-task-state) and [Workflows and Assignment page](/docs/taskrouter/lifecycle-task-workflows-and-assignment) provide more detail on the Task lifecycle.

> \[!NOTE]
>
> If you wish to update the assignment status of a task to `wrapping` or `completed` and also update its attributes, you will need to send two API requests: one for changing the assignment status, and one for updating the attributes.

<OperationTable type="properties" data={{"type":"object","refName":"taskrouter.v1.workspace.task","modelName":"taskrouter_v1_workspace_task","properties":{"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Task resource."},"age":{"type":"integer","default":0,"description":"The number of seconds since the Task was created."},"assignment_status":{"type":"string","enum":["pending","reserved","assigned","canceled","completed","wrapping"],"description":"The current status of the Task's assignment. Can be: `pending`, `reserved`, `assigned`, `canceled`, `wrapping`, or `completed`.","refName":"task_enum_status","modelName":"task_enum_status"},"attributes":{"type":"string","nullable":true,"description":"The JSON string with custom attributes of the work. **Note** If this property has been assigned a value, it will only be displayed in FETCH action that returns a single resource. Otherwise, it will be null.","x-twilio":{"pii":{"handling":"sensitive","deleteSla":30}}},"addons":{"type":"string","nullable":true,"description":"An object that contains the [Add-on](https://www.twilio.com/docs/add-ons) data for all installed Add-ons."},"date_created":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was created specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"date_updated":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was last updated specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"task_queue_entered_date":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the Task entered the TaskQueue, specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"priority":{"type":"integer","default":0,"description":"The current priority score of the Task as assigned to a Worker by the workflow. Tasks with higher priority values will be assigned before Tasks with lower values."},"reason":{"type":"string","nullable":true,"description":"The reason the Task was canceled or completed, if applicable."},"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WT[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that we created to identify the Task resource."},"task_queue_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WQ[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the TaskQueue."},"task_queue_friendly_name":{"type":"string","nullable":true,"description":"The friendly name of the TaskQueue."},"task_channel_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^TC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the TaskChannel."},"task_channel_unique_name":{"type":"string","nullable":true,"description":"The unique name of the TaskChannel."},"timeout":{"type":"integer","default":0,"description":"The amount of time in seconds that the Task can live before being assigned."},"workflow_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WW[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the Workflow that is controlling the Task."},"workflow_friendly_name":{"type":"string","nullable":true,"description":"The friendly name of the Workflow that is controlling the Task."},"workspace_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the Workspace that contains the Task."},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the Task resource."},"links":{"type":"object","format":"uri-map","nullable":true,"description":"The URLs of related resources."},"virtual_start_time":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT indicating the ordering for routing of the Task specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"ignore_capacity":{"type":"boolean","nullable":true,"description":"A boolean that indicates if the Task should respect a Worker's capacity and availability during assignment. This field can only be used when the `RoutingTarget` field is set to a Worker SID. By setting `IgnoreCapacity` to a value of `true`, `1`, or `yes`, the Task will be routed to the Worker without respecting their capacity and availability. Any other value will enforce the Worker's capacity and availability. The default value of `IgnoreCapacity` is `true` when the `RoutingTarget` is set to a Worker SID. "},"routing_target":{"type":"string","nullable":true,"description":"A SID of a Worker, Queue, or Workflow to route a Task to"}}}} />

## Create a Task resource

`POST https://taskrouter.twilio.com/v1/Workspaces/{WorkspaceSid}/Tasks`

### Path parameters

```json
[{"name":"WorkspaceSid","in":"path","description":"The SID of the Workspace that the new Task belongs to.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"CreateTaskRequest","properties":{"Timeout":{"type":"integer","description":"The amount of time in seconds the new task can live before being assigned. Can be up to a maximum of 2 weeks (1,209,600 seconds). The default value is 24 hours (86,400 seconds). On timeout, the `task.canceled` event will fire with description `Task TTL Exceeded`."},"Priority":{"type":"integer","description":"The priority to assign the new task and override the default. When supplied, the new Task will have this priority unless it matches a Workflow Target with a Priority set. When not supplied, the new Task will have the priority of the matching Workflow Target. Value can be 0 to 2^31^ (2,147,483,647)."},"TaskChannel":{"type":"string","description":"When MultiTasking is enabled, specify the TaskChannel by passing either its `unique_name` or `sid`. Default value is `default`."},"WorkflowSid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WW[0-9a-fA-F]{32}$","description":"The SID of the Workflow that you would like to handle routing for the new Task. If there is only one Workflow defined for the Workspace that you are posting the new task to, this parameter is optional."},"Attributes":{"type":"string","description":"A JSON string with the attributes of the new task. This value is passed to the Workflow's `assignment_callback_url` when the Task is assigned to a Worker. For example: `{ \"task_type\": \"call\", \"twilio_call_sid\": \"CAxxx\", \"customer_ticket_number\": \"12345\" }`.","x-twilio":{"pii":{"handling":"sensitive","deleteSla":30}}},"VirtualStartTime":{"type":"string","format":"date-time","description":"The virtual start time to assign the new task and override the default. When supplied, the new task will have this virtual start time. When not supplied, the new task will have the virtual start time equal to `date_created`. Value can't be in the future or before the year of 1900."},"RoutingTarget":{"type":"string","description":"A SID of a Worker, Queue, or Workflow to route a Task to"},"IgnoreCapacity":{"type":"string","description":"A boolean that indicates if the Task should respect a Worker's capacity and availability during assignment. This field can only be used when the `RoutingTarget` field is set to a Worker SID. By setting `IgnoreCapacity` to a value of `true`, `1`, or `yes`, the Task will be routed to the Worker without respecting their capacity and availability. Any other value will enforce the Worker's capacity and availability. The default value of `IgnoreCapacity` is `true` when the `RoutingTarget` is set to a Worker SID. "},"TaskQueueSid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WQ[0-9a-fA-F]{32}$","description":"The SID of the TaskQueue in which the Task belongs"}}},"examples":{"create":{"value":{"lang":"json","value":"{\n  \"Attributes\": \"{\\\"body\\\": \\\"attributes\\\"}\",\n  \"Priority\": 1,\n  \"Timeout\": 1,\n  \"WorkflowSid\": \"WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"TaskChannel\": \"channel\",\n  \"VirtualStartTime\": \"2014-05-14T18:50:02Z\",\n  \"IgnoreCapacity\": \"false\",\n  \"RoutingTarget\": \"WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"TaskQueueSid\": \"WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"RequiredAttention\": 0\n}","meta":"","code":"{\n  \"Attributes\": \"{\\\"body\\\": \\\"attributes\\\"}\",\n  \"Priority\": 1,\n  \"Timeout\": 1,\n  \"WorkflowSid\": \"WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"TaskChannel\": \"channel\",\n  \"VirtualStartTime\": \"2014-05-14T18:50:02Z\",\n  \"IgnoreCapacity\": \"false\",\n  \"RoutingTarget\": \"WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"TaskQueueSid\": \"WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"RequiredAttention\": 0\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Attributes\"","#7EE787"],[":","#C9D1D9"]," ",["\"{","#A5D6FF"],["\\\"","#79C0FF"],["body","#A5D6FF"],["\\\"","#79C0FF"],[":","#A5D6FF"]," ",["\\\"","#79C0FF"],["attributes","#A5D6FF"],["\\\"","#79C0FF"],["}\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Priority\"","#7EE787"],[":","#C9D1D9"]," ",["1","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"Timeout\"","#7EE787"],[":","#C9D1D9"]," ",["1","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"WorkflowSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"TaskChannel\"","#7EE787"],[":","#C9D1D9"]," ",["\"channel\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"VirtualStartTime\"","#7EE787"],[":","#C9D1D9"]," ",["\"2014-05-14T18:50:02Z\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"IgnoreCapacity\"","#7EE787"],[":","#C9D1D9"]," ",["\"false\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"RoutingTarget\"","#7EE787"],[":","#C9D1D9"]," ",["\"WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"TaskQueueSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"RequiredAttention\"","#7EE787"],[":","#C9D1D9"]," ",["0","#79C0FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Create a Task

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createTask() {
  const task = await client.taskrouter.v1
    .workspaces("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .tasks.create({
      attributes: JSON.stringify({ type: "support" }),
      workflowSid: "WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    });

  console.log(task.accountSid);
}

createTask();
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

task = client.taskrouter.v1.workspaces(
    "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).tasks.create(
    attributes=json.dumps({"type": "support"}),
    workflow_sid="WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
)

print(task.account_sid)
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

        var task = await TaskResource.CreateAsync(
            attributes: JsonConvert.SerializeObject(
                new Dictionary<string, Object>() { { "type", "support" } }, Formatting.Indented),
            workflowSid: "WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            pathWorkspaceSid: "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(task.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.util.HashMap;
import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.Task;
import org.json.JSONObject;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Task task = Task.creator("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                        .setAttributes(new JSONObject(new HashMap<String, Object>() {
                            {
                                put("type", "support");
                            }
                        }).toString())
                        .setWorkflowSid("WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                        .create();

        System.out.println(task.getAccountSid());
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

	Attributes, AttributesError := json.Marshal(map[string]interface{}{
		"type": "support",
	})

	if AttributesError != nil {
		fmt.Println(AttributesError)
		os.Exit(1)
	}

	params := &taskrouter.CreateTaskParams{}
	params.SetAttributes(string(Attributes))
	params.SetWorkflowSid("WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")

	resp, err := client.TaskrouterV1.CreateTask("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

$task = $twilio->taskrouter->v1
    ->workspaces("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->tasks->create([
        "attributes" => json_encode([
            "type" => "support",
        ]),
        "workflowSid" => "WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    ]);

print $task->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

task = @client
       .taskrouter
       .v1
       .workspaces('WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
       .tasks
       .create(
         attributes: {
             'type' => 'support'
           }.to_json,
         workflow_sid: 'WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
       )

puts task.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:tasks:create \
   --workspace-sid WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --attributes {\"type\":\"support\"} \
   --workflow-sid WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
ATTRIBUTES_OBJ=$(cat << EOF
{
  "type": "support"
}
EOF
)
curl -X POST "https://taskrouter.twilio.com/v1/Workspaces/WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Tasks" \
--data-urlencode "Attributes=$ATTRIBUTES_OBJ" \
--data-urlencode "WorkflowSid=WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "age": 25200,
  "assignment_status": "pending",
  "attributes": "{\"type\":\"support\"}",
  "date_created": "2014-05-14T18:50:02Z",
  "date_updated": "2014-05-15T07:26:06Z",
  "task_queue_entered_date": null,
  "virtual_start_time": "2014-05-14T18:50:02Z",
  "priority": 1,
  "reason": "Test Reason",
  "sid": "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "task_queue_sid": "WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "task_channel_sid": "TCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "task_channel_unique_name": "unique",
  "timeout": 60,
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "workspace_sid": "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "workflow_sid": "WWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "workflow_friendly_name": "Example Workflow",
  "task_queue_friendly_name": "Example Task Queue",
  "ignore_capacity": false,
  "routing_target": "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "addons": "{}",
  "links": {
    "task_queue": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskQueues/WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "workflow": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workflows/WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "workspace": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "reservations": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Reservations"
  }
}
```

> \[!WARNING]
>
> Please [contact us](https://help.twilio.com) if your use case will require more than 25,000 in-flight Tasks for any given Workspace. We define in-flight Tasks as all Tasks that are *not* in status `canceled` or `completed`.

## Fetch a Task resource

`GET https://taskrouter.twilio.com/v1/Workspaces/{WorkspaceSid}/Tasks/{Sid}`

### Path parameters

```json
[{"name":"WorkspaceSid","in":"path","description":"The SID of the Workspace with the Task to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The SID of the Task resource to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WT[0-9a-fA-F]{32}$"},"required":true}]
```

Fetch a Task

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchTask() {
  const task = await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .tasks("WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch();

  console.log(task.accountSid);
}

fetchTask();
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

task = (
    client.taskrouter.v1.workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .tasks("WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch()
)

print(task.account_sid)
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

        var task = await TaskResource.FetchAsync(
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(task.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.Task;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Task task = Task.fetcher("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").fetch();

        System.out.println(task.getAccountSid());
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

	resp, err := client.TaskrouterV1.FetchTask("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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

$task = $twilio->taskrouter->v1
    ->workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->tasks("WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->fetch();

print $task->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

task = @client
       .taskrouter
       .v1
       .workspaces('WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
       .tasks('WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
       .fetch

puts task.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:tasks:fetch \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "age": 25200,
  "assignment_status": "pending",
  "attributes": "{\"body\": \"hello\"}",
  "date_created": "2014-05-14T18:50:02Z",
  "date_updated": "2014-05-15T07:26:06Z",
  "task_queue_entered_date": "2014-05-14T18:50:02Z",
  "virtual_start_time": "2014-05-14T18:50:02Z",
  "priority": 0,
  "reason": "Test Reason",
  "sid": "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "task_queue_sid": "WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "task_channel_sid": "TCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "task_channel_unique_name": "task-channel",
  "timeout": 60,
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "workflow_sid": "WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "workflow_friendly_name": "Test Workflow",
  "task_queue_friendly_name": "Test Queue",
  "ignore_capacity": false,
  "routing_target": "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "addons": "{}",
  "links": {
    "task_queue": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskQueues/WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "workflow": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workflows/WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "workspace": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "reservations": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Reservations"
  }
}
```

## Read multiple Task resources

`GET https://taskrouter.twilio.com/v1/Workspaces/{WorkspaceSid}/Tasks`

### Path parameters

```json
[{"name":"WorkspaceSid","in":"path","description":"The SID of the Workspace with the Tasks to read.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$"},"required":true}]
```

### Query parameters

```json
[{"name":"Priority","in":"query","description":"The priority value of the Tasks to read. Returns the list of all Tasks in the Workspace with the specified priority.","schema":{"type":"integer"},"examples":{"readFull":{"value":1},"readEmpty":{"value":1},"readAssignmentStatusMultiple":{"value":1}}},{"name":"AssignmentStatus","in":"query","description":"The `assignment_status` of the Tasks you want to read. Can be: `pending`, `reserved`, `assigned`, `canceled`, `wrapping`, or `completed`. Returns all Tasks in the Workspace with the specified `assignment_status`.","schema":{"type":"array","items":{"type":"string"}},"examples":{"readFull":{"value":"pending,reserved"},"readEmpty":{"value":"pending"},"readAssignmentStatusMultiple":{"value":["pending","reserved"]}}},{"name":"WorkflowSid","in":"query","description":"The SID of the Workflow with the Tasks to read. Returns the Tasks controlled by the Workflow identified by this SID.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WW[0-9a-fA-F]{32}$"},"examples":{"readFull":{"value":"WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"},"readEmpty":{"value":"WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"},"readAssignmentStatusMultiple":{"value":"WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}}},{"name":"WorkflowName","in":"query","description":"The friendly name of the Workflow with the Tasks to read. Returns the Tasks controlled by the Workflow identified by this friendly name.","schema":{"type":"string"},"examples":{"readFull":{"value":"workflow_name"},"readEmpty":{"value":"workflow_name"},"readAssignmentStatusMultiple":{"value":"workflow_name"}}},{"name":"TaskQueueSid","in":"query","description":"The SID of the TaskQueue with the Tasks to read. Returns the Tasks waiting in the TaskQueue identified by this SID.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WQ[0-9a-fA-F]{32}$"},"examples":{"readFull":{"value":"WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"},"readEmpty":{"value":"WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"},"readAssignmentStatusMultiple":{"value":"WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}}},{"name":"TaskQueueName","in":"query","description":"The `friendly_name` of the TaskQueue with the Tasks to read. Returns the Tasks waiting in the TaskQueue identified by this friendly name.","schema":{"type":"string"},"examples":{"readFull":{"value":"task_queue_name"},"readEmpty":{"value":"task_queue_name"},"readAssignmentStatusMultiple":{"value":"task_queue_name"}}},{"name":"EvaluateTaskAttributes","in":"query","description":"The attributes of the Tasks to read. Returns the Tasks that match the attributes specified in this parameter.","schema":{"type":"string"}},{"name":"RoutingTarget","in":"query","description":"A SID of a Worker, Queue, or Workflow to route a Task to","schema":{"type":"string"},"examples":{"readFull":{"value":"WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"},"readEmpty":{"value":"WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"},"readAssignmentStatusMultiple":{"value":"WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}}},{"name":"Ordering","in":"query","description":"How to order the returned Task resources. By default, Tasks are sorted by ascending DateCreated. This value is specified as: `Attribute:Order`, where `Attribute` can be either `DateCreated`, `Priority`, or `VirtualStartTime` and `Order` can be either `asc` or `desc`. For example, `Priority:desc` returns Tasks ordered in descending order of their Priority. Pairings of sort orders can be specified in a comma-separated list such as `Priority:desc,DateCreated:asc`, which returns the Tasks in descending Priority order and ascending DateCreated Order. The only ordering pairing not allowed is DateCreated and VirtualStartTime.","schema":{"type":"string"}},{"name":"HasAddons","in":"query","description":"Whether to read Tasks with Add-ons. If `true`, returns only Tasks with Add-ons. If `false`, returns only Tasks without Add-ons.","schema":{"type":"boolean"}},{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

Read all Tasks

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listTask() {
  const tasks = await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .tasks.list({ limit: 20 });

  tasks.forEach((t) => console.log(t.accountSid));
}

listTask();
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

tasks = client.taskrouter.v1.workspaces(
    "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).tasks.list(limit=20)

for record in tasks:
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

        var tasks = await TaskResource.ReadAsync(
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", limit: 20);

        foreach (var record in tasks) {
            Console.WriteLine(record.AccountSid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.Task;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Task> tasks = Task.reader("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").limit(20).read();

        for (Task record : tasks) {
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

	params := &taskrouter.ListTaskParams{}
	params.SetLimit(20)

	resp, err := client.TaskrouterV1.ListTask("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$tasks = $twilio->taskrouter->v1
    ->workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->tasks->read([], 20);

foreach ($tasks as $record) {
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

tasks = @client
        .taskrouter
        .v1
        .workspaces('WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
        .tasks
        .list(limit: 20)

tasks.each do |record|
   puts record.account_sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:tasks:list \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "meta": {
    "first_page_url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks?TaskQueueSid=WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&RoutingTarget=WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&TaskQueueName=task_queue_name&WorkflowName=workflow_name&WorkflowSid=WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&AssignmentStatus=pending%2Creserved&Priority=1&PageSize=50&Page=0",
    "key": "tasks",
    "next_page_url": null,
    "page": 0,
    "page_size": 50,
    "previous_page_url": null,
    "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks?TaskQueueSid=WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&RoutingTarget=WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&TaskQueueName=task_queue_name&WorkflowName=workflow_name&WorkflowSid=WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&AssignmentStatus=pending%2Creserved&Priority=1&PageSize=50&Page=0"
  },
  "tasks": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "age": 25200,
      "assignment_status": "pending",
      "attributes": "{\"body\": \"hello\"}",
      "date_created": "2014-05-14T14:26:54Z",
      "date_updated": "2014-05-15T16:03:42Z",
      "task_queue_entered_date": "2014-05-14T14:26:54Z",
      "virtual_start_time": "2014-05-14T14:26:54Z",
      "priority": 0,
      "reason": "Test Reason",
      "sid": "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "task_queue_sid": "WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "task_channel_sid": "TCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "task_channel_unique_name": "task-channel",
      "timeout": 60,
      "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "workflow_sid": "WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "workflow_friendly_name": "Test Workflow",
      "task_queue_friendly_name": "Test Queue",
      "ignore_capacity": false,
      "routing_target": "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "addons": "{}",
      "links": {
        "task_queue": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskQueues/WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "workflow": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workflows/WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "workspace": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "reservations": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Reservations"
      }
    }
  ]
}
```

List Tasks with Filters

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listTask() {
  const tasks = await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .tasks.list({
      evaluateTaskAttributes:
        '(language == "en" OR language == "fr") AND skill_rating >= 5.1',
      limit: 20,
    });

  tasks.forEach((t) => console.log(t.accountSid));
}

listTask();
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

tasks = client.taskrouter.v1.workspaces(
    "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).tasks.list(
    evaluate_task_attributes='(language == "en" OR language == "fr") AND skill_rating >= 5.1',
    limit=20,
)

for record in tasks:
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

        var tasks = await TaskResource.ReadAsync(
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            evaluateTaskAttributes: "(language == \"en\" OR language == \"fr\") AND skill_rating >= 5.1",
            limit: 20);

        foreach (var record in tasks) {
            Console.WriteLine(record.AccountSid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.Task;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Task> tasks =
            Task.reader("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                .setEvaluateTaskAttributes("(language == \"en\" OR language == \"fr\") AND skill_rating >= 5.1")
                .limit(20)
                .read();

        for (Task record : tasks) {
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

	params := &taskrouter.ListTaskParams{}
	params.SetEvaluateTaskAttributes("(language == \"en\" OR language == \"fr\") AND skill_rating >= 5.1")
	params.SetLimit(20)

	resp, err := client.TaskrouterV1.ListTask("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$tasks = $twilio->taskrouter->v1
    ->workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->tasks->read(
        [
            "evaluateTaskAttributes" =>
                "(language == \"en\" OR language == \"fr\") AND skill_rating >= 5.1",
        ],
        20
    );

foreach ($tasks as $record) {
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

tasks = @client
        .taskrouter
        .v1
        .workspaces('WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
        .tasks
        .list(
          evaluate_task_attributes: '(language == "en" OR language == "fr") AND skill_rating >= 5.1',
          limit: 20
        )

tasks.each do |record|
   puts record.account_sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:tasks:list \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --evaluate-task-attributes "(language == \"en\" OR language == \"fr\") AND skill_rating >= 5.1"
```

```bash
curl -X GET "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks?EvaluateTaskAttributes=(language%20%3D%3D%20%22en%22%20OR%20language%20%3D%3D%20%22fr%22)%20AND%20skill_rating%20%3E%3D%205.1&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "meta": {
    "first_page_url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks?TaskQueueSid=WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&RoutingTarget=WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&TaskQueueName=task_queue_name&WorkflowName=workflow_name&WorkflowSid=WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&AssignmentStatus=pending%2Creserved&Priority=1&PageSize=50&Page=0",
    "key": "tasks",
    "next_page_url": null,
    "page": 0,
    "page_size": 50,
    "previous_page_url": null,
    "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks?TaskQueueSid=WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&RoutingTarget=WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&TaskQueueName=task_queue_name&WorkflowName=workflow_name&WorkflowSid=WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&AssignmentStatus=pending%2Creserved&Priority=1&PageSize=50&Page=0"
  },
  "tasks": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "age": 25200,
      "assignment_status": "pending",
      "attributes": "{\"body\": \"hello\"}",
      "date_created": "2014-05-14T14:26:54Z",
      "date_updated": "2014-05-15T16:03:42Z",
      "task_queue_entered_date": "2014-05-14T14:26:54Z",
      "virtual_start_time": "2014-05-14T14:26:54Z",
      "priority": 0,
      "reason": "Test Reason",
      "sid": "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "task_queue_sid": "WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "task_channel_sid": "TCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "task_channel_unique_name": "task-channel",
      "timeout": 60,
      "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "workflow_sid": "WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "workflow_friendly_name": "Test Workflow",
      "task_queue_friendly_name": "Test Queue",
      "ignore_capacity": false,
      "routing_target": "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "addons": "{}",
      "links": {
        "task_queue": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskQueues/WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "workflow": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workflows/WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "workspace": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "reservations": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Reservations"
      }
    }
  ]
}
```

> \[!NOTE]
>
> Tasks are deleted 5-8 minutes after they are canceled or completed. You can still query events that occurred for a Task via the [Events API](/docs/taskrouter/api/event).

You may use the following operators in your EvaluateTaskAttributes:

* Equality: `==`, `=`
* Inequality: `!=`
* Greater than: `>`
* Less than: `<`
* Greater than or equal to: `>=`
* Less than or equal to: `<=`
* Use parentheses to indicate precedence of operations: `( )`
* Use brackets to indicate lists/arrays: `[ ]`
* `HAS`, `>-` for determining whether the value of the Task attribute on the left-hand side of the expression contains the string on the right side of the comparison.
* `CONTAINS` - for determining whether the value of the Task attribute on the left-hand side of the expression contains the value on the right side of the comparison.
* `IN`, `<-` for determining whether the value of the Task attribute on the left-hand side of the expression is \* contained in the list on the right-hand side.
* `NOT IN`, `<-` for determining whether the value of the Task attribute on the left-hand side of the expression is \* not contained in the list on the right-hand side.
* `AND` if both the left and right subexpressions are true, resolves to true, otherwise false
* `OR` - if one or both of the left or right subexpressions are true, resolves to true, otherwise false

By default, this will return the first 50 Tasks. Supply a PageSize parameter to fetch more than 50 Tasks. See [paging](/docs/usage/twilios-response) for more information.

## Update a Task resource

`POST https://taskrouter.twilio.com/v1/Workspaces/{WorkspaceSid}/Tasks/{Sid}`

### Headers

```json
[{"name":"If-Match","in":"header","description":"If provided, applies this mutation if (and only if) the [ETag](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag) header of the Task matches the provided value. This matches the semantics of (and is implemented with) the HTTP [If-Match header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-Match).","schema":{"type":"string"}}]
```

### Path parameters

```json
[{"name":"WorkspaceSid","in":"path","description":"The SID of the Workspace with the Task to update.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The SID of the Task resource to update.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WT[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"UpdateTaskRequest","properties":{"Attributes":{"type":"string","description":"The JSON string that describes the custom attributes of the task.","x-twilio":{"pii":{"handling":"sensitive","deleteSla":30}}},"AssignmentStatus":{"type":"string","enum":["pending","reserved","assigned","canceled","completed","wrapping"],"description":"The current status of the Task's assignment. Can be: `pending`, `reserved`, `assigned`, `canceled`, `wrapping`, or `completed`.","refName":"task_enum_status","modelName":"task_enum_status"},"Reason":{"type":"string","description":"The reason that the Task was canceled or completed. This parameter is required only if the Task is canceled or completed. Setting this value queues the task for deletion and logs the reason."},"Priority":{"type":"integer","description":"The Task's new priority value. When supplied, the Task takes on the specified priority unless it matches a Workflow Target with a Priority set. Value can be 0 to 2^31^ (2,147,483,647)."},"TaskChannel":{"type":"string","description":"When MultiTasking is enabled, specify the TaskChannel with the task to update. Can be the TaskChannel's SID or its `unique_name`, such as `voice`, `sms`, or `default`."},"VirtualStartTime":{"type":"string","format":"date-time","description":"The task's new virtual start time value. When supplied, the Task takes on the specified virtual start time. Value can't be in the future or before the year of 1900."}}},"examples":{"update":{"value":{"lang":"json","value":"{\n  \"AssignmentStatus\": \"pending\",\n  \"Attributes\": \"attributes\",\n  \"Priority\": 1,\n  \"Reason\": \"reason\",\n  \"VirtualStartTime\": \"2023-08-02T12:34:56Z\",\n  \"RequiredAttention\": 0\n}","meta":"","code":"{\n  \"AssignmentStatus\": \"pending\",\n  \"Attributes\": \"attributes\",\n  \"Priority\": 1,\n  \"Reason\": \"reason\",\n  \"VirtualStartTime\": \"2023-08-02T12:34:56Z\",\n  \"RequiredAttention\": 0\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"AssignmentStatus\"","#7EE787"],[":","#C9D1D9"]," ",["\"pending\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Attributes\"","#7EE787"],[":","#C9D1D9"]," ",["\"attributes\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Priority\"","#7EE787"],[":","#C9D1D9"]," ",["1","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"Reason\"","#7EE787"],[":","#C9D1D9"]," ",["\"reason\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"VirtualStartTime\"","#7EE787"],[":","#C9D1D9"]," ",["\"2023-08-02T12:34:56Z\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"RequiredAttention\"","#7EE787"],[":","#C9D1D9"]," ",["0","#79C0FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Update a Task

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateTask() {
  const task = await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .tasks("WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update({
      assignmentStatus: "canceled",
      attributes: JSON.stringify({ type: "other" }),
      reason: "waiting too long",
    });

  console.log(task.accountSid);
}

updateTask();
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

task = (
    client.taskrouter.v1.workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .tasks("WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update(
        assignment_status="canceled",
        reason="waiting too long",
        attributes=json.dumps({"type": "other"}),
    )
)

print(task.account_sid)
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

        var task = await TaskResource.UpdateAsync(
            assignmentStatus: TaskResource.StatusEnum.Canceled,
            reason: "waiting too long",
            attributes: JsonConvert.SerializeObject(
                new Dictionary<string, Object>() { { "type", "other" } }, Formatting.Indented),
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(task.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.util.HashMap;
import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.Task;
import org.json.JSONObject;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Task task = Task.updater("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                        .setAssignmentStatus(Task.Status.CANCELED)
                        .setReason("waiting too long")
                        .setAttributes(new JSONObject(new HashMap<String, Object>() {
                            {
                                put("type", "other");
                            }
                        }).toString())
                        .update();

        System.out.println(task.getAccountSid());
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

	Attributes, AttributesError := json.Marshal(map[string]interface{}{
		"type": "other",
	})

	if AttributesError != nil {
		fmt.Println(AttributesError)
		os.Exit(1)
	}

	params := &taskrouter.UpdateTaskParams{}
	params.SetAssignmentStatus("canceled")
	params.SetReason("waiting too long")
	params.SetAttributes(string(Attributes))

	resp, err := client.TaskrouterV1.UpdateTask("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$task = $twilio->taskrouter->v1
    ->workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->tasks("WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->update([
        "assignmentStatus" => "canceled",
        "reason" => "waiting too long",
        "attributes" => json_encode([
            "type" => "other",
        ]),
    ]);

print $task->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

task = @client
       .taskrouter
       .v1
       .workspaces('WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
       .tasks('WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
       .update(
         assignment_status: 'canceled',
         reason: 'waiting too long',
         attributes: {
             'type' => 'other'
           }.to_json
       )

puts task.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:tasks:update \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --assignment-status canceled \
   --reason "waiting too long" \
   --attributes {\"type\":\"other\"}
```

```bash
ATTRIBUTES_OBJ=$(cat << EOF
{
  "type": "other"
}
EOF
)
curl -X POST "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
--data-urlencode "AssignmentStatus=canceled" \
--data-urlencode "Reason=waiting too long" \
--data-urlencode "Attributes=$ATTRIBUTES_OBJ" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "age": 25200,
  "assignment_status": "canceled",
  "attributes": "{\"type\":\"other\"}",
  "date_created": "2014-05-14T18:50:02Z",
  "date_updated": "2014-05-15T07:26:06Z",
  "task_queue_entered_date": "2014-05-14T18:50:02Z",
  "virtual_start_time": "2023-08-02T12:34:56Z",
  "priority": 0,
  "reason": "waiting too long",
  "sid": "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "task_queue_sid": "WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "task_channel_sid": "TCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "task_channel_unique_name": "task-channel",
  "timeout": 60,
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "workflow_sid": "WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "workflow_friendly_name": "Test Workflow",
  "task_queue_friendly_name": "Test Queue",
  "addons": "{}",
  "ignore_capacity": false,
  "routing_target": "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "task_queue": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskQueues/WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "workflow": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workflows/WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "workspace": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "reservations": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Reservations"
  }
}
```

When a pending Task's attributes are updated, the Task will be re-driven through the Workflow identified by the WorkflowSid associated with the task. Depending on the Workflow's filters, TaskRouter may move the Task into a different TaskQueue. The age of the Task will remain the same. If the Task is moved to a new TaskQueue, its TaskQueue position relative to other tasks will be determined by its age and priority, as usual.

Check for version match before updating a Task

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateTask() {
  const task = await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .tasks("WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update({
      assignmentStatus: "canceled",
      ifMatch: "0",
      reason: "waiting too long",
    });

  console.log(task.accountSid);
}

updateTask();
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

task = (
    client.taskrouter.v1.workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .tasks("WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update(
        assignment_status="canceled", reason="waiting too long", if_match="0"
    )
)

print(task.account_sid)
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

        var task = await TaskResource.UpdateAsync(
            ifMatch: "0",
            assignmentStatus: TaskResource.StatusEnum.Canceled,
            reason: "waiting too long",
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(task.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.Task;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Task task = Task.updater("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                        .setIfMatch("0")
                        .setAssignmentStatus(Task.Status.CANCELED)
                        .setReason("waiting too long")
                        .update();

        System.out.println(task.getAccountSid());
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

	params := &taskrouter.UpdateTaskParams{}
	params.SetAssignmentStatus("canceled")
	params.SetReason("waiting too long")
	params.SetIfMatch("0")

	resp, err := client.TaskrouterV1.UpdateTask("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$task = $twilio->taskrouter->v1
    ->workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->tasks("WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->update([
        "assignmentStatus" => "canceled",
        "reason" => "waiting too long",
        "ifMatch" => "0",
    ]);

print $task->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

task = @client
       .taskrouter
       .v1
       .workspaces('WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
       .tasks('WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
       .update(
         assignment_status: 'canceled',
         reason: 'waiting too long',
         if_match: '0'
       )

puts task.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:tasks:update \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --assignment-status canceled \
   --reason "waiting too long" \
   --if-match 0
```

```bash
curl -X POST "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
--header "If-Match: 0" \
--data-urlencode "AssignmentStatus=canceled" \
--data-urlencode "Reason=waiting too long" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "age": 25200,
  "assignment_status": "canceled",
  "attributes": "{\"body\": \"hello\"}",
  "date_created": "2014-05-14T18:50:02Z",
  "date_updated": "2014-05-15T07:26:06Z",
  "task_queue_entered_date": "2014-05-14T18:50:02Z",
  "virtual_start_time": "2023-08-02T12:34:56Z",
  "priority": 0,
  "reason": "waiting too long",
  "sid": "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "task_queue_sid": "WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "task_channel_sid": "TCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "task_channel_unique_name": "task-channel",
  "timeout": 60,
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "workflow_sid": "WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "workflow_friendly_name": "Test Workflow",
  "task_queue_friendly_name": "Test Queue",
  "addons": "{}",
  "ignore_capacity": false,
  "routing_target": "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "task_queue": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskQueues/WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "workflow": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workflows/WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "workspace": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "reservations": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Reservations"
  }
}
```

The previous version of Etag can be found in the client by accessing the following attribute:

`client.httpClient.lastResponse.headers.etag`

## Delete a Task resource

`DELETE https://taskrouter.twilio.com/v1/Workspaces/{WorkspaceSid}/Tasks/{Sid}`

Deletes the Task identified by `TaskSid.` For all pending reservations associated with the deleted Task, these will also be deleted at task deletion time.

### Headers

```json
[{"name":"If-Match","in":"header","description":"If provided, deletes this Task if (and only if) the [ETag](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag) header of the Task matches the provided value. This matches the semantics of (and is implemented with) the HTTP [If-Match header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-Match).","schema":{"type":"string"}}]
```

### Path parameters

```json
[{"name":"WorkspaceSid","in":"path","description":"The SID of the Workspace with the Task to delete.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The SID of the Task resource to delete.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WT[0-9a-fA-F]{32}$"},"required":true}]
```

Delete a Task

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function deleteTask() {
  await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .tasks("WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .remove();
}

deleteTask();
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

client.taskrouter.v1.workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").tasks(
    "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
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

        await TaskResource.DeleteAsync(
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.Task;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Task.deleter("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete();
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

	params := &taskrouter.DeleteTaskParams{}

	err := client.TaskrouterV1.DeleteTask("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		params)
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
    ->tasks("WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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
  .tasks('WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  .delete
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:tasks:remove \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X DELETE "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

Check for version match before deleting a Task

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function deleteTask() {
  await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .tasks("WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .remove({ ifMatch: "0" });
}

deleteTask();
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

client.taskrouter.v1.workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").tasks(
    "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).delete(if_match="0")
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

        await TaskResource.DeleteAsync(
            ifMatch: "0",
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.Task;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Task.deleter("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
            .setIfMatch("0")
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
	taskrouter "github.com/twilio/twilio-go/rest/taskrouter/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &taskrouter.DeleteTaskParams{}
	params.SetIfMatch("0")

	err := client.TaskrouterV1.DeleteTask("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		params)
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
    ->tasks("WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->delete(["ifMatch" => "0"]);
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
  .tasks('WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  .delete(if_match: '0')
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:tasks:remove \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --if-match 0
```

```bash
curl -X DELETE "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
--header "If-Match: 0" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```
