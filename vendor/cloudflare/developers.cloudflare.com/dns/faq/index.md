---
title: FAQ
description: Find answers to common questions about Cloudflare's authoritative DNS.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# FAQ

The sections below cover frequently asked questions about Cloudflare authoritative DNS. For DNS Firewall, refer to [DNS Firewall FAQ](https://developers.cloudflare.com/dns/dns-firewall/faq/).

---

## Cloudflare offerings

### Is Cloudflare a free DNS (domain nameserver) provider?

Yes. Cloudflare offers [free DNS services ↗](https://www.cloudflare.com/dns) to customers on all plans. Note that:

* You do not need to change your hosting provider to use Cloudflare.
* You do not need to move away from your registrar. The only change you make with your registrar is to point the authoritative nameservers to the Cloudflare nameservers.

### Does Cloudflare charge for or limit DNS queries?

Cloudflare never limits or caps DNS queries, but the pricing depends on your plan level.

For customers on Free, Pro, or Business plans, Cloudflare does not charge for DNS queries. For customers on Enterprise plans, Cloudflare uses the number of monthly DNS queries as a pricing input to generate a custom quote.

### Does Cloudflare offer domain masking?

No. Cloudflare does not offer domain masking or DNS redirect services (your hosting provider might). However, we do offer URL forwarding through [Bulk Redirects](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/).

### Can subdomains be added directly to Cloudflare?

Yes. Enterprise customers can add subdomains directly to Cloudflare via [subdomain support](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/).

### Does Cloudflare support EDNS0 (extension mechanisms for DNS)?

Yes, EDNS0 is a building block for modern DNS implementations and is enabled for all Cloudflare customers. EDNS0 adds support for signaling if the DNS Resolver (recursive DNS provider) supports larger message sizes and DNSSEC.

EDNS0 is the first approved set of mechanisms for [DNS extensions ↗](http://en.wikipedia.org/wiki/Extension%5Fmechanisms%5Ffor%5FDNS), originally published as [RFC 2671 ↗](https://www.rfc-editor.org/rfc/rfc2671.html).

---

## Nameservers

### Where can I find my Cloudflare nameservers?

On the **DNS Records** page, locate the **Cloudflare Nameservers** card.

[ Go to **Records** ](https://dash.cloudflare.com/?to=/:account/:zone/dns/records) 

Also, the IP address associated with a specific Cloudflare nameserver can be retrieved via a dig command or a third-party DNS lookup tool hosted online such as [whatsmydns.net ↗](https://www.whatsmydns.net/):

Terminal window

```

dig kate.ns.cloudflare.com


```

```

kate.ns.cloudflare.com.    68675    IN    A    173.245.58.124.


```

### Where do I change my nameservers to point to Cloudflare?

Make the change at your registrar, which is where you registered your domain. This may or may not be your hosting provider - refer to [Update nameservers](https://developers.cloudflare.com/dns/nameservers/update-nameservers/) for further context.

If you do not know who your registrar is for the domain, a WHOIS search can help. You can use [ICANN Lookup ↗](https://lookup.icann.org/), for example.

Warning

Some country code TLDs may not be supported by ICANN Lookup. If that is the case, use a different WHOIS search tool.

Once you identify your registrar, follow their instructions.

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

### Why have I received an email: (mydomain) stopped using Cloudflare's nameservers?

For domains where Cloudflare hosts the DNS, Cloudflare continuously checks whether the domain uses Cloudflare's nameservers for DNS resolution. If Cloudflare's nameservers are not used, the [domain status](https://developers.cloudflare.com/dns/zone-setups/reference/domain-status/) is updated from **Active** to **Moved** and an email is sent to the customer.

This is important because, if a domain is in a **Moved** state for a [long enough period of time](https://developers.cloudflare.com/dns/zone-setups/reference/domain-status/), it will be deleted from Cloudflare.

To recover a deleted domain, [re-add it in Cloudflare](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/) just like you would for a new domain.

Warning

Cloudflare support is unable to restore DNS or settings for deleted domains.

---

## DNS records

### Does Cloudflare limit the number of DNS records a domain can have?

Yes. All customers have a limit on the number of DNS records they can create.

* Free: 200
* Pro: 3,500
* Business: 3,500
* Enterprise: 3,500

Free zones created before 2024-09-01 00:00:00 UTC have an increased limit of 1,000.

For more DNS records

If you are an Enterprise customer and require more DNS records, contact your account team. Cloudflare can support millions of DNS records on a single zone.

DNS records that other Cloudflare services create on your behalf — for example, the `TXT` and `MX` records added by [Email Routing](https://developers.cloudflare.com/email-service/) — also count toward this limit. To avoid disrupting those services, they are enforced against your record limit with a small buffer, so a zone may occasionally hold slightly more records than its limit would otherwise allow.

To create new records yourself through the dashboard or API, your zone must still be within its record limit.

### How long does it take for a DNS change I made to push out?

By default, any changes or additions you make to your Cloudflare zone file will take effect globally within 5 minutes, usually much less.

Depending on the Time-to-Live (TTL) set on the previous [DNS record](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/), old data may still remain cached until the TTL expires. Proxied records expire after 5 minutes ("Automatic"), but the TTL for unproxied records can be customized.

If changes to records with large TTLs are anticipated, it may make sense to reduce the TTL ahead of time so that the change takes effect as quickly as possible.

### Why can't I make ANY queries to Cloudflare DNS servers?

`ANY` queries are special and often misunderstood. They are usually used to get all record types available on a DNS name, but what they return is just any type in the cache of recursive resolvers. This can cause confusion when they are used for debugging.

Because of Cloudflare's many advanced DNS features like CNAME flattening, it can be complex and even impossible to give correct answers to `ANY` queries. For example, when DNS records dynamically come and go or are stored remotely, it can be taxing or even impossible to get all the results at the same time.

Refer to [Deprecating the DNS ANY meta-query type ↗](https://blog.cloudflare.com/deprecating-dns-any-meta-query-type/) for details. The decision to block `ANY` does not affect DNS Firewall customers.

### How do I add ANAME records on Cloudflare?

ANAME or ALIAS are DNS records used by specific DNS providers. If your previous provider was using ANAME or ALIAS, you can recreate these records on Cloudflare as CNAME records. Cloudflare's [CNAME flattening](https://developers.cloudflare.com/dns/cname-flattening/)[1](#user-content-fn-1) allows you to create CNAME records at your [zone apex](https://developers.cloudflare.com/dns/concepts/#zone-apex), removing the need for those other record types.

## Footnotes

1. A process in which Cloudflare returns an IP address instead of the target hostname that a CNAME record points to. [↩](#user-content-fnref-1)

### Why does my TXT record show a double quote in the middle of the value?

This is expected behavior. Per [RFC 4408 ↗](https://www.rfc-editor.org/rfc/rfc4408#section-3.1.3) and the DNS protocol specification ([RFC 1035 ↗](https://www.rfc-editor.org/rfc/rfc1035#section-3.3.14)), a single DNS TXT record is composed of one or more character strings, each with a maximum length of 255 characters. When the value you enter exceeds 255 characters, it must be split into multiple strings. Each string is enclosed in double quotes (`"`), so the resulting record may appear to have a quote in the middle — for example, `"first part" "second part"`.

This splitting is required by the DNS protocol and is performed by all DNS providers, even if some do not display it in their UI or API. For all major TXT record use cases (such as SPF, DKIM, and DMARC), the receiving application will concatenate the strings back together, so the behavior of the record is not affected.

### Why are Cloudflare's A or AAAA records / IP addresses for my domain's DNS responses appearing?

For DNS records proxied to Cloudflare, Cloudflare's IP addresses are returned in DNS queries instead of your original server IP address. This allows Cloudflare to optimize, cache, and protect all requests for your website.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/faq/#page","headline":"FAQ · Cloudflare DNS docs","description":"Find answers to common questions about Cloudflare's authoritative DNS.","url":"https://developers.cloudflare.com/dns/faq/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-06-09","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/faq/","name":"FAQ"}}]}
```
