# Core concepts: Voice

## Overview

Flex leverages the [Twilio JavaScript Voice SDK](/docs/voice/sdks/javascript) to manage calls in the browser using Flex UI. The Twilio client requires an installed web browser that supports [Web Real-Time Communication (WebRTC)](/docs/glossary/what-is-webrtc) and an internet connection. To understand Twilio's requirements for network connectivity, see [Voice Client JS and Mobile SDKs' Network Connectivity Requirement](/docs/voice/sdks/network-connectivity-requirements).

When you create a new Flex project in Twilio Console, Twilio automatically provisions a number that accepts incoming calls and SMS. Flex supports both inbound and outbound voice by default.

A Flex call can have one or more **call legs**, which refers to the connection between a device and Twilio. For example, in a bridged call scenario, a call can have two call legs with Twilio: one leg from customer to Twilio and one from Twilio to an agent. The Call Logs page of your Flex project displays each call leg individually. To find Call Logs in Twilio Console, go to **Monitor** > **Logs** > **Voice** > **[Calls](https://1console.twilio.com/go?to=/account/__account__/us1/logs/voice/calls)**. You can also find them in the [legacy Console](https://console.twilio.com/us1/monitor/logs/calls?frameUrl=%2Fconsole%2Fvoice%2Fcalls%2Flogs%3Fx-target-region%3Dus1).

## Inbound calls

Inbound calls (or incoming calls) are calls made by customers to your contact center. Once connected, an inbound call is routed as an incoming call request to an available agent.

To test the default inbound call experience for Flex:

1. Log in and make yourself [available as an agent](https://flex.twilio.com/agent-desktop).
2. [Place a call to the number that came with your Flex instance](/docs/flex/admin-guide/setup/voice/test#answer-voice-calls-in-flex).

To customize inbound voice, you can [set up a scalable Interactive Voice Response (IVR) system](https://www.twilio.com/en-us/solutions/ivr).

### Interactive Voice Response (IVR) apps

[IVR](/docs/glossary/what-is-ivr) is an automated telephony system that interacts with customers through voice and touch-tone keypad selections ([DTMF tones](/docs/glossary/what-is-dtmf)). It's also commonly known as a phone tree or a phone menu.

You can build IVR systems for your contact center that provide richer call context before routing them to your agents. For example, you can prompt your customers to supply general and account-based information to reduce delays and eliminate the need for call transfers. To get started, see the [Build an IVR visually with Studio](/docs/flex/admin-guide/tutorials/ivr) and [Set up an IVR using Twilio Studio](/docs/flex/admin-guide/tutorials/ivr) tutorials.

## Outbound calls

**Outbound calls** (or outgoing calls) refer to calls made by agents to your customers.

With the [release of the native Dialpad](/docs/flex/admin-guide/setup/voice/dialpad) in Flex UI v1.18.0, agents can initiate outbound calls or transfer an ongoing call to another agent or a supervisor. You can also leverage the **StartOutboundCall** action (provided by the Actions Framework) to implement use cases like [click-to-dial](/docs/flex/developer/voice/dialpad-click-to-dial) and preview dialers. To start using the native Dialpad, follow the steps in [Enabling the Flex Dialpad](/docs/flex/admin-guide/setup/voice/dialpad/enable).

## Transfers (warm and cold)

In a [warm transfer](/docs/flex/end-user-guide/dialpad-use#warm-transfer), the initiating agent consults with the agent receiving the call transfer before the initiating agent wraps up the call on their end. The **Warm Transfer** or **Consult** button appears as a phone icon in Flex UI. To learn more about a warm call transfer flow, see [Call Control Concepts: Warm Transfer](/docs/taskrouter/contact-center-blueprint/call-control-concepts#warm-transfer).

In a cold transfer, the initiating agent doesn't communicate with the receiving agent prior to transferring the call. When an agent [initiates a cold transfer](/docs/flex/end-user-guide/dialpad-use#cold-transfer-to-an-agent-or-queue) (represented as a right arrow icon), the voice task autocompletes for the agent transferring the call. To learn more about a cold call transfer flow, see [Call Control Concepts: Cold Transfer](/docs/taskrouter/contact-center-blueprint/call-control-concepts#cold-call-transfer).

An agent can either transfer the call to another agent, or to a Task Queue (both for warm and cold transfers).

The native Flex Dialpad supports both warm and cold transfers on outbound calls.

## Conferencing

Voice conferencing is where two or more people in different locations use technology like a conference bridge to participate in a voice call. Twilio's Voice Conference lets you manage multi-party calls from 2 to 250 participants. You can use Voice Conferences for standard multi-party audio bridges, inbound contact centers, or for outbound dialers. To learn more about the lifecycle of a conference and how to manage conference participants, see [Voice Conference](/docs/voice/conference).

## Hold

An agent may [place a call on hold](/docs/taskrouter/contact-center-blueprint/call-control-concepts#putting-a-call-on-hold) if they need to review additional details, transfer the call, or consult with a supervisor. When a call is on hold, participants remain connected but can't communicate until the call is taken off hold by someone on the same or another extension on the key phone system. In Flex UI, the **Hold** button appears as a pause icon. To remove a contact from hold, click **Hold** again. On the backend, Flex uses the `hold` property of the Voice API Participant resource to set the hold status of a call participant.

Flex allows you to [change the hold music or record a message for the caller](https://help.twilio.com/hc/en-us/articles/360024055153-Change-the-Hold-Music-with-Twilio-Flex) while a call is on hold. If you're on a paid Flex plan, you can [review your contact center's Average Hold Time](/docs/flex/end-user-guide/insights/metrics/hold-time) and other built-in metrics with Flex Insights.

## Mute and unmute

In the Flex UI, agents can mute or unmute themselves on a call by clicking **Mute** (or the microphone icon). Muting and unmuting affect the [muted property of the Voice API Participant resource](/docs/voice/api/conference-participant-resource).

## Call default limits

* By default, voice tasks or calls are limited to **100** per queue. To change the default value, see [Update the Call Queue Limit for Flex](/docs/taskrouter/twiml-queue-calls#update-the-call-queue-limit-for-flex).
* Calls and conferences have a **four-hour** limit.

## Call Recordings

Recording voice calls is a must-have feature for many contact centers: either for keeping an audit trail for legal reasons, resolving customer complaints, or for supervisors to coach the agents.

The preferred recording mode is **dual-channel recording**, which means that each party's audio is recorded onto a separate track (typically one for the customer and one for the agent). To enable dual-channel recordings using Studio or custom code, see [Enabling Dual-Channel Recordings](/docs/flex/developer/insights/enable-dual-channel-recordings). Currently, this is only available for inbound calls.

In a **single-channel recording**, the audio from all participants is mixed. If single-channel recording is sufficient for your use case, you can turn on call recording on [the **Voice** page](https://console.twilio.com/us1/develop/flex/channels/voice) in Flex Console. Notice that some Flex Insights features aren't available with single-channel recordings (cross-talk analysis, graphical display of audio timeline separated per participant, and more).

## Voice Insights

[Voice Insights](/docs/voice/voice-insights) gives you greater visibility into the data behind your calls. It provides call quality analytics and aggregation tools to view details about calls made within the last 30 days. To review the aggregate dashboard and call summary for your Flex instance, in Twilio Console, go to **Monitor** > **Insights** > **Voice** > **[Calls](https://1console.twilio.com/go?to=/account/__account__/us1/insights/voice/calls)**. You can also open the [legacy Console Voice Insights page](https://console.twilio.com/us1/monitor/insights/voice/calls?q=c3RhcnRkYXRldGltZT03ZA%3D%3D). For high-precision call metrics, event streams, and programmatic access, you need to enable Voice Insights Advanced Features. In Twilio Console, go to **Monitor** > **Insights** > **Voice** > **[Settings](https://1console.twilio.com/go?to=/account/__account__/us1/insights/voice/settings)**. You can also enable them in the [legacy Console](https://console.twilio.com/us1/monitor/insights/voice/settings?frameUrl=%2Fconsole%2Fvoice%2Finsights%2Fsettings%3Fx-target-region%3Dus1). To learn more about advanced features, see [the Voice Insights documentation](/docs/voice/voice-insights/advanced-features).

## Agent-Assisted \<Pay>

[Twilio \<Pay>](/docs/voice/twiml/pay/pay-connectors) enables agents to securely capture caller payment information in a PCI-compliant manner during a voice conversation using the Agent-Assisted \<Pay> API. When leveraging the Agent-Assisted \<Pay> feature within Flex, agents control the payment flow and guide callers by requesting payment information one at a time (for example, payment card number, expiration date, or security code). Agents can continue to converse with callers but won't hear their DTMF input, ensuring the security of the payment information. Once all the payment information is collected, agents complete the \<Pay> session, and Twilio securely transmits the collected information to the payment processor via your configured \<Pay> connector. To get started, see the documentation for the [\<Pay> Connector](/docs/voice/twiml/pay/pay-connectors) and the [Agent-Assisted \<Pay> APIs](/docs/voice/api/payment-resource).

## Media Streams

[Media Streams](/docs/voice/media-streams) gives access to the raw audio stream of your Programmable Voice calls by forking the audio stream in real-time and sending it to a destination of your choosing using WebSockets. This enables use cases like real-time transcriptions, sentiment analysis, voice authentication, and more. Raw audio can also be streamed into Twilio Voice calls from another application, enabling use cases such as conversational IVR or integrations with a regional provider for custom text-to-speech. To learn more, see the [Media Streams overview page](/docs/voice/media-streams).
