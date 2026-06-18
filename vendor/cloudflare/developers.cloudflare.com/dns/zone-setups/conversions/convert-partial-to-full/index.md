---
title: Convert partial setup to full setup
description: If you initially set up a partial domain on Cloudflare, you can later migrate it to a full setup.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Convert partial setup to full setup

If you initially set up a partial domain on Cloudflare, you can later migrate it to a [primary setup](https://developers.cloudflare.com/dns/zone-setups/full-setup/) (also know as full setup).

Subdomain setup

If you also use subdomain setup[1](#user-content-fn-1), consider the [available combinations](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/setup/#available-setups) and whether your zone conversion could have any implications.

## Footnotes

1. Meaning you have one or more subdomains (`sub.example.com`) added to Cloudflare as their own zone, separate from your apex domain (`example.com`). [↩](#user-content-fnref-1)

## 1\. Prepare Cloudflare SSL/TLS

In the Cloudflare dashboard, either order an [advanced certificate](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/manage-certificates/) or [upload a custom SSL certificate](https://developers.cloudflare.com/ssl/edge-certificates/custom-certificates/uploading/) for your website or application.

You should also verify that the [status](https://developers.cloudflare.com/ssl/reference/certificate-statuses/) of your SSL certificate is **Active**.

Note

It is possible to use [Universal SSL](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/) instead, but you should consider the following:

* Universal certificates can take at least [15 minutes](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/enable-universal-ssl/#full-dns-setup) to be issued.
* You should make sure to add Cloudflare nameservers to your registrar within 72 hours of the conversion process.
* Universal SSL only supports first-level subdomains. You can use [Advanced certificates](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/) with the [Total TLS](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/total-tls/) option to automatically issue certificates for any proxied hostname.
* To minimize downtime, it is recommended having a certificate in place beforehand.

## 2\. Update settings in authoritative DNS

At least 24 hours prior to converting your zone, disable DNSSEC at your authoritative DNS provider.

Note

As a best practice, you should also delete the previous [zone activation TXT record](https://developers.cloudflare.com/dns/zone-setups/partial-setup/setup/#1-convert-your-zone-and-review-dns-records) at your authoritative DNS provider. To locate this value in the Cloudflare dashboard, go to the [**DNS Records** ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/records) page and find the **Verification TXT Record**.

## 3\. Convert to full setup

In the Cloudflare dashboard:

1. In the Cloudflare dashboard, select your partial zone (CNAME setup) and go to the **DNS Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/dns/settings)
2. Select **Convert to Primary DNS** (this will not affect how your traffic is proxied).
3. Import your records into Cloudflare DNS and verify that they have been configured correctly. Usually, you will want to import [unproxied records](https://developers.cloudflare.com/dns/proxy-status/).

## 4\. Activate full setup

Get your assigned Cloudflare nameservers from the [**DNS Records** ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/records) page and [update your nameservers](https://developers.cloudflare.com/dns/nameservers/update-nameservers/) at your registrar.

Warning

If you are counting on Universal SSL certificates to cover your website or application, make sure to add Cloudflare nameservers to your registrar within 72 hours of the conversion process.

Cloudflare recommends that you also [enable DNSSEC](https://developers.cloudflare.com/dns/dnssec/) from the [**DNS Settings** ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/settings) page and add the DS record to your registrar.

Once all the DNS TTLs expire, all your DNS queries will be answered by the Cloudflare global network.

Start proxying additional hostnames by enabling the [proxy status](https://developers.cloudflare.com/dns/proxy-status/) (also known as orange-clouding) for specific DNS records. Previously proxied subdomains will continue to be proxied without any interruption.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/zone-setups/conversions/convert-partial-to-full/#page","headline":"Convert partial setup to full setup · Cloudflare DNS docs","description":"If you initially set up a partial domain on Cloudflare, you can later migrate it to a full setup.","url":"https://developers.cloudflare.com/dns/zone-setups/conversions/convert-partial-to-full/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/zone-setups/","name":"DNS setups"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/zone-setups/conversions/","name":"DNS setup conversions"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/zone-setups/conversions/convert-partial-to-full/","name":"Convert partial setup to full setup"}}]}
```
