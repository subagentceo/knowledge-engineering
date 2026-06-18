# Verify Python Flask Quickstart

With just a few lines of code, your Python application can verify phone numbers and add an additional layer of security with Twilio Verify.

This Python Verify Quickstart will teach you how to do this using our [Verify REST API](/docs/verify/api), the Twilio Python SDK, and [Python's Flask microframework](http://flask.pocoo.org/) to ease development.

In this Quickstart, you will learn how to:

1. Sign up for Twilio
2. Set up your development environment
3. Send your first SMS, voice or [WhatsApp](/docs/verify/whatsapp) phone verification
4. Check verification codes

> \[!NOTE]
>
> Short on time? Spin up a low-code, fully editable verification demo in **less than 2 minutes** using [Twilio's Code Exchange and Quick Deploy here](https://www.twilio.com/code-exchange/one-time-passcode-verification-otp).

## Sign up for Twilio

If you already have a Twilio account, you're all set here! Feel free to jump to the next step.

Before you can send a phone verification from Python, you'll need to [sign up for a Twilio account](https://www.twilio.com/try-twilio) or sign into your existing account.

You can sign up for a free 30-day Twilio trial account [here](https://www.twilio.com/try-twilio). For details on trial free units and restrictions, see [Twilio trial account](/docs/usage/trials).

* When you sign up, you'll be asked to verify your personal phone number. This helps Twilio verify your identity and also allows you to send test verification messages to your phone from your Twilio account while in trial mode. **This phone verification step is exactly what you'll learn how to build in this tutorial!**
* Once you verify your number, you'll be asked for your Twilio introduction preference. For the sake of this tutorial, you can select "I just need my Account SID and Auth Token".
* You'll arrive at your project dashboard in the [Twilio Console](https://www.twilio.com/console). This is where you'll be able to access your Account SID and authentication token, create a verification service, and more.

### Do I need to buy a phone number?

If you've sent SMS with Twilio in the past, you might remember needing to buy a phone number. With Twilio Verify, we take care of that for you! The Verify API selects the best routes for quickly and reliably delivering verification codes globally.

### Create a Verify Service

Verify uses services for configuration. To send a Verify API request you will need both your Twilio Credentials and a Service SID. You can create and update a Service in two ways:

1. In the [Verify Console](https://www.twilio.com/console/verify/services)
2. With the [Verify API](/docs/verify/api/service)

Create a new Service using one of these methods. Services can be used to edit the name (which shows up in the message template), set the code length (4-10 characters), enable settings like the "do not share warning" and more.

Now that you have a Twilio account and a Verify Service, you can start writing some code! To make things even easier, we'll next install Twilio's official helper for Python applications.

## Install Python and the Twilio SDK

If you've gone through one of our other Python Quickstarts already and have Python and the Twilio Python SDK installed, you can skip this step and get straight to sending your first verification.

To start a phone verification, you'll need to have Python and the Twilio Python SDK installed.

### Install Python

If you're using a Mac or Linux machine, you probably already have Python installed. You can check this by opening up a terminal and running the following command:

```bash
python --version
```

You should see something like:

```csharp
$ python --version
Python 3.4  # Python 2.7+ is okay too
```

Windows users can follow this [excellent tutorial for installing Python on Windows](https://www.digitalocean.com/community/tutorials/how-to-install-python-3-and-set-up-a-local-programming-environment-on-windows-10), or follow the [instructions from Python's documentation](https://docs.python.org/3/using/windows.html).

Twilio's Python SDK supports both Python 2 and Python 3. You can use either version for this quickstart, but we recommend using Python 3 for future projects with Twilio unless there are specific libraries your project needs which are only compatible with Python 2.

Send an SMS verification code

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

verification = client.verify.v2.services(
    "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).verifications.create(channel="sms", to="+15017122661")

print(verification.status)
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

```python
# Download the helper library from https://www.twilio.com/docs/python/install
import os
from twilio.rest import Client

# Find your Account SID and Auth Token at twilio.com/console
# and set the environment variables. See http://twil.io/secure
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

verification_check = client.verify.v2.services(
    "VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
).verification_checks.create(to="+15017122661", code="123456")

print(verification_check.status)
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

Start by [cloning our Flask repository.](https://github.com/TwilioDevEd/verify-v2-quickstart-python)

```bash
git clone git@github.com:TwilioDevEd/verify-v2-quickstart-python.git
```

If you don't have git installed or prefer to download the source code you can [grab a zip file of the project here](https://github.com/TwilioDevEd/verify-v2-quickstart-python/archive/master.zip).

### Set up your virtual environment and install dependencies

If you're not familiar with Python virtual environments, [follow our tutorial for setting up your local Python environment](/docs/usage/tutorials/how-to-set-up-your-python-and-flask-development-environment). Navigate into the project folder and create your virtual environment.

```bash
cd verify-v2-quickstart-python

virtualenv venv
source venv/bin/activate

pip install -r requirements.txt
```

Copy `.env.example` to `.env`. This is where we'll store sensitive data in [environment variables.](https://www.twilio.com/blog/how-to-set-environment-variables.html)

```bash
cp .env.example .env
```

Run the application

```bash
export FLASK_APP=verify
export FLASK_ENV=development
flask init-db
flask run
```

Or on Windows cmd:

```bash
set FLASK_APP=verify
set FLASK_ENV=development
flask init-db
flask run
```

If your credentials are set up correctly you'll soon get a message that the app is up!

## Use the Flask Twilio Verify Demo

Navigate to `http://localhost:5000/auth/register`. You should see a registration form that looks like this:

![Twilio Verify registration form with fields for username, password, phone number, and verification method options.](https://docs-resources.prod.twilio.com/7726bafa9839fdc776bea77093bf2e1fcbef5e85111a7a975d22b7054456a09d.png)

Enter your phone number and choose which channel to request verification over. Finally hit the green `Sign Up` button and wait. You'll either receive an SMS, phone call, or WhatsApp message with the verification token. If you requested a phone call, as an additional security feature you may need to interact to proceed (the call will tell you to enter a number on the phone keypad).

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
