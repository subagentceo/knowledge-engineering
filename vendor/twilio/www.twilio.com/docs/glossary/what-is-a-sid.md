# What is a String Identifier (SID)?

A unique key string that Twilio uses to identify specific resources.

Twilio identifies every resource with a 34-character String Identifier (SID). This SID consists of a two-letter prefix followed by 32 hexadecimal digits. You can use the first two characters of the SID to identify its type. The following table includes many of the common prefixes for SIDs. Most API reference pages include multiple SIDs in their list of properties.

***

Prefix: AC
Component: Account

***

Prefix: AD
Component: Physical Address

***

Prefix: AI
Component: AlphaSender

***

Prefix: AL
Component: Access List

***

Prefix: AP
Component: Application

***

Prefix: BN
Component: Brand

***

Prefix: BU
Component: Regulatory Bundle

***

Prefix: CA
Component: Call

***

Prefix: CF
Component: Conference

***

Prefix: CH
Component: Conversation

***

Prefix: CL
Component: Credential List

***

Prefix: CN
Component: Connection

***

Prefix: CP
Component: Conference Participant

***

Prefix: CR
Component: Credential

***

Prefix: DG
Component: Event Sink

***

Prefix: DN
Component: Domain

***

Prefix: ES
Component: Sync List

***

Prefix: EY
Component: Operator Type

***

Prefix: FJ
Component: Flex Plugin Service Release

***

Prefix: FN
Component: Flex Context Execution Resource

***

Prefix: FT
Component: Flex Step

***

Prefix: FW
Component: Flex Workflow

***

Prefix: GA
Component: Conversational Intelligence Service

***

Prefix: GT
Component: Intelligence Service

***

Prefix: HH
Component: Tollfree Number Verification

***

Prefix: HJ
Component: Verification Service

***

Prefix: HX
Component: Message Content

***

Prefix: IG
Component: Conversations Address Configuration

***

Prefix: IM
Component: Chat Message

***

Prefix: IP
Component: SIP IP Address

***

Prefix: IS
Component: Chat Service

***

Prefix: IT
Component: Twilio End User

***

Prefix: KC
Component: Phone Number Proxy Session

***

Prefix: KD
Component: Flex Interaction Resource

***

Prefix: KP
Component: Phone Number Proxy Participant

***

Prefix: KS
Component: Phone Number Proxy

***

Prefix: MB
Component: Chat Member

***

Prefix: ME
Component: Media

***

Prefix: MG
Component: Messaging Service

***

Prefix: MM
Component: Message

***

Prefix: NO
Component: Notification

***

Prefix: PA
Component: Recording Grouping

***

Prefix: PN
Component: Phone Number

***

Prefix: QE
Component: Association with External Campaign

***

Prefix: RD
Component: Regulatory Supporting Document

***

Prefix: RE
Component: Recording

***

Prefix: RL
Component: Role

***

Prefix: RM
Component: Room

***

Prefix: RN
Component: Regulatory Policy Number

***

Prefix: RT
Component: Recording Track

***

Prefix: SC
Component: Shortcode

***

Prefix: SD
Component: SIP Domain

***

Prefix: SK
Component: API Key

***

Prefix: SM
Component: Message

***

Prefix: TR
Component: Transcription

***

Prefix: UO
Component: Flex Interaction Channel

***

Prefix: US
Component: User

***

Prefix: UT
Component: Flex Interaction Channel Participant

***

Prefix: VA
Component: Service Attempting Verification

***

Prefix: VE
Component: Verification Check

***

Prefix: VL
Component: Verification Attempt

***

Prefix: VT
Component: Vetting Record

***

Prefix: WA
Component: TaskRouter Assignment Activity

***

Prefix: WQ
Component: TaskRouter Task Assignment Activity

***

Prefix: WS
Component: TaskRouter Workspace

***

Prefix: WT
Component: TaskRouter Workspace Task

***

Prefix: WW
Component: TaskRouter Workflow

***

Prefix: XB
Component: Marketplace Listing

***

Prefix: XE
Component: WhatsApp Sender

***

Prefix: YF
Component: Verification Factor

***

Prefix: ZB
Component: Serverless Build

***

## Examples of SIDs in API requests

Many API requests to Twilio include a resource SID in their response. To fetch information about that resource, search for and use this SID.

The following example creates an SMS message:

Create a new text message

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createMessage() {
  const message = await client.messages.create({
    body: "This will be the body of the new message!",
    from: "+14155552344",
    to: "alex@example.com",
  });

  console.log(message.sid);
}

createMessage();
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

message = client.messages.create(
    to="alex@example.com",
    from_="+14155552344",
    body="This will be the body of the new message!",
)

print(message.sid)
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

        var message = await MessageResource.CreateAsync(
            to: new Twilio.Types.PhoneNumber("alex@example.com"),
            from: new Twilio.Types.PhoneNumber("+14155552344"),
            body: "This will be the body of the new message!");

        Console.WriteLine(message.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.type.PhoneNumber;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Message message = Message
                              .creator(new com.twilio.type.PhoneNumber("alex@example.com"),
                                  new com.twilio.type.PhoneNumber("+14155552344"),
                                  "This will be the body of the new message!")
                              .create();

        System.out.println(message.getSid());
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

	params := &api.CreateMessageParams{}
	params.SetTo("alex@example.com")
	params.SetFrom("+14155552344")
	params.SetBody("This will be the body of the new message!")

	resp, err := client.Api.CreateMessage(params)
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

$message = $twilio->messages->create(
    "alex@example.com", // To
    [
        "from" => "+14155552344",
        "body" => "This will be the body of the new message!",
    ]
);

print $message->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

message = @client
          .api
          .v2010
          .messages
          .create(
            to: 'alex@example.com',
            from: '+14155552344',
            body: 'This will be the body of the new message!'
          )

puts message.sid
```

```bash
EXCLAMATION_MARK='!'
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:create \
   --to alex@example.com \
   --from +14155552344 \
   --body "This will be the body of the new message$EXCLAMATION_MARK"
```

```bash
EXCLAMATION_MARK='!'
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json" \
--data-urlencode "To=alex@example.com" \
--data-urlencode "From=+14155552344" \
--data-urlencode "Body=This will be the body of the new message$EXCLAMATION_MARK" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "api_version": "2010-04-01",
  "body": "This will be the body of the new message!",
  "date_created": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_sent": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_updated": "Thu, 24 Aug 2023 05:01:45 +0000",
  "direction": "outbound-api",
  "error_code": null,
  "error_message": null,
  "from": "+14155552344",
  "num_media": "0",
  "num_segments": "1",
  "price": null,
  "price_unit": null,
  "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "queued",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media.json"
  },
  "to": "alex@example.com",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

The JSON response to this API request from Twilio returns a property labeled `sid`. To retrieve this specific message, use the message SID with the `SM` prefix. This second call returns data about that specific resource.

Fetch a Message by SID

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchMessage() {
  const message = await client
    .messages("SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch();

  console.log(message.status);
}

fetchMessage();
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

message = client.messages("SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").fetch()

print(message.status)
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

        var message =
            await MessageResource.FetchAsync(pathSid: "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(message.Status);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Message message = Message.fetcher("SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").fetch();

        System.out.println(message.getStatus());
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

	params := &api.FetchMessageParams{}

	resp, err := client.Api.FetchMessage("SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Status != nil {
			fmt.Println(resp.Status)
		} else {
			fmt.Println(resp.Status)
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

$message = $twilio->messages("SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")->fetch();

print $message->status;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

message = @client
          .api
          .v2010
          .messages('SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
          .fetch

puts message.status
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:fetch \
   --sid SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "api_version": "2010-04-01",
  "body": "testing",
  "date_created": "Fri, 24 May 2019 17:18:27 +0000",
  "date_sent": "Fri, 24 May 2019 17:18:28 +0000",
  "date_updated": "Fri, 24 May 2019 17:18:28 +0000",
  "direction": "outbound-api",
  "error_code": 30007,
  "error_message": "Carrier violation",
  "from": "+12019235161",
  "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "num_media": "0",
  "num_segments": "1",
  "price": "-0.00750",
  "price_unit": "USD",
  "sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "sent",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMb7c0a2ce80504485a6f653a7110836f5/Media.json",
    "feedback": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMb7c0a2ce80504485a6f653a7110836f5/Feedback.json"
  },
  "to": "+18182008801",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMb7c0a2ce80504485a6f653a7110836f5.json"
}
```
