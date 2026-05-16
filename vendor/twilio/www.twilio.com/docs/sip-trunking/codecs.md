# Elastic SIP Trunking Codecs

## General Availability (GA) codecs

Twilio supports PCMU and PCMA codecs for [Elastic SIP Trunking](/docs/sip-trunking).

### GA codecs origination

When Twilio directs incoming traffic from the Public Switched Telephone Network (PSTN) to your communications infrastructure, it sends PCMU and PCMA codecs in the following order in the Session Description Protocol (SDP) parameter:

1. PCMU
2. PCMA

### GA codecs termination

When Twilio receives outgoing traffic from your communications infrastructure to the PSTN, it matches the first supported codec in the SDP offer. Twilio supports PCMU and PCMA codecs.

## Limited Availability (LA) codecs

In addition to the default PCMU and PCMA codecs, Twilio provides Limited Availability (LA) access to the **G.729**, **Opus**, and **AMR-NB** codecs.

> \[!NOTE]
>
> Limited Availability codecs are not supported end to end. Request them only if the codec is essential for device or network compatibility.
>
> If you require any of the Limited Availability codecs for compatibility, contact your Twilio sales representative or [talk to Twilio Sales](https://www.twilio.com/en-us/help/sales).

### Adaptive Multi-Rate Narrowband Codec (AMR-NB)

Twilio supports AMR-NB with Voice Activity Detection (VAD), Discontinuous Transmission (DTX), and Silence Insertion Descriptor (SID) frames.

Either party in a call can request a change of mode via a Codec Mode Request (CMR). Twilio responds to CMRs received from call peers but doesn't send CMRs.

Twilio supports the `mode-set` and `octet-align` media format SDP parameters. All other AMR-NB SDP parameters use their default values.

#### AMR-NB encoding modes

* The AMR-NB codec supports eight encoding modes, which vary in bitrate from 4.75 kbit/s to 12.2 kbit/s. Twilio supports all eight modes.
* A call can be limited to a subset of these modes using the `a=fmtp:<fmt> mode-set` SDP media format parameter (termination calls only).
* For origination calls, Twilio doesn't offer the `mode-set` parameter. Therefore, outbound calls use the default set of all eight modes.

#### AMR-NB payload format

* The payload format for a session can be in [bandwidth-efficient or octet-aligned](https://datatracker.ietf.org/doc/html/rfc4867#section-3.8) format.
* This is configurable in the `a=fmtp:<fmt> octet-align` SDP media format parameter for termination calls with Twilio.

  * `octet-align=0` is the default, bandwidth-efficient format.
  * `octet-align=1` is the octet-aligned format.
* For origination calls, Twilio only offers the default bandwidth-efficient payload format (`octet-align=0`).

### LA codecs origination

#### Codec priority

If you have Limited Availability codecs enabled on your account, Twilio sends the codecs in the following order of priority in the SDP message:

1. Opus
2. PCMU
3. PCMA
4. G.729
5. AMR-NB

* PCMU always immediately precedes PCMA.
* If enabled on your account, Opus is always first and is immediately followed by PCMU, then PCMA.
* If enabled on your account, G.729 always immediately follows PCMA.
* If enabled on your account, AMR-NB is always last in priority.

#### AMR-NB origination calls

* Twilio only offers the default bandwidth-efficient payload format (`octet-align=0`).
* Twilio doesn't offer the `mode-set` parameter. Therefore, outbound calls use the default set of all eight modes.

### LA codecs termination

If you have Limited Availability codecs enabled on your account, Twilio matches the first supported codec among PCMU, PCMA, and the additional codecs you have enabled on your Twilio account.

#### AMR-NB termination calls

* Twilio supports the `mode-set` SDP media format parameter when receiving SDP offers.
* Twilio accepts both AMR-NB payload formats for the SDP media format parameter:

  * `a=fmtp:<fmt> octet-align=0` (bandwidth-efficient)
  * `a=fmtp:<fmt> octet-align=1` (octet-aligned)
