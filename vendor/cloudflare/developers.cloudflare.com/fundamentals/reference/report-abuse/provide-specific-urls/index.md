---
title: Providing specific URLs
description: Learn how to provide specific asset URLs when submitting an abuse report.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Providing specific URLs

If you are [submitting an abuse report ↗](https://abuse.cloudflare.com) to Cloudflare because our IP address appears in the WHOIS and DNS records for a website, it is very likely that the website is one of millions of websites that use our pass-through security and content distribution network (CDN) services. Because assets on the same website may be hosted by different providers, it is important that you submit the URL for that specific asset to enable appropriate action. This guide will teach you how to identify URLs for specific video or images on a webpage.

## Get the URL for specific content

To get the URL for a specific piece of content on a webpage:

1. Open your web browser (Google Chrome, Safari, Firefox, Edge).
2. Go to the web page you want to report.
3. Right click on the content you wish to report (often a video or image).
4. Select **Inspect Element**.
5. In the **DevTools** panel, look for the **src** attribute in the selected the image, video, or iFrame.![Look for the URL in the src attribute of the video or image](https://developers.cloudflare.com/_astro/identify-url.o_PP6jZ2_1rmxgw.webp)
6. Copy the URL.

Providing the most specific and helpful URL enables Cloudflare to correctly identify any services it may be providing with respect to that content.

## Submitting the abuse report

Once you have identified the URL for the specific asset, you can [submit an abuse report ↗](https://abuse.cloudflare.com) through Cloudflare's online abuse reporting process.

You can learn more about the process, and what you can expect from Cloudflare in response to such abuse reports, from [our abuse policy ↗](https://www.cloudflare.com/trust-hub/reporting-abuse/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/reference/report-abuse/provide-specific-urls/#page","headline":"Providing specific URLs - Report abuse · Cloudflare Fundamentals docs","description":"Learn how to provide specific asset URLs when submitting an abuse report.","url":"https://developers.cloudflare.com/fundamentals/reference/report-abuse/provide-specific-urls/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/reference/","name":"Reference"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/reference/report-abuse/","name":"Abuse"}},{"@type":"ListItem","position":5,"item":{"@id":"/fundamentals/reference/report-abuse/provide-specific-urls/","name":"Providing specific URLs"}}]}
```
