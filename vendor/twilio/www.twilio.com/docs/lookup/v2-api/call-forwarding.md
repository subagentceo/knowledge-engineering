# Call Forwarding

> \[!IMPORTANT]
>
> Call Forwarding is in Private Beta. The information in this document could change. We might add or update features before the product becomes Generally Available. Beta products don't have a Service Level Agreement (SLA). Learn more about [beta product support](https://help.twilio.com/articles/115002413087-Twilio-Beta-product-support).

Use Call Forwarding to check if a mobile phone number is unconditionally forwarding calls. This helps you identify numbers that might be at risk of fraud.

## Coverage

Call Forwarding is only available for phone numbers owned by major carriers in the United Kingdom.

> \[!NOTE]
>
> Call Forwarding requires [carrier registration and approval](https://twlo.my.salesforce-sites.com/countrycarrier/SN_CarrierRegistration_VFP). Once approved, Call Forwarding bills per request, even if no data is returned. Requests for unsupported countries or carriers returns `null` but won't result in a charge. For additional pricing information, [contact Sales](https://www.twilio.com/en-us/help/sales).

## Run Call Forwarding

Make a [`GET /v2/PhoneNumbers/{PhoneNumber}`](/docs/lookup/v2-api#making-a-request) request with the `Fields=call_forwarding` query parameter.

```bash
curl -X GET "https://lookups.twilio.com/v2/PhoneNumbers/{PhoneNumber}?Fields=call_forwarding" \ -u
$TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

## Response properties

A Call Forwarding request returns the following properties.

| Property               | Description                                                                                              |
| :--------------------- | :------------------------------------------------------------------------------------------------------- |
| `CallForwardingStatus` | A Boolean indicating whether unconditional call forwarding is set for the requested mobile phone number. |
| `ErrorCode`            | The [error code](/docs/api/errors), if any, associated with your request.                                |

## Code examples and responses

Call Forwarding Lookup

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
    .phoneNumbers("+447772000001")
    .fetch({ fields: "call_forwarding" });

  console.log(phoneNumber.callForwarding);
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

phone_number = client.lookups.v2.phone_numbers("+447772000001").fetch(
    fields="call_forwarding"
)

print(phone_number.call_forwarding)
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
            pathPhoneNumber: "+447772000001", fields: "call_forwarding");

        Console.WriteLine(phoneNumber._CallForwarding);
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
        PhoneNumber phoneNumber = PhoneNumber.fetcher("+447772000001").setFields("call_forwarding").fetch();

        System.out.println(phoneNumber.getCallForwarding());
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
	params.SetFields("call_forwarding")

	resp, err := client.LookupsV2.FetchPhoneNumber("+447772000001",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.CallForwarding != (lookups.CallForwardingInfo{}) {
			fmt.Println(resp.CallForwarding)
		} else {
			fmt.Println(resp.CallForwarding)
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
    ->phoneNumbers("+447772000001")
    ->fetch(["fields" => "call_forwarding"]);

print $phone_number->callForwarding;
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
               .phone_numbers('+447772000001')
               .fetch(fields: 'call_forwarding')

puts phone_number.call_forwarding
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:lookups:v2:phone-numbers:fetch \
   --phone-number +447772000001 \
   --fields call_forwarding
```

```bash
curl -X GET "https://lookups.twilio.com/v2/PhoneNumbers/%2B447772000001?Fields=call_forwarding" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "calling_country_code": "44",
  "country_code": "GB",
  "phone_number": "+447772000001",
  "national_format": "07772 000001",
  "valid": true,
  "validation_errors": null,
  "caller_name": null,
  "sim_swap": null,
  "call_forwarding": {
    "call_forwarding_enabled": true,
    "error_code": null
  },
  "line_status": null,
  "line_type_intelligence": null,
  "identity_match": null,
  "reassigned_number": null,
  "sms_pumping_risk": null,
  "phone_number_quality_score": null,
  "pre_fill": null,
  "url": "https://lookups.twilio.com/v2/PhoneNumbers/+447772000001"
}
```
