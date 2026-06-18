# Verify

## Verify

Fight fraud and protect user accounts. Quickly verify users via SMS, Passkeys, Silent Network Auth, Voice, WhatsApp, TOTP, Push, Silent Device Approval, and Email.

[Create your first verification](/docs/verify/api)

## Tutorial

```bash !sample
curl -X POST \
  https://verify.twilio.com/v2/Services/VAxxxxxxxxxxxxxxxxx/Verifications \
  --data-urlencode "To=+19876543210" \
  --data-urlencode "Channel=sms"
```

1. Twilio handles storing verification tokens and making sure messages are delivered globally.
2. Your app provides the phone number or email address and verification method (SMS, voice, WhatsApp, or email).
3. The user receives a verification token.

Tutorial code output: "Your verification code is: 915316"

[Find more examples](/docs/verify/api)

## Get started

With just a few lines of code, you'll send your first verification token to a user's device with the Verify API. Add a few more and you can check the verification token. Create and manage [Verification Services in the Console](https://www.twilio.com/console/verify/services) or with the API. Choose the channel and your programming language to get started.

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

### Ahoy, World

Create your first verification. Jump to a Quickstart for the channel of your choice:

* [Quick Deploy: One-Time Passcode Verification (JavaScript)](https://www.twilio.com/code-exchange/one-time-passcode-verification-otp)
* [SMS / Voice (JavaScript, PHP, Java, Python, Ruby, C#, or Go)](/docs/verify/quickstarts)
* [TOTP (Authenticator Apps)](/docs/verify/quickstarts/totp)
* [Push and Silent Device Approval (iOS, Android, Web)](/docs/verify/push)

## API Reference

You have customers to protect. Let's get verification to production.

These short tutorials, sample apps, and API reference docs will get you up and running with a variety of channels.

https://www.youtube.com/watch?v=n6loU5ga2V8

### Verify API Reference

* [API Endpoint Reference](/docs/verify/api)
* [Start an SMS Verification](/docs/verify/api/verification)
* [Check an SMS Verification](/docs/verify/api/verification-check)
* [TOTP Technical Overview](/docs/verify/totp/technical-overview)
* [Push and Silent Device Approval Technical Overview](/docs/verify/push/technical-overview)

### Blog Posts & Tutorials

* [Programmable Messaging vs. Verify](https://www.twilio.com/blog/migrate-programmable-messaging-to-verify)
* [Serverless Phone Verification](https://www.twilio.com/blog/serverless-phone-verification)

### Integrations

* [Twilio Flex + Verify](https://www.twilio.com/blog/sms-otp-authentication-flex)
* [Auth0 + Verify](https://www.twilio.com/blog/configure-auth0-mfa-twilio-verify)
* [PingOne + Verify](https://github.com/twilio-samples/pingone-verify-integration)
* [Stripe + Verify](https://www.twilio.com/blog/stripe-fast-checkout-sms-verify)
* [RSA SecurID + Verify](https://www.twilio.com/blog/verify-rsa-secureid)

## Best Practices & More

Verify solves complex development challenges so you can focus on the code that counts. From carrier regulations to device-specific capabilities, Verify spots and solves for mission critical communication variables, ensuring your message is always delivered.

### Best Practices

* [Verification best practices](/docs/verify/developer-best-practices)
* [Best practices for phone number validation during new user enrollment](https://www.twilio.com/blog/best-practices-phone-number-validation-user-enrollment)
* [Best practices for managing retry logic with SMS 2FA](https://www.twilio.com/blog/best-practices-retry-logic-sms-2fa)
* [How to incentivize users to enable 2FA](https://www.twilio.com/blog/incentivize-2fa)
* [Best practices to secure inbound calls to your contact center](https://www.twilio.com/blog/best-practices-security-inbound-contact-center)
* [Is email-based 2FA a good idea?](https://www.twilio.com/blog/email-2fa-tradeoffs)

### Scaling and Customization

* [Localization & Supported Languages](/docs/verify/supported-languages)
* [Bring Your Own One-Time code](/docs/verify/api/customization-options)
* [Test Twilio Verify without getting rate limited](https://www.twilio.com/blog/test-verify-no-rate-limits)

### Verify Quick Links

* [Twilio Verify Features](https://www.twilio.com/en-us/trusted-activation/verify)
* [Pricing](https://www.twilio.com/en-us/verify/pricing)
* [5 reasons SMS 2FA isn't going away](https://www.twilio.com/blog/sms-2fa-security)

## Related Products

Secure your users' accounts with our suite of User Authentication & Identity products.

### Lookup

Reduce undeliverable messages, identify local-friendly number formats, do CNAM lookups, and protect yourself from fraud with Twilio Lookup.

[Product Docs](/docs/lookup)

### Stytch by Twilio

Add enterprise SSO, device intelligence, and scoped access for agents acting on behalf of users.

[Product Docs](https://stytch.com/docs)
