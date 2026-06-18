# Monitor Events resource

The Events resource provides comprehensive event-logging and change-tracking for Twilio resources.

**For example**: Events log when you provision a phone number, change your account's security settings, delete a recording, and so on. Events log virtually every action taken within Twilio, regardless of whether that action was taken through the API, by a user in the Twilio Console, or even by a Twilio employee.

The Events REST resource provides an API to retrieve this event-log. Each Event is like a log entry that captures:

* The type of event.
* The resource that the event relates to.
* The actor that caused the event to happen.
* The originating source for the event, including its IP address.
* Any related event data (like what properties were changed).

Events work at any scale and across all Twilio products. They can be an instrumental tool in giving you full visibility into your Twilio applications.
The API can be used to retrieve your event log and push it into the log aggregation or SIEM solution of your choice.

Customers who buy Administration, Security or Enterprise Edition packages have access to 13 months of data while customers using free version can access 30 days of data.

## Event Properties

<OperationTable type="properties" data={{"type":"object","refName":"monitor.v1.event","modelName":"monitor_v1_event","properties":{"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Event resource."},"actor_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^US[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the actor that caused the event, if available. This can be either a User ID (matching the pattern `^US[0-9a-fA-F]{32}$`) or an Account SID (matching the pattern `^AC[0-9a-fA-F]{32}$`). If the actor's SID isn't available, this field will be `null`."},"actor_type":{"type":"string","nullable":true,"description":"The type of actor that caused the event. Can be: `user` for a change made by a logged-in user in the Twilio Console, `account` for an event caused by an API request by an authenticating Account, `twilio-admin` for an event caused by a Twilio employee, and so on."},"description":{"type":"string","nullable":true,"description":"A description of the event. Can be `null`."},"event_data":{"nullable":true,"description":"An object with additional data about the event. The  contents depend on `event_type`. For example, event-types of the form `RESOURCE.updated`, this value contains a `resource_properties` dictionary that describes the previous and updated properties of the resource."},"event_date":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the event was recorded specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"event_type":{"type":"string","nullable":true,"description":"The event's type. Event-types are typically in the form: `RESOURCE_TYPE.ACTION`, where `RESOURCE_TYPE` is the type of resource that was affected and `ACTION` is what happened to it. For example, `phone-number.created`. For a full list of all event-types, see the [Monitor Event Types](https://www.twilio.com/docs/usage/monitor-events#event-types)."},"resource_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^[a-zA-Z]{2}[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the resource that was affected."},"resource_type":{"type":"string","nullable":true,"description":"The type of resource that was affected. For a full list of all resource-types, see the [Monitor Event Types](https://www.twilio.com/docs/usage/monitor-events#event-types)."},"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AE[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that we created to identify the Event resource."},"source":{"type":"string","nullable":true,"description":"The originating system or interface that caused the event.  Can be: `web` for events caused by user action in the Twilio Console, `api` for events caused by a request to our API, or   `twilio` for events caused by an automated or internal Twilio system."},"source_ip_address":{"type":"string","nullable":true,"description":"The IP address of the source, if the source is outside the Twilio cloud. This value is `null` for events with `source` of `twilio`"},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the resource that was affected. Can be `null`."},"links":{"type":"object","format":"uri-map","nullable":true,"description":"The absolute URLs of related resources."}}}} />

These fields make it easy to build Event notifications or list
pages. For example, you can display human-readable strings like "On
\{\`event\_date\`}, a \{\`event\_type\`} event was generated for resource
\{\`resource\_type\`} via \{\`source\`} by \{\`actor\_type\`} \{\`actor\_sid\`} from
\{\`source\_ip\_address\`}".

## Sources, Actor-Types, and Actor-Sids

Sources, actor-types, and actor-sids are closely interrelated. They
all help to indicate who or what caused the event, and from where.
Here's a table describing the most common combinations you're likely
to see:

| source | actor\_type  | actor\_sid | description                                                                                                                                                                                                 |
| :----- | :----------- | :--------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| api    | account      | AC123      | The Account AC123 authenticated against the API and caused the event.                                                                                                                                       |
| web    | user         | US456      | The User whose sid is US456 was logged in the Twilio Console and caused the event. The User's Sid can be seen in the [Manager Users page](https://www.twilio.com/user/account/users) of the Twilio Console. |
| twilio | twilio-admin | null       | A Twilio Administrator made the change through Twilio's administration interface.                                                                                                                           |

## Fetch an Event resource

`GET https://monitor.twilio.com/v1/Events/{Sid}`

### Path parameters

```json
[{"name":"Sid","in":"path","description":"The SID of the Event resource to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AE[0-9a-fA-F]{32}$"},"required":true}]
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
  const event = await client.monitor.v1
    .events("AEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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

event = client.monitor.v1.events("AEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").fetch()

print(event.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Monitor.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var _event = await EventResource.FetchAsync(pathSid: "AEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(_event.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.monitor.v1.Event;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Event event = Event.fetcher("AEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").fetch();

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

	resp, err := client.MonitorV1.FetchEvent("AEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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

$event = $twilio->monitor->v1
    ->events("AEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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
        .monitor
        .v1
        .events('AEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
        .fetch

puts event.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:monitor:v1:events:fetch \
   --sid AEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://monitor.twilio.com/v1/Events/AEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "actor_sid": "USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "actor_type": "account",
  "description": null,
  "event_data": {
    "friendly_name": {
      "previous": "SubAccount Created at 2014-10-03 09:48 am",
      "updated": "Mr. Friendly"
    }
  },
  "event_date": "2014-10-03T16:48:25Z",
  "event_type": "account.updated",
  "links": {
    "actor": "https://api.twilio.com/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "resource": "https://api.twilio.com/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  },
  "resource_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "resource_type": "account",
  "sid": "AEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "source": "api",
  "source_ip_address": "10.86.6.250",
  "url": "https://monitor.twilio.com/v1/Events/AEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

## Read multiple Event resources

`GET https://monitor.twilio.com/v1/Events`

Returns a list of Events in this account, sorted by `event-date`. This list includes [paging information](/docs/usage/twilios-response#pagination).

By default, all Events are included. You can always filter your Events by event-date using the `StartDate` and `EndDate` parameters.

In addition, you may filter by any one of the other fields. Filtering on more than one field in the same request is not supported and will result in a `400 Bad Request` error.

### Query parameters

```json
[{"name":"ActorSid","in":"query","description":"Only include events initiated by this Actor. Useful for auditing actions taken by specific users or API credentials.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^US[0-9a-fA-F]{32}$"},"examples":{"readFull":{"value":"USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"},"readEmpty":{"value":"USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}}},{"name":"EventType","in":"query","description":"Only include events of this [Event Type](https://www.twilio.com/docs/usage/monitor-events#event-types).","schema":{"type":"string"},"examples":{"readFull":{"value":"event_type"},"readEmpty":{"value":"event_type"}}},{"name":"ResourceSid","in":"query","description":"Only include events that refer to this resource. Useful for discovering the history of a specific resource.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^[a-zA-Z]{2}[0-9a-fA-F]{32}$"},"examples":{"readFull":{"value":"ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"},"readEmpty":{"value":"ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}}},{"name":"SourceIpAddress","in":"query","description":"Only include events that originated from this IP address. Useful for tracking suspicious activity originating from the API or the Twilio Console.","schema":{"type":"string"},"examples":{"readFull":{"value":"source_ip_address"},"readEmpty":{"value":"source_ip_address"}}},{"name":"StartDate","in":"query","description":"Only include events that occurred on or after this date. Specify the date in GMT and [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.","schema":{"type":"string","format":"date-time"},"examples":{"readFull":{"value":"2015-07-30T20:00:00Z"},"readEmpty":{"value":"2015-07-30T20:00:00Z"}}},{"name":"EndDate","in":"query","description":"Only include events that occurred on or before this date. Specify the date in GMT and [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.","schema":{"type":"string","format":"date-time"},"examples":{"readFull":{"value":"2015-07-30T20:00:00Z"},"readEmpty":{"value":"2015-07-30T20:00:00Z"}}},{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

Filter by date

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listEvent() {
  const events = await client.monitor.v1.events.list({
    endDate: new Date("2015-04-01 00:00:00"),
    startDate: new Date("2015-03-01 00:00:00"),
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

events = client.monitor.v1.events.list(
    start_date=datetime(2015, 3, 1, 0, 0, 0),
    end_date=datetime(2015, 4, 1, 0, 0, 0),
    limit=20,
)

for record in events:
    print(record.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Monitor.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var _events = await EventResource.ReadAsync(
            startDate: new DateTime(2015, 3, 1, 0, 0, 0, DateTimeKind.Utc),
            endDate: new DateTime(2015, 4, 1, 0, 0, 0, DateTimeKind.Utc),
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
import com.twilio.rest.monitor.v1.Event;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Event> events = Event.reader()
                                        .setStartDate(ZonedDateTime.of(2015, 3, 1, 0, 0, 0, 0, ZoneId.of("UTC")))
                                        .setEndDate(ZonedDateTime.of(2015, 4, 1, 0, 0, 0, 0, ZoneId.of("UTC")))
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
	monitor "github.com/twilio/twilio-go/rest/monitor/v1"
	"os"
	"time"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &monitor.ListEventParams{}
	params.SetStartDate(time.Date(2015, 3, 1, 0, 0, 0, 0, time.UTC))
	params.SetEndDate(time.Date(2015, 4, 1, 0, 0, 0, 0, time.UTC))
	params.SetLimit(20)

	resp, err := client.MonitorV1.ListEvent(params)
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

$events = $twilio->monitor->v1->events->read(
    [
        "startDate" => new \DateTime("2015-03-01T00:00:00Z"),
        "endDate" => new \DateTime("2015-04-01T00:00:00Z"),
    ],
    20
);

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
         .monitor
         .v1
         .events
         .list(
           start_date: Time.new(2015, 3, 1, 0, 0, 0),
           end_date: Time.new(2015, 4, 1, 0, 0, 0),
           limit: 20
         )

events.each do |record|
   puts record.account_sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:monitor:v1:events:list \
   --start-date 2016-07-31 \
   --end-date 2016-07-31
```

```bash
curl -X GET "https://monitor.twilio.com/v1/Events?StartDate=2016-07-31&EndDate=2016-07-31&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "events": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "actor_sid": "USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "actor_type": "account",
      "description": null,
      "event_data": {
        "friendly_name": {
          "previous": "SubAccount Created at 2014-10-03 09:48 am",
          "updated": "Mr. Friendly"
        }
      },
      "event_date": "2014-10-03T16:48:25Z",
      "event_type": "account.updated",
      "resource_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "resource_type": "account",
      "sid": "AEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "source": "source",
      "source_ip_address": "source_ip_address",
      "url": "https://monitor.twilio.com/v1/Events/AEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "links": {
        "actor": "https://api.twilio.com/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "resource": "https://api.twilio.com/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
      }
    }
  ],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://monitor.twilio.com/v1/Events?StartDate=2015-07-30T20%3A00%3A00Z&SourceIpAddress=source_ip_address&EndDate=2015-07-30T20%3A00%3A00Z&ActorSid=USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&EventType=event_type&ResourceSid=ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://monitor.twilio.com/v1/Events?StartDate=2015-07-30T20%3A00%3A00Z&SourceIpAddress=source_ip_address&EndDate=2015-07-30T20%3A00%3A00Z&ActorSid=USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&EventType=event_type&ResourceSid=ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=50&Page=0",
    "next_page_url": null,
    "key": "events"
  }
}
```

Filter for a phone number

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listEvent() {
  const events = await client.monitor.v1.events.list({
    resourceSid: "PN4aa51b930717ea83c91971b86d99018f",
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

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

events = client.monitor.v1.events.list(
    resource_sid="PN4aa51b930717ea83c91971b86d99018f", limit=20
)

for record in events:
    print(record.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Monitor.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var _events = await EventResource.ReadAsync(
            resourceSid: "PN4aa51b930717ea83c91971b86d99018f", limit: 20);

        foreach (var record in _events) {
            Console.WriteLine(record.AccountSid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.monitor.v1.Event;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Event> events =
            Event.reader().setResourceSid("PN4aa51b930717ea83c91971b86d99018f").limit(20).read();

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
	monitor "github.com/twilio/twilio-go/rest/monitor/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &monitor.ListEventParams{}
	params.SetResourceSid("PN4aa51b930717ea83c91971b86d99018f")
	params.SetLimit(20)

	resp, err := client.MonitorV1.ListEvent(params)
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

$events = $twilio->monitor->v1->events->read(
    ["resourceSid" => "PN4aa51b930717ea83c91971b86d99018f"],
    20
);

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
         .monitor
         .v1
         .events
         .list(
           resource_sid: 'PN4aa51b930717ea83c91971b86d99018f',
           limit: 20
         )

events.each do |record|
   puts record.account_sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:monitor:v1:events:list \
   --resource-sid PN4aa51b930717ea83c91971b86d99018f
```

```bash
curl -X GET "https://monitor.twilio.com/v1/Events?ResourceSid=PN4aa51b930717ea83c91971b86d99018f&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "events": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "actor_sid": "USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "actor_type": "account",
      "description": null,
      "event_data": {
        "friendly_name": {
          "previous": "SubAccount Created at 2014-10-03 09:48 am",
          "updated": "Mr. Friendly"
        }
      },
      "event_date": "2014-10-03T16:48:25Z",
      "event_type": "account.updated",
      "resource_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "resource_type": "account",
      "sid": "AEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "source": "source",
      "source_ip_address": "source_ip_address",
      "url": "https://monitor.twilio.com/v1/Events/AEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "links": {
        "actor": "https://api.twilio.com/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "resource": "https://api.twilio.com/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
      }
    }
  ],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://monitor.twilio.com/v1/Events?StartDate=2015-07-30T20%3A00%3A00Z&SourceIpAddress=source_ip_address&EndDate=2015-07-30T20%3A00%3A00Z&ActorSid=USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&EventType=event_type&ResourceSid=ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://monitor.twilio.com/v1/Events?StartDate=2015-07-30T20%3A00%3A00Z&SourceIpAddress=source_ip_address&EndDate=2015-07-30T20%3A00%3A00Z&ActorSid=USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&EventType=event_type&ResourceSid=ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=50&Page=0",
    "next_page_url": null,
    "key": "events"
  }
}
```

Filter for an IP address

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listEvent() {
  const events = await client.monitor.v1.events.list({
    endDate: new Date("2009-07-06 20:30:00"),
    sourceIpAddress: "104.14.155.29",
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

events = client.monitor.v1.events.list(
    source_ip_address="104.14.155.29",
    start_date=datetime(2009, 7, 6, 20, 30, 0),
    end_date=datetime(2009, 7, 6, 20, 30, 0),
    limit=20,
)

for record in events:
    print(record.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Monitor.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var _events = await EventResource.ReadAsync(
            sourceIpAddress: "104.14.155.29",
            startDate: new DateTime(2009, 7, 6, 20, 30, 0, DateTimeKind.Utc),
            endDate: new DateTime(2009, 7, 6, 20, 30, 0, DateTimeKind.Utc),
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
import com.twilio.rest.monitor.v1.Event;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Event> events = Event.reader()
                                        .setSourceIpAddress("104.14.155.29")
                                        .setStartDate(ZonedDateTime.of(2009, 7, 6, 20, 30, 0, 0, ZoneId.of("UTC")))
                                        .setEndDate(ZonedDateTime.of(2009, 7, 6, 20, 30, 0, 0, ZoneId.of("UTC")))
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
	monitor "github.com/twilio/twilio-go/rest/monitor/v1"
	"os"
	"time"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &monitor.ListEventParams{}
	params.SetSourceIpAddress("104.14.155.29")
	params.SetStartDate(time.Date(2009, 7, 6, 20, 30, 0, 0, time.UTC))
	params.SetEndDate(time.Date(2009, 7, 6, 20, 30, 0, 0, time.UTC))
	params.SetLimit(20)

	resp, err := client.MonitorV1.ListEvent(params)
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

$events = $twilio->monitor->v1->events->read(
    [
        "sourceIpAddress" => "104.14.155.29",
        "startDate" => new \DateTime("2009-07-06T20:30:00Z"),
        "endDate" => new \DateTime("2009-07-06T20:30:00Z"),
    ],
    20
);

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
         .monitor
         .v1
         .events
         .list(
           source_ip_address: '104.14.155.29',
           start_date: Time.new(2009, 7, 6, 20, 30, 0),
           end_date: Time.new(2009, 7, 6, 20, 30, 0),
           limit: 20
         )

events.each do |record|
   puts record.account_sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:monitor:v1:events:list \
   --source-ip-address 104.14.155.29 \
   --start-date 2016-07-31 \
   --end-date 2016-07-31
```

```bash
curl -X GET "https://monitor.twilio.com/v1/Events?SourceIpAddress=104.14.155.29&StartDate=2016-07-31&EndDate=2016-07-31&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "events": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "actor_sid": "USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "actor_type": "account",
      "description": null,
      "event_data": {
        "friendly_name": {
          "previous": "SubAccount Created at 2014-10-03 09:48 am",
          "updated": "Mr. Friendly"
        }
      },
      "event_date": "2014-10-03T16:48:25Z",
      "event_type": "account.updated",
      "resource_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "resource_type": "account",
      "sid": "AEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "source": "source",
      "source_ip_address": "source_ip_address",
      "url": "https://monitor.twilio.com/v1/Events/AEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "links": {
        "actor": "https://api.twilio.com/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "resource": "https://api.twilio.com/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
      }
    }
  ],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://monitor.twilio.com/v1/Events?StartDate=2015-07-30T20%3A00%3A00Z&SourceIpAddress=source_ip_address&EndDate=2015-07-30T20%3A00%3A00Z&ActorSid=USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&EventType=event_type&ResourceSid=ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://monitor.twilio.com/v1/Events?StartDate=2015-07-30T20%3A00%3A00Z&SourceIpAddress=source_ip_address&EndDate=2015-07-30T20%3A00%3A00Z&ActorSid=USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&EventType=event_type&ResourceSid=ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=50&Page=0",
    "next_page_url": null,
    "key": "events"
  }
}
```

Only use one filter property at a time!

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listEvent() {
  const events = await client.monitor.v1.events.list({
    actorSid: "USd0afd67cddff4ec7cb0022771a203cb1",
    resourceSid: "PN4aa51b930717ea83c91971b86d99018f",
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

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

events = client.monitor.v1.events.list(
    actor_sid="USd0afd67cddff4ec7cb0022771a203cb1",
    resource_sid="PN4aa51b930717ea83c91971b86d99018f",
    limit=20,
)

for record in events:
    print(record.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Monitor.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var _events = await EventResource.ReadAsync(
            actorSid: "USd0afd67cddff4ec7cb0022771a203cb1",
            resourceSid: "PN4aa51b930717ea83c91971b86d99018f",
            limit: 20);

        foreach (var record in _events) {
            Console.WriteLine(record.AccountSid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.monitor.v1.Event;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Event> events = Event.reader()
                                        .setActorSid("USd0afd67cddff4ec7cb0022771a203cb1")
                                        .setResourceSid("PN4aa51b930717ea83c91971b86d99018f")
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
	monitor "github.com/twilio/twilio-go/rest/monitor/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &monitor.ListEventParams{}
	params.SetActorSid("USd0afd67cddff4ec7cb0022771a203cb1")
	params.SetResourceSid("PN4aa51b930717ea83c91971b86d99018f")
	params.SetLimit(20)

	resp, err := client.MonitorV1.ListEvent(params)
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

$events = $twilio->monitor->v1->events->read(
    [
        "actorSid" => "USd0afd67cddff4ec7cb0022771a203cb1",
        "resourceSid" => "PN4aa51b930717ea83c91971b86d99018f",
    ],
    20
);

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
         .monitor
         .v1
         .events
         .list(
           actor_sid: 'USd0afd67cddff4ec7cb0022771a203cb1',
           resource_sid: 'PN4aa51b930717ea83c91971b86d99018f',
           limit: 20
         )

events.each do |record|
   puts record.account_sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:monitor:v1:events:list \
   --actor-sid USd0afd67cddff4ec7cb0022771a203cb1 \
   --resource-sid PN4aa51b930717ea83c91971b86d99018f
```

```bash
curl -X GET "https://monitor.twilio.com/v1/Events?ActorSid=USd0afd67cddff4ec7cb0022771a203cb1&ResourceSid=PN4aa51b930717ea83c91971b86d99018f&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "events": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "actor_sid": "USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "actor_type": "account",
      "description": null,
      "event_data": {
        "friendly_name": {
          "previous": "SubAccount Created at 2014-10-03 09:48 am",
          "updated": "Mr. Friendly"
        }
      },
      "event_date": "2014-10-03T16:48:25Z",
      "event_type": "account.updated",
      "resource_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "resource_type": "account",
      "sid": "AEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "source": "source",
      "source_ip_address": "source_ip_address",
      "url": "https://monitor.twilio.com/v1/Events/AEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "links": {
        "actor": "https://api.twilio.com/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "resource": "https://api.twilio.com/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
      }
    }
  ],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://monitor.twilio.com/v1/Events?StartDate=2015-07-30T20%3A00%3A00Z&SourceIpAddress=source_ip_address&EndDate=2015-07-30T20%3A00%3A00Z&ActorSid=USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&EventType=event_type&ResourceSid=ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://monitor.twilio.com/v1/Events?StartDate=2015-07-30T20%3A00%3A00Z&SourceIpAddress=source_ip_address&EndDate=2015-07-30T20%3A00%3A00Z&ActorSid=USaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&EventType=event_type&ResourceSid=ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=50&Page=0",
    "next_page_url": null,
    "key": "events"
  }
}
```

## Full List of All Supported Resource-Types and Event-Types \[#event-types]

Events currently tracks the following resource types and associated
event types. All of the event types are available via the console and API:

| Resource Type                | Event Types                                                                                                                                                                                                                                                                                                                                                                                                              |
| :--------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| account                      | `account.created`   `account.updated`   `account.deleted`                                                                                                                                                                                                                                                                                                                                                                |
| account-api-keys             | `account-api-keys.created`   `account-api-keys.deleted`   `account-api-keys.updated`                                                                                                                                                                                                                                                                                                                                     |
| account-auth-token           | `account-auth-token.deleted`   `account-auth-token.promoted`   `account-auth-token.updated`   `account-auth-token.created`   `account-auth-token.secondary-created`   `account-auth-token.secondary-deleted`                                                                                                                                                                                                             |
| account-credentials          | `account-credentials.created`   `account-credentials.deleted`   `account-credentials.updated`                                                                                                                                                                                                                                                                                                                            |
| account-keys                 | `account-keys.created`   `account-keys.deleted`   `account-keys.updated`                                                                                                                                                                                                                                                                                                                                                 |
| application                  | `application.created`   `application.updated`   `application.deleted`                                                                                                                                                                                                                                                                                                                                                    |
| authorized-connect-app       | `authorized-connect-app.created`   `authorized-connect-app.deleted`   `authorized-connect-app.updated`                                                                                                                                                                                                                                                                                                                   |
| bulkexports                  | `bulkexports.created`   `bulkexports.deleted`   `bulkexports.downloaded`   `bulkexports.updated`                                                                                                                                                                                                                                                                                                                         |
| byoc-trunk                   | `byoc-trunk.updated`   `byoc-trunk.created`   `byoc-trunk.deleted`                                                                                                                                                                                                                                                                                                                                                       |
| call                         | `call.deleted`                                                                                                                                                                                                                                                                                                                                                                                                           |
| call.status                  | `call.status.updated`                                                                                                                                                                                                                                                                                                                                                                                                    |
| caller-id                    | `caller-id.created`   `caller-id.updated`   `caller-id.deleted`                                                                                                                                                                                                                                                                                                                                                          |
| config                       | `config.created`   `config.deleted`   `config.updated`                                                                                                                                                                                                                                                                                                                                                                   |
| connect-app                  | `connect-app.created`   `connect-app.updated`   `connect-app.deleted`                                                                                                                                                                                                                                                                                                                                                    |
| connection-policy            | `connection-policy.created`   `connection-policy.deleted`   `connection-policy.updated`                                                                                                                                                                                                                                                                                                                                  |
| copilot-application          | `copilot-application.created`   `copilot-application.updated`   `copilot-application.deleted`                                                                                                                                                                                                                                                                                                                            |
| copilot-number-pool          | `copilot-number-pool.created`   `copilot-number-pool.deleted`   `copilot-number-pool.updated`                                                                                                                                                                                                                                                                                                                            |
| data-access-policy           | `data-access-policy.updated`                                                                                                                                                                                                                                                                                                                                                                                             |
| data-policy                  | `data-policy.created`   `data-policy.updated`   `data-policy.deleted`                                                                                                                                                                                                                                                                                                                                                    |
| flex-team                    | `flex-team.created`   `flex-team.updated`   `flex-team.deleted`   `flex-team.member.added`   `flex-team.member.removed`   `flex-team.owner.added`   `flex-team.owner.removed`   `flex-team.view.enabled`   `flex-team.view.disabled`   `flex-team.historical-reporting.enabled`   `flex-team.historical-reporting.disabled`   `flex-team.conversational-insights.enabled`   `flex-team.conversational-insights.disabled` |
| flow                         | `flow.created`   `flow.updated`   `flow.deleted`                                                                                                                                                                                                                                                                                                                                                                         |
| interconnect-connection      | `interconnect-connection.created`   `interconnect-connection.updated`   `interconnect-connection.deleted`                                                                                                                                                                                                                                                                                                                |
| invoice-settings             | `invoice-settings.created`   `invoice-settings.deleted`   `invoice-settings.updated`                                                                                                                                                                                                                                                                                                                                     |
| ip-access-control-list       | `ip-access-control-list.created`   `ip-access-control-list.deleted`   `ip-access-control-list.updated`                                                                                                                                                                                                                                                                                                                   |
| ip-messaging.channel         | `ip-messaging.channel.created`   `ip-messaging.channel.updated`   `ip-messaging.channel.deleted`                                                                                                                                                                                                                                                                                                                         |
| ip-messaging.credential      | `ip-messaging.credential.created`   `ip-messaging.credential.updated`   `ip-messaging.credential.deleted`                                                                                                                                                                                                                                                                                                                |
| ip-messaging.member          | `ip-messaging.member.created`   `ip-messaging.member.updated`   `ip-messaging.member.deleted`                                                                                                                                                                                                                                                                                                                            |
| ip-messaging.message         | `ip-messaging.message.created`   `ip-messaging.message.deleted`   `ip-messaging.message.updated`                                                                                                                                                                                                                                                                                                                         |
| ip-messaging.role            | `ip-messaging.role.created`   `ip-messaging.role.updated`   `ip-messaging.role.deleted`                                                                                                                                                                                                                                                                                                                                  |
| ip-messaging.service         | `ip-messaging.service.created`   `ip-messaging.service.updated`   `ip-messaging.service.deleted`                                                                                                                                                                                                                                                                                                                         |
| ip-messaging.user            | `ip-messaging.user.deleted`   `ip-messaging.user.created`   `ip-messaging.user.updated`                                                                                                                                                                                                                                                                                                                                  |
| ip-record                    | `ip-record.created`   `ip-record.updated`   `ip-record.deleted`                                                                                                                                                                                                                                                                                                                                                          |
| message                      | `message.updated`   `message.deleted`                                                                                                                                                                                                                                                                                                                                                                                    |
| message-body                 | `message-body.deleted`                                                                                                                                                                                                                                                                                                                                                                                                   |
| message-media                | `message-media.deleted`  `message-media.deletedall`   `message-media.created`   `message-media.updated`                                                                                                                                                                                                                                                                                                                  |
| messaging-settings           | `messaging-settings.updated`                                                                                                                                                                                                                                                                                                                                                                                             |
| payment                      | `payment.created`   `payment.deleted`   `payment.updated`                                                                                                                                                                                                                                                                                                                                                                |
| payment-method               | `payment-method.created`   `payment-method.updated`   `payment-method.deleted`                                                                                                                                                                                                                                                                                                                                           |
| payment-refund               | `payment-refund.created`   `payment-refund.deleted`   `payment-refund.updated`                                                                                                                                                                                                                                                                                                                                           |
| phone-number                 | `phone-number.created`   `phone-number.updated`   `phone-number.deleted`                                                                                                                                                                                                                                                                                                                                                 |
| recharge-trigger             | `recharge-trigger.created`   `recharge-trigger.updated`   `recharge-trigger.deleted`                                                                                                                                                                                                                                                                                                                                     |
| recording                    | `recording.created`   `recording.updated`   `recording.deleted`   `recording.bulk-delete.created`   `recording.accessed`                                                                                                                                                                                                                                                                                                 |
| report                       | `report.cloned`   `report.updated`                                                                                                                                                                                                                                                                                                                                                                                       |
| rtc-app-config               | `rtc-app-config.created`   `rtc-app-config.updated`   `rtc-app-config.deleted`                                                                                                                                                                                                                                                                                                                                           |
| security-settings            | `security-settings.created`   `security-settings.deleted`   `security-settings.updated`                                                                                                                                                                                                                                                                                                                                  |
| sender-id                    | `sender-id.created`   `sender-id.updated`   `sender-id.deleted`   `sender-id.country.created`   `sender-id.country.deleted`   `sender-id.country.status.updated`   `sender-id.country.override_status.updated`   `sender-id.registration.added`   `sender-id.registration.removed`                                                                                                                                       |
| service                      |                                                                                                                                                                                                                                                                                                                                                                                                                          |
| service-record               | `service-record.created`   `service-record.updated`   `service-record.deleted`                                                                                                                                                                                                                                                                                                                                           |
| shortcode                    | `shortcode.created`   `shortcode.updated`   `shortcode.deleted`                                                                                                                                                                                                                                                                                                                                                          |
| sipmanipulation              | `sipmanipulation.created`   `sipmanipulation.updated`   `sipmanipulation.deleted`                                                                                                                                                                                                                                                                                                                                        |
| sip-credential-list          | `sip-credential-list.created`   `sip-credential-list.updated`   `sip-credential-list.deleted`                                                                                                                                                                                                                                                                                                                            |
| sip-domain                   | `sip-domain.created`   `sip-domain.updated`   `sip-domain.deleted`                                                                                                                                                                                                                                                                                                                                                       |
| sip-ip-access-control-list   | `sip-ip-access-control-list.created`   `sip-ip-access-control-list.updated`   `sip-ip-access-control-list.deleted`                                                                                                                                                                                                                                                                                                       |
| slapchop-api                 | `slapchop-api.created`   `slapchop-api.updated`   `slapchop-api.deleted`                                                                                                                                                                                                                                                                                                                                                 |
| sms-geographic-permissions   | `sms-geographic-permissions.created`   `sms-geographic-permissions.deleted`   `sms-geographic-permissions.updated`                                                                                                                                                                                                                                                                                                       |
| support-plan                 | `support-plan.updated`   `support-plan.created`   `support-plan.deleted`                                                                                                                                                                                                                                                                                                                                                 |
| taskrouter-rate-limit        | `taskrouter-rate-limit.updated`                                                                                                                                                                                                                                                                                                                                                                                          |
| transcription                | `transcription.created`   `transcription.deleted`  `transcription.accessed`                                                                                                                                                                                                                                                                                                                                              |
| trunk                        | `trunk.created`   `trunk.deleted`   `trunk.updated`                                                                                                                                                                                                                                                                                                                                                                      |
| usage-trigger                | `usage-trigger.created`   `usage-trigger.updated`   `usage-trigger.deleted`                                                                                                                                                                                                                                                                                                                                              |
| user                         | `user.created`   `user.deleted`   `user.updated`                                                                                                                                                                                                                                                                                                                                                                         |
| user-invitation              | `user-invitation.created`   `user-invitation.deleted`   `user-invitation.updated`                                                                                                                                                                                                                                                                                                                                        |
| user-password                | `user-password.created`   `user-password.deleted`   `user-password.updated`                                                                                                                                                                                                                                                                                                                                              |
| user-session                 | `user-session.created`   `user-session.deleted`   `user-session.updated`                                                                                                                                                                                                                                                                                                                                                 |
| verify-fraud-guard           | `verify-fraud-guard.updated`                                                                                                                                                                                                                                                                                                                                                                                             |
| verify-fraud-guard-mode      | `verify-fraud-guard-mode.updated`                                                                                                                                                                                                                                                                                                                                                                                        |
| verify-geo-permissions-sms   | `verify-geo-permissions-sms.updated`                                                                                                                                                                                                                                                                                                                                                                                     |
| verify-geo-permissions-voice | `verify-geo-permissions-voice.updated`                                                                                                                                                                                                                                                                                                                                                                                   |
| voice-client                 | `voice-client.created`   `voice-client.updated`   `voice-client.deleted`   `voice-client.default.updated`   `voice-client.default.deleted`                                                                                                                                                                                                                                                                               |
| voice-geographic-permissions | `voice-geographic-permissions.created`   `voice-geographic-permissions.deleted`   `voice-geographic-permissions.updated`                                                                                                                                                                                                                                                                                                 |
| voice-insights-account-flags | `voice-insights-account-flags.updated`                                                                                                                                                                                                                                                                                                                                                                                   |
| voice-trace                  | `voice-trace.updated`                                                                                                                                                                                                                                                                                                                                                                                                    |
| wireless-sim                 | `wireless-sim.updated`                                                                                                                                                                                                                                                                                                                                                                                                   |
| wireless-sim.connection      | `wireless-sim.connection.updated`                                                                                                                                                                                                                                                                                                                                                                                        |
