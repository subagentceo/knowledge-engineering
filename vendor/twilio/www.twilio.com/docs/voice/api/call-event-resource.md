# Events subresource

Events is a subresource of [Calls](/docs/voice/api/call-resource) and shows all the requests Twilio sent to your application and how your application responded for a specific call. You can access the Call Event resource 15 minutes after a call ends.

## Event Properties

<OperationTable type="properties" data={{"title":"ListCallEventResponse","type":"object","properties":{"end":{"type":"integer"},"first_page_uri":{"format":"uri","type":"string"},"next_page_uri":{"format":"uri","nullable":true,"type":"string"},"page":{"type":"integer"},"page_size":{"type":"integer"},"previous_page_uri":{"format":"uri","nullable":true,"type":"string"},"start":{"type":"integer"},"uri":{"format":"uri","type":"string"},"events":{"type":"array","items":{"type":"object","refName":"api.v2010.account.call.call_event","modelName":"api_v2010_account_call_call_event","properties":{"request":{"nullable":true,"description":"Contains a dictionary representing the request of the call.","x-twilio":{"pii":{"handling":"sensitive","deleteSla":30}}},"response":{"nullable":true,"description":"Contains a dictionary representing the call response, including a list of the call events.","x-twilio":{"pii":{"handling":"sensitive","deleteSla":30}}}}}}}}} />

### `request`

The `request` property represents the [request that Twilio made to your application](/docs/voice/twiml#twilios-request-to-your-application). It contains the `url`, `method`, and `parameters`.

> \[!NOTE]
>
> The `parameters` property keys are presented in **snake\_case** format, lower cased and words separated by underscores.
>
> For example, the results from your [`AddOns`](/docs/marketplace) will be found under the key `add_ons`.

### `response`

The `response` property represents what your application sent back to Twilio. It contains `date_created`, `request_duration`, `response_code`, `content_type`, and `response_body`.

You can use this information to ensure you are producing the intended [Voice TwiML](/docs/voice/twiml).

## Retrieve a list of Events

`GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Events.json`

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The unique SID identifier of the Account.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true},{"name":"CallSid","in":"path","description":"The unique SID identifier of the Call.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^CA[0-9a-fA-F]{32}$"},"required":true}]
```

### Query parameters

```json
[{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

Retrieve a list of all events for a call

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listCallEvent() {
  const events = await client
    .calls("CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .events.list({ limit: 20 });

  events.forEach((e) => console.log(e.end));
}

listCallEvent();
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

events = client.calls("CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").events.list(
    limit=20
)

for record in events:
    print(record.end)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account.Call;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var _events = await EventResource.ReadAsync(
            pathCallSid: "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", limit: 20);

        foreach (var record in _events) {
            Console.WriteLine(record.End);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.call.Event;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Event> events = Event.reader("CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").limit(20).read();

        for (Event record : events) {
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

	params := &api.ListCallEventParams{}
	params.SetLimit(20)

	resp, err := client.Api.ListCallEvent("CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		params)
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

$events = $twilio
    ->calls("CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->events->read(20);

foreach ($events as $record) {
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

events = @client
         .api
         .v2010
         .calls('CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
         .events
         .list(limit: 20)

events.each do |record|
   puts record.end
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:calls:events:list \
   --call-sid CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Events.json?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "events": [
    {
      "request": {
        "method": "POST",
        "url": "https://api.twilio.com/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
        "parameters": {
          "status_callback_method": "POST",
          "twiml": "<Response><Say>Hi!</Say></Response>",
          "trim": "trim-silence",
          "timeout": "55",
          "method": "POST",
          "from": "+987654321",
          "to": "+123456789",
          "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          "machine_detection_timeout": "0"
        }
      },
      "response": {
        "response_code": 201,
        "request_duration": 50,
        "content_type": "application/json",
        "response_body": "{\"sid\": \"CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"}",
        "date_created": "Tue, 11 Aug 2020 17:44:08 +0000"
      }
    }
  ],
  "end": 0,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Events.json?PageSize=50&Page=0",
  "next_page_uri": null,
  "page": 0,
  "page_size": 50,
  "previous_page_uri": null,
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Events.json?PageSize=50&Page=0"
}
```
