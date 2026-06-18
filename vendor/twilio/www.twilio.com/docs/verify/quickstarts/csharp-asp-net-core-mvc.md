# Verify C# ASP.NET Core Quickstart

With just a few lines of code, your C# ASP.NET application can verify phone numbers and add an additional layer of security with Twilio Verify.

This C# Verify Quickstart will teach you how to do this using our [Verify REST API](/docs/verify/api), the Twilio C# SDK, and [C# ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/) to ease development.

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

Before you can send an SMS from C#, you'll need to [sign up for a Twilio account](https://www.twilio.com/try-twilio) or sign into your existing account.

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

Now that you have a Twilio account and a verification service, you can start writing some code! To make things even easier we will use [Twilio's official helper for C# and .NET applications](https://github.com/twilio/twilio-csharp).

## Install .NET Core

If you've gone through one of our other .NET Core Quickstarts already and have .NET Core installed, you can skip this step and get straight to sending your first verification.

To start a phone verification and send your first SMS, you'll need to have the .NET Core SDK installed - if you don't know if you have the .NET Core installed, run the following command to see what version you have:

`dotnet --version`

You should see something similar to this output:

`2.X.XXX`

The Twilio SDK requires .NET Framework version 3.5 or higher or any [.NET runtime supporting .NET Standard v1.4](https://docs.microsoft.com/en-us/dotnet/standard/net-standard#net-implementation-support).

If you have a not supported version of .NET Core or no .NET Core at all, you'll need to install the .NET Core SDK before going any further. Follow the directions for installing the .NET Core SDK for your platform (Windows, Mac, Linux) from the [Microsoft .NET Download Page](https://dotnet.microsoft.com/download).

Should you prefer to use .NET Framework instead of .NET Core the instructions for building and running the project will be different and you will need to change the targeted framework. Besides that, the code should work straight away.

Send an SMS verification code

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Verify.V2.Service;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var verification = await VerificationResource.CreateAsync(
            to: "+15017122661",
            channel: "sms",
            pathServiceSid: "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(verification.Status);
    }
}
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

```csharp
// Install the C# / .NET helper library from twilio.com/docs/csharp/install

using System;
using Twilio;
using Twilio.Rest.Verify.V2.Service;
using System.Threading.Tasks;

class Program {
    public static async Task Main(string[] args) {
        // Find your Account SID and Auth Token at twilio.com/console
        // and set the environment variables. See http://twil.io/secure
        string accountSid = Environment.GetEnvironmentVariable("TWILIO_ACCOUNT_SID");
        string authToken = Environment.GetEnvironmentVariable("TWILIO_AUTH_TOKEN");

        TwilioClient.Init(accountSid, authToken);

        var verificationCheck = await VerificationCheckResource.CreateAsync(
            to: "+15017122661",
            code: "123456",
            pathServiceSid: "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

        Console.WriteLine(verificationCheck.Status);
    }
}
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

Start by [cloning our C# ASP.NET Core repository.](https://github.com/TwilioDevEd/verify-v2-quickstart-csharp)

```bash
git clone git@github.com:TwilioDevEd/verify-v2-quickstart-csharp.git
```

If you don't have git installed or prefer to download the source code you can [grab a zip file of the project here](https://github.com/TwilioDevEd/verify-v2-quickstart-csharp/archive/master.zip).

### Install project dependencies

Twilio C# .NET SDK is already in the dependencies of the project. Building the project will download them.

```bash
cd verify-v2-quickstart-csharp/VerifyV2Quickstart/

dotnet build

```

Create a new file *`twilio.json`* and update the content. It will store your Twilio Account sensitive data. You can find your Account SID and Auth Token in the [Twilio Console](https://www.twilio.com/console). Create a [new Verification Service in the console](https://www.twilio.com/console/verify/services) and add the Verification SID to your *`twilio.json`* file.

```bash
{
  "Twilio": {
    "AccountSid": "Your Twilio Account SID",
    "AuthToken": "Your Twilio Auth Token",
    "VerificationSid": "Your Verify Service SID"
  }
}
```

Run the application

```bash
dotnet ef database update

dotnet run
```

If your credentials are set up correctly you'll soon get a message that the app is up!

## Use the .NET Core Twilio Verify Demo

Navigate to `http://localhost:5000/Identity/Account/Register`. You should see a registration form that looks like this:

![Twilio Verify registration form with fields for username, password, phone number, and verification method.](https://docs-resources.prod.twilio.com/0cafbb154caee25509e003385b6124963b16a461280690eae35720562911109f.png)

Enter your phone number and choose which channel to request verification over. Finally hit the green `Sign Up` button and wait. You'll either receive a phone call or an SMS with the verification token. If you requested a phone call, as an additional security feature you may need to interact to proceed (the call will tell you to enter a number on the phone keypad).

Enter the token into the Verification entry form and click 'Verify':

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
