# Worker Resource

Workers represent an entity that is able to perform tasks, such as an agent working in a call center, or a salesperson handling leads.

The default maximum number of registered Workers that can be created in the system is 15,000.

## Worker Properties

> \[!WARNING]
>
> Worker attribute values do not support hyphens. Using a hyphen in a worker attribute value may cause a parsing error.

> \[!WARNING]
>
> Don't use the `page` query parameter with this resource. Pagination isn't supported.

**Worker Attributes**\
Every Worker has a set of Attributes that describe what sort of tasks the Worker is able to complete. Attributes are modeled as a JSON string and may contain string, integer, and array data. These attributes will be used to link a Worker to one or more TaskQueues, and thus determine which Tasks the Worker is eligible to handle.

For example, let's say we have two agents. The first worker, Alice, speaks English and handles Support and Sales Tasks:

```json
{ 
    "skills": ["support", "sales"], 
    "languages":["english"]
}
```

The second worker, Bob, handles only Sales requests and speaks Spanish and English:

```json
{ 
    "skills": ["sales"], 
    "languages": ["spanish", "english"]
}
```

> \[!NOTE]
>
> A property of `contact_uri` is required on the WorkerAttributes to indicate whom to call when issuing a [Dequeue Instruction](/docs/taskrouter/handle-assignment-callbacks).

```json
{ 
    "skills": ["sales"], 
    "languages": ["spanish", "english"],
    "contact_uri": "client\:Bob"
}

```

> \[!WARNING]
>
> The Teams page uses the worker attribute `team_sid`. If you have any custom implementations in Flex, do not use the same `team_sid` worker attribute.

**Worker Activity**

Each worker also has an Activity, represented by an ActivitySid. This Activity determines the worker's current state in the system, as well as whether the worker can accept new Task assignments.

<OperationTable type="properties" data={{"type":"object","refName":"taskrouter.v1.workspace.worker","modelName":"taskrouter_v1_workspace_worker","properties":{"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Worker resource."},"activity_name":{"type":"string","nullable":true,"description":"The `friendly_name` of the Worker's current Activity."},"activity_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WA[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the Worker's current Activity."},"attributes":{"type":"string","nullable":true,"description":"The JSON string that describes the Worker. For example: `{ \"email\": \"Bob@example.com\", \"phone\": \"+5095551234\" }`. **Note** If this property has been assigned a value, it will only be displayed in FETCH actions that return a single resource. Otherwise, this property will be null, even if it has a value. This data is passed to the `assignment_callback_url` when TaskRouter assigns a Task to the Worker.","x-twilio":{"pii":{"handling":"sensitive","deleteSla":30}}},"available":{"type":"boolean","nullable":true,"description":"Whether the Worker is available to perform tasks."},"date_created":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was created specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"date_status_changed":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT of the last change to the Worker's activity specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format. Used to calculate Workflow statistics."},"date_updated":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was last updated specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"friendly_name":{"type":"string","nullable":true,"description":"The string that you assigned to describe the resource. Friendly names are case insensitive, and unique within the TaskRouter Workspace.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WK[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that we created to identify the Worker resource."},"workspace_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the Workspace that contains the Worker."},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the Worker resource."},"links":{"type":"object","format":"uri-map","nullable":true,"description":"The URLs of related resources."}}}} />

## Create a Worker resource

`POST https://taskrouter.twilio.com/v1/Workspaces/{WorkspaceSid}/Workers`

### Path parameters

```json
[{"name":"WorkspaceSid","in":"path","description":"The SID of the Workspace that the new Worker belongs to.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"CreateWorkerRequest","required":["FriendlyName"],"properties":{"FriendlyName":{"type":"string","description":"A descriptive string that you create to describe the new Worker. It can be up to 64 characters long.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"ActivitySid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WA[0-9a-fA-F]{32}$","description":"The SID of a valid Activity that will describe the new Worker's initial state. See [Activities](https://www.twilio.com/docs/taskrouter/api/activity) for more information. If not provided, the new Worker's initial state is the `default_activity_sid` configured on the Workspace."},"Attributes":{"type":"string","description":"A valid JSON string that describes the new Worker. For example: `{ \"email\": \"Bob@example.com\", \"phone\": \"+5095551234\" }`. This data is passed to the `assignment_callback_url` when TaskRouter assigns a Task to the Worker. Defaults to {}.","x-twilio":{"pii":{"handling":"sensitive","deleteSla":30}}}}},"examples":{"create":{"value":{"lang":"json","value":"{\n  \"ActivitySid\": \"WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"Attributes\": \"attributes\",\n  \"FriendlyName\": \"friendly_name\",\n  \"OperatingUnitSid\": \"OUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"Concurrency\": 5\n}","meta":"","code":"{\n  \"ActivitySid\": \"WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"Attributes\": \"attributes\",\n  \"FriendlyName\": \"friendly_name\",\n  \"OperatingUnitSid\": \"OUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"Concurrency\": 5\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"ActivitySid\"","#7EE787"],[":","#C9D1D9"]," ",["\"WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Attributes\"","#7EE787"],[":","#C9D1D9"]," ",["\"attributes\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"friendly_name\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"OperatingUnitSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"OUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Concurrency\"","#7EE787"],[":","#C9D1D9"]," ",["5","#79C0FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Create a Worker

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createWorker() {
  const worker = await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .workers.create({ friendlyName: "FriendlyName" });

  console.log(worker.accountSid);
}

createWorker();
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

worker = client.taskrouter.v1.workspaces(
    "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).workers.create(friendly_name="FriendlyName")

print(worker.account_sid)
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

        var worker = await WorkerResource.CreateAsync(
            friendlyName: "FriendlyName", pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(worker.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.Worker;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Worker worker = Worker.creator("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "FriendlyName").create();

        System.out.println(worker.getAccountSid());
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

	params := &taskrouter.CreateWorkerParams{}
	params.SetFriendlyName("FriendlyName")

	resp, err := client.TaskrouterV1.CreateWorker("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$worker = $twilio->taskrouter->v1
    ->workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->workers->create(
        "FriendlyName" // FriendlyName
    );

print $worker->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

worker = @client
         .taskrouter
         .v1
         .workspaces('WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
         .workers
         .create(friendly_name: 'FriendlyName')

puts worker.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:workers:create \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --friendly-name FriendlyName
```

```bash
curl -X POST "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers" \
--data-urlencode "FriendlyName=FriendlyName" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "FriendlyName",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "activity_sid": "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "activity_name": "Offline",
  "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "attributes": "{}",
  "available": false,
  "date_created": "2017-05-30T23:19:38Z",
  "date_updated": "2017-05-30T23:19:38Z",
  "date_status_changed": "2017-05-30T23:19:38Z",
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "channels": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels",
    "activity": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Activities/WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "workspace": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/Statistics",
    "real_time_statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/RealTimeStatistics",
    "cumulative_statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/CumulativeStatistics",
    "worker_statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Statistics",
    "worker_channels": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels",
    "reservations": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Reservations"
  }
}
```

## Fetch a Worker resource

`GET https://taskrouter.twilio.com/v1/Workspaces/{WorkspaceSid}/Workers/{Sid}`

### Path parameters

```json
[{"name":"WorkspaceSid","in":"path","description":"The SID of the Workspace with the Worker to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The SID of the Worker resource to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WK[0-9a-fA-F]{32}$"},"required":true}]
```

Fetch a Worker

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchWorker() {
  const worker = await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .workers("WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch();

  console.log(worker.accountSid);
}

fetchWorker();
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

worker = (
    client.taskrouter.v1.workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .workers("WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch()
)

print(worker.account_sid)
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

        var worker = await WorkerResource.FetchAsync(
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(worker.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.Worker;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Worker worker =
            Worker.fetcher("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").fetch();

        System.out.println(worker.getAccountSid());
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

	resp, err := client.TaskrouterV1.FetchWorker("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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

$worker = $twilio->taskrouter->v1
    ->workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->workers("WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->fetch();

print $worker->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

worker = @client
         .taskrouter
         .v1
         .workspaces('WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
         .workers('WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
         .fetch

puts worker.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:workers:fetch \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "activity_name": "available",
  "activity_sid": "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "attributes": "{}",
  "available": false,
  "date_created": "2017-05-30T23:32:39Z",
  "date_status_changed": "2017-05-30T23:32:39Z",
  "date_updated": "2017-05-30T23:32:39Z",
  "friendly_name": "NewWorker3",
  "sid": "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "channels": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels",
    "activity": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Activities/WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "workspace": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/Statistics",
    "real_time_statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/RealTimeStatistics",
    "cumulative_statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/CumulativeStatistics",
    "worker_statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Statistics",
    "worker_channels": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels",
    "reservations": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Reservations"
  }
}
```

## Read multiple Worker resources

`GET https://taskrouter.twilio.com/v1/Workspaces/{WorkspaceSid}/Workers`

By default, this will return the first 50 Workers. Supply a PageSize parameter to fetch more than 50 Workers. See [pagination information](/docs/usage/twilios-response) for more information.

### Path parameters

```json
[{"name":"WorkspaceSid","in":"path","description":"The SID of the Workspace with the Workers to read.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$"},"required":true}]
```

### Query parameters

```json
[{"name":"ActivityName","in":"query","description":"The `activity_name` of the Worker resources to read.","schema":{"type":"string"},"examples":{"readFull":{"value":"activity_name"},"readEmpty":{"value":"activity_name"}}},{"name":"ActivitySid","in":"query","description":"The `activity_sid` of the Worker resources to read.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WA[0-9a-fA-F]{32}$"},"examples":{"readFull":{"value":"WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"},"readEmpty":{"value":"WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}}},{"name":"Available","in":"query","description":"Whether to return only Worker resources that are available or unavailable. Can be `true`, `1`, or `yes` to return Worker resources that are available, and `false`, or any value returns the Worker resources that are not available.","schema":{"type":"string"},"examples":{"readFull":{"value":"available"},"readEmpty":{"value":"available"}}},{"name":"FriendlyName","in":"query","description":"The `friendly_name` of the Worker resources to read.","schema":{"type":"string"},"x-twilio":{"pii":{"handling":"standard","deleteSla":30}},"examples":{"readFull":{"value":"friendly_name"},"readEmpty":{"value":"friendly_name"}}},{"name":"TargetWorkersExpression","in":"query","description":"Filter by Workers that would match an expression. In addition to fields in the workers' attributes, the expression can include the following worker fields: `sid`, `friendly_name`, `activity_sid`, or `activity_name`","schema":{"type":"string"},"examples":{"readFull":{"value":"target_workers_expression"},"readEmpty":{"value":"target_workers_expression"}}},{"name":"TaskQueueName","in":"query","description":"The `friendly_name` of the TaskQueue that the Workers to read are eligible for.","schema":{"type":"string"},"examples":{"readFull":{"value":"task_queue_name"},"readEmpty":{"value":"task_queue_name"}}},{"name":"TaskQueueSid","in":"query","description":"The SID of the TaskQueue that the Workers to read are eligible for.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WQ[0-9a-fA-F]{32}$"},"examples":{"readFull":{"value":"WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"},"readEmpty":{"value":"WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}}},{"name":"Ordering","in":"query","description":"Sorting parameter for Workers","schema":{"type":"string"}},{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

List all Workers

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listWorker() {
  const workers = await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .workers.list({ limit: 20 });

  workers.forEach((w) => console.log(w.accountSid));
}

listWorker();
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

workers = client.taskrouter.v1.workspaces(
    "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).workers.list(limit=20)

for record in workers:
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

        var workers = await WorkerResource.ReadAsync(
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", limit: 20);

        foreach (var record in workers) {
            Console.WriteLine(record.AccountSid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.Worker;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Worker> workers = Worker.reader("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").limit(20).read();

        for (Worker record : workers) {
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

	params := &taskrouter.ListWorkerParams{}
	params.SetLimit(20)

	resp, err := client.TaskrouterV1.ListWorker("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$workers = $twilio->taskrouter->v1
    ->workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->workers->read([], 20);

foreach ($workers as $record) {
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

workers = @client
          .taskrouter
          .v1
          .workspaces('WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
          .workers
          .list(limit: 20)

workers.each do |record|
   puts record.account_sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:workers:list \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers?Available=available&TargetWorkersExpression=target_workers_expression&TaskQueueName=task_queue_name&ActivityName=activity_name&ActivitySid=WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&TaskQueueSid=WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&FriendlyName=friendly_name&PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers?Available=available&TargetWorkersExpression=target_workers_expression&TaskQueueName=task_queue_name&ActivityName=activity_name&ActivitySid=WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&TaskQueueSid=WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&FriendlyName=friendly_name&PageSize=50&Page=0",
    "next_page_url": null,
    "key": "workers"
  },
  "workers": [
    {
      "sid": "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "friendly_name": "testWorker",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "activity_sid": "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "activity_name": "Offline",
      "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "attributes": "{}",
      "available": false,
      "date_created": "2017-05-30T23:05:29Z",
      "date_updated": "2017-05-30T23:05:29Z",
      "date_status_changed": "2017-05-30T23:05:29Z",
      "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "links": {
        "channels": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels",
        "activity": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Activities/WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "workspace": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/Statistics",
        "real_time_statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/RealTimeStatistics",
        "cumulative_statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/CumulativeStatistics",
        "worker_statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Statistics",
        "worker_channels": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels",
        "reservations": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Reservations"
      }
    }
  ]
}
```

List Workers with Target Expression

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listWorker() {
  const workers = await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .workers.list({
      targetWorkersExpression: "name IN ['Alice','Bob','Connie','David']",
      limit: 20,
    });

  workers.forEach((w) => console.log(w.accountSid));
}

listWorker();
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

workers = client.taskrouter.v1.workspaces(
    "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).workers.list(
    target_workers_expression="name IN ['Alice','Bob','Connie','David']",
    limit=20,
)

for record in workers:
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

        var workers = await WorkerResource.ReadAsync(
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            targetWorkersExpression: "name IN ['Alice','Bob','Connie','David']",
            limit: 20);

        foreach (var record in workers) {
            Console.WriteLine(record.AccountSid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.Worker;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Worker> workers = Worker.reader("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                                          .setTargetWorkersExpression("name IN ['Alice','Bob','Connie','David']")
                                          .limit(20)
                                          .read();

        for (Worker record : workers) {
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

	params := &taskrouter.ListWorkerParams{}
	params.SetTargetWorkersExpression("name IN ['Alice','Bob','Connie','David']")
	params.SetLimit(20)

	resp, err := client.TaskrouterV1.ListWorker("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$workers = $twilio->taskrouter->v1
    ->workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->workers->read(
        [
            "targetWorkersExpression" =>
                "name IN ['Alice','Bob','Connie','David']",
        ],
        20
    );

foreach ($workers as $record) {
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

workers = @client
          .taskrouter
          .v1
          .workspaces('WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
          .workers
          .list(
            target_workers_expression: 'name IN [\'Alice\',\'Bob\',\'Connie\',\'David\']',
            limit: 20
          )

workers.each do |record|
   puts record.account_sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:workers:list \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --target-workers-expression "name IN ['Alice','Bob','Connie','David']"
```

```bash
curl -X GET "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers?TargetWorkersExpression=name%20IN%20%5B'Alice'%2C'Bob'%2C'Connie'%2C'David'%5D&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers?Available=available&TargetWorkersExpression=target_workers_expression&TaskQueueName=task_queue_name&ActivityName=activity_name&ActivitySid=WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&TaskQueueSid=WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&FriendlyName=friendly_name&PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers?Available=available&TargetWorkersExpression=target_workers_expression&TaskQueueName=task_queue_name&ActivityName=activity_name&ActivitySid=WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&TaskQueueSid=WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&FriendlyName=friendly_name&PageSize=50&Page=0",
    "next_page_url": null,
    "key": "workers"
  },
  "workers": [
    {
      "sid": "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "friendly_name": "testWorker",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "activity_sid": "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "activity_name": "Offline",
      "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "attributes": "{}",
      "available": false,
      "date_created": "2017-05-30T23:05:29Z",
      "date_updated": "2017-05-30T23:05:29Z",
      "date_status_changed": "2017-05-30T23:05:29Z",
      "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "links": {
        "channels": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels",
        "activity": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Activities/WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "workspace": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/Statistics",
        "real_time_statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/RealTimeStatistics",
        "cumulative_statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/CumulativeStatistics",
        "worker_statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Statistics",
        "worker_channels": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels",
        "reservations": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Reservations"
      }
    }
  ]
}
```

You can use the TargetWorkersExpression parameter to see which workers are matching the expression, or to understand why a certain queue isn't mapping to the workers you would expect.

This example checks which workers have a name attribute of Alice, Bob, Connie or David - and, by extension, if we had a queue that mapped to workers with those names, we can be confident that these workers would be associated with the queue.

## Update a Worker resource

`POST https://taskrouter.twilio.com/v1/Workspaces/{WorkspaceSid}/Workers/{Sid}`

Updating a Worker's current activity is a common operation in any TaskRouter application. You can do this using [TaskRouter's Worker.js library](/docs/taskrouter/js-sdk-v1/workspace/worker), or using this REST API.

### Headers

```json
[{"name":"If-Match","in":"header","description":"The If-Match HTTP request header","schema":{"type":"string"}}]
```

### Path parameters

```json
[{"name":"WorkspaceSid","in":"path","description":"The SID of the Workspace with the Worker to update.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The SID of the Worker resource to update.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WK[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"UpdateWorkerRequest","properties":{"ActivitySid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WA[0-9a-fA-F]{32}$","description":"The SID of a valid Activity that will describe the Worker's initial state. See [Activities](https://www.twilio.com/docs/taskrouter/api/activity) for more information."},"Attributes":{"type":"string","description":"The JSON string that describes the Worker. For example: `{ \"email\": \"Bob@example.com\", \"phone\": \"+5095551234\" }`. This data is passed to the `assignment_callback_url` when TaskRouter assigns a Task to the Worker. Defaults to {}.","x-twilio":{"pii":{"handling":"sensitive","deleteSla":30}}},"FriendlyName":{"type":"string","description":"A descriptive string that you create to describe the Worker. It can be up to 64 characters long.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"RejectPendingReservations":{"type":"boolean","description":"Whether to reject the Worker's pending reservations. This option is only valid if the Worker's new [Activity](https://www.twilio.com/docs/taskrouter/api/activity) resource has its `availability` property set to `False`."}}},"examples":{"update":{"value":{"lang":"json","value":"{\n  \"ActivitySid\": \"WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"Attributes\": \"attributes\",\n  \"FriendlyName\": \"friendly_name\",\n  \"OperatingUnitSid\": \"OUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"Concurrency\": 5\n}","meta":"","code":"{\n  \"ActivitySid\": \"WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"Attributes\": \"attributes\",\n  \"FriendlyName\": \"friendly_name\",\n  \"OperatingUnitSid\": \"OUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"Concurrency\": 5\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"ActivitySid\"","#7EE787"],[":","#C9D1D9"]," ",["\"WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Attributes\"","#7EE787"],[":","#C9D1D9"]," ",["\"attributes\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"friendly_name\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"OperatingUnitSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"OUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Concurrency\"","#7EE787"],[":","#C9D1D9"]," ",["5","#79C0FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Update a Worker

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateWorker() {
  const worker = await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .workers("WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update({ activitySid: "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" });

  console.log(worker.accountSid);
}

updateWorker();
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

worker = (
    client.taskrouter.v1.workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .workers("WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update(activity_sid="WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
)

print(worker.account_sid)
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

        var worker = await WorkerResource.UpdateAsync(
            activitySid: "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(worker.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.Worker;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Worker worker = Worker.updater("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                            .setActivitySid("WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                            .update();

        System.out.println(worker.getAccountSid());
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

	params := &taskrouter.UpdateWorkerParams{}
	params.SetActivitySid("WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

	resp, err := client.TaskrouterV1.UpdateWorker("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$worker = $twilio->taskrouter->v1
    ->workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->workers("WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->update(["activitySid" => "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"]);

print $worker->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

worker = @client
         .taskrouter
         .v1
         .workspaces('WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
         .workers('WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
         .update(activity_sid: 'WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')

puts worker.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:workers:update \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --activity-sid WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X POST "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
--data-urlencode "ActivitySid=WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "blah",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "activity_sid": "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "activity_name": "Offline",
  "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "attributes": "{}",
  "available": false,
  "date_created": "2017-05-30T23:32:22Z",
  "date_updated": "2017-05-31T00:05:57Z",
  "date_status_changed": "2017-05-30T23:32:22Z",
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "channels": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels",
    "activity": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Activities/WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "workspace": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/Statistics",
    "real_time_statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/RealTimeStatistics",
    "cumulative_statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/CumulativeStatistics",
    "worker_statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Statistics",
    "worker_channels": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels",
    "reservations": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Reservations"
  }
}
```

## Delete a Worker resource

`DELETE https://taskrouter.twilio.com/v1/Workspaces/{WorkspaceSid}/Workers/{Sid}`

### Headers

```json
[{"name":"If-Match","in":"header","description":"The If-Match HTTP request header","schema":{"type":"string"}}]
```

### Path parameters

```json
[{"name":"WorkspaceSid","in":"path","description":"The SID of the Workspace with the Worker to delete.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The SID of the Worker resource to delete.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WK[0-9a-fA-F]{32}$"},"required":true}]
```

Delete a Worker

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function deleteWorker() {
  await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .workers("WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .remove();
}

deleteWorker();
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

client.taskrouter.v1.workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").workers(
    "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
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

        await WorkerResource.DeleteAsync(
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.Worker;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Worker.deleter("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete();
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

	params := &taskrouter.DeleteWorkerParams{}

	err := client.TaskrouterV1.DeleteWorker("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
    ->workers("WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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
  .workers('WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  .delete
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:workers:remove \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X DELETE "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

> \[!NOTE]
>
> If you wish to view Reservations for a particular worker, use the [Worker Reservation Resource](/docs/taskrouter/api/worker-reservation).
