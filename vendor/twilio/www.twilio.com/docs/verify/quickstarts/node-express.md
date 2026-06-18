# Verify Node.js Express Quickstart

With just a few lines of code, your Node.js/Express application can verify phone numbers and add an additional layer of security with Twilio Verify.

This Node.js Verify Quickstart will teach you how to do this using our [Verify REST API](/docs/verify/api), the Twilio Node.js SDK, and [Express.js](https://expressjs.com/) to ease development.

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

Before you can send an SMS from Node.js, you'll need to [sign up for a Twilio account](https://www.twilio.com/try-twilio) or sign into your existing account.

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

Now that you have a Twilio account and a verification service, you can start writing some code!

To make things even easier, we'll next install Twilio's official SDK for Node.js applications.

## Install Node.js and the Twilio SDK

If you've gone through one of our other Node.js Quickstarts already and have Node.js and the Twilio Node.js SDK installed, you can skip this step and get straight to sending your first verification.

To start a phone verification, you'll need to have Node.js and the Twilio Node.js SDK installed.

Send an SMS verification code

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
      channel: "sms",
      to: "+15017122661",
    });

  console.log(verification.status);
}

createVerification();
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
      to: "+15017122661",
    });

  console.log(verificationCheck.status);
}

createVerificationCheck();
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

Next we'll get this up and running in a full example project.

### Install Node.js and Yarn

See the Node.js [website](https://nodejs.org/en/download/). As well as [Yarn](https://yarnpkg.com/en/docs/install).

## Clone and Setup the Verification Application

Start by [cloning our Node.js repository](https://github.com/TwilioDevEd/verify-v2-quickstart-node).

```bash
git clone https://github.com/TwilioDevEd/verify-v2-quickstart-node.git
```

If you don't have git installed or prefer to download the source code you can [grab a zip file of the project here](https://github.com/TwilioDevEd/verify-v2-quickstart-node/archive/master.zip).

### Install Dependencies

```bash
cd verify-v2-quickstart-node

yarn install
```

Copy `.env.example` to `.env`. This is where we'll store sensitive data in [environment variables](https://www.twilio.com/blog/how-to-set-environment-variables.html).

```bash
cp .env.example .env
```

Modify your new `.env` file with your own `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, and `VERIFICATION_SID` that you can find in your Twilio Console.

Run the application

```bash
yarn start
```

If your credentials are set up correctly, you'll soon get a message that the app is up!

## Use the Node Twilio Verify Demo

Go to `http://localhost:3000/register`. It should display a registration form that resembles this:

![Twilio Verify registration form with fields for username, password, phone number, and verification method.](https://docs-resources.prod.twilio.com/0cafbb154caee25509e003385b6124963b16a461280690eae35720562911109f.png)

Enter your phone number and choose which channel to request verification over. Finally hit the green **Sign Up** button and wait. You'll either receive a phone call or an SMS with the verification token. If you requested a phone call, you may need to interact to proceed (entering a number on the phone keypad) as an additional security feature.

Enter the token into the Verification entry form and click **Verify**:

![Verification form with code entry field and verify button.](https://docs-resources.prod.twilio.com/045846c5c5806563af50a437f19fd85e07b716e542662ff93d6ad1305a9efc13.png)

And with that, your demo app is protected with Twilio's Phone Verification!

## What's Next?

Your demo app is now keeping fraudulent users from registering with your business and polluting your database. Next, check out all of the variables and options available to you in the [Verify API Reference](/docs/verify/api).

After that, check out adding additional verification channels supported by the Verify API like:

* [Email](/docs/verify/email)
* [TOTP](/docs/glossary/totp)
* [Push](/docs/verify/push)

> \[!NOTE]
>
> Lastly, to protect your service against fraud, view our guidance on [Preventing Toll Fraud](/docs/verify/preventing-toll-fraud) when using Verify.
