---
title: Set up email records
description: Configure MX, SPF, DKIM, and DMARC records for email.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Set up email records

There are three reasons to set up email records for your domain:

* To make sure your domain can [receive email](#receive-email).
* To make sure your domain can [send and receive email](#send-and-receive-email).
* To prevent other email senders from [spoofing your domain](#prevent-domain-spoofing).

The exact values for your DNS mail records depend on your email provider. If you have issues, review the [Troubleshooting](https://developers.cloudflare.com/dns/troubleshooting/email-issues/) and contact your email service provider to confirm your DNS records are correct.

---

## Receive email

If you only need to **receive** emails, Cloudflare offers [Email Routing](https://developers.cloudflare.com/email-service/) for free email forwarding to custom email addresses.

## Send and receive email

To **send and receive** emails from your domain, you need an SMTP provider. Then, create two DNS records within Cloudflare, following the steps below:

1. Get the IP address and MX record details from your SMTP provider ([vendor-specific guidelines](https://developers.cloudflare.com/dns/manage-dns-records/reference/vendor-specific-records/)).
2. [Add an A or AAAA record](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/) for your mail subdomain that points to the IP address of your mail server.  
| **Type** | **Name** | **IPv4 address** | **Proxy status** |  
| -------- | -------- | ---------------- | ---------------- |  
| A        | mail     | 192.0.2.1        | DNS only         |  
API example  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `DNS Write`  
Create DNS Record  
```  
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \  
  --request POST \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
  --json '{  
    "type": "A",  
    "name": "mail.example.com",  
    "content": "192.0.2.1",  
    "ttl": 3600,  
    "proxied": false  
  }'  
```  
Response  
```  
{  
  "result": {  
    "id": "<ID>",  
    "zone_id": "<ZONE_ID>",  
    "zone_name": "example.com",  
    "name": "mail.example.com",  
    "type": "A",  
    "content": "192.0.2.1",  
    "proxiable": true,  
    "proxied": false,  
    "ttl": 3600,  
    "locked": false,  
    "meta": {  
      "source": "primary"  
    },  
    "comment": null,  
    "tags": [],  
    "created_on": "2023-01-17T20:37:05.368097Z",  
    "modified_on": "2023-01-17T20:37:05.368097Z"  
  },  
  "success": true,  
  "errors": [],  
  "messages": []  
}  
```
3. [Add an MX record](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/) that points to that subdomain.  
| **Type** | **Name** | **Mail server**  | **TTL** | **Priority** |  
| -------- | -------- | ---------------- | ------- | ------------ |  
| MX       | @        | mail.example.com | Auto    | 5            |  
API example  
Required API token permissions  
At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:  
   * `DNS Write`  
Create DNS Record  
```  
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \  
  --request POST \  
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \  
  --json '{  
    "type": "MX",  
    "name": "example.com",  
    "content": "mail.example.com",  
    "priority": 5,  
    "ttl": 3600  
  }'  
```  
Response  
```  
{  
  "result": {  
    "id": "<ID>",  
    "zone_id": "<ZONE_ID>",  
    "zone_name": "example.com",  
    "name": "example.com",  
    "type": "MX",  
    "content": "mail.example.com",  
    "priority": 5,  
    "proxiable": false,  
    "proxied": false,  
    "ttl": 3600,  
    "locked": false,  
    "meta": {  
      "source": "primary"  
    },  
    "comment": null,  
    "tags": [],  
    "created_on": "2023-01-17T20:54:23.660869Z",  
    "modified_on": "2023-01-17T20:54:23.660869Z"  
  },  
  "success": true,  
  "errors": [],  
  "messages": []  
}  
```

Note

If you encounter issues with your email setup, refer to our [troubleshooting guide](https://developers.cloudflare.com/dns/troubleshooting/email-issues/).

---

## Prevent domain spoofing

Without email authentication records, anyone can send email that appears to come from your domain — a technique known as domain spoofing. To prevent this, you add DNS TXT records (text-based entries in your domain's DNS settings) that allow receiving mail servers to verify whether an email actually came from you:

* [Sender Policy Framework (SPF) ↗](https://www.cloudflare.com/learning/dns/dns-records/dns-spf-record/): Lists the IP addresses and domains authorized to send email on behalf of your domain.
* [DomainKeys Identified Mail (DKIM) ↗](https://www.cloudflare.com/learning/dns/dns-records/dns-dkim-record/): Authenticates the sender's domain and verifies that email content was not altered in transit, using a cryptographic signature.
* [Domain-based Message Authentication Reporting and Conformance (DMARC) ↗](https://www.cloudflare.com/learning/dns/dns-records/dns-dmarc-record/): Tells receiving servers what to do when SPF or DKIM checks fail (for example, reject or quarantine the email), and sends you aggregate reports about your email traffic.

Note

For additional background on email security records, refer to the [introductory blog post ↗](https://blog.cloudflare.com/tackling-email-spoofing/).

### Configure email security records

Refer to [Security records](https://developers.cloudflare.com/dmarc-management/security-records/) to learn how to set up your email security records.

## Proxy SMTP traffic

By default, Cloudflare does not proxy email traffic on port 25 (SMTP). You can only proxy outgoing email if you have [Spectrum](https://developers.cloudflare.com/spectrum/) configured for [SMTP](https://developers.cloudflare.com/spectrum/reference/configuration-options/#smtp).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/manage-dns-records/how-to/email-records/#page","headline":"Set up email records · Cloudflare DNS docs","description":"Configure MX, SPF, DKIM, and DMARC records for email.","url":"https://developers.cloudflare.com/dns/manage-dns-records/how-to/email-records/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/manage-dns-records/","name":"DNS records"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/manage-dns-records/how-to/","name":"How to"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/manage-dns-records/how-to/email-records/","name":"Set up email records"}}]}
```
