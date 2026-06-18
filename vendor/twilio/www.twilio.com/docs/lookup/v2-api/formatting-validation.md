# Formatting and Validation

Lookup's basic request is free to use and provides:

* [E.164](/docs/glossary/what-e164) and national formats
* Phone number validation including helpful errors

To make a free formatting and validation request, do not include any `Fields` in the request.

```bash
curl -X GET "https://lookups.twilio.com/v2/PhoneNumbers/{PhoneNumber}" \ -u 
$TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

**Release Stage and Access**:
Public Beta, available via self-service.

## Response properties \[#response-properties]

Only valid numbers (for a given region, using length, and prefix information) will return results. If you attempt to lookup a phone number which is invalid, you will receive `"valid": false` in the response. In some cases you will also receive a reason for the validation failure in the validation\_errors field.

### Validation errors property values \[#type-property-values]

The following are the possible values for the `Validation Errors` property.

* TOO\_SHORT
* TOO\_LONG
* INVALID\_BUT\_POSSIBLE
* INVALID\_COUNTRY\_CODE
* INVALID\_LENGTH
* NOT\_A\_NUMBER

Lookup with valid E.164 phone number

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
    .phoneNumbers("+141599299600")
    .fetch();

  console.log(phoneNumber.nationalFormat);
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

phone_number = client.lookups.v2.phone_numbers("+141599299600").fetch()

print(phone_number.national_format)
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

        var phoneNumber = await PhoneNumberResource.FetchAsync(pathPhoneNumber: "+141599299600");

        Console.WriteLine(phoneNumber.NationalFormat);
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
        PhoneNumber phoneNumber = PhoneNumber.fetcher("+141599299600").fetch();

        System.out.println(phoneNumber.getNationalFormat());
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

	resp, err := client.LookupsV2.FetchPhoneNumber("+141599299600",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.NationalFormat != nil {
			fmt.Println(*resp.NationalFormat)
		} else {
			fmt.Println(resp.NationalFormat)
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

$phone_number = $twilio->lookups->v2->phoneNumbers("+141599299600")->fetch();

print $phone_number->nationalFormat;
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
               .phone_numbers('+141599299600')
               .fetch

puts phone_number.national_format
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:lookups:v2:phone-numbers:fetch \
   --phone-number +141599299600
```

```bash
curl -X GET "https://lookups.twilio.com/v2/PhoneNumbers/%2B141599299600" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "calling_country_code": "1",
  "country_code": "US",
  "phone_number": "+141599299600",
  "national_format": "(415) 992-9960",
  "valid": true,
  "validation_errors": null,
  "caller_name": null,
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

Lookup with invalid E.164 phone number

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
    .phoneNumbers("+141599299600")
    .fetch();

  console.log(phoneNumber.valid);
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

phone_number = client.lookups.v2.phone_numbers("+141599299600").fetch()

print(phone_number.valid)
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

        var phoneNumber = await PhoneNumberResource.FetchAsync(pathPhoneNumber: "+141599299600");

        Console.WriteLine(phoneNumber.Valid);
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
        PhoneNumber phoneNumber = PhoneNumber.fetcher("+141599299600").fetch();

        System.out.println(phoneNumber.getValid());
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

	resp, err := client.LookupsV2.FetchPhoneNumber("+141599299600",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		fmt.Println(resp.Valid)
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

$phone_number = $twilio->lookups->v2->phoneNumbers("+141599299600")->fetch();

print $phone_number->valid;
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
               .phone_numbers('+141599299600')
               .fetch

puts phone_number.valid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:lookups:v2:phone-numbers:fetch \
   --phone-number +141599299600
```

```bash
curl -X GET "https://lookups.twilio.com/v2/PhoneNumbers/%2B141599299600" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "calling_country_code": null,
  "country_code": null,
  "phone_number": "+141599299600",
  "national_format": null,
  "valid": false,
  "validation_errors": [
    "TOO_LONG"
  ],
  "caller_name": null,
  "sim_swap": null,
  "call_forwarding": null,
  "line_status": null,
  "line_type_intelligence": null,
  "identity_match": null,
  "reassigned_number": null,
  "sms_pumping_risk": null,
  "phone_number_quality_score": null,
  "pre_fill": null,
  "url": "https://lookups.twilio.com/v2/PhoneNumbers/+141599299600"
}
```
