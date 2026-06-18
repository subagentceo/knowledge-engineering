# Task Reservation Resource

> \[!WARNING]
>
> Don't use the `page` query parameter with this resource. Pagination isn't supported.

## Reservation Instance Subresource \[#reservation]

TaskRouter creates a Reservation subresource whenever a Task is reserved for a Worker. TaskRouter will provide the details of this Reservation Instance
subresource in the Assignment Callback HTTP request it makes to your application server.

You have multiple options for handling a Reservation:

1. [Respond to the Assignment Callback](/docs/taskrouter/handle-assignment-callbacks) with an Assignment Instruction.
2. Call the REST API with how to handle it.
3. Allow your Worker to decide if they can take the Reservation with the [Worker JS SDK][worker-js-sdk].

The following details the REST API.

**Important:** If you do not respond with how to handle your Reservation within the `TaskReservationTimeout` configured on a [Workflow][workflows], then the Reservation will timeout and the Task will be available for other workers.

## Actions

* [Retrieve a Reservation](#action-get)
* [Update a Reservation](#action-update)
* [List all Reservations](#reservations-list-resource)

***

## Retrieve a Reservation \[#action-get]

### Resource URI

```bash
GET /v1/Workspaces/{WorkspaceSid}/Tasks/{TaskSid}/Reservations/{ReservationSid}

```

Returns the single reservation resource identified by \{ReservationSid}.

#### Example

[worker-js-sdk]: /docs/taskrouter/js-sdk/workspace/worker

[workflows]: /docs/taskrouter/api/workflow

Fetch a Reservation

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchTaskReservation() {
  const reservation = await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .tasks("WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .reservations("WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch();

  console.log(reservation.accountSid);
}

fetchTaskReservation();
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

reservation = (
    client.taskrouter.v1.workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .tasks("WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .reservations("WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch()
)

print(reservation.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Taskrouter.V1.Workspace.Task;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var reservation = await ReservationResource.FetchAsync(
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathTaskSid: "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(reservation.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.task.Reservation;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Reservation reservation = Reservation
                                      .fetcher("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                                          "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                                          "WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                                      .fetch();

        System.out.println(reservation.getAccountSid());
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

	resp, err := client.TaskrouterV1.FetchTaskReservation("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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

$reservation = $twilio->taskrouter->v1
    ->workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->tasks("WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->reservations("WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->fetch();

print $reservation->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

reservation = @client
              .taskrouter
              .v1
              .workspaces('WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              .tasks('WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              .reservations('WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              .fetch

puts reservation.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:tasks:reservations:fetch \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --task-sid WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Reservations/WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2014-05-14T10:50:02Z",
  "date_updated": "2014-05-15T16:03:42Z",
  "links": {
    "task": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "worker": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "workspace": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  },
  "reservation_status": "accepted",
  "sid": "WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "task_sid": "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Reservations/WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "worker_name": "Doug",
  "worker_sid": "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

#### Resource Properties

A Reservation has the following properties.

| Field             | Description                                                                     |
| ----------------- | ------------------------------------------------------------------------------- |
| Sid               | The unique ID of this Reservation.                                              |
| AccountSid        | The ID of the Account that owns this Task                                       |
| WorkspaceSid      | The ID of the Workspace that this task is contained within.                     |
| TaskSid           | The ID of the reserved Task                                                     |
| WorkerSid         | The ID of the reserved Worker                                                   |
| WorkerName        | Human readable description of the Worker that is reserved                       |
| ReservationStatus | The current status of the reservation. See the table below for possible values. |

Possible values for ReservationStatus:

| Status    | Description                                                                                                                                                                        |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accepted  | The Reservation was accepted by the Worker.                                                                                                                                        |
| canceled  | The Reservation was canceled because the reservation timeout was reached.                                                                                                          |
| completed | The Reservation was marked as completed.                                                                                                                                           |
| pending   | A Worker has been reserved for this task and TaskRouter is waiting on a reservation response.                                                                                      |
| rejected  | The Reservation was rejected by the Worker.                                                                                                                                        |
| rescinded | The Reservation was removed from the Worker.                                                                                                                                       |
| timeout   | The Reservation timed out waiting for a response. When this happens, the Task will remain in the queue and TaskRouter will attempt to assign the Task to the next eligible Worker. |
| wrapping  | The Worker has finished the primary work and is finishing additional duties for the Reservation. This status is available for Flex accounts only.                                  |

***

## Update Reservation \[#action-update]

### Resource URI \[#resource-uri-2]

```bash
POST /v1/Workspaces/{WorkspaceSid}/Tasks/{TaskSid}/Reservations/{ReservationSid}

```

To indicate that a Worker has accepted or rejected a Reservation, you make an `HTTP POST` request to a Reservation instance resource URI.

You can issue a simple Accept or Reject request. You can also issue an Instruction, similar to [Responding to an Assignment Callback](/docs/taskrouter/handle-assignment-callbacks). We'll detail what parameters need to be provided for each method:

1. [Accept a Reservation](#accept)
2. [Reject a Reservation](#reject)
3. [Issue a Conference Instruction](#conference)
4. [Issue a Dequeue Instruction](#dequeue)
5. [Issue a Call Instruction](#call)
6. [Redirect an active phone call to TwiML document](#redirect)

### Accept a Reservation \[#accept]

Accepting a reservation means that the worker will work on the task, but you will need to do whatever work is required to connect the details of that task to the worker. You can think of accept as the bare minimum option for task acceptance. For voice tasks, the other methods described below are supersets of accept.

#### Example \[#example-2]

Accept a Reservation

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateTaskReservation() {
  const reservation = await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .tasks("WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .reservations("WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update({ reservationStatus: "accepted" });

  console.log(reservation.accountSid);
}

updateTaskReservation();
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

task_reservation = (
    client.taskrouter.v1.workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .tasks("WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .reservations("WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update(reservation_status="accepted")
)

print(task_reservation.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Taskrouter.V1.Workspace.Task;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var reservation = await ReservationResource.UpdateAsync(
            reservationStatus: ReservationResource.StatusEnum.Accepted,
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathTaskSid: "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(reservation.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.task.Reservation;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Reservation reservation = Reservation
                                      .updater("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                                          "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                                          "WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                                      .setReservationStatus(Reservation.Status.ACCEPTED)
                                      .update();

        System.out.println(reservation.getAccountSid());
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

	params := &taskrouter.UpdateTaskReservationParams{}
	params.SetReservationStatus("accepted")

	resp, err := client.TaskrouterV1.UpdateTaskReservation("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$task_reservation = $twilio->taskrouter->v1
    ->workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->tasks("WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->reservations("WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->update(["reservationStatus" => "accepted"]);

print $task_reservation->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

reservation = @client
              .taskrouter
              .v1
              .workspaces('WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              .tasks('WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              .reservations('WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              .update(reservation_status: 'accepted')

puts reservation.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:tasks:reservations:update \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --task-sid WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --reservation-status accepted
```

```bash
curl -X POST "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Reservations/WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
--data-urlencode "ReservationStatus=accepted" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2014-05-14T10:50:02Z",
  "date_updated": "2014-05-15T16:03:42Z",
  "links": {
    "task": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "worker": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "workspace": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  },
  "reservation_status": "accepted",
  "sid": "WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "task_sid": "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Reservations/WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "worker_name": "Doug",
  "worker_sid": "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

#### POST Parameters

| Field             | Required? | Description                                                                                                                                                                                                                                                                                                         |
| ----------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ReservationStatus | Yes       | `accepted`. Specifying accepted means the Worker has received the Task and will process it. TaskRouter will no longer consider this task eligible for assignment, and no other Worker will receive this Task. ([🏢 not PII](/docs/glossary/what-is-personally-identifiable-information-pii#fields-marked-not-pii) ) |

### Reject a Reservation \[#reject]

#### Example \[#example-3]

Reject a Reservation

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateTaskReservation() {
  const reservation = await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .tasks("WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .reservations("WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update({ reservationStatus: "rejected" });

  console.log(reservation.accountSid);
}

updateTaskReservation();
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

task_reservation = (
    client.taskrouter.v1.workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .tasks("WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .reservations("WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update(reservation_status="rejected")
)

print(task_reservation.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Taskrouter.V1.Workspace.Task;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var reservation = await ReservationResource.UpdateAsync(
            reservationStatus: ReservationResource.StatusEnum.Rejected,
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathTaskSid: "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(reservation.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.task.Reservation;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Reservation reservation = Reservation
                                      .updater("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                                          "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                                          "WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                                      .setReservationStatus(Reservation.Status.REJECTED)
                                      .update();

        System.out.println(reservation.getAccountSid());
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

	params := &taskrouter.UpdateTaskReservationParams{}
	params.SetReservationStatus("rejected")

	resp, err := client.TaskrouterV1.UpdateTaskReservation("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$task_reservation = $twilio->taskrouter->v1
    ->workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->tasks("WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->reservations("WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->update(["reservationStatus" => "rejected"]);

print $task_reservation->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

reservation = @client
              .taskrouter
              .v1
              .workspaces('WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              .tasks('WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              .reservations('WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              .update(reservation_status: 'rejected')

puts reservation.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:tasks:reservations:update \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --task-sid WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --reservation-status rejected
```

```bash
curl -X POST "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Reservations/WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
--data-urlencode "ReservationStatus=rejected" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2014-05-14T10:50:02Z",
  "date_updated": "2014-05-15T16:03:42Z",
  "links": {
    "task": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "worker": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "workspace": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  },
  "reservation_status": "rejected",
  "sid": "WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "task_sid": "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Reservations/WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "worker_name": "Doug",
  "worker_sid": "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

#### POST Parameters \[#post-parameters-2]

| Field             | Required? | Description                                                                                                                                                                                                                                                                                    |
| ----------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ReservationStatus | Yes       | `rejected`. Specifying rejected means the Worker has refused the assignment and TaskRouter will attempt to assign this Task to the next eligible Worker. ([🏢 not PII](/docs/glossary/what-is-personally-identifiable-information-pii#fields-marked-not-pii) )                                 |
| WorkerActivitySid | No        | If rejecting a reservation, change the worker that is tied to this reservation to the supplied activity. If not provided, the WorkerPreviousActivitySid on the Reservation will be used. ([🏢 not PII](/docs/glossary/what-is-personally-identifiable-information-pii#fields-marked-not-pii) ) |

**Note**: Tasks are automatically canceled after 1,000 rejections.

Although Tasks have always been cancelled after 1,000 rejections, the documentation previously incorrectly showed that Tasks are automatically cancelled after 10 rejections. If your solution requires Tasks to be cancelled after 10 rejections instead, please contact our [support team](https://help.twilio.com) for help.

Refer to [Manually accepting or rejecting a reservation](/docs/taskrouter/handle-assignment-callbacks) for more information.

### Conference Instruction \[#conference]

> \[!NOTE]
>
> Conference instruction is the recommended way to connect calls between
> customer and agents. This should be used in almost all cases instead of
> dequeue or call for call center scenarios

Conference instruction takes care of a lot of the call orchestration which you would otherwise do yourself. For a given call represented by a task in TaskRouter, issuing a conference instruction will:

* Call the worker on either the specified `contact_uri` of the worker, or the provided `to` field
* Monitor call status to check that the agent has answered the call
* Put the agent call into a Conference, named by TaskSid
* Monitor that the above has succeeded
* Move the caller out of the queue and into the conference
* Mark the task as accepted if and only if all the above succeeded, and handle corner cases (such as caller hangs up during this process) gracefully.

Note that conference instruction works out of the box with calls that have been in TaskRouter using the native TaskRouter integration. If you are creating the task manually for a voice call, in order to use conference instruction you must at minimum include in the Task Attributes `{"call_sid" : "<callsid>", "to" : "<E.164 to number>"}`

#### Example \[#example-4]

[support]: /help/contact

Update Conference Instructions

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateTaskReservation() {
  const reservation = await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .tasks("WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .reservations("WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update({
      conferenceStatusCallbackEvent: [
        "start",
        "end",
        "join",
        "leave",
        "mute",
        "hold",
      ],
      from: "+18001231234",
      instruction: "conference",
      statusCallback: "https://www.example.com/ConferenceEvents",
    });

  console.log(reservation.accountSid);
}

updateTaskReservation();
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

task_reservation = (
    client.taskrouter.v1.workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .tasks("WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .reservations("WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update(
        instruction="conference",
        from_="+18001231234",
        status_callback="https://www.example.com/ConferenceEvents",
        conference_status_callback_event=[
            "start",
            "end",
            "join",
            "leave",
            "mute",
            "hold",
        ],
    )
)

print(task_reservation.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Taskrouter.V1.Workspace.Task;
using System.Threading.Tasks;
using System.Collections.Generic;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var reservation = await ReservationResource.UpdateAsync(
            instruction: "conference",
            from: "+18001231234",
            statusCallback: new Uri("https://www.example.com/ConferenceEvents"),
            conferenceStatusCallbackEvent: new List<ReservationResource.ConferenceEventEnum> {
                ReservationResource.ConferenceEventEnum.Start,
                ReservationResource.ConferenceEventEnum.End,
                ReservationResource.ConferenceEventEnum.Join,
                ReservationResource.ConferenceEventEnum.Leave,
                ReservationResource.ConferenceEventEnum.Mute,
                ReservationResource.ConferenceEventEnum.Hold
            },
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathTaskSid: "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        );

        Console.WriteLine(reservation.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.net.URI;
import java.util.Arrays;
import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.task.Reservation;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Reservation reservation = Reservation
                                      .updater("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                                          "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                                          "WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                                      .setInstruction("conference")
                                      .setFrom("+18001231234")
                                      .setStatusCallback(URI.create("https://www.example.com/ConferenceEvents"))
                                      .setConferenceStatusCallbackEvent(Arrays.asList(Reservation.ConferenceEvent.START,
                                          Reservation.ConferenceEvent.END,
                                          Reservation.ConferenceEvent.JOIN,
                                          Reservation.ConferenceEvent.LEAVE,
                                          Reservation.ConferenceEvent.MUTE,
                                          Reservation.ConferenceEvent.HOLD))
                                      .update();

        System.out.println(reservation.getAccountSid());
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

	params := &taskrouter.UpdateTaskReservationParams{}
	params.SetInstruction("conference")
	params.SetFrom("+18001231234")
	params.SetStatusCallback("https://www.example.com/ConferenceEvents")
	params.SetConferenceStatusCallbackEvent([]string{
		"start",
		"end",
		"join",
		"leave",
		"mute",
		"hold",
	})

	resp, err := client.TaskrouterV1.UpdateTaskReservation("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$task_reservation = $twilio->taskrouter->v1
    ->workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->tasks("WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->reservations("WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->update([
        "instruction" => "conference",
        "from" => "+18001231234",
        "statusCallback" => "https://www.example.com/ConferenceEvents",
        "conferenceStatusCallbackEvent" => [
            "start",
            "end",
            "join",
            "leave",
            "mute",
            "hold",
        ],
    ]);

print $task_reservation->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

reservation = @client
              .taskrouter
              .v1
              .workspaces('WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              .tasks('WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              .reservations('WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              .update(
                instruction: 'conference',
                from: '+18001231234',
                status_callback: 'https://www.example.com/ConferenceEvents',
                conference_status_callback_event: [
                  'start',
                  'end',
                  'join',
                  'leave',
                  'mute',
                  'hold'
                ]
              )

puts reservation.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:tasks:reservations:update \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --task-sid WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --instruction conference \
   --from +18001231234 \
   --status-callback https://www.example.com/ConferenceEvents \
   --conference-status-callback-event start end join leave mute hold
```

```bash
curl -X POST "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Reservations/WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
--data-urlencode "Instruction=conference" \
--data-urlencode "From=+18001231234" \
--data-urlencode "StatusCallback=https://www.example.com/ConferenceEvents" \
--data-urlencode "ConferenceStatusCallbackEvent=start" \
--data-urlencode "ConferenceStatusCallbackEvent=end" \
--data-urlencode "ConferenceStatusCallbackEvent=join" \
--data-urlencode "ConferenceStatusCallbackEvent=leave" \
--data-urlencode "ConferenceStatusCallbackEvent=mute" \
--data-urlencode "ConferenceStatusCallbackEvent=hold" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2014-05-14T10:50:02Z",
  "date_updated": "2014-05-15T16:03:42Z",
  "links": {
    "task": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "worker": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "workspace": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  },
  "reservation_status": "accepted",
  "sid": "WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "task_sid": "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Reservations/WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "worker_name": "Doug",
  "worker_sid": "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

#### POST Parameters \[#post-parameters-3]

Conference instruction uses the [Conference Participants API][participantapi]. All values valid for that API can be provided as part of the conference instruction. Note that those parameter names are not replicated here. Please refer to linked documentation for valid values.

Note that the Participant API parameters provided apply to the worker leg of the call, not the customer leg of the call. In particular, note that endConferenceOnExit can only be set for the worker leg. If the customer hangs up if you want the agent call leg to be torn down you should do that via API.

| Field                                                                                                                                                                                                                                                        | Required? | Description                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Instruction                                                                                                                                                                                                                                                  | Yes       | `Conference` ([🏢 not PII](/docs/glossary/what-is-personally-identifiable-information-pii#fields-marked-not-pii) )                                                                                                                                                                                                                                                                                                     |
| To                                                                                                                                                                                                                                                           | No        | The contact URI of the Worker. A phone number or client ID. Must be a string. Required if the worker's attributes do not include a `contact_uri` property. ([📇 PII](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) )                                                                                                                                                                      |
| From                                                                                                                                                                                                                                                         | No        | The caller ID for the call to the worker. Must be a string. Note: This needs to be a verified Twilio number. If you need this to be the original caller number, please [contact Support][support] ([📇 PII](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) )                                                                                                                               |
| PostWorkActivitySid                                                                                                                                                                                                                                          | No        | (Deprecated) The activity to move a worker to after executing a conference instruction. Not valid in multi-tasking workspaces. ([🏢 not PII](/docs/glossary/what-is-personally-identifiable-information-pii#fields-marked-not-pii) )                                                                                                                                                                                   |
| Timeout                                                                                                                                                                                                                                                      | No        | The integer number of seconds that Twilio should allow the phone associated with `contact_uri` to ring before assuming there is no answer. Default is 60 seconds, the maximum is 999 seconds. Note, you could set this to a low value, such as 15, to hang up before reaching an answering machine or voicemail. ([🏢 not PII](/docs/glossary/what-is-personally-identifiable-information-pii#fields-marked-not-pii) ) |
| *All other Participant API possible parameters except for the following:* `caller-id` `byoc` `recording-track` `label` `recording-status-callback-event` `conference-recording-status-callback-event` `coaching` `call-sid-to-coach` `call-reason` `speaker` | No        | See [linked][participantapi] documentation                                                                                                                                                                                                                                                                                                                                                                             |

**Note**: A property of `contact_uri` is required on the WorkerAttributes to indicate whom to call. See more information on this [here](/docs/taskrouter/api/worker).

### Dequeue Instruction \[#dequeue]

[participantapi]: /docs/voice/api/conference-participant-resource

> \[!WARNING]
>
> In most situations we would recommend you use Conference Instruction instead
> of dequeue

#### Example \[#example-5]

Update Dequeue Instructions

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateTaskReservation() {
  const reservation = await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .tasks("WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .reservations("WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update({
      dequeueFrom: "+18001231234",
      instruction: "dequeue",
    });

  console.log(reservation.accountSid);
}

updateTaskReservation();
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

task_reservation = (
    client.taskrouter.v1.workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .tasks("WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .reservations("WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update(instruction="dequeue", dequeue_from="+18001231234")
)

print(task_reservation.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Taskrouter.V1.Workspace.Task;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var reservation = await ReservationResource.UpdateAsync(
            instruction: "dequeue",
            dequeueFrom: "+18001231234",
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathTaskSid: "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(reservation.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.task.Reservation;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Reservation reservation = Reservation
                                      .updater("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                                          "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                                          "WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                                      .setInstruction("dequeue")
                                      .setDequeueFrom("+18001231234")
                                      .update();

        System.out.println(reservation.getAccountSid());
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

	params := &taskrouter.UpdateTaskReservationParams{}
	params.SetInstruction("dequeue")
	params.SetDequeueFrom("+18001231234")

	resp, err := client.TaskrouterV1.UpdateTaskReservation("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$task_reservation = $twilio->taskrouter->v1
    ->workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->tasks("WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->reservations("WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->update([
        "instruction" => "dequeue",
        "dequeueFrom" => "+18001231234",
    ]);

print $task_reservation->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

reservation = @client
              .taskrouter
              .v1
              .workspaces('WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              .tasks('WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              .reservations('WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              .update(
                instruction: 'dequeue',
                dequeue_from: '+18001231234'
              )

puts reservation.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:tasks:reservations:update \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --task-sid WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --instruction dequeue \
   --dequeue-from +18001231234
```

```bash
curl -X POST "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Reservations/WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
--data-urlencode "Instruction=dequeue" \
--data-urlencode "DequeueFrom=+18001231234" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2014-05-14T10:50:02Z",
  "date_updated": "2014-05-15T16:03:42Z",
  "links": {
    "task": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "worker": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "workspace": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  },
  "reservation_status": "accepted",
  "sid": "WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "task_sid": "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Reservations/WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "worker_name": "Doug",
  "worker_sid": "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

#### POST Parameters \[#post-parameters-4]

| Field                      | Required? | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| -------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Instruction                | Yes       | `Dequeue` ([🏢 not PII](/docs/glossary/what-is-personally-identifiable-information-pii#fields-marked-not-pii) )                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| DequeueTo                  | No        | The contact URI of the Worker. A phone number or client ID. Required if the worker's attributes do not include a `contact_uri` property. ([📇 PII](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) )                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| DequeueFrom                | Yes       | The caller ID for the call to the worker. Note: This needs to be a verified Twilio number. If you need this to be the original callee number, please [contact Support][support] ([📇 PII](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) )                                                                                                                                                                                                                                                                                                                                                                                                |
| DequeuePostWorkActivitySid | No        | The activity to move a worker to after executing a dequeue instruction. ([🏢 not PII](/docs/glossary/what-is-personally-identifiable-information-pii#fields-marked-not-pii) )                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| DequeueRecord              | No        | The 'DequeueRecord' attribute lets you record both legs of a call. Set to "record-from-answer" to record the call from answer. Default to "do-not-record" which will not record the call. The RecordingUrl will be sent with DequeueStatusCallbackUrl. ([🏢 not PII](/docs/glossary/what-is-personally-identifiable-information-pii#fields-marked-not-pii) )                                                                                                                                                                                                                                                                                                          |
| DequeueTimeout             | No        | The integer number of seconds that Twilio should allow the phone associated with `contact_uri` to ring before assuming there is no answer. Default is 60 seconds, the maximum is 999 seconds. Note, you could set this to a low value, such as 15, to hangup before reaching an answering machine or voicemail. ([🏢 not PII](/docs/glossary/what-is-personally-identifiable-information-pii#fields-marked-not-pii) )                                                                                                                                                                                                                                                 |
| DequeueStatusCallbackUrl   | No        | A URL that Twilio will send asynchronous webhook requests to on completed call event. \*\*Note: TaskRouter sends "taskCallSid" as parameter with sid of the call that created the Task. This is very useful in the event a call to worker fails, where you could remove the original call from queue and send to voice mail or enqueue again with new workflow to route to different group of workers. ([🏢 not PII](/docs/glossary/what-is-personally-identifiable-information-pii#fields-marked-not-pii) )                                                                                                                                                          |
| DequeueStatusCallbackEvent | No        | The call progress events that will be sent via webhooks on a worker's call. Available values are initiated, ringing, answered, and completed. If you want to receive multiple events, please provide multiple DequeueStatusCallbackEvent values as individual parameters in the `POST` request. If no event is specified, defaults to completed. For example to receive webhooks on answered and completed events pass "DequeueStatusCallbackEvent=answered\&DequeueStatusCallbackEvent=completed". Please [click here][statuscallbackevents] for more details. ([🏢 not PII](/docs/glossary/what-is-personally-identifiable-information-pii#fields-marked-not-pii) ) |

**Note**: A property of `contact_uri` is required on the WorkerAttributes to indicate whom to call. See more information on this [here](/docs/taskrouter/api/worker).

Please see [issuing a Dequeue Instruction](/docs/taskrouter/handle-assignment-callbacks#dequeue-call) for more information.

[statuscallbackevents]: /docs/voice/tutorials/how-to-make-outbound-phone-calls#receive-call-status-updates

### Call Instruction \[#call]

#### Example \[#example-6]

Update Call Instruction

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateTaskReservation() {
  const reservation = await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .tasks("WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .reservations("WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update({
      callAccept: true,
      callFrom: "+15558675310",
      callStatusCallbackUrl: "http://example.com/agent_answer_status_callbac",
      callUrl: "http://example.com/agent_answer",
      instruction: "call",
    });

  console.log(reservation.accountSid);
}

updateTaskReservation();
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

task_reservation = (
    client.taskrouter.v1.workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .tasks("WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .reservations("WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update(
        instruction="call",
        call_from="+15558675310",
        call_url="http://example.com/agent_answer",
        call_status_callback_url="http://example.com/agent_answer_status_callbac",
        call_accept=True,
    )
)

print(task_reservation.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Taskrouter.V1.Workspace.Task;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var reservation = await ReservationResource.UpdateAsync(
            instruction: "call",
            callFrom: "+15558675310",
            callUrl: new Uri("http://example.com/agent_answer"),
            callStatusCallbackUrl: new Uri("http://example.com/agent_answer_status_callbac"),
            callAccept: true,
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathTaskSid: "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(reservation.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.net.URI;
import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.task.Reservation;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Reservation reservation =
            Reservation
                .updater("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                    "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                    "WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                .setInstruction("call")
                .setCallFrom("+15558675310")
                .setCallUrl(URI.create("http://example.com/agent_answer"))
                .setCallStatusCallbackUrl(URI.create("http://example.com/agent_answer_status_callbac"))
                .setCallAccept(true)
                .update();

        System.out.println(reservation.getAccountSid());
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

	params := &taskrouter.UpdateTaskReservationParams{}
	params.SetInstruction("call")
	params.SetCallFrom("+15558675310")
	params.SetCallUrl("http://example.com/agent_answer")
	params.SetCallStatusCallbackUrl("http://example.com/agent_answer_status_callbac")
	params.SetCallAccept(true)

	resp, err := client.TaskrouterV1.UpdateTaskReservation("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$task_reservation = $twilio->taskrouter->v1
    ->workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->tasks("WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->reservations("WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->update([
        "instruction" => "call",
        "callFrom" => "+15558675310",
        "callUrl" => "http://example.com/agent_answer",
        "callStatusCallbackUrl" =>
            "http://example.com/agent_answer_status_callbac",
        "callAccept" => true,
    ]);

print $task_reservation->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

reservation = @client
              .taskrouter
              .v1
              .workspaces('WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              .tasks('WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              .reservations('WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              .update(
                instruction: 'call',
                call_from: '+15558675310',
                call_url: 'http://example.com/agent_answer',
                call_status_callback_url: 'http://example.com/agent_answer_status_callbac',
                call_accept: true
              )

puts reservation.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:tasks:reservations:update \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --task-sid WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --instruction call \
   --call-from +15558675310 \
   --call-url http://example.com/agent_answer \
   --call-status-callback-url http://example.com/agent_answer_status_callbac \
   --call-accept
```

```bash
curl -X POST "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Reservations/WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
--data-urlencode "Instruction=call" \
--data-urlencode "CallFrom=+15558675310" \
--data-urlencode "CallUrl=http://example.com/agent_answer" \
--data-urlencode "CallStatusCallbackUrl=http://example.com/agent_answer_status_callbac" \
--data-urlencode "CallAccept=true" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2014-05-14T10:50:02Z",
  "date_updated": "2014-05-15T16:03:42Z",
  "links": {
    "task": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "worker": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "workspace": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  },
  "reservation_status": "accepted",
  "sid": "WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "task_sid": "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Reservations/WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "worker_name": "Doug",
  "worker_sid": "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

#### POST Parameters \[#post-parameters-5]

| Field                 | Required? | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| --------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Instruction           | Yes       | `Call` ([🏢 not PII](/docs/glossary/what-is-personally-identifiable-information-pii#fields-marked-not-pii) )                                                                                                                                                                                                                                                                                                                                                                                                 |
| CallTo                | No        | The contact URI of the Worker. A phone number or client ID. Required if the worker's attributes do not include a `contact_uri` property. ([📇 PII](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) )                                                                                                                                                                                                                                                                              |
| CallFrom              | Yes       | The caller ID to use when placing the outbound call ([📇 PII](/docs/glossary/what-is-personally-identifiable-information-pii#pii-fields) )                                                                                                                                                                                                                                                                                                                                                                   |
| CallUrl               | Yes       | A valid TwiML URI that is executed on the answering Worker's leg. ([🏢 not PII](/docs/glossary/what-is-personally-identifiable-information-pii#fields-marked-not-pii) )                                                                                                                                                                                                                                                                                                                                      |
| CallAccept            | No        | If set to "true", the reservation will be accepted. Otherwise, a separate call to the REST API is responsible for moving the state to accept or reject. ([🏢 not PII](/docs/glossary/what-is-personally-identifiable-information-pii#fields-marked-not-pii) )                                                                                                                                                                                                                                                |
| CallRecord            | No        | The 'CallRecord' attribute lets you record both legs of a call. Set to "record-from-answer" to record the call from answer. Default to "do-not-record" which will not record the call. The RecordingUrl will be sent with DequeueStatusCallbackUrl. ([🏢 not PII](/docs/glossary/what-is-personally-identifiable-information-pii#fields-marked-not-pii) )                                                                                                                                                    |
| CallTimeout           | No        | The integer number of seconds that Twilio should allow the phone associated with `contact_uri` to ring before assuming there is no answer. Default is 60 seconds, the maximum is 999 seconds. Note, you could set this to a low value, such as 15, to hangup before reaching an answering machine or voicemail. ([🏢 not PII](/docs/glossary/what-is-personally-identifiable-information-pii#fields-marked-not-pii) )                                                                                        |
| CallStatusCallbackUrl | No        | A URL that Twilio will send asynchronous webhook requests to on completed call event. \*\*Note: TaskRouter sends "taskCallSid" as parameter with sid of the call that created the Task. This is very useful in the event a call to worker fails, where you could remove the original call from queue and send to voice mail or enqueue again with new workflow to route to different group of workers. ([🏢 not PII](/docs/glossary/what-is-personally-identifiable-information-pii#fields-marked-not-pii) ) |

**Note**: A property of `contact_uri` is required on the WorkerAttributes to indicate whom to call. See more information on this [here](/docs/taskrouter/api/worker).

Please see [issuing a Call Instruction](/docs/taskrouter/handle-assignment-callbacks#initiating-call) for more information.

### Redirect Instruction \[#redirect]

#### Example \[#example-7]

Redirect an Instruction

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateTaskReservation() {
  const reservation = await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .tasks("WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .reservations("WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update({
      instruction: "redirect",
      redirectCallSid: "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      redirectUrl: "http://example.com/assignment_redirect",
    });

  console.log(reservation.accountSid);
}

updateTaskReservation();
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

task_reservation = (
    client.taskrouter.v1.workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .tasks("WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .reservations("WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update(
        instruction="redirect",
        redirect_call_sid="CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        redirect_url="http://example.com/assignment_redirect",
    )
)

print(task_reservation.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Taskrouter.V1.Workspace.Task;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var reservation = await ReservationResource.UpdateAsync(
            instruction: "redirect",
            redirectCallSid: "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            redirectUrl: new Uri("http://example.com/assignment_redirect"),
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathTaskSid: "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(reservation.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.net.URI;
import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.task.Reservation;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Reservation reservation = Reservation
                                      .updater("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                                          "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                                          "WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                                      .setInstruction("redirect")
                                      .setRedirectCallSid("CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                                      .setRedirectUrl(URI.create("http://example.com/assignment_redirect"))
                                      .update();

        System.out.println(reservation.getAccountSid());
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

	params := &taskrouter.UpdateTaskReservationParams{}
	params.SetInstruction("redirect")
	params.SetRedirectCallSid("CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
	params.SetRedirectUrl("http://example.com/assignment_redirect")

	resp, err := client.TaskrouterV1.UpdateTaskReservation("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$task_reservation = $twilio->taskrouter->v1
    ->workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->tasks("WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->reservations("WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->update([
        "instruction" => "redirect",
        "redirectCallSid" => "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "redirectUrl" => "http://example.com/assignment_redirect",
    ]);

print $task_reservation->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

reservation = @client
              .taskrouter
              .v1
              .workspaces('WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              .tasks('WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              .reservations('WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              .update(
                instruction: 'redirect',
                redirect_call_sid: 'CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                redirect_url: 'http://example.com/assignment_redirect'
              )

puts reservation.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:tasks:reservations:update \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --task-sid WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --instruction redirect \
   --redirect-call-sid CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --redirect-url http://example.com/assignment_redirect
```

```bash
curl -X POST "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Reservations/WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
--data-urlencode "Instruction=redirect" \
--data-urlencode "RedirectCallSid=CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
--data-urlencode "RedirectUrl=http://example.com/assignment_redirect" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2014-05-14T10:50:02Z",
  "date_updated": "2014-05-15T16:03:42Z",
  "links": {
    "task": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "worker": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "workspace": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  },
  "reservation_status": "accepted",
  "sid": "WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "task_sid": "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Reservations/WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "worker_name": "Doug",
  "worker_sid": "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

#### POST Parameters \[#post-parameters-6]

| Field           | Required? | Description                                                                                                                                                                                                                                                                    |
| --------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Instruction     | Yes       | `Redirect` ([🏢 not PII](/docs/glossary/what-is-personally-identifiable-information-pii#fields-marked-not-pii) )                                                                                                                                                               |
| RedirectCallSid | Yes       | The Twilio call sid of the call which was parked in the queue(via enqueue for example). ([🏢 not PII](/docs/glossary/what-is-personally-identifiable-information-pii#fields-marked-not-pii) )                                                                                  |
| RedirectUrl     | Yes       | A valid TwiML URI to redirect the call to. ([🏢 not PII](/docs/glossary/what-is-personally-identifiable-information-pii#fields-marked-not-pii) )                                                                                                                               |
| RedirectAccept  | No        | Boolean. If true, the reservation will be accepted, otherwise, it is your application's responsibility to accept or reject the task at a later point. Defaults to false. ([🏢 not PII](/docs/glossary/what-is-personally-identifiable-information-pii#fields-marked-not-pii) ) |

Refer to [Redirect a call to a new TwiML document](/docs/taskrouter/handle-assignment-callbacks#redirecting-call) for more information.

### Reservations List Resource

#### Resource URI \[#resource-uri-3]

```bash
GET /v1/Workspaces/{WorkspaceSid}/Tasks/{TaskSid}/Reservations

```

Returns a representation of all the list of Reservations waiting for a Task identified by \{TaskSid}.

##### Example \[#example-8]

Retrieve all Reservations

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listTaskReservation() {
  const reservations = await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .tasks("WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .reservations.list({ limit: 20 });

  reservations.forEach((r) => console.log(r.accountSid));
}

listTaskReservation();
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

reservations = (
    client.taskrouter.v1.workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .tasks("WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .reservations.list(limit=20)
)

for record in reservations:
    print(record.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Taskrouter.V1.Workspace.Task;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var reservations = await ReservationResource.ReadAsync(
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathTaskSid: "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            limit: 20);

        foreach (var record in reservations) {
            Console.WriteLine(record.AccountSid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.task.Reservation;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Reservation> reservations =
            Reservation.reader("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                .limit(20)
                .read();

        for (Reservation record : reservations) {
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

	params := &taskrouter.ListTaskReservationParams{}
	params.SetLimit(20)

	resp, err := client.TaskrouterV1.ListTaskReservation("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$reservations = $twilio->taskrouter->v1
    ->workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->tasks("WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->reservations->read([], 20);

foreach ($reservations as $record) {
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

reservations = @client
               .taskrouter
               .v1
               .workspaces('WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
               .tasks('WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
               .reservations
               .list(limit: 20)

reservations.each do |record|
   puts record.account_sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:tasks:reservations:list \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --task-sid WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Reservations?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "meta": {
    "first_page_url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Reservations?PageSize=50&Page=0",
    "key": "reservations",
    "next_page_url": null,
    "page": 0,
    "page_size": 50,
    "previous_page_url": null,
    "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Reservations?PageSize=50&Page=0"
  },
  "reservations": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "date_created": "2014-05-14T10:50:02Z",
      "date_updated": "2014-05-15T16:03:42Z",
      "links": {
        "task": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "worker": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "workspace": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
      },
      "reservation_status": "accepted",
      "sid": "WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "task_sid": "WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Tasks/WTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Reservations/WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "worker_name": "Doug",
      "worker_sid": "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ]
}
```

#### List Filters

| Field             | Description                                                                    |
| ----------------- | ------------------------------------------------------------------------------ |
| WorkerSid         | Returns the list of reservations for a task for a specified worker             |
| ReservationStatus | Returns the list of reservations for a task with a specified ReservationStatus |
