---
title: Configure DNS zone defaults
description: Set default DNS settings applied to new zones in your account.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Configure DNS zone defaults

While there are default values for DNS settings that Cloudflare applies to all new zones, Enterprise accounts have the option to configure their own DNS zone defaults according to their preference.

Warning

DNS zone defaults are only applied at the moment a new zone is created and will not impact already existing zones, nor zones that existed previously and are being revived.

Any of the values specified as default can later be adjusted within each zone, on the respective [**DNS Settings** ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/settings) or [**DNS Records** ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/records) page.

## Steps

1. In the Cloudflare dashboard, go to the account **Settings** page.  
[ Go to **Configurations** ](https://dash.cloudflare.com/?to=/:account/configurations)
2. Go to **DNS Settings**. If these options are not displayed on your Cloudflare dashboard, you may need to reach out to your account team to have them added.
3. For **DNS zone defaults**, select **Configure defaults**.

The values you select for the listed settings will be automatically applied to new zones as you add them to your Cloudflare account.

## Available settings

* [Nameserver assignment](https://developers.cloudflare.com/dns/nameservers/nameserver-options/#assignment-method): Select your preferred nameserver type or assignment method that you want Cloudflare to use for your new zones. This setting applies both to primary zones ([full setup](https://developers.cloudflare.com/dns/zone-setups/full-setup/)) and [secondary zones](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/).

For primary zones:

* [Multi-provider DNS](https://developers.cloudflare.com/dns/nameservers/nameserver-options/#multi-provider-dns): Control whether or not Cloudflare will consider `NS` records you add on the zone apex and if zones that contain external nameservers listed in the registrar will be activated.
* [Nameserver TTL](https://developers.cloudflare.com/dns/nameservers/nameserver-options/#nameserver-ttl): Control how long, in seconds, your nameserver (`NS`) records are cached. The default time-to-live (TTL) is 24 hours. This setting applies both to Cloudflare nameservers and [custom nameservers](https://developers.cloudflare.com/dns/nameservers/custom-nameservers/).
* [SOA record](https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/#soa): Adjust values for the start of authority (SOA) record that Cloudflare creates for your zone.

For secondary zones:

* [Secondary DNS override](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/proxy-traffic/): Enable the options to use Cloudflare [proxy](https://developers.cloudflare.com/dns/proxy-status/) and add `CNAME` records at your zone apex.  
Multi-provider DNS does not apply as a setting for secondary zones, as this is already a required behavior for this setup. `SOA` record and the `NS` record TTL are defined on your external DNS provider and only transferred into Cloudflare.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/additional-options/dns-zone-defaults/#page","headline":"Configure DNS zone defaults · Cloudflare DNS docs","description":"Set default DNS settings applied to new zones in your account.","url":"https://developers.cloudflare.com/dns/additional-options/dns-zone-defaults/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/additional-options/","name":"Additional options"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/additional-options/dns-zone-defaults/","name":"Configure DNS zone defaults"}}]}
```
