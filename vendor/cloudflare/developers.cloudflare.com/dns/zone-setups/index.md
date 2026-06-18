---
title: DNS setups
description: Available DNS zone setup types and how to configure them.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# DNS setups

When using Cloudflare DNS, you have a few options for your DNS zone setup:

* [Primary setup (Full)](https://developers.cloudflare.com/dns/zone-setups/full-setup/) (most common): Use Cloudflare as your primary DNS provider and manage your DNS records on Cloudflare.
* [CNAME setup (Partial)](https://developers.cloudflare.com/dns/zone-setups/partial-setup/): Keep your primary DNS provider and only use Cloudflare's reverse proxy for individual subdomains.
* [Zone transfers](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/): Use Cloudflare and another DNS provider together across your entire zone to increase availability and fault tolerance. DNS records will be transferred between providers using [AXFR ↗](https://datatracker.ietf.org/doc/html/rfc5936) or [IXFR ↗](https://datatracker.ietf.org/doc/html/rfc1995).
* [Subdomain setup](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/): With your apex domain (`example.com`) on a CNAME setup (partial) or primary setup (full), independently manage the settings for a delegated subdomain (`blog.example.com`) within a separate zone and, potentially, a separate account.  
When configuring a subdomain setup, its availability will depend on both the parent zone setup and the setup used for the child zone. A child zone holds DNS management for a delegated subdomain.  
| Parent zone                                                                                                                                                                     | Child zone                                                                                             | Available |  
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | --------- |  
| [Full](https://developers.cloudflare.com/dns/zone-setups/full-setup/) or [Secondary](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/) | [Full](https://developers.cloudflare.com/dns/zone-setups/full-setup/)                                  | Yes       |  
| [Full](https://developers.cloudflare.com/dns/zone-setups/full-setup/) or [Secondary](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/) | [Secondary](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/) | Yes       |  
| [Full](https://developers.cloudflare.com/dns/zone-setups/full-setup/) or [Secondary](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/) | [Partial](https://developers.cloudflare.com/dns/zone-setups/partial-setup/)                            | No        |  
| [Partial](https://developers.cloudflare.com/dns/zone-setups/partial-setup/)                                                                                                     | [Full](https://developers.cloudflare.com/dns/zone-setups/full-setup/)                                  | Yes       |  
| [Partial](https://developers.cloudflare.com/dns/zone-setups/partial-setup/)                                                                                                     | [Secondary](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/) | Yes       |  
| [Partial](https://developers.cloudflare.com/dns/zone-setups/partial-setup/)                                                                                                     | [Partial](https://developers.cloudflare.com/dns/zone-setups/partial-setup/)                            | Yes       |  
    
For details, refer to [setup](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/setup/).

---

## Zone status

The possible statuses for a zone are the following:

* Initializing
* Pending
* Active
* Moved
* Deleted
* Purged

For details on each status and how a zone can transition from one status to the other, consider the [Reference page](https://developers.cloudflare.com/dns/zone-setups/reference/domain-status/).

Do not use pending zones in production

If you have a paid plan, make sure not to use pending zones for production traffic. Cloudflare responds to DNS queries for pending zones on the assigned Cloudflare nameserver IPs but there are associated risks, especially if you do not use [zone holds](https://developers.cloudflare.com/fundamentals/account/account-security/zone-holds/).

---

## Common use cases and availability

If you are unsure of which setup to use, consider the questions below for an overview of common use cases and their correspondence to each setup and [different pricing plans ↗](https://www.cloudflare.com/plans/#overview).

Are you on a Free or Pro plan?

If you are on a Free or Pro plan, [primary setup (full)](https://developers.cloudflare.com/dns/zone-setups/full-setup/) is the only one available. This is the recommended and most common option.

Will you be using Cloudflare with other DNS providers?

If you are on a Business or Enterprise plan, you can use [CNAME setup (partial)](https://developers.cloudflare.com/dns/zone-setups/partial-setup/) to keep your primary DNS provider and only proxy individual subdomains through Cloudflare.

If you are on an Enterprise plan, you also have the option to use [zone transfers](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/) to set up Cloudflare as either a primary or a secondary DNS provider.

Do you need to manage subdomains separately?

If you are on an Enterprise plan, you can use [subdomain setup](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/) to manage the Cloudflare settings for one or more subdomains separately from your domain apex.

Note

If you run your own authoritative nameservers but still want to benefit from Cloudflare's global anycast network, check out [DNS Firewall](https://developers.cloudflare.com/dns/dns-firewall/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/zone-setups/#page","headline":"DNS setups · Cloudflare DNS docs","description":"Available DNS zone setup types and how to configure them.","url":"https://developers.cloudflare.com/dns/zone-setups/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/zone-setups/","name":"DNS setups"}}]}
```
