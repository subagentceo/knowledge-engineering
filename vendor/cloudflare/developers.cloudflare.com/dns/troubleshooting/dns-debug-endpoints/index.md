---
title: Available debug endpoints
description: Use dig commands against Cloudflare nameservers to find your public IP, connected data center, DNS software version, and more.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Available debug endpoints

The following debug endpoints are available via `dig` or other DNS query tools.

Note

For all commands, replace `alex.ns.cloudflare.com` with your Cloudflare-assigned nameservers.

## Get your public IP address

Terminal window

```

dig @alex.ns.cloudflare.com chaos txt myip.cloudflare +short


```

This command returns your public IP address, meaning the IP address that Cloudflare receives the DNS query from. This is useful for debugging when you need to know your own IP.

## Find your connected data center

Terminal window

```

dig @alex.ns.cloudflare.com chaos txt id.server +short


```

This command returns the Cloudflare data center you are connecting to, for DNS queries sent from where you execute this command.

## Check the DNS software version

Terminal window

```

dig @alex.ns.cloudflare.com chaos txt version.bind +short


```

This command returns the version of Cloudflare's authoritative DNS software that is running on the data center you are connected to. Usually, the same version is present on all Cloudflare data centers. However, since Cloudflare performs staged releases, different versions can exist on different data centers.

## Get your IP, ASN, and country code

Terminal window

```

dig @alex.ns.cloudflare.com txt whoami.cloudflare.net +short


```

This command returns your public IP (same as the first command), your ASN, and the associated country code, all indicating where you are sending the query from.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/troubleshooting/dns-debug-endpoints/#page","headline":"Available debug endpoints · Cloudflare DNS docs","description":"Use dig commands against Cloudflare nameservers to find your public IP, connected data center, DNS software version, and more.","url":"https://developers.cloudflare.com/dns/troubleshooting/dns-debug-endpoints/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Debugging"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/troubleshooting/dns-debug-endpoints/","name":"Available debug endpoints"}}]}
```
