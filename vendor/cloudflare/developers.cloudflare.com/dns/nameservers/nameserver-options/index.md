---
title: Nameserver options
description: Available nameserver configuration options.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Nameserver options

Refer to the sections below to learn about different Cloudflare nameserver options. Note that the availability of these options depends on your plan. Also, if you acquired your domain from Cloudflare Registrar, your domain already uses and [must remain](https://developers.cloudflare.com/registrar/faq/#can-i-change-my-nameservers) on Cloudflare nameservers.

## Assignment method

When you add a domain on a [primary (full)](https://developers.cloudflare.com/dns/zone-setups/full-setup/) or [secondary](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/) DNS setup, Cloudflare automatically assigns your nameservers.

The default assignment method is to use [standard nameservers](https://developers.cloudflare.com/dns/nameservers/#standard-nameservers) and favor consistent nameserver names across all zones within an account. Nonetheless, in case there are conflicts, you may get different nameserver names, even for domains that are within the same account.

Warning

To prevent domain hijacking, you can no longer preset Cloudflare nameservers at your registrar before creating the respective zone in Cloudflare. If you preset your nameservers and then add the domain, your domain will be assigned a new pair of nameservers.

These nameserver assignments cannot be changed. However, depending on your subscription, you may have different options for better nameserver consistency.

### Nameserver consistency

The level of consistency you can expect when adding new zones depends on the configured nameserver type.

* For [standard nameservers](https://developers.cloudflare.com/dns/nameservers/#standard-nameservers), since a conflict can be caused by anyone adding the same zone to any other Cloudflare account, the likelihood of your new zone being assigned different nameserver names than your previously existing zones is higher.
* If you use [account custom nameservers](https://developers.cloudflare.com/dns/nameservers/custom-nameservers/account-custom-nameservers/), the only conflict would be between a parent and a child zone, which makes consistent assignment across new zones more likely.
* With [tenant custom nameservers](https://developers.cloudflare.com/dns/nameservers/custom-nameservers/tenant-custom-nameservers/) or [Foundation DNS advanced nameservers](https://developers.cloudflare.com/dns/foundation-dns/advanced-nameservers/#nameservers-hosting-and-assignment), there can still be conflicts caused by two zones with the same name being added to different accounts, but, since access to these features is more restricted, the likelihood of your new zone being assigned different nameserver names than your previously existing zones is lower.

### DNS zone defaults

If you have an Enterprise account, you also have the option to [configure your own DNS zone defaults](https://developers.cloudflare.com/dns/additional-options/dns-zone-defaults/) and change how Cloudflare handles nameserver assignment when you add a new zone to your account:

* **Standard nameservers randomized**: instead of attempting consistency, Cloudflare assigns random pairs of nameserver names every time you add a new domain to your account.
* **Advanced nameservers**: Cloudflare uses the same method as the default - trying to keep nameserver names consistent for different zones within an account - but uses the specific [Foundation DNS nameservers](https://developers.cloudflare.com/dns/foundation-dns/advanced-nameservers/).
* **Account custom nameservers**: Cloudflare automatically assigns a set of [account custom nameservers](https://developers.cloudflare.com/dns/nameservers/custom-nameservers/account-custom-nameservers/) that you have previously configured for your account. In this method, **Set 1** will be attempted first and, in case of any conflicts, Cloudflare will cycle through the other nameserver sets, in ascending order.

Warning

DNS zone defaults are only applied at the moment a new zone is created and will not impact already existing zones, nor zones that existed previously and are being revived.

Any of the values specified as default can later be adjusted within each zone, on the respective [**DNS Settings** ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/settings) or [**DNS Records** ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/records) page.

## Multi-provider DNS

Multi-provider DNS is an optional setting for zones using [primary setup (full)](https://developers.cloudflare.com/dns/zone-setups/full-setup/) and is an enforced default behavior for zones using [secondary setup](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/).

When you enable multi-provider DNS on a primary zone:

* Cloudflare will no longer ignore `NS` records created on the zone apex, as in the example below.  
| Type | Name | Nameserver       |  
| ---- | ---- | ---------------- |  
| NS   | @    | ns1.external.com |

This means that responses to DNS queries made to the zone apex and requesting `NS` records will contain both Cloudflare's and your other DNS providers' nameservers.

* Cloudflare will activate a primary zone (full setup) even if its [nameservers listed at the registrar](https://developers.cloudflare.com/dns/nameservers/update-nameservers/) include nameservers from other DNS providers.

Warning

If you choose this option and you also want to use DNSSEC on your zone, make sure to set up [multi-signer DNSSEC](https://developers.cloudflare.com/dns/dnssec/multi-signer-dnssec/).

## Nameserver TTL

For both Cloudflare nameservers (standard or advanced) and custom nameservers, the `NS` record time-to-live (TTL) is controlled by the specific setting on the **DNS Records** page, under **DNS record options**.

Foundation DNS

**DNS record options** are part of [Foundation DNS](https://developers.cloudflare.com/dns/foundation-dns/). If you are an Enterprise customer and **Nameserver TTL** is not displayed on your Cloudflare dashboard, reach out to your account team.

The default TTL is 24 hours (or 86,400 seconds), but you have the option to lower this value depending on your needs. For example, shorter TTLs can be useful when you are changing nameservers or migrating a zone. Accepted values range from 30 to 86,400 seconds.

This setting can also be configured as a [DNS zone default](https://developers.cloudflare.com/dns/additional-options/dns-zone-defaults/), meaning new zones created in your account will automatically start with the value you define.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/nameservers/nameserver-options/#page","headline":"Nameserver options · Cloudflare DNS docs","description":"Available nameserver configuration options.","url":"https://developers.cloudflare.com/dns/nameservers/nameserver-options/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/nameservers/","name":"Nameservers"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/nameservers/nameserver-options/","name":"Nameserver options"}}]}
```
