# SIP INVITEs

A SIP INVITE is a SIP request message that initiates a SIP call.

A SIP INVITE is made up of lines of text. The first line in an INVITE is called a Request-Line, which is followed by more lines of text called "headers". The headers contain information about the INVITE, such as the identity of the caller, whether the INVITE was forwarded before being sent to the recipient, and the number of times a call may be forwarded.

## Table of Contents

* [Example SIP INVITE](/docs/glossary/sip-invites#example-sip-invite)
* [SIP URIs](/docs/glossary/sip-invites#sip-uris)

  * [SIP User](/docs/glossary/sip-invites#sip-user)
  * [SIP Host or SIP Domain](/docs/glossary/sip-invites#sip-host-or-sip-domain)
  * [SIP Port](/docs/glossary/sip-invites#sip-port)
* [SIP Request-Line](/docs/glossary/sip-invites#sip-request-line)

  * [Request-URI](/docs/glossary/sip-invites#request-uri)
* [Common SIP INVITE Headers](/docs/glossary/sip-invites#common-sip-invite-headers)

  * [Via header](/docs/glossary/sip-invites#via-header)
  * [Max-Forwards header](/docs/glossary/sip-invites#max-forwards-header)
  * [To header](/docs/glossary/sip-invites#to-header)
  * [From header](/docs/glossary/sip-invites#from-header)
  * [Call-ID header](/docs/glossary/sip-invites#call-id-header)
  * [CSeq header](/docs/glossary/sip-invites#cseq-header)
  * [Contact header](/docs/glossary/sip-invites#contact-header)
  * [Diversion header](/docs/glossary/sip-invites#diversion-header)
  * [P-Asserted-Identity header](/docs/glossary/sip-invites#p-asserted-identity-header)
* [Other SIP INVITE Headers](/docs/glossary/sip-invites#other-sip-invite-headers)

  * [Remote-Party-Id (RPID) header](/docs/glossary/sip-invites#remote-party-id-rpid-header)
  * [P-Charge-Info header](/docs/glossary/sip-invites#p-charge-info-header)

## Example SIP INVITE

Below is an example of a SIP INVITE request message, which includes some commonly-used SIP INVITE headers.

```bash
INVITE sip:+14155552222@example.pstn.twilio.com SIP/2.0
Via: SIP/2.0/UDP 192.168.10.10:5060;branch=z9hG4bK776asdhds
Max-Forwards: 70
To: "Bob" <sip:+14155552222@example.pstn.twilio.com>
From: "Alice" <sip:+14155551111@example.pstn.twilio.com>;tag=1
Call-ID: a84b4c76e66710
CSeq: 1 INVITE
Contact: "Alice" <sip:+14155551111@192.168.10.10:5060>
Diversion: "Sales" <sip:+14155550000@example.pstn.twilio.com>
P-Asserted-Identity: "Alice" <sip:+14155551111@example.pstn.twilio.com>
Content-Length: 0
```

## SIP URIs

In the INVITE above, you can see several examples of what are called **SIP URIs** that look like email addresses. A SIP URI identifies a users' contact information by indicating a specific user at a specific host/domain. A SIP URI could be an identifier for a specific person, a voice mailbox, a group within an organization (like "sales" or "marketing"), etc.

```bash
sip:+14155552222@example.pstn.twilio.com
```

The parts of a SIP URI are described below.

### SIP User

The **user** is a phone number, word, or username that sits between the `sip:` and the `@` in a SIP URI.

* sip:**+14155552222**@example.pstn.twilio.com
* sip:**sales**@example.pstn.twilio.com
* sip:**maria.hernandez**@example.pstn.twilio.com

### SIP Host or SIP Domain

The **host** or **domain** follows the `@` in a SIP URI and can be a domain or IP address.

* sip:+14155552222@**example.pstn.twilio.com**
* sip:+14155552222@**192.168.10.10**

### SIP Port

A SIP URI can also contain a **port number**. It is written after a `:` following the host. If no port is included in the SIP URI, the default SIP port `5060` is used.

* sip:+14155552222@example.pstn.twilio.com:**6000**

## SIP Request-Line

A SIP INVITE is a type of SIP request. The first line in any SIP request is called the **Request-Line**.

```bash
INVITE sip:+14155552222@example.pstn.twilio.com SIP/2.0
Via: SIP/2.0/UDP 192.168.10.10:5060;branch=z9hG4bK776asdhds
Max-Forwards: 70
To: "Bob" <sip:+14155552222@example.pstn.twilio.com>
From: "Alice" <sip:+14155551111@example.pstn.twilio.com>;tag=1
Call-ID: a84b4c76e66710
CSeq: 1 INVITE
Contact: "Alice" <sip:+14155551111@192.168.10.10:5060>
Diversion: "Sales" <sip:+14155550000@example.pstn.twilio.com>
P-Asserted-Identity: "Alice" <sip:+14155551111@example.pstn.twilio.com>
Content-Length: 0
```

The **Request-Line** contains three parts:

* The request method name: **INVITE** sip:+14155552222@example.pstn.twilio.com SIP/2.0
* The Request-URI: INVITE **sip:+14155552222@example.pstn.twilio.com** SIP/2.0
* The SIP protocol version: INVITE sip:+14155552222@example.pstn.twilio.com **SIP/2.0**

## Request-URI

The **Request-URI** is the contact information for the recipient of the SIP INVITE. It is found within the Request-Line of the INVITE.

* The **Request-URI**: INVITE **sip:+14155552222@example.pstn.twilio.com** SIP/2.0
* The **Request-URI User**: INVITE sip:**+14155552222**@example.pstn.twilio.com SIP/2.0
* The **Request-URI Host**: INVITE sip:+14155552222@**example.pstn.twilio.com** SIP/2.0

## Common SIP INVITE Headers

SIP headers contain information about the SIP message.

```bash 3 4 5 6 7 8 9 10 11
INVITE sip:+14155552222@example.pstn.twilio.com SIP/2.0
Via: SIP/2.0/UDP 192.168.10.10:5060;branch=z9hG4bK776asdhds
Max-Forwards: 70
To: "Bob" <sip:+14155552222@example.pstn.twilio.com>
From: "Alice" <sip:+14155551111@example.pstn.twilio.com>;tag=1
Call-ID: a84b4c76e66710
CSeq: 1 INVITE
Contact: "Alice" <sip:+14155551111@192.168.10.10:5060>
Diversion: "Sales" <sip:+14155550000@example.pstn.twilio.com>
P-Asserted-Identity: "Alice" <sip:+14155551111@example.pstn.twilio.com>
Content-Length: 0
```

The SIP headers in a SIP request follow the Request-Line.

A SIP header has a **name** and a **value**. The header name is before the colon (`:`), the header value is what follows the colon. For the header on line 7 above, the header would be called the "CSeq header", and value of the CSeq header is `1 INVITE`.

## Via header

```bash
INVITE sip:+14155552222@example.pstn.twilio.com SIP/2.0
Via: SIP/2.0/UDP 192.168.10.10:5060;branch=z9hG4bK776asdhds
Max-Forwards: 70
To: "Bob" <sip:+14155552222@example.pstn.twilio.com>
From: "Alice" <sip:+14155551111@example.pstn.twilio.com>;tag=1
Call-ID: a84b4c76e66710
CSeq: 1 INVITE
Contact: "Alice" <sip:+14155551111@192.168.10.10:5060>
Diversion: "Sales" <sip:+14155550000@example.pstn.twilio.com>
P-Asserted-Identity: "Alice" <sip:+14155551111@example.pstn.twilio.com>
Content-Length: 0
```

This header field describes the transport used for the transaction (`SIP/2.0/UDP`) and identifies where responses should be sent (to `192.168.10.10` on port `5060`). The `branch` parameter is a unique value used to identify the transaction that is created by the SIP request.

## Max-Forwards header

```bash
INVITE sip:+14155552222@example.pstn.twilio.com SIP/2.0
Via: SIP/2.0/UDP 192.168.10.10:5060;branch=z9hG4bK776asdhds
Max-Forwards: 70
To: "Bob" <sip:+14155552222@example.pstn.twilio.com>
From: "Alice" <sip:+14155551111@example.pstn.twilio.com>;tag=1
Call-ID: a84b4c76e66710
CSeq: 1 INVITE
Contact: "Alice" <sip:+14155551111@192.168.10.10:5060>
Diversion: "Sales" <sip:+14155550000@example.pstn.twilio.com>
P-Asserted-Identity: "Alice" <sip:+14155551111@example.pstn.twilio.com>
Content-Length: 0
```

This header limits the number of hops a request can make on the way to its destination. The value is an integer that decreases by one at each hop. If the value of the Max-Forwards header reaches 0 before the SIP request reaches its destination, the request will be rejected with a 483 error (Too Many Hops).

## To header

```bash
INVITE sip:+14155552222@example.pstn.twilio.com SIP/2.0
Via: SIP/2.0/UDP 192.168.10.10:5060;branch=z9hG4bK776asdhds
Max-Forwards: 70
To: "Bob" <sip:+14155552222@example.pstn.twilio.com>
From: "Alice" <sip:+14155551111@example.pstn.twilio.com>;tag=1
Call-ID: a84b4c76e66710
CSeq: 1 INVITE
Contact: "Alice" <sip:+14155551111@192.168.10.10:5060>
Diversion: "Sales" <sip:+14155550000@example.pstn.twilio.com>
P-Asserted-Identity: "Alice" <sip:+14155551111@example.pstn.twilio.com>
Content-Length: 0
```

The **To header** contains the contact information for the called party (the recipient of the SIP INVITE).

* **To display name**: To: "**Bob**" \<sip:+14155552222@example.pstn.twilio.com>
* **To URI**: To: "Bob" \<**sip:+14155552222@example.pstn.twilio.com**>
* **To user**: To: "Bob" \<sip:**+14155552222**@example.pstn.twilio.com>
* **To host**: To: "Bob" \<sip:+14155552222@**example.pstn.twilio.com**>

## From header

```bash
INVITE sip:+14155552222@example.pstn.twilio.com SIP/2.0
Via: SIP/2.0/UDP 192.168.10.10:5060;branch=z9hG4bK776asdhds
Max-Forwards: 70
To: "Bob" <sip:+14155552222@example.pstn.twilio.com>
From: "Alice" <sip:+14155551111@example.pstn.twilio.com>;tag=1
Call-ID: a84b4c76e66710
CSeq: 1 INVITE
Contact: "Alice" <sip:+14155551111@192.168.10.10:5060>
Diversion: "Sales" <sip:+14155550000@example.pstn.twilio.com>
P-Asserted-Identity: "Alice" <sip:+14155551111@example.pstn.twilio.com>
Content-Length: 0
```

The **From header** contains the contact information for the party that initiated the SIP INVITE.

* **From display name**: From: "**Alice**" \<sip:+14155551111@example.pstn.twilio.com>;tag=1
* **From URI**: From: "Alice" \<**sip:+14155551111@example.pstn.twilio.com**>;tag=1
* **From user**: From: "Alice" \<sip:**+14155551111**@example.pstn.twilio.com>;tag=1
* **From host**: From: "Alice" \<sip:+14155551111@**example.pstn.twilio.com**>;tag=1

### Call-ID header

```bash
INVITE sip:+14155552222@example.pstn.twilio.com SIP/2.0
Via: SIP/2.0/UDP 192.168.10.10:5060;branch=z9hG4bK776asdhds
Max-Forwards: 70
To: "Bob" <sip:+14155552222@example.pstn.twilio.com>
From: "Alice" <sip:+14155551111@example.pstn.twilio.com>;tag=1
Call-ID: a84b4c76e66710
CSeq: 1 INVITE
Contact: "Alice" <sip:+14155551111@192.168.10.10:5060>
Diversion: "Sales" <sip:+14155550000@example.pstn.twilio.com>
P-Asserted-Identity: "Alice" <sip:+14155551111@example.pstn.twilio.com>
Content-Length: 0
```

The **Call-ID header** acts as a unique identifier that helps group a series of messages together. It must be the same for all requests and responses sent by either party in a dialog (an exchange of related messages between two user-agents). The value should be a cryptographically random group of characters, and can be followed by `@` and a host/domain.

## CSeq header

```bash
INVITE sip:+14155552222@example.pstn.twilio.com SIP/2.0
Via: SIP/2.0/UDP 192.168.10.10:5060;branch=z9hG4bK776asdhds
Max-Forwards: 70
To: "Bob" <sip:+14155552222@example.pstn.twilio.com>
From: "Alice" <sip:+14155551111@example.pstn.twilio.com>;tag=1
Call-ID: a84b4c76e66710
CSeq: 1 INVITE
Contact: "Alice" <sip:+14155551111@192.168.10.10:5060>
Diversion: "Sales" <sip:+14155550000@example.pstn.twilio.com>
P-Asserted-Identity: "Alice" <sip:+14155551111@example.pstn.twilio.com>
Content-Length: 0
```

The **CSeq header** serves as a way to identify and order transactions. It is made up of an integer and a SIP method.

## Contact header

```bash
INVITE sip:+14155552222@example.pstn.twilio.com SIP/2.0
Via: SIP/2.0/UDP 192.168.10.10:5060;branch=z9hG4bK776asdhds
Max-Forwards: 70
To: "Bob" <sip:+14155552222@example.pstn.twilio.com>
From: "Alice" <sip:+14155551111@example.pstn.twilio.com>;tag=1
Call-ID: a84b4c76e66710
CSeq: 1 INVITE
Contact: "Alice" <sip:+14155551111@192.168.10.10:5060>
Diversion: "Sales" <sip:+14155550000@example.pstn.twilio.com>
P-Asserted-Identity: "Alice" <sip:+14155551111@example.pstn.twilio.com>
Content-Length: 0
```

The **Contact header** provides a SIP or SIPS URI that should be used to contact the user agent that sent the INVITE.

* **Contact display name**: Contact: "**Alice**" \<sip:+14155551111@192.168.10.10:5060>
* **Contact URI**: Contact: "Alice" \<**sip:+14155551111@192.168.10.10:5060**>
* **Contact user**: Contact: "Alice" \<sip:**+14155551111**@192.168.10.10:5060>
* **Contact host**: Contact: "Alice" \<sip:+14155551111@**192.168.10.10**:5060>

## Diversion header

```bash
INVITE sip:+14155552222@example.pstn.twilio.com SIP/2.0
Via: SIP/2.0/UDP 192.168.10.10:5060;branch=z9hG4bK776asdhds
Max-Forwards: 70
To: "Bob" <sip:+14155552222@example.pstn.twilio.com>
From: "Alice" <sip:+14155551111@example.pstn.twilio.com>;tag=1
Call-ID: a84b4c76e66710
CSeq: 1 INVITE
Contact: "Alice" <sip:+14155551111@192.168.10.10:5060>
Diversion: "Sales" <sip:+14155550000@example.pstn.twilio.com>
P-Asserted-Identity: "Alice" <sip:+14155551111@example.pstn.twilio.com>
Content-Length: 0
```

The **Diversion header** contains information about any re-directing/forwarding the call has undergone. It includes the contact information for the party that forwarded the call.

* **Diversion display name**: Diversion: "**Sales**" \<sip:+14155550000@example.pstn.twilio.com>
* **Diversion URI**: Diversion: "Sales" \<**sip:+14155550000@example.pstn.twilio.com**>
* **Diversion user**: Diversion: "Sales" \<sip:**+14155550000**@example.pstn.twilio.com>
* **Diversion host**: Diversion: "Sales" \<sip:+14155550000@**example.pstn.twilio.com**>

## P-Asserted-Identity header

```bash
INVITE sip:+14155552222@example.pstn.twilio.com SIP/2.0
Via: SIP/2.0/UDP 192.168.10.10:5060;branch=z9hG4bK776asdhds
Max-Forwards: 70
To: "Bob" <sip:+14155552222@example.pstn.twilio.com>
From: "Alice" <sip:+14155551111@example.pstn.twilio.com>;tag=1
Call-ID: a84b4c76e66710
CSeq: 1 INVITE
Contact: "Alice" <sip:+14155551111@192.168.10.10:5060>
Diversion: "Sales" <sip:+14155550000@example.pstn.twilio.com>
P-Asserted-Identity: "Alice" <sip:+14155551111@example.pstn.twilio.com>
Content-Length: 0
```

The **P-Asserted-Identity header** contains the Caller ID information for the call that was authenticated in some way. This header may be used when forwarding calls within trusted domains, in order to maintain the original caller's caller ID rather than the forwarding entity's.

* **P-Asserted-Identity display name**: P-Asserted-Identity: "**Alice**" \<sip:+14155551111@example.pstn.twilio.com>
* **P-Asserted-Identity URI**: P-Asserted-Identity: "Alice" \<**sip:+14155551111@example.pstn.twilio.com**>
* **P-Asserted-Identity user**: P-Asserted-Identity: "Alice" \<sip:**+14155551111**@example.pstn.twilio.com>
* **P-Asserted-Identity host**: P-Asserted-Identity: "Alice" \<sip:+14155551111@**example.pstn.twilio.com**>

## Other SIP INVITE Headers

### Remote-Party-Id (RPID) header

```bash
Remote-Party-Id: "Alice" <sip:+14155551111@example.pstn.twilio.com>
```

The **Remote-Party-Id (RPID) header** identifies the originator of the call.

* **Remote-Party-Id (RPID) display name**: Remote-Party-Id: "**Alice**" \<sip:+14155551111@example.pstn.twilio.com>
* **Remote-Party-Id (RPID) URI**: Remote-Party-Id: "Alice" \<**sip:+14155551111@example.pstn.twilio.com**>
* **Remote-Party-Id (RPID) user**: Remote-Party-Id: "Alice" \<sip:**+14155551111**@example.pstn.twilio.com>
* **Remote-Party-Id (RPID) host**: Remote-Party-Id: "Alice" \<sip:+14155551111@**example.pstn.twilio.com**>

### P-Charge-Info header

```bash
P-Charge-Info: "Alice" <sip:+14155551111@example.pstn.twilio.com>
```

The **P-Charge-Info header** contains information about the identity of the party to be charged.

* **P-Charge-Info display name**: P-Charge-Info: "**Alice**" \<sip:+14155551111@example.pstn.twilio.com>
* **P-Charge-Info URI**: P-Charge-Info: "Alice" \<**sip:+14155551111@example.pstn.twilio.com**>
* **P-Charge-Info user**: P-Charge-Info: "Alice" \<sip:**+14155551111**@example.pstn.twilio.com>
* **P-Charge-Info host**: P-Charge-Info: "Alice" \<sip:+14155551111@**example.pstn.twilio.com**>
