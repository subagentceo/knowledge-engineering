---
title: Stale response for upstream DNS resolution
description: Fix stale DNS responses from upstream resolvers.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Stale response for upstream DNS resolution

In one of the scenarios below, you notice that stale DNS responses are used. Depending on the scenario and other aspects of your configuration, this can cause wrong content or no content to be returned.

* A proxied CNAME record ([flattened by default](https://developers.cloudflare.com/dns/cname-flattening/)).
* A DNS-only CNAME record that has flattening turned on. This can happen either via the specific record configuration or as a consequence of the [zone settings](https://developers.cloudflare.com/dns/cname-flattening/set-up-cname-flattening/).
* A [Workers](https://developers.cloudflare.com/workers/) script making a subrequest to an external hostname[1](#user-content-fn-1).

## Cause

In the event that an upstream DNS server takes too long to respond, or the upstream returns a SERVFAIL, Cloudflare will use the expired DNS response from the cache and then attempt to update that cache asynchronously.

## Solutions

* If possible, temporarily replace the proxied CNAME with a proxied A record. This may not always be possible, especially if the upstream target is a load balancer or if it returns dynamic responses.
* Report the issues to the zone owner or DNS provider for the upstream target that is unresponsive.
* You can also raise the issue through the DNS Operations Analysis and Research Center (DNS OARC). Consider its [chat platform ↗](https://www.dns-oarc.net/oarc/services/chat) or [email lists ↗](https://www.dns-oarc.net/oarc/lists).

## Footnotes

1. A hostname that is not using Cloudflare as its [authoritative DNS provider](https://developers.cloudflare.com/dns/concepts/#authoritative-dns). [↩](#user-content-fnref-1)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/manage-dns-records/troubleshooting/stale-response/#page","headline":"Stale response for upstream DNS resolution · Cloudflare DNS docs","description":"Fix stale DNS responses from upstream resolvers.","url":"https://developers.cloudflare.com/dns/manage-dns-records/troubleshooting/stale-response/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/manage-dns-records/","name":"DNS records"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/manage-dns-records/troubleshooting/","name":"Troubleshooting"}},{"@type":"ListItem","position":5,"item":{"@id":"/dns/manage-dns-records/troubleshooting/stale-response/","name":"Stale response for upstream DNS resolution"}}]}
```
