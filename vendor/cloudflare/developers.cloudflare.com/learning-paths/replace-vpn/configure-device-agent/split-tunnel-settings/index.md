---
title: Define Split Tunnel settings
description: Configure split tunnel routing rules.
image: https://developers.cloudflare.com/cf-twitter-card.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/learning-paths/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Define Split Tunnel settings

Split tunnel settings determine which traffic the Cloudflare One Client does and does not proxy.

The Cloudflare One Client offers two different split tunnel modes:

* If you intend to send all internal and external destination traffic through Cloudflare's global network, opt for **Exclude IPs and domains** mode. This mode will proxy everything through the WARP tunnel with the exception of IPs and hosts defined explicitly within the Split Tunnel list.
* If you intend to only use the Cloudflare One Client to proxy private destination traffic, you can operate in **Include IPs and domains** mode, in which you explicitly define which IP ranges and domains should be included in the WARP routing table.

## Update Split Tunnels mode

To change your Split Tunnels mode:

* [ Dashboard ](#tab-panel-9124)
* [ Terraform (v5) ](#tab-panel-9125)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Team & Resources** \> **Devices** \> **Device profiles** \> **General profiles**.
2. Locate the [device profile](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/) you would like to modify and select **Configure**.
3. Scroll down to **Split Tunnels**.
4. (Optional) To view your existing Split Tunnel configuration, select **Manage**. You will see a list of the IPs and domains Cloudflare Zero Trust excludes or includes, depending on the mode you have selected. We recommend making a copy of your Split Tunnel entries, as they will revert to the default upon switching modes.
5. Under **Split Tunnels**, choose a mode:  
   * **Exclude IPs and domains** — (Default) All traffic will be sent to Cloudflare Gateway except for the IPs and domains you specify.  
   * **Include IPs and Domains** — Only traffic destined to the IPs or domains you specify will be sent to Cloudflare Gateway. All other traffic will bypass Gateway and will no longer be filtered by your network or HTTP policies. In order to use certain features, you will need to manually add [Zero Trust domains](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#cloudflare-zero-trust-domains).

1. Add the following permission to your [cloudflare\_api\_token ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/api%5Ftoken):  
   * `Zero Trust Write`
2. Choose a [cloudflare\_zero\_trust\_device\_default\_profile ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Fdevice%5Fdefault%5Fprofile) or [cloudflare\_zero\_trust\_device\_custom\_profile ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Fdevice%5Fcustom%5Fprofile) resource to modify, or [create a new device profile](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/#create-a-new-profile).
3. In your device profile, configure either the `exclude` or `include` argument. You cannot set both `exclude` and `include` in a given device profile.  
a. To manage Split Tunnel routes in **Exclude** mode, use the `exclude` argument:  
```  
resource "cloudflare_zero_trust_device_custom_profile" "exclude_example" {  
  account_id            = var.cloudflare_account_id  
  name                  = "Custom profile in Split Tunnels Exclude mode"  
  enabled               = true  
  precedence            = 101  
  service_mode_v2       = {mode = "warp"}  
  match                 =  "identity.email == \"test@cloudflare.com\""  
  exclude = [{  
      address = "10.0.0.0/8"  
      description = "Example route to exclude from WARP tunnel"  
  }]  
}  
```  
In this example, all traffic will be sent to Cloudflare Gateway except for traffic destined to `10.0.0.0/8`. To exclude the default IPs and domains recommended by Cloudflare, refer to [Add a route](#add-a-route).  
b. To manage Split Tunnel routes in **Include** mode, use the `include` argument:  
```  
resource "cloudflare_zero_trust_device_custom_profile" "include_example" {  
  account_id            = var.cloudflare_account_id  
  name                  = "Custom profile in Split Tunnels Include mode"  
  enabled               = true  
  precedence            = 101  
  service_mode_v2       = {mode = "warp"}  
  match                 =  "identity.email == \"test@cloudflare.com\""  
  include = [{  
      address = "10.0.0.0/8"  
      description = "Example route to include in WARP tunnel"  
  }]  
}  
```  
In this example, only traffic destined to `10.0.0.0/8` will be sent to Cloudflare Gateway.

All clients with this device profile will now switch to the new mode and its default route configuration. Next, [add](#add-a-route) or [remove](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#remove-a-route) routes from your Split Tunnel configuration.

## Add a route

* [ Dashboard ](#tab-panel-9130)
* [ Terraform (v5) ](#tab-panel-9131)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Team & Resources** \> **Devices** \> **Device profiles** \> **General profiles**.
2. Locate the [device profile](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/) you would like to modify and select **Configure**.
3. Under **Split Tunnels**, check whether your [Split Tunnels mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#change-split-tunnels-mode) is set to **Exclude** or **Include**.
4. Select **Manage**.
5. You can exclude or include routes based on either their IP address or domain. When possible we recommend adding an IP address instead of a domain. To learn about the consequences of adding a domain, refer to [Domain-based Split Tunnels](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#domain-based-split-tunnels).  
   * [ Add an IP ](#tab-panel-9128)  
   * [ Add a domain ](#tab-panel-9129)  
To add an IP address to Split Tunnels:  
   1. Select _IP Address_.  
   2. Enter the IP address or CIDR you want to exclude or include.  
   3. Select **Save destination**.  
Traffic to this IP address is now excluded or included from the WARP tunnel.  
Note  
If you would like to exclude a specific IP range from a larger IP range, you can use this calculator:  
**Base CIDR:** **Subtracted CIDRs:**  
Calculate  
To add a domain to Split Tunnels:  
   1. Select _Domain_.  
   2. Enter a [valid domain](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#valid-domains) to exclude or include.  
   3. Select **Save destination**.  
   4. (Optional) If your domain does not have a public DNS record, create a [Local Domain Fallback](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/) entry to allow a private DNS server to handle domain resolution.  
When a user goes to the domain, the domain gets resolved according to your Local Domain Fallback configuration (either by Gateway or by your private DNS server). Split Tunnels will then dynamically include or exclude the IP address returned in the DNS lookup.

1. Add the following permission to your [cloudflare\_api\_token ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/api%5Ftoken):  
   * `Zero Trust Write`
2. Choose a [cloudflare\_zero\_trust\_device\_default\_profile ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Fdevice%5Fdefault%5Fprofile) or [cloudflare\_zero\_trust\_device\_custom\_profile ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/zero%5Ftrust%5Fdevice%5Fcustom%5Fprofile) resource to modify, or [create a new device profile](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/#create-a-new-profile).
3. (Optional) Create a list of split tunnel routes that you can reuse across multiple device profiles. For example, you can declare a local value in the same module as your device profiles:  
split-tunnels.local.tf  
```  
locals {  
  global_exclude_list = [  
    # Default Split Tunnel entries recommended by Cloudflare  
    {  
      address     = "ff05::/16"  
    },  
    {  
      address     = "ff04::/16"  
    },  
    {  
      address     = "ff03::/16"  
    },  
    {  
      address     = "ff02::/16"  
    },  
    {  
      address     = "ff01::/16"  
    },  
    {  
      address     = "fe80::/10"  
      description = "IPv6 Link Local"  
    },  
    {  
      address     = "fd00::/8"  
    },  
    {  
      address     = "255.255.255.255/32"  
      description = "DHCP Broadcast"  
    },  
    {  
      address     = "240.0.0.0/4"  
    },  
    {  
      address     = "224.0.0.0/24"  
    },  
    {  
      address     = "192.168.0.0/16"  
    },  
    {  
      address     = "192.0.0.0/24"  
    },  
    {  
      address     = "172.16.0.0/12"  
    },  
    {  
      address     = "169.254.0.0/16"  
      description = "DHCP Unspecified"  
    },  
    {  
      address     = "100.64.0.0/10"  
    },  
    {  
      address     = "10.0.0.0/8"  
    }  
  ]  
}  
```
4. In the device profile, exclude or include routes based on either their IP address or domain:  
device-profiles.tf  
```  
resource "cloudflare_zero_trust_device_custom_profile" "example" {  
  account_id            = var.cloudflare_account_id  
  name                  = "Example custom profile with split tunnels"  
  enabled               = true  
  precedence            = 101  
  service_mode_v2       = {mode = "warp"}  
  match                 =  "identity.email == \"test@cloudflare.com\""  
  exclude = concat(  
    # Global entries  
    local.global_exclude_list,  
    # Profile-specific entries  
    [  
      {  
        address = "192.0.2.0/24"  
        description = "Example IP to exclude from WARP"  
      },  
      {  
        host = "example.com"  
        description = "Example domain to exclude from WARP"  
      }  
    ]  
  )  
}  
```  
When possible we recommend adding an IP address instead of a domain. To learn about the consequences of adding a domain, refer to [Domain-based Split Tunnels](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#domain-based-split-tunnels).

It may take up to 10 minutes for newly updated settings to propagate to devices.

We recommend keeping the Split Tunnels list short, as each entry takes time for the client to parse. In particular, domains are slower to action than IP addresses because they require on-the-fly IP lookups and routing table / local firewall changes. A shorter list will also make it easier to understand and debug your configuration. For information on device profile limits, refer to [Account limits](https://developers.cloudflare.com/cloudflare-one/account-limits/#warp).

## Configure Split Tunnels for private network access

By default, WARP excludes traffic bound for [RFC 1918 space ↗](https://datatracker.ietf.org/doc/html/rfc1918), which are IP addresses typically used in private networks and not reachable from the Internet. In order for the Cloudflare One Client to send traffic to your private network, you must configure [Split Tunnels](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/) so that the IP/CIDR of your private network routes through the Cloudflare One Client.

1. First, check whether your [Split Tunnels mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#change-split-tunnels-mode) is set to **Exclude** or **Include** mode.
2. Edit your Split Tunnel routes depending on the mode:  
   * [ Exclude IPs and domains ](#tab-panel-9126)  
   * [ Include IPs and domains ](#tab-panel-9127)  
If you are using **Exclude** mode:  
a. [Delete the route](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#remove-a-route) containing your private network's IP/CIDR range. For example, if your network uses the default AWS range of `172.31.0.0/16`, delete `172.16.0.0/12`.  
b. [Re-add IP/CIDR ranges](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#add-a-route) that are not explicitly used by your private network. For the AWS example above, you would add new entries for `172.16.0.0/13`, `172.24.0.0/14`, `172.28.0.0/15`, and `172.30.0.0/16`. This ensures that only traffic to `172.31.0.0/16` routes through the Cloudflare One Client.  
You can use the following calculator to determine which IP addresses to re-add:  
**Base CIDR:** **Subtracted CIDRs:**  
Calculate  
Calculator instructions  
   1. In **Base CIDR**, enter the RFC 1918 range that you deleted from Split Tunnels.  
   2. In **Subtracted CIDRs**, enter the IP/CIDR range used by your private network.  
   3. Re-add the calculator results to your Split Tunnel Exclude mode list.  
By tightening the private IP range included in the Cloudflare One Client, you reduce the risk of breaking a user's [access to local resources](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#allow-users-to-enable-local-network-exclusion).  
If you are using **Include** mode:  
   1. Add the required [Zero Trust domains](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#cloudflare-zero-trust-domains) or [IP addresses](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#cloudflare-zero-trust-ip-addresses) to your Split Tunnel include list.  
   2. [Add a route](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#add-a-route) to include your private network's IP/CIDR range.

```json
{"@context":"https://schema.org","@type":"WebPage","@id":"https://developers.cloudflare.com/learning-paths/replace-vpn/configure-device-agent/split-tunnel-settings/#page","headline":"Define Split Tunnel settings · Cloudflare Learning Paths","description":"Configure split tunnel routing rules.","url":"https://developers.cloudflare.com/learning-paths/replace-vpn/configure-device-agent/split-tunnel-settings/","inLanguage":"en","image":"https://developers.cloudflare.com/cf-twitter-card.png","dateModified":"2026-04-23","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"}}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/learning-paths/","name":"Learning Paths"}},{"@type":"ListItem","position":3,"item":{"@id":"/learning-paths/replace-vpn/configure-device-agent/","name":"Configure the device agent"}},{"@type":"ListItem","position":4,"item":{"@id":"/learning-paths/replace-vpn/configure-device-agent/split-tunnel-settings/","name":"Define Split Tunnel settings"}}]}
```
