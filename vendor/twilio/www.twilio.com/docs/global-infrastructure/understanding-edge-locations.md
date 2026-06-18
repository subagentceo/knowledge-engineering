# Understanding Edge Locations

Twilio operates a collection of [network edges](/docs/glossary/what-is-a-network-edge) around the world, called Edge Locations. Edge Locations are the entry and exit points where your application's network traffic connects to Twilio's platform.

How your traffic reaches an Edge Location depends on your connection type:

* **REST API** (HTTPS): When you send an HTTPS request to the Twilio REST API, Twilio's CDN uses geo-aware DNS to route the request to the nearest Edge Location automatically. You don't choose an edge location. Instead, you select a **processing region** by using the appropriate hostname.
* **Voice SDKs and SIP**: When you use Voice SDKs or SIP in your application, it connects to a specific Edge Location. The chosen Edge Location directly influences media latency and call quality.
* **Interconnect** (private connection): You select a specific Edge Location for guaranteed ingress control. For more information, see the [Twilio Interconnect product overview](/docs/interconnect).

This guide covers:

* How Edge Locations work for different connection types (REST API, Voice/SIP, Interconnect)
* How Edge Locations relate to Twilio Regions
* The proper hostname format to ensure your data is processed in the correct region

> \[!NOTE]
>
> To see a complete list of available Edge Locations, see [the reference page](/docs/global-infrastructure/edge-locations).

> \[!CAUTION]
>
> We are making changes to the *PRODUCT*.*REGION*.twilio.com domain pattern. The following domains will stop working on April 28, 2026: `api.ie1.twilio.com`, `api.au1.twilio.com`, `api.br1.twilio.com`, `api.de1.twilio.com`, `api.jp1.twilio.com`, `api.sg1.twilio.com`, and `api.us2.twilio.com`.
>
> **Note:** `api.us1.twilio.com` remains valid and will continue to work.
>
> See the [API Domain Migration Guide](/docs/global-infrastructure/api-domain-migration-guide) for migration instructions.

## Inbound connectivity

Your application connects to Twilio through an Edge Location, which forwards traffic to a [Twilio Region](/docs/global-infrastructure/understanding-twilio-regions) for processing. How you reach an Edge Location depends on the connection type:

| Connection type                                         | Example                                                                                              | Edge Location selection                                                                                          |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| HTTPS (REST API)                                        | [Send an SMS](/docs/messaging/quickstart) via Programmable Messaging                                 | **Automatic** — Twilio's CDN selects the nearest edge. The hostname determines your processing region.           |
| SIP                                                     | Outbound call from your PBX via [Elastic SIP Trunking](/docs/sip-trunking)                           | **Configurable** — Your SIP endpoint connects to a specific edge, affecting media latency.                       |
| WebSocket                                               | [Connect to a Video Room](/docs/video/ios-v4-getting-started#join-a-room) using a Voice or Video SDK | **Configurable** — The SDK connects to a specific edge, affecting media quality.                                 |
| [Interconnect](/docs/interconnect) (private connection) | Dedicated link from your infrastructure to Twilio                                                    | **Guaranteed** — You select the exact edge location. Traffic uses a private connection, not the public internet. |

### REST API ingress

Twilio's CDN selects the optimal edge location for incoming REST API (HTTPS) requests based on DNS resolution and current network conditions. The edge location label in the FQDN (for example, `dublin` in `api.dublin.ie1.twilio.com`) does not guarantee that your request will enter through that edge. Instead, the label specifies the region where Twilio processes the request.

Twilio cannot guarantee the IP address or edge location where REST API traffic will ingress. If you need guaranteed ingress control, use [Interconnect](/docs/interconnect) to specify the exact edge location and set up a private connection that doesn't use the public internet.

## The processing region

The hostname you use determines where Twilio processes, authenticates, and stores your data. This applies to all connection types (REST API, SIP, SDKs).

**US processing (default):**

```text
*PRODUCT*.twilio.com
```

Examples: `api.twilio.com`, `api.us1.twilio.com`

**Ireland or Australia processing:**

```text
*PRODUCT*.*EDGE_LOCATION*.*PROCESSING_REGION*.twilio.com
```

| Region          | Hostname                          | Example                     |
| --------------- | --------------------------------- | --------------------------- |
| Ireland (IE1)   | `*PRODUCT*.dublin.ie1.twilio.com` | `api.dublin.ie1.twilio.com` |
| Australia (AU1) | `*PRODUCT*.sydney.au1.twilio.com` | `api.sydney.au1.twilio.com` |

The edge location name (`dublin`, `sydney`) is a required part of the hostname for non-US regions. For REST API requests, it does not control where your traffic enters the network — only where it is **processed**. For Voice/SIP, the edge location also affects media routing.

> \[!NOTE]
>
> Regional processing requires region-specific API credentials. See [Manage Regional API Credentials](/docs/global-infrastructure/manage-regional-api-credentials).

## Outbound connectivity

Twilio also initiates outbound connections to your applications — for example, [webhook callbacks](/docs/usage/webhooks/webhooks-overview), forwarding calls via [Elastic SIP Trunking](/docs/sip-trunking), or [connecting a call](/docs/voice/sdks/ios/get-started#7-receive-an-incoming-call) to a mobile SDK.

Processing always occurs within a Twilio Region. Outbound traffic exits through an Edge Location optimized for your geographic location. To configure outbound edge behavior, see [Webhooks Connection Overrides](/docs/usage/webhooks/webhooks-connection-overrides).

## How traffic flows between your application and Twilio

Your application never connects directly to a Twilio Region. Traffic always passes through an Edge Location, which forwards it to the destination Region for processing:

| Leg   | Spans                                      | Transport                                                       |
| ----- | ------------------------------------------ | --------------------------------------------------------------- |
| Outer | Your application to Edge Location          | Public internet (or private [Interconnect](/docs/interconnect)) |
| Inner | Edge Location to destination Twilio Region | Twilio's internal network                                       |

## Next steps

**REST API:**

* [Using the REST API in a non-US Region](/docs/global-infrastructure/using-the-twilio-rest-api-in-a-non-us-region) — How to target Ireland or Australia for data processing using hostnames and SDK parameters
* [API Domain Migration Guide](/docs/global-infrastructure/api-domain-migration-guide) — If you use `api.ie1.twilio.com` or similar legacy domains, they stop working April 28, 2026

**Voice & SIP (edge location affects media latency):**

* [Mobile SDKs](/docs/voice/sdks/mobile-edge-locations) — Configure edge for iOS and Android Voice SDKs
* [JavaScript SDK](/docs/voice/sdks/javascript/edges) — Configure edge for browser-based Voice
* [SIP endpoint Registration](/docs/voice/api/sip-registration) — Edge selection for SIP endpoints
* [SIP outbound traffic](/docs/voice/api/receiving-sip) — Edge selection for outbound SIP
* [Voice Failover](/docs/voice/twilio-voice-failover-best-practices) — Edge failover best practices
* [Elastic SIP Trunking](/docs/sip-trunking) — Edge selection for SIP trunks

**Webhooks:**

* [Connection Overrides](/docs/usage/webhooks/webhooks-connection-overrides) — Configure which edge Twilio uses for outbound webhook callbacks
