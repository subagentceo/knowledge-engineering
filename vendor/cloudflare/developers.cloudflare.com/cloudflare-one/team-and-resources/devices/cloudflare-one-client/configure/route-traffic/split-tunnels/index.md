---
title: Split Tunnels
description: Split Tunnels in Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Split Tunnels

Split Tunnels can be configured to exclude or include IP addresses or domains from going through the Cloudflare One Client (formerly WARP). This feature is commonly used to run the Cloudflare One Client alongside a VPN (in Exclude mode) or to provide access to a specific private network (in Include mode).

Warning

Split Tunnels only impacts the flow of IP traffic. DNS requests are still resolved by Gateway and subject to DNS policies unless you add the domains to your [Local Domain Fallback](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/) configuration.

Because Split Tunnels controls what Gateway has visibility on at the network level, we recommend testing all changes before rolling out updates to end users.

## Change Split Tunnels mode

* [ Dashboard ](#tab-panel-7451)
* [ Terraform (v5) ](#tab-panel-7452)

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

* [ Dashboard ](#tab-panel-7455)
* [ Terraform (v5) ](#tab-panel-7456)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Team & Resources** \> **Devices** \> **Device profiles** \> **General profiles**.
2. Locate the [device profile](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/) you would like to modify and select **Configure**.
3. Under **Split Tunnels**, check whether your [Split Tunnels mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#change-split-tunnels-mode) is set to **Exclude** or **Include**.
4. Select **Manage**.
5. You can exclude or include routes based on either their IP address or domain. When possible we recommend adding an IP address instead of a domain. To learn about the consequences of adding a domain, refer to [Domain-based Split Tunnels](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#domain-based-split-tunnels).  
   * [ Add an IP ](#tab-panel-7453)  
   * [ Add a domain ](#tab-panel-7454)  
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

### When to use Split Tunnels

Use Split Tunnels when you need to bypass Gateway entirely for a site or allow traffic through the [firewall that the Cloudflare One Client creates](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/client-architecture/#system-firewall). Common scenarios include:

* Connect to a third-party application which requires the actual IP address of the end-user device (for example, [Microsoft 365](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#directly-route-microsoft-365-traffic)).
* Optimize voice and video.
* Connect to a [third-party VPN](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/vpn/) endpoint.

### When not to use Split Tunnels

Do not exclude a site from Split Tunnels if you want to see the traffic in your Gateway logs. In particular, we do not recommend using Split Tunnels to:

* Solve connectivity issues with a specific website. For configuration guidance, refer to our [troubleshooting guide](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/troubleshooting/common-issues/#cannot-connect-to-a-specific-app-or-website).
* Solve performance issues with a specific website. Since Cloudflare operates within 50 milliseconds of 95% of the Internet-connected population, it is usually faster to send traffic through us. If you are encountering a performance-related issue, it is best to first explore your Gateway policies or reach out to Support.

## Routes for Split Tunnels Include mode

Many Cloudflare Zero Trust services rely on traffic going through the Cloudflare One Client, such as [device posture checks](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/) and [device client session durations](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/client-sessions/). If you are using Split Tunnels in Include mode, you will need to manually add Cloudflare Zero Trust domains and IPs in order for these features to function.

### Cloudflare Zero Trust domains

If you are using Split Tunnels in Include mode, you must include the following domains:

* The IdP used to authenticate to Cloudflare Zero Trust
* `<your-team-name>.cloudflareaccess.com`
* The application protected by the Access or Gateway policy
* `edge.browser.run` if using [Browser Isolation](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/)

### Cloudflare Zero Trust IP addresses

#### Block page

If you are using Split Tunnels in Include mode and have [DNS policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/) with the [block page](https://developers.cloudflare.com/cloudflare-one/reusable-components/custom-pages/gateway-block-page/) enabled, you must include the IPs that blocked domains will resolve to. Unless you are using a [dedicated or BYOIP resolver IP](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/dns/locations/dns-resolver-ips/#dns-resolver-ip) the block page will resolve to:

* `162.159.36.12`
* `162.159.46.12`

#### Team domain

In [Traffic only mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/#traffic-only-mode), you cannot [add domains](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#cloudflare-zero-trust-domains) to Split Tunnels. If you are using Split Tunnels in Include mode, you must include the IPs that resolve to `<your-team-name>.cloudflareaccess.com` instead:

* `104.19.194.29`
* `104.19.195.29`

## Domain-based Split Tunnels

Domain-based split tunneling has a few ramifications you should be aware of before deploying in your organization:.

* Routes excluded or included from Cloudflare One Client and Gateway visibility may change day to day, and may be different for each user depending on where they are.
* You may inadvertently exclude or include additional hostnames that happen to share an IP address. This commonly occurs if you add a domain hosted by a CDN or large Internet provider such as Cloudflare, AWS, or Azure. For example, if you wanted to exclude a VPN hosted on AWS, do not add `*.amazonaws.com` as that will open up your devices to all traffic on AWS. Instead, add the specific VPN endpoint (`*.cvpn-endpoint-<UUID>.prod.clientvpn.us-west-2.amazonaws.com`).
* Most services are a collection of hostnames. Until Split Tunnels mode supports [App Types](https://developers.cloudflare.com/cloudflare-one/traffic-policies/application-app-types/), you will need to manually add all domains used by a particular app or service.
* The Cloudflare One Client must handle the DNS lookup request for the domain. If a DNS result has been previously cached by the operating system or otherwise intercepted (for example, via your browser's secure DNS settings), the IP address will not be dynamically added to your Split Tunnel.

### Valid domains

| Split tunnel domain | Matches                                                      | Does not match                                            |
| ------------------- | ------------------------------------------------------------ | --------------------------------------------------------- |
| example.com         | exact match of example.com                                   | subdomains such as www.example.com                        |
| example.example.com | exact match of example.example.com                           | example.com or subdomains such as www.example.example.com |
| \*.example.com      | subdomains such as www.example.com and sub2.sub1.example.com | example.com                                               |

### Platform differences

Domain-based Split Tunnels work differently on mobile clients than on desktop clients. If both mobile and desktop clients will connect to your organization, it is recommended to use Split Tunnels based on IP addresses or CIDR, which work the same across all platforms.

#### Windows, Linux and macOS

Clients on these platforms work by dynamically inserting the IP address of the domain immediately after it is resolved into the routing table for split tunneling. This allows the desktop clients to support wildcard domain prefixes (for example, `*.example.com`), not just a singular domain (like `example.com` or `www.example.com`).

#### iOS, Android and ChromeOS

Due to platform differences, mobile clients can only apply Split Tunnels rules when the tunnel is initially started. This means:

* Domain-based Split Tunnels rules are created when the tunnel is established based on the IP address for that domain at that time. The route is refreshed each time the tunnel is established.
* Wildcard domain prefixes (for example, `*.example.com`) are supported only if they have valid wildcard DNS records. Other wildcard domains are not supported because the client is unable to match wildcard domains to hostnames when starting up the tunnel. Unsupported wildcard domain prefixes can still exist in your configuration, but they will be ignored on mobile platforms.

## Remove a route

Warning

Removing default Split Tunnel entries may cause users to lose Internet connectivity or block their access to local resources.

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Team & Resources** \> **Devices** \> **Device profiles** \> **General profiles**.
2. Locate the [device profile](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/) you would like to modify and select **Edit**.
3. Under **Split Tunnels**, select **Manage**.
4. Find the IP address or hostname in the list and select the **Action** button. From the dropdown, select _Delete_.

It may take up to 10 minutes for newly updated settings to propagate to devices.

If you need to revert to the default Split Tunnel entries recommended by Cloudflare, select **Restore default entries**.

## Related resources

* [Local Domain Fallback](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/) \- Resolve selected domains via local DNS instead of Cloudflare Gateway.
* [Cloudflare One Client with firewall](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/firewall/) \- Learn which IPs, domains, and ports to allow so users can deploy and connect the Cloudflare One Client successfully behind a firewall.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#page","headline":"Split Tunnels · Cloudflare One docs","description":"Split Tunnels in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-01","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["Private networks","DNS"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/team-and-resources/","name":"Team and resources"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/team-and-resources/devices/","name":"Devices"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/","name":"Cloudflare One Client"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/","name":"Configure the Cloudflare One Client"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/","name":"Route traffic"}},{"@type":"ListItem","position":8,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/","name":"Split Tunnels"}}]}
```
