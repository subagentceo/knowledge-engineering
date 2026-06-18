# Task Channel resource

## Overview

Task Channels provide a mechanism to separate tasks of different types.

You can specify different concurrent capacity for tasks of each type. For example, one Worker might be able to handle 10 SMS Tasks at any given time, but only a single phone call Task. When MultiTasking is enabled, you can specify the task type by passing the Unique Name or SID of the Task Channel. For details on limitations around the Task Channel Unique Name, see the FAQ on the [Multitasking](/docs/taskrouter/multitasking) page.

## TaskChannel Properties

> \[!WARNING]
>
> Task Channel `friendlyName` and `uniqueName` values do not support hyphens. Using hyphens may cause a parsing error.

> \[!WARNING]
>
> Don't use the `page` query parameter with this resource. Pagination isn't supported.

<OperationTable type="properties" data={{"type":"object","refName":"taskrouter.v1.workspace.task_channel","modelName":"taskrouter_v1_workspace_task_channel","properties":{"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Task Channel resource."},"date_created":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was created specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"date_updated":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was last updated specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"friendly_name":{"type":"string","nullable":true,"description":"The string that you assigned to describe the resource."},"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^TC[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that we created to identify the Task Channel resource."},"unique_name":{"type":"string","nullable":true,"description":"An application-defined string that uniquely identifies the Task Channel, such as `voice` or `sms`."},"workspace_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the Workspace that contains the Task Channel."},"channel_optimized_routing":{"type":"boolean","nullable":true,"description":"Whether the Task Channel will prioritize Workers that have been idle. When `true`, Workers that have been idle the longest are prioritized."},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the Task Channel resource."},"links":{"type":"object","format":"uri-map","nullable":true,"description":"The URLs of related resources."}}}} />

## Create a TaskChannel resource

`POST https://taskrouter.twilio.com/v1/Workspaces/{WorkspaceSid}/TaskChannels`

### Path parameters

```json
[{"name":"WorkspaceSid","in":"path","description":"The SID of the Workspace that the new Task Channel belongs to.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"CreateTaskChannelRequest","required":["FriendlyName","UniqueName"],"properties":{"FriendlyName":{"type":"string","description":"A descriptive string that you create to describe the Task Channel. It can be up to 64 characters long."},"UniqueName":{"type":"string","description":"An application-defined string that uniquely identifies the Task Channel, such as `voice` or `sms`."},"ChannelOptimizedRouting":{"type":"boolean","description":"Whether the Task Channel should prioritize Workers that have been idle. If `true`, Workers that have been idle the longest are prioritized."}}},"examples":{"create":{"value":{"lang":"json","value":"{\n  \"FriendlyName\": \"Outbound Voice\",\n  \"UniqueName\": \"ovoice\",\n  \"RequiredAttention\": 0\n}","meta":"","code":"{\n  \"FriendlyName\": \"Outbound Voice\",\n  \"UniqueName\": \"ovoice\",\n  \"RequiredAttention\": 0\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"Outbound Voice\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"UniqueName\"","#7EE787"],[":","#C9D1D9"]," ",["\"ovoice\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"RequiredAttention\"","#7EE787"],[":","#C9D1D9"]," ",["0","#79C0FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Create a Task Channel

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createTaskChannel() {
  const taskChannel = await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .taskChannels.create({
      friendlyName: "FriendlyName",
      uniqueName: "UniqueName",
    });

  console.log(taskChannel.accountSid);
}

createTaskChannel();
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

task_channel = client.taskrouter.v1.workspaces(
    "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).task_channels.create(friendly_name="FriendlyName", unique_name="UniqueName")

print(task_channel.account_sid)
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

        var taskChannel = await TaskChannelResource.CreateAsync(
            friendlyName: "FriendlyName",
            uniqueName: "UniqueName",
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(taskChannel.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.TaskChannel;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        TaskChannel taskChannel =
            TaskChannel.creator("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "FriendlyName", "UniqueName").create();

        System.out.println(taskChannel.getAccountSid());
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

	params := &taskrouter.CreateTaskChannelParams{}
	params.SetFriendlyName("FriendlyName")
	params.SetUniqueName("UniqueName")

	resp, err := client.TaskrouterV1.CreateTaskChannel("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$task_channel = $twilio->taskrouter->v1
    ->workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->taskChannels->create(
        "FriendlyName", // FriendlyName
        "UniqueName" // UniqueName
    );

print $task_channel->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

task_channel = @client
               .taskrouter
               .v1
               .workspaces('WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
               .task_channels
               .create(
                 friendly_name: 'FriendlyName',
                 unique_name: 'UniqueName'
               )

puts task_channel.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:task-channels:create \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --friendly-name FriendlyName \
   --unique-name UniqueName
```

```bash
curl -X POST "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskChannels" \
--data-urlencode "FriendlyName=FriendlyName" \
--data-urlencode "UniqueName=UniqueName" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "TCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "FriendlyName",
  "unique_name": "UniqueName",
  "date_created": "2016-04-14T17:35:54Z",
  "date_updated": "2016-04-14T17:35:54Z",
  "channel_optimized_routing": true,
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskChannels/TCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "workspace": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  }
}
```

## Fetch a TaskChannel resource

`GET https://taskrouter.twilio.com/v1/Workspaces/{WorkspaceSid}/TaskChannels/{Sid}`

### Path parameters

```json
[{"name":"WorkspaceSid","in":"path","description":"The SID of the Workspace with the Task Channel to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The SID of the Task Channel resource to fetch.","schema":{"type":"string"},"required":true}]
```

Fetch a Task Channel

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchTaskChannel() {
  const taskChannel = await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .taskChannels("Sid")
    .fetch();

  console.log(taskChannel.accountSid);
}

fetchTaskChannel();
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

task_channel = (
    client.taskrouter.v1.workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .task_channels("Sid")
    .fetch()
)

print(task_channel.account_sid)
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

        var taskChannel = await TaskChannelResource.FetchAsync(
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", pathSid: "Sid");

        Console.WriteLine(taskChannel.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.TaskChannel;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        TaskChannel taskChannel = TaskChannel.fetcher("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "Sid").fetch();

        System.out.println(taskChannel.getAccountSid());
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

	resp, err := client.TaskrouterV1.FetchTaskChannel("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$task_channel = $twilio->taskrouter->v1
    ->workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->taskChannels("Sid")
    ->fetch();

print $task_channel->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

task_channel = @client
               .taskrouter
               .v1
               .workspaces('WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
               .task_channels('Sid')
               .fetch

puts task_channel.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:task-channels:fetch \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid Sid
```

```bash
curl -X GET "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskChannels/Sid" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2016-04-14T17:35:54Z",
  "date_updated": "2016-04-14T17:35:54Z",
  "friendly_name": "Default",
  "sid": "Sid",
  "unique_name": "default",
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskChannels/TCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "channel_optimized_routing": true,
  "links": {
    "workspace": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  }
}
```

## Read multiple TaskChannel resources

`GET https://taskrouter.twilio.com/v1/Workspaces/{WorkspaceSid}/TaskChannels`

### Path parameters

```json
[{"name":"WorkspaceSid","in":"path","description":"The SID of the Workspace with the Task Channel to read.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$"},"required":true}]
```

### Query parameters

```json
[{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

List multiple Task Channels

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listTaskChannel() {
  const taskChannels = await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .taskChannels.list({ limit: 20 });

  taskChannels.forEach((t) => console.log(t.accountSid));
}

listTaskChannel();
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

task_channels = client.taskrouter.v1.workspaces(
    "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).task_channels.list(limit=20)

for record in task_channels:
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

        var taskChannels = await TaskChannelResource.ReadAsync(
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", limit: 20);

        foreach (var record in taskChannels) {
            Console.WriteLine(record.AccountSid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.TaskChannel;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<TaskChannel> taskChannels =
            TaskChannel.reader("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").limit(20).read();

        for (TaskChannel record : taskChannels) {
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

	params := &taskrouter.ListTaskChannelParams{}
	params.SetLimit(20)

	resp, err := client.TaskrouterV1.ListTaskChannel("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$taskChannels = $twilio->taskrouter->v1
    ->workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->taskChannels->read(20);

foreach ($taskChannels as $record) {
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

task_channels = @client
                .taskrouter
                .v1
                .workspaces('WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                .task_channels
                .list(limit: 20)

task_channels.each do |record|
   puts record.account_sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:task-channels:list \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskChannels?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "channels": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "date_created": "2016-04-14T17:35:54Z",
      "date_updated": "2016-04-14T17:35:54Z",
      "friendly_name": "Default",
      "sid": "TCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "unique_name": "default",
      "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskChannels/TCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "channel_optimized_routing": true,
      "links": {
        "workspace": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
      }
    }
  ],
  "meta": {
    "first_page_url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskChannels?PageSize=50&Page=0",
    "key": "channels",
    "next_page_url": null,
    "page": 0,
    "page_size": 50,
    "previous_page_url": null,
    "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskChannels?PageSize=50&Page=0"
  }
}
```

## Update a TaskChannel resource

`POST https://taskrouter.twilio.com/v1/Workspaces/{WorkspaceSid}/TaskChannels/{Sid}`

### Path parameters

```json
[{"name":"WorkspaceSid","in":"path","description":"The SID of the Workspace with the Task Channel to update.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The SID of the Task Channel resource to update.","schema":{"type":"string"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"UpdateTaskChannelRequest","properties":{"FriendlyName":{"type":"string","description":"A descriptive string that you create to describe the Task Channel. It can be up to 64 characters long."},"ChannelOptimizedRouting":{"type":"boolean","description":"Whether the TaskChannel should prioritize Workers that have been idle. If `true`, Workers that have been idle the longest are prioritized."}}},"examples":{"updateSid":{"value":{"lang":"json","value":"{\n  \"FriendlyName\": \"Outbound Voice\",\n  \"ChannelOptimizedRouting\": true\n}","meta":"","code":"{\n  \"FriendlyName\": \"Outbound Voice\",\n  \"ChannelOptimizedRouting\": true\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"Outbound Voice\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"ChannelOptimizedRouting\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"updateUniqueName":{"value":{"lang":"json","value":"{\n  \"FriendlyName\": \"Outbound Voice\",\n  \"ChannelOptimizedRouting\": true\n}","meta":"","code":"{\n  \"FriendlyName\": \"Outbound Voice\",\n  \"ChannelOptimizedRouting\": true\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"Outbound Voice\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"ChannelOptimizedRouting\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Update a Task Channel

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateTaskChannel() {
  const taskChannel = await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .taskChannels("Sid")
    .update({ friendlyName: "FriendlyName" });

  console.log(taskChannel.accountSid);
}

updateTaskChannel();
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

task_channel = (
    client.taskrouter.v1.workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .task_channels("Sid")
    .update(friendly_name="FriendlyName")
)

print(task_channel.account_sid)
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

        var taskChannel = await TaskChannelResource.UpdateAsync(
            friendlyName: "FriendlyName",
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "Sid");

        Console.WriteLine(taskChannel.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.TaskChannel;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        TaskChannel taskChannel =
            TaskChannel.updater("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "Sid").setFriendlyName("FriendlyName").update();

        System.out.println(taskChannel.getAccountSid());
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

	params := &taskrouter.UpdateTaskChannelParams{}
	params.SetFriendlyName("FriendlyName")

	resp, err := client.TaskrouterV1.UpdateTaskChannel("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$task_channel = $twilio->taskrouter->v1
    ->workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->taskChannels("Sid")
    ->update(["friendlyName" => "FriendlyName"]);

print $task_channel->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

task_channel = @client
               .taskrouter
               .v1
               .workspaces('WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
               .task_channels('Sid')
               .update(friendly_name: 'FriendlyName')

puts task_channel.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:task-channels:update \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid Sid \
   --friendly-name FriendlyName
```

```bash
curl -X POST "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskChannels/Sid" \
--data-urlencode "FriendlyName=FriendlyName" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "Sid",
  "friendly_name": "FriendlyName",
  "unique_name": "default",
  "date_created": "2016-04-14T17:35:54Z",
  "date_updated": "2016-04-14T17:35:54Z",
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskChannels/TCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "channel_optimized_routing": true,
  "links": {
    "workspace": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  }
}
```

## Delete a TaskChannel resource

`DELETE https://taskrouter.twilio.com/v1/Workspaces/{WorkspaceSid}/TaskChannels/{Sid}`

### Path parameters

```json
[{"name":"WorkspaceSid","in":"path","description":"The SID of the Workspace with the Task Channel to delete.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The SID of the Task Channel resource to delete.","schema":{"type":"string"},"required":true}]
```

Delete a Task Channel

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function deleteTaskChannel() {
  await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .taskChannels("Sid")
    .remove();
}

deleteTaskChannel();
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
    "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).task_channels("Sid").delete()
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

        await TaskChannelResource.DeleteAsync(
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", pathSid: "Sid");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.TaskChannel;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        TaskChannel.deleter("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "Sid").delete();
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

	err := client.TaskrouterV1.DeleteTaskChannel("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"Sid")
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
    ->taskChannels("Sid")
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
  .task_channels('Sid')
  .delete
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:task-channels:remove \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid Sid
```

```bash
curl -X DELETE "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/TaskChannels/Sid" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```
