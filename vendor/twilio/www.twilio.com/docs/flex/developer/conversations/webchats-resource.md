# WebChats Resource

Flex Webchats is an endpoint that simplifies orchestrating a Conversation for a guest user: It creates a conversation, adds a randomly generated user identity to this conversation, and configures the Conversation based on the Address SID you provide. To get started with this endpoint, please refer to the [web chat React-based demo app](https://github.com/twilio/twilio-webchat-react-app).

> \[!NOTE]
>
> [Webchat 3.0](/docs/flex/developer/conversations/webchat) (currently in Public Beta) provides a secure way to add a Twilio-hosted chat widget to your website. Before deciding to use the Webchat React App, you may want to consider using Webchat 3.0. For a comparison between these apps, see [Migrate to Webchat 3.0](/docs/flex/developer/conversations/webchat/migrate).

## WebChat Properties

<OperationTable type="properties" data={{"type":"object","refName":"flex.v2.web_channel","modelName":"flex_v2_web_channel","properties":{"conversation_sid":{"type":"string","minLength":34,"maxLength":34,"pattern":"^CH[0-9a-fA-F]{32}$","nullable":true,"description":"The unique string representing the [Conversation resource](https://www.twilio.com/docs/conversations/api/conversation-resource) created."},"identity":{"type":"string","nullable":true,"description":"The unique string representing the User created and should be authorized to participate in the Conversation. For more details, see [User Identity & Access Tokens](https://www.twilio.com/docs/conversations/identity).","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}}}}} />

## Create a WebChannel resource

`POST https://flex-api.twilio.com/v2/WebChats`

### Headers

```json
[{"name":"Ui-Version","in":"header","description":"The Ui-Version HTTP request header","schema":{"type":"string"}}]
```

### Request body parameters

```json
{"schema":{"type":"object","title":"CreateWebChannelRequest","required":["AddressSid"],"properties":{"AddressSid":{"type":"string","description":"The SID of the Conversations Address. See [Address Configuration Resource](https://www.twilio.com/docs/conversations/api/address-configuration-resource) for configuration details. When a conversation is created on the Flex backend, the callback URL will be set to the corresponding Studio Flow SID or webhook URL in your address configuration."},"ChatFriendlyName":{"type":"string","description":"The Conversation's friendly name. See the [Conversation resource](https://www.twilio.com/docs/conversations/api/conversation-resource) for an example."},"CustomerFriendlyName":{"type":"string","description":"The Conversation participant's friendly name. See the [Conversation Participant Resource](https://www.twilio.com/docs/conversations/api/conversation-participant-resource) for an example."},"PreEngagementData":{"type":"string","description":"The pre-engagement data."},"Identity":{"type":"string","description":"The Identity of the guest user. See the [Conversation User Resource](https://www.twilio.com/docs/conversations/api/user-resource) for an example.","x-twilio":{"pii":{"handling":"standard","deleteSla":30}}}}},"examples":{"create":{"value":{"lang":"json","value":"{\n  \"AddressSid\": \"IGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"ChatFriendlyName\": \"LoquaciousLarry\",\n  \"CustomerFriendlyName\": \"LarryDavid\",\n  \"Identity\": \"seinfeld\"\n}","meta":"","code":"{\n  \"AddressSid\": \"IGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\",\n  \"ChatFriendlyName\": \"LoquaciousLarry\",\n  \"CustomerFriendlyName\": \"LarryDavid\",\n  \"Identity\": \"seinfeld\"\n}","tokens":[["{","#C9D1D9"],"\n  ",["\"AddressSid\"","#7EE787"],[":","#C9D1D9"]," ",["\"IGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"ChatFriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"LoquaciousLarry\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"CustomerFriendlyName\"","#7EE787"],[":","#C9D1D9"]," ",["\"LarryDavid\"","#A5D6FF"],[",","#C9D1D9"],"\n  ",["\"Identity\"","#7EE787"],[":","#C9D1D9"]," ",["\"seinfeld\"","#A5D6FF"],"\n",["}","#C9D1D9"]],"annotations":[],"themeName":"github-dark","style":{"color":"#c9d1d9","background":"#0d1117"}}}},"encodingType":"application/x-www-form-urlencoded","conditionalParameterMap":{}}
```

Create a Web Channel

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createWebChannel() {
  const webChannel = await client.flexApi.v2.webChannels.create({
    addressSid: "IGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    chatFriendlyName: "Customer Support",
    customerFriendlyName: "Alice",
  });

  console.log(webChannel.conversationSid);
}

createWebChannel();
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

web_channel = client.flex_api.v2.web_channels.create(
    address_sid="IGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    chat_friendly_name="Customer Support",
    customer_friendly_name="Alice",
)

print(web_channel.conversation_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.FlexApi.V2;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var webChannels = await WebChannelsResource.CreateAsync(
            addressSid: "IGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            chatFriendlyName: "Customer Support",
            customerFriendlyName: "Alice");

        Console.WriteLine(webChannels.ConversationSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.flexapi.v2.WebChannels;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        WebChannels webChannels = WebChannels.creator("IGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                                      .setChatFriendlyName("Customer Support")
                                      .setCustomerFriendlyName("Alice")
                                      .create();

        System.out.println(webChannels.getConversationSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	flex "github.com/twilio/twilio-go/rest/flex/v2"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &flex.CreateWebChannelParams{}
	params.SetAddressSid("IGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
	params.SetChatFriendlyName("Customer Support")
	params.SetCustomerFriendlyName("Alice")

	resp, err := client.FlexV2.CreateWebChannel(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.ConversationSid != nil {
			fmt.Println(*resp.ConversationSid)
		} else {
			fmt.Println(resp.ConversationSid)
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

$web_channel = $twilio->flexApi->v2->webChannels->create(
    "IGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", // AddressSid
    [
        "chatFriendlyName" => "Customer Support",
        "customerFriendlyName" => "Alice",
    ]
);

print $web_channel->conversationSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

web_channel = @client
              .flex_api
              .v2
              .web_channels
              .create(
                address_sid: 'IGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                chat_friendly_name: 'Customer Support',
                customer_friendly_name: 'Alice'
              )

puts web_channel.conversation_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:flex:v2:web-chats:create \
   --address-sid IGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --chat-friendly-name "Customer Support" \
   --customer-friendly-name Alice
```

```bash
curl -X POST "https://flex-api.twilio.com/v2/WebChats" \
--data-urlencode "AddressSid=IGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
--data-urlencode "ChatFriendlyName=Customer Support" \
--data-urlencode "CustomerFriendlyName=Alice" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "conversation_sid": "CHaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "identity": "seinfeld"
}
```
