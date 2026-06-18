# Flex on Citrix VDI

## Overview

Flex on Citrix VDI gives customers using Virtual Desktop Infrastructure (VDI) environments the ability to run Flex.

Flex UI 2.5.0 and later improves audio quality by supporting [Citrix HDX](https://www.citrix.com/solutions/vdi-and-daas/hdx/what-is-hdx.html) WebRTC devices. When a voice call initiates, signaling occurs between the agent's browser/Citrix Workspace App and the Twilio Voice JS SDK. The call connects directly from the agent's machine to [Twilio Programmable Voice](/docs/voice).

#### Technical diagrams of Flex on Citrix VDI architecture

#### Solution with Flex on Citrix VDI

![Flowchart of Citrix VDI architecture with Twilio integration for call handling.](https://docs-resources.prod.twilio.com/0ac8115e1e4a99286823793df2ff44cb3bf48122bae22ac1042ed6710b687d7f.webp)

#### Voice flow with Citrix VDI and Standard Voice SDK

![Voice flow diagram showing steps from end customer to TaskRouter via Citrix Cloud and Twilio services.](https://docs-resources.prod.twilio.com/2f8421a59c3a7edb54b38cc75efe4a6891571a2198d7863ce7f9258fee31bc2e.webp)

> \[!NOTE]
>
> Flex on Citrix VDI applies only to voice calls.

## System requirements

The following are system requirements for the Citrix server and remote device.

### Citrix server

* Citrix VDI version that supports Citrix HDX 2.0.3 and above
* Flex UI version 2.5.0 or later (Flex-hosted or self-hosted)
* The system that [VDI is running on must support Citrix HDX](https://docs.citrix.com/en-us/hdx-optimization/2-9-ltsr/system-requirements.html)
* Server operating system:

  * Windows 10 or later
* Up-to-date version of [Google Chrome Enterprise browser](https://chromeenterprise.google/browser/download/#windows-tab) or [Microsoft Edge](https://www.microsoft.com/en-us/edge/download?form=MA13FJ) with the ability to [enforce policies](#set-up-the-citrix-vdi-environment)

### Remote device

* One of the following operating systems:

  * Windows 10 or later
  * macOS
  * ChromeOS 122.0.6261.137 or later
* The latest version of one of the following browsers:

  * Google Chrome
  * Microsoft Edge

## Set up Flex on Citrix VDI

To set up Flex on Citrix VDI, complete the following steps:

1. [Set up the Citrix VDI environment](#set-up-the-citrix-vdi-environment)
2. [Turn on the Flex on Citrix VDI feature flag](#turn-on-the-flex-on-citrix-vdi-feature-flag)
3. [Open ports on the Citrix machine](#firewall-rules)
4. [Self-hosted Flex only: Upgrade the Flex-UI library](#self-hosted-flex-only-upgrade-the-flex-ui-library)
5. [Validate the Citrix setup](#validate-the-citrix-setup)

## Set up the Citrix VDI environment

Changes to the Citrix VDI environment require a user with Administrative privileges.

> \[!NOTE]
>
> If you are unable to change the registry value or are facing permission issues, contact your Citrix administrator.

By default, Citrix HDX isn't turned on for Chrome. Complete the following steps to allow the Chrome browser to access the underlying Citrix HDX framework:

1. Add the application binary name to the allowlist in [**Windows Registry Editor**](https://support.microsoft.com/en-us/windows/how-to-open-registry-editor-in-windows-10-deab38e6-91d6-e0aa-4b7c-8878d9e07b11):

* Key path: `HKLM\Software\WOW6432Node\Citrix\WebSocketService`
* Key name: `ProcessWhitelist`
* Key type: `MULTISZ`
* Key value: Enter the appropriate value for the web browsers that you use to access Flex:
  * Google Chrome and Microsoft Edge: `chrome.exe msedge.exe`
  * Google Chrome only: `chrome.exe`
  * Microsoft Edge only: `msedge.exe`

2. Restart **CtxHdxWebSocketService** to turn on Citrix HDX support for Chrome. To do this, open Task Manager, right-click **CtxHdxWebSocketService**, and select **Restart**.
3. (Optional) Some versions of Citrix have issues with HDX content redirection with Chrome browser 105 and later. As a workaround, turn off the **Chrome Browser Chrome Root Store** certificate verifier on VDI using one of the methods specified on [the Citrix support page](https://support.citrix.com/article/CTX473065/hdx-browser-content-redirection-broken-with-google-chrome-browser-version-105-or-higher).\
   You can verify that you've turned off the **Chrome Browser Chrome Root Store** certificate by following the steps in the [Chrome Root Store and Certificate Verifier](https://chromium.googlesource.com/chromium/src/+/main/net/data/ssl/chrome_root_store/testing.md).\
   The issue is fixed on the following Citrix versions:

   * Versions after CVAD 2212
   * CVAD 1912 CU7
   * CVAD 2203 CU2

## Turn on the Flex on Citrix VDI feature flag

To use Flex on Citrix VDI, you must turn on this feature:

1. From Twilio Console, navigate to the [**Opt-in features**](https://console.twilio.com/us1/develop/flex/settings/features) page.
2. On the **General Availability (GA)** tab, turn on **Voice on Citrix VDI**.

## Firewall rules

Open the following ports on the Citrix machine:

| **Protocol** | **Port**     | **Reason**                                                                                                                           |
| ------------ | ------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| TCP,UDP      | 1494         | Access to applications and virtual desktops by ICA/HDX. EDT protocol requires port 1494 to be open for UDP.                          |
| TCP,UDP      | 2598         | Access to applications and virtual desktops by ICA/HDX with Session Reliability. EDT protocol requires port 2598 to be open for UDP. |
| TCP,UDP      | 443          | Access to applications and virtual desktops by ICA/HDX over TLS/DTLS.                                                                |
| UDP          | 16500..16509 | ICA/HDX audio over UDP Real-time Transport.                                                                                          |

## Self-hosted Flex only: Upgrade the Flex UI library

Upgrade the Flex library to a version that supports Citrix VDI:

### Upgrade the flex-ui v1 library to the latest version

1. Download the latest version from the [NPM registry](https://www.npmjs.com/package/@twilio/flex-ui).
2. Run the following command in your Flex project:

```bash
npm install flex-ui@2.5.0
```

### Upgrade the @twilio/voice-sdk

If you are using [@twilio/voice-sdk](https://www.npmjs.com/package/@twilio/voice-sdk), upgrade to version 2.5 or later for support with the Citrix HDX-compatible webRTC APIs.

```bash
npm install @twilio/voice-sdk@2.5
```

## Validate the Citrix setup

Follow these steps to validate your setup and ensure that Flex will automatically detect if you're running in a VDI environment:

1. Log in to your VDI environment.
2. Open the Chrome browser within the VDI environment.
3. Open Flex and log in to your Flex instance.
4. Open the Chrome [developer tools](https://developer.chrome.com/docs/devtools/open/) and switch to the **Console** tab in the developer tools.
5. Wait until the log messages slow down in the console.
6. Paste the following code snippet into the console, then click **Enter**.

```javascript
const citrixSocket = new WebSocket("wss://127.0.0.1:9002");
citrixSocket.onopen = (event) => {
  citrixSocket.send(
    JSON.stringify({
      v: "webrtc",
      hdr: {
        version: 1,
        msg_type: "req",
        modifier: false,
        destroy: false,
        proc: { iid: 0, methodid: 2 }
      },
      objref: { oid: 0 },
      params: [[]]
    })
  );
};
citrixSocket.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  if ( msg.command === "feature-support" ) {
    console.log("Success : We are in Citrix with webrtc support");
    alert("Success : We are in Citrix with webrtc support");
    citrixSocket.close();
  }
};
citrixSocket.onclose = ()=> console.log("Socket successfully closed")
citrixSocket.onerror = ()=> {
    console.log("Failure : Error opening socket");
    alert("Failure : Error opening socket");
}

```

![Alert message confirming Citrix with WebRTC support and console code snippet.](https://docs-resources.prod.twilio.com/7aaea1c3728fa1ff9a1b496ceff472c36a77a99e39b4feab411f94d03167b625.png)

7. A pop-up message appears in the browser with one of the following messages:
   * **Success: We are in Citrix with webrtc support**
     * This message means that Flex can detect your Citrix environment.
   * **Failure: Error opening socket**
     * This message means Flex is unable to connect to the Citrix HDX package. This problem can be caused by any of the following issues:
       * The steps in the "Set up the Citrix VDI environment" section above were not completed successfully.
       * The Citrix HDX package is not present on your system.
       * The Citrix HDX version on your system is not compatible.

Check your configurations and ensure that your environment meets the system requirements, then try again. If you still run into issues, contact Twilio support.

## Twilio Voice JavaScript SDK changes

If you have additional plugins or business logic that use the Twilio Voice JavaScript SDK, you must upgrade them to use the latest Citrix HDX-compatible APIs. To use Citrix HDX, you must update the [voice setup function](/docs/voice/sdks/javascript/twiliodevice). On the audio event of Twilio Voice JavaScript SDK, you need to map the Citrix devices to connection. The following examples demonstrate how to update these calls:

1. The Twilio Voice JavaScript SDK needs three new arguments for the Twilio Voice JavaScriptJS SDK setup function: `RTCPeerConnection`, `getUserMedia`, and `enumerateDevices`.

   ```javascript
   setup(data, {
       ...options,
       ...{
           RTCPeerConnection: window.CitrixWebRTC.CitrixPeerConnection.bind(window.CitrixWebRTC),
           getUserMedia: (...args: any[]) => window.CitrixWebRTC.getUserMedia(...args),
           enumerateDevices: window.CitrixWebRTC.enumerateDevices.bind(window.CitrixWebRTC),
       },
   });

   ```
2. Map the Citrix audio element to the voice connection by specifying the following:

   ```javascript
   connection.on("audio", function(remoteAudio) {
       ....
       window.CitrixWebRTC.mapAudioElement(remoteAudio);
       ....
   })

   ```

## Twilio Voice JS DSCP support

Voice Over Internet Protocol (VoIP) call quality is influenced by environmental factors, such as:

* Firewall configuration
* Network conditions
* Available bandwidth
* Browser version (for webRTC)
* Operating system
* Microphone and speaker hardware

It's important you review our [deployment best practices](https://help.twilio.com/hc/en-us/articles/223133127-Twilio-Voice-JavaScript-SDK-Deployment-Best-Practices) and [connectivity requirements documentation](https://help.twilio.com/hc/en-us/articles/223180888-Twilio-Voice-JavaScript-and-Mobile-SDK-Network-Connectivity-and-Bandwidth-Requirements) before taking your app to production. Browsers that support DSCP are able to tag call media packets sent by the voice client. Your router or network element can then use these tags to prioritize call media packets over other traffic on the network.

> \[!NOTE]
>
> * Your router or network element must be DSCP-compliant.
> * DSCP is only supported by Google Chrome.
> * Citrix VDI supports DSCP used by the Voice SDK.

## Verify that Flex HDX is working correctly

Follow these steps to verify that Flex HDX is working correctly in Chrome:

1. Open a new tab on the machine connected to the Citrix environment.
2. Navigate to **chrome://webrtc-internals/**. The page should look similar to this:

![WebRTC internals showing ICE connection state and stats tables for media and peer connections.](https://docs-resources.prod.twilio.com/3943da441bac2e65642ca1f07fe9b3e2821dce1e9f44116a5c5dfb8fb7bc9914.png)

3. Log in to your Citrix account and open Flex inside Chrome from your Citrix instance.
4. Start a call.
5. The Chrome WebRTC-internals page that you opened in step 1 refreshes with a new tab on the page, representing the call that you started.

## Known issues

* Unable to accept new calls after switching to a different microphone or speaker when running on Citrix environment:
  * Sometimes, there's no audio on calls in a Citrix environment after switching from the microphone or speaker to a different device. This is rare problem and only occurs when there are multiple audio devices. We are working with Citrix to resolve this issue.
* Unable to read volume levels from the front end (Citrix issue):
  * Citrix doesn't support the native APIs that allow the Voice SDK to read volume levels programmatically. This does not impact the end user experience, but causes debugging issues. Twilio always sees logs with the volume level as zero. It isn't possible to tell if there is a "silent" audio issue or not. The Citrix team is actively working on [AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext) support for the UC SDK.

## Log capturing

Capture your Citrix instance logs using one of the following methods:

* [How to collect logs in Receiver for Chrome and Receiver for HTML5](https://support.citrix.com/article/CTX217352/how-to-collect-logs-in-receiver-for-chrome-and-receiver-for-html5)
* [How to collect logs for Citrix Workspace App for Windows](https://support.citrix.com/article/CTX286820/how-to-collect-logs-for-citrix-workspace-app-for-windows)

## Getting support

Citrix and Twilio jointly support the delivery of Flex on Citrix HDX VDI.

If you experience an issue with Flex on Citrix VDI, open a support ticket with the vendor whose product you suspect to be causing the issue. In other words, if the problem seems like a Flex issue, [open a support ticket with Twilio](https://help.twilio.com/hc/). If you suspect it's a Citrix HDX issue, [open a support ticket with Citrix](https://www.citrix.com/support/). You must have an active Citrix license to receive support from Citrix.

When Citrix or Twilio receives the ticket, they will triage the issue and escalate it as appropriate. If they determine that the problem is caused by the other company's product, they will advise you to create a support ticket with the other company.
