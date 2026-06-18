---
title: DNSSEC options
description: DNSSEC options for secondary DNS zones.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# DNSSEC options

[DNS Security Extensions (DNSSEC) ↗](https://www.cloudflare.com/learning/dns/dns-security/) increase security by adding cryptographic signatures to DNS records. When you use multiple providers and Cloudflare is secondary, you have a few options to enable DNSSEC for records served by Cloudflare.

* **[Multi-signer DNSSEC](https://developers.cloudflare.com/dns/dnssec/multi-signer-dnssec/setup/)**: Both Cloudflare and your primary DNS provider know the signing keys of each other and perform their own live-signing of DNS records, in accordance with [RFC 8901 ↗](https://www.rfc-editor.org/rfc/rfc8901.html).
* **[Live signing](#set-up-live-signing-dnssec)**: If your domain is not delegated to your primary provider's nameservers and Cloudflare secondary nameservers are the only nameservers authoritatively responding to DNS queries (hidden primary setup), you can choose this option to allow Cloudflare to perform live-signing of your DNS records.
* **[Pre-signed](#set-up-pre-signed-dnssec)**: Your primary DNS provider signs records and transfers out the signatures. Cloudflare then serves these records and signatures as is, without doing any signing. By default, Cloudflare uses [NSEC records ↗](https://www.cloudflare.com/dns/dnssec/how-dnssec-works/) and not NSEC3 - refer to [NSEC3 support](https://developers.cloudflare.com/dns/dnssec/enable-nsec3/) if needed. Also, Pre-signed DNSSEC does not support [Secondary DNS Overrides](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/proxy-traffic/) nor [Load Balancing](https://developers.cloudflare.com/load-balancing/).

---

## Set up multi-signer DNSSEC

Refer to [Set up multi-signer DNSSEC](https://developers.cloudflare.com/dns/dnssec/multi-signer-dnssec/setup/) and follow the instructions, considering the note about Cloudflare as Secondary.

---

## Set up live signing DNSSEC

If you use Cloudflare secondary nameservers as the only nameservers authoritatively responding to DNS queries (hidden primary setup), you can enable live signing DNSSEC to have Cloudflare sign the records for your zone.

In this setup, DNSSEC on your primary DNS provider does not need to be enabled.

* [ Dashboard ](#tab-panel-8157)
* [ API ](#tab-panel-8158)

1. In the Cloudflare dashboard, go to the **DNS Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/dns/settings)
2. Under **DNSSEC with Secondary DNS** select **Live signing**. You will then have access to several necessary values to create a **DS** record at your registrar.
3. Add the **DS** record to your registrar. If Algorithm 13 - Cloudflare's preferred cipher choice - is not listed by your registrar, it may also be called _ECDSA Curve P-256 with SHA-256_.  
Provider-specific DNSSEC instructions  
This is not an exhaustive list, but the following links may be helpful:  
   * [DNSimple ↗](https://support.dnsimple.com/articles/cloudflare-ds-record/)  
   * [Domaindiscount24 ↗](https://support.domaindiscount24.com/hc/articles/4409759478161)  
   * [DreamHost ↗](https://help.dreamhost.com/hc/en-us/articles/219539467)  
   * [Dynadot ↗](https://www.dynadot.com/help/question/set-DNSSEC)  
   * [Enom ↗](https://support.enom.com/support/solutions/articles/201000065386)  
   * [Gandi ↗](https://docs.gandi.net/en/domain%5Fnames/advanced%5Fusers/dnssec.html)  
   * [GoDaddy ↗](https://www.godaddy.com/help/add-a-ds-record-23865)  
   * [Hostinger ↗](https://www.hostinger.com/support/3667267-how-to-use-dnssec-records-at-hostinger/)  
   * [Hover ↗](https://support.hover.com/support/solutions/articles/201000064716)  
   * [Infomaniak ↗](https://faq.infomaniak.com/2187)  
   * [InMotion Hosting ↗](https://www.inmotionhosting.com/support/edu/cpanel/enable-dnssec-cloudflare/)  
   * [INWX ↗](https://kb.inwx.com/en-us/3-nameserver/131)  
   * [Joker.com ↗](https://joker.com/faq/books/jokercom-faq-en/page/dnssec)  
   * [Name.com ↗](https://www.name.com/support/articles/205439058-managing-dnssec)  
   * [Namecheap ↗](https://www.namecheap.com/support/knowledgebase/article.aspx/9722/2232/managing-dnssec-for-domains-pointed-to-custom-dns/)  
   * [NameISP ↗](https://support.nameisp.com/knowledgebase/dns)  
   * [Namesilo ↗](https://www.namesilo.com/support/v2/articles/domain-manager/ds-records)  
   * [OVH ↗](https://help.ovhcloud.com/csm/en-dns-secure-domain-dnssec?id=kb%5Farticle%5Fview&sysparm%5Farticle=KB0051637)  
   * [Squarespace ↗](https://support.squarespace.com/hc/articles/4404183898125-Nameservers-and-DNSSEC-for-Squarespace-managed-domains#toc-dnssec)  
   * [Registro.br ↗](https://registro.br/tecnologia/dnssec/?secao=tutoriais-dns)  
   * [Porkbun ↗](https://kb.porkbun.com/article/93-how-to-install-dnssec) (do not fill out **keyData**)  
   * [TransIP ↗](https://www.transip.eu/knowledgebase/150-secure-domains-custom-nameservers-dnssec/)

1. Use the [Edit DNSSEC Status endpoint](https://developers.cloudflare.com/api/resources/dns/subresources/dnssec/methods/edit/) and set a `status` of `active` for your zone.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `DNS Write`

Edit DNSSEC Status

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dnssec" \

  --request PATCH \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "status": "active"

  }'


```

1. Use the [DNSSEC Details endpoint](https://developers.cloudflare.com/api/resources/dns/subresources/dnssec/methods/get/) to get the necessary values to create a **DS** record at your registrar.
2. Add the **DS** record to your registrar. If Algorithm 13 - Cloudflare's preferred cipher choice - is not listed by your registrar, it may also be called _ECDSA Curve P-256 with SHA-256_.  
Provider-specific DNSSEC instructions  
This is not an exhaustive list, but the following links may be helpful:  
   * [DNSimple ↗](https://support.dnsimple.com/articles/cloudflare-ds-record/)  
   * [Domaindiscount24 ↗](https://support.domaindiscount24.com/hc/articles/4409759478161)  
   * [DreamHost ↗](https://help.dreamhost.com/hc/en-us/articles/219539467)  
   * [Dynadot ↗](https://www.dynadot.com/help/question/set-DNSSEC)  
   * [Enom ↗](https://support.enom.com/support/solutions/articles/201000065386)  
   * [Gandi ↗](https://docs.gandi.net/en/domain%5Fnames/advanced%5Fusers/dnssec.html)  
   * [GoDaddy ↗](https://www.godaddy.com/help/add-a-ds-record-23865)  
   * [Hostinger ↗](https://www.hostinger.com/support/3667267-how-to-use-dnssec-records-at-hostinger/)  
   * [Hover ↗](https://support.hover.com/support/solutions/articles/201000064716)  
   * [Infomaniak ↗](https://faq.infomaniak.com/2187)  
   * [InMotion Hosting ↗](https://www.inmotionhosting.com/support/edu/cpanel/enable-dnssec-cloudflare/)  
   * [INWX ↗](https://kb.inwx.com/en-us/3-nameserver/131)  
   * [Joker.com ↗](https://joker.com/faq/books/jokercom-faq-en/page/dnssec)  
   * [Name.com ↗](https://www.name.com/support/articles/205439058-managing-dnssec)  
   * [Namecheap ↗](https://www.namecheap.com/support/knowledgebase/article.aspx/9722/2232/managing-dnssec-for-domains-pointed-to-custom-dns/)  
   * [NameISP ↗](https://support.nameisp.com/knowledgebase/dns)  
   * [Namesilo ↗](https://www.namesilo.com/support/v2/articles/domain-manager/ds-records)  
   * [OVH ↗](https://help.ovhcloud.com/csm/en-dns-secure-domain-dnssec?id=kb%5Farticle%5Fview&sysparm%5Farticle=KB0051637)  
   * [Squarespace ↗](https://support.squarespace.com/hc/articles/4404183898125-Nameservers-and-DNSSEC-for-Squarespace-managed-domains#toc-dnssec)  
   * [Registro.br ↗](https://registro.br/tecnologia/dnssec/?secao=tutoriais-dns)  
   * [Porkbun ↗](https://kb.porkbun.com/article/93-how-to-install-dnssec) (do not fill out **keyData**)  
   * [TransIP ↗](https://www.transip.eu/knowledgebase/150-secure-domains-custom-nameservers-dnssec/)

---

## Set up pre-signed DNSSEC

### Prerequisites

* Your secondary zone in Cloudflare already exists and zone transfers from your primary DNS provider are working correctly.
* You have considered whether your primary DNS provider uses NSEC or NSEC3, and have enabled [NSEC3 support](https://developers.cloudflare.com/dns/dnssec/enable-nsec3/) if needed.
* Your primary DNS provider transfers out DNSSEC related records, such as RRSIG, DNSKEY, and NSEC.

### Steps

1. Enable DNSSEC at your primary DNS provider.
2. Enable DNSSEC for your zone at Cloudflare, using either the Dashboard or the API.

Warning

Pre-signed DNSSEC does not support [Secondary DNS Overrides](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/proxy-traffic/) nor [Load Balancing](https://developers.cloudflare.com/load-balancing/). Once you enable pre-signed DNSSEC, Cloudflare will treat all your DNS records as DNS-only.

* [ Dashboard ](#tab-panel-8155)
* [ API ](#tab-panel-8156)

1. In the Cloudflare dashboard, go to the **DNS Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/dns/settings)
2. Under **DNSSEC with Secondary DNS** select **Pre-signed**.

Use the [Edit DNSSEC Status endpoint](https://developers.cloudflare.com/api/resources/dns/subresources/dnssec/methods/edit/) and set the `dnssec_presigned` value to `true`.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `DNS Write`

Edit DNSSEC Status

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dnssec" \

  --request PATCH \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "dnssec_presigned": true

  }'


```

1. Make sure Cloudflare nameservers are added at your registrar. You can see your Cloudflare nameservers on the dashboard by going to the [**DNS Records** ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/records) page.
2. Make sure there is a DS record added at your registrar. The DS record is obtained from your primary DNS provider (the signer of the zone) and is what indicates to DNS resolvers that your zone has DNSSEC enabled.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/dnssec-for-secondary/#page","headline":"DNSSEC for Secondary DNS · Cloudflare DNS docs","description":"DNSSEC options for secondary DNS zones.","url":"https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/dnssec-for-secondary/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-22","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/zone-setups/","name":"DNS setups"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/zone-setups/zone-transfers/","name":"DNS Zone transfers"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/zone-setups/zone-transfers/cloudflare-as-secondary/","name":"Cloudflare as Secondary"}},{"@type":"ListItem","position":6,"item":{"@id":"/dns/zone-setups/zone-transfers/cloudflare-as-secondary/dnssec-for-secondary/","name":"DNSSEC options"}}]}
```
