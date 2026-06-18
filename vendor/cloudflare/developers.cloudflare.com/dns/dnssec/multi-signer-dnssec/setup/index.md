---
title: Set up multi-signer DNSSEC
description: Configure multi-signer DNSSEC for your zone.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Set up multi-signer DNSSEC

This page explains how you can enable [multi-signer DNSSEC](https://developers.cloudflare.com/dns/dnssec/multi-signer-dnssec/about/) with Cloudflare, using the [model 2](https://developers.cloudflare.com/dns/dnssec/multi-signer-dnssec/about/#model-2) as described in [RFC 8901 ↗](https://www.rfc-editor.org/rfc/rfc8901.html).

## Before you begin

Note that:

* This process requires that your other DNS provider(s) also support multi-signer DNSSEC.
* Although you can complete a few steps via the dashboard, currently the whole process can only be completed using the API.
* Enabling **DNSSEC** and **Multi-signer DNSSEC** on the [**DNS Settings** ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/settings) page only replaces the first step in [1\. Set up Cloudflare zone](#1-set-up-cloudflare-zone). You still have to follow the rest of this tutorial to complete the setup.

## 1\. Set up Cloudflare zone

### Cloudflare as Primary (full setup)

If you use Cloudflare as a primary DNS provider, meaning that you manage your DNS records in Cloudflare, do the following:

* [ Dashboard ](#tab-panel-8071)
* [ API ](#tab-panel-8072)

1. In the Cloudflare dashboard, go to the **DNS Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/dns/settings)
2. Select **Enable DNSSEC** and **Confirm**.

Note

For the purpose of this tutorial, you will update your registrar with the DS record later, in [Step 3](https://developers.cloudflare.com/dns/dnssec/multi-signer-dnssec/setup/#3-set-up-registrar).

1. Also enable **Multi-signer DNSSEC** and **Multi-provider DNS**.
2. Go to the [**DNS Records** ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/records) page and create the following records at your zone apex (meaning you should use `@` in the record **Name** field):  
   * A [DNSKEY record](https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/#ds-and-dnskey) with the zone signing key(s) (ZSKs) of your external provider(s).  
   * An [NS record](https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/#ns) with your external provider nameservers.

1. Use the [Edit DNSSEC Status endpoint](https://developers.cloudflare.com/api/resources/dns/subresources/dnssec/methods/edit/) to enable DNSSEC and activate multi-signer DNSSEC for your zone. Set `status` to `active` and `dnssec_multi_signer` to `true`, as in the following example.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `DNS Write`

Edit DNSSEC Status

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dnssec" \

  --request PATCH \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "status": "active",

    "dnssec_multi_signer": true

  }'


```

1. Add the ZSK(s) of your external provider(s) to Cloudflare by creating a DNSKEY record on your zone.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `DNS Write`

Create DNS Record

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "type": "DNSKEY",

    "name": "<ZONE_NAME>",

    "data": {

        "flags": 256,

        "protocol": 3,

        "algorithm": 13,

        "public_key": "<PUBLIC_KEY>"

    },

    "ttl": 3600

  }'


```

1. Add your external provider(s) nameservers as NS records on your zone apex.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `DNS Write`

Create DNS Record

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \

  --request POST \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "type": "NS",

    "name": "<ZONE_NAME>",

    "content": "<NS_DOMAIN>",

    "ttl": 86400

  }'


```

1. Enable the usage of the nameservers you added in the previous step by using the API request below.

Warning

This step is required. Without turning on this setting, Cloudflare will ignore any `NS` records created on the zone apex. This means that responses to DNS queries made to the zone apex and requesting `NS` records will only contain Cloudflare nameservers.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone DNS Settings Write`
* `DNS Write`

Update DNS Settings

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_settings" \

  --request PATCH \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "multi_provider": true

  }'


```

### Cloudflare as Secondary

If you use Cloudflare as a secondary DNS provider, do the following:

* [ Dashboard ](#tab-panel-8069)
* [ API ](#tab-panel-8070)

1. In the Cloudflare dashboard, go to the **DNS Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/dns/settings)
2. For **DNSSEC with Secondary DNS** select **Live signing**.

Note

For the purpose of this tutorial, you will update your registrar with the DS record later, in [Step 3](https://developers.cloudflare.com/dns/dnssec/multi-signer-dnssec/setup/#3-set-up-registrar).

1. Also enable **Multi-signer DNSSEC**.
2. Add the zone signing key(s) (ZSKs) of your external provider(s) to a DNSKEY record at your primary DNS provider. This record should be transferred successfully to Cloudflare.
3. Add your external provider(s) nameservers as NS records on your zone apex at your primary DNS provider. These records should be transferred successfully to Cloudflare.

1. Use the [Edit DNSSEC Status endpoint](https://developers.cloudflare.com/api/resources/dns/subresources/dnssec/methods/edit/) to enable DNSSEC and activate multi-signer DNSSEC for your zone. Set `status` to `active` and `dnssec_multi_signer` to `true`, as in the following example.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `DNS Write`

Edit DNSSEC Status

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dnssec" \

  --request PATCH \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "status": "active",

    "dnssec_multi_signer": true

  }'


```

1. Add the ZSK(s) of your external provider(s) to a DNSKEY record at your primary DNS provider. This record should be transferred successfully to Cloudflare.
2. Add your external provider(s) nameservers as NS records on your zone apex at your primary DNS provider. These records should be transferred successfully to Cloudflare.

## 2\. Set up external provider

1. Get Cloudflare's ZSK using either the API or a query from one of the assigned Cloudflare nameservers.

API example:

Terminal window

```

curl "https://api.cloudflare.com/client/v4/zones/{zone_id}/dnssec/zsk" \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>"


```

Command line query example:

Terminal window

```

$ dig <ZONE_NAME> dnskey @<CLOUDFLARE_NAMESERVER> +noall +answer | grep 256


```

1. Add Cloudflare's ZSK that you fetched in the previous step to the DNSKEY record set of your external provider(s).
2. Add Cloudflare's nameservers to the NS record set at your external provider(s).

## 3\. Set up registrar

1. Add DS records to your registrar, one for each provider. You can see your Cloudflare DS record on the [**DNS Settings** ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/settings) page, under **DS Record**.
2. Update the nameserver settings at your registrar to include the nameservers of all providers you will be using for your multi-signer DNSSEC setup.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/dnssec/multi-signer-dnssec/setup/#page","headline":"Set up multi-signer DNSSEC · Cloudflare DNS docs","description":"Configure multi-signer DNSSEC for your zone.","url":"https://developers.cloudflare.com/dns/dnssec/multi-signer-dnssec/setup/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/dnssec/","name":"DNSSEC"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/dnssec/multi-signer-dnssec/","name":"Multi-signer DNSSEC"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/dnssec/multi-signer-dnssec/setup/","name":"Set up multi-signer DNSSEC"}}]}
```
