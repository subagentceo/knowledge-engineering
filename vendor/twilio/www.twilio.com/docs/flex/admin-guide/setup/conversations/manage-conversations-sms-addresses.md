# Manage Conversations SMS Addresses

> \[!NOTE]
>
> Flex Conversations requires Flex UI 2.0. If you are on Flex UI 1.x, please refer to [Chat and Messaging](/docs/flex/admin-guide/core-concepts/chat-and-messaging) pages.

> \[!NOTE]
>
> This guide requires Flex UI 2.0. If you are on Flex UI 1.x, refer to [Handle an SMS contact with Legacy-based Messaging](/docs/flex/admin-guide/tutorials/sms-setup).

Flex uses Addresses to describe how new Conversations are handled and connected to Flex. Conversations Addresses inform the Conversation Service to auto-create a new Conversation for messages that don't belong to an existing Conversation. Once a Conversation is created, all new messages from the same source to the same destination are routed to the newly created Conversation.

The simplest (and the default) way to route incoming SMS messages for a Phone Number into Flex is to:

* Buy a Phone Number
* Create a Conversations Address for the Phone Number via the [Flex Console](#using-flex-console) or [the API](#using-the-conversations-api)
* Set the Flex integration on the Address to [use the Studio Flow](/docs/flex/admin-guide/setup/conversations/prerequisites#create-a-studio-flow-for-conversations) you created earlier

Follow these steps to set up a new SMS Address with the aforementioned configuration via the Flex Console.

## Buy a Phone Number

If you haven't purchased an SMS-enabled Phone Number yet, or would like to configure a new one, navigate to Phone Numbers > Manage > [Buy a number](https://www.twilio.com/console/phone-numbers/search).

## Configure your Phone Number for the SMS channel

Under **Phone Numbers > Manage >** [**Active numbers**](https://www.twilio.com/console/phone-numbers/incoming), find the number you want to configure and open it.

For correct operation, make sure your Phone Number Messaging is configured as follows (this should also be the default state):

* Make sure no Messaging Service is selected in the dropdown. If there is one configured, remove it. (For advanced configuration with Messaging Service [refer here](/docs/flex/admin-guide/setup/conversations/configure-with-messaging-service-advanced).)
* Make sure the "A message comes in" webhook handler is set to blank (""). The default handler will respond with a default message for every inbound SMS which is not desired.

![Messaging configuration with routing active for US1 region, using Webhook and HTTP POST.](https://docs-resources.prod.twilio.com/4d4c84a8039386b3d37cab4cb1e1627b33377581eca2e97527560b293180e18e.png)

*Phone Number configuration for Flex Conversations*

> \[!WARNING]
>
> If you specify a webhook handler for "A message comes in", it will be executed in parallel to executing the auto-creation functionality defined in the Conversation address. This is most probably undesired for production accounts. Unless you have an advanced use case and know what you're doing, we recommend that you **leave the webhook handler blank**.

## Create an SMS Address for your Phone Number

### Using Flex Console

To create an Address for your new Phone Number:

1. Navigate to Flex Console > Manage > [Messaging](https://console.twilio.com/us1/develop/flex/channels/messaging/conversations). Select the **SMS Numbers** tab. (Alternatively you can click **"+ Create new SMS Address**" on the Addresses tab, and search for your Phone Number on the Create Address form).

   ![SMS Numbers tab showing a list of phone numbers with options to create new SMS addresses.](https://docs-resources.prod.twilio.com/9ea4eb81bed1c872202eab64601252785147fcc832a5f6846fedca951fd71988.png)
2. Search for or click "+ Create new SMS Address" in the **Status** field of your unregistered Phone Number. Previously configured Phone Numbers will have an "Address created" indicator.
3. You can optionally enter a friendly name.
4. Configure the integration to Flex - either by using **Studio Flow** you created earlier or your own endpoint URL for the **webhook**. To learn more about configuring Studio Flows, see [Configure pre-agent workflow with Studio.](/docs/flex/admin-guide/setup/configure-pre-agent-workflow-with-studio)
5. Click **Submit** to save your new Flex SMS Address.

You can create, edit or delete Flex SMS Addresses at any point using the Console.

### Using the Conversations API

The Conversations API's Address Configuration Resource allows you to create and manage SMS addresses for your Twilio account. On address creation, you can specify autocreation of a Conversation upon receipt of an inbound message. The following example shows you the programmatic version of our [Console example](#using-flex-console) using the Studio flow integration with a retry count. To learn more about the different resource properties, see [Address Configuration Resource](/docs/conversations-classic/api/address-configuration-resource).

Create an SMS Address via the API

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createConfigurationAddress() {
  const addressConfiguration =
    await client.conversations.v1.addressConfigurations.create({
      address: "+13115552368",
      "autoCreation.enabled": true,
      "autoCreation.studioFlowSid": "FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "autoCreation.studioRetryCount": 3,
      "autoCreation.type": "studio",
      type: "sms",
    });

  console.log(addressConfiguration.sid);
}

createConfigurationAddress();
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

address_configuration = client.conversations.v1.address_configurations.create(
    type="sms",
    address="+13115552368",
    auto_creation_enabled=True,
    auto_creation_type="studio",
    auto_creation_studio_flow_sid="FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    auto_creation_studio_retry_count=3,
)

print(address_configuration.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Conversations.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var addressConfiguration = await AddressConfigurationResource.CreateAsync(
            type: AddressConfigurationResource.TypeEnum.Sms,
            address: "+13115552368",
            autoCreationEnabled: true,
            autoCreationType: AddressConfigurationResource.AutoCreationTypeEnum.Studio,
            autoCreationStudioFlowSid: "FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            autoCreationStudioRetryCount: 3);

        Console.WriteLine(addressConfiguration.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.conversations.v1.AddressConfiguration;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        AddressConfiguration addressConfiguration =
            AddressConfiguration.creator(AddressConfiguration.Type.SMS, "+13115552368")
                .setAutoCreationEnabled(true)
                .setAutoCreationType(AddressConfiguration.AutoCreationType.STUDIO)
                .setAutoCreationStudioFlowSid("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                .setAutoCreationStudioRetryCount(3)
                .create();

        System.out.println(addressConfiguration.getSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	conversations "github.com/twilio/twilio-go/rest/conversations/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &conversations.CreateConfigurationAddressParams{}
	params.SetType("sms")
	params.SetAddress("+13115552368")
	params.SetAutoCreationEnabled(true)
	params.SetAutoCreationType("studio")
	params.SetAutoCreationStudioFlowSid("FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
	params.SetAutoCreationStudioRetryCount(3)

	resp, err := client.ConversationsV1.CreateConfigurationAddress(params)
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

$address_configuration = $twilio->conversations->v1->addressConfigurations->create(
    "sms", // Type
    "+13115552368", // Address
    [
        "autoCreationEnabled" => true,
        "autoCreationType" => "studio",
        "autoCreationStudioFlowSid" => "FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "autoCreationStudioRetryCount" => 3,
    ]
);

print $address_configuration->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

address_configuration = @client
                        .conversations
                        .v1
                        .address_configurations
                        .create(
                          type: 'sms',
                          address: '+13115552368',
                          auto_creation_enabled: true,
                          auto_creation_type: 'studio',
                          auto_creation_studio_flow_sid: 'FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                          auto_creation_studio_retry_count: 3
                        )

puts address_configuration.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:conversations:v1:configuration:addresses:create \
   --type sms \
   --address +13115552368 \
   --auto-creation.enabled \
   --auto-creation.type studio \
   --auto-creation.studio-flow-sid FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --auto-creation.studio-retry-count 3
```

```bash
curl -X POST "https://conversations.twilio.com/v1/Configuration/Addresses" \
--data-urlencode "Type=sms" \
--data-urlencode "Address=+13115552368" \
--data-urlencode "AutoCreation.Enabled=true" \
--data-urlencode "AutoCreation.Type=studio" \
--data-urlencode "AutoCreation.StudioFlowSid=FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
--data-urlencode "AutoCreation.StudioRetryCount=3" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "IGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "address": "+13115552368",
  "type": "sms",
  "friendly_name": "My Test Configuration",
  "address_country": "CA",
  "auto_creation": {
    "enabled": true,
    "type": "webhook",
    "conversation_service_sid": "ISaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    "webhook_url": "https://example.com",
    "webhook_method": "POST",
    "webhook_filters": [
      "onParticipantAdded",
      "onMessageAdded"
    ]
  },
  "date_created": "2016-03-24T21:05:50Z",
  "date_updated": "2016-03-24T21:05:50Z",
  "url": "https://conversations.twilio.com/v1/Configuration/Addresses/IGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

For deleting an SMS address via the API, see [Delete Address Configuration](/docs/conversations-classic/api/address-configuration-resource#delete-an-addressconfiguration-resource).

## Send your first SMS

You are now ready to try your SMS channel:

1. Go to **Flex** > [**Overview**](https://console.twilio.com/us1/develop/flex/overview?frameUrl=%2Fconsole%2Fflex%2Foverview%3Fx-target-region%3Dus1) and click **Launch Flex**.
2. Log in and change your activity to **Active**
3. From your mobile phone, send an SMS to the number you just configured
4. The Flex UI will display a new task which you can accept to view the inbound message

## Under the hood: Conversations

![Flowchart showing customer messages through Conversations, Twilio Studio, Flex Interactions, and TaskRouter to an agent.](https://docs-resources.prod.twilio.com/7d350c8a02df1f5e0914dfaaa9237e36c35d06ea37d4c64800cfebc7a69d1367.png)

Under the hood, Flex uses Conversations to send the messages back and forth between the end-customer and the agent. If a Conversations Address is created for a Phone Number (with autocreation set to true), that Address's configuration will be used to handle new inbound messages to that Phone Number.

The Phone Number's "A message comes in" handler isn't used when this Phone Number has a Conversations Address where `autocreation` is set to `true`.
