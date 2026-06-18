---
title: Minimize downtime
description: Learn how to minimize downtime while onboarding your domain onto Cloudflare.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Minimize downtime

When making any change to the routing of an Internet application, there is always a possibility of downtime due to certificate issuance, misconfigured settings, or limitations at your origin server. To avoid downtime when going live, it is important to review the most common configurations.

## Update and review DNS records

Before activating your domain on Cloudflare (exact steps depend on your [DNS setup](https://developers.cloudflare.com/dns/zone-setups/)), review the DNS records in your Cloudflare account.

### Start with unproxied records

With a new domain, make sure all of your DNS records have a [proxy status](https://developers.cloudflare.com/dns/proxy-status/) of **DNS-only**.

This setting prevents Cloudflare from proxying your traffic before you have an active edge certificate or before you have allowed Cloudflare IP addresses.

### Confirm record accuracy

Take extra time to confirm the accuracy of your DNS records before activating your domain, paying special attention to:

* [Zone apex records (example.com)](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-zone-apex/)
* [Subdomain records (www.example.com or blog.example.com)](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-subdomain/)
* [Email records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/email-records/)

If you add DNS records to your authoritative DNS provider between onboarding your domain and activating your domain, you may need to also add these records within Cloudflare.

## Activate your domain

Finish the [DNS setup](https://developers.cloudflare.com/dns/zone-setups/) for your domain, moving the [domain status](https://developers.cloudflare.com/dns/zone-setups/reference/domain-status/) to **Active**:

* [Full setups](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/): Update the authoritative nameservers at your registrar and wait for that change to be authenticated.
* [Partial setups](https://developers.cloudflare.com/dns/zone-setups/partial-setup/setup/): Add the verification TXT record to your authoritative DNS and wait for that change to be authenticated.

## Verify SSL/TLS edge certificates

Before proxying your traffic through Cloudflare, [verify](https://developers.cloudflare.com/ssl/reference/certificate-statuses/#monitor-certificate-statuses) that Cloudflare has an active **Edge Certificate** for your domain.

For more details about timing and certificate recommendations, refer to [Certificate issuance](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/enable-universal-ssl/#full-dns-setup).

## Optional - Test configuration

You may want to test your configuration using your local machine or proxying traffic from a development domain or subdomain.

If you experience issues, you should make sure that you have [allowed Cloudflare IP addresses](https://developers.cloudflare.com/fundamentals/concepts/cloudflare-ip-addresses/) at your origin server.

## Update proxy status

Once you have verified that your SSL/TLS edge certificate is active and you have allowed Cloudflare IP addresses, change the [proxy status](https://developers.cloudflare.com/dns/proxy-status/) of appropriate DNS records to **Proxied**.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/performance/minimize-downtime/#page","headline":"Minimize downtime · Cloudflare Fundamentals docs","description":"Learn how to minimize downtime while onboarding your domain onto Cloudflare.","url":"https://developers.cloudflare.com/fundamentals/performance/minimize-downtime/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/performance/","name":"Performance"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/performance/minimize-downtime/","name":"Minimize downtime"}}]}
```
