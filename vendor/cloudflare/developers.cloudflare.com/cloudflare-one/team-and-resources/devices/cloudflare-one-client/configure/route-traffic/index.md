---
title: Route traffic
description: How Route traffic works in Zero Trust.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Route traffic

When the Cloudflare One Client (formerly WARP) is deployed on a device, Cloudflare will process all DNS queries and network traffic by default. However, under certain circumstances, you may need to exclude specific DNS queries or network traffic from the Cloudflare One Client. For example, you may need to resolve an internal hostname with a private DNS resolver instead of Cloudflare's [public DNS resolver](https://developers.cloudflare.com/1.1.1.1/).

Cloudflare recommends Enterprise users configure [Gateway resolver policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/) to resolve traffic with custom resolvers. The Cloudflare One Client will send private DNS queries to Gateway, then Gateway will send the queries to custom resolvers based on matching policies.

Additionally, there are three options you can configure to exclude traffic from the Cloudflare One Client:

* [Local Domain Fallback](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/): Send DNS requests for specific domains to a resolver other than Cloudflare Gateway. Use this when you have private hostnames that do not resolve on the public Internet (for example, internal corporate domains).  
Warning  
Gateway will not encrypt, monitor, or apply DNS policies to DNS queries to domain names entered in Local Domain Fallback.
* [Split Tunnels](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/) Exclude mode: Exclude specific IP addresses or domains from the WARP tunnel. Excluded traffic bypasses the Cloudflare One Client and is handled by the local machine. Use this mode when you want most traffic to go through Gateway, but need to exclude certain routes for app compatibility or to run alongside a [third-party VPN](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/vpn/).
* [Split Tunnels](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/) Include mode: Only route traffic to specific IP addresses or domains through the WARP tunnel. All other traffic bypasses the Cloudflare One Client. Use this mode when you only want specific traffic processed by Gateway, such as traffic to resources behind [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/).  
Warning  
Gateway will not encrypt, manage, or monitor traffic excluded from the Cloudflare One Client by a Split Tunnel configuration.

## How the Cloudflare One Client handles DNS requests

When you use the Cloudflare One Client together with `cloudflared` Tunnels or third-party VPNs, Cloudflare evaluates each request and routes it according to the following traffic flow:

flowchart TD
    %% Accessibility
    accTitle: How the Cloudflare One Client handles DNS requests
    accDescr: Flowchart describing how the Cloudflare One Client routes DNS queries when using Local Domain Fallback, Split Tunnels, and Gateway resolver policies.

    A(["User requests resource"]) --> B["Cloudflare One Client proxies all DNS traffic"]
    B --> LDFCHK{"Cloudflare One Client checks if domain is listed in Local Domain Fallback policies"}

    %% Left branch (LDF exists)
    LDFCHK -- Domain exists in Local Domain Fallback policies --> C["Local Domain Fallback"]
    C --> ST["Split Tunnel processing"]

    ST --> STCHK{"Resolver IP included in WARP Tunnel per Split Tunnel configuration"}
    STCHK -- Resolver IP included in WARP Tunnel per Split Tunnel configuration --> QW["Query sent via WARP Tunnel to be resolved"]
    STCHK -- Resolver IP not included in WARP Tunnel per Split Tunnel configuration --> QO(["Query sent to resolver IP outside WARP Tunnel"])

    %% Gateway evaluation after query via WARP
    QW --> GWALLOW{"Allowed by Gateway"}
    GWALLOW -- Allowed by Gateway --> OR["Evaluated by Cloudflare on-ramp routes"]
    GWALLOW -- Blocked by Gateway Network or HTTP Policy --> BLK(["Traffic blocked by Cloudflare"])

    OR --> ORCHK{"Onramp routes include resolver IP"}
    ORCHK -- Onramp routes do not include resolver IP --> GP(["Gateway proxies query to resolver IP via normal Cloudflare One Client egress route"])
    ORCHK -- Onramp routes include resolver IP --> ADV["Cloudflare onramps advertise route that includes Resolver IP"]
    ADV --> PR(["Private resolver returns IP address to Cloudflare One Client"])

    %% Right branch (no LDF match)
    LDFCHK -- Domain does not exist in Local Domain Fallback policies --> GWR{"Gateway checks Resolver Policies (Enterprise only)"}

    GWR -- Resolver policy is not matched --> C1111a(["1.1.1.1"])

    GWR -- Resolver policy is matched --> MATCH(("Resolver policy directs query to one of the following"))
    MATCH --> IDNS(["Internal DNS"])
    MATCH --> C1111b(["1.1.1.1"])
    MATCH --> CUST(["Custom resolver"])
    CUST --> PNS(["Private network services<br>(Cloudflare Tunnel, Cloudflare WAN, Cloudflare Mesh)"])

#### Terms mentioned

##### On-ramps (how traffic gets onto Cloudflare)

* On-ramp: Learn more about[On-ramps](https://developers.cloudflare.com/learning-paths/secure-internet-traffic/connect-devices-networks/choose-on-ramp/).
* [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/)
* [Cloudflare Mesh](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/)
* [Cloudflare WAN](https://developers.cloudflare.com/cloudflare-wan/)

##### Routing features (how queries are handled)

* [Local Domain Fallback](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/local-domains/)
* [Split Tunnels](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/)
* [Gateway Resolver Policies](https://developers.cloudflare.com/cloudflare-one/traffic-policies/resolver-policies/)

#### Resolvers (where queries are resolved)

* [Internal DNS](https://developers.cloudflare.com/dns/internal-dns/)
* [1.1.1.1](https://developers.cloudflare.com/1.1.1.1/)

## Add a DNS suffix

To deploy a DNS suffix search list to all devices on a [device profile](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/), configure [DNS search suffixes](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/settings/#dns-search-suffixes) in your Cloudflare One Client settings.

For older client versions, you can manually configure DNS suffixes at the device level using the following instructions.

### macOS

To manually configure a DNS suffix on macOS:

1. Open **System Settings** (or **System Preferences** on older macOS versions).
2. Go to **Network** and select your active connection (**Wi-Fi** or **Ethernet**).
3. Select **Details** (or **Advanced**).
4. Go to the **DNS** tab.
5. Under **Search Domains**, select the `+` button and add your DNS suffix.
6. Select **OK**, then **Apply**.

### Windows

To manually configure a DNS suffix on Windows:

1. Open the **Search** bar in Windows, type **View network connections**, and select **Open**.
2. Right-click the network adapter (**Wi-Fi** or **Ethernet**) you want to modify and select **Properties**. (Admin privileges required.)
3. Double-click **Internet Protocol Version 4 (TCP/IPv4)**.
4. In the **Internet Protocol (TCP/IP) Properties** window, select **Advanced**.
5. Go to the **DNS** tab.
6. Select **Append these DNS suffixes (in order)**.
7. Select **Add**, enter your DNS suffix and select **Add**.
8. Select **OK** on all windows to apply changes.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/#page","headline":"Route traffic · Cloudflare One docs","description":"How Route traffic works in Zero Trust.","url":"https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-27","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["DNS"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/team-and-resources/","name":"Team and resources"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/team-and-resources/devices/","name":"Devices"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/","name":"Cloudflare One Client"}},{"@type":"ListItem","position":6,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/","name":"Configure the Cloudflare One Client"}},{"@type":"ListItem","position":7,"item":{"@id":"/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/","name":"Route traffic"}}]}
```
