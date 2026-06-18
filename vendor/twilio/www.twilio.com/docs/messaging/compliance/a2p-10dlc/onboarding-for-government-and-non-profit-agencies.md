# A2P 10DLC - Registration for Government and Nonprofit Agencies

Government and nonprofit agencies are eligible for A2P 10DLC [Special Use Cases](https://help.twilio.com/articles/4402972441243-Special-Use-Cases-for-A2P-10DLC), which allow for increased messaging throughput and/or discounted pricing on the T-Mobile network.

This document lists the specific steps required to register your A2P 10DLC Brand and Campaigns if you are a government or nonprofit organization.

Read this guide before beginning A2P 10DLC registration to ensure that your organization can use the appropriate A2P 10DLC Use Case.

* If you are registering your own agency/organization for A2P 10DLC, you are considered a **Direct Customer**, and you need to follow the steps in the [Direct Standard Brand Onboarding Guide](/docs/messaging/compliance/a2p-10dlc/direct-standard-onboarding) along with the [Direct Customer directions on this page](#direct-customer).
* If you are an **Independent Software Vendor (ISV)** registering your customer for A2P 10DLC, you need to follow the steps in the [ISV Standard Brand Onboarding Guide](/docs/messaging/compliance/a2p-10dlc/onboarding-isv-api), along with the [ISV directions on this page](#isv).

> \[!WARNING]
>
> If you are registering a **527 political organization**, there are additional required steps. Read the [527 political organization section at the bottom of this page](#527-political-organizations) before starting the A2P 10DLC registration process.

## Direct Customer

This section is for **Direct Customers** who are registering their own government or nonprofit organization for A2P 10DLC. This section covers the values you need to provide at specific points in the A2P 10DLC registration process.

### Direct Customer - Government organizations

* When [creating your TrustHub profile](/docs/messaging/compliance/a2p-10dlc/direct-standard-onboarding#step-1-create-a-primary-customer-profile-in-trust-hub):
  * For **Business Type**, enter `Non-profit corporation`.
  * For **Business Industry**, enter `Government`.
* When [creating your A2P Brand](/docs/messaging/compliance/a2p-10dlc/direct-standard-onboarding#step-2-register-a-brand):
  * For **Company Type**, enter `Government`.
* Once your Brand is `APPROVED`, you can [create your A2P 10DLC Campaign](/docs/messaging/compliance/a2p-10dlc/direct-standard-onboarding#step-3-register-a-campaign-and-associate-a-messaging-service).
  * Government agencies can register with all Standard Campaign Use Cases, and are also eligible for the **Emergency** Special Use Case. [Read the Help Center article on Special Use Cases for more information](https://help.twilio.com/articles/4402972441243-Special-Use-Cases-for-A2P-10DLC).

### Direct Customer - Nonprofit agencies

* When [creating your TrustHub profile](/docs/messaging/compliance/a2p-10dlc/direct-standard-onboarding#step-1-create-a-primary-customer-profile-in-trust-hub):
  * For **Business Type**, enter `Non-profit corporation`.
  * For **Business Industry**, enter `Not for profit`.
* When [creating your A2P Brand](/docs/messaging/compliance/a2p-10dlc/direct-standard-onboarding#step-2-register-a-brand):
  * For **Company Type**, enter `US Non Profit`.
  * For **527 political organizations**, you must also provide your [Campaign Verify](https://www.campaignverify.org/) token during this registration step.
* Once your Brand is `APPROVED`, you can [create your A2P 10DLC Campaign](/docs/messaging/compliance/a2p-10dlc/direct-standard-onboarding#step-3-register-a-campaign-and-associate-a-messaging-service).
  * **Nonprofit organizations** have access to additional Special Use Cases, such as Charity/501(c)(3). 527 political organizations can use the Political Special Use Case. [Read the Help Center article on Special Use Cases for more information](https://help.twilio.com/articles/4402972441243-Special-Use-Cases-for-A2P-10DLC).

## ISV

This section covers the values that must be provided by an ISV when registering their customer's government or nonprofit organization for A2P 10DLC.

### ISV - Registering a government organization

* When creating the [EndUser resource of type customer\_profile\_business\_information](/docs/messaging/compliance/a2p-10dlc/onboarding-isv-api#12-create-an-enduser-resource-of-type-customer_profile_business_information) for your customer's business:
  * The `business_type` value must be `Non-profit Corporation`.
  * The `business_industry` value must be `GOVERNMENT`.
* When creating the [EndUser resource of type us\_a2p\_messaging\_profile\_information](/docs/messaging/compliance/a2p-10dlc/onboarding-isv-api#22-create-an-enduser-resource-of-type-us_a2p_messaging_profile_information):
  * The `company_type`  value must be `government`.

### ISV - Registering a nonprofit organization

* When creating the [EndUser resource of type customer\_profile\_business\_information](/docs/messaging/compliance/a2p-10dlc/onboarding-isv-api#12-create-an-enduser-resource-of-type-customer_profile_business_information) for your customer's business:
  * The `business_type` value must be `Non-profit Corporation`.
  * The `business_industry` value must be  `NOT_FOR_PROFIT`.
* When creating the [EndUser resource of type us\_a2p\_messaging\_profile\_information](/docs/messaging/compliance/a2p-10dlc/onboarding-isv-api#22-create-an-enduser-resource-of-type-us_a2p_messaging_profile_information):
  * The `company_type`  value must be `non_profit`.

#### Additional steps for ISVs registering a 527 political organization

This section covers the two additional steps required for 527 political organizations to have access to the Political Special Use Case.

* When creating the BrandRegistration resource for a 527 political organization, `skip_automatic_sec_vet` must be `true` as shown [in the code sample in the onboarding guide](/docs/messaging/compliance/a2p-10dlc/onboarding-isv-api#code-create-a-brandregistration-resource---skip-secondary-vetting).
* After the BrandRegistration's `status` is `APPROVED`, you need to create a [BrandVetting resource](/docs/messaging/api/brand-vetting-resource).
  * This API request associates the Campaign Verify token with the BrandRegistration resource. A sample request is shown below.
  * The `vetting_provider` is `campaign-verify`.
  * The `vetting_id` is the Campaign Verify token.

Create a BrandVetting resource for a 527 political organization

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createBrandVetting() {
  const brandVetting = await client.messaging.v1
    .brandRegistrations("BNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .brandVettings.create({
      vettingId:
        "cv|1.0|tcr|10dlc|9975c339-d46f-49b7-a399-2e6d5ebac66d|EXAMPLEjEd8xSlaAgRXAXXBUNBT2AgL-LdQuPveFhEyY",
      vettingProvider: "campaign-verify",
    });

  console.log(brandVetting.accountSid);
}

createBrandVetting();
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

brand_vetting = client.messaging.v1.brand_registrations(
    "BNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).brand_vettings.create(
    vetting_id="cv|1.0|tcr|10dlc|9975c339-d46f-49b7-a399-2e6d5ebac66d|EXAMPLEjEd8xSlaAgRXAXXBUNBT2AgL-LdQuPveFhEyY",
    vetting_provider="campaign-verify",
)

print(brand_vetting.account_sid)
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

        var brandVetting = await BrandVettingResource.CreateAsync(
            vettingId: "cv|1.0|tcr|10dlc|9975c339-d46f-49b7-a399-2e6d5ebac66d|EXAMPLEjEd8xSlaAgRXAXXBUNBT2AgL-LdQuPveFhEyY",
            vettingProvider: BrandVettingResource.VettingProviderEnum.CampaignVerify,
            pathBrandSid: "BNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(brandVetting.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.messaging.v1.brandregistration.BrandVetting;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        BrandVetting brandVetting =
            BrandVetting.creator("BNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", BrandVetting.VettingProvider.CAMPAIGN_VERIFY)
                .setVettingId("cv|1.0|tcr|10dlc|9975c339-d46f-49b7-a399-2e6d5ebac66d|EXAMPLEjEd8xSlaAgRXAXXBUNBT2AgL-"
                              + "LdQuPveFhEyY")
                .create();

        System.out.println(brandVetting.getAccountSid());
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

	params := &messaging.CreateBrandVettingParams{}
	params.SetVettingId("cv|1.0|tcr|10dlc|9975c339-d46f-49b7-a399-2e6d5ebac66d|EXAMPLEjEd8xSlaAgRXAXXBUNBT2AgL-LdQuPveFhEyY")
	params.SetVettingProvider("campaign-verify")

	resp, err := client.MessagingV1.CreateBrandVetting("BNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
		params)
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

$brand_vetting = $twilio->messaging->v1
    ->brandRegistrations("BNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->brandVettings->create(
        "campaign-verify", // VettingProvider
        [
            "vettingId" =>
                "cv|1.0|tcr|10dlc|9975c339-d46f-49b7-a399-2e6d5ebac66d|EXAMPLEjEd8xSlaAgRXAXXBUNBT2AgL-LdQuPveFhEyY",
        ]
    );

print $brand_vetting->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

brand_vetting = @client
                .messaging
                .v1
                .brand_registrations('BNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                .brand_vettings
                .create(
                  vetting_id: 'cv|1.0|tcr|10dlc|9975c339-d46f-49b7-a399-2e6d5ebac66d|EXAMPLEjEd8xSlaAgRXAXXBUNBT2AgL-LdQuPveFhEyY',
                  vetting_provider: 'campaign-verify'
                )

puts brand_vetting.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:messaging:v1:a2p:brand-registrations:vettings:create \
   --brand-sid BNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --vetting-id "cv|1.0|tcr|10dlc|9975c339-d46f-49b7-a399-2e6d5ebac66d|EXAMPLEjEd8xSlaAgRXAXXBUNBT2AgL-LdQuPveFhEyY" \
   --vetting-provider campaign-verify
```

```bash
curl -X POST "https://messaging.twilio.com/v1/a2p/BrandRegistrations/BNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Vettings" \
--data-urlencode "VettingId=cv|1.0|tcr|10dlc|9975c339-d46f-49b7-a399-2e6d5ebac66d|EXAMPLEjEd8xSlaAgRXAXXBUNBT2AgL-LdQuPveFhEyY" \
--data-urlencode "VettingProvider=campaign-verify" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "AC78e8e67fc0246521490fb9907fd0c165",
  "brand_sid": "BNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "brand_vetting_sid": "VT12445353",
  "vetting_provider": "campaign-verify",
  "vetting_id": "cv|1.0|tcr|10dlc|9975c339-d46f-49b7-a399-2e6d5ebac66d|EXAMPLEjEd8xSlaAgRXAXXBUNBT2AgL-LdQuPveFhEyY",
  "vetting_class": "POLITICAL",
  "vetting_status": "IN_PROGRESS",
  "date_created": "2021-01-27T14:18:35Z",
  "date_updated": "2021-01-27T14:18:35Z",
  "url": "https://messaging.twilio.com/v1/a2p/BrandRegistrations/BN0044409f7e067e279523808d267e2d85/Vettings/VT12445353"
}
```

## 527 political organizations

> \[!NOTE]
>
> This section only applies to 527 political organizations that need to register for A2P 10DLC.

Campaign Verify is a secure, non-partisan verification solution for US political organizations who wish to engage with voters via A2P 10DLC messaging.

All 527 political organizations sending political communications on behalf of a federal, state, or local political campaign must [be verified by Campaign Verify](https://www.campaignverify.org/#signup) to unlock the Political Special Campaign Use Case with increased messaging limits.

Before continuing with this guide, read the Campaign Verify [FAQ](https://www.campaignverify.org/faq). The process described in this guide incurs fees.

Verification involves submitting information about your political organization to Campaign Verify, as well as verifying your identity as an authorized person associated with the political organization. After completing verification with Campaign Verify, you receive a Campaign Verify (CV) token. You need to provide this token during A2P 10DLC registration with Twilio.

### Campaign Verify tokens

A full CV token is composed of 6 pipe (|) delimited fields, for example:

`cv|1.0|tcr|10dlc|9957c339-d46f-49b7-a399-2e6d5ebac66d|GQ3NMEjED8xSlaAgRXAXXBUNBT2AgL-LdQuPveFhEyy`

* CV tokens expire after a period of time and need to be periodically updated. This can be done via API using the [BrandVetting resource](/docs/messaging/api/brand-vetting-resource).
* You can only use a CV token with one Brand.
* If the 527 organization is a customer of multiple text messaging providers that will each create an A2P 10DLC Brand on the organization's behalf, a unique CV token must be generated and provided to each vendor.

> \[!WARNING]
>
> A 527 organization that does not register with Campaign Verify and provide a token during A2P 10DLC registration is allowed to register with Standard Use Cases, but receives the lowest tier of [A2P 10DLC messaging limits](https://help.twilio.com/hc/en-us/articles/1260803225669-Message-throughput-MPS-and-Trust-Scores-for-A2P-10DLC-in-the-US) and does not qualify for the Political Special Use Case.
>
> In addition, the organization may be subject to penalties from carriers if political messaging traffic is incorrectly registered with Standard Use Cases.

> \[!NOTE]
>
> If you have already created a US A2P Brand for a 527 political organization and would like to add a CV token after Brand registration, you must use the REST API.

Once you have a CV token, you can proceed with registration. You provide the CV token during the Brand registration step.
