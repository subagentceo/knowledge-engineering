# Workspace Resource

A Workspace is a container for your [Tasks](/docs/taskrouter/api/task), [Workers](/docs/taskrouter/api/worker), [TaskQueues](/docs/taskrouter/api/task-queue), [Workflows](/docs/taskrouter/api/workflow), and [Activities](/docs/taskrouter/api/activity). Each of these items exists within a single Workspace and is not shared across Workspaces. For example, if you were using TaskRouter to distribute tasks for two separate organizations in your business, you might create a Workspace for each organization.

> \[!NOTE]
>
> A [Flex project](/docs/flex/admin-guide/what-is-twilio-flex) can only have a
> single Workspace.

A single Workspace can hold a variety of task types, priorities, and workers with a variety of capabilities. A contact center might collect waiting phone calls, pending cases, and incoming chat requests into a single Workspace. Some of the phone calls in the Workspace might require an agent who speaks English, while others require an agent who speaks Spanish. Some of the tasks might originate from high-value customers, giving them a higher priority, while other tasks can wait longer before resolution.

> \[!WARNING]
>
> While we still support the creation of a single-tasking Workspace (legacy mode) we advise you to only create multi-tasking Workspaces.
>
> We also encourage you to start the migration of all your existing single-tasking Workspaces to multi-tasking. Please be advised that once a Workspace has been migrated to multi-tasking it can longer be converted back to single-tasking.

## Workspace Properties

> \[!WARNING]
>
> Don't use the `page` query parameter with this resource. Pagination isn't supported.

<OperationTable type="properties" data={{"type":"object","refName":"taskrouter.v1.workspace","modelName":"taskrouter_v1_workspace","properties":{"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Workspace resource."},"date_created":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was created specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"date_updated":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was last updated specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"default_activity_name":{"type":"string","nullable":true,"description":"The name of the default activity."},"default_activity_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WA[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the Activity that will be used when new Workers are created in the Workspace."},"event_callback_url":{"type":"string","format":"uri","nullable":true,"description":"The URL we call when an event occurs. If provided, the Workspace will publish events to this URL, for example, to collect data for reporting. See [Workspace Events](https://www.twilio.com/docs/taskrouter/api/event) for more information. This parameter supports Twilio's [Webhooks (HTTP callbacks) Connection Overrides](https://www.twilio.com/docs/usage/webhooks/webhooks-connection-overrides)."},"events_filter":{"type":"string","nullable":true,"description":"The list of Workspace events for which to call `event_callback_url`. For example, if `EventsFilter=task.created, task.canceled, worker.activity.update`, then TaskRouter will call event_callback_url only when a task is created, canceled, or a Worker activity is updated."},"friendly_name":{"type":"string","nullable":true,"description":"The string that you assigned to describe the Workspace resource. For example `Customer Support` or `2014 Election Campaign`.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"multi_task_enabled":{"type":"boolean","nullable":true,"description":"Whether multi-tasking is enabled. The default is `true`, which enables multi-tasking. Multi-tasking allows Workers to handle multiple Tasks simultaneously. When enabled (`true`), each Worker can receive parallel reservations up to the per-channel maximums defined in the Workers section. In single-tasking each Worker would only receive a new reservation when the previous task is completed. Learn more at [Multitasking](https://www.twilio.com/docs/taskrouter/multitasking)."},"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that we created to identify the Workspace resource."},"timeout_activity_name":{"type":"string","nullable":true,"description":"The name of the timeout activity."},"timeout_activity_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WA[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the Activity that will be assigned to a Worker when a Task reservation times out without a response."},"prioritize_queue_order":{"type":"string","enum":["FIFO","LIFO"],"description":"The type of TaskQueue to prioritize when Workers are receiving Tasks from both types of TaskQueues. Can be: `LIFO` or `FIFO` and the default is `FIFO`. For more information, see [Queue Ordering](https://www.twilio.com/docs/taskrouter/queue-ordering-last-first-out-lifo).","refName":"workspace_enum_queue_order","modelName":"workspace_enum_queue_order"},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the Workspace resource."},"links":{"type":"object","format":"uri-map","nullable":true,"description":"The URLs of related resources."}}}} />

## Create a Workspace resource

`POST https://taskrouter.twilio.com/v1/Workspaces`

### Request body parameters

```json
{"schema":{"type":"object","title":"CreateWorkspaceRequest","required":["FriendlyName"],"properties":{"FriendlyName":{"type":"string","description":"A descriptive string that you create to describe the Workspace resource. It can be up to 64 characters long. For example: `Customer Support` or `2014 Election Campaign`.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"EventCallbackUrl":{"type":"string","format":"uri","description":"The URL we should call when an event occurs. If provided, the Workspace will publish events to this URL, for example, to collect data for reporting. See [Workspace Events](https://www.twilio.com/docs/taskrouter/api/event) for more information. This parameter supports Twilio's [Webhooks (HTTP callbacks) Connection Overrides](https://www.twilio.com/docs/usage/webhooks/webhooks-connection-overrides)."},"EventsFilter":{"type":"string","description":"The list of Workspace events for which to call event_callback_url. For example, if `EventsFilter=task.created, task.canceled, worker.activity.update`, then TaskRouter will call event_callback_url only when a task is created, canceled, or a Worker activity is updated."},"MultiTaskEnabled":{"type":"boolean","description":"Whether to enable multi-tasking. Can be: `true` to enable multi-tasking, or `false` to disable it. However, all workspaces should be created as multi-tasking. The default is `true`. Multi-tasking allows Workers to handle multiple Tasks simultaneously. When enabled (`true`), each Worker can receive parallel reservations up to the per-channel maximums defined in the Workers section. In single-tasking mode (legacy mode), each Worker will only receive a new reservation when the previous task is completed. Learn more at [Multitasking](https://www.twilio.com/docs/taskrouter/multitasking)."},"Template":{"type":"string","description":"An available template name. Can be: `NONE` or `FIFO` and the default is `NONE`. Pre-configures the Workspace with the Workflow and Activities specified in the template. `NONE` will create a Workspace with only a set of default activities. `FIFO` will configure TaskRouter with a set of default activities and a single TaskQueue for first-in, first-out distribution, which can be useful when you are getting started with TaskRouter."},"PrioritizeQueueOrder":{"type":"string","enum":["FIFO","LIFO"],"description":"The type of TaskQueue to prioritize when Workers are receiving Tasks from both types of TaskQueues. Can be: `LIFO` or `FIFO` and the default is `FIFO`. For more information, see [Queue Ordering](https://www.twilio.com/docs/taskrouter/queue-ordering-last-first-out-lifo).","refName":"workspace_enum_queue_order","modelName":"workspace_enum_queue_order"}}},"examples":{"create":{"value":{"lang":"json","value":"{\n  \"EventCallbackUrl\": \"/example\",\n  \"FriendlyName\": \"friendly_name\",\n  \"Template\": \"template\"\n}","meta":"","code":"{\n  \"EventCallbackUrl\": \"/example\",\n  \"FriendlyName\": \"friendly_name\",\n  \"Template\": \"template\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"EventCallbackUrl\"","#7EE787"],[":","#C9D1D9"]," ",["\"/example\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"friendly_name\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Template\"","#7EE787"],[":","#C9D1D9"]," ",["\"template\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Create a Workspace

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createWorkspace() {
  const workspace = await client.taskrouter.v1.workspaces.create({
    eventCallbackUrl: "https://workspace-example.free.beeceptor.com",
    friendlyName: "NewWorkspace",
    template: "FIFO",
  });

  console.log(workspace.accountSid);
}

createWorkspace();
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

workspace = client.taskrouter.v1.workspaces.create(
    event_callback_url="https://workspace-example.free.beeceptor.com",
    template="FIFO",
    friendly_name="NewWorkspace",
)

print(workspace.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Taskrouter.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var workspace = await WorkspaceResource.CreateAsync(
            eventCallbackUrl: new Uri("https://workspace-example.free.beeceptor.com"),
            template: "FIFO",
            friendlyName: "NewWorkspace");

        Console.WriteLine(workspace.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.net.URI;
import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.Workspace;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Workspace workspace = Workspace.creator("NewWorkspace")
                                  .setEventCallbackUrl(URI.create("https://workspace-example.free.beeceptor.com"))
                                  .setTemplate("FIFO")
                                  .create();

        System.out.println(workspace.getAccountSid());
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

	params := &taskrouter.CreateWorkspaceParams{}
	params.SetEventCallbackUrl("https://workspace-example.free.beeceptor.com")
	params.SetTemplate("FIFO")
	params.SetFriendlyName("NewWorkspace")

	resp, err := client.TaskrouterV1.CreateWorkspace(params)
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

$workspace = $twilio->taskrouter->v1->workspaces->create(
    "NewWorkspace", // FriendlyName
    [
        "eventCallbackUrl" => "https://workspace-example.free.beeceptor.com",
        "template" => "FIFO",
    ]
);

print $workspace->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

workspace = @client
            .taskrouter
            .v1
            .workspaces
            .create(
              event_callback_url: 'https://workspace-example.free.beeceptor.com',
              template: 'FIFO',
              friendly_name: 'NewWorkspace'
            )

puts workspace.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:create \
   --event-callback-url https://workspace-example.free.beeceptor.com \
   --template FIFO \
   --friendly-name NewWorkspace
```

```bash
curl -X POST "https://taskrouter.twilio.com/v1/Workspaces" \
--data-urlencode "EventCallbackUrl=https://workspace-example.free.beeceptor.com" \
--data-urlencode "Template=FIFO" \
--data-urlencode "FriendlyName=NewWorkspace" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2016-08-01T22:10:40Z",
  "date_updated": "2016-08-01T22:10:40Z",
  "default_activity_name": "Offline",
  "default_activity_sid": "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "event_callback_url": "https://workspace-example.free.beeceptor.com",
  "events_filter": null,
  "friendly_name": "NewWorkspace",
  "links": {
    "activities": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Activities",
    "statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Statistics",
    "real_time_statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RealTimeStatistics",
    "cumulative_statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/CumulativeStatistics",
    "task_queues": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskQueues",
    "tasks": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks",
    "workers": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers",
    "workflows": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workflows",
    "task_channels": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskChannels",
    "events": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Events"
  },
  "multi_task_enabled": false,
  "prioritize_queue_order": "FIFO",
  "sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "timeout_activity_name": "Offline",
  "timeout_activity_sid": "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

## Fetch a Workspace resource

`GET https://taskrouter.twilio.com/v1/Workspaces/{Sid}`

### Path parameters

```json
[{"name":"Sid","in":"path","description":"The SID of the Workspace resource to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$"},"required":true}]
```

Fetch a Workspace

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchWorkspace() {
  const workspace = await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch();

  console.log(workspace.accountSid);
}

fetchWorkspace();
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

workspace = client.taskrouter.v1.workspaces(
    "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).fetch()

print(workspace.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Taskrouter.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var workspace =
            await WorkspaceResource.FetchAsync(pathSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(workspace.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.Workspace;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Workspace workspace = Workspace.fetcher("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").fetch();

        System.out.println(workspace.getAccountSid());
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

	resp, err := client.TaskrouterV1.FetchWorkspace("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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

$workspace = $twilio->taskrouter->v1
    ->workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->fetch();

print $workspace->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

workspace = @client
            .taskrouter
            .v1
            .workspaces('WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
            .fetch

puts workspace.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:fetch \
   --sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2016-08-01T22:10:40Z",
  "date_updated": "2016-08-01T22:10:40Z",
  "default_activity_name": "Offline",
  "default_activity_sid": "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "event_callback_url": "",
  "events_filter": null,
  "friendly_name": "new",
  "links": {
    "activities": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Activities",
    "statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Statistics",
    "real_time_statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RealTimeStatistics",
    "cumulative_statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/CumulativeStatistics",
    "task_queues": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskQueues",
    "tasks": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks",
    "workers": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers",
    "workflows": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workflows",
    "task_channels": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskChannels",
    "events": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Events"
  },
  "multi_task_enabled": false,
  "prioritize_queue_order": "FIFO",
  "sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "timeout_activity_name": "Offline",
  "timeout_activity_sid": "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

## List all Workspaces

`GET https://taskrouter.twilio.com/v1/Workspaces`

By default, this will return the first 50 Workspaces. Supply a PageSize parameter to fetch more than 50 Workspaces. See [pagination information](/docs/usage/twilios-response) for more information.

### Query parameters

```json
[{"name":"FriendlyName","in":"query","description":"The `friendly_name` of the Workspace resources to read. For example `Customer Support` or `2014 Election Campaign`.","schema":{"type":"string"},"x-twilio":{"pii":{"handling":"standard","deleteSla":30}},"examples":{"readFull":{"value":"friendly_name"},"readEmpty":{"value":"friendly_name"}}},{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

List multiple Workspaces

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listWorkspace() {
  const workspaces = await client.taskrouter.v1.workspaces.list({ limit: 20 });

  workspaces.forEach((w) => console.log(w.accountSid));
}

listWorkspace();
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

workspaces = client.taskrouter.v1.workspaces.list(limit=20)

for record in workspaces:
    print(record.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Taskrouter.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var workspaces = await WorkspaceResource.ReadAsync(limit: 20);

        foreach (var record in workspaces) {
            Console.WriteLine(record.AccountSid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.Workspace;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Workspace> workspaces = Workspace.reader().limit(20).read();

        for (Workspace record : workspaces) {
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

	params := &taskrouter.ListWorkspaceParams{}
	params.SetLimit(20)

	resp, err := client.TaskrouterV1.ListWorkspace(params)
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

$workspaces = $twilio->taskrouter->v1->workspaces->read([], 20);

foreach ($workspaces as $record) {
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

workspaces = @client
             .taskrouter
             .v1
             .workspaces
             .list(limit: 20)

workspaces.each do |record|
   puts record.account_sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:list
```

```bash
curl -X GET "https://taskrouter.twilio.com/v1/Workspaces?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "meta": {
    "first_page_url": "https://taskrouter.twilio.com/v1/Workspaces?FriendlyName=friendly_name&PageSize=50&Page=0",
    "key": "workspaces",
    "next_page_url": null,
    "page": 0,
    "page_size": 50,
    "previous_page_url": null,
    "url": "https://taskrouter.twilio.com/v1/Workspaces?FriendlyName=friendly_name&PageSize=50&Page=0"
  },
  "workspaces": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "date_created": "2016-08-01T22:10:40Z",
      "date_updated": "2016-08-01T22:10:40Z",
      "default_activity_name": "Offline",
      "default_activity_sid": "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "event_callback_url": "",
      "events_filter": null,
      "friendly_name": "new",
      "links": {
        "activities": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Activities",
        "statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Statistics",
        "real_time_statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RealTimeStatistics",
        "cumulative_statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/CumulativeStatistics",
        "task_queues": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskQueues",
        "tasks": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks",
        "workers": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers",
        "workflows": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workflows",
        "task_channels": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskChannels",
        "events": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Events"
      },
      "multi_task_enabled": false,
      "prioritize_queue_order": "FIFO",
      "sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "timeout_activity_name": "Offline",
      "timeout_activity_sid": "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ]
}
```

## Update a Workspace resource

`POST https://taskrouter.twilio.com/v1/Workspaces/{Sid}`

### Path parameters

```json
[{"name":"Sid","in":"path","description":"The SID of the Workspace resource to update.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"UpdateWorkspaceRequest","properties":{"DefaultActivitySid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WA[0-9a-fA-F]{32}$","description":"The SID of the Activity that will be used when new Workers are created in the Workspace."},"EventCallbackUrl":{"type":"string","format":"uri","description":"The URL we should call when an event occurs. See [Workspace Events](https://www.twilio.com/docs/taskrouter/api/event) for more information. This parameter supports Twilio's [Webhooks (HTTP callbacks) Connection Overrides](https://www.twilio.com/docs/usage/webhooks/webhooks-connection-overrides)."},"EventsFilter":{"type":"string","description":"The list of Workspace events for which to call event_callback_url. For example if `EventsFilter=task.created,task.canceled,worker.activity.update`, then TaskRouter will call event_callback_url only when a task is created, canceled, or a Worker activity is updated."},"FriendlyName":{"type":"string","description":"A descriptive string that you create to describe the Workspace resource. For example: `Sales Call Center` or `Customer Support Team`.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"MultiTaskEnabled":{"type":"boolean","description":"Whether to enable multi-tasking. Can be: `true` to enable multi-tasking, or `false` to disable it. However, all workspaces should be maintained as multi-tasking. There is no default when omitting this parameter. A multi-tasking Workspace can't be updated to single-tasking unless it is not a Flex Project and another (legacy) single-tasking Workspace exists. Multi-tasking allows Workers to handle multiple Tasks simultaneously. In multi-tasking mode, each Worker can receive parallel reservations up to the per-channel maximums defined in the Workers section. In single-tasking mode (legacy mode), each Worker will only receive a new reservation when the previous task is completed. Learn more at [Multitasking](https://www.twilio.com/docs/taskrouter/multitasking)."},"TimeoutActivitySid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WA[0-9a-fA-F]{32}$","description":"The SID of the Activity that will be assigned to a Worker when a Task reservation times out without a response."},"PrioritizeQueueOrder":{"type":"string","enum":["FIFO","LIFO"],"description":"The type of TaskQueue to prioritize when Workers are receiving Tasks from both types of TaskQueues. Can be: `LIFO` or `FIFO` and the default is `FIFO`. For more information, see [Queue Ordering](https://www.twilio.com/docs/taskrouter/queue-ordering-last-first-out-lifo).","refName":"workspace_enum_queue_order","modelName":"workspace_enum_queue_order"}}},"examples":{"update":{"value":{"lang":"json","value":"{\n  \"DefaultActivitySid\": \"WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"EventCallbackUrl\": \"/example\",\n  \"FriendlyName\": \"friendly_name\",\n  \"TimeoutActivitySid\": \"WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"DefaultAttentionProfileSid\": \"WPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"AttentionRoutingEnabled\": false\n}","meta":"","code":"{\n  \"DefaultActivitySid\": \"WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"EventCallbackUrl\": \"/example\",\n  \"FriendlyName\": \"friendly_name\",\n  \"TimeoutActivitySid\": \"WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"DefaultAttentionProfileSid\": \"WPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"AttentionRoutingEnabled\": false\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"DefaultActivitySid\"","#7EE787"],[":","#C9D1D9"]," ",["\"WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"EventCallbackUrl\"","#7EE787"],[":","#C9D1D9"]," ",["\"/example\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"friendly_name\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"TimeoutActivitySid\"","#7EE787"],[":","#C9D1D9"]," ",["\"WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"DefaultAttentionProfileSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"WPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"AttentionRoutingEnabled\"","#7EE787"],[":","#C9D1D9"]," ",["false","#79C0FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Update a Workspace

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateWorkspace() {
  const workspace = await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update({
      eventCallbackUrl: "https://new-workspace-callback.free.beeceptor.com",
      friendlyName: "NewWorkspaceName",
    });

  console.log(workspace.accountSid);
}

updateWorkspace();
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

workspace = client.taskrouter.v1.workspaces(
    "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).update(
    friendly_name="NewWorkspaceName",
    event_callback_url="https://new-workspace-callback.free.beeceptor.com",
)

print(workspace.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Taskrouter.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var workspace = await WorkspaceResource.UpdateAsync(
            friendlyName: "NewWorkspaceName",
            eventCallbackUrl: new Uri("https://new-workspace-callback.free.beeceptor.com"),
            pathSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(workspace.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.net.URI;
import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.Workspace;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Workspace workspace = Workspace.updater("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                                  .setFriendlyName("NewWorkspaceName")
                                  .setEventCallbackUrl(URI.create("https://new-workspace-callback.free.beeceptor.com"))
                                  .update();

        System.out.println(workspace.getAccountSid());
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

	params := &taskrouter.UpdateWorkspaceParams{}
	params.SetFriendlyName("NewWorkspaceName")
	params.SetEventCallbackUrl("https://new-workspace-callback.free.beeceptor.com")

	resp, err := client.TaskrouterV1.UpdateWorkspace("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$workspace = $twilio->taskrouter->v1
    ->workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->update([
        "friendlyName" => "NewWorkspaceName",
        "eventCallbackUrl" =>
            "https://new-workspace-callback.free.beeceptor.com",
    ]);

print $workspace->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

workspace = @client
            .taskrouter
            .v1
            .workspaces('WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
            .update(
              friendly_name: 'NewWorkspaceName',
              event_callback_url: 'https://new-workspace-callback.free.beeceptor.com'
            )

puts workspace.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:update \
   --sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --friendly-name NewWorkspaceName \
   --event-callback-url https://new-workspace-callback.free.beeceptor.com
```

```bash
curl -X POST "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
--data-urlencode "FriendlyName=NewWorkspaceName" \
--data-urlencode "EventCallbackUrl=https://new-workspace-callback.free.beeceptor.com" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2016-08-01T22:10:40Z",
  "date_updated": "2016-08-01T22:10:40Z",
  "default_activity_name": "Offline",
  "default_activity_sid": "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "event_callback_url": "https://new-workspace-callback.free.beeceptor.com",
  "events_filter": null,
  "friendly_name": "NewWorkspaceName",
  "links": {
    "activities": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Activities",
    "statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Statistics",
    "real_time_statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RealTimeStatistics",
    "cumulative_statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/CumulativeStatistics",
    "task_queues": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskQueues",
    "tasks": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks",
    "workers": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers",
    "workflows": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workflows",
    "task_channels": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskChannels",
    "events": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Events"
  },
  "multi_task_enabled": false,
  "prioritize_queue_order": "FIFO",
  "sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "timeout_activity_name": "Offline",
  "timeout_activity_sid": "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

## Delete a Workspace resource

`DELETE https://taskrouter.twilio.com/v1/Workspaces/{Sid}`

### Path parameters

```json
[{"name":"Sid","in":"path","description":"The SID of the Workspace resource to delete.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$"},"required":true}]
```

Delete a Workspace

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function deleteWorkspace() {
  await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .remove();
}

deleteWorkspace();
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

client.taskrouter.v1.workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete()
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Taskrouter.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        await WorkspaceResource.DeleteAsync(pathSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.Workspace;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Workspace.deleter("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete();
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

	err := client.TaskrouterV1.DeleteWorkspace("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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
  .delete
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:remove \
   --sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X DELETE "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

## Workspace Instance Subresources

Every Workspace supports the following subresources.

### Workers

`/v1/Workspaces/{WorkspaceSid}/Workers`

Represents the resources that can process Tasks from this Workflow, such as agents in a call center or people working a help desk. See the [Worker Resource](/docs/taskrouter/api/worker) for more information.

### Activities

`/v1/Workspaces/{WorkspaceSid}/Activities`

A worker's availability to handle a task is controlled by its Activity. Activities describe what a worker is currently doing and provide a meaningful label for real-time worker statistics. See the [Activity Resource](/docs/taskrouter/api/activity) for more information.

### TaskQueues

`/v1/Workspaces/{WorkspaceSid}/TaskQueues`

TaskQueues hold tasks that are waiting to be assigned to Workers. Each TaskQueue specifies the capabilities workers must have to receive tasks from the queue. See [TaskQueues](/docs/taskrouter/api/task-queue) for more information.

### Workflows

`/v1/Workspaces/{WorkspaceSid}/Workflows`

Workflows control how Tasks will be prioritized and routed to queues. Workflows can also escalate a Task's priority, move a Task to another queue after a timeout, or remove a Task from the Workspace entirely if it has not been assigned within some timeout. All Tasks enter the Workspace through a Workflow and will be managed by a Workflow until they are either assigned to a Worker or removed from the Workspace. See the [Workflow Resource](/docs/taskrouter/api/workflow) for more information.

### Tasks

`/v1/Workspaces/{WorkspaceSid}/Tasks`

Represents the Tasks waiting in this Workspace. See the [Task Resource](/docs/taskrouter/api/task) for more information.

### Statistics

`/v1/Workspaces/{WorkspaceSid}/Statistics`

Statistics are captured for each of TaskRouter's subresources. You can use these Statistics to build reporting dashboards and displays for your team. See [Workspace Statistics](/docs/taskrouter/api/workspace-statistics) for more information.

### Events

`/v1/Workspaces/{WorkspaceSid}/Events`

Events describe changes to your Workspace. Use these Events to build historical reports for your TaskRouter environment. See the [Event Resource](/docs/taskrouter/api/event) for more information.
