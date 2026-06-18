---
title: NSEC3 support
description: Learn how to enable NSEC3 support with Cloudflare to meet compliance requirements.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# NSEC3 support

As explained in [our blog ↗](https://blog.cloudflare.com/black-lies/), Cloudflare's implementation of negative answers with NSEC is protected against zone walking[1](#user-content-fn-1). This implementation, also referred to as Compact Denial of Existence ([RFC 9824 ↗](https://www.rfc-editor.org/rfc/rfc9824.html)), removes the need for NSEC3 and is significantly more efficient.

However, if you must use NSEC3 for compliance reasons, you can enable it as explained below.

## Enable NSEC3

Use the [Edit DNSSEC Status endpoint](https://developers.cloudflare.com/api/resources/dns/subresources/dnssec/methods/edit/), setting `status` to `active` and `dnssec_use_nsec3` to `true`. You should replace the values started by `$` with your zone ID and authentication credentials. To learn more about using the Cloudflare API, refer to [Fundamentals](https://developers.cloudflare.com/fundamentals/api/get-started/).

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `DNS Write`

Edit DNSSEC Status

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dnssec" \

  --request PATCH \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "dnssec_use_nsec3": true,

    "status": "active"

  }'


```

### Pre-signed DNSSEC

If you use Cloudflare as a secondary DNS provider with [pre-signed DNSSEC](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/dnssec-for-secondary/), setting `dnssec_use_nsec3` to `true` means that Cloudflare will use NSEC3 records as transferred in from your primary DNS provider.

Otherwise, NSEC3 records will be generated and signed at request time.

## Verify NSEC3 is in use

To validate that NSEC3 is being used, consider the following scenarios:

### Non-existent zone name

A command like the following would trigger a signed negative response using NSEC3 for proof of non-existence. Look for NSEC3 records under the `Authority Section` of the response.

Terminal window

```

dig +dnssec doesnotexist.example.com


```

### Non-existent record type at an existing name

If the name `www` exists but the type TXT does not, the example below would trigger a signed NODATA response using NSEC3\. Look for NSEC3 records under the `Authority Section` of the response.

Terminal window

```

dig +dnssec www.example.com TXT


```

## Availability

NSEC3 is only available for zones on the Enterprise plan.

## Footnotes

1. A method where an attacker exploits NSEC negative answers to obtain all names in a given zone. This is possible when such negative answers provide information on the previous and next names in a chain. [↩](#user-content-fnref-1)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/dnssec/enable-nsec3/#page","headline":"NSEC3 support · Cloudflare DNS docs","description":"Learn how to enable NSEC3 support with Cloudflare to meet compliance requirements.","url":"https://developers.cloudflare.com/dns/dnssec/enable-nsec3/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/dnssec/","name":"DNSSEC"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/dnssec/enable-nsec3/","name":"NSEC3 support"}}]}
```
