# Sending Messages

> \[!IMPORTANT]
>
> Twilio's Proxy API is currently available as a Public Beta product. Some features are not yet implemented and others may be changed before the product is declared as Generally Available.
>
> Public Beta products are [not covered by a Twilio SLA](https://help.twilio.com/hc/en-us/articles/115002413087-Twilio-Beta-product-support).

We can send text messages through the Proxy API by creating a Message [Interaction](/docs/proxy/api/interaction) on a [Participant](/docs/proxy/api/participant). The referenced Participant will receive the message from their allocated proxy number on the appropriate channel.

**Note:** Only `POST` (create) is available on Message Interactions. To query past messages you've created with this resource, query the [Interaction](/docs/proxy/api/interaction) resource.

## MessageInteraction Properties

<OperationTable type="properties" data={{"type":"object","refName":"proxy.v1.service.session.participant.message_interaction","modelName":"proxy_v1_service_session_participant_message_interaction","properties":{"sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KI[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string that we created to identify the MessageInteraction resource."},"session_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the parent [Session](https://www.twilio.com/docs/proxy/api/session) resource."},"service_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KS[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the parent [Service](https://www.twilio.com/docs/proxy/api/service) resource."},"account_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^AC[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Account](https://www.twilio.com/docs/iam/api/account) that created the MessageInteraction resource."},"data":{"type":"string","nullable":true,"description":"A JSON string that includes the message body sent to the participant. (e.g. `{\"body\": \"hello\"}`)","x-twilio":{"pii":{"handling":"sensitive","deleteSla":30}}},"type":{"type":"string","enum":["message","voice","unknown"],"description":"The Type of Message Interaction. This value is always `message`.","refName":"message_interaction_enum_type","modelName":"message_interaction_enum_type"},"participant_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KP[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the [Participant](https://www.twilio.com/docs/proxy/api/participant) resource."},"inbound_participant_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KP[0-9a-fA-F]{32}$","nullable":true,"description":"Always empty for created Message Interactions."},"inbound_resource_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^[a-zA-Z]{2}[0-9a-fA-F]{32}$","nullable":true,"description":"Always empty for created Message Interactions."},"inbound_resource_status":{"type":"string","enum":["accepted","answered","busy","canceled","completed","deleted","delivered","delivery-unknown","failed","in-progress","initiated","no-answer","queued","received","receiving","ringing","scheduled","sending","sent","undelivered","unknown"],"description":"Always empty for created Message Interactions.","refName":"message_interaction_enum_resource_status","modelName":"message_interaction_enum_resource_status"},"inbound_resource_type":{"type":"string","nullable":true,"description":"Always empty for created Message Interactions."},"inbound_resource_url":{"type":"string","format":"uri","nullable":true,"description":"Always empty for created Message Interactions."},"outbound_participant_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KP[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the outbound [Participant](https://www.twilio.com/docs/proxy/api/participant) resource."},"outbound_resource_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^[a-zA-Z]{2}[0-9a-fA-F]{32}$","nullable":true,"description":"The SID of the outbound [Message](https://www.twilio.com/docs/sms/api/message-resource) resource."},"outbound_resource_status":{"type":"string","enum":["accepted","answered","busy","canceled","completed","deleted","delivered","delivery-unknown","failed","in-progress","initiated","no-answer","queued","received","receiving","ringing","scheduled","sending","sent","undelivered","unknown"],"description":"Always empty for created Message Interactions.","refName":"message_interaction_enum_resource_status","modelName":"message_interaction_enum_resource_status"},"outbound_resource_type":{"type":"string","nullable":true,"description":"The outbound resource type. This value is always `Message`."},"outbound_resource_url":{"type":"string","format":"uri","nullable":true,"description":"The URL of the Twilio message resource."},"date_created":{"type":"string","format":"date-time","nullable":true,"description":"The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date and time in GMT when the resource was created."},"date_updated":{"type":"string","format":"date-time","nullable":true,"description":"The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date and time in GMT when the resource was last updated."},"url":{"type":"string","format":"uri","nullable":true,"description":"The absolute URL of the MessageInteraction resource."}}}} />

## Create a MessageInteraction resource

`POST https://proxy.twilio.com/v1/Services/{ServiceSid}/Sessions/{SessionSid}/Participants/{ParticipantSid}/MessageInteractions`

### Path parameters

```json
[{"name":"ServiceSid","in":"path","description":"The SID of the parent [Service](https://www.twilio.com/docs/proxy/api/service) resource.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KS[0-9a-fA-F]{32}$"},"required":true},{"name":"SessionSid","in":"path","description":"The SID of the parent [Session](https://www.twilio.com/docs/proxy/api/session) resource.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KC[0-9a-fA-F]{32}$"},"required":true},{"name":"ParticipantSid","in":"path","description":"The SID of the [Participant](https://www.twilio.com/docs/proxy/api/participant) resource.","schema":{"type":"string","minLength":34,"maxLength":34,"pattern":"^KP[0-9a-fA-F]{32}$"},"required":true}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"CreateMessageInteractionRequest","properties":{"Body":{"type":"string","description":"The message to send to the participant"},"MediaUrl":{"type":"array","description":"Reserved. Not currently supported.","items":{"type":"string","format":"uri","x-twilio":{"ignoreFormat":true}}}}},"examples":{"create":{"value":{"lang":"json","value":"{\n  \"Body\": \"some message\"\n}","meta":"","code":"{\n  \"Body\": \"some message\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"Body\"","#7EE787"],[":","#C9D1D9"]," ",["\"some message\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{"Body":["MediaUrl"],"MediaUrl":["Body"]}}
```

Create a new message Interaction to send directly from your system to one [Participant](https://www.twilio.com/docs/proxy/api/participant).  The \`inbound\` properties for the Interaction will always be empty

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createMessageInteraction() {
  const messageInteraction = await client.proxy.v1
    .services("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .sessions("KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .participants("KPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .messageInteractions.create({
      body: "This will be the body of the new message!",
    });

  console.log(messageInteraction.sid);
}

createMessageInteraction();
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

message_interaction = (
    client.proxy.v1.services("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .sessions("KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .participants("KPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .message_interactions.create(
        body="This will be the body of the new message!"
    )
)

print(message_interaction.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Proxy.V1.Service.Session.Participant;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var messageInteraction = await MessageInteractionResource.CreateAsync(
            body: "This will be the body of the new message!",
            pathServiceSid: "KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathSessionSid: "KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathParticipantSid: "KPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(messageInteraction.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.proxy.v1.service.session.participant.MessageInteraction;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        MessageInteraction messageInteraction = MessageInteraction
                                                    .creator("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                                                        "KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                                                        "KPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                                                        "This will be the body of the new message!")
                                                    .create();

        System.out.println(messageInteraction.getSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	proxy "github.com/twilio/twilio-go/rest/proxy/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &proxy.CreateMessageInteractionParams{}
	params.SetBody("This will be the body of the new message!")

	resp, err := client.ProxyV1.CreateMessageInteraction("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		"KPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$message_interaction = $twilio->proxy->v1
    ->services("KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->sessions("KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->participants("KPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->messageInteractions->create([
        "body" => "This will be the body of the new message!",
    ]);

print $message_interaction->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

message_interaction = @client
                      .proxy
                      .v1
                      .services('KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                      .sessions('KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                      .participants('KPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                      .message_interactions
                      .create(body: 'This will be the body of the new message!')

puts message_interaction.sid
```

```bash
EXCLAMATION_MARK='!'
# Install the twilio-cli from https://twil.io/cli

twilio api:proxy:v1:services:sessions:participants:message-interactions:create \
   --service-sid KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --session-sid KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --participant-sid KPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --body "This will be the body of the new message$EXCLAMATION_MARK"
```

```bash
EXCLAMATION_MARK='!'
curl -X POST "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions/KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/KPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/MessageInteractions" \
--data-urlencode "Body=This will be the body of the new message$EXCLAMATION_MARK" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "service_sid": "KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "data": "{\"body\":\"some message\"}",
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "participant_sid": "KPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "inbound_participant_sid": null,
  "inbound_resource_sid": null,
  "inbound_resource_status": null,
  "inbound_resource_type": null,
  "inbound_resource_url": null,
  "outbound_participant_sid": "KPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "outbound_resource_sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "outbound_resource_status": "sent",
  "outbound_resource_type": "Message",
  "outbound_resource_url": null,
  "sid": "KIaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "type": "message",
  "url": "https://proxy.twilio.com/v1/Services/KSaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Sessions/KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/KPaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/MessageInteractions/KIaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "session_sid": "KCaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```
