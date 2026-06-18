---
title: Add a site
description: Add your domain to Cloudflare DNS.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Add a site

In clientless access deployments, users connect to internal applications via public hostnames. You will need to own a domain, add it to Cloudflare, and configure Cloudflare as the [authoritative DNS provider](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/#34-update-your-registrar) for that domain. Enterprise customers who cannot change their authoritative DNS provider have the option to configure a [CNAME setup](https://developers.cloudflare.com/dns/zone-setups/partial-setup/).

You only need to add one domain to Cloudflare, since you can create an infinite number of subdomains to manage all of your private applications.

## Add a site to Cloudflare

1. Log in to the [Cloudflare dashboard ↗](https://dash.cloudflare.com/login).
2. Select **Onboard a domain**.
3. Enter your website's apex domain (`example.com`).
4. Select a [plan ↗](https://www.cloudflare.com/plans/#compare-features) for this website. Everything you need to do with the domain in Cloudflare Zero Trust is available on the **Free** plan.
5. Select **Continue**. Cloudflare will scan your website for any configured DNS records.

Note

If Cloudflare is unable to identify your domain as a registered domain, make sure you are using an existing [top-level domain ↗](https://www.cloudflare.com/learning/dns/top-level-domain/) (`.com`, `.net`, `.biz`, or others).

Additionally, Cloudflare requires your `apex domain` to be one level below a valid TLD defined in the [Public Suffix List (PSL) ↗](https://github.com/publicsuffix/list/blob/master/public%5Fsuffix%5Flist.dat).

1. Review your DNS records and select **Continue**.
2. Before your domain can begin using Cloudflare for DNS resolution, you need to [add these nameservers](https://developers.cloudflare.com/dns/nameservers/update-nameservers/) at your registrar. Make sure [DNSSEC](https://developers.cloudflare.com/dns/dnssec/) is turned off before proceeding.  
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
If you cannot change your domain nameservers, you can still use Cloudflare on your website by activating Cloudflare through a [certified hosting partner ↗](https://www.cloudflare.com/en-gb/partners/technology-partners/).
3. (Optional) Follow the **Quick Start Guide** to configure security and performance settings.

Registrars can take up to 24 hours to process nameserver changes. Your domain must be in an **Active** status before you can use it for clientless access.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/clientless-access/initial-setup/add-site/#page","headline":"Add a site · Cloudflare Learning Paths","description":"Add your domain to Cloudflare DNS.","url":"https://developers.cloudflare.com/learning-paths/clientless-access/initial-setup/add-site/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/clientless-access/initial-setup/","name":"Initial setup"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/clientless-access/initial-setup/add-site/","name":"Add a site"}}]}
```
