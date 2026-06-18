# Using the Twilio REST API in a non-US Region

This guide shows you how to manage resources in your target [Twilio Region](/docs/global-infrastructure/understanding-twilio-regions) by using Twilio's REST API. By the end of the guide, you'll learn to:

* Select a target Region for API requests
* Authenticate requests with Region-specific credentials
* Interact with Region-specific resources by using the REST API
* Select a target Region in Twilio SDKs

This guide uses cURL examples instead of language-specific SDKs to highlight core REST API principles without higher-level abstractions.

> \[!CAUTION]
>
> We are making changes to the *PRODUCT*.*REGION*.twilio.com domain pattern. The following domains will stop working on April 28, 2026: `api.ie1.twilio.com`, `api.au1.twilio.com`, `api.br1.twilio.com`, `api.de1.twilio.com`, `api.jp1.twilio.com`, `api.sg1.twilio.com`, and `api.us2.twilio.com`.
>
> **Note:** `api.us1.twilio.com` remains valid.
>
> See the [API domain migration guide](/docs/global-infrastructure/api-domain-migration-guide) for migration instructions.

## Select a target Region for your API requests

The Twilio REST API operates on a per-region basis. When making requests to the API, it's up to you to select which Region will handle the request. Whichever Region you choose will be the Region that processes and stores data related to the request.

If you don't specify a target Region, Twilio handles the request in the default US1 Region.

To specify a target Region for a request, include the name of the target Region in the request's hostname, also known as the [fully qualified domain name (FQDN)](https://en.wikipedia.org/wiki/Fully_qualified_domain_name).

## The Twilio API's FQDN format

The FQDN format follows a convention that encodes three pieces of information in the hostname:

1. The Twilio Product
2. The target [Edge Location](/docs/global-infrastructure/understanding-edge-locations)
3. The target Region

An FQDN has the following format:

`{product}.{edge-location}.{region}.twilio.com`

Some example FQDNs targeting API products in different Regions (through various Edge Locations) include:

| **FQDN**                           | **Target Region**                        |
| ---------------------------------- | ---------------------------------------- |
| api.sydney.**au1**.twilio.com      | Australia (AU1) Region                   |
| voice.ashburn.**us1**.twilio.com   | United States (US1) Region               |
| insights.dublin.**ie1**.twilio.com | Ireland (IE1) Region (not yet available) |

> \[!NOTE]
>
> **Understanding Edge Locations and Region Processing**
>
> To ensure your data is processed in a specific region, you must include both the edge location and region in your FQDN (e.g., `sydney.au1.twilio.com`). The edge and region combination determines where your data is processed. Omitting the edge location will result in your requests being processed in the US (us1) by default. Note that the edge label does not control how your traffic enters Twilio's network. Twilio's CDN automatically selects the optimal ingress path regardless of which edge location you specify.
>
> To learn more about how ingress and region processing work, see [Understanding Edge Locations](/docs/global-infrastructure/understanding-edge-locations).

## Twilio server-side SDKs

When making requests using any of Twilio's [server-side SDKs](/docs/libraries), you don't need to worry about constructing an FQDN. Instead, provide the client constructor with an `edge` and `region` parameter, and the client will construct the FQDN accordingly.

> \[!CAUTION]
>
> When specifying a `region` parameter for an SDK client, be sure to also specify the `edge` parameter. For backward compatibility purposes, specifying a `region` without specifying an `edge` will result in requests being routed to US1.

## Region-specific authentication credentials

In order to provide Region-specific access control, Twilio manages your account's API credentials on a per-region basis. This means that you'll need to use different Auth Tokens and API Keys based on which Region you are sending API requests to. Refer to the [Twilio Regions overview](/docs/global-infrastructure/understanding-twilio-regions) for more information about the Region isolation model.

You can manage API Keys for a Region using the Twilio Console or the REST API. See our guide to [managing Regional API credentials](/docs/global-infrastructure/manage-regional-api-credentials) for complete instructions.

## Other Region-specific resources

Most Twilio resources can be managed via REST API in a target Region using standard API Keys which exist in the Region.

For example, to list your account's TwiML Applications in the AU1 region using cURL (again with the appropriate environment variables present in your shell):

```bash
curl -u $API_KEY_SID:$API_KEY_SECRET \
  https://api.sydney.au1.twilio.com/2010-04-01/Accounts/$ACCOUNT_SID/Applications.json
```

> \[!WARNING]
>
> Some API endpoints aren't available in Regions outside of US1.
>
> For example, REST API operations that manage Push Credentials for the Notification service are supported only in US1.

## Next steps

To learn more about building with Twilio's global infrastructure, see [Make an outbound call using the Twilio REST API in a non-US Region](/docs/global-infrastructure/create-an-outbound-call-via-rest-api-in-a-non-us-twilio-region).
