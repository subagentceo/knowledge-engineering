# PhoneNumber Resource

The Phone Numbers subresource contains the list of Phone Number instances associated with a [SIP Trunk](/docs/sip-trunking/api/trunk-resource).

To purchase a new phone number for your trunk or manage your numbers more generally, you'll need to use the [IncomingPhoneNumbers Resource](/docs/phone-numbers/api/incomingphonenumber-resource). The SIP Trunking PhoneNumbers Resource is only for adding, removing, and viewing phone numbers associated with a SIP Trunk.

## PhoneNumber Properties

<OperationTable type="properties" data={{"type":"object","refName":"trunking.v1.trunk.phone_number","modelName":"trunking_v1_trunk_phone_number","properties":{"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the PhoneNumber resource."},"address_requirements":{"type":"string","enum":["none","any","local","foreign"],"description":"Whether the phone number requires an [Address](https://www.twilio.com/docs/usage/api/address) registered with Twilio and, if so, what type. Can be: `none`, `any`, `local`, or `foreign`.","refName":"phone_number_enum_address_requirement","modelName":"phone_number_enum_address_requirement"},"api_version":{"type":"string","nullable":true,"description":"The API version used to start a new TwiML session."},"beta":{"type":"boolean","nullable":true,"description":"Whether the phone number is new to the Twilio platform. Can be: `true` or `false`."},"capabilities":{"type":"object","format":"phone-number-capabilities","x-class-extra-annotation":"@JsonInclude(JsonInclude.Include.NON_NULL)","nullable":true,"description":"The set of Boolean properties that indicate whether a phone number can receive calls or messages.  Capabilities are  `Voice`, `SMS`, and `MMS` and each capability can be: `true` or `false`.","properties":{"mms":{"type":"boolean"},"sms":{"type":"boolean"},"voice":{"type":"boolean"},"fax":{"type":"boolean"}}},"date_created":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format."},"date_updated":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format."},"friendly_name":{"type":"string","nullable":true,"description":"The string that you assigned to describe the resource.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}},"links":{"type":"object","format":"uri-map","nullable":true,"description":"The URLs of related resources."},"phone_number":{"type":"string","format":"phone-number","nullable":true,"description":"The phone number in [E.164](https://www.twilio.com/docs/glossary/what-e164) format, which consists of a + followed by the country code and subscriber number."},"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^PN[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that we created to identify the PhoneNumber resource."},"sms_application_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AP[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the application that handles SMS messages sent to the phone number. If an `sms_application_sid` is present, we ignore all `sms_*_url` values and use those of the application."},"sms_fallback_method":{"type":"string","format":"http-method","enum":["GET","POST"],"nullable":true,"description":"The HTTP method we use to call `sms_fallback_url`. Can be: `GET` or `POST`."},"sms_fallback_url":{"type":"string","format":"uri","nullable":true,"description":"The URL that we call using the `sms_fallback_method` when an error occurs while retrieving or executing the TwiML from `sms_url`."},"sms_method":{"type":"string","format":"http-method","enum":["GET","POST"],"nullable":true,"description":"The HTTP method we use to call `sms_url`. Can be: `GET` or `POST`."},"sms_url":{"type":"string","format":"uri","nullable":true,"description":"The URL we call using the `sms_method` when the phone number receives an incoming SMS message."},"status_callback":{"type":"string","format":"uri","nullable":true,"description":"The URL we call using the `status_callback_method` to send status information to your application."},"status_callback_method":{"type":"string","format":"http-method","enum":["GET","POST"],"nullable":true,"description":"The HTTP method we use to call `status_callback`. Can be: `GET` or `POST`."},"trunk_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^TK[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the Trunk that handles calls to the phone number. If a `trunk_sid` is present, we ignore all of the voice URLs and voice applications and use those set on the Trunk. Setting a `trunk_sid` will automatically delete your `voice_application_sid` and vice versa."},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the resource."},"voice_application_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AP[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the application that handles calls to the phone number. If a `voice_application_sid` is present, we ignore all of the voice URLs and use those set on the application. Setting a `voice_application_sid` will automatically delete your `trunk_sid` and vice versa."},"voice_caller_id_lookup":{"type":"boolean","nullable":true,"description":"Whether we look up the caller's caller-ID name from the CNAM database ($0.01 per look up). Can be: `true` or `false`."},"voice_fallback_method":{"type":"string","format":"http-method","enum":["GET","POST"],"nullable":true,"description":"The HTTP method that we use to call `voice_fallback_url`. Can be: `GET` or `POST`."},"voice_fallback_url":{"type":"string","format":"uri","nullable":true,"description":"The URL that we call using the `voice_fallback_method` when an error occurs retrieving or executing the TwiML requested by `url`."},"voice_method":{"type":"string","format":"http-method","enum":["GET","POST"],"nullable":true,"description":"The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`."},"voice_url":{"type":"string","format":"uri","nullable":true,"description":"The URL we call using the `voice_method` when the phone number receives a call. The `voice_url` is not be used if a `voice_application_sid` or a `trunk_sid` is set."}}}} />

## Create a PhoneNumber resource

`POST https://trunking.twilio.com/v1/Trunks/{TrunkSid}/PhoneNumbers`

### Path parameters

```json
[{"name":"TrunkSid","in":"path","description":"The SID of the Trunk to associate the phone number with.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^TK[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"CreatePhoneNumberRequest","required":["PhoneNumberSid"],"properties":{"PhoneNumberSid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^PN[0-9a-fA-F]{32}$","description":"The SID of the [Incoming Phone Number](https://www.twilio.com/docs/phone-numbers/api/incomingphonenumber-resource) that you want to associate with the trunk."}}},"examples":{"create":{"value":{"lang":"json","value":"{\n  \"PhoneNumberSid\": \"PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"\n}","meta":"","code":"{\n  \"PhoneNumberSid\": \"PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"PhoneNumberSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Create a Phone Number

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createPhoneNumber() {
  const phoneNumber = await client.trunking.v1
    .trunks("TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .phoneNumbers.create({
      phoneNumberSid: "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    });

  console.log(phoneNumber.accountSid);
}

createPhoneNumber();
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

phone_number = client.trunking.v1.trunks(
    "TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).phone_numbers.create(phone_number_sid="PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

print(phone_number.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Trunking.V1.Trunk;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var phoneNumber = await PhoneNumberResource.CreateAsync(
            phoneNumberSid: "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathTrunkSid: "TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(phoneNumber.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.trunking.v1.trunk.PhoneNumber;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        PhoneNumber phoneNumber =
            PhoneNumber.creator("TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").create();

        System.out.println(phoneNumber.getAccountSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	trunking "github.com/twilio/twilio-go/rest/trunking/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &trunking.CreatePhoneNumberParams{}
	params.SetPhoneNumberSid("PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

	resp, err := client.TrunkingV1.CreatePhoneNumber("TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.AccountSid != nil {
			fmt.Println(*resp.AccountSid)
		} else {
			fmt.Println(resp.AccountSid)
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

$phone_number = $twilio->trunking->v1
    ->trunks("TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->phoneNumbers->create(
        "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" // PhoneNumberSid
    );

print $phone_number->accountSid;
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
               .trunking
               .v1
               .trunks('TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
               .phone_numbers
               .create(phone_number_sid: 'PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')

puts phone_number.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trunking:v1:trunks:phone-numbers:create \
   --trunk-sid TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --phone-number-sid PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X POST "https://trunking.twilio.com/v1/Trunks/TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers" \
--data-urlencode "PhoneNumberSid=PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2010-12-10T17:27:34Z",
  "date_updated": "2015-10-09T11:36:32Z",
  "friendly_name": "(415) 867-5309",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "phone_number": "+14158675309",
  "api_version": "2010-04-01",
  "voice_caller_id_lookup": null,
  "voice_url": "https://webhooks.twilio.com/v1/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Proxy/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Webhooks/Call",
  "voice_method": "POST",
  "voice_fallback_url": null,
  "voice_fallback_method": null,
  "status_callback": "",
  "status_callback_method": "POST",
  "voice_application_sid": "",
  "trunk_sid": "TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sms_url": "https://webhooks.twilio.com/v1/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Proxy/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Webhooks/Message",
  "sms_method": "POST",
  "sms_fallback_url": "",
  "sms_fallback_method": "POST",
  "sms_application_sid": "APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "address_requirements": "none",
  "beta": false,
  "url": "https://trunking.twilio.com/v1/Trunks/TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "capabilities": {
    "voice": true,
    "sms": true,
    "mms": true
  },
  "links": {
    "phone_number": "https://api.twilio.com/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IncomingPhoneNumbers/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  }
}
```

## Read multiple PhoneNumber resources

`GET https://trunking.twilio.com/v1/Trunks/{TrunkSid}/PhoneNumbers`

### Path parameters

```json
[{"name":"TrunkSid","in":"path","description":"The SID of the Trunk from which to read the PhoneNumber resources.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^TK[0-9a-fA-F]{32}$"},"required":true}]
```

### Query parameters

```json
[{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

List multiple Phone Numbers

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listPhoneNumber() {
  const phoneNumbers = await client.trunking.v1
    .trunks("TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .phoneNumbers.list({ limit: 20 });

  phoneNumbers.forEach((p) => console.log(p.accountSid));
}

listPhoneNumber();
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

phone_numbers = client.trunking.v1.trunks(
    "TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).phone_numbers.list(limit=20)

for record in phone_numbers:
    print(record.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Trunking.V1.Trunk;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var phoneNumbers = await PhoneNumberResource.ReadAsync(
            pathTrunkSid: "TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", limit: 20);

        foreach (var record in phoneNumbers) {
            Console.WriteLine(record.AccountSid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.trunking.v1.trunk.PhoneNumber;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<PhoneNumber> phoneNumbers =
            PhoneNumber.reader("TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").limit(20).read();

        for (PhoneNumber record : phoneNumbers) {
            System.out.println(record.getAccountSid());
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
	trunking "github.com/twilio/twilio-go/rest/trunking/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &trunking.ListPhoneNumberParams{}
	params.SetLimit(20)

	resp, err := client.TrunkingV1.ListPhoneNumber("TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].AccountSid != nil {
				fmt.Println(*resp[record].AccountSid)
			} else {
				fmt.Println(resp[record].AccountSid)
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

$phoneNumbers = $twilio->trunking->v1
    ->trunks("TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->phoneNumbers->read(20);

foreach ($phoneNumbers as $record) {
    print $record->accountSid;
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

phone_numbers = @client
                .trunking
                .v1
                .trunks('TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                .phone_numbers
                .list(limit: 20)

phone_numbers.each do |record|
   puts record.account_sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trunking:v1:trunks:phone-numbers:list \
   --trunk-sid TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://trunking.twilio.com/v1/Trunks/TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "meta": {
    "first_page_url": "https://trunking.twilio.com/v1/Trunks/TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers?PageSize=50&Page=0",
    "key": "phone_numbers",
    "next_page_url": null,
    "page": 0,
    "page_size": 50,
    "previous_page_url": null,
    "url": "https://trunking.twilio.com/v1/Trunks/TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers?PageSize=50&Page=0"
  },
  "phone_numbers": [
    {
      "sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "date_created": "2010-12-10T17:27:34Z",
      "date_updated": "2015-10-09T11:36:32Z",
      "friendly_name": "(415) 867-5309",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "phone_number": "+14158675309",
      "api_version": "2010-04-01",
      "voice_caller_id_lookup": null,
      "voice_url": "https://webhooks.twilio.com/v1/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Proxy/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Webhooks/Call",
      "voice_method": "POST",
      "voice_fallback_url": null,
      "voice_fallback_method": null,
      "status_callback": "",
      "status_callback_method": "POST",
      "voice_application_sid": "",
      "trunk_sid": "TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "sms_url": "https://webhooks.twilio.com/v1/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Proxy/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Webhooks/Message",
      "sms_method": "POST",
      "sms_fallback_url": "",
      "sms_fallback_method": "POST",
      "sms_application_sid": "APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "address_requirements": "none",
      "beta": false,
      "url": "https://trunking.twilio.com/v1/Trunks/TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "capabilities": {
        "voice": true,
        "sms": true,
        "mms": true
      },
      "links": {
        "phone_number": "https://api.twilio.com/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IncomingPhoneNumbers/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
      }
    }
  ]
}
```

## Delete a PhoneNumber resource

`DELETE https://trunking.twilio.com/v1/Trunks/{TrunkSid}/PhoneNumbers/{Sid}`

### Path parameters

```json
[{"name":"TrunkSid","in":"path","description":"The SID of the Trunk from which to delete the PhoneNumber resource.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^TK[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The unique string that we created to identify the PhoneNumber resource to delete.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^PN[0-9a-fA-F]{32}$"},"required":true}]
```

Delete a Phone Number

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function deletePhoneNumber() {
  await client.trunking.v1
    .trunks("TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .phoneNumbers("PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .remove();
}

deletePhoneNumber();
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

client.trunking.v1.trunks("TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").phone_numbers(
    "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).delete()
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Trunking.V1.Trunk;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        await PhoneNumberResource.DeleteAsync(
            pathTrunkSid: "TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.trunking.v1.trunk.PhoneNumber;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        PhoneNumber.deleter("TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete();
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	err := client.TrunkingV1.DeletePhoneNumber("TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
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

$twilio->trunking->v1
    ->trunks("TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->phoneNumbers("PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->delete();
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

@client
  .trunking
  .v1
  .trunks('TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  .phone_numbers('PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  .delete
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trunking:v1:trunks:phone-numbers:remove \
   --trunk-sid TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X DELETE "https://trunking.twilio.com/v1/Trunks/TKaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```
