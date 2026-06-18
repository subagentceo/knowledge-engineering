---
title: Update nameservers
description: Update your domain registrar to use Cloudflare nameservers.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Update nameservers

To use Cloudflare DNS as an authoritative DNS provider - be it in a [primary (full)](https://developers.cloudflare.com/dns/zone-setups/full-setup/) or [secondary](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/) setup -, your domain nameservers must point to nameservers that you get from your Cloudflare account. Updating your nameservers is required to activate your domain on Cloudflare and use most of our [application services](https://developers.cloudflare.com/fundamentals/concepts/how-cloudflare-works/).

Cloudflare Registrar

If you acquired your domain from [Cloudflare Registrar](https://developers.cloudflare.com/registrar/), your domain already uses Cloudflare nameservers, automatically protecting and speeding up your content or services. If you need to update your nameservers to use a different DNS provider, you will have to [transfer your domain from Cloudflare](https://developers.cloudflare.com/registrar/account-options/transfer-out-from-cloudflare/).

---

## Specific processes

Although Cloudflare will [provide you the nameservers](https://developers.cloudflare.com/dns/nameservers/#authoritative-nameservers-offering) or allow you to create your own [custom nameservers](https://developers.cloudflare.com/dns/nameservers/custom-nameservers/), the final step to make Cloudflare an authoritative DNS provider for your domain may have to be done outside of Cloudflare. If you are not using [Cloudflare Registrar](https://developers.cloudflare.com/registrar/), consider which of the following sections correspond to your use case.

Custom or advanced nameservers

If you are using Cloudflare Registrar with [custom nameservers](https://developers.cloudflare.com/dns/nameservers/custom-nameservers/) or [advanced nameservers](https://developers.cloudflare.com/dns/foundation-dns/setup/), note that you must [reach out to support](https://developers.cloudflare.com/support/contacting-cloudflare-support/) to have the nameservers updated accordingly.

### Your domain uses a different registrar

If you have acquired your domain from a [registrar ↗](https://www.cloudflare.com/learning/dns/glossary/what-is-a-domain-name-registrar/) other than Cloudflare Registrar - and it has not been [delegated](#your-domain-is-delegated) \- you need to update your nameservers at your registrar.

If you do not know who your registrar is, you can use a Whois search, such as [ICANN Lookup ↗](https://lookup.icann.org/). If the registrar indicated on your Whois search result is not a service that you have interacted directly with, you may [have acquired your domain from a reseller](#you-have-acquired-your-domain-from-a-reseller).

Provider-specific instructions

This is not an exhaustive list of provider-specific instructions, but the following links may be helpful:

* [Ionos ↗](https://www.ionos.com/help/domains/using-your-own-name-servers/using-your-own-name-servers-for-a-domain/)
* [101Domain ↗](https://help.101domain.com/kb/managing-name-server-records)
* [Amazon ↗](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/domain-name-servers-glue-records.html#domain-name-servers-glue-records-adding-changing)
* [Blacknight ↗](https://help.blacknight.com/hc/articles/4413036322321-How-do-I-change-the-nameservers-for-my-domain)
* [BlueHost ↗](https://www.bluehost.com/help/article/custom-nameservers)
* [DirectNIC ↗](https://directnic.com/knowledge/article/33:how%2Bdo%2Bi%2Bmodify%2Bname%2Bservers%2Bfor%2Bmy%2Bdomain%2Bname%253F)
* [DNSMadeEasy ↗](http://www.dnsmadeeasy.com/support/faq/)
* [Domain.com ↗](https://www.domain.com/help/article/domain-management-how-to-update-nameservers)
* [Dotster ↗](https://www.dotster.com/help/article/domain-management-how-to-update-nameservers)
* [DreamHost ↗](https://help.dreamhost.com/hc/en-us/articles/360038897151)
* [EasyDNS ↗](https://kb.easydns.com/knowledge/settingchanging-nameservers/)
* [Enom ↗](https://help.enom.com/hc/en-us/articles/115000486451-Nameservers-NS)
* [Fast Domain ↗](https://www.fastdomain.com/hosting/help/transfer%5Fclient%5Fstart)
* [FlokiNET ↗](https://billing.flokinet.is/index.php?rp=/knowledgebase/57/Nameserver-and-DNS-records.html)
* [Gandi ↗](https://docs.gandi.net/en/domain%5Fnames/common%5Foperations/changing%5Fnameservers.html)
* [GoDaddy ↗](https://www.godaddy.com/help/change-nameservers-for-your-domain-names-664)
* [HostGator ↗](https://www.hostgator.com/help/article/changing-name-servers)
* [Hostico ↗](https://hostico.ro/docs/setarea-nameserverelor-din-contul-de-client-hostico/)
* [HostMonster ↗](https://my.hostmonster.com/cgi/help/222)
* [Hover ↗](https://support.hover.com/support/solutions/articles/201000064742-changing-your-domain-nameservers)
* [Internetdbs ↗](https://faq.internetbs.net/hc/en-gb/articles/4516921367837-How-to-update-Nameservers-for-a-domain)
* [iPage ↗](https://www.ipage.com/help/article/domain-management-how-to-update-nameservers)
* [MelbourneIT ↗](https://support.melbourneit.au/docs/how-do-i-manage-my-dns-on-cpanel)
* [Moniker ↗](https://support.moniker.com/hc/en-gb/articles/10101271418653-How-to-update-Nameservers-for-a-domain)
* [Name.com ↗](https://www.name.com/support/articles/205934457-registering-custom-nameservers)
* [Namecheap ↗](https://www.namecheap.com/support/knowledgebase/article.aspx/767/10/how-can-i-change-the-nameservers-for-my-domain)
* [Network Solutions ↗](https://www.networksolutions.com/manage-it/edit-nameservers.jsp)
* [OVH ↗](https://docs.ovh.com/gb/en/domains/web%5Fhosting%5Fgeneral%5Finformation%5Fabout%5Fdns%5Fservers/#step-2-edit-your-domains-dns-servers)
* [Porkbun ↗](https://kb.porkbun.com/article/22-how-to-change-your-nameservers)
* [Rackspace ↗](https://support.rackspace.com/how-to/rackspace-name-servers/)
* [Register ↗](https://www.register.com/knowledge)
* [Squarespace ↗](https://support.squarespace.com/hc/articles/4404183898125-Nameservers-and-DNSSEC-for-Squarespace-managed-domains#toc-open-the-domain-s-advanced-settings)
* [Site5 ↗](https://kb.site5.com/dns-2/custom-nameservers/)
* [Softlayer ↗](https://cloud.ibm.com/docs/dns?topic=dns-add-edit-or-delete-custom-name-servers-for-a-domain)
* [Yola ↗](https://helpcenter.yola.com/hc/articles/360012492660-Changing-your-name-servers)

### You have acquired your domain from a reseller

Some services, such as website builders ([Squarespace ↗](https://support.squarespace.com/hc/articles/115003671428-Who-s-my-domain-provider), for example), are not registrars but act as a [reseller ↗](https://www.icann.org/resources/pages/reseller-2013-05-03-en), allowing you to buy domains directly from them.

In that case, you may have to update your nameservers in the reseller platform, not at the registrar.

Note

Refer to [Squarespace documentation ↗](https://support.squarespace.com/hc/articles/4404183898125-Nameservers-and-DNSSEC-for-Squarespace-managed-domains#toc-open-the-domain-s-advanced-settings) on how to update nameservers in their platform.

### Your domain is delegated

If you are onboarding a subdomain `shop.example.com` as a [child domain](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/), the parent domain (`example.com`) must delegate authority to the child domain.

Delegation means that `shop.example.com` has specific `NS` records set up for it within the DNS records management of the parent zone (`example.com`).

If that is the case, when setting up your zone in Cloudflare or opting for a different set of [nameservers](https://developers.cloudflare.com/dns/nameservers/), you have to update the `NS` records in the parent domain, and not at the registrar.

---

## Restricted nameserver management

Some providers act as registrars but do not expose nameserver settings. If you cannot change nameservers at your registrar or hosting platform, you can either:

* Transfer your domain to a registrar that allows nameserver management.
* Transfer your domain to Cloudflare Registrar. All domains on [Cloudflare Registrar](https://developers.cloudflare.com/registrar/) automatically use Cloudflare nameservers.
* Use a [CNAME setup (partial)](https://developers.cloudflare.com/dns/zone-setups/partial-setup/) instead. This option does not require nameserver changes and is available on Business and Enterprise plans.

---

## Further guidance

This page covers specific workflows that customers who do not use Cloudflare Registrar[1](#user-content-fn-1) might have to follow to update their domain nameservers. For complete tutorials, refer to the pages below. Full setup is the most common option, and the only one available for customers on the Free or Pro plans.

* [ Primary setup (Full) ](https://developers.cloudflare.com/dns/zone-setups/full-setup/)
* [ CNAME setup (Partial) ](https://developers.cloudflare.com/dns/zone-setups/partial-setup/)
* [ DNS Zone transfers ](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/)
* [ Subdomain setup ](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/)
* [ Reference ](https://developers.cloudflare.com/dns/zone-setups/reference/)
* [ Troubleshooting ](https://developers.cloudflare.com/dns/zone-setups/troubleshooting/)
* [ DNS setup conversions ](https://developers.cloudflare.com/dns/zone-setups/conversions/)
* [ Zone removal ](https://developers.cloudflare.com/dns/zone-setups/removal/)

## Footnotes

1. If you acquired your domain from Cloudflare Registrar, your domain already uses and must remain on Cloudflare nameservers. For details, refer to [Registrar](https://developers.cloudflare.com/registrar/faq/#can-i-change-my-nameservers). [↩](#user-content-fnref-1)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/nameservers/update-nameservers/#page","headline":"Update nameservers · Cloudflare DNS docs","description":"Update your domain registrar to use Cloudflare nameservers.","url":"https://developers.cloudflare.com/dns/nameservers/update-nameservers/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/nameservers/","name":"Nameservers"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/nameservers/update-nameservers/","name":"Update nameservers"}}]}
```
