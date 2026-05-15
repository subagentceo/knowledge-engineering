# Conversation Intelligence (classic) - Service Resource

An Intelligence Service provides control and configuration for how voice call recordings are processed into Transcripts. [Conversation Intelligence (classic) Transcripts](/docs/conversation-intelligence-classic/api/transcript-resource#create-a-new-transcript) belong to a particular Service and inherit its configuration.

The [Service-level configuration](/docs/conversation-intelligence-classic/onboarding#services) includes features like data logging, auto-transcription, and auto-redaction.

## Service Properties

<OperationTable type="properties" data={{"type":"object","refName":"intelligence.v2.service","modelName":"intelligence_v2_service","properties":{"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The unique SID identifier of the Account the Service belongs to."},"auto_redaction":{"type":"boolean","nullable":true,"description":"Instructs the Speech Recognition service to automatically redact PII from all transcripts made on this service."},"media_redaction":{"type":"boolean","nullable":true,"description":"Instructs the Speech Recognition service to automatically redact PII from all transcripts media made on this service. The auto_redaction flag must be enabled, results in error otherwise."},"auto_transcribe":{"type":"boolean","nullable":true,"description":"Instructs the Speech Recognition service to automatically transcribe all recordings made on the account."},"data_logging":{"type":"boolean","nullable":true,"description":"Data logging allows Twilio to improve the quality of the speech recognition & language understanding services through using customer data to refine, fine tune and evaluate machine learning models.\nNote: Data logging cannot be activated via API, only via www.twilio.com, as it requires additional consent."},"date_created":{"type":"string","format":"date-time","nullable":true,"description":"The date that this Service was created, given in ISO 8601 format."},"date_updated":{"type":"string","format":"date-time","nullable":true,"description":"The date that this Service was updated, given in ISO 8601 format."},"friendly_name":{"type":"string","nullable":true,"description":"A human readable description of this resource, up to 64 characters."},"language_code":{"type":"string","nullable":true,"description":"The language code set during Service creation determines the Transcription language for all call recordings processed by that Service. The default is en-US if no language code is set. A Service can only support one language code, and it cannot be updated once it's set."},"sid":{"type":"string","nullable":true,"description":"A 34 character string that uniquely identifies this Service."},"unique_name":{"type":"string","nullable":true,"description":"Provides a unique and addressable name to be assigned to this Service, assigned by the developer, to be optionally used in addition to SID."},"url":{"type":"string","format":"uri","nullable":true,"description":"The URL of this resource."},"webhook_url":{"type":"string","nullable":true,"description":"The URL Twilio will request when executing the Webhook."},"webhook_http_method":{"type":"string","enum":["GET","POST","NULL"],"description":"The HTTP method for the Webhook. One of `GET` or `POST`.","refName":"service_enum_http_method","modelName":"service_enum_http_method"},"read_only_attached_operator_sids":{"type":"array","nullable":true,"description":"Operator sids attached to this service, read only","items":{"type":"string","minLength":34,"maxLength":34,"pattern":"^LY[0-9a-fA-F]{32}$"}},"version":{"type":"integer","default":0,"description":"The version number of this Service."},"encryption_credential_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^CR[0-9a-fA-F]{32}$","nullable":true,"description":"The unique SID identifier of the Public Key resource used to encrypt the sentences and operator results."}}}} />

## Create a Service

`POST https://intelligence.twilio.com/v2/Services`

### Request body parameters

```json
{"schema":{"type":"object","title":"CreateServiceRequest","required":["UniqueName"],"properties":{"UniqueName":{"type":"string","description":"Provides a unique and addressable name to be assigned to this Service, assigned by the developer, to be optionally used in addition to SID."},"AutoTranscribe":{"type":"boolean","description":"Instructs the Speech Recognition service to automatically transcribe all recordings made on the account."},"DataLogging":{"type":"boolean","description":"Data logging allows Twilio to improve the quality of the speech recognition & language understanding services through using customer data to refine, fine tune and evaluate machine learning models.\nNote: Data logging cannot be activated via API, only via www.twilio.com, as it requires additional consent."},"FriendlyName":{"type":"string","description":"A human readable description of this resource, up to 64 characters."},"LanguageCode":{"type":"string","description":"The language code set during Service creation determines the Transcription language for all call recordings processed by that Service. The default is en-US if no language code is set. A Service can only support one language code, and it cannot be updated once it's set."},"AutoRedaction":{"type":"boolean","description":"Instructs the Speech Recognition service to automatically redact PII from all transcripts made on this service."},"MediaRedaction":{"type":"boolean","description":"Instructs the Speech Recognition service to automatically redact PII from all transcripts media made on this service. The auto_redaction flag must be enabled, results in error otherwise."},"WebhookUrl":{"type":"string","description":"The URL Twilio will request when executing the Webhook."},"WebhookHttpMethod":{"type":"string","enum":["GET","POST","NULL"],"description":"The HTTP method for the Webhook. One of `GET` or `POST`.","refName":"service_enum_http_method","modelName":"service_enum_http_method"},"EncryptionCredentialSid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^CR[0-9a-fA-F]{32}$","description":"The unique SID identifier of the Public Key resource used to encrypt the sentences and operator results."}}},"examples":{"create":{"value":{"lang":"json","value":"{\n  \"UniqueName\": \"something\",\n  \"FriendlyName\": \"some friendly name\",\n  \"LanguageCode\": \"en-US\",\n  \"WebhookUrl\": \"https://www.twilio.com\",\n  \"WebhookHttpMethod\": \"POST\",\n  \"EncryptionCredentialSid\": \"CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"\n}","meta":"","code":"{\n  \"UniqueName\": \"something\",\n  \"FriendlyName\": \"some friendly name\",\n  \"LanguageCode\": \"en-US\",\n  \"WebhookUrl\": \"https://www.twilio.com\",\n  \"WebhookHttpMethod\": \"POST\",\n  \"EncryptionCredentialSid\": \"CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"UniqueName\"","#7EE787"],[":","#C9D1D9"]," ",["\"something\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"some friendly name\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"LanguageCode\"","#7EE787"],[":","#C9D1D9"]," ",["\"en-US\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"WebhookUrl\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://www.twilio.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"WebhookHttpMethod\"","#7EE787"],[":","#C9D1D9"]," ",["\"POST\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"EncryptionCredentialSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

### Additional information

This section includes additional details for optional parameters you can pass when creating and [updating](#update-a-service) an Intelligence Service:

#### AutoTranscribe

Enable `auto_transcribe` if you want the Service to automatically transcribe all Twilio [Voice call recordings](/docs/voice/api/recording) on your Account. See the [onboarding guide](/docs/conversation-intelligence-classic/onboarding#enable-automatic-transcription-of-all-twilio-voice-call-recordings) for additional details and the billing implications auto-transcription can have on your Account.

#### WebhookUrl

The `webhook_url` parameter allows you to specify a URL for Twilio to send webhook requests to for each event specified in the `event_type` parameter.

Twilio passes the following properties with its request to your webhook URL:

| Parameter                   | Description                                                                      |
| :-------------------------- | :------------------------------------------------------------------------------- |
| `account_sid`               | Unique identifier of the Account associated with the Transcript.                 |
| `service_sid`               | Unique identifier of the Service associated with the Transcript.                 |
| `transcript_sid`            | Unique identifier of the Transcript.                                             |
| `customer_key`              | Customer key provided by the user on the Transcript creation.                    |
| `event_type`                | Webhook event type. The value will be `voice_intelligence_transcript_available`. |
| `encryption_credential_sid` | Unique identifier of the public key resource used for encryption.                |

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
  const service = await client.intelligence.v2.services.create({
    uniqueName: "MyService",
  });

  console.log(service.accountSid);
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

service = client.intelligence.v2.services.create(unique_name="MyService")

print(service.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Intelligence.V2;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var service = await ServiceResource.CreateAsync(uniqueName: "MyService");

        Console.WriteLine(service.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.intelligence.v2.Service;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Service service = Service.creator("MyService").create();

        System.out.println(service.getAccountSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	intelligence "github.com/twilio/twilio-go/rest/intelligence/v2"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &intelligence.CreateServiceParams{}
	params.SetUniqueName("MyService")

	resp, err := client.IntelligenceV2.CreateService(params)
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

$service = $twilio->intelligence->v2->services->create(
    "MyService" // UniqueName
);

print $service->accountSid;
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
          .intelligence
          .v2
          .services
          .create(unique_name: 'MyService')

puts service.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:intelligence:v2:services:create \
   --unique-name MyService
```

```bash
curl -X POST "https://intelligence.twilio.com/v2/Services" \
--data-urlencode "UniqueName=MyService" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "unique_name": "MyService",
  "friendly_name": "some friendly name",
  "date_created": "2010-08-31T20:36:28Z",
  "date_updated": "2010-08-31T20:36:28Z",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "auto_redaction": false,
  "media_redaction": false,
  "auto_transcribe": true,
  "data_logging": true,
  "language_code": "en-US",
  "webhook_url": "https://www.twilio.com",
  "webhook_http_method": "POST",
  "read_only_attached_operator_sids": [
    "LYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  ],
  "version": 1,
  "encryption_credential_sid": "CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://intelligence.twilio.com/v2/Services/GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

## Fetch a Service

`GET https://intelligence.twilio.com/v2/Services/{Sid}`

This endpoint allows you to fetch an Intelligence Service by its `sid` or `unique_name`.

### Path parameters

```json
[{"name":"Sid","in":"path","description":"A 34 character string that uniquely identifies this Service.","schema":{"type":"string"},"required":true}]
```

Fetch a Service by SID

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchService() {
  const service = await client.intelligence.v2
    .services("GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch();

  console.log(service.accountSid);
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

service = client.intelligence.v2.services(
    "GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).fetch()

print(service.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Intelligence.V2;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var service =
            await ServiceResource.FetchAsync(pathSid: "GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(service.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.intelligence.v2.Service;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Service service = Service.fetcher("GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").fetch();

        System.out.println(service.getAccountSid());
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

	resp, err := client.IntelligenceV2.FetchService("GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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

$service = $twilio->intelligence->v2
    ->services("GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->fetch();

print $service->accountSid;
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
          .intelligence
          .v2
          .services('GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
          .fetch

puts service.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:intelligence:v2:services:fetch \
   --sid GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://intelligence.twilio.com/v2/Services/GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "unique_name": "something",
  "friendly_name": "some friendly name",
  "date_created": "2010-08-31T20:36:28Z",
  "date_updated": "2010-08-31T20:36:28Z",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "auto_redaction": false,
  "media_redaction": false,
  "auto_transcribe": true,
  "data_logging": true,
  "language_code": "en-US",
  "webhook_url": "https://www.twilio.com",
  "webhook_http_method": "POST",
  "read_only_attached_operator_sids": [
    "LYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  ],
  "encryption_credential_sid": "CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "version": 1,
  "url": "https://intelligence.twilio.com/v2/Services/GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

## Fetch Multiple Services

`GET https://intelligence.twilio.com/v2/Services`

This endpoint allows you to fetch multiple Intelligence Services based on the following optional query parameters.

### Query parameters

```json
[{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

Retrieves a list of all Services for an account

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listService() {
  const services = await client.intelligence.v2.services.list({ limit: 20 });

  services.forEach((s) => console.log(s.accountSid));
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

services = client.intelligence.v2.services.list(limit=20)

for record in services:
    print(record.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Intelligence.V2;
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
            Console.WriteLine(record.AccountSid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.intelligence.v2.Service;
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
	intelligence "github.com/twilio/twilio-go/rest/intelligence/v2"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &intelligence.ListServiceParams{}
	params.SetLimit(20)

	resp, err := client.IntelligenceV2.ListService(params)
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

$services = $twilio->intelligence->v2->services->read(20);

foreach ($services as $record) {
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

services = @client
           .intelligence
           .v2
           .services
           .list(limit: 20)

services.each do |record|
   puts record.account_sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:intelligence:v2:services:list
```

```bash
curl -X GET "https://intelligence.twilio.com/v2/Services?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "services": [
    {
      "sid": "GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "unique_name": "something",
      "friendly_name": "some friendly name",
      "date_created": "2010-08-31T20:36:28Z",
      "date_updated": "2010-08-31T20:36:28Z",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "auto_redaction": false,
      "media_redaction": false,
      "auto_transcribe": true,
      "data_logging": true,
      "language_code": "en-US",
      "webhook_url": "https://www.twilio.com",
      "webhook_http_method": "POST",
      "read_only_attached_operator_sids": [
        "LYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
      ],
      "encryption_credential_sid": "CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "version": 1,
      "url": "https://intelligence.twilio.com/v2/Services/GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ],
  "meta": {
    "key": "services",
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://intelligence.twilio.com/v2/Services?PageSize=50&Page=0",
    "next_page_url": null,
    "previous_page_url": null,
    "url": "https://intelligence.twilio.com/v2/Services?PageSize=50&Page=0"
  }
}
```

## Update a Service

`POST https://intelligence.twilio.com/v2/Services/{Sid}`

This endpoint allows you to update an existing Intelligence Service on your Account. To retrieve the configuration details of the Service you wish to update, you can [fetch a specific Service](#fetch-a-service) or [a list of Services](/docs/conversation-intelligence-classic/api/service-resource#fetch-multiple-services) on your Account.

### If-Match header

When updating an existing Service, you can specify the latest `version` as an [If-Match header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-Match) in your request to prevent concurrent updates.

> \[!NOTE]
>
> It can take up to five minutes to propagate any changes to a Service.
>
> Transcripts generated just after updating parameters like `AutoTranscribe`, `AutoRedaction`, or `MediaRedaction` may be generated using the old configuration. Please consider this delay if you want to apply specific settings to your Conversation Intelligence (classic) Transcripts. Refer to the [onboarding guide](/docs/conversation-intelligence-classic/onboarding) for additional considerations when making changes to your Service.
>
> See also [Additional information](#additional-information) on `AutoTranscribe` and the `WebhookUrl` body parameters.

### Headers

```json
[{"name":"If-Match","in":"header","description":"The If-Match HTTP request header","schema":{"type":"string"}}]
```

### Path parameters

```json
[{"name":"Sid","in":"path","description":"A 34 character string that uniquely identifies this Service.","schema":{"type":"string"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"UpdateServiceRequest","properties":{"AutoTranscribe":{"type":"boolean","description":"Instructs the Speech Recognition service to automatically transcribe all recordings made on the account."},"DataLogging":{"type":"boolean","description":"Data logging allows Twilio to improve the quality of the speech recognition & language understanding services through using customer data to refine, fine tune and evaluate machine learning models.\nNote: Data logging cannot be activated via API, only via www.twilio.com, as it requires additional consent."},"FriendlyName":{"type":"string","description":"A human readable description of this resource, up to 64 characters."},"UniqueName":{"type":"string","description":"Provides a unique and addressable name to be assigned to this Service, assigned by the developer, to be optionally used in addition to SID."},"AutoRedaction":{"type":"boolean","description":"Instructs the Speech Recognition service to automatically redact PII from all transcripts made on this service."},"MediaRedaction":{"type":"boolean","description":"Instructs the Speech Recognition service to automatically redact PII from all transcripts media made on this service. The auto_redaction flag must be enabled, results in error otherwise."},"WebhookUrl":{"type":"string","description":"The URL Twilio will request when executing the Webhook."},"WebhookHttpMethod":{"type":"string","enum":["GET","POST","NULL"],"description":"The HTTP method for the Webhook. One of `GET` or `POST`.","refName":"service_enum_http_method","modelName":"service_enum_http_method"},"EncryptionCredentialSid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^CR[0-9a-fA-F]{32}$","description":"The unique SID identifier of the Public Key resource used to encrypt the sentences and operator results."}}},"examples":{"update":{"value":{"lang":"json","value":"{\n  \"UniqueName\": \"something\",\n  \"FriendlyName\": \"some friendly name\",\n  \"WebhookUrl\": \"https://www.sendgrid.com\",\n  \"WebhookHttpMethod\": \"GET\",\n  \"EncryptionCredentialSid\": \"CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"\n}","meta":"","code":"{\n  \"UniqueName\": \"something\",\n  \"FriendlyName\": \"some friendly name\",\n  \"WebhookUrl\": \"https://www.sendgrid.com\",\n  \"WebhookHttpMethod\": \"GET\",\n  \"EncryptionCredentialSid\": \"CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"UniqueName\"","#7EE787"],[":","#C9D1D9"]," ",["\"something\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"some friendly name\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"WebhookUrl\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://www.sendgrid.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"WebhookHttpMethod\"","#7EE787"],[":","#C9D1D9"]," ",["\"GET\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"EncryptionCredentialSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Update Auto-Transcription Setting to False

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateService() {
  const service = await client.intelligence.v2
    .services("GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update({ autoTranscribe: false });

  console.log(service.accountSid);
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

service = client.intelligence.v2.services(
    "GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).update(auto_transcribe=False)

print(service.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Intelligence.V2;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var service = await ServiceResource.UpdateAsync(
            autoTranscribe: false, pathSid: "GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(service.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.intelligence.v2.Service;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Service service = Service.updater("GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").setAutoTranscribe(false).update();

        System.out.println(service.getAccountSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	intelligence "github.com/twilio/twilio-go/rest/intelligence/v2"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &intelligence.UpdateServiceParams{}
	params.SetAutoTranscribe(false)

	resp, err := client.IntelligenceV2.UpdateService("GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$service = $twilio->intelligence->v2
    ->services("GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->update(["autoTranscribe" => false]);

print $service->accountSid;
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
          .intelligence
          .v2
          .services('GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
          .update(auto_transcribe: false)

puts service.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:intelligence:v2:services:update \
   --sid GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X POST "https://intelligence.twilio.com/v2/Services/GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
--data-urlencode "AutoTranscribe=false" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "unique_name": "something",
  "friendly_name": "some friendly name",
  "date_created": "2010-08-31T20:36:28Z",
  "date_updated": "2010-08-31T20:36:28Z",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "auto_redaction": false,
  "media_redaction": false,
  "auto_transcribe": false,
  "data_logging": true,
  "webhook_url": "https://www.sendgrid.com",
  "webhook_http_method": "GET",
  "language_code": "en-US",
  "read_only_attached_operator_sids": [
    "LYaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
  ],
  "version": 2,
  "encryption_credential_sid": "CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://intelligence.twilio.com/v2/Services/GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

## Delete a Service

`DELETE https://intelligence.twilio.com/v2/Services/{Sid}`

### Path parameters

```json
[{"name":"Sid","in":"path","description":"A 34 character string that uniquely identifies this Service.","schema":{"type":"string"},"required":true}]
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
  await client.intelligence.v2
    .services("GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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

client.intelligence.v2.services("GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete()
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Intelligence.V2;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        await ServiceResource.DeleteAsync(pathSid: "GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.intelligence.v2.Service;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Service.deleter("GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").delete();
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

	err := client.IntelligenceV2.DeleteService("GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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

$twilio->intelligence->v2
    ->services("GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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
  .intelligence
  .v2
  .services('GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  .delete
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:intelligence:v2:services:remove \
   --sid GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X DELETE "https://intelligence.twilio.com/v2/Services/GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```
