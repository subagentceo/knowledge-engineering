---
title: Set up a private origin via Cloudflare WAN
description: Proxy public hostnames to private origins through a Cloudflare WAN IPsec tunnel.
image: https://developers.cloudflare.com/core-services-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/dns/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Set up a private origin via Cloudflare WAN

This guide walks you through proxying public hostnames to origins on a private network. The private network is reachable through a [Cloudflare WAN](https://developers.cloudflare.com/cloudflare-wan/) (formerly Magic WAN) IPsec tunnel. The CDN, WAF, Cache, and other proxied features apply to this traffic the same way they apply to traffic destined for public origins.

Closed beta

This feature is in closed beta. To request access, contact your Cloudflare account team.

## Before you begin

Confirm the following before you start:

* **Active Cloudflare WAN subscription**: This capability requires a Cloudflare WAN subscription on your account.
* **Access to private origins enabled on your account**: This is a separate entitlement from standard authoritative DNS access. Contact your Cloudflare account team to request access.
* **IPsec tunnels configured**: Set up two anycast IPsec tunnels for redundancy, each with a different Cloudflare anycast endpoint. Refer to [Configure tunnel endpoints](https://developers.cloudflare.com/cloudflare-wan/configuration/how-to/configure-tunnel-endpoints/). Two settings are important for this use case:  
   * Leave **Automatic return routing** disabled. It does not apply to the public-to-private origin traffic pattern, where requests originate on the Internet and reach your origin through Cloudflare's reverse proxy.  
   * Keep the default **Health check** settings (type `reply`, direction `bidirectional`, rate `mid`). These defaults are required for tunnel health to track correctly in this use case.
* **Static routes configured**: Add two static routes for the private prefix you want to reach — one per tunnel — with different priorities so traffic fails over to the backup tunnel if the primary goes down. For example, set priority `100` on the route through your primary tunnel and `101` on the route through your backup tunnel (lower numbers are higher priority). Refer to [Configure routes](https://developers.cloudflare.com/cloudflare-wan/configuration/how-to/configure-routes/).
* **Cloudflare Source IP set to a private range**: The Cloudflare Source IP is the IP that Cloudflare uses when sending proxied requests into your private network. If it is left as a public range, your network cannot route the return traffic back through the tunnel and requests time out. Refer to [Configure Cloudflare source IPs](https://developers.cloudflare.com/cloudflare-wan/configuration/how-to/configure-cloudflare-source-ips/).

## 1\. Verify your Cloudflare Source IP allocation

A misconfigured Cloudflare Source IP is the most common cause of failure. If the Source IP is left as a public range, the network where your origin lives has no return route and requests time out before reaching the application.

Go to [Configure Cloudflare source IPs](https://developers.cloudflare.com/cloudflare-wan/configuration/how-to/configure-cloudflare-source-ips/) and verify that the Source IP is set to a private range, such as `100.64.0.0/12` (the default) or another private `/12` you have selected.

## 2\. Create a DNS record with private network routing

Create an `A` or `AAAA` record that points to the private IP address of your origin, with proxy status enabled and **Use private network routing** turned on. This tells Cloudflare to send traffic for the hostname through your Cloudflare WAN tunnel instead of over the public Internet.

For the dashboard and API steps, refer to [Private network routing](https://developers.cloudflare.com/dns/private-origins/private-network-routing/).

## 3\. Verify end-to-end connectivity

After the DNS record is in place, validate the path from the Cloudflare network through your tunnel to the origin.

### Check tunnel health

In the Cloudflare dashboard, confirm that your IPsec tunnel is healthy. Refer to [Check tunnel health on the dashboard](https://developers.cloudflare.com/cloudflare-wan/configuration/common-settings/check-tunnel-health-dashboard/).

### Send a request from an external client

From a machine outside your private network, send an HTTPS request to the proxied hostname:

Terminal window

```

curl -v https://<YOUR_DOMAIN>/


```

A successful response confirms that Cloudflare accepted the request, applied your proxied features, and reached the origin through the tunnel.

### Confirm traffic on the origin

On the origin VM, verify that requests are arriving from the Cloudflare Source IP range. For example, to watch for incoming traffic from `100.64.0.0/12` on port `443`:

Terminal window

```

sudo tcpdump -n -i any 'src net 100.64.0.0/12 and dst port 443'


```

Replace `100.64.0.0/12` with the Source IP range configured for your account, and adjust the port to match the listener on your origin.

## Common pitfalls

| Symptom                                             | Cause and fix                                                                                                                                                                        |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Connection timeouts from clients                    | Cloudflare Source IP is set to a public range. Set it to a private /12.                                                                                                              |
| Request times out, no response on the origin        | The network where your origin lives has no return route for the Cloudflare Source IP range. Add a route that sends that range back through the tunnel.                               |
| Tunnel shows IKE established but health checks fail | ICMP is blocked on the path or the health check is misconfigured. Allow ICMP between the tunnel endpoints and confirm the health check direction is bidirectional and type is reply. |
| Traffic tries to route over the public Internet     | The **Use private network routing** toggle is not turned on for the DNS record. Edit the record and turn the toggle on.                                                              |

## Next steps

* [Configure tunnel health alerts](https://developers.cloudflare.com/cloudflare-wan/configuration/common-settings/configure-tunnel-health-alerts/) to get notified when a tunnel goes down.
* Review the [Private network routing](https://developers.cloudflare.com/dns/private-origins/private-network-routing/) reference for dashboard and API details.
* If you run into tunnel issues, refer to [Tunnel health troubleshooting](https://developers.cloudflare.com/cloudflare-wan/troubleshooting/tunnel-health/) and [IPsec troubleshooting](https://developers.cloudflare.com/cloudflare-wan/troubleshooting/ipsec-troubleshoot/).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/dns/private-origins/set-up-via-cloudflare-wan/#page","headline":"Set up a private origin via Cloudflare WAN · Cloudflare DNS docs","description":"Proxy public hostnames to private origins through a Cloudflare WAN IPsec tunnel.","url":"https://developers.cloudflare.com/dns/private-origins/set-up-via-cloudflare-wan/","inLanguage":"en","image":"https://developers.cloudflare.com/core-services-preview.png","dateModified":"2026-05-07","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Private networks"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/dns/","name":"DNS"}},{"@type":"ListItem","position":3,"item":{"@id":"/dns/private-origins/","name":"Private origins (beta)"}},{"@type":"ListItem","position":4,"item":{"@id":"/dns/private-origins/set-up-via-cloudflare-wan/","name":"Set up a private origin via Cloudflare WAN"}}]}
```
