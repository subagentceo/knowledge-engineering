---
title: Changelog
description: Track the latest updates and changes to Cloudflare DNS features.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Changelog

[ Subscribe to RSS ](https://developers.cloudflare.com/changelog/rss/dns.xml) 

## 2026-06-10

  
**Account-level DNS records quota**   

Cloudflare now enforces DNS records quotas at the account level for Enterprise accounts. Instead of a per-zone limit, these accounts have a quota on the total number of records across all of their zones, letting you distribute records across your zones however you like — regardless of each zone's plan. Public and internal zones are counted separately, each with a default quota of 1,000,000 records.

Accounts without an account-level quota are unaffected: existing per-zone quotas behave exactly as before.

For more details, refer to [DNS records quota](https://developers.cloudflare.com/dns/manage-dns-records/#dns-records-quota).

## 2026-05-20

  
**New DNS records UX is rolling out**   

Starting today, everyone can opt in to a refreshed DNS records page in the Cloudflare dashboard. Over the coming weeks, the new experience will become the default for Free plan users first, followed by paid plans.

![New DNS records UX](https://developers.cloudflare.com/_astro/new-dns-ux.Bfs_yXPa_VJoah.webp) 

#### What is new

* **Better table experience**: resizable and hideable columns, row pinning, advanced filters with logical operators (AND/OR), configurable pagination, and expanded input fields so long values are no longer cut off.
* **First-class mobile experience**: responsive layout with a touch-friendly, card-based UI and compact controls for small screens.
* **DNS quick reference**: bite-sized explainers for DNS, proxy status, and TTL, available directly in the product to help users configure records without leaving the page.
* **Modern frontend**: a refactor onto Cloudflare's new UI framework that improves performance and lays the foundation for future improvements.
![New DNS records UX](https://developers.cloudflare.com/_astro/new-dns-ux.DV6gCbme_2cImvu.webp) 

#### Rollout plan

Dates are subject to change based on feedback received during the rollout.

* **20 May - 05 June**: ramped rollout to Free, then Pro and Business plans.
* **08 June - 03 July**: ramped rollout to Enterprise plans.

#### Share your feedback

Once the new experience is turned on for your account, look for the feedback link at the top of the DNS records page in the Cloudflare dashboard and let us know what you think. Your input helps us prioritize the next round of improvements.

## 2026-04-28

  
**Account-level enforce DNS-only**   

You can now disable Cloudflare's reverse proxy across all zones in your account simultaneously using the new `enforce_dns_only` setting. When enabled, Cloudflare responds to DNS queries for all proxied records with your origin IP addresses instead of Cloudflare's anycast IPs. This account-level kill switch is designed for incident response scenarios where you need to quickly route traffic directly to your origin servers.

Warning

Enabling this setting exposes your origin IP addresses and removes all Cloudflare protections — including DDoS mitigation, WAF, caching, and all other proxy-based features — for every zone in your account. Use with extreme caution and only after proper [preparations](https://developers.cloudflare.com/dns/proxy-status/enforce-dns-only/#preparation).

#### Key characteristics

* **Account-level** — Affects all zones in the account simultaneously with a single API call.
* **Non-destructive** — Does not modify your DNS records. Disabling the setting restores normal proxy behavior.
* **API-only** — Available through the API only, not in the Cloudflare dashboard.

#### What's affected

**Included:** Standard proxied A, AAAA, and CNAME records, Load Balancing records, and records matching Worker routes.

**Excluded:** Spectrum applications, Cloudflare Tunnel CNAMEs, R2 custom domains, Web3 gateways, and Workers custom domains continue to operate normally.

#### Before you enable

* Verify your origin servers can handle direct traffic without Cloudflare's caching and filtering.
* Review which origin IPs will become publicly visible through DNS queries.
* Test the API in a staging account before relying on it for incident response.

#### Availability

Available via API to all Cloudflare customers.

For information on how to use it, refer to [Enforce DNS-only developer documentation](https://developers.cloudflare.com/dns/proxy-status/enforce-dns-only/) .

## 2026-03-31

  
**Internal DNS - now in open beta**   

Internal DNS is now in open beta.

#### Who can use it?

Internal DNS is bundled as a part of Cloudflare Gateway and is now available to every Enterprise customer with one of the following subscriptions:

* Cloudflare Zero Trust Enterprise
* Cloudflare Gateway Enterprise

To learn more and get started, refer to the [Internal DNS documentation](https://developers.cloudflare.com/dns/internal-dns/).

## 2026-03-20

  
**DNS Analytics for Customer Metadata Boundary set to EU region**   

DNS Analytics is now available for customers with [Customer Metadata Boundary](https://developers.cloudflare.com/data-localization/metadata-boundary/) (CMB) set to EU. Query your DNS analytics data while keeping metadata stored in the EU region.

This update includes:

* **DNS Analytics** — Access the same DNS analytics experience for zones in CMB=EU accounts.
* **EU data residency** — Analytics data is stored and queried from the EU region, meeting data localization requirements.
* **DNS Firewall Analytics** — DNS Firewall analytics is now supported for CMB=EU customers.

#### Availability

Available to customers with the [Data Localization Suite](https://developers.cloudflare.com/data-localization/) who have Customer Metadata Boundary configured for the EU region.

#### Where to find it

* **Authoritative DNS:** In the Cloudflare dashboard, select your zone and go to the **Analytics** page.  
[ Go to **Analytics** ](https://dash.cloudflare.com/?to=/:account/:zone/dns/analytics)
* **DNS Firewall:** In the Cloudflare dashboard, go to the **DNS Firewall Analytics** page.  
[ Go to **Analytics** ](https://dash.cloudflare.com/?to=/:account/dns-firewall/analytics)

For more information, refer to [DNS Analytics](https://developers.cloudflare.com/dns/additional-options/analytics/) and [DNS Firewall Analytics](https://developers.cloudflare.com/dns/dns-firewall/analytics/).

## 2025-09-16

  
**DNS Firewall Analytics — now in the Cloudflare dashboard**   

#### What's New

Access [GraphQL-powered DNS Firewall analytics](https://developers.cloudflare.com/dns/dns-firewall/analytics/) directly in the Cloudflare dashboard.

![DNS Firewall Analytics UI](https://developers.cloudflare.com/_astro/DNSFW_Analytics_UI.CgjmZFOO_Z1tNsEz.webp) 

#### Explore Four Interactive Panels

* **Query summary**: Describes trends over time, segmented by dimensions.
* **Query statistics**: Describes totals, cached/uncached queries, and processing/response times.
* **DNS queries by data center**: Describes global view and the top 10 data centers.
* **Top query statistics**: Shows a breakdown by key dimensions, with search and expand options (up to top 100 items).

Additional features:

* Apply filters and time ranges once. Changes reflect across all panels.
* Filter by dimensions like query name, query type, cluster, data center, protocol (UDP/TCP), IP version, response code/reason, and more.
* Access up to 62 days of historical data with flexible intervals.

#### Availability

Available to all DNS Firewall customers as part of their existing subscription.

#### Where to Find It

* In the Cloudflare dashboard, go to the **DNS Firewall** page.  
[ Go to **Analytics** ](https://dash.cloudflare.com/?to=/:account/dns-firewall/analytics)
* Refer to the [DNS Firewall Analytics](https://developers.cloudflare.com/dns/dns-firewall/analytics/) to learn more.

## 2025-06-19

  
**Account-level DNS analytics now available via GraphQL Analytics API**   

Authoritative DNS analytics are now available on the **account level** via the [Cloudflare GraphQL Analytics API](https://developers.cloudflare.com/analytics/graphql-api/).

This allows users to query DNS analytics across multiple zones in their account, by using the `accounts` filter.

Here is an example to retrieve the most recent DNS queries across all zones in your account that resulted in an `NXDOMAIN` response over a given time frame. Please replace `a30f822fcd7c401984bf85d8f2a5111c` with your actual account ID.

GraphQL example for account-level DNS analytics

```

query GetLatestNXDOMAINResponses {

  viewer {

    accounts(filter: { accountTag: "a30f822fcd7c401984bf85d8f2a5111c" }) {

      dnsAnalyticsAdaptive(

        filter: {

          date_geq: "2025-06-16"

          date_leq: "2025-06-18"

          responseCode: "NXDOMAIN"

        }

        limit: 10000

        orderBy: [datetime_DESC]

      ) {

        zoneTag

        queryName

        responseCode

        queryType

        datetime

      }

    }

  }

}


```

[Run in GraphQL API Explorer](https://graphql.cloudflare.com/explorer?query=I4VwpgTgngBA4mALgGQIaLAZ0QOQBoAiA8gLICCAkjgEpYAOA9gHaZYwDeAUDDAG4CWYAO6QO3HjFQBjKQxBNEmABQAzfgBsMEAFwdJMuQoAqqAOa6ARKgDMABhUAOAExOVUgCYB2KQBZbARgBOBx8AI0cAVncHFSdUCP9EqQsYAF8ASjEJCXcWMiZUdShEfilMMndUOhLeMCVxbJ41TUhdLkbGyowAfVMwYEsnWycIgFpbADZR-wmLBo6YLrBu9X7B4bHJ6Yc5hYkIemZWAGEGdzBLfGJyKl2F1Pns9X4AW35EXX9bb9tHiQYIOcIAAhKC6ADaSxKL2WBAAogBlY4AXT+mXaCwAXswwCZTH8eKBIFAcKgYQSYAdMIwWGBTucKUToEYoHQwBSoa92R0HtleWlOKkgA&variables=N4XyA)

To learn more and get started, refer to the [DNS Analytics documentation](https://developers.cloudflare.com/dns/additional-options/analytics/#analytics).

## 2025-06-16

  
**Internal DNS (beta) now manageable in the Cloudflare dashboard**   

Participating beta testers can now fully configure [Internal DNS](https://developers.cloudflare.com/dns/internal-dns/) directly in the [Cloudflare dashboard ↗](https://dash.cloudflare.com/?to=/:account/internal-dns).

#### Internal DNS enables customers to:

* Map internal hostnames to private IPs for services, devices, and applications not exposed to the public Internet
* Resolve internal DNS queries securely through [Cloudflare Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/)
* Use split-horizon DNS to return different responses based on network context
* Consolidate internal and public DNS zones within a single management platform

#### What’s new in this release:

* Beta participants can now create and manage internal zones and views in the Cloudflare dashboard
![Internal DNS UI](https://developers.cloudflare.com/_astro/internal-dns-beta-ui.B5uCVZ9o_yVcqC.webp) 

Note

The Internal DNS beta is currently only available to Enterprise customers.

To learn more and get started, refer to the [Internal DNS documentation](https://developers.cloudflare.com/dns/internal-dns/).

## 2025-06-11

  
**NSEC3 support for DNSSEC**   

Enterprise customers can now select NSEC3 as method for proof of non-existence on their zones.

What's new:

* **NSEC3 support for live-signed zones** – For both primary and secondary zones that are configured to be live-signed (also known as "on-the-fly signing"), NSEC3 can now be selected as proof of non-existence.
* **NSEC3 support for pre-signed zones** – Secondary zones that are transferred to Cloudflare in a [pre-signed setup](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/dnssec-for-secondary/#set-up-pre-signed-dnssec) now also support NSEC3 as proof of non-existence.

For more information and how to enable NSEC3, refer to the [NSEC3 documentation](https://developers.cloudflare.com/dns/dnssec/enable-nsec3/).

## 2025-06-03

  
**Improved onboarding for Shopify merchants**   

Shopify merchants can now onboard to **O2O** automatically, without needing to contact support or community members.

What's new:

* **Automatic enablement** – O2O is available for all mutual Cloudflare and Shopify customers.
* **Branded record display** – Merchants see a Shopify logo in DNS records, complete with helpful tooltips.  
![Shopify O2O logo](https://developers.cloudflare.com/_astro/shop-dns-icon-o2o.Ca5DAZHL_1weoif.webp)
* **Checkout protection** – Workers and Snippets are blocked from running on the checkout path to reduce risk and improve security.

For more information, refer to the [provider guide](https://developers.cloudflare.com/cloudflare-for-platforms/cloudflare-for-saas/saas-customers/provider-guides/shopify/).

## 2025-02-02

  
**Removed unused meta fields from DNS records**   

Cloudflare is removing five fields from the `meta` object of DNS records. These fields have been unused for more than a year and are no longer set on new records. This change may take up to four weeks to fully roll out.

The affected fields are:

* the `auto_added` boolean
* the `managed_by_apps` boolean and corresponding `apps_install_id`
* the `managed_by_argo_tunnel` boolean and corresponding `argo_tunnel_id`

An example record returned from the API would now look like the following:

Updated API Response

```

{

  "result": {

    "id": "<ID>",

    "zone_id": "<ZONE_ID>",

    "zone_name": "example.com",

    "name": "www.example.com",

    "type": "A",

    "content": "192.0.2.1",

    "proxiable": true,

    "proxied": false,

    "ttl": 1,

    "locked": false,

    "meta": {

      "auto_added": false,

      "managed_by_apps": false,

      "managed_by_argo_tunnel": false,

      "source": "primary"

    },

    "comment": null,

    "tags": [],

    "created_on": "2025-03-17T20:37:05.368097Z",

    "modified_on": "2025-03-17T20:37:05.368097Z"

  },

  "success": true,

  "errors": [],

  "messages": []

}


```

For more guidance, refer to [Manage DNS records](https://developers.cloudflare.com/dns/manage-dns-records/).

## 2025-01-27

**Zone IDs and names on individual DNS records**

Records returned by the API will no longer contain the `zone_id` and `zone_name` fields. This change may take up to four weeks to fully roll out. The affected fields were deprecated with an End of Life (EOL) date of November 30, 2024.

## 2024-10-15

**Quote validation for TXT records added via dashboard**

When creating [TXT records](https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/#txt) via the dashboard you will now find:

* Field validation errors if double quotes `"` are added inconsistently.
* Automatically quoted TXT content upon save if no quotes exist in the record content field.

## 2024-10-07

**API support for per-record CNAME flattening**

Paid zones now have the option to flatten specific CNAME records. When using the API, specify the setting `cname_flatten` as `true` or `false`. Refer to the [documentation](https://developers.cloudflare.com/dns/cname-flattening/set-up-cname-flattening/#per-record) for details.

```json
{"@context":"https://schema.org","@type":"BlogPosting","@id":"https://developers.cloudflare.com/dns/changelog/#page","headline":"Changelog · Cloudflare DNS docs","description":"Track the latest updates and changes to Cloudflare DNS features.","url":"https://developers.cloudflare.com/dns/changelog/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/changelog/","name":"Changelog"}}]}
```
