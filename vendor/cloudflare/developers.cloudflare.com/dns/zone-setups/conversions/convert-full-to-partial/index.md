---
title: Convert full setup to partial setup
description: Convert a full DNS setup to a partial CNAME setup.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Convert full setup to partial setup

If you initially configured a [primary setup (full)](https://developers.cloudflare.com/dns/zone-setups/full-setup/), you can later convert your zone to use a CNAME setup (also known as partial setup). This guide assumes your zone is already in an [active status](https://developers.cloudflare.com/dns/zone-setups/reference/domain-status/#active).

A CNAME setup allows you to use [Cloudflare's reverse proxy](https://developers.cloudflare.com/fundamentals/concepts/how-cloudflare-works/) on individual subdomains while using a different authoritative DNS provider.

---

## Before you begin

### Consider CNAME setup limitations

* A CNAME setup requires a CNAME record for each proxied hostname but, following [RFC 1912 ↗](https://datatracker.ietf.org/doc/html/rfc1912#section-2.4), CNAME records are not allowed on the zone apex (`example.com`). With a CNAME setup, you can only proxy the zone apex if your authoritative DNS provider supports [CNAME flattening ↗](https://blog.cloudflare.com/introducing-cname-flattening-rfc-compliant-cnames-at-a-domains-root/) (or an equivalent like ALIAS/ANAME records), or if you create A/AAAA records pointing the apex directly to Cloudflare [anycast IP addresses](https://developers.cloudflare.com/fundamentals/concepts/cloudflare-ip-addresses/). Otherwise, you can only proxy subdomains.  
Warning  
Cloudflare only recommends the A/AAAA approach if you use [Static IPs](https://developers.cloudflare.com/byoip/concepts/static-ips/) or [Bring Your Own IP (BYOIP)](https://developers.cloudflare.com/byoip/), because standard Cloudflare anycast IPs can change.
* Once your zone is using CNAME setup, on the dashboard, you will only be able to create A, AAAA, and CNAME records, which are the DNS record types that can be [proxied](https://developers.cloudflare.com/dns/proxy-status/).

### Plan for SSL/TLS certificates

Universal SSL deletion

If you are using [Universal SSL](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/), converting to a CNAME setup will delete your existing Universal SSL certificates.

New Universal SSL certificates will be [provisioned](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/enable-universal-ssl/#partial-dns-setup) for your proxied subdomains only after each CNAME record pointing to `{your-hostname}.cdn.cloudflare.net` is in place, and domain ownership is verified with the TXT record, as [explained below](#2-convert-the-zone).

To avoid downtime, replace your Universal SSL certificates with an [advanced certificate](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/), which will persist during the transition. After the conversion, you can optionally configure [delegated DCV](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/methods/delegated-dcv/#setup).

---

## 1\. Prepare new DNS provider

1. Export a zone file  
   * [ Dashboard ](#tab-panel-8123)  
   * [ API ](#tab-panel-8124)  
To export records using the dashboard:  
   1. In the Cloudflare dashboard, go to the **DNS Records** page.  
   [ Go to **Records** ](https://dash.cloudflare.com/?to=/:account/:zone/dns/records)  
   2. Select **Import and Export**.  
   3. Select **Export**.  
To export records using the API, send a [GET request](https://developers.cloudflare.com/api/resources/dns/subresources/records/methods/export/).  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `DNS Read`  
   * `DNS Write`  
Export DNS Records  
```  
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/export" \  
  --request GET \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"  
```
2. Import the zone file into your new primary DNS provider.
3. At your new authoritative DNS provider, create or update records so that you have CNAME records pointing to `{your-hostname}.cdn.cloudflare.net` for every hostname you wish to proxy through Cloudflare.  
Example CNAME record at authoritative DNS provider  
The CNAME record for `www.example.com` would be:  
```  
www.example.com CNAME www.example.com.cdn.cloudflare.net  
```

## 2\. Convert the zone

* [ Dashboard ](#tab-panel-8121)
* [ API ](#tab-panel-8122)

1. On the Cloudflare dashboard, go to the zone's **Overview** page.
2. Select **Convert to CNAME DNS Setup** and then **Convert** to confirm.
3. Save the information from the **Verification TXT Record** and add the record at your new authoritative DNS provider. If you lose the information, you can also access it on the [**DNS Records** ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/records) page, under **Verification TXT Record**.  
Example verification record  
A verification record for `example.com` might be:  
| Type | Name                          | Content             |  
| ---- | ----------------------------- | ------------------- |  
| TXT  | cloudflare-verify.example.com | 966215192-518620144 |

1. Use the [Edit Zone endpoint](https://developers.cloudflare.com/api/resources/zones/methods/edit/) with `type` set to `partial` to convert the zone type.
2. Take note of the value returned under `verification_key` in the API response and add the corresponding TXT record at your new authoritative DNS provider.  
Example verification record  
A verification record for `example.com` might be:  
| Type | Name                          | Content             |  
| ---- | ----------------------------- | ------------------- |  
| TXT  | cloudflare-verify.example.com | 966215192-518620144 |

Note

If your authoritative DNS provider automatically appends DNS record `name` fields with your domain, make sure to only insert `cloudflare-verify` as the record name. Otherwise, it may result in an incorrect record name, such as `cloudflare-verify.example.com.example.com`.

The verification record must remain in place for as long as your domain is active on a CNAME setup on Cloudflare.

## 3\. Update your nameservers

Update the nameservers at your domain registrar to point to your new authoritative DNS provider. Make sure to remove the Cloudflare nameservers.

## 4\. Clean up DNS records on Cloudflare

In Cloudflare, remove all records that are not of type A, AAAA, or CNAME, and also remove any A, AAAA, or CNAME records for hostnames you do not want to proxy after the conversion. After this cleanup, only the A, AAAA, or CNAME records for hostnames you want to proxy should remain in Cloudflare, and those same hostnames should have CNAME records pointing to `{your-hostname}.cdn.cloudflare.net` at your new authoritative DNS provider.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/zone-setups/conversions/convert-full-to-partial/#page","headline":"Convert full setup to partial setup · Cloudflare DNS docs","description":"Convert a full DNS setup to a partial CNAME setup.","url":"https://developers.cloudflare.com/dns/zone-setups/conversions/convert-full-to-partial/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/zone-setups/","name":"DNS setups"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/zone-setups/conversions/","name":"DNS setup conversions"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/zone-setups/conversions/convert-full-to-partial/","name":"Convert full setup to partial setup"}}]}
```
