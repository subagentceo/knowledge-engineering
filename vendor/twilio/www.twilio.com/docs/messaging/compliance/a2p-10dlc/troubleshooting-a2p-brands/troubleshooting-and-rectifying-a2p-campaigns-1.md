# Troubleshooting and rectifying Campaigns

A2P Brand & Campaign registration via the API consists of the following steps:

1. **Create a Customer Profile** (this will either be a Starter Profile for Sole Proprietor Brands, or a Standard Profile for Standard or LVS Brands)
2. **Create an A2P Trust Bundle**
3. **Create an A2P Brand**
4. **Create an A2P Campaign** around a single use case (each Sole Proprietor Brand can only have one Campaign, but Standard Brands can have multiple Campaigns)
5. **Add a Phone Number to the Campaign** (each Sole Proprietor Campaign can only use one Phone Number to send messages, but a Standard/LVS Campaign can have many)

The present guide addresses troubleshooting of failures that can happen at Step 4, Campaign creation/submission. The process can also fail at prior steps 1 or 3. Troubleshooting these for Sole Proprietor Brands is covered in [this guide](/docs/messaging/compliance/a2p-10dlc/troubleshooting-a2p-brands/troubleshooting-sole-proprietor-brand-registration-failures); troubleshooting these for Standard or LVS Brands is covered in [this guide](/docs/messaging/compliance/a2p-10dlc/troubleshooting-a2p-brands/troubleshooting-and-rectifying-a2p-standardlvs-brands). Finally, Phone Numbers added to successfully-created Campaigns (Step 5) can themselves fail to be successfully registered, or their successful registration can take longer than expected. Troubleshooting these phone number issues is addressed in [this guide](/docs/messaging/compliance/a2p-10dlc/troubleshooting-a2p-brands/troubleshooting-a2p-phone-number-registration-issues).

## Troubleshooting Campaigns via Console

Since Campaigns can be rejected by TCR for a wide variety of reasons, if you are an ISV registering multiple secondary customer Campaigns, you may find these approved at different times, or you may find that some are approved and others are rejected (FAILED). For this reason, both ISVs and direct customers sometimes find it easier to track the status of Campaigns via the Console, whether they were originally submitted via Console or via API. Going to **Messaging > Regulatory** **Compliance > Campaigns** will show a list of all your Campaign submissions, with a status indicated for each. If you click on the name or Campaign SID of a FAILED Campaign, you will see a Campaign Details page with something like the following:

![Campaign rejected due to invalid description; next steps include registering a new A2P campaign.](https://docs-resources.prod.twilio.com/f269409f43a5f1fa82352491ac994763b22b317f92d5f097a46e28f2e61fd04d.png)

In this case, if you look at the **Campaign Information** panel (you may need to zoom in on this screenshot), you'll see that two separate failure reasons are indicated. One is that the Campaign **description** was found too be invalid, probably because it was not detailed enough. The second failure reason concerns the content of the first Sample message. This would be a reasonable opt-out message, but it is not an appropriate sample message for a Campaign whose basic use case is Marketing.

## Editing a Campaign in the Console

If you click on the blue **Edit Campaign** link, to the left of the red **Delete Campaign** link above, you will be taken to the following modal:

![Edit A2P Campaign Details modal with failed review notice and sample messages.](https://docs-resources.prod.twilio.com/2638fc49773aab3ac82e5562aadde2baeadb7a26401bfad2f56aae6c59ed43bb.png)

As we see, the modal begins with a banner confirming that this Campaign was failed upon review, and inviting you to fix whatever issues were flagged in the previous screen. Below this you will see text entry boxes corresponding to most of the text-entry fields in the original Campaign submission flow: **Campaign description**, **Sample messages** (you'll see that there are boxes for up to five different sample messages, but only the first two are required), then **Message contents** checkboxes to indicate whether any of your messages will contain embedded links, phone numbers, content related to direct lending or other loan arrangements, or any age-gated content; and finally a box for a description of the **opt-in process** (how end users give their consent to receiving text messages). All of these will be pre-populated with the information entered in the original Campaign submission. In our example, we have two things to fix here: first, the Campaign Description needs to be more detailed; second, the two sample messages need to be rewritten so they actually reflect the designated purpose of the Campaign: sending marketing messages about sales and offers (as opposed to indicating a successful opt-out, which is an entirely different use case).

After you have made the necessary changes to address your own `failure_reason`, click **Update** to resubmit your Campaign for approval. This initiates a new Campaign vetting process, which involves the same time and effort from our A2P ecosystem partners as the original Campaign submission. A vetting fee will be assessed on resubmissions for Campaigns that failed review by the third-party vetting partner.

## Deleting and Recreating a failed Campaign via Console

Clicking the "Delete Campaign" link will launch a confirmation modal; this Delete Campaign link is active for APPROVED Campaigns as well as FAILED ones, and you definitely do not want to delete an approved Campaign unless you have very good reason to do so. Also NOTE: since you will want to use either most or all of the original Campaign details in the new submission, it might be a good idea to duplicate the tab with the original Campaign details screen, so that you can refer back to these Campaign details when you recreate the Campaign.

Once the FAILED Campaign has been deleted, you can then go back to the Brand for which you submitted this Campaign (you can find this via **Messaging > Regulatory Compliance > Brands** in the left navigation, which will allow you to click on the appropriate Brand and launch the Brand details page). If you just need to resubmit the Campaign with a new use case indicated, use the blue **Register New Campaign button** in the Brand details screen, which will launch a new Campaign creation workflow and allow you to enter whatever original and new Campaign information is appropriate.

On the other hand, if the Campaign's failure reason lies with the Brand information itself (which ultimately always means some aspect of the Brand's underlying business profile or trust bundle), you will need to refer to Section 2 above for how to remediate Brand issues. But the Campaign deletion still needs to happen first; a Brand cannot be edited if it has a Campaign associated with it. Once the Brand has been resubmitted, then on the Brand details screen you can use the **Register New Campaign** button to launch the new Campaign creation workflow. In this case it's likely that all of the original Campaign detail information can be used as-is.

> \[!NOTE]
>
> If you present a business website URL in any part of your Campaign submission (such as sample messages) that uses a shortened URL, be aware that only certain forms of shortened URL are acceptable to The Campaign Registry. Specifically, you must use a **dedicated, branded** short domain that belongs to your business. You cannot use the sort of randomly-shortened URL typically furnished by a free service like bit.ly or TinyUrl; this will lead to rejection of the Campaign by TCR. For more information [see this support article on using shortened URLs in Campaign submissions](https://help.twilio.com/hc/en-us/articles/1260804572090-How-can-I-send-shortened-links-in-my-messages-).

## Troubleshooting Campaigns via API

In Step 5 of the [guide to registering Standard/Low-Volume Standard Brands via API](/docs/messaging/compliance/a2p-10dlc/onboarding-isv-api#5-create-an-a2p-campaign) as well as the [guide to registering Sole Proprietor Brands](/docs/messaging/compliance/a2p-10dlc/onboarding-isv-api-sole-prop-new#5-create-a-new-sole-proprietor-a2p-sms-campaign), you created a new messaging Campaign to go with your new A2P Brand. In the Sole Proprietor guide, Step [5.1](/docs/messaging/compliance/a2p-10dlc/onboarding-isv-api-sole-prop-new#51-get-the-status-of-an-a2p-messaging-campaign) directs you to do a `fetch` call on the newly-created Campaign to check its **status**.

It's important to remember that, like new A2P Brand registration, new Campaign verification is never an instantaneous process. Sole-Proprietor Campaigns tend to be approved (or rejected) most quickly, while Standard Campaigns must go through several distinct layers of vetting and this process can take up to several weeks. If your `fetch` call to the new Campaign returns a `campaign_status` of `IN_PROGRESS`, this vetting process is not yet complete. Once the process is complete, your fetch call will return a `campaign_status` of either `VERIFIED` or `FAILED` (or in some rare cases SUSPENDED. On Suspended Campaigns, see section 3.2.1 below)

A code sample for this` fetch` call follows. This call requires two parameters: the `messaging_service_sid` (i.e., the SID of the Messaging Service you're using in this Campaign), and a hardcoded **compliance type** of `QE2c6890da8086d771620e9b13fadeba0b` (see code sample for how these are used in your code library of choice).

GET A2P Messaging Campaign Status

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
    .usAppToPerson("QEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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
    .us_app_to_person("QEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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
            pathSid: "QEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

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
            UsAppToPerson.fetcher("MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "QEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa").fetch();

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
		"QEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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
    ->usAppToPerson("QEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
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
                   .us_app_to_person('QEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                   .fetch

puts us_app_to_person.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:messaging:v1:services:compliance:usa2p:fetch \
   --messaging-service-sid MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --sid QEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
```

```bash
curl -X GET "https://messaging.twilio.com/v1/Services/MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Compliance/Usa2p/QEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

If you do receive a campaign\_status of FAILED, the `errors[]` object in the call's json return will not be empty (as it will for Campaigns in a non-failed state, and as shown in the code sample return) but will instead be populated with information. The format of the populated `errors[]` object is illustrated below:

```json
"errors": [
    {
      "error_code": 30897,
      "fields": [ "MESSAGE_FLOW" ],
      "url": "https://www.twilio.com/docs/api/errors/30897",
      "description": "The campaign submission has been reviewed and it was rejected due to Disallowed Content."
    }
  ]
```

For a FAILED Campaign, there will always be at least one such error listed, but there could be multiple errors, each detailed in the same format. Each error will have a distinct `error_code`, which you will find enumerated in [this support article](https://help.twilio.com/hc/en-us/articles/15778026827291-Why-Was-My-A2P-10DLC-Campaign-Registration-Rejected-). The `description` field in this error format corresponds roughly to the **Rejection Category** associated with that error code in the support article, and the `url` of the error will lead to a more detailed explanation of that failure reason and the steps to remedy it, if any. Below is an example of an error\[] return showing multiple errors:

```json
"errors": [
    {
      "url": "https://www.twilio.com/docs/api/errors/30886",
      "fields": [
        "USE_CASE_DESCRIPTION"
      ],
      "error_code": 30886,
      "description": "The campaign submission has been reviewed and it was rejected because of invalid campaign description."
    },
    {
      "url": "https://www.twilio.com/docs/api/errors/30892",
      "fields": [
        "SAMPLE_MESSAGE_1"
      ],
      "error_code": 30892,
      "description": "The campaign submission has been reviewed and it was rejected because of URL shortener in the sample message."
    },
    {
      "url": "https://www.twilio.com/docs/api/errors/30893",
      "fields": [
        "SAMPLE_MESSAGE_2"
      ],
      "error_code": 30893,
      "description": "The campaign submission has been reviewed and it was rejected because of invalid sample message content."
    }
]
```

It's important to note that there are two categories of errors laid out in the linked support article, and **only the first type of error can be remedied.** For example, error code `30893` maps to a **Rejection Category** of "Invalid Sample Message Use Case" with the following **Rejection Reason**: "Sample messages are either not provided, unclear, or content does not match the campaign use case." This is one of 12 rejection reasons that can be remedied, i.e. the information supplied in the original Campaign submission can be corrected, as follows:

*Verify that sample messages are accurate and detailed. Sample messages should reflect actual messages to be sent under campaign and indicate templated fields with brackets. At least one of the sample messages needs to include your business name. Use case and campaign description need to match campaign description.*

In the case of an error like 30893, then, such a Campaign could be **deleted and recreated**. Learn how to delete and create a Campaign in the [UsAppToPerson Resource API Reference doc](/docs/messaging/api/usapptoperson-resource).

First, however, we need to consider some examples of the second category of Campaign failure error, which *cannot* be remedied (through either an edit or a delete/recreate) by improving the submission detail:

| **Error Code**                  | **Rejection Category**              | **Rejection reason**                                                                                |
| ------------------------------- | ----------------------------------- | --------------------------------------------------------------------------------------------------- |
| [30883](/docs/api/errors/30883) | Content Violation - SHAFT - Sex     | Submission included content such as nudity, pornography, sex toys, or other adult content           |
| [30883](/docs/api/errors/30883) | Content Violation - SHAFT - Hate    | Submission included speech that is hateful, profanity, violent, incites violence, or similar speech |
| [30883](/docs/api/errors/30883) | Content Violation - SHAFT - Alcohol | Submission includes content referring to alcohol                                                    |

The `30883` error code represents a **Content Violation**, which means that your proposed Campaign has been deemed to deal with content that is prohibited under the terms of A2P Campaign registration, such as sexual references, hate speech, or references to alcohol, firearms, tobacco products or marijuana. As shown here, the Rejection Category and Reason will specify the content reference that is deemed to be in violation. In addition to Content Violations, your Campaign use case could be disallowed because it is deemed to represent a high risk for a spam/phishing attack (`30884`), other potentially fraudulent activity (`30885`), violation of Twilio's general Terms & Conditions (`30882`), or several other reasons enumerated in the Support article, including the use of the same EIN for too many Brand registrations (By default, a single EIN/Tax ID can only be used in a maximum of 50 different Brands; any brands beyond this limit using the same EIN are invalid, and therefore their associated Campaign(s) will be rejected even if the Campaign submission itself is entirely valid otherwise).

As the support article notes, customers who disagree with a Campaign rejection for such a non-resubmittable reason may submit an appeal to the [Twilio support desk](https://www.twilio.com/help/contact); but outside of this route, there is no remedy for this kind of Campaign rejection except to materially change the nature or content of the proposed Campaign, or in some cases the associated Brand.

## **Individual Campaign Suspensions**

It is possible for a Campaign to be suspended on its own, but it's also possible for a Campaign to be suspended because the Brand it's associated with is suspended. You can check the Brand status to understand which case it is. If it's a Brand suspension situation, go to [Brands with SUSPENDED status, and related Campaign suspensions](/docs/messaging/compliance/a2p-10dlc/troubleshooting-a2p-brands/troubleshooting-and-rectifying-a2p-standardlvs-brands#brands-with-suspended-status-and-related-campaign-suspensions) to check out what it means for you. If your Brand is still in an Approved state but your Campaign is suspended, keep reading.

If you have a suspended campaign, it means the campaign may have violated one or more of the following rules, causing Carriers / ecosystem partners to suspend it:

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

The Twilio team should be reaching out to you to provide guidance on how to fix the suspended campaign. Check your email or the [Twilio Support Center](https://console.twilio.com/us1/support/tickets?frameUrl=%2Fconsole%2Fsupport%2Ftickets%3Fx-target-region%3Dus1). If you don't see anything, raise a ticket.

While your campaign is suspended, you will experience the following restrictions:

1. It is VERY important that you do not attempt to send similar messages via another existing or new Campaign. This could result in a serious violation and may result in termination / suspension of your account with Twilio.
2. Suspended Campaigns face the following restrictions
   1. Suspended campaigns cannot be used to send messages. You will receive an error code 30033 if you try to do this
   2. Suspended campaigns cannot be deleted via self-service and you may not add / remove the numbers. You will receive an error code 21729 if you try to do this.
3. Before you resolve the suspensions, you're responsible for the monthly registration fees associated with suspended campaigns as well as the monthly fees associated with the numbers that are in the campaigns.
4. It is also possible that you won't be able to resolve the suspensions if the ecosystem has determined your use case is not fit for A2P 10DLC. If this is the case, after 30 days of being suspended, Twilio will automatically delete your suspended campaigns and release all the associated phone numbers.
