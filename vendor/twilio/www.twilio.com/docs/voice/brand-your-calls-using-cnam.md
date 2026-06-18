# Brand your calls using CNAM

> \[!IMPORTANT]
>
> Caller ID (CNAM) is in Public Beta. The information in this document could change. We might add or update features before the product becomes Generally Available. Beta products don't have a Service Level Agreement (SLA). Learn more about [beta product support](https://help.twilio.com/articles/115002413087-Twilio-Beta-product-support).

Caller ID Name (CNAM) displays the business name on the recipient's phone during outbound calls from your Twilio numbers.

## Eligibility

* Looking up or changing CNAM is available only for US phone numbers.
* Your Business Profile must be associated with an Employer Identification Number (EIN) or a Data Universal Numbering System (DUNS) number.
* CNAM is displayed only if the recipient has enabled the CNAM feature on their phone through their carrier.
  * For landlines, CNAM is enabled by default.
  * For mobile phones, most US carriers offer CNAM as an opt-in feature. If the recipient doesn't enable CNAM for their mobile phone, CNAM won't be displayed even if a CNAM is properly set for the number.

> \[!NOTE]
>
> CNAM display depends on the recipient's carrier. Twilio keeps its CNAM Line Information Databases (LIDB) up to date with the correct CNAM values. However, not all carriers subscribe to every CNAM database, and Twilio can't control how carriers or database providers manage or update their records.

## Onboarding

There are two different options for enabling CNAM on your phone number(s):

1. Using the Twilio Console
2. Twilio's Trust Hub REST API.

### CNAM conditions

* Can be a maximum of 15 characters.
* Must be a unique name or value, cannot be a generic value such as a City/State.
* Should begin with a letter and can only contain letters, numbers, periods, commas and spaces
* If no Caller Name (CNAM) is set for the number, the City and State of the number is the default display along with phone number.

**Note**: At this time, you're unable to update Toll-Free numbers CNAM using the the Twilio Console or API. To update the CNAM on a Toll-Free number, please [contact support](https://help.twilio.com/hc/en-us/articles/360048500694-Contacting-Twilio-Support).

> \[!WARNING]
>
> CNAM lookups incur additional charges. See [Lookup pricing](https://www.twilio.com/en-us/user-authentication-identity/pricing/lookup) for details.

## CNAM Onboarding in the Twilio Console

1. Create a Business Profile in the Trust Hub and submit for vetting. You can do this in [Twilio Console](https://1console.twilio.com/go?to=/account/__account__/us1/trusthub/compliance-profiles) or the [legacy Console](https://console.twilio.com/us1/account/trust-hub/customer-profiles).

   * If you are an ISV, then you would need to create a Secondary Business Profile for your customer(s).
2. Assign phone numbers in your account to the Business Profile.

   * This associates a single identity with the phone numbers.
3. Create a CNAM Trust Product instance that is associated with your Business Profile in the Trust Hub and submit for vetting. You can do this in [Twilio Console](https://1console.twilio.com/go?to=/account/__account__/us1/trusthub/registrations/cnam) or the [legacy Console](https://console.twilio.com/us1/account/trust-hub/cnam).
4. After Twilio approves the CNAM Trust Product, you register your phone numbers for CNAM.

   * Only US standard long code phone numbers which are already assigned to your Business Profile are eligible for assignment to the CNAM profile.
   * CA numbers cannot be assigned to CNAM profiles.
   * US and CA Toll Free numbers cannot be assigned to CNAM profiles. For help updating CNAM on Toll Free numbers, engage Support.
5. Click Save

   * When the CNAM Trust Product reaches Twilio-Approved status, Twilio will register CNAM display name for your numbers with the CNAM authoritative databases in the United States.
6. Enable Caller Name Lookup for the phone number.
7. Go to **Phone Numbers** > **Active Numbers** in [Twilio Console](https://1console.twilio.com/go?to=/account/__account__/us1/senders-hub/list/phone-numbers/inventory) or the [legacy Console](https://console.twilio.com/us1/develop/phone-numbers/manage/incoming).
8. Click the phone number you want to enable Caller Name Lookup for.
9. In the **Voice and emergency calling** section, click **Edit**.
10. From the **Caller Name Lookup** dropdown, select **Enabled**.
11. Click **Save Configuration**.

**Note**: You can remove CNAM by unassigning Phone Number from CNAM Trust Product or by deleting the CNAM Trust Product.

That's it. No coding required.

## CNAM Onboarding with the Trust Hub REST API

Please [refer to Trust Hub Rest API Docs](/docs/trust-hub/trusthub-rest-api) for more details.

1. Create a Business Profile in the Console's Trust Hub and submit for vetting.

* Visit the Trust Hub section of [Twilio Console](https://1console.twilio.com/go?to=/account/__account__/us1/trusthub/compliance-profiles) or the [legacy Console](https://console.twilio.com/us1/account/trust-hub/customer-profiles) to create a Business Profile.
* If you are an ISV, then you would need to create a Secondary Business Profile for your customer(s).

2. Assign phone numbers in your account to the Business Profile. This associates a single identity with the phone numbers.

* You'll need your **Phone Number SID(s)**

  * To find your Phone Number SIDs in the Console, go to your **Dashboard**. In the **Project Info** section, click on **See all phone numbers**, then **click on a phone number** to find the SID.
  * To find your Phone Number SIDs using the API, see the [Additional API Calls section](#additional-api-calls) below.
  * Phone Number SIDs begin with "**PN**".
  * In the API Call below, don't change the `ChannelEndpointType`. It needs to be `phone-number` to add a phone number to your Business Profile.

Assign Phone Numbers to Your Business Profile

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createCustomerProfileChannelEndpointAssignment() {
  const customerProfilesChannelEndpointAssignment = await client.trusthub.v1
    .customerProfiles("YOUR_BUSINESS_PROFILE_SID")
    .customerProfilesChannelEndpointAssignment.create({
      channelEndpointSid: "YOUR_PHONE_NUMBER_SID",
      channelEndpointType: "phone-number",
    });

  console.log(customerProfilesChannelEndpointAssignment.sid);
}

createCustomerProfileChannelEndpointAssignment();
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

customer_profiles_channel_endpoint_assignment = (
    client.trusthub.v1.customer_profiles(
        "YOUR_BUSINESS_PROFILE_SID"
    ).customer_profiles_channel_endpoint_assignment.create(
        channel_endpoint_type="phone-number",
        channel_endpoint_sid="YOUR_PHONE_NUMBER_SID",
    )
)

print(customer_profiles_channel_endpoint_assignment.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Trusthub.V1.CustomerProfiles;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var customerProfilesChannelEndpointAssignment =
            await CustomerProfilesChannelEndpointAssignmentResource.CreateAsync(
                channelEndpointType: "phone-number",
                channelEndpointSid: "YOUR_PHONE_NUMBER_SID",
                pathCustomerProfileSid: "YOUR_BUSINESS_PROFILE_SID");

        Console.WriteLine(customerProfilesChannelEndpointAssignment.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.trusthub.v1.customerprofiles.CustomerProfilesChannelEndpointAssignment;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        CustomerProfilesChannelEndpointAssignment customerProfilesChannelEndpointAssignment =
            CustomerProfilesChannelEndpointAssignment
                .creator("YOUR_BUSINESS_PROFILE_SID", "phone-number", "YOUR_PHONE_NUMBER_SID")
                .create();

        System.out.println(customerProfilesChannelEndpointAssignment.getSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	trusthub "github.com/twilio/twilio-go/rest/trusthub/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &trusthub.CreateCustomerProfileChannelEndpointAssignmentParams{}
	params.SetChannelEndpointType("phone-number")
	params.SetChannelEndpointSid("YOUR_PHONE_NUMBER_SID")

	resp, err := client.TrusthubV1.CreateCustomerProfileChannelEndpointAssignment("YOUR_BUSINESS_PROFILE_SID",
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

$customer_profiles_channel_endpoint_assignment = $twilio->trusthub->v1
    ->customerProfiles("YOUR_BUSINESS_PROFILE_SID")
    ->customerProfilesChannelEndpointAssignment->create(
        "phone-number", // ChannelEndpointType
        "YOUR_PHONE_NUMBER_SID" // ChannelEndpointSid
    );

print $customer_profiles_channel_endpoint_assignment->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

customer_profiles_channel_endpoint_assignment = @client
                                                .trusthub
                                                .v1
                                                .customer_profiles('YOUR_BUSINESS_PROFILE_SID')
                                                .customer_profiles_channel_endpoint_assignment
                                                .create(
                                                  channel_endpoint_type: 'phone-number',
                                                  channel_endpoint_sid: 'YOUR_PHONE_NUMBER_SID'
                                                )

puts customer_profiles_channel_endpoint_assignment.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trusthub:v1:customer-profiles:channel-endpoint-assignments:create \
   --customer-profile-sid YOUR_BUSINESS_PROFILE_SID \
   --channel-endpoint-type phone-number \
   --channel-endpoint-sid YOUR_PHONE_NUMBER_SID
```

```bash
curl -X POST "https://trusthub.twilio.com/v1/CustomerProfiles/YOUR_BUSINESS_PROFILE_SID/ChannelEndpointAssignments" \
--data-urlencode "ChannelEndpointType=phone-number" \
--data-urlencode "ChannelEndpointSid=YOUR_PHONE_NUMBER_SID" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "RAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "customer_profile_sid": "YOUR_BUSINESS_PROFILE_SID",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "channel_endpoint_sid": "YOUR_PHONE_NUMBER_SID",
  "channel_endpoint_type": "phone-number",
  "date_created": "2019-07-31T02:34:41Z",
  "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments/RAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

3. Create CNAM Trust Product

* **Note**: Do not change the `policy_sid` from the example below. This is a static value that will stay the same across all accounts.
* The response will contain the **SID** for your Trust Product. You'll need this for several other API calls.

Create CNAM Trust Product

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createTrustProduct() {
  const trustProduct = await client.trusthub.v1.trustProducts.create({
    email: "EMAIL@EXAMPLE.COM",
    friendlyName: "FRIENDLY_NAME_FOR_YOUR_TRUST_PRODUCT",
    policySid: "RNf3db3cd1fe25fcfd3c3ded065c8fea53",
  });

  console.log(trustProduct.sid);
}

createTrustProduct();
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

trust_product = client.trusthub.v1.trust_products.create(
    friendly_name="FRIENDLY_NAME_FOR_YOUR_TRUST_PRODUCT",
    email="EMAIL@EXAMPLE.COM",
    policy_sid="RNf3db3cd1fe25fcfd3c3ded065c8fea53",
)

print(trust_product.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Trusthub.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var trustProducts = await TrustProductsResource.CreateAsync(
            friendlyName: "FRIENDLY_NAME_FOR_YOUR_TRUST_PRODUCT",
            email: "EMAIL@EXAMPLE.COM",
            policySid: "RNf3db3cd1fe25fcfd3c3ded065c8fea53");

        Console.WriteLine(trustProducts.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.trusthub.v1.TrustProducts;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        TrustProducts trustProducts =
            TrustProducts
                .creator(
                    "FRIENDLY_NAME_FOR_YOUR_TRUST_PRODUCT", "EMAIL@EXAMPLE.COM", "RNf3db3cd1fe25fcfd3c3ded065c8fea53")
                .create();

        System.out.println(trustProducts.getSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	trusthub "github.com/twilio/twilio-go/rest/trusthub/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &trusthub.CreateTrustProductParams{}
	params.SetFriendlyName("FRIENDLY_NAME_FOR_YOUR_TRUST_PRODUCT")
	params.SetEmail("EMAIL@EXAMPLE.COM")
	params.SetPolicySid("RNf3db3cd1fe25fcfd3c3ded065c8fea53")

	resp, err := client.TrusthubV1.CreateTrustProduct(params)
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

$trust_product = $twilio->trusthub->v1->trustProducts->create(
    "FRIENDLY_NAME_FOR_YOUR_TRUST_PRODUCT", // FriendlyName
    "EMAIL@EXAMPLE.COM", // Email
    "RNf3db3cd1fe25fcfd3c3ded065c8fea53" // PolicySid
);

print $trust_product->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

trust_product = @client
                .trusthub
                .v1
                .trust_products
                .create(
                  friendly_name: 'FRIENDLY_NAME_FOR_YOUR_TRUST_PRODUCT',
                  email: 'EMAIL@EXAMPLE.COM',
                  policy_sid: 'RNf3db3cd1fe25fcfd3c3ded065c8fea53'
                )

puts trust_product.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trusthub:v1:trust-products:create \
   --friendly-name FRIENDLY_NAME_FOR_YOUR_TRUST_PRODUCT \
   --email EMAIL@EXAMPLE.COM \
   --policy-sid RNf3db3cd1fe25fcfd3c3ded065c8fea53
```

```bash
curl -X POST "https://trusthub.twilio.com/v1/TrustProducts" \
--data-urlencode "FriendlyName=FRIENDLY_NAME_FOR_YOUR_TRUST_PRODUCT" \
--data-urlencode "Email=EMAIL@EXAMPLE.COM" \
--data-urlencode "PolicySid=RNf3db3cd1fe25fcfd3c3ded065c8fea53" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "policy_sid": "RNf3db3cd1fe25fcfd3c3ded065c8fea53",
  "friendly_name": "FRIENDLY_NAME_FOR_YOUR_TRUST_PRODUCT",
  "status": "draft",
  "email": "EMAIL@EXAMPLE.COM",
  "status_callback": "http://www.example.com",
  "valid_until": null,
  "date_created": "2019-07-30T22:29:24Z",
  "date_updated": "2019-07-31T01:09:00Z",
  "url": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "trust_products_entity_assignments": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments",
    "trust_products_evaluations": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Evaluations",
    "trust_products_channel_endpoint_assignment": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments"
  },
  "errors": null
}
```

4. Connect your CNAM Trust Product to your Business Profile

* You will need your **Trust Product SID** (returned in the previous API call).
* You'll need your **Business Profile's SID**.

  * To retrieve this SID via API, see the [Additional API Calls section](#additional-api-calls) below.
  * You can also find it in the Trust Hub section of [Twilio Console](https://1console.twilio.com/go?to=/account/__account__/us1/trusthub/compliance-profiles) or the [legacy Console](https://console.twilio.com/us1/account/trust-hub/overview).

Connect your CNAM Trust Product to your Business Profile

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createTrustProductEntityAssignment() {
  const trustProductsEntityAssignment = await client.trusthub.v1
    .trustProducts("YOUR_CNAM_TRUST_PRODUCT_SID")
    .trustProductsEntityAssignments.create({
      objectSid: "YOUR_BUSINESS_PROFILE_SID",
    });

  console.log(trustProductsEntityAssignment.sid);
}

createTrustProductEntityAssignment();
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

trust_products_entity_assignment = client.trusthub.v1.trust_products(
    "YOUR_CNAM_TRUST_PRODUCT_SID"
).trust_products_entity_assignments.create(
    object_sid="YOUR_BUSINESS_PROFILE_SID"
)

print(trust_products_entity_assignment.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Trusthub.V1.TrustProducts;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var trustProductsEntityAssignments =
            await TrustProductsEntityAssignmentsResource.CreateAsync(
                objectSid: "YOUR_BUSINESS_PROFILE_SID",
                pathTrustProductSid: "YOUR_CNAM_TRUST_PRODUCT_SID");

        Console.WriteLine(trustProductsEntityAssignments.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.trusthub.v1.trustproducts.TrustProductsEntityAssignments;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        TrustProductsEntityAssignments trustProductsEntityAssignments =
            TrustProductsEntityAssignments.creator("YOUR_CNAM_TRUST_PRODUCT_SID", "YOUR_BUSINESS_PROFILE_SID").create();

        System.out.println(trustProductsEntityAssignments.getSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	trusthub "github.com/twilio/twilio-go/rest/trusthub/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &trusthub.CreateTrustProductEntityAssignmentParams{}
	params.SetObjectSid("YOUR_BUSINESS_PROFILE_SID")

	resp, err := client.TrusthubV1.CreateTrustProductEntityAssignment("YOUR_CNAM_TRUST_PRODUCT_SID",
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

$trust_products_entity_assignment = $twilio->trusthub->v1
    ->trustProducts("YOUR_CNAM_TRUST_PRODUCT_SID")
    ->trustProductsEntityAssignments->create(
        "YOUR_BUSINESS_PROFILE_SID" // ObjectSid
    );

print $trust_products_entity_assignment->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

trust_products_entity_assignment = @client
                                   .trusthub
                                   .v1
                                   .trust_products('YOUR_CNAM_TRUST_PRODUCT_SID')
                                   .trust_products_entity_assignments
                                   .create(object_sid: 'YOUR_BUSINESS_PROFILE_SID')

puts trust_products_entity_assignment.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trusthub:v1:trust-products:entity-assignments:create \
   --trust-product-sid YOUR_CNAM_TRUST_PRODUCT_SID \
   --object-sid YOUR_BUSINESS_PROFILE_SID
```

```bash
curl -X POST "https://trusthub.twilio.com/v1/TrustProducts/YOUR_CNAM_TRUST_PRODUCT_SID/EntityAssignments" \
--data-urlencode "ObjectSid=YOUR_BUSINESS_PROFILE_SID" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "trust_product_sid": "YOUR_CNAM_TRUST_PRODUCT_SID",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "object_sid": "YOUR_BUSINESS_PROFILE_SID",
  "date_created": "2019-07-31T02:34:41Z",
  "url": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments/BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

5. Create CNAM End User

* **Note**: In the API Call below, don't change the `Type`. It needs to be `cnam_information` to create the proper CNAM End User resource.
* This API call will return the **SID for the End User**. You will need this in the next step.

Create CNAM End User

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createEndUser() {
  const endUser = await client.trusthub.v1.endUsers.create({
    attributes: {
      cnam_display_name: "DISPLAY NAME",
    },
    friendlyName: "YOUR_END_USER_FRIENDLY_NAME",
    type: "cnam_information",
  });

  console.log(endUser.sid);
}

createEndUser();
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

end_user = client.trusthub.v1.end_users.create(
    friendly_name="YOUR_END_USER_FRIENDLY_NAME",
    attributes={"cnam_display_name": "DISPLAY NAME"},
    type="cnam_information",
)

print(end_user.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Trusthub.V1;
using System.Threading.Tasks;
using System.Collections.Generic;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var endUser = await EndUserResource.CreateAsync(
            friendlyName: "YOUR_END_USER_FRIENDLY_NAME",
            attributes: new Dictionary<
                string,
                Object>() { { "cnam_display_name", "DISPLAY NAME" } },
            type: "cnam_information");

        Console.WriteLine(endUser.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.util.HashMap;
import com.twilio.Twilio;
import com.twilio.rest.trusthub.v1.EndUser;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        EndUser endUser = EndUser.creator("YOUR_END_USER_FRIENDLY_NAME", "cnam_information")
                              .setAttributes(new HashMap<String, Object>() {
                                  {
                                      put("cnam_display_name", "DISPLAY NAME");
                                  }
                              })
                              .create();

        System.out.println(endUser.getSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	trusthub "github.com/twilio/twilio-go/rest/trusthub/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &trusthub.CreateEndUserParams{}
	params.SetFriendlyName("YOUR_END_USER_FRIENDLY_NAME")
	params.SetAttributes(map[string]interface{}{
		"cnam_display_name": "DISPLAY NAME",
	})
	params.SetType("cnam_information")

	resp, err := client.TrusthubV1.CreateEndUser(params)
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

$end_user = $twilio->trusthub->v1->endUsers->create(
    "YOUR_END_USER_FRIENDLY_NAME", // FriendlyName
    "cnam_information", // Type
    [
        "attributes" => [
            "cnam_display_name" => "DISPLAY NAME",
        ],
    ]
);

print $end_user->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

end_user = @client
           .trusthub
           .v1
           .end_users
           .create(
             friendly_name: 'YOUR_END_USER_FRIENDLY_NAME',
             attributes: {
               'cnam_display_name' => 'DISPLAY NAME'
             },
             type: 'cnam_information'
           )

puts end_user.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trusthub:v1:end-users:create \
   --friendly-name YOUR_END_USER_FRIENDLY_NAME \
   --attributes "{\"cnam_display_name\":\"DISPLAY NAME\"}" \
   --type cnam_information
```

```bash
ATTRIBUTES_OBJ=$(cat << EOF
{
  "cnam_display_name": "DISPLAY NAME"
}
EOF
)
curl -X POST "https://trusthub.twilio.com/v1/EndUsers" \
--data-urlencode "FriendlyName=YOUR_END_USER_FRIENDLY_NAME" \
--data-urlencode "Attributes=$ATTRIBUTES_OBJ" \
--data-urlencode "Type=cnam_information" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "date_updated": "2021-02-16T20:40:57Z",
  "sid": "ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "YOUR_END_USER_FRIENDLY_NAME",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://trusthub.twilio.com/v1/EndUsers/ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2021-02-16T20:40:57Z",
  "attributes": {
    "cnam_display_name": "DISPLAY NAME"
  },
  "type": "cnam_information"
}
```

6. Connect your CNAM Trust Product to your End User

* You will need the **End User SID** from the previous step.
* You will also need the **CNAM Trust Product SID**, returned from the API call in Step 3

  * To retrieve this SID using the API, see the [Additional API Calls section](#additional-api-calls) below.

Connect your CNAM Trust Product to your End User

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createTrustProductEntityAssignment() {
  const trustProductsEntityAssignment = await client.trusthub.v1
    .trustProducts("YOUR_CNAM_TRUST_PRODUCT_SID")
    .trustProductsEntityAssignments.create({
      objectSid: "YOUR_CNAM_END_USER_SID",
    });

  console.log(trustProductsEntityAssignment.sid);
}

createTrustProductEntityAssignment();
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

trust_products_entity_assignment = client.trusthub.v1.trust_products(
    "YOUR_CNAM_TRUST_PRODUCT_SID"
).trust_products_entity_assignments.create(object_sid="YOUR_CNAM_END_USER_SID")

print(trust_products_entity_assignment.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Trusthub.V1.TrustProducts;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var trustProductsEntityAssignments =
            await TrustProductsEntityAssignmentsResource.CreateAsync(
                objectSid: "YOUR_CNAM_END_USER_SID",
                pathTrustProductSid: "YOUR_CNAM_TRUST_PRODUCT_SID");

        Console.WriteLine(trustProductsEntityAssignments.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.trusthub.v1.trustproducts.TrustProductsEntityAssignments;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        TrustProductsEntityAssignments trustProductsEntityAssignments =
            TrustProductsEntityAssignments.creator("YOUR_CNAM_TRUST_PRODUCT_SID", "YOUR_CNAM_END_USER_SID").create();

        System.out.println(trustProductsEntityAssignments.getSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	trusthub "github.com/twilio/twilio-go/rest/trusthub/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &trusthub.CreateTrustProductEntityAssignmentParams{}
	params.SetObjectSid("YOUR_CNAM_END_USER_SID")

	resp, err := client.TrusthubV1.CreateTrustProductEntityAssignment("YOUR_CNAM_TRUST_PRODUCT_SID",
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

$trust_products_entity_assignment = $twilio->trusthub->v1
    ->trustProducts("YOUR_CNAM_TRUST_PRODUCT_SID")
    ->trustProductsEntityAssignments->create(
        "YOUR_CNAM_END_USER_SID" // ObjectSid
    );

print $trust_products_entity_assignment->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

trust_products_entity_assignment = @client
                                   .trusthub
                                   .v1
                                   .trust_products('YOUR_CNAM_TRUST_PRODUCT_SID')
                                   .trust_products_entity_assignments
                                   .create(object_sid: 'YOUR_CNAM_END_USER_SID')

puts trust_products_entity_assignment.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trusthub:v1:trust-products:entity-assignments:create \
   --trust-product-sid YOUR_CNAM_TRUST_PRODUCT_SID \
   --object-sid YOUR_CNAM_END_USER_SID
```

```bash
curl -X POST "https://trusthub.twilio.com/v1/TrustProducts/YOUR_CNAM_TRUST_PRODUCT_SID/EntityAssignments" \
--data-urlencode "ObjectSid=YOUR_CNAM_END_USER_SID" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "trust_product_sid": "YOUR_CNAM_TRUST_PRODUCT_SID",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "object_sid": "YOUR_CNAM_END_USER_SID",
  "date_created": "2019-07-31T02:34:41Z",
  "url": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments/BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

7. Add Phone Number to CNAM Trust Product

* You'll need the **CNAM Trust Product SID**, returned from the API call in Step 3
* You'll need the **Phone Number SID(s)** you assigned to your Business Profile earlier. (**Note**: Only those phone numbers already assigned to your **Business Profile** are eligible)
* You'll need your **Business Profile SID**. It starts with "BU".
* To retrieve any of these SIDs using the API, see the [Additional API Calls section](#additional-api-calls) below.
* **Note**: Don't change the `ChannelEndpointType`

Assign Phone Numbers to your CNAM Trust Product

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createTrustProductChannelEndpointAssignment() {
  const trustProductsChannelEndpointAssignment = await client.trusthub.v1
    .trustProducts("YOUR_CNAM_TRUST_PRODUCT_SID")
    .trustProductsChannelEndpointAssignment.create({
      channelEndpointSid: "YOUR_PHONE_NUMBER_SID",
      channelEndpointType: "phone-number",
    });

  console.log(trustProductsChannelEndpointAssignment.sid);
}

createTrustProductChannelEndpointAssignment();
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

trust_products_channel_endpoint_assignment = client.trusthub.v1.trust_products(
    "YOUR_CNAM_TRUST_PRODUCT_SID"
).trust_products_channel_endpoint_assignment.create(
    channel_endpoint_sid="YOUR_PHONE_NUMBER_SID",
    channel_endpoint_type="phone-number",
)

print(trust_products_channel_endpoint_assignment.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Trusthub.V1.TrustProducts;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var trustProductsChannelEndpointAssignment =
            await TrustProductsChannelEndpointAssignmentResource.CreateAsync(
                channelEndpointSid: "YOUR_PHONE_NUMBER_SID",
                channelEndpointType: "phone-number",
                pathTrustProductSid: "YOUR_CNAM_TRUST_PRODUCT_SID");

        Console.WriteLine(trustProductsChannelEndpointAssignment.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.trusthub.v1.trustproducts.TrustProductsChannelEndpointAssignment;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        TrustProductsChannelEndpointAssignment trustProductsChannelEndpointAssignment =
            TrustProductsChannelEndpointAssignment
                .creator("YOUR_CNAM_TRUST_PRODUCT_SID", "phone-number", "YOUR_PHONE_NUMBER_SID")
                .create();

        System.out.println(trustProductsChannelEndpointAssignment.getSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	trusthub "github.com/twilio/twilio-go/rest/trusthub/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &trusthub.CreateTrustProductChannelEndpointAssignmentParams{}
	params.SetChannelEndpointSid("YOUR_PHONE_NUMBER_SID")
	params.SetChannelEndpointType("phone-number")

	resp, err := client.TrusthubV1.CreateTrustProductChannelEndpointAssignment("YOUR_CNAM_TRUST_PRODUCT_SID",
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

$trust_products_channel_endpoint_assignment = $twilio->trusthub->v1
    ->trustProducts("YOUR_CNAM_TRUST_PRODUCT_SID")
    ->trustProductsChannelEndpointAssignment->create(
        "phone-number", // ChannelEndpointType
        "YOUR_PHONE_NUMBER_SID" // ChannelEndpointSid
    );

print $trust_products_channel_endpoint_assignment->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

trust_products_channel_endpoint_assignment = @client
                                             .trusthub
                                             .v1
                                             .trust_products('YOUR_CNAM_TRUST_PRODUCT_SID')
                                             .trust_products_channel_endpoint_assignment
                                             .create(
                                               channel_endpoint_sid: 'YOUR_PHONE_NUMBER_SID',
                                               channel_endpoint_type: 'phone-number'
                                             )

puts trust_products_channel_endpoint_assignment.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trusthub:v1:trust-products:channel-endpoint-assignments:create \
   --trust-product-sid YOUR_CNAM_TRUST_PRODUCT_SID \
   --channel-endpoint-sid YOUR_PHONE_NUMBER_SID \
   --channel-endpoint-type phone-number
```

```bash
curl -X POST "https://trusthub.twilio.com/v1/TrustProducts/YOUR_CNAM_TRUST_PRODUCT_SID/ChannelEndpointAssignments" \
--data-urlencode "ChannelEndpointSid=YOUR_PHONE_NUMBER_SID" \
--data-urlencode "ChannelEndpointType=phone-number" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "RAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "trust_product_sid": "YOUR_CNAM_TRUST_PRODUCT_SID",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "channel_endpoint_sid": "YOUR_PHONE_NUMBER_SID",
  "channel_endpoint_type": "phone-number",
  "date_created": "2019-07-31T02:34:41Z",
  "url": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments/RAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

8. Submit CNAM Trust Product

Submit CNAM Trust Product for Vetting

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateTrustProduct() {
  const trustProduct = await client.trusthub.v1
    .trustProducts("YOUR_CNAM_TRUST_PRODUCT_SID")
    .update({ status: "pending-review" });

  console.log(trustProduct.sid);
}

updateTrustProduct();
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

trust_product = client.trusthub.v1.trust_products(
    "YOUR_CNAM_TRUST_PRODUCT_SID"
).update(status="pending-review")

print(trust_product.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Trusthub.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var trustProducts = await TrustProductsResource.UpdateAsync(
            status: TrustProductsResource.StatusEnum.PendingReview,
            pathSid: "YOUR_CNAM_TRUST_PRODUCT_SID");

        Console.WriteLine(trustProducts.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.trusthub.v1.TrustProducts;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        TrustProducts trustProducts = TrustProducts.updater("YOUR_CNAM_TRUST_PRODUCT_SID")
                                          .setStatus(TrustProducts.Status.PENDING_REVIEW)
                                          .update();

        System.out.println(trustProducts.getSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	trusthub "github.com/twilio/twilio-go/rest/trusthub/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &trusthub.UpdateTrustProductParams{}
	params.SetStatus("pending-review")

	resp, err := client.TrusthubV1.UpdateTrustProduct("YOUR_CNAM_TRUST_PRODUCT_SID",
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

$trust_product = $twilio->trusthub->v1
    ->trustProducts("YOUR_CNAM_TRUST_PRODUCT_SID")
    ->update(["status" => "pending-review"]);

print $trust_product->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

trust_product = @client
                .trusthub
                .v1
                .trust_products('YOUR_CNAM_TRUST_PRODUCT_SID')
                .update(status: 'pending-review')

puts trust_product.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trusthub:v1:trust-products:update \
   --sid YOUR_CNAM_TRUST_PRODUCT_SID \
   --status pending-review
```

```bash
curl -X POST "https://trusthub.twilio.com/v1/TrustProducts/YOUR_CNAM_TRUST_PRODUCT_SID" \
--data-urlencode "Status=pending-review" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "YOUR_CNAM_TRUST_PRODUCT_SID",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "policy_sid": "RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "friendly_name",
  "status": "pending-review",
  "email": "notification@email.com",
  "status_callback": "http://www.example.com",
  "valid_until": null,
  "date_created": "2019-07-30T22:29:24Z",
  "date_updated": "2019-07-31T01:09:00Z",
  "url": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "trust_products_entity_assignments": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments",
    "trust_products_evaluations": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Evaluations",
    "trust_products_channel_endpoint_assignment": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments"
  },
  "errors": null
}
```

Learn more about Business Profiles and other Trust Products in the [Trust Hub Docs](/docs/trust-hub).

> \[!NOTE]
>
> After your CNAM Trust Product reaches "Twilio-Approved", the display name may
> take 48-72 hours to propagate to all carriers in the United States.

## Additional API Calls

Get Phone Number SIDs from Parent Account

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listIncomingPhoneNumber() {
  const incomingPhoneNumbers = await client.incomingPhoneNumbers.list({
    limit: 20,
  });

  incomingPhoneNumbers.forEach((i) => console.log(i.end));
}

listIncomingPhoneNumber();
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

incoming_phone_numbers = client.incoming_phone_numbers.list(limit=20)

for record in incoming_phone_numbers:
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

        var incomingPhoneNumbers = await IncomingPhoneNumberResource.ReadAsync(limit: 20);

        foreach (var record in incomingPhoneNumbers) {
            Console.WriteLine(record.End);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.IncomingPhoneNumber;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<IncomingPhoneNumber> incomingPhoneNumbers = IncomingPhoneNumber.reader().limit(20).read();

        for (IncomingPhoneNumber record : incomingPhoneNumbers) {
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

	params := &api.ListIncomingPhoneNumberParams{}
	params.SetLimit(20)

	resp, err := client.Api.ListIncomingPhoneNumber(params)
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

$incomingPhoneNumbers = $twilio->incomingPhoneNumbers->read([], 20);

foreach ($incomingPhoneNumbers as $record) {
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

incoming_phone_numbers = @client
                         .api
                         .v2010
                         .incoming_phone_numbers
                         .list(limit: 20)

incoming_phone_numbers.each do |record|
   puts record.end
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:incoming-phone-numbers:list
```

```bash
curl -X GET "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/IncomingPhoneNumbers.json?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "end": 0,
  "first_page_uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IncomingPhoneNumbers.json?FriendlyName=friendly_name&Beta=true&PhoneNumber=%2B19876543210&PageSize=50&Page=0",
  "incoming_phone_numbers": [
    {
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "address_requirements": "none",
      "address_sid": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "api_version": "2010-04-01",
      "beta": null,
      "capabilities": {
        "voice": true,
        "sms": false,
        "mms": true,
        "fax": false
      },
      "date_created": "Thu, 30 Jul 2015 23:19:04 +0000",
      "date_updated": "Thu, 30 Jul 2015 23:19:04 +0000",
      "emergency_status": "Active",
      "emergency_address_sid": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "emergency_address_status": "registered",
      "friendly_name": "(808) 925-5327",
      "identity_sid": "RIaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "origin": "origin",
      "phone_number": "+18089255327",
      "sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "sms_application_sid": "",
      "sms_fallback_method": "POST",
      "sms_fallback_url": "",
      "sms_method": "POST",
      "sms_url": "",
      "status_callback": "",
      "status_callback_method": "POST",
      "trunk_sid": null,
      "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IncomingPhoneNumbers/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
      "voice_application_sid": "",
      "voice_caller_id_lookup": false,
      "voice_fallback_method": "POST",
      "voice_fallback_url": null,
      "voice_method": "POST",
      "voice_url": null,
      "bundle_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "voice_receive_mode": "voice",
      "status": "in-use",
      "type": "local"
    }
  ],
  "next_page_uri": null,
  "page": 0,
  "page_size": 50,
  "previous_page_uri": null,
  "start": 0,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/IncomingPhoneNumbers.json?FriendlyName=friendly_name&Beta=true&PhoneNumber=%2B19876543210&PageSize=50&Page=0"
}
```

Check Business Profile Phone Number Assignments

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listCustomerProfileChannelEndpointAssignment() {
  const customerProfilesChannelEndpointAssignments = await client.trusthub.v1
    .customerProfiles("YOUR_BUSINESS_PROFILE_SID")
    .customerProfilesChannelEndpointAssignment.list({ limit: 20 });

  customerProfilesChannelEndpointAssignments.forEach((c) => console.log(c.sid));
}

listCustomerProfileChannelEndpointAssignment();
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

customer_profiles_channel_endpoint_assignments = (
    client.trusthub.v1.customer_profiles(
        "YOUR_BUSINESS_PROFILE_SID"
    ).customer_profiles_channel_endpoint_assignment.list(limit=20)
)

for record in customer_profiles_channel_endpoint_assignments:
    print(record.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Trusthub.V1.CustomerProfiles;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var customerProfilesChannelEndpointAssignments =
            await CustomerProfilesChannelEndpointAssignmentResource.ReadAsync(
                pathCustomerProfileSid: "YOUR_BUSINESS_PROFILE_SID", limit: 20);

        foreach (var record in customerProfilesChannelEndpointAssignments) {
            Console.WriteLine(record.Sid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.trusthub.v1.customerprofiles.CustomerProfilesChannelEndpointAssignment;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<CustomerProfilesChannelEndpointAssignment> customerProfilesChannelEndpointAssignments =
            CustomerProfilesChannelEndpointAssignment.reader("YOUR_BUSINESS_PROFILE_SID").limit(20).read();

        for (CustomerProfilesChannelEndpointAssignment record : customerProfilesChannelEndpointAssignments) {
            System.out.println(record.getSid());
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
	trusthub "github.com/twilio/twilio-go/rest/trusthub/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &trusthub.ListCustomerProfileChannelEndpointAssignmentParams{}
	params.SetLimit(20)

	resp, err := client.TrusthubV1.ListCustomerProfileChannelEndpointAssignment("YOUR_BUSINESS_PROFILE_SID",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].Sid != nil {
				fmt.Println(*resp[record].Sid)
			} else {
				fmt.Println(resp[record].Sid)
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

$customerProfilesChannelEndpointAssignments = $twilio->trusthub->v1
    ->customerProfiles("YOUR_BUSINESS_PROFILE_SID")
    ->customerProfilesChannelEndpointAssignment->read([], 20);

foreach ($customerProfilesChannelEndpointAssignments as $record) {
    print $record->sid;
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

customer_profiles_channel_endpoint_assignments = @client
                                                 .trusthub
                                                 .v1
                                                 .customer_profiles('YOUR_BUSINESS_PROFILE_SID')
                                                 .customer_profiles_channel_endpoint_assignment
                                                 .list(limit: 20)

customer_profiles_channel_endpoint_assignments.each do |record|
   puts record.sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trusthub:v1:customer-profiles:channel-endpoint-assignments:list \
   --customer-profile-sid YOUR_BUSINESS_PROFILE_SID
```

```bash
curl -X GET "https://trusthub.twilio.com/v1/CustomerProfiles/YOUR_BUSINESS_PROFILE_SID/ChannelEndpointAssignments?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "results": [
    {
      "sid": "RAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "customer_profile_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "channel_endpoint_sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "channel_endpoint_type": "phone-number",
      "date_created": "2019-07-31T02:34:41Z",
      "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments/RAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments?ChannelEndpointSid=PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments?ChannelEndpointSid=PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=50&Page=0",
    "next_page_url": null,
    "key": "results"
  }
}
```

Get Business Profile SIDs

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listCustomerProfile() {
  const customerProfiles = await client.trusthub.v1.customerProfiles.list({
    limit: 20,
  });

  customerProfiles.forEach((c) => console.log(c.sid));
}

listCustomerProfile();
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

customer_profiles = client.trusthub.v1.customer_profiles.list(limit=20)

for record in customer_profiles:
    print(record.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Trusthub.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var customerProfiles = await CustomerProfilesResource.ReadAsync(limit: 20);

        foreach (var record in customerProfiles) {
            Console.WriteLine(record.Sid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.trusthub.v1.CustomerProfiles;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<CustomerProfiles> customerProfiles = CustomerProfiles.reader().limit(20).read();

        for (CustomerProfiles record : customerProfiles) {
            System.out.println(record.getSid());
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
	trusthub "github.com/twilio/twilio-go/rest/trusthub/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &trusthub.ListCustomerProfileParams{}
	params.SetLimit(20)

	resp, err := client.TrusthubV1.ListCustomerProfile(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].Sid != nil {
				fmt.Println(*resp[record].Sid)
			} else {
				fmt.Println(resp[record].Sid)
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

$customerProfiles = $twilio->trusthub->v1->customerProfiles->read([], 20);

foreach ($customerProfiles as $record) {
    print $record->sid;
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

customer_profiles = @client
                    .trusthub
                    .v1
                    .customer_profiles
                    .list(limit: 20)

customer_profiles.each do |record|
   puts record.sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trusthub:v1:customer-profiles:list
```

```bash
curl -X GET "https://trusthub.twilio.com/v1/CustomerProfiles?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "results": [
    {
      "sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "policy_sid": "RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "friendly_name": "friendly_name",
      "status": "twilio-approved",
      "email": "notification@email.com",
      "status_callback": "http://www.example.com",
      "valid_until": "2020-07-31T01:00:00Z",
      "date_created": "2019-07-30T22:29:24Z",
      "date_updated": "2019-07-31T01:09:00Z",
      "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "links": {
        "customer_profiles_entity_assignments": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments",
        "customer_profiles_evaluations": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Evaluations",
        "customer_profiles_channel_endpoint_assignment": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments"
      },
      "errors": [
        {
          "code": 18601
        }
      ]
    }
  ],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://trusthub.twilio.com/v1/CustomerProfiles?Status=draft&FriendlyName=friendly_name&PolicySid=RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://trusthub.twilio.com/v1/CustomerProfiles?Status=draft&FriendlyName=friendly_name&PolicySid=RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=50&Page=0",
    "next_page_url": null,
    "key": "results"
  }
}
```

Check Business Profile Phone Number Assignments

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listCustomerProfileChannelEndpointAssignment() {
  const customerProfilesChannelEndpointAssignments = await client.trusthub.v1
    .customerProfiles("YOUR_BUSINESS_PROFILE_SID")
    .customerProfilesChannelEndpointAssignment.list({ limit: 20 });

  customerProfilesChannelEndpointAssignments.forEach((c) => console.log(c.sid));
}

listCustomerProfileChannelEndpointAssignment();
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

customer_profiles_channel_endpoint_assignments = (
    client.trusthub.v1.customer_profiles(
        "YOUR_BUSINESS_PROFILE_SID"
    ).customer_profiles_channel_endpoint_assignment.list(limit=20)
)

for record in customer_profiles_channel_endpoint_assignments:
    print(record.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Trusthub.V1.CustomerProfiles;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var customerProfilesChannelEndpointAssignments =
            await CustomerProfilesChannelEndpointAssignmentResource.ReadAsync(
                pathCustomerProfileSid: "YOUR_BUSINESS_PROFILE_SID", limit: 20);

        foreach (var record in customerProfilesChannelEndpointAssignments) {
            Console.WriteLine(record.Sid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.trusthub.v1.customerprofiles.CustomerProfilesChannelEndpointAssignment;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<CustomerProfilesChannelEndpointAssignment> customerProfilesChannelEndpointAssignments =
            CustomerProfilesChannelEndpointAssignment.reader("YOUR_BUSINESS_PROFILE_SID").limit(20).read();

        for (CustomerProfilesChannelEndpointAssignment record : customerProfilesChannelEndpointAssignments) {
            System.out.println(record.getSid());
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
	trusthub "github.com/twilio/twilio-go/rest/trusthub/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &trusthub.ListCustomerProfileChannelEndpointAssignmentParams{}
	params.SetLimit(20)

	resp, err := client.TrusthubV1.ListCustomerProfileChannelEndpointAssignment("YOUR_BUSINESS_PROFILE_SID",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].Sid != nil {
				fmt.Println(*resp[record].Sid)
			} else {
				fmt.Println(resp[record].Sid)
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

$customerProfilesChannelEndpointAssignments = $twilio->trusthub->v1
    ->customerProfiles("YOUR_BUSINESS_PROFILE_SID")
    ->customerProfilesChannelEndpointAssignment->read([], 20);

foreach ($customerProfilesChannelEndpointAssignments as $record) {
    print $record->sid;
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

customer_profiles_channel_endpoint_assignments = @client
                                                 .trusthub
                                                 .v1
                                                 .customer_profiles('YOUR_BUSINESS_PROFILE_SID')
                                                 .customer_profiles_channel_endpoint_assignment
                                                 .list(limit: 20)

customer_profiles_channel_endpoint_assignments.each do |record|
   puts record.sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trusthub:v1:customer-profiles:channel-endpoint-assignments:list \
   --customer-profile-sid YOUR_BUSINESS_PROFILE_SID
```

```bash
curl -X GET "https://trusthub.twilio.com/v1/CustomerProfiles/YOUR_BUSINESS_PROFILE_SID/ChannelEndpointAssignments?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "results": [
    {
      "sid": "RAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "customer_profile_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "channel_endpoint_sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "channel_endpoint_type": "phone-number",
      "date_created": "2019-07-31T02:34:41Z",
      "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments/RAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments?ChannelEndpointSid=PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments?ChannelEndpointSid=PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=50&Page=0",
    "next_page_url": null,
    "key": "results"
  }
}
```

Fetch Trust Product SIDs

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listTrustProduct() {
  const trustProducts = await client.trusthub.v1.trustProducts.list({
    limit: 20,
  });

  trustProducts.forEach((t) => console.log(t.sid));
}

listTrustProduct();
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

trust_products = client.trusthub.v1.trust_products.list(limit=20)

for record in trust_products:
    print(record.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Trusthub.V1;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var trustProducts = await TrustProductsResource.ReadAsync(limit: 20);

        foreach (var record in trustProducts) {
            Console.WriteLine(record.Sid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.trusthub.v1.TrustProducts;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<TrustProducts> trustProducts = TrustProducts.reader().limit(20).read();

        for (TrustProducts record : trustProducts) {
            System.out.println(record.getSid());
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
	trusthub "github.com/twilio/twilio-go/rest/trusthub/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &trusthub.ListTrustProductParams{}
	params.SetLimit(20)

	resp, err := client.TrusthubV1.ListTrustProduct(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].Sid != nil {
				fmt.Println(*resp[record].Sid)
			} else {
				fmt.Println(resp[record].Sid)
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

$trustProducts = $twilio->trusthub->v1->trustProducts->read([], 20);

foreach ($trustProducts as $record) {
    print $record->sid;
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

trust_products = @client
                 .trusthub
                 .v1
                 .trust_products
                 .list(limit: 20)

trust_products.each do |record|
   puts record.sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trusthub:v1:trust-products:list
```

```bash
curl -X GET "https://trusthub.twilio.com/v1/TrustProducts?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "results": [
    {
      "sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "policy_sid": "RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "friendly_name": "friendly_name",
      "status": "twilio-approved",
      "email": "notification@email.com",
      "status_callback": "http://www.example.com",
      "valid_until": "2020-07-31T01:00:00Z",
      "date_created": "2019-07-30T22:29:24Z",
      "date_updated": "2019-07-31T01:09:00Z",
      "url": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "links": {
        "trust_products_entity_assignments": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments",
        "trust_products_evaluations": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Evaluations",
        "trust_products_channel_endpoint_assignment": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments"
      },
      "errors": null
    }
  ],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://trusthub.twilio.com/v1/TrustProducts?Status=draft&FriendlyName=friendly_name&PolicySid=RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://trusthub.twilio.com/v1/TrustProducts?Status=draft&FriendlyName=friendly_name&PolicySid=RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=50&Page=0",
    "next_page_url": null,
    "key": "results"
  }
}
```

Check CNAM Phone Number Assignments

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function listTrustProductChannelEndpointAssignment() {
  const trustProductsChannelEndpointAssignments = await client.trusthub.v1
    .trustProducts("YOUR_CNAM_TRUST_PRODUCT_SID")
    .trustProductsChannelEndpointAssignment.list({ limit: 20 });

  trustProductsChannelEndpointAssignments.forEach((t) => console.log(t.sid));
}

listTrustProductChannelEndpointAssignment();
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

trust_products_channel_endpoint_assignments = client.trusthub.v1.trust_products(
    "YOUR_CNAM_TRUST_PRODUCT_SID"
).trust_products_channel_endpoint_assignment.list(limit=20)

for record in trust_products_channel_endpoint_assignments:
    print(record.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Trusthub.V1.TrustProducts;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var trustProductsChannelEndpointAssignments =
            await TrustProductsChannelEndpointAssignmentResource.ReadAsync(
                pathTrustProductSid: "YOUR_CNAM_TRUST_PRODUCT_SID", limit: 20);

        foreach (var record in trustProductsChannelEndpointAssignments) {
            Console.WriteLine(record.Sid);
        }
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.trusthub.v1.trustproducts.TrustProductsChannelEndpointAssignment;
import com.twilio.base.ResourceSet;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        ResourceSet<TrustProductsChannelEndpointAssignment> trustProductsChannelEndpointAssignments =
            TrustProductsChannelEndpointAssignment.reader("YOUR_CNAM_TRUST_PRODUCT_SID").limit(20).read();

        for (TrustProductsChannelEndpointAssignment record : trustProductsChannelEndpointAssignments) {
            System.out.println(record.getSid());
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
	trusthub "github.com/twilio/twilio-go/rest/trusthub/v1"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &trusthub.ListTrustProductChannelEndpointAssignmentParams{}
	params.SetLimit(20)

	resp, err := client.TrusthubV1.ListTrustProductChannelEndpointAssignment("YOUR_CNAM_TRUST_PRODUCT_SID",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		for record := range resp {
			if resp[record].Sid != nil {
				fmt.Println(*resp[record].Sid)
			} else {
				fmt.Println(resp[record].Sid)
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

$trustProductsChannelEndpointAssignments = $twilio->trusthub->v1
    ->trustProducts("YOUR_CNAM_TRUST_PRODUCT_SID")
    ->trustProductsChannelEndpointAssignment->read([], 20);

foreach ($trustProductsChannelEndpointAssignments as $record) {
    print $record->sid;
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

trust_products_channel_endpoint_assignments = @client
                                              .trusthub
                                              .v1
                                              .trust_products('YOUR_CNAM_TRUST_PRODUCT_SID')
                                              .trust_products_channel_endpoint_assignment
                                              .list(limit: 20)

trust_products_channel_endpoint_assignments.each do |record|
   puts record.sid
end
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trusthub:v1:trust-products:channel-endpoint-assignments:list \
   --trust-product-sid YOUR_CNAM_TRUST_PRODUCT_SID
```

```bash
curl -X GET "https://trusthub.twilio.com/v1/TrustProducts/YOUR_CNAM_TRUST_PRODUCT_SID/ChannelEndpointAssignments?PageSize=20" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "results": [
    {
      "sid": "RAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "trust_product_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "channel_endpoint_sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "channel_endpoint_type": "phone-number",
      "date_created": "2019-07-31T02:34:41Z",
      "url": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments/RAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ],
  "meta": {
    "page": 0,
    "page_size": 50,
    "first_page_url": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments?ChannelEndpointSid=PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=50&Page=0",
    "previous_page_url": null,
    "url": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments?ChannelEndpointSid=PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa&PageSize=50&Page=0",
    "next_page_url": null,
    "key": "results"
  }
}
```
