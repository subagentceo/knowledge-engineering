---
title: Setup
description: Set up a subdomain zone in Cloudflare.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Setup

Availability

Subdomain setup is only available for Enterprise accounts. If you only want to create a subdomain for your site in Cloudflare, refer to [Create a subdomain record](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-subdomain/).

[Subdomain setup](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/) relies on a process known as delegation. When, in a parent domain such as `example.com`, an [NS record ↗](https://www.cloudflare.com/learning/dns/dns-records/dns-ns-record/) is created for a subdomain `blog.example.com`, this means that DNS management for the subdomain can be done separately, in its own [DNS zone](https://developers.cloudflare.com/dns/concepts/#zone).

    flowchart TD
      accTitle: Example of parent zone and subdomains
      A[<code>example.com</code>] --> B[<code>docs.example.com</code>]
      A[<code>example.com</code>] --> C[<code>blog.example.com</code>]
      subgraph Parent domain
        A
      end
      subgraph Subdomains
        B
        C
      end

---

## Available setups

When configuring a subdomain setup, its availability will depend on both the parent zone setup and the setup used for the child zone. A child zone holds DNS management for a delegated subdomain.

| Parent zone                                                                                                                                                                     | Child zone                                                                                             | Available |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | --------- |
| [Full](https://developers.cloudflare.com/dns/zone-setups/full-setup/) or [Secondary](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/) | [Full](https://developers.cloudflare.com/dns/zone-setups/full-setup/)                                  | Yes       |
| [Full](https://developers.cloudflare.com/dns/zone-setups/full-setup/) or [Secondary](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/) | [Secondary](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/) | Yes       |
| [Full](https://developers.cloudflare.com/dns/zone-setups/full-setup/) or [Secondary](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/) | [Partial](https://developers.cloudflare.com/dns/zone-setups/partial-setup/)                            | No        |
| [Partial](https://developers.cloudflare.com/dns/zone-setups/partial-setup/)                                                                                                     | [Full](https://developers.cloudflare.com/dns/zone-setups/full-setup/)                                  | Yes       |
| [Partial](https://developers.cloudflare.com/dns/zone-setups/partial-setup/)                                                                                                     | [Secondary](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/) | Yes       |
| [Partial](https://developers.cloudflare.com/dns/zone-setups/partial-setup/)                                                                                                     | [Partial](https://developers.cloudflare.com/dns/zone-setups/partial-setup/)                            | Yes       |

Subdomain zones in partial setup are not delegated

Subdomains using a CNAME setup (partial) represent an exception in the sense that delegation does not apply in this context. As explained in the dedicated [CNAME setup (Partial) section](https://developers.cloudflare.com/dns/zone-setups/partial-setup/), this setup is intended to simply proxy individual subdomains through Cloudflare. For completeness, however, this is listed as an option in this table and the [how-to guide](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/setup/parent-on-partial/) has detailed explanation on how to achieve a subdomain zone using a CNAME setup (partial).

This table assumes zones that are in an [active status](https://developers.cloudflare.com/dns/zone-setups/reference/domain-status/). For example, if you need to add the parent zone to Cloudflare when its child zone already exists in a CNAME setup (partial), you can [convert the parent zone to a CNAME setup (partial)](https://developers.cloudflare.com/dns/zone-setups/partial-setup/setup/#1-convert-your-zone-and-review-dns-records) while it is still in pending status.

---

## How to

Refer to the following guides to learn how to configure a subdomain setup depending on the setup used for the parent zone:

* [ Parent zone on full setup ](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/setup/parent-on-full/)
* [ Parent zone on partial setup ](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/setup/parent-on-partial/)

Although the how-to guides in this documentation are focused on both parent domains and subdomains existing in Cloudflare, it is also possible to achieve a subdomain setup in Cloudflare while the parent domain exists in a different DNS provider.

---

## SSL/TLS certificates

When using subdomain setup, you should consider possible interactions between parent zone and child zone configurations that could impact [SSL/TLS certificates](https://developers.cloudflare.com/ssl/) provisioning.

If a certificate is already active on the child zone for a specific hostname (`subdomain.example.com`), any certificate pack containing that exact hostname in the parent zone (`example.com`) will fail validation.

## Access applications

To use subdomain setups with [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/), note that:

* If the child zone is in a pending state when you create the Access application, your configuration will not automatically apply when you activate the zone. You must also re-save the Access application once your subdomain setup is active.
* If you split out a subdomain which already has an Access application, you will also need to re-save the Access application to associate it with the new child zone.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/setup/#page","headline":"Subdomain delegation and available setups · Cloudflare DNS docs","description":"Set up a subdomain zone in Cloudflare.","url":"https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/setup/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-29","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/zone-setups/","name":"DNS setups"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/zone-setups/subdomain-setup/","name":"Subdomain setup"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/zone-setups/subdomain-setup/setup/","name":"Setup"}}]}
```
