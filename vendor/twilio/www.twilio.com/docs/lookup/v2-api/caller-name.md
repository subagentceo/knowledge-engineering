# Caller Name

Use Caller Name to retrieve the caller's name and type (business or consumer) for a mobile phone number.

## Coverage

Caller Name is only available for phone numbers owned by carriers in the United States. The data is sourced from [CNAM](https://help.twilio.com/hc/en-us/articles/360051670533-Getting-Started-with-CNAM-Caller-ID).

> \[!NOTE]
>
> Caller Name is billed per request, even if no data is returned. Requests for phone numbers outside the US will return `null` but won't be charged. For additional pricing information, [contact Sales](https://www.twilio.com/en-us/help/sales).

## Run Caller Name

Make a [`GET /v2/PhoneNumbers/{PhoneNumber}`](/docs/lookup/v2-api#making-a-request) request with the `Fields=caller_name` query parameter.

```bash
curl -X GET "https://lookups.twilio.com/v2/PhoneNumbers/{PhoneNumber}?Fields=caller_name" \ -u 
$TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

## Response properties

A Caller Name request returns the following properties.

| Property     | Description                                                                                            |
| :----------- | :----------------------------------------------------------------------------------------------------- |
| `CallerName` | The name of the owner of the phone number. If not available, this will be `null`.                      |
| `CallerType` | The caller type. Possible values are `BUSINESS` and `CONSUMER`. If not available, this will be `null`. |
| `ErrorCode`  | The [error code](/docs/api/errors), if any, associated with your request.                              |

## Code examples and responses

Caller Name Lookup

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchPhoneNumber() {
  const phoneNumber = await client.lookups.v2
    .phoneNumbers("+14159929960")
    .fetch({ fields: "caller_name" });

  console.log(phoneNumber.callerName);
}

fetchPhoneNumber();
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

phone_number = client.lookups.v2.phone_numbers("+14159929960").fetch(
    fields="caller_name"
)

print(phone_number.caller_name)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Lookups.V2;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var phoneNumber = await PhoneNumberResource.FetchAsync(
            pathPhoneNumber: "+14159929960", fields: "caller_name");

        Console.WriteLine(phoneNumber._CallerName);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.lookups.v2.PhoneNumber;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        PhoneNumber phoneNumber = PhoneNumber.fetcher("+14159929960").setFields("caller_name").fetch();

        System.out.println(phoneNumber.getCallerName());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	lookups "github.com/twilio/twilio-go/rest/lookups/v2"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &lookups.FetchPhoneNumberParams{}
	params.SetFields("caller_name")

	resp, err := client.LookupsV2.FetchPhoneNumber("+14159929960",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.CallerName != (lookups.CallerNameInfo{}) {
			fmt.Println(resp.CallerName)
		} else {
			fmt.Println(resp.CallerName)
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

$phone_number = $twilio->lookups->v2
    ->phoneNumbers("+14159929960")
    ->fetch(["fields" => "caller_name"]);

print $phone_number->callerName;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

phone_number = @client
               .lookups
               .v2
               .phone_numbers('+14159929960')
               .fetch(fields: 'caller_name')

puts phone_number.caller_name
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:lookups:v2:phone-numbers:fetch \
   --phone-number +14159929960 \
   --fields caller_name
```

```bash
curl -X GET "https://lookups.twilio.com/v2/PhoneNumbers/%2B14159929960?Fields=caller_name" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "calling_country_code": "1",
  "country_code": "US",
  "phone_number": "+14159929960",
  "national_format": "(415) 992-9960",
  "valid": true,
  "validation_errors": null,
  "caller_name": {
    "caller_name": "Sergio Suarez",
    "caller_type": "CONSUMER",
    "error_code": null
  },
  "sim_swap": null,
  "call_forwarding": null,
  "line_status": null,
  "line_type_intelligence": null,
  "identity_match": null,
  "reassigned_number": null,
  "sms_pumping_risk": null,
  "phone_number_quality_score": null,
  "pre_fill": null,
  "url": "https://lookups.twilio.com/v2/PhoneNumbers/+14159929960"
}
```
