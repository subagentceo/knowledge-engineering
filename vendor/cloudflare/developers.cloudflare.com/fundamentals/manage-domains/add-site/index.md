---
title: Onboard a domain
description: Learn how to onboard your domain to Cloudflare, to speed up and protect your website or application.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Onboard a domain

After you onboard your domain, Cloudflare will act as the [reverse proxy](https://developers.cloudflare.com/fundamentals/concepts/how-cloudflare-works/#cloudflare-as-a-reverse-proxy) and [DNS provider](https://developers.cloudflare.com/fundamentals/concepts/how-cloudflare-works/#cloudflare-as-a-dns-provider) for your site.

This guide applies to existing domains that were purchased from another provider, and will use a [full DNS setup](https://developers.cloudflare.com/dns/zone-setups/full-setup), which is the most common configuration. To set this up, you will have to complete a few steps at Cloudflare, but also update some settings at your domain registrar[1](#user-content-fn-1), and at your previous DNS provider (if you were using one).

Cloudflare Registrar

If you need a new domain, you can [buy one from Cloudflare](https://developers.cloudflare.com/registrar/get-started/register-domain/) without markup fees. We will complete the rest of this setup for you.

## 1\. Add your domain

1. Log in to the Cloudflare dashboard.  
[ Go to **Domains** ](https://dash.cloudflare.com/?to=/:account/domains/overview)
2. Select **Onboard a domain**.
3. Enter your website's apex domain (for example, `example.com`), choose how you would like to add your DNS records, and select **Continue**.  
Note  
If Cloudflare is unable to identify your domain as a registered domain, make sure you are using an existing [top-level domain ↗](https://www.cloudflare.com/learning/dns/top-level-domain/) (`.com`, `.net`, `.biz`, or others).  
Cloudflare requires your apex domain to be one level below a valid TLD defined in the [Public Suffix List (PSL) ↗](https://github.com/publicsuffix/list/blob/master/public%5Fsuffix%5Flist.dat). For instance, `example.com` is valid but `level2.example.com`[2](#user-content-fn-2) or `example.home` are not.
4. Select a [plan ↗](https://www.cloudflare.com/plans/#compare-features).

## 2\. Review DNS records

Your DNS records must be accurate for your domain to work properly. If you don't know what DNS records are, consider the video below for a quick explanation.

1. Since the quick scan is not guaranteed to find all existing DNS records, you need to review your records, paying special attention to the following:  
   * [Zone apex records (example.com)](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-zone-apex/)  
   More about zone apex records  
   Zone apex refers to the domain or subdomain that you are [adding to Cloudflare](https://developers.cloudflare.com/dns/concepts/#zone).  
   Usually, the zone apex record makes your domain accessible by visitors. In this case, the necessary record type ([A, AAAA, or CNAME](https://developers.cloudflare.com/dns/manage-dns-records/reference/dns-record-types/#ip-address-resolution)) and its content will depend on the provider that [hosts](https://developers.cloudflare.com/fundamentals/manage-domains/#host-your-domain) your website or application.  
   If you are using Cloudflare Workers, refer to [Custom domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/).  
   If you are using other providers, look for their guidance on how to connect domains managed on external DNS services. Then, make sure you have the records required by your hosting provider on your [DNS records table](https://developers.cloudflare.com/dns/manage-dns-records/#dns-records-table) at Cloudflare.  
   * [Subdomain records (www.example.com or blog.example.com)](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-subdomain/)  
   More about subdomain records  
   Most subdomains serve a specific purpose within the overall context of your website. For example, `blog.example.com` might be your blog, `support.example.com` could be your customer help portal, and `store.example.com` would be your e-commerce site.  
   Even if you do not require specific subdomains, you might want to set up at least a subdomain record on `www`. It will usually point to the same content as what you have on the apex domain (`example.com`) or use a [redirect](https://developers.cloudflare.com/fundamentals/manage-domains/manage-subdomains/#redirect-a-subdomain-to-the-apex-domain). Having a subdomain DNS record on `www` helps guarantee that a visitor who types `www.` in front of your domain address can still find your website or application.  
   * [Email records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/email-records/)  
   More about email records  
   Depending on your business needs, you can configure DNS records so that you can use your domain to receive emails, receive and send emails from your domain, or prevent others from sending emails on your behalf (spoofing).  
   Below are some examples of what those DNS records might look like. The exact values for your DNS mail records depend on your email provider. If you have issues, review the [Troubleshooting](https://developers.cloudflare.com/dns/troubleshooting/email-issues/) and contact your email service provider to confirm your DNS records are correct.  
   | Type | Name           | Content                       | Proxy status | TTL  |  
   | ---- | -------------- | ----------------------------- | ------------ | ---- |  
   | A    | mail           | 192.0.2.1                     | DNS Only     | Auto |  
   | MX   | example.com    | 5 john.mx.example-server.test | DNS Only     | Auto |  
   | TXT  | \_dmarc        | "v=DMARC1; p=reject; sp=...   | DNS Only     | Auto |  
   | TXT  | \*.\_domainkey | "v=DKIM1; k=rsa; p=..."       | DNS Only     | Auto |  
   | TXT  | example.com    | "v=spf1 ip4:..."              | DNS Only     | Auto |  
Note  
If you activate your domain on Cloudflare _without_ setting up the correct DNS records for your domain, your visitors may experience [DNS\_PROBE\_FINISHED\_NXDOMAIN](https://developers.cloudflare.com/dns/troubleshooting/dns-probe-finished-nxdomain/) errors.
2. If you find any missing records, [manually add](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/) those records.
3. Depending on your site setup, you may want to adjust the [proxy status](https://developers.cloudflare.com/dns/proxy-status/) for certain `A`, `AAAA`, or `CNAME` records. Each record has a proxy status toggle:  
   * **Proxied** (orange cloud): web traffic goes through the Cloudflare network, which provides caching, DDoS protection, and other security features.  
   * **DNS only** (gray cloud): Cloudflare returns the DNS record value but does not proxy traffic. Use this for CNAME records that verify your domain for third-party services.
4. Select **Continue**.

## 3\. Update nameservers

Your domain will be assigned two authoritative Cloudflare nameservers. Nameservers are specialized servers that store your domain's DNS records and "answer" requests from browsers by providing the specific IP address needed to connect to your website.

Usually, you need to add these nameservers at your registrar. Refer to [Update nameservers](https://developers.cloudflare.com/dns/nameservers/update-nameservers/) for more information.

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

DNSSEC

If your domain uses [DNSSEC](https://developers.cloudflare.com/dns/dnssec/), you must turn it off at your registrar before changing nameservers. Changing nameservers while DNSSEC is active can cause your domain to become unreachable. You can [re-enable DNSSEC through Cloudflare](https://developers.cloudflare.com/dns/dnssec/#enable-dnssec) after your domain is active.

## 4\. Complete SSL/TLS setup

To prevent insecure connections and visitor browser errors, review your [SSL/TLS certificates](https://developers.cloudflare.com/ssl/get-started/). Many Cloudflare services will automatically protect and speed up your web traffic after your nameservers are updated and your DNS records are proxied. For further guidance, refer to [Proxy status](https://developers.cloudflare.com/dns/proxy-status/).

If you encounter unexpected results when changing your nameservers, refer to the [DNS Full Setup troubleshooting](https://developers.cloudflare.com/dns/zone-setups/full-setup/troubleshooting/).

## Further options

### Other DNS setups

* To use Cloudflare as a reverse proxy but maintain your DNS provider, refer to [partial setup](https://developers.cloudflare.com/dns/zone-setups/partial-setup/).
* To use one or more DNS providers, refer to [DNS Zone transfers](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/).
* Enterprise customers can onboard lower-level subdomains using [Subdomain setup](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/).

### Minimize downtime

* If your domain is particularly sensitive to downtime, review our suggestions to [minimize downtime](https://developers.cloudflare.com/fundamentals/performance/minimize-downtime/).

## Footnotes

1. The provider you purchased your domain from [↩](#user-content-fnref-1)
2. Enterprise customers can onboard these using [Subdomain setup](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/). [↩](#user-content-fnref-2)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/manage-domains/add-site/#page","headline":"Onboard a domain · Cloudflare Fundamentals docs","description":"Learn how to onboard your domain to Cloudflare, to speed up and protect your website or application.","url":"https://developers.cloudflare.com/fundamentals/manage-domains/add-site/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/manage-domains/","name":"Domains"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/manage-domains/add-site/","name":"Onboard a domain"}}]}
```
