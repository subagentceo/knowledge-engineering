---
title: Create ACL
description: Create an ACL for DNS zone transfers.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Create ACL

You need to create an Access Control List (ACL) if Cloudflare is your [secondary DNS provider](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/). The ACL will specify additional NOTIFY IPs that Cloudflare should listen to.

An ACL is configured at the account level, which means that it will apply to every primary and secondary zone in your account.

* [ Dashboard ](#tab-panel-8143)
* [ API ](#tab-panel-8144)

To create a new ACL using the dashboard:

1. In the Cloudflare dashboard, go to the account **Settings** page.  
[ Go to **Configurations** ](https://dash.cloudflare.com/?to=/:account/configurations)
2. Go to **DNS Settings**.
3. Under **DNS Zone Transfers**, for **ACL**, select **Create**.
4. Enter the following information:  
   * **ACL name**: Provide a descriptive name.  
   * **IP range**: Enter a range of IPv4 or IPv6 addresses (limited to a maximum of /24 for IPv4 and /64 for IPv6).
5. Select **Create**.

To create a new ACL using the API, send a [POST](https://developers.cloudflare.com/api/resources/dns/subresources/zone%5Ftransfers/subresources/acls/methods/create/) request.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/zone-setups/zone-transfers/access-control-lists/create-new-list/#page","headline":"Create a new Access Control List · Cloudflare DNS docs","description":"Create an ACL for DNS zone transfers.","url":"https://developers.cloudflare.com/dns/zone-setups/zone-transfers/access-control-lists/create-new-list/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/zone-setups/","name":"DNS setups"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/zone-setups/zone-transfers/","name":"DNS Zone transfers"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/zone-setups/zone-transfers/access-control-lists/","name":"Access Control Lists (ACLs)"}},{"@type":"ListItem","position":6,"item":{"@id":"/dns/zone-setups/zone-transfers/access-control-lists/create-new-list/","name":"Create ACL"}}]}
```
