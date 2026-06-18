# Day Resource

The Day resource allows you to download the export file containing a single day's data for your account and the requested data type.

## Messages Export file format

Day files are stored and returned as compressed (gzip) JSON files with one record per line. Records are similar to the Message resource. The differences are:

* `price_units` will not be present
* `api_version` will not be present
* `error message` will not be present (but `error_code` is)
* `uri` and `subresource_uris` will not be present.
* timestamps like `date created`, `date updated` and `date sent` are in UTC and ISO 8601 format.

## Calls Export file format

Day files are stored and returned as compressed (gzip) JSON files with one record per line. Records are similar to the Calls resource. The differences are:

* timestamps are in UTC and ISO 8601 format.
* Price data may not be present on all messages in BulkExport
* `uri` and `subresource_uris` will not be present.

## Conferences Export file format

Day files are stored and returned as compressed (gzip) JSON files with one record per line. Records are similar to the Conferences resource. The differences are:

* timestamps are in UTC and ISO 8601 format.
* `api_version` will not be present
* `uri` and `subresource_uris` will not be present.

\##Participants BulkExport file format
Day files are stored and returned as compressed (gzip) JSON files with one record per line. Records are similar to the Participants resource. The differences are:

* timestamps are in UTC and ISO 8601 format.
* `uri` will not be present
* `label` will not be present

## Day Properties

<OperationTable type="properties" data={{"type":"object","refName":"bulkexports.v1.export.day","modelName":"bulkexports_v1_export_day","properties":{"day":{"type":"string","nullable":true,"description":"The ISO 8601 format date of the resources in the file, for a UTC day"},"size":{"type":"integer","default":0,"description":"The size of the day's data file in bytes"},"create_date":{"type":"string","nullable":true,"description":"The ISO 8601 format date when resources is created"},"friendly_name":{"type":"string","nullable":true,"description":"The friendly name specified when creating the job"},"resource_type":{"type":"string","nullable":true,"description":"The type of communication – Messages, Calls, Conferences, and Participants"},"redirect_to":{"type":"string","format":"uri","nullable":true}}}} />

## Fetch a single day file

`GET https://bulkexports.twilio.com/v1/Exports/{ResourceType}/Days/{Day}`

### Path parameters

```json
[{"name":"ResourceType","in":"path","description":"The type of communication – Messages, Calls, Conferences, and Participants","schema":{"type":"string"},"required":true},{"name":"Day","in":"path","description":"The ISO 8601 format date of the resources in the file, for a UTC day","schema":{"type":"string"},"required":true}]
```

Fetch a single file for an exported day

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchDay() {
  const day = await client.bulkexports.v1
    .exports("Messages")
    .days("2020-02-02")
    .fetch();

  console.log(day.redirectTo);
}

fetchDay();
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

day = client.bulkexports.v1.exports("Messages").days("2020-02-02").fetch()

print(day.redirect_to)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Bulkexports.V1.Export;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var day = await DayResource.FetchAsync(pathResourceType: "Messages", pathDay: "2020-02-02");

        Console.WriteLine(day.RedirectTo);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.bulkexports.v1.export.Day;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Day day = Day.fetcher("Messages", "2020-02-02").fetch();

        System.out.println(day.getRedirectTo());
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

	resp, err := client.BulkexportsV1.FetchDay("Messages",
		"2020-02-02")
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.RedirectTo != nil {
			fmt.Println(*resp.RedirectTo)
		} else {
			fmt.Println(resp.RedirectTo)
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

$day = $twilio->bulkexports->v1
    ->exports("Messages")
    ->days("2020-02-02")
    ->fetch();

print $day->redirectTo;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

day = @client
      .bulkexports
      .v1
      .exports('Messages')
      .days('2020-02-02')
      .fetch

puts day.redirect_to
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:bulkexports:v1:exports:days:fetch \
   --resource-type Messages \
   --day 2020-02-02
```

```bash
curl -X GET "https://bulkexports.twilio.com/v1/Exports/Messages/Days/2020-02-02" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "redirect_to": "https://documentation-example-twilio-bucket.s3.amazonaws.com/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

Once you have the redirection, you can fetch the file. The redirection is of the format:

```javascript
https://documentation-example-twilio-bucket/daily/day%3D2020-02-02/type%3DMessages/account%3DACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/created_time%3D20200202000014/part-0XXXXXXXXXX0.json.gz?X-Amz-Security-Token=IQoXXXXXXXXH1GQ%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20200202T012341Z&X-Amz-SignedHeaders=host&X-Amz-Expires=240&X-Amz-Credential=AXXXXXXXXXXX22%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=bXXXXXXXXX9
```

This link is a one-time use signed S3 link to the file. You can request these links multiple times from the API above, but each link can only be used once.

The file is compressed using gzip. You can use a command line tool to gunzip the file, or utilities in your language like Java's GZIPInputStream or GZipStream in C#.

Inside the file, messages are contained, with JSON equivalent to the [Message Resource](/docs/messaging/api/message-resource). These are of the format

```javascript
{
"date_updated": "2020-01-013T03:57:34Z",
"date_sent": "2020-01-01T03:57:33Z",
"date_created": "2020-01-01T03:57:32Z",
"body": "Sent from your Twilio trial account - woot woot!!!!",
"num_segments": 1,
"sid": "SM32743c2e9c251806c2317dee566f6d7b",
"num_media": 0,
"messaging_service_sid": "MG1ef70550624e8b354860a98d787ee1f1",
"account_sid": "ACa674802ceae35ad19498be749e085991",
"from": "+14155551212",
"error_code": null,
"to": "+14155552389",
"status": "delivered",
"direction": "outbound-api"
}
```

This will be repeated per message for that day.

## Read multiple Day resources

`GET https://bulkexports.twilio.com/v1/Exports/{ResourceType}/Days`

`{ResourceType}` is the type of Twilio resource, one of `Calls` or `Messages`. The Developer Preview release of Day supports exporting `Messages` only.

### Path parameters

```json
[{"name":"ResourceType","in":"path","description":"The type of communication – Messages, Calls, Conferences, and Participants","schema":{"type":"string"},"required":true}]
```

### Query parameters

```json
[{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 400.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":400}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

Fetch a list of exported days

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listDay() {
  const days = await client.bulkexports.v1
    .exports("Messages")
    .days.list({ limit: 20 });

  days.forEach((d) => console.log(d.day));
}

listDay();
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

days = client.bulkexports.v1.exports("Messages").days.list(limit=20)

for record in days:
    print(record.day)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Bulkexports.V1.Export;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var days = await DayResource.ReadAsync(pathResourceType: "Messages", limit: 20);

        foreach (var record in days) {
            Console.WriteLine(record.Day);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.bulkexports.v1.export.Day;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Day> days = Day.reader("Messages").limit(20).read();

        for (Day record : days) {
            System.out.println(record.getDay());
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
	bulkexports "github.com/twilio/twilio-go/rest/bulkexports/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &bulkexports.ListDayParams{}
	params.SetLimit(20)

	resp, err := client.BulkexportsV1.ListDay("Messages",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].Day != nil {
				fmt.Println(*resp[record].Day)
			} else {
				fmt.Println(resp[record].Day)
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

$days = $twilio->bulkexports->v1->exports("Messages")->days->read(20);

foreach ($days as $record) {
    print $record->day;
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

days = @client
       .bulkexports
       .v1
       .exports('Messages')
       .days
       .list(limit: 20)

days.each do |record|
   puts record.day
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:bulkexports:v1:exports:days:list \
   --resource-type Messages
```

```bash
curl -X GET "https://bulkexports.twilio.com/v1/Exports/Messages/Days?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "days": [],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://bulkexports.twilio.com/v1/Exports/Messages/Days?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://bulkexports.twilio.com/v1/Exports/Messages/Days?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "days"
  }
}
```
