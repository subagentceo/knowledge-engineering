# Verify WhatsApp Overview

## What is Verify WhatsApp?

Verify WhatsApp helps your business verify users by delivering One-Time Passcodes (OTPs) via WhatsApp messages with your brand, adding to Verify's existing channels for OTP delivery. WhatsApp has more than 2 billion users and works over a Wi-Fi connection. Adding it as an OTP channel can boost your conversion rate and reduce costs. WhatsApp doesn't charge for undelivered messages and isn't exposed to telecom-network fraud, such as toll fraud.

## No-code WhatsApp to SMS Optimal Channel Selection

[Contact Sales](https://www.twilio.com/en-us/v2-help/sales?adobe_mc_sdid=SDID%3D1A2A345C4BE1D689-3A30DD77BC1D7A6D%7CMCORGID%3D32523BB96217F7B60A495CB6%40AdobeOrg%7CTS%3D1682361446\&adobe_mc_ref=https%3A%2F%2Fwww.twilio.com%2Fdocs%2Fverify%2Fautomatic-channel-selection)

If you're already using Verify SMS for OTP delivery, we can configure your account to first attempt delivery via WhatsApp for specific countries. If WhatsApp delivery fails, Verify will automatically send an SMS. You don't need to change your UI as long as it refers to SMS and WhatsApp collectively as generic messages. This **Verify WhatsApp to SMS Optimal Channel Selection** feature is currently in a Pilot phase with limited availability. Contact sales to request access.

## Send a code

1. Create a new [Verify Service](/docs/verify/api/service) or use an existing one.
2. Start a verification with WhatsApp, by specifying `Channel=whatsapp` (instead of `Channel=sms`). See code sample.
3. Check the verification as you would for any other channel.

Start a Verification with WhatsApp

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createVerification() {
  const verification = await client.verify.v2
    .services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .verifications.create({
      channel: "whatsapp",
      to: "+15017122661",
    });

  console.log(verification.accountSid);
}

createVerification();
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

verification = client.verify.v2.services(
    "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).verifications.create(to="+15017122661", channel="whatsapp")

print(verification.account_sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Verify.V2.Service;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var verification = await VerificationResource.CreateAsync(
            to: "+15017122661",
            channel: "whatsapp",
            pathServiceSid: "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(verification.AccountSid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.verify.v2.service.Verification;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Verification verification =
            Verification.creator("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "+15017122661", "whatsapp").create();

        System.out.println(verification.getAccountSid());
    }
}
```

```go
// Download the helper library from https://www.twilio.com/docs/go/install
package main

import (
	"fmt"
	"github.com/twilio/twilio-go"
	verify "github.com/twilio/twilio-go/rest/verify/v2"
	"os"
)

func main() {
	// Find your Account SID and Auth Token at twilio.com/console
	// and set the environment variables. See http://twil.io/secure
	// Make sure TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN exists in your environment
	client := twilio.NewRestClient()

	params := &verify.CreateVerificationParams{}
	params.SetTo("+15017122661")
	params.SetChannel("whatsapp")

	resp, err := client.VerifyV2.CreateVerification("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$verification = $twilio->verify->v2
    ->services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->verifications->create(
        "+15017122661", // To
        "whatsapp" // Channel
    );

print $verification->accountSid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

verification = @client
               .verify
               .v2
               .services('VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
               .verifications
               .create(
                 to: '+15017122661',
                 channel: 'whatsapp'
               )

puts verification.account_sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:verify:v2:services:verifications:create \
   --service-sid VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --to +15017122661 \
   --channel whatsapp
```

```bash
curl -X POST "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications" \
--data-urlencode "To=+15017122661" \
--data-urlencode "Channel=whatsapp" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "VEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "service_sid": "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "to": "+15017122661",
  "channel": "whatsapp",
  "status": "pending",
  "valid": false,
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z",
  "lookup": {},
  "amount": null,
  "payee": null,
  "send_code_attempts": [
    {
      "time": "2015-07-30T20:00:00Z",
      "channel": "whatsapp",
      "attempt_sid": "VLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ],
  "sna": null,
  "url": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications/VEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

## Authy app demo

Watch the following video to learn how we added WhatsApp as another verification option in our [Twilio Authy Android mobile app](https://play.google.com/store/apps/details?id=com.authy.authy\&hl=en_US\&gl=US).

https://www.youtube.com/watch?v=jqB3\_Ae-mZ8\&ab\_channel=TwilioDevs

## Differences compared to Verify SMS

Verify WhatsApp works like Verify SMS, except for the following channel-specific differences:

* [Bring your own WhatsApp Sender](/docs/verify/whatsapp/byo) (a WhatsApp phone number associated with a [WhatsApp Business Account](https://developers.facebook.com/docs/whatsapp/overview/business-accounts/)).
* WhatsApp is not available to use for Verify in China. For a comprehensive list, see [WhatsApp Availability by Country](https://help.twilio.com/articles/360051177134).
* No blocking (for example, block from sending a message to X country code).
* No routing (for example, WhatsApp is the only "carrier").
* No support for PSD2, pre-approved, or custom templates.

## FAQs

### Why is WhatsApp a good channel for OTP delivery?

Over the last few years, WhatsApp has emerged as a major messaging channel. With over 2 billion users across 180 countries, it's fast achieving ubiquity. Every WhatsApp user is identified by a unique phone number that they provided when creating their WhatsApp account. This means that WhatsApp can directly replace SMS for all verification use cases, including sign-up, login, and transaction.

### What did you learn from adding WhatsApp to your Authy app?

When we added WhatsApp as another channel to send OTPs in our Authy app's [sign-up/login flow](https://drive.google.com/file/d/1u0vF_-AqqrP14H9kLoXlpRwrPqlydBng/view?usp=sharing), we saw strong user adoption. We were sending about 2,000 WhatsApp messages per day globally. Adoption was particularly strong in heavy WhatsApp countries like Brazil, India, Indonesia, and Germany. In these countries, 20-40% of users picked the WhatsApp option. Adding WhatsApp also resulted in a higher overall conversion rate. It works on Wi-Fi when there is no cell connection to receive SMS. WhatsApp also doesn't charge for messages that aren't delivered. Lastly, WhatsApp is a modern, IP-based network that isn't exposed to fraud that exploits the telecom network, such as toll fraud, also known as traffic pumping. We saw this firsthand with Authy: SMS conversion rates dropped sharply in one country for a week because of toll fraud. However, WhatsApp conversion rates remained stable.

### How does Verify WhatsApp work?

To use Verify WhatsApp, you need to first provide us with [your WhatsApp Sender](/docs/verify/whatsapp/byo). Once this configuration step is done, it's only a one-word change to the API request if you're familiar with the Verify API for sending SMS OTPs. Switch the `Channel` parameter from `sms` to `whatsapp`. The generated OTP code is the same, so a user can use the code they receive from either WhatsApp or SMS if they requested both.

### Can I use my own brand and phone number to send the WhatsApp OTP message, instead of Verify WhatsApp's "generic sender"?

Effective March 1, 2024, you must bring your own brand and phone number (Sender) to send WhatsApp OTP messages. Customers previously using Verify WhatsApp's "generic sender" need to [bring their own WhatsApp Sender](/docs/verify/whatsapp/byo) to comply with Meta's [WhatsApp business messaging policy](https://business.whatsapp.com/policy).

### Which Twilio product should I use: Verify WhatsApp API or the Programmable Messaging API for WhatsApp?

If your use case is OTP delivery, then we strongly recommend Verify. It can intelligently orchestrate OTP delivery between WhatsApp, SMS, RCS and other channels to maximize conversion and reduce cost. In a single phone number verification session, the same OTP code that's generated by Verify is sent across all channels, simplifying code validation.

Additionally, we auto-create [authentication message templates](https://developers.facebook.com/docs/whatsapp/business-management-api/authentication-templates/) in multiple languages that you can use with your own brand. These templates provide end users with a copy code button to enhance their experience. [Contact sales](https://www.twilio.com/en-us/help/sales) to discuss how these benefits apply to you.

### What are some best practices for implementing WhatsApp OTP?

Based on our experience with our Authy app, we found that the following best practices improved the likelihood that a user completes the verification after choosing to receive an OTP message via WhatsApp (aka Conversion Rate):

* If the user is using your mobile app, you can check that the user also has WhatsApp installed on the same device before displaying the "send message via WhatsApp" option. For more information, see the [What we learned from adding WhatsApp verification to the Authy App blog post](https://www.twilio.com/en-us/blog/authy-2fa-whatsapp-verification-experiment#Detecting-if-the-user-has-WhatsApp-installed).

  Checking if WhatsApp is installed avoids scenarios where you might have set up a WhatsApp phone number at some point but can't immediately receive messages on the device. However, you might have WhatsApp installed on a different device, so this check might exclude some users unnecessarily. In our experience, this affects a small percentage of users.
* Have the user confirm that they entered their phone number correctly, to avoid sending the OTP message to the wrong person.
* We've observed that "stock Android" phones are able to retrieve OTP codes directly from English-language WhatsApp messages and push it to your user while they are still in your app. Take advantage of this by making it easy to copy/paste the code into your UI.

### What are the benefits of using Verify WhatsApp with this new model change?

Verify orchestrates OTP delivery across WhatsApp, SMS, RCS, and other channels to maximize conversion and reduce cost. Verify also saves you setup time by auto-creating templates for you in multiple languages using the new [Copy Code authentication templates](/docs/verify/verification-templates#whatsapp-authentication-templates).

### How many Verify WhatsApp requests can I send using my own WhatsApp Sender?

Customers using Verify WhatsApp with their own Sender are subject to Meta's [Messaging limits](https://developers.facebook.com/docs/whatsapp/messaging-limits/).

### Should I use the same WhatsApp Sender for OTP messages as well as other marketing messages?

Use a single sender for OTP messages to provide a consistent user experience and maximize your sender messaging limits. However, if your business uses a single sender for marketing purposes, you need to take into account that users may block a marketing message. This could result in them not receiving OTP messages sent by you.

### Does Verify support [WhatsApp usernames (BSUIDs)](https://developers.facebook.com/documentation/business-messaging/whatsapp/business-scoped-user-ids#business-scoped-user-id)?

No. Meta requires a phone number when using the WhatsApp copy-code authentication templates that Verify relies on.
