---
title: Local Domain Fallback
description: Local Domain Fallback in Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Local Domain Fallback

By default, Cloudflare Zero Trust excludes common top-level domains, used for local resolution, from being sent to Gateway for processing. These top-level domains are resolved by the local DNS resolver configured for the device on its primary interface.

You can add additional domains to the Local Domain Fallback list and specify a DNS server to use in place of the Gateway resolver. The Cloudflare One Client (formerly WARP) proxies these requests directly to the configured fallback servers.

## Limitations

Local Domain Fallback only applies to devices running the Cloudflare One Client.

Because DNS requests subject to Local Domain Fallback bypass the Gateway resolver, they are not subject to Gateway DNS policies or DNS logging. If you want to route DNS queries to custom resolvers and apply Gateway filtering, use [resolver policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/). If both Local Domain Fallback and resolver policies are configured for the same device, Cloudflare will apply client-side Local Domain Fallback rules first.

Local Domain Fallback or Gateway Resolver policies?

If your DNS server can be configured to connect to a Cloudflare on-ramp, Cloudflare recommends using Gateway Resolver policies rather than Local Domain Fallback. Gateway Resolver policies provide more visibility by allowing you to log and review DNS traffic.

### AWS

Avoid configuring your [Local Domain Fallback](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/) or [Resolver Policy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/) to direct all `*.amazonaws.com` DNS resolution via AWS Route 53 Resolver.

Some AWS endpoints (such as `ssm.us-east-1.amazonaws.com`) are public AWS endpoints that are not resolvable via internal VPC resolution. This can break AWS Console features for users on the Cloudflare One Client.

Only route specific Route 53 zones, or VPC Endpoints (such as `vpce.amazonaws.com`), through the internal VPC resolver.

## Manage local domains

### View domains

To view the domains subject to Local Domain Fallback:

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Team & Resources** \> **Devices** \> **Device profiles** \> **General profiles**.
2. Locate the [device profile](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/) you would like to view or modify and select **Configure**.
3. Scroll down to **Local Domain Fallback** and select **Manage**.

On this page, you will see a list of domains excluded from Gateway. You can [add](#add-a-domain) or [remove](#delete-a-domain) domains from the list at any time.

Warning

Local Domain Fallback configuration only impacts where DNS requests get resolved, not the flow of traffic destined to those domains. If you want to prevent traffic from being sent to a specific domain or IP address, you must add those domains or IPs to your [Split Tunnel](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/) configuration.

To view the fallback domains applied to a device, you can:

* In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Team & Resources** \> **Devices** \> find the target device and the **Last active device profile** \> follow the [steps above](#view-domains).
* (Desktop only) Run `warp-cli settings` in the terminal of the target device and review the [fallback domains](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/troubleshooting-guide/#fallback-domains) section of the output.
* (Desktop only) Collect [client diagnostic logs](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/diagnostic-logs/) for the device and review the [fallback domain](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/troubleshooting-guide/#fallback-domains) section in `warp_settings.txt`.

### Add a domain

To add a domain to the Local Domain Fallback list:

* [ Dashboard ](#tab-panel-7449)
* [ Terraform (v5) ](#tab-panel-7450)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Team & Resources** \> **Devices** \> **Device profiles** \> **General profiles**.
2. Locate the [device profile](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/) you would like to view or modify and select **Configure**.
3. Scroll down to **Local Domain Fallback** and select **Manage**.
1. In **Domain**, enter the apex domain (`example.com`) that you want to resolve using your private DNS server. All prefixes under the apex domain are subject to Local Domain Fallback (in other words, `example.com` is interpreted as `*.example.com`).
2. In **DNS Servers**, enter the IP address of the DNS servers that should resolve that domain name.
3. Enter an optional description and select **Save domain**.

A Local Domain Fallback list is scoped to a specific [device profile](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/). If a device profile does not have a corresponding Local Domain Fallback resource, those devices will use the default local domains shown in Step 2.

1. Add the following permission to your [cloudflare\_api\_token ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/api%5Ftoken):  
   * `Zero Trust Write`
2. (Optional) Create a list of domains that you can reuse across multiple device profiles. For example, you can declare a local value in the same module as your device profiles:  
local-domains.local.tf  
```  
locals {  
  default_local_domains = [  
    # Default Local Domain Fallback entries recommended by Cloudflare  
    {  
  suffix = "corp"  
},  
{  
  suffix = "domain"  
},  
{  
  suffix = "home"  
},  
{  
  suffix = "home.arpa"  
},  
{  
  suffix = "host"  
},  
{  
  suffix = "internal"  
},  
{  
  suffix = "intranet"  
},  
{  
  suffix = "invalid"  
},  
{  
  suffix = "lan"  
},  
{  
  suffix = "local"  
},  
{  
  suffix = "localdomain"  
},  
{  
  suffix = "localhost"  
},  
{  
  suffix = "private"  
},  
{  
  suffix = "test"  
}  
  ]  
}  
```
3. To configure Local Domain Fallback for the default device profile, use the [cloudflare\_zero\_trust\_device\_default\_profile\_local\_domain\_fallback ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Fdevice%5Fdefault%5Fprofile%5Flocal%5Fdomain%5Ffallback) resource. To configure Local Domain Fallback for a custom device profile, use[cloudflare\_zero\_trust\_device\_custom\_profile\_local\_domain\_fallback ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Fdevice%5Fcustom%5Fprofile%5Flocal%5Fdomain%5Ffallback). For example:  
device-profiles.tf  
```  
resource "cloudflare_zero_trust_device_custom_profile_local_domain_fallback" "example" {  
  account_id = var.cloudflare_account_id  
  policy_id  = cloudflare_zero_trust_device_custom_profile.example.id  
  domains = concat(  
    # Global entries  
    local.default_local_domains,  
    # Profile-specific entries  
    [  
      {  
      suffix = "example.com"  
      description = "Domain for local development"  
      dns_server = ["1.1.1.1", "192.168.0.1"]  
      }  
    ]  
  )  
}  
```

For `suffix`, specify the apex domain (`example.com`) that you want to resolve using your private DNS server. All prefixes under the apex domain are subject to Local Domain Fallback (in other words, `example.com` is interpreted as `*.example.com`). For `dns_server`, enter the IP address of the DNS servers that should resolve that domain name.

The Cloudflare One Client tries all servers and always uses the fastest response, even if that response is `no records found`. We recommend specifying at least one DNS server for each domain. If a value is not specified, the Cloudflare One Client will try to identify the DNS server (or servers) used on the device before it started, and use that server for each domain in the Local Domain Fallback list.

### Route traffic to fallback server

The Cloudflare One Client routes DNS traffic to your [Local Domain Fallback server](#add-a-domain) according to your [Split Tunnel configuration](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/). To ensure that queries can reach your private DNS server:

* If your DNS server is only reachable inside of the WARP tunnel (for example, via `cloudflared` or Cloudflare WAN):  
   1. Go to **Networks** \> **Routes** and verify that the DNS server is connected to Cloudflare. To connect a DNS server, refer to [Private networks](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/).  
   2. In your [Split Tunnel configuration](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/), verify that the DNS server IP routes through the WARP tunnel.
* If your DNS server is only reachable outside of the WARP tunnel (for example, via a third-party VPN), verify that the DNS server IP is [excluded from the WARP tunnel](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/).

For more information, refer to [How the Cloudflare One Client handles DNS requests](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/#how-the-warp-client-handles-dns-requests).

### Delete a domain

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Team & Resources** \> **Devices** \> **Device profiles** \> **General profiles**.
2. Locate the [device profile](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/) you would like to view or modify and select **Configure**.
3. Scroll down to **Local Domain Fallback** and select **Manage**.
1. Find the domain in the list and select **Delete**.

The domain will no longer be excluded from Gateway DNS policies, effective immediately.

## Reverse DNS lookups for internal IPs

By default, Warp sends [reverse DNS queries ↗](https://www.cloudflare.com/learning/dns/glossary/reverse-dns/) to public DNS servers. To lookup the domain name associated with an internal IP address, [add a local domain fallback entry](#add-a-domain) for `in-addr.arpa` (IPv4) and/or `ip6.arpa` (IPv6) that points to your internal DNS server IP. `in-addr.arpa` and `ip6.arpa` are top-level domains [reserved ↗](https://www.iana.org/domains/arpa) for reverse DNS queries. By adding a local domain fallback entry for these domains, all reverse DNS queries (such as `dig -x 1.1.1.1`) will now resolve through your local DNS server.

## Related resources

* [Split Tunnels](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/) \- Control which traffic goes through the Cloudflare One Client by including or excluding specific IPs or domains.
* [Cloudflare One Client with firewall](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/firewall/) \- Learn which IPs, domains, and ports to allow so users can deploy and connect the Cloudflare One Client successfully behind a firewall.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#page","headline":"Local Domain Fallback · Cloudflare One docs","description":"Local Domain Fallback in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["DNS"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/team-and-resources/","name":"Team and resources"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/team-and-resources/devices/","name":"Devices"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/","name":"Cloudflare One Client"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/","name":"Configure the Cloudflare One Client"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/","name":"Route traffic"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/","name":"Local Domain Fallback"}}]}
```
