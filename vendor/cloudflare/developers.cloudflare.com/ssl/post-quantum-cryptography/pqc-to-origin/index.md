---
title: Post-quantum between Cloudflare and origin servers
description: Learn about post-quantum cryptography in connections from Cloudflare to your origin servers.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Post-quantum between Cloudflare and origin servers

As explained in [About PQC](https://developers.cloudflare.com/ssl/post-quantum-cryptography/), Cloudflare has deployed support for hybrid key agreements, which includes both the most common key agreement for TLS 1.3, X25519, and the post-quantum secure ML-KEM.

With X25519, the [ClientHello ↗](https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/) almost always fits within one network packet. However, with the addition of ML-KEM, the ClientHello is typically split across two packets.

This poses a question of how the origin servers - as well as other middleboxes (routers, load balancers, etc) - will handle this change in behavior. Although allowed by the TLS 1.3 standard ([RFC 8446 ↗](https://www.rfc-editor.org/rfc/rfc8446.html)), a split ClientHello risks not being handled well due to [protocol ossification ↗](https://en.wikipedia.org/wiki/Protocol%5Fossification) and implementation bugs. Refer to our [blog post ↗](https://blog.cloudflare.com/post-quantum-to-origins/) for details.

Customers can also configure connections to origin servers via [PQ Cloudflare Tunnel](https://developers.cloudflare.com/ssl/post-quantum-cryptography/pqc-and-zero-trust/).

## ClientHello from Cloudflare

To reduce the risk of any issues when connecting to servers that are not ready for hybrid key agreements, Cloudflare leverages HelloRetryRequest. This means that, instead of sending [X25519MLKEM768](https://developers.cloudflare.com/ssl/post-quantum-cryptography/#hybrid-key-agreement) immediately as a keyshare [1](#user-content-fn-1), Cloudflare will by default only advertise support for it.

If the origin supports post-quantum hybrid key agreement, it can use HelloRetryRequest to request it from Cloudflare.

## Set up

### Cloudflare zone settings

The method described above is the one Cloudflare uses to support post-quantum to all outbound connections. However, if your origin server supports PQC and prefers it, you can use the [API](https://developers.cloudflare.com/api/resources/origin%5Fpost%5Fquantum%5Fencryption/methods/update/) to adjust your Cloudflare zone settings and avoid the extra round trip.

It is also possible to opt out of PQC using the same API endpoint.

Note

This setting affects all outbound connections from the zone you specify in the API call, including `fetch()` requests made by [Workers](https://developers.cloudflare.com/workers/) on your zone.

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Zone Settings Write`
* `Zone Write`

Change Origin Post-Quantum Encryption setting

```

curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/origin_post_quantum_encryption" \

  --request PUT \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "value": "<YOUR_CHOSEN_SETTING>"

  }'


```

The possible values are:

* `supported` (most compatible): Advertise support for post-quantum key agreement, but send a classical keyshare in the first ClientHello.
* `preferred` (most performant): Send a post-quantum keyshare in the first ClientHello. Cloudflare continues to advertise support for classical keyshares as well.
* `off`: Do not send nor advertise support for post-quantum key agreement to the origin.

### Origin server

To make sure that your origin server prefers the post-quantum key agreement, use the `bssl` tool of [BoringSSL ↗](https://github.com/google/boringssl):

Terminal window

```

$ bssl client -connect (your server):443 -curves X25519MLKEM768


```

Verify that the `ECDHE curve` in the handshake output indicates `X25519MLKEM768`.

## Footnotes

1. When, to remove a round trip, a client makes a guess of what the server supports. [↩](#user-content-fnref-1)

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/post-quantum-cryptography/pqc-to-origin/#page","headline":"Post-quantum between Cloudflare and origin servers · Cloudflare SSL/TLS docs","description":"Learn about post-quantum cryptography in connections from Cloudflare to your origin servers.","url":"https://developers.cloudflare.com/ssl/post-quantum-cryptography/pqc-to-origin/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-17","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Post-quantum"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/post-quantum-cryptography/","name":"Post-quantum cryptography (PQC)"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/post-quantum-cryptography/pqc-to-origin/","name":"Post-quantum between Cloudflare and origin servers"}}]}
```
