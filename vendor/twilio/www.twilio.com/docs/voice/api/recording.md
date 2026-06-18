# Recordings resource

> \[!WARNING]
>
> For Customers building HIPAA-compliant workflows with [Recordings](/docs/voice/api/recording), we require customers to enforce at least HTTP Authentication. To learn more about building for HIPAA compliance, please visit the latest requirements [here](https://docs-resources.prod.twilio.com/documents/architecting-for-HIPAA.pdf).

> \[!NOTE]
>
> Call recordings aren't Payment Card Industry (PCI) compliant by default. To use Voice Recordings in a [PCI workflow](/docs/voice/pci-workflows), [enable PCI Mode in the Twilio Console](https://www.twilio.com/console/voice/settings).
>
> To transcribe voice recordings, use the \<Transcription> TwiML noun. Native and Marketplace transcriptions aren't available when PCI Mode is enabled.

A Recording resource represents the recording associated with a voice call, conference, or SIP Trunk. Using the Recordings resource, you can fetch, start, stop, pause, resume, and delete voice recordings.

You can start a recording for a call, conference, or trunk in any of the following ways:

1. [\<Record> in TwiML](/docs/voice/twiml/record)
2. [\<Dial record> in TwiML](/docs/voice/twiml/dial#record)
3. [\<Conference record> in TwiML](/docs/voice/twiml/conference#record)
4. [`Record=true` in an outbound call via the REST API](/docs/voice/tutorials/how-to-make-outbound-phone-calls#record-your-call)
5. Enable recording on an Elastic SIP Trunk in [Twilio Console](https://1console.twilio.com/go?to=/account/__account__/us1/sip-trunking/manage/trunks) or the [legacy Console](https://www.twilio.com/console/sip-trunking/trunks).
6. [Post to Recording resource of an in-progress Call SID](#create-a-recording)
7. [`<Start><Recording>` in TwiML](/docs/voice/twiml/recording)

After you start a recording, you can [pause, resume, or stop it](#update-a-recording).

## Recordings properties

```json
{"title":"ListRecordingResponse","type":"object","properties":{"end":{"type":"integer"},"first_page_uri":{"format":"uri","type":"string"},"next_page_uri":{"format":"uri","nullable":true,"type":"string"},"page":{"type":"integer"},"page_size":{"type":"integer"},"previous_page_uri":{"format":"uri","nullable":true,"type":"string"},"start":{"type":"integer"},"uri":{"format":"uri","type":"string"},"recordings":{"type":"array","items":{"type":"object","refName":"api.v2010.account.recording","modelName":"api_v2010_account_recording","properties":{"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording resource."},"api_version":{"type":"string","nullable":true,"description":"The API version used during the recording."},"call_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^CA[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Recording resource is associated with. This will always refer to the parent leg of a two-leg call."},"conference_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^CF[0-9a-fA-F]{32}$","nullable":true,"description":"The Conference SID that identifies the conference associated with the recording, if a conference recording."},"date_created":{"type":"string","format":"date-time-rfc-2822","nullable":true,"description":"The date and time in GMT that the resource was created specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format."},"date_updated":{"type":"string","format":"date-time-rfc-2822","nullable":true,"description":"The date and time in GMT that the resource was last updated specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format."},"start_time":{"type":"string","format":"date-time-rfc-2822","nullable":true,"description":"The start time of the recording in GMT and in [RFC 2822](https://www.php.net/manual/en/class.datetime.php#datetime.constants.rfc2822) format."},"duration":{"type":"string","nullable":true,"description":"The length of the recording in seconds."},"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^RE[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that that we created to identify the Recording resource."},"price":{"type":"string","nullable":true,"description":"The one-time cost of creating the recording in the `price_unit` currency."},"price_unit":{"type":"string","nullable":true,"description":"The currency used in the `price` property. Example: `USD`."},"status":{"type":"string","enum":["in-progress","paused","stopped","processing","completed","absent","deleted"],"description":"The status of the recording. Can be: `processing`, `completed`, `absent` or `deleted`. For information about more detailed statuses on in-progress recordings, check out how to [Update a Recording Resource](https://www.twilio.com/docs/voice/api/recording#update-a-recording-resource).","refName":"recording_enum_status","modelName":"recording_enum_status"},"channels":{"type":"integer","nullable":true,"description":"The number of channels in the recording resource. For information on specifying the number of channels in the downloaded recording file, check out [Fetch a Recording’s media file](https://www.twilio.com/docs/voice/api/recording#download-dual-channel-media-file)."},"source":{"type":"string","enum":["DialVerb","Conference","OutboundAPI","Trunking","RecordVerb","StartCallRecordingAPI","StartConferenceRecordingAPI"],"description":"How the recording was created. Can be: `DialVerb`, `Conference`, `OutboundAPI`, `Trunking`, `RecordVerb`, `StartCallRecordingAPI`, and `StartConferenceRecordingAPI`.","refName":"recording_enum_source","modelName":"recording_enum_source"},"error_code":{"type":"integer","nullable":true,"description":"The error code that describes why the recording is `absent`. The error code is described in our [Error Dictionary](https://www.twilio.com/docs/api/errors). This value is null if the recording `status` is not `absent`."},"uri":{"type":"string","nullable":true,"description":"The URI of the resource, relative to `https://api.twilio.com`."},"encryption_details":{"nullable":true,"description":"How to decrypt the recording if it was encrypted using [Call Recording Encryption](https://www.twilio.com/docs/voice/tutorials/voice-recording-encryption) feature."},"subresource_uris":{"type":"object","format":"uri-map","nullable":true,"description":"A list of related resources identified by their relative URIs."},"media_url":{"type":"string","format":"uri","nullable":true,"description":"The URL of the media file associated with this recording resource. When stored externally, this is the full URL location of the media file."}}}}}}
```

## Create a Recording

```bash
POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Calls/{CallsSid}/Recordings.json
```

To start a recording on a live call, make a `POST` request to the Recordings subresource of an in-progress Call.

A recording can be as long as the call.

> \[!WARNING]
>
> If you choose to record voice or video calls, you need to comply with certain laws and regulations, including those regarding obtaining consent to record (such as California's Invasion of Privacy Act and similar laws in other jurisdictions). Additional information on the legal implications of call recording can be found [in the "Legal Considerations with Recording Voice and Video Communications" Help Center article](https://help.twilio.com/hc/en-us/articles/360011522553-Legal-Considerations-with-Recording-Voice-and-Video-Communications).
>
> *Notice*: Twilio recommends that you consult with your legal counsel to make sure that you are complying with all applicable laws in connection with communications you record or store using Twilio.

### Optional parameters

The following optional parameters are available for you to `POST` when starting a recording on a live call:

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that will create the resource.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true},{"name":"CallSid","in":"path","description":"The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) to associate the resource with.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^CA[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"CreateCallRecordingRequest","properties":{"RecordingStatusCallbackEvent":{"type":"array","description":"The recording status events on which we should call the `recording_status_callback` URL. Can be: `in-progress`, `completed` and `absent` and the default is `completed`. Separate multiple event values with a space.","items":{"type":"string"}},"RecordingStatusCallback":{"type":"string","format":"uri","description":"The URL we should call using the `recording_status_callback_method` on each recording event specified in  `recording_status_callback_event`. For more information, see [RecordingStatusCallback parameters](https://www.twilio.com/docs/voice/api/recording#recordingstatuscallback)."},"RecordingStatusCallbackMethod":{"type":"string","format":"http-method","enum":["GET","POST"],"description":"The HTTP method we should use to call `recording_status_callback`. Can be: `GET` or `POST` and the default is `POST`."},"Trim":{"type":"string","description":"Whether to trim any leading and trailing silence in the recording. Can be: `trim-silence` or `do-not-trim` and the default is `do-not-trim`. `trim-silence` trims the silence from the beginning and end of the recording and `do-not-trim` does not."},"RecordingChannels":{"type":"string","description":"The number of channels used in the recording. Can be: `mono` or `dual` and the default is `mono`. `mono` records all parties of the call into one channel. `dual` records each party of a 2-party call into separate channels."},"RecordingTrack":{"type":"string","description":"The audio track to record for the call. Can be: `inbound`, `outbound` or `both`. The default is `both`. `inbound` records the audio that is received by Twilio. `outbound` records the audio that is generated from Twilio. `both` records the audio that is received and generated by Twilio."},"RecordingConfigurationId":{"type":"string","description":"The identifier of the configuration to be used when creating and processing the recording"}}},"examples":{"create200":{"value":{"lang":"json","value":"{\n  \"RecordingStatusCallbackEvent\": [\n    \"in-progress completed failed\"\n  ],\n  \"RecordingStatusCallback\": \"https://example.com\",\n  \"RecordingStatusCallbackMethod\": \"GET\",\n  \"Trim\": \"do-not-trim\",\n  \"RecordingChannels\": \"dual\",\n  \"RecordingTrack\": \"both\",\n  \"PlayBeep\": true,\n  \"Transcribe\": true,\n  \"TranscriptionConfiguration\": \"JVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"\n}","meta":"","code":"{\n  \"RecordingStatusCallbackEvent\": [\n    \"in-progress completed failed\"\n  ],\n  \"RecordingStatusCallback\": \"https://example.com\",\n  \"RecordingStatusCallbackMethod\": \"GET\",\n  \"Trim\": \"do-not-trim\",\n  \"RecordingChannels\": \"dual\",\n  \"RecordingTrack\": \"both\",\n  \"PlayBeep\": true,\n  \"Transcribe\": true,\n  \"TranscriptionConfiguration\": \"JVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"RecordingStatusCallbackEvent\"","#7EE787"],[": [","#C9D1D9"],"\n    ",["\"in-progress completed failed\"","#A5D6FF"],"\n  ",["],","#C9D1D9"],"\n  ",["\"RecordingStatusCallback\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://example.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"RecordingStatusCallbackMethod\"","#7EE787"],[":","#C9D1D9"]," ",["\"GET\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Trim\"","#7EE787"],[":","#C9D1D9"]," ",["\"do-not-trim\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"RecordingChannels\"","#7EE787"],[":","#C9D1D9"]," ",["\"dual\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"RecordingTrack\"","#7EE787"],[":","#C9D1D9"]," ",["\"both\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"PlayBeep\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"Transcribe\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"TranscriptionConfiguration\"","#7EE787"],[":","#C9D1D9"]," ",["\"JVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"create201":{"value":{"lang":"json","value":"{\n  \"RecordingStatusCallbackEvent\": [\n    \"in-progress completed failed\"\n  ],\n  \"RecordingStatusCallback\": \"https://example.com\",\n  \"RecordingStatusCallbackMethod\": \"GET\",\n  \"Trim\": \"do-not-trim\",\n  \"RecordingChannels\": \"dual\",\n  \"RecordingTrack\": \"both\",\n  \"PlayBeep\": true,\n  \"Transcribe\": true,\n  \"TranscriptionConfiguration\": \"JVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"\n}","meta":"","code":"{\n  \"RecordingStatusCallbackEvent\": [\n    \"in-progress completed failed\"\n  ],\n  \"RecordingStatusCallback\": \"https://example.com\",\n  \"RecordingStatusCallbackMethod\": \"GET\",\n  \"Trim\": \"do-not-trim\",\n  \"RecordingChannels\": \"dual\",\n  \"RecordingTrack\": \"both\",\n  \"PlayBeep\": true,\n  \"Transcribe\": true,\n  \"TranscriptionConfiguration\": \"JVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"RecordingStatusCallbackEvent\"","#7EE787"],[": [","#C9D1D9"],"\n    ",["\"in-progress completed failed\"","#A5D6FF"],"\n  ",["],","#C9D1D9"],"\n  ",["\"RecordingStatusCallback\"","#7EE787"],[":","#C9D1D9"]," ",["\"https://example.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"RecordingStatusCallbackMethod\"","#7EE787"],[":","#C9D1D9"]," ",["\"GET\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Trim\"","#7EE787"],[":","#C9D1D9"]," ",["\"do-not-trim\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"RecordingChannels\"","#7EE787"],[":","#C9D1D9"]," ",["\"dual\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"RecordingTrack\"","#7EE787"],[":","#C9D1D9"]," ",["\"both\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"PlayBeep\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"Transcribe\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],[",","#C9D1D9"],"\n  ",["\"TranscriptionConfiguration\"","#7EE787"],[":","#C9D1D9"]," ",["\"JVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

### RecordingStatusCallback

Twilio will pass the following parameters with its request to your `RecordingStatusCallback` URL:

| Parameter          | Description                                                                                                                             |
| :----------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| AccountSid         | The unique identifier of the Account responsible for this recording.                                                                    |
| CallSid            | A unique identifier for the call associated with the recording.                                                                         |
| RecordingSid       | The unique identifier for the recording.                                                                                                |
| RecordingUrl       | The URL of the recorded audio.                                                                                                          |
| RecordingStatus    | The status of the recording. Possible values are: `in-progress`, `completed`, `absent`.                                                 |
| RecordingDuration  | The length of the recording, in seconds (only provided when `RecordingStatus` is `completed`).                                          |
| RecordingChannels  | The number of channels in the final recording file as an integer. Possible values are `1`, `2`.                                         |
| RecordingStartTime | The timestamp of when the recording started.                                                                                            |
| RecordingSource    | The initiation method used to create this recording. For recordings initiated with this API, the value will be `StartCallRecordingAPI`. |
| RecordingTrack     | The audio track recorded. Possible values are `inbound`, `outbound` or `both`.                                                          |

Create a Recording on a live call

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createCallRecording() {
  const recording = await client
    .calls("CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .recordings.create();

  console.log(recording.accountSid);
}

createCallRecording();
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

recording = client.calls(
    "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).recordings.create()

print(recording.account_sid)
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

        var recording =
            await RecordingResource.CreateAsync(pathCallSid: "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(recording.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.call.Recording;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Recording recording = Recording.creator("CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").create();

        System.out.println(recording.getAccountSid());
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

	params := &api.CreateCallRecordingParams{}

	resp, err := client.Api.CreateCallRecording("CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

$recording = $twilio
    ->calls("CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->recordings->create();

print $recording->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

recording = @client
            .api
            .v2010
            .calls('CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
            .recordings
            .create

puts recording.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:calls:recordings:create \
   --call-sid CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Calls/CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Recordings.json" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "call_sid": "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "conference_sid": null,
  "channels": 2,
  "date_created": "Fri, 14 Oct 2016 21:56:34 +0000",
  "date_updated": "Fri, 14 Oct 2016 21:56:34 +0000",
  "start_time": "Fri, 14 Oct 2016 21:56:34 +0000",
  "price": null,
  "price_unit": null,
  "duration": null,
  "sid": "REaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "source": "StartCallRecordingAPI",
  "status": "in-progress",
  "error_code": null,
  "encryption_details": null,
  "track": "both",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings/REaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

Create a dual-channel Recording with RecordingStatusCallback

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createCallRecording() {
  const recording = await client
    .calls("CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .recordings.create({
      recordingChannels: "dual",
      recordingStatusCallback: "https://myapp.com/recording-events",
      recordingStatusCallbackEvent: ["in-progress completed"],
    });

  console.log(recording.accountSid);
}

createCallRecording();
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

recording = client.calls(
    "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).recordings.create(
    recording_status_callback="https://myapp.com/recording-events",
    recording_status_callback_event=["in-progress completed"],
    recording_channels="dual",
)

print(recording.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account.Call;
using System.Threading.Tasks;
using System.Collections.Generic;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var recording = await RecordingResource.CreateAsync(
            recordingStatusCallback: new Uri("https://myapp.com/recording-events"),
            recordingStatusCallbackEvent: new List<string> { "in-progress completed" },
            recordingChannels: "dual",
            pathCallSid: "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(recording.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.net.URI;
import java.util.Arrays;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.call.Recording;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Recording recording = Recording.creator("CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                                  .setRecordingStatusCallback(URI.create("https://myapp.com/recording-events"))
                                  .setRecordingStatusCallbackEvent(Arrays.asList("in-progress completed"))
                                  .setRecordingChannels("dual")
                                  .create();

        System.out.println(recording.getAccountSid());
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

	params := &api.CreateCallRecordingParams{}
	params.SetRecordingStatusCallback("https://myapp.com/recording-events")
	params.SetRecordingStatusCallbackEvent([]string{
		"in-progress completed",
	})
	params.SetRecordingChannels("dual")

	resp, err := client.Api.CreateCallRecording("CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

$recording = $twilio
    ->calls("CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->recordings->create([
        "recordingStatusCallback" => "https://myapp.com/recording-events",
        "recordingStatusCallbackEvent" => ["in-progress completed"],
        "recordingChannels" => "dual",
    ]);

print $recording->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

recording = @client
            .api
            .v2010
            .calls('CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
            .recordings
            .create(
              recording_status_callback: 'https://myapp.com/recording-events',
              recording_status_callback_event: [
                'in-progress completed'
              ],
              recording_channels: 'dual'
            )

puts recording.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:calls:recordings:create \
   --call-sid CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --recording-status-callback https://myapp.com/recording-events \
   --recording-status-callback-event "in-progress completed" \
   --recording-channels dual
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Calls/CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Recordings.json" \
--data-urlencode "RecordingStatusCallback=https://myapp.com/recording-events" \
--data-urlencode "RecordingStatusCallbackEvent=in-progress completed" \
--data-urlencode "RecordingChannels=dual" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "call_sid": "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "conference_sid": null,
  "channels": 2,
  "date_created": "Fri, 14 Oct 2016 21:56:34 +0000",
  "date_updated": "Fri, 14 Oct 2016 21:56:34 +0000",
  "start_time": "Fri, 14 Oct 2016 21:56:34 +0000",
  "price": null,
  "price_unit": null,
  "duration": null,
  "sid": "REaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "source": "StartCallRecordingAPI",
  "status": "in-progress",
  "error_code": null,
  "encryption_details": null,
  "track": "both",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings/REaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

## Retrieve a Recording

You can retrieve a Recording's metadata or you can retrieve a WAV or MP3 media file of the Recording.

### Retrieve a Recording's metadata

```bash
GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Recordings/{Sid}.json
```

A Recording's metadata can be returned in JSON or XML format.

* For JSON format, append `.json` to the Recording's URI.
* For XML format, append `.xml` to the Recording's URI.

The table below lists the parameters for fetching a Recording's metadata.

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording resource to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The Twilio-provided string that uniquely identifies the Recording resource to fetch.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^RE[0-9a-fA-F]{32}$"},"required":true}]
```

### Query parameters

```json
[{"name":"IncludeSoftDeleted","in":"query","description":"A boolean parameter indicating whether to retrieve soft deleted recordings or not. Recordings metadata are kept after deletion for a retention period of 40 days.","schema":{"type":"boolean"},"examples":{"fetchIncludeSoftDeleted":{"value":true}}}]
```

Retrieve a Recording's metadata in JSON format

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchRecording() {
  const recording = await client
    .recordings("REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .fetch();

  console.log(recording.accountSid);
}

fetchRecording();
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

recording = client.recordings("REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").fetch()

print(recording.account_sid)
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

        var recording =
            await RecordingResource.FetchAsync(pathSid: "REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(recording.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Recording;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Recording recording = Recording.fetcher("REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").fetch();

        System.out.println(recording.getAccountSid());
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

	params := &api.FetchRecordingParams{}

	resp, err := client.Api.FetchRecording("REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

$recording = $twilio->recordings("REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")->fetch();

print $recording->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

recording = @client
            .api
            .v2010
            .recordings('REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
            .fetch

puts recording.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:recordings:fetch \
   --sid REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Recordings/REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "call_sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "conference_sid": "CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "channels": 1,
  "date_created": "Fri, 14 Oct 2016 21:56:34 +0000",
  "date_updated": "Fri, 14 Oct 2016 21:56:38 +0000",
  "start_time": "Fri, 14 Oct 2016 21:56:34 +0000",
  "price": "-0.00250",
  "price_unit": "USD",
  "duration": "4",
  "sid": "REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "source": "StartConferenceRecordingAPI",
  "status": "completed",
  "error_code": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings/REaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "subresource_uris": {
    "add_on_results": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings/REaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AddOnResults.json",
    "transcriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings/REaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions.json"
  },
  "encryption_details": {
    "encryption_public_key_sid": "CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "encryption_cek": "OV4h6zrsxMIW7h0Zfqwfn6TI2GCNl54KALlg8wn8YB8KYZhXt6HlgvBWAmQTlfYVeLWydMiCewY0YkDDT1xmNe5huEo9vjuKBS5OmYK4CZkSx1NVv3XOGrZHpd2Pl/5WJHVhUK//AUO87uh5qnUP2E0KoLh1nyCLeGcEkXU0RfpPn/6nxjof/n6m6OzZOyeIRK4Oed5+rEtjqFDfqT0EVKjs6JAxv+f0DCc1xYRHl2yV8bahUPVKs+bHYdy4PVszFKa76M/Uae4jFA9Lv233JqWcxj+K2UoghuGhAFbV/JQIIswY2CBYI8JlVSifSqNEl9vvsTJ8bkVMm3MKbG2P7Q==",
    "encryption_iv": "8I2hhNIYNTrwxfHk"
  },
  "media_url": "http://api.twilio.com/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings/REaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

### Retrieve a Recording's media file

```bash
GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Recordings/{Sid}.mp3
```

You can fetch a Recording's media file by appending `.wav` or `.mp3` to the Recording's URI.

It's only possible to fetch a Recording's media file when the Recording's status is `completed` and the media is stored at Twilio.

If the media associated with a Recording resource is not available/was deleted/was uploaded to external storage, the request returns `Not Found`.

> \[!WARNING]
>
> Twilio enforces [HTTP Basic Authentication](/docs/glossary/what-is-basic-authentication) for all media URLs. Authenticate using an [API key](/docs/iam/api-keys) as the username and an API key secret as the password. You can also use your Account SID and Auth Token when testing locally.

#### WAV

If you omit the extension or use `.wav`, Twilio returns a binary WAV file with MIME type `audio/x-wav`. For example:

```bash
GET https://api.twilio.com/2010-04-01/Accounts/ACXXXXX.../Recordings/RE557ce644e5ab84fa21cc21112e22c485

```

WAV files have a bitrate of 128kbps.

#### MP3

Appending `.mp3` to the URI returns a binary MP3 file with MIME type `audio/mpeg`. For example:

```bash
GET https://api.twilio.com/2010-04-01/Accounts/ACXXXXX.../Recordings/RE557ce644e5ab84fa21cc21112e22c485.mp3

```

MP3 files have a bitrate of 32kbps.

#### Download dual-channel media file

Call and Conference Recordings are stored at Twilio in dual-channel format by default.

* For a two-party Call, the Recording's dual-channel media file contains the audio from each call leg in separate channels.
* For a Conference, the Recording's dual-channel media file contains the audio of the first participant that joined the Conference in the first channel and all other audio from the Call mixed in the second channel. **Note:** To access this feature, you need to enable **Dual-channel Recording for Conference** on the [Voice Recording settings](/docs/voice/recording-settings#dual-channel-recording-for-conference) page. Read the [Dual-channel Conference Recordings Changelog entry](https://www.twilio.com/en-us/changelog/dual-channel-voice-conference-recordings) for more information.

When sending the `GET` request to download a Recording's media file, the `RequestedChannels` query parameter can be used to specify whether the media file should be downmixed to a single channel or if the file should be downloaded in its original, dual-channel format.

* If the `RequestedChannels` query parameter is not specified when requesting the media file for a **two-party Call Recording**, Twilio returns a media file in the format specified when the Recording was created.
* If the `RequestedChannels` query parameter is not specified when requesting the media file for a **Conference Recording**, Twilio returns a media file in mono-channel format.

> \[!WARNING]
>
> Attempting to download a dual-channel media file when the dual-channel format is not available results in a `400 Bad Request` error. This may happen in the following cases:
>
> * A Recording created with the `<Record>` verb. All audio from those Recordings are mixed and saved in a mono-channel media file.
> * Older Recordings from two-party Calls or Conferences prior to dual-channel support.
>
> To prevent application errors while managing Recordings, you should implement retry logic when sending a `GET` request for a Recording's media file. If a request for a dual-channel media file fails, retry with a `GET` request for with `RequestedChannels=1`.

**Example: Download MP3 media in dual-channel format**

Append `.mp3?RequestedChannels=2` to your Recording's URL

```bash
GET https://api.twilio.com/2010-04-01/Accounts/ACXXXXX.../Recordings/RE557ce644e5ab84fa21cc21112e22c485.mp3?RequestedChannels=2
```

**Example: Download WAV media in dual-channel format**

Append `.wav?RequestedChannels=2` to your Recording's URL

```bash
GET https://api.twilio.com/2010-04-01/Accounts/ACXXXXX.../Recordings/RE557ce644e5ab84fa21cc21112e22c485.wav?RequestedChannels=2
```

### Retrieve a Transcription for a Recording

Each Recording has a Transcriptions subresource which represents the set of transcriptions generated from the recording (if any):

```bash
GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Recordings/{RecordingSid}/Transcriptions
```

This will return the set of transcriptions available for the recording identified by `{RecordingSid}`. Learn more about the [Transcriptions resource](/docs/voice/api/recording-transcription).

## Retrieve a list of Recordings

```bash
GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Recordings.json
```

This API call returns a list of Recordings, each representing a recording generated during a call or conference for the given account. The list returned includes [paging information](/docs/usage/twilios-response#pagination).

> \[!WARNING]
>
> The list of Recordings is protected by your account credentials like most parts of this API. You must use HTTP basic auth to access the Recordings resource.

You can also get a list of Recordings from a specific call or conference by including the call or conference SID in your request like so:

```bash
GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings.json
GET https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Recordings.json
```

### Parameters

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording resources to read.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true}]
```

### Query parameters

```json
[{"name":"DateCreated","in":"query","description":"Only include recordings that were created on this date. Specify a date as `YYYY-MM-DD` in GMT, for example: `2009-07-06`, to read recordings that were created on this date. You can also specify an inequality, such as `DateCreated<=YYYY-MM-DD`, to read recordings that were created on or before midnight of this date, and `DateCreated>=YYYY-MM-DD` to read recordings that were created on or after midnight of this date.","schema":{"type":"string","format":"date-time"},"examples":{"readFull":{"value":"2008-01-02"},"readEmpty":{"value":"2008-01-02"},"readIncludeSoftDeleted":{"value":"2008-01-02"}}},{"name":"DateCreated<","in":"query","description":"Only include recordings that were created on this date. Specify a date as `YYYY-MM-DD` in GMT, for example: `2009-07-06`, to read recordings that were created on this date. You can also specify an inequality, such as `DateCreated<=YYYY-MM-DD`, to read recordings that were created on or before midnight of this date, and `DateCreated>=YYYY-MM-DD` to read recordings that were created on or after midnight of this date.","schema":{"type":"string","format":"date-time"},"examples":{"readFull":{"value":"2008-01-01"},"readEmpty":{"value":"2008-01-01"},"readIncludeSoftDeleted":{"value":"2008-01-01"}}},{"name":"DateCreated>","in":"query","description":"Only include recordings that were created on this date. Specify a date as `YYYY-MM-DD` in GMT, for example: `2009-07-06`, to read recordings that were created on this date. You can also specify an inequality, such as `DateCreated<=YYYY-MM-DD`, to read recordings that were created on or before midnight of this date, and `DateCreated>=YYYY-MM-DD` to read recordings that were created on or after midnight of this date.","schema":{"type":"string","format":"date-time"},"examples":{"readFull":{"value":"2008-01-03"},"readEmpty":{"value":"2008-01-03"},"readIncludeSoftDeleted":{"value":"2008-01-03"}}},{"name":"CallSid","in":"query","description":"The [Call](https://www.twilio.com/docs/voice/api/call-resource) SID of the resources to read.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^CA[0-9a-fA-F]{32}$"}},{"name":"ConferenceSid","in":"query","description":"The Conference SID that identifies the conference associated with the recording to read.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^CF[0-9a-fA-F]{32}$"}},{"name":"IncludeSoftDeleted","in":"query","description":"A boolean parameter indicating whether to retrieve soft deleted recordings or not. Recordings metadata are kept after deletion for a retention period of 40 days.","schema":{"type":"boolean"},"examples":{"readIncludeSoftDeleted":{"value":true}}},{"name":"PageSize","in":"query","description":"How many resources to return in each list page. The default is 50, and the maximum is 1000.","schema":{"type":"integer","format":"int64","minimum":1,"maximum":1000}},{"name":"Page","in":"query","description":"The page index. This value is simply for client state.","schema":{"type":"integer","minimum":0}},{"name":"PageToken","in":"query","description":"The page token. This is provided by the API.","schema":{"type":"string"}}]
```

Examples

Retrieve a list of Recordings for a call

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listRecording() {
  const recordings = await client.recordings.list({
    callSid: "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    limit: 20,
  });

  recordings.forEach((r) => console.log(r.end));
}

listRecording();
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

recordings = client.recordings.list(
    call_sid="CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", limit=20
)

for record in recordings:
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

        var recordings = await RecordingResource.ReadAsync(
            callSid: "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", limit: 20);

        foreach (var record in recordings) {
            Console.WriteLine(record.End);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Recording;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Recording> recordings =
            Recording.reader().setCallSid("CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").limit(20).read();

        for (Recording record : recordings) {
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

	params := &api.ListRecordingParams{}
	params.SetCallSid("CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
	params.SetLimit(20)

	resp, err := client.Api.ListRecording(params)
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

$recordings = $twilio->recordings->read(
    ["callSid" => "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"],
    20
);

foreach ($recordings as $record) {
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

recordings = @client
             .api
             .v2010
             .recordings
             .list(
               call_sid: 'CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
               limit: 20
             )

recordings.each do |record|
   puts record.end
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:recordings:list \
   --call-sid CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Recordings.json?CallSid=CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "end": 0,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json?PageSize=1&Page=0",
  "next_page_uri": null,
  "page": 0,
  "page_size": 1,
  "previous_page_uri": null,
  "recordings": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "api_version": "2010-04-01",
      "call_sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "conference_sid": "CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "channels": 1,
      "date_created": "Fri, 14 Oct 2016 21:56:34 +0000",
      "date_updated": "Fri, 14 Oct 2016 21:56:38 +0000",
      "start_time": "Fri, 14 Oct 2016 21:56:34 +0000",
      "price": "0.04",
      "price_unit": "USD",
      "duration": "4",
      "sid": "REaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "source": "StartConferenceRecordingAPI",
      "status": "completed",
      "error_code": null,
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings/REaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
      "subresource_uris": {
        "add_on_results": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings/REaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AddOnResults.json",
        "transcriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings/REaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions.json"
      },
      "encryption_details": {
        "encryption_public_key_sid": "CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "encryption_cek": "OV4h6zrsxMIW7h0Zfqwfn6TI2GCNl54KALlg8wn8YB8KYZhXt6HlgvBWAmQTlfYVeLWydMiCewY0YkDDT1xmNe5huEo9vjuKBS5OmYK4CZkSx1NVv3XOGrZHpd2Pl/5WJHVhUK//AUO87uh5qnUP2E0KoLh1nyCLeGcEkXU0RfpPn/6nxjof/n6m6OzZOyeIRK4Oed5+rEtjqFDfqT0EVKjs6JAxv+f0DCc1xYRHl2yV8bahUPVKs+bHYdy4PVszFKa76M/Uae4jFA9Lv233JqWcxj+K2UoghuGhAFbV/JQIIswY2CBYI8JlVSifSqNEl9vvsTJ8bkVMm3MKbG2P7Q==",
        "encryption_iv": "8I2hhNIYNTrwxfHk"
      },
      "media_url": "http://api.twilio.com/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings/REaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ],
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json?PageSize=1&Page=0"
}
```

Retrieve a list of Recordings for an account

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listRecording() {
  const recordings = await client.recordings.list({ limit: 20 });

  recordings.forEach((r) => console.log(r.end));
}

listRecording();
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

recordings = client.recordings.list(limit=20)

for record in recordings:
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

        var recordings = await RecordingResource.ReadAsync(limit: 20);

        foreach (var record in recordings) {
            Console.WriteLine(record.End);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Recording;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Recording> recordings = Recording.reader().limit(20).read();

        for (Recording record : recordings) {
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

	params := &api.ListRecordingParams{}
	params.SetLimit(20)

	resp, err := client.Api.ListRecording(params)
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

$recordings = $twilio->recordings->read([], 20);

foreach ($recordings as $record) {
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

recordings = @client
             .api
             .v2010
             .recordings
             .list(limit: 20)

recordings.each do |record|
   puts record.end
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:recordings:list
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Recordings.json?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "end": 0,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json?PageSize=1&Page=0",
  "next_page_uri": null,
  "page": 0,
  "page_size": 1,
  "previous_page_uri": null,
  "recordings": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "api_version": "2010-04-01",
      "call_sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "conference_sid": "CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "channels": 1,
      "date_created": "Fri, 14 Oct 2016 21:56:34 +0000",
      "date_updated": "Fri, 14 Oct 2016 21:56:38 +0000",
      "start_time": "Fri, 14 Oct 2016 21:56:34 +0000",
      "price": "0.04",
      "price_unit": "USD",
      "duration": "4",
      "sid": "REaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "source": "StartConferenceRecordingAPI",
      "status": "completed",
      "error_code": null,
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings/REaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
      "subresource_uris": {
        "add_on_results": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings/REaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AddOnResults.json",
        "transcriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings/REaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions.json"
      },
      "encryption_details": {
        "encryption_public_key_sid": "CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "encryption_cek": "OV4h6zrsxMIW7h0Zfqwfn6TI2GCNl54KALlg8wn8YB8KYZhXt6HlgvBWAmQTlfYVeLWydMiCewY0YkDDT1xmNe5huEo9vjuKBS5OmYK4CZkSx1NVv3XOGrZHpd2Pl/5WJHVhUK//AUO87uh5qnUP2E0KoLh1nyCLeGcEkXU0RfpPn/6nxjof/n6m6OzZOyeIRK4Oed5+rEtjqFDfqT0EVKjs6JAxv+f0DCc1xYRHl2yV8bahUPVKs+bHYdy4PVszFKa76M/Uae4jFA9Lv233JqWcxj+K2UoghuGhAFbV/JQIIswY2CBYI8JlVSifSqNEl9vvsTJ8bkVMm3MKbG2P7Q==",
        "encryption_iv": "8I2hhNIYNTrwxfHk"
      },
      "media_url": "http://api.twilio.com/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings/REaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ],
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json?PageSize=1&Page=0"
}
```

Filter Recordings with exact match

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listRecording() {
  const recordings = await client.recordings.list({
    dateCreated: new Date("2016-10-18 00:00:00"),
    limit: 20,
  });

  recordings.forEach((r) => console.log(r.end));
}

listRecording();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client
from datetime import datetime

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

recordings = client.recordings.list(
    date_created=datetime(2016, 10, 18, 0, 0, 0), limit=20
)

for record in recordings:
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

        var recordings = await RecordingResource.ReadAsync(
            dateCreated: new DateTime(2016, 10, 18, 0, 0, 0, DateTimeKind.Utc), limit: 20);

        foreach (var record in recordings) {
            Console.WriteLine(record.End);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.time.ZoneId;
import java.time.ZonedDateTime;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Recording;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Recording> recordings =
            Recording.reader()
                .setDateCreated(ZonedDateTime.of(2016, 10, 18, 0, 0, 0, 0, ZoneId.of("UTC")))
                .limit(20)
                .read();

        for (Recording record : recordings) {
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
	"time"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.ListRecordingParams{}
	params.SetDateCreated(time.Date(2016, 10, 18, 0, 0, 0, 0, time.UTC))
	params.SetLimit(20)

	resp, err := client.Api.ListRecording(params)
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

$recordings = $twilio->recordings->read(
    ["dateCreated" => new \DateTime("2016-10-18T00:00:00Z")],
    20
);

foreach ($recordings as $record) {
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

recordings = @client
             .api
             .v2010
             .recordings
             .list(
               date_created: Time.new(2016, 10, 18, 0, 0, 0),
               limit: 20
             )

recordings.each do |record|
   puts record.end
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:recordings:list \
   --date-created 2016-07-31
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Recordings.json?DateCreated=2016-07-31&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "end": 0,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json?PageSize=1&Page=0",
  "next_page_uri": null,
  "page": 0,
  "page_size": 1,
  "previous_page_uri": null,
  "recordings": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "api_version": "2010-04-01",
      "call_sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "conference_sid": "CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "channels": 1,
      "date_created": "Fri, 14 Oct 2016 21:56:34 +0000",
      "date_updated": "Fri, 14 Oct 2016 21:56:38 +0000",
      "start_time": "Fri, 14 Oct 2016 21:56:34 +0000",
      "price": "0.04",
      "price_unit": "USD",
      "duration": "4",
      "sid": "REaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "source": "StartConferenceRecordingAPI",
      "status": "completed",
      "error_code": null,
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings/REaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
      "subresource_uris": {
        "add_on_results": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings/REaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AddOnResults.json",
        "transcriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings/REaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions.json"
      },
      "encryption_details": {
        "encryption_public_key_sid": "CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "encryption_cek": "OV4h6zrsxMIW7h0Zfqwfn6TI2GCNl54KALlg8wn8YB8KYZhXt6HlgvBWAmQTlfYVeLWydMiCewY0YkDDT1xmNe5huEo9vjuKBS5OmYK4CZkSx1NVv3XOGrZHpd2Pl/5WJHVhUK//AUO87uh5qnUP2E0KoLh1nyCLeGcEkXU0RfpPn/6nxjof/n6m6OzZOyeIRK4Oed5+rEtjqFDfqT0EVKjs6JAxv+f0DCc1xYRHl2yV8bahUPVKs+bHYdy4PVszFKa76M/Uae4jFA9Lv233JqWcxj+K2UoghuGhAFbV/JQIIswY2CBYI8JlVSifSqNEl9vvsTJ8bkVMm3MKbG2P7Q==",
        "encryption_iv": "8I2hhNIYNTrwxfHk"
      },
      "media_url": "http://api.twilio.com/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings/REaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ],
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json?PageSize=1&Page=0"
}
```

Filter Recordings with range match

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listRecording() {
  const recordings = await client.recordings.list({
    dateCreatedBefore: new Date("2016-10-15 00:00:00"),
    dateCreatedAfter: new Date("2016-10-12 00:00:00"),
    limit: 20,
  });

  recordings.forEach((r) => console.log(r.end));
}

listRecording();
```

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client
from datetime import datetime

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

recordings = client.recordings.list(
    date_created_before=datetime(2016, 10, 15, 0, 0, 0),
    date_created_after=datetime(2016, 10, 12, 0, 0, 0),
    limit=20,
)

for record in recordings:
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

        var recordings = await RecordingResource.ReadAsync(
            dateCreatedBefore: new DateTime(2016, 10, 15, 0, 0, 0, DateTimeKind.Utc),
            dateCreatedAfter: new DateTime(2016, 10, 12, 0, 0, 0, DateTimeKind.Utc),
            limit: 20);

        foreach (var record in recordings) {
            Console.WriteLine(record.End);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.time.ZoneId;
import java.time.ZonedDateTime;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Recording;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<Recording> recordings =
            Recording.reader()
                .setDateCreatedBefore(ZonedDateTime.of(2016, 10, 15, 0, 0, 0, 0, ZoneId.of("UTC")))
                .setDateCreatedAfter(ZonedDateTime.of(2016, 10, 12, 0, 0, 0, 0, ZoneId.of("UTC")))
                .limit(20)
                .read();

        for (Recording record : recordings) {
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
	"time"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &api.ListRecordingParams{}
	params.SetDateCreatedBefore(time.Date(2016, 10, 15, 0, 0, 0, 0, time.UTC))
	params.SetDateCreatedAfter(time.Date(2016, 10, 12, 0, 0, 0, 0, time.UTC))
	params.SetLimit(20)

	resp, err := client.Api.ListRecording(params)
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

$recordings = $twilio->recordings->read(
    [
        "dateCreatedBefore" => new \DateTime("2016-10-15T00:00:00Z"),
        "dateCreatedAfter" => new \DateTime("2016-10-12T00:00:00Z"),
    ],
    20
);

foreach ($recordings as $record) {
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

recordings = @client
             .api
             .v2010
             .recordings
             .list(
               date_created_before: Time.new(2016, 10, 15, 0, 0, 0),
               date_created_after: Time.new(2016, 10, 12, 0, 0, 0),
               limit: 20
             )

recordings.each do |record|
   puts record.end
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:recordings:list \
   --date-created-before 2016-07-31 \
   --date-created-after 2016-07-31
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Recordings.json?DateCreated<=2016-07-31&DateCreated>=2016-07-31&PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "end": 0,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json?PageSize=1&Page=0",
  "next_page_uri": null,
  "page": 0,
  "page_size": 1,
  "previous_page_uri": null,
  "recordings": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "api_version": "2010-04-01",
      "call_sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "conference_sid": "CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "channels": 1,
      "date_created": "Fri, 14 Oct 2016 21:56:34 +0000",
      "date_updated": "Fri, 14 Oct 2016 21:56:38 +0000",
      "start_time": "Fri, 14 Oct 2016 21:56:34 +0000",
      "price": "0.04",
      "price_unit": "USD",
      "duration": "4",
      "sid": "REaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "source": "StartConferenceRecordingAPI",
      "status": "completed",
      "error_code": null,
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings/REaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
      "subresource_uris": {
        "add_on_results": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings/REaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AddOnResults.json",
        "transcriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings/REaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions.json"
      },
      "encryption_details": {
        "encryption_public_key_sid": "CRaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        "encryption_cek": "OV4h6zrsxMIW7h0Zfqwfn6TI2GCNl54KALlg8wn8YB8KYZhXt6HlgvBWAmQTlfYVeLWydMiCewY0YkDDT1xmNe5huEo9vjuKBS5OmYK4CZkSx1NVv3XOGrZHpd2Pl/5WJHVhUK//AUO87uh5qnUP2E0KoLh1nyCLeGcEkXU0RfpPn/6nxjof/n6m6OzZOyeIRK4Oed5+rEtjqFDfqT0EVKjs6JAxv+f0DCc1xYRHl2yV8bahUPVKs+bHYdy4PVszFKa76M/Uae4jFA9Lv233JqWcxj+K2UoghuGhAFbV/JQIIswY2CBYI8JlVSifSqNEl9vvsTJ8bkVMm3MKbG2P7Q==",
        "encryption_iv": "8I2hhNIYNTrwxfHk"
      },
      "media_url": "http://api.twilio.com/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings/REaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ],
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json?PageSize=1&Page=0"
}
```

## Update a Recording

```bash
POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings/{Sid}.json
POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Recordings/{Sid}.json
```

An active Call or Conference Recording can be **paused** and **resumed**. Additionally, an active call recording can be **stopped** which will end the recording immediately. (The *stopped* status isn't supported for conference recordings.)

### Parameters \[#parameters-2]

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording resource to update.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true},{"name":"CallSid","in":"path","description":"The [Call](https://www.twilio.com/docs/voice/api/call-resource) SID of the resource to update.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^CA[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The Twilio-provided string that uniquely identifies the Recording resource to update.","schema":{"type":"string"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"UpdateCallRecordingRequest","required":["Status"],"properties":{"Status":{"type":"string","enum":["in-progress","paused","stopped","processing","completed","absent"],"description":"The status of the recording. Can be: `processing`, `completed` and `absent`. For more detailed statuses on in-progress recordings, check out how to [Update a Recording Resource](https://www.twilio.com/docs/voice/api/recording#update-a-recording-resource).","refName":"call_recording_enum_status","modelName":"call_recording_enum_status"},"PauseBehavior":{"type":"string","description":"Whether to record during a pause. Can be: `skip` or `silence` and the default is `silence`. `skip` does not record during the pause period, while `silence` will replace the actual audio of the call with silence during the pause period. This parameter only applies when setting `status` is set to `paused`."}}},"examples":{"update":{"value":{"lang":"json","value":"{\n  \"Status\": \"paused\",\n  \"PauseBehavior\": \"skip\",\n  \"PlayBeep\": true\n}","meta":"","code":"{\n  \"Status\": \"paused\",\n  \"PauseBehavior\": \"skip\",\n  \"PlayBeep\": true\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Status\"","#7EE787"],[":","#C9D1D9"]," ",["\"paused\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"PauseBehavior\"","#7EE787"],[":","#C9D1D9"]," ",["\"skip\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"PlayBeep\"","#7EE787"],[":","#C9D1D9"]," ",["true","#79C0FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Examples:

> \[!WARNING]
>
> Note in examples below that the API responses for updates to the Recording resource will provide a more detailed inflight 'status' including ***paused***, ***in-progress***, or ***stopped*** but a fetch on the Recording resource will only show ***processing*** or ***completed***.

Update a Recording: Pause a Call Recording with skip option

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateCallRecording() {
  const recording = await client
    .calls("CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .recordings("REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .update({
      pauseBehavior: "skip",
      status: "paused",
    });

  console.log(recording.accountSid);
}

updateCallRecording();
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

call_recording = (
    client.calls("CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .recordings("REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .update(pause_behavior="skip", status="paused")
)

print(call_recording.account_sid)
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

        var recording = await RecordingResource.UpdateAsync(
            pauseBehavior: "skip",
            status: RecordingResource.StatusEnum.Paused,
            pathCallSid: "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            pathSid: "REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(recording.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.call.Recording;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Recording recording =
            Recording
                .updater(
                    "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", Recording.Status.PAUSED)
                .setPauseBehavior("skip")
                .update();

        System.out.println(recording.getAccountSid());
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

	params := &api.UpdateCallRecordingParams{}
	params.SetPauseBehavior("skip")
	params.SetStatus("paused")

	resp, err := client.Api.UpdateCallRecording("CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		"REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

$call_recording = $twilio
    ->calls("CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->recordings("REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->update(
        "paused", // Status
        ["pauseBehavior" => "skip"]
    );

print $call_recording->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

recording = @client
            .api
            .v2010
            .calls('CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
            .recordings('REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
            .update(
              pause_behavior: 'skip',
              status: 'paused'
            )

puts recording.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:calls:recordings:update \
   --call-sid CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --sid REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --pause-behavior skip \
   --status paused
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Calls/CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Recordings/REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json" \
--data-urlencode "PauseBehavior=skip" \
--data-urlencode "Status=paused" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "call_sid": "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "conference_sid": null,
  "channels": 2,
  "date_created": "Fri, 14 Oct 2016 21:56:34 +0000",
  "date_updated": "Fri, 14 Oct 2016 21:56:36 +0000",
  "start_time": "Fri, 14 Oct 2016 21:56:34 +0000",
  "price": null,
  "price_unit": null,
  "duration": null,
  "sid": "REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "source": "StartCallRecordingAPI",
  "status": "paused",
  "error_code": null,
  "encryption_details": null,
  "track": "both",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings/REaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

Update a Recording: Pause a Conference Recording with skip option

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateConferenceRecording() {
  const recording = await client
    .conferences("CFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .recordings("REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .update({
      pauseBehavior: "skip",
      status: "paused",
    });

  console.log(recording.accountSid);
}

updateConferenceRecording();
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

conference_recording = (
    client.conferences("CFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .recordings("REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .update(pause_behavior="skip", status="paused")
)

print(conference_recording.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account.Conference;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var recording = await RecordingResource.UpdateAsync(
            pauseBehavior: "skip",
            status: RecordingResource.StatusEnum.Paused,
            pathConferenceSid: "CFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            pathSid: "REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(recording.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.conference.Recording;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Recording recording =
            Recording
                .updater(
                    "CFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", Recording.Status.PAUSED)
                .setPauseBehavior("skip")
                .update();

        System.out.println(recording.getAccountSid());
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

	params := &api.UpdateConferenceRecordingParams{}
	params.SetPauseBehavior("skip")
	params.SetStatus("paused")

	resp, err := client.Api.UpdateConferenceRecording("CFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		"REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

$conference_recording = $twilio
    ->conferences("CFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->recordings("REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->update(
        "paused", // Status
        ["pauseBehavior" => "skip"]
    );

print $conference_recording->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

recording = @client
            .api
            .v2010
            .conferences('CFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
            .recordings('REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
            .update(
              pause_behavior: 'skip',
              status: 'paused'
            )

puts recording.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:conferences:recordings:update \
   --conference-sid CFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --sid REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --pause-behavior skip \
   --status paused
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Conferences/CFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Recordings/REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json" \
--data-urlencode "PauseBehavior=skip" \
--data-urlencode "Status=paused" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "call_sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "conference_sid": "CFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "channels": 1,
  "date_created": "Fri, 14 Oct 2016 21:56:34 +0000",
  "date_updated": "Fri, 14 Oct 2016 21:56:39 +0000",
  "start_time": "Fri, 14 Oct 2016 21:56:34 +0000",
  "price": null,
  "price_unit": null,
  "duration": null,
  "sid": "REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "source": "StartConferenceRecordingAPI",
  "status": "paused",
  "error_code": null,
  "encryption_details": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings/REaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

> \[!NOTE]
>
> In the following two examples, note the use of `Twilio.CURRENT` to reference the currently active recording without requiring an explicit Recording SID.
>
> `Twilio.CURRENT` can be used for *pause*, *resume*, or *stop* actions on calls with only one active recording.

> \[!WARNING]
>
> Note that if your use case has multiple or concurrent recordings for a call or conference, you will need to use the Recording SID to reference the correct one. Using `Twilio.CURRENT` to reference a recording on a resource that has multiple recordings will result in an error that the request failed because there is more than one recording for the given Call.

Update a Recording: Pause a Call Recording with Twilio.CURRENT

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateCallRecording() {
  const recording = await client
    .calls("CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .recordings("Twilio.CURRENT")
    .update({ status: "paused" });

  console.log(recording.accountSid);
}

updateCallRecording();
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

call_recording = (
    client.calls("CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .recordings("Twilio.CURRENT")
    .update(status="paused")
)

print(call_recording.account_sid)
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

        var recording = await RecordingResource.UpdateAsync(
            status: RecordingResource.StatusEnum.Paused,
            pathCallSid: "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            pathSid: "Twilio.CURRENT");

        Console.WriteLine(recording.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.call.Recording;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Recording recording =
            Recording.updater("CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "Twilio.CURRENT", Recording.Status.PAUSED).update();

        System.out.println(recording.getAccountSid());
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

	params := &api.UpdateCallRecordingParams{}
	params.SetStatus("paused")

	resp, err := client.Api.UpdateCallRecording("CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		"Twilio.CURRENT",
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

$call_recording = $twilio
    ->calls("CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->recordings("Twilio.CURRENT")
    ->update(
        "paused" // Status
    );

print $call_recording->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

recording = @client
            .api
            .v2010
            .calls('CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
            .recordings('Twilio.CURRENT')
            .update(status: 'paused')

puts recording.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:calls:recordings:update \
   --call-sid CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --sid Twilio.CURRENT \
   --status paused
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Calls/CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Recordings/Twilio.CURRENT.json" \
--data-urlencode "Status=paused" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "call_sid": "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "conference_sid": null,
  "channels": 2,
  "date_created": "Fri, 14 Oct 2016 21:56:34 +0000",
  "date_updated": "Fri, 14 Oct 2016 21:56:36 +0000",
  "start_time": "Fri, 14 Oct 2016 21:56:34 +0000",
  "price": null,
  "price_unit": null,
  "duration": null,
  "sid": "Twilio.CURRENT",
  "source": "StartCallRecordingAPI",
  "status": "paused",
  "error_code": null,
  "encryption_details": null,
  "track": "both",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings/REaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

Update a Recording: Pause a Conference Recording with Twilio.CURRENT

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateConferenceRecording() {
  const recording = await client
    .conferences("CFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .recordings("Twilio.CURRENT")
    .update({ status: "paused" });

  console.log(recording.accountSid);
}

updateConferenceRecording();
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

conference_recording = (
    client.conferences("CFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .recordings("Twilio.CURRENT")
    .update(status="paused")
)

print(conference_recording.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account.Conference;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var recording = await RecordingResource.UpdateAsync(
            status: RecordingResource.StatusEnum.Paused,
            pathConferenceSid: "CFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            pathSid: "Twilio.CURRENT");

        Console.WriteLine(recording.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.conference.Recording;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Recording recording =
            Recording.updater("CFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "Twilio.CURRENT", Recording.Status.PAUSED).update();

        System.out.println(recording.getAccountSid());
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

	params := &api.UpdateConferenceRecordingParams{}
	params.SetStatus("paused")

	resp, err := client.Api.UpdateConferenceRecording("CFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		"Twilio.CURRENT",
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

$conference_recording = $twilio
    ->conferences("CFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->recordings("Twilio.CURRENT")
    ->update(
        "paused" // Status
    );

print $conference_recording->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

recording = @client
            .api
            .v2010
            .conferences('CFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
            .recordings('Twilio.CURRENT')
            .update(status: 'paused')

puts recording.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:conferences:recordings:update \
   --conference-sid CFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --sid Twilio.CURRENT \
   --status paused
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Conferences/CFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Recordings/Twilio.CURRENT.json" \
--data-urlencode "Status=paused" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "call_sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "conference_sid": "CFXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "channels": 1,
  "date_created": "Fri, 14 Oct 2016 21:56:34 +0000",
  "date_updated": "Fri, 14 Oct 2016 21:56:39 +0000",
  "start_time": "Fri, 14 Oct 2016 21:56:34 +0000",
  "price": null,
  "price_unit": null,
  "duration": null,
  "sid": "Twilio.CURRENT",
  "source": "StartConferenceRecordingAPI",
  "status": "paused",
  "error_code": null,
  "encryption_details": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Conferences/CFaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings/REaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

Update a Recording:Resume a Call Recording

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateCallRecording() {
  const recording = await client
    .calls("CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .recordings("REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .update({ status: "in-progress" });

  console.log(recording.accountSid);
}

updateCallRecording();
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

call_recording = (
    client.calls("CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .recordings("REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .update(status="in-progress")
)

print(call_recording.account_sid)
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

        var recording = await RecordingResource.UpdateAsync(
            status: RecordingResource.StatusEnum.InProgress,
            pathCallSid: "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            pathSid: "REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(recording.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.call.Recording;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Recording recording = Recording
                                  .updater("CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                                      "REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                                      Recording.Status.IN_PROGRESS)
                                  .update();

        System.out.println(recording.getAccountSid());
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

	params := &api.UpdateCallRecordingParams{}
	params.SetStatus("in-progress")

	resp, err := client.Api.UpdateCallRecording("CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		"REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

$call_recording = $twilio
    ->calls("CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->recordings("REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->update(
        "in-progress" // Status
    );

print $call_recording->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

recording = @client
            .api
            .v2010
            .calls('CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
            .recordings('REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
            .update(status: 'in-progress')

puts recording.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:calls:recordings:update \
   --call-sid CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --sid REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --status in-progress
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Calls/CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Recordings/REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json" \
--data-urlencode "Status=in-progress" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "call_sid": "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "conference_sid": null,
  "channels": 2,
  "date_created": "Fri, 14 Oct 2016 21:56:34 +0000",
  "date_updated": "Fri, 14 Oct 2016 21:56:36 +0000",
  "start_time": "Fri, 14 Oct 2016 21:56:34 +0000",
  "price": null,
  "price_unit": null,
  "duration": null,
  "sid": "REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "source": "StartCallRecordingAPI",
  "status": "in-progress",
  "error_code": null,
  "encryption_details": null,
  "track": "both",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings/REaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

Update a Recording:Stop a Call Recording

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateCallRecording() {
  const recording = await client
    .calls("CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .recordings("REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .update({ status: "stopped" });

  console.log(recording.accountSid);
}

updateCallRecording();
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

call_recording = (
    client.calls("CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .recordings("REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .update(status="stopped")
)

print(call_recording.account_sid)
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

        var recording = await RecordingResource.UpdateAsync(
            status: RecordingResource.StatusEnum.Stopped,
            pathCallSid: "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            pathSid: "REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(recording.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.call.Recording;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Recording recording = Recording
                                  .updater("CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                                      "REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                                      Recording.Status.STOPPED)
                                  .update();

        System.out.println(recording.getAccountSid());
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

	params := &api.UpdateCallRecordingParams{}
	params.SetStatus("stopped")

	resp, err := client.Api.UpdateCallRecording("CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		"REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

$call_recording = $twilio
    ->calls("CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->recordings("REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->update(
        "stopped" // Status
    );

print $call_recording->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

recording = @client
            .api
            .v2010
            .calls('CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
            .recordings('REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
            .update(status: 'stopped')

puts recording.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:calls:recordings:update \
   --call-sid CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --sid REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --status stopped
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Calls/CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Recordings/REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json" \
--data-urlencode "Status=stopped" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "call_sid": "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "conference_sid": null,
  "channels": 2,
  "date_created": "Fri, 14 Oct 2016 21:56:34 +0000",
  "date_updated": "Fri, 14 Oct 2016 21:56:36 +0000",
  "start_time": "Fri, 14 Oct 2016 21:56:34 +0000",
  "price": null,
  "price_unit": null,
  "duration": null,
  "sid": "REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "source": "StartCallRecordingAPI",
  "status": "stopped",
  "error_code": null,
  "encryption_details": null,
  "track": "both",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings/REaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

## Delete a Recording

```bash
DELETE https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Recordings/{Sid}.json
```

Deletes a recording from your account. Once the recording is deleted:

* You will no longer be billed for storage of those minutes
* The recording is set to a status of `deleted`
* The metadata is *preserved for a period of 40 days*, during which time the metadata is still visible in the Console and API.
* The recording media cannot be recovered.

If successful, `DELETE` returns HTTP 204 (No Content) with no body.

Only `completed` recordings can be deleted. Recordings with any other status are not available for deletion.

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the Recording resources to delete.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The Twilio-provided string that uniquely identifies the Recording resource to delete.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^RE[0-9a-fA-F]{32}$"},"required":true}]
```

> \[!NOTE]
>
> To delete a large set of Voice Recordings, you can use the bulk deletion capabilities in Twilio Console. In Twilio Console, go to **Monitor** > **Logs** > **Voice** > **[Call recordings](https://1console.twilio.com/go?to=/account/__account__/us1/logs/voice/call-recordings)**. You can also find the bulk deletion capabilities in the [legacy Console](https://www.twilio.com/console/voice/recordings/recording-logs).

Example:

Delete a Recording

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function deleteRecording() {
  await client.recordings("REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").remove();
}

deleteRecording();
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

client.recordings("REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").delete()
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

        await RecordingResource.DeleteAsync(pathSid: "REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Recording;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Recording.deleter("REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").delete();
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

	params := &api.DeleteRecordingParams{}

	err := client.Api.DeleteRecording("REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

$twilio->recordings("REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")->delete();
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
  .recordings('REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  .delete
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:recordings:remove \
   --sid REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X DELETE "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Recordings/REXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```
