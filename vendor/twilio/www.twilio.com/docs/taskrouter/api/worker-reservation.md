# Worker Reservation resource

## Overview

Worker Reservations represent the current and past reservations for a [Worker](/docs/taskrouter/api/worker). Current Reservations can be accepted using the Reservation instance resource.

## Reservation Properties

<OperationTable type="properties" data={{"type":"object","refName":"taskrouter.v1.workspace.worker.worker_reservation","modelName":"taskrouter_v1_workspace_worker_worker_reservation","properties":{"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the WorkerReservation resource."},"date_created":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was created specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"date_updated":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was last updated specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"reservation_status":{"type":"string","enum":["pending","accepted","rejected","timeout","canceled","rescinded","wrapping","completed"],"description":"The current status of the reservation. Can be: `pending`, `accepted`, `rejected`, `timeout`, `canceled`, or `rescinded`.","refName":"worker_reservation_enum_status","modelName":"worker_reservation_enum_status"},"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WR[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that we created to identify the WorkerReservation resource."},"task_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WT[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the reserved Task resource."},"worker_name":{"type":"string","nullable":true,"description":"The `friendly_name` of the Worker that is reserved."},"worker_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WK[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the reserved Worker resource."},"workspace_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the Workspace that this worker is contained within."},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the WorkerReservation resource."},"links":{"type":"object","format":"uri-map","nullable":true,"description":"The URLs of related resources."}}}} />

## Fetch a WorkerReservation resource

`GET https://taskrouter.twilio.com/v1/Workspaces/{WorkspaceSid}/Workers/{WorkerSid}/Reservations/{Sid}`

### Path parameters

```json
[{"name":"WorkspaceSid","in":"path","description":"The SID of the Workspace with the WorkerReservation resource to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$"},"required":true},{"name":"WorkerSid","in":"path","description":"The SID of the reserved Worker resource with the WorkerReservation resource to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WK[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The SID of the WorkerReservation resource to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WR[0-9a-fA-F]{32}$"},"required":true}]
```

Fetch a Worker Reservation

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchWorkerReservation() {
  const reservation = await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .workers("WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .reservations("WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch();

  console.log(reservation.accountSid);
}

fetchWorkerReservation();
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
    .workers("WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .reservations("WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch()
)

print(reservation.account_sid)
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

        var reservation = await ReservationResource.FetchAsync(
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathWorkerSid: "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(reservation.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.worker.Reservation;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Reservation reservation = Reservation
                                      .fetcher("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                                          "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

	resp, err := client.TaskrouterV1.FetchWorkerReservation("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
    ->workers("WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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
              .workers('WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              .reservations('WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              .fetch

puts reservation.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:workers:reservations:fetch \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --worker-sid WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Reservations/WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
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
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Reservations/WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "worker_name": "Doug",
  "worker_sid": "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

## Read multiple WorkerReservation resources

`GET https://taskrouter.twilio.com/v1/Workspaces/{WorkspaceSid}/Workers/{WorkerSid}/Reservations`

### Path parameters

```json
[{"name":"WorkspaceSid","in":"path","description":"The SID of the Workspace with the WorkerReservation resources to read.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$"},"required":true},{"name":"WorkerSid","in":"path","description":"The SID of the reserved Worker resource with the WorkerReservation resources to read.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WK[0-9a-fA-F]{32}$"},"required":true}]
```

### Query parameters

```json
[{"name":"ReservationStatus","in":"query","description":"Returns the list of reservations for a worker with a specified ReservationStatus. Can be: `pending`, `accepted`, `rejected`, `timeout`, `canceled`, or `rescinded`.","schema":{"type":"string","enum":["pending","accepted","rejected","timeout","canceled","rescinded","wrapping","completed"],"description":"The current status of the reservation. Can be: `pending`, `accepted`, `rejected`, `timeout`, `canceled`, or `rescinded`.","refName":"worker_reservation_enum_status","modelName":"worker_reservation_enum_status"}},{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

List multiple Worker Reservations

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listWorkerReservation() {
  const reservations = await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .workers("WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .reservations.list({ limit: 20 });

  reservations.forEach((r) => console.log(r.accountSid));
}

listWorkerReservation();
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
    .workers("WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .reservations.list(limit=20)
)

for record in reservations:
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

        var reservations = await ReservationResource.ReadAsync(
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathWorkerSid: "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
import com.twilio.rest.taskrouter.v1.workspace.worker.Reservation;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Reservation> reservations =
            Reservation.reader("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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

	params := &taskrouter.ListWorkerReservationParams{}
	params.SetLimit(20)

	resp, err := client.TaskrouterV1.ListWorkerReservation("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$reservations = $twilio->taskrouter->v1
    ->workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->workers("WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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
               .workers('WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
               .reservations
               .list(limit: 20)

reservations.each do |record|
   puts record.account_sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:workers:reservations:list \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --worker-sid WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Reservations?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "meta": {
    "first_page_url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Reservations?PageSize=50&Page=0",
    "key": "reservations",
    "next_page_url": null,
    "page": 0,
    "page_size": 50,
    "previous_page_url": null,
    "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Reservations?PageSize=50&Page=0"
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
      "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Reservations/WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "worker_name": "Doug",
      "worker_sid": "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ]
}
```

## Update a WorkerReservation resource

`POST https://taskrouter.twilio.com/v1/Workspaces/{WorkspaceSid}/Workers/{WorkerSid}/Reservations/{Sid}`

To indicate that a Worker has accepted or rejected a Reservation, you make an `HTTP POST` request to a Reservation instance resource URI.

You can issue a simple Accept or Reject request. You can also issue an Instruction, like Dequeueing or Calling, similar to [Responding to an Assignment Callback.](/docs/taskrouter/handle-assignment-callbacks)

> \[!WARNING]
>
> Tasks are automatically canceled after 10 rejections. To learn more, see [Manually accepting or rejecting a reservation](/docs/taskrouter/handle-assignment-callbacks)

### Headers

```json
[{"name":"If-Match","in":"header","description":"The If-Match HTTP request header","schema":{"type":"string"}}]
```

### Path parameters

```json
[{"name":"WorkspaceSid","in":"path","description":"The SID of the Workspace with the WorkerReservation resources to update.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$"},"required":true},{"name":"WorkerSid","in":"path","description":"The SID of the reserved Worker resource with the WorkerReservation resources to update.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WK[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The SID of the WorkerReservation resource to update.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WR[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"UpdateWorkerReservationRequest","properties":{"ReservationStatus":{"type":"string","enum":["pending","accepted","rejected","timeout","canceled","rescinded","wrapping","completed"],"description":"The current status of the reservation. Can be: `pending`, `accepted`, `rejected`, `timeout`, `canceled`, or `rescinded`.","refName":"worker_reservation_enum_status","modelName":"worker_reservation_enum_status"},"WorkerActivitySid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WA[0-9a-fA-F]{32}$","description":"The new worker activity SID if rejecting a reservation."},"Instruction":{"type":"string","description":"The assignment instruction for the reservation."},"DequeuePostWorkActivitySid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WA[0-9a-fA-F]{32}$","description":"The SID of the Activity resource to start after executing a Dequeue instruction."},"DequeueFrom":{"type":"string","description":"The caller ID of the call to the worker when executing a Dequeue instruction."},"DequeueRecord":{"type":"string","description":"Whether to record both legs of a call when executing a Dequeue instruction or which leg to record."},"DequeueTimeout":{"type":"integer","description":"The timeout for call when executing a Dequeue instruction."},"DequeueTo":{"type":"string","description":"The contact URI of the worker when executing a Dequeue instruction. Can be the URI of the Twilio Client, the SIP URI for Programmable SIP, or the [E.164](https://www.twilio.com/docs/glossary/what-e164) formatted phone number, depending on the destination."},"DequeueStatusCallbackUrl":{"type":"string","format":"uri","description":"The callback URL for completed call event when executing a Dequeue instruction."},"CallFrom":{"type":"string","description":"The Caller ID of the outbound call when executing a Call instruction."},"CallRecord":{"type":"string","description":"Whether to record both legs of a call when executing a Call instruction."},"CallTimeout":{"type":"integer","description":"The timeout for a call when executing a Call instruction."},"CallTo":{"type":"string","description":"The contact URI of the worker when executing a Call instruction. Can be the URI of the Twilio Client, the SIP URI for Programmable SIP, or the [E.164](https://www.twilio.com/docs/glossary/what-e164) formatted phone number, depending on the destination."},"CallUrl":{"type":"string","format":"uri","description":"TwiML URI executed on answering the worker's leg as a result of the Call instruction."},"CallStatusCallbackUrl":{"type":"string","format":"uri","description":"The URL to call for the completed call event when executing a Call instruction."},"CallAccept":{"type":"boolean","description":"Whether to accept a reservation when executing a Call instruction."},"RedirectCallSid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^CA[0-9a-fA-F]{32}$","description":"The Call SID of the call parked in the queue when executing a Redirect instruction."},"RedirectAccept":{"type":"boolean","description":"Whether the reservation should be accepted when executing a Redirect instruction."},"RedirectUrl":{"type":"string","format":"uri","description":"TwiML URI to redirect the call to when executing the Redirect instruction."},"To":{"type":"string","description":"The Contact URI of the worker when executing a Conference instruction. Can be the URI of the Twilio Client, the SIP URI for Programmable SIP, or the [E.164](https://www.twilio.com/docs/glossary/what-e164) formatted phone number, depending on the destination."},"From":{"type":"string","description":"The caller ID of the call to the worker when executing a Conference instruction."},"StatusCallback":{"type":"string","format":"uri","description":"The URL we should call using the `status_callback_method` to send status information to your application."},"StatusCallbackMethod":{"type":"string","format":"http-method","enum":["GET","POST"],"description":"The HTTP method we should use to call `status_callback`. Can be: `POST` or `GET` and the default is `POST`."},"StatusCallbackEvent":{"type":"array","description":"The call progress events that we will send to `status_callback`. Can be: `initiated`, `ringing`, `answered`, or `completed`.","items":{"type":"string","enum":["initiated","ringing","answered","completed"],"refName":"worker_reservation_enum_call_status","modelName":"worker_reservation_enum_call_status"}},"Timeout":{"type":"integer","description":"The timeout for a call when executing a Conference instruction."},"Record":{"type":"boolean","description":"Whether to record the participant and their conferences, including the time between conferences. Can be `true` or `false` and the default is `false`."},"Muted":{"type":"boolean","description":"Whether the agent is muted in the conference. Defaults to `false`."},"Beep":{"type":"string","description":"Whether to play a notification beep when the participant joins or when to play a beep. Can be: `true`, `false`, `onEnter`, or `onExit`. The default value is `true`."},"StartConferenceOnEnter":{"type":"boolean","description":"Whether to start the conference when the participant joins, if it has not already started. Can be: `true` or `false` and the default is `true`. If `false` and the conference has not started, the participant is muted and hears background music until another participant starts the conference."},"EndConferenceOnExit":{"type":"boolean","description":"Whether to end the conference when the agent leaves."},"WaitUrl":{"type":"string","format":"uri","description":"The URL we should call using the `wait_method` for the music to play while participants are waiting for the conference to start. The default value is the URL of our standard hold music. [Learn more about hold music](https://www.twilio.com/labs/twimlets/holdmusic)."},"WaitMethod":{"type":"string","format":"http-method","enum":["GET","POST"],"description":"The HTTP method we should use to call `wait_url`. Can be `GET` or `POST` and the default is `POST`. When using a static audio file, this should be `GET` so that we can cache the file."},"EarlyMedia":{"type":"boolean","description":"Whether to allow an agent to hear the state of the outbound call, including ringing or disconnect messages. The default is `true`."},"MaxParticipants":{"type":"integer","description":"The maximum number of participants allowed in the conference. Can be a positive integer from `2` to `250`. The default value is `250`."},"ConferenceStatusCallback":{"type":"string","format":"uri","description":"The URL we should call using the `conference_status_callback_method` when the conference events in `conference_status_callback_event` occur. Only the value set by the first participant to join the conference is used. Subsequent `conference_status_callback` values are ignored."},"ConferenceStatusCallbackMethod":{"type":"string","format":"http-method","enum":["GET","POST"],"description":"The HTTP method we should use to call `conference_status_callback`. Can be: `GET` or `POST` and defaults to `POST`."},"ConferenceStatusCallbackEvent":{"type":"array","description":"The conference status events that we will send to `conference_status_callback`. Can be: `start`, `end`, `join`, `leave`, `mute`, `hold`, `speaker`.","items":{"type":"string","enum":["start","end","join","leave","mute","hold","speaker"],"refName":"worker_reservation_enum_conference_event","modelName":"worker_reservation_enum_conference_event"}},"ConferenceRecord":{"type":"string","description":"Whether to record the conference the participant is joining or when to record the conference. Can be: `true`, `false`, `record-from-start`, and `do-not-record`. The default value is `false`."},"ConferenceTrim":{"type":"string","description":"Whether to trim leading and trailing silence from your recorded conference audio files. Can be: `trim-silence` or `do-not-trim` and defaults to `trim-silence`."},"RecordingChannels":{"type":"string","description":"The recording channels for the final recording. Can be: `mono` or `dual` and the default is `mono`."},"RecordingStatusCallback":{"type":"string","format":"uri","description":"The URL that we should call using the `recording_status_callback_method` when the recording status changes."},"RecordingStatusCallbackMethod":{"type":"string","format":"http-method","enum":["GET","POST"],"description":"The HTTP method we should use when we call `recording_status_callback`. Can be: `GET` or `POST` and defaults to `POST`."},"ConferenceRecordingStatusCallback":{"type":"string","format":"uri","description":"The URL we should call using the `conference_recording_status_callback_method` when the conference recording is available."},"ConferenceRecordingStatusCallbackMethod":{"type":"string","format":"http-method","enum":["GET","POST"],"description":"The HTTP method we should use to call `conference_recording_status_callback`. Can be: `GET` or `POST` and defaults to `POST`."},"Region":{"type":"string","description":"The [region](https://support.twilio.com/hc/en-us/articles/223132167-How-global-low-latency-routing-and-region-selection-work-for-conferences-and-Client-calls) where we should mix the recorded audio. Can be:`us1`, `us2`, `ie1`, `de1`, `sg1`, `br1`, `au1`, or `jp1`."},"SipAuthUsername":{"type":"string","description":"The SIP username used for authentication."},"SipAuthPassword":{"type":"string","description":"The SIP password for authentication."},"DequeueStatusCallbackEvent":{"type":"array","description":"The call progress events sent via webhooks as a result of a Dequeue instruction.","items":{"type":"string"}},"PostWorkActivitySid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WA[0-9a-fA-F]{32}$","description":"The new worker activity SID after executing a Conference instruction."},"EndConferenceOnCustomerExit":{"type":"boolean","description":"Whether to end the conference when the customer leaves."},"BeepOnCustomerEntrance":{"type":"boolean","description":"Whether to play a notification beep when the customer joins."},"JitterBufferSize":{"type":"string","description":"The jitter buffer size for conference. Can be: `small`, `medium`, `large`, `off`."}}},"examples":{"update":{"value":{"lang":"json","value":"{\n  \"ReservationStatus\": \"accepted\"\n}","meta":"","code":"{\n  \"ReservationStatus\": \"accepted\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"ReservationStatus\"","#7EE787"],[":","#C9D1D9"]," ",["\"accepted\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Accept a Reservation

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateWorkerReservation() {
  const reservation = await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .workers("WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .reservations("WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update({ reservationStatus: "accepted" });

  console.log(reservation.accountSid);
}

updateWorkerReservation();
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

worker_reservation = (
    client.taskrouter.v1.workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .workers("WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .reservations("WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update(reservation_status="accepted")
)

print(worker_reservation.account_sid)
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

        var reservation = await ReservationResource.UpdateAsync(
            reservationStatus: ReservationResource.StatusEnum.Accepted,
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathWorkerSid: "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(reservation.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.worker.Reservation;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Reservation reservation = Reservation
                                      .updater("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                                          "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

	params := &taskrouter.UpdateWorkerReservationParams{}
	params.SetReservationStatus("accepted")

	resp, err := client.TaskrouterV1.UpdateWorkerReservation("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$worker_reservation = $twilio->taskrouter->v1
    ->workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->workers("WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->reservations("WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->update(["reservationStatus" => "accepted"]);

print $worker_reservation->accountSid;
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
              .workers('WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              .reservations('WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              .update(reservation_status: 'accepted')

puts reservation.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:workers:reservations:update \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --worker-sid WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --reservation-status accepted
```

```bash
curl -X POST "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Reservations/WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
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
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Reservations/WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "worker_name": "Doug",
  "worker_sid": "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

Reject a Reservation

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateWorkerReservation() {
  const reservation = await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .workers("WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .reservations("WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update({ reservationStatus: "rejected" });

  console.log(reservation.accountSid);
}

updateWorkerReservation();
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

worker_reservation = (
    client.taskrouter.v1.workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .workers("WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .reservations("WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update(reservation_status="rejected")
)

print(worker_reservation.account_sid)
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

        var reservation = await ReservationResource.UpdateAsync(
            reservationStatus: ReservationResource.StatusEnum.Rejected,
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathWorkerSid: "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(reservation.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.worker.Reservation;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Reservation reservation = Reservation
                                      .updater("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                                          "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

	params := &taskrouter.UpdateWorkerReservationParams{}
	params.SetReservationStatus("rejected")

	resp, err := client.TaskrouterV1.UpdateWorkerReservation("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$worker_reservation = $twilio->taskrouter->v1
    ->workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->workers("WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->reservations("WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->update(["reservationStatus" => "rejected"]);

print $worker_reservation->accountSid;
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
              .workers('WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              .reservations('WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              .update(reservation_status: 'rejected')

puts reservation.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:workers:reservations:update \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --worker-sid WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --reservation-status rejected
```

```bash
curl -X POST "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Reservations/WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
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
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Reservations/WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "worker_name": "Doug",
  "worker_sid": "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

Dequeue a Reservation

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateWorkerReservation() {
  const reservation = await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .workers("WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .reservations("WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update({
      dequeueFrom: "+18001231234",
      instruction: "dequeue",
    });

  console.log(reservation.accountSid);
}

updateWorkerReservation();
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

worker_reservation = (
    client.taskrouter.v1.workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .workers("WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .reservations("WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update(instruction="dequeue", dequeue_from="+18001231234")
)

print(worker_reservation.account_sid)
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

        var reservation = await ReservationResource.UpdateAsync(
            instruction: "dequeue",
            dequeueFrom: "+18001231234",
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathWorkerSid: "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(reservation.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.worker.Reservation;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Reservation reservation = Reservation
                                      .updater("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                                          "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

	params := &taskrouter.UpdateWorkerReservationParams{}
	params.SetInstruction("dequeue")
	params.SetDequeueFrom("+18001231234")

	resp, err := client.TaskrouterV1.UpdateWorkerReservation("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$worker_reservation = $twilio->taskrouter->v1
    ->workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->workers("WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->reservations("WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->update([
        "instruction" => "dequeue",
        "dequeueFrom" => "+18001231234",
    ]);

print $worker_reservation->accountSid;
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
              .workers('WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              .reservations('WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              .update(
                instruction: 'dequeue',
                dequeue_from: '+18001231234'
              )

puts reservation.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:workers:reservations:update \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --worker-sid WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --instruction dequeue \
   --dequeue-from +18001231234
```

```bash
curl -X POST "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Reservations/WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
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
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Reservations/WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "worker_name": "Doug",
  "worker_sid": "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

Call a Reservation

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateWorkerReservation() {
  const reservation = await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .workers("WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .reservations("WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update({
      callAccept: true,
      callFrom: "+15558675310",
      callStatusCallbackUrl: "http://example.com/agent_answer_status_callback",
      callUrl: "http://example.com/agent_answer",
      instruction: "call",
    });

  console.log(reservation.accountSid);
}

updateWorkerReservation();
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

worker_reservation = (
    client.taskrouter.v1.workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .workers("WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .reservations("WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update(
        instruction="call",
        call_from="+15558675310",
        call_url="http://example.com/agent_answer",
        call_status_callback_url="http://example.com/agent_answer_status_callback",
        call_accept=True,
    )
)

print(worker_reservation.account_sid)
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

        var reservation = await ReservationResource.UpdateAsync(
            instruction: "call",
            callFrom: "+15558675310",
            callUrl: new Uri("http://example.com/agent_answer"),
            callStatusCallbackUrl: new Uri("http://example.com/agent_answer_status_callback"),
            callAccept: true,
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathWorkerSid: "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(reservation.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.net.URI;
import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.worker.Reservation;

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
                    "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                    "WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                .setInstruction("call")
                .setCallFrom("+15558675310")
                .setCallUrl(URI.create("http://example.com/agent_answer"))
                .setCallStatusCallbackUrl(URI.create("http://example.com/agent_answer_status_callback"))
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

	params := &taskrouter.UpdateWorkerReservationParams{}
	params.SetInstruction("call")
	params.SetCallFrom("+15558675310")
	params.SetCallUrl("http://example.com/agent_answer")
	params.SetCallStatusCallbackUrl("http://example.com/agent_answer_status_callback")
	params.SetCallAccept(true)

	resp, err := client.TaskrouterV1.UpdateWorkerReservation("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$worker_reservation = $twilio->taskrouter->v1
    ->workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->workers("WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->reservations("WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->update([
        "instruction" => "call",
        "callFrom" => "+15558675310",
        "callUrl" => "http://example.com/agent_answer",
        "callStatusCallbackUrl" =>
            "http://example.com/agent_answer_status_callback",
        "callAccept" => true,
    ]);

print $worker_reservation->accountSid;
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
              .workers('WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              .reservations('WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
              .update(
                instruction: 'call',
                call_from: '+15558675310',
                call_url: 'http://example.com/agent_answer',
                call_status_callback_url: 'http://example.com/agent_answer_status_callback',
                call_accept: true
              )

puts reservation.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:workers:reservations:update \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --worker-sid WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --instruction call \
   --call-from +15558675310 \
   --call-url http://example.com/agent_answer \
   --call-status-callback-url http://example.com/agent_answer_status_callback \
   --call-accept
```

```bash
curl -X POST "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Reservations/WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
--data-urlencode "Instruction=call" \
--data-urlencode "CallFrom=+15558675310" \
--data-urlencode "CallUrl=http://example.com/agent_answer" \
--data-urlencode "CallStatusCallbackUrl=http://example.com/agent_answer_status_callback" \
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
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Workers/WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Reservations/WRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "worker_name": "Doug",
  "worker_sid": "WKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```
