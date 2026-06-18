# Voice JavaScript SDK: Twilio in the browser

The Twilio Voice JavaScript SDK allows you to make and receive voice calls with a web browser. This means that you can open inbound and outbound audio connections to Twilio for building softphones, walkie-talkies, conference calls, click-to-talk systems, and more, all from the web.

## Installation

Follow these steps to install the Voice JavaScript SDK:

1. Install the SDK using npm. This command adds the SDK as a dependency to your project:
   ```bash
   npm install @twilio/voice-sdk
   ```
2. Import the SDK to your JavaScript or TypeScript file:
   ```javascript
   import { Device } from '@twilio/voice-sdk';
   ```

## How the Voice JavaScript SDK works

After you configure a device, the SDK establishes a connection to Twilio. Your microphone sends audio to Twilio, and Twilio returns audio that plays through your speakers. In the SDK, [`Twilio.Device`](/docs/voice/sdks/javascript/twiliodevice) represents the virtual device that manages these connections.

![Web app connects to Twilio, Twilio sends webhook to backend, backend responds with TwiML, Twilio initiates call.](https://docs-resources.prod.twilio.com/324b748d5163d7af387fe3417b46bab7cf6d89bcd49fad92fac7eb287a3bf9fd.png)

When you initiate a call using `Twilio.Device`, you don't dial another phone directly. Instead, you connect to Twilio and instruct Twilio to fetch [TwiML](/docs/voice/twiml) from your server to handle the call. Twilio processes the resulting TwiML in the same way that it processes voice traffic from a physical phone.

### TwiML app

Twilio relies on a [TwiML app](/docs/usage/api/applications) in your account to determine how to interact with your server. When your application uses `Twilio.Device` to begin a call, Twilio sends an HTTP request to the application's `VoiceUrl`. You identify the application through the [Access Token](/docs/iam/access-tokens) that you pass to the client. Twilio then executes the TwiML returned by the `VoiceUrl` to control the call.

## Supported browsers

The Voice JavaScript SDK supports the following browsers. Twilio tests the current (N) and the two previous (N-2) major versions.

|              | Chrome | Firefox | Safari | Edge |
| :----------: | :----: | :-----: | :----: | :--: |
|  **Android** |    ✓   |    ✓    |        |      |
|    **iOS**   |    ✓   |    ✓    |    ✓   |      |
|   **Linux**  |    ✓   |    ✓    |        |      |
|   **macOS**  |    ✓   |    ✓    |    ✓   |      |
|  **Windows** |    ✓   |    ✓    |        |   ✓  |
| **ChromeOS** |    ✓   |         |        |      |

> \[!NOTE]
>
> Mobile browsers lack the ability to receive or maintain call connectivity whilst in the background and they do not allow GSM call interruption handling. These lead to poor user experience. To create the best user experience, Twilio recommends understanding these limitations when creating mobile Voice Applications. Twilio also recommends evaluating the [iOS](/docs/voice/sdks/ios) and [Android](/docs/voice/sdks/android) SDKs for creating mobile Voice Applications.

### Electron support

The Voice JavaScript SDK is compatible with the latest release of [Electron](https://electronjs.org/).

## Security and encryption

See the following table to learn more about the encryption protocols used by the Voice JavaScript SDK.

| Channel   | Type                                  |
| --------- | ------------------------------------- |
| Signaling | TLS (Secure WebSocket)                |
| Media     | DTLS-SRTP (`AES_CM_128_HMAC_SHA1_80`) |

## Twilio Regions support

If you install version 2.1 or later of the Voice JavaScript SDK then you can implement Twilio Regions. Learn more by reading [the guide](/docs/global-infrastructure/use-the-programmable-voice-javascript-sdk-with-a-non-us-twilio-region#a-sample-browser-based-voice-application) to using the Voice JavaScript SDK with a non-US Twilio Region.

## Versioning

The Voice JavaScript SDK follows [semantic versioning](https://semver.org/).
