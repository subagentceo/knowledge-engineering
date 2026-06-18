---
title: Serverless image content management
description: Leverage various components of Cloudflare's ecosystem to construct a scalable image management solution
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/reference-architecture/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Serverless image content management

**Last reviewed:**  over 2 years ago 

## Introduction

In this reference architecture diagram, we reveal how to leverage various components of Cloudflare’s ecosystem to construct a scalable image management solution. This solution integrates moderation principles via Cloudflare's Workers AI platform and performs image classification through inference at the edge. The storage of images is handled by Cloudflare's R2 product, an S3 API-like object storage system, while metadata is stored in a key/value store to enable content augmentation.

The servicing of images to requesting clients is secured by link signature, resizing based on device type or requested transformations and leveraging Cloudflare’s native security and performance features.

![Figure 1: Serverless image content management](https://developers.cloudflare.com/_astro/diagram.DEMTm7TJ_2sama5.svg "Figure 1: Serverless image content management reference architecture diagram")

Figure 1: Serverless image content management reference architecture diagram

### Products included in the recipe

| Product                                                                                          | Function                                                              |
| ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| [DDoS ↗](https://www.cloudflare.com/application-services/products/bot-management/)               | Volumetric attack protection                                          |
| [Bot Management ↗](https://www.cloudflare.com/ddos/)                                             | Protection against scraping and general sophisticated automated abuse |
| [Web Application Firewall ↗](https://www.cloudflare.com/application-services/products/waf/)      | Protection against web threats                                        |
| [CDN ↗](https://www.cloudflare.com/application-services/products/cdn/)                           | Cache spreading of the images                                         |
| [Optimization ↗](https://www.cloudflare.com/application-services/products/website-optimization/) | Compression and acceleration of the image delivery                    |
| [Workers ↗](https://workers.cloudflare.com/)                                                     | Compute of the several serverless micro services                      |
| [AI ↗](https://ai.cloudflare.com/)                                                               | Image classification                                                  |
| [R2 ↗](https://www.cloudflare.com/developer-platform/r2/)                                        | S3-type object-storage platform                                       |
| [KV](https://developers.cloudflare.com/kv/)                                                      | Image metadata storage                                                |

## Getting started

This reference architecture diagram reveals how to harness the power of the Cloudflare platform to construct a fully serverless image and content management system. This implementation leverages various components of the Cloudflare stack, including edge compute with Cloudflare Workers, KV, and R2 object storage; application performance optimization and caching; application security features such as rate limiting and DDoS mitigation; and artificial intelligence with Workers AI.

The ultimate goal is to create a scalable and accessible platform for storing and serving images globally. This reference architecture will walk you through the key features and mechanisms that you can use with Cloudflare’s native capabilities as well as those that can be built with Cloudflare’s robust computing capabilities.

### 1\. Image servicing

Clients request images with [HMAC signatures](https://developers.cloudflare.com/workers/examples/signing-requests/) and any necessary transformations. Transformation parameters can be included in the [src-set](https://developers.cloudflare.com/images/optimization/make-responsive-images/#srcset-for-high-dpi-displays) for HTML content or directly sent alongside [HTTP requests](https://developers.cloudflare.com/images/optimization/features/).

### 2\. Volumetric protection

Cloudflare's Application Security stack takes a comprehensive approach to shielding the image servicing from malicious activities. By implementing volumetric protection [rate limiting controls](https://developers.cloudflare.com/waf/rate-limiting-rules/), we effectively mitigate the risk of abuse and [DDoS](https://developers.cloudflare.com/ddos-protection/) attacks, ensuring uninterrupted service delivery.

### 3\. Signature validation

A [Cloudflare worker](https://developers.cloudflare.com/workers/) function validates [incoming signatures](https://developers.cloudflare.com/workers/examples/signing-requests/) to ensure the authenticity and integrity of requests. This security measure helps prevent content evasion and abuse of the service by verifying that the signature accompanying the request is legitimate. The application responsible for generating content and associated signatures can also set expiration dates for links, further guarding against tampering or man-in-the-middle attacks. HMAC (Hash-based Message Authentication Code) is commonly used as the signature mechanism of choice for this purpose.

### 4\. Image optimization and caching

Images are retrieved from [cache](https://developers.cloudflare.com/cache/) when available or stored on the server for the first time and delivered to clients upon request. We optimize image delivery by serving the most suitable format for each device, such as [WebP or AVIF](https://developers.cloudflare.com/images/polish/), while also applying compression to reduce file size. This ensures a smooth and seamless visual experience for users.

### 4\. Image transformations

Cloudflare's [image resizing](https://developers.cloudflare.com/images/) feature will resize the original images requested for transformation, completing the process entirely at the edge from any of our global locations. This fast and efficient process offers a wide range of transformation options.

### 5\. Content moderation and storage

A [Cloudflare Worker](https://developers.cloudflare.com/workers/) script meticulously analyzes incoming images, leveraging their [classification metadata](https://developers.cloudflare.com/workers-ai/models/) to ensure compliance with established policy of use. [Cloudflare R2](https://developers.cloudflare.com/r2/) serves as an S3-like object storage solution, storing images and their associated metadata (such as image classification) in a globally accessible and scalable manner. With lightning-fast delivery capabilities and the ability to scale from 0, Cloudflare R2 is an ideal solution for storing and managing large collections of images.

### 6\. Image classification

With [Cloudflare AI ↗](https://ai.cloudflare.com/) at its core, our [image classification](https://developers.cloudflare.com/workers-ai/models/) inference model will rapidly inspect each incoming image, classifying them in real-time. This cutting-edge technology allows us to streamline the process of moderating content, significantly reducing the need for a dedicated team to sift through and review every submission.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/reference-architecture/diagrams/serverless/serverless-image-content-management/#page","headline":"Serverless image content management · Cloudflare Reference Architecture docs","description":"Leverage various components of Cloudflare's ecosystem to construct a scalable image management solution","url":"https://developers.cloudflare.com/reference-architecture/diagrams/serverless/serverless-image-content-management/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-16","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/reference-architecture/","name":"Reference Architecture"}},{"@type":"ListItem","position":3,"item":{"@id":"/reference-architecture/diagrams/","name":"Reference Architecture Diagrams"}},{"@type":"ListItem","position":4,"item":{"@id":"/reference-architecture/diagrams/serverless/","name":"Serverless"}},{"@type":"ListItem","position":5,"item":{"@id":"/reference-architecture/diagrams/serverless/serverless-image-content-management/","name":"Serverless image content management"}}]}
```
