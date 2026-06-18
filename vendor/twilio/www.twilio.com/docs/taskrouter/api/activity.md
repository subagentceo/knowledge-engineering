# Activity Resource

Activities describe the current status of your Workers, which determines whether they are eligible to receive task assignments. Workers are always set to a single Activity.

> \[!NOTE]
>
> TaskRouter pre-populates new Workspaces with "Offline", "Unavailable", and "Available" Activities. Add your own Activities to the list to get a more granular understanding of the way your Workers are spending their time!

Each Activity has:

A **FriendlyName**, which describes the Worker's state in human-readable terms, and

An **Availability**, which is a Boolean that determines whether Workers are available for task assignment. The value cannot be changed after the Activity is created.

If a Worker is performing an Activity that has an availability of "true", it means that Worker is ready to have Tasks assigned to it. If a Worker is set to an Activity with an availability of "false", it means the Worker is not able to accept new Tasks and will not be considered for assignment.

By moving Workers from unavailable to available Activities you signal to TaskRouter that the Worker can be assigned new Tasks. When TaskRouter assigns the Worker a Task, it will automatically move the Worker to an unavailable Activity, so that the Worker is not assigned new Tasks while they are occupied. On completion of their work, the Worker can be moved to an available Activity to begin accepting new Tasks again.

## Configuring Default Activities for Worker State Transitions

The current Activity for a given Worker is changed in the following operations:

* Your application can [update a Worker's Activity](/docs/taskrouter/api/worker) by posting to the Worker instance resource and providing the SID if any of the Activities in the Workspace.
* If a Reservation times out, the Worker is placed in the `TimeoutActivity` identified by the Workspace. By default this is `Offline`.
* When a new Worker is created, the Worker is placed in the `DefaultActivity` identified by the Workspace, unless a specific ActivitySid is passed. By default, this is `Offline`.

In addition, a single-tasking Workspace supports two additional automatic state transitions:

* When the Worker is assigned a Task, the Worker is placed in the `ReservationActivity`identified by the TaskQueue that assigns the Worker the Task. By default this is the `Reserved` Activity.
* When a Worker accepts a Task, the Worker is placed in the `AssignmentActivity` identified by the TaskQueue that assigns the Worker the Task. By default this is the `Busy` Activity.

In a multitasking Workspace, a Worker's state does not automatically update when a Task is assigned or accepted.

## Activity Properties

> \[!WARNING]
>
> Don't use the `page` query parameter with this resource. Pagination isn't supported.

<OperationTable type="properties" data={{"type":"object","refName":"taskrouter.v1.workspace.activity","modelName":"taskrouter_v1_workspace_activity","properties":{"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Activity resource."},"available":{"type":"boolean","nullable":true,"description":"Whether the Worker is eligible to receive a Task when it occupies the Activity. A value of `true`, `1`, or `yes` indicates the Activity is available. All other values indicate that it is not. The value cannot be changed after the Activity is created."},"date_created":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was created specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"date_updated":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was last updated specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"friendly_name":{"type":"string","nullable":true,"description":"The string that you assigned to describe the Activity resource."},"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WA[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that we created to identify the Activity resource."},"workspace_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the Workspace that contains the Activity."},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the Activity resource."},"links":{"type":"object","format":"uri-map","nullable":true}}}} />

## Create an Activity resource

`POST https://taskrouter.twilio.com/v1/Workspaces/{WorkspaceSid}/Activities`

> \[!NOTE]
>
> The maximum amount of Activities allowed for any given Workspace is 100.

### Path parameters

```json
[{"name":"WorkspaceSid","in":"path","description":"The SID of the Workspace that the new Activity belongs to.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"CreateActivityRequest","required":["FriendlyName"],"properties":{"FriendlyName":{"type":"string","description":"A descriptive string that you create to describe the Activity resource. It can be up to 64 characters long. These names are used to calculate and expose statistics about Workers, and provide visibility into the state of each Worker. Examples of friendly names include: `on-call`, `break`, and `email`."},"Available":{"type":"boolean","description":"Whether the Worker should be eligible to receive a Task when it occupies the Activity. A value of `true`, `1`, or `yes` specifies the Activity is available. All other values specify that it is not. The value cannot be changed after the Activity is created."}}},"examples":{"create":{"value":{"lang":"json","value":"{\n  \"Available\": \"true\",\n  \"FriendlyName\": \"friendly_name\"\n}","meta":"","code":"{\n  \"Available\": \"true\",\n  \"FriendlyName\": \"friendly_name\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Available\"","#7EE787"],[":","#C9D1D9"]," ",["\"true\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"friendly_name\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Create a new Activity

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createActivity() {
  const activity = await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .activities.create({
      available: true,
      friendlyName: "NewAvailableActivity",
    });

  console.log(activity.accountSid);
}

createActivity();
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

activity = client.taskrouter.v1.workspaces(
    "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).activities.create(friendly_name="NewAvailableActivity", available=True)

print(activity.account_sid)
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

        var activity = await ActivityResource.CreateAsync(
            friendlyName: "NewAvailableActivity",
            available: true,
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(activity.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.Activity;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Activity activity =
            Activity.creator("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "NewAvailableActivity").setAvailable(true).create();

        System.out.println(activity.getAccountSid());
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

	params := &taskrouter.CreateActivityParams{}
	params.SetFriendlyName("NewAvailableActivity")
	params.SetAvailable(true)

	resp, err := client.TaskrouterV1.CreateActivity("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$activity = $twilio->taskrouter->v1
    ->workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->activities->create(
        "NewAvailableActivity", // FriendlyName
        ["available" => true]
    );

print $activity->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

activity = @client
           .taskrouter
           .v1
           .workspaces('WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
           .activities
           .create(
             friendly_name: 'NewAvailableActivity',
             available: true
           )

puts activity.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:activities:create \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --friendly-name NewAvailableActivity \
   --available
```

```bash
curl -X POST "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Activities" \
--data-urlencode "FriendlyName=NewAvailableActivity" \
--data-urlencode "Available=true" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "available": true,
  "date_created": "2014-05-14T10:50:02Z",
  "date_updated": "2014-05-14T23:26:06Z",
  "friendly_name": "NewAvailableActivity",
  "sid": "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Activities/WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "workspace": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  }
}
```

## Fetch an Activity resource

`GET https://taskrouter.twilio.com/v1/Workspaces/{WorkspaceSid}/Activities/{Sid}`

### Path parameters

```json
[{"name":"WorkspaceSid","in":"path","description":"The SID of the Workspace with the Activity resources to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The SID of the Activity resource to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WA[0-9a-fA-F]{32}$"},"required":true}]
```

Fetch an Activity

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchActivity() {
  const activity = await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .activities("WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch();

  console.log(activity.accountSid);
}

fetchActivity();
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

activity = (
    client.taskrouter.v1.workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .activities("WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch()
)

print(activity.account_sid)
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

        var activity = await ActivityResource.FetchAsync(
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(activity.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.Activity;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Activity activity =
            Activity.fetcher("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").fetch();

        System.out.println(activity.getAccountSid());
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

	resp, err := client.TaskrouterV1.FetchActivity("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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

$activity = $twilio->taskrouter->v1
    ->workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->activities("WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->fetch();

print $activity->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

activity = @client
           .taskrouter
           .v1
           .workspaces('WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
           .activities('WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
           .fetch

puts activity.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:activities:fetch \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Activities/WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "available": true,
  "date_created": "2014-05-14T10:50:02Z",
  "date_updated": "2014-05-14T23:26:06Z",
  "friendly_name": "New Activity",
  "sid": "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Activities/WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "workspace": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  }
}
```

## Read multiple Activity resources

`GET https://taskrouter.twilio.com/v1/Workspaces/{WorkspaceSid}/Activities`

> \[!NOTE]
>
> By default, this will return the first 50 Activities. Supply a PageSize parameter to fetch more than 50 Activities. See [paging](/docs/usage/twilios-response) for more information.

### Path parameters

```json
[{"name":"WorkspaceSid","in":"path","description":"The SID of the Workspace with the Activity resources to read.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$"},"required":true}]
```

### Query parameters

```json
[{"name":"FriendlyName","in":"query","description":"The `friendly_name` of the Activity resources to read.","schema":{"type":"string"},"examples":{"readFull":{"value":"friendly_name"},"readEmpty":{"value":"friendly_name"}}},{"name":"Available","in":"query","description":"Whether return only Activity resources that are available or unavailable. A value of `true` returns only available activities. Values of '1' or `yes` also indicate `true`. All other values represent `false` and return activities that are unavailable.","schema":{"type":"string"},"examples":{"readFull":{"value":"true"},"readEmpty":{"value":"true"}}},{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

List multiple Activitys

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listActivity() {
  const activities = await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .activities.list({ limit: 20 });

  activities.forEach((a) => console.log(a.accountSid));
}

listActivity();
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

activities = client.taskrouter.v1.workspaces(
    "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).activities.list(limit=20)

for record in activities:
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

        var activities = await ActivityResource.ReadAsync(
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", limit: 20);

        foreach (var record in activities) {
            Console.WriteLine(record.AccountSid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.Activity;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Activity> activities = Activity.reader("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").limit(20).read();

        for (Activity record : activities) {
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

	params := &taskrouter.ListActivityParams{}
	params.SetLimit(20)

	resp, err := client.TaskrouterV1.ListActivity("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$activities = $twilio->taskrouter->v1
    ->workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->activities->read([], 20);

foreach ($activities as $record) {
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

activities = @client
             .taskrouter
             .v1
             .workspaces('WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
             .activities
             .list(limit: 20)

activities.each do |record|
   puts record.account_sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:activities:list \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Activities?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "activities": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "available": true,
      "date_created": "2014-05-14T10:50:02Z",
      "date_updated": "2014-05-14T23:26:06Z",
      "friendly_name": "New Activity",
      "sid": "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Activities/WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "links": {
        "workspace": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
      }
    }
  ],
  "meta": {
    "first_page_url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Activities?Available=true&FriendlyName=friendly_name&PageSize=50&Page=0",
    "key": "activities",
    "next_page_url": null,
    "page": 0,
    "page_size": 50,
    "previous_page_url": null,
    "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Activities?Available=true&FriendlyName=friendly_name&PageSize=50&Page=0"
  }
}
```

## Update an Activity resource

`POST https://taskrouter.twilio.com/v1/Workspaces/{WorkspaceSid}/Activities/{Sid}`

### Path parameters

```json
[{"name":"WorkspaceSid","in":"path","description":"The SID of the Workspace with the Activity resources to update.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The SID of the Activity resource to update.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WA[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"UpdateActivityRequest","properties":{"FriendlyName":{"type":"string","description":"A descriptive string that you create to describe the Activity resource. It can be up to 64 characters long. These names are used to calculate and expose statistics about Workers, and provide visibility into the state of each Worker. Examples of friendly names include: `on-call`, `break`, and `email`."}}},"examples":{"update":{"value":{"lang":"json","value":"{\n  \"FriendlyName\": \"friendly_name\"\n}","meta":"","code":"{\n  \"FriendlyName\": \"friendly_name\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"friendly_name\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Update an Activity

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateActivity() {
  const activity = await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .activities("WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update({ friendlyName: "another_name" });

  console.log(activity.accountSid);
}

updateActivity();
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

activity = (
    client.taskrouter.v1.workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .activities("WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update(friendly_name="another_name")
)

print(activity.account_sid)
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

        var activity = await ActivityResource.UpdateAsync(
            friendlyName: "another_name",
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(activity.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.Activity;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Activity activity = Activity.updater("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                                .setFriendlyName("another_name")
                                .update();

        System.out.println(activity.getAccountSid());
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

	params := &taskrouter.UpdateActivityParams{}
	params.SetFriendlyName("another_name")

	resp, err := client.TaskrouterV1.UpdateActivity("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$activity = $twilio->taskrouter->v1
    ->workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->activities("WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->update(["friendlyName" => "another_name"]);

print $activity->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

activity = @client
           .taskrouter
           .v1
           .workspaces('WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
           .activities('WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
           .update(friendly_name: 'another_name')

puts activity.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:activities:update \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --friendly-name another_name
```

```bash
curl -X POST "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Activities/WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
--data-urlencode "FriendlyName=another_name" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "available": true,
  "date_created": "2014-05-14T10:50:02Z",
  "date_updated": "2014-05-14T23:26:06Z",
  "friendly_name": "another_name",
  "sid": "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Activities/WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "workspace_sid": "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "workspace": "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  }
}
```

## Delete an Activity resource

`DELETE https://taskrouter.twilio.com/v1/Workspaces/{WorkspaceSid}/Activities/{Sid}`

### Path parameters

```json
[{"name":"WorkspaceSid","in":"path","description":"The SID of the Workspace with the Activity resources to delete.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WS[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The SID of the Activity resource to delete.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^WA[0-9a-fA-F]{32}$"},"required":true}]
```

Delete an Activity

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function deleteActivity() {
  await client.taskrouter.v1
    .workspaces("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .activities("WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .remove();
}

deleteActivity();
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
).activities("WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete()
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

        await ActivityResource.DeleteAsync(
            pathWorkspaceSid: "WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.taskrouter.v1.workspace.Activity;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Activity.deleter("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete();
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

	err := client.TaskrouterV1.DeleteActivity("WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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
    ->activities("WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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
  .activities('WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  .delete
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:taskrouter:v1:workspaces:activities:remove \
   --workspace-sid WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X DELETE "https://taskrouter.twilio.com/v1/Workspaces/WSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Activities/WAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```
