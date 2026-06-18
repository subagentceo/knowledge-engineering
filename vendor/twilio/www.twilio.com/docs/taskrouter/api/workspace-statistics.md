# REST API: Workspace Statistics

TaskRouter provides real time and historical statistics for Workspaces. Historical statistics allow you to analyze data from the past 30 days.

## Workspace Statistics

### Resource URI

```bash
GET /v1/Workspaces/{WorkspaceSid}/Statistics

```

Retrieve workspace statistics

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchWorkspaceStatistics() {
  const statistic = await client.taskrouter.v1
    .workspaces("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .statistics()
    .fetch();

  console.log(statistic.realtime);
}

fetchWorkspaceStatistics();
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
    .statistics()
    .fetch()
)

print(statistic.realtime)
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

        var workspaceStatistics = await WorkspaceStatisticsResource.FetchAsync(
            pathWorkspaceSid: "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(workspaceStatistics.Realtime);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.WorkspaceStatistics;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        WorkspaceStatistics workspaceStatistics =
            WorkspaceStatistics.fetcher("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").fetch();

        System.out.println(workspaceStatistics.getRealtime());
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

	params := &taskrouter.FetchWorkspaceStatisticsParams{}

	resp, err := client.TaskrouterV1.FetchWorkspaceStatistics("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Realtime != nil {
			fmt.Println(*resp.Realtime)
		} else {
			fmt.Println(resp.Realtime)
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
    ->statistics()
    ->fetch();

print $statistic->realtime;
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
            .statistics
            .fetch

puts statistic.realtime
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:statistics:fetch \
   --workspace-sid WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X GET "https://taskrouter.twilio.com/v1/Workspaces/WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Statistics" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Statistics",
  "cumulative": {
    "avg_task_acceptance_time": 0,
    "start_time": "2008-01-02T00:00:00Z",
    "reservations_accepted": 0,
    "reservations_canceled": 0,
    "reservations_created": 0,
    "reservations_rejected": 0,
    "reservations_rescinded": 0,
    "reservations_timed_out": 0,
    "end_time": "2008-01-02T00:00:00Z",
    "tasks_canceled": 0,
    "tasks_created": 0,
    "tasks_deleted": 0,
    "tasks_moved": 0,
    "tasks_timed_out_in_workflow": 0
  },
  "realtime": {
    "activity_statistics": [
      {
        "friendly_name": "Offline",
        "sid": "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "workers": 1
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
    "total_tasks": 0,
    "total_workers": 1
  },
  "workspace_sid": "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
}
```

| Parameter       | Description                                                                                                                                                                                                                                                                                                                          |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Minutes         | Filter cumulative statistics by up to 'x' minutes in the past. This is helpful for statistics for the last 15 minutes, 240 minutes (4 hours), and 480 minutes (8 hours) to see trends. Defaults to 15 minutes.                                                                                                                       |
| StartDate       | Filter cumulative statistics by a start date. This is helpful for defining a range of statistics to capture. Input is a GMT ISO 8601 Timestamp                                                                                                                                                                                       |
| EndDate         | Filter cumulative statistics by an end date. This is helpful for defining a range of statistics to capture. Input is a GMT ISO 8601 Timestamp                                                                                                                                                                                        |
| TaskChannel     | Filter real-time and cumulative statistics by TaskChannel. Takes in a Unique Name ("voice", "sms", "default", etc.) or a TaskChannelSid.                                                                                                                                                                                             |
| SplitByWaitTime | A comma separated values for viewing splits of tasks canceled and accepted above the given threshold in seconds. Ex: "5,30" would show splits of tasks that were canceled or accepted before or after 5 seconds and respectively, 30 seconds. This is great for showing short abandoned tasks or tasks that failed to meet your SLA. |

Note: Minutes cannot be used in combination with StartDate and EndDate parameters. If no parameters are passed, 15 minutes will be the default.

### Real Time

Real time statistics relating to a Workspace include the following:

| Property              | Description                                                                                          |
| --------------------- | ---------------------------------------------------------------------------------------------------- |
| LongestTaskWaitingSid | The ID of the longest waiting Task                                                                   |
| LongestTaskWaitingAge | The age of the longest waiting Task                                                                  |
| TotalTasks            | The total number of Tasks                                                                            |
| TotalWorkers          | The total number of Workers in the workspace                                                         |
| TasksByStatus         | The Tasks broken down by status (for example: pending: 1, reserved = 3, assigned = 2, completed = 5) |
| ActivityStatistics    | A breakdown of Workers by Activity (for example: Idle : 0, Busy: 5, Reserved = 0, Offline = 2)       |

### Cumulative

Cumulative statistics relating to a Workspace include the following over the interval:

| Property                  | Description                                                                                    |
| ------------------------- | ---------------------------------------------------------------------------------------------- |
| TasksCreated              | The total number of Tasks created                                                              |
| TasksCanceled             | The total number of Tasks that were canceled                                                   |
| TasksCompleted            | The total number of Tasks that were completed                                                  |
| TasksDeleted              | The total number of Tasks that were deleted                                                    |
| TasksMoved                | The total number of Tasks that were moved from one queue to another                            |
| TasksTimedOutInWorkflow   | The total number of Tasks that were timed out of their Workflows (and deleted)                 |
| AvgTaskAcceptanceTime     | The average time (in seconds) from Task creation to acceptance                                 |
| ReservationsCreated       | The total number of Reservations that were created for Workers                                 |
| ReservationsAccepted      | The total number of Reservations accepted by Workers                                           |
| ReservationsRejected      | The total number of Reservations that were rejected                                            |
| ReservationsTimedOut      | The total number of Reservations that were timed out                                           |
| ReservationsCanceled      | The total number of Reservations that were canceled                                            |
| ReservationsRescinded     | The total number of Reservations that were rescinded                                           |
| WaitDurationUntilCanceled | The wait duration stats (avg, min, max, total) for tasks that were canceled.                   |
| WaitDurationUntilAccepted | The wait duration stats (avg, min, max, total) for tasks that were accepted.                   |
| SplitByWaitTime           | The splits of the tasks canceled and accepted based on the provided SplitByWaitTime parameter. |

## Workspace RealTime Statistics

If you are only concerned with the real time statistics of your workspace, you can utilize the below endpoint.

> \[!WARNING]
>
> We recommended leveraging caching when utilizing this endpoint from your backend application to ensure this endpoint can support your scaling needs.
>
> In scenarios where this endpoint would be used from a client application, we recommend implementing a sync layer, e.g., via [Twilio Sync](/docs/sync/api), to help synchronize this endpoint's state across all clients, and to ensure this endpoint can scale with your user growth.

### Resource URI \[#resource-uri-2]

```bash
GET /v1/Workspaces/{WorkspaceSid}/RealTimeStatistics

```

Retrieve workspace real time statistics

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchWorkspaceRealTimeStatistics() {
  const realTimeStatistic = await client.taskrouter.v1
    .workspaces("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .realTimeStatistics()
    .fetch();

  console.log(realTimeStatistic.accountSid);
}

fetchWorkspaceRealTimeStatistics();
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
    .real_time_statistics()
    .fetch()
)

print(real_time_statistic.account_sid)
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

        var workspaceRealTimeStatistics = await WorkspaceRealTimeStatisticsResource.FetchAsync(
            pathWorkspaceSid: "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(workspaceRealTimeStatistics.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.WorkspaceRealTimeStatistics;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        WorkspaceRealTimeStatistics workspaceRealTimeStatistics =
            WorkspaceRealTimeStatistics.fetcher("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").fetch();

        System.out.println(workspaceRealTimeStatistics.getAccountSid());
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

	params := &taskrouter.FetchWorkspaceRealTimeStatisticsParams{}

	resp, err := client.TaskrouterV1.FetchWorkspaceRealTimeStatistics("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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
                      .real_time_statistics
                      .fetch

puts real_time_statistic.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:real-time-statistics:fetch \
   --workspace-sid WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X GET "https://taskrouter.twilio.com/v1/Workspaces/WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/RealTimeStatistics" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RealTimeStatistics",
  "tasks_by_priority": {},
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
  "workspace_sid": "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "longest_task_waiting_age": 100,
  "longest_task_waiting_sid": "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "total_workers": 100,
  "total_tasks": 100,
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "tasks_by_status": {}
}
```

| Parameter   | Description                                                                                                               |
| ----------- | ------------------------------------------------------------------------------------------------------------------------- |
| TaskChannel | Filter real-time statistics by TaskChannel. Takes in a Unique Name ("voice", "sms", "default", etc.) or a TaskChannelSid. |

### Real Time \[#real-time-2]

Real time statistics relating to a Workspace include the following:

| Property              | Description                                                                                          |
| --------------------- | ---------------------------------------------------------------------------------------------------- |
| LongestTaskWaitingSid | The ID of the longest waiting Task                                                                   |
| LongestTaskWaitingAge | The age of the longest waiting Task                                                                  |
| TotalTasks            | The total number of Tasks                                                                            |
| TotalWorkers          | The total number of Workers in the workspace                                                         |
| TasksByStatus         | The Tasks broken down by status (for example: pending: 1, reserved = 3, assigned = 2, completed = 5) |
| ActivityStatistics    | A breakdown of Workers by Activity (for example: Idle : 0, Busy: 5, Reserved = 0, Offline = 2)       |

## Workspace Cumulative Statistics

If you are only concerned with the cumulative statistics over a certain time period, you can utilize the below endpoint. Cumulative statistics allow you to analyze data from the past 30 days.

### Resource URI \[#resource-uri-3]

```bash
GET /v1/Workspaces/{WorkspaceSid}/CumulativeStatistics

```

Retrieve workspace cumulative statistics

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchWorkspaceCumulativeStatistics() {
  const cumulativeStatistic = await client.taskrouter.v1
    .workspaces("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .cumulativeStatistics()
    .fetch();

  console.log(cumulativeStatistic.accountSid);
}

fetchWorkspaceCumulativeStatistics();
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
    .cumulative_statistics()
    .fetch()
)

print(cumulative_statistic.account_sid)
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

        var workspaceCumulativeStatistics = await WorkspaceCumulativeStatisticsResource.FetchAsync(
            pathWorkspaceSid: "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(workspaceCumulativeStatistics.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.WorkspaceCumulativeStatistics;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        WorkspaceCumulativeStatistics workspaceCumulativeStatistics =
            WorkspaceCumulativeStatistics.fetcher("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").fetch();

        System.out.println(workspaceCumulativeStatistics.getAccountSid());
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

	params := &taskrouter.FetchWorkspaceCumulativeStatisticsParams{}

	resp, err := client.TaskrouterV1.FetchWorkspaceCumulativeStatistics("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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
                       .cumulative_statistics
                       .fetch

puts cumulative_statistic.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:cumulative-statistics:fetch \
   --workspace-sid WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X GET "https://taskrouter.twilio.com/v1/Workspaces/WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/CumulativeStatistics" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "reservations_accepted": 100,
  "tasks_completed": 100,
  "start_time": "2015-07-30T20:00:00Z",
  "reservations_rescinded": 100,
  "tasks_timed_out_in_workflow": 100,
  "end_time": "2015-07-30T20:00:00Z",
  "avg_task_acceptance_time": 100,
  "tasks_canceled": 100,
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/CumulativeStatistics",
  "tasks_moved": 100,
  "tasks_deleted": 100,
  "tasks_created": 100,
  "reservations_canceled": 100,
  "reservations_timed_out": 100,
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
  "reservations_created": 100,
  "reservations_rejected": 100,
  "workspace_sid": "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

| Parameter       | Description                                                                                                                                                                                                                                                                                                                          |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Minutes         | Filter cumulative statistics by up to 'x' minutes in the past. This is helpful for statistics for the last 15 minutes, 240 minutes (4 hours), and 480 minutes (8 hours) to see trends. Defaults to 15 minutes.                                                                                                                       |
| StartDate       | Filter cumulative statistics by a start date. This is helpful for defining a range of statistics to capture. Input is a GMT ISO 8601 Timestamp                                                                                                                                                                                       |
| EndDate         | Filter cumulative statistics by an end date. This is helpful for defining a range of statistics to capture. Input is a GMT ISO 8601 Timestamp                                                                                                                                                                                        |
| TaskChannel     | Filter cumulative statistics by TaskChannel. Takes in a Unique Name ("voice", "sms", "default", etc.) or a TaskChannelSid.                                                                                                                                                                                                           |
| SplitByWaitTime | A comma separated values for viewing splits of tasks canceled and accepted above the given threshold in seconds. Ex: "5,30" would show splits of tasks that were canceled or accepted before or after 5 seconds and respectively, 30 seconds. This is great for showing short abandoned tasks or tasks that failed to meet your SLA. |

Note: Minutes cannot be used in combination with StartDate and EndDate parameters. If no parameters are passed, 15 minutes will be the default.

Cumulative statistics relating to a Workspace include the following over the interval:

| Property                  | Description                                                                                    |
| ------------------------- | ---------------------------------------------------------------------------------------------- |
| TasksCreated              | The total number of Tasks created                                                              |
| TasksCanceled             | The total number of Tasks that were canceled                                                   |
| TasksCompleted            | The total number of Tasks that were completed                                                  |
| TasksDeleted              | The total number of Tasks that were deleted                                                    |
| TasksMoved                | The total number of Tasks that were moved from one queue to another                            |
| TasksTimedOutInWorkflow   | The total number of Tasks that were timed out of their Workflows (and deleted)                 |
| AvgTaskAcceptanceTime     | The average time (in seconds) from Task creation to acceptance                                 |
| ReservationsCreated       | The total number of Reservations that were created for Workers                                 |
| ReservationsAccepted      | The total number of Reservations accepted by Workers                                           |
| ReservationsRejected      | The total number of Reservations that were rejected                                            |
| ReservationsTimedOut      | The total number of Reservations that were timed out                                           |
| ReservationsCanceled      | The total number of Reservations that were canceled                                            |
| ReservationsRescinded     | The total number of Reservations that were rescinded                                           |
| WaitDurationUntilCanceled | The wait duration stats (avg, min, max, total) for tasks that were canceled.                   |
| WaitDurationUntilAccepted | The wait duration stats (avg, min, max, total) for tasks that were accepted.                   |
| SplitByWaitTime           | The splits of the tasks canceled and accepted based on the provided SplitByWaitTime parameter. |
