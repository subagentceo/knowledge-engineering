---
title: Media and streaming
description: Deliver video, images, and media at scale with Cloudflare Stream, Images, R2, and global caching.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/use-cases/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Media and streaming

Deliver video, images, and rich media at scale with encoding, optimization, and global distribution. Cloudflare Stream handles video upload, encoding, and adaptive bitrate delivery. Images transforms and optimizes images on-the-fly. R2 stores media files with zero egress fees. Cache serves content from 300+ edge locations. Hotlink Protection and signed URLs secure media from unauthorized access.

* [ Upload, encode, and deliver videos ](https://developers.cloudflare.com/use-cases/media-streaming/video-delivery/)
* [ Optimize and transform images for the web ](https://developers.cloudflare.com/use-cases/media-streaming/image-optimization/)
* [ Store media at scale ](https://developers.cloudflare.com/use-cases/media-streaming/store-media/)
* [ Cache and accelerate media delivery ](https://developers.cloudflare.com/use-cases/media-streaming/cache-delivery/)
* [ Secure your content ](https://developers.cloudflare.com/use-cases/media-streaming/secure-content/)

## Architecture patterns

### Video platform

Build a complete video hosting and delivery solution:

* **Stream** handles upload, encoding, and adaptive bitrate delivery
* **Stream Live** enables live streaming with automatic recording
* **Signed URLs** protect content with token authentication

### Image optimization pipeline

Serve optimized images without pre-generating variants:

1. **R2** stores original high-resolution images
2. **Images** transforms images on-the-fly based on URL parameters
3. **Workers** applies custom logic for format selection and caching

### User-generated content

Handle media uploads from users at scale:

1. **R2** receives uploads directly via presigned URLs
2. **Workers** validates and processes uploaded content
3. **Stream** or **Images** optimizes media for delivery

---

## Prerequisites

### Create a new application

* A [Cloudflare account ↗](https://dash.cloudflare.com/sign-up). Stream and R2 are account-level offerings. You do not need a domain added to Cloudflare to upload, encode, or store media.
* For Image Transformations: enable the feature per domain from the [Transformations page ↗](https://dash.cloudflare.com/?to=/:account/images/transformations) in the dashboard. Refer to [Image Transformations](https://developers.cloudflare.com/images/optimization/transformations/overview/).

### Use an existing application

* A [Cloudflare account ↗](https://dash.cloudflare.com/sign-up).
* A domain [added to Cloudflare](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/) with DNS records proxied through Cloudflare. This is required for CDN caching, image optimization (Polish), and cache rules.
* For Image Transformations on an existing domain: enable the feature from the [Transformations page ↗](https://dash.cloudflare.com/?to=/:account/images/transformations) in the dashboard. Refer to [Image Transformations](https://developers.cloudflare.com/images/optimization/transformations/overview/).

---

## Related resources

[Stream documentation](https://developers.cloudflare.com/stream/) 

Complete documentation for video upload, encoding, and delivery.

[Images documentation](https://developers.cloudflare.com/images/) 

Complete documentation for image optimization and transformation.

[Media case studies](https://www.cloudflare.com/case-studies/?industry=Media%20%26%20Entertainment) 

Explore how media companies use Cloudflare.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/use-cases/media-streaming/#page","headline":"Media and streaming · Use cases · Cloudflare use cases","description":"Deliver video, images, and media at scale with Cloudflare Stream, Images, R2, and global caching.","url":"https://developers.cloudflare.com/use-cases/media-streaming/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-24","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/use-cases/","name":"Use cases"}},{"@type":"ListItem","position":3,"item":{"@id":"/use-cases/media-streaming/","name":"Media and streaming"}}]}
```
