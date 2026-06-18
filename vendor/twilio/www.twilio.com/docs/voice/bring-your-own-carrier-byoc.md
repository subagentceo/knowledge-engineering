# Bring Your Own Carrier (BYOC) Trunking for Programmable Voice

Twilio Bring Your Own Carrier Trunking, or BYOC Trunking for Voice, allows you to use your existing PSTN Voice Carrier partner(s), keep your phone numbers with that Carrier, and add Twilio Programmable Voice capabilities to those calls/numbers. BYOC Trunking lets you control your voice connectivity, while unlocking the agility, scalability, and global reach Twilio is known for.

* Porting is no longer a barrier; keep your existing carriers, numbers and regulatory compliance
* Continue to use your existing Infrastructure; you decide when to deprecate
* One application, many uses; solve problems anywhere, regardless of your PSTN connection(s)
* Twilio's Super Network keeps you up and running, even if your carriers are not

![Diagram showing BYOC trunking with PSTN carrier, customer network, and Twilio integration.](https://docs-resources.prod.twilio.com/8f99fd5dff88f9e62d79a5a8a7bcba550036337c7acb5658d310f6da208cda5a.png)

## Getting Started: Configure your BYOC Trunk

We've created the concept of a "BYOC Trunk" that is optimized for this use-case: A SIP Trunk to interconnect your PSTN Carrier to the Twilio platform. A BYOC Trunk has two directions:

* BYOC Termination: Receive incoming calls to your Phone Numbers from your BYOC carrier to Twilio.
* BYOC Origination: Send outgoing calls from Twilio to your BYOC carrier.

![Diagram showing BYOC termination and origination between PSTN carrier and Twilio.](https://docs-resources.prod.twilio.com/92d79e68367acb0672ebd5729ed3c495a6c50ad0d4c436b494c89d672df55122.png)

### Before You Begin

Before you can use Twilio BYOC Trunks, you must sign up for a Twilio account (if you don't already have one). To sign up for an account click [here](https://www.twilio.com/try-twilio)

### Requirements

To use Twilio BYOC Trunks, you'll need to ensure that you have a Carrier partner that can send or receive SIP traffic directly to/from Twilio.

The connection to Twilio can be configured in one of two ways:

* Calls can be sent to a Fully Qualified Domain Name (FQDN) of the format \[customer-name].sip.us1.twilio.com over the Public Internet
* Calls can be sent to a singular IP address over a Private Connection (requires Twilio Interconnect)

### Console

## Twilio Console

1. Open [Twilio Console](https://1console.twilio.com/) and go to [**Voice** > **BYOC Trunks**](https://1console.twilio.com/go?to=/account/__account__/us1/voice/byoc-trunks/trunks).
2. Use the BYOC Trunks page to create, configure, or delete trunks.

## Legacy Console

Log in to the [legacy Console](https://console.twilio.com/) and go to [**Voice** > **Manage** > **BYOC Trunks**](https://console.twilio.com/us1/develop/voice/manage/byoc-trunks).

### BYOC Trunks - Overview

Under the "Overview" menu you will have access to the configuration aspects of your BYOC Trunks. Specifically, you will have links to:

* *Trunks:* List of your existing BYOC Trunks. Create, configure, or delete your trunks.
* *Termination SIP Domains:* Create, configure, or delete the individual SIP Termination Domains in your account.
* *Origination Connection Policy*: Create, configure, or delete the individual Origination Connection Policies in your account.
* *IP Access Control Lists*: Create, configure, or delete the individual IP Access Control Lists in your account.
* *Credential Lists*: Create, configure, or delete the individual Credential Lists in your account.
* Networking Info: Display the trunk-specific Domain URIs and IP allow list information for your Trunks

Upon initial access, you will be taken directly to the "Trunks" listing, with a list of your existing BYOC Trunks displayed.

From there, you can click on each one to modify its configuration or delete the trunk from your account, or click on the "Create BYOC trunk" button to create a new trunk.

#### Trunks

Twilio BYOC Trunks are a cloud based solution that provides the ability to use Twilio Programmable Voice functionality on calls to/from your PSTN numbers that you already have with other Carriers. A trunk is composed of the following settings:

* *Properties*: Provide a friendly name for your trunk and see its unique identifier (BYOC SID).
* *Termination SIP Domains:* Configure the settings used by your PSTN Carrier to send traffic inbound to Twilio.
* *Origination Connection Policy:* Configure the settings for delivering traffic outbound from Twilio to your PSTN Carrier.
* *Application Configuration:* Provide the URL Webhook to your application that will give TwiML instructions on how to handle inbound calls from your BYOC Carrier.

**Properties**

These settings apply to the entire trunk regardless of the direction of your traffic.

**Friendly Name:** Provide a friendly name for your trunk.

**BYOC Trunk SID:** This is the unique identifier of this BYOC trunk, and is assigned automatically once you create a trunk.

**Termination SIP Domain SIP Domains:** To select one of your already-configured Termination SIP Domains, click the "SIP Domains" Pull-Down Menu here and choose the one you want to use. If you do not have any Domains already configured, or want to add a new one, click the "+" button to the right of the Pull-Down Menu.

**Show Localized URIs:** Click this link to see the local FQDNs your BYOC Carriers can use to access Twilio in specific global regions.

**Origination Connection Policy Destination:** To select one of your already-configured Origination Connection Policies, click the "Destination" Pull-Down Menu here and choose the one you want to use. If you do not have any Policies already configured, or want to add a new one, click the "+" button to the right of the Pull-Down Menu.

**Application Configuration A Call Comes In:** Here you specify a handler that Twilio will invoke upon receipt of a SIP INVITE. You can configure this field to use a Webhook, TwiMLbin, Twilio Function, or Twilio Studio.

**Primary Handler Fails (optional):** If the Primary Handler configured above fails (for instance, due to a network anomaly), then optionally you can specify that this handler be invoked. The same handler methods are available for this setting.

**Call Status Changes (optional):** You can specify a HTTP URL for Twilio to send webhook status requests to as a call progresses, from initiated, to ringing, to answered, to completed.

**From Domain:** Select which Termination SIP Domain Twilio uses as the From-URI for origination calls sent out over this BYOC Trunk. If you leave this unset, Twilio falls back to the first Termination SIP Domain on the trunk. Use this setting when your PSTN carrier needs to see a specific domain in the `From:` header to accept outbound traffic. Edit this in [Twilio Console](https://1console.twilio.com/go?to=/account/__account__/us1/voice/byoc-trunks/trunks) on the BYOC Trunk's details page.

### BYOC Trunks Settings

#### Termination SIP Domains - Settings

Configuring your termination settings will allow your PSTN carrier to send traffic inbound to Twilio. In order to use a BYOC trunk for termination it must have a Termination SIP Domain URI and at least one authentication scheme (IP Access Control Lists and/or Credentials Lists).

To edit or delete one of your already-configured Termination SIP Domains, click that Domain in the list. If you do not have any Domains already configured, or want to add a new one, click the "+" button.

**SIP Domain URI Friendly Name:** Provide a friendly name for your Termination SIP Domain.

**Termination SIP URI:** Configure a unique SIP Domain Name to identify your Termination SIP URI for this trunk. This URI will be used by your PSTN Carrier to direct SIP traffic towards Twilio.

* `{example}.sip.twilio.com`

Twilio recommends that you use a dash instead of a dot to improve readability of your domain. However, in some cases you may prefer a sub-domain like a.b.sip.twilio.com of the higher-level domain b.sip.twilio.com

A sub-domain like a.b.sip.twilio.com can be created under the following requirements:

* The higher-level domain (b.sip.twilio.com) must be created first
* The higher-level domain (b.sip.twilio.com) must be created by the same account or the parent account

Then you or your PSTN carrier would configure a trunk on your/their communications infrastructure (e.g. IP-PBX or SBC), and point it towards `{example}.sip.twilio.com` for outbound traffic towards Twilio.

**Show Localized URIs:** If you want to manually connect to a specific geographic region that's closest to the location of your communications infrastructure, you may do so by pointing your/their communications infrastructure to any of the following localized Termination SIP URIs:

* `{example}.sip.us1.twilio.com` (North America Virginia)
* `{example}.sip.us2.twilio.com` (North America Oregon)
* `{example}.sip.ie1.twilio.com` (Europe Ireland)
* `{example}.sip.de1.twilio.com` (Europe Frankfurt)
* `{example}.sip.sg1.twilio.com` (Asia Pacific Singapore)
* `{example}.sip.jp1.twilio.com` (Asia Pacific Tokyo)
* `{example}.sip.br1.twilio.com` (South America São Paulo)
* `{example}.sip.au1.twilio.com` (Asia Pacific Sydney)

Note: *Redundancy with Termination URIs*: Twilio's SIP Interfaces use an FQDN (`{example}.sip.twilio.com`) as a Termination URI that is used by communications infrastructures to direct SIP traffic towards Twilio. As explained in the previous section, localized Termination URIs are available.

For example, `{example}.sip.us1.twilio.com`, this specific FQDN resolves in the following DNS A-Record:

| **Type** | **IP Address** | **TTL** |
| -------- | -------------- | ------- |
| A        | 54.172.60.3    | 10 min  |
| A        | 54.172.60.0    | 10 min  |
| A        | 54.172.60.2    | 10 min  |
| A        | 54.172.60.1    | 10 min  |

For each region we have 3-4 IP addresses that are used for reliability purposes (see [IP addresses](/docs/sip-trunking)). Each of these IP addresses represents a unique public edge for our SIP Interfaces service into the Twilio cloud, distributed across multiple Availability Zones for reliability purposes.

Twilio recommends that you don't peg towards a single IP address but rather *utilize all IP addresses* and failover in case one IP is not responding.

A common strategy, which we deploy internally and what we have instructed our carriers to do towards us as well, is that if there is no response to an INVITE, go to the next IP after 4 seconds. A single machine behind a single IP will always fail at some point so the overall solution must take that into consideration and guard itself towards these failures.

Furthermore, if there is a complete US1 outage, it is recommended that you failover to another region (e.g. If connecting to US1, failover to US2), keeping in mind that region will in turn resolve to 3-4 different IP addresses for reliability.

**Static IP Address (Limited Availability)**

> \[!WARNING]
>
> This feature is not currently available when using [Twilio
> Regions](/docs/global-infrastructure) Ireland (IE1) or Australia (AU1). This
> is currently only supported with the default US1 region. For a full list of
> unsupported products and features with Twilio Regions, see [Regional product and feature availability](/docs/global-infrastructure/regional-product-and-feature-availability).

**Static IP Addresses:** To select one of your already-configured Static IP Addresses, click the "Static IP LIsts" Pull-Down Menu here and choose the one you want to use. If you do not have any Static IP Addresses already configured, or want to add a new one, click the "+" button to the right of the Pull-Down Menu.

*NOTE:* Static IP Address(es) for your Termination SIP Domain are used only when addressing Twilio via IP Addresses instead of an FQDN. When Static IP Addresses are used, the IP-ACLs listed below will NOT be used for Authentication. Static IP addresses require a Twilio Interconnect connection on your account; the Static IP addresses used here must be a subset from the IP addresses configured on your Twilio Interconnect connections.

**Limited Availability:** Please contact your Twilio Sales Representative or [talk to Twilio Sales](https://www.twilio.com/en-us/help/sales) if you require a Static IP address for your BYOC Trunk.

**Authentication**

Configure the authentication details to ensure the security/authenticity of your termination traffic. You must configure a minimum of either an IP Access Control List (ACL) or Credential authentication on your BYOC Trunk's Termination SIP Domain. If you configure both, then both ACLs *and* Credentials are enforced.

**IP Access Control Lists:** To select one of your already-configured ACLs, click the "IP Access Control Lists" Pull-Down Menu here and choose the one you want to use. If you do not have any ACLs already configured, or want to add a new one, click the "+" button to the right of the Pull-Down Menu.

**Credential Lists:** To select one of your already-configured Credential Lists, click the "Credential Lists" Pull-Down Menu here and choose the one you want to use. If you do not have any Credential Lists already configured, or want to add a new one, click the "+" button to the right of the Pull-Down Menu.

*Note*: It is highly recommended that you configure User Credentials. IP ACLs alone does not protect against certain types of attacks.

**Call Control Configuration Configure With:** As you are configuring the Domain for a BYOC Trunk, this setting is set to "BYOC Trunk".

**SIP Trunk:** To select one of your already-configured Credential Lists, click the Pull-Down Menu here and choose the one you want to use.

Secure Media

**Enabled/Disabled:** Select whether to enable or disable secure communications (TLS/SRTP) for your BYOC Termination traffic.

*NOTE:* This switch is only effective on Termination (inbound) traffic from your PSTN Carrier; it does not affect Origination traffic on the linked BYOC Trunk.

#### Origination Connection Policy - Settings

Configuring your Origination Connection Policy settings will allow you to originate outbound traffic from Twilio, and have it delivered to your PSTN Carrier.

To edit or delete one of your already-configured Origination Connection Policies, click that OCP in the list. If you do not have any OCPs already configured, or want to add a new one, click the "+" button.

Properties

**Friendly Name:** Provide a friendly name for your Origination Connection Policy.

**Origination Connection Policy SID:** This is the unique identifier of this OCP, and is assigned automatically once you create the policy.

Origination Target

To edit or delete an already-configured Origination URI, click that URI in the list. If you do not have any Origination URIs already configured, or want to add a new one, click the "+" button.

**Origination URI:** Configure your origination SIP URI, which identifies the network element entry point into your PSTN Carrier. The host part of the SIP URI may be either an IP address or a Fully Qualified Domain Name (FQDN). You can use [multiple origination URIs](/docs/sip-trunking) for failover or load balancing.

**Priority:** The priority field determines the precedence of use of the SIP URI. Twilio will always use the SIP URI with the lowest-numbered priority value first, and fallback to other SIP URIs of equal or higher value if the session to that SIP URI fails. If a service has multiple origination SIP URIs with the same priority value, Twilio will use the weight field to determine which SIP URI to use. Priority ranks the importance of the URI. Values range from 0 to 65535, where the lowest number represents the highest importance.

**Weight:** The weight value is relevant only in relation to other SIP URIs with the same priority value. Weight is used to determine the share of load when more than one URI has the same priority. Weight values range from 1 to 65535. The higher the value, the more load a URI is given.

**Enabled:** Enable/Disable the specific Origination Target.

> \[!NOTE]
>
> Twilio does not support authentication with the carrier via credentials for
> BYOC origination calls. The carrier needs to treat Twilio as a trusted entity
> and allow traffic from the appropriate [Regional Twilio IP
> addresses](/docs/sip-trunking/ip-addresses).

#### IP Access Control Lists - Settings

To edit or delete one of your already-configured ACLs, click that Friendly Name in the list. If you do not have any ACLs already configured, or want to add a new one, click the "+" button.

Properties

**Friendly Name:** Give the Access Control List a friendly name that is descriptive of that list of IPs. Something like "Dallas Datacenter IPs".

Add an IP Address Range

**CIDR Network Address:** Add IP addresses or ranges in CIDR notation to your new IP Access Control List (these should be the IP addresses used for outbound SIP traffic by your Communications Infrastructure border elements, e.g. SBC). **Friendly Name:** Give your IPs a friendly name that is descriptive of what that IP is, for example "Production SBC".

#### Credential Lists - Settings

To edit or delete one of your already-configured Credential Lists, click that Friendly Name in the list. If you do not have any Credential Lists already configured, or want to add a new one, click the "+" button.

Properties

**Friendly Name:** Give the Credential List a friendly name that is descriptive of the user you're authenticating. Something like "Admin, Twilio".

Add Credentials

**Username:** Enter a username (these should be the username used for digest authentication for outbound SIP traffic by your communications infrastructure border elements, e.g. SBC). **Password:** Enter the corresponding password for that user.

*Note*: If you are using User Credentials, a SIP INVITE to your Twilio Termination SIP Domain will be challenged with a 407 Proxy Authentication Required requesting the appropriate user credentials.

### Making Calls

#### Making Outbound Calls to your PSTN Carrier (Origination)

You can make calls over your BYOC Trunk to your PSTN Carrier using either TwiML, the Voice API Calls resource, or by [adding a participant to an existing Conference](/docs/voice/api/conference-participant-resource).

#### TwiML

Dialing via TwiML is done using the ***byoc*** parameter of the \<Dial> verb's [\<Number> noun](/docs/voice/twiml/number). The syntax is as follows:

`<Dial><Number byoc="{Your-BYOC=Trunk_SID}">+14158675309</Number></Dial>`

#### API

Dialing via the Voice API is done using the ***Byoc*** parameter of the [Calls](/docs/voice/api/call-resource#create-a-call-resource) resource. The syntax can be gleaned from the following Curl example:

`curl 'https://api.twilio.com/2010-04-01/Accounts/{Your Account SID}/Calls.json' -X POST --data-urlencode 'To=+14158675309' --data-urlencode 'From=+14155551212' --data-urlencode 'Url={Your Twilio App URL}' --data-urlencode 'Byoc={Your-BYOC=Trunk_SID}' -u {Your Account SID}:{Your Auth Token}`

#### Conference

Adding participants to an existing Conference can be done using the Byoc parameter of the [Participant](/docs/voice/api/conference-participant-resource#create-a-participant) resource. The syntax can be gleaned from the following Curl example:

`curl https://api.twilio.com/2010-04-01/Accounts/{Your Account SID}/Conferences/{Your Conference SID}/Participants.json -X POST --data-urlencode "From=+14155551212" --data-urlencode "To=+14158675309" --data-urlencode 'Byoc={Your-BYOC=Trunk_SID} -u {Your Account SID}:{Your Auth Token}`

#### Receiving Calls from Your PSTN Carrier (Termination)

Your PSTN Carrier should point their SIP traffic to a SIP Termination Domain URI that you have associated with your Twilio BYOC Trunk. If anyone makes a SIP request using that domain, (e.g. `sip:alice@example.sip.us1.twilio.com`), it will be routed over the internet to Twilio. When a SIP request is received on this domain, the BYOC Trunk is used to determine the authentication criteria and subsequently used to look up the configured URL to webhook to your application that will provide instructions on how to handle the incoming SIP call. [See how Twilio passes data to your application](/docs/voice/twiml).
