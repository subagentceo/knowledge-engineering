# Link Shortening

> \[!NOTE]
>
> The Link Shortening feature is only available for use with [Messaging Services](/docs/messaging/services).

> \[!NOTE]
>
> Link Shortening is part of [Engagement Suite](https://www.twilio.com/en-us/blog/engagement-suite). Visit the [SMS Pricing page](https://www.twilio.com/en-us/sms/pricing/us#SMS-features) and [WhatsApp Pricing page](https://www.twilio.com/en-us/whatsapp/pricing#features) for price details..

Link Shortening is a Messaging Services feature that allows you to send messages with shortened links using your own company-branded domain. Twilio also provides [click tracking](#track-customer-engagement-with-click-events) with the Link Shortening feature, so you can track customer engagement with your messages' shortened links.

When you use Link Shortening, Twilio converts long links in the message body into unique shortened links. The shortened links contain your Link Shortening domain, followed by ten alphanumeric characters.

Link Shortening and click tracking are included in Engagement Suite. To learn more about Engagement Suite pricing, see the pricing pages for [SMS/MMS](https://www.twilio.com/en-us/sms/pricing/us) or [WhatsApp](https://www.twilio.com/en-us/whatsapp/pricing).

With Link Shortening, Twilio changes a message like the following:

```text
Visit this link to start earning rewards today! https://twilio.com/N6uAirXeREkpV2MW7kpV2MW7...
```

into a message that resembles this:

```text
Visit this link to start earning rewards today! https://twil.io/j9kj9K3huK9u7...
```

You must own the domain you use for link shortening (just as Twilio owns `twil.io`).

## Shortened links

Consider the following scenario:

* You've onboarded your domain and Messaging Service for Link Shortening
* Your Link Shortening domain is `https://twil.io`
* You [create a Message with a link you want to shorten](#send-a-message-with-a-shortened-link). The `Body` contains the following:

```text
Thanks for signing up for Acme, Inc. rewards!
Click on the link to start saving today! https://twilio.com/kpV2MWAvh1zn4gET1zn4gEFkpVAvh1bAvh1zn4gEF
```

> \[!NOTE]
>
> Does your link contain special characters? If so, make sure to encode them in the message body for the URL to remain valid.

At send time, Twilio:

* Creates a redirect from `https://twilio.com/kpV2MWAvh1zn4gET1zn4gEFkpVAvh1bAvh1zn4gEF` to `https://twil.io/j9K3huK9u7`
* Replaces the long link in the `Body` of the message.
* Delivers the following message to the recipient:

```text
Thanks for signing up for Acme, Inc. rewards!
Click on the link to start saving today! https://twil.io/j9K3huK9u7
```

## Link expiration

Twilio stores original link and shortened link association information for 90 days. Within those 90 days, clicks on the shortened link are redirected to the original long link.

After 90 days, the link "expires." If a customer clicks on an expired shortened link, they are redirected to a fallback URL and [click events](#track-customer-engagement-with-click-events) are no longer sent to your callback URL.

The fallback URL is configured when you [set up Link Shortening](/docs/messaging/features/link-shortening/onboarding-guide).

## Track customer engagement with click events

The Link Shortening feature also allows you to receive data whenever a customer clicks on a shortened link. Device-generated link previews are also distinguishable in the click event type. You can use this information to measure marketing campaign effectiveness, track individual recipient engagement, or implement a customized workflow whenever a shortened link is visited.

For each "click event", Twilio sends a `POST` request to your provided endpoint containing details about the event such as:

* The type of click event: click or preview
* The number or channel address of the recipient (that is, the `To` parameter of the original Message)
* The original long link that was shortened
* The time the recipient clicked on the link

An example of a click event callback request from Twilio is shown below:

```json
{
  "event_type": "click",
  "sms_sid": "SMxxx",
  "to": "+15554567890",
  "from": "+15557654321",
  "link": "https://www.longlink.com/original_link",
  "click_time": "2022-10-24T17:17:26.529Z",
  "messaging_service_sid": "MGxxx",
  "account_sid": "ACxxx",
  "user_agent": "some_user_agent"
}

```

The table below describes each property in click event callback requests from Twilio:

| Property                | Description                                                                                                                                                 |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `event_type`            | The type of event. The value is `click` or `preview`.                                                                                                       |
| `sms_sid`               | The SID of the Message resource that contained the shortened link.                                                                                          |
| `to`                    | The `To` value of the original Message resource. This is the recipient’s phone number or channel address (for example, `whatsapp:+15558887474`).            |
| `from`                  | The `From` number of the Message. This is a phone number or channel address from your Messaging Service's sender pool.                                      |
| `link`                  | The original long link. This shortened link redirected to this link.                                                                                        |
| `click_time`            | The [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) timestamp of when the customer clicked on the shortened link or when the link preview was generated. |
| `messaging_service_sid` | The SID of the Messaging Service that sent the Message.                                                                                                     |
| `account_sid`           | The SID of the Twilio Account that sent the Message.                                                                                                        |
| `user_agent`            | The user agent that accessed the link. Example: `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)`                                                           |

You can configure a click event callback URL when you [onboard with Link Shortening](/docs/messaging/features/link-shortening/onboarding-guide).

Twilio doesn't send click event information once a [link has expired](#link-expiration) or outside of your Messaging records retention period (see below).

Click event information is also available via [Event Stream](/docs/events) subscription.

### Messaging records and click events

If you've configured a custom [retention period for your Messaging records](https://help.twilio.com/hc/en-us/articles/223181008-Twilio-SMS-message-and-traffic-storage#:~:text=Message%20data%20retention%20period%20for,message%20is%20created%2C%20by%20default), make sure your retention period is **at least 90 days**. (By default, the retention period is 400 days.)

Although shortened links are valid for 90 days, click events are not generated beyond your Account's retention period.

To configure your custom retention period, open the Twilio Console and go to **Products & Services** > **Messaging** > **Settings** > **General** > **Message Records Data Access and Backup** ([Console](https://1console.twilio.com/us1/develop/sms/settings/general) | [Legacy Console](https://console.twilio.com/us1/develop/sms/settings/general)).

## Send a message with a shortened link

> \[!NOTE]
>
> Link Shortening only works after you've completed [the steps in the onboarding guide](/docs/messaging/features/link-shortening/onboarding-guide). Read the rest of this page before you begin onboarding.

> \[!NOTE]
>
> Does your link contain special characters? If so, make sure to encode them in the message body for the URL to remain valid.

To send a message with a shortened link, send a `POST` request to the Messages list URI (like you do for messages without shortened links) with two additional parameters: `ShortenUrls` and `MessagingServiceSid`.

* The `ShortenUrls` parameter's value must be `true`.
* The `MessagingServiceSid` parameter value must be the SID of the Messaging Service associated with your Link Shortening domain.
* You must also include the `To` parameter, which is required for all Messages
* The link you want to shorten is included in the `Body` parameter

### Send an SMS with a shortened link

The code sample below shows how to send an SMS message with a shortened link.

* The `POST` request contains the required `To`, `ShortenUrls` and `MessagingServiceSid` parameters, and the `Body` parameter contains a long link (not shortened).

> \[!NOTE]
>
> When you send a link shortening `POST` request, the `body` parameter in the response will contain the original URL. This is because the `status` of the message is `queued`. To learn more about message statuses, review [Initial status of a Message resource](/docs/messaging/guides/outbound-message-status-in-status-callbacks#initial-status-of-a-message-resource).

Send an SMS with a shortened link

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
    body: "Visit this link to start earning rewards today! https://example.com/N6uAirXeREkpV2MW7kpV2MW7TAvh1zn4gEFMTAvh1zn4gEFMN6uAirXeRE",
    messagingServiceSid: "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    shortenUrls: true,
    to: "+15272727727",
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
    shorten_urls=True,
    messaging_service_sid="MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    to="+15272727727",
    body="Visit this link to start earning rewards today! https://example.com/N6uAirXeREkpV2MW7kpV2MW7TAvh1zn4gEFMTAvh1zn4gEFMN6uAirXeRE",
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
            shortenUrls: true,
            messagingServiceSid: "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            to: new Twilio.Types.PhoneNumber("+15272727727"),
            body: "Visit this link to start earning rewards today! https://example.com/N6uAirXeREkpV2MW7kpV2MW7TAvh1zn4gEFMTAvh1zn4gEFMN6uAirXeRE");

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
                              .creator(new com.twilio.type.PhoneNumber("+15272727727"),
                                  "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                                  "Visit this link to start earning rewards today! "
                                  + "https://example.com/N6uAirXeREkpV2MW7kpV2MW7TAvh1zn4gEFMTAvh1zn4gEFMN6uAirXeRE")
                              .setShortenUrls(true)
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
	params.SetShortenUrls(true)
	params.SetMessagingServiceSid("MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
	params.SetTo("+15272727727")
	params.SetBody("Visit this link to start earning rewards today! https://example.com/N6uAirXeREkpV2MW7kpV2MW7TAvh1zn4gEFMTAvh1zn4gEFMN6uAirXeRE")

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
    "+15272727727", // To
    [
        "shortenUrls" => true,
        "messagingServiceSid" => "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "body" =>
            "Visit this link to start earning rewards today! https://example.com/N6uAirXeREkpV2MW7kpV2MW7TAvh1zn4gEFMTAvh1zn4gEFMN6uAirXeRE",
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
            shorten_urls: true,
            messaging_service_sid: 'MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            to: '+15272727727',
            body: 'Visit this link to start earning rewards today! https://example.com/N6uAirXeREkpV2MW7kpV2MW7TAvh1zn4gEFMTAvh1zn4gEFMN6uAirXeRE'
          )

puts message.body
```

```bash
EXCLAMATION_MARK='!'
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:create \
   --shorten-urls \
   --messaging-service-sid MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --to +15272727727 \
   --body "Visit this link to start earning rewards today$EXCLAMATION_MARK https://example.com/N6uAirXeREkpV2MW7kpV2MW7TAvh1zn4gEFMTAvh1zn4gEFMN6uAirXeRE"
```

```bash
EXCLAMATION_MARK='!'
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json" \
--data-urlencode "ShortenUrls=true" \
--data-urlencode "MessagingServiceSid=MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
--data-urlencode "To=+15272727727" \
--data-urlencode "Body=Visit this link to start earning rewards today$EXCLAMATION_MARK https://example.com/N6uAirXeREkpV2MW7kpV2MW7TAvh1zn4gEFMTAvh1zn4gEFMN6uAirXeRE" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXX",
  "api_version": "2010-04-01",
  "body": "Visit this link to start earning rewards today! https://example.com/N6uAirXeREkpV2MW7kpV2MW7TAvh1zn4gEFMTAvh1zn4gEFMN6uAirXeRE",
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
  "messaging_service_sid": "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "queued",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media.json"
  },
  "to": "+15272727727",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

### Fetch an SMS with a shortened link

The code sample below shows how to retrieve the previously sent SMS containing the shortened URL.

* The `GET` request contains the required Message `Sid` parameter.
* The resulting SMS message received by the customer contains a shortened link.

```json
GET "https://api.twilio.com/2010-04-01/Accounts/{AccountSid}/Messages/{Sid}.json"
```

```json
{
    "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "api_version": "2010-04-01",
    "body": "Visit the link to start earning rewards today! https://example.com/j9kj9K3huK",
    "date_created": "Thu, 30 Jul 2015 20:12:31 +0000",
    "date_sent": "Thu, 30 Jul 2015 20:12:33 +0000",
    "date_updated": "Thu, 30 Jul 2015 20:12:33 +0000",
    "direction": "outbound-api",
    "error_code": null,
    "error_message": null,
    "from": "+15555238886",
    "messaging_service_sid": "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "num_media": "0",
    "num_segments": "1",
    "price": null,
    "price_unit": null,
    "sid": "SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    "status": "sent",
    "subresource_uris": {
        "media": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Media.json"
    },
    "to": "+15551212121",
    "uri": "/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX/Messages/SMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.json"
}
```

### Send a WhatsApp message with a shortened link

The code sample below shows how to send a WhatsApp message with a shortened link. This assumes that you've [onboarded your WhatsApp Business Account with Twilio](/docs/whatsapp/api).

* The `POST` request contains the required `To`, `ShortenUrls` and `MessagingServiceSid` parameters, and the `Body` parameter contains a long link (not shortened).
* The resulting WhatsApp message received by the customer contains a shortened link.

Send a WhatsApp message with a shortened link

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
    body: "Visit this link to start earning rewards today! https://example.com/N6uAirXeREkpV2MW7kpV2MW7TAvh1zn4gEFMTAvh1zn4gEFMN6uAirXeRE",
    messagingServiceSid: "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    shortenUrls: true,
    to: "whatsapp:+15551212121",
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
    shorten_urls=True,
    messaging_service_sid="MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    to="whatsapp:+15551212121",
    body="Visit this link to start earning rewards today! https://example.com/N6uAirXeREkpV2MW7kpV2MW7TAvh1zn4gEFMTAvh1zn4gEFMN6uAirXeRE",
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
            shortenUrls: true,
            messagingServiceSid: "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
            to: new Twilio.Types.PhoneNumber("whatsapp:+15551212121"),
            body: "Visit this link to start earning rewards today! https://example.com/N6uAirXeREkpV2MW7kpV2MW7TAvh1zn4gEFMTAvh1zn4gEFMN6uAirXeRE");

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
                              .creator(new com.twilio.type.PhoneNumber("whatsapp:+15551212121"),
                                  "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
                                  "Visit this link to start earning rewards today! "
                                  + "https://example.com/N6uAirXeREkpV2MW7kpV2MW7TAvh1zn4gEFMTAvh1zn4gEFMN6uAirXeRE")
                              .setShortenUrls(true)
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
	params.SetShortenUrls(true)
	params.SetMessagingServiceSid("MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX")
	params.SetTo("whatsapp:+15551212121")
	params.SetBody("Visit this link to start earning rewards today! https://example.com/N6uAirXeREkpV2MW7kpV2MW7TAvh1zn4gEFMTAvh1zn4gEFMN6uAirXeRE")

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
    "whatsapp:+15551212121", // To
    [
        "shortenUrls" => true,
        "messagingServiceSid" => "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
        "body" =>
            "Visit this link to start earning rewards today! https://example.com/N6uAirXeREkpV2MW7kpV2MW7TAvh1zn4gEFMTAvh1zn4gEFMN6uAirXeRE",
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
            shorten_urls: true,
            messaging_service_sid: 'MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            to: 'whatsapp:+15551212121',
            body: 'Visit this link to start earning rewards today! https://example.com/N6uAirXeREkpV2MW7kpV2MW7TAvh1zn4gEFMTAvh1zn4gEFMN6uAirXeRE'
          )

puts message.body
```

```bash
EXCLAMATION_MARK='!'
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:create \
   --shorten-urls \
   --messaging-service-sid MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX \
   --to whatsapp:+15551212121 \
   --body "Visit this link to start earning rewards today$EXCLAMATION_MARK https://example.com/N6uAirXeREkpV2MW7kpV2MW7TAvh1zn4gEFMTAvh1zn4gEFMN6uAirXeRE"
```

```bash
EXCLAMATION_MARK='!'
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json" \
--data-urlencode "ShortenUrls=true" \
--data-urlencode "MessagingServiceSid=MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" \
--data-urlencode "To=whatsapp:+15551212121" \
--data-urlencode "Body=Visit this link to start earning rewards today$EXCLAMATION_MARK https://example.com/N6uAirXeREkpV2MW7kpV2MW7TAvh1zn4gEFMTAvh1zn4gEFMN6uAirXeRE" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXX",
  "api_version": "2010-04-01",
  "body": "Visit this link to start earning rewards today! https://example.com/N6uAirXeREkpV2MW7kpV2MW7TAvh1zn4gEFMTAvh1zn4gEFMN6uAirXeRE",
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
  "messaging_service_sid": "MGXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "queued",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media.json"
  },
  "to": "whatsapp:+15551212121",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

## Account-based rate limits

Link Shortening has an Account-based rate limit of 2000 requests per second.

Twilio shortens links at **send time**. Therefore, Twilio receives a "Link Shortening request" in the following situations:

* When Twilio receives a `POST` request to create a Message resource with `ShortenLinks` set to `true`
* At the `SendTime` of a scheduled message with `ShortenLinks` set to `true`

If you exceed the rate limit, messages aren't sent and a [20429 error code](/docs/api/errors/20429) is emitted.

## Link shortening outages

If there is an error with Link Shortening, you can configure how Twilio handles the situation. For example, errors can occur due to changes to your domain verification or an expired certificate. You can tell Twilio to send messages with the original long links or to not send the messages.

The default behavior is to continue sending messages with the original long links. This may result in multiple [message segments](https://www.twilio.com/blog/what-the-heck-is-a-segment.html), which may incur higher costs. This setting only affects Messages with a `ShortenUrls` parameter set to `true`.

You can configure this preference when you set up Link Shortening on your account.

## Next steps

* Get started with Link Shortening by [following the onboarding guide](/docs/messaging/features/link-shortening/onboarding-guide)
