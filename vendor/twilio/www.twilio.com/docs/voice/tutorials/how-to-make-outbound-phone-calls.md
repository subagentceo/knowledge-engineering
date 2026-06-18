# Make outbound phone calls

In this tutorial, you'll learn how to make and manage outbound phone calls with [Twilio Programmable Voice](https://www.twilio.com/en-us/voice) and your preferred programming language. You'll use the [Calls resource](/docs/voice/api/call-resource) in the [Twilio Voice API](/docs/voice/api).

## Complete the prerequisites

## Python

1. [Install Python](https://www.python.org/downloads/).
2. Install the [Twilio Python SDK](https://github.com/twilio/twilio-python). To install using pip, run:

```bash
pip install twilio
```

* Sign up for Twilio and get a phone number:
  1. [Sign up for Twilio](https://www.twilio.com/try-twilio).
  2. To get a phone that has voice capabilities, do either of the following in the [Twilio Console](https://console.twilio.com):
     * In the **Account Dashboard**, click **Get a phone number**.
     * In the navigation menu, go to **Phone Numbers > Manage > Buy a number**.
  3. In the **Account Dashboard**, copy your **Account SID** and **Auth Token** and paste them in a temporary local file for use later in this quickstart.

## Node.js

1. [Install Node.js](https://nodejs.org/).
2. Install the [Twilio Node.js SDK](https://github.com/twilio/twilio-node):

```bash
npm install twilio
```

* Sign up for Twilio and get a phone number:
  1. [Sign up for Twilio](https://www.twilio.com/try-twilio).
  2. To get a phone that has voice capabilities, do either of the following in the [Twilio Console](https://console.twilio.com):
     * In the **Account Dashboard**, click **Get a phone number**.
     * In the navigation menu, go to **Phone Numbers > Manage > Buy a number**.
  3. In the **Account Dashboard**, copy your **Account SID** and **Auth Token** and paste them in a temporary local file for use later in this quickstart.

## PHP

1. [Install PHP](http://php.net/manual/en/install.php).
2. Install dependencies with Composer:
3. [Install Composer](https://getcomposer.org/doc/00-intro.md).
4. Install the [Twilio PHP SDK](https://github.com/twilio/twilio-php):

   ```bash
   composer require twilio/sdk
   composer install
   ```

* Sign up for Twilio and get a phone number:
  1. [Sign up for Twilio](https://www.twilio.com/try-twilio).
  2. To get a phone that has voice capabilities, do either of the following in the [Twilio Console](https://console.twilio.com):
     * In the **Account Dashboard**, click **Get a phone number**.
     * In the navigation menu, go to **Phone Numbers > Manage > Buy a number**.
  3. In the **Account Dashboard**, copy your **Account SID** and **Auth Token** and paste them in a temporary local file for use later in this quickstart.

## C# (.NET Core)

* [Install .NET Core](https://www.microsoft.com/net/).

- Sign up for Twilio and get a phone number:
  1. [Sign up for Twilio](https://www.twilio.com/try-twilio).
  2. To get a phone that has voice capabilities, do either of the following in the [Twilio Console](https://console.twilio.com):
     * In the **Account Dashboard**, click **Get a phone number**.
     * In the navigation menu, go to **Phone Numbers > Manage > Buy a number**.
  3. In the **Account Dashboard**, copy your **Account SID** and **Auth Token** and paste them in a temporary local file for use later in this quickstart.

## Java

1. [Install Java Standard Edition (SE) Development Kit](https://www.oracle.com/java/technologies/downloads/).
2. Install [Gradle](https://gradle.org/install/).
3. [Install Java 8 or later](https://www.oracle.com/java/technologies/downloads/).

* Sign up for Twilio and get a phone number:
  1. [Sign up for Twilio](https://www.twilio.com/try-twilio).
  2. To get a phone that has voice capabilities, do either of the following in the [Twilio Console](https://console.twilio.com):
     * In the **Account Dashboard**, click **Get a phone number**.
     * In the navigation menu, go to **Phone Numbers > Manage > Buy a number**.
  3. In the **Account Dashboard**, copy your **Account SID** and **Auth Token** and paste them in a temporary local file for use later in this quickstart.

## Go

* [Install Go](https://go.dev/doc/install).

- Sign up for Twilio and get a phone number:
  1. [Sign up for Twilio](https://www.twilio.com/try-twilio).
  2. To get a phone that has voice capabilities, do either of the following in the [Twilio Console](https://console.twilio.com):
     * In the **Account Dashboard**, click **Get a phone number**.
     * In the navigation menu, go to **Phone Numbers > Manage > Buy a number**.
  3. In the **Account Dashboard**, copy your **Account SID** and **Auth Token** and paste them in a temporary local file for use later in this quickstart.

## Ruby

1. [Install Ruby](https://www.ruby-lang.org/en/documentation/installation/).
2. Install the [Twilio Ruby SDK](https://github.com/twilio/twilio-ruby):

```bash
gem install twilio-ruby
```

* Sign up for Twilio and get a phone number:
  1. [Sign up for Twilio](https://www.twilio.com/try-twilio).
  2. To get a phone that has voice capabilities, do either of the following in the [Twilio Console](https://console.twilio.com):
     * In the **Account Dashboard**, click **Get a phone number**.
     * In the navigation menu, go to **Phone Numbers > Manage > Buy a number**.
  3. In the **Account Dashboard**, copy your **Account SID** and **Auth Token** and paste them in a temporary local file for use later in this quickstart.

## Make an outbound call

## Python

1. Create and open a new file called `make_call.py` anywhere on your machine and paste in the following code:

   Make an outbound call with TwiML

   ```python
   # Download the helper library from https://www.twilio.com/docs/python/install
   import os
   from twilio.rest import Client

   # Find your Account SID and Auth Token at twilio.com/console
   # and set the environment variables. See http://twil.io/secure
   account_sid = os.environ["TWILIO_ACCOUNT_SID"]
   auth_token = os.environ["TWILIO_AUTH_TOKEN"]
   client = Client(account_sid, auth_token)

   call = client.calls.create(
       twiml="<Response><Say>Ahoy, World</Say></Response>",
       to="+14158675309",
       from_="+14158675308",
   )

   print(call.sid)
   ```

   To learn all of the API response values that you can return with `print()`, see the response for [Create a call in the API documentation](/docs/voice/api/call-resource#create-a-call). Precede the response value with `call.` (for example: `print(call.sid)` returns the `sid` value).
2. Set the environment variables for your Account SID and Auth Token.

   > \[!WARNING]
   >
   > To better control access, use API keys instead of the Account SID and Auth Token when you deploy to production. To learn more, see [Why you should use API keys](/docs/iam/api-keys#why-you-should-use-api-keys).

   * On Mac or Linux:

     1. Run the following commands to add your credentials as environment variables in a `twilio.env` file and source them. Replace `ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` with your Account SID and replace `your_auth_token` with your Auth Token.

     ```bash
     echo "export TWILIO_ACCOUNT_SID='ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'" > twilio.env
     echo "export TWILIO_AUTH_TOKEN='your_auth_token'" >> twilio.env
     source ./twilio.env
     ```

     2. If you're committing code with git, run the following command to add the `twilio.env` file to `.gitignore` to avoid uploading your credentials in plain text:

        ```bash
        echo "twilio.env" >> .gitignore
        ```
   * On Windows command line (cmd.exe):

     Run the following commands. Replace `ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` with your Account SID and replace `your_auth_token` with your Auth Token.

     ```bash
     set TWILIO_ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
     set TWILIO_AUTH_TOKEN=your_auth_token
     ```

   Learn more about [storing your Twilio credentials safely](/docs/usage/secure-credentials).
3. In the `make_call.py` file, do the following:
   * Replace the value for `to` with the recipient phone number in [E.164 format](/docs/glossary/what-e164).
   * Replace the value for `from` with your Twilio phone number in [E.164 format](/docs/glossary/what-e164).
   * Replace the value for `twiml` with your desired TwiML instructions.

     * To use a hosted TwiML URL, replace `twiml` with `url` and set the value to the URL that hosts your TwiML instructions. For example:

       ```bash
       url="http://demo.twilio.com/docs/voice.xml"
       ```

       The following `voice.xml` file is hosted at `http://demo.twilio.com/docs/voice.xml` uses the `<Say>` and the `<Play>` TwiML tags to read a message and play an MP3 file for the user.

       ```xml
       <?xml version="1.0" encoding="UTF-8"?>
           <Response>
               <Say voice="Polly.Joanna-Generative">Thanks for trying our documentation. Enjoy!</Say>
               <Play>http://demo.twilio.com/docs/classic.mp3</Play>
           </Response>
       </xml>
       ```
     * To use a TwiML application to handle calls, replace `twiml` with `application_sid` and set the value to your TwiML application's SID. You can create and configure applications on the TwiML apps page in [Console](https://1console.twilio.com/) (**Develop** > **TwiML apps**). If you're using legacy Console, go to **Voice** > **Manage** > [**TwiML apps**](https://www.twilio.com/console/voice/runtime/twiml-apps).

       ```bash
       application_sid="<YOUR_TWIML_APP_SID>"
       ```

       When your outbound call is connected, Twilio will make a request to the Voice URL set on your application.

       > \[!WARNING]
       >
       > The `application_sid` take precedence over the `twiml` and `url` parameters and ignores the following parameters: `method`, `fallback_url`, `fallback_method`, `status_callback`, `status_callback_method`. Twilio expects that your application handles all of this information. Learn more about the [Calls resource](/docs/voice/api/call-resource).
4. Save your changes and run this command from your terminal in the directory that contains `make_call.py`:

   ```bash
   python make_call.py
   ```

After a few moments, you receive a call from your Twilio number.

## Node.js

1. Create and open a new file called `make_call.js` anywhere on your machine and paste in the following code:

   Make an outbound call with TwiML

   ```js
   // Download the helper library from https://www.twilio.com/docs/node/install
   const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

   // Find your Account SID and Auth Token at twilio.com/console
   // and set the environment variables. See http://twil.io/secure
   const accountSid = process.env.TWILIO_ACCOUNT_SID;
   const authToken = process.env.TWILIO_AUTH_TOKEN;
   const client = twilio(accountSid, authToken);

   async function createCall() {
     const call = await client.calls.create({
       from: "+14158675308",
       to: "+14158675309",
       twiml: "<Response><Say>Ahoy, World</Say></Response>",
     });

     console.log(call.sid);
   }

   createCall();
   ```

   To learn all of the API response values that you can return with `console.log()`, see the response for [Create a call in the API documentation](/docs/voice/api/call-resource#create-a-call). Precede the response value with `call.` (for example: `console.log(call.sid)` returns the `sid` value).
2. Set the environment variables for your Account SID and Auth Token.

   > \[!WARNING]
   >
   > To better control access, use API keys instead of the Account SID and Auth Token when you deploy to production. To learn more, see [Why you should use API keys](/docs/iam/api-keys#why-you-should-use-api-keys).

   * On Mac or Linux:

     1. Run the following commands to add your credentials as environment variables in a `twilio.env` file and source them. Replace `ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` with your Account SID and replace `your_auth_token` with your Auth Token.

     ```bash
     echo "export TWILIO_ACCOUNT_SID='ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'" > twilio.env
     echo "export TWILIO_AUTH_TOKEN='your_auth_token'" >> twilio.env
     source ./twilio.env
     ```

     2. If you're committing code with git, run the following command to add the `twilio.env` file to `.gitignore` to avoid uploading your credentials in plain text:

        ```bash
        echo "twilio.env" >> .gitignore
        ```
   * On Windows command line (cmd.exe):

     Run the following commands. Replace `ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` with your Account SID and replace `your_auth_token` with your Auth Token.

     ```bash
     set TWILIO_ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
     set TWILIO_AUTH_TOKEN=your_auth_token
     ```

   Learn more about [storing your Twilio credentials safely](/docs/usage/secure-credentials).
3. In the `make_call.js` file, do the following:
   * Replace the value for `to` with the recipient phone number in [E.164 format](/docs/glossary/what-e164).
   * Replace the value for `from` with your Twilio phone number in [E.164 format](/docs/glossary/what-e164).
   * Replace the value for `twiml` with your desired TwiML instructions.
     * To use a hosted TwiML URL, replace `twiml` with `url` and set the value to the URL that hosts your TwiML instructions. For example:

       ```bash
       url="http://demo.twilio.com/docs/voice.xml"
       ```

       The following `voice.xml` file is hosted at `http://demo.twilio.com/docs/voice.xml` uses the `<Say>` and the `<Play>` TwiML tags to read a message and play an MP3 file for the user.

       ```xml
       <?xml version="1.0" encoding="UTF-8"?>
           <Response>
               <Say voice="Polly.Joanna-Generative">Thanks for trying our documentation. Enjoy!</Say>
               <Play>http://demo.twilio.com/docs/classic.mp3</Play>
           </Response>
       </xml>
       ```
     * To use a TwiML application to handle calls, replace `twiml` with `applicationSid` and set the value to your TwiML application's SID. You can create and configure applications on the TwiML apps page in [Console](https://1console.twilio.com/) (**Develop** > **TwiML apps**). If you're using legacy Console, go to **Voice** > **Manage** > [**TwiML apps**](https://www.twilio.com/console/voice/runtime/twiml-apps).

       ```bash
       applicationSid="<YOUR_TWIML_APP_SID>"
       ```

       When your outbound call is connected, Twilio will make a request to the Voice URL set on your application.

       > \[!WARNING]
       >
       > The `applicationSid` take precedence over the `twiml` and `url` parameters and ignores the following parameters: `method`, `fallbackUrl`, `fallbackMethod`, `statusCallback`, `statusCallbackMethod`. Twilio expects that your application handles all of this information. Learn more about the [Calls resource](/docs/voice/api/call-resource).
4. Save your changes and run this command from your terminal in the directory that contains `make_call.js`:

   ```bash
   node make_call.js
   ```

After a few moments, you receive a call from your Twilio number.

## PHP

1. Create and open a new file called `make_call.php` anywhere on your machine and paste in the following code:

   Make an outbound call with TwiML

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

   $call = $twilio->calls->create(
       "+14158675309", // To
       "+14158675308", // From
       ["twiml" => "<Response><Say>Ahoy, World</Say></Response>"]
   );

   print $call->sid;
   ```

   To learn all of the API response values that you can return with `print`, see the response for [Create a call in the API documentation](/docs/voice/api/call-resource#create-a-call). Precede the response value with `$call->` (for example: `print($call->sid)` returns the `sid` value).
2. Set the environment variables for your Account SID and Auth Token.

   > \[!WARNING]
   >
   > To better control access, use API keys instead of the Account SID and Auth Token when you deploy to production. To learn more, see [Why you should use API keys](/docs/iam/api-keys#why-you-should-use-api-keys).

   * On Mac or Linux:

     1. Run the following commands to add your credentials as environment variables in a `twilio.env` file and source them. Replace `ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` with your Account SID and replace `your_auth_token` with your Auth Token.

     ```bash
     echo "export TWILIO_ACCOUNT_SID='ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'" > twilio.env
     echo "export TWILIO_AUTH_TOKEN='your_auth_token'" >> twilio.env
     source ./twilio.env
     ```

     2. If you're committing code with git, run the following command to add the `twilio.env` file to `.gitignore` to avoid uploading your credentials in plain text:

        ```bash
        echo "twilio.env" >> .gitignore
        ```
   * On Windows command line (cmd.exe):

     Run the following commands. Replace `ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` with your Account SID and replace `your_auth_token` with your Auth Token.

     ```bash
     set TWILIO_ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
     set TWILIO_AUTH_TOKEN=your_auth_token
     ```

   Learn more about [storing your Twilio credentials safely](/docs/usage/secure-credentials).
3. In the `make_call.php` file, do the following:
   * Replace `+14155551212` with the recipient phone number in [E.164 format](/docs/glossary/what-e164).
   * Replace `+15017122661` with your Twilio phone number in [E.164 format](/docs/glossary/what-e164).
   * Replace the value for `twiml` with your desired TwiML instructions.
     * To use a hosted TwiML URL, replace `twiml` with `url` and set the value to the URL that hosts your TwiML instructions. For example:

       ```bash
       url="http://demo.twilio.com/docs/voice.xml"
       ```

       The following `voice.xml` file is hosted at `http://demo.twilio.com/docs/voice.xml` uses the `<Say>` and the `<Play>` TwiML tags to read a message and play an MP3 file for the user.

       ```xml
       <?xml version="1.0" encoding="UTF-8"?>
           <Response>
               <Say voice="Polly.Joanna-Generative">Thanks for trying our documentation. Enjoy!</Say>
               <Play>http://demo.twilio.com/docs/classic.mp3</Play>
           </Response>
       </xml>
       ```
     * To use a TwiML application to handle calls, replace `twiml` with `applicationSid` and set the value to your TwiML application's SID. You can create and configure applications on the TwiML apps page in [Console](https://1console.twilio.com/) (**Develop** > **TwiML apps**). If you're using legacy Console, go to **Voice** > **Manage** > [**TwiML apps**](https://www.twilio.com/console/voice/runtime/twiml-apps).

       ```bash
       applicationSid="<YOUR_TWIML_APP_SID>"
       ```

       When your outbound call is connected, Twilio will make a request to the Voice URL set on your application.

       > \[!WARNING]
       >
       > The `applicationSid` take precedence over the `twiml` and `url` parameters and ignores the following parameters: `method`, `fallbackUrl`, `fallbackMethod`, `statusCallback`, `statusCallbackMethod`. Twilio expects that your application handles all of this information. Learn more about the [Calls resource](/docs/voice/api/call-resource).
   * Update line 5 of `make_call.php` to `require __DIR__ . '/vendor/autoload.php';`
4. Save your changes and run this command from your terminal in the directory that contains `make_call.php`:
   ```bash
   php make_call.php
   ```

After a few moments, you'll receive a call from your Twilio number.

## C# (.NET Core)

1. Run the following commands to create a new .NET project and install the Twilio NuGet package:

   ```bash
   mkdir make-call
   cd make-call
   dotnet new app
   dotnet add package Twilio
   ```
2. Open the `Program.cs` file in your favorite text editor and replace its contents with the following code:

   Make an outbound call with TwiML

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

           var call = await CallResource.CreateAsync(
               twiml: new Twilio.Types.Twiml("<Response><Say>Ahoy, World</Say></Response>"),
               to: new Twilio.Types.PhoneNumber("+14158675309"),
               from: new Twilio.Types.PhoneNumber("+14158675308"));

           Console.WriteLine(call.Sid);
       }
   }
   ```

   To learn all of the API response values that you can return with `Console.WriteLine()`, see the response for [Create a call in the API documentation](/docs/voice/api/call-resource#create-a-call). Precede the response value with `call.` (for example: `Console.WriteLine(call.Sid)` returns the `sid` value).
3. Set the environment variables for your Account SID and Auth Token.

   > \[!WARNING]
   >
   > To better control access, use API keys instead of the Account SID and Auth Token when you deploy to production. To learn more, see [Why you should use API keys](/docs/iam/api-keys#why-you-should-use-api-keys).

   * On Mac or Linux:

     1. Run the following commands to add your credentials as environment variables in a `twilio.env` file and source them. Replace `ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` with your Account SID and replace `your_auth_token` with your Auth Token.

     ```bash
     echo "export TWILIO_ACCOUNT_SID='ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'" > twilio.env
     echo "export TWILIO_AUTH_TOKEN='your_auth_token'" >> twilio.env
     source ./twilio.env
     ```

     2. If you're committing code with git, run the following command to add the `twilio.env` file to `.gitignore` to avoid uploading your credentials in plain text:

        ```bash
        echo "twilio.env" >> .gitignore
        ```
   * On Windows command line (cmd.exe):

     Run the following commands. Replace `ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` with your Account SID and replace `your_auth_token` with your Auth Token.

     ```bash
     set TWILIO_ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
     set TWILIO_AUTH_TOKEN=your_auth_token
     ```

   Learn more about [storing your Twilio credentials safely](/docs/usage/secure-credentials).
4. In the `Program.cs` file, do the following:
   * Replace the value for `to` with the recipient phone number in [E.164 format](/docs/glossary/what-e164).
   * Replace the value for `from` with your Twilio phone number in [E.164 format](/docs/glossary/what-e164).
   * Replace the value for `twiml` with your desired TwiML instructions.
     * To use a hosted TwiML URL, replace `twiml` with `url` and set the value to the URL that hosts your TwiML instructions. For example:

       ```csharp
       url: new Uri("http://demo.twilio.com/docs/voice.xml")
       ```

       The following `voice.xml` file is hosted at `http://demo.twilio.com/docs/voice.xml` uses the `<Say>` and the `<Play>` TwiML tags to read a message and play an MP3 file for the user.

       ```xml
       <?xml version="1.0" encoding="UTF-8"?>
           <Response>
               <Say voice="Polly.Joanna-Generative">Thanks for trying our documentation. Enjoy!</Say>
               <Play>http://demo.twilio.com/docs/classic.mp3</Play>
           </Response>
       </xml>
       ```
     * To use a TwiML application to handle calls, replace `twiml` with `applicationSid` and set the value to your TwiML application's SID. You can create and configure applications on the TwiML apps page in [Console](https://1console.twilio.com/) (**Develop** > **TwiML apps**). If you're using legacy Console, go to **Voice** > **Manage** > [**TwiML apps**](https://www.twilio.com/console/voice/runtime/twiml-apps).

       ```csharp
       applicationSid: "<YOUR_TWIML_APP_SID>"
       ```

       When your outbound call is connected, Twilio will make a request to the Voice URL set on your application.

       > \[!WARNING]
       >
       > The `applicationSid` take precedence over the `twiml` and `url` parameters and ignores the following parameters: `method`, `fallbackUrl`, `fallbackMethod`, `statusCallback`, `statusCallbackMethod`. Twilio expects that your application handles all of this information. Learn more about the [Calls resource](/docs/voice/api/call-resource).
5. Save your changes and run this command from your terminal in the directory that contains `Program.cs`:

   ```bash
   dotnet run
   ```

After a few moments, you'll receive a call from your Twilio number.

## Java

1. Run the following commands to create a new Java project using Gradle:

   ```bash
   mkdir make-call
   cd make-call
   gradle init --type basic --dsl groovy --use-defaults
   mkdir -p src/main/java
   ```
2. Replace the contents of the `build.gradle` file with the following:

   ```groovy
   plugins {
       id 'java'
       id 'application'
   }

   application {
       mainClass = 'Example'
   }

   repositories {
       mavenCentral()
   }

   dependencies {
       implementation 'com.twilio.sdk:twilio:10.5.2'
       implementation 'org.slf4j:slf4j-simple:2.0.16'
       implementation 'com.sparkjava:spark-core:2.9.4'
   }
   ```
3. Create and open a new file called `make_call.java` in the `src/main/java` directory and paste in the following code:

   Make an outbound call with TwiML

   ```java
   // Install the Java helper library from twilio.com/docs/java/install

   import com.twilio.type.Twiml;
   import com.twilio.Twilio;
   import com.twilio.rest.api.v2010.account.Call;

   public class Example {
       // Find your Account SID and Auth Token at twilio.com/console
       // and set the environment variables. See http://twil.io/secure
       public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
       public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

       public static void main(String[] args) {
           Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
           Call call = Call.creator(new com.twilio.type.PhoneNumber("+14158675309"),
                               new com.twilio.type.PhoneNumber("+14158675308"),
                               new com.twilio.type.Twiml("<Response><Say>Ahoy, World</Say></Response>"))
                           .create();

           System.out.println(call.getSid());
       }
   }
   ```

   To learn all of the API response values that you can return with `System.out.println()`, see the response for [Create a call in the API documentation](/docs/voice/api/call-resource#create-a-call). Precede the response value with `call.get` (for example: `System.out.println(call.getSid())` returns the `sid` value).
4. Set the environment variables for your Account SID and Auth Token.

   > \[!WARNING]
   >
   > To better control access, use API keys instead of the Account SID and Auth Token when you deploy to production. To learn more, see [Why you should use API keys](/docs/iam/api-keys#why-you-should-use-api-keys).

   * On Mac or Linux:

     1. Run the following commands to add your credentials as environment variables in a `twilio.env` file and source them. Replace `ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` with your Account SID and replace `your_auth_token` with your Auth Token.

     ```bash
     echo "export TWILIO_ACCOUNT_SID='ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'" > twilio.env
     echo "export TWILIO_AUTH_TOKEN='your_auth_token'" >> twilio.env
     source ./twilio.env
     ```

     2. If you're committing code with git, run the following command to add the `twilio.env` file to `.gitignore` to avoid uploading your credentials in plain text:

        ```bash
        echo "twilio.env" >> .gitignore
        ```
   * On Windows command line (cmd.exe):

     Run the following commands. Replace `ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` with your Account SID and replace `your_auth_token` with your Auth Token.

     ```bash
     set TWILIO_ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
     set TWILIO_AUTH_TOKEN=your_auth_token
     ```

   Learn more about [storing your Twilio credentials safely](/docs/usage/secure-credentials).
5. In the `make_call.java` file, do the following:
   * Replace the value for `to` with the recipient phone number in [E.164 format](/docs/glossary/what-e164).
   * Replace the value for `from` with your Twilio phone number in [E.164 format](/docs/glossary/what-e164).
   * Replace the value for `twiml` with your desired TwiML instructions.
     * To use a hosted TwiML URL, replace `twiml` with `url` and set the value to the URL that hosts your TwiML instructions. For example:

       ```java
       url = new URI("http://demo.twilio.com/docs/voice.xml");
       ```

       The following `voice.xml` file is hosted at `http://demo.twilio.com/docs/voice.xml` uses the `<Say>` and the `<Play>` TwiML tags to read a message and play an MP3 file for the user.

       ```xml
       <?xml version="1.0" encoding="UTF-8"?>
           <Response>
               <Say voice="Polly.Joanna-Generative">Thanks for trying our documentation. Enjoy!</Say>
               <Play>http://demo.twilio.com/docs/classic.mp3</Play>
           </Response>
       </xml>
       ```
     * To use a TwiML application to handle calls, replace `twiml` with `applicationSid` and set the value to your TwiML application's SID. You can create and configure applications on the TwiML apps page in [Console](https://1console.twilio.com/) (**Develop** > **TwiML apps**). If you're using legacy Console, go to **Voice** > **Manage** > [**TwiML apps**](https://www.twilio.com/console/voice/runtime/twiml-apps).

       ```java
       applicationSid = "<YOUR_TWIML_APP_SID>";
       ```

       When your outbound call is connected, Twilio will make a request to the Voice URL set on your application.

       > \[!WARNING]
       >
       > The `applicationSid` take precedence over the `twiml` and `url` parameters and ignores the following parameters: `method`, `fallbackUrl`, `fallbackMethod`, `statusCallback`, `statusCallbackMethod`. Twilio expects that your application handles all of this information. Learn more about the [Calls resource](/docs/voice/api/call-resource).
6. Run this command from your terminal in the directory that contains `build.gradle`:

   ```bash
   gradle run
   ```

After a few moments, you'll receive a call from your Twilio number.

## Go

1. Create a new project folder and the Go module:

   ```bash
   mkdir make-call
   cd make-call
   go mod init make-call
   ```
2. Create and open a new file called `make_call.go` anywhere on your machine and paste in the following code:

   Make an outbound call with TwiML

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

   	params := &api.CreateCallParams{}
   	params.SetTwiml("<Response><Say>Ahoy, World</Say></Response>")
   	params.SetTo("+14158675309")
   	params.SetFrom("+14158675308")

   	resp, err := client.Api.CreateCall(params)
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

   To learn all of the API response values that you can return with `fmt.Println()`, see the response for [Create a call in the API documentation](/docs/voice/api/call-resource#create-a-call). Precede the response value with `call.` (for example: `fmt.Println(call.Sid)` returns the `sid` value).
3. Set the environment variables for your Account SID and Auth Token.

   > \[!WARNING]
   >
   > To better control access, use API keys instead of the Account SID and Auth Token when you deploy to production. To learn more, see [Why you should use API keys](/docs/iam/api-keys#why-you-should-use-api-keys).

   * On Mac or Linux:

     1. Run the following commands to add your credentials as environment variables in a `twilio.env` file and source them. Replace `ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` with your Account SID and replace `your_auth_token` with your Auth Token.

     ```bash
     echo "export TWILIO_ACCOUNT_SID='ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'" > twilio.env
     echo "export TWILIO_AUTH_TOKEN='your_auth_token'" >> twilio.env
     source ./twilio.env
     ```

     2. If you're committing code with git, run the following command to add the `twilio.env` file to `.gitignore` to avoid uploading your credentials in plain text:

        ```bash
        echo "twilio.env" >> .gitignore
        ```
   * On Windows command line (cmd.exe):

     Run the following commands. Replace `ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` with your Account SID and replace `your_auth_token` with your Auth Token.

     ```bash
     set TWILIO_ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
     set TWILIO_AUTH_TOKEN=your_auth_token
     ```

   Learn more about [storing your Twilio credentials safely](/docs/usage/secure-credentials).
4. In the `make_call.go` file, do the following:
   * Replace the value for `To` with the recipient phone number in [E.164 format](/docs/glossary/what-e164).
   * Replace the value for `From` with your Twilio phone number in [E.164 format](/docs/glossary/what-e164).
   * Replace the value for `Twiml` with your desired TwiML instructions.
     * To use a hosted TwiML URL, replace `Twiml` with `Url` and set the value to the URL that hosts your TwiML instructions. For example:

       ```go
       params.SetUrl("http://demo.twilio.com/docs/voice.xml")
       ```

       The following `voice.xml` file is hosted at `http://demo.twilio.com/docs/voice.xml` uses the `<Say>` and the `<Play>` TwiML tags to read a message and play an MP3 file for the user.

       ```xml
       <?xml version="1.0" encoding="UTF-8"?>
           <Response>
               <Say voice="Polly.Joanna-Generative">Thanks for trying our documentation. Enjoy!</Say>
               <Play>http://demo.twilio.com/docs/classic.mp3</Play>
           </Response>
       </xml>
       ```
     * To use a TwiML application to handle calls, replace `Twiml` with `ApplicationSid` and set the value to your TwiML application's SID. You can create and configure applications on the TwiML apps page in [Console](https://1console.twilio.com/) (**Develop** > **TwiML apps**). If you're using legacy Console, go to **Voice** > **Manage** > [**TwiML apps**](https://www.twilio.com/console/voice/runtime/twiml-apps).

       ```go
       params.SetApplicationSid("<YOUR_TWIML_APP_SID>")
       ```

       When your outbound call is connected, Twilio will make a request to the Voice URL set on your application.

       > \[!WARNING]
       >
       > The `ApplicationSid` take precedence over the `Twiml` and `Url` parameters and ignores the following parameters: `Method`, `FallbackUrl`, `FallbackMethod`, `StatusCallback`, `StatusCallbackMethod`. Twilio expects that your application handles all of this information. Learn more about the [Calls resource](/docs/voice/api/call-resource).
5. Save your changes and run this command from your terminal in the directory that contains `make_call.go`:

   ```bash
   go get
   go run make_call.go
   ```

After a few moments, you'll receive a call from your Twilio number.

## Ruby

1. Create and open a new file called `make_call.rb` anywhere on your machine and paste in the following code:

   Make an outbound call with TwiML

   ```ruby
   # Download the helper library from https://www.twilio.com/docs/ruby/install
   require 'twilio-ruby'

   # Find your Account SID and Auth Token at twilio.com/console
   # and set the environment variables. See http://twil.io/secure
   account_sid = ENV['TWILIO_ACCOUNT_SID']
   auth_token = ENV['TWILIO_AUTH_TOKEN']
   @client = Twilio::REST::Client.new(account_sid, auth_token)

   call = @client
          .api
          .v2010
          .calls
          .create(
            twiml: '<Response><Say>Ahoy, World</Say></Response>',
            to: '+14158675309',
            from: '+14158675308'
          )

   puts call.sid
   ```

   To learn all of the API response values that you can return with `puts`, see the response for [Create a call in the API documentation](/docs/voice/api/call-resource#create-a-call). Precede the response value with `call.` (for example: `puts call.sid` returns the `sid` value).
2. Set the environment variables for your Account SID and Auth Token.

   > \[!WARNING]
   >
   > To better control access, use API keys instead of the Account SID and Auth Token when you deploy to production. To learn more, see [Why you should use API keys](/docs/iam/api-keys#why-you-should-use-api-keys).

   * On Mac or Linux:

     1. Run the following commands to add your credentials as environment variables in a `twilio.env` file and source them. Replace `ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` with your Account SID and replace `your_auth_token` with your Auth Token.

     ```bash
     echo "export TWILIO_ACCOUNT_SID='ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'" > twilio.env
     echo "export TWILIO_AUTH_TOKEN='your_auth_token'" >> twilio.env
     source ./twilio.env
     ```

     2. If you're committing code with git, run the following command to add the `twilio.env` file to `.gitignore` to avoid uploading your credentials in plain text:

        ```bash
        echo "twilio.env" >> .gitignore
        ```
   * On Windows command line (cmd.exe):

     Run the following commands. Replace `ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` with your Account SID and replace `your_auth_token` with your Auth Token.

     ```bash
     set TWILIO_ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
     set TWILIO_AUTH_TOKEN=your_auth_token
     ```

   Learn more about [storing your Twilio credentials safely](/docs/usage/secure-credentials).
3. In the `make_call.rb` file, do the following:
   * Replace the value for `to` with the recipient phone number in [E.164 format](/docs/glossary/what-e164).
   * Replace the value for `from` with your Twilio phone number in [E.164 format](/docs/glossary/what-e164).
   * Replace the value for `twiml` with your desired TwiML instructions.
     * To use a hosted TwiML URL, replace `twiml` with `url` and set the value to the URL that hosts your TwiML instructions. For example:

       ```rb
       url: "http://demo.twilio.com/docs/voice.xml",
       ```

       The following `voice.xml` file is hosted at `http://demo.twilio.com/docs/voice.xml` uses the `<Say>` and the `<Play>` TwiML tags to read a message and play an MP3 file for the user.

       ```xml
       <?xml version="1.0" encoding="UTF-8"?>
           <Response>
               <Say voice="Polly.Joanna-Generative">Thanks for trying our documentation. Enjoy!</Say>
               <Play>http://demo.twilio.com/docs/classic.mp3</Play>
           </Response>
       </xml>
       ```
     * To use a TwiML application to handle calls, replace `twiml` with `application_sid` and set the value to your TwiML application's SID. You can create and configure applications on the TwiML apps page in [Console](https://1console.twilio.com/) (**Develop** > **TwiML apps**). If you're using legacy Console, go to **Voice** > **Manage** > [**TwiML apps**](https://www.twilio.com/console/voice/runtime/twiml-apps).

       ```rb
       application_sid: "<YOUR_TWIML_APP_SID>",
       ```

       When your outbound call is connected, Twilio will make a request to the Voice URL set on your application.

       > \[!WARNING]
       >
       > The `application_sid` take precedence over the `twiml` and `url` parameters and ignores the following parameters: `method`, `fallback_url`, `fallback_method`, `status_callback`, `status_callback_method`. Twilio expects that your application handles all of this information. Learn more about the [Calls resource](/docs/voice/api/call-resource).
4. Save your changes and run this command from your terminal in the directory that contains `make_call.rb`:
   ```bash
   ruby make_call.rb
   ```

After a few moments, you'll receive a call from your Twilio number.

## Manage your outbound call

Optionally, you can configure additional parameters when making outbound calls to customize call behavior. Below are some common use cases.

### Send digits

To dial an extension, set the `SendDigits` parameter to the sequence of digits to send after the call connects.

* You can include any digit (`0`-`9`), `A`, `B`, `C`, `D`, `#`, or `*`.
* To add pauses, use `w` for a half-second pause or `W` for a one-second pause between digits.

Learn more about the [request body parameters](/docs/voice/api/call-resource#request-body-parameters).

Make an outbound call and send digits

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createCall() {
  const call = await client.calls.create({
    from: "+14158675308",
    method: "GET",
    sendDigits: "1234#",
    to: "+14158675309",
    url: "http://demo.twilio.com/docs/voice.xml",
  });

  console.log(call.sid);
}

createCall();
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

call = client.calls.create(
    method="GET",
    send_digits="1234#",
    url="http://demo.twilio.com/docs/voice.xml",
    to="+14158675309",
    from_="+14158675308",
)

print(call.sid)
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

        var call = await CallResource.CreateAsync(
            method: Twilio.Http.HttpMethod.Get,
            sendDigits: "1234#",
            url: new Uri("http://demo.twilio.com/docs/voice.xml"),
            to: new Twilio.Types.PhoneNumber("+14158675309"),
            from: new Twilio.Types.PhoneNumber("+14158675308"));

        Console.WriteLine(call.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.net.URI;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Call;
import com.twilio.http.HttpMethod;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Call call = Call.creator(new com.twilio.type.PhoneNumber("+14158675309"),
                            new com.twilio.type.PhoneNumber("+14158675308"),
                            URI.create("http://demo.twilio.com/docs/voice.xml"))
                        .setMethod(HttpMethod.GET)
                        .setSendDigits("1234#")
                        .create();

        System.out.println(call.getSid());
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

	params := &api.CreateCallParams{}
	params.SetMethod("GET")
	params.SetSendDigits("1234#")
	params.SetUrl("http://demo.twilio.com/docs/voice.xml")
	params.SetTo("+14158675309")
	params.SetFrom("+14158675308")

	resp, err := client.Api.CreateCall(params)
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

$call = $twilio->calls->create(
    "+14158675309", // To
    "+14158675308", // From
    [
        "method" => "GET",
        "sendDigits" => "1234#",
        "url" => "http://demo.twilio.com/docs/voice.xml",
    ]
);

print $call->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

call = @client
       .api
       .v2010
       .calls
       .create(
         method: 'GET',
         send_digits: '1234#',
         url: 'http://demo.twilio.com/docs/voice.xml',
         to: '+14158675309',
         from: '+14158675308'
       )

puts call.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:calls:create \
   --method GET \
   --send-digits "1234#" \
   --url http://demo.twilio.com/docs/voice.xml \
   --to +14158675309 \
   --from +14158675308
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Calls.json" \
--data-urlencode "Method=GET" \
--data-urlencode "SendDigits=1234#" \
--data-urlencode "Url=http://demo.twilio.com/docs/voice.xml" \
--data-urlencode "To=+14158675309" \
--data-urlencode "From=+14158675308" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "answered_by": null,
  "api_version": "2010-04-01",
  "caller_name": null,
  "date_created": "Tue, 31 Aug 2010 20:36:28 +0000",
  "date_updated": "Tue, 31 Aug 2010 20:36:44 +0000",
  "direction": "inbound",
  "duration": "15",
  "end_time": "Tue, 31 Aug 2010 20:36:44 +0000",
  "forwarded_from": "+141586753093",
  "from": "+14158675308",
  "from_formatted": "(415) 867-5308",
  "group_sid": null,
  "parent_call_sid": null,
  "phone_number_sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "price": "-0.03000",
  "price_unit": "USD",
  "sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "start_time": "Tue, 31 Aug 2010 20:36:29 +0000",
  "status": "completed",
  "subresource_uris": {
    "notifications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Notifications.json",
    "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json",
    "payments": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Payments.json",
    "events": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Events.json",
    "siprec": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Siprec.json",
    "streams": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Streams.json",
    "transcriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions.json",
    "user_defined_message_subscriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UserDefinedMessageSubscriptions.json",
    "user_defined_messages": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UserDefinedMessages.json"
  },
  "to": "+14158675309",
  "to_formatted": "(415) 867-5309",
  "trunk_sid": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "queue_time": "1000"
}
```

### Receive call status updates

To receive the outcome of calls, set the `StatusCallback` parameter to your status callback URL.
After Twilio completes your call, it'll make an asynchronous request to the URL. If you don't provide a `StatusCallback` URL, Twilio will end the call without sending any status updates to your application.

* To specify the HTTP request method Twilio should use when making requests to the `StatusCallback` URL, set the `StatusCallbackMethod` parameter to either `GET` or `POST`. The default is `POST`.
* To specify which call progress events should trigger a request to your `StatusCallback` URL, set the `StatusCallbackEvent` parameter to either `initiated`, `ringing`, `answered`, or `completed`. To specify multiple values, separate them with a space. The default is `completed`.

Learn more about the [`StatusCallback`](/docs/voice/api/call-resource#statuscallback) and [`StatusCallbackEvent`](/docs/voice/api/call-resource#statuscallbackevent) parameters.

> \[!WARNING]
>
> The `StatusCallback` URL must contain a valid hostname. You can't use underscores.

Set StatusCallback on an outbound call

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createCall() {
  const call = await client.calls.create({
    from: "+14158675308",
    method: "GET",
    statusCallback: "https://www.myapp.com/events",
    statusCallbackEvent: ["completed"],
    statusCallbackMethod: "POST",
    to: "+14158675309",
    url: "http://demo.twilio.com/docs/voice.xml",
  });

  console.log(call.sid);
}

createCall();
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

call = client.calls.create(
    method="GET",
    status_callback="https://www.myapp.com/events",
    status_callback_method="POST",
    status_callback_event=["completed"],
    url="http://demo.twilio.com/docs/voice.xml",
    to="+14158675309",
    from_="+14158675308",
)

print(call.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using System.Threading.Tasks;
using System.Collections.Generic;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var call = await CallResource.CreateAsync(
            method: Twilio.Http.HttpMethod.Get,
            statusCallback: new Uri("https://www.myapp.com/events"),
            statusCallbackMethod: Twilio.Http.HttpMethod.Post,
            statusCallbackEvent: new List<string> { "completed" },
            url: new Uri("http://demo.twilio.com/docs/voice.xml"),
            to: new Twilio.Types.PhoneNumber("+14158675309"),
            from: new Twilio.Types.PhoneNumber("+14158675308"));

        Console.WriteLine(call.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.net.URI;
import java.util.Arrays;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Call;
import com.twilio.http.HttpMethod;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Call call = Call.creator(new com.twilio.type.PhoneNumber("+14158675309"),
                            new com.twilio.type.PhoneNumber("+14158675308"),
                            URI.create("http://demo.twilio.com/docs/voice.xml"))
                        .setMethod(HttpMethod.GET)
                        .setStatusCallback(URI.create("https://www.myapp.com/events"))
                        .setStatusCallbackMethod(HttpMethod.POST)
                        .setStatusCallbackEvent(Arrays.asList("completed"))
                        .create();

        System.out.println(call.getSid());
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

	params := &api.CreateCallParams{}
	params.SetMethod("GET")
	params.SetStatusCallback("https://www.myapp.com/events")
	params.SetStatusCallbackMethod("POST")
	params.SetStatusCallbackEvent([]string{
		"completed",
	})
	params.SetUrl("http://demo.twilio.com/docs/voice.xml")
	params.SetTo("+14158675309")
	params.SetFrom("+14158675308")

	resp, err := client.Api.CreateCall(params)
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

$call = $twilio->calls->create(
    "+14158675309", // To
    "+14158675308", // From
    [
        "method" => "GET",
        "statusCallback" => "https://www.myapp.com/events",
        "statusCallbackMethod" => "POST",
        "statusCallbackEvent" => ["completed"],
        "url" => "http://demo.twilio.com/docs/voice.xml",
    ]
);

print $call->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

call = @client
       .api
       .v2010
       .calls
       .create(
         method: 'GET',
         status_callback: 'https://www.myapp.com/events',
         status_callback_method: 'POST',
         status_callback_event: [
           'completed'
         ],
         url: 'http://demo.twilio.com/docs/voice.xml',
         to: '+14158675309',
         from: '+14158675308'
       )

puts call.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:calls:create \
   --method GET \
   --status-callback https://www.myapp.com/events \
   --status-callback-method POST \
   --status-callback-event completed \
   --url http://demo.twilio.com/docs/voice.xml \
   --to +14158675309 \
   --from +14158675308
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Calls.json" \
--data-urlencode "Method=GET" \
--data-urlencode "StatusCallback=https://www.myapp.com/events" \
--data-urlencode "StatusCallbackMethod=POST" \
--data-urlencode "StatusCallbackEvent=completed" \
--data-urlencode "Url=http://demo.twilio.com/docs/voice.xml" \
--data-urlencode "To=+14158675309" \
--data-urlencode "From=+14158675308" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "answered_by": null,
  "api_version": "2010-04-01",
  "caller_name": null,
  "date_created": "Tue, 31 Aug 2010 20:36:28 +0000",
  "date_updated": "Tue, 31 Aug 2010 20:36:44 +0000",
  "direction": "inbound",
  "duration": "15",
  "end_time": "Tue, 31 Aug 2010 20:36:44 +0000",
  "forwarded_from": "+141586753093",
  "from": "+14158675308",
  "from_formatted": "(415) 867-5308",
  "group_sid": null,
  "parent_call_sid": null,
  "phone_number_sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "price": "-0.03000",
  "price_unit": "USD",
  "sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "start_time": "Tue, 31 Aug 2010 20:36:29 +0000",
  "status": "completed",
  "subresource_uris": {
    "notifications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Notifications.json",
    "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json",
    "payments": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Payments.json",
    "events": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Events.json",
    "siprec": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Siprec.json",
    "streams": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Streams.json",
    "transcriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions.json",
    "user_defined_message_subscriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UserDefinedMessageSubscriptions.json",
    "user_defined_messages": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UserDefinedMessages.json"
  },
  "to": "+14158675309",
  "to_formatted": "(415) 867-5309",
  "trunk_sid": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "queue_time": "1000"
}
```

### Record your call

> \[!WARNING]
>
> Recording a call is subject to the same obligations and requirements as the [Recordings resource](/docs/voice/api/recording) and the [`<Record>` TwiML verb](/docs/voice/twiml/record). For workflows subject to [PCI](/docs/voice/pci-workflows) or the Health Insurance Portability and the Accountability Act (HIPAA), see the applicable documentation.

To record your outbound call, set the `Record` parameter and set its value to `true`. You can also configure the following optional parameters to manage your call recordings:

* To receive the recording and other information about the call, set the `RecordingStatusCallback` parameter to a URL that Twilio will request when the recording is available.
* To specify the HTTP request method Twilio should use when making requests to the `RecordingStatusCallback` URL, set the `RecordingStatusCallbackMethod` parameter to either `GET` or `POST`. The default is `POST`.
* To specify which recording status changes should trigger a request to your `RecordingStatusCallback` URL, set the `RecordingStatusCallbackEvent` parameter to either `completed`, `absent`, or `in-progress`. To specify multiple values, separate them with a space.

Learn more about the [`RecordingStatusCallback`](/docs/voice/api/call-resource#recordingstatuscallback) and [`RecordingStatusCallbackEvent`](/docs/voice/api/call-resource#recordingstatuscallbackevent) parameters.

To programmatically pause, resume, or stop recordings, see the [Recordings resource](/docs/voice/api/recording#update-a-recording-resource) and [How to record phone calls](/docs/voice/tutorials/how-to-record-phone-calls).

Record an outbound call

```js
// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

async function createCall() {
  const call = await client.calls.create({
    from: "+14158675308",
    record: true,
    recordingStatusCallback:
      "https://www.example.com/recording-status-callback",
    recordingStatusCallbackEvent: ["completed", "in-progress"],
    recordingStatusCallbackMethod: "POST",
    to: "+14158675309",
    url: "http://demo.twilio.com/docs/voice.xml",
  });

  console.log(call.sid);
}

createCall();
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

call = client.calls.create(
    record=True,
    recording_status_callback="https://www.example.com/recording-status-callback",
    recording_status_callback_method="POST",
    recording_status_callback_event=["completed", "in-progress"],
    url="http://demo.twilio.com/docs/voice.xml",
    to="+14158675309",
    from_="+14158675308",
)

print(call.sid)
```

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using System.Threading.Tasks;
using System.Collections.Generic;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var call = await CallResource.CreateAsync(
            record: true,
            recordingStatusCallback: "https://www.example.com/recording-status-callback",
            recordingStatusCallbackMethod: Twilio.Http.HttpMethod.Post,
            recordingStatusCallbackEvent: new List<string> { "completed", "in-progress" },
            url: new Uri("http://demo.twilio.com/docs/voice.xml"),
            to: new Twilio.Types.PhoneNumber("+14158675309"),
            from: new Twilio.Types.PhoneNumber("+14158675308"));

        Console.WriteLine(call.Sid);
    }
}
```

```java
// Install the Java helper library from twilio.com/docs/java/install

import java.net.URI;
import java.util.Arrays;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Call;
import com.twilio.http.HttpMethod;

public class Example {
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    public static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");

    public static void main(String[] args) {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Call call = Call.creator(new com.twilio.type.PhoneNumber("+14158675309"),
                            new com.twilio.type.PhoneNumber("+14158675308"),
                            URI.create("http://demo.twilio.com/docs/voice.xml"))
                        .setRecord(true)
                        .setRecordingStatusCallback("https://www.example.com/recording-status-callback")
                        .setRecordingStatusCallbackMethod(HttpMethod.POST)
                        .setRecordingStatusCallbackEvent(Arrays.asList("completed", "in-progress"))
                        .create();

        System.out.println(call.getSid());
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

	params := &api.CreateCallParams{}
	params.SetRecord(true)
	params.SetRecordingStatusCallback("https://www.example.com/recording-status-callback")
	params.SetRecordingStatusCallbackMethod("POST")
	params.SetRecordingStatusCallbackEvent([]string{
		"completed",
		"in-progress",
	})
	params.SetUrl("http://demo.twilio.com/docs/voice.xml")
	params.SetTo("+14158675309")
	params.SetFrom("+14158675308")

	resp, err := client.Api.CreateCall(params)
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

$call = $twilio->calls->create(
    "+14158675309", // To
    "+14158675308", // From
    [
        "record" => true,
        "recordingStatusCallback" =>
            "https://www.example.com/recording-status-callback",
        "recordingStatusCallbackMethod" => "POST",
        "recordingStatusCallbackEvent" => ["completed", "in-progress"],
        "url" => "http://demo.twilio.com/docs/voice.xml",
    ]
);

print $call->sid;
```

```ruby
# Download the helper library from https://www.twilio.com/docs/ruby/install
require 'twilio-ruby'

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = ENV['TWILIO_ACCOUNT_SID']
auth_token = ENV['TWILIO_AUTH_TOKEN']
@client = Twilio::REST::Client.new(account_sid, auth_token)

call = @client
       .api
       .v2010
       .calls
       .create(
         record: true,
         recording_status_callback: 'https://www.example.com/recording-status-callback',
         recording_status_callback_method: 'POST',
         recording_status_callback_event: [
           'completed',
           'in-progress'
         ],
         url: 'http://demo.twilio.com/docs/voice.xml',
         to: '+14158675309',
         from: '+14158675308'
       )

puts call.sid
```

```bash
# Install the twilio-cli from https://twil.io/cli

twilio api:core:calls:create \
   --record \
   --recording-status-callback https://www.example.com/recording-status-callback \
   --recording-status-callback-method POST \
   --recording-status-callback-event completed in-progress \
   --url http://demo.twilio.com/docs/voice.xml \
   --to +14158675309 \
   --from +14158675308
```

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Calls.json" \
--data-urlencode "Record=true" \
--data-urlencode "RecordingStatusCallback=https://www.example.com/recording-status-callback" \
--data-urlencode "RecordingStatusCallbackMethod=POST" \
--data-urlencode "RecordingStatusCallbackEvent=completed" \
--data-urlencode "RecordingStatusCallbackEvent=in-progress" \
--data-urlencode "Url=http://demo.twilio.com/docs/voice.xml" \
--data-urlencode "To=+14158675309" \
--data-urlencode "From=+14158675308" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
```

```json
{
  "account_sid": "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "answered_by": null,
  "api_version": "2010-04-01",
  "caller_name": null,
  "date_created": "Tue, 31 Aug 2010 20:36:28 +0000",
  "date_updated": "Tue, 31 Aug 2010 20:36:44 +0000",
  "direction": "inbound",
  "duration": "15",
  "end_time": "Tue, 31 Aug 2010 20:36:44 +0000",
  "forwarded_from": "+141586753093",
  "from": "+14158675308",
  "from_formatted": "(415) 867-5308",
  "group_sid": null,
  "parent_call_sid": null,
  "phone_number_sid": "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "price": "-0.03000",
  "price_unit": "USD",
  "sid": "CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "start_time": "Tue, 31 Aug 2010 20:36:29 +0000",
  "status": "completed",
  "subresource_uris": {
    "notifications": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Notifications.json",
    "recordings": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Recordings.json",
    "payments": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Payments.json",
    "events": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Events.json",
    "siprec": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Siprec.json",
    "streams": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Streams.json",
    "transcriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Transcriptions.json",
    "user_defined_message_subscriptions": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UserDefinedMessageSubscriptions.json",
    "user_defined_messages": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/UserDefinedMessages.json"
  },
  "to": "+14158675309",
  "to_formatted": "(415) 867-5309",
  "trunk_sid": null,
  "uri": "/2010-04-01/Accounts/ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Calls/CAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.json",
  "queue_time": "1000"
}
```

## What's next?

After Twilio completes your call, it'll make an asynchronous request to your status callback URL. From here, it's up to you to decide what to do next. For example, you can trigger another event like send an SMS to the phone number you just called with a follow-up message, or try to place the call again if the call status returns failed.

* Learn more about the [Calls resource](/docs/voice/api/call-resource) and all of its parameters to customize your outbound calls.
* Add voice capabilities to your web application with the [Voice JavaScript SDK](/docs/voice/sdks/javascript/get-started) or Twilio's mobile client SDKs for your [Android](/docs/voice/sdks/android/get-started) or [iOS](/docs/voice/sdks/ios/get-started) applications.
* View more [Voice tutorials](/docs/voice/tutorials) to learn how to build interactive voice response (IVR) systems, call recording, and more.
