# Elastic SIP Trunking Configuration Guides

The following Configuration Guides are intended to help you connect your IP Communications Infrastructure (Contact Center, IP-PBX, SBC, etc) to a Twilio Elastic SIP Trunk.

We have configuration guides with the following types of IP communications infrastructure elements:

1. IP Private Branch Exchange (IP-PBX)
2. Contact Centers (CC)
3. Unified Communications (UC)
4. Session Border Controllers (SBC)

For comprehensive solution blueprints with leading Contact Centers, Unified Communications & SBCs please refer to our [Elastic SIP Trunking - Solution Blueprints](/docs/sip-trunking/solution-blueprints).

Be aware, due to the large number of versions, variations, add-ons, and options for many of these systems, the settings you see may differ from those shown in our Configuration Guides. As such, these documents are intended as general guidelines, rather than configuration templates. There is an assumption of familiarity with your network and SIP infrastructure, and how they work. Twilio cannot provide direct support for third-party products; you should contact the manufacturer for your IP communications infrastructure for assistance in configuring such products.

If you wish to share your Configuration guide to help us improve this section for other users, kindly submit them or any corrections to the existing guides to [sip.interconnectionguides@twilio.com](mailto:sip.interconnectionguides@twilio.com).

> \[!NOTE]
>
> If you do not yet have your Twilio Elastic SIP Trunk configured, please see [documentation on creating and configuring your trunks](/docs/sip-trunking).

| Vendor                                     | Type                   | Qualified for Secure Trunking |
| ------------------------------------------ | ---------------------- | ----------------------------- |
| [Asterisk](#asterisk)                      | IP-PBX                 | Yes                           |
| [FreeSwitch](#freeswitch)                  | IP-PBX                 | Yes                           |
| [3CX](#3cx)                                | IP-PBX                 | No                            |
| [Elastix](#elastix)                        | IP-PBX                 | No                            |
| [FreePBX(R)](#freepbx)                     | IP-PBX                 | Yes                           |
| [Grandstream](#grandstream)                | IP-PBX                 | No                            |
| [Genesys Cloud](#genesyspurecloud)         | Cloud Contact Center   | No                            |
| [xCally](#xcally)                          | Call Center            | Yes                           |
| [Zoom Phone](#zoom-phone)                  | Unified Communications | Yes                           |
| [Mitel MiVoice Business 7.2](#mitel)       | Unified Communications | Yes                           |
| [Ribbon Communications](#ribbon)           | E-SBC                  | Yes                           |
| [Ribbon using Microsoft Lync](#ribbonlync) | E-SBC                  | Yes                           |
| [Ribbon EdgeMarc](#ribbonedgemarc)         | E-SBC                  | No                            |
| [Audiocodes](#audiocodes)                  | E-SBC                  | Yes                           |
| [Oracle](#oracle)                          | E-SBC                  | No                            |
| [Cisco ISR](#cisco)                        | E-SBC                  | No                            |
| [inGate](#inGate)                          | E-SBC                  | Yes                           |
| [Sansay](#sansay)                          | E-SBC                  | No                            |
| [TelcoBridges](#telcobridges)              | ProSBC                 | No                            |

## IP-PBX

### Asterisk IP-PBX \[#asterisk]

Assuming you have Asterisk already set up as your IP-PBX, with one or more
telephones configured and running calls between them, the following guide provides detailed step-by-step instructions of how to configure your Trunk and your Asterisk IP-PBX.

Optionally, Twilio Elastic SIP trunking also provides [Secure Trunking][securetrunks] (SIP TLS and SRTP), see guide for configuration details.

[Click here to download the Asterisk Interconnection Guide](https://docs-resources.prod.twilio.com/documents/TwilioElasticSIPTrunking-AsteriskPBX-Configuration-Guide-Version2-1-FINAL-09012018.pdf)

### FreeSwitch IP-PBX \[#freeswitch]

Assuming you have FreeSwitch already set up as your IP-PBX, with one or more
telephones configured and running calls between them, the following Interconnection Guide provides you with step-by-step instructions to use FreeSwitch PBX with your Twilio Elastic SIP Trunk.

[Click here to download the FreeSwitch PBX Interconnection Guide][FSpdf]

#### FreeSwitch using Secure Trunking \[#freeswitchsecure]

This is supported. At this time there is no guide published but reach out to support if you have any questions.

Twilio Elastic SIP trunking also provides [Secure Trunking][securetrunks] (SIP TLS and SRTP).

This guide provides the configuration steps required to implement FreeSwitch PBX using a Twilio Elastic SIP trunk using Secure Trunks.

[Click here to download the FreeSwitch PBX with Secure Trunking Interconnection Guide](https://docs-resources.prod.twilio.com/documents/TwilioSecure-Freeswitch.pdf)

### 3CX

[Click here to see the 3CX guide to configuring Twilio Elastic SIP Trunks][3cxtwilio]

Assuming you have your 3CX already set up with one or more telephones
configured and running calls between them, the following highlights specific
configuration for use with your Twilio SIP Trunk.

* Add a new VoIP Provider account in the 3CX phone system: "Twilio"
  * Set the SIP server hostname to: example.pstn.twilio.com
  * Set your Authentication ID/username and password (as you configured in
    your user credentials on your Twilio Trunk)
* DID's and Inbound Call Identification: Enter your Twilio numbers under the
  "DID" tab.
* "Advanced" under "Codec priorities" only include G711 U-law
* Create Outbound Call Rules: setting calls to numbers with a length of 10, and
  also prepend a "+1". This will ensure E164 formatting.

[Click here to download the 3CX Interconnection Guide][3CXpdf]

### Elastix \[#elastix]

If you want to use Elastix IP-PBX with your Twilio Trunk, the following guide provides detailed step-by-step instructions of how to configure your Trunk and your IP-PBX.

[Click here to download the Elastix Interconnection Guide][Elastixpdf]

### FreePBX \[#freepbx]

Assuming you have FreePBX already set up as your IP-PBX, with one or more
telephones configured and running calls between them, the following highlights
specific configuration for use with your Twilio Trunk.

[Click here to download the FreePBX Interconnection Guide](https://docs-resources.prod.twilio.com/documents/TwilioElasticSIPTrunking-FreePBX-Configuration-Guide-Version1-0-FINAL-06122018.pdf)

### GrandStream UCM \[#grandstream]

The following Interconnection Guide provides you with step-by-step instructions to use GrandStream UCM with your Twilio Elastic SIP Trunk.

[Click here to download the Grandstream Interconnection Guide](https://docs-resources.prod.twilio.com/documents/Twilio_UCM61xx_Configuration1-24-2017.pdf)

## Contact Centers

### Genesys Cloud \[#genesyspurecloud]

The following Interconnection Guide provides you with step-by-step instructions to use Genesys Cloud BYOC your with Twilio Elastic SIP Trunk.

[Click here to download the Genesys Cloud Interconnection Guide][GenesysPureCloudsite]

### xCally Call Center \[#xcally]

The following Interconnection Guide provides you with step-by-step instructions to use XCally Call Center your with Twilio Elastic SIP Trunk.

[Click here to download the xCally Interconnection Guide][XCpdf]

## Unified Communications

### Zoom Phone

[Zoom Phone](https://zoom.us/phonesystem) is an enterprise cloud phone system. It offers two "bring your own carrier" (BYOC) approaches, called *Zoom Phone Premise Peering PSTN* and *Zoom Phone Carrier Peering PSTN*. Both provide organizations the flexibility to select their voice services for Zoom Phone.

The [Zoom Phone configuration guide](/docs/sip-trunking/connect-to-zoom-phone) explains your next steps.

### Mitel MiVoice Business 7.2 \[#mitel]

The following guide is not maintained by Twilio. Please see Mitel Knowledge base for latest guide.

[Click here to download the Mitel MiVoice configuration Guide](https://docs-resources.prod.twilio.com/documents/Twilio_Mitel_MiVoice_Sip.pdf)

## Enterprise Session Border Controller (E-SBC)

### Ribbon Communications SBCs \[#ribbon]

[Microsoft Teams and Cisco UCM using Ribbon E-SBC and Twilio Elastic SIP Trunking Configuration Guide](https://docs-resources.prod.twilio.com/documents/InteropGuide_Twilio_SweLite_CUCM_Teams_Final1.1.pdf)

### Ribbon E-SBC 5000 using Microsoft Lync \[#ribbonlync]

Assuming you have your E-SBC already set up, the following highlights specific configuration for your Ribbon E-SBC for interworking with Microsoft's Lync Server 2013 environment using your Twilio Trunk.

[Click here to download the Ribbon Microsoft Lync Interconnection Guide][Sonuspdf]

### Ribbon EdgeMarc \[#ribbonedgemarc]

Assuming you have your SBC already set up with one or more telephones
configured and running calls between them, the following highlights specific
configuration for use with your Twilio Trunk.

Navigate to "VoIP">"SIP" to configure the SIP server info for Twilio. Enter in
the SIP Server FQDN assigned for these services under the SIP Server Address
field. Fill in the SIP Server Domain field with the proper Twilio domain.

*Note*: Make sure to check the "Limit Inbound to listed Proxies" and "Limit
Outbound to listed Proxies" boxes to help prevent fraudulent activity sourced
from a LAN side PBX or a WAN side DoS attack.

![SIP settings with server address, port 5060, UDP transport, and domain options.](https://docs-resources.prod.twilio.com/43ec8e7ad98a47d2b2404ca49301fbca43bfda54c47d0aa5b11d50af421423b7.png)

Navigate to "VoIP ALG" and then "B2BUA" to configure the SIP Trunk registration with the
soft-switch (between the Ribbon EdgeMarc and the WAN side soft-switch), the PBX for
SIP registration mode (between the PBX and LAN side of the Ribbon EdgeMarc), inbound
rule (for sending SIP messages from the WAN side of the Ribbon EdgeMarc to the PBX)
and outbound rule (for sending the SIP messages from the Ribbon EdgeMarc to the WAN
soft-switch). RFC-4904 support will be handled by applying header manipulation
action rules to the matched outbound rules.

Configuring the PBX for SIP registration mode (between PBX and the Ribbon EdgeMarc).
From the "Trunking Devices" section:

* Click the "New Row" button to get to a new entry for a Trunking Device.
* Enter a PBX name in the "Name" field.
* Select the correlating PBX from the drop-down list of the "Model" field.

![Trunking device settings with Asterisk, IP 10.10.139.11, port 5060, and UDP transport.](https://docs-resources.prod.twilio.com/f8e352f011a770e8949c7590384e0806c5bba2778bcdcf3045268afc3e0c6a2f.png)

* Select IP Registration mode by selecting the radio button for using the IP
  field and Port field.
* Enter the PBX IP in the "IP" field.
* Enter 5060 in the "Port" field. Click "Update" to create a Trunking
  Device for PBX. Click "Submit" at the bottom of the page to send the
  config to the Ribbon EdgeMarc.

Configure the Ribbon EdgeMarc default inbound rule (for sending the SIP messages from
the Ribbon EdgeMarc to the PBX). This is required in order for non-pilot DIDs to
reach the PBX.

From the Actions section:

* Click the "New Row" button to get a new entry for creating an inbound action.
* Enter the action name in the "Name" field.
* Select the radio button of "Trunking Device".
* Select the PBX from the drop-down list next to "Trunking Device".

![EdgeMarc settings for inbound trunking with options for device, client, URI, and response.](https://docs-resources.prod.twilio.com/f54ba0a928e0d2480eb5042a799987069f72f890f348d55c473fac0b0850be1b.png)

* Click the "Update" button.

From the Match section:

* Click the "New Row" button to get a new entry for an inbound rule.
* Select "Inbound" in the "Direction" field.
* Select the radio button of "Default".
* Select "InboundAction" from the drop-down list of the "Action" field.
* Click the "Update" button.

![EdgeMarc rule settings showing inbound and outbound modes with match patterns and actions.](https://docs-resources.prod.twilio.com/736195583221e57b4debb9109823f2921706ba40c7717183a1fc34640193379e.png)

From the Match section:

* Click the "New Row" button to start a new entry for an outbound rule.
* Select "Outbound" in the "Direction" field.
* Select the radio button of "Pattern match", select "Calling" from the
  drop-down list and enter a "." or match the partial DID map (for example, if
  there is `6785551111-1115`, then use `678555111X`) in the "Pattern match" field to
  match any calling numbers.
* Select "Any" from the "Source" field.
* Select `OutboundAction1` from the drop-down list of the "Action" field.
* Click the "Update" button.

![EdgeMarc Default Rule Settings.](https://docs-resources.prod.twilio.com/736195583221e57b4debb9109823f2921706ba40c7717183a1fc34640193379e.png)

* Click "Submit" at the bottom of the page to send the config to Ribbon EdgeMarc.

### Audiocodes SBC \[#audiocodes]

[Click here to download the Audio Codes using Microsoft Teams Direct Routing Guide](https://docs-resources.prod.twilio.com/documents/Microsoft_Teams_and_Twilio_ESIPT_using_AudioCodes_Mediant_E-SBC_Configuration_Guide.pdf)

[Click here to download the Audio Codes using Microsoft Lync Interconnection Guide][ACpdf]

### Oracle E-SBC \[#oracle]

Assuming you have your SBC already set up with your IP-PBX, with one or more
telephones configured and running calls between them, the following highlights
specific configuration for use with your Twilio trunk.

Make sure you have your Network & Physical Interfaces appropriately configured.

Configure your Trunk SIP Interface towards Twilio:

```bash
sip-interface
state               enabled
realm-id            OUTSIDE
description
sip-port
address             X.X.X.X   (add this to your Twilio IP ACL)
port                5060
transport-protocol  UDP
tls-profile
allow-anonymous     agents-only
ims-aka-profile
carriers
trans-expire        0
...
```

Configure your Session Agent towards Twilio:

```bash
session-agent
hostname          example.pstn.twilio.com
ip-address
port              5060
state             enabled
app-protocol      SIP
app-type
transport-method  UDP
realm-id          OUTSIDE
egress-realm-id
description       Twilio
carriers
allow-next-hop-lp enabled
constraints       disabled
...
```

The second example presented here illustrates adding `+1` to called numbers (To
and Request-URI headers) for all SIP trunk endpoints in a particular realm.

Firstly, define the session-translation with a called rule:

```bash
session-translation
id             addCalledPlusOne
rules-calling
rules-called   addPlusOne
```

Then define the rule to append `+1`:

```bash
translation-rules
id            addPlusOne
type          add
add-string    +1
add-index     0
delete-string
delete-index  0
```

Lastly, apply the translation as outgoing to the SIP trunk realm:

```bash
realm-config
identifier          OUTSIDE
...
in-translationid
out-translationid   addCalledPlusOne
...
```

Set the preferred codec to G711 mu-law. In the example below, the Net-Net SD
manipulates the codec list for all PBXs in the PBXs realm such that PCMU appear
first in the media descriptor offered to the SIP trunk:

```bash
realm-config
identifier  PBXs
...
options     preferred-codec=PCMU
...
```

### Cisco ISR (Cisco 28xx, 29xx, 38xx, 39xx, 43xx etc.) \[#cisco]

Assuming you have your ISR already set up with one or more telephones
configured and running calls between them, the following highlights specific
configuration for use with your Twilio Trunk.

If you use credentials for outbound calls, you must use the B2BUA built into
Cisco IOS:

```bash
sip-ua
authentication username anniebp password 7 15431A0D1E0A1C171060302610 realm sip.twilio.com
registrar dns:example.pstn.twilio.com expires 3600
sip-server dns:example.pstn.twilio.com
!
```

Update your Trust List:

```bash
voice service voip
ip address trusted list
ipv4 54.172.60.0/23
ipv4 54.171.127.192/26
ipv4 54.65.63.192/26
ipv4 54.169.127.128/26
ipv4 54.252.254.64/26
ipv4 177.71.206.192/26
allow-connections sip to sip
!
```

* TWILIO accepts 'Early offer' only, so Cisco users/partners would have to force call as Early offer.
* Use SIP normalization profile to change 'From' header to include IP address of CUBE router instead of DNS name

Ensure all numbers use full E.164 format, so transform all outbound calls to
E.164 before sending to Twilio. The rules below are doing 2 things: changing
this outbound call from `919803331212` to `+19803331212` and changing the ANI
from `4002` to `9802180999`.

```bash
voice translation-rule 1
 rule 1 /^91/ /+1/
!
voice translation-rule 2
 rule 1 /4004/ /9802180971/
 rule 2 /4002/ /9802180999/
 rule 3 /4005/ /9802180980/
!
!
voice translation-profile twilio
 translate calling 2
 translate called 1
!
```

Lastly, you may have a dial-peer with 91\[2-9]..\[2-9]...... in order to catch the
calls. You can see the translation profile that is applied to translated the
number to E.164. Also ensure G.711 codec is used. The 'session target
sip-server' is what target the sip B2BUA configured above with the 'sip-ua'
command.

```bash
dial-peer voice 200 voip
translation-profile outgoing twilio
destination-pattern 91[2-9]..[2-9]......
session protocol sipv2
session target sip-server
dtmf-relay rtp-nte sip-kpml sip-notify
codec g711ulaw
no vad
!
```

### inGate SIParator \[#inGate]

The following Interconnection Guide provides you with step-by-step instructions to use inGate SIParator E-SBC with Twilio Elastic SIP Trunk. Optional steps to configure SIP over TLS and SRTP (\[Secure Trunking]\[securetrunks]) are also included in this guide.

[Click here to download the inGate Interconnection Guide][inGatepdf]

### Sansay \[#sansay]

Assuming you have your SBC already set up with one or more telephones configured and running calls between them, the following highlights specific configuration for use with your Twilio Trunk.

![Sansay Resource Edit screen showing SIP trunk configuration with peering and protocol settings.](https://docs-resources.prod.twilio.com/0e2a14be8326a7cab3479fa200d945654e9c730eaad4cdd3f40b23e00f53702a.png)

![Sansay configuration showing codec policy enforced with g711u 64k and FQDNs with netmask and capacity settings.](https://docs-resources.prod.twilio.com/5694ab18b93eee3c8fc25ab4f20cbc3afe2ffacb6ea8473e8498b384e9ab0187.png)

![Sansay SIP trunking configuration with settings for Twilio peering, including trunk ID 20000 and service port 5060.](https://docs-resources.prod.twilio.com/3db4373aa60e3627828c5e45513696bae984b992e9070612242f167f390a2e8d.png)

![Sansay configuration showing digit translation, RN handling, codecs, and FQDN settings.](https://docs-resources.prod.twilio.com/b0977f28ed14f3681b8c41ac5dbad063a3ef7259425b6e8bf40ff1d5806b99f0.png)

### TelcoBridges \[#telcobridges]

The following Interconnection Guide provides you with step-by-step instructions to use TelcoBridges ProSBC with Twilio Elastic SIP Trunking.
[Click here to download the TelcoBridges ProSBC Interconnection Guide](https://docs-resources.prod.twilio.com/documents/Configuration_Guide_Twilio_ESIPT_Using_TelcoBridges_ProSBC_Final_1.2.pdf)

[inGatepdf]: /resources/images/docs/Twilio-inGate.pdf

[ACpdf]: /resources/images/docs/AudioCodesLync.pdf

[Sonuspdf]: /resources/images/docs/Twilio-Sonus.pdf

[XCpdf]: /resources/images/docs/Twilio-xCally.pdf

[GenesysPureCloudsite]: https://community.genesys.com/viewdocument/re-twilio-sip-trunk-with-purecloud?CommunityKey=bab95e9c-6bbe-4a13-8ade-8ec0faf733d4&tab=librarydocuments

[Elastixpdf]: /resources/images/docs/Twilio-Elastix.pdf

[3CXpdf]: /resources/images/docs/3CX-Twilio.pdf

[3cxtwilio]: https://www.3cx.com/docs/sip-trunk/twilio/

[securetrunks]: /docs/sip-trunking#securetrunking

[FSpdf]: /resources/images/docs/Twilio-Freeswitch.pdf
