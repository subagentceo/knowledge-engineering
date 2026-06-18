---
title: Manage internal zones
description: Understand how to set up and manage internal DNS zones with Cloudflare. Explore configuration conditions, zone creation, and available API endpoints.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Manage internal zones

Refer to the following sections to learn how to manage your [internal DNS zones](https://developers.cloudflare.com/dns/internal-dns/internal-zones/).

## Configuration conditions

When setting up internal zones, observe the following conditions:

* Internal zones can contain the same [DNS record types](https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/) that Cloudflare supports for public zones.
* An internal zone can have the same name as a public zone in the same account.
* Each internal zone can be linked to multiple [views](https://developers.cloudflare.com/dns/internal-dns/dns-views/).1
* There can be several internal zones with the same name in one account. However, two internal zones with the same name cannot be linked to the same view.
* Internal zones are not subject to any top-level domain (TLD) restrictions. This means that an internal zone can be created if its TLD is not registered publicly (for example, `xyz.local`), if it is created on the TLD itself (`local`), or even if on the root (`.`).

1 Logical groupings of internal DNS zones that are referenced by Gateway resolver policies to define how a specific query should be resolved.

## Create an internal zone

* [ Dashboard ](#tab-panel-8089)
* [ API ](#tab-panel-8090)

1. In the Cloudflare dashboard, go to the **Internal DNS** page.  
[ Go to **Internal DNS** ](https://dash.cloudflare.com/?to=/:account/internal-dns)
2. Select **Create an internal zone**.
3. Give your internal zone a name.
1. Add DNS records to your internal zone using your preferred option:
* [Import](https://developers.cloudflare.com/dns/manage-dns-records/how-to/import-and-export/) a formatted BIND file.
* Select **Add a record** and choose **Create** under the record type you want to add. Refer to [DNS record types](https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/) for details.
1. Repeat this process for each internal zone you wish to add.

Note

Creating multiple internal DNS records in batch is currently only supported via API.

1. Use the [Create Zone](https://developers.cloudflare.com/api/resources/zones/methods/create/) endpoint to create an [internal zone](https://developers.cloudflare.com/dns/internal-dns/internal-zones/). Specify your account ID and set the `type` to `internal`.

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

## Other API actions

The API endpoints to manage internal zones are the same as for managing public zones. The main difference is that the zone type must be set to `internal`. Refer to the API documentation below for details:

* [Update an internal zone](https://developers.cloudflare.com/api/resources/zones/methods/edit/) (`PATCH`)
* [Get internal zone details](https://developers.cloudflare.com/api/resources/zones/methods/get/) (`GET`)
* [List internal zones](https://developers.cloudflare.com/api/resources/zones/methods/list/) (`GET`)
* [Delete an internal zone](https://developers.cloudflare.com/api/resources/zones/methods/delete/) (`DELETE`)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/internal-dns/internal-zones/setup/#page","headline":"Manage internal zones · Cloudflare DNS docs","description":"Understand how to set up and manage internal DNS zones with Cloudflare. Explore configuration conditions, zone creation, and available API endpoints.","url":"https://developers.cloudflare.com/dns/internal-dns/internal-zones/setup/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Private networks"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/internal-dns/","name":"Internal DNS (beta)"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/internal-dns/internal-zones/","name":"Internal zones"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/internal-dns/internal-zones/setup/","name":"Manage internal zones"}}]}
```
