# Send SMS and MMS messages

This tutorial shows you how to use [Twilio Programmable Messaging](https://www.twilio.com/en-us/messaging/channels/sms) to programmatically send SMS and MMS messages from your web application or with [cURL](https://curl.se/). The steps send `POST` requests to the [Message resource](/docs/messaging/api/message-resource) and the [Media resource](/docs/messaging/api/media-resource) in the Twilio REST API.

To send messages with the Twilio command line interface (CLI), see [Get a phone number and send your first SMS](/docs/twilio-cli/examples/explore-sms).

To send messages without writing code, use [Twilio Studio](/docs/studio), our low-code application builder.

## Complete the prerequisites

Select your programming language and complete the prerequisites:

## Python

* [Install Python](https://www.python.org/downloads/).
* Install the [Twilio Python SDK](https://github.com/twilio/twilio-python). To install using [pip](https://pip.pypa.io/en/latest/), run:
  ```bash
  pip install twilio
  ```

- Sign up for Twilio and get a phone number:
  1. [Sign up for Twilio](https://www.twilio.com/try-twilio).
  2. Go to [Products & services > Numbers & senders](https://1console.twilio.com/go?to=/account/__account__/us1/senders-hub/list/phone-numbers/inventory):
     1. To acquire a phone number, click \**Set up a new phone number*.
     2. Copy your **Account SID** and **Auth Token** and paste them in a temporary local file for use later in this tutorial.
  3. Complete any applicable verification or registration requirements.

     * Toll-free numbers: Complete [toll-free verification](/docs/messaging/compliance/toll-free/console-onboarding) to send SMS messages to recipients in the US and Canada.
     * US 10DLC numbers: Register for [A2P 10DLC](https://1console.twilio.com/go?to=/account/__account__/us1/sms/regulatory-compliance/brands) to send SMS messages to recipients in the US. To learn more, see [What is A2P 10DLC?](https://help.twilio.com/articles/1260800720410-What-is-A2P-10DLC-).
     * UK long code numbers: Submit a [Regulatory Compliance (RC) bundle](/docs/phone-numbers/regulatory/getting-started/console-create-new-bundle) to send SMS messages to recipients in the UK. To learn more, see [Know Your Customer (KYC) in the United Kingdom](https://help.twilio.com/articles/21038555454875).

## Node.js

* [Install Node.js](https://nodejs.org/).
* Install the [Twilio Node.js SDK](https://github.com/twilio/twilio-node):
  ```bash
  npm install twilio
  ```

- Sign up for Twilio and get a phone number:
  1. [Sign up for Twilio](https://www.twilio.com/try-twilio).
  2. Go to [Products & services > Numbers & senders](https://1console.twilio.com/go?to=/account/__account__/us1/senders-hub/list/phone-numbers/inventory):
     1. To acquire a phone number, click \**Set up a new phone number*.
     2. Copy your **Account SID** and **Auth Token** and paste them in a temporary local file for use later in this tutorial.
  3. Complete any applicable verification or registration requirements.

     * Toll-free numbers: Complete [toll-free verification](/docs/messaging/compliance/toll-free/console-onboarding) to send SMS messages to recipients in the US and Canada.
     * US 10DLC numbers: Register for [A2P 10DLC](https://1console.twilio.com/go?to=/account/__account__/us1/sms/regulatory-compliance/brands) to send SMS messages to recipients in the US. To learn more, see [What is A2P 10DLC?](https://help.twilio.com/articles/1260800720410-What-is-A2P-10DLC-).
     * UK long code numbers: Submit a [Regulatory Compliance (RC) bundle](/docs/phone-numbers/regulatory/getting-started/console-create-new-bundle) to send SMS messages to recipients in the UK. To learn more, see [Know Your Customer (KYC) in the United Kingdom](https://help.twilio.com/articles/21038555454875).

## PHP

* [Install PHP](http://php.net/manual/en/install.php).
* Install dependencies with Composer:
  1. [Install Composer](https://getcomposer.org/doc/00-intro.md).
  2. Install the [Twilio PHP SDK](https://github.com/twilio/twilio-php):
     ```bash
     composer require twilio/sdk
     composer install
     ```

- Sign up for Twilio and get a phone number:
  1. [Sign up for Twilio](https://www.twilio.com/try-twilio).
  2. Go to [Products & services > Numbers & senders](https://1console.twilio.com/go?to=/account/__account__/us1/senders-hub/list/phone-numbers/inventory):
     1. To acquire a phone number, click \**Set up a new phone number*.
     2. Copy your **Account SID** and **Auth Token** and paste them in a temporary local file for use later in this tutorial.
  3. Complete any applicable verification or registration requirements.

     * Toll-free numbers: Complete [toll-free verification](/docs/messaging/compliance/toll-free/console-onboarding) to send SMS messages to recipients in the US and Canada.
     * US 10DLC numbers: Register for [A2P 10DLC](https://1console.twilio.com/go?to=/account/__account__/us1/sms/regulatory-compliance/brands) to send SMS messages to recipients in the US. To learn more, see [What is A2P 10DLC?](https://help.twilio.com/articles/1260800720410-What-is-A2P-10DLC-).
     * UK long code numbers: Submit a [Regulatory Compliance (RC) bundle](/docs/phone-numbers/regulatory/getting-started/console-create-new-bundle) to send SMS messages to recipients in the UK. To learn more, see [Know Your Customer (KYC) in the United Kingdom](https://help.twilio.com/articles/21038555454875).

## C# (.NET Framework)

* [Download Visual Studio 2019 or later](https://visualstudio.microsoft.com/vs/).

- Sign up for Twilio and get a phone number:
  1. [Sign up for Twilio](https://www.twilio.com/try-twilio).
  2. Go to [Products & services > Numbers & senders](https://1console.twilio.com/go?to=/account/__account__/us1/senders-hub/list/phone-numbers/inventory):
     1. To acquire a phone number, click \**Set up a new phone number*.
     2. Copy your **Account SID** and **Auth Token** and paste them in a temporary local file for use later in this tutorial.
  3. Complete any applicable verification or registration requirements.

     * Toll-free numbers: Complete [toll-free verification](/docs/messaging/compliance/toll-free/console-onboarding) to send SMS messages to recipients in the US and Canada.
     * US 10DLC numbers: Register for [A2P 10DLC](https://1console.twilio.com/go?to=/account/__account__/us1/sms/regulatory-compliance/brands) to send SMS messages to recipients in the US. To learn more, see [What is A2P 10DLC?](https://help.twilio.com/articles/1260800720410-What-is-A2P-10DLC-).
     * UK long code numbers: Submit a [Regulatory Compliance (RC) bundle](/docs/phone-numbers/regulatory/getting-started/console-create-new-bundle) to send SMS messages to recipients in the UK. To learn more, see [Know Your Customer (KYC) in the United Kingdom](https://help.twilio.com/articles/21038555454875).

## C# (.NET Core)

* [Install .NET Core](https://www.microsoft.com/net/).

- Sign up for Twilio and get a phone number:
  1. [Sign up for Twilio](https://www.twilio.com/try-twilio).
  2. Go to [Products & services > Numbers & senders](https://1console.twilio.com/go?to=/account/__account__/us1/senders-hub/list/phone-numbers/inventory):
     1. To acquire a phone number, click \**Set up a new phone number*.
     2. Copy your **Account SID** and **Auth Token** and paste them in a temporary local file for use later in this tutorial.
  3. Complete any applicable verification or registration requirements.

     * Toll-free numbers: Complete [toll-free verification](/docs/messaging/compliance/toll-free/console-onboarding) to send SMS messages to recipients in the US and Canada.
     * US 10DLC numbers: Register for [A2P 10DLC](https://1console.twilio.com/go?to=/account/__account__/us1/sms/regulatory-compliance/brands) to send SMS messages to recipients in the US. To learn more, see [What is A2P 10DLC?](https://help.twilio.com/articles/1260800720410-What-is-A2P-10DLC-).
     * UK long code numbers: Submit a [Regulatory Compliance (RC) bundle](/docs/phone-numbers/regulatory/getting-started/console-create-new-bundle) to send SMS messages to recipients in the UK. To learn more, see [Know Your Customer (KYC) in the United Kingdom](https://help.twilio.com/articles/21038555454875).

## Java

* [Install Java Standard Edition (SE) Development Kit](https://www.oracle.com/java/technologies/downloads/).
* Download the fat JAR file for the [Twilio Java SDK](https://github.com/twilio/twilio-java) that includes all dependencies:
  1. Navigate to the [Maven repository](https://mvnrepository.com/artifact/com.twilio.sdk/twilio).
  2. Click the most recent version number.
  3. In the **Files** row, click **View All**.
  4. Click the file ending in `jar-with-dependencies.jar`.

- Sign up for Twilio and get a phone number:
  1. [Sign up for Twilio](https://www.twilio.com/try-twilio).
  2. Go to [Products & services > Numbers & senders](https://1console.twilio.com/go?to=/account/__account__/us1/senders-hub/list/phone-numbers/inventory):
     1. To acquire a phone number, click \**Set up a new phone number*.
     2. Copy your **Account SID** and **Auth Token** and paste them in a temporary local file for use later in this tutorial.
  3. Complete any applicable verification or registration requirements.

     * Toll-free numbers: Complete [toll-free verification](/docs/messaging/compliance/toll-free/console-onboarding) to send SMS messages to recipients in the US and Canada.
     * US 10DLC numbers: Register for [A2P 10DLC](https://1console.twilio.com/go?to=/account/__account__/us1/sms/regulatory-compliance/brands) to send SMS messages to recipients in the US. To learn more, see [What is A2P 10DLC?](https://help.twilio.com/articles/1260800720410-What-is-A2P-10DLC-).
     * UK long code numbers: Submit a [Regulatory Compliance (RC) bundle](/docs/phone-numbers/regulatory/getting-started/console-create-new-bundle) to send SMS messages to recipients in the UK. To learn more, see [Know Your Customer (KYC) in the United Kingdom](https://help.twilio.com/articles/21038555454875).

## Go

* [Install Go](https://go.dev/doc/install).

- Sign up for Twilio and get a phone number:
  1. [Sign up for Twilio](https://www.twilio.com/try-twilio).
  2. Go to [Products & services > Numbers & senders](https://1console.twilio.com/go?to=/account/__account__/us1/senders-hub/list/phone-numbers/inventory):
     1. To acquire a phone number, click \**Set up a new phone number*.
     2. Copy your **Account SID** and **Auth Token** and paste them in a temporary local file for use later in this tutorial.
  3. Complete any applicable verification or registration requirements.

     * Toll-free numbers: Complete [toll-free verification](/docs/messaging/compliance/toll-free/console-onboarding) to send SMS messages to recipients in the US and Canada.
     * US 10DLC numbers: Register for [A2P 10DLC](https://1console.twilio.com/go?to=/account/__account__/us1/sms/regulatory-compliance/brands) to send SMS messages to recipients in the US. To learn more, see [What is A2P 10DLC?](https://help.twilio.com/articles/1260800720410-What-is-A2P-10DLC-).
     * UK long code numbers: Submit a [Regulatory Compliance (RC) bundle](/docs/phone-numbers/regulatory/getting-started/console-create-new-bundle) to send SMS messages to recipients in the UK. To learn more, see [Know Your Customer (KYC) in the United Kingdom](https://help.twilio.com/articles/21038555454875).

## Ruby

* [Install Ruby](https://www.ruby-lang.org/en/documentation/installation/).
* Install the [Twilio Ruby SDK](https://github.com/twilio/twilio-ruby):
  ```bash
  gem install twilio-ruby
  ```

- Sign up for Twilio and get a phone number:
  1. [Sign up for Twilio](https://www.twilio.com/try-twilio).
  2. Go to [Products & services > Numbers & senders](https://1console.twilio.com/go?to=/account/__account__/us1/senders-hub/list/phone-numbers/inventory):
     1. To acquire a phone number, click \**Set up a new phone number*.
     2. Copy your **Account SID** and **Auth Token** and paste them in a temporary local file for use later in this tutorial.
  3. Complete any applicable verification or registration requirements.

     * Toll-free numbers: Complete [toll-free verification](/docs/messaging/compliance/toll-free/console-onboarding) to send SMS messages to recipients in the US and Canada.
     * US 10DLC numbers: Register for [A2P 10DLC](https://1console.twilio.com/go?to=/account/__account__/us1/sms/regulatory-compliance/brands) to send SMS messages to recipients in the US. To learn more, see [What is A2P 10DLC?](https://help.twilio.com/articles/1260800720410-What-is-A2P-10DLC-).
     * UK long code numbers: Submit a [Regulatory Compliance (RC) bundle](/docs/phone-numbers/regulatory/getting-started/console-create-new-bundle) to send SMS messages to recipients in the UK. To learn more, see [Know Your Customer (KYC) in the United Kingdom](https://help.twilio.com/articles/21038555454875).

## cURL

* [Install cURL](https://curl.se/download.html).

  Most macOS and Linux machines come with cURL preinstalled.

- Sign up for Twilio and get a phone number:
  1. [Sign up for Twilio](https://www.twilio.com/try-twilio).
  2. Go to [Products & services > Numbers & senders](https://1console.twilio.com/go?to=/account/__account__/us1/senders-hub/list/phone-numbers/inventory):
     1. To acquire a phone number, click \**Set up a new phone number*.
     2. Copy your **Account SID** and **Auth Token** and paste them in a temporary local file for use later in this tutorial.
  3. Complete any applicable verification or registration requirements.

     * Toll-free numbers: Complete [toll-free verification](/docs/messaging/compliance/toll-free/console-onboarding) to send SMS messages to recipients in the US and Canada.
     * US 10DLC numbers: Register for [A2P 10DLC](https://1console.twilio.com/go?to=/account/__account__/us1/sms/regulatory-compliance/brands) to send SMS messages to recipients in the US. To learn more, see [What is A2P 10DLC?](https://help.twilio.com/articles/1260800720410-What-is-A2P-10DLC-).
     * UK long code numbers: Submit a [Regulatory Compliance (RC) bundle](/docs/phone-numbers/regulatory/getting-started/console-create-new-bundle) to send SMS messages to recipients in the UK. To learn more, see [Know Your Customer (KYC) in the United Kingdom](https://help.twilio.com/articles/21038555454875).

## Send an SMS message

Follow these steps to send an SMS message from your Twilio phone number.

## Python

1. Create and open a new file called `send_message.py` anywhere on your machine and paste in the following code:

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

   To learn all of the API response values that you can return with `print()`, see the response for [Send an SMS Message in the API documentation](/docs/messaging/api/message-resource#send-an-sms-message). Precede the response value with `message.` (for example: `print(message.status)` returns the `status` value).
2. Set the environment variables for your Account SID and Auth Token.

   > \[!WARNING]
   >
   > To better control access, use API keys instead of the Account SID and Auth Token when you deploy to production. To learn more, see [Why you should use API keys](/docs/iam/api-keys#why-you-should-use-api-keys).

   On Mac or Linux:

   1. Run the following commands to add your credentials as environment variables in a `twilio.env` file and source them. Replace `ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` with your Account SID and replace `your_auth_token` with your Auth Token.

      ```bash
      echo "export TWILIO_ACCOUNT_SID='ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'" > twilio.env
      echo "export TWILIO_AUTH_TOKEN='your_auth_token'" >> twilio.env
      source ./twilio.env
      ```
   2. If you're committing code with Git, run the following command to add the `twilio.env` file to `.gitignore` to avoid uploading your credentials in plain text:

      ```bash
      echo "twilio.env" >> .gitignore
      ```

   On Windows command line (cmd.exe), run the following commands. Replace `ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` with your Account SID and replace `your_auth_token` with your Auth Token.

   ```bash
   set TWILIO_ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   set TWILIO_AUTH_TOKEN=your_auth_token
   ```

   To learn more, see [Store your Twilio credentials safely](/docs/usage/secure-credentials).
3. In the `send_message.py` file, replace the value for `to` with the recipient phone number in [E.164 format](/docs/glossary/what-e164).

   To send a message to multiple recipients:

   1. Add a statement below `client` to define the array of phone numbers. Replace the phone numbers with your recipients' phone numbers in [E.164 format](/docs/glossary/what-e164).

      ```bash
      numbers = ["+15558675310", "+12345678901", "+10987654321"]
      ```
   2. Replace the `message =` and `print()` statements with the following code that iterates through each phone number in the `numbers` list and returns the message sent to each number. Twilio makes one API call for each number.

      ```python
      for number in numbers:
          message = client.messages.create(
              body="This is the ship that made the Kessel Run in fourteen parsecs?",
              from_="+15017122661",
              to=number,
          )
          print(f"Sent to {number}: {message.body}")
      ```

   > \[!NOTE]
   >
   > Message delivery performance to wireless carrier networks has limits. To learn more, see [Understanding Twilio Rate Limits and Message Queues](https://help.twilio.com/articles/115002943027-Understanding-Twilio-Rate-Limits-and-Message-Queues).
4. Replace the value for `from` with your Twilio phone number in [E.164 format](/docs/glossary/what-e164).
5. Save your changes and run this command from your terminal in the directory that contains `send_message.py`:

   ```bash
   python send_message.py
   ```

   After a few moments, you should receive an SMS from your Twilio number.

## Node.js

1. Create and open a new file called `send_message.js` anywhere on your machine and paste in the following code:

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

   To learn all of the API response values that you can return with `console.log()`, see the response for [Send an SMS Message in the API documentation](/docs/messaging/api/message-resource#send-an-sms-message). Precede the response value with `message.` (for example: `console.log(message.status)` returns the `status` value).
2. Set the environment variables for your Account SID and Auth Token.

   > \[!WARNING]
   >
   > To better control access, use API keys instead of the Account SID and Auth Token when you deploy to production. To learn more, see [Why you should use API keys](/docs/iam/api-keys#why-you-should-use-api-keys).

   On Mac or Linux:

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

   On Windows command line (cmd.exe), run the following commands. Replace `ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` with your Account SID and replace `your_auth_token` with your Auth Token.

   ```bash
   set TWILIO_ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   set TWILIO_AUTH_TOKEN=your_auth_token
   ```

   To learn more, see [Store your Twilio credentials safely](/docs/usage/secure-credentials).
3. In the `send_message.js` file, replace the value for `to` with the recipient phone number in [E.164 format](/docs/glossary/what-e164).

   To send a message to multiple recipients:

   1. Add a `const` statement after the existing `const` statements to define the array of phone numbers. Replace the phone numbers with your recipients' phone numbers in [E.164 format](/docs/glossary/what-e164).

      ```bash
      const numbers = ["+15558675310", "+12345678901", "+10987654321"];
      ```
   2. Replace the `async function createMessage()` block with the following code that iterates through each phone number in the `numbers` list and returns the message sent to each number. Twilio makes one API call for each number.

      ```javascript
      async function createMessage() {
        for (const number of numbers) {
          const message = await client.messages.create({
            body: "This is the ship that made the Kessel Run in fourteen parsecs?",
            from: "+15017122661",
            to: number,
          });

          console.log(`Sent to ${number}: ${message.body}`);
        }
      }
      ```

   > \[!NOTE]
   >
   > Message delivery performance to wireless carrier networks has limits. To learn more, see [Understanding Twilio Rate Limits and Message Queues](https://help.twilio.com/articles/115002943027-Understanding-Twilio-Rate-Limits-and-Message-Queues).
4. Replace the value for `from` with your Twilio phone number in [E.164 format](/docs/glossary/what-e164).
5. Save your changes and run this command from your terminal in the directory that contains `send_message.js`:

   ```bash
   node send_message.js
   ```

   After a few moments, you receive an SMS from your Twilio number.

## PHP

1. Create and open a new file called `send_message.php` in the project directory and paste in the following code:

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

   To learn all of the API response values that you can return with `print`, see the response for [Send an SMS Message in the API documentation](/docs/messaging/api/message-resource#send-an-sms-message). Precede the response value with `$message->` (for example: `print $message->status;` returns the `status` value).
2. Set the environment variables for your Account SID and Auth Token.

   > \[!WARNING]
   >
   > To better control access, use API keys instead of the Account SID and Auth Token when you deploy to production. To learn more, see [Why you should use API keys](/docs/iam/api-keys#why-you-should-use-api-keys).

   On Mac or Linux:

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

   On Windows command line (cmd.exe), run the following commands. Replace `ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` with your Account SID and replace `your_auth_token` with your Auth Token.

   ```bash
   set TWILIO_ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   set TWILIO_AUTH_TOKEN=your_auth_token
   ```

   To learn more, see [Store your Twilio credentials safely](/docs/usage/secure-credentials).
3. In the `send_message.php` file, replace the value for `to` with the recipient phone number in [E.164 format](/docs/glossary/what-e164).

   To send a message to multiple recipients:

   1. Add a statement after the `$twilio` to define the array of phone numbers. Replace the phone numbers with your recipients' phone numbers in [E.164 format](/docs/glossary/what-e164).

      ```bash
      $numbers = ["+15558675310", "+12345678901", "+10987654321"];
      ```
   2. Replace the `$message =` and `print` statements with the following code that iterates through each phone number in the `numbers` list and returns the message sent to each number. Twilio makes one API call for each number.

      ```php
      foreach ($numbers as $to) {
          $message = $twilio->messages->create(
              $to, // To
              [
                  "body" =>
                      "This is the ship that made the Kessel Run in fourteen parsecs?",
                  "from" => "+15017122661",
              ]
          );

          print "Sent to $to: " . $message->body . "\n";
      }
      ```

   > \[!NOTE]
   >
   > Message delivery performance to wireless carrier networks has limits. To learn more, see [Understanding Twilio Rate Limits and Message Queues](https://help.twilio.com/articles/115002943027-Understanding-Twilio-Rate-Limits-and-Message-Queues).
4. Replace the value for `from` with your Twilio phone number in [E.164 format](/docs/glossary/what-e164).
5. Update line 5 of `send_message.php` to `require __DIR__ . '/vendor/autoload.php';`
6. Save your changes and run this command from your terminal in the directory that contains `send_message.php`:

   ```bash
   php send_message.php
   ```

   After a few moments, you receive an SMS from your Twilio number.

## C# (.NET Framework)

1. Set the environment variables for your Account SID and Auth Token and start Visual Studio with the inherited variables.

   > \[!WARNING]
   >
   > To better control access, use API keys instead of the Account SID and Auth Token when you deploy to production. To learn more, see [Why you should use API keys](/docs/iam/api-keys#why-you-should-use-api-keys).

   On Windows command line (cmd.exe), run the following commands. Replace `ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` with your Account SID and replace `your_auth_token` with your Auth Token.

   ```bash
   set TWILIO_ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   set TWILIO_AUTH_TOKEN=your_auth_token
   start devenv
   ```

   To learn more, see [Store your Twilio credentials safely](/docs/usage/secure-credentials).
2. Create and set up a new project in Visual Studio:
   * In Visual Studio, click **Create a new project**.
   * Click **Console App (.NET Framework)**.
   * Use the [NuGet Package Manager](https://learn.microsoft.com/en-us/nuget/consume-packages/install-use-packages-visual-studio) to install the Twilio REST API SDK.
3. Open the file in your new Visual Studio project called `Program.cs` and paste in the following code, replacing the existing template code:

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
   To learn all of the API response values that you can return with `Console.WriteLine()`, see the response for [Send an SMS Message in the API documentation](/docs/messaging/api/message-resource#send-an-sms-message). Precede the response value with `message.` and capitalize the first letter of the response value (for example: `Console.WriteLine(message.Status)` returns the `status` value).
4. In the `Program.cs` file, replace the value for `to: new Twilio.Types.PhoneNumber` with the recipient phone number in [E.164 format](/docs/glossary/what-e164).

   To send a message to multiple recipients, replace the `class Program` statement with the following code that iterates through each phone number in the `numbers` list and returns the message sent to each number. Replace the phone numbers with your recipients' phone numbers in [E.164 format](/docs/glossary/what-e164). Twilio makes one API call for each number.

   ```csharp
   class Program {
       public static async Task Main(string[] args) {
           // Find your Account SID and Auth Token at twilio.com/console
           // and set the environment variables. See https://twil.io/secure
           string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
           string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

           TwilioClient.Init(accountSid, authToken);

           string[] numbers = { "+15558675310", "+12345678901", "+10987654321" };

           foreach (var number in numbers) {
               var message = await MessageResource.CreateAsync(
                   body: "Join Earth's mightiest heroes. Like Kevin Bacon.",
                   from: new Twilio.Types.PhoneNumber("+15017122661"),
                   to: new Twilio.Types.PhoneNumber(number));

                Console.WriteLine(message.Body);
           }
       }
   }
   ```

   > \[!NOTE]
   >
   > Message delivery performance to wireless carrier networks has limits. To learn more, see [Understanding Twilio Rate Limits and Message Queues](https://help.twilio.com/articles/115002943027-Understanding-Twilio-Rate-Limits-and-Message-Queues).
5. Replace the value for `from: new Twilio.Types.PhoneNumber` with your Twilio phone number in [E.164 format](/docs/glossary/what-e164).
6. Save your changes and run your project in Visual Studio.

   After a few moments, you receive an SMS from your Twilio number.

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
   To learn all of the API response values that you can return with `Console.WriteLine()`, see the response for [Send an SMS Message in the API documentation](/docs/messaging/api/message-resource#send-an-sms-message). Precede the response value with `message.` and capitalize the first letter of the response value (for example: `Console.WriteLine(message.Status)` returns the `status` value).
3. Set the environment variables for your Account SID and Auth Token.

   > \[!WARNING]
   >
   > To better control access, use API keys instead of the Account SID and Auth Token when you deploy to production. To learn more, see [Why you should use API keys](/docs/iam/api-keys#why-you-should-use-api-keys).

   On Mac or Linux:

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

   On Windows command line (cmd.exe), run the following commands. Replace `ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` with your Account SID and replace `your_auth_token` with your Auth Token.

   ```bash
   set TWILIO_ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   set TWILIO_AUTH_TOKEN=your_auth_token
   ```

   To learn more, see [Store your Twilio credentials safely](/docs/usage/secure-credentials).
4. In the `Program.cs` file, replace the value for `to: new Twilio.Types.PhoneNumber` with the recipient phone number in [E.164 format](/docs/glossary/what-e164).

   To send a message to multiple recipients, replace the `class Program` statement with the following code that iterates through each phone number in the `numbers` list and returns the message sent to each number. Replace the phone numbers with your recipients' phone numbers in [E.164 format](/docs/glossary/what-e164). Twilio makes one API call for each number.

   ```csharp
   class Program {
       public static async Task Main(string[] args) {
           // Find your Account SID and Auth Token at twilio.com/console
           // and set the environment variables. See https://twil.io/secure
           string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
           string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

           TwilioClient.Init(accountSid, authToken);

           string[] numbers = { "+15558675310", "+12345678901", "+10987654321" };

           foreach (var number in numbers) {
               var message = await MessageResource.CreateAsync(
                   body: "Join Earth's mightiest heroes. Like Kevin Bacon.",
                   from: new Twilio.Types.PhoneNumber("+15017122661"),
                   to: new Twilio.Types.PhoneNumber(number));

                Console.WriteLine(message.Body);
           }
       }
   }
   ```

   > \[!NOTE]
   >
   > Message delivery performance to wireless carrier networks has limits. To learn more, see [Understanding Twilio Rate Limits and Message Queues](https://help.twilio.com/articles/115002943027-Understanding-Twilio-Rate-Limits-and-Message-Queues).
5. Replace the value for `from: new Twilio.Types.PhoneNumber` with your Twilio phone number in [E.164 format](/docs/glossary/what-e164).
6. Save your changes and run this command in the directory that contains `Program.cs`:

   ```bash
   dotnet run
   ```

   After a few moments, you receive an SMS from your Twilio number.

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
   To learn all of the API response values that you can return with `System.out.println();`, see the response for [Send an SMS Message in the API documentation](/docs/messaging/api/message-resource#send-an-sms-message). Precede the response value with `message.get`, capitalize the response value, and add parentheses after the response value (for example: `System.out.println(message.getStatus());` returns the `status` value).
2. Set the environment variables for your Account SID and Auth Token.

   > \[!WARNING]
   >
   > To better control access, use API keys instead of the Account SID and Auth Token when you deploy to production. To learn more, see [Why you should use API keys](/docs/iam/api-keys#why-you-should-use-api-keys).

   On Mac or Linux:

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

   On Windows command line (cmd.exe), run the following commands. Replace `ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` with your Account SID and replace `your_auth_token` with your Auth Token.

   ```bash
   set TWILIO_ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   set TWILIO_AUTH_TOKEN=your_auth_token
   ```

   To learn more, see [Store your Twilio credentials safely](/docs/usage/secure-credentials).
3. In the `Example.java` file, replace the value for the first phone number with the recipient phone number in [E.164 format](/docs/glossary/what-e164).

   To send a message to multiple recipients:

   1. Replace the contents of the `public static void main(String[] args)` block with the following code that iterates through each phone number in a `numbers` list and returns the message sent to each number. Twilio makes one API call for each number.

      ```java
      Twilio.init(ACCOUNT_SID, AUTH_TOKEN);

       String[] numbers = {"+15558675310", "+12345678901", "+10987654321"};

      for (String to : numbers) {
          Message message = Message
                                 .creator(new PhoneNumber(to),
                                     new PhoneNumber("+15017122661"),
                                     "This is the ship that made the Kessel Run in fourteen parsecs?")
                                .create();

          System.out.println(message.getBody());
      }
      ```
   2. Replace the phone numbers in the `numbers` list with your recipients' phone numbers in [E.164 format](/docs/glossary/what-e164).

   > \[!NOTE]
   >
   > Message delivery performance to wireless carrier networks has limits. To learn more, see [Understanding Twilio Rate Limits and Message Queues](https://help.twilio.com/articles/115002943027-Understanding-Twilio-Rate-Limits-and-Message-Queues).
4. Replace the value for the second `new PhoneNumber()` with your Twilio phone number in [E.164 format](/docs/glossary/what-e164).
5. Save your changes and compile the Java from your terminal in the directory that contains `Example.java`. Replace `10.9.0` with the version of your fat jar file.

   ```bash
   javac -cp twilio-10.9.0-jar-with-dependencies.jar Example.java
   ```
6. Run the Java program. Replace `10.9.0` with the version of your fat JAR file.
   On Linux or macOS, run:

   ```bash
   java -cp .:twilio-10.9.0-jar-with-dependencies.jar Example
   ```

   On Windows, run:

   ```bash
   java -cp ".;twilio-10.9.0-jar-with-dependencies.jar" Example
   ```

   After a few moments, you receive an SMS from your Twilio number.

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
2. Create and open a new file called `send_message.go` in your Go project directory and paste in the following code:

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
   To learn all of the API response values that you can return with `fmt.Println()`, see the response for [Send an SMS Message in the API documentation](/docs/messaging/api/message-resource#send-an-sms-message). Precede the response value with `*resp.` and capitalize the first letter of the response value (for example: `fmt.Println(*resp.Status)` returns the `status` value).
3. Set the environment variables for your Account SID and Auth Token.

   > \[!WARNING]
   >
   > To better control access, use API keys instead of the Account SID and Auth Token when you deploy to production. To learn more, see [Why you should use API keys](/docs/iam/api-keys#why-you-should-use-api-keys).

   On Mac or Linux:

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

   On Windows command line (cmd.exe), run the following commands. Replace `ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` with your Account SID and replace `your_auth_token` with your Auth Token.

   ```bash
   set TWILIO_ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   set TWILIO_AUTH_TOKEN=your_auth_token
   ```

   To learn more, see [Store your Twilio credentials safely](/docs/usage/secure-credentials).
4. In the `send_message.go` file, replace the value for `to` with the recipient phone number in [E.164 format](/docs/glossary/what-e164).

   To send a message to multiple recipients:

   1. Add a statement below `client` to define the array of phone numbers. Replace the phone numbers with your recipients' phone numbers in [E.164 format](/docs/glossary/what-e164).

      ```bash
      numbers := []string{"+15558675310", "+12345678901", "+10987654321"}
      ```
   2. Replace the `params` statements with the following code that iterates through each phone number in the `numbers` list. Twilio makes one API call for each number.

      ```go
        for _, number := range numbers {
            params := &api.CreateMessageParams{}
            params.SetBody("Join Earth's mightiest heroes. Like Kevin Bacon.")
            params.SetFrom("+15017122661")
            params.SetTo(number)
      ```
   3. Add an additional closing bracket `}` to the end of the file.

   > \[!NOTE]
   >
   > Message delivery performance to wireless carrier networks has limits. To learn more, see [Understanding Twilio Rate Limits and Message Queues](https://help.twilio.com/articles/115002943027-Understanding-Twilio-Rate-Limits-and-Message-Queues).
5. Replace the value for `params.SetFrom` with your Twilio phone number in [E.164 format](/docs/glossary/what-e164).
6. Save your changes and run this command in the directory that contains `send_message.go`:

   ```bash
   go run send_message.go
   ```

   After a few moments, you receive an SMS from your Twilio number.

## Ruby

1. Create and open a new file called `send_message.rb` anywhere on your machine and paste in the following code:

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
   To learn all of the API response values that you can return with `puts`, see the response for [Send an SMS Message in the API documentation](/docs/messaging/api/message-resource#send-an-sms-message). Precede the response value with `message.` (for example: `puts message.status` returns the `status` value).
2. Set the environment variables for your Account SID and Auth Token.

   > \[!WARNING]
   >
   > To better control access, use API keys instead of the Account SID and Auth Token when you deploy to production. To learn more, see [Why you should use API keys](/docs/iam/api-keys#why-you-should-use-api-keys).

   On Mac or Linux:

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

   On Windows command line (cmd.exe), run the following commands. Replace `ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` with your Account SID and replace `your_auth_token` with your Auth Token.

   ```bash
   set TWILIO_ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   set TWILIO_AUTH_TOKEN=your_auth_token
   ```

   To learn more, see [Store your Twilio credentials safely](/docs/usage/secure-credentials).
3. In the `send_message.rb` file, replace the value for `to` with the recipient phone number in [E.164 format](/docs/glossary/what-e164).

   To send a message to multiple recipients:

   1. Add a statement below `@client` to define the array of phone numbers. Replace the phone numbers with your recipients' phone numbers in [E.164 format](/docs/glossary/what-e164).

      ```bash
      numbers = ['+15558675310', '+12345678901', '+10987654321']
      ```
   2. Replace the `message =` and `puts` statements with the following code that iterates through each phone number in the `numbers` list. Twilio makes one API call for each number.

      ```ruby
      numbers.each do |number|
        message = @client
                  .api
                  .v2010
                  .messages
                  .create(
                    body: 'Join Earth\'s mightiest heroes. Like Kevin Bacon.',
                    from: '+15017122661',
                    to: number
                  )
        puts message.body
      end
      ```

   > \[!NOTE]
   >
   > Message delivery performance to wireless carrier networks has limits. To learn more, see [Understanding Twilio Rate Limits and Message Queues](https://help.twilio.com/articles/115002943027-Understanding-Twilio-Rate-Limits-and-Message-Queues).
4. Replace the value for `from` with your Twilio phone number in [E.164 format](/docs/glossary/what-e164).
5. Save your changes and run this command from your terminal in the directory that contains `send_message.rb`:

   ```bash
   ruby send_message.rb
   ```

   After a few moments, you receive an SMS from your Twilio number.

## cURL

1. Set the environment variables for your Account SID, Auth Token, your Twilio phone number in [E.164 format](/docs/glossary/what-e164), and the recipient's phone number in [E.164 format](/docs/glossary/what-e164).

   > \[!WARNING]
   >
   > To better control access, use API keys instead of the Account SID and Auth Token when you deploy to production. To learn more, see [Why you should use API keys](/docs/iam/api-keys#why-you-should-use-api-keys).

   On macOS or Linux, run the following commands. Replace `xxxxxxxxx` with your values.

   ```bash
   export TWILIO_ACCOUNT_SID=xxxxxxxxx
   export TWILIO_AUTH_TOKEN=xxxxxxxxx
   export TWILIO_NUMBER=xxxxxxxxx
   export TO_NUMBER=xxxxxxxxx
   ```

   On Windows command line (cmd.exe), run the following commands. Replace `xxxxxxxxx` with your values.

   ```bash
   set TWILIO_ACCOUNT_SID=xxxxxxxxx
   set TWILIO_AUTH_TOKEN=xxxxxxxxx
   set TWILIO_NUMBER=xxxxxxxxx
   set TO_NUMBER=xxxxxxxxx
   ```

   To learn more, see [Store your Twilio credentials safely](/docs/usage/secure-credentials).
2. Run the cURL command from your terminal.

   On macOS or Linux, run the following command. Replace the `Body` value with the message you want to send.

   ```bash
   curl -X POST -d "Body=Hi there, this is a test message from cURL" -d "From=$TWILIO_NUMBER" -d "To=$TO_NUMBER" "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages" -u "$TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN"
   ```

   On Windows, run the following command. Replace the `Body` value with the message you want to send.

   ```bash
   curl -X POST -d "Body=Hi there, this is a test message from cURL" -d "From=%TWILIO_NUMBER%" -d "To=%TO_NUMBER%" "https://api.twilio.com/2010-04-01/Accounts/%TWILIO_ACCOUNT_SID%/Messages" -u "%TWILIO_ACCOUNT_SID%:%TWILIO_AUTH_TOKEN%"
   ```

   After a few moments, you receive an SMS from your Twilio number.

## Send an MMS message

> \[!NOTE]
>
> To learn which countries support MMS messages, see
> [Sending and receiving MMS messages](https://help.twilio.com/hc/en-us/articles/223179808-Sending-and-receiving-MMS-messages).

## Python

To send an MMS message, follow the steps to [send an SMS message](#send-an-sms-message), adding the media URL to the code as shown in the following example. The media URL tells Twilio where to get the media you want to include.

The media URL must be a publicly accessible URL. Twilio can't reach any hidden URLs or URLs that require authentication.

When the Twilio REST API creates your new Message resource, it saves the image found at the specified in the media URL as a [Media resource](https://www.twilio.com/docs/messaging/api/media-resource). Once you create a resource, you can access it at any time by using the API.

Set the `media_url` parameter:

Send a Message with an Image URL using Twilio with Python

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
    body="This is the ship that made the Kessel Run in fourteen parsecs?",
    from_="+15017122661",
    media_url=[
        "https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg"
    ],
    to="+15558675310",
)

print(message.body)
```

## Node.js

To send an MMS message, follow the steps to [send an SMS message](#send-an-sms-message), adding the media URL to the code as shown in the following example. The media URL tells Twilio where to get the media you want to include.

The media URL must be a publicly accessible URL. Twilio can't reach any hidden URLs or URLs that require authentication.

When the Twilio REST API creates your new Message resource, it saves the image found at the specified in the media URL as a [Media resource](https://www.twilio.com/docs/messaging/api/media-resource). Once you create a resource, you can access it at any time by using the API.

Set the `mediaUrl` parameter:

Send a Message with an Image URL using Twilio with Node.js

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
    mediaUrl: [
      "https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg",
    ],
    to: "+15558675310",
  });

  console.log(message.body);
}

createMessage();
```

## PHP

To send an MMS message, follow the steps to [send an SMS message](#send-an-sms-message), adding the media URL to the code as shown in the following example. The media URL tells Twilio where to get the media you want to include.

The media URL must be a publicly accessible URL. Twilio can't reach any hidden URLs or URLs that require authentication.

When the Twilio REST API creates your new Message resource, it saves the image found at the specified in the media URL as a [Media resource](https://www.twilio.com/docs/messaging/api/media-resource). Once you create a resource, you can access it at any time by using the API.

Set the `mediaUrl` parameter:

Send a Message with an Image URL using Twilio with PHP

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
        "mediaUrl" => [
            "https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg",
        ],
    ]
);

print $message->body;
```

## C# (.NET Framework)

To send an MMS message, follow the steps to [send an SMS message](#send-an-sms-message), adding the media URL to the code as shown in the following example. The media URL tells Twilio where to get the media you want to include.

The media URL must be a publicly accessible URL. Twilio can't reach any hidden URLs or URLs that require authentication.

When the Twilio REST API creates your new Message resource, it saves the image found at the specified in the media URL as a [Media resource](https://www.twilio.com/docs/messaging/api/media-resource). Once you create a resource, you can access it at any time by using the API.

Set the `mediaUrl` parameter:

Send a Message with an Image URL using Twilio with C#

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

        var message = await MessageResource.CreateAsync(
            body: "This is the ship that made the Kessel Run in fourteen parsecs?",
            from: new Twilio.Types.PhoneNumber("+15017122661"),
            mediaUrl: new List<Uri> { new Uri(
                "https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg") },
            to: new Twilio.Types.PhoneNumber("+15558675310"));

        Console.WriteLine(message.Body);
    }
}
```

## C# (.NET Core)

To send an MMS message, follow the steps to [send an SMS message](#send-an-sms-message), adding the media URL to the code as shown in the following example. The media URL tells Twilio where to get the media you want to include.

The media URL must be a publicly accessible URL. Twilio can't reach any hidden URLs or URLs that require authentication.

When the Twilio REST API creates your new Message resource, it saves the image found at the specified in the media URL as a [Media resource](https://www.twilio.com/docs/messaging/api/media-resource). Once you create a resource, you can access it at any time by using the API.

Set the `mediaUrl` parameter:

Send a Message with an Image URL using Twilio with C#

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

        var message = await MessageResource.CreateAsync(
            body: "This is the ship that made the Kessel Run in fourteen parsecs?",
            from: new Twilio.Types.PhoneNumber("+15017122661"),
            mediaUrl: new List<Uri> { new Uri(
                "https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg") },
            to: new Twilio.Types.PhoneNumber("+15558675310"));

        Console.WriteLine(message.Body);
    }
}
```

## Java

To send an MMS message, follow the steps to [send an SMS message](#send-an-sms-message), adding the media URL to the code as shown in the following example. The media URL tells Twilio where to get the media you want to include.

The media URL must be a publicly accessible URL. Twilio can't reach any hidden URLs or URLs that require authentication.

When the Twilio REST API creates your new Message resource, it saves the image found at the specified in the media URL as a [Media resource](https://www.twilio.com/docs/messaging/api/media-resource). Once you create a resource, you can access it at any time by using the API.

Add the required import statements for `java.net.URI` and `java.util.Arrays` and add the `.setMediaUrl()` statement:

Send a Message with an Image URL using Twilio with Java

```java
// Install the Java helper library from twilio.com/docs/java/install

import com.twilio.type.PhoneNumber;
import java.net.URI;
import java.util.Arrays;
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
                              .setMediaUrl(Arrays.asList(
                                  URI.create("https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg")))
                              .create();

        System.out.println(message.getBody());
    }
}
```

## Go

To send an MMS message, follow the steps to [send an SMS message](#send-an-sms-message), adding the media URL to the code as shown in the following example. The media URL tells Twilio where to get the media you want to include.

The media URL must be a publicly accessible URL. Twilio can't reach any hidden URLs or URLs that require authentication.

When the Twilio REST API creates your new Message resource, it saves the image found at the specified in the media URL as a [Media resource](https://www.twilio.com/docs/messaging/api/media-resource). Once you create a resource, you can access it at any time by using the API.

Add the `params.SetMediaUrl()` statement:

Send a Message with an Image URL using Twilio with Go

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
	params.SetBody("This is the ship that made the Kessel Run in fourteen parsecs?")
	params.SetFrom("+15017122661")
	params.SetMediaUrl([]string{
		"https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg",
	})
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

## Ruby

To send an MMS message, follow the steps to [send an SMS message](#send-an-sms-message), adding the media URL to the code as shown in the following example. The media URL tells Twilio where to get the media you want to include.

The media URL must be a publicly accessible URL. Twilio can't reach any hidden URLs or URLs that require authentication.

When the Twilio REST API creates your new Message resource, it saves the image found at the specified in the media URL as a [Media resource](https://www.twilio.com/docs/messaging/api/media-resource). Once you create a resource, you can access it at any time by using the API.

Set the `media_url` parameter:

Send a Message with an Image URL using Twilio with Ruby

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
            body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
            from: '+15017122661',
            media_url: [
              'https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg'
            ],
            to: '+15558675310'
          )

puts message.body
```

## cURL

To send an MMS message, follow the steps to [send an SMS message](#send-an-sms-message), adding the media URL to the code as shown in the following example. The media URL tells Twilio where to get the media you want to include.

The media URL must be a publicly accessible URL. Twilio can't reach any hidden URLs or URLs that require authentication.

When the Twilio REST API creates your new Message resource, it saves the image found at the specified in the media URL as a [Media resource](https://www.twilio.com/docs/messaging/api/media-resource). Once you create a resource, you can access it at any time by using the API.

Set the `MediaUrl` parameter:

On macOS or Linux:

```bash
curl -X POST -d "Body=Hi there, this is a test message from cURL" -d "MediaUrl=https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg" -d "From=$TWILIO_NUMBER" -d "To=$TO_NUMBER" "https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID/Messages" -u "$TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN"
```

On Windows:

```bash
curl -X POST -d "Body=Hi there, this is a test message from cURL" -d "MediaUrl=https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg" -d "From=%TWILIO_NUMBER%" -d "To=%TO_NUMBER%" "https://api.twilio.com/2010-04-01/Accounts/%TWILIO_ACCOUNT_SID%/Messages" -u "%TWILIO_ACCOUNT_SID%:%TWILIO_AUTH_TOKEN%"
```

## Next steps

* View more [Messaging tutorials](/docs/messaging/tutorials)
* Sending high-volume messages? Learn more about [Messaging services](/docs/messaging/services)
* Browse the following developer resources:
  * [Messaging API Reference](/docs/messaging/api)
  * [TwiML documentation](/docs/messaging/twiml)
