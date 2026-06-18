# SMS Pumping Risk Score

Use SMS Pumping Risk Score to get real-time assessments of phone numbers and determine whether they're involved in [SMS pumping fraud](/docs/verify/preventing-toll-fraud#what-is-sms-pumping). SMS Pumping Risk Score is based on a proprietary risk model built from Twilio's network data, including signals from [Verify Fraud Guard](/docs/verify/preventing-toll-fraud/sms-fraud-guard) and risky carriers, unusual SMS traffic patterns, and low conversion rates. You can integrate SMS Pumping Risk Score into your in-house SMS pumping fraud detection service to evaluate SMS traffic regardless of the messaging provider you use to send traffic.

## Coverage

SMS Pumping Risk Score is available for phone numbers worldwide.

**Note**: Canadian phone numbers don't return carrier information. Twilio doesn't recommend using SMS Pumping Risk Score for US or Canadian phone numbers, as these regions are generally not targeted by SMS pumping fraud.

## Run SMS Pumping Risk Score

Make a [`GET /v2/PhoneNumbers/{PhoneNumber}`](/docs/lookup/v2-api#making-a-request) request with the `Fields=sms_pumping_risk` query parameter.

SMS Pumping Risk Score Lookup

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
    .fetch({ fields: "sms_pumping_risk" });

  console.log(phoneNumber.smsPumpingRisk);
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
    fields="sms_pumping_risk"
)

print(phone_number.sms_pumping_risk)
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
            pathPhoneNumber: "+447772000001", fields: "sms_pumping_risk");

        Console.WriteLine(phoneNumber._SmsPumpingRisk);
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
        PhoneNumber phoneNumber = PhoneNumber.fetcher("+447772000001").setFields("sms_pumping_risk").fetch();

        System.out.println(phoneNumber.getSmsPumpingRisk());
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
	params.SetFields("sms_pumping_risk")

	resp, err := client.LookupsV2.FetchPhoneNumber("+447772000001",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.SmsPumpingRisk != (lookups.SmsPumpingRiskInfo{}) {
			fmt.Println(resp.SmsPumpingRisk)
		} else {
			fmt.Println(resp.SmsPumpingRisk)
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
    ->fetch(["fields" => "sms_pumping_risk"]);

print $phone_number->smsPumpingRisk;
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
               .fetch(fields: 'sms_pumping_risk')

puts phone_number.sms_pumping_risk
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:lookups:v2:phone-numbers:fetch \
   --phone-number +447772000001 \
   --fields sms_pumping_risk
```

```bash
curl -X GET "https://lookups.twilio.com/v2/PhoneNumbers/%2B447772000001?Fields=sms_pumping_risk" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "calling_country_code": "1",
  "country_code": "US",
  "phone_number": "+447772000001",
  "national_format": "(415) 992-9960",
  "valid": true,
  "validation_errors": [],
  "caller_name": null,
  "sim_swap": null,
  "call_forwarding": null,
  "line_status": null,
  "line_type_intelligence": null,
  "identity_match": null,
  "reassigned_number": null,
  "sms_pumping_risk": {
    "carrier_risk_category": "moderate",
    "number_blocked": false,
    "number_blocked_date": null,
    "number_blocked_last_3_months": null,
    "sms_pumping_risk_score": 61,
    "error_code": null
  },
  "phone_number_quality_score": null,
  "pre_fill": null,
  "url": "https://lookups.twilio.com/v2/PhoneNumbers/+14159929960"
}
```

### Access the full API response

The code sample above prints only the `sms_pumping_risk` field. The Lookup API returns the full phone number resource, which includes additional fields such as `valid`, `country_code`, `calling_country_code`, and `national_format`. To view the entire JSON response, send a direct HTTP request:

```bash
curl -X GET "https://lookups.twilio.com/v2/PhoneNumbers/%2B447772000001?Fields=sms_pumping_risk" \
  -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

If you use the Twilio helper library, the returned object includes all response properties. For example, in Python:

```python
phone_number = client.lookups.v2.phone_numbers("+447772000001").fetch(fields="sms_pumping_risk")

# Access individual properties
print(phone_number.valid)
print(phone_number.country_code)
print(phone_number.national_format)
print(phone_number.sms_pumping_risk)
```

For a complete list of response properties, see the [Lookup v2 API response properties](/docs/lookup/v2-api#response-properties).

## Query parameters

Optionally, you can include the `PartnerSubId` parameter to provide context for your sub-accounts, tenant IDs, sender IDs, or other segmentation. This additional context can improve the accuracy of the analysis. Any value provided for this parameter must not exceed 64 characters to ensure proper processing and risk assessment. If the value exceeds this limit, the request will fail with error code 60618 (Lookup Malformed Request Parameter).

```bash
curl -X GET "https://lookups.twilio.com/v2/PhoneNumbers/%2B447772000001?Fields=sms_pumping_risk&PartnerSubId=48006580138aee4528765f46923f58927ab72c94ddea0cdfc0235220792bcc8b" \
  -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

## Response properties

A SMS Pumping Risk Score request returns the following properties.

**Note**: Adding the `PartnerSubId` parameter in your request doesn't change the structure of the response.

| Property                   | Description                                                                                                                                                                                       |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CarrierRiskCategory`      | The risk category of the carrier based on its score. Available values are `high`, `moderate`, `mild`, and `low`.                                                                                  |
| `NumberBlocked`            | A Boolean indicating whether the phone number is currently blocked by [Verify Fraud Guard](/docs/verify/preventing-toll-fraud/sms-fraud-guard) for receiving malicious SMS pumping traffic.       |
| `NumberBlockedDate`        | The most recent date the phone number was blocked by Verify Fraud Guard. Returns `null` if the phone number has never been blocked or processed by Verify Fraud Guard.                            |
| `NumberBlockedLast3Months` | A Boolean indicating whether the phone number has been blocked by Verify Fraud Guard in the last three months. Returns `null` if the phone number has never been processed by Verify Fraud Guard. |
| `SmsPumpingRiskScore`      | The risk score for the phone number, calculated from patterns in messaging traffic. Ranges from `0` (no risk) to `100` (high risk).                                                               |
| `ErrorCode`                | The [error code](/docs/api/errors), if any, associated with your request.                                                                                                                         |

### SMS Pumping Risk Score implementation

Implementing SMS Pumping Risk Score depends on your application's structure and risk tolerance.

Use the `SmsPumpingRiskScore` property to decide whether to send a message, such as an OTP or other user-requested communication, based on the assessed risk level.

You can use the following general guidelines to assess the risk level of a phone number:

| Risk level | SmsPumpingRiskScore | Guideline                                                                                                 |
| ---------- | ------------------- | --------------------------------------------------------------------------------------------------------- |
| Low        | `0`-`60`            | Send messages as requested.                                                                               |
| Mild       | `60`-`75`           | Ask the requester to re-submit the request or add friction prior to sending messages.                     |
| Moderate   | `75`-`90`           | Treat the request as suspicious. Add friction prior to sending messages or consider not sending messages. |
| High       | `90`-`100`          | Don't send messages.                                                                                      |

To include blocks currently applied to other customer accounts by Verify Fraud Guard, you can use the `NumberBlocked` property. This will block any messages where the property returns `true`. However, this might lead to higher false positive rates, particularly in high-risk countries.

You can also use other response properties to define custom conditions that trigger specific workflows in your system, aligned with your risk tolerance levels.

## Frequently asked questions

#### How is the risk score calculated?

Twilio evaluates several risk signals associated with the phone number requested through the API and feeds those signals into its proprietary algorithm. The algorithm also considers your API request as a signal indicating a message request. To ensure accuracy, it's important for the algorithm to be able to see all traffic related to user-generated OTP requests in given countries.

Twilio considers the API request to Lookup as a signal so that customers—even those who don't use Twilio as their CPaaS provider for all traffic—can use a single product for SMS pumping fraud detection.

The risk score is specific to your Account SID. Keep in mind:

* No other customer's traffic impacts your risk scores.
* If you make API requests from multiple Account SID, the risk score for each Account SID will remain independent of one another.

#### How should I design a proof of concept (POC) or test the product?

Twilio recommends querying the Lookup API in shadow mode on your production traffic.

Alternatively, you can analyze traffic for a specific country over a certain period of time by querying the API *in real-time*. When you use this approach, it's important to consider the timing of message requests. For example, if you take 30 days of traffic for a specific country and feed that through the API in three minutes, the algorithm will assume all that traffic occurred within that three-minute window. This can significantly inflate the scores, leading to results that don't accurately reflect what they would be on your production traffic.

#### Do I need to send all my traffic for a country to the API?

Yes. To make sure the solution is effective, you should make an API request for SMS Pumping Risk Score prior to every user-generated OTP request for a given country.

#### Can I cache the scores?

Twilio doesn't recommend caching the risk scores. The scores can change in seconds, depending on the traffic the API is seeing on your account. Caching scores can negatively impact the efficacy of this product:

* If a false positive occurs, caching will store that incorrect score. A phone number flagged as high risk one day during a fraud event can be a low risk tomorrow if the fraudster stops their activity.
* Caching scores prevents additional API requests for the same number. Fraudsters typically recycle phone numbers, but if the fraudster starts slowly ramping up traffic, the algorithm might not be able to detect the traffic pattern right away. By caching scores, you might allow thousands of phone numbers to continue receiving messages without being flagged as high risk. This can reduce the precision of the algorithm.

#### Which countries should I use SMS Pumping Risk Score for?

* **Recommended**: All countries outside the US and Canada. This includes smaller regions, such as the Caribbean islands that use the +1 country code, as these areas are more frequently targeted by SMS pumping fraud.
* **Not Recommended**: There is generally no need to use SMS Pumping Risk Score for US and Canadian phone numbers. These regions aren't common targets for SMS pumping fraud due to the lack of incentives for this type of activity. The algorithm isn't designed for US or Canadian traffic and its effectiveness in these regions might be limited.
