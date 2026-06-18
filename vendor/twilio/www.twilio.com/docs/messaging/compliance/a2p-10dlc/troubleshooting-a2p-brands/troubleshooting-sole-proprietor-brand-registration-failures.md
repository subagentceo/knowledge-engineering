# Troubleshooting Sole Proprietor Brand Registration Failures

As noted at the start of our [A2P Sole Proprietor Brand API registration guide](/docs/messaging/compliance/a2p-10dlc/onboarding-isv-api-sole-prop-new), Sole Proprietor registration via the API consists of the following steps:

1. **Create a Starter Profile** (a Starter Profile is used for later creating a Sole Proprietor Brand and Campaign, and can also be used for registering other products within TrustHub)
2. **Create a Sole Proprietor A2P Trust Bundle**
3. **Create a Sole Proprietor Brand and complete OTP verification** (you can only register 1 Sole Proprietor Brand for each unique customer)
4. **Create a Sole Proprietor Campaign** (each Sole Proprietor Brand can only have one Campaign)
5. **Add a Phone Number to the Campaign** (each Sole Proprietor Campaign can only use one Phone Number to send messages)

The present document addresses failures that can happen at Steps 1 and 3 (and involve remediations involving API calls at Steps 1, 2 and 3). Step 4, creation of the Sole Proprietor Campaign, can also fail; troubleshooting these failures is addressed in a [separate document](/docs/messaging/compliance/a2p-10dlc/troubleshooting-a2p-brands/troubleshooting-and-rectifying-a2p-campaigns-1). Finally, Phone Numbers added to successfully-created Campaigns (Step 5) can themselves fail to be successfully registered, or their successful registration can take longer than expected. Troubleshooting these phone number issues is addressed in [this guide](/docs/messaging/compliance/a2p-10dlc/troubleshooting-a2p-brands/troubleshooting-a2p-phone-number-registration-issues).

## Troubleshooting and remediating Brand creation via Twilio Console vs via Twilio APIs

A2P Brands and Campaigns can be *registered* either through our APIs or through our Console (**Messaging > Regulatory Compliance > A2P Onboarding**). Typically, direct customers registering their own Sole Proprietor Brands & Campaigns would do so through the Console, following [this guide](/docs/messaging/compliance/a2p-10dlc/direct-sole-proprietor-registration-overview), while ISVs registering large numbers of secondary customers for Sole Proprietor Brands would most commonly do so through the API, using the Sole Proprietor API guide linked above and following the 5 steps mentioned there. As with any complex, multi-step process, our Console and API tools each offer pros and cons. The Console tool offers a user experience with a clearly-defined and constrained workflow, and this includes surfacing failure messages at different points and directing users on how to rectify these failures; but with this tool users can only process one Brand at a time. By contrast, our API tools offer ISVs the possibility of batch-creating dozens, hundreds or thousands of secondary Brands at a time, but while these API tools will also surface failures at various points, considerably greater care must be taken in troubleshooting and (especially) remediating these failures.

In fact, once you've been notified of failures related to Brand registration via the API, it might well make sense to proceed further via the Console in troubleshooting and rectifying these failures. Here you would log into the [Twilio Console](https://console.twilio.com) and choose the account (or subaccount) in which you have created the Brand you need to troubleshoot. Going to **Messaging > Regulatory Compliance > Brands** will show you a list of all Brands you've submitted in that account, along with a current status for each: `registered`, `failed,` or `in review`. Click on the name of the failed Brand you'd like to troubleshoot, and you'll be taken to a Brand summary page including failure details and directions for proceeding. In the first section below, we will consider one particular case of failure — a failure in the validation of the email and/or address submitted with the Starter Business Profile associated with a Sole Proprietor Brand. Whatever the nature of a Brand failure, it's very possible that even if that Brand's registration was done (or attempted) in a batch process via the API, the particular nature of that failure may very well be unique to that particular Brand, meaning that there is likely no downside and considerable upside to troubleshooting and remediating this Brand failure via the Console.

However, it is also important to be aware of the ways that various failures in the Brand registration process will be surfaced via the API tools, and what troubleshooting and remediation can be accomplished using these tools. This is detailed in Section Two below.

## 1. Troubleshooting and rectifying Email and/or Address validation errors via Console

> \[!NOTE]
>
> NOTE: Twilio now performs a data validation check on the **email** field and the **address** field in the above Profile submission. The validations and rejection reasons for email are as follows:
>
> | **Description**                                                                         | **Rejection reason**                        |
> | --------------------------------------------------------------------------------------- | ------------------------------------------- |
> | Email domain should have correct syntax                                                 | Email domain has an invalid address syntax. |
> | Email domain is unknown                                                                 | Unknown email domain.                       |
> | Temporary email which can be disposable                                                 | Email is a suspected disposable address.    |
> | If email check have passed all above validations and still is invalid from sendgrid API | Email is invalid.                           |
>
> The validations and rejection reasons for **address** are as follows:
>
> | If given address is not present                                        | Address not found with sid ADXXXXXXXXXXXXXXXXXXXXXXXX                                                                                                                                           |
> | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
> | If given address is not a valid US/CA address                          | The provided address is not a valid US or Canada address                                                                                                                                        |
> | If given address has invalid postal code                               | \[address\_sids] - Invalid Postal Code. Address suggestion -> Street: 1 Jersey St. Secondary Street: Boston, MA 02215-4147. Locality: Boston. Region: MA. Postal Code: 02215-4147. Country: US; |
> | If given address has invalid street name("street": "1 Jersey Str")     | \[address\_sids] - Invalid Street. Address suggestion -> Street: 1 Jersey St. Secondary Street: Boston, MA 02215-4147. Locality: Boston. Region: MA. Postal Code: 02215-4147. Country: US       |
> | If given address has invalid locality("locality": "Bostun")            | \[address\_sids] - Invalid Locality. Address suggestion -> Street: 1 Jersey St. Secondary Street: Boston, MA 02215-4147. Locality: Boston. Region: MA. Postal Code: 02215-4147. Country: US;    |
> | If given address has invalid region("region": "MAA")                   | \[address\_sids] - Invalid Region. Address suggestion -> Street: 1 Jersey St. Secondary Street: Boston, MA 02215-4147. Locality: Boston. Region: MA. Postal Code: 02215-4147. Country: US;      |
> | If given address has Invalid house number("street": "10000 Jersey St") | \[address\_sids] - Invalid House Number                                                                                                                                                         |

If either the email or address you've provided fails this validation check when creating a Sole Proprietor profile in the Console, you will be presented with an error message after you've submitted your Profile. As an example, the following screenshot shows validation errors for both email and address:

![Validation errors in business details and address on customer profile screen.](https://docs-resources.prod.twilio.com/afc929270c907ab6157c9736580528ccd4f0831150e015d66468d17869ba571e.png)

In this case, **email** has been flagged because "[blah@blah.com](mailto:blah@blah.com)" is not a valid email address. **Business address** has been flagged because "123 Blah Street" is not a real street address in New York City (we validate addresses against the USPS database, so all address details need to be real and accurate per the USPS).

Whatever the nature of the error, you will press the "Fix issues" link shown above. Because in this example there was an issue with email validation, to start you'd be taken back to the first **Business Details** screen, with the faulty **Business email** flagged:

![Business profile form with invalid email error highlighted.](https://docs-resources.prod.twilio.com/bc949ca45deda64e1bac0119cd5d414ec0575e01db33d541f6b117ea5eaa9310.png)

Once the faulty email has been replaced with a functional one (in this case "[messaging@twilio.com](mailto:messaging@twilio.com)"), and you click the "Save and continue" button, you'll be taken to the **Business Address** screen if, as in this case, some remediation of the address is necessary. The relevant validation issue or issues will be displayed at the top of the screen; here we see that the issue is "Invalid Street":

![Business address form with error message for invalid street address.](https://docs-resources.prod.twilio.com/dc777c2575c64db280dd1abd9bc27b088f051da520318a00dcf1e4778716b80b.png)

Once "123 Blah Street" has been replaced with a real street address in New York City (and one that conforms to the indicated zip code, in this case "200 W 40th St"), you would again press **Save and continue**; this will return you to the Business Profile review screen:

![Validation issues with business details in customer profile for John Twilion.](https://docs-resources.prod.twilio.com/42f3b533448ef7f54c2ad760db7e179935eeb73cc4d492b1f92276ec95beb8f0.png)

NOTE: although this new Profile details screen now shows the corrected email and street address, the red "validation issues" banner still appears at the top. This is due to a current limitation in this Console workflow: the email and address validations are only applied after the full profile (that is to say, this screen) has been submitted; since it hasn't been resubmitted yet, from the standpoint of the application this Profile is still in a REJECTED state and doesn't know to take down the error banner. However, as long as the rectified information looks correct here, go ahead and press the blue **Submit for review** button at the bottom right. The new information will be re-submitted and will once again undergo email and address validation. At this point, as long as you pass these validations, you will see a screen like the following:

![Profile submission under review with contact and business address details.](https://docs-resources.prod.twilio.com/0ba3afa8813763dd950d2ee3a90783709cea3e40d0d7da5fc79cac1074d3247c.png)

As the new banner at the top reminds you, the *full* review of this Profile can take up to 24 hours; it could still be rejected for other reasons. However, once you see this screen you can be reassured that you've rectified the email and/or address validation issues.

Note that any further issues with the review of your Profile will typically only surface if the Brand as a whole is rejected, which will only happen once the Brand has been submitted. If your Sole Proprietor Brand ends up REJECTED, and the reason relates to some aspect of the associated Profile, you will be directed to **Edit** the Profile to make any changes necessary.

## 2. Troubleshooting and rectifying Brand registration errors via Twilio API tools

Because our A2P API tools are often used by ISVs seeking to register large numbers of secondary customers' A2P Brands (and Campaigns) using batch/scripted processes, the temptation is to run through the entire sequence of API calls detailed in the [Sole Proprietor API](/docs/messaging/compliance/a2p-10dlc/onboarding-isv-api-sole-prop-new) guide---that is, Business Profile creation in Section 1, Trust Bundle creation in Section 2, Brand creation in Section 3 and Campaign creation in Section 4--in a single, uninterrupted succession of calls for a given client's Brand, before moving on to the next client. And it is programmatically possible to do this, and do it successfully, *provided there are no failures in individual steps along the way*.

What's important to understand, however, is that the validation and review of data in Brand submissions (and Campaign submissions, but we detail these in a [separate document](/docs/messaging/compliance/a2p-10dlc/troubleshooting-a2p-brands/troubleshooting-and-rectifying-a2p-campaigns-1)) takes place in different layers and at different time intervals. Some of them involve instantaneous review of data conformity, such that an API call with non-conforming input data will instantly return a failure. Others, such as the newly-added validations for Business Profile email and address, are also programmatic but asynchronous, involving a latency of up to 10 or 20 seconds depending on load. Still other validations of the Profile and Brand submission involve manual review, and can take up to 24 hours or longer in the case of the Profile, and multiple business days in the case of the overall Brand submission. Ultimately, however, no Campaign will be approved if its associated Brand has failed, for any reason, and no Brand will be accepted if its associated Profile has failed, for any reason. \
What is the best way to manage this situation, especially when you have large numbers of Brands to register? It is generally not practical to wait for a *manual* review of one piece to conclude before moving on to the next (for example, Business Profile > Brand > Campaign), and we do not advise that you do so. However, we do advise that, after submitting the complete Business Profile bundle in Step 1.8, you wait 30 seconds to see if any programmatic error surfaces before proceeding to the Trust Bundle creation in Step 2; that after the Trust Bundle is submitted in Step 2.6 you wait another 30 seconds before proceeding to Brand submission in Step 3; and that after Brand submission in Step 3 you wait 30 seconds before proceeding with Campaign creation in Step 4. Catching synchronous or near-synchronous upstream errors this way can dramatically reduce the amount of cleanup you have to do downstream, for examples deleting Campaigns whose Brands have failed, or deleting Brands (and Campaigns) whose Profiles have failed.

With all of that said, let's consider the kinds of failures that can occur at different stages of the API process through Brand creation (with Campaigns treated in a [separate document](/docs/messaging/compliance/a2p-10dlc/troubleshooting-a2p-brands/troubleshooting-and-rectifying-a2p-campaigns-1)).

### 2.1 Errors and other issues in Business Profiles

At present, the only errors in Business Profile submission (Step 1.8) that are surfaced synchronously or near-synchronously, and can be remediated by customers themselves, are the following:

* **non-compliant Starter Customer Profile**. In Step 1.7 you are asked to submit your assembled Profile bundle to a compliance check against a template for this type of Profile. If this returns a `status` parameter of `compliant`, your bundle has passed this basic template and is ready to be submitted for review in [Step 1.8](/docs/messaging/compliance/a2p-10dlc/onboarding-isv-api-sole-prop-new#18-submit-the-starter-customer-profile-for-review). If the Profile bundle is NOT compliant, the json return will indicate which fields have been found non-compliant or are missing. If you have skipped this check or ignored the results, the Profile bundle you submit in Step 1.8 may be non-compliant and if so, would immediately fail for this reason. The remediation in this case would be to submit this same bundle (identifiable by its profile bundle SID) for compliance assessment (Step 1.7) and note what is flagged in the json return
* **email and address validations**. In Step 1.2, you created the basic **Customer Profile resource** that will be associated with your Sole Proprietor Brand. In Step 1.4, you created the **Address resource** to associate with that Profile. Twilio will programmatically validate both of these (for example, the address must be valid per the USPS). However, these validations are not applied until after the full Profile bundle has been submitted for review in [Step 1.8;](/docs/messaging/compliance/a2p-10dlc/onboarding-isv-api-sole-prop-new#18-submit-the-starter-customer-profile-for-review) and at that point these validations are not synchronous but can have a latency of up to 20 seconds. There are two ways that you can be immediately informed if your submitted email and/or address has failed to pass validation (or three ways, including a failure\_reason message for the Brand itself, covered below, if you don't rectify the issue before submitting the Brand):

The first method of validation error notification is email notification: If your Profile fails one of these validations, an email stating this change of Profile status to FAILED will be sent to the contact email address of the ISV (not that of the secondary Brand you are creating here). However, this email will only indicate that the profile is FAILED, not the reason(s) for it.

The second method of validation error notification is status\_callback webhook: IF you have specified a `status_callback` **webhook** URL when you created your Profile in Step 1.2, a validation failure of this kind will trigger a message to that webhook, and this message WILL detail the `failure_reason` in terms that relate directly to the validation reasons detailed at the top of Section One above. Using a status\_callback webhook is the ONLY way, at present, that you can obtain this granular detail that would allow you to remediate an email or address validation issue. This remediation will involve UPDATE calls to the Customer Profile resource and/or Address resource you have created, and then a resubmission of the Customer Profile bundle as in Step 1.8.

Samples of these two resource update calls follow immediately below. After one or both of these are done, as necessary, the resubmission of the full Customer Profile is identical to the original submission call in [Step 1.8](/docs/messaging/compliance/a2p-10dlc/onboarding-isv-api-sole-prop-new#18-submit-the-starter-customer-profile-for-review).

> \[!NOTE]
>
> If you haven't set up the `status_callback` webhook but want to get the detailed `failure_reason` you may use our Console to check for errors.

### Update the Customer Profile Resource

Note that the `email` field is contained with the `attributes` object parameter, so while this email field is all we need to update in this case, we need to include all of the other extant fields and values in the attributes parameter as well:=

Update an end-user object with the type: starter\_customer\_profile\_information

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateEndUser() {
  const endUser = await client.trusthub.v1
    .endUsers("ITXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .update({
      attributes: {
        email: "starter-profile-enduser@example.com",
        first_name: "John",
        last_name: "Doe",
        phone_number: "+11234567890",
      },
      friendlyName: "Starter Profile End User",
    });

  console.log(endUser.sid);
}

updateEndUser();
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

end_user = client.trusthub.v1.end_users(
    "ITXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).update(
    attributes={
        "email": "starter-profile-enduser@example.com",
        "first_name": "John",
        "last_name": "Doe",
        "phone_number": "+11234567890",
    },
    friendly_name="Starter Profile End User",
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

        var endUser = await EndUserResource.UpdateAsync(
            attributes: new Dictionary<
                string,
                Object>() { { "email", "starter-profile-enduser@example.com" }, { "first_name", "John" }, { "last_name", "Doe" }, { "phone_number", "+11234567890" } },
            friendlyName: "Starter Profile End User",
            pathSid: "ITXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

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
        EndUser endUser = EndUser.updater("ITXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
                              .setAttributes(new HashMap<String, Object>() {
                                  {
                                      put("email", "starter-profile-enduser@example.com");
                                      put("first_name", "John");
                                      put("last_name", "Doe");
                                      put("phone_number", "+11234567890");
                                  }
                              })
                              .setFriendlyName("Starter Profile End User")
                              .update();

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

	params := &trusthub.UpdateEndUserParams{}
	params.SetAttributes(map[string]interface{}{
		"email":        "starter-profile-enduser@example.com",
		"first_name":   "John",
		"last_name":    "Doe",
		"phone_number": "+11234567890",
	})
	params.SetFriendlyName("Starter Profile End User")

	resp, err := client.TrusthubV1.UpdateEndUser("ITXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

$end_user = $twilio->trusthub->v1
    ->endUsers("ITXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->update([
        "attributes" => [
            "email" => "starter-profile-enduser@example.com",
            "first_name" => "John",
            "last_name" => "Doe",
            "phone_number" => "+11234567890",
        ],
        "friendlyName" => "Starter Profile End User",
    ]);

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
           .end_users('ITXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
           .update(
             attributes: {
               'email' => 'starter-profile-enduser@example.com',
               'first_name' => 'John',
               'last_name' => 'Doe',
               'phone_number' => '+11234567890'
             },
             friendly_name: 'Starter Profile End User'
           )

puts end_user.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:trusthub:v1:end-users:update \
   --sid ITXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --attributes "{\"email\":\"starter-profile-enduser@example.com\",\"first_name\":\"John\",\"last_name\":\"Doe\",\"phone_number\":\"+11234567890\"}" \
   --friendly-name "Starter Profile End User"
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
curl -X POST "https://trusthub.twilio.com/v1/EndUsers/ITXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
--data-urlencode "Attributes=$ATTRIBUTES_OBJ" \
--data-urlencode "FriendlyName=Starter Profile End User" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "date_updated": "2021-02-16T20:40:57Z",
  "sid": "ITXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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
  "type": "authorized_representative_1"
}
```

### Update the Address Resource

The full list of required and optional input parameters for the **Address resource** CREATE call are listed in Section [1.4](/docs/messaging/compliance/a2p-10dlc/onboarding-isv-api-sole-prop-new#14-create-a-supporting-document-customer_profile_address) of the Sole Proprietor API guide. You will almost certainly not need to update all of these fields, but only those that caused the address validation error. In the example below, we are updating only the customer's `street` (street address), assuming that this is what failed address validation as in our Console example above. Our new street address value in this case will be "2 Hasselhoff Lane". As we have not specified any other fields in our call, the remainder of the fields in the original Address resource will remain unchanged. Note, however, that we must also supply the `Account SID` as well as the `sid` (understood here as the AddressSID) so as to properly identify the Address resource to update:

Update an Address resource to correct a data validation error

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function updateAddress() {
  const address = await client
    .addresses("AD2a0747eba6abf96b7e3c3ff0b4530f6e")
    .update({ street: "2 Hasselhoff Lane" });

  console.log(address.accountSid);
}

updateAddress();
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

address = client.addresses("AD2a0747eba6abf96b7e3c3ff0b4530f6e").update(
    street="2 Hasselhoff Lane"
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

        var address = await AddressResource.UpdateAsync(
            street: "2 Hasselhoff Lane", pathSid: "AD2a0747eba6abf96b7e3c3ff0b4530f6e");

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
        Address address = Address.updater("AD2a0747eba6abf96b7e3c3ff0b4530f6e").setStreet("2 Hasselhoff Lane").update();

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

	params := &api.UpdateAddressParams{}
	params.SetStreet("2 Hasselhoff Lane")

	resp, err := client.Api.UpdateAddress("AD2a0747eba6abf96b7e3c3ff0b4530f6e",
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

$address = $twilio
    ->addresses("AD2a0747eba6abf96b7e3c3ff0b4530f6e")
    ->update(["street" => "2 Hasselhoff Lane"]);

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
          .addresses('AD2a0747eba6abf96b7e3c3ff0b4530f6e')
          .update(street: '2 Hasselhoff Lane')

puts address.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:addresses:update \
   --sid AD2a0747eba6abf96b7e3c3ff0b4530f6e \
   --street "2 Hasselhoff Lane"
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Addresses/AD2a0747eba6abf96b7e3c3ff0b4530f6e.json" \
--data-urlencode "Street=2 Hasselhoff Lane" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "city": "SF",
  "customer_name": "name",
  "date_created": "Tue, 18 Aug 2015 17:07:30 +0000",
  "date_updated": "Tue, 18 Aug 2015 17:07:30 +0000",
  "emergency_enabled": false,
  "friendly_name": "Main Office",
  "iso_country": "US",
  "postal_code": "94019",
  "region": "CA",
  "sid": "AD2a0747eba6abf96b7e3c3ff0b4530f6e",
  "street": "2 Hasselhoff Lane",
  "street_secondary": null,
  "validated": false,
  "verified": false,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Addresses/ADaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

Remember that following your updates to the profile email and/or address resources, you will need to call the Profile bundle submit again, exactly as you did in Step 1.8 of the API doc. This is all the remediation required for such validation errors IF you've caught them before submitting your A2P Trust bundle (Step 2) or the Brand itself (Step 3). More below, if you've caught the validation error(s) further downstream.

### 2.2 Issues with Sole Proprietor A2P Trust Bundle

At present, there are no separate issues with the Trust Bundle (created in Section 2 of the Sole Prop API guide) that would be surfaced to the user. However, IF you have already completed the steps in Section 2 to create and submit a Trust Bundle to associate with your Profile, and only then become aware of a defect in the Profile (such as a validation failure, or a rejection of any other kind), the Trust Bundle will itself need to be resubmitted for review. Fortunately this resubmission call will look exactly like the original Trust Bundle submission call in [Step 2.6](/docs/messaging/compliance/a2p-10dlc/onboarding-isv-api-sole-prop-new#26-submit-the-sole-proprietor-a2p-trust-bundle-for-review) of the Sole Prop API guide. As with the original call, what you are actually doing here is updating the `status` field of this Trust Bundle (created previously in Section 2) from `"draft"` to `"pending-review"`.

### 2.3 Issues with the A2P Brand submission

In [Section 3](/docs/messaging/compliance/a2p-10dlc/onboarding-isv-api-sole-prop-new#3-create-a-new-sole-proprietor-a2p-brand) of the Sole Proprietor API guide, you perform the actual A2P Brand submission call. This call's immediate return will most likely show a `status` of `'PENDING'`. However, if you make a `GET` call to the same endpoint (as shown in [Step 3.1](/docs/messaging/compliance/a2p-10dlc/onboarding-isv-api-sole-prop-new#31-get-the-sole-proprietor-brand-registration-status)) within a minute or two of the submission, you will be able to determine if this status has changed to `"FAILED"`. Aside from this `GET` call on the Brand Registrations endpoint, you can also learn of a change in Brand status by setting up and subscribing to Brand status **Event Streams**, as also described in Step 3.1. Event Streams are a formalized way of creating (in this case) a webhook to which a status update message would be sent, roughly similar to the status\_callback webhook you (hopefully) set up for the Profile itself. As with the generic webhook, the advantage of an Event Streams subscription is that it creates a "push" notification of status change, rather than you having to repeatedly poll the Brand endpoint itself with `GET` calls.

Either way, however, IF your Brand's status has been updated to "FAILED", you will be furnished with a list of errors in the json return (or the Event Streams payload). These error code items will be discrete and standardized to an entry in the Twilio Error Code Dictionary that offer discrete solutions to remediate the issue:

**Data Validation - Error Code 30701**

**Error Message text:**

"Brand Registration Failure: Invalid input parameters." Exact parameters of issues will be provided in the Description, for example "Invalid email address, please check the input field value and retry."

**What this means:** at present, this error means that your Profile failed the email and/or address validations--see Section 2.1 above--but you did not catch this before moving on to Trust Bundle creation and Brand submission. With that more granular information you will be able to follow the remediation steps detailed in Section 2.1 above. With the Profile itself rectified, you will then need to resubmit the Trust Bundle (see Section 2.2 above), and finally, you will need to edit the Brand itself.

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

**Incorrect Profile SID provided - Error Code 30793**

**Error message text:** "Brand Registration Failure: Validation problems with connected bundles."

**Error description text:** "Validation failures with connected a2p or customer profile bundle."

**What this means:** A Brand creation call associates a Profile SID (typically one you've just created) with a Trust Bundle SID (which you've also typically just created). This error text states that we cannot find the specified Profile based on the input SID. This might mean that you've copy/pasted the SID incorrectly from Step 1.8, when it was created. Sometimes the Profile and Trust Bundle SIDs are transposed in the Brand creation call.

**Remediation:** Make sure the Profile SID you are entering is accurate (i.e. is the one returned from Step 1.8), hasn't been transposed with the Trust Bundle SID, etc. You will then need to **delete the failed Brand** and **submit again** with the rectified SID.

NOTE that at this time, Brand deletion can only be done via the Twilio Console. Go to **Messaging > Regulatory Compliance > Brands** and find the Brand you wish to delete. Clicking on the name of this Brand will bring up a Brand details screen, which will likely have some details of the failure\_reason and will definitely have a red Delete button on the far right, as shown below:

![Tasty Sandwiches Incorporated brand details showing registration status as failed with delete option.](https://docs-resources.prod.twilio.com/0d0d0145830f469b731153e3c55cc5563c95a2ce7d1cf670ada989dbf95155ea.png)

After the Brand has been deleted, you can repeat the identical Brand CREATE call shown in Section 3 of the Sole Prop API guide to recreate it (using the same Profile and Trust Bundle SIDs as before).

**Incorrect Trust Bundle SID provided - Error Code 30793**

**Error message text:** "Unable to fetch A2P Bundle Details, please check if the correct bundle sid was provided for registration."

**What this means:** Very much like the previous error, except in this case the Trust Bundle SID isn't accurate. Note that in the case of transposing the Profile and Trust Bundle SIDS, **both** of these errors are likely to be present as neither SID will be accurate.

**Remediation:** As with the previous error, make sure the Trust Bundle SID is accurate, i.e. is the one returned (as `sid`) from Step 2.6 of the Sole Prop API guide. Delete the failed Brand via Console and submit again with the rectified SID.

**Can't register Brand with TCR - Error Code 30791**

**Error Message text:** "Brand Registration Failure: Temporary system error"

**What this means:** This is a generic error message indicating that The Campaign Registry, the 3rd-party entity that handles all A2P registrations, cannot process you Brand submission. Please try again before reaching out to Support, and verify that the supplied information is accurate and well-formed before contacting Support.
