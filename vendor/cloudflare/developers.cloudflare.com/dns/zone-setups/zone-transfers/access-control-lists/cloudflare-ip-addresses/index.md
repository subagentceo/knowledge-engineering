---
title: Cloudflare IP addresses
description: IP addresses used by Cloudflare for DNS zone transfers and NOTIFY messages.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

Cloudflare is updating the source IP addresses used for DNS zone transfers (AXFR/IXFR) and NOTIFY messages. You must update your allow lists before **December 1, 2026** to avoid service disruption.

# Cloudflare IP addresses

Depending on your setup ([Cloudflare as Primary](#cloudflare-as-primary) or [Cloudflare as Secondary](#cloudflare-as-secondary)), you need to configure slightly different Cloudflare IP addresses at your other DNS provider.

## Source IP addresses

Cloudflare's AXFR/IXFR zone transfer requests and NOTIFY messages originate from the following IP addresses. These need to be allowed at your other DNS servers.

```

104.30.167.163

104.30.167.173

2a09:bac0:1000:c47::/64


```

Action required: IP address migration

Since April 15, 2026, Cloudflare sends from the new IP addresses listed above and temporarily falls back to the old IP addresses if the new ones are blocked.

**On December 1, 2026, the old IP addresses will stop working.** Only the new IP addresses listed above will be used.

If you have an existing configuration, add the new IP addresses to your allow list first, verify that transfers and NOTIFY messages are working from the new addresses, and only then remove the old IP addresses.

Old source IP addresses (deprecated — removed December 1, 2026)

```

198.41.144.240/28

198.41.150.240/28

2a06:98c0:3601::/48

2a06:98c0:1401::/48


```

## Cloudflare as Primary

If you are using Cloudflare for Primary DNS — meaning that you are setting up Cloudflare to send [outgoing zone transfers](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-primary/) — you need to update the following settings at your secondary DNS provider.

### Allow range

Cloudflare's NOTIFY messages originate from the [source IP addresses](#source-ip-addresses) listed above. Allow them at your secondary DNS servers.

### Transfer IP

Cloudflare will listen to AXFR/IXFR zone transfer requests and SOA queries from your Secondary DNS server on this IP address.

```

172.65.64.6


```

## Cloudflare as Secondary

If you are using Cloudflare for Secondary DNS — meaning that you are setting up Cloudflare to receive [incoming zone transfers](https://developers.cloudflare.com/dns/zone-setups/zone-transfers/cloudflare-as-secondary/) — you need to update the following settings at your primary DNS provider.

### Allow range

Cloudflare's AXFR/IXFR zone transfer requests originate from the [source IP addresses](#source-ip-addresses) listed above. Allow them at your primary DNS servers.

### Notify IPs

Notify IPs are the IP addresses where you notify Cloudflare's Secondary DNS to initiate a pull of new zone information from your Primary DNS servers:

```

172.65.30.82

172.65.50.145

2606:4700:60:0:317:26ee:3bdf:5774

2606:4700:60:0:35a:4be3:4144:c5ee


```

### BIND server configuration

To run a BIND server as a primary, add the following statements to your zone file:

```

allow-transfer {104.30.167.163;104.30.167.173;2a09:bac0:1000:c47::/64;}

also-notify { 172.65.30.82;172.65.50.145;2606:4700:60:0:317:26ee:3bdf:5774;2606:4700:60:0:35a:4be3:4144:c5ee;}


```

Warning

If you are updating an existing BIND configuration, first add the new IP addresses alongside the old ones in your `allow-transfer` directive. Verify that zone transfers are completing successfully from the new addresses, and only then remove the old IP addresses. The old IP addresses will stop working on **December 1, 2026**.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/zone-setups/zone-transfers/access-control-lists/cloudflare-ip-addresses/#page","headline":"Cloudflare IP addresses - Access Control Lists (ACLs) · Cloudflare DNS docs","description":"IP addresses used by Cloudflare for DNS zone transfers and NOTIFY messages.","url":"https://developers.cloudflare.com/dns/zone-setups/zone-transfers/access-control-lists/cloudflare-ip-addresses/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/zone-setups/","name":"DNS setups"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/zone-setups/zone-transfers/","name":"DNS Zone transfers"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/zone-setups/zone-transfers/access-control-lists/","name":"Access Control Lists (ACLs)"}},{"@type":"ListItem","position":6,"item":{"@id":"/dns/zone-setups/zone-transfers/access-control-lists/cloudflare-ip-addresses/","name":"Cloudflare IP addresses"}}]}
```
