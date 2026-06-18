# Job Resource

The Job resource allows you to view and delete the requests for exports of arbitrary date ranges, submitted through the ExportCustom Job.

## Job Properties

<OperationTable type="properties" data={{"type":"object","refName":"bulkexports.v1.export.job","modelName":"bulkexports_v1_export_job","properties":{"resource_type":{"type":"string","nullable":true,"description":"The type of communication – Messages, Calls, Conferences, and Participants"},"friendly_name":{"type":"string","nullable":true,"description":"The friendly name specified when creating the job"},"details":{"type":"array","nullable":true,"description":"The details of a job which is an object that contains an array of status grouped by `status` state.  Each `status` object has a `status` string, a count which is the number of days in that `status`, and list of days in that `status`. The day strings are in the format yyyy-MM-dd. As an example, a currently running job may have a status object for COMPLETED and a `status` object for SUBMITTED each with its own count and list of days."},"start_day":{"type":"string","nullable":true,"description":"The start time for the export specified when creating the job"},"end_day":{"type":"string","nullable":true,"description":"The end time for the export specified when creating the job"},"job_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^JS[0-9a-fA-F]{32}$","nullable":true,"description":"The job_sid returned when the export was created"},"webhook_url":{"type":"string","nullable":true,"description":"The optional webhook url called on completion"},"webhook_method":{"type":"string","nullable":true,"description":"This is the method used to call the webhook"},"email":{"type":"string","nullable":true,"description":"The optional email to send the completion notification to"},"url":{"type":"string","format":"uri","nullable":true},"job_queue_position":{"type":"string","nullable":true,"description":"This is the job position from the 1st in line. Your queue position will never increase. As jobs ahead of yours in the queue are processed, the queue position number will decrease"},"estimated_completion_time":{"type":"string","nullable":true,"description":"this is the time estimated until your job is complete. This is calculated each time you request the job list. The time is calculated based on the current rate of job completion (which may vary) and your job queue position"}}}} />

| ENUM:STATUS possible values |                                                                                                                                                                                                                                                                         |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ErrorDuringRun`            | The Job was attempted, but an error prevented completion. This is not a final status, the job will be retried.                                                                                                                                                          |
| `Submitted`                 | The Job has been successfully submitted and is in the queue to execute.                                                                                                                                                                                                 |
| `Running`                   | The job is currently running. The output should be available shortly. Multiple Jobs may run at the same time. You can use the 'estimated\_completion\_time' to get a sense of when your job will be complete.                                                           |
| `CompletedEmptyRecords`     | The Job has completed, however, no records for the requested resource have been found. An empty file will be available at the Day endpoint.                                                                                                                             |
| `Completed`                 | The Job is successfully completed, and the result files are available at the Day endpoint.                                                                                                                                                                              |
| `Failed`                    | The Job was attempted, but an error prevented completion. This is a final status, as the job has already been tried multiple times and has not been successful. Try submitting the job again, or reach out to your Twilio support team if problem continues to persist. |
| `RunningToBeDeleted`        | The Job is currently running, but it has been marked for deletion, and will be deleted soon.                                                                                                                                                                            |

## Fetch a Job resource

`GET https://bulkexports.twilio.com/v1/Exports/Jobs/{JobSid}`

### Path parameters

```json
[{"name":"JobSid","in":"path","description":"The unique string that that we created to identify the Bulk Export job","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^JS[0-9a-fA-F]{32}$"},"required":true}]
```

Fetch a Job

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchJob() {
  const job = await client.bulkexports.v1.exports
    .jobs("JSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch();

  console.log(job.resourceType);
}

fetchJob();
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

job = client.bulkexports.v1.exports.jobs(
    "JSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).fetch()

print(job.resource_type)
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

        var job = await JobResource.FetchAsync(pathJobSid: "JSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(job.ResourceType);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.bulkexports.v1.export.Job;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Job job = Job.fetcher("JSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").fetch();

        System.out.println(job.getResourceType());
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

	resp, err := client.BulkexportsV1.FetchJob("JSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.ResourceType != nil {
			fmt.Println(*resp.ResourceType)
		} else {
			fmt.Println(resp.ResourceType)
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

$job = $twilio->bulkexports->v1->exports
    ->jobs("JSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->fetch();

print $job->resourceType;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

job = @client
      .bulkexports
      .v1
      .exports
      .jobs('JSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
      .fetch

puts job.resource_type
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:bulkexports:v1:exports:jobs:fetch \
   --job-sid JSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://bulkexports.twilio.com/v1/Exports/Jobs/JSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "start_day": "start_day",
  "job_sid": "JSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://bulkexports.twilio.com/v1/Exports/Jobs/JSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "friendly_name",
  "end_day": "end_day",
  "details": [
    {}
  ],
  "webhook_url": "https://webhookexample.com",
  "webhook_method": "webhook_method",
  "email": "email",
  "resource_type": "resource_type",
  "job_queue_position": "1",
  "estimated_completion_time": "2021-03-15T20:20:14.547"
}
```

## Delete a Job resource

`DELETE https://bulkexports.twilio.com/v1/Exports/Jobs/{JobSid}`

### Path parameters

```json
[{"name":"JobSid","in":"path","description":"The unique string that that we created to identify the Bulk Export job","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^JS[0-9a-fA-F]{32}$"},"required":true}]
```

Delete a Job

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function deleteJob() {
  await client.bulkexports.v1.exports
    .jobs("JSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .remove();
}

deleteJob();
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

client.bulkexports.v1.exports.jobs(
    "JSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).delete()
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

        await JobResource.DeleteAsync(pathJobSid: "JSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.bulkexports.v1.export.Job;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Job.deleter("JSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete();
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

	err := client.BulkexportsV1.DeleteJob("JSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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

$twilio->bulkexports->v1->exports
    ->jobs("JSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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
  .bulkexports
  .v1
  .exports
  .jobs('JSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  .delete
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:bulkexports:v1:exports:jobs:remove \
   --job-sid JSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X DELETE "https://bulkexports.twilio.com/v1/Exports/Jobs/JSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```
