# Create Mock US A2P 10DLC Brands and Campaigns

> \[!NOTE]
>
> New to US A2P 10DLC? See ["What is A2P 10DLC?" (support article)](https://help.twilio.com/articles/1260800720410-What-is-A2P-10DLC) for more information.

This guide shows you how to create a mock US A2P 10DLC Brand and Campaign that you can use to test and develop applications with. While the creation process of mock and real Brands and Campaigns is similar, there are some key differences to keep in mind:

* There are no A2P 10DLC fees from The Campaign Registry (TCR) or billing events for creating mock Brands and Campaigns because there is no vetting or validation of the submitted data.
* Mock Campaigns are not functional and cannot be used to send SMS traffic.
* Mock Sole Proprietor Brands cannot have mock Campaigns created for them and a one-time password (OTP) email will not be sent during mock Brand creation.

## Before you begin

Before you can create a mock Brand and Campaign, you'll need to create a real Customer Profile as an ISV-type customer.

First, determine if you'll want to register a mock Standard, Low Volume Standard, or Sole Proprietor Brand with your Customer Profile. If you're not sure which Brand type to choose, [check out this Support article](https://help.twilio.com/hc/en-us/articles/4407882914971-Comparison-between-Starter-Low-Volume-Standard-and-Standard-registration-for-A2P-10DLC) for a detailed look at the differences. Note that mock Sole Proprietor Brands cannot have mock Campaigns created for them, because the OTP (one time password) will not be sent to the designated contact during Brand creation.

* For a mock Standard or Low Volume Standard Brand:
  * Complete all steps before **3. Create a BrandRegistration** [in this API walkthrough](/docs/messaging/compliance/a2p-10dlc/onboarding-isv-api), then proceed to Step 1.
* For a mock Sole Proprietor Brand:
  * Complete all steps before **3. Create a new Sole Proprietor A2P Brand** [in this API walkthrough](/docs/messaging/compliance/a2p-10dlc/onboarding-isv-api-sole-prop-new), then proceed to Step 1.

## Step 1. Create a mock Brand

Now that your Customer Profile is set up and linked to an A2P Messaging Profile, you can create a mock Brand.

The process for creating a mock Brand is almost identical to creating a real Brand. The key difference is that you'll need to set the `mock` request body parameter to `True` when making the `POST` request to the Messaging API BrandRegistration Resource. If `mock` is not specified or set to `False`, a real Brand will be created.

* For a mock Standard or Low Volume Standard Brand:
  * Reference step **3. Create a BrandRegistration** [in this API walkthrough](/docs/messaging/compliance/a2p-10dlc/onboarding-isv-api) for constructing your API request, and set `mock` to `True`.
* For a mock Sole Proprietor Brand:
  * Reference step **3. Create a new Sole Proprietor A2P Brand** [in this API walkthrough](/docs/messaging/compliance/a2p-10dlc/onboarding-isv-api-sole-prop-new) for constructing your API request, and set `mock` to `True`.

| **Parameter** | **Valid Values** | **Description**                                                                                      |
| ------------- | ---------------- | ---------------------------------------------------------------------------------------------------- |
| `mock`        | `True`, `False`  | Will create a mock Brand if set to `True` or a real Brand if either set to `False` or not specified. |

Create a mock Standard Brand

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createBrandRegistrations() {
  const brandRegistration = await client.messaging.v1.brandRegistrations.create(
    {
      a2PProfileBundleSid: "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1",
      brandType: "STANDARD",
      customerProfileBundleSid: "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX0",
      mock: true,
    }
  );

  console.log(brandRegistration.sid);
}

createBrandRegistrations();
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

brand_registration = client.messaging.v1.brand_registrations.create(
    customer_profile_bundle_sid="BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX0",
    a2p_profile_bundle_sid="BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1",
    brand_type="STANDARD",
    mock=True,
)

print(brand_registration.sid)
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

        var brandRegistration = await BrandRegistrationResource.CreateAsync(
            customerProfileBundleSid: "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX0",
            a2PProfileBundleSid: "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1",
            brandType: "STANDARD",
            mock: true);

        Console.WriteLine(brandRegistration.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.messaging.v1.BrandRegistration;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        BrandRegistration brandRegistration =
            BrandRegistration.creator("BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX0", "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1")
                .setBrandType("STANDARD")
                .setMock(true)
                .create();

        System.out.println(brandRegistration.getSid());
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

	params := &messaging.CreateBrandRegistrationsParams{}
	params.SetCustomerProfileBundleSid("BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX0")
	params.SetA2PProfileBundleSid("BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1")
	params.SetBrandType("STANDARD")
	params.SetMock(true)

	resp, err := client.MessagingV1.CreateBrandRegistrations(params)
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

$brand_registration = $twilio->messaging->v1->brandRegistrations->create(
    "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX0", // CustomerProfileBundleSid
    "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1", // A2PProfileBundleSid
    [
        "brandType" => "STANDARD",
        "mock" => true,
    ]
);

print $brand_registration->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

brand_registration = @client
                     .messaging
                     .v1
                     .brand_registrations
                     .create(
                       customer_profile_bundle_sid: 'BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX0',
                       a2p_profile_bundle_sid: 'BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1',
                       brand_type: 'STANDARD',
                       mock: true
                     )

puts brand_registration.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:messaging:v1:a2p:brand-registrations:create \
   --customer-profile-bundle-sid BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX0 \
   --a2p-profile-bundle-sid BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1 \
   --brand-type STANDARD \
   --mock
```

```bash
curl -X POST "https://messaging.twilio.com/v1/a2p/BrandRegistrations" \
--data-urlencode "CustomerProfileBundleSid=BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX0" \
--data-urlencode "A2PProfileBundleSid=BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1" \
--data-urlencode "BrandType=STANDARD" \
--data-urlencode "Mock=true" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "BN0044409f7e067e279523808d267e2d85",
  "account_sid": "AC78e8e67fc0246521490fb9907fd0c165",
  "customer_profile_bundle_sid": "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX0",
  "a2p_profile_bundle_sid": "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX1",
  "date_created": "2021-01-28T10:45:51Z",
  "date_updated": "2021-01-28T10:45:51Z",
  "brand_type": "STANDARD",
  "status": "PENDING",
  "tcr_id": "BXXXXXX",
  "failure_reason": "Registration error",
  "url": "https://messaging.twilio.com/v1/a2p/BrandRegistrations/BN0044409f7e067e279523808d267e2d85",
  "brand_score": 42,
  "brand_feedback": [
    "TAX_ID",
    "NONPROFIT"
  ],
  "identity_status": "VERIFIED",
  "russell_3000": true,
  "government_entity": false,
  "tax_exempt_status": "501c3",
  "skip_automatic_sec_vet": false,
  "errors": [],
  "mock": true,
  "links": {
    "brand_vettings": "https://messaging.twilio.com/v1/a2p/BrandRegistrations/BN0044409f7e067e279523808d267e2d85/Vettings",
    "brand_registration_otps": "https://messaging.twilio.com/v1/a2p/BrandRegistrations/BN0044409f7e067e279523808d267e2d85/SmsOtp"
  }
}
```

You can confirm that the new Brand you created is a mock by checking for `"mock": true` in the response. Real (non-mock) Brands will [incur A2P 10DLC fees and billing events where applicable](https://help.twilio.com/articles/1260803965530-What-pricing-and-fees-are-associated-with-the-A2P-10DLC-service).

If you created a mock Sole Proprietor Brand, you will not be able to create mock Campaigns and can skip the remaining steps.

## Step 2. Create a Messaging Service

> \[!CAUTION]
>
> We highly discourage the use of existing Messaging Services with Senders in the Sender Pool to avoid any risks of your US messages failing.

Now you will need a Messaging Service to associate with the mock Campaign you are about to create. We recommend creating a new Messaging Service without any Senders. To do that, follow step **4. Create a Messaging Service** [in this API walkthrough](/docs/messaging/compliance/a2p-10dlc/onboarding-isv-api#4-create-a-messaging-service).

## Step 3. Create a mock Campaign

Now that you've created a mock Brand and Messaging Service, you can create an associated mock Campaign. A Campaign represents a single messaging use case or the intent of the messages you wish to send. For example, your Campaign's use case might be to send marketing or account notifications.

The process for creating a mock Campaign is identical to creating a real Campaign. Any Campaign that is associated with a mock Brand automatically becomes a mock Campaign, so there is no need to pass in a `mock` request parameter during Campaign creation.

Reference step **5. Create an A2P Campaign** [in this API walkthrough](/docs/messaging/compliance/a2p-10dlc/onboarding-isv-api) when constructing your API request.

Create a mock Standard Campaign

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createUsAppToPerson() {
  const usAppToPerson = await client.messaging.v1
    .services("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .usAppToPerson.create({
      brandRegistrationSid: "BNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      description: "Send marketing messages about sales and offers",
      hasEmbeddedLinks: false,
      hasEmbeddedPhone: false,
      messageFlow: "MessageFlow",
      messageSamples: ["Book your next OWL FLIGHT for just 1 EUR"],
      usAppToPersonUsecase: "STANDARD",
    });

  console.log(usAppToPerson.sid);
}

createUsAppToPerson();
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

us_app_to_person = client.messaging.v1.services(
    "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).us_app_to_person.create(
    brand_registration_sid="BNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    description="Send marketing messages about sales and offers",
    us_app_to_person_usecase="STANDARD",
    message_samples=["Book your next OWL FLIGHT for just 1 EUR"],
    message_flow="MessageFlow",
    has_embedded_links=False,
    has_embedded_phone=False,
)

print(us_app_to_person.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Messaging.V1.Service;
using System.Threading.Tasks;
using System.Collections.Generic;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var usAppToPerson = await UsAppToPersonResource.CreateAsync(
            brandRegistrationSid: "BNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            description: "Send marketing messages about sales and offers",
            usAppToPersonUsecase: "STANDARD",
            messageSamples: new List<string> { "Book your next OWL FLIGHT for just 1 EUR" },
            messageFlow: "MessageFlow",
            hasEmbeddedLinks: false,
            hasEmbeddedPhone: false,
            pathMessagingServiceSid: "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(usAppToPerson.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.util.Arrays;
import com.twilio.Twilio;
import com.twilio.rest.messaging.v1.service.UsAppToPerson;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        UsAppToPerson usAppToPerson = UsAppToPerson
                                          .creator("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                                              "BNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                                              "Send marketing messages about sales and offers",
                                              "MessageFlow",
                                              Arrays.asList("Book your next OWL FLIGHT for just 1 EUR"),
                                              "STANDARD",
                                              false,
                                              false)
                                          .create();

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

	params := &messaging.CreateUsAppToPersonParams{}
	params.SetBrandRegistrationSid("BNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
	params.SetDescription("Send marketing messages about sales and offers")
	params.SetUsAppToPersonUsecase("STANDARD")
	params.SetMessageSamples([]string{
		"Book your next OWL FLIGHT for just 1 EUR",
	})
	params.SetMessageFlow("MessageFlow")
	params.SetHasEmbeddedLinks(false)
	params.SetHasEmbeddedPhone(false)

	resp, err := client.MessagingV1.CreateUsAppToPerson("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
    ->services("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->usAppToPerson->create(
        "BNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", // BrandRegistrationSid
        "Send marketing messages about sales and offers", // Description
        "MessageFlow", // MessageFlow
        ["Book your next OWL FLIGHT for just 1 EUR"], // MessageSamples
        "STANDARD", // UsAppToPersonUsecase
        false, // HasEmbeddedLinks
        false // HasEmbeddedPhone
    );

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
                   .services('MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                   .us_app_to_person
                   .create(
                     brand_registration_sid: 'BNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                     description: 'Send marketing messages about sales and offers',
                     us_app_to_person_usecase: 'STANDARD',
                     message_samples: [
                       'Book your next OWL FLIGHT for just 1 EUR'
                     ],
                     message_flow: 'MessageFlow',
                     has_embedded_links: false,
                     has_embedded_phone: false
                   )

puts us_app_to_person.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:messaging:v1:services:compliance:usa2p:create \
   --messaging-service-sid MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --brand-registration-sid BNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --description "Send marketing messages about sales and offers" \
   --us-app-to-person-usecase STANDARD \
   --message-samples "Book your next OWL FLIGHT for just 1 EUR" \
   --message-flow MessageFlow \
   --has-embedded-links \
   --has-embedded-phone
```

```bash
curl -X POST "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Compliance/Usa2p" \
--data-urlencode "BrandRegistrationSid=BNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
--data-urlencode "Description=Send marketing messages about sales and offers" \
--data-urlencode "UsAppToPersonUsecase=STANDARD" \
--data-urlencode "MessageSamples=Book your next OWL FLIGHT for just 1 EUR" \
--data-urlencode "MessageFlow=MessageFlow" \
--data-urlencode "HasEmbeddedLinks=false" \
--data-urlencode "HasEmbeddedPhone=false" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

You can confirm that the new Campaign you created is a mock by checking for `"mock": true` in the response.

## Mock deletion

Mock Brands cannot be manually deleted. They will expire and be automatically deleted 30 days after initial creation, along with all mock Campaigns associated with them.

Mock Campaigns can be deleted using the Messaging API with the US A2P identifier `QE2c6890da8086d771620e9b13fadeba0b` as seen in the example below. This request will remove the mock Campaign associated with the specified Messaging Service.

Delete a mock Campaign

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

## Get help with A2P 10DLC

[Get help](https://www.twilio.com/blog/twilio-professional-services-for-us-a2p-10dlc-registrations)

Need help building or registering your A2P 10DLC application? Learn more about Twilio Professional Services for A2P 10DLC.
