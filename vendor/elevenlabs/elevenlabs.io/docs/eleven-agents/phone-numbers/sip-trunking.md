> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# SIP trunking

## Overview

SIP (Session Initiation Protocol) trunking allows you to connect your existing telephony infrastructure directly to ElevenLabs Agents.
This integration enables all customers to use their existing phone systems while leveraging ElevenLabs' advanced voice AI capabilities.

With SIP trunking, you can:

* Connect your Private Branch Exchange (PBX) or SIP-enabled phone system to ElevenLabs' voice AI platform
* Route calls to AI agents without changing your existing phone infrastructure
* Handle both inbound and outbound calls
* Leverage encrypted TLS transport and media encryption for enhanced security

New to SIP? See the [SIP reference](/docs/eleven-agents/phone-numbers/sip-reference) for
plain-language definitions of the terms used throughout this guide, such as SIP, SBC, SDP, RTP,
and MTU.

**Static IP SIP Servers**

ElevenLabs offers SIP servers with static IP addresses for enterprise clients who require IP allowlisting for their security policies.

Our static IP infrastructure uses a /24 IP address block containing 256 addresses distributed across multiple regions (US, EU, India, and Singapore). You must allowlist the entire /24 block in your firewall configuration.

For the default (US/International) environment, use `sip-static.rtc.elevenlabs.io` as your SIP endpoint.
For isolated regions, use `sip-static.rtc.<region>.residency.elevenlabs.io`, where `<region>` is your data residency region code (for example `eu`, `in`, or `sg`). When using these endpoints, all traffic will originate exclusively from within that region. Specific whitelisting per-region is not available. See [data residency](/docs/overview/administration/data-residency) for the list of available regions.

This feature is available for Enterprise accounts and can also be enabled during Enterprise trials for testing purposes. To request access, email Support at [team@elevenlabs.io](mailto:team@elevenlabs.io) or contact your account representative. For more information, [contact sales](https://elevenlabs.io/contact-sales?utm_source=docs\&utm_medium=referral\&utm_campaign=static_ip_sip).

## How SIP trunking works

SIP trunking establishes a direct connection between your telephony infrastructure and the ElevenLabs platform:

1. **Inbound calls**: Calls from your SIP trunk are routed to the ElevenLabs platform using your configured SIP INVITE address.
2. **Outbound calls**: Calls initiated by ElevenLabs are routed to your SIP trunk using your configured hostname, enabling your agents to make outgoing calls.
3. **Authentication**: Connection security for the signaling is maintained through either digest authentication (username/password) or Access Control List (ACL) authentication based on the signaling source IP.
4. **Signaling and Media**: The initial call setup (signaling) supports multiple transport protocols including TLS for encrypted communication. Once the call is established, the actual audio data (RTP stream) can be encrypted based on your media encryption settings.

## Transport security: certificates and cipher suites

When you use TLS transport, both sides perform a TLS handshake before any SIP signaling is exchanged. During the handshake they validate a certificate and negotiate a cipher suite. The side that accepts the connection acts as the TLS server and presents the certificate; the side that opens the connection acts as the TLS client and validates it. ElevenLabs requires TLS 1.2 or higher.

The roles depend on the direction of the call:

* **Inbound calls to ElevenLabs**: Your system opens the connection, so ElevenLabs acts as the TLS server. ElevenLabs presents a valid certificate for `sip.rtc.elevenlabs.io`, and your system validates it as the TLS client.
* **Outbound calls from ElevenLabs**: ElevenLabs opens the connection to the address you configured, so your SIP server or SBC acts as the TLS server. Your system must present a valid, trusted certificate, which ElevenLabs validates as the TLS client.

Ensure both sides trust each other's certificates and share at least one common cipher suite. If they do not, the TLS handshake fails before the call is established. See the [SIP reference](/docs/eleven-agents/phone-numbers/sip-reference#authentication-and-security) for definitions of these terms.

### Follow-up connections

Some in-dialog requests, such as `BYE` or `REFER`, may require a new TLS connection when the original connection has already closed. The certificate behavior for these follow-up connections differs from the initial call setup:

* **Follow-up connections to ElevenLabs**: Your system establishes the connection to the `Contact` header address returned in the response, which resolves to a specific SIP server of the form `<ip>.hosts.rtc.elevenlabs.io`. That server presents a certificate valid for `*.hosts.rtc.elevenlabs.io`, which your system validates as the TLS client.
* **Follow-up connections from ElevenLabs**: When ElevenLabs initiates a TLS connection for a `BYE` or `REFER`, it connects to the address in the top-most `Via` header, which is often an IP address. Your system typically returns a certificate valid for a fully qualified domain name (FQDN) rather than that IP address. To validate this certificate, configure the **Remote domains** field in your phone number settings. If any domain the received certificate is valid for matches a configured remote domain, validation succeeds; otherwise it fails.

If outbound `BYE` or `REFER` requests over TLS fail certificate validation, add the FQDN your SIP
server's certificate is issued for to the **Remote domains** field in the phone number settings.

## Making calls to ElevenLabs SIP trunk

When initiating calls to the ElevenLabs platform, you need to use the proper SIP URI format.

The ElevenLabs SIP trunk URI is:

```
sip:sip.rtc.elevenlabs.io:5060;transport=tcp
```

To make a call, construct a complete SIP URI that includes an identifier:

```
sip:+19991234567@sip.rtc.elevenlabs.io:5060
```

Where:

* `+19991234567` is the identifier (typically a phone number in E.164 format)
* The identifier can also be any string value, such as `1000` or `john`

**Common Mistake**: Do not initiate calls directly to `sip@sip.rtc.elevenlabs.io:5060` without an
identifier. The SIP URI must include a phone number or identifier after the `sip:` prefix and
before the `@` symbol.

**SIP URI Format**: A [SIP URI](https://en.wikipedia.org/wiki/SIP_URI_scheme) follows the format
`sip:identifier@domain:port` where the identifier is required to route the call properly.

## Requirements

Before setting up SIP trunking, ensure you have:

1. A SIP-compatible PBX or telephony system
2. Phone numbers that you want to connect to ElevenLabs
3. Administrator access to your SIP trunk configuration
4. Appropriate firewall settings to allow SIP traffic
5. **TLS Support**: For enhanced security, ensure your SIP trunk provider supports TLS transport
6. **Audio codec compatibility**:
   Your system must support either G711 or G722 audio codecs or be capable of resampling audio on your end. ElevenLabs' SIP deployment outputs and receives audio at this sample rate. This is independent of any audio format configured on the agent for direct websocket connections.

## Setting up SIP trunking

Go to the [Phone Numbers section](https://elevenlabs.io/app/agents/phone-numbers) in the ElevenLabs Agents dashboard.

Click on "Import a phone number from SIP trunk" button to open the configuration dialog.

<img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/4c5f0192265d72a601768a6fa6ce6e11ebd8e115dc58e3b28460f5d0cdb7cabe/assets/images/conversational-ai/sip-trunk-select.png" alt="Select SIP trunk option" />

<img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/1f50bf163dee6de654322e84960d9e2f8c126a08aed6e90eba35692789ba2088/assets/images/conversational-ai/sip-trunk.png" alt="SIP trunk configuration dialog" />

Complete the basic configuration with the following information:

* **Label**: A descriptive name for the phone number
* **Phone Number**: The E.164 formatted phone number to connect (e.g., +15551234567)

<img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/6ea0abfdeeafd24d8e4c480b935eacd25d63896a980b156a1420f362afa22650/assets/images/conversational-ai/sip-trunk-inbound.png" alt="SIP trunk basic configuration" />

Configure the transport protocol and media encryption settings for enhanced security:

* **Transport Type**: Select the transport protocol for SIP signaling:
  * **TCP**: Standard TCP transport
  * **TLS**: Encrypted TLS transport for enhanced security
  * **UDP**: Connectionless transport (experimental; use TCP or TLS for production)
* **Media Encryption**: Configure encryption for RTP media streams:
  * **Disabled**: No media encryption
  * **Allowed**: Permits encrypted media streams
  * **Required**: Enforces encrypted media streams

<img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/bcb8c57349ba49644015853c1ff375e67700c27385034aec2eaf6f4df6fb1385/assets/images/conversational-ai/siptrunktls.png" alt="Select TLS or TCP transport" />

<img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/b8ab8b378bebe2c72ad3ea4fa84829a8d65a595558c95e2f464b47015d98be92/assets/images/conversational-ai/siptrunkmediaencryption.png" alt="Select media encryption setting" />

**Security Best Practice**: Use TLS transport with Required media encryption for maximum security. This ensures both signaling and media are encrypted end-to-end.

Configure where ElevenLabs should send calls for your phone number:

* **Address**: Hostname or IP address where the SIP INVITE is sent (e.g., `sip.telnyx.com`). This should be a hostname or IP address only, not a full SIP URI.
* **Transport Type**: Select the transport protocol for SIP signaling:
  * **TCP**: Standard TCP transport
  * **TLS**: Encrypted TLS transport for enhanced security
  * **UDP**: Connectionless transport (experimental; use TCP or TLS for production)
* **Media Encryption**: Configure encryption for RTP media streams:
  * **Disabled**: No media encryption
  * **Allowed**: Permits encrypted media streams
  * **Required**: Enforces encrypted media streams

<img src="https://files.buildwithfern.com/https://elevenlabs.docs.buildwithfern.com/docs/e544448d70847d436ce6071e384f4edd406d9048d4b8bb9d62e76862e55f2571/assets/images/conversational-ai/sip-outbound.png" alt="SIP trunk outbound configuration" />

**Security Best Practice**: Use TLS transport with Required media encryption for maximum security. This ensures both signaling and media are encrypted end-to-end.

The **Address** field specifies where ElevenLabs will send outbound calls from your AI agents. Enter only the hostname or IP address without the `sip:` protocol prefix.

If your SIP trunk provider requires specific headers for call routing or identification:

* Click "Add Header" to add custom SIP headers
* Enter the header name and value as required by your provider
* You can add multiple headers as needed

Custom headers are included with all outbound calls and can be used for:

* Call routing and identification
* Billing and tracking purposes
* Provider-specific requirements

Provide digest authentication credentials if required by your SIP trunk provider:

* **SIP Trunk Username**: Username for SIP digest authentication
* **SIP Trunk Password**: Password for SIP digest authentication

If left empty, Access Control List (ACL) authentication will be used, which requires you to allowlist ElevenLabs IP addresses in your provider's settings.

**Authentication Methods**:

* **Digest Authentication**: Uses username/password credentials for secure authentication (recommended)
* **ACL Authentication**: Uses IP address allowlisting for access control

**Digest Authentication is strongly recommended** as it provides better security without relying on IP allowlisting, which can be complex to manage with dynamic IP addresses.

Click "Import" to finalize the configuration.

## Client Data and Personalization

To ensure proper forwarding and traceability of call metadata, include the following custom SIP headers in your webhook payload and SIP INVITE request:

* **X-CALL-ID**: Unique identifier for the call
* **X-CALLER-ID**: Identifier for the calling party

These headers enable the system to associate call metadata with the conversation and provide context for personalization.

### Fallback Header Support

If the standard headers above are not present, the system will automatically look for the Twilio-specific SIP header:

* **sip.twilio.callSid**: Twilio's unique call identifier

This fallback ensures compatibility with Twilio's Elastic SIP Trunking without requiring configuration changes.

### Processing Flow

Once the relevant metadata is received through any of the supported headers, the `caller_id` and/or `call_id` are available in the [pre-call webhook](/docs/eleven-agents/customization/personalization/twilio-personalization#how-it-works) and as [system dynamic variables](/docs/eleven-agents/customization/personalization/dynamic-variables#system-dynamic-variables).

### Inbound custom headers as dynamic variables

Custom SIP `X-` headers from inbound SIP trunking calls are automatically exposed as [dynamic variables](/docs/eleven-agents/customization/personalization/dynamic-variables) in the conversation.

Header names are normalized by removing the `X-` prefix, converting the name to lowercase, replacing hyphens with underscores, and adding the `sip_` prefix. For example, `X-Contact-ID` becomes `{{sip_contact_id}}`, and `X-Campaign-ID` becomes `{{sip_campaign_id}}`.

Use these variables in agent prompts, first messages, and tools to personalize the conversation with caller-provided context. The values are also visible in the conversation history under the **Phone Call** tab.

Reserved headers such as `X-Call-ID` and `X-Caller-ID` continue to map to `system__call_sid` and
`system__caller_id`. Custom inbound headers cannot override these system variables.

## Assigning Agents to Phone Numbers

After importing your SIP trunk phone number, you can assign it to a ElevenLabs agent:

1. Go to the Phone Numbers section in the ElevenAgents dashboard
2. Select your imported SIP trunk phone number
3. Click "Assign Agent"
4. Select the agent you want to handle calls to this number

## Troubleshooting

If you're experiencing connection problems:

1. Verify your SIP trunk configuration on both the ElevenLabs side and your provider side
2. Check that your firewall allows SIP signaling traffic on the configured transport protocol and port (5060 for TCP, 5061 for TLS) and ensure there is no whitelisting applied
3. Confirm that your address hostname is correctly formatted and accessible
4. Test with and without digest authentication credentials
5. If using TLS transport, ensure your provider's TLS certificates are valid and properly configured
6. Try different transport types (TCP or TLS; UDP support is experimental) to isolate TLS-specific issues

**Important Network Architecture Information:**

* ElevenLabs serves SIP traffic from multiple SIP servers behind the shared address `sip.rtc.elevenlabs.io`
* These SIP servers communicate directly with your SIP server
* SIP requests may come from different IP addresses due to our distributed infrastructure
* If your security policy requires whitelisting inbound traffic, please contact our support team for assistance.

If calls are failing due to authentication issues:

1. Double-check your SIP trunk username and password if using digest authentication
2. Check your SIP trunk provider's logs for specific authentication error messages
3. Verify that custom headers, if configured, match your provider's requirements
4. Test with simplified configurations (no custom headers) to isolate authentication issues

If you're experiencing issues with TLS transport or media encryption:

1. Verify that your SIP trunk provider supports TLS transport on port 5061
2. Check certificate validity, expiration dates, and trust chains
3. Ensure your provider supports SRTP media encryption if using "Required" media encryption
4. Test with "Allowed" media encryption before using "Required" to isolate encryption issues
5. Try TCP transport to isolate TLS-specific problems (UDP support is experimental)
6. Contact your SIP trunk provider to confirm TLS and SRTP support

If you're having problems with custom headers:

1. Verify the exact header names and values required by your provider
2. Check for case sensitivity in header names
3. Ensure header values don't contain special characters that need escaping
4. Test without custom headers first, then add them incrementally
5. For inbound custom header dynamic variables, confirm the headers use the `X-` prefix and review the **Phone Call** tab in the conversation history
6. Review your provider's documentation for supported custom headers

If the call connects but there's no audio or audio only flows one way:

1. Verify that your firewall allows UDP traffic for the RTP media stream (typically ports 10000-60000)
2. Since RTP uses dynamic IP addresses, ensure firewall rules are not restricted to specific static IPs
3. Check for Network Address Translation (NAT) issues that might be blocking the RTP stream
4. If using "Required" media encryption, ensure both endpoints support SRTP
5. Test with "Disabled" media encryption to isolate encryption-related audio issues

If you experience poor audio quality:

1. Ensure your network has sufficient bandwidth (at least 100 Kbps per call) and low latency/jitter for UDP traffic
2. Check for network congestion or packet loss, particularly on the UDP path
3. Verify codec settings match on both ends
4. If using media encryption, ensure both endpoints efficiently handle SRTP processing
5. Test with different media encryption settings to isolate quality issues

A 481 response on a BYE usually means the request reached a SIP server that does not have the dialog state for the call.
This often happens when the initial TCP connection has already closed and the BYE is re-sent to the generic shared address (for example `sip.rtc.elevenlabs.io`)
rather than the specific `Contact` URI returned in the 200 OK response.

1. When re-establishing a TCP connection for BYE, always target the `Contact` address from the INVITE response so the request reaches the same SIP server that handled the dialog.
2. Avoid sending BYE to the shared `sip.rtc.elevenlabs.io` address because the request can land on a different SIP node, which rejects it with 481.

See <a href="https://datatracker.ietf.org/doc/html/rfc3261#section-8.1.1.8">RFC 3261 Section 8.1.1.8</a> for the normative behavior governing Contact headers and dialog routing.

## Limitations and Considerations

* Support for multiple concurrent calls depends on your subscription tier
* Call recording and analytics features are available but may require additional configuration
* Outbound calling capabilities may be limited by your SIP trunk provider
* **TLS Support**: Ensure your SIP trunk provider supports TLS 1.2 or higher for encrypted transport
* **Media Encryption**: SRTP support varies by provider; verify compatibility before requiring encryption
* **Audio format**: ElevenLabs' SIP deployment outputs and receives audio in G711 8kHz or G722 16kHz audio codecs. This is independent of any audio format configured on the agent for direct websocket connections. Your SIP trunk system must either support this format natively or perform resampling to match your system's requirements

## FAQ

Yes, SIP trunking allows you to connect your existing phone numbers directly to ElevenLabs'
ElevenAgents without porting them.

ElevenLabs is compatible with most standard SIP trunk providers including Twilio, Vonage,
RingCentral, Sinch, Infobip, Telnyx, Exotel, Plivo, Bandwidth, and others that support SIP
protocol standards. TLS transport and SRTP media encryption are supported for enhanced security.

Yes, TLS transport is highly recommended for production environments. It provides encrypted SIP
signaling which enhances security for your calls. Combined with required media encryption, it
ensures comprehensive protection of your communications. Always verify your SIP trunk provider
supports TLS before enabling it.

* **TCP**: Reliable but unencrypted signaling - **TLS**: Encrypted and reliable signaling
  (recommended for production) - **UDP**: Connectionless signaling, currently experimental

UDP transport is experimental and intended for testing only. For production and
security-critical applications, always use TLS transport.

Custom SIP headers allow you to include provider-specific information with outbound calls. Common
uses include call routing, billing codes, caller identification, and meeting specific provider
requirements.

The number of concurrent calls depends on your subscription plan. Enterprise plans typically allow
for higher volumes of concurrent calls.

Yes, you can use your existing PBX system's routing rules to direct calls to different phone
numbers, each connected to different ElevenLabs agents.

Yes, the phone number format must be consistent between your SIP URI and your imported phone
number configuration. If you call the SIP URI with a leading + (e.g.,
`sip:+19991234567@sip.rtc.elevenlabs.io:5060`), you must also import the phone number with the
leading + (e.g., `+19991234567`). Similarly, if you call without the leading +, import the phone
number without it. Mismatched formats will prevent proper call routing.

Yes, ElevenLabs provides NAPTR and SRV records for RFC 3263 compliant SIP server discovery.

## Next steps

* [SIP reference: glossary of SIP and networking terms](/docs/eleven-agents/phone-numbers/sip-reference)
* [Learn about creating ElevenLabs agents](/docs/eleven-agents/quickstart)