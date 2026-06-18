---
title: DNSSEC states
description: Possible DNSSEC states and their meanings.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# DNSSEC states

This page describes different DNSSEC states and how they relate to the responses you get from the [DNSSEC details API endpoint](https://developers.cloudflare.com/api/resources/dns/subresources/dnssec/methods/get/).

| State            | API response                                             | Description                                                                                                                                                                                                                  |
| ---------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pending          | "status":"pending" "modified\_on":<TIME\_STAMP>          | DNSSEC has been enabled but the Cloudflare DS record has not been added at the registrar.                                                                                                                                    |
| Active           | "status":"active" "modified\_on":<TIME\_STAMP>           | DNSSEC has been enabled and the Cloudflare DS record is present at the registrar.                                                                                                                                            |
| Pending-disabled | "status":"pending-disabled" "modified\_on":<TIME\_STAMP> | DNSSEC has been disabled but the Cloudflare DS record is still added at the registrar.                                                                                                                                       |
| Disabled         | "status":"disabled" "modified\_on":<TIME\_STAMP>         | DNSSEC has been disabled and the Cloudflare DS record has been removed from the registrar.                                                                                                                                   |
| Deleted          | "status":"disabled" "modified\_on": null                 | DNSSEC has never been enabled for the zone or DNSSEC has been disabled and then deleted using the [Delete DNSSEC records endpoint](https://developers.cloudflare.com/api/resources/dns/subresources/dnssec/methods/delete/). |

Warning

Once you have enabled DNSSEC on a zone for the first time, you cannot transition directly from an `active` state to a `deleted` state. You can only [delete DNSSEC records](https://developers.cloudflare.com/api/resources/dns/subresources/dnssec/methods/delete/) once your zone DNSSEC is in a `disabled` state. Cloudflare prevents you from deleting DNSSEC records before removing the DS record from the registrar to avoid DNS resolution issues.

In both `pending` and `active` states, Cloudflare signs the zone and responds with RRSIG, NSEC, DNSKEY, CDS, and CDNSKEY record types.

In `pending-disabled` and `disabled` states, Cloudflare still signs the zone and serves RRSIG, NSEC, and DNSKEY record types, but the CDS and CDNSKEY records are set to zero ([RFC 8078 ↗](https://www.rfc-editor.org/rfc/rfc8078.html#section-4)), signaling to the registrar that DNSSEC should be disabled.

In `deleted` state, Cloudflare does **not** sign the zone and does **not** respond with RRSIG, NSEC, DNSKEY, CDS, and CDNSKEY record types.

Refer to [How DNSSEC works ↗](https://www.cloudflare.com/dns/dnssec/how-dnssec-works/) to learn more about the authentication process and records involved.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/dnssec/dnssec-states/#page","headline":"DNSSEC states · Cloudflare DNS docs","description":"Possible DNSSEC states and their meanings.","url":"https://developers.cloudflare.com/dns/dnssec/dnssec-states/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/dnssec/","name":"DNSSEC"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/dnssec/dnssec-states/","name":"DNSSEC states"}}]}
```
