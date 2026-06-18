---
title: Known issues
description: Known issues and bugs to be aware of when using Workers.
image: https://developers.cloudflare.com/dev-products-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/workers/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Known issues

Below are some known bugs and issues to be aware of when using Cloudflare Workers.

## Route specificity

* When defining route specificity, a trailing `/*` in your pattern may not act as expected.

Consider two different Workers, each deployed to the same zone. Worker A is assigned the `example.com/images/*` route and Worker B is given the `example.com/images*` route pattern. With these in place, here are how the following URLs will be resolved:

```

// (A) example.com/images/*

// (B) example.com/images*


"example.com/images"

// -> B

"example.com/images123"

// -> B

"example.com/images/hello"

// -> B


```

You will notice that all examples trigger Worker B. This includes the final example, which exemplifies the unexpected behavior.

When adding a wildcard on a subdomain, here are how the following URLs will be resolved:

```

// (A) *.example.com/a

// (B) a.example.com/*


"a.example.com/a"

// -> B


```

## wrangler dev

* When running `wrangler dev --remote`, all outgoing requests are given the `cf-workers-preview-token` header, which Cloudflare recognizes as a preview request. This applies to the entire Cloudflare network, so making HTTP requests to other Cloudflare zones is currently discarded for security reasons. To enable a workaround, insert the following code into your Worker script:

JavaScript

```

const request = new Request(url, incomingRequest);

request.headers.delete('cf-workers-preview-token');

return await fetch(request);


```

## Fetch API in CNAME setup

When you make a subrequest using [fetch()](https://developers.cloudflare.com/workers/runtime-apis/fetch/) from a Worker, the Cloudflare DNS resolver is used. When a zone has a [Partial (CNAME) setup](https://developers.cloudflare.com/dns/zone-setups/partial-setup/), all hostnames that the Worker needs to be able to resolve require a dedicated DNS entry in Cloudflare's DNS setup. Otherwise the Fetch API call will fail with status code [530 (1016)](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1016/).

Setup with missing DNS records in Cloudflare DNS

```

// Zone in partial setup: example.com

// DNS records at Authoritative DNS: sub1.example.com, sub2.example.com, ...

// DNS records at Cloudflare DNS: sub1.example.com


"sub1.example.com/"

// -> Can be resolved by Fetch API

"sub2.example.com/"

// -> Cannot be resolved by Fetch API, will lead to 530 status code


```

After adding `sub2.example.com` to Cloudflare DNS

```

// Zone in partial setup: example.com

// DNS records at Authoritative DNS: sub1.example.com, sub2.example.com, ...

// DNS records at Cloudflare DNS: sub1.example.com, sub2.example.com


"sub1.example.com/"

// -> Can be resolved by Fetch API

"sub2.example.com/"

// -> Can be resolved by Fetch API


```

## Fetch to IP addresses

For Workers subrequests, requests can only be made to URLs, not to IP addresses directly. To overcome this limitation [add a A or AAAA name record to your zone ↗](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/) and then fetch that resource.

For example, in the zone `example.com` create a record of type `A` with the name `server` and value `192.0.2.1`, and then use:

JavaScript

```

await fetch('http://server.example.com')


```

Do not use:

JavaScript

```

await fetch('http://192.0.2.1')


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/workers/platform/known-issues/#page","headline":"Known issues · Cloudflare Workers docs","description":"Known issues and bugs to be aware of when using Workers.","url":"https://developers.cloudflare.com/workers/platform/known-issues/","inLanguage":"en","image":"https://developers.cloudflare.com/dev-products-preview.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/workers/","name":"Workers"}},{"@type":"ListItem","position":3,"item":{"@id":"/workers/platform/","name":"Platform"}},{"@type":"ListItem","position":4,"item":{"@id":"/workers/platform/known-issues/","name":"Known issues"}}]}
```
