# A2P 10DLC - Standard and Low-Volume Standard Brand Onboarding Guide for ISVs

This is a step-by-step walkthrough for Independent Software Vendors (ISVs) who want to use Twilio REST API to register a customer. This guide covers registering a [Standard Brand or Low-Volume Brand](/docs/messaging/compliance/a2p-10dlc#determine-your-brand-type) for A2P 10DLC.

Not sure if you're an ISV? Check out the [Determine your customer type section on the A2P 10DLC Overview Page](/docs/messaging/compliance/a2p-10dlc#determine-your-customer-type).

The onboarding process involves the following main steps:

* Provide Twilio with your customer's business and contact information.
* Create a Brand Registration for your customer that will be evaluated by The Campaign Registry (TCR).
* Create a Campaign/Use Case for your customer that will be evaluated by TCR.

## Before you begin

This section covers the prerequisite steps you need to complete before attempting to register your customer for A2P 10DLC via API.

### Gather customer information

Twilio and TCR need specific information about your customer's business to register for A2P 10DLC.

Visit the [A2P 10DLC - Gather Business Information page](/docs/messaging/compliance/a2p-10dlc/collect-business-info) to learn which information you need to collect from your customers.

### Update your SDK

If you plan to use one of the SDKs for this registration process, be sure you're using the [latest version](/docs/libraries).

### Create a Primary Business Profile for your parent Twilio Account

Before onboarding your customers, you must have a Primary Business Profile with a `Twilio Approved` status.

Create your Primary Business Profile in the [Trust Hub in the Console](https://console.twilio.com/us1/account/trust-hub/customer-profiles). Select `ISV Reseller or Partner` as your **Business Type**.

Make note of your Primary Business Profile SID. You need it in later steps in this guide.

### Use the correct Account SID

When making the API requests in this guide, use the **Twilio Account SID** and **Auth Token** for the Account your customer will use for A2P 10DLC messaging.

## Provide Twilio with your customer's business information

The API requests in this section use the TrustHub API to create a Secondary Customer Profile. This is a collection of contact details and business information about your customer's business, similar to the Primary Business Profile you created earlier.

In Step 1.1 below, you create a CustomerProfile resource (this is the "Secondary Customer Profile").

In Steps 1.2-1.7 below, you create additional resources that contain business information, and then you attach these resources to the CustomerProfile resource.

After attaching all required information to the CustomerProfile, you can check and submit the Secondary Customer Profile for review (Steps 1.9 and 1.10, respectively).

### 1.1. Create a Secondary Customer Profile

This step creates a CustomerProfile resource for your customer's business.

> \[!NOTE]
>
> If you've already registered customers within TrustHub for SHAKEN/STIR, Branded Calls, or CNAM, your customer may already have a Secondary Customer Profile.
>
> You can check for Secondary Customer Profiles in the Console (**Account**  > **Customer Profiles**). You can use the TrustHub REST API [list all CustomerProfile resources associated with your Account](/docs/trust-hub/trusthub-rest-api/customer-profiles#read-multiple-customerprofile-resources).

* Save the `sid` in the response to this request. This is the SID of the Secondary Customer Profile that you need in subsequent steps.
* Do not change the `policy_sid` in the API request below. This is the [Policy](/docs/trust-hub/trusthub-rest-api#policies-resource) (rule set) that defines which information is required for a CustomerProfile.
* The `friendly_name` is an internal identifier for this Customer Profile. Use a descriptive name that you understand, e.g., "Acme, Inc. Secondary Customer Profile".
* The `email` parameter is the email address that will receive updates when the CustomerProfile resource's `status` changes. **This should not be your customer's email address.** This is an email address that you (as the ISV) own, since you need to monitor this CustomerProfile resource's `status` as part of the onboarding process.
* The `status_callback` parameter is optional. This is the URL to which Twilio sends updates regarding this CustomerProfile's `status`.

Create a Secondary Customer Profile

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createCustomerProfile() {
  const customerProfile = await client.trusthub.v1.customerProfiles.create({
    email: "acme-inc@example.com",
    friendlyName: "Acme, Inc. Secondary Customer Profile",
    policySid: "RNdfbf3fae0e1107f8aded0e7cead80bf5",
    statusCallback: "https://www.example.com/status-callback-endpoint",
  });

  console.log(customerProfile.sid);
}

createCustomerProfile();
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

customer_profile = client.trusthub.v1.customer_profiles.create(
    policy_sid="RNdfbf3fae0e1107f8aded0e7cead80bf5",
    friendly_name="Acme, Inc. Secondary Customer Profile",
    email="acme-inc@example.com",
    status_callback="https://www.example.com/status-callback-endpoint",
)

print(customer_profile.sid)
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

        var customerProfiles = await CustomerProfilesResource.CreateAsync(
            policySid: "RNdfbf3fae0e1107f8aded0e7cead80bf5",
            friendlyName: "Acme, Inc. Secondary Customer Profile",
            email: "acme-inc@example.com",
            statusCallback: new Uri("https://www.example.com/status-callback-endpoint"));

        Console.WriteLine(customerProfiles.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.net.URI;
import com.twilio.Twilio;
import com.twilio.rest.trusthub.v1.CustomerProfiles;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        CustomerProfiles customerProfiles =
            CustomerProfiles
                .creator("Acme, Inc. Secondary Customer Profile",
                    "acme-inc@example.com",
                    "RNdfbf3fae0e1107f8aded0e7cead80bf5")
                .setStatusCallback(URI.create("https://www.example.com/status-callback-endpoint"))
                .create();

        System.out.println(customerProfiles.getSid());
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

	params := &trusthub.CreateCustomerProfileParams{}
	params.SetPolicySid("RNdfbf3fae0e1107f8aded0e7cead80bf5")
	params.SetFriendlyName("Acme, Inc. Secondary Customer Profile")
	params.SetEmail("acme-inc@example.com")
	params.SetStatusCallback("https://www.example.com/status-callback-endpoint")

	resp, err := client.TrusthubV1.CreateCustomerProfile(params)
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

$customer_profile = $twilio->trusthub->v1->customerProfiles->create(
    "Acme, Inc. Secondary Customer Profile", // FriendlyName
    "acme-inc@example.com", // Email
    "RNdfbf3fae0e1107f8aded0e7cead80bf5", // PolicySid
    ["statusCallback" => "https://www.example.com/status-callback-endpoint"]
);

print $customer_profile->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

customer_profile = @client
                   .trusthub
                   .v1
                   .customer_profiles
                   .create(
                     policy_sid: 'RNdfbf3fae0e1107f8aded0e7cead80bf5',
                     friendly_name: 'Acme, Inc. Secondary Customer Profile',
                     email: 'acme-inc@example.com',
                     status_callback: 'https://www.example.com/status-callback-endpoint'
                   )

puts customer_profile.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trusthub:v1:customer-profiles:create \
   --policy-sid RNdfbf3fae0e1107f8aded0e7cead80bf5 \
   --friendly-name "Acme, Inc. Secondary Customer Profile" \
   --email acme-inc@example.com \
   --status-callback https://www.example.com/status-callback-endpoint
```

```bash
curl -X POST "https://trusthub.twilio.com/v1/CustomerProfiles" \
--data-urlencode "PolicySid=RNdfbf3fae0e1107f8aded0e7cead80bf5" \
--data-urlencode "FriendlyName=Acme, Inc. Secondary Customer Profile" \
--data-urlencode "Email=acme-inc@example.com" \
--data-urlencode "StatusCallback=https://www.example.com/status-callback-endpoint" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "policy_sid": "RNdfbf3fae0e1107f8aded0e7cead80bf5",
  "friendly_name": "Acme, Inc. Secondary Customer Profile",
  "status": "draft",
  "email": "acme-inc@example.com",
  "status_callback": "https://www.example.com/status-callback-endpoint",
  "valid_until": null,
  "date_created": "2019-07-30T22:29:24Z",
  "date_updated": "2019-07-31T01:09:00Z",
  "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "customer_profiles_entity_assignments": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments",
    "customer_profiles_evaluations": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Evaluations",
    "customer_profiles_channel_endpoint_assignment": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments"
  },
  "errors": null
}
```

### 1.2. Create an EndUser resource of type customer\_profile\_business\_information

This step creates an EndUser resource containing your customer's business information.

* The `type` parameter must be `"customer_profile_business_information"`.
* The `friendly_name` is an internal name for this API resource. Use a descriptive name, e.g., "Acme, Inc. Business Information EndUser resource".
* All of the specific business information is passed in within the `attributes` parameter, as an object.
  * The `attributes` object contains the following parameters and the corresponding values that you collected from your customer earlier:
    * `business_identity`
    * `business_industry`
    * `business_name`
    * `business_regions_of_operation`
    * `business_registration_identifier`
    * `business_registration_number`
    * `business_type`
    * `social_media_profile_urls` (optional)
    * `website_url`
* Save the `sid` in the response of this API request, which starts with "IT". You need it in the next step.

Create EndUser of type customer\_profile\_business\_information

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
      business_name: "Acme, Inc.",
      social_media_profile_urls:
        "https://example.com/acme-social-media-profile",
      website_url: "https://www.example.com",
      business_regions_of_operation: "USA_AND_CANADA",
      business_type: "Partnership",
      business_registration_identifier: "EIN",
      business_identity: "direct_customer",
      business_industry: "EDUCATION",
      business_registration_number: "123456789",
    },
    friendlyName: "Acme, Inc. - Business Information EndUser resource",
    type: "customer_profile_business_information",
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
    attributes={
        "business_name": "Acme, Inc.",
        "social_media_profile_urls": "https://example.com/acme-social-media-profile",
        "website_url": "https://www.example.com",
        "business_regions_of_operation": "USA_AND_CANADA",
        "business_type": "Partnership",
        "business_registration_identifier": "EIN",
        "business_identity": "direct_customer",
        "business_industry": "EDUCATION",
        "business_registration_number": "123456789",
    },
    friendly_name="Acme, Inc. - Business Information EndUser resource",
    type="customer_profile_business_information",
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

        var
            endUser =
                await
                    EndUserResource
                        .CreateAsync(
                            attributes: new Dictionary<
                                string,
                                Object>() { { "business_name", "Acme, Inc." }, { "social_media_profile_urls", "https://example.com/acme-social-media-profile" }, { "website_url", "https://www.example.com" }, { "business_regions_of_operation", "USA_AND_CANADA" }, { "business_type", "Partnership" }, { "business_registration_identifier", "EIN" }, { "business_identity", "direct_customer" }, { "business_industry", "EDUCATION" }, { "business_registration_number", "123456789" } },
                            friendlyName: "Acme, Inc. - Business Information EndUser resource",
                            type: "customer_profile_business_information");

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
        EndUser endUser =
            EndUser
                .creator("Acme, Inc. - Business Information EndUser resource", "customer_profile_business_information")
                .setAttributes(new HashMap<String, Object>() {
                    {
                        put("business_name", "Acme, Inc.");
                        put("social_media_profile_urls", "https://example.com/acme-social-media-profile");
                        put("website_url", "https://www.example.com");
                        put("business_regions_of_operation", "USA_AND_CANADA");
                        put("business_type", "Partnership");
                        put("business_registration_identifier", "EIN");
                        put("business_identity", "direct_customer");
                        put("business_industry", "EDUCATION");
                        put("business_registration_number", "123456789");
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
	params.SetAttributes(map[string]interface{}{
		"business_name":                    "Acme, Inc.",
		"social_media_profile_urls":        "https://example.com/acme-social-media-profile",
		"website_url":                      "https://www.example.com",
		"business_regions_of_operation":    "USA_AND_CANADA",
		"business_type":                    "Partnership",
		"business_registration_identifier": "EIN",
		"business_identity":                "direct_customer",
		"business_industry":                "EDUCATION",
		"business_registration_number":     "123456789",
	})
	params.SetFriendlyName("Acme, Inc. - Business Information EndUser resource")
	params.SetType("customer_profile_business_information")

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
    "Acme, Inc. - Business Information EndUser resource", // FriendlyName
    "customer_profile_business_information", // Type
    [
        "attributes" => [
            "business_name" => "Acme, Inc.",
            "social_media_profile_urls" =>
                "https://example.com/acme-social-media-profile",
            "website_url" => "https://www.example.com",
            "business_regions_of_operation" => "USA_AND_CANADA",
            "business_type" => "Partnership",
            "business_registration_identifier" => "EIN",
            "business_identity" => "direct_customer",
            "business_industry" => "EDUCATION",
            "business_registration_number" => "123456789",
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
             attributes: {
               'business_name' => 'Acme, Inc.',
               'social_media_profile_urls' => 'https://example.com/acme-social-media-profile',
               'website_url' => 'https://www.example.com',
               'business_regions_of_operation' => 'USA_AND_CANADA',
               'business_type' => 'Partnership',
               'business_registration_identifier' => 'EIN',
               'business_identity' => 'direct_customer',
               'business_industry' => 'EDUCATION',
               'business_registration_number' => '123456789'
             },
             friendly_name: 'Acme, Inc. - Business Information EndUser resource',
             type: 'customer_profile_business_information'
           )

puts end_user.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trusthub:v1:end-users:create \
   --attributes "{\"business_name\":\"Acme, Inc.\",\"social_media_profile_urls\":\"https://example.com/acme-social-media-profile\",\"website_url\":\"https://www.example.com\",\"business_regions_of_operation\":\"USA_AND_CANADA\",\"business_type\":\"Partnership\",\"business_registration_identifier\":\"EIN\",\"business_identity\":\"direct_customer\",\"business_industry\":\"EDUCATION\",\"business_registration_number\":\"123456789\"}" \
   --friendly-name "Acme, Inc. - Business Information EndUser resource" \
   --type customer_profile_business_information
```

```bash
ATTRIBUTES_OBJ=$(cat << EOF
{
  "business_name": "Acme, Inc.",
  "social_media_profile_urls": "https://example.com/acme-social-media-profile",
  "website_url": "https://www.example.com",
  "business_regions_of_operation": "USA_AND_CANADA",
  "business_type": "Partnership",
  "business_registration_identifier": "EIN",
  "business_identity": "direct_customer",
  "business_industry": "EDUCATION",
  "business_registration_number": "123456789"
}
EOF
)
curl -X POST "https://trusthub.twilio.com/v1/EndUsers" \
--data-urlencode "Attributes=$ATTRIBUTES_OBJ" \
--data-urlencode "FriendlyName=Acme, Inc. - Business Information EndUser resource" \
--data-urlencode "Type=customer_profile_business_information" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "date_updated": "2021-02-16T20:40:57Z",
  "sid": "ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "Acme, Inc. - Business Information EndUser resource",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://trusthub.twilio.com/v1/EndUsers/ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2021-02-16T20:40:57Z",
  "attributes": {
    "business_name": "Acme, Inc.",
    "social_media_profile_urls": "https://example.com/acme-social-media-profile",
    "website_url": "https://www.example.com",
    "business_regions_of_operation": "USA_AND_CANADA",
    "business_type": "Partnership",
    "business_registration_identifier": "EIN",
    "business_identity": "direct_customer",
    "business_industry": "EDUCATION",
    "business_registration_number": "123456789"
  },
  "type": "customer_profile_business_information"
}
```

### 1.3. Attach the EndUser to the Secondary Customer Profile

This step associates the EndUser resource with the Secondary Customer Profile from Step 1.1.

* The `sid` in the path of this request is the SID of the CustomerProfile resource from Step 1.1.
* The `object_sid` is the EndUser resource SID from Step 1.2.

Attach the EndUser resource to the Secondary Customer Profile

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createCustomerProfileEntityAssignment() {
  const customerProfilesEntityAssignment = await client.trusthub.v1
    .customerProfiles("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .customerProfilesEntityAssignments.create({
      objectSid: "ITXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    });

  console.log(customerProfilesEntityAssignment.sid);
}

createCustomerProfileEntityAssignment();
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

customer_profiles_entity_assignment = client.trusthub.v1.customer_profiles(
    "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).customer_profiles_entity_assignments.create(
    object_sid="ITXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
)

print(customer_profiles_entity_assignment.sid)
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

        var customerProfilesEntityAssignments =
            await CustomerProfilesEntityAssignmentsResource.CreateAsync(
                objectSid: "ITXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                pathCustomerProfileSid: "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(customerProfilesEntityAssignments.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.trusthub.v1.customerprofiles.CustomerProfilesEntityAssignments;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        CustomerProfilesEntityAssignments customerProfilesEntityAssignments =
            CustomerProfilesEntityAssignments
                .creator("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "ITXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                .create();

        System.out.println(customerProfilesEntityAssignments.getSid());
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

	params := &trusthub.CreateCustomerProfileEntityAssignmentParams{}
	params.SetObjectSid("ITXXXXXXXXXXXXXXXXXXXXXXXXXXXX")

	resp, err := client.TrusthubV1.CreateCustomerProfileEntityAssignment("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$customer_profiles_entity_assignment = $twilio->trusthub->v1
    ->customerProfiles("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->customerProfilesEntityAssignments->create(
        "ITXXXXXXXXXXXXXXXXXXXXXXXXXXXX" // ObjectSid
    );

print $customer_profiles_entity_assignment->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

customer_profiles_entity_assignment = @client
                                      .trusthub
                                      .v1
                                      .customer_profiles('BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                      .customer_profiles_entity_assignments
                                      .create(
                                        object_sid: 'ITXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
                                      )

puts customer_profiles_entity_assignment.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trusthub:v1:customer-profiles:entity-assignments:create \
   --customer-profile-sid BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --object-sid ITXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X POST "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments" \
--data-urlencode "ObjectSid=ITXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "customer_profile_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "object_sid": "ITXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "date_created": "2019-07-31T02:34:41Z",
  "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments/BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

### 1.4. Create an EndUser resource of type: authorized\_representative\_1

This step provides required information about an authorized representative for **your customer's business**.

* The `type` parameter has a value of `"authorized_representative_1"`.
* The `friendly_name` is an internal name for identifying this EndUser resource. Use a descriptive name, e.g., "Acme, Inc. Authorized Rep 1".
* The authorized representative's contact information is provided via the `attributes` parameter. The `attributes` object contains the following parameters and the corresponding values that you collected from your customer earlier:
  * `business_title`
  * `email`
  * `first_name`
  * `job_position`
  * `last_name`
  * `phone_number`

Create EndUser of type authorized\_representative\_1

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
      job_position: "CEO",
      last_name: "Doe",
      phone_number: "+12225557890",
      first_name: "Jane",
      email: "jdoe@example.com",
      business_title: "CEO",
    },
    friendlyName: "Acme, Inc Authorized Rep 1",
    type: "authorized_representative_1",
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
    attributes={
        "job_position": "CEO",
        "last_name": "Doe",
        "phone_number": "+12225557890",
        "first_name": "Jane",
        "email": "jdoe@example.com",
        "business_title": "CEO",
    },
    friendly_name="Acme, Inc Authorized Rep 1",
    type="authorized_representative_1",
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
            attributes: new Dictionary<
                string,
                Object>() { { "job_position", "CEO" }, { "last_name", "Doe" }, { "phone_number", "+12225557890" }, { "first_name", "Jane" }, { "email", "jdoe@example.com" }, { "business_title", "CEO" } },
            friendlyName: "Acme, Inc Authorized Rep 1",
            type: "authorized_representative_1");

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
        EndUser endUser = EndUser.creator("Acme, Inc Authorized Rep 1", "authorized_representative_1")
                              .setAttributes(new HashMap<String, Object>() {
                                  {
                                      put("job_position", "CEO");
                                      put("last_name", "Doe");
                                      put("phone_number", "+12225557890");
                                      put("first_name", "Jane");
                                      put("email", "jdoe@example.com");
                                      put("business_title", "CEO");
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
	params.SetAttributes(map[string]interface{}{
		"job_position":   "CEO",
		"last_name":      "Doe",
		"phone_number":   "+12225557890",
		"first_name":     "Jane",
		"email":          "jdoe@example.com",
		"business_title": "CEO",
	})
	params.SetFriendlyName("Acme, Inc Authorized Rep 1")
	params.SetType("authorized_representative_1")

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
    "Acme, Inc Authorized Rep 1", // FriendlyName
    "authorized_representative_1", // Type
    [
        "attributes" => [
            "job_position" => "CEO",
            "last_name" => "Doe",
            "phone_number" => "+12225557890",
            "first_name" => "Jane",
            "email" => "jdoe@example.com",
            "business_title" => "CEO",
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
             attributes: {
               'job_position' => 'CEO',
               'last_name' => 'Doe',
               'phone_number' => '+12225557890',
               'first_name' => 'Jane',
               'email' => 'jdoe@example.com',
               'business_title' => 'CEO'
             },
             friendly_name: 'Acme, Inc Authorized Rep 1',
             type: 'authorized_representative_1'
           )

puts end_user.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trusthub:v1:end-users:create \
   --attributes "{\"job_position\":\"CEO\",\"last_name\":\"Doe\",\"phone_number\":\"+12225557890\",\"first_name\":\"Jane\",\"email\":\"jdoe@example.com\",\"business_title\":\"CEO\"}" \
   --friendly-name "Acme, Inc Authorized Rep 1" \
   --type authorized_representative_1
```

```bash
ATTRIBUTES_OBJ=$(cat << EOF
{
  "job_position": "CEO",
  "last_name": "Doe",
  "phone_number": "+12225557890",
  "first_name": "Jane",
  "email": "jdoe@example.com",
  "business_title": "CEO"
}
EOF
)
curl -X POST "https://trusthub.twilio.com/v1/EndUsers" \
--data-urlencode "Attributes=$ATTRIBUTES_OBJ" \
--data-urlencode "FriendlyName=Acme, Inc Authorized Rep 1" \
--data-urlencode "Type=authorized_representative_1" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "date_updated": "2021-02-16T20:40:57Z",
  "sid": "ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "Acme, Inc Authorized Rep 1",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://trusthub.twilio.com/v1/EndUsers/ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2021-02-16T20:40:57Z",
  "attributes": {
    "job_position": "CEO",
    "last_name": "Doe",
    "phone_number": "+12225557890",
    "first_name": "Jane",
    "email": "jdoe@example.com",
    "business_title": "CEO"
  },
  "type": "authorized_representative_1"
}
```

You may provide a second authorized representative by repeating this request, but use `authorized_representative_2` for the `type` parameter instead. You must also complete the next step again, but with the SID associated with the `authorized_representative_2` EndUser.

### 1.5. Attach the EndUser resource to the Secondary Customer Profile

* The `sid` in the path of this request is the SID of the Secondary Customer Profile from Step 1.1.
* The `object_sid` is the EndUser resource SID from Step 1.4.

Attach the EndUser resource to the Secondary Customer Profile

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createCustomerProfileEntityAssignment() {
  const customerProfilesEntityAssignment = await client.trusthub.v1
    .customerProfiles("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .customerProfilesEntityAssignments.create({
      objectSid: "ITXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    });

  console.log(customerProfilesEntityAssignment.sid);
}

createCustomerProfileEntityAssignment();
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

customer_profiles_entity_assignment = client.trusthub.v1.customer_profiles(
    "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).customer_profiles_entity_assignments.create(
    object_sid="ITXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
)

print(customer_profiles_entity_assignment.sid)
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

        var customerProfilesEntityAssignments =
            await CustomerProfilesEntityAssignmentsResource.CreateAsync(
                objectSid: "ITXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                pathCustomerProfileSid: "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(customerProfilesEntityAssignments.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.trusthub.v1.customerprofiles.CustomerProfilesEntityAssignments;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        CustomerProfilesEntityAssignments customerProfilesEntityAssignments =
            CustomerProfilesEntityAssignments
                .creator("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "ITXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                .create();

        System.out.println(customerProfilesEntityAssignments.getSid());
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

	params := &trusthub.CreateCustomerProfileEntityAssignmentParams{}
	params.SetObjectSid("ITXXXXXXXXXXXXXXXXXXXXXXXXXXXX")

	resp, err := client.TrusthubV1.CreateCustomerProfileEntityAssignment("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$customer_profiles_entity_assignment = $twilio->trusthub->v1
    ->customerProfiles("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->customerProfilesEntityAssignments->create(
        "ITXXXXXXXXXXXXXXXXXXXXXXXXXXXX" // ObjectSid
    );

print $customer_profiles_entity_assignment->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

customer_profiles_entity_assignment = @client
                                      .trusthub
                                      .v1
                                      .customer_profiles('BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                      .customer_profiles_entity_assignments
                                      .create(
                                        object_sid: 'ITXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
                                      )

puts customer_profiles_entity_assignment.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trusthub:v1:customer-profiles:entity-assignments:create \
   --customer-profile-sid BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --object-sid ITXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X POST "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments" \
--data-urlencode "ObjectSid=ITXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "customer_profile_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "object_sid": "ITXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "date_created": "2019-07-31T02:34:41Z",
  "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments/BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

### 1.6. Create an Address resource

This API request creates an [Address resource](/docs/usage/api/address) containing your customer's mailing address.

* The `friendly_name` is an internal name. Use something descriptive, e.g., "Acme, Inc. Address".
* This request also uses the following parameters and the corresponding values that you collected from your customer earlier:
  * `city`
  * `customer_name`
  * `iso_country`
  * `postal_code`
  * `region`
  * `street`
  * `street_secondary` (optional)
* Save the `sid` in the response to this request. You need it in the next step.

Create an Address resource

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createAddress() {
  const address = await client.addresses.create({
    city: "San Francisco",
    customerName: "Acme, Inc.",
    friendlyName: "Acme, Inc. mailing address",
    isoCountry: "US",
    postalCode: "12345",
    region: "CA",
    street: "1234 Market St",
  });

  console.log(address.accountSid);
}

createAddress();
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

address = client.addresses.create(
    friendly_name="Acme, Inc. mailing address",
    customer_name="Acme, Inc.",
    street="1234 Market St",
    city="San Francisco",
    region="CA",
    postal_code="12345",
    iso_country="US",
)

print(address.account_sid)
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

        var address = await AddressResource.CreateAsync(
            friendlyName: "Acme, Inc. mailing address",
            customerName: "Acme, Inc.",
            street: "1234 Market St",
            city: "San Francisco",
            region: "CA",
            postalCode: "12345",
            isoCountry: "US");

        Console.WriteLine(address.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Address;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Address address = Address.creator("Acme, Inc.", "1234 Market St", "San Francisco", "CA", "12345", "US")
                              .setFriendlyName("Acme, Inc. mailing address")
                              .create();

        System.out.println(address.getAccountSid());
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

	params := &api.CreateAddressParams{}
	params.SetFriendlyName("Acme, Inc. mailing address")
	params.SetCustomerName("Acme, Inc.")
	params.SetStreet("1234 Market St")
	params.SetCity("San Francisco")
	params.SetRegion("CA")
	params.SetPostalCode("12345")
	params.SetIsoCountry("US")

	resp, err := client.Api.CreateAddress(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.AccountSid != nil {
			fmt.Println(*resp.AccountSid)
		} else {
			fmt.Println(resp.AccountSid)
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

$address = $twilio->addresses->create(
    "Acme, Inc.", // CustomerName
    "1234 Market St", // Street
    "San Francisco", // City
    "CA", // Region
    "12345", // PostalCode
    "US", // IsoCountry
    ["friendlyName" => "Acme, Inc. mailing address"]
);

print $address->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

address = @client
          .api
          .v2010
          .addresses
          .create(
            friendly_name: 'Acme, Inc. mailing address',
            customer_name: 'Acme, Inc.',
            street: '1234 Market St',
            city: 'San Francisco',
            region: 'CA',
            postal_code: '12345',
            iso_country: 'US'
          )

puts address.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:addresses:create \
   --friendly-name "Acme, Inc. mailing address" \
   --customer-name "Acme, Inc." \
   --street "1234 Market St" \
   --city "San Francisco" \
   --region CA \
   --postal-code 12345 \
   --iso-country US
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Addresses.json" \
--data-urlencode "FriendlyName=Acme, Inc. mailing address" \
--data-urlencode "CustomerName=Acme, Inc." \
--data-urlencode "Street=1234 Market St" \
--data-urlencode "City=San Francisco" \
--data-urlencode "Region=CA" \
--data-urlencode "PostalCode=12345" \
--data-urlencode "IsoCountry=US" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "city": "San Francisco",
  "customer_name": "Acme, Inc.",
  "date_created": "Tue, 18 Aug 2015 17:07:30 +0000",
  "date_updated": "Tue, 18 Aug 2015 17:07:30 +0000",
  "emergency_enabled": false,
  "friendly_name": "Acme, Inc. mailing address",
  "iso_country": "US",
  "postal_code": "12345",
  "region": "CA",
  "sid": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "street": "1234 Market St",
  "street_secondary": "Suite 300",
  "validated": false,
  "verified": false,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Addresses/ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

### 1.7. Create a SupportingDocument resource

This step creates a SupportingDocument resource, which is how the TrustHub API stores the Address information.

* The `friendly_name` is an internal name. Use something descriptive, e.g., "Acme, Inc. Address SupportingDocument".
* The `type` parameter must be `customer_profile_address`.
* The `attributes` parameter is an object with a property of `address_sids`. The value of this property is the Address SID from the previous step.
* Save the `sid` in the response to this API request. You need it in the next step.

Create a SupportingDocument

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createSupportingDocument() {
  const supportingDocument =
    await client.trusthub.v1.supportingDocuments.create({
      attributes: {
        address_sids: "ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      },
      friendlyName: "acme",
      type: "customer_profile_address",
    });

  console.log(supportingDocument.sid);
}

createSupportingDocument();
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

supporting_document = client.trusthub.v1.supporting_documents.create(
    friendly_name="acme",
    type="customer_profile_address",
    attributes={"address_sids": "ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"},
)

print(supporting_document.sid)
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

        var supportingDocument = await SupportingDocumentResource.CreateAsync(
            friendlyName: "acme",
            type: "customer_profile_address",
            attributes: new Dictionary<string, Object>() {
                { "address_sids", "ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" }
            });

        Console.WriteLine(supportingDocument.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.util.HashMap;
import com.twilio.Twilio;
import com.twilio.rest.trusthub.v1.SupportingDocument;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        SupportingDocument supportingDocument = SupportingDocument.creator("acme", "customer_profile_address")
                                                    .setAttributes(new HashMap<String, Object>() {
                                                        {
                                                            put("address_sids", "ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
                                                        }
                                                    })
                                                    .create();

        System.out.println(supportingDocument.getSid());
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

	params := &trusthub.CreateSupportingDocumentParams{}
	params.SetFriendlyName("acme")
	params.SetType("customer_profile_address")
	params.SetAttributes(map[string]interface{}{
		"address_sids": "ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
	})

	resp, err := client.TrusthubV1.CreateSupportingDocument(params)
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

$supporting_document = $twilio->trusthub->v1->supportingDocuments->create(
    "acme", // FriendlyName
    "customer_profile_address", // Type
    [
        "attributes" => [
            "address_sids" => "ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        ],
    ]
);

print $supporting_document->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

supporting_document = @client
                      .trusthub
                      .v1
                      .supporting_documents
                      .create(
                        friendly_name: 'acme',
                        type: 'customer_profile_address',
                        attributes: {
                          'address_sids' => 'ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
                        }
                      )

puts supporting_document.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trusthub:v1:supporting-documents:create \
   --friendly-name acme \
   --type customer_profile_address \
   --attributes "{\"address_sids\":\"ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\"}"
```

```bash
ATTRIBUTES_OBJ=$(cat << EOF
{
  "address_sids": "ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
}
EOF
)
curl -X POST "https://trusthub.twilio.com/v1/SupportingDocuments" \
--data-urlencode "FriendlyName=acme" \
--data-urlencode "Type=customer_profile_address" \
--data-urlencode "Attributes=$ATTRIBUTES_OBJ" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "status": "DRAFT",
  "date_updated": "2021-02-11T17:23:00Z",
  "friendly_name": "acme",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://trusthub.twilio.com/v1/SupportingDocuments/RDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2021-02-11T17:23:00Z",
  "sid": "RDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "attributes": {
    "address_sids": "ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
  },
  "type": "customer_profile_address",
  "mime_type": null
}
```

### 1.8. Attach the SupportingDocument resource to the Secondary Customer Profile

This step associates the SupportingDocument resource with your customer's Secondary Customer Profile.

* The `sid` in the path of this request is the SID of the Secondary Customer Profile from 1.1.
* The `object_sid` is the SupportingDocument resource SID from Step 7.

Attach the SupportingDocument resource to the Secondary Customer Profile

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createCustomerProfileEntityAssignment() {
  const customerProfilesEntityAssignment = await client.trusthub.v1
    .customerProfiles("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .customerProfilesEntityAssignments.create({
      objectSid: "RDXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    });

  console.log(customerProfilesEntityAssignment.sid);
}

createCustomerProfileEntityAssignment();
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

customer_profiles_entity_assignment = client.trusthub.v1.customer_profiles(
    "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).customer_profiles_entity_assignments.create(
    object_sid="RDXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
)

print(customer_profiles_entity_assignment.sid)
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

        var customerProfilesEntityAssignments =
            await CustomerProfilesEntityAssignmentsResource.CreateAsync(
                objectSid: "RDXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                pathCustomerProfileSid: "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(customerProfilesEntityAssignments.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.trusthub.v1.customerprofiles.CustomerProfilesEntityAssignments;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        CustomerProfilesEntityAssignments customerProfilesEntityAssignments =
            CustomerProfilesEntityAssignments
                .creator("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "RDXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                .create();

        System.out.println(customerProfilesEntityAssignments.getSid());
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

	params := &trusthub.CreateCustomerProfileEntityAssignmentParams{}
	params.SetObjectSid("RDXXXXXXXXXXXXXXXXXXXXXXXXXXXX")

	resp, err := client.TrusthubV1.CreateCustomerProfileEntityAssignment("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$customer_profiles_entity_assignment = $twilio->trusthub->v1
    ->customerProfiles("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->customerProfilesEntityAssignments->create(
        "RDXXXXXXXXXXXXXXXXXXXXXXXXXXXX" // ObjectSid
    );

print $customer_profiles_entity_assignment->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

customer_profiles_entity_assignment = @client
                                      .trusthub
                                      .v1
                                      .customer_profiles('BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                      .customer_profiles_entity_assignments
                                      .create(
                                        object_sid: 'RDXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
                                      )

puts customer_profiles_entity_assignment.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trusthub:v1:customer-profiles:entity-assignments:create \
   --customer-profile-sid BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --object-sid RDXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X POST "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments" \
--data-urlencode "ObjectSid=RDXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "customer_profile_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "object_sid": "RDXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "date_created": "2019-07-31T02:34:41Z",
  "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments/BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

### 1.9. Assign the Secondary Customer Profile to the Primary Customer Profile

This step associates the created Secondary Customer Profile resource with your Primary Customer Profile.

* The `sid` in the path of this request is the SID of the Secondary Customer Profile from step 1.1.
* The `object_sid` is the SID of the Primary Customer Profile.

Assign a Primary Customer Profile

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createCustomerProfileEntityAssignment() {
  const customerProfilesEntityAssignment = await client.trusthub.v1
    .customerProfiles("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .customerProfilesEntityAssignments.create({
      objectSid: "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    });

  console.log(customerProfilesEntityAssignment.sid);
}

createCustomerProfileEntityAssignment();
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

customer_profiles_entity_assignment = client.trusthub.v1.customer_profiles(
    "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).customer_profiles_entity_assignments.create(
    object_sid="BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
)

print(customer_profiles_entity_assignment.sid)
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

        var customerProfilesEntityAssignments =
            await CustomerProfilesEntityAssignmentsResource.CreateAsync(
                objectSid: "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                pathCustomerProfileSid: "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(customerProfilesEntityAssignments.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.trusthub.v1.customerprofiles.CustomerProfilesEntityAssignments;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        CustomerProfilesEntityAssignments customerProfilesEntityAssignments =
            CustomerProfilesEntityAssignments
                .creator("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                .create();

        System.out.println(customerProfilesEntityAssignments.getSid());
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

	params := &trusthub.CreateCustomerProfileEntityAssignmentParams{}
	params.SetObjectSid("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

	resp, err := client.TrusthubV1.CreateCustomerProfileEntityAssignment("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$customer_profiles_entity_assignment = $twilio->trusthub->v1
    ->customerProfiles("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->customerProfilesEntityAssignments->create(
        "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" // ObjectSid
    );

print $customer_profiles_entity_assignment->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

customer_profiles_entity_assignment = @client
                                      .trusthub
                                      .v1
                                      .customer_profiles('BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                      .customer_profiles_entity_assignments
                                      .create(
                                        object_sid: 'BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
                                      )

puts customer_profiles_entity_assignment.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trusthub:v1:customer-profiles:entity-assignments:create \
   --customer-profile-sid BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --object-sid BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X POST "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments" \
--data-urlencode "ObjectSid=BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "customer_profile_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "object_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2019-07-31T02:34:41Z",
  "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments/BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

### 1.10. Evaluate the Secondary Customer Profile

This API request runs an automated evaluation on the Secondary Customer Profile. The response from Twilio indicates whether or not all required information (as per the [Policy](/docs/trust-hub/trusthub-rest-api#policies-resource)) is present in the Secondary Customer Profile.

If there are no errors, the response contains a `status` of `compliant`. Otherwise, the `status` is `noncompliant` and the `results` property contains information about invalid or missing information.

* The `customer_profile_sid` is the SID of the Secondary Customer Profile.
* The `policy_sid` is `RNdfbf3fae0e1107f8aded0e7cead80bf5`.

Evaluate the Secondary Customer Profile

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createCustomerProfileEvaluation() {
  const customerProfilesEvaluation = await client.trusthub.v1
    .customerProfiles("BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .customerProfilesEvaluations.create({
      policySid: "RNdfbf3fae0e1107f8aded0e7cead80bf5",
    });

  console.log(customerProfilesEvaluation.sid);
}

createCustomerProfileEvaluation();
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

customer_profiles_evaluation = client.trusthub.v1.customer_profiles(
    "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).customer_profiles_evaluations.create(
    policy_sid="RNdfbf3fae0e1107f8aded0e7cead80bf5"
)

print(customer_profiles_evaluation.sid)
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

        var customerProfilesEvaluations = await CustomerProfilesEvaluationsResource.CreateAsync(
            policySid: "RNdfbf3fae0e1107f8aded0e7cead80bf5",
            pathCustomerProfileSid: "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(customerProfilesEvaluations.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.trusthub.v1.customerprofiles.CustomerProfilesEvaluations;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        CustomerProfilesEvaluations customerProfilesEvaluations =
            CustomerProfilesEvaluations
                .creator("BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "RNdfbf3fae0e1107f8aded0e7cead80bf5")
                .create();

        System.out.println(customerProfilesEvaluations.getSid());
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

	params := &trusthub.CreateCustomerProfileEvaluationParams{}
	params.SetPolicySid("RNdfbf3fae0e1107f8aded0e7cead80bf5")

	resp, err := client.TrusthubV1.CreateCustomerProfileEvaluation("BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

$customer_profiles_evaluation = $twilio->trusthub->v1
    ->customerProfiles("BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->customerProfilesEvaluations->create(
        "RNdfbf3fae0e1107f8aded0e7cead80bf5" // PolicySid
    );

print $customer_profiles_evaluation->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

customer_profiles_evaluation = @client
                               .trusthub
                               .v1
                               .customer_profiles('BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                               .customer_profiles_evaluations
                               .create(
                                 policy_sid: 'RNdfbf3fae0e1107f8aded0e7cead80bf5'
                               )

puts customer_profiles_evaluation.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trusthub:v1:customer-profiles:evaluations:create \
   --customer-profile-sid BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --policy-sid RNdfbf3fae0e1107f8aded0e7cead80bf5
```

```bash
curl -X POST "https://trusthub.twilio.com/v1/CustomerProfiles/BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Evaluations" \
--data-urlencode "PolicySid=RNdfbf3fae0e1107f8aded0e7cead80bf5" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "ELaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "policy_sid": "RNdfbf3fae0e1107f8aded0e7cead80bf5",
  "customer_profile_sid": "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "status": "noncompliant",
  "date_created": "2020-04-28T18:14:01Z",
  "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Evaluations/ELaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "results": [
    {
      "friendly_name": "Business",
      "object_type": "business",
      "passed": false,
      "failure_reason": "A Business End-User is missing. Please add one to the regulatory bundle.",
      "error_code": 22214,
      "valid": [],
      "invalid": [
        {
          "friendly_name": "Business Name",
          "object_field": "business_name",
          "failure_reason": "The Business Name is missing. Please enter in a Business Name on the Business information.",
          "error_code": 22215
        },
        {
          "friendly_name": "Business Registration Number",
          "object_field": "business_registration_number",
          "failure_reason": "The Business Registration Number is missing. Please enter in a Business Registration Number on the Business information.",
          "error_code": 22215
        },
        {
          "friendly_name": "First Name",
          "object_field": "first_name",
          "failure_reason": "The First Name is missing. Please enter in a First Name on the Business information.",
          "error_code": 22215
        },
        {
          "friendly_name": "Last Name",
          "object_field": "last_name",
          "failure_reason": "The Last Name is missing. Please enter in a Last Name on the Business information.",
          "error_code": 22215
        }
      ],
      "requirement_friendly_name": "Business",
      "requirement_name": "business_info"
    },
    {
      "friendly_name": "Excerpt from the commercial register (Extrait K-bis) showing name of Authorized Representative",
      "object_type": "commercial_registrar_excerpt",
      "passed": false,
      "failure_reason": "An Excerpt from the commercial register (Extrait K-bis) showing name of Authorized Representative is missing. Please add one to the regulatory bundle.",
      "error_code": 22216,
      "valid": [],
      "invalid": [
        {
          "friendly_name": "Business Name",
          "object_field": "business_name",
          "failure_reason": "The Business Name is missing. Or, it does not match the Business Name you entered within Business information. Please enter in the Business Name shown on the Excerpt from the commercial register (Extrait K-bis) showing name of Authorized Representative or make sure both Business Name fields use the same exact inputs.",
          "error_code": 22217
        }
      ],
      "requirement_friendly_name": "Business Name",
      "requirement_name": "business_name_info"
    },
    {
      "friendly_name": "Excerpt from the commercial register showing French address",
      "object_type": "commercial_registrar_excerpt",
      "passed": false,
      "failure_reason": "An Excerpt from the commercial register showing French address is missing. Please add one to the regulatory bundle.",
      "error_code": 22216,
      "valid": [],
      "invalid": [
        {
          "friendly_name": "Address sid(s)",
          "object_field": "address_sids",
          "failure_reason": "The Address is missing. Please enter in the address shown on the Excerpt from the commercial register showing French address.",
          "error_code": 22219
        }
      ],
      "requirement_friendly_name": "Business Address (Proof of Address)",
      "requirement_name": "business_address_proof_info"
    },
    {
      "friendly_name": "Excerpt from the commercial register (Extrait K-bis)",
      "object_type": "commercial_registrar_excerpt",
      "passed": false,
      "failure_reason": "An Excerpt from the commercial register (Extrait K-bis) is missing. Please add one to the regulatory bundle.",
      "error_code": 22216,
      "valid": [],
      "invalid": [
        {
          "friendly_name": "Document Number",
          "object_field": "document_number",
          "failure_reason": "The Document Number is missing. Please enter in the Document Number shown on the Excerpt from the commercial register (Extrait K-bis).",
          "error_code": 22217
        }
      ],
      "requirement_friendly_name": "Business Registration Number",
      "requirement_name": "business_reg_no_info"
    },
    {
      "friendly_name": "Government-issued ID",
      "object_type": "government_issued_document",
      "passed": false,
      "failure_reason": "A Government-issued ID is missing. Please add one to the regulatory bundle.",
      "error_code": 22216,
      "valid": [],
      "invalid": [
        {
          "friendly_name": "First Name",
          "object_field": "first_name",
          "failure_reason": "The First Name is missing. Or, it does not match the First Name you entered within Business information. Please enter in the First Name shown on the Government-issued ID or make sure both First Name fields use the same exact inputs.",
          "error_code": 22217
        },
        {
          "friendly_name": "Last Name",
          "object_field": "last_name",
          "failure_reason": "The Last Name is missing. Or, it does not match the Last Name you entered within Business information. Please enter in the Last Name shown on the Government-issued ID or make sure both Last Name fields use the same exact inputs.",
          "error_code": 22217
        }
      ],
      "requirement_friendly_name": "Name of Authorized Representative",
      "requirement_name": "name_of_auth_rep_info"
    },
    {
      "friendly_name": "Executed Copy of Power of Attorney",
      "object_type": "power_of_attorney",
      "passed": false,
      "failure_reason": "An Executed Copy of Power of Attorney is missing. Please add one to the regulatory bundle.",
      "error_code": 22216,
      "valid": [],
      "invalid": [],
      "requirement_friendly_name": "Power of Attorney",
      "requirement_name": "power_of_attorney_info"
    },
    {
      "friendly_name": "Government-issued ID",
      "object_type": "government_issued_document",
      "passed": false,
      "failure_reason": "A Government-issued ID is missing. Please add one to the regulatory bundle.",
      "error_code": 22216,
      "valid": [],
      "invalid": [
        {
          "friendly_name": "First Name",
          "object_field": "first_name",
          "failure_reason": "The First Name is missing on the Governnment-Issued ID.",
          "error_code": 22217
        },
        {
          "friendly_name": "Last Name",
          "object_field": "last_name",
          "failure_reason": "The Last Name is missing on the Government-issued ID",
          "error_code": 22217
        }
      ],
      "requirement_friendly_name": "Name of Person granted the Power of Attorney",
      "requirement_name": "name_in_power_of_attorney_info"
    }
  ]
}
```

### 1.11. Submit the Secondary Customer Profile for review

This API request submits the Secondary Customer Profile for review.

* The `sid` is the SID of the Secondary Customer Profile.
* The `status` must be `pending_review`.

After submitting, you can proceed to the next step. The Secondary Customer Profile does not need to have an `approved` status in order to continue.

Submit the secondary customer profile for review

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateCustomerProfile() {
  const customerProfile = await client.trusthub.v1
    .customerProfiles("BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .update({ status: "pending-review" });

  console.log(customerProfile.sid);
}

updateCustomerProfile();
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

customer_profile = client.trusthub.v1.customer_profiles(
    "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).update(status="pending-review")

print(customer_profile.sid)
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

        var customerProfiles = await CustomerProfilesResource.UpdateAsync(
            status: CustomerProfilesResource.StatusEnum.PendingReview,
            pathSid: "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(customerProfiles.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.trusthub.v1.CustomerProfiles;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        CustomerProfiles customerProfiles = CustomerProfiles.updater("BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                                                .setStatus(CustomerProfiles.Status.PENDING_REVIEW)
                                                .update();

        System.out.println(customerProfiles.getSid());
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

	params := &trusthub.UpdateCustomerProfileParams{}
	params.SetStatus("pending-review")

	resp, err := client.TrusthubV1.UpdateCustomerProfile("BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

$customer_profile = $twilio->trusthub->v1
    ->customerProfiles("BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->update(["status" => "pending-review"]);

print $customer_profile->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

customer_profile = @client
                   .trusthub
                   .v1
                   .customer_profiles('BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                   .update(status: 'pending-review')

puts customer_profile.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trusthub:v1:customer-profiles:update \
   --sid BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --status pending-review
```

```bash
curl -X POST "https://trusthub.twilio.com/v1/CustomerProfiles/BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
--data-urlencode "Status=pending-review" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "policy_sid": "RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "friendly_name",
  "status": "pending-review",
  "email": "notification@email.com",
  "status_callback": "http://www.example.com",
  "valid_until": null,
  "date_created": "2019-07-30T22:29:24Z",
  "date_updated": "2019-07-31T01:09:00Z",
  "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "customer_profiles_entity_assignments": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments",
    "customer_profiles_evaluations": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Evaluations",
    "customer_profiles_channel_endpoint_assignment": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments"
  },
  "errors": null
}
```

## 2. Create and submit a TrustProduct

This section of the onboarding guide covers creating and submitting a TrustProduct resource via the TrustHub API. This TrustProduct is a "container" for some additional business information that TCR requires.

In Step 2.1 below, you create the TrustProduct resource. Next, you provide the additional business information in an EndUser resource (Step 2.2) and then attach the EndUser resource to the TrustProduct in Step 2.3. In Step 2.4, you attach the CustomerProfile resource to the TrustProduct resource. Finally, you check and submit the TrustProduct for review in Steps 2.5 and 2.6.

### 2.1. Create a TrustProduct resource

This step creates a TrustProduct resource, which is a "container" for some additional business information that TCR requires.

* The `friendly_name` is an internal name. Use something descriptive, e.g., "Acme, Inc. A2P Trust Product".
* The `email` is the email address to which Twilio sends updates when the TrustProduct's `status` changes. This should be your (the ISV's) email address, **not the customer's**. You need to monitor this email address for changes in the TrustProduct's `status`.
* The `policy_sid` must be `RNb0d4771c2c98518d916a3d4cd70a8f8b`
* The `status_callback` is the URL to which Twilio sends status updates about the TrustProduct. This is optional, but recommended.
* Save the `sid` returned by this request. You need it in later steps.

Create an empty A2P Trust Bundle

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
    email: "ceo@example.com",
    friendlyName: "Acme, Inc. A2P Trust Product",
    policySid: "RNb0d4771c2c98518d916a3d4cd70a8f8b",
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
    friendly_name="Acme, Inc. A2P Trust Product",
    policy_sid="RNb0d4771c2c98518d916a3d4cd70a8f8b",
    email="ceo@example.com",
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
            friendlyName: "Acme, Inc. A2P Trust Product",
            policySid: "RNb0d4771c2c98518d916a3d4cd70a8f8b",
            email: "ceo@example.com");

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
                .creator("Acme, Inc. A2P Trust Product", "ceo@example.com", "RNb0d4771c2c98518d916a3d4cd70a8f8b")
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
	params.SetFriendlyName("Acme, Inc. A2P Trust Product")
	params.SetPolicySid("RNb0d4771c2c98518d916a3d4cd70a8f8b")
	params.SetEmail("ceo@example.com")

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
    "Acme, Inc. A2P Trust Product", // FriendlyName
    "ceo@example.com", // Email
    "RNb0d4771c2c98518d916a3d4cd70a8f8b" // PolicySid
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
                  friendly_name: 'Acme, Inc. A2P Trust Product',
                  policy_sid: 'RNb0d4771c2c98518d916a3d4cd70a8f8b',
                  email: 'ceo@example.com'
                )

puts trust_product.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trusthub:v1:trust-products:create \
   --friendly-name "Acme, Inc. A2P Trust Product" \
   --policy-sid RNb0d4771c2c98518d916a3d4cd70a8f8b \
   --email ceo@example.com
```

```bash
curl -X POST "https://trusthub.twilio.com/v1/TrustProducts" \
--data-urlencode "FriendlyName=Acme, Inc. A2P Trust Product" \
--data-urlencode "PolicySid=RNb0d4771c2c98518d916a3d4cd70a8f8b" \
--data-urlencode "Email=ceo@example.com" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "policy_sid": "RNb0d4771c2c98518d916a3d4cd70a8f8b",
  "friendly_name": "Acme, Inc. A2P Trust Product",
  "status": "draft",
  "email": "ceo@example.com",
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

### 2.2. Create an EndUser resource of type us\_a2p\_messaging\_profile\_information

This step creates an EndUser resource that contains the additional information required by TCR.

* The `type` parameter must be `us_a2p_messaging_profile_information`.
* The `FriendlyName` is an internal name. Use something descriptive, e.g., "Acme, Inc. Messaging Profile EndUser".
* All of the specific business information is passed in within the `attributes` parameter, as an object.
  * The `attributes` object contains the following parameters and the corresponding values that you collected from your customer earlier:
    * `company_type`
    * `stock_exchange` (if applicable)
    * `stock_ticker` (if applicable)
  * If the `company_type` is anything other than `public`, omit the `stock_ticker` and `stock_exchange` properties.
* The `brand_contact_email` needs to be provided as part of brand registration where a 2FA email will be sent for the brand contact to verify for public, for profit brands.

> \[!NOTE]
>
> When you create a new public, for-profit Brand Registration resource, it kicks off the 2FA that is part of the Authentication+ process.
>
> If you have a Public Profit brand that was registered before October 17, 2024, it's important to ensure it's compliant by January 30, 2025. Brands that don't meet compliance will see their associated campaigns suspended.
> For more information, see [Authentication+ for Public Brand A2P 10DLC Registrations](https://help.twilio.com/articles/29499398652059-Authentication-for-Public-Brand-A2P-10DLC-Registrations).

The example below shows a request for creating this EndUser resource for a public company.

Create an EndUser resource of type us\_a2p\_messaging\_profile\_information for a public company

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
      company_type: "public",
      stock_exchange: "NYSE",
      stock_ticker: "ACME",
    },
    friendlyName: "Acme, Inc. Messaging Profile EndUser",
    type: "us_a2p_messaging_profile_information",
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
    attributes={
        "company_type": "public",
        "stock_exchange": "NYSE",
        "stock_ticker": "ACME",
    },
    friendly_name="Acme, Inc. Messaging Profile EndUser",
    type="us_a2p_messaging_profile_information",
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
            attributes: new Dictionary<
                string,
                Object>() { { "company_type", "public" }, { "stock_exchange", "NYSE" }, { "stock_ticker", "ACME" } },
            friendlyName: "Acme, Inc. Messaging Profile EndUser",
            type: "us_a2p_messaging_profile_information");

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
        EndUser endUser =
            EndUser.creator("Acme, Inc. Messaging Profile EndUser", "us_a2p_messaging_profile_information")
                .setAttributes(new HashMap<String, Object>() {
                    {
                        put("company_type", "public");
                        put("stock_exchange", "NYSE");
                        put("stock_ticker", "ACME");
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
	params.SetAttributes(map[string]interface{}{
		"company_type":   "public",
		"stock_exchange": "NYSE",
		"stock_ticker":   "ACME",
	})
	params.SetFriendlyName("Acme, Inc. Messaging Profile EndUser")
	params.SetType("us_a2p_messaging_profile_information")

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
    "Acme, Inc. Messaging Profile EndUser", // FriendlyName
    "us_a2p_messaging_profile_information", // Type
    [
        "attributes" => [
            "company_type" => "public",
            "stock_exchange" => "NYSE",
            "stock_ticker" => "ACME",
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
             attributes: {
               'company_type' => 'public',
               'stock_exchange' => 'NYSE',
               'stock_ticker' => 'ACME'
             },
             friendly_name: 'Acme, Inc. Messaging Profile EndUser',
             type: 'us_a2p_messaging_profile_information'
           )

puts end_user.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trusthub:v1:end-users:create \
   --attributes "{\"company_type\":\"public\",\"stock_exchange\":\"NYSE\",\"stock_ticker\":\"ACME\"}" \
   --friendly-name "Acme, Inc. Messaging Profile EndUser" \
   --type us_a2p_messaging_profile_information
```

```bash
ATTRIBUTES_OBJ=$(cat << EOF
{
  "company_type": "public",
  "stock_exchange": "NYSE",
  "stock_ticker": "ACME"
}
EOF
)
curl -X POST "https://trusthub.twilio.com/v1/EndUsers" \
--data-urlencode "Attributes=$ATTRIBUTES_OBJ" \
--data-urlencode "FriendlyName=Acme, Inc. Messaging Profile EndUser" \
--data-urlencode "Type=us_a2p_messaging_profile_information" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "date_updated": "2021-02-16T20:40:57Z",
  "sid": "ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "Acme, Inc. Messaging Profile EndUser",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://trusthub.twilio.com/v1/EndUsers/ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2021-02-16T20:40:57Z",
  "attributes": {
    "company_type": "public",
    "stock_exchange": "NYSE",
    "stock_ticker": "ACME"
  },
  "type": "us_a2p_messaging_profile_information"
}
```

### 2.3. Attach the EndUser to the TrustProduct

This step attaches the EndUser resource to the TrustProduct resource.

* The `sid` in the path of this request is the SID of the TrustProduct.
* The `object_sid` is the EndUser resource SID from the previous step.

Attach the EndUser to the TrustProduct

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
    .trustProducts("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .trustProductsEntityAssignments.create({
      objectSid: "ITXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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
    "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).trust_products_entity_assignments.create(
    object_sid="ITXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
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
                objectSid: "ITXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                pathTrustProductSid: "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

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
            TrustProductsEntityAssignments
                .creator("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "ITXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                .create();

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
	params.SetObjectSid("ITXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")

	resp, err := client.TrusthubV1.CreateTrustProductEntityAssignment("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
    ->trustProducts("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->trustProductsEntityAssignments->create(
        "ITXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" // ObjectSid
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
                                   .trust_products('BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                   .trust_products_entity_assignments
                                   .create(
                                     object_sid: 'ITXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
                                   )

puts trust_products_entity_assignment.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trusthub:v1:trust-products:entity-assignments:create \
   --trust-product-sid BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --object-sid ITXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X POST "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments" \
--data-urlencode "ObjectSid=ITXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "trust_product_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "object_sid": "ITXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "date_created": "2019-07-31T02:34:41Z",
  "url": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments/BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

### 2.4. Attach the Secondary Customer Profile to the TrustProduct

This step attaches the CustomerProfile resource to the TrustProduct.

* The `sid` in the path of this request is the SID of the TrustProduct.
* The `object_sid` is the SID of the Secondary Customer Profile from Step 1.1.

Attach Secondary Customer Profile to the TrustProduct

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
    .trustProducts("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .trustProductsEntityAssignments.create({
      objectSid: "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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
    "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).trust_products_entity_assignments.create(
    object_sid="BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
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
                objectSid: "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                pathTrustProductSid: "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

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
            TrustProductsEntityAssignments
                .creator("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                .create();

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
	params.SetObjectSid("BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")

	resp, err := client.TrusthubV1.CreateTrustProductEntityAssignment("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
    ->trustProducts("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->trustProductsEntityAssignments->create(
        "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" // ObjectSid
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
                                   .trust_products('BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                   .trust_products_entity_assignments
                                   .create(
                                     object_sid: 'BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
                                   )

puts trust_products_entity_assignment.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trusthub:v1:trust-products:entity-assignments:create \
   --trust-product-sid BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --object-sid BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X POST "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments" \
--data-urlencode "ObjectSid=BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "trust_product_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "object_sid": "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "date_created": "2019-07-31T02:34:41Z",
  "url": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments/BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

### 2.5. Evaluate the TrustProduct

This API request runs an automated evaluation on the TrustProduct. The response from Twilio indicates whether or not all required information (as per the Policy) is present in the TrustProduct.

If there are no errors, the response contains a `status` of `compliant`. Otherwise, the `status` is `noncompliant` and the `results` property contains information about invalid or missing information.

* The`trust_product_sid` is the SID of the TrustProduct.
* The `policy_sid` must be `RNb0d4771c2c98518d916a3d4cd70a8f8b`.

Evaluate the TrustProduct

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createTrustProductEvaluation() {
  const trustProductsEvaluation = await client.trusthub.v1
    .trustProducts("BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .trustProductsEvaluations.create({
      policySid: "RNb0d4771c2c98518d916a3d4cd70a8f8b",
    });

  console.log(trustProductsEvaluation.sid);
}

createTrustProductEvaluation();
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

trust_products_evaluation = client.trusthub.v1.trust_products(
    "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).trust_products_evaluations.create(
    policy_sid="RNb0d4771c2c98518d916a3d4cd70a8f8b"
)

print(trust_products_evaluation.sid)
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

        var trustProductsEvaluations = await TrustProductsEvaluationsResource.CreateAsync(
            policySid: "RNb0d4771c2c98518d916a3d4cd70a8f8b",
            pathTrustProductSid: "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(trustProductsEvaluations.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.trusthub.v1.trustproducts.TrustProductsEvaluations;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        TrustProductsEvaluations trustProductsEvaluations =
            TrustProductsEvaluations.creator("BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "RNb0d4771c2c98518d916a3d4cd70a8f8b")
                .create();

        System.out.println(trustProductsEvaluations.getSid());
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

	params := &trusthub.CreateTrustProductEvaluationParams{}
	params.SetPolicySid("RNb0d4771c2c98518d916a3d4cd70a8f8b")

	resp, err := client.TrusthubV1.CreateTrustProductEvaluation("BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

$trust_products_evaluation = $twilio->trusthub->v1
    ->trustProducts("BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->trustProductsEvaluations->create(
        "RNb0d4771c2c98518d916a3d4cd70a8f8b" // PolicySid
    );

print $trust_products_evaluation->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

trust_products_evaluation = @client
                            .trusthub
                            .v1
                            .trust_products('BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                            .trust_products_evaluations
                            .create(policy_sid: 'RNb0d4771c2c98518d916a3d4cd70a8f8b')

puts trust_products_evaluation.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trusthub:v1:trust-products:evaluations:create \
   --trust-product-sid BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --policy-sid RNb0d4771c2c98518d916a3d4cd70a8f8b
```

```bash
curl -X POST "https://trusthub.twilio.com/v1/TrustProducts/BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Evaluations" \
--data-urlencode "PolicySid=RNb0d4771c2c98518d916a3d4cd70a8f8b" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "ELaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "policy_sid": "RNb0d4771c2c98518d916a3d4cd70a8f8b",
  "trust_product_sid": "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "status": "noncompliant",
  "date_created": "2020-04-28T18:14:01Z",
  "url": "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Evaluations/ELaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "results": [
    {
      "friendly_name": "Business",
      "object_type": "business",
      "passed": false,
      "failure_reason": "A Business End-User is missing. Please add one to the regulatory bundle.",
      "error_code": 22214,
      "valid": [],
      "invalid": [
        {
          "friendly_name": "Business Name",
          "object_field": "business_name",
          "failure_reason": "The Business Name is missing. Please enter in a Business Name on the Business information.",
          "error_code": 22215
        },
        {
          "friendly_name": "Business Registration Number",
          "object_field": "business_registration_number",
          "failure_reason": "The Business Registration Number is missing. Please enter in a Business Registration Number on the Business information.",
          "error_code": 22215
        },
        {
          "friendly_name": "First Name",
          "object_field": "first_name",
          "failure_reason": "The First Name is missing. Please enter in a First Name on the Business information.",
          "error_code": 22215
        },
        {
          "friendly_name": "Last Name",
          "object_field": "last_name",
          "failure_reason": "The Last Name is missing. Please enter in a Last Name on the Business information.",
          "error_code": 22215
        }
      ],
      "requirement_friendly_name": "Business",
      "requirement_name": "business_info"
    },
    {
      "friendly_name": "Excerpt from the commercial register (Extrait K-bis) showing name of Authorized Representative",
      "object_type": "commercial_registrar_excerpt",
      "passed": false,
      "failure_reason": "An Excerpt from the commercial register (Extrait K-bis) showing name of Authorized Representative is missing. Please add one to the regulatory bundle.",
      "error_code": 22216,
      "valid": [],
      "invalid": [
        {
          "friendly_name": "Business Name",
          "object_field": "business_name",
          "failure_reason": "The Business Name is missing. Or, it does not match the Business Name you entered within Business information. Please enter in the Business Name shown on the Excerpt from the commercial register (Extrait K-bis) showing name of Authorized Representative or make sure both Business Name fields use the same exact inputs.",
          "error_code": 22217
        }
      ],
      "requirement_friendly_name": "Business Name",
      "requirement_name": "business_name_info"
    },
    {
      "friendly_name": "Excerpt from the commercial register showing French address",
      "object_type": "commercial_registrar_excerpt",
      "passed": false,
      "failure_reason": "An Excerpt from the commercial register showing French address is missing. Please add one to the regulatory bundle.",
      "error_code": 22216,
      "valid": [],
      "invalid": [
        {
          "friendly_name": "Address sid(s)",
          "object_field": "address_sids",
          "failure_reason": "The Address is missing. Please enter in the address shown on the Excerpt from the commercial register showing French address.",
          "error_code": 22219
        }
      ],
      "requirement_friendly_name": "Business Address (Proof of Address)",
      "requirement_name": "business_address_proof_info"
    },
    {
      "friendly_name": "Excerpt from the commercial register (Extrait K-bis)",
      "object_type": "commercial_registrar_excerpt",
      "passed": false,
      "failure_reason": "An Excerpt from the commercial register (Extrait K-bis) is missing. Please add one to the regulatory bundle.",
      "error_code": 22216,
      "valid": [],
      "invalid": [
        {
          "friendly_name": "Document Number",
          "object_field": "document_number",
          "failure_reason": "The Document Number is missing. Please enter in the Document Number shown on the Excerpt from the commercial register (Extrait K-bis).",
          "error_code": 22217
        }
      ],
      "requirement_friendly_name": "Business Registration Number",
      "requirement_name": "business_reg_no_info"
    },
    {
      "friendly_name": "Government-issued ID",
      "object_type": "government_issued_document",
      "passed": false,
      "failure_reason": "A Government-issued ID is missing. Please add one to the regulatory bundle.",
      "error_code": 22216,
      "valid": [],
      "invalid": [
        {
          "friendly_name": "First Name",
          "object_field": "first_name",
          "failure_reason": "The First Name is missing. Or, it does not match the First Name you entered within Business information. Please enter in the First Name shown on the Government-issued ID or make sure both First Name fields use the same exact inputs.",
          "error_code": 22217
        },
        {
          "friendly_name": "Last Name",
          "object_field": "last_name",
          "failure_reason": "The Last Name is missing. Or, it does not match the Last Name you entered within Business information. Please enter in the Last Name shown on the Government-issued ID or make sure both Last Name fields use the same exact inputs.",
          "error_code": 22217
        }
      ],
      "requirement_friendly_name": "Name of Authorized Representative",
      "requirement_name": "name_of_auth_rep_info"
    },
    {
      "friendly_name": "Executed Copy of Power of Attorney",
      "object_type": "power_of_attorney",
      "passed": false,
      "failure_reason": "An Executed Copy of Power of Attorney is missing. Please add one to the regulatory bundle.",
      "error_code": 22216,
      "valid": [],
      "invalid": [],
      "requirement_friendly_name": "Power of Attorney",
      "requirement_name": "power_of_attorney_info"
    },
    {
      "friendly_name": "Government-issued ID",
      "object_type": "government_issued_document",
      "passed": false,
      "failure_reason": "A Government-issued ID is missing. Please add one to the regulatory bundle.",
      "error_code": 22216,
      "valid": [],
      "invalid": [
        {
          "friendly_name": "First Name",
          "object_field": "first_name",
          "failure_reason": "The First Name is missing on the Governnment-Issued ID.",
          "error_code": 22217
        },
        {
          "friendly_name": "Last Name",
          "object_field": "last_name",
          "failure_reason": "The Last Name is missing on the Government-issued ID",
          "error_code": 22217
        }
      ],
      "requirement_friendly_name": "Name of Person granted the Power of Attorney",
      "requirement_name": "name_in_power_of_attorney_info"
    }
  ]
}
```

Address any errors before continuing to the next step.

### 2.6. Submit the TrustProduct for review

This API request submits the TrustProduct for review.

* The `sid` is the SID of the TrustProduct.
* The `status` must be `pending_review`.

Submit the TrustProduct for review

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
    .trustProducts("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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
    "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
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
            pathSid: "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

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
        TrustProducts trustProducts = TrustProducts.updater("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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

	resp, err := client.TrusthubV1.UpdateTrustProduct("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
    ->trustProducts("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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
                .trust_products('BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                .update(status: 'pending-review')

puts trust_product.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trusthub:v1:trust-products:update \
   --sid BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --status pending-review
```

```bash
curl -X POST "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
--data-urlencode "Status=pending-review" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

Continue to the next step. You don't need to wait for this TrustProduct's `status` to be `approved`.

## 3. Create a BrandRegistration

> \[!WARNING]
>
> Please rate limit all API requests for Brand and Campaign registration to one request per second.

This API request creates a BrandRegistration resource, which represents your customer's Brand. Creating the BrandRegistration resource submits all of the Brand-related information for vetting by TCR.

> \[!WARNING]
>
> This API request incurs fees on your Twilio Account. Learn more about A2P 10DLC registration fees in the [What pricing and fees are associated with the A2P 10DLC service? Help Center article](https://help.twilio.com/articles/1260803965530).

* The `customer_profile_bundle_sid` is the SID of your customer's Secondary Customer Profile.
* The `a2p_profile_bundle_sid` is the SID of the TrustProduct created in Step 2.1.
* `skip_automatic_sec_vet` is an optional Boolean. You should omit this parameter unless you know the Brand should skip secondary vetting. Read the [A2P 10DLC - Gather Business Information page](/docs/messaging/compliance/a2p-10dlc/collect-business-info#skip_automatic_sec_vet) for more details.

Create a BrandRegistration resource

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
      a2PProfileBundleSid: "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      customerProfileBundleSid: "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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
    customer_profile_bundle_sid="BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    a2p_profile_bundle_sid="BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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
            customerProfileBundleSid: "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            a2PProfileBundleSid: "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

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
            BrandRegistration.creator("BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
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
	params.SetCustomerProfileBundleSid("BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
	params.SetA2PProfileBundleSid("BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")

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
    "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", // CustomerProfileBundleSid
    "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" // A2PProfileBundleSid
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
                       customer_profile_bundle_sid: 'BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                       a2p_profile_bundle_sid: 'BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
                     )

puts brand_registration.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:messaging:v1:a2p:brand-registrations:create \
   --customer-profile-bundle-sid BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --a2p-profile-bundle-sid BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X POST "https://messaging.twilio.com/v1/a2p/BrandRegistrations" \
--data-urlencode "CustomerProfileBundleSid=BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
--data-urlencode "A2PProfileBundleSid=BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "BN0044409f7e067e279523808d267e2d85",
  "account_sid": "AC78e8e67fc0246521490fb9907fd0c165",
  "customer_profile_bundle_sid": "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "a2p_profile_bundle_sid": "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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
  "mock": false,
  "links": {
    "brand_vettings": "https://messaging.twilio.com/v1/a2p/BrandRegistrations/BN0044409f7e067e279523808d267e2d85/Vettings",
    "brand_registration_otps": "https://messaging.twilio.com/v1/a2p/BrandRegistrations/BN0044409f7e067e279523808d267e2d85/SmsOtp"
  }
}
```

The example below shows how to skip secondary vetting for the Brand. (Only for Low-Volume Standard Brands and 527 Political organizations)

Create a BrandRegistration resource - Skip secondary vetting

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
      a2PProfileBundleSid: "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      customerProfileBundleSid: "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      skipAutomaticSecVet: true,
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
    skip_automatic_sec_vet=True,
    customer_profile_bundle_sid="BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    a2p_profile_bundle_sid="BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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
            skipAutomaticSecVet: true,
            customerProfileBundleSid: "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            a2PProfileBundleSid: "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

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
            BrandRegistration.creator("BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                .setSkipAutomaticSecVet(true)
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
	params.SetSkipAutomaticSecVet(true)
	params.SetCustomerProfileBundleSid("BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
	params.SetA2PProfileBundleSid("BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")

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
    "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", // CustomerProfileBundleSid
    "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", // A2PProfileBundleSid
    ["skipAutomaticSecVet" => true]
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
                       skip_automatic_sec_vet: true,
                       customer_profile_bundle_sid: 'BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                       a2p_profile_bundle_sid: 'BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
                     )

puts brand_registration.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:messaging:v1:a2p:brand-registrations:create \
   --skip-automatic-sec-vet \
   --customer-profile-bundle-sid BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --a2p-profile-bundle-sid BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X POST "https://messaging.twilio.com/v1/a2p/BrandRegistrations" \
--data-urlencode "SkipAutomaticSecVet=true" \
--data-urlencode "CustomerProfileBundleSid=BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
--data-urlencode "A2PProfileBundleSid=BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "BN0044409f7e067e279523808d267e2d85",
  "account_sid": "AC78e8e67fc0246521490fb9907fd0c165",
  "customer_profile_bundle_sid": "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "a2p_profile_bundle_sid": "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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
  "skip_automatic_sec_vet": true,
  "errors": [],
  "mock": false,
  "links": {
    "brand_vettings": "https://messaging.twilio.com/v1/a2p/BrandRegistrations/BN0044409f7e067e279523808d267e2d85/Vettings",
    "brand_registration_otps": "https://messaging.twilio.com/v1/a2p/BrandRegistrations/BN0044409f7e067e279523808d267e2d85/SmsOtp"
  }
}
```

Save the `sid` from the response. You need this in a later step.

> \[!NOTE]
>
> Sometimes, Brand vetting by TCR can take several days.
>
> If the [BrandRegistration resources](/docs/messaging/api/brand-registration-resource#fetch-a-specific-brandregistration-resource)'s `status` is `IN_REVIEW` for more than two days, [contact Support](https://help.twilio.com/).

## 4. Create a Messaging Service

Your customer needs a [Messaging Service](/docs/messaging/services) through which it handles its A2P 10DLC messaging.

This section covers the creation of a new Messaging Service. You should create a new Messaging Service for A2P 10DLC rather than reuse an existing one.

Create a new Messaging Service

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createService() {
  const service = await client.messaging.v1.services.create({
    fallbackUrl: "https://www.example.com/fallback",
    friendlyName: "Acme, Inc.'s A2P 10DLC Messaging Service",
    inboundRequestUrl: "https://www.example.com/inbound-messages-webhook",
  });

  console.log(service.sid);
}

createService();
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

service = client.messaging.v1.services.create(
    friendly_name="Acme, Inc.'s A2P 10DLC Messaging Service",
    inbound_request_url="https://www.example.com/inbound-messages-webhook",
    fallback_url="https://www.example.com/fallback",
)

print(service.sid)
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

        var service = await ServiceResource.CreateAsync(
            friendlyName: "Acme, Inc.'s A2P 10DLC Messaging Service",
            inboundRequestUrl: new Uri("https://www.example.com/inbound-messages-webhook"),
            fallbackUrl: new Uri("https://www.example.com/fallback"));

        Console.WriteLine(service.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.net.URI;
import com.twilio.Twilio;
import com.twilio.rest.messaging.v1.Service;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Service service = Service.creator("Acme, Inc.'s A2P 10DLC Messaging Service")
                              .setInboundRequestUrl(URI.create("https://www.example.com/inbound-messages-webhook"))
                              .setFallbackUrl(URI.create("https://www.example.com/fallback"))
                              .create();

        System.out.println(service.getSid());
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

	params := &messaging.CreateServiceParams{}
	params.SetFriendlyName("Acme, Inc.'s A2P 10DLC Messaging Service")
	params.SetInboundRequestUrl("https://www.example.com/inbound-messages-webhook")
	params.SetFallbackUrl("https://www.example.com/fallback")

	resp, err := client.MessagingV1.CreateService(params)
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

$service = $twilio->messaging->v1->services->create(
    "Acme, Inc.'s A2P 10DLC Messaging Service", // FriendlyName
    [
        "inboundRequestUrl" =>
            "https://www.example.com/inbound-messages-webhook",
        "fallbackUrl" => "https://www.example.com/fallback",
    ]
);

print $service->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

service = @client
          .messaging
          .v1
          .services
          .create(
            friendly_name: 'Acme, Inc.\'s A2P 10DLC Messaging Service',
            inbound_request_url: 'https://www.example.com/inbound-messages-webhook',
            fallback_url: 'https://www.example.com/fallback'
          )

puts service.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:messaging:v1:services:create \
   --friendly-name "Acme, Inc.'s A2P 10DLC Messaging Service" \
   --inbound-request-url https://www.example.com/inbound-messages-webhook \
   --fallback-url https://www.example.com/fallback
```

```bash
curl -X POST "https://messaging.twilio.com/v1/Services" \
--data-urlencode "FriendlyName=Acme, Inc.'s A2P 10DLC Messaging Service" \
--data-urlencode "InboundRequestUrl=https://www.example.com/inbound-messages-webhook" \
--data-urlencode "FallbackUrl=https://www.example.com/fallback" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2015-07-30T20:12:31Z",
  "date_updated": "2015-07-30T20:12:33Z",
  "friendly_name": "Acme, Inc.'s A2P 10DLC Messaging Service",
  "inbound_request_url": "https://www.example.com/inbound-messages-webhook",
  "inbound_method": "POST",
  "fallback_url": "https://www.example.com/fallback",
  "fallback_method": "GET",
  "status_callback": "https://www.example.com",
  "sticky_sender": true,
  "smart_encoding": false,
  "mms_converter": true,
  "fallback_to_long_code": true,
  "scan_message_content": "inherit",
  "area_code_geomatch": true,
  "validity_period": 600,
  "synchronous_validation": true,
  "usecase": "marketing",
  "us_app_to_person_registered": false,
  "use_inbound_webhook_on_number": true,
  "links": {
    "phone_numbers": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers",
    "short_codes": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ShortCodes",
    "alpha_senders": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AlphaSenders",
    "messages": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages",
    "us_app_to_person": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Compliance/Usa2p",
    "us_app_to_person_usecases": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Compliance/Usa2p/Usecases",
    "channel_senders": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelSenders",
    "destination_alpha_senders": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/DestinationAlphaSenders"
  },
  "url": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

Save the SID returned by this request; you need it in a later step. You can also find Messaging Service SIDs in the Console or by using the [Read multiple Service resources API request](/docs/messaging/api/service-resource#read-multiple-service-resources).

This request creates an unconfigured Messaging Service. Read the [Messaging Service docs](/docs/messaging/services) to learn more about how to configure a Messaging Service.

> \[!CAUTION]
>
> Do not continue to the next step until the BrandRegistration's `status` is `APPROVED`.

## 5. Create an A2P Campaign

This section covers the creation of a UsAppToPerson resource, which contains the information about the business' messaging Campaign and Use Case.

> \[!CAUTION]
>
> Do not complete this section until the BrandRegistration's `status` is `APPROVED`.

### 5.1 Fetch possible A2P Campaign Use Cases

Once a BrandRegistration's `status` is approved, you can find out which Use Cases are available for your customer. The API request below returns all of the possible A2P Use Cases that your customer's Brand can use for an A2P Campaign.

* The `messaging_service_sid` is the SID of the Messaging Service from Step 4 above.
* The `brand_registration_sid` is the SID of the BrandRegistration resource you created in Step 3.

Fetch possible A2P Campaign Use cases

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchUsAppToPersonUsecase() {
  const usAppToPersonUsecase = await client.messaging.v1
    .services("MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .usAppToPersonUsecases.fetch({
      brandRegistrationSid: "BNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    });

  console.log(usAppToPersonUsecase.usAppToPersonUsecases);
}

fetchUsAppToPersonUsecase();
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

us_app_to_person_usecase = client.messaging.v1.services(
    "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).us_app_to_person_usecases.fetch(
    brand_registration_sid="BNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
)

print(us_app_to_person_usecase.us_app_to_person_usecases)
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

        var usAppToPersonUsecase = await UsAppToPersonUsecaseResource.FetchAsync(
            pathMessagingServiceSid: "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            brandRegistrationSid: "BNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(usAppToPersonUsecase.UsAppToPersonUsecases);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.messaging.v1.service.UsAppToPersonUsecase;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        UsAppToPersonUsecase usAppToPersonUsecase = UsAppToPersonUsecase.fetcher("MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                                                        .setBrandRegistrationSid("BNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                                                        .fetch();

        System.out.println(usAppToPersonUsecase.getUsAppToPersonUsecases());
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

	params := &messaging.FetchUsAppToPersonUsecaseParams{}
	params.SetBrandRegistrationSid("BNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")

	resp, err := client.MessagingV1.FetchUsAppToPersonUsecase("MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.UsAppToPersonUsecases != nil {
			for _, item := range *resp.UsAppToPersonUsecases {
				fmt.Println(item)
			}
		} else {
			fmt.Println(resp.UsAppToPersonUsecases)
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

$us_app_to_person_usecase = $twilio->messaging->v1
    ->services("MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->usAppToPersonUsecases->fetch([
        "brandRegistrationSid" => "BNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    ]);

print $us_app_to_person_usecase->usAppToPersonUsecases;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

us_app_to_person_usecase = @client
                           .messaging
                           .v1
                           .services('MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                           .us_app_to_person_usecases
                           .fetch(
                             brand_registration_sid: 'BNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
                           )

puts us_app_to_person_usecase.us_app_to_person_usecases
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:messaging:v1:services:compliance:usa2p:usecases:list \
   --messaging-service-sid MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --brand-registration-sid BNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X GET "https://messaging.twilio.com/v1/Services/MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Compliance/Usa2p/Usecases?BrandRegistrationSid=BNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "us_app_to_person_usecases": [
    {
      "code": "2FA",
      "name": "Two-Factor authentication (2FA)",
      "description": "Two-Factor authentication, one-time use password, password reset",
      "post_approval_required": false
    },
    {
      "code": "ACCOUNT_NOTIFICATION",
      "name": "Account Notification",
      "description": "All reminders, alerts, and notifications. (Examples include: flight delayed, hotel booked, appointment reminders.)",
      "post_approval_required": false
    },
    {
      "code": "AGENTS_FRANCHISES",
      "name": "Agents and Franchises",
      "description": "For brands that have multiple agents, franchises or offices in the same brand vertical, but require individual localised numbers per agent/location/office.",
      "post_approval_required": true
    },
    {
      "code": "CHARITY",
      "name": "Charity",
      "description": "Includes:  5013C Charity\nDoes not include: Religious organizations",
      "post_approval_required": false
    },
    {
      "code": "PROXY",
      "name": "Proxy",
      "description": "Peer-to-peer app-based group messaging with proxy/pooled numbers (For example: GroupMe)\nSupporting personalized services and non-exposure of personal numbers for enterprise or A2P communications. (Examples include: Uber and AirBnb.)",
      "post_approval_required": true
    },
    {
      "code": "CUSTOMER_CARE",
      "name": "Customer Care",
      "description": "All customer care messaging, including account management and support",
      "post_approval_required": false
    },
    {
      "code": "DELIVERY_NOTIFICATION",
      "name": "Delivery Notification",
      "description": "Information about the status of the delivery of a product or service",
      "post_approval_required": false
    },
    {
      "code": "EMERGENCY",
      "name": "Emergency",
      "description": "Notification services designed to support public safety / health during natural disasters, armed conflicts, pandemics and other national or regional emergencies",
      "post_approval_required": true
    },
    {
      "code": "FRAUD_ALERT",
      "name": "Fraud Alert Messaging",
      "description": "Fraud alert notification",
      "post_approval_required": false
    },
    {
      "code": "HIGHER_EDUCATION",
      "name": "Higher Education",
      "description": "For campaigns created on behalf of Colleges or Universities and will also include School Districts etc that fall outside of any \"free to the consumer\" messaging model",
      "post_approval_required": false
    },
    {
      "code": "K12_EDUCATION",
      "name": "K-12 Education",
      "description": "Campaigns created for messaging platforms that support schools from grades K-12 and distance learning centers. This is not for Post-Secondary schools.",
      "post_approval_required": true
    },
    {
      "code": "LOW_VOLUME",
      "name": "Low Volume Mixed",
      "description": "Low throughput, any combination of use-cases. Examples include:  test, demo accounts",
      "post_approval_required": false
    },
    {
      "code": "MARKETING",
      "name": "Marketing",
      "description": "Any communication with marketing and/or promotional content",
      "post_approval_required": false
    },
    {
      "code": "MIXED",
      "name": "Mixed",
      "description": "Mixed messaging reserved for specific consumer service industry",
      "post_approval_required": false
    },
    {
      "code": "POLITICAL",
      "name": "Political",
      "description": "Part of organized effort to influence decision making of specific group. All campaigns to be verified",
      "post_approval_required": false
    },
    {
      "code": "POLLING_VOTING",
      "name": "Polling and voting",
      "description": "Polling and voting",
      "post_approval_required": false
    },
    {
      "code": "PUBLIC_SERVICE_ANNOUNCEMENT",
      "name": "Public Service Announcement",
      "description": "An informational message that is meant to raise the audience awareness about an important issue",
      "post_approval_required": false
    },
    {
      "code": "SECURITY_ALERT",
      "name": "Security Alert",
      "description": "A notification that the security of a system, either software or hardware, has been compromised in some way and there is an action you need to take",
      "post_approval_required": false
    },
    {
      "code": "SOCIAL",
      "name": "Social",
      "description": "Communication within or between closed communities (For example: influencers alerts)",
      "post_approval_required": true
    },
    {
      "code": "SWEEPSTAKE",
      "name": "Sweepstake",
      "description": "Sweepstake",
      "post_approval_required": true
    }
  ]
}
```

Choose the Use Case that best aligns with your customer's business needs. This is used in the next step.

### 5.2 Create A2P Campaign

This step creates the UsAppToPerson resource. When you create this resource, you provide details about your customer's Campaign, such as how message recipients opt in and out, ask for help, and what the messages typically contain.

> \[!WARNING]
>
> Do not complete this step until the BrandRegistration's `status` is `APPROVED`.

The example below shows a sample request for businesses that are using Twilio's [default opt-out behavior](https://help.twilio.com/articles/223134027-Twilio-support-for-opt-out-keywords-SMS-STOP-filtering) or [Advanced Opt-out feature](/docs/messaging/tutorials/advanced-opt-out).

Businesses managing their own opt-out, opt-in, and help keywords need to provide additional information when registering a Campaign. Check out the [UsAppToPerson resource doc](/docs/messaging/api/usapptoperson-resource#create-a-usapptoperson-resource) for an example.

For more details on the format and contents of each parameter, visit the [A2P 10DLC - Gather Business Information page](/docs/messaging/compliance/a2p-10dlc/collect-business-info#campaign-details).

Create an A2P Campaign

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
      brandRegistrationSid: "BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      description: "Send marketing messages about sales and offers",
      hasEmbeddedLinks: true,
      hasEmbeddedPhone: true,
      messageFlow:
        "End users opt in by visiting www.example.com, creating a new user account, consenting to receive marketing messages via text, and providing a valid mobile phone number.",
      messageSamples: ["Message Sample 1", "Message Sample 2"],
      usAppToPersonUsecase: "MARKETING",
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
    description="Send marketing messages about sales and offers",
    us_app_to_person_usecase="MARKETING",
    has_embedded_links=True,
    has_embedded_phone=True,
    message_samples=["Message Sample 1", "Message Sample 2"],
    message_flow="End users opt in by visiting www.example.com, creating a new user account, consenting to receive marketing messages via text, and providing a valid mobile phone number.",
    brand_registration_sid="BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
            description: "Send marketing messages about sales and offers",
            usAppToPersonUsecase: "MARKETING",
            hasEmbeddedLinks: true,
            hasEmbeddedPhone: true,
            messageSamples: new List<string> { "Message Sample 1", "Message Sample 2" },
            messageFlow: "End users opt in by visiting www.example.com, creating a new user account, consenting to receive marketing messages via text, and providing a valid mobile phone number.",
            brandRegistrationSid: "BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
        UsAppToPerson usAppToPerson =
            UsAppToPerson
                .creator("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                    "BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                    "Send marketing messages about sales and offers",
                    "End users opt in by visiting www.example.com, creating a new user account, consenting to receive "
                    + "marketing messages via text, and providing a valid mobile phone number.",
                    Arrays.asList("Message Sample 1", "Message Sample 2"),
                    "MARKETING",
                    true,
                    true)
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
	params.SetDescription("Send marketing messages about sales and offers")
	params.SetUsAppToPersonUsecase("MARKETING")
	params.SetHasEmbeddedLinks(true)
	params.SetHasEmbeddedPhone(true)
	params.SetMessageSamples([]string{
		"Message Sample 1",
		"Message Sample 2",
	})
	params.SetMessageFlow("End users opt in by visiting www.example.com, creating a new user account, consenting to receive marketing messages via text, and providing a valid mobile phone number.")
	params.SetBrandRegistrationSid("BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

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
        "BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", // BrandRegistrationSid
        "Send marketing messages about sales and offers", // Description
        "End users opt in by visiting www.example.com, creating a new user account, consenting to receive marketing messages via text, and providing a valid mobile phone number.", // MessageFlow
        ["Message Sample 1", "Message Sample 2"], // MessageSamples
        "MARKETING", // UsAppToPersonUsecase
        true, // HasEmbeddedLinks
        true // HasEmbeddedPhone
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
                     description: 'Send marketing messages about sales and offers',
                     us_app_to_person_usecase: 'MARKETING',
                     has_embedded_links: true,
                     has_embedded_phone: true,
                     message_samples: [
                       'Message Sample 1',
                       'Message Sample 2'
                     ],
                     message_flow: 'End users opt in by visiting www.example.com, creating a new user account, consenting to receive marketing messages via text, and providing a valid mobile phone number.',
                     brand_registration_sid: 'BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
                   )

puts us_app_to_person.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:messaging:v1:services:compliance:usa2p:create \
   --messaging-service-sid MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --description "Send marketing messages about sales and offers" \
   --us-app-to-person-usecase MARKETING \
   --has-embedded-links \
   --has-embedded-phone \
   --message-samples "Message Sample 1" "Message Sample 2" \
   --message-flow "End users opt in by visiting www.example.com, creating a new user account, consenting to receive marketing messages via text, and providing a valid mobile phone number." \
   --brand-registration-sid BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X POST "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Compliance/Usa2p" \
--data-urlencode "Description=Send marketing messages about sales and offers" \
--data-urlencode "UsAppToPersonUsecase=MARKETING" \
--data-urlencode "HasEmbeddedLinks=true" \
--data-urlencode "HasEmbeddedPhone=true" \
--data-urlencode "MessageSamples=Message Sample 1" \
--data-urlencode "MessageSamples=Message Sample 2" \
--data-urlencode "MessageFlow=End users opt in by visiting www.example.com, creating a new user account, consenting to receive marketing messages via text, and providing a valid mobile phone number." \
--data-urlencode "BrandRegistrationSid=BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

### 5.3 Including privacy policy and terms & conditions URLs

Every A2P Campaign registration requires a valid Privacy Policy and Terms & Conditions URL to satisfy industry standards and pass vetting. While the API offers flexibility in how you submit these links, omitting them will result in campaign rejection.

> \[!NOTE]
>
> Every registration must include both a Privacy Policy and Terms & Conditions. Using dedicated fields supports faster vetting and reduces the risk of manual processing delays.

The API accepts `PrivacyPolicyUrl` and `TermsAndConditionsUrl` fields in your request with or without the version header.
To receive the `privacy_policy_url` and `terms_and_conditions_url` fields back in the API response, you must include the `X-Twilio-Api-Version` header set to `v1.2` in your request.

Create an A2P Campaign with Privacy Policy and Terms URLs

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
      brandRegistrationSid: "BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      description: "Send marketing messages about sales and offers",
      hasEmbeddedLinks: true,
      hasEmbeddedPhone: true,
      messageFlow:
        "End users opt in by visiting www.example.com, creating a new user account, consenting to receive marketing messages via text, and providing a valid mobile phone number.",
      messageSamples: ["Message Sample 1", "Message Sample 2"],
      privacyPolicyUrl: "https://www.example.com/privacy",
      termsAndConditionsUrl: "https://www.example.com/terms",
      usAppToPersonUsecase: "MARKETING",
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
    description="Send marketing messages about sales and offers",
    us_app_to_person_usecase="MARKETING",
    has_embedded_links=True,
    has_embedded_phone=True,
    message_samples=["Message Sample 1", "Message Sample 2"],
    message_flow="End users opt in by visiting www.example.com, creating a new user account, consenting to receive marketing messages via text, and providing a valid mobile phone number.",
    privacy_policy_url="https://www.example.com/privacy",
    terms_and_conditions_url="https://www.example.com/terms",
    brand_registration_sid="BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
            description: "Send marketing messages about sales and offers",
            usAppToPersonUsecase: "MARKETING",
            hasEmbeddedLinks: true,
            hasEmbeddedPhone: true,
            messageSamples: new List<string> { "Message Sample 1", "Message Sample 2" },
            messageFlow: "End users opt in by visiting www.example.com, creating a new user account, consenting to receive marketing messages via text, and providing a valid mobile phone number.",
            privacyPolicyUrl: new Uri("https://www.example.com/privacy"),
            termsAndConditionsUrl: new Uri("https://www.example.com/terms"),
            brandRegistrationSid: "BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            pathMessagingServiceSid: "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(usAppToPerson.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.net.URI;
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
        UsAppToPerson usAppToPerson =
            UsAppToPerson
                .creator("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                    "BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                    "Send marketing messages about sales and offers",
                    "End users opt in by visiting www.example.com, creating a new user account, consenting to receive "
                    + "marketing messages via text, and providing a valid mobile phone number.",
                    Arrays.asList("Message Sample 1", "Message Sample 2"),
                    "MARKETING",
                    true,
                    true)
                .setPrivacyPolicyUrl(URI.create("https://www.example.com/privacy"))
                .setTermsAndConditionsUrl(URI.create("https://www.example.com/terms"))
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
	params.SetDescription("Send marketing messages about sales and offers")
	params.SetUsAppToPersonUsecase("MARKETING")
	params.SetHasEmbeddedLinks(true)
	params.SetHasEmbeddedPhone(true)
	params.SetMessageSamples([]string{
		"Message Sample 1",
		"Message Sample 2",
	})
	params.SetMessageFlow("End users opt in by visiting www.example.com, creating a new user account, consenting to receive marketing messages via text, and providing a valid mobile phone number.")
	params.SetPrivacyPolicyUrl("https://www.example.com/privacy")
	params.SetTermsAndConditionsUrl("https://www.example.com/terms")
	params.SetBrandRegistrationSid("BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

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
        "BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", // BrandRegistrationSid
        "Send marketing messages about sales and offers", // Description
        "End users opt in by visiting www.example.com, creating a new user account, consenting to receive marketing messages via text, and providing a valid mobile phone number.", // MessageFlow
        ["Message Sample 1", "Message Sample 2"], // MessageSamples
        "MARKETING", // UsAppToPersonUsecase
        true, // HasEmbeddedLinks
        true, // HasEmbeddedPhone
        [
            "privacyPolicyUrl" => "https://www.example.com/privacy",
            "termsAndConditionsUrl" => "https://www.example.com/terms",
        ]
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
                     description: 'Send marketing messages about sales and offers',
                     us_app_to_person_usecase: 'MARKETING',
                     has_embedded_links: true,
                     has_embedded_phone: true,
                     message_samples: [
                       'Message Sample 1',
                       'Message Sample 2'
                     ],
                     message_flow: 'End users opt in by visiting www.example.com, creating a new user account, consenting to receive marketing messages via text, and providing a valid mobile phone number.',
                     privacy_policy_url: 'https://www.example.com/privacy',
                     terms_and_conditions_url: 'https://www.example.com/terms',
                     brand_registration_sid: 'BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
                   )

puts us_app_to_person.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:messaging:v1:services:compliance:usa2p:create \
   --messaging-service-sid MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --description "Send marketing messages about sales and offers" \
   --us-app-to-person-usecase MARKETING \
   --has-embedded-links \
   --has-embedded-phone \
   --message-samples "Message Sample 1" "Message Sample 2" \
   --message-flow "End users opt in by visiting www.example.com, creating a new user account, consenting to receive marketing messages via text, and providing a valid mobile phone number." \
   --privacy-policy-url https://www.example.com/privacy \
   --terms-and-conditions-url https://www.example.com/terms \
   --brand-registration-sid BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X POST "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Compliance/Usa2p" \
--data-urlencode "Description=Send marketing messages about sales and offers" \
--data-urlencode "UsAppToPersonUsecase=MARKETING" \
--data-urlencode "HasEmbeddedLinks=true" \
--data-urlencode "HasEmbeddedPhone=true" \
--data-urlencode "MessageSamples=Message Sample 1" \
--data-urlencode "MessageSamples=Message Sample 2" \
--data-urlencode "MessageFlow=End users opt in by visiting www.example.com, creating a new user account, consenting to receive marketing messages via text, and providing a valid mobile phone number." \
--data-urlencode "PrivacyPolicyUrl=https://www.example.com/privacy" \
--data-urlencode "TermsAndConditionsUrl=https://www.example.com/terms" \
--data-urlencode "BrandRegistrationSid=BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

> \[!NOTE]
>
> You can create up to five Campaigns per Brand, unless a clear and valid business reason is provided for exceeding this limit.

## 6. Add a phone number to the A2P 10DLC Messaging Service

Before your customer can begin sending A2P 10DLC messages, a 10DLC number must be added to the Messaging Service. Read the [Messaging Service PhoneNumber resource doc](/docs/messaging/api/phonenumber-resource#create-a-phonenumber-resource-add-a-phone-number-to-a-messaging-service) for more information.

## Additional resources

[Fetch a Campaign](/docs/messaging/api/usapptoperson-resource#fetch-a-usapptoperson-resource) - Use this API request to check a Campaign's registration status.

[Subscribe to a Campaign's status using Event Streams](/docs/messaging/compliance/a2p-10dlc/event-streams-setup) - Set up your own endpoint and subscribe to Brand, Campaign, and 10DLC Phone Number status updates from Twilio.

[Delete a UsAppToPerson resource](/docs/messaging/api/usapptoperson-resource#delete-a-usapptoperson-resource) - This API request deletes a Campaign and removes it from a Messaging Service.

[Troubleshooting A2P 10DLC Registrations](/docs/messaging/compliance/a2p-10dlc/troubleshooting-a2p-brands) - Learn how to understand registration failures and how to fix them.

[A2P 10DLC Campaign Approval Best Practices](https://help.twilio.com/hc/en-us/articles/11847054539547-A2P-10DLC-Campaign-Approval-Best-Practices) - Ensure your Campaigns meet all requirements.

[Trust Hub API Docs](/docs/trust-hub) - Read the API documentation for CustomerProfiles, EndUsers, TrustProducts, and SupportingDocuments.
