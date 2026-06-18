---
title: Troubleshooting
description: Learn how to troubleshoot issues with secondary nameservers.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Troubleshooting

When [updating your registrar](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/setup/#4-update-registrar) with the Cloudflare secondary nameservers (`nsXXXX.secondary.cloudflare.com`), you get an error.

Note

The exact error message depends on the system. Some examples would be: `Entity reference not found`,` Authorization error`, `Unable to create foreign nameserver`.

Upon contacting your registrar, their services confirm that the Cloudflare nameservers cannot be added at this time.

---

## Cause

This issue may arise when one of the Cloudflare nameservers used for secondary setup is removed from the Verisign side.

---

## Solution

The Cloudflare engineering team needs to be engaged [through Support](https://developers.cloudflare.com/support/contacting-cloudflare-support/) to make sure the nameserver gets registered again manually at Verisign.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/zone-setups/zone-transfers/troubleshooting/#page","headline":"Troubleshooting secondary nameservers · Cloudflare DNS docs","description":"Learn how to troubleshoot issues with secondary nameservers.","url":"https://developers.cloudflare.com/dns/zone-setups/zone-transfers/troubleshooting/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/zone-setups/","name":"DNS setups"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/zone-setups/zone-transfers/","name":"DNS Zone transfers"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/zone-setups/zone-transfers/troubleshooting/","name":"Troubleshooting"}}]}
```
