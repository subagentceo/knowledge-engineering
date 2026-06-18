---
title: Restrict external connections
description: Learn about restrict external connections in this guide.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Restrict external connections

To fully secure your origin, you should limit or restrict external connections to your origin server. These suggestions vary in their level of completeness and complexity and depend on your application and origin setup.

## Application layer

Cloudflare Tunnel (HTTP / WebSockets)

[Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) connects your resources to Cloudflare without a publicly routable IP address, by creating an outbound-only connections to Cloudflare’s global network.

* **Security**: Very secure.
* **Availability**: All customers.
* **Challenges**: Requires installing the `cloudflared` daemon on origin server or virtual machine.

HTTP Header Validation

Only allow traffic with specific (and secret) HTTP headers.

* **Security**: Moderately secure.
* **Availability**: All customers.
* **Challenges**:  
   * Requires more configuration efforts on application- and server-side to accept those headers.  
   * Basic authentication is vulnerable to replay attacks. Because basic authentication does not encrypt user credentials, it is important that traffic always be sent over an encrypted SSL session.  
   * There might be valid use cases for a mismatch in SNI / Host headers such as through [Origin or Page Rules](https://developers.cloudflare.com/rules/origin-rules/features/), [Load Balancing](https://developers.cloudflare.com/load-balancing/additional-options/override-http-host-headers/), or [Workers](https://developers.cloudflare.com/workers/runtime-apis/request/), which all offer HTTP Host Header overrides.
* **Process**:  
   1. Use [Transform rules](https://developers.cloudflare.com/rules/transform/request-header-modification/) or [Workers](https://developers.cloudflare.com/workers/examples/alter-headers/) to add an HTTP Auth Header.  
   2. Configure your origin server to restrict access based on the [HTTP Auth Header](https://developers.cloudflare.com/workers/examples/auth-with-headers/) (or perform [HTTP Basic Authentication](https://developers.cloudflare.com/workers/examples/basic-auth/)).  
   3. Configure your origin server to restrict access based on the [HTTP Host Header ↗](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Host). Specifically, only allow requests which contain expected HTTP Host Header values, and reject all other requests.

JSON Web Tokens (JWT) Validation

Only allow traffic with the appropriate JWT.

* **Security**: Very secure.
* **Availability**: Some customers.
* **Challenges**:  
   * Requires either installing incremental software or modifying application code.  
   * Lots of manual work.
* **Resources**:  
   * [Validate JWTs for an Access application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/validating-json/)  
   * [Validate JWTs for an API](https://developers.cloudflare.com/api-shield/security/jwt-validation/)

## Transport Layer

Authenticated Origin Pulls

[Authenticated Origin Pulls](https://developers.cloudflare.com/ssl/origin-configuration/authenticated-origin-pull/) helps ensure requests to your origin server come from the Cloudflare network.

* **Security**: Very secure.
* **Availability**: All customers.
* **Challenges**:  
   * Requires [Full](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full/) or [Full (strict)](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full-strict/) encryption modes.  
   * Requires more configuration efforts for application and server, such as uploading a certificate and configuring the server to use it.  
   * For more strict security, you should upload your own certificate. Although Cloudflare provides you a certificate for easy configuration, this certificate only guarantees that a request is coming from the Cloudflare network.  
   * Not scalable for large numbers of origin servers.

Cloudflare Tunnel (SSH / RDP)

[Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) connects your resources to Cloudflare without a publicly routable IP address, by creating an outbound-only connections to Cloudflare’s global network.

* **Security**: Very secure.
* **Availability**: All customers.
* **Challenges**: Requires installing the `cloudflared` daemon on origin server or virtual machine.

## Network Layer

Allowlist Cloudflare IP addresses

Explicitly block all traffic that does not come from [Cloudflare IP addresses](https://developers.cloudflare.com/fundamentals/concepts/cloudflare-ip-addresses/) (or the IP addresses of your trusted partners, vendors, or applications).

* **Security**: Moderately secure.
* **Availability**: All customers.
* **Challenges**:  
   * Requires allowlisting Cloudflare IP ranges at your origin server.  
   * Vulnerable to IP spoofing.

Cloudflare Magic Transit

[Cloudflare Magic Transit](https://developers.cloudflare.com/magic-transit/) is a network security and performance solution that offers DDoS protection, traffic acceleration, and more for on-premise, cloud-hosted, and hybrid networks.

* **Security**: Very secure.
* **Availability**: Enterprise-only.
* **Challenges**  
   * Client's routers must:  
         * Support anycast tunneling.  
         * Allow configuration of at least one tunnel per Internet service provider (ISP).  
         * Support maximum segment size (MSS) clamping.

Cloudflare Network Interconnect

[Cloudflare Network Interconnect](https://developers.cloudflare.com/network-interconnect/) allows you to connect your network infrastructure directly with Cloudflare – rather than using the public Internet – for a more reliable and secure experience.

* **Security**: Very secure.
* **Availability**: Enterprise-only.
* **Challenges**  
   * Requires some networking knowledge.  
   * Only applies to some customer use cases.

Dedicated CDN Egress IPs

[Smart Shield Advanced](https://developers.cloudflare.com/smart-shield/get-started/#packages-and-availability) provides dedicated egress IPs (from Cloudflare to your origin) for your layer 7 [WAF](https://developers.cloudflare.com/waf/) and CDN services, as well as [Spectrum](https://developers.cloudflare.com/spectrum/). The egress IPs are reserved exclusively for your account so that you can increase your origin security by only allowing a small list of IP addresses through your layer 3 firewall.

* **Security**: Very secure.
* **Availability**: Enterprise-only.
* **Challenges**: Requires network-level firewall policies.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/learning-paths/prevent-ddos-attacks/advanced/prevent-external-connections/#page","headline":"Restrict external connections · Cloudflare Learning Paths","description":"Learn about restrict external connections in this guide.","url":"https://developers.cloudflare.com/learning-paths/prevent-ddos-attacks/advanced/prevent-external-connections/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/prevent-ddos-attacks/advanced/","name":"Advanced DDoS protection"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/prevent-ddos-attacks/advanced/prevent-external-connections/","name":"Restrict external connections"}}]}
```
