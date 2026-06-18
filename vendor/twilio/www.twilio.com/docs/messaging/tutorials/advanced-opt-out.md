# Customize users' opt-in and opt-out experience with Advanced Opt-Out

In this tutorial, you'll set up opt-in, opt-out, and help keywords and confirmation messages by using the **Advanced Opt-Out** feature of [Messaging Services](/docs/messaging/services). Configuring these keywords is an effective way to localize the experience for your customers and users worldwide.

By default, Twilio handles standard English-language reply messages—**STOP**, **UNSUBSCRIBE**, **END**, **QUIT**, **STOPALL**, **REVOKE**, **OPTOUT**, and **CANCEL**—for [long code](/docs/glossary/what-long-code-phone-number) numbers in accordance with industry standards. For more information, see [Twilio's support for opt-out keywords](https://help.twilio.com/hc/en-us/articles/223134027-Twilio-support-for-opt-out-keywords-SMS-STOP-filtering-).

This guide covers customizing opt-in/opt-out keywords and messages for your Messaging Service using the Advanced Opt-Out feature.

## Create a Messaging Service

> \[!NOTE]
>
> If you've already set up your Messaging Service, skip ahead to [enabling Advanced Opt-Out for your Messaging Service](#enable-advanced-opt-out-for-your-messaging-service).

Global opt-in and opt-out keywords are a feature of [Twilio Messaging Services](/docs/messaging/services). A Messaging Service bundles messaging functionality around a common set of senders, features, and configuration.

If you haven't already done so, create a Messaging Service.

The following example shows how to create a Messaging Service:

Create a Messaging Service

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createService() {
  const service = await client.messaging.v1.services.create({
    friendlyName: "My First Messaging Service",
  });

  console.log(service.sid);
}

createService();
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

service = client.messaging.v1.services.create(
    friendly_name="My First Messaging Service"
)

print(service.sid)
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

        var service = await ServiceResource.CreateAsync(friendlyName: "My First Messaging Service");

        Console.WriteLine(service.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.messaging.v1.Service;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Service service = Service.creator("My First Messaging Service").create();

        System.out.println(service.getSid());
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

	params := &messaging.CreateServiceParams{}
	params.SetFriendlyName("My First Messaging Service")

	resp, err := client.MessagingV1.CreateService(params)
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

$service = $twilio->messaging->v1->services->create(
    "My First Messaging Service" // FriendlyName
);

print $service->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

service = @client
          .messaging
          .v1
          .services
          .create(friendly_name: 'My First Messaging Service')

puts service.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:messaging:v1:services:create \
   --friendly-name "My First Messaging Service"
```

```bash
curl -X POST "https://messaging.twilio.com/v1/Services" \
--data-urlencode "FriendlyName=My First Messaging Service" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "date_created": "2015-07-30T20:12:31Z",
  "date_updated": "2015-07-30T20:12:33Z",
  "friendly_name": "My First Messaging Service",
  "inbound_request_url": "https://www.example.com/",
  "inbound_method": "POST",
  "fallback_url": "https://www.example.com",
  "fallback_method": "GET",
  "status_callback": "https://www.example.com",
  "sticky_sender": true,
  "smart_encoding": false,
  "mms_converter": true,
  "fallback_to_long_code": true,
  "scan_message_content": "inherit",
  "area_code_geomatch": true,
  "validity_period": 600,
  "synchronous_validation": true,
  "usecase": "marketing",
  "us_app_to_person_registered": false,
  "use_inbound_webhook_on_number": true,
  "links": {
    "phone_numbers": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers",
    "short_codes": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ShortCodes",
    "alpha_senders": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/AlphaSenders",
    "messages": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages",
    "us_app_to_person": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Compliance/Usa2p",
    "us_app_to_person_usecases": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Compliance/Usa2p/Usecases",
    "channel_senders": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ChannelSenders",
    "destination_alpha_senders": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/DestinationAlphaSenders"
  },
  "url": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

Copy the Messaging Service SID (it starts with `MGXXX`). You'll need it in the next step when you associate a phone number with this Service.

## Purchase an SMS capable phone number

Sending SMS messages requires an SMS capable phone number. You can [search for and purchase available phone numbers](https://1console.twilio.com/go?to=/account/__account__/us1/senders-hub/list/phone-numbers/inventory) in the Console. When you search, make sure that the number you choose is SMS capable. Check the appropriate box in the search UI to filter available numbers to those that are SMS capable.

Once you've purchased a SMS capable Twilio phone number, you can start sending messages to mobile devices.

### Add a number to the number pool

Associate your SMS-enabled Twilio number with the Messaging Service you created.

## Console

In the [Twilio Console](https://1console.twilio.com), open your Messaging Service and navigate to **Senders**. Click the **Add Sender IDs** button, select the Sender Type, and assign the senders to your Messaging Service. See below for instructions for adding WhatsApp-enabled numbers to your Sender Pool.

You can also use the [Messaging Services REST API](/docs/messaging/api/service-resource) to add the Phone Number you purchased to your sender pool. To do this, you will need the Phone Number's unique SID, which starts with `PNXXX`. To find your phone number SID:

1. Go to the [Phone Numbers page](https://1console.twilio.com/us1/develop/phone-numbers/manage/incoming) in the Twilio Console.
2. Click the phone number you want to add.
3. The Phone Number SID (`PNXXX...`) is displayed on the phone number's detail page.

## Legacy Console

In the [Twilio Console](https://console.twilio.com), open your Messaging Service and navigate to **Senders**. Click the **Add Sender IDs** button, select the Sender Type, and assign the senders to your Messaging Service. See below for instructions for adding WhatsApp-enabled numbers to your Sender Pool.

You can also use the [Messaging Services REST API](/docs/messaging/api/service-resource) to add the Phone Number you purchased to your sender pool. To do this, you will need the Phone Number's unique SID, which starts with `PNXXX`. To find your phone number SID:

1. Go to the [Phone Numbers page](https://console.twilio.com/us1/develop/phone-numbers/manage/incoming) in the Twilio Console.
2. Click the phone number you want to add.
3. The Phone Number SID (`PNXXX...`) is displayed on the phone number's detail page.

Use the Phone Number's SID to attach to the Messaging Service that you created.

The following example shows how to add a number to your number pool:

Add Number to Numbers Pool

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createPhoneNumber() {
  const phoneNumber = await client.messaging.v1
    .services("MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    .phoneNumbers.create({
      phoneNumberSid: "PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    });

  console.log(phoneNumber.sid);
}

createPhoneNumber();
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

phone_number = client.messaging.v1.services(
    "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
).phone_numbers.create(phone_number_sid="PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")

print(phone_number.sid)
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

        var phoneNumber = await PhoneNumberResource.CreateAsync(
            phoneNumberSid: "PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            pathServiceSid: "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");

        Console.WriteLine(phoneNumber.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.Twilio;
import com.twilio.rest.messaging.v1.service.PhoneNumber;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        PhoneNumber phoneNumber =
            PhoneNumber.creator("MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", "PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX").create();

        System.out.println(phoneNumber.getSid());
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

	params := &messaging.CreatePhoneNumberParams{}
	params.SetPhoneNumberSid("PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")

	resp, err := client.MessagingV1.CreatePhoneNumber("MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
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

$phone_number = $twilio->messaging->v1
    ->services("MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
    ->phoneNumbers->create(
        "PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" // PhoneNumberSid
    );

print $phone_number->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

phone_number = @client
               .messaging
               .v1
               .services('MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
               .phone_numbers
               .create(phone_number_sid: 'PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')

puts phone_number.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:messaging:v1:services:phone-numbers:create \
   --service-sid MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --phone-number-sid PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

```bash
curl -X POST "https://messaging.twilio.com/v1/Services/MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/PhoneNumbers" \
--data-urlencode "PhoneNumberSid=PNXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "service_sid": "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "date_created": "2015-07-30T20:12:31Z",
  "date_updated": "2015-07-30T20:12:33Z",
  "phone_number": "+987654321",
  "country_code": "US",
  "capabilities": [
    "MMS",
    "SMS",
    "Voice"
  ],
  "url": "https://messaging.twilio.com/v1/Services/MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/PhoneNumbers/PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

### Add a WhatsApp-enabled number to your Messaging Service

## Console

The Advanced Opt-Out feature of Messaging Service also works with WhatsApp-enabled senders (phone numbers). To add a WhatsApp-enabled number to your Messaging Service Sender Pool:

1. In the [Twilio Console](https://1console.twilio.com), go to **Messaging** > **Services**.
2. Select the Messaging Service that you want to edit.
3. Click the **Add Senders** button to add your WhatsApp-enabled phone number to the Messaging Service.

## Legacy Console

The Advanced Opt-Out feature of Messaging Service also works with WhatsApp-enabled senders (phone numbers). To add a WhatsApp-enabled number to your Messaging Service Sender Pool:

1. In the [Twilio Console](https://console.twilio.com), go to **Messaging** > **Services**.
2. Select the Messaging Service that you want to edit.
3. Click the **Add Senders** button to add your WhatsApp-enabled phone number to the Messaging Service.

The following image shows the dialog for adding a WhatsApp number to your sender pool:

![Dialog for adding WhatsApp number to sender pool in Twilio Messaging Service.](https://docs-resources.prod.twilio.com/969dbde0782d8d0024c77db81961a50c272e11c44f501d9a35769239ee8947b9.png)

> \[!WARNING]
>
> Advanced Opt-Out currently does not support changing or reporting on blocked phone numbers via the Console or the REST API.

## Enable Advanced Opt-Out for your Messaging Service

> \[!CAUTION]
>
> Advanced Opt-Out is **disabled by default** for your Messaging Service. After you enable Advanced Opt-Out, you can disable it only by contacting our [support team](https://help.twilio.com).

Now that you have your Messaging Service, locate the **Opt-Out Management** section for your Messaging Service. This is where you can enable and configure your Advanced Opt-Out preferences.

## Console

1. In the [Twilio Console](https://1console.twilio.com), go to **Products & Services** > **Messaging** > **Messaging services**.
2. Select your Messaging Service.
3. Click the **Opt-Out** tab.
4. On the **Opt-out management** page, click the **Enable advanced opt-out** button.

## Legacy Console

The following image shows the Opt-Out Management page:

![Opt-Out Management page with Standard Opt-Out Keywords and Enable Advanced Opt-Out button highlighted.](https://docs-resources.prod.twilio.com/0e8a7193cfbfbd79e9e46cf57b72ffbc0807ff8b1b479d38650f8b41d6cda306.png)

To turn on Advanced Opt-Out for your Messaging Service, click the **Enable Advanced Opt-Out** button.

### Make changes before you enable Advanced Opt-Out

To stay compliant and give your customers the best possible experience, ensure that you've configured Advanced Opt-Out correctly before enabling it.

Before enabling Advanced Opt-Out for your Messaging Service, you can change the configuration, such as the keywords and responses, and save your changes. These changes **do not take effect** on your Messaging Service until you enable Advanced Opt-Out. However, the changes that you make to keywords and responses are saved and reflected in the console.

Be aware that **as soon as you enable Advanced Opt-Out for your Messaging Service**, the configuration applies to all senders (long codes, short codes, and toll-free numbers) in your sender pool.

### Double-check your keywords for Short Codes and Advanced Opt-Out

If you have [short codes](/docs/glossary/what-is-a-short-code) in your Messaging Service's Sender Pool, it is a good idea to confirm that the keywords (opt-out, opt-in, and help) listed in the Advanced Opt-Out configuration exactly match the stop-words that you included in your application for the short code. In order to remain compliant per the requirements of your short code application, make sure that you are addressing the keywords the customers will use to opt in and out of your Messages.

> \[!WARNING]
>
> Once you enable Advanced Opt-Out, the changes apply to all senders in your sender pool, including short codes. Your keywords and responses in Advanced Opt-Out take precedence over the settings for your short code, which can create a compliance risk.
>
> We highly recommend verifying that the configuration in Advanced Opt-Out matches any keyword and confirmation message pairings that you may have previously set up in your application or that you specified when obtaining a short code.

## Configuring Advanced Opt-Out keywords

You can edit keywords for your Messaging Service in three ways:

* Edit the Standard Opt-Out keywords
* Add language-specific Opt-Out keywords
* Add Country Code Opt-Out keywords

### Edit the standard opt-out keywords

Standard Opt-Out keywords apply to messages in any country where you haven't specified keyword and confirmation-message pairs (covered in the next section). Since we have not added any country overrides yet, Advanced Opt-Out for your new Messaging Service currently handles all messages based on the Standard Keywords by default.

## Console

On the **Opt-Out** tab of your Messaging Service, the **Standard Opt-Out Keywords** section displays three categories: **Opt-Out**, **Opt-In**, and **Help**. Each category shows the current keywords and confirmation message.

To edit the keywords and messages:

1. Click into your messaging service and navigate to the **Opt-Out** tab. Then, enable Advanced Opt-Out if you haven't already. After enabling, click the pencil.
   icon in the **Standard Opt-Out Keywords** section to edit the keywords and messages for your Messaging Service.
2. In the **Opt-Out** section, add or remove keywords (for example: `cancel`, `end`, `quit`, `stop`, `stopall`, `unsubscribe`) and update the confirmation message.
3. In the **Opt-In** section, add or remove keywords (for example: `start`, `unstop`, `yes`) and update the confirmation message.
4. In the **Help** section, add or remove keywords (for example: `help`, `info`) and update the confirmation message.
5. Click **Save** to apply your changes.

## Legacy Console

To change the Standard Opt-Out keywords, click the **Edit** text to the right of the section header. This opens up an editing interface where you can add, change, and remove the keywords and confirmation message for opt-out, opt-in, and help interactions.

![Editing standard opt-out keywords and messages for messaging service.](https://docs-resources.prod.twilio.com/b4f7c403a0b97ef2558f0b7d7c8dad22282b0161055373ae90d9fae3480c211e.gif)

#### Keywords are case insensitive

Twilio matches keywords in a *case-insensitive* way. "Stop" will be handled the same way as "STOP" or "stop".

> \[!WARNING]
>
> When configuring Advanced Opt-Out, you should avoid including any [personally identifiable information (PII)](/docs/glossary/what-is-personally-identifiable-information-pii) in opt-out response messages you send to customers.

#### Editing the Opt-out keywords and confirmation message

When Twilio receives an Opt-out keyword from one of your users, it adds this phone number to a list of blocked numbers. Twilio checks this list before sending any future outgoing messages. Any subsequent outgoing messages from your account to this user will fail with [Error Code 21610](/docs/api/errors/21610) asynchronously.

The reserved Opt-out keyword "stop" is **non-removable**. If your use case requires more keywords than Twilio recognizes by default, you can add them in the textbox, separated by commas.

#### Edit the Opt-in keywords and confirmation message

You can specify which keywords Twilio will interpret as Opt-in keywords. When one of your users sends an Opt-in keyword, Twilio removes the blocked number entry containing the user's number (if it exists) and sends the confirmation message that you define. This confirmation message notifies the customer that they have opted back in. Any subsequent outgoing messages to this user from your account will not be blocked.

> \[!WARNING]
>
> "Start" and "unstop" are reserved Opt-In keywords and non-removable.

#### Edit the Help keywords and confirmation message

With help keywords, you can give your end users more information as to who owns a particular number as well as what actions are available. When Twilio receives a help keyword from one of your users, there is no impact on the block list. However, if the user has opted out previously, they won't receive your defined help message in response.

Keep in mind that the keyword "help" is reserved and cannot be removed.

### Special behavior for Toll-Free numbers

If your Messaging Service includes Toll-Free US numbers and you are sending to or receiving from the US or Canada, be aware of the following special behavior:

* Toll-Free US numbers always unsubscribe a user who replies STOP, so the Advanced Opt-out custom message will not display.
* Toll-Free US numbers always opt-in a user who replies START, UNSTOP, so both the carrier opt-in message and the Advanced Opt-out custom message will be returned.
* Only the keywords START and UNSTOP can fully undo the blocking. Twilio's supported keyword "YES" will not work to opt-in a previously unsubscribed user.

If using a Toll-Free US number to communicate with your users, make sure to communicate the STOP and START/UNSTOP keywords to them.

## Add language-specific keywords for opt-out, opt-in, and help messages

If you are communicating with customers in more than one language, you can specify pairs of keywords and confirmation messages in the target languages of your end users. When an end user sends a Message using one of your configured keywords, Advanced Opt-Out matches the keyword and returns the confirmation message that you specified.

For example, let's say that you plan to send Messages internationally to both English-speaking and Spanish-speaking users. You can create keyword and confirmation message pairs under the **Language-specific Opt-Out Keywords** section for Spanish, rather than setting country-specific Spanish keywords for each Spanish-speaking country in which you plan to send Messages.

## Console

On the **Opt-Out** tab of your Messaging Service, scroll down to the **Language-Specific Opt-Out Keywords** section. To add language-specific keywords:

1. Click **Add language**.
2. Select the target language from the dropdown.
3. Add **Opt-Out** keywords and a confirmation message for that language.
4. Add **Opt-In** keywords and a confirmation message.
5. Add **Help** keywords and a confirmation message.
6. Click **Save** to apply your changes.

## Legacy Console

![Interface showing opt-out, opt-in, and help keyword settings for messaging service.](https://docs-resources.prod.twilio.com/b5012a0b2a9059bfbb0ff6f35b735202b2d10a8b07e1be4e3a7757885262bec6.gif)

Click on **Add Opt-Out Keywords** under **Language Specific Opt-Out Keywords** to create language-specific pairings for Opt-out, Opt-in, and Help messages.

### Supported Languages for Opt-Out Keywords

Twilio supports the following spoken languages in opt-out keywords and responses:

* Afrikaans
* Arabic
* Bengali
* Chinese
* Croatian
* Czech
* Danish
* Dutch
* English
* Estonian
* Finnish
* French
* German
* Greek
* Hebrew
* Hindi
* Hungarian
* Italian
* Japanese
* Korean
* Latvian
* Lithuanian
* Malay
* Malaysian
* Norwegian
* Polish
* Portuguese
* Russian
* Slovak
* Slovene
* Spanish
* Southern Ndebele
* Southern Sotho
* Swati
* Swedish
* Tamil
* Tswana
* Tsonga
* Venda
* Xhosa
* Zulu

## Create keywords and confirmation messages per country code

If you correspond with users in a country where you would like to provide a localized experience, you can do that by creating a country code pairing for keywords and confirmation messages.

> \[!WARNING]
>
> A Country Override **replaces** the Standard Keywords in the specified country. Be sure to add all keywords and confirmation responses that you wish to support for this country. Twilio first checks the list of keywords for the specified country. If it finds a match with a country-specific keyword, it will return the matching confirmation message. If not, it will check the list of Standard Opt-Out keywords.

You can add these keywords in the **Country Code Opt-Out Keywords** section under Advanced Opt-Out Management.

## Console

On the **Opt-Out** tab of your Messaging Service, scroll down to the **Country Code Opt-Out Keywords** section. To add country-specific keywords:

1. Click **Add language** under **Country Code Opt-Out Keywords**.
2. Select the country code from the dropdown.
3. Select at least one language to add keywords for that country.
4. Add **Opt-Out**, **Opt-In**, and **Help** keywords and confirmation messages for each language.
5. To add another language for the same country, click **Add another language**.
6. Click **Save** to apply your changes.

## Legacy Console

![Editing country code opt-out keywords in messaging settings.](https://docs-resources.prod.twilio.com/11909cf3f033547ce7603e25bd25bd90cad5443b5c37f8533c233d080b887184.gif)

When specifying Country Code keywords, you must select *at least one language* to add keywords. If you wish to localize the behavior further, you can add another language.

When receiving an incoming message from one of your users, Twilio matches the country code of your user's phone number with the configuration that you specified. It then attempts to match one of the keywords listed in the pre-defined languages. If there is a match, Twilio applies any necessary opt-out action then replies with the message in the language of your user's keyword.

Therefore, all keywords in a country, across all languages, need to be unique.

**Note**: It's up to the developer to handle localization of keywords for Country Overrides. Twilio doesn't perform translation; it will only handle the literal keywords as specified in the Country Code Keywords.

> \[!WARNING]
>
> Be aware: the same keyword **can't** be entered in two different languages for the same country. If a word is entered in one language, the same keyword won't be accepted in another language.

## Keeping track of your users' status

With Advanced Opt-Out, you can keep track of the most up-to-date information about your users' opt-in and opt-out preferences. When an incoming message triggers one of your Opt-Out keywords, Twilio includes an `OptOutType` property in the request object sent to the webhook URL configured for your Messaging Service. The corresponding value is `START`, `STOP`, or `HELP`, depending on the incoming keyword.

If you see the `OptOutType` property in the Twilio request to your application, that indicates that Advanced Opt-Out has already matched one of your keywords and replied with the corresponding confirmation message. You may want to store this information, but because Twilio has already sent a confirmation message/reply to your end user, we don't recommend sending another Message back from your application to the end user. In the case of Opt-out keywords, for example, Twilio will not send any further Messages to the end user, failing with [Error Code 21610](/docs/api/errors/21610).

## What's next?

Check out these other Messaging Service Resources to improve your users' experience:

* [An Overview of Twilio Messaging Services](/docs/messaging/services)
* [How to send SMS Messages with a Messaging Service](/docs/messaging/tutorials/send-messages-with-messaging-services)
