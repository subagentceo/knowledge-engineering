# SMS developer quickstart

In this quickstart, you'll build your first application to programmatically send and receive text messages with [Twilio Programmable Messaging](/docs/messaging). This quickstart uses the Programmable Messaging REST API, the Twilio SDKs, and the Twilio Virtual Phone.

For a no-code quickstart, see [No-code programmable messaging quickstart with Twilio Studio](/docs/messaging/quickstart/no-code-sms-studio-quickstart).

## Complete the prerequisites

Select your programming language and complete the prerequisites:

## Python

* [Install Python](https://www.python.org/downloads/) (3.8–3.13). See [supported versions](https://github.com/twilio/twilio-python#supported-python-versions).
* [Install and set up ngrok](https://ngrok.com/docs/getting-started/).
* Install [Flask](http://flask.pocoo.org/) and [Twilio's Python SDK](https://github.com/twilio/twilio-python). To install using [pip](https://pip.pypa.io/en/latest/), run:

  ```bash
  pip install flask twilio
  ```

## Node.js

* [Install Node.js](https://nodejs.org/).
* [Install Express](https://expressjs.com/).
* [Install and set up ngrok](https://ngrok.com/docs/getting-started/).
* Install the [Twilio Node.js SDK](https://github.com/twilio/twilio-node):

  ```bash
  npm install twilio
  ```

## PHP

* [Install PHP](http://php.net/manual/en/install.php).
* [Install and set up ngrok](https://ngrok.com/docs/getting-started/).
* Install dependencies with Composer:

  1. [Install Composer](https://getcomposer.org/doc/00-intro.md).
  2. Install the [Twilio PHP SDK](https://github.com/twilio/twilio-php):

     ```bash
     composer require twilio/sdk
     composer install
     ```

## C# (.NET Framework)

* [Download Visual Studio 2019 or later](https://visualstudio.microsoft.com/vs/).
* [Install and set up ngrok](https://ngrok.com/docs/getting-started/).

## C# (.NET Core)

* [Install .NET Core](https://www.microsoft.com/net/).
* [Install and set up ngrok](https://ngrok.com/docs/getting-started/).

## Java

* [Install Java Standard Edition (SE) Development Kit](https://www.oracle.com/java/technologies/downloads/).
* [Install and set up ngrok](https://ngrok.com/docs/getting-started/).
* Download the [Twilio Java SDK](https://github.com/twilio/twilio-java) fat jar file with all dependencies:
  1. Navigate to the [Maven repository](https://mvnrepository.com/artifact/com.twilio.sdk/twilio).
  2. Click the most recent version number.
  3. In the **Files** row, click **View All**.
  4. Click the file ending in `jar-with-dependencies.jar`.
* [Install IntelliJ IDEA Community Edition](https://www.jetbrains.com/idea/download/?section=mac#).

## Go

* [Install Go](https://go.dev/doc/install).
* [Install and set up ngrok](https://ngrok.com/docs/getting-started/).

## Ruby

* [Install Ruby](https://www.ruby-lang.org/en/documentation/installation/).
* [Install and set up ngrok](https://ngrok.com/docs/getting-started/).

## Sign up for Twilio and get a phone number

1. [Sign up for Twilio](https://www.twilio.com/try-twilio). When prompted to select a plan, click **Continue with trial**.
2. To get a phone that has SMS capabilities, do either of the following:
   * In the **Account Dashboard**, click **Get a phone number**.
   * In the navigation menu, go to **Phone Numbers > Manage > Buy a number**.
3. In the **Account Dashboard**, copy your **Account SID** and **Auth Token** and paste them in a temporary local file for use later in this quickstart.

## Open the Twilio Virtual Phone

The [Twilio Virtual Phone](/docs/messaging/guides/guide-to-using-the-twilio-virtual-phone) lets you try Twilio quickly regardless of your country's regulations for messaging mobile handsets. To message a mobile handset, see [Send SMS and MMS messages](/docs/messaging/tutorials/how-to-send-sms-messages).

1. Open the [Send an SMS page in the Twilio Console](https://console.twilio.com/us1/develop/sms/try-it-out/send-an-sms).
2. On the **Send to Virtual Phone** tab, select the number that Twilio gave you from the **Phone number** list.
3. Click **Virtual Phone**. Messages you send with your application display on the Virtual Phone.

## Send an outbound SMS message

Follow these steps to send an SMS message from your Twilio phone number.

## Python

1. Create and open a new file called `send_sms.py` anywhere on your machine and paste in the following code:

   Send an SMS Using Twilio with Python
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
       body="Join Earth's mightiest heroes. Like Kevin Bacon.",
       from_="+15017122661",
       to="+15558675310",
   )

   print(message.body)
   ```
2. In the `send_sms.py` file, replace the values for `account_sid` and `auth_token` with your Account SID and Auth Token surrounded by quotation marks.

   > \[!CAUTION]
   >
   > This quickstart hardcodes your credentials for faster setup. To keep credentials secret and control access when you deploy to production, use environment variables and [API keys](/docs/iam/api-keys).

   ```java
   // Using environment variables (recommended for production)
   public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
   public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

   // Initialize Twilio with environment variables
   Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
   ```

   **To set environment variables:**

   **On macOS/Linux:**

   ```bash
   export TWILIO_ACCOUNT_SID=your_account_sid_here
   export TWILIO_AUTH_TOKEN=your_auth_token_here
   ```

   **On Windows (Command Prompt):**

   ```cmd
   set TWILIO_ACCOUNT_SID=your_account_sid_here
   set TWILIO_AUTH_TOKEN=your_auth_token_here
   ```

   **On Windows (PowerShell):**

   ```powershell
   $env:TWILIO_ACCOUNT_SID="your_account_sid_here"
   $env:TWILIO_AUTH_TOKEN="your_auth_token_here"
   ```
3. Replace the value for `from` with the phone number that Twilio gave you in [E.164 format](/docs/glossary/what-e164).
4. Replace the value for `to` with the Twilio Virtual Phone number (`+18777804236`).
5. Save your changes and run this command from your terminal in the directory that contains `send_sms.py`:

   ```bash
   python send_sms.py
   ```

   After a few moments, you receive an SMS from your Twilio number on the Twilio Virtual Phone.

## Node.js

1. Create and open a new file called `send_sms.js` anywhere on your machine and paste in the following code:

   Send an SMS Using Twilio with Node.js
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
       body: "This is the ship that made the Kessel Run in fourteen parsecs?",
       from: "+15017122661",
       to: "+15558675310",
     });

     console.log(message.body);
   }

   createMessage();
   ```
2. In the `send_sms.js` file, replace the values for `accountSid` and `authToken` with your Account SID and Auth Token surrounded by quotation marks.

   > \[!CAUTION]
   >
   > This quickstart hardcodes your credentials for faster setup. To keep credentials secret and control access when you deploy to production, use environment variables and [API keys](/docs/iam/api-keys).

   ```java
   // Using environment variables (recommended for production)
   public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
   public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

   // Initialize Twilio with environment variables
   Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
   ```

   **To set environment variables:**

   **On macOS/Linux:**

   ```bash
   export TWILIO_ACCOUNT_SID=your_account_sid_here
   export TWILIO_AUTH_TOKEN=your_auth_token_here
   ```

   **On Windows (Command Prompt):**

   ```cmd
   set TWILIO_ACCOUNT_SID=your_account_sid_here
   set TWILIO_AUTH_TOKEN=your_auth_token_here
   ```

   **On Windows (PowerShell):**

   ```powershell
   $env:TWILIO_ACCOUNT_SID="your_account_sid_here"
   $env:TWILIO_AUTH_TOKEN="your_auth_token_here"
   ```
3. Replace the value for `from` with the phone number that Twilio gave you in [E.164 format](/docs/glossary/what-e164).
4. Replace the value for `to` with the Twilio Virtual Phone number (`+18777804236`).
5. Save your changes and run this command from your terminal in the directory that contains `send_sms.js`:

   ```bash
   node send_sms.js
   ```

   After a few moments, you receive an SMS from your Twilio number on the Twilio Virtual Phone.

## PHP

1. Create and open a new file called `send_sms.php` in the project directory and paste in the following code:

   Send an SMS Using Twilio with PHP
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
           "body" =>
               "This is the ship that made the Kessel Run in fourteen parsecs?",
           "from" => "+15017122661",
       ]
   );

   print $message->body;
   ```
2. In the `send_sms.php` file, replace the values for `$sid` and `$token` with your Account SID and Auth Token surrounded by quotation marks.

   > \[!CAUTION]
   >
   > This quickstart hardcodes your credentials for faster setup. To keep credentials secret and control access when you deploy to production, use environment variables and [API keys](/docs/iam/api-keys).

   ```java
   // Using environment variables (recommended for production)
   public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
   public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

   // Initialize Twilio with environment variables
   Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
   ```

   **To set environment variables:**

   **On macOS/Linux:**

   ```bash
   export TWILIO_ACCOUNT_SID=your_account_sid_here
   export TWILIO_AUTH_TOKEN=your_auth_token_here
   ```

   **On Windows (Command Prompt):**

   ```cmd
   set TWILIO_ACCOUNT_SID=your_account_sid_here
   set TWILIO_AUTH_TOKEN=your_auth_token_here
   ```

   **On Windows (PowerShell):**

   ```powershell
   $env:TWILIO_ACCOUNT_SID="your_account_sid_here"
   $env:TWILIO_AUTH_TOKEN="your_auth_token_here"
   ```
3. Replace the value for `from` with the phone number that Twilio gave you in [E.164 format](/docs/glossary/what-e164).
4. Replace the value for `To` with the Twilio Virtual Phone number (`+18777804236`).
5. Update line 5 of `send_sms.php` to `require __DIR__ . '/vendor/autoload.php';`
6. Save your changes and run this command from your terminal in the directory that contains `send_sms.php`:

   ```bash
   php send_sms.php
   ```

   After a few moments, you receive an SMS from your Twilio number on the Twilio Virtual Phone.

## C# (.NET Framework)

1. Create and set up a new project in Visual Studio:
   1. Open Visual Studio and click **Create a new project**.
   2. Click **Console App (.NET Framework)**.
   3. Use the [NuGet Package Manager](https://learn.microsoft.com/en-us/nuget/consume-packages/install-use-packages-visual-studio) to install the Twilio REST API SDK.
2. Open the file in your new Visual Studio project called `Program.cs` and paste in the following code, replacing the existing template code:

   Send an SMS Using Twilio with C# (.NET Framework)
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
               body: "Join Earth's mightiest heroes. Like Kevin Bacon.",
               from: new Twilio.Types.PhoneNumber("+15017122661"),
               to: new Twilio.Types.PhoneNumber("+15558675310"));

           Console.WriteLine(message.Body);
       }
   }
   ```
3. In the `Program.cs` file, replace the values for `accountSid` and `authToken` with your Account SID and Auth Token surrounded by quotation marks.

   > \[!CAUTION]
   >
   > This quickstart hardcodes your credentials for faster setup. To keep credentials secret and control access when you deploy to production, use environment variables and [API keys](/docs/iam/api-keys).

   ```java
   // Using environment variables (recommended for production)
   public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
   public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

   // Initialize Twilio with environment variables
   Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
   ```

   **To set environment variables:**

   **On macOS/Linux:**

   ```bash
   export TWILIO_ACCOUNT_SID=your_account_sid_here
   export TWILIO_AUTH_TOKEN=your_auth_token_here
   ```

   **On Windows (Command Prompt):**

   ```cmd
   set TWILIO_ACCOUNT_SID=your_account_sid_here
   set TWILIO_AUTH_TOKEN=your_auth_token_here
   ```

   **On Windows (PowerShell):**

   ```powershell
   $env:TWILIO_ACCOUNT_SID="your_account_sid_here"
   $env:TWILIO_AUTH_TOKEN="your_auth_token_here"
   ```
4. Replace the value for `from: new Twilio.Types.PhoneNumber` with the phone number that Twilio gave you in [E.164 format](/docs/glossary/what-e164).
5. Replace the value for `to: new Twilio.Types.PhoneNumber` with the Twilio Virtual Phone number (`+18777804236`).
6. Save your changes and run your project in Visual Studio.

   After a few moments, you receive an SMS from your Twilio number on the Twilio Virtual Phone.

## C# (.NET Core)

1. Run the following commands to create a new .NET project and install the Twilio NuGet package:

   ```bash
   mkdir TwilioSend
   cd TwilioSend
   dotnet new console
   dotnet add package Twilio
   ```
2. Open the file in your new project called `Program.cs` and paste in the following code, replacing the existing template code:

   Send an SMS Using Twilio with C# (.NET Core)
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
               body: "Join Earth's mightiest heroes. Like Kevin Bacon.",
               from: new Twilio.Types.PhoneNumber("+15017122661"),
               to: new Twilio.Types.PhoneNumber("+15558675310"));

           Console.WriteLine(message.Body);
       }
   }
   ```
3. In the `Program.cs` file, replace the values for `accountSid` and `authToken` with your Account SID and Auth Token surrounded by quotation marks.

   > \[!CAUTION]
   >
   > This quickstart hardcodes your credentials for faster setup. To keep credentials secret and control access when you deploy to production, use environment variables and [API keys](/docs/iam/api-keys).

   ```java
   // Using environment variables (recommended for production)
   public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
   public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

   // Initialize Twilio with environment variables
   Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
   ```

   **To set environment variables:**

   **On macOS/Linux:**

   ```bash
   export TWILIO_ACCOUNT_SID=your_account_sid_here
   export TWILIO_AUTH_TOKEN=your_auth_token_here
   ```

   **On Windows (Command Prompt):**

   ```cmd
   set TWILIO_ACCOUNT_SID=your_account_sid_here
   set TWILIO_AUTH_TOKEN=your_auth_token_here
   ```

   **On Windows (PowerShell):**

   ```powershell
   $env:TWILIO_ACCOUNT_SID="your_account_sid_here"
   $env:TWILIO_AUTH_TOKEN="your_auth_token_here"
   ```
4. Replace the value for `from: new Twilio.Types.PhoneNumber` with the phone number that Twilio gave you in [E.164 format](/docs/glossary/what-e164).
5. Replace the value for `to: new Twilio.Types.PhoneNumber` with the Twilio Virtual Phone number (`+18777804236`).
6. Save your changes and run this command in the directory that contains `Program.cs`:

   ```bash
   dotnet run
   ```

   After a few moments, you receive an SMS from your Twilio number on the Twilio Virtual Phone.

## Java

1. Create and open a new file called `Example.java` in the same directory as the fat jar file and paste in the following code:

   Send an SMS Using Twilio with Java
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
                                     new com.twilio.type.PhoneNumber("+15017122661"),
                                     "This is the ship that made the Kessel Run in fourteen parsecs?")
                                 .create();

           System.out.println(message.getBody());
       }
   }
   ```
2. In the `Example.java` file, replace the values for `ACCOUNT_SID` and `AUTH_TOKEN` with your Account SID and Auth Token surrounded by quotation marks.

   > \[!CAUTION]
   >
   > This quickstart hardcodes your credentials for faster setup. To keep credentials secret and control access when you deploy to production, use environment variables and [API keys](/docs/iam/api-keys).

   ```java
   // Using environment variables (recommended for production)
   public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
   public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

   // Initialize Twilio with environment variables
   Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
   ```

   **To set environment variables:**

   **On macOS/Linux:**

   ```bash
   export TWILIO_ACCOUNT_SID=your_account_sid_here
   export TWILIO_AUTH_TOKEN=your_auth_token_here
   ```

   **On Windows (Command Prompt):**

   ```cmd
   set TWILIO_ACCOUNT_SID=your_account_sid_here
   set TWILIO_AUTH_TOKEN=your_auth_token_here
   ```

   **On Windows (PowerShell):**

   ```powershell
   $env:TWILIO_ACCOUNT_SID="your_account_sid_here"
   $env:TWILIO_AUTH_TOKEN="your_auth_token_here"
   ```
3. Replace the value for the first phone number with the Twilio Virtual Phone number (`+18777804236`).
4. Replace the value for the second phone number with the phone number that Twilio gave you in [E.164 format](/docs/glossary/what-e164).
5. Save your changes and compile the Java from your terminal in the directory that contains `Example.java`. Replace `10.9.0` with the version of your fat jar file.

   ```bash
   javac -cp twilio-10.9.0-jar-with-dependencies.jar Example.java
   ```
6. Run the Java. Replace `10.9.0` with the version of your fat jar file.

   On Linux or macOS, run:

   ```bash
   java -cp .:twilio-10.9.0-jar-with-dependencies.jar Example
   ```

   On Windows, run:

   ```bash
   java -cp ".;twilio-10.9.0-jar-with-dependencies.jar" Example
   ```

   After a few moments, you receive an SMS from your Twilio number on the Twilio Virtual Phone.

## Go

1. Create and set up your Go project.
   1. Create a new Go project by running the following command:

      ```bash
      go mod init twilio-example
      ```
   2. Install the [Gin Framework](https://gin-gonic.com/):

      ```bash
      go get -u github.com/gin-gonic/gin
      ```
   3. Install the [Twilio Go SDK](https://github.com/twilio/twilio-go):

      ```bash
      go get github.com/twilio/twilio-go
      ```
   4. Install the TwiML dependency:

      ```bash
      go get github.com/twilio/twilio-go/twiml@latest
      ```
2. Create and open a new file called `send_sms.go` in your Go project directory and paste in the following code:

   Send an SMS Using Twilio with Go
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
   	params.SetBody("Join Earth's mightiest heroes. Like Kevin Bacon.")
   	params.SetFrom("+15017122661")
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
3. Run the following command in the terminal to set your environment variables. Replace `<your-account-sid>` and `<your-auth-token>` with your Account SID and Auth Token:

   ```bash
   export TWILIO_ACCOUNT_SID=<your-account-sid>
   export TWILIO_AUTH_TOKEN=<your-auth-token>
   ```

   To learn more, see [Store your Twilio credentials securely](/docs/usage/secure-credentials).
4. Replace the value for `params.SetFrom` with the phone number that Twilio gave you in [E.164 format](/docs/glossary/what-e164).
5. Replace the value for `params.SetTo` with the Twilio Virtual Phone number (`+18777804236`).
6. Save your changes and run this command in the directory that contains `send_sms.go`:

   ```bash
   go run send_sms.go
   ```

   After a few moments, you receive an SMS from your Twilio number on the Twilio Virtual Phone.

## Ruby

1. Create and open a new file called `send_sms.rb` anywhere on your machine and paste in the following code:

   Send an SMS Using Twilio with Ruby
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
               body: 'Join Earth\'s mightiest heroes. Like Kevin Bacon.',
               from: '+15017122661',
               to: '+15558675310'
             )

   puts message.body
   ```
2. In the `send_sms.rb` file, replace the values for `account_sid` and `auth_token` with your Account SID and Auth Token surrounded by single quotation marks.

   > \[!CAUTION]
   >
   > This quickstart hardcodes your credentials for faster setup. To keep credentials secret and control access when you deploy to production, use environment variables and [API keys](/docs/iam/api-keys).

   ```java
   // Using environment variables (recommended for production)
   public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
   public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

   // Initialize Twilio with environment variables
   Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
   ```

   **To set environment variables:**

   **On macOS/Linux:**

   ```bash
   export TWILIO_ACCOUNT_SID=your_account_sid_here
   export TWILIO_AUTH_TOKEN=your_auth_token_here
   ```

   **On Windows (Command Prompt):**

   ```cmd
   set TWILIO_ACCOUNT_SID=your_account_sid_here
   set TWILIO_AUTH_TOKEN=your_auth_token_here
   ```

   **On Windows (PowerShell):**

   ```powershell
   $env:TWILIO_ACCOUNT_SID="your_account_sid_here"
   $env:TWILIO_AUTH_TOKEN="your_auth_token_here"
   ```
3. Replace the value for `from` with the phone number that Twilio gave you in [E.164 format](/docs/glossary/what-e164).
4. Replace the value for `to` with the Twilio Virtual Phone number (`+18777804236`).
5. Save your changes and run this command from your terminal in the directory that contains `send_sms.rb`:

   ```bash
   ruby send_sms.rb
   ```

   After a few moments, you receive an SMS from your Twilio number on the Twilio Virtual Phone.

## Receive and reply to an inbound SMS message

Follow these steps to reply to an SMS message sent to your Twilio phone number.

## Python

1. Create and open a new file called `reply_sms.py` anywhere on your machine and paste in the following code:

   ```python
   from flask import Flask, request, Response
   from twilio.twiml.messaging_response import MessagingResponse

   app = Flask(__name__)

   @app.route("/reply_sms", methods=['POST'])
   def reply_sms():
       # Create a new Twilio MessagingResponse
       resp = MessagingResponse()
       resp.message("The Robots are coming! Head for the hills!")

       # Return the TwiML (as XML) response
       return Response(str(resp), mimetype='text/xml')

   if __name__ == "__main__":
       app.run(port=3000)
   ```

   Save the file.
2. In a new terminal window, run the following command to start the Python development server on port 3000:

   ```bash
   python reply_sms.py 
   ```
3. In a new terminal window, run the following command to start [ngrok](https://ngrok.com/docs/what-is-ngrok/) and create a tunnel to your localhost:

   ```bash
   ngrok http 3000
   ```

   > \[!WARNING]
   >
   > Use ngrok only for testing because it creates a temporary URL that exposes your local development machine to the internet. Host your application with a cloud provider or your public server when you deploy to production.
4. Set up a webhook that triggers when your Twilio phone number receives an SMS message:

   1. Open the [Active Numbers page in the Twilio Console](https://console.twilio.com/us1/develop/phone-numbers/manage/incoming).
   2. Click your Twilio phone number.
   3. In the **Messaging Configuration** section, in the **URL** field for **A message comes in**, enter the temporary forwarding URL from your ngrok console with `/reply_sms` appended to the end.

      For example, if your ngrok console shows `Forwarding https://1aaa-123-45-678-910.ngrok-free.app`, enter `https://1aaa-123-45-678-910.ngrok-free.app/reply_sms`.
   4. Click **Save configuration**.
5. With the Python development server and ngrok running, send an SMS to your Twilio phone number:

   1. Enter a message in the **Click here to reply** field at the bottom of the Twilio Virtual Phone.
   2. Click the send icon.

   An HTTP request shows in your ngrok console, and you get the response back as an SMS on the Twilio Virtual Phone.

## Node.js

1. Create and open a new file called `server.js` anywhere on your machine and paste in the following code:

   Respond to an Incoming Text Message with Node.js
   ```js
   const express = require('express');
   const { MessagingResponse } = require('twilio').twiml;

   const app = express();

   app.post('/sms', (req, res) => {
     const twiml = new MessagingResponse();

     twiml.message('The Robots are coming! Head for the hills!');

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
3. In a new terminal window, run the following command to start [ngrok](https://ngrok.com/docs/what-is-ngrok/) and create a tunnel to your localhost:

   ```bash
   ngrok http 3000
   ```

   > \[!WARNING]
   >
   > Use ngrok only for testing because it creates a temporary URL that exposes your local development machine to the internet. Host your application with a cloud provider or your public server when you deploy to production.
4. Set up a webhook that triggers when your Twilio phone number receives an SMS message:

   1. Open the [Active Numbers page in the Twilio Console](https://console.twilio.com/us1/develop/phone-numbers/manage/incoming).
   2. Click the phone number that Twilio gave you.
   3. In the **Messaging Configuration** section, in the **URL** field for **A message comes in**, enter the temporary forwarding URL from your ngrok console with `/sms` appended to the end.

      For example, if your ngrok console shows `Forwarding https://1aaa-123-45-678-910.ngrok-free.app`, enter `https://1aaa-123-45-678-910.ngrok-free.app/sms`.
5. Click **Save configuration**.
6. With the Node.js development server and ngrok running, send an SMS to your Twilio phone number:

   1. Enter a message in the **Click here to reply** field at the bottom of the Twilio Virtual Phone.
   2. Click the send icon.

   An HTTP request shows in your ngrok console, and you get the response back as an SMS on the Twilio Virtual Phone.

## PHP

1. Create and open a new file called `reply_sms.php` in the same directory as `send_sms.php` and paste in the following code:

   ```php
   <?php
   require_once "vendor/autoload.php";
   use Twilio\TwiML\MessagingResponse;

   // Set the content-type to XML to send back TwiML from the PHP SDK
   header("content-type: text/xml");

   $response = new MessagingResponse();
   $response->message(
       "The Robots are coming! Head for the hills!"
   );

   echo $response;
   ```

   Save the file.
2. In a new terminal window, start the PHP development server on port 3000 by running this command:

   ```bash
   php -S localhost:3000
   ```
3. In a new terminal window, run the following command to start [ngrok](https://ngrok.com/docs/what-is-ngrok/) and create a tunnel to your localhost:

   ```bash
   ngrok http 3000
   ```

   > \[!WARNING]
   >
   > Use ngrok only for testing because it creates a temporary URL that exposes your local development machine to the internet. Host your application with a cloud provider or your public server when you deploy to production.
4. Set up a webhook that triggers when your Twilio phone number receives an SMS message:

   1. Open the [Active Numbers page in the Twilio Console](https://console.twilio.com/us1/develop/phone-numbers/manage/incoming).
   2. Click your Twilio phone number.
   3. In the **Messaging Configuration** section, in the **URL** field for **A message comes in**, enter the temporary forwarding URL from your ngrok console with `/reply_sms.php` appended to the end.

      For example, if your ngrok console shows `Forwarding https://1aaa-123-45-678-910.ngrok-free.app`, enter `https://1aaa-123-45-678-910.ngrok-free.app/reply_sms.php`.
   4. Click **Save configuration**.
5. With the PHP development server and ngrok running, send an SMS to your Twilio phone number:

   1. Enter a message in the **Click here to reply** field at the bottom of the Twilio Virtual Phone.
   2. Click the send icon.

   An HTTP request shows in your ngrok console, and you get the response back as an SMS on the Twilio Virtual Phone.

## C# (.NET Framework)

1. Create a new ASP.NET MVC Project in Visual Studio:
   1. Open Visual Studio and click **Create a new project**.
   2. Click **ASP.NET Web Application (.NET Framework)**.
   3. Click **MVC** to select the project type.
   4. Use the [NuGet Package Manager](https://learn.microsoft.com/en-us/nuget/consume-packages/install-use-packages-visual-studio) to install the Twilio.AspNet.Mvc package.
2. Create a new controller:
   1. Open the project directory.
   2. Right-click on the `Controllers` folder
   3. Select `Add` > `Controller...` > `MVC 5 Controller - Empty`.
   4. Name the file `SmsController.cs`.
3. Paste the following code into `SmsController.cs`:

   ```cs
   // Code sample for ASP.NET MVC on .NET Framework 4.6.1+
   // In Package Manager, run:
   // Install-Package Twilio.AspNet.Mvc -DependencyVersion HighestMinor

   using Twilio.AspNet.Common;
   using Twilio.AspNet.Mvc;
   using Twilio.TwiML;

   namespace WebApplication1.Controllers
   {
       public class SmsController : TwilioController
       {
           public TwiMLResult Index(SmsRequest incomingMessage)
           {
               var messagingResponse = new MessagingResponse();
               messagingResponse.Message("The copy cat says: " +
                                         incomingMessage.Body);

               return TwiML(messagingResponse);
           }
       }
   }
   ```

   Save the file.
4. In Visual Studio, run the application by clicking the play arrow. Your web browser opens on a localhost URL. Note the port number; for example, if the URL opens on `https://localhost:44360`, your port number is `44360`.
5. In a new terminal window, run the following command to start [ngrok](https://ngrok.com/docs/what-is-ngrok/) and create a tunnel to your localhost. Replace `<port>` with the port number from your application.

   ```bash
   ngrok http <port>
   ```

   > \[!WARNING]
   >
   > Use ngrok only for testing because it creates a temporary URL that exposes your local development machine to the internet. Host your application with a cloud provider or your public server when you deploy to production.
6. Set up a webhook that triggers when your Twilio phone number receives an SMS message:

   1. Open the [Active Numbers page in the Twilio Console](https://console.twilio.com/us1/develop/phone-numbers/manage/incoming).
   2. Click your Twilio phone number.
   3. In the **Messaging Configuration** section, in the **URL** field for **A message comes in**, enter the temporary forwarding URL from your ngrok console with `/sms` appended to the end.

      For example, if your ngrok console shows `Forwarding https://1aaa-123-45-678-910.ngrok-free.app`, enter `https://1aaa-123-45-678-910.ngrok-free.app/sms`.
   4. Click **Save configuration**.
7. With the application and ngrok running, send an SMS to your Twilio phone number:

   1. Enter a message in the **Click here to reply** field at the bottom of the Twilio Virtual Phone.
   2. Click the send icon.

   An HTTP request shows in your ngrok console, and you get the response back as an SMS on the Twilio Virtual Phone.

## C# (.NET Core)

1. Run the following commands to create a new ASP.NET Core project and install the Twilio NuGet package:

   ```bash
   mkdir TwilioReceive
   cd TwilioReceive
   dotnet new mvc
   dotnet add package Twilio.AspNet.Core
   ```
2. In the `Controllers` directory, create a file named `SmsController.cs` and paste in the following code:

   ```cs
   // Code sample for ASP.NET Core on .NET Core
   // From command prompt, run:
   // dotnet add package Twilio.AspNet.Core

   using Twilio.AspNet.Common;
   using Twilio.AspNet.Core;
   using Twilio.TwiML;

   namespace TwilioReceive.Controllers
   {
       public class SmsController : TwilioController
       {
           public TwiMLResult Index(SmsRequest incomingMessage)
           {
               var messagingResponse = new MessagingResponse();
               messagingResponse.Message("The copy cat says: " +
                                         incomingMessage.Body);

               return TwiML(messagingResponse);
           }
       }
   }
   ```

   Save the file.
3. From the root of the project directory, run following command to start the application:

   ```bash
   dotnet run
   ```
4. Check the command output for the localhost URL. Note the port number; for example, if the URL opens on `https://localhost:5242`, your port number is `5242`.
5. In a new terminal window, run the following command to start [ngrok](https://ngrok.com/docs/what-is-ngrok/) and create a tunnel to your localhost. Replace `<port>` with the port number from your command output.

   ```bash
   ngrok http <port>
   ```

   > \[!WARNING]
   >
   > Use ngrok only for testing because it creates a temporary URL that exposes your local development machine to the internet. Host your application with a cloud provider or your public server when you deploy to production.
6. Set up a webhook that triggers when your Twilio phone number receives an SMS message:

   1. Open the [Active Numbers page in the Twilio Console](https://console.twilio.com/us1/develop/phone-numbers/manage/incoming).
   2. Click your Twilio phone number.
   3. In the **Messaging Configuration** section, in the **URL** field for **A message comes in**, enter the temporary forwarding URL from your ngrok console with `/sms` appended to the end.

      For example, if your ngrok console shows `Forwarding https://1aaa-123-45-678-910.ngrok-free.app`, enter `https://1aaa-123-45-678-910.ngrok-free.app/sms`.
   4. Click **Save configuration**.
7. With the application and ngrok running, send an SMS to your Twilio phone number:

   1. Enter a message in the **Click here to reply** field at the bottom of the Twilio Virtual Phone.
   2. Click the send icon.

   An HTTP request shows in your ngrok console, and you get the response back as an SMS on the Twilio Virtual Phone.

## Java

1. Create and set up the IntelliJ project.

   1. Open IntelliJ IDEA Community Edition.
   2. Create a new project with either **Maven** or **Gradle** as the build system.
   3. Install the following dependencies [with Maven](https://www.jetbrains.com/help/idea/work-with-maven-dependencies.html#) or [with Gradle](https://www.jetbrains.com/help/idea/work-with-gradle-dependency-diagram.html#):
      * `com.twilio.sdk:twilio`
      * `com.sparkjava:sparkcore`
      * `org.slf4j`
        To learn more about the dependencies, see [SparkJava](https://github.com/perwendel/spark) and [Simple Logging Facade 4 Java (SLF4J)](https://www.slf4j.org/).
   4. Select the `java` folder under `src` > `main`.
   5. Click **File** > **New**> **Java Class** to create a new Java class. Name the class `SmsApp`.
2. In the new `SmsApp.java` file that IntelliJ creates, paste in the following code:

   Respond to an Incoming Text Message with Java

   ```java
   import com.twilio.twiml.MessagingResponse;
   import com.twilio.twiml.messaging.Body;
   import com.twilio.twiml.messaging.Message;

   import static spark.Spark.*;

   public class SmsApp {
       public static void main(String[] args) {
           get("/", (req, res) -> "Hello Web");

           post("/sms", (req, res) -> {
               res.type("application/xml");
               Body body = new Body
                       .Builder("The Robots are coming! Head for the hills!")
                       .build();
               Message sms = new Message
                       .Builder()
                       .body(body)
                       .build();
               MessagingResponse twiml = new MessagingResponse
                       .Builder()
                       .message(sms)
                       .build();
               return twiml.toXml();
           });
       }
   }
   ```
3. Right-click on the **SmsApp** class in the project outline and choose **Run 'SmsApp.main()'**.

   The Java spark web application server starts listening on port 4567.
4. In a new terminal window, run the following command to start [ngrok](https://ngrok.com/docs/what-is-ngrok/) and create a tunnel to your localhost:

   ```bash
   ngrok http 4567
   ```

   > \[!WARNING]
   >
   > Use ngrok only for testing because it creates a temporary URL that exposes your local development machine to the internet. Host your application with a cloud provider or your public server when you deploy to production.
5. Set up a webhook that triggers when your Twilio phone number receives an SMS message:

   1. Open the [Active Numbers page in the Twilio Console](https://console.twilio.com/us1/develop/phone-numbers/manage/incoming).
   2. Click the phone number that Twilio gave you.
   3. In the **Messaging Configuration** section, in the **URL** field for **A message comes in**, enter the temporary forwarding URL from your ngrok console with `/sms` appended to the end.

      For example, if your ngrok console shows `Forwarding https://1aaa-123-45-678-910.ngrok-free.app`, enter `https://1aaa-123-45-678-910.ngrok-free.app/sms`.
   4. Click **Save configuration**.
6. With the Java development server and ngrok running, send an SMS to your Twilio phone number:

   1. Enter a message in the **Click here to reply** field at the bottom of the Twilio Virtual Phone.
   2. Click the send icon.

   An HTTP request shows in your ngrok console, and you get the response back as an SMS on the Twilio Virtual Phone.

## Go

1. Create and open a new file called `server.go` in your Go project directory and paste in the following code:

   Respond to an Incoming Text Message with Go
   ```go
   package main

   import (
   	"net/http"

   	"github.com/gin-gonic/gin"
   	"github.com/twilio/twilio-go/twiml"
   )

   func main() {
   	router := gin.Default()

   	router.POST("/sms", func(context *gin.Context) {
   		message := &twiml.MessagingMessage{
   			Body: "The Robots are coming! Head for the hills!",
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
2. In a new terminal window, start the Go development server on port 3000 by running this command in the directory that contains `server.go`:

   ```bash
   go run server.go
   ```
3. In a new terminal window, run the following command to start [ngrok](https://ngrok.com/docs/what-is-ngrok/) and create a tunnel to your localhost:

   ```bash
   ngrok http 3000
   ```

   > \[!WARNING]
   >
   > Use ngrok only for testing because it creates a temporary URL that exposes your local development machine to the internet. Host your application with a cloud provider or your public server when you deploy to production.
4. Set up a webhook that triggers when your Twilio phone number receives an SMS message:

   1. Open the [Active Numbers page in the Twilio Console](https://console.twilio.com/us1/develop/phone-numbers/manage/incoming).
   2. Click the phone number that Twilio gave you.
   3. In the **Messaging Configuration** section, in the **URL** field for **A message comes in**, enter the temporary forwarding URL from your ngrok console with `/sms` appended to the end.

      For example, if your ngrok console shows `Forwarding https://1aaa-123-45-678-910.ngrok-free.app`, enter `https://1aaa-123-45-678-910.ngrok-free.app/sms`.
   4. Click **Save configuration**.
5. With the Go development server and ngrok running, send an SMS to your Twilio phone number:

   1. Enter a message in the **Click here to reply** field at the bottom of the Twilio Virtual Phone.
   2. Click the send icon.

   An HTTP request shows in your ngrok console, and you get the response back as an SMS on the Twilio Virtual Phone.

## Ruby

1. To install [Sinatra](https://sinatrarb.com/) and the [Twilio Ruby SDK](https://github.com/twilio/twilio-ruby), create and open a new file called `Gemfile` anywhere on your machine and paste in the following code.

   If you prefer to use the Rails framework, see the [How to Receive and Reply to an SMS in Rails with Twilio](https://www.twilio.com/en-us/blog/receive-and-reply-to-sms-in-rails-html).

   ```bash
   # Gemfile
   source 'https://rubygems.org'

   gem 'sinatra'
   gem 'twilio-ruby'
   ```
2. In the same directory as `Gemfile`, run the following command from the terminal:

   ```bash
   bundle install
   ```
3. Create and open a new file called `reply_sms.rb` in the same directory as `Gemfile` and paste in the following code:

   ```ruby
   require 'twilio-ruby'
   require 'sinatra'

   # disable HostAuthorization for development only
   configure :development do
       set :host_authorization, { permitted_hosts: [] }
     end

   post '/sms-quickstart' do
     twiml = Twilio::TwiML::MessagingResponse.new do |r|
       r.message(body: 'Ahoy! Thanks so much for your message.')
     end

     twiml.to_s
   end
   ```

   Save the file.
4. In a new terminal window, start the Ruby development server on port 4567 by running this command:

   ```bash
   ruby reply_sms.rb
   ```
5. In a new terminal window, run the following command to start [ngrok](https://ngrok.com/docs/what-is-ngrok/) and create a tunnel to your localhost:

   ```bash
   ngrok http 4567
   ```

   > \[!WARNING]
   >
   > Use ngrok only for testing because it creates a temporary URL that exposes your local development machine to the internet. Host your application with a cloud provider or your public server when you deploy to production.
6. Set up a webhook that triggers when your Twilio phone number receives an SMS message:

   1. Open the [Active Numbers page in the Twilio Console](https://console.twilio.com/us1/develop/phone-numbers/manage/incoming).
   2. Click your Twilio phone number.
   3. In the **Messaging Configuration** section, in the **URL** field for **A message comes in**, enter the temporary forwarding URL from your ngrok console with `/sms-quickstart` appended to the end.

      For example, if your ngrok console shows `Forwarding https://1aaa-123-45-678-910.ngrok-free.app`, enter `https://1aaa-123-45-678-910.ngrok-free.app/sms-quickstart`.
   4. Click **Save configuration**.
7. With the Ruby development server and ngrok running, send an SMS to your Twilio phone number:

   1. Enter a message in the **Click here to reply** field at the bottom of the Twilio Virtual Phone.
   2. Click the send icon.

   An HTTP request shows in your ngrok console, and you get the response back as an SMS on the Twilio Virtual Phone.

## Next steps

* [Upgrade your account in the Twilio Console](https://console.twilio.com/account/upgrade).
* Learn about [toll-free verification](/docs/messaging/compliance/toll-free/console-onboarding) and [A2P 10DLC registration](/docs/messaging/compliance/a2p-10dlc). Regulations require:
  * Toll-free verification to send SMS messages from toll-free numbers to mobile phones in the US and Canada.
  * A2P 10DLC registration to send SMS messages from local numbers to mobile phones in the US.
* Browse the following developer resources:
  * [Messaging API Reference](/docs/messaging/api)
  * [TwiML documentation](/docs/messaging/twiml)
