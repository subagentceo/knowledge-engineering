# Bulk Export API overview

> \[!WARNING]
>
> The Bulk Export API isn't available when using [Twilio Regions](/docs/global-infrastructure) Ireland (IE1) or Australia (AU1). The Bulk Export API supports only the default US1 region. For a full list of product and feature support for Twilio Regions, see the [Global Infrastructure docs](/docs/global-infrastructure/regional-product-and-feature-availability).

The BulkExport API is an efficient way to retrieve all of your activity logs from the Twilio platform on an ongoing basis, or for one-off downloads. Using BulkExport, you can access daily dumps of the previous day's Messages, Calls, Conferences, or conference Participants, eliminating the need to iterate through the list resource one page at a time to download your records. The BulkExport files are automatically removed after seven days. You can also use BulkExport to generate a set of historical daily dumps over a range of dates.

## Manage Log Archives in the Console

You can configure daily exports, run custom export jobs, and download generated files from the Console instead of the API.

## Twilio Console

1. Open [Twilio Console](https://1console.twilio.com/) and go to [**Voice** > **Settings** > **Log archives**](https://1console.twilio.com/go?to=/account/__account__/us1/voice/settings/log-archives-settings). For SMS data, go to the equivalent page in **Messaging** > **Settings**.
2. On the **Custom jobs** tab, select **Setup daily exports** to have Twilio generate and deliver a file each day for the selected resource types.
3. On the same tab, select **Create custom job** to export a specific date range. Choose the resource type, start and end dates, and an optional webhook or email for notification.
4. On the **Files** tab, download generated files. Files are available for seven days after generation.

## Legacy Console

1. Log in to the [legacy Console](https://console.twilio.com/) and go to **Voice** > **Settings** > the relevant archives page ([Calls](https://www.twilio.com/console/voice/settings/calls-archives), [Conferences](https://www.twilio.com/console/voice/settings/conferences-archives), or [Participants](https://www.twilio.com/console/voice/settings/participants-archives)).
2. Configure daily exports and custom jobs on the archives page.
3. Download generated files from the same page. Files are available for seven days after generation.

When a BulkExport completes, it can fire a webhook or send an email. This applies to the daily export, if configured, and to custom jobs. In both cases, successful exports generate a **Day** resource for each day requested.

BulkExport is useful for any of the following scenarios:

* A data warehouse where you want to store messaging traffic to perform analysis.
* A compliance store where messaging should be retained so that you have a permanent record.
* Requirements to produce data.

## Base URL

Control over BulkExports and the data exported is available under the following URL:

```bash
https://bulkexports.twilio.com/v1/Exports/<resource_type>
```

## How BulkExport works

There are four parts to BulkExport:

* A configuration that allows [Twilio Editions](https://www.twilio.com/en-us/editions) customers to set automatic exports for each day.
* A way to export a specified day's traffic.
* A means to manage exports in progress.
* A list of exported days with their output files.

### ExportConfiguration

The **ExportConfiguration** resource lets [Twilio Editions](https://www.twilio.com/en-us/editions) customers enable automatic daily exports. Users of both automatic daily exports and custom jobs can configure a webhook that notifies you when the day's file is available, and you can then download and process your data.

### Custom Jobs

Jobs lets you choose a range of dates to export data for. One data file will be generated for each day in the range. A parent account and all associated subaccounts can request data for up to a total of 366 days within a UTC calendar day. If requesting a subaccount, the parent account will be used to determine the number of days being requested within a UTC calendar day. For instance, if you submit requests across several subaccounts, and the aggregate number of requested days exceeds 366 within 24 hours, your request will be rejected. In this instance, you'll need to wait until the next UTC calendar day to make any further requests. The result data for the requested days will be visible using the [Day resource](/docs/usage/bulkexport/day). You will receive a callback and/or email for each job that is completed. When a custom job completes, it will generate one [Day resource](/docs/usage/bulkexport/day) for each day in the requested period.

By default, the system will send bulk export job initiation notifications to account Owners and Admins, so they can keep a tab on the export requests, and flag/delete unwanted requests. Admins will be able to [unsubscribe to these notifications](https://help.twilio.com/hc/en-us/articles/8129113686171-How-to-Manage-Your-Own-Notification-Preferences-on-Twilio) from the notification center on the console.

### Jobs

Get a list of jobs in progress or that have recently been completed. Completed jobs will appear on the job list for seven days. You can delete jobs before they are complete.

### Exported days

The **Days** resource lets you examine the list of exported days available, either because they have been already generated by an export job or an automatic daily export. Each day file is named with the ISO 8601 date, and days are listed in order of generation.

There is no way to delete completed Day files, but they will be deleted automatically seven days after their creation.

## Subresources

| Resource                                                          | Description                                                                                                                         |
| ----------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| [ExportConfiguration](/docs/usage/bulkexport/exportconfiguration) | Configure export webhooks. [Twilio Editions](https://www.twilio.com/en-us/editions) customers can also set automatic daily exports. |
| [ExportCustomJob](/docs/usage/bulkexport/export-custom-job)       | Create new jobs to export data, and list current jobs and their status. Running a job will create the corresponding Days.           |
| [Jobs](/docs/usage/bulkexport/job)                                | View the status of current jobs, and delete incomplete custom jobs.                                                                 |
| [Days](/docs/usage/bulkexport/day)                                | List and fetch the exported message data for given days.                                                                            |

## Use BulkExport

There are two ways to use BulkExport:

1. If you're a [Twilio Editions](https://www.twilio.com/en-us/editions) customer, you can enable the daily export using the [ExportConfiguration](/docs/usage/bulkexport/exportconfiguration) resource. This will generate one data file per day for every resource enabled. The system typically tries to create a data file based on the state of the data at that point but may be delayed occasionally.
2. Create custom jobs using the [ExportCustomJob resource](/docs/usage/bulkexport/export-custom-job).

You can then use the [Day resource](/docs/usage/bulkexport/day) to list all completed exports by day and to download the message data for any of those days.

You can also delete Call records; see the [delete BulkExport Call records section below](#delete-bulkexport-call-records) to learn how.

## BulkExport file formats

All Day files are stored and returned as compressed GZIP JSON files with one record per line.

All records have timestamps in UTC in ISO 8601 format.

Records differ slightly from their associated API resources. This section outlines the differences for Messages, Calls, Conferences, and Participants resources.

### Message records

BulkExport Message records are similar to the [**Message** resource](/docs/messaging/api/message-resource). The differences are:

* Price data may not be present for every Message record.
* The following fields are not present:
  * `price_units`
  * `api_version`
  * `error_message` (but `error_code` is)
  * `uri`
  * `subresource_uris` (containing the media URLs)

### Call records

BulkExport Call records are similar to the [**Calls** resource](/docs/voice/api/call-resource). The differences are:

* Price data may not be present for every Call record.
* The following fields are not present:
  * `uri`
  * `subresource_uris`

You can delete BulkExport Call records. See the [Delete archived Calls section below](#delete-bulkexport-call-records) for more information.

### Conference records

BulkExport Conference records are similar to the [**Conferences** resource](/docs/voice/api/conference-resource). The differences are:

* The following fields are not present:
  * `api_version`
  * `uri`
  * `subresource_uris`

### Participants records

BulkExport Participant records are similar to the [**Participants** resource](/docs/voice/api/conference-participant-resource). The differences are:

* The following fields are not present:
  * `uri`
  * `label`

## Delete BulkExport Call records

You can delete BulkExport Call records using the `DELETE` request shown below.

The BulkExport Call record is separate from the Call resource. Therefore:

* This `DELETE` request does not delete the associated [Call resource](/docs/voice/api/call-resource) for Calls that are less than 13 months old. (However, If you delete a [Call Resource](/docs/voice/api/call-resource#delete-a-call-resource), the Call's BulkExport record is also deleted.)
* Calls older than 13 months are only accessible via BulkExport, and this `DELETE` request deletes the Call record.

Twilio handles BulkExport Call record deletions asynchronously and in batches. It may take up to one week for a BulkExport Call record to be removed.

### Path parameters

```json
[{"name":"Date","in":"path","description":"The date of the Call in UTC.","schema":{"type":"string","format":"date"},"required":true},{"name":"Sid","in":"path","description":"The Twilio-provided Call SID that uniquely identifies the Call resource to delete","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^CA[0-9a-fA-F]{32}$"},"required":true}]
```

Delete an archived Call

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function deleteArchivedCall() {
  await client.voice.v1
    .archivedCalls("2022-02-27", "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .remove();
}

deleteArchivedCall();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client
from datetime import date

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

client.voice.v1.archived_calls(
    date(2022, 2, 27), "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).delete()
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Voice.V1;
using System.Threading.Tasks;
using Twilio.Converters;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        await ArchivedCallResource.DeleteAsync(
            pathDate: MarshalConverter.DateTimeFromString("2022-02-27"),
            pathSid: "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.time.LocalDate;
import com.twilio.Twilio;
import com.twilio.rest.voice.v1.ArchivedCall;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ArchivedCall.deleter(LocalDate.of(2022, 2, 27), "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").delete();
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

	err := client.VoiceV1.DeleteArchivedCall("2022-02-27",
		"CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
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

$twilio->voice->v1
    ->archivedCalls(
        new \DateTime("2022-02-27"),
        "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    )
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
  .voice
  .v1
  .archived_calls(Date.new(2022, 2, 27), 'CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  .delete
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:voice:v1:archives:calls:remove \
   --date 2022-02-27 \
   --sid CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X DELETE "https://voice.twilio.com/v1/Archives/2022-02-27/Calls/CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```
