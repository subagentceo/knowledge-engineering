> This is a page from the ElevenLabs documentation. For a complete page index, fetch https://elevenlabs.io/docs/llms.txt. For the full documentation in a single file, fetch https://elevenlabs.io/docs/llms-full.txt.

# SIP reference

## Overview

[SIP trunking](/docs/eleven-agents/phone-numbers/sip-trunking) connects your existing telephony infrastructure to ElevenLabs Agents. Configuring it involves protocols, network settings, and audio formats that use specialized terminology.

This page defines those terms in plain language. Use it as a companion reference while reading the SIP trunking guide or troubleshooting a connection.

The terms are grouped into the following categories:

* [Protocols](#protocols) — the standards that carry signaling and audio.
* [Transport and networking](#transport-and-networking) — how packets travel between systems.
* [Infrastructure components](#infrastructure-components) — the systems that handle calls.
* [Call signaling](#call-signaling) — the messages that set up and end a call.
* [Authentication and security](#authentication-and-security) — how connections are verified and encrypted.
* [Audio and codecs](#audio-and-codecs) — how speech is encoded and transmitted.
* [Addressing and routing](#addressing-and-routing) — how calls find their destination.
* [ElevenLabs configuration](#elevenlabs-configuration) — settings specific to the ElevenLabs dashboard.

## Protocols

**SIP (Session Initiation Protocol)**

The signaling protocol that starts, modifies, and ends real-time communication sessions such as voice calls. SIP negotiates who is calling whom and how the audio should be exchanged, but it does not carry the audio itself. It is defined in [RFC 3261](https://datatracker.ietf.org/doc/html/rfc3261).

**SDP (Session Description Protocol)**

A text format carried inside SIP messages that describes the media of a call: which codecs each side supports, the IP addresses and ports for the audio stream, and the encryption parameters. The two endpoints use SDP to agree on a common configuration before audio flows.

**RTP (Real-time Transport Protocol)**

The protocol that carries the actual audio of a call once SIP has set it up. RTP packets travel as a continuous stream and are sensitive to delay and loss, which is why audio quality depends on network conditions.

**SRTP (Secure RTP)**

An encrypted version of RTP. When media encryption is enabled, the audio stream is protected with SRTP so it cannot be intercepted in transit. Both endpoints must support SRTP for encrypted media to work.

**RTCP (RTP Control Protocol)**

A companion protocol to RTP that reports statistics such as packet loss and jitter, allowing endpoints to monitor call quality.

## Transport and networking

**UDP (User Datagram Protocol)**

A fast, connectionless transport that sends packets without guaranteeing delivery or order. RTP audio is carried over UDP because low latency matters more than perfect delivery for live speech.

UDP transport for SIP signaling is experimental at ElevenLabs. Use TCP or TLS for production
traffic, and choose UDP only for testing.

**TCP (Transmission Control Protocol)**

A connection-oriented transport that guarantees ordered, reliable delivery. ElevenLabs supports TCP for SIP signaling on port 5060.

**TLS (Transport Layer Security)**

An encryption layer that runs on top of TCP. TLS transport encrypts SIP signaling so credentials and call metadata cannot be read in transit. ElevenLabs supports TLS for signaling on port 5061.

**MTU (Maximum Transmission Unit)**

The largest packet size, in bytes, that a network link can carry without splitting it into smaller pieces. When a SIP message over UDP exceeds the MTU it may be fragmented or dropped, which can cause call setup failures. SIP signaling sent over TCP or TLS avoids this issue because those transports handle large messages reliably.

**NAT (Network Address Translation)**

A technique routers use to share one public IP address among many devices on a private network. NAT can prevent RTP audio from reaching the correct device, which is a common cause of one-way or missing audio.

**Latency**

The delay between when audio is sent and when it is received. High latency makes conversations feel unnatural because each side waits longer to hear the other.

**Jitter**

Variation in the arrival time of audio packets. High jitter causes choppy or distorted audio even when overall latency is acceptable.

**Packet loss**

The percentage of audio packets that never arrive. Even small amounts of packet loss degrade audio quality because RTP does not retransmit lost packets.

**Port**

A numbered endpoint on an IP address that identifies a specific service. SIP signaling uses port 5060 for TCP and 5061 for TLS; RTP media typically uses a wide range of dynamically assigned ports.

## Infrastructure components

**SBC (Session Border Controller)**

A device or service that sits at the edge of a network to manage and secure SIP traffic. An SBC handles tasks such as protecting against unauthorized access, normalizing SIP messages between systems that implement the protocol differently, and managing NAT traversal. Many SIP trunk providers place an SBC between their network and yours.

**PBX (Private Branch Exchange)**

A private telephone system that routes calls within an organization and connects them to external lines. A SIP-enabled PBX can connect to ElevenLabs over a SIP trunk.

**SIP trunk**

A virtual connection between your telephony system and a voice service that carries multiple simultaneous calls over the internet rather than physical phone lines. A SIP trunk is what links your PBX or provider to ElevenLabs.

## Call signaling

**SIP INVITE**

The SIP message that requests a new call. The INVITE carries the destination identifier and an SDP description of the caller's media capabilities.

**200 OK**

The SIP response that confirms a request succeeded. For an INVITE, the 200 OK includes the answering side's SDP and a `Contact` address identifying the exact server handling the call.

**BYE**

The SIP message that ends an established call. A BYE should be sent to the `Contact` address returned in the 200 OK so it reaches the same server that handled the call.

**Contact header**

A field in a SIP response that identifies the precise server and address for follow-up messages within the same call. ElevenLabs serves SIP traffic from multiple servers behind the shared `sip.rtc.elevenlabs.io` address, so sending later requests, such as a BYE, to that shared address instead of the `Contact` address can cause them to reach a different server.

**Dialog**

The shared state that two endpoints maintain for the duration of a call. If a message such as a BYE reaches a server that has no record of the dialog, the server rejects it.

**Response codes**

Three-digit numbers that indicate the result of a SIP request, similar to HTTP status codes. Codes in the `1xx` range are provisional and report progress: `100` (Trying) confirms the request was received and is being processed, and `180` (Ringing) signals that the destination is being alerted. Final responses report the outcome: `200` (OK) means success, `401` and `407` indicate that authentication is required, and `481` means the server has no matching dialog for the request.

## Authentication and security

**Digest authentication**

An authentication method that verifies a connection using a username and password without sending the password in plain text. ElevenLabs recommends digest authentication because it does not depend on fixed IP addresses.

**ACL (Access Control List)**

An authentication method based on allowlisting trusted IP addresses. With ACL authentication, a system accepts SIP traffic only from approved source addresses. It can be harder to manage when IP addresses change.

**Media encryption**

The protection applied to the RTP audio stream using SRTP. ElevenLabs offers three settings: `Disabled` (no encryption), `Allowed` (encrypts when both sides support it), and `Required` (rejects calls that cannot be encrypted).

**Certificate**

An X.509 digital document that proves a server's identity during a TLS handshake. The side that accepts the connection acts as the TLS server and presents the certificate; the side that opens the connection acts as the TLS client and validates it against a trusted certificate authority, checking the hostname and expiry. The roles differ by call direction:

* **Inbound calls to ElevenLabs**: your system opens the connection, so ElevenLabs acts as the TLS server and presents a certificate for `sip.rtc.elevenlabs.io`, which your system validates.
* **Outbound calls from ElevenLabs**: ElevenLabs opens the connection, so your SIP server or SBC acts as the TLS server and must present a valid, trusted certificate, which ElevenLabs validates.

**Cipher suite**

The set of algorithms a TLS connection uses to exchange keys, encrypt data, and verify integrity. During the handshake the TLS client offers the cipher suites it supports and the TLS server selects one they share. ElevenLabs requires TLS 1.2 or higher. For inbound calls to ElevenLabs, ElevenLabs (as the TLS server) selects the suite; for outbound calls from ElevenLabs, your system (as the TLS server) selects it. Both sides must share at least one modern cipher suite or the handshake fails before the call connects.

## Audio and codecs

**Codec**

An algorithm that compresses audio for transmission and decompresses it on the other end. Both endpoints must support a common codec for a call to have audio.

**G711**

A widely supported, uncompressed codec that carries audio at an 8 kHz sample rate. It is the most compatible choice across telephony systems.

**G722**

A wideband codec that carries audio at a 16 kHz sample rate, offering clearer speech than G711 when both endpoints support it.

**Sample rate**

How many times per second audio is measured, expressed in kilohertz (kHz). ElevenLabs' SIP deployment sends and receives audio as G711 at 8 kHz or G722 at 16 kHz. Systems that use other rates must resample the audio.

**DTMF (Dual-Tone Multi-Frequency)**

The tones produced when pressing keys on a phone keypad, used to navigate automated menus. See [play keypad touch tone](/docs/eleven-agents/customization/tools/system-tools/play-keypad-touch-tone) for how agents send DTMF.

## Addressing and routing

**SIP URI**

The address used to reach a SIP destination, written as `sip:identifier@domain:port`. For example, `sip:+19991234567@sip.rtc.elevenlabs.io:5060` routes a call to the identifier `+19991234567`. The identifier is required so the call can be routed.

**E.164**

The international standard for phone number formatting, consisting of a leading `+`, a country code, and the subscriber number, for example `+15551234567`. The format must match between your SIP URI and your imported phone number.

**NAPTR and SRV records**

DNS record types that let a SIP system discover which servers, transports, and ports to use for a domain. ElevenLabs publishes NAPTR and SRV records for [RFC 3263](https://datatracker.ietf.org/doc/html/rfc3263) compliant server discovery.

## ElevenLabs configuration

**Transport type**

The protocol selected for SIP signaling in the dashboard. ElevenLabs supports `TCP` (port 5060) and `TLS` (port 5061). TLS is recommended for production because it encrypts signaling.

**Inbound configuration**

The settings that control how calls arriving from your SIP trunk reach ElevenLabs, including the transport type and media encryption applied to incoming calls.

**Outbound configuration**

The settings that control how ElevenLabs sends calls to your system, including the `Address` (a hostname or IP address, without the `sip:` prefix) where the SIP INVITE is delivered.

**Custom headers**

Additional `X-` prefixed SIP header fields you can attach to calls for routing, identification, or provider-specific requirements. Inbound custom headers are also exposed as [dynamic variables](/docs/eleven-agents/customization/personalization/dynamic-variables) in the conversation.

**Remote domains**

A phone number setting that lists the domains ElevenLabs accepts when validating your TLS certificate on follow-up connections it initiates (for example a `BYE` or `REFER`). Because ElevenLabs often connects to an IP address taken from the top-most `Via` header rather than a hostname, it cannot match the certificate by hostname alone. If any domain the received certificate is valid for matches a configured remote domain, validation succeeds; otherwise it fails. See [follow-up connections](/docs/eleven-agents/phone-numbers/sip-trunking#follow-up-connections).

**Static IP SIP servers**

An enterprise option that provides SIP endpoints with fixed IP ranges for customers whose security policies require IP allowlisting. See the [SIP trunking guide](/docs/eleven-agents/phone-numbers/sip-trunking) for details.

## Next steps

* [Set up SIP trunking](/docs/eleven-agents/phone-numbers/sip-trunking)
* [Learn about creating ElevenLabs agents](/docs/eleven-agents/quickstart)