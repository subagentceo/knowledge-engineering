# API: Create a Secondary Customer Profile

> \[!NOTE]
>
> **Customer profiles** have been rebranded to **Compliance profiles**. The Trust Hub API has not changed. All API endpoints, parameter names, and resource identifiers (such as `CustomerProfileSid`) remain the same.

To create a secondary customer profile using the API, gather details about that business, create the regulatory bundle components, and assign them to an empty regulatory bundle.

## Prerequisites

### Twilio Primary Customer Profile

A Primary Customer Profile in the `twilio-approved` state created in the same account.

### Business registration data

Gather the following data for your business.

| Property                        | Necessity  | Accepted values                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Business Identity               | Required   | `direct_customer`, `isv_reseller_or_partner`, `unknown`                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Business Type                   | Required   | `Sole Proprietorship`, `Partnership`, `Limited Liability Corporation`,<br />`Co-operative`, `Non-profit Corporation`, `Corporation`                                                                                                                                                                                                                                                                                                                                                               |
| Business Industry               | Required   | `AGRICULTURE`, `AUTOMOTIVE`, `BANKING`, `CONSUMER`,<br />`EDUCATION`, `ELECTRONICS`, `ENERGY`, `ENGINEERING`,<br />`FAST_MOVING_CONSUMER_GOODS`, `FINANCIAL`, `FINTECH`,<br />`FOOD_AND_BEVERAGE`, `GOVERNMENT`, `HEALTHCARE`,<br />`HOSPITALITY`, `INSURANCE`, `JEWELRY`, `LEGAL`,<br />`MANUFACTURING`, `MEDIA`, `NOT_FOR_PROFIT`,<br />`OIL_AND_GAS`, `ONLINE`, `RAW_MATERIALS`, `REAL_ESTATE`,<br />`RELIGION`, `RETAIL`, `TECHNOLOGY`, `TELECOMMUNICATIONS`,<br />`TRANSPORTATION`, `TRAVEL` |
| Business Registration ID Type   | Required   | `EIN` (US), `CBN` (CA), `CN` (UK), `ACN` (AU), `CIN` (IN), `VAT` (EU),<br />`VATRN` (RO), `RN` (IS), `Other`                                                                                                                                                                                                                                                                                                                                                                                      |
| Name of Other Registration Type | If `Other` |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Business Registration Number    | Required   | Varies by country                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| Business Regions of Operations  | Required   | `AFRICA`, `ASIA`, `EUROPE`, `LATIN_AMERICA`, `USA_AND_CANADA`, `AUSTRALIA`                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Website URL                     | Required   | HTTP URL as set in [RFC 1738 3.3][http-url]                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Social Media Profile URL        | Optional   | HTTP URL as set in [RFC 1738 3.3][http-url]                                                                                                                                                                                                                                                                                                                                                                                                                                                       |

### Representative data

For each representative of the entity set in the `CustomerProfile`, collect the following data.

| Attribute      | Accepted values                                                       | Example                      |
| -------------- | --------------------------------------------------------------------- | ---------------------------- |
| Last Name      | Any string                                                            | `Smith`                      |
| First Name     | Any string                                                            | `Alex`                       |
| Email          | [Email address][email-format]                                         | `alex.smith@example.com`     |
| Business Title | Any string                                                            | `Head of Product Management` |
| Job Position   | `Director`, `GM`, `VP`, `CEO`,<br />`CFO`, `General Counsel`, `Other` | `VP`                         |
| Phone Number   | Sequence of integers                                                  | `8005550100`                 |
| Country Code   | Telephone country code                                                | `+1`                         |

## Create a compliant Secondary Customer Profile

### Fetch your Policy SID

1. Fetch the Policy SID for your Primary Customer Profile.

   Fetch one CustomerProfile resource
   ```js
   // Download the helper library from https://www.twilio.com/docs/node/install
   const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

   // Find your Account SID and Auth Token at twilio.com/console
   // and set the environment variables. See http://twil.io/secure
   const accountSid = process.env.TWILIO_ACCOUNT_SID;
   const authToken = process.env.TWILIO_AUTH_TOKEN;
   const client = twilio(accountSid, authToken);

   async function fetchCustomerProfile() {
     const customerProfile = await client.trusthub.v1
       .customerProfiles("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
       .fetch();

     console.log(customerProfile.sid);
   }

   fetchCustomerProfile();
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
   ).fetch()

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

           var customerProfiles = await CustomerProfilesResource.FetchAsync(
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
           CustomerProfiles customerProfiles = CustomerProfiles.fetcher("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").fetch();

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
   	"os"
   )

   func main() {
   	// Find your Account SID and Auth Token at twilio.com/console
   	// and set the environment variables. See http://twil.io/secure
   	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
   	client := twilio.NewRestClient()

   	resp, err := client.TrusthubV1.FetchCustomerProfile("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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
       ->fetch();

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
                      .fetch

   puts customer_profile.sid
   ```
   ```bash
   # Install the twilio-cli from https://twil.io/cli

   twilio api:trusthub:v1:customer-profiles:fetch \
      --sid BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
   ```
   ```bash
   curl -X GET "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
   -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
   ```
   ```json
   // !focus(4)
   {
     "sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "policy_sid": "RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "friendly_name": "friendly_name",
     "status": "draft",
     ...
   }
   ```
2. Copy the `policy_sid` from the response. To create a regulatory bundle, you need this Policy SID.

### Create an empty regulatory bundle

A regulatory bundle needs data about the company or individual requesting regulatory approval for a specific phone number.

Create an empty regulatory bundle. To create this bundle, provide the following parameters:

* `Email`
* `FriendlyName`
* `PolicySid`
* `StatusCallback`

To find acceptable values for these parameters, see [Request body parameters][policy-request] for the `Profiles` resource.

Create an empty Secondary Customer Profile Bundle

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
    email: "email",
    friendlyName: "friendly_name",
    policySid: "RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    statusCallback: "http://www.example.com",
  });

  console.log(customerProfile.accountSid);
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
    email="email",
    friendly_name="friendly_name",
    policy_sid="RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    status_callback="http://www.example.com",
)

print(customer_profile.account_sid)
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
            email: "email",
            friendlyName: "friendly_name",
            policySid: "RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            statusCallback: new Uri("http://www.example.com"));

        Console.WriteLine(customerProfiles.AccountSid);
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
            CustomerProfiles.creator("friendly_name", "email", "RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                .setStatusCallback(URI.create("http://www.example.com"))
                .create();

        System.out.println(customerProfiles.getAccountSid());
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
	params.SetEmail("email")
	params.SetFriendlyName("friendly_name")
	params.SetPolicySid("RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
	params.SetStatusCallback("http://www.example.com")

	resp, err := client.TrusthubV1.CreateCustomerProfile(params)
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

$customer_profile = $twilio->trusthub->v1->customerProfiles->create(
    "friendly_name", // FriendlyName
    "email", // Email
    "RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", // PolicySid
    ["statusCallback" => "http://www.example.com"]
);

print $customer_profile->accountSid;
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
                     email: 'email',
                     friendly_name: 'friendly_name',
                     policy_sid: 'RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                     status_callback: 'http://www.example.com'
                   )

puts customer_profile.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trusthub:v1:customer-profiles:create \
   --email email \
   --friendly-name friendly_name \
   --policy-sid RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --status-callback http://www.example.com
```

```bash
curl -X POST "https://trusthub.twilio.com/v1/CustomerProfiles" \
--data-urlencode "Email=email" \
--data-urlencode "FriendlyName=friendly_name" \
--data-urlencode "PolicySid=RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
--data-urlencode "StatusCallback=http://www.example.com" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "policy_sid": "RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "friendly_name": "friendly_name",
  "status": "draft",
  "email": "email",
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

### Create components for regulatory bundle

Each regulatory bundle needs four components:

1. Identity of the business
2. Identity of representatives of the business
3. Physical location of the business
4. Documentation that verifies the business identity and address

To add these components into Trust Hub, call three API resources: [`EndUser`][end-user] three times, [`Accounts`][accts], and [`SupportingDocuments`][sup-docs].

1. Provide your business identity data.

   > \[!CAUTION]
   >
   > Updates are coming to Twilio's Starter Brand registration based on changes from [The Campaign Registry (TCR)](https://www.campaignregistry.com/) and mobile carriers. We will provide updates on how this change may impact US A2P 10DLC registration as soon as they are available. Brands with EINs will no longer be able to use Twilio's Starter Brand registration going forward.
   >
   > In the meantime, if you are registering on behalf of an organization with an EIN/Tax ID, [please complete a Standard registration](/docs/messaging/compliance/a2p-10dlc/direct-standard-onboarding).

   Create EndUser of type: customer\_profile\_business\_information

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
         business_name: "acme business",
         social_media_profile_urls: "",
         website_url: "example.com",
         business_regions_of_operation: "USA_AND_CANADA",
         business_type: "Partnership",
         business_registration_identifier: "DUNS",
         business_identity: "direct_customer",
         business_industry: "EDUCATION",
         business_registration_number: "123456789",
       },
       friendlyName: "friendly name",
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
       type="customer_profile_business_information",
       friendly_name="friendly name",
       attributes={
           "business_name": "acme business",
           "social_media_profile_urls": "",
           "website_url": "example.com",
           "business_regions_of_operation": "USA_AND_CANADA",
           "business_type": "Partnership",
           "business_registration_identifier": "DUNS",
           "business_identity": "direct_customer",
           "business_industry": "EDUCATION",
           "business_registration_number": "123456789",
       },
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
               type: "customer_profile_business_information",
               friendlyName: "friendly name",
               attributes: new Dictionary<string, Object>() {
                   { "business_name", "acme business" },
                   { "social_media_profile_urls", "" },
                   { "website_url", "example.com" },
                   { "business_regions_of_operation", "USA_AND_CANADA" },
                   { "business_type", "Partnership" },
                   { "business_registration_identifier", "DUNS" },
                   { "business_identity", "direct_customer" },
                   { "business_industry", "EDUCATION" },
                   { "business_registration_number", "123456789" }
               });

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
           EndUser endUser = EndUser.creator("friendly name", "customer_profile_business_information")
                                 .setAttributes(new HashMap<String, Object>() {
                                     {
                                         put("business_name", "acme business");
                                         put("social_media_profile_urls", "");
                                         put("website_url", "example.com");
                                         put("business_regions_of_operation", "USA_AND_CANADA");
                                         put("business_type", "Partnership");
                                         put("business_registration_identifier", "DUNS");
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
   	params.SetType("customer_profile_business_information")
   	params.SetFriendlyName("friendly name")
   	params.SetAttributes(map[string]interface{}{
   		"business_name":                    "acme business",
   		"social_media_profile_urls":        "",
   		"website_url":                      "example.com",
   		"business_regions_of_operation":    "USA_AND_CANADA",
   		"business_type":                    "Partnership",
   		"business_registration_identifier": "DUNS",
   		"business_identity":                "direct_customer",
   		"business_industry":                "EDUCATION",
   		"business_registration_number":     "123456789",
   	})

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
       "friendly name", // FriendlyName
       "customer_profile_business_information", // Type
       [
           "attributes" => [
               "business_name" => "acme business",
               "social_media_profile_urls" => "",
               "website_url" => "example.com",
               "business_regions_of_operation" => "USA_AND_CANADA",
               "business_type" => "Partnership",
               "business_registration_identifier" => "DUNS",
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
                type: 'customer_profile_business_information',
                friendly_name: 'friendly name',
                attributes: {
                  'business_name' => 'acme business',
                  'social_media_profile_urls' => '',
                  'website_url' => 'example.com',
                  'business_regions_of_operation' => 'USA_AND_CANADA',
                  'business_type' => 'Partnership',
                  'business_registration_identifier' => 'DUNS',
                  'business_identity' => 'direct_customer',
                  'business_industry' => 'EDUCATION',
                  'business_registration_number' => '123456789'
                }
              )

   puts end_user.sid
   ```

   ```bash
   # Install the twilio-cli from https://twil.io/cli

   twilio api:trusthub:v1:end-users:create \
      --type customer_profile_business_information \
      --friendly-name "friendly name" \
      --attributes "{\"business_name\":\"acme business\",\"social_media_profile_urls\":\"\",\"website_url\":\"example.com\",\"business_regions_of_operation\":\"USA_AND_CANADA\",\"business_type\":\"Partnership\",\"business_registration_identifier\":\"DUNS\",\"business_identity\":\"direct_customer\",\"business_industry\":\"EDUCATION\",\"business_registration_number\":\"123456789\"}"
   ```

   ```bash
   ATTRIBUTES_OBJ=$(cat << EOF
   {
     "business_name": "acme business",
     "social_media_profile_urls": "",
     "website_url": "example.com",
     "business_regions_of_operation": "USA_AND_CANADA",
     "business_type": "Partnership",
     "business_registration_identifier": "DUNS",
     "business_identity": "direct_customer",
     "business_industry": "EDUCATION",
     "business_registration_number": "123456789"
   }
   EOF
   )
   curl -X POST "https://trusthub.twilio.com/v1/EndUsers" \
   --data-urlencode "Type=customer_profile_business_information" \
   --data-urlencode "FriendlyName=friendly name" \
   --data-urlencode "Attributes=$ATTRIBUTES_OBJ" \
   -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
   ```

   ```json
   {
     "date_updated": "2021-02-16T20:40:57Z",
     "sid": "ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "friendly_name": "friendly name",
     "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "url": "https://trusthub.twilio.com/v1/EndUsers/ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "date_created": "2021-02-16T20:40:57Z",
     "attributes": {
       "business_name": "acme business",
       "social_media_profile_urls": "",
       "website_url": "example.com",
       "business_regions_of_operation": "USA_AND_CANADA",
       "business_type": "Partnership",
       "business_registration_identifier": "DUNS",
       "business_identity": "direct_customer",
       "business_industry": "EDUCATION",
       "business_registration_number": "123456789"
     },
     "type": "customer_profile_business_information"
   }
   ```
2. Provide data about your first authorized representative.

   Create EndUser of type: authorized\_representative\_1

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
         last_name: "acme",
         phone_number: "+11234567890",
         first_name: "rep1",
         email: "rep1@acme.com",
         business_title: "ceo",
       },
       friendlyName: "auth_rep_1",
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
       type="authorized_representative_1",
       friendly_name="auth_rep_1",
       attributes={
           "job_position": "CEO",
           "last_name": "acme",
           "phone_number": "+11234567890",
           "first_name": "rep1",
           "email": "rep1@acme.com",
           "business_title": "ceo",
       },
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
               type: "authorized_representative_1",
               friendlyName: "auth_rep_1",
               attributes: new Dictionary<string, Object>() {
                   { "job_position", "CEO" },
                   { "last_name", "acme" },
                   { "phone_number", "+11234567890" },
                   { "first_name", "rep1" },
                   { "email", "rep1@acme.com" },
                   { "business_title", "ceo" }
               });

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
           EndUser endUser = EndUser.creator("auth_rep_1", "authorized_representative_1")
                                 .setAttributes(new HashMap<String, Object>() {
                                     {
                                         put("job_position", "CEO");
                                         put("last_name", "acme");
                                         put("phone_number", "+11234567890");
                                         put("first_name", "rep1");
                                         put("email", "rep1@acme.com");
                                         put("business_title", "ceo");
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
   	params.SetType("authorized_representative_1")
   	params.SetFriendlyName("auth_rep_1")
   	params.SetAttributes(map[string]interface{}{
   		"job_position":   "CEO",
   		"last_name":      "acme",
   		"phone_number":   "+11234567890",
   		"first_name":     "rep1",
   		"email":          "rep1@acme.com",
   		"business_title": "ceo",
   	})

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
       "auth_rep_1", // FriendlyName
       "authorized_representative_1", // Type
       [
           "attributes" => [
               "job_position" => "CEO",
               "last_name" => "acme",
               "phone_number" => "+11234567890",
               "first_name" => "rep1",
               "email" => "rep1@acme.com",
               "business_title" => "ceo",
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
                type: 'authorized_representative_1',
                friendly_name: 'auth_rep_1',
                attributes: {
                  'job_position' => 'CEO',
                  'last_name' => 'acme',
                  'phone_number' => '+11234567890',
                  'first_name' => 'rep1',
                  'email' => 'rep1@acme.com',
                  'business_title' => 'ceo'
                }
              )

   puts end_user.sid
   ```

   ```bash
   # Install the twilio-cli from https://twil.io/cli

   twilio api:trusthub:v1:end-users:create \
      --type authorized_representative_1 \
      --friendly-name auth_rep_1 \
      --attributes "{\"job_position\":\"CEO\",\"last_name\":\"acme\",\"phone_number\":\"+11234567890\",\"first_name\":\"rep1\",\"email\":\"rep1@acme.com\",\"business_title\":\"ceo\"}"
   ```

   ```bash
   ATTRIBUTES_OBJ=$(cat << EOF
   {
     "job_position": "CEO",
     "last_name": "acme",
     "phone_number": "+11234567890",
     "first_name": "rep1",
     "email": "rep1@acme.com",
     "business_title": "ceo"
   }
   EOF
   )
   curl -X POST "https://trusthub.twilio.com/v1/EndUsers" \
   --data-urlencode "Type=authorized_representative_1" \
   --data-urlencode "FriendlyName=auth_rep_1" \
   --data-urlencode "Attributes=$ATTRIBUTES_OBJ" \
   -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
   ```

   ```json
   {
     "date_updated": "2021-02-16T20:40:57Z",
     "sid": "ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "friendly_name": "auth_rep_1",
     "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "url": "https://trusthub.twilio.com/v1/EndUsers/ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "date_created": "2021-02-16T20:40:57Z",
     "attributes": {
       "job_position": "CEO",
       "last_name": "acme",
       "phone_number": "+11234567890",
       "first_name": "rep1",
       "email": "rep1@acme.com",
       "business_title": "ceo"
     },
     "type": "authorized_representative_1"
   }
   ```
3. Provide data about your second authorized representative.

   Create EndUser of type: authorized\_representative\_2

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
         job_position: "CFO",
         last_name: "acme",
         phone_number: "+14345678900",
         first_name: "rep2",
         email: "rep2@acme.com",
         business_title: "cfo",
       },
       friendlyName: "auth_rep_2",
       type: "authorized_representative_2",
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
       type="authorized_representative_2",
       friendly_name="auth_rep_2",
       attributes={
           "job_position": "CFO",
           "last_name": "acme",
           "phone_number": "+14345678900",
           "first_name": "rep2",
           "email": "rep2@acme.com",
           "business_title": "cfo",
       },
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
               type: "authorized_representative_2",
               friendlyName: "auth_rep_2",
               attributes: new Dictionary<string, Object>() {
                   { "job_position", "CFO" },
                   { "last_name", "acme" },
                   { "phone_number", "+14345678900" },
                   { "first_name", "rep2" },
                   { "email", "rep2@acme.com" },
                   { "business_title", "cfo" }
               });

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
           EndUser endUser = EndUser.creator("auth_rep_2", "authorized_representative_2")
                                 .setAttributes(new HashMap<String, Object>() {
                                     {
                                         put("job_position", "CFO");
                                         put("last_name", "acme");
                                         put("phone_number", "+14345678900");
                                         put("first_name", "rep2");
                                         put("email", "rep2@acme.com");
                                         put("business_title", "cfo");
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
   	params.SetType("authorized_representative_2")
   	params.SetFriendlyName("auth_rep_2")
   	params.SetAttributes(map[string]interface{}{
   		"job_position":   "CFO",
   		"last_name":      "acme",
   		"phone_number":   "+14345678900",
   		"first_name":     "rep2",
   		"email":          "rep2@acme.com",
   		"business_title": "cfo",
   	})

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
       "auth_rep_2", // FriendlyName
       "authorized_representative_2", // Type
       [
           "attributes" => [
               "job_position" => "CFO",
               "last_name" => "acme",
               "phone_number" => "+14345678900",
               "first_name" => "rep2",
               "email" => "rep2@acme.com",
               "business_title" => "cfo",
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
                type: 'authorized_representative_2',
                friendly_name: 'auth_rep_2',
                attributes: {
                  'job_position' => 'CFO',
                  'last_name' => 'acme',
                  'phone_number' => '+14345678900',
                  'first_name' => 'rep2',
                  'email' => 'rep2@acme.com',
                  'business_title' => 'cfo'
                }
              )

   puts end_user.sid
   ```

   ```bash
   # Install the twilio-cli from https://twil.io/cli

   twilio api:trusthub:v1:end-users:create \
      --type authorized_representative_2 \
      --friendly-name auth_rep_2 \
      --attributes "{\"job_position\":\"CFO\",\"last_name\":\"acme\",\"phone_number\":\"+14345678900\",\"first_name\":\"rep2\",\"email\":\"rep2@acme.com\",\"business_title\":\"cfo\"}"
   ```

   ```bash
   ATTRIBUTES_OBJ=$(cat << EOF
   {
     "job_position": "CFO",
     "last_name": "acme",
     "phone_number": "+14345678900",
     "first_name": "rep2",
     "email": "rep2@acme.com",
     "business_title": "cfo"
   }
   EOF
   )
   curl -X POST "https://trusthub.twilio.com/v1/EndUsers" \
   --data-urlencode "Type=authorized_representative_2" \
   --data-urlencode "FriendlyName=auth_rep_2" \
   --data-urlencode "Attributes=$ATTRIBUTES_OBJ" \
   -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
   ```

   ```json
   {
     "date_updated": "2021-02-16T20:40:57Z",
     "sid": "ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "friendly_name": "auth_rep_2",
     "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "url": "https://trusthub.twilio.com/v1/EndUsers/ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "date_created": "2021-02-16T20:40:57Z",
     "attributes": {
       "job_position": "CFO",
       "last_name": "acme",
       "phone_number": "+14345678900",
       "first_name": "rep2",
       "email": "rep2@acme.com",
       "business_title": "cfo"
     },
     "type": "authorized_representative_2"
   }
   ```
4. Provide the physical location for your business.

   If you already have an address SID, skip this step.

   > \[!WARNING]
   >
   > Twilio can't accept PO Boxes as your address.

   Create an address

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
       city: "Any City",
       customerName: "name",
       isoCountry: "US",
       postalCode: "12345",
       region: "Any Region",
       street: "555 AnyStreet",
       streetSecondary: "Apt B",
     });

     console.log(address.sid);
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
       customer_name="name",
       street="555 AnyStreet",
       street_secondary="Apt B",
       city="Any City",
       region="Any Region",
       postal_code="12345",
       iso_country="US",
   )

   print(address.sid)
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
               customerName: "name",
               street: "555 AnyStreet",
               streetSecondary: "Apt B",
               city: "Any City",
               region: "Any Region",
               postalCode: "12345",
               isoCountry: "US");

           Console.WriteLine(address.Sid);
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
           Address address = Address.creator("name", "555 AnyStreet", "Any City", "Any Region", "12345", "US")
                                 .setStreetSecondary("Apt B")
                                 .create();

           System.out.println(address.getSid());
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
   	params.SetCustomerName("name")
   	params.SetStreet("555 AnyStreet")
   	params.SetStreetSecondary("Apt B")
   	params.SetCity("Any City")
   	params.SetRegion("Any Region")
   	params.SetPostalCode("12345")
   	params.SetIsoCountry("US")

   	resp, err := client.Api.CreateAddress(params)
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

   $address = $twilio->addresses->create(
       "name", // CustomerName
       "555 AnyStreet", // Street
       "Any City", // City
       "Any Region", // Region
       "12345", // PostalCode
       "US", // IsoCountry
       ["streetSecondary" => "Apt B"]
   );

   print $address->sid;
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
               customer_name: 'name',
               street: '555 AnyStreet',
               street_secondary: 'Apt B',
               city: 'Any City',
               region: 'Any Region',
               postal_code: '12345',
               iso_country: 'US'
             )

   puts address.sid
   ```

   ```bash
   # Install the twilio-cli from https://twil.io/cli

   twilio api:core:addresses:create \
      --customer-name name \
      --street "555 AnyStreet" \
      --street-secondary "Apt B" \
      --city "Any City" \
      --region "Any Region" \
      --postal-code 12345 \
      --iso-country US
   ```

   ```bash
   curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Addresses.json" \
   --data-urlencode "CustomerName=name" \
   --data-urlencode "Street=555 AnyStreet" \
   --data-urlencode "StreetSecondary=Apt B" \
   --data-urlencode "City=Any City" \
   --data-urlencode "Region=Any Region" \
   --data-urlencode "PostalCode=12345" \
   --data-urlencode "IsoCountry=US" \
   -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
   ```

   ```json
   {
     "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "city": "Any City",
     "customer_name": "name",
     "date_created": "Tue, 18 Aug 2015 17:07:30 +0000",
     "date_updated": "Tue, 18 Aug 2015 17:07:30 +0000",
     "emergency_enabled": false,
     "friendly_name": "Main Office",
     "iso_country": "US",
     "postal_code": "12345",
     "region": "Any Region",
     "sid": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "street": "555 AnyStreet",
     "street_secondary": "Apt B",
     "validated": false,
     "verified": false,
     "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Addresses/ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
   }
   ```
5. Provide the supporting documentation about your business.

   Create Supporting Document

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
           address_sids: "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
         },
         friendlyName: "address",
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
       type="customer_profile_address",
       friendly_name="address",
       attributes={"address_sids": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"},
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
               type: "customer_profile_address",
               friendlyName: "address",
               attributes: new Dictionary<string, Object>() {
                   { "address_sids", "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" }
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
           SupportingDocument supportingDocument = SupportingDocument.creator("address", "customer_profile_address")
                                                       .setAttributes(new HashMap<String, Object>() {
                                                           {
                                                               put("address_sids", "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
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
   	params.SetType("customer_profile_address")
   	params.SetFriendlyName("address")
   	params.SetAttributes(map[string]interface{}{
   		"address_sids": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
       "address", // FriendlyName
       "customer_profile_address", // Type
       [
           "attributes" => [
               "address_sids" => "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
                           type: 'customer_profile_address',
                           friendly_name: 'address',
                           attributes: {
                             'address_sids' => 'ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
                           }
                         )

   puts supporting_document.sid
   ```

   ```bash
   # Install the twilio-cli from https://twil.io/cli

   twilio api:trusthub:v1:supporting-documents:create \
      --type customer_profile_address \
      --friendly-name address \
      --attributes "{\"address_sids\":\"ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\"}"
   ```

   ```bash
   ATTRIBUTES_OBJ=$(cat << EOF
   {
     "address_sids": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
   }
   EOF
   )
   curl -X POST "https://trusthub.twilio.com/v1/SupportingDocuments" \
   --data-urlencode "Type=customer_profile_address" \
   --data-urlencode "FriendlyName=address" \
   --data-urlencode "Attributes=$ATTRIBUTES_OBJ" \
   -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
   ```

   ```json
   {
     "status": "DRAFT",
     "date_updated": "2021-02-11T17:23:00Z",
     "friendly_name": "address",
     "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "url": "https://trusthub.twilio.com/v1/SupportingDocuments/RDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "date_created": "2021-02-11T17:23:00Z",
     "sid": "RDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "attributes": {
       "address_sids": "ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
     },
     "type": "customer_profile_address",
     "mime_type": null
   }
   ```

### Assign components to your regulatory bundle

1. Associate data with the empty bundle. Each component (supporting document/address, customer profile information, authorized representative 1, authorized representative 2) has its own `object_sid` to assign to the bundle.

   Assign Customer Profile Business Information

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
         objectSid: "ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
       object_sid="ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
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
                   objectSid: "ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
                   .creator("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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
   	params.SetObjectSid("ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

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
           "ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" // ObjectSid
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
                                           object_sid: 'ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
                                         )

   puts customer_profiles_entity_assignment.sid
   ```

   ```bash
   # Install the twilio-cli from https://twil.io/cli

   twilio api:trusthub:v1:customer-profiles:entity-assignments:create \
      --customer-profile-sid BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
      --object-sid ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
   ```

   ```bash
   curl -X POST "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments" \
   --data-urlencode "ObjectSid=ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
   -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
   ```

   ```json
   {
     "sid": "BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "customer_profile_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "object_sid": "ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "date_created": "2019-07-31T02:34:41Z",
     "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments/BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
   }
   ```

   Assign Authorized Representative 1

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
         objectSid: "ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
       object_sid="ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
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
                   objectSid: "ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
                   .creator("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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
   	params.SetObjectSid("ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

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
           "ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" // ObjectSid
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
                                           object_sid: 'ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
                                         )

   puts customer_profiles_entity_assignment.sid
   ```

   ```bash
   # Install the twilio-cli from https://twil.io/cli

   twilio api:trusthub:v1:customer-profiles:entity-assignments:create \
      --customer-profile-sid BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
      --object-sid ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
   ```

   ```bash
   curl -X POST "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments" \
   --data-urlencode "ObjectSid=ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
   -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
   ```

   ```json
   {
     "sid": "BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "customer_profile_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "object_sid": "ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "date_created": "2019-07-31T02:34:41Z",
     "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments/BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
   }
   ```

   Assign Authorized Representative 2

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
         objectSid: "ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
       object_sid="ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
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
                   objectSid: "ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
                   .creator("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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
   	params.SetObjectSid("ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

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
           "ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" // ObjectSid
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
                                           object_sid: 'ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
                                         )

   puts customer_profiles_entity_assignment.sid
   ```

   ```bash
   # Install the twilio-cli from https://twil.io/cli

   twilio api:trusthub:v1:customer-profiles:entity-assignments:create \
      --customer-profile-sid BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
      --object-sid ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
   ```

   ```bash
   curl -X POST "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments" \
   --data-urlencode "ObjectSid=ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
   -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
   ```

   ```json
   {
     "sid": "BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "customer_profile_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "object_sid": "ITaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "date_created": "2019-07-31T02:34:41Z",
     "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/EntityAssignments/BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
   }
   ```
2. Assign the Customer Profile as an entity to another Customer Profile. Fetch the Primary Customer Profile SID from the primary account.

   Add this SID as the value of the `ObjectSid` parameter.

   `ObjectSid` accepts a `Customer Profile Sid` from the same account or from the primary account.

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
3. Assign supporting documentation to the Secondary CustomerProfile instance.

   Assign a Supporting Document

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
4. Assign phone numbers to your Secondary Customer Profile. To find your phone number SID, go to [Numbers & senders in the Console](https://1console.twilio.com/go?to=/account/__account__/us1/senders-hub/list/phone-numbers/inventory).

   Assign Phone Numbers

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
       .customerProfiles("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
       .customerProfilesChannelEndpointAssignment.create({
         channelEndpointSid: "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
           "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
       ).customer_profiles_channel_endpoint_assignment.create(
           channel_endpoint_type="phone-number",
           channel_endpoint_sid="PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
                   channelEndpointSid: "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
                   pathCustomerProfileSid: "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

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
                   .creator("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "phone-number", "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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
   	params.SetChannelEndpointSid("PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

   	resp, err := client.TrusthubV1.CreateCustomerProfileChannelEndpointAssignment("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
       ->customerProfiles("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
       ->customerProfilesChannelEndpointAssignment->create(
           "phone-number", // ChannelEndpointType
           "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" // ChannelEndpointSid
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
                                                   .customer_profiles('BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                                                   .customer_profiles_channel_endpoint_assignment
                                                   .create(
                                                     channel_endpoint_type: 'phone-number',
                                                     channel_endpoint_sid: 'PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
                                                   )

   puts customer_profiles_channel_endpoint_assignment.sid
   ```

   ```bash
   # Install the twilio-cli from https://twil.io/cli

   twilio api:trusthub:v1:customer-profiles:channel-endpoint-assignments:create \
      --customer-profile-sid BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
      --channel-endpoint-type phone-number \
      --channel-endpoint-sid PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
   ```

   ```bash
   curl -X POST "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments" \
   --data-urlencode "ChannelEndpointType=phone-number" \
   --data-urlencode "ChannelEndpointSid=PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
   -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
   ```

   ```json
   {
     "sid": "RAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "customer_profile_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "channel_endpoint_sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
     "channel_endpoint_type": "phone-number",
     "date_created": "2019-07-31T02:34:41Z",
     "url": "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelEndpointAssignments/RAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
   }
   ```

### Validate your Secondary CustomerProfile

Evaluate the Secondary CustomerProfile instance.

Run an evaluation

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
      policySid: "RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
    policy_sid="RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
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
            policySid: "RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
                .creator("BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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
	params.SetPolicySid("RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

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
        "RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" // PolicySid
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
                                 policy_sid: 'RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
                               )

puts customer_profiles_evaluation.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trusthub:v1:customer-profiles:evaluations:create \
   --customer-profile-sid BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --policy-sid RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X POST "https://trusthub.twilio.com/v1/CustomerProfiles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Evaluations" \
--data-urlencode "PolicySid=RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "ELaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "policy_sid": "RNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "customer_profile_sid": "BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

### Submit your Secondary CustomerProfile

Submit the Secondary CustomerProfile instance for review.

Submit for review

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

After submission, Twilio performs an evaluation of your request.

* If it complies, your Secondary Customer Profile state changes to under `in-review` status.
* If it doesn't comply, Twilio rejects it and changes its status to `twilio-rejected`.

[policy-request]: /docs/trust-hub/trusthub-rest-api/customer-profiles#request-body-parameters

[http-url]: https://datatracker.ietf.org/doc/html/rfc1738#section-3.3

[email-format]: https://datatracker.ietf.org/doc/html/rfc2822

[end-user]: /docs/phone-numbers/regulatory/api/end-users

[sup-docs]: /docs/phone-numbers/regulatory/api/supporting-documents

[accts]: /docs/iam/api/account
