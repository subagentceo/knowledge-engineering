# Quickstart: Send and receive WhatsApp messages

In this quickstart, you'll create an app that uses the WhatsApp Business Platform with Twilio to send and receive messages. You don't need to wait for WhatsApp sender registration because you'll use the [Twilio Sandbox for WhatsApp](/docs/whatsapp/sandbox) as your sender.

You'll access the Programmable Messaging REST API and build an app using your preferred programming language with the Twilio server-side SDKs.

## Prerequisites

Select your programming language and complete the prerequisites:

## Python

* Get a [WhatsApp account](https://www.whatsapp.com) and install WhatsApp on your device.
* Install [Python](https://www.python.org/downloads/).
* Install [Flask](https://flask.palletsprojects.com/) and [Twilio's Python SDK](https://github.com/twilio/twilio-python). To install using [pip](https://pip.pypa.io/), run:

  ```bash
  pip install flask twilio
  ```
* [Install and set up ngrok](https://ngrok.com/docs/getting-started/).

## Node.js

* Get a [WhatsApp account](https://www.whatsapp.com/) and install WhatsApp on your device.
* Install [Node.js](https://nodejs.org/).
* Install [Express](https://expressjs.com/) and the [Twilio Node.js SDK](https://github.com/twilio/twilio-node):

  ```bash
  npm install express twilio
  ```
* Install and set up [ngrok](https://ngrok.com/docs/getting-started/).

## PHP

* Get a [WhatsApp account](https://www.whatsapp.com/) and install WhatsApp on your device.
* Install [PHP](https://www.php.net/downloads.php).
* Install dependencies with Composer:

  1. Install [Composer](https://getcomposer.org/doc/00-intro.md).
  2. Install the [Twilio PHP SDK](https://github.com/twilio/twilio-php):

     ```bash
     composer require twilio/sdk
     composer install
     ```
* Install and set up [ngrok](https://ngrok.com/docs/getting-started/).

## C# (.NET Framework)

* Get a [WhatsApp account](https://www.whatsapp.com/) and install WhatsApp on your device.
* Download [Visual Studio 2019 or later](https://visualstudio.microsoft.com/downloads/).
* Install and set up [ngrok](https://ngrok.com/docs/getting-started/).

## Java

* Get a [WhatsApp account](https://www.whatsapp.com/) and install WhatsApp on your device.
* Install [Java Standard Edition (SE) Development Kit](https://www.oracle.com/java/technologies/downloads/).
* Download the [Twilio Java SDK](https://github.com/twilio/twilio-java) fat jar file with all dependencies:
  1. Navigate to the [Maven repository for the Twilio Java SDK](https://mvnrepository.com/artifact/com.twilio.sdk/twilio).
  2. Click the most recent version number.
  3. In the **Files** row, click **View All**.
  4. Click the file ending in `jar-with-dependencies.jar`.
  5. Create a project directory for this quickstart and move the fat jar from your downloads into the new project directory.
* Install [IntelliJ IDEA Community Edition](https://www.jetbrains.com/idea/download/?section=mac#).
* Install and set up [ngrok](https://ngrok.com/docs/getting-started/).

## curl

* Get a [WhatsApp account](https://www.whatsapp.com/) and install WhatsApp on your device.
* [curl](https://curl.se/) is installed by default on macOS, Windows, and on most Linux distributions. Run `curl --version` from your terminal to check.

## Go

* Get a [WhatsApp account](https://www.whatsapp.com/) and install WhatsApp on your device.
* Install [Go](https://go.dev/doc/install).
* Install and set up [ngrok](https://ngrok.com/docs/getting-started/).

## Ruby

* Get a [WhatsApp account](https://www.whatsapp.com/) and install WhatsApp on your device.
* Install [Ruby](https://www.ruby-lang.org/en/documentation/installation/).
* Install [Sinatra](https://github.com/sinatra/sinatra) and the [Twilio Ruby SDK](https://github.com/twilio/twilio-ruby). Run the following command to create a Gemfile and add and install the gems:
  ```bash
  bundle init && bundle add sinatra twilio-ruby
  ```
* Install and set up [ngrok](https://ngrok.com/docs/getting-started/).

## Sign up for Twilio and activate the Sandbox

The Twilio Sandbox for WhatsApp (the Sandbox) acts as your WhatsApp sender. You can test messaging without waiting for your WhatsApp sender registration and verification.

1. [Sign up for Twilio](https://www.twilio.com/try-twilio).
2. Activate and connect to the Twilio Sandbox for WhatsApp:
   1. Go to the [Try WhatsApp page in the Console](https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn), acknowledge the terms, and click **Confirm**.
   2. To connect your WhatsApp account to the Sandbox, send `join <your sandbox code>` to the Sandbox number, or scan the QR code with your mobile device and send the prepopulated message. The Sandbox replies to confirm that you've joined.

To disconnect from the Sandbox, reply to the message with `stop` or switch to a different Sandbox by messaging `join <other sandbox keyword>`.

## Set environment variables

You need your Twilio account credentials to send requests. Follow these steps to get your account credentials and set them as environment variables.

## macOS Terminal

1. Go to the [Twilio Console](https://www.twilio.com/console).
2. Copy your **Account SID** and set it as an environment variable using the following command. Replace *ACCOUNT\_SID* with your Account SID.
   ```bash
   export TWILIO_ACCOUNT_SID=ACCOUNT_SID
   ```
3. Copy your **Auth Token** and set it as an environment variable using the following command. Replace *AUTH\_TOKEN* with your Auth Token.
   ```bash
   export TWILIO_AUTH_TOKEN=AUTH_TOKEN
   ```

## Windows command line

1. Go to the [Twilio Console](https://www.twilio.com/console).
2. Copy your **Account SID** and set it as an environment variable using the following command. Replace *ACCOUNT\_SID* with your Account SID.
   ```bash
   set TWILIO_ACCOUNT_SID=ACCOUNT_SID
   ```
3. Copy your **Auth Token** and set it as an environment variable using the following command. Replace *AUTH\_TOKEN* with your Auth Token.
   ```bash
   set TWILIO_AUTH_TOKEN=AUTH_TOKEN
   ```

## PowerShell

1. Go to the [Twilio Console](https://www.twilio.com/console).
2. Copy your **Account SID** and set it as an environment variable using the following command. Replace *ACCOUNT\_SID* with your Account SID.
   ```bash
   $Env:TWILIO_ACCOUNT_SID="ACCOUNT_SID"
   ```
3. Copy your **Auth Token** and set it as an environment variable using the following command. Replace *AUTH\_TOKEN* with your Auth Token.
   ```bash
   $Env:TWILIO_AUTH_TOKEN="AUTH_TOKEN"
   ```

## Send a WhatsApp message from the Sandbox

Send a message using one of the pre-approved message templates available from the Sandbox. This quickstart uses the Appointment Reminder template. Learn more about [business-initiated messages and templates](/docs/whatsapp/sandbox#business-initiated-messages-and-templates).

> \[!WARNING]
>
> WhatsApp Business Platform requires the use of a message template for business-initiated messages. Each time a user sends your business a message, you have a 24-hour customer service window in which to send free-form outbound messages without a template. Learn more about [customer service windows](/docs/whatsapp/key-concepts#customer-service-windows).

Follow these steps to send a message from the Sandbox number to your personal WhatsApp account:

## Python

1. Create and open a new file called `send_whatsapp.py` anywhere on your machine and paste in the following code:

   Send a message with WhatsApp, Twilio, and Python
   ```python
   # Download the helper library from https://www.twilio.com/docs/python/install
   import os
   from twilio.rest import Client
   import json

   # Find your Account SID and Auth Token at twilio.com/console
   # and set the environment variables. See http://twil.io/secure
   account_sid = os.environ["TWILIO_ACCOUNT_SID"]
   auth_token = os.environ["TWILIO_AUTH_TOKEN"]
   client = Client(account_sid, auth_token)

   message = client.messages.create(
       from_="whatsapp:+14155238886",
       to="whatsapp:+16285550100",
       content_sid="HXb5b62575e6e4ff6129ad7c8efe1f983e",
       content_variables=json.dumps({"1": "22 July 2026", "2": "3:15pm"}),
   )

   print(message.body)
   ```
2. Replace the value for `to` with the `whatsapp:` prefix and your personal WhatsApp number in [E.164 format](/docs/glossary/what-e164). For example, `whatsapp:+16285550100`.
3. Save your changes and run this command from your terminal in the directory that contains `send_whatsapp.py`:

   ```bash
   python send_whatsapp.py
   ```

After a few moments, you receive a WhatsApp message from the Sandbox to your personal WhatsApp account.

## Node.js

1. Create and open a new file called `send_whatsapp.js` anywhere on your machine and paste in the following code:

   Send a message with WhatsApp, Twilio, and Node.js
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
       contentSid: "HXb5b62575e6e4ff6129ad7c8efe1f983e",
       contentVariables: JSON.stringify({ 1: "22 July 2026", 2: "3:15pm" }),
       from: "whatsapp:+14155238886",
       to: "whatsapp:+16285550100",
     });

     console.log(message.body);
   }

   createMessage();
   ```
2. Replace the value for `to` with the `whatsapp:` prefix and your personal WhatsApp number in [E.164 format](/docs/glossary/what-e164). For example, `whatsapp:+16285550100`.
3. Save your changes and run the following command from your terminal in the directory that contains `send_whatsapp.js`:

   ```bash
   node send_whatsapp.js
   ```

After a few moments, you receive a WhatsApp message from the Sandbox to your personal WhatsApp account.

## PHP

1. Create and open a new file called `send_whatsapp.php` in the project directory and paste in the following code:

   Send a message with WhatsApp, Twilio, and PHP
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
       "whatsapp:+16285550100", // To
       [
           "from" => "whatsapp:+14155238886",
           "contentSid" => "HXb5b62575e6e4ff6129ad7c8efe1f983e",
           "contentVariables" => json_encode([
               "1" => "22 July 2026",
               "2" => "3:15pm",
           ]),
       ]
   );

   print $message->body;
   ```
2. Replace the first argument to `$twilio->messages->create()` with your personal WhatsApp number in [E.164 format](/docs/glossary/what-e164), prefixed by `whatsapp:`. For example, `whatsapp:+16285550100`.
3. Replace line 5 of `send_whatsapp.php` with the following:

   ```php
   require __DIR__ . '/vendor/autoload.php';
   ```
4. Save your changes and run this command from your terminal in the directory that contains `send_whatsapp.php`:

   ```bash
   php send_whatsapp.php
   ```

After a few moments, you receive a WhatsApp message from the Sandbox to your personal WhatsApp account.

## C# (.NET Framework)

1. Create and set up a new project in Visual Studio:
   1. Open Visual Studio and click **Create a new project**.
   2. Click **Console App (.NET Framework)**.
   3. Use the [NuGet Package Manager](https://learn.microsoft.com/en-us/nuget/consume-packages/install-use-packages-visual-studio) to install the Twilio REST API SDK.
2. Open the file in your new Visual Studio project called `Program.cs` and paste in the following code, replacing the existing template code:

   Send a message with WhatsApp, Twilio, and C# (.NET Framework)
   ```csharp
   // Install the C# / .NET helper library from twilio.com/docs/csharp/install

   using System;
   using Twilio;
   using Twilio.Rest.Api.V2010.Account;
   using System.Threading.Tasks;
   using System.Collections.Generic;
   using Newtonsoft.Json;

   class Program {
       public static async Task Main(string[] args) {
           // Find your Account SID and Auth Token at twilio.com/console
           // and set the environment variables. See http://twil.io/secure
           string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
           string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

           TwilioClient.Init(accountSid, authToken);

           var message = await MessageResource.CreateAsync(
               from: new Twilio.Types.PhoneNumber("whatsapp:+14155238886"),
               to: new Twilio.Types.PhoneNumber("whatsapp:+16285550100"),
               contentSid: "HXb5b62575e6e4ff6129ad7c8efe1f983e",
               contentVariables: JsonConvert.SerializeObject(
                   new Dictionary<string, Object>() { { "1", "22 July 2026" }, { "2", "3:15pm" } },
                   Formatting.Indented));

           Console.WriteLine(message.Body);
       }
   }
   ```
3. Replace the value for `to: new Twilio.Types.PhoneNumber` with the `whatsapp:` prefix and your personal WhatsApp number in [E.164 format](/docs/glossary/what-e164). For example, `whatsapp:+16285550100`.
4. Save your changes and run your project in Visual Studio.

After a few moments, you receive a WhatsApp message from the Sandbox to your personal WhatsApp account.

## Java

1. Create and open a new file called `Example.java` in the same directory as the fat jar file and paste in the following code:

   ```java
   import com.twilio.type.PhoneNumber;
   import java.util.HashMap;
   import com.twilio.Twilio;
   import com.twilio.rest.api.v2010.account.Message;
   import org.json.JSONObject;

   public class Example {
   	public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
   	public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");


   public static void main(String[] args) {
   	Twilio.init(ACCOUNT_SID, AUTH_TOKEN);

   	Message message =
   		Message.creator(
   				new PhoneNumber("whatsapp:+16285550100"),
   				new PhoneNumber("whatsapp:+14155238886"),
   				(String) null
   		)
   		.setContentSid("HXb5b62575e6e4ff6129ad7c8efe1f983e")
   		.setContentVariables(new JSONObject(new HashMap<String, Object>() {{
   				put("1", "22 July 2026");
   				put("2", "3:15pm");
   		}}).toString())
   		.create();

   	System.out.println(message.getSid());
   	}
   }
   ```
2. Replace the value for the first phone number (the recipient) with the `whatsapp:` prefix and your personal WhatsApp number in [E.164 format](/docs/glossary/what-e164). For example, `whatsapp:+16285550100`.
3. Save your changes and compile the code from your terminal in the directory that contains `Example.java`. Replace `10.9.0` with the version of your fat jar file.

   ```bash
   javac -cp twilio-10.9.0-jar-with-dependencies.jar Example.java
   ```
4. Run the code. Replace `10.9.0` with the version of your fat jar file.

   On Linux or macOS, run:

   ```bash
   java -cp .:twilio-10.9.0-jar-with-dependencies.jar Example
   ```

   On Windows, run:

   ```bash
   java -cp ".;twilio-10.9.0-jar-with-dependencies.jar" Example
   ```

After a few moments, you receive a WhatsApp message from the Sandbox to your personal WhatsApp account.

## curl

1. Copy and paste the following code into your terminal:

   Send a message with WhatsApp, Twilio, and curl
   ```bash
   CONTENT_VARIABLES_OBJ=$(cat << EOF
   {
     "1": "22 July 2026",
     "2": "3:15pm"
   }
   EOF
   )
   curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages.json" \
   --data-urlencode "From=whatsapp:+14155238886" \
   --data-urlencode "To=whatsapp:+16285550100" \
   --data-urlencode "ContentSid=HXb5b62575e6e4ff6129ad7c8efe1f983e" \
   --data-urlencode "ContentVariables=$CONTENT_VARIABLES_OBJ" \
   -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
   ```
2. Replace the value for `To` with the `whatsapp:` prefix and your personal WhatsApp number in [E.164 format](/docs/glossary/what-e164). For example, `whatsapp:+16285550100`.
3. Press Enter to send the request.

   The JSON body of the request prints to your terminal.

After a few moments, you receive a WhatsApp message from the Sandbox to your personal WhatsApp account.

## Go

1. Create and set up your Go project.
   1. Create a new Go project by running the following command:

      ```bash
      go mod init twilio-example
      ```
   2. Install the [Twilio Go SDK](https://github.com/twilio/twilio-go):

      ```bash
      go get github.com/twilio/twilio-go
      ```
2. Create and open a new file called `send_whatsapp.go` in your Go project directory and paste in the following code:

   Send a message with WhatsApp, Twilio, and Go
   ```go
   // Download the helper library from https://www.twilio.com/docs/go/install
   package main

   import (
   	"encoding/json"
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

   	ContentVariables, ContentVariablesError := json.Marshal(map[string]interface{}{
   		"1": "22 July 2026",
   		"2": "3:15pm",
   	})

   	if ContentVariablesError != nil {
   		fmt.Println(ContentVariablesError)
   		os.Exit(1)
   	}

   	params := &api.CreateMessageParams{}
   	params.SetFrom("whatsapp:+14155238886")
   	params.SetTo("whatsapp:+16285550100")
   	params.SetContentSid("HXb5b62575e6e4ff6129ad7c8efe1f983e")
   	params.SetContentVariables(string(ContentVariables))

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
3. Replace the value for `params.SetTo` with the `whatsapp:` prefix and your personal WhatsApp number in [E.164 format](/docs/glossary/what-e164). For example, `whatsapp:+16285550100`.
4. Save your changes and run this command in the directory that contains `send_whatsapp.go`:

   ```bash
   go run send_whatsapp.go
   ```

After a few moments, you receive a WhatsApp message from the Sandbox to your personal WhatsApp account.

## Ruby

1. Create and open a new file called `send_whatsapp.rb` anywhere on your machine and paste in the following code:

   Send a message with WhatsApp, Twilio, and Ruby
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
               from: 'whatsapp:+14155238886',
               to: 'whatsapp:+16285550100',
               content_sid: 'HXb5b62575e6e4ff6129ad7c8efe1f983e',
               content_variables: {
                   '1' => '22 July 2026',
                   '2' => '3:15pm'
                 }.to_json
             )

   puts message.body
   ```
2. Replace the value for `to` with the `whatsapp:` prefix and your personal WhatsApp number in [E.164 format](/docs/glossary/what-e164). For example, `whatsapp:+16285550100`.
3. Save your changes and run this command from your terminal in the directory that contains `send_whatsapp.rb`:

   ```bash
   ruby send_whatsapp.rb
   ```

After a few moments, you receive a WhatsApp message from the Sandbox to your personal WhatsApp account.

## Receive a WhatsApp message to the Sandbox and send an automated reply

When someone replies to one of your WhatsApp messages, you receive a [webhook](/docs/glossary/what-is-a-webhook) request from Twilio. To handle this request, you need to configure the webhook, create a web application that responds to an incoming message with TwiML, and expose your application to the internet.

Follow these steps to have the Sandbox reply to a WhatsApp message that you send from your personal WhatsApp account:

## Python

1. Create and open a new file called `reply_whatsapp.py` anywhere on your machine and paste in the following code:

   ```python
   from flask import Flask, request, Response
   from twilio.twiml.messaging_response import MessagingResponse

   app = Flask(__name__)

   @app.route("/reply_whatsapp", methods=['POST'])
   def reply_whatsapp():
   	# Create a new Twilio MessagingResponse
   	resp = MessagingResponse()
   	resp.message("Message received! Hello again from the Twilio Sandbox for WhatsApp.")

   	# Return the TwiML (as XML) response
   	return Response(str(resp), mimetype='text/xml')

   if __name__ == "__main__":
   	app.run(port=3000)
   ```

   Save the file.
2. In a new terminal window, run the following command to start the Python development server on port 3000:

   ```bash
   python reply_whatsapp.py 
   ```
3. In a new terminal window, run the following command to start ngrok and create a tunnel to your localhost:

   ```bash
   ngrok http 3000
   ```

   > \[!WARNING]
   >
   > Use ngrok only for testing because it creates a temporary URL that exposes your local development machine to the internet. Host your application with a cloud provider or your public server when you deploy to production.
4. Set up a webhook that triggers when the Sandbox receives a WhatsApp message:

   1. Open the [Try WhatsApp page in the Twilio Console](https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn).
   2. Click **Sandbox settings**.
   3. In the **Sandbox Configuration** section, in the **When a message comes in** field, enter the temporary forwarding URL from your ngrok console with `/reply_whatsapp` appended to the end.

      For example, if your ngrok console shows `Forwarding https://1aaa-123-45-678-910.ngrok-free.app`, enter `https://1aaa-123-45-678-910.ngrok-free.app/reply_whatsapp`.
   4. Click **Save**.
5. With the Python development server and ngrok running, send a WhatsApp message to the Sandbox number from your personal WhatsApp account.

An HTTP request shows in your ngrok console, and you receive the response message in your personal WhatsApp account.

## Node.js

1. Create and open a new file called `server.js` anywhere on your machine and paste in the following code:

   Respond to an incoming WhatsApp message with Node.js

   ```js
   const express = require('express');
   const { MessagingResponse } = require('twilio').twiml;

   const app = express();

   app.post('/whatsapp', (req, res) => {
     const twiml = new MessagingResponse();

     twiml.message(
       'Message received! Hello again from the Twilio Sandbox for WhatsApp.'
     );

     res.type('text/xml').send(twiml.toString());
   });

   app.listen(3000, () => {
     console.log('Express server listening on port 3000');
   });
   ```
2. In a new terminal window, start the Node.js development server on port 3000 by running this command in the directory that contains `server.js`:

   ```bash
   node server.js
   ```
3. In a new terminal window, run the following command to start ngrok and create a tunnel to your localhost:

   ```bash
   ngrok http 3000
   ```

   > \[!WARNING]
   >
   > Use ngrok only for testing because it creates a temporary URL that exposes your local development machine to the internet. Host your application with a cloud provider or your public server when you deploy to production.
4. Set up a webhook that triggers when the Sandbox receives a WhatsApp message:

   1. Open the [Try WhatsApp page in the Twilio Console](https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn).
   2. Click **Sandbox settings**.
   3. In the **Sandbox Configuration** section, in the **When a message comes in** field, enter the temporary forwarding URL from your ngrok console with `/whatsapp` appended to the end.

      For example, if your ngrok console shows `Forwarding https://1aaa-123-45-678-910.ngrok-free.app`, enter `https://1aaa-123-45-678-910.ngrok-free.app/whatsapp`.
   4. Click **Save**.
5. With the Node.js development server and ngrok running, send a WhatsApp message to the Sandbox number from your personal WhatsApp account.

An HTTP request shows in your ngrok console, and you receive the response message in your personal WhatsApp account.

## PHP

1. Create and open a new file called `reply_whatsapp.php` in the same directory as `send_whatsapp.php` and paste in the following code:

   ```php
   <?php
   require_once "vendor/autoload.php";
   use Twilio\TwiML\MessagingResponse;

   // Set the content-type to XML to send back TwiML from the PHP SDK
   header("content-type: text/xml");

   $response = new MessagingResponse();
   $response->message(
   	"Message received! Hello again from the Twilio Sandbox for WhatsApp."
   );

   echo $response;
   ```

   Save the file.
2. In a new terminal window, start the PHP development server on port 3000 by running this command:

   ```bash
   php -S localhost:3000 reply_whatsapp.php
   ```
3. In a new terminal window, run the following command to start ngrok and create a tunnel to your localhost:

   ```bash
   ngrok http 3000
   ```

   > \[!WARNING]
   >
   > Use ngrok only for testing because it creates a temporary URL that exposes your local development machine to the internet. Host your application with a cloud provider or your public server when you deploy to production.
4. Set up a webhook that triggers when the Sandbox receives a WhatsApp message:

   1. Open the [Try WhatsApp page in the Twilio Console](https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn).
   2. Click **Sandbox settings**.
   3. In the **Sandbox Configuration** section, in the **When a message comes in** field, enter the temporary forwarding URL from your ngrok console.

      For example, if your ngrok console shows `Forwarding https://1aaa-123-45-678-910.ngrok-free.app`, enter `https://1aaa-123-45-678-910.ngrok-free.app`.
   4. Click **Save**.
5. With the PHP development server and ngrok running, send a WhatsApp message to the Sandbox number from your personal WhatsApp account.

An HTTP request shows in your ngrok console, and you receive the response message in your personal WhatsApp account.

## C# (.NET Framework)

1. Create a new ASP.NET MVC Project in Visual Studio:
   1. Open Visual Studio and click **Create a new project**.
   2. Click **ASP.NET Web Application (.NET Framework)**.
   3. Click **MVC** to select the project type.
   4. Use the [NuGet Package Manager](https://learn.microsoft.com/en-us/nuget/consume-packages/install-use-packages-visual-studio) to install the Twilio.AspNet.Mvc package.
2. Create a new controller:
   1. Open the project directory.
   2. Right-click on the `Controllers` folder.
   3. Select **Add** > **Controller...** > **MVC 5 Controller - Empty**.
   4. Name the file `WhatsappController.cs`.
3. Paste the following code into `WhatsappController.cs`:

   ```cs
   // Code sample for ASP.NET MVC on .NET Framework 4.6.1+
   // In Package Manager, run:
   // Install-Package Twilio.AspNet.Mvc -DependencyVersion HighestMinor

   using Twilio.AspNet.Common;
   using Twilio.AspNet.Mvc;
   using Twilio.TwiML;

   namespace WebApplication1.Controllers
   {
   	public class WhatsappController : TwilioController
   	{
   		public TwiMLResult Index(WhatsappRequest incomingMessage)
   		{
   			var messagingResponse = new MessagingResponse();
   			messagingResponse.Message("Message received! Hello again from the Twilio Sandbox for WhatsApp.");

   			return TwiML(messagingResponse);
   		}
   	}
   }
   ```

   Save the file.
4. In Visual Studio, run the application by clicking the play arrow. Your web browser opens on a localhost URL. Note the port number; for example, if the URL opens on `https://localhost:44360`, your port number is `44360`.
5. In a new terminal window, run the following command to start ngrok and create a tunnel to your localhost. Replace `PORT` with the port number from your application.

   ```bash
   ngrok http PORT
   ```

   > \[!WARNING]
   >
   > Use ngrok only for testing because it creates a temporary URL that exposes your local development machine to the internet. Host your application with a cloud provider or your public server when you deploy to production.
6. Set up a webhook that triggers when the Sandbox receives a WhatsApp message:

   1. Open the [Try WhatsApp page in the Twilio Console](https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn).
   2. Click **Sandbox settings**.
   3. In the **Sandbox Configuration** section, in the **When a message comes in** field, enter the temporary forwarding URL from your ngrok console with `/whatsapp` appended to the end.

      For example, if your ngrok console shows `Forwarding https://1aaa-123-45-678-910.ngrok-free.app`, enter `https://1aaa-123-45-678-910.ngrok-free.app/whatsapp`.
   4. Click **Save**.
7. With the application and ngrok running, send a WhatsApp message to the Sandbox number from your personal WhatsApp account.

An HTTP request shows in your ngrok console, and you receive the response message in your personal WhatsApp account.

## Java

1. Create and set up the IntelliJ project.

   1. Open IntelliJ IDEA Community Edition.
   2. Create a new project with either **Maven** or **Gradle** as the build system.
   3. Add the following dependencies to your [Maven](https://www.jetbrains.com/help/idea/work-with-maven-dependencies.html#) or [Gradle](https://www.jetbrains.com/help/idea/work-with-gradle-dependency-diagram.html#) build file:

      * `com.twilio.sdk:twilio`
      * `com.sparkjava:spark-core`
      * `org.slf4j`

      To learn more about the dependencies, see [SparkJava](https://github.com/perwendel/spark) and [Simple Logging Facade 4 Java (SLF4J)](https://www.slf4j.org/).
   4. Select the `java` folder under `src` > `main`.
   5. To create a new Java class, click **File** > **New** > **Java Class**. Name the class `WhatsappApp`.
2. In the new `WhatsappApp.java` file that IntelliJ creates, paste in the following code:

   Respond to an incoming WhatsApp message with Java

   ```java
   import com.twilio.twiml.MessagingResponse;
   import com.twilio.twiml.messaging.Body;
   import com.twilio.twiml.messaging.Message;

   import static spark.Spark.*;

   public class WhatsAppApp {
       public static void main(String[] args) {
           get("/", (req, res) -> "Hello Web");

           post("/whatsapp", (req, res) -> {
               res.type("application/xml");
               Body body = new Body
                       .Builder("Message received! Hello again from the Twilio Sandbox for WhatsApp.")
                       .build();
               Message whatsapp = new Message
                       .Builder()
                       .body(body)
                       .build();
               MessagingResponse twiml = new MessagingResponse
                       .Builder()
                       .message(whatsapp)
                       .build();
               return twiml.toXml();
           });
       }
   }
   ```
3. Right-click on the **WhatsappApp** class in the project outline and choose **Run 'WhatsappApp.main()'**.

   The Java spark web application server starts listening on port 4567.
4. In a new terminal window, run the following command to start ngrok and create a tunnel to your localhost:

   ```bash
   ngrok http 4567
   ```

   > \[!WARNING]
   >
   > Use ngrok only for testing because it creates a temporary URL that exposes your local development machine to the internet. Host your application with a cloud provider or your public server when you deploy to production.
5. Set up a webhook that triggers when the Sandbox receives a WhatsApp message:

   1. Open the [Try WhatsApp page in the Twilio Console](https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn).
   2. Click **Sandbox settings**.
   3. In the **Sandbox Configuration** section, in the **When a message comes in** field, enter the temporary forwarding URL from your ngrok console with `/whatsapp` appended to the end.

      For example, if your ngrok console shows `Forwarding https://1aaa-123-45-678-910.ngrok-free.app`, enter `https://1aaa-123-45-678-910.ngrok-free.app/whatsapp`.
   4. Click **Save**.
6. With the Java development server and ngrok running, send a WhatsApp message to the Sandbox number from your personal WhatsApp account.

An HTTP request shows in your ngrok console, and you receive the response message in your personal WhatsApp account.

## curl

Although we're sure it's possible to run a server from your command line, we suggest exploring how to set up your environment, send messages, and respond to messages with TwiML in the programming language of your choice.

To respond to messages, you'll set up a webhook that triggers when the Sandbox receives a WhatsApp message. You can configure webhooks by connecting the Sandbox to an app you've already built for handling incoming messages, or build a new one for WhatsApp messages.

## Go

1. Create and open a new file called `server.go` in your Go project directory and paste in the following code:

   Respond to an incoming WhatsApp message with Go
   ```go
   package main

   import (
   	"net/http"

   	"github.com/gin-gonic/gin"
   	"github.com/twilio/twilio-go/twiml"
   )

   func main() {
   	router := gin.Default()

   	router.POST("/whatsapp", func(context *gin.Context) {
   		message := &twiml.MessagingMessage{
   			Body: "Message received! Hello again from the Twilio Sandbox for WhatsApp.",
   		}

   		twimlResult, err := twiml.Messages([]twiml.Element{message})
   		if err != nil {
   			context.String(http.StatusInternalServerError, err.Error())
   		} else {
   			context.Header("Content-Type", "text/xml")
   			context.String(http.StatusOK, twimlResult)
   		}
   	})

   	router.Run(":3000")
   }
   ```
2. Install the [Gin Framework](https://gin-gonic.com/):

   ```bash
   go get -u github.com/gin-gonic/gin
   ```
3. Install the TwiML dependency:

   ```bash
   go get github.com/twilio/twilio-go/twiml@latest
   ```
4. In a new terminal window, start the Go development server on port 3000 by running this command in the directory that contains `server.go`:

   ```bash
   go run server.go
   ```
5. In a new terminal window, run the following command to start ngrok and create a tunnel to your localhost:

   ```bash
   ngrok http 3000
   ```

   > \[!WARNING]
   >
   > Use ngrok only for testing because it creates a temporary URL that exposes your local development machine to the internet. Host your application with a cloud provider or your public server when you deploy to production.
6. Set up a webhook that triggers when the Sandbox receives a WhatsApp message:

   1. Open the [Try WhatsApp page in the Twilio Console](https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn).
   2. Click **Sandbox settings**.
   3. In the **Sandbox Configuration** section, in the **When a message comes in** field, enter the temporary forwarding URL from your ngrok console with `/whatsapp` appended to the end.

      For example, if your ngrok console shows `Forwarding https://1aaa-123-45-678-910.ngrok-free.app`, enter `https://1aaa-123-45-678-910.ngrok-free.app/whatsapp`.
   4. Click **Save**.
7. With the Go development server and ngrok running, send a WhatsApp message to the Sandbox number from your personal WhatsApp account.

An HTTP request shows in your ngrok console, and you receive the response message in your personal WhatsApp account.

## Ruby

1. Create and open a new file called `reply_whatsapp.rb` in the same directory as `Gemfile` and paste in the following code:

   ```ruby
   require 'twilio-ruby'
   require 'sinatra'

   # disable HostAuthorization for development only
   configure :development do
   	set :host_authorization, { permitted_hosts: [] }
   end

   post '/whatsapp' do
   	twiml = Twilio::TwiML::MessagingResponse.new do |r|
   		r.message(body: 'Message received! Hello again from the Twilio Sandbox for WhatsApp.')
   	end

   	twiml.to_s
   end
   ```

   Save the file.
2. In a new terminal window, start the Ruby development server on port 4567 by running this command:

   ```bash
   ruby reply_whatsapp.rb
   ```
3. In a new terminal window, run the following command to start ngrok and create a tunnel to your localhost:

   ```bash
   ngrok http 4567
   ```

   > \[!WARNING]
   >
   > Use ngrok only for testing because it creates a temporary URL that exposes your local development machine to the internet. Host your application with a cloud provider or your public server when you deploy to production.
4. Set up a webhook that triggers when the Sandbox receives a WhatsApp message:

   1. Open the [Try WhatsApp page in the Twilio Console](https://console.twilio.com/us1/develop/sms/try-it-out/whatsapp-learn).
   2. Click **Sandbox settings**.
   3. In the **Sandbox Configuration** section, in the **When a message comes in** field, enter the temporary forwarding URL from your ngrok console with `/whatsapp` appended to the end.

      For example, if your ngrok console shows `Forwarding https://1aaa-123-45-678-910.ngrok-free.app`, enter `https://1aaa-123-45-678-910.ngrok-free.app/whatsapp`.
   4. Click **Save**.
5. With the Ruby development server and ngrok running, send a WhatsApp message to the Sandbox number from your personal WhatsApp account.

An HTTP request shows in your ngrok console, and you receive the response message in your personal WhatsApp account.

## Next steps

The WhatsApp Business Platform with Twilio uses the same REST API resources as the [Twilio Programmable Messaging API](/docs/messaging/api). Many Twilio Messaging use cases apply to WhatsApp:

* Learn more about testing with the [Twilio Sandbox for WhatsApp](/docs/whatsapp/sandbox)
* [Send appointment reminders](/docs/messaging/tutorials/appointment-reminders)
* [Create SMS conversations](/docs/messaging/tutorials/how-to-create-sms-conversations)
