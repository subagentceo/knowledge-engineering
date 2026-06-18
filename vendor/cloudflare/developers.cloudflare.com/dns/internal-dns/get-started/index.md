---
title: Get started
description: Set up Internal DNS for private name resolution.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Get started

Follow this guide to get started with Internal DNS.

Note

Internal DNS is currently in beta. Using it on production traffic is at your own risk.

## Before you begin

* Make sure you have an Enterprise account with access to [Gateway resolver policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/) and [Internal DNS](https://developers.cloudflare.com/dns/internal-dns/).
* Consider the different ways in which you can [connect to Gateway resolver](https://developers.cloudflare.com/dns/internal-dns/connectivity/).  
Warning  
If using WARP, make sure your internal DNS zones or their TLDs are not listed in your [Local Domain Fallback configuration](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/). Otherwise, DNS queries for a matching domain will be sent to the local DNS server specified in the fallback, instead of being sent to Cloudflare.
* If you will be using an API token for authentication, make sure you have the following permissions:

API token configuration

**Permissions**

* _Account_ \- _DNS Views_ \- _Edit_
* _Zone_ \- _DNS_ \- _Edit_
* _Account_ \- _Account Settings_ \- _Edit_
* _Zone_ \- _DNS Settings_ \- _Edit_
* _Zone_ \- _Zone_ \- _Edit_

**Account Resources**

* _Include_ \- _(Your account)_

**Zone Resources**

* _Include_ \- _All zones_

## 1\. Set up your internal DNS zone

* [ Dashboard ](#tab-panel-8083)
* [ API ](#tab-panel-8084)

1. In the Cloudflare dashboard, go to the **Internal DNS** page.  
[ Go to **Internal DNS** ](https://dash.cloudflare.com/?to=/:account/internal-dns)
2. Select **Create an internal zone**.
3. Give your internal zone a name.

Internal zone configuration conditions

* Internal zones can contain the same [DNS record types](https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/) that Cloudflare supports for public zones.
* An internal zone can have the same name as a public zone in the same account.
* Each internal zone can be linked to multiple [views](https://developers.cloudflare.com/dns/internal-dns/dns-views/).1
* There can be several internal zones with the same name in one account. However, two internal zones with the same name cannot be linked to the same view.
* Internal zones are not subject to any top-level domain (TLD) restrictions. This means that an internal zone can be created if its TLD is not registered publicly (for example, `xyz.local`), if it is created on the TLD itself (`local`), or even if on the root (`.`).

1 Logical groupings of internal DNS zones that are referenced by Gateway resolver policies to define how a specific query should be resolved.

1. Add DNS records to your internal zone using your preferred option:
* [Import](https://developers.cloudflare.com/dns/manage-dns-records/how-to/import-and-export/) a formatted BIND file.
* Select **Add a record** and choose **Create** under the record type you want to add. Refer to [DNS record types](https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/) for details.
1. Repeat this process for each internal zone you wish to add.

Note

Creating multiple internal DNS records in batch is currently only supported via API.

1. Use the [Create Zone](https://developers.cloudflare.com/api/resources/zones/methods/create/) endpoint to create an [internal zone](https://developers.cloudflare.com/dns/internal-dns/internal-zones/). Specify your account ID and set the `type` to `internal`.

Internal zone configuration conditions

* Internal zones can contain the same [DNS record types](https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/) that Cloudflare supports for public zones.
* An internal zone can have the same name as a public zone in the same account.
* Each internal zone can be linked to multiple [views](https://developers.cloudflare.com/dns/internal-dns/dns-views/).1
* There can be several internal zones with the same name in one account. However, two internal zones with the same name cannot be linked to the same view.
* Internal zones are not subject to any top-level domain (TLD) restrictions. This means that an internal zone can be created if its TLD is not registered publicly (for example, `xyz.local`), if it is created on the TLD itself (`local`), or even if on the root (`.`).

1 Logical groupings of internal DNS zones that are referenced by Gateway resolver policies to define how a specific query should be resolved.

Example

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone Zone Edit`
* `Zone DNS Edit`

Create Zone

```

curl "https://api.cloudflare.com/client/v4/zones" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "account": {

        "id": "<ACCOUNT_ID>"

    },

    "name": "<ZONE_NAME>",

    "type": "internal"

  }'


```

1. Add DNS records to your internal zone using your preferred option:
* [Import](https://developers.cloudflare.com/api/resources/dns/subresources/records/methods/import/) a formatted BIND file. Refer to the [DNS records how-to](https://developers.cloudflare.com/dns/manage-dns-records/how-to/import-and-export/) for guidance.
* Use other API endpoints, such as [/batch](https://developers.cloudflare.com/api/resources/dns/subresources/records/methods/batch/), to manage DNS records. Refer to [Batch record changes](https://developers.cloudflare.com/dns/manage-dns-records/how-to/batch-record-changes/#use-the-api) for details.
1. Repeat this process for each internal zone you wish to add.

### (Optional) Reference a zone from another zone

During an [internal DNS query resolution](https://developers.cloudflare.com/dns/internal-dns/#architecture-overview), if no internal record is found within a matching internal zone, Cloudflare will check if the matching internal zone is referencing another internal zone. Successive references can be followed with a maximum of five references in a chain.

For details, refer to [reference zones](https://developers.cloudflare.com/dns/internal-dns/internal-zones/reference-zones/).

* [ Dashboard ](#tab-panel-8085)
* [ API ](#tab-panel-8086)

1. In the Cloudflare dashboard, go to the **Internal DNS** page.  
[ Go to **Internal DNS** ](https://dash.cloudflare.com/?to=/:account/internal-dns)
2. Select a zone.
3. Within the selected zone, go to **Reference zone**.
4. Select **Add reference zone**.
5. Find the zone you want to use as reference and choose **Select** in the respective row.

1. Use the [Update DNS settings](https://developers.cloudflare.com/api/resources/dns/subresources/settings/subresources/zone/methods/edit/) endpoint to add a reference from an internal zone to another internal zone. In `--json`, specify the `internal_dns` object with the parameter `reference_zone_id`.

In the following example, internal zone A (ID `8a904aeb565c42cfa207d98f6edea2f3`) is referencing internal zone B (ID `8e64c6fb4b514f3faf64de81efc11e51`).

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone DNS Settings Write`
* `DNS Write`

Update DNS Settings

```

curl "https://api.cloudflare.com/client/v4/zones/8a904aeb565c42cfa207d98f6edea2f3/dns_settings" \

  --request PATCH \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "internal_dns": {

        "reference_zone_id": "8e64c6fb4b514f3faf64de81efc11e51"

    }

  }'


```

## 2\. Link your internal zone to a view

Since the resolver policy will require a [DNS view](https://developers.cloudflare.com/dns/internal-dns/dns-views/), you must have at least one view to be able to route requests to internal zones.

* [ Dashboard ](#tab-panel-8081)
* [ API ](#tab-panel-8082)

1. In the Cloudflare dashboard, go to the **Internal DNS** page.  
[ Go to **Internal DNS** ](https://dash.cloudflare.com/?to=/:account/internal-dns)
2. Go to **Internal DNS Views**.
3. Select **Create a view**.
4. Give your view a descriptive name.

DNS view configuration conditions

* DNS views can be empty, with no [internal zones](https://developers.cloudflare.com/dns/internal-dns/internal-zones/) linked to them.
* A DNS view cannot contain public DNS zones.1
* Each internal DNS zone name must be unique within a given DNS view.
* Each DNS view name must be unique within a given Cloudflare account.

1 DNS zones that contain public DNS records and are accessible by public resolvers.

1. Select **Manage zones** to add zones to your view. Select the internal zones that should be used to resolve queries sent by Gateway resolver to this view.
2. Choose **Save** to confirm.

1. Use the [Create Internal DNS View](https://developers.cloudflare.com/api/resources/dns/subresources/settings/subresources/account/subresources/views/methods/create/) endpoint. For each view you create, list all the internal zones that should be grouped under that view.

DNS view configuration conditions

* DNS views can be empty, with no [internal zones](https://developers.cloudflare.com/dns/internal-dns/internal-zones/) linked to them.
* A DNS view cannot contain public DNS zones.1
* Each internal DNS zone name must be unique within a given DNS view.
* Each DNS view name must be unique within a given Cloudflare account.

1 DNS zones that contain public DNS records and are accessible by public resolvers.

## 3\. Configure Gateway policies

Note

The Gateway configuration must exist within the same Cloudflare account where the internal zone exists.

Besides selecting an internal DNS view when setting up your resolver policies, you can also enable the **fallback through public DNS** option.

* [ Dashboard ](#tab-panel-8079)
* [ API ](#tab-panel-8080)

1. In [Cloudflare One ↗](https://one.dash.cloudflare.com/), go to **Traffic policies** \> **Firewall policies** \> **Resolver policies**.
2. Select **Add a policy** and enter a name and description.
3. Create an expression for the traffic you wish to route. For guidance about selectors, operators, and values, refer to [Gateway resolver policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/#selectors).
4. Select **Use Internal DNS**. Choose the view that queries matching the expression should be sent to.
5. (Optional) Adjust the option to **Fallback through public DNS** according to your use case.
* Off: Gateway DNS resolver returns the response as-is to the client.
* On: In case the response from the internal zone is REFUSED, NXDOMAIN, or a response with a CNAME type, Gateway DNS resolver sends the query to Cloudflare 1.1.1.1 public resolver and tries to resolve the query via public DNS.
1. Select **Create policy** to confirm.

Use the API endpoints under [Zero Trust > Gateway > Rules](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/gateway/subresources/rules/) to set up resolver policies. For guidance about selectors, operators, and values, refer to [Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/#selectors).

Use the rule settings object to define `resolve_dns_internally`, specifying `view_id` and `fallback` option. The fallback options behave as follows:

* `none`: Gateway DNS resolver returns the response as-is to the client.
* `public_dns`: In case the response from the internal zone is REFUSED, NXDOMAIN, or a response with a CNAME type, Gateway DNS resolver sends the query to Cloudflare 1.1.1.1 public resolver and tries to resolve the query via public DNS.

Once you add the Gateway resolver policy, it will be listed in the respective internal view under **Resolver policies referencing this view**.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/internal-dns/get-started/#page","headline":"Get started · Cloudflare DNS docs","description":"Set up Internal DNS for private name resolution.","url":"https://developers.cloudflare.com/dns/internal-dns/get-started/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Private networks"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/internal-dns/","name":"Internal DNS (beta)"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/internal-dns/get-started/","name":"Get started"}}]}
```
