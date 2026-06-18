# Calls Transcriptions subresource

> \[!IMPORTANT]
>
> Real-Time Transcriptions, including the `<Transcriptions>` TwiML noun and API, use artificial intelligence or machine learning technologies. By enabling or using any of the features or functionalities within Programmable Voice that are identified as using artificial intelligence or machine learning technology, you acknowledge and agree that your use of these features or functionalities is subject to the terms of the [Predictive and Generative AI/ML Features Addendum](https://www.twilio.com/en-us/legal/ai-terms/predictive-generative-ai-features).

Transcriptions is a subresource of [Calls](/docs/voice/api/call-resource) and represents a real-time audio transcription during a live call. You can start and stop a transcription on any in-progress call via API or via the [\<Transcription> TwiML Noun](/docs/voice/twiml/transcription).

* To start a real-time transcription on a live call, [create a Transcription](#create-a-transcription).
* To stop a real-time transcription, [update a Transcription status](#update-a-transcription).

## Calls Transcriptions properties

<OperationTable type="properties" data={{"type":"object","refName":"api.v2010.account.call.realtime_transcription","modelName":"api_v2010_account_call_realtime_transcription","properties":{"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^GT[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the Transcription resource."},"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Transcription resource."},"call_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^CA[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Transcription resource is associated with."},"name":{"type":"string","nullable":true,"description":"The user-specified name of this Transcription, if one was given when the Transcription was created. This may be used to stop the Transcription."},"status":{"type":"string","enum":["in-progress","stopped"],"description":"The status - one of `stopped`, `in-flight`","refName":"realtime_transcription_enum_status","modelName":"realtime_transcription_enum_status"},"date_updated":{"type":"string","format":"date-time-rfc-2822","nullable":true,"description":"The date and time in GMT that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format."},"uri":{"type":"string","nullable":true}}}} />

## Create a Transcription

`POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Transcriptions.json`

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Transcription resource.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true},{"name":"CallSid","in":"path","description":"The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Transcription resource is associated with.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^CA[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"CreateRealtimeTranscriptionRequest","properties":{"Name":{"type":"string","description":"The user-specified name of this Transcription, if one was given when the Transcription was created. This may be used to stop the Transcription."},"Track":{"type":"string","enum":["inbound_track","outbound_track","both_tracks"],"description":"One of `inbound_track`, `outbound_track`, `both_tracks`.","refName":"realtime_transcription_enum_track","modelName":"realtime_transcription_enum_track"},"StatusCallbackUrl":{"type":"string","format":"uri","description":"Absolute URL of the status callback."},"StatusCallbackMethod":{"type":"string","format":"http-method","enum":["GET","POST"],"description":"The http method for the status_callback (one of GET, POST)."},"InboundTrackLabel":{"type":"string","description":"Friendly name given to the Inbound Track"},"OutboundTrackLabel":{"type":"string","description":"Friendly name given to the Outbound Track"},"PartialResults":{"type":"boolean","description":"Indicates if partial results are going to be sent to the customer"},"LanguageCode":{"type":"string","description":"Language code used by the transcription engine, specified in [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt) format"},"TranscriptionEngine":{"type":"string","description":"Definition of the transcription engine to be used, among those supported by Twilio"},"ProfanityFilter":{"type":"boolean","description":"indicates if the server will attempt to filter out profanities, replacing all but the initial character in each filtered word with asterisks"},"SpeechModel":{"type":"string","description":"Recognition model used by the transcription engine, among those supported by the provider"},"Hints":{"type":"string","description":"A Phrase contains words and phrase \"hints\" so that the speech recognition engine is more likely to recognize them."},"EnableAutomaticPunctuation":{"type":"boolean","description":"The provider will add punctuation to recognition result"},"IntelligenceService":{"type":"string","description":"The SID or unique name of the [Intelligence Service](https://www.twilio.com/docs/conversational-intelligence/api/service-resource) for persisting transcripts and running post-call Language Operators"},"ConversationConfiguration":{"type":"string","description":"The ID of the Conversations Configuration for customizing conversation behavior in Intelligence Service"},"ConversationId":{"type":"string","description":"The ID of the Conversation for associating this Transcription with an existing Conversation in Intelligence Service"},"TranscriptionConfigurationId":{"type":"string","description":"The ID of the RealTimeTranscription Configuration for configuring all the non-default behaviors in one go."},"EnableProviderData":{"type":"boolean","description":"Whether the callback includes raw provider data."}}},"examples":{"createNoArgs":{"value":{"lang":"json","value":"{}","meta":"","code":"{}","tokens":[["{}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"createWithArgs":{"value":{"lang":"json","value":"{\n  \"Name\": \"myName\",\n  \"Track\": \"inbound_track\",\n  \"StatusCallbackUrl\": \"http://statuscallback.com\",\n  \"StatusCallbackMethod\": \"PUT\",\n  \"InboundTrackLabel\": \"inbound_track_label\",\n  \"OutboundTrackLabel\": \"outbound_track_label\",\n  \"PartialResults\": false,\n  \"LanguageCode\": \"en-US\",\n  \"TranscriptionEngine\": \"google\",\n  \"ProfanityFilter\": false,\n  \"SpeechModel\": \"long\",\n  \"Hints\": \"this is a hint\",\n  \"EnableAutomaticPunctuation\": true,\n  \"IntelligenceService\": \"GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"ConversationConfiguration\": \"conv_configuration_01k1etk2y5f1y9fpe2epfdtvv2\",\n  \"ConversationId\": \"conv_01k1etk2y5f1y9fpe2epfdtvv2\",\n  \"TranscriptionConfigurationId\": \"real_time_transcription_7ah86qz6t0nk3s0xcqhn66j0x7\",\n  \"EnableProviderData\": false\n}","meta":"","code":"{\n  \"Name\": \"myName\",\n  \"Track\": \"inbound_track\",\n  \"StatusCallbackUrl\": \"http://statuscallback.com\",\n  \"StatusCallbackMethod\": \"PUT\",\n  \"InboundTrackLabel\": \"inbound_track_label\",\n  \"OutboundTrackLabel\": \"outbound_track_label\",\n  \"PartialResults\": false,\n  \"LanguageCode\": \"en-US\",\n  \"TranscriptionEngine\": \"google\",\n  \"ProfanityFilter\": false,\n  \"SpeechModel\": \"long\",\n  \"Hints\": \"this is a hint\",\n  \"EnableAutomaticPunctuation\": true,\n  \"IntelligenceService\": \"GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"ConversationConfiguration\": \"conv_configuration_01k1etk2y5f1y9fpe2epfdtvv2\",\n  \"ConversationId\": \"conv_01k1etk2y5f1y9fpe2epfdtvv2\",\n  \"TranscriptionConfigurationId\": \"real_time_transcription_7ah86qz6t0nk3s0xcqhn66j0x7\",\n  \"EnableProviderData\": false\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Name\"","#7EE787"],[":","#C9D1D9"]," ",["\"myName\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Track\"","#7EE787"],[":","#C9D1D9"]," ",["\"inbound_track\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallbackUrl\"","#7EE787"],[":","#C9D1D9"]," ",["\"http://statuscallback.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallbackMethod\"","#7EE787"],[":","#C9D1D9"]," ",["\"PUT\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"InboundTrackLabel\"","#7EE787"],[":","#C9D1D9"]," ",["\"inbound_track_label\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"OutboundTrackLabel\"","#7EE787"],[":","#C9D1D9"]," ",["\"outbound_track_label\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"PartialResults\"","#7EE787"],[":","#C9D1D9"]," ",["false","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"LanguageCode\"","#7EE787"],[":","#C9D1D9"]," ",["\"en-US\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"TranscriptionEngine\"","#7EE787"],[":","#C9D1D9"]," ",["\"google\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"ProfanityFilter\"","#7EE787"],[":","#C9D1D9"]," ",["false","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"SpeechModel\"","#7EE787"],[":","#C9D1D9"]," ",["\"long\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Hints\"","#7EE787"],[":","#C9D1D9"]," ",["\"this is a hint\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"EnableAutomaticPunctuation\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"IntelligenceService\"","#7EE787"],[":","#C9D1D9"]," ",["\"GAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"ConversationConfiguration\"","#7EE787"],[":","#C9D1D9"]," ",["\"conv_configuration_01k1etk2y5f1y9fpe2epfdtvv2\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"ConversationId\"","#7EE787"],[":","#C9D1D9"]," ",["\"conv_01k1etk2y5f1y9fpe2epfdtvv2\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"TranscriptionConfigurationId\"","#7EE787"],[":","#C9D1D9"]," ",["\"real_time_transcription_7ah86qz6t0nk3s0xcqhn66j0x7\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"EnableProviderData\"","#7EE787"],[":","#C9D1D9"]," ",["false","#79C0FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Create a Transcription

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createRealtimeTranscription() {
  const transcription = await client
    .calls("CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .transcriptions.create();

  console.log(transcription.sid);
}

createRealtimeTranscription();
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

transcription = client.calls(
    "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).transcriptions.create()

print(transcription.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account.Call;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var transcription = await TranscriptionResource.CreateAsync(
            pathCallSid: "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(transcription.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.call.Transcription;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Transcription transcription = Transcription.creator("CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").create();

        System.out.println(transcription.getSid());
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

	params := &api.CreateRealtimeTranscriptionParams{}

	resp, err := client.Api.CreateRealtimeTranscription("CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$transcription = $twilio
    ->calls("CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->transcriptions->create();

print $transcription->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

transcription = @client
                .api
                .v2010
                .calls('CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                .transcriptions
                .create

puts transcription.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:calls:transcriptions:create \
   --call-sid CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions.json" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "call_sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "name": null,
  "status": "in-progress",
  "date_updated": "Thu, 30 Jul 2015 20:00:00 +0000",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions/GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

## Update a Transcription

`POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Transcriptions/{Sid}.json`

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Transcription resource.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true},{"name":"CallSid","in":"path","description":"The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Transcription resource is associated with.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^CA[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The SID of the Transcription resource, or the `name` used when creating the resource","schema":{"type":"string"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"UpdateRealtimeTranscriptionRequest","required":["Status"],"properties":{"Status":{"type":"string","enum":["stopped"],"refName":"realtime_transcription_enum_update_status","modelName":"realtime_transcription_enum_update_status"}}},"examples":{"updateBySid":{"value":{"lang":"json","value":"{\n  \"Status\": \"stopped\"\n}","meta":"","code":"{\n  \"Status\": \"stopped\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Status\"","#7EE787"],[":","#C9D1D9"]," ",["\"stopped\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"updateByName":{"value":{"lang":"json","value":"{\n  \"Status\": \"stopped\"\n}","meta":"","code":"{\n  \"Status\": \"stopped\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Status\"","#7EE787"],[":","#C9D1D9"]," ",["\"stopped\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

You can stop an in-progress Transcription by updating the `status` to `stopped`. You can also [use TwiML to stop a Transcription](/docs/voice/twiml/transcription).

When making this request, you can use the Transcription subresource's SID or the `name` (if one was given when the Transcription was created).

Stop a real-time Transcription

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateRealtimeTranscription() {
  const transcription = await client
    .calls("CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .transcriptions("GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update({ status: "stopped" });

  console.log(transcription.sid);
}

updateRealtimeTranscription();
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

realtime_transcription = (
    client.calls("CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .transcriptions("GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .update(status="stopped")
)

print(realtime_transcription.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account.Call;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var transcription = await TranscriptionResource.UpdateAsync(
            status: TranscriptionResource.UpdateStatusEnum.Stopped,
            pathCallSid: "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(transcription.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.call.Transcription;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Transcription transcription = Transcription
                                          .updater("CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                                              "GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                                              Transcription.UpdateStatus.STOPPED)
                                          .update();

        System.out.println(transcription.getSid());
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

	params := &api.UpdateRealtimeTranscriptionParams{}
	params.SetStatus("stopped")

	resp, err := client.Api.UpdateRealtimeTranscription("CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$realtime_transcription = $twilio
    ->calls("CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->transcriptions("GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->update(
        "stopped" // Status
    );

print $realtime_transcription->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

transcription = @client
                .api
                .v2010
                .calls('CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                .transcriptions('GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                .update(status: 'stopped')

puts transcription.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:calls:transcriptions:update \
   --call-sid CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --status stopped
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions/GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json" \
--data-urlencode "Status=stopped" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "call_sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "name": null,
  "status": "stopped",
  "date_updated": "Thu, 30 Jul 2015 20:00:00 +0000",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions/GTaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

## HIPAA eligibility and PCI compliance

HIPAA eligibility and PCI compliance varies depending on your selected speech model and whether you use webhooks or persisted transcripts. To determine whether your implementation may be HIPAA eligible or PCI compliant, see the following table.

| Transcription engine | Speech model                              | Transcript destination           | HIPAA eligibility | PCI-compliant |
| :------------------- | :---------------------------------------- | :------------------------------- | :---------------- | :------------ |
| Google               | Any supported model                       | Webhooks                         | Yes               | Yes           |
| Google               | Any supported model                       | Persisted Transcript             | Yes               | No            |
| Deepgram             | `nova-2` or `nova-3` monolingual variants | Webhooks                         | Yes               | Yes           |
| Deepgram             | `nova-2` or `nova-3` monolingual variants | Persisted Transcript             | Yes               | No            |
| Deepgram             | `nova-3` multilingual                     | Webhooks or Persisted Transcript | No                | No            |

## AI nutrition facts

> \[!NOTE]
>
> The Calls Transcriptions subresource and `<Transcriptions>` TwiML noun use third-party artificial technology and machine learning technologies.
>
> [Twilio's AI Nutrition Facts](https://nutrition-facts.ai/) provide an overview of the AI feature you're using, so you can better understand how the AI is working with your data. Real-Time Transcriptions AI qualities are outlined in the following **Speech to Text Transcriptions - Programmable Voice Nutrition Facts** label. For more information and the glossary regarding the AI Nutrition Facts Label, see [Twilio's AI Nutrition Facts](https://nutrition-facts.ai/).

```json
{"name":"Speech to Text Transcriptions - Programmable Voice, Twilio Video, and Conversation Intelligence (classic)","description":"Generate speech to text voice transcriptions (real-time and post-call) in Programmable Voice, Twilio Video, and Conversation Intelligence (classic).","modelType":"Generative and Predictive - Automatic Speech Recognition","optional":true,"baseModel":"Deepgram Speech-to-Text, Google Speech-to-Text, Amazon Transcribe","aiPrivacyLevel":null,"trustLayer":{"baseModelCustomerData":{"value":false,"comments":["Conversation Intelligence (classic), Programmable Voice, and Twilio Video only use the default Base Model provided by the Model Vendor. The Base Model is not trained using customer data."]},"vendorModelCustomerData":{"value":false,"comments":["Conversation Intelligence (classic), Programmable Voice, and Twilio Video only use the default Base Model provided by the Model Vendor. The Base Model is not trained using customer data."]},"trainingDataAnonymized":{"value":null,"comments":["Base Model is not trained using any customer data."]},"dataDeletion":{"value":true,"comments":["Transcriptions are deleted by the customer using the Conversation Intelligence (classic) API or when a customer account is deprovisioned."]},"auditing":{"value":true,"comments":["The customer views output in the Conversation Intelligence (classic) API or Transcript Viewer."]},"dataStorage":"Until the customer deletes","compliance":{"loggingAndAuditTrails":{"value":true,"comments":["The customer can listen to the input (recording) and view the output (transcript)."]},"guardrails":{"value":true,"comments":["The customer can listen to the input (recording) and view the output (transcript). "]}},"inputOutputConsistency":{"value":true,"comments":["The customer is responsible for human review."]}},"linksAndResources":"https://www.twilio.com/docs/conversation-intelligence-classic"}
```
