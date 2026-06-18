# Worker Statistics Resource

TaskRouter provides real-time, cumulative, and historical statistics for Workers. Historical statistics allow you to analyze data from the past 30 days. There are various APIs for retrieving the data that is meaningful to your business.

> \[!WARNING]
>
> These resources may not be accessible if your Workspace exceeds 100 workers. Please contact support for additional assistance.

## WorkerStatistics Properties

```json
{"type":"object","refName":"taskrouter.v1.workspace.worker.worker_statistics","modelName":"taskrouter_v1_workspace_worker_worker_statistics","properties":{"realtime":{"nullable":true,"description":"An object that contains the real-time statistics for the Worker."},"cumulative":{"nullable":true,"description":"An object that contains the cumulative statistics for the Worker."},"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Worker resource."},"workspace_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the Workspace that contains the Worker."},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the Worker statistics resource."}}}
```

Minutes cannot be used in combination with StartDate and EndDate parameters. If no parameters are passed, 15 minutes will be the default.

## Fetch All Worker Statistics

```bash
GET /v1/Workspaces/{WorkspaceSid}/Workers/Statistics
```

### Path parameters

```json
[{"name":"WorkspaceSid","in":"path","description":"The SID of the Workspace with the Worker to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$"},"required":true}]
```

### Query parameters

```json
[{"name":"Minutes","in":"query","description":"Only calculate statistics since this many minutes in the past. The default 15 minutes. This is helpful for displaying statistics for the last 15 minutes, 240 minutes (4 hours), and 480 minutes (8 hours) to see trends.","schema":{"type":"integer"},"examples":{"fetch":{"value":1}}},{"name":"StartDate","in":"query","description":"Only calculate statistics from this date and time and later, specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.","schema":{"type":"string","format":"date-time"},"examples":{"fetch":{"value":"2008-01-02T00:00:00Z"}}},{"name":"EndDate","in":"query","description":"Only calculate statistics from this date and time and earlier, specified in GMT as an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date-time.","schema":{"type":"string","format":"date-time"},"examples":{"fetch":{"value":"2008-01-02T00:00:00Z"}}},{"name":"TaskQueueSid","in":"query","description":"The SID of the TaskQueue for which to fetch Worker statistics.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WQ[0-9a-fA-F]{32}$"}},{"name":"TaskQueueName","in":"query","description":"The `friendly_name` of the TaskQueue for which to fetch Worker statistics.","schema":{"type":"string"}},{"name":"FriendlyName","in":"query","description":"Only include Workers with `friendly_name` values that match this parameter.","schema":{"type":"string"}},{"name":"TaskChannel","in":"query","description":"Only calculate statistics on this TaskChannel. Can be the TaskChannel's SID or its `unique_name`, such as `voice`, `sms`, or `default`.","schema":{"type":"string"}}]
```

Fetch a Worker Statistics Resource

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchWorkerStatistics() {
  const statistic = await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .workers.statistics()
    .fetch();

  console.log(statistic.realtime);
}

fetchWorkerStatistics();
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
    client.taskrouter.v1.workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .workers.statistics()
    .fetch()
)

print(statistic.realtime)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Taskrouter.V1.Workspace.Worker;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var workersStatistics = await WorkersStatisticsResource.FetchAsync(
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(workersStatistics.Realtime);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.worker.WorkersStatistics;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        WorkersStatistics workersStatistics = WorkersStatistics.fetcher("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").fetch();

        System.out.println(workersStatistics.getRealtime());
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

	params := &taskrouter.FetchWorkerStatisticsParams{}

	resp, err := client.TaskrouterV1.FetchWorkerStatistics("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
    ->workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->workers->statistics()
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
            .workspaces('WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
            .workers
            .statistics
            .fetch

puts statistic.realtime
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:workers:statistics:fetch \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/Statistics" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "cumulative": {
    "reservations_created": 0,
    "reservations_accepted": 0,
    "reservations_rejected": 0,
    "reservations_timed_out": 0,
    "reservations_canceled": 0,
    "reservations_rescinded": 0,
    "activity_durations": [
      {
        "max": 0,
        "min": 900,
        "sid": "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "friendly_name": "Offline",
        "avg": 1080,
        "total": 5400
      },
      {
        "max": 0,
        "min": 900,
        "sid": "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "friendly_name": "Busy",
        "avg": 1012,
        "total": 8100
      },
      {
        "max": 0,
        "min": 0,
        "sid": "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "friendly_name": "Idle",
        "avg": 0,
        "total": 0
      },
      {
        "max": 0,
        "min": 0,
        "sid": "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "friendly_name": "Reserved",
        "avg": 0,
        "total": 0
      }
    ],
    "start_time": "2008-01-02T00:00:00Z",
    "end_time": "2008-01-02T00:00:00Z"
  },
  "realtime": {
    "total_workers": 15,
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
    ]
  },
  "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/Statistics"
}
```

## Fetch Real-Time Worker Statistics

> \[!WARNING]
>
> We recommended leveraging caching when utilizing this endpoint from your backend application to ensure this endpoint can support your scaling needs.
>
> In scenarios where this endpoint would be used from a client application, we recommend implementing a sync layer, e.g., via [Twilio Sync](/docs/sync/api), to help synchronize this endpoint's state across all clients, and to ensure this endpoint can scale with your user growth.

```bash
GET /v1/Workspaces/{WorkspaceSid}/Workers/RealTimeStatistics
```

### Path parameters

```json
[{"name":"WorkspaceSid","in":"path","description":"The SID of the Workspace with the resource to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$"},"required":true}]
```

### Query parameters

```json
[{"name":"TaskChannel","in":"query","description":"Only calculate real-time statistics on this TaskChannel. Can be the TaskChannel's SID or its `unique_name`, such as `voice`, `sms`, or `default`.","schema":{"type":"string"},"examples":{"fetch":{"value":"voice"}}}]
```

Retrieve Real-Time Worker Statistics

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchWorkersRealTimeStatistics() {
  const realTimeStatistic = await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .workers.realTimeStatistics()
    .fetch();

  console.log(realTimeStatistic.accountSid);
}

fetchWorkersRealTimeStatistics();
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
    client.taskrouter.v1.workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .workers.real_time_statistics()
    .fetch()
)

print(real_time_statistic.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Taskrouter.V1.Workspace.Worker;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var workersRealTimeStatistics = await WorkersRealTimeStatisticsResource.FetchAsync(
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(workersRealTimeStatistics.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.worker.WorkersRealTimeStatistics;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        WorkersRealTimeStatistics workersRealTimeStatistics =
            WorkersRealTimeStatistics.fetcher("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").fetch();

        System.out.println(workersRealTimeStatistics.getAccountSid());
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

	params := &taskrouter.FetchWorkersRealTimeStatisticsParams{}

	resp, err := client.TaskrouterV1.FetchWorkersRealTimeStatistics("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
    ->workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->workers->realTimeStatistics()
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
                      .workspaces('WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                      .workers
                      .real_time_statistics
                      .fetch

puts real_time_statistic.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:workers:real-time-statistics:fetch \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/RealTimeStatistics" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/RealTimeStatistics",
  "total_workers": 15,
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
  ]
}
```

Real-time statistics relating to a list of Workers include the following:

| Property           | Description                                           |
| ------------------ | ----------------------------------------------------- |
| TotalWorkers       | The total number of Workers                           |
| ActivityStatistics | The current Worker status count breakdown by Activity |

## Fetch Cumulative Worker Statistics

Cumulative statistics allow you to analyze Worker data from the past 30 days.

```bash
GET /v1/Workspaces/{WorkspaceSid}/Workers/CumulativeStatistics

```

### Path parameters

```json
[{"name":"WorkspaceSid","in":"path","description":"The SID of the Workspace with the resource to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$"},"required":true}]
```

### Query parameters

```json
[{"name":"EndDate","in":"query","description":"Only calculate statistics from this date and time and earlier, specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.","schema":{"type":"string","format":"date-time"},"examples":{"fetch":{"value":"2015-07-30T20:00:00Z"}}},{"name":"Minutes","in":"query","description":"Only calculate statistics since this many minutes in the past. The default 15 minutes. This is helpful for displaying statistics for the last 15 minutes, 240 minutes (4 hours), and 480 minutes (8 hours) to see trends.","schema":{"type":"integer"}},{"name":"StartDate","in":"query","description":"Only calculate statistics from this date and time and later, specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.","schema":{"type":"string","format":"date-time"},"examples":{"fetch":{"value":"2015-07-30T20:00:00Z"}}},{"name":"TaskChannel","in":"query","description":"Only calculate cumulative statistics on this TaskChannel. Can be the TaskChannel's SID or its `unique_name`, such as `voice`, `sms`, or `default`.","schema":{"type":"string"}}]
```

Retrieve Cumulative Worker Statistics

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchWorkersCumulativeStatistics() {
  const cumulativeStatistic = await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .workers.cumulativeStatistics()
    .fetch();

  console.log(cumulativeStatistic.accountSid);
}

fetchWorkersCumulativeStatistics();
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
    client.taskrouter.v1.workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .workers.cumulative_statistics()
    .fetch()
)

print(cumulative_statistic.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Taskrouter.V1.Workspace.Worker;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var workersCumulativeStatistics = await WorkersCumulativeStatisticsResource.FetchAsync(
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(workersCumulativeStatistics.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.worker.WorkersCumulativeStatistics;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        WorkersCumulativeStatistics workersCumulativeStatistics =
            WorkersCumulativeStatistics.fetcher("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").fetch();

        System.out.println(workersCumulativeStatistics.getAccountSid());
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

	params := &taskrouter.FetchWorkersCumulativeStatisticsParams{}

	resp, err := client.TaskrouterV1.FetchWorkersCumulativeStatistics("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
    ->workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->workers->cumulativeStatistics()
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
                       .workspaces('WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                       .workers
                       .cumulative_statistics
                       .fetch

puts cumulative_statistic.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:workers:cumulative-statistics:fetch \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/CumulativeStatistics" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/CumulativeStatistics",
  "reservations_created": 100,
  "reservations_accepted": 100,
  "reservations_rejected": 100,
  "reservations_timed_out": 100,
  "reservations_canceled": 100,
  "reservations_rescinded": 100,
  "activity_durations": [
    {
      "max": 0,
      "min": 900,
      "sid": "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "friendly_name": "Offline",
      "avg": 1080,
      "total": 5400
    },
    {
      "max": 0,
      "min": 900,
      "sid": "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "friendly_name": "Busy",
      "avg": 1012,
      "total": 8100
    },
    {
      "max": 0,
      "min": 0,
      "sid": "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "friendly_name": "Idle",
      "avg": 0,
      "total": 0
    },
    {
      "max": 0,
      "min": 0,
      "sid": "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "friendly_name": "Reserved",
      "avg": 0,
      "total": 0
    }
  ],
  "start_time": "2015-07-30T20:00:00Z",
  "end_time": "2015-07-30T20:00:00Z"
}
```

Cumulative statistics relating to a list of Workers include the following over the interval:

| Property              | Description                                                                              |
| --------------------- | ---------------------------------------------------------------------------------------- |
| ReservationsCreated   | The total number of Reservations that were created                                       |
| ReservationsAccepted  | The total number of Reservations that were accepted                                      |
| ReservationsRejected  | The total number of Reservations that were rejected                                      |
| ReservationsTimedOut  | The total number of Reservations that were timed out                                     |
| ReservationsCanceled  | The total number of Reservations that were canceled                                      |
| ReservationsRescinded | The total number of Reservations that were rescinded                                     |
| ActivityDurations     | The minimum, average, maximum and total time (in seconds) Workers spent in each Activity |

## Fetch A Specific Worker's Statistics

```bash
GET /v1/Workspaces/{WorkspaceSid}/Workers/{WorkerSid}/Statistics
```

### Path parameters

```json
[{"name":"WorkspaceSid","in":"path","description":"The SID of the Workspace with the WorkerChannel to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$"},"required":true},{"name":"WorkerSid","in":"path","description":"The SID of the Worker with the WorkerChannel to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WK[0-9a-fA-F]{32}$"},"required":true}]
```

### Query parameters

```json
[{"name":"Minutes","in":"query","description":"Only calculate statistics since this many minutes in the past. The default 15 minutes. This is helpful for displaying statistics for the last 15 minutes, 240 minutes (4 hours), and 480 minutes (8 hours) to see trends.","schema":{"type":"integer"},"examples":{"fetch":{"value":1}}},{"name":"StartDate","in":"query","description":"Only calculate statistics from this date and time and later, specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.","schema":{"type":"string","format":"date-time"},"examples":{"fetch":{"value":"2008-01-02T00:00:00Z"}}},{"name":"EndDate","in":"query","description":"Only include usage that occurred on or before this date, specified in GMT as an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date-time.","schema":{"type":"string","format":"date-time"},"examples":{"fetch":{"value":"2008-01-02T00:00:00Z"}}},{"name":"TaskChannel","in":"query","description":"Only calculate statistics on this TaskChannel. Can be the TaskChannel's SID or its `unique_name`, such as `voice`, `sms`, or `default`.","schema":{"type":"string"}}]
```

Retrieve a Specific Worker's Statistics

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchWorkerInstanceStatistics() {
  const statistic = await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .workers("WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .statistics()
    .fetch();

  console.log(statistic.accountSid);
}

fetchWorkerInstanceStatistics();
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
    client.taskrouter.v1.workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .workers("WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .statistics()
    .fetch()
)

print(statistic.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Taskrouter.V1.Workspace.Worker;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var workerStatistics = await WorkerStatisticsResource.FetchAsync(
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathWorkerSid: "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(workerStatistics.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.worker.WorkerStatistics;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        WorkerStatistics workerStatistics =
            WorkerStatistics.fetcher("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                .fetch();

        System.out.println(workerStatistics.getAccountSid());
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

	params := &taskrouter.FetchWorkerInstanceStatisticsParams{}

	resp, err := client.TaskrouterV1.FetchWorkerInstanceStatistics("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$statistic = $twilio->taskrouter->v1
    ->workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->workers("WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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
            .workspaces('WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
            .workers('WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
            .statistics
            .fetch

puts statistic.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:workers:statistics:fetch \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --worker-sid WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Statistics" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "cumulative": {
    "reservations_created": 100,
    "reservations_accepted": 100,
    "reservations_rejected": 100,
    "reservations_timed_out": 100,
    "reservations_canceled": 100,
    "reservations_rescinded": 100,
    "activity_durations": [
      {
        "max": 0,
        "min": 900,
        "sid": "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "friendly_name": "Offline",
        "avg": 1080,
        "total": 5400
      },
      {
        "max": 0,
        "min": 900,
        "sid": "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "friendly_name": "Busy",
        "avg": 1012,
        "total": 8100
      },
      {
        "max": 0,
        "min": 0,
        "sid": "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "friendly_name": "Idle",
        "avg": 0,
        "total": 0
      },
      {
        "max": 0,
        "min": 0,
        "sid": "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "friendly_name": "Reserved",
        "avg": 0,
        "total": 0
      }
    ],
    "start_time": "2008-01-02T00:00:00Z",
    "end_time": "2008-01-02T00:00:00Z"
  },
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "worker_sid": "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Statistics"
}
```
