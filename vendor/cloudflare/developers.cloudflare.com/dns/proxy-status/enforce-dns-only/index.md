---
title: Enforce DNS-only
description: Bypass Cloudflare's reverse proxy for all zones at once.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Enforce DNS-only

The enforce DNS-only setting is an account-level break-glass mechanism that allows you to bypass Cloudflare's reverse proxy for all zones in your account in a single action. When enabled, Cloudflare responds to DNS queries with the underlying record content — origin IP addresses for proxied `A` and `AAAA` records, and CNAME targets for proxied `CNAME` records — instead of Cloudflare's anycast IP addresses, effectively setting all [proxied DNS records](https://developers.cloudflare.com/dns/proxy-status/) to DNS-only without modifying the records themselves.

This setting is intended for emergency situations only, such as during an outage when you need to quickly route traffic directly to your origins.

Warning

Enabling this setting exposes your origin IP addresses and removes all Cloudflare protections — including DDoS mitigation, WAF, caching, and all other proxy-based features — for every zone in your account. Use with extreme caution and only after proper [preparation](#preparation).

## Key characteristics

* Account-level: Affects all zones in the account simultaneously.
* Non-destructive: Does not modify your DNS records. Disabling the setting restores normal proxy behavior.
* API-only: Available through the API only, not in the Cloudflare dashboard.

Auto TTL for proxied records

Due to DNS caching by recursive resolvers, the transitions from proxied to DNS-only and back may not be instantaneous. Since all proxied records have a TTL of **Auto**, this value (five minutes by default) determines how long resolvers may continue to serve Cloudflare's anycast IPs or your origin IP addresses.

## Zone types

Enforce DNS-only works across all zone setup types:

* [Full setup](https://developers.cloudflare.com/dns/zone-setups/full-setup/): Proxied records in the zone are generally affected, considering a few [exceptions](https://developers.cloudflare.com/dns/proxy-status/enforce-dns-only/#excluded).
* [Partial (CNAME) setup](https://developers.cloudflare.com/dns/zone-setups/partial-setup/): Proxied records in the zone are generally affected, considering a few [exceptions](https://developers.cloudflare.com/dns/proxy-status/enforce-dns-only/#excluded).
* [Secondary zones](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/): If Secondary DNS Overrides is enabled and you have manually set a record's proxy status to proxied, that record will be affected. This also applies to any other `A` or `AAAA` records on the same name. Refer to [Secondary DNS Overrides](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/proxy-traffic/) for details.  
Zone transfers interaction  
While enforce DNS-only is active, zone transfers from the primary (including content or TTL changes) do not change the proxy status of affected records. When you [disable enforce DNS-only](#disable-enforce-dns-only), the records return to proxied.

## Preparation

Before relying on enforce DNS-only as part of your incident response plan, you should:

* Verify origin server capacity: Without Cloudflare proxying, your origin servers handle all traffic directly, including traffic that Cloudflare would normally cache or filter. Ensure your infrastructure can sustain this load.
* Review exposed record content: When enforce DNS-only is active, all origin IPs configured in proxied `A` and `AAAA` records, as well as the targets of proxied `CNAME` records, become publicly visible through DNS queries. If your origins rely on IP obscurity for security, plan accordingly.
* Test in advance: Use the API in a staging or test account to confirm that you understand the behavior before you need it in an emergency.

Verify SSL certificates

If your origins serve HTTPS traffic, ensure they have publicly trusted SSL certificates installed for the relevant hostnames. Cloudflare [Origin CA certificates](https://developers.cloudflare.com/ssl/origin-configuration/origin-ca/) are only trusted by Cloudflare and will cause certificate errors for direct client connections.

## Enable enforce DNS-only

Use the [Update DNS Settings](https://developers.cloudflare.com/api/resources/dns/subresources/settings/subresources/account/methods/edit/) endpoint to enable enforce DNS-only for your account:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Account DNS Settings Write`

Update DNS Settings

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dns_settings" \

  --request PATCH \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "enforce_dns_only": true

  }'


```

Once enabled, Cloudflare responds to DNS queries for all proxied records with the underlying record content — your configured origin IP addresses for `A` and `AAAA` records, and the configured CNAME target for `CNAME` records — instead of Cloudflare's anycast IPs.

## Disable enforce DNS-only

To restore normal proxy behavior, set `enforce_dns_only` to `false`:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Account DNS Settings Write`

Update DNS Settings

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dns_settings" \

  --request PATCH \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "enforce_dns_only": false

  }'


```

After you disable the setting, Cloudflare resumes responding to DNS queries with anycast IP addresses for proxied records and all proxy-based features are restored.

## Other Cloudflare products

Refer to the sections below in case you use other Cloudflare products that rely on DNS records.

### Included

Enforce DNS-only affects the following records:

* [Load Balancing](https://developers.cloudflare.com/load-balancing/): proxied LB records visible on the DNS records table but managed through the [Load Balancing configurations](https://developers.cloudflare.com/load-balancing/load-balancers/create-load-balancer/).
* Proxied DNS records that match a [Worker route](https://developers.cloudflare.com/workers/configuration/routing/routes/).
* [Cloudflare for SaaS](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/) fallback origin: The proxied DNS record you designate as the [fallback origin](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/start/getting-started/#1-create-fallback-origin) for custom hostnames.

### Excluded

Enforce DNS-only does not affect the following records:

* [R2](https://developers.cloudflare.com/r2/) custom domains: Read-only proxied records added to the DNS records table when you set up [R2 custom domains](https://developers.cloudflare.com/r2/buckets/public-buckets/#connect-a-bucket-to-a-custom-domain).
* [Spectrum](https://developers.cloudflare.com/spectrum/) applications: DNS records managed by the Spectrum application.
* [Tunnel](https://developers.cloudflare.com/tunnel/): CNAME records pointing to a tunnel subdomain. Refer to [Tunnel routing](https://developers.cloudflare.com/tunnel/routing/#create-a-dns-record) or [Cloudflare One](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/routing-to-tunnel/dns/) for details.
* [Web3 gateways](https://developers.cloudflare.com/web3/): Read-only proxied records managed by the [Web3 gateway configuration](https://developers.cloudflare.com/web3/reference/gateway-dns-records/).
* [Workers](https://developers.cloudflare.com/workers/) custom domains: Read-only proxied records added to the DNS records table when you set up Workers [custom domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/).  
Custom domain or route match  
Proxied records that match a Worker [route](https://developers.cloudflare.com/workers/configuration/routing/routes/) are regular DNS records and will be [affected](#included) by the enforce DNS-only setting.

## Check current status

Use the [Show DNS Settings](https://developers.cloudflare.com/api/resources/dns/subresources/settings/subresources/account/methods/get/) endpoint to verify the current value:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Account DNS Settings Write`
* `Account DNS Settings Read`

Show DNS Settings

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dns_settings" \

  --request GET \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"


```

## Related resources

* [Proxy status](https://developers.cloudflare.com/dns/proxy-status/) \- Understand how proxied and DNS-only records behave.
* [Batch record changes](https://developers.cloudflare.com/dns/manage-dns-records/how-to/batch-record-changes/#edit-proxy-status-in-bulk) \- Change proxy status for multiple records in bulk within a single zone.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/proxy-status/enforce-dns-only/#page","headline":"Enforce DNS-only · Cloudflare DNS docs","description":"Bypass Cloudflare's reverse proxy for all zones at once.","url":"https://developers.cloudflare.com/dns/proxy-status/enforce-dns-only/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-12","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/proxy-status/","name":"Proxy status"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/proxy-status/enforce-dns-only/","name":"Enforce DNS-only"}}]}
```
