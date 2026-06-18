# Verify PHP Laravel Quickstart

With just a few lines of code, your PHP Laravel application can verify phone numbers and add an additional layer of security with Twilio Verify.

This PHP Verify Quickstart will teach you how to do this using our [Verify REST API](/docs/verify/api), the Twilio PHP SDK, and [Laravel PHP Framework](https://laravel.com/) to ease development.

In this Quickstart, you will learn how to:

1. Sign up for Twilio
2. Set up your development environment
3. Send your first SMS phone verification
4. Check verification codes

> \[!NOTE]
>
> Short on time? Spin up a low-code, fully editable verification demo in **less than 2 minutes** using [Twilio's Code Exchange and Quick Deploy here](https://www.twilio.com/code-exchange/one-time-passcode-verification-otp).

## Sign up for Twilio

If you already have a Twilio account, you're all set here! Feel free to jump to the next step.

Before you can send an SMS from PHP, you'll need to [sign up for a Twilio account](https://www.twilio.com/try-twilio) or sign into your existing account.

You can sign up for a free 30-day Twilio trial account [here](https://www.twilio.com/try-twilio). For details on trial free units and restrictions, see [Twilio trial account](/docs/usage/trials).

* When you sign up, you'll be asked to verify your personal phone number. This helps Twilio verify your identity and also allows you to send test verification messages to your phone from your Twilio account while in trial mode. **This phone verification step is exactly what you'll learn how to build in this tutorial!**
* Once you verify your number, you'll be asked to create a project. For the sake of this tutorial, you can click on the "Learn and Explore" template. Give your project a name, or just click "skip remaining steps" to continue with the default.
* Once you get through the project creation flow, you'll arrive at your project dashboard in the [Twilio Console](https://www.twilio.com/console). This is where you'll be able to access your Account SID, authentication token, create a verification service, and more.

### Do I need a phone number?

If you've sent SMS with Twilio in the past, you might remember needing to buy a phone number. With Twilio Verify, we take care of that for you! The Verify API selects the best routes for quickly and reliably delivering verification codes globally.

### Create a Verify Service

Verify uses Services for configuration. To send a Verify API request you will need both your Twilio Credentials and a Service SID. You can create and update a Service in two ways:

1. In the [Verify Console](https://www.twilio.com/console/verify/services)
2. With the [Verify API](/docs/verify/api/service)

Services can be used to edit the name (which shows up in the message template), set the code length (4-10 characters), enable settings like the "do not share warning" and more.

Now that you have a Twilio account and a verification service, you can start writing some code! To make things even easier we will use [Twilio's official helper for PHP applications](https://github.com/twilio/twilio-php).

## Install PHP Core

If you've gone through one of our other PHP Quickstarts already and have PHP and Composer installed, you can skip this step and get straight to sending your first verification.

To start a phone verification and send your first SMS, you'll need to have PHP 7 installed - if you don't know if you have PHP installed, run the following command to see what version you have:

`php --version`

The Twilio SDK requires PHP version 5.3 or higher, but we'll use PHP >= 7.1 in this tutorial as [older versions are no longer supported](https://www.php.net/supported-versions.php).

If you have a not supported version of PHP you'll need to install it before going any further. Follow the directions for installing [PHP for your platform (Windows, Mac, Linux)](https://www.php.net/manual/en/install.php).

The project dependencies are managed using [composer](https://getcomposer.org/). If you don't have it installed follow the [instructions to download and install it](https://getcomposer.org/download/).

Send an SMS verification code

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

print $verification->status;
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

Check a verification code

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
        "to" => "+15017122661",
        "code" => "123456",
    ]);

print $verification_check->status;
```

```json
{
  "sid": "VEaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "service_sid": "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "account_sid": "ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  "to": "+15017122661",
  "channel": "sms",
  "status": "approved",
  "valid": true,
  "amount": null,
  "payee": null,
  "sna_attempts_error_codes": [],
  "date_created": "2015-07-30T20:00:00Z",
  "date_updated": "2015-07-30T20:00:00Z"
}
```

## Clone and Setup the Verification Application

Start by [cloning our Verify Quickstart PHP repository.](https://github.com/TwilioDevEd/verify-v2-quickstart-php)

```bash
git clone git@github.com:TwilioDevEd/verify-v2-quickstart-php.git
```

If you don't have git installed or prefer to download the source code you can [grab a zip file of the project here](https://github.com/TwilioDevEd/verify-v2-quickstart-php/archive/master.zip).

### Install project dependencies

Enter your new project directory with

```bash
cd verify-v2-quickstart-php/
```

Follow the steps to [install Composer](https://getcomposer.org/download/) and run it

```bash
php composer.phar require Twilio/sdk
```

Copy *`.env.example`* to *`.env`* with this command

```bash
cp .env.example .env
```

and update the content to set your Twilio Account sensitive data.

```bash
# Twilio API credentials
# (find here https://www.twilio.com/console)
TWILIO_ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Verification Service SID
# (create one here https://www.twilio.com/console/verify/services)
TWILIO_VERIFICATION_SID=VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

Create the local SQLite database file

```bash
touch database/twilio_verify_quickstart.sqlite (Unix like OS only)
```

Run database migrations

```bash
php artisan migrate
```

Create an [application encryption key](https://laravel.com/docs/5.4/encryption)

```bash
php artisan key:generate
```

Run the app

```bash
php artisan serve
```

If it is all set up correctly you'll soon get a message that the app is up!

## Use the PHP Twilio Verify Demo

Navigate to `http://localhost:8000/register`. You should see a registration form that looks like this:

![Twilio Verify registration form with fields for username, password, phone number, and verification method.](https://docs-resources.prod.twilio.com/0cafbb154caee25509e003385b6124963b16a461280690eae35720562911109f.png)

Enter your phone number and choose which channel to request verification over. Finally hit the green `Sign Up` button and wait. You'll either receive a phone call or an SMS with the verification token. If you requested a phone call, as an additional security feature you may need to interact to proceed (the call will tell you to enter a number on the phone keypad).

Enter the token into the Verification entry form and click 'Verify':

![Verification form with code entry field and verify button.](https://docs-resources.prod.twilio.com/045846c5c5806563af50a437f19fd85e07b716e542662ff93d6ad1305a9efc13.png)

And with that, your demo app is protected with Twilio's Phone Verification! You can now log out to try the untried channel.

## What's Next?

Your demo app is now keeping fraudulent users from registering with your business and polluting your database. Next, check out all of the variables and options available to you in the [Verify API Reference](/docs/verify/api).

After that, check out adding additional verification channels supported by the Verify API like:

* [Email](/docs/verify/email)
* [TOTP](/docs/glossary/totp)
* [Push](/docs/verify/push)

> \[!NOTE]
>
> Lastly, to protect your service against fraud, view our guidance on [Preventing Toll Fraud](/docs/verify/preventing-toll-fraud) when using Verify.
