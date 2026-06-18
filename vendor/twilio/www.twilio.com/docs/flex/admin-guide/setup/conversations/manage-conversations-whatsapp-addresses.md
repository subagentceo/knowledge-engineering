# Manage Conversations WhatsApp Addresses

> \[!NOTE]
>
> Flex Conversations requires Flex UI 2.0. If you are on Flex UI 1.x, please refer to [Chat and Messaging](/docs/flex/admin-guide/core-concepts/chat-and-messaging) pages.

Connect your WhatsApp sender number to Flex Conversations by following one of the two approaches outlined below. For numbers already registered with WhatsApp, use the [Create a WhatsApp address via Flex Console](#create-a-whatsapp-address) instructions. For numbers using the WhatsApp sandbox, use the [Configuring WhatsApp Sandbox](#configuring-whatsapp-sandbox) instructions.

## Create a WhatsApp Address

To create a Conversations Address for WhatsApp, you need to have a WhatsApp sender registered on your Twilio account. This is unfortunately not a quick process and includes registration and vetting on the WhatsApp side. For testing using the WhatsApp Sandbox, [see the next step](/docs/flex/admin-guide/setup/conversations/manage-conversations-whatsapp-addresses#configuring-whatsapp-sandbox). You can create a WhatsApp Conversations Address via the Flex Console or [via the API](#using-the-conversations-api).

## Using Flex Console

To get started, navigate to [Messaging > Senders > WhatsApp senders](https://www.twilio.com/console/sms/whatsapp/senders) in the Twilio Console. The rest assumes you already have a registered WhatsApp number on your account.

You can create WhatsApp Addresses via Flex Console > Manage > [Messaging](https://console.twilio.com/us1/develop/flex/channels/messaging/conversations):

1. Click **+ Add new Address** from the **Conversations Addresses** tab.
2. Select **WhatsApp** as the Address type.
3. You can optionally enter a friendly name.

   ![Form to create a new WhatsApp address with fields for address type, WhatsApp number, and Flex integration.](https://docs-resources.prod.twilio.com/b373ed3ad22777fb37609423853f00587daf33ac5b79ce925cc1f432ecb1c2bc.png)
4. Choose your WhatsApp number (sender) in the dropdown.
5. Configure the integration to Flex - either by using **Studio** or **Webhook**. Unless you have removed or reconfigured it, you should be good to use the out-of-box Studio Flow **"Messaging Flow"**. To learn more about configuring Studio Flows, see [Configure pre-agent workflow with Studio.](/docs/flex/admin-guide/setup/configure-pre-agent-workflow-with-studio)
6. Click **Submit** to save your new Flex WhatsApp Address.

You can edit or delete WhatsApp Addresses at any point using the Flex Console.

## Using the Conversations API

The Conversations API's Address Configuration Resource allows you to create and manage WhatsApp addresses for your Twilio account. On address creation, you can specify autocreation of a Conversation upon receipt of an inbound message. The following example shows you the programmatic version of our [Console example](#using-flex-console) with a retry count. To learn more about the different resource properties, see [Address Configuration Resource](/docs/conversations-classic/api/address-configuration-resource).

Create a WhatsApp Address via the API

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
      address: "whatsapp:+13115552368",
      "autoCreation.enabled": true,
      "autoCreation.studioFlowSid": "FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "autoCreation.studioRetryCount": 3,
      "autoCreation.type": "studio",
      type: "whatsapp",
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
    type="whatsapp",
    address="whatsapp:+13115552368",
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
            type: AddressConfigurationResource.TypeEnum.Whatsapp,
            address: "whatsapp:+13115552368",
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
            AddressConfiguration.creator(AddressConfiguration.Type.WHATSAPP, "whatsapp:+13115552368")
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
	params.SetType("whatsapp")
	params.SetAddress("whatsapp:+13115552368")
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
    "whatsapp", // Type
    "whatsapp:+13115552368", // Address
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
                          type: 'whatsapp',
                          address: 'whatsapp:+13115552368',
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
   --type whatsapp \
   --address whatsapp:+13115552368 \
   --auto-creation.enabled \
   --auto-creation.type studio \
   --auto-creation.studio-flow-sid FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --auto-creation.studio-retry-count 3
```

```bash
curl -X POST "https://conversations.twilio.com/v1/Configuration/Addresses" \
--data-urlencode "Type=whatsapp" \
--data-urlencode "Address=whatsapp:+13115552368" \
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
  "address": "whatsapp:+13115552368",
  "type": "whatsapp",
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

For deleting a WhatsApp address via the API, see [Delete Address Configuration](/docs/conversations-classic/api/address-configuration-resource#delete-an-addressconfiguration-resource).

## Configuring WhatsApp Sandbox

These instructions are for setting up WhatsApp Sandbox to work with *Flex Conversations*. ***If you have a registered WhatsApp number, refer to the instructions above rather than this section.*** Registered WhatsApp numbers are set up similarly to SMS.

1. Since we don't have auto-create support for WhatsApp Sandbox, we will need to intercept incoming messages to create Conversations. Create another function with the following code. This uses the same Studio Flow as the SMS instructions and has been tested on Node v12, v14, and v16 runtime:

   * Declare twilio as a dependency. This automatically imports related npm modules into your Function.

     ![Node.js v16 with npm modules lodash, twilio, xmldom, runtime-handler, and util listed with versions.](https://docs-resources.prod.twilio.com/207093a8b2b0663e6ee6b6a3e522631073a6e0dbb83b69b52d8b0d9f3ce94504.png)
   * Set `STUDIO_FLOW_SID` as an environment variable using the unique ID (prefixed by FW) of your [newly created Studio Flow](/docs/flex/admin-guide/setup/conversations/prerequisites#create-a-studio-flow-for-conversations).

     * This function doesn't handle creating a conversation correctly when the first WhatsApp message is an attachment. This may result in warnings/errors logged by the Studio Flow. This isn't an issue for non-sandbox WhatsApp addresses.
   * ***whatsapp.protected.js***

     ```javascript
     /* Handles WhatsApp messages by
      * 1. Creating a conversation
      * 2. Adding the participant that sent that message
      * 3. Adding the message to the conversation
      * If any of these fail, the conversation is deleted
      */
     exports.handler = async function (context, event, callback) {
       const isConfigured = context.STUDIO_FLOW_SID;
       const response = new Twilio.Response();
       response.appendHeader("Access-Control-Allow-Origin", "*");
       response.appendHeader(
         "Access-Control-Allow-Methods",
         "GET,POST,OPTIONS"
       );
       response.appendHeader("Content-Type", "application/json");
       response.appendHeader("Access-Control-Allow-Headers", "Content-Type");

       console.log(`Received Event: ${JSON.stringify(event)}`);

       if (!isConfigured) {
         response.setBody({
           status: 500,
           message: "Studio Flow SID is not configured",
         });
         callback(null, response);
         return;
       }

       const client = context.getTwilioClient();

       let conversation;
       const webhookConfiguration = {
         target: "studio",
         "configuration.flowSid": context.STUDIO_FLOW_SID,
         "configuration.replayAfter": 0,
         "configuration.filters": ["onMessageAdded"],
       };

       try {
         conversation = await client.conversations.v1.conversations.create({
           xTwilioWebhookEnabled: true,
         });
         console.log(`Created Conversation with sid ${conversation.sid}`);
         try {
           console.log(
             `Adding studio webhook to conversation ${conversation.sid}`
           );
           await client.conversations.v1
             .conversations(conversation.sid)
             .webhooks.create(webhookConfiguration);
         } catch (error) {
           console.log(`Got error when configuring webhook ${error}`);
           response.setStatusCode(500);
           return callback(error, response);
         }
       } catch (error) {
         console.log(`Couldnt create conversation ${error}`);
         return callback(error);
       }

       try {
         const participant = await client.conversations.v1
           .conversations(conversation.sid)
           .participants.create({
             "messagingBinding.address": `${event.From}`,
             "messagingBinding.proxyAddress": `${event.To}`,
           });
         console.log(`Added Participant successfully to conversation`);
       } catch (error) {
         console.log(`Failed to add Participant to conversation, ${error}`);
         console.log(
           `In case the error is something about "A binding for this participant and proxy address already exists", check if you havent used the Sandbox in any other instance you have. As WhatsApp Sandbox uses the same number across all accounts, could be that the binding of [Your Phone] + [Sandbox WA number] is already created in the other instance.`
         );
         try {
           await client.conversations.v1
             .conversations(conversation.sid)
             .remove();
           console.log("Deleted conversation successfully");
         } catch (error) {
           console.log(`Failed to remove conversation, ${error}`);
         }
         return callback(null, "");
       }

       // Now add the message to the conversation
       try {
         const body =
           event.Body !== ""
             ? event.Body
             : "Empty body, maybe an attachment. Sorry this function doesnt support adding media to the conversation. This should work post private beta";
         console.log(`Setting body to ${body}`);
         const message = await client.conversations.v1
           .conversations(conversation.sid)
           .messages.create({
             author: `${event.From}`,
             body: `${body}`,
             xTwilioWebhookEnabled: true,
           });
         console.log(`Added message successfully to conversation`);
       } catch (error) {
         console.log(`Failed to add message to conversation, ${error}`);
         try {
           await client.conversations.v1
             .conversations(conversation.sid)
             .remove();
         } catch (error) {
           console.log(`Failed to remove conversation, ${error}`);
         }
         return callback(null, `${error}`);
       }

       return callback(null, "");
     };
     ```
2. Set your function as protected and deploy your Function and copy the Function URL. If you are using the Twilio Console to add your function, you can click on the three dots next to the Function name and select "Copy URL".
3. Go to [WhatsApp Sandbox Settings](https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn?frameUrl=%2Fconsole%2Fsms%2Fwhatsapp%2Flearn%3Fx-target-region%3Dus1) and register the number you are using for testing. Under **Sandbox Configuration**, paste the Function URL into the **When a message comes in** field.
4. If you haven't registered your WhatsApp number in the sandbox, do that now by following the instructions in the WhatsApp Participants section. For example, in the case below, you would send "join cloud-forgot" to the number +1 415 523 8886 from your WhatsApp.

   ![Invite friends to Sandbox by sending WhatsApp message to +1 415 523 8886 with code join cloud-forgot.](https://docs-resources.prod.twilio.com/35717b8207f6a65973c48d3195545338805d89fe1c92162ab28e6cb27f35e4c0.png)
5. Note that this registration is valid for 3 days and you will have to re-register after that period.
6. Save your settings.
7. You can now test the WhatsApp integration by sending a message from your WhatsApp to your Sandbox phone number.
8. If everything has been configured correctly, this should render as an incoming WhatsApp task in your Flex application. Follow steps 1 and 2 of "[Send your first SMS](/docs/flex/admin-guide/setup/conversations/manage-conversations-sms-addresses#send-your-first-sms)" to accept the incoming task and test WhatsApp in Flex.

   ![WhatsApp chat in Flex showing a conversation about a free puppy hotline.](https://docs-resources.prod.twilio.com/978098ea2bc486317da9d25ec2688b735c1f69a39a828c94a58a13ea7c6f4ae7.png)
