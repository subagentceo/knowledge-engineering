# REST API: TaskQueue Statistics

TaskRouter provides real time and historical statistics for TaskQueues. Historical statistics allow you to analyze data from the past 30 days.

Twilio offers the following APIs for TaskQueue statistics:

* [Retrieving real-time statistics for a single queue](#taskqueue-realtime-statistics)
* [Retrieving real-time statistics for up to 50 queues](#bulk-retrieval-of-taskqueue-realtime-statistics)
* [Retrieving cumulative statistics over a specific interval for a single queue](#taskqueue-cumulative-statistics)
* [Retrieving both real-time and cumulative statistics for a single queue](#taskqueue-instance-statistics)

## TaskQueue RealTime Statistics

If you are only concerned with the real time statistics of your TaskQueue, you can use the following endpoint. Real time statistics may take a few seconds to update due to event latency.

> \[!WARNING]
>
> We recommended leveraging caching when utilizing this endpoint from your backend application to ensure this endpoint can support your scaling needs.
>
> In scenarios where this endpoint would be used from a client application, we recommend implementing a sync layer, e.g., via [Twilio Sync](/docs/sync/api), to help synchronize this endpoint's state across all clients, and to ensure this endpoint can scale with your user growth.

### Resource URI

```bash
GET /v1/Workspaces/{WorkspaceSid}/TaskQueues/{TaskQueueSid}/RealTimeStatistics

```

### Path parameters

```json
[{"name":"WorkspaceSid","in":"path","description":"The SID of the Workspace with the TaskQueue to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$"},"required":true},{"name":"TaskQueueSid","in":"path","description":"The SID of the TaskQueue for which to fetch statistics.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WQ[0-9a-fA-F]{32}$"},"required":true}]
```

### Query parameters

```json
[{"name":"TaskChannel","in":"query","description":"The TaskChannel for which to fetch statistics. Can be the TaskChannel's SID or its `unique_name`, such as `voice`, `sms`, or `default`.","schema":{"type":"string"},"examples":{"fetch":{"value":"voice"}}}]
```

Real time statistics relating to a TaskQueue include the following:

```json
{"type":"object","refName":"taskrouter.v1.workspace.task_queue.task_queue_real_time_statistics","modelName":"taskrouter_v1_workspace_task_queue_task_queue_real_time_statistics","properties":{"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the TaskQueue resource."},"activity_statistics":{"type":"array","nullable":true,"description":"The number of current Workers by Activity."},"longest_task_waiting_age":{"type":"integer","default":0,"description":"The age of the longest waiting Task."},"longest_task_waiting_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WT[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the longest waiting Task."},"longest_relative_task_age_in_queue":{"type":"integer","default":0,"description":"The relative age in the TaskQueue for the longest waiting Task. Calculation is based on the time when the Task entered the TaskQueue."},"longest_relative_task_sid_in_queue":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WT[0-9a-fA-F]{32}$","nullable":true,"description":"The Task SID of the Task waiting in the TaskQueue the longest. Calculation is based on the time when the Task entered the TaskQueue."},"task_queue_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WQ[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the TaskQueue from which these statistics were calculated."},"tasks_by_priority":{"nullable":true,"description":"The number of Tasks by priority. For example: `{\"0\": \"10\", \"99\": \"5\"}` shows 10 Tasks at priority 0 and 5 at priority 99."},"tasks_by_status":{"nullable":true,"description":"The number of Tasks by their current status. For example: `{\"pending\": \"1\", \"reserved\": \"3\", \"assigned\": \"2\", \"completed\": \"5\"}`."},"total_available_workers":{"type":"integer","default":0,"description":"The total number of Workers in the TaskQueue with an `available` status. Workers with an `available` status may already have active interactions or may have none."},"total_eligible_workers":{"type":"integer","default":0,"description":"The total number of Workers eligible for Tasks in the TaskQueue, independent of their Activity state."},"total_tasks":{"type":"integer","default":0,"description":"The total number of Tasks."},"workspace_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the Workspace that contains the TaskQueue."},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the TaskQueue statistics resource."}}}
```

### Examples

Retrieving TaskQueue RealTime Statistics

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchTaskQueueRealTimeStatistics() {
  const realTimeStatistic = await client.taskrouter.v1
    .workspaces("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .taskQueues("WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .realTimeStatistics()
    .fetch();

  console.log(realTimeStatistic.accountSid);
}

fetchTaskQueueRealTimeStatistics();
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

real_time_statistic = (
    client.taskrouter.v1.workspaces("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .task_queues("WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .real_time_statistics()
    .fetch()
)

print(real_time_statistic.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Taskrouter.V1.Workspace.TaskQueue;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var taskQueueRealTimeStatistics = await TaskQueueRealTimeStatisticsResource.FetchAsync(
            pathWorkspaceSid: "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            pathTaskQueueSid: "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(taskQueueRealTimeStatistics.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.taskqueue.TaskQueueRealTimeStatistics;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        TaskQueueRealTimeStatistics taskQueueRealTimeStatistics =
            TaskQueueRealTimeStatistics
                .fetcher("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                .fetch();

        System.out.println(taskQueueRealTimeStatistics.getAccountSid());
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

	params := &taskrouter.FetchTaskQueueRealTimeStatisticsParams{}

	resp, err := client.TaskrouterV1.FetchTaskQueueRealTimeStatistics("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

$real_time_statistic = $twilio->taskrouter->v1
    ->workspaces("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->taskQueues("WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->realTimeStatistics()
    ->fetch();

print $real_time_statistic->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

real_time_statistic = @client
                      .taskrouter
                      .v1
                      .workspaces('WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                      .task_queues('WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                      .real_time_statistics
                      .fetch

puts real_time_statistic.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:task-queues:real-time-statistics:fetch \
   --workspace-sid WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --task-queue-sid WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X GET "https://taskrouter.twilio.com/v1/Workspaces/WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/TaskQueues/WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/RealTimeStatistics" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "longest_task_waiting_age": 100,
  "longest_task_waiting_sid": "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "longest_relative_task_age_in_queue": 100,
  "longest_relative_task_sid_in_queue": "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "task_queue_sid": "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "tasks_by_status": {
    "reserved": 0,
    "pending": 0,
    "assigned": 0,
    "wrapping": 0
  },
  "total_eligible_workers": 100,
  "activity_statistics": [
    {
      "friendly_name": "Idle",
      "workers": 0,
      "sid": "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    },
    {
      "friendly_name": "Busy",
      "workers": 9,
      "sid": "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    },
    {
      "friendly_name": "Offline",
      "workers": 6,
      "sid": "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    },
    {
      "friendly_name": "Reserved",
      "workers": 0,
      "sid": "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ],
  "tasks_by_priority": {},
  "total_tasks": 100,
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "workspace_sid": "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "total_available_workers": 100,
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskQueues/WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RealTimeStatistics"
}
```

## Bulk retrieval of TaskQueue RealTime Statistics

To retrieve real-time statistics for multiple queues, you can utilize the below endpoint.

### Resource URI \[#resource-uri-2]

```bash
POST /v1/Workspaces/{WorkspaceSid}/TaskQueues/RealTimeStatistics

```

| Uri Parameters                                                                                                |
| ------------------------------------------------------------------------------------------------------------- |
| **WorkspaceSid**<br /><br />`POST` `SID<WS>` `NOT PII`<br /><br />The unique SID identifier of the Workspace. |

### POST Parameters

| Field     | Required? | Description                                                                                                                                                       |
| --------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| QueueSids | Yes       | String array where each string represents one TaskQueueSID. ([🏢 Not PII](/docs/glossary/what-is-personally-identifiable-information-pii#fields-marked-not-pii) ) |

Real time statistics for TaskQueueSIDs provided as `POST` parameter include the following:

```json
{"type":"object","refName":"taskrouter.v1.workspace.task_queue.task_queue_bulk_real_time_statistics","modelName":"taskrouter_v1_workspace_task_queue_task_queue_bulk_real_time_statistics","properties":{"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the TaskQueue resource."},"workspace_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the Workspace that contains the TaskQueue."},"task_queue_data":{"type":"array","nullable":true,"description":"The real-time statistics for each requested TaskQueue SID. `task_queue_data` returns the following attributes:\n\n`task_queue_sid`: The SID of the TaskQueue from which these statistics were calculated.\n\n`total_available_workers`: The total number of Workers available for Tasks in the TaskQueue.\n\n`total_eligible_workers`: The total number of Workers eligible for Tasks in the TaskQueue, regardless of their Activity state.\n\n`total_tasks`: The total number of Tasks.\n\n`longest_task_waiting_age`: The age of the longest waiting Task.\n\n`longest_task_waiting_sid`: The SID of the longest waiting Task.\n\n`tasks_by_status`: The number of Tasks grouped by their current status.\n\n`tasks_by_priority`: The number of Tasks grouped by priority.\n\n`activity_statistics`: The number of current Workers grouped by Activity.\n"},"task_queue_response_count":{"type":"integer","default":0,"description":"The number of TaskQueue statistics received in task_queue_data."},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the TaskQueue statistics resource."}}}
```

### Validation

The request body is validated for the following conditions:

* If the number of TaskQueueSIDs in the request body is less than 1 or exceeds 50, an HTTP 400 error is returned.
* If the request body contains invalid TaskQueueSIDs, an HTTP 400 error is returned.
* If the request body includes valid TaskQueueSIDs that are not part of this account, these TaskQueueSIDs are included in the response but with zero values for all statistics.
* This Bulk Retrieval API has a rate limit of 5 requests per second. If this rate limit is exceeded, an HTTP 429 error is returned.

### Examples \[#examples-2]

Bulk retrieval of TaskQueue RealTime Statistics

```bash
curl --location --request POST 'https://taskrouter.twilio.com/v1/Workspaces/WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/TaskQueues/RealTimeStatistics' \
--header 'Content-Type: application/json' \
--data-raw '{
   "queueSids": [
        "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "WQYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY",
        "WQZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ"
   ]
}'
```

## TaskQueue Cumulative Statistics

If you are only concerned with the cumulative statistics over a certain time period, you can utilize the below endpoint. Cumulative statistics allow you to analyze data from the past 30 days.

### Resource URI \[#resource-uri-3]

```bash
GET /v1/Workspaces/{WorkspaceSid}/TaskQueues/{TaskQueueSid}/CumulativeStatistics

```

### Path parameters

```json
[{"name":"WorkspaceSid","in":"path","description":"The SID of the Workspace with the TaskQueue to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$"},"required":true},{"name":"TaskQueueSid","in":"path","description":"The SID of the TaskQueue for which to fetch statistics.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WQ[0-9a-fA-F]{32}$"},"required":true}]
```

### Query parameters

```json
[{"name":"EndDate","in":"query","description":"Only calculate statistics from this date and time and earlier, specified in GMT as an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date-time.","schema":{"type":"string","format":"date-time"},"examples":{"fetch":{"value":"2015-07-30T20:00:00Z"}}},{"name":"Minutes","in":"query","description":"Only calculate statistics since this many minutes in the past. The default is 15 minutes.","schema":{"type":"integer"}},{"name":"StartDate","in":"query","description":"Only calculate statistics from this date and time and later, specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.","schema":{"type":"string","format":"date-time"},"examples":{"fetch":{"value":"2015-07-30T20:00:00Z"}}},{"name":"TaskChannel","in":"query","description":"Only calculate cumulative statistics on this TaskChannel. Can be the TaskChannel's SID or its `unique_name`, such as `voice`, `sms`, or `default`.","schema":{"type":"string"}},{"name":"SplitByWaitTime","in":"query","description":"A comma separated list of values that describes the thresholds, in seconds, to calculate statistics on. For each threshold specified, the number of Tasks canceled and reservations accepted above and below the specified thresholds in seconds are computed. TaskRouter will calculate statistics on up to 10,000 Tasks/Reservations for any given threshold.","schema":{"type":"string"}}]
```

Cumulative statistics relating to a TaskQueue include the following over the interval:

```json
{"type":"object","refName":"taskrouter.v1.workspace.task_queue.task_queue_cumulative_statistics","modelName":"taskrouter_v1_workspace_task_queue_task_queue_cumulative_statistics","properties":{"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the TaskQueue resource."},"avg_task_acceptance_time":{"type":"integer","default":0,"description":"The average time in seconds between Task creation and acceptance."},"start_time":{"type":"string","format":"date-time","nullable":true,"description":"The beginning of the interval during which these statistics were calculated, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"end_time":{"type":"string","format":"date-time","nullable":true,"description":"The end of the interval during which these statistics were calculated, in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"reservations_created":{"type":"integer","default":0,"description":"The total number of Reservations created for Tasks in the TaskQueue."},"reservations_accepted":{"type":"integer","default":0,"description":"The total number of Reservations accepted for Tasks in the TaskQueue."},"reservations_rejected":{"type":"integer","default":0,"description":"The total number of Reservations rejected for Tasks in the TaskQueue."},"reservations_timed_out":{"type":"integer","default":0,"description":"The total number of Reservations that timed out for Tasks in the TaskQueue."},"reservations_canceled":{"type":"integer","default":0,"description":"The total number of Reservations canceled for Tasks in the TaskQueue."},"reservations_rescinded":{"type":"integer","default":0,"description":"The total number of Reservations rescinded."},"split_by_wait_time":{"nullable":true,"description":"A list of objects that describe the number of Tasks canceled and reservations accepted above and below the thresholds specified in seconds."},"task_queue_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WQ[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the TaskQueue from which these statistics were calculated."},"wait_duration_until_accepted":{"nullable":true,"description":"The wait duration statistics (`avg`, `min`, `max`, `total`) for Tasks accepted while in the TaskQueue. Calculation is based on the time when the Tasks were created. For transfers, the wait duration is counted from the moment ***the Task was created***, and not from when the transfer was initiated."},"wait_duration_until_canceled":{"nullable":true,"description":"The wait duration statistics (`avg`, `min`, `max`, `total`) for Tasks canceled while in the TaskQueue."},"wait_duration_in_queue_until_accepted":{"nullable":true,"description":"The relative wait duration statistics (`avg`, `min`, `max`, `total`) for Tasks accepted while in the TaskQueue. Calculation is based on the time when the Tasks entered the TaskQueue."},"tasks_canceled":{"type":"integer","default":0,"description":"The total number of Tasks canceled in the TaskQueue."},"tasks_completed":{"type":"integer","default":0,"description":"The total number of Tasks completed in the TaskQueue."},"tasks_deleted":{"type":"integer","default":0,"description":"The total number of Tasks deleted in the TaskQueue."},"tasks_entered":{"type":"integer","default":0,"description":"The total number of Tasks entered into the TaskQueue."},"tasks_moved":{"type":"integer","default":0,"description":"The total number of Tasks that were moved from one queue to another."},"workspace_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the Workspace that contains the TaskQueue."},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the TaskQueue statistics resource."}}}
```

> \[!NOTE]
>
> Note that for transfers, the splitByWaitTime does not include the wait time post transfer, and hence transfers should not impact SLA calculations based on the above endpoint.

### Examples \[#examples-3]

Retrieving TaskQueue Cumulative Statistics

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchTaskQueueCumulativeStatistics() {
  const cumulativeStatistic = await client.taskrouter.v1
    .workspaces("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .taskQueues("WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .cumulativeStatistics()
    .fetch();

  console.log(cumulativeStatistic.accountSid);
}

fetchTaskQueueCumulativeStatistics();
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

cumulative_statistic = (
    client.taskrouter.v1.workspaces("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .task_queues("WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .cumulative_statistics()
    .fetch()
)

print(cumulative_statistic.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Taskrouter.V1.Workspace.TaskQueue;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var taskQueueCumulativeStatistics = await TaskQueueCumulativeStatisticsResource.FetchAsync(
            pathWorkspaceSid: "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            pathTaskQueueSid: "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(taskQueueCumulativeStatistics.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.taskqueue.TaskQueueCumulativeStatistics;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        TaskQueueCumulativeStatistics taskQueueCumulativeStatistics =
            TaskQueueCumulativeStatistics
                .fetcher("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                .fetch();

        System.out.println(taskQueueCumulativeStatistics.getAccountSid());
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

	params := &taskrouter.FetchTaskQueueCumulativeStatisticsParams{}

	resp, err := client.TaskrouterV1.FetchTaskQueueCumulativeStatistics("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

$cumulative_statistic = $twilio->taskrouter->v1
    ->workspaces("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->taskQueues("WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->cumulativeStatistics()
    ->fetch();

print $cumulative_statistic->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

cumulative_statistic = @client
                       .taskrouter
                       .v1
                       .workspaces('WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                       .task_queues('WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                       .cumulative_statistics
                       .fetch

puts cumulative_statistic.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:task-queues:cumulative-statistics:fetch \
   --workspace-sid WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --task-queue-sid WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X GET "https://taskrouter.twilio.com/v1/Workspaces/WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/TaskQueues/WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/CumulativeStatistics" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "reservations_created": 100,
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "reservations_rejected": 100,
  "tasks_completed": 100,
  "end_time": "2015-07-30T20:00:00Z",
  "tasks_entered": 100,
  "tasks_canceled": 100,
  "reservations_accepted": 100,
  "task_queue_sid": "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "reservations_timed_out": 100,
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskQueues/WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/CumulativeStatistics",
  "wait_duration_until_canceled": {
    "avg": 0,
    "min": 0,
    "max": 0,
    "total": 0
  },
  "wait_duration_until_accepted": {
    "avg": 0,
    "min": 0,
    "max": 0,
    "total": 0
  },
  "wait_duration_in_queue_until_accepted": {
    "avg": 0,
    "min": 0,
    "max": 0,
    "total": 0
  },
  "split_by_wait_time": {
    "5": {
      "above": {
        "tasks_canceled": 0,
        "reservations_accepted": 0
      },
      "below": {
        "tasks_canceled": 0,
        "reservations_accepted": 0
      }
    },
    "10": {
      "above": {
        "tasks_canceled": 0,
        "reservations_accepted": 0
      },
      "below": {
        "tasks_canceled": 0,
        "reservations_accepted": 0
      }
    }
  },
  "start_time": "2015-07-30T20:00:00Z",
  "tasks_moved": 100,
  "reservations_canceled": 100,
  "workspace_sid": "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "tasks_deleted": 100,
  "reservations_rescinded": 100,
  "avg_task_acceptance_time": 100
}
```

## TaskQueue Instance Statistics

### Resource URI \[#resource-uri-4]

```bash
GET /v1/Workspaces/{WorkspaceSid}/TaskQueues/{TaskQueueSid}/Statistics

```

### Path parameters

```json
[{"name":"WorkspaceSid","in":"path","description":"The SID of the Workspace with the TaskQueue to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$"},"required":true},{"name":"TaskQueueSid","in":"path","description":"The SID of the TaskQueue for which to fetch statistics.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WQ[0-9a-fA-F]{32}$"},"required":true}]
```

### Query parameters

```json
[{"name":"EndDate","in":"query","description":"Only calculate statistics from this date and time and earlier, specified in GMT as an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date-time.","schema":{"type":"string","format":"date-time"},"examples":{"fetch":{"value":"2008-01-02T00:00:00Z"}}},{"name":"Minutes","in":"query","description":"Only calculate statistics since this many minutes in the past. The default is 15 minutes.","schema":{"type":"integer"},"examples":{"fetch":{"value":1}}},{"name":"StartDate","in":"query","description":"Only calculate statistics from this date and time and later, specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.","schema":{"type":"string","format":"date-time"},"examples":{"fetch":{"value":"2008-01-02T00:00:00Z"}}},{"name":"TaskChannel","in":"query","description":"Only calculate real-time and cumulative statistics for the specified TaskChannel. Can be the TaskChannel's SID or its `unique_name`, such as `voice`, `sms`, or `default`.","schema":{"type":"string"}},{"name":"SplitByWaitTime","in":"query","description":"A comma separated list of values that describes the thresholds, in seconds, to calculate statistics on. For each threshold specified, the number of Tasks canceled and reservations accepted above and below the specified thresholds in seconds are computed.","schema":{"type":"string"}}]
```

> \[!WARNING]
>
> `Minutes` cannot be used in combination with `StartDate` and `EndDate` parameters. If no parameters are passed, 15 minutes will be the default.

```json
{"type":"object","refName":"taskrouter.v1.workspace.task_queue.task_queue_statistics","modelName":"taskrouter_v1_workspace_task_queue_task_queue_statistics","properties":{"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the TaskQueue resource."},"cumulative":{"nullable":true,"description":"An object that contains the cumulative statistics for the TaskQueue."},"realtime":{"nullable":true,"description":"An object that contains the real-time statistics for the TaskQueue."},"task_queue_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WQ[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the TaskQueue from which these statistics were calculated."},"workspace_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the Workspace that contains the TaskQueue."},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the TaskQueue statistics resource."}}}
```

### Examples \[#examples-4]

Retrieving TaskQueue Instance Statistics

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchTaskQueueStatistics() {
  const statistic = await client.taskrouter.v1
    .workspaces("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .taskQueues("WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .statistics()
    .fetch();

  console.log(statistic.accountSid);
}

fetchTaskQueueStatistics();
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

statistic = (
    client.taskrouter.v1.workspaces("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .task_queues("WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .statistics()
    .fetch()
)

print(statistic.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Taskrouter.V1.Workspace.TaskQueue;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var taskQueueStatistics = await TaskQueueStatisticsResource.FetchAsync(
            pathWorkspaceSid: "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            pathTaskQueueSid: "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(taskQueueStatistics.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.taskqueue.TaskQueueStatistics;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        TaskQueueStatistics taskQueueStatistics =
            TaskQueueStatistics.fetcher("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                .fetch();

        System.out.println(taskQueueStatistics.getAccountSid());
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

	params := &taskrouter.FetchTaskQueueStatisticsParams{}

	resp, err := client.TaskrouterV1.FetchTaskQueueStatistics("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

$statistic = $twilio->taskrouter->v1
    ->workspaces("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->taskQueues("WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->statistics()
    ->fetch();

print $statistic->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

statistic = @client
            .taskrouter
            .v1
            .workspaces('WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
            .task_queues('WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
            .statistics
            .fetch

puts statistic.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:task-queues:statistics:fetch \
   --workspace-sid WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --task-queue-sid WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X GET "https://taskrouter.twilio.com/v1/Workspaces/WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/TaskQueues/WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Statistics" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskQueues/WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Statistics",
  "cumulative": {
    "avg_task_acceptance_time": 0,
    "end_time": "2015-08-18T08:42:34Z",
    "reservations_accepted": 0,
    "reservations_canceled": 0,
    "reservations_created": 0,
    "reservations_rejected": 0,
    "reservations_rescinded": 0,
    "reservations_timed_out": 0,
    "start_time": "2015-08-18T08:27:34Z",
    "tasks_canceled": 0,
    "tasks_deleted": 0,
    "tasks_entered": 0,
    "tasks_moved": 0
  },
  "realtime": {
    "activity_statistics": [
      {
        "friendly_name": "Offline",
        "sid": "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "workers": 0
      },
      {
        "friendly_name": "Idle",
        "sid": "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "workers": 0
      },
      {
        "friendly_name": "80fa2beb-3a05-11e5-8fc8-98e0d9a1eb73",
        "sid": "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "workers": 0
      },
      {
        "friendly_name": "Reserved",
        "sid": "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "workers": 0
      },
      {
        "friendly_name": "Busy",
        "sid": "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "workers": 0
      },
      {
        "friendly_name": "817ca1c5-3a05-11e5-9292-98e0d9a1eb73",
        "sid": "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "workers": 0
      }
    ],
    "longest_task_waiting_age": 0,
    "longest_task_waiting_sid": "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "tasks_by_status": {
      "assigned": 0,
      "pending": 0,
      "reserved": 0,
      "wrapping": 0
    },
    "total_available_workers": 0,
    "total_eligible_workers": 0,
    "total_tasks": 0
  },
  "task_queue_sid": "WQXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "workspace_sid": "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
}
```
