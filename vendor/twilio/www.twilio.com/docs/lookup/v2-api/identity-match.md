# Identity Match

Identity Match compares user-supplied data, such as name, address, and date of birth, against authoritative sources. It returns match levels and an overall summary score, to help determine how closely the user's identity aligns with the information stored by these sources.

## Coverage

Identity Match is available for phone numbers in the following countries.

> \[!NOTE]
>
> Identity Match is available for phone numbers in the United States and Brazil without additional carrier registration and approval.
>
> Countries marked with a `*` symbol require [additional carrier registration and approval](https://twlo.my.salesforce-sites.com/countrycarrier/SN_CarrierRegistration_VFP) before using Identity Match. Once carrier registration and approval are complete, all successful queries will be billed to your account. For additional pricing and discount information, [contact Sales](https://www.twilio.com/en-us/help/sales).
>
> Lookup customers are charged for all successful `200 OK` responses (responses in which data elements were successfully provided from a downstream data source). If your API response contains "error\_code": null - you will be billed for that particular query

#### North America

* United States $0.10/query
* Canada\* $0.28/query
* Puerto Rico $0.10/query

#### Europe

* France\* $0.55/query
* Germany\* $0.40/query
* Italy\* $1.20/query
* Netherlands\* $0.60/query
* Spain\* $0.40/query
* United Kingdom\* $0.50/query

#### Latin America

* Brazil $0.20/query

## Run Identity Match

Make a [`GET /v2/PhoneNumbers/{PhoneNumber}`](/docs/lookup/v2-api#making-a-request) request with the following as query parameters:

* `Fields=identity_match`
* User-provided information. For example, `FirstName=John`.

```bash
curl -X GET "https://lookups.twilio.com/v2/PhoneNumbers/{PhoneNumber}?Fields=identity_match&FirstName=John" \ -u
$TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

For detailed implementation examples, see [Code examples and responses](#code-examples-and-responses).

## Query parameters

Provide the user-provided information as query parameters. Identity Match will provide match levels for how the given parameters compare against authoritative phone-based data sources.

Most of these parameters are optional for phone numbers in most countries. However, [some countries have specific requirements](#country-specific-requirements).

| Query parameter          | Description                                                           | Max character length |
| :----------------------- | :-------------------------------------------------------------------- | :------------------- |
| `FirstName`              | The user's first name.                                                | 128                  |
| `LastName`               | The user's last name.                                                 | 128                  |
| `AddressLine1`           | The user's first address line. Example: 1600 Pennsylvania Ave NW.     | 256                  |
| `AddressLine2`           | The user's second address line. Example: Suite 2.                     | 256                  |
| `City`                   | The user's city.                                                      | 128                  |
| `State`                  | The user's country subdivision, such as state, province, or locality. | 128                  |
| `PostalCode`             | The user's postal or ZIP code.                                        | 10                   |
| `AddressCountryCode`     | The user's country code.                                              | 2                    |
| `NationalId`<sup>1</sup> | The user's national ID, such as SSN.                                  | 128                  |
| `DateOfBirth`            | The user's date of birth in YYYYMMDD format. Example: 19901213.       | 8                    |

1. Access to the `NationalId` field in Identity Match responses is restricted to customers who have completed Twilio's KYC (Know Your Customer) process. Non-KYC customers will receive a `null` value in this field.

To learn how to become Twilio KYC approved, see [Twilio Trust Hub](/docs/trust-hub).

### Country-specific requirements

Some countries require specific parameters and have different data formatting rules. If a required parameter is missing, [Error 60617](/docs/api/errors/60617) will be returned.

#### Australia

| Parameter      | Usage         | Description                                                                                                                                                                                                                                                                                                                                                                                            |
| -------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `AddressLine1` | Optional      | Use only the address formats in the following examples for flats, units, or apartments: <ul><li>For Flat 2 at 14 Smith Street, use `Flat 2 14 Smith St`, `2/14 Smith St`, or `F 2 14 Smith St`.</li><li>For Unit 2 at 14 Smith Street, use `Unit 2 14 Smith St`, `2/14 Smith St`, or `U 2 14 Smith St`</li><li>For Apartment 2 at 14 Smith Street, use `2/14 Smith` or `APT 2 14 Smith St`. </li></ul> |
| `AddressLine2` | Don't include | Include this information in `AddressLine1`.                                                                                                                                                                                                                                                                                                                                                            |
| `State`        | Optional      | Use state abbreviations instead of the full state name. For example, `QLD`                                                                                                                                                                                                                                                                                                                             |

#### Brazil

| Parameter            | Usage         | Description                                                                                                                                                                            |
| -------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `FirstName`          | Required      | Use only the first word of the user's name if it contains multiple words. For example, use `Luis` for the name "Luis Carlos Teixeira Brito Junior."                                    |
| `LastName`           | Required      | Use all words after the first word of the user's name if it contains multiple words. For example, use `Carlos Teixeira Brito Junior` for the name "Luis Carlos Teixeira Brito Junior." |
| `AddressLine1`       | Required      | The user's address in the format *\[streetName streetNumber BL blNumber APT aptNumber neighborhoodName]*. For example, `RUA COSTA ESMERALDA 50 BL 14 APT 22 CENTR`.                    |
| `AddressLine2`       | Don't include | Include this information in `AddressLine1`.                                                                                                                                            |
| `City`               | Don't include | This parameter can't be evaluated in Brazil.                                                                                                                                           |
| `AddressCountryCode` | Don't include | This parameter can't be evaluated in Brazil.                                                                                                                                           |
| `PostalCode`         | Don't include | This parameter can't be evaluated in Brazil.                                                                                                                                           |
| `NationalId`         | Optional      | The user's national ID, such as CPF.                                                                                                                                                   |

#### Germany

| Parameter      | Usage    | Description                                                                                     |
| -------------- | -------- | ----------------------------------------------------------------------------------------------- |
| `FirstName`    | Required | The user's first name.                                                                          |
| `LastName`     | Required | The user's last name.                                                                           |
| `AddressLine1` | Required | The street name and house number. For example, `Immermannstraße 26` and `Oderbergerstrasse 12`. |
| `City`         | Required | The user's city.                                                                                |
| `PostalCode`   | Required | The user's postal code.                                                                         |
| `DateOfBirth`  | Optional | The user's date of birth in YYYYMMDD format.                                                    |

#### United Kingdom

| Parameter      | Usage    | Description                                                                                                          |
| -------------- | -------- | -------------------------------------------------------------------------------------------------------------------- |
| `FirstName`    | Required | The user's first name.                                                                                               |
| `LastName`     | Required | The user's last name.                                                                                                |
| `AddressLine1` | Required | The street name and house number or house name. If both the house number and house name are available, include them. |
| `PostalCode`   | Required | The user's postal code.                                                                                              |

#### Italy

| Parameter      | Usage    | Description                                                                                                                                                                 |
| -------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `FirstName`    | Required | The user's first name.                                                                                                                                                      |
| `LastName`     | Required | The user's last name.                                                                                                                                                       |
| `AddressLine1` | Required | The street type, street name, and building name or number. For example, `via Garibaldi 27` or `27 via Garibaldi`, `Via Giacomo Quarenghi 34` or `34 Via Giacomo Quarenghi`. |
| `PostalCode`   | Optional | The five-digit postal code. For example, `00015`.                                                                                                                           |

#### Netherlands

| Parameter      | Usage    | Description                                                                                                      |
| -------------- | -------- | ---------------------------------------------------------------------------------------------------------------- |
| `FirstName`    | Optional | The first initial of the user's name. For example, use `L` for the name "Luca."                                  |
| `AddressLine1` | Optional | The street name and house number. For example, `Jaarbeursplein 6A` or `Joris van Andringastraat 172`.            |
| `PostalCode`   | Optional | The postal code consisting of four digits and two characters, with no spaces. For example, `3054SP` or `3521AL`. |
| `DateOfBirth`  | Optional | The user's date of birth in the YYYYMMDD format. For example, `19901214`.                                        |

## Response properties

The response includes the `identity_match` object, which contains match levels for the user's submitted data. The `identity_match` object also contains a [summary score](#summary-score-calculation) that provides an overall match level for the user's identity.

### Match levels

| Match level          | Description                                                      | Example                                                |
| -------------------- | ---------------------------------------------------------------- | ------------------------------------------------------ |
| `exact_match`        | The user's data matches the mobile number's data exactly.        | "Robert" matches "Robert".                             |
| `high_partial_match` | The user's data almost exactly matches the mobile number's data. | "Robere" is a high partial match for "Robert".         |
| `partial_match`      | The user's data moderately matches the mobile number's data.     | "Bob", "Rob", or "R" are partial matches for "Robert". |
| `no_match`           | The user's data doesn't match the mobile number's data at all.   | "John" doesn't match "Robert".                         |
| `no_data_available`  | No data is available for comparison.                             |                                                        |

### `identity_match` attributes and match levels

| Attribute                                     | Description                                                                                                   | Allowed values                                                                                                    |
| :-------------------------------------------- | :------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------- |
| `first_name_match`                            | The match level for the `FirstName` attribute assigned to the submitted mobile number.                        | `exact_match`, `high_partial_match`, `partial_match`, `no_match`, `no_data_available`                             |
| `last_name_match`                             | The match level for the `LastName` attribute assigned to the submitted mobile number.                         | `exact_match`, `high_partial_match`, `partial_match`, `no_match`, `no_data_available`                             |
| `address_line_match`                          | The match level for the `AddressLine1` and `AddressLine2` attributes assigned to the submitted mobile number. | `exact_match`, `high_partial_match`, `partial_match`, `no_match`, `no_data_available`                             |
| `city_match`                                  | The match level for the `City` attribute assigned to the submitted mobile number.                             | `exact_match`, `no_match`, `no_data_available`                                                                    |
| `state_match`                                 | The match level for the `State` attribute assigned to the submitted mobile number.                            | `exact_match`, `no_match`, `no_data_available`                                                                    |
| `postal_code_match`                           | The match level for the `PostalCode` attribute assigned to the submitted mobile number.                       | `exact_match`, `no_match`, `no_data_available`                                                                    |
| `address_country_match`                       | The match level for the `AddressCountryCode` attribute assigned to the submitted mobile number.               | `exact_match`, `no_match`, `no_data_available`                                                                    |
| `date_of_birth_match`                         | The match level for the `DateOfBirth` attribute assigned to the submitted mobile number.                      | `exact_match`, `high_partial_match` (Canada only), `partial_match` (Canada only), `no_match`, `no_data_available` |
| `national_id_match`                           | The match level for the `NationalId` attribute assigned to the submitted mobile number.                       | `exact_match`, `no_match`, `no_data_available`, `null`                                                            |
| [`summary_score`](#summary-score-calculation) | A single summary score that indicates overall match level.                                                    | `0`, `20`, `40`, `70`, `80`, `100`                                                                                |

### Summary score calculation

The `summary_score` represents the overall match level, with values ranging from `0` (no match) to `100` (exact match). Possible values include `0`, `20`, `40`, `70`, `80`, and `100`. This score isn't a percentage but is calculated based on the match values of the `first_name_match`, `last_name_match`, and `address_line_match` properties.

The following table shows how the `summary_score` is calculated based on different match scenarios:

| `first_name_match`                                                       | `last_name_match`                                                        | `address_line_match`                                                     | `summary_score` |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | ------------------------------------------------------------------------ | --------------- |
| Any positive match: `exact_match`, `high_partial_match`, `partial_match` | Any positive match: `exact_match`, `high_partial_match`, `partial_match` | Any positive match: `exact_match`, `high_partial_match`, `partial_match` | `100`           |
| Any positive match: `exact_match`, `high_partial_match`, `partial_match` | Any negative match: `no_match`, `no_data_available`                      | Any positive match: `exact_match`, `high_partial_match`, `partial_match` | `80`            |
| Any positive match: `exact_match`, `high_partial_match`, `partial_match` | Any negative match: `no_match`, `no_data_available`                      | Any negative match: `no_data_available`                                  | `70`            |
| Any positive match: `exact_match`, `high_partial_match`, `partial_match` | Any positive match: `exact_match`, `high_partial_match`, `partial_match` | Any negative match: `no_match`, `no_data_available`                      | `40`            |
| Any negative match: `no_match`, `no_data_available`                      | Any positive match: `exact_match`, `high_partial_match`, `partial_match` | Any positive match: `exact_match`, `high_partial_match`, `partial_match` | `20`            |
| Any positive match: `exact_match`, `high_partial_match`, `partial_match` | Any negative match: `no_match`, `no_data_available`                      | Any negative match: `no_match`, `no_data_available`                      | `0`             |
| Any negative match: `no_match`, `no_data_available`                      | Any positive match: `exact_match`, `high_partial_match`, `partial_match` | Any negative match: `no_match`, `no_data_available`                      | `20`            |
| Any negative match: `no_match`, `no_data_available`                      | Any negative match: `no_match`, `no_data_available`                      | Any positive match: `exact_match`, `high_partial_match`, `partial_match` | `0`             |
| Any negative match: `no_match`, `no_data_available`                      | Any negative match: `no_match`, `no_data_available`                      | Any negative match: `no_match`, `no_data_available`                      | `0`             |

## Code examples and responses

Identity Match Lookup

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
    .fetch({
      addressCountryCode: "US",
      addressLine1: "321 Main Street",
      addressLine2: "Suite 2",
      city: "New York",
      dateOfBirth: "19901214",
      fields: "identity_match",
      firstName: "John",
      lastName: "Doe",
      nationalId: "YZ3456883",
      postalCode: "10021",
      state: "NY",
    });

  console.log(phoneNumber.callingCountryCode);
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
    fields="identity_match",
    first_name="John",
    last_name="Doe",
    address_line1="321 Main Street",
    address_line2="Suite 2",
    city="New York",
    state="NY",
    postal_code="10021",
    address_country_code="US",
    national_id="YZ3456883",
    date_of_birth="19901214",
)

print(phone_number.calling_country_code)
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
            pathPhoneNumber: "+14159929960",
            fields: "identity_match",
            firstName: "John",
            lastName: "Doe",
            addressLine1: "321 Main Street",
            addressLine2: "Suite 2",
            city: "New York",
            state: "NY",
            postalCode: "10021",
            addressCountryCode: "US",
            nationalId: "YZ3456883",
            dateOfBirth: "19901214");

        Console.WriteLine(phoneNumber.CallingCountryCode);
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
        PhoneNumber phoneNumber = PhoneNumber.fetcher("+14159929960")
                                      .setFields("identity_match")
                                      .setFirstName("John")
                                      .setLastName("Doe")
                                      .setAddressLine1("321 Main Street")
                                      .setAddressLine2("Suite 2")
                                      .setCity("New York")
                                      .setState("NY")
                                      .setPostalCode("10021")
                                      .setAddressCountryCode("US")
                                      .setNationalId("YZ3456883")
                                      .setDateOfBirth("19901214")
                                      .fetch();

        System.out.println(phoneNumber.getCallingCountryCode());
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
	params.SetFields("identity_match")
	params.SetFirstName("John")
	params.SetLastName("Doe")
	params.SetAddressLine1("321 Main Street")
	params.SetAddressLine2("Suite 2")
	params.SetCity("New York")
	params.SetState("NY")
	params.SetPostalCode("10021")
	params.SetAddressCountryCode("US")
	params.SetNationalId("YZ3456883")
	params.SetDateOfBirth("19901214")

	resp, err := client.LookupsV2.FetchPhoneNumber("+14159929960",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.CallingCountryCode != nil {
			fmt.Println(*resp.CallingCountryCode)
		} else {
			fmt.Println(resp.CallingCountryCode)
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

$phone_number = $twilio->lookups->v2->phoneNumbers("+14159929960")->fetch([
    "fields" => "identity_match",
    "firstName" => "John",
    "lastName" => "Doe",
    "addressLine1" => "321 Main Street",
    "addressLine2" => "Suite 2",
    "city" => "New York",
    "state" => "NY",
    "postalCode" => "10021",
    "addressCountryCode" => "US",
    "nationalId" => "YZ3456883",
    "dateOfBirth" => "19901214",
]);

print $phone_number->callingCountryCode;
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
               .fetch(
                 fields: 'identity_match',
                 first_name: 'John',
                 last_name: 'Doe',
                 address_line1: '321 Main Street',
                 address_line2: 'Suite 2',
                 city: 'New York',
                 state: 'NY',
                 postal_code: '10021',
                 address_country_code: 'US',
                 national_id: 'YZ3456883',
                 date_of_birth: '19901214'
               )

puts phone_number.calling_country_code
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:lookups:v2:phone-numbers:fetch \
   --phone-number +14159929960 \
   --fields identity_match \
   --first-name John \
   --last-name Doe \
   --address-line1 "321 Main Street" \
   --address-line2 "Suite 2" \
   --city "New York" \
   --state NY \
   --postal-code 10021 \
   --address-country-code US \
   --national-id YZ3456883 \
   --date-of-birth 19901214
```

```bash
curl -X GET "https://lookups.twilio.com/v2/PhoneNumbers/%2B14159929960?Fields=identity_match&FirstName=John&LastName=Doe&AddressLine1=321%20Main%20Street&AddressLine2=Suite%202&City=New%20York&State=NY&PostalCode=10021&AddressCountryCode=US&NationalId=YZ3456883&DateOfBirth=19901214" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "calling_country_code": "1",
  "country_code": "US",
  "phone_number": "+14159929960",
  "national_format": "(415) 992-9960",
  "valid": true,
  "validation_errors": [],
  "caller_name": null,
  "sim_swap": null,
  "call_forwarding": null,
  "line_status": null,
  "line_type_intelligence": null,
  "identity_match": {
    "first_name_match": "exact_match",
    "last_name_match": "high_partial_match",
    "address_lines_match": "no_match",
    "city_match": "no_match",
    "state_match": "high_partial_match",
    "postal_code_match": "no_data_available",
    "address_country_match": "exact_match",
    "national_id_match": "exact_match",
    "date_of_birth_match": "exact_match",
    "summary_score": 90,
    "error_code": null,
    "error_message": null
  },
  "reassigned_number": null,
  "sms_pumping_risk": null,
  "phone_number_quality_score": null,
  "pre_fill": null,
  "url": "https://lookups.twilio.com/v2/PhoneNumbers/+14159929960"
}
```

## Frequently asked questions

#### What's the recommended implementation of Identity Match?

Identity Match is most commonly used during new user onboarding workflows. Twilio recommends submitting all available end-user PII when a new user signs up for your service, with `FirstName`, `LastName`, and `AddressLine1` as the minimum required parameters.

You can either rely on the summary score for a quick evaluation or implement more advanced logic based on individual parameter match levels. If you're validating more than the three key parameters mentioned above, Twilio suggests using your own match logic, as the summary score is calculated solely based on those parameters.

#### What's considered a "good match rate?"

What's considered a "good match rate" for Identity Match depends on the attributes you prioritize for your use case and the quality of the data provided.

For example, imagine an end user is signing up for an online bank account. They're very likely to provide all the correct information. This will result in higher match rates across all data elements when that customer data is compared with data held at our authoritative sources.

Now imagine an end user is signing up for a social media account. They may not provide accurate data. This will result in lower match rates.

The quality of the data you submit directly impacts the match results returned by Identity Match.

#### Can Identity Match requests contain multiple addresses?

No, the Identity Match API only supports a single input data set per request. This includes the name, address, date of birth, and national ID associated with the end user's mobile phone number. The API returns a single set of match results in response.
