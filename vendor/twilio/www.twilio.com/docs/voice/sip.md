# SIP

## Session Initiation Protocol

Session Initiation Protocol ([SIP](/docs/glossary/what-is-session-initiation-protocol-sip)) is a signaling protocol for initiating, terminating and modifying user sessions over an IP network.

### [How Twilio Uses SIP](/docs/glossary/what-is-session-initiation-protocol-sip#how-twilio-uses-sip)

[Using SIP to connect to Twilio is one way](https://www.twilio.com/en-us/voice/sip-interface) to get access to Twilio's global reach and powerful automation and scripting functions.

You can connect your on-site or virtual Private Branch Exchange (PBX) with Twilio's servers. Here's our overview of [connecting your existing SIP communications](/docs/voice/api/sending-sip) infrastructure to us.

> \[!NOTE]
>
> For information about SIP Trunking with Twilio, check out our [Elastic SIP Trunking documentation](/docs/sip-trunking).

Dig into our [API Reference docs for Twilio's SIP Domains](/docs/voice/sip/api):

* [SIP Credential Resource](/docs/voice/sip/api/sip-credential-resource)
* [SIP CredentialList](/docs/voice/sip/api/sip-credentiallist-resource)[Resource](/docs/voice/sip/api/sip-credentiallist-resource)
* [SIP CredentialListMapping](/docs/voice/sip/api/sip-credentiallistmapping-resource)[Resource](/docs/voice/sip/api/sip-credentiallistmapping-resource)
* [SIP Domain](/docs/voice/sip/api/sip-domain-resource)[Resource](/docs/voice/sip/api/sip-domain-resource)
* [SIP IpAccessControlList Resource](/docs/voice/sip/api/sip-ipaccesscontrollist-resource)
* [SIP IpAccessControlListMapping Resource](/docs/voice/sip/api/sip-ipaccesscontrollistmapping-resource)
* [SIP IpAddress Resource](/docs/voice/sip/api/sip-ipaddress-resource)

## Manage SIP Domains in Twilio Console

You can create and configure SIP Domains, IP Access Control Lists, and Credential Lists in [Twilio Console](https://1console.twilio.com/go?to=/account/__account__/us1/voice/sip-domains/sip-domains) or in the [legacy Console](https://console.twilio.com/us1/develop/voice/manage/sip-domains).

### View registered SIP endpoints

On a SIP Domain's details page, you can see all devices registered with the Domain. Each entry shows the contact address, user agent, registration source IP, and expiration time. Use this to confirm registrations succeeded and to troubleshoot clients that aren't reachable.

## Twilio Console

In [Twilio Console](https://1console.twilio.com/go?to=/account/__account__/us1/voice/sip-domains/sip-domains), go to **Voice** > **SIP domains**, select your SIP Domain, and then open the **Registered endpoints** tab.

## Legacy Console

In the [legacy Console](https://console.twilio.com/us1/develop/voice/manage/sip-domains), go to **Voice** > **Manage** > **SIP Domains**, select your SIP Domain, and then open the **Registered SIP Endpoints** section.

Registrations are Region-specific — endpoints only appear in the Region where the SIP Domain is routed. See [Regional SIP Domains](/docs/global-infrastructure/regional-sip-domains) for more on Region routing.

### Enable Secure Media

Secure Media enforces SRTP for media on calls to and from the SIP Domain. When Secure Media is enabled, Twilio rejects calls that don't negotiate SRTP. Make sure your SIP clients and SBCs are configured for SRTP before enabling this setting in production.

## Twilio Console

1. In [Twilio Console](https://1console.twilio.com/go?to=/account/__account__/us1/voice/sip-domains/sip-domains), go to **Voice** > **SIP domains** and select your SIP Domain.
2. On the **Secure media** card, select **Enable secure media**.

## Legacy Console

1. In the [legacy Console](https://console.twilio.com/us1/develop/voice/manage/sip-domains), go to **Voice** > **Manage** > **SIP Domains** and select your SIP Domain.
2. On the **Secure Media** card, select **Edit** and enable the setting.

### Re-route a SIP Domain to a different Region

A SIP Domain can exist in multiple [Twilio Regions](/docs/global-infrastructure/understanding-twilio-regions) but is only active in one Region at a time.

## Twilio Console

1. In [Twilio Console](https://1console.twilio.com/go?to=/account/__account__/us1/voice/sip-domains/sip-domains), go to **Voice** > **SIP domains** and select your SIP Domain. The **Active region** section shows which Region is active.
2. To change the active Region, select **Change active region**, select the target Region, and then select **Update region**.

## Legacy Console

On the Domain's details page in the target Region in the [legacy Console](https://console.twilio.com/us1/develop/voice/manage/sip-domains), select **Re-route** on the routing card to make that Region active.

See [Regional SIP Domains](/docs/global-infrastructure/regional-sip-domains) for details.
