---
title: Host selectors
description: Configure Host selectors in Gateway.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Host selectors

Feature availability

| [Client modes](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/modes/) | [Zero Trust plans ↗](https://www.cloudflare.com/teams-pricing/) |
| ---------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Traffic and DNS mode                                                                                                               | Enterprise                                                      |

| System   | Availability | Minimum client version |
| -------- | ------------ | ---------------------- |
| Windows  | ✅            | 2025.4.929.0           |
| macOS    | ✅            | 2025.4.929.0           |
| Linux    | ✅            | 2025.4.929.0           |
| iOS      | ✅            | 1.11                   |
| Android  | ✅            | 2.4.2                  |
| ChromeOS | ✅            | 2.4.2                  |

Egress policies are evaluated at Layer 4 ([https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/ ↗](https://www.cloudflare.com/learning/ddos/glossary/open-systems-interconnection-model-osi/)) of the OSI model, where only IP addresses are available — not hostnames. The [Application](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/#application), [Content Categories](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/#content-categories), [Domain](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/#domain), and [Host](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/#host) selectors need to match traffic by hostname, so Gateway uses a two-step process:

1. When Gateway receives a DNS query for a hostname that matches one of these selectors, it initially resolves the query to a temporary IP in the `100.80.0.0/16` or `2606:4700:0cf1:4000::/64` range.
2. When traffic arrives with this temporary destination IP, Gateway can identify which hostname the connection belongs to, apply the correct egress policy, then replace the temporary IP with the real destination IP before forwarding the traffic.
![Example egress policy flow](https://developers.cloudflare.com/_astro/host-selector-diagram.MWSMsbT4_1rAw7C.webp) 

These selectors require additional configuration before they work.

## Turn on Host selectors

To turn on the selectors for your account:

* [ Dashboard ](#tab-panel-7602)
* [ API ](#tab-panel-7603)

1. In the [Cloudflare dashboard ↗](https://dash.cloudflare.com/), go to **Zero Trust** \> **Traffic policies** \> **Traffic settings**.
2. In **Policy settings**, turn on **Allow egress policy host selectors**.

Use the [Patch Zero Trust account configuration](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/gateway/subresources/configurations/methods/edit/) endpoint to update your Zero Trust configuration. For example:

Patch Zero Trust account configuration

```

curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/configuration" \

  --request PATCH \

  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \

  --json '{

    "settings": {

        "host_selector": {

            "enabled": true

        }

    }

  }'


```

## Prerequisites

Traffic must be on-ramped to Gateway with the following methods:

| On-ramp method                                                                                                              | Compatibility |
| --------------------------------------------------------------------------------------------------------------------------- | ------------- |
| [Cloudflare One Client](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/) | ✅             |
| [PAC files](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/)               | ✅             |
| [Browser Isolation](https://developers.cloudflare.com/cloudflare-one/remote-browser-isolation/)                             | ✅             |
| [Cloudflare Mesh](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-mesh/)                    | ❌             |
| [Cloudflare WAN](https://developers.cloudflare.com/cloudflare-wan/zero-trust/cloudflare-gateway/)                           | ✅             |

Traffic from unsupported on-ramp methods resolves using your default Gateway settings. If you use DNS locations to send DNS queries to Gateway (over IPv4, IPv6, DNS over TLS, or DNS over HTTPS), Gateway does not return the initial resolved IP and the host selectors do not apply.

### Configuration changes

To configure your Zero Trust organization to use Host selectors with Egress policies:

1. Make sure you deploy the following version of the Cloudflare One Client on your users' devices:  
   * **Desktop**: [Cloudflare One Client version 2025.4.929.0](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/) or later  
   * **iOS**: [Cloudflare One Client version 1.11](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/#ios) or later  
   * **Android and Chrome OS**: [Cloudflare One Client version 2.4.2](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/download/#android) or later.  
If you need to support devices running prior versions of WARP, add and deploy the following key-value pair to your devices' [WARP configuration file](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/deployment/mdm-deployment/) (`mdm.xml` on Windows and Linux or `com.cloudflare.warp.plist` on macOS):  
```  
<array>  
  <dict>  
    <key>doh_in_tunnel</key>  
    <true/>  
  </dict>  
</array>  
```
2. In your WARP [device profile](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/device-profiles/), configure [Split Tunnels](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/) such that the initial resolved IPs route through the WARP tunnel. Configuration depends on your [Split Tunnels mode](https://developers.cloudflare.com/cloudflare-one/team-and-resources/devices/cloudflare-one-client/configure/route-traffic/split-tunnels/#change-split-tunnels-mode):  
   * **Exclude mode**: Delete `100.64.0.0/10` from your Split Tunnels list. We recommend [adding back the IP ranges](https://developers.cloudflare.com/cloudflare-one/networks/routes/reserved-ips/#split-tunnel-configuration) that are not explicitly used for Cloudflare One services. This reduces the risk of conflicts with existing private network configurations that may use the CGNAT address space.  
   * **Include mode**: Add Split Tunnel entries for the following IP addresses:  
         * **IPv4**: `100.80.0.0/16`  
         * **IPv6**: `2606:4700:0cf1:4000::/64`

The Cloudflare One Client must be set to _Traffic and DNS mode_ for traffic affected by these selectors to route correctly.

## Known issues

### Google Chrome restricts local network access

Starting with [Chrome 142 ↗](https://developer.chrome.com/release-notes/142), the browser restricts requests from websites to local IP addresses, including the Gateway initial resolved IP CGNAT range (`100.80.0.0/16`). Because this range falls within `100.64.0.0/10`, Chrome categorizes these addresses as belonging to a local network. When a website loaded from a public IP makes subrequests to a domain resolved through an initial resolved IP, Chrome treats this as a public-to-local network request and displays a prompt asking the user to allow access to devices on the local network. Chrome will block requests to these domains until the user accepts this prompt.

This commonly occurs when an Egress policy matches broadly used domains (such as `cloudfront.net` or `github.com`), causing subrequests from public pages to resolve to the `100.80.0.0/16` range.

#### Iframes

If the affected request originates from within an iframe (for example, an application embedded in a third-party portal), the iframe must declare the `local-network-access` permission for the browser prompt to appear in the parent frame:

* **Chrome 142-144**: Use the `allow="local-network-access"` attribute on the iframe element.
* **Chrome 145+**: The permission was split into `allow="local-network"` and `allow="loopback-network"`.

If iframes are nested, every iframe in the chain must include the appropriate attribute. Since third-party applications control their own iframe attributes, this may not be configurable by the end user.

#### Workarounds

To avoid this issue, choose one of the following options:

* **Override IP address space classification (Chrome 146+)**: Use the [LocalNetworkAccessIpAddressSpaceOverrides ↗](https://chromeenterprise.google/policies/#LocalNetworkAccessIpAddressSpaceOverrides) Chrome Enterprise policy to reclassify the `100.80.0.0/16` range as public. This is the most targeted fix because it only changes the classification for the initial resolved IP range rather than disabling security checks entirely.
* **Allow specific URLs (Chrome 140+)**: Use the [LocalNetworkAccessAllowedForUrls ↗](https://chromeenterprise.google/policies/#LocalNetworkAccessAllowedForUrls) Chrome Enterprise policy to exempt specific websites from Local Network Access checks. Note that `https://*` is a valid entry to disable checks for all URLs.
* **Allow specific URLs (Chrome 146+)**: Use the [LocalNetworkAllowedForUrls ↗](https://chromeenterprise.google/policies/#LocalNetworkAllowedForUrls) Chrome Enterprise policy, which replaces `LocalNetworkAccessAllowedForUrls` starting in Chrome 146.
* **Opt out of Local Network Access restrictions (Chrome 142-152)**: Use the [LocalNetworkAccessRestrictionsTemporaryOptOut ↗](https://chromeenterprise.google/policies/#LocalNetworkAccessRestrictionsTemporaryOptOut) Chrome Enterprise policy to completely opt out of Local Network Access restrictions. This is a temporary policy and will be removed after Chrome 152.
* **Disable the Chrome feature flag**: Go to `chrome://flags` and set the **Local Network Access Checks** flag to _Disabled_. This approach is suitable for individual users but not for enterprise-wide deployment.

### DNS Override policies bypass host selectors

If a domain matches a [DNS Override policy](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/#override), Gateway will not apply the initial resolved IP mapping for that domain. This means host-based egress selectors (Application, Content Categories, Domain, and Host) will not evaluate against traffic to the overridden domain. Traffic to these domains will use the default Cloudflare egress method.

### HTTPS DNS records not supported

Host selectors do not support HTTPS DNS record types. When a domain uses HTTPS records for connection establishment, Gateway cannot map the DNS query to a hostname for egress policy evaluation. Traffic to these domains will use the default Cloudflare egress method instead of matching a host-based egress policy.

If you need to apply egress policies to a domain that uses HTTPS records, use an IP-based selector (such as [Destination IP](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/#destination-ip)) instead.

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/host-selectors/#page","headline":"Host selectors · Cloudflare One docs","description":"Configure Host selectors in Gateway.","url":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/host-selectors/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-04-22","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["DNS"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/traffic-policies/","name":"Traffic policies"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/traffic-policies/egress-policies/","name":"Egress policies"}},{"@type":"ListItem","position":5,"item":{"@id":"/cloudflare-one/traffic-policies/egress-policies/host-selectors/","name":"Host selectors"}}]}
```
