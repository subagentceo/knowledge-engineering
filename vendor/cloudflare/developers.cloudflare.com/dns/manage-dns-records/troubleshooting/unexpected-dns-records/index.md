---
title: Unexpected DNS records
description: Identify and remove unexpected DNS records.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Unexpected DNS records

## Additional records after import

You find several unexpected DNS records after adding your domain to Cloudflare.

### Cause

A wildcard (`*`) record at your previous authoritative DNS provider may have been imported into Cloudflare in a way that creates additional records.

### Solution

To solve this issue, you can do one of the following:

* [Delete records in bulk](https://developers.cloudflare.com/dns/manage-dns-records/how-to/batch-record-changes/#delete-records-in-bulk).
* Remove and re-add your domain:  
   1. [Remove your domain](https://developers.cloudflare.com/fundamentals/manage-domains/remove-domain/) from Cloudflare.  
   2. Delete the wildcard record from your authoritative DNS.  
   3. [Re-add](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/) the domain.

---

## acme\_challenge TXT records

You might notice TXT records like `_acme-challenge.<hostname>` are returned by your domain but cannot be found on the Cloudflare dashboard.

### Cause

These records are automatically created to allow Cloudflare edge certificates ([universal](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/), [advanced](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/), and [backup](https://developers.cloudflare.com/ssl/edge-certificates/backup-certificates/)) to be provisioned. `_acme-challenge` records are required by certificate authorities (CAs) so that they can verify your domain ownership before issuing the SSL/TLS certificate. For details, refer to [Domain control validation (DCV)](https://developers.cloudflare.com/ssl/edge-certificates/changing-dcv-method/).

### Solution

As these records are tied to the certificates, they cannot be deleted via the Cloudflare dashboard.

If you need more `_acme-challenge.<hostname>` TXT records in order to provision certificates on your side, you can [manually add them](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/) under [DNS records ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/records).

If you want to remove these records:

* [Disable Universal SSL](https://developers.cloudflare.com/ssl/edge-certificates/universal-ssl/disable-universal-ssl/) to remove the records related to universal and backup certificates.
* [Delete advanced certificates](https://developers.cloudflare.com/ssl/edge-certificates/advanced-certificate-manager/manage-certificates/#delete-a-certificate) to remove the records related to advanced certificates.

---

## \_dc-mx and dc-##### subdomains

You notice a `_dc-mx` or `dc-#####` subdomain that you did not create (for example, `_dc-mx.a1b2c3d4e5f6.example.com`). This response does not appear in your Cloudflare DNS records table, but will appear in `dig` responses.

### Cause

When your `MX` or `SRV` record resolves to a domain configured to [proxy](https://developers.cloudflare.com/dns/proxy-status/) through Cloudflare, Cloudflare dynamically inserts a record into DNS responses that resolves to the origin IP address. This record is added at query time to ensure that mail or service traffic bypasses the Cloudflare proxy and reaches your server directly.

The prefix of the auto-generated record depends on the record type that triggered it:

* **MX records:** Cloudflare inserts a record with the `_dc-mx` prefix (for example, `_dc-mx.a1b2c3d4e5f6.example.com`).
* **SRV records:** Cloudflare inserts a record with the `dc-` prefix (for example, `dc-a1b2c3d4e5f6.example.com`).

#### How \_dc-mx records work

Before using Cloudflare, suppose your DNS records for mail are as follows:

`example.com MX example.com`

`example.com A 192.0.2.1`

After using Cloudflare and proxying the `A` record, Cloudflare provides DNS responses with a [Cloudflare IP address](https://developers.cloudflare.com/fundamentals/concepts/cloudflare-ip-addresses/) (`203.0.113.1` in the example below):

`example.com MX example.com`

`example.com A 203.0.113.1`

Since proxying mail traffic through Cloudflare would break your mail services, Cloudflare detects this situation and dynamically inserts a `_dc-mx` record into DNS responses:

`example.com MX _dc-mx.a1b2c3d4e5f6.example.com`

`_dc-mx.a1b2c3d4e5f6.example.com A 192.0.2.1`

`example.com A 203.0.113.1`

You can verify this behavior by querying your domain's MX records (replace `example.com` with your domain):

Terminal window

```

dig example.com mx +short


```

```

100 _dc-mx.a1b2c3d4e5f6.example.com.


```

The `_dc-mx` record resolves directly to your origin IP:

Terminal window

```

dig _dc-mx.a1b2c3d4e5f6.example.com a +short


```

```

192.0.2.1


```

### Solution

These records are safe — they ensure your mail traffic reaches your server correctly.

If you want to avoid a `_dc-mx` or `dc-#####` response, you must address the underlying proxy conflict:

* If no mail is received for the domain, delete the `MX` record.
* If mail is received for the domain, update the `MX` record to resolve to a separate `A` record for a mail subdomain that is not proxied by Cloudflare:  
`example.com MX mail.example.com`  
`mail.example.com A 192.0.2.1`  
`example.com A 203.0.113.1`

Warning

If your mail server resides on the same IP as your web server, your MX record will expose your origin IP address, since it is not hidden behind the Cloudflare proxy.

---

## Incorrect results for DNS queries

You notice DNS queries returning incorrect results even after you waited for the [TTL](https://developers.cloudflare.com/dns/manage-dns-records/reference/ttl/) to expire.

### Cause

Third-party tools can sometimes fail to return correct DNS results if a recursive DNS cache fails to refresh.

### Solution

In this circumstance, purge your public DNS cache via these methods:

* [Purge your DNS cache at OpenDNS ↗](http://www.opendns.com/support/cache/)
* [Purge your DNS cache at Google ↗](https://developers.google.com/speed/public-dns/cache)
* [Purge your DNS cache locally ↗](https://docs.cpanel.net/knowledge-base/dns/how-to-clear-your-dns-cache/)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/manage-dns-records/troubleshooting/unexpected-dns-records/#page","headline":"Unexpected DNS records · Cloudflare DNS docs","description":"Identify and remove unexpected DNS records.","url":"https://developers.cloudflare.com/dns/manage-dns-records/troubleshooting/unexpected-dns-records/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/manage-dns-records/","name":"DNS records"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/manage-dns-records/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/manage-dns-records/troubleshooting/unexpected-dns-records/","name":"Unexpected DNS records"}}]}
```
