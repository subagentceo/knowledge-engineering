---
title: Define source origin
description: Specify which origins can serve source videos for Cloudflare Media Transformations.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/stream/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Define source origin

Media Transformations is now GA:

Billing for Media Transformations will begin on November 1st, 2025.

When optimizing remote videos, you can specify which origins can be used as the source for transformed videos. By default, Cloudflare accepts only source videos from the zone where your transformations are served.

On this page, you will learn how to define and manage the origins for the source videos that you want to optimize.

Note

The allowed origins setting applies to requests from Cloudflare Workers.

If you use a Worker to optimize remote videos via a `fetch()` subrequest, then this setting may conflict with existing logic that handles source videos.

## Configure origins

To get started, you must have [transformations enabled on your zone](https://developers.cloudflare.com/stream/transform-videos/#getting-started).

In the Cloudflare dashboard, go to **Stream** \> **Transformations** and select the zone where you want to serve transformations.

In **Sources**, you can configure the origins for transformations on your zone.

![Enable allowed origins from the Cloudflare dashboard](https://developers.cloudflare.com/_astro/allowed-origins.4hu5lHws_ZsjEgI.webp) 

## Allow source videos only from allowed origins

You can restrict source videos to **allowed origins**, which applies transformations only to source videos from a defined list.

By default, your accepted sources are set to **allowed origins**. Cloudflare will always allow source videos from the same zone where your transformations are served.

If you request a transformation with a source video from outside your **allowed origins**, then the video will be rejected. For example, if you serve transformations on your zone `a.com` and do not define any additional origins, then `a.com/video.mp4` can be used as a source video, but `b.com/video.mp4` will return an error.

To define a new origin:

1. From **Sources**, select **Add origin**.
2. Under **Domain**, specify the domain for the source video. Only valid web URLs will be accepted.
![Add the origin for source videos in the Cloudflare dashboard](https://developers.cloudflare.com/_astro/add-origin.BtfOyoOS_Z27sFtH.webp) 

When you add a root domain, subdomains are not accepted. In other words, if you add `b.com`, then source videos from `media.b.com` will be rejected.

To support individual subdomains, define an additional origin such as `media.b.com`. If you add only `media.b.com` and not the root domain, then source videos from the root domain (`b.com`) and other subdomains (`cdn.b.com`) will be rejected.

To support all subdomains, use the `*` wildcard at the beginning of the root domain. For example, `*.b.com` will accept source videos from the root domain (like `b.com/video.mp4`) as well as from subdomains (like `media.b.com/video.mp4` or `cdn.b.com/video.mp4`).

1. Optionally, you can specify the **Path** for the source video. If no path is specified, then source videos from all paths on this domain are accepted.

Cloudflare checks whether the defined path is at the beginning of the source path. If the defined path is not present at the beginning of the path, then the source video will be rejected.

For example, if you define an origin with domain `b.com` and path `/themes`, then `b.com/themes/video.mp4` will be accepted but `b.com/media/themes/video.mp4` will be rejected.

1. Select **Add**. Your origin will now appear in your list of allowed origins.
2. Select **Save**. These changes will take effect immediately.

When you configure **allowed origins**, only the initial URL of the source video is checked. Any redirects, including URLs that leave your zone, will be followed, and the resulting video will be transformed.

If you change your accepted sources to **any origin**, then your list of sources will be cleared and reset to default.

## Allow source videos from any origin

When your accepted sources are set to **any origin**, any publicly available video can be used as the source video for transformations on this zone.

**Any origin** is less secure and may allow third parties to serve transformations on your zone.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/stream/transform-videos/sources/#page","headline":"Define source origin · Cloudflare Stream docs","description":"Specify which origins can serve source videos for Cloudflare Media Transformations.","url":"https://developers.cloudflare.com/stream/transform-videos/sources/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/stream/","name":"Stream"}},{"@type":"ListItem","position":3,"item":{"@id":"/stream/transform-videos/","name":"Transform videos"}},{"@type":"ListItem","position":4,"item":{"@id":"/stream/transform-videos/sources/","name":"Define source origin"}}]}
```
