# Services resource

> \[!IMPORTANT]
>
> The Services resource is currently available as a Public Beta product. This means that some features for configuring your Messaging Service via the REST API are not yet implemented, and others may be changed before the product is declared Generally Available. Messaging Service Configuration through the [Twilio Console](https://www.twilio.com/console) is Generally Available.
>
> Public Beta products are [not covered by a Twilio SLA](https://help.twilio.com/hc/en-us/articles/115002413087-Twilio-Beta-product-support).
>
> The resources for sending Messages with a Messaging Service are Generally Available.

When sending a message with a Messaging Service, you can improve message performance by enabling the [included features](/docs/messaging/services).

Developers can associate [phone numbers](/docs/messaging/api/phonenumber-resource), [short codes](/docs/messaging/api/services-shortcode-resource), and [alpha sender IDs](/docs/messaging/api/alphasender-resource) to an instance of a Messaging Service. The Service handles all inbound and outbound behaviors for the phone numbers and shortcodes.

**Twilio Console**

You can manage your Messaging Services through the [Twilio Console when logged in.](https://www.twilio.com/console/sms/services)

## Messaging Services Resource

The Services resource represents a set of configurable behavior for sending and receiving Messages.

### Subresources

The Services resource also has PhoneNumbers, ShortCodes, and AlphaSenders subresources for managing the phone numbers, short codes, and alpha sender IDs associated with the Service.

* [PhoneNumbers](/docs/messaging/api/phonenumber-resource)
* [ShortCodes](/docs/messaging/api/services-shortcode-resource)
* [AlphaSenders](/docs/messaging/api/alphasender-resource)

### Resource URI

All URLs in this documentation use the following base URL:

```bash
https://messaging.twilio.com/v1
```

## Service Properties

<OperationTable type="properties" data={{"type":"object","refName":"messaging.v1.service","modelName":"messaging_v1_service","properties":{"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^MG[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that we created to identify the Service resource."},"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Service resource."},"friendly_name":{"type":"string","nullable":true,"description":"The string that you assigned to describe the resource."},"date_created":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was created specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"date_updated":{"type":"string","format":"date-time","nullable":true,"description":"The date and time in GMT when the resource was last updated specified in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format."},"inbound_request_url":{"type":"string","format":"uri","nullable":true,"description":"The URL we call using `inbound_method` when a message is received by any phone number or short code in the Service. When this property is `null`, receiving inbound messages is disabled. All messages sent to the Twilio phone number or short code will not be logged and received on the Account. If the `use_inbound_webhook_on_number` field is enabled then the webhook url defined on the phone number will override the `inbound_request_url` defined for the Messaging Service."},"inbound_method":{"type":"string","format":"http-method","enum":["GET","POST"],"nullable":true,"description":"The HTTP method we use to call `inbound_request_url`. Can be `GET` or `POST`."},"fallback_url":{"type":"string","format":"uri","nullable":true,"description":"The URL that we call using `fallback_method` if an error occurs while retrieving or executing the TwiML from the Inbound Request URL. If the `use_inbound_webhook_on_number` field is enabled then the webhook url defined on the phone number will override the `fallback_url` defined for the Messaging Service."},"fallback_method":{"type":"string","format":"http-method","enum":["GET","POST"],"nullable":true,"description":"The HTTP method we use to call `fallback_url`. Can be: `GET` or `POST`."},"status_callback":{"type":"string","format":"uri","nullable":true,"description":"The URL we call to [pass status updates](https://www.twilio.com/docs/sms/api/message-resource#message-status-values) about message delivery."},"sticky_sender":{"type":"boolean","nullable":true,"description":"Whether to enable [Sticky Sender](https://www.twilio.com/docs/messaging/services#sticky-sender) on the Service instance."},"mms_converter":{"type":"boolean","nullable":true,"description":"Whether to enable the [MMS Converter](https://www.twilio.com/docs/messaging/services#mms-converter) for messages sent through the Service instance."},"smart_encoding":{"type":"boolean","nullable":true,"description":"Whether to enable [Smart Encoding](https://www.twilio.com/docs/messaging/services#smart-encoding) for messages sent through the Service instance."},"scan_message_content":{"type":"string","enum":["inherit","enable","disable"],"description":"Reserved.","refName":"service_enum_scan_message_content","modelName":"service_enum_scan_message_content"},"fallback_to_long_code":{"type":"boolean","nullable":true,"description":"[OBSOLETE] Former feature used to fallback to long code sender after certain short code message failures."},"area_code_geomatch":{"type":"boolean","nullable":true,"description":"Whether to enable [Area Code Geomatch](https://www.twilio.com/docs/messaging/services#area-code-geomatch) on the Service Instance."},"synchronous_validation":{"type":"boolean","nullable":true,"description":"Reserved."},"validity_period":{"type":"integer","default":0,"description":"How long, in seconds, messages sent from the Service are valid. Can be an integer from `1` to `36,000`. Default value is `36,000`."},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the Service resource."},"links":{"type":"object","format":"uri-map","nullable":true,"description":"The absolute URLs of related resources."},"usecase":{"type":"string","nullable":true,"description":"A string that describes the scenario in which the Messaging Service will be used. Possible values are `notifications`, `marketing`, `verification`, `discussion`, `poll`, `undeclared`."},"us_app_to_person_registered":{"type":"boolean","nullable":true,"description":"Whether US A2P campaign is registered for this Service."},"use_inbound_webhook_on_number":{"type":"boolean","nullable":true,"description":"A boolean value that indicates either the webhook url configured on the phone number will be used or `inbound_request_url`/`fallback_url` url will be called when a message is received from the phone number. If this field is enabled then the webhook url defined on the phone number will override the `inbound_request_url`/`fallback_url` defined for the Messaging Service."}}}} />

## Create a Service

`POST https://messaging.twilio.com/v1/Services`

### Request body parameters

```json
{"schema":{"type":"object","title":"CreateServiceRequest","required":["FriendlyName"],"properties":{"FriendlyName":{"type":"string","description":"A descriptive string that you create to describe the resource. It can be up to 64 characters long."},"InboundRequestUrl":{"type":"string","format":"uri","description":"The URL we call using `inbound_method` when a message is received by any phone number or short code in the Service. When this property is `null`, receiving inbound messages is disabled. All messages sent to the Twilio phone number or short code will not be logged and received on the Account. If the `use_inbound_webhook_on_number` field is enabled then the webhook url defined on the phone number will override the `inbound_request_url` defined for the Messaging Service."},"InboundMethod":{"type":"string","format":"http-method","enum":["GET","POST"],"description":"The HTTP method we should use to call `inbound_request_url`. Can be `GET` or `POST` and the default is `POST`."},"FallbackUrl":{"type":"string","format":"uri","description":"The URL that we call using `fallback_method` if an error occurs while retrieving or executing the TwiML from the Inbound Request URL. If the `use_inbound_webhook_on_number` field is enabled then the webhook url defined on the phone number will override the `fallback_url` defined for the Messaging Service."},"FallbackMethod":{"type":"string","format":"http-method","enum":["GET","POST"],"description":"The HTTP method we should use to call `fallback_url`. Can be: `GET` or `POST`."},"StatusCallback":{"type":"string","format":"uri","description":"The URL we should call to [pass status updates](https://www.twilio.com/docs/sms/api/message-resource#message-status-values) about message delivery."},"StickySender":{"type":"boolean","description":"Whether to enable [Sticky Sender](https://www.twilio.com/docs/messaging/services#sticky-sender) on the Service instance."},"MmsConverter":{"type":"boolean","description":"Whether to enable the [MMS Converter](https://www.twilio.com/docs/messaging/services#mms-converter) for messages sent through the Service instance."},"SmartEncoding":{"type":"boolean","description":"Whether to enable [Smart Encoding](https://www.twilio.com/docs/messaging/services#smart-encoding) for messages sent through the Service instance."},"ScanMessageContent":{"type":"string","enum":["inherit","enable","disable"],"description":"Reserved.","refName":"service_enum_scan_message_content","modelName":"service_enum_scan_message_content"},"FallbackToLongCode":{"type":"boolean","description":"[OBSOLETE] Former feature used to fallback to long code sender after certain short code message failures."},"AreaCodeGeomatch":{"type":"boolean","description":"Whether to enable [Area Code Geomatch](https://www.twilio.com/docs/messaging/services#area-code-geomatch) on the Service Instance."},"ValidityPeriod":{"type":"integer","description":"How long, in seconds, messages sent from the Service are valid. Can be an integer from `1` to `36,000`. Default value is `36,000`."},"SynchronousValidation":{"type":"boolean","description":"Reserved."},"Usecase":{"type":"string","description":"A string that describes the scenario in which the Messaging Service will be used. Possible values are `notifications`, `marketing`, `verification`, `discussion`, `poll`, `undeclared`."},"UseInboundWebhookOnNumber":{"type":"boolean","description":"A boolean value that indicates either the webhook url configured on the phone number will be used or `inbound_request_url`/`fallback_url` url will be called when a message is received from the phone number. If this field is enabled then the webhook url defined on the phone number will override the `inbound_request_url`/`fallback_url` defined for the Messaging Service."}}},"examples":{"create":{"value":{"lang":"json","value":"{\n  \"FriendlyName\": \"My Service!\",\n  \"StickySender\": true,\n  \"MmsConverter\": true,\n  \"SmartEncoding\": false,\n  \"FallbackToLongCode\": true,\n  \"InboundRequestUrl\": \"https://www.example.com\",\n  \"InboundMethod\": \"POST\",\n  \"FallbackMethod\": \"GET\",\n  \"FallbackUrl\": \"https://www.example.com\",\n  \"StatusCallback\": \"https://www.example.com\",\n  \"ScanMessageContent\": \"inherit\",\n  \"AreaCodeGeomatch\": true,\n  \"ValidityPeriod\": 600,\n  \"SynchronousValidation\": true,\n  \"Usecase\": \"marketing\",\n  \"UseInboundWebhookOnNumber\": true\n}","meta":"","code":"{\n  \"FriendlyName\": \"My Service!\",\n  \"StickySender\": true,\n  \"MmsConverter\": true,\n  \"SmartEncoding\": false,\n  \"FallbackToLongCode\": true,\n  \"InboundRequestUrl\": \"https://www.example.com\",\n  \"InboundMethod\": \"POST\",\n  \"FallbackMethod\": \"GET\",\n  \"FallbackUrl\": \"https://www.example.com\",\n  \"StatusCallback\": \"https://www.example.com\",\n  \"ScanMessageContent\": \"inherit\",\n  \"AreaCodeGeomatch\": true,\n  \"ValidityPeriod\": 600,\n  \"SynchronousValidation\": true,\n  \"Usecase\": \"marketing\",\n  \"UseInboundWebhookOnNumber\": true\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"My Service!\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"StickySender\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"MmsConverter\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"SmartEncoding\"","#7EE787"],[":","#C9D1D9"]," ",["false","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"FallbackToLongCode\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"InboundRequestUrl\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://www.example.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"InboundMethod\"","#7EE787"],[":","#C9D1D9"]," ",["\"POST\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"FallbackMethod\"","#7EE787"],[":","#C9D1D9"]," ",["\"GET\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"FallbackUrl\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://www.example.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallback\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://www.example.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"ScanMessageContent\"","#7EE787"],[":","#C9D1D9"]," ",["\"inherit\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"AreaCodeGeomatch\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"ValidityPeriod\"","#7EE787"],[":","#C9D1D9"]," ",["600","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"SynchronousValidation\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"Usecase\"","#7EE787"],[":","#C9D1D9"]," ",["\"marketing\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"UseInboundWebhookOnNumber\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Create a Service

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createService() {
  const service = await client.messaging.v1.services.create({
    friendlyName: "FriendlyName",
  });

  console.log(service.sid);
}

createService();
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

service = client.messaging.v1.services.create(friendly_name="FriendlyName")

print(service.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Messaging.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var service = await ServiceResource.CreateAsync(friendlyName: "FriendlyName");

        Console.WriteLine(service.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.messaging.v1.Service;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Service service = Service.creator("FriendlyName").create();

        System.out.println(service.getSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	messaging "github.com/twilio/twilio-go/rest/messaging/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &messaging.CreateServiceParams{}
	params.SetFriendlyName("FriendlyName")

	resp, err := client.MessagingV1.CreateService(params)
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

$service = $twilio->messaging->v1->services->create(
    "FriendlyName" // FriendlyName
);

print $service->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

service = @client
          .messaging
          .v1
          .services
          .create(friendly_name: 'FriendlyName')

puts service.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:messaging:v1:services:create \
   --friendly-name FriendlyName
```

```bash
curl -X POST "https://messaging.twilio.com/v1/Services" \
--data-urlencode "FriendlyName=FriendlyName" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2015-07-30T20:12:31Z",
  "date_updated": "2015-07-30T20:12:33Z",
  "friendly_name": "FriendlyName",
  "inbound_request_url": "https://www.example.com/",
  "inbound_method": "POST",
  "fallback_url": "https://www.example.com",
  "fallback_method": "GET",
  "status_callback": "https://www.example.com",
  "sticky_sender": true,
  "smart_encoding": false,
  "mms_converter": true,
  "fallback_to_long_code": true,
  "scan_message_content": "inherit",
  "area_code_geomatch": true,
  "validity_period": 600,
  "synchronous_validation": true,
  "usecase": "marketing",
  "us_app_to_person_registered": false,
  "use_inbound_webhook_on_number": true,
  "links": {
    "phone_numbers": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers",
    "short_codes": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ShortCodes",
    "alpha_senders": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AlphaSenders",
    "messages": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages",
    "us_app_to_person": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Compliance/Usa2p",
    "us_app_to_person_usecases": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Compliance/Usa2p/Usecases",
    "channel_senders": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelSenders",
    "destination_alpha_senders": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/DestinationAlphaSenders"
  },
  "url": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

## Retrieve a Service

`GET https://messaging.twilio.com/v1/Services/{Sid}`

### Path parameters

```json
[{"name":"Sid","in":"path","description":"The SID of the Service resource to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^MG[0-9a-fA-F]{32}$"},"required":true}]
```

Fetch a Service

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchService() {
  const service = await client.messaging.v1
    .services("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch();

  console.log(service.sid);
}

fetchService();
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

service = client.messaging.v1.services(
    "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).fetch()

print(service.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Messaging.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var service =
            await ServiceResource.FetchAsync(pathSid: "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(service.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.messaging.v1.Service;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Service service = Service.fetcher("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").fetch();

        System.out.println(service.getSid());
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

	resp, err := client.MessagingV1.FetchService("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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

$service = $twilio->messaging->v1
    ->services("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->fetch();

print $service->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

service = @client
          .messaging
          .v1
          .services('MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
          .fetch

puts service.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:messaging:v1:services:fetch \
   --sid MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2015-07-30T20:12:31Z",
  "date_updated": "2015-07-30T20:12:33Z",
  "friendly_name": "My Service!",
  "inbound_request_url": "https://www.example.com/",
  "inbound_method": "POST",
  "fallback_url": null,
  "fallback_method": "POST",
  "status_callback": "https://www.example.com",
  "sticky_sender": true,
  "mms_converter": true,
  "smart_encoding": false,
  "fallback_to_long_code": true,
  "area_code_geomatch": true,
  "validity_period": 600,
  "scan_message_content": "inherit",
  "synchronous_validation": true,
  "usecase": "marketing",
  "us_app_to_person_registered": false,
  "use_inbound_webhook_on_number": true,
  "links": {
    "phone_numbers": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers",
    "short_codes": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ShortCodes",
    "alpha_senders": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AlphaSenders",
    "messages": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages",
    "us_app_to_person": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Compliance/Usa2p",
    "us_app_to_person_usecases": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Compliance/Usa2p/Usecases",
    "channel_senders": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelSenders",
    "destination_alpha_senders": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/DestinationAlphaSenders"
  },
  "url": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

## Retrieve a list of Services

`GET https://messaging.twilio.com/v1/Services`

### Query parameters

```json
[{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

List multiple Services

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listService() {
  const services = await client.messaging.v1.services.list({ limit: 20 });

  services.forEach((s) => console.log(s.sid));
}

listService();
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

services = client.messaging.v1.services.list(limit=20)

for record in services:
    print(record.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Messaging.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var services = await ServiceResource.ReadAsync(limit: 20);

        foreach (var record in services) {
            Console.WriteLine(record.Sid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.messaging.v1.Service;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Service> services = Service.reader().limit(20).read();

        for (Service record : services) {
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
	messaging "github.com/twilio/twilio-go/rest/messaging/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &messaging.ListServiceParams{}
	params.SetLimit(20)

	resp, err := client.MessagingV1.ListService(params)
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

$services = $twilio->messaging->v1->services->read(20);

foreach ($services as $record) {
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

services = @client
           .messaging
           .v1
           .services
           .list(limit: 20)

services.each do |record|
   puts record.sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:messaging:v1:services:list
```

```bash
curl -X GET "https://messaging.twilio.com/v1/Services?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "meta": {
    "page": 0,
    "page_size": 20,
    "first_page_url": "https://messaging.twilio.com/v1/Services?PageSize=20&Page=0",
    "previous_page_url": null,
    "next_page_url": null,
    "key": "services",
    "url": "https://messaging.twilio.com/v1/Services?PageSize=20&Page=0"
  },
  "services": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "friendly_name": "My Service!",
      "sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "date_created": "2015-07-30T20:12:31Z",
      "date_updated": "2015-07-30T20:12:33Z",
      "sticky_sender": true,
      "mms_converter": true,
      "smart_encoding": false,
      "fallback_to_long_code": true,
      "area_code_geomatch": true,
      "validity_period": 600,
      "scan_message_content": "inherit",
      "synchronous_validation": true,
      "inbound_request_url": "https://www.example.com/",
      "inbound_method": "POST",
      "fallback_url": null,
      "fallback_method": "POST",
      "status_callback": "https://www.example.com",
      "usecase": "marketing",
      "us_app_to_person_registered": false,
      "use_inbound_webhook_on_number": false,
      "links": {
        "phone_numbers": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers",
        "short_codes": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ShortCodes",
        "alpha_senders": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AlphaSenders",
        "messages": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages",
        "us_app_to_person": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Compliance/Usa2p",
        "us_app_to_person_usecases": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Compliance/Usa2p/Usecases",
        "channel_senders": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelSenders",
        "destination_alpha_senders": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/DestinationAlphaSenders"
      },
      "url": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ]
}
```

## Update a Service

`POST https://messaging.twilio.com/v1/Services/{Sid}`

You may specify one or more of the optional parameters above to update the Service's respective properties. Parameters not specified in your request are not updated.

### Path parameters

```json
[{"name":"Sid","in":"path","description":"The SID of the Service resource to update.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^MG[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"UpdateServiceRequest","properties":{"FriendlyName":{"type":"string","description":"A descriptive string that you create to describe the resource. It can be up to 64 characters long."},"InboundRequestUrl":{"type":"string","format":"uri","description":"The URL we call using `inbound_method` when a message is received by any phone number or short code in the Service. When this property is `null`, receiving inbound messages is disabled. All messages sent to the Twilio phone number or short code will not be logged and received on the Account. If the `use_inbound_webhook_on_number` field is enabled then the webhook url defined on the phone number will override the `inbound_request_url` defined for the Messaging Service."},"InboundMethod":{"type":"string","format":"http-method","enum":["GET","POST"],"description":"The HTTP method we should use to call `inbound_request_url`. Can be `GET` or `POST` and the default is `POST`."},"FallbackUrl":{"type":"string","format":"uri","description":"The URL that we call using `fallback_method` if an error occurs while retrieving or executing the TwiML from the Inbound Request URL. If the `use_inbound_webhook_on_number` field is enabled then the webhook url defined on the phone number will override the `fallback_url` defined for the Messaging Service."},"FallbackMethod":{"type":"string","format":"http-method","enum":["GET","POST"],"description":"The HTTP method we should use to call `fallback_url`. Can be: `GET` or `POST`."},"StatusCallback":{"type":"string","format":"uri","description":"The URL we should call to [pass status updates](https://www.twilio.com/docs/sms/api/message-resource#message-status-values) about message delivery."},"StickySender":{"type":"boolean","description":"Whether to enable [Sticky Sender](https://www.twilio.com/docs/messaging/services#sticky-sender) on the Service instance."},"MmsConverter":{"type":"boolean","description":"Whether to enable the [MMS Converter](https://www.twilio.com/docs/messaging/services#mms-converter) for messages sent through the Service instance."},"SmartEncoding":{"type":"boolean","description":"Whether to enable [Smart Encoding](https://www.twilio.com/docs/messaging/services#smart-encoding) for messages sent through the Service instance."},"ScanMessageContent":{"type":"string","enum":["inherit","enable","disable"],"description":"Reserved.","refName":"service_enum_scan_message_content","modelName":"service_enum_scan_message_content"},"FallbackToLongCode":{"type":"boolean","description":"[OBSOLETE] Former feature used to fallback to long code sender after certain short code message failures."},"AreaCodeGeomatch":{"type":"boolean","description":"Whether to enable [Area Code Geomatch](https://www.twilio.com/docs/messaging/services#area-code-geomatch) on the Service Instance."},"ValidityPeriod":{"type":"integer","description":"How long, in seconds, messages sent from the Service are valid. Can be an integer from `1` to `36,000`. Default value is `36,000`."},"SynchronousValidation":{"type":"boolean","description":"Reserved."},"Usecase":{"type":"string","description":"A string that describes the scenario in which the Messaging Service will be used. Possible values are `notifications`, `marketing`, `verification`, `discussion`, `poll`, `undeclared`."},"UseInboundWebhookOnNumber":{"type":"boolean","description":"A boolean value that indicates either the webhook url configured on the phone number will be used or `inbound_request_url`/`fallback_url` url will be called when a message is received from the phone number. If this field is enabled then the webhook url defined on the phone number will override the `inbound_request_url`/`fallback_url` defined for the Messaging Service."}}},"examples":{"update":{"value":{"lang":"json","value":"{\n  \"StickySender\": false\n}","meta":"","code":"{\n  \"StickySender\": false\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"StickySender\"","#7EE787"],[":","#C9D1D9"]," ",["false","#79C0FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Update a Service

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateService() {
  const service = await client.messaging.v1
    .services("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update({ friendlyName: "FriendlyName" });

  console.log(service.sid);
}

updateService();
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

service = client.messaging.v1.services(
    "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).update(friendly_name="FriendlyName")

print(service.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Messaging.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var service = await ServiceResource.UpdateAsync(
            friendlyName: "FriendlyName", pathSid: "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(service.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.messaging.v1.Service;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Service service =
            Service.updater("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").setFriendlyName("FriendlyName").update();

        System.out.println(service.getSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	messaging "github.com/twilio/twilio-go/rest/messaging/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &messaging.UpdateServiceParams{}
	params.SetFriendlyName("FriendlyName")

	resp, err := client.MessagingV1.UpdateService("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$service = $twilio->messaging->v1
    ->services("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->update(["friendlyName" => "FriendlyName"]);

print $service->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

service = @client
          .messaging
          .v1
          .services('MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
          .update(friendly_name: 'FriendlyName')

puts service.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:messaging:v1:services:update \
   --sid MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --friendly-name FriendlyName
```

```bash
curl -X POST "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
--data-urlencode "FriendlyName=FriendlyName" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "FriendlyName",
  "sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2015-07-30T20:12:31Z",
  "date_updated": "2015-07-30T20:12:33Z",
  "sticky_sender": false,
  "mms_converter": true,
  "smart_encoding": false,
  "fallback_to_long_code": true,
  "scan_message_content": "inherit",
  "synchronous_validation": true,
  "area_code_geomatch": true,
  "validity_period": 600,
  "inbound_request_url": "https://www.example.com",
  "inbound_method": "POST",
  "fallback_url": null,
  "fallback_method": "POST",
  "status_callback": "https://www.example.com",
  "usecase": "marketing",
  "us_app_to_person_registered": false,
  "use_inbound_webhook_on_number": true,
  "links": {
    "phone_numbers": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers",
    "short_codes": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ShortCodes",
    "alpha_senders": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AlphaSenders",
    "messages": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages",
    "us_app_to_person": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Compliance/Usa2p",
    "us_app_to_person_usecases": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Compliance/Usa2p/Usecases",
    "channel_senders": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelSenders",
    "destination_alpha_senders": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/DestinationAlphaSenders"
  },
  "url": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

## Delete a Service

`DELETE https://messaging.twilio.com/v1/Services/{Sid}`

When a Service is deleted, all phone numbers and short codes in the Service are returned to your Account.

> \[!WARNING]
>
> If you are using a Messaging Service for A2P 10DLC, you should **not** delete the Messaging Service. Doing so deletes the A2P 10DLC Campaign, which immediately halts all US A2P 10DLC messaging. A new Campaign and Messaging Service must be created and re-registered. This process can take several days.

### Path parameters

```json
[{"name":"Sid","in":"path","description":"The SID of the Service resource to delete.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^MG[0-9a-fA-F]{32}$"},"required":true}]
```

Delete a Service

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function deleteService() {
  await client.messaging.v1
    .services("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .remove();
}

deleteService();
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

client.messaging.v1.services("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete()
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Messaging.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        await ServiceResource.DeleteAsync(pathSid: "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.messaging.v1.Service;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Service.deleter("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete();
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

	err := client.MessagingV1.DeleteService("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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

$twilio->messaging->v1
    ->services("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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
  .messaging
  .v1
  .services('MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  .delete
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:messaging:v1:services:remove \
   --sid MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X DELETE "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```
