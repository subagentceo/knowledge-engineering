# Manage Conversations Addresses for Facebook Messenger (Public Beta)

> \[!IMPORTANT]
>
> Facebook Messenger for Flex is currently available as a Public Beta product and the information contained in this document is subject to change. This means that some features are not yet implemented and others may be changed before the product is declared as Generally Available. Public Beta products are not covered by a Twilio SLA.

> \[!NOTE]
>
> **Not a HIPAA Eligible Service**\
> Facebook Messenger for Flex is not a HIPAA Eligible Service and cannot be used in Flex workflows that are subject to HIPAA.

## Overview

This guide describes how to set up Facebook Messenger as a Flex Conversations channel. Once configured, agents in Flex can receive and reply to messages that come from Facebook Pages. Customers must message agents first, as agent-initiated outbound messages are not supported. For more details, see [Facebook's messaging policy](https://developers.facebook.com/docs/messenger-platform/policy/policy-overview#standard_messaging). Messages can include text, images, and file attachments.

Some benefits of using Facebook Messenger with Flex include:

* Customers who find your business through Facebook can contact you right away.
* Supervisors can see live and historic data in the Flex dashboard and reports.
* Admins can configure Studio flow responses so customers instantly receive auto-replies.

### Limitations

For limitations, see [File Attachments and API Limits](/docs/flex/developer/conversations/limits) and [Known Issues](/docs/flex/developer/conversations/known-issues).

## Connect Facebook Messenger to Flex

### Requirements

* [Twilio Console](https://console.twilio.com/) account with Admin access
* Flex UI v2.4.x or later
* Facebook Page for your business

### Step 1: Connect your Facebook Page in the Twilio Console

1. In the [Twilio Console](https://console.twilio.com/), from the **Develop** sidebar, click **Explore Products**.
2. Under **Marketplace**, click **Channels**. **Tip**: To pin **Channels** to the sidebar for access later, click the pin icon.
3. In the sidebar, click **Facebook** **Messenger**.
4. Click **Enable** **Facebook** **Messenger**.
5. Click **Log in with Facebook**.
6. A Facebook login page appears. Log in to Facebook, and select the Facebook Page that you want Twilio to access.
7. In the **Create your first sender** window, select the Page you'd like to connect. A **Sender** is the address used when you communicate with customers. **Note**: A Facebook page can be linked to only one Twilio Account.
8. Review the terms of service, and select the checkbox to acknowledge and agree to them.
9. Click **Submit**.

For more detailed information on setup and functionality, see [Facebook Messenger Setup](/docs/messaging/channels/facebook-messenger).

### Step 2: Create a Conversations address for your Facebook page

To receive and reply to messages in Flex, create a Conversations address through the Console or using the API.

#### Console

1. In the sidebar, select **Flex** > **Channel management** > **Messaging**.
2. Click **Create New Address**.
3. From the **Address** **Type** list, select **Facebook** **Messenger**.

   ![Form to create a new Facebook Messenger address for Flex Conversations.](https://docs-resources.prod.twilio.com/9db1497fd0583606895c4b96e3597b22bc24c8aeaa89c554587cdf25c186513d.png)
4. From the **Facebook page** list, select the page you connected.
5. From the **Integration type** list, select how you'd like conversations to pass to Flex, via **Studio** or **Webhook**.\
   \- If you selected **Studio**, from the **Studio Flow** list, you can select the out-of-box **Messaging Flow**, unless you have removed or changed your studio flow. If you've changed your studio flow, make sure the **Incoming Conversations** trigger connects to the **Send to Flex** widget. \
   \- To learn more about configuring Studio Flows, see [Configure pre-agent workflow with Studio](/docs/flex/admin-guide/setup/configure-pre-agent-workflow-with-studio).
6. Click **Create Address**.

#### API

You can programmatically create and manage a Messenger address using the [Conversations API's Address Configuration Resource](/docs/conversations-classic/api/address-configuration-resource). The example below includes a retry count:

Create a Facebook Messenger Address via the API

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
      address: "messenger:<facebook_page_id>",
      "autoCreation.enabled": true,
      "autoCreation.studioFlowSid": "FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      "autoCreation.studioRetryCount": 3,
      "autoCreation.type": "studio",
      type: "messenger",
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
    type="messenger",
    address="messenger:<facebook_page_id>",
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
            type: AddressConfigurationResource.TypeEnum.Messenger,
            address: "messenger:<facebook_page_id>",
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
            AddressConfiguration.creator(AddressConfiguration.Type.MESSENGER, "messenger:<facebook_page_id>")
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
	params.SetType("messenger")
	params.SetAddress("messenger:<facebook_page_id>")
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
    "messenger", // Type
    "messenger:<facebook_page_id>", // Address
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
                          type: 'messenger',
                          address: 'messenger:<facebook_page_id>',
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
   --type messenger \
   --address "messenger:<facebook_page_id>" \
   --auto-creation.enabled \
   --auto-creation.type studio \
   --auto-creation.studio-flow-sid FWXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --auto-creation.studio-retry-count 3
```

```bash
curl -X POST "https://conversations.twilio.com/v1/Configuration/Addresses" \
--data-urlencode "Type=messenger" \
--data-urlencode "Address=messenger:<facebook_page_id>" \
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
  "address": "messenger:<facebook_page_id>",
  "type": "messenger",
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

### Step 3: Send and receive your first Facebook Messenger message in the Flex UI

1. Open the Flex UI and log in as an agent.
2. Set your status to **Available**.
3. From a different Facebook profile, [send a message to the Facebook Page](https://www.facebook.com/help/142031279233975) that you connected to Flex.
4. In the Flex UI, accept the **Incoming messenger request** and type a reply. The reply appears in Facebook Messenger.

![Facebook Messenger chat interface showing customer and agent conversation about an order.](https://docs-resources.prod.twilio.com/7d80f14d56293cce221ce1e7f09db525c1c457911cf6ba268731f36e24edffb4.png)

### Related documentation

* [Facebook Messenger Setup](/docs/messaging/channels/facebook-messenger)
* [Configure pre-agent workflow with Studio](/docs/flex/admin-guide/setup/configure-pre-agent-workflow-with-studio)
