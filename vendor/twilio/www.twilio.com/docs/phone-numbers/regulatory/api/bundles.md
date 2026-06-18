# Bundles Resource

> \[!WARNING]
>
> The v2 Regulatory Compliance APIs are currently in Public Beta. No breaking changes in the API contract will occur when the API moves from Public Beta to GA.

The Twilio Bundles REST API allows you to create empty Regulatory Bundle containers. The Regulatory Bundles are [Item Assignments](/docs/phone-numbers/regulatory/api/item-assignments) of [End-Users](/docs/phone-numbers/regulatory/api/end-users) and [Supporting Documents](/docs/phone-numbers/regulatory/api/supporting-documents) for regulatory compliance.

Depending on the configuration of the bundle, the bundle is being assessed against a [Regulation](/docs/phone-numbers/regulatory/api/regulations) (e.g., Germany local phone numbers for a business). Different [Regulations](/docs/phone-numbers/regulatory/api/regulations) need [Item Assignments](/docs/phone-numbers/regulatory/api/item-assignments) combinations of [End-User Types](/docs/phone-numbers/regulatory/api/end-user-types) and [Supporting Document Types](/docs/phone-numbers/regulatory/api/supporting-document-types).

## Bundles Response Properties

The field of the Bundle resource response is in JSON. The type SID\<BU> is a unique ID starting with letters BU. For more information about Twilio SIDs, please refer to [Twilio's glossary on SIDs](/docs/glossary/what-is-a-sid).

<OperationTable type="properties" data={{"type":"object","refName":"numbers.v2.regulatory_compliance.bundle","modelName":"numbers_v2_regulatory_compliance_bundle","properties":{"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^BU[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that we created to identify the Bundle resource."},"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Bundle resource."},"regulation_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^RN[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string of a regulation that is associated to the Bundle resource."},"friendly_name":{"type":"string","nullable":true,"description":"The string that you assigned to describe the resource."},"status":{"type":"string","enum":["draft","pending-review","in-review","twilio-rejected","twilio-approved","provisionally-approved"],"description":"The verification status of the Bundle resource.","refName":"bundle_enum_status","modelName":"bundle_enum_status"},"valid_until":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format when the resource will be valid until."},"email":{"type":"string","nullable":true,"description":"The email address that will receive updates when the Bundle resource changes status."},"status_callback":{"type":"string","format":"uri","nullable":true,"description":"The URL we call to inform your application of status changes."},"date_created":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was created specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"date_updated":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was last updated specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the Bundle resource."},"links":{"type":"object","format":"uri-map","nullable":true,"description":"The URLs of the Assigned Items of the Bundle resource."}}}} />

### Bundle Statuses

The following statuses encompass the Bundle lifecycle.

| ***Status***      | ***Description***                                                                                                                                                       |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| *draft*           | The user has created a new Bundle that can be edited with Supporting Documents and End-User objects assigned.                                                           |
| *pending-review*  | When the user has finished the draft of the Bundle and submits to Twilio for review, the status moves from `draft` to `pending-review`.                                 |
| *in-review*       | Twilio has moved the Bundle from `pending-review` to `in-review.` Once Twilio has finished review, the Bundle will go either to `twilio-approved` or `twilio-rejected`. |
| *twilio-rejected* | Twilio has reviewed the Bundle and has determined the Bundle does not meet the regulations.                                                                             |
| *twilio-approved* | Twilio has reviewed the Bundle and has determined the Bundles does meet the regulations.                                                                                |

### Status Callback

Every time the Bundle resource's `status` changes (except for when it changes from `pending-review` to `in_review`), Twilio sends a `POST` request to the URL specified in the Bundle's `statusCallback` property. The `Content-Type` of the request is `application/x-www-form-urlencoded`.

| ***Field***   | ***Description***                                                                                                      |
| ------------- | ---------------------------------------------------------------------------------------------------------------------- |
| AccountSID    | The SID of the [Account](/docs/iam/api/account) that created the Bundle resource.                                      |
| BundleSID     | The unique string that we created to identify the Bundle resource.                                                     |
| Status        | The verification status of the Bundle resource. See [Bundle Statuses](#bundle-statuses) for a list of possible values. |
| FailureReason | The description(s) of what incorrect configuration the Regulatory Bundle currently has.                                |

## Create a Bundle

`POST https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles`

To provision or port a [phone number](/docs/glossary/what-virtual-phone-number) to Twilio, you will need to create a new Bundle that will contain all the information required to follow local telco [Regulations](/docs/phone-numbers/regulatory/api/regulations).

The Bundle is a container that references the required Regulatory Compliance information set forth by the regulating telecom body of the end-user who actually answers the phone call or receives the message.

When creating the Bundle, you will specify the following parameters `IsoCountry`, `NumberType`, and `EndUserType` so you can follow compliance for a Regulation.

### Request body parameters

```json
{"schema":{"type":"object","title":"CreateBundleRequest","required":["FriendlyName","Email"],"properties":{"FriendlyName":{"type":"string","description":"The string that you assigned to describe the resource."},"Email":{"type":"string","description":"The email address that will receive updates when the Bundle resource changes status."},"StatusCallback":{"type":"string","format":"uri","description":"The URL we call to inform your application of status changes."},"RegulationSid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^RN[0-9a-fA-F]{32}$","description":"The unique string of a regulation that is associated to the Bundle resource."},"IsoCountry":{"type":"string","description":"The [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of the Bundle's phone number country ownership request."},"EndUserType":{"type":"string","enum":["individual","business"],"refName":"bundle_enum_end_user_type","modelName":"bundle_enum_end_user_type"},"NumberType":{"type":"string","description":"The type of phone number of the Bundle's ownership request. Can be `local`, `mobile`, `national`, or `toll-free`."},"IsTest":{"type":"boolean","description":"Indicates that Bundle is a Test Bundle and will be Auto-Rejected"}}},"examples":{"create":{"value":{"lang":"json","value":"{\n  \"FriendlyName\": \"friendly_name\",\n  \"Email\": \"email\",\n  \"RegulationSid\": \"RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"StatusCallback\": \"http://www.example.com\"\n}","meta":"","code":"{\n  \"FriendlyName\": \"friendly_name\",\n  \"Email\": \"email\",\n  \"RegulationSid\": \"RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"StatusCallback\": \"http://www.example.com\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"friendly_name\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Email\"","#7EE787"],[":","#C9D1D9"]," ",["\"email\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"RegulationSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallback\"","#7EE787"],[":","#C9D1D9"]," ",["\"http://www.example.com\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Create a new Bundle

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createBundle() {
  const bundle = await client.numbers.v2.regulatoryCompliance.bundles.create({
    email: "numbers-regulatory-review@twilio.com",
    endUserType: "business",
    friendlyName: "Twilio, Inc. DE Local Bundle",
    isoCountry: "de",
    numberType: "local",
    statusCallback: "https://twilio.status.callback.com",
  });

  console.log(bundle.sid);
}

createBundle();
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

bundle = client.numbers.v2.regulatory_compliance.bundles.create(
    email="numbers-regulatory-review@twilio.com",
    end_user_type="business",
    friendly_name="Twilio, Inc. DE Local Bundle",
    iso_country="de",
    number_type="local",
    status_callback="https://twilio.status.callback.com",
)

print(bundle.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Numbers.V2.RegulatoryCompliance;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var bundle = await BundleResource.CreateAsync(
            email: "numbers-regulatory-review@twilio.com",
            endUserType: BundleResource.EndUserTypeEnum.Business,
            friendlyName: "Twilio, Inc. DE Local Bundle",
            isoCountry: "de",
            numberType: "local",
            statusCallback: new Uri("https://twilio.status.callback.com"));

        Console.WriteLine(bundle.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.net.URI;
import com.twilio.Twilio;
import com.twilio.rest.numbers.v2.regulatorycompliance.Bundle;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Bundle bundle = Bundle.creator("Twilio, Inc. DE Local Bundle", "numbers-regulatory-review@twilio.com")
                            .setEndUserType(Bundle.EndUserType.BUSINESS)
                            .setIsoCountry("de")
                            .setNumberType("local")
                            .setStatusCallback(URI.create("https://twilio.status.callback.com"))
                            .create();

        System.out.println(bundle.getSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	numbers "github.com/twilio/twilio-go/rest/numbers/v2"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &numbers.CreateBundleParams{}
	params.SetEmail("numbers-regulatory-review@twilio.com")
	params.SetEndUserType("business")
	params.SetFriendlyName("Twilio, Inc. DE Local Bundle")
	params.SetIsoCountry("de")
	params.SetNumberType("local")
	params.SetStatusCallback("https://twilio.status.callback.com")

	resp, err := client.NumbersV2.CreateBundle(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Sid != nil {
			fmt.Println(*resp.Sid)
		} else {
			fmt.Println(resp.Sid)
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

$bundle = $twilio->numbers->v2->regulatoryCompliance->bundles->create(
    "Twilio, Inc. DE Local Bundle", // FriendlyName
    "numbers-regulatory-review@twilio.com", // Email
    [
        "endUserType" => "business",
        "isoCountry" => "de",
        "numberType" => "local",
        "statusCallback" => "https://twilio.status.callback.com",
    ]
);

print $bundle->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

bundle = @client
         .numbers
         .v2
         .regulatory_compliance
         .bundles
         .create(
           email: 'numbers-regulatory-review@twilio.com',
           end_user_type: 'business',
           friendly_name: 'Twilio, Inc. DE Local Bundle',
           iso_country: 'de',
           number_type: 'local',
           status_callback: 'https://twilio.status.callback.com'
         )

puts bundle.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:numbers:v2:regulatory-compliance:bundles:create \
   --email numbers-regulatory-review@twilio.com \
   --end-user-type business \
   --friendly-name "Twilio, Inc. DE Local Bundle" \
   --iso-country de \
   --number-type local \
   --status-callback https://twilio.status.callback.com
```

```bash
curl -X POST "https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles" \
--data-urlencode "Email=numbers-regulatory-review@twilio.com" \
--data-urlencode "EndUserType=business" \
--data-urlencode "FriendlyName=Twilio, Inc. DE Local Bundle" \
--data-urlencode "IsoCountry=de" \
--data-urlencode "NumberType=local" \
--data-urlencode "StatusCallback=https://twilio.status.callback.com" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "regulation_sid": "RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "Twilio, Inc. DE Local Bundle",
  "status": "draft",
  "email": "numbers-regulatory-review@twilio.com",
  "status_callback": "https://twilio.status.callback.com",
  "valid_until": null,
  "date_created": "2019-07-30T22:29:24Z",
  "date_updated": "2019-07-31T01:09:00Z",
  "url": "https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "evaluations": "https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Evaluations",
    "item_assignments": "https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ItemAssignments",
    "bundle_copies": "https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Copies"
  }
}
```

## Fetch a Bundle Instance

`GET https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/{Sid}`

### Path parameters

```json
[{"name":"Sid","in":"path","description":"The unique string that we created to identify the Bundle resource.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^BU[0-9a-fA-F]{32}$"},"required":true}]
```

Fetch a Bundle instance

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchBundle() {
  const bundle = await client.numbers.v2.regulatoryCompliance
    .bundles("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch();

  console.log(bundle.sid);
}

fetchBundle();
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

bundle = client.numbers.v2.regulatory_compliance.bundles(
    "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).fetch()

print(bundle.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Numbers.V2.RegulatoryCompliance;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var bundle = await BundleResource.FetchAsync(pathSid: "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(bundle.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.numbers.v2.regulatorycompliance.Bundle;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Bundle bundle = Bundle.fetcher("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").fetch();

        System.out.println(bundle.getSid());
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

	resp, err := client.NumbersV2.FetchBundle("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Sid != nil {
			fmt.Println(*resp.Sid)
		} else {
			fmt.Println(resp.Sid)
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

$bundle = $twilio->numbers->v2->regulatoryCompliance
    ->bundles("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->fetch();

print $bundle->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

bundle = @client
         .numbers
         .v2
         .regulatory_compliance
         .bundles('BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
         .fetch

puts bundle.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:numbers:v2:regulatory-compliance:bundles:fetch \
   --sid BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "regulation_sid": "RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "friendly_name",
  "status": "draft",
  "valid_until": null,
  "email": "email",
  "status_callback": "http://www.example.com",
  "date_created": "2019-07-30T22:29:24Z",
  "date_updated": "2019-07-31T01:09:00Z",
  "url": "https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "evaluations": "https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Evaluations",
    "item_assignments": "https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ItemAssignments",
    "bundle_copies": "https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Copies"
  }
}
```

## List all Bundles

`GET https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles`

If your application requires local inbound connectivity in many number types within a country or with many countries, you will have to create many Regulatory Bundle containers with all necessary information.

### Query parameters

```json
[{"name":"Status","in":"query","description":"The verification status of the Bundle resource. Please refer to [Bundle Statuses](https://www.twilio.com/docs/phone-numbers/regulatory/api/bundles#bundle-statuses) for more details.","schema":{"type":"string","enum":["draft","pending-review","in-review","twilio-rejected","twilio-approved","provisionally-approved"],"description":"The verification status of the Bundle resource.","refName":"bundle_enum_status","modelName":"bundle_enum_status"},"examples":{"readFull":{"value":"draft"},"readApprovedAuMobileWithDate":{"value":"twilio-approved"},"readApprovedAuMobileDateLess":{"value":"twilio-approved"},"readApprovedJapanTollfreeDateBetween":{"value":"twilio-approved"}}},{"name":"BundleSids","in":"query","required":false,"description":"A comma-separated list of Bundle SIDs to filter the results (maximum 20). Each Bundle SID must match `^BU[0-9a-fA-F]{32}$`.","schema":{"type":"string","pattern":"^BU[0-9a-fA-F]{32}(,BU[0-9a-fA-F]{32}){0,19}$"}},{"name":"FriendlyName","in":"query","description":"The string that you assigned to describe the resource. The column can contain 255 variable characters.","schema":{"type":"string"},"examples":{"readFull":{"value":"friendly_name"}}},{"name":"RegulationSid","in":"query","description":"The unique string of a [Regulation resource](https://www.twilio.com/docs/phone-numbers/regulatory/api/regulations) that is associated to the Bundle resource.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^RN[0-9a-fA-F]{32}$"},"examples":{"readFull":{"value":"RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"}}},{"name":"IsoCountry","in":"query","description":"The 2-digit [ISO country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) of the Bundle's phone number country ownership request.","schema":{"type":"string"},"examples":{"readFull":{"value":"US"},"readApprovedAuMobileWithDate":{"value":"AU"},"readApprovedAuMobileDateLess":{"value":"AU"},"readApprovedJapanTollfreeDateBetween":{"value":"JP"}}},{"name":"NumberType","in":"query","description":"The type of phone number of the Bundle's ownership request. Can be `local`, `mobile`, `national`, or `toll-free`.","schema":{"type":"string"},"examples":{"readFull":{"value":"mobile"},"readApprovedAuMobileWithDate":{"value":"mobile"},"readApprovedAuMobileDateLess":{"value":"mobile"},"readApprovedJapanTollfreeDateBetween":{"value":"tollfree"}}},{"name":"EndUserType","in":"query","description":"The end user type of the regulation of the Bundle. Can be `business` or `individual`.","schema":{"type":"string","enum":["business","individual"]}},{"name":"HasValidUntilDate","in":"query","description":"Indicates that the Bundle is a valid Bundle until a specified expiration date.","schema":{"type":"boolean"},"examples":{"readApprovedAuMobileWithDate":{"value":"true"}}},{"name":"SortBy","in":"query","description":"Can be `valid-until` or `date-updated`. Defaults to `date-created`.","schema":{"type":"string","enum":["valid-until","date-updated"],"refName":"bundle_enum_sort_by","modelName":"bundle_enum_sort_by"}},{"name":"SortDirection","in":"query","description":"Default is `DESC`. Can be `ASC` or `DESC`.","schema":{"type":"string","enum":["ASC","DESC"],"refName":"bundle_enum_sort_direction","modelName":"bundle_enum_sort_direction"}},{"name":"ValidUntilDate","in":"query","description":"Date to filter Bundles having their `valid_until_date` before or after the specified date. Can be `ValidUntilDate>=` or `ValidUntilDate<=`. Both can be used in conjunction as well. [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) is the acceptable date format.","schema":{"type":"string","format":"date-time"}},{"name":"ValidUntilDate<","in":"query","description":"Date to filter Bundles having their `valid_until_date` before or after the specified date. Can be `ValidUntilDate>=` or `ValidUntilDate<=`. Both can be used in conjunction as well. [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) is the acceptable date format.","schema":{"type":"string","format":"date-time"},"examples":{"readApprovedAuMobileDateLess":{"value":"2022-11-29T23:59:59Z"},"readApprovedJapanTollfreeDateBetween":{"value":"2022-11-29T23:59:59Z"}}},{"name":"ValidUntilDate>","in":"query","description":"Date to filter Bundles having their `valid_until_date` before or after the specified date. Can be `ValidUntilDate>=` or `ValidUntilDate<=`. Both can be used in conjunction as well. [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) is the acceptable date format.","schema":{"type":"string","format":"date-time"},"examples":{"readApprovedJapanTollfreeDateBetween":{"value":"2022-01-01T00:00:00Z"}}},{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

List all Bundles

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listBundle() {
  const bundles = await client.numbers.v2.regulatoryCompliance.bundles.list({
    limit: 20,
  });

  bundles.forEach((b) => console.log(b.sid));
}

listBundle();
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

bundles = client.numbers.v2.regulatory_compliance.bundles.list(limit=20)

for record in bundles:
    print(record.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Numbers.V2.RegulatoryCompliance;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var bundles = await BundleResource.ReadAsync(limit: 20);

        foreach (var record in bundles) {
            Console.WriteLine(record.Sid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.numbers.v2.regulatorycompliance.Bundle;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Bundle> bundles = Bundle.reader().limit(20).read();

        for (Bundle record : bundles) {
            System.out.println(record.getSid());
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
	numbers "github.com/twilio/twilio-go/rest/numbers/v2"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &numbers.ListBundleParams{}
	params.SetLimit(20)

	resp, err := client.NumbersV2.ListBundle(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].Sid != nil {
				fmt.Println(*resp[record].Sid)
			} else {
				fmt.Println(resp[record].Sid)
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

$bundles = $twilio->numbers->v2->regulatoryCompliance->bundles->read([], 20);

foreach ($bundles as $record) {
    print $record->sid;
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

bundles = @client
          .numbers
          .v2
          .regulatory_compliance
          .bundles
          .list(limit: 20)

bundles.each do |record|
   puts record.sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:numbers:v2:regulatory-compliance:bundles:list
```

```bash
curl -X GET "https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "results": [],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles?PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles?PageSize=50&Page=0",
    "next_page_url": null,
    "key": "results"
  }
}
```

## Update a Bundle instance

`POST https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/{Sid}`

### Path parameters

```json
[{"name":"Sid","in":"path","description":"The unique string that we created to identify the Bundle resource.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^BU[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"UpdateBundleRequest","properties":{"Status":{"type":"string","enum":["draft","pending-review","in-review","twilio-rejected","twilio-approved","provisionally-approved"],"description":"The verification status of the Bundle resource.","refName":"bundle_enum_status","modelName":"bundle_enum_status"},"StatusCallback":{"type":"string","format":"uri","description":"The URL we call to inform your application of status changes."},"FriendlyName":{"type":"string","description":"The string that you assigned to describe the resource."},"Email":{"type":"string","description":"The email address that will receive updates when the Bundle resource changes status."}}},"examples":{"update":{"value":{"lang":"json","value":"{\n  \"Status\": \"draft\",\n  \"StatusCallback\": \"http://www.example.com\",\n  \"FriendlyName\": \"friendly_name\",\n  \"Email\": \"email\"\n}","meta":"","code":"{\n  \"Status\": \"draft\",\n  \"StatusCallback\": \"http://www.example.com\",\n  \"FriendlyName\": \"friendly_name\",\n  \"Email\": \"email\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Status\"","#7EE787"],[":","#C9D1D9"]," ",["\"draft\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallback\"","#7EE787"],[":","#C9D1D9"]," ",["\"http://www.example.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"friendly_name\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Email\"","#7EE787"],[":","#C9D1D9"]," ",["\"email\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Update a Bundle instance

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateBundle() {
  const bundle = await client.numbers.v2.regulatoryCompliance
    .bundles("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update({
      friendlyName: "UpdatedSubmitedFriendlyName",
      status: "pending-review",
    });

  console.log(bundle.sid);
}

updateBundle();
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

bundle = client.numbers.v2.regulatory_compliance.bundles(
    "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).update(friendly_name="UpdatedSubmitedFriendlyName", status="pending-review")

print(bundle.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Numbers.V2.RegulatoryCompliance;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var bundle = await BundleResource.UpdateAsync(
            friendlyName: "UpdatedSubmitedFriendlyName",
            status: BundleResource.StatusEnum.PendingReview,
            pathSid: "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(bundle.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.numbers.v2.regulatorycompliance.Bundle;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Bundle bundle = Bundle.updater("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                            .setFriendlyName("UpdatedSubmitedFriendlyName")
                            .setStatus(Bundle.Status.PENDING_REVIEW)
                            .update();

        System.out.println(bundle.getSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	numbers "github.com/twilio/twilio-go/rest/numbers/v2"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &numbers.UpdateBundleParams{}
	params.SetFriendlyName("UpdatedSubmitedFriendlyName")
	params.SetStatus("pending-review")

	resp, err := client.NumbersV2.UpdateBundle("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Sid != nil {
			fmt.Println(*resp.Sid)
		} else {
			fmt.Println(resp.Sid)
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

$bundle = $twilio->numbers->v2->regulatoryCompliance
    ->bundles("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->update([
        "friendlyName" => "UpdatedSubmitedFriendlyName",
        "status" => "pending-review",
    ]);

print $bundle->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

bundle = @client
         .numbers
         .v2
         .regulatory_compliance
         .bundles('BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
         .update(
           friendly_name: 'UpdatedSubmitedFriendlyName',
           status: 'pending-review'
         )

puts bundle.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:numbers:v2:regulatory-compliance:bundles:update \
   --sid BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --friendly-name UpdatedSubmitedFriendlyName \
   --status pending-review
```

```bash
curl -X POST "https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
--data-urlencode "FriendlyName=UpdatedSubmitedFriendlyName" \
--data-urlencode "Status=pending-review" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "regulation_sid": "RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "UpdatedSubmitedFriendlyName",
  "status": "pending-review",
  "email": "email",
  "status_callback": "http://www.example.com",
  "valid_until": null,
  "date_created": "2019-07-30T22:29:24Z",
  "date_updated": "2019-07-31T01:09:00Z",
  "url": "https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "evaluations": "https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Evaluations",
    "item_assignments": "https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ItemAssignments",
    "bundle_copies": "https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Copies"
  }
}
```

## Delete a Bundle instance

`DELETE https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/{Sid}`

The `DELETE` operation is allowed for Regulatory Bundles with status of `DRAFT`, `TWILIO_APPROVED`, or `TWILIO_REJECTED` and have ***no active*** Long Code phone number assignments.

### Path parameters

```json
[{"name":"Sid","in":"path","description":"The unique string that we created to identify the Bundle resource.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^BU[0-9a-fA-F]{32}$"},"required":true}]
```

Delete a Bundle Instance

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function deleteBundle() {
  await client.numbers.v2.regulatoryCompliance
    .bundles("BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .remove();
}

deleteBundle();
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

client.numbers.v2.regulatory_compliance.bundles(
    "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).delete()
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Numbers.V2.RegulatoryCompliance;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        await BundleResource.DeleteAsync(pathSid: "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.numbers.v2.regulatorycompliance.Bundle;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Bundle.deleter("BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").delete();
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

	err := client.NumbersV2.DeleteBundle("BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
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

$twilio->numbers->v2->regulatoryCompliance
    ->bundles("BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
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
  .numbers
  .v2
  .regulatory_compliance
  .bundles('BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  .delete
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:numbers:v2:regulatory-compliance:bundles:remove \
   --sid BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X DELETE "https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```
