# Export Custom Job Resource

Custom Jobs allow you to create exports for any date range. If the date range spans multiple days, they will generate separate output days. Jobs can be deleted with the [Job resource](/docs/usage/bulkexport/job). When a Job is completed successfully, the results are visible as days in the [Day resource](/docs/usage/bulkexport/day).

## Job Properties

<OperationTable type="properties" data={{"type":"object","refName":"bulkexports.v1.export.export_custom_job","modelName":"bulkexports_v1_export_export_custom_job","properties":{"friendly_name":{"type":"string","nullable":true,"description":"The friendly name specified when creating the job"},"resource_type":{"type":"string","nullable":true,"description":"The type of communication – Messages, Calls, Conferences, and Participants"},"start_day":{"type":"string","nullable":true,"description":"The start day for the custom export specified when creating the job"},"end_day":{"type":"string","nullable":true,"description":"The end day for the export specified when creating the job"},"webhook_url":{"type":"string","nullable":true,"description":"The optional webhook url called on completion of the job. If this is supplied, `WebhookMethod` must also be supplied."},"webhook_method":{"type":"string","nullable":true,"description":"This is the method used to call the webhook on completion of the job. If this is supplied, `WebhookUrl` must also be supplied."},"email":{"type":"string","nullable":true,"description":"The optional email to send the completion notification to"},"job_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^JS[0-9a-fA-F]{32}$","nullable":true,"description":"The unique job_sid returned when the custom export was created"},"details":{"type":"array","nullable":true,"description":"The details of a job which is an object that contains an array of status grouped by `status` state.  Each `status` object has a `status` string, a count which is the number of days in that `status`, and list of days in that `status`. The day strings are in the format yyyy-MM-dd. As an example, a currently running job may have a status object for COMPLETED and a `status` object for SUBMITTED each with its own count and list of days."},"job_queue_position":{"type":"string","nullable":true,"description":"This is the job position from the 1st in line. Your queue position will never increase. As jobs ahead of yours in the queue are processed, the queue position number will decrease"},"estimated_completion_time":{"type":"string","nullable":true,"description":"this is the time estimated until your job is complete. This is calculated each time you request the job list. The time is calculated based on the current rate of job completion (which may vary) and your job queue position"}}}} />

| ENUM:STATUS possible values |                                                                                                                                                                                                                                                                             |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ErrorDuringRun`            | The Job was attempted, but an error prevented completion. This is not a final status, the job will be retried.                                                                                                                                                              |
| `Submitted`                 | The Job has been successfully submitted and is in the queue to execute.                                                                                                                                                                                                     |
| `Running`                   | The job is currently running. The output should be available shortly. Multiple Jobs may run at the same time. You can use the 'estimated\_completion\_time' to get a sense of when your job will be complete.                                                               |
| `CompletedEmptyRecords`     | The Job has been completed, however, no records for the requested resource have been found. An empty file will be available at the Day endpoint.                                                                                                                            |
| `Completed`                 | The Job has completed, and the result files are available at the Day endpoint.                                                                                                                                                                                              |
| `Failed`                    | The Job was attempted, but an error prevented completion. This is a final status, as the job has already been tried multiple times and has not been successful. Try submitting the job again, or reach out to your Twilio support team if the problem continues to persist. |
| `RunningToBeDeleted`        | The Job is currently running, but it has been marked for deletion and will be deleted soon.                                                                                                                                                                                 |
| `DeletedByUserRequest`      | The Job has been marked for deletion. So the system will not attempt to run it.                                                                                                                                                                                             |

## Create an ExportCustomJob resource

`POST https://bulkexports.twilio.com/v1/Exports/{ResourceType}/Jobs`

### Path parameters

```json
[{"name":"ResourceType","in":"path","description":"The type of communication – Messages or Calls, Conferences, and Participants","schema":{"type":"string"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"CreateExportCustomJobRequest","required":["StartDay","EndDay","FriendlyName"],"properties":{"StartDay":{"type":"string","description":"The start day for the custom export specified as a string in the format of yyyy-mm-dd"},"EndDay":{"type":"string","description":"The end day for the custom export specified as a string in the format of yyyy-mm-dd. End day is inclusive and must be 2 days earlier than the current UTC day."},"FriendlyName":{"type":"string","description":"The friendly name specified when creating the job"},"WebhookUrl":{"type":"string","description":"The optional webhook url called on completion of the job. If this is supplied, `WebhookMethod` must also be supplied. If you set neither webhook nor email, you will have to check your job's status manually."},"WebhookMethod":{"type":"string","description":"This is the method used to call the webhook on completion of the job. If this is supplied, `WebhookUrl` must also be supplied."},"Email":{"type":"string","description":"The optional email to send the completion notification to. You can set both webhook, and email, or one or the other. If you set neither, the job will run but you will have to query to determine your job's status."}}},"examples":{"create":{"value":{"lang":"json","value":"{\n  \"EndDay\": \"end_day_value\",\n  \"StartDay\": \"start_day_value\",\n  \"WebhookUrl\": \"webhook_url_value\",\n  \"WebhookMethod\": \"webhook_method_value\",\n  \"FriendlyName\": \"friendly_name_value\",\n  \"Email\": \"email_value\"\n}","meta":"","code":"{\n  \"EndDay\": \"end_day_value\",\n  \"StartDay\": \"start_day_value\",\n  \"WebhookUrl\": \"webhook_url_value\",\n  \"WebhookMethod\": \"webhook_method_value\",\n  \"FriendlyName\": \"friendly_name_value\",\n  \"Email\": \"email_value\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"EndDay\"","#7EE787"],[":","#C9D1D9"]," ",["\"end_day_value\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"StartDay\"","#7EE787"],[":","#C9D1D9"]," ",["\"start_day_value\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"WebhookUrl\"","#7EE787"],[":","#C9D1D9"]," ",["\"webhook_url_value\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"WebhookMethod\"","#7EE787"],[":","#C9D1D9"]," ",["\"webhook_method_value\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"friendly_name_value\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Email\"","#7EE787"],[":","#C9D1D9"]," ",["\"email_value\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Create a new BulkExport custom job

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createExportCustomJob() {
  const exportCustomJob = await client.bulkexports.v1
    .exports("Messages")
    .exportCustomJobs.create({
      email: "you@example.com",
      endDay: "2019-11-30",
      friendlyName: "Export1",
      startDay: "2019-11-20",
      webhookMethod: "POST",
      webhookUrl: "https://www.example.com/bulkexporthook",
    });

  console.log(exportCustomJob.jobSid);
}

createExportCustomJob();
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

export_custom_job = client.bulkexports.v1.exports(
    "Messages"
).export_custom_jobs.create(
    start_day="2019-11-20",
    end_day="2019-11-30",
    friendly_name="Export1",
    email="you@example.com",
    webhook_method="POST",
    webhook_url="https://www.example.com/bulkexporthook",
)

print(export_custom_job.job_sid)
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

        var exportCustomJob = await ExportCustomJobResource.CreateAsync(
            startDay: "2019-11-20",
            endDay: "2019-11-30",
            friendlyName: "Export1",
            email: "you@example.com",
            webhookMethod: "POST",
            webhookUrl: "https://www.example.com/bulkexporthook",
            pathResourceType: "Messages");

        Console.WriteLine(exportCustomJob.JobSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.bulkexports.v1.export.ExportCustomJob;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ExportCustomJob exportCustomJob = ExportCustomJob.creator("Messages", "2019-11-20", "2019-11-30", "Export1")
                                              .setEmail("you@example.com")
                                              .setWebhookMethod("POST")
                                              .setWebhookUrl("https://www.example.com/bulkexporthook")
                                              .create();

        System.out.println(exportCustomJob.getJobSid());
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

	params := &bulkexports.CreateExportCustomJobParams{}
	params.SetStartDay("2019-11-20")
	params.SetEndDay("2019-11-30")
	params.SetFriendlyName("Export1")
	params.SetEmail("you@example.com")
	params.SetWebhookMethod("POST")
	params.SetWebhookUrl("https://www.example.com/bulkexporthook")

	resp, err := client.BulkexportsV1.CreateExportCustomJob("Messages",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.JobSid != nil {
			fmt.Println(*resp.JobSid)
		} else {
			fmt.Println(resp.JobSid)
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

$export_custom_job = $twilio->bulkexports->v1
    ->exports("Messages")
    ->exportCustomJobs->create(
        "2019-11-20", // StartDay
        "2019-11-30", // EndDay
        "Export1", // FriendlyName
        [
            "email" => "you@example.com",
            "webhookMethod" => "POST",
            "webhookUrl" => "https://www.example.com/bulkexporthook",
        ]
    );

print $export_custom_job->jobSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

export_custom_job = @client
                    .bulkexports
                    .v1
                    .exports('Messages')
                    .export_custom_jobs
                    .create(
                      start_day: '2019-11-20',
                      end_day: '2019-11-30',
                      friendly_name: 'Export1',
                      email: 'you@example.com',
                      webhook_method: 'POST',
                      webhook_url: 'https://www.example.com/bulkexporthook'
                    )

puts export_custom_job.job_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:bulkexports:v1:exports:jobs:create \
   --resource-type Messages \
   --start-day 2019-11-20 \
   --end-day 2019-11-30 \
   --friendly-name Export1 \
   --email you@example.com \
   --webhook-method POST \
   --webhook-url https://www.example.com/bulkexporthook
```

```bash
curl -X POST "https://bulkexports.twilio.com/v1/Exports/Messages/Jobs" \
--data-urlencode "StartDay=2019-11-20" \
--data-urlencode "EndDay=2019-11-30" \
--data-urlencode "FriendlyName=Export1" \
--data-urlencode "Email=you@example.com" \
--data-urlencode "WebhookMethod=POST" \
--data-urlencode "WebhookUrl=https://www.example.com/bulkexporthook" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "start_day": "2019-11-20",
  "job_sid": "JSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "Export1",
  "webhook_method": "POST",
  "details": [
    {}
  ],
  "end_day": "2019-11-30",
  "webhook_url": "https://www.example.com/bulkexporthook",
  "email": "you@example.com",
  "resource_type": "Messages",
  "job_queue_position": "1",
  "estimated_completion_time": "2021-03-15T20:20:14.547"
}
```

## Read multiple ExportCustomJob resources

`GET https://bulkexports.twilio.com/v1/Exports/{ResourceType}/Jobs`

### Path parameters

```json
[{"name":"ResourceType","in":"path","description":"The type of communication – Messages, Calls, Conferences, and Participants","schema":{"type":"string"},"required":true}]
```

### Query parameters

```json
[{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

Read the current list of export jobs for this resource type

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listExportCustomJob() {
  const exportCustomJobs = await client.bulkexports.v1
    .exports("Messages")
    .exportCustomJobs.list({ limit: 20 });

  exportCustomJobs.forEach((e) => console.log(e.friendlyName));
}

listExportCustomJob();
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

export_custom_jobs = client.bulkexports.v1.exports(
    "Messages"
).export_custom_jobs.list(limit=20)

for record in export_custom_jobs:
    print(record.friendly_name)
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

        var exportCustomJobs =
            await ExportCustomJobResource.ReadAsync(pathResourceType: "Messages", limit: 20);

        foreach (var record in exportCustomJobs) {
            Console.WriteLine(record.FriendlyName);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.bulkexports.v1.export.ExportCustomJob;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<ExportCustomJob> exportCustomJobs = ExportCustomJob.reader("Messages").limit(20).read();

        for (ExportCustomJob record : exportCustomJobs) {
            System.out.println(record.getFriendlyName());
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

	params := &bulkexports.ListExportCustomJobParams{}
	params.SetLimit(20)

	resp, err := client.BulkexportsV1.ListExportCustomJob("Messages",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].FriendlyName != nil {
				fmt.Println(*resp[record].FriendlyName)
			} else {
				fmt.Println(resp[record].FriendlyName)
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

$exportCustomJobs = $twilio->bulkexports->v1
    ->exports("Messages")
    ->exportCustomJobs->read(20);

foreach ($exportCustomJobs as $record) {
    print $record->friendlyName;
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

export_custom_jobs = @client
                     .bulkexports
                     .v1
                     .exports('Messages')
                     .export_custom_jobs
                     .list(limit: 20)

export_custom_jobs.each do |record|
   puts record.friendly_name
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:bulkexports:v1:exports:jobs:list \
   --resource-type Messages
```

```bash
curl -X GET "https://bulkexports.twilio.com/v1/Exports/Messages/Jobs?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "meta": {
    "previous_page_url": null,
    "url": "https://bulkexports.twilio.com/v1/Exports/Messages/Jobs?PageSize=50&Page=0",
    "page_size": 50,
    "key": "jobs",
    "first_page_url": "https://bulkexports.twilio.com/v1/Exports/Messages/Jobs?PageSize=50&Page=0",
    "next_page_url": null,
    "page": 0
  },
  "jobs": []
}
```
