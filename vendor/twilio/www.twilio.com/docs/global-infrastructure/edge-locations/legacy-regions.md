# Legacy Edge Location IDs

Twilio previously used short region-style IDs (e.g., `ie1`, `au1`, `us2`) to identify Edge Locations in FQDNs, SDK parameters, and SIP URIs. These have been replaced by descriptive Edge Location names (e.g., `dublin`, `sydney`, `umatilla`).

> \[!CAUTION]
>
> The `api.REGION.twilio.com` domain pattern (e.g., `api.ie1.twilio.com`) will stop working on **April 28, 2026**. This applies to REST API domains only. See the [API Domain Migration Guide](/docs/global-infrastructure/api-domain-migration-guide) for migration instructions.

> \[!WARNING]
>
> **`ie1` and `au1` are still valid as processing Region identifiers** (e.g., `api.dublin.ie1.twilio.com`). Only their use as edge location selectors in the old `api.REGION.twilio.com` pattern is deprecated.

## Public Edge Location IDs

| Legacy ID | Location                 | Current Edge Location name | Example: old (deprecated) | Example: current            |
| --------- | ------------------------ | -------------------------- | ------------------------- | --------------------------- |
| `au1`     | Australia                | `sydney`                   | `api.au1.twilio.com`      | `api.sydney.au1.twilio.com` |
| `br1`     | Brazil                   | `sao-paulo`                | `api.br1.twilio.com`      | `api.twilio.com`            |
| `ie1`     | Ireland                  | `dublin`                   | `api.ie1.twilio.com`      | `api.dublin.ie1.twilio.com` |
| `de1`     | Frankfurt                | `frankfurt`                | `api.de1.twilio.com`      | `api.twilio.com`            |
| `jp1`     | Japan                    | `tokyo`                    | `api.jp1.twilio.com`      | `api.twilio.com`            |
| `sg1`     | Singapore                | `singapore`                | `api.sg1.twilio.com`      | `api.twilio.com`            |
| `us1`     | US East Coast (Virginia) | `ashburn`                  | `api.us1.twilio.com`      | `api.twilio.com`            |
| `us2`     | US West Coast (Oregon)   | `umatilla`                 | `api.us2.twilio.com`      | `api.twilio.com`            |
| `gll`     | Global Low Latency       | `roaming`                  | —                         | —                           |

> \[!NOTE]
>
> The "current" column shows the correct hostname for data **processing** in that region. Regions without a dedicated processing region (br1, de1, jp1, sg1, us2) process in US1 — use `api.twilio.com`.

## Private Interconnect Edge Location IDs

If you use [private Interconnect connections](https://www.twilio.com/en-us/interconnect), the following legacy IDs correspond to current Interconnect Edge Locations:

| Legacy ID    | Location                                                        | Current Edge Location name |
| ------------ | --------------------------------------------------------------- | -------------------------- |
| `us1-ix`     | US East Coast (Virginia) over Interconnect exchange in Virginia | `ashburn-ix`               |
| `us2-ix`     | US West Coast (Oregon) over Interconnect exchange in San Jose   | `san-jose-ix`              |
| `br1-ix`     | Sao Paulo over Interconnect exchange in Sao Paulo               | `sao-paulo-ix`             |
| `ie1-ix`     | Ireland over Interconnect exchange in London                    | `london-ix`                |
| `de1-ix`     | Frankfurt over Interconnect exchange in Frankfurt               | `frankfurt-ix`             |
| `sg1-ix`\*\* | Singapore over Interconnect exchange in Singapore               | `singapore-ix`             |
| `jp1-ix`\*\* | Tokyo over Interconnect exchange in Tokyo                       | `tokyo-ix`                 |
| `au1-ix`\*\* | Sydney over Interconnect exchange in Sydney                     | `sydney-ix`                |

\*\* Requires Voice JavaScript SDK version 2.0 or later
