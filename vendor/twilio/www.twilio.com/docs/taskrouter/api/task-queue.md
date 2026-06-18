# Task Queue resource

> \[!WARNING]
>
> Don't use the `page` query parameter with this resource. Pagination isn't supported.

TaskQueues allow you to categorize Tasks and describe which Workers are eligible to handle those Tasks. As your Workflows process Tasks, those Tasks pass through one or more TaskQueues until the Task is assigned and accepted by an eligible Worker. [`TargetWorkers` expressions](#target-workers), control which Workers are eligible to receive Tasks from a given TaskQueue.

## Task assignment precedence

A TaskQueue distributes Tasks to any Worker in an 'available' activity that meets the TaskQueue's `TargetWorkers` criteria. Tasks are assigned in the following order:

* Higher priority tasks are always assigned before lower priority tasks, regardless of the age of the lower-priority tasks.
* Among tasks of the same priority, the oldest task is always assigned first.

## TaskQueues and Activities

In a multitasking Workspace, a Worker's status does not change as they are assigned and complete Tasks. A Worker's ability to accept a new Task is informed by their active capacity. For single-tasking Workspaces, a Worker is available for a Task based on their activity status. The `AssignmentActivitySid` and `ReservationActivitySid` properties can be used to control a Worker's availability during assignment.

When a TaskQueue reserves a Worker for a Task, it places the Worker in the `ReservationActivitySid` status. If the Worker accepts the Task, the Worker is placed in the `AssignmentActivitySid` status.

Note that in a single-tasking Workspace, when a Task completes, the Worker's activity does not change. This is because whether or not a Task's completion should change a Worker's activity is dependent on the workflow—the system needs confirmation of the Worker's availability before it assigns Tasks to them again. If this is the experience you want, the easiest way to achieve this is to capture the "task.completed" event and issue an update to the associated Worker's activity at that point.

## Actions

* [List all TaskQueues](#action-list)
* [Create a TaskQueue](#create-taskqueues)
* [Retrieve a TaskQueue](#action-get)
* [Update a TaskQueue](#action-update)
* [Delete a TaskQueue](#action-delete)

## List all TaskQueues \[#action-list]

### Resource URI

```bash
GET /v1/Workspaces/{WorkspaceSid}/TaskQueues

```

Returns the list of TaskQueues in the workspace identified by \{WorkspaceSid}.

#### Example

List all TaskQueues in a Workspace

List All TaskQueues

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listTaskQueue() {
  const taskQueues = await client.taskrouter.v1
    .workspaces("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .taskQueues.list({ limit: 20 });

  taskQueues.forEach((t) => console.log(t.accountSid));
}

listTaskQueue();
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

task_queues = client.taskrouter.v1.workspaces(
    "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).task_queues.list(limit=20)

for record in task_queues:
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

        var taskQueues = await TaskQueueResource.ReadAsync(
            pathWorkspaceSid: "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", limit: 20);

        foreach (var record in taskQueues) {
            Console.WriteLine(record.AccountSid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.TaskQueue;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<TaskQueue> taskQueues = TaskQueue.reader("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").limit(20).read();

        for (TaskQueue record : taskQueues) {
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

	params := &taskrouter.ListTaskQueueParams{}
	params.SetLimit(20)

	resp, err := client.TaskrouterV1.ListTaskQueue("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

$taskQueues = $twilio->taskrouter->v1
    ->workspaces("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->taskQueues->read([], 20);

foreach ($taskQueues as $record) {
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

task_queues = @client
              .taskrouter
              .v1
              .workspaces('WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
              .task_queues
              .list(limit: 20)

task_queues.each do |record|
   puts record.account_sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:task-queues:list \
   --workspace-sid WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X GET "https://taskrouter.twilio.com/v1/Workspaces/WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/TaskQueues?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "meta": {
    "first_page_url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskQueues?EvaluateWorkerAttributes=evaluate_worker_attributes&FriendlyName=friendly_name&PageSize=50&Page=0",
    "key": "task_queues",
    "next_page_url": null,
    "page": 0,
    "page_size": 50,
    "previous_page_url": null,
    "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskQueues?EvaluateWorkerAttributes=evaluate_worker_attributes&FriendlyName=friendly_name&PageSize=50&Page=0"
  },
  "task_queues": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "assignment_activity_name": "817ca1c5-3a05-11e5-9292-98e0d9a1eb73",
      "assignment_activity_sid": "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "date_created": "2015-08-04T01:31:41Z",
      "date_updated": "2015-08-04T01:31:41Z",
      "friendly_name": "81f96435-3a05-11e5-9f81-98e0d9a1eb73",
      "max_reserved_workers": 1,
      "links": {
        "assignment_activity": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Activities/WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "reservation_activity": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Activities/WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "workspace": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskQueues/WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Statistics",
        "real_time_statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskQueues/WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RealTimeStatistics",
        "cumulative_statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskQueues/WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/CumulativeStatistics",
        "list_statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskQueues/Statistics",
        "bulk_real_time_statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskQueues/RealTimeStatistics"
      },
      "reservation_activity_name": "80fa2beb-3a05-11e5-8fc8-98e0d9a1eb73",
      "reservation_activity_sid": "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "sid": "WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "target_workers": null,
      "task_order": "FIFO",
      "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskQueues/WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ]
}
```

#### List filters

The following `GET` query string parameters allow you to limit the list returned. Note, parameters are case-sensitive:

| Field                    | Description                                                                                                                                      |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| FriendlyName             | Accepts a human-readable description of a TaskQueue (for example "Customer Support" or "2014 Election Campaign") and returns the matching Queue. |
| EvaluateWorkerAttributes | Accepts a Worker attribute expression and returns the list of TaskQueues that would distribute tasks to a worker with these attributes.          |
| WorkerSid                | Accepts a Worker SID, and returns the list of TaskQueues matched by a given Worker.                                                              |

**Note:** By default, this returns the first 50 TaskQueues. Supply a PageSize parameter to fetch more than 50 TaskQueues. See [paging](/docs/usage/twilios-response) for more information.

Create a TaskQueue

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createTaskQueue() {
  const taskQueue = await client.taskrouter.v1
    .workspaces("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .taskQueues.create({
      assignmentActivitySid: "WA21d51f4c72583766988f9860de3e130a",
      friendlyName: "English",
      reservationActivitySid: "WAea296a56ebce4bfbff0e99abadf16934",
      targetWorkers: 'languages HAS "english"',
    });

  console.log(taskQueue.accountSid);
}

createTaskQueue();
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

task_queue = client.taskrouter.v1.workspaces(
    "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).task_queues.create(
    assignment_activity_sid="WA21d51f4c72583766988f9860de3e130a",
    reservation_activity_sid="WAea296a56ebce4bfbff0e99abadf16934",
    target_workers='languages HAS "english"',
    friendly_name="English",
)

print(task_queue.account_sid)
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

        var taskQueue = await TaskQueueResource.CreateAsync(
            assignmentActivitySid: "WA21d51f4c72583766988f9860de3e130a",
            reservationActivitySid: "WAea296a56ebce4bfbff0e99abadf16934",
            targetWorkers: "languages HAS \"english\"",
            friendlyName: "English",
            pathWorkspaceSid: "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(taskQueue.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.TaskQueue;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        TaskQueue taskQueue = TaskQueue.creator("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "English")
                                  .setAssignmentActivitySid("WA21d51f4c72583766988f9860de3e130a")
                                  .setReservationActivitySid("WAea296a56ebce4bfbff0e99abadf16934")
                                  .setTargetWorkers("languages HAS \"english\"")
                                  .create();

        System.out.println(taskQueue.getAccountSid());
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

	params := &taskrouter.CreateTaskQueueParams{}
	params.SetAssignmentActivitySid("WA21d51f4c72583766988f9860de3e130a")
	params.SetReservationActivitySid("WAea296a56ebce4bfbff0e99abadf16934")
	params.SetTargetWorkers("languages HAS \"english\"")
	params.SetFriendlyName("English")

	resp, err := client.TaskrouterV1.CreateTaskQueue("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

$task_queue = $twilio->taskrouter->v1
    ->workspaces("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->taskQueues->create(
        "English", // FriendlyName
        [
            "assignmentActivitySid" => "WA21d51f4c72583766988f9860de3e130a",
            "reservationActivitySid" => "WAea296a56ebce4bfbff0e99abadf16934",
            "targetWorkers" => "languages HAS \"english\"",
        ]
    );

print $task_queue->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

task_queue = @client
             .taskrouter
             .v1
             .workspaces('WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
             .task_queues
             .create(
               assignment_activity_sid: 'WA21d51f4c72583766988f9860de3e130a',
               reservation_activity_sid: 'WAea296a56ebce4bfbff0e99abadf16934',
               target_workers: 'languages HAS "english"',
               friendly_name: 'English'
             )

puts task_queue.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:task-queues:create \
   --workspace-sid WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --assignment-activity-sid WA21d51f4c72583766988f9860de3e130a \
   --reservation-activity-sid WAea296a56ebce4bfbff0e99abadf16934 \
   --target-workers "languages HAS \"english\"" \
   --friendly-name English
```

```bash
curl -X POST "https://taskrouter.twilio.com/v1/Workspaces/WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/TaskQueues" \
--data-urlencode "AssignmentActivitySid=WA21d51f4c72583766988f9860de3e130a" \
--data-urlencode "ReservationActivitySid=WAea296a56ebce4bfbff0e99abadf16934" \
--data-urlencode "TargetWorkers=languages HAS \"english\"" \
--data-urlencode "FriendlyName=English" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "assignment_activity_name": "817ca1c5-3a05-11e5-9292-98e0d9a1eb73",
  "assignment_activity_sid": "WA21d51f4c72583766988f9860de3e130a",
  "date_created": "2015-08-04T01:31:41Z",
  "date_updated": "2015-08-04T01:31:41Z",
  "friendly_name": "English",
  "max_reserved_workers": 1,
  "links": {
    "assignment_activity": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Activities/WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "reservation_activity": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Activities/WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "workspace": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskQueues/WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Statistics",
    "real_time_statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskQueues/WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RealTimeStatistics",
    "cumulative_statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskQueues/WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/CumulativeStatistics",
    "list_statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskQueues/Statistics",
    "bulk_real_time_statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskQueues/RealTimeStatistics"
  },
  "reservation_activity_name": "80fa2beb-3a05-11e5-8fc8-98e0d9a1eb73",
  "reservation_activity_sid": "WAea296a56ebce4bfbff0e99abadf16934",
  "sid": "WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "target_workers": "languages HAS \"english\"",
  "task_order": "FIFO",
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskQueues/WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "workspace_sid": "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
}
```

##### Required parameters \[#required-post-parameters]

| Field        | Description                                                                                                                                                                                   |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FriendlyName | Human readable description of this TaskQueue (for example "Support - Tier 1", "Sales" or "Escalation") ([📇 PII](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) ) |

##### Optional parameters \[#optional-post-parameters]

| Field                  | Description                                                                                                                                                                                                                                                                                                                           |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AssignmentActivitySid  | ActivitySID to assign workers once a task is assigned for them ([🏢 not PII](/docs/glossary/what-is-personally-identifiable-information-pii#fields-marked-not-pii) )                                                                                                                                                                  |
| MaxReservedWorkers     | The maximum amount of workers to create reservations for the assignment of a task while in this queue. Defaults to 1, with a Maximum of 50. ([🏢 not PII](/docs/glossary/what-is-personally-identifiable-information-pii#fields-marked-not-pii) )                                                                                     |
| TargetWorkers          | A string describing the Worker selection criteria for any Tasks that enter this TaskQueue. For example `'"language" == "spanish"'`. Additional details on Workers expressions below. Defaults to 1==1. ([🏢 not PII](/docs/glossary/what-is-personally-identifiable-information-pii#fields-marked-not-pii) )                          |
| TaskOrder              | TaskOrder determines which order the Tasks are assigned to Workers. Set this parameter to LIFO to assign most recently created Task first or FIFO to assign the oldest Task. Default is FIFO. [Click here][LIFO] to learn more. ([🏢 not PII](/docs/glossary/what-is-personally-identifiable-information-pii#fields-marked-not-pii) ) |
| ReservationActivitySid | ActivitySID to assign workers once a task is reserved for them ([🏢 not PII](/docs/glossary/what-is-personally-identifiable-information-pii#fields-marked-not-pii) )                                                                                                                                                                  |

**Note: The maximum amount of TaskQueues allowed for any given Workspace is 5,000. Please [contact us](https://www.twilio.com/help/contact) if your use case requires more.**

#### Describe worker selection criteria using a `TargetWorkers` expression \[#target-workers]

[LIFO]: /docs/taskrouter/queue-ordering-last-first-out-lifo

> \[!WARNING]
>
> Using `TargetWorkers`, you can target individual Workers. You should not use directly identifying information (also called personally identifiable information or PII) like a person's name, home address, email or phone number. The systems that process these Queues assume there is no directly identifying information within the `TargetWorkers` expression.
>
> Instead, you should use a GUID or other pseudonymized identifier for Worker identity. You can read more about how we process your data in our [privacy policy](/en-us/legal/privacy).

TaskRouter binds Workers to TaskQueues using the TaskQueue's `TargetWorkers` expression. TargetWorkers uses an SQL-like expression syntax to filter the Workers in the Workspace.

For example, let's say we have two agents. The first worker, Alice, speaks English and handles Support and Sales Tasks. This is modeled with the following attributes:

```json
{ "skills": ["support", "sales"], "languages":["english"]}
```

The second worker, Bob, handles only Sales requests and speaks Spanish and English:

```json
{"skills": ["sales"], "languages": ["spanish", "english"]}
```

Given these Workers, we can write a `TargetWorkers` expression to route calls only to Workers with the Support skill who speak English:

```bash
(skills HAS "support") AND (languages HAS "english")
```

Only Alice would receive tasks from this TaskQueue. We could create a second TaskQueue to route calls to anyone with the Spanish language skill with the `TargetWorkers` expression:

```bash
(languages HAS "spanish")
```

And only Bob would receive tasks from this TaskQueue.

### Create TaskQueues

To create TaskQueues with the `TargetWorkers` expressions explained above, you could issue the following requests:

For the English Support TaskQueue:

```sh
curl https://taskrouter.twilio.com/v1/Workspaces/{WorkspaceSid}/TaskQueues  \
-d FriendlyName=EnglishSupport \
-d TargetWorkers='(skills HAS "support") AND (languages HAS "english")' \
-d AssignmentActivitySid={ActivitySid}
-d ReservationActivitySid={ActivitySid}
-u {AccountSid}:{AuthToken}
```

For the Spanish TaskQueue:

```sh
curl https://taskrouter.twilio.com/v1/Workspaces/{WorkspaceSid}/TaskQueues  \
-d FriendlyName=SpanishDefault \
-d TargetWorkers='(languages HAS "spanish")' \
-d AssignmentActivitySid={ActivitySid}
-d ReservationActivitySid={ActivitySid}
-u {AccountSid}:{AuthToken}
```

Skills-based distribution models, where workers are assigned integer values reflecting their expertise in a given skill, are also possible. The TaskQueues created below use skills-based routing to choose the best worker based on a `'tech_support_skill'` attribute:

```sh
curl https://taskrouter.twilio.com/v1/Workspaces/{WorkspaceSid}/TaskQueues  \
-d FriendlyName="Tech Support - Tier 1" \
-d TargetWorkers="tech_support_skill < 5" \
-d AssignmentActivitySid={ActivitySid}
-d ReservationActivitySid={ActivitySid}
-u {AccountSid}:{AuthToken}
```

```sh
curl https://taskrouter.twilio.com/v1//Workspaces/{WorkspaceSid}/TaskQueues \
-d FriendlyName="Tech Support - Escalation" \
-d TargetWorkers="tech_support_skill > 5" \
-d AssignmentActivitySid={ActivitySid}
-d ReservationActivitySid={ActivitySid}
-u {AccountSid}:{AuthToken}
```

To distribute tasks to any Worker, provide an expression that always evaluates to true:

```sh
curl https://taskrouter.twilio.com/v1/Workspaces/{WorkspaceSid}/TaskQueues \
-d FriendlyName="Everyone" \
-d TargetWorkers="1==1" \
-u {AccountSid}:{AuthToken}
TargetWorkers: Supported operators
```

#### `EvaluateWorkerAttributes` parameter

TaskQueue's list resource `EvaluateWorkerAttributes` parameter allows you to view which of your Workers match a given `TargetWorkers` expression.

The example below is a way to check which TaskQueues would be mapped to a worker with attributes of `tech_support_skill` of 6. Using the above example, this should map to Tech Support - Escalation queue.

```sh
curl -XGET https://taskrouter.twilio.com/v1/Workspaces/{WorkspaceSid}/TaskQueues \
--data-urlencode EvaluateWorkerAttributes='{"tech_support_skill": "6"}'
-u {AccountSid}:{AuthToken}
```

#### `TargetWorkers` operators

You may use the following operators in your TargetWorkers expressions:

* Equality: `==`, `=`
* Inequality: `!=`
* Greater than: `>`
* Less than: `<`
* Greater than or equal to: `>=`
* Less than or equal to: `<=`
* Use parentheses to indicate precedence of operations: `( )`
* Use brackets to indicate lists/arrays: `[ ]`
* `HAS`, `>-` for determining whether the value of the Worker attribute on the left-hand side of the expression contains the string on the right side of the comparison.
* `IN`, `<-` for determining whether the value of the Worker attribute on the left-hand side of the expression is \* contained in the list on the right-hand side.
* `AND` if both the left and right subexpressions are true, resolves to true, otherwise false
* `OR` - if one or both of the left or right subexpressions are true, resolves to true, otherwise false

#### Multi-reservation

A common request is the ability to create reservations for a set of workers in a given queue when a task comes in.
You may configure a MaxReservedWorkers parameter on a queue to do just that. When a task routes to a particular queue through
a workflow, TaskRouter creates reservations for all workers that are available up to the MaxReservedWorkers parameter. Once one worker accepts the reservation for the task, all other reservations are rescinded. Any attempts to accept a rescinded reservation, the user receives a 410 series response, indicating that the reservationcan no longer accept the reservation of the task.

For example:

A Task becomes escalated to the "Tech Support - Escalation" TaskQueue, where there are 2 workers available and the MaxReservedWorkers parameter is configured to be 5.
A Reservation is created for each worker - 2 total.
An Assignment Callback is created for each Reservation.
An Event Callback is created for each Reservation creation.

Worker 1 accepts the reservation.
Worker 2 receives a notification that their Reservation is rescinded through the EventCallbackUrl and the JS SDK.

## Retrieve a TaskQueue \[#action-get]

### Resource URI \[#resource-uri-2]

```bash
GET /v1/Workspaces/{WorkspaceSid}/TaskQueues/{TaskQueueSid}

```

Return a single TaskQueue resource identified by \{TaskQueueSid}.

#### Example \[#example-2]

Example for retrieving a single TaskQueue from a workspace

Retrieve a TaskQueue

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchTaskQueue() {
  const taskQueue = await client.taskrouter.v1
    .workspaces("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .taskQueues("WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .fetch();

  console.log(taskQueue.accountSid);
}

fetchTaskQueue();
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

task_queue = (
    client.taskrouter.v1.workspaces("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .task_queues("WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .fetch()
)

print(task_queue.account_sid)
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

        var taskQueue = await TaskQueueResource.FetchAsync(
            pathWorkspaceSid: "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            pathSid: "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(taskQueue.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.TaskQueue;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        TaskQueue taskQueue =
            TaskQueue.fetcher("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").fetch();

        System.out.println(taskQueue.getAccountSid());
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

	resp, err := client.TaskrouterV1.FetchTaskQueue("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		"WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
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

$task_queue = $twilio->taskrouter->v1
    ->workspaces("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->taskQueues("WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->fetch();

print $task_queue->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

task_queue = @client
             .taskrouter
             .v1
             .workspaces('WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
             .task_queues('WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
             .fetch

puts task_queue.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:task-queues:fetch \
   --workspace-sid WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --sid WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X GET "https://taskrouter.twilio.com/v1/Workspaces/WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/TaskQueues/WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "assignment_activity_name": "817ca1c5-3a05-11e5-9292-98e0d9a1eb73",
  "assignment_activity_sid": "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2015-08-04T01:31:41Z",
  "date_updated": "2015-08-04T01:31:41Z",
  "friendly_name": "81f96435-3a05-11e5-9f81-98e0d9a1eb73",
  "max_reserved_workers": 1,
  "links": {
    "assignment_activity": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Activities/WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "reservation_activity": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Activities/WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "workspace": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskQueues/WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Statistics",
    "real_time_statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskQueues/WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RealTimeStatistics",
    "cumulative_statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskQueues/WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/CumulativeStatistics",
    "list_statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskQueues/Statistics",
    "bulk_real_time_statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskQueues/RealTimeStatistics"
  },
  "reservation_activity_name": "80fa2beb-3a05-11e5-8fc8-98e0d9a1eb73",
  "reservation_activity_sid": "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "target_workers": null,
  "task_order": "FIFO",
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskQueues/WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "workspace_sid": "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
}
```

#### Resource properties

A TaskQueue instance resource is represented by the following properties.

| Field                  | Description                                                                                                            |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Sid                    | The unique ID of the TaskQueue                                                                                         |
| AccountSid             | The ID of the Account that owns this TaskQueue                                                                         |
| WorkspaceSid           | The ID of the Workspace that owns this TaskQueue                                                                       |
| FriendlyName           | Human readable description of the TaskQueue (for example "Customer Support" or "Sales")                                |
| TargetWorkers          | The worker selection expressions associated with this TaskQueue.                                                       |
| ReservationActivitySid | The Activity to assign a Worker when they are reserved for a Task from this TaskQueue. Defaults to 'Reserved for Task' |
| AssignmentActivitySid  | The Activity to assign a Worker when they accept a Task from this TaskQueue. Defaults to 'Unavailable for Assignment'. |
| MaxReservedWorkers     | The maximum amount of workers to create reservations for the assignment of a task while in this queue.                 |

## Update a TaskQueue \[#action-update]

### Resource URI \[#resource-uri-3]

```bash
POST /v1/Workspaces/{WorkspaceSid}/TaskQueues/{TaskQueueSid}

```

Modifies the TaskQueue. If you modify a TaskQueue and alter its TargetWorkers expression, the Worker statistics associated with this TaskQueue are reset to reflect the new TargetWorkers. Task statistics for this TaskQueue remain unchanged.

#### Example \[#example-3]

Example for updating TaskQueue

Update a TaskQueue

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateTaskQueue() {
  const taskQueue = await client.taskrouter.v1
    .workspaces("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .taskQueues("WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .update({ targetWorkers: 'languages HAS "english"' });

  console.log(taskQueue.accountSid);
}

updateTaskQueue();
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

task_queue = (
    client.taskrouter.v1.workspaces("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .task_queues("WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .update(target_workers='languages HAS "english"')
)

print(task_queue.account_sid)
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

        var taskQueue = await TaskQueueResource.UpdateAsync(
            targetWorkers: "languages HAS \"english\"",
            pathWorkspaceSid: "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            pathSid: "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(taskQueue.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.TaskQueue;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        TaskQueue taskQueue =
            TaskQueue.updater("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                .setTargetWorkers("languages HAS \"english\"")
                .update();

        System.out.println(taskQueue.getAccountSid());
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

	params := &taskrouter.UpdateTaskQueueParams{}
	params.SetTargetWorkers("languages HAS \"english\"")

	resp, err := client.TaskrouterV1.UpdateTaskQueue("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		"WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

$task_queue = $twilio->taskrouter->v1
    ->workspaces("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->taskQueues("WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->update(["targetWorkers" => "languages HAS \"english\""]);

print $task_queue->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

task_queue = @client
             .taskrouter
             .v1
             .workspaces('WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
             .task_queues('WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
             .update(target_workers: 'languages HAS "english"')

puts task_queue.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:task-queues:update \
   --workspace-sid WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --sid WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --target-workers "languages HAS \"english\""
```

```bash
curl -X POST "https://taskrouter.twilio.com/v1/Workspaces/WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/TaskQueues/WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
--data-urlencode "TargetWorkers=languages HAS \"english\"" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "assignment_activity_name": "817ca1c5-3a05-11e5-9292-98e0d9a1eb73",
  "assignment_activity_sid": "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2015-08-04T01:31:41Z",
  "date_updated": "2015-08-04T01:31:41Z",
  "friendly_name": "81f96435-3a05-11e5-9f81-98e0d9a1eb73",
  "max_reserved_workers": 1,
  "links": {
    "assignment_activity": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Activities/WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "reservation_activity": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Activities/WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "workspace": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskQueues/WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Statistics",
    "real_time_statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskQueues/WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RealTimeStatistics",
    "cumulative_statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskQueues/WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/CumulativeStatistics",
    "list_statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskQueues/Statistics",
    "bulk_real_time_statistics": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskQueues/RealTimeStatistics"
  },
  "reservation_activity_name": "80fa2beb-3a05-11e5-8fc8-98e0d9a1eb73",
  "reservation_activity_sid": "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "target_workers": "languages HAS \"english\"",
  "task_order": "FIFO",
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskQueues/WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "workspace_sid": "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
}
```

#### POST parameters

You may post the parameters below when modifying a TaskQueue.

| Parameter              | Description                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FriendlyName           | Human readable description of this TaskQueue (for example "Support - Tier 1", "Sales" or "Escalation") ([📇 PII](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) )                                                                                                                                                                                                                                                 |
| TargetWorkers          | A string describing the Worker selection criteria for any Tasks that enter this TaskQueue. For example '"language" == "spanish"' If no TargetWorkers parameter is provided, Tasks wait in this queue until they are either deleted or moved to another queue. Additional examples on how to describing Worker selection criteria below. ([🏢 not PII](/docs/glossary/what-is-personally-identifiable-information-pii#fields-marked-not-pii) ) |
| ReservationActivitySid | ActivitySID that's assigned to Workers when they are reserved for a task from this TaskQueue. ([🏢 not PII](/docs/glossary/what-is-personally-identifiable-information-pii#fields-marked-not-pii) )                                                                                                                                                                                                                                           |
| AssignmentActivitySid  | ActivitySID that's assigned to Workers when they are assigned a task from this TaskQueue. ([🏢 not PII](/docs/glossary/what-is-personally-identifiable-information-pii#fields-marked-not-pii) )                                                                                                                                                                                                                                               |
| MaxReservedWorkers     | The maximum amount of workers to create reservations for the assignment of a task while in this queue. Maximum of 50. ([🏢 not PII](/docs/glossary/what-is-personally-identifiable-information-pii#fields-marked-not-pii) )                                                                                                                                                                                                                   |
| TaskOrder              | TaskOrder determines which order the Tasks are assigned to Workers. Set this parameter to LIFO to assign most recently created Task first or FIFO to assign the oldest Task. Default is FIFO. [Click here][LIFO] to learn more. ([🏢 not PII](/docs/glossary/what-is-personally-identifiable-information-pii#fields-marked-not-pii) )                                                                                                         |

## Delete a TaskQueue \[#action-delete]

### Resource URI \[#resource-uri-4]

```bash
DELETE /v1/Workspaces/{WorkspaceSid}/TaskQueues/{TaskQueueSid}

```

Removes the TaskQueue identified by \{TaskQueueSid}.

If associated Workflows' routing logic was recently updated, pending Tasks may still be processing against this queue, but the response will be a 400.

#### Example \[#example-4]

Example for deleting a TaskQueue

Delete a TaskQueue

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function deleteTaskQueue() {
  await client.taskrouter.v1
    .workspaces("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .taskQueues("WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .remove();
}

deleteTaskQueue();
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

client.taskrouter.v1.workspaces(
    "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).task_queues("WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").delete()
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

        await TaskQueueResource.DeleteAsync(
            pathWorkspaceSid: "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            pathSid: "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.TaskQueue;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        TaskQueue.deleter("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").delete();
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

	err := client.TaskrouterV1.DeleteTaskQueue("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		"WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
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
    ->workspaces("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->taskQueues("WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
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
  .workspaces('WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  .task_queues('WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  .delete
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:task-queues:remove \
   --workspace-sid WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --sid WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X DELETE "https://taskrouter.twilio.com/v1/Workspaces/WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/TaskQueues/WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```
