# Line Type Intelligence

Use Line Type Intelligence to identify the carrier and phone line type, such as mobile, landline, fixed VoIP, non-fixed VoIP, toll free, and more. For example, you can filter out landline numbers from a list before sending SMS messages.

## Coverage

Line Type Intelligence is available for phone numbers worldwide.

**Note**: Canadian phone numbers require special approval. Learn [how to request access to Canadian Number Portability Administration Center (NPAC) data](https://help.twilio.com/articles/360004563433). Querying a Canadian phone number without access will return a [60601 error](/docs/api/errors/60601).

## Run line type intelligence

Make a [`GET /v2/PhoneNumbers/{PhoneNumber}`](/docs/lookup/v2-api#making-a-request) request with the `Fields=line_type_intelligence` query parameter.

```bash
curl -X GET "https://lookups.twilio.com/v2/PhoneNumbers/{PhoneNumber}?Fields=line_type_intelligence" \ -u
$TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

## Response properties

The response includes the `line_type_intelligence` object, which includes the following properties:

| Property              | Description                                                                                                                                                                    |
| :-------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mobile_country_code` | The three-digit mobile country code of the carrier, used with the `mobile_network_code` to identify a mobile network operator.                                                 |
| `mobile_network_code` | The two- or three-digit mobile network code of the carrier, used with the mobile country code to identify a mobile network operator. This is only returned for mobile numbers. |
| `carrier_name`        | The name of the carrier.                                                                                                                                                       |
| `type`                | The phone number type.                                                                                                                                                         |
| `error_code`          | The [error code](/docs/api/errors). If there's no error, this value will be `null`.                                                                                            |

### `type` property values

> \[!WARNING]
>
> Carrier data isn't available for phone number types: `personal`, `tollFree`, `premium`, `sharedCost`, `uan`, `voicemail`, `pager`, or `unknown`. In these cases `mobile_country_code`, `mobile_network_code`, and `carrier_name` values will be `null`.

The following are the possible values for the `type` property.

| Value          | Description                                                                                                                           |
| :------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `landline`     | A landline number that generally can't receive SMS messages.                                                                          |
| `mobile`       | A mobile number that generally can receive SMS messages.                                                                              |
| `fixedVoip`    | A virtual phone number associated with a physical device. For example, Comcast or Vonage.                                             |
| `nonFixedVoip` | A virtual phone number obtained online without requiring a physical device. For example, Google Voice or Enflick.                     |
| `personal`     | A phone number designated for personal use.                                                                                           |
| `tollFree`     | A toll-free phone number where calls are free for the calling party.                                                                  |
| `premium`      | A premium-rate phone number. These numbers typically charge higher-than-normal rates for special services.                            |
| `sharedCost`   | A shared cost phone number. The calling party and number subscriber share the charges. These numbers charge higher-than-normal rates. |
| `uan`          | A universal access number. This is a national number that can route incoming calls to different destinations.                         |
| `voicemail`    | A phone number associated with a voicemail service.                                                                                   |
| `pager`        | A phone number associated with a pager device.                                                                                        |
| `unknown`      | A valid phone number, but the line type is unknown.                                                                                   |

## Code examples and responses

Line Type Intelligence Lookup

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
    .fetch({ fields: "line_type_intelligence" });

  console.log(phoneNumber.lineTypeIntelligence);
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
    fields="line_type_intelligence"
)

print(phone_number.line_type_intelligence)
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
            pathPhoneNumber: "+14159929960", fields: "line_type_intelligence");

        Console.WriteLine(phoneNumber._LineTypeIntelligence);
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
        PhoneNumber phoneNumber = PhoneNumber.fetcher("+14159929960").setFields("line_type_intelligence").fetch();

        System.out.println(phoneNumber.getLineTypeIntelligence());
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
	params.SetFields("line_type_intelligence")

	resp, err := client.LookupsV2.FetchPhoneNumber("+14159929960",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.LineTypeIntelligence != (lookups.LineTypeIntelligenceInfo{}) {
			fmt.Println(resp.LineTypeIntelligence)
		} else {
			fmt.Println(resp.LineTypeIntelligence)
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
    ->fetch(["fields" => "line_type_intelligence"]);

print $phone_number->lineTypeIntelligence;
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
               .fetch(fields: 'line_type_intelligence')

puts phone_number.line_type_intelligence
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:lookups:v2:phone-numbers:fetch \
   --phone-number +14159929960 \
   --fields line_type_intelligence
```

```bash
curl -X GET "https://lookups.twilio.com/v2/PhoneNumbers/%2B14159929960?Fields=line_type_intelligence" \
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
  "caller_name": null,
  "sim_swap": null,
  "call_forwarding": null,
  "line_status": null,
  "line_type_intelligence": {
    "error_code": null,
    "mobile_country_code": "240",
    "mobile_network_code": "38",
    "carrier_name": "Twilio - SMS/MMS-SVR",
    "type": "nonFixedVoip"
  },
  "identity_match": null,
  "reassigned_number": null,
  "sms_pumping_risk": null,
  "phone_number_quality_score": null,
  "pre_fill": null,
  "url": "https://lookups.twilio.com/v2/PhoneNumbers/+14159929960"
}
```

## Video example

The video below demonstrates how to check a phone number's line type with Lookup using Node.js and the [Twilio Node SDK](https://github.com/twilio/twilio-node).

https://www.youtube.com/watch?v=d8GfbPBaSuM
