---
title: Troubleshooting
description: Resolve common error messages and unexpected behavior when setting up your Cloudflare account and domain.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Troubleshooting

When you [set up Cloudflare](https://developers.cloudflare.com/fundamentals/account/), you may experience the following issues or error messages.

## Error messages

* [ERR\_TOO\_MANY\_REDIRECTS](https://developers.cloudflare.com/ssl/troubleshooting/too-many-redirects/)
* [525 or 526 errors](https://developers.cloudflare.com/ssl/troubleshooting/too-many-redirects/)
* [Cannot add DNS records with the same name](https://developers.cloudflare.com/dns/manage-dns-records/troubleshooting/records-with-same-name/)
* [ERR\_SSL\_VERSION\_OR\_CIPHER\_MISMATCH or SSL\_ERROR\_NO\_CYPHER\_OVERLAP](https://developers.cloudflare.com/ssl/troubleshooting/version-cipher-mismatch/)
* [DNS\_PROBE\_FINISHED\_NXDOMAIN](https://developers.cloudflare.com/dns/troubleshooting/dns-probe-finished-nxdomain/)
* [Record exposing origin server IP address](https://developers.cloudflare.com/dns/manage-dns-records/troubleshooting/exposed-ip-address/)
* [Mixed content errors](https://developers.cloudflare.com/ssl/troubleshooting/mixed-content-errors/)
* [SSL errors in appear in my browser](https://developers.cloudflare.com/ssl/troubleshooting/general-ssl-errors/)

## Behavior

* [Why are Cloudflare's IPs in my origin web server logs?](https://developers.cloudflare.com/support/troubleshooting/restoring-visitor-ips/restoring-original-visitor-ips/)
* [Is Cloudflare attacking me?](#is-cloudflare-attacking-me)
* [Cannot add domain to Cloudflare](https://developers.cloudflare.com/dns/zone-setups/troubleshooting/cannot-add-domain/)
* [My domain’s email stopped working](https://developers.cloudflare.com/dns/troubleshooting/email-issues/)
* [Why is my site served over HTTP instead of HTTPS?](https://developers.cloudflare.com/ssl/edge-certificates/encrypt-visitor-traffic/)
* [SSL is not working for my second-level subdomain, such as dev.www.example.com](https://developers.cloudflare.com/ssl/troubleshooting/general-ssl-errors/#only-some-of-your-subdomains-return-ssl-errors)
* [Why was my domain deleted from Cloudflare?](https://developers.cloudflare.com/dns/zone-setups/troubleshooting/domain-deleted/)

## Cloudflare

* [Gather information to troubleshoot site issues](https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/gathering-information-for-troubleshooting-sites/)
* [Contact Cloudflare support](https://developers.cloudflare.com/support/contacting-cloudflare-support/)
* [Manage email notifications](https://developers.cloudflare.com/fundamentals/user-profiles/customize-account/#notifications)

## General resources

* [DNS FAQ](https://developers.cloudflare.com/dns/faq/)
* [SSL/TLS FAQ](https://developers.cloudflare.com/ssl/faq/)

## Is Cloudflare attacking me

Two common scenarios falsely lead to the perception that Cloudflare is attacking your site:

* Unless you [restore the original visitor IP addresses](https://developers.cloudflare.com/support/troubleshooting/restoring-visitor-ips/restoring-original-visitor-ips/), Cloudflare IP addresses appear in your server logs for all proxied requests.
* The attacker is spoofing Cloudflare's IPs. Cloudflare only [sends traffic to your origin web server over a few specific ports](https://developers.cloudflare.com/fundamentals/reference/network-ports/) unless you use [Cloudflare Spectrum](https://developers.cloudflare.com/spectrum/).

Ideally, because Cloudflare is a reverse proxy, your hosting provider observes attack traffic connecting from [Cloudflare IP addresses ↗](https://www.cloudflare.com/ips/). In contrast, if you notice connections from IP addresses that do not belong to Cloudflare, the attack is direct to your origin web server. Cloudflare cannot stop attacks directly to your origin IP address because the traffic bypasses Cloudflare's network.

Note

If an attacker is directly targeting your origin web server, refer to [Proactive DDoS defense best practices](https://developers.cloudflare.com/ddos-protection/best-practices/proactive-defense/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/reference/troubleshooting/#page","headline":"Troubleshooting · Cloudflare Fundamentals docs","description":"Resolve common error messages and unexpected behavior when setting up your Cloudflare account and domain.","url":"https://developers.cloudflare.com/fundamentals/reference/troubleshooting/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/reference/troubleshooting/","name":"Troubleshooting"}}]}
```
