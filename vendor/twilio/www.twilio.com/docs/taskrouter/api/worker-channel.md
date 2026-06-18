# Worker Channel Resource

Worker Channels show the [Worker](/docs/taskrouter/api/worker)'s capacity for handling multiple concurrent [Tasks](/docs/taskrouter/api/task). Workers receive Task reservation requests in parallel for each task type until the configured Task Channel capacity is reached. In addition, Worker Channels can also be marked as unavailable, which is useful for temporarily removing the capacity for a given Worker Channel and then restoring to the previous capacity when marking available again.

## Channel Properties

<OperationTable type="properties" data={{"type":"object","refName":"taskrouter.v1.workspace.worker.worker_channel","modelName":"taskrouter_v1_workspace_worker_worker_channel","properties":{"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Worker resource."},"assigned_tasks":{"type":"integer","default":0,"description":"The total number of Tasks assigned to Worker for the TaskChannel type."},"available":{"type":"boolean","nullable":true,"description":"Whether the Worker should receive Tasks of the TaskChannel type."},"available_capacity_percentage":{"type":"integer","default":0,"description":"The current percentage of capacity the TaskChannel has available. Can be a number between `0` and `100`. A value of `0` indicates that TaskChannel has no capacity available and a value of `100` means the  Worker is available to receive any Tasks of this TaskChannel type."},"configured_capacity":{"type":"integer","default":0,"description":"The current configured capacity for the WorkerChannel. TaskRouter will not create any reservations after the assigned Tasks for the Worker reaches the value."},"date_created":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format."},"date_updated":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format."},"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WC[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that we created to identify the WorkerChannel resource."},"task_channel_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^TC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the TaskChannel."},"task_channel_unique_name":{"type":"string","nullable":true,"description":"The unique name of the TaskChannel, such as `voice` or `sms`."},"worker_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WK[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the Worker that contains the WorkerChannel."},"workspace_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the Workspace that contains the WorkerChannel."},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the WorkerChannel resource."}}}} />

## Fetch a WorkerChannel resource

`GET https://taskrouter.twilio.com/v1/Workspaces/{WorkspaceSid}/Workers/{WorkerSid}/Channels/{Sid}`

Returns a single Worker Channel resource identified by either `WorkerChannelUniqueName` or `WorkerChannelSid`

### Path parameters

```json
[{"name":"WorkspaceSid","in":"path","description":"The SID of the Workspace with the WorkerChannel to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$"},"required":true},{"name":"WorkerSid","in":"path","description":"The SID of the Worker with the WorkerChannel to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WK[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The SID of the WorkerChannel to fetch.","schema":{"type":"string"},"required":true}]
```

Fetch a Worker Channel

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchWorkerChannel() {
  const workerChannel = await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .workers("WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .workerChannels("Sid")
    .fetch();

  console.log(workerChannel.accountSid);
}

fetchWorkerChannel();
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

worker_channel = (
    client.taskrouter.v1.workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .workers("WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .worker_channels("Sid")
    .fetch()
)

print(worker_channel.account_sid)
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

        var workerChannel = await WorkerChannelResource.FetchAsync(
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathWorkerSid: "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "Sid");

        Console.WriteLine(workerChannel.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.worker.WorkerChannel;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        WorkerChannel workerChannel =
            WorkerChannel.fetcher("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "Sid")
                .fetch();

        System.out.println(workerChannel.getAccountSid());
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

	resp, err := client.TaskrouterV1.FetchWorkerChannel("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"Sid")
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

$worker_channel = $twilio->taskrouter->v1
    ->workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->workers("WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->workerChannels("Sid")
    ->fetch();

print $worker_channel->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

worker_channel = @client
                 .taskrouter
                 .v1
                 .workspaces('WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                 .workers('WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                 .worker_channels('Sid')
                 .fetch

puts worker_channel.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:workers:channels:fetch \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --worker-sid WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid Sid
```

```bash
curl -X GET "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels/Sid" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "assigned_tasks": 0,
  "available": true,
  "available_capacity_percentage": 100,
  "configured_capacity": 1,
  "date_created": "2016-04-14T17:35:54Z",
  "date_updated": "2016-04-14T17:35:54Z",
  "sid": "Sid",
  "task_channel_sid": "TCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "task_channel_unique_name": "default",
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels/WCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "worker_sid": "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

## Read multiple WorkerChannel resources

`GET https://taskrouter.twilio.com/v1/Workspaces/{WorkspaceSid}/Workers/{WorkerSid}/Channels`

### Path parameters

```json
[{"name":"WorkspaceSid","in":"path","description":"The SID of the Workspace with the WorkerChannels to read.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$"},"required":true},{"name":"WorkerSid","in":"path","description":"The SID of the Worker with the WorkerChannels to read.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WK[0-9a-fA-F]{32}$"},"required":true}]
```

### Query parameters

```json
[{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

List multiple Worker Channels

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listWorkerChannel() {
  const workerChannels = await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .workers("WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .workerChannels.list({ limit: 20 });

  workerChannels.forEach((w) => console.log(w.accountSid));
}

listWorkerChannel();
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

worker_channels = (
    client.taskrouter.v1.workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .workers("WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .worker_channels.list(limit=20)
)

for record in worker_channels:
    print(record.account_sid)
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

        var workerChannels = await WorkerChannelResource.ReadAsync(
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathWorkerSid: "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            limit: 20);

        foreach (var record in workerChannels) {
            Console.WriteLine(record.AccountSid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.worker.WorkerChannel;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<WorkerChannel> workerChannels =
            WorkerChannel.reader("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                .limit(20)
                .read();

        for (WorkerChannel record : workerChannels) {
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

	params := &taskrouter.ListWorkerChannelParams{}
	params.SetLimit(20)

	resp, err := client.TaskrouterV1.ListWorkerChannel("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$workerChannels = $twilio->taskrouter->v1
    ->workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->workers("WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->workerChannels->read(20);

foreach ($workerChannels as $record) {
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

worker_channels = @client
                  .taskrouter
                  .v1
                  .workspaces('WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                  .workers('WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                  .worker_channels
                  .list(limit: 20)

worker_channels.each do |record|
   puts record.account_sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:workers:channels:list \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --worker-sid WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "meta": {
    "first_page_url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels?PageSize=50&Page=0",
    "key": "channels",
    "next_page_url": null,
    "page": 0,
    "page_size": 50,
    "previous_page_url": null,
    "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels?PageSize=50&Page=0"
  },
  "channels": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "assigned_tasks": 0,
      "available": true,
      "available_capacity_percentage": 100,
      "configured_capacity": 1,
      "date_created": "2016-04-14T17:35:54Z",
      "date_updated": "2016-04-14T17:35:54Z",
      "sid": "WCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "task_channel_sid": "TCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "task_channel_unique_name": "default",
      "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels/WCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "worker_sid": "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ]
}
```

## Update a WorkerChannel resource

`POST https://taskrouter.twilio.com/v1/Workspaces/{WorkspaceSid}/Workers/{WorkerSid}/Channels/{Sid}`

### Path parameters

```json
[{"name":"WorkspaceSid","in":"path","description":"The SID of the Workspace with the WorkerChannel to update.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$"},"required":true},{"name":"WorkerSid","in":"path","description":"The SID of the Worker with the WorkerChannel to update.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WK[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The SID of the WorkerChannel to update.","schema":{"type":"string"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"UpdateWorkerChannelRequest","properties":{"Capacity":{"type":"integer","description":"The total number of Tasks that the Worker should handle for the TaskChannel type. TaskRouter creates reservations for Tasks of this TaskChannel type up to the specified capacity. If the capacity is 0, no new reservations will be created."},"Available":{"type":"boolean","description":"Whether the WorkerChannel is available. Set to `false` to prevent the Worker from receiving any new Tasks of this TaskChannel type."}}},"examples":{"update":{"value":{"lang":"json","value":"{\n  \"Capacity\": 3\n}","meta":"","code":"{\n  \"Capacity\": 3\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Capacity\"","#7EE787"],[":","#C9D1D9"]," ",["3","#79C0FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Update a Worker Channel

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateWorkerChannel() {
  const workerChannel = await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .workers("WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .workerChannels("Sid")
    .update({ capacity: 42 });

  console.log(workerChannel.accountSid);
}

updateWorkerChannel();
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

worker_channel = (
    client.taskrouter.v1.workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .workers("WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .worker_channels("Sid")
    .update(capacity=42)
)

print(worker_channel.account_sid)
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

        var workerChannel = await WorkerChannelResource.UpdateAsync(
            capacity: 42,
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathWorkerSid: "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "Sid");

        Console.WriteLine(workerChannel.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.worker.WorkerChannel;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        WorkerChannel workerChannel =
            WorkerChannel.updater("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "Sid")
                .setCapacity(42)
                .update();

        System.out.println(workerChannel.getAccountSid());
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

	params := &taskrouter.UpdateWorkerChannelParams{}
	params.SetCapacity(42)

	resp, err := client.TaskrouterV1.UpdateWorkerChannel("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"Sid",
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

$worker_channel = $twilio->taskrouter->v1
    ->workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->workers("WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->workerChannels("Sid")
    ->update(["capacity" => 42]);

print $worker_channel->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

worker_channel = @client
                 .taskrouter
                 .v1
                 .workspaces('WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                 .workers('WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                 .worker_channels('Sid')
                 .update(capacity: 42)

puts worker_channel.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:workers:channels:update \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --worker-sid WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid Sid \
   --capacity 42
```

```bash
curl -X POST "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels/Sid" \
--data-urlencode "Capacity=42" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "assigned_tasks": 0,
  "available": true,
  "available_capacity_percentage": 100,
  "configured_capacity": 3,
  "date_created": "2016-04-14T17:35:54Z",
  "date_updated": "2016-04-14T17:35:54Z",
  "sid": "Sid",
  "task_channel_sid": "TCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "task_channel_unique_name": "default",
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Channels/WCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "worker_sid": "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```
