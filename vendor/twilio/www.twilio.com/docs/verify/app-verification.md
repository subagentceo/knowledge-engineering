# App Verification with Twilio SMS

## Verify Android Phone Numbers with Twilio

Does your Android application need to verify users' phone numbers using a one time password (OTP)? Using the Android [SMS Retriever API](https://developers.google.com/identity/sms-retriever/overview) from Google Play Services and [Twilio Verify](https://www.twilio.com/en-us/trusted-activation/verify), you can verify phone numbers without requiring a code to be typed in. Your application also won't have to ask for permission to read SMS messages.

Automating this stage in the onboarding funnel for your application could lead to happier end users, less customer support inquiries, and higher conversion rates.

What is Twilio? Twilio provides an easy-to use API for sending and receiving SMS messages with a global reach. With one integration you can send text messages to users all over the world.

[Twilio Verify](https://www.twilio.com/en-us/trusted-activation/verify) provides a complete solution for verifying end user phone numbers that we will use to send a numeric code in a text message to the Android app. Your server application will sit in the middle, between your Android app, and Verify, so that you can verify a user's phone number after they sign up with your mobile application.

What does that integration look like to send messages? The app will send a copy of that text message to an API endpoint that you provide, and then Verify will tell your code whether that code matches the one that was sent. Your server application can then mark the end user as verified.

## Getting Started With SMS Verification

Let's get started with your first SMS Verification! There are a couple of things you will need to set up to build SMS verification into your application.

For development and testing, you will need:

* Android Studio ([Download Android Studio from Google](https://developer.android.com/studio/index.html))
* Twilio Account - [create a Twilio account here](https://www.twilio.com/try-twilio).
* An Android phone with an active phone number that can receive SMS messages. It will also need to have Google Play Services 10.2 or above. You can check the version of Google Play Services on your phone under the Apps menu item in the Settings app. You won't be able to test with a tablet or device that does not have a phone number - this includes the Android Emulator.

Once you've assembled all of that, it's time to dig into some code samples!

## Download the Server Code

To get your solution up and running, you'll need a server. We've created quick start server applications that will provide a back end for your application. Follow the directions in the README for each of these projects. When you build SMS verification into your own application, you can use the code in these repos as a starting point. If you're building a solution in Java, C#, PHP, or Python - Twilio supports these languages, but we don't have an example application for those yet. We suggest reading through the Node.js application to get a sense for how things work.

* Node.js - [GitHub repo](https://github.com/TwilioDevEd/sms-verification-android-node)
* Ruby - [GitHub repo](https://github.com/TwilioDevEd/sms-verification-android-ruby)

## Download the Android Sample Application

Google created a sample application for you to use as a reference to get started. You'll need to follow the README for the sample app to get it properly configured:

[SMS Verify App GitHub Repo](https://github.com/android/identity/tree/master/SmsVerification)

One note - you'll need URLs for your web application to go into the `sensitive.xml` string values file in your Android app. You won't have those available until you get the web application up and running and either deploy it to the cloud, or use a localhost tunnel like ngrok to make a publicly accessible URL.

Luckily, that's the very next set of steps to get this up and running!

## Setting up the Server

### Node.js

For the Node.js server, so you will need to have Node installed locally or on the server you plan to deploy too. Need to set up Node? Download an installer from the [Node.js website](https://nodejs.org), or use your operating system's package manager.

The Node install comes with npm, the node package manager. After you download the server and unzip it, install the required Node modules from the command line with this command:

```bash
npm install
```

If you're curious about what modules the server is using (including the [Twilio SDK for Node](https://github.com/twilio/twilio-node)), take a look at the `package.json` file.

### Ruby

You will need to have Ruby installed on your computer, either as a standalone installation, or with a Ruby version manager like rbenv.

Download the Ruby server code, and then run:

`bundle install`

This command installs the Ruby gems the server needs to run.

## Server Configuration

Once you have your server downloaded, you will need several configuration values. Copy the `.env.example` file to `.env`, and then fill in these values. You will need all of them for a successful installation.

| Config Value               | Description                                                                                                                                                                                                                                                                                                                                                                            |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| TWILIO\_ACCOUNT\_SID       | The account SID is your primary Twilio account identifier. You will be able to find this value in the [Twilio Console](https://www.twilio.com/console).                                                                                                                                                                                                                                |
| TWILIO\_API\_KEY           | The Twilio SDK uses API Key and Secret pairs to make REST calls to the Twilio API. You can create a new API Key and Secret pair on the [API Keys](https://www.twilio.com/console/dev-tools/api-keys) page in the Console.                                                                                                                                                              |
| TWILIO\_API\_SECRET        | The API Secret will only be shown once when you generate an API Key and Secret pair, so be sure to download it.                                                                                                                                                                                                                                                                        |
| VERIFICATION\_SERVICE\_SID | This project uses Twilio Verify to send verification codes and to check their status. You will need to [create a verification service in the console](https://www.twilio.com/console/verify/services), and then put the service id into your .env file.                                                                                                                                |
| APP\_HASH                  | The Android app hash is very important, as the existence of this hash in the SMS Message is what the SMS Retriever API will look for. See Google's documentation on how to [Compute your app's hash string](https://developers.google.com/identity/sms-retriever/verify#computing_your_apps_hash_string). You can also find it under the Settings menu item in the sample application. |
| CLIENT\_SECRET             | Matches the Android application to the server - you can set this in the `sensitive.xml` file in the sample Android application. It must match the server's config value.                                                                                                                                                                                                               |
| COUNTRY\_CODE              | Twilio Verify requires E.164 formatted phone numbers. This project uses Twilio Lookup to convert phone numbers into the expected format, based on the country for the phone number (Example: US). Find your [ISO country codes here](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)                                                               |

## Running the Server

### Node.js \[#node-js-2]

Run the application using the `npm start` command.

```bash
npm start
```

Your application should be running at `http://localhost:3000`

### Ruby \[#ruby-2]

Run the server with the following command:

`bundle exec rackup`

Your application should be running at `http://localhost:3000`

## Creating a publicly accessible URL

Your phone won't be able to access localhost directly. You'll need to create a publicly accessible URL using a tool like [ngrok](https://ngrok.com/) to send HTTP/HTTPS traffic to a server running on your localhost. Use HTTPS to make web connections that retrieve a Twilio access token.

```bash
ngrok http 3000
```

Another alternative is to deploy this server to the cloud (such as Google App Engine) - you will need to configure the environment variables used above for your cloud provider.

### Integrating the SMS Retriever API into your Android Application

You'll also probably need to integrate the SMS Retriever API into your existing Android application, either by replacing your existing verification process, or adding it as a new step. Check out Google's guide for how to [Request SMS Verification in an Android App](https://developers.google.com/identity/sms-retriever/request).

## Android App Configuration

The [sample Android application](https://github.com/googlesamples/android-credentials/tree/master/sms-verification/android) also needs to be configured to communicate with your server. Make sure you have an externally accessible URL for your application first (not localhost). If you need to create an external URL for your server application running on your local computer, download and install [ngrok](https://ngrok.com/).

Go ahead and open up the application in Android Studio, and then create a `sensitive.xml` file in the `res/values` folder.

In the `sensitive.xml` file, add these values - you will need to replace **your-server.com** in the below code snippet with your server's domain name or IP address.

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="server_client_secret">0000000000</string>
    <string name="server_client_secret_v8">0000000000</string>
    <string name="url_verify">https://your-server.com/api/verify</string>
    <string name="url_request">https://your-server.com/api/request</string>
    <string name="url_reset">https://your-server.com/api/reset</string>
</resources>
```

You will also need to find and edit the server client secret lines in the `sensitive.xml` file. Make the secret the same string that you configured on the server.

Although you configure a reset URL for the sample Android application, Twilio Verify does not have a reset feature. The endpoint is there in our sample Node.js or Ruby application, but it does not do anything. After a successful verification with Verify, you can ask for another verification for the same phone number, so you do not need to reset for testing.

## Running the Android App

Once you've got everything all set up, build the app on Android Studio, and run it on your phone!

Double check that the App Hash (In the menu, under Settings) matches the value you have in the `.env` file for your server - if it's different, go ahead and change it in `.env` and restart the server.

Press the Sign Up button at the bottom of the app to get started with the verification process. On the next screen, when you tap the edit text input for the phone number, the Android app will use the hint picker to detect your phone's number, and then offer to fill that in for you.

![Two screens of SMS Verify app showing unverified status and phone number sign-up.](https://docs-resources.prod.twilio.com/a353b1f86f203df718b7e573c3e34697749d8fb2985d394f3f6f9029b926d157.png)

After pressing the Submit button, the app will make an `HTTP POST` request to the server, and you will see a progress indicator and several toasts indicating the status of your application. If the app fails to connect, double check that the URLs in the strings.xml file in your Android app are correct.

![Two Android screens showing SMS verification process with submit and sign-up buttons.](https://docs-resources.prod.twilio.com/e6df821f22f80d7c8879d63ee04f3329055e99aebf95d222e7aab280e755cbee.png)

## Communication Between App and Server

The Android application sends an `HTTP POST` to the server with an application secret (that the app and the server both share) and a phone number to verify.

The server then sends the phone number to Twilio Lookup, to return an E.164 formatted phone number - for instance, turning 555-555-1212 to +15555551212.

After getting a formatted phone number, the server uses the Twilio REST API to tell Twilio Verify to send a verification request to that number, with the Android app hash you provided in the .env file.

The app hash is required so that the Android SMS Retriever API can look up SMS messages specifically for that application. If you specify the app hash, Twilio Verify includes the SMS Retriever API-specific header at the beginning of the SMS:

`<#>`

Twilio Verify also takes care of appending the app hash to the end of the SMS message.

### Sample SMS message

```bash
<#>Your Android Verification Service verification code is: 885919
K4J3FRDUbDB
```

## Common Problems and Debugging

### SMS Verification on the Android Device Never Completes

One of the most common errors you might run into is that the hash of your Android application's package signature doesn't match the app hash that you send in your SMS message. If these two don't match, the Android application will not be able to read the incoming SMS from your inbox, and the verification process will never complete.

Double check that App signature has for the Android app matches the hash you set in the configuration variable for the server.

### SMS Message doesn't come through

Another common type of error would be that the SMS message does not come through - it never gets sent to your phone. This usually indicates that some of the configuration values in the `.env` file for your server are not set up correctly. Be sure to check the console logs for your server application to see if there are any runtime errors. You can also check the [Twilio Debugger](/console/dev-tools/debugger) to see if there are any errors.

## Next Steps

You've got everything up and running, your Android app is now verifying its phone number via Twilio Verify, and it all works together - what's next?

### Application Integration

You probably need to integrate this Twilio verification code into your existing application, with one of the Twilio [SDKs](/docs/libraries).

### Twilio Verify Quickstarts

If you want to work more with Twilio Verify, try one of the [Twilio Verify Quickstarts](/docs/verify/quickstarts). You could use these with users that register through your website, instead of the Android app.
