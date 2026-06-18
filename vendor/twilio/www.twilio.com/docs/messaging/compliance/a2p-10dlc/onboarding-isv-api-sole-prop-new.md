# New Sole Proprietor A2P 10DLC Registration for ISVs: API Walkthrough

This API walkthrough is for ISVs who are registering their customers for new A2P 10DLC Sole Proprietor Brands and Campaigns. **If you are not an ISV** but rather a direct customer looking to register your own Sole Proprietor Brand for A2P use, [see this guide](/docs/messaging/compliance/a2p-10dlc/direct-sole-proprietor-registration-overview)which will direct you to register your brand via our Console tool.

> \[!WARNING]
>
> Sole Proprietor Brands and Campaigns are only intended for customers **in the US and Canada who do not have a tax ID** (i.e. an EIN in the U.S. or a Canadian Business Number). If your customers have a Tax ID, you must register them for a [Standard](/docs/messaging/compliance/a2p-10dlc/onboarding-isv-api) or [Low-Volume Standard](/docs/messaging/compliance/a2p-10dlc/onboarding-isv-api) Brand. This includes U.S. customers registered as LLCs, even if they have a "Sole Proprietorship" LLC for IRS purposes (all US LLCs have an EIN and are therefore ineligible for Sole Proprietor Brand registration as this is defined by The Campaign Registry). If your customers are located outside of the US or Canada, you must register them for a [Standard](/docs/messaging/compliance/a2p-10dlc/onboarding-isv-api) or [Low-Volume Standard](/docs/messaging/compliance/a2p-10dlc/onboarding-isv-api) Brand to enable them to send messages to the US using 10DLC numbers.
>
> **Note for ISVs**: we understand that you may be relying on your secondary customers to self-report whether or not they have an EIN or equivalent Tax ID. Make sure they understand that, if they declare they are eligible for Sole Proprietor Brand registration but are subsequently found to have an EIN or equivalent Tax ID, their Campaign registration will error, and you or they will need to pay all associated fees and re-do their registration as a Standard or Low-Volume Standard Brand. This will also directly impact their traffic, since until they are registered correctly and completely they will not be able to send SMS 10DLC messages in the US.

> \[!NOTE]
>
> For all information entered as part of this registration process, The Campaign Registry (TCR) supports all "utf8mb4" supported characters. See the list for all Unicode 15.0 supported scripts and characters here: [https://www.unicode.org/charts/](https://www.unicode.org/charts/)

When registering your customers for Sole Proprietor Brands, you need to provide the following information for each customer. You must use your customer's information for registration. Do not use your own (i.e., the ISV's) information:

| **Field**                 | **Description**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| First and last name       | The customer's first and last name.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Email                     | This must be a well formatted address with a valid domain and cannot be a disposable address. This email address can only be used a **maximum of 10 times across all A2P Brand registrations with TCR**. If your customer is registered for A2P 10DLC with another vendor, that counts towards this limit.                                                                                                                                                                                                                                                                                                                                                                                                                             |
| Phone number              | The customer's business/contact phone number. It must be a well-formatted number and can be a landline, mobile, or other number.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Mobile number             | This mobile number is critical in the registration process and is used for sending a One Time Password (OTP) verification request to the customer, which they must respond to. This must be a valid US or Canadian mobile number only where the customer can be reached. **This cannot be a number which you've acquired from a CPaaS provider such as Twilio. This mobile number can only be used a maximum of three times across all A2P Brand registrations with TCR. If your customer is registered for A2P 10DLC with another vendor, that counts towards this limit.** You may use the same number for both the Phone Number field and the Mobile Number field, provided that this number satisfies all of the requirements here |
| Address                   | Must be a valid US or Canadian address. It can be a PO Box. This address can only be used a **maximum of 10 times across all A2P Brand registrations with TCR**. If your customer is registered for A2P 10DLC with another vendor, that counts towards this limit.                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Brand name                | If your customer is a Sole Proprietor business, this must be the customer's real business name. For Sole Proprietor businesses, their business name is usually their first name and last name, but you can also provide a DBA name if there is one. If your customer is not a business entity but instead is a hobbyist / college student, etc., provide their first name and last name. This field cannot be a unique identifier such as an account ID or email address.                                                                                                                                                                                                                                                              |
| Vertical (optional field) | You can select from a set of predefined values, which are the same as the vertical field in Primary Customer Profiles and Secondary Customer Profiles. [See the list of available values here.](#23-create-end-user-object-with-the-type-sole_proprietor_information)                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

> \[!CAUTION]
>
> Your customer's mobile phone number, which will be used for One Time Password (OTP) verification of their Brand, **can only be used a maximum of three times** for registering A2P 10DLC Brands. This is a limit at [The Campaign Registry (TCR)](https://www.campaignregistry.com/) level, and not within Twilio. If your customer registers for A2P 10DLC Sole Proprietor Brand with another vendor and uses this mobile number for verification, that will count towards their lifetime three-use limit.

Once you have this information for your customers, you can complete their Sole Proprietor registration via the API. API registration consists of the following steps:

1. **Create a Starter Profile** (a Starter Profile is used for later creating a Sole Proprietor Brand and Campaign, and can also be used for registering other products within TrustHub)
2. **Create a Sole Proprietor A2P Trust Bundle**
3. **Create a Sole Proprietor Brand and complete OTP verification** (you should only register 1 Sole Proprietor Brand for each unique customer)
4. **Create a Sole Proprietor Campaign** (each Sole Proprietor Brand can only have one Campaign)
5. **Add a Phone Number to the Campaign** (each Sole Proprietor Campaign can only use one Phone Number to send messages)

> \[!WARNING]
>
> It is programmatically possible to call each of the steps enumerated above, and detailed below in Parts 1, 2, 3 and 4, in a single uninterrupted sequence of API calls. However, Twilio applies various layers of validation and review to the various steps — some validations are synchronous or near-synchronous, others involve manual review and can take one or more full business days. We do NOT suggest that you wait for your Starter Profile to be manually approved before moving on, or for your Brand to be manually approved before creating a Campaign associated with it. However, we DO advise that, after submitting the complete Business Profile bundle in Step 1.8, you wait 30 seconds to see if any programmatic validation error surfaces before proceeding to the Trust Bundle creation in Step 2; that after the Trust Bundle is submitted in Step 2.6 you wait another 30 seconds before proceeding to Brand submission in Step 3; and that after Brand submission in Step 3 you wait 30 seconds before proceeding with Campaign creation in Step 4. Catching synchronous or near-synchronous upstream errors this way can dramatically reduce the amount of cleanup you have to do downstream, for examples deleting Campaigns whose Brands have failed, or deleting Brands (and Campaigns) whose Profiles have failed.\
> For troubleshooting and remediation of such failures during this registration process, see our [separate Troubleshooting documentation](/docs/messaging/compliance/a2p-10dlc/troubleshooting-a2p-brands).

## Prerequisite: Create a Trust Hub Profile for your Company (ISV)

**What does this do?** Creates a Trust Hub profile for your business (the ISV).

**Which API?** This can only be done via the Trust Hub UI in the Twilio Console.

Before proceeding with the onboarding process for your clients, all ISVs must have a primary customer profile in an **APPROVED** state. You can do this in the Trust Hub, [located in the Twilio Console](https://console.twilio.com/us1/account/trust-hub/customer-profile). In order to register secondary profiles, the primary customer profile needs to have "ISV Reseller or Partner" selected as your Business Identity.

To get the highest possible messaging limits, create your profile with details that exactly match those in your US EIN listing (or that of your relevant national Tax ID if your ISV business is located outside the U.S.). If there are any differences - for example, in the business name or address - your messaging limits will be lower. Verify these details via your W2 form or equivalent national tax record.

## 1. Create Starter Customer Profile(s) and attach required information

**Which API? Trust Hub API**

This step creates Starter Customer Profiles for your customers using a Trust Hub policy with the identifier `RN806dd6cd175f314e1f96a9727ee271f4`. Trust Hub supports many types of compliance collections, but this specific policy is for Starter Profiles, which can be used for Sole Proprietor Brands.

### 1.1 Fetch the Starter Customer Profile Policy

The Starter Customer Profile Policy contains all of the fields you need to complete when creating a Starter Customer Profile. You can refer back to this throughout the registration process to ensure you are completing the necessary fields. When you have completed the Starter Customer Profile for this customer, you will submit it to be evaluated against this Customer Profile Policy (in step 1.7 of this walkthrough) to ensure that it meets all requirements.

The SID for the Starter Customer Profile Policy is `RN806dd6cd175f314e1f96a9727ee271f4`.

1.1 Fetch the Starter Customer Profile Policy

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchPolicies() {
  const policy = await client.trusthub.v1
    .policies("RN806dd6cd175f314e1f96a9727ee271f4")
    .fetch();

  console.log(policy.sid);
}

fetchPolicies();
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

policy = client.trusthub.v1.policies(
    "RN806dd6cd175f314e1f96a9727ee271f4"
).fetch()

print(policy.sid)
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

        var policies =
            await PoliciesResource.FetchAsync(pathSid: "RN806dd6cd175f314e1f96a9727ee271f4");

        Console.WriteLine(policies.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.trusthub.v1.Policies;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Policies policies = Policies.fetcher("RN806dd6cd175f314e1f96a9727ee271f4").fetch();

        System.out.println(policies.getSid());
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

	resp, err := client.TrusthubV1.FetchPolicies("RN806dd6cd175f314e1f96a9727ee271f4")
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

$policy = $twilio->trusthub->v1
    ->policies("RN806dd6cd175f314e1f96a9727ee271f4")
    ->fetch();

print $policy->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

policy = @client
         .trusthub
         .v1
         .policies('RN806dd6cd175f314e1f96a9727ee271f4')
         .fetch

puts policy.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trusthub:v1:policies:fetch \
   --sid RN806dd6cd175f314e1f96a9727ee271f4
```

```bash
curl -X GET "https://trusthub.twilio.com/v1/Policies/RN806dd6cd175f314e1f96a9727ee271f4" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "url": "https://trusthub.twilio.com/v1/Policies/RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "requirements": {
    "end_user": [
      {
        "url": "/EndUserTypes/customer_profile_business_information",
        "fields": [
          "business_type",
          "business_registration_number",
          "business_name",
          "business_registration_identifier",
          "business_identity",
          "business_industry",
          "website_url",
          "business_regions_of_operation",
          "social_media_profile_urls"
        ],
        "type": "customer_profile_business_information",
        "name": "Business Information",
        "requirement_name": "customer_profile_business_information"
      },
      {
        "url": "/EndUserTypes/authorized_representative_1",
        "fields": [
          "first_name",
          "last_name",
          "email",
          "phone_number",
          "business_title",
          "job_position"
        ],
        "type": "authorized_representative_1",
        "name": "Authorized Representative 1",
        "requirement_name": "authorized_representative_1"
      },
      {
        "url": "/EndUserTypes/authorized_representative_2",
        "fields": [
          "first_name",
          "last_name",
          "email",
          "phone_number",
          "business_title",
          "job_position"
        ],
        "type": "authorized_representative_2",
        "name": "Authorized Representative 2",
        "requirement_name": "authorized_representative_2"
      }
    ],
    "supporting_trust_products": [],
    "supporting_document": [
      [
        {
          "description": "Customer Profile HQ Physical Address",
          "type": "document",
          "name": "Physical Business Address",
          "accepted_documents": [
            {
              "url": "/SupportingDocumentTypes/customer_profile_address",
              "fields": [
                "address_sids"
              ],
              "type": "customer_profile_address",
              "name": "Physical Business Address"
            }
          ],
          "requirement_name": "customer_profile_address"
        }
      ]
    ],
    "supporting_customer_profiles": []
  },
  "friendly_name": "Primary Customer Profile of type Business",
  "sid": "RN806dd6cd175f314e1f96a9727ee271f4"
}
```

### 1.2 Create a Starter Customer Profile Bundle

This Starter Customer Profile Bundle contains information about your customer. You will fill out some of the fields now, and will attach more information to this Bundle in later steps. You will submit this Bundle for review in the last step of Section 1 of this walkthrough.

| **Parameter**               | **Valid Values**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| friendly\_name              | A string representing your customer's business name. This is an internal name meant for you to identify this particular customer profile Bundle for your customer.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| email                       | A string representing your customer's email address                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| policy\_sid                 | The static TrustHub policy identifier for Starter profiles. The hard-coded value is RN806dd6cd175f314e1f96a9727ee271f4 and you use this value for every Starter Customer Profile Bundle you create.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| status\_callback (optional) | The URL at which you would like to receive webhook requests about status updates to this Profile Bundle. See the [Bundles Resource documentation](/docs/phone-numbers/regulatory/api/bundles#status-callback) for details on Twilio's request to your webhook. **NOTE**: while the use of a `status_callback` webhook is optional, it is highly recommended if you would like a detailed `failure_reason` for a Customer Profile, in the case of a Profile rejection, such as the email and address validation failure reasons discussed below and in Section 1.4. Only this kind of failure detail will allow self-service remediation as discussed in Section 1.9 below. A failed Customer Profile submission (Step 1.8) will also generate an email to the email address of the ISV's profile, indicating failure, but this email will NOT give a detailed failure reason and will instead direct you to contact Twilio support for details. |

> \[!WARNING]
>
> Beginning in early December, Twilio will perform a data validation check on the **email** field in the above API call. The validations and rejection reasons are as follows:
>
> | **Description**                                                                         | **Rejection reason**                        |
> | --------------------------------------------------------------------------------------- | ------------------------------------------- |
> | Email domain should have correct syntax                                                 | Email domain has an invalid address syntax. |
> | Email domain is unknown                                                                 | Unknown email domain.                       |
> | Temporary email which can be disposable                                                 | Email is a suspected disposable address.    |
> | If email check have passed all above validations and still is invalid from SendGrid API | Email is invalid.                           |
>
> These detailed failure reasons are provided **only** in the `status_callback` message sent to the status\_callback webhook URL, if one has been provided in the Starter Customer Profile Bundle creation call. If you are not using a `status_callback` webhook, you will still be notified of the Profile submission's general failure status via email to the ISV email contact, but this email will not include any detail as to `failure_reason`, so for this you would need to contact support before you could remediate the issue(s) in Step 1.9 below.

1.2 Create an Empty Starter Customer Profile Bundle

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
    email: "johndoe@example.com",
    friendlyName: "John Doe Starter Customer Profile Bundle",
    policySid: "RN806dd6cd175f314e1f96a9727ee271f4",
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
    friendly_name="John Doe Starter Customer Profile Bundle",
    email="johndoe@example.com",
    policy_sid="RN806dd6cd175f314e1f96a9727ee271f4",
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
            friendlyName: "John Doe Starter Customer Profile Bundle",
            email: "johndoe@example.com",
            policySid: "RN806dd6cd175f314e1f96a9727ee271f4");

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
        CustomerProfiles customerProfiles = CustomerProfiles
                                                .creator("John Doe Starter Customer Profile Bundle",
                                                    "johndoe@example.com",
                                                    "RN806dd6cd175f314e1f96a9727ee271f4")
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
	params.SetFriendlyName("John Doe Starter Customer Profile Bundle")
	params.SetEmail("johndoe@example.com")
	params.SetPolicySid("RN806dd6cd175f314e1f96a9727ee271f4")

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
    "John Doe Starter Customer Profile Bundle", // FriendlyName
    "johndoe@example.com", // Email
    "RN806dd6cd175f314e1f96a9727ee271f4" // PolicySid
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
                     friendly_name: 'John Doe Starter Customer Profile Bundle',
                     email: 'johndoe@example.com',
                     policy_sid: 'RN806dd6cd175f314e1f96a9727ee271f4'
                   )

puts customer_profile.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trusthub:v1:customer-profiles:create \
   --friendly-name "John Doe Starter Customer Profile Bundle" \
   --email johndoe@example.com \
   --policy-sid RN806dd6cd175f314e1f96a9727ee271f4
```

```bash
curl -X POST "https://trusthub.twilio.com/v1/CustomerProfiles" \
--data-urlencode "FriendlyName=John Doe Starter Customer Profile Bundle" \
--data-urlencode "Email=johndoe@example.com" \
--data-urlencode "PolicySid=RN806dd6cd175f314e1f96a9727ee271f4" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "policy_sid": "RN806dd6cd175f314e1f96a9727ee271f4",
  "friendly_name": "John Doe Starter Customer Profile Bundle",
  "status": "draft",
  "email": "johndoe@example.com",
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

You will use the SID from this new Customer Profile Bundle you created (the SID begins with `BU`) in a later step.

### 1.3 Create an end-user object with the type `starter_customer_profile_information`

| **Parameter**  | **Valid Values**                                                                                                                        |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| attributes     | An object containing your customer's first name, last name, email address, and phone number                                             |
| friendly\_name | A string representing the end-user object you create in this step. This is for your internal purposes for identifying the end customer. |
| type           | The end user object type. This will always be `starter_customer_profile_information` for Starter Profiles.                              |

The `attributes` object should contain the following fields:

```json
{
   "email": "starter-profile-enduser@example.com",
   "first_name": "John",
   "last_name": "Doe",
   "phone_number": "+11234567890"
}

```

1.3 Create an end-user object with the type: starter\_customer\_profile\_information

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
      email: "starter-profile-enduser@example.com",
      first_name: "John",
      last_name: "Doe",
      phone_number: "+11234567890",
    },
    friendlyName: "Starter Profile End User",
    type: "starter_customer_profile_information",
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
        "email": "starter-profile-enduser@example.com",
        "first_name": "John",
        "last_name": "Doe",
        "phone_number": "+11234567890",
    },
    friendly_name="Starter Profile End User",
    type="starter_customer_profile_information",
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
                Object>() { { "email", "starter-profile-enduser@example.com" }, { "first_name", "John" }, { "last_name", "Doe" }, { "phone_number", "+11234567890" } },
            friendlyName: "Starter Profile End User",
            type: "starter_customer_profile_information");

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
        EndUser endUser = EndUser.creator("Starter Profile End User", "starter_customer_profile_information")
                              .setAttributes(new HashMap<String, Object>() {
                                  {
                                      put("email", "starter-profile-enduser@example.com");
                                      put("first_name", "John");
                                      put("last_name", "Doe");
                                      put("phone_number", "+11234567890");
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
		"email":        "starter-profile-enduser@example.com",
		"first_name":   "John",
		"last_name":    "Doe",
		"phone_number": "+11234567890",
	})
	params.SetFriendlyName("Starter Profile End User")
	params.SetType("starter_customer_profile_information")

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
    "Starter Profile End User", // FriendlyName
    "starter_customer_profile_information", // Type
    [
        "attributes" => [
            "email" => "starter-profile-enduser@example.com",
            "first_name" => "John",
            "last_name" => "Doe",
            "phone_number" => "+11234567890",
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
               'email' => 'starter-profile-enduser@example.com',
               'first_name' => 'John',
               'last_name' => 'Doe',
               'phone_number' => '+11234567890'
             },
             friendly_name: 'Starter Profile End User',
             type: 'starter_customer_profile_information'
           )

puts end_user.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trusthub:v1:end-users:create \
   --attributes "{\"email\":\"starter-profile-enduser@example.com\",\"first_name\":\"John\",\"last_name\":\"Doe\",\"phone_number\":\"+11234567890\"}" \
   --friendly-name "Starter Profile End User" \
   --type starter_customer_profile_information
```

```bash
ATTRIBUTES_OBJ=$(cat << EOF
{
  "email": "starter-profile-enduser@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "phone_number": "+11234567890"
}
EOF
)
curl -X POST "https://trusthub.twilio.com/v1/EndUsers" \
--data-urlencode "Attributes=$ATTRIBUTES_OBJ" \
--data-urlencode "FriendlyName=Starter Profile End User" \
--data-urlencode "Type=starter_customer_profile_information" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "date_updated": "2021-02-16T20:40:57Z",
  "sid": "ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "Starter Profile End User",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://trusthub.twilio.com/v1/EndUsers/ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2021-02-16T20:40:57Z",
  "attributes": {
    "email": "starter-profile-enduser@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "phone_number": "+11234567890"
  },
  "type": "starter_customer_profile_information"
}
```

You will use the SID of the new end-user object you created (the SID begins with `IT`) in a later step.

### 1.4 Create a supporting document: customer\_profile\_address

Here, you create an Address object for the customer, which you then attach to their customer profile. Note that you can only use a valid US or Canadian address if you are creating a Sole Proprietor registration.

See [this table](/docs/usage/api/address#request-body-parameters) for a list of parameters to provide to the API request.

> \[!WARNING]
>
> Beginning in early December 2023, Twilio will perform a data validation check on the **address** fields submitted in the above API call. The validations and rejection reasons are as follows:
>
> | If given address is not present                                        | Address not found with sid ADXXXXXXXXXXXXXXXXXXXXXXXX                                                                                                                                           |
> | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
> | If given address is not a valid US/CA address                          | The provided address is not a valid US or Canada address                                                                                                                                        |
> | If given address has invalid postal code                               | \[address\_sids] - Invalid Postal Code. Address suggestion -> Street: 1 Jersey St. Secondary Street: Boston, MA 02215-4147. Locality: Boston. Region: MA. Postal Code: 02215-4147. Country: US; |
> | If given address has invalid street name("street": "1 Jersey Str")     | \[address\_sids] - Invalid Street. Address suggestion -> Street: 1 Jersey St. Secondary Street: Boston, MA 02215-4147. Locality: Boston. Region: MA. Postal Code: 02215-4147. Country: US       |
> | If given address has invalid locality("locality": "Bostun")            | \[address\_sids] - Invalid Locality. Address suggestion -> Street: 1 Jersey St. Secondary Street: Boston, MA 02215-4147. Locality: Boston. Region: MA. Postal Code: 02215-4147. Country: US;    |
> | If given address has invalid region("region": "MAA")                   | \[address\_sids] - Invalid Region. Address suggestion -> Street: 1 Jersey St. Secondary Street: Boston, MA 02215-4147. Locality: Boston. Region: MA. Postal Code: 02215-4147. Country: US;      |
> | If given address has Invalid house number("street": "10000 Jersey St") | \[address\_sids] - Invalid House Number                                                                                                                                                         |
>
> NOTE that this data validation check, like the one performed on the email address submitted in Step 1.2 above, is not actually performed until the submission of the complete Profile bundle in Step 1.8 below. These validations are also asynchronous. As with the email validation, to receive the kind of detailed `failure_reason` for an address validation that is enumerated in the above table, you will need to have provided a `status_callback` webhook upon your initial creation of the Customer Profile in Step 1.2. This failure\_reason detail would then be provided in the status callback to that webhook. An email indicating more generic status for the Profile will also be sent to the email address indicated in your ISV Primary Customer Profile and will direct you to contact Twilio Support for actionable detail before you can proceed with remediation of the secondary profile as covered in Section 1.9 below.

1.4 Create a supporting document: customer\_profile\_address

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
    city: "Example City",
    customerName: "John Doe",
    isoCountry: "US",
    postalCode: "12345",
    region: "CA",
    street: "123 Example Street",
    streetSecondary: "Apt B",
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
    customer_name="John Doe",
    street="123 Example Street",
    street_secondary="Apt B",
    city="Example City",
    region="CA",
    iso_country="US",
    postal_code="12345",
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
            customerName: "John Doe",
            street: "123 Example Street",
            streetSecondary: "Apt B",
            city: "Example City",
            region: "CA",
            isoCountry: "US",
            postalCode: "12345");

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
        Address address = Address.creator("John Doe", "123 Example Street", "Example City", "CA", "12345", "US")
                              .setStreetSecondary("Apt B")
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
	params.SetCustomerName("John Doe")
	params.SetStreet("123 Example Street")
	params.SetStreetSecondary("Apt B")
	params.SetCity("Example City")
	params.SetRegion("CA")
	params.SetIsoCountry("US")
	params.SetPostalCode("12345")

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
    "John Doe", // CustomerName
    "123 Example Street", // Street
    "Example City", // City
    "CA", // Region
    "12345", // PostalCode
    "US", // IsoCountry
    ["streetSecondary" => "Apt B"]
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
            customer_name: 'John Doe',
            street: '123 Example Street',
            street_secondary: 'Apt B',
            city: 'Example City',
            region: 'CA',
            iso_country: 'US',
            postal_code: '12345'
          )

puts address.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:addresses:create \
   --customer-name "John Doe" \
   --street "123 Example Street" \
   --street-secondary "Apt B" \
   --city "Example City" \
   --region CA \
   --iso-country US \
   --postal-code 12345
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Addresses.json" \
--data-urlencode "CustomerName=John Doe" \
--data-urlencode "Street=123 Example Street" \
--data-urlencode "StreetSecondary=Apt B" \
--data-urlencode "City=Example City" \
--data-urlencode "Region=CA" \
--data-urlencode "IsoCountry=US" \
--data-urlencode "PostalCode=12345" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "city": "Example City",
  "customer_name": "John Doe",
  "date_created": "Tue, 18 Aug 2015 17:07:30 +0000",
  "date_updated": "Tue, 18 Aug 2015 17:07:30 +0000",
  "emergency_enabled": false,
  "friendly_name": "Main Office",
  "iso_country": "US",
  "postal_code": "12345",
  "region": "CA",
  "sid": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "street": "123 Example Street",
  "street_secondary": "Apt B",
  "validated": false,
  "verified": false,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Addresses/ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

### 1.5 Create a Supporting Document with the Address from Step 1.4

Once you have a valid address SID from this Address object you just created (the SID beings with `AD`), you can create a Supporting Document object. This Supporting Document will later be assigned to the Starter Customer Profile Bundle that you created in step 1.2.

The Supporting Document will need the following values:

| **Parameter**  | **Valid Values**                                             |
| -------------- | ------------------------------------------------------------ |
| attributes     | An object containing the Address SID from the previous step. |
| friendly\_name | A string you use to identify this Supporting Document        |
| type           | The string `customer_profile_address`                        |

The `attributes` object should look like this:

```json
{
   "address_sids": "ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
}

```

1.5 Create a Supporting Document with the Address from Step 1.4

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
        address_sids: "ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      },
      friendlyName: "SP Document Address",
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
    attributes={"address_sids": "ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"},
    friendly_name="SP Document Address",
    type="customer_profile_address",
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
            attributes: new Dictionary<
                string,
                Object>() { { "address_sids", "ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" } },
            friendlyName: "SP Document Address",
            type: "customer_profile_address");

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
        SupportingDocument supportingDocument =
            SupportingDocument.creator("SP Document Address", "customer_profile_address")
                .setAttributes(new HashMap<String, Object>() {
                    {
                        put("address_sids", "ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
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
	params.SetAttributes(map[string]interface{}{
		"address_sids": "ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
	})
	params.SetFriendlyName("SP Document Address")
	params.SetType("customer_profile_address")

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
    "SP Document Address", // FriendlyName
    "customer_profile_address", // Type
    [
        "attributes" => [
            "address_sids" => "ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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
                        attributes: {
                          'address_sids' => 'ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
                        },
                        friendly_name: 'SP Document Address',
                        type: 'customer_profile_address'
                      )

puts supporting_document.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trusthub:v1:supporting-documents:create \
   --attributes "{\"address_sids\":\"ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\"}" \
   --friendly-name "SP Document Address" \
   --type customer_profile_address
```

```bash
ATTRIBUTES_OBJ=$(cat << EOF
{
  "address_sids": "ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
}
EOF
)
curl -X POST "https://trusthub.twilio.com/v1/SupportingDocuments" \
--data-urlencode "Attributes=$ATTRIBUTES_OBJ" \
--data-urlencode "FriendlyName=SP Document Address" \
--data-urlencode "Type=customer_profile_address" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "status": "DRAFT",
  "date_updated": "2021-02-11T17:23:00Z",
  "friendly_name": "SP Document Address",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://trusthub.twilio.com/v1/SupportingDocuments/RDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2021-02-11T17:23:00Z",
  "sid": "RDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "attributes": {
    "address_sids": "ADXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
  },
  "type": "customer_profile_address",
  "mime_type": null
}
```

You will use the SID from this new Supporting Document (the SID begins with `RD`) in the next step.

### 1.6 Assign End-User, Supporting Document, and Primary Customer Profile to the Starter Customer Profile that you created

Attach the SIDs from all the steps above to the Starter Customer Profile:

* End-User Object SID (step 1.3): Begins with `IT`.
* Starter Customer Profile SID (step 1.2): Begins with `BU`.
* Supporting Document SID (step 1.5): Begins with `RD`.
* Primary Customer Profile Bundle SID (from parent account, mentioned in the Prerequisites section): Begins with `BU`. You can find this in the [Customer Profile Details page in Twilio Console](https://console.twilio.com/us1/account/trust-hub/customer-profiles).

### 1.6.1 Attach the end-user (from Step 1.3) to the Starter Customer Profile

The Starter Customer Profile SID from step 1.2 is the path parameter for this request. The body of the request should contain one parameter, called `object_sid`, which is the End-User Object SID from step 1.3. See the code sample below as an example.

1.6.1 Attach the end-user (from Step 1.3) to the Starter Customer Profile

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
      objectSid: "ITXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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
    object_sid="ITXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
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
                objectSid: "ITXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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
                .creator("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "ITXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
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
	params.SetObjectSid("ITXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")

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
        "ITXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" // ObjectSid
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
                                        object_sid: 'ITXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
                                      )

puts customer_profiles_entity_assignment.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trusthub:v1:customer-profiles:entity-assignments:create \
   --customer-profile-sid BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --object-sid ITXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X POST "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments" \
--data-urlencode "ObjectSid=ITXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "customer_profile_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "object_sid": "ITXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "date_created": "2019-07-31T02:34:41Z",
  "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments/BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

#### 1.6.2 Attach the Supporting Document (from Step 1.4) to the Starter Customer Profile

The Starter Customer Profile SID from step 1.2 is the path parameter for this request. The body of the request should contain one parameter, called `object_sid`, which is the Supporting Document SID from step 1.5. See the code sample below as an example.

1.6.2 Attach the Supporting Document (from Step 1.4) to the Starter Customer Profile

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
      objectSid: "RDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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
    object_sid="RDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
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
                objectSid: "RDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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
                .creator("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "RDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
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
	params.SetObjectSid("RDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")

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
        "RDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" // ObjectSid
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
                                        object_sid: 'RDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
                                      )

puts customer_profiles_entity_assignment.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trusthub:v1:customer-profiles:entity-assignments:create \
   --customer-profile-sid BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --object-sid RDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X POST "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments" \
--data-urlencode "ObjectSid=RDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "customer_profile_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "object_sid": "RDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "date_created": "2019-07-31T02:34:41Z",
  "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments/BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

### 1.6.3 Attach the Primary Customer Profile Bundle to the Starter Customer Profile Bundle

This step is applicable only for ISV customers of Twilio. ISV customers should already have Primary Customer Profile setup in their parent/main account from where they can fetch its Bundle SID (the SID starts with `BU`). See the Prerequisites for more information.

The Starter Customer Profile SID from step 1.2 is the path parameter for this request. The body of the request should contain one parameter, called `object_sid`, which is the Primary Customer Bundle SID. See the code sample below as an example.

1.6.3 Attach the Primary Customer Profile Bundle to the Starter Customer Profile Bundle

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
      objectSid: "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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
    object_sid="BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
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
                objectSid: "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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
                .creator("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
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
	params.SetObjectSid("BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")

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
        "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" // ObjectSid
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
                                        object_sid: 'BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
                                      )

puts customer_profiles_entity_assignment.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trusthub:v1:customer-profiles:entity-assignments:create \
   --customer-profile-sid BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --object-sid BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X POST "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments" \
--data-urlencode "ObjectSid=BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "customer_profile_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "object_sid": "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "date_created": "2019-07-31T02:34:41Z",
  "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments/BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

### 1.7 Evaluate the Starter Customer Profile

This step evaluates the Starter Customer Profile against the Starter Customer Profile Policy (which you fetched in step 1.1; the Starter Customer Profile Policy has the SID `RN806dd6cd175f314e1f96a9727ee271f4`).

The Starter Customer Profile SID from step 1.2 is the path parameter for this request. The body of the request should contain one parameter, called `policy_sid`, which is the hardcoded Policy SID `RN806dd6cd175f314e1f96a9727ee271f4`.

If your Starter Customer Profile is missing any required information, the response to the API request will indicate that those fields are not complete. You should go back and complete the missing fields from the previous steps.

If your Starter Customer Profile matches the expected Starter Customer Profile Policy, the response will indicate that the profile is `compliant` and that you can move on to the next step.

1.7 Evaluate the Starter Customer Profile

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
    .customerProfiles("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .customerProfilesEvaluations.create({
      policySid: "RN806dd6cd175f314e1f96a9727ee271f4",
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
    "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).customer_profiles_evaluations.create(
    policy_sid="RN806dd6cd175f314e1f96a9727ee271f4"
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
            policySid: "RN806dd6cd175f314e1f96a9727ee271f4",
            pathCustomerProfileSid: "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

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
                .creator("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "RN806dd6cd175f314e1f96a9727ee271f4")
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
	params.SetPolicySid("RN806dd6cd175f314e1f96a9727ee271f4")

	resp, err := client.TrusthubV1.CreateCustomerProfileEvaluation("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
    ->customerProfiles("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->customerProfilesEvaluations->create(
        "RN806dd6cd175f314e1f96a9727ee271f4" // PolicySid
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
                               .customer_profiles('BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                               .customer_profiles_evaluations
                               .create(
                                 policy_sid: 'RN806dd6cd175f314e1f96a9727ee271f4'
                               )

puts customer_profiles_evaluation.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trusthub:v1:customer-profiles:evaluations:create \
   --customer-profile-sid BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --policy-sid RN806dd6cd175f314e1f96a9727ee271f4
```

```bash
curl -X POST "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Evaluations" \
--data-urlencode "PolicySid=RN806dd6cd175f314e1f96a9727ee271f4" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "ELaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "compliant",
  "date_created": "2023-03-15T13:51:57Z",
  "policy_sid": "RN806dd6cd175f314e1f96a9727ee271f4",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "customer_profile_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Evaluations/ELaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "results": [
    {
      "valid": [
        {
          "object_field": "first_name",
          "error_code": null,
          "friendly_name": "First Name",
          "passed": true,
          "failure_reason": null
        },
        {
          "object_field": "last_name",
          "error_code": null,
          "friendly_name": "Last Name",
          "passed": true,
          "failure_reason": null
        },
        {
          "object_field": "email",
          "error_code": null,
          "friendly_name": "Email Address",
          "passed": true,
          "failure_reason": null
        },
        {
          "object_field": "phone_number",
          "error_code": null,
          "friendly_name": "Phone Number",
          "passed": true,
          "failure_reason": null
        }
      ],
      "invalid": [],
      "object_type": "starter_customer_profile_information",
      "friendly_name": "Information",
      "failure_reason": null,
      "passed": true,
      "requirement_friendly_name": "Starter Customer Profile Information",
      "error_code": null,
      "requirement_name": "starter_customer_profile_information"
    },
    {
      "valid": [
        {
          "object_field": "address_sids",
          "error_code": null,
          "friendly_name": "address sids",
          "passed": true,
          "failure_reason": null
        }
      ],
      "invalid": [],
      "object_type": "customer_profile_address",
      "friendly_name": "Legal Company Address",
      "failure_reason": null,
      "passed": true,
      "requirement_friendly_name": "Customer Profile Address",
      "error_code": null,
      "requirement_name": "customer_profile_address"
    },
    {
      "valid": [
        {
          "object_field": "bundle_sid",
          "error_code": null,
          "friendly_name": "Supporting Bundle Status",
          "passed": true,
          "failure_reason": null
        }
      ],
      "invalid": [],
      "object_type": "primary_customer_profile_type_business",
      "friendly_name": "Primary Customer Profile Bundle",
      "failure_reason": null,
      "passed": true,
      "requirement_friendly_name": "Primary Customer Profile",
      "error_code": null,
      "requirement_name": "primary_customer_profile"
    }
  ]
}
```

### 1.8 Submit the Starter Customer Profile for review

Once you have evaluated the Starter Customer Profile against the Starter Customer Profile Policy and the response says that the profile is compliant, you are ready to submit the profile.

The Starter Customer Profile `status` field has the following possible values:

* draft
* pending-review
* in-review
* twilio-rejected
* twilio-approved

When you first create the profile, it will be in the `draft` state. To submit the profile for review, you update the profile's status to `pending-review` via API request (the example of this request is below). The result of this API request will update the profile's status to `in-review` (which you should see in the response to your API request), at which point you should move on to the next step in this walkthrough.

> \[!NOTE]
>
> Proceed to the next step as soon as the Starter Customer Profile is in the `in-review` state. Do not wait for it to be `twilio-approved`. The Starter Customer Profile will only reach the `twilio-approved` status when a Brand is successfully created and OTP-verified in the following section, so you must proceed in order for the Starter Customer Profile to be approved.

1.8 Submit the Starter Customer Profile for review

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
    .customerProfiles("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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
    "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
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
            pathSid: "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

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
        CustomerProfiles customerProfiles = CustomerProfiles.updater("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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

	resp, err := client.TrusthubV1.UpdateCustomerProfile("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
    ->customerProfiles("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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
                   .customer_profiles('BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                   .update(status: 'pending-review')

puts customer_profile.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trusthub:v1:customer-profiles:update \
   --sid BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --status pending-review
```

```bash
curl -X POST "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
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
  "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "customer_profiles_entity_assignments": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments",
    "customer_profiles_evaluations": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Evaluations",
    "customer_profiles_channel_endpoint_assignment": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments"
  },
  "errors": null
}
```

## 2. Create a new Sole Proprietor A2P Trust Bundle and attach required information

**Which API? Trust Hub API**

Once your Starter Customer Profile from the previous step is `in_review`, you can create a new Sole Proprietor Trust Bundle for your customer, which you will then use to complete a Sole Proprietor Brand. The steps in this section are very similar to the ones you completed in Section 1, but you will provide different information about your customer here.

### 2.1 Fetch the Sole Proprietor A2P Trust Policy

Similar to Step 1.1, fetch the Sole Proprietor A2P Trust Policy to help you determine if you are meeting all the requirements for your Trust Bundle before you submit it.

The Sole Proprietor A2P Trust Policy contains all of the fields you need to complete when creating a Sole Proprietor Trust Bundle. You can refer back to this throughout the registration process to ensure you are completing the necessary fields. When you have completed the Sole Proprietor Trust Bundle for this customer, you will submit it to be evaluated against this Trust Policy to ensure that it meets all requirements.

The SID for the Starter Customer Profile Policy is `RN670d5d2e282a6130ae063b234b6019c8`.

2.1 Fetch the Sole Proprietor A2P Trust Policy

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchPolicies() {
  const policy = await client.trusthub.v1
    .policies("RN670d5d2e282a6130ae063b234b6019c8")
    .fetch();

  console.log(policy.sid);
}

fetchPolicies();
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

policy = client.trusthub.v1.policies(
    "RN670d5d2e282a6130ae063b234b6019c8"
).fetch()

print(policy.sid)
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

        var policies =
            await PoliciesResource.FetchAsync(pathSid: "RN670d5d2e282a6130ae063b234b6019c8");

        Console.WriteLine(policies.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.trusthub.v1.Policies;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Policies policies = Policies.fetcher("RN670d5d2e282a6130ae063b234b6019c8").fetch();

        System.out.println(policies.getSid());
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

	resp, err := client.TrusthubV1.FetchPolicies("RN670d5d2e282a6130ae063b234b6019c8")
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

$policy = $twilio->trusthub->v1
    ->policies("RN670d5d2e282a6130ae063b234b6019c8")
    ->fetch();

print $policy->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

policy = @client
         .trusthub
         .v1
         .policies('RN670d5d2e282a6130ae063b234b6019c8')
         .fetch

puts policy.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trusthub:v1:policies:fetch \
   --sid RN670d5d2e282a6130ae063b234b6019c8
```

```bash
curl -X GET "https://trusthub.twilio.com/v1/Policies/RN670d5d2e282a6130ae063b234b6019c8" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "url": "https://trusthub.twilio.com/v1/Policies/RN670d5d2e282a6130ae063b234b6019c8",
  "requirements": {
    "end_user": [
      {
        "url": "/EndUserTypes/sole_proprietor_information",
        "fields": [
          "brand_name",
          "mobile_phone_number",
          "vertical"
        ],
        "type": "sole_proprietor_information",
        "name": "Sole Proprietor Information",
        "requirement_name": "sole_proprietor_information"
      }
    ],
    "supporting_trust_products": [],
    "supporting_document": [
      []
    ],
    "supporting_customer_profiles": [
      {
        "type": "starter_customer_profile_type_business",
        "name": "Starter Customer Profile(isv customers) Proof",
        "requirement_name": "customer_profile"
      },
      {
        "type": "starter_customer_profile_type_direct_long_tail",
        "name": "Starter Customer Profile(direct customers) Proof",
        "requirement_name": "customer_profile"
      }
    ]
  },
  "friendly_name": "Sole Proprietor TrustProduct",
  "sid": "RN670d5d2e282a6130ae063b234b6019c8"
}
```

### 2.2 Create a Sole Proprietor A2P Trust Bundle

This Sole Proprietor A2P Trust Bundle contains information about your customer (from the profile you created above) and their Brand. You fill out some of the fields now, and attach more information to this Bundle in later steps. You will submit this Bundle for review in the last step of Section 2 of this walkthrough.

These are the parameters for the API request to create a Sole Proprietor A2P Trust Bundle:

| **Parameter**    | **Valid Values**                                                                                                                                                                                                                                             |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| friendly\_name   | A string representing your customer's business name. This is an internal name for you to identify this Bundle for your customer.                                                                                                                             |
| email            | A string representing your customer's email address                                                                                                                                                                                                          |
| policy\_sid      | The static A2P Messaging TrustHub Policy identifier. The hard-coded value is `RN670d5d2e282a6130ae063b234b6019c8`.                                                                                                                                           |
| status\_callback | The URL at which you would like to receive webhook requests about status updates to this Trust Bundle. See the [Bundles Resource documentation](/docs/phone-numbers/regulatory/api/bundles#status-callback) for details on Twilio's request to your webhook. |

2.2 Create a Sole Proprietor A2P Trust Bundle

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
    email: "johndoe@example.com",
    friendlyName: "John Doe Sole Proprietor A2P Trust Bundle",
    policySid: "RN670d5d2e282a6130ae063b234b6019c8",
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
    friendly_name="John Doe Sole Proprietor A2P Trust Bundle",
    email="johndoe@example.com",
    policy_sid="RN670d5d2e282a6130ae063b234b6019c8",
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
            friendlyName: "John Doe Sole Proprietor A2P Trust Bundle",
            email: "johndoe@example.com",
            policySid: "RN670d5d2e282a6130ae063b234b6019c8");

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
        TrustProducts trustProducts = TrustProducts
                                          .creator("John Doe Sole Proprietor A2P Trust Bundle",
                                              "johndoe@example.com",
                                              "RN670d5d2e282a6130ae063b234b6019c8")
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
	params.SetFriendlyName("John Doe Sole Proprietor A2P Trust Bundle")
	params.SetEmail("johndoe@example.com")
	params.SetPolicySid("RN670d5d2e282a6130ae063b234b6019c8")

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
    "John Doe Sole Proprietor A2P Trust Bundle", // FriendlyName
    "johndoe@example.com", // Email
    "RN670d5d2e282a6130ae063b234b6019c8" // PolicySid
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
                  friendly_name: 'John Doe Sole Proprietor A2P Trust Bundle',
                  email: 'johndoe@example.com',
                  policy_sid: 'RN670d5d2e282a6130ae063b234b6019c8'
                )

puts trust_product.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trusthub:v1:trust-products:create \
   --friendly-name "John Doe Sole Proprietor A2P Trust Bundle" \
   --email johndoe@example.com \
   --policy-sid RN670d5d2e282a6130ae063b234b6019c8
```

```bash
curl -X POST "https://trusthub.twilio.com/v1/TrustProducts" \
--data-urlencode "FriendlyName=John Doe Sole Proprietor A2P Trust Bundle" \
--data-urlencode "Email=johndoe@example.com" \
--data-urlencode "PolicySid=RN670d5d2e282a6130ae063b234b6019c8" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "policy_sid": "RN670d5d2e282a6130ae063b234b6019c8",
  "friendly_name": "John Doe Sole Proprietor A2P Trust Bundle",
  "status": "draft",
  "email": "johndoe@example.com",
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

You will use the SID from this new Sole Proprietor Trust Bundle you created (the SID begins with `BU`) in a later step.

### 2.3 Create end-user object with the type `sole_proprietor_information`

In this step, you provide information about your customer's brand name, their mobile number for their Sole Proprietor Brand verification, and optionally their business vertical.

> \[!CAUTION]
>
> In this step, you provide your customer's mobile number, which TCR will use to send a One Time Password (OTP) verification request. This must be a valid US or Canadian mobile number where the customer can be reached. **This cannot be a number you've acquired from a CPaaS provider such as Twilio.**
>
> The customer will receive the OTP message when you submit the Brand for review in step 3. They **must respond to the request within 24 hours**, or else you will need to retrigger the OTP message using the optional step 3.2. Additionally, the OTP verification must be completed within 30 days of Brand registration. See step 3.1 for more details.
>
> This mobile number **can only be used a maximum of three times** for Sole Proprietor A2P Brands. This includes if the customer has registered for a Sole Proprietor Brand with another vendor and has used the same mobile phone number. This limit is managed through TCR and not through Twilio.

Include the following parameters in your API request:

| **Parameter**  | **Valid Values**                                                                                                                                                                                                                                                                                                     |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| attributes     | An object containing your customer's business name (which is usually their first and last name, if they do not have a business name / DBA name), their mobile phone number, and optionally, their business vertical. See the note above about the importance of the customer's mobile phone number for verification. |
| friendly\_name | A string to identify this end user object for your customer                                                                                                                                                                                                                                                          |
| type           | The string `sole_proprietor_information`                                                                                                                                                                                                                                                                             |

The `attributes` object should look like this:

```json
{
   "brand_name": "John Doe",
   "vertical": "COMMUNICATION",
   "mobile_phone_number": "+11234567890"
}

```

The optional `vertical` field describes the customer's business. It can be one of the following values:

* AGRICULTURE
* COMMUNICATION
* CONSTRUCTION
* EDUCATION
* ENERGY
* ENTERTAINMENT
* FINANCIAL
* GAMBLING
* GOVERNMENT
* HEALTHCARE
* HOSPITALITY
* HUMAN\_RESOURCES
* INSURANCE
* LEGAL
* MANUFACTURING
* NGO
* POLITICAL
* `POST`AL
* PROFESSIONAL
* REAL\_ESTATE
* RETAIL
* TECHNOLOGY
* TRANSPORTATION

2.3 Create an end-user object with the type sole\_proprietor\_information

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
      brand_name: "John Doe",
      vertical: "COMMUNICATION",
      mobile_phone_number: "+11234567890",
    },
    friendlyName: "Sole Proprietor A2P Trust Bundle End User",
    type: "sole_proprietor_information",
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
        "brand_name": "John Doe",
        "vertical": "COMMUNICATION",
        "mobile_phone_number": "+11234567890",
    },
    friendly_name="Sole Proprietor A2P Trust Bundle End User",
    type="sole_proprietor_information",
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
                Object>() { { "brand_name", "John Doe" }, { "vertical", "COMMUNICATION" }, { "mobile_phone_number", "+11234567890" } },
            friendlyName: "Sole Proprietor A2P Trust Bundle End User",
            type: "sole_proprietor_information");

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
        EndUser endUser = EndUser.creator("Sole Proprietor A2P Trust Bundle End User", "sole_proprietor_information")
                              .setAttributes(new HashMap<String, Object>() {
                                  {
                                      put("brand_name", "John Doe");
                                      put("vertical", "COMMUNICATION");
                                      put("mobile_phone_number", "+11234567890");
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
		"brand_name":          "John Doe",
		"vertical":            "COMMUNICATION",
		"mobile_phone_number": "+11234567890",
	})
	params.SetFriendlyName("Sole Proprietor A2P Trust Bundle End User")
	params.SetType("sole_proprietor_information")

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
    "Sole Proprietor A2P Trust Bundle End User", // FriendlyName
    "sole_proprietor_information", // Type
    [
        "attributes" => [
            "brand_name" => "John Doe",
            "vertical" => "COMMUNICATION",
            "mobile_phone_number" => "+11234567890",
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
               'brand_name' => 'John Doe',
               'vertical' => 'COMMUNICATION',
               'mobile_phone_number' => '+11234567890'
             },
             friendly_name: 'Sole Proprietor A2P Trust Bundle End User',
             type: 'sole_proprietor_information'
           )

puts end_user.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trusthub:v1:end-users:create \
   --attributes "{\"brand_name\":\"John Doe\",\"vertical\":\"COMMUNICATION\",\"mobile_phone_number\":\"+11234567890\"}" \
   --friendly-name "Sole Proprietor A2P Trust Bundle End User" \
   --type sole_proprietor_information
```

```bash
ATTRIBUTES_OBJ=$(cat << EOF
{
  "brand_name": "John Doe",
  "vertical": "COMMUNICATION",
  "mobile_phone_number": "+11234567890"
}
EOF
)
curl -X POST "https://trusthub.twilio.com/v1/EndUsers" \
--data-urlencode "Attributes=$ATTRIBUTES_OBJ" \
--data-urlencode "FriendlyName=Sole Proprietor A2P Trust Bundle End User" \
--data-urlencode "Type=sole_proprietor_information" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "date_updated": "2021-02-16T20:40:57Z",
  "sid": "ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "Sole Proprietor A2P Trust Bundle End User",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "url": "https://trusthub.twilio.com/v1/EndUsers/ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2021-02-16T20:40:57Z",
  "attributes": {
    "brand_name": "John Doe",
    "vertical": "COMMUNICATION",
    "mobile_phone_number": "+11234567890"
  },
  "type": "sole_proprietor_information"
}
```

You will use the SID from this new end-user you created (the SID begins with `IT`) in the next step.

### 2.4 Assign the end-user and starter customer profile to the Sole Proprietor A2P Trust Bundle

Attach the SIDs from the end-user object you created in step 2.3 and the Starter Customer Profile you created in step 1.2 to the Sole Proprietor Trust Bundle you created in step 2.2 (the SID for the Sole Proprietor Trust Bundle begins with `BU`).

* End-User Object SID (step 2.3): SID begins with `IT`.
* Starter Customer Profile SID (step 1.2): SID begins with `BU`.

#### 2.4.1 Attach the end-user (from Step 2.3) to the Sole Proprietor A2P Bundle

The Sole Proprietor A2P Bundle SID from step 2.2 is the path parameter for this request. The body of the request should contain one parameter, called `object_sid`, which is the End-User Object SID from step 2.3. See the code sample below as an example.

2.4.1 Attach the end-user (from Step 2.3) to the Sole Proprietor A2P Bundle

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

#### 2.4.2 Assign the Starter Customer Profile Bundle to the Sole Proprietor A2P Trust Bundle

The Sole Proprietor A2P Bundle SID from step 2.2 is the path parameter for this request. The body of the request should contain one parameter, called `object_sid`, which is the Starter Customer Profile Bundle SID from step 1.3. See the code sample below as an example.

2.4.2 Assign the Starter Customer Profile Bundle to the Sole Proprietor A2P Trust Bundle

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

### 2.5 Evaluate the Sole Proprietor A2P Trust Bundle

This step evaluates the Sole Proprietor A2P Trust Bundle against the Sole Proprietor A2P Trust Policy (which you fetched in step 2.1; the Sole Proprietor A2P Trust Policy has the SID `RN670d5d2e282a6130ae063b234b6019c8`).

The Sole Proprietor Trust Bundle SID from step 2.2 is the path parameter for this request. The body of the request should contain one parameter, called `policy_sid`, which is the hardcoded Policy SID `RN670d5d2e282a6130ae063b234b6019c8`.

If your Sole Proprietor Trust Bundle is missing any required information, the response to the API request will indicate that those fields are not complete. You should go back and complete the missing fields from the previous steps.

If your Sole Proprietor Trust Bundle matches the expected Sole Proprietor Trust Policy, the response will indicate that the profile is `compliant` and that you can move on to the next step.

2.5 Evaluate the Sole Proprietor A2P Trust Bundle

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
    .trustProducts("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .trustProductsEvaluations.create({
      policySid: "RN670d5d2e282a6130ae063b234b6019c8",
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
    "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).trust_products_evaluations.create(
    policy_sid="RN670d5d2e282a6130ae063b234b6019c8"
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
            policySid: "RN670d5d2e282a6130ae063b234b6019c8",
            pathTrustProductSid: "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

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
            TrustProductsEvaluations.creator("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "RN670d5d2e282a6130ae063b234b6019c8")
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
	params.SetPolicySid("RN670d5d2e282a6130ae063b234b6019c8")

	resp, err := client.TrusthubV1.CreateTrustProductEvaluation("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
    ->trustProducts("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->trustProductsEvaluations->create(
        "RN670d5d2e282a6130ae063b234b6019c8" // PolicySid
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
                            .trust_products('BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                            .trust_products_evaluations
                            .create(policy_sid: 'RN670d5d2e282a6130ae063b234b6019c8')

puts trust_products_evaluation.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trusthub:v1:trust-products:evaluations:create \
   --trust-product-sid BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --policy-sid RN670d5d2e282a6130ae063b234b6019c8
```

```bash
curl -X POST "https://trusthub.twilio.com/v1/TrustProducts/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Evaluations" \
--data-urlencode "PolicySid=RN670d5d2e282a6130ae063b234b6019c8" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "ELaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "policy_sid": "RN670d5d2e282a6130ae063b234b6019c8",
  "trust_product_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

### 2.6 Submit the Sole Proprietor A2P Trust Bundle for review

Once you have evaluated the Sole Proprietor Trust Bundle against the Sole Proprietor Trust Policy and the response says that the profile is compliant, you are ready to submit the profile.

The Sole Proprietor Trust Bundle `status` field has the following possible values:

* draft
* pending-review
* in-review
* twilio-rejected
* twilio-approved

When you first create the Trust Bundle, it will be in the `draft` state. To submit the Trust Bundle for review, update the Bundle's status to `pending-review` via API request (the example of this request is below). The result of this API request will update the profile's status to `in-review` (which you should see in the response to your API request), at which point you should move on to the next step in this walkthrough.

> \[!WARNING]
>
> You should proceed to the next step as soon as the Sole Proprietor A2P Trust Bundle is in the `in-review` state. Do not wait for it to be `twilio-approved`. The Starter Customer Profile and Sole Proprietor A2P Trust Bundle will only reach the `twilio-approved` status when a Brand is successfully created and OTP-verified, and you should never wait for this status change.

2.6 Submit the Sole Proprietor A2P Trust Bundle for review

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

## 3. Create a new Sole Proprietor A2P Brand

**Which API? Messaging API**

In this step, you will create a Sole Proprietor A2P Brand using the Customer Profile SID from step 1.2 and the Trust Bundle SID from step 2.2. You should have already submitted both of these objects for review in the previous steps, but you shouldn't wait for them to be approved before continuing.

3. Create a new Sole Proprietor A2P Brand

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
      a2PProfileBundleSid: "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      brandType: "SOLE_PROPRIETOR",
      customerProfileBundleSid: "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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
    brand_type="SOLE_PROPRIETOR",
    customer_profile_bundle_sid="BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    a2p_profile_bundle_sid="BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
            brandType: "SOLE_PROPRIETOR",
            customerProfileBundleSid: "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            a2PProfileBundleSid: "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

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
            BrandRegistration.creator("BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                .setBrandType("SOLE_PROPRIETOR")
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
	params.SetBrandType("SOLE_PROPRIETOR")
	params.SetCustomerProfileBundleSid("BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
	params.SetA2PProfileBundleSid("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

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
    "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", // CustomerProfileBundleSid
    "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", // A2PProfileBundleSid
    ["brandType" => "SOLE_PROPRIETOR"]
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
                       brand_type: 'SOLE_PROPRIETOR',
                       customer_profile_bundle_sid: 'BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                       a2p_profile_bundle_sid: 'BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
                     )

puts brand_registration.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:messaging:v1:a2p:brand-registrations:create \
   --brand-type SOLE_PROPRIETOR \
   --customer-profile-bundle-sid BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --a2p-profile-bundle-sid BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X POST "https://messaging.twilio.com/v1/a2p/BrandRegistrations" \
--data-urlencode "BrandType=SOLE_PROPRIETOR" \
--data-urlencode "CustomerProfileBundleSid=BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
--data-urlencode "A2PProfileBundleSid=BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "BN0044409f7e067e279523808d267e2d85",
  "account_sid": "AC78e8e67fc0246521490fb9907fd0c165",
  "customer_profile_bundle_sid": "BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "a2p_profile_bundle_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2021-01-28T10:45:51Z",
  "date_updated": "2021-01-28T10:45:51Z",
  "brand_type": "SOLE_PROPRIETOR",
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

### 3.1 GET the Sole Proprietor Brand registration status

> \[!NOTE]
>
> You can set up and subscribe to Brand status **Event Streams**, so that an event message will be sent to a specified webhook URL when the new Brand has been successfully registered or has failed registration. [See this guide](/docs/messaging/compliance/a2p-10dlc/event-streams-setup) for setting up the necessary Event Streams **sinks** and **event subscriptions**, and for information on reading each event message payload.

You can check the status of your customer's Sole Proprietor Brand registration with a `GET` request. This should update within a few minutes after submitting the Sole Proprietor Brand API request from the step above.

The API will return the following information about the registration:

| **Property**     | **Possible Values**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| status           | `PENDING`, `APPROVED`, `FAILED` or `SUSPENDED`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| identity\_status | `UNVERIFIED` or `VERIFIED` `UNVERIFIED` means that the customer has not verified the OTP request sent to their mobile number. This value will change from `UNVERIFIED` to `VERIFIED` after your customer successfully verifies the mobile number provided in [Step 2.3](https://docs.google.com/document/d/1bM4YlHpRNHuBjvWDuWStQLI-fqj0ZqscaRT1KvwGw0o/edit#heading=h.nmgyt7db114c)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| failure\_reason  | Only present if the `status` is `FAILED`. This describes the reason for the Brand registration failure. Possible reasons for failure and the resolutions are: —"Unable to fetch A2P Bundle Details, check if the correct bundle sid was provided for registration and the bundle is compliant." -> Check Bundle Details and retry —"Unable to fetch Customer Profile Bundle details, check if the correct bundle sid was provided for registration and the bundle is compliant." -> Check Bundle Details and retry —"Unable to register Brand with The Campaign Registry" -> review the registration requirements defined at the beginning of this document and ensure that your registration information is complete and meets the requirements (for additional information, see [https://help.twilio.com/hc/en-us/articles/14488596590491-Why-did-my-Sole-Proprietor-Brand-Registration-Fail-](https://help.twilio.com/hc/en-us/articles/14488596590491-Why-did-my-Sole-Proprietor-Brand-Registration-Fail-).) Verify that the supplied information is accurate and well-formed before contacting [Twilio Support](https://help.twilio.com) |

When the Sole Proprietor Brand first enters the `APPROVED` state, the `identity_status` will still be `UNVERIFIED`. The change to the `APPROVED` state triggers a new SMS OTP, which is sent to the mobile number registered with the Brand (from step 2.3). The OTP is valid for 24 hours. If your customer does not complete the OTP verification request after 24 hours, you can use this API to trigger a fresh OTP for verification.

The owner of the mobile number will receive a text message sent from +1(915)-278-2000 with the following text: "Please confirm your registration for US A2P Messaging by replying YES. Msg & data rates may apply."

The owner of the mobile number must reply "YES" back to the OTP message to complete Brand verification. Once they do that, they should receive another confirmation message on their mobile number that says "Thank you. Your registration has been confirmed." The Brand state will remain as `APPROVED`, and their `identity_status` will now change to `VERIFIED`

Note that only the first OTP is sent automatically; if your customer does not complete the OTP verification request within 24 hours, you need to send an API request to trigger a new OTP (see step 3.2 for the API request to retrigger this OTP). Additionally, make every effort to ensure that your customer completes OTP verification within 30 days of Brand registration. At some point going forward, The Campaign Registry (TCR) may begin to enforce a 30-day limit for this OTP completion, after which the Brand registration would be marked as EXPIRED, and would need to be deleted and resubmitted (this documentation will be updated if and when TCR begins to enforce this).

You will need to wait until the Sole Proprietor Brand is approved and verified before moving on to Step 4.

If your Brand registration has `FAILED`, or if it is `APPROVED` but with a lower **Trust Score** than you feel your Brand merits, see this [Guide to Troubleshooting A2P Brands](/docs/messaging/compliance/a2p-10dlc/troubleshooting-a2p-brands) to understand and rectify specific Brand feedback.

The status of `SUSPENDED` is rare. This status indicates that your Brand is deemed to have potentially violated one or more rules for Brand registration established by the A2P ecosystem partners. This status will require Twilio Support assistance to address. See [the relevant section of our Troubleshooting guide](/docs/messaging/compliance/a2p-10dlc/troubleshooting-a2p-brands/troubleshooting-and-rectifying-a2p-standardlvs-brands#brands-with-suspended-status-and-related-campaign-suspensions) for details.

3.1 GET the Sole Proprietor Brand registration status

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function fetchBrandRegistrations() {
  const brandRegistration = await client.messaging.v1
    .brandRegistrations("BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .fetch();

  console.log(brandRegistration.sid);
}

fetchBrandRegistrations();
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

brand_registration = client.messaging.v1.brand_registrations(
    "BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).fetch()

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

        var brandRegistration = await BrandRegistrationResource.FetchAsync(
            pathSid: "BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

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
        BrandRegistration brandRegistration = BrandRegistration.fetcher("BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").fetch();

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
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	resp, err := client.MessagingV1.FetchBrandRegistrations("BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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

$brand_registration = $twilio->messaging->v1
    ->brandRegistrations("BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->fetch();

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
                     .brand_registrations('BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                     .fetch

puts brand_registration.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:messaging:v1:a2p:brand-registrations:fetch \
   --sid BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://messaging.twilio.com/v1/a2p/BrandRegistrations/BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "a2p_profile_bundle_sid": "BUbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
  "customer_profile_bundle_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "APPROVED",
  "identity_status": "VERIFIED",
  "brand_type": "SOLE_PROPRIETOR",
  "mock": false,
  "tcr_id": null,
  "brand_score": null,
  "russell_3000": null,
  "brand_feedback": null,
  "failure_reason": null,
  "government_entity": null,
  "tax_exempt_status": null,
  "skip_automatic_sec_vet": false,
  "errors": [],
  "date_updated": "2023-03-15T14:21:42Z",
  "date_created": "2023-03-15T14:21:42Z",
  "url": "https://messaging.twilio.com/v1/a2p/BrandRegistrations/BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "links": {
    "brand_vettings": "https://messaging.twilio.com/v1/a2p/BrandRegistrations/BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Vettings",
    "brand_registration_otps": "https://messaging.twilio.com/v1/a2p/BrandRegistrations/BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SmsOtp"
  }
}
```

## 3.2 \[Optional] Retry OTP Verification for the submitted mobile number

The change from a Sole Proprietor's Brand to the `APPROVED` state automatically triggers an SMS OTP, which is sent to the mobile number registered with the Brand. The OTP is valid for 24 hours. If your customer does not accept the OTP request after 24 hours, you can use this API to trigger a fresh OTP for verification.

This endpoint has a rate limit of 10 requests per second per account.

3.2 \[Optional] Retry OTP Verification for the submitted mobile number

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createBrandRegistrationOtp() {
  const brandRegistrationOtp = await client.messaging.v1
    .brandRegistrations("BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .brandRegistrationOtps.create();

  console.log(brandRegistrationOtp.accountSid);
}

createBrandRegistrationOtp();
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

brand_registration_otp = client.messaging.v1.brand_registrations(
    "BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).brand_registration_otps.create()

print(brand_registration_otp.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Messaging.V1.BrandRegistration;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var brandRegistrationOtp = await BrandRegistrationOtpResource.CreateAsync(
            pathBrandRegistrationSid: "BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(brandRegistrationOtp.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.messaging.v1.brandregistration.BrandRegistrationOtp;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        BrandRegistrationOtp brandRegistrationOtp =
            BrandRegistrationOtp.creator("BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").create();

        System.out.println(brandRegistrationOtp.getAccountSid());
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

	resp, err := client.MessagingV1.CreateBrandRegistrationOtp("BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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

$brand_registration_otp = $twilio->messaging->v1
    ->brandRegistrations("BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->brandRegistrationOtps->create();

print $brand_registration_otp->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

brand_registration_otp = @client
                         .messaging
                         .v1
                         .brand_registrations('BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                         .brand_registration_otps
                         .create

puts brand_registration_otp.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:messaging:v1:a2p:brand-registrations:sms-otp:create \
   --brand-registration-sid BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X POST "https://messaging.twilio.com/v1/a2p/BrandRegistrations/BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SmsOtp" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "AC78e8e67fc0246521490fb9907fd0c165",
  "brand_registration_sid": "BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

You can use the `GET` API request from 3.1 to check the OTP verification status.

## 4. Create a new Messaging Service

**Which API? Messaging API**

> \[!WARNING]
>
> You do not need to complete this step if you have already created a Messaging Service for your customer.
>
> For Sole Proprietor A2P 10DLC registrations, you should only have one 10DLC number in the Messaging Service. Sole Proprietor Campaigns can only have one 10DLC phone number attached to them.

In this step, you create a new [Messaging Service](/docs/messaging/services) for your customer. You can later add 10DLC numbers to this Messaging Service and attach the Service to a registered A2P Campaign.

[See the documentation here about how to create a new Messaging Service via the API.](/docs/messaging/api/service-resource#create-a-service-resource)

## 5. Create a new Sole Proprietor A2P SMS Campaign

**Which API? Messaging API**

In this final step, you will create a new Sole Proprietor A2P SMS Campaign. Here, you describe what type of messages the customer is sending to end-users and how those end-users can opt in and out of these messages.

This Campaign can then be attached to a Messaging Service, and the A2P 10DLC numbers in that Messaging Service will be able to send verified A2P 10DLC traffic.

When you create a Campaign, you will need to indicate how end users opt-in and give consent to receive messages from this Campaign. You will also need to provide details about how end users can opt-out and receive help.

**Top reasons for Campaign rejection, and how to avoid them**:

* Missing or unclear message flow (Call to Action) information: the Message Flow describes the process by which end users **opt-in** to receiving your Campaign's SMS messages. This process must be clearly described and verifiable. If users opt-in through a business website, either provide a direct URL to the opt-in form or, if this is not publicly accessible, provide a URL to a hosted screenshot of the relevant page (as well as pages showing privacy policies and other information specified below). The URL must clearly align with the Brand name provided in the Business Profile in Step 1 above. If Opt-in is done via a paper form, provide a URL to a hosted image of this form. If Opt-in is done verbally, provide a script for the solicitation of this opt-in.
* TCR cannot verify business website: in the Business Profile creation step, you are asked to provide a public URL to the website of the Brand being registered. This URL must be functional, it must match in some way the Business Name provided, and the URL provided in Step 5 below for opt-in (if applicable) and any links included in sample messages. If you are an ISV registering secondary customers, the website provided in this registration must be that of the secondary customer's brand, NOT the ISV as.a business entity.
* Misalignment between Campaign description, Message flow, sample messages and/or Brand name: it must be clear why a particular set of sample messages serves the purposes of a particular Campaign, and why that Campaign serves the purposes of the Brand for which it is registered.

See [A2P 10DLC Campaign Approval Best Practices](https://help.twilio.com/hc/en-us/articles/11847054539547-A2P-10DLC-Campaign-Approval-Best-Practices) to ensure your Campaigns meet all requirements.

Most Twilio customers use [Twilio's default or advanced opt-out features](https://help.twilio.com/hc/en-us/articles/223134027-Twilio-support-for-opt-out-keywords-SMS-STOP-filtering-). If you use default or advanced opt-out, Twilio will automatically complete your Campaign's opt-out and help parameters with Twilio's default values or your customized advanced opt-out and help values.

For more information about all of the parameters within the Create Campaign API, [see the full API documentation.](/docs/messaging/api/usapptoperson-resource)

The API request takes the following parameters:

**Parameter**: **`brand_registration_sid`**

**Description**:

The A2P Brand Registration SID from Step 3

**Parameter**: **`description`**

**Description**:

This should be a fairly detailed description (one or several sentences) of what purpose this campaign serves. The description should provide an explanation of the campaign's objective or purpose: who the sender is, who the recipient is, and why messages are being sent to the intended recipient. Min length: 40 characters. Max length: 4096 characters. Example: "This Campaign will send weekly marketing messages about sales and offers from Acme Sandwich Company to end customers who have opted in"

**Parameter**: **`message_samples`**

**Description**:

An array of sample message strings, min two and max five. Min length for each sample: 20 chars. Max length for each sample: 1024 chars. Give concrete examples of messages you would send in this Campaign. In the message, be sure to identify your Brand by name and/or website. Also, indicate with brackets \[] any content that will be conditionalized. Example: "This is a message from the Acme Sandwich Company. Your order for \[sandwich type, other item] will be delivered by \[time] on \[date]. If you have questions or would like to change your order schedule, call 333-444-1212. If you would like to opt out of future notifications like this, text STOP in reply to this message."

**Parameter**: **`message_flow`**

**Description**:

Required for all Campaigns. Details around how a consumer opts-in to their campaign, therefore giving consent to receive their messages. If multiple opt-in methods can be used for the same campaign, they must all be listed. 40 character minimum. 2048 character maximum. If a website is used for opting in, provide a link to the website. The website needs to have a privacy policy and terms of service. Privacy policies also need to include a statement of non-sharing for mobile numbers, message frequency, and "message and data rates may apply" disclosure. You need to provide a link to the policy. If this opt-in mechanism and other required information is not publicly accessible at the business website URL you have provided, provide a URL with hosted screenshots of the relevant pages. **Understanding the opt-in mechanism is critical to the acceptance of the Campaign by TCR.** Example: "End users opt-in by visiting [www.acmesandwich.com](http://www.acmesandwich.com) and adding their phone number. They then check a box agreeing to receive text messages from Acme Sandwiches. Additionally, end users can also opt-in by texting START to (111) 222-3333 to opt in. Term and Conditions at [www.acmesandwich.com/tc](http://www.acmesandwich.com/tc). Privacy Policy at [www.acmesandwich.com/privacy](http://www.acmesandwich.com/privacy)"

* As part of our compliance review, we conduct automated checks on the URLs provided during campaign and brand registration. Our system captures a public-facing screenshot, and evaluates it against compliance rules, which can be found [here](https://help.twilio.com/hc/en-us/articles/11847054539547-A2P-10DLC-Campaign-Approval-Requirements). This compliance check is a mandatory step in our registration process. If you have any questions or concerns about the process, contact our support team.

**Parameter**: **`us_app_to_person_usecase`**

**Description**:

SOLE\_PROPRIETOR (there is only one valid use case for a Sole Proprietor Brand)

**Parameter**: **`has_embedded_links`**

**Description**:

Boolean. Indicates that this SMS campaign will send messages that contain URL links.

**Parameter**: **`has_embedded_phone`**

**Description**:

Boolean. Indicates that this SMS campaign will send messages that contain phone numbers.

**Parameter**: **`opt_in_message` (optional)**

**Description**:

String. If end users can text in a keyword to start receiving messages from this campaign, the auto-reply messages sent to the end users must be provided. The opt-in response should include the Brand name, confirmation of opt-in enrollment to a recurring message campaign, how to get help, and clear description of how to opt-out. This field is required if end users can text in a keyword to start receiving messages from this campaign. Min length: 20 characters. Max length: 320 characters.

**Parameter**: **`opt_in_keywords` (optional)**

**Description**:

An array of strings. If end users can text in a keyword to start receiving messages from this campaign, those keywords must be provided. This field is required if end users can text in a keyword to start receiving messages from this campaign. Values must be alphanumeric. Max length: 255 characters.

**Parameter**: **`opt_out_message` (optional in certain cases, see description)**

**Description**:

String. The message that an end-user receives when opting out of messages. Upon receiving the opt-out keywords from the end users, Twilio customers are expected to send back an auto-generated response, which must provide acknowledgment of the opt-out request and confirmation that no further messages will be sent. It is also recommended that these opt-out messages include the brand name. This field is required if managing opt out keywords yourself (i.e. not using Twilio's Default or Advanced Opt Out features). Min length: 20 characters. Max length: 320 characters.

**Parameter**: **`opt_out_keywords` (optional in certain cases, see description)**

**Description**:

An array of strings. The keywords that an end user can text to opt out of messaging. End users should be able to text in a keyword to stop receiving messages from this campaign. **This field is required if managing opt out keywords yourself** (i.e. not using Twilio's Default or Advanced Opt Out features). Values must be alphanumeric. Max length: 255 characters.

**Parameter**: **`help_message` (optional in certain cases, see description)**

**Description**:

String. The message that end users receive in response to a help keyword. When customers receive the help keywords from their end users, Twilio customers are expected to send back an auto-generated response; this may include the brand name and additional support contact information. This field is required if managing help keywords yourself (i.e. not using Twilio's Default or Advanced Opt Out features). 20 character minimum. 320 character maximum.

**Parameter**: **`help_keywords` (optional in certain cases, see description)**

**Description**:

An array of strings. The keywords that an end user can text to receive help. End users should be able to text in a keyword to receive help. This field is required if managing help keywords yourself (i.e. not using Twilio's Default or Advanced Opt Out features). Values must be alphanumeric. Max length: 255 characters.

> \[!WARNING]
>
> The `path` used in this Campaign creation call is the `Messaging Service SID,` e.g. in Python,
>
> ```js
> client.messaging.v1.services('MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
> ```
>
> prior to any of the actual input parameters. This is a reminder that **Campaigns are built around a pre-existing Messaging Service**, which is why you either created one or selected a pre-existing one in Step 4 above. Campaigns cannot be created except in association with a Messaging Service.
>
> By the same token, once a Campaign has been created, **deleting** its associated Messaging Service (either via API call or via the Console) will necessarily mean **deleting the Campaign itself**. This would be especially undesirable, in most cases, once a Campaign has been VERIFIED (approved), as the Campaign approval process would need to be re-initiated from scratch.
>
> Note finally that the Campaign itself can be deleted, if necessary, without deleting the Messaging Service; this is addressed in Section 5.2 below.

5. Create a new Sole Proprietor A2P SMS Campaign for default or advanced opt-out users

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
        "End users opt-in by visiting www.example.com and adding their phone number. They then check a box agreeing to receive text messages from Example Brand. Term and Conditions at www.example.com/tc. Privacy Policy at www.example.com/privacy",
      messageSamples: [
        "Book your next OWL FLIGHT for just 1 EUR",
        "Twilio draw the OWL event is ON",
      ],
      usAppToPersonUsecase: "SOLE_PROPRIETOR",
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
    has_embedded_links=True,
    has_embedded_phone=True,
    message_samples=[
        "Book your next OWL FLIGHT for just 1 EUR",
        "Twilio draw the OWL event is ON",
    ],
    us_app_to_person_usecase="SOLE_PROPRIETOR",
    message_flow="End users opt-in by visiting www.example.com and adding their phone number. They then check a box agreeing to receive text messages from Example Brand. Term and Conditions at www.example.com/tc. Privacy Policy at www.example.com/privacy",
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
            hasEmbeddedLinks: true,
            hasEmbeddedPhone: true,
            messageSamples: new List<
                string> { "Book your next OWL FLIGHT for just 1 EUR", "Twilio draw the OWL event is ON" },
            usAppToPersonUsecase: "SOLE_PROPRIETOR",
            messageFlow: "End users opt-in by visiting www.example.com and adding their phone number. They then check a box agreeing to receive text messages from Example Brand. Term and Conditions at www.example.com/tc. Privacy Policy at www.example.com/privacy",
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
                    "End users opt-in by visiting www.example.com and adding their phone number. They then check a box "
                    + "agreeing to receive text messages from Example Brand. Term and Conditions at "
                    + "www.example.com/tc. Privacy Policy at www.example.com/privacy",
                    Arrays.asList("Book your next OWL FLIGHT for just 1 EUR", "Twilio draw the OWL event is ON"),
                    "SOLE_PROPRIETOR",
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
	params.SetHasEmbeddedLinks(true)
	params.SetHasEmbeddedPhone(true)
	params.SetMessageSamples([]string{
		"Book your next OWL FLIGHT for just 1 EUR",
		"Twilio draw the OWL event is ON",
	})
	params.SetUsAppToPersonUsecase("SOLE_PROPRIETOR")
	params.SetMessageFlow("End users opt-in by visiting www.example.com and adding their phone number. They then check a box agreeing to receive text messages from Example Brand. Term and Conditions at www.example.com/tc. Privacy Policy at www.example.com/privacy")
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
        "End users opt-in by visiting www.example.com and adding their phone number. They then check a box agreeing to receive text messages from Example Brand. Term and Conditions at www.example.com/tc. Privacy Policy at www.example.com/privacy", // MessageFlow
        [
            "Book your next OWL FLIGHT for just 1 EUR",
            "Twilio draw the OWL event is ON",
        ], // MessageSamples
        "SOLE_PROPRIETOR", // UsAppToPersonUsecase
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
                     has_embedded_links: true,
                     has_embedded_phone: true,
                     message_samples: [
                       'Book your next OWL FLIGHT for just 1 EUR',
                       'Twilio draw the OWL event is ON'
                     ],
                     us_app_to_person_usecase: 'SOLE_PROPRIETOR',
                     message_flow: 'End users opt-in by visiting www.example.com and adding their phone number. They then check a box agreeing to receive text messages from Example Brand. Term and Conditions at www.example.com/tc. Privacy Policy at www.example.com/privacy',
                     brand_registration_sid: 'BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
                   )

puts us_app_to_person.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:messaging:v1:services:compliance:usa2p:create \
   --messaging-service-sid MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --description "Send marketing messages about sales and offers" \
   --has-embedded-links \
   --has-embedded-phone \
   --message-samples "Book your next OWL FLIGHT for just 1 EUR" "Twilio draw the OWL event is ON" \
   --us-app-to-person-usecase SOLE_PROPRIETOR \
   --message-flow "End users opt-in by visiting www.example.com and adding their phone number. They then check a box agreeing to receive text messages from Example Brand. Term and Conditions at www.example.com/tc. Privacy Policy at www.example.com/privacy" \
   --brand-registration-sid BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X POST "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Compliance/Usa2p" \
--data-urlencode "Description=Send marketing messages about sales and offers" \
--data-urlencode "HasEmbeddedLinks=true" \
--data-urlencode "HasEmbeddedPhone=true" \
--data-urlencode "MessageSamples=Book your next OWL FLIGHT for just 1 EUR" \
--data-urlencode "MessageSamples=Twilio draw the OWL event is ON" \
--data-urlencode "UsAppToPersonUsecase=SOLE_PROPRIETOR" \
--data-urlencode "MessageFlow=End users opt-in by visiting www.example.com and adding their phone number. They then check a box agreeing to receive text messages from Example Brand. Term and Conditions at www.example.com/tc. Privacy Policy at www.example.com/privacy" \
--data-urlencode "BrandRegistrationSid=BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

Customers managing their own opt-out will need to provide additional opt-out and help information when registering a Campaign.

5. Create a new Sole Proprietor A2P SMS Campaign for customers managing their own opt-out

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
      helpKeywords: ["HELP", "SUPPORT"],
      helpMessage:
        "Acme Corporation: Visit www.example.com to get support. To opt-out, reply STOP.",
      messageFlow:
        "End users opt-in by visiting www.example.com and adding their phone number. They then check a box agreeing to receive text messages from Example Brand. Term and Conditions at www.example.com/tc. Privacy Policy at www.example.com/privacy",
      messageSamples: [
        "Book your next OWL FLIGHT for just 1 EUR",
        "Twilio draw the OWL event is ON",
      ],
      optOutKeywords: ["STOP", "END"],
      optOutMessage:
        "You have successfully been unsubscribed from Acme Corporation. You will not receive any more messages from this number.",
      usAppToPersonUsecase: "SOLE_PROPRIETOR",
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
    has_embedded_links=True,
    has_embedded_phone=True,
    message_samples=[
        "Book your next OWL FLIGHT for just 1 EUR",
        "Twilio draw the OWL event is ON",
    ],
    us_app_to_person_usecase="SOLE_PROPRIETOR",
    message_flow="End users opt-in by visiting www.example.com and adding their phone number. They then check a box agreeing to receive text messages from Example Brand. Term and Conditions at www.example.com/tc. Privacy Policy at www.example.com/privacy",
    opt_out_keywords=["STOP", "END"],
    opt_out_message="You have successfully been unsubscribed from Acme Corporation. You will not receive any more messages from this number.",
    help_keywords=["HELP", "SUPPORT"],
    help_message="Acme Corporation: Visit www.example.com to get support. To opt-out, reply STOP.",
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
            hasEmbeddedLinks: true,
            hasEmbeddedPhone: true,
            messageSamples: new List<
                string> { "Book your next OWL FLIGHT for just 1 EUR", "Twilio draw the OWL event is ON" },
            usAppToPersonUsecase: "SOLE_PROPRIETOR",
            messageFlow: "End users opt-in by visiting www.example.com and adding their phone number. They then check a box agreeing to receive text messages from Example Brand. Term and Conditions at www.example.com/tc. Privacy Policy at www.example.com/privacy",
            optOutKeywords: new List<string> { "STOP", "END" },
            optOutMessage: "You have successfully been unsubscribed from Acme Corporation. You will not receive any more messages from this number.",
            helpKeywords: new List<string> { "HELP", "SUPPORT" },
            helpMessage: "Acme Corporation: Visit www.example.com to get support. To opt-out, reply STOP.",
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
                    "End users opt-in by visiting www.example.com and adding their phone number. They then check a box "
                    + "agreeing to receive text messages from Example Brand. Term and Conditions at "
                    + "www.example.com/tc. Privacy Policy at www.example.com/privacy",
                    Arrays.asList("Book your next OWL FLIGHT for just 1 EUR", "Twilio draw the OWL event is ON"),
                    "SOLE_PROPRIETOR",
                    true,
                    true)
                .setOptOutKeywords(Arrays.asList("STOP", "END"))
                .setOptOutMessage("You have successfully been unsubscribed from Acme Corporation. You will not receive "
                                  + "any more messages from this number.")
                .setHelpKeywords(Arrays.asList("HELP", "SUPPORT"))
                .setHelpMessage("Acme Corporation: Visit www.example.com to get support. To opt-out, reply STOP.")
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
	params.SetHasEmbeddedLinks(true)
	params.SetHasEmbeddedPhone(true)
	params.SetMessageSamples([]string{
		"Book your next OWL FLIGHT for just 1 EUR",
		"Twilio draw the OWL event is ON",
	})
	params.SetUsAppToPersonUsecase("SOLE_PROPRIETOR")
	params.SetMessageFlow("End users opt-in by visiting www.example.com and adding their phone number. They then check a box agreeing to receive text messages from Example Brand. Term and Conditions at www.example.com/tc. Privacy Policy at www.example.com/privacy")
	params.SetOptOutKeywords([]string{
		"STOP",
		"END",
	})
	params.SetOptOutMessage("You have successfully been unsubscribed from Acme Corporation. You will not receive any more messages from this number.")
	params.SetHelpKeywords([]string{
		"HELP",
		"SUPPORT",
	})
	params.SetHelpMessage("Acme Corporation: Visit www.example.com to get support. To opt-out, reply STOP.")
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
        "End users opt-in by visiting www.example.com and adding their phone number. They then check a box agreeing to receive text messages from Example Brand. Term and Conditions at www.example.com/tc. Privacy Policy at www.example.com/privacy", // MessageFlow
        [
            "Book your next OWL FLIGHT for just 1 EUR",
            "Twilio draw the OWL event is ON",
        ], // MessageSamples
        "SOLE_PROPRIETOR", // UsAppToPersonUsecase
        true, // HasEmbeddedLinks
        true, // HasEmbeddedPhone
        [
            "optOutKeywords" => ["STOP", "END"],
            "optOutMessage" =>
                "You have successfully been unsubscribed from Acme Corporation. You will not receive any more messages from this number.",
            "helpKeywords" => ["HELP", "SUPPORT"],
            "helpMessage" =>
                "Acme Corporation: Visit www.example.com to get support. To opt-out, reply STOP.",
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
                     has_embedded_links: true,
                     has_embedded_phone: true,
                     message_samples: [
                       'Book your next OWL FLIGHT for just 1 EUR',
                       'Twilio draw the OWL event is ON'
                     ],
                     us_app_to_person_usecase: 'SOLE_PROPRIETOR',
                     message_flow: 'End users opt-in by visiting www.example.com and adding their phone number. They then check a box agreeing to receive text messages from Example Brand. Term and Conditions at www.example.com/tc. Privacy Policy at www.example.com/privacy',
                     opt_out_keywords: [
                       'STOP',
                       'END'
                     ],
                     opt_out_message: 'You have successfully been unsubscribed from Acme Corporation. You will not receive any more messages from this number.',
                     help_keywords: [
                       'HELP',
                       'SUPPORT'
                     ],
                     help_message: 'Acme Corporation: Visit www.example.com to get support. To opt-out, reply STOP.',
                     brand_registration_sid: 'BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
                   )

puts us_app_to_person.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:messaging:v1:services:compliance:usa2p:create \
   --messaging-service-sid MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --description "Send marketing messages about sales and offers" \
   --has-embedded-links \
   --has-embedded-phone \
   --message-samples "Book your next OWL FLIGHT for just 1 EUR" "Twilio draw the OWL event is ON" \
   --us-app-to-person-usecase SOLE_PROPRIETOR \
   --message-flow "End users opt-in by visiting www.example.com and adding their phone number. They then check a box agreeing to receive text messages from Example Brand. Term and Conditions at www.example.com/tc. Privacy Policy at www.example.com/privacy" \
   --opt-out-keywords STOP END \
   --opt-out-message "You have successfully been unsubscribed from Acme Corporation. You will not receive any more messages from this number." \
   --help-keywords HELP SUPPORT \
   --help-message "Acme Corporation: Visit www.example.com to get support. To opt-out, reply STOP." \
   --brand-registration-sid BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X POST "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Compliance/Usa2p" \
--data-urlencode "Description=Send marketing messages about sales and offers" \
--data-urlencode "HasEmbeddedLinks=true" \
--data-urlencode "HasEmbeddedPhone=true" \
--data-urlencode "MessageSamples=Book your next OWL FLIGHT for just 1 EUR" \
--data-urlencode "MessageSamples=Twilio draw the OWL event is ON" \
--data-urlencode "UsAppToPersonUsecase=SOLE_PROPRIETOR" \
--data-urlencode "MessageFlow=End users opt-in by visiting www.example.com and adding their phone number. They then check a box agreeing to receive text messages from Example Brand. Term and Conditions at www.example.com/tc. Privacy Policy at www.example.com/privacy" \
--data-urlencode "OptOutKeywords=STOP" \
--data-urlencode "OptOutKeywords=END" \
--data-urlencode "OptOutMessage=You have successfully been unsubscribed from Acme Corporation. You will not receive any more messages from this number." \
--data-urlencode "HelpKeywords=HELP" \
--data-urlencode "HelpKeywords=SUPPORT" \
--data-urlencode "HelpMessage=Acme Corporation: Visit www.example.com to get support. To opt-out, reply STOP." \
--data-urlencode "BrandRegistrationSid=BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

### 5.1 GET the Status of an A2P Messaging Campaign

> \[!NOTE]
>
> You can set up and subscribe to Campaign status **Event Streams**, so that an event message will be sent to a specified webhook URL when the new Campaign has been approved or has been rejected. [See this guide](/docs/messaging/compliance/a2p-10dlc/event-streams-setup) for setting up the necessary Event Streams **sinks** and **event subscriptions**, and for information on reading each event message payload. In the event of a Campaign rejection, you will then need to perform the `fetch` call described below in order to learn details about the failure reason(s).

You can `GET` your messaging Campaign associated with a Messaging Service and monitor its approval status with the following API request.

In this call's json response, the attribute `campaign_id` is a seven-character string that will have been added to the new Campaign record by the Campaign Registry (TCR). But in this response you would be looking in particular at the `campaign_status` attribute. The possible statuses for campaigns will vary depending on what stage the Campaign is at in the review process. A newly-created Campaign that has yet to be considered by TCR will be PENDING, assuming that the Twilio API itself has accepted it (i.e., all the data is basically conforming); otherwise it will be FAILED. Once TCR has begun its own review process on a successfully-submitted Campaign, the Campaign will be IN\_PROGRESS until that review has finished. At that point the `campaign_status` will be either VERIFIED (approved) or FAILED (rejected). In certain rare cases the status will instead be SUSPENDED.

If `campaign_status` is FAILED, the response will contain an "errors" attribute with the information on why the registration failed. This populated errors\[] attribute is particularly helpful if the campaign registration failed during Twilio's internal review or External campaign review by our partners.

For details on troubleshooting FAILED A2P Campaigns, see this section of the [Troubleshooting Guide](/docs/messaging/compliance/a2p-10dlc/troubleshooting-a2p-brands#troubleshoot-and-fix-a2p-campaign-submission-failures).

If your Campaign registration has been rejected (FAILED), see this [Guide to Troubleshooting A2P Brands and Campaigns](/docs/messaging/compliance/a2p-10dlc/troubleshooting-a2p-brands) to understand error details and rectification.

5.1 GET A2P Messaging Campaign Status

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
    .services("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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
    client.messaging.v1.services("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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
            pathMessagingServiceSid: "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
            UsAppToPerson.fetcher("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "QE2c6890da8086d771620e9b13fadeba0b").fetch();

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

	resp, err := client.MessagingV1.FetchUsAppToPerson("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
    ->services("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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
                   .services('MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                   .us_app_to_person('QE2c6890da8086d771620e9b13fadeba0b')
                   .fetch

puts us_app_to_person.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:messaging:v1:services:compliance:usa2p:fetch \
   --messaging-service-sid MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid QE2c6890da8086d771620e9b13fadeba0b
```

```bash
curl -X GET "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Compliance/Usa2p/QE2c6890da8086d771620e9b13fadeba0b" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

### 5.2 \[Optional] DELETE A2P Messaging Campaign

If you need to unregister or "delete" a Campaign, you can make the following request to the Messaging Service. Again, here you will specify the **compliance type** `QE2c6890da8086d771620e9b13fadeba0b` in your request.

After your API request is accepted, allow a few seconds for deletion to be finalized. If you are programmatically deleting a Campaign and then creating a new Campaign on the same Messaging Service, you should implement at least a 5-second delay between removing the existing Campaign and creating a new one on the same Messaging Service.

5.2 \[Optional] DELETE A2P Messaging campaign use case

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
    .services("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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
    "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
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
            pathMessagingServiceSid: "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
        UsAppToPerson.deleter("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "QE2c6890da8086d771620e9b13fadeba0b").delete();
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

	err := client.MessagingV1.DeleteUsAppToPerson("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
    ->services("MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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
  .services('MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  .us_app_to_person('QE2c6890da8086d771620e9b13fadeba0b')
  .delete
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:messaging:v1:services:compliance:usa2p:remove \
   --messaging-service-sid MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --sid QE2c6890da8086d771620e9b13fadeba0b
```

```bash
curl -X DELETE "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Compliance/Usa2p/QE2c6890da8086d771620e9b13fadeba0b" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

## 6. Ensure that a Twilio 10DLC phone number is associated with your new Campaign

Once your Sole-Proprietor Business Profile, Brand, and Campaign have been registered and verified, the final step before you can begin using the new Messaging Campaign is to ensure that the **Twilio 10DLC phone number you use to send messages to the US** is associated with the new Campaign's Messaging Service as the Sender. Here you'll need to keep several things in mind:

1. For Sole Proprietor Campaigns, only a **single** 10DLC phone number can be used in the Messaging Service associated with your new Campaign. If you associate more than one phone number with this Messaging Service (or reuse a Messaging Service with more than one number attached), Twilio will randomly pick from among these to register one for A2P use.
2. See [this part of the PhoneNumberResource guide](/docs/messaging/api/phonenumber-resource#create-a-phonenumber-resource-add-a-phone-number-to-a-messaging-service) for the API call to associate a given phone number (by `phone_number_sid`) with the new Messaging Service (by `messaging_service_sid`) you've created for the new Sole Proprietor A2P Campaign.
3. You can subsequently use a `GET` call on that same `phone_numbers` endpoint as in (2) above to confirm that the phone number is associated with this Messaging Service (see [this part](/docs/messaging/api/phonenumber-resource#fetch-a-phonenumber-resource) of the same PhoneNumberResource guide).

If you do not currently have a Twilio 10DLC phone number you'd like to use with the new Messaging Service, you can select and buy one either via the Twilio Console or via API - see [this guide](https://help.twilio.com/hc/en-us/articles/223182728-Using-the-REST-API-to-Search-for-and-Buy-Twilio-Phone-Numbers) for details on both.

Congratulations, you now have a registered A2P Sole Proprietor Campaign!
