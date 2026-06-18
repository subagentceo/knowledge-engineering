---
title: Post-quantum cryptography in Cloudflare One
description: Use post-quantum cryptography with Cloudflare One on-ramps and off-ramps.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/ssl/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Post-quantum cryptography in Cloudflare One

[Cloudflare One](https://developers.cloudflare.com/cloudflare-one/) replaces legacy corporate security perimeters with Cloudflare's global network, making access to the Internet and to corporate resources faster and safer for teams around the world.

Organizations can obtain end-to-end post-quantum encryption of their private network traffic by sending it over Cloudflare One's post-quantum on-ramps and off-ramps. This protects traffic against [harvest-now, decrypt-later ↗](https://en.wikipedia.org/wiki/Harvest%5Fnow,%5Fdecrypt%5Flater) attacks even if the individual applications are not yet upgraded to post-quantum encryption.

Post-quantum encryption is offered in all major Cloudflare One network configurations, including the following on-ramps:

* Agentless [browser access to Cloudflare-proxied applications](#agentless-cloudflare-access) (including self-hosted apps behind Cloudflare Access)
* Agentless [browser on-ramp to Cloudflare Gateway](#secure-web-gateway) via [proxy endpoints](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/)
* [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) (on the end-user device)
* [Cloudflare IPsec](https://developers.cloudflare.com/cloudflare-wan/reference/gre-ipsec-tunnels/) on-ramp

And off-ramps:

* [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) off-ramp (using `cloudflared`)
* Cloudflare IPsec off-ramp

For traffic that egresses to the public Internet, [Cloudflare Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/) also provides post-quantum encryption as a Secure Web Gateway (SWG).

These on-ramps and off-ramps all use [hybrid post-quantum key agreement](https://developers.cloudflare.com/ssl/post-quantum-cryptography/#hybrid-key-agreement).

![Overview diagram of post-quantum Cloudflare One network configurations showing on-ramps and off-ramps](https://developers.cloudflare.com/_astro/pqc-cloudflare-one-overview.CrgyHBvK_1Roi0u.webp) 

The sample configurations below illustrate how Cloudflare One's post-quantum on-ramps and off-ramps fit together for several common use cases. For the broader status of post-quantum support across all Cloudflare products and connections, refer to [PQC in Cloudflare products](https://developers.cloudflare.com/ssl/post-quantum-cryptography/pqc-cloudflare-products/).

## Browser to self-hosted application

A common configuration is browser access to a [self-hosted application](https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/self-hosted-public-app/) that is exposed to Cloudflare's network via a [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/). This is often combined with [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/access-controls/policies/) for identity-based policy enforcement; refer to the [agentless access learning path](https://developers.cloudflare.com/learning-paths/clientless-access/initial-setup/) for guidance.

Even if the application itself has not yet migrated to post-quantum cryptography, traffic to it will be protected against harvest-now, decrypt-later attacks.

![Diagram of how post-quantum cryptography works for browser-based access to a self-hosted application via Cloudflare Tunnel](https://developers.cloudflare.com/_astro/pqc-clientless-access.DXk-bG1f_V78if.webp) 

Here is how it works today:

**1\. Connection via browser**

As long as the end user uses a [modern web browser that supports post-quantum key agreement](https://developers.cloudflare.com/ssl/post-quantum-cryptography/pqc-support/#browsers), the connection from the device to Cloudflare's network is secured via TLS 1.3 with post-quantum key agreement.

**2\. Within Cloudflare's global network**

If the user and origin server are geographically distant, then the user's traffic will enter Cloudflare's global network in one geographic location (such as Frankfurt), and exit at another (such as San Francisco). As this traffic moves from one data center to another inside Cloudflare's global network, these hops through the network are secured via TLS 1.3 with post-quantum key agreement.

**3\. Cloudflare Tunnel**

Customers establish a [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) from their data center or public cloud — where their corporate web application is hosted — to Cloudflare's network. This tunnel is secured using TLS 1.3 with post-quantum key agreement.

This configuration provides end-to-end post-quantum protection for browser access to corporate HTTPS applications without requiring customers to upgrade the security of the applications themselves.

## Cloudflare One Client

[Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) (formerly WARP) tunnels traffic from the end-user device to Cloudflare's global network. The following is an example network configuration with a Cloudflare One Client on-ramp and a Cloudflare Tunnel off-ramp.

![Diagram of post-quantum network configuration using Cloudflare One Client on-ramp and Cloudflare Tunnel off-ramp](https://developers.cloudflare.com/_astro/pqc-cloudflare-one-client.pe3Q9Nr9_24LYKc.webp) 

_Note: Labels in this image may reflect a previous product name._

**1\. Connection via Cloudflare One Client**

The Cloudflare One Client uses the MASQUE protocol to connect from the device to Cloudflare's global network, using TLS 1.3 with hybrid ML-KEM.

**2\. Within Cloudflare's global network**

The traffic then travels across Cloudflare's global network over TLS 1.3 with hybrid ML-KEM.

**3\. Cloudflare Tunnel**

[Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/) supports post-quantum key agreement.

With this network configuration, traffic is encapsulated in tunnels protected with post-quantum encryption without requiring individual upgrades of networks or applications. This provides comprehensive protection for any protocol that can be sent through these tunnels, not just for HTTPS.

## Cloudflare IPsec

The following is a sample network configuration that uses the Cloudflare One Client on-ramp to connect an end-user device to a server behind a [Cloudflare One Appliance](https://developers.cloudflare.com/cloudflare-wan/configuration/appliance/) off-ramp. Traffic to the server is protected by post-quantum cryptography as it travels over the public Internet, even if the server itself does not support post-quantum cryptography.

![Diagram of post-quantum network configuration using Cloudflare One Client on-ramp to Cloudflare One Appliance off-ramp](https://developers.cloudflare.com/_astro/pqc-cloudflare-ipsec.5IiyHdoZ_Z94W71.webp) 

**1\. Connection via Cloudflare One Client**

The Cloudflare One Client uses the MASQUE protocol, as described in the [Cloudflare One Client](#cloudflare-one-client) section above.

**2\. Within Cloudflare's global network**

The traffic then travels across Cloudflare's global network over TLS 1.3 with hybrid ML-KEM.

**3\. Cloudflare IPsec with Cloudflare One Appliance**

Traffic leaves the Cloudflare network over a post-quantum Cloudflare IPsec link that is terminated at a Cloudflare One Appliance. The Cloudflare One Appliance uses a non-IKE keying protocol built into the control plane, secured with TLS, that establishes the keys used to encrypt dataplane traffic in the IPsec ESP protocol. From Appliance version 2026.2.0, the control plane establishes keys over TLS 1.3 protected with hybrid ML-KEM.

## Cloudflare IPsec with third-party devices

[Cloudflare IPsec](https://developers.cloudflare.com/cloudflare-wan/reference/gre-ipsec-tunnels/) also supports post-quantum key agreement with compatible third-party network devices using standard IKEv2\. This extends post-quantum protection to organizations that connect their own routers and firewalls to Cloudflare's global network instead of using the Cloudflare One Appliance.

The hybrid key agreement is negotiated using ML-KEM as an additional Key Exchange to classical Diffie-Hellman during the IKEv2 handshake, as defined in [RFC 9370 ↗](https://datatracker.ietf.org/doc/rfc9370/) and [draft-ietf-ipsecme-ikev2-mlkem ↗](https://datatracker.ietf.org/doc/draft-ietf-ipsecme-ikev2-mlkem/). For the list of validated third-party platforms and their supported parameters, refer to [Tested third-party vendor interoperability](https://developers.cloudflare.com/cloudflare-wan/reference/gre-ipsec-tunnels/#tested-third-party-vendor-interoperability).

## Secure Web Gateway

A [secure web gateway (SWG) ↗](https://www.cloudflare.com/learning/access-management/what-is-a-secure-web-gateway/) is used to secure access to third-party websites on the public Internet by intercepting and inspecting TLS traffic.

[Cloudflare Gateway](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/) [supports post-quantum cryptography for HTTPS traffic](https://developers.cloudflare.com/cloudflare-one/traffic-policies/http-policies/tls-decryption/#post-quantum-support). As long as the third-party website that is being inspected supports post-quantum key agreement, Cloudflare's SWG also supports post-quantum key agreement.

![Diagram of how post-quantum cryptography works with Cloudflare's Secure Web Gateway](https://developers.cloudflare.com/_astro/pqc-secure-web-gateway.Br-ATUfe_146I1p.webp) 

Cloudflare Gateway's HTTPS filtering feature involves two post-quantum TLS connections, as follows:

**1\. Connection from the client to Gateway**

A [modern web browser that supports post-quantum key agreement](https://developers.cloudflare.com/ssl/post-quantum-cryptography/pqc-support/#browsers) connects to Gateway via the [Agentless via proxy endpoints](https://developers.cloudflare.com/ssl/post-quantum-cryptography/pqc-cloudflare-products/#agentless-via-proxy-endpoints) on-ramp. The connection is secured by TLS 1.3 with post-quantum key agreement.

The [Cloudflare One Client](#cloudflare-one-client) and [Cloudflare IPsec](#cloudflare-ipsec) on-ramps described in the sections above can also route traffic to Gateway with post-quantum protection.

**2\. Connection from Gateway to the origin server**

A TLS connection is initiated from a data center in Cloudflare's network to the origin server, which is typically controlled by a third party. The connection from Cloudflare's SWG supports post-quantum key agreement, as long as the third-party origin server also supports post-quantum key agreement. You can test this out by using [https://pq.cloudflareresearch.com/ ↗](https://pq.cloudflareresearch.com/) as your third-party origin server.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/ssl/post-quantum-cryptography/pqc-and-zero-trust/#page","headline":"Post-quantum cryptography in Cloudflare One · Cloudflare SSL/TLS docs","description":"Use post-quantum cryptography with Cloudflare One on-ramps and off-ramps.","url":"https://developers.cloudflare.com/ssl/post-quantum-cryptography/pqc-and-zero-trust/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-15","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Post-quantum"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/ssl/","name":"SSL/TLS"}},{"@type":"ListItem","position":3,"item":{"@id":"/ssl/post-quantum-cryptography/","name":"Post-quantum cryptography (PQC)"}},{"@type":"ListItem","position":4,"item":{"@id":"/ssl/post-quantum-cryptography/pqc-and-zero-trust/","name":"Post-quantum cryptography in Cloudflare One"}}]}
```
