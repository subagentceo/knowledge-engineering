# Voice in Twilio Flex

Flex offers basic functionality for inbound and [outbound calling capabilities](/docs/glossary/what-is-flex-dialpad) by default. You can augment existing calls using the [Programmable Voice API](/docs/voice). Programmable Voice can also be used, alongside other tools like Studio, to set up custom call flows.

Additionally, the Flex UI offers you the ability to customize existing behaviors for inbound and outbound calls using the Actions Framework and Notifications Framework.

## Track Voice Usage

You can pull calls in your Flex account by using the [Usage Records API](/docs/usage/api/usage-record) and passing `pstnconnectivity` as the Category parameter. This will show your [Programmable Voice](/docs/voice) usage over the PSTN (aka, the actual telephone network.)

Get PSTN Usage

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listUsageRecord() {
  const records = await client.usage.records.list({
    category: "pstnconnectivity",
    limit: 20,
  });

  records.forEach((r) => console.log(r.end));
}

listUsageRecord();
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

records = client.usage.records.list(category="pstnconnectivity", limit=20)

for record in records:
    print(record.end)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account.Usage;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var records = await RecordResource.ReadAsync(category: "pstnconnectivity", limit: 20);

        foreach (var record in records) {
            Console.WriteLine(record.End);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.usage.Record;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Record> records = Record.reader().setCategory("pstnconnectivity").limit(20).read();

        for (Record record : records) {
            System.out.println(record.getEnd());
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
	api "github.com/twilio/twilio-go/rest/api/v2010"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.ListUsageRecordParams{}
	params.SetCategory("pstnconnectivity")
	params.SetLimit(20)

	resp, err := client.Api.ListUsageRecord(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].End != nil {
				fmt.Println(*resp[record].End)
			} else {
				fmt.Println(resp[record].End)
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

$records = $twilio->usage->records->read(
    ["category" => "pstnconnectivity"],
    20
);

foreach ($records as $record) {
    print $record->end;
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

records = @client
          .api
          .v2010
          .usage
          .records
          .list(
            category: 'pstnconnectivity',
            limit: 20
          )

records.each do |record|
   puts record.end
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:usage:records:list \
   --category pstnconnectivity
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Usage/Records.json?Category=pstnconnectivity&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "end": 0,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records.json?Category=calleridlookups&StartDate=2008-01-02&EndDate=2008-01-02&PageSize=1&Page=0",
  "next_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records.json?Category=calleridlookups&StartDate=2008-01-02&EndDate=2008-01-02&PageSize=1&Page=1&PageToken=APMQ%3D%3D",
  "page": 0,
  "page_size": 1,
  "previous_page_uri": null,
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records.json?Category=calleridlookups&StartDate=2008-01-02&EndDate=2008-01-02&PageSize=1&Page=0",
  "usage_records": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "api_version": "2010-04-01",
      "as_of": "2019-06-24T22:32:49+00:00",
      "category": "calleridlookups",
      "count": null,
      "count_unit": "",
      "description": "Caller Name Lookups",
      "end_date": "2008-01-02",
      "price": "2192.84855",
      "price_unit": "usd",
      "start_date": "2008-01-02",
      "subresource_uris": {
        "all_time": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/AllTime.json?Category=calleridlookups",
        "daily": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/Daily.json?Category=calleridlookups",
        "last_month": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/LastMonth.json?Category=calleridlookups",
        "monthly": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/Monthly.json?Category=calleridlookups",
        "this_month": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/ThisMonth.json?Category=calleridlookups",
        "today": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/Today.json?Category=calleridlookups",
        "yearly": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/Yearly.json?Category=calleridlookups",
        "yesterday": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records/Yesterday.json?Category=calleridlookups"
      },
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Usage/Records.json?Category=calleridlookups&StartDate=2008-01-02&EndDate=2008-01-02",
      "usage": "2192.84855",
      "usage_unit": "usd"
    }
  ]
}
```

## End User Guides

Receiving a call is one of the basic interactions with the Flex UI. Other workflows, like making an outbound call or transferring a call, are more complex. The following end user guides explain how these interactions work in the Flex UI in more detail.

* [Warm Transfer End User Guide](/docs/flex/end-user-guide/warm-transfer)
* [Flex Dialpad End User Guide](/docs/flex/end-user-guide/dialpad-use)

## Next Steps

* Customize your contact center's call flows using [Programmable Voice](/docs/voice) or [Studio](/docs/studio)
* Learn more about outbound calling with the Flex Dialpad
* Learn about [messaging channel implementations in Flex](/docs/flex/developer/messaging)
