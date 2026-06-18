# A2P 10DLC - Use Externally Registered Campaigns

> \[!NOTE]
>
> Contact your Twilio Account Executive (AE) to request access to this feature.

This guide explains the process of associating an external Campaign that was directly registered with The Campaign Registry (TCR) with a Twilio Messaging Service. Doing this allows you to skip the Customer Profile creation and Brand registration steps of Twilio A2P 10DLC onboarding.

Twilio does not recommend using external Campaigns in most cases, and TCR only allows direct registration from ISVs. See the [Can I go directly to The Campaign Registry for US A2P 10DLC registration?](https://help.twilio.com/articles/1260803965730-Can-I-go-directly-to-The-Campaign-Registry-for-US-A2P-10DLC-registration) Help Center article for more information on external Campaigns and their limitations.

## Steps to associate external Campaigns with Messaging Services

This section covers the steps you need to follow to associate an external Campaign with a Messaging Service. Optionally, you can reference [this sequence diagram](https://docs-resources.prod.twilio.com/documents/twilio_erc_diagram.pdf) for a more technical look at the required steps.

1. Create a [Twilio Messaging Service](/docs/messaging/services) via [the Console](https://www.twilio.com/console/sms/services) or via [API](/docs/messaging/api/service-resource). Do not specify the Messaging Service's `Usecase` parameter. Twilio will assign the default value `undeclared` for the Messaging Service, which is appropriate for external Campaigns regardless of what Use Case they are registered with in TCR.
2. Add phone numbers to the Messaging Service's Sender Pool via API or the Console at any point in the process. For detailed instructions on how to do this, see the [Managing a Messaging Service Sender Pool](https://help.twilio.com/articles/4402705042075-Managing-a-Messaging-Service-Sender-Pool) Help Center article. Sole Proprietor Campaigns are limited to one phone number.
3. Share the Campaign with Twilio as the Direct Connect Aggregator (DCA) using the TCR web portal or [TCR API](https://csp-api.campaignregistry.com/v2/restAPI#/Campaign/shareCampaign). A DCA is a company that provides direct connectivity to mobile carrier gateways for the purpose of delivering SMS messages.
4. Twilio reviews the Campaign.

**If the Campaign fails this review**: Twilio will reject the Campaign sharing request. You will receive a `CAMPAIGN_SHARE_DELETE` event to the webhook endpoint you provided to TCR containing rejection feedback. You can update the Campaign based on the feedback and repeat step #3 above.

5. When the Campaign passes Twilio's compliance review and is accepted, you will receive a `CAMPAIGN_SHARE_ACCEPT` event to the webhook endpoint you provided to TCR. You cannot continue to the next step until this happens.
6. Associate the Campaign with a Messaging Service with [this API call](#associate-an-external-campaign-with-a-messaging-service).
7. Twilio performs any carrier-specific Campaign configuration and elects any required secondary DCAs for the Campaign. Secondary DCAs must conduct reviews before the Campaign can be fully operational.

**If the secondary DCAs reject the Campaign**: You will receive a `CAMPAIGN_SHARE_DELETE` event to the webhook endpoint you provided to TCR containing rejection feedback from the secondary DCA. First, you will need to [delete the Campaign association from Twilio](#delete-an-external-campaign-association). Then, you can update the Campaign based on the feedback and start again at step #3 above. Twilio will bill the $15 vetting fee for each review conducted by the secondary DCA. Note that [TCR Nudge (APPEAL\_REJECTION, REVIEW)](https://csp-api.campaignregistry.com/v2/restAPI#/Campaign/nudgeCampaignCnp) functionality is unsupported by Twilio at this time. If you wish to appeal a secondary DCA rejection, contact support at [10dlc-onboarding@twilio.com](mailto:10dlc-onboarding@twilio.com).

8. When all parties approve the Campaign, you will receive a `CAMPAIGN_DCA_COMPLETE` event to the webhook endpoint you provided to TCR. Twilio associates all numbers in the Messaging Service's Sender Pool with the Campaign, including numbers you add later.
9. Start sending! Twilio will bill and rate limit messages according to the TCR Campaign Class.

## Code samples

### Associate an external Campaign with a Messaging Service

> \[!NOTE]
>
> This endpoint is private, contact your Twilio Account Executive (AE) to request access.

> \[!WARNING]
>
> This API call can take some time to complete, use the [Get Campaign details endpoint](#get-campaign-details) to confirm the Campaign is verified before sending messages.

This call kicks off the process of Twilio associating an external Campaign with a Messaging Service. To check if the association process is complete and your Campaign is ready to send messages, use the [Get Campaign Details](#get-campaign-details) API call below and verify that the `campaign_status` is `VERIFIED` in the JSON response.

**Rate limit**: One request per five seconds. Failures resulting from exceeding this limit are asynchronous and the Campaign moves to a failed status after all retries are exhausted. To proceed, you must [delete the Campaign association from Twilio](#delete-an-external-campaign-association) and reshare the Campaign with Twilio from TCR.

**`campaignId` parameter**: This is TCR's unique identifier of your Campaign. It is a seven character alphanumeric string that starts with `C`.

Associate an external Campaign with a Messaging Service

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createExternalCampaign() {
  const externalCampaign = await client.messaging.v1.externalCampaign.create({
    campaignId: "CRMTK1Z",
    messagingServiceSid: "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  });

  console.log(externalCampaign.sid);
}

createExternalCampaign();
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

external_campaign = client.messaging.v1.external_campaign.create(
    campaign_id="CRMTK1Z",
    messaging_service_sid="MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
)

print(external_campaign.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Messaging.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var externalCampaign = await ExternalCampaignResource.CreateAsync(
            campaignId: "CRMTK1Z", messagingServiceSid: "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(externalCampaign.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.messaging.v1.ExternalCampaign;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ExternalCampaign externalCampaign =
            ExternalCampaign.creator("CRMTK1Z", "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").create();

        System.out.println(externalCampaign.getSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	messaging "github.com/twilio/twilio-go/rest/messaging/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &messaging.CreateExternalCampaignParams{}
	params.SetCampaignId("CRMTK1Z")
	params.SetMessagingServiceSid("MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")

	resp, err := client.MessagingV1.CreateExternalCampaign(params)
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

$external_campaign = $twilio->messaging->v1->externalCampaign->create(
    "CRMTK1Z", // CampaignId
    "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" // MessagingServiceSid
);

print $external_campaign->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

external_campaign = @client
                    .messaging
                    .v1
                    .external_campaign
                    .create(
                      campaign_id: 'CRMTK1Z',
                      messaging_service_sid: 'MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
                    )

puts external_campaign.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:messaging:v1:services:preregistered-usa2p:create \
   --campaign-id CRMTK1Z \
   --messaging-service-sid MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X POST "https://messaging.twilio.com/v1/Services/PreregisteredUsa2p" \
--data-urlencode "CampaignId=CRMTK1Z" \
--data-urlencode "MessagingServiceSid=MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "QE2c6890da8086d771620e9b13fadeba0b",
  "messaging_service_sid": "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "campaign_id": "CRMTK1Z",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2021-03-21T21:31:00Z"
}
```

### Get Campaign details

This call returns the details of a specific Campaign. You can use it to check the status of a Campaign that you have associated with a Messaging Service. A `campaign_status` of `VERIFIED` means you are ready to start sending messages. Twilio bills messages and rate limits them according to the TCR Campaign Class.

The `Sid` parameter value should be `QE2c6890da8086d771620e9b13fadeba0b` for all A2P 10DLC Campaigns and Messaging Services. It is the US A2P Compliance resource identifier.

See this endpoint's [full API Reference](/docs/messaging/api/usapptoperson-resource#fetch-a-usapptoperson-resource) for more information.

Get A2P 10DLC Campaign details

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchUsAppToPerson() {
  const usAppToPerson = await client.messaging.v1
    .services("MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .usAppToPerson("QE2c6890da8086d771620e9b13fadeba0b")
    .fetch();

  console.log(usAppToPerson.sid);
}

fetchUsAppToPerson();
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

us_app_to_person = (
    client.messaging.v1.services("MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .us_app_to_person("QE2c6890da8086d771620e9b13fadeba0b")
    .fetch()
)

print(us_app_to_person.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Messaging.V1.Service;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var usAppToPerson = await UsAppToPersonResource.FetchAsync(
            pathMessagingServiceSid: "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            pathSid: "QE2c6890da8086d771620e9b13fadeba0b");

        Console.WriteLine(usAppToPerson.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.messaging.v1.service.UsAppToPerson;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        UsAppToPerson usAppToPerson =
            UsAppToPerson.fetcher("MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "QE2c6890da8086d771620e9b13fadeba0b").fetch();

        System.out.println(usAppToPerson.getSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	messaging "github.com/twilio/twilio-go/rest/messaging/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &messaging.FetchUsAppToPersonParams{}

	resp, err := client.MessagingV1.FetchUsAppToPerson("MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		"QE2c6890da8086d771620e9b13fadeba0b",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Sid != nil {
			fmt.Println(resp.Sid)
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

$us_app_to_person = $twilio->messaging->v1
    ->services("MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->usAppToPerson("QE2c6890da8086d771620e9b13fadeba0b")
    ->fetch();

print $us_app_to_person->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

us_app_to_person = @client
                   .messaging
                   .v1
                   .services('MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                   .us_app_to_person('QE2c6890da8086d771620e9b13fadeba0b')
                   .fetch

puts us_app_to_person.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:messaging:v1:services:compliance:usa2p:fetch \
   --messaging-service-sid MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --sid QE2c6890da8086d771620e9b13fadeba0b
```

```bash
curl -X GET "https://messaging.twilio.com/v1/Services/MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Compliance/Usa2p/QE2c6890da8086d771620e9b13fadeba0b" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

### Delete an external Campaign association

> \[!WARNING]
>
> This request does not delete the Campaign from TCR. That must be done directly via the TCR web portal or [TCR API](https://csp-api.campaignregistry.com/v2/restAPI#/Campaign/deactivateCampaign).

This API call deletes an external Campaign association to a Messaging Service. After an association is deleted, you can re-associate a different Campaign with the same Messaging Service or associate the same Campaign with different Messaging Service.

When this call is successfully made, it takes a few seconds to finalize deletion in the Twilio system. To account for this, you can implement a five second delay between removing a Campaign and creating a new association with the same Campaign or the same Messaging Service.

See this endpoint's [full API Reference](/docs/messaging/api/usapptoperson-resource#delete-a-usapptoperson-resource) for more information.

Delete a Campaign association

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function deleteUsAppToPerson() {
  await client.messaging.v1
    .services("MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .usAppToPerson("QE2c6890da8086d771620e9b13fadeba0b")
    .remove();
}

deleteUsAppToPerson();
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

client.messaging.v1.services(
    "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).us_app_to_person("QE2c6890da8086d771620e9b13fadeba0b").delete()
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Messaging.V1.Service;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        await UsAppToPersonResource.DeleteAsync(
            pathMessagingServiceSid: "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            pathSid: "QE2c6890da8086d771620e9b13fadeba0b");
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.messaging.v1.service.UsAppToPerson;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        UsAppToPerson.deleter("MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "QE2c6890da8086d771620e9b13fadeba0b").delete();
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	err := client.MessagingV1.DeleteUsAppToPerson("MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		"QE2c6890da8086d771620e9b13fadeba0b")
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

$twilio->messaging->v1
    ->services("MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->usAppToPerson("QE2c6890da8086d771620e9b13fadeba0b")
    ->delete();
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
  .messaging
  .v1
  .services('MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  .us_app_to_person('QE2c6890da8086d771620e9b13fadeba0b')
  .delete
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:messaging:v1:services:compliance:usa2p:remove \
   --messaging-service-sid MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --sid QE2c6890da8086d771620e9b13fadeba0b
```

```bash
curl -X DELETE "https://messaging.twilio.com/v1/Services/MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Compliance/Usa2p/QE2c6890da8086d771620e9b13fadeba0b" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

### Migrate external Campaign to Twilio

Twilio now supports the migration of Campaigns approved by all carriers via TCR from other messaging API providers, without requiring re-registration.

When a Campaign is shared with Twilio through Connectivity Partner (CNP) Migration, a secondary CNP chain is created in the background, ensuring minimal service disruptions. Once all necessary approvals are received, this secondary chain transitions to the primary chain. Each migrated Campaign incurs a fee of $8.

#### Number Migration

Number migration can occur before or after Campaign migration. For optimal results, complete number porting first and ensure SMS traffic is available on Twilio for the ported number before initiating Campaign migration.

#### Associate an external, migrated Campaign with a Messaging Service

Refer to the TCR documentation for details on initiating a CNP migration request to Twilio's DCA.
After the Campaign is accepted by Twilio, use the following endpoint to associate it with a Twilio Messaging Service:

**`CnpMigration` parameter**: This optional parameter, when set to `True`, indicates the Campaign was shared through CNP migration.

Associate an external Campaign with a Messaging Service

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createExternalCampaign() {
  const externalCampaign = await client.messaging.v1.externalCampaign.create({
    campaignId: "CRMTK1Z",
    cnpMigration: false,
    messagingServiceSid: "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  });

  console.log(externalCampaign.sid);
}

createExternalCampaign();
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

external_campaign = client.messaging.v1.external_campaign.create(
    campaign_id="CRMTK1Z",
    messaging_service_sid="MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    cnp_migration=False,
)

print(external_campaign.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Messaging.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var externalCampaign = await ExternalCampaignResource.CreateAsync(
            campaignId: "CRMTK1Z",
            messagingServiceSid: "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            cnpMigration: false);

        Console.WriteLine(externalCampaign.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.messaging.v1.ExternalCampaign;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ExternalCampaign externalCampaign =
            ExternalCampaign.creator("CRMTK1Z", "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").setCnpMigration(false).create();

        System.out.println(externalCampaign.getSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	messaging "github.com/twilio/twilio-go/rest/messaging/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &messaging.CreateExternalCampaignParams{}
	params.SetCampaignId("CRMTK1Z")
	params.SetMessagingServiceSid("MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
	params.SetCnpMigration(false)

	resp, err := client.MessagingV1.CreateExternalCampaign(params)
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

$external_campaign = $twilio->messaging->v1->externalCampaign->create(
    "CRMTK1Z", // CampaignId
    "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", // MessagingServiceSid
    ["cnpMigration" => false]
);

print $external_campaign->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

external_campaign = @client
                    .messaging
                    .v1
                    .external_campaign
                    .create(
                      campaign_id: 'CRMTK1Z',
                      messaging_service_sid: 'MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                      cnp_migration: false
                    )

puts external_campaign.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:messaging:v1:services:preregistered-usa2p:create \
   --campaign-id CRMTK1Z \
   --messaging-service-sid MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X POST "https://messaging.twilio.com/v1/Services/PreregisteredUsa2p" \
--data-urlencode "CampaignId=CRMTK1Z" \
--data-urlencode "MessagingServiceSid=MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
--data-urlencode "CnpMigration=false" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "QE2c6890da8086d771620e9b13fadeba0b",
  "messaging_service_sid": "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "campaign_id": "CRMTK1Z",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2021-03-21T21:31:00Z"
}
```

## Get help with A2P 10DLC

[Get help](https://www.twilio.com/blog/twilio-professional-services-for-us-a2p-10dlc-registrations)

Need help building or registering your A2P 10DLC application? Learn more about Twilio Professional Services for A2P 10DLC.
