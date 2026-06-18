---
title: Protect your origin server
description: Secure your origin server with Cloudflare by hiding its IP address, limiting connections, and monitoring health.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/fundamentals/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Protect your origin server

Your [origin server ↗](https://www.cloudflare.com/learning/cdn/glossary/origin-server) is a physical or virtual machine that is not owned by Cloudflare and hosts your application content (data, webpages, etc.).

Receiving too many requests can be bad for your origin. These requests might increase latency for visitors, incur higher costs — particularly for cloud-based machines — and could knock your application offline.

## Secure origin connections

When you secure origin connections, it prevents attackers from discovering and overloading your origin server with requests.

* **DNS**:  
   1. **Proxy records** (when possible): Set up [proxied (orange-clouded) DNS records](https://developers.cloudflare.com/dns/proxy-status/) to hide your origin IP addresses and provide DDoS protection. As part of this, you should [allow Cloudflare IP addresses](https://developers.cloudflare.com/fundamentals/concepts/cloudflare-ip-addresses/) at your origin to prevent requests from being blocked.  
   2. **Review DNS-only records**: Audit existing **DNS-only** records (`SPF`, `TXT`, and more) to make sure they do not contain origin IP information.  
   3. **Evaluate mail infrastructure**: If possible, do not host a mail service on the same server as the web resource you want to protect, since emails sent to non-existent addresses get bounced back to the attacker and reveal the mail server IP.  
   4. **Rotate origin IPs**: Once [onboarded](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/#35-verify-changes), rotate your origin IPs, as DNS records are in the public domain. Historical records are kept and would contain IP addresses prior to joining Cloudflare

### Application layer

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

### Transport Layer

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

### Network Layer

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

## Monitor origin health

For passive monitoring, [create notifications](https://developers.cloudflare.com/notifications/get-started/#create-a-notification) for **Origin Error Rate Alerts** to receive alerts when your origin returns 5xx codes above a configurable threshold and **Passive Origin Monitoring** to see when Cloudflare is unable to reach your origin for a few minutes.

For more active monitoring, set up [standalone health checks](https://developers.cloudflare.com/health-checks/) for your origin.

Note

If you have multiple servers and want to proactively prevent origin problems, [set up load balancing](https://developers.cloudflare.com/load-balancing/) as an add-on service.

### Zero Downtime Failover

If you have another `A` or `AAAA` record in your Cloudflare **DNS** or your Cloudflare **Load Balancer** provides another [endpoint](https://developers.cloudflare.com/load-balancing/understand-basics/load-balancing-components/) in the same pool, **Zero-Downtime Failover** automatically retries requests to your origin even before a Load Balancing decision is made.

Zero-downtime failover will trigger a single retry only if there is another healthy endpoint in the pool and a [521, 522, 523, 525 or 526 error code](https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-521/) is occurring. No other error codes will trigger a zero-downtime failover operation.

  
## Reduce origin traffic

### Block traffic

For more details, refer to [Secure your website](https://developers.cloudflare.com/learning-paths/application-security/account-security/).

### Increase caching

The [cache](https://developers.cloudflare.com/cache/) stores data from your application (webpages, etc.) at Cloudflare data centers around the world, which reduces the number of requests sent to your origin server.

### Distribute traffic

To randomly distribute traffic across multiple servers, [set up multiple DNS records](https://developers.cloudflare.com/dns/manage-dns-records/how-to/round-robin-dns/).

For more fine-grained control over traffic distribution — including automatic failover, intelligent routing, and more — set up our [add-on load balancing service](https://developers.cloudflare.com/load-balancing/).

To protect specific endpoints from being overwhelmed by traffic spikes, [set up a waiting room](https://developers.cloudflare.com/waiting-room/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/fundamentals/security/protect-your-origin-server/#page","headline":"Protect your origin server · Cloudflare Fundamentals docs","description":"Secure your origin server with Cloudflare by hiding its IP address, limiting connections, and monitoring health.","url":"https://developers.cloudflare.com/fundamentals/security/protect-your-origin-server/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-04-20","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/fundamentals/","name":"Cloudflare Fundamentals"}},{"@type":"ListItem","position":3,"item":{"@id":"/fundamentals/security/","name":"Security"}},{"@type":"ListItem","position":4,"item":{"@id":"/fundamentals/security/protect-your-origin-server/","name":"Protect your origin server"}}]}
```
