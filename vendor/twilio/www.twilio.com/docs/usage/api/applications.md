# REST API: Applications

An Application Resource (also referred to as a "TwiML Application" or "TwiML App") represents a collection of endpoints that return TwiML instructions to Twilio. TwiML Applications are most commonly used for the [Voice SDKs](/docs/voice/sdks#twiml-apps) to handle outbound calls, but can also be used to configure multiple phone numbers with the same set of TwiML endpoints. You can manage TwiML Applications through the Applications Resource, in the [Twilio Console](https://1console.twilio.com/go?to=/account/__account__/us1/voice/twiml-apps/), or in the [legacy Console](https://console.twilio.com/?frameUrl=/console/voice/twiml/apps).

The Applications list resource represents the set of an account's Twilio
applications. You can `POST` to the list resource to create a new application.
Note that accounts can contain at most 1000 applications.

Applications are useful for encapsulating configuration information that you
need to distribute across multiple phone numbers. You can assign an
ApplicationSid to an IncomingPhoneNumber to tell Twilio to use the application's
URLs instead of the ones set directly on the IncomingPhoneNumber. So if you
create an application with its VoiceUrl set to [http://myapp.com/answer](http://myapp.com/answer), you can
assign that application to all of your phone numbers and Twilio will make a
request to that URL whenever a call comes in.

## Application Properties

<OperationTable type="properties" data={{"title":"ListApplicationResponse","type":"object","properties":{"end":{"type":"integer"},"first_page_uri":{"format":"uri","type":"string"},"next_page_uri":{"format":"uri","nullable":true,"type":"string"},"page":{"type":"integer"},"page_size":{"type":"integer"},"previous_page_uri":{"format":"uri","nullable":true,"type":"string"},"start":{"type":"integer"},"uri":{"format":"uri","type":"string"},"applications":{"type":"array","items":{"type":"object","refName":"api.v2010.account.application","modelName":"api_v2010_account_application","properties":{"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Application resource."},"api_version":{"type":"string","nullable":true,"description":"The API version used to start a new TwiML session."},"date_created":{"type":"string","format":"date-time-rfc-2822","nullable":true,"description":"The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format."},"date_updated":{"type":"string","format":"date-time-rfc-2822","nullable":true,"description":"The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format."},"friendly_name":{"type":"string","nullable":true,"description":"The string that you assigned to describe the resource."},"message_status_callback":{"type":"string","format":"uri","nullable":true,"description":"The URL we call using a POST method to send message status information to your application."},"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AP[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that that we created to identify the Application resource."},"sms_fallback_method":{"type":"string","format":"http-method","enum":["GET","POST"],"nullable":true,"description":"The HTTP method we use to call `sms_fallback_url`. Can be: `GET` or `POST`."},"sms_fallback_url":{"type":"string","format":"uri","nullable":true,"description":"The URL that we call when an error occurs while retrieving or executing the TwiML from `sms_url`."},"sms_method":{"type":"string","format":"http-method","enum":["GET","POST"],"nullable":true,"description":"The HTTP method we use to call `sms_url`. Can be: `GET` or `POST`."},"sms_status_callback":{"type":"string","format":"uri","nullable":true,"description":"The URL we call using a POST method to send status information to your application about SMS messages that refer to the application."},"sms_url":{"type":"string","format":"uri","nullable":true,"description":"The URL we call when the phone number receives an incoming SMS message."},"status_callback":{"type":"string","format":"uri","nullable":true,"description":"The URL we call using the `status_callback_method` to send status information to your application."},"status_callback_method":{"type":"string","format":"http-method","enum":["GET","POST"],"nullable":true,"description":"The HTTP method we use to call `status_callback`. Can be: `GET` or `POST`."},"uri":{"type":"string","nullable":true,"description":"The URI of the resource, relative to `https://api.twilio.com`."},"voice_caller_id_lookup":{"type":"boolean","nullable":true,"description":"Whether we look up the caller's caller-ID name from the CNAM database (additional charges apply). Can be: `true` or `false`."},"voice_fallback_method":{"type":"string","format":"http-method","enum":["GET","POST"],"nullable":true,"description":"The HTTP method we use to call `voice_fallback_url`. Can be: `GET` or `POST`."},"voice_fallback_url":{"type":"string","format":"uri","nullable":true,"description":"The URL that we call when an error occurs retrieving or executing the TwiML requested by `url`."},"voice_method":{"type":"string","format":"http-method","enum":["GET","POST"],"nullable":true,"description":"The HTTP method we use to call `voice_url`. Can be: `GET` or `POST`."},"voice_url":{"type":"string","format":"uri","nullable":true,"description":"The URL we call when the phone number assigned to this application receives a call."},"public_application_connect_enabled":{"type":"boolean","nullable":true,"description":"Whether to allow other Twilio accounts to dial this applicaton using Dial verb. Can be: `true` or `false`."}}}}}}} />

## Create an Application resource

`POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Applications.json`

Creates a new application within your account.

If successful, Twilio responds with a representation of the new application.

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that will create the resource.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"CreateApplicationRequest","properties":{"ApiVersion":{"type":"string","description":"The API version to use to start a new TwiML session. Can be: `2010-04-01` or `2008-08-01`. The default value is the account's default API version."},"VoiceUrl":{"type":"string","format":"uri","description":"The URL we should call when the phone number assigned to this application receives a call."},"VoiceMethod":{"type":"string","format":"http-method","enum":["GET","POST"],"description":"The HTTP method we should use to call `voice_url`. Can be: `GET` or `POST`."},"VoiceFallbackUrl":{"type":"string","format":"uri","description":"The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`."},"VoiceFallbackMethod":{"type":"string","format":"http-method","enum":["GET","POST"],"description":"The HTTP method we should use to call `voice_fallback_url`. Can be: `GET` or `POST`."},"StatusCallback":{"type":"string","format":"uri","description":"The URL we should call using the `status_callback_method` to send status information to your application."},"StatusCallbackMethod":{"type":"string","format":"http-method","enum":["GET","POST"],"description":"The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST`."},"VoiceCallerIdLookup":{"type":"boolean","description":"Whether we should look up the caller's caller-ID name from the CNAM database (additional charges apply). Can be: `true` or `false`."},"SmsUrl":{"type":"string","format":"uri","description":"The URL we should call when the phone number receives an incoming SMS message."},"SmsMethod":{"type":"string","format":"http-method","enum":["GET","POST"],"description":"The HTTP method we should use to call `sms_url`. Can be: `GET` or `POST`."},"SmsFallbackUrl":{"type":"string","format":"uri","description":"The URL that we should call when an error occurs while retrieving or executing the TwiML from `sms_url`."},"SmsFallbackMethod":{"type":"string","format":"http-method","enum":["GET","POST"],"description":"The HTTP method we should use to call `sms_fallback_url`. Can be: `GET` or `POST`."},"SmsStatusCallback":{"type":"string","format":"uri","description":"The URL we should call using a POST method to send status information about SMS messages sent by the application."},"MessageStatusCallback":{"type":"string","format":"uri","description":"The URL we should call using a POST method to send message status information to your application."},"FriendlyName":{"type":"string","description":"A descriptive string that you create to describe the new application. It can be up to 64 characters long."},"PublicApplicationConnectEnabled":{"type":"boolean","description":"Whether to allow other Twilio accounts to dial this applicaton using Dial verb. Can be: `true` or `false`."}}},"examples":{"create":{"value":{"lang":"json","value":"{\n  \"FriendlyName\": \"friendly_name\",\n  \"MessageStatusCallback\": \"https://example.com\",\n  \"SmsFallbackMethod\": \"GET\",\n  \"SmsFallbackUrl\": \"https://example.com\",\n  \"SmsMethod\": \"GET\",\n  \"SmsStatusCallback\": \"https://example.com\",\n  \"SmsUrl\": \"https://example.com\",\n  \"StatusCallback\": \"https://example.com\",\n  \"StatusCallbackMethod\": \"GET\",\n  \"VoiceCallerIdLookup\": true,\n  \"VoiceFallbackMethod\": \"GET\",\n  \"VoiceFallbackUrl\": \"https://example.com\",\n  \"VoiceMethod\": \"GET\",\n  \"VoiceUrl\": \"https://example.com\",\n  \"PublicApplicationConnectEnabled\": true\n}","meta":"","code":"{\n  \"FriendlyName\": \"friendly_name\",\n  \"MessageStatusCallback\": \"https://example.com\",\n  \"SmsFallbackMethod\": \"GET\",\n  \"SmsFallbackUrl\": \"https://example.com\",\n  \"SmsMethod\": \"GET\",\n  \"SmsStatusCallback\": \"https://example.com\",\n  \"SmsUrl\": \"https://example.com\",\n  \"StatusCallback\": \"https://example.com\",\n  \"StatusCallbackMethod\": \"GET\",\n  \"VoiceCallerIdLookup\": true,\n  \"VoiceFallbackMethod\": \"GET\",\n  \"VoiceFallbackUrl\": \"https://example.com\",\n  \"VoiceMethod\": \"GET\",\n  \"VoiceUrl\": \"https://example.com\",\n  \"PublicApplicationConnectEnabled\": true\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"friendly_name\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"MessageStatusCallback\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://example.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"SmsFallbackMethod\"","#7EE787"],[":","#C9D1D9"]," ",["\"GET\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"SmsFallbackUrl\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://example.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"SmsMethod\"","#7EE787"],[":","#C9D1D9"]," ",["\"GET\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"SmsStatusCallback\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://example.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"SmsUrl\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://example.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallback\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://example.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallbackMethod\"","#7EE787"],[":","#C9D1D9"]," ",["\"GET\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"VoiceCallerIdLookup\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"VoiceFallbackMethod\"","#7EE787"],[":","#C9D1D9"]," ",["\"GET\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"VoiceFallbackUrl\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://example.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"VoiceMethod\"","#7EE787"],[":","#C9D1D9"]," ",["\"GET\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"VoiceUrl\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://example.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"PublicApplicationConnectEnabled\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Create a New Application Within Your Account

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createApplication() {
  const application = await client.applications.create({
    friendlyName: "Phone Me",
    voiceMethod: "GET",
    voiceUrl: "http://demo.twilio.com/docs/voice.xml",
  });

  console.log(application.accountSid);
}

createApplication();
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

application = client.applications.create(
    voice_method="GET",
    voice_url="http://demo.twilio.com/docs/voice.xml",
    friendly_name="Phone Me",
)

print(application.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var application = await ApplicationResource.CreateAsync(
            voiceMethod: Twilio.Http.HttpMethod.Get,
            voiceUrl: new Uri("http://demo.twilio.com/docs/voice.xml"),
            friendlyName: "Phone Me");

        Console.WriteLine(application.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.net.URI;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Application;
import com.twilio.http.HttpMethod;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Application application = Application.creator()
                                      .setVoiceMethod(HttpMethod.GET)
                                      .setVoiceUrl(URI.create("http://demo.twilio.com/docs/voice.xml"))
                                      .setFriendlyName("Phone Me")
                                      .create();

        System.out.println(application.getAccountSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	api "github.com/twilio/twilio-go/rest/api/v2010"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.CreateApplicationParams{}
	params.SetVoiceMethod("GET")
	params.SetVoiceUrl("http://demo.twilio.com/docs/voice.xml")
	params.SetFriendlyName("Phone Me")

	resp, err := client.Api.CreateApplication(params)
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

$application = $twilio->applications->create([
    "voiceMethod" => "GET",
    "voiceUrl" => "http://demo.twilio.com/docs/voice.xml",
    "friendlyName" => "Phone Me",
]);

print $application->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

application = @client
              .api
              .v2010
              .applications
              .create(
                voice_method: 'GET',
                voice_url: 'http://demo.twilio.com/docs/voice.xml',
                friendly_name: 'Phone Me'
              )

puts application.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:applications:create \
   --voice-method GET \
   --voice-url http://demo.twilio.com/docs/voice.xml \
   --friendly-name "Phone Me"
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Applications.json" \
--data-urlencode "VoiceMethod=GET" \
--data-urlencode "VoiceUrl=http://demo.twilio.com/docs/voice.xml" \
--data-urlencode "FriendlyName=Phone Me" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "date_created": "Mon, 22 Aug 2011 20:59:45 +0000",
  "date_updated": "Tue, 18 Aug 2015 16:48:57 +0000",
  "friendly_name": "Phone Me",
  "message_status_callback": "http://www.example.com/sms-status-callback",
  "sid": "APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sms_fallback_method": "GET",
  "sms_fallback_url": "http://www.example.com/sms-fallback",
  "sms_method": "GET",
  "sms_status_callback": "http://www.example.com/sms-status-callback",
  "sms_url": "http://example.com",
  "status_callback": "http://example.com",
  "status_callback_method": "GET",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Applications/APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "voice_caller_id_lookup": false,
  "voice_fallback_method": "GET",
  "voice_fallback_url": "http://www.example.com/voice-callback",
  "voice_method": "GET",
  "voice_url": "http://demo.twilio.com/docs/voice.xml",
  "public_application_connect_enabled": true
}
```

## Fetch an Application resource

`GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Applications/{Sid}.json`

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Application resource to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The Twilio-provided string that uniquely identifies the Application resource to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AP[0-9a-fA-F]{32}$"},"required":true}]
```

Fetch an Application

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchApplication() {
  const application = await client
    .applications("APXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .fetch();

  console.log(application.accountSid);
}

fetchApplication();
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

application = client.applications("APXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").fetch()

print(application.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var application =
            await ApplicationResource.FetchAsync(pathSid: "APXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(application.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Application;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Application application = Application.fetcher("APXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").fetch();

        System.out.println(application.getAccountSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	api "github.com/twilio/twilio-go/rest/api/v2010"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.FetchApplicationParams{}

	resp, err := client.Api.FetchApplication("APXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

$application = $twilio
    ->applications("APXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->fetch();

print $application->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

application = @client
              .api
              .v2010
              .applications('APXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
              .fetch

puts application.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:applications:fetch \
   --sid APXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Applications/APXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "date_created": "Mon, 22 Aug 2011 20:59:45 +0000",
  "date_updated": "Tue, 18 Aug 2015 16:48:57 +0000",
  "friendly_name": "Application Friendly Name",
  "message_status_callback": "http://www.example.com/sms-status-callback",
  "sid": "APXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "sms_fallback_method": "GET",
  "sms_fallback_url": "http://www.example.com/sms-fallback",
  "sms_method": "GET",
  "sms_status_callback": "http://www.example.com/sms-status-callback",
  "sms_url": "http://example.com",
  "status_callback": "http://example.com",
  "status_callback_method": "GET",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Applications/APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "voice_caller_id_lookup": false,
  "voice_fallback_method": "GET",
  "voice_fallback_url": "http://www.example.com/voice-callback",
  "voice_method": "GET",
  "voice_url": "http://example.com",
  "public_application_connect_enabled": false
}
```

## Read multiple Application resources

`GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Applications.json`

Returns a list of Application resource representations, each representing an
application within your account. The list includes [paging information](/docs/usage/twilios-response#pagination).

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Application resources to read.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true}]
```

### Query parameters

```json
[{"name":"FriendlyName","in":"query","description":"The string that identifies the Application resources to read.","schema":{"type":"string"},"examples":{"readFull":{"value":"friendly_name"},"readEmpty":{"value":"friendly_name"}}},{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

List All Application Resource Representations

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listApplication() {
  const applications = await client.applications.list({ limit: 20 });

  applications.forEach((a) => console.log(a.end));
}

listApplication();
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

applications = client.applications.list(limit=20)

for record in applications:
    print(record.end)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var applications = await ApplicationResource.ReadAsync(limit: 20);

        foreach (var record in applications) {
            Console.WriteLine(record.End);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Application;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Application> applications = Application.reader().limit(20).read();

        for (Application record : applications) {
            System.out.println(record.getEnd());
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
	api "github.com/twilio/twilio-go/rest/api/v2010"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.ListApplicationParams{}
	params.SetLimit(20)

	resp, err := client.Api.ListApplication(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].End != nil {
				fmt.Println(*resp[record].End)
			} else {
				fmt.Println(resp[record].End)
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

$applications = $twilio->applications->read([], 20);

foreach ($applications as $record) {
    print $record->end;
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

applications = @client
               .api
               .v2010
               .applications
               .list(limit: 20)

applications.each do |record|
   puts record.end
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:applications:list
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Applications.json?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "applications": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "api_version": "2010-04-01",
      "date_created": "Fri, 21 Aug 2015 00:07:25 +0000",
      "date_updated": "Fri, 21 Aug 2015 00:07:25 +0000",
      "friendly_name": "d8821fb7-4d01-48b2-bdc5-34e46252b90b",
      "message_status_callback": null,
      "sid": "APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "sms_fallback_method": "POST",
      "sms_fallback_url": null,
      "sms_method": "POST",
      "sms_status_callback": null,
      "sms_url": null,
      "status_callback": null,
      "status_callback_method": "POST",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Applications/APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
      "voice_caller_id_lookup": false,
      "voice_fallback_method": "POST",
      "voice_fallback_url": null,
      "voice_method": "POST",
      "voice_url": null,
      "public_application_connect_enabled": false
    }
  ],
  "end": 0,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Applications.json?FriendlyName=friendly_name&PageSize=1&Page=0",
  "next_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Applications.json?FriendlyName=friendly_name&PageSize=1&Page=1&PageToken=PAAPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "previous_page_uri": null,
  "page_size": 1,
  "page": 0,
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Applications.json?FriendlyName=friendly_name&PageSize=1&Page=0"
}
```

Return the Application named 'MyApp'

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listApplication() {
  const applications = await client.applications.list({
    friendlyName: "MyApp",
    limit: 20,
  });

  applications.forEach((a) => console.log(a.end));
}

listApplication();
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

applications = client.applications.list(friendly_name="MyApp", limit=20)

for record in applications:
    print(record.end)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var applications = await ApplicationResource.ReadAsync(friendlyName: "MyApp", limit: 20);

        foreach (var record in applications) {
            Console.WriteLine(record.End);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Application;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Application> applications = Application.reader().setFriendlyName("MyApp").limit(20).read();

        for (Application record : applications) {
            System.out.println(record.getEnd());
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
	api "github.com/twilio/twilio-go/rest/api/v2010"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.ListApplicationParams{}
	params.SetFriendlyName("MyApp")
	params.SetLimit(20)

	resp, err := client.Api.ListApplication(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].End != nil {
				fmt.Println(*resp[record].End)
			} else {
				fmt.Println(resp[record].End)
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

$applications = $twilio->applications->read(["friendlyName" => "MyApp"], 20);

foreach ($applications as $record) {
    print $record->end;
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

applications = @client
               .api
               .v2010
               .applications
               .list(
                 friendly_name: 'MyApp',
                 limit: 20
               )

applications.each do |record|
   puts record.end
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:applications:list \
   --friendly-name MyApp
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Applications.json?FriendlyName=MyApp&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "applications": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "api_version": "2010-04-01",
      "date_created": "Fri, 21 Aug 2015 00:07:25 +0000",
      "date_updated": "Fri, 21 Aug 2015 00:07:25 +0000",
      "friendly_name": "d8821fb7-4d01-48b2-bdc5-34e46252b90b",
      "message_status_callback": null,
      "sid": "APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "sms_fallback_method": "POST",
      "sms_fallback_url": null,
      "sms_method": "POST",
      "sms_status_callback": null,
      "sms_url": null,
      "status_callback": null,
      "status_callback_method": "POST",
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Applications/APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
      "voice_caller_id_lookup": false,
      "voice_fallback_method": "POST",
      "voice_fallback_url": null,
      "voice_method": "POST",
      "voice_url": null,
      "public_application_connect_enabled": false
    }
  ],
  "end": 0,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Applications.json?FriendlyName=friendly_name&PageSize=1&Page=0",
  "next_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Applications.json?FriendlyName=friendly_name&PageSize=1&Page=1&PageToken=PAAPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "previous_page_uri": null,
  "page_size": 1,
  "page": 0,
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Applications.json?FriendlyName=friendly_name&PageSize=1&Page=0"
}
```

## Update an Application resource

`POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Applications/{Sid}.json`

Tries to update the application's properties, and returns the updated
resource representation if successful. The returned response is identical
to that returned above when making a `GET` request.

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Application resources to update.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The Twilio-provided string that uniquely identifies the Application resource to update.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AP[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"UpdateApplicationRequest","properties":{"FriendlyName":{"type":"string","description":"A descriptive string that you create to describe the resource. It can be up to 64 characters long."},"ApiVersion":{"type":"string","description":"The API version to use to start a new TwiML session. Can be: `2010-04-01` or `2008-08-01`. The default value is your account's default API version."},"VoiceUrl":{"type":"string","format":"uri","description":"The URL we should call when the phone number assigned to this application receives a call."},"VoiceMethod":{"type":"string","format":"http-method","enum":["GET","POST"],"description":"The HTTP method we should use to call `voice_url`. Can be: `GET` or `POST`."},"VoiceFallbackUrl":{"type":"string","format":"uri","description":"The URL that we should call when an error occurs retrieving or executing the TwiML requested by `url`."},"VoiceFallbackMethod":{"type":"string","format":"http-method","enum":["GET","POST"],"description":"The HTTP method we should use to call `voice_fallback_url`. Can be: `GET` or `POST`."},"StatusCallback":{"type":"string","format":"uri","description":"The URL we should call using the `status_callback_method` to send status information to your application."},"StatusCallbackMethod":{"type":"string","format":"http-method","enum":["GET","POST"],"description":"The HTTP method we should use to call `status_callback`. Can be: `GET` or `POST`."},"VoiceCallerIdLookup":{"type":"boolean","description":"Whether we should look up the caller's caller-ID name from the CNAM database (additional charges apply). Can be: `true` or `false`."},"SmsUrl":{"type":"string","format":"uri","description":"The URL we should call when the phone number receives an incoming SMS message."},"SmsMethod":{"type":"string","format":"http-method","enum":["GET","POST"],"description":"The HTTP method we should use to call `sms_url`. Can be: `GET` or `POST`."},"SmsFallbackUrl":{"type":"string","format":"uri","description":"The URL that we should call when an error occurs while retrieving or executing the TwiML from `sms_url`."},"SmsFallbackMethod":{"type":"string","format":"http-method","enum":["GET","POST"],"description":"The HTTP method we should use to call `sms_fallback_url`. Can be: `GET` or `POST`."},"SmsStatusCallback":{"type":"string","format":"uri","description":"Same as message_status_callback: The URL we should call using a POST method to send status information about SMS messages sent by the application. Deprecated, included for backwards compatibility."},"MessageStatusCallback":{"type":"string","format":"uri","description":"The URL we should call using a POST method to send message status information to your application."},"PublicApplicationConnectEnabled":{"type":"boolean","description":"Whether to allow other Twilio accounts to dial this applicaton using Dial verb. Can be: `true` or `false`."}}},"examples":{"update":{"value":{"lang":"json","value":"{\n  \"FriendlyName\": \"friendly_name\",\n  \"MessageStatusCallback\": \"https://example.com\",\n  \"SmsFallbackMethod\": \"GET\",\n  \"SmsFallbackUrl\": \"https://example.com\",\n  \"SmsMethod\": \"GET\",\n  \"SmsStatusCallback\": \"https://example.com\",\n  \"SmsUrl\": \"https://example.com\",\n  \"StatusCallback\": \"https://example.com\",\n  \"StatusCallbackMethod\": \"GET\",\n  \"VoiceCallerIdLookup\": true,\n  \"VoiceFallbackMethod\": \"GET\",\n  \"VoiceFallbackUrl\": \"https://example.com\",\n  \"VoiceMethod\": \"GET\",\n  \"VoiceUrl\": \"https://example.com\",\n  \"PublicApplicationConnectEnabled\": true\n}","meta":"","code":"{\n  \"FriendlyName\": \"friendly_name\",\n  \"MessageStatusCallback\": \"https://example.com\",\n  \"SmsFallbackMethod\": \"GET\",\n  \"SmsFallbackUrl\": \"https://example.com\",\n  \"SmsMethod\": \"GET\",\n  \"SmsStatusCallback\": \"https://example.com\",\n  \"SmsUrl\": \"https://example.com\",\n  \"StatusCallback\": \"https://example.com\",\n  \"StatusCallbackMethod\": \"GET\",\n  \"VoiceCallerIdLookup\": true,\n  \"VoiceFallbackMethod\": \"GET\",\n  \"VoiceFallbackUrl\": \"https://example.com\",\n  \"VoiceMethod\": \"GET\",\n  \"VoiceUrl\": \"https://example.com\",\n  \"PublicApplicationConnectEnabled\": true\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"FriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"friendly_name\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"MessageStatusCallback\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://example.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"SmsFallbackMethod\"","#7EE787"],[":","#C9D1D9"]," ",["\"GET\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"SmsFallbackUrl\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://example.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"SmsMethod\"","#7EE787"],[":","#C9D1D9"]," ",["\"GET\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"SmsStatusCallback\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://example.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"SmsUrl\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://example.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallback\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://example.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallbackMethod\"","#7EE787"],[":","#C9D1D9"]," ",["\"GET\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"VoiceCallerIdLookup\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"VoiceFallbackMethod\"","#7EE787"],[":","#C9D1D9"]," ",["\"GET\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"VoiceFallbackUrl\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://example.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"VoiceMethod\"","#7EE787"],[":","#C9D1D9"]," ",["\"GET\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"VoiceUrl\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://example.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"PublicApplicationConnectEnabled\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Set the VoiceUrl and SmsUrl on an Application to 'http://myapp.com/awesome'

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateApplication() {
  const application = await client
    .applications("AP2a0747eba6abf96b7e3c3ff0b4530f6e")
    .update({
      smsUrl: "http://demo.twilio.com/docs/sms.xml",
      voiceUrl: "http://demo.twilio.com/docs/voice.xml",
    });

  console.log(application.accountSid);
}

updateApplication();
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

application = client.applications("AP2a0747eba6abf96b7e3c3ff0b4530f6e").update(
    sms_url="http://demo.twilio.com/docs/sms.xml",
    voice_url="http://demo.twilio.com/docs/voice.xml",
)

print(application.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var application = await ApplicationResource.UpdateAsync(
            smsUrl: new Uri("http://demo.twilio.com/docs/sms.xml"),
            voiceUrl: new Uri("http://demo.twilio.com/docs/voice.xml"),
            pathSid: "AP2a0747eba6abf96b7e3c3ff0b4530f6e");

        Console.WriteLine(application.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.net.URI;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Application;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Application application = Application.updater("AP2a0747eba6abf96b7e3c3ff0b4530f6e")
                                      .setSmsUrl(URI.create("http://demo.twilio.com/docs/sms.xml"))
                                      .setVoiceUrl(URI.create("http://demo.twilio.com/docs/voice.xml"))
                                      .update();

        System.out.println(application.getAccountSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	api "github.com/twilio/twilio-go/rest/api/v2010"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.UpdateApplicationParams{}
	params.SetSmsUrl("http://demo.twilio.com/docs/sms.xml")
	params.SetVoiceUrl("http://demo.twilio.com/docs/voice.xml")

	resp, err := client.Api.UpdateApplication("AP2a0747eba6abf96b7e3c3ff0b4530f6e",
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

$application = $twilio
    ->applications("AP2a0747eba6abf96b7e3c3ff0b4530f6e")
    ->update([
        "smsUrl" => "http://demo.twilio.com/docs/sms.xml",
        "voiceUrl" => "http://demo.twilio.com/docs/voice.xml",
    ]);

print $application->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

application = @client
              .api
              .v2010
              .applications('AP2a0747eba6abf96b7e3c3ff0b4530f6e')
              .update(
                sms_url: 'http://demo.twilio.com/docs/sms.xml',
                voice_url: 'http://demo.twilio.com/docs/voice.xml'
              )

puts application.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:applications:update \
   --sid AP2a0747eba6abf96b7e3c3ff0b4530f6e \
   --sms-url http://demo.twilio.com/docs/sms.xml \
   --voice-url http://demo.twilio.com/docs/voice.xml
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Applications/AP2a0747eba6abf96b7e3c3ff0b4530f6e.json" \
--data-urlencode "SmsUrl=http://demo.twilio.com/docs/sms.xml" \
--data-urlencode "VoiceUrl=http://demo.twilio.com/docs/voice.xml" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "date_created": "Mon, 22 Aug 2011 20:59:45 +0000",
  "date_updated": "Tue, 18 Aug 2015 16:48:57 +0000",
  "friendly_name": "Application Friendly Name",
  "message_status_callback": "http://www.example.com/sms-status-callback",
  "sid": "AP2a0747eba6abf96b7e3c3ff0b4530f6e",
  "sms_fallback_method": "GET",
  "sms_fallback_url": "http://www.example.com/sms-fallback",
  "sms_method": "GET",
  "sms_status_callback": "http://www.example.com/sms-status-callback",
  "sms_url": "http://demo.twilio.com/docs/sms.xml",
  "status_callback": "http://example.com",
  "status_callback_method": "GET",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Applications/APaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "voice_caller_id_lookup": false,
  "voice_fallback_method": "GET",
  "voice_fallback_url": "http://www.example.com/voice-callback",
  "voice_method": "GET",
  "voice_url": "http://demo.twilio.com/docs/voice.xml",
  "public_application_connect_enabled": true
}
```

## Delete an Application resource

`DELETE https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Applications/{Sid}.json`

Delete this application. If this application's sid is assigned
to any IncomingPhoneNumber resources as a VoiceApplicationSid or
SmsApplicationSid it will be removed.

If successful, Twilio will return an HTTP 204 response with no body.

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Application resources to delete.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The Twilio-provided string that uniquely identifies the Application resource to delete.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AP[0-9a-fA-F]{32}$"},"required":true}]
```

Delete an Application

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function deleteApplication() {
  await client.applications("APXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").remove();
}

deleteApplication();
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

client.applications("APXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").delete()
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        await ApplicationResource.DeleteAsync(pathSid: "APXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Application;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Application.deleter("APXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").delete();
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	api "github.com/twilio/twilio-go/rest/api/v2010"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.DeleteApplicationParams{}

	err := client.Api.DeleteApplication("APXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		params)
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

$twilio->applications("APXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")->delete();
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
  .api
  .v2010
  .applications('APXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  .delete
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:applications:remove \
   --sid APXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X DELETE "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Applications/APXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```
