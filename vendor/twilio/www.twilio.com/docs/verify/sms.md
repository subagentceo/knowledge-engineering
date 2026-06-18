# Verify SMS overview

SMS is the most popular channel for phone number verification and two-factor authentication (2FA) because most people can receive text messages and onboarding is seamless.

SMS 2FA is effective. Studies show it blocks the majority of automated attacks, bulk phishing attempts, and targeted attacks.

Learn how to send one-time passcodes (OTPs) via SMS with Twilio Verify SMS. Before you send your first OTP, obtain and document recipient consent following the Twilio Messaging Policy. To learn more and stay compliant, see the [Consent and Opt-in Policy](/docs/verify/consent-opt-in).

The following example shows how to start a verification with SMS:

Start a Verification with SMS

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
      channel: "sms",
      to: "+15017122661",
    });

  console.log(verification.sid);
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
).verifications.create(to="+15017122661", channel="sms")

print(verification.sid)
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
            channel: "sms",
            pathServiceSid: "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(verification.Sid);
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
            Verification.creator("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "+15017122661", "sms").create();

        System.out.println(verification.getSid());
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
	params.SetChannel("sms")

	resp, err := client.VerifyV2.CreateVerification("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$verification = $twilio->verify->v2
    ->services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->verifications->create(
        "+15017122661", // To
        "sms" // Channel
    );

print $verification->sid;
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
                 channel: 'sms'
               )

puts verification.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:verify:v2:services:verifications:create \
   --service-sid VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --to +15017122661 \
   --channel sms
```

```bash
curl -X POST "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications" \
--data-urlencode "To=+15017122661" \
--data-urlencode "Channel=sms" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "VEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "service_sid": "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "to": "+15017122661",
  "channel": "sms",
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
      "channel": "SMS",
      "attempt_sid": "VLaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
    }
  ],
  "sna": null,
  "url": "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications/VEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

After you start a verification with SMS, use the [Verification Check API](/docs/verify/api/verification-check) to confirm the code the user provides.

## Start building

The following resources will help you get started with SMS verification:

* [Quickstart](/docs/verify/quickstarts/python-flask)
* [API Reference](/docs/verify/api)
* [SMS Phone Verification on Code Exchange](https://www.twilio.com/code-exchange/sms-phone-verification)
* [Send an SMS verification code in 5 minutes](https://www.twilio.com/blog/sms-2fa-otp-5-minutes)

## Demo

https://www.youtube.com/watch?v=UBjMm\_nb45U

## Additional resources

The following resources provide more information about SMS verification and security:

* [SMS Verification: What It Is & How It Works](https://www.twilio.com/blog/what-is-sms-verification)
* [Five reasons SMS 2FA isn't going away](https://www.twilio.com/blog/sms-2fa-security)
* [What is SMS pumping?](/docs/verify/preventing-toll-fraud#what-is-sms-pumping)
* [Verify Fraud Guard](/docs/verify/preventing-toll-fraud/sms-fraud-guard): A feature that prevents SMS-related fraud on Verify by blocking the prefix of the destination of suspected fraud
