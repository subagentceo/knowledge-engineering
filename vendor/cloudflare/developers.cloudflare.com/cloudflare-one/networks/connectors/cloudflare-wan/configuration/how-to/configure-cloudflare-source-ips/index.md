---
title: Configure Cloudflare source IPs (beta)
description: Configure the Cloudflare source IP range used when you receive traffic from Cloudflare services sent to your Cloudflare One private networks.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Configure Cloudflare source IPs (beta)

You can configure the source IP address range used by Cloudflare whenever a Cloudflare service, such as Cloudflare Load Balancing, sends traffic to a Cloudflare One private network. This address range is referred to as the Cloudflare Source IP Prefix (or `cloudflare_source` subnet type in the API).

* IPv4 traffic is sourced from `100.64.0.0/12`. This range is configurable.
* IPv6 traffic is sourced from `2606:4700:cf1:5000::/64`. This range is not configurable.

When Cloudflare services send traffic to your private network, the source IP address determines how return traffic is routed. It also determines whether on-premises security devices can properly inspect the traffic. In legacy routing mode, traffic to private networks is sourced from public Cloudflare IPs, which can cause routing and security issues.

For customers using [Unified Routing (beta)](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/reference/traffic-steering/#unified-routing-mode-beta), traffic to private networks is sourced from a dedicated, non-internet-routable private IPv4 range by default. This ensures:

* **Symmetric routing** — Return traffic stays on your private network connection instead of taking an asymmetric path over the public Internet.
* **Firewall state preservation** — On-premises stateful firewalls can track connections end-to-end because they see both request and response traffic.
* **Security and compliance** — Private traffic stays on secure private paths.

Customers may wish to change the default allocated range to avoid IP conflicts or fit with an existing IP Address Management plan.

You must configure routes in your network so that response traffic for these source ranges is sent back to Cloudflare over your Cloudflare One connections.

## Prerequisites

Before you begin, ensure that:

* You have Cloudflare One [Unified Routing (beta)](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/reference/traffic-steering/#unified-routing-mode-beta). If your account is not yet on Unified Routing, contact your account team to discuss migration and availability.
* You have [Cloudflare One Networks Write](https://developers.cloudflare.com/fundamentals/api/reference/permissions/) permission.
* Your desired new network range meets the following requirements:  
   * Your network must be defined as a single CIDR with a prefix length of `/12`.  
   * Cloudflare One subnets in the same account cannot overlap. Default allocations include:  
         * Cloudflare Source IPs (`100.64.0.0/12`)  
         * Hostname Route Token IPs (`100.80.0.0/16`)  
         * Cloudflare One Clients (`100.96.0.0/12`)  
         * Private Load Balancers (`100.112.0.0/16`)  
   * The source subnet cannot match or contain any existing route in your Cloudflare One routing table. The source subnet can be within a supernet route.

## Affected connectors and services

### Connectors

Cloudflare One supports multiple [connectivity options](https://developers.cloudflare.com/cloudflare-one/networks/connectivity-options/). The following connectors will receive traffic from the `cloudflare_source` subnet when a Cloudflare service initiates a request to the connected network or endpoint as an offramp:

* **Anycast tunnels:** GRE, IPsec, and CNI
* **Software connectors:** Cloudflare One Client and Cloudflare Mesh

Networks or endpoints connected via Cloudflare Tunnel will not receive traffic from the Cloudflare source IP subnet. Instead, the source IP address will be that of the host running the `cloudflared` software.

### Services that originate or proxy connections

All Cloudflare services that originate or proxy connections will send traffic from a Cloudflare source IP.

This includes traffic that is proxied from a private network or endpoint onramp.

For example, traffic onramped from a Cloudflare One Client through Cloudflare Load Balancer or Gateway DNS Resolver will present a Cloudflare source IP to the destination offramp.

## Configure source IPs

Note

You need Unified Routing (beta) to configure source IPs. If your account is not yet migrated, contact your account team to discuss migration and availability.

* [ Dashboard ](#tab-panel-7370)
* [ API ](#tab-panel-7371)

1. Go to the **Address space** page.  
[ Go to **Address space** ](https://dash.cloudflare.com/?to=/:account/ip-addresses/address-space)
2. Select the **Custom IPs** tab.
3. Find the prefix you want to update. This is your new `/12` range.
4. Select the three dots to the right of the prefix > **Edit**.
5. Enter a new prefix in the **IP address** field.
6. Select **Save**.

To set up your source IPs, send a `PATCH` request to the [Update Cloudflare Source Subnet endpoint](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/networks/subresources/subnets/subresources/cloudflare%5Fsource/) with your desired network range. The payload must include the network (your new `/12` range), and may include a name and comment.

Example:

Required API token permissions

At least one of the following [token permissions](https://developers.cloudflare.com/fundamentals/api/reference/permissions/)is required:
* `Cloudflare One Networks Write`

Update Cloudflare Source Subnet

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/zerotrust/subnets/cloudflare_source/$ADDRESS_FAMILY" \

  --request PATCH \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "comment": "example_comment",

    "name": "IPv4 Cloudflare Source IPs",

    "network": "100.64.0.0/12"

  }'


```

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/how-to/configure-cloudflare-source-ips/#page","headline":"Configure Cloudflare source IPs (beta) · Cloudflare One docs","description":"Configure the Cloudflare source IP range used when you receive traffic from Cloudflare services sent to your Cloudflare One private networks.","url":"https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-wan/configuration/how-to/configure-cloudflare-source-ips/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-21","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/networks/","name":"Networks"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/networks/connectors/","name":"Connectors"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/","name":"Cloudflare WAN"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/","name":"Configuration"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/how-to/","name":"How to"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-one/networks/connectors/cloudflare-wan/configuration/how-to/configure-cloudflare-source-ips/","name":"Configure Cloudflare source IPs (beta)"}}]}
```
