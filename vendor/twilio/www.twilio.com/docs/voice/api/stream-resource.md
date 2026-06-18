# Streams subresource

> \[!NOTE]
>
> You can use [Media Streams][regional-availability] in the Ireland (`IE1`) and Australia (`AU1`) [Regions][twilio-regions]. To set up Media Streams with these regions, follow the guides for non-US [outbound][non-us-outgoing] and [inbound][non-us-incoming] calls. The [default region][default-region] remains `US1`.

[non-us-outgoing]: /docs/global-infrastructure/create-an-outbound-call-via-rest-api-in-a-non-us-twilio-region

[non-us-incoming]: /docs/global-infrastructure/inbound-call-processing

[twilio-regions]: /docs/global-infrastructure/understanding-twilio-regions

[default-region]: /docs/global-infrastructure/understanding-twilio-regions#use-the-default-twilio-region

[regional-availability]: /docs/global-infrastructure/regional-product-and-feature-availability

Streams is a subresource of [Calls](/docs/voice/api/call-resource). A Stream subresource represents a live audio stream during a live call.

Creating a Stream subresource creates a unidirectional Media Stream. You can stop a unidirectional Media Stream by [updating the `status` of a Stream subresource](#stop-a-stream), regardless of whether the Stream was created [via TwiML](/docs/voice/twiml/stream) (with `<Start><Stream>`) or via REST API (with the Streams subresource).

## Stream Properties

<OperationTable type="properties" data={{"type":"object","refName":"api.v2010.account.call.stream","modelName":"api_v2010_account_call_stream","properties":{"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^MZ[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the Stream resource."},"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Stream resource."},"call_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^CA[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Stream resource is associated with."},"name":{"type":"string","nullable":true,"description":"The user-specified name of this Stream, if one was given when the Stream was created. This can be used to stop the Stream."},"status":{"type":"string","enum":["in-progress","stopped"],"description":"The status of the Stream. Possible values are `stopped` and `in-progress`.","refName":"stream_enum_status","modelName":"stream_enum_status"},"date_updated":{"type":"string","format":"date-time-rfc-2822","nullable":true,"description":"The date and time in GMT that this resource was last updated, specified in [RFC 2822](https://www.ietf.org/rfc/rfc2822.txt) format."},"uri":{"type":"string","nullable":true,"description":"The URI of the resource, relative to `https://api.twilio.com`."}}}} />

## Create a Stream

`POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Streams.json`

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Stream resource.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true},{"name":"CallSid","in":"path","description":"The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Stream resource is associated with.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^CA[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"CreateStreamRequest","required":["Url"],"properties":{"Url":{"type":"string","format":"uri","description":"Relative or absolute URL where WebSocket connection will be established."},"Name":{"type":"string","description":"The user-specified name of this Stream, if one was given when the Stream was created. This can be used to stop the Stream."},"Track":{"type":"string","enum":["inbound_track","outbound_track","both_tracks"],"description":"The tracks to be included in the Stream. Possible values are `inbound_track`, `outbound_track`, `both_tracks`. Default value is `inbound_track`.","refName":"stream_enum_track","modelName":"stream_enum_track"},"StatusCallback":{"type":"string","format":"uri","description":"Absolute URL to which Twilio sends status callback HTTP requests."},"StatusCallbackMethod":{"type":"string","format":"http-method","enum":["GET","POST"],"description":"The HTTP method Twilio uses when sending `status_callback` requests. Possible values are `GET` and `POST`. Default is `POST`."},"Parameter1.Name":{"type":"string","description":"Parameter name"},"Parameter1.Value":{"type":"string","description":"Parameter value"},"Parameter2.Name":{"type":"string","description":"Parameter name"},"Parameter2.Value":{"type":"string","description":"Parameter value"},"Parameter3.Name":{"type":"string","description":"Parameter name"},"Parameter3.Value":{"type":"string","description":"Parameter value"},"Parameter4.Name":{"type":"string","description":"Parameter name"},"Parameter4.Value":{"type":"string","description":"Parameter value"},"Parameter5.Name":{"type":"string","description":"Parameter name"},"Parameter5.Value":{"type":"string","description":"Parameter value"},"Parameter6.Name":{"type":"string","description":"Parameter name"},"Parameter6.Value":{"type":"string","description":"Parameter value"},"Parameter7.Name":{"type":"string","description":"Parameter name"},"Parameter7.Value":{"type":"string","description":"Parameter value"},"Parameter8.Name":{"type":"string","description":"Parameter name"},"Parameter8.Value":{"type":"string","description":"Parameter value"},"Parameter9.Name":{"type":"string","description":"Parameter name"},"Parameter9.Value":{"type":"string","description":"Parameter value"},"Parameter10.Name":{"type":"string","description":"Parameter name"},"Parameter10.Value":{"type":"string","description":"Parameter value"},"Parameter11.Name":{"type":"string","description":"Parameter name"},"Parameter11.Value":{"type":"string","description":"Parameter value"},"Parameter12.Name":{"type":"string","description":"Parameter name"},"Parameter12.Value":{"type":"string","description":"Parameter value"},"Parameter13.Name":{"type":"string","description":"Parameter name"},"Parameter13.Value":{"type":"string","description":"Parameter value"},"Parameter14.Name":{"type":"string","description":"Parameter name"},"Parameter14.Value":{"type":"string","description":"Parameter value"},"Parameter15.Name":{"type":"string","description":"Parameter name"},"Parameter15.Value":{"type":"string","description":"Parameter value"},"Parameter16.Name":{"type":"string","description":"Parameter name"},"Parameter16.Value":{"type":"string","description":"Parameter value"},"Parameter17.Name":{"type":"string","description":"Parameter name"},"Parameter17.Value":{"type":"string","description":"Parameter value"},"Parameter18.Name":{"type":"string","description":"Parameter name"},"Parameter18.Value":{"type":"string","description":"Parameter value"},"Parameter19.Name":{"type":"string","description":"Parameter name"},"Parameter19.Value":{"type":"string","description":"Parameter value"},"Parameter20.Name":{"type":"string","description":"Parameter name"},"Parameter20.Value":{"type":"string","description":"Parameter value"},"Parameter21.Name":{"type":"string","description":"Parameter name"},"Parameter21.Value":{"type":"string","description":"Parameter value"},"Parameter22.Name":{"type":"string","description":"Parameter name"},"Parameter22.Value":{"type":"string","description":"Parameter value"},"Parameter23.Name":{"type":"string","description":"Parameter name"},"Parameter23.Value":{"type":"string","description":"Parameter value"},"Parameter24.Name":{"type":"string","description":"Parameter name"},"Parameter24.Value":{"type":"string","description":"Parameter value"},"Parameter25.Name":{"type":"string","description":"Parameter name"},"Parameter25.Value":{"type":"string","description":"Parameter value"},"Parameter26.Name":{"type":"string","description":"Parameter name"},"Parameter26.Value":{"type":"string","description":"Parameter value"},"Parameter27.Name":{"type":"string","description":"Parameter name"},"Parameter27.Value":{"type":"string","description":"Parameter value"},"Parameter28.Name":{"type":"string","description":"Parameter name"},"Parameter28.Value":{"type":"string","description":"Parameter value"},"Parameter29.Name":{"type":"string","description":"Parameter name"},"Parameter29.Value":{"type":"string","description":"Parameter value"},"Parameter30.Name":{"type":"string","description":"Parameter name"},"Parameter30.Value":{"type":"string","description":"Parameter value"},"Parameter31.Name":{"type":"string","description":"Parameter name"},"Parameter31.Value":{"type":"string","description":"Parameter value"},"Parameter32.Name":{"type":"string","description":"Parameter name"},"Parameter32.Value":{"type":"string","description":"Parameter value"},"Parameter33.Name":{"type":"string","description":"Parameter name"},"Parameter33.Value":{"type":"string","description":"Parameter value"},"Parameter34.Name":{"type":"string","description":"Parameter name"},"Parameter34.Value":{"type":"string","description":"Parameter value"},"Parameter35.Name":{"type":"string","description":"Parameter name"},"Parameter35.Value":{"type":"string","description":"Parameter value"},"Parameter36.Name":{"type":"string","description":"Parameter name"},"Parameter36.Value":{"type":"string","description":"Parameter value"},"Parameter37.Name":{"type":"string","description":"Parameter name"},"Parameter37.Value":{"type":"string","description":"Parameter value"},"Parameter38.Name":{"type":"string","description":"Parameter name"},"Parameter38.Value":{"type":"string","description":"Parameter value"},"Parameter39.Name":{"type":"string","description":"Parameter name"},"Parameter39.Value":{"type":"string","description":"Parameter value"},"Parameter40.Name":{"type":"string","description":"Parameter name"},"Parameter40.Value":{"type":"string","description":"Parameter value"},"Parameter41.Name":{"type":"string","description":"Parameter name"},"Parameter41.Value":{"type":"string","description":"Parameter value"},"Parameter42.Name":{"type":"string","description":"Parameter name"},"Parameter42.Value":{"type":"string","description":"Parameter value"},"Parameter43.Name":{"type":"string","description":"Parameter name"},"Parameter43.Value":{"type":"string","description":"Parameter value"},"Parameter44.Name":{"type":"string","description":"Parameter name"},"Parameter44.Value":{"type":"string","description":"Parameter value"},"Parameter45.Name":{"type":"string","description":"Parameter name"},"Parameter45.Value":{"type":"string","description":"Parameter value"},"Parameter46.Name":{"type":"string","description":"Parameter name"},"Parameter46.Value":{"type":"string","description":"Parameter value"},"Parameter47.Name":{"type":"string","description":"Parameter name"},"Parameter47.Value":{"type":"string","description":"Parameter value"},"Parameter48.Name":{"type":"string","description":"Parameter name"},"Parameter48.Value":{"type":"string","description":"Parameter value"},"Parameter49.Name":{"type":"string","description":"Parameter name"},"Parameter49.Value":{"type":"string","description":"Parameter value"},"Parameter50.Name":{"type":"string","description":"Parameter name"},"Parameter50.Value":{"type":"string","description":"Parameter value"},"Parameter51.Name":{"type":"string","description":"Parameter name"},"Parameter51.Value":{"type":"string","description":"Parameter value"},"Parameter52.Name":{"type":"string","description":"Parameter name"},"Parameter52.Value":{"type":"string","description":"Parameter value"},"Parameter53.Name":{"type":"string","description":"Parameter name"},"Parameter53.Value":{"type":"string","description":"Parameter value"},"Parameter54.Name":{"type":"string","description":"Parameter name"},"Parameter54.Value":{"type":"string","description":"Parameter value"},"Parameter55.Name":{"type":"string","description":"Parameter name"},"Parameter55.Value":{"type":"string","description":"Parameter value"},"Parameter56.Name":{"type":"string","description":"Parameter name"},"Parameter56.Value":{"type":"string","description":"Parameter value"},"Parameter57.Name":{"type":"string","description":"Parameter name"},"Parameter57.Value":{"type":"string","description":"Parameter value"},"Parameter58.Name":{"type":"string","description":"Parameter name"},"Parameter58.Value":{"type":"string","description":"Parameter value"},"Parameter59.Name":{"type":"string","description":"Parameter name"},"Parameter59.Value":{"type":"string","description":"Parameter value"},"Parameter60.Name":{"type":"string","description":"Parameter name"},"Parameter60.Value":{"type":"string","description":"Parameter value"},"Parameter61.Name":{"type":"string","description":"Parameter name"},"Parameter61.Value":{"type":"string","description":"Parameter value"},"Parameter62.Name":{"type":"string","description":"Parameter name"},"Parameter62.Value":{"type":"string","description":"Parameter value"},"Parameter63.Name":{"type":"string","description":"Parameter name"},"Parameter63.Value":{"type":"string","description":"Parameter value"},"Parameter64.Name":{"type":"string","description":"Parameter name"},"Parameter64.Value":{"type":"string","description":"Parameter value"},"Parameter65.Name":{"type":"string","description":"Parameter name"},"Parameter65.Value":{"type":"string","description":"Parameter value"},"Parameter66.Name":{"type":"string","description":"Parameter name"},"Parameter66.Value":{"type":"string","description":"Parameter value"},"Parameter67.Name":{"type":"string","description":"Parameter name"},"Parameter67.Value":{"type":"string","description":"Parameter value"},"Parameter68.Name":{"type":"string","description":"Parameter name"},"Parameter68.Value":{"type":"string","description":"Parameter value"},"Parameter69.Name":{"type":"string","description":"Parameter name"},"Parameter69.Value":{"type":"string","description":"Parameter value"},"Parameter70.Name":{"type":"string","description":"Parameter name"},"Parameter70.Value":{"type":"string","description":"Parameter value"},"Parameter71.Name":{"type":"string","description":"Parameter name"},"Parameter71.Value":{"type":"string","description":"Parameter value"},"Parameter72.Name":{"type":"string","description":"Parameter name"},"Parameter72.Value":{"type":"string","description":"Parameter value"},"Parameter73.Name":{"type":"string","description":"Parameter name"},"Parameter73.Value":{"type":"string","description":"Parameter value"},"Parameter74.Name":{"type":"string","description":"Parameter name"},"Parameter74.Value":{"type":"string","description":"Parameter value"},"Parameter75.Name":{"type":"string","description":"Parameter name"},"Parameter75.Value":{"type":"string","description":"Parameter value"},"Parameter76.Name":{"type":"string","description":"Parameter name"},"Parameter76.Value":{"type":"string","description":"Parameter value"},"Parameter77.Name":{"type":"string","description":"Parameter name"},"Parameter77.Value":{"type":"string","description":"Parameter value"},"Parameter78.Name":{"type":"string","description":"Parameter name"},"Parameter78.Value":{"type":"string","description":"Parameter value"},"Parameter79.Name":{"type":"string","description":"Parameter name"},"Parameter79.Value":{"type":"string","description":"Parameter value"},"Parameter80.Name":{"type":"string","description":"Parameter name"},"Parameter80.Value":{"type":"string","description":"Parameter value"},"Parameter81.Name":{"type":"string","description":"Parameter name"},"Parameter81.Value":{"type":"string","description":"Parameter value"},"Parameter82.Name":{"type":"string","description":"Parameter name"},"Parameter82.Value":{"type":"string","description":"Parameter value"},"Parameter83.Name":{"type":"string","description":"Parameter name"},"Parameter83.Value":{"type":"string","description":"Parameter value"},"Parameter84.Name":{"type":"string","description":"Parameter name"},"Parameter84.Value":{"type":"string","description":"Parameter value"},"Parameter85.Name":{"type":"string","description":"Parameter name"},"Parameter85.Value":{"type":"string","description":"Parameter value"},"Parameter86.Name":{"type":"string","description":"Parameter name"},"Parameter86.Value":{"type":"string","description":"Parameter value"},"Parameter87.Name":{"type":"string","description":"Parameter name"},"Parameter87.Value":{"type":"string","description":"Parameter value"},"Parameter88.Name":{"type":"string","description":"Parameter name"},"Parameter88.Value":{"type":"string","description":"Parameter value"},"Parameter89.Name":{"type":"string","description":"Parameter name"},"Parameter89.Value":{"type":"string","description":"Parameter value"},"Parameter90.Name":{"type":"string","description":"Parameter name"},"Parameter90.Value":{"type":"string","description":"Parameter value"},"Parameter91.Name":{"type":"string","description":"Parameter name"},"Parameter91.Value":{"type":"string","description":"Parameter value"},"Parameter92.Name":{"type":"string","description":"Parameter name"},"Parameter92.Value":{"type":"string","description":"Parameter value"},"Parameter93.Name":{"type":"string","description":"Parameter name"},"Parameter93.Value":{"type":"string","description":"Parameter value"},"Parameter94.Name":{"type":"string","description":"Parameter name"},"Parameter94.Value":{"type":"string","description":"Parameter value"},"Parameter95.Name":{"type":"string","description":"Parameter name"},"Parameter95.Value":{"type":"string","description":"Parameter value"},"Parameter96.Name":{"type":"string","description":"Parameter name"},"Parameter96.Value":{"type":"string","description":"Parameter value"},"Parameter97.Name":{"type":"string","description":"Parameter name"},"Parameter97.Value":{"type":"string","description":"Parameter value"},"Parameter98.Name":{"type":"string","description":"Parameter name"},"Parameter98.Value":{"type":"string","description":"Parameter value"},"Parameter99.Name":{"type":"string","description":"Parameter name"},"Parameter99.Value":{"type":"string","description":"Parameter value"}}},"examples":{"createNoArgs":{"value":{"lang":"json","value":"{\n  \"Url\": \"myUrl\"\n}","meta":"","code":"{\n  \"Url\": \"myUrl\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Url\"","#7EE787"],[":","#C9D1D9"]," ",["\"myUrl\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"createWithArgs":{"value":{"lang":"json","value":"{\n  \"Name\": \"myName\",\n  \"Url\": \"myUrl\",\n  \"Track\": \"inbound_track\",\n  \"StatusCallback\": \"http://statuscallback.com\",\n  \"StatusCallbackMethod\": \"PUT\",\n  \"Parameter1.Name\": \"name1\",\n  \"Parameter1.Value\": \"value1\",\n  \"Parameter2.Name\": \"name2\",\n  \"Parameter2.Value\": \"value2\",\n  \"Parameter3.Name\": \"name3\",\n  \"Parameter3.Value\": \"value3\"\n}","meta":"","code":"{\n  \"Name\": \"myName\",\n  \"Url\": \"myUrl\",\n  \"Track\": \"inbound_track\",\n  \"StatusCallback\": \"http://statuscallback.com\",\n  \"StatusCallbackMethod\": \"PUT\",\n  \"Parameter1.Name\": \"name1\",\n  \"Parameter1.Value\": \"value1\",\n  \"Parameter2.Name\": \"name2\",\n  \"Parameter2.Value\": \"value2\",\n  \"Parameter3.Name\": \"name3\",\n  \"Parameter3.Value\": \"value3\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Name\"","#7EE787"],[":","#C9D1D9"]," ",["\"myName\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Url\"","#7EE787"],[":","#C9D1D9"]," ",["\"myUrl\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Track\"","#7EE787"],[":","#C9D1D9"]," ",["\"inbound_track\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallback\"","#7EE787"],[":","#C9D1D9"]," ",["\"http://statuscallback.com\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"StatusCallbackMethod\"","#7EE787"],[":","#C9D1D9"]," ",["\"PUT\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Parameter1.Name\"","#7EE787"],[":","#C9D1D9"]," ",["\"name1\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Parameter1.Value\"","#7EE787"],[":","#C9D1D9"]," ",["\"value1\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Parameter2.Name\"","#7EE787"],[":","#C9D1D9"]," ",["\"name2\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Parameter2.Value\"","#7EE787"],[":","#C9D1D9"]," ",["\"value2\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Parameter3.Name\"","#7EE787"],[":","#C9D1D9"]," ",["\"name3\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Parameter3.Value\"","#7EE787"],[":","#C9D1D9"]," ",["\"value3\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Create a Stream during a live call in order to start a new unidirectional media stream. Twilio sends the call's forked audio stream to the `url` specified in this request.

A sample request is shown below.

Create a unidirectional Stream on a live call

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createStream() {
  const stream = await client
    .calls("CAXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .streams.create({
      name: "My Media Stream",
      url: "wss://example.com/a-websocket-server",
    });

  console.log(stream.sid);
}

createStream();
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

stream = client.calls("CAXXXXXXXXXXXXXXXXXXXXXXXXXXX").streams.create(
    name="My Media Stream", url="wss://example.com/a-websocket-server"
)

print(stream.sid)
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

        var stream = await StreamResource.CreateAsync(
            name: "My Media Stream",
            url: new Uri("wss://example.com/a-websocket-server"),
            pathCallSid: "CAXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(stream.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.net.URI;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.call.Stream;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Stream stream =
            Stream.creator("CAXXXXXXXXXXXXXXXXXXXXXXXXXXX", URI.create("wss://example.com/a-websocket-server"))
                .setName("My Media Stream")
                .create();

        System.out.println(stream.getSid());
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

	params := &api.CreateStreamParams{}
	params.SetName("My Media Stream")
	params.SetUrl("wss://example.com/a-websocket-server")

	resp, err := client.Api.CreateStream("CAXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

$stream = $twilio->calls("CAXXXXXXXXXXXXXXXXXXXXXXXXXXX")->streams->create(
    "wss://example.com/a-websocket-server", // Url
    ["name" => "My Media Stream"]
);

print $stream->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

stream = @client
         .api
         .v2010
         .calls('CAXXXXXXXXXXXXXXXXXXXXXXXXXXX')
         .streams
         .create(
           name: 'My Media Stream',
           url: 'wss://example.com/a-websocket-server'
         )

puts stream.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:calls:streams:create \
   --call-sid CAXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --name "My Media Stream" \
   --url wss://example.com/a-websocket-server
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Calls/CAXXXXXXXXXXXXXXXXXXXXXXXXXXX/Streams.json" \
--data-urlencode "Name=My Media Stream" \
--data-urlencode "Url=wss://example.com/a-websocket-server" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "call_sid": "CAXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "sid": "MZaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "name": "My Media Stream",
  "status": "in-progress",
  "date_updated": "Thu, 30 Jul 2015 20:00:00 +0000",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Streams/MZaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

### Custom parameters

You can also create a unidirectional media stream with custom parameters.

Twilio sends these custom parameters to your WebSocket server in the `start` WebSocket message. Learn more on the [WebSocket Messages page](/docs/voice/media-streams/websocket-messages).

Use the `parameter[x].name` and `parameter[x].value` parameters to specify key-value pairs. For example, `parameter1.name` is the key and `parameter1.value` is the value of a key-value pair. You can provide up to 99 key-value pairs (`parameter99.name` and `parameter99.value`).

An example request is shown below.

Create a unidirectional Stream with custom parameters

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createStream() {
  const stream = await client
    .calls("CAXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .streams.create({
      name: "My Media Stream",
      "parameter1.name": "agent_name",
      "parameter1.value": "Mary",
      "parameter2.name": "Department",
      "parameter2.value": "sales",
      url: "wss://example.com/a-websocket-server",
    });

  console.log(stream.sid);
}

createStream();
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

stream = client.calls("CAXXXXXXXXXXXXXXXXXXXXXXXXXXXX").streams.create(
    name="My Media Stream",
    parameter1_name="agent_name",
    parameter1_value="Mary",
    parameter2_name="Department",
    parameter2_value="sales",
    url="wss://example.com/a-websocket-server",
)

print(stream.sid)
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

        var stream = await StreamResource.CreateAsync(
            name: "My Media Stream",
            parameter1Name: "agent_name",
            parameter1Value: "Mary",
            parameter2Name: "Department",
            parameter2Value: "sales",
            url: new Uri("wss://example.com/a-websocket-server"),
            pathCallSid: "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(stream.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.net.URI;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.call.Stream;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Stream stream =
            Stream.creator("CAXXXXXXXXXXXXXXXXXXXXXXXXXXXX", URI.create("wss://example.com/a-websocket-server"))
                .setName("My Media Stream")
                .setParameter1Name("agent_name")
                .setParameter1Value("Mary")
                .setParameter2Name("Department")
                .setParameter2Value("sales")
                .create();

        System.out.println(stream.getSid());
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

	params := &api.CreateStreamParams{}
	params.SetName("My Media Stream")
	params.SetParameter1Name("agent_name")
	params.SetParameter1Value("Mary")
	params.SetParameter2Name("Department")
	params.SetParameter2Value("sales")
	params.SetUrl("wss://example.com/a-websocket-server")

	resp, err := client.Api.CreateStream("CAXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

$stream = $twilio->calls("CAXXXXXXXXXXXXXXXXXXXXXXXXXXXX")->streams->create(
    "wss://example.com/a-websocket-server", // Url
    [
        "name" => "My Media Stream",
        "parameter1Name" => "agent_name",
        "parameter1Value" => "Mary",
        "parameter2Name" => "Department",
        "parameter2Value" => "sales",
    ]
);

print $stream->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

stream = @client
         .api
         .v2010
         .calls('CAXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
         .streams
         .create(
           name: 'My Media Stream',
           parameter1_name: 'agent_name',
           parameter1_value: 'Mary',
           parameter2_name: 'Department',
           parameter2_value: 'sales',
           url: 'wss://example.com/a-websocket-server'
         )

puts stream.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:calls:streams:create \
   --call-sid CAXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --name "My Media Stream" \
   --parameter1.name agent_name \
   --parameter1.value Mary \
   --parameter2.name Department \
   --parameter2.value sales \
   --url wss://example.com/a-websocket-server
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Calls/CAXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Streams.json" \
--data-urlencode "Name=My Media Stream" \
--data-urlencode "Parameter1.Name=agent_name" \
--data-urlencode "Parameter1.Value=Mary" \
--data-urlencode "Parameter2.Name=Department" \
--data-urlencode "Parameter2.Value=sales" \
--data-urlencode "Url=wss://example.com/a-websocket-server" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "call_sid": "CAXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "sid": "MZaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "name": "My Media Stream",
  "status": "in-progress",
  "date_updated": "Thu, 30 Jul 2015 20:00:00 +0000",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Streams/MZaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

## Stop a Stream

`POST https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Streams/{Sid}.json`

To stop a live unidirectional media stream, update the Stream subresource's `status` to `stopped`.

### Path parameters

```json
[{"name":"AccountSid","in":"path","description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created this Stream resource.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$"},"required":true},{"name":"CallSid","in":"path","description":"The SID of the [Call](https://www.twilio.com/docs/voice/api/call-resource) the Stream resource is associated with.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^CA[0-9a-fA-F]{32}$"},"required":true},{"name":"Sid","in":"path","description":"The SID or the `name` of the Stream resource to be stopped","schema":{"type":"string"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"UpdateStreamRequest","required":["Status"],"properties":{"Status":{"type":"string","enum":["stopped"],"refName":"stream_enum_update_status","modelName":"stream_enum_update_status"}}},"examples":{"updateBySid":{"value":{"lang":"json","value":"{\n  \"Status\": \"stopped\"\n}","meta":"","code":"{\n  \"Status\": \"stopped\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Status\"","#7EE787"],[":","#C9D1D9"]," ",["\"stopped\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}},"updateByName":{"value":{"lang":"json","value":"{\n  \"Status\": \"stopped\"\n}","meta":"","code":"{\n  \"Status\": \"stopped\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Status\"","#7EE787"],[":","#C9D1D9"]," ",["\"stopped\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

An example request is shown below.

Stop a unidirectional Stream

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateStream() {
  const stream = await client
    .calls("CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .streams("Sid")
    .update({ status: "stopped" });

  console.log(stream.sid);
}

updateStream();
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

stream = (
    client.calls("CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .streams("Sid")
    .update(status="stopped")
)

print(stream.sid)
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

        var stream = await StreamResource.UpdateAsync(
            status: StreamResource.UpdateStatusEnum.Stopped,
            pathCallSid: "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "Sid");

        Console.WriteLine(stream.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.call.Stream;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Stream stream =
            Stream.updater("CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "Sid", Stream.UpdateStatus.STOPPED).update();

        System.out.println(stream.getSid());
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

	params := &api.UpdateStreamParams{}
	params.SetStatus("stopped")

	resp, err := client.Api.UpdateStream("CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"Sid",
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

$stream = $twilio
    ->calls("CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->streams("Sid")
    ->update(
        "stopped" // Status
    );

print $stream->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

stream = @client
         .api
         .v2010
         .calls('CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
         .streams('Sid')
         .update(status: 'stopped')

puts stream.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:calls:streams:update \
   --call-sid CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid Sid \
   --status stopped
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Streams/Sid.json" \
--data-urlencode "Status=stopped" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "call_sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "Sid",
  "name": null,
  "status": "stopped",
  "date_updated": "Thu, 30 Jul 2015 20:00:00 +0000",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Streams/MZaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

You can also use the Stream `name` (if provided when creating the Stream) to stop the Stream. The example below shows how to stop a Stream with a `name` of `myStream`.

Stop a unidirectional Stream by name

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateStream() {
  const stream = await client
    .calls("CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .streams("myStream")
    .update({ status: "stopped" });

  console.log(stream.sid);
}

updateStream();
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

stream = (
    client.calls("CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .streams("myStream")
    .update(status="stopped")
)

print(stream.sid)
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

        var stream = await StreamResource.UpdateAsync(
            status: StreamResource.UpdateStatusEnum.Stopped,
            pathCallSid: "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSid: "myStream");

        Console.WriteLine(stream.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.call.Stream;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Stream stream =
            Stream.updater("CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "myStream", Stream.UpdateStatus.STOPPED).update();

        System.out.println(stream.getSid());
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

	params := &api.UpdateStreamParams{}
	params.SetStatus("stopped")

	resp, err := client.Api.UpdateStream("CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"myStream",
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

$stream = $twilio
    ->calls("CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->streams("myStream")
    ->update(
        "stopped" // Status
    );

print $stream->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

stream = @client
         .api
         .v2010
         .calls('CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
         .streams('myStream')
         .update(status: 'stopped')

puts stream.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:calls:streams:update \
   --call-sid CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid myStream \
   --status stopped
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Streams/myStream.json" \
--data-urlencode "Status=stopped" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "call_sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "myStream",
  "name": "myStream",
  "status": "stopped",
  "date_updated": "Thu, 30 Jul 2015 20:00:00 +0000",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Streams/MZaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```
