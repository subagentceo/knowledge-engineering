---
title: Integrations
description: Use Cloudflare Tunnel with Cloudflare One, Workers VPC, Load Balancing, Access, Spectrum, and other Cloudflare services.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/tunnel/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Integrations

Cloudflare Tunnel integrates with other Cloudflare products to extend connectivity, security, and availability for your applications.

## Cloudflare One (private networking)

Beyond publishing public applications, Cloudflare Tunnel is the connectivity layer for [Cloudflare One](https://developers.cloudflare.com/cloudflare-one/) — Cloudflare's SASE platform. The same post-quantum encrypted tunnels that serve your public applications can also serve private traffic when combined with the [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/):

* **Private applications** — Expose internal web apps, SSH servers, RDP hosts, and other services to authenticated users without making them publicly reachable.
* **Private networks** — Route entire IP ranges (RFC 1918, custom CIDRs) through a tunnel, replacing site-to-site VPNs. Users on Cloudflare One Client-enrolled devices reach private IPs as if they were on your private network.
* **Network traffic filtering** — Apply DNS, HTTP, and network-level policies through [Cloudflare Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/) to all traffic flowing through the tunnel.

If you are using Cloudflare Tunnel for Zero Trust network access, VPN replacement, or private network connectivity, refer to the [Cloudflare One Tunnel documentation](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) for setup and configuration.

**Related:** [Connect private networks](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/) | [SSH guide](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/ssh/) | [RDP guide](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/use-cases/rdp/) | [Replace your VPN](https://developers.cloudflare.com/learning-paths/replace-vpn/get-started/)

## Workers VPC

[Workers VPC](https://developers.cloudflare.com/workers-vpc/) enables Cloudflare Workers to access private resources such as databases, internal APIs, and other services. Cloudflare Tunnel serves as the connectivity layer, establishing a post-quantum encrypted outbound connection from your private network to Cloudflare. You can manage your tunnels directly from [Wrangler](https://developers.cloudflare.com/workers/wrangler/commands/tunnel/), the Cloudflare Developer Platform CLI.

**Get started:** [Create a tunnel](https://developers.cloudflare.com/tunnel/setup/) and then follow the [Workers VPC guide](https://developers.cloudflare.com/workers-vpc/get-started/) to configure VPC Services.

**Related:** [Connect to a private API](https://developers.cloudflare.com/workers-vpc/examples/private-api/) | [Connect to an S3 bucket](https://developers.cloudflare.com/workers-vpc/examples/private-s3-bucket/)

## Load Balancing

[Cloudflare Load Balancing](https://developers.cloudflare.com/load-balancing/) distributes traffic across multiple origins using health checks, steering algorithms, and failover logic. Combined with Tunnel, you can load balance traffic to origins without publicly routable IP addresses.

Each tunnel is assigned a subdomain (`<UUID>.cfargotunnel.com`). Add this as an endpoint in a Load Balancer pool with the application hostname as the host header.

**Get started:** Refer to [Load Balancing setup](https://developers.cloudflare.com/tunnel/routing/#load-balancing) for step-by-step instructions.

**Related:** [Tunnel replicas](https://developers.cloudflare.com/tunnel/configuration/#replicas-and-high-availability) | [Load Balancing reference architecture](https://developers.cloudflare.com/reference-architecture/architectures/load-balancing/)

## Cloudflare Access

[Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/access-controls/) provides an identity-aware proxy that authenticates every request to your applications. Combined with Tunnel, Access lets you publish internal web applications to the Internet while ensuring only authorized users can reach them. You can configure [Access policies](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) based on user identity, source IP ranges, service tokens for machine-to-machine authentication, and more.

**Get started:** [Publish a self-hosted application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/).

**Related:** [Identity providers](https://developers.cloudflare.com/cloudflare-one/integrations/identity-providers/) | [Validate Access JWTs](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/authorization-cookie/validating-json/)

## Spectrum

[Cloudflare Spectrum](https://developers.cloudflare.com/spectrum/) extends DDoS protection and traffic acceleration to non-HTTP protocols. You can route Spectrum application traffic to origins connected via Tunnel using a DNS CNAME record or Load Balancer.

Spectrum integration with Tunnel is only supported for HTTP and HTTPS applications. For the full list of limitations, refer to the [Spectrum limitations documentation](https://developers.cloudflare.com/spectrum/reference/limitations/).

## Additional integrations

[Keyless SSL](https://developers.cloudflare.com/ssl/keyless-ssl/configuration/cloudflare-tunnel/) 

Connect your key server to Cloudflare without exposing it to the internet.

[Post-quantum tunnels](https://developers.cloudflare.com/ssl/post-quantum-cryptography/pqc-and-zero-trust/) 

TLS 1.3 tunnels with post-quantum key agreement between your data centers and Cloudflare.

[Data Localization](https://developers.cloudflare.com/data-localization/compatibility/) 

Restrict tunnel connectivity to specific regions for data residency requirements.

[Cloudflare for SaaS](https://developers.cloudflare.com/reference-architecture/design-guides/extending-cloudflares-benefits-to-saas-providers-end-customers/#cloudflare-tunnel-as-fallback-origin-setup-with-regional-services) 

Use Tunnel with Cloudflare for SaaS to enhance your SaaS application origin security.

[Hyperdrive](https://developers.cloudflare.com/hyperdrive/configuration/connect-to-private-database/) 

Connect Hyperdrive to a private database through Cloudflare Tunnel.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/tunnel/integrations/#page","headline":"Integrations · Cloudflare Docs","description":"Use Cloudflare Tunnel with Cloudflare One, Workers VPC, Load Balancing, Access, Spectrum, and other Cloudflare services.","url":"https://developers.cloudflare.com/tunnel/integrations/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Integration","Private networks"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/tunnel/","name":"Cloudflare Tunnel"}},{"@type":"ListItem","position":3,"item":{"@id":"/tunnel/integrations/","name":"Integrations"}}]}
```
