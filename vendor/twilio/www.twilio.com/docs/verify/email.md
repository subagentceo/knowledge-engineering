# Send Email Verifications with Verify and Twilio SendGrid

In this guide, you'll learn how to set up and send email verifications using Twilio Verify and SendGrid. You'll configure your SendGrid account, create an email integration in Verify and send verification emails to your users.

### Set up your SendGrid account

[Create a SendGrid account](https://signup.sendgrid.com/) or [log in to your existing account](https://app.sendgrid.com/login). Email verifications use the SendGrid transactional email API.

### Create a SendGrid API key

Next, [Create a SendGrid API key](https://app.sendgrid.com/settings/api_keys) by using the API or the SendGrid dashboard.

> \[!WARNING]
>
> We strongly recommend generating SendGrid API keys with [limited scopes](/docs/sendgrid/api-reference/how-to-use-the-sendgrid-v3-api/authentication).

Create an API key in one of two ways:

* **Option 1**: [Create an API key with the SendGrid API](https://docs.sendgrid.com/api-reference/api-keys/create-api-keys).
* **Option 2**: Create an API key in the [SendGrid UI](https://app.sendgrid.com/settings/api_keys). For permissions, select "Restricted Access" and choose the following limited scopes:

| Access details                                   | Access level |
| ------------------------------------------------ | ------------ |
| Mail Send (nested under Mail Send category)      | Full Access  |
| Scheduled Send (nested under Mail Send category) | No Access    |
| Template Engine                                  | Read Access  |

> \[!NOTE]
>
> Save your SendGrid API key. You'll need it to set up your verification email integration.

### Set up Domain Authentication

Domain authentication lets you send email from your company's domain *without* "via sendgrid.net". See [Configure domain authentication](/docs/sendgrid/ui/account-and-settings/how-to-set-up-domain-authentication), and then authenticate your domain in the [SendGrid dashboard](https://app.sendgrid.com/settings/sender_auth).

> \[!WARNING]
>
> It can take up to **48 hours** for the records to verify after you upload them into your DNS host. You can still continue setup and testing while domain authentication is pending by using [Single Sender Verification](/docs/sendgrid/ui/sending-email/sender-verification). Single sender verification allows you to send from a single email address that you confirm ownership of by clicking a verification link in the email's inbox. For more information on the differences between domain authentication and single sender verification, see [Sender Identity](/docs/sendgrid/for-developers/sending-email/sender-identity).

### Create an Email Template

Go to the [SendGrid Dynamic Templates page](https://sendgrid.com/dynamic_templates) and create a new template. In this process, you'll name and create or select a design for your template. Learn more about [how to send email with dynamic templates](/docs/sendgrid/ui/sending-email/how-to-send-an-email-with-dynamic-templates).

**Use at least one of the first three variables below** to include the verify code in your email template.

| Available variables           | Description                                                                                                                                                                                                                                                                                                       |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `twilio_code`                 | The 4-10 digit numeric One Time Passcode. OTP only, no descriptive text.                                                                                                                                                                                                                                          |
| `twilio_message`              | Contains both internationalized descriptive text and the OTP. For example, **"Your MyServiceName verification code is: 123456"** or **"Su codigo de verificación para MyServiceName es: 123456"**. Default language is English, [override language using the Locale parameter.](/docs/verify/supported-languages) |
| `twilio_message_without_code` | Contains the internationalized descriptive text **only.** For example, **"Your MyServiceName verification code is"** or **"Su codigo de verificacion para MyServiceName es"**.                                                                                                                                    |
| `twilio_service_name`         | (Optional) the Friendly Name of the Service.                                                                                                                                                                                                                                                                      |

#### Find Template ID

You can find a list of your templates and their unique IDs on the [SendGrid Dynamic Templates page](https://mc.sendgrid.com/dynamic-templates). A template ID is 64 characters with one dash (d-uuid) and is required for creating a Verify email integration.

> \[!NOTE]
>
> **Need template design help?** Check out SendGrid's free and [open source library of transactional email templates](https://sendgrid.com/blog/open-source-transactional-email-templates/) for robust and responsive designs.

#### Example SendGrid HTML Template with variables

```xml
<html>
  <head>
    <style type="text/css">
      body, p, div {
        font-family: Helvetica, Arial, sans-serif;
        font-size: 14px;
      }
      a {
        text-decoration: none;
      }
    </style>
    <title></title>
  </head>
  <body>
  <center>
    <p>
      Example 1 - just the code (no localization in the message):
    </p>
    <p>
      The verification code is: <strong>{{twilio_code}}</strong>
    </p>
    <p>
      Example 2 - use the code in a clickable link to trigger a verification check:
    </p>
    <p>
      <a href="https://example.com/signup/email/verify?token={{twilio_code}}"
         style="background-color:#ffbe00; color:#000000; display:inline-block; padding:12px 40px 12px 40px; text-align:center; text-decoration:none;"
         target="_blank">Verify Email Now</a>
    </p>
    <p>
      Example 3 - entire localized message and code:
    </p>
    <p>
      <strong>{{twilio_message}}</strong>
    </p>
    <p><a href="https://sendgrid.com/blog/open-source-transactional-email-templates/">Check out more templates</a></p>
    <span style="font-size: 10px;"><a href=".">Email preferences</a></span>
  </center>
  </body>
</html>
```

This will produce an email that resembles the following:

![Email verification examples with code 918135 and 'Verify Email Now' button.](https://docs-resources.prod.twilio.com/9250ce65a086222b1af746c9005a4f2b0fd6ab9ed9176a95cbeb7e13b655b5c7.png)

> \[!NOTE]
>
> We recommend using **Email preferences** instead of **Unsubscribe** for transactional emails like these. See [Should you include an unsubscribe link in your transactional email messages?](https://sendgrid.com/blog/should-you-include-an-unsubscribe-link-in-transactional-email-messages/)

To learn more about email deliverability, check out the following links:

* [Warming up an IP address](/docs/sendgrid/concepts/reputation/warm-up-ip-addresses)
* [Email Guide for IP Warm Up](https://sendgrid.com/resource/email-guide-ip-warm-up/)
* [What is DMARC?](https://sendgrid.com/blog/what-is-dmarc/)

## Create a Verify email integration

Go to the [Email Integration](https://www.twilio.com/console/verify/email) section of the Verify Console to create a new integration. Name your integration; you can change the name later.

Fill in the following required fields:

* SendGrid [API Key](#create-a-sendgrid-api-key)
* Default [Template ID](#find-template-id)
* Default From Email (see [Domain Authentication](#set-up-domain-authentication))
* Default From Name (see [Domain Authentication](#set-up-domain-authentication))

Connect your email integration to your Verify service in one of two ways:

Option 1: From [Email Integration](https://www.twilio.com/console/verify/email), check the service or services you want to associate with that email integration. A single email integration can be used for multiple services.

or

Option 2: From [Verify Services](https://www.twilio.com/console/verify/services), select your service and navigate to the Email tab to select an email integration. Each service can only have one email integration.

## Send an email verification

Send your first email verification:

Start a verification with email

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
      channel: "email",
      to: "recipient@foo.com",
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
).verifications.create(channel="email", to="recipient@foo.com")

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
            channel: "email",
            to: "recipient@foo.com",
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
            Verification.creator("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "recipient@foo.com", "email").create();

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
	params.SetChannel("email")
	params.SetTo("recipient@foo.com")

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
        "recipient@foo.com", // To
        "email" // Channel
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
                 channel: 'email',
                 to: 'recipient@foo.com'
               )

puts verification.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:verify:v2:services:verifications:create \
   --service-sid VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --channel email \
   --to recipient@foo.com
```

```bash
curl -X POST "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications" \
--data-urlencode "Channel=email" \
--data-urlencode "To=recipient@foo.com" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "VEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "service_sid": "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "to": "recipient@foo.com",
  "channel": "email",
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

You can override the default template ID, default from name, or default from email with a channel configuration:

Start a verification with email

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
      channel: "email",
      channelConfiguration: {
        template_id: "d-4f7abxxxxxxxxxxxx",
        from: "override@example.com",
        from_name: "Override Name",
      },
      to: "recipient@foo.com",
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
).verifications.create(
    channel="email",
    to="recipient@foo.com",
    channel_configuration={
        "template_id": "d-4f7abxxxxxxxxxxxx",
        "from": "override@example.com",
        "from_name": "Override Name",
    },
)

print(verification.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Verify.V2.Service;
using System.Threading.Tasks;
using System.Collections.Generic;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var verification = await VerificationResource.CreateAsync(
            channel: "email",
            to: "recipient@foo.com",
            channelConfiguration: new Dictionary<
                string,
                Object>() { { "template_id", "d-4f7abxxxxxxxxxxxx" }, { "from", "override@example.com" }, { "from_name", "Override Name" } },
            pathServiceSid: "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(verification.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.util.HashMap;
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
            Verification.creator("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "recipient@foo.com", "email")
                .setChannelConfiguration(new HashMap<String, Object>() {
                    {
                        put("template_id", "d-4f7abxxxxxxxxxxxx");
                        put("from", "override@example.com");
                        put("from_name", "Override Name");
                    }
                })
                .create();

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
	params.SetChannel("email")
	params.SetTo("recipient@foo.com")
	params.SetChannelConfiguration(map[string]interface{}{
		"template_id": "d-4f7abxxxxxxxxxxxx",
		"from":        "override@example.com",
		"from_name":   "Override Name",
	})

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
        "recipient@foo.com", // To
        "email", // Channel
        [
            "channelConfiguration" => [
                "template_id" => "d-4f7abxxxxxxxxxxxx",
                "from" => "override@example.com",
                "from_name" => "Override Name",
            ],
        ]
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
                 channel: 'email',
                 to: 'recipient@foo.com',
                 channel_configuration: {
                   'template_id' => 'd-4f7abxxxxxxxxxxxx',
                   'from' => 'override@example.com',
                   'from_name' => 'Override Name'
                 }
               )

puts verification.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:verify:v2:services:verifications:create \
   --service-sid VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --channel email \
   --to recipient@foo.com \
   --channel-configuration "{\"template_id\":\"d-4f7abxxxxxxxxxxxx\",\"from\":\"override@example.com\",\"from_name\":\"Override Name\"}"
```

```bash
CHANNEL_CONFIGURATION_OBJ=$(cat << EOF
{
  "template_id": "d-4f7abxxxxxxxxxxxx",
  "from": "override@example.com",
  "from_name": "Override Name"
}
EOF
)
curl -X POST "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications" \
--data-urlencode "Channel=email" \
--data-urlencode "To=recipient@foo.com" \
--data-urlencode "ChannelConfiguration=$CHANNEL_CONFIGURATION_OBJ" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "VEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "service_sid": "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "to": "recipient@foo.com",
  "channel": "email",
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

Channel configuration also supports SendGrid [substitutions](https://sendgrid.com/docs/ui/sending-email/substitution-and-section-tags/).

Start a verification with email

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
      channel: "email",
      channelConfiguration: {
        substitutions: {
          username: "Foo Bar",
        },
      },
      to: "recipient@foo.com",
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
).verifications.create(
    channel="email",
    to="recipient@foo.com",
    channel_configuration={"substitutions": {"username": "Foo Bar"}},
)

print(verification.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Verify.V2.Service;
using System.Threading.Tasks;
using System.Collections.Generic;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var verification = await VerificationResource.CreateAsync(
            channel: "email",
            to: "recipient@foo.com",
            channelConfiguration: new Dictionary<
                string,
                Object>() { { "substitutions", new Dictionary<string, Object>() { { "username", "Foo Bar" } } } },
            pathServiceSid: "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(verification.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.util.HashMap;
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
            Verification.creator("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "recipient@foo.com", "email")
                .setChannelConfiguration(new HashMap<String, Object>() {
                    {
                        put("substitutions", new HashMap<String, Object>() {
                            {
                                put("username", "Foo Bar");
                            }
                        });
                    }
                })
                .create();

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
	params.SetChannel("email")
	params.SetTo("recipient@foo.com")
	params.SetChannelConfiguration(map[string]interface{}{
		"substitutions": map[string]interface{}{
			"username": "Foo Bar",
		},
	})

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
        "recipient@foo.com", // To
        "email", // Channel
        [
            "channelConfiguration" => [
                "substitutions" => [
                    "username" => "Foo Bar",
                ],
            ],
        ]
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
                 channel: 'email',
                 to: 'recipient@foo.com',
                 channel_configuration: {
                   'substitutions' => {
                     'username' => 'Foo Bar'
                   }
                 }
               )

puts verification.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:verify:v2:services:verifications:create \
   --service-sid VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --channel email \
   --to recipient@foo.com \
   --channel-configuration "{\"substitutions\":{\"username\":\"Foo Bar\"}}"
```

```bash
CHANNEL_CONFIGURATION_OBJ=$(cat << EOF
{
  "substitutions": {
    "username": "Foo Bar"
  }
}
EOF
)
curl -X POST "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications" \
--data-urlencode "Channel=email" \
--data-urlencode "To=recipient@foo.com" \
--data-urlencode "ChannelConfiguration=$CHANNEL_CONFIGURATION_OBJ" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "VEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "service_sid": "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "to": "recipient@foo.com",
  "channel": "email",
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

## Check an email verification

Checking an email verification token uses the same code as other channels, such as SMS or voice.

Check an email verification

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createVerificationCheck() {
  const verificationCheck = await client.verify.v2
    .services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    .verificationChecks.create({
      code: "123456",
      to: "recipient@foo.com",
    });

  console.log(verificationCheck.sid);
}

createVerificationCheck();
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

verification_check = client.verify.v2.services(
    "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).verification_checks.create(to="recipient@foo.com", code="123456")

print(verification_check.sid)
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

        var verificationCheck = await VerificationCheckResource.CreateAsync(
            to: "recipient@foo.com",
            code: "123456",
            pathServiceSid: "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(verificationCheck.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.verify.v2.service.VerificationCheck;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        VerificationCheck verificationCheck = VerificationCheck.creator("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                                                  .setTo("recipient@foo.com")
                                                  .setCode("123456")
                                                  .create();

        System.out.println(verificationCheck.getSid());
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

	params := &verify.CreateVerificationCheckParams{}
	params.SetTo("recipient@foo.com")
	params.SetCode("123456")

	resp, err := client.VerifyV2.CreateVerificationCheck("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
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

$verification_check = $twilio->verify->v2
    ->services("VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    ->verificationChecks->create([
        "to" => "recipient@foo.com",
        "code" => "123456",
    ]);

print $verification_check->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

verification_check = @client
                     .verify
                     .v2
                     .services('VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
                     .verification_checks
                     .create(
                       to: 'recipient@foo.com',
                       code: '123456'
                     )

puts verification_check.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:verify:v2:services:verification-check:create \
   --service-sid VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa \
   --to recipient@foo.com \
   --code 123456
```

```bash
curl -X POST "https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/VerificationCheck" \
--data-urlencode "To=recipient@foo.com" \
--data-urlencode "Code=123456" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```
