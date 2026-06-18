> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# Telnyx SIP trunking

Before following this guide, consider reading the [SIP trunking
guide](/docs/eleven-agents/phone-numbers/sip-trunking) to understand how ElevenLabs supports SIP
trunks.

## Overview

This guide explains how to connect your Telnyx SIP trunks directly to ElevenLabs Agents. This integration allows you to use your existing Telnyx phone numbers and infrastructure while leveraging ElevenLabs' advanced voice AI capabilities.

## How SIP trunking with Telnyx works

SIP trunking establishes a direct connection between your Telnyx telephony infrastructure and the ElevenLabs platform:

1. **Inbound calls**: Calls from your Telnyx SIP trunk are routed to the ElevenLabs platform using our origination URI. You will configure this in your Telnyx account.
2. **Outbound calls**: Calls initiated by ElevenLabs are routed to your Telnyx SIP trunk using your termination URI, enabling your agents to make outgoing calls.
3. **Authentication**: Connection security is maintained through either digest authentication (username/password) or Access Control List (ACL) authentication.
4. **Signaling and Media**: The initial call setup (signaling) uses TCP. Once the call is established, the actual audio data (RTP stream) is transmitted over UDP.

## Requirements

Before setting up the Telnyx SIP trunk integration, ensure you have:

1. An active ElevenLabs account
2. An active Telnyx account
3. At least one phone number purchased or ported into your Telnyx account
4. Administrator access to your Telnyx portal
5. Appropriate firewall settings to allow SIP and RTP traffic

## Creating a SIP trunk using the Telnyx UI

Log in to your Telnyx account at [portal.telnyx.com](https://portal.telnyx.com/).

Navigate to the Numbers section and purchase a phone number that will be used with your ElevenLabs agent.

Go to Voice » [SIP Trunking](https://portal.telnyx.com/#/voice/connections) in the Telnyx portal.

Click on Create SIP Connection and choose FQDN as the connection type, then save.

1. In the Authentication & Routing Configuration section, select Outbound Calls Authentication.
2. In the Authentication Method field, select Credentials and enter a username and password.
3. Select Add FQDN and enter `sip.rtc.elevenlabs.io` into the FQDN field.

1) Select the Inbound tab.
2) In the Destination Number Format field, select `+E.164`.
3) For SIP Transport Protocol, select TCP.
4) In the SIP Region field, select your region.

1. Select the Outbound tab.
2. In the Outbound Voice Profile field, select or create an outbound voice profile.

1) Select the Numbers tab.
2) Assign your purchased phone number to this SIP connection.

After setting up your Telnyx SIP trunk, follow the [SIP trunking
guide](/docs/eleven-agents/phone-numbers/sip-trunking) to complete the configuration in
ElevenLabs.

Telnyx inbound trunks don't use digest authentication, only fill in those credentials for outbound
calls and if your Telnyx trunk requires it.