# Troubleshooting A2P 10DLC Standard/LVS Brands

During the A2P 10DLC onboarding process, you created a [BrandRegistration resource](/docs/messaging/api/brand-registration-resource). This resource represents an A2P 10DLC Brand.

The possible statuses of the BrandRegistration resource are as follows:

* `PENDING`: your Brand registration has not yet been completed. Most Brand registrations complete within a few minutes, but a few registrations take more than seven days.
* `IN_REVIEW`: your Brand registration has not yet been completed; your Brand information is under manual third-party review. Such a manual review takes seven business days or more. There is no action required from your side.
* `APPROVED`: your Brand registration was completed and verified. You can now register your campaigns. However, a Brand with APPROVED status might still have `brand_feedback` information which could be used to improve your Trust Score. See immediately below for details.
* `FAILED`: your Brand registration's information couldn't be verified. Review the `errors` fields to understand more about this failure.
* `SUSPENDED`: your Brand is deemed to have potentially violated one or more rules for Brand registration established by the A2P ecosystem partners. This status will require Twilio Support assistance to address. To learn more, consult [Brands with SUSPENDED status, and related Campaign suspensions](/docs/messaging/compliance/a2p-10dlc/troubleshooting-a2p-brands/troubleshooting-and-rectifying-a2p-standardlvs-brands#brands-with-suspended-status-and-related-campaign-suspensions).

> \[!NOTE]
>
> `brand_feedback` and `failure_reason` return parameters:
>
> To make the Brand registration feedback more useful and actionable for users, the previous `brand_feedback` and `failure_reason` messages are now consolidated within an `errors[]` return parameter (much like the one previously implemented for rejected Campaigns, as detailed in the Campaign Troubleshooting document).
>
> It is important to understand that the `errors[]` parameter can be populated *either* if the Brand's status is APPROVED, but there is room to improve your Brand's **trust score** by rectifying or clarifying certain information you've supplied, *or* if your Brand has a status of FAILED, in which case both the `brand_feedback` and `failure_reason` information will be available in the `errors` fields to communicate what information needs to be rectified for successful resubmission of the Brand. See possible values and other details of `errors` immediately below.

The `brand_feedback` field contains a list of **Feedback IDs**, where each **ID** corresponds to a recommendation on how you can improve your brand score. You will receive a list of feedback IDs on your brand registration, if any is determined necessary. Along with the list of feedback IDs, you will receive descriptive recommendations for ways to fix your brand registration.

> \[!NOTE]
>
> More than one feedback ID may be returned at a time. Once you have received feedback on your brand registration, you can contact Twilio support with the appropriate corrected information to update your brand.
> You can read more in [A2P 10DLC Brand Approval Best Practices](https://help.twilio.com/hc/en-us/articles/4405758341659-A2P-10DLC-Brand-Approval-Best-Practices).

### Brands with SUSPENDED status, and related Campaign suspensions

If you have a suspended brand, it means the brand may have violated one or more of the following rules, causing Carriers / other ecosystem partners to suspend it:

* Campaign-to-traffic mismatch: In-market traffic does not match with the campaign registered
* Spam: including but not limited to any kind of unwanted or unsolicited messaging
* Controlled substance: including but not limited to messaging pertaining to controlled substances
* Phishing Messages: including but not limited to messaging designed to gain access to information through deceptive means
* (Excessive) Complaints: including but not limited to unacceptable volumes of consumer complaints
* Illicit Content: including but not limited to messages relating to illegal activity
* Fraudulent Messages: including but not limited to counterfeit/fraudulent goods or activities
* Affiliate Marketing: including but not limited to sharing of opt-ins to affiliate companies
* Promotional Gambling or the act of betting: including but not limited to the act of gambling or promoting gambling
* Lack of Age gate: No age gate mechanism for messaging campaigns that require it
* Illegal Sweepstakes: including but not limited to sweepstakes that do not follow required laws
* Other violations not listed above

The Twilio team should be reaching out to you to provide guidance on how to fix the suspended Brand. Check your email or the [Twilio Support Center](https://console.twilio.com/us1/support/tickets?frameUrl=%2Fconsole%2Fsupport%2Ftickets%3Fx-target-region%3Dus1). If you don't see anything, raise a ticket.

While your brand is suspended, you will experience the following restrictions:

1. It is VERY important that you do not attempt to send similar messages via another existing or new Brand or Campaign. This could result in a serious violation and may result in termination / suspension of your account with Twilio.
2. Suspended Brands face the following restrictions
   1. Suspended Brands cannot be updated or used to register any new Campaigns. You will receive an error code 21731 if you try to do this.
   2. Suspended brands with active Campaigns may not be deleted via self-service. Suspended brands with no campaigns may be deleted via self-service.
   3. Your ability to create new Brands using the same tax ID may be restricted.
3. All campaigns associated with suspended brands will be suspended. Suspended Campaigns face the following restrictions
   1. Suspended campaigns cannot be used to send messages. You will receive an error code 30033 if you try to do this
   2. Suspended campaigns cannot be deleted via self-service and you may not add / remove the numbers. You will receive an error code 21729 if you try to do this.
4. Before you resolve the suspensions, you're responsible for the monthly registration fees associated with suspended campaigns as well as the monthly fees associated with the numbers that are in the campaigns.
5. It is also possible that you won't be able to resolve the suspensions if the ecosystem has determined your use case is not fit for A2P 10DLC. If this is the case, after 60 days of being suspended, you may request the Twilio Support team to delete your suspended brands and campaigns. But you may be required to release all the associated phone numbers at the same time. In the future, we plan on deleting unresolved suspended brands and campaigns automatically after a certain period of time

## Resubmitting Standard/LVS Brands

Twilio supports resubmission of Brands in the `unverified` (or FAILED) state up to three times for free using either the Twilio Console or the Twilio Trust Hub API. Once you have reached this limit, reach out to Twilio Support for additional assistance.

While Twilio will continue to allow brand updates going forward, these may incur a fee at some point in the future, as each brand resubmission entails a charge by our A2P ecosystem partners.

> \[!WARNING]
>
> The three free self-service Brand resubmissions offered here, and in the walkthrough docs, must be distinguished from an **appeal-based, manual re-vetting process** for a failed Brand. For example, most Standard or LVS Brands fail because of a mismatch between the business information (exact legal business name, exact address, etc) submitted in the registration process with the Business Profile, and that information as registered with the government tax authority. Thus, these failures can be remedied by the customer reviewing their tax documentation and addressing any discrepancies between this and the business information provided in the Business Profile, before updating that Business Profile and resubmitting the Brand per the procedures detailed below for Console and for API. If this resubmission results in a successfully-approved Brand, no involvement of Twilio Support is necessary and the customer may proceed with Campaign registration.
>
> However, in certain rare cases, the customer may continue to see Brand registration failures even if the submitted Business Profile information exactly matches that in their Tax ID registration. One common reason for this is that the Tax ID (e.g. EIN in the U.S.) registration is so new that it hasn't yet propagated to the databases that Twilio and our ecosystem partners use for vetting purposes. The same could be the case for a 501c3 or other non-profit organization. In such a case, the remedy is for the customer to appeal the Brand rejection with [Twilio Support](https://help.twilio.com), at which point Twilio Ops will ask for certain documentation which will prove the customer's tax registration. This process of necessarily involves manual vetting by our ecosystem partner
>
> **This second kind of appeal-based, manual revetting of a submitted Brand entails a $10 fee**, over and above the fees normally charged for Brand submission.

### Using the Console

When a Brand registration fails within the Console, here's what you can expect to see in your process to resubmit the Brand with correct information. Of course failure reasons can be various; this one happens to be a mismatch between the name associated with the provided business registration number (Tax ID/EIN) in publicly-available tax information, and the legal name you've provided for the Brand itself:

![Twilio Console showing a mismatch error between business registration number and legal name with options to edit customer profile.](https://docs-resources.prod.twilio.com/59c86bedab9dd1259f1c87e122dcb8cd81cf2e3b39c908a9e3414f7acb5c1df7.png)

When submitted using the Twilio Console, Brands will show descriptive error messages. From here, you can click "Edit customer profile" to begin the process of editing and correcting your Brand information. Note that you *are not editing the Brand submission* as such; that can only be deleted and resubmitted when you are using the Console. But the information that needs to be rectified is actually in the Customer Profile you submitted before the Brand creation step, and the Customer Profile can be edited via the blue button, as indicated.

After you have edited the Customer Profile to your satisfaction, and resubmitted this for approval, you'll go to **Messaging > Regulatory Compliance > Brands** in the left navigation and find the Brand that failed. Any Brand that you see in this list can be deleted, so be sure that you're deleting the correct one (this is one reason why its always a good idea to create Brands and other such entities with meaningful 'friendly names'). You will find the red Delete link in the dropdown when you click the three dots to the far right of the row with the Brand in question:

![A2P Brands dashboard with delete option highlighted in dropdown menu.](https://docs-resources.prod.twilio.com/74738ebad00c168b9053657b09221d193e03661197a04f7f703d35828ae613ca.png)

Once you've deleted this Brand, you can go back to the **Onboarding** page under **Regulatory** Compliance, and if you're not already in the correct profile use the **Switch Customer Profile** link on the right to select the Profile you just edited. This should immediately take you to the Submit Brand page, allowing you to submit a new Brand with the rectified profile information.

### Updating an A2P Brand Using the API

> \[!NOTE]
>
> You may perform a brand update a **maximum of three times** at no additional charge. Once you have reached this limit, reach out to Twilio Support for additional assistance.
>
> If you attempt a brand update more than three times, you will receive a 400 API response and a [21724](/docs/api/errors/21724) error code.
>
> While Twilio will continue to allow brand updates, these may incur a fee at some point in the future, as each brand resubmission entails a charge by our A2P ecosystem partners.

**What does this do?** This step allows you to edit the A2P brand you've created if you have received a `FAILED` brand status and the `tcr_id` is not null. You will use the brand's SID (starting with `BN`) to make this update call.

**NOTE**: In contrast to the Console, where it's necessary to delete and recreate a failed Brand, through the API it is possible to call an update on an existing (failed) Brand submission, as shown in the code snippet below. However, as with the Console, it is the information you submitted in the Customer Profile or Trust Bundle associated with that Brand that actually needs to be rectified; otherwise the Brand submission will fail again for the same reason. This is why the Brand UPDATE call below contains only a single input parameter, the Brand SID; all of the information you're actually fixing is upstream of this call.

First, review the error message from the `brand_feedback` and/or `feedback_reason` parameters that you've retrieved in the Brand `fetch` step noted above. Where it's necessary to update information, you will need to perform the necessary updates using the relevant [Trust Hub API](/docs/trust-hub/trusthub-rest-api) endpoints as detailed in Steps 1 (Customer Profile submission) and 2 (Trust Bundle submission) of the API walkthrough documents. For example, [you may need to update the associated customer profile](/docs/trust-hub/trusthub-rest-api/customer-profiles#code-create-a-customerprofile) or [update the information attached to the listed end-user](/docs/trust-hub/trusthub-rest-api/enduser-resource#code-update-an-enduser).

Once you have finished any necessary updates to your Profile and/or Trust Bundle , use the `update` method of the `brand_registrations` endpoint to update the brand's registration. As the following snippet indicates, the only necessary input parameter for this update call itself is the Brand SID (`path` or `sid)`. The return json will contain the same parameters you've seen in the create and fetch calls for the Brand. Remember that your newly-updated information will in many cases require manual re-verification, so allow some time for this before checking Brand Registration status again.

Update an A2P Brand

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateBrandRegistrations() {
  const brandRegistration = await client.messaging.v1
    .brandRegistrations("BNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .update();

  console.log(brandRegistration.sid);
}

updateBrandRegistrations();
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

brand_registrations = client.messaging.v1.brand_registrations(
    "BNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).update()

print(brand_registrations.sid)
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

        var brandRegistration = await BrandRegistrationResource.UpdateAsync(
            pathSid: "BNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

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
        BrandRegistration brandRegistration = BrandRegistration.updater("BNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").update();

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

	resp, err := client.MessagingV1.UpdateBrandRegistrations("BNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
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

$brand_registrations = $twilio->messaging->v1
    ->brandRegistrations("BNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->update();

print $brand_registrations->sid;
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
                     .brand_registrations('BNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                     .update()

puts brand_registration.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:messaging:v1:a2p:brand-registrations:update \
   --sid BNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X POST "https://messaging.twilio.com/v1/a2p/BrandRegistrations/BNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "BNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "customer_profile_bundle_sid": "BU3344409f7e067e279523808d267e2d85",
  "a2p_profile_bundle_sid": "BU3344409f7e067e279523808d267e2d85",
  "date_created": "2021-01-27T14:18:35Z",
  "date_updated": "2021-01-27T14:18:36Z",
  "brand_type": "STANDARD",
  "status": "PENDING",
  "tcr_id": "BXXXXXX",
  "failure_reason": "Registration error",
  "url": "https://messaging.twilio.com/v1/a2p/BrandRegistrations/BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "brand_score": 42,
  "brand_feedback": [
    "TAX_ID",
    "NONPROFIT"
  ],
  "identity_status": "VERIFIED",
  "russell_3000": false,
  "government_entity": false,
  "tax_exempt_status": "501c3",
  "skip_automatic_sec_vet": false,
  "errors": [],
  "mock": false,
  "links": {
    "brand_vettings": "https://messaging.twilio.com/v1/a2p/BrandRegistrations/BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Vettings",
    "brand_registration_otps": "https://messaging.twilio.com/v1/a2p/BrandRegistrations/BNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/SmsOtp"
  }
}
```

## Troubleshooting Authentication+ 2FA verification failures

Some brands may fail registration due to issues related to Authentication+ (2FA) verification of the brand contact email. This verification step is required by The Campaign Registry (TCR) for validating the identity and domain ownership of brand submitters.

The following error codes are associated with 2FA verification failures:

| Error code | Message                                | Description                                                                                          | Resolution                                                                                                                                                                                                                                 |
| ---------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 21736      | Domain Ownership Could Not Be Verified | The domain used in the brand contact email could not be independently verified.                      | Use an email domain clearly tied to your brand (e.g., listed on your official website, with matching WHOIS records or DNS TXT record). Contact [Twilio Support](https://www.twilio.com/support) if you believe your domain should qualify. |
| 21737      | 2FA Verification Expired               | The 2FA verification link or token expired before being used.                                        | Submit a new 2FA request via Console or API and have the contact complete it within the allowed time window.                                                                                                                               |
| 21738      | 2FA Email Undeliverable                | The verification email could not be delivered to the brand contact.                                  | Ensure the email address is correct, active, and can receive external messages. Update the contact email if needed.                                                                                                                        |
| 21739      | 2FA Verification Failed or Timed Out   | The verification process was not completed.                                                          | Re-initiate the 2FA request and confirm that the contact completes the verification promptly.                                                                                                                                              |
| 21740      | Invalid Brand Contact Email Domain     | The domain used for the brand contact email is not acceptable for Authentication+ (e.g., gmail.com). | Use a business or organizational email domain associated with your brand. Avoid free or generic email providers.                                                                                                                           |
| 21741      | 2FA Code Expired                       | The verification code was not entered in time.                                                       | Re-initiate the 2FA process and ensure timely completion.                                                                                                                                                                                  |

### Fix Authentication+ failures

The steps to fix an Authentication+ failure vary depending on whether or not your brand is new.

#### For new brands with Authentication+ failures

If your brand registration failed due to a 2FA/Authentication+ error, follow these steps:

1. Update your `brand_contact_email` in the associated `us_a2p_messaging_profile_information` bundle for the brand.
2. Once updated, you must manually trigger the Authentication+ verification again using the [2FA API endpoint](/docs/messaging/api/brand-2fa-verify).
3. Your brand contact receives an email with Authentication+ verification instructions. Ask your brand contact to complete the verification before the deadline specified in the email.

> \[!NOTE]
>
> If you did not receive the 2FA email then you can resend the Authentication+ email from the Twilio Console.

#### For existing brands that need re-verification

Some brands need to be verified again because of policy changes. Follow these steps if your brand was previously registered and approved for Authentication+:

1. [Fetch](/docs/trust-hub/trusthub-rest-api/trust-products#fetch-a-trustproduct-resource) the `us_a2p_messaging_profile_information` bundle.
2. Get entity assignments related to the `us_a2p_messaging_profile_information` bundle.
3. Filter the entity assignments to find the related SID (starting with "IT") associated with US A2P profile information for assignment in `$ENTITY_ASSIGNMENTS`
4. Update the `brand_contact_email` on the `us_a2p_messaging_profile_information` bundle.
5. [Move](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/onboarding-isv-api#26-submit-the-trustproduct-for-review) the `us_a2p_messaging_profile_information` bundle to `pending-review`.
6. Call the brand update endpoint.

> \[!NOTE]
>
> Twilio will automatically trigger an Authentication+ verification flow on your behalf after you update the `brand_contact_email` and call the brand update endpoint. You do not need to call the 2FA endpoint yourself unless a failure has occurred.

#### Resending the 2FA email

If the brand contact did not receive the verification email then you can send it to them again using the Twilio Console.
To do this:

1. Go to **Messaging** > **Regulatory Compliance** > **Brands**.
2. Select the affected brand.
3. Use the UI option to resend the verification email to the existing contact.

> \[!NOTE]
>
> Make sure that the brand contact email is correct and associated with your business. Don't use a consumer email domain like `gmail.com`.
