# SIM Swap

> \[!WARNING]
>
> SIM Swap is in Private Beta. The information in this document could change. We might add or update features before the product becomes Generally Available. Beta products don't have a Service Level Agreement (SLA). Learn more about [beta product support](https://help.twilio.com/articles/115002413087-Twilio-Beta-product-support).

Use SIM Swap to retrieve details about the last SIM change for a mobile phone number. This helps you detect SIM swapping fraud and account takeovers. SIM Swap uses real-time authoritative data directly from mobile network operators. Learn more about [Lookup SIM Swap](/docs/lookup/lookup-sim-swap).

## Coverage

SIM Swap is available for phone numbers in the following countries.

> \[!NOTE]
>
> SIM Swap requires [carrier registration and approval](https://twlo.my.salesforce-sites.com/countrycarrier/SN_CarrierRegistration_VFP). Once approved, SIM Swap bills per request, even if no data is returned. Requests for unsupported countries or carriers returns `null` but won't result in a charge. For additional pricing information, [contact Sales](https://www.twilio.com/en-us/help/sales).
>
> SIM Swap coverage depends on data from the major carriers in each country. However, during the Beta phase, it might not include all major carriers. For more information on coverage and pricing, [contact Sales](https://www.twilio.com/en-us/help/sales).

#### Europe

* France
* Germany
* Italy
* Netherlands
* Spain
* United Kingdom

#### Latin America

* Brazil
* Colombia

#### North America

* Canada
* United States

**Note**: SIM Swap requests for Canadian phone numbers won't return carrier information, including `carrier_name`, `mobile_country_code`, and `mobile_network_code`, unless you have special approval. Learn [how to request access to Canadian Number Portability Administration Center (NPAC) data](https://help.twilio.com/articles/360004563433).

## Run SIM Swap

Make a [`GET /v2/PhoneNumbers/{PhoneNumber}`](/docs/lookup/v2-api#making-a-request) request with the `Fields=sim_swap` query parameter.

```bash
curl -X GET "https://lookups.twilio.com/v2/PhoneNumbers/{PhoneNumber}?Fields=sim_swap" \
  -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

## Response properties

A SIM Swap request returns the following properties.

| Property            | Description                                                                                                                          |
| :------------------ | :----------------------------------------------------------------------------------------------------------------------------------- |
| `MobileCountryCode` | The three-digit mobile country code of the carrier, used with the `mobile_network_code` to identify a mobile network operator.       |
| `MobileNetworkCode` | The two- or three-digit mobile network code of the carrier, used with the mobile country code to identify a mobile network operator. |
| `CarrierName`       | The name of the carrier.                                                                                                             |
| `LastSimSwap`       | An object that contains information on the last date the SIM was changed for a mobile phone number.                                  |
| `ErrorCode`         | The [error code](/docs/api/errors), if any, associated with your request.                                                            |

### `LastSimSwap` properties \[#lastsimswap-property-values]

> \[!NOTE]
>
> During onboarding, you need to configure the `SwappedPeriod` for countries that don't support the `LastSimSwapDate` property. For countries where `LastSimSwapDate` is available, the `SwappedPeriod` calculates automatically and `SwappedInPeriod` sets to `true`.

The `LastSimSwap` object includes the following properties.

| Value             | Description                                                                                                                                                                                                           |
| :---------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `LastSimSwapDate` | The [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) date and timestamp for when the Subscriber Identity Module (SIM) was last changed for the specified mobile phone number. Only returned for GB, DE, ES, and NL. |
| `SwappedPeriod`   | A threshold the customer has chosen during which `SwappedInPeriod` indicates if the SIM was changed for the specified mobile phone number within the threshold.                                                       |
| `SwappedInPeriod` | A Boolean indicating whether the SIM was changed for the specified mobile phone number during the trailing `SwappedPeriod`.                                                                                           |

Learn more about the [recommended implementation of `LastSimSwap`](/docs/lookup/lookup-sim-swap#how-to-use-the-last_sim_swap-fields).

## Code examples and responses

SIM Swap Lookup

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
    .fetch({ fields: "sim_swap" });

  console.log(phoneNumber.simSwap);
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
    fields="sim_swap"
)

print(phone_number.sim_swap)
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
            pathPhoneNumber: "+447772000001", fields: "sim_swap");

        Console.WriteLine(phoneNumber._SimSwap);
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
        PhoneNumber phoneNumber = PhoneNumber.fetcher("+447772000001").setFields("sim_swap").fetch();

        System.out.println(phoneNumber.getSimSwap());
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
	params.SetFields("sim_swap")

	resp, err := client.LookupsV2.FetchPhoneNumber("+447772000001",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.SimSwap != (lookups.SimSwapInfo{}) {
			fmt.Println(resp.SimSwap)
		} else {
			fmt.Println(resp.SimSwap)
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
    ->fetch(["fields" => "sim_swap"]);

print $phone_number->simSwap;
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
               .fetch(fields: 'sim_swap')

puts phone_number.sim_swap
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:lookups:v2:phone-numbers:fetch \
   --phone-number +447772000001 \
   --fields sim_swap
```

```bash
curl -X GET "https://lookups.twilio.com/v2/PhoneNumbers/%2B447772000001?Fields=sim_swap" \
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
  "sim_swap": {
    "last_sim_swap": {
      "last_sim_swap_date": "2020-04-27T10:18:50Z",
      "swapped_period": "PT48H",
      "swapped_in_period": true
    },
    "carrier_name": "Vodafone UK",
    "mobile_country_code": "276",
    "mobile_network_code": "02",
    "error_code": null
  },
  "call_forwarding": null,
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
