# Use SIP with Twilio Voice

## Before you Begin

Before you can use SIP Interface, you must sign up for a Twilio account (if you don't already have one). To sign up for an account click [here](https://www.twilio.com/try-twilio).

## Overview

Connect your communications infrastructure to Twilio and start building programmable voice applications, such as call centers and IVRs, with Twilio's powerful and flexible voice capabilities. You can connect to Twilio over the public internet or alternatively via a private connection using [Twilio's Interconnect](https://www.twilio.com/en-us/interconnect). Programmable Voice SIP lets you route your voice calls with global reach to any landline phone, mobile phone, browser, mobile app, or any other SIP endpoint.

The following diagram illustrates how the Twilio Cloud can sit in-between your existing infrastructure in call flows, allowing you to build programmable voice applications. Twilio is able to programmatically handle incoming calls from the PSTN and sessions from your SIP communications infrastructure such as a PBX.

![Flowchart showing SIP connection from customer to PBX, then Twilio, using HTTP webhook and TwiML or REST API.](https://docs-resources.prod.twilio.com/c2fd11e3881cd049e83dfd8343a8037339cb886716c1982d312e0611bf4947ef.png)

## What is SIP?

[Session Initiation Protocol (SIP)](/docs/glossary/what-is-session-initiation-protocol-sip) is a standardized communications protocol that has been widely adopted for managing multimedia communication sessions for voice and video calls. SIP may be used to establish connectivity between your communications infrastructures such as an on-premise or virtual PBX and Twilio's communications platform.

### Sending SIP to Twilio

Twilio's Programmable Voice SIP Interface product enables you to use your existing SIP communications infrastructure to initiate SIP sessions with the Twilio Cloud. When Twilio receives SIP traffic, you can configure how calls are handled using Webhooks, Twilio Functions, TwiML Bins, Studio Flows. SIP Interface uses Twilio's [TwiML](/docs/voice/twiml) language and/or Twilio's [REST](/docs/usage/api) APIs to create advanced voice applications. Learn how to get started [connecting your SIP communications infrastructure to the Twilio Cloud](/docs/voice/api/sending-sip).

### Receiving SIP from Twilio

Twilio's Programmable Voice SIP Interface product enables your advanced voice applications to initiate SIP sessions from the Twilio Cloud towards your existing SIP communications infrastructure using Twilio's [TwiML](/docs/voice/twiml) language and/or Twilio's [REST](/docs/usage/api) APIs. Learn how to get started [connecting the Twilio Cloud to your SIP communications infrastructure](/docs/voice/api/receiving-sip).

### Limits

Make sure you are aware of the following Programmable Voice SIP Domain limits.

* 100 SIP Domains per Account or Sub Account
* [IP Access Control Lists (ACLs) limits](/docs/voice/sip/api/sip-ipaccesscontrollist-resource)
* [Credential Lists limits](/docs/voice/sip/api/sip-credentiallist-resource)
* [SIP Registration limits](/docs/voice/api/sip-registration#limits)

## Features

### SIP Registration

Twilio allows you to register your SIP Phones or SIP Endpoints with Twilio. SIP Registration identifies the location of the SIP Endpoints. Therefore, the user can receive calls irrespective of physical location of the SIP Endpoint.

With this feature, your SIP Endpoints can send `REGISTER` requests to Twilio. To learn more about how SIP registration works, see the [SIP registration API](/docs/voice/api/sip-registration).

### Call Transfers using SIP REFER from Twilio

With call transfer, you can move an active call from one endpoint to another. To move the call, SIP uses its `REFER` method.

Twilio supports initiating SIP REFER method from Twilio towards your IP communications infrastructure leveraging the [\<Refer>](/docs/voice/twiml/refer) verb.

### SIP Custom Header

[SIP custom header](/docs/voice/api/sending-sip#sip-custom-headers) allows you to send customized headers.

### UUI (User-to-User Information) Header

UUI header allows you to send contextual information over the SIP call. You can check [Sending-sip with UUI](/docs/voice/api/sending-sip#uui-user-to-user-information-header) and [Receiving-sip with UUI](/docs/voice/api/receiving-sip#uui-user-to-user-information-header) for further UUI details.

### DTMF

Twilio supports [RFC-2833](https://www.ietf.org/rfc/rfc2833.txt) for sending and receiving DTMF.

### Media codec

Twilio supports [G.711 μ-law (PCMU) and A-law (PCMA)](https://en.wikipedia.org/wiki/G.711#.CE.BC-Law) codecs for media. Carriers use these codecs most commonly, so transcoding is unnecessary.

### Securing SIP Traffic using TLS

Encryption ensures that the call signaling remains private during transmission. Transport Layer Security (TLS) provides encryption for SIP signaling.

To encrypt data, your network devices that communicate with Twilio must trust Twilio's TLS Certificate. Twilio uses certificates from a Certificate Authority (CA). To establish the authenticity of Twilio's certificate on the network might require additional root certificates.

[Download Twilio's bundle of trusted CA certificates](https://docs-resources.prod.twilio.com/documents/ca-bundle-sip.crt).

**Note**: the current bundle contains the following root certificates:

* DigiCert Global Root CA
* DigiCert Global Root G2
* DigiCert Global Root G3

When root certificates expire or the CA distrusts them, Twilio might update its CA bundle. In such cases, you receive a notice to update your SIP devices. This notification gets sent to the email address in your account.

TLS requires no further configuration and you can start sending over port 5061 straight away. TLS support via port 5061 is always active and does not require a manual toggle like Secure Media.

For calls where TLS is active this will cause SIP PCAPs downloaded from the console to be empty.

*When sending TLS SIP traffic to Twilio, you will need to ensure that your infrastructure is using next-hop domain as opposed to next-hop ip. This is a common misconfiguration and will cause a 403 error that will not be visible on your Twilio account. You must send traffic to the domain `{example}.sip.{edge}.twilio.com`, rather than an IP address in order to associate the traffic with your Twilio account.*

#### TLS Specifications

* **Supported TLS versions:** `TLSv1.2`. \
  To comply with industry standards, Twilio doesn't support either `TLSv1.0` or `TLSv1.1` for Elastic SIP Trunking calls and SIP registration.
* **Supported Ciphers:** `ECDHE-RSA-AES128-GCM-SHA256`, `ECDHE-RSA-AES128-SHA256`, `ECDHE-RSA-AES256-GCM-SHA384`, `ECDHE-RSA-AES256-SHA384`, `AES128-GCM-SHA256`, `AES128-SHA256`, `AES128-SHA`, `AES256-GCM-SHA384`, `AES256-SHA256`, `AES256-SHA`

> \[!NOTE]
>
> Twilio doesn't support the `sips` URI scheme for encryption in flight. It does support `sip` URI schemes using `transport=tls`.
>
> If a SIP Interface URI uses the `sips` scheme, Twilio replaces the scheme with `sip` and adds the `transport=tls` property on the outbound messages. Use `sip` and `transport=tls` for the URI rather than relying on Twilio adjusting the URI. This eliminates any possible error made in the adjustment.

### Secure Media

Secure Media uses encryption to ensure that the call media and associated signaling remains private during transmission. Secure Real-Time Protocol (SRTP) provides encryption for media. For details see [here](/docs/voice/api/secure-media).

## IP addresses

Prepare your communications infrastructure to make sure that your SIP infrastructure has connectivity to the Twilio Cloud and vice versa. To ensure that your communications infrastructure doesn't block communication, you must update your list of allowed IP addresses. We strongly encourage you to allow all of the following IP address ranges and ports on your firewall for SIP signaling and RTP media traffic.

if you have Numbers in different regions and for availability purposes, use these IP ranges. These IP ranges allow Twilio to re-route traffic in the case of a network failure.

See Twilio's [SIP IP addresses](/docs/sip-trunking/ip-addresses) for the complete list.

## Glossary

### Communications Infrastructure

A broad term to refer to IP-PBX, SBC, IP-phones, etc…

### SIP Endpoint

IP-phone or a soft client with which a user initiates a VoIP call

### SIP URI

Equivalent to a SIP phone number and takes the form, `sip:username@SIPDomain`

### Twilio SIP Domain

It takes the form `{example}.sip.{region}.twilio.com` where `{example}` is specified by the customer and `{region}`is the data center where the registrar is located. Initially only `us1`.
