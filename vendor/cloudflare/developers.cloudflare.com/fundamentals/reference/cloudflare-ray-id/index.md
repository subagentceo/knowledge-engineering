---
title: Cloudflare Ray ID
description: Use Cloudflare Ray IDs to identify and trace individual requests through Security Events, Log Explorer, and server logs.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Cloudflare Ray ID

A **Cloudflare Ray ID** is an identifier given to every request that goes through Cloudflare.

Ray IDs are particularly useful when evaluating Security Events for patterns or false positives or more generally understanding your application traffic.

Ray IDs are added as a [request header, cf-ray](https://developers.cloudflare.com/fundamentals/reference/http-headers/#cf-ray), to the connection from Cloudflare to the origin web server. As such the Ray IDs can be found using the Developer Tools in your browser or using curl with the `-v` option to show the headers.

Warning

Ray IDs are not guaranteed to be unique for every request. In some situations, different requests may have the same Ray ID.

## Look up Ray IDs

### Security events

All customers can view Ray IDs and associated information — IP address, user agent, ASN, etc. — by looking through [sampled logs](https://developers.cloudflare.com/waf/analytics/security-events/#sampled-logs) in Security Events.

![Example list of events in sampled logs, with the Ray ID highlighted from one of the expanded events to show its details](https://developers.cloudflare.com/_astro/ray-id.CkgisnhS_12rad6.webp) 

Additionally, you can [add filters](https://developers.cloudflare.com/waf/analytics/security-events/#adjust-displayed-data) to look for specific Ray IDs.

![Example of adding a new filter in Security Events for the Block action](https://developers.cloudflare.com/_astro/events-add-filter.DDUuZ0g7_ZC975W.webp) 

Please note that Security Events may use sampled data to improve performance. If sampled data is applied to your search, you might not see all events, and filters might not return the expected results. To display more events, select a smaller timeframe.

### Log Explorer

[Log Explorer](https://developers.cloudflare.com/log-explorer/) provides access to Cloudflare logs with all the context available within the Cloudflare platform. You can monitor security and performance issues with custom dashboards or investigate and troubleshoot issues with log search. Log explorer allows you to [build queries](https://developers.cloudflare.com/log-explorer/log-search/) for filtering specific Ray IDs.

### Logs

Enterprise customers can enable Ray ID as a field in their [Cloudflare Logs](https://developers.cloudflare.com/logs/).

### Server logs

For more details about sending Ray IDs to your server logs, refer to the [Cf-Ray](https://developers.cloudflare.com/fundamentals/reference/http-headers/#cf-ray) header.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/reference/cloudflare-ray-id/#page","headline":"Cloudflare Ray ID · Cloudflare Fundamentals docs","description":"Use Cloudflare Ray IDs to identify and trace individual requests through Security Events, Log Explorer, and server logs.","url":"https://developers.cloudflare.com/fundamentals/reference/cloudflare-ray-id/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/reference/cloudflare-ray-id/","name":"Cloudflare Ray ID"}}]}
```
