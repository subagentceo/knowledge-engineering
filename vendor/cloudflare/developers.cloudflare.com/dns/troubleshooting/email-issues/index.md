---
title: Email issues
description: Resolve email delivery issues related to DNS configuration.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Email issues

If you have issues sending or receiving mail, follow these troubleshooting steps.

## Are your records correct?

To check that your MX records are resolving correctly, run the following `dig` command in your terminal (replace `example.com` with your domain):

Terminal window

```

dig example.com mx +short


```

Alternatively, you can use a third-party tool to look up your MX records. For a list of options, refer to [Recommended third-party tools](https://developers.cloudflare.com/dns/reference/recommended-third-party-tools/).

This returns a list of mail servers for your domain. Compare the output to the MX records on your Cloudflare DNS records page.

[ Go to **Records** ](https://dash.cloudflare.com/?to=/:account/:zone/dns/records) 

If the mail server listed does not match your email provider's expected value, update the MX record content to the correct value. Check your email provider's setup documentation for the correct MX record values.

If your DNS query returns records you do not recognize, such as `_dc-mx` or `dc-#####` subdomains, refer to [Unexpected DNS records](https://developers.cloudflare.com/dns/manage-dns-records/troubleshooting/unexpected-dns-records/#%5Fdc-mx-and-dc--subdomains).

## Are DNS records missing?

If `dig` returns no results for your domain's MX records, your records may not have been created or may have been accidentally deleted.

Even if your MX records are correct, missing email authentication records can cause delivery failures:

* **Missing `SPF` record:** receiving servers cannot verify that your domain authorizes the sending server, which may cause messages to be rejected or marked as spam.
* **Missing `DKIM` record:** messages cannot be cryptographically verified as originating from your domain, which reduces trust with receiving servers.
* **Missing `DMARC` record:** receiving servers have no policy for handling messages that fail `SPF` or `DKIM` checks, which can lead to inconsistent delivery or spoofing of your domain.

Refer to [Set up email records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/email-records/) to add missing records.

## Do your MX records point to a delegated subdomain?

`NS` records [delegate a subdomain](https://developers.cloudflare.com/dns/manage-dns-records/how-to/subdomains-outside-cloudflare/#delegate-a-subdomain-outgoing) to another DNS provider. If your MX record points to a subdomain that is delegated via `NS` records (for example, `mail.example.com`), the mail server records are managed by that external provider, not Cloudflare. Confirm that the external provider has the correct `A` or `AAAA` records for the mail subdomain.

## Is CNAME flattening turned on?

Some email providers require `CNAME` records for features like DKIM authentication or autodiscover. When [CNAME flattening](https://developers.cloudflare.com/dns/cname-flattening/) is turned on — either globally for all `CNAME` records or individually on a specific record — the `CNAME` is flattened to an `A` record, which can prevent email providers from reading the record correctly.

If your email provider requires `CNAME` records and those records are not resolving as expected, you may need to turn off [CNAME flattening](https://developers.cloudflare.com/dns/cname-flattening/set-up-cname-flattening/).

## Is your mail hostname proxied?

Mail protocols such as SMTP, IMAP, and POP3 do not work through Cloudflare's standard HTTP proxy.

If the hostname used for mail resolves to a Cloudflare IP address, the record is proxied and mail clients will not be able to connect correctly.

Common examples include:

* `mail.example.com` used for SMTP, IMAP, or POP3
* Any hostname targeted by your `MX` record
* Autodiscover or mail service hostnames that must return the provider's actual DNS target

To fix this issue:

1. Go to the **DNS Records** page.  
[ Go to **Records** ](https://dash.cloudflare.com/?to=/:account/:zone/dns/records)
2. Locate the mail-related hostname.
3. Change the [proxy status](https://developers.cloudflare.com/dns/proxy-status/) to **DNS only**.

Your `MX` record itself is always DNS-only, but the hostname it points to must also resolve to a DNS-only target.

## Common provider record values

If you are not sure whether the DNS content itself is correct, compare it with the values from your provider.

Common examples include:

| Provider         | MX records                                                                                                                                                           | SPF record                                     |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| Google Workspace | ASPMX.L.GOOGLE.COM (priority 1), ALT1.ASPMX.L.GOOGLE.COM and ALT2.ASPMX.L.GOOGLE.COM (priority 5), ALT3.ASPMX.L.GOOGLE.COM and ALT4.ASPMX.L.GOOGLE.COM (priority 10) | v=spf1 include:\_spf.google.com \~all          |
| Microsoft 365    | <your-domain>.mail.protection.outlook.com (priority 0)                                                                                                               | v=spf1 include:spf.protection.outlook.com -all |
| iCloud Mail      | mx01.mail.icloud.com and mx02.mail.icloud.com (priority 10)                                                                                                          | v=spf1 include:icloud.com \~all                |
| Mailgun          | mxa.mailgun.org and mxb.mailgun.org (priority 10)                                                                                                                    | v=spf1 include:mailgun.org \~all               |

Always confirm the exact values with your provider before making changes.

## Is Cloudflare Spectrum turned on?

Cloudflare does not proxy email traffic (SMTP, port 25) by default. Unless you have explicitly configured [Cloudflare Spectrum](https://developers.cloudflare.com/spectrum/reference/configuration-options#smtp) to proxy SMTP traffic, email is delivered directly to your mail server and does not pass through the Cloudflare network. DNS records used for email should be set to [DNS only](https://developers.cloudflare.com/dns/proxy-status/) to ensure mail traffic is not affected by the proxy.

[ Go to **Spectrum** ](https://dash.cloudflare.com/?to=/:account/:zone/spectrum) 

## Is Email Routing turned on?

If [Email Routing](https://developers.cloudflare.com/email-service/) is turned on, Cloudflare manages your MX records and may create additional DNS records automatically.

[ Go to **Email Routing** ](https://dash.cloudflare.com/?to=/:account/:zone/email/routing) 

If Email Routing is turned on but you use a different mail provider, the Email Routing MX records may conflict with your provider's records. You can [turn off Email Routing](https://developers.cloudflare.com/email-service/configuration/domains/#remove-a-domain-from-email-routing) to remove the managed records and configure your own.

---

## Best practices for MX records on Cloudflare

If possible, do not host a mail service on the same server as the web resource you want to protect, since emails sent to non-existent addresses get bounced back to the attacker and reveal the mail server IP address.

Cloudflare recommends using non-contiguous IPs from different IP ranges.

---

## Contact your mail provider for assistance

If your email does not work shortly after editing DNS records, contact your mail administrator or mail provider with the specific error or bounce message you are receiving. They can confirm whether the issue is with DNS resolution, mail server configuration, or message delivery.

If your provider confirms the issue is related to Cloudflare, [contact Cloudflare support](https://developers.cloudflare.com/support/contacting-cloudflare-support/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/troubleshooting/email-issues/#page","headline":"Troubleshooting email issues · Cloudflare DNS docs","description":"Resolve email delivery issues related to DNS configuration.","url":"https://developers.cloudflare.com/dns/troubleshooting/email-issues/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-06-09","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/troubleshooting/email-issues/","name":"Email issues"}}]}
```
