# Reassigned Number

Use Reassigned Number to verify whether the current owner of a phone number is the same as the previous owner. This helps you avoid sending messages to someone who hasn't consented to receive them and ensures compliance with the [Telephone Consumer Protection Act (TCPA)](/docs/glossary/what-is-telephone-consumer-protection-act-tcpa).

**Note**: You must obtain consent to contact a phone number before sending any messages.

## Coverage

Reassigned Number is only available for US phone numbers.

> \[!NOTE]
>
> Reassigned Number requires [carrier registration and approval](https://twlo.my.salesforce-sites.com/countrycarrier/SN_CarrierRegistration_VFP).

For pricing information, see [Twilio Lookup API pricing](https://www.twilio.com/en-us/user-authentication-identity/pricing/lookup).

## Run Reassigned Number

Make a [`GET /v2/PhoneNumbers/{PhoneNumber}`](/docs/lookup/v2-api#making-a-request) request with the following query parameters:

* `Fields=reassigned_number`
* `LastVerifiedDate`: The date you obtained consent to call or text the phone number, or the date when you last verified the phone number (for example, the date of last contact or the date they last updated their phone number). This must be in the format YYYYMMDD.

Reassigned Number Lookup

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchPhoneNumber() {
  const phoneNumber = await client.lookups.v2.phoneNumbers("2345678904").fetch({
    fields: "reassigned_number",
    lastVerifiedDate: "20211015",
  });

  console.log(phoneNumber.reassignedNumber);
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

phone_number = client.lookups.v2.phone_numbers("2345678904").fetch(
    fields="reassigned_number", last_verified_date="20211015"
)

print(phone_number.reassigned_number)
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
            pathPhoneNumber: "2345678904",
            fields: "reassigned_number",
            lastVerifiedDate: "20211015");

        Console.WriteLine(phoneNumber._ReassignedNumber);
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
        PhoneNumber phoneNumber =
            PhoneNumber.fetcher("2345678904").setFields("reassigned_number").setLastVerifiedDate("20211015").fetch();

        System.out.println(phoneNumber.getReassignedNumber());
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
	params.SetFields("reassigned_number")
	params.SetLastVerifiedDate("20211015")

	resp, err := client.LookupsV2.FetchPhoneNumber("2345678904",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.ReassignedNumber != (lookups.ReassignedNumberInfo{}) {
			fmt.Println(resp.ReassignedNumber)
		} else {
			fmt.Println(resp.ReassignedNumber)
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

$phone_number = $twilio->lookups->v2->phoneNumbers("2345678904")->fetch([
    "fields" => "reassigned_number",
    "lastVerifiedDate" => "20211015",
]);

print $phone_number->reassignedNumber;
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
               .phone_numbers('2345678904')
               .fetch(
                 fields: 'reassigned_number',
                 last_verified_date: '20211015'
               )

puts phone_number.reassigned_number
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:lookups:v2:phone-numbers:fetch \
   --phone-number 2345678904 \
   --fields reassigned_number \
   --last-verified-date 20211015
```

```bash
curl -X GET "https://lookups.twilio.com/v2/PhoneNumbers/2345678904?Fields=reassigned_number&LastVerifiedDate=20211015" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "calling_country_code": "1",
  "country_code": "US",
  "phone_number": "2345678904",
  "national_format": "(415) 992-9960",
  "valid": true,
  "validation_errors": [],
  "caller_name": null,
  "sim_swap": null,
  "call_forwarding": null,
  "line_status": null,
  "line_type_intelligence": null,
  "identity_match": null,
  "reassigned_number": {
    "last_verified_date": "2019-09-24",
    "is_number_reassigned": "no",
    "error_code": null
  },
  "sms_pumping_risk": null,
  "phone_number_quality_score": null,
  "pre_fill": null,
  "url": "https://lookups.twilio.com/v2/PhoneNumbers/+14159929960"
}
```

## Response properties

A Reassigned Number request returns the following properties.

| Property               | Description                                                                                               |
| ---------------------- | --------------------------------------------------------------------------------------------------------- |
| `is_number_reassigned` | Indicates whether a phone number has been reassigned to a new user since the provided `LastVerifiedDate`. |
| `ErrorCode`            | The [error code](/docs/api/errors), if any, associated with your request.                                 |

### `is_number_reassigned` values

The `is_number_reassigned` property can have the following values.

**Note**: Twilio uses the official database maintained by the Federal Communications Commission (FCC) to indicate whether a number has been reassigned.

| Value               | Description                                                                                                                                                                                                                        |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `yes`               | The phone number has been reassigned. Don't message this number.                                                                                                                                                                   |
| `no`                | The phone number still belongs to the same person. If you obtained consent to contact the number and queried the database using the date when consent was obtained, you're in compliance with the TCPA and can message the number. |
| `no_data_available` | Twilio doesn't have disconnect data for this phone number. This might indicate that the `LastVerifiedDate` is before January 2021. Twilio recommends validating consent to contact the phone number.                               |

## Suggested implementation logic

Twilio recommends querying the Reassigned Number package prior to sending any marketing materials or high risk transactions (such as financial transactions or password reset instructions) to a phone number. If the phone number no longer belongs to the person you're trying to contact, cancel the message and use another contact method to verify the user's phone number before sending any sensitive information.

The Reassigned Number database is updated monthly on the 16th of each month. If you need to verify a phone number's reassignment status more than once per month, Twilio suggests that you update your database starting on the 17th of each month. Data obtained on the 17th of the month will remain valid until the database is updated again on the 16th of the following month.

## Requests Per Second (RPS) limit

The Reassigned Number package enforces a rate limit of 50 requests per second (RPS) per account. If you exceed this limit, requests might be rejected with [Error 60616](/docs/api/errors/60616). To handle this error, Twilio recommends implementing retry logic with exponential backoff.
