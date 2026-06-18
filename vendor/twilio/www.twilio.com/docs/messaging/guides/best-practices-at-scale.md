# Best Practices for Scaling with Messaging Services

When you're ready to scale messaging for your application, you should keep a few best practices and key questions in mind as you build and work with Twilio.

This guide presents common use cases and location-specific complexities that can affect your messaging application. Knowing how, where, and to whom you plan to send messages will help you avoid some common pitfalls while scaling.

## Use a Messaging Service to send messages

Perhaps you built out your messaging application's proof-of-concept by sending messages from a single long code phone number. However, as you scale, your application may require different types of senders, such as short codes, Alpha Sender ID, WhatsApp senders, and phone numbers. You will also want to use features such [Advanced Opt-Out](https://help.twilio.com/hc/en-us/articles/360034798533-Getting-Started-with-Advanced-Opt-Out-for-Messaging-Services) for compliance management, and [Smart Encoding](/docs/messaging/services/smart-encoding-char-list) to catch those segment-gobbling Unicode symbols.

Intrigued? Check out the full list of [Messaging Service features](/docs/messaging/services).

You can think of a Messaging Service as a container to hold all of your sender IDs and to manage the configuration affecting the delivery of your messages. For example, you could put your short code and local numbers in one Messaging Service sender pool and configure them to point to the same webhook URL to respond to incoming messages. You could also define the same set of opt-out *(Stop)* words per country for all of the senders in your sender pool using the Messaging Service [Advanced Opt-Out](https://help.twilio.com/hc/en-us/articles/360034798533-Getting-Started-with-Advanced-Opt-Out-for-Messaging-Services) feature.

When sending messages from a Messaging Service, you can set the From parameter to your Messaging Service SID, instead of a specific phone number. This not only provides intelligent routing for the senders in your Sender Pool, but also gives you access to the various Messaging Service Features, like Advanced Opt-Out, Sticky Sender, Shortcode Reroute, Smart Encoding and more.

Send a Message with a Messaging Service

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createMessage() {
  const message = await client.messages.create({
    body: "Do you know what time it is? It must be party time!",
    messagingServiceSid: "MG9752274e9e519418a7406176694466fa",
    to: "+15558675310",
  });

  console.log(message.body);
}

createMessage();
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

message = client.messages.create(
    to="+15558675310",
    messaging_service_sid="MG9752274e9e519418a7406176694466fa",
    body="Do you know what time it is? It must be party time!",
)

print(message.body)
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

        var message = await MessageResource.CreateAsync(
            to: new Twilio.Types.PhoneNumber("+15558675310"),
            messagingServiceSid: "MG9752274e9e519418a7406176694466fa",
            body: "Do you know what time it is? It must be party time!");

        Console.WriteLine(message.Body);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.type.PhoneNumber;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Message message = Message
                              .creator(new com.twilio.type.PhoneNumber("+15558675310"),
                                  "MG9752274e9e519418a7406176694466fa",
                                  "Do you know what time it is? It must be party time!")
                              .create();

        System.out.println(message.getBody());
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

	params := &api.CreateMessageParams{}
	params.SetTo("+15558675310")
	params.SetMessagingServiceSid("MG9752274e9e519418a7406176694466fa")
	params.SetBody("Do you know what time it is? It must be party time!")

	resp, err := client.Api.CreateMessage(params)
	if err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
	} else {
		if resp.Body != nil {
			fmt.Println(*resp.Body)
		} else {
			fmt.Println(resp.Body)
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

$message = $twilio->messages->create(
    "+15558675310", // To
    [
        "messagingServiceSid" => "MG9752274e9e519418a7406176694466fa",
        "body" => "Do you know what time it is? It must be party time!",
    ]
);

print $message->body;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

message = @client
          .api
          .v2010
          .messages
          .create(
            to: '+15558675310',
            messaging_service_sid: 'MG9752274e9e519418a7406176694466fa',
            body: 'Do you know what time it is? It must be party time!'
          )

puts message.body
```

```bash
EXCLAMATION_MARK='!'
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:create \
   --to +15558675310 \
   --messaging-service-sid MG9752274e9e519418a7406176694466fa \
   --body "Do you know what time it is? It must be party time$EXCLAMATION_MARK"
```

```bash
EXCLAMATION_MARK='!'
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json" \
--data-urlencode "To=+15558675310" \
--data-urlencode "MessagingServiceSid=MG9752274e9e519418a7406176694466fa" \
--data-urlencode "Body=Do you know what time it is? It must be party time$EXCLAMATION_MARK" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "api_version": "2010-04-01",
  "body": "Do you know what time it is? It must be party time!",
  "date_created": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_sent": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_updated": "Thu, 24 Aug 2023 05:01:45 +0000",
  "direction": "outbound-api",
  "error_code": null,
  "error_message": null,
  "from": "+14155552345",
  "num_media": "0",
  "num_segments": "1",
  "price": null,
  "price_unit": null,
  "messaging_service_sid": "MG9752274e9e519418a7406176694466fa",
  "sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "queued",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media.json"
  },
  "to": "+15558675310",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

## Figure out which senders work best for your use case

> \[!WARNING]
>
> If your messaging use case is [Two-Factor Authentication (2FA)](/docs/glossary/what-is-two-factor-authentication-2fa) codes, you'll want to use [Authy](/docs/authy) or [Verify](/docs/verify), rather than Programmable Messaging.

Depending on what you build with Twilio Programmable Messaging, you may use different types of message senders as the primary way that customers interact with your application. There are different sender types to choose from:

* Local and international long code numbers
* Short code numbers
* Toll-free numbers
* Alphanumeric sender IDs
* WhatsApp senders

The answers to the following questions will determine what kind(s) of senders you should select and include in your Messaging Service's Sender Pool.

### 1) Are you sending one-way or two-way messages?

Consider your use case: *do you need your recipients to be able to reply to your messages?* If so, that is called "two-way messaging."

More modern messaging channels like WhatsApp always support two-way messaging. With SMS, however, two-way messaging is not always supported; you'll need to make sure that you use the correct number type (if available), or consider an alternative such as WhatsApp.

Check out our [two-way SMS FAQ](https://help.twilio.com/hc/en-us/articles/235288367-Receiving-Two-Way-SMS-and-MMS-Messages-with-Twilio) for more information, or [read about WhatsApp](https://help.twilio.com/hc/en-us/articles/360007721954-Getting-Started-with-Twilio-for-WhatsApp).

If you only need to send one-way messages to your recipients, you generally have more options for sender types. However, you still should consider the countries to which you are sending and your use case - read on for details.

### 2) Where are you sending messages?

> \[!NOTE]
>
> Regulations vary by country, so make sure to check out [country-specific guidelines](https://www.twilio.com/en-us/guidelines/sms) for the countries in which you plan to send SMS.

Not all sender types work in every country, so you should determine in advance where you want to send messages:

#### If you're sending in the US and Canada

In the United States and Canada, you can send messages from a few types of numbers.

* US/Canada 10DLC long code phone numbers
* Short code phone numbers
* US/Canada Toll-Free numbers
* WhatsApp-enabled numbers

Canadian mobile carriers forbid sending application-to-person (A2P) messaging using long code phone numbers, but US Toll-Free numbers can be used for sending A2P traffic on most Canadian carriers. For a comparison of number types for the US and Canada, [see here](https://help.twilio.com/hc/en-us/articles/360038173654-Comparison-of-SMS-messaging-in-the-US-and-Canada-for-long-codes-short-codes-and-toll-free-phone-numbers).

#### If you're sending outside the US and Canada

Outside of the United States and Canada, your possible sender types include:

* Alphanumeric Sender IDs
* Long code phone numbers
* Short code phone numbers
* Toll-free numbers
* WhatsApp-enabled numbers

Only US/Canadian Toll-Free numbers can send A2P SMS. When sending messages to non-US countries, carriers treat US Toll-Free numbers just like any other non-local long code phone number.

#### Consider in-country phone numbers for messaging globally

In some countries, using a local, familiar phone number can improve the read rate of your messages. Using a local number or short code is also required in order to receive incoming replies - see [Receiving Two-Way SMS and MMS Messages with Twilio](https://help.twilio.com/hc/en-us/articles/235288367-Receiving-Two-Way-SMS-and-MMS-Messages-with-Twilio) for details. Depending on your use case and the relevant country regulations, you may want to add in-country numbers to your Messaging Service for each country you want to send SMS to.

### 3) What kind of content are you sending?

When selecting senders for your Messaging Service, also consider the flow of content that you'll send to your customers. Message content affects which sender types are available for you to include in your Messaging Service.

There are two main types of messaging to consider:

#### One-way messaging

Common examples of one-way messaging include marketing messages, delivery alerts and other informational messages.

If you plan to send one-way traffic through your application, you will need to choose your sender type based on what is available and permitted by [local regulations](https://www.twilio.com/en-us/guidelines/sms) for your specific use case in the countries you plan to send messages to. For example, France prohibits the use of local long code numbers for anything except for [pure person-to-person (P2P)](https://help.twilio.com/hc/en-us/articles/223133807-What-is-P2P-and-A2P-messaging-) conversation traffic, so most organizations will need to use an Alphanumeric Sender ID or a short code to send messages to France.

Depending on availability and per-country regulations, you may use one or more of the following sender types in your Messaging Service's Sender Pool:

* Short Codes
* Alphanumeric Sender IDs
* Non-local long code numbers
* In-country local long code phone numbers (where permitted by regulations)
* WhatsApp senders

#### Two-way messaging

Common examples of [two-way messaging](https://help.twilio.com/hc/en-us/articles/235288367-Receiving-Two-Way-SMS-and-MMS-Messages-with-Twilio) are chat bots, virtual assistants, and appointment reminders.

For two-way, back-and-forth messaging, you should include one or more of the following in your Messaging Service's Sender Pool:

* In-country local long code phone numbers
* Short codes
* WhatsApp

## Determine your messaging throughput needs

Message throughput is measured in Messages Segments per Second, but typically abbreviated as MPS. Your throughput needs affects which types and how many senders you should add to your Messaging Service's Sender Pool.

MPS varies by country and by sender type. For US long codes, the MPS you get [depends on the outcome of your A2P 10DLC registration](https://help.twilio.com/hc/en-us/articles/1260803225669-Message-throughput-MPS-and-Trust-Scores-for-A2P-10DLC-in-the-US). For US Toll-Free, the default MPS is 3, but this can be increased. Outside of the US, it's typically 10 (ten) messages per second. For details, see [Understanding Twilio Rate Limits and Message Queues](https://help.twilio.com/hc/en-us/articles/115002943027-Understanding-Twilio-Rate-Limits-and-Message-Queues).

### MPS Considerations for the US and Canada

Using multiple long code or Toll-Free numbers to increase your message throughput to the US or Canada is strongly discouraged as it will result in carrier filtering.

**For the US**, you can get a short code number, which can send messages at 100 MPS or more. Or you can use a single Toll-Free number and talk to Sales about upgrading the number for high-throughput of 25+ MPS.

**For Canada**, short codes (offering 100+ MPS) and TF are the only permitted ways to send A2P traffic. Using long codes to send A2P messaging traffic will result in increased carrier filtering.

### MPS Considerations for the rest of the world

Your options for increasing MPS depend on your traffic type (one-way vs. two-way and A2P vs. P2P, discussed above) and the type of sender(s) you've decided to use.

**Alphanumeric Sender ID:** by default, Alphanumeric Sender ID offers 10 MPS and its use is country specific. To increase MPS on an Alphanumeric Sender ID, talk to Sales or submit a Support request. Include your expected message volume to the country or countries to which you will send messages.

**Long code numbers:** by default, long code numbers sending to non-US/Canada countries offer 10 MPS. The MPS on an individual number cannot be increased, but you can add more numbers.

Twilio has built a highly available, distributed queue, so you don't have to worry about these limits. Your application can send Twilio's Programmable Messaging API requests as quickly as you'd like. We'll queue your messages for you and send them out at the appropriate rate for your senders. This keeps your application in compliance, but this can delay the delivery of your messages.

To find out more details, read [this article about Twilio Rate Limits and Message Queues](https://help.twilio.com/hc/en-us/articles/115002943027-Understanding-Twilio-Rate-Limits-and-Message-Queues).

## Use a short code or toll-free number for higher throughput

> \[!WARNING]
>
> We caution against adding more long code phone numbers to your Messaging Service's Sender Pool to distribute the load, a practice known as "snowshoeing." Instead, consider upgrading to a sender type with higher throughput, such as a [toll-free number or short code](https://www.twilio.com/blog/higher-throughput-toll-free-sms-generally-available), if available in your area.

**If you're sending to a country where Twilio offers short code numbers:** As of Q4 2022, Twilio offers [short code numbers](https://www.twilio.com/en-us/guidelines/short-code) in 14 countries, including the US, Canada, UK, Mexico, and Brazil. Apply for a short code to take advantage of a higher throughput rate, typically starting at 100 messages per second, and robust delivery. Short codes have the advantage of carrier pre-approval; this means that your use case has been reviewed by carriers, greatly reducing filtering risk.

Short codes can only be used to send domestic traffic (e.g., Canadian short codes can only send SMS in Canada.). In addition to using short codes, you should add other numbers or Alpha Sender ID if you plan to send SMS to countries where short codes are not offered, or where a short code does not make sense for your expected message volume.

In the US and Canada, some [smaller mobile carriers may not support short code messages](https://help.twilio.com/hc/en-us/articles/223182088-What-carriers-are-supported-on-Twilio-short-codes-?_ga=2.168829737.90227006.1597681198-70084276.1582139191). To achieve the highest levels of deliverability, you should add a few long codes to your messaging service. In the US and Canada, the **Short Code Reroute feature** will send from a long code phone number when a short code is not supported.

**If you're sending to a country where Twilio does not offer short code numbers:** Consult the [SMS Guidelines](https://www.twilio.com/en-us/guidelines/sms) for the country in question, and add appropriate numbers to your Messaging Service depending on your use case. For example, for 1-way messaging to many countries in the world, you can add US/Canada numbers to your Messaging Service, or enable Alphanumeric Sender ID.

## Alphanumeric Sender IDs and Throughput

If you are using an [alphanumeric sender ID](/docs/glossary/what-alphanumeric-sender-id), it will take precedence over the other phone numbers in your Messaging Service sender pool, *even if it has queued messages*. Message delivery does not fall back from alphanumeric sender IDs to the long code phone numbers in your sender pool.

If you are planning to use an alphanumeric sender ID in a supported country, make sure that you get the right MPS rate for it. You can request higher throughput on your alphanumeric sender ID through Support.

## Time to get scaling

When you're ready to scale with Twilio Programmable Messaging, we highly recommend moving your application to a Messaging Service, if you have not already done so. That way, you'll have access to all of the built-in features that help you send messages globally and at high-volume, all while managing a single sender pool.

The fastest way to scale your messaging application is to identify your use case and messaging needs from the start. Knowing where you'll be sending messages, what type of content you'll send to customers, and how quickly you need those messages to be sent will point you to the right sender types to include in your Messaging Service.

Also check out:

* [Twilio Messaging Services](/docs/messaging/services)
* [Country-specific Guidelines](https://www.twilio.com/en-us/guidelines)
* [Understanding Rate Limits and Message Queues](https://help.twilio.com/hc/en-us/articles/115002943027-Understanding-Twilio-Rate-Limits-and-Message-Queues)
* [How does Carrier Filtering Work?](https://help.twilio.com/hc/en-us/articles/223181848-How-Does-Carrier-Filtering-Work-)
