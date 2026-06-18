---
title: Egress policies
description: Configure Egress policies in Gateway.
image: https://developers.cloudflare.com/zt-preview.png
---

> Documentation Index  
> Fetch the complete documentation index at: https://developers.cloudflare.com/cloudflare-one/llms.txt  
> Use this file to discover all available pages before exploring further.

[Skip to content](#%5Ftop) 

# Egress policies

Note

Only available on Enterprise plans.

Many third-party services (for example, a bank or partner API) only allow connections from a known list of IP addresses. By default, traffic that exits through Cloudflare Gateway shares a source IP address with all other Cloudflare One Client users, so upstream services cannot identify your organization by IP alone.

[Dedicated egress IPs](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/dedicated-egress-ips/) solve this problem. They are static IP addresses assigned only to your account, which you can add to upstream allowlists.

Egress policies control which dedicated egress IP is used for a given connection. You can match traffic on attributes such as user identity, source or destination IP address, and geolocation. Traffic that does not match an egress policy defaults to the most performant dedicated egress IP.

Cloudflare does not publish Cloudflare One Client egress IP ranges. Cloudflare One Client egress IPs are not listed at [Cloudflare's IP Ranges ↗](https://cloudflare.com/ips). To obtain a dedicated Cloudflare One Client egress IP, contact your account team.

Terraform provider v4 precedence limitation

To avoid conflicts, version 4 of the Terraform Cloudflare provider applies a hash calculation to policy precedence. For example, a precedence of `1000` may become `1000901`. This can cause errors when reordering policies. To avoid this issue, manually set the precedence of policies created with Terraform using the [Update a Zero Trust Gateway rule](https://developers.cloudflare.com/api/resources/zero%5Ftrust/subresources/gateway/subresources/rules/methods/update/) endpoint.

To ensure your precedence is set correctly, Cloudflare recommends [upgrading your Terraform provider to version 5 ↗](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/guides/version-5-upgrade).

## Load balancing

Traffic that does not match any egress policy exits from the closest Cloudflare data center using a default Gateway egress IP. This applies whether your account uses dedicated egress IPs or the default shared IPs.

If two data centers are equally close to the user, Gateway splits traffic between them. The load balancer keeps each user on the same egress IP regardless of which data center handles the request.

## Force IP version

Some upstream services only accept connections over a specific IP version. To force all egress traffic to use IPv4 or IPv6 only, first verify you are [filtering DNS traffic](https://developers.cloudflare.com/cloudflare-one/traffic-policies/get-started/dns/), then create a DNS policy to [block AAAA or A records](https://developers.cloudflare.com/cloudflare-one/traffic-policies/dns-policies/common-policies/#control-ip-version).

## Example policies

The following egress policy configures all traffic destined for a third-party network to use a static source IP:

| Policy name                 | Selector       | Operator | Value          | Egress method                   |
| --------------------------- | -------------- | -------- | -------------- | ------------------------------- |
| Access third-party provider | Destination IP | is       | 198.51.100.158 | Dedicated Cloudflare egress IPs |

| Primary IPv4 address | IPv6 address  |
| -------------------- | ------------- |
| 203.0.113.88         | 2001:db8::/32 |

### Secure access to SaaS applications

Many SaaS providers (for example, Microsoft 365, Salesforce, or Workday) allow you to restrict access to connections from specific IP addresses. You can use dedicated egress IPs with Gateway to enforce this restriction:

1. **Obtain dedicated egress IPs** from your account team and note the assigned IPv4 and IPv6 addresses.
2. **Create an egress policy** that routes traffic destined for the SaaS provider through your dedicated egress IP. Use the Destination IP selector with the published IP ranges of the provider. Alternatively, use the Application selector (Beta) to match the provider by name.
3. **Add the egress IPs to the SaaS provider's allowlist** so the provider only accepts connections from your organization's IPs.
4. **Pair with HTTP policies** to add deeper controls. For example, block file uploads to personal accounts, enforce DLP profiles to prevent sensitive data from leaving the organization, or require [device posture checks](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/) before allowing access.

This pattern ensures that access to the SaaS application is limited to traffic that passes through Gateway, where your security policies are enforced, and that the SaaS provider can verify traffic originates from your organization.

### Catch-all policy

Without a catch-all policy, any traffic that does not match an explicit egress policy will attempt to use the closest dedicated egress IP location. To avoid unexpected IP assignments and maintain the best performance, create a catch-all policy that routes remaining traffic through the default Zero Trust IP range:

| Policy name           | Selector | Operator | Value                  | Egress method                    |
| --------------------- | -------- | -------- | ---------------------- | -------------------------------- |
| Default egress policy | Protocol | in       | All options (Protocol) | Cloudflare default egress method |

Gateway policies evaluate from [top to bottom](https://developers.cloudflare.com/cloudflare-one/traffic-policies/order-of-enforcement/#order-of-precedence) in the UI. Place the catch-all policy at the bottom of the list so that more specific policies are evaluated first.

## Egress methods

When you configure your egress policy, you can choose whether to egress traffic using the default Cloudflare egress method or dedicated egress IPs.

### Use default Cloudflare egress method

**Use default Cloudflare egress method** routes traffic through the default source IP range shared across all Zero Trust accounts. Traffic exits from the nearest Cloudflare data center, which provides the best performance.

### Use dedicated egress IPs

**Use dedicated egress IPs (Cloudflare or BYOIP)** routes traffic through the primary IPv4 address and IPv6 range you select in the dropdown menus. 

When creating egress policies with dedicated egress IPs, you must set a secondary IPv4 address to ensure traffic resilience. You can set the secondary IPv4 address to `0.0.0.0` or a specific Cloudflare location different from your primary IPv4 address. If you set the secondary IPv4 address to `0.0.0.0`, Gateway will route traffic to the location closest to the user. If the physical location of your primary IPv4 address is not available, Gateway will route traffic to either the default Cloudflare egress range or the secondary location specified.

If the data center associated with your primary IPv4 address goes down, Gateway fails over to the secondary data center to prevent traffic drops. A secondary IPv6 address is not required because IPv6 traffic can exit from any Cloudflare data center. You can use IPs provided by Cloudflare or [bring your own IP addresses (BYOIP)](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/dedicated-egress-ips/#bring-your-own-ip-address-byoip).

To learn more about IPv4 and IPv6 egress behavior, refer to [Egress locations](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/dedicated-egress-ips/#egress-location).

## Selectors

Selectors are the criteria that Gateway uses to match egress traffic against a policy. Gateway evaluates the following selectors:

### Application Beta

You can apply egress policies to a growing list of popular web applications. Refer to [Application and app types](https://developers.cloudflare.com/cloudflare-one/traffic-policies/application-app-types/) for more information.

| UI name     | API example                 |
| ----------- | --------------------------- |
| Application | any(app.ids\[\*\] in {505}) |

This selector is only available for traffic onboarded to Traffic and DNS mode, PAC files, or Browser Isolation. For more information, refer to [Selector prerequisites](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/#selector-prerequisites).

### Content Categories Beta

Applications within a specific [security category](https://developers.cloudflare.com/cloudflare-one/traffic-policies/domain-categories/#content-categories) as categorized by [Cloudflare Radar](https://developers.cloudflare.com/radar/glossary/#content-categories).

| UI name            | API example                                  |
| ------------------ | -------------------------------------------- |
| Content Categories | any(net.fqdn.content\_category\[\*\] in {1}) |

This selector is only available for traffic onboarded to Traffic and DNS mode, PAC files, or Browser Isolation. For more information, refer to [Selector prerequisites](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/#selector-prerequisites).

### Destination Continent

The continent where the request is destined. Geolocation is determined from the target IP address. To specify a continent, enter its two-letter code into the **Value** field:

| Continent     | Code |
| ------------- | ---- |
| Africa        | AF   |
| Antarctica    | AN   |
| Asia          | AS   |
| Europe        | EU   |
| North America | NA   |
| Oceania       | OC   |
| South America | SA   |
| Tor network   | T1   |

| UI name                              | API example                   |
| ------------------------------------ | ----------------------------- |
| Destination Continent IP Geolocation | net.dst.geo.continent == "EU" |

### Destination Country

The country that the request is destined for. Geolocation is determined from the target IP address. To specify a country, enter its [ISO 3166-1 Alpha 2 code ↗](https://www.iso.org/obp/ui/#search/code/) in the **Value** field.

| UI name                            | API example                 |
| ---------------------------------- | --------------------------- |
| Destination Country IP Geolocation | net.dst.geo.country == "RU" |

### Destination IP

The IP address of the request's target.

| UI name        | API example                           |
| -------------- | ------------------------------------- |
| Destination IP | any(net.dst.ip\[\*\] in {10.0.0.0/8}) |

### Destination Port

The port number of the request's target.

| UI name          | API example          |
| ---------------- | -------------------- |
| Destination Port | net.dst.port == 2222 |

### Device Posture

With the Device Posture selector, admins can use signals from end-user devices to secure access to their internal and external resources. For example, a security admin can choose to limit all access to internal applications based on whether specific software is installed on a device and/or if the device or software are configured in a particular way.

For more information on device posture checks, refer to [Device posture](https://developers.cloudflare.com/cloudflare-one/reusable-components/posture-checks/).

| UI name                      | API example                                                                                                                                                                 |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Passed Device Posture Checks | any(device\_posture.checks.failed\[\*\] in {"1308749e-fcfb-4ebc-b051-fe022b632644"}), any(device\_posture.checks.passed\[\*\] in {"1308749e-fcfb-4ebc-b051-fe022b632644"})" |

### Domain Beta

Use this selector to match against a domain and all subdomains. For example, you can match `example.com` and its subdomains, such as `www.example.com`.

| UI name | API example                                  |
| ------- | -------------------------------------------- |
| Domain  | any(net.fqdn.domains\[\*\] == "example.com") |

Gateway policies do not support domains with non-Latin characters directly. To use a domain with non-Latin characters, add it to a [list](https://developers.cloudflare.com/cloudflare-one/reusable-components/lists/).

This selector is only available for traffic onboarded to Traffic and DNS mode, PAC files, or Browser Isolation. For more information, refer to [Selector prerequisites](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/#selector-prerequisites).

### Host Beta

Use this selector to match against only the hostname specified. For example, you can match `test.example.com` but not `example.com` or `www.test.example.com`.

| UI name | API example                    |
| ------- | ------------------------------ |
| Host    | net.fqdn.host == "example.com" |

Gateway policies do not support hostnames with non-Latin characters directly. To use a hostname with non-Latin characters, add it to a [list](https://developers.cloudflare.com/cloudflare-one/reusable-components/lists/).

Note

Some hostnames (`example.com`) will invisibly redirect to the www subdomain (`www.example.com`). To match this type of website, use the [Domain](#domain) selector instead of the Host selector.

This selector is only available for traffic onboarded to Traffic and DNS mode, PAC files, or Browser Isolation. For more information, refer to [Selector prerequisites](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/#selector-prerequisites).

### Protocol

The protocol used to send the packet.

| UI name  | API example           |
| -------- | --------------------- |
| Protocol | net.protocol == "tcp" |

### Proxy Endpoint

The [proxy server](https://developers.cloudflare.com/cloudflare-one/networks/resolvers-and-proxies/proxy-endpoints/) where your browser forwards HTTP traffic.

| UI name        | API example                                                 |
| -------------- | ----------------------------------------------------------- |
| Proxy Endpoint | proxy.endpoint == "3ele0ss56t.proxy.cloudflare-gateway.com" |

### Source Continent

The continent of the user making the request. 

Geolocation is determined from the device's public IP address (typically assigned by the user's ISP). To specify a continent, enter its two-letter code into the **Value** field:

| Continent     | Code |
| ------------- | ---- |
| Africa        | AF   |
| Antarctica    | AN   |
| Asia          | AS   |
| Europe        | EU   |
| North America | NA   |
| Oceania       | OC   |
| South America | SA   |
| Tor network   | T1   |

| UI name                         | API example                              |
| ------------------------------- | ---------------------------------------- |
| Source Continent IP Geolocation | net.src.geo.continent == "North America" |

### Source Country

The country of the user making the request. 

Geolocation is determined from the device's public IP address (typically assigned by the user's ISP). To specify a country, enter its [ISO 3166-1 Alpha-2 code ↗](https://www.iso.org/obp/ui/#search/code/) in the **Value** field.

| UI name                       | API example                 |
| ----------------------------- | --------------------------- |
| Source Country IP Geolocation | net.src.geo.country == "RU" |

### Source Internal IP

Use this selector to apply egress policies to a private IP address, assigned by a user's local network, that requests arrive to Gateway from.

| UI name            | API example                                    |
| ------------------ | ---------------------------------------------- |
| Source Internal IP | net.src.internal\_src\_ip == "192.168.86.0/27" |

### Source IP

The originating IP address or addresses of a device proxied by Gateway.

| UI name   | API example                      |
| --------- | -------------------------------- |
| Source IP | net.src.ip\[\*\] in {10.0.0.0/8} |

### Source Port

The originating port of a device proxied by Gateway.

| UI name     | API example            |
| ----------- | ---------------------- |
| Source Port | net.src.port == "2222" |

### Users

Use these selectors to match against identity attributes.

| UI name           | API example                                                                                                     |
| ----------------- | --------------------------------------------------------------------------------------------------------------- |
| User Email        | identity.email == "user@example.com"                                                                            |
| User Name         | identity.name == "Test User"                                                                                    |
| User Group IDs    | any(identity.groups\[\*\].id in {"group\_id"})                                                                  |
| User Group Names  | any(identity.groups\[\*\].name in {"group\_name"})                                                              |
| User Group Emails | any(identity.groups\[\*\].email in {"group@example.com"})                                                       |
| SAML Attributes   | any(identity.saml\_attributes\["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"\] in {"Test User"}) |

### Virtual Network

Use this selector to match all traffic routed through a specific [Virtual Network](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/private-net/cloudflared/tunnel-virtual-networks/) via the Cloudflare One Client.

| UI name         | API example                                            |
| --------------- | ------------------------------------------------------ |
| Virtual Network | net.vnet\_id == "957fc748-591a-e96s-a15d-1j90204a7923" |

## Comparison operators

Comparison operators are the way Gateway matches traffic to a selector. When you choose a **Selector** in the dashboard policy builder, the **Operator** dropdown menu will display the available options for that selector.

| Operator                 | Meaning                                                                                                            |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| is                       | equals the defined value                                                                                           |
| is not                   | does not equal the defined value                                                                                   |
| in                       | matches at least one of the defined values                                                                         |
| not in                   | does not match any of the defined values                                                                           |
| in list                  | in a pre-defined [list](https://developers.cloudflare.com/cloudflare-one/reusable-components/lists/) of values     |
| not in list              | not in a pre-defined [list](https://developers.cloudflare.com/cloudflare-one/reusable-components/lists/) of values |
| matches regex            | regex evaluates to true                                                                                            |
| does not match regex     | regex evaluates to false                                                                                           |
| greater than             | exceeds the defined number                                                                                         |
| greater than or equal to | exceeds or equals the defined number                                                                               |
| less than                | below the defined number                                                                                           |
| less than or equal to    | below or equals the defined number                                                                                 |

## Value

You can input a single value or use regular expressions to specify a range of values.

Gateway uses Rust to evaluate regular expressions. The Rust implementation is slightly different than regex libraries used elsewhere. To evaluate if your regex matches, you can use [Rustexp ↗](https://rustexp.lpil.uk/).

## Logical operators

To evaluate multiple conditions in an expression, select the **And** logical operator. These expressions can be compared further with the **Or** logical operator.

| Operator | Meaning                                       |
| -------- | --------------------------------------------- |
| And      | match all of the conditions in the expression |
| Or       | match any of the conditions in the expression |

The **Or** operator will only work with conditions in the same expression group. For example, you cannot compare conditions in **Traffic** with conditions in **Identity** or **Device Posture**.

## Limitations

### Selector prerequisites

The [Application](#application), [Content Categories](#content-categories), [Domain](#domain), and [Host](#host) selectors require additional setup before they work in egress policies. Before deploying policies with these selectors, refer to [Host selectors](https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/host-selectors).

```json
{"@context":"https://schema.org","@type":"TechArticle","@id":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/#page","headline":"Egress policies · Cloudflare One docs","description":"Configure Egress policies in Gateway.","url":"https://developers.cloudflare.com/cloudflare-one/traffic-policies/egress-policies/","inLanguage":"en","image":"https://developers.cloudflare.com/zt-preview.png","dateModified":"2026-05-05","publisher":{"@type":"Organization","name":"Cloudflare","url":"https://www.cloudflare.com/"},"isPartOf":{"@type":"WebSite","@id":"https://developers.cloudflare.com/#website","name":"Cloudflare Docs","url":"https://developers.cloudflare.com/"},"keywords":["IPv4","IPv6"]}
{"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"item":{"@id":"/directory/","name":"Directory"}},{"@type":"ListItem","position":2,"item":{"@id":"/cloudflare-one/","name":"Cloudflare One"}},{"@type":"ListItem","position":3,"item":{"@id":"/cloudflare-one/traffic-policies/","name":"Traffic policies"}},{"@type":"ListItem","position":4,"item":{"@id":"/cloudflare-one/traffic-policies/egress-policies/","name":"Egress policies"}}]}
```
