---
title: Alerts
description: Set up alerts for secondary DNS zone transfer events.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Alerts

You can configure alerts to receive notifications for changes in your secondary DNS.

Secondary DNS all Primaries Failing

**Who is it for?**

Enterprise customers who have at least one secondary zone in their account and want to receive a notification if all of their primary nameservers are failing.

**Other options / filters**

None.

**Included with**

Purchase of Secondary DNS

**What should you do if you receive one?**

1. Confirm that your primary nameservers are up and running.
2. Confirm that the [Access Control Lists (ACLs)](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/access-control-lists/cloudflare-ip-addresses/) on your primary nameservers are configured correctly.
3. Confirm that your primary nameservers are configured correctly in your Cloudflare account (correct IP, port, TSIG).

Secondary DNS Primaries Failing

**Who is it for?**

Enterprise customers who have at least one secondary zone and want to receive a notification if at least one of their primary nameservers is failing while transfers from at least one other primary are still successful.

**Other options / filters**

None.

**Included with**

Purchase of Secondary DNS.

**What should you do if you receive one?**

1. Confirm that your primary nameservers are up and running.
2. Confirm that the [Access Control Lists (ACLs)](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/access-control-lists/cloudflare-ip-addresses/) on your primary nameservers are configured correctly.
3. Confirm that your primary nameservers are configured correctly in your Cloudflare account (correct IP, port, TSIG).

Secondary DNS Successfully Updated

**Who is it for?**

Enterprise customers who have at least one secondary zone in their account and want to receive a notification on successful zone transfers.

**Other options / filters**

None.

**Included with**

Purchase of Secondary DNS.

**What should you do if you receive one?**

No action needed. Everything is working correctly.

Secondary DNS Warning

**Who is it for?**

Customers who are using Cloudflare for Secondary DNS and want to receive notifications about warnings issued by the transferred zone.

**Other options / filters**

None.

**Included with**

Enterprise plans.

**What should you do if you receive one?**

Actions for failure notifications will depend on the type of failure.

Refer to [Cloudflare Notifications](https://developers.cloudflare.com/notifications/get-started/) for more information on how to set up an alert.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/alerts/#page","headline":"Alerts for Secondary DNS · Cloudflare DNS docs","description":"Set up alerts for secondary DNS zone transfer events.","url":"https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/alerts/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/zone-setups/","name":"DNS setups"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/zone-setups/zone-transfers/","name":"DNS Zone transfers"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/zone-setups/zone-transfers/cloudflare-as-secondary/","name":"Cloudflare as Secondary"}},{"@type":"ListItem","position":6,"item":{"@id":"/dns/zone-setups/zone-transfers/cloudflare-as-secondary/alerts/","name":"Alerts"}}]}
```
