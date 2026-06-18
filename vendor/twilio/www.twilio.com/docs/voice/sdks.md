# Voice SDKs

> \[!WARNING]
>
> The Twilio Voice Client SDK has been renamed to Twilio Voice JavaScript SDK as of version 2.0.

The Programmable Voice SDKs allow you to add [voice-over-IP (VoIP)](/docs/glossary/what-is-voip) calling directly into your web and native mobile applications.

Twilio provides four Voice SDKs:

* [Voice JavaScript SDK](/docs/voice/sdks/javascript), which allows users to make and receive VoIP calls in a web browser or an Electron app
* [Voice iOS SDK](/docs/voice/sdks/ios), which allows users to make and receive VoIP calls on iOS devices
* [Voice Android SDK](/docs/voice/sdks/android), which allows users to make and receive VoIP calls on Android devices
* [Voice React Native SDK](/docs/voice/sdks/react-native), which allows users to make and receive VoIP calls on Android or iOS devices

## Quickstarts

Once you've decided on your platform, explore what Programmable Voice can do using one of Twilio's quickstarts:

* [Android SDK Quickstart](/docs/voice/sdks/android/get-started)
* [iOS SDK Quickstart](/docs/voice/sdks/ios/get-started)
* [JavaScript SDK Quickstart](/docs/voice/sdks/javascript/get-started)

## Build a Voice SDK application

Building an application with a Voice SDK requires the use of several Twilio resources. This section explains what these resources are and how they work together with your application to enable VoIP Voice calling in your browser, Electron app, or iOS or Android devices. This is not a how-to guide, but rather a general overview.

While the Voice SDKs are used to power *client-side* applications that the end user will see, you will still need to use some *server-side* code. The server side will work in tandem with Twilio to enable and manage calls to/from your client-side application.

Each Voice SDK has its own documentation on how to use the SDK on the client side. Click on an SDK below to view its client-side documentation.

* [Voice Android SDK](/docs/voice/sdks/android)
* [Voice iOS SDK](/docs/voice/sdks/ios)
* [Voice JavaScript SDK](/docs/voice/sdks/javascript)
* [Voice React Native SDK](/docs/voice/sdks/react-native)

The rest of this page explains how your server-side application communicates with Twilio and the Voice SDKs.

### Requirements

Building an application with any of the Voice SDKs requires:

* A Twilio Account
* One or more Twilio [Phone Numbers](/docs/phone-numbers)
* An endpoint that can handle and respond to HTTP requests from Twilio

  * Some requests from Twilio (such as those sent when your Twilio phone number receives an incoming call) will require [Voice TwiML](/docs/voice/twiml) instructions to be sent in response.
  * Other requests, like status callbacks, provide your server-side application with information related to calls, recordings, etc. For these requests, Twilio only expects a successful HTTP status code in response.
* [AccessTokens](/docs/iam/access-tokens#create-an-access-token-for-voice), which contain:

  * A [TwiML App](/docs/usage/api/applications) SID
  * Your Twilio Account SID
  * An [API Key](/docs/iam/api-keys/key-resource-v2010) SID and Secret
* One of the Voice SDKs
* An [SDK](/docs/libraries) to generate AccessTokens and TwiML (depending on your use case)

### AccessTokens

[AccessTokens](/docs/iam/access-tokens#create-an-access-token-for-voice) serve as the credentials for your end users, and are the key piece that connects your SDK-powered application, Twilio, and your server-side application.

AccessTokens are JSON Web Tokens ([JWTs](https://jwt.io/)) that your application can create using an [SDK](/docs/libraries). An AccessToken contains information that Twilio needs to ensure that:

* The calls to/from the Voice SDK are associated with the correct Twilio account
* Incoming calls are enabled or disabled
* The identity of the end user of the Voice SDK is known to Twilio
* Outbound calls from your Voice SDK application are handled by Twilio using the proper TwiML instructions
* The AccessTokens will expire at the proper time

Since they contain so much necessary information, AccessTokens are the first things you should check when your Voice SDK application encounters an error. You can decode an AccessToken at [JWT.io](https://jwt.io/).

A decoded, properly-formed AccessToken payload for a Voice SDK end user is shown below.

```json
{
  "jti": "SK835c7c8ac38c0617205f41fd71d4bb38-1643132114",
  "grants": {
    "identity": "SalesDepartment",
    "voice": {
      "incoming": {
        "allow": true
      },
      "outgoing": {
        "application_sid": "APe4c9832e936010a33e130a8b3333db71"
      }
    }
  },
  "iat": 1643132114,
  "exp": 1643135714,
  "iss": "SK835c7c8ac38c0617205f41fd71d4bb38",
  "sub": "ACd29d942e419c9bdafbc55a27b1da79b1"
}

```

The `grants.identity` property contains the identity of the SDK end-user. To connect a call to this particular SDK user, you use this identity between [\<Client>](/docs/voice/twiml/client)'s opening and closing tags.

The `grants.voice.incoming.allow` property is set to `true`, which allows the SDK end-user to receive calls.

The `grants.voice.outgoing.application_sid` property contains the SID for your TwiML App (see TwiML Apps section below for more information).

A typical Voice SDK use case handles AccessToken generation within the server-side application. The following example scenario illustrates one way this could work in your application:

1. Your server-side application has an endpoint at `http://www.example.com/token`.
2. Your client-side application sends a `GET` request to your `http://www.example.com/token` endpoint to retrieve an AccessToken.
3. Your server-side application receives the `GET` request. Using an [SDK](/docs/libraries), your application creates an AccessToken and sends it in the response to the `GET` request from your client-side application.
4. Your client-side application receives the AccessToken.

See the [AccessTokens documentation](/docs/iam/access-tokens#create-an-access-token-for-voice) for more information. The [Voice SDK quickstart applications](/docs/voice/sdks) also have examples of `/token` endpoints that generate AccessTokens.

### TwiML Apps

The AccessToken's `grants.voice.outgoing.application_sid` property contains the SID for a [TwiML App](/docs/usage/api/applications). A TwiML App is a Twilio Resource which holds Voice and Messaging configuration URLs. You'll only use the Voice Configuration URLs for your Voice SDK application.

You can create and configure TwiML Apps through the API or in the Twilio Console. For details, see [TwiML Applications](/docs/usage/api/applications).

The **Voice Request URL** (also called the Voice URL) is where Twilio will send an `HTTP POST` request when Twilio needs some Voice TwiML instructions for how to handle a Call. The Voice URL could point to a TwiML Bin, an endpoint on a web server, a Studio Flow, a Twilio Function, etc.

The **Voice Fallback URL** should be an endpoint that can respond with Voice TwiML. If a request to the Voice URL fails for any reason (400-level or 500-level status codes, for example), the Voice Fallback URL will be attempted. Typically, this endpoint should respond with some Voice TwiML such as:

```xml
<Response>
  <Say>We're sorry. An error has occurred. Please try your call again.</Say>
  <Hangup/>
</Response>
```

The **Voice Status Callback URL** is the URL where Twilio will send `HTTP POST` requests that provide updates on activity related to the TwiML App.

With Voice SDK calls, the Voice Status Callback URL will receive a request when the parent leg of the call has ended. The "parent leg" is the leg of the call that triggered a request to the TwiML App's Voice URL. All outgoing calls from the Voice SDK will trigger a request to the TwiML App's Voice URL. Incoming calls that are handled with the same TwiML App will also trigger a request to the TwiML App's Voice URL.

The endpoint at the Voice Status Callback URL should respond to Twilio with a 200 HTTP status code, which lets Twilio know the request was received successfully. Twilio will send a warning to your Debugger if Twilio's request receives a non-successful status code.

### Configure call handling

#### Outbound call handling

Outbound calls from a Voice SDK application must be handled through a TwiML App's Voice URL, which is why a user's AccessToken contains the SID for a TwiML App. Any time an outbound call is initiated from the end user's application, Twilio will send an HTTP request to that TwiML App's Voice URL and expect TwiML instructions in the response.

If you want to use an HTTP server to respond to these requests, you can use an [SDK](/docs/libraries) to help you to programmatically generate valid TwiML.

#### Inbound call handling

If a Voice SDK application handles inbound and outbound calls with the same TwiML App, the TwiML returned by that TwiML App's Voice URL could be identical for both call directions, or there could be some logic that dynamically creates TwiML based on the Call's information. The latter strategy is used in the Voice SDK Quickstarts.

While outbound calls from the Voice SDK must be handled by a TwiML App, inbound calls are **not required** to be associated with a TwiML App. You could instead use a TwiML Bin, a Twilio Function, a web server, etc., to provide the TwiML needed for inbound calls. In these cases, you would need to configure your Twilio Phone Numbers' Voice configuration with another endpoint that serves TwiML (rather than the TwiML App that must be used for outbound call handling).

In order to connect a caller to a Voice SDK user, you must provide Twilio with \<Dial>[\<Client>](/docs/voice/twiml/client) TwiML instructions that includes the Voice SDK user's `identity`.

```xml
<Response>
  <Dial>
    <Client>SalesDepartment</Client>
  </Dial>
</Response>
```

## Call legs with Voice SDK calls

> \[!NOTE]
>
> This section refers to "calls" and "Calls". The capitalized word "Call" refers to a Twilio [Call Resource](/docs/voice/api/call-resource).

In general, each phone call associated with the Voice SDK involves two call legs. Twilio creates a Call Resource for each leg. The leg that is created first is the "parent" Call and the second leg that is created by [\<Dial>](/docs/voice/twiml/dial) is the "child" Call.

### Incoming calls to the Voice SDK

Consider the following scenario of a call from the PSTN (i.e. a cell phone) to an SDK end user:

1. A caller with a phone number of +15555552222 dials your Twilio Phone Number, +15555558888.
2. Your Twilio Phone Number is configured with the following TwiML instructions:

   ```xml
   <Dial>
     <Client>SalesAgent1</Client>
   </Dial>
   ```

For an **incoming** call to the SDK, the **parent Call** is the call leg that connects the caller to your Twilio Phone Number. The parent Call log for the scenario above would contain the following information:

* Direction: Incoming
* From: +15555552222
* To: +15555558888
* Call Type: Phone

For an incoming call to the SDK, the **child Call** is the leg that connects the caller to your SDK end user. The child Call log for the scenario above would contain the following information:

* Direction: Outgoing Dial
* From: +15555552222
* To: client:SalesAgent1
* Call Type: Client

Note that Calls created by \<Dial> instructions have a Direction of "Outgoing Dial". It is outgoing from the perspective of Twilio's services.

> \[!NOTE]
>
> The Voice SDK call object's Call SID for an **incoming call** is the **child Call SID**.

If you use a `statusCallback` URL in your [\<Client>](/docs/voice/twiml/client#attributes-status-callback) TwiML, the parent Call SID appears in the `ParentCallSID` property and the child Call SID appears in the `CallSid` property in Twilio's status callback requests.

**Note:** If the status callback request from Twilio doesn't contain a `ParentCallSid` property, this means that Twilio hasn't yet created the child Call, and the `CallSid` refers to the parent Call. Keep this in mind if you are using the same statusCallback endpoint for incoming and outgoing calls from the Voice SDK.

### Outgoing calls from the Voice SDK

Consider the following scenario of a call from an SDK end user to the PSTN:

1. Your SDK end user (SalesAgent1) initiates an outbound call from the SDK.
2. Twilio makes a request to the TwiML App's Voice URL and receives the following TwiML instructions:

   ```xml
   <Dial callerId="+15555558888">
     <Number>+15552229999</Number>
   </Dial> 
   ```
3. Twilio executes the dial instructions and connects the SDK end user (SalesAgent1) to +15552229999.

For an **outgoing** call from the SDK, the **parent Call** is the call leg that connects your SDK end user to Twilio. The parent Call log for the scenario above would contain the following information:

* Direction: Incoming
* From: client:SalesAgent1
* To:
* Call Type: Client

Note that there is no **To** value for this Call, and the **Direction** is **incoming**. This is because the call is incoming to Twilio from the SDK end user. At the moment this Call was created, Twilio had not yet retrieved TwiML instructions from the TwiML App's Voice URL.

On the parent Call's **Call Details** page in the Console, there is a **Child Calls** heading. Under the heading is the child Call that Twilio created when it encountered the \<Dial>\<Number> instructions.

> \[!NOTE]
>
> The Voice SDK call object's Call SID for an **outgoing call** is the **parent Call SID**.

If you use a `statusCallback` URL in your [\<Number>](/docs/voice/twiml/number#attributes-status-callback) or [\<Client>](/docs/voice/twiml/client#attributes-status-callback) TwiML for outgoing calls, the Parent call SID appears in the `ParentCallSID` property and the child Call SID appears in the `CallSid` property in Twilio's status callback requests.

**Note:** If the status callback request doesn't contain a `ParentCallSid` property, this means that Twilio hasn't yet created the Child Call, and the `CallSid` refers to the parent call. Keep this in mind if you are using the same statusCallback endpoint for incoming and outgoing calls from the Voice SDK.

For outgoing calls from the SDK, the **child Call** is the leg that connects your SDK end user to the recipient. The child Call log for the scenario above would contain the following information:

* Direction: Outgoing Dial
* From: +15555558888
* To: +15552229999
* Call Type: Client

Note that the **From** value is the `callerId` from the \<Dial>\<Number> instructions.
