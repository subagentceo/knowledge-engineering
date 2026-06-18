---
title: Convert secondary setup to partial setup
description: If you initially set up incoming zone transfers (Cloudflare as secondary), you can later convert your zone to use a partial setup.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Convert secondary setup to partial setup

If you initially set up [incoming zone transfers (Cloudflare as secondary)](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/setup/), you can later convert your zone to use a CNAME setup (partial).

Subdomain setup

If you also use subdomain setup[1](#user-content-fn-1), consider the [available combinations](https://developers.cloudflare.com/dns/zone-setups/subdomain-setup/setup/#available-setups) and whether your zone conversion could have any implications.

## Footnotes

1. Meaning you have one or more subdomains (`sub.example.com`) added to Cloudflare as their own zone, separate from your apex domain (`example.com`). [↩](#user-content-fnref-1)

Follow the steps below to achieve this conversion.

## 1\. Stop transferring the zone

1. In the Cloudflare dashboard, go to the **DNS Settings** page.  
[ Go to **Settings** ](https://dash.cloudflare.com/?to=/:account/:zone/dns/settings)
2. Under **DNS Zone Transfers**, and select **Manage linked peers**.
3. Unlink the peer and select **Save**.

At this point, your zone will be read-only.

## 2\. Configure your authoritative DNS provider

1. (Optional) If you are also migrating to a new authoritative DNS provider, export a zone file from the previous provider and import it into the new one.
2. At your authoritative DNS provider, create `CNAME` records pointing to `{your-hostname}.cdn.cloudflare.net` for every hostname you wish to proxy through Cloudflare.  
Example CNAME record at authoritative DNS provider  
The `CNAME` record for `www.example.com` would be:  
```  
www.example.com CNAME www.example.com.cdn.cloudflare.net  
```
3. At your authoritative DNS provider, remove any previously existing `A`, `AAAA`, or `CNAME` records referencing the hostnames you want to proxy through Cloudflare. For these hostnames, leave only the records pointing to `{your-hostname}.cdn.cloudflare.net`.

## 3\. Convert your Cloudflare zone

1. Back at your Cloudflare zone, confirm that you have all the `A`, `AAAA`, or `CNAME` [DNS records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/) needed for the hostnames you pointed to `{your-hostname}.cdn.cloudflare.net` in the previous step. You can also delete any DNS records that have a different type, as they will no longer resolve once you convert your zone to a CNAME setup (partial).
2. Use the [Edit Zone endpoint](https://developers.cloudflare.com/api/resources/zones/methods/edit/) with `type` set to `partial` to convert the zone type. Existing DNS records will not be affected.
3. On the [**DNS Records** ↗](https://dash.cloudflare.com/?to=/:account/:zone/dns/records) page, get the **Verification TXT Record** and add it at your authoritative DNS provider.  
Example verification record  
A verification record for `sub.example.com` might be:  
| Type | Name                              | Content             |  
| ---- | --------------------------------- | ------------------- |  
| TXT  | cloudflare-verify.sub.example.com | 966215192-518620144 |  
If your authoritative DNS provider automatically appends DNS record `name` fields with your domain, make sure to only insert `cloudflare-verify` as the record name. Otherwise, it may result in an incorrect record name, such as `cloudflare-verify.sub.example.com.sub.example.com`.  
After creating the record, you can use this [Dig Web Interface link ↗](https://digwebinterface.com/?type=TXT&ns=auth&nameservers=) to search (`dig`) for `cloudflare-verify.<YOUR DOMAIN>` and validate if it is working.  
Note  
The verification record must remain in place for as long as you want your CNAME setup (partial) to be active on Cloudflare.

## 4\. Update nameservers

At your domain registrar (or parent zone), [update the nameservers](https://developers.cloudflare.com/dns/nameservers/update-nameservers/). In a CNAME setup (partial), only the nameservers of your external DNS provider should be listed.

* Remove any `secondary.cloudflare.com` nameservers if you used to have them.
* If you are also migrating to a new authoritative DNS provider, add your new nameservers.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/zone-setups/conversions/convert-secondary-to-partial/#page","headline":"Convert secondary setup to partial setup · Cloudflare DNS docs","description":"If you initially set up incoming zone transfers (Cloudflare as secondary), you can later convert your zone to use a partial setup.","url":"https://developers.cloudflare.com/dns/zone-setups/conversions/convert-secondary-to-partial/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/zone-setups/","name":"DNS setups"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/zone-setups/conversions/","name":"DNS setup conversions"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/zone-setups/conversions/convert-secondary-to-partial/","name":"Convert secondary setup to partial setup"}}]}
```
