# Elastic SIP Trunking

## Getting Started: Configure your Twilio Elastic SIP Trunk

### Before You Begin

In order to use Twilio Elastic SIP Trunking, you'll need a Twilio account. [Sign up for
a free Twilio account](https://www.twilio.com/try-twilio) if you don't already have one.

#### Configure your Elastic SIP Trunk

* [Configure Trunks](#configure-trunks)
  * [General settings](#general)
  * [Termination settings](#termination)
  * [Origination settings](#origination)
  * [Numbers](#numbers)
* Connect your Network over
  * [Public Internet](#your-network)
  * [Twilio Interconnect](/docs/sip-trunking/configure-with-interconnect)
* [Twilio's IP addresses](/docs/sip-trunking/ip-addresses)
* Features
  * [Codecs](/docs/sip-trunking/codecs)
  * [Calls per Second](/docs/sip-trunking/cps-trunk-termination)
  * [Call Recording](#recording)
  * [Secure Trunking](#securetrunking)
  * [Call Redirect](#redirect)
  * [Extended Call Duration](#extended-call-duration)
  * [SIP Diversion Headers](#diversion)
  * [Call Transfer via SIP REFER](/docs/sip-trunking/call-transfer)
  * [Disaster Recovery URL](#disaster-recovery)
  * [Emergency Calling](/docs/sip-trunking/emergency-calling)
  * Caller Name: [CNAM Lookup](#CNAM) & [CNAM Registration](/docs/voice/brand-your-calls-using-cnam)
  * [Trusted Calling with STIR/SHAKEN](/docs/voice/trusted-calling-with-shakenstir)
  * [SIP Header Manipulation](/docs/sip-trunking/sip-header-manipulation)

**Connect with your IP communications infrastructure:**

* [Elastic SIP Trunking - Solution Blueprints](/docs/sip-trunking/solution-blueprints)
* [Elastic SIP Trunking - Configuration Guides](/docs/sip-trunking/sample-configuration)

**REST API documentation:**

* [Elastic SIP Trunking REST API Reference](/docs/sip-trunking/api)

### Requirements

In order to use Twilio Elastic SIP Trunking, you'll need to ensure that you
have the following:

* A SIP enabled network element (e.g. Session Border
  Controller, SIP Call Server, IP-PBX, SIP-PRI IAD, etc.) with access to the internet.
* Sufficient Internet bandwidth to support the peak call traffic. The peak
  bandwidth can be determined by:

  * SIP Trunk Peak Bandwidth = Max Simultaneous Calls x 100 kbps

  The 100 kbps value reflects the necessary bandwidth for the G711 codec plus sufficient room for overhead.

### Dashboard

In Twilio Console, go to **Products & services** > **Elastic SIP Trunking** > **[Overview](https://1console.twilio.com/go?to=/account/__account__/us1/sip-trunking/overview)** to view your Dashboard. In the [legacy Console](https://console.twilio.com/us1/develop/sip-trunking), the Dashboard is in the **Elastic SIP Trunking** section. The Dashboard provides a high-level overview of your Trunking usage: Minutes, Calls, and Cost.

Elastic SIP Trunking has the following sections:

* *Overview*: Get started here, review tutorial docs, or access features and pricing.
* *Manage*: Access Trunks, IP access control lists, credential lists, or networking info.

### Manage

Under the "Manage" menu you will have access to all of the configuration
aspects of your Trunks. Specifically, you will have links to:

* *Trunks*: List of your existing SIP Trunks. Create, delete and
  configure your trunks.
* *IP Access Control Lists*: Manage your IP Access Control Lists (a set of IPs
  that are allowed to reach your SIP Domain).
* *Credential Lists*: Manage your user credentials (a set of usernames and
  passwords that are allowed to reach your SIP Domain).
* *Networking Info*: Important information about Twilio's platform that you will
  need to configure your communications infrastructure.

### Trunks \[#configure-trunks]

Twilio Elastic SIP Trunking is a cloud based solution that provides
connectivity for IP-based communications infrastructure to connect to the PSTN,
for making and receiving telephone calls to the 'rest of the world' via any
broadband internet connection.

A trunk is composed of the following settings:

![Diagram showing Elastic SIP Trunk connecting calls to cloud and phone network.](https://docs-resources.prod.twilio.com/3489396fecc4915e00efd683c59fc2c85472efee201e7bd7a932902c448db108.png)

* *General*: Provide a friendly name for your trunk and see its unique identifier
  (Trunk SID).
* *Termination*: Configure the settings for placing outgoing traffic from your
  communications infrastructure to the PSTN.
* *Origination*: Configure the settings for receiving incoming
  traffic on your Twilio numbers to deliver calls to your
  communications infrastructure from the PSTN.
* *Numbers*: Allows you to associate numbers with a given trunk, and see all
  numbers currently associated with a trunk.

From the [Trunks](/user/account/sip-trunking/trunks) navigation bar item you'll be able to view a full
list of your Elastic SIP Trunks and click on each one to modify its
configuration. You also have the ability to delete a given trunk from this
view.

### Create a Trunk

From the [Trunks](/user/account/sip-trunking/trunks) navigation bar click on "Create New Trunk" to
create a new trunk. This may also be done from the [Getting
Started](/user/account/sip-trunking/getting-started) section.

### General settings \[#general]

These settings apply to the entire trunk regardless of the direction of your
traffic.

#### Friendly Name

Provide a friendly name for your trunk.

#### Trunk SID

This is the unique identifier of this trunk, and is assigned automatically once
you create a trunk.

#### Call Recording \[#recording]

From this drop-down you can enable call recording for this trunk. When enabled,
all calls are recorded (both origination and termination traffic), in a
pay-as-you-go consumption model. Recording options for a single channel or dual channels
can be selected. The default setting of a trunk is Do Not Record. You can select:

* *Do Not Record*: Recording is disabled on this trunk.
* *Record from ringing*: Recording will begin when the ringing starts.
* *Record from answer*: Recording will begin when a call is answered.
* *Dual Record from ringing*: Recording will begin when the ringing starts and both tracks will be visualized separately.
* *Dual Record from answer*: Recording will begin when a call is answered and both tracks will be visualized separately.
* *Recording Trim*: If enabled, silence will be trimmed from the recording. If disabled, silence will not be trimmed from the recording.

#### Extended Call Duration

Twilio extended the maximum call duration on Elastic SIP Trunking calls from 4 hours to 24 hours. This allows the business to have extended conversations that last longer than 4 hours. You can see details [here](/docs/sip-trunking/extended-call-duration).

#### Secure Trunking \[#securetrunking]

Encryption ensures that the call media and associated signalling remains private during transmission. Transport Layer Security (TLS) provides encryption for SIP signaling and Secure Real-time Transport Protocol (SRTP) provides encryption for call content/media packets. Learn about how to enable and troubleshoot TLS issues from this [blog](/blog/secure-elastic-sip-trunks).

The TLS protocol is designed to establish a secure connection between a client and a server communicating over an insecure channel. RFC 5246, the Transport Layer Security (TLS) Protocol, Version 1.2, specifies Version 1.2 of the Transport Layer Security (TLS) protocol.

**TLS Specifications:**

* **Supported TLS versions:** `TLSv1.2` and above. \
  To comply with industry-standard security requirements, Twilio no longer supports `TLSv1.0` and `TLSv1.1` for inbound or outbound Elastic SIP Trunking calls and SIP registration.
* **Supported Ciphers**: `ECDHE-RSA-AES128-GCM-SHA256`, `ECDHE-RSA-AES128-SHA256`, `ECDHE-RSA-AES256-GCM-SHA384`, `ECDHE-RSA-AES256-SHA384`,`AES128-GCM-SHA256`,`AES128-SHA256`,`AES128-SHA`,`AES256-GCM-SHA384`,`AES256-SHA256`,`AES256-SHA`

**Note**: When TLS is enabled, you will no longer be able to view the SIP signalling packets in the PCAP captures within the Call Logs section.

SRTP provides a framework for the encryption of RTP & RTCP. RFC 4568, Session Description Protocol (SDP) Security Description (SDES) for Media Streams, defines such a protocol specifically designed to exchange cryptographic material using a newly defined SDP crypto attribute.

SRTP Specifications:

* Trunking Origination: Only a single crypto suite will be included: `AES_CM_128_HMAC_SHA1_80`
* Trunking Termination: Crypto suites supported include `AES_CM_128_HMAC_SHA1_80` and `AES_CM_128_HMAC_SHA1_32`. Both may be included in an order of preference.
* The optional master key identifier (MKI) parameter is not supported

When Secure Trunking is enabled, any non-encrypted calls will be rejected. Please ensure you configure the use of TLS in your
[Origination Settings](/docs/sip-trunking#origination) by including the `transport=tls` parameter. If the transport parameter is present on any of your URIs specifying a different transport (e.g. `transport=udp`), it will be ignored and TLS will be used. By default port 5061 will be used for TLS, however you may specify the port you wish to use in your Origination URI.

##### Importing Twilio's Root CA Certificate \[#rootCA]

TLS is used to encrypt SIP signaling between SIP endpoints. In order for this to function properly, devices in your network that communicate directly with Twilio must be configured to trust Twilio's TLS/SSL Certificate. Twilio uses certificates issued by a CA (Certificate Authority). You may need to add additional root certificates to your communications infrastructure to establish the authenticity of Twilio's certificate on the network. [Download Twilio's bundle of trusted CA certificates](https://docs-resources.prod.twilio.com/documents/ca-bundle-sip.crt). (Last updated September 1, 2023).

Note: the current bundle contains the following root certificates:

* DigiCert Global Root CA
* DigiCert Global Root G2
* DigiCert Global Root G3

Please be aware that the Twilio CA bundle may be updated in the future, for example when root certificates expire or are distrusted by the CA. In such cases we will notify you to update your SIP devices. Please ensure that your email address is up to date in your account information to ensure you receive such communication.

#### TLS/SRTP support with Asterisk \[#asterisk]

Asterisk ships by default with `chan_sip` driver and works well with Twilio. However, if you have some reason to run `PJSIP` driver with Asterisk, note the following:

* Asterisk 13.8 cert2 defaults to `PJSIP 2.5` and it does not work with Twilio for TLS/SRTP purposes. Non-encrypted calls do work
* Asterisk 13.8 cert2 can also use the latest `PJSIP` driver, which at this time is 2.5.5. Twilio works well with it despite the following message appearing in your log:

*`PJSIP 2.5.5` outputs the following error but the call is still shown to work.*

```bash
Sep 27 13:03:56] ERROR[10886]: pjproject:0 :     tlsc0x7f217c03 RFC 5922 (section 7.2) does not allow TLS wildcard certificates. Advise your SIP provider, please!

```

The following link is a guide to installing a non-bundled version of `PJSIP`. Change the version to 2.5.5 in the steps.

[Installing PJSIP channel driver](https://asteriskpro.blogspot.com/2017/07/how-to-install-asterisk-13-and-pjsip-on.html)

#### Call Transfer via SIP REFER \[#calltransfer]

When Call Transfer is enabled, Twilio will consume an incoming SIP REFER from your communications infrastructure and create an INVITE message to the address in the Refer-To header. Please go [here](/docs/sip-trunking/call-transfer) for more details.

#### Media Settings \[#media]

##### Symmetric RTP \[#symmetric-RTP]

In general, your IP communications infrastructure should use your public IP address in the SDP and that will be the ONLY destination where Twilio will send media towards. However, if you're traversing a non-SIP aware NAT, you may not know your public IP and your SDP will include your private IP address, typically leading to one-way audio issues. Twilio is able to resolve this by latching onto the incoming RTP media stream and sending RTP towards that destination by enabling Symmetric RTP.

When Symmetric RTP is enabled Twilio will detect where the remote RTP stream is coming from and start sending RTP to that destination instead of the one negotiated in the SDP. This setting is more vulnerable to RTP attacks.

When Symmetric RTP is disabled, Twilio will send RTP to the destination negotiated in the SDP. This setting is considered to be more secure and therefore recommended.

### Termination Settings \[#termination]

Configuring your termination settings will allow you to place outgoing traffic
from your communications infrastructure to the PSTN. In order to use a trunk
for termination it must have a Termination SIP URI and at least one
authentication scheme (IP Access Control Lists and/or Credentials Lists).

![Elastic SIP Trunking connects calls to a cloud service and phone network.](https://docs-resources.prod.twilio.com/d5a25412eef6bbb1359487f9ad66c2db99a1585aab93da0f6c14ea303f9fa4e1.png)

#### Termination URI

Configure a SIP Domain Name to uniquely identify your Termination SIP URI for
this trunk. This URI will be used by your communications infrastructure to
direct SIP traffic towards Twilio.

* `{example}.pstn.twilio.com`

*Twilio recommends that you use a dash instead of a dot to improve readability of your domain.
However, in some cases you may prefer a sub-domain like a.b.pstn.twilio.com of the higher-level domain b.pstn.twilio.com*

A sub-domain like a.b.pstn.twilio.com can be created under the following requirements:

* The higher-level domain (b.pstn.twilio.com) must be created first
* The higher-level domain (b.pstn.twilio.com) must be created by the same account or the parent account

#### Configure a trunk on your communications infrastructure (e.g. IP-PBX or SBC) \[#prepare]

Configure a trunk on your communications infrastructure and point it towards
`{example}.pstn.twilio.com` for outbound traffic towards Twilio.

#### Localized Termination URIs \[#localized-termination-uris]

If you wish to manually connect to a specific geographic edge location that is closest to
the location of your communications infrastructure, you may do so by pointing
your communications infrastructure to any of the following localized
Termination SIP URIs:

* `{example}.pstn.ashburn.twilio.com` (North America Virginia)
* `{example}.pstn.umatilla.twilio.com` (North America Oregon)
* `{example}.pstn.dublin.twilio.com` (Europe Ireland)
* `{example}.pstn.frankfurt.twilio.com` (Europe Frankfurt)
* `{example}.pstn.singapore.twilio.com` (Asia Pacific Singapore)
* `{example}.pstn.tokyo.twilio.com` (Asia Pacific Tokyo)
* `{example}.pstn.sao-paulo.twilio.com` (South America São Paulo)
* `{example}.pstn.sydney.twilio.com` (Asia Pacific Sydney)

> \[!NOTE]
>
> You can find the [legacy localized URIs list
> here](/docs/global-infrastructure/localized-uris/termination#legacy-termination-uris).
> eg: `{example}.pstn.us1.twilio.com`

#### Redundancy with Termination URIs \[#redundancy-termination-uris]

Twilio's Elastic SIP Trunking uses an FQDN (`{example}.pstn.twilio.com`) as a Termination URI that is used by your communications infrastructure to direct SIP traffic towards Twilio. As explained in the previous section, localized Termination URIs are available.

For example, `{example}.pstn.ashburn.twilio.com`, this specific FQDN resolves in the following DNS A-Record:

| Type | IP Address  | TTL    |
| :--- | :---------- | :----- |
| A    | 54.172.60.3 | 10 min |
| A    | 54.172.60.0 | 10 min |
| A    | 54.172.60.2 | 10 min |
| A    | 54.172.60.1 | 10 min |

For each edge location we have 3-4 IP addresses that are used for reliability purposes (see [IP addresses](/docs/sip-trunking#ip-addresses). Each of these IP addresses represents a unique public edge for our Elastic SIP Trunking services into the Twilio cloud, distributed across multiple Availability Zones for reliability purposes.

We strongly recommend that you avoid directing your SIP traffic to a single IP address. Instead, utilize all available IP addresses and implement failover in case one IP is not responding. For more information, review our [Best Practices for Sending SIP to Twilio](/docs/sip-trunking/sending-sip-to-twilio-best-practices).

A common strategy, which we deploy internally and what we have instructed our carriers to do towards us as well, is that if there is no response to an INVITE, go to the next IP after 4 seconds. A single machine behind a single IP will always fail at some point so the overall solution must take that into consideration and guard itself towards these failures.

Furthermore, if there is a complete Ashburn outage, it is recommended that you failover to another [edge location](/docs/global-infrastructure/edge-locations) (e.g. If connecting to `ashburn`, failover to `umatilla`), keeping in mind that the Edge Location will in turn resolve to 3-4 different IP addresses for reliability.

#### Authentication \[#authentication]

Configure the authentication details to ensure the security/authenticity of your termination traffic. You must configure a minimum of either an ACL or credential authentication. If you configure both, then both ACLs *and* credentials are enforced.

> \[!NOTE]
>
> It is highly recommended that you configure User Credentials. IP ACL's alone
> does not protect against certain types of attacks.

To create a new Access Control List (ACL):

* Click "Create IP Access Control List" from the "Authentication" section.
* Give the Access Control List a friendly name that is descriptive of what that
  list of IPs. Something like "Dallas Datacenter IPs".
* Add IPs to your new IP Access Control List (these should be the IP addresses
  used for outbound SIP traffic by your Communications Infrastructure border
  elements, e.g. SBC).
* Give your IPs a friendly name that is descriptive of what that IP is, for
  example "Production SBC".
* Click "Create ACL"

To create a new Credential List:

* Click "Create Credential List" from the "Authentication" section.
* Give the Credential List a friendly name that is descriptive of the user
  you're authenticating. Something like "Admin, Twilio".
* Enter a username (these should be the username used for digest authentication
  for outbound SIP traffic by your communications infrastructure border
  elements, e.g. SBC).
* Enter the corresponding password for that user.
* Click "Create Credentials List"

If you are using User Credentials, your SIP INVITE will be challenged with a
`407 Proxy Authentication Required` requesting the appropriate user credentials.

By the end of this step your trunk will be able to process termination calls
from your communications infrastructure, via Twilio, to the PSTN.

#### Allowed Caller ID Numbers in Termination calls

You must specify a Caller ID Number that either corresponds to a Twilio DID on your account or a Caller ID Number that has been verified in Twilio Console (**Products & services** > **Numbers & senders** > **[Verified Caller IDs](https://1console.twilio.com/go?to=/account/__account__/us1/phone-numbers/manage/verified)**), in the [legacy Console](https://www.twilio.com/console/phone-numbers/verified), or with the [Outgoing Caller ID API](/docs/voice/api/outgoing-caller-ids).

If a Caller ID Number is not specified in the SIP INVITE's From Field, then the Remote-Party-ID or the P-Asserted-Identity will be used.

> \[!NOTE]
>
> For Trial accounts, in addition to using a verified Caller ID, you can only
> call numbers that are also verified. To remove this restriction, upgrade your
> account in [Twilio Console](https://1console.twilio.com) or the [legacy Console](https://www.twilio.com/console).

#### Make your first Termination call

`INVITE sip:+15108675309@{example}.pstn.ashburn.twilio.com SIP/2.0`

Make sure that any phone numbers sent via SIP to Twilio are always\
E.164-formatted (e.g.`+12128675309`). If E.164 format is not used, then the\
call will be rejected with a SIP `400 Bad Request` response.

> \[!WARNING]
>
> Make sure your E.164 formatted number always includes `+`. This plus prefix is
> a must.

### Origination settings \[#origination]

Configuring your origination settings will allow you to receive incoming
traffic from the PSTN to a Twilio number, delivered to your communications
infrastructure. With phone numbers available in over 100 countries, Twilio gives
you a truly global SIP Trunk. A minimum of one Twilio number should be
associated with this trunk if you're configuring it for origination.

![Diagram showing call flow through Elastic SIP Trunk to Twilio cloud and phone endpoint.](https://docs-resources.prod.twilio.com/fc102b055945d58eadda771aced97336a26cea42eef2ac846b7af4919a012452.png)

The origination settings configured in this section will apply to all numbers
associated with this trunk.

#### Origination SIP URI \[#OriginationURI]

Configure your origination SIP URI, which identifies the network element entry
point into your communications infrastructure (e.g. IP-PBX, SBC). The host part of the SIP URI may be
either an IP address or a Fully Qualified Domain Name (FQDN).

* `sip:172.56.42.132`
* `sip:mysbc.com`

Twilio will automatically populate the user part of the SIP URI based on the
Twilio number the call from the PSTN is destined towards. For example, if the
call from the PSTN is received for Twilio number +14158675309, which is
associated with this trunk, the resulting URI sent to your communications
infrastructure will be:

* `sip:+14158675309@172.56.42.132`
* `sip:+14158675309@mysbc.com`

Alternatively, you may also configure a specific user-part (e.g. "anniebp")
within the origination SIP URI. Note that the same URI will be used for all
Numbers associated with this trunk. Hence, if the call from the PSTN is
received for Twilio number +14158675309, which is associated with this trunk,
the resulting URI towards your communications infrastructure will still be the
following for all phone numbers:

* `sip:anniebp@172.56.42.132`
* `sip:anniebp@mysbc.com`

Note: The Twilio number dialed (+14158675309) will always be conveyed in
a SIP `Diversion` header for Trunking Origination calls.

##### X-headers \[#OriginationURI-X-headers]

It is possible to send any SIP header beginning with the `X-` prefix, by
appending them to the origination SIP URI. For example, you could configure:
`sip:+14158675309@mysbc.com?X-myheader=foo`
to send `X-myheader:foo` on all originated calls.

##### The `transport` parameter \[#OriginationURI-transport]

By default, Twilio sends originating SIP requests towards your communications infrastructure over UDP. This may be customized to be sent over TCP rather than UDP. Change this by using the transport parameter in the origination SIP URI:

* `sip:anniebp@172.56.42.132;transport=tcp`

Alternatively, you may customize it to use TLS for SIP signalling. When using TLS, the default port will be 5061, however a different one may be specified. Change this by using the transport parameter in the origination SIP URI, and optionally by specifying a different port number:

* `sip:anniebp@172.56.42.132:5062;transport=tls`

> \[!NOTE]
>
> Note: Elastic SIP Trunking Origination URI configurations using the `sips` URI scheme in order to enable end-to-end encryption is NOT supported by Twilio. However, we do support `sip` URI schemes using `transport=tls` for point-to-point encryption.
>
> If you configure your Elastic SIP Trunking Origination URIs to use `sips` schemes, these `sips` URIs will be handled as if they were `sip` URIs using TLS transport. Twilio will effectively adjust the URI internally to instead be routed using the `sip` scheme and `transport=tls` on the outbound messages, resulting in point-to-point encryption between Twilio and the customer equipment.
>
> Twilio strongly suggests not using `sips` schemes in your Twilio SIP configurations, as this could cause possibly unintended behavior, due to how we process such URIs. Instead, we suggest using `sip` schemes with TLS transport. This method, along with the security of our voice architecture and Super Network, is an effective way of adding encryption to your Twilio SIP connections.

##### The `edge` parameter \[#OriginationURI-region]

To specify the geographic [edge](/docs/global-infrastructure/edge-locations) from which Twilio will send the originating SIP traffic towards your communication infrastructure, you must include the `edge` parameter in your Origination SIP URI. For example, if the `edge=dublin` parameter is included in your Origination SIP URI, Twilio will send the SIP traffic from the Europe Ireland edge location:

* `sip:anniebp@172.56.42.132;edge=dublin`

If the `edge` parameter is not specified or is incorrect, Twilio will send the Originating SIP traffic from the edge location where the incoming PSTN call comes in.

Note: You must make sure you allow the [IP addresses](/docs/sip-trunking#ip-addresses) of the Twilio edge location for SIP signalling and RTP media traffic.

> \[!NOTE]
>
> This parameter was previously named `region` and it is still supported. View a
> list of [legacy region identifiers
> here](/docs/global-infrastructure/edge-locations/legacy-regions). eg:
> `sip:anniebp@172.56.42.132;region=ie1`

#### Using Multiple Origination SIP URIs \[#multiple-orig-uris]

It is possible to configure up to ten (10) Origination SIP URIs with different priority & weight.

The priority field determines the precedence of use of the SIP URI. Twilio will always use the SIP URI with the lowest-numbered priority value first, and fallback to other SIP URIs of equal or higher value if the session to that SIP URI fails.

If a service has multiple origination SIP URIs with the same priority value, Twilio will use the weight field to determine which SIP URI to use. The weight value is relevant only in relation to other SIP URIs with the same priority value.

`Priority` ranks the importance of the URI. Values range from 0 to 65535, where the lowest number represents the highest importance. `Weight` is used to determine the share of load when more than one URI has the same priority. Its values range from 1 to 65535. The higher the value, the more load a URI is given.

It is possible to enable or disable an origination SIP URI. When an origination SIP URI is enabled, it's active in the route selection. If it is not enabled, then it will not be used for routing traffic towards your communications infrastructure.

In the following example, both the priority and weight fields are used to provide a combination of load balancing and failover services.

| Origination SIP URI    | Priority | Weight |
| :--------------------- | :------- | :----- |
| `sip:mysbc1.com`       | 10       | 60     |
| `sip:mysbc2.com`       | 10       | 20     |
| `sip:mysbc3.com`       | 10       | 20     |
| `sip:mysbc-backup.com` | 20       | 10     |

The first three SIP URIs share a priority of 10, so the weight field's value will be used Twilio to determine which server to contact. The sum of all three values is 100, so `sip:mysbc1.com` will be used 60% of the time. The two SIP URIs `sip:mysbc2.com` and `sip:mysbc3.com` will be used for 20% of requests each. If `sip:mysbc1.com` is unavailable, these two remaining machines will share the load equally, since they will each be selected 50% of the time.

If all three servers with priority 10 are unavailable, the record with the next lowest priority value will be chosen, which is `sip:mysbc-backup.com`.
Note: If any of the following SIP status codes are returned ("2xx", "400", "404", "405", "410", "416", "482", "484", "486", "6xx"), Twilio will not fail over to the next origination SIP URI. If there is no SIP response from a given server, Twilio will fail over after 4 seconds.

#### Disaster Recovery URL \[#disaster-recovery]

In the case of a disaster preventing your calls from being delivered to your
origination SIP URI above, you can configure a Disaster Recovery URL pointing
to an application built on Twilio's powerful scripting tool called TwiML. You
can use TwiML to build an application that will manage calls as required by
your disaster recovery plan, including replicating the functionality of your
PBX (e.g. IVR).

* `http://fallback.example.com/index`

For more information on building your TwiML application, please refer to the
[Twilio QuickStart](/docs) and [TwiML API Guide](/docs/voice/twiml). When calls are
redirected to your disaster recovery URL, normal Twilio Voice rates apply: see [voice
pricing](/en-us/voice/pricing/us).

#### CNAM Lookups \[#CNAM]

CNAM is an acronym which stands for Caller ID Name. CNAM is used to display the calling party's name alongside the phone number, to help users easily identify a caller.

When you enable CNAM Lookup, the Caller ID Name is inserted in the SIP INVITE via the "From", and "Contact" and (if applicable) "P-Asserted-Identity" fields for each caller.

Note that CNAM lookups for US/CA numbers are billed per lookup, even if data may not be available. Currently, requesting Caller ID Name Lookup for international numbers will return null values, but will not be billed.

##### Enable this Feature Using the Twilio Console

## Console

1. In Twilio Console, go to **Products & services** > **Elastic SIP Trunking** > **Manage** > **[Trunks](https://1console.twilio.com/go?to=/account/__account__/us1/sip-trunking/manage/trunks)**.
2. Select a Trunk.
3. Go to the **Origination** settings.
4. Enable the **CNAM Lookup** switch. The switch turns blue and displays **ENABLED** when the setting is on.

## Legacy Console

To enable CNAM Lookup in the legacy Console, log in and go to the **Elastic SIP Trunking** section.

When you have selected a Trunk, navigate to the **Origination** settings in the left-hand sub-menu. You will see a switch where you can enable CNAM Lookup. You will know the setting has been enabled when the switch turns blue and the word **ENABLED** appears.

* CNAM Lookup must be enabled on a per Trunk basis
* CNAM Lookup is only supported for US/CA phone numbers
* CNAM Lookup is billed per successful lookup (this includes the case where the Name is not available for a Number in the CNAM National databases). It is known that many AT\&T numbers are not published to the CNAM National databases.
* CNAM Lookup is billed per successful lookup, even if the call itself fails

#### Call Redirect \[#redirect]

Call redirect enables you to redirect a Trunking Origination call. Your communications infrastructure can redirect an incoming INVITE by responding with a SIP 302 (Moved Temporarily). This response contains a contact header field with the new addresses that should be tried.

* Twilio supports a single redirection per call:
  * If a redirected target also sends a SIP 302 response to another target, Twilio will fail the call.
  * Twilio honors the first URI of the SIP 302 response: Multiple URIs in the SIP `Contact` header except the first one or multiple SIP `Contact` headers except the first one will be ignored.
* Call redirections towards Twilio domains (`*.sip.twilio.com` or `*.pstn.twilio.com`) are not supported
* If the call is to a registered SIP endpoint, redirection is not allowed
* The `edge` parameter is not supported in a SIP 302 contact URI. The redirected call will use the same egress edge location as the original call
* The `tnx` parameter is not supported in a SIP 302 contact URI. The redirected call will use the same Interconnect Connection as the original call
* If [Secure Trunking](#securetrunking) was used for the original INVITE then the redirected call will also use TLS/SRTP
* If [Call Recording](#recording) was used for the original INVITE then the redirected call will also be recorded

### SIP `Diversion` Headers \[#diversion]

#### Trunking Origination

When Twilio receives incoming traffic on your Twilio numbers from the PSTN to be directed to your communications infrastructure, it will add a SIP `Diversion` header noting the Twilio number that was dialed. This header serves as a historical record that indicates that the call was diverted from the dialed number to the Origination SIP URI of your SIP Trunk. An example of what this `Diversion` header might look like is shown below.

`Diversion: <sip:+14155550000@twilio.com>`

#### Trunking Termination

When Twilio receives outgoing traffic from your communications infrastructure to the PSTN, your SIP message can sometimes include SIP `Diversion` headers if the call was previously forwarded. Twilio will forward SIP `Diversion` headers it receives to the carriers.

To combat any malicious addition of Diversion headers, Twilio will check all Diversion headers it receives that contain the Twilio domain. Twilio will verify that the phone number included in the header matches one associated with your Twilio account (either a Twilio number owned by the account or a verified Caller ID). If the header fails this check, Twilio will remove the header.

### Numbers

From this tab you will be able to:

* Buy a new Twilio Number for your Trunk
* View all Twilio Numbers currently associated with this Trunk
* Associate an existing Twilio Number with this Trunk
* Disassociate a Twilio Number from this Trunk

#### View all Twilio Numbers currently associated with this Trunk

In the "Numbers" section you will be able to view all numbers currently\
associated with this trunk. Recall that all of these numbers share the same\
origination & general settings.

You may click on a given number to view/modify its configuration.

#### Buy a new Twilio number for your trunk

A minimum of a single Twilio Phone Number is required to be able to receive\
incoming calls from the PSTN to your communications infrastructure via your\
Twilio Trunk.

Make sure you have all your trunk configuration changes saved, and then from\
the "Numbers" section select "Buy a Number".

Select the country code, and search for available numbers matching any patterns\
(e.g. +14158675309) you might want to look for in your number.

Once you find the Twilio number you would like to buy, go ahead and purchase it\
and continue to set up your number.

This will take you to the number view where you can modify the configuration\
for that number.

Under the "Voice" section select the "SIP Trunking" radio button, and from the\
dropdown list below select the desired SIP Trunk you would like to associate\
this Number with. Don't forget to save your configuration changes.

#### Associate an existing Twilio number with this trunk

In the "Numbers" section select "Associate a Number with this Trunk", which\
will display a list of all of your existing Twilio numbers. Click on the one\
you would like to associate with this trunk.

This will take you to the number view where you can modify that number's\
configuration. Under the "Voice" section, select the "SIP Trunking" radio\
button, and from the dropdown list below select the desired SIP Trunk you would\
like to associate this number with. Don't forget to save your configuration\
changes.

#### Disassociate a Twilio Number from this Trunk

You can disassociate a number from a trunk in several ways:

* From the "Numbers" section of a given trunk, you can directly disassociate a\
  phone number from the numbers list displayed by clicking on the trash button.
* By changing the "Voice" configuration of a given number to a different trunk\
  or by configuring it with an application or URL
* By deleting the trunk associated with that number

Note that when you do this, the number is disassociated from the trunk but it\
is not released from your account.

Twilio phone numbers are billed on a monthly basis. Unless you are actively\
using a number, or you want to keep a number reserved for future use, you can\
reduce your costs by releasing your unused numbers. In order to release the\
number, go to the "Voice and Messaging" section, click on "Numbers" and\
release the desired number from that page.

#### Receive your first origination call

Make your first test call by dialing your trunk's Twilio number, e.g.
`+14158675309`, and ensure your corresponding communications infrastructure
extension rings.

### Delete a Trunk

You can delete a trunk:

* From the "Trunks" section, using the trunks list displayed. Note that when
  you do this, all numbers associated with this trunk will be automatically
  disassociated from the trunk but not released. In order to release it please
  go to the "Voice and Messaging" section, click on "Numbers" and release the
  desired numbers from that section.
* From any of the trunk specific configuration screens you will have the option
  to "Delete this Trunk".

Note that when you do this, all numbers previously associated with this trunk
will be disassociated from the trunk, but they will not be released from your
account. Twilio phone numbers are billed on a monthly basis. Unless you are
actively using a number, or you want to keep a number reserved for future use,
you can reduce your costs by releasing your unused numbers. In order to release
the number, please go to the "Voice and Messaging" section, click on "Numbers"
and release the desired number from that section.

### Your Network \[#your-network]

Prepare your communications infrastructure to make sure that your SIP
infrastructure has connectivity to Twilio and vice versa.

* Configure your Termination URIs for your Twilio Trunk, optionally using a
  Localized Termination URI if you wish to manually connect to a specific
  geographic edge location of the Twilio platform.
* Allow all of Twilio's signalling and media IP addresses and ports on your
  firewall.
* Configure your infrastructure not to register for this trunk.
* Ensure that your infrastructure sends a value of 70 for the `Max-Forwards` header per RFC 3261 section 8.1.1.6,
  to ensure your call is processed successfully.
* Ensure that any phone numbers sent via SIP to Twilio are always
  E.164-formatted.
* Optionally set-up your Communications Infrastructure to issue SIP OPTIONS messages as a ping mechanism to your Elastic SIP Trunk (Send the Message Request To: Termination URI you created (`example.pstn.twilio.com`)); the Twilio platform will respond appropriately. Please maintain the Ping lower than 1 SIP OPTIONS every 10-15 seconds to avoid your requests from being banned by our Platform.

#### Deploying behind a NAT

If you're deploying behind a NAT without a Session Border Controller, it's important to keep open the NAT translation binding.

* For Signaling, when using UDP, this may be achieved by periodically sending SIP OPTIONS to Twilio, which will respond with a 200OK.
* For Signaling, when using TCP or TLS, this may be achieved by periodically sending SIP OPTIONS to Twilio, or CR-LF keep-alives (periodically sending a double-CRLF (the "ping") then wait to receive a single CRLF (the "pong") from Twilio), the latter has the smallest overhead.
* For RTP, this is usually less of an issue as media packets are sent more frequently.

#### IP addresses \[#ip-addresses]

You MUST allow *ALL* of Twilio's following IP address ranges and ports on your firewall for SIP signalling and RTP media traffic. This is important if you have Numbers in different edge locations and for resiliency purposes (e.g. if North America Virginia gateways are down, then North America Oregon gateways will be used). Twilio does not guarantee which edge location the media will egress from, without using the `edge` parameter since it can depend on which PSTN-SIP Gateway delivers the call to which Twilio edge location.

Please see Twilio's Elastic SIP Trunking [IP addresses](/docs/sip-trunking/ip-addresses) for the complete list.

For further information to help you configure your infrastructure with your
Twilio Elastic SIP Trunk, refer to the SIP Trunking [configuration guides](/docs/sip-trunking/sample-configuration).
