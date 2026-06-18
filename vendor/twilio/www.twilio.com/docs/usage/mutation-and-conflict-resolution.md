# API mutation and conflict resolution

Twilio allows multiple processes to update the same resource at the same time. In general, if two updates happen at the same time, the last one to complete will overwrite the previous one.

To help prevent accidental overwrites during concurrent updates, some Twilio API resources support optimistic concurrency control using the [`If-Match`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-Match) and [`ETag`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag) HTTP headers. Optimistic concurrency control allows multiple processes to attempt updates but requires each update to check if the resource has changed since it was last read. If the resource has changed, the update is rejected.

You can use the `ETag` and `If-Match` headers for the following resources:

* [Task](/docs/taskrouter/api/task)
* [Sync List Item](/docs/sync/mutation-and-conflict-resolution)

## General conflict resolution

Without the `ETag` and `If-Match` headers, the last update to a resource will overwrite any previous updates.

### Example: Create a Task

Create a Task with the attributes `{"foo": "bar"}`.

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
    .tasks.create({ attributes: JSON.stringify({ foo: "bar" }) });

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
).tasks.create(attributes=json.dumps({"foo": "bar"}))

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
                new Dictionary<string, Object>() { { "foo", "bar" } }, Formatting.Indented),
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
                                put("foo", "bar");
                            }
                        }).toString())
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
		"foo": "bar",
	})

	if AttributesError != nil {
		fmt.Println(AttributesError)
		os.Exit(1)
	}

	params := &taskrouter.CreateTaskParams{}
	params.SetAttributes(string(Attributes))

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
            "foo" => "bar",
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
       .workspaces('WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
       .tasks
       .create(attributes: {
             'foo' => 'bar'
           }.to_json)

puts task.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:tasks:create \
   --workspace-sid WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --attributes "{\"foo\": \"bar\"}"
```

```bash
ATTRIBUTES_OBJ=$(cat << EOF
{
  "foo": "bar"
}
EOF
)
curl -X POST "https://taskrouter.twilio.com/v1/Workspaces/WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Tasks" \
--data-urlencode "Attributes=$ATTRIBUTES_OBJ" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "age": 25200,
  "assignment_status": "pending",
  "attributes": "{\"foo\": \"bar\"}",
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
  "workflow_sid": "WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

### Example: Update a Task without ETag and If-Match

Next, make two `POST` requests in quick succession to update the Task's attributes. This simulates concurrent updates from different sources.

* `POST A`: Update `"foo": "bar"` to `"foo": "bar-SFO"`.
* `POST B`: Update `"foo": "bar"` to `"foo": "bar-DEN"`.

POST A: Update Task attributes to bar-SFO

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
    .workspaces("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .tasks("WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update({ attributes: JSON.stringify({ foo: "bar-SFO" }) });

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
    client.taskrouter.v1.workspaces("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .tasks("WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update(attributes=json.dumps({"foo": "bar-SFO"}))
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
            attributes: JsonConvert.SerializeObject(
                new Dictionary<string, Object>() { { "foo", "bar-SFO" } }, Formatting.Indented),
            pathWorkspaceSid: "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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
        Task task = Task.updater("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                        .setAttributes(new JSONObject(new HashMap<String, Object>() {
                            {
                                put("foo", "bar-SFO");
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
		"foo": "bar-SFO",
	})

	if AttributesError != nil {
		fmt.Println(AttributesError)
		os.Exit(1)
	}

	params := &taskrouter.UpdateTaskParams{}
	params.SetAttributes(string(Attributes))

	resp, err := client.TaskrouterV1.UpdateTask("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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
    ->workspaces("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->tasks("WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->update([
        "attributes" => json_encode([
            "foo" => "bar-SFO",
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
       .workspaces('WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
       .tasks('WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
       .update(attributes: {
             'foo' => 'bar-SFO'
           }.to_json)

puts task.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:tasks:update \
   --workspace-sid WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --sid WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --attributes "{\"foo\": \"bar-SFO\"}"
```

```bash
ATTRIBUTES_OBJ=$(cat << EOF
{
  "foo": "bar-SFO"
}
EOF
)
curl -X POST "https://taskrouter.twilio.com/v1/Workspaces/WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
--data-urlencode "Attributes=$ATTRIBUTES_OBJ" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "age": 25200,
  "assignment_status": "pending",
  "attributes": "{\"foo\": \"bar-SFO\"}",
  "date_created": "2014-05-14T18:50:02Z",
  "date_updated": "2014-05-15T07:26:06Z",
  "task_queue_entered_date": "2014-05-14T18:50:02Z",
  "virtual_start_time": "2023-08-02T12:34:56Z",
  "priority": 0,
  "reason": "Test Reason",
  "sid": "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "task_queue_sid": "WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "task_channel_sid": "TCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "task_channel_unique_name": "task-channel",
  "timeout": 60,
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "workflow_sid": "WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "workspace_sid": "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

Post B: Update Attributes to bar-DEN

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
    .workspaces("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .tasks("WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update({ attributes: JSON.stringify({ foo: "bar-DEN" }) });

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
    client.taskrouter.v1.workspaces("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .tasks("WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update(attributes=json.dumps({"foo": "bar-DEN"}))
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
            attributes: JsonConvert.SerializeObject(
                new Dictionary<string, Object>() { { "foo", "bar-DEN" } }, Formatting.Indented),
            pathWorkspaceSid: "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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
        Task task = Task.updater("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                        .setAttributes(new JSONObject(new HashMap<String, Object>() {
                            {
                                put("foo", "bar-DEN");
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
		"foo": "bar-DEN",
	})

	if AttributesError != nil {
		fmt.Println(AttributesError)
		os.Exit(1)
	}

	params := &taskrouter.UpdateTaskParams{}
	params.SetAttributes(string(Attributes))

	resp, err := client.TaskrouterV1.UpdateTask("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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
    ->workspaces("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->tasks("WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->update([
        "attributes" => json_encode([
            "foo" => "bar-DEN",
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
       .workspaces('WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
       .tasks('WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
       .update(attributes: {
             'foo' => 'bar-DEN'
           }.to_json)

puts task.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:tasks:update \
   --workspace-sid WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --sid WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --attributes "{\"foo\": \"bar-DEN\"}"
```

```bash
ATTRIBUTES_OBJ=$(cat << EOF
{
  "foo": "bar-DEN"
}
EOF
)
curl -X POST "https://taskrouter.twilio.com/v1/Workspaces/WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
--data-urlencode "Attributes=$ATTRIBUTES_OBJ" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "age": 25200,
  "assignment_status": "pending",
  "attributes": "{\"foo\": \"bar-DEN\"}",
  "date_created": "2014-05-14T18:50:02Z",
  "date_updated": "2014-05-15T07:26:06Z",
  "task_queue_entered_date": "2014-05-14T18:50:02Z",
  "virtual_start_time": "2023-08-02T12:34:56Z",
  "priority": 0,
  "reason": "Test Reason",
  "sid": "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "task_queue_sid": "WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "task_channel_sid": "TCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "task_channel_unique_name": "task-channel",
  "timeout": 60,
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "workflow_sid": "WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "workspace_sid": "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

The `POST B` request overwrites the `POST A` request, and the Task's attributes are now `"foo": "bar-DEN"`.

## Conflict resolution with ETag and If-Match

When you update a resource, the response returns a new `ETag` value that represents the current version of the resource. If you want to ensure that you're updating the most recent version, include the `ETag` value in the `If-Match` header of your update request.

1. Make a `GET` request to retrieve the Task with the `ETag` header.
2. Use the `ETag` value in the `If-Match` header when you make your update request.

If the `ETag` value and the `If-Match` value don't match, it means that the resource has been updated in-between and Twilio rejects your update with a `412 Precondition Failed` error.

### Example: Update a Task with ETag and If-Match

Update with If-Match Header

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
    .workspaces("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .tasks("WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update({
      attributes: JSON.stringify({ foo: "bar-DEN" }),
      ifMatch: "0",
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
    client.taskrouter.v1.workspaces("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .tasks("WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update(attributes=json.dumps({"foo": "bar-DEN"}), if_match="0")
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
            ifMatch: "0",
            attributes: JsonConvert.SerializeObject(
                new Dictionary<string, Object>() { { "foo", "bar-DEN" } }, Formatting.Indented),
            pathWorkspaceSid: "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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
        Task task = Task.updater("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                        .setIfMatch("0")
                        .setAttributes(new JSONObject(new HashMap<String, Object>() {
                            {
                                put("foo", "bar-DEN");
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
		"foo": "bar-DEN",
	})

	if AttributesError != nil {
		fmt.Println(AttributesError)
		os.Exit(1)
	}

	params := &taskrouter.UpdateTaskParams{}
	params.SetAttributes(string(Attributes))
	params.SetIfMatch("0")

	resp, err := client.TaskrouterV1.UpdateTask("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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
    ->workspaces("WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->tasks("WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->update([
        "attributes" => json_encode([
            "foo" => "bar-DEN",
        ]),
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
       .workspaces('WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
       .tasks('WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
       .update(
         attributes: {
             'foo' => 'bar-DEN'
           }.to_json,
         if_match: '0'
       )

puts task.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:tasks:update \
   --workspace-sid WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --sid WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --attributes "{\"foo\": \"bar-DEN\"}" \
   --if-match 0
```

```bash
ATTRIBUTES_OBJ=$(cat << EOF
{
  "foo": "bar-DEN"
}
EOF
)
curl -X POST "https://taskrouter.twilio.com/v1/Workspaces/WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
--header "If-Match: 0" \
--data-urlencode "Attributes=$ATTRIBUTES_OBJ" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "age": 25200,
  "assignment_status": "pending",
  "attributes": "{\"foo\": \"bar-DEN\"}",
  "date_created": "2014-05-14T18:50:02Z",
  "date_updated": "2014-05-15T07:26:06Z",
  "task_queue_entered_date": "2014-05-14T18:50:02Z",
  "virtual_start_time": "2023-08-02T12:34:56Z",
  "priority": 0,
  "reason": "Test Reason",
  "sid": "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "task_queue_sid": "WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "task_channel_sid": "TCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "task_channel_unique_name": "task-channel",
  "timeout": 60,
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "workflow_sid": "WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "workspace_sid": "WSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

This operation fails with a `412 Precondition Failed` response because the `ETag` (`1`) and the `If-Match` (`0`) values don't match.

## Next Steps

* [Make your own requests to the Twilio API](/docs/usage/requests-to-twilio).
* [Secure your app with the Twilio HTTP header](/docs/usage/security).
* Learn more about [what to expect in Twilio API responses](/docs/usage/twilios-response).
