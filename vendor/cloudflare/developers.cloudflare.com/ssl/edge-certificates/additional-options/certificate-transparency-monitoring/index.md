---
title: Certificate Transparency Monitoring
description: Certificate Transparency (CT) Monitoring is an opt-in feature in public beta that aims at improving security by allowing you to double-check any SSL/TLS certificates issued for your domain.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Certificate Transparency Monitoring

Certificate Transparency (CT) Monitoring is an [opt-in](#opt-in-and-out) feature in public beta that aims at improving security by allowing you to double-check any SSL/TLS certificates issued for your domain.

CT Monitoring alerts are triggered not only by Cloudflare processes - including [backup certificates](https://developers.cloudflare.com/ssl/edge-certificates/backup-certificates/) \-, but whenever a certificate that covers your monitored domain is issued by a [Certificate Authority (CA)](https://developers.cloudflare.com/ssl/concepts/#certificate-authority-ca) and added to a public CT log. You can learn more about how this works in the [introductory blog post ↗](https://blog.cloudflare.com/introducing-certificate-transparency-and-nimbus/).

Aspects to consider

* If you use Cloudflare or other services that automatically issue certificates for your domain or subdomains, this may trigger CT Monitoring emails as well.
* If your domain is included in a shared certificate, you may receive notifications for domains or subdomains that do not belong to you but are included as subject alternative names (SANs) together with your domain. You can use a tool like [Certificate Search ↗](https://crt.sh/) to gather more information in such cases.
* CT Monitoring does not detect phishing attempts. For example, for `cloudflare.com`, an alert would not trigger if a certificate was issued for `cloudf1are.com` or `cloud-flare.com`.

---

## Availability

| Free             | Pro                 | Business            | Enterprise                |                           |
| ---------------- | ------------------- | ------------------- | ------------------------- | ------------------------- |
| Availability     | Yes                 | Yes                 | Yes                       | Yes                       |
| Email Recipients | All account members | All account members | Specified email addresses | Specified email addresses |

---

## Opt in and out

Alerts are turned off by default. If you want to receive alerts, go to the [**Edge Certificates** ↗](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates#ct-alerting-card) page and enable **Certificate Transparency Monitoring**. If you are in a Business or Enterprise zone, select **Add Email**.

To stop receiving alerts, disable **Certificate Transparency Monitoring** or remove your email from the feature card.

---

## Emails to be concerned about

Most certificate alerts are routine. Cloudflare sends alerts whenever a certificate for your domain appears in a log. Certificates expire (and must be reissued), so it is completely normal to receive issuance emails. If your domain is listed in the email, along with reasonable ownership and certificate information, then **no action is required**.

Additionally, you should check whether the certificate was issued through Cloudflare. Cloudflare partners with [multiple CAs](https://developers.cloudflare.com/ssl/reference/certificate-authorities/) to provide certificates. To view all Cloudflare-issued certificates and backup certificates - which require no additional actions - visit the [Edge Certificates page ↗](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates) in the dashboard.

You _should_ take action when something is clearly wrong, such as if you:

* Do not recognize the certificate issuer.  
Note  
Cloudflare provisions backup certificates, so you may see a certificate listed that is not in active use for your site. The [Edge Certificates page ↗](https://dash.cloudflare.com/?to=/:account/:zone/ssl-tls/edge-certificates) will show all certificates requested for your site.
* Have recently noticed problems with your website.

---

## How to take action

### Option 1: Contact certificate authorities

Only Certificate Authorities can revoke malicious certificates. If you believe an illegitimate certificate was issued for your domain, contact the Certificate Authority listed as the **Issuer** in the email.

* [GlobalSign support ↗](https://support.globalsign.com/)
* [GoDaddy support ↗](https://www.godaddy.com/contact-us?sp%5Fhp=B)
* [Google Trust Services support ↗](https://pki.goog/faq/)
* [IdenTrust support ↗](https://www.identrust.com/support/support-team)
* [Let's Encrypt support ↗](https://letsencrypt.org/contact/)
* [Sectigo support ↗](https://sectigo.com/support)
* [SSL.com support ↗](https://www.ssl.com/submit-a-ticket/)

### Option 2: Contact domain registrars

Domain registrars may be able to **suspend** potentially malicious domains. If, for example, you notice that a malicious domain was registered through GoDaddy, contact GoDaddy’s support team to see if they can help you. Do the same for other registrars.

### Option 3: Improvise

There are other ways to combat malicious certificates. You can warn your visitors with an on-site notification or ask browser makers (Google for Chrome, etc.) to block these domains.

If someone is attempting to impersonate you online, you should absolutely take action. This is usually difficult to recognize, so exercise caution. **Remember: the vast majority of certificates are not malicious. Only take action if you believe something is wrong.**

---

## HTTP Public Key Pinning

Certificate Transparency Monitoring addresses the same problems as HTTP Public Key Pinning (HPKP), but with [fewer technical issues ↗](https://scotthelme.co.uk/im-giving-up-on-hpkp/).

Cloudflare does not offer or support HPKP and advises against using it with Universal SSL.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/edge-certificates/additional-options/certificate-transparency-monitoring/#page","headline":"Certificate Transparency Monitoring · Cloudflare SSL/TLS docs","description":"Certificate Transparency (CT) Monitoring is an opt-in feature in public beta that aims at improving security by allowing you to double-check any SSL/TLS certificates issued for your domain.","url":"https://developers.cloudflare.com/ssl/edge-certificates/additional-options/certificate-transparency-monitoring/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/edge-certificates/","name":"Edge certificates"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/edge-certificates/additional-options/","name":"Additional options"}},{"@type":"ListItem","position":5,"item":{"@id":"/ssl/edge-certificates/additional-options/certificate-transparency-monitoring/","name":"Certificate Transparency Monitoring"}}]}
```
