---
title: Access Control Lists (ACLs)
description: Manage access control lists for DNS zone transfers.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Access Control Lists (ACLs)

Access Control Lists (ACLs) define allowed source IP addresses from where servers accept incoming data or control messages.

When setting up new DNS zone transfers ([incoming](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/) or [outgoing](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-primary/)), you will need to update the ACL at your other DNS provider(s) to allow Cloudflare to communicate with their server(s). You can find the Cloudflare IP addresses you need to allow at your other DNS provider(s) at [Cloudflare IP addresses](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/access-control-lists/cloudflare-ip-addresses/).

For your Cloudflare account, you only need to [create a new ACL](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/access-control-lists/create-new-list/) if you want to specify additional NOTIFY IPs that Cloudflare should listen to.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/zone-setups/zone-transfers/access-control-lists/#page","headline":"Access Control Lists (ACLs) · Cloudflare DNS docs","description":"Manage access control lists for DNS zone transfers.","url":"https://developers.cloudflare.com/dns/zone-setups/zone-transfers/access-control-lists/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/zone-setups/","name":"DNS setups"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/zone-setups/zone-transfers/","name":"DNS Zone transfers"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/zone-setups/zone-transfers/access-control-lists/","name":"Access Control Lists (ACLs)"}}]}
```
