# Event Resource

TaskRouter logs events for each state change in the Workspace for the purpose of historical reporting and auditing; it keeps that data for 30 days. To learn more about what events to expect and how they work, please [visit the Event Reference page](/docs/taskrouter/api/event/reference).

Validate only against the attributes listed on this page. Don't validate against other attributes that you may see, which are for features that aren't publicly available yet. Any attributes that aren't publicly documented may change or be removed without notice, and you may experience unexpected behavior.

## Event Properties

> \[!WARNING]
>
> Don't use the `page` query parameter with this resource. Pagination isn't supported.

<OperationTable type="properties" data={{"type":"object","refName":"taskrouter.v1.workspace.event","modelName":"taskrouter_v1_workspace_event","properties":{"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Event resource."},"actor_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^[a-zA-Z]{2}[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the resource that triggered the event."},"actor_type":{"type":"string","nullable":true,"description":"The type of resource that triggered the event."},"actor_url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the resource that triggered the event."},"description":{"type":"string","nullable":true,"description":"A description of the event."},"event_data":{"nullable":true,"description":"Data about the event. For more information, see [Event types](https://www.twilio.com/docs/taskrouter/api/event#event-types)."},"event_date":{"type":"string","format":"date-time","nullable":true,"description":"The time the event was sent, specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"event_date_ms":{"type":"integer","format":"int64","nullable":true,"description":"The time the event was sent in milliseconds."},"event_type":{"type":"string","nullable":true,"description":"The identifier for the event."},"resource_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^[a-zA-Z]{2}[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the object the event is most relevant to, such as a TaskSid, ReservationSid, or a  WorkerSid."},"resource_type":{"type":"string","nullable":true,"description":"The type of object the event is most relevant to, such as a Task, Reservation, or a Worker)."},"resource_url":{"type":"string","format":"uri","nullable":true,"description":"The URL of the resource the event is most relevant to."},"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^EV[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that we created to identify the Event resource."},"source":{"type":"string","nullable":true,"description":"Where the Event originated."},"source_ip_address":{"type":"string","nullable":true,"description":"The IP from which the Event originated."},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the Event resource."},"workspace_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the Workspace that contains the Event."}}}} />

## Fetch an Event resource

`GET https://taskrouter.twilio.com/v1/Workspaces/{WorkspaceSid}/Events/{Sid}`

### Path parameters

```json
[{"name":"WorkspaceSid","in":"path","description":"The SID of the Workspace with the Event to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The SID of the Event resource to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^EV[0-9a-fA-F]{32}$"},"required":true}]
```

Fetch an Event

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchEvent() {
  const event = await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .events("EVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch();

  console.log(event.accountSid);
}

fetchEvent();
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

event = (
    client.taskrouter.v1.workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .events("EVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch()
)

print(event.account_sid)
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

        var _event = await EventResource.FetchAsync(
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "EVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(_event.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.Event;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Event event = Event.fetcher("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "EVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").fetch();

        System.out.println(event.getAccountSid());
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

	resp, err := client.TaskrouterV1.FetchEvent("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"EVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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

$event = $twilio->taskrouter->v1
    ->workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->events("EVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->fetch();

print $event->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

event = @client
        .taskrouter
        .v1
        .workspaces('WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
        .events('EVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
        .fetch

puts event.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:events:fetch \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid EVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Events/EVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "actor_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "actor_type": "workspace",
  "actor_url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "description": "Worker JustinWorker updated to Idle Activity",
  "event_data": {
    "worker_activity_name": "Offline",
    "worker_activity_sid": "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "worker_attributes": "{}",
    "worker_name": "JustinWorker",
    "worker_sid": "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "worker_time_in_previous_activity": "26",
    "worker_time_in_previous_activity_ms": "26123",
    "workspace_name": "WorkspaceName",
    "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  },
  "event_date": "2015-02-07T00:32:41Z",
  "event_date_ms": 987654321111,
  "event_type": "worker.activity",
  "resource_sid": "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "resource_type": "worker",
  "resource_url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "EVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "source": "twilio",
  "source_ip_address": "1.2.3.4",
  "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Events/EVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

## List all Events

`GET https://taskrouter.twilio.com/v1/Workspaces/{WorkspaceSid}/Events`

### Path parameters

```json
[{"name":"WorkspaceSid","in":"path","description":"The SID of the Workspace with the Events to read. Returns only the Events that pertain to the specified Workspace.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$"},"required":true}]
```

### Query parameters

```json
[{"name":"EndDate","in":"query","description":"Only include Events that occurred on or before this date, specified in GMT as an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date-time.","schema":{"type":"string","format":"date-time"},"examples":{"readFull":{"value":"2008-01-03T00:00:00Z"},"readEmpty":{"value":"2008-01-03T00:00:00Z"}}},{"name":"EventType","in":"query","description":"The type of Events to read. Returns only Events of the type specified.","schema":{"type":"string"},"examples":{"readFull":{"value":"reservation.created"},"readEmpty":{"value":"reservation.created"}}},{"name":"Minutes","in":"query","description":"The period of events to read in minutes. Returns only Events that occurred since this many minutes in the past. The default is `15` minutes. Task Attributes for Events occuring more 43,200 minutes ago will be redacted.","schema":{"type":"integer"}},{"name":"ReservationSid","in":"query","description":"The SID of the Reservation with the Events to read. Returns only Events that pertain to the specified Reservation.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WR[0-9a-fA-F]{32}$"},"examples":{"readFull":{"value":"WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"},"readEmpty":{"value":"WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}}},{"name":"StartDate","in":"query","description":"Only include Events from on or after this date and time, specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format. Task Attributes for Events older than 30 days will be redacted.","schema":{"type":"string","format":"date-time"},"examples":{"readFull":{"value":"2008-01-02T00:00:00Z"},"readEmpty":{"value":"2008-01-02T00:00:00Z"}}},{"name":"TaskQueueSid","in":"query","description":"The SID of the TaskQueue with the Events to read. Returns only the Events that pertain to the specified TaskQueue.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WQ[0-9a-fA-F]{32}$"},"examples":{"readFull":{"value":"WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"},"readEmpty":{"value":"WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}}},{"name":"TaskSid","in":"query","description":"The SID of the Task with the Events to read. Returns only the Events that pertain to the specified Task.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WT[0-9a-fA-F]{32}$"},"examples":{"readFull":{"value":"WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"},"readEmpty":{"value":"WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}}},{"name":"WorkerSid","in":"query","description":"The SID of the Worker with the Events to read. Returns only the Events that pertain to the specified Worker.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WK[0-9a-fA-F]{32}$"},"examples":{"readFull":{"value":"WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"},"readEmpty":{"value":"WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}}},{"name":"WorkflowSid","in":"query","description":"The SID of the Workflow with the Events to read. Returns only the Events that pertain to the specified Workflow.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WW[0-9a-fA-F]{32}$"},"examples":{"readFull":{"value":"WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"},"readEmpty":{"value":"WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}}},{"name":"TaskChannel","in":"query","description":"The TaskChannel with the Events to read. Returns only the Events that pertain to the specified TaskChannel.","schema":{"type":"string"}},{"name":"Sid","in":"query","description":"The SID of the Event resource to read.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^EV[0-9a-fA-F]{32}$"}},{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

List all Events from the last 15 minutes

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listEvent() {
  const events = await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .events.list({ limit: 20 });

  events.forEach((e) => console.log(e.accountSid));
}

listEvent();
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

events = client.taskrouter.v1.workspaces(
    "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).events.list(limit=20)

for record in events:
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

        var _events = await EventResource.ReadAsync(
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", limit: 20);

        foreach (var record in _events) {
            Console.WriteLine(record.AccountSid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.Event;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Event> events = Event.reader("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").limit(20).read();

        for (Event record : events) {
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

	params := &taskrouter.ListEventParams{}
	params.SetLimit(20)

	resp, err := client.TaskrouterV1.ListEvent("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$events = $twilio->taskrouter->v1
    ->workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->events->read([], 20);

foreach ($events as $record) {
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

events = @client
         .taskrouter
         .v1
         .workspaces('WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
         .events
         .list(limit: 20)

events.each do |record|
   puts record.account_sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:events:list \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Events?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "events": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "actor_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "actor_type": "workspace",
      "actor_url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "description": "Worker JustinWorker updated to Idle Activity",
      "event_data": {
        "worker_activity_name": "Offline",
        "worker_activity_sid": "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "worker_attributes": "{}",
        "worker_name": "JustinWorker",
        "worker_sid": "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "worker_time_in_previous_activity": "26",
        "worker_time_in_previous_activity_ms": "26123",
        "workspace_name": "WorkspaceName",
        "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
      },
      "event_date": "2015-02-07T00:32:41Z",
      "event_date_ms": 987654321111,
      "event_type": "worker.activity",
      "resource_sid": "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "resource_type": "worker",
      "resource_url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "sid": "EVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "source": "twilio",
      "source_ip_address": "1.2.3.4",
      "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Events/EVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ],
  "meta": {
    "first_page_url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Events?TaskQueueSid=WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&StartDate=2008-01-02T00%3A00%3A00Z&EndDate=2008-01-03T00%3A00%3A00Z&WorkerSid=WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&EventType=reservation.created&TaskSid=WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&WorkflowSid=WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&ReservationSid=WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=50&Page=0",
    "key": "events",
    "next_page_url": null,
    "page": 0,
    "page_size": 50,
    "previous_page_url": null,
    "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Events?TaskQueueSid=WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&StartDate=2008-01-02T00%3A00%3A00Z&EndDate=2008-01-03T00%3A00%3A00Z&WorkerSid=WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&EventType=reservation.created&TaskSid=WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&WorkflowSid=WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&ReservationSid=WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=50&Page=0"
  }
}
```

List all events from a specified start date

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listEvent() {
  const events = await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .events.list({
      startDate: new Date("2009-07-06 20:30:00"),
      limit: 20,
    });

  events.forEach((e) => console.log(e.accountSid));
}

listEvent();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client
from datetime import datetime

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

events = client.taskrouter.v1.workspaces(
    "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).events.list(start_date=datetime(2009, 7, 6, 20, 30, 0), limit=20)

for record in events:
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

        var _events = await EventResource.ReadAsync(
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            startDate: new DateTime(2009, 7, 6, 20, 30, 0, DateTimeKind.Utc),
            limit: 20);

        foreach (var record in _events) {
            Console.WriteLine(record.AccountSid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.time.ZoneId;
import java.time.ZonedDateTime;
import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.Event;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Event> events = Event.reader("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                                        .setStartDate(ZonedDateTime.of(2009, 7, 6, 20, 30, 0, 0, ZoneId.of("UTC")))
                                        .limit(20)
                                        .read();

        for (Event record : events) {
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
	"time"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &taskrouter.ListEventParams{}
	params.SetStartDate(time.Date(2009, 7, 6, 20, 30, 0, 0, time.UTC))
	params.SetLimit(20)

	resp, err := client.TaskrouterV1.ListEvent("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$events = $twilio->taskrouter->v1
    ->workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->events->read(["startDate" => new \DateTime("2009-07-06T20:30:00Z")], 20);

foreach ($events as $record) {
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

events = @client
         .taskrouter
         .v1
         .workspaces('WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
         .events
         .list(
           start_date: Time.new(2009, 7, 6, 20, 30, 0),
           limit: 20
         )

events.each do |record|
   puts record.account_sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:events:list \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --start-date 2016-07-31
```

```bash
curl -X GET "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Events?StartDate=2016-07-31&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "events": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "actor_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "actor_type": "workspace",
      "actor_url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "description": "Worker JustinWorker updated to Idle Activity",
      "event_data": {
        "worker_activity_name": "Offline",
        "worker_activity_sid": "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "worker_attributes": "{}",
        "worker_name": "JustinWorker",
        "worker_sid": "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "worker_time_in_previous_activity": "26",
        "worker_time_in_previous_activity_ms": "26123",
        "workspace_name": "WorkspaceName",
        "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
      },
      "event_date": "2015-02-07T00:32:41Z",
      "event_date_ms": 987654321111,
      "event_type": "worker.activity",
      "resource_sid": "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "resource_type": "worker",
      "resource_url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "sid": "EVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "source": "twilio",
      "source_ip_address": "1.2.3.4",
      "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Events/EVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ],
  "meta": {
    "first_page_url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Events?TaskQueueSid=WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&StartDate=2008-01-02T00%3A00%3A00Z&EndDate=2008-01-03T00%3A00%3A00Z&WorkerSid=WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&EventType=reservation.created&TaskSid=WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&WorkflowSid=WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&ReservationSid=WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=50&Page=0",
    "key": "events",
    "next_page_url": null,
    "page": 0,
    "page_size": 50,
    "previous_page_url": null,
    "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Events?TaskQueueSid=WQaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&StartDate=2008-01-02T00%3A00%3A00Z&EndDate=2008-01-03T00%3A00%3A00Z&WorkerSid=WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&EventType=reservation.created&TaskSid=WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&WorkflowSid=WWaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&ReservationSid=WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=50&Page=0"
  }
}
```

> \[!WARNING]
>
> If the `StartDate` of the events request is greater than 30 days in the past then the query will be serviced a `400`-error response.
