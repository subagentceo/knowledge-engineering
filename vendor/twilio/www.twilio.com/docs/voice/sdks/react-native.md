# Voice React Native SDK

Twilio Programmable Voice SDK for React Native allows you to add voice-over-IP (VoIP) calling into your React Native apps. Please check out the following if you are new to Twilio's Programmable Voice or React Native.

* [Programmable Voice](/docs/voice/sdks)
* [React Native](https://reactnative.dev/docs/getting-started)

> \[!NOTE]
>
> For step-by-step instructions to get up and running with the React Native SDK for Programmable Voice, check out the [reference app on github](https://github.com/twilio/twilio-voice-react-native-app).

## How it Works

![Mobile app connects to Twilio, receives and responds to TwiML instructions, initiates VoIP call.](https://docs-resources.prod.twilio.com/6b16b2b231a67bf8d95d730a015703931e20844f626282df8b979eef6ad3ec87.png)

1. You connect to Twilio from your mobile app with the Voice SDK
2. Twilio sends a request to your webhook to get TwiML instructions
3. Your backend responds to Twilio with TwiML instructions
   * For example, you can instruct Twilio to call a number, call a VoIP endpoint, or connect to a conference.
   * E.g. To connect to a phone number, your backend would return \<Dial callerId="+155512345678">\<Number>+155587654321\</Number>\</Dial>
4. Twilio executes your TwiML instructions (e.g. Dials the number in your TwiML instructions)
5. Twilio creates a VoIP connection between your callee and your mobile app

## Authentication and Authorization

Twilio Programmable Voice SDKs use an authentication and authorization mechanism called [Access Tokens](/docs/iam/access-tokens) for providing clients access to your voice applications. Access Tokens govern the client application authentication session with your account in the Twilio cloud. Your application backend should vend an Access Token to clients in order for the client to make or receive calls.

Access Tokens are different from the now deprecated Capability Tokens used in the previous versions of Twilio Client. Using a Capability Token in the Programmable Voice SDK will not work. Access Tokens, just like Capability Tokens before, are [JWT tokens](https://jwt.io/introduction/), but use a new, more flexible format that is consistent across all of the modern Twilio SDKs.

## System Requirements

Under the hood, the Voice React Native SDK utilizes the Android and iOS Twilio Programmable Voice SDKs. Check out the following pages for more details on each platform.

* [Voice Android SDK](/docs/voice/sdks/android)
* [Voice iOS SDK](/docs/voice/sdks/ios)

## Installation

### NPM

The package is available through [npm](https://www.npmjs.com/package/@twilio/voice-react-native-sdk).

```bash
yarn add @twilio/voice-react-native-sdk
```

Using this method, you can import the Voice SDK using ES Module or TypeScript syntax.

```javascript
import { Voice } from '@twilio/voice-react-native-sdk';

// getAccessToken should fetch an AccessToken from your backend
const token = getAccessToken();
const voice = new Voice();

// Allow incoming calls
await voice.register(token);

// Handle incoming calls
voice.on('callInvite', (callInvite) => {
  callInvite.accept();
});

// Make an outgoing call
const call = await voice.connect(token, params);
```

### Github

The Twilio Voice React Native SDK is open source. Check out our [repository](https://github.com/twilio/twilio-voice-react-native) if you want to install from Github or build it locally.

## Management Console

Developer tools and configuration options for [Programmable Voice](https://www.twilio.com/en-us/voice) can be found in the [Programmable Voice Dashboard](https://www.twilio.com/console/voice/dashboard). Use the console to create TwiML apps, update push credentials, view logs, and much more.
