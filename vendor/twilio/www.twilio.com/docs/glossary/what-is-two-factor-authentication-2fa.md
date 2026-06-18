# What is Two Factor Authentication?

Two-factor authentication (commonly abbreviated **2FA** ) adds an extra layer of security to your user's account login by requiring two types of authentication. This is usually *something your user knows* and *something they have*.

Looking for how to add 2FA to your personal accounts? Check out [Authy's 2FA guides](https://authy.com/guides/) for adding 2FA to sites like Gmail, Fortnite, Gemini, and many more.

## What is a factor?

There are three types of factors:

1. **Knowledge** - something you *know* like a password
2. **Possession** - something you *have* like a mobile phone
3. **Inherence** - something you *are* like a fingerprint

2FA means using any two of these factors. In web authentication, this is commonly something you know and something you have.

## The Problem with Passwords

Also known as multi-factor authentication (MFA), two-factor authentication is a common authentication best practice to increase account security normally provided by passwords. Passwords became a de facto standard for online authentication because unlike a possession factor, you can't *lose* a password.

![Password warning: The password has been exposed 24,230,577 times in data breaches and should be changed.](https://docs-resources.prod.twilio.com/23e94a7d311c7c77b6375d0c3bbccc4278a16321897f315cad1708fe551176fe.png)

According to the website [haveibeenpwned.com](https://haveibeenpwned.com/Passwords), guessable passwords like 123456 are still incredibly common. That password, 123456, has been seen in data breaches over ***24 million times*** . To make matters worse, a [2019 Google study](https://services.google.com/fh/files/blogs/google_security_infographic.pdf) shows that 64% of people admit to reusing passwords across multiple sites. This is a problem because even if someone has a complex password, if they're reusing it for many sites, a data breach at [MySpace](https://techcrunch.com/2016/05/31/recently-confirmed-myspace-hack-could-be-the-largest-yet/) or [Adobe](https://www.zdnet.com/article/adobe-left-7-5-million-creative-cloud-user-records-exposed-online/) could lead to the user's account getting breached on *your company's* site through a process known as credential stuffing.

## How Does Two Factor Authentication Keep Your Users Secure?

Things like password reuse, poorly encrypted passwords, social engineering, and leaked databases make even a secure password vulnerable. By requiring users to add a second factor to their authentication flow, an account with a compromised password will still be protected. Even targeted attacks are more difficult because the attacker would be required to access to different forms of authentication. A [Google study](https://security.googleblog.com/2019/05/new-research-how-effective-is-basic.html) showed that SMS based authentication "can block up to 100% of automated bots, 99% of bulk phishing attacks, and 66% of targeted attacks".

![Google study shows SMS 2FA blocks 100% of automated bots, 96% of bulk phishing, and 76% of targeted attacks.](https://docs-resources.prod.twilio.com/3175a75f68e0cae420e0d3d184b5eb4860f325cc892dc556dd941160418e1fda.png)

Mobile phone 2FA has become the industry standard, as most people carry their mobile phones at all times. It's a user-friendly flow, and dynamically generated passcodes are safe to use and users can receive special tokens through SMS or a dedicated authenticator app like Twilio's [Authy](https://www.authy.com).

## Is SMS 2FA secure?

SMS authentication has long been a popular choice for securing consumer accounts. It's a familiar channel to deploy and SMS 2FA usage has even *grown* [9%](https://www.okta.com/businesses-at-work/2021/#developers-at-work) in the last two years. While the SMS channel has legitimate security concerns, businesses should consider their threat model and offer a spectrum of 2FA options. Offering more secure channels like authenticator apps and push authentication is especially important when you're protecting high value targets like a bank account or email. For more details, check out this [blog post on 5 reasons SMS 2FA isn't going away](https://www.twilio.com/blog/sms-2fa-security).

## Incentivizing Two Factor Authentication

Offering 2FA isn't enough: your users also have to turn it on. Check out this [blog post with tips for incentivizing 2FA](https://www.twilio.com/blog/incentivize-2fa) including real world examples from banking and gaming companies.

## Examples of Two Factor Authentication

When you use your credit card and are prompted for your billing zip code, that's 2FA in action. [Knowledge factors](https://en.wikipedia.org/wiki/Multi-factor_authentication#Knowledge_factors) like your zip code may also be passwords or a personal identification number (PIN). [Possession factors](https://en.wikipedia.org/wiki/Multi-factor_authentication#Possession_factors) like your credit card include (but are not limited to) a physical key, fob, and personal cell phones. Two factor authentication for web applications similarly requires something your user knows (their password) and something they have (their personal mobile phone).

### Two-step authentication vs. Two-factor authentication

Using two knowledge factors like a password and a PIN is two-step authentication. Using two different factors like a password and a one-time passcode sent to a mobile phone via SMS is two-factor authentication.

## How Does Two Factor Authentication Work?

Most people add a possession authentication factor in addition to an existing knowledge channel. When a user signs up or logs in to your application 1) a numeric code is sent to their mobile device either via SMS, calls, email, 2) with a push notification or 3) through an authenticator app.

Each channel has different tradeoffs:

* SMS is convenient to use but requires cell service and is less secure.
* An authenticator app ([TOTP](/docs/glossary/totp)) provides a constantly rotating set of codes your users can use whenever needed, and does not require a cellular or internet connection.
* Push authentication provides additional context about the authentication event, and has predictable pricing for the business, but does require a specific app download.

Only after the user enters the correct numeric code in your application's login flow are they authenticated.

## Adding Two Factor Authentication to Your Application

![Security code 7583907 is displayed for SMS verification and login.](https://docs-resources.prod.twilio.com/44b709e5522e4a7ddf67cdd3fc695405a0e594037ab6397bbe12378558bf9d62.png)

There are a wide variety of ways to add two-factor authentication to your application. By using the [Twilio Verify API](/docs/verify), implementation is simplified and can boil down to just a few lines of code.

2FA with Twilio Verify SMS

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

## Where to Next?

Ready to add 2FA to your application with Twilio? Here are some resources to get you started:

* [Serverless phone verification with Twilio Verify and Twilio Functions](https://www.twilio.com/blog/serverless-phone-verification)
* [How to do Phone Verification in iOS Apps with Twilio Verify and Swift](https://www.twilio.com/blog/phone-verification-in-ios-with-twilio-verify-and-swift-html)
* [Verify Push Overview](/docs/verify/push)
* [Twilio Verify documentation](/docs/verify)

Let's build something amazing.
