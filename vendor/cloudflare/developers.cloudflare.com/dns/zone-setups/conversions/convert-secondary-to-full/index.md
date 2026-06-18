---
title: Convert secondary setup to full setup
description: If you initially set up incoming zone transfers (Cloudflare as secondary), you can later convert your zone to use a full setup.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Convert secondary setup to full setup

If you initially set up [incoming zone transfers (Cloudflare as secondary)](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/setup/), you can later convert your zone to use a [primary setup](https://developers.cloudflare.com/dns/zone-setups/full-setup/) (also know as full setup).

Subdomain setup

If you also use subdomain setup[1](#user-content-fn-1), consider the [available combinations](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/setup/#available-setups) and whether your zone conversion could have any implications.

## Footnotes

1. Meaning you have one or more subdomains (`sub.example.com`) added to Cloudflare as their own zone, separate from your apex domain (`example.com`). [↩](#user-content-fnref-1)

Follow the steps below to achieve this conversion.

## 1\. Stop transferring the zone

1. In the Cloudflare dashboard, go to the **DNS Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/dns/settings)
2. Under **DNS Zone Transfers**, and select **Manage linked peers**.
3. Unlink the peer and select **Save**.

At this point, your zone will be read-only.

## 2\. Prepare for the conversion

1. Plan for [DNSSEC settings](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/dnssec-for-secondary/). If you were previously using [Pre-signed DNSSEC](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/dnssec-for-secondary/#set-up-pre-signed-dnssec), consider disabling DNSSEC before starting the conversion.  
Warning  
Leaving Pre-signed DNSSEC enabled after converting to a full zone can prevent DNS records from propagating to Cloudflare's edge, causing your zone to return `REFUSED` responses. If you experience this after converting, verify by querying your assigned nameservers using [digwebinterface.com ↗](https://digwebinterface.com/), then check the [DNSSEC Details endpoint](https://developers.cloudflare.com/api/resources/dns/subresources/dnssec/methods/get/) for `dnssec_presigned: true` and disable it using the [Edit DNSSEC Status endpoint](https://developers.cloudflare.com/api/resources/dns/subresources/dnssec/methods/edit/) with `dnssec_presigned` set to `false`.
2. Make sure the [proxy statuses](https://developers.cloudflare.com/dns/proxy-status/) of your DNS records are consistently set:  
   * If you have [Secondary DNS override](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/proxy-traffic/), confirm each record has the appropriate setting (**Proxied** or **DNS only**).  
   * If [Secondary DNS override](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/proxy-traffic/) is disabled, make sure all of your DNS records are listed as **DNS only**.
3. (Optional) For consistency, use the [Update DNS Settings](https://developers.cloudflare.com/api/resources/dns/subresources/settings/subresources/zone/methods/edit/) endpoint to specify SOA record fields according to your needs. Once Cloudflare automatically generates an SOA record for your zone on primary setup (full), the field overrides will be considered.

## 3\. Convert your zone

1. Use the [Edit Zone endpoint](https://developers.cloudflare.com/api/resources/zones/methods/edit/) with `type` set to `full` to convert the zone type. Existing DNS records will not be affected.
2. Go to the [**DNS Records** ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/records) page and take note of your new **Cloudflare Nameservers**.
3. At your domain registrar (or parent zone), [update your nameservers](https://developers.cloudflare.com/dns/nameservers/update-nameservers/). Replace the nameservers ending in `secondary.cloudflare.com` by the ones ending in `ns.cloudflare.com`.  
Note  
If Cloudflare will be your only primary DNS provider, remove any other nameservers as well.
4. Delete the previous SOA record to make sure Cloudflare generates a new one.
5. (Optional) If Cloudflare was previously not signing your records and you wish to use DNSSEC, follow the steps to [Enable DNSSEC](https://developers.cloudflare.com/dns/dnssec/#enable-dnssec).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/zone-setups/conversions/convert-secondary-to-full/#page","headline":"Convert secondary setup to full setup · Cloudflare DNS docs","description":"If you initially set up incoming zone transfers (Cloudflare as secondary), you can later convert your zone to use a full setup.","url":"https://developers.cloudflare.com/dns/zone-setups/conversions/convert-secondary-to-full/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/zone-setups/","name":"DNS setups"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/zone-setups/conversions/","name":"DNS setup conversions"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/zone-setups/conversions/convert-secondary-to-full/","name":"Convert secondary setup to full setup"}}]}
```
