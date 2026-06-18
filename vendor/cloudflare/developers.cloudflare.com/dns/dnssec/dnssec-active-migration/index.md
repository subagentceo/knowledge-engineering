---
title: Migrate an existing zone with DNSSEC enabled
description: Follow this tutorial to migrate an existing DNS zone to Cloudflare without having to disable DNSSEC.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Migrate an existing zone with DNSSEC enabled

Follow this tutorial to migrate an existing DNS zone to Cloudflare without having to disable DNSSEC.

Warning

This procedure involves cross-importing the [zone signing keys (ZSKs) ↗](https://www.cloudflare.com/learning/dns/dns-records/dnskey-ds-records/) from one provider to the other. To learn more about this, consider this article [about multi-signer DNSSEC](https://developers.cloudflare.com/dns/dnssec/multi-signer-dnssec/about/) or refer to [RFC 8901 ↗](https://www.rfc-editor.org/rfc/rfc8901.html).

This is an advanced procedure and assume some familiarity with [DNS concepts](https://developers.cloudflare.com/dns/concepts/), [API operations](https://developers.cloudflare.com/fundamentals/api/), and basic setup steps. Assumed knowledge that is not detailed in this tutorial can be referenced through the linked content in each of the steps.

## Requirement

The provider you are migrating from must allow you to add DNSKEY records on the zone apex and use these records in responses to DNS queries.

## 1\. Set up Cloudflare

1. [Add your zone to Cloudflare](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/).  
To add your zone using the API, refer to the [Create Zone endpoint](https://developers.cloudflare.com/api/resources/zones/methods/create/).
2. [Review the records found by the automatic scan](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/) or [import your zone file](https://developers.cloudflare.com/dns/manage-dns-records/how-to/import-and-export/).  
To import the zone file using the API, refer to the [Import DNS Records endpoint](https://developers.cloudflare.com/api/resources/dns/subresources/records/methods/import/).
3. On the [**DNS Settings** ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/settings) page, select **Enable DNSSEC**. Or use the following [API request](https://developers.cloudflare.com/api/resources/dns/subresources/dnssec/methods/edit/).

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `DNS Write`

Edit DNSSEC Status

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dnssec" \

  --request PATCH \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "status": "active"

  }'


```

1. On the [**DNS Settings** ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/settings) page, enable **Multi-signer DNSSEC**. Or use the following [API request](https://developers.cloudflare.com/api/resources/dns/subresources/dnssec/methods/edit/).

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `DNS Write`

Edit DNSSEC Status

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dnssec" \

  --request PATCH \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "dnssec_multi_signer": true

  }'


```

## 2\. Cross-import ZSKs

1. Add the [ZSK ↗](https://www.cloudflare.com/learning/dns/dns-records/dnskey-ds-records/) of your previous provider to Cloudflare by creating a DNSKEY record on your zone.

You can do this [on the dashboard](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/#create-dns-records) or through the [Create DNS Record endpoint](https://developers.cloudflare.com/api/resources/dns/subresources/records/methods/create/), as in the following example.

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

1. Get Cloudflare's ZSK using either the API or a query from one of the assigned Cloudflare nameservers.

API example:

Terminal window

```

curl https://api.cloudflare.com/client/v4/zones/{zone_id}/dnssec/zsk \

--header "X-Auth-Email: <EMAIL>" \

--header "X-Auth-Key: <API_KEY>"


```

Command line query example:

Terminal window

```

dig <ZONE_NAME> dnskey @<CLOUDFLARE_NAMESERVER> +noall +answer | grep 256


```

1. Add Cloudflare's ZSK that you fetched in the last step to your previous provider.

Note

You can check if both providers are responding with both ZSKs by running one `dig` command for each, as in the following example. You can also use [Dig Web Interface ↗](https://www.digwebinterface.com/?type=DNSKEY).

Terminal window

```

dig <ZONE_NAME> dnskey @<PREVIOUS_PROVIDER_NAMESERVER> +noall +answer

dig <ZONE_NAME> dnskey @<CLOUDFLARE_NAMESERVER> +noall +answer


```

Both queries should return both ZSKs (identified with tag `256`).

Example

Terminal window

```

dig multisigner.info dnskey @dns1.p01.nsone.net. +noall +answer


```

```

multisigner.info.    3600    IN    DNSKEY    257 3 13 t+4D<bla_bla_bla>JBmA==

multisigner.info.    3600    IN    DNSKEY    256 3 13 pxEU<bla_bla_bla>0xOg==

multisigner.info.    3600    IN    DNSKEY    256 3 13 oJM<bla_bla_bla>XhSA==


```

Terminal window

```

dig multisigner.info dnskey @ashley.ns.cloudflare.com +noall +answer


```

```

multisigner.info.    3600    IN    DNSKEY    257 3 13 mdss<bla_bla_bla>eKGQ==

multisigner.info.    3600    IN    DNSKEY    256 3 13 oJM<bla_bla_bla>XhSA==

multisigner.info.    3600    IN    DNSKEY    256 3 13 pxEU<bla_bla_bla>0xOg==


```

## 3\. Set up registrar

1. Add Cloudflare DS record to your registrar. You can see your Cloudflare DS record on the [**DNS Settings** ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/settings) page, under **DS Record**.
2. Add Cloudflare assigned nameservers to your registrar. You can see your Cloudflare nameservers on the [**DNS Records** ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/records) page

At this point your zone is in a [multi-signer DNSSEC setup](https://developers.cloudflare.com/dns/dnssec/multi-signer-dnssec/).

## 4\. Remove previous provider

1. Remove your previous provider's DS record from your registrar.
2. Remove your previous provider's nameservers from your registrar.
3. After waiting at least one and a half times the [TTL ↗](https://www.cloudflare.com/learning/cdn/glossary/time-to-live-ttl/) of your previous provider DS record, you can remove the DNSKEY record (containing your previous provider ZSK) that you added to your Cloudflare zone in [step 2](#2-cross-import-zsks).

Note

You can find out the TTL of your previous provider DS record by running a `dig` command, as in the following example, or by using this [Dig Web Interface link ↗](https://www.digwebinterface.com/?type=DS).

Terminal window

```

dig multisigner.info ds +noall +answer


```

```

multisigner.info. 3600 IN DS 2371 13 2 227B4C7FF3E1D49D59BAF39BDA54CA0839DE700DD9896076AA3E6AD7 19A0CF55

multisigner.info. 3600 IN DS 48553 13 2 893709B51A9C53D011A4054B15FC5454BEDF68E739BB3B3FA1E333DA 7B8DACFE


```

In this example, both DS records have a TTL of `3600` seconds. Cloudflare's DS record always has the key tag set to `2371`, so the second line of the response is the DS record of the other provider.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/dnssec/dnssec-active-migration/#page","headline":"DNSSEC migration tutorial · Cloudflare DNS docs","description":"Follow this tutorial to migrate an existing DNS zone to Cloudflare without having to disable DNSSEC.","url":"https://developers.cloudflare.com/dns/dnssec/dnssec-active-migration/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Migration"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/dnssec/","name":"DNSSEC"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/dnssec/dnssec-active-migration/","name":"Migrate an existing zone with DNSSEC enabled"}}]}
```
