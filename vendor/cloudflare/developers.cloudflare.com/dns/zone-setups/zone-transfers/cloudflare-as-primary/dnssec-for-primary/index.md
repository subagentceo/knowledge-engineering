---
title: Set up DNSSEC with Cloudflare as Primary
description: With outgoing zone transfers, you keep Cloudflare as your primary DNS provider and use one or more secondary providers for increased availability and fault tolerance.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Set up DNSSEC with Cloudflare as Primary

With [outgoing zone transfers](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-primary/), you keep Cloudflare as your primary DNS provider and use one or more secondary providers for increased availability and fault tolerance.

If you want to use DNSSEC with outgoing zone transfers, you should configure [multi-signer DNSSEC](https://developers.cloudflare.com/dns/dnssec/multi-signer-dnssec/). After setting up [Cloudflare as primary](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-primary/setup/), follow the steps below to enable DNSSEC.

## Before you begin

Note that:

* This process requires that your other DNS provider(s) also support multi-signer DNSSEC.
* Although you can complete a few steps via the dashboard, currently the whole process can only be completed using the API.
* Enabling **DNSSEC** and **Multi-signer DNSSEC** in [**DNS Settings** ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/settings) only replaces the first step below. You still have to follow the rest of this tutorial to complete the setup.

## Steps

1. Use the [Edit DNSSEC Status endpoint](https://developers.cloudflare.com/api/resources/dns/subresources/dnssec/methods/edit/) to enable DNSSEC and activate multi-signer DNSSEC for your zone. This is done by setting `status` to `active` and `dnssec_multi_signer` to `true`, as in the following example.

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

Terminal window

```

curl 'https://api.cloudflare.com/client/v4/zones/{zone_id}/dns_records' \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>" \

--header "Content-Type: application/json" \

--data '{

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

1. Once the DNSKEY record is transferred out from Cloudflare to your secondary provider, get Cloudflare's ZSK and manually add it to the DNSKEY record.  
Currently, the ZSK is not automatically transferred out. You can use either the API or a query from one of the assigned Cloudflare nameservers to obtain it.

API example:

Terminal window

```

curl 'https://api.cloudflare.com/client/v4/zones/{zone_id}/dnssec/zsk' \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>"


```

Command line query example:

Terminal window

```

$ dig <ZONE_NAME> dnskey @<CLOUDFLARE_NAMESERVER> +noall +answer | grep 256


```

1. Add DS records to your registrar, one for each provider. You can see your Cloudflare DS record on the [**DNS Settings** ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/settings) page, under **DS Record**.

The nameserver settings at your registrar should include the nameservers of all providers you will be using for your multi-signer DNSSEC setup.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-primary/dnssec-for-primary/#page","headline":"Set up multi-signer DNSSEC with outgoing zone transfers · Cloudflare DNS docs","description":"With outgoing zone transfers, you keep Cloudflare as your primary DNS provider and use one or more secondary providers for increased availability and fault tolerance.","url":"https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-primary/dnssec-for-primary/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/zone-setups/","name":"DNS setups"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/zone-setups/zone-transfers/","name":"DNS Zone transfers"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/zone-setups/zone-transfers/cloudflare-as-primary/","name":"Cloudflare as Primary"}},{"@type":"ListItem","position":6,"item":{"@id":"/dns/zone-setups/zone-transfers/cloudflare-as-primary/dnssec-for-primary/","name":"Set up DNSSEC with Cloudflare as Primary"}}]}
```
