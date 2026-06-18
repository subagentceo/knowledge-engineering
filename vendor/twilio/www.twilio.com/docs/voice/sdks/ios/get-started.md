# Getting Started with the Voice iOS SDK

Want to add VoIP calling to your iOS application?

Start by downloading the **[Voice Quickstart for Swift](https://github.com/twilio/voice-quickstart-swift)** application source code. Prefer working with Objective-C? Follow the quickstart on the **[Voice Quickstart for Objective-C](https://github.com/twilio/voice-quickstart-objc#quickstart)** source code instead.

Next, follow the step-by-step instructions below (for Swift) to get you up and running quickly using Twilio's Programmable Voice SDK.

## Twilio Voice Quickstart for iOS

> Please see our [iOS 13 Migration Guide](https://github.com/twilio/twilio-voice-ios/blob/Releases/iOS-13-Migration-Guide.md) for the latest information on iOS 13.

## Get started with Voice on iOS

* [Quickstart](#quickstart) - Run the swift quickstart app
* [Examples](#examples) - Sample applications

## References

* [Access Tokens](https://github.com/twilio/voice-quickstart-ios/blob/master/Docs/access-tokens.md) - Using access tokens
* [Managing Audio Interruptions](https://github.com/twilio/voice-quickstart-ios/blob/master/Docs/managing-audio-interruptions.md) - Managing audio interruptions
* [Managing Push Credentials](https://github.com/twilio/voice-quickstart-ios/blob/master/Docs/managing-push-credentials.md) - Managing push credentials
* [Managing Regional Push Credentials using Conversations Credential Resource API](https://github.com/twilio/voice-quickstart-ios/blob/master/Docs/push-credentials-via-conversations-api.md) - Create or update push credentials for regional usage
* [Twilio Voice iOS SDK docs](https://twilio.github.io/twilio-voice-ios/docs/latest/) - SDK reference documentation
* [Issues and Support](#issues-and-support) - Filing issues and general support

## Voice iOS SDK Versions

* [Migration Guide from 5.x to 6.x](https://github.com/twilio/voice-quickstart-ios/blob/master/Docs/migration-guide-5.x-6.x.md) - Migrating from 5.x to 6.x
* [Migration Guide from 4.x to 5.x](https://github.com/twilio/twilio-voice-ios/blob/Releases/iOS-13-Migration-Guide.md) - Migrating from 4.x to 5.x
* [4.0 New Features](https://github.com/twilio/voice-quickstart-ios/blob/master/Docs/new-features-4.0.md) - New features in 4.0
* [Migration Guide from 3.x to 4.x](https://github.com/twilio/voice-quickstart-ios/blob/master/Docs/migration-guide-3.x-4.x.md) - Migrating from 3.x to 4.x
* [3.0 New Features](https://github.com/twilio/voice-quickstart-ios/blob/master/Docs/new-features-3.0.md) - New features in 3.0
* [Migration Guide from 2.x to 3.x](https://github.com/twilio/voice-quickstart-ios/blob/master/Docs/migration-guide-2.x-3.x.md) - Migrating from 2.x to 3.x

## Quickstart

To get started with the quickstart application follow these steps. Steps 1-5 will enable the application to make a call. The remaining steps 6-9 will enable the application to receive incoming calls in the form of push notifications using Apple's VoIP Service.

### 1. Install the TwilioVoice framework

**Swift Package Manager**

Twilio Voice is now distributed via Swift Package Manager. To consume Twilio Voice using Swift Package Manager, add the `https://github.com/twilio/twilio-voice-ios` repository as a `Swift Pacakge`.

### 2. Use Twilio CLI to deploy access token and TwiML application to Twilio Serverless

You must have the following installed:

* [Node.js v10+](https://nodejs.org/en/download/)
* NPM v6+ (comes installed with newer Node versions)

Run `npm install` to install all dependencies from NPM.

Install [twilio-cli](/docs/twilio-cli/quickstart) with:

```bash
npm install -g twilio-cli
```

Login to the Twilio CLI. You will be prompted for your Account SID and Auth Token, both of which you can find on the dashboard of your [Twilio console](https://twilio.com/console).

```bash
twilio login
```

Once successfully logged in, an API Key, a secret get created and stored in your keychain as the `twilio-cli` password in `SKxxxx\|secret` format. Please make a note of these values to use them in the `Server/.env` file.

![Twilio CLI application password settings showing fields for name, kind, account, and where, with an option to show password.](https://docs-resources.prod.twilio.com/aa13fb963d60a46de872e2e288e1e40dff0bad9e3c63de68685fcf9105f62fbb.png)

This app requires the [Serverless plug-in](https://github.com/twilio-labs/plugin-serverless). Install the CLI plugin with:

```bash
twilio plugins:install @twilio-labs/plugin-serverless
```

Before deploying, create a `Server/.env` by copying from `Server/.env.example`

```bash
cp Server/.env.example Server/.env
```

Update `Server/.env` with your Account SID, auth token, API Key and secret

```bash
ACCOUNT_SID=ACxxxx
AUTH_TOKEN=xxxxxx
API_KEY_SID=SKxxxx
API_SECRET=xxxxxx
APP_SID=APxxxx (available in step 3)
PUSH_CREDENTIAL_SID=CRxxxx (available in step 6)
```

The `Server` folder contains a basic server component which can be used to vend access tokens or generate TwiML response for making call to a number or another client. The app is deployed to Twilio Serverless with the `serverless` plug-in:

```bash
cd Server
twilio serverless:deploy
```

The server component that's baked into this quickstart is in Node.js. If you'd like to roll your own or better understand the Twilio Voice server side implementations, please see the list of starter projects in the following supported languages below:

* [voice-quickstart-server-java](https://github.com/twilio/voice-quickstart-server-java)
* [voice-quickstart-server-node](https://github.com/twilio/voice-quickstart-server-node)
* [voice-quickstart-server-php](https://github.com/twilio/voice-quickstart-server-php)
* [voice-quickstart-server-python](https://github.com/twilio/voice-quickstart-server-python)

Follow the instructions in the project's README to get the application server up and running locally and accessible via the public Internet.

### 3. Create a TwiML application for the Access Token

Next, we need to create a TwiML application. A TwiML application identifies a public URL for retrieving [TwiML call control instructions](/docs/voice/twiml). When your iOS app makes a call to the Twilio cloud, Twilio will make a webhook request to this URL, your application server will respond with generated TwiML, and Twilio will execute the instructions you've provided.

Use Twilio CLI to create a TwiML app with the `make-call` endpoint you have just deployed (**Note: replace the value of `--voice-url` parameter with your `make-call` endpoint you just deployed to Twilio Serverless**)

```bash
$ twilio api:core:applications:create \
    --friendly-name=my-twiml-app \
    --voice-method=POST \
    --voice-url="https://my-quickstart-dev.twil.io/make-call"
```

You should receive an Application SID that looks like this

```bash
APxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 4. Generate an access token for the quickstart

Install the `token` plug-in

```bash
twilio plugins:install @twilio-labs/plugin-token
```

Use the TwiML App SID you just created to generate an access token

```bash
twilio token:voice --identity=alice --voice-app-sid=APxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Copy the access token string. Your iOS app will use this token to connect to Twilio.

### 5. Run the Swift Quickstart app

Now let's go back to the `VoiceQuickstart.xcworkspace`. Update the placeholder of `accessToken` with access token string you just copied

```swift
import UIKit
import AVFoundation
import PushKit
import CallKit
import TwilioVoice

let accessToken = "PASTE_YOUR_ACCESS_TOKEN_HERE"
let twimlParamTo = "to"

let kCachedDeviceToken = "CachedDeviceToken"

class ViewController: UIViewController {
    ...
}
```

Build and run the app. Leave the text field empty and press the call button to start a call. You will hear the congratulatory message. Support for dialing another client or number is described in steps 8 and 9. Tap "Hang Up" to disconnect.

\`\`

![Twilio logo above a phone interface with options to dial, hang up, mute, or enable speaker.](https://docs-resources.prod.twilio.com/c6f4f74ff9a38d365ab2212569e33060014bdd5dfc4b42b6c42f7a8bfafc7f0c.png)

### 6. Create a Push Credential with your VoIP Service Certificate

The Programmable Voice SDK uses Apple's VoIP Services to let your application know when it is receiving an incoming call. If you want your users to receive incoming calls, you'll need to enable VoIP Services in your application and generate a VoIP Services Certificate.

Go to [Apple Developer portal](https://developer.apple.com/) and generate a VoIP Service Certificate.

Once you have generated the VoIP Services Certificate, you will need to provide the certificate and key to Twilio so that Twilio can send push notifications to your app on your behalf.

Export your VoIP Service Certificate as a `.p12` file from *Keychain Access* and extract the certificate and private key from the `.p12` file using the `openssl` command.

```bash
openssl pkcs12 -in PATH_TO_YOUR_P12 -nokeys -out cert.pem -nodes
openssl x509 -in cert.pem -out cert.pem
openssl pkcs12 -in PATH_TO_YOUR_P12 -nocerts -out key.pem -nodes
openssl rsa -in key.pem -out key.pem
```

Use Twilio CLI to create a Push Credential using the cert and key.

```bash
$ twilio api:chat:v2:credentials:create \
    --type=apn \
    --sandbox \
    --friendly-name="voice-push-credential (sandbox)" \
    --certificate="$(cat PATH_TO_CERT_PEM)" \
    --private-key="$(cat PATH_TO_KEY_PEM)"
```

This will return a Push Credential SID that looks like this

```bash
CRxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

The `--sandbox` option tells Twilio to send the notification requests to the sandbox endpoint of Apple's APNS service. Once the app is ready for distribution or store submission, create a separate Push Credential with a new VoIP Service certificate **without** the `--sandbox` option.

**Note: we strongly recommend using different Twilio accounts (or subaccounts) to separate VoIP push notification requests for development and production apps.**

Now let's generate another access token and add the Push Credential to the Voice Grant.

```bash
$ twilio token:voice \
    --identity=alice \
    --voice-app-sid=APxxxx \
    --push-credential-sid=CRxxxxs
```

### 7. Receive an incoming call

You are now ready to receive incoming calls. Update your app with the access token generated from step 6 and rebuild your app. The `TwilioVoiceSDK.register()` method will register your mobile client with the PushKit device token as well as the access token. Once registered, hit your application server's **/place-call** endpoint: `https://my-quickstart-dev.twil.io/place-call?to=alice`. This will trigger a Twilio REST API request that will make an inbound call to the identity registered on your mobile app. Once your app accepts the call, you should hear a congratulatory message.

Register your mobile client with the PushKit device token:

```swift
    TwilioVoiceSDK.register(accessToken: accessToken, deviceToken: cachedDeviceToken) { error in
        if let error = error {
            NSLog("An error occurred while registering: \(error.localizedDescription)")
        } else {
            NSLog("Successfully registered for VoIP push notifications.")
        }
    }
```

**Note**: Your application must have `voip` enabled in the `UIBackgroundModes` of your app's plist in order to be able to receive push notifications.

\`\`

![Incoming call screen with options to decline or accept, caller labeled as bob through Quickstart Audio.](https://docs-resources.prod.twilio.com/31efbfea17fe76366b7ccfe1914123f18baa8281e33d5bd33d015a4915e01135.png)

### 8. Make client to client call

To make client to client calls, you need the application running on two devices. To run the application on an additional device, make sure you use a different identity in your access token when registering the new device.

Use the text field to specify the identity of the call receiver, then tap the "Call" button to make a call. The TwiML parameters used in `TwilioVoice.connect()` method should match the name used in the server.

\`\`

![Twilio app interface with a red logo, a text input for a client's name, a Hang Up button, and Mute and Speaker toggle switches.](https://docs-resources.prod.twilio.com/57fd9e7e973e703821a708694f03a91216b34890382e3dcd770f670e1f1e1c11.png)

### 9. Make client to PSTN call

To make client to number calls, first get a verified Twilio number to your account via [https://www.twilio.com/console/phone-numbers/verified](https://www.twilio.com/console/phone-numbers/verified). Update your server code and replace the `callerNumber` variable with the verified number. Restart the server so it uses the new value.

\`\`

![Twilio logo with call interface displaying number 14151234567, options to hang up, mute, and speaker.](https://docs-resources.prod.twilio.com/5f5a43aa32aca716cf674c1e66992cf18056cfabaaa34904805c7967aee15871.png)

## Examples

You will also find additional examples that provide more advanced use cases of the Voice SDK:

* [AudioDevice](https://github.com/twilio/voice-quickstart-ios/tree/master/AudioDeviceExample) - Provide your own means to playback and record audio using a custom `TVOAudioDevice` and [CoreAudio](https://developer.apple.com/documentation/coreaudio).
* [Making calls from history](https://github.com/twilio/voice-quickstart-ios/blob/master/Docs/call-from-history.md) - Use the `INStartAudioCallIntent` in the user activity delegate method to start a call from the history.

## Twilio server-side SDKs

To learn more about how to use TwiML and the Programmable Voice Calls API, check out our TwiML quickstarts:

* [TwiML Quickstart for Python](/docs/voice/quickstart/server)
* [TwiML Quickstart for Ruby](/docs/voice/quickstart/server)
* [TwiML Quickstart for PHP](/docs/voice/quickstart/server)
* [TwiML Quickstart for Java](/docs/voice/quickstart/server)
* [TwiML Quickstart for C#](/docs/voice/quickstart/server)

## Issues and Support

Please file any issues you find here on Github: [Voice Swift Quickstart](https://github.com/twilio/voice-quickstart-ios).
Please ensure that you are not sharing any
[Personally Identifiable Information(PII)](/docs/glossary/what-is-personally-identifiable-information-pii)
or sensitive account information (API keys, credentials, etc.) when reporting an issue.

For general inquiries related to the Voice SDK you can [file a support ticket](https://help.twilio.com).

## License

MIT
