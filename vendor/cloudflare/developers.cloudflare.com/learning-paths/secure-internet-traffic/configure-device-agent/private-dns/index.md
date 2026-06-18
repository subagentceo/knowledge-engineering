---
title: Resolve private DNS
description: Set up private DNS resolution.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Resolve private DNS

By default, all DNS requests on the user device are resolved by Cloudflare's [public DNS resolver](https://developers.cloudflare.com/1.1.1.1/) except for common top level domains used for local resolution (such as `localhost`). To allow users to connect to internal server names or domains that do not resolve on the public Internet, you have two options:

* [Add internal domains to Local Domain Fallback](#local-domain-fallback)
* [Build custom resolver policies](#resolver-policies)

## Local Domain Fallback

Local Domain Fallback tells the Cloudflare One Client to send specific DNS requests to your private DNS resolver instead of to Cloudflare's public DNS resolver. This method was the primary delivery mechanism for private DNS for a long time, and is the simplest option, but it has two shortcomings: you cannot deterministically route private DNS queries to different resolvers based on specific attributes, and you cannot apply Gateway DNS policies to this traffic because Cloudflare is not resolving it.

To learn more about how Local Domain Fallback works, refer to [How the Cloudflare One Client handles DNS requests](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/#how-the-warp-client-handles-dns-requests).

### Add a domain

To add a domain to the Local Domain Fallback list:

* [ Dashboard ](#tab-panel-9275)
* [ Terraform (v5) ](#tab-panel-9276)

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

## Resolver policies

Note

Only available on Enterprise plans.

[Resolver policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/) provide similar functionality to Local Domain Fallback but occur in Cloudflare Gateway rather than on the local device. This option is recommended if you want more granular control over private DNS resolution. For example, you can ensure that all users in a specific geography use the private DNS server closest to them, ensure that specific conditions are met before resolving private DNS traffic, and apply [Gateway DNS policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/) to private DNS traffic.

### Create a resolver policy

Virtual network limitation

Resolver policies do not automatically update when you change the virtual networks associated with a route. If you move a route from one virtual network to another, the resolver policy will still reference the old virtual network. You will need to manually remove and recreate the resolver policy to update the route.

To create a resolver policy:

* [ Dashboard ](#tab-panel-9273)
* [ Terraform (v5) ](#tab-panel-9274)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Traffic policies** \> **Resolver policies**.
2. Select **Add a policy**.
3. Create an expression for your desired traffic. For example, you can resolve a hostname for an internal service:  
| Selector | Operator | Value                |  
| -------- | -------- | -------------------- |  
| Host     | in       | internal.example.com |  
Make sure your destination is not subject to [Local Domain Fallback](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/#manage-local-domains).
4. In **Select DNS resolver**, choose _Configure custom DNS resolvers_.
5. Enter the IP addresses of your custom DNS resolver. As you enter an IP address, Gateway will search through your [virtual networks](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/tunnel-virtual-networks/) configured in Zero Trust.
6. In **Network**, choose whether to route queries publicly (to the Internet) or privately (to a private network service).
7. (Optional) Enter a custom port for each IP address.
8. Select **Create policy**.

Custom resolvers are saved to your account for future use. You can add up to 10 IPv4 and 10 IPv6 addresses to a policy.

1. Add the following permission to your [cloudflare\_api\_token ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/api%5Ftoken):  
   * `Zero Trust Write`
2. Create a resolver policy using the [cloudflare\_zero\_trust\_gateway\_policy ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Fgateway%5Fpolicy) resource:  
```  
resource "cloudflare_zero_trust_gateway_policy" "resolver_policy" {  
  name        = "Example resolver policy"  
  enabled     = true  
  account_id  = var.cloudflare_account_id  
  description = "TERRAFORM MANAGED resolver policy"  
  action      = "resolve"  
  traffic     = "dns.fqdn in {\"internal.example.com\"}"  
  identity    = "identity.email in {\"jdoe@example.com\"}"  
  precedence  = 1  
  rule_settings = {  
      dns_resolvers = {  
      # You can add up to 10 IPv4 and 10 IPv6 addresses to a policy.  
        ipv4 = [{  
          ip = "192.0.2.24"  
          port = 53  
          route_through_private_network = true  
          vnet_id = cloudflare_zero_trust_tunnel_cloudflared_virtual_network.staging_vnet.id  
        }]  
        ipv6 = [{  
          ip = "2001:DB8::"  
          port = 53  
          route_through_private_network = true  
          vnet_id = cloudflare_zero_trust_tunnel_cloudflared_virtual_network.staging_vnet.id  
        }]  
      }  
  }  
}  
```

When a user's query matches a resolver policy, Gateway will send the query to your listed resolvers in the following order:

1. Public resolvers
2. Private resolvers behind the default virtual network for your account
3. Private resolvers behind a custom virtual network

Gateway will cache the fastest resolver for use in subsequent queries. Resolver priority is cached on a per user basis for each data center.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/configure-device-agent/private-dns/#page","headline":"Resolve private DNS · Cloudflare Learning Paths","description":"Set up private DNS resolution.","url":"https://developers.cloudflare.com/learning-paths/secure-internet-traffic/configure-device-agent/private-dns/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/secure-internet-traffic/configure-device-agent/","name":"Configure the device agent"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/secure-internet-traffic/configure-device-agent/private-dns/","name":"Resolve private DNS"}}]}
```
