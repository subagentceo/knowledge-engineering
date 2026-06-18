# Edge Locations

Edge Locations are the entry and exit points where your application's network traffic connects to Twilio's platform. For Voice/SIP and [Interconnect](https://www.twilio.com/en-us/interconnect) customers, you can select a specific edge. For REST API, the CDN selects the optimal edge automatically. See [Understanding Edge Locations](/docs/global-infrastructure/understanding-edge-locations) for details.

To learn how to use Edge Locations with Twilio SDKs, see [Using the Twilio REST API in a non-US region](/docs/global-infrastructure/using-the-twilio-rest-api-in-a-non-us-region#twilio-server-side-sdks).

## Twilio products that support Edge Locations

| Product                  | Documentation                                                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| Programmable SMS         | [API](/docs/messaging/api)                                                                                          |
| Verify                   | [API](/docs/verify/api)                                                                                             |
| Programmable Voice       | [API](/docs/voice/api), [Sending SIP](/docs/voice/api/sending-sip) & [Receiving SIP](/docs/voice/api/receiving-sip) |
| Programmable Voice SDK   | [Mobile SDK](/docs/voice/sdks/mobile-edge-locations) & [JavaScript SDK](/docs/voice/sdks/javascript/edges)          |
| Elastic SIP Trunking     | [API](/docs/sip-trunking/api) & [Trunking](/docs/sip-trunking)                                                      |
| HTTP Callback (Webhooks) | [HTTP Callbacks (Webhooks)](/docs/usage/webhooks/webhooks-connection-overrides)                                     |
| Conversations            | [API](/docs/conversations-classic/api) (Excluding [Media REST API](/docs/conversations-classic/api/media-resource)) |
| Lookup                   | [API](/docs/lookup/using-lookup-with-twilio-regions)                                                                |

## Public Edge Locations

| Edge ID     | Location                                                                                                           |
| ----------- | ------------------------------------------------------------------------------------------------------------------ |
| `sydney`    | Australia                                                                                                          |
| `sao-paulo` | Brazil                                                                                                             |
| `dublin`    | Ireland                                                                                                            |
| `frankfurt` | Frankfurt                                                                                                          |
| `tokyo`     | Japan                                                                                                              |
| `singapore` | Singapore                                                                                                          |
| `ashburn`   | US East Coast (Virginia)                                                                                           |
| `umatilla`  | US West Coast (Oregon)                                                                                             |
| `roaming`   | Use Twilio's Global Low Latency routing to select the data center with the lowest-latency connection to your user. |

> \[!WARNING]
>
> `roaming` Edge ID isn't available for SIP Domains or Elastic SIP Trunking.

> \[!CAUTION]
>
> We are making changes to the *PRODUCT*.*REGION*.twilio.com domain pattern. The following domains will stop working on April 28, 2026: `api.ie1.twilio.com`, `api.au1.twilio.com`, `api.br1.twilio.com`, `api.de1.twilio.com`, `api.jp1.twilio.com`, `api.sg1.twilio.com`, and `api.us2.twilio.com`.
>
> **Note:** `api.us1.twilio.com` remains valid and will continue to work.
>
> See the [API Domain Migration Guide](/docs/global-infrastructure/api-domain-migration-guide) for migration instructions.

## Private Interconnect

If you have a [private Interconnect connection](https://www.twilio.com/en-us/interconnect), you can use the following Edge IDs:

| Edge ID        | Location                                                        |
| -------------- | --------------------------------------------------------------- |
| `ashburn-ix`   | US East Coast (Virginia) over Interconnect exchange in Virginia |
| `san-jose-ix`  | US West Coast (Oregon) over Interconnect exchange in San Jose   |
| `sao-paulo-ix` | Sao Paulo over Interconnect exchange in Sao Paulo               |
| `london-ix`    | Ireland over Interconnect exchange in London                    |
| `frankfurt-ix` | Frankfurt over Interconnect exchange in Frankfurt               |
| `singapore-ix` | Singapore over Interconnect exchange in Singapore               |
| `tokyo-ix`     | Tokyo over Interconnect exchange in Tokyo                       |
| `sydney-ix`    | Sydney over Interconnect exchange in Sydney                     |
