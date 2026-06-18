# Track the Message Status of Outbound Messages

This guide shows you how to use Twilio's status callbacks to track changes of the message status of outbound messages you send with [Programmable Messaging](/docs/messaging).

Message status changes occur throughout the lifecycle of a message from creation, through sending, to delivery, and even read receipt for supporting messaging channels.

> \[!NOTE]
>
> The guide focuses on outbound messages created using the [Message Resource](/docs/messaging/api/message-resource) of the [Programmable Messaging REST API](/docs/messaging/api) and covers the necessary considerations when using a [Messaging Service](/docs/messaging/services).

## Before you begin

Before you dive into this guide, make sure you're familiar with the following concepts:

* Know how to send a message by using the Programmable Messaging API. You can follow a [Messaging Quickstart](/docs/messaging/quickstart) in the programming language of your choice.
* Review our guide [Outbound Message Status in Status Callbacks](/docs/messaging/guides/outbound-message-status-in-status-callbacks) to understand for which status changes Twilio sends a status callback request.
* If you send high volumes of messages or schedule messages, learn what a [Messaging Service](/docs/messaging/services) is and [how to use one to send a message](/docs/messaging/api/message-resource#send-a-message-with-a-messaging-service).
* The status callbacks covered in this guide are Twilio webhooks. Check out our guide to [Getting Started with Twilio Webhooks](/docs/usage/webhooks/getting-started-twilio-webhooks). Find other webhook pages, such as a [security guide](/docs/usage/webhooks/webhooks-security) and [FAQ](/docs/usage/webhooks/webhooks-faq) in the [Webhooks](/docs/usage/webhooks) section of the docs.

**Note**: The code samples in this guide require some local setup steps. Select your language of choice below to learn how to set up your development environment:

* [Node.js](/docs/usage/tutorials/how-to-set-up-your-node-js-and-express-development-environment)
* [Python](/docs/usage/tutorials/how-to-set-up-your-python-and-flask-development-environment)
* [C# and ASP.NET MVC](/docs/usage/tutorials/how-to-set-up-your-csharp-and-asp-net-mvc-development-environment)
* [PHP](/docs/usage/tutorials/how-to-set-up-your-php-development-environment)
* [Java](/docs/usage/tutorials/how-to-set-up-your-java-development-environment)
* [Ruby](/docs/usage/tutorials/how-to-set-up-your-ruby-and-sinatra-development-environment)
* [Go](/docs/usage/tutorials/how-to-set-up-your-go-and-gin-development-environment)

## How to track outbound message status

Tracking the message status of an outbound message is a two-step process:

1. [Set up a status callback endpoint](#step-1-set-up-a-status-callback-endpoint)

   * [How are status callback requests sent?](#how-are-status-callback-requests-sent)
   * [Implement a status callback handler (simplified example)](#implement-a-status-callback-handler-simplified-example)
2. [Send a message with status callback URL](#step-2-send-a-message-with-status-callback-url)

   * [Scenario 1: No Messaging Service](#scenario-1-no-messaging-service)
   * [Scenario 2: Messaging Service used](#scenario-2-messaging-service-used)

## Step 1. Set up a status callback endpoint

To track the message status of an outbound message, you must first create an API endpoint that:

* Is served under a publicly accessible URL (the status callback URL)
* Implements a status callback handler for Twilio's message status callback HTTP requests.

> \[!WARNING]
>
> A status callback URL must contain a valid hostname. Underscores are *not* allowed.

How you implement your status callback endpoint depends on your use case and technology preferences. This may mean you

* Create and host a small web application to handle the requests in the programming language and framework of your choice
* Add an additional new endpoint to your existing web application
* Use a serverless framework like [Twilio Serverless Functions](/docs/serverless/functions-assets/functions).

### How are status callback requests sent?

Twilio sends status callback requests as `POST` requests with the `Content-Type` set to `application/x-www-form-urlencoded`.

> \[!WARNING]
>
> The properties included in Twilio's request to the StatusCallback URL vary by messaging channel and event type and are subject to change.
>
> Twilio occasionally adds new properties without advance notice.
>
> When integrating with status callback requests, it is important that your implementation is able to accept and correctly run [signature validation](/docs/usage/webhooks/webhooks-security) on an evolving set of parameters.
>
> Twilio strongly recommends using the signature validation methods provided in the SDKs and not implementing your own signature validation.

In a status callback request, Twilio provides a subset of the [standard request properties](/docs/messaging/guides/webhook-request#request-parameters), and additionally `MessageStatus` and `ErrorCode`. These properties are described in the table below.

| Property        | Description                                                                                                                                        |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MessageStatus` | The [status](/docs/messaging/api/message-resource#message-status-values) of the Message resource at the time the status callback request was sent. |
| `ErrorCode`     | If an error occurred (i.e. the `MessageStatus` is `failed` or `undelivered`), this property provides additional information about the failure.     |

For example, a status callback request sent when the Message resource for an outbound SMS changes `status` to `sent`, may contain the following content:

```bash
"AccountSid": "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
"From": "+15017250604"
"MessageSid": "SM1342fe1b2c904d1ab04f0fc7a58abca9"
"MessageStatus": "sent"
"SmsSid": "SM1342fe1b2c904d1ab04f0fc7a58abca9"
"SmsStatus": "sent"
```

#### SMS/MMS

For most SMS/MMS Messages that have a `Status` of `delivered` or `undelivered`, Twilio's request to the `StatusCallback` URL contains an additional property:

| Property         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `RawDlrDoneDate` | This property is a passthrough of the Done Date included in the DLR (Delivery Receipt) that Twilio received from the carrier.<br /><br /> The value is in `YYMMDDhhmm` format.<ul><li>`YY` is last two digits of the year (00-99)</li><li>`MM` is the two-digit month (01-12)</li><li>`DD` is the two-digit day (01-31)</li><li>`hh` is the two-digit hour (00-23)</li><li>`mm` is the two-digit minute (00-59).</li></ul> Learn more on the ["Addition of RawDlrDoneDate to Delivered and Undelivered Status Webhooks" Changelog page](https://www.twilio.com/en-us/changelog/addition-of-rawdlrdonedate-to-delivered-and-undelivered-status-webhooks). |

#### RCS, WhatsApp, and other messaging channels

If the Message resource uses RCS, WhatsApp, or another messaging channel, Twilio's request to the `StatusCallback` URL contains additional properties. These properties are listed in the table below.

| Property               | Description                                                                                                                                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ChannelInstallSid`    | The [Installed Channel](/docs/messaging/channels) SID that was used to send this message                                                                                                                     |
| `ChannelStatusMessage` | The error message returned by the underlying messaging channel if Message delivery failed. This property is present only if the Message delivery failed.                                                     |
| `ChannelPrefix`        | The channel-specific prefix identifying the messaging channel associated with this Message                                                                                                                   |
| `EventType`            | This property contains information about post-delivery events. If the channel supports read receipts (currently RCS and WhatsApp), this property's value is `READ` after the recipient has read the message. |

### Implement a status callback handler (simplified example)

> \[!NOTE]
>
> You may want to explore how status callback requests behave before working through your actual implementation. A lightweight way to accomplish this goal is to use **[Twilio Serverless Functions](/docs/serverless/functions-assets/functions)** and inspect status callbacks [in the Console by using the Function Editor's debugging feature](/docs/serverless/functions-assets/functions/debugging).
>
> 1. Log into your Twilio Account
> 2. If you do not already have a suitable [Functions and Assets Service](https://console.twilio.com/us1/develop/functions/services) in your Console, you can [create a new service](/docs/serverless/functions-assets/functions/create-service) for your status callback handler endpoint. Let's assume you created a new service under the name `status-callback-prototyping`.
> 3. From your service go to the [Functions Editor](/docs/serverless/functions-assets/functions#get-started-with-serverless-and-twilio-functions) to **Add** a new Function e.g. under the path `/message-status` with the following handler code:
>
> ```javascript
> // Log Status Callback requests
>
> exports.handler = function(context, event, callback) {
>   console.log("Invoked with: ", event);
>   return callback(null, "OK");
> };
> ```
>
> By default your new serverless function is [created as a protected endpoint](/docs/serverless/functions-assets/visibility#protected), which means Twilio Serverless performs signature validation to ensure only valid Twilio requests invoke your handler.
>
> 4. **Save** the new function.
> 5. Deploy your new serverless function by pressing **Deploy All**.
> 6. Change the toggle control above the bottom-right corner logging window to **Live logs on**.
> 7. Click on the **Copy URL** link above the bottom-right logging window to copy the URL for your prototype status callback endpoint into your clipboard. The copied URL would look something like this: `https://status-callback-prototyping-1234.twil.io/message-status`.
>
> You can now use your copied status callback URL in the next step of this guide: [Step 2. Send a message with status callback URL](#step-2-send-a-message-with-status-callback-url).
>
> 8. Once you sent a message, you can inspect the logged status callback request in the bottom-right logging window of the Functions Editor in Console.
>
> ![Twilio Functions Editor showing message-status function with code to log status callback requests.](https://docs-resources.prod.twilio.com/f5e1b1b84fb3ab3d2ac3b6005b8477e754a9973116e30dc6478fc9a55762fe4c.png)

Your response to Twilio's status callback request should have an HTTP status code of `200` (OK). No response content is required.

What your status callback handler should do when receiving a status callback request, depends on your use case.

The following simplified web application illustrates how you could log the `MessageSid` and `MessageStatus` of outbound messages as they move through their lifecycle.

> \[!WARNING]
>
> Status callback requests are HTTP requests and are therefore subject to differences in latency caused by changing network conditions.
>
> Status callback requests are sent in accordance with the message status transitions described in the guide [Outbound Message Status in Status Callbacks](/docs/messaging/guides/outbound-message-status-in-status-callbacks). Some of these status transitions may occur in quick succession.
>
> As a result, there is no guarantee that the status callback requests always arrive at your endpoint in the order they were sent.
>
> You should bear this consideration in mind when implementing your status callback handler.

> \[!NOTE]
>
> Read our guide [Best Practices for Messaging Delivery Status Logging](/docs/messaging/guides/outbound-message-logging) for advanced considerations when implementing a production-grade status logging solution.

Handle a Message status callback request

```js
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/message-status', (req, res) => {
  const messageSid = req.body.MessageSid;
  const messageStatus = req.body.MessageStatus;

  console.log(`SID: ${messageSid}, Status: ${messageStatus}`);

  res.sendStatus(200);
});

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});
```

```py
from flask import Flask, request
import logging

logging.basicConfig(level=logging.INFO)

app = Flask(__name__)


@app.route("/message-status", methods=['POST'])
def incoming_sms():
    message_sid = request.values.get('MessageSid', None)
    message_status = request.values.get('MessageStatus', None)
    logging.info('SID: {}, Status: {}'.format(message_sid, message_status))

    return ('', 204)


if __name__ == "__main__":
    app.run(debug=True)
```

```cs
// In Package Manager, run:
// Install-Package Twilio.Mvc -DependencyVersion HighestMinor

using System.Diagnostics;
using System.Web.Mvc;

public class MessageStatusController : Controller
{
    [HttpPost]
    public ActionResult Index()
    {
        // Log the message id and status
        var smsSid = Request.Form["MessageSid"];
        var messageStatus = Request.Form["MessageStatus"];
        var logMessage = $"\"{smsSid}\", \"{messageStatus}\"";

        Trace.WriteLine(logMessage);
        return Content("Handled");
    }
}
```

```java
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet(name = "MessageStatus", urlPatterns = {"/message-status"})
public class MessageStatus extends HttpServlet {
    public void service(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String messageSid = request.getParameter("MessageSid");
        String messageStatus = request.getParameter("MessageStatus");
        
        System.out.println("SID: " + messageSid + ", Status:" + messageStatus);
    }
}
```

```go
package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.POST("/message-status", func(c *gin.Context) {

		messageSid := c.PostForm("MessageSid")
		messageStatus := c.PostForm("MessageStatus")

		fmt.Printf("MessageSid: %s, MessageStatus: %s ", messageSid, messageStatus)

		c.JSON(http.StatusOK, nil)
	})

	router.Run(":3000")
}
```

```php
<?php
$sid = $_REQUEST['MessageSid'];
$status = $_REQUEST['MessageStatus'];

openlog("myMessageLog", LOG_PID | LOG_PERROR, LOG_USER);
syslog(LOG_INFO, "SID: $sid, Status: $status");
closelog();
```

```rb
require 'sinatra'

# Handle message status hook,
# which is called whenever the message status changes
post '/message-status' do
  message_sid = params['MessageSid']
  message_status = params['MessageStatus']

  print "SID: #{message_sid}, Status: #{message_status}\n"

  response.status = 204
end
```

## Step 2. Send a message with status callback URL

In Step 1 you implemented a status callback handler which is publicly available at your status callback URL.

In this step you learn how to ensure Twilio sends status callback requests to your status callback URL for outbound messages.

How you do this may depend on whether you use a Messaging Service to send messages or not.

### Scenario 1: No Messaging Service

For Twilio to send status callback requests, you need to provide your status callback URL in the `StatusCallback` parameter of each message for which you want to track the `MessageStatus`.

To get the following code sample to run, replace these values:

1. Replace the `From` phone number with [one of your Twilio numbers](/console/phone-numbers/incoming)
2. Replace the `To` number with your mobile number
3. Replace the `StatusCallback` URL with your status callback URL

Send a Message without Messaging Service with a StatusCallback URL

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
    body: "McAvoy or Stewart? These timelines can get so confusing.",
    from: "+15017122661",
    statusCallback: "http://example.com/MessageStatus",
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
    body="McAvoy or Stewart? These timelines can get so confusing.",
    from_="+15017122661",
    status_callback="http://example.com/MessageStatus",
    to="+15558675310",
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
            body: "McAvoy or Stewart? These timelines can get so confusing.",
            from: new Twilio.Types.PhoneNumber("+15017122661"),
            statusCallback: new Uri("http://example.com/MessageStatus"),
            to: new Twilio.Types.PhoneNumber("+15558675310"));

        Console.WriteLine(message.Body);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.type.PhoneNumber;
import java.net.URI;
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
                                  new com.twilio.type.PhoneNumber("+15017122661"),
                                  "McAvoy or Stewart? These timelines can get so confusing.")
                              .setStatusCallback(URI.create("http://example.com/MessageStatus"))
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
	params.SetBody("McAvoy or Stewart? These timelines can get so confusing.")
	params.SetFrom("+15017122661")
	params.SetStatusCallback("http://example.com/MessageStatus")
	params.SetTo("+15558675310")

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
        "body" => "McAvoy or Stewart? These timelines can get so confusing.",
        "from" => "+15017122661",
        "statusCallback" => "http://example.com/MessageStatus",
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
            body: 'McAvoy or Stewart? These timelines can get so confusing.',
            from: '+15017122661',
            status_callback: 'http://example.com/MessageStatus',
            to: '+15558675310'
          )

puts message.body
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:create \
   --body "McAvoy or Stewart? These timelines can get so confusing." \
   --from +15017122661 \
   --status-callback http://example.com/MessageStatus \
   --to +15558675310
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json" \
--data-urlencode "Body=McAvoy or Stewart? These timelines can get so confusing." \
--data-urlencode "From=+15017122661" \
--data-urlencode "StatusCallback=http://example.com/MessageStatus" \
--data-urlencode "To=+15558675310" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "body": "McAvoy or Stewart? These timelines can get so confusing.",
  "date_created": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_sent": "Thu, 24 Aug 2023 05:01:45 +0000",
  "date_updated": "Thu, 24 Aug 2023 05:01:45 +0000",
  "direction": "outbound-api",
  "error_code": null,
  "error_message": null,
  "from": "+15017122661",
  "num_media": "0",
  "num_segments": "1",
  "price": null,
  "price_unit": null,
  "messaging_service_sid": "MGaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "sid": "SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "status": "queued",
  "subresource_uris": {
    "media": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Media.json"
  },
  "to": "+15558675310",
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Messages/SMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json"
}
```

### Scenario 2: Messaging Service used

Messaging Services can be configured to have a service-level Delivery Status Callback. When [creating a new Messaging Service in Console](/docs/messaging/tutorials/send-messages-with-messaging-services#create-and-configure-a-messaging-service), you can specify this service-level Delivery Status Callback in **Step 3 - Set up Integrations**.

You can use the status callback URL from Step 1 of this guide for this Delivery Status Callback integration. If you do so, you do not have to provide the status callback URL as a message-specific parameter.

Alternatively, you can provide a message-specific status callback URL in the `StatusCallback` parameter for a message created with the Messaging Service.

Which of these two options is more appropriate depends on your use case.

#### Option 1 - Use Service-level Delivery Status Callback

To get the following code sample to run, replace these values:

1. Replace the `MessagingServiceSid` with the SID of one of your Messaging Services that has a Delivery Status Callback integration configured in Console
2. Replace the `To` number with your mobile number

Send a Message using Messaging Service with Delivery Status Callback Integration

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
    body: "McAvoy or Stewart? These timelines can get so confusing.",
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
    body="McAvoy or Stewart? These timelines can get so confusing.",
    to="+15558675310",
    messaging_service_sid="MG9752274e9e519418a7406176694466fa",
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
            body: "McAvoy or Stewart? These timelines can get so confusing.",
            to: new Twilio.Types.PhoneNumber("+15558675310"),
            messagingServiceSid: "MG9752274e9e519418a7406176694466fa");

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
                                  "McAvoy or Stewart? These timelines can get so confusing.")
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
	params.SetBody("McAvoy or Stewart? These timelines can get so confusing.")
	params.SetTo("+15558675310")
	params.SetMessagingServiceSid("MG9752274e9e519418a7406176694466fa")

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
        "body" => "McAvoy or Stewart? These timelines can get so confusing.",
        "messagingServiceSid" => "MG9752274e9e519418a7406176694466fa",
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
            body: 'McAvoy or Stewart? These timelines can get so confusing.',
            to: '+15558675310',
            messaging_service_sid: 'MG9752274e9e519418a7406176694466fa'
          )

puts message.body
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:create \
   --body "McAvoy or Stewart? These timelines can get so confusing." \
   --to +15558675310 \
   --messaging-service-sid MG9752274e9e519418a7406176694466fa
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json" \
--data-urlencode "Body=McAvoy or Stewart? These timelines can get so confusing." \
--data-urlencode "To=+15558675310" \
--data-urlencode "MessagingServiceSid=MG9752274e9e519418a7406176694466fa" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "body": "McAvoy or Stewart? These timelines can get so confusing.",
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

#### Option 2 - Use Message-specific status callback URL

> \[!NOTE]
>
> If your Messaging Service has a service-level Delivery Status Callback configured in the Console and you provide a message-specific `StatusCallback` URL, Twilio sends status callback requests to the message-specific `StatusCallback` URL.

To get the following code sample to run, replace these values:

1. Replace the `MessagingServiceSid` with the SID of one of your Messaging Services
2. Replace the `To` number with your mobile number
3. Replace the `StatusCallback` URL with your status callback URL

Send a Message using Messaging Service and StatusCallback URL

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
    body: "McAvoy or Stewart? These timelines can get so confusing.",
    messagingServiceSid: "MG9752274e9e519418a7406176694466fa",
    statusCallback: "http://example.com/MessageStatus",
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
    body="McAvoy or Stewart? These timelines can get so confusing.",
    to="+15558675310",
    messaging_service_sid="MG9752274e9e519418a7406176694466fa",
    status_callback="http://example.com/MessageStatus",
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
            body: "McAvoy or Stewart? These timelines can get so confusing.",
            to: new Twilio.Types.PhoneNumber("+15558675310"),
            messagingServiceSid: "MG9752274e9e519418a7406176694466fa",
            statusCallback: new Uri("http://example.com/MessageStatus"));

        Console.WriteLine(message.Body);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.type.PhoneNumber;
import java.net.URI;
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
                                  "McAvoy or Stewart? These timelines can get so confusing.")
                              .setStatusCallback(URI.create("http://example.com/MessageStatus"))
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
	params.SetBody("McAvoy or Stewart? These timelines can get so confusing.")
	params.SetTo("+15558675310")
	params.SetMessagingServiceSid("MG9752274e9e519418a7406176694466fa")
	params.SetStatusCallback("http://example.com/MessageStatus")

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
        "body" => "McAvoy or Stewart? These timelines can get so confusing.",
        "messagingServiceSid" => "MG9752274e9e519418a7406176694466fa",
        "statusCallback" => "http://example.com/MessageStatus",
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
            body: 'McAvoy or Stewart? These timelines can get so confusing.',
            to: '+15558675310',
            messaging_service_sid: 'MG9752274e9e519418a7406176694466fa',
            status_callback: 'http://example.com/MessageStatus'
          )

puts message.body
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:messages:create \
   --body "McAvoy or Stewart? These timelines can get so confusing." \
   --to +15558675310 \
   --messaging-service-sid MG9752274e9e519418a7406176694466fa \
   --status-callback http://example.com/MessageStatus
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json" \
--data-urlencode "Body=McAvoy or Stewart? These timelines can get so confusing." \
--data-urlencode "To=+15558675310" \
--data-urlencode "MessagingServiceSid=MG9752274e9e519418a7406176694466fa" \
--data-urlencode "StatusCallback=http://example.com/MessageStatus" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "api_version": "2010-04-01",
  "body": "McAvoy or Stewart? These timelines can get so confusing.",
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

## What's next?

Now that you know how to track the message status of your outbound messages, check out the resources below for additional information and related Twilio product documentation:

* Read our guide [Best Practices for Messaging Delivery Status Logging](/docs/messaging/guides/outbound-message-logging) for advanced considerations when implementing a production-grade status logging solution.
* Explore our guide [How to Optimize Message Deliverability with Message Feedback](/docs/messaging/guides/send-message-feedback-to-twilio).
* See how Message Feedback supports the [Messaging Insights "One-time Password (OTP) Conversion Report"](/docs/messaging/features/messaging-insights/dashboards#otp-conversion-dashboard). Learn how to analyze the effectiveness of messages sent to provide two-factor authentication (2FA) or multi-factor authentication (MFA) codes or other one-time passwords for user authentication or account verification.
* Shorten links in messages with your own company-branded domain and track click-through-rates with [Link Shortening](/docs/messaging/features/link-shortening).
